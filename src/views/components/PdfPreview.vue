<template>
  <div>
    <iframe class="preview-frame" :src="pdfUrl" frameborder="0"></iframe>
  </div>
</template>
<script>
export default {
  name: "PdfPreview",
  props: {
    cMeta: Object, //本页面模板json数据Layout对象
    cParentMeta: Object, //父页面模板json数据Layout对象
    cParentParams: Object, //父页面自定义参数与内置参数
    cParentScope: Object, //父页面每块区域业务数据
  },
  data() {
    return {
      pdfUrl: "",
    };
  },
  created() {
    this.getPdfUrl();
  },
  methods: {
    // 获取pdf路径
    getPdfUrl() {
      let params = {
        servicecode: "AS_ICMS_JK_GETBASE",
        fileKey: this.cParentParams.path,
        bucket: this.cParentParams.bucket,
      };
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200" && res.data && res.data.filebase64Str) {
            this.pdfUrl = "data:application/pdf;base64," + res.data.filebase64Str;
          } else {
            this.$message({
              type: "warning",
              message: "获取文件失败",
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
<style lang="less" scoped>
div[c-module="PdfPreview"] {
  height: 100%;
}
.preview-frame {
  height: 100%;
  width: 100%;
}
</style>