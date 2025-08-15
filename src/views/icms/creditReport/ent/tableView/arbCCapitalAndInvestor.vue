<template>
  <div>
    <h2><i class="el-icon-s-flag"></i>注册资本及主要出资人信息</h2>
    <table border="1">
      <tr>
        <th>类型</th>
        <th>出资方</th>
        <th>身份标识类型</th>
        <th>身份标识号码</th>
        <th>出资比例</th>
      </tr>
      <tr v-for="item in arbCCapitalAndInvestorCom">
        <td>{{ item.contributor_type }}</td>
        <td>{{ item.contributor }}</td>
        <td>{{ item.identity_type }}</td>
        <td>{{ item.identity_code }}</td>
        <td>{{ item.contribution_ratio }}</td>
      </tr>
      <tr v-if="arbCCapitalAndInvestorCom.length === 0">
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
  name: "arbCCapitalAndInvestor",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      arbCCapitalAndInvestorCom: []
    }
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.cParentParams) {
        this.arbCCapitalAndInvestorCom = this.cParentParams;
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
