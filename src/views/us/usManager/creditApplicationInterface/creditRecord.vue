<template>
  <el-row>
    <el-col :span="24">
      <el-table :data="tableData">
        <el-table-column prop="flrank" label="评级" align="center">
        </el-table-column>
        <el-table-column label="财务因素">
          <el-table-column prop="origfinasc" label="原始得分" align="center">
          </el-table-column>
          <el-table-column prop="financial" :label="$i18ns('权重(%)')" align="center">
          </el-table-column>
          <el-table-column prop="finasc" :label="$i18ns('分值')" align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="非财务因素">
          <el-table-column prop="origunfisc" label="原始得分" align="center">
          </el-table-column>
          <el-table-column prop="unfinancial" :label="$i18ns('权重(%)')" align="center">
          </el-table-column>
          <el-table-column prop="unfisc" :label="$i18ns('分值')" align="center">
          </el-table-column>
        </el-table-column>
        <el-table-column label="评级结果">
          <el-table-column prop="totalfinasc" label="总分" align="center">
          </el-table-column>
          <el-table-column prop="ftrank" label="评级等级" align="center">
          </el-table-column>
          <el-table-column prop="rankid" label="系统调整等级" align="center">
          </el-table-column>
          <el-table-column prop="flrank" label="认定等级" align="center">
          </el-table-column>
          <el-table-column
            prop="origfinascdiff"
            label="原始得分分差"
            align="center"
          >
          </el-table-column>
        </el-table-column>
        <el-table-column prop="usercd" label="评定人" align="center">
        </el-table-column>
        <el-table-column
          prop="flag"
          label="评级状态"
          align="center"
          :formatter="setStatus"
        >
        </el-table-column>
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
      tableData: [
        {
          cust_no: "",
          origfinasc: "",
          financial: "",
          finasc: "",
          origunfisc: "",
          unfinancial: "",
          unfisc: "",
          ftrank: "",
          rankid: "",
          flrank: "",
          origfinascdiff: "",
          totalfinasc: "",
          usercd: "",
          flag: "",
          evaldt: "",
          totalRecord: "",
        },
      ],
      tableData1: [],
      dialogVisible: false,
      applid: "",
      flrank: "",
      //根据确定用来控制按钮权限
      userCode: this.$store.state.pte_user.userInfo.userCode,
      dialogWidth: "60%",
      toUrl: "",
      params: {},
    };
  },
  created() {
    console.log(this.cParentParams, "====================================");
    this.cust_no = this.cParentParams.cust_no;
    this.procinstid = this.cParentParams.procinstid;
    console.log(this.cParentParams.appl_id);
    let params = {
      cust_no: this.cParentParams.cust_no,
      servicecode: "CRMSXPTS1023",
    };
    MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then((res) => {
        if (res && res.code === "200") {
          this.flrank = res.data.result.flrank;
          this.tableData[0].cust_no = res.data.result.cust_no;
          this.tableData[0].usercd = res.data.result.usercd;
          this.tableData[0].flrank = res.data.result.origfinasc;
          this.tableData[0].unfinancial = res.data.result.unfinancial;
          this.tableData[0].origfinasc = res.data.result.origfinasc;
          this.tableData[0].financial = res.data.result.financial;
          this.tableData[0].finasc = res.data.result.finasc;
          this.tableData[0].origunfisc = res.data.result.origunfisc;
          this.tableData[0].unfisc = res.data.result.unfisc;
          this.tableData[0].flrank = res.data.result.flrank;
          this.tableData[0].rankid = res.data.result.rankid;
          this.tableData[0].ftrank = res.data.result.ftrank;
          this.tableData[0].origfinascdiff =
            Number(res.data.result.finasc) - Number(res.data.result.unfisc);
          this.tableData[0].sercd = res.data.result.sercd;
          this.tableData[0].flag = res.data.result.flag;
          this.tableData[0].evaldt = res.data.result.evaldt;
          this.tableData[0].evaldt = res.data.result.evaldt;
          this.tableData[0].totalfinasc = res.data.result.evalsc;
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
    setStatus(data) {
      return data.flag === "Y" ? "有效" : "无效";
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
