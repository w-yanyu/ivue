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
                <el-row span="24">
                    <el-col :span="6">
                        <el-form-item v-if="false" label="评分规则Id " prop="scorRuleId">
                            <el-input class="input_el" v-model="ruleForm.scoreModelId" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <!-- <el-col :span="6">
            <el-form-item v-if="false" label="评分模型代码 " prop="scoreRuleCode">
              <el-input class="input_el" v-model="ruleForm.scoreRuleCode" disabled>
              </el-input>
            </el-form-item>
                    </el-col>-->

                    <el-col :span="12">
                        <el-form-item label="评分属性名称 " prop="scoreAttribute">
                            <el-cascader
                                class="input_el"
                                v-model="ruleForm.scoreAttribute"
                                :filterable="true"
                                :options="dataList"
                                :disabled="attributeDisabledFlag"
                                :props="{ expandTrigger: 'hover' }"
                                @change="changeLeft(scope)"
                                clearable
                            ></el-cascader>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="评分属性字段 " prop="scoreAttribute">
                            <el-input class="input_el" v-model="ruleForm.scoreAttribute" disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row span="24">
                    <el-col :span="12">
                        <el-form-item label="数据类型 " prop="scoreAttributeDataType">
                            <!-- <el-input class="input_el" v-model="ruleForm.scoreAttributeDataType"  disabled="true"></el-input> -->
                            <el-input class="input_el" :value="chuangDataType" disabled="true"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="权重 " prop="scoreAttributePercent">
                            <el-input-number
                                class="input_el"
                                v-model.number="ruleForm.scoreAttributePercent"
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
                                    <span>{{setConditionOperate(scope.row)}}</span>
                                    <!--  <span>{{scope.row.conditionOperate}}</span> -->
                                </template>
                            </el-table-column>

                            <el-table-column prop=" executeExpressDisplay" label="条件表达式">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.executeExpressDisplay }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop=" scorePointsType" label="得分类型">
                                <template slot-scope="scope">
                                    <span>{{scope.row.scorePointsType =='1'?'常量': scope.row.scorePointsType =='2'?"变量":"函数" }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="scorePointsDisplay" label="得分">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.scorePointsDisplay }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="id" label="规则操作">
                                <template slot-scope="scope" v-if="!scope.row.isSet">
                                    <span
                                        class="el-tag el-tag--info el-tag--mini"
                                        style="cursor: pointer;"
                                        @click="handleView(scope.$index, scope.row)"
                                    >查看</span>

                                    <span
                                        class="el-tag el-tag--primary el-tag--mini"
                                        style="cursor: pointer;"
                                        @click="handleEdit(scope.$index, scope.row)"
                                    >修改</span>

                                    <span
                                        class="el-tag el-tag--danger el-tag--mini"
                                        style="cursor: pointer;"
                                        @click="handleDelete(scope.$index, scope.row)"
                                    >删除</span>
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
import Api from "../utils/api";
import operatorNormal from "@/views/risk/dictdata/operatorSymbolNormal"; //导入操作符正常值选项
export default {
    props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object, // 父页面的scope数据对象
        itemParams: Object,
    },
    components: {},
    data() {
        return {
            ruleForm: {
                scoreCardCode: "",
                scoreModelId: "",
                scoreRuleCode: "", //评分模型代码
                scoreAttribute: "", //属性
                scoreAttributeDataType: "", //属性类型
                scoreAttributeName: "", //属性名称
                conditionOperate: "", //条件操作符
                conditionValue: 1, //条件值
                scoreAttributePercent: 0, //评分占比
                scorePoints: 0, //得分
                status: 1,
            },
            attributeDisabledFlag: true,
            oldScoreCardMode: "",
            conditionType: [],
            dataList: "",
            lablePosition: "left",

            rules: {
                scoreRuleCode: [
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
        console.log("cParentParams", that.cParentParams);
        that.attributeDisabledFlag = that.cParentParams.attributeDisabledFlag;
        that.itemParams = that.cParentParams.itemParams;
        console.log("itemParams", that.cParentParams.itemParams);
        that.oldScoreCardMode = that.itemParams.scoreRuleCode;
        that.getFactList();
        //添加的时候给权重添加默认值
        if (that.itemParams.scoreAttributePercent === "") {
            console.log("权重：" + that.itemParams.scoreAttributePercent);
            that.itemParams.scoreAttributePercent = 1;
        }
        that.ruleForm = that.itemParams;
        console.log("that.ruleForm", that.ruleForm);
        if (
            that.itemParams.scoreAttributeDataType !== "" &&
            that.itemParams.scoreAttribute !== ""
        ) {
            that.getTableData(that);
        }
        that.conditionType = operatorNormal.data;
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
        getTableData(req) {
            // console.log("getTableData", req);
            let params = {
                scoreCardCode: this.ruleForm.scoreCardCode,
                scoreAttribute: this.ruleForm.scoreAttribute,
                servicecode:
                    "risk-management-service/risk-score-card-rule/select",
                appId: "risk-management-service",
                isList: true,
            };
            console.log("请求表格数据参数", params);
            //请求评分属性选择项目
            this.$http
                .invokeAPI("/SUMP/riskController/riskCall", "POST", params)
                .then((obj) => {
                    obj.data.forEach((map) => {
                        if (map.scorePointsNature) {
                            let jsonObj = JSON.parse(map.scorePointsNature);
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
            console.log("事实");
            this.dataLeft = [];
            this.dataRight = [];
            this.rightDataLeft = [];
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
                this.ruleForm.scorePercent === ""
            ) {
                return this.$message.warning("请先选择要操作的事实属性");
            }
            this.openEditeDialog("add");
        },
        dialogCallBack(btnConfig, response) {
            console.log("对话框待会的回调", response);
            if (response.openType === "add") {
                this.tableData.push(response);
            } else {
                this.tableData[response.index] = response;
            }
            this.tableData = Object.assign([], this.tableData); //主动刷新表格数据
            // this.tableData.unshift(rowNew); //追加到头部
        },
        /**
         * 打开编辑对话框
         * @param {Object} type add 新增 view 查看 edit 编辑
         */
        openEditeDialog(type, index, row) {
            let that = this;
            that.$dataBus.bindCallBackMethod(that, that.dialogCallBack, {});
            this.$dialog.open({
                that: this,
                title: "规则设置",
                toRequest: {
                    url: "@riskScoreCardModelEditEditDialog", //跳到删除确认按钮页面框
                    method: "get",
                    params: {
                        scoreCardCode: this.ruleForm.scoreCardCode, //评分卡代码
                        scoreRuleCode: this.ruleForm.scoreRuleCode, //评分模型代码
                        scoreAttribute: this.ruleForm.scoreAttribute, // 评分属性
                        scoreAttributePercent:
                            this.ruleForm.scoreAttributePercent, //权重
                        scoreAttributeName: this.ruleForm.scoreAttributeName, //名称
                        oldScoreCardMode: this.oldScoreCardMode,
                        scoreAttributeDataType:
                            this.ruleForm.scoreAttributeDataType, //属性数据类型

                        executeExpressNature:
                            type === "add" ? "" : row.executeExpressNature, //保存条件规则json
                        scorePointsNature:
                            type === "add" ? "" : row.scorePointsNature, //保存得分规则json
                        index: type === "add" ? "" : index, //保存得分规则json
                        openType: type, //type add 新增 view 查看 edit 编辑
                    },
                },
                width: "90%",
            });
        },
        //查看
        handleView(index, row) {
            console.log("handleView", index, row);
            this.openEditeDialog("view", index, row);
        },
        //编辑
        handleEdit(index, row) {
            console.log("handleEdit", index, row);
            this.openEditeDialog("edit", index, row);
        },
        //删除
        handleDelete(index, row) {
            console.log("handleDelete", index, row);
            this.tableData.splice(index, 1);
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

        clickCancel() {
            this.$dialog.close();
        },

        //提交接口
        clickConfirm() {
            if (this.tableData.length === 0) {
                return this.$message.warning("提交内容不能为空");
            }
            let userInfo = JSON.parse(localStorage.getItem("user_info"));
            //根据实际情况，自己改下啊
            this.tableData.map((i) => {
                i.scoreCardId = this.cParentParams.cParentParams.scoreCardId; //评分规则id
                i.scoreCardCode = this.ruleForm.scoreCardCode; //评分卡代码
                i.scoreRuleCode = this.ruleForm.scoreRuleCode; //评分规则代码
                i.scoreAttribute = this.ruleForm.scoreAttribute; // 评分属性
                i.scoreAttributePercent = this.ruleForm.scoreAttributePercent; //权重
                i.scoreAttributeName = this.ruleForm.scoreAttributeName; //名称
                i.scoreAttributeDataType = this.ruleForm.scoreAttributeDataType; //权重
                i.createUser = userInfo.userCode;
                i.updateUser = userInfo.userCode;
                return i;
            });
            console.log("提交表格数据", this.tableData);
            this.$http
                .invokeAPI("/SUMP/riskController/riskCall", "POST", {
                    servicecode:
                        "risk-management-service/risk-score-card-rule/addList",
                    appId: "risk-management-service",
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
        },
        setConditionOperate(row) {
            let jsonRule = JSON.parse(row.executeExpressNature);
            return jsonRule.operatorSymbolDesc;
            // let event = jsonRule.operatorSymbolValueShow
            // for (let i in this.conditionType) {
            //   if (this.conditionType[i].value === event[0]) {
            //     let result = this.conditionType[i].children.find(item => {
            //       if (item.value === event[1]) {
            //         return item
            //       }
            //     })
            //     return result.label
            //   }
            // }
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
    margin-bottom: 3px;
}

.addBtn {
    margin-bottom: 10px;
}
</style>
