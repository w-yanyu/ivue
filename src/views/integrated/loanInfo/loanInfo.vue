<template>
    <el-form id="print" ref="form" :model="formData" :rules="rules">
        <div class="parent" style="font-size: 20px; font-family: 宋体">
            <div style="text-align: center">
                <span id="tite" style="margin: 0 auto; font-size: 40px">{{$i18ns('贷款结清证明')}}</span>
            </div>
            <div>
                <span>{{$i18ns('兹证明:')}}</span>
            </div>
            <div v-show="!isShow" style="text-indent: 2em">
                {{$i18ns('客户')}}
                <span class="border">{{ cust_nm }}</span>{{$i18ns('于')}}
                <span class="border">{{ year }}</span>{{$i18ns('年')}}
                <span class="border">{{ month }}</span>{{$i18ns('月')}}
                <span class="border">{{ day }}</span>{{$i18ns('日')}},{{$i18ns('获得的')}}
                <span class="border">{{ prod_nm }}</span>{{$i18ns('贷款')}}({{$i18ns('借据号')}}:
                <span class="border">{{ loan_due_bill_num }}</span>),{{$i18ns('贷款发放金额为人民币')}}
                <span class="border">{{ money }}</span>{{$i18ns('元,截至')}}<!-- (大写:
                <span class="border">{{ money2 }}</span>),-->
                
                <span class="border">{{ year2 }}</span>{{$i18ns('年')}}
                <span class="border">{{ month2 }}</span>{{$i18ns('月')}}
                <span class="border">{{ day2 }}</span>{{$i18ns('日')}}
                {{$i18ns('该客户上述贷款已结清')}}。
            </div>
         <div v-show="isShow" style="text-indent: 2em">
                {{$i18ns('客户')}}
                <span class="border">{{ cust_nm }}</span>{{$i18ns('于')}}
              
                 {{ month }}{{ day }}, {{ year }}
                ,{{$i18ns('获得的')}}
                <span class="border">{{ prod_nm }}</span>{{$i18ns('贷款')}}({{$i18ns('借据号')}}:
                <span class="border">{{ loan_due_bill_num }}</span>),{{$i18ns('贷款发放金额为人民币')}}
                <span class="border">{{ money }}</span>{{$i18ns('元,截至')}}<!-- (大写:
                <span class="border">{{ money2 }}</span>),-->
                
                 {{ month2 }}{{ day2 }}, {{ year2 }}
                {{$i18ns('该客户上述贷款已结清')}}。
            </div>

            <div style="text-indent: 2em">{{$i18ns('特此证明')}}！</div>
            <div
                style="margin-bottom: 80px; margin-top: 40px; text-align: right; margin-right: 20%;"
            >
                {{$i18ns('甲方签字盖章')}}：
                <img
                    v-if="doc_path"
                    style="width: 140px; height: 140px; margin-bottom: -40px"
                    v-bind:src="doc_path"
                />
            </div>
            <div
                style="margin-bottom: 80px; text-align: right; margin-right: 20%"
            >{{$i18ns('乙方签字盖章：（或委托代理人签章）')}}：</div>
            <div v-show="!isShow" style="text-align: right; margin-right: 25%">{{ year2 }}{{$i18ns('年')}}{{ month2 }}{{$i18ns('月')}}{{ day2 }}{{$i18ns('日')}}</div>
            <div v-show="isShow" style="text-align: right; margin-right: 25%">{{ month2 }} {{ day2 }}, {{ year2 }}</div>
            <div style="text-indent: 2em; margin-top: 20px"></div>
            <div class="noPrint">
                <el-button size="mini" type="primary" @click="handlePrintContent()"> {{$i18ns('打印')}}</el-button>
                <el-button size="mini" type="primary" @click="img()">{{$i18ns('签章')}}</el-button>
            </div>
        </div>
    </el-form>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
    name: "loanInfo",
    props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object, // 父页面的scope数据对象
    },
    data() {
        return {
            language: localStorage.getItem("PTE_LANGUAGE_STYLE"),
            prod_nm: "",
            cust_nm: "",
            apply_base_amt: "",
            loan_term: "",
            entrusted_name: "",
            agric_loan_use: "",
            doc_path: "",
            money: "",
            money2: "",
            year: "",
            month: "",
            day: "",
            year2: "",
            month2: "",
            day2: "",
            loan_due_bill_num: "",
            doc_path_url: "",
        };
    },
    created() {
        this.getUrl();
        this.loan_due_bill_num = this.cParentParams.loan_due_bill_num;
        this.prod_nm = this.cParentParams.slbl_prod_nm;
        this.ctrct_amt = this.cParentParams.ctrct_amt;
        this.cust_nm = this.cParentParams.cust_nm;
        this.open_acct_dt = this.cParentParams.open_acct_dt;        
        this.number_format(this.ctrct_amt, 2);
        this.toChinese(this.ctrct_amt);
        this.get_year_month_day(this.open_acct_dt);
        this.get_year_month_day2();
        this.toEnMonth(this.month2);
        this.toEnMonth(this.month);
        this.toCglanguage();
    },
    methods: {
        getUrl() {
            let params = {
            file_path_tag:"file_path",//自己输入配置参数表根据此值查询
            servicecode: "ar0273"
          }
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
            if (res && res.code === "200") {
                 this.doc_path_url = res.data.file_path;
            } else {
              this.$message({
                type: "error",
                message: "查询失败！"
              });
            }
          }).catch(err => {
            console.error(err);
          });
        },
        toCglanguage() {
        if (this.language == 'en') {
            this.isShow = true;
        }else{
            this.isShow = false;
        }
        },


        handlePrintContent(btn) {
            this.$dialog.open({
                that: this,
                title:  this.$i18ns('水印设置'),
                width: "36%",
                toRequest: {
                    url: "@printConfig",
                    method: "get",
                },
            });
        },
        img() {
            this.doc_path = this.doc_path_url;
            // "http://10.22.12.157:9000/repository-latest/2022-04-24/d54916fa-b553-4303-9fb7-3c9f0a2bcf10.png"
        },

        get_year_month_day(loan_contract_sign_date) {
            this.year = loan_contract_sign_date.slice(0, 4);
            this.month = loan_contract_sign_date.slice(4, 6);
            this.day = loan_contract_sign_date.slice(6, 8);
        },
        get_year_month_day2() {
            let nowDate = new Date();
            this.year2 = nowDate.getFullYear();
            this.month2 = nowDate.getMonth() + 1;
            this.day2 = nowDate.getDate();
        },
          toEnMonth(n) {
            if(this.language == 'en'){
            if (n === '01'||n === 1)
                this.month2="Jan.";
                this.month="Jan."; 
            if (n === '02'||n === 2) 
                this.month2="Feb.";
                this.month="Feb.";            
            if (n === '03'||n === 3)
                this.month2="Mar.";
                this.month="Mar.";            
            if (n === '04'||n === 4)
                this.month2="Apr.";
                this.month="Apr.";
            if (n === '05'||n === 5)
                this.month2="May.";
                this.month="May.";
            if (n === '06'||n === 6)
                this.month2="Jun.";
                this.month="Jun.";
            if (n === '07'||n === 7)
                this.month2="Jul.";
                this.month="Jul.";
            if (n === '08'||n === 8)
                this.month2="Aug.";
                this.month="Aug.";
            if (n === '09'||n === 9)
                this.month2="Sep."; 
                this.month="Sep."; 
            if (n === '10'||n === 10)
                this.month2="Oct.";
                this.month="Oct.";
            if (n === '11'||n === 11)
                this.month2="Nov.";
                this.month="Nov.";
            if (n === '12'||n === 12)
                this.month2="Dec.";
                this.month="Dec.";
            }
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
        toChinese(n) {
            if (n === 0) return "零";
            if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n)) return "";
            var unit = "仟佰拾亿仟佰拾万仟佰拾元角分",
                str = "";
            n += "00";
            var p = n.indexOf(".");
            if (p >= 0) n = n.substring(0, p) + n.substr(p + 1, 2);
            unit = unit.substr(unit.length - n.length);
            for (var i = 0; i < n.length; i++) {
 str +=
                    "零壹贰叁肆伍陆柒捌玖".charAt(n.charAt(i)) + unit.charAt(i); 
}
            this.money2 = str
                .replace(/零(仟|佰|拾|角)/g, "零")
                .replace(/(零)+/g, "零")
                .replace(/零(万|亿|元)/g, "$1")
                .replace(/(亿)万/g, "$1$2")
                .replace(/^元零?|零分/g, "")
                .replace(/元$/g, "元整");
            return str
                .replace(/零(仟|佰|拾|角)/g, "零")
                .replace(/(零)+/g, "零")
                .replace(/零(万|亿|元)/g, "$1")
                .replace(/(亿)万/g, "$1$2")
                .replace(/^元零?|零分/g, "")
                .replace(/元$/g, "元整");
        },
    },
};
</script>

<style lang="less" scoped>
.border {
    border: 0;
    border-bottom: 1px solid #000;
}
</style>