<template>
  <div>
    <h2><i class="el-icon-s-flag"></i>相关还款责任</h2>
    <h3><i class="el-icon-s-grid"></i>为其他借款人承担的相关还款责任</h3>
    <h3>除贴现外的其他业务</h3>
    <table border="1">
      <tr>
        <th rowspan="2">账户编号</th>
        <th>责任类型</th>
        <th>保证合同编号</th>
        <th>币种</th>
        <th>还款责任金额</th>
        <th>授信机构/债券机构</th>
        <th>业务种类</th>
        <th>开立日期/接收日期</th>
        <th>到期日</th>
      </tr>
      <tr>
        <th>借款金额/信用额度</th>
        <th>余额</th>
        <th>五级分类</th>
        <th>逾期总额</th>
        <th>逾期本金</th>
        <th>逾期月数/还款状态</th>
        <th>剩余还款月数</th>
        <th>信息报告日期</th>
      </tr>
      <template v-for="item in arbCRepayDutyOfOtherCom">
        <tr>
          <td rowspan="2">{{ item.account_no }}</td>
          <td>{{ item.duty_type_name }}</td>
          <td>{{ item.guar_contrat_no }}</td>
          <td>{{ item.ccy_code }}</td>
          <td>{{ item.repayment_duty_amt }}</td>
          <td>{{ item.credit_branch }}</td>
          <td>{{ item.busi_class }}</td>
          <td>{{ item.start_date }}</td>
          <td>{{ item.end_date }}</td>
        </tr>
        <tr>
          <td>{{ item.loan_amt }}</td>
          <td>{{ item.balance }}</td>
          <td>{{ item.five_level_class }}</td>
          <td>{{ item.overdue_total_amt }}</td>
          <td>{{ item.overdue_principal }}</td>
          <td>{{ item.oberdue_month_num }}</td>
          <td>{{ item.repay_month_num }}</td>
          <td>{{ item.info_report_date }}</td>
        </tr>
      </template>
      <template v-if="arbCRepayDutyOfOtherCom.length === 0">
        <tr>
          <td rowspan="2"></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>

export default {
  name: "arbCRepayDutyOfOther",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      arbCRepayDutyOfOtherCom: []
    }
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.cParentParams) {
        this.arbCRepayDutyOfOtherCom = this.cParentParams;
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

h2, h3 {
  color: black;
  font-weight: bold;
}
</style>
