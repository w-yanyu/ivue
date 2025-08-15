<template>
    <div>
        <el-form
            ref="form"
            :model="currentEditAtrr"
            label-width="110px"
            class="form-two-column"
            :rules="rules"
        >
            <!-- <el-form-item v-if="currentEditAtrr.originId !== undefined" label="ID" prop="originId">
                <el-input v-model="currentEditAtrr.originId" disabled />
            </el-form-item> -->
            <el-form-item label="决策树代码" prop="treeCode">
                <el-input
                    v-model="currentEditAtrr.treeCode"
                    @blur="saveAttr()"
                    disabled
                >
                    <el-button
                        slot="append"
                        type="primary"
                        :disabled="!onlyRead"
                        @click="openDialog"
                        v-if="cParentParams.isCk != '1'" 
                    >选择</el-button>
                </el-input>
            </el-form-item>
            <el-form-item label="决策树名称" prop="treeName">
                <el-input
                    v-model="currentEditAtrr.treeName"
                    @blur="saveAttr()"
                    disabled
                />
            </el-form-item>
            <el-form-item label="版本号" prop="version">
                <el-input v-model="currentEditAtrr.busiVersion" disabled />
            </el-form-item>
            <el-form-item label="节点规则">
                <el-button
                    :disabled="!currentEditAtrr.treeId"
                    type="primary"
                    @click="nodeDialog = true"
                >查看详情</el-button>
            </el-form-item>
        </el-form>
        <el-dialog
            :title="`编辑节点规则（${this.currentEditAtrr.treeId}-${this.currentEditAtrr.treeName}）`"
            :close-on-click-modal="false"
            :visible.sync="nodeDialog"
            width="70%"
            append-to-body
            @open="show"
        >
            <DecisionTree
                ref="DecisionTree"
                v-if="!onlyRead"
                setHeight="500"
                :isUseMiniMap="false"
                @add="addStock"
                @delete="deleteStock"
                @checkView="checkView"
            ></DecisionTree>
            <DecisionTreeViews
                ref="DecisionTreeViews"
                v-if="onlyRead"
                setHeight="500"
                :isUseMiniMap="false"
                @add="addStock"
                @delete="deleteStock"
                @checkView="checkView"
            ></DecisionTreeViews>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import DecisionTree from "@/components/DecisionTree.vue";
import DecisionTreeViews from "@/components/DecisionTreeViews.vue";

export default {
    props: {
        cParentParams: Object,
        saveAttr: {
            type: Function,
            required: true,
        },
        onlyRead: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            activeName: "base",
            treeData: {},
            nodeDialog: false,
            ruleForm: {
                ruleTreeNodeId: "", //节点
                treeId: "", //根节点
                nodeType: "", //节点类型
                nodeIdFrom: "", //上一节点
                ruleLeft: "", //左表达式
                ruleLeftName: "", //左表达名称
                ruleLeftDataType: "", //左表达类型
                ruleOperate: "", //操作符
                ruleRight: "", //右表达式
                ruleExpress: "", //执行表达式
                ruleDesc: "", //规则描述
                partnerName: "",
                proportionShares: null,
            },
            rules: {
                originId: [
                    { required: true, message: "ID不能为空", trigger: "blur" },
                ],
                treeCode: [
                    {
                        required: true,
                        message: "决策树代码不能为空",
                        trigger: "blur",
                    },
                ],
                treeName: [
                    {
                        required: true,
                        message: "决策树名称不能为空",
                        trigger: "blur",
                    },
                ],
                busiVersion: [
                    {
                        required: true,
                        message: "版本号不能为空",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    components: {
        DecisionTree,
        DecisionTreeViews
    },
    computed: {
        ...mapGetters(["currentEditAtrr"]),
    },
    created() {},
    methods: {
        ...mapMutations(["SET_EDIT_ATTR"]),
        openDialog() {
            this.$dataBus.bindCallBackMethod(this, this.jsonCallBack, {});
            this.$dialog.open({
                that: this,
                title: "决策树代码选择",
                toRequest: {
                    url: "/views/risk/rule_tree/flow_risk_rule_tree_lookup.json",
                    method: "get",
                },
                width: "80%",
            });
        },
        jsonCallBack(btnConfig, response) {
            this.SET_EDIT_ATTR({
                ...this.currentEditAtrr,
                ...response,
            });
            this.queryTreeData();
        },
        queryTreeData() {
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
                    treeId: this.currentEditAtrr.treeId,
                    treeCode: this.currentEditAtrr.treeCode,
                    version: this.currentEditAtrr.busiVersion,
                    servicecode: "deci040116",            
                    isList: true,
                })
                .then((obj) => {
                    this.treeData = obj.data;
                    this.SET_EDIT_ATTR({
                        ...this.currentEditAtrr,
                        treeData: JSON.stringify(obj.data),
                    });
                    this.saveAttr();
                });
        },
        show() {
            let treeData = this.initData(
                JSON.parse(this.currentEditAtrr.treeData)
            );
            console.log("标志" + this.onlyRead)
            let that = this;
            if (this.onlyRead){
                this.$nextTick(() => {
                    that.$refs.DecisionTreeViews.renderTreeData(treeData); //调用DecisionTreeViews组件（DecisionTreeViews.vue）中的renderTreeData方法，
                });
            } else {
                this.$nextTick(() => {
                    that.$refs.DecisionTree.renderTreeData(treeData); //调用decisionTree组件（DecisionTree.vue）中的renderTreeData方法，
                });
            }   
        },
        initData(data) {
            data.collapsed = false;
            data.rate = 1.0;
            if (data.children && data.children.length > 0) {
                data.children.forEach((item, index, arrs) => {
                    this.initData(item);
                });
            }
            return data;
        },
        initRuleForm(data) {
            this.ruleForm.nodeIdFrom = data.ruleTreeNodeId;
            this.ruleForm.treeId = data.treeId;
            this.ruleForm.depth = data.depth;
        },
        addStock(data) {
            if (data.val) {
                this.ruleForm = Object.assign(this.ruleForm, data.data);
            } else {
                this.initRuleForm(data.data);
                this.ruleForm.nodeType = "";
            }
            this.$dialog.open({
                that: this,
                title: data.val ? "编辑节点" : "添加节点",
                toRequest: {
                    url: "@ruleTreeAdd",
                    method: "get",
                    params: {
                        isEdit: data.val,
                        val: data,
                        ruleForm: this.ruleForm,
                        flowCallBack: this.flowCallBack,
                    },
                },
                width: "70%",
            });
        },
        flowCallBack(param, isEdit) {
            param.id = isEdit ? param.ruleTreeNodeId : param.nodeIdFrom;
            let treeData = JSON.parse(this.currentEditAtrr.treeData);
            let nodeData = this.filterTree(treeData.children, param, true)[0];
            if (isEdit) {
                nodeData = { ...nodeData, ...param };
                treeData.children = treeData.children.map((item) =>
                    item.id === param.id ? nodeData : item
                );
            } else {
                if (param.id.substring(0, 2) === "RT") {
                    param.id = `N${this.$moment().format(
                        "YYYYMMDDHHmmss"
                    )}${Math.random().toFixed(6).slice(-6)}`;
                    treeData.children.push(param);
                } else {
                    treeData.children.forEach((item) => {
                        if (item.id === param.id) {
                            param.id = `N${this.$moment().format(
                                "YYYYMMDDHHmmss"
                            )}${Math.random().toFixed(6).slice(-6)}`;
                            item.children.push(param);
                        }
                    });
                }
            }
            this.SET_EDIT_ATTR({
                ...this.currentEditAtrr,
                treeData: JSON.stringify(treeData),
            });
            this.saveAttr();
            this.show();
        },
        filterTree(data, currentNode, filterType) {
            let newTree;
            if (filterType) {
                newTree = data.filter((item) => item.id === currentNode.id);
            } else {
                newTree = data.filter((item) => item.id !== currentNode.id);
            }
            newTree.forEach((item) =>
                this.filterTree(item.children, currentNode, filterType)
            );
            return newTree;
        },
        checkView(data) {
            this.ruleForm = Object.assign(this.ruleForm, data);
            this.$dialog.open({
                that: this,
                title: "查看节点",
                toRequest: {
                    url: "@ruleTreeView",
                    method: "get",
                    params: {
                        nodeType: this.ruleForm.nodeType,
                        ruleForm: this.ruleForm,
                    },
                },
                width: "70%",
            });
        },
        deleteStock(data) {
            this.$confirm("确定删除该节点信息?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                let treeData = JSON.parse(this.currentEditAtrr.treeData);
                treeData.children = this.filterTree(
                    treeData.children,
                    data,
                    false
                );
                this.SET_EDIT_ATTR({
                    ...this.currentEditAtrr,
                    treeData: JSON.stringify(treeData),
                });
                this.saveAttr();
                this.show();
                this.$message({
                    type: "success",
                    message: "删除成功!",
                });
            });
        },
        formValid() {
            let flag = true;
            this.$refs.form.validate((valid) => {
                flag = valid;
            });
            return flag;
        },
    },
};
</script>

<style lang="less" scoped>
.form-two-column {
    padding: 0;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    .el-form-item {
        width: 50%;
        margin-bottom: 18px;
        .el-select,
        .el-cascader {
            width: 100%;
        }
    }
    /deep/ .el-form-item.full-row {
        width: 100%;
    }
    .el-input-group__append .el-button {
        margin: 0px -20px;
        padding: 10px 20px;
        border-radius: 0 4px 4px 0;
    }
}
</style>
