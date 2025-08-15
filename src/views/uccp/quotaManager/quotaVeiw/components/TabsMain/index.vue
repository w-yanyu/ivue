<template>
    <el-tabs  class="tabs-content" v-model="activeName" type="card"  show-overflow-tooltip @tab-click="handleClick">
    <el-tab-pane :label="$i18ns('T302.Quota-Overview')" name="limit-overview">
        <LimitOverview :customeNo="customeNo"></LimitOverview>
    </el-tab-pane>
    <el-tab-pane style="width: 100%; overflow: hidden; overflow-x: scroll;" :label="$i18ns('T302.Quota-Tree')" name="limit-tree" >
        <LimitTree class="limit-tree"  :customeNo="customeNo"></LimitTree >
    </el-tab-pane>
    <el-tab-pane :label="$i18ns('T302.credit-histories')" name="use-record">
        <LimitUsed :customeNo="customeNo" :customeName="customeName"></LimitUsed >
    </el-tab-pane>
    <el-tab-pane :label="$i18ns('T302.Limit-Change-Hist')" name="limit-hist">
        <LimitHistory :customeNo="customeNo" :customeName="customeName"></LimitHistory >
    </el-tab-pane>
    <el-tab-pane :label="$i18ns('T302.Limit-FT-Record')" name="limit-FTR">
        <LimitFTRecord :customeNo="customeNo" :customeName="customeName"></LimitFTRecord >
    </el-tab-pane>
    <el-tab-pane :label="$i18ns('T302.Limit-Opt-Record')" name="limit-opt">
        <LimitOperationRecord :customeNo="customeNo"></LimitOperationRecord >
    </el-tab-pane>
    <!-- <el-tab-pane :label="$i18ns('T302.Risk-warning')" name="risk-warning">风险预警</el-tab-pane>
    <el-tab-pane :label="$i18ns('T302.Analysis-and-statistics')" name="analyst-statistics">分析统计</el-tab-pane>
    <el-tab-pane :label="$i18ns('T302.Freeze-Records')" name="freeze-record">冻结记录</el-tab-pane> -->
  </el-tabs>
</template>
      <script>
     import LimitOverview from "../LimitOverview"
     import LimitTree from "../LimitTree"     
     import LimitUsed from "../LimitUsed"
     import LimitHistory from "../LimitHistory"
     import LimitFTRecord from "../LimitFTRecord"
     import LimitOperationRecord from "../LimitOperationRecord"
      
      export default {
        name: "TabsMain",
        props: {
          cMeta: Object, // 布局相关json数据
          cParentParams: Object, // 父页面传的参数
          cParentMeta: Object, // 父页面的相关json数据
          cParentScope: Object, // 父页面的scope数据对
          //客户编号
          customeNo:{
            type:String,
            require:true
          },
          //客户名称
          customeName:{
            type:String,
            require:true
          }
        },
        components: {
            LimitOverview,
            LimitTree,
            LimitUsed,
            LimitHistory,
            LimitFTRecord,
            LimitOperationRecord,
        },
        data() {
          return {
            activeName: 'limit-overview',
          }
        },
        created() {
          console.log("父页面的客户号666-----", this.cParentParams);
          this.customeNo= this.cParentParams.customeNo,
          this.customeName= this.cParentParams.customeName
        },
        methods: {
            handleClick(tab, event) {
        console.log(tab, event);
      }
      
        }
      };
      </script>
      <style lang="less" scoped>
     .tabs-content{
        width: 100%;
        height: 100%;
        background-color:#FFFFFF;
        border-radius:5px;
     }
     
        
     
    el-tab-pane{
        width: 100%;
        height: auto;

        border: none;
    }

      </style>
      