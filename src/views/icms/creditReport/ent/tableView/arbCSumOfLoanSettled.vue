<template>
  <div>
    <h2><i class="el-icon-s-flag"></i>已结清信贷信息概要</h2>
    <table border="1">
      <tr>
        <th colspan="3">由资产管理公司处置的债务</th>
        <th colspan="3">垫款</th>
      </tr>
      <tr>
        <th>账户数</th>
        <th>余额</th>
        <th>处置完成日期</th>
        <th>账户数</th>
        <th>余额</th>
        <th>结清日期</th>
      </tr>
      <tr>
        <td>{{ arbCSumOfLoanSettledCom.ddbamc_account_num }}</td>
        <td>{{ arbCSumOfLoanSettledCom.ddbamc_balance }}</td>
        <td>{{ arbCSumOfLoanSettledCom.ddbamc_disposal_end_date }}</td>
        <td>{{ arbCSumOfLoanSettledCom.advance_payment_account_num }}</td>
        <td>{{ arbCSumOfLoanSettledCom.advance_payment_balance }}</td>
        <td>{{ arbCSumOfLoanSettledCom.advance_payment_settle_date }}</td>
      </tr>
    </table>
    <br>
    <table border="1">
      <tr>
        <th></th>
        <th>正常类账户数</th>
        <th>关注类账户数</th>
        <th>不良类账户数</th>
        <th>合计</th>
      </tr>
      <tr v-for="item in arbCDetOfLoanSettledCom">
        <td>{{ item.busi_type_name }}</td>
        <td>{{ item.normal_class_account_num }}</td>
        <td>{{ item.concern_class_account_num }}</td>
        <td>{{ item.concern_class_account_num }}</td>
        <td>{{ calculateRowDataOfNum(item) }}</td>
      </tr>
      <tr v-if="arbCDetOfLoanSettledCom.length === 0">
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
  </div>
</template>

<script>

export default {
  name: "arbCSumOfLoanSettled",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      arbCSumOfLoanSettledCom: {
        advance_payment_account_num: "",
        org_id: "",
        apply_no: "",
        credit_reports_no: "",
        ddbamc_account_num: "",
        ddbamc_disposal_end_date: "",
        advance_payment_balance: "",
        advance_payment_settle_date: "",
        ddbamc_balance: ""
      },
      arbCDetOfLoanSettledCom: []
    }
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.cParentParams.arbCSumOfLoanSettledCom) {
        this.arbCSumOfLoanSettledCom = this.cParentParams.arbCSumOfLoanSettledCom;
      }
      if (this.cParentParams.arbCDetOfLoanSettledCom) {
        this.arbCDetOfLoanSettledCom = this.cParentParams.arbCDetOfLoanSettledCom;
      }
    },
    calculateRowDataOfNum(item) {
      let num = parseInt(item.normal_class_account_num) + parseInt(item.concern_class_account_num) + parseInt(item.bad_class_account_num);
      return num;
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
    white-space:nowrap;  //强制在一行显示
    overflow:hidden;    //溢出的内容切割隐藏
    text-overflow:ellipsis; //当内联溢出块容器时，将溢出部分替换为…
    word-break:keep-all;  //允许在单词内换行

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
