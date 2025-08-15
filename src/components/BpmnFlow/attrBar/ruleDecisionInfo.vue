<template>
    <div>
        <el-form ref="form" :model="currentEditAtrr" label-width="110px" class="form-two-column" :rules="rules">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="base" class="isForm">

                    <el-form-item label="规则代码" prop="ruleCode">
                        <el-input v-model="currentEditAtrr.ruleCode" @blur="saveAttr()" :disabled="true">
                            <el-button slot="append" type="primary" :disabled="onlyRead" @click="openDialog">选择</el-button>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="规则名称" prop="ruleName">
                        <el-input v-model="currentEditAtrr.ruleName" @blur="saveAttr()" :disabled="true" />
                    </el-form-item>
                    <el-form-item label="版本号" prop="version">
                        <el-input v-model="currentEditAtrr.version" disabled />
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="规则配置" name="rule">
                    <el-form-item label="规则描述" class="full-row">
                        <el-input v-model="currentEditAtrr.ruleContentDesc" type="textarea" :rows="3" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="规则表达式" class="full-row" prop="executableExpression">
                        <el-input v-model="currentEditAtrr.executableExpression" type="textarea" :rows="3"
                            disabled></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="动作信息" name="action">
                    <el-row class="listTable" v-for="(item, index) in actionList" :key="index">
                        <el-col :span="24" class="col_content" v-if="currentEditAtrr.ruleId">
                            <!-- 第一个选择项 -->
                            <el-select v-model="actionList[index].actionType" style="width: 10%;" filterable
                                placeholder="请选择动作类型" @change="changeOperator(actionList[index], index)" disabled
                                clearable>
                                <el-option v-for="item in actionType" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                            <!-- 第二个联动选择项目 -->
                            <el-cascader style="width:40%"
                                v-if="actionList[index].actionType !== '4' && actionList[index].actionType !== '0' && actionList[index].actionType !== '5' && actionList[index].actionType !== ''"
                                class="input_el" v-model="actionList[index].actionStringShow" :options="dataList"
                                :filterable="true" :show-all-levels="false" :multiple="false"
                                :props="{ expandTrigger: 'hover' }" @change="changeActionList($event, item, index)"
                                disabled clearable ></el-cascader>
                            <span
                                v-if="actionList[index].actionType !== '4' && actionList[index].actionType !== '3' && actionList[index].actionType !== '0' && actionList[index].actionType !== '5' && actionList[index].actionType !== ''"
                                class="el-tag el-tag--info el-tag--mini buttonSet" style="cursor: pointer;"
                                @click="setFormula(index)" disabled>{{ actionList[index].buttonText ?
                                    actionList[index].buttonText : '等于' }}</span>
                            <!-- 第三个输入框 -->
                            <el-input
                                v-if="actionList[index].actionType !== '4' && actionList[index].actionType !== '3' && actionList[index].actionType !== '0' && actionList[index].actionType !== '5' && actionList[index].actionType !== ''"
                                v-model="actionList[index].actionValue" placeholder="请输入" style="width:40%;" disabled
                                @input="actionValueInput($event, index)" clearable ></el-input>
                            <!-- 第四个选择项 -->
                            <el-select
                                v-if="actionList[index].actionType === '4' && actionList[index].actionType !== '0' && actionList[index].actionType !== '5' && actionList[index].actionType !== ''"
                                v-model="actionList[index].actionValue" style="width:38%;" filterable placeholder="请选择接口"
                                disabled clearable>
                                <el-option v-for="item in actionInterface" :key="item.value" :label="item.label"
                                    :value="item.value"></el-option>
                            </el-select>
                            <!-- 删除按钮 -->
                            <el-button v-if="index != 0" style="margin-left:2px;" icon="el-icon-delete"
                                @click="delAction(index)" :disabled="onlyRead" />
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <el-button v-if="activeName === 'rule' && currentEditAtrr.ruleId" type="primary" class="addBtn"
                :disabled="true" @click="ruleConfig">配置</el-button>
            <el-button v-if="activeName === 'action' && currentEditAtrr.ruleId" type="primary" class="addBtn"
                :disabled="true" @click="addAction">添加动作</el-button>
        </el-form>
        <el-dialog title="规则配置" :close-on-click-modal="false" :visible.sync="ruleConfigDialog" width="80%">
            <rule-select style="overflow:auto;min-width: 900px;" :ruleData="ruleData"
                :setCrtOriginBizRule="setCrtOriginBizRule" :setCrtZhRule="setCrtZhRule"
                :setRuleValue="setRuleValue" disabled></rule-select>
            <div style="height: 20px;"></div>
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="规则综合描述">
                    <el-input type="textarea" disabled :rows="3" :value="crtZhRule"></el-input>
                </el-form-item>
                <el-form-item label="可执行表达式">
                    <el-input type="textarea" disabled :rows="3" :value="crtOriginBizRule"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button type="primary" @click="saveRuleConfig">保存</el-button>
                <el-button @click="ruleConfigDialog = false">重置</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import RuleSelect from "@/views/risk/risk_decision_rule/reform_test/generalCom/_components/rule-select";
import { mapGetters, mapMutations } from "vuex";

export default {
    components: {
        RuleSelect,
    },
    props: {
        saveAttr: {
            type: Function,
            required: true,
        },
        onlyRead: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            activeName: "base",
            dataList: "",
            ruleConfigDialog: false,
            ruleData: {
                rule_constraints: [],
                rule_logic: "and",
                rule_isRoot: true, //是否是第一层的数据
                functionCodeAll: "", //所有函数体代码字符串
            },
            crtZhRule: "",
            crtOriginBizRule: "",
            actionList: [
                {
                    actionType: "",
                    actionCode: "",
                    actionString: "",
                    actionStringShow: "",
                    actionName: "",
                    actionValue: "",
                    actionDataType: "",
                    inputDataItem: [], //存储函数选择的输入
                },
            ],
            rules: {
                originId: [
                    { required: true, message: "ID不能为空", trigger: "blur" },
                ],
                ruleCode: [
                    {
                        required: true,
                        message: "规则代码不能为空",
                        trigger: "blur",
                    },
                ],
                ruleName: [
                    {
                        required: true,
                        message: "规则名称不能为空",
                        trigger: "blur",
                    },
                ],
                version: [
                    {
                        required: true,
                        message: "版本号不能为空",
                        trigger: "blur",
                    },
                ],
                executableExpression: [
                    {
                        required: true,
                        message: "规则表达式不能为空",
                        trigger: "blur",
                    },
                ],
            },
            actionInterface: [],
            formulaType: [],
            actionType: [
                {
                    value: "1",
                    label: "插入",
                },
                {
                    value: "2",
                    label: "更新",
                },
                {
                    value: "3",
                    label: "删除",
                },
            ],
        };
    },
    computed: {
        ...mapGetters(["currentEditAtrr"]),
    },
    created() { },
    methods: {
        ...mapMutations(["SET_EDIT_ATTR"]),
        handleClick(tab, event) {
            if (tab.name === "action" && this.currentEditAtrr.ruleId) {
                this.getFactList();
                this.getActionList();
                this.getActionInterface();
                this.getFunctionList();
            }
        },
        openDialog() {
            this.$dataBus.bindCallBackMethod(this, this.jsonCallBack, {});
            this.$dialog.open({
                that: this,
                title: "规则代码选择",
                toRequest: {
                    url: "/views/risk/risk_decision_rule/flow_risk_decision_rule_lookup.json",
                    method: "get",
                },
                width: "80%",
            });
        },
        jsonCallBack(btnConfig, response) {
            this.SET_EDIT_ATTR({
                ...this.currentEditAtrr,
                ...response,
            });
            this.getFactList();
            this.getActionList(1);
            this.getActionInterface();
            this.getFunctionList();
            this.saveAttr();
        },
        ruleConfig() {
            this.ruleData = JSON.parse(this.currentEditAtrr.natureExpression);
            this.crtZhRule = this.currentEditAtrr.ruleContentDesc;
            this.crtOriginBizRule = this.currentEditAtrr.executableExpression;
            this.ruleConfigDialog = true;
        },
        setCrtOriginBizRule(newValue) {
            this.crtOriginBizRule = newValue;
        },
        setCrtZhRule(newValue) {
            this.crtZhRule = newValue;
        },
        setRuleValue(newValue) {
            this.ruleValue = newValue;
        },
        saveRuleConfig() {
            this.SET_EDIT_ATTR({
                ...this.currentEditAtrr,
                natureExpression: this.ruleValue,
                ruleContentDesc: this.crtZhRule,
                executableExpression: this.crtOriginBizRule,
            });
            this.saveAttr();
            this.ruleConfigDialog = false;
        },
        addAction() {
            if (!this.isCompleted()) {
                return;
            }
            this.actionList.push({
                actionType: "",
                actionCode: "",
                actionString: "",
                actionStringShow: "",
                actionName: "",
                actionValue: "",
                actionDataType: "",
            });
        },
        delAction(index) {
            this.actionList.splice(index, 1);
        },
        getFactList() {
            this.dataLeft = [];
            this.dataRight = [];
            this.rightDataLeft = [];
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
                    servicecode: "deci080101"
                })
                .then((obj) => {
                    this.dataList = obj.data;
                    this.dataLeft = obj.data;
                });
        },
        changeOperator(actionData1, index) {
            console.log("actionData", actionData1);
            actionData1.actionValue = "";
            this.actionList[index].actionDataType = "";
            this.actionList[index].actionString = "";
            this.actionList[index].actionStringShow = "";
            this.actionList[index].actionName = "";
            this.actionList[index].buttonText = "等于";
            this.actionList[index].actionValue = "";
            this.actionList[index].valueExpression = "";
            this.actionList[index].valueNatureExpress = "";
            this.actionList[index].valueType = "";
            this.actionList[index].attributeDesc = "";
            console.log("actionList", this.actionList);
        },
        //动作列表
        changeActionList(e, val, index) {
            let selctList = val.actionStringShow;
            this.actionList[index].actionDataType =
                this.getFormAmoutValidateInfo(selctList) &&
                    this.getFormAmoutValidateInfo(selctList).dataType
                    ? this.getFormAmoutValidateInfo(selctList).dataType
                    : "";
            this.actionList[index].actionString =
                this.getFormAmoutValidateInfo(selctList) &&
                    this.getFormAmoutValidateInfo(selctList).value
                    ? this.getFormAmoutValidateInfo(selctList).value
                    : "";
            this.actionList[index].actionName =
                this.getFormAmoutValidateInfo(selctList) &&
                    this.getFormAmoutValidateInfo(selctList).label
                    ? this.getFormAmoutValidateInfo(selctList).label
                    : "";
            val.actionValue = "";
            val.valueExpression = "";
            val.valueNatureExpress = "";
            val.valueType = "";
            val.attributeDesc = "";
            val.buttonText = "等于";
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
        getActionInterface() {
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
                    servicecode: "deci080104"

                })
                .then((obj) => {
                    this.actionInterface = obj.data;
                });
        },
        //设置得分公式
        setFormula(index) {
            if (this.onlyRead) {
                return;
            }
            if (this.actionList[index].actionDataType === "") {
                this.$message.error("请先选择条件后设置公式");
                return;
            }
            this.$dataBus.bindCallBackMethod(this, this.dialogCallBack, {});
            this.$dialog.open({
                that: this,
                title: "设置动作值",
                toRequest: {
                    url: "@functionSetAllOtherLayout",
                    method: "get",
                    params: {
                        title: "动作值",
                        row: this.actionList[index],
                        index,
                        dataType: this.actionList[index].actionDataType,
                    },
                },
                width: "70%",
            });
        },
        dialogCallBack(btnConfig, response) {
            this.actionList[response.index].actionValue = response.scorePoints;
            this.actionList[response.index].valueExpression =
                response.valueExpression;
            this.actionList[response.index].valueNatureExpress =
                response.valueNatureExpress;
            this.actionList[response.index].valueType = response.valueType;
            this.actionList[response.index].attributeDesc =
                response.attributeDesc;
            this.actionList[response.index].buttonText = response.scoreMoldText;
        },
        getActionList(type = undefined) {
            console.log(this.currentEditAtrr);
            if (this.currentEditAtrr.actionInfo) {
                // 臨時增加處理 type=1的時候進行接口查詢。这里适用于规则。
                if(type == 1) {
                    console.log('type == 1');
                    this.$http
                    .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
                        ruleId: this.currentEditAtrr.ruleId,
                        version: this.currentEditAtrr.version,
                        servicecode: "deci010523",
                        isList: true,
                    })
                    .then((obj) => {
                        console.log("------------------"+obj);
                        this.SET_EDIT_ATTR({
                            ...this.currentEditAtrr,
                            actionInfo: JSON.stringify(obj.data),
                        });
                        this.saveAttr();
                        this.actionList = obj.data;
                    });
                } else {
                    this.actionList = JSON.parse(this.currentEditAtrr.actionInfo);
                }
            } else {
                this.$http
                    .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
                        ruleId: this.currentEditAtrr.ruleId,
                        version: this.currentEditAtrr.version,
                        servicecode: "deci010523",
                        isList: true,
                    })
                    .then((obj) => {
                        console.log("------------------"+obj);
                        this.SET_EDIT_ATTR({
                            ...this.currentEditAtrr,
                            actionInfo: JSON.stringify(obj.data),
                        });
                        this.saveAttr();
                        this.actionList = obj.data;
                    });
            }
            if (this.actionList && this.actionList.length > 0) {
                for (let i = 0; i < this.actionList.length; i++) {
                    let tempStr = this.actionList[i].actionString.split(".");
                    this.actionList[i].actionStringShow = [
                        `${tempStr[0]}`,
                        `${tempStr[0]}.${tempStr[1]}`,
                    ];
                    if (this.actionList[i].valueNatureExpress) {
                        let jsonObj = JSON.parse(
                            this.actionList[i].valueNatureExpress
                        );
                        if (jsonObj && jsonObj.scoreMoldText) {
                            this.actionList[i].buttonText =
                                jsonObj.scoreMoldText;
                        }
                    }
                }
            }

        },
        setActionList(data) {
            if (data) {
                for (const child of data) {
                    let tempStr = child.actionString.split(".");
                    child.actionStringShow = [
                        `${tempStr[0]}`,
                        `${tempStr[0]}.${tempStr[1]}`,
                    ];
                    if (
                        child.valueNatureExpress &&
                        child.valueNatureExpress.length > 0
                    ) {
                        let jsonTwo = JSON.parse(child.valueNatureExpress);
                        console.log("jsonTwo", jsonTwo);
                        child.attributeDesc = jsonTwo.attributeDesc;
                    }
                }
                this.actionList = data;
                console.log("设置动作数据-----", this.actionList);
            }
        },
        actionValueInput(e, index) {
            let value = e;
            let actionDataType = this.actionList[index].actionDataType;
            //选项选择插入情况
            if (
                (this.actionList[index].actionType === "1" &&
                    actionDataType === "Int") ||
                (this.actionList[index].actionType === "2" &&
                    actionDataType === "Int")
            ) {
                //只能输入数字不能输入小数点
                value = value.replace(/\D/g, "");
            }
            if (
                (this.actionList[index].actionType === "1" &&
                    actionDataType === "Decimal") ||
                (this.actionList[index].actionType === "2" &&
                    actionDataType === "Decimal")
            ) {
                value = value.replace(/[^\d.]/g, "");
            }
            this.actionList[index].actionValue = value;
        },
        //判断各场景下 是否填写完成
        isCompleted() {
            let isCompleted = true;
            if (this.actionList && this.actionList.length > 0) {
                //取出最后一项检查录入情况
                let inputObj = this.actionList[this.actionList.length - 1];
                if (inputObj.actionType === '1' && inputObj.actionValue === "") {
                    this.$message.error("动作配置项有未填写完项目");
                    isCompleted = false;
                }
                if (inputObj.actionType === '2' && inputObj.actionValue === "") {
                    this.$message.error("动作配置项有未填写完项目");
                    isCompleted = false;
                }
                if (inputObj.actionType === "") {
                    this.$message.error("动作配置项有未填写完项目");
                    isCompleted = false;
                }
            }
            return isCompleted;
        },
        //获取方法名选项
        getFunctionList() {
            let params = {
                functionId: "",
                length: 100,
                start: 1,
                servicecode:
                    "deci080102",

                isList: true,
            };
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                    this.formulaType = obj.data;
                });
        },
        formValid() {
            let flag = true;
            this.$refs.form.validate((valid) => {
                flag = valid;
            });
            return flag;
        },
    },
};
</script>

<style lang="less" scoped>
/deep/ .el-tabs .el-tabs__content {
    border: 0;

    .el-tab-pane {
        margin-top: 20px;
    }
}

.form-two-column {
    padding: 0;
    position: relative;

    /deep/ .el-tabs__header {
        padding-left: 16px;
    }

    .el-tab-pane.isForm {
        display: flex;
        flex-wrap: wrap;
        padding-right: 20px;
    }

    .el-form-item {
        width: 50%;
        margin-bottom: 18px;

        .el-select,
        .el-cascader {
            width: 100%;
        }
    }

    /deep/ .el-form-item.full-row {
        width: 100%;
    }

    .el-input-group__append .el-button {
        margin: 0px -20px;
        padding: 10px 20px;
        border-radius: 0 4px 4px 0;
    }
}

.addBtn {
    position: absolute;
    top: 5px;
    right: 0;
}

.listTable {
    margin-bottom: 8px;
    margin-left: 20px;
}

.col_content {
    width: 100%;
    display: flex;
    align-items: center;
}

.buttonSet {
    font-size: 20px;
    margin-left: 10px;
    margin-right: 10px;
}
</style>
