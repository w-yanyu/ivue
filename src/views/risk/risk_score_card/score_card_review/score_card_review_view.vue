<template>
    <div class="page_content">
        <el-form :model="ruleForm" ref="ruleForm" label-width="80px" :rules="rules">
            <el-row :span="24">
                <el-col :span="6">
                    <el-form-item label="复杂评分卡代码" prop="scoreCardCode">
                        <el-input size="medium" disabled v-model="ruleForm.scoreCardCode" />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="申请人" prop="applyUser">
                        <el-input size="medium" disabled v-model="ruleForm.applyUser" />
                    </el-form-item>
                </el-col>
                                <el-col :span="6">
                    <el-form-item label="审核人" prop="reviewUser">
                        <el-input size="medium" disabled v-model="ruleForm.reviewUser" />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="操作类型" prop="operationType">
                        <el-select
                            v-model="ruleForm.operationType"
                            @change="changeStatusValue"
                            disabled
                        >
                            <el-option
                                v-for="item in operationTypeOption"
                                :key="item.dictId"
                                :label="item.dictName"
                                :value="item.dictId"
                                disabled
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :span="24">

                <el-col :span="6">
                    <el-form-item label="审核状态" prop="reviewStatus">
                        <el-select v-model="ruleForm.reviewStatus" disabled>
                            <el-option
                                v-for="item in reviewStatusTypeOption"
                                :key="item.dictId"
                                :label="item.dictName"
                                :value="item.dictId"
                                disabled
                            />
                        </el-select>
                    </el-form-item>
                </el-col>
                                <el-col :span="6">
                    <el-form-item label="申请时间" prop="applyTime">
                        <el-input size="medium" disabled v-model="ruleForm.applyTime"/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="审核时间" prop="reviewTime">
                        <el-input size="medium" disabled v-model="ruleForm.reviewTime"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <!-- 旧版本表格 -->
                <el-col
                    :span="12"
                    v-if="ruleForm.operationType==='U'|| ruleForm.operationType==='S'"
                >
                    <span>{{(ruleForm.operationType==='A'|| ruleForm.operationType==='C')?'切换前:':'旧版本:'}}</span>
                    <el-card>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="评分卡名称" prop="scoreCardNameBefore">
                                    <el-input
                                        v-model="ruleForm.scoreCardNameBefore"
                                        clearable
                                        disabled
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item
                                    label="总分计算类型"
                                    prop="totalExecTypeBefore"
                                    label-width="100px"
                                >
                                    <el-select
                                        v-model="ruleForm.totalExecTypeBefore"
                                        placeholder
                                        disabled
                                    >
                                        <el-option
                                            v-for="item in totalExecTypeOption"
                                            :key="item.dictId"
                                            :label="item.dictName"
                                            :value="item.dictId"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="描述" prop="descriptionBefore">
                                    <el-input
                                        type="textarea"
                                        :autosize="{ minRows: 3, maxRows: 4}"
                                        v-model="ruleForm.descriptionBefore"
                                        show-word-limit
                                        clearable
                                        disabled
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <!-- 表格数据 -->
                            <el-table
                                :data="tableDataBefore"
                                style="width: 100%"
                                :row-key="getRowKey"
                                border
                                :span-method="objectSpanMethodBefore"
                            >
                                <el-table-column prop="scoreAttribute" label="属性" align="center">
                                    <template slot-scope="scope" class="attributeTable">
                                        <span>{{scope.row.scoreAttributeName}}({{ scope.row.scoreAttribute }})</span>
                                        <div class="btnDiv">
                                            <span
                                                class="el-tag el-tag--info el-tag--mini"
                                                style="cursor: pointer;"
                                                @click="handleView(scope.$index, scope.row)"
                                            >详情</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="scoreAttributePercent"
                                    label="权重"
                                    align="center"
                                    width="70%"
                                >
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.scoreAttributePercent }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="itemExecuteExpressDesc"
                                    label="条件描述"
                                    align="center"
                                >
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.itemExecuteExpressDesc }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="itemScoreAttributeDataType"
                                    label="分值"
                                    align="center"
                                >
                                    <template slot-scope="scope">
                                        <span>{{DataTypeorFormat( scope.row.itemScoreAttributeDataType)}}:{{ scope.row.itemScoreAttribute }}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-row>
                    </el-card>
                </el-col>
                <!-- 新版本表格 -->
                <el-col :span="ruleForm.operationType==='U'|| ruleForm.operationType==='S'?12:24">
                    <span>{{ruleForm.operationType==='B'?'切换后:':'新版本:'}}</span>
                    <el-card>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="复杂评分卡名称" prop="scoreCardNameAfter">
                                    <el-input
                                        v-model="ruleForm.scoreCardNameAfter"
                                        clearable
                                        disabled
                                    />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item
                                    label="总分计算类型"
                                    prop="totalExecTypeAfter"
                                    label-width="100px"
                                >
                                    <el-select
                                        v-model="ruleForm.totalExecTypeAfter"
                                        placeholder
                                        disabled
                                    >
                                        <el-option
                                            v-for="item in totalExecTypeOption"
                                            :key="item.dictId"
                                            :label="item.dictName"
                                            :value="item.dictId"
                                        ></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="复杂评分卡描述" prop="descriptionAfter">
                                    <el-input
                                        type="textarea"
                                        :autosize="{ minRows: 3, maxRows: 4}"
                                        v-model="ruleForm.descriptionAfter"
                                        show-word-limit
                                        clearable
                                        disabled
                                    ></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <!-- 表格数据 -->
                            <el-table
                                :data="tableDataAfter"
                                style="width: 100%"
                                :row-key="getRowKey"
                                border
                                :span-method="objectSpanMethodAfter"
                            >
                                <el-table-column prop="scoreAttribute" label="属性" align="center">
                                    <template slot-scope="scope" class="attributeTable">
                                        <span>{{scope.row.scoreAttributeName}}({{ scope.row.scoreAttribute }})</span>
                                        <div class="btnDiv">
                                            <span
                                                class="el-tag el-tag--info el-tag--mini"
                                                style="cursor: pointer;"
                                                @click="handleView(scope.$index, scope.row)"
                                            >详情</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="scoreAttributePercent"
                                    label="权重"
                                    align="center"
                                    width="70%"
                                >
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.scoreAttributePercent }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="itemExecuteExpressDesc"
                                    label="条件描述"
                                    align="center"
                                >
                                    <template slot-scope="scope">
                                        <span>{{ scope.row.itemExecuteExpressDesc }}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="itemScoreAttributeDataType"
                                    label="分值"
                                    align="center"
                                >
                                    <template slot-scope="scope">
                                        <span>{{DataTypeorFormat( scope.row.itemScoreAttributeDataType)}}:{{ scope.row.itemScoreAttribute }}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-row>
                    </el-card>
                </el-col>
                <div>
                    <el-col :gutter="24">
                        <el-row :span="24">
                            <el-card>
                                <el-form-item label="审核意见" prop="reviewOpinion">
                                    <el-input
                                        type="textarea"
                                        :autosize="{ minRows: 3, maxRows: 4}"
                                        maxlength="500"
                                        v-model="ruleForm.reviewOpinion"
                                        show-word-limit
                                        disabled
                                    ></el-input>
                                </el-form-item>
                            </el-card>
                        </el-row>
                    </el-col>
                </div>
            </el-row>
            <!-- <el-row class="menu-footer">
        <el-col :span="24">
          <el-button type="primary" size="small" @click="clickAgree">通过</el-button>
          <el-button type="primary" size="small" @click="clickReject">退回</el-button>
        </el-col>
            </el-row>-->
        </el-form>
    </div>
</template>

<script>
import operationTypeData from "@/views/risk/dictdata/operationType"; //操作类型
import reviewStatusData from "@/views/risk/dictdata/scoreCardReviewStatus"; //审核类型
import totalExecTypeDictdata from "@/views/risk/dictdata/totalExecType.json"; //总分计算类型

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
                reviewId: "", //审核Id
                scoreCardId: "", //评分卡ID
                scoreCardCode: "1", //评分卡代码
                reviewStatus: "", //评分卡状态 审核状态
                reviewTime: "", //审核时间
                totalExecType: "0", //总分计算方式
                description: "", //备注
                updateUser: "", //更新操作的用户
                applyUser: "", //申请人
                applyTime: "", //申请时间
                reviewUser: "", //审核人
                operationType: "", //操作类型
                status: "",
                reviewOpinion: "", //审核意见
                descriptionBefore: "", //上一版本描述
                descriptionAfter: "", //当前版本描述
                scoreCardNameBefore: "", //上一版本评分卡名称
                scoreCardNameAfter: "", //当前版本评分卡名称
                totalExecTypeBefore: "", //上一版本总分计算类型
                totalExecTypeAfter: "", //当前版本总分计算类型
            },
            rules: {
                scoreCardId: [
                    {
                        required: true,
                        message: "该控件必填",
                        trigger: "blur",
                    },
                ],
                scoreCardName: [
                    {
                        required: true,
                        message: "请填写评分卡名称",
                        trigger: "blur",
                        max: 125,
                    },
                ],
                description: [
                    {
                        max: 255,
                    },
                ],
            },
            operationTypeOption: [],
            reviewStatusTypeOption: [],
            totalExecTypeOption: [],
            tableDataBefore: [], //用于记录旧的整理后的表格数据
            tableDataAfter: [], //用于新的整理后的表格数据
            spanArrBefore: [], //用于存放每一行记录的合并数
            spanArrAfter: [], //用于存放每一行记录的合并数
        };
    },
    mounted() {
        console.log("score_card_review----父类传过来信息", this.cParentParams);
        let that = this;
        that.ruleForm.reviewId = this.cParentParams.reviewId;
        that.ruleForm.scoreCardId = this.cParentParams.scoreCardId;
        that.ruleForm.scoreCardCode = this.cParentParams.scoreCardCode;
        that.ruleForm.reviewStatus = this.cParentParams.reviewStatus;
        that.ruleForm.reviewTime = this.cParentParams.reviewTime;
        that.ruleForm.totalExecType = this.cParentParams.totalExecType;
        that.ruleForm.description = this.cParentParams.description;
        that.ruleForm.updateUser = this.cParentParams.updateUser;
        that.ruleForm.applyUser = this.cParentParams.applyUser;
        that.ruleForm.applyTime = this.cParentParams.applyTime;
        that.ruleForm.reviewUser = this.cParentParams.reviewUser;
        that.ruleForm.operationType = this.cParentParams.operationType;
        that.ruleForm.status = this.cParentParams.status;
        that.ruleForm.reviewOpinion = this.cParentParams.reviewOpinion;
        that.operationTypeOption = operationTypeData.data;
        that.reviewStatusTypeOption = reviewStatusData.data;
        that.totalExecTypeOption = totalExecTypeDictdata.data;
        console.log(" that.ruleForm", that.ruleForm);
        that.requestTableData();
    },
    methods: {
        //请求表格数据
        requestTableData() {
            let that = this;
            let params = {
                reviewId: that.ruleForm.reviewId,
                scoreCardCode: that.ruleForm.scoreCardCode,
                servicecode:
                    "deci020116",
                
                isList: true,
            };
            that.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                    that.ruleForm.descriptionBefore =
                        obj.data[0].descriptionBefore;
                    that.ruleForm.descriptionAfter = 
                    obj.data[0].descriptionAfter;
                    that.ruleForm.scoreCardNameBefore =
                        obj.data[0].scoreCardNameBefore;
                    that.ruleForm.scoreCardNameAfter =
                        obj.data[0].scoreCardNameAfter;
                    that.ruleForm.totalExecTypeBefore =
                        obj.data[0].totalExecTypeBefore;
                    that.ruleForm.totalExecTypeAfter =
                        obj.data[0].totalExecTypeAfter;
                    console.log("score_card_review_info", obj);
                    let chaosTableDataAfter = obj.data[0].scoreCardRuleListAfter;
                    let chaosTableDataBefore = obj.data[0].scoreCardRuleListBefore;
                    that.tidyTableData("after", chaosTableDataAfter);
                    that.tidyTableData("before", chaosTableDataBefore);
                })
                .catch((res) => {});
        },
        //审核通过
        clickAgree() {
            let that = this;
            let userInfo = JSON.parse(localStorage.getItem("user_info"));
            let params = {
                reviewId: that.ruleForm.reviewId,
                scoreCardCode: that.ruleForm.scoreCardCode,
                operationType: that.ruleForm.operationType,
                reviewOpinion: that.ruleForm.reviewOpinion,
                reviewUser: userInfo.userCode,
                servicecode:
                    "deci020118"
                
            };
            that.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                    this.$message({
                        message: "审核通过成功！",
                        type: "success",
                    });
                    this.$dataBus.doCallBack(this, params);
                })
                .catch((res) => {});
        },
        //审核拒绝
        clickReject() {
            let that = this;
            let userInfo = JSON.parse(localStorage.getItem("user_info"));
            let params = {
                reviewId: that.ruleForm.reviewId,
                scoreCardCode: that.ruleForm.scoreCardCode,
                operationType: that.ruleForm.operationType,
                reviewOpinon: that.ruleForm.reviewOpinion,
                reviewUser: userInfo.userCode,
                servicecode:
                    "deci020117"
                
            };
            that.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                    this.$message({
                        message: "审核拒绝成功！",
                        type: "success",
                    });
                    this.$dataBus.doCallBack(this, params);
                })
                .catch((res) => {});
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
        //整理表格数据
        tidyTableData(type, chaosTableData) {
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
            if (type === "after") {
                this.tableDataAfter = newArr;
                this.tableDataAfter = Object.assign([], this.tableDataAfter); //主动刷新表格数据
                this.getSpanArrAfter(this.tableDataAfter);
            } else {
                this.tableDataBefore = newArr;
                this.tableDataBefore = Object.assign([], this.tableDataBefore); //主动刷新表格数据
                this.getSpanArrBefore(this.tableDataBefore);
            }
        },
        getSpanArrAfter(data) {
            this.spanArrAfter = [];
            for (let i = 0; i < data.length; i++) {
                if (i === 0) {
                    this.spanArrAfter.push(1);
                    this.posAfter = 0;
                } else {
                    // 判断当前元素与上一个元素是否相同
                    if (data[i].numAll === data[i - 1].numAll) {
                        this.spanArrAfter[this.posAfter] += 1;
                        this.spanArrAfter.push(0);
                    } else {
                        this.spanArrAfter.push(1);
                        this.posAfter = i;
                    }
                }
            }
        },
        getSpanArrBefore(data) {
            this.spanArrBefore = [];
            for (let i = 0; i < data.length; i++) {
                if (i === 0) {
                    this.spanArrBefore.push(1);
                    this.posBefore = 0;
                } else {
                    // 判断当前元素与上一个元素是否相同
                    if (data[i].numAll === data[i - 1].numAll) {
                        this.spanArrBefore[this.posBefore] += 1;
                        this.spanArrBefore.push(0);
                    } else {
                        this.spanArrBefore.push(1);
                        this.posBefore = i;
                    }
                }
            }
        },
        //表格合并方法
        objectSpanMethodAfter({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0 || columnIndex === 1) {
                const _row = this.spanArrAfter[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                // console.log(`rowspan:${_row} colspan:${_col}`);
                return {
                    // [0,0] 表示这一行不显示， [2,1]表示行的合并数
                    rowspan: _row,
                    colspan: _col,
                };
            }
        },
        //表格合并方法
        objectSpanMethodBefore({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0 || columnIndex === 1) {
                const _row = this.spanArrBefore[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    // [0,0] 表示这一行不显示， [2,1]表示行的合并数
                    rowspan: _row,
                    colspan: _col,
                };
            }
        },
        //查看
        handleView(index, row) {
            console.log("handleView", index, row);
            this.openEditeDialog("view", index, row);
        },
        /**
         * 打开编辑对话框
         * @param {Object} type add 新增 view 查看 edit 编辑
         */
        openEditeDialog(type, index, row) {
            let that = this;
            that.$dialog.open({
                that: that,
                title:
                    type === "add" ? "新增" : type === "edit" ? "编辑" : "查看",
                toRequest: {
                    url: "@scoreCardSimpleDialog",
                    method: "get",
                    params: {
                        row,
                        cParentParams: that.cParentParams,
                        executeExpressNature:
                            type === "add" ? "" : row.executeExpressNature, //记录编辑页面的json
                        type,
                    },
                },
                width: "85%",
            });
        },
    },
};
</script>

<style scoped>
.menu-footer {
    margin-top: 20px;
    text-align: right;
}
</style>
