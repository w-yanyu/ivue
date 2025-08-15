<template>
  <div>
    <iframe class="" width="100%" style="height:70vh" :src="ruleForm.file_url" frameborder="0"></iframe>
  </div>
</template>
<script>
export default {
  name: "lookInterviewImageBtn",
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
        file_url: "" // 文件清单
      }
    };
  },
  created() {
    this.ruleForm.file_url = this.cParentParams.file_url;
  },
  methods: {}
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
