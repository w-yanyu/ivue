<template>
  <div class="page_content">
    <!-- 规则树交易查询 -->
    
    <!-- G6 决策树渲染块 -->
    <DecisionDealTree ref="decisionTree" @add="addStock" @delete="deleteStock" @checkView="checkView"
      @setActionList="setActionList"></DecisionDealTree>

    <!-- 查看弹框 -->
    <el-dialog title="查看" :visible.sync="dialogVisible3" width="70%" :append-to-body='true' >
      <div class="tips">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" >

          <el-form-item v-if="ruleForm.ruleTreeNodeId !==''" label="规则树ID" prop="ruleTreeNodeId" label-width="120px">
            <el-input :disabled="true" v-model="ruleForm.ruleTreeNodeId" style="width: 30%"></el-input>
          </el-form-item>

          <el-form-item label="节点类型" prop="nodeType" label-width="120px">
            <el-select v-model="ruleForm.nodeType" :disabled="true" placeholder="节点类型" @change="changeType" style="width: 30%">
              <el-option v-for="item in nodeTypeOptions" :key="item.value" :label="item.label" :value="item.value" >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="规则表达式" v-if="ruleForm.nodeType == '1' " label-width="120px">
            <el-input :disabled="true" placeholder="请输入"  spellcheck="false" style="width: 80%"
              v-model="ruleForm.ruleExpress"></el-input>
          </el-form-item>

          <el-form-item label="规则描述" v-if="ruleForm.nodeType == '1' " label-width="120px">
            <el-input :disabled="true" placeholder="请输入" v-model="ruleForm.ruleDesc" style="width: 80%"
              spellcheck="false"></el-input>
          </el-form-item>
           <el-form-item label="输入值" v-if="ruleForm.nodeType == '1' " label-width="120px">
            <el-input :disabled="true" placeholder="请输入" v-model="ruleForm.inputValues" style="width: 80%"
              spellcheck="false"></el-input>
          </el-form-item>

          <el-form-item v-if="ruleForm.nodeType === '2' " prop="actionList" label="动作列表" label-width="120px">
            <ActionConfiguration ref="actionConfiguration" isDisable='true' :cParentParams='cParentParams'>
            </ActionConfiguration>
          </el-form-item>

        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="tip-left">
          <el-button type="primary" @click="dialogVisible3=false">取消</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  // 动作组件
  import ActionConfiguration from '@/components/ActionConfiguration.vue';
  // 决策树组件
  import DecisionDealTree from '@/components/DecisionDealTree.vue';
  // import nodeMenu from './nodeMenu.vue'
  import TreeRuleAdapter from '@/components/TreeRuleAdapter.js';


  export default {
    props: {
      cMeta: Object, //本页面模板json数据Layout对象
      cParentMeta: Object, //父页面模板json数据Layout对象
      cParentParams: Object, //父页面自定义参数与内置参数
      cParentScope: Object ,//父页面每块区域业务数据
      tree: {type:Object}
    },
    name: 'tree',
    components: {
      ActionConfiguration,
      DecisionDealTree
    },
    data() {
      return {
        cParams: this.cParentParams,
        propsData: {},
        treeData: '',
        nodeTreeDat: '', //节点树的数据
        actionType: [{
            value: "1",
            label: "插入"
          },
          {
            value: "2",
            label: "更新"
          },
          {
            value: "3",
            label: "删除"
          },
        ],
        dialogVisible3: false, // 删除提示弹框
        dataList: '',
        ruleForm: {
          ruleTreeNodeId: '', //节点
          treeId: '', //根节点
          nodeType: '', //节点类型
          nodeIdFrom: '', //上一节点
          ruleLeft: '', //左表达式
          ruleLeftName: '', //左表达名称
          ruleLeftDataType: '', //左表达类型
          ruleOperate: '', //操作符
          ruleRight: '', //右表达式
          ruleExpress: '', //执行表达式
          ruleDesc: '', //规则描述
          partnerName: "",
          inputValues: '', //
          proportionShares: null,

        },

        nodeTypeOptions: [{
            label: "分支节点",
            value: 1
          },
          {
            label: "叶子节点",
            value: 2
          },
          {
            label: "根节点",
            value: 3
          },
        ], // 节点类型 查看编辑

        lastId: 11, // 最后一级id
        currentTreeData: {},
      }
    },
    mounted() {
      console.log("父类传过来的参数", this.cParentParams);
      console.log("父类传11过来的参数", this.tree);
      this.initTreeData();
    },
    computed: {
      // 规则描述
      getZhRuleDesc() {
        let result = TreeRuleAdapter.getTreeRuleDesc(this.ruleForm);
        this.ruleForm.ruleDesc = result;

        return result;
      },
      //规则表达式
      getRuleExpress() {
        let result = TreeRuleAdapter.getTreeRuleExpress(this.ruleForm);
        this.ruleForm.ruleExpress = result;
        return result;
      }
    },
    methods: {
      //加载树参数
      initTreeData() {
        let that = this;
        that.treeData = that.tree.treeout;
        console.log('获取树数据回调', that.treeData);
        console.log('树的子类=====', that.treeData.children);
        that.treeData = that.initData(that.treeData);
        console.log('处理后的数据++++', that.treeData);
        that.$refs.decisionTree.renderTreeData(that.treeData);
      },

      initData(data) {
        data.collapsed = false;
        if (data.children && data.children.length > 0) {
          data.children.forEach((item, index, arrs) => {
            this.initData(item)
          });
        }
        return data;
      },
      setActionList(actionList) {
        let that = this;
        that.$nextTick(() => {

          console.log('目录动作节点编辑事件--组件', that.$refs);
          console.log('动作列表值=====', actionList);
          if (that.$refs.actionConfiguration) {
            that.$refs.actionConfiguration.setActionList(actionList);
          }
        })
      },

      checkView(data) {
        this.dialogVisible3 = true
        this.ruleForm = Object.assign(this.ruleForm, data);
        console.log("这个数据是====",data);
      }
    }
  }
</script>

<style lang="css" scoped>
  .page_content {
    width: 100%;
    height: 100%;
    /* border: 1px solid; */
    position: relative;
  }
  .tips{
    width: 100%;
  }
  DecisionTree {
    width: 100%;
    height: 100%;
  }
</style>
