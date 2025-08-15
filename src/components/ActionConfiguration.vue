<template>
    <el-form-item class="action_page" prop="actionList">
        <el-button type="primary" @click="addAction()" :disabled="isDisable">添加动作</el-button>
        <el-row class="listTable" v-for="(item, index) in form.actionList" :key="index">
            <el-col :span="24" class="col_content">
                <!-- 第一个选择项 -->
                <el-select
                    v-model="form.actionList[index].actionType"
                    style="width: 10%;"
                    filterable
                    placeholder="请选择动作类型"
                    @change="changeOperator(form.actionList[index],index)"
                    :disabled="isDisable"
                    clearable
                >
                    <el-option
                        v-for="item in actionType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <!-- 第二个联动选择项目 -->
                <el-cascader
                    style="width:38%"
                    v-if="form.actionList[index].actionType!=='4' && form.actionList[index].actionType!=='0' &&  form.actionList[index].actionType!=='5' &&  form.actionList[index].actionType!==''"
                    class="input_el"
                    v-model="form.actionList[index].actionStringShow"
                    :options="dataList"
                    :filterable="true"
                    :show-all-levels="false"
                    :multiple="false"
                    :props="{ expandTrigger: 'hover'  }"
                    @change="changeActionList($event,item,index)"
                    :disabled="isDisable"
                    clearable
                >
                    <!--   <el-cascader :disabled="disabled" class='cascader' :multiple="false"
            v-model="ruleForm.conditionValueShow" :show-all-levels="false" :options="conditionsList"
            :props="{ expandTrigger: 'hover'  }" @change="changeConditions" style="width: 420px" clearable>
                    </el-cascader>-->
                </el-cascader>
                <span
                    v-if="form.actionList[index].actionType!=='4' && form.actionList[index].actionType!=='3' && form.actionList[index].actionType!=='0' && form.actionList[index].actionType!=='5' &&  form.actionList[index].actionType!==''"
                    class="el-tag el-tag--info el-tag--mini buttonSet"
                    style="cursor: pointer;"
                    @click="setFormula(index)"
                >{{form.actionList[index].buttonText ? form.actionList[index].buttonText:'等于'}}</span>
                <!-- 第三个输入框 -->
                <el-input
                    v-if="form.actionList[index].actionType!=='4' && form.actionList[index].actionType!=='3' && form.actionList[index].actionType!=='0'  && form.actionList[index].actionType!=='5' &&  form.actionList[index].actionType!==''"
                    v-model="form.actionList[index].actionValue"
                    placeholder="请输入"
                    style="width:38%;"
                    disabled
                    @input="actionValueInput($event,index)"
                    clearable
                ></el-input>
                <!-- 第四个选择项 -->
                <el-select
                    v-if="form.actionList[index].actionType==='4' && form.actionList[index].actionType!=='0' && form.actionList[index].actionType!=='5' &&  form.actionList[index].actionType!==''"
                    v-model="form.actionList[index].actionValue"
                    style="width:38%;"
                    filterable
                    placeholder="请选择接口"
                    :disabled="isDisable"
                    clearable
                >
                    <el-option
                        v-for="item in actionInterface"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <!-- 删除按钮 -->
                <el-button
                    v-if="index!=0"
                    style="margin-left:2px;"
                    icon="el-icon-delete"
                    @click="delAction(index) "
                    :disabled="isDisable"
                />
            </el-col>
        </el-row>
    </el-form-item>
</template>

<script>
export default {
    name: "ActionConfiguration",
    props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object, // 父页面的scope数据对象
        isDisable: {
            default: false, // 是否可以编辑
        },
        haveNOSet: {
            default: false, // 是否要有不设置的选项
        },
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
                        actionStringShow: "",
                        actionName: "",
                        actionValue: "",
                        actionDataType: "",
                        inputDataItem: [], //存储函数选择的输入
                    },
                ],
            },
            actionInterface: [],
            formulaType: [],
            actionType: [
                // {
                //     value: 0,
                //     label: "不设置"
                //   },
                {
                    value: '1',
                    label: "插入",
                },
                {
                    value: '2',
                    label: "更新",
                },
                {
                    value: '3',
                    label: "删除",
                },
                // {
                //   value: 4,
                //   label: "接口调用"
                // },
                // {
                //   value: 5,
                //   label: "函数设置"
                // },
            ],
            insertStatus: "",
        };
    },
    mounted() {
        this.getFactList();
        this.getActionList();
        this.getActionInterface();
        this.getFunctionList();
        //不要设置选项
        if (this.haveNOSet) {
            this.actionType = [
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
                // {
                //   value: 5,
                //   label: "函数设置"
                // },
            ];
        }
    },
    methods: {
        addAction() {
            if (!this.isCompleted()) {
                return;
            }
            this.form.actionList.push({
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
            this.form.actionList.splice(index, 1);
        },
        getFactList() {
            this.dataLeft = [];
            this.dataRight = [];
            this.rightDataLeft = [];
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
                    servicecode:"deci080101",
                    isList: true,
                })
                .then((obj) => {
                    console.log("请求动作设置相关回调", obj);
                    this.dataList = obj.data;
                    this.dataLeft = obj.data;
                })
                .catch((reg) => {});
        },
        changeOperator(actionData1, index) {
            console.log("actionData", actionData1);
            actionData1.actionValue = "";
            this.form.actionList[index].actionDataType = "";
            this.form.actionList[index].actionString = "";
            this.form.actionList[index].actionStringShow = "";
            this.form.actionList[index].actionName = "";
            this.form.actionList[index].buttonText = "等于";
            this.form.actionList[index].actionValue = "";
            this.form.actionList[index].valueExpression = "";
            this.form.actionList[index].valueNatureExpress = "";
            this.form.actionList[index].valueType = "";
            this.form.actionList[index].attributeDesc = "";
            console.log("form.actionList", this.form.actionList);
        },
        //动作列表
        changeActionList(e, val, index) {
            console.log("changeActionList(val)", e, val, index);
            let selctList = val.actionStringShow;
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
            console.log("choose actionDataType====", val.actionDataType);
            console.log("choose actionType====", val.actionType);
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
                })
                .catch((reg) => {});
        },
        //设置得分公式
        setFormula(index) {
            console.log("修改公式index", index);
            let that = this;
            if (that.isDisable) {
                return;
            }
            if (that.form.actionList[index].actionDataType === "") {
                that.$message.error("请先选择条件后设置公式");
                return;
            }
            that.$dataBus.bindCallBackMethod(that, that.dialogCallBack, {});
            that.$dialog.open({
                that: that,
                title: "设置动作值",
                toRequest: {
                    // url: "@functionSetAll",
                    url: "@functionSetAllOtherLayout",
                    method: "get",
                    params: {
                        title: "动作值",
                        row: that.form.actionList[index],
                        index,
                        dataType: that.form.actionList[index].actionDataType,
                    },
                },
                width: "70%",
            });
        },
        dialogCallBack(btnConfig, response) {
            console.log("公式对话框待会的回调", btnConfig);
            console.log("公式对话框待会的回调", response);
            let that = this;
            that.form.actionList[response.index].actionValue =
                response.scorePoints;
            that.form.actionList[response.index].valueExpression =
                response.valueExpression;
            that.form.actionList[response.index].valueNatureExpress =
                response.valueNatureExpress;
            that.form.actionList[response.index].valueType = response.valueType;
            that.form.actionList[response.index].attributeDesc =
                response.attributeDesc;
            that.form.actionList[response.index].buttonText =
                response.scoreMoldText;
        },
        getActionList() {
            console.log("getActionList", this.cParentParams);
            var jsonFormData = this.cParentParams;
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
                        console.log(
                            "回调拿到 getActionList",
                            this.form.actionList
                        );
                        if (
                            this.form.actionList &&
                            this.form.actionList.length > 0
                        ) {
                            for (
                                let i = 0;
                                i < this.form.actionList.length;
                                i++
                            ) {
                                let tempStr =
                                    this.form.actionList[i].actionString.split(
                                        "."
                                    );
                                this.form.actionList[i].actionStringShow = [
                                    `${tempStr[0]}`,
                                    `${tempStr[0]}.${tempStr[1]}`,
                                ];
                                if (
                                    this.form.actionList[i].valueNatureExpress
                                ) {
                                    let jsonObj = JSON.parse(
                                        this.form.actionList[i]
                                            .valueNatureExpress
                                    );
                                    if (jsonObj && jsonObj.scoreMoldText) {
                                        this.form.actionList[i].buttonText =
                                            jsonObj.scoreMoldText;
                                    }
                                }
                            }
                        }
                    })
                    .catch((reg) => {});
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
                this.form.actionList = data;
                console.log("设置动作数据-----", this.form.actionList);
            }
        },
        actionValueInput(e, index) {
            let that = this;
            let value = e;
            console.log("输入的index===", index);
            console.log("输入的e===", e);
            let actionDataType = that.form.actionList[index].actionDataType;
            console.log("输入的actionDataType===", actionDataType);
            //选项选择插入情况
            if (
                (that.form.actionList[index].actionType === "1" &&
                    actionDataType === "Int") ||
                (that.form.actionList[index].actionType === "2" &&
                    actionDataType === "Int")
            ) {
                //只能输入数字不能输入小数点
                value = value.replace(/\D/g, "");
            }
            if (
                (that.form.actionList[index].actionType === "1" &&
                    actionDataType === "Decimal") ||
                (that.form.actionList[index].actionType === "2" &&
                    actionDataType === "Decimal")
            ) {
                value = value.replace(/[^\d.]/g, "");
            }
            console.log("value", value);
            that.form.actionList[index].actionValue = value;
            console.log(" that.form.actionList", that.form.actionList);
        },
        //判断各场景下 是否填写完成
        isCompleted() {
            let that = this;
            let isCompleted = true;
            console.log("that.form.actionList", that.form.actionList);
            if (that.form.actionList && that.form.actionList.length > 0) {
                //取出最后一项检查录入情况
                let inputObj =
                    that.form.actionList[that.form.actionList.length - 1];
                console.log("添加按钮条件判断---", inputObj);
                if (inputObj.actionType === "1" && inputObj.actionValue === "") {
                    that.$message.error("动作配置项有未填写完项目");
                    isCompleted = false;
                }

                if (inputObj.actionType === "2" && inputObj.actionValue === "") {
                    that.$message.error("动作配置项有未填写完项目");
                    isCompleted = false;
                }
                if (inputObj.actionType === "") {
                    that.$message.error("动作配置项有未填写完项目");
                    isCompleted = false;
                }
            }

            return isCompleted;
        },
        submitActionList() {
            return this.form.actionList;
        },
        //获取方法名选项
        getFunctionList() {
            let that = this;
            let params = {
                functionId: "",
                length: 100,
                start: 1,
                servicecode:
                    "deci080102",
                isList: true,
            };
            that.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                    console.log("请求函数方法名列表回调", obj.data);
                    that.formulaType = obj.data;
                })
                .catch((reg) => {});
        },
        //重置输入
        resetInput() {
            this.form.actionList = [
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
            ];
        },
    },
};
</script>

<style lang="css" scoped>
.listTable {
    margin-top: 5px;
}

.action_page {
    width: 100%;
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
