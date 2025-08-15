<template>
    <div class="rule-box flex-box">
        <!-- <div class="title-btn">
      <el-button type="primary" size="mini" disable>规则配置
      </el-button>
        </div>-->
        <el-dropdown trigger="click" @command="handleLogic">
            <el-button type="primary" size="mini" :disabled="disabled">
                {{switchLogicName(ruleData.rule_logic)}}
                <i
                    class="el-icon-arrow-down el-icon--right"
                ></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <div style="max-height:200px; overflow:auto;white-space:nowrap;">
                    <el-dropdown-item command="and">与</el-dropdown-item>
                    <el-dropdown-item command="or">或</el-dropdown-item>
                    <el-dropdown-item command="not">非</el-dropdown-item>
                </div>
            </el-dropdown-menu>
        </el-dropdown>

        <rule-subitem>
            <rule-tree
                v-for="(item, i) in ruleData.rule_constraints"
                :key="i"
                :data="item"
                :ruleData="ruleData"
                :disabled="disabled"
            ></rule-tree>
            <rule-plus @click.native="addRule" v-if="!disabled"></rule-plus>
        </rule-subitem>
    </div>
</template>

<script>
import RuleTree from "@/views/msap/bpm/processManagement/products/node/rule/rule-tree.vue";
import RulePlus from "@/views/risk/risk_decision_rule/reform_test/generalCom/_components/rule-plus";
import RuleSubitem from "@/views/risk/risk_decision_rule/reform_test/generalCom/_components/rule-subitem";
import _ from "lodash";
const objDefault = {
    rule_uuid: null, // 条件编号
    rule_isRoot: false, //是否为分支第一项，不能删除
    rule_constraints: [], // 条件限制集合
    rule_logic: "", //用户选择与 或 设置规则
    rule_code: "", //规则代码
    rule_desc: "", //规则解释
    rule_Form: "", //规则表单数据
    policy_id: "", // 规则编号
};
export default {
    name: "RuleSelect",
    components: {
        RuleTree,
        RulePlus,
        RuleSubitem,
    },
    props: {
        setCrtOriginBizRule: {
            type: Function,
            default: null,
        },
        setCrtZhRule: {
            type: Function,
            default: null,
        },
        setRuleValue: {
            type: Function,
            default: null,
        },
        ruleData: Object, //规则设置的主要数据
        //是否可以编辑
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isCheck: false,
            isReturn: false,
        };
    },
    mounted() {
        const obj = _.merge({}, objDefault);
        obj.rule_uuid = this.$moment().format("x");
        obj.rule_isRoot = false;
        if (this.ruleData.rule_constraints.length === 0) {
            this.ruleData.rule_constraints.push(obj);
        }
        this.$bus.on("removeRule", (e) => {
            this.removeRule(e);
        });
        //注册相关监听事件
        this.$bus.on("updateData", (e) => {
            this.updateData(e);
        });
        //.log("this.$bus``````````````````", this.$bus);
        //console.log("rule-select```````disabled`", this.disabled);
    },
    beforeDestroy() {
        //console.log("注销监听事件");
        //释放相关监听事件
        // this.$bus.off('removeRule', this.removeRule);
        // this.$bus.off('updateData', this.updateData);
        this.$bus.off("removeRule");
        this.$bus.off("updateData");
    },
    created() {
      //console.log('父类传过来的数据 ---rule-select', this.ruleData);
    },
    methods: {
        switchLogicName(type) {
            switch (type) {
            case '':
                return '选择配置项'
                break;
            case 'and':
                return '<与>'
                break;
            case 'rule-set':
                return '<规则>'
                break;
            case 'or':
                return '<或>'
                break;
            case 'not':
                return '<非>'
                break;
            
            }
        },
        addRule() {
            const obj = _.merge({}, objDefault);
            obj.rule_isRoot = true;
            obj.rule_uuid = this.$moment().format("x");
            this.ruleData.rule_constraints.push(obj);
        },
        updateData(obj, arr) {
            //console.log("updateData-obj", obj);
            //console.log("updateData-arr", arr);
            console.log("规则设置有更新 ", this.ruleData);
            //转译成规则代码
            let crtOriginBizRule = this.translationItemRule(this.ruleData);
            //console.log("转译出书code", crtOriginBizRule);
            this.setCrtOriginBizRule(crtOriginBizRule);
            //转译成中文的回显
            let ruleDesc = this.translationItemRuleDesc(this.ruleData);
            console.log("转译出书code", ruleDesc);
            let functionCodeAll = this.translationItemFunctionCode(
                this.ruleData
            );
            this.ruleData.functionCodeAll = functionCodeAll;
            this.setCrtZhRule(ruleDesc);
            //转译提交的json
            this.setRuleValue(JSON.stringify(this.ruleData));
        },
        // checkVariant(obj, arr) {
        //   if (this.isCheck) return;
        //   const arrList = arr || this.data;
        //   for (let i = 0; i < arrList.length; i++) {
        //     if (
        //       obj.arr.includes(arrList[i].condition_leftExpression_variable_name) ||
        //       obj.arr.includes(arrList[i].condition_rightExpression_variable_name)
        //     ) {
        //       let tip = '';
        //       if (
        //         obj.arr.includes(arrList[i].condition_leftExpression_variable_name)
        //       ) {
        //         tip = arrList[i].condition_leftExpression_variable_name;
        //       } else if (
        //         obj.arr.includes(arrList[i].condition_rightExpression_variable_name)
        //       ) {
        //         tip = arrList[i].condition_rightExpression_variable_name;
        //       }
        //       this.$message('变量:' + tip + ' 已经被使用,当前操作不能进行!');
        //       this.isCheck = true;
        //       return;
        //     } else if (arrList[i].rule_constraints) {
        //       this.checkVariant(obj, arrList[i].rule_constraints);
        //     }
        //   }
        // },

        removeRule(obj, arr) {
            //console.log("removeRule-obj", obj);
            //console.log("removeRule-arr", arr);
            this.seachRemoveRule(this.ruleData, obj);
        },
        //通过项目的UUID来查找要删除的项目
        seachRemoveRule(array, seachObj) {
            //debugger;
            //console.log("seachRemoveRule", array, seachObj);
            if (
                array.rule_uuid === seachObj.rule_uuid &&
                array.rule_constraints.length > 0
            ) {
                //没有找到说明点击的是父项目
                this.$message.error("请先删除子项");
            }
            try {
                array.rule_constraints.forEach((item, index) => {
                    if (item.rule_constraints.length > 0) {
                        this.seachRemoveRule(item, seachObj);
                    } else {
                        //通过uuid查找要删除项目
                        if (item.rule_uuid === seachObj.rule_uuid) {
                            
                            if (
                                array.rule_constraints.length === 1 &&
                                item.rule_isRoot
                            ) {
                                // array.rule_constraints.splice(0, 1);
                                // debugger
                                this.$message.error("该项不能删除");
                            } else {
                                array.rule_constraints.splice(index, 1);
                                //如果没有子项，复位逻辑选项
                                if (array.rule_constraints.length === 0) {
                                    array.rule_logic = "";
                                    array.rule_constraints = [];
                                }
                            }
                            throw new Error("EndIterative");
                        }
                    }
                });
            } catch (e) {
                if (e.message !== "EndIterative") throw e;
            }
            this.updateData();
        },
        //逻辑选项变化激活
        handleLogic(command) {
            this.ruleData.rule_logic = command;
            this.updateData();
        },
        /**
       *  rule_uuid: null, // 条件编号
          rule_isRoot: false, //是否为分支第一项，不能删除
          rule_constraints: [], // 条件限制集合
          rule_logic: '', //用户选择与 或 设置规则
          rule_code: '', //规则代码
          rule_desc: '', //规则解释
          rule_Form: '' //规则表单数据
       */
        translationItemRule(ruleItemData) {
            let ruleCodeArray = [];
            let functionCodeAll = "";

            if (ruleItemData.rule_constraints.length > 0) {
                for (const child of ruleItemData.rule_constraints) {
                    ruleCodeArray.push(this.translationItemRule(child));
                }
            }
            if (
                ruleItemData.rule_logic === "rule-set" &&
                ruleItemData.policy_id !== ""
            ) {
                return ruleItemData.policy_id;
            }

            if (ruleCodeArray.length === 1) {
                if(ruleItemData.rule_logic === "not"){
                    return "!"+ruleCodeArray[0];
                }else{
                    return ruleCodeArray[0];
                }
            } else if (ruleCodeArray.length > 1) {
                let itemCode = "";
                for (let item of ruleCodeArray) {
                    if(ruleItemData.rule_logic === "not"){
                        itemCode = `${itemCode}${
                            ruleItemData.rule_logic === "and" ? "!" : "!"
                        }${item}`;
                    }else{
                            itemCode = `${itemCode}${item} ${
                            ruleItemData.rule_logic === "and" ? "&&" : "||"
                        } `;
                    }
                    
                }
                if(itemCode.substr(itemCode.length - 3, itemCode.length) === '&& ' || itemCode.substr(itemCode.length - 3, itemCode.length) === '|| '){
                    itemCode = itemCode.substr(0, itemCode.length - 3);
                }
                

                return `(${itemCode})`;
            } else {
                return "";
            }
        },
        //转译中文项目
        translationItemRuleDesc(ruleItemData) {
            let ruleDescArray = [];

            if (ruleItemData.rule_constraints.length > 0) {
                for (const child of ruleItemData.rule_constraints) {
                    ruleDescArray.push(this.translationItemRuleDesc(child));
                }
            }
            if (
                ruleItemData.rule_logic === "rule-set" &&
                ruleItemData.rule_desc !== ""
            ) {
                return ruleItemData.rule_desc;
            }
            if (ruleDescArray.length === 1) {
                if(ruleItemData.rule_logic === "not"){
                    return "非"+ruleDescArray[0];
                }else{
                    return ruleDescArray[0];
                }
            } else if (ruleDescArray.length > 1) {
                let itemDesc = "";
                console.log("ruleDescArray值："+ruleDescArray);
                for (let item of ruleDescArray) {
                    if(ruleItemData.rule_logic === "not"){
                        itemDesc = `${itemDesc} 非${item}   `;
                    }else{
                        itemDesc = `${itemDesc}符合规则${item} ${
                            ruleItemData.rule_logic === "and" ? "以及 " : "或者 "
                        } `;
                    }
                }
                itemDesc = itemDesc.substr(0, itemDesc.length - 4);
                
                return `(${itemDesc})`;
            } else {
                return "";
            }
        },
        translationItemFunctionCode(ruleItemData) {
            let ruleCodeArray = [];
            let functionCodeAll = "";

            if (ruleItemData.rule_constraints.length > 0) {
                for (const child of ruleItemData.rule_constraints) {
                    ruleCodeArray.push(this.translationItemFunctionCode(child));
                }
            }
            if (
                ruleItemData.rule_logic === "rule-set" &&
                ruleItemData.rule_funcitonCode !== ""
            ) {
                return ruleItemData.rule_funcitonCode;
            }
            if (ruleCodeArray.length === 1) {
                return ruleCodeArray[0];
            } else if (ruleCodeArray.length > 1) {
                for (let item of ruleCodeArray) {
                    functionCodeAll = `${functionCodeAll}${item}`;
                }
                return functionCodeAll;
            } else {
                return "";
            }
        },
    },
};
</script>

<style lang="less">
.rule-box {
    font-size: 13px;
    color: #666;
    display: flex;
    margin-bottom: 5px;

    .el-button--mini {
        padding: 7px 10px;
    }

    .el-icon-caret-bottom {
        cursor: pointer;
    }

    .rule-item {
        margin: 0 0 5px 15px;
        align-items: center;
        display: flex;
        flex: 0 1 auto;

        span.rule-variant {
            cursor: pointer;
            display: inline-block;
            margin-left: 10px;
        }

        .rule-compare,
        .rule-relation,
        .rule-action {
            display: flex;
            align-items: center;
            flex: 1 0 auto;
        }

        .el-tag {
            margin-left: 5px;
            cursor: pointer;
        }

        .el-dropdown-link {
            margin: 0 5px;
            cursor: pointer;
            color: #409eff;
        }

        .variant-style {
            color: #f60;
        }

        .rule-input.el-input {
            margin-left: 5px;
            width: 60px;

            > input.el-input__inner {
                padding: 0 5px;
            }
        }

        .rule-action-input.el-input {
            margin-left: 5px;

            > input.el-input__inner {
                padding: 0 5px;
            }
        }

        .rule-input-date.el-date-editor {
            margin-left: 5px;
            width: 135px;

            > input.el-input__inner {
                padding: 0 5px;
            }
        }
    }
}

.flex-box {
    display: flex;
    align-items: center;
}
</style>
