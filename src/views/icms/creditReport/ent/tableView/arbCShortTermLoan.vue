<template>
  <div>
    <h3><i class="el-icon-s-grid"></i>短期借款</h3>
    <table border="1">
      <tr>
        <th rowspan="2">账户编号</th>
        <th>授信机构</th>
        <th>业务种类</th>
        <th>开立日期</th>
        <th>到期日</th>
        <th>币种</th>
        <th>借款金额</th>
      </tr>
      <tr>
        <th>关闭日期</th>
        <th>五级分类</th>
        <th colspan="2">最后一次还款日期</th>
        <th>最后一次还款形式</th>
        <th>历史表现</th>
      </tr>
      <template v-for="item in arbCShortTermLoanCom">
        <tr>
          <td rowspan="2">{{ item.account_no }}</td>
          <td>{{ item.credit_branch }}</td>
          <td>{{ item.busi_class }}</td>
          <td>{{ item.start_date }}</td>
          <td>{{ item.end_date }}</td>
          <td>{{ item.ccy_code }}</td>
          <td>{{ item.loan_amt }}</td>
        </tr>
        <tr>
          <td>{{ item.close_date }}</td>
          <td>{{ item.five_level_class }}</td>
          <td colspan="2">{{ item.last_repay_date }}</td>
          <td>{{ item.last_repay_form }}</td>
          <td>{{ item.his_performance }}</td>
        </tr>
      </template>
      <template v-if="arbCShortTermLoanCom.length === 0">
        <tr>
          <td rowspan="2"></td>
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
          <td colspan="2"></td>
          <td></td>
          <td></td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>

export default {
  name: "arbCShortTermLoan",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      arbCShortTermLoanCom: []
    }
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.cParentParams) {
        this.arbCShortTermLoanCom = this.cParentParams;
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
