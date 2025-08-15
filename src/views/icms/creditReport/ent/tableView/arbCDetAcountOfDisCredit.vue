<template>
  <div>
    <h2>(五)贴现的信贷明细</h2>
    <table border="1">
      <tr>
        <th>账户编号</th>
        <th>授信机构</th>
        <th>业务种类</th>
        <th>信息报告日期</th>
        <th>是否结清</th>
        <th>开户日期</th>
        <th>到期日</th>
        <th>币种</th>
        <th>贴现金额</th>
        <th>担保方式</th>
        <th>五级分类</th>
        <th>授信协议编号</th>
        <th>信息报告日期</th>
      </tr>
      <template v-for="item in arbCDetAcountOfDisCreditCom">
        <tr>
          <td>{{ item.account_no }}</td>
          <td>{{ item.credit_branch }}</td>
          <td>{{ item.busi_class }}</td>
          <td>{{ item.info_report_date }}</td>
          <td>{{ item.settle_flag }}</td>
          <td>{{ item.start_date }}</td>
          <td>{{ item.end_date }}</td>
          <td>{{ item.ccy_code }}</td>
          <td>{{ item.discount_amt }}</td>
          <td>{{ item.guar_type }}</td>
          <td>{{ item.five_level_class }}</td>
          <td>{{ item.credit_protocol_no }}</td>
          <td>{{ item.info_report_date }}</td>
        </tr>
      </template>
      <template v-if="arbCDetAcountOfDisCreditCom.length === 0">
        <tr>
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
          <td></td>
          <td></td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>

export default {
  name: "arbCDetAcountOfDisCredit",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      arbCDetAcountOfDisCreditCom: []
    }
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.cParentParams) {
        this.arbCDetAcountOfDisCreditCom = this.cParentParams;
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
