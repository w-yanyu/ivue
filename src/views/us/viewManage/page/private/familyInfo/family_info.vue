<template>
    <div>
      <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('家庭供养人数')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ currentInfo.fend_persons }}</span>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('是否有子女')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ getDictLabel(childrenList, currentInfo.is_own_children) }}</span>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('住房情况')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ currentInfo.housing_desc }}</span>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('车辆信息')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ currentInfo.vehicle_desc }}</span>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('家庭月收入（元）')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ this.number_format(currentInfo.family_mth_Income, 2) }}</span>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('主要收入来源')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ currentInfo.major_income_source }}</span>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('家庭月支出（元）')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ this.number_format(currentInfo.family_everyday_expend, 2) }}</span>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('家庭总资产（元）')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ this.number_format(currentInfo.family_tota, 2) }}</span>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('家庭总负债（元）')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{  this.number_format(currentInfo.family_liability, 2) }}</span>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios"
export default {
    props: {
        cParentParams: Object, // 父页面传的参数
    },
    data() {
        return {
            currentInfo: {},
            childrenList : [],//是否有子女
        };
    },

    mounted() {
      let that = this;
      console.log('cParentParams--lookup', this.cParentParams);
      that.init();
      that.getUserInfo();

    },

    methods: {
      init() {
            this.getDictList("MS_E_YESORNO", "childrenList");
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
        * 获取字典对应的label
        * @param list
        * @param value
        * @returns {*}
        */
        getDictLabel(list, value) {
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
        getUserInfo() {
          let custno = this.cParentParams.cust_no? this.cParentParams.cust_no : this.cParentParams.cust_id;
            if(custno == null || custno == ""){
                custno = "Demo000000000"
            }
            const params = {
                servicecode: "us0007",
                cust_no: custno,
            };
            this.$http
                .invokeAPI("/SUMP/call/RPCCall", "post", params)
                .then((response) => {
                    if (response.code === "200") {
                        this.currentInfo = response.data.info;
                        if(this.currentInfo.fend_persons == 0){
                            this.currentInfo.fend_persons = "";
                        }
                        if(this.currentInfo.family_mth_Income == 0){
                            this.currentInfo.family_mth_Income = "";
                        }
                        this.currentInfo.family_mth_Income = Math.floor(parseFloat(this.currentInfo.family_mth_Income * 100)) / 100;
                        if(this.currentInfo.major_income_source == 0){
                            this.currentInfo.major_income_source = "";
                        }
                        this.currentInfo.major_income_source = Math.floor(parseFloat(this.currentInfo.major_income_source * 100)) / 100;
                        if(this.currentInfo.family_everyday_expend == 0){
                            this.currentInfo.family_everyday_expend = "";
                        }
                        this.currentInfo.family_everyday_expend = Math.floor(parseFloat(this.currentInfo.family_everyday_expend * 100)) / 100;
                        if(this.currentInfo.family_tota == 0){
                            this.currentInfo.family_tota = "";
                        }
                        this.currentInfo.family_tota = Math.floor(parseFloat(this.currentInfo.family_tota * 100)) / 100;
                        if(this.currentInfo.family_liability == 0){
                            this.currentInfo.family_liability = "";
                        }
                        this.currentInfo.family_liability = Math.floor(parseFloat(this.currentInfo.family_liability * 100)) / 100;
                    } else {
                        this.$message({
                        message: response.message,
                        type: 'error'
                        });
                    }
                });


        },
    },
};
</script>

<style scoped>
  .text {
    font-size: 14px;
    color: black;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    height: 480px;
  }
</style>
