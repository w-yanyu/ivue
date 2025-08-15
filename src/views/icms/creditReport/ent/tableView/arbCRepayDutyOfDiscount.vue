<template>
  <div>
    <h3>贴现</h3>
    <table border="1">
      <tr>
        <th>责任类型</th>
        <th>保证合同编号</th>
        <th>还款责任金额</th>
        <th>授信机构</th>
        <th>业务种类</th>
        <th>五级分类</th>
        <th>账户数</th>
        <th>借款金额</th>
        <th>余额</th>
        <th>逾期总额</th>
        <th>逾期本金</th>
      </tr>
      <tr v-for="item in arbCRepayDutyOfDiscountCom">
        <td>{{ item.duty_type_name }}</td>
        <td>{{ item.guar_contrat_no }}</td>
        <td>{{ item.repayment_duty_amt }}</td>
        <td>{{ item.credit_branch }}</td>
        <td>{{ item.busi_class }}</td>
        <td>{{ item.five_level_class }}</td>
        <td>{{ item.account_num }}</td>
        <td>{{ item.loan_amt }}</td>
        <td>{{ item.balance }}</td>
        <td>{{ item.overdue_total_amt }}</td>
        <td>{{ item.overdue_principal }}</td>
      </tr>
      <tr v-if="arbCRepayDutyOfDiscountCom.length === 0">
        <td></td>
        <td></td>
        <td></td>
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
  </div>
</template>

<script>

export default {
  name: "arbCRepayDutyOfDiscount",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      arbCRepayDutyOfDiscountCom: []
    }
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.cParentParams) {
        this.arbCRepayDutyOfDiscountCom = this.cParentParams;
      }
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
}

h3 {
  color: black;
  font-weight: bold;
}
</style>
