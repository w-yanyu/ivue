<template>
  <div>
    <div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" :inline="true">
          <el-col span="12">
            <el-form-item label="元数据编号" prop="metadata_id" v-show="true">
              <el-input
                placeholder=""
                v-model="ruleForm.metadata_id"
                class="form-input" style="width:250%;"
                :disabled="isdisabled"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="获取方式" prop="obtain_mode" v-show="true">
              <el-select placeholder="请选择获取方式" v-model="ruleForm.obtain_mode" @change="obtain_modeChange" style="width:225%;">
              <el-option
                v-for="(item, index) in obtainmodeDict"
                :key="index"
                :label="item.dictId+'-'+item.dictName"
                :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="元数据分类" prop="metadata_type" v-show="isShow1">
              <el-select placeholder="请选择元数据分类" v-model="ruleForm.metadata_type" @change="metadata_typeChange" style="width:225%;">
              <el-option
                v-for="(item, index) in metadatatypeDict"
                :key="index"
                :label="item.dictId+'-'+item.dictName"
                :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="元数据名称" prop="metadata_name" v-show="true">
              <el-input
                placeholder=""
                v-model="ruleForm.metadata_name"
                class="form-input" style="width:250%;"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item :label="$i18ns('数据类型')" prop="data_type" v-show="true">
              <el-select placeholder="请选择数据类型" v-model="ruleForm.data_type" style="width:225%;">
              <el-option
                v-for="(item, index) in datatypeDict"
                :key="index"
                :label="item.dictId+'-'+item.dictName"
                :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="方法名" prop="method_name" v-show="isShow">
              <el-input
                placeholder=""
                v-model="ruleForm.method_name"
                class="form-input" style="width:250%;"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="方法返回字段" prop="return_field" v-show="isShow">
              <el-input
                placeholder=""
                v-model="ruleForm.return_field"
                class="form-input" style="width:250%;"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="表名" prop="table_name" v-show="isShow1">
              <el-input
                placeholder=""
                v-model="ruleForm.table_name"
                class="form-input"  @input="inputFunc($event,'table')" style="width:250%;"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="字段名" prop="field_name" v-show="isShow1">
              <el-input
                placeholder=""
                v-model="ruleForm.field_name"
                class="form-input" @input="inputFunc($event,'value')" style="width:250%;"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="查询条件" prop="query_term" v-show="isShow1">
              <el-input
                placeholder=""
                v-model="ruleForm.query_term"
                class="form-input" @input="inputFunc($event,'param')" style="width:250%;"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="SQL预览" prop="sql_statement" v-show="isShowveiw">
              <el-input
                placeholder=""
                v-model="ruleForm.sql_statement"
                class="form-input" style="width:250%;" :disabled="true"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="统计执行SQL" prop="statis_exec_sql" v-show="isShowcount" >
              <el-input
                placeholder=""
                v-model="ruleForm.statis_exec_sql"
                class="form-input" style="width:250%;"
                @input="exec_sqlChange($event)"
              >
              </el-input>
            </el-form-item>
          </el-col>
          </el-form>
    </div>
    <div class="container-center">
      <el-button type="primary" @click="submitForm('ruleForm')" class="form-button">提交</el-button>
    </div>
  </div>
</template>

<script>
import MyMessage from "pte-ui/utils/MyMessage";
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "sellProductAddFirst",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      ruleForm: {
        metadata_id: "",
        obtain_mode: "",
        metadata_type: "",
        metadata_name: "",
        data_type: "",
        method_name: "",
        return_field: "",
        table_name: "",
        field_name: "",
        query_term: "",
        sql_statement: "",
        statis_exec_sql: "",
      },
      page_type: "",
      tranType: "",
      prodTypeDict: [],
      obtainmodeDict: [], //获取方式
      metadatatypeDict: [], //元数据分类
      datatypeDict: [], //数据类型
      isShow: false, // java方法显示属性
      isShow1: false, // SQL显示属性
      isShowveiw: false,
      isShowcount: false,
      isdisabled: false,
      rules: {
        metadata_id: [
          { required: true, message: '请输入元数据编号', trigger: 'change' }
        ],
        obtain_mode: [
          { required: true, message: '请选择获取方式', trigger: 'change' }
        ],
        metadata_name: [
          { required: true, message: '请输入元数据名称', trigger: 'change' }
        ],
        data_type: [
          { required: true, message: '请选择数据类型', trigger: 'change' }
        ],
        table_name: [
          { required: true, message: '请输入表名', trigger: 'change' }
        ],
        field_name: [
          { required: true, message: '请输入字段名', trigger: 'change' }
        ],
        metadata_type: [
          { required: true, message: '请输入元数据类型', trigger: 'change' }
        ],
        method_name: [
          { required: true, message: '请输入方法名', trigger: 'change' }
        ],
        return_field: [
          { required: true, message: '请输入方法返回字段', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getDictList("BPM_E_GETTYP", "obtainmodeDict");
    this.getDictList("BPM_E_SJFENL", "metadatatypeDict");
    this.getDictList("BPM_E_DATTYP", "datatypeDict");
  },
  mounted() {
        console.log('cParentParams', this.cParentParams);
        console.log('cParentMeta', this.cParentMeta);
        console.log('cParentScope', this.cParentScope);
        
        console.log("modify:"  + this.cParentParams.trantp);
        if (this.cParentParams.trantp == 'modify'){
          this.isdisabled = true;          
          this.ruleForm.metadata_id = this.cParentParams.metadata_id;
          this.ruleForm.obtain_mode = this.cParentParams.obtain_mode;
          this.ruleForm.metadata_type = this.cParentParams.metadata_type;
          this.ruleForm.metadata_name = this.cParentParams.metadata_name;
          this.ruleForm.data_type = this.cParentParams.data_type;
          this.ruleForm.method_name = this.cParentParams.method_name;
          this.ruleForm.return_field = this.cParentParams.return_field;
          this.ruleForm.table_name = this.cParentParams.table_name;
          this.ruleForm.field_name = this.cParentParams.field_name;
          this.ruleForm.query_term = this.cParentParams.query_term;
          this.ruleForm.sql_statement = this.cParentParams.sql_statement;
          this.ruleForm.statis_exec_sql = this.cParentParams.statis_exec_sql;

          console.log("modify:"  + this.cParentParams.obtain_mode);
          switch (this.cParentParams.obtain_mode){
            case "0":
              this.isShow1 = true;
              this.isShow = false;
              break;
            case "1":
              this.isShow1 = false;
              this.isShow = true;
              this.isShowveiw = false;
              this.isShowcount = false;
              break;
            default:
              this.isShow1 = false;
              this.isShow = false;
          }
          console.log("metadata_type:"  + this.cParentParams.metadata_type);
          if (this.cParentParams.metadata_type != null){
            switch (this.cParentParams.metadata_type){
              case "0":
                this.isShowveiw = true;
                this.isShowcount = false;
                break;
              case "1":
                this.isShowveiw = false;
                this.isShowcount = true;
                break;
              default:
                this.isShow1 = false;
                this.isShow = false;
            }
          }
        }
    },
  methods: {
    /**
    *统计sql变动时
    */
    exec_sqlChange(e) {
      let value = e;
      
      let sleng = value.indexOf("select");
      let fleng = value.indexOf("from");
      let wleng = value.indexOf("where");
      if (sleng == -1){
        sleng = value.length;
      }
      if (fleng == -1){
        fleng = value.length;
      }
      if (wleng == -1){
        wleng = value.length;
      }
      let result = value.substring(sleng + 6, fleng);
      let table = value.substring(fleng + 4, wleng);
      let term = value.substring(wleng + 5, value.length);
      
      this.ruleForm.table_name = table;
      this.ruleForm.field_name = result;
      this.ruleForm.query_term = term;
    },
    inputFunc(e, type) {
      let value = e;
      let sql = 'select value from table_name where param=#param#';

      let term = this.ruleForm.query_term;
      let table = this.ruleForm.table_name;
      let result = this.ruleForm.field_name;

      if (term != '' && term != 'param=#param#'){
        sql = sql.replace('where param=#param#', "where " + term);
      } else {
        sql = sql.replace('where param=#param#', term);
      }
      
      if (table != ''){
        sql = sql.replace('table_name', table);
      }
      if (result != ''){
        sql = sql.replace('value', result);
      }
      this.ruleForm.sql_statement = sql;
      this.ruleForm.statis_exec_sql = sql;
    },
    /**
     * radio切换事件
     */
    obtain_modeChange(){ 
      let _this = this;
      switch (_this.ruleForm.obtain_mode){
        case "0":
          _this.isShow1 = true;
          _this.isShow = false;
          console.log("aa " + _this.ruleForm.metadata_type);
          if (_this.ruleForm.metadata_type != ''){
            switch (_this.ruleForm.metadata_type){
              case "0":
                this.isShowveiw = true;
                this.isShowcount = false;
                break;
              case "1":
                this.isShowveiw = false;
                this.isShowcount = true;
                break;
              default:
                this.isShow1 = false;
                this.isShow = false;
            }
          }
          break;
        case "1":
          _this.isShow1 = false;
          _this.isShow = true;
          _this.isShowveiw = false;
          _this.isShowcount = false;
          break;
        default:
          _this.isShow1 = false;
          _this.isShow = false;
      }
    },
    metadata_typeChange(){
      let _this = this;
      switch (_this.ruleForm.metadata_type){
        case "0":
          _this.isShowveiw = true;
          _this.isShowcount = false;
          break;
        case "1":
          _this.isShowveiw = false;
          _this.isShowcount = true;
          break;
        default:
          _this.isShow1 = false;
          _this.isShow = false;
      }
    },
    /**
      * 获取数据字典列表
      * @param dictType  数据字典 dictType
      * @param listKey 列表对象key名称
      */
    getDictList(dictType, listKey) {
        let params = {
            dictType: dictType,
            dictKey: [dictType]
        }
        MyAxios.invokeAPI("/SUMP/rest/dict", "post", params).then(res => {
            if (res && res.code === "200") {
            this[listKey] = res.data;
            }
        }).catch(err => {
            console.error(err)
        })
    },
    /**
     * 提交表单
     * @param formName
     */
    submitForm(formName) {
      let that = this;
      console.log("that", that);
      let formData = that.$dataBus.getCurrentFormData(that);
      let params = that.ruleForm;
      if (this.cParentParams.trantp == 'modify'){
        params.servicecode = 'bpm0019';
      } else {
        params.servicecode = 'bpm0018';
      }
      params.appId = this.cParentParams.appId,

      this.$dataBus.doAllValidator(that).then(res => {
        console.log("res", res);
        if (res === true) {
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
            if (res && res.code !== "200") {
              this.$message({
                type: "error",
                message: "提交失败"
              });
            } else {
              this.$dataBus.doCallBack(this, res);
              this.$message({
                type: "success",
                message: res.message
              })
            }
          }).catch(err => {
            console.error(err);
          });
        }
      }).catch(() => {
      });
    }
  }
}
</script>


<style lang="less" scoped>
.container-content {
  .container-content--search {
    padding: 16px 40px 0 12px;
    border-bottom: 1px solid #e3e8f5;
  }

  .container-content--toolbar {
    padding: 10px;
  }

  .container-content--pagination {
    float: right;
    padding: 10px;
  }

  .container-centent--table {
    margin-top: 10px;
  }
}

.container-footer {
  width: 50px;
  margin: 0 auto;
  padding: 10px;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}

.container-toolbar {
  margin: 10px 0;
}

.dialog_content {
  width: 100%;
}

.title_tag {
  font-family: "PingFang SC";
  font-size: 18px;
  font-weight: bold;
  margin: 18px;
}

.container-center {
  margin: 20px 5px;
  padding: 20px 0;
  width: 100%;
  text-align: center;
  justify-content: center;
}

.form-input {
  width: 200px;
}

.form-button {
  width: 80px;
  margin: 0 10px;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}
</style>
