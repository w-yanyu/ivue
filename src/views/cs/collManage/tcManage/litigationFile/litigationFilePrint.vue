<template>
  <div class="container-content">
    <div v-if="!isNull(refSrc)">
      <iframe class="" width="100%" style="height:90vh" frameborder="0" :src="refSrc"></iframe>
    </div>
    <div v-if="isNull(refSrc)">
      <h2>法律文书动态渲染中！</h2>
    </div>
<!--    <iframe class="" width="100%" style="height:90vh" frameborder="0" :src="refSrc"></iframe>-->
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
      iframeKey: 0,
      refSrc:"",
      ruleForm: {
        protocol_path: "" // 文件清单
      }
    };
  },
  created() {

  },
  mounted() {
    this.getPdfUrl();
  },
  methods: {
    getPdfUrl() {
      let params = {
        serial_no: this.cParentParams.serial_no,
        case_id: this.cParentParams.case_id,
        file_path: this.cParentParams.file_path,
        servicecode: "cb0286"
      };
      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          console.log(res);
          this.renderFileToIframe(res.data.file_path);
        });
    },
    handlePrintConfig() {
      this.$dialog.open({
        that: this,
        title: "水印设置",
        width: "36%",
        toRequest: {
          url: "@printConfig",
          method: "get",
        },
      });
    },
    isNull(params) {
      if (params === "" || params === null || params === undefined) {
        return true;
      }
      return false;
    },
    renderFileToIframe(fileStream) {
      // const _URL = window.URL || window.webkitURL;
      // const blob = new Blob([fileStream], { type: 'application/pdf;charset=UTF-8'});
      const blob = this.dataUrlToBlob(fileStream,'application/pdf;charset=UTF-8');
      const url = window.URL.createObjectURL(blob);
      this.refSrc = url;
    },
    dataUrlToBlob(data, prefix) {
      var bstr = window.atob(data);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: prefix });
    }
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
