<template>
  <el-row>
    <el-col :span="24">
      <el-table :data="tableData">
        <el-table-column prop="fl_rank" :label="$i18ns('评级')"> </el-table-column>
        <el-table-column :label="$i18ns('财务因素')">
          <el-table-column prop="orig_fincl__factor_sc" :label="$i18ns('原始得分')"></el-table-column>
          <el-table-column prop="fincl_factor_sc_rate" :label="$i18ns('权重(%)')"> </el-table-column>
          <el-table-column prop="fincl_factor_sc" :label="$i18ns('分值')"> </el-table-column>
        </el-table-column>
        <el-table-column :label="$i18ns('非财务因素')">
          <el-table-column prop="orig_unfincl_factor_sc" :label="$i18ns('原始得分')"></el-table-column>
          <el-table-column prop="unfincl_factor_sc_rate" :label="$i18ns('权重(%)')"> </el-table-column>
          <el-table-column prop="unfincl_factor_sc" :label="$i18ns('分值')"> </el-table-column>
        </el-table-column>
        <el-table-column :label="$i18ns('评级结果')">
          <el-table-column prop="eval_sc" :label="$i18ns('总分')"> </el-table-column>
          <el-table-column prop="ft_rank" :label="$i18ns('评级等级')"> </el-table-column>
          <el-table-column prop="rank_id" :label="$i18ns('系统调整等级')"></el-table-column>
          <el-table-column prop="fl_rank" :label="$i18ns('认定等级')"> </el-table-column>
          <el-table-column prop="orig_sc_diff" :label="$i18ns('原始得分分差')">
          </el-table-column>
        </el-table-column>
        <el-table-column prop="usercd" :label="$i18ns('评定人')"> </el-table-column>
        <el-table-column prop="flag" :label="$i18ns('评级状态')" :formatter="setStatus"> </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="24">
      <div class="footer-result">
        <span>{{$i18ns('当前评级')}}: {{fl_rank}}</span>
      </div>
    </el-col>
    <el-col :span="12" :offset="6">
      <el-table border :data="tableData1" style="width: 100%">
        <el-table-column prop="adju_rk" :label="$i18ns('调整原因')" width="180">
        </el-table-column>
        <el-table-column prop="new_rlv" :label="$i18ns('调整后级别')" width="180">
        </el-table-column>
        <el-table-column prop="adju_user_id" :label="$i18ns('调整人')"> </el-table-column>
        <el-table-column :label="$i18ns('调整时间')" prop="adju_dt"> </el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
export default {
  name: "crResultInfo",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      effective:this.$i18ns('有效'),
      invalid:this.$i18ns('无效'),
      tableData: [
        {
          appl_id: "",
          orig_fincl__factor_sc: "",
          fincl_factor_sc_rate: "",
          fincl_factor_sc: "",
          orig_unfincl_factor_sc: "",
          unfincl_factor_sc_rate: "",
          unfincl_factor_sc: "",
          ft_rank: "",
          rank_id: "",
          fl_rank: "",
          orig_sc_diff: "",
          eval_sc: "",
          usercd: "xadmin",
          flag: "",
          eval_dt: "",
          totalRecord: ""
        },
      ],
      tableData1: [],
      dialogVisible: false,
      appl_id: "",
      fl_rank: "",
      //根据确定用来控制按钮权限
      userCode: this.$store.state.pte_user.userInfo.userCode,
      dialogWidth: "60%",
      toUrl: "",
      params: {},
    };
  },
  components: {

  },
  created() {
    this.appl_id = this.cParentParams.appl_id;
    this.procinst_id = this.cParentParams.procinst_id;
    let params = {
      appl_id: this.cParentParams.appl_id,
      servicecode: "cr1018"
    };
    MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then((res) => {
        if (res && res.code === "200") {
          console.log();
          this.fl_rank = res.data.fl_rank;
          this.tableData[0].appl_id = res.data.appl_id;
          this.tableData[0].unfincl_factor_sc_rate = res.data.unfincl_factor_sc_rate;
          this.tableData[0].fincl_factor_sc_rate = res.data.fincl_factor_sc_rate;
          this.tableData[0].orig_fincl__factor_sc = res.data.orig_fincl_factor_sc;
          this.tableData[0].fincl_factor_sc = res.data.fincl_factor_sc;
          this.tableData[0].orig_unfincl_factor_sc = res.data.orig_unfincl_factor_sc;
          this.tableData[0].unfincl_factor_sc = res.data.unfincl_factor_sc;
          this.tableData[0].fl_rank = res.data.fl_rank;
          this.tableData[0].rank_id = res.data.rank_id;
          this.tableData[0].ft_rank = res.data.ft_rank;
          this.tableData[0].orig_sc_diff = res.data.orig_sc_diff;
          this.tableData[0].sercd = res.data.sercd;
          this.tableData[0].flag = res.data.flag;
          this.tableData[0].eval_dt = res.data.eval_dt;
          this.tableData[0].eval_dt = res.data.eval_dt;
          this.tableData[0].eval_sc = res.data.eval_sc;
        }
      })
      .catch((err) => {
        console.error(err);
      });
    let params1 = {
      appl_id: this.cParentParams.appl_id,
      servicecode: "cr1022",
    };
    MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params1)
      .then((res) => {
        if (res && res.code === "200") {
          this.tableData1 = res.data;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },
  methods: {
    update() {
      this.dialogVisible = false;
    },
    gotolink() {
      this.$router.replace("/login");
    },
    setStatus(row, column) {
      switch (row.flag) {
        case "Y":
          return this.effective;
        case "N":
          return this.invalid;
        default:
          return "";
      }
    }
  }
};
</script>
<style scoped>
.footer-result {
  text-align: center;
  min-height: 36px;
  background: #bfd4e8;
  margin: 10px 10px 10px 10px !important;
}
</style>
