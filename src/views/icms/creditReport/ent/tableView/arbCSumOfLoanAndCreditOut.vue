<template>
  <div>
    <h2><i class="el-icon-s-flag"></i>未结清信贷及授信信息概要</h2>
    <table border="1">
      <tr>
        <th colspan="3">由资产管理公司处置的债务</th>
        <th colspan="3">垫款</th>
        <th colspan="3">逾期</th>
      </tr>
      <tr>
        <th>账户数</th>
        <th>余额</th>
        <th>最近一次处置日期</th>
        <th>账户数</th>
        <th>余额</th>
        <th>最近一次还款日期</th>
        <th>本金</th>
        <th>利息及其他</th>
        <th>总额</th>
      </tr>
      <tr>
        <td>{{ arbCSumOfLoanAndCreditOutCom.ddbamc_account_num }}</td>
        <td>{{ arbCSumOfLoanAndCreditOutCom.ddbamc_balance }}</td>
        <td>{{ arbCSumOfLoanAndCreditOutCom.ddbamc_last_disposal_date }}</td>
        <td>{{ arbCSumOfLoanAndCreditOutCom.advance_payment_account_num }}</td>
        <td>{{ arbCSumOfLoanAndCreditOutCom.advance_payment_balance }}</td>
        <td>{{ arbCSumOfLoanAndCreditOutCom.advance_payment_disposal_date }}</td>
        <td>{{ arbCSumOfLoanAndCreditOutCom.overdue_principal }}</td>
        <td>{{ arbCSumOfLoanAndCreditOutCom.overdue_interest_and_other }}</td>
        <td>{{ arbCSumOfLoanAndCreditOutCom.overdue_total }}</td>
      </tr>
    </table>
    <br>
    <table border="1">
      <tr>
        <th rowspan="2"></th>
        <th colspan="2">正常类</th>
        <th colspan="2">关注类</th>
        <th colspan="2">不良类</th>
        <th colspan="2">合计</th>
      </tr>
      <tr>
        <th>账户数</th>
        <th>余额</th>
        <th>账户数</th>
        <th>余额</th>
        <th>账户数</th>
        <th>余额</th>
        <th>账户数</th>
        <th>余额</th>
      </tr>
      <tr v-for="item in arbCDetOfLoanAndCreditOutCom">
        <td>{{ item.busi_type_name }}</td>
        <td>{{ item.normal_class_account_num }}</td>
        <td>{{ item.normal_class_balance }}</td>
        <td>{{ item.concern_class_account_num }}</td>
        <td>{{ item.concern_class_balance }}</td>
        <td>{{ item.bad_class_account_num }}</td>
        <td>{{ item.bad_class_balance }}</td>
        <td>{{ calculateRowDataOfNum(item) }}</td>
        <td>{{ calculateRowDataOfBalance(item) }}</td>
      </tr>
      <tr v-if="arbCDetOfLoanAndCreditOutCom.length === 0">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    </table>
    <br>
    <table border="1">
      <tr>
        <th colspan="3">非循环信用额度</th>
        <th colspan="3">循环信用额度</th>
      </tr>
      <tr>
        <th>总额</th>
        <th>已用额度</th>
        <th>剩余可用额度</th>
        <th>总额</th>
        <th>已用额度</th>
        <th>剩余可用额度</th>
      </tr>
      <tr>
        <td>{{ arbCSumOfLoanAndCreditOutCom.non_revolve_total_quota }}</td>
        <td>{{ arbCSumOfLoanAndCreditOutCom.non_revolve_used_quota }}</td>
        <td>{{ arbCSumOfLoanAndCreditOutCom.non_revolve_available_quota }}</td>
        <td>{{ arbCSumOfLoanAndCreditOutCom.revolve_total_quota }}</td>
        <td>{{ arbCSumOfLoanAndCreditOutCom.revolve_used_quota }}</td>
        <td>{{ arbCSumOfLoanAndCreditOutCom.revolve_available_quota }}</td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  name: "arbCSumOfLoanAndCreditOut",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      arbCSumOfLoanAndCreditOutCom: {
        revolve_used_quota: "",
        apply_no: "",
        credit_reports_no: "",
        advance_payment_disposal_date: "",
        non_revolve_used_quota: "",
        overdue_interest_and_other: "",
        overdue_total: "",
        non_revolve_total_quota: "",
        revolve_total_quota: "",
        non_revolve_available_quota: "",
        advance_payment_account_num: "",
        org_id: "",
        ddbamc_account_num: "",
        ddbamc_last_disposal_date: "",
        advance_payment_balance: "",
        ddbamc_balance: "",
        overdue_principal: "",
        revolve_available_quota: ""
      },
      arbCDetOfLoanAndCreditOutCom: [],
    }
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.cParentParams.arbCSumOfLoanAndCreditOutCom) {
        this.arbCSumOfLoanAndCreditOutCom = this.cParentParams.arbCSumOfLoanAndCreditOutCom;
      }
      if (this.cParentParams.arbCDetOfLoanAndCreditOutCom) {
        this.arbCDetOfLoanAndCreditOutCom = this.cParentParams.arbCDetOfLoanAndCreditOutCom;
      }
    },
    calculateRowDataOfNum(item) {
      let num = parseInt(item.normal_class_account_num) + parseInt(item.concern_class_account_num) + parseInt(item.bad_class_account_num);
      return num;
    },
    calculateRowDataOfBalance(item) {
      let balance = (parseFloat(item.normal_class_balance) * 100 + parseFloat(item.concern_class_balance) * 100 + parseFloat(item.bad_class_balance) * 100) / 100;
      return balance;
    }
  }
}
</script>


<style lang="less" scoped>
table {
  width: calc(100% - 10px);
  height: auto;
  margin: 0 10px 0 10px;
  table-layout: fixed;

  th {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: black;
    height: 40px;
  }

  td {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    height: 40px;
  }

  td, th {
    white-space: nowrap; //强制在一行显示
    overflow: hidden; //溢出的内容切割隐藏
    text-overflow: ellipsis; //当内联溢出块容器时，将溢出部分替换为…
    word-break: keep-all; //允许在单词内换行
  }

  caption {
    text-align: center;
  }
}

h2 {
  color: black;
  font-weight: bold;
}
</style>
