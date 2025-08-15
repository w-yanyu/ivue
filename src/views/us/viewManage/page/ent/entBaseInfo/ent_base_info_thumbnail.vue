<template>
  <div>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('客户名称')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ dataForm.cust_name }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('证件类型')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ getDictLabel(certTypeDictList, dataForm.cert_type) }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('证件号码')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ dataForm.cert_no }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('注册登记日期')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ dataForm.registration_date }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('注册资本(万元)')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ this.number_format(dataForm.register_princi, 2) }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('注册地址')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ dataForm.registered_addr }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('经营状态')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ getDictLabel(operateStatusDictList, dataForm.operate_status) }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('是否上市公司')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ getDictLabel(isListedCompanyDictList, dataForm.is_listed_company) }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "entBaseInfoThumbnail",
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
        cust_name: "", //客户名称
        cert_type: "", //证件类型
        cert_no: "", //证件号码
        registration_date: "", // 注册登记日期
        register_princi: "", // 注册资本
        registered_addr: "", //注册地址
        operate_status: "", //经营状态
        is_listed_company: "" // 是否上市公司
      },
      certTypeDictList: [], //证件类型字典列表
      operateStatusDictList: [], // 经营状态类型字典列表
      isListedCompanyDictList: [] //是否上市公司字典列表
    }
  },
  created() {
    this.init();
    this.queryCustInfo();
  },

  methods: {
    init() {
      this.cust_no = this.cParentParams.cust_no? this.cParentParams.cust_no : this.cParentParams.cust_id;
      this.getDictList("MS_E_CRET_TYPE", "certTypeDictList");
      this.getDictList("US_E_OPERATE_STATUS", "operateStatusDictList");
      this.getDictList("MS_E_YESORNO", "isListedCompanyDictList");
    },
    /**
     * 获取字典
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      }
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params).then(res => {
        if (res && res.code === "200") {
          this[listKey] = res.data;
        }
      }).catch(err => {
        console.error(err)
      })
    },
    /**
     * 查询客户相应信息
     */
    queryCustInfo() {
      let that = this;
      let reqMap = {
        servicecode: "us0532",
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
    /**
     * 获取字典对应的label
     * @param list
     * @param value
     * @returns {*}
     */
    getDictLabel(list, value) {
      console.log("111")
      let tempValue = value;
      for (const item of list) {
        if (tempValue === item.dictId) {
          tempValue = item.dictName;
          break;
        }
      }
      return tempValue;
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
