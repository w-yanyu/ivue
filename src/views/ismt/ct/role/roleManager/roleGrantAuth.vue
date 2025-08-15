<template>
  <div class="out-box">
    <div class="left-box">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1" class="left-box__role">
          <template slot="title">
            <span><em></em>角色权限管理</span>
          </template>
          <p
            class="role"
            :class="selectedBg ? 'selectedBg' : ''"
            @click="roleClick"
          >
            角色数据权限
          </p>
        </el-collapse-item>
        <el-collapse-item name="2" class="position-relative">
          <template slot="title">
            <span><em></em>菜单权限管理</span>
          </template>
          <div class="tree-box">
            <div class="authority-aside_search">
              <el-input
                size="samll"
                v-model="menuFilter"
                suffix-icon="el-icon-search"
                @input="filterMenu"
              ></el-input>
            </div>
            <div v-loading="loading">
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
              <!-- <div class="tree-submit">
                <el-button type="primary" @click="submit">{{
                  $i18ns("保存")
                }}</el-button>
              </div> -->
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="right-box">
      <role-grant-content />
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import * as _ from "lodash";
import Tools from "pte-ui/utils/Tools";
import roleGrantContent from "./role_grant_content";

export default {
  name: "roleGrantAuth",
  components: {
    roleGrantContent
  },
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对象
  },
  data() {
    return {
      treeData: [],
      loading: true,
      defaultProps: {
        children: "children",
        label: "menu_desc"
      },
      expandedList: [],
      checkedData: [],
      checkedList: [],
      pageCodeStr: "menu_id", //节点的唯一标识
      parentCodeStr: "menu_upper_id", // 节点父节点标识
      setNodeType: "type",
      filterText: "",
      menuFilter: "",
      filterData: [], //筛选信息后的数据
      activeNames: "2",
      selectedBg: false, // 角色点击显示
      highlightBd: true, // 高亮显示
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
        role_id: this.cParentParams.role_id,
        servicecode: "ct3107",
        checked:true
      };
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(response => {
          // 默认选中数据
          response.data.forEach(item => {
            if (item.checked) {
              this.checkedList.push(item.menu_id);
              this.expandedList.push(item.menu_id);
            }
          });
          this.treeData = this.formatTreeData(response.data, -1) || [];

          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(this.treeData[0].menu_id);
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
        let parentSymbel = rootVal ? rootVal : "-1";
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
        data.menu_desc.indexOf(value) !== -1 ||
        data.menu_id.indexOf(value) !== -1
      ) {
        this.filterData.push(data);
        this.$refs.tree.setCurrentKey(this.filterData[0].menu_id);
      }
      return (
        data.menu_desc.indexOf(value) !== -1 ||
        data.menu_id.indexOf(value) !== -1
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
      this.menu_id = data.menu_id;
      this.$refs.tree.setCurrentKey(data.menu_id);

      let item = {
        role_id: this.cParentParams.role_id,
        parent_code: data.menu_id,
        data_perm_type: data.data_perm_type,
        title: data.menu_desc
      };

      this.$bus.emit("rightModify", item);
    },
    handleCheck(idList, checkedList) {
      this.checkedData = checkedList.checkedKeys;
    },
    submit() {
      let submitData = [];
      // 对默认选中的数据做处理，提交时上送mene_id,type
      if (this.checkedData.length > 0) {
        submitData = this.checkedData;
      } else {
        submitData = this.checkedList;
      }

      let params = {
        role_id: this.cParentParams.role_id,
        servicecode: "ct3108",
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
  .left-box {
    width: 30%;
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
  }
  .right-box {
    margin-left: 16px;
    flex: 1;
  }
}
.tree-box {
  max-height: 400px;
  overflow: auto;
  .tree-submit {
    position: absolute;
    bottom: 1%;
    right: 15%;
  }
}
</style>
