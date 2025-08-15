<template>
  <div>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('本行授信总笔数')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ dataForm.bankOfCreditNum }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('本行授信总金额(元)')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ this.number_format(dataForm.bankOfCreditAmt, 2) }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('本行授信余额(元)')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ this.number_format(dataForm.bankOfCreditBalance, 2) }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('他行授信总笔数')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ dataForm.otherBankOfCreditNum }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('他行授信总金额(元)')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ this.number_format(dataForm.otherBankOfCreditAmt, 2) }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('他行授信余额(元)')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ this.number_format(dataForm.otherBankOfCreditBalance, 2) }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "entCreditInfoThumbnail",
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
      dataForm: {
        bankOfCreditNum: "", //本行授信笔数
        bankOfCreditAmt: "", //本行授信总额
        bankOfCreditBalance: "", //本行授信余额
        otherBankOfCreditNum: "", //他行授信笔数
        otherBankOfCreditAmt: "", // 他行授信总额
        otherBankOfCreditBalance: "" // 他行授信余额
      },
      bankOfCreditDataInCLList: [], //本行授信信息(额度中心)列表
      otherBankOfCreditDataList: [], // 他行授信信息列表
    }
  },
  created() {
    this.init();
  },

  methods: {
    async init() {
      this.cust_no = this.cParentParams.cust_no ? this.cParentParams.cust_no : this.cParentParams.cust_id;
      await this.queryOtherBankOfCreditInfo();
      await this.queryBankOfCreditInCLInfo();
      this.calculateCreditData();
    },
    /**
     * 查询他行授信信息列表
     */
    async queryOtherBankOfCreditInfo() {
      let that = this;
      let reqMap = {
        servicecode: "us0125",
        cust_no: that.cust_no
        // cust_no: "UR00000000010311"
      }
      await MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
        if (res && res.code === "200") {
          that.otherBankOfCreditDataList = res.data;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    /**
     * 查询本行授信信息(额度中心)列表
     */
    async queryBankOfCreditInCLInfo() {
      let that = this;
      let reqMap = {
        servicecode: "cl0037",
        cust_no: that.cust_no,
        cl_level: "P"
        // cust_no: "UR00000000010311"
      }
      await MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
        if (res && res.code === "200") {
          that.bankOfCreditDataInCLList = res.data;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    /**
     * 计算他行和本行数据
     */
    calculateCreditData() {
      //本行数据整理
      this.dataForm.bankOfCreditNum = this.bankOfCreditDataInCLList.length;
      let bankOfAmt = 0;
      let bankOfBalance = 0;
      for (const item of this.bankOfCreditDataInCLList) {
          bankOfAmt = Math.floor(parseFloat(bankOfAmt * 100 + item.cl_amt * 100)) / 100;
          bankOfBalance = Math.floor(parseFloat(bankOfBalance * 100 + item.reality_avail_amt * 100)) / 100;
      }
      this.dataForm.bankOfCreditAmt = bankOfAmt;
      this.dataForm.bankOfCreditBalance = bankOfBalance;
      //他行数据整理
      this.dataForm.otherBankOfCreditNum = this.otherBankOfCreditDataList.length;
      let otherBankOfAmt = 0;
      let otherBankOfBalance = 0;
      for (const item of this.otherBankOfCreditDataList) {
        otherBankOfAmt = Math.floor(parseFloat(otherBankOfAmt * 100 + item.contract_amt * 100)) / 100;
        otherBankOfBalance = Math.floor(parseFloat(otherBankOfBalance * 100 + item.credit_balance * 100)) / 100;
      }
      this.dataForm.otherBankOfCreditAmt = otherBankOfAmt;
      this.dataForm.otherBankOfCreditBalance = otherBankOfBalance;
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
