<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr>
          <th colspan="10" class="table_header table_desc">三、近期经营指标情况</th>
        </tr>
        <tr>
          <th rowspan="2" colspan="1" class="table_desc">授信通知书编号</th>
          <th rowspan="2" colspan="1" class="table_desc">指标名称</th>
          <td colspan="8" class="table_desc">指标值（连续3年及最新）</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">{{operatingIndicator1.years}}</td>
          <td colspan="2" class="table_desc">{{operatingIndicator2.years}}</td>
          <td colspan="2" class="table_desc">{{operatingIndicator3.years}}</td>
          <td colspan="2" class="table_desc">最新({{operatingIndicator4.years}})</td>
        </tr>
        <tr>
          <th rowspan="4" colspan="1" class="table_desc">资本实力</th>
          <td class="table_desc">资本充足率</td>
          <td colspan="2">{{operatingIndicator1.capital_adequacy_ratio}}</td>
          <td colspan="2">{{operatingIndicator2.capital_adequacy_ratio}}</td>
          <td colspan="2">{{operatingIndicator3.capital_adequacy_ratio}}</td>
          <td colspan="2">{{operatingIndicator4.capital_adequacy_ratio}}</td>
        </tr>
        <tr>
          <td class="table_desc">核心资本充足率</td>
          <td colspan="2">{{operatingIndicator1.core_capital_adequacy_ratio}}</td>
          <td colspan="2">{{operatingIndicator2.core_capital_adequacy_ratio}}</td>
          <td colspan="2">{{operatingIndicator3.core_capital_adequacy_ratio}}</td>
          <td colspan="2">{{operatingIndicator4.core_capital_adequacy_ratio}}</td>
        </tr>
        <tr>
          <td class="table_desc">杠杆率</td>
          <td colspan="2">{{operatingIndicator1.leverage_ratio}}</td>
          <td colspan="2">{{operatingIndicator2.leverage_ratio}}</td>
          <td colspan="2">{{operatingIndicator3.leverage_ratio}}</td>
          <td colspan="2">{{operatingIndicator4.leverage_ratio}}</td>
        </tr>
        <tr>
          <td class="table_desc">所有者权益（亿元）</td>
          <td colspan="2">{{operatingIndicator1.owners_equity}}</td>
          <td colspan="2">{{operatingIndicator2.owners_equity}}</td>
          <td colspan="2">{{operatingIndicator3.owners_equity}}</td>
          <td colspan="2">{{operatingIndicator4.owners_equity}}</td>
        </tr>

        <tr>
          <th rowspan="7" colspan="1" class="table_desc">资产质量及规模</th>
          <td class="table_desc">不良贷款率</td>
          <td colspan="2">{{operatingIndicator1.non_performing_loan_ratio}}</td>
          <td colspan="2">{{operatingIndicator2.non_performing_loan_ratio}}</td>
          <td colspan="2">{{operatingIndicator3.non_performing_loan_ratio}}</td>
          <td colspan="2">{{operatingIndicator4.non_performing_loan_ratio}}</td>
        </tr>
        <tr>
          <td class="table_desc">不良资产率</td>
          <td colspan="2">{{operatingIndicator1.non_performing_assets_ratio}}</td>
          <td colspan="2">{{operatingIndicator2.non_performing_assets_ratio}}</td>
          <td colspan="2">{{operatingIndicator3.non_performing_assets_ratio}}</td>
          <td colspan="2">{{operatingIndicator4.non_performing_assets_ratio}}</td>
        </tr>
        <tr>
          <td class="table_desc">拨备覆盖率</td>
          <td colspan="2">{{operatingIndicator1.provision_coverage}}</td>
          <td colspan="2">{{operatingIndicator2.provision_coverage}}</td>
          <td colspan="2">{{operatingIndicator3.provision_coverage}}</td>
          <td colspan="2">{{operatingIndicator4.provision_coverage}}</td>
        </tr>
        <tr>
          <td class="table_desc">单一客户贷款集中度</td>
          <td colspan="2">{{operatingIndicator1.single_customer_loan_concentration}}</td>
          <td colspan="2">{{operatingIndicator2.single_customer_loan_concentration}}</td>
          <td colspan="2">{{operatingIndicator3.single_customer_loan_concentration}}</td>
          <td colspan="2">{{operatingIndicator4.single_customer_loan_concentration}}</td>
        </tr>
        <tr>
          <td class="table_desc">授信集中度</td>
          <td colspan="2">{{operatingIndicator1.concentration_of_credit}}</td>
          <td colspan="2">{{operatingIndicator2.concentration_of_credit}}</td>
          <td colspan="2">{{operatingIndicator3.concentration_of_credit}}</td>
          <td colspan="2">{{operatingIndicator4.concentration_of_credit}}</td>
        </tr>
        <tr>
          <td class="table_desc">全部关联度</td>
          <td colspan="2">{{operatingIndicator1.total_correlation_degree}}</td>
          <td colspan="2">{{operatingIndicator2.total_correlation_degree}}</td>
          <td colspan="2">{{operatingIndicator3.total_correlation_degree}}</td>
          <td colspan="2">{{operatingIndicator4.total_correlation_degree}}</td>
        </tr>
        <tr>
          <td class="table_desc">总资产（亿元）</td>
          <td colspan="2">{{operatingIndicator1.total_assets_peer}}</td>
          <td colspan="2">{{operatingIndicator2.total_assets_peer}}</td>
          <td colspan="2">{{operatingIndicator3.total_assets_peer}}</td>
          <td colspan="2">{{operatingIndicator4.total_assets_peer}}</td>
        </tr>

        <tr>
          <th rowspan="6" colspan="1" class="table_desc">盈利能力</th>
          <td class="table_desc">净利润（亿元）</td>
          <td colspan="2">{{operatingIndicator1.net_profit_peer}}</td>
          <td colspan="2">{{operatingIndicator2.net_profit_peer}}</td>
          <td colspan="2">{{operatingIndicator3.net_profit_peer}}</td>
          <td colspan="2">{{operatingIndicator4.net_profit_peer}}</td>
        </tr>
        <tr>
          <td class="table_desc">资产利润率</td>
          <td colspan="2">{{operatingIndicator1.return_on_assets}}</td>
          <td colspan="2">{{operatingIndicator2.return_on_assets}}</td>
          <td colspan="2">{{operatingIndicator3.return_on_assets}}</td>
          <td colspan="2">{{operatingIndicator4.return_on_assets}}</td>
        </tr>
        <tr>
          <td class="table_desc">资本利润率</td>
          <td colspan="2">{{operatingIndicator1.rate_return_capital}}</td>
          <td colspan="2">{{operatingIndicator2.rate_return_capital}}</td>
          <td colspan="2">{{operatingIndicator3.rate_return_capital}}</td>
          <td colspan="2">{{operatingIndicator4.rate_return_capital}}</td>
        </tr>
        <tr>
          <td class="table_desc">中间业务收入比率</td>
          <td colspan="2">{{operatingIndicator1.intermediate_business_revenue_ratio}}</td>
          <td colspan="2">{{operatingIndicator2.intermediate_business_revenue_ratio}}</td>
          <td colspan="2">{{operatingIndicator3.intermediate_business_revenue_ratio}}</td>
          <td colspan="2">{{operatingIndicator4.intermediate_business_revenue_ratio}}</td>
        </tr>
        <tr>
          <td class="table_desc">成本收入比率</td>
          <td colspan="2">{{operatingIndicator1.cost_income_ratio}}</td>
          <td colspan="2">{{operatingIndicator2.cost_income_ratio}}</td>
          <td colspan="2">{{operatingIndicator3.cost_income_ratio}}</td>
          <td colspan="2">{{operatingIndicator4.cost_income_ratio}}</td>
        </tr>
        <tr>
          <td class="table_desc">利润增长率</td>
          <td colspan="2">{{operatingIndicator1.profit_growth_rate}}</td>
          <td colspan="2">{{operatingIndicator2.profit_growth_rate}}</td>
          <td colspan="2">{{operatingIndicator3.profit_growth_rate}}</td>
          <td colspan="2">{{operatingIndicator4.profit_growth_rate}}</td>
        </tr>

        <tr>
          <th rowspan="4" colspan="1" class="table_desc">流动性</th>
          <td class="table_desc">流动性比率</td>
          <td colspan="2">{{operatingIndicator1.liquidity_ratio}}</td>
          <td colspan="2">{{operatingIndicator2.liquidity_ratio}}</td>
          <td colspan="2">{{operatingIndicator3.liquidity_ratio}}</td>
          <td colspan="2">{{operatingIndicator4.liquidity_ratio}}</td>
        </tr>
        <tr>
          <td class="table_desc">流动性缺口率</td>
          <td colspan="2">{{operatingIndicator1.liquidity_gap_ratio}}</td>
          <td colspan="2">{{operatingIndicator2.liquidity_gap_ratio}}</td>
          <td colspan="2">{{operatingIndicator3.liquidity_gap_ratio}}</td>
          <td colspan="2">{{operatingIndicator4.liquidity_gap_ratio}}</td>
        </tr>
        <tr>
          <td class="table_desc">存贷比</td>
          <td colspan="2">{{operatingIndicator1.loan_deposit_ratio}}</td>
          <td colspan="2">{{operatingIndicator2.loan_deposit_ratio}}</td>
          <td colspan="2">{{operatingIndicator3.loan_deposit_ratio}}</td>
          <td colspan="2">{{operatingIndicator4.loan_deposit_ratio}}</td>
        </tr>
        <tr>
          <td class="table_desc">净拆借资金比率</td>
          <td colspan="2">{{operatingIndicator1.net_lending_fund_ratio}}</td>
          <td colspan="2">{{operatingIndicator2.net_lending_fund_ratio}}</td>
          <td colspan="2">{{operatingIndicator3.net_lending_fund_ratio}}</td>
          <td colspan="2">{{operatingIndicator4.net_lending_fund_ratio}}</td>
        </tr>

      </table>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";
import accounting from "pte-ui/utils/accounting";

export default {
  name: "OperatingIndicatorsReport",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      apply_no: "", //申请号
      cust_no: "", //客户编号
      due_item_no: "", //调查项编号

      OperatingIndicatorsList: [], //还款方式列表

      operatingIndicator1:{},
      operatingIndicator2:{},
      operatingIndicator3:{},
      operatingIndicator4:{},
    }
  },
  filters: {
    formatMoney(value) {
      return accounting.formatMoney(value, "");
    }
  },
  created() {
    this.due_item_no = this.cParentParams.due_item_no;
    this.apply_no = this.cParentParams.apply_no;
    this.cust_no = this.cParentParams.cust_no;
    // this.due_item_no = "custDTA1";
    // this.apply_no = "20230717000000000052801";
    // this.cust_no = "UR00000000014301";
    this.getOperatingIndicatorsData();
  },
  methods: {
    /**
     * 检查当前页面请求必输参数是否存在
     */
    checkParams() {
      if (this.apply_no === null || this.apply_no === "") {
        return false;
      }
      if (this.cust_no === null || this.cust_no === "") {
        return false;
      }
      if (this.due_item_no === null || this.due_item_no === "") {
        return false;
      }
      return true;
    },
    /**
     * 获取经营指标信息
     */
    async getOperatingIndicatorsData() {
      let that = this;
      if (!that.checkParams()) {
        return;
      }
      let params = {
        servicecode: "us0954",
        cust_no: that.cust_no
      }
      await MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            for (let i = 0; i < res.data.length; i++) {
              if (i==0){
                that.operatingIndicator4 = res.data[i];
              }
              if (i==1){
                that.operatingIndicator3 = res.data[i];
              }
              if (i==2){
                that.operatingIndicator2 = res.data[i];
              }
              if (i==3){
                that.operatingIndicator1 = res.data[i];
              }
            }

          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    isNull(indicator){
      if (indicator === "" || indicator === null || indicator === undefined || JSON.stringify(indicator) === '{}') {
        return true;
      }
      return false;
    }
  }
}
</script>


<style lang="less" scoped>
.table_container {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
}

.table_desc {
  text-align: left;
  padding-left: 10px;
  background: #f3f4f5;
}

// .table_center {
//   position: relative;
//   left: 0;
//   top: 10%;
//   bottom: auto;
//   right: 0;
//   margin: auto;
//   text-align: center;
//   width: 60%;
//   height: auto;
// }

.table_header {
  background: #ecf5ff;
  border-radius: 0;
  border-left: 1px solid #5e6d82;
  border-right: 1px solid #5e6d82;
  font-size: 15px;
  font-family: "Arial Black";
  font-weight: bold;
  text-align: center;
}

.table_report {
  width: 100%;
  height: auto;
  border-collapse: collapse;
}

th {
  width: 10% !important;
  text-align: center;
}

td {
  width: 10%;
  text-align: center;
  height: 20px;
}

.page-desc {
  height: auto;
  min-height: 100px;
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>
