<template>
  <div class="branch-tree">
    <div class="branch-tree--title">
      <div class="branch-title--left">机构树管理</div>
<!--      <div class="branch-title&#45;&#45;right">-->
<!--        <el-input size="samll" v-model="branchFilter" suffix-icon="el-icon-search" @input="filterBranch"></el-input>-->
<!--      </div>-->
    </div>

    <div class="branch-toolbar"  v-show="false">
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

  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import * as _ from "lodash";
import { EventBus } from "../Bus";

export default {
  name: "BranchMappingManagerLeft",
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
    EventBus.$emit("brch_relation_code", this.brch_relation_code);
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
          this.treeData = this.branchDataHandle(res.data);
          this.$nextTick(() => {
       // treeBox 元素的ref   value 绑定的node-key
            this.$refs.tree.setCurrentKey(this.treeData[0].branch_id);
     EventBus.$emit("modifyBranch", this.treeData[0]);
     EventBus.$emit("brch_relation_code", this.brch_relation_code);
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
     * 编辑机构
     * @param data 当前机构信息
     */
    handleNodeClick(data) {
      this.branch_id = data.branch_id;
      data.brch_relation_code = this.brch_relation_code;
      this.$refs.tree.setCurrentKey(data.branch_id);
      EventBus.$emit("modifyBranch", data);
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
