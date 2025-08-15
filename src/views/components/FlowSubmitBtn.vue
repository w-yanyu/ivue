<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="300px"
      class="custom-common--submit"
      :span="24">
      <el-form-item class="submit-item">
        <el-button size="small" type="primary" class="submit-item--btn" @click="submit">{{$i18ns('启动流程')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import MyAxios from "pte-ui/utils/MyAxios";

  export default {
    name: "OutSubmitBtn",
    props: {
      cMeta: Object, // 布局相关数据
      cParentMeta: Object, // 父页面模板json数据
      cParentScope: Object, // 父页面每块区域业务数据
      cParentParams: Object, // 父页面自定义参数与内置参数
    },
    data() {
      return {
        finalUrl: "",
        unFieldList: "",
        ruleForm: {},
        rules: {},
      }
    },
    created() {
      this.unFieldList = this.cParentScope.item.unFieldList;
    },
    methods: {
      submit: function () {
        this.$dataBus
          .doAllValidator(this.$parent).then(res => {
          if (res === true) {
            let params = this.cParentScope.parentFormModel;
            params.trans_type = this.cParentParams.trans_type;
            params.is_start = this.cParentParams.is_start
            params.servicecode = this.cParentParams.servicecode;
            params.opera_type = this.cParentParams.opera_type
            params.detail = {...params, detail: null}
            this.finalUrl = this.cParentParams.finalUrl;
            console.log('params==============', params);
            let that = this;
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
              if (res && res.code === "200") {
                this.$message({
                  type: "success",
                  message: "操作成功"
                })
                this.$emit("update", {})

                let params2 = {
                  appId: this.cParentParams.appId,
                  cust_no: that.cParentScope.parentFormModel.cust_no,
                  cust_id: that.cParentScope.parentFormModel.cust_no,
                  cust_name: that.cParentScope.parentFormModel.cust_name,
                  appl_id: res.data.appl_id,
                  applid: res.data.appl_id,
                  prod_cd: params.sale_prod_cd,
                  frame_cd: res.data.task_url1,
                  wf_inst_id: res.data.wf_inst_id,
                  task_inst_id: res.data.cur_task_id,
                  reserve1: res.data.reserve1,
                  reserve2: res.data.reserve2
                }
                //清空表单数据，unFieldList为不清空字段的多个字段名
                if (this.unFieldList) {
                  Object.keys(this.cParentScope.parentFormModel).forEach(key => {
                      if(this.unFieldList.indexOf(key) == -1){
                        this.cParentScope.parentFormModel[key] = ''
                      }
                    }
                  )
                }
                that.$publicFn.openNavTab(this.finalUrl, "待办事项办理", params2, that)
              }
            }).catch(err => {
              console.error(err);
            });
          }
        })
      }
    }
  }

</script>

<style lang="less" scoped>
  .el-form .custom-common--submit {
    padding: 0;

    .submit-item--btn {
      display: block;
      margin: 0 auto;
    }
  }
</style>
