<template>
    <div class="page_content">
        <el-form :model="ruleForm" ref="ruleForm" label-width="120px" :rules="rules">
            <el-row :span="24">
                <el-col :span="6">
                    <el-form-item label="决策表代码" prop="deci_tables_code">
                        <el-input size="medium" disabled v-model="ruleForm.deci_tables_code" />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="申请人" prop="apply_user">
                        <el-input size="medium" disabled v-model="ruleForm.apply_user" />
                    </el-form-item>
                </el-col>
          <el-row :span="24">
                <el-col :span="6">
                    <el-form-item label="审核人" prop="review_user">
                        <el-input size="medium" disabled v-model="ruleForm.review_user" />
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="操作类型" prop="deci_tables_operation_type">
                        <el-select
                            v-model="ruleForm.deci_tables_operation_type"
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
  
                <el-col :span="6">
                    <el-form-item label="审核状态" prop="review_status">
                        <el-select v-model="ruleForm.review_status" disabled>
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
                    <el-form-item label="申请时间" prop="apply_time">
                        <el-input size="medium" disabled v-model="ruleForm.apply_time"/>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="审核时间" prop="review_time">
                        <el-input size="medium" disabled v-model="ruleForm.review_time"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="24">
                <!-- 旧版本表格 -->
                <el-col
                    :span="12"
                    v-if="ruleForm.deci_tables_operation_type==='U'|| ruleForm.deci_tables_operation_type==='S'"
                >
                    <span>{{(ruleForm.deci_tables_operation_type==='A'|| ruleForm.deci_tables_operation_type==='C')?'切换前:':'旧版本:'}}</span>
                    <el-card>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="决策表名称" prop="ruleNameBefore">
                                    <el-input disabled v-model="ruleForm.ruleNameBefore" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="决策表描述" prop="ruleDescBefore">
                                    <el-input
                                        disabled
                                        type="textarea"
                                        v-model="ruleForm.ruleDescBefore"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- <el-row>
                            <el-col :span="24">
                                <el-form-item label="决策表表达式" prop="executableExpressionBefore">
                                    <template class="rule-box">
                                        <el-input
                                            class="rule-box-input"
                                            disabled
                                            type="textarea"
                                            :autosize="{ minRows: 3, maxRows: 5}"
                                            resize="none"
                                            v-model="ruleForm.executableExpressionBefore "
                                            show-word-limit
                                        />
                                        <el-button
                                            type="primary"
                                            size="small"
                                            @click="detailBefore"
                                        >详情</el-button>
                                    </template>
                                </el-form-item>
                            </el-col>
                        </el-row> -->
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="列表" prop="acitonTableDataBefore ">
                                    <template>
                                        <!-- 表格数据 -->
                                        <el-table
                                            :data="acitonTableDataBefore"
                                            style="width: 100%"
                                            :row-key="getRowKey"
                                            border
                                        >
                                            <el-table-column
                                                prop="action_type"
                                                label="类型"
                                                align="center"
                                                :formatter="DataTypeorFormat"
                                            ></el-table-column>
                                            <el-table-column
                                                prop="action_name"
                                                label="字段"
                                                align="center"
                                            ></el-table-column>
                                        </el-table>
                                    </template>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- <el-row>
                            <el-col :span="24">
                                <el-form-item label="备注" prop="descriptionBefore">
                                    <el-input
                                        disabled
                                        type="textarea"
                                        resize="none"
                                        :autosize="{ minRows: 3, maxRows: 5}"
                                        v-model="ruleForm.descriptionBefore "
                                        show-word-limit
                                        clearable
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row> -->
                    </el-card>
                </el-col>
                <!-- 新版本表格 -->
                <el-col :span="ruleForm.deci_tables_operation_type==='U'|| ruleForm.deci_tables_operation_type==='S'?12:24">
                    <span>{{ruleForm.deci_tables_operation_type==='B'?'切换后:':'新版本:'}}</span>
                    <el-card>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="决策表名称" prop="deci_tables_name_after ">
                                    <el-input disabled v-model="ruleForm.deci_tables_name_after " />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="决策表描述" prop="description_after">
                                    <el-input
                                        disabled
                                        type="textarea"
                                        v-model="ruleForm.description_after"
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- <el-row>
                            <el-col :span="24">
                                <el-form-item label="决策表表达式" prop="executableExpressionAfter ">
                                    <template class="rule-box">
                                        <el-input
                                            class="rule-box-input"
                                            disabled
                                            type="textarea"
                                            :autosize="{ minRows: 3, maxRows: 5}"
                                            resize="none"
                                            v-model="ruleForm.executableExpressionAfter "
                                            show-word-limit
                                        />
                                        <el-button
                                            type="primary"
                                            size="small"
                                            @click="detailAfter"
                                        >详情</el-button>
                                    </template>
                                </el-form-item>
                            </el-col>
                        </el-row> -->
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="列表" prop="actionTableDataAfter">
                                    <template>
                                        <!-- 表格数据 -->
                                        <el-table
                                            :data="actionTableDataAfter  "
                                            style="width: 100%"
                                            :row-key="getRowKey"
                                            border
                                        >
                                            <el-table-column
                                                prop="action_type"
                                                label="类型"
                                                align="center"
                                                :formatter="DataTypeorFormat"
                                            ></el-table-column>
                                            <el-table-column
                                                prop="action_name"
                                                label="字段"
                                                align="center"
                                            ></el-table-column>
                                        </el-table>
                                    </template>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <!-- <el-row>
                            <el-col :span="24">
                                <el-form-item label="备注" prop="descriptionAfter ">
                                    <el-input
                                        disabled
                                        type="textarea"
                                        :autosize="{ minRows: 3, maxRows: 4}"
                                        v-model="ruleForm.descriptionAfter"
                                        show-word-limit
                                        clearable
                                    />
                                </el-form-item>
                            </el-col>
                        </el-row> -->
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
                                        maxlength="200"
                                        v-model="ruleForm.reviewOpinion"
                                        show-word-limit
                                        clearable
                                    ></el-input>
                                </el-form-item>
                            </el-card>
                        </el-row>
                    </el-col>
                </div>
            </el-row>
            <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="20%"
        :before-close="handleClose"
      >
        <el-row>
          <el-col :span="24"
            ><div class="grid-content">
              <p class="aaa">是否确认审核通过</p>
            </div></el-col
          >
        </el-row>
        <span slot="footer" class="dialog-footer" >
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="clickAgree">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog
        title="提示"
        :visible.sync="dialogVisible1"
        width="20%"
        :before-close="handleClose"
      >
        <el-row>
          <el-col :span="24"
            ><div class="grid-content">
              <p class="aaa">是否确认审核退回</p>
            </div></el-col
          >
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="clickReject">确 定</el-button>
        </span>
      </el-dialog>

      <el-row class="menu-footer">
        <el-col :span="24">
          <el-button type="primary" size="small" @click="pass()"
            >通过</el-button
          >
          <el-button type="warning" size="small" @click="send()"
            >退回</el-button
          >
        </el-col>
      </el-row>
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
                review_id: "", //审核Id
                // ruleId: "", //规则ID
                deci_tables_code: "1", //决策表代码
                review_status: "", //审核状态
                review_time: "", //审核时间
                description: "", //备注
                update_user: "", //更新操作的用户
                apply_user: "", //申请人
                apply_time: "", //申请时间
                review_user: "", //审核人
                operationType: "", //操作类型
                review_opinion: "", //审核意见
                deci_tables_name_before: "", //上一版本评分卡名称
                deci_tables_name_after: "", //当前版本评分卡名称
                description_before: "", //上一版本描述
                description_after: "", //当前版本描述
                deci_tables_operation_type:"",


                natureExpressionBefore: "", //上一版本自然语言表示式
                natureExpressionAfter: "", //当前版本自然语言表达式
                executableExpressionBefore: "", //上一版本可执行规则表达式
                executableExpressionAfter: "", //当前版本可执行规则
                ruleDescBefore: "", //上一版本规则中文描述
                ruleDescAfter: "", //当前版本规则中文描述
              
            },
            rules: {
                reviewOpinion: [
                    {
                        required: true,
                        message: "请输入审批意见",
                        trigger: "blur",
                    },
                ],
            },
            dialogVisible: false,
            dialogVisible1: false,
            operationTypeOption: [],
            reviewStatusTypeOption: [],
            totalExecTypeOption: [],
            tableDataBefore: [], //用于记录旧的整理后的表格数据
            tableDataAfter: [], //用于新的整理后的表格数据
            spanArrBefore: [], //用于存放每一行记录的合并数
            spanArrAfter: [], //用于存放每一行记录的合并数
            actionTableDataAfter: [], //动作列表以前
            acitonTableDataBefore: [], //动作列表以后
        };
    },
    mounted() {
        console.log("score_card_review----父类传过来信息", this.cParentParams);
        let that = this;
        that.ruleForm.review_id = this.cParentParams.review_id;
        that.ruleForm.rule_id = this.cParentParams.rule_id;
        that.ruleForm.deci_tables_code = this.cParentParams.deci_tables_code;
        that.ruleForm.review_status = this.cParentParams.review_status;
        that.ruleForm.review_time = this.cParentParams.review_time;
        that.ruleForm.description = this.cParentParams.description;
        that.ruleForm.update_user = this.cParentParams.data_update_user;
        that.ruleForm.apply_user = this.cParentParams.apply_user;
        that.ruleForm.apply_time = this.cParentParams.apply_time;
        that.ruleForm.review_user = this.cParentParams.review_user;
        that.ruleForm.deci_tables_operation_type = this.cParentParams.deci_tables_operation_type;
        that.ruleForm.deci_tables_name_before = this.cParentParams.deci_tables_name_before;
        that.ruleForm.deci_tables_name_after = this.cParentParams.deci_tables_name_after;
        that.ruleForm.description_before = this.cParentParams.description_before;
        that.ruleForm.description_after = this.cParentParams.description_after;


        that.ruleForm.natureExpressionBefore = this.cParentParams.nature_expression_before;
        that.ruleForm.natureExpressionAfter = this.cParentParams.nature_expression_after;
        that.ruleForm.ruleDescBefore = this.cParentParams.rule_desc_before;
        that.ruleForm.ruleDescAfter = this.cParentParams.rule_desc_after;
        that.ruleForm.executableExpressionBefore = this.cParentParams.executable_expression_before;
        that.ruleForm.executableExpressionAfter = this.cParentParams.executable_expression_after;

        that.operationTypeOption = operationTypeData.data;
        that.reviewStatusTypeOption = reviewStatusData.data;
        that.totalExecTypeOption = totalExecTypeDictdata.data;
        console.log(" that.ruleForm", that.ruleForm);
        that.requestTableData();
    },
    methods: {
        //请求表格数据 deci010514
        requestTableData() {
            let that = this;
            let params = {
                review_id: that.ruleForm.reviewId,
                rule_code: that.ruleForm.ruleCode,
                servicecode:
                    "pd0214"
            };
            that.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                    console.log("请求表格数据回调", obj);
                    //规则代码
                    // that.ruleForm.descriptionBefore =
                    //     obj.data.descriptionBefore;
                    // that.ruleForm.descriptionAfter = obj.data.descriptionAfter;
                    // //规则名称
                    // that.ruleForm.ruleNameBefore = obj.data.ruleNameBefore;
                    // that.ruleForm.ruleNameAfter = obj.data.ruleNameAfter;
                    // //规则表达式json
                    // that.ruleForm.natureExpressionBefore =
                    //     obj.data.natureExpressionBefore;
                    // that.ruleForm.natureExpressionAfter =
                    //     obj.data.natureExpressionAfter;
                    // //规则表达式
                    // that.ruleForm.executableExpressionBefore =
                    //     obj.data.executableExpressionBefore;
                    // that.ruleForm.executableExpressionAfter =
                    //     obj.data.executableExpressionAfter;
                    // //规则表达式中文
                    // that.ruleForm.ruleDescBefore = obj.data.ruleDescBefore;
                    // that.ruleForm.ruleDescAfter = obj.data.ruleDescAfter;
                    // //备注
                    // that.ruleForm.descriptionBefore =
                    //     obj.data.descriptionBefore;
                    // that.ruleForm.descriptionAfter = obj.data.descriptionAfter;
                    // 动作列表
                    that.actionTableDataAfter = obj.data[0].decisionActionAfter;
                    that.acitonTableDataBefore = obj.data[0].decisionActionBefore;
                })
                .catch((res) => {});
        },
        //审核通过
        clickAgree() {
            let that = this;
            let userInfo = JSON.parse(localStorage.getItem("user_info"));
            let params = {
                review_id: that.ruleForm.reviewId,
                deci_tables_code: that.ruleForm.deci_tables_code,
                deci_tables_operation_type: that.ruleForm.deci_tables_operation_type,
                review_opinion: that.ruleForm.reviewOpinion,
                reviewUser: userInfo.userCode,
                servicecode:
                    "deci020411"
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
                .catch((res) => {
                    console.log("错误信息：", res);
                    this.$message({
                        message: "审核失败,请稍后重试！",
                        type: "error",
                    });
                });
        },
        //审核拒绝
        clickReject() {
            let that = this;
            let userInfo = JSON.parse(localStorage.getItem("user_info"));
            let params = {
                review_id: that.ruleForm.reviewId,
                deci_tables_code: that.ruleForm.deci_tables_code,
                deci_tables_operation_type: that.ruleForm.deci_tables_operation_type,
                review_opinion: that.ruleForm.reviewOpinion,
                reviewUser: userInfo.userCode,
                servicecode:
                    "deci020412"
            };
            that.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                    this.$message({
                        message: "审核退回成功！",
                        type: "success",
                    });
                    this.$dataBus.doCallBack(this, params);
                })
                .catch((res) => {});
        },
        //查看
        detailBefore() {
            this.openEditeDialog("before");
        },
        detailAfter() {
            this.openEditeDialog("after");
        },
        openEditeDialog(type) {
            let that = this;
            let json =
                type === "before"
                    ? that.ruleForm.natureExpressionBefore
                    : that.ruleForm.natureExpressionAfter;
            let displayExpression =
                type === "before"
                    ? that.ruleForm.executableExpressionBefore
                    : that.ruleForm.executableExpressionAfter;
            let ruleContentDesc =
                type === "before"
                    ? that.ruleForm.ruleDescBefore
                    : that.ruleForm.ruleDescAfter;
            that.$dialog.open({
                that: that,
                title: "决策表表达式详情",
                toRequest: {
                    url: "@decisionRuleDetails",
                    method: "get",
                    params: {
                        natureExpression: json,
                        ruleContentDesc,
                        displayExpression,
                    },
                },
                width: "85%",
            });
        },
        //选择项是否可选的判断
        DataTypeorFormat(row) {
            console.log("DataTypeorFormat", row.action_type);
            let str;
            switch (row.action_type) {
                case "1":
                    str = "插入";
                    break;
                case "2":
                    str = "更新";
                    break;
                case "3":
                    str = "删除";
                    break;
            }
            return str;
        },
        /**
         *通过
         */
         pass(){
             this.$refs.ruleForm.validate(valid => {
                            if(this.ruleForm.reviewOpinion === false){
             this.$message({
              type: 'error',
              message:  "请输入审核意见!"
              });
              return ;
                  }
                 if(valid){
                    this.$confirm("是否通过审核?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              this.clickAgree()
            }).catch(err => {
                console.error(err);
              })
                 }
             })

         },
                 /**
         *退回
         */
         send(){
             this.$refs.ruleForm.validate(valid => {
                           if(this.ruleForm.reviewOpinion === false){
             this.$message({
              type: 'error',
              message:  "请输入审核意见!"
              });
              return ;
                  }
                 if(valid){
                     this.dialogVisible1 = true
                 }
             })

         }
    },
};
</script>
<style lang="less" scoped>
.menu-footer {
    margin-top: 20px;
    text-align: center;
}
.rule-box {
    display: flex;
    align-items: center;
    text-align: center;
}
.rule-box-input {
    width: 85%;
}
/deep/.el-dialog{
 min-height:0px !important
} 

/deep/.el-dialog__footer{
  text-align: center  !important
}
.aaa {
  text-align: center;
  font-size: 20px;
}
</style>
