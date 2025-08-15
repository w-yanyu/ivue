<template>
  <div>
    <div class="hriskapp-basic">
      <el-form ref="hriskBasicForm" :rules="hriskBasicRules" :model="hriskBasicForm" label-width="200px" class="custom-common--form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="借据号" prop="lncfno">
              <el-input v-model="hriskBasicForm.lncfno" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件号码" prop="cardno">
              <el-input v-model="hriskBasicForm.cardno" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phoneno">
              <el-input v-model="hriskBasicForm.phoneno" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户姓名" prop="custna">
              <el-input v-model="hriskBasicForm.custna" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品名称" prop="prodcd">
              <el-input v-model="hriskBasicForm.prodna" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="贷款形态">
                <el-select v-model="hriskBasicForm.clssst" :disabled="true" placeholder=" ">
                  <el-option
                    v-for="(item, index) in loanStatusList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            </el-form-item>
          </el-col>
 
        </el-row>
      </el-form>
    </div>
    <div class="hriskapp-detail">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>申请信息</span>
          </template>
          <el-form ref="hriskAppForm" :rules="hriskAppRules" :model="hriskAppForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="21">
                <el-form-item label="附件上传类型" prop="atttype">
                  <el-select
                    v-model="hriskAppForm.atttype"
                    placeholder="请选择">
                    <el-option
                      v-for="item in hriskFileTypeList"
                      :key="item.value"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item  label="附件上传" prop="fileList">
                       <upload-file-view  v-if="showComponent" ref="uploadProp" :uploadAttachType="hriskAppForm.atttype" :typeList="hriskFileTypeList" :uploadFileList="hriskAppForm.fileList" :uploadDisabled="false" @changeFile="changeUploadFile"></upload-file-view>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item  label="征信库查看" >
                        <el-button type="primary" size="small" @click="showReport()" plain>{{$i18ns('查看')}}</el-button>
                    </el-form-item>
                </el-col>
                <!--<el-col :span="12">
                  <el-form-item label="是否发送短信" prop="isSendSMS">
                    <el-radio v-model="hriskAppForm.isSendSMS" :key="1" :label="1">是</el-radio>
                    <el-radio v-model="hriskAppForm.isSendSMS" :key="0" :label="0">否</el-radio>
                  </el-form-item>
                </el-col>-->
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="认定原因描述" prop="reason">
                  <el-input type="textarea" :autosize="{minRows:2, maxRows: 5}" placeholder="请输入备注" v-model="hriskAppForm.reason"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <credit-report-info
                :show-dialog="showCreditInfo"
                :cardno="hriskBasicForm.cardno"
                @creditClose="showClose"
                v-if="showCreditInfo"
            />
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>提交</el-button>
      <el-button size="small" @click="reset">{{$i18ns('取消')}}</el-button>
    </div>
  </div>
</template>

<script>
import {
  validateHandle,
} from "../../loanPostConstant/loanPostConstant";
import MyAxios from "pte-ui/utils/MyAxios";
import UploadFileView from "../UploadFileView";
import CreditReportInfo from "../CreditReportInfo";

export const hriskBasicRules = {
  lncfno: [{ required: true, message: "请输入借据号" }],
};
export const hriskAppRules = {
  isSendSMS : [{required: true, message: '请选择是否发送短信'}],
  atttype : [{required: true, message: '请选择附件上传类型'}],
  reason : [{required: true, message: '请输入认定原因描述'}],
  fileList:[],
};

export default {
    name: "HighRiskUpdate",
    components: {
      CreditReportInfo,
      UploadFileView,
    },
    props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object, // 父页面的scope数据对
    },
    data() {
      return {
        hriskBasicForm: { // 基础信息表单对象
          lncfno: "",
          custno: "",
          custna: "",
          phoneno: "",
          cardno: "",
          idtype: "",
          acctbl: "",
          prodcd:"",
          prodna:"",
          ovdays:"",
          brchno:"",
          brchna:"",
          clssst:"",
          acctst:"",
        },
        hriskAppForm: {
          reason: "",
          isSendSMS:0,
          atttype:"",
          fileList:[],
        },
        showCreditInfo:false,
        hriskAppRules,
        hriskBasicRules,
        hriskFileTypeList:[],
        accountLoanStatusList:[],
        loanStatusList:[],
        activeNames: ["1", "2"],
        showComponent:true,
      }
    },
    created() {
      this.hriskAppRules.fileList.push({ validator: this.hriskFileValidate, trigger: 'blur' });
      this.hriskAppRules.reason.push({validator:this.isNullValidate, trigger: 'blur'});
      this.getDictList("E_CLSSST", "loanStatusList"); // 化贷款形态数据字典
      this.getDictList("E_HRISKTYPE", "hriskFileTypeList"); // 初始化高危认定附件上传类型
      this.getHighRiskApplyInfo();
    },
    
    methods: {
        /**
     * 证明材料表单校验
     * @param value 表单当前值
     * @param rule 校验规则
     * @param callback 回调方法
     */
    hriskFileValidate(value, rule, callback) {
      if (this.hriskAppForm.atttype) {
        if (this.hriskAppForm.fileList.length === 0) {
          return callback(new Error("请上传附件材料"));
        } 
      }
      return callback();
    }, 
    isNullValidate(rule, value, callback){
      if(value==="" || value.trim().length===0){
        return callback(new Error("请输入认定原因描述"));
      }
      return callback();
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
    showReport(){
      if (this.hriskBasicForm.cardno==="") {
        this.$message({
          type: "warning",
          message: "请先输入借据信息"
        });
        return;
      }
      this.showCreditInfo = true;
    },
    showClose() {
      this.showCreditInfo = false;
    },
    getHighRiskApplyInfo(){
      var vm = this;
      let params = {
        servicecode: "PLMSKGTS0068",
        applid: this.cParentParams.applid,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then(res => {
        if (res && res.code === "200" && res.data) {
          this.hriskBasicForm.lncfno = res.data.lnApplyInfo.lncfno; //客户号
          this.hriskBasicForm.custno = res.data.lnApplyInfo.custno; //客户号
          this.hriskBasicForm.custna = res.data.lnApplyInfo.custna; // 客户姓名
          this.hriskBasicForm.cardno = res.data.lnApplyInfo.cardno; // 证件号码
          this.hriskBasicForm.phoneno =res.data.lnApplyInfo.phoneno; // 手机号码
          this.hriskBasicForm.prodcd = res.data.lnApplyInfo.prodcd; // 产品编号
          this.hriskBasicForm.prodna = res.data.lnApplyInfo.prodna; // 产品名称
          this.hriskBasicForm.clssst = res.data.lnApplyInfo.clssst; // 账户形态
          this.hriskBasicForm.acctst = res.data.lnApplyInfo.acctst; // 贷款账户状态
          this.hriskBasicForm.idtype = res.data.lnApplyInfo.idtype; //证件类型

          this.hriskAppForm.atttype = res.data.lnApplyInfo.atttype; //附件类型
          this.hriskAppForm.reason = res.data.lnApplyInfo.reason; //原因
          this.hriskAppForm.isSendSMS = parseInt(res.data.lnApplyInfo.isSendSMS); //原因
          this.hriskAppForm.fileList = res.data.fileList;
          this.showComponent=false;
          this.$nextTick(()=>{
            this.showComponent=true;
          })
        }
      })
      .catch(err => {
        console.error(err);
      })
    },
    
    
    submit() {
      this.$confirm("是否确认更新申请内容?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
         this.validateList1 = [];
        const formList = ["hriskAppForm"];
        formList.forEach(item => {
          this.validateList1.push(validateHandle(item, this));
        });
        Promise.all(this.validateList1).then(res => {
          let params = {
            servicecode: "PLMSKGTS0049",
            applid: this.cParentParams.applid,
            atttype:this.hriskAppForm.atttype,  //附件类型
            reason:this.hriskAppForm.reason,   //认定原因
            isSendSMS:this.hriskAppForm.isSendSMS,
            fileList:this.hriskAppForm.fileList,  //附件列表
          }
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200") {
              this.$message({
                type: "success",
                message: res.message
              })
            }
          })
          .catch(err => {
            console.error(err);
          })
        }).catch(err => {
          this.$message({
            type: "warning",
            message: "校验不通过"
          })
        })
      });
     
      

    },
    reset(){
      this.$confirm("是否确认重置申请内容?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$refs["hriskAppForm"].resetFields();
        this.hriskAppForm.isSendSMS = "";   //备注
        this.hriskAppForm.reason = "";   //备注
        this.hriskAppForm.fileList = [];  //附件列表
        this.hriskAppForm.atttype = "";  //附件类型
        this.$refs.uploadProp.clearFileList();
      });
        
    },

    changeUploadFile(val){
       this.hriskAppForm.fileList = val;  //附件列表
       this.$refs['hriskAppForm'].validateField('fileList')
    },


  },




}
  
</script>

<style lang="less" scoped>
  .hriskapp-basic,.hriskapp-detail {
    padding: 16px 40px 0 12px;
  }
  .hriskapp-detail {
    .el-form {
      padding: 0;
    }
    /deep/.el-collapse {
      .el-collapse-item__content {
        padding: 20px 80px 20px 20px;
      }
    }
  }
  .attachmentTab {
    min-height: 68.667px;
  }
</style>
