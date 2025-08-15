<template>
  <div class="branch-tree">
    <div class="branch-toolbar">
      <div class="branch-selrelation">
        请选择机构关系：
      </div>
      <div>
        <el-select v-model="brch_relation_code" placeholder="请选择">
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
    <div class="branch-tree--title">

      <div class="branch-title--left">机构树管理</div>
      <div class="branch-title--right">
        <el-input size="samll" v-model="branchFilter" suffix-icon="el-icon-search" @input="filterBranch"></el-input>
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
      node-key="branch_id"
      show-checkbox
      check-strictly
      @check-change="handleCheckChange">
      <span class="custom-tree-node" slot-scope="{ node, data }" @click.right="rightData = data" v-contextmenu:contextmenu>
        <span>{{ node.label }}</span>
      </span>
    </el-tree>
    <div class="branch-footer-submit">
      <el-button size="mini"  type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>
<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import * as _ from "lodash";
  import { EventBus } from "../../branch/Bus.js";

  export default {
    name: "UserBranchTreeManager",
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
        checkedData: [], //勾选选中的信息
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
        let that=this;
        let params = {
          brch_relation_code : that.brch_relation_code
        }
        MyAxios.invokeAPI("/SUMP/rest/branch/treeBranch", "post",params).then(res => {
          if (res && res.code === "200") {
            console.debug("branchInit",JSON.stringify(res.data));
            this.treeData = this.branchDataHandle(res.data);
            that.$nextTick(() => {
              // treeBox 元素的ref   value 绑定的node-key
              that.$refs.tree.setCurrentKey(that.treeData[0].branch_id);
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
            item.labelTitle = item.parent_brch_id === "" ? item.branch_name : `[${item.branch_id}]${item.branch_name}`;
            if (item.parent_brch_id === "") {
              item.labelTitle = item.branch_name;
            }
            item.labelTitle = item.children.length > 0 ? item.branch_name : `[${item.branch_id}]${item.branch_name}`;
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
          request_map["servicecode"] = "ct2141";
          request_map["operater_ind"] = "D";
          request_map["branch_id"] = that.rightData.branch_id;// 机构编号
          request_map["branch_name"] = that.rightData.branch_name;// 机构名称
          request_map["real_branch_ind"] = that.rightData.real_branch_ind;// 实体机构标志
          request_map["swift_no"] = that.rightData.swift_no;// swift 编号
          request_map["holiday_code"] = that.rightData.holiday_code;//  节假日代码
          that.$http.invokeAPI(request_url, "post", request_map).then(response => {
            if (response.code === "200") {
              if(response.comm_rsp.sys_erortx==='SUCCESS'){
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
      /**
       * 提交按钮
       */
      submit() {

        this.$dataBus.doCallBack(this,this.checkedData)

        // if(this.checkedData) {
        //   let that = this;
        //   this.$http.invokeAPI("", "post", this.checkedData).then(response => {
        //     if (response.code === "200") {
        //       that.$message({
        //         type: 'success',
        //         message: "操作成功"
        //       });
        //     }else{
        //        that.$message({
        //           type: 'error',
        //           message: "操作失败",
        //        });
        //     }
        //   });
        // } else {
        //   MyMessage({
        //     message: "操作失败",
        //     type: 'error'
        //   });
        // }
      },
      handleCheckChange(data,checked,node) {
        if(checked){
          this.$refs.tree.setCheckedNodes([data]);
          this.checkedData = data;
          return this.checkedData;
        }
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
      }
    }
  }
</script>
<style lang="less" scoped>
  .branch-toolbar {
    margin: 10px 0;
  }
  .branch-selrelation{
    margin: 10px 10px;
    float: left;
  }
  .branch-tree {
    width: 100%;
    height: calc(65vh - 20px);
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
  .el-tree {
    height: calc(100% - 98px);
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
  .branch-footer-submit{
    text-align: center;
  }
</style>
