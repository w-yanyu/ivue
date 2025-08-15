<template>
  <div class="menu-tree">
    <div class="menu-tree--title">
      <div class="menu-title--left">菜单管理</div>
      <div class="menu-title--right">
        <el-input size="samll" v-model="menuFilter" suffix-icon="el-icon-search" @input="filterMenu"></el-input>
      </div>
    </div>
    <div class="menu-toolbar">
      <el-button type="primary" size="mini" @click="addMainMenu">新增主菜单</el-button>
    </div>
    <el-tree
     ref="tree"
     :data="treeData"
     :props="defaultProps"
     :expand-on-click-node="false"
     :highlight-current="true"
     :filter-node-method="filterNode"
     @node-click="handleNodeClick"
     node-key="menu_id">
      <span class="custom-tree-node" slot-scope="{ node, data }" @click.right="rightData = data" v-contextmenu:contextmenu>
        <span :class="{'checkedColor' : data.menu_id === menu_id}">{{ node.label }}</span>
      </span>
    </el-tree>
    <div class="contextmenu-option">
      <v-contextmenu ref="contextmenu" :theme="theme">
        <v-contextmenu-item  @click="handleRightAdd">新增</v-contextmenu-item>
        <v-contextmenu-item  @click="handleRightButAdd">新增按钮</v-contextmenu-item>
        <v-contextmenu-item :disabled="rightData && rightData.children.length > 0" @click="handleRightDelete">{{$i18ns('删除')}}</v-contextmenu-item>
      </v-contextmenu>
    </div>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import * as _ from "lodash";
import { EventBus } from "./Bus";

export default {
  name: "MenuManagerLeft",
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'labelTitle'
      },
      menuFilter: "",
       filterData:[],//筛选信息后的数据
      filterText: "",
      filterId:"",
      rightData: null, // 右键选中机构信息
      menu_id: "", //选中的节点
    }
  },
  created() {
    this.menuInit();
  },
  mounted() {
    EventBus.$on("refresh", () => {
      this.menuInit();
    })
  },
  methods: {
    /**
     * 菜单初始化
     */
    menuInit() {
      let that=this;
      MyAxios.invokeAPI("/SUMP/rest/auth/menuTree", "post").then(res => {
        if (res && res.code === "200") {
          this.treeData = this.menuDataHandle(res.data);
         that.$nextTick(() => {
       // treeBox 元素的ref   value 绑定的node-key
      that.$refs.tree.setCurrentKey(that.treeData[0].menu_id);
      EventBus.$emit("modifyMenu", that.treeData[0]);
  });
        }
      }).catch(err => {
        console.error(err);
      });
    },
    /**
     * 菜单数据处理
     */
    menuDataHandle(data) {
      let that=this;
      function dataHandle(arr) {
        const args = arguments;
        arr.forEach(item => {
          if (item.menu_upper_id === "%") {
            item.labelTitle = item.menu_desc;
            item.filterText=`${item.menu_code}${item.menu_desc}|`;
            that.filterText= item.filterText;
          } else {
            item.labelTitle = item.children.length > 0 ? item.menu_desc : `[${item.menu_code}]${item.menu_desc}`;
              if(item.children.length > 0 ){
                 item.filterText=that.filterText+`${item.menu_code}${item.menu_desc}|`;
                 that.filterText=item.filterText;
              }else{
                 item.filterText=that.filterText+`${item.menu_code}${item.menu_desc}`;
              }


          }
          item.menu_upper_name = args[1] ? args[1].menu_desc : "%";
           console.debug("data___________________________________",JSON.stringify(item)+"/n");
          item.children.length > 0 && dataHandle(item.children, item);
        });
      }
      dataHandle(data);
      return data;
    },
    filterNode(value, data) {
      console.debug("data___________________________________",JSON.stringify(data)+"/n");
      if (!value) return true;
        if( data.filterText.indexOf(value) !== -1 ){
         this.filterData.push(data)
         this.$refs.tree.setCurrentKey(this.filterData[0].menu_id);
         EventBus.$emit("modifyMenu", this.filterData[0]);
      }
       return data.filterText.indexOf(value) !== -1   ;
    },
    /**
     * 菜单过滤
     */
    filterMenu: _.debounce(function () {
      this.filterData.length=0;
      this.$refs.tree.filter(this.menuFilter);
    }, 300),
    /**添加主菜单 */
    addMainMenu() {
      EventBus.$emit("addMainMenu");
    },
    /**
     * 编辑菜单
     * @param data 当前菜单信息
     */
    handleNodeClick(data) {
      this.menu_id = data.menu_id;
       this.$refs.tree.setCurrentKey(data.menu_id);
      EventBus.$emit("modifyMenu", data);
    },
    /**
     * 菜单树鼠标右键新增点击事件
     */
    handleRightAdd() {
       this.$refs.tree.setCurrentKey(this.rightData.menu_id);
      EventBus.$emit("addMenu", this.rightData);
    },
    /**
     * 菜单树鼠标右键新增点击事件
     */
    handleRightButAdd() {
      this.$refs.tree.setCurrentKey(this.rightData.menu_id);
      EventBus.$emit("addButton", this.rightData);
    },
    /**
     * 机构树鼠标右键删除点击事件
     */
    handleRightDelete() {
      let that=this;
      this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
       let request_map = {}
        let request_url = "/SUMP/call/RPCCall";
        request_map["servicecode"] = "ct2055";//修改
        request_map["operater_ind"] = "D";
        request_map["menu_id"] = that.rightData.menu_id;
        request_map["menu_code"] = that.rightData.menu_code;
        request_map["menu_desc"] = that.rightData.menu_desc;
        request_map["menu_upper_id"] = that.rightData.menu_upper_id;
        request_map["menu_upper_name"] = that.rightData.menu_upper_name;
        request_map["page_display_scene"] = that.rightData.page_display_scene;
        request_map["page_id"] = that.rightData.page_id;
        request_map["serial"] = that.rightData.serial;
        request_map["menu_show_ind"] = that.rightData.menu_show_ind;
        request_map["menu_group"] = that.rightData.menu_group;
     that.$http.invokeAPI(request_url, "post", request_map).then(response => {
          if (response.code === "200") {
            if(response.comm_rsp.sys_erortx==='SUCCESS'){
              //机构初始化
               that.menuInit();
              that.$message({
              type: 'success',
              message: '删除成功'
              });
            }else{
               that.$message({
                type: 'error',
                  message: response.message,
               });
               }
          } else {
            MyMessage({
              message: response.message,
              type: 'error'
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>
<style lang="less" scoped>
.menu-tree {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.el-tree-node__children {
    .el-tree-node__content {
      .custom-tree-node {
        .checkedColor {
          color: #1890FF;
        }
      }
    }
  }
.menu-tree--title {
  height: 40px;
  .menu-title--left {
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
  /deep/.menu-title--right {
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
.menu-toolbar {
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
</style>
