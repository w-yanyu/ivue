<template>
    <div class="page_content">
        <!-- 删除提示弹框 -->
        <div class="tips">
            <p style="text-align: left">确定删除该节点信息</p>
        </div>
        <span slot="footer" class="dialog-footer">
            <div class="tip-left">
                <el-button type="info" @click="cancel">取消</el-button>
                <el-button type="primary" @click="confimdelete">确定</el-button>
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
            delData: "",
            isVertical: false, // 是否是竖方向,只给最外层的添加
            isDetail: false, // 是否是详情,不可编辑操作
            dialogVisible: false, // 添加股东弹框
            dialogVisible2: false, // 删除提示弹框
            dialogVisible3: false, // 删除提示弹框
            dataList: "",
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
        this.delData = this.cParentParams.delData;
    },
    methods: {
        // 确定删除
        confimdelete() {
            console.log("确定删除");
            let that = this;
            let param = {
                ruleTreeNodeId: this.delData.ruleTreeNodeId,
                treeId: this.delData.treeId, //根节点
                nodeType: this.delData.nodeType, //节点类型
                nodeIdFrom: this.delData.nodeIdFrom, //上一节点
                servicecode: "risk-management-service/rule-tree-node/del",
                appId: "risk-management-service",
            };
            //后台删除数据
            this.$http
                .invokeAPI("/SUMP/riskController/riskCall", "POST", param)
                .then((obj) => {
                    this.$message({
                        type: "success",
                        message: "成功",
                    });
                    that.$dataBus.doCallBack(that, obj);
                })
                .catch((reg) => {});
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
.dialog-footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    text-align: left;
    padding-bottom: 10px;
}
</style>
