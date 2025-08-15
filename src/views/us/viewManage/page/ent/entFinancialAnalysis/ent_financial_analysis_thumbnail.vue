<template>
  <div>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('最新数据日期')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ dataForm.data_update_time }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('营业务收入（元）')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ this.number_format(dataForm.income_amt, 2) }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('净利润（元）')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ this.number_format(dataForm.net_profit, 2) }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('总资产（元）')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ this.number_format(dataForm.total_property, 2) }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('净资产（元）')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ this.number_format(dataForm.net_assets, 2) }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('经营现金流量净额（元）')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ this.number_format(dataForm.net_cash_flow, 2) }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "entFinancialAnalysisThumbnail",
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
        data_update_time: "", //最新数据日期
        years: "", //最新数据年份
        income_amt: "", //营业务收入（元）
        net_profit: "", //净利润（元）
        total_property: "", //总资产（元）
        net_assets: "", //净资产（元）
        net_cash_flow: "" //经营现金流量净额（元）
      }
    }
  },
  created() {
    this.cust_no = this.cParentParams.cust_no? this.cParentParams.cust_no : this.cParentParams.cust_id;
    this.queryCustInfo();
  },

  methods: {
    /**
     * 查询客户相应信息
     */
    queryCustInfo() {
      let that = this;
      let reqMap = {
        servicecode: "us0942",
        cust_no: that.cust_no
        // cust_no: "UR00000000010311"
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
        if (res && res.code === "200") {
          that.dataForm = res.data;
        }
      }).catch(err => {
        console.error(err);
      });
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
