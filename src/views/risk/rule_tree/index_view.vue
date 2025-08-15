<template>
    <div class="page_content">
        <div class="tips">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
                <el-form-item label="节点类型" prop="nodeType" label-width="120px" align="left">
                    <el-select
                        v-model="nodeType"
                        :disabled="true"
                        placeholder="节点类型"
                        style="width: 150px"
                        @change="changeType"
                    >
                        <el-option
                            v-for="item in nodeTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    v-if="ruleForm.ruleTreeNodeId !==''"
                    label="节点编号"
                    prop="ruleTreeNodeId"
                    label-width="120px"
                    align="left"
                >
                    <el-input :disabled="true" style="width: 40%" v-model="ruleForm.ruleTreeNodeId"></el-input>
                </el-form-item>
                <el-form-item
                    v-if="nodeType === 3"
                    label="规则树名称"
                    prop="treeName"
                    label-width="120px"
                    align="left"
                >
                    <el-input :disabled="true" style="width: 40%" v-model="ruleForm.treeName"></el-input>
                </el-form-item>
                <el-form-item
                    v-if="nodeType === 3"
                    label="规则树描述"
                    prop="treeDesc"
                    label-width="120px"
                    align="left"
                >
                    <el-input :disabled="true" style="width: 60%" v-model="ruleForm.treeDesc"></el-input>
                </el-form-item>
                <el-form-item
                    label="规则执行表达式"
                    v-if="nodeType === 1 "
                    label-width="120px"
                    align="left"
                >
                    <el-input
                        :disabled="true"
                        placeholder="请输入"
                        style="width: 60%; margin-right: 0px;"
                        spellcheck="false"
                        :value="ruleForm.ruleExpress"
                    ></el-input>
                </el-form-item>
                <el-form-item label="规则描述" v-if="nodeType === 1 " label-width="120px" align="left">
                    <el-input
                        :disabled="true"
                        placeholder="请输入"
                        style="width: 60%; margin-right: 0px;"
                        :value="ruleForm.ruleDesc"
                        spellcheck="false"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    v-if="nodeType === 2 "
                    prop="actionList"
                    label="动作列表"
                    label-width="120px"
                    align="left"
                >
                    <ActionConfiguration
                        ref="actionConfiguration"
                        isDisable="true"
                        :cParentParams="cParentParams"
                    ></ActionConfiguration>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <div>
                <el-button type="info" @click="cancel">取消</el-button>
            </div>
        </span>
    </div>
</template>

<script>
import ActionConfiguration from "@/components/ActionConfiguration.vue";
import DecisionTree from "@/components/DecisionTree.vue";

export default {
    props: {
        cMeta: Object, //本页面模板json数据Layout对象
        cParentMeta: Object, //父页面模板json数据Layout对象
        cParentParams: Object, //父页面自定义参数与内置参数
        cParentScope: Object, //父页面每块区域业务数据
    },
    name: "tree",
    components: {
        ActionConfiguration,
        DecisionTree,
    },
    data() {
        return {
            cParams: this.cParentParams,
            propsData: {},
            treeData: "",
            nodeTreeDat: "", //节点树的数据
            isEdit: false,
            nodeType: 0,
            ruleForm: {
                ruleTreeNodeId: "", //节点
                treeId: "", //根节点
                treeCode: "", //规则树代码
                treeName: "", //规则树名称
                treeDesc: "", //规则树描述
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
            rules: {},
            nodeTypeOptions: [
                {
                    label: "分支节点",
                    value: 1,
                },
                {
                    label: "叶子节点",
                    value: 2,
                },
                {
                    label: "根节点",
                    value: 3,
                },
            ], // 节点类型 查看编辑
            lastId: 11, // 最后一级id
            currentTreeData: {},
        };
    },
    mounted() {
        console.log("父类传过来的数据", this.cParentParams);
        this.nodeType = this.cParentParams.ruleForm.nodeType;
        if (this.nodeType === 1) {
            this.ruleForm = this.cParentParams.ruleForm;
        }
        if (
            this.nodeType === 2 &&
            this.cParentParams.ruleForm.actionList &&
            this.cParentParams.ruleForm.actionList.length > 0
        ) {
            this.setActionList(this.cParentParams.ruleForm.actionList);
        }
        //加载父类传过来的树id参数
        this.ruleForm.ruleTreeNodeId =
            this.cParentParams.ruleForm.ruleTreeNodeId;
        this.ruleForm.treeId = this.cParentParams.ruleForm.treeId;
        this.ruleForm.treeCode = this.cParentParams.ruleForm.treeCode;
        this.ruleForm.treeName = this.cParentParams.ruleForm.treeName;
        this.ruleForm.treeDesc = this.cParentParams.ruleForm.treeDesc;
        this.ruleForm.nodeIdFrom = this.cParentParams.ruleForm.nodeIdFrom;
    },
    methods: {
        //请求规则树数据
        setActionList(actionList) {
            let that = this;
            that.$nextTick(() => {
                console.log("目录动作节点编辑事件--组件", that.$refs);
                if (that.$refs.actionConfiguration) {
                    that.$refs.actionConfiguration.setActionList(actionList);
                }
            });
        },
        cancel() {
            this.$dialog.close();
        },
    },
};
</script>

<style lang="css" scoped>
.page_content {
    width: 100%;
    height: 100%;
    position: relative;
}
DecisionTree {
    width: 100%;
    height: 100%;
}
.dialog-footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    text-align: left;
    padding-bottom: 10px;
}
</style>
