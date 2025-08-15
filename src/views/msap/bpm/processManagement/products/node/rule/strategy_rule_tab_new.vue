<template>
    <div>
        <el-form ref="form" :model="form" label-width="100px">
            <el-tabs type="border-card">
                <el-tab-pane :label="$i18ns('规则配置')">
                    <rule-select
                        style="overflow:auto;min-width: 900px;"
                        :componentName="componentName"
                        :action="actions"
                        :ruleData="ruleData"
                        :setCrtOriginBizRule="setCrtOriginBizRule"
                        :setCrtZhRule="setCrtZhRule"
                        :setRuleValue="setRuleValue"
                        :fun-detail-list="funDetailList"
                    ></rule-select>
                    <el-form-item :label="$i18ns('规则综合描述')">
                        <el-input
                            type="textarea"
                            :disabled="false"
                            :value="crtZhRule"
                            spellcheck="false"
                            placeholder
                        ></el-input>
                    </el-form-item>
                    <!-- <el-form-item :label="$i18ns('可执行表达式')">
                        <el-input
                            ref="input_expression"
                            type="textarea"
                            label
                            :disabled="false"
                            :value="crtOriginBizRule"
                            spellcheck="false"
                            placeholder
                    ></el-input>
                    </el-form-item> -->
                </el-tab-pane>
            </el-tabs>
        </el-form>
        <div class="footDiv">
            <el-button type="primary"  @click="save()">{{$i18ns('保存')}}</el-button>
        </div>
    </div>
</template>

<script>
import ActionConfiguration from "@/components/ActionConfiguration.vue";
import RuleSelect from "@/views/msap/bpm/processManagement/products/node/rule/rule-select.vue";

export default {
    name: "home",
    components: {
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
            insertStatus: "",
            params: {},
            cParams: this.cParentParams,
            cMeta: this.cMeta,
            dialogVisible: false,
            crtZhRule: "",
            crtOriginBizRule: "",
            ruleValue: "",
            ruleData: {
                rule_constraints: [],
                rule_logic: "and",
                rule_isRoot: true, //是否是第一层的数据
                functionCodeAll: "", //所有函数体代码字符串
                policy_rule_config: "",
                appId: "",
                wf_task_no: "",
                bpm_version: "",
                route_id: "",
                task_define_id: "",
                wf_prod_no: "",
            },
        };
    },
    computed: {
        //提交json格式化
        // ruleValue() {
        //   console.log('提交前json格式化---------------', this.pipe);
        //   return JSON.stringify(BizRuleAdapter.cvtCustom2Origin(this.pipe));
        // },
        // // 规则描述
        // crtZhRule() {
        //   console.log('规则描述---------------', this.pipe);
        //   // return JSON.stringify(BizRuleAdapter.cvtZhRule(this.pipe));
        //   return BizRuleAdapter.cvtZhRule(this.pipe);
        // },
        // //规则表达式
        // crtOriginBizRule() {
        //   console.log('规则表达式---------------', this.pipe);
        //   return BizRuleAdapter.cvtRule(this.pipe);
        // },
    },
    created() {
        console.log("cParams", this.cParams);
        let strings = Object.getOwnPropertyNames(this.cParams);
        this.insertStatus = strings.length > 2;
        this.ruleData.appId = this.cParams.appId;
        this.ruleData.wf_task_no = this.cParams.wf_task_no;
        this.ruleData.bpm_version = this.cParams.bpm_version;
        this.ruleData.task_define_id = this.cParams.task_define_id;
        this.ruleData.route_id = this.cParams.route_id;
        this.ruleData.wf_prod_no = this.cParams.wf_prod_no;
    },
    mounted() {
        console.log("父类带过来的数据", this.cParams);
        // this.getFactList();
        if (this.insertStatus) {
            let tempObj = JSON.stringify(this.cParams.natureExpression);
            let jsonParse = JSON.parse(tempObj);
            let jsonTwo = JSON.parse(jsonParse);
            this.ruleData = jsonTwo;
            //console.log("created----this.ruleData", this.ruleData);
            //console.log("obj.leftType===", this.cParams.natureExpression);
            this.ruleData.appId = this.cParams.appId;
            this.ruleData.wf_task_no = this.cParams.wf_task_no;
            this.ruleData.bpm_version = this.cParams.bpm_version;
            this.ruleData.task_define_id = this.cParams.task_define_id;
            this.ruleData.route_id = this.cParams.route_id;
            this.ruleData.wf_prod_no = this.cParams.wf_prod_no;
            // this.pipe = BizRuleAdapter.cvtOrigin2Custom(jsonTwo)
            // this. getActionList();
            this.crtZhRule = this.cParams.rule_desc;
            this.ruleValue = this.cParams.natureExpression;
            this.crtOriginBizRule = this.cParams.policy_rule_config;
        }
    },
    beforeDestroy() {},
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

        saveConfirm(type) {
            let that = this;
            // let userInfo = JSON.stringify();
            console.log("保存按钮的输入完成判断", that.$refs);
            
            // let BizRuleAllAny = that.$refs.BizRuleAllAny;
            let ActionConfiguration = that.$refs.ActionConfiguration;
             console.log("ActionConfiguration -- ", ActionConfiguration);
            // let riskDecisionRuleAdd = that.$refs.riskDecisionRuleAdd;
            // if (!that.insertStatus) {
            //   if (!riskDecisionRuleAdd.isCompleted()) {
            //     return;
            //   }
            // }

            // if (!BizRuleAllAny.isCompleted()) {
            //   return;
            // }
            //if (!ActionConfiguration.isCompleted()) {
            //    return;
            //}
            // if (BizRuleAllAny.isRuleEmpty(that.pipe)) {
            //   return
            // }

            if (type) {
                 console.log("type -- ", type);
                if (type === "update") {
                    this.updateRule();
                } else if (type === "add") {
                    this.addRule();
                } else if (type === "version") {
                    this.newVersion();
                }
            }
        },
        save() {
            let that = this;
            // let userInfo = JSON.stringify();
            console.log("保存按钮 ", this.ruleData);
            let ret = this.crtOriginBizRule;
            console.log("保存按钮", ret);
            console.log("保存按钮this.ruleValue ", this.ruleValue);
            let allData = [];
            let obj = {
              route_id: this.cParams.route_id,
              task_define_id : this.cParams.task_define_id,
              wf_prod_no : this.cParams.wf_prod_no,
              //policy_rule_config: this.cParams.policy_rule_config,
              policy_rule_config: ret,
              is_def_flow: this.cParams.is_def_flow,
              check_seq: this.cParams.check_seq,
              natureExpression: this.ruleValue,
              rule_desc: this.crtZhRule,
              bpm_version: this.cParams.bpm_version,
              wf_task_no: this.cParams.wf_task_no,
            }
            console.log("保存按钮 obj", obj);
            allData.push(obj)
            console.log("保存按钮 allData", allData);
            var params = {
                wf_task_no: this.cParams.wf_task_no,
                bpm_version: this.cParams.bpm_version,
                servicecode: "bpm4027",
                appId: this.cParams.appId,
                allData: allData,
                route_id: this.cParams.route_id,
                policy_rule_config: ret,
                is_def_flow: this.cParams.is_def_flow,
                check_seq: this.cParams.check_seq,
                wf_prod_no: this.cParams.wf_prod_no,
                task_define_id: this.cParams.task_define_id,
            };
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                    this.$message({
                        message: "更新成功",
                        type: "success",
                    });
                    //console.log(params)
                    // {policy_rule_config: "s001"}
                    params.policy_rule_config = ret;
                    params.rule_desc=this.crtZhRule;
                    params.natureExpression = this.ruleValue;
                    //console.log(params)
                    this.$dataBus.doCallBack(this, params);

//                    window.parent.location.reload();          
//                    var index = parent.$layer.getFrameIndex(window.name);
//                    parent.$layer.close(index);
                })
                .catch((res) => {});



        },
        updateRule() {
            var jsonFormData = this.$dataBus.getCurrentFormData(this);
            let actionList = this.$refs.ActionConfiguration.submitActionList();
            let userInfo = JSON.parse(localStorage.getItem("user_info"));
            if (actionList) {
                for (const child of actionList) {
                    child["createUser"] = userInfo.userCode;
                    child["updateUser"] = userInfo.userCode;
                }
            }
            console.log("updateRule userCode", userInfo);
            console.log("要提交的actionList===", actionList);
            console.log("要提交的jsonFormData===", jsonFormData);
            console.log("要提交的data", this);
            var params = {
                ruleId: jsonFormData.ruleId,
                ruleName: jsonFormData.ruleName,
                ruleCode: jsonFormData.ruleCode,
                ruleType: jsonFormData.ruleType,
                ruleVersion: jsonFormData.ruleVersion,
                description: jsonFormData.description,
                groupIds: jsonFormData.groupIds,
                ruleGrade: jsonFormData.ruleGrade,
                createUser: userInfo.userCode,
                updateUser: userInfo.userCode,
                natureExpression: this.ruleValue,
                executableExpression:
                    this.ruleData.functionCodeAll === ""
                        ? `${this.crtOriginBizRule}`
                        : `${this.ruleData.functionCodeAll} ${this.crtOriginBizRule}`,
                displayExpression: this.crtOriginBizRule,
                ruleContentDesc: this.crtZhRule,
                riskDecisionActionList: actionList,
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

        addRule() {
            // var jsonFormData = this.$dataBus.getCurrentFormData(this)
            let actionList = this.$refs.ActionConfiguration.submitActionList();
            // let jsonFormData =
            //    this.$refs.riskDecisionRuleAdd.submitriskDecisionRuleAdd();
            let userInfo = JSON.parse(localStorage.getItem("user_info"));
            if (actionList) {
                for (const child of actionList) {
                    child["createUser"] = userInfo.userCode;
                    child["updateUser"] = userInfo.userCode;
                }
            }
            console.log("addRule userCode", userInfo);
            console.log("要提交的actionList===", actionList);
            console.log("要提交的jsonFormData===", jsonFormData);
            let params = {
                ruleId: jsonFormData.ruleId,
                ruleName: jsonFormData.ruleName,
                ruleCode: jsonFormData.ruleCode,
                ruleType: jsonFormData.ruleType,
                ruleGrade: jsonFormData.ruleGrade,
                description: jsonFormData.description,
                createUser: userInfo.userCode,
                updateUser: userInfo.userCode,
                groupIds: jsonFormData.groupIds,
                natureExpression: this.ruleValue,
                executableExpression:
                    this.ruleData.functionCodeAll + this.crtOriginBizRule,
                displayExpression: this.crtOriginBizRule,
                ruleContentDesc: this.crtZhRule,
                riskDecisionActionList: actionList,
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
        // jsonCallBack(data) {
        //   let that = this;
        //   console.log("json模板回调回来的数据", data);
        //   let riskDecisionRuleAdd = that.$refs.riskDecisionRuleAdd;
        //   riskDecisionRuleAdd.setRuleGroupSelect(data);
        // },
        // openDialog() {
        //   let that = this;
        //   that.dialogVisible = true;
        // },
        //关闭对话框
        close() {
            console.log("调用关闭对话框");
            this.$dialog.close();
        },
        //重置输入
        reset() {
            let that = this;
            //{{$i18ns('规则基本信息')}}
            that.$refs.riskDecisionRuleAdd.resetInput();
            that.$refs.ActionConfiguration.resetInput();
            that.pipe = {
                type: "all_any",
                condition: "all",
                children: [],
            };
        },
        closeDialog(item) {
            let that = this;
            that.dialogVisible = false;
            console.log("closeDialogitem", item);
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
        getActionList() {
            let that = this;
            console.log("getActionList", this.cParentParams);
            var jsonFormData = this.cParentParams;
            let params = {
                ruleId: jsonFormData.ruleId,
                servicecode:
                    "risk-management-service/risk-decision-action/select-rule-id",
                appId: "risk-management-service",
                isList: true,
            };
            if (jsonFormData.ruleId) {
                that.$http
                    .invokeAPI("/SUMP/riskController/riskCall", "POST", params)
                    .then((obj) => {
                        that.$refs.actionConfiguration.setActionList(obj.data);
                        console.log("回调拿到 getActionList", obj.data);
                    })
                    .catch((reg) => {});
            }
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
