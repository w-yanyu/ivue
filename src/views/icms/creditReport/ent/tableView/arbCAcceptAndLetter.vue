<template>
  <div>
    <h3><i class="el-icon-s-grid"></i>银行承兑汇票和信用证</h3>
    <table border="1">
      <tr>
        <th>授信机构</th>
        <th>业务种类</th>
        <th>五级分类</th>
        <th>账户数</th>
        <th>垫款标志</th>
      </tr>
      <tr v-for="item in arbCAcceptAndLetterCom">
        <td>{{ item.credit_branch }}</td>
        <td>{{ item.busi_class }}</td>
        <td>{{ item.five_level_class }}</td>
        <td>{{ item.account_num }}</td>
        <td>{{ item.advance_sign }}</td>
      </tr>
      <tr v-if="arbCAcceptAndLetterCom.length === 0">
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
  name: "arbCAcceptAndLetter",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      arbCAcceptAndLetterCom: []
    }
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.cParentParams) {
        this.arbCAcceptAndLetterCom = this.cParentParams;
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
