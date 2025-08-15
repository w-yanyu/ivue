<template>
    <div class="page_content">
        <!-- 工具栏 -->
        <div class="tool-bar">
            <div class="left">{{treeTitle}}</div>
            <div class="right">
                <el-button
                    type="warning"
                    plain
                    icon="el-icon-refresh-left"
                    size="mini"
                    @click="close"
                >返回</el-button>
            </div>
        </div>
        <!-- G6 决策树渲染块 -->
        <DecisionTree
            ref="decisionTree"
            @add="addStock"
            @delete="deleteStock"
            @checkView="checkView"
            @setActionList="setActionList"
        ></DecisionTree>
    </div>
</template>
<script>
import DecisionTree from "@/components/DecisionTree.vue";
import ActionConfiguration from "@/components/ActionConfiguration.vue";

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
            dataList: "",
            treeTitle: "", //左上角标题
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
    mounted() {
        console.log("cParentParams----");
        this.treeTitle = `${this.cParentParams.treeId}-${this.cParentParams.treeName}`;
        this.requestTreeData();
    },
    computed: {},
    methods: {
        //请求规则树数据
        requestTreeData() {
            let that = this;
            let params = {
                tree_id: that.cParams.treeId,
                servicecode: "deci040205",
                isList: true,
            };
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
                    ruleTreeNodeId: data.ruleTreeNodeId,
                    treeId: data.treeId, //根节点
                    nodeType: data.nodeType, //节点类型
                    nodeIdFrom: data.nodeIdFrom, //上一节点
                    servicecode: "deci040113"
                };
                this.$http
                    .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", param)
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
            // let height = this.ruleForm.nodeType === 3 ? '40%' : '60%';
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

<style lang="css" scoped>
.page_content {
    width: 100%;
    height: 100%;
    position: relative;
    background: #fff;
    overflow: hidden;
}

.tool-bar {
    box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.4);
    padding: 5px 16px;
    display: flex;
    justify-content: space-around;
}

.tool-bar .left {
    flex: 1;
    line-height: 28px;
    font-size: 18px;
    font-weight: bold;
}

.btn {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 99;
}

DecisionTree {
    width: 100%;
    height: 100%;
}
</style>
