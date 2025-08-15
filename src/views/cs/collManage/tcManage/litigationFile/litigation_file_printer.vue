<template>
    <div class="table_container">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane :label="$i18ns('法律文书打印')" name="first">
        <litigationFilePrint :cMeta="cMeta" :cParentMeta="cParentMeta" :cParentScope="cParentScope" :cParentParams="cParentParams"></litigationFilePrint>
    </el-tab-pane>
  </el-tabs>
    </div>
  </template>
  <script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import litigationFilePrint from "./litigationFilePrint.vue"
  
  export default {
    name: "ArbCustReport",
    props: {
      cMeta: Object, // 布局相关数据
      cParentMeta: Object, // 父页面模板json数据
      cParentScope: Object, // 父页面每块区域业务数据
      cParentParams: Object // 父页面自定义参数与内置参数
    },
    components:{
        litigationFilePrint
    },
    data() {
      return {
        activeName: 'first'
      };
    },
    filters: {},
  
    created() {
        console.log("cMeta",this.cMeta)
        console.log("cParentMeta",this.cParentMeta)
    },
    methods: {
        handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
  </script>
  
  <style lang="less" scoped>
  
  </style>
  