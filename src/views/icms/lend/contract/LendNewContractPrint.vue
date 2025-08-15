<template>
    <div>
      <iframe class="" width="100%" style="height:70vh" :src="ruleForm.protocol_path" frameborder="0"></iframe>
    </div>
  </template>
  <script>
  export default {
    name: "lookAgreementBtn",
    props: {
      cMeta: Object, // 布局相关数据
      cParentMeta: Object, // 父页面模板json数据
      cParentScope: Object, // 父页面每块区域业务数据
      cParentParams: Object, // 父页面自定义参数与内置参数
    },
    components: {},
    data() {
      return {
        ruleForm: {
          protocol_path: "" // 文件清单
        }
      };
    },
    created() {
        this.getPdfUrl();
    },
    methods: {
        getPdfUrl() {
            let params = {
                sale_prod_cd: this.cParentParams.sale_prod_cd,
                apply_no: this.cParentParams.apply_no,
                wf_inst_id: this.cParentParams.wf_inst_id,
                cust_no: this.cParentParams.cust_no,
                contract_no: this.cParentParams.contract_no,
                is_extend: 1,
                servicecode: "ar0061"
            };
            this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
                .then((res) => {
                    console.log(res)
                    this.ruleForm.protocol_path = res.data.protocol_path
                });
        },
    }
  };
  </script>
  <style lang="less" scoped>
  .el-form.custom-common--form {
    padding: 0;
  }
  
  .require-sign.custom-common--form {
    /deep/ .el-form-item__label:before {
      content: "*";
      color: #f56c6c;
      margin-right: 4px;
    }
  }
  </style>
  