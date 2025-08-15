<template>
    <div class="bizrulecondition-container">
        <el-cascader
            :disabled="!disabled"
            size="mini"
            v-model="pipe.left"
            :options="dataList"
            :props="{ expandTrigger: 'hover'  }"
            @change="changeLeft"
            style="width: max-content"
            clearable
        ></el-cascader>
        <el-select
            v-if="pipe.leftType !== 'Boolean'"
            size="mini"
            style="width: 120px; margin-right: 0px;"
            v-model="pipe.operator"
            :label-in-value="true"
            :disabled="!disabled "
            @change="changeOperator"
            clearable
        >
            <el-option
                v-for="item in conditionType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="switchDisabled(item.value,pipe.leftType)"
            ></el-option>
        </el-select>
        <el-select
            v-else
            size="mini"
            style="width: 120px; margin-right: 0px;"
            v-model="pipe.operator"
            :label-in-value="true"
            :disabled="!disabled "
            @change="changeOperator"
            clearable
        >
            <el-option
                v-for="item in conditionBooleanType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                :disabled="switchDisabled(item.value,pipe.leftType)"
            ></el-option>
        </el-select>
        <el-badge
            :value="pipe.centerBtnType === 'constant' ? '常量' : '变量'"
            :type="pipe.centerBtnType === 'constant' ? 'info' : 'success'"
            @click.native="switchVarType($event, pipe)"
            style="margin-right: 5px;"
            :hidden="isHiddenBadge(pipe.leftType,pipe.operator)"
        ></el-badge>
        <div
            class="select_input"
            v-if="pipe.leftType !== 'Boolean' && pipe.centerBtnType !== 'constant'  "
        >
            <el-cascader
                :disabled="!disabled"
                size="mini"
                v-if="pipe.rightBtnType === 'select' "
                v-model="pipe.rightList"
                :options="dataFilterRight"
                :props="{ expandTrigger: 'hover' }"
                @change="changeRightList"
                style="width: 140px;margin-right: 0px;"
                :hidden="isHiddenBadge(pipe.leftType,pipe.operator)"
                clearable
            ></el-cascader>
            <el-input
                size="mini"
                v-model="pipe.right"
                v-else
                placeholder="请输入变量"
                style="width: 140px;"
                clearable
                @input="rightListInput($event,pipe)"
            ></el-input>
            <el-badge
                :ref="badgeRightBtnType"
                :value="pipe.rightBtnType === 'select' ? '选择' : '输入'"
                :type="pipe.rightBtnType === 'select' ? 'success' : 'info'"
                @click.native="switchRightBtnType($event, pipe)"
                style="margin-right: 5px;"
                :hidden="isHiddenBadge(pipe.leftType,pipe.operator)"
            ></el-badge>
        </div>
        <el-select
            :disabled="!disabled"
            size="mini"
            style="width: 80px; margin-right: 0px;"
            v-if="pipe.leftType !== 'Boolean' && pipe.centerBtnType !== 'constant'  "
            v-model="pipe.rightSelect"
            :hidden="isHiddenBadge(pipe.leftType,pipe.operator)"
            clearable
        >
            <el-option
                v-for="item in rightSelectType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>
        <div class="select_input" v-if="pipe.leftType !== 'Boolean' ">
            <el-cascader
                :disabled="!disabled"
                size="mini"
                v-if="pipe.rightValueBtnType === 'select' "
                v-model="pipe.rightValueList"
                :options="dataFilterRight"
                :props="{ expandTrigger: 'hover' }"
                @change="changeRightValueList"
                style="width: 140px;margin-right: 0px;"
                clearable
            ></el-cascader>
            <el-input
                size="mini"
                :disabled="!disabled"
                v-model="pipe.rightValue"
                v-else
                placeholder="字段值1"
                style="width: 140px;"
                clearable
                @input="rightValueInput($event,pipe.leftType,pipe.operator)"
            ></el-input>
            <el-badge
                :ref="badgeRightBtnType"
                :value="pipe.rightValueBtnType === 'select' ? '选择' : '输入'"
                :type="pipe.rightValueBtnType === 'select' ? 'success' : 'info'"
                v-if="pipe.centerBtnType != 'constant'"
                @click.native="switchRightValueBtnTypeBtnType($event, pipe)"
                style="margin-right: 5px;"
                :hidden="isHiddenBadge(pipe.leftType,pipe.operator)"
            ></el-badge>
        </div>
        <!-- 如果为boolean的场景 出现真假选项 -->
        <el-select
            v-if="pipe.leftType === 'Boolean'"
            size="mini"
            style="width: 120px; margin-right: 0px;"
            v-model="pipe.rightValue"
            :label-in-value="true"
            clearable
        >
            <el-option
                v-for="item in booleanType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
            ></el-option>
        </el-select>
        <el-input
            size="mini"
            v-if="pipe.operator ==='BETWEEN'|| pipe.operator ==='POW' "
            v-model="pipe.rightValueBetween"
            :disabled=" pipe.leftType === 'Boolean' || !disabled "
            placeholder="字段值2"
            style="width: 150px;"
            clearable
            @input="rightValueBetweenInput($event,pipe.leftType,pipe.operator)"
        ></el-input>
        <el-button
            size="mini"
            @click="delSelf"
            v-if="disabled  && isShowDel"
            type="danger"
            icon="el-icon-delete"
            circle
        ></el-button>
    </div>
</template>

<script>
import { deepClone } from "../../views/risk/utils/helper";

export default {
    name: "biz-rule-condition",
    // props: ['pipe', 'disabled', 'normal'],
    props: {
        pipe: Object, //父组件传过来的类
        disabled: {
            type: Boolean,
            default: true,
        },
        isShowDel: {
            type: Boolean,
            default: true,
        },
        normal: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
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
            conditionBooleanType: [
                {
                    value: "==",
                    label: "等于",
                },
            ],
            conditionType: [
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
            booleanType: [
                {
                    value: "true",
                    label: "真",
                },
                {
                    value: "false",
                    label: "假",
                },
            ],
        };
    },
    mounted() {
        console.log("父类传过来的参数", this.pipe);
        if (this.pipe) {
            this.leftTyp = this.pipe.leftType;
        }
        //初始化事实下拉列表
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
            console.log("激活右边选择联动选项过滤----", this.leftType);
            console.log("激活右边选择联动选项过滤----", this.dataList);
            //如果默认选项字典没有拉取到，取消过滤
            if (!this.dataList) {
                return;
            }
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
        changeRightList(val, selectedData) {
            // console.log("changeRightList", val, selectedData);
            // console.log("changeRightList_pipe", this.pipe);
            this.pipe.right =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).value
                    ? this.getFormAmoutValidateInfo(val).value
                    : "";
            this.pipe.rightDesc =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).label
                    ? this.getFormAmoutValidateInfo(val).label
                    : "";
            this.pipe.rightType =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).dataType
                    ? this.getFormAmoutValidateInfo(val).dataType
                    : "";
            this.rightType = this.pipe.rightType;
            console.log("changeRightList_pipe---right", this.pipe.right);
            console.log(
                "changeRightList_pipe---rightDesc",
                this.pipe.rightDesc
            );
            console.log(
                "changeRightList_pipe---rightType",
                this.pipe.rightType
            );
        },
        //最右边输入框改成选择项目
        changeRightValueList(val, selectedData) {
            // console.log("changeRightList", val, selectedData);
            // console.log("changeRightList_pipe", this.pipe);
            this.pipe.rightValue =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).value
                    ? this.getFormAmoutValidateInfo(val).value
                    : "";
            this.pipe.rightValueDesc =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).label
                    ? this.getFormAmoutValidateInfo(val).label
                    : "";
            this.pipe.rightValueType =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).dataType
                    ? this.getFormAmoutValidateInfo(val).dataType
                    : "";
            this.rightValueType = this.pipe.rightValueType;
            console.log(
                "changeRightList_pipe---rightValue",
                this.pipe.rightValue
            );
            console.log(
                "changeRightList_pipe---rightValueDesc",
                this.pipe.rightValueDesc
            );
            console.log(
                "changeRightList_pipe---rightValueType",
                this.pipe.rightValueType
            );
        },
        //条件选择
        changeLeft(val, selectedData) {
            //debugger;
            console.log("==zmh==选择的value：" + val);
            this.pipe.left =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).value
                    ? this.getFormAmoutValidateInfo(val).value
                    : "";
            this.pipe.leftDesc =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).label
                    ? this.getFormAmoutValidateInfo(val).label
                    : "";
            this.pipe.leftType =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).dataType
                    ? this.getFormAmoutValidateInfo(val).dataType
                    : "";
            this.reference =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).reference
                    ? this.getFormAmoutValidateInfo(val).reference
                    : "";
            this.formAmoutValidate.operator = null;
            if (this.pipe.leftType === "Boolean") {
                this.pipe.operator = "==";
                this.pipe.centerBtnType = "constant";
                this.pipe.right = "";
                this.pipe.rightValueBtnType = "input";
                this.pipe.rightDesc = "";
                this.pipe.rightList = "";
                this.pipe.rightSelect = "";
                this.pipe.rightValue = "";
                this.pipe.rightValueBetween = "";
            }
            console.log("leftType===" + this.pipe.leftType);
            console.log("changeLeft", this.pipe);
            this.leftType = this.pipe.leftType;
            if (this.leftType !== this.rightType) {
                this.rightType = "";
                this.pipe.rightType = "";
                this.pipe.rightList = "";
                this.pipe.rightValue = "";
                this.pipe.rightValueBetween = "";
            }
            console.log("changeLeft_pipe", this.pipe);
        },
        changeOperator() {
            this.pipe.right = "";
            this.pipe.rightDesc = "";
            this.pipe.rightList = "";
            this.pipe.rightValueList = "";
            this.pipe.rightSelect = "";
            this.pipe.rightValue = "";
            this.pipe.rightValueDesc = "";
            this.pipe.rightValueBetween = "";
            this.pipe.rightValueBtnType = "input";
        },
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
                                let obj = {
                                    value: item[z].children[x].value,
                                    label:
                                        item[z].label +
                                        "." +
                                        item[z].children[x].label,
                                    dataType: item[z].children[x].dataType,
                                    reference: item[z].children[x].reference,
                                };
                                return obj;
                            }
                        }
                    } else {
                        if (val === undefined) {
                            let obj = {
                                value: item[z].value,
                                label: item[z].label,
                                dataType: item[z].dataType,
                                reference: item[z].reference,
                            };
                            return obj;
                        }
                        if (item[z].value === val[val.length - 1]) {
                            let obj = {
                                value: item[z].value,
                                label: item[z].label,
                                dataType: item[z].dataType,
                                reference: item[z].reference,
                            };
                            return obj;
                        }
                    }
                }
            }
        },
        // 切换参数类型
        switchVarType(e, pipe) {
            if (!this.disabled) {
                return;
            }
            this.$nextTick(() => {
                console.log(e);
                if (String(e.target.tagName).toUpperCase() === "SUP") {
                    pipe.centerBtnType =
                        pipe.centerBtnType === "constant"
                            ? "variable"
                            : "constant";
                    // if (pipe.centerBtnType === 'constant') {
                    //   pipe.rightValueBtnType = 'input'
                    // }
                    pipe.rightValueBtnType =
                        pipe.centerBtnType === "constant" ? "input" : "select";
                    pipe.rightValue = "";
                    pipe.rightValueList = "";
                    pipe.rightList = "";
                    pipe.right = "";
                    pipe.rightBtnType = "select";
                    pipe.rightSelect = "";
                    // console.log('switchVarType===after', pipe.centerBtnType);
                }
            });
        },
        switchRightBtnType(e, pipe) {
            if (!this.disabled) {
                return;
            }
            let that = this;
            pipe.rightBtnType =
                pipe.rightBtnType === "select" ? "input" : "select";
            // this.$refs.badgeRightBtnType.$children[0].$children[0].$forceUpdate();
            console.log("switchVarType===after", pipe.rightBtnType);
            that.pipe.right = "";
            that.pipe.rightDesc = "";
            that.pipe.rightType = "";
            that.rightType = that.pipe.rightType;
            that.pipe.rightList = "";
            // this.$nextTick(() => {
            //   console.log(e);
            // })
        },
        //最右边输入框改成选择项目的输入
        switchRightValueBtnTypeBtnType(e, pipe) {
            if (!this.disabled) {
                return;
            }
            let that = this;
            pipe.rightValueBtnType =
                pipe.rightValueBtnType === "select" ? "input" : "select";
            // this.$refs.badgeRightBtnType.$children[0].$children[0].$forceUpdate();
            console.log("switchVarType===after", pipe.rightValueBtnType);
            that.pipe.rightValue = "";
            that.pipe.rightValueDesc = "";
            that.pipe.rightValueType = "";
            that.rightValueType = that.pipe.rightValueType;
            that.pipe.rightValueList = "";
            // this.$nextTick(() => {
            //   console.log(e);
            // })
        },
        // 删除操作
        delSelf() {
            // eslint-disable-next-line no-array-constructor
            const idx = Array().indexOf.call(
                this.$parent.pipe.children,
                this.pipe
            );
            this.$parent.pipe.children.splice(idx, 1);
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
        //初始化事实下拉列表
        getFactList() {
            console.log("获取联动选择的默认选项字典");
            this.dataLeft = [];
            this.dataRight = [];
            this.rightDataLeft = [];
            if (this.normal) {
                this.$http
                    .invokeAPI("/SUMP/riskController/riskCall", "POST", {
                        servicecode:
                            "risk-management-service/combobox-select/facts",
                        appId: "risk-management-service",
                        isList: true,
                    })
                    .then((obj) => {
                        console.log("zmh+++++++++++++++++" + obj.data);
                        this.dataList = obj.data;
                        this.dataRight = obj.data;
                        this.dataLeft = obj.data;
                    })
                    .catch((reg) => {});
            } else {
                this.$http
                    .invokeAPI("/SUMP/riskController/riskCall", "POST", {
                        servicecode:
                            "risk-management-service/combobox-select/collection-indicator",
                        appId: "risk-management-service",
                    })
                    .then((obj) => {
                        this.dataLeft.push({
                            value: "jihezhibiao",
                            label: "集合指标",
                            children: obj.data,
                        });
                    })
                    .catch((reg) => {
                        this.dataLeft.push({
                            value: "jihezhibiao",
                            label: "集合指标",
                            children: [],
                        });
                    });
                this.$http
                    .invokeAPI("/SUMP/riskController/riskCall", "POST", {
                        servicecode:
                            "risk-management-service/combobox-select/aggregate-indicator",
                        appId: "risk-management-service",
                    })
                    .then((obj) => {
                        this.dataLeft.push({
                            value: "juhezhibiao",
                            label: "聚合指标",
                            children: obj.data,
                        });
                        this.dataRight.push({
                            value: "juhezhibiao",
                            label: "聚合指标",
                            children: obj.data,
                        });
                    })
                    .catch((reg) => {
                        this.dataLeft.push({
                            value: "juhezhibiao",
                            label: "聚合指标",
                            children: [],
                        });
                        this.dataRight.push({
                            value: "juhezhibiao",
                            label: "聚合指标",
                            children: [],
                        });
                    });
                this.$http
                    .invokeAPI("/SUMP/riskController/riskCall", "POST", {
                        servicecode:
                            "risk-management-service/combobox-select/collection",
                        appId: "risk-management-service",
                    })
                    .then((obj) => {
                        this.selectcCollection = obj.data;
                    });
                this.$http
                    .invokeAPI("/SUMP/riskController/riskCall", "POST", {
                        servicecode:
                            "risk-management-service/combobox-select/collection-code-group",
                        appId: "risk-management-service",
                    })
                    .then((obj) => {
                        this.selectCollectionCode = obj.data;
                    });
                this.$http
                    .invokeAPI("/SUMP/riskController/riskCall", "POST", {
                        servicecode:
                            "risk-management-service/combobox-select/constant",
                        appId: "risk-management-service",
                    })
                    .then((obj) => {
                        this.selectcConstant = obj.data;
                    });
                this.$http
                    .invokeAPI("/SUMP/riskController/riskCall", "POST", {
                        servicecode:
                            "risk-management-service/combobox-select/facts",
                        appId: "risk-management-service",
                    })
                    .then((obj) => {
                        this.dataLeft.push({
                            value: "shishi",
                            label: "事实",
                            children: obj.data,
                        });
                        this.dataRight.push({
                            value: "shishi",
                            label: "事实",
                            children: obj.data,
                        });
                    })
                    .catch((reg) => {
                        this.dataLeft.push({
                            value: "shishi",
                            label: "事实",
                            children: [],
                        });
                        this.dataRight.push({
                            value: "shishi",
                            label: "事实",
                            children: [],
                        });
                    });
                this.leftType = this.pipe.leftType;
                this.dataList = this.dataLeft;
            }
        },
        //选择项是否可选的判断
        switchDisabled(value, leftType) {
            switch (value) {
                //大于..的..次方
                case "POW":
                    //成立的时候为选项内容不可选择
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
        // 显示或隐藏常量变量的按钮
        isHiddenBadge(leftType, operator) {
            return (
                leftType === "Boolean" ||
                operator === "POW" ||
                operator === "IN" ||
                operator === "NOT_IN" ||
                operator === "BETWEEN" ||
                operator === "LIKE" ||
                operator === "NOT_LIKE" ||
                operator === "STARTSWITH" ||
                operator === "NOT_STARTSWITH" ||
                operator === "ENDSWITH" ||
                operator === "NOT_ENDSWITH"
            );
        },
        //获取组件的输入状态
        getIntputStaut() {
            let that = this;
            console.log("获取组件的输入状态", that);
            return that.pipe;
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
                    that.pipe.operator === "IN" ||
                    that.pipe.operator === "NOT_IN"
                ) {
                    //在。。范围内  不在。。范围内 特殊情况可以输入，号进行分割
                    that.pipe.rightValue = value.replace(/[^\d,]/g, "");
                } else {
                    //一般情况下只能输入整数
                    that.pipe.rightValue = value.replace(/\D/g, "");
                }
                //只能输入数字不能输入小数点
                // that.pipe.rightValue = value.replace(/\D/g, '')
                // that.pipe.rightValue = value.replace(/[0-9\.]+/g, '')
            }
            if (leftType === "Decimal") {
                //只能输入数字不能输入小数点
                // that.pipe.rightValue = value.replace(/[^\d.]/g, '')
                // let reg = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g; //只能输入两位小数
                // if (reg.test(value)) { //正则匹配通过，提取有效文本
                //   that.pipe.rightValue = value.replace(reg, '$2$3$4');
                // }
                // let reg = /(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/  .replace(/[\u4E00-\u9FA5]/i, '')
                // that.pipe.rightValue = value.replace(/[^\d\.]/, '').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
                that.pipe.rightValue = value
                    .replace(/[^\d.]/g, "")
                    .replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
            }
        },
        rightValueBetweenInput(e, leftType, operator) {
            let that = this;
            let value = e;
            if (operator === "POW") {
                value = value.replace(/\D/g, "");
                if (value === 0) {
                    value = 1;
                }
                if (value > 5) {
                    value = 5;
                }
                that.pipe.rightValueBetween = value;
            } else {
                if (leftType === "Int") {
                    value = value.replace(/\D/g, "");
                    //只能输入数字不能输入小数点
                    that.pipe.rightValueBetween = value;
                }
                if (leftType === "Decimal") {
                    // if (operator === 'BETWEEN') {
                    //   value = value.replace(/\D/g, '');
                    //   //只能输入数字不能输入小数点
                    //   that.pipe.rightValueBetween = value
                    // } else {
                    //   //只能输入数字和小数点
                    //   // that.pipe.rightValueBetween = value.replace(/[^\d.]/g, '')
                    //   that.pipe.rightValueBetween = value.replace(/[^\d.]/g, '').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
                    // }
                    //只能输入数字和小数点
                    // that.pipe.rightValueBetween = value.replace(/[^\d.]/g, '')
                    that.pipe.rightValueBetween = value
                        .replace(/[^\d.]/g, "")
                        .replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
                }
            }
        },
        rightListInput(e, pipe) {
            let value = e;
            pipe.rightList = value;
            pipe.right = value;
            pipe.rightDesc = value;
            pipe.rightType = "String";
            pipe.rightType = pipe.rightType;

            console.log("changeRightList_pipe---right", pipe.right);
            console.log("changeRightList_pipe---rightDesc", pipe.rightDesc);
            console.log("changeRightList_pipe---rightType", pipe.rightType);
        },
    },
};
</script>

<style lang="css" scoped>
.bizrulecondition-container {
    display: flex;
    width: 100%;
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
