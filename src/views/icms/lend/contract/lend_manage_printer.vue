<template>
    <div class="table_container">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane :label="$i18ns('贷款意向书打印')" name="first">
        <LendFormatContract :cMeta="cMeta" :cParentMeta="cParentMeta" :cParentScope="cParentScope" :cParentParams="cParentParams"></LendFormatContract>
    </el-tab-pane>
    <el-tab-pane :label="$i18ns('贷款合同打印')" name="second">
        <LendContractPrint :cMeta="cMeta" :cParentMeta="cParentMeta" :cParentScope="cParentScope" :cParentParams="cParentParams"></LendContractPrint>
    </el-tab-pane>
    <el-tab-pane :label="$i18ns('展期合同打印')" name="third" v-if="cParentParams.is_extend==='1'">
        <LendNewContractPrint :cMeta="cMeta" :cParentMeta="cParentMeta" :cParentScope="cParentScope" :cParentParams="cParentParams"></LendNewContractPrint>
    </el-tab-pane>
  </el-tabs>
    </div>
  </template>
  <script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import accounting from "pte-ui/utils/accounting";
  import LendFormatContract from "./LendFormatContract.vue"
  import LendContractPrint from "./LendContractPrint.vue"
  import LendNewContractPrint from "./LendNewContractPrint.vue"
  
  export default {
    name: "ArbCustReport",
    props: {
      cMeta: Object, // 布局相关数据
      cParentMeta: Object, // 父页面模板json数据
      cParentScope: Object, // 父页面每块区域业务数据
      cParentParams: Object // 父页面自定义参数与内置参数
    },
    components:{
        LendFormatContract,
        LendContractPrint,
        LendNewContractPrint
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
        console.log("cParentScope",this.cParentScope)
        console.log("cParentParams",this.cParentParams)
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
  