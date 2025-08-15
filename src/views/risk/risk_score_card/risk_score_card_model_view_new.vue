<template>
    <div class="page_content">
        <el-form ref="form" :model="form" label-width="100px">
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label">
                        <i class="el-icon-notebook-2"></i> 基础信息
                    </span>
                    <el-form class="table_content" ref="ruleForm" :model="ruleForm" :rules="rules">
                        <el-row span="24">
                            <el-col span="6">
                                <el-form-item label="评分卡ID " prop="scoreCardId" label-width="100px">
                                    <el-input
                                        v-model="ruleForm.scoreCardId"
                                        @blur="Input($event)"
                                        disabled
                                    ></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col span="6">
                                <el-form-item
                                    label="评分卡代码 "
                                    prop="scoreCardCode"
                                    label-width="100px"
                                >
                                    <el-input v-model="ruleForm.scoreCardCode" disabled></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col span="6">
                                <el-form-item
                                    label="评分卡名称 "
                                    prop="scoreCardName"
                                    label-width="100px"
                                >
                                    <el-input
                                        v-model="ruleForm.scoreCardName"
                                        maxlength="125"
                                        @blur="Input($event)"
                                        disabled
                                    ></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col span="6">
                                <el-form-item
                                    label="评分卡状态 "
                                    prop="scoreCardStatus"
                                    label-width="100px"
                                >
                                    <el-radio-group
                                        v-model="ruleForm.scoreCardStatus"
                                        @change="scoreCardStatusChange($event)"
                                        disabled
                                    >
                                        <el-radio label="U">未激活</el-radio>
                                        <el-radio label="Y">激活</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-col>
                        </el-row>

                        <el-row span="24">
                            <el-col>
                                <el-form-item label="备注 " prop="description" label-width="100px">
                                    <el-input
                                        class="input_el"
                                        v-model="ruleForm.description"
                                        @blur="Input($event)"
                                        type="textarea"
                                        disabled
                                        maxlength="255"
                                        rows="5"
                                        show-word-limit
                                    ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>

                <el-tab-pane>
                    <span slot="label">
                        <i class="el-icon-date"></i> 规则配置
                    </span>
                    <el-form class="table_content">
                        <el-table
                            :data="parnentTableData"
                            style="width: 100%"
                            :row-key="getRowKey"
                            border
                        >
                            <el-table-column type="expand">
                                <template slot-scope="props">
                                    <el-table
                                        :data="props.row.child"
                                        border
                                        :row-key="getRowKey"
                                        style="width:90%;margin:auto"
                                    >
                                        <el-table-column prop="conditionOperate" label="条件操作符">
                                            <template slot-scope="scope">
                                                <span>{{setConditionOperate(scope.row)}}</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column
                                            prop=" executeExpressDisplay"
                                            label="条件表达式"
                                        >
                                            <template slot-scope="scope">
                                                <span>{{ scope.row.executeExpressDisplay }}</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column prop=" scorePointsType" label="得分类型">
                                            <template slot-scope="scope">
                                                <span>{{scope.row.scorePointsType==='1'?'常量': scope.row.scorePointsType==='2'?"变量":"函数" }}</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column
                                            prop="scorePointsDisplay"
                                            label="得分"
                                            align="center"
                                        >
                                            <template slot-scope="scope">
                                                <span>{{ scope.row.scorePointsDisplay }}</span>
                                            </template>
                                        </el-table-column>

                                        <el-table-column prop="id" label="规则操作" align="center">
                                            <template slot-scope="scope">
                                                <span
                                                    class="el-tag el-tag--info el-tag--mini"
                                                    style="cursor: pointer;"
                                                    @click="handleView(scope.$index, scope.row)"
                                                >查看</span>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </template>
                            </el-table-column>

                            <el-table-column prop="scoreAttribute" label="评分属性字段">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.scoreAttribute }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="scoreAttributeName" label="评分属性名称">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.scoreAttributeName }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="scoreRuleCode" label="属性数据类型">
                                <template slot-scope="scope">
                                    <span>{{chuangvalue(scope.row.scoreAttributeDataType) }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="scorePercent" label="权重">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.scoreAttributePercent }}</span>
                                </template>
                            </el-table-column>
                        </el-table>

                        <el-row>
                            <el-col span="24">
                                <div style="width: 99.2%;  text-align: right;">
                                    <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="currentPage"
                                        :page-sizes="[10, 15, 20, 50,100]"
                                        :page-size="pageSize"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="totalSize"
                                    ></el-pagination>
                                </div>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </el-form>
    </div>
</template>


<script>
import Api from "../utils/api";
import operatorNormal from "@/views/risk/dictdata/operatorSymbolNormal"; //导入操作符正常值选项

export default {
    props: {
        cMeta: Object, //本页面模板json数据Layout对象
        cParentMeta: Object, //父页面模板json数据Layout对象
        cParentParams: Object, //父页面自定义参数与内置参数
        cParentScope: Object, //父页面每块区域业务数据
    },
    components: {
        // editTableItem
    },
    data() {
        return {
            addCount: 1,
            ruleForm: {
                scoreCardId: "", //评分卡ID
                scoreCardCode: "1", //评分卡代码
                scoreCardName: "CNY", //评分卡名称
                scoreCardStatus: "", //评分卡状态
                scoreCardType: "", //评分卡类型
                scoreAttributeDataType: "",
                description: "", //备注
                updateUser: "", //更新操作的用户
            },
            rules: {},
            isShowSaveBtn: false, //是否显示保存按钮
            editUrl: "/views/risk/risk_score_card/risk_score_card_edit.json",
            cParams: this.cParentParams,
            dataList: "",
            parnentTableData: [],
            tableData: [],
            currentPage: 1, //当前页码
            pageSize: 100, //每页条目数
            totalSize: "", //总和条目数
            // 合并的长度
            colSpanArr: [],
            // 合并开始的位置
            rowIndexArr: [],
            conditionType: [],
            needMergeArr: ["scoreRuleCode", "scoreAttribute", "scorePercent"], // 有合并项的列
            rowMergeArrs: {}, // 包含需要一个或多个合并项信息的对象
            modifyDialogVisible: false,
            addDialogVisible: false,
            modifyTableVisible: false,
            itemParams: {},
            dialogTitleName: "", //弹出对话框标题
        };
    },
    mounted() {
        this.init();
        this.getFactList();
        this.getScoreRule(this.currentPage, this.pageSize);
        this.conditionType = operatorNormal.data;
    },
    methods: {
        //选择项是否可选的判断
        switchScoreDisabled(value, leftType) {
            console.log("switchScoreDisabled", value, leftType);
            switch (value) {
                //大于..的..次方
                case "POW":
                    return leftType === "String" || leftType === "Boolen";
                //包含
                case "LIKE":
                    return leftType === "Int" || leftType === "Decimal";
                //不包含
                case "NOT_LIKE":
                    return leftType === "Int" || leftType === "Decimal";
                //开头是
                case "STARTSWITH":
                    return leftType === "Int" || leftType === "Decimal";
                //开头不是
                case "NOT_STARTSWITH":
                    return leftType === "Int" || leftType === "Decimal";
                //结尾是
                case "ENDSWITH":
                    return leftType === "Int" || leftType === "Decimal";
                //结尾不是
                case "NOT_ENDSWITH":
                    return leftType === "Int" || leftType === "Decimal";
            }
        },
        init() {
            console.log(
                "父类传过来的参数--risk_score_card_model_edit",
                this.cParams
            );
            this.ruleForm.scoreCardId = this.cParams.scoreCardId; //评分卡ID
            this.ruleForm.scoreCardCode = this.cParams.scoreCardCode; //评分卡代码
            this.ruleForm.scoreCardName = this.cParams.scoreCardName; //评分卡名称
            this.ruleForm.scoreCardStatus = this.cParams.scoreCardStatus; //评分卡状态
            this.ruleForm.scoreCardType = this.cParams.scoreCardType; //评分卡类型
            this.ruleForm.description = this.cParams.description; //备注
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
            this.updateUser = this.$store.getters.name.toString();
            let that = this;
            let ruleForm = this.ruleForm;
            if (ruleForm.scoreCardName === "") {
                return this.$message.warning("校验失败，请填写好表单");
            }
            let params = {
                scoreCardId: ruleForm.scoreCardId,
                scoreCardCode: ruleForm.scoreCardCode,
                scoreCardName: ruleForm.scoreCardName,
                scoreCardStatus: ruleForm.scoreCardStatus,
                scoreCardType: ruleForm.scoreCardType,
                description: ruleForm.description,
                updateUser: this.updateUser,
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
                    that.$dataBus.doCallBack(that, obj);
                })
                .catch((reg) => {
                    this.$message.warning("保存失败，请稍后尝试");
                });
        },
        reset() {
            this.ruleForm.scoreCardName = "";
            this.ruleForm.scoreCardStatus = "U";
            this.ruleForm.description = "";
        },

        //请求表格数据
        getScoreRule(startNum, pageSize) {
            let params = {
                scoreCardCode: this.cParams.scoreCardCode,
                start: startNum,
                length: pageSize,
                servicecode:
                    "deci020108",
                isList: true,
            };
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                    console.log("请求表格数据回调", obj);
                    this.totalSize = obj.pageParam.total;
                    obj.data.forEach((i) => {
                        i.isSet = false;
                        i.isRulesSet = false;
                        if (i.scorePointsNature) {
                            let jsonObj = JSON.parse(i.scorePointsNature);
                            if (jsonObj && jsonObj.scoreMoldText) {
                                i.scoreMoldText = jsonObj.scoreMoldText;
                            }
                        }
                        return i;
                    });
                    console.log("obj.data", obj.data);
                    this.parnentTableData = this.getParentTableData(obj.data);
                    console.log("parnentTableData", this.parnentTableData);
                    // this.tableData = obj.data
                    console.log("tableData", this.tableData);
                    this.rowMergeArrs = this.rowMergeHandle(
                        this.needMergeArr,
                        this.tableData
                    ); // 处理数据
                })
                .catch((reg) => {});
        },
        getParentTableData(data) {
            let mapParent = {};
            data.forEach((row) => {
                mapParent[row.scoreRuleId] = row;
            });
            let map = {};
            data.forEach((row) => {
                map[row.scoreAttribute] = {
                    scoreRuleId: row.scoreRuleId,
                    scoreRuleCode: row.scoreRuleCode,
                    scoreAttributePercent: row.scoreAttributePercent,
                    scoreCardCode: row.scoreCardCode,
                    scoreAttribute: row.scoreAttribute,
                    scoreAttributeName: row.scoreAttributeName,
                    scoreAttributeDataType: row.scoreAttributeDataType,
                };
            });
            let array = [];
            for (let key in map) {
                console.log("key====zmh", key);
                let obj = map[key];
                obj.id = key;
                array.push(obj);
            }
            console.log("mapParent====zmh", mapParent);
            console.log("parentArray====zmh", array);
            array = this.addChildTable(array, mapParent);

            console.log("childArray", array);
            return array;
        },
        /**
         * array:抽出来进行分组的数据，每一组选一条
         * mapparent:{scoreRuleId1:{...},scoreRuleId2:{...},scoreRuleId3:{...}}
         */
        addChildTable(array, mapParent) {
            let children = [];
            array.forEach((item) => {
                for (let key in mapParent) {
                    let obj = mapParent[key];
                    if (obj.scoreAttribute === item.scoreAttribute) {
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
        getRowKey(row) {
            return row.id;
        },
        //PTE json回调
        jsonCallBack(data) {
            console.log(data + "json模板回调回来的数据");
        },
        handleDeleteAll(index, row) {
            let params = {
                scoreAttribute: row.scoreAttribute, //评分属性
                scoreCardCode: row.scoreCardCode, //评分卡代码
                //scoreRuleCode: row.scoreRuleCode //评分规则代码
                servicecode:
                    "risk-management-service/risk-score-card-rule/del-code-attribute",
                appId: "risk-management-service",
            };
            this.$confirm("确认删除？")
                .then((_) => {
                    this.$http
                        .invokeAPI(
                            "/SUMP/riskController/riskCall",
                            "POST",
                            params
                        )
                        .then((obj) => {
                            if (obj.code === "200") {
                                this.$message.success("删除成功");
                                //刷新表格
                                this.getScoreRule(
                                    this.currentPage,
                                    this.pageSize
                                );
                            } else {
                                this.$message.warning("删除失败，请稍后尝试");
                            }
                        })
                        .catch((reg) => {});
                })
                .catch((_) => {});
        },
        handleView(index, row) {
            console.log("查看-", index, row);
            this.$dialog.open({
                that: this,
                title: "规则设置",
                toRequest: {
                    url: "@riskScoreCardModelEditEditDialog", //跳到删除确认按钮页面框
                    method: "get",
                    params: {
                        scoreCardCode: row.scoreCardCode, //评分卡代码
                        scoreRuleCode: row.scoreRuleCode, //评分模型代码
                        scoreAttribute: row.scoreAttribute, // 评分属性
                        scorePercent: row.scorePercent, //权重
                        scoreAttributeName: row.scoreAttributeName, //名称
                        oldScoreCardMode: this.oldScoreCardMode,
                        scoreAttributeDataType: row.scoreAttributeDataType, //属性数据类型

                        executeExpressNature: row.executeExpressNature, //保存条件规则json
                        scorePointsNature: row.scorePointsNature, //保存得分规则json
                        index: index, //保存得分规则json
                        openType: "view", //type add 新增 view 查看 edit 编辑
                    },
                },
                width: "90%",
            });
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
            console.log("", "新增条件");
            console.log(this.parnentTableData);
            if (this.parnentTableData.length !== 0) {
                //计算评分卡模型代码的序号：XXX_1,XXX_2,XXX_3,...
                let numberArr = new Array();
                if (
                    this.parnentTableData[0].scoreRuleCode !== undefined &&
                    this.parnentTableData[0].scoreRuleCode !== ""
                ) {
                    this.parnentTableData.forEach((item) => {
                        let split = item.scoreRuleCode.split("_");
                        numberArr.push(parseInt(split[split.length - 1]));
                    });
                }
                this.addCount = Math.max(...numberArr) + 1;
            }

            let rowNew = {
                //待修改
                scoreRuleCode:
                    this.ruleForm.scoreCardCode + "_" + this.addCount, //评分模型代码
                scoreCardCode: this.ruleForm.scoreCardCode,
                scoreAttributeDataType: "",
                scoreAttribute: "", // 评分属性
                scoreAttributePercent: "1", //权重
                status: 1,
            };
            this.itemParams = rowNew;
            // this.dialogTitleName = "新增";
            // this.modifyDialogVisible = true;
            this.showEditDialog("新增条件");
        },
        //修改
        changeTable(row, index, cg) {
            console.log("修改按钮输出", row, index, cg);
            let that = this;
            that.$dataBus.bindCallBackMethod(that, that.editDialogCallBack, {});
            that.$dialog.open({
                that: that,
                title: "修改",
                toRequest: {
                    // url: "@riskScoreCardModelEditEdit",
                    url: "@riskScoreCardModelEditEditNew",
                    method: "get",
                    params: {
                        cParentParams: that.cParentParams,
                        itemParams: row,
                    },
                },
                width: "85%",
                height: "80%",
            });
        },
        //打开评分卡编辑窗口
        showEditDialog(titleName) {
            console.log("准备打开评分卡编辑窗口");
            let that = this;
            that.$dataBus.bindCallBackMethod(that, that.editDialogCallBack, {});
            that.$dialog.open({
                that: that,
                title: titleName,
                toRequest: {
                    // url: "@riskScoreCardModelEditEdit",
                    url: "@riskScoreCardModelEditEditNew",
                    method: "get",
                    params: {
                        cParentParams: that.cParentParams,
                        itemParams: that.itemParams,
                    },
                },
                width: "85%",
                height: "80%",
            });
        },
        //评分卡编辑对话框回调方法
        editDialogCallBack(btnConfig, response) {
            //重新刷新表格数据
            this.getScoreRule(this.currentPage, this.pageSize);
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
                if (i.isSet && i.id !== row.id) {
                    this.$message.warning("请先保存当前编辑项");
                    return false;
                }
            }
            if (
                row.scoreRuleCode === "" ||
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
        chuangvalue(value) {
            console.log("chuangvalue", value);
            switch (value) {
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
            if (column.property === "scoreRuleCode") {
                return this.mergeAction("scoreRuleCode", rowIndex, column);
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
                this.getScoreRule(this.currentPage, this.pageSize);
            }
        },
        //添加规则行
        addRulesTable(row, index, cg) {
            console.log("添加规则行");
            if (this.cParams.scoreCardCode === "") {
                this.$message.warning("评分卡代码不能为空");
                return false;
            }
            for (let i of this.tableData) {
                if (i.isSet) return this.$message.warning("请先保存当前编辑项");
                scoreRuleCodeVal = i.scoreRuleCode;
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
        //设置得分公式
        setFormula(row, index, cg) {
            console.log("修改得分公式", row, index, cg);
            let that = this;
            that.$dataBus.bindCallBackMethod(that, that.dialogCallBack, {});
            that.$dialog.open({
                that: that,
                title: "设置得分公式",
                toRequest: {
                    url: "@functionSetAll",
                    method: "get",
                    params: {
                        title: "分数",
                        row,
                        index,
                        cg,
                        dataType: "Decimal",
                    },
                },
                width: "70%",
            });
        },
        //得分公式回调方法
        dialogCallBack(btnConfig, response) {},
        //修改行规则
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
                row.scoreRuleCode === "" ||
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

                executeExpress = getComplexFuntionExpress(
                    row.conditionOperate,
                    row
                );
                if (executeExpress === "error") {
                    return this.$message.warning("条件值不符合规范");
                }
                console.log("executeExpress----", executeExpress);
                let params = {
                    scoreCardCode: this.cParams.scoreCardCode, //评分卡代码
                    scoreModelId: row.scoreModelId,
                    scoreRuleCode: row.scoreRuleCode, //评分模型代码
                    scoreAttribute: row.scoreAttribute, //权重
                    conditionOperate: row.conditionOperate, //条件操作符
                    conditionValue: row.conditionValue, //条件值
                    scorePercent: row.scorePercent, //评分占比
                    scorePoints: row.scorePoints, //得分
                    executeExpress: executeExpress,
                    scoreAttributeDataType: row.scoreAttributeDataType,
                    valueNatureExpress: row.valueNatureExpress, //存得分设置的json
                    valueExpression: row.valueExpression, //存得分设置的解析
                    valueType: row.valueType, //存得分设置的解析
                    servicecode:
                        "risk-management-service/risk-score-card-model/add",
                    appId: "risk-management-service",
                };
                console.log("准备提交给后台保存的参数", params);
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
                    .catch((reg) => {});
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
                console.log("规则行取消");
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
                row.scoreRuleCode === "" ||
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
            console.log(event);
            let value = event.target.value;
            if (parseInt(value) > 1) {
                row.scorePercent = "1.0";
            } else {
                row.scorePercent = event.target.value;
            }
        },
        setConditionOperate(row) {
            let jsonRule = JSON.parse(row.executeExpressNature);
            let event = jsonRule.operatorSymbolValueShow;
            for (let i in this.conditionType) {
                if (this.conditionType[i].value === event[0]) {
                    let result = this.conditionType[i].children.find((item) => {
                        if (item.value === event[1]) {
                            return item;
                        }
                    });
                    return result.label;
                }
            }
        },

        //分页当条目控制
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.currentPage = 1;
            this.getScoreRule(this.currentPage, this.pageSize);
        },
        //分页当前页选择码选择
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
            this.getScoreRule(this.currentPage, this.pageSize);
        },
    },
};

let getComplexFuntionExpress = function (level, rowData) {
    console.log("复杂表达式", level, rowData);
    console.log(
        "返回去的东西",
        complexFuntionExpressStrategies[level](rowData)
    );
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
                    return `${rowData.scoreAttribute} ${leftSymbol} "${leftNum}"&&${rowData.scoreAttribute}  ${rightSymbol} "${rightNum}"`;
                } else {
                    return "error";
                }
            } else if (rowData.scoreAttributeDataType === "Int") {
                if (reg3.test(leftNum) && reg3.test(rightNum)) {
                    return `${rowData.scoreAttribute} ${leftSymbol} ${leftNum} && ${rowData.scoreAttribute} ${rightSymbol} ${rightNum}`;
                } else {
                    return "error";
                }
            } else if (rowData.scoreAttributeDataType === "Decimal") {
                if (reg1.test(leftNum) && reg1.test(rightNum)) {
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
            return `math.pow(${rowData.conditionValue})`;
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
.page_content {
    margin-bottom: 20px;
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
.table_content {
    padding: 3px;
    /* border: #c3c3c3 solid 0.5px; */
    margin-bottom: 10px;
}
.divBtn {
    width: 99%;
    text-align: right;
    padding-bottom: 5px;
}
.dialog-footer {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    text-align: left;
}
</style>
