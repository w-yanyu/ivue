<template>
  <div>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>外包商信息</span>
          </template>
          <el-form ref="basicForm" :rules="basicRules" :model="basicForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="8">
                <el-form-item label="部门" prop="branch_name">
                  <el-input v-model="basicForm.branch_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="合作机构类型: " prop="org_type">
                  <el-select v-model="basicForm.org_type" :disabled="true" >
                    <el-option v-for="item in orgTypeList" :key="item.dictId" :label="item.dictName" :value="item.dictId"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="外包机构名称" prop="oa_org_name">
                  <el-input v-model="basicForm.oa_org_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="注册资本" prop="regis_capital">
                  <el-input v-model="basicForm.regis_capital" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="统一社会信用代码" prop="social_credit_code">
                  <el-input v-model="basicForm.social_credit_code" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="办公地址" prop="addr">
                  <el-input v-model="basicForm.addr" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="经营状态" prop="operation_status">
                  <el-input v-model="basicForm.operation_status" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="经营范围" prop="operation_scope">
                  <el-input v-model="basicForm.operation_scope" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="法人代表" prop="ceo">
                  <el-input v-model="basicForm.ceo" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="股东信息" prop="stockholder">
                  <el-input v-model="basicForm.stockholder" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="采购评审编号" prop="buyer_review_no">
                  <el-input v-model="basicForm.buyer_review_no" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row><el-row>
            <el-col :span="8">
              <el-form-item label="合作开始时间" prop="startDate">
                <el-date-picker
                  v-model="basicForm.startDate"
                  align="right"
                  type="date"
                  placeholder="请选择合作开始时间"
                  value-format="yyyyMMdd"
                  :disabled="true"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合作结束时间" prop="endDate">
                <el-date-picker
                  v-model="basicForm.endDate"
                  align="right"
                  type="date"
                  placeholder="请选择合作结束时间"
                  value-format="yyyyMMdd"
                  :disabled="true"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <span><em></em>外包商退出</span>
          </template>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="200px" class="custom-common--form">
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" label="附件" prop="fileList">
              <upload-file ref="fileListProp" :uploadFileList="appForm.fileList" :uploadDisabled="false" @changeFile="fileListChange"></upload-file>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$i18ns('备注:')" prop="remark">
              <el-input type="textarea" v-model="appForm.remark"></el-input>
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
  import UploadFile from "@/views/ce/components/UploadFile.vue";
  export default {
    name: "outsourcerQuit",
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
          branchNo: "",//部门
          branch_name: "",//部门
          org_type: "",//机构类型
          oa_org_name: "",//外包机构名称
          regis_capital: "",//注册资本
          social_credit_code:"",//统一社会信用代码
          addr:"",//办公地址
          operation_status:"",//经营状态
          operation_scope:"",//经营范围
          ceo:"",//法人代表
          stockholder:"",//股东信息
          buyer_review_no:"",//采购评审编号
          startDate:"",//合作开始时间
          endDate:"",//合作结束时间
        },
        appForm:{
          fileList:[],//附件
          remark: "", // 备注
        },
        branchList:[],
        orgTypeList:[],
        activeNames: ["1", "2"]
      }
    },
    created() {
      this.getDictList("E_BRANCH", "branchList"); // 部门
      this.getDictList("E_ORG_TYPE", "orgTypeList"); // 机构类型
      this.initRule();
      this.getOutInfo();
    },

    methods: {
      initRule(){
        this.appRules = {
            fileList:[{ validator: this.fileListValidate, trigger: 'change' }],
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

      getOutInfo(){
        let params = {
          servicecode: "RLMSPLTS1010",
          oaOrgId: this.cParentParams.oa_org_id,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              const response = res.data.companyInfo;
              this.basicForm = response;
              this.basicForm.startDate = response.work_begin_time;
              this.basicForm.endDate = response.work_end_time;
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
                servicecode: "RLMSPLTS1020",
                oaOrgId: this.cParentParams.oa_org_id,
                fileList:this.appForm.fileList,//附件
                remark:this.appForm.remark,  //备注
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
        this.appForm ={
          fileList:[],//附件
          remark: "", // 备注
        }
        this.$refs.fileListProp.clearFileList();
      },

      /**
       * 添加文件回调
       * @param file 当前添加文件对象
       * @param fileList 已添加文件
       */
      fileListChange(val){this.appForm.fileList= val;},

      fileListValidate(value, rule, callback) {if (this.appForm.fileList.length === 0) {  return callback(new Error("请上传附件    "));   }return callback();   }
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
