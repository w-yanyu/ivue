<template>
    <div id="page_content">
        <el-form
            ref="ruleForm"
            :model="ruleForm"
            :rules="rules"
            label-width="100px"
            class="custom-common--form"
        >
            <el-row>
                <el-col :span="10">
                    <el-form-item label="条件选择" prop="conditionValue">
                        <el-cascader
                            :disabled="disabled"
                            class="cascader"
                            :multiple="false"
                            :filterable="true"
                            v-model="ruleForm.conditionValueShow"
                            :show-all-levels="false"
                            :options="conditionsList"
                            :props="{ expandTrigger: 'hover'  }"
                            @change="changeConditions"
                            style="width: 420px"
                            clearable
                        ></el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="条件属性 ">
                        <el-input
                            class="input_el"
                            v-model="ruleForm.conditionValue"
                            disabled="true"
                            style="width: 200px; margin-right: 0px;"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="数据类型 ">
                        <el-input
                            class="input_el"
                            :value="chuangDataType(ruleForm.conditionDataType)"
                            disabled="true"
                            style="width: 200px; margin-right: 0px;"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="操作符" prop="operatorSymbolValue">
                        <!--   <el-select v-if="ruleForm.conditionDataType !== 'Boolean'" size="mini" class='cascader'
              style="width: 420px; margin-right: 0px;" v-model="ruleForm.operatorSymbolValue" :label-in-value="true"
              :disabled="disabled || ruleForm.conditionValue===''" @change="changeOperatorSymbol" clearable>
              <el-option v-for="item in operatorSymbolNormal" :key="item.value" :label="item.label" :value="item.value"
                :disabled='switchOperatorSymbolDisabled(item.value,ruleForm.conditionDataType)'>
              </el-option>
                        </el-select>-->
                        <el-cascader
                            v-if="ruleForm.conditionDataType !== 'Boolean'"
                            :disabled="disabled || ruleForm.conditionValue===''"
                            class="cascader"
                            v-model="ruleForm.operatorSymbolValueShow"
                            :options="operatorSymbolNormalFilter"
                            @change="changeOperatorSymbol"
                            :props="{ expandTrigger: 'hover', value:'dictId', label:'dictName' }"
                            style="width: 420px"
                            clearable
                        ></el-cascader>
                        <el-select
                            v-else
                            style="width: 420px; margin-right: 0px;"
                            class="cascader"
                            v-model="ruleForm.operatorSymbolValue"
                            :label-in-value="true"
                            :disabled="disabled "
                            @change="changeOperatorSymbol"
                            clearable
                        >
                            <el-option
                                v-for="item in operatorSymbolBoolean"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="switchOperatorSymbolDisabled(item.value,ruleForm.conditionDataType)"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="input-row">
                <!-- 正常情况输入布局 -->
                <input-layout-normal
                    v-if="showInputType==='normal'"
                    :conditionsListFilter="conditionsListFilter"
                    :itemData="ruleForm"
                    :normalInput="ruleForm.normalInput"
                    :conditionDataType="ruleForm.conditionDataType"
                    :querySearch="querySearch"
                    :conditionsListTemp="conditionsListTemp"
                    :getFormAmoutValidateInfo="getFormAmoutValidateInfo"
                    ref="inputNormal"
                ></input-layout-normal>
                <!-- 在...范围内,不在...范围内情况输入布局 -->
                <input-layout-in
                    v-if="showInputType==='in'"
                    :conditionsListFilter="conditionsListFilter"
                    :itemData="ruleForm"
                    :includeInput="ruleForm.includeInput"
                    :conditionDataType="ruleForm.conditionDataType"
                    :getFormAmoutValidateInfo="getFormAmoutValidateInfo"
                    :querySearch="querySearch"
                    ref="inputIn"
                ></input-layout-in>
                <!-- 在。。之间 情况输入布局 -->
                <input-layout-between
                    v-if="showInputType==='between'"
                    :conditionsListFilter="conditionsListFilter"
                    :itemData="ruleForm"
                    :betweenInput="ruleForm.betweenInput"
                    :conditionDataType="ruleForm.conditionDataType"
                    :getFormAmoutValidateInfo="getFormAmoutValidateInfo"
                    :querySearch="querySearch"
                    ref="inputBetween"
                ></input-layout-between>
                <!-- 大于..的..次方情况输入布局 -->
                <!--  <input-layout-pow v-if="showInputType==='pow'" :conditionsListFilter='conditionsListFilter' :itemData="ruleForm"
                :conditionDataType="ruleForm.conditionDataType" :querySearch='querySearch' ref="inputPow"></input-layout-pow>-->
                <!-- 包含，不包含，开头是，开头不是，结尾是、结尾不是情况输入布局 -->
                <input-layout-like
                    v-if="showInputType==='like'"
                    :conditionsListFilter="conditionsListFilter"
                    :itemData="ruleForm"
                    :likeInput="ruleForm.likeInput"
                    :conditionDataType="ruleForm.conditionDataType"
                    :querySearch="querySearch"
                    :getFormAmoutValidateInfo="getFormAmoutValidateInfo"
                    ref="inputLike"
                ></input-layout-like>
                <!-- 从...切割到...(substr函数) -->
                <input-layout-substr
                    v-if="showInputType==='substr'"
                    :conditionsListFilter="conditionsListFilter"
                    :itemData="ruleForm"
                    :substrInput="ruleForm.substrInput"
                    :conditionDataType="ruleForm.conditionDataType"
                    :querySearch="querySearch"
                    :getFormAmoutValidateInfo="getFormAmoutValidateInfo"
                    ref="inputSubstr"
                ></input-layout-substr>
                <!-- 下标为...的字符(indexof函数) -->
                <input-layout-indexof
                    v-if="showInputType==='indexOf'"
                    :conditionsListFilter="conditionsListFilter"
                    :itemData="ruleForm"
                    :indexofInput="ruleForm.indexofInput"
                    :conditionDataType="ruleForm.conditionDataType"
                    :querySearch="querySearch"
                    :getFormAmoutValidateInfo="getFormAmoutValidateInfo"
                    ref="inputIndexof"
                ></input-layout-indexof>
                <!-- 长度为...(length函数) -->
                <input-layout-length
                    v-if="showInputType==='length'"
                    :conditionsListFilter="conditionsListFilter"
                    :itemData="ruleForm"
                    :lengthInput="ruleForm.lengthInput"
                    :conditionDataType="ruleForm.conditionDataType"
                    :querySearch="querySearch"
                    :getFormAmoutValidateInfo="getFormAmoutValidateInfo"
                    ref="inputLength"
                ></input-layout-length>
                <!-- 统计字符个数(countstr函数) -->
                <input-layout-countstr
                    v-if="showInputType==='countstr'"
                    :conditionsListFilter="conditionsListFilter"
                    :itemData="ruleForm"
                    :countstrInput="ruleForm.countstrInput"
                    :conditionDataType="ruleForm.conditionDataType"
                    :querySearch="querySearch"
                    :getFormAmoutValidateInfo="getFormAmoutValidateInfo"
                    ref="inputCountstr"
                ></input-layout-countstr>
                <!-- 布尔值情况输入布局 -->
                <input-layout-boolean
                    v-if="showInputType==='boolean'"
                    :conditionsListFilter="conditionsListFilter"
                    :itemData="ruleForm"
                    :conditionDataType="ruleForm.conditionDataType"
                    ref="inputBoolean"
                ></input-layout-boolean>
                <!-- 自定义函数情况输入布局 -->
                <input-layout-custom-function
                    v-if="showInputType==='customFunction'"
                    :conditionsListFilter="conditionsListFilter"
                    :itemData="ruleForm"
                    :customFunctionInput="ruleForm.customFunctionInput"
                    :conditionDataType="ruleForm.conditionDataType"
                    ref="customFunction"
                ></input-layout-custom-function>
            </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <div class="tip-left">
                <el-button type="primary" @click="confirm">确定</el-button>
                <el-button type="info" @click="resetAll">重置</el-button>
            </div>
        </span>
    </div>
</template>

<script>
import { deepClone } from "@/views/risk/utils/helper"; //深度克隆
import { cloneJSON } from "@jsmini/clone";
import operatorNormal from "@/views/risk/dictdata/operatorSymbolNormal"; //导入操作符正常值选项
import inputLayoutNormal from "@/views/risk/risk_decision_rule/reform_test/generalCom/_components/input-layout-normal"; //导入正常情况输入布局
import inputLayoutIn from "@/views/risk/risk_decision_rule/reform_test/generalCom/_components/input-layout-in"; //导入在...范围内，不在...范围内情况输入布局
import inputLayoutBetween from "@/views/risk/risk_decision_rule/reform_test/generalCom/_components/input-layout-between"; //导入在。。之间 情况输入布局
// import inputLayoutPow from "@/views/risk/risk_decision_rule/reform_test/generalCom/_components/input-layout-pow"; //导入大于..的..次方情况输入布局
import inputLayoutLike from "@/views/risk/risk_decision_rule/reform_test/generalCom/_components/input-layout-like"; //导入包含，不包含，开头是，开头不是，结尾是、结尾不是情况输入布局
import inputLayoutSubstr from "@/views/risk/risk_decision_rule/reform_test/generalCom/_components/input-layout-substr"; //导入substr函数情况输入布局
import inputLayoutIndexof from "@/views/risk/risk_decision_rule/reform_test/generalCom/_components/input-layout-indexof"; //导入indexof函数情况输入布局
import inputLayoutLength from "@/views/risk/risk_decision_rule/reform_test/generalCom/_components/input-layout-length"; //导入length函数情况输入布局
import inputLayoutCountstr from "@/views/risk/risk_decision_rule/reform_test/generalCom/_components/input-layout-countstr"; //导入countstr函数情况输入布局
import inputLayoutBoolean from "@/views/risk/risk_decision_rule/reform_test/generalCom/_components/input-layout-boolean"; //导入布尔值情况输入布局
import inputLayoutCustomFunction from "@/views/risk/risk_decision_rule/reform_test/generalCom/_components/input-layout-custom-function"; //导入自定义函数情况输入布局

export default {
    props: {
        cMeta: Object, //本页面模板json数据Layout对象
        cParentMeta: Object, //父页面模板json数据Layout对象
        cParentParams: Object, //父页面自定义参数与内置参数
        cParentScope: Object, //父页面每块区域业务数据
    },
    components: {
        inputLayoutNormal,
        inputLayoutBetween,
        // inputLayoutPow,
        inputLayoutLike,
        inputLayoutBoolean,
        inputLayoutIn,
        inputLayoutSubstr,
        inputLayoutIndexof,
        inputLayoutLength,
        inputLayoutCountstr,
        inputLayoutCustomFunction,
    },
    data() {
        return {
            ruleForm: {
                conditionValueShow: "", //回显条件选择值
                conditionValue: "", //条件选择值
                conditionDesc: "", //条件选择后的转译解释
                conditionChildValue: "", //条件选择子选项值
                conditionChildDesc: "", //条件选择子选项转译
                conditionDataType: "", //条件选择后的数据类型
                operatorSymbolValueShow: "", //操作值符号
                operatorSymbolValue: "", //操作值符号
                operatorSymbolDesc: "", //操作符中文
                itemCode: "", //转译后的code
                itemDesc: "", //转译后的中文解释
                funcitonCode: "", //函数选择代码体
                //普通场景输入
                normalInput: {
                    inputRadio: 0, //1 常量输入 2变量输入  3简单计算 4函数选择
                    functionFormula: "", //选择的函数值
                    functionFormulaDesc: "", //选择的函数名称
                    simpleOperatorSymbolValue: "+", //简单计算操作符值
                    constantInputValue: "", //常量输入框值
                    variableInputValueShow: "", //变量输入框值
                    variableInputValue: "", //变量输入框值
                    variableInputDesc: "", //变量输入描述
                    simpleLeftInputValueShow: "", //简单计算左边输入值
                    simpleLeftInputValue: "", //简单计算左边输入值
                    simpleLeftInputDesc: "", //简单计算左边输入描述
                    simpleLeftInputType: "input", //左边输入值类型
                    simpleRightInputValueShow: "", //简单计算左边输入值
                    simpleRightInputValue: "", //简单计算左边输入值
                    simpleRightInputDesc: "", //简单计算左边输入描述
                    simpleRightInputType: "input", //右边输入值类型
                    inputDataItem: [], //自定义函数选择
                },
                //include 在。。。聚合 场景输入
                includeInput: {
                    inputInArray: [], //IN 在...集合,不在。。集合 输入的数组
                    includeOperatorSymbolValue: "IN", //在、不在
                },
                //between 在。。区间输入场景
                betweenInput: {
                    leftInputType: "input", //左边下拉选择 常量 变量
                    leftValueShow: "",
                    leftValue: "",
                    leftDesc: "",
                    betweenOperatorSymbolValue: "()", //区间操作符
                    rightInputType: "input", //右边下拉选择常量 变量
                    rightValueShow: "",
                    rightValue: "",
                    rightDesc: "",
                },
                // contains startWith endWith 函数
                likeInput: {
                    leftInputType: "input", //左边下拉选择 常量 变量
                    leftValueShow: "",
                    leftValue: "",
                    leftDesc: "",
                    likeOperatorSymbolValue: "",
                },
                //从...切割到...(substr函数)
                substrInput: {
                    startIndex: "", //从字符串第几位开始
                    slicNum: "", //切割多少位
                    substrOperatorSymbolValue: "==", //结果等于/结果不等于
                    inputStr: "", //准备处理的字符串
                },
                //下标为...的字符(indexof函数)
                indexofInput: {
                    leftInputType: "input", //左边下拉选择 常量 变量
                    leftValueShow: "",
                    leftValue: "",
                    leftDesc: "",
                    operatorSymbolValue: "==", //等于/不等于
                    intValue: "", //数值型常量
                },
                //长度为...(length函数)
                lengthInput: {
                    operatorSymbolValue: "==", //等于/不等于
                    lengthValue: "", //判断字符串的长度
                },
                //统计字符个数(countstr函数)
                countstrInput: {
                    strValue: "", //字符串常量值
                    intValue: "", //数值型常量
                    operatorSymbolValue: "==", //等于/不等于
                },
                //自定义函数输入场景
                customFunctionInput: {
                    functionStartInput: "", //自定义函数左边输入框
                    functionCodeInput: "", //中间代码输入框
                    functionEndInput: "", //自定义函数右边输入框
                },
            },
            rules: {
                conditionValue: [
                    {
                        required: true,
                        message: "请选择条件",
                        trigger: "blur",
                    },
                ],
                operatorSymbolValue: [
                    {
                        required: true,
                        message: "请选择操作符",
                        trigger: "blur",
                    },
                ],
            },
            conditionsList: null, //条件选择选项
            conditionsListTemp: null, //条件选择选项缓存
            conditionsListFilter: null, //子项筛选后的选项
            disabled: false, //false 编辑    true 查看
            selectcConstant: [], //常量提示选项
            operatorSymbolNormal: [], //操作符选项 正常情况
            operatorSymbolBoolean: [
                {
                    value: "==",
                    label: "等于",
                },
            ], //操作符选项 布尔值情况
        };
    },
    mounted() {
        console.log(
            "父类传过来的数据risk_decision_rule_add_new",
            this.cParentParams
        );
        this.operatorSymbolNormal = operatorNormal.data;
        if (this.cParentParams.itemForm) {
            this.ruleForm = this.cParentParams.itemForm;
        }
        //初始化联动下拉列表选项
        this.getConditionsList();
    },
    computed: {
        //根据条件筛选
        operatorSymbolNormalFilter() {
            if (this.operatorSymbolNormal.length === 0) {
                return;
            }
            let operatorClone = deepClone(this.operatorSymbolNormal);
            operatorClone.forEach((item, index, arrs) => {
                item.children.forEach((childrenItem, index, arrs) => {
                    if (
                        (childrenItem.dictId === "include" &&
                            this.ruleForm.conditionDataType !== "String") ||
                        (childrenItem.dictId === "contains" &&
                            this.ruleForm.conditionDataType !== "String") ||
                        (childrenItem.dictId === "startWith" &&
                            this.ruleForm.conditionDataType !== "String") ||
                        (childrenItem.dictId === "endWith" &&
                            this.ruleForm.conditionDataType !== "String") ||
                        (childrenItem.dictId === "substr" &&
                            this.ruleForm.conditionDataType !== "String") ||
                        (childrenItem.dictId === "indexOf" &&
                            this.ruleForm.conditionDataType !== "String") ||
                        (childrenItem.dictId === "length" &&
                            this.ruleForm.conditionDataType !== "String") ||
                        (childrenItem.dictId === "countstr" &&
                            this.ruleForm.conditionDataType !== "String")
                    ) {
                        childrenItem.disabled = true;
                    }
                });
            });
            console.log("操作符筛选更新", operatorClone);
            return operatorClone;
        },
        showInputType() {
            //情况一，int、decimal、string类型 操作为 等于、不等、大于、大于等，小于，小于等
            let patrn = /[!=><]/im;
            if (
                this.ruleForm.conditionDataType !== "Boolean" &&
                patrn.test(this.ruleForm.operatorSymbolValue)
            ) {
                return "normal";
            }
            //情况二：int、decimal、string类型 操作为在。。。集合 不在。。集合
            if (
                this.ruleForm.conditionDataType !== "Boolean" &&
                this.ruleForm.operatorSymbolValue === "include"
            ) {
                return "in";
            }
            // 情况三：int 、decimal、string类型 操作为 在...区间
            if (
                this.ruleForm.conditionDataType !== "Boolean" &&
                this.ruleForm.operatorSymbolValue === "BETWEEN"
            ) {
                return "between";
            }
            // 情况四：int 、decimal类型，操作符为 大于...的...次方
            // if (this.ruleForm.conditionDataType !== 'Int' && this.ruleForm.operatorSymbolValue === 'POW' || this.ruleForm
            //   .conditionDataType !==
            //   'Decimal' && this.ruleForm.operatorSymbolValue === 'POW') {
            //   return 'pow'
            // }
            //情况五：当为string类型的时候，操作符号为包含，不包含，开头是，开头不是，结尾是、结尾不是 的时候
            if (
                (this.ruleForm.conditionDataType === "String" &&
                    this.ruleForm.operatorSymbolValue === "contains") ||
                (this.ruleForm.conditionDataType === "String" &&
                    this.ruleForm.operatorSymbolValue === "startWith") ||
                (this.ruleForm.conditionDataType === "String" &&
                    this.ruleForm.operatorSymbolValue === "endWith")
            ) {
                return "like";
            }
            //情况六；条件操作类为boolean的时候，后面的操作符号只能是等于
            if (
                this.ruleForm.conditionDataType === "Boolean" &&
                patrn.test(this.ruleForm.operatorSymbolValue)
            ) {
                return "boolean";
            }
            //subStr函数
            if (this.ruleForm.operatorSymbolValue === "substr") {
                return "substr";
            }
            //indexof函数
            if (this.ruleForm.operatorSymbolValue === "indexOf") {
                return "indexOf";
            }
            //length函数
            if (this.ruleForm.operatorSymbolValue === "length") {
                return "length";
            }
            //countstr函数
            if (this.ruleForm.operatorSymbolValue === "countstr") {
                return "countstr";
            }
            //自定义函数情况
            if (this.ruleForm.operatorSymbolValue === "customFunction") {
                return "customFunction";
            }
        },
    },
    methods: {
        //初始化条件选择选项字典
        getConditionsList() {
            this.conditionsList = [];
            this.conditionsListTemp = [];
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
                   servicecode:"deci080101"
                })
                .then((obj) => {
                    console.log("获取联动条件选择选项字典回调", obj.data);
                    this.conditionsList = obj.data;
                    this.conditionsListTemp = obj.data;
                    //如果是加载回显数据
                    if (this.cParentParams.itemForm) {
                        this.conditionsListDataFilter(
                            this.ruleForm.conditionDataType
                        );
                    }
                })
                .catch((reg) => {});
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
                    servicecode:"deci080103"
                })
                .then((obj) => {
                    console.log("获取主动输入提示回调", obj.data);
                    this.selectcConstant = obj.data;
                });
        },
        //条件选择改变触发
        changeConditions(val, selectedData) {
            // console.log('条件选择改变触发', val, selectedData);
            this.ruleForm.conditionValue =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).value
                    ? this.getFormAmoutValidateInfo(val).value
                    : "";
            this.ruleForm.conditionDesc =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).label
                    ? this.getFormAmoutValidateInfo(val).label
                    : "";
            this.ruleForm.conditionDataType =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).dataType
                    ? this.getFormAmoutValidateInfo(val).dataType
                    : "";
            // console.log('条件选择改变触发---conditionValue', this.ruleForm.conditionValue);
            // console.log('条件选择改变触发---conditionDataType', this.ruleForm.conditionDataType);
            // console.log('条件选择改变触发---conditionDesc', this.ruleForm.conditionDesc);
            this.conditionsListDataFilter(this.ruleForm.conditionDataType); //过滤子选项数组
            // if (this.showInputType) {
            //   this.resetSmall()
            // } //重置操作符 和填写项
            this.resetCondition();
        },
        //操作符选择变更触发
        changeOperatorSymbol(value) {
            console.log("changeOperatorSymbol", value);
            // console.log('条件选择改变触发', val, selectedData);
            let selectedOperatorSymbol = {};
            if (this.ruleForm.conditionDataType !== "Boolean") {
                let key = value[0];
                let findValue = value[1];
                for (let i = 0; i < this.operatorSymbolNormal.length; i++) {
                    if (this.operatorSymbolNormal[i].dictId === key) {
                        selectedOperatorSymbol = this.operatorSymbolNormal[
                            i
                        ].children.find((item) => {
                            //这里的chargingWorkNameList就是上面遍历的数据源
                            return item.dictId === findValue;
                            //筛选出匹配数据，是对应数据的整个对象
                        });
                    }
                }
            this.ruleForm.operatorSymbolDesc = selectedOperatorSymbol.dictName;
            this.ruleForm.operatorSymbolValue = selectedOperatorSymbol.dictId;
            } else {
                selectedOperatorSymbol = this.operatorSymbolBoolean.find(
                    (item) => {
                        //这里的chargingWorkNameList就是上面遍历的数据源
                        return item.value === value;
                        //筛选出匹配数据，是对应数据的整个对象
                    }
                );
            this.ruleForm.operatorSymbolDesc = selectedOperatorSymbol.label;
            this.ruleForm.operatorSymbolValue = selectedOperatorSymbol.value;
            }
            console.log("selectedOperatorSymbol", selectedOperatorSymbol);

            console.log(
                " this.ruleForm.operatorSymbolValue",
                this.ruleForm.operatorSymbolValue
            );
            this.resetOperator();
            this.ruleForm.likeInput.likeOperatorSymbolValue =
                this.ruleForm.operatorSymbolValue;
        },
        //操作符选择项是否可选的判断
        switchOperatorSymbolDisabled(value, leftType) {
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
        getFormAmoutValidateInfo(val) {
            for (let i in this.conditionsListTemp) {
                let item = this.conditionsListTemp[i].children;
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
        chuangDataType(conditionDataType) {
            switch (conditionDataType) {
                case "String":
                    return "String--字符串";
                    break;
                case "Int":
                    return "Int--整数";
                    break;
                case "Decimal":
                    return "Decimal--数值";
                    break;
                case "Boolean":
                    return "Boolean--布尔";
                    break;
            }
        },
        conditionsListDataFilter(dataType) {
            let depDataRight = deepClone(this.conditionsListTemp);
            depDataRight.forEach((item, index, arrs) => {
                item.children.forEach((childrenItem, index, arrs) => {
                    if (childrenItem.children) {
                        childrenItem.children.forEach(
                            (grandchildrenItem, index, arrs) => {
                                if (grandchildrenItem.dataType !== dataType) {
                                    grandchildrenItem.disabled = true;
                                }
                            }
                        );
                    } else {
                        if (childrenItem.dataType !== dataType) {
                            childrenItem.disabled = true;
                        }
                    }
                });
            });
            console.log("筛选选项更新", depDataRight);
            this.conditionsListFilter = depDataRight;
        },
        //设置规则提交按钮
        confirm() {
            let that = this;
            //有未填写完的项目
            if (!that.checkComplete()) {
                return;
            }
            this.translationConfirm();
            let obj = {
                itemCode: that.ruleForm.itemCode,
                itemDesc: that.ruleForm.itemDesc,
                itemForm: this.ruleForm,
            };
            that.$dataBus.doCallBack(that, obj);
        },
        //重置按钮
        resetAll() {
            this.ruleForm.variableInputValueShow = "";
            this.ruleForm.conditionValue = "";
            this.ruleForm.conditionDataType = "";
            this.resetCondition();
        },
        //主条件选择变更时的小复位
        resetCondition() {
            console.log("$refs", this.$refs);
            this.ruleForm.operatorSymbolValue = "";
            this.ruleForm.operatorSymbolValueShow = "";
            this.resetOperator();
        },
        //运算符变化复位
        resetOperator() {
            if (this.$refs.inputNormal) {
                this.$refs.inputNormal.resetNormalAll();
            }
            if (this.$refs.inputIn) {
                this.$refs.inputIn.resetIn();
            }
            if (this.$refs.inputBetween) {
                this.$refs.inputBetween.resetBetween();
            }
            if (this.$refs.inputPow) {
                this.$refs.inputPow.resetPow();
            }
            if (this.$refs.inputLike) {
                this.$refs.inputLike.resetLike();
            }
            if (this.$refs.inputBoolean) {
                this.$refs.inputBoolean.resetBoolean();
            }
            if (this.$refs.inputSubstr) {
                this.$refs.inputSubstr.resetSubstr();
            }
            if (this.$refs.inputIndexof) {
                this.$refs.inputIndexof.resetIndexof();
            }
            if (this.$refs.inputLength) {
                this.$refs.inputLength.resetLength();
            }
            if (this.$refs.inputCountstr) {
                this.$refs.inputCountstr.resetCountstr();
            }
            if (this.$refs.customFunction) {
                this.$refs.customFunction.resetCustomFunction();
            }
        },
        //检查输入完成项目
        checkComplete() {
            console.log("showInputType", this.showInputType);
            if (!this.showInputType) {
                this.$message.error("请选择条件和操作符");
                return false;
            }
            //检查正常情况输入项
            if (this.showInputType === "normal" && this.$refs.inputNormal) {
                return this.$refs.inputNormal.checkComplete();
            }
            //在...范围内，不在...范围内情况
            if (this.showInputType === "in" && this.$refs.inputIn) {
                return this.$refs.inputIn.checkComplete();
            }
            //在。。之间 情况
            if (this.showInputType === "between" && this.$refs.inputBetween) {
                return this.$refs.inputBetween.checkComplete();
            }
            //大于..的..次方情况
            if (this.showInputType === "pow" && this.$refs.inputPow) {
                return this.$refs.inputPow.checkComplete();
            }
            //含，不包含，开头是，开头不是，结尾是、结尾不是情况
            if (this.showInputType === "like" && this.$refs.inputLike) {
                return this.$refs.inputLike.checkComplete();
            }
            //布尔值情况
            if (this.showInputType === "boolean" && this.$refs.inputBoolean) {
                return this.$refs.inputBoolean.checkComplete();
            }
            if (this.showInputType === "substr" && this.$refs.inputSubstr) {
                return this.$refs.inputSubstr.checkComplete();
            }
            if (this.showInputType === "indexOf" && this.$refs.inputIndexof) {
                return this.$refs.inputIndexof.checkComplete();
            }
            if (this.showInputType === "length" && this.$refs.inputLength) {
                return this.$refs.inputLength.checkComplete();
            }
            if (this.showInputType === "countstr" && this.$refs.inputCountstr) {
                return this.$refs.inputCountstr.checkComplete();
            }
            //自定义函数情况
            if (
                this.showInputType === "customFunction" &&
                this.$refs.customFunction
            ) {
                return this.$refs.customFunction.checkComplete();
            }
            return true;
        },
        //转译提交 转译放到子组件处理 主要处理 itemCode itemDesc 用作外层处理
        translationConfirm() {
            switch (this.showInputType) {
                //正常情况输入项
                case "normal":
                    if (this.$refs.inputNormal) {
                        return this.$refs.inputNormal.translationNormal();
                    }
                    break;
                //在...范围内，不在...范围内情况
                case "in":
                    if (this.$refs.inputIn) {
                        return this.$refs.inputIn.translationIn();
                    }
                    break;
                //在。。之间 情况
                case "between":
                    if (this.$refs.inputBetween) {
                        return this.$refs.inputBetween.translationBetween();
                    }
                    break;
                //大于..的..次方情况
                case "pow":
                    if (this.$refs.inputPow) {
                        return this.$refs.inputPow.translationPow();
                    }
                    break;
                //包含，不包含，开头是，开头不是，结尾是、结尾不是情况
                case "like":
                    if (this.$refs.inputLike) {
                        return this.$refs.inputLike.translationLike();
                    }
                    break;
                //布尔值情况
                case "boolean":
                    if (this.$refs.inputBoolean) {
                        return this.$refs.inputBoolean.translationBoolean();
                    }
                    break;
                case "substr":
                    if (this.$refs.inputSubstr) {
                        return this.$refs.inputSubstr.translationSubstr();
                    }
                    break;
                case "indexOf":
                    if (this.$refs.inputIndexof) {
                        return this.$refs.inputIndexof.translationIndexof();
                    }
                    break;
                case "length":
                    if (this.$refs.inputLength) {
                        return this.$refs.inputLength.translationLength();
                    }
                    break;
                case "countstr":
                    if (this.$refs.inputCountstr) {
                        return this.$refs.inputCountstr.translationCountstr();
                    }
                    break;
                //自定义函数情况
                case "customFunction":
                    if (this.$refs.customFunction) {
                        return this.$refs.customFunction.translationCustomFunction();
                    }
                    break;
            }
        },
        //输入框主动输入筛选选择项
        querySearch(queryString, cb) {
            let selectcConstantCust = cloneJSON(this.selectcConstant);
            selectcConstantCust = selectcConstantCust.filter(
                this.filterConstant(this.ruleForm.conditionDataType)
            );
            let results;
            if (queryString !== "") {
                results = selectcConstantCust.filter(
                    this.createFilter(queryString)
                );
            } else {
                results = selectcConstantCust;
            }
            console.log("+++++",results);
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        //根据主条件类型进行筛选
        filterConstant(dataType) {
            return (selectcConstantCust) => {
                let array =
                    selectcConstantCust.dataType
                        .toLowerCase()
                        .indexOf(dataType.toLowerCase()) === 0;
                console.log("filterConstant-----", array);
                return array;
            };
        },
        //根据输入文本进行筛选
        createFilter(queryString) {
            return (selectcConstantCust) => {
                let array =
                    selectcConstantCust.value
                        .toLowerCase()
                        .indexOf(queryString.toLowerCase()) === 0;
                console.log("createFilter+++++", array);
                return array;
            };
        },
    },
};
</script>

<style lang="less" scoped>
#page_content {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
}
    /deep/ .el-autocomplete-suggestion {
        z-index: 10000 !important;
    }
    /deep/ .el-popper {
        z-index: 10000 !important;
    }
.dialog-footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    text-align: left;
}
.input-row {
    min-height: 100px;
    width: 100%;
}
</style>
