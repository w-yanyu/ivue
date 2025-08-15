<template>
    <div class="page_content">
        <div class="div_content">
            <div class="selectContent">
                <span id="title">{{title}} :</span>
                <!-- 选择框 选择 数值 变量 函数 -->
                <!-- <el-select style="width: 120px; margin-left: 5px;" v-model="ruleForm.scoreMold" :label-in-value="true"
          @change="changeScoreMold" clearable :disabled="disabled">
          <el-option v-for="item in scoreMoldType" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
                </el-select>-->
                <el-radio-group
                    v-model="ruleForm.scoreMold"
                    @change="raidoChange"
                    class="radio-group"
                    :disabled="disabled"
                >
                    <el-radio :label="1">常量输入</el-radio>
                    <el-radio :label="2">变量选择</el-radio>
                    <el-radio :label="3">函数选择</el-radio>
                </el-radio-group>
            </div>

            <div class="inputContent">
                <!-- 选择常量且放回数据类型不为decimal类型的时候的输入框 -->
                <el-input
                    v-if="ruleForm.scoreMold===1 && dataType!=='Decimal'"
                    v-model.number="ruleForm.numerical"
                    :placeholder="placeholderText"
                    style="width: 250px;"
                    clearable
                    @input="numericalInput($event)"
                    :disabled="disabled"
                ></el-input>
                <!-- 选择常量且返回值为decimal类型的时候的输入框 -->
                <el-input-number
                    v-if="ruleForm.scoreMold===1 && dataType==='Decimal'"
                    v-model.number="ruleForm.numerical"
                    :precision="2"
                    style="width: 250px;"
                    clearable
                    @change="numericalDecimalInput($event)"
                    :controls="false"
                    :disabled="disabled"
                ></el-input-number>

                <!-- 选择变量的时候的下拉框 -->
                <el-cascader
                    ref="cascaderSet"
                    :disabled="disabled"
                    v-model="ruleForm.variable"
                    :options="dataListDecimal"
                    :filterable="true"
                    v-if="ruleForm.scoreMold===2"
                    :props="{ expandTrigger: 'hover'  }"
                    @change="changeLeft"
                    style="width: 250px;"
                    clearable
                ></el-cascader>

                <!-- 选择函数后的选项 -->
                <div class="score_content" v-if="ruleForm.scoreMold===3">
                    <functionSet
                        :cParentParams="ruleForm"
                        :disabled="disabled"
                        :formulaType="formulaType"
                    ></functionSet>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <div class="tip-left" v-if="!noShowConfirmBtn">
                <el-button type="primary" @click="confirm">确定</el-button>
                <el-button type="info" @click="cancel">取消</el-button>
            </div>
        </span>
    </div>
</template>

<script>
import { deepClone } from "@/views/risk/utils/helper";
import functionSet from "@/components/FunctionSet/functionSet.vue";

export default {
    props: {
        cMeta: Object, //本页面模板json数据Layout对象
        cParentMeta: Object, //父页面模板json数据Layout对象
        cParentParams: Object, //父页面自定义参数与内置参数
        cParentScope: Object, //父页面每块区域业务数据
        //是否显示提交按钮
        noShowConfirmBtn: {
            type: Boolean,
            default: false,
        },
        //是否处于view状态
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        functionSet,
    },
    data() {
        return {
            ruleForm: {
                scoreMold: "", //选择数值 变量 函数
                scoreMoldText: "", //前页按钮文字改变
                numerical: "", //选择数值后的输入框
                variable: "", //选择变量后的联合查询的值
                attribute: "", //选择变量后的联合查询公式
                attributeDesc: "", //选择联级选择器后的中文解析
                formula: "", //选择函数后的选择函数
                dataType: "", //数据类型
                inputDataItem: [], //存储函数选择的输入
                functionDef: "", //函数方法代码体
            },
            //选择数值 变量 函数
            scoreMoldType: [
                {
                    label: "常量",
                    value: 1,
                },
                {
                    label: "变量",
                    value: 2,
                },
                {
                    label: "函数",
                    value: 3,
                },
            ],

            formulaType: [],
            title: "",
            dataList: "", //选项数据
            dataListDecimal: [], //选项过滤后的数据
            placeholderText: "",
            dataType: "",
        };
    },
    mounted() {
        console.log("父类传过来的数据--functionSetAll", this.cParentParams);

        if (
            this.cParentParams.row &&
            this.cParentParams.row.valueNatureExpress
        ) {
            let jsonObj = JSON.parse(this.cParentParams.row.valueNatureExpress);
            console.log("转译过的--functionSetAll数据", jsonObj);
            if (jsonObj) {
                this.ruleForm = jsonObj;
                // this.ruleForm.variable = this.ruleForm.attribute
                console.log(
                    "转译过的--functionSetAll最后赋值的数据",
                    this.ruleForm
                );
            }
        }
        this.title =
            this.cParentParams.title !== ""
                ? this.cParentParams.title
                : this.ruleForm.scoreMoldText;
        this.placeholderText = `请输入${this.cParentParams.dataType}类型`;
        this.dataType = this.cParentParams.dataType;
        this.getFactList();
        this.getFunctionList();
    },
    beforeDestroy() {},
    methods: {
        //选择了 常量 变量 函数的选项框
        raidoChange(event) {
            let that = this;
            console.log("切换选择=================",that);
            let temp = [];
            //选择了变量设置
            if (event === 2) {
                temp.push({
                    // numericalType: '', //常量 变量
                    variable: "", //联合查询的值
                    attribute: "", //联合查询转译的公式  常量数值输入
                    inputType: "select", //手输入还是选择输入
                    attributeDesc: "", //选择联级选择器后的中文解析
                });
            }
            that.ruleForm.numerical = "";
            that.ruleForm.variable = "";
            that.ruleForm.formula = "";
            that.ruleForm.inputDataItem = temp;
            that.ruleForm.dataType = that.cParentParams.dataType;
            that.ruleForm.functionDef="";
            that.ruleForm.scoreMoldText =
                event === 1
                    ? "常量"
                    : (that.ruleForm.scoreMoldText =
                          event === 2 ? "变量" : "函数");
        },

        // 添加得分规则
        confirm() {
            console.log("添加得分规则--------", this.ruleForm);
            let that = this;
            if (!that.isCompleted()) {
                return;
            }
            let item = that.formulaType.find(
                (item) => item.functionCode === that.ruleForm.formula
            );
            let str = "";
            console.log("找到的item", item);
            if (item !== undefined) {
                str = item.functionDef + str;
            }
            //返回给前一页渲染数据
            that.cParentParams.row.scorePoints = that.adpterToStr();
            //准备提交给后台的解析
            that.cParentParams.row.valueExpression =
                str + that.cParentParams.row.scorePoints;
            //准备提交后台储存的json字符串
            console.log("转换前的json类", this.ruleForm);
            that.cParentParams.row.valueNatureExpress = JSON.stringify(
                this.ruleForm
            );
            console.log(
                "转换后---的json类",
                that.cParentParams.row.valueNatureExpress
            );
            that.cParentParams.row.valueType = this.ruleForm.scoreMold;
            that.cParentParams.row.attributeDesc = this.ruleForm.attributeDesc;
            that.cParentParams.row.scoreMoldText = this.ruleForm.scoreMoldText;

            let obj = {
                functionCode: str,
                scorePoints: that.cParentParams.row.scorePoints,
                valueExpression: that.cParentParams.row.valueExpression,
                valueNatureExpress: that.cParentParams.row.valueNatureExpress,
                attributeDesc: that.cParentParams.row.attributeDesc,
                valueType: that.cParentParams.row.valueType,
                index: that.cParentParams.index,
                scoreMoldText: that.cParentParams.row.scoreMoldText,
            };
            console.log("that.cParentParams.row", that.cParentParams.row);
            console.log(" that.$dataBus", that.$dataBus);
            that.$dataBus.doCallBack(that, obj);
            // this.$dialog.close();
        },
        //作为组件使用的时候获取公式设置相关数据
        getConfirmData() {
            let that = this;

            let item = that.formulaType.find(
                (item) => item.functionCode === that.ruleForm.formula
            );
            let str = "";
            console.log("找到的item", item);
            if (item !== undefined) {
                str = item.functionDef + str;
            }

            let obj = {
                scorePoints: that.adpterToStr(),
                valueExpression: str + that.adpterToStr(),
                valueNatureExpress: JSON.stringify(this.ruleForm),
                valueType: this.ruleForm.scoreMold,
                scoreMoldText: this.ruleForm.scoreMoldText,
            };
            console.log("组件使用时提交数据", obj);
            return obj;
        },
        cancel() {
            this.$dialog.close();
        },
        isCompleted() {
            let that = this;
            let isCompleted = true;
            console.log("numerical", that.ruleForm.numerical);
            console.log("numerical", that.ruleForm.numerical === undefined);

            if (
                that.ruleForm.scoreMold === 1 &&
                this.dataType === "Decimal" &&
                that.ruleForm.numerical === undefined
            ) {
                that.ruleForm.numerical = " 0.00";
            }
            if (that.ruleForm.scoreMold === "") {
                that.$message.error("请设置得分");
                isCompleted = false;
                //如果选择常量  输入框为空的时候
            } else if (
                that.ruleForm.scoreMold === 1 &&
                !that.ruleForm.numerical &&
                that.ruleForm.numerical === ""
            ) {
                that.$message.error("请填写常量值");
                isCompleted = false;
                //选择了设置变量
            }else if (
                that.ruleForm.scoreMold === 1 &&
                that.ruleForm.dataType === "Boolean"
            ) {
                if(!(that.ruleForm.numerical==="true" || that.ruleForm.numerical==="false")){
                that.$message.error("请填写正确常量值");
                isCompleted = false;
                }
            }
             else if (
                (that.ruleForm.scoreMold === 2 &&
                    that.ruleForm.variable === "") ||
                (that.ruleForm.scoreMold === 2 &&
                    this.ruleForm.attribute === "")
            ) {
                that.$message.error("变量项目未填写完");
                isCompleted = false;
                //如果选择了设置函数
            } else if (that.ruleForm.scoreMold === 3) {
                if (that.ruleForm.formula === "") {
                    that.$message.error("请选择函数");
                    isCompleted = false;
                } else {
                    //遍历选项输入
                    for (const child of that.ruleForm.inputDataItem) {
                        if (child.attribute === "") {
                            that.$message.error("函数项目未填写完成");
                            isCompleted = false;
                            break;
                        }
                    }
                }
            }
            return isCompleted;
        },
        /**
         * 转译得分设置
         * score_expression : 存你的json
         * score_method : 存解析
         */
        adpterToStr() {
            let that = this;
            let str = "";
            //选择了常量的转译
            if (that.ruleForm.scoreMold === 1) {
                str = `${that.ruleForm.numerical}`;
            }
            //选择了变量的转译
            if (that.ruleForm.scoreMold === 2) {
                str = `${that.ruleForm.attribute}`;
            }
            //选择了函数的转译
            if (that.ruleForm.scoreMold === 3) {
                str = `${that.ruleForm.formula}(`;
                //遍历选项输入
                for (const child of that.ruleForm.inputDataItem) {
                    if (
                        child.inputType === "input" &&
                        child.paramsDataType === "String"
                    ) {
                        str = `${str} '${child.attribute}',`;
                    } else {
                        str = `${str} ${child.attribute},`;
                    }
                }
                //把最末尾的,号变成)号
                str = str.substring(0, str.length - 1) + ")";
            }
            return str;
        },
        //常量输入框
        numericalInput(e) {
            let that = this;
            let value = e;
            if (
                that.cParentParams.dataType &&
                that.cParentParams.dataType === "Int"
            ) {
                //一般情况下只能输入整数
                that.ruleForm.numerical = value.replace(/\D/g, "");
            }
            if (
                that.cParentParams.dataType &&
                that.cParentParams.dataType === "Decimal"
            ) {
                //只能输入数字不能输入小数点
                that.ruleForm.numerical = value
                    .replace(/[^\d.]/g, "")
                    .replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
            }
        },
        //常量Decimal输入框
        numericalDecimalInput(e) {
            // let that = this;
            // let value = Number(e);
            // if (value >= 1000000) {
            //     value = 1000000;
            //     that.ruleForm.numerical = value.toString();
            // } else if (value <= -1000000) {
            //     value = -1000000;
            //     that.ruleForm.numerical = value.toString();
            // } else {
            //     that.ruleForm.numerical = value.toString();
            // }
            // this.$forceUpdate();

        },
        //初始化事实下拉列表
        getFactList() {
            console.log("获取联动选择的默认选项字典");
            let that = this;
            this.dataLeft = [];
            this.dataRight = [];
            this.rightDataLeft = [];
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
                   servicecode:"deci080101"
                })
                .then((obj) => {
                    this.dataList = obj.data;
                    this.dataRight = obj.data;
                    this.dataLeft = obj.data;
                    if (
                        that.cParentParams.dataType !== undefined &&
                        that.cParentParams.dataType
                    ) {
                        this.dataListDecimal = this.dataFilter(
                            that.cParentParams.dataType
                        );
                    }
                })
                .catch((reg) => {});
        },
        //获取方法名选项
        getFunctionList() {
            let that = this;
            let resultType =
                that.cParentParams.dataType !== undefined &&
                that.cParentParams.dataType
                    ? that.cParentParams.dataType
                    : "";
            let params = {
                functionId: "",
                length: 100,
                start: 1,
                resultType,
                servicecode:
                    "deci080102",
                
                isList: true,
            };
            that.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                    console.log("请求函数方法名列表回调", obj.data);
                    if (obj.data.length > 0) {
                        that.formulaType = obj.data;
                    }
                })
                .catch((reg) => {});
        },

        changeLeft(val, selectedData) {
            console.log("changeLeft", val, selectedData);
            this.ruleForm.attribute =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).value
                    ? this.getFormAmoutValidateInfo(val).value
                    : "";
            console.log("选择后的转译", this.ruleForm.attribute);
           setTimeout(() => {
                 let str = this.$refs.cascaderSet.presentText;
                console.log("0000000000",str);
                if (str && str.length > 0) {
                    this.ruleForm.attributeDesc = str.substring(
                        str.indexOf("/") + 1,
                        str.length
                    );
                }
                console.log(
                    "选择后的转译attributeDesc",
                    this.ruleForm.attributeDesc
                );
           }, 500);
              
            
        },
        getFormAmoutValidateInfo(val) {
            console.log("val",val)
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
        //根据选择类型筛选选项数据
        dataFilter(filterType) {
            let depDataRight = deepClone(this.dataList);
            //如果不想控制输入的变量为decimal类型的，那么注释下面这一段即可
            depDataRight.forEach((item, index, arrs) => {
                item.children.forEach((childrenItem, index, arrs) => {
                    if (childrenItem.children) {
                        childrenItem.children.forEach(
                            (grandchildrenItem, index, arrs) => {
                                if (grandchildrenItem.dataType !== filterType) {
                                    grandchildrenItem.disabled = true;
                                }
                            }
                        );
                    } else {
                        if (childrenItem.dataType !== filterType) {
                            childrenItem.disabled = true;
                        }
                    }
                });
            });
            return depDataRight;
        },
    },
};
</script>


<style lang="css" scoped>
.page_content {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
}

#title {
    margin-top: 5px;
}

.div_content {
    display: flex;
    flex-direction: column;
    width: 90%;
    align-items: flex-start;
    margin-top: 40px;
}

.score_content {
    width: 80%;
}

.item_content {
    display: flex;
    align-items: center;
    margin-left: 10px;
}

.dialog-footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    text-align: center;
    margin-top: 50px;
}

.radio-group {
    margin-left: 30px;
}

.selectContent {
    width: 100%;
    margin-left: 30px;
}

.inputContent {
    width: 100%;
    margin-left: 110px;
    margin-top: 30px;
}
</style>
