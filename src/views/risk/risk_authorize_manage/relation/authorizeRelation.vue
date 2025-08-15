<template>
  <div>
    <el-row>
      <el-col :span="11" class="tree-left-main">
        <el-row>
          <div class="leftBox">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item>适用机构:</el-breadcrumb-item>
          </el-breadcrumb>
          <ol>
            <li
              v-for="(item, index) in tableData"
              :key="index"
              :class="{changeBackground:liClickIndex == index}"
              @click="generateTree(item.dictId, index)" >
              <i slot="suffix" class="el-input__icon el-icon-s-cooperation"></i>
              {{ item.dictName }}
            </li>
          </ol>
          </div>
        </el-row>
      </el-col>
      <el-col :span="13" class="tree-right-main">
       <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
        <el-tree
          ref="tree"
          :key="refreshTreeKey"
          :data="treeDataList"
          :props="nodeInfo"
           node-key="model_id"
          show-checkbox
          :default-checked-keys="selectedList"
          @check-change="handleCheckChange"
          >
        </el-tree>
       
      </el-col>
    </el-row>
    <el-row class="button-footer" v-if="!isOnlyRead">
          <el-col :span="24">
            <el-button class="btnwz" type="primary" @click="saveRelation">保存</el-button>
          </el-col>
        </el-row>
  </div>
</template>

<script>
 import MyAxios from "pte-ui/utils/MyAxios";
 import MyMessage from "pte-ui/utils/MyMessage";

export default {
  name: "AuthorizeRelation",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  // watch: {
  //   selectedList() {
  //     this.$nextTick(() => {
  //       this.handleCheckChange();
  //     })
  //   }
  // },
  data() {
    return {
      checkAll:false,
      nodeInfo: {
        label:'model_name',//模型名称
        children:'children',
        /*      modelId: "",
          modelName: "",
          modelVersion: ""//模型版本*/
      },
      systemBranchId: "", //机构编号
      systemId: "", //系统编号
      isShow: false, //右侧树页面是否展示
      treeDataList: [], //树型数据列表
      selectedList: [], //被选中的节点列表
      systemList: [], //系统列表
      branchList: [], //机构列表
      tableData: [],  //系统所属机构列表
      isOnlyRead: false,
      liClickIndex: 1000,
      refreshTreeKey: 1000,
      checkedList : [],
      isIndeterminate:false,
    }
  },
  created() {
    console.log("cMeta",this.cMeta);
    console.log("cParentParams",this.cParentParams);
    console.log("cParentMeta",this.cParentMeta);
    console.log("cParentScope",this.cParentScope);
    this.init();
    this.getDictList("RISK_E_DOCKING_SYSTEM", "branchList");
    this.getSystemList();
  },
  methods: {
    init() {
      this.systemBranchId = this.cParentParams.systemBranchId;
      this.systemId = this.cParentParams.systemId;
      let lastIsOnlyRead = this.cParentParams.isOnlyRead;
      if (lastIsOnlyRead !== null && lastIsOnlyRead !== undefined && lastIsOnlyRead !== ""){
        this.isOnlyRead = lastIsOnlyRead;
      }
      //默认选中第一条数据
      this.liClickIndex = 0;
    },
  handleCheckAllChange(val){
      if (this.checkAll) {
        this.$refs.tree.setCheckedNodes(this.treeDataList);
      } else {
        this.$refs.tree.setCheckedKeys([]);
      }
     this.isIndeterminate=false;
  },
  // handleCheckChange(val){
  //   console.log("checkAll----",this.checkAll);
  //   if (this.selectedList.length != this.treeDataList.length) {
  //     this.checkAll = false;
  //     if (this.selectedList.length != 0) {
  //       this.isIndeterminate = true;
  //     } else {
  //       this.isIndeterminate = false;
  //     }
  //   } else {
  //     this.checkAll = true;
  //     this.isIndeterminate = true;
  //   }
    
  // },
    selectFirst(branchId){
      //console.log("this.cParentParams.systemBranchId",this.cParentParams.systemBranchId);
      if(this.cParentParams.systemBranchId=="000000"){
          this.generateTree(branchId,0);
        }else{
          this.generateTree(this.cParentParams.systemBranchId,0);
        }
    },
    /**
     * 初始化表格数据
     */
    generateTableData() {
      //if (this.systemBranchId === this.branchList[0].dictId) {
       // 000000  全系统
      if (this.systemBranchId === "000000") {
        this.tableData = this.branchList;
      } else {
        let index = 0;
        for (let i = 0; i < this.branchList.length; i++) {
          if (this.branchList[i].dictId === this.systemBranchId) {
            index = i;
          }
        }
        this.tableData.push(this.branchList[index]);
      }
      this.getSelectedTreeNode(this.tableData[0].dictId);
      //选择第一条数据
      this.selectFirst(this.branchList[0].dictId);
    },
    /**
     * 初始化树型数据
     */
    async generateTree(systemBranchId, index) {
      this.liClickIndex = index;
      this.getAllTreeNode(systemBranchId);
      console.log("systemBranchId:", systemBranchId);
      this.systemBranchId = systemBranchId;
      await this.getSelectedTreeNode(systemBranchId);
      this.isShow = true;
    },
    /**
     * 获取所有树节点
     */
    async getAllTreeNode(branch_id) {
      let that = this;
      let reqMap = {
        servicecode: "deci090106",
        branch_id: branch_id
      }
      await MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
        if (res && res.code === "200") {
          that.treeDataList = res.data;
          console.log(res.data);
          if (that.isOnlyRead){
            that.setOnlyReadList(that.treeDataList)
          }
        }
      }).catch(err => {
        console.error(err);
      });
      // this.isShow = true;
    },
    /**
     * 获取被选中的节点
     */
    getSelectedTreeNode(systemBranchId) {
      let that = this;
      let reqMap = {
        servicecode: "deci090107",
        systemId: that.systemId,
        systemBranchId: systemBranchId
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
        if (res && res.code === "200") {
          let tempList = res.data;
          let tempSelectedList = [];
          for (const tempListElement of tempList) {
            tempSelectedList.push(tempListElement.modelId);
          }
          that.selectedList = [];
          that.selectedList = tempSelectedList;
          //刷新树表格
          ++this.refreshTreeKey;
        }
      }).catch(err => {
        console.error(err);
      });
      // this.isShow = true;
    },
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictType
     * @param listKey 列表对象key名称
     */

    async getDictList(dictType, listKey) {
      let that = this;
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      }
      await MyAxios.invokeAPI("/SUMP/rest/dict", "post", params).then(res => {
        if (res && res.code === "200") {
          that[listKey] = res.data;
          console.log("这里", that.branchList);
          this.generateTableData();
        }
      }).catch(err => {
        console.error(err)
      })
    },

    getSystemList() {
      let that = this;
      let reqMap = {
        servicecode: "deci090101"
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
        if (res && res.code === "200") {
          that.systemList = res.data;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    chooseSystemCallBack(index) {
      console.log("下标：" + index);
      let tempObj = this.systemList[index];
      this.searchData.systemId = tempObj.systemId;
      this.searchData.systemBranchId = tempObj.systemBranchId;
    },
    /**
     * 保存模型关联列表
     */
    saveRelation(){
      let that = this;
      let selectedTreeNodeList = that.$refs.tree.getCheckedNodes();
      if (selectedTreeNodeList.length === 0){
        MyMessage({
          message: "请选择授权模型！",
          type: 'error'
        });
        return;
      }else{
        this.checkedList = [];
        selectedTreeNodeList.forEach((item) => {
          if(item.model_type != null){
            this.checkedList.push(item);
          }
        });
      }
      let reqMap = {
        servicecode: "deci090109",
        system_id: that.systemId,
        system_branch_id: that.systemBranchId,
        list: this.checkedList
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
        if (res && res.code === "200") {
          MyMessage({
            message: res.message,
            type: 'success'
          });
        }
      }).catch(err => {
        console.error(err);
      });
    },
    setOnlyReadList(list){
      for (let i = 0; i < list.length; i++) {
        list[i].disabled =true;
        if (list[i].children !== null &&
          list[i].children !== undefined &&
          list[i].children.length !== 0){
          this.setOnlyReadList(list[i].children);
        }
      }
    },
    // convertTreeData(nodes) {
    //   for (let i = 0; i < nodes.length; i++) {
    //     if (nodes[i].children != undefined) {
    //       const temp = nodes[i].children;
    //       delete nodes[i].children;
    //       nodes = nodes.concat(temp);
    //     }
    //   }
    //   return nodes;
    // }
  }

}
</script>

<style lang="less" scoped>
.custom-common--form {
  padding: 0;

  .el-row .el-col {
    padding-right: 16px;
  }
}

.row-cell {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tableList {
  border: 0px !important;
}
.btnwz{
  margin-left:370px
}

.tree-right-main {
  height: 360px;
  overflow-y: auto;
  padding: 15px !important;
}

.tree-left-main {
  border-radius: 0px;
  border-right: 1px solid #C0C4CC;
  height: 360px;
  overflow-y: auto;
  padding: 15px !important;
}
.button-footer {
  text-align: center;
  padding: 10px 0 10px 0;
}
.changeBackground{
  background: #eaecf0;
}
</style>
