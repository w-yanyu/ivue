<template>
    <div class="menu-form">
        <div class="menu-form--container">
            <el-form
                ref="ruleForm"
                :model="ruleForm"
                :rules="rules"
                label-width="130px"
                class="custom-common--form"
            >
                <el-row>
                    <el-col :span="6">
                        <el-form-item v-if="false" label="评分模型id " prop="scoreModelId">
                            <el-input class="input_el" v-model="ruleForm.scoreModelId" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item v-if="false" label="评分模型代码 " prop="scoreModelCode">
                            <el-input class="input_el" v-model="ruleForm.scoreModelCode" disabled></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="评分属性名称 " prop="scoreAttribute">
                            <el-cascader
                                class="input_el"
                                v-model="ruleForm.scoreAttribute"
                                :options="dataList"
                                :filterable="true"
                                :disabled="disabledFlag"
                                :props="{ expandTrigger: 'hover' }"
                                @change="changeLeft(scope)"
                                clearable
                            ></el-cascader>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="评分属性字段 " prop="scoreAttribute">
                            <el-input class="input_el" v-model="ruleForm.scoreAttribute" disabled></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="数据类型 " prop="scoreAttributeDataType">
                            <!-- <el-input class="input_el" v-model="ruleForm.scoreAttributeDataType"  disabled="true"></el-input> -->
                            <el-input class="input_el" :value="chuangDataType" disabled="true"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="6">
                        <el-form-item label="权重 " prop="scorePercent">
                            <el-input-number
                                class="input_el"
                                v-model.number="ruleForm.scorePercent"
                                :precision="1"
                                controls-position="right"
                                min="0"
                                max="100"
                                @blur="scorePercentInput($event)"
                            ></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-button type="primary" class="addBtn" size="small" @click="addChildTable">+ 添加规则</el-button>
                <el-row>
                    <el-col>
                        <el-table :data="tableData" border max-height="450">
                            <el-table-column prop="conditionOperate" label="条件操作符">
                                <template slot-scope="scope">
                                    <el-select
                                        size="mini"
                                        style="width: 120px; margin-right: 0px;"
                                        v-model="scope.row.conditionOperate"
                                        v-if="scope.row.isRulesSet"
                                        :label-in-value="true"
                                        clearable
                                        @change="relation(scope.row.conditionOperate, scope.row.scoreAttributeDataType)"
                                    >
                                        <el-option
                                            v-for="item in conditionType"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                            :disabled="switchScoreDisabled(item.value,ruleForm.scoreAttributeDataType)"
                                        ></el-option>
                                    </el-select>
                                    <span v-else>{{setConditionOperate(scope.row.conditionOperate)}}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop=" conditionValue" label="条件值">
                                <template slot-scope="scope">
                                    <el-input
                                        size="mini"
                                        v-if="scope.row.isRulesSet"
                                        v-model="scope.row.conditionValue"
                                    ></el-input>
                                    <span v-else>{{ scope.row.conditionValue }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="scorePoints" label="得分">
                                <template slot-scope="scope">
                                    <div v-if="scope.row.isSet || scope.row.isRulesSet">
                                        <span
                                            class="el-tag el-tag--info el-tag--mini"
                                            style="cursor: pointer;"
                                            @click="setFormula(scope.row, scope.$index, true)"
                                        >{{scope.row.scoreMoldText?scope.row.scoreMoldText:'请设置得分'}}</span>
                                        <span
                                            v-if="scope.row.scorePoints!==''"
                                        >{{ scope.row.scorePoints }}</span>
                                    </div>
                                    <span v-else>{{ scope.row.scorePoints }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="id" label="规则操作">
                                <template slot-scope="scope" v-if="!scope.row.isSet">
                                    <span
                                        class="el-tag el-tag--info el-tag--mini"
                                        style="cursor: pointer;"
                                        @click="changeRulesTable(scope.row, scope.$index, true)"
                                    >{{ scope.row.isRulesSet ? "保存" : "维护规则" }}</span>
                                    <span
                                        v-if="!scope.row.isRulesSet"
                                        class="el-tag el-tag--danger el-tag--mini"
                                        style="cursor: pointer;"
                                        @click="handleDelete(scope.$index, scope.row)"
                                    >删除</span>

                                    <span
                                        v-if="scope.row.isRulesSet"
                                        class="el-tag el-tag--mini"
                                        style="cursor: pointer;"
                                        @click="cancelRulesTable(scope.row, scope.$index, false)"
                                    >取消</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>

                <el-row class="menu-footer">
                    <el-col :span="24">
                        <el-button type="primary" size="small" @click="clickConfirm">提交</el-button>
                        <el-button size="small" @click="clickCancel">返回</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object, // 父页面的scope数据对象
        itemParams: Object,
        disabledFlag: Object,
    },
    data() {
        return {
            ruleForm: {
                scoreCardCode: "",
                scoreModelId: "",
                scoreModelCode: "", //评分模型代码
                scoreAttribute: "", //属性
                scoreAttributeDataType: "", //属性类型
                scoreAttributeName: "", //属性名称
                conditionOperate: "", //条件操作符
                conditionValue: 1, //条件值
                scorePercent: 0, //评分占比
                scorePoints: 0, //得分
                status: 1,
                isSet: true,
            },
            disabledFlag: "",
            oldScoreCardMode: "",
            conditionType: [
                {
                    value: "==",
                    label: "等于",
                },
                {
                    value: "!=",
                    label: "不等于",
                },
                {
                    value: ">",
                    label: "大于",
                },
                {
                    value: ">=",
                    label: "大于等于",
                },
                {
                    value: "<",
                    label: "小于",
                },
                {
                    value: "<=",
                    label: "小于等于",
                },
                {
                    value: "IN",
                    label: "在什么范围内",
                },
                {
                    value: "NOT_IN",
                    label: "不在什么范围内",
                },
                {
                    value: "BETWEEN",
                    label: "在什么与什么之间",
                },
                {
                    value: "POW",
                    label: "大于..的..次方",
                },
                {
                    value: "LIKE",
                    label: "包含",
                },
                {
                    value: "NOT_LIKE",
                    label: "不包含",
                },
                {
                    value: "STARTSWITH",
                    label: "开头是",
                },
                {
                    value: "NOT_STARTSWITH",
                    label: "开头不是",
                },
                {
                    value: "ENDSWITH",
                    label: "结尾是",
                },
                {
                    value: "NOT_ENDSWITH",
                    label: "结尾不是",
                },
            ],
            dataList: "",
            lablePosition: "left",
            rules: {
                scoreModelCode: [
                    {
                        required: true,
                        message: "请填写评分模型代码",
                        trigger: "blur",
                    },
                ],
                scoreAttribute: [
                    {
                        required: true,
                        message: "请选择设置权重值",
                        trigger: "blur",
                    },
                ],
                conditionOperate: [
                    {
                        required: true,
                        message: "请选择设置条件操作符",
                        trigger: "blur",
                    },
                ],
                conditionValue: [
                    {
                        required: true,
                        message: "请输条件值",
                        trigger: "blur",
                    },
                ],
                scorePoints: [
                    {
                        required: true,
                        message: "请输得分值",
                        trigger: "blur",
                    },
                ],
            },
            tableData: [],
            multipleSelection: [],
        };
    },
    mounted() {
        let that = this;
        that.disabledFlag = that.cParentParams.disabledFlag;
        console.log("cParentParams", that.cParentParams);
        console.log("itemParams", that.itemParams);
        that.itemParams = that.cParentParams.itemParams;
        that.oldScoreCardMode = that.itemParams.scoreModelCode;
        that.getFactList();
        //添加的时候给权重添加默认值
        if (that.itemParams.scoreAttribute === "") {
            console.log("权重：" + that.itemParams.scorePercent);
            that.itemParams.scorePercent = 1;
        }
        that.ruleForm = that.itemParams;
        console.log("that.ruleForm", that.ruleForm);
        that.getTableData(that);
    },
    computed: {
        chuangDataType() {
            console.log(
                "scoreAttributeDataType",
                this.ruleForm.scoreAttributeDataType
            );
            switch (this.ruleForm.scoreAttributeDataType) {
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
    },
    methods: {
        //设置得分公式
        setFormula(row, index, cg) {
            console.log("修改得分公式", row, index, cg);
            let that = this;
            that.$dataBus.bindCallBackMethod(that, that.dialogCallBack, {});
            that.$dialog.open({
                that: that,
                title: "设置得分公式",
                toRequest: {
                    // url: "@functionSetAll",
                    url: "@functionSetAllOtherLayout", //设置规则
                    method: "get",
                    params: {
                        title: "分数",
                        row,
                        index,
                        cg,
                        // dataType: row.scoreAttributeDataType,
                        dataType: "Decimal",
                    },
                },
                width: "70%",
            });
        },
        //得分公式回调方法
        dialogCallBack(btnConfig, response) {},
        //联动
        relation(conditionOperate, scoreAttributeDataType) {
            if (scoreAttributeDataType === "Boolean") {
                this.$message({
                    message: "条件值请输入true或false",
                    type: "warning",
                });
            }

            if (scoreAttributeDataType === "Int") {
                if (
                    conditionOperate === "==" ||
                    conditionOperate === "!=" ||
                    conditionOperate === ">" ||
                    conditionOperate === ">=" ||
                    conditionOperate === "<" ||
                    conditionOperate === "<="
                ) {
                    this.$message({
                        message: "条件值请输入整数",
                        type: "warning",
                    });
                }
            }

            if (scoreAttributeDataType === "Decimal") {
                if (
                    conditionOperate === "==" ||
                    conditionOperate === "!=" ||
                    conditionOperate === ">" ||
                    conditionOperate === ">=" ||
                    conditionOperate === "<" ||
                    conditionOperate === "<="
                ) {
                    this.$message({
                        message: "条件值请输入最多2位小数的数值",
                        type: "warning",
                    });
                }
            }

            if (conditionOperate === "BETWEEN") {
                this.$message({
                    message:
                        "请注意条件值输入格式为：配置()开区间,[]闭区间,例如(0,1)、[0,1]、(0,1]、[1,0)  右区间的值大于等于左区间",
                    type: "warning",
                });
            }

            if (conditionOperate === "IN" || conditionOperate === "NOT_IN") {
                if (scoreAttributeDataType === "Int") {
                    this.$message({
                        message:
                            "请注意条件值输入格式为：1|2|3多个之间竖线隔开的整数",
                        type: "warning",
                    });
                } else if (scoreAttributeDataType === "Decimal") {
                    this.$message({
                        message:
                            "请注意条件值输入格式为：1.00|2.00|3.00多个之间竖线隔开的带两位小数的数值",
                        type: "warning",
                    });
                } else {
                    this.$message({
                        message:
                            "请注意条件值输入格式为：a|a|c多个之间竖线隔开的字符",
                        type: "warning",
                    });
                }
            }
            if (conditionOperate === "POW") {
                this.$message({
                    message:
                        "请注意条件值输入格式为：1,2 只能输入两个整数，中间用逗号隔开",
                    type: "warning",
                });
            }
            if (conditionOperate === "LIKE") {
                this.$message({
                    message:
                        "请注意条件值输入格式为：配置一字符串，用来判断某个字符是否存在某个事实属性",
                    type: "warning",
                });
            }
            if (conditionOperate === "NOT_LIKE") {
                this.$message({
                    message:
                        "请注意条件值输入格式为：配置一字符串，用来判断某个字符是否不存在某个事实属性",
                    type: "warning",
                });
            }
            if (conditionOperate === "STARTSWITH") {
                this.$message({
                    message:
                        "请注意条件值输入格式为：配置一字符串，用来判断事实属性是否以该字符串开头",
                    type: "warning",
                });
            }
            if (conditionOperate === "NOT_STARTSWITH") {
                this.$message({
                    message:
                        "请注意条件值输入格式为：配置一字符串，用来判断事实属性否以该字符串开头不是",
                    type: "warning",
                });
            }
            if (conditionOperate === "ENDSWITH") {
                this.$message({
                    message:
                        "请注意条件值输入格式为：配置一字符串，用来判断事实属性是否以该字符串结尾",
                    type: "warning",
                });
            }
            if (conditionOperate === "NOT_ENDSWITH") {
                this.$message({
                    message:
                        "请注意条件值输入格式为：配置一字符串，用来判断事实属性否以该字符串结尾不是",
                    type: "warning",
                });
            }
        },
        //选择项是否可选的判断
        switchScoreDisabled(value, leftType) {
            console.log("switchScoreDisabled", value, leftType);
            if (leftType === "Boolean" && value !== "==") {
                //如果是boolea类型式，只能选择'=='操作符
                return true;
            }
            if (leftType === "String" && value === "POW") {
                return true;
            }
            if (
                (leftType === "Int" || leftType === "Decimal") &&
                (value === "LIKE" ||value === "IN" ||value === "NOT_IN" ||
                    value === "NOT_LIKE" ||
                    value === "STARTSWITH" ||
                    value === "NOT_STARTSWITH" ||
                    value === "ENDSWITH" ||
                    value === "NOT_ENDSWITH")
            ) {
                return true;
            }
            return false;
        },
        //deci020109->deci020210
        getTableData(req) {
            console.log("getTableData", req);
            let params = {
                scoreCardCode: this.ruleForm.scoreCardCode,
                scoreModelCode: this.ruleForm.scoreModelCode,
                servicecode:
                    "deci020210",
                isList: true,
            };
            //请求评分属性选择项目
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                    obj.data.forEach((map) => {
                        map.isRulesSet = false;
                        if (map.valueNatureExpress) {
                            let jsonObj = JSON.parse(map.valueNatureExpress);
                            if (jsonObj && jsonObj.scoreMoldText) {
                                map.scoreMoldText = jsonObj.scoreMoldText;
                            }
                        }
                        return map;
                    });
                    this.tableData = obj.data;
                })
                .catch((reg) => {});
        },
        //请求评分属性选择数据
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
        //点击 "+添加规则" 按钮
        addChildTable() {
            console.log("addChildTable");
            if (
                this.ruleForm.scoreAttribute === "" ||
                this.ruleForm.scoreModelCode === "" ||
                this.ruleForm.scorePercent === ""
            ) {
                return this.$message.warning(
                    "请先填写评分代码、评分属性、权重"
                );
            }
            for (let i of this.tableData) {
                if (
                    i.conditionOperate === "" ||
                    i.conditionValue === "" ||
                    i.scorePoints === ""
                ) {
                    return this.$message.warning("请先填写条件内容");
                }
            }
            let rowNew = {
                scoreCardCode: this.ruleForm.scoreCardCode, //评分卡代码
                scoreModelCode: this.ruleForm.scoreModelCode, //评分模型代码
                scoreAttribute: this.ruleForm.scoreAttribute, // 评分属性
                scorePercent: this.ruleForm.scorePercent, //权重
                scoreAttributeName: this.ruleForm.scoreAttributeName, //名称
                oldScoreCardMode: this.oldScoreCardMode,
                scoreAttributeDataType: this.ruleForm.scoreAttributeDataType, //属性数据类型
                conditionOperate: "",
                conditionValue: "",
                scorePoints: "",
                isRulesSet: true,
            };
            this.tableData.map((i) => {
                i.isRulesSet = false; //给后台返回数据添加`isSet`标识
                return i;
            });
            // this.tableData.push(rowNew);
            this.tableData.unshift(rowNew); //追加到头部
        },
        handleDelete(index, row) {
            this.tableData.splice(index, 1);
        },
        cancelRulesTable(row, index, cg) {
            console.log("规则行取消", !row.scoreModelId);
            if (!row.scoreModelId) {
                console.log("规则行取消11111111111111");
                this.tableData.splice(index, 1);
                return;
            }
            //点击修改 判断是否已经保存所有操作
            for (let i of this.tableData) {
                if (i.isRulesSet && i.id !== row.id) {
                    this.$message.warning("请先保存当前编辑项");
                    return false;
                }
            }

            if (
                row.scoreModelCode === "" ||
                row.scoreAttribute === "" ||
                row.scorePoints === "" ||
                row.conditionOperate === "" ||
                row.conditionValue === ""
            ) {
                this.$message.warning("表格内容不能为空");
                return false;
            }

            //是否是取消操作
            if (!cg) {
                return (row.isRulesSet = !row.isRulesSet);
            }
        },
        changeRulesTable(row, index, cg) {
            console.log("修改行规则按钮输出", row, index, cg);
            //点击修改 判断是否已经保存所有操作
            for (let i of this.tableData) {
                if (i.isRulesSet && i.id !== row.id) {
                    this.$message.warning("请先保存当前编辑项");
                    return false;
                }
            }
            if (
                row.scoreModelCode === "" ||
                row.scoreAttribute === "" ||
                row.scorePoints === "" ||
                row.conditionOperate === "" ||
                row.conditionValue === ""
            ) {
                this.$message.warning("表格内容不能为空");
                return false;
            }
            //提交数据
            if (row.isRulesSet) {
                let executeExpress = null;
                //转译处理
                executeExpress = getComplexFuntionExpress(
                    row.conditionOperate,
                    row
                );

                if (executeExpress === "error") {
                    return this.$message.warning("条件值不符合规范");
                }
                console.log("executeExpress----", executeExpress);

                row.executeExpress = executeExpress;
                row.scoreAttributeName = this.ruleForm.scoreAttributeName;
                row.scoreCardCode = this.ruleForm.scoreCardCode;
                row.isRulesSet = false;
            } else {
                row.isRulesSet = true;
            }
            console.log("tableData", this.tableData);
        },
        readTable() {
            //根据实际情况，自己改下啊
            this.tableData.map((i) => {
                i.isSet = false; //给后台返回数据添加`isSet`标识
                return i;
            });
        },

        changeLeft(val) {
            this.tableData = []; //清空表格数据
            this.ruleForm.scoreAttributeDataType =
                this.getFormAmoutValidateInfo(this.ruleForm.scoreAttribute) &&
                this.getFormAmoutValidateInfo(this.ruleForm.scoreAttribute)
                    .dataType
                    ? this.getFormAmoutValidateInfo(
                          this.ruleForm.scoreAttribute
                      ).dataType
                    : "";
            this.ruleForm.scoreAttributeName =
                this.getFormAmoutValidateInfo(this.ruleForm.scoreAttribute) &&
                this.getFormAmoutValidateInfo(this.ruleForm.scoreAttribute)
                    .label
                    ? this.getFormAmoutValidateInfo(
                          this.ruleForm.scoreAttribute
                      ).label
                    : "";

            this.ruleForm.scoreAttribute =
                this.getFormAmoutValidateInfo(this.ruleForm.scoreAttribute) &&
                this.getFormAmoutValidateInfo(this.ruleForm.scoreAttribute)
                    .value
                    ? this.getFormAmoutValidateInfo(
                          this.ruleForm.scoreAttribute
                      ).value
                    : "";

            console.log("changeLeft", this.ruleForm);
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
        checkTableCol(val) {
            if (
                val.scoreModelCode === "" ||
                val.scoreCardCode === "" ||
                val.scoreAttribute === "" ||
                val.scoreAttributeName === "" ||
                val.scorePercent === "" ||
                val.scorePoints === "" ||
                val.scoreAttributeDataType === "" ||
                val.conditionValue === "" ||
                val.conditionOperate === ""
            ) {
                this.$message.warning("表格内容不能为空");
                return false;
            }
        },
        clickCancel() {
            // this.$emit("closeEditDialog");
            this.$dialog.close();
        },
        //检查提交表格是否都保存了的
        isArraySave(arrayData) {
            let that = this;
            let isCompleted = true;
            for (const child of arrayData) {
                if (child.isRulesSet) {
                    isCompleted = false;
                    that.$message.warning("表格有内容尚未保存");
                    break;
                }
            }
            return isCompleted;
        },
        //提交接口
        clickConfirm() {
            // let executeExpress = null;
            let flag = true;
            if (this.tableData.length === 0) {
                return this.$message.warning("请先填写评分属性及权重");
            }
            if (!this.isArraySave(this.tableData)) {
                return;
            }

            let userInfo = JSON.parse(localStorage.getItem("user_info"));

            //根据实际情况，自己改下啊
            this.tableData.map((i) => {
                i.scoreCardModelId = this.ruleForm.scoreCardModelId;
                i.scoreCardCode = this.ruleForm.scoreCardCode;
                i.scoreModelCode = this.ruleForm.scoreModelCode; //评分模型代码
                i.scoreAttribute = this.ruleForm.scoreAttribute; // 评分属性
                i.scorePercent = this.ruleForm.scorePercent; //权重
                i.scoreAttributeName = this.ruleForm.scoreAttributeName; //名称
                i.oldScoreCardMode = this.oldScoreCardMode;
                i.scoreAttributeDataType = this.ruleForm.scoreAttributeDataType;
                i.createUser = userInfo.userCode;
                i.updateUser = userInfo.userCode;

                let executeExpress = null;
                if (this.ruleForm.scoreAttributeDataType === "String") {
                    if (
                        i.conditionOperate === "IN" ||
                        i.conditionOperate === "NOT_IN" ||
                        i.conditionOperate === "POW" ||
                        i.conditionOperate === "BETWEEN" ||
                        i.conditionOperate === "LIKE" ||
                        i.conditionOperate === "NOT_LIKE" ||
                        i.conditionOperate === "STARTSWITH" ||
                        i.conditionOperate === "NOT_STARTSWITH" ||
                        i.conditionOperate === "ENDSWITH" ||
                        i.conditionOperate === "NOT_ENDSWITH"
                    ) {
                        executeExpress = getComplexFuntionExpress(
                            i.conditionOperate,
                            i
                        );
                        if (executeExpress === "error") {
                            this.$message.warning("条件值不符合规范");
                            flag = false;
                        }
                    } else {
                        if (
                            i.conditionOperate === "" ||
                            i.conditionValue === ""
                        ) {
                            flag = false;
                            this.$message.warning("条件值不符合规范");
                        }
                        executeExpress =
                            this.ruleForm.scoreAttribute +
                            i.conditionOperate +
                            '"' +
                            i.conditionValue +
                            '"';
                    }
                } else {
                    if (
                        i.conditionOperate === "IN" ||
                        i.conditionOperate === "NOT_IN" ||
                        i.conditionOperate === "LIKE" ||
                        i.conditionOperate === "BETWEEN" ||
                        i.conditionOperate === "POW" ||
                        i.conditionOperate === "NOT_LIKE" ||
                        i.conditionOperate === "STARTSWITH" ||
                        i.conditionOperate === "NOT_STARTSWITH" ||
                        i.conditionOperate === "ENDSWITH" ||
                        i.conditionOperate === "NOT_ENDSWITH"
                    ) {
                        executeExpress = getComplexFuntionExpress(
                            i.conditionOperate,
                            i
                        );
                        if (executeExpress === "error") {
                            this.$message.warning("条件值不符合规范");
                            flag = false;
                        }
                    } else {
                        if (
                            i.conditionOperate === "" ||
                            i.conditionValue === ""
                        ) {
                            flag = false;
                            this.$message.warning("条件值不符合规范");
                        }
                        executeExpress =
                            this.ruleForm.scoreAttribute +
                            i.conditionOperate +
                            i.conditionValue;
                    }
                }
                i.executeExpress = executeExpress;
                i.isSet = false; //给后台返回数据添加`isSet`标识
                return i;
            });
            console.log("提交表格数据", this.tableData);
            console.log("flag", flag);
            //deci020105->
            if (flag) {
                this.$http
                    .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
                        servicecode:
                            "deci020211",
                        isList: true,
                        list: this.tableData,
                    })
                    .then((obj) => {
                        if (obj.code === "200") {
                            this.$message.success("成功");
                            this.$emit("closeEditDialog", this.ruleForm);
                            this.$dataBus.doCallBack(this, obj);
                        } else {
                            this.$message.warning("失败");
                        }
                    })
                    .catch((reg) => {});
            }
        },
        setConditionOperate(event) {
            console.log("eventeventeventeventevent", event);
            for (let i in this.conditionType) {
                if (this.conditionType[i].value === event) {
                    return this.conditionType[i].label;
                }
            }
        },
        //权重输入
        scorePercentInput(event, row) {
            let value = event.target.value;
            if (parseInt(value) > 100) value = "100";
            if (parseInt(value) < 0) value = "0";
            this.ruleForm.scorePercent = value;
        },
    },
};
let getComplexFuntionExpress = function (level, rowData) {
    console.log("复杂表达式");
    return complexFuntionExpressStrategies[level](rowData);
};
//= != < <= > >= 符号使用的判断式
let generalComplexFuntionExpress = function (rowData) {
    let reg = /^-?[0-9]+$/; //只能输入正负整数
    let reg2 = /^(-?[0-9]+)(\.[0-9]{1,2})?$/; //只能小数点后两位

    let regResult = reg.test(rowData.conditionValue);
    let regResult2 = reg2.test(rowData.conditionValue);

    if (rowData.scoreAttributeDataType === "String") {
        //如果条件属性为String类型的时候
        return `${rowData.scoreAttribute}${rowData.conditionOperate}"${rowData.conditionValue}"`;
    } else if (rowData.scoreAttributeDataType === "Boolean") {
        //如果条件属性为Boolean的时候
        if (
            rowData.conditionValue !== "true" &&
            rowData.conditionValue !== "false"
        ) {
            return "error";
        }
    } else if (rowData.scoreAttributeDataType === "Int") {
        //如果条件属性为Int类型的时候
        if (!regResult) {
            return "error";
        }
    } else if (rowData.scoreAttributeDataType === "Decimal") {
        //如果条件属性为Decimal类型的时候
        if (!regResult2) {
            return "error";
        }
    }
    return (
        rowData.scoreAttribute +
        rowData.conditionOperate +
        rowData.conditionValue
    );
};
let complexFuntionExpressStrategies = {
    "": function (rowData) {
        return "";
    },
    "==": function (rowData) {
        return generalComplexFuntionExpress(rowData);
    },
    "!=": function (rowData) {
        return generalComplexFuntionExpress(rowData);
    },
    ">": function (rowData) {
        return generalComplexFuntionExpress(rowData);
    },
    ">=": function (rowData) {
        return generalComplexFuntionExpress(rowData);
    },
    "<": function (rowData) {
        return generalComplexFuntionExpress(rowData);
    },
    "<=": function (rowData) {
        return generalComplexFuntionExpress(rowData);
    },
    IN: function (rowData) {
        //操作符为在...范围内
        let strRule = "include(seq.set(";
        let reg1 = /^(-?[0-9]+)(\.[0-9]{1,2})?$/; //匹配：最多两位小数的正负数值
        let reg2 = /\S+/; //任意非空字符
        let reg3 = /^-?[0-9]+$/; //任意正负整数
        let arr = rowData.conditionValue.split("|");
        if (rowData.scoreAttributeDataType === "Decimal") {
            return getIncludeExecuteExpress(strRule, reg1, arr, rowData);
        } else if (rowData.scoreAttributeDataType === "String") {
            return getIncludeExecuteExpress(strRule, reg2, arr, rowData);
        } else if (rowData.scoreAttributeDataType === "Int") {
            return getIncludeExecuteExpress(strRule, reg3, arr, rowData);
        }
    },
    NOT_IN: function (rowData) {
        let strRule = "!include(seq.set(";
        let reg1 = /^(-?[0-9]+)(\.[0-9]{1,2})?$/; //匹配：最多两位小数的正负数值
        let reg2 = /\S+/; //任意非空字符
        let reg3 = /^-?[0-9]+$/; //任意正负整数
        let arr = rowData.conditionValue.split("|");
        if (rowData.scoreAttributeDataType === "Decimal") {
            return getIncludeExecuteExpress(strRule, reg1, arr, rowData);
        } else if (rowData.scoreAttributeDataType === "String") {
            return getIncludeExecuteExpress(strRule, reg2, arr, rowData);
        } else if (rowData.scoreAttributeDataType === "Int") {
            return getIncludeExecuteExpress(strRule, reg3, arr, rowData);
        }
    },
    BETWEEN: function (rowData) {
        if (
            rowData.conditionValue.length > 0 &&
            rowData.conditionValue.search(",") !== -1
        ) {
            let arr = rowData.conditionValue.split(",");
            if (arr.length === 1 || arr.length > 2) {
                return "error";
            }
            let regStart = /^[(\[]/g; //判断是否是（[开头
            let regEnd = /[)\]]$/g; //判断是否是)] 结尾
            let regResultStart = regStart.test(rowData.conditionValue);
            let regResultEnd = regEnd.test(rowData.conditionValue);
            // console.log('BETWEEN 正则表达式---正则测试----1', regResultStart);
            // console.log('BETWEEN 正则表达式---正则测试----2', regResultEnd);
            // console.log('BETWEEN 正则表达式---正则测试----3', regResultStart && regResultEnd);
            //第一个字符串是"("或者"]""  最后一个字符串是")"或者"]"
            if (!(regResultStart && regResultEnd)) {
                return "error";
            }
            let leftSymbol = arr[0].substring(0, 1) === "(" ? ">" : ">="; //左边的符号
            let rightSymbol =
                arr[1].substring(arr[1].length - 1, arr[1].length) === ")"
                    ? "<"
                    : "<="; //右边的符号

            let leftNum = arr[0].substring(1, arr[0].length); //左边的值
            let rightNum = arr[1].substring(0, arr[1].length - 1); //右边的值

            let reg1 = /^(-?[0-9]+)(\.[0-9]{1,2})?$/; //匹配：最多两位小数的正负数值
            let reg2 = /\S+/; //任意非空字符
            let reg3 = /^-?[0-9]+$/; //任意正负整数

            if (rowData.scoreAttributeDataType === "String") {
                if (reg2.test(leftNum) && reg2.test(rightNum)) {
                    console.log(
                        `${rowData.scoreAttribute} ${leftSymbol} "${leftNum}"&&${rowData.scoreAttribute}  ${rightSymbol} "${rightNum}"`
                    );
                    return `${rowData.scoreAttribute} ${leftSymbol} "${leftNum}"&&${rowData.scoreAttribute}  ${rightSymbol} "${rightNum}"`;
                } else {
                    return "error";
                }
            } else if (rowData.scoreAttributeDataType === "Int") {
                if (reg3.test(leftNum) && reg3.test(rightNum)) {
                    console.log(
                        `${rowData.scoreAttribute} ${leftSymbol} ${leftNum} && ${rowData.scoreAttribute} ${rightSymbol} ${rightNum}`
                    );
                    return `${rowData.scoreAttribute} ${leftSymbol} ${leftNum} && ${rowData.scoreAttribute} ${rightSymbol} ${rightNum}`;
                } else {
                    return "error";
                }
            } else if (rowData.scoreAttributeDataType === "Decimal") {
                if (reg1.test(leftNum) && reg1.test(rightNum)) {
                    console.log(
                        `${rowData.scoreAttribute} ${leftSymbol} ${leftNum} && ${rowData.scoreAttribute} ${rightSymbol} ${rightNum}`
                    );
                    return `${rowData.scoreAttribute} ${leftSymbol} ${leftNum} && ${rowData.scoreAttribute} ${rightSymbol} ${rightNum}`;
                } else {
                    return "error";
                }
            }
        } else {
            return "error";
        }
    },
    POW: function (rowData) {
        let reg = /[^\d,]/g;
        let regResult = !reg.test(rowData.conditionValue);
        let temp = rowData.conditionValue.split(",");
        if (
            regResult &&
            temp.length - 1 === 1 &&
            temp[0] !== "" &&
            temp[1] !== ""
        ) {
            return `${rowData.scoreAttribute}>math.pow(${rowData.conditionValue})`;
        } else {
            return "error";
        }
    },
    LIKE: function (rowData) {
        return `(string.containsIgnoreCase(${rowData.scoreAttribute},"${rowData.conditionValue}"))`;
    },
    NOT_LIKE: function (rowData) {
        return `(!string.containsIgnoreCase(${rowData.scoreAttribute},"${rowData.conditionValue}"))`;
    },
    STARTSWITH: function (rowData) {
        return `(string.startsWith(${rowData.scoreAttribute},"${rowData.conditionValue}"))`;
    },
    NOT_STARTSWITH: function (rowData) {
        return `(!string.startsWith(${rowData.scoreAttribute},"${rowData.conditionValue}"))`;
    },
    ENDSWITH: function (rowData) {
        return `(string.endsWith(${rowData.scoreAttribute},"${rowData.conditionValue}"))`;
    },
    NOT_ENDSWITH: function (rowData) {
        return `(!string.endsWith(${rowData.scoreAttribute},"${rowData.conditionValue}"))`;
    },
};
//获取Include内置函数的可执行表达式
function getIncludeExecuteExpress(strRule, reg, arr, rowData) {
    let forStr = "";
    let flag = true;
    arr.forEach(function (value, index, array) {
        //分别对应：数组元素，元素的索引，数组本身
        if (!reg.test(value)) {
            flag = false;
        }
        if (index !== arr.length - 1) {
            if (rowData.scoreAttributeDataType !== "String") {
                forStr += value + ",";
            } else {
                forStr += `"${value}",`;
            }
        } else {
            if (rowData.scoreAttributeDataType !== "String") {
                forStr += value;
            } else {
                forStr += `"${value}"`;
            }
        }
    });
    if (!flag) {
        return "error";
    }
    console.log(strRule + forStr + ")," + rowData.scoreAttribute + ")");
    return strRule + forStr + ")," + rowData.scoreAttribute + ")";
}
</script>
<style lang="css" scoped>
.menu-form {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
}

.menu-form--title ::before {
    content: "";
    width: 3px;
    height: 22px;
    display: block;
    position: absolute;
    left: 0;
    top: 8px;
    background: #727df8;
}

.menu-footer {
    margin-top: 20px;
    text-align: center;
}

.input_el {
    width: 100%;
}

.el-table-add-row {
    margin-top: 10px;
    width: 100%;
    height: 34px;
    border: 1px dashed #c1c1cd;
    border-radius: 3px;
    cursor: pointer;
    justify-content: center;
    display: flex;
    line-height: 34px;
    margin-bottom: 20px;
}

.addBtn {
    margin-bottom: 10px;
}
</style>
