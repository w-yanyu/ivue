<template>
    <div>
        <el-form ref="form" :model="form" label-width="100px">
            <el-tabs type="border-card">
                    <strategy-rule
                        style="overflow:auto;min-width: 900px;"
                        :componentName="componentName"
                        :action="actions"
                        :ruleData="ruleData"
                        :setRuleValue="setRuleValue"
                        :fun-detail-list="funDetailList"
                    ></strategy-rule>
                    <div style="height: 20px;"></div>
            </el-tabs>
        </el-form>
        <div class="footDiv">
            <el-button type="primary"  @click="saveConfirm()">{{$i18ns('保存')}}</el-button>
        </div>
    </div>
</template>

<script>
import StrategyRule from "@/views/msap/bpm/processManagement/products/node/strategy-rule-select";
export default {
    name: "home",
    components: {
        StrategyRule,
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
            ruleValue: "",
            ret: "",
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
        
    },
    created() {
        let strings = Object.getOwnPropertyNames(this.cParams);
        this.insertStatus = strings.length > 2;
    },
    mounted() {
        console.log("父类带过来的数据", this.cParams);
        if (this.insertStatus) {
            let policy_rule_config = this.cParams.policy_rule_config;
            this.ruleData.policy_rule_config = policy_rule_config;
            this.ruleData.rule_isRoot = false;
            this.ruleData.rule_logic = 'and';
            // this.ruleData.rule_constraints = [{"rule_logic":"rule-set","rule_isRoot":false,"policy_rule_config":"aaaa"},{"rule_logic":"rule-set","rule_isRoot":false,"policy_rule_config":"bbb"}];
            this.ruleData.rule_constraints = [];
            let rule_constraints_json = '';

            if(policy_rule_config.indexOf("&") > -1){ // 存在多个规则
                let configArr = policy_rule_config.split("&");
                for(let i =0;i<configArr.length;i++){
                    rule_constraints_json = {};
                    this.ruleData.rule_logic = 'and';
                    rule_constraints_json.rule_isRoot = 'false';
                    rule_constraints_json.policy_rule_config = configArr[i];

                    this.ruleData.rule_constraints.push(rule_constraints_json);
                }
                
            }else if(policy_rule_config.indexOf("|") > -1){ // 存在多个规则
                let configArr = policy_rule_config.split("|");
                console.log("configArr ：", configArr);
                for(let i =0;i<configArr.length;i++){
                    console.log("次数 ：", i);
                    rule_constraints_json = {};
                    this.ruleData.rule_logic = 'or';
                    rule_constraints_json.rule_isRoot = 'false';
                    rule_constraints_json.policy_rule_config = configArr[i];
                    this.ruleData.rule_constraints.push(rule_constraints_json);
                    console.log("this.ruleData.rule_constraints ：", this.ruleData.rule_constraints);
                }
                
            }else if(policy_rule_config.indexOf("!") > -1){ 
                let configArr = policy_rule_config.split("!");
                for(let i =1;i<configArr.length;i++){
                    rule_constraints_json = {};
                    this.ruleData.rule_logic = 'not';
                    rule_constraints_json.rule_isRoot = 'false';
                    rule_constraints_json.policy_rule_config = configArr[i];

                    this.ruleData.rule_constraints.push(rule_constraints_json);
                }
                
            }else{  // 为空或者只有一个规则
                rule_constraints_json = {};
                rule_constraints_json.rule_logic = 'and';
                rule_constraints_json.rule_isRoot = 'false';
                rule_constraints_json.policy_rule_config = policy_rule_config;

                this.ruleData.rule_constraints.push(rule_constraints_json);
            }
            this.ruleData.appId = this.cParams.appId;
            this.ruleData.wf_task_no = this.cParams.wf_task_no;
            this.ruleData.bpm_version = this.cParams.bpm_version;
            this.ruleData.route_id = this.cParams.route_id;
            this.ruleData.task_define_id = this.cParams.task_define_id;
            this.ruleData.wf_prod_no = this.cParams.wf_prod_no;
            console.log("insertStatus ：", this.ruleData);
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

        saveConfirm() {
            let that = this;
            // let userInfo = JSON.stringify();
            console.log("保存按钮", this.ruleData);
            let flag = '';
            if(this.ruleData.rule_logic == 'and'){
                flag = '&';
            }else if(this.ruleData.rule_logic == 'or'){
                flag = '|';
            }else if(this.ruleData.rule_logic == 'not'){
                flag = '!';
            }
            let ret ='';
            for(let i =0;i<this.ruleData.rule_constraints.length;i++){
                let item = this.ruleData.rule_constraints[i];
                if(ret == ''){
                    ret = ret + item.policy_id;
                }else{
                    ret = ret + flag + item.policy_id;
                }
            }
            if(flag == '!'){
                ret = flag + ret;
            }
            let allData = [];
            let obj = {
              route_id: this.cParams.route_id,
              task_define_id : this.cParams.task_define_id,
              wf_prod_no : this.cParams.wf_prod_no,
              //policy_rule_config: this.cParams.policy_rule_config,
              policy_rule_config: ret,
              is_def_flow: this.cParams.is_def_flow,
              check_seq: this.cParams.check_seq
            }
            allData.push(obj)
            var params = {
                wf_task_no: this.cParams.wf_task_no,
                bpm_version: this.cParams.bpm_version,
                servicecode: "bpm4011",
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

            let userInfo = JSON.parse(localStorage.getItem("user_info"));

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

                servicecode: "",
                appId: "this.cParams.appId",
            };
            //决策规则更新
            this.$http
                .invokeAPI("/SUMP/riskController/riskCall", "POST", params)
                .then((obj) => {
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
            let jsonFormData =
                this.$refs.riskDecisionRuleAdd.submitriskDecisionRuleAdd();
            let userInfo = JSON.parse(localStorage.getItem("user_info"));
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
        
        //关闭对话框
        close() {
            this.$dialog.close();
        },
        //重置输入
        reset() {
            let that = this;
            //{{$i18ns('规则基本信息')}}
            that.$refs.riskDecisionRuleAdd.resetInput();
            that.pipe = {
                type: "all_any",
                condition: "all",
                children: [],
            };
        },
        closeDialog(item) {
            let that = this;
            that.dialogVisible = false;
        },

        changeLeft(val) {
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
                        
                    })
                    .catch((reg) => {});
            }
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
