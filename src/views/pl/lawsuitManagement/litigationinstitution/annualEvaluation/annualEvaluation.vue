<template>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>机构信息</span>
          </template>
          <el-form ref="basicForm" :model="basicForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="8">
                <el-form-item label="区域中心: " prop="area_center_name">
                  <el-input v-model="basicForm.area_center_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="机构类型: " prop="case_acceptance_name">
                  <el-input v-model="basicForm.case_acceptance_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="机构名称" prop="acceptance_name">
                  <el-input v-model="basicForm.acceptance_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <span><em></em>评价信息</span>
          </template>
          <el-form ref="evalForm" :rules="evalRules" :model="evalForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" prop="evaluate_year" label="评价年份">
                  <el-date-picker
                    v-model="evalForm.evaluate_year"
                    type="year"
                    style="width:150px"
                    value-format="yyyy"
                    placeholder="选择年份"
                    disabled="true">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="评价结果:" prop="evaluate_result">
                  <el-radio-group v-model="evalForm.evaluate_result">
                    <el-radio v-for="(item,i) in annualEvalList" :key="i" :label="item.dictId" :checked="evalForm.evaluate_result === item.dictId">{{item.dictName}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="评价材料" prop="popef">
                  <upload-file ref="popefProp" :uploadFileList="evalForm.popef" :uploadDisabled="false" @changeFile="popefChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$i18ns('备注:')" prop="remark">
                  <el-input type="textarea" v-model="evalForm.remark" autosize="true" maxlength="200"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
      <div class="custom-common--footer">
        <el-button type="primary" size="small" @click="submit" plain>提交</el-button>
        <el-button size="small"  @click="reset">{{$i18ns('取消')}}</el-button>
      </div>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import UploadFile from "@/views/fs/components/UploadFile.vue";
  export default {
    name: "annualEvaluation",
    components: {
      UploadFile,
    },
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对
    },
    data() {
      return {
        basicForm: { // 基础信息表单对象
          acceptance_name: "",//机构名称
          case_acceptance: "",//机构类型
          case_acceptance_name: "",//机构类型名称
          area_center: "",//区域中心
          area_center_name: "",//区域中心名称
        },
        evalForm:{
           evaluate_year: "", //评价年份，
           evaluate_result: "TG", // 是否通过
           popef:[],//上传评价表
           remark:"",//备注
        },
        timer:"",
        annualEvalList:[],
        orgTypeList:[],
        activeNames: ["1", "2"],
      }
    },
    created() {
      this.getDictList("E_ORGTYPES", "orgTypeList"); // 机构类型
      this.getDictList("E_ANNUAL_EVALRESULT", "annualEvalList"); // 评价结果
      this.initRule();
      this.getOutInfo();
    },
    methods: {
      initRule(){
        this.evalRules = {
            evaluate_result: [{required: true, message: "请选择是否通过", trigger:'blur'}],
            evaluate_year:[{ required: true,  message: "请输入评价年份", trigger:'blur'}],
            popef:[{ validator: this.popefValidate, trigger: 'change' }]
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
        };
        MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
          .then(res => {
            if (res && res.code === "200") {
              this[listKey] = res.data;
            }
          })
          .catch(err => {
            console.error(err);
          });
      },
      dellist(id){
        this.annualEvalList.some((item,i) => {
          if(item.dictId == id){
            this.annualEvalList.splice(i,1);
            return true;
          }
        })
      },
      /**
       * 机构类型名称
       */
      formatTypeData(data,list){
        let name = data;
        list.forEach(function(item,index){
          if(data == item.dictId){
            name = item.dictName;
          }
        })
        return name;
      },
      /**
       * 机构信息
       */
      getOutInfo(){
        let params = {
          servicecode: "RLMSPLTS1347",
          oa_org_id: this.cParentParams.oa_org_id,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              this.dellist("WPJ");
              const response = res.data.plbLitiOrganiz;
              this.basicForm.area_center = response.branch;
              this.basicForm.area_center_name = response.branchname;
              this.basicForm.case_acceptance = response.orgType;
              this.basicForm.case_acceptance_name = this.formatTypeData(this.basicForm.case_acceptance,this.orgTypeList);
              this.basicForm.acceptance_name = response.oa_org_name;
              let nowdate = new Date();
              let yyyy = nowdate.getFullYear();
              this.evalForm.evaluate_year = `${yyyy}`;
            }
          })
          .catch(err => {
            console.error(err);
          })
      },
      submit() {
        this.$refs.evalForm.validate(valid => {
          if (valid) {
            this.$confirm("是否确认提交申请?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              let params = {
                servicecode: "RLMSPLTS1331",
                oa_org_id: this.cParentParams.oa_org_id,            //法诉机构编号
                area_center: this.basicForm.area_center,            //区域中心
                area_center_name: this.basicForm.area_center_name,  //区域中心名称
                case_acceptance: this.basicForm.case_acceptance,    //机构类型
                acceptance_name: this.basicForm.acceptance_name,    //机构名称
                evaluate_result: this.evalForm.evaluate_result,     //评价结果
                evaluate_year: this.evalForm.evaluate_year,         //评价年度
                fileList: this.evalForm.popef,                      //评价材料
                remark: this.evalForm.remark,                       //备注
              }
              MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
                if (res && res.code === "200") {
                  this.$message({
                    type: "success",
                    message: res.message
                  })
                  this.clearData();
                  this.$dialog.close();
                }
              }).catch(err => {
                console.error(err);
              })
            });
          }
        });
      },
      reset(){
        this.$confirm("是否确认取消?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.clearData();
          this.$dialog.close();
        })
      },
      clearData(){
        this.evalForm = { //评价信息
          popef:[],//上传评价表
          evaluate_year: "",//评价年份
          evaluate_result: "TG",//评价结果
          remark: "",//备注
        },
        this.$refs.popefProp.clearFileList();
      },
      /**
       * 添加文件回调
       * @param file 当前添加文件对象
       * @param fileList 已添加文件
       */
      popefChange(val){this.evalForm.popef= val;},
      popefValidate(value, rule, callback) {if (this.evalForm.popef.length === 0 && true) {  return callback(new Error("请上传评价表"));   }return callback();   },
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
</style>
