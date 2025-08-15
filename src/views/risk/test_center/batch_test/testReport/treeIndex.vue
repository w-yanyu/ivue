<template>
  <div class="out-box">
    <div class="left-box">
      <div class="title--left">{{ $i18ns("模板页面信息") }}</div>
      <div class="tree-box">
        <div class="authority-aside_search">
          <el-input
            size="samll"
            v-model="menuFilter"
            suffix-icon="el-icon-search"
            @input="filterMenu"
          ></el-input>
        </div>
        <div v-loading="loading" class="margin-t-16">
          <el-tree
            ref="tree"
            :data="treeData"
            :props="defaultProps"
            :expand-on-click-node="false"
            :default-expanded-keys="expandedList"
            :default-checked-keys="checkedList"
            :filter-node-method="filterNode"
            :highlight-current="highlightBd"
            @node-click="handleNodeClick"
            @check="handleCheck"
            :node-key="pageCodeStr"
          >
          </el-tree>
          <div class="tree-submit">
            <el-button type="primary" @click="preview">{{
              $i18ns("预览")
            }}</el-button>
            <!-- <el-button class="margin-l-12" type="primary" @click="preview">{{
              $i18ns("保存")
            }}</el-button> -->
          </div>
        </div>
      </div>
    </div>
    <div class="right-box">
      <treeContent />
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import * as _ from "lodash";
import Tools from "pte-ui/utils/Tools";
import treeContent from "./tree_content";

export default {
  name: "reportTreeIndex",
  components: {
    treeContent
  },
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对象
  },
  data() {
    return {
      rightUrl: "@dueSpringboard", // 右侧页面
      treeData: [],
      loading: true,
      defaultProps: {
        children: "children",
        label: "node_name"
      },
      expandedList: [],
      checkedData: [],
      checkedList: [],
      pageCodeStr: "node_cd", //节点的唯一标识
      parentCodeStr: "parent_node_cd", // 节点父节点标识
      setNodeType: "node_type",
      filterText: "",
      menuFilter: "",
      filterData: [], //筛选信息后的数据
      activeNames: "2",
      selectedBg: false, // 角色点击显示
      highlightBd: true // 高亮显示
    };
  },
  watch: {
    filterText(val) {
      this.selectNodeArray = [];
      this.selectedIndex = 0;
      this.$refs.tree.filter(val);
      this.selectedNode();
      // 自动展开系统菜单
      this.$refs.treeBox.style.display = "block";
      this.filterBtnActive = -1; // 清除底部按钮选中状态
    }
  },
  created() {
    this.getTreeData();
  },
  mounted() {},
  methods: {
    getTreeData() {
      let params = {
        group_num: "0004",
        servicecode: "pd0351",
        checked: true
      };
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(response => {
          // 默认选中数据
          response.data.forEach(item => {
            if (item.checked) {
              this.checkedList.push(item.node_cd);
              this.expandedList.push(item.node_cd);
            }
          });
          console.log("response.data=========", response.data);

          this.treeData = this.formatTreeData(response.data, "BASE") || [];
          console.log("this.treeData========", this.treeData);

          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(this.treeData[0].node_cd);
            this.loading = false;
          });
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 生成树结构数据
    formatTreeData(data, rootVal) {
      let nodeList = [];
      let pageCode = this.pageCodeStr;
      let parentCode = this.parentCodeStr;
      let type = this.setNodeType;
      if (!_.isArray(data)) {
        return [];
      }
      if (_.isArray(data) && data.length === 0) {
        return [];
      }
      for (let i = 0; i < data.length; i++) {
        let parentSymbel = rootVal ? rootVal : "BASE";
        if (data[i][parentCode] == parentSymbel) {
          let obj = data[i];
          obj.nodeType = data[i][type];
          obj.children = [];
          nodeList.push(data[i]);
          data.splice(i, 1);
          i--;
        }
      }
      let run = function(treeArrs) {
        if (data.length > 0) {
          for (let i = 0; i < treeArrs.length; i++) {
            for (let j = 0; j < data.length; j++) {
              if (treeArrs[i][pageCode] == data[j][parentCode]) {
                let obj = data[j];
                obj.nodeType = data[j][type];
                obj.children = [];
                treeArrs[i].children.push(obj);
                data.splice(j, 1);
                j--;
              }
            }
            run(treeArrs[i].children);
          }
        }
      };
      run(nodeList);
      return nodeList;
    },
    /**
     * 点击角色权限
     */
    roleClick() {
      this.selectedBg = true;
      let item = {
        role_id: this.cParentParams.role_id,
        parent_code: this.cParentParams.role_id,
        data_perm_type: "ROLE",
        title: "角色数据权限"
      };
      this.$bus.emit("rightModify", item);
    },
    /**
     * 过滤
     */
    filterNode(value, data) {
      if (!value) return true;
      if (
        data.node_name.indexOf(value) !== -1 ||
        data.node_cd.indexOf(value) !== -1
      ) {
        this.filterData.push(data);
        this.$refs.tree.setCurrentKey(this.filterData[0].node_cd);
      }
      return (
        data.node_name.indexOf(value) !== -1 ||
        data.node_cd.indexOf(value) !== -1
      );
    },
    filterMenu: _.debounce(function() {
      this.filterData.length = 0;
      this.$refs.tree.filter(this.menuFilter.trim());
    }, 500),
    /**
     * 点击菜单
     * @param data 当前菜单信息
     */
    handleNodeClick(data) {
      this.node_cd = data.node_cd;
      this.$refs.tree.setCurrentKey(data.node_cd);

      let item = {
        role_id: this.cParentParams.role_id,
        parent_code: data.node_cd,
        data_perm_type: data.data_perm_type,
        title: data.node_name
      };

      this.$bus.emit("rightModify", item);
    },
    handleCheck(idList, checkedList) {
      this.checkedData = checkedList.checkedKeys;
    },
    preview() {
      console.log("checkedData=======", this.checkedData);

      let params = {
        role_id: this.cParentParams.role_id,
        servicecode: "",
        submitData
      };
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          this.$message({
            type: "success",
            message: res.message || i18n.t("PTE_successInfo")
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.out-box {
  display: flex;
  background: #f0f2f5;
  height: 100%;
  .left-box {
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    width: 20%;
    &__role {
      :hover {
        cursor: pointer;
      }
      .role {
        line-height: 36px;
        margin: 0;
        padding: 4px 16px;
      }
      .selectedBg {
        background: #f0f2f5;
      }
    }
    .title--left {
      text-align: left;
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
  }
  .right-box {
    background: #fff;
    margin-left: 16px;
    flex: 1;
  }
}
.tree-box {
  position: relative;
  height: 100%;
  overflow: auto;
  padding: 16px;
  .tree-submit {
    position: absolute;
    bottom: 10%;
    right: 15%;
  }
}
</style>
