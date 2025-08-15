<template>
  <div>
    <h1 class="table-title">非信贷记录明细</h1>
    <h2><i class="el-icon-s-flag"></i>公用事业缴费信息</h2>
    <table border="1">
      <tr>
        <th>公用事业单位名称</th>
        <th>业务类型</th>
        <th>缴费状态</th>
        <th>累计欠费金额</th>
        <th>统计年月</th>
      </tr>
      <tr v-for="item in arbCUtilitiesInfoCom">
        <td>{{ item.name }}</td>
        <td>{{ item.busi_type_name }}</td>
        <td>{{ item.payment_status }}</td>
        <td>{{ item.arrears_amt }}</td>
        <td>{{ item.statistics_year_month }}</td>
      </tr>
      <tr v-if="arbCUtilitiesInfoCom.length === 0">
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
  name: "arbCUtilitiesInfo",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      arbCUtilitiesInfoCom: []
    }
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.cParentParams) {
        this.arbCUtilitiesInfoCom = this.cParentParams;
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

.table-title {
  width: 100%;
  text-align: center;
}
</style>
