<template>
  <div>
    <h2>(九) 非信贷记录</h2>
    <h2><i class="el-icon-s-grid"></i>公用事业历史缴费记录明细</h2>
    <table border="1">
      <tr>
        <th>公用事业单位名称</th>
        <th>业务类型</th>
        <th>统计年月</th>
        <th>缴费状态</th>
        <th>本月应缴金额</th>
        <th>本月实缴金额</th>
        <th>累计欠费金额</th>
      </tr>
      <tr v-for="item in arbCNonCreditCom">
        <td>{{ item.name }}</td>
        <td>{{ item.busi_type_name }}</td>
        <td>{{ item.statistics_year_month }}</td>
        <td>{{ item.payment_status }}</td>
        <td>{{ item.this_month_payment_amt }}</td>
        <td>{{ item.this_month_actual_repay_amt }}</td>
        <td>{{ item.arrears_amt }}</td>
      </tr>
      <tr v-if="arbCNonCreditCom.length === 0">
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
  name: "arbCNonCredit",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      arbCNonCreditCom: []
    }
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.cParentParams) {
        this.arbCNonCreditCom = this.cParentParams;
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

h2 {
  color: black;
  font-weight: bold;
}
</style>
