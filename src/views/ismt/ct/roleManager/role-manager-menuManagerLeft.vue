<template>
  <div class="menu-tree">
    <div class="menu-tree--title">
      <div class="menu-title--left">菜单管理</div>
      <div class="menu-title--right">
        <el-input size="samll" v-model="menuFilter" suffix-icon="el-icon-search" @input="filterMenu"></el-input>
      </div>
    </div>
    <el-tree
     ref="tree"
     :data="treeData"
     :props="defaultProps" 
     :expand-on-click-node="false"
     :highlight-current="true"
     :filter-node-method="filterNode"
     @node-click="handleNodeClick"
     node-key="menu_id"
     show-checkbox
     :default-checked-keys="checkDefault"
     @check-change="handleCheckChange"
     class="el-tree--width">
      <span class="custom-tree-node" slot-scope="{ node, data }" @click.right="rightData = data" v-contextmenu:contextmenu>
        <span>{{ node.label }}</span>
      </span>
    </el-tree>
    <div class="menu-footer-submit">
      <el-button size="mini" type="primary" @click="submit">提交</el-button>
    </div>
    <div class="contextmenu-option">
      <v-contextmenu ref="contextmenu" :theme="theme">
        <v-contextmenu-item :disabled="rightData && rightData.children.length === 0" @click="handleRightAdd">新增</v-contextmenu-item>
        <v-contextmenu-item :disabled="rightData && rightData.children.length > 0" @click="handleRightDelete">{{$i18ns('删除')}}</v-contextmenu-item>
      </v-contextmenu>
    </div>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import * as _ from "lodash";
import { EventBus } from "../menu/menuManager/Bus.js";

export default {
  name: "RoleMenuManagerLeft",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
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
      checkedData: [], //勾选选中的信息
      checkDefault: []
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
      let params = {
        role_id : this.cParentParams.role_id
      };
      let that=this;
      MyAxios.invokeAPI("/SUMP/rest/auth/roleMenuTree", "post",params).then(res => {
        if (res && res.code === "200") {
          this.treeData = this.menuDataHandle(res.data.menuTree);
          that.$nextTick(() => {
              // treeBox 元素的ref   value 绑定的node-key
              that.$refs.tree.setCurrentKey(that.treeData[0].menu_id); 
              EventBus.$emit("modifyMenu", that.treeData[0]);
          });
          /**
          * 默认勾选处理
          */
          that.checkDefault = res.data.roleMenu;
          that.checkedData = res.data.roleMenu
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
    },
    /**
    * 提交按钮
    */
    submit() {
      let params = {
        role_id : this.cParentParams.role_id,
        menu_list : this.$refs.tree.getHalfCheckedKeys().concat(this.$refs.tree.getCheckedKeys())
      }
      if(this.checkedData) {
        let that = this;
        this.$http.invokeAPI("/SUMP/rest/auth/roleMenuTreeAdd", "post", params).then(response => {
          if (response.code === "200") {
            that.$message({
              type: 'success',
              message: "操作成功"
            }); 
            that.menuInit();
          }else{
             that.$message({
                type: 'error',
                message: "操作失败",
             }); 
          }
        });
      } else {
        MyMessage({
          message: "操作失败",
          type: 'error'
        });
      }
    },
    handleCheckChange(){}
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
.menu-footer-submit{
  width: 100px;
  margin: 0 auto;
  text-align: center;
}
.menu-toolbar {
  margin: 10px 0;
}
.el-tree {
  max-height: calc(100% - 98px);
  overflow-x: auto;
  .el-tree--width {
    width: 440px;
    margin: 0 auto;
  }
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