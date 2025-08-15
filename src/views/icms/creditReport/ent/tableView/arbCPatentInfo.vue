<template>
  <div>
    <h2><i class="el-icon-s-flag"></i>拥有专利情况</h2>
    <table border="1">
      <tr>
        <th>专利名称</th>
        <th>专利号</th>
        <th>申请日期</th>
        <th>授予日期</th>
        <th>专利有效期（单位：年）</th>
      </tr>
      <tr v-for="item in arbCPatentInfoCom">
        <td>{{ item.patent_name }}</td>
        <td>{{ item.patent_code }}</td>
        <td>{{ item.apply_date }}</td>
        <td>{{ item.start_date }}</td>
        <td>{{ item.patent_validity }}</td>
      </tr>
      <tr v-if="arbCPatentInfoCom.length === 0">
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
  name: "arbCPatentInfo",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      arbCPatentInfoCom: []
    }
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.cParentParams) {
        this.arbCPatentInfoCom = this.cParentParams;
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
