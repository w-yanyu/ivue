<template>
    <el-form id="print" ref="form" :model="formData" :rules="rules">
        <div class="parent" style="font-size: 20px; font-family: 宋体">
            <div style="text-align: center">
                <span id="tite" style="margin: 0 auto; font-size: 40px">担保意向函</span>
            </div>
            <div style="text-indent: 2em">
                <span class="border">{{ formData["entrusted_name"] }}支行</span>
            </div>
            <div style="text-indent: 2em">
                我公司经对
                <span class="border">{{ formData["cust_name"] }}</span>作的融资担保申请项目初步审核后，拟同意为该公司问贵行申请的信贷业务提供担保，待贵行通过审批并经我公司最终审核通过、正式签订《保证合同》及落实反担保手续后，我公司方正式承担担保责任。
            </div>
            <div style="text-indent: 2em">为信贷业务申请人提供担保的信贷业务种类、币种、金额、贷款期限如下：</div>
            <div style="text-indent: 2em">贷款种类：{{ formData["agric_loan_use"] }}</div>
            <div style="text-indent: 2em">币 种：人民币</div>
            <div style="text-indent: 2em">金 额：{{ money }}元</div>
            <div style="text-indent: 2em">大写金额：{{ money2 }}</div>
            <div style="text-indent: 2em">贷款期限：{{ formData["loan_term"] }}月</div>
            <div
                style="margin-bottom: 80px; margin-top: 40px; text-align: right; margin-right: 20%;"
            >
                担保人(公章)：
                <img
                    v-if="doc_path"
                    style="width: 140px; height: 140px; margin-bottom: -40px"
                    v-bind:src="doc_path"
                />
            </div>
            <div
                style="margin-bottom: 80px; text-align: right; margin-right: 20%"
            >法定代表人签章（或委托代理人签章）：</div>
            <div
                style="text-align: right; margin-right: 25%"
            >{{formData["year"] }}年{{formData["month"] }}月{{formData["day"] }}日</div>
            <div style="text-indent: 2em; margin-top: 20px">本担保意向函一式两份，银行和担保公司各持一份。</div>
            <div class="noPrint">
                <el-button size="mini" type="primary" @click="handlePrintConfig()">打印</el-button>
                <el-button size="mini" type="primary" @click="img()">签章</el-button>
            </div>
        </div>
    </el-form>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
    name: "LetterGuarantee",
    props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object, // 父页面的scope数据对象
    },
    data() {
        return {
            apply_no: "${{params.apply_no}}",
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
            formData: {},
        };
    },
    mounted() {
        this.getFormData();
    },
    created() {
        this.apply_no = this.cParentParams.apply_no;
        console.log("=======金额====", this.money);
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
        getFormData() {
            let params = {
                apply_no: this.cParentParams.apply_no,
                servicecode: "ar1619",
            };
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
                .then((res) => {
                    if (res && res.code === "200") {
                        this.formData = res.data;
                        this.apply_base_amt = res.data.apply_base_amt;
                        this.number_format(this.apply_base_amt, 2);
                        this.toChinese(this.apply_base_amt);
                        //初始化时先清空规模
                        console.log("返回参数", this.formData);
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        img() {
            this.doc_path =
                "http://10.22.12.157:9000/repository-latest/2022-04-24/6969b261-29a5-460f-bc2d-48875f230171.png";
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