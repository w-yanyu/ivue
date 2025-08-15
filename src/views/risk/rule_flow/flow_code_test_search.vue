<template>
  <div style="width: 650px;">
            <el-form :model="form" :rules="rules" ref="form" span="24" label-position="right">
            <el-row>
                <el-col span="12">
                    <el-form-item label="规则流代码" prop="flowCode" required="true">
                        <el-input
                            class="input_el_70"
                            placeholder="请点击按钮选择"
                            disabled
                            v-model="form.flowCode"
                            type="text"
                        ></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="规则流名称" prop="flowName">
                        <el-input
                            class="input_el_70"
                            disabled
                            v-model="form.flowName"
                            type="text"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
  <el-tabs   type="border-card">
  <el-tab-pane label="评分卡">
    <div class="tbl" style="width: 100%;margin-left: -12px;">
    <el-table 
    :cell-style="{'text-align':'center'}"
      :data="useList"
      :row-class-name="tableIndex1"
      style="width: 100%">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="scoreCardCode" label="评分卡代码"></el-table-column>
      <el-table-column prop="scoreCardName" label="评分卡名称"></el-table-column>
      <el-table-column   label="操作">
        <template slot-scope="scope">
        <el-button @click="usegl(scope.$index)" type="text" size="small">查看</el-button>
         
      </template>
      </el-table-column>
      
    </el-table>
</div>
  </el-tab-pane>
  <el-tab-pane label="规则">  <div class="tbl" style="width: 100%;margin-left: -12px;">
    <el-table 
    
    :cell-style="{'text-align':'center'}"
      :data="roleList"
      style="width: 100%">
      <el-table-column  type="index" label="序号"></el-table-column>
      <el-table-column prop="ruleCode" label="规则代码"></el-table-column>
      <el-table-column prop="ruleName" label="规则名称"></el-table-column>
      <el-table-column prop="date" label="操作">
        <template slot-scope="scope">
        <el-button @click="rulegl(scope.$index)" type="text" size="small">查看</el-button>
         
      </template>
      </el-table-column>
      
    </el-table>
</div></el-tab-pane>
  <el-tab-pane label="规则组">  <div class="tbl" style="width: 100%;margin-left: -12px;">
    <el-table 
    :cell-style="{'text-align':'center'}"
      :data="groupList"
      style="width: 100%">
      <el-table-column  type="index" label="序号"></el-table-column>
      <el-table-column prop="groupCode" label="规则组代码"></el-table-column>
      <el-table-column prop="groupName" label="规则组名称"></el-table-column>
      <el-table-column prop="date" label="操作">
        <template slot-scope="scope">
        <el-button @click="groupgl(scope.$index)" type="text" size="small">查看</el-button>
         
      </template>
      </el-table-column>
      
    </el-table>
</div>
</el-tab-pane>

  <el-tab-pane label="规则树">  <div class="tbl" style="width: 100%;margin-left: -12px;">
    <el-table 
    :cell-style="{'text-align':'center'}"
      :data="treeList"
      style="width: 100%">
      <el-table-column type="index"  label="序号"></el-table-column>
      <el-table-column prop="treeCode" label="规则代码树"></el-table-column>
      <el-table-column prop="treeName" label="规则树名称"></el-table-column>
      <el-table-column prop="date" label="操作">
        <template slot-scope="scope">
        <el-button @click="treegl(scope.$index)" type="text" size="small">查看</el-button>
         
      </template>
      </el-table-column>
      
    </el-table>
</div></el-tab-pane>
</el-tabs>

<el-dialog
title="评分卡"
:visible.sync="useDia"  
:before-close="handleClose">
<useDia
ref:useData
:cept="cept"
></useDia>
</el-dialog>

<el-dialog
title="普通规则"
:visible.sync="optsDiaShow"
:before-close="handleClose">
<optsDia
ref:optsDia
:ptrule="ptrule">
  
</optsDia>
</el-dialog>

<el-dialog
title="规则组"
:visible.sync="roleDiaShow"
:before-close="handleClose"
>
<roleDia
:group="group"
ref:roleDia></roleDia>
</el-dialog>

<div v-if="TreeDia">
  <el-dialog
title="规则树"
:visible.sync="TreeDia"
:before-close="handleClose"
>
<treeDia
:tree="tree"
ref:treeDia></treeDia>
</el-dialog>
</div>







</div>
</template>

<script>

import useDia from  "./ee/risk_score_card_test_result.vue"
import optsDia from "./ee/risk_decision_rule_test_result.vue"
import roleDia from "./ee/risk_decision_rule_group_test_result.vue"
import treeDia from "./ee/decisionTreeResuleTest.vue"

  export default {
    props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object, // 父页面的scope数据对象
    },
    components: {
      useDia,
      optsDia,
      roleDia,
      treeDia
    },
    data() {  
      return {
         responseData: "",
        tbindex: 0,
        ptrule:{},
        cept:{},
        group:{},
        tree:{},
        form: {
         flowCode: "", // 规则流代码
         flowName: "", // 规则流代码
            },
        res:{
  
},


      
        TreeDia:false,
        useDia:false,
        optsDiaShow:false,
        roleDiaShow:false,
   useList: [],
roleList :[],
groupList : [],
treeList:[],
      
         
 
      }
    },
    created(){
      this.getOpts();
      console.log("22",this.res)
    this.responseData =  this.cParentParams.reponse
    console.log("报文",this.cParentParams)

    },
        mounted() {
        console.log("--------------------")
            console.log("报文",this.cParentParams)
    this.form.flowCode = this.cParentParams.flow_code;
    this.form.flowName = this.cParentParams.flow_name;
    },
    methods:{
           copy() {
        this.$dialog.open({
          that: this,
          title: "测试成功，规则流响应数据如下：",
          toRequest: {
            url: "@flowResultInfoDetailTest",
            method: "get",
            params: {
                score_result: this.responseData
            },
          },
          width: "60%",
        });
    },

getOpts(){
  //将结果的string转对象，
  this.res  = JSON.parse(this.cParentParams.flow_result_info);
  //this.res = this.cParentParams.flow_result_info;
  console.log("数1据",this.res)
  this.cardOpts()
},

rulegl(val){
  console.log("sb",this.roleList)
this.optsDiaShow = true
this.ptrule = this.roleList[val]

 
},


usegl(val){
this.useDia = true
this.cept = this.useList[val]
 
},

groupgl(val){
this.roleDiaShow = true
this.group = this.groupList[val]
console.log(this.group)
 
},

treegl(val){
this.TreeDia = true
this.tree = this.treeList[val]
console.log(this.tree)
 
},
     
      
cardOpts(){
let list1 = []
let list2 = []
let list3 = []
let list4 = []

this.res.flowExecInfo.detail.forEach((item,index) => {
  if (item.hasOwnProperty('scoreCardName')){
    list1.push(item);
  }

  if (item.hasOwnProperty('ruleCode')){
    list2.push(item);
  }

  if (item.hasOwnProperty('groupCode')){
    list3.push(item);
  }
  if (item.hasOwnProperty('treeCode')){
    list4.push(item);
  }

});

this.useList = list1
this.roleList = list2
this.groupList = list3
this.treeList = list4
console.log("popop",this.groupList)

}  


    },
  }
</script> 
