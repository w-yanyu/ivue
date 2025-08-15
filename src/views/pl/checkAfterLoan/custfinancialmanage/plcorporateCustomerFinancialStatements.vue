<template>
  <div class="page_content">
    <el-tabs class="tabs_table" v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane :label="$i18ns('资产负债表')" name="balanceSheet">
        <!-- <balanceSheet ref="balanceSheet" :statementType="balanceSheet" :cParentParams="cParentParams"></balanceSheet> -->
        <to-json :params="params" :toUrl="assetsLliabilitiesUrl"></to-json>
      </el-tab-pane>
      <el-tab-pane :label="$i18ns('损益表')" name="incomeStatement">
        <!-- <incomeStatement ref="incomeStatement" :statementType="incomeStatement" :cParentParams="cParentParams"></incomeStatement> -->
        <to-json :params="params" :toUrl="profitLossUrl"></to-json>
      </el-tab-pane>
      <el-tab-pane :label="$i18ns('现金流量表')" name="cashFlowStatement">
        <!--    <cashFlowStatement ref="cashFlowStatement" :statementType="cashFlowStatement" :cParentParams="cParentParams"></cashFlowStatement> -->
        <to-json :params="params" :toUrl="cashFlowUrl"></to-json>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  //财务报表选项卡
  import MyMessage from 'pte-ui/utils/MyMessage'
  import i18n from 'pte-ui/i18ns' // 国际化
  // import balanceSheet from './financialStatementsList' //资产负债表
  // import incomeStatement from './financialStatementsList' //损益表
  // import cashFlowStatement from './financialStatementsList' //现金流量表

  export default {
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object // 父页面的scope数据对象
    },
    components: {
      // balanceSheet,
      // incomeStatement,
      // cashFlowStatement,
    },
    data() {
      return {
        activeName: 'balanceSheet',
        //资产负债
        assetsLliabilitiesUrl: "/views/pl/checkAfterLoan/custfinancialmanage/assetsLliabilities_list.json",
        // 损益
        profitLossUrl: "/views/pl/checkAfterLoan/custfinancialmanage/profitLoss_list.json",
        // 现金流量
        cashFlowUrl: "/views/pl/checkAfterLoan/custfinancialmanage/cashFlow_list.json",
        params: this.cParentParams,
      }
    },
    mounted() {
      this.initData();

      console.log('cMeta', this.cMeta);
      console.log('cParentParams', this.cParentParams);
      console.log('cParentMeta', this.cParentMeta);
      console.log('cParentScope', this.cParentScope);
    },
    methods: {
      //初始化第一个页面的数据
      initData() {
        let that = this;
        that.$refs.balanceSheet.initTableData('01')
      },

      //加载渠道控制类型选项
      initChannelOptions() {
        let request_map = {}
        let request_url = "/SUMP/rest/dict";
        request_map["dictType"] = "E_CHATTP";
        request_map["dictKey"] = "E_CHATTP";
        this.$http.invokeAPI(request_url, "post", request_map).then(response => {
          if (response.code === "200") {
            console.log(response.data);
            this.channelOptions = response.data;
          } else {
            MyMessage({
              message: response.message,
              type: 'error'
            });
          }
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      handleClick(tab, event) {
        let that = this;
        switch (tab.name) {
          case 'balanceSheet':
            // that.$refs.balanceSheet.setStatementType('balanceSheet');
            that.$refs.balanceSheet.initTableData('01')
            break;
          case 'incomeStatement':
            // that.$refs.incomeStatement.setStatementType('incomeStatement');
            that.$refs.incomeStatement.initTableData('02')
            break;
          case 'cashFlowStatement':
            // that.$refs.cashFlowStatement.setStatementType('cashFlowStatement');
            that.$refs.cashFlowStatement.initTableData('03')
            break;
        }
      }

    }
  }
</script>
<style lang="css" scoped>
  .page_content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "PingFang SC";
  }

  .tabs_table {
    width: 99%;
  }

  
</style>
