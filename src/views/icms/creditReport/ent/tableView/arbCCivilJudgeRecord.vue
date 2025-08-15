<template>
  <div>
    <h2 class="el-icon-s-flag">民事判决记录</h2>
    <template v-for="item in arbCCivilJudgeRecordCom">
      <table border="1">
        <tr>
          <td class="td-left"><span class="td-tag">立案法院：</span>{{ item.filing_court }}</td>
          <td class="td-right"><span class="td-tag">立案日期：</span>{{ item.filing_date }}</td>
        </tr>
        <tr>
          <td class="td-left"><span class="td-tag">案由：</span>{{ item.case_reason }}</td>
          <td class="td-right"><span class="td-tag">诉讼地位：</span>{{ item.litigious_status }}</td>
        </tr>
        <tr>
          <td class="td-left"><span class="td-tag">案号：</span>{{ item.case_no }}</td>
          <td class="td-right"><span class="td-tag">审判程序：：</span>{{ item.trial_procedure }}</td>
        </tr>
        <tr>
          <td class="td-left"><span class="td-tag">诉讼标的：</span>{{ item.action_object }}</td>
          <td class="td-right"><span class="td-tag">诉讼标的金额（元）：</span>{{ item.action_object_amt }}</td>
        </tr>
        <tr>
          <td class="td-left"><span class="td-tag">结案方式：</span>{{ item.closing_method }}</td>
          <td class="td-right"><span class="td-tag">判决/调解生效日期：</span>{{ item.effective_date }}</td>
        </tr>
        <tr>
          <td class="td-row" colspan="2"><span class="td-tag">判决/调解结果：</span>{{ item.judge_result }}</td>
        </tr>
      </table>
      <br>
    </template>

  </div>
</template>

<script>

export default {
  name: "arbCCivilJudgeRecord",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      arbCCivilJudgeRecordCom: []
    }
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.cParentParams) {
        this.arbCCivilJudgeRecordCom = this.cParentParams;
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
