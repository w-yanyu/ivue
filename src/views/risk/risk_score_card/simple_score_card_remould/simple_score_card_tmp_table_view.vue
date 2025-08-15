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
                            <el-col span="8">
                                <el-form-item label="复杂评分卡代码 " prop="scoreCardCode" label-width="120px"  :rules="[{ required: true }]">
                                    <el-input v-model="ruleForm.scoreCardCode" disabled></el-input>
                                </el-form-item>
                            </el-col>

                            <el-col span="8">
                                <el-form-item label="复杂评分卡名称 " prop="scoreCardName" label-width="120px"  :rules="[{ required: true }]">
                                    <el-input v-model="ruleForm.scoreCardName" maxlength="125" @blur="Input($event)"
                                        disabled></el-input>
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
                                 <el-form-item label="最新维护人" prop="updateUser" label-width="120px">
                                    <el-select v-model="ruleForm.updateUser" placeholder="" :disabled="true">
                                        <el-option v-for="item in this.userList" :key="item.user_id" :label="item.user_name"
                                            :value="item.user_id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <!-- <el-form-item label="最新维护人" prop="updateUser" label-width="120px">
                                    <el-input class="input_el" v-model="ruleForm.updateUser" disabled
                                        @blur="Input($event)"></el-input>
                                </el-form-item> -->
                            </el-col>
                            <el-col span="8">
                                <el-form-item label="最新维护时间" prop="updateTime" label-width="120px">
                                    <el-input class="input_el" v-model="ruleForm.updateTime" disabled
                                        @blur="Input($event)"></el-input>
                                </el-form-item>
                            </el-col>
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
                        <el-row span="24">
                            <el-col>
                                <el-form-item label="备注 " prop="description" label-width="120px">
                                    <el-input class="input_el" v-model="ruleForm.description" @blur="Input($event)"
                                        type="textarea" maxlength="255" rows="5" show-word-limit disabled></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- <el-row span="24">
                      <div class="dialog-footer">
                        <el-button type="primary" @click="saveUpData">保存</el-button>
                        <el-button @click="reset">重置</el-button>
                      </div>
                                </el-row>-->
                    </el-form>
                </el-tab-pane>

                <el-tab-pane>
                    <span slot="label">
                        <i class="el-icon-date"></i> 规则配置
                    </span>
                    <el-form class="table_content">
                        <div class="table_btn_div">
                            <el-form-item label="总分计算方式 " prop="totalExecType" label-width="100px">
                                <el-select v-model="ruleForm.totalExecType" placeholder="请选择规则类型" @change="changeTypeValue"
                                    disabled>
                                    <el-option v-for="item in totalExecTypeList" :key="item.value" :label="item.label"
                                        :value="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <el-table :data="parnentTableData" style="width: 100%" :row-key="getRowKey" border
                            :span-method="objectSpanMethod">
                            <el-table-column prop="scoreAttribute" label="属性" align="center">
                                <template slot-scope="scope" class="attributeTable">
                                    <span>{{ scope.row.scoreAttributeName }}({{ scope.row.scoreAttribute }})</span>
                                    <div class="btnDiv">
                                        <!--   <span class="el-tag el-tag--primary el-tag--mini" style="cursor: pointer;"
                              @click="handleEdit(scope.$index, scope.row)">
                              编辑
                                                </span>-->

                                        <span class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;"
                                            @click="handleView(scope.$index, scope.row)">查看</span>

                                        <!--  <span class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;"
                              @click="handleDelete(scope.$index, scope.row)">
                              删除
                                                </span>-->
                                    </div>
                                </template>
                            </el-table-column>

                            <el-table-column prop="scoreAttributePercent" label="权重" align="center" width="70%">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.scoreAttributePercent }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="itemExecuteExpress" label="条件表达式" align="center">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.itemExecuteExpress }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="itemExecuteExpressDesc" label="条件描述" align="center">
                                <template slot-scope="scope">
                                    <span>{{ scope.row.itemExecuteExpressDesc }}</span>
                                </template>
                            </el-table-column>

                            <el-table-column prop="itemScoreAttribute" label="分值" align="center">
                                <template slot-scope="scope">
                                    <span>
                                        {{ DataTypeorFormat(scope.row.itemScoreAttributeDataType) }} :
                                        {{ scope.row.itemScoreAttribute }}
                                    </span>
                                </template>
                            </el-table-column>

                            <!--  <el-table-column prop="itemScoreAttributeDataType" label="分值类型" align="center"
                        :formatter="DataTypeorFormat">
                                    </el-table-column>-->
                        </el-table>

                        <el-row>
                            <el-col span="24">
                                <div style="width: 99.2%;  text-align: right;">
                                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                        :current-page="currentPage" :page-sizes="[10, 15, 20, 50, 100]"
                                        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                                        :total="totalSize"></el-pagination>
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
import operatorNormal from "@/views/risk/dictdata/operatorSymbolNormal"; //导入操作符正常值选项
import MyAxios from "pte-ui/utils/MyAxios";
export default {
    props: {
        cMeta: Object, //本页面模板json数据Layout对象
        cParentMeta: Object, //父页面模板json数据Layout对象
        cParentParams: Object, //父页面自定义参数与内置参数
        cParentScope: Object, //父页面每块区域业务数据
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
                scoreAttributeDataType: "", //属性数据类型
                totalExecType: "0", //总分计算方式
                description: "", //备注
                updateUser: "", //更新操作的用户
                version: "", //版本号
                serviceObject:""
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
            statusList: [], //状态列表
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
            spanArr: [], //用于存放每一行记录的合并数
            totalExecTypeList: [
                {
                    value: "0",
                    label: "求和",
                },
                {
                    value: "1",
                    label: "求和的平方",
                },
                {
                    value: "2",
                    label: "求和的三次方",
                },
                {
                    value: "3",
                    label: "求和的平方根",
                },
            ], 
            userList:[],
        };
    },
    mounted() {
        this.init();
       // this.getUserList();
        this.getScoreRule(this.currentPage, this.pageSize);
        this.conditionType = operatorNormal.data;
        this.getDictList("DECI_E_RISK_OPERATION_TYPE", "statusList");
    },
    methods: {

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
        //选择项是否可选的判断
        DataTypeorFormat(itemScoreAttributeDataType) {
            // console.log('DataTypeorFormat', row.itemScoreAttributeDataType);
            let str;
            switch (itemScoreAttributeDataType) {
                //大于..的..次方
                case 1:
                    str = "常量";
                    //return "常量";
                    break;
                //包含
                case 2:
                    str = "变量";
                    //return "变量";
                    break;
                //不包含
                case 3:
                    str = "函数";
                    //return "函数";
                    break;
            }
            return str;
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
            this.ruleForm.version = this.cParams.version; //备注
            this.ruleForm.totalExecType = this.cParams.totalExecType; //总分计算方式
            this.ruleForm.riskOperationType = this.cParams.riskOperationType;
            this.ruleForm.updateTime = this.cParams.updateTime; //时间
            this.ruleForm.updateUser = this.cParams.updateUser; //更新人
            this.ruleForm.serviceObject = this.cParams.serviceObject; //更新人
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
        //评分卡ID输入
        Input(event) {
            this.showSaveBtn();
        },
        //评分卡状态
        scoreCardStatusChange(event) {
            this.showSaveBtn();
        },
        changeTypeValue(value) {
            console.log("总分计算方式", value);
            let ruleForm = this.ruleForm;
            this.updateUser = this.$store.getters.name.toString();
            let cParams = this.cParams;
            let params = {
                scoreCardId: cParams.scoreCardId,
                scoreCardCode: cParams.scoreCardCode,
                totalExecType: ruleForm.totalExecType,
                updateUser: this.updateUser,
                servicecode: "risk-management-service/risk-score-card/add",
                appId: "risk-management-service",
            };
            this.$http
                .invokeAPI("/SUMP/riskController/riskCall", "POST", params)
                .then((obj) => {
                    console.log("请求表格数据回调", obj);
                    this.$message.success("总分计算方式修改成功");
                })
                .catch((reg) => {
                    this.$message.warning("总分计算方式修改失败，请稍后尝试");
                });
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

        //请求表格数据  deci020111->deci020212
        getScoreRule(startNum, pageSize) {
            let params = {
                scoreCardCode: this.cParams.scoreCardCode,
                start: startNum,
                length: pageSize,
                servicecode:
                    "deci020212"
            };
            //请求表格数据
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                    console.log("请求表格数据回调", obj);
                    this.totalSize = obj.pageParam.total;
                    this.tidyTableData(obj.data);
                })
                .catch((reg) => { });
        },
        //整理表格数据
        tidyTableData(chaosTableData) {
            let tableData = chaosTableData;
            let newArr = [];
            for (let i = 0; i < tableData.length; i++) {
                let jsonRule = JSON.parse(tableData[i].executeExpressNature);
                // console.log('接口请求数据json解析出的对象', jsonRule);
                newArr.push({
                    ...tableData[i],
                    itemExecuteExpress: jsonRule.ifItem.itemExecuteExpress, //if的单项表达式
                    itemExecuteExpressDesc:
                        jsonRule.ifItem.itemExecuteExpressDesc, //if的单项中文表达式
                    itemScoreAttribute: jsonRule.ifItem.actionValue, //if的单项得分
                    itemScoreAttributeDataType: jsonRule.ifItem.valueType, //if的单项得分
                    numAll: i,
                });

                for (let j = 0; j < jsonRule.elseIfArray.length; j++) {
                    newArr.push({
                        ...tableData[i],
                        itemExecuteExpress:
                            jsonRule.elseIfArray[j].itemExecuteExpress, //elseif的单项表达式
                        itemExecuteExpressDesc:
                            jsonRule.elseIfArray[j].itemExecuteExpressDesc, //elseif的单项中文表达式
                        itemScoreAttribute: jsonRule.elseIfArray[j].actionValue, //elseif的单项得分
                        itemScoreAttributeDataType:
                            jsonRule.elseIfArray[j].valueType, //elseif的单项得分
                        numAll: i,
                    });
                }
                newArr.push({
                    ...tableData[i],
                    itemExecuteExpress: jsonRule.elseItem.itemExecuteExpress, //else的单项表达式
                    itemExecuteExpressDesc:
                        jsonRule.elseItem.itemExecuteExpressDesc, //else的单项中文表达式
                    itemScoreAttribute: jsonRule.elseItem.actionValue, //else的单项得分
                    itemScoreAttributeDataType: jsonRule.elseItem.valueType, //else的单项得分
                    numAll: i,
                });
            }
            console.log("tidyTableData", newArr);
            this.parnentTableData = newArr;
            this.parnentTableData = Object.assign([], this.parnentTableData); //主动刷新表格数据
            this.getSpanArr(this.parnentTableData);
        },
        getSpanArr(data) {
            this.spanArr = [];
            for (let i = 0; i < data.length; i++) {
                if (i === 0) {
                    this.spanArr.push(1);
                    this.pos = 0;
                } else {
                    // 判断当前元素与上一个元素是否相同
                    if (data[i].numAll === data[i - 1].numAll) {
                        this.spanArr[this.pos] += 1;
                        this.spanArr.push(0);
                    } else {
                        this.spanArr.push(1);
                        this.pos = i;
                    }
                }
            }
            // console.log('getSpanArr-----',this.spanArr);
        },
        //表格合并方法
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0 || columnIndex === 1) {
                const _row = this.spanArr[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                // console.log(`rowspan:${_row} colspan:${_col}`);
                return {
                    // [0,0] 表示这一行不显示， [2,1]表示行的合并数
                    rowspan: _row,
                    colspan: _col,
                };
            }
        },
        addTableRemould() {
            this.openEditeDialog("add");
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
            this.$confirm("此操作将删除该行内容, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    let params = {
                        scoreCardCode: this.cParams.scoreCardCode,
                        scoreAttribute: row.scoreAttribute,
                        servicecode:
                            "risk-management-service/risk-score-card-rule/del-code-attribute",
                        appId: "risk-management-service",
                    };
                    //请求表格数据
                    this.$http
                        .invokeAPI(
                            "/SUMP/riskController/riskCall",
                            "POST",
                            params
                        )
                        .then((obj) => {
                            console.log("删除表格回调", obj);
                            this.getScoreRule(this.currentPage, this.pageSize);
                            this.$message({
                                type: "success",
                                message: "删除成功!",
                            });
                        })
                        .catch((reg) => { });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },

        /**
         * 打开编辑对话框
         * @param {Object} type add 新增 view 查看 edit 编辑
         */
        openEditeDialog(type, index, row) {
            let that = this;
            that.$dataBus.bindCallBackMethod(
                that,
                that.simpleScoreCardDialogCallBack,
                {}
            );
            that.$dialog.open({
                that: that,
                title:
                    type === "add" ? "新增" : type === "edit" ? "编辑" : "查看",
                toRequest: {
                    url: "@scoreCardSimpleDialog",
                    method: "get",
                    params: {
                        cParentParams: that.cParentParams,
                        executeExpressNature:
                            type === "add" ? "" : row.executeExpressNature, //记录编辑页面的json
                        type,
                    },
                },
                width: "85%",
            });
        },
        //设置规则拿到的回调数据
        simpleScoreCardDialogCallBack(btnConfig, response) {
            //重新刷新表格数据
            console.log("设置规则拿到的回调数据", btnConfig, response);
            this.getScoreRule(this.currentPage, this.pageSize);
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

.attributeTable {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.btnDiv {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    color: #00aaff;
}

.table_btn_div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
