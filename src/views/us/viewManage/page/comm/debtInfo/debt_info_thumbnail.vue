<template>
  <div>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('负债总额（元）')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ this.number_format(dataForm.debtTotalAmt, 2) }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('本行借款（元）')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ this.number_format(dataForm.loanOfBankAmt, 2) }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('本行借款余额（元）')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ this.number_format(dataForm.loanOfBankBalance, 2) }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('他行借款（元）')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ this.number_format(dataForm.loanOfOtherBankAmt, 2) }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('对外担保（元）')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ this.number_format(dataForm.externalGuaranteeAmt, 2) }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "entDebtInfoThumbnail",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      cust_no: "",//客户编号
      cust_type: "",// 客户类型
      cert_type: "",// 证件类型
      cert_no: "",// 证件号
      dataForm: {
        debtTotalAmt: 0, //负债总额（元）
        loanOfBankAmt: 0, //本行借款（元）
        loanOfBankBalance: 0, //本行借款余额（元）
        loanOfOtherBankAmt: 0, //他行借款（元）
        externalGuaranteeAmt: 0 // 对外担保（元）
      },
      loanOfBankDataList: [], //本行借款信息列表
      loanOfOtherBankAndGuarDataList: [], // 他行借款信息以及对外担保列表
    }
  },
  created() {
    this.init();
  },

  methods: {
    async init() {
      this.cust_no = this.cParentParams.cust_no? this.cParentParams.cust_no : this.cParentParams.cust_id;
      this.cert_type = this.cParentParams.cert_type;
      this.cert_no = this.cParentParams.cert_no;
      await this.queryLoanOfBankInfo();
      await this.queryLoanOfOtherBankAndGuarInfo();
      await this.calculateDebtData();
    },
    /**
     * 查询本行借款信息列表
     */
    async queryLoanOfBankInfo() {
      let that = this;
      let reqMap = {
        servicecode: "syln0002",
        cust_num: that.cust_no
        // cust_no: "UR00000000010311"
      }
      await MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
        if (res && res.code === "200") {
          that.loanOfBankDataList = res.data.lnCpstnQryType;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    /**
     * 查询他行借款以及担保信息列表
     */
    async queryLoanOfOtherBankAndGuarInfo() {
      let that = this;
      let reqMap = {
        servicecode: "ar2101",
        cust_no: that.cust_no,
        cert_type: that.cert_type,
        cert_no: that.cert_no
      }
      await MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
        if (res && res.code === "200") {
          that.loanOfOtherBankAndGuarDataList = res.data;
        }
      }).catch(err => {
        console.error(err);
      });
    },

    /**
     * 计算负债信息
     */
    calculateDebtData() {
      //1、计算本行借款金额
      let loanOfBankTempAmt = 0;
      let loanOfBankTempBalance = 0;
      for (const item of this.loanOfBankDataList) {
        loanOfBankTempBalance = Math.floor(parseFloat(loanOfBankTempBalance * 100 + item.nrl_prcpl * 100 + item.stgnt_prcpl * 100 + item.ovdue_prcpl * 100 + item.ucoltb_prcpl * 100)) / 100;
        loanOfBankTempAmt = Math.floor(parseFloat(loanOfBankTempAmt * 100 + item.ctrct_amt * 100)) / 100;
      }
      this.dataForm.loanOfBankAmt = loanOfBankTempAmt;
      this.dataForm.loanOfBankBalance = loanOfBankTempBalance;
      //2、计算他行借款金额与对外担保金额
      let loanOfOtherBankTempAmt = 0;
      let guarTempAmt = 0;
      for (const item of this.loanOfOtherBankAndGuarDataList) {
        if (item.repay_duty_type === "1") {
          guarTempAmt = Math.floor(parseFloat(guarTempAmt * 100 + item.guarantee_amount * 100)) / 100;
        }
        if (item.repay_duty_type === "9") {
          loanOfOtherBankTempAmt = Math.floor(parseFloat(loanOfOtherBankTempAmt * 100 + item.guarantee_amount * 100)) / 100;
        }
      }
      this.dataForm.loanOfOtherBankAmt = loanOfOtherBankTempAmt;
      this.dataForm.externalGuaranteeAmt = guarTempAmt;
      this.dataForm.debtTotalAmt = Math.floor(parseFloat(loanOfOtherBankTempAmt * 100 + guarTempAmt * 100 + +loanOfBankTempBalance * 100)) / 100;
    },
    /*
         * 参数说明：
         * number：要格式化的数字
         * decimals：保留几位小数
         * dec_point：小数点符号
         * thousands_sep：千分位符号
         * */
    number_format(number, decimals, dec_point, thousands_sep) {
      console.log("money:", number);
      number = (number + "").replace(/[^0-9+-Ee.]/g, "");
      var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
        sep =
          typeof thousands_sep === "undefined" ? "," : thousands_sep,
        dec = typeof dec_point === "undefined" ? "." : dec_point,
        s = "",
        toFixedFix = function toFixedFix(n, prec) {
          var k = Math.pow(10, prec);
          return "" + Math.ceil(n * k) / k;
        };

      s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
      var re = /(-?\d+)(\d{3})/;
      while (re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
      }

      if ((s[1] || "").length < prec) {
        s[1] = s[1] || "";
        s[1] += new Array(prec - s[1].length + 1).join("0");
      }
      this.money = s.join(dec);
      console.log("===== 转换后===", s.join(dec));
      return s.join(dec);
    },
  }
}
</script>

<style lang="less" scoped>
.display-cell {
  display: flex;
  align-items: center;
  border-radius: 0;
  //background: #efefef;
  //border: 1px solid #e3e8f5;
  //border-top: 0px;
  //border-right: 0px;
}
</style>
