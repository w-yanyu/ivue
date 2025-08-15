<template>
  <div class="menu-tree">
    <div class="menu-tree--title">
      <div class="menu-title--left">集团下子公司关联关系管理</div>
      <div class="menu-title--right">
        <!-- <el-input size="samll" v-model="menuFilter" suffix-icon="el-icon-search" @input="filterMenu"></el-input> -->
      </div>
    </div>
    <!-- <div class="menu-toolbar">
      <el-button type="primary" size="mini" @click="addMainMenu">新增主菜单</el-button>
    </div> -->
    <el-tree ref="tree" :data="treeData" :props="defaultProps" :expand-on-click-node="false" :highlight-current="true"
      :filter-node-method="filterNode" @node-click="handleNodeClick" node-key="menu_id">
      <span class="custom-tree-node" slot-scope="{ node, data }" @click.right="rightData = data"
        v-contextmenu:contextmenu>
        <span :class="{'checkedColor' : data.menu_id === menu_id}">{{ node.label }}</span>
      </span>
    </el-tree>
    <div class="contextmenu-option">
      <v-contextmenu ref="contextmenu" :theme="theme">
        <v-contextmenu-item @click="handleRightAdd">新增</v-contextmenu-item>
        <v-contextmenu-item :disabled="rightData && rightData.children.length > 0" @click="handleRightDelete">{{$i18ns('删除')}}
        </v-contextmenu-item>
      </v-contextmenu>
    </div>
  </div>
</template>
<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import * as _ from "lodash";
  import {
    EventBus
  } from "./Bus";

  export default {
    name: "MenuManagerLeft",
    props: {
      cParentParams: Object, // 父页面传的参数
    },
    data() {
      return {
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'cust_name'
        },
        menuFilter: "",
        filterData: [], //筛选信息后的数据
        filterText: "",
        filterId: "",
        rightData: null, // 右键选中机构信息
        menu_id: "", //选中的节点
      }
    },
    created() {
      this.menuInit();
      // console.log('cParentParams-----correlationManagementLeft', this.cParentParams);
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
        let that = this;
        let request_map = {}
        let request_url = "/SUMP/icmcall/icmRPCCall";
        // request_map["trantp"] = "SELECT";
        request_map["servicecode"] = "IUMSCUTS0043";
        request_map["cust_no"] = that.cParentParams.cust_no;
        MyAxios.invokeAPI(request_url, "post", request_map).then(res => {
          console.log('IUMSCUTS0030--SELECT---then', res);
          if (res && res.code === "200") {
            // this.treeData = this.menuDataHandle(res.data.menu.children);
            this.treeData.push(res.data.menu);
            // that.$nextTick(() => {
            //   // treeBox 元素的ref   value 绑定的node-key
            //   that.$refs.tree.setCurrentKey(that.treeData.children[0].cust_no);
            //   EventBus.$emit("modifyMenu", that.treeData.children[0]);
            // });
          }
        }).catch(err => {
          console.error(err);
        });
      },
      /**
       * 菜单数据处理
       */
      menuDataHandle(data) {
        let that = this;
        function dataHandle(arr) {
          const args = arguments;
          console.log('arr~~~~~~', arr);
          arr.forEach(item => {
            item.labelTitle = item.children.length > 0 ? item.cust_name : `[${item.cust_no}]${item.cust_name}`;
            item.menu_upper_name = args[1] ? args[1].cust_name : "%";
            console.debug("data___________________________________", item);
            item.children.length > 0 && dataHandle(item.children, item);
            //     item.filterText = `${item.menu_code}${item.menu_desc}|`;
            //     that.filterText = item.filterText;
            //   } else {
            //     item.labelTitle = item.children.length > 0 ? item.menu_desc : `[${item.menu_code}]${item.menu_desc}`;
            //     if (item.children.length > 0) {
            //       item.filterText = that.filterText + `${item.menu_code}${item.menu_desc}|`;
            //       that.filterText = item.filterText;
            //     } else {
            //       item.filterText = that.filterText + `${item.menu_code}${item.menu_desc}`;
            //     }
            //   item.menu_upper_name = args[1] ? args[1].menu_desc : "%";
            //   console.debug("data___________________________________", JSON.stringify(item) + "/n");
            //   item.children.length > 0 && dataHandle(item.children, item);
          });
        }
        dataHandle(data);
        return data;
      },
      filterNode(value, data) {
        console.debug("data___________________________________", JSON.stringify(data) + "/n");
        if (!value) return true;
        if (data.filterText.indexOf(value) !== -1) {
          this.filterData.push(data)
          this.$refs.tree.setCurrentKey(this.filterData[0].menu_id);
          EventBus.$emit("modifyMenu", this.filterData[0]);
        }
        return data.filterText.indexOf(value) !== -1;
      },
      /**
       * 菜单过滤
       */
      filterMenu: _.debounce(function() {
        this.filterData.length = 0;
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
        console.log('点击菜单事件', data);
        this.menu_id = data.menu_id;
        this.$refs.tree.setCurrentKey(data.menu_id);
        switch (data.menufl) {
          case '0':
            EventBus.$emit("root", data);
            break;
          case '1':
            EventBus.$emit("father", data);
            break;
          case '2':
            EventBus.$emit("son", data);
            break;
          case '3':
            EventBus.$emit("son", data);
            break;
        }
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
      handleRightDelete() {}
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
      duty_type: relative;
      line-height: 40px;

      &::before {
        content: "";
        width: 3px;
        height: 22px;
        display: block;
        duty_type: absolute;
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
