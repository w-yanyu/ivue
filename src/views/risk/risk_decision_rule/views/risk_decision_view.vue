<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label">
                        <i class="el-icon-date"></i> 规则基本信息
                    </span>
                    <to-json :params="cParams" :toUrl="viewUrl" @jsonCallBack="jsonCallBack"></to-json>
                </el-tab-pane>
                <el-tab-pane label="规则配置">
                    <!--     <biz-rule-all-any :normal="true" :disabled="false" :pipe="pipe" ref="BizRuleAllAny"></biz-rule-all-any>
                    <div style="height: 20px;"></div>-->
                    <rule-select
                        style="overflow:auto;min-width: 900px;"
                        :componentName="componentName"
                        :action="actions"
                        :ruleData="ruleData"
                        :setCrtOriginBizRule="setCrtOriginBizRule"
                        :setCrtZhRule="setCrtZhRule"
                        :setRuleValue="setRuleValue"
                        :fun-detail-list="funDetailList"
                        :disabled="true"
                    ></rule-select>
                    <div style="height: 20px;"></div>
                    <el-form-item label="规则描述" label-width="120px">
                        <el-input
                            type="textarea"
                            :disabled="true"
                            :value="crtZhRule"
                            spellcheck="false"
                        ></el-input>
                    </el-form-item>
                    <el-form-item label="可执行表达式" label-width="120px">
                        <el-input
                            ref="input_expression"
                            type="textarea"
                            label
                            :disabled="true"
                            :value="crtOriginBizRule"
                            spellcheck="false"
                        ></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label">动作配置</span>

                    <ActionConfiguration
                        ref="ActionConfiguration"
                        isDisable="true"
                        :cParentParams="cParentParams"
                    ></ActionConfiguration>
                </el-tab-pane>
            </el-tabs>
        </el-form>
        <div class="footDiv" v-if="false">
            <el-button type="primary" @click="close()">取消</el-button>
            <el-button type="primary" v-if="insertStatus" @click="saveConfirm('update')">保存</el-button>
            <el-button type="primary" v-if="!insertStatus" @click="saveConfirm('add')">保存</el-button>
        </div>
    </div>
</template>

<script>
import ActionConfiguration from "@/components/ActionConfiguration.vue";
import RuleSelect from "@/views/risk/risk_decision_rule/reform_test/generalCom/_components/rule-select";

export default {
    name: "home",
    components: {
        BizRuleAllAny: () => import("@/components/BizRule/index.vue"),
        ActionConfiguration,
        RuleSelect,
    },
    props: {
        cMeta: Object, //本页面模板json数据Layout对象
        cParentMeta: Object, //父页面模板json数据Layout对象
        cParentParams: Object, //父页面自定义参数与内置参数
        cParentScope: Object, //父页面每块区域业务数据
    },
    data() {
        return {
            dataList: "",
            form: {
                actionList: [
                    {
                        actionType: "",
                        actionCode: "",
                        actionString: "",
                        actionName: "",
                        actionValue: "",
                        actionDataType: "",
                    },
                ],
            },
            actionType: [
                {
                    value: 0,
                    label: "不设置",
                },
                {
                    value: 1,
                    label: "插入",
                },
                {
                    value: 2,
                    label: "更新",
                },
                {
                    value: 3,
                    label: "删除",
                },
                {
                    value: 4,
                    label: "接口调用",
                },
            ],
            actionInterface: [],
            insertStatus: "",
            params: {},
            viewUrl:
                "/views/risk/risk_decision_rule/risk_decision_rule_view.json",
            cParams: this.cParentParams,
            cMeta: this.cMeta,
            dialogVisible: false,
            ruleData: {
                rule_constraints: [],
                rule_logic: "and",
                rule_isRoot: true, //是否是第一层的数据
                functionCodeAll: "", //所有函数体代码字符串
            },
            // pipe: {
            //   type: 'all_any',
            //   condition: 'all',
            //   children: [],
            //   isRoot: true,
            //   leftList: ''
            // },
        };
    },
    //监听计算生命周期函数
    computed: {
        // fetch() {
        //   location.reload();
        // },
        //将规则设置类转译成规则自然语言表达式 公式+中文
        // ruleValue() {
        //   console.log('提交 将规则设置类转译成规则自然语言表达式 规则设置类---------------', this.pipe);
        //   return JSON.stringify(BizRuleAdapter.cvtCustom2Origin(this.pipe));
        // },
        // // 将规则设置类转译成规则描述
        // crtZhRule() {
        //   console.log('将规则设置类转译成规则描述 规则设置类---------------', this.pipe);
        //   return JSON.stringify(BizRuleAdapter.cvtZhRule(this.pipe));
        // },
        // //将规则设置类转译成规则表达式
        // crtOriginBizRule() {
        //   console.log('将规则设置类转译成规则表达式 规则设置类---------------', this.pipe);
        //   return BizRuleAdapter.cvtRule(this.pipe);
        // },
    },
    created() {
        console.log("cParams", this.cParams);
        let strings = Object.getOwnPropertyNames(this.cParams);
        this.insertStatus = strings.length > 2;
    },
    mounted() {
        this.getFactList();
        this.getActionList();
        this.getActionInterface();
        if (this.insertStatus) {
            let tempObj = JSON.stringify(this.cParams.natureExpression);
            let jsonParse = JSON.parse(tempObj);
            let jsonTwo = JSON.parse(jsonParse);
            this.ruleData = jsonTwo;
            console.log("created----this.ruleData", this.ruleData);
            console.log("obj.leftType===", this.cParams.natureExpression);
            // this.pipe = BizRuleAdapter.cvtOrigin2Custom(jsonTwo)
            // this. getActionList();
            this.crtZhRule = this.cParams.ruleContentDesc;
            this.crtOriginBizRule = this.cParams.displayExpression;
        }
    },
    methods: {
        showAddModal() {
            this.status = "0";
            this.dialogVisible = true;
            if (this.$refs.formValidate) {
                this.$refs.formValidate.resetFields();
            }
            this.options = [
                {
                    children: [],
                },
            ];
            this.editModel = true;
        },
        addAction() {
            this.form.actionList.push({});
        },
        saveConfirm(type) {
            let that = this;
            console.log("保存按钮的输入完成判断", that.$refs);
            let BizRuleAllAny = that.$refs.BizRuleAllAny;
            if (!BizRuleAllAny.isCompleted()) {
                return;
            }

            if (type) {
                if (type === "update") {
                    this.updateRule();
                } else if (type === "add") {
                    this.addRule();
                } else if (type === "version") {
                    this.newVersion();
                }
            }
        },
        updateRule() {
            var jsonFormData = this.$dataBus.getCurrentFormData(this);
            var params = {
                ruleId: jsonFormData.ruleId,
                ruleName: jsonFormData.ruleName,
                ruleCode: jsonFormData.ruleCode,
                ruleType: jsonFormData.ruleType,
                description: jsonFormData.description,
                createUser: "admin",
                natureExpression: this.ruleValue,
                executableExpression: this.crtOriginBizRule,
                ruleContentDesc: this.crtZhRule,
                riskDecisionActionList: this.form.actionList,
                servicecode:
                    "risk-management-service/risk-decision-rule/update",
                appId: "risk-management-service",
            };
            //决策规则更新
            this.$http
                .invokeAPI("/SUMP/riskController/riskCall", "POST", params)
                .then((obj) => {
                    console.log("dgz_add_new", params);
                    this.$message({
                        message: "更新成功",
                        type: "success",
                    });
                    this.$dataBus.doCallBack(this, params);
                })
                .catch((res) => {});
        },
        delAction(index) {
            this.form.actionList.splice(index, 1);
        },
        addRule() {
            var jsonFormData = this.$dataBus.getCurrentFormData(this);
            let userInfo = JSON.parse(localStorage.getItem("user_info"));
            var params = {
                ruleId: jsonFormData.ruleId,
                ruleName: jsonFormData.ruleName,
                ruleCode: jsonFormData.ruleCode,
                ruleType: jsonFormData.ruleType,
                description: jsonFormData.description,
                createUser: userInfo.userCode,
                updateUser: userInfo.userCode,
                natureExpression: this.ruleValue,
                executableExpression: this.crtOriginBizRule,
                ruleContentDesc: this.crtZhRule,
                riskDecisionActionList: this.form.actionList,
                servicecode: "risk-management-service/risk-decision-rule/add",
                appId: "risk-management-service",
            };
            this.$http
                .invokeAPI("/SUMP/riskController/riskCall", "POST", params)
                .then((obj) => {
                    this.$message({
                        message: "新增成功",
                        type: "success",
                    });
                    // this.$dialog.close();
                    // this.fetch(true)
                    this.$dataBus.doCallBack(this, params);
                })
                .catch((res) => {
                    this.$message.error("新增失败");
                });
        },
        jsonCallBack(data) {
            console.log(data + "json模板回调回来的数据");
        },
        getFactList() {
            this.dataLeft = [];
            this.dataRight = [];
            this.rightDataLeft = [];
            //请求评分属性选择项目
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
                   servicecode:"deci080101"
                })
                .then((obj) => {
                    console.log("请求评分属性选择项目回调", obj);
                    this.dataList = obj.data;
                    this.dataLeft = obj.data;
                })
                .catch((reg) => {});
        },
        //动作列表
        changeActionList(val, index) {
            console.log("changeActionList(val)", val, index);
            var selctList = val.actionString;
            this.form.actionList[index].actionDataType =
                this.getFormAmoutValidateInfo(selctList) &&
                this.getFormAmoutValidateInfo(selctList).dataType
                    ? this.getFormAmoutValidateInfo(selctList).dataType
                    : "";
            this.form.actionList[index].actionString =
                this.getFormAmoutValidateInfo(selctList) &&
                this.getFormAmoutValidateInfo(selctList).value
                    ? this.getFormAmoutValidateInfo(selctList).value
                    : "";
            this.form.actionList[index].actionName =
                this.getFormAmoutValidateInfo(selctList) &&
                this.getFormAmoutValidateInfo(selctList).label
                    ? this.getFormAmoutValidateInfo(selctList).label
                    : "";
        },
        changeLeft(val) {
            console.log("changeLeft(val)", val);
            this.form.ruleLeftDataType =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).dataType
                    ? this.getFormAmoutValidateInfo(val).dataType
                    : "";
            this.form.ruleLeft =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).value
                    ? this.getFormAmoutValidateInfo(val).value
                    : "";
            this.form.ruleLeftName =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).label
                    ? this.getFormAmoutValidateInfo(val).label
                    : "";
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
                })
                .catch((reg) => {});
        },
        getActionList() {
            console.log("getActionList", this.cParams);
            var jsonFormData = this.cParams;
            let params = {
                ruleId: jsonFormData.ruleId,
                servicecode:
                    "deci010519",
                
                isList: true,
            };
            if (jsonFormData.ruleId) {
                this.$http
                    .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                    .then((obj) => {
                        this.form.actionList = obj.data;
                    })
                    .catch((reg) => {});
            }
        },
        //关闭对话框
        close() {
            this.$dialog.close();
        },
    },
};
</script>
<style lang="css" scoped>
.footDiv {
    position: absolute;
    right: 30px;
    bottom: 14px;
}
</style>
