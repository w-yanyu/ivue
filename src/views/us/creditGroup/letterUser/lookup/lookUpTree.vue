<template>
  <div class="branch-tree">
    <div class="branch-tree--title">
      <div class="branch-title--left">{{ treeTitle }}</div>
      <div class="branch-title--right">
        <!-- <el-input size="samll" v-model="saveFilter" suffix-icon="el-icon-search" @input="filterSave" ></el-input> -->
      </div>
    </div>

    <el-tree :data="treeData" :props="defaultProps"
             @check-change="handleCheckChange"
             @node-click="clickNode"
             show-checkbox
             highlight-current
             ref="tree"
             node-key="node_cd"
             :check-strictly="true">
    </el-tree>

    <div class="branch-footer-submit">
      <el-button size="mini" type="primary" @click="submit" :disabled="multipleSelection.length===0">{{$i18ns('提交')}}</el-button>
      <el-button size="mini" type="info" @click="clickCancel">{{$i18ns('返回')}}</el-button>
    </div>
  </div>
</template>
<script>
import MyMessage from 'pte-ui/utils/MyMessage'

export default {
  name: "creditGroupTree",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对象
    //树的标题

    //获取哪颗树的数据
    node_group: {
      type: String,
      default: '1'
    },
    //输入框的属性name
    inputName: {
      type: String,
      default: ''
    },
    //是否是单选按钮
    isSingleSelection: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      treeData: [], // 树节点
      defaultProps: { // 修改el-tree默认data数组参数
        children: 'children',
        label: 'node_name',
        id: 'node_cd',
        parentId: 'parent_node_cd',
        isLeaf: 'isLeaf' // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
      },

      children: 'children',
      node_name: 'name',
      node_cd: 'id',
      parent_node_cd: 'parentId',
      is_leaf: false, // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
      sort_no: '', //序号
      tree_type: '', //树类型
      node_level: '', //节点等级
      multipleSelection: [], //勾选的叶子节点
      chooseCd: "",
      rebackName:"",
      rebackValue:""
    }
  },
  created() {
    this.treeTitle = this.cParentParams.treeTitle;
    this.node_group = this.cParentParams.node_group;
    this.inputName = this.cParentParams.inputName;
    let list = Object.keys(this.cParentParams.keyField);
    this.rebackValue = list[1];
    this.rebackName = this.cParentParams.keyField;
    this.is_leaf = this.cParentParams.is_leaf;
  },
  mounted() {
    this.loadtreeData();
  },
  methods: {
    loadtreeData(resolve) { // 获取loadtreeData 就是父节点数据，getChildByList就是异步获取子节点数据
      let that = this;
      let request_map = {}
      let request_url = "/SUMP/call/RPCCall";
      request_map["servicecode"] = "us1100";
      request_map["node_cd"] = '';
      request_map["node_group"] = that.node_group;
      that.$http.invokeAPI(request_url, "post", request_map).then(response => {
        // console.log("获取根节点请求", response);
        if (response.code === "200") {
          let data = response.data;
          // 前者item.参数名称为 prop中的规定的属性名称
          data.forEach(item => {
            item.isLeaf = item.is_leaf === "1"
          });
          let data1 = data;
          data = that.getChildStruct("0", data1);
          console.log("树形数据", data);
          // resolve(data)
          that.treeData = data;
        } else {
          MyMessage({
            message: response.message,
            type: 'error'
          });
        }
      });
    },
    getChildStruct(parentNode, listAll) {
      let list = [];
      let that = this;
      listAll.forEach(function (node) {
        if (parentNode === node.parent_node_cd) {
          let childList = that.getChildStruct(node.node_cd, listAll);
          if (typeof childList !== "undefined" && childList.length > 0) {
            node.children = childList;
          }
          list.push(node);
        }
      });
      return list;
    },
    handleCheckChange(data, isCheck, children) {
      let that = this;
      if (this.is_leaf){
        if (!data.isLeaf) {
          that.$refs.tree.setCheckedKeys([]);
          return MyMessage({
            message: '请选择所属村',
            type: 'error'
          });
        }
        if (data.node_type !== "3") {
          that.$refs.tree.setCheckedKeys([]);
          return MyMessage({
            message: '请选择所属村',
            type: 'error'
          });
        }
      }
      if(isCheck){
        this.chooseCd = data.node_cd;
        that.$refs.tree.setCheckedKeys([data.node_cd]);
        that.multipleSelection = [];
        that.multipleSelection.push(data);
      }else{
        if (this.chooseCd === data.node_cd){
          that.$refs.tree.setCheckedKeys([data.node_cd]);
          that.multipleSelection = [];
          that.multipleSelection.push(data);
        }
      }

    },
    clickNode(data, isCheck, children){
      this.chooseCd = data.node_cd;
      this.$refs.tree.setCheckedKeys([data.node_cd]);
      this.multipleSelection = [];
      this.multipleSelection.push(data);
    },
    //
    submit() {
      let that = this;
      console.log("最终数据",that.multipleSelection);
      this.$emit('bringBack', that.multipleSelection[0], that.inputName)
      let response={};
      response[that.rebackName] = that.multipleSelection[0].node_name;
      response["node_cd"] = that.multipleSelection[0].node_cd;
      that.$dataBus.doCallBack(that, response);
    },
    clickCancel() {
      let that = this;
      that.$dialog.close();
    }
  }
}
</script>
<style lang="less" scoped>
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

  /deep/ .branch-title--right {
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

.branch-footer-submit {
  margin-top: 20px;
  text-align: center;
}
</style>
