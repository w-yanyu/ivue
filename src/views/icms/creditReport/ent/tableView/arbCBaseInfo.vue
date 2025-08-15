<template>
  <div>
    <h1 class="table-title">基本信息</h1>
    <h2><i class="el-icon-s-flag"></i>基本概况信息</h2>
    <table border="1">
      <tr>
        <th ></th>
        <th ></th>
        <th ></th>
        <th ></th>
      </tr>
      <tr>
        <td class="td-left">经济类型</td>
        <td>{{ arbCBaseInfoCom.economic_type_name }}</td>
        <td class="td-left">信息来源机构</td>
        <td>{{ arbCBaseInfoCom.economic_type_info_branch }}</td>
      </tr>
      <tr>
        <td class="td-left">组织机构类型</td>
        <td>{{ arbCBaseInfoCom.branch_type }}</td>
        <td class="td-left">信息来源机构</td>
        <td>{{ arbCBaseInfoCom.branch_type_info_branch }}</td>
      </tr>
      <tr>
        <td class="td-left">企业规模</td>
        <td>{{ arbCBaseInfoCom.enterprise_size }}</td>
        <td class="td-left">信息来源机构</td>
        <td>{{ arbCBaseInfoCom.enterprise_size_info_branch }}</td>
      </tr>
      <tr>
        <td class="td-left">所属行业</td>
        <td>{{ arbCBaseInfoCom.industry }}</td>
        <td class="td-left">信息来源机构</td>
        <td>{{ arbCBaseInfoCom.industry_info_branch }}</td>
      </tr>
      <tr>
        <td class="td-left">成立年份</td>
        <td>{{ arbCBaseInfoCom.established_year }}</td>
        <td class="td-left">信息来源机构</td>
        <td>{{ arbCBaseInfoCom.established_year_info_branch }}</td>
      </tr>
      <tr>
        <td class="td-left">登记证书有效截止日期</td>
        <td>{{ arbCBaseInfoCom.registration_deadline_date }}</td>
        <td class="td-left">信息来源机构</td>
        <td>{{ arbCBaseInfoCom.deadline_info_branch }}</td>
      </tr>
      <tr>
        <td class="td-left">登记地址</td>
        <td>{{ arbCBaseInfoCom.registration_addr }}</td>
        <td class="td-left">信息来源机构</td>
        <td>{{ arbCBaseInfoCom.registration_addr_info_branch }}</td>
      </tr>
      <tr>
        <td class="td-left">办公/经营地址</td>
        <td>{{ arbCBaseInfoCom.busi_addr }}</td>
        <td class="td-left">信息来源机构</td>
        <td>{{ arbCBaseInfoCom.busi_addr_info_branch }}</td>
      </tr>
      <tr>
        <td class="td-left">存续状态</td>
        <td>{{ arbCBaseInfoCom.survival_state }}</td>
        <td class="td-left">信息来源机构</td>
        <td>{{ arbCBaseInfoCom.survival_state_info_branch }}</td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  name: "arbCBaseInfo",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      arbCBaseInfoCom: {
        branch_type_info_branch: "",
        apply_no: "",
        credit_reports_no: "",
        established_year: "",
        enterprise_size: "",
        registration_addr_info_branch: "",
        busi_addr_info_branch: "",
        industry: "",
        deadline_info_branch: "",
        registration_addr: "",
        branch_type: "",
        org_id: "",
        established_year_info_branch: "",
        survival_state_info_branch: "",
        busi_addr: "",
        industry_info_branch: "",
        registration_deadline_date: "",
        economic_type_name: "",
        survival_state: "",
        economic_type_info_branch: "",
        enterprise_size_info_branch: ""
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
        this.arbCBaseInfoCom = this.cParentParams;
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
    display: none;
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

h1 {
  color: black;
  font-weight: bold;
}
h2 {
  color: black;
  font-weight: bold;
}

.table-title {
  width: 100%;
  text-align: center;
}

.td-left{
  color: black;
  font-weight: bold;
}
</style>
