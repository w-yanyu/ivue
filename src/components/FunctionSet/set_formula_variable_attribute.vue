<template>
    <div class="div">
        <!-- <span class="params_code">{{cParentParams.paramsCode}} :</span> -->
        <el-cascader
            ref="cascaderSet"
            :disabled="disabled"
            v-model="cParentParams.attribute"
            v-if="ruleForm.inputType === 'select' "
            :options="dataFilter"
            :props="{ expandTrigger: 'hover' }"
            :placeholder="placeholderText"
            @change="changeLeft"
            style="width: 50%;margin-right: 5px;"
            clearable
        ></el-cascader>
        <el-input
            v-model="cParentParams.attribute"
            v-if="ruleForm.inputType === 'input' &&  paramsDataType!=='Decimal' "
            :placeholder="placeholderText"
            style="width: 50%;margin-right: 2px;"
            clearable
            @input="attributeInput($event,pipe)"
            :disabled="disabled"
        ></el-input>
        <el-input-number
            v-model="cParentParams.attribute"
            v-if="ruleForm.inputType === 'input' &&  paramsDataType ==='Decimal' "
            :precision="2"
            :placeholder="placeholderText"
            style="width: 50%;margin-right: 2px;"
            clearable
            :disabled="disabled"
        ></el-input-number>
        <el-button
            class="btn"
            size="mini"
            v-if="ruleForm.inputType === 'select' "
            type="success"
            @click="switchRightBtnType"
            :disabled="disabled"
        >{{$i18ns('选择')}}</el-button>
        <el-button
            class="btn"
            size="mini"
            v-else
            type="info"
            @click="switchRightBtnType"
            :disabled="disabled"
        >输入</el-button>
    </div>
</template>

<script>
import { deepClone } from "../../views/risk/utils/helper";

export default {
    props: {
        cParentParams: Object,
        dataList: Object,
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            ruleForm: {
                inputType: "select",
            },
            //选择数值 变量 函数
            //选择变量后的选择项
            variableType: [],
            //属性选项
            attributeType: [],
            filterDataList: [],
            placeholderText: "",
            paramsDataType: "",
        };
    },
    mounted() {
        let that = this;
        console.log(
            "父类穿过来的参数--set_formula_variable_attribute",
            that.cParentParams
        );
        if (that.cParentParams.inputType) {
            that.ruleForm.inputType = that.cParentParams.inputType;
        }
        that.placeholderText = `请输入参数:${that.cParentParams.paramsCode}--${that.cParentParams.paramsDesc}`;
        //that.placeholderText = that.cParentParams.paramsDesc;
        that.paramsDataType = that.cParentParams.paramsDataType;
    },
    computed: {
        dataFilter() {
            let that = this;
            //如果默认选项字典没有拉取到，取消过滤
            if (!this.dataList) {
                return;
            }
            let depData = deepClone(this.dataList);
            depData.forEach((item, index, arrs) => {
                item.children.forEach((childrenItem, index, arrs) => {
                    if (childrenItem.children) {
                        childrenItem.children.forEach(
                            (grandchildrenItem, index, arrs) => {
                                if (
                                    grandchildrenItem.dataType !==
                                    that.cParentParams.paramsDataType
                                ) {
                                    grandchildrenItem.disabled = true;
                                }
                            }
                        );
                    } else {
                        if (
                            childrenItem.dataType !==
                            that.cParentParams.paramsDataType
                        ) {
                            childrenItem.disabled = true;
                        }
                    }
                });
            });
            console.log("数据更新", depData);
            return depData;
        },
    },
    methods: {
        switchRightBtnType(e) {
            // if (!this.disabled) {
            //   return;
            // }
            let that = this;
            that.ruleForm.inputType =
                that.ruleForm.inputType === "select" ? "input" : "select";
            console.log("switchVarType===after", that.ruleForm.inputType);
            that.cParentParams.inputType = that.ruleForm.inputType;
            that.cParentParams.attribute = "";
        },
        changeLeft(val, selectedData) {
            // console.log("changeLeft", val, selectedData);
            this.cParentParams.attribute =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).value
                    ? this.getFormAmoutValidateInfo(val).value
                    : "";
            console.log("选择后的转译", this.cParentParams.attribute);
            this.$nextTick(() => {
                // let str = this.$refs["cascaderSet"].presentText;
                let str =
                    this.$refs["cascaderSet"].getCheckedNodes()[0]
                        .pathLabels[1];
                if (str && str.length > 0) {
                    // this.cParentParams.attributeDesc = str.substring(
                    //     str.indexOf("/") + 1,
                    //     str.length
                    // );
                    this.cParentParams.attributeDesc = str;
                }
                console.log(
                    "选择后的转译attributeDesc",
                    this.cParentParams.attributeDesc
                );
            });
        },
        getFormAmoutValidateInfo(val) {
            for (let i in this.dataList) {
                let item = this.dataList[i].children;
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
        attributeInput(e) {
            let that = this;
            let value = e;
            if (that.cParentParams.paramsDataType === "Int") {
                value = value.replace(/\D/g, "");
                // if (operator === 'POW' && value > 5) {
                //   value = 5
                // }
                //只能输入数字不能输入小数点
                that.cParentParams.attribute = value;
            }
            if (that.cParentParams.paramsDataType === "Decimal") {
                //只能输入数字和小数点
                // that.pipe.rightValueBetween = value.replace(/[^\d.]/g, '')
                that.cParentParams.attribute = value
                    .replace(/[^\d.]/g, "")
                    .replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
            }
            // if (that.cParentParams.paramsDataType === 'String') {
            //   that.cParentParams.attribute = `'${value}'`
            // }
        },
    },
};
</script>

<style lang="css" scoped>
.div {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.params_code {
    max-width: 10%;
    width: auto;
}
.btn {
    margin-right: 20px;
}
</style>
