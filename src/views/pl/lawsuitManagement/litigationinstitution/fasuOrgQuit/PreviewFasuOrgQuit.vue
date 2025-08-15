<template>
  <div>
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
            <span><em></em>机构退出</span>
          </template>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="6">
                <el-form-item label="退出原因" prop="exit_reason_name">
                  <el-input v-model="appForm.exit_reason_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="附件" prop="fileList">
                  <upload-file ref="fileListProp" :uploadFileList="appForm.fileList" :uploadDisabled="true" @changeFile="fileListChange" :key="timer" :isOrNoHidden="true"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$i18ns('备注:')" prop="remark">
                  <el-input type="textarea" resize="none" v-model="appForm.remark" autosize="true" :readonly="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import UploadFile from "@/views/fs/components/UploadFile.vue";
  export default {
    name: "PreviewFasuOrgQuit",
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
        appForm:{
          exit_reason:[],//退出原因
          exit_reason_name:"",//退出原因名称
          fileList:[],//附件
          remark: "", // 备注
        },
        exitReasonList:[],//退出原因list
        orgTypeList:[],//机构类型list
        activeNames: ["1", "2"]
      }
    },
    created() {
      this.getDictList("E_EXIT_REASON", "exitReasonList"); // 退出原因
      this.getDictList("E_ORGTYPES", "orgTypeList"); // 机构类型
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
      getOutInfo(){
        let params = {
          servicecode: "RLMSPLTS1343",
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
              this.appForm.exit_reason = response.exit_reason;
              this.appForm.exit_reason_name = this.formatTypeData(this.appForm.exit_reason,this.exitReasonList);
              this.appForm.remark = response.remark;
              res.data.fileList.forEach((element) => {
              this.appForm.fileList.push({
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
      fileListChange(val){this.appForm.fileList= val;},
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
