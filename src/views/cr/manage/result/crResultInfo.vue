<template>
  <el-row>
    <el-col :span="24">
      <el-table :data="tableData">
        <el-table-column prop="fl_rank" :label="$i18ns('评级')" align="center">
        </el-table-column>
        <el-table-column :label="$i18ns('财务因素')">
          <el-table-column prop="orig_fincl__factor_sc" :label="$i18ns('原始得分')" align="center">
          </el-table-column>
          <el-table-column prop="fincl_factor_sc_rate" :label="$i18ns('权重(%)')" align="center">
          </el-table-column>
          <el-table-column prop="fincl_factor_sc" :label="$i18ns('分值')" align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$i18ns('非财务因素')">
          <el-table-column prop="orig_unfincl_factor_sc" :label="$i18ns('原始得分')" align="center">
          </el-table-column>
          <el-table-column prop="unfincl_factor_sc_rate" :label="$i18ns('权重(%)')" align="center">
          </el-table-column>
          <el-table-column prop="unfincl_factor_sc" :label="$i18ns('分值')" align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="$i18ns('评级结果')">
          <el-table-column prop="eval_sc" :label="$i18ns('总分')" align="center">
          </el-table-column>
          <el-table-column prop="ft_rank" :label="$i18ns('初始评级等级')" align="center">
          </el-table-column>
          <el-table-column prop="rank_id" :label="$i18ns('系统调整等级')" align="center">
          </el-table-column>
          <el-table-column prop="fl_rank" :label="$i18ns('认定等级')" align="center">
          </el-table-column>
          <el-table-column
            prop="orig_sc_diff"
            :label="$i18ns('原始得分分差')"
            align="center"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column prop="user_cd" :label="$i18ns('评定人')" align="center">
        </el-table-column>
        <el-table-column
          prop="flag"
          :label="$i18ns('评级状态')"
          align="center"
          :formatter="setStatus"
        >
        </el-table-column>
      </el-table>
    </el-col>
    <el-col :span="24">
      <div class="footer-result">
        <span>{{$i18ns('当前评级')}}: {{ fl_rank }}</span>
        <el-button v-if="adjustBtnVisible" type="warning" style="margin-left: 10px" @click="adjust()"
          >$i18ns("调整评级结果")</el-button
        >
      </div>
    </el-col>
    <el-col :offset="4" :span="16">
      <el-table border :data="tableData1" style="width: 100%">
        <el-table-column :label="$i18ns('调整原因')" prop="adju_rk" width="180"></el-table-column>
        <el-table-column :label="$i18ns('调整前级别')" prop="old_rlv" width="180"></el-table-column>
        <el-table-column :label="$i18ns('调整后级别')" prop="new_rlv" width="180"></el-table-column>
        <el-table-column :label="$i18ns('调整人')" prop="adju_user_id"> </el-table-column>
        <el-table-column :label="$i18ns('调整时间')" prop="adju_dt"> </el-table-column>
      </el-table>
    </el-col>
    <el-dialog
      :close-on-click-modal="false"
      :title="$i18ns('调整评级结果')"
      :visible.sync="dialogVisible"
      :width="dialogWidth"
      :append-to-body="true"
    >
      <adjustResult
        v-if="dialogVisible"
        :cParentParams="cParentParams"
        @update="update()"
      ></adjustResult>
    </el-dialog>
  </el-row>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import adjustResult from "./adjustResult.vue"; //
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
          user_cd: "",
          flag: "",
          eval_dt: "",
          totalRecord: "",
        },
      ],
      tableData1: [],
      dialogVisible: false,
      adjustBtnVisible: false,
      appl_id: "",
      fl_rank: "",
      //根据用户编码用来控制按钮权限
      userCode: this.$store.state.pte_user.userInfo.userCode,
      dialogWidth: "60%",
      toUrl: "",
      params: {},
    };
  },
  components: {
    adjustResult,
  },
  created() {
    this.fetchData();
    this.fetchDataAdjust();
    this.adjustBtnInit();
  },
  methods: {
    fetchData() {
      this.appl_id = this.cParentParams.appl_id;
      this.procinstid = this.cParentParams.procinstid;
      let params = {
        appl_id: this.cParentParams.appl_id,
        servicecode: "cr1018",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          console.log(res.data)
          if (res && res.code === "200") {
            this.fl_rank = res.data.fl_rank;
            this.tableData[0].appl_id = res.data.appl_id;
            this.tableData[0].user_cd = res.data.user_cd;
            this.tableData[0].unfincl_factor_sc_rate = res.data.unfincl_factor_sc_rate;
            this.tableData[0].orig_fincl__factor_sc = res.data.orig_fincl_factor_sc;
            this.tableData[0].fincl_factor_sc_rate = res.data.fincl_factor_sc_rate;
            this.tableData[0].fincl_factor_sc = res.data.fincl_factor_sc;
            this.tableData[0].orig_unfincl_factor_sc = res.data.orig_unfincl_factor_sc;
            this.tableData[0].unfincl_factor_sc = res.data.unfincl_factor_sc;
            this.tableData[0].fl_rank = res.data.fl_rank;
            this.tableData[0].rank_id = res.data.rank_id;
            this.tableData[0].ft_rank = res.data.ft_rank;
            this.tableData[0].orig_sc_diff = res.data.orig_sc_diff
              // Number(res.data.fincl_factor_sc) - Number(res.data.unfincl_factor_sc);
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
    },
    fetchDataAdjust() {
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
    adjustBtnInit() {
      this.rank_id = this.cParentParams.reserve2
      let params = {
        // temp_id: this.cParentParams.temp_id,
        temp_id: this.cParentParams.reserve2,
        role_id: this.cParentParams.cur_wfrl_id,
        servicecode: "cr0065",
      };
      //
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            // this.crpflowAuth = res.data;
            if (res.data.read_level === "2") {
            	this.adjustBtnVisible = true;
            } else {
            	this.adjustBtnVisible = false;
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    adjust() {
      this.dialogVisible = true;
    },
    update() {
      this.dialogVisible = false;
      this.fetchData();
      this.fetchDataAdjust();
    },
    gotolink() {
      this.$router.replace("/login");
    },
    setStatus(data) {
      return data.flag === "Y" ? this.effective : this.invalid;
    },
  },
};
</script>
<style scoped>
.footer-result {
  text-align: center;
  min-height: 36px;
  background: #bfd4e8;
  margin: 10px 10px 10px 10px !important;
}
.el-table-column {
  text-align: center;
}
</style>
