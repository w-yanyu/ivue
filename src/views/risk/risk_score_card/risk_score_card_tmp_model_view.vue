<template>
    <div class="page_content">
        <el-form class="table_content" ref="ruleForm" :model="ruleForm" :rules="rules">
            <el-row>
                <el-col span="8">
                    <el-form-item label="简单评分卡代码" prop="scoreCardCode" label-width="120px" :rules="[{required: true}]">
                        <el-input class="input_el" v-model="ruleForm.scoreCardCode" disabled></el-input>
                    </el-form-item>
                </el-col>

                <el-col span="8">
                    <el-form-item label="简单评分卡名称" prop="scoreCardName" label-width="120px" :rules="[{required: true}]">
                        <el-input class="input_el" v-model="ruleForm.scoreCardName" disabled
                            @blur="Input($event)"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="8">

                    <el-form-item label="版本号 " prop="version" label-width="120px">
                        <el-input v-model="ruleForm.version" maxlength="125" disabled></el-input>
                    </el-form-item>

                </el-col>
            </el-row>
            <el-row>
                <el-col span="8">
                    <el-form-item label="服务对象" prop="serviceObject" label-width="120px">
                        <el-input class="input_el" v-model="ruleForm.serviceObject" disabled
                            @blur="Input($event)"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="8">
                      <el-form-item label="最新维护人" prop="updateUser" label-width="120px">
                        <el-select v-model="ruleForm.updateUser" placeholder="" :disabled="true">
                            <el-option v-for="item in this.userList" :key="item.user_id" :label="item.user_name"
                                :value="item.user_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <!-- <el-form-item label="最新维护人" prop="updateUser" label-width="120px">
                        <el-input class="input_el" v-model="ruleForm.updateUser" disabled @blur="Input($event)"></el-input>
                    </el-form-item> -->
                </el-col>
                <el-col span="8">
                    <el-form-item label="最新维护时间" prop="updateTime" label-width="120px">
                        <el-input class="input_el" v-model="ruleForm.updateTime" disabled @blur="Input($event)"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="8">
                    <el-form-item label="操作类型" prop="riskOperationType" label-width="120px">
                        <el-select v-model="ruleForm.riskOperationType" placeholder="请选择" :disabled="true">
                            <el-option v-for="item in this.statusList" :key="item.dictId" :label="item.dictName"
                                :value="item.dictId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col span="24">
                    <el-form-item label="备注" prop="description" label-width="120px">
                        <el-input class="input_el" v-model="ruleForm.description" disabled @blur="Input($event)"
                        maxlength="200"  type="textarea" :autosize="{ minRows: 2, maxRows: 4 }"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-table :data="parnentTableData" style="width: 100%" :row-key="getRowKey">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-table :data="props.row.child" border :row-key="getRowKey" style="width:90%;margin:auto">
                            <el-table-column prop="conditionOperate" label="条件操作符">
                                <template slot-scope="scope">
                                    <el-select size="mini" style="width: 120px; margin-right: 0px;"
                                        v-model="scope.row.conditionOperate" v-if="scope.row.isSet || scope.row.isRulesSet"
                                        :label-in-value="true">
                                        <el-option v-for="item in conditionType" :key="item.value" :label="item.label"
                                            :value="item.value"></el-option>
                                    </el-select>
                                    <span v-else>{{ setConditionOperate(scope.row.conditionOperate) }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop=" conditionValue" label="条件值">
                                <template slot-scope="scope">
                                    <el-input size="mini" v-if="scope.row.isSet || scope.row.isRulesSet"
                                        v-model="scope.row.conditionValue"></el-input>
                                    <span v-else>{{ scope.row.conditionValue }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="scorePoints" label="得分">
                                <template slot-scope="scope">
                                    <el-input-number size="mini" v-if="scope.row.isSet || scope.row.isRulesSet"
                                        v-model.number="scope.row.scorePoints" :precision="2"></el-input-number>
                                    <span v-else>{{ scope.row.scorePoints }}</span>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>

                <el-table-column prop="scoreModelCode" label="评分模型代码">
                    <template slot-scope="scope">
                        <el-input size="mini" v-if="scope.row.isSet" v-model="scope.row.scoreModelCode"></el-input>
                        <span v-else>{{ scope.row.scoreModelCode }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="scoreAttributeName" label="评分属性名称">
                    <template slot-scope="scope">
                        <el-cascader v-if="scope.row.isSet" size="mini" v-model="scope.row.scoreAttribute"
                            :options="dataList" :props="{ expandTrigger: 'hover' }" @change="changeLeft(scope)"
                            style="width: max-content"></el-cascader>
                        <span v-else>{{ scope.row.scoreAttributeName }}</span>
                    </template>
                </el-table-column>

                <el-table-column prop="scorePercent" label="权重">
                    <template slot-scope="scope">
                        <el-input-number size="mini" v-if="scope.row.isSet" v-model.number="scope.row.scorePercent"
                            :precision="2" @blur="scorePercentInput($event, scope.row)"></el-input-number>
                        <span v-else>{{ scope.row.scorePercent }}</span>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
    </div>
</template>


<script>
import Api from "../utils/api";
import MyAxios from "pte-ui/utils/MyAxios";
import editTableItem from "./risk_score_card_model_edit_edit";

export default {
    props: {
        cMeta: Object, //本页面模板json数据Layout对象
        cParentMeta: Object, //父页面模板json数据Layout对象
        cParentParams: Object, //父页面自定义参数与内置参数
        cParentScope: Object, //父页面每块区域业务数据
    },
    components: {
        editTableItem,
    },
    data() {
        return {
            addCount: 0,
            ruleForm: {
                scoreCardId: "", //评分卡ID
                scoreCardCode: "1", //评分卡代码
                scoreCardName: "CNY", //评分卡名称
                scoreCardStatus: "", //评分卡状态
                description: "", //备注
            },
            isShowSaveBtn: false, //是否显示保存按钮
            editUrl: "/views/risk/risk_score_card/risk_score_card_edit.json",
            cParams: this.cParentParams,
            dataList: "",
            parnentTableData: [],
            tableData: [],
            statusList: [], //状态列表
            // 合并的长度
            colSpanArr: [],
            // 合并开始的位置
            rowIndexArr: [],
            conditionType: [
                {
                    value: "",
                    label: "空",
                },
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
                }, {
                    value: "POW",
                    label: "大于..的..次方",
                },
            ],
            needMergeArr: ["scoreModelCode", "scoreAttribute", "scorePercent"], // 有合并项的列
            rowMergeArrs: {}, // 包含需要一个或多个合并项信息的对象
            modifyDialogVisible: false,
            addDialogVisible: false,
            modifyTableVisible: false,
            itemParams: {},
            userList:[],
        };
    },
    mounted() {
        this.init();
       // this.getUserList();
        this.getFactList();
        this.getScoreModel();
        this.getDictList("DECI_E_RISK_OPERATION_TYPE", "statusList");
    },
    methods: {
        init() {
            console.log(this.cParams);
            this.ruleForm.scoreCardId = this.cParams.scoreCardId; //评分卡ID
            this.ruleForm.scoreCardCode = this.cParams.scoreCardCode; //评分卡代码
            this.ruleForm.scoreCardName = this.cParams.scoreCardName; //评分卡名称
            this.ruleForm.scoreCardStatus = this.cParams.scoreCardStatus; //评分卡状态
            this.ruleForm.updateTime = this.cParams.updateTime; //时间
            this.ruleForm.updateUser = this.cParams.updateUser; //更新人
            this.ruleForm.description = this.cParams.description; //备注
            this.ruleForm.version = this.cParams.version; //版本号
            this.ruleForm.riskOperationType = this.cParams.riskOperationType;
            this.ruleForm.serviceObject = this.cParams.serviceObject;
        }, 
        getUserList() {
            let params = {
                servicecode:"ct2503",
                newuser_id:this.cParams.updateUser
            };
            //请求表格数据
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                    console.log("用户列表", obj);
                    this.userList = obj.data;
                })
                .catch((reg) => { });
        },
        /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
        getDictList(dictType, listKey) {
            let params = {
                dictType: dictType,
                dictKey: [dictType],
            };
            MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
                .then((res) => {
                    if (res && res.code === "200") {
                        this[listKey] = res.data;
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        //评分卡ID输入
        Input(event) {
            this.showSaveBtn();
        },
        //评分卡状态
        scoreCardStatusChange(event) {
            this.showSaveBtn();
        },
        showSaveBtn() {
            let ruleForm = this.ruleForm;
            let cParams = this.cParams;
            if (
                ruleForm.scoreCardId === cParams.scoreCardId &&
                ruleForm.scoreCardCode === cParams.scoreCardCode &&
                ruleForm.scoreCardName === cParams.scoreCardName &&
                ruleForm.scoreCardStatus === cParams.scoreCardStatus &&
                ruleForm.description === cParams.description
            ) {
                this.isShowSaveBtn = false;
            } else {
                this.isShowSaveBtn = true;
            }
        },
        //保存按钮
        saveUpData() {
            let that = this;
            let ruleForm = this.ruleForm;
            let params = {
                scoreCardId: ruleForm.scoreCardId,
                scoreCardCode: ruleForm.scoreCardCode,
                scoreCardName: ruleForm.scoreCardName,
                scoreCardStatus: ruleForm.scoreCardStatus,
                description: ruleForm.description,
                createUser: that.cParams.createUser,
                servicecode: "risk-management-service/risk-score-card/add",
                appId: "risk-management-service",
            };
            //请求表格数据
            this.$http
                .invokeAPI("/SUMP/riskController/riskCall", "POST", params)
                .then((obj) => {
                    console.log("请求表格数据回调", obj);
                    this.$message.success("保存成功");
                    this.isShowSaveBtn = false;
                })
                .catch((reg) => {
                    this.$message.warning("保存失败，请稍后尝试");
                });
        },

        //请求表格数据
        getScoreModel() {
            let params = {
                scoreCardCode: this.cParams.scoreCardCode,
                start: 1,
                length: 1000,
                servicecode:
                    "deci020209",

                isList: true,
            };
            //请求表格数据
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                    console.log("请求表格数据回调", obj);
                    obj.data.forEach((i) => {
                        i.isSet = false;
                        i.isRulesSet = false;
                        return i;
                    });
                    this.parnentTableData = this.removeOther(obj.data);
                    // this.tableData = obj.data
                    console.log("tableData", this.tableData);
                    this.rowMergeArrs = this.rowMergeHandle(
                        this.needMergeArr,
                        this.tableData
                    ); // 处理数据
                })
                .catch((reg) => { });
        },
        removeOther(data) {
            let mapParent = {};
            data.forEach((row) => {
                mapParent[row.scoreModelId] = row;
            });
            let map = {};
            data.forEach((row) => {
                map[row.scoreModelCode] = {
                    scoreModelId: row.scoreModelId,
                    scoreModelCode: row.scoreModelCode,
                    scorePercent: row.scorePercent,
                    scoreCardCode: row.scoreCardCode,
                    scoreAttribute: row.scoreAttribute,
                    scoreAttributeName: row.scoreAttributeName,
                };
            });
            let array = [];
            for (let key in map) {
                let obj = map[key];
                obj.id = key;
                array.push(obj);
            }

            array = this.addChildTable(array, mapParent);

            console.log("removeOther" + array);
            return array;
        },

        addChildTable(array, map) {
            let children = [];
            array.forEach((item) => {
                for (let key in map) {
                    let obj = map[key];
                    if (obj.scoreModelCode === item.scoreModelCode) {
                        obj.id = key;
                        children.push(obj);
                    }
                }
                item.child = children;
                children = [];
            });
            return array;
        },
        //请求评分属性选择数据
        getFactList() {
            console.log("事实");
            this.dataLeft = [];
            this.dataRight = [];
            this.rightDataLeft = [];
            //请求评分属性选择项目
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
                    servicecode: "deci080101"
                })
                .then((obj) => {
                    console.log("请求评分属性选择项目回调", obj);
                    this.dataList = obj.data;
                    this.dataLeft = obj.data;
                })
                .catch((reg) => { });
        },
        getRowKey(row) {
            return row.id;
        },
        //PTE json回调
        jsonCallBack(data) {
            console.log(data + "json模板回调回来的数据");
        },
        handleDeleteAll(index, row) {
            let params = {
                scoreModelId: row.scoreModelId,
                scoreModelCode: row.scoreModelCode, //评分模型代码
                scoreCardCode: this.cParams.scoreCardCode,
                servicecode:
                    "risk-management-service/risk-score-card-model/del-score-model-code",
                appId: "risk-management-service",
            };
            this.$http
                .invokeAPI("/SUMP/riskController/riskCall", "POST", params)
                .then((obj) => {
                    if (obj.code === "200") {
                        this.$message.success("删除成功");
                        //刷新表格
                        this.getScoreModel();
                    } else {
                        this.$message.warning("删除失败，请稍后尝试");
                    }
                })
                .catch((reg) => { });
        },
        handleDelete(index, row) {
            let params = {
                scoreModelId: row.scoreModelId,
                scoreModelCode: row.scoreModelCode, //评分模型代码
                scoreCardCode: this.cParams.scoreCardCode,
                servicecode:
                    "risk-management-service/risk-score-card-model/del",
                appId: "risk-management-service",
            };
            this.$http
                .invokeAPI("/SUMP/riskController/riskCall", "POST", params)
                .then((obj) => {
                    if (obj.code === "200") {
                        this.$message.success("删除成功");
                        this.tableData.splice(index, 1);
                    } else {
                        this.$message.warning("删除失败，请稍后尝试");
                    }
                })
                .catch((reg) => { });
        },
        //读取表格数据
        readTable() {
            //根据实际情况，自己改下啊
            this.tableData.map((i) => {
                i.isSet = false; //给后台返回数据添加`isSet`标识
                return i;
            });
        },
        addTable() {
            console.log("", "新增表格");
            console.log(this.parnentTableData);
            if (this.parnentTableData.length !== 0) {
                if (
                    this.parnentTableData[0].scoreModelCode !== undefined &&
                    this.parnentTableData[0].scoreModelCode !== ""
                ) {
                    var scoreModelCode =
                        this.parnentTableData[this.parnentTableData.length - 1]
                            .scoreModelCode;
                    var strings = scoreModelCode.split("_");
                    this.addCount = parseInt(strings[1]);
                }
            }
            this.addCount = this.addCount + 1;
            let rowNew = {
                scoreModelCode:
                    this.ruleForm.scoreCardCode + "_" + this.addCount, //评分模型代码
                scoreCardCode: this.ruleForm.scoreCardCode,
                scoreAttribute: "", // 评分属性
                scorePercent: "0", //权重
                status: 1,
                isSet: true,
            };
            this.itemParams = rowNew;
            this.modifyDialogVisible = true;
        },
        //修改
        changeTable(row, index, cg) {
            console.log("修改按钮输出", row, index, cg);
            //点击修改 判断是否已经保存所有操作
            for (let i of this.tableData) {
                if (i.isSet && i.id != row.id) {
                    this.$message.warning("请先保存当前编辑项");
                    return false;
                }
            }

            if (
                row.scoreModelCode === "" ||
                row.scoreAttribute === "" ||
                row.scorePercent === "" ||
                row.child.conditionOperate === "" ||
                row.child.conditionValue === ""
            ) {
                this.$message.warning("表格内容不能为空");
                return false;
            }

            //点击的是修改按钮，弹出修改对话框
            if (!row.isSet) {
                this.itemParams = row;
                return (this.modifyDialogVisible = true);
            }

            //提交数据
            if (row.isSet) {
                if (this.cParams.scoreCardCode === "") {
                    this.$message.warning("评分卡代码不能为空");
                    return false;
                }
                let executeExpress = null;
                if (row.scoreAttributeDataType === "String") {
                    executeExpress =
                        row.scoreAttribute +
                        row.child[0].conditionOperate +
                        '"' +
                        row.child[0].conditionValue +
                        '"';
                } else {
                    executeExpress =
                        row.scoreAttribute +
                        row.child[0].conditionOperate +
                        row.child[0].conditionValue;
                }
                let params = {
                    scoreCardCode: this.cParams.scoreCardCode, //评分卡代码
                    scoreModelId: row.scoreModelId,
                    scoreModelCode: row.scoreModelCode, //评分模型代码
                    scoreAttribute: row.scoreAttribute, //权重
                    conditionOperate: row.child[0].conditionOperate, //条件操作符
                    conditionValue: row.child[0].conditionValue, //条件值
                    scorePercent: row.scorePercent, //评分占比
                    scorePoints: row.child[0].scorePoints, //得分
                    executeExpress: executeExpress,
                    scoreAttributeDataType: row.scoreAttributeDataType,
                    servicecode:
                        "risk-management-service/risk-score-card-model/add",
                    appId: "risk-management-service",
                };
                console.log("params", params.toString());
                this.$http
                    .invokeAPI("/SUMP/riskController/riskCall", "POST", params)
                    .then((obj) => {
                        if (obj.code === "200") {
                            this.$message.success("成功");
                            console.log("score_model_add", obj);
                            row.scoreModelId = obj.data.scoreModelId;
                            console.log("添加成功后", this.tableData);
                        } else {
                            this.$message.warning("失败");
                            row.isSet = true;
                        }
                    })
                    .catch((reg) => { });
                //然后这边重新读取表格数据
                this.readTable();
                row.isSet = false;
                row.child[0].isSet = false;
            } else {
                this.readTable();
                row.isSet = true;
            }
            this.rowMergeArrs = this.rowMergeHandle(
                this.needMergeArr,
                this.tableData
            ); // 处理数据
        },
        CancelTable(row, index, cg) {
            console.log("取消行输出", row, index, cg);
            if (!row.scoreModelId) {
                this.tableData.pop(); //删除最后一行
                this.rowMergeArrs = this.rowMergeHandle(
                    this.needMergeArr,
                    this.tableData
                ); // 处理数据
                return;
            }
            //点击修改 判断是否已经保存所有操作
            for (let i of this.tableData) {
                if (i.isSet && i.id != row.id) {
                    this.$message.warning("请先保存当前编辑项");
                    return false;
                }
            }
            if (
                row.scoreModelCode === "" ||
                row.scoreAttribute === "" ||
                row.scorePercent === "" ||
                row.conditionOperate === "" ||
                row.conditionValue === ""
            ) {
                this.$message.warning("表格内容不能为空");
                return false;
            }

            //是否是取消操作
            if (!cg) {
                return (row.isSet = !row.isSet);
            }
        },
        changeLeft(val) {
            console.log("changeLeft(val)", val);
            val.row.scoreAttributeDataType =
                this.getFormAmoutValidateInfo(val.row.scoreAttribute) &&
                    this.getFormAmoutValidateInfo(val.row.scoreAttribute).dataType
                    ? this.getFormAmoutValidateInfo(val.row.scoreAttribute)
                        .dataType
                    : "";
            val.row.scoreAttribute =
                this.getFormAmoutValidateInfo(val.row.scoreAttribute) &&
                    this.getFormAmoutValidateInfo(val.row.scoreAttribute).value
                    ? this.getFormAmoutValidateInfo(val.row.scoreAttribute)
                        .value
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

        /**
         * @description 实现合并行或列
         * @param row:Object 需要合并的列name 如:'name' 'id'
         * @param column:Object 当前行的行数，由合并函数传入
         * @param rowIndex:Number 当前列的数据，由合并函数传入
         * @param columnIndex:Number 当前列的数据，由合并函数传入
         *
         * @return 函数可以返回一个包含两个元素的数组，第一个元素代表rowspan，第二个元素代表colspan。 也可以返回一个键名为rowspan和colspan的对象
         * 参考地址：https://element.eleme.cn/#/zh-CN/component/table#table-biao-ge
         */
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            // 没办法循环判断具体是那一列 所以就只好写了多个if
            if (column.property === "scoreModelCode") {
                return this.mergeAction("scoreModelCode", rowIndex, column);
            }
            if (column.property === "scoreAttribute") {
                return this.mergeAction("scoreAttribute", rowIndex, column);
            }
            if (column.property === "scorePercent") {
                return this.mergeAction("scorePercent", rowIndex, column);
            }
        },
        /**
         * @description 根据数组来确定单元格是否需要合并
         * @param val:String 需要合并的列name 如:'name' 'id'
         * @param rowIndex:Number 当前行的行数，由合并函数传入
         * @param colData:Object 当前列的数据，由合并函数传入
         *
         * @return 返回值为一个数组表示该单元格是否需要合并; 说明: [0,0]表示改行被合并了 [n+,1]n为1时表示该单元格不动,n大于1时表示合并了N-1个单元格
         */
        mergeAction(val, rowIndex, colData) {
            let _row = this.rowMergeArrs[val].rowArr[rowIndex];
            let _col = _row > 0 ? 1 : 0;
            return [_row, _col];
        },
        /**
         * @description 根据数组将指定对象转化为相应的数组
         * @param arr:Array[String] 必填 必须是字符串形式的数组
         * @param data:Array 必填 需要转化的对象
         *
         * @return 返回一个对象
         * 例：rowMerge(['name','value'], [{value:'1', name:'小明'}, {value:'2', name:'小明'}, {value:'3', name:'小明'}, {value:'1', name:'小明'}, {value:'1', name:'小明'}])
         * 返回值: {
         *          name:{
         *            rowArr: [5, 0, 0, 0, 0]
         *            rowMergeNum: 0,
         *          },
         *          value: {
         *            rowArr: [1, 1, 1, 2, 0],
         *            rowMergeNum: 3
         *          }
         *        }
         */
        rowMergeHandle(arr, data) {
            if (!Array.isArray(arr) && !arr.length) return false;
            if (!Array.isArray(data) && !data.length) return false;
            let needMerge = {};
            arr.forEach((i) => {
                needMerge[i] = {
                    rowArr: [],
                    rowMergeNum: 0,
                };
                data.forEach((item, index) => {
                    if (index === 0) {
                        needMerge[i].rowArr.push(1);
                        needMerge[i].rowMergeNum = 0;
                    } else {
                        if (item[i] === data[index - 1][i]) {
                            needMerge[i].rowArr[needMerge[i].rowMergeNum] += 1;
                            needMerge[i].rowArr.push(0);
                        } else {
                            needMerge[i].rowArr.push(1);
                            needMerge[i].rowMergeNum = index;
                        }
                    }
                });
            });
            console.log("needMerge", needMerge);
            return needMerge;
        },
        closeTableEditDialog(item) {
            this.modifyTableVisible = false;
            if (item) {
                console.log("表格新增", item);
            }
        },

        //关闭新增窗口对话框
        closeEditDialog(item) {
            this.modifyDialogVisible = false;
            if (item) {
                //重新刷新表格数据
                this.getScoreModel();
            }
        },
        //添加规则行
        addRulesTable(row, index, cg) {
            console.log("添加规则行");
            if (this.cParams.scoreCardCode === "") {
                this.$message.warning("评分卡代码不能为空");
                return false;
            }
            let scoreModelCodeVal = "";
            for (let i of this.tableData) {
                if (i.isSet) return this.$message.warning("请先保存当前编辑项");
                scoreModelCodeVal = i.scoreModelCode;
            }
            let rowNew = JSON.parse(JSON.stringify(row));

            rowNew.child[0].isRulesSet = true;

            rowNew.scoreModelId = undefined;
            // this.addDialogVisible = true
            // this.itemParams = rowNew
            // this.tableData.push(rowNew);
            this.parnentTableData.splice(index + 1, 0, rowNew);

            this.readTable();

            this.rowMergeArrs = this.rowMergeHandle(
                this.needMergeArr,
                this.tableData
            ); // 处理数据
        },
        //修改行规则
        changeRulesTable(row, index, cg) {
            console.log("修改行规则按钮输出", row, index, cg);
            //点击修改 判断是否已经保存所有操作
            for (let i of this.tableData) {
                if (i.isRulesSet && i.id != row.id) {
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
                if (this.cParams.scoreCardCode === "") {
                    this.$message.warning("评分卡代码不能为空");
                    return false;
                }
                let executeExpress = null;
                if (row.scoreAttributeDataType === "String") {
                    executeExpress =
                        row.scoreAttribute +
                        row.conditionOperate +
                        '"' +
                        row.conditionValue +
                        '"';
                } else {
                    executeExpress =
                        row.scoreAttribute +
                        row.conditionOperate +
                        row.conditionValue;
                }

                let params = {
                    scoreCardCode: this.cParams.scoreCardCode, //评分卡代码
                    scoreModelId: row.scoreModelId,
                    scoreModelCode: row.scoreModelCode, //评分模型代码
                    scoreAttribute: row.scoreAttribute, //权重
                    conditionOperate: row.conditionOperate, //条件操作符
                    conditionValue: row.conditionValue, //条件值
                    scorePercent: row.scorePercent, //评分占比
                    scorePoints: row.scorePoints, //得分
                    executeExpress: executeExpress,
                    scoreAttributeDataType: row.scoreAttributeDataType,
                    servicecode:
                        "risk-management-service/risk-score-card-model/update",
                    appId: "risk-management-service",
                };
                this.$http
                    .invokeAPI("/SUMP/riskController/riskCall", "POST", params)
                    .then((obj) => {
                        if (obj.code === "200") {
                            this.$message.success("成功");
                            row.scoreModelId = obj.data.scoreModelId;
                        } else {
                            this.$message.warning("失败");
                            row.isRulesSet = true;
                        }
                    })
                    .catch((reg) => { });
                //然后这边重新读取表格数据
                this.readTable();
                row.isRulesSet = false;
            } else {
                this.readTable();
                row.isRulesSet = true;
            }
            this.rowMergeArrs = this.rowMergeHandle(
                this.needMergeArr,
                this.tableData
            ); // 处理数
        },

        //取消行规则
        cancelRulesTable(row, index, cg) {
            console.log("规则行取消", !row.scoreModelId);
            if (!row.scoreModelId) {
                console.log("规则行取消11111111111111");
                this.tableData.splice(index, 1);
                this.rowMergeArrs = this.rowMergeHandle(
                    this.needMergeArr,
                    this.tableData
                ); // 处理数据
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
        //权重输入
        scorePercentInput(event, row) {
            let that = this;
            console.log(event);
            let value = event.target.value;
            if (parseInt(value) > 1) {
                row.scorePercent = "1.0";
            } else {
                row.scorePercent = event.target.value;
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
    },
};
</script>


<style lang="css" scoped>
.page_content {
    margin-bottom: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.table_content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 30px;
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
</style>
