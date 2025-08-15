<template>
  <el-form :model="form" label-width="100px" ref="form">
    <el-row>
      <el-col :span="10">
        <el-form-item label="决策对接代码" prop="deciAbutCode" required :rules="odbRules">
          <el-input v-model="form.deciAbutCode" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
     <el-col :span="10">
        <el-form-item label="数据库表名" prop="tableName" required :rules="odbRules">
          <el-input v-model="form.tableName" :disabled="true"></el-input>
        </el-form-item>
      </el-col>    
    </el-row>

    <el-row>
      <el-col :span="10">
        <el-form-item label="数据库表描述" prop="tableDesc" required :rules="odbRules">
          <el-input v-model="form.tableDesc" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
    </el-row> 
      
    <el-row>
     <el-col :span="10">
        <el-form-item label="odb索引代码" prop="odbindexName" >
          <el-select v-model="form.odbindexName" @click.native="search()" @change="odbindexTypeChange($event)" > 
         <el-option
        v-for="item in odbSel"
        :key="item.value"
        :label="item.odbindex_name"
        :value="item.odbindex_name"
      ></el-option>
    </el-select>
        </el-form-item>
      </el-col> 
      <el-col :span="10" >
        <el-form-item label="odb索引类型" prop="odbindexType" >
        <el-select v-model="form.odbindexType" >
        <el-option
        v-for="item in odbIndexTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
      ></el-option>
    </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    
    <el-row>
      <el-col :span="24" style="text-align: center">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <!-- <el-button @click="resetForm">重置</el-button> -->
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
export default {
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      
      odbSel:[],
      form: {
        deciAbutCode: '',
        tableName: '',
        odbindexName: '',
        odbindexType: '',
        tableDesc: '',
      },
      odbRules: [
        { required: true, message: '请输入', trigger: 'blur'}
      ],
      odbIndexTypeOptions: [
      { value: 'unique', label: '唯一索引' },
      { value: 'index', label: '普通索引' },
    ]
    };
  },
  mounted() {
    //初始化数据字典
    this.search();
    this.initData();
  },

  methods: {
    odbindexTypeChange(e){
     this.form.odbindexType = this.odbSel.find(item => item.odbindex_name === this.form.odbindexName).odbindex_type;
   },

    search(){    
     let params = {
       servicecode: "ms0214",
       appId:this.cParentParams.appId,
       table_name:this.cParentParams.table_name,
     }
     MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
       if (res && res.code === "200" && res.data) {
        console.log("ms0214",res.data)
        this.odbSel = res.data

       }
     }).catch(err => {
      console.error(err);
     })
   },

    initData(){
      this.form.deciAbutCode = this.cParentParams.deci_abut_code;
      this.form.tableName = this.cParentParams.table_name;
      this.form.tableDesc = this.cParentParams.table_desc;
      this.form.odbindexName = this.cParentParams.odbindex_name;
      this.form.odbindexType = this.cParentParams.odbindex_type;
      this.getRuleParam();
    },

    submitForm() {
    
      this.$refs.form.validate(valid => {
        if (valid) {

          console.log("提交")
          let params = {
            servicecode: "ms0306",
            appId:this.cParentParams.appId,
            deci_abut_code: this.form.deciAbutCode,
            table_name:this.form.tableName,
            odbindex_name:this.form.odbindexName,
            odbindex_type:this.form.odbindexType,
            table_desc:this.form.tableDesc,
            
          }
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
            if (res && res.code === "200" && res.data) {
              this.$dataBus.doCallBack(this, res);

            }
          }).catch(err => {
            console.error(err);
          })


        } else {
          // 表单验证不通过
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
  },
};
</script>

<style scoped>
.full-width {
  width: 100%;
}
</style>