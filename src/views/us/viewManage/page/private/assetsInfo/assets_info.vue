<template>
    <div>
      <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('资产数量')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ asset_total }}</span>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="12" class="grid-content display-cell">
            {{$i18ns('资产估值总额（元）')}}：
        </el-col>
        <el-col :span="12" class="grid-content display-cell">
            <span>{{ this.number_format(asset_count, 2) }}</span>
        </el-col>
      </el-row>
    </div>
</template>

<script>
export default {
    props: {
        cParentParams: Object, // 父页面传的参数
    },
    data() {
        return {
            asset_count: 0,
            asset_total: 0,
        };
    },
    mounted() {
      let that = this;
      console.log('cParentParams--lookup', this.cParentParams);
      that.getAssetsInfo();

    },

    methods: {
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

        getAssetsInfo() {
          let custno = this.cParentParams.cust_no? this.cParentParams.cust_no : this.cParentParams.cust_id;
            if(custno == null || custno == ""){
                custno = "Demo000000000"
            }
            const params = {
                servicecode: "us0138",
                cust_no: custno,
            };
            this.$http
                .invokeAPI("/SUMP/call/RPCCall", "post", params)
                .then((response) => {
                    if (response.code === "200") {
                        console.log('response:', response);

                        this.asset_total = response.pageParam.total;
                        if(response.pageParam.total == 0 ){
                            this.asset_total = "";
                        }
                        let assetSum = 0;
                        response.data.forEach(item => {
                            
                            assetSum = assetSum + Number(item.asset_value);
                            console.log('assetSum:', assetSum);
                            assetSum = Math.floor(parseFloat(assetSum * 100 + item.asset_value * 100)) / 100;
                            console.log('assetSum1:', assetSum);
                        });
                        this.asset_count = assetSum;
                        if(assetSum == 0){
                           this.asset_count = "";
                        }

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
