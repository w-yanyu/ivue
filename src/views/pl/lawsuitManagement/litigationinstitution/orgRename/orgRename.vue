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
            <span><em></em>机构更名</span>
          </template>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="8">
                <el-form-item label="更名前" prop="last_acceptance_name">
                    <el-input v-model="appForm.last_acceptance_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="require-asterisk" label="更名后" prop="new_acceptance_name">
                    <el-input v-model="appForm.new_acceptance_name" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="附件" prop="fileList">
                  <upload-file ref="fileListProp" :uploadFileList="appForm.fileList" :uploadDisabled="false" @changeFile="fileListChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item  :label="$i18ns('备注:')" prop="remark">
                  <el-input type="textarea" v-model="appForm.remark" autosize="true" maxlength="200"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
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
    name: "orgRename",
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
          last_acceptance_name:"",//更改前机构名称
          new_acceptance_name:"",//更改后机构名称
          fileList:[],//附件
          remark: "", // 备注
        },
        orgTypeList:[],//机构类型list
        activeNames: ["1", "2"]
      }
    },
    created() {
      this.getDictList("E_ORGTYPES", "orgTypeList"); // 机构类型
      this.initRule();
      this.getOutInfo();
    },

    methods: {
      initRule(){
        this.appRules = {
            new_acceptance_name: [{required: true, message: "请输入机构名称", trigger:'blur'}],
            fileList:[{ validator: this.fileValidate, trigger: 'change' }]
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
          servicecode: "RLMSPLTS1347",
          oa_org_id: this.cParentParams.oa_org_id,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              console.log(res.data);
              const response = res.data.plbLitiOrganiz;
              this.basicForm.area_center = response.branch;
              this.basicForm.area_center_name = response.branchname;
              this.basicForm.case_acceptance = response.orgType;
              this.basicForm.case_acceptance_name = this.formatTypeData(this.basicForm.case_acceptance,this.orgTypeList);
              this.basicForm.acceptance_name = response.oa_org_name;
              this.appForm.last_acceptance_name = response.oa_org_name;
            }
          })
          .catch(err => {
            console.error(err);
          })
      },

      submit() {
        this.$refs.appForm.validate(valid => {
          if (valid) {
            this.$confirm("是否确认提交申请?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              let params = {
                servicecode: "RLMSPLTS1344",
                oa_org_id: this.cParentParams.oa_org_id,                 //法诉机构编号
                area_center: this.basicForm.area_center,                 //区域中心
                area_center_name: this.basicForm.area_center_name,       //区域中心名称
                case_acceptance: this.basicForm.case_acceptance,         //机构类型
                acceptance_name: this.basicForm.acceptance_name,         //机构名称
                last_acceptance_name: this.appForm.last_acceptance_name, //更改前机构名称
                new_acceptance_name: this.appForm.new_acceptance_name,   //更改后机构名称
                fileList: this.appForm.fileList,//附件
                remark: this.appForm.remark,  //备注
              };
              if(params.last_acceptance_name == params.new_acceptance_name){
                this.$message({type: "warning", message: "机构名称更改前后一致！"});
                return;
              };
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
        this.appForm.new_acceptance_name = "";
        this.appForm.fileList = [];
        this.appForm.remark = "";
        this.$refs.fileListProp.clearFileList();
      },

      /**
       * 添加文件回调
       * @param file 当前添加文件对象
       * @param fileList 已添加文件
       */
      fileListChange(val){this.appForm.fileList= val;},
      fileValidate(value, rule, callback) {
        if (this.appForm.fileList.length === 0 ) {
          return callback(new Error("请上传附件"));
        }
        return callback();
      },
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
