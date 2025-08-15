<template>
  <div>
      <p class="messageDialog">{{exception_msg}}</p>
  </div>
</template>
<script>
export default {
  name: "messageDialog",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  components: {},
  data() {
    return {
      exception_msg: ""
    };
  },
  created() {
    this.exception_msg = this.cParentParams.exception_msg;
  },
  methods: {}
};
</script>
<style lang="less" scoped>
.messageDialog{
  font-size: 16px;
  white-space: pre-line;
}
</style>
