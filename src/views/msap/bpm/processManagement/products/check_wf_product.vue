<template>
<div>
  <el-table
    :data="checkList"
    style="width: 100%;margin-bottom: 20px;"
    row-key="warn_msg"
    border
    :tree-props="{children: 'child_list', hasChildren: 'hasChildren'}">
     <el-table-column label="序号"
      type="index"
      width="55">
    </el-table-column>
    <el-table-column     label="检查内容" width="400">
       <template slot-scope="scope">
       <span v-if="scope.row.check_flag==='1'">
         <font color="#40E0D0">
           {{ scope.row.warn_msg }} 
         </font>
       </span>
       <span v-if="scope.row.check_flag==='0'">
           <font color="#FF0000">
            {{ scope.row.warn_msg }} 
          </font>
       </span>
       </template>
    </el-table-column>
    <el-table-column label="检查结果" width="100" align="center">
     <template slot-scope="scope">
       <span v-if="scope.row.check_flag==='1'">  
      <img     src="./check.png" ></img>
       </span>
       <span v-if="scope.row.check_flag==='0'">
       <img     src="./close.png" ></img>
       </span>
        </template>
    </el-table-column>
  
    <el-table-column  label="错误信息">
      <template slot-scope="scope">
       <span v-if="scope.row.check_flag==='1'">
       <font color="#40E0D0">
       {{ scope.row.check_msg }} 
       </font>
       </span>
       <span v-if="scope.row.check_flag==='0'">
       <font color="#FF0000">
       {{ scope.row.check_msg }} 
       </font>
       </span>
       </template>
    </el-table-column>
  </el-table>
</div>
</template>




<script>
import MyAxios from "pte-ui/utils/MyAxios";
  export default {
     name: "Parent",
    props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
     },
    data() {
      return {
        checkList: [],
        fontColor: ['#0477ff', '#01b470', '#ff711b', '#ff4848', '#8b48f7'],
        fontBackColor: ['#edf3ff', '#e6fbf3', '#ffece1', '#fff3f3', '#f5efff'],
        childShow:true,
        grandShow:true
        }
   },
       created() {
        this.initCheckList();
    },
  methods: {    
  initCheckList(){
    
      let params = {
         wf_prod_no: this.cParentParams.wf_prod_no,
         bpm_version: this.cParentParams.bpm_version,
         servicecode: "bpm0057",
         appId: this.cParentParams.appId
       };
       MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
         .then((res) => {
           if (res && res.code === "200") {
            this.checkList = res.data;
            console.log(this.checkList);
           }
         })
         .catch((err) => {
           console.error(err);
         });
    }
  }
}

</script>