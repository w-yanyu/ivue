<!-- 使用方法
<template>
 <el-dialog title="保障性安居工程类型" :visible.sync="dialogVisible" width="50%" :before-close="handleClose" top="30vh">
        <LookupTree ref="LookupTree" @closeDialog="closeDialog" treeTitle="树的标题"  treeType="2 树数据的参数"  isSingleSelection="true 是否是单选"></LookupTree>
      </el-dialog>
<\template>
<script>
  import LookupTree from "./modules/lookUpTree.vue" 根据当前路径引用
  export default {
    components: {
      LookupTree
    },
    data() {
      return {
      dialogVisible：false
      };
    },
  methods: {
    clickLookupTree() {
      let that = this;
      that.dialogVisible = true;
    },
    //2、关闭lookup对话框
    closeDialog(item) {
      let that = this;
      that.dialogVisible = false;
      if (item){
        console.log("lookupTree 传过来的选择项目 item", item);
      }
    },

      },
    };
  </script>

-->
<template>
  <div class="branch-tree">
    <div class="branch-tree--title">
      <div class="branch-title--left">{{ treeTitle }}</div>
      <div class="branch-title--right">
        <!-- <el-input size="samll" v-model="saveFilter" suffix-icon="el-icon-search" @input="filterSave" ></el-input> -->
      </div>
    </div>

    <el-tree :data="treeData" :props="defaultProps" :load="loadNode"
             @check-change="handleCheckChange" lazy show-checkbox highlight-current ref="tree" node-key="node_cd"
             :check-strictly="true">
    </el-tree>

    <div class="branch-footer-submit">
      <el-button size="mini" type="primary" @click="submit" :disabled="multipleSelection.length===0">提交</el-button>
      <el-button size="mini" type="info" @click="clickCancel">{{$i18ns('返回')}}</el-button>
    </div>
  </div>
</template>
<script>
import MyMessage from 'pte-ui/utils/MyMessage'

export default {
  name: "prodContentsTree",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对象
    //树的标题

    //获取哪颗树的数据
    treeType: {
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
    }
  },
  created() {

  },
  mounted() {

  },
  methods: {
    loadNode(node, resolve) { // 加载 树数据
      // console.log('获取节点数据');
      // console.log('获取节点数据 node', node);
      let that = this;
      if (node.level === 0) {
        that.loadtreeData(resolve);
      }
      if (node.level >= 1) {
        this.getChildByList(node.data, resolve);
        return resolve([]); // 加上这个，防止在该节点没有子节点时一直转圈的问题发生。
      }
    },
    loadtreeData(resolve) { // 获取loadtreeData 就是父节点数据，getChildByList就是异步获取子节点数据
      let that = this;
      let request_map = {}
      let request_url = "/SUMP/call/RPCCall";
      request_map["servicecode"] = "pd0338";
      request_map["group_num"] = "0001";
      request_map["node_cd"] = '0';
      request_map["node_type"] = '1';
      request_map["is_leaf"] = '0';
      that.$http.invokeAPI(request_url, "post", request_map).then(response => {
        // console.log("获取根节点请求", response);
        if (response.code === "200") {
          let data = response.data;
          // 前者item.参数名称为 prop中的规定的属性名称
          data.forEach(item => {
            item.label = item.node_name;
            item.parentId = item.parent_node_cd;
            item.id = item.node_cd;
            item.isLeaf = item.is_leaf === "1"
          });
          resolve(data)
        } else {
          MyMessage({
            message: response.message,
            type: 'error'
          });
        }
      });
    },
    getChildByList(node, resolve) { // 获取子节点请求
      let that = this;
      let request_map = {}
      let request_url = "/SUMP/call/RPCCall";
      request_map["servicecode"] = "pd0338";
      request_map["group_num"] = "0001";
      request_map["node_cd"] = node.node_cd;
      request_map["node_type"] = node.node_type;
      request_map["is_leaf"] = node.is_leaf;
      that.$http.invokeAPI(request_url, "post", request_map).then(response => {
        // console.log("获取子节点请求", response);
        if (response.code === "200") {
          let data = response.data;
          console.log('data', data);
          data.forEach(item => {
            item.isLeaf = item.is_leaf === "1"
          });
          resolve(data);
        } else {
          MyMessage({
            message: response.message,
            type: 'error'
          });
        }
      });
    },
    // labelCheckedList接收被勾选的数据
    handleCheckChange(data, isCheck) {
      let that = this;
      console.log("勾选数据",data);
      console.log("节点数据", that.$refs.tree.getHalfCheckedNodes());
      if (!data.isLeaf && isCheck) {
        that.$refs.tree.setCheckedKeys([]);
        return MyMessage({
          message: '请点击加载子节点',
          type: 'error'
        });
      }
      setTimeout(() => {
        let currtData = that.$refs.tree.getCheckedNodes(true)
        if (currtData.length > 0) {
          //如果是单选按钮
          if (that.isSingleSelection) {
            // console.log('currtData', currtData);
            let tempObj = that.multipleSelection[0]; //记录了前一个选择的obj
            that.multipleSelection = [];
            if (currtData.length === 1) { //第一次勾选的时候
              that.multipleSelection.push(currtData[0]);
            } else { //多次勾选的时候
              // console.log('isFrontOrBack', that.isFrontOrBack(tempObj, currtData));
              if (that.isFrontOrBack(tempObj, currtData)) { //true 后面是新勾选的 false 前面是新勾选的
                // console.log('后面是新勾选的', currtData[currtData.length - 1].node_cd);
                that.multipleSelection.push(currtData[currtData.length - 1]);
                this.$refs.tree.setCheckedKeys([currtData[currtData.length - 1].node_cd])
              } else {
                // console.log('前面是新勾选的', currtData[0].node_cd);
                that.multipleSelection.push(currtData[0]);
                this.$refs.tree.setCheckedKeys([currtData[0].node_cd])
              }
            }
          } else { //如果是多选按钮
            that.multipleSelection = currtData;
          }
        }
      }, 100);
    },
    //比较勾选的选项是在前面还是后面true 后面是新勾选的 false 前面是新勾选的
    isFrontOrBack(beforObj, NewData) {
      // console.log('NewData----------------', NewData);
      for (let i in NewData) {
        if (NewData[i].node_cd === beforObj.node_cd) {
          console.log('inde', i);
          return (i === '0')
        }
      }
    },
    //
    submit() {
      let that = this;
      that.$dataBus.doCallBack(that, that.multipleSelection[0]);
    },
    clickCancel() {
      let that = this;
      that.$dialog.close();
    },
    handleNodeClick() {
      let that = this;
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
