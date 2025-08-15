<template>
  <div>
    <to-json
      :toUrl="params.url_query"
      :params="this.params"
    ></to-json>
  </div>
</template>

<script>

export default {
  name: "InOutWareResult",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {

      params: {
        url_query: '',
        asset_list_id:''
      }
    };
  },
  created() {
    console.log("进来了")
    this.params.url_query = this.cParentParams.reserve1;
    this.params.asset_list_id = this.cParentParams.reserve2;
  },
  mounted() {

  },
  methods: {},
};
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
