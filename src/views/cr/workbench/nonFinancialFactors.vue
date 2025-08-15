<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          prop="metric_type"
          :label="分类名称"
          :formatter="setStatus"
        >
        </el-table-column>
        <el-table-column prop="metric_id" :label="评级指标编码" v-if="show">
        </el-table-column>
        <el-table-column prop="metric_name" :label="指标名称"> </el-table-column>
        <el-table-column prop="tkpi_val" :label="指标值">
          <template slot-scope="scope">
            <select-option :metric_id="scope.row.metric_id" :scope="scope">
            </select-option>
          </template>
        </el-table-column>
        <el-table-column prop="tkpi_sc" :label="指标得分"> </el-table-column>
      </el-table>
      <el-form-item align="center">
        <el-button type="primary" @click="onSubmit()">{{$i18ns('保存')}}</el-button>
      </el-form-item>
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
      分类名称:this.$i18ns("分类名称"),
      指标名称:this.$i18ns("指标名称"),
      指标值:this.$i18ns("指标值"),
      指标得分:this.$i18ns("指标得分"),
      
      show: false,
      tableData: [],
      formData: {
        servicecode: "cr1017",
        cust_no: "",
        temp_id: "",
        appl_id: "",
        is_fincl: "0",
        evaldt: "",
        infoList: [],
      },
    };
  },
  components: {
    selectOption,
  },
  created() {
    this.getTabInfo(); // 获取tab信息
    //this.formData.cust_no = this.cParentParams.ci;
  },
  methods: {
    onSubmit(param) {
      this.formData.cust_no = this.cParentParams.cust_id;

      this.formData.temp_id = this.cParentParams.reserve2;
      this.formData.appl_id = this.cParentParams.appl_id;
      this.formData.infoList = [];
      this.formData.is_fincl = '0';
      var flag = '0';
      this.tableData.forEach((item) => {
        let obj = {};
        obj.metric_id = item.metric_id;
        obj.rati_id = item.rati_id;
        obj.metric_type = item.metric_type;
        obj.tkpi_val = item.tkpi_val;
        this.formData.infoList.push(obj);
        if (item.tkpi_val != null && item.tkpi_val != ''){
          flag = '1';
        }
      });
      console.log(this.tableData);
      console.log('非财务指标不能全为空=======》》' + flag);
      // if(flag == '0'){
      //   this.$alert('非财务指标不能全为空');
      //   return;
      // }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", this.formData)
        .then((res) => {
          if (res && res.code === "200") {
            this.getTabInfo();
            this.$message({
              type: 'success',
              message: 'success'
            });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    setStatus(row, column) {
      return this.getSatus(row.metric_type);
    },
    getSatus(metric_type) {
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
    getTabInfo(){
      let params = {
        appl_id: this.cParentParams.appl_id,
        is_fincl: "0",
        servicecode: "cr1016",
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
    }
  }
};
</script>

