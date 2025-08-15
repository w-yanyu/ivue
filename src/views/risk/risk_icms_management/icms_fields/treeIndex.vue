<template>
  <div class="out-box">
    <div class="left-box">
      <div class="title--left">{{ $i18ns("进件字段树") }}</div>
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
            show-checkbox
            @check="handleCheck"
            :node-key="pageCodeStr"
          >
          <span
            class="custom-tree-node"
            slot-scope="{ node, data }"
            @click.right="rightData = data"
            v-contextmenu:contextmenu
          >
            <span :class="{'checkedColor' : data.text === pageCodeStr}">{{ node.label }}</span>
          </span>
          </el-tree>
          <div class="contextmenu-option">
            <v-contextmenu ref="contextmenu" :theme="theme">
              <v-contextmenu-item @click="handleRightAdd" v-if="rightData && rightData.tree_type !== 'fieldCode'">新增</v-contextmenu-item>
              <v-contextmenu-item @click="handleRightDelete" v-if="rightData && rightData.tree_type === 'fieldCode'">{{$i18ns('删除')}}</v-contextmenu-item>
            </v-contextmenu>
          </div>
          <div class="tree-submit">
            <el-button type="primary" @click="registerItem">{{
              $i18ns("注册")
            }}</el-button>
            <!-- <el-button class="margin-l-12" type="primary" @click="registerItem">{{
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
        label: "tree_title"
      },
      expandedList: [],
      checkedData: [],
      checkedList: [],
      pageCodeStr: "tree_id", //节点的唯一标识
      parentCodeStr: "tree_pid", // 节点父节点标识
      setNodeType: "tree_type",
      filterText: "",
      menuFilter: "",
      filterData: [], //筛选信息后的数据
      activeNames: "2",
      selectedBg: false, // 角色点击显示
      highlightBd: true,// 高亮显示
      rightData: null, // 右键选中信息
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
  mounted() {
    this.$bus.off("refresh");
    this.$bus.on("refresh", () => {
      this.getTreeData();
    });
  },
  methods: {
    getTreeData() {
      let params = {
        servicecode: "deci050106",
        checked: true
      };
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(response => {
          // 默认选中数据
          response.data.forEach(item => {
            if (item.checked) {
              this.checkedList.push(item.tree_id);
              this.expandedList.push(item.tree_id);
            }
          });
          console.log("response.data=========", response.data);

          this.treeData = this.formatTreeData(response.data, -1) || [];
          console.log("this.treeData========", this.treeData);

          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(this.treeData[0].tree_id);
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
        let parentSymbel = rootVal ? rootVal : -1;
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
     * 过滤
     */
    filterNode(value, data) {
      if (!value) return true;
      if (
        data.tree_title.indexOf(value) !== -1 ||
        data.tree_id.indexOf(value) !== -1
      ) {
        this.filterData.push(data);
        this.$refs.tree.setCurrentKey(this.filterData[0].tree_id);
      }
      return (
        data.tree_title.indexOf(value) !== -1 ||
        data.tree_id.indexOf(value) !== -1
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
      this.tree_id = data.tree_id;
      this.$refs.tree.setCurrentKey(data.tree_id);

      this.$bus.emit("rightModify", data);
    },
    handleCheck(idList, checkedList) {
      this.checkedData = checkedList.checkedNodes;
    },
    registerItem() {
      console.log("checkedData=======", this.checkedData);
      let newArr = [];
      this.checkedData.forEach(item => {
        if(item.tree_type === "fieldCode") [
          newArr.push({
            fact_scene: item.fact_scene,
            field_group_code: item.field_group_code,
            field_group_name: item.field_group_name,
            field_code: item.field_code,
            field_name: item.field_name,
            description: item.description,
            data_type: item.data_type,
            regist_status: item.regist_status,
            value_precision: item.value_precision,
            is_enumeration: item.is_enumeration,
            const_code: item.const_code,
            org_id: item.org_id,
          })
        ]
      })

      console.log("newArr=======", newArr);


      let params = {
        servicecode: "deci050105",
        fieldList: newArr
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
    },
    /**
     * 机构树鼠标右键新增点击事件
     */
    handleRightAdd() {
      console.log("右键新增=========", this.rightData);
      
      this.$refs.tree.setCurrentKey(this.rightData.text);
      this.$dataBus.bindCallBackMethod(this, this.jsonCallBack, {});
      this.$dialog.open({
        that: this,
        title: "新增",
        toRequest: {
          url:
            "@icmsFieldsAdd",
          method: "get",
          params: {
            tree_id: this.rightData.tree_id,
            tree_pid: this.rightData.tree_pid,
            fact_scene: this.rightData.fact_scene,
            field_group_code: this.rightData.field_group_code,
          }
        },
        width: "50%",
        height: "30%"
      });
    },
    jsonCallBack(data) {
      console.log("data======", data);
      
      this.getTreeData();
    },
    /**
     * 机构树鼠标右键删除点击事件
     */
    handleRightDelete() {

      console.log("this.rightData=======", this.rightData);
      
      this.$confirm("此操作将永久删除该节点, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let params = {
              servicecode: "deci050103",
              fact_scene: this.rightData.fact_scene,
              field_group_code: this.rightData.field_group_code,
              field_code: this.rightData.field_code
            }
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(
            response => {
              if (response.code === "200") {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getTreeData();
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败!"
                });
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
.out-box {
  display: flex;
  background: #f0f2f5;
  height: 100%;
  .left-box {
    height: 100%;
    background: #fff;
    display: flex;
    flex-direction: column;
    width: 40%;
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
