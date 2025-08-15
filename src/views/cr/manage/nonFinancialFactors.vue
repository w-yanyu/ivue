<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="metric_type" :label="$i18ns('分类名称')" :formatter="setStatus"> </el-table-column>
        <el-table-column prop="metric_id" :label="$i18ns('评级指标编码')" v-if="show">
        </el-table-column>
        <el-table-column prop="metric_name" :label="$i18ns('指标名称')"> </el-table-column>
        <el-table-column prop="tkpi_val" :label="$i18ns('指标值')">
          <template slot-scope="scope">
            <select-option :metric_id="scope.row.metric_id" :scope="scope">
            </select-option>
          </template>
        </el-table-column>
        <el-table-column prop="tkpi_sc" :label="$i18ns('指标得分')"> </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import selectOption from "./select.vue"; // 信用评级财务因素页面
export default {
   props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      show: false,
      tableData: [],
      formData: {
        servicecode: "cr1017",
        cust_no: "",
        temp_id: "",
        appl_id: "",
        is_fincl: "0",
        metric_kind: "",
        eval_dt: "",
        infoList: [],
      },
    };
  },
  components: {
    selectOption,
  },
  created() {},
  methods: {
     setStatus(row, column) {
      return this.getSatus(row.metric_type);
    },
    getSatus(metric_type){
      debugger;
     switch (metric_type) {
        case '01':
          return this.$i18ns("偿债能力");
        case '02':
          return this.$i18ns("财务效益");
        case '03':
          return this.$i18ns("资金运营");
        case '04':
          return this.$i18ns("发展能力");
        case '05':
          return this.$i18ns("企业规模");
        case '11':
          return this.$i18ns("行业因素");
        case '12':
          return this.$i18ns("管理水平");
        case '13':
          return this.$i18ns("财务制度");
        case '14':
          return this.$i18ns("经营状况");
        case '15':
          return this.$i18ns("还款记录");
        case '16':
          return this.$i18ns("结算记录");
        case '17':
          return this.$i18ns("其他");
        case '21':
          return this.$i18ns("个人素质力");
        case  '22':
          return this.$i18ns("购房及还款能力");
        case '23':
          return this.$i18ns("贷款保证力");
        case '24':
          return this.$i18ns("个人基本情况");
        default:
          return "";
      }
    },
  },
  mounted: function () {
    var _this = this; //很重要！！
    let params = {
      appl_id: this.cParentParams.appl_id,
      servicecode: "cr1016",
      is_fincl: "0",
      temp_id: this.cParentParams.temp_id,
      metric_kind: "2"
    };
    MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then((res) => {
        if (res && res.code === "200") {
          _this.tableData = res.data;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
</script>

