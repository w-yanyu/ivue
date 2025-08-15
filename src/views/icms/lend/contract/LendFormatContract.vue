<template>
    <el-form id="print" ref="form" :model="formData" :rules="rules">
        <div class="parent" style="font-size: 20px; font-family: 宋体">
            <div style="text-align: center">
                <span id="tite" style="margin: 0 auto; font-size: 40px">{{$i18ns('同意贷款意向书')}}</span>
            </div>
            <div style="text-indent: 2em">
                <span class="border">{{$i18ns('甲方（贷款人）：中国XX银行')}}</span>
            </div>
            <div style="text-indent: 2em">
                <span class="border">{{$i18ns('乙方（申请人）')}}：{{ cust_name }}</span>
            </div>
            <div v-show="isShow" style="text-indent: 2em">
                {{$i18ns('我公司经对乙方')}}
                <span class="border">{{ cust_name }}</span>{{$i18ns('于')}}

                {{ month }}{{ day }}, {{ year }}
               <!-- <span class="border">{{ year }}</span>{{$i18ns('年')}}
                <span class="border">{{ month }}</span>{{$i18ns('月')}}
                <span class="border">{{ day }}</span>{{$i18ns('日')}}-->
                ,{{$i18ns('向我行申请项目贷款')}}
                <span class="border">{{ money }}</span>{{$i18ns('元，')}}
                <!-- 元，大写金额
                <span class="border">{{ money2 }}</span>{{$i18ns('月')}}
                -->
                {{$i18ns('期限为')}}
                <span class="border">{{ apply_term }}</span>{{$i18ns('月')}}。
            </div>

            <div  v-show="!isShow" style="text-indent: 2em">
                {{$i18ns('我公司经对乙方')}}
                <span class="border">{{ cust_name }}</span>{{$i18ns('于')}}

                <span class="border">{{ year }}</span>{{$i18ns('年')}}
                <span class="border">{{ month }}</span>{{$i18ns('月')}}
                <span class="border">{{ day }}</span>{{$i18ns('日')}}
                ,{{$i18ns('向我行申请项目贷款')}}
                <span class="border">{{ money }}</span>{{$i18ns('元，')}}
                <!-- 元，大写金额
                <span class="border">{{ money2 }}</span>{{$i18ns('月')}}
                -->
                {{$i18ns('期限为')}}
                <span class="border">{{ apply_term }}</span>{{$i18ns('月')}}。
            </div>



            <div style="text-indent: 2em">{{$i18ns('根据以上事项甲乙双方协商，同意在具备我行贷款条件的前提下，就乙方关于项目贷款给与信贷支持，具体条件如下：')}}</div>
            <div
                style="text-indent: 2em"
            >{{$i18ns('1、申请人有贷款需求的情况下，保证项目真实存在，手续齐全、合法方可给与支持，如申请人手续不符合贷款人要求，贷款人有权不予信贷支持。')}}</div>
            <div
                style="text-indent: 2em"
            >{{$i18ns('2、贷款人在申请人手续齐全后，对申请人所提供的项目进行调查、评估，如调查真实，手续合法，符合贷款要求方可进行信贷支持。')}}</div>
            <div
                style="text-indent: 2em"
            >{{$i18ns('3、本贷款意向书仅用于申请人向国家有关部门说明该项目贷款的落实意向，该项目经国家有权部门批准建设后，我行将依据《商业银行法》、《贷款通则》等有关规定及我行有关贷款、评估办法，对项目进行调查评估，并视评估结果及项目建设条件落实情况，最终决定承诺贷款与否。')}}</div>
            <div style="text-indent: 2em">{{$i18ns('以上事项经甲乙双方同意后签字或盖章生效，本意向书一式两份，甲乙双方各持一份。')}}</div>
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
           <div  v-show="!isShow" style="text-align: right; margin-right: 25%">{{ year }}{{$i18ns('年')}}{{ month }}{{$i18ns('月')}}{{ day }}{{$i18ns('日')}}</div>
            <div v-show="isShow" style="text-align: right; margin-right: 25%">{{ month }}{{ day }}, {{ year }}</div>
            <div  style="text-indent: 2em; margin-top: 20px"></div>
            <div class="noPrint">
                <el-button size="mini" type="primary" @click="handlePrintConfig()">{{$i18ns('打印')}}</el-button>
                <el-button size="mini" type="primary" @click="img()">{{$i18ns('签章')}}</el-button>
            </div>
        </div>
    </el-form>
</template>

<script>
export default {
    name: "LendFormatContract",
    props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object, // 父页面的scope数据对象
    },
    data() {
        return {
            language: localStorage.getItem("PTE_LANGUAGE_STYLE"),
            apply_no: "",
            cust_name: "",
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
            doc_path_url: "",
        };
    },
    mounted() {
        // this.getFormData();
    },
    created() {
        this.apply_no = this.cParentParams.apply_no;
        this.apply_amt = this.cParentParams.apply_amt;
        this.cust_name = this.cParentParams.cust_name;
        this.apply_term = this.cParentParams.apply_term;
        this.month = this.cParentParams.month;
        this.loan_contract_sign_date =
            this.cParentParams.loan_contract_sign_date;
        this.number_format(this.apply_amt, 2);
        this.toChinese(this.apply_amt);
        this.get_year_month_day(this.loan_contract_sign_date);
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
        handlePrintConfig() {
            this.$dialog.open({
                that: this,
                title: this.$i18ns('水印设置'),
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
        toEnMonth(n) {
             if(this.language == 'en'){
            if (n === '01'||n === '1')
                this.month="Jan.";
            if (n === '02'||n === '2') 
                this.month="Feb.";
            if (n === '03'||n === '3')
                this.month="Mar.";
            if (n === '04'||n === '4')
                this.month="Apr.";
            if (n === '05'||n === '5')
                this.month="May.";
            if (n === '06'||n === '6')
                this.month="Jun.";
            if (n === '07'||n === '7')
                this.month="Jul.";
            if (n === '08'||n === '8')
                this.month="Aug.";
            if (n === '09'||n === '9')
                this.month="Sep."; 
            if (n === '10')
                this.month="Oct.";
            if (n === '11')
                this.month="Nov.";
            if (n === '12')
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