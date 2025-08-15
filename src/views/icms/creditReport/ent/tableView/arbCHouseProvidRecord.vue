<template>
  <div>
    <h2 class="el-icon-s-flag">住房公积金缴费记录</h2>
    <template v-for="item in arbCHouseProvidRecordCom">
      <table border="1">
        <tr>
          <td class="td-left"><span class="td-tag">统计年月：</span>{{ item.statistics_year_month }}</td>
          <td class="td-right"><span class="td-tag">初缴年月：</span>{{ item.initial_payment_date }}</td>
        </tr>
        <tr>
          <td class="td-left"><span class="td-tag">职工人数：</span>{{ item.worker_num }}</td>
          <td class="td-right"><span class="td-tag">缴费基数（元）：</span>{{ item.payment_base }}</td>
        </tr>
        <tr>
          <td class="td-left"><span class="td-tag">最近一次缴费日期：</span>{{ item.last_pay_date }}</td>
          <td class="td-right"><span class="td-tag">缴至年月：</span>{{ item.end_year_month }}</td>
        </tr>
        <tr>
          <td class="td-left"><span class="td-tag">缴费状态：</span>{{ item.payment_status }}</td>
          <td class="td-right"><span class="td-tag">累计欠费金额（元）：</span>{{ item.arrears_amt }}</td>
        </tr>
      </table>
      <br>
    </template>

  </div>
</template>

<script>

export default {
  name: "arbCHouseProvidRecord",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      arbCHouseProvidRecordCom: []
    }
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.cParentParams) {
        this.arbCHouseProvidRecordCom = this.cParentParams;
      }
    }
  }
}
</script>


<style lang="less" scoped>
table {
  width: calc(100% - 10px);
  height: auto;
  min-height: 200px;
  margin: 0 10px 0 10px;

  td {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
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

h2 {
  color: black;
  font-weight: bold;
}

.td-left {
  width: 50%;
  text-align: left;
}

.td-tag {
  color: black;
}

.td-row {
  height: 100px;
  min-height: 100px;
  text-align: left;
  vertical-align: top;
}

.td-right {
  width: 50%;
  padding-left: 8px;
  text-align: left;
}

.table-title {
  width: 100%;
  text-align: center;
}
</style>
