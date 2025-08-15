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
                    style="width:200px"
                    value-format="yyyy"
                    placeholder="选择年份"
                    disabled="true">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="评价结果:" prop="evaluate_result_name">
                    <el-input v-model="evalForm.evaluate_result_name" :disabled="true" style="width:200px"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="评价材料" prop="popef">
                  <upload-file ref="popefProp" :uploadFileList="evalForm.popef" :uploadDisabled="true" @changeFile="popefChange" :key="timer" :isOrNoHidden="true"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$i18ns('备注:')" prop="remark">
                  <el-input type="textarea" resize="none" v-model="evalForm.remark" autosize="true" :readonly="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import UploadFile from "@/views/fs/components/UploadFile.vue";
  export default {
    name: "PreviewAnnualEvaluation",
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
           evaluate_result: "", // 是否通过
           evaluate_result_name: "", // 是否通过
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
      this.getOutInfo();
    },
    methods: {
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
          servicecode: "RLMSPLTS1333",
          applid: this.cParentParams.applid,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              const response = res.data.plbLitiOrgChangeaniz;
              this.basicForm.area_center = response.area_center;
              this.basicForm.area_center_name = response.area_center_name;
              this.basicForm.case_acceptance = response.case_acceptance;
              this.basicForm.case_acceptance_name = this.formatTypeData(this.basicForm.case_acceptance,this.orgTypeList);
              this.basicForm.acceptance_name = response.acceptance_name;
              this.evalForm.remark = response.remark;
              this.evalForm.evaluate_year = response.evaluate_year;
              this.evalForm.evaluate_result = response.evaluate_result;
              this.evalForm.evaluate_result_name = this.formatTypeData(this.evalForm.evaluate_result,this.annualEvalList);
              res.data.fileList.forEach((element) => {
              this.evalForm.popef.push({
                  fileName: element.fileName,
                  filePath: element.filePath,
                  buctetKey: element.buctetKey,
                  bucket: element.bucket,
                  status: "success",
              });
              });
              this.timer = new Date().getTime(); //更新timer，重新加载子组件
            }
          })
          .catch(err => {
            console.error(err);
          })
      },
      /**
       * 添加文件回调
       * @param file 当前添加文件对象
       * @param fileList 已添加文件
       */
      popefChange(val){this.evalForm.popef= val;},
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
