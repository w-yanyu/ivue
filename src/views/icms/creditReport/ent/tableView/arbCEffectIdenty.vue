<template>
  <div>
    <h1 class="table-title">身份标识</h1>
    <table border="1">
      <tr>
        <td class="td-left">企业名称</td>
        <td class="td-right">{{ arbCEffectIdentyCom.company_name }}</td>
      </tr>
      <tr>
        <td class="td-left">中征码</td>
        <td class="td-right">{{ arbCEffectIdentyCom.medain_code }}</td>
      </tr>
      <tr>
        <td class="td-left">统一社会信用代码</td>
        <td class="td-right">{{ arbCEffectIdentyCom.unified_social_credit_code }}</td>
      </tr>
      <tr>
        <td class="td-left">组织机构代码</td>
        <td class="td-right">{{ arbCEffectIdentyCom.branch_id }}</td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  name: "arbCEffectIdenty",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      arbCEffectIdentyCom: {
        company_name: "",
        medain_code: "",
        unified_social_credit_code: "",
        branch_id: ""
      }
    }
  },
  computed: {},
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.cParentParams) {
        this.arbCEffectIdentyCom = this.cParentParams;
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
    white-space:nowrap;  //强制在一行显示
    overflow:hidden;    //溢出的内容切割隐藏
    text-overflow:ellipsis; //当内联溢出块容器时，将溢出部分替换为…
    word-break:keep-all;  //允许在单词内换行
  }
  caption {
    text-align: center;
  }
}

h1 {
  color: black;
  font-weight: bold;
}

.td-left {
  color: black;
  width: 30%;
}

.td-right {
  width: 70%;
  padding-left: 8px;
  text-align: left;
}

.table-title {
  width: 100%;
  text-align: center;
}
</style>
