<template>
    <div class="view-config">
        <div class="left">
            <div class="title">{{$i18ns('客户类型')}}</div>
            <el-scrollbar>
                <el-tree
                    ref="tree"
                    node-key="node_cd"
                    highlight-current
                    :data="treeData"
                    :expand-on-click-node="false"
                    @node-click="handleNodeClick"
                >
                    <div class="custom-tree-node" slot-scope="{ data }">
                        <span>{{ data.node_name }}</span>
                        <i
                            v-if="data.parent_node_cd === '0'"
                            class="el-icon-circle-plus-outline"
                            @click.stop="addViewInfo(data)"
                        />
                        <i v-else class="el-icon-delete" @click.stop="delViewInfo(data)" />
                    </div>
                </el-tree>
            </el-scrollbar>
        </div>
        <div class="right">
            <CustView :cParentParams="currentView" :isEdit="true" />
        </div>
    </div>
</template>

<script>
import CustView from "@/components/CustView.vue";

export default {
    components: {
        CustView,
    },
    data() {
        return {

            addVeiw: this.$i18ns('新增视图信息'),
            updVeiw: this.$i18ns('修改视图信息'),
            treeData: [],
            currentView: {},
        };
    },
    created() {
        this.getTreeData();
    },
    methods: {
        getTreeData() {
            this.$http
                .invokeAPI("/SUMP/call/RPCCall", "post", {
                    servicecode: "us1104",
                    node_group: "0002",
                })
                .then((response) => {
                    if (response.data.length > 0) {
                        this.treeData = this.toTree(response.data);
                        this.$nextTick(() => {
                            this.$refs.tree.setCurrentKey(
                                this.treeData[0].node_cd
                            );
                            this.currentView = this.treeData[0];
                            console.log("currentView", this.currentView);
                        });
                    }
                });
        },
        toTree(data) {
            let result = [];
            let obj = {};
            data.forEach((item) => {
                obj[item.node_cd] = Object.assign(
                    item,
                    obj[item.node_cd] || {}
                );
                if (item.parent_node_cd !== "0") {
                    let parent = obj[item.parent_node_cd] || {};
                    parent.children = parent.children || [];
                    parent.children.push(item);
                    obj[item.parent_node_cd] = parent;
                } else {
                    result.push(obj[item.node_cd]);
                }
            });
            return result;
        },
        handleNodeClick(data) {
            if (data.parent_node_cd === "0") {
                this.currentView = data;
            } else {
                this.editViewInfo(data);
            }
        },
        addViewInfo(data) {
            this.$dataBus.bindCallBackMethod(this, this.getTreeData, {});
            this.$dialog.open({
                that: this,
                title: this.addVeiw,
                width: "60%",
                toRequest: {
                    url: "/views/us/viewManage/viewConfig/add_view_info.json",
                    method: "get",
                    params: {
                        parent_node_cd: data.node_cd,
                        node_type: data.node_type,
                    },
                },
            });
        },
        editViewInfo(data) {
            this.$dataBus.bindCallBackMethod(this, this.getTreeData, {});
            this.$dialog.open({
                that: this,
                title: this.updVeiw,
                width: "60%",
                toRequest: {
                    url: "/views/us/viewManage/viewConfig/edit_view_info.json",
                    method: "get",
                    params: {
                        parent_node_cd: data.parent_node_cd,
                        node_type: data.node_type,
                        info_item_id: data.node_cd,
                        sort_no: parseInt(data.sort_no),
                    },
                },
            });
        },
        delViewInfo(data) {
            this.$confirm("确定删除该信息吗？", "提示信息", {
                type: "warning",
            })
                .then(() => {
                    this.$http
                        .invokeAPI("/SUMP/call/RPCCall", "post", {
                            servicecode: "us1139",
                            info_item_id: data.node_cd,
                        })
                        .then((response) => {
                            this.getTreeData();
                        });
                })
                .catch(() => {});
        },
    },
};
</script>

<style lang="less" scoped>
.view-config {
    height: 100%;
    .left {
        width: 16%;
        height: 100%;
        float: left;
        border-right: 1px solid #e3e8f5;
        box-sizing: border-box;
        .title {
            width: 100%;
            padding: 12px 10px 10px;
            border-bottom: 1px solid #e3e8f5;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            &::before {
                content: "";
                height: 16px;
                width: 2px;
                background: #409eff;
                margin-right: 8px;
            }
        }
        .el-scrollbar {
            height: calc(100% - 45px);
        }
        /deep/ .el-tree {
            .custom-tree-node {
                width: 100%;
                padding-right: 10px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                i {
                    line-height: 22px;
                    float: right;
                    color: #1890ff;
                }
            }
        }
    }
    .right {
        width: 84%;
        height: 100%;
        float: right;
    }
}
</style>
