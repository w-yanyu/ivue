<template>
  <div class="tree-box">
    <div v-loading="loading">
      <el-tree
        ref="tree"
        :data="treeData"
        :props="defaultProps"
        :expand-on-click-node="false"
        show-checkbox
        check-strictly
        :default-expanded-keys="expandedList"
        :default-checked-keys="checkedList"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
        @check="handleCheck"
        node-key="branch_id"
      >
      </el-tree>
    </div>
    <div class="tree-submit">
      <el-button type="primary" @click="bringback">{{
        $i18ns("保存")
      }}</el-button>
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import * as _ from "lodash";
import Tools from "pte-ui/utils/Tools";
export default {
  data() {
    return {
      cParentParams: this.$dataBus.getCurrentcParams(this) || {},
      cParentMeta: this.$dataBus.getParentcMeta(this) || {},
      cParentScope: this.$dataBus.getParentScope(this) || {},
      cMeta: this.$dataBus.getCurrentcMeta(this) || {},
      treeData: [],
      loading: true,
      loadingTree: true,
      defaultProps: {
        children: "children",
        label: "labelTitle"
      },
      expandedList: [],
      checkedData: [],
      checkedList: []
    };
  },
  created() {
    this.getTreeData();
  },
  mounted() {},
  methods: {
    getTreeData() {
      let params = {
        org_id: this.cParentParams.dict_type,
        brch_relation_code: "01"
      };
      MyAxios.invokeAPI("/SUMP/rest/branch/treeBranch", "post", params)
        .then(response => {
          this.treeData = this.branchDataHandle(response.data);
          this.initDefaultTreeData(); //加载默认展开和默认勾选数据

          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(this.treeData[0].branch_id);
            this.loading = false;
            this.loadingTree = false;
          });
        })
        .catch(() => {
          this.loading = false;
          this.loadingTree = false;
        });
    },
    /**
     * 机构数据处理
     */
    branchDataHandle(data) {
      function dataHandle(arr) {
        arr.forEach(item => {
          item.labelTitle = `[${item.branch_id}]${item.branch_name}`;
          item.children.length > 0 && dataHandle(item.children);
        });
      }
      dataHandle(data);
      return data;
    },
    //加载默认展开和默认勾选数据
    initDefaultTreeData() {
      if(this.cParentParams.rule_value) {
        this.checkedList = this.cParentParams.rule_value.split(',');
        this.expandedList = this.cParentParams.rule_value.split(',');
      }
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    /**
     * 编辑机构
     * @param data 当前机构信息
     */
    handleNodeClick(data) {
      this.branch_id = data.branch_id;
      this.$refs.tree.setCurrentKey(data.branch_id);
    },
    handleCheck(idList, checkedList) {
      this.checkedData = checkedList.checkedNodes;
    },
    bringback() {
      this.checkedData = this.$refs.tree.getCheckedNodes();
      this.$dataBus.doCallBack(this, this.checkedData);
    }
  }
};
</script>

<style lang="less" scoped>
.tree-box {
  .tree-submit {
    position: absolute;
    bottom: 1%;
    right: 2%;
  }
}
</style>
