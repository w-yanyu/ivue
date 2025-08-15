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
      v-for="(item,index) in pageList"
      v-if="showNum === index"
      :key="index">
      <to-json
        v-if="tranType === 'detail' || tranType === 'appr'"
        :toUrl="item.detail_path"
        :params="jsonParams">
      </to-json>
      <div class="container-center">
        <el-button type="info" v-if="showNum !== 0" @click="backStep">{{$i18ns('上一步')}}</el-button>
        <el-button type="primary" v-if="showNum !== (pageList.length - 1)" @click="nextStep">{{$i18ns('下一步')}}</el-button>
        <el-button type="primary" v-if="showNum === (pageList.length - 1) && tranType !== 'detail'" @click="submit">{{$i18ns('提交')}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "sellProductRelaDetail",
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
  },
  methods: {
    /**
     * 表单提交
     */
    submit() {
      let formData = this.$dataBus.getCurrentFormData(this);
      let params = formData;
      params.servicecode = 'pd0301';
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          this.$message({
            type: "success",
            message: "操作成功"
          })
          return true;
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
     * 下一步
     */
    nextStep() {
      if (this.showNum < this.pageList.length - 1) {
        this.showNum++;
      }
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
