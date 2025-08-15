<template>
  <div class="quota-tree">
    <div class="quota-tree--title">
      <div class="quota-title--left">额度结构管理</div>
      <div class="quota-title--right" style="display:none">
        <el-input
          size="samll"
          v-model="quotaFilter"
          suffix-icon="el-icon-search"
          @input="filterQuota"
        ></el-input>
      </div>
    </div>
    <div class="quota-toolbar">
      <el-button type="primary" size="mini" @click="addMainQuota">新增额度</el-button>
    </div>
    <el-tree
      ref="tree"
      :data="treeData"
      :props="defaultProps"
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      :highlight-current="true"
      @node-click="handleNodeClick"
      node-key="name"
    >
      <span
        class="custom-tree-node"
        slot-scope="{ node, data }"
        @click.right="rightData = data"
        v-contextmenu:contextmenu
      >
        <span :class="{'checkedColor' : data.text === name}">{{ node.label }}</span>
      </span>
    </el-tree>
    <div class="contextmenu-option">
      <v-contextmenu ref="contextmenu" :theme="theme">
        <v-contextmenu-item @click="handleRightAdd">新增</v-contextmenu-item>
        <v-contextmenu-item @click="handleRightDelete">{{$i18ns('删除')}}</v-contextmenu-item>
      </v-contextmenu>
    </div>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import * as _ from "lodash";
import { EventBus } from "./Bus";

export default {
  name: "QuotaManagerLeft",
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      quotaFilter: "",
      filterData: [],
      filterText: "",
      rightData: null, // 右键选中机构信息
      intNum: 0,
      name: "" // 当前选中额度节点prodcd
    };
  },
  created() {
    this.quotaInit();
  },
  mounted() {
    EventBus.$on("refresh", () => {
      this.quotaInit();
    });
  },
  methods: {
    /**
     * 额度初始化
     */
    quotaInit() {
      let params = {
        servicecode: "cl0014"
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            if (res.data && res.data) {
              this.treeData = res.data.treeMap.data;
              console.log("--------",this.treeData)
              this.$nextTick(() => {
                this.$refs.tree.setCurrentKey(this.treeData[0].name);
                this.name = this.treeData[0].name;
                EventBus.$emit("modifyQuota", this.treeData[0]);
              });
            }
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    filterNode(value, data) {
      if (!value) return true;
      if (data.labelTitle.indexOf(value) !== -1) {
        this.filterData.push(data);
        this.$refs.tree.setCurrentKey(this.filterData[0].text);
        EventBus.$emit("modifyQuota", this.filterData[0]);
      }
      return data.labelTitle.indexOf(value) !== -1;
    },
    /**
     * 额度过滤
     */
    filterQuota: _.debounce(function() {
      this.filterData.length = 0;
      this.$refs.tree.filter(this.quotaFilter);
    }, 300),
    /**
     * 添加主机构
     */
    addMainQuota() {
      EventBus.$emit("addMainQuota");
    },
    /**
     * 编辑机构
     * @param data 当前机构信息
     */
    handleNodeClick(data) {
      this.name = data.name;
      this.$refs.tree.setCurrentKey(data.name);
      EventBus.$emit("modifyQuota", data);
    },
    /**
     * 机构树鼠标右键新增点击事件
     */
    handleRightAdd() {
      this.$refs.tree.setCurrentKey(this.rightData.text);
      EventBus.$emit("addQuota", this.rightData);
    },
    /**
     * 机构树鼠标右键删除点击事件
     */
    handleRightDelete() {
      this.$confirm("此操作将永久删除该额度, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params;
          if (this.rightData.isRoot) {
            params = {
              servicecode: "cl0003",
              cl_prod_cd: this.rightData.cl_prod_cd
            }
          }
          else {
            params = {
              servicecode: "cl0013",
              cl_prod_cd: this.rightData.cl_prod_cd,
              cl_type_cd: this.rightData.id
            }
          }
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(
            response => {
              if (response.code === "200") {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.quotaInit();
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败!"
                });
                this.quotaInit();
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
.quota-tree {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  /deep/.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: #ecf5ff;
  }
}
.custom-tree-node {
  .checkedColor {
    color: #1890FF;
  }
}
.quota-tree--title {
  height: 40px;
  .quota-title--left {
    padding-left: 10px;
    float: left;
    position: relative;
    line-height: 40px;
    &::before {
      content: "";
      width: 3px;
      height: 22px;
      display: block;
      position: absolute;
      left: 0;
      top: 8px;
      background: #727df8;
    }
  }
  /deep/.quota-title--right {
    float: right;
    .el-input--samll {
      height: 32px;
      .el-input__inner {
        height: 32px;
      }
      .el-input__suffix {
        top: -4px;
      }
    }
  }
}
.quota-toolbar {
  margin: 10px 0;
}
.el-tree {
  max-height: calc(100% - 98px);
  overflow-x: auto;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.right-option--list {
  width: 100px;
  padding: 0;
  position: fixed;
  left: 0;
  top: 0;
  background: #fff;
  border: 1px solid #f1f1f1;
  .right-option--item {
    width: 100%;
    line-height: 30px;
    text-align: center;
    color: #697b8c;
    cursor: pointer;
    &:hover {
      background-color: #ecf5ff;
      color: #1890ff;
    }
  }
}
</style>
