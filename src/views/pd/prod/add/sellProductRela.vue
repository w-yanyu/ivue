<template>
  <div class="dialog_content">
    <el-steps
      :space="200"
      :active="showNum"
      finish-status="success"
      align-center
      class="container-steps">
      <el-step
        v-for="(item,index) in pageList"
        :title="item.page_template_name"
        :key="index"
      >
      </el-step>
    </el-steps>
    <div
      v-for="item in pageListComputed"
      :key="item.page_template_no">
      <to-json
        v-if="tranType === 'add'"
        :toUrl="item.add_path"
        :params="jsonParams">
      </to-json>
      <to-json
        v-if="tranType === 'modify'"
        :toUrl="item.modify_path"
        :params="jsonParams">
      </to-json>
      <div class="container-center">
        <el-button type="info" v-if="showNum !== 0" @click="backStep">{{$i18ns('上一步')}}</el-button>
        <el-button type="primary" v-if="showNum !== (pageList.length - 1)" @click="nextStep">{{$i18ns('下一步')}}</el-button>
        <el-button type="primary" v-if="showNum === (pageList.length - 1) && !jsonParams.isLastTab" @click="nextStep">{{$i18ns('保存')}}</el-button>
        <el-button type="primary" v-if="showNum === (pageList.length - 1) && jsonParams.isLastTab" @click="submit">{{$i18ns('提交')}}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "sellProductRela",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
    pageList: [],
    pageParams: {},
    applyType: ""
  },
  data() {
    return {
      showNum: 0,
      tranType: "",
      isFirst: false,
      jsonParams: {}
    }
  },
  created() {
    this.jsonParams = this.pageParams;
    this.tranType = this.pageParams.tranType;
    this.jsonParams.apply_type = this.applyType;
    console.log("pageParams", this.jsonParams);
  },
  computed: {
    pageListComputed: function () {
      let that = this;
      return this.pageList.filter(function (item, index) {
        return that.showNum === index;
      })
    }
  },
  methods: {
    /**
     * 节点提交
     */
    stepSubmit(formParams, servicecode) {
      let params = formParams;
      params.servicecode = servicecode;
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          if (this.showNum < this.pageList.length - 1) {
            this.showNum++;
          }
          console.log(this.showNum);
          this.$message({
            type: "success",
            message: "操作成功"
          })
        }
      }).catch(err => {
        console.error(err);
      });
    },
    /**
     * 返回上一步
     */
    backStep() {
      if (this.showNum >= 1) {
        this.showNum--;
      }
    },
    /**
     * 表单提交
     */
    submit() {
      //如果步骤最后一页是form表单，需要先提交表单然后提交审批
      this.remoteCall();
      //提交审批
      let params = {
        servicecode: 'pd0301',
        submit_type: '0',
        busi_seq: this.jsonParams.busi_seq,
        sale_prod_cd: this.jsonParams.sale_prod_cd,
        prod_version: this.jsonParams.prod_version,
        appro_opinion: '同意'
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          this.$message({
            type: "success",
            message: "操作成功"
          });
          //关闭弹窗
          this.$publicFn.closeNavTab(this);
          this.$dataBus.doCallBack(this, "refresh");
          return true;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    /**
     * 下一步
     */
    nextStep() {
      let that = this;
      let formData = that.$dataBus.getCurrentFormData(that);
      console.log("formData", formData);
      let servicecode = formData.servicecode;
      if (typeof (servicecode) == "undefined" && typeof (formData.info) !== "undefined") {
        servicecode = formData.info.servicecode;
      }
      if (Object.keys(formData).length === 0) {
        if (that.showNum < that.pageList.length - 1) {
          that.showNum++;
        }
        return false;
      }
      if (typeof (servicecode) == "undefined") {
        if (that.showNum < that.pageList.length - 1) {
          that.showNum++;
        }
        return false;
      }
      //执行表单校验
      this.$dataBus.doAllValidator(that).then(res => {
        console.log("res", res);
        if (res === true) {
          that.stepSubmit(formData, servicecode);
        }
      }).catch(() => {
      });
    },
    /**
     * 请求发送方法
     */
    remoteCall() {
      let that = this;
      let formData = that.$dataBus.getCurrentFormData(that);
      console.log("formData", formData);
      let servicecode = formData.servicecode;
      if (typeof (servicecode) == "undefined" && typeof (formData.info) !== "undefined") {
        servicecode = formData.info.servicecode;
      }
      if (Object.keys(formData).length === 0) {
        return false;
      }
      if (typeof (servicecode) == "undefined") {
        return false;
      }
      let params = formData;
      params.servicecode = servicecode;
      //执行表单校验
      this.$dataBus.doAllValidator(that).then(res => {
        if (res === true) {
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
            if (res && res.code !== "200") {
              this.$message({
                type: "error",
                message: "提交失败"
              });
            }
          }).catch(err => {
            console.error(err);
          });
        }
      }).catch(() => {
      });
    }
  }
}
</script>

<style lang="less" scoped>
.container-content {
  .container-content--search {
    padding: 16px 40px 0 12px;
    border-bottom: 1px solid #e3e8f5;
  }

  .container-content--toolbar {
    padding: 10px;
  }

  .container-content--pagination {
    float: right;
    padding: 10px;
  }

  .container-centent--table {
    margin-top: 10px;
  }
}

.container-footer {
  width: 50px;
  margin: 0 auto;
  padding: 10px;
}

.container-steps {
  padding: 10px;
  margin: 0 auto;
  justify-content: center;
}

.container-div-right {
  width: 80%;
  height: 100%;
  display: inline;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}

.container-toolbar {
  margin: 10px 0;
}

.container-center {
  margin: 10px 0;
  width: 100%;
  text-align: center;
}

.dialog_content {
  width: 100%;
}

.title_tag {
  font-family: "PingFang SC";
  font-size: 18px;
  font-weight: bold;
  margin: 18px;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}
</style>
