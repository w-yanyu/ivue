<template>
  <div>
   <!-- <iframe class="" width="100%" style="height:70vh" :src="ruleForm.protocol_path" frameborder="0"></iframe> !-->
    <img v-bind:src="ruleForm.doc_path"/>

  </div>
</template>
<script>
export default {
  name: "lookImg",
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
        doc_path: "" // 文件清单
      }
    };
  },
  created() {
    this.ruleForm.doc_path = this.cParentParams.doc_path;
    console.log("doc_path",this.ruleForm.doc_path);
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
