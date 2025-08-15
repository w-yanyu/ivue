<template>
    <div class="page_content">
        <el-form :model="ruleForm" ref="ruleForm" label-width="120px" :rules="rules">
            <el-row :span="24">
                <el-col :span="6">
                    <el-form-item label="规则树代码" prop="treeCode">
                        <el-input size="medium" disabled v-model="ruleForm.treeCode" />
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
                        <DecisionTreeBefore
                            ref="decisionTreeBefore"
                            @add="addStock"
                            @delete="deleteStock"
                            @checkView="checkView"
                            @setActionList="setActionList"
                            :isUseMiniMap="false"
                            setHeight="300"
                        ></DecisionTreeBefore>
                    </el-card>
                </el-col>
                <el-col :span="ruleForm.operationType==='U'|| ruleForm.operationType==='S'?12:24">
                    <span>{{ruleForm.operationType==='B'?'切换后:':'新版本:'}}</span>
                    <el-card>
                        <DecisionTreeAfter
                            ref="decisionTreeAfter"
                            @add="addStock"
                            @delete="deleteStock"
                            @checkView="checkView"
                            @setActionList="setActionList"
                            :isUseMiniMap="false"
                            setHeight="300"
                        ></DecisionTreeAfter>
                    </el-card>
                </el-col>
                <el-col :span="24" v-if="ruleForm.operationType =='D'">
                    <span>待删除:</span>
                    <el-card>
                        <DecisionTreeAfter
                            ref="decisionTreeAfter"
                            @add="addStock"
                            @delete="deleteStock"
                            @checkView="checkView"
                            @setActionList="setActionList"
                            :isUseMiniMap="false"
                            setHeight="300"
                        ></DecisionTreeAfter>
                    </el-card>
                </el-col>
            </el-row>
            <el-row>
                <el-col>
                    <el-row :span="24">
                        <el-card>
                            <el-form-item label="审核意见" prop="reviewOpinion">
                                <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 3, maxRows: 4}"
                                    disabled
                                    maxlength="500"
                                    v-model="ruleForm.reviewOpinion"
                                    show-word-limit
                                    clearable
                                ></el-input>
                            </el-form-item>
                        </el-card>
                    </el-row>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import operationTypeData from "@/views/risk/dictdata/operationType"; //操作类型
import reviewStatusData from "@/views/risk/dictdata/scoreCardReviewStatus"; //审核类型
import DecisionTreeBefore from "@/components/DecisionTreeBefore.vue";
import DecisionTreeAfter from "@/components/DecisionTreeView.vue";

export default {
    props: {
        cMeta: Object, //本页面模板json数据Layout对象
        cParentMeta: Object, //父页面模板json数据Layout对象
        cParentParams: Object, //父页面自定义参数与内置参数
        cParentScope: Object, //父页面每块区域业务数据
    },
    components: {
        DecisionTreeBefore,
        DecisionTreeAfter,
    },
    data() {
        return {
            addCount: 1,
            treeDataBefore: "", //上一生效版本规则树
            treeDataAfter: "", //当前版本规则树
            ruleForm: {
                reviewId: "", //审核Id
                treeId: "", //规则树ID
                treeCode: "", //规则树代码
                treeName: "", //规则树名称
                treeDesc: "", //规则树描述
                nodeType: "", //节点类型（3：根节点，2：分支节点，1：叶子节点）
                reviewStatus: "", //审核状态
                applyUser: "", //申请人
                applyTime: "", //申请时间
                reviewUser: "", //审核人
                reviewTime: "", //审核时间
                operationType: "", //操作类型
                reviewOpinion: "", //审核意见
            },
            rules: {},
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
        console.log("rule_tree_review----父类传过来信息", this.cParentParams);
        let that = this;
        that.ruleForm.reviewId = this.cParentParams.review_id;
        that.ruleForm.treeId = this.cParentParams.tree_id;
        that.ruleForm.treeCode = this.cParentParams.tree_code;
        that.ruleForm.treeName = this.cParentParams.tree_name;
        that.ruleForm.treeDesc = this.cParentParams.tree_desc;
        that.ruleForm.reviewStatus = this.cParentParams.review_status;
        that.ruleForm.reviewTime = this.cParentParams.review_time;
        that.ruleForm.applyUser = this.cParentParams.apply_user;
        that.ruleForm.reviewUser = this.cParentParams.review_user;
        that.ruleForm.applyTime = this.cParentParams.apply_time;
        that.ruleForm.operationType = this.cParentParams.operation_type;
        that.ruleForm.reviewOpinion = this.cParentParams.review_opinion;
        that.operationTypeOption = operationTypeData.data;
        that.reviewStatusTypeOption = reviewStatusData.data;
        console.log(" that.ruleForm", that.ruleForm);
        that.requestruleTreeData();
    },
    methods: {
        //请求规则树数据
        requestruleTreeData() {
            let that = this;
            let params = {
                tree_id: that.cParentParams.tree_id,
                tree_code: that.cParentParams.tree_code,
                review_id: that.cParentParams.review_id,
                operation_type: that.cParentParams.operation_type,
                servicecode:
                    "deci040107"
            };
            //获取规则树
            that.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                    that.treeDataAfter = obj.data.ruleTreesAfter;
                    that.treeDataBefore = obj.data.ruleTreesBefore;
                    that.treeDataAfter = that.initData(that.treeDataAfter);
                    if (that.treeDataBefore != null) {
                        that.treeDataBefore = that.initData(
                            that.treeDataBefore
                        );
                    }
                    that.$nextTick(() => {
                        //nextTick里面的代码会在DOM更新后执行
                        console.log("决策树组件", that.$refs);
                        if (that.$refs.decisionTreeBefore) {
                            //调用decisionTree组件（DecisionTree.vue）中的renderTreeData方法，
                            that.$refs.decisionTreeBefore.renderTreeData(
                                that.treeDataBefore
                            );
                        }
                        if (that.$refs.decisionTreeAfter) {
                            //调用decisionTree组件（DecisionTree.vue）中的renderTreeData方法，
                            that.$refs.decisionTreeAfter.renderTreeData(
                                that.treeDataAfter
                            );
                        }
                    });
                })
                .catch((reg) => {});
        },
        initData(data) {
            data.collapsed = false;
            data.rate = 1.0;
            if (data.children && data.children.length > 0) {
                data.children.forEach((item, index, arrs) => {
                    this.initData(item);
                });
            }
            console.log("整理完的数据data", data);
            return data;
        },
        //审核通过
        clickAgree() {
            let that = this;
            let userInfo = JSON.parse(localStorage.getItem("user_info"));
            let params = {
                reviewId: that.ruleForm.reviewId,
                treeCode: that.ruleForm.treeCode,
                treeId: that.ruleForm.treeId,
                operationType: that.ruleForm.operationType,
                reviewOpinion: that.ruleForm.reviewOpinion,
                reviewUser: userInfo.userCode,
                servicecode:
                    "risk-management-service/risk-rule-tree-review/check-agree",
                appId: "risk-management-service",
            };
            that.$http
                .invokeAPI("/SUMP/riskController/riskCall", "POST", params)
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
                treeCode: that.ruleForm.treeCode,
                treeId: that.ruleForm.treeId,
                operationType: that.ruleForm.operationType,
                reviewOpinion: that.ruleForm.reviewOpinion,
                reviewUser: userInfo.userCode,
                servicecode:
                    "risk-management-service/risk-rule-tree-review/check-reject",
                appId: "risk-management-service",
            };
            that.$http
                .invokeAPI("/SUMP/riskController/riskCall", "POST", params)
                .then((obj) => {
                    this.$message({
                        message: "审核拒绝成功！",
                        type: "success",
                    });
                    this.$dataBus.doCallBack(this, params);
                })
                .catch((res) => {});
        },
        //val: 0 新增按钮, 1 编辑按钮
        addStock(data) {
            console.log("新增或修改----", data);
            let that = this;
            this.isEdit = data.val;
            if (data.val) {
                //编辑
                // 不使用=赋值,内存相同,改变后,treeData数据也会改变
                // this.ruleForm = data.data;
                console.log("节点编辑", this.ruleForm);
                this.ruleForm = Object.assign(this.ruleForm, data.data);
            } else {
                //新增
                console.log("添加节点", this.ruleForm);
                this.initRuleForm(data.data);
                this.ruleForm.nodeType = "";
            }
            // 使用=赋值,编辑时改变currentTreeData, 源数据treeData也会改变
            //   this.currentTreeData = data.data
            // this.dialogVisible = true;
            that.$dataBus.bindCallBackMethod(that, that.dialogCallBack, {});
            that.$dialog.open({
                that: that,
                title: data.val ? "编辑节点" : "添加节点",
                toRequest: {
                    url: "@ruleTreeAdd",
                    method: "get",
                    params: {
                        isEdit: this.isEdit,
                        val: data,
                        ruleForm: that.ruleForm,
                    },
                },
                width: "70%",
            });
        },
        deleteStock(data) {
            this.$confirm("确定删除该节点信息", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                let param = {
                    ruleTreeNodeId: data.rule_tree_node_id,
                    treeId: data.tree_id, //根节点
                    nodeType: data.node_type, //节点类型
                    nodeIdFrom: data.node_id_from, //上一节点
                    servicecode: "risk-management-service/rule-tree-node/del",
                    appId: "risk-management-service",
                };
                this.$http
                    .invokeAPI("/SUMP/riskController/riskCall", "POST", param)
                    .then((obj) => {
                        this.$message({
                            type: "success",
                            message: "删除成功",
                        });
                        this.requestTreeData();
                    });
            });
        },
        //查看按钮
        checkView(data) {
            //将data中的数据拷贝到ruleForm中
            this.ruleForm = Object.assign(this.ruleForm, data);
            console.log("查看事件的类赋值----", this.ruleForm);
            //弹出 查看 框
            this.$dialog.open({
                that: this,
                title: "查看节点",
                toRequest: {
                    url: "@ruleTreeView",
                    method: "get",
                    params: {
                        nodeType: this.ruleForm.node_type,
                        ruleForm: this.ruleForm,
                    },
                },
                width: "70%",
            });
        },
        dialogCallBack(btnConfig, response) {
            console.log("对话框待会的回调", btnConfig);
            console.log("对话框待会的回调", response);
            this.requestTreeData();
        },
        initRuleForm(data) {
            console.log("initRuleForm", data);
            this.ruleForm.nodeIdFrom = data.rule_tree_node_id;
            this.ruleForm.treeId = data.tree_id;
            this.ruleForm.depth = data.depth;
            console.log(
                "this.ruleForm.depth++++++++++++++++++",
                this.ruleForm.depth
            );
        },
        close() {
            this.$dataBus.doCallBack(this, {});
        },
    },
};
</script>

<style scoped>
.menu-footer {
    margin-top: 20px;
    text-align: right;
}
DecisionTreeBefore,
DecisionTreeAfter {
    width: 100%;
    height: 100%;
}
</style>
