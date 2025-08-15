<template>
    <div>
        <el-form ref="form" :model="form" label-width="100px">
            <rule-select
                style="overflow:auto;min-width: 900px;"
                :ruleData="ruleData"
                :filterable="true"
                :conditionsList="conditionsList"
                :disabled="disabled"
                :isEdit="isEdit"
            ></rule-select>
            <div style="height: 20px;"></div>

            <el-form-item label="可执行表达式">
                <el-input
                    ref="input_expression"
                    type="textarea"
                    label
                    :disabled="disabled"
                    :value="ruleData.executeExpressShow"
                    spellcheck="false"
                    placeholder
                    resize="none"
                    rows="6"
                    class="input_expression"
                ></el-input>
            </el-form-item>
        </el-form>

        <div class="footDiv">
            <el-button type="primary" v-if="!isEdit && !disabled" @click="saveConfirm('add')">保存</el-button>
            <el-button type="primary" v-if="isEdit && !disabled" @click="saveConfirm('update')">保存</el-button>
            <!--  <el-button @click="close()">取消</el-button> -->
            <el-button v-if="!disabled" @click="reset()">重置</el-button>
        </div>
    </div>
</template>

<script>
import RuleSelect from "@/views/risk/risk_score_card/simple_score_card_remould/_components/score_card_select";

export default {
    name: "home",
    components: {
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
            params: {},
            cParams: this.cParentParams.cParentParams,
            cMeta: this.cMeta,
            crtZhRule: "",
            crtOriginBizRule: "", //回显的表达式
            ruleValue: "",
            ruleData: {
                executeExpressShow: " if(){} \n else{}", //回显表达式
                executeExpress: "", //规则转译表达式上传后台表达式
                executeExpressDesc: "", //中文描述（暂时没写）
                conditionValueShow: "", //回显条件选择值
                conditionValue: "", //条件选择值
                conditionDesc: "", //条件选择后的转译解释
                conditionDataType: "", //属性数据类型
                scoreAttributePercent: "1", //权重
                functionCodeAll: "", //所有函数体代码字符串

                ifItem: {
                    itemExecuteExpress: "", //规则转译表达式上传后台表达式
                    itemExecuteExpressDesc: "", //中文描述（暂时没写）
                    executeFunctionCode: "", //可执行的方法
                    executeExpress: "", //可执行表达式
                    executeExpressDesc: "", //可执行表达式中文描述
                    executeExpressNature: "", //规则条件的json字段
                    actionValue: "", //分值 表达式
                    valueFunctionCode: "", //得分函数方法
                    valueExpression: "", // //得分表达式后台用  方法+表达式
                    valueNatureExpress: "", //上传json
                    valueType: "", //数据类型
                    attributeDesc: "", //关联选择解释
                    buttonText: "", //按钮文本
                },
                elseIfArray: [],
                elseItem: {
                    itemExecuteExpress: "", //规则转译表达式上传后台表达式
                    itemExecuteExpressDesc: "", //中文描述（暂时没写）
                    valueFunctionCode: "", //得分函数方法
                    actionValue: "", //分值 表达式
                    valueExpression: "", //得分表达式后台用  方法+表达式
                    valueNatureExpress: "", //上传json
                    valueType: "", //数据类型
                    attributeDesc: "", //关联选择解释
                    buttonText: "", //按钮文本
                },
            },
            conditionsList: [], //联动条件选择选项字典
            disabled: false, //是否禁止编辑
            isEdit: false, //编辑模式下关联选择不可修改
        };
    },
    computed: {},
    created() {
        console.log(
            "simple_score_card_dialog父类穿过来的数据",
            this.cParentParams
        );
        if (this.cParentParams.executeExpressNature.length > 0) {
            let jsonRule = JSON.parse(this.cParentParams.executeExpressNature);
            if (jsonRule) this.ruleData = jsonRule;
        }

        switch (this.cParentParams.type) {
            case "add":
                this.isEdit = false;
                break;
            case "edit":
                this.isEdit = true;
                break;
            case "view":
                this.disabled = true;
                break;
        }
        console.log(" this.disabled=======", this.disabled);
        console.log(" this.isEdit=======", this.isEdit);
    },
    mounted() {
        this.getConditionsList();
    },
    beforeDestroy() {},
    methods: {
        saveConfirm(type) {
            let that = this;
            if (!that.isCompleted()) {
                return;
            }
            console.log("要提交的jsonFormData===", that.ruleData);
            let userInfo = JSON.parse(localStorage.getItem("user_info"));
            if (type === "update") {
                this.updateRule(that, userInfo);
            } else if (type === "add") {
                this.addRule(that, userInfo);
            } else {
            }
        },
        //deci020110->deci020213
        addRule(that, userInfo) {
            let params = {
                scoreCardCode: that.cParams.scoreCardCode, //评分卡的代码（上一个页面带过来的）
                scoreAttribute: that.ruleData.conditionValue, //属性
                scoreAttributeName: that.ruleData.conditionDesc, //属性中文名称
                scoreAttributeDataType: that.ruleData.conditionDataType, //属性类型
                scoreAttributePercent: that.ruleData.scoreAttributePercent, //权重
                executeExpress: that.ruleData.executeExpress, //规则转译表达式
                executeExpressDesc: that.ruleData.executeExpressDesc, //中文描述（暂时没写）
                executeExpressNature: JSON.stringify(that.ruleData), //你的json数据，用于回显使用
                totalExecType: "", //总分计算类型
                createUser: userInfo.userCode, //创建人
                updateUser: userInfo.userCode, //最后修改人
                servicecode: "deci020213"
            };
            that.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
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
         //deci020110->deci020213
        updateRule(that, userInfo) {
            console.log(that.cParentParams);
            console.log(that.cParams);
            let params = {
                scoreRuleId: that.cParentParams.row.scoreRuleId, //评分卡规则Id
                scoreCardCode: that.cParams.scoreCardCode, //评分卡的代码（上一个页面带过来的）
                scoreAttribute: that.ruleData.conditionValue, //属性
                scoreAttributeName: that.ruleData.conditionDesc, //属性中文名称
                scoreAttributeDataType: that.ruleData.conditionDataType, //属性类型
                scoreAttributePercent: that.ruleData.scoreAttributePercent, //权重
                executeExpress: that.ruleData.executeExpress, //规则转译表达式
                executeExpressDesc: that.ruleData.executeExpressDesc, //中文描述
                executeExpressNature: JSON.stringify(that.ruleData), //json数据，用于回显
                updateUser: userInfo.userCode, //最后修改人
                servicecode: "deci020213"
               
            };
            that.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
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
        isCompleted() {
            let that = this;
            let isCompleted = true;

            if (that.ruleData.conditionValue === "") {
                that.$message.error("请选择事实属性");
                isCompleted = false;
            } else if (
                that.ruleData.ifItem.executeExpress === "" ||
                that.ruleData.ifItem.actionValue === ""
            ) {
                that.$message.error("请设置if选项的内容");
                isCompleted = false;
            } else if (that.ruleData.elseIfArray.length > 0) {
                for (const child of this.ruleData.elseIfArray) {
                    if (
                        child.executeExpress === "" ||
                        child.actionValue === ""
                    ) {
                        that.$message.error("请设置else if选项的内容");
                        isCompleted = false;
                        break;
                    }
                }
            } else if (that.ruleData.elseItem.actionValue === "") {
                that.$message.error("请设置else选项的内容");
                isCompleted = false;
            }

            return isCompleted;
        },

        //关闭对话框
        close() {
            console.log("调用关闭对话框");
            this.$dialog.close();
        },
        //重置输入
        reset() {
            let that = this;
            that.ruleData = {
                conditionValueShow: "", //回显条件选择值
                conditionValue: "", //条件选择值
                conditionDesc: "", //条件选择后的转译解释
                conditionDataType: "", //属性数据类型
                scoreAttributePercent: "1", //权重
                functionCodeAll: "", //所有函数体代码字符串

                ifItem: {
                    executeFunctionCode: "", //可执行的方法
                    executeExpress: "", //可执行表达式
                    executeExpressDesc: "", //可执行表达式中文描述
                    executeExpressNature: "", //规则条件的json字段
                    actionValue: "", //分值 表达式
                    valueFunctionCode: "", //得分函数方法
                    valueExpression: "", // //得分表达式后台用  方法+表达式
                    valueNatureExpress: "", //上传json
                    valueType: "", //数据类型
                    attributeDesc: "", //关联选择解释
                    buttonText: "", //按钮文本
                },
                elseIfArray: [],
                elseItem: {
                    valueFunctionCode: "", //得分函数方法
                    actionValue: "", //分值 表达式
                    valueExpression: "", //得分表达式后台用  方法+表达式
                    valueNatureExpress: "", //上传json
                    valueType: "", //数据类型
                    attributeDesc: "", //关联选择解释
                    buttonText: "", //按钮文本
                },
            };
        },
        //初始化条件选择选项字典
        getConditionsList() {
            this.conditionsList = [];
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
                   servicecode:"deci080101"
                })
                .then((obj) => {
                    console.log("获取联动条件选择选项字典回调", obj.data);
                    this.conditionsList = obj.data;
                })
                .catch((reg) => {});
        },
        //设置规则转译内容
        setCrtOriginBizRule(newValue) {
            this.crtOriginBizRule = newValue;
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

.input_expression {
    height: 100%;
    margin-bottom: 20px;
}
</style>
