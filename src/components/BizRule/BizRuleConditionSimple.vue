<template>
    <div class="pageContent">
        <el-cascader
            :disabled="disabled"
            size="mini"
            v-model="ruleForm.ruleLeft"
            :options="dataList"
            :props="{ expandTrigger: 'hover'  }"
            @change="changeLeft"
            style="width: max-content"
        ></el-cascader>
        <el-select
            size="mini"
            style="width: 120px; margin-right: 0px;"
            v-model="ruleForm.ruleOperate"
            v-if=" ruleForm.ruleLeftDataType != 'Boolean' "
            :label-in-value="true"
            :disabled="disabled "
            @change="changeOperator"
            clearable
        >
            <el-option
                v-for="item in conditionType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="switchDisabled(item.value,ruleForm.ruleLeftDataType)"
            ></el-option>
        </el-select>
        <div class="select_input" v-if="ruleForm.ruleLeftDataType!== 'Boolean' ">
            <el-input
                size="mini"
                :disabled="disabled"
                v-model="ruleForm.ruleRight"
                placeholder="字段值1"
                style="width: 140px;"
                clearable
                @input="rightValueInput($event,ruleForm.ruleLeftDataType,ruleForm.ruleOperate)"
            ></el-input>
        </div>
    </div>
</template>

<script>
import { deepClone } from "../../views/risk/utils/helper";

export default {
    name: "biz-rule-condition",
    props: {
        cMeta: Object, //本页面模板json数据Layout对象
        cParentMeta: Object, //父页面模板json数据Layout对象
        cParentParams: Object, //父页面自定义参数与内置参数
        cParentScope: Object, //父页面每块区域业务数据
        //是否可以编辑 true不可编辑
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            cParams: this.cParentParams,
            ruleForm: {
                ruleTreeNodeId: "", //节点
                treeId: "", //根节点
                nodeType: "", //节点类型
                nodeIdFrom: "", //上一节点
                ruleLeft: "", //左表达式
                ruleLeftName: "", //左表达名称
                ruleLeftDataType: "", //左表达类型
                ruleOperate: "", //操作符
                ruleRight: "", //右表达式
                ruleExpress: "", //执行表达式
                ruleDesc: "", //规则描述
                partnerName: "",
                proportionShares: null,
            },
            normal: false,
            leftType: "",
            rightType: "",
            rightValueType: "",
            dataList: "",
            reference: "",
            username: "",
            formAmoutValidate: {
                left: "",
                leftDesc: "",
                dataType: "",
                operator: "",
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: "blur",
                    },
                ],
            },
            rightSelectType: [
                {
                    value: "+",
                    label: "加",
                },
                {
                    value: "-",
                    label: "减",
                },
                {
                    value: "*",
                    label: "乘",
                },
                {
                    value: "/",
                    label: "除",
                },
            ],
            conditionType: [
                {
                    value: "",
                    label: "空",
                },
                {
                    value: "==",
                    label: "等于",
                },
                {
                    value: "!=",
                    label: "不等于",
                },
                {
                    value: ">",
                    label: "大于",
                },
                {
                    value: ">=",
                    label: "大于等于",
                },
                {
                    value: "<",
                    label: "小于",
                },
                {
                    value: "<=",
                    label: "小于等于",
                },
                //
                {
                    value: "IN",
                    label: "在...范围内",
                },
                {
                    value: "NOT_IN",
                    label: "不在...范围内",
                },
                {
                    value: "BETWEEN",
                    label: "在...与...之间",
                },
                {
                    value: "POW",
                    label: "大于..的..次方",
                },
                {
                    value: "LIKE",
                    label: "包含",
                },
                {
                    value: "NOT_LIKE",
                    label: "不包含",
                },
                {
                    value: "STARTSWITH",
                    label: "开头是",
                },
                {
                    value: "NOT_STARTSWITH",
                    label: "开头不是",
                },
                {
                    value: "ENDSWITH",
                    label: "结尾是",
                },
                {
                    value: "NOT_ENDSWITH",
                    label: "结尾不是",
                },
            ],
        };
    },
    mounted() {
        this.getFactList();
    },
    computed: {
        comSelectcCollection: function () {
            for (let i in this.selectcCollection) {
                if (this.selectcCollection[i].value === this.reference) {
                    return this.selectcCollection[i].children;
                }
            }
        },
        dataFilterRight: function () {
            console.log();
            if (!this.dataList) {
                return;
            }
            console.log("dataFilterRight", this.leftType);
            let depDataRight = deepClone(this.dataList);
            depDataRight.forEach((item, index, arrs) => {
                item.children.forEach((childrenItem, index, arrs) => {
                    if (childrenItem.children) {
                        childrenItem.children.forEach(
                            (grandchildrenItem, index, arrs) => {
                                if (
                                    grandchildrenItem.dataType !== this.leftType
                                ) {
                                    grandchildrenItem.disabled = true;
                                }
                            }
                        );
                    } else {
                        if (childrenItem.dataType !== this.leftType) {
                            childrenItem.disabled = true;
                        }
                    }
                });
            });
            console.log("右边数据更新", depDataRight);
            return depDataRight;
        },
    },
    methods: {
        //最左边选项改变了的
        changeLeft(val) {
            this.ruleForm.ruleLeft =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).value
                    ? this.getFormAmoutValidateInfo(val).value
                    : "";
            this.ruleForm.ruleLeftName =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).label
                    ? this.getFormAmoutValidateInfo(val).label
                    : "";
            this.ruleForm.ruleLeftDataType =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).dataType
                    ? this.getFormAmoutValidateInfo(val).dataType
                    : "";
            //如果选择的类型为booblean 隐藏右边两个控件
            if (this.ruleForm.ruleLeftDataType === "Boolean") {
                this.ruleForm.ruleRight = "";
            }
            console.log("leftType===" + this.ruleForm.ruleLeftDataType);
            console.log("changeLeft", this.ruleForm);
        },
        //选择中间的控件
        changeOperator() {
            this.ruleForm.ruleRight = "";
        },
        //获取左边控件选择的转译
        getFormAmoutValidateInfo(val) {
            for (let i in this.dataLeft) {
                let item = this.dataLeft[i].children;
                for (let z in item) {
                    if (item[z].children) {
                        for (let x in item[z].children) {
                            if (
                                item[z].children[x].value ===
                                val[val.length - 1]
                            ) {
                                return {
                                    value: item[z].children[x].value,
                                    label:
                                        item[z].label +
                                        "." +
                                        item[z].children[x].label,
                                    dataType: item[z].children[x].dataType,
                                    reference: item[z].children[x].reference,
                                };
                            }
                        }
                    } else {
                        if (val === undefined) {
                            return {
                                value: item[z].value,
                                label: item[z].label,
                                dataType: item[z].dataType,
                                reference: item[z].reference,
                            };
                        }
                        if (item[z].value === val[val.length - 1]) {
                            return {
                                value: item[z].value,
                                label: item[z].label,
                                dataType: item[z].dataType,
                                reference: item[z].reference,
                            };
                        }
                    }
                }
            }
        },
        getList(source = [], data) {
            for (let i in this.dataLeft) {
                for (let z in this.dataLeft[i].children) {
                    if (
                        !this.dataLeft[i].children[z].children &&
                        this.dataLeft[i].children[z].value === data
                    ) {
                        source.push(this.dataLeft[i].value);
                        source.push(this.dataLeft[i].children[z].value);
                    } else {
                        for (let x in this.dataLeft[i].children[z].children) {
                            if (
                                this.dataLeft[i].children[z].children[x]
                                    .value === data
                            ) {
                                source.push(this.dataLeft[i].value);
                                source.push(this.dataLeft[i].children[z].value);
                                source.push(
                                    this.dataLeft[i].children[z].children[x]
                                        .value
                                );
                            }
                        }
                    }
                }
            }
            return source;
        },
        getFactList() {
            this.dataLeft = [];
            this.rightDataLeft = [];
            this.$http
                .invokeAPI("/SUMP/riskController/riskCall", "POST", {
                    servicecode:
                        "risk-management-service/combobox-select/facts",
                    appId: "risk-management-service",
                    isList: true,
                })
                .then((obj) => {
                    console.log("请求评分属性选择项目回调", obj);
                    this.dataList = obj.data;
                    this.dataLeft = obj.data;
                    console.log("--组件", this.cParentParams);
                    this.ruleForm = this.cParentParams.ruleForm;
                })
                .catch((reg) => {});
        },
        //选择项是否可选的判断
        switchDisabled(value, leftType) {
            switch (value) {
                //大于..的..次方
                case "POW":
                    return leftType === "String" || leftType === "Boolen";
                //包含
                case "LIKE":
                    return leftType === "Int" || leftType === "Decimal";
                //不包含
                case "NOT_LIKE":
                    return leftType === "Int" || leftType === "Decimal";
                //开头是
                case "STARTSWITH":
                    return leftType === "Int" || leftType === "Decimal";
                //开头不是
                case "NOT_STARTSWITH":
                    return leftType === "Int" || leftType === "Decimal";
                //结尾是
                case "ENDSWITH":
                    return leftType === "Int" || leftType === "Decimal";
                //结尾不是
                case "NOT_ENDSWITH":
                    return leftType === "Int" || leftType === "Decimal";
            }
        },
        //获取组件的输入状态
        getIntputStaut() {
            let that = this;
            console.log("获取组件的输入状态", that);
            return that.ruleForm;
        },
        //左边选择器改变
        selectConditionTypeChanged(value) {
            console.log(
                "selectConditionTypeChanged^^^^^^^^^^^^^^^^^^^^^^^^^",
                value
            );
        },
        rightValueInput(e, leftType, operator) {
            let that = this;
            let value = e;
            if (leftType === "Int") {
                // if (operator === 'POW' && value.length > 5) {
                //   value = value.substr(0, 5)
                // }
                if (
                    that.ruleForm.ruleOperater === "IN" ||
                    that.ruleForm.ruleOperate === "NOT_IN"
                ) {
                    //在。。范围内  不在。。范围内 特殊情况可以输入，号进行分割
                    that.ruleForm.ruleRight = value.replace(/[^\d,]/g, "");
                } else {
                    //一般情况下只能输入整数
                    that.ruleForm.ruleRight = value.replace(/\D/g, "");
                }
                //只能输入数字不能输入小数点
                // that.ruleForm.ruleRight = value.replace(/\D/g, '')
                // that.ruleForm.ruleRight = value.replace(/[0-9\.]+/g, '')
            }
            if (leftType === "Decimal") {
                //只能输入数字不能输入小数点
                // that.ruleForm.ruleRight = value.replace(/[^\d.]/g, '')
                // let reg = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g; //只能输入两位小数
                // if (reg.test(value)) { //正则匹配通过，提取有效文本
                //   that.ruleForm.ruleRight = value.replace(reg, '$2$3$4');
                // }
                // let reg = /(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/  .replace(/[\u4E00-\u9FA5]/i, '')
                // that.ruleForm.ruleRight = value.replace(/[^\d\.]/, '').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
                that.ruleForm.ruleRight = value
                    .replace(/[^\d.]/g, "")
                    .replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
            }
        },
    },
};
</script>

<style lang="css" scoped>
.pageContent {
    display: flex;
    width: 90%;
    align-items: center;
}
.el-badge__content {
    transition: 400ms;
    user-select: none;
}
.el-badge__content:hover {
    cursor: pointer;
}
.select_input {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
