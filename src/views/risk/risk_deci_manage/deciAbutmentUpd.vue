<template>
  <el-form :model="form" label-width="100px" ref="form">
    <el-row> 
      <el-col :span="10">
        <el-form-item label="决策对接代码" prop="deciAbutCode" required :rules="deciAbutCodeRules" >
          <el-input v-model="form.deciAbutCode" placeholder="请输入决策对接代码" :disabled="true"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="10">
        <el-form-item label="决策对接名称" prop="deciAbutName" required :rules="deciAbutNameRules">
          <el-input v-model="form.deciAbutName" placeholder="请输入决策对接名称"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-form-item label="配置决策" prop="configRule" required :rules="configRules">
          <el-input v-model="form.configRule" :disabled="true"></el-input>
          <el-button type="primary" style="margin-top: 20px;" @click="lookUp">选择配置</el-button>
        </el-form-item>
      </el-col>
       <el-col :span="10">
        <el-form-item label="决策名称" prop="ruleName" required :rules="ruleNameRules">
          <el-input v-model="form.ruleName" placeholder="请输入决策名称"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-form-item label="决策版本" prop="ruleVersion" required :rules="ruleVersionRules">
          <el-input v-model="form.ruleVersion" placeholder="请输入决策版本"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    
    <el-table :data="deciColumList" :border="true" style="width: 98%; text-align: center;"  >
      <el-table-column align="center" header-align="center" label="事实名称" >
        <template slot-scope="scope">
          <!-- <el-form-item :prop="'deciColumList.' + scope.$index + '.deci_fact_name'">
                          <span>{{ scope.row.deci_fact_name }}</span>
                        </el-form-item> -->
          <el-form-item :prop="deci_fact_name" label-width="0px" style="padding: 6% 0% 0% 0%; ">
            <span >{{ scope.row.deci_fact_name }}</span>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="值类型" >

        <template slot-scope="scope">
          <!-- <el-form-item :prop="'deciColumList.' + scope.$index + '.deci_fact_name'">
                          <span>{{ scope.row.deci_fact_name }}</span>
                        </el-form-item> -->
          <el-form-item :prop="value_input_type" label-width="0px" > 
            <el-select v-model="scope.row.value_input_type"  placeholder="请选择值类型" @change="changValueInputTye(scope.row)" style="padding: 6% 0% 0% 0%; ">
              <el-option v-for="item in value_input_types" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="值内容">

        <template slot-scope="scope">
          <el-form-item :prop="column_value" label-width="0px" >
            <span v-if="scope.row.value_input_type === '1'">
            <el-input v-model="scope.row.column_value"  placeholder="请填写值内容" style="padding: 6% 0% 0% 0%;">
              </el-input>
              </span>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="映射表名" >

        <template slot-scope="scope">
          <el-form-item :prop="table_name" label-width="0px">
            <span v-if="scope.row.value_input_type === '0'">
            <el-input v-model="scope.row.table_name"  placeholder="选择表" @click.native="diaTableName(scope.row)" style="padding: 6% 0% 0% 0%;">
            </el-input>
          </span>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column header-align="center" label="映射字段名称" >

        <template slot-scope="scope">
          <el-form-item :prop="column_name" label-width="0px">
            <span v-if="scope.row.value_input_type === '0'">
            <el-select v-model="scope.row.column_name"  placeholder="选择字段" style="padding: 6% 0% 0% 0%;"
              @click.native="tableNameSel(scope.row.table_name)" @change="fieldSelectChange($event, scope.row)">
              <el-option v-for="item in columDefineList" :key="item.column_name" :label="item.column_desc"
                :value="item.column_name">
              </el-option>
            </el-select>
          </span>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column align="center" header-align="center" label="字段处理函数" >
        <template slot-scope="scope">
          <el-form-item :prop="column_func" label-width="0px">
            <span v-if="scope.row.value_input_type === '0'">
            <el-input v-model="scope.row.column_func"  placeholder="填写函数" style="padding: 6% 0% 0% 0%;">
            </el-input>
            </span>
          </el-form-item>
        </template>
      </el-table-column>


    </el-table>

    <el-row>
      <el-col :span="24" style="text-align: center">
        <el-button type="primary" style="margin-top: 10px;" @click="submitForm">提交</el-button>
        <el-button style="margin-top: 10px;" @click="resetForm">重置</el-button>
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
      tableDescList:[],
      columDefineList: [],
      // bmSel:[],
      cnArry: [],
      enArry: [],
      value_input_types: [
        { "label": "变量", "value": "0" },
        { "label": "常量", "value": "1" },
      ],
      form: {
        deciAbutCode: '',
        deciAbutName: '',
        ruleId: '',
        ruleName: '',
        configRule: '',
        ruleVersion: '',
       
        rule_type: ""
      },
      deciColumList: [],
      fied_map: {},
      ruleNameRules: [
        { required: true, message: '请输入决策名称', trigger: 'blur' }
      ],
      configRules: [
        { required: true, message: '请输入配置决策', trigger: 'blur' }
      ],
      deciAbutCodeRules: [
        { required: true, message: '请输入决策对接代码', trigger: 'blur' }
      ],
      deciAbutNameRules: [
        { required: true, message: '请输入决策对接名称', trigger: 'blur' }
      ],
      ruleVersionRules: [
        { required: true, message: '请输入决策对接版本', trigger: 'blur' }
      ],
      // bm: [
      //   { required: true, message: '请输入', trigger: 'blur' }
      // ],
      // zdm: [
      //   { required: true, message: '请输入', trigger: 'blur' }
      // ],
    };
  },
  mounted() {
    //初始化数据字典
    console.log("sad", JSON.parse(localStorage.user_info),)
    this.initData();
  },

  methods: {
   

    fieldSelectChange(e, row) {
      this.$set(row, 'column_desc', this.columDefineList.find(item => item.column_name === e).column_desc);  
      this.$set(row, 'column_type', this.columDefineList.find(item => item.column_name === e).column_type);
      // 将label的值赋值给数组zdch
    },

    tableNameSel(table_name) {
      this.columDefineList = []
      let params = {
        table_name: table_name,
        servicecode: "ms0204",
        appId: this.cParentParams.appId
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200" && res.data) {
          this.columDefineList = res.data
        }
      }).catch(err => {
        console.error(err);
      })
    },

    diaTableName(row) {
      console.log("选择表=============", row);
      
      this.$dialog.open({
        that: this,
        title: "代码内表选择",
        toRequest: {
          url: "/views/msap/adp/project_table_lookup.json",
          method: "post",
          params: {
            appId: this.cParentParams.appId,
          },
        },
        width: "60%",
      });
      this.$dataBus.bindCallBackMethod(this, this.chooseCallBack, row);
    },
    chooseCallBack(row, response) {
      this.$set(row, 'table_name', response.table_name);  
      this.$set(row, 'table_desc', response.table_desc);
    },
 changValueInputTye(row){
  console.log("切换值类型",row)
  if(row.value_input_type ==='0'){
    row.column_value="";
  }
  if(row.value_input_type ==='1'){
    row.table_name="";
    row.column_name="";
    row.column_type="";
    row.column_desc="";
    row.column_func="";
  }
  console.log("切换值类型",row)
 },
 search() {
   let params = {
    servicecode: "ms0308",
    appId:this.cParentParams.appId,
    deci_abut_code:this.cParentParams.deci_abut_code
   }
   MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
    if (res && res.code === "200" && res.data) {
     this.tableDescList = res.data
     } 
     this.tableSelectChange();
     }).catch(err => {
    console.error(err);
    })
  },

   tableSelectChange() {
     for (let row of this.deciColumList) {
      if(row.value_input_type === '0' ){
        row.table_desc = this.tableDescList.find(item => item.table_name === row.table_name).table_desc
      }   
     } 
   },
    initData(){
      this.form.deciAbutCode = this.cParentParams.deci_abut_code;
      this.form.deciAbutName = this.cParentParams.deci_abut_name;
      this.form.ruleName = this.cParentParams.rule_name;
      this.form.configRule = this.cParentParams.rule_id;
      this.form.ruleVersion = this.cParentParams.rule_version;
      this.getRuleParam();
    },
 
    getRuleParam(){
      let params = {
        servicecode: "ms0307",
        appId:this.cParentParams.appId,
        deci_abut_code:this.cParentParams.deci_abut_code
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200" && res.data) {
          this.deciColumList = res.data
        } 
        if(this.deciColumList) { 
          this.search(); 
          for(let item in this.deciColumList) { 
            this.tableNameSel(this.deciColumList[item].table_name); 
          }
        }
        
        }).catch(err => {
          console.error(err);
        })
    },

    lookUp() {

      this.$dataBus.bindCallBackMethod(this, this.chooseViewCallBack, {});
      this.$dialog.open({
        that: this,
        title: "配置决策",
        toRequest: {
          url: "/views/risk/risk_deci_manage/deciAbutmentLookup.json",
          method: "get",
          params: {

          },
        },
        width: "60%",
      });
    },

    chooseViewCallBack(btnConfig, response) {
      this.form.configRule = response.rule_code
      this.form.ruleName = response.rule_name
      this.form.deciAbutCode = response.rule_code
      this.form.deciAbutName = response.rule_name
      this.form.ruleVersion = response.busi_version
      this.form.rule_type = response.rule_type
      console.log("daihui", response)
      let reqMap = {
        servicecode: "deci030006",
        appId: "deciOnl",
        model_id: response.rule_code,
        model_version: response.busi_version,
        model_type: response.rule_type,
        org_id: JSON.parse(localStorage.user_info).org_id
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap)
        .then(res => {
          if (res && res.code === "200") {
            this.field_map = res.data.field_map;
         
            const keys = Object.keys(this.field_map);
            const vals = Object.values(this.field_map);
            let jm = ""
            let deciColumList = [];

            for (const item of keys) {
              if (item != "actions" && item != "ruleType") {
                jm = item
              }

              // 遍历对象的键和值
              for (const key in res.data.field_map[jm]) {
                if (res.data.field_map[jm].hasOwnProperty(key)) {
                  const keyValue = key.split('-');
                  if (keyValue.length === 2) {
                    let fact_define = {
                      deci_fact_name: "",
                      deci_fact_code: "",
                      value_input_type: ""
                    };
                    fact_define.deci_fact_name = keyValue[1];
                    fact_define.deci_fact_code = jm + '.' + keyValue[0];
                    deciColumList.push(fact_define);
                  }
                }
              }
            }
            this.deciColumList = deciColumList;

          }
        })
    },

    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {

          let hasEmptyValue =false;
          for (let row of this.deciColumList) {
            if(row.value_input_type ===  undefined || row.value_input_type === null 
              || row.value_input_type === ''){
              this.$message.warning("请完善配置信息中的所有配置项")
               return false; 
              } 
              else if(row.value_input_type === '1'){
                if(row.column_value === null || row.column_value === undefined || row.column_value === ''){
                hasEmptyValue = true;
                break;
              }}
              else if(row.value_input_type === '0'){
                if(row.table_name === null || row.table_name === undefined || row.table_name === '' 
              || row.table_desc === undefined ||row.table_desc === null || row.table_desc=== '' 
              || row.column_desc === undefined ||row.column_desc === null || row.column_desc=== '' 
              || row.column_func === undefined || row.column_func === null || row.column_func === ''){
                hasEmptyValue = true;
                break;
              }}
            
          }
          if (hasEmptyValue) {  
                    // 如果存在空值，可以显示一个警告或错误消息  
                   this.$message.warning("请完善配置信息中的所有配置项")
                   console.log("配置项未完善")
                   return false;  
                 }

             
          console.log("提交")
          let params = {
            servicecode: "ms0305",
            appId: this.cParentParams.appId,
            deciParm: this.deciColumList,
            rule_name: this.form.ruleName,
            rule_id: this.form.configRule,
            deci_abut_code: this.form.deciAbutCode,
            deci_abut_name: this.form.deciAbutName,
            rule_version: this.form.ruleVersion,

          };
         
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
            if (res && res.code === "200" && res.data) {
              // this.$dialog.close();
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