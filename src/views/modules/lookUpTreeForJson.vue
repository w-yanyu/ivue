<!-- 查询树针对json组件  使用方法
json文件中添加

         "ieinna": {
                "control": "lookup",
                "span": "8",
                "width": "25px",
                "label": "限制或鼓励行业(新标准)",
                "placeholder": "点击行业",
                "toRequest": {
                  "url": "@jsonLookUpTree",
                  "method": "post",
                  "params": {
                    "treeTitle": "限制或鼓励行业(新标准)",   //传给树组件对话框标题使用
                    "treeType": "3",                        // 传给树组件树数据
                     "isSingleSelection": "true",           // 传给树组件是否是单选，可不填写
                  }
                },
                "keyField": {
                  "ieinna": "node_name"  //ieinna  接收选中后返回值的参数
                                          //node_name 需要组件返回的参数 具体看接口返回参数
                }
              },

-->
<template>
  <div class="branch-tree">
    <div class="branch-tree--title">
      <div class="branch-title--left">{{treeTitle}}</div>
      <div class="branch-title--right">
        <!-- <el-input size="samll" v-model="saveFilter" suffix-icon="el-icon-search" @input="filterSave" ></el-input> -->
      </div>
    </div>

    <el-tree :data="treeData" :props="defaultProps" :load="loadNode" @node-click="handleNodeClick"
      @check-change="handleCheckChange" lazy show-checkbox highlight-current ref="tree" node-key="node_cd"
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
    name: "safeLiveTree",
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对象
      //树的标题
      treeTitle: {
        type: String,
        default: '我是标题'
      },
      //获取哪颗树的数据
      treeType: {
        type: String,
        default: '1'
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
        multipleSelection: [], //勾选的叶子节点,
        rebackName:"",//要待会的参数名字
        rebackValue:"",//要待会的参数名字
      }
    },
    created() {
      console.log("cMeta", this.cMeta);
      console.log("cParentParams", this.cParentParams);
      console.log("cParentMeta", this.cParentMeta);
      console.log("cParentScope", this.cParentScope);
       this.initPage();
    },
    mounted() {

    },
    methods: {
      //初始化相关参数
      initPage() {
        let that = this;
        that.treeTitle = that.cParentParams.treeTitle ? that.$i18ns(that.cParentParams.treeTitle) : "";
        that.treeType = that.cParentParams.treeType ? that.cParentParams.treeType : "1"
        that.isSingleSelection = that.cParentParams.isSingleSelection ? that.cParentParams.treeType : true;
        that.rebackName=that.cParentParams.keyField ;
        that.rebackValue = that.cParentParams.industry_type_code
        
      },
      loadNode(node, resolve) { // 加载 树数据
        // console.log('获取节点数据');
        // console.log('获取节点数据 node', node);
        let that = this;
        if (node.level === 0) {
          that.loadtreeData(resolve);
        }
        if (node.level >= 1) {
          this.getChildByList(node.data.node_cd, resolve);
          return resolve([]); // 加上这个，防止在该节点没有子节点时一直转圈的问题发生。
        }
      },
      loadtreeData(resolve) { // 获取loadtreeData 就是父节点数据，getChildByList就是异步获取子节点数据
        let that = this;
        let request_map = {}
        let request_url = "/SUMP/call/RPCCall";
        request_map["servicecode"] = "ct2201";
        request_map["parent_node_cd"] = '';
        request_map["tree_type"] = that.treeType;
        that.$http.invokeAPI(request_url, "post", request_map).then(response => {
          // console.log("获取根节点请求", response);
          if (response.code === "200") {
            let data = response.data;
            console.log("====="+response.toString);
            console.log("====="+data);
            // 前者item.参数名称为 prop中的规定的属性名称
            data.forEach(item => {
              item.label = item.node_name;
              item.parentId = item.parent_node_cd;
              item.id = item.node_cd;
              item.isLeaf = item.is_leaf === "Y"
            });
            console.log("====="+data);
            resolve(data)
          } else {
            MyMessage({
              message: response.message,
              type: 'error'
            });
          }
        });
      },
      getChildByList(_parentID, resolve) { // 获取子节点请求
        let that = this;
        let request_map = {}
        let request_url = "/SUMP/call/RPCCall";
        request_map["servicecode"] = "ct2201";
        request_map["parent_node_cd"] = _parentID;
        request_map["tree_type"] = that.treeType;
        that.$http.invokeAPI(request_url, "post", request_map).then(response => {
          // console.log("获取子节点请求", response);
          if (response.code === "200") {
            let data = response.data;
            console.log('data', data);
            data.forEach(item => {
              item.isLeaf = item.is_leaf === "Y"
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
      handleCheckChange(data, isCheck, children) {
        // console.log('data', data);
        // console.log('isCheck', isCheck);
        // console.log('children', children);
        let that = this;
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
        // this.$emit('closeDialog', that.multipleSelection)
        console.log("返回带给前页的值----", that.multipleSelection);
        let response={};
         // response[that.rebackName] = that.multipleSelection[0][that.rebackName];
         response[that.rebackName] = that.multipleSelection[0].node_name;
         response[that.rebackValue] = that.multipleSelection[0].node_cd;
        console.log('response',response);
        that.$dataBus.doCallBack(that, response);
        this.cParentScope.parentFormModel[that.rebackValue.toString()] = that.multipleSelection[0].node_cd;
        console.log("ceshi1",this.cParentScope.parentFormModel[that.rebackValue.toString()]);
      },
      clickCancel() {
        let that = this;
        // that.$emit('closeDialog');
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
