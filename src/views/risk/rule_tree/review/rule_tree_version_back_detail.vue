<template>
    <div class="page_content">
        <el-form ref="form" :model="form" label-width="100px">
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label">
                        <i class="el-icon-date"></i> 基础信息
                    </span>
                    <to-json :toUrl="viewUrl " :params="this.cParams.cParentParams"></to-json>
                </el-tab-pane>
                <el-tab-pane>
                    <span slot="label">
                        <i class="el-icon-date"></i> 节点信息
                    </span>
                    <!-- G6 决策树渲染块 -->
                    <DecisionTreeView
                        ref="decisionTree"
                        @add="addStock"
                        @delete="deleteStock"
                        @checkView="checkView"
                        @setActionList="setActionList"
                    ></DecisionTreeView>
                </el-tab-pane>
            </el-tabs>
        </el-form>
    </div>
</template>

 <script>
import DecisionTreeView from "@/components/DecisionTreeView.vue";

export default {
    props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object, // 父页面的scope数据对象
    },
    components: {
        DecisionTreeView,
    },
    data() {
        return {
            viewUrl: "/views/risk/rule_tree/root_rule_tree_view.json",
            cParams: this.cParentParams,
            propsData: {},
            treeData: "",
            nodeTreeDat: "", //节点树的数据
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
            lastId: 11, // 最后一级id
            currentTreeData: {},
        };
    },
    created() {
        console.log(
            "rule_tree_version_back_detail--------------",
            this.cParentParams
        );
        this.requestTreeData();
    },
    methods: {
        //请求规则树数据
        requestTreeData() {
            let that = this;
            // 集合
            let params = {
                treeId: that.cParams.cParentParams.treeId,
                treeCode: that.cParams.cParentParams.treeCode,
                version: that.cParams.cParentParams.busiVersion,
                servicecode:
                    "deci040116"
            };
            //获取规则树
            that.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                    that.treeData = obj.data;
                    console.log("获取树数据回调", that.treeData);
                    that.treeData = that.initData(that.treeData);
                    that.$nextTick(() => {
                        //nextTick里面的代码会在DOM更新后执行
                        console.log("决策树组件", that.$refs);
                        that.$refs.decisionTree.renderTreeData(that.treeData); //调用decisionTree组件（DecisionTree.vue）中的renderTreeData方法，
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
        //val: 0 新增按钮, 1 编辑按钮
        addStock(data) {
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
                        val: data.val,
                        ruleForm: that.ruleForm,
                    },
                },
                width: "70%",
            });
        },
        // 删除按钮
        deleteStock(data) {
            let that = this;
            console.log(data);
            this.delData = data;
            that.$dataBus.bindCallBackMethod(that, that.dialogCallBack, {});
            this.$dialog.open({
                that: this,
                title: "删除节点",
                toRequest: {
                    url: "@ruleTreeDel", //跳到删除确认按钮页面框
                    method: "get",
                    params: {
                        delData: this.delData,
                    },
                },
                width: "20%",
            });
        },
        //查看按钮
        checkView(data) {
            //将data中的数据拷贝到ruleForm中
            this.ruleForm = Object.assign(this.ruleForm, data);
            console.log("查看事件的类赋值----", this.ruleForm);
            let height = this.ruleForm.nodeType === 3 ? "40%" : "60%";
            //弹出 查看 框
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
        dialogCallBack(btnConfig, response) {
            console.log("对话框待会的回调", btnConfig);
            console.log("对话框待会的回调", response);
            this.requestTreeData();
        },
        initRuleForm(data) {
            console.log("initRuleForm", data);
            this.ruleForm.nodeIdFrom = data.ruleTreeNodeId;
            this.ruleForm.treeId = data.treeId;
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
</style>
