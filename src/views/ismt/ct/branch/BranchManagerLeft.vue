<template>
  <div class="branch-tree">
    <div class="branch-tree--title">
      <div class="branch-title--left">{{$i18ns('机构树管理')}}</div>
      <div class="branch-title--right">
        <el-input size="samll" v-model="branchFilter" suffix-icon="el-icon-search" @input="filterBranch"></el-input>
      </div>
    </div>
    <div class="branch-toolbar">
      <el-button type="primary" size="mini" @click="addMainBranch" v-show = "false">{{$i18ns('新增主机构')}}</el-button>
    </div>
    <div class="branch-toolbar">
      <div class="branch-selrelation">
        {{$i18ns('请选择机构关系')}}：
      </div>
      <div>
        <el-select v-model="brch_relation_code" >
          <el-option
            v-for="(item, i) in branchRelationList"
            :key="brch_relation_code"
            :label="item.brch_relation_desc"
            :value="item.brch_relation_code"
            @click.native="branchInit()"
          >
            <span>{{ item.brch_relation_code }}-{{ item.brch_relation_desc}}</span>
          </el-option>
        </el-select>
      </div>
    </div>
    <el-tree
      ref="tree"
      :data="treeData"
      :props="defaultProps"
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      :highlight-current="true"
      @node-click="handleNodeClick"
      node-key="branch_id">
      <span class="custom-tree-node" slot-scope="{ node, data }" @click.right="rightData = data" v-contextmenu:contextmenu>
        <span :class="{'checkedColor' : data.branch_id === branch_id}">{{ node.label }}</span>
      </span>
    </el-tree>
    <div class="contextmenu-option">
      <v-contextmenu ref="contextmenu" :theme="theme">
        <v-contextmenu-item @click="openDialog">{{$i18ns('新增下级机构')}}</v-contextmenu-item>
        <v-contextmenu-item @click="handleRightDelete">{{$i18ns('删除机构关系')}}</v-contextmenu-item>
      </v-contextmenu>
    </div>
  </div>
</template>
<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import * as _ from "lodash";
  import { EventBus } from "./Bus";

  export default {
    name: "BranchManagerLeft",
    data() {
      return {
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'labelTitle'
        },
        branchFilter: "",
        filterData:[],//筛选信息后的数据
        filterText: "",
        rightData: null, // 右键选中机构信息
        intNum:0,
        branch_id: "",  // 当前选中的节点机构编号
        brch_relation_code: "01",//机构关系代码
        branchRelationList:[] // 机构关系列表
      }
    },
    created() {
      this.getBranchRelation();
      this.branchInit();
    },
    mounted() {
      EventBus.$on("refresh", () => {
        this.branchInit();
      })
    },
    methods: {
      /**
       * 机构初始化
       */
      branchInit() {
        let params = {
          brch_relation_code : this.brch_relation_code
        }
        MyAxios.invokeAPI("/SUMP/rest/branch/treeBranch", "post",params).then(res => {
          if (res && res.code === "200") {
            console.debug("branchInit",JSON.stringify(res.data));
            this.treeData = this.branchDataHandle(res.data);
            console.log("this.treeData :",this.treeData)
            this.$nextTick(() => {
              // treeBox 元素的ref   value 绑定的node-key
              this.$refs.tree.setCurrentKey(this.treeData[0].branch_id);
              EventBus.$emit("modifyBranch", this.treeData[0]);
            });
          }
        }).catch(err => {
          console.error(err);
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
      filterNode(value, data) {
        if (!value) return true;
        if( (data.labelTitle.indexOf(value) !== -1   ||   data.branch_id.indexOf(value) !== -1)){
          this.filterData.push(data)
          this.$refs.tree.setCurrentKey(this.filterData[0].branch_id);
          EventBus.$emit("modifyBranch", this.filterData[0]);

        }
        return data.labelTitle.indexOf(value) !== -1   ||   data.branch_id.indexOf(value) !== -1  ;
      },
      /**
       * 机构过滤
       */
      filterBranch: _.debounce(function () {
        this.filterData.length=0;
        this.$refs.tree.filter(this.branchFilter.trim());
      }, 500),
      /**
       * 添加主机构
       */
      addMainBranch() {
        EventBus.$emit("addMainBranch");
      },
      /**
       * 编辑机构
       * @param data 当前机构信息
       */
      handleNodeClick(data) {
        this.branch_id = data.branch_id;
        this.$refs.tree.setCurrentKey(data.branch_id);
        EventBus.$emit("modifyBranch", data);
      },
      /**
       * 机构树鼠标右键新增点击事件
       */
      handleRightAdd() {
        this.$refs.tree.setCurrentKey(this.rightData.branch_id);
        EventBus.$emit("addBranch", this.rightData);
      },
      openDialog() {
        let that = this;
        that.$dataBus.bindCallBackMethod(that, that.jsonCallBack, {})
        that.$dialog.open({
          that: that,
          title: "机构关联角色新增",
          toRequest: {
            url: "/views/ismt/ct/branch/branch_relation_add.json",
            method: "get",
            "params": {
              "parent_brch_id": that.rightData.branch_id,
              "brch_relation_code":that.brch_relation_code
            }
          },
          width: "60%"
        })
      },
      jsonCallBack(a,b){
        this.branchInit()
      },
      /**
       * 机构树鼠标右键删除点击事件
       */
      handleRightDelete() {
        let that =this;
        this.$confirm('此操作将永久删除该机构, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          let request_map = {};
          let request_url = "/SUMP/call/RPCCall";
          request_map["servicecode"] = "ct2144";
          request_map["operater_ind"] = "D";
          request_map["branch_id"] = that.rightData.branch_id;// 机构编号
          request_map["parent_brch_id"] = that.rightData.parent_brch_id;// 机构编号
          request_map["branch_name"] = that.rightData.branch_name;// 机构名称
          request_map["brch_relation_code"] = that.rightData.brch_relation_code;// 机构名称
          request_map["real_branch_ind"] = that.rightData.real_branch_ind;// 实体机构标志
          request_map["swift_no"] = that.rightData.swift_no;// swift 编号
          request_map["holiday_code"] = that.rightData.holiday_code;//  节假日代码
          that.$http.invokeAPI(request_url, "post", request_map).then(response => {
            if (response.code === "200") {
              if(response.message==='SUCCESS'){
                //机构初始化
                that.branchInit();
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
      // 加载机构关系
      getBranchRelation(){

        let params = {
          servicecode: "ct2145",
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res.code === "200") {
            this.branchRelationList = res.data;
          }
        }).catch(err => {
          console.error(err)
        })
      },
    }
  }
</script>
<style lang="less" scoped>
  .branch-tree {
    width: 100%;
    height: 97%;
    padding: 10px;
    box-sizing: border-box;
  }
  .branch-tree--title {
    height: 40px;
    .branch-title--left {
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
    /deep/.branch-title--right {
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
  .branch-toolbar {
    margin: 10px 0;
  }
  .branch-selrelation{
    margin: 10px 10px;
    float: left;
  }
  .el-tree {
    max-height: calc(100% - 98px);
    overflow-x: auto;
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
