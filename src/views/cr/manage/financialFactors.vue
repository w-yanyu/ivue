<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        prop="metric_type"
        :label="分类名称"
        :formatter="setStatus"
      >
      </el-table-column>
      <el-table-column prop="metric_name" :label="指标名称"> </el-table-column>
      <el-table-column prop="tkpi_val" :label="指标值"> </el-table-column>
      <el-table-column prop="tkpi_sc" :label="指标得分"> </el-table-column>
    </el-table>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
export default {
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      分类名称:this.$i18ns("分类名称"),
      指标名称:this.$i18ns("指标名称"),
      指标值:this.$i18ns("指标值"),
      指标得分:this.$i18ns("指标得分"),

      stripe: true, //是否为斑马纹 table
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      total: 0,
    };
  },
  created() {
    let params = {
      appl_id: this.cParentParams.appl_id,
      servicecode: "cr1016",
      is_fincl: "1",
      temp_id: this.cParentParams.temp_id,
      metric_kind: "1"
    };
    MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then((res) => {
        if (res && res.code === "200") {
          this.tableData = res.data;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },
  methods: {
    setStatus(row, column) {
      return this.getSatus(row.metric_type);
    },

    getSatus(metric_type) {
      switch (metric_type) {
        case "01":
          return this.$i18ns("偿债能力");
        case "02":
          return this.$i18ns("财务效益");
        case "03":
          return this.$i18ns("资金运营");
        case "04":
          return this.$i18ns("发展能力");
        case "05":
          return this.$i18ns("企业规模");
        case "11":
          return this.$i18ns("行业因素");
        case "12":
          return this.$i18ns("管理水平");
        case "13":
          return this.$i18ns("财务制度");
        case "14":
          return this.$i18ns("经营状况");
        case "15":
          return this.$i18ns("还款记录");
        case "16":
          return this.$i18ns("结算记录");
        case "17":
          return this.$i18ns("其他");
        case "21":
          return this.$i18ns("个人素质力");
        case "22":
          return this.$i18ns("购房及还款能力");
        case "23":
          return this.$i18ns("贷款保证力");
        case "24":
          return this.$i18ns("个人基本情况");
        default:
          return "";
      }
    },
  },
};
</script>

