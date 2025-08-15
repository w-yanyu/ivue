<template>
    <el-form id="print" ref="form" :model="formData" :rules="rules">
        <div class="parent" style="font-size: 20px; font-family: 宋体">
            <div style="text-align: center">
                <span id="tite" style="margin: 0 auto; font-size: 40px">授信额度通知书</span>
            </div>
            <div style="text-indent:">
                尊敬的客户
                <span class="border">{{ cust_name }}</span>:
            </div>
            <div style="text-indent: 2em">
                我方对您提交的贷款申请及资料进行了现场调研和分析研究，现批准您最高贷款额
                <span class="border">{{ money }}</span>元 (大写:
                <span class="border">{{ money2 }}</span>),
                期限为
                <span class="border">{{ period }}</span>月。
            </div>
            <div style="text-indent: 2em">希望您合理使用贷款额度，信守合同承诺。</div>
            <div
                style="margin-bottom: 80px; margin-top: 40px; text-align: right; margin-right: 20%;"
            >
                甲方签字盖章：
                <img
                    v-if="doc_path"
                    style="width: 140px; height: 140px; margin-bottom: -40px"
                    v-bind:src="doc_path"
                />
            </div>
            <div style="text-align: right; margin-right: 25%">{{ year }}年{{ month }}月{{ day }}日</div>
            <div style="text-indent: 2em; margin-top: 20px"></div>
            <div class="noPrint">
                <el-button size="mini" type="primary" @click="handlePrintConfig()">打印</el-button>
                <el-button size="mini" type="primary" @click="img()">签章</el-button>
            </div>
        </div>
    </el-form>
</template>

<script>
export default {
    name: "creditLimitPrint",
    props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object, // 父页面的scope数据对象
    },
    data() {
        return {
            money: "",
            money2: "",
            cust_name: "",
            period: "",
            year: "",
            month: "",
            day: "",
            doc_path: "",
        };
    },
    mounted() {
        this.getFormData();
    },
    created() {
        this.cl_amt = this.cParentParams.cl_amt;
        this.credit_period = this.cParentParams.credit_period;
        this.cust_name = this.cParentParams.cust_name;
        this.apply_term = this.cParentParams.apply_term;
        this.number_format(this.cl_amt, 2);
        this.toChinese(this.cl_amt);
        this.getdelLast(this.credit_period);
        this.get_year_month_day();
    },
    methods: {
        handlePrintConfig() {
            this.$dialog.open({
                that: this,
                title: "水印设置",
                width: "36%",
                toRequest: {
                    url: "@printConfig",
                    method: "get",
                },
            });
        },
        img() {
            this.doc_path =
                "http://10.22.12.157:9000/repository-latest/2022-04-24/d54916fa-b553-4303-9fb7-3c9f0a2bcf10.png";
        },
        get_year_month_day() {
            let nowDate = new Date();
            this.year = nowDate.getFullYear();
            this.month = nowDate.getMonth() + 1;
            this.day = nowDate.getDate();
        },
        getdelLast(credit_period) {
            this.period = credit_period.slice(0, credit_period.length - 1);
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