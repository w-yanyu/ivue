<template>
  <div>
    <h2>(六)贴现的历史表现</h2>
    <table border="1">
      <tr>
        <th rowspan="2">信息报告日期</th>
        <th>账户编号</th>
        <th>授信机构</th>
        <th>业务种类</th>
        <th>是否结清</th>
        <th>余额</th>
        <th>余额变化日期</th>
        <th>五级分类</th>
        <th>五级分类认定日期</th>
      </tr>
      <tr>
        <th>逾期总额</th>
        <th>逾期本金</th>
        <th>逾期月数</th>
        <th>最近一次约定还款日期</th>
        <th>最近一次应还总额</th>
        <th>最近一次实际还款日期</th>
        <th>最近一次实还总额</th>
        <th>最近一次还款形式</th>
      </tr>
      <template v-for="item in arbCDetAcountOfDisHisCom">
        <tr>
          <td rowspan="2">{{ item.info_report_date }}</td>
          <td>{{ item.account_no }}</td>
          <td>{{ item.credit_branch }}</td>
          <td>{{ item.busi_class }}</td>
          <td>{{ item.settle_flag }}</td>
          <td>{{ item.balance }}</td>
          <td>{{ item.balance_change_date }}</td>
          <td>{{ item.five_level_class }}</td>
          <td>{{ item.five_class_permit_date }}</td>
        </tr>
        <tr>
          <td>{{ item.overdue_total_amt }}</td>
          <td>{{ item.overdue_principal }}</td>
          <td>{{ item.oberdue_month_num }}</td>
          <td>{{ item.last_agree_repay_date }}</td>
          <td>{{ item.last_payable_amt }}</td>
          <td>{{ item.last_actual_repay_date }}</td>
          <td>{{ item.last_actual_repay_amt }}</td>
          <td>{{ item.last_repay_form }}</td>
        </tr>
      </template>
      <template v-if="arbCDetAcountOfDisHisCom.length === 0">
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
  name: "arbCDetAcountOfDisHis",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      arbCDetAcountOfDisHisCom: []
    }
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.cParentParams) {
        this.arbCDetAcountOfDisHisCom = this.cParentParams;
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

h1, h2 {
  color: black;
  font-weight: bold;
}
</style>
