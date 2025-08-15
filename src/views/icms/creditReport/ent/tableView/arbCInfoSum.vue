<template>
  <div>
    <h1 class="table-title">异议提示</h1>
    <p>{{ arbCInfoSumCom.objection_prompt }}</p>
    <h1 class="table-title">信息概要</h1>
    <table border="1">
      <tr>
        <th>首次有信贷交易的年份</th>
        <th>发生信贷交易的机构数</th>
        <th>当前有未结清信贷交易的机构数</th>
        <th>首次有相关还款责任的年份</th>
      </tr>
      <tr>
        <td>{{ arbCInfoSumCom.first_credit_trans_year }}</td>
        <td>{{ arbCInfoSumCom.credit_trans_branch_num }}</td>
        <td>{{ arbCInfoSumCom.outstanding_credit_trans_num }}</td>
        <td>{{ arbCInfoSumCom.first_has_repayment_liability_year }}</td>
      </tr>
    </table>
    <br>
    <table border="1">
      <tr>
        <th colspan="2">借贷交易</th>
        <th colspan="2">担保交易</th>
      </tr>
      <tr>
        <td class="td-left">余额</td>
        <td class="td-right">{{ arbCInfoSumCom.lending_trans_balance }}</td>
        <td class="td-left">余额</td>
        <td class="td-right">{{ arbCInfoSumCom.guar_trans_balance }}</td>
      </tr>
      <tr>
        <td class="td-left" style="text-align: left">其中：被追偿余额</td>
        <td class="td-right">{{ arbCInfoSumCom.lending_trans_recovered_balance }}</td>
        <td class="td-left" style="text-align: left">其中：关注类余额</td>
        <td class="td-right">{{ arbCInfoSumCom.guar_trans_concern_balance }}</td>
      </tr>
      <tr>
        <td class="td-left" style="text-align: left">关注类余额</td>
        <td class="td-right">{{ arbCInfoSumCom.lending_trans_concern_balance }}</td>
        <td class="td-left" style="text-align: left">不良类余额</td>
        <td class="td-right">{{ arbCInfoSumCom.guar_trans_bad_balance }}</td>
      </tr>
      <tr>
        <td class="td-left" style="text-align: left">不良类余额</td>
        <td class="td-right">{{ arbCInfoSumCom.lending_trans_bad_balance }}</td>
        <td class="td-left"></td>
        <td class="td-right"></td>
      </tr>
    </table>
    <br>
    <table border="1">
      <tr>
        <th>非信贷交易账户数</th>
        <th>欠税记录条数</th>
        <th>民事判决记录条数</th>
        <th>强制执行记录条数</th>
        <th>行政处罚记录条数</th>
      </tr>
      <tr>
        <td>{{ arbCInfoSumCom.non_credit_transaction_account_num }}</td>
        <td>{{ arbCInfoSumCom.tax_arrears_record_num }}</td>
        <td>{{ arbCInfoSumCom.civil_judgment_record_num }}</td>
        <td>{{ arbCInfoSumCom.enforcement_record_num }}</td>
        <td>{{ arbCInfoSumCom.administrative_penalty_record_num }}</td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  name: "arbCInfoSum",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      arbCInfoSumCom: {
        lending_trans_recovered_balance: "",
        first_credit_trans_year: "",
        enforcement_record_num: "",
        administrative_penalty_record_num: "",
        outstanding_credit_trans_num: "",
        lending_trans_bad_balance: "",
        guar_trans_balance: "",
        apply_no: "",
        credit_reports_no: "",
        credit_trans_branch_num: "",
        lending_trans_concern_balance: "",
        guar_trans_bad_balance: "",
        lending_trans_balance: "",
        first_has_repayment_liability_year: "",
        non_credit_transaction_account_num: "",
        civil_judgment_record_num: "",
        guar_trans_concern_balance: "",
        objection_prompt: "",
        org_id: "",
        tax_arrears_record_num: ""
      },
    }
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.cParentParams) {
        this.arbCInfoSumCom = this.cParentParams;
      }
    }
  }
}
</script>


<style lang="less" scoped>
table {
  width: calc(100% - 10px);
  height: auto;
  //min-height: 200px;
  margin: 0 10px 0 10px;

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

h1 {
  font-weight: bold;
  color: black;
}

.td-left {
  color: black;
  width: 25%;
}

.td-right {
  width: 25%;
  padding: 0 10px 0 10px;
  text-align: right;
}

.table-title {
  width: 100%;
  text-align: center;
}

p {
  font-size: 18px;
  font-weight: bold;
}
</style>
