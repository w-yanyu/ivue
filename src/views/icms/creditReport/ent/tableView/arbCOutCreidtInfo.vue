<template>
  <div>
    <h3><i class="el-icon-s-grid"></i>授信信息</h3>
    <table border="1">
      <tr>
        <th rowspan="2">授信协议编号</th>
        <th>授信机构</th>
        <th>授信额度类型</th>
        <th>额度循环标志</th>
        <th>生效日期</th>
        <th>到期日</th>
        <th rowspan="2">信息报告日期</th>
      </tr>
      <tr>
        <th>币种</th>
        <th>授信额度</th>
        <th>已用额度</th>
        <th>授信限额</th>
        <th>授信限额编号</th>
      </tr>
      <template  v-for="item in arbCOutCreidtInfoCom">
        <tr>
          <td rowspan="2">{{item.credit_protocol_no}}</td>
          <td>{{item.credit_branch}}</td>
          <td>{{item.credit_line_type}}</td>
          <td>{{item.quota_cycle_flag}}</td>
          <td>{{item.start_date}}</td>
          <td>{{item.end_date}}</td>
          <td rowspan="2">{{item.info_report_date}}</td>
        </tr>
        <tr>
          <td>{{item.ccy_code}}</td>
          <td>{{item.credit_quota}}</td>
          <td>{{item.used_amt}}</td>
          <td>{{item.credit_limit_amt}}</td>
          <td>{{item.credit_limit_no}}</td>
        </tr>
      </template>
      <template  v-if="arbCOutCreidtInfoCom.length === 0">
        <tr>
          <td rowspan="2"></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td rowspan="2"></td>
        </tr>
        <tr>
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
  name: "arbCOutCreidtInfo",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      arbCOutCreidtInfoCom: []
    }
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.cParentParams) {
        this.arbCOutCreidtInfoCom = this.cParentParams;
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
