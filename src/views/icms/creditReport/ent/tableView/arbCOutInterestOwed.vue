<template>
  <div>
    <h2><i class="el-icon-s-flag"></i>未结清信贷</h2>
    <h3><i class="el-icon-s-grid"></i>欠息</h3>
    <table border="1">
      <tr>
        <th>授信机构</th>
        <th>欠息类型</th>
        <th>币种</th>
        <th>欠息余额</th>
        <th>余额变化日期</th>
        <th>信息报告日期</th>
      </tr>
      <tr v-for="item in arbCOutInterestOwedCom">
        <td>{{ item.credit_branch }}</td>
        <td>{{ item.debit_interest_type }}</td>
        <td>{{ item.ccy_code }}</td>
        <td>{{ item.balance }}</td>
        <td>{{ item.balance_change_date }}</td>
        <td>{{ item.info_report_date }}</td>
      </tr>
      <tr v-if="arbCOutInterestOwedCom.length === 0">
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
  name: "arbCOutInterestOwed",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      arbCOutInterestOwedCom: []
    }
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.cParentParams) {
        this.arbCOutInterestOwedCom = this.cParentParams;
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
