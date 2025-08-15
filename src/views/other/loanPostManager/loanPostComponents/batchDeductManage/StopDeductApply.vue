<template>
  <div>
    <div class="creditapp-basic">
      <el-form ref="stopDeductBasicForm" :rules="stopDeductBasicRules" :model="stopDeductBasicForm" label-width="200px" class="custom-common--form">
        <el-row>
            <el-col :span="12">
                <el-form-item label="借据号" prop="lncfno">
                <el-input v-model="stopDeductBasicForm.lncfno" @blur="stopDeductBlur"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="证件号码" prop="cardno">
                <el-input v-model="stopDeductBasicForm.cardno" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="手机号码" prop="phoneno">
                <el-input v-model="stopDeductBasicForm.phoneno" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="客户姓名" prop="custna">
                <el-input v-model="stopDeductBasicForm.custna" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="产品名称" prop="prodcd">
                <el-input v-model="stopDeductBasicForm.prodna" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="贷款形态">
                    <el-select v-model="stopDeductBasicForm.clssst" :disabled="true" placeholder=" ">
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
            <el-col :span="12">
                <el-form-item label="贷款账户状态">
                <el-select v-model="stopDeductBasicForm.acctst" :disabled="true" placeholder=" ">
                    <el-option
                        v-for="(item, index) in accountLoanStatusList"
                        :key="index"
                        :label="item.dictName"
                        :value="item.dictId"
                    ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="现贷余额" prop="prodcd">
                  <el-input v-model="stopDeductBasicForm.lnhhxbl" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="还款日" prop="jzdate">
                  <el-input v-model="stopDeductBasicForm.jzdate" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="creditapp-detail">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>申请信息</span>
          </template>
          <el-form ref="stopDeductForm" :rules="stopDeductRules" :model="stopDeductForm" label-width="200px" class="custom-common--form">
            <el-row>
               <!-- <el-col :span="12">
                    <el-form-item label="停批起始时间" prop="stopBatchStart">
                        <el-date-picker
                            v-model="stopDeductForm.stopBatchStart"
                            type="date"
                            placeholder="请选择停批起始时间"
                            value-format="yyyyMMdd">
                        </el-date-picker>
                    </el-form-item>
                </el-col>-->
                <el-col :span="12">
                    <el-form-item label="停批截止时间" prop="stopBatchEnd">
                        <el-date-picker
                            v-model="stopDeductForm.stopBatchEnd"
                            type="date"
                            placeholder="请选择停批截止时间"
                            value-format="yyyyMMdd">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item  label="附件上传" prop="fileList">
                        <upload-file-view ref="uploadProp" :uploadFileList="stopDeductForm.fileList" :uploadDisabled="false" @changeFile="changeUploadFile"></upload-file-view>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$i18ns('备注')" prop="remark">
                  <el-input type="textarea" :autosize="{minRows:2, maxRows: 5}" placeholder="请输入备注" v-model="stopDeductForm.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>提交</el-button>
      <el-button size="small"  @click="reset">{{$i18ns('重置')}}</el-button>
    </div>
  </div>
</template>

<script>
import {
  validateHandle,
} from "../../loanPostConstant/loanPostConstant";
import MyAxios from "pte-ui/utils/MyAxios";
import UploadFileView from "../UploadFileView";
export const stopDeductBasicRules = {
  lncfno: [{ required: true, message: "请输入借据号" }],
}
export const stopDeductRules = {
  //stopBatchStart:[{ required: true, message: "请输入停批起始时间" }],
  stopBatchEnd:[{ required: true, message: "请输入停批截止时间" }],
  remark:[{ required: true, message: "请输入备注" }],
}

export default {
    name: "StopDeductApply",
    components: {
      UploadFileView,
    },
    data() {
      return {
        stopDeductBasicForm: { // 基础信息表单对象
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
          lnwhxbl:"",
          lnhhxbl:"",
          jzdate:"",
        },
        stopDeductForm:{
          stopBatchStart: "",
          stopBatchEnd:"",
          fileList:[],
          remark:"",
        },
        compareCustomerInfo:"",
        stopDeductBasicRules,
        stopDeductRules,
        activeNames: ["1", "2"]
      }
    },
    created() {
      this.stopDeductRules.remark.push({validator:this.isNullValidate, trigger: 'blur'});
      this.getDictList("E_ACCTST", "accountLoanStatusList"); // 初始化贷款账户状态数据字典
      this.getDictList("E_CLSSST", "loanStatusList"); // 化贷款形态数据字典
    },
    
    methods: {

    isNullValidate(rule, value, callback){
      if(value==="" || value.trim().length===0){
        return callback(new Error("请输入备注"));
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
    
    getCustomerInfo(){
            // 清空历史数据
      if (this.compareCustomerInfo) {
          this.stopDeductBasicForm.custno = ""; //客户号
          this.stopDeductBasicForm.custna = ""; // 客户姓名
          this.stopDeductBasicForm.cardno = ""; // 证件号码
          this.stopDeductBasicForm.phoneno = ""; // 手机号码
          this.stopDeductBasicForm.prodcd = ""; // 产品编号
          this.stopDeductBasicForm.prodna = ""; // 产品名称
          this.stopDeductBasicForm.clssst = ""; // 账户形态
          this.stopDeductBasicForm.acctst = ""; // 贷款账户状态
          this.stopDeductBasicForm.idtype = ""; //证件类型
          this.stopDeductBasicForm.ovdays = ""; //逾期天数
          this.stopDeductBasicForm.lnhhxbl = ""; //现贷余额
          this.stopDeductBasicForm.jzdate = ""; //现贷余额
      }
      let params = {
        servicecode: "PLMSKGTS0067",
        lncfno: this.stopDeductBasicForm.lncfno,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then(res => {
        if (res && res.code === "200" && res.data) {
          let params2 = {
            servicecode: "AS_PLMS_KG_QRLOANMSG",
            lncfno: this.stopDeductBasicForm.lncfno,
          }
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params2)
          .then(response1 => {
            if (response1 && response1.code === "200" && response1.data && response1.data.customerLoan && response1.data.redupara) {
              const response = res.data.lnCustomerInfo;
              this.stopDeductBasicForm = response; 
              this.stopDeductBasicForm.jzdate = response1.data.customerLoan.jzdate; 
            }
          })
          .catch(err1 => {
            console.error(err1);
          })
        }
      })
      .catch(err => {
        console.error(err);
      })
      
    },
    
    submit() {
      this.$confirm("是否确认提交申请?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.validateList1 = [];
        const formList = ["stopDeductBasicForm","stopDeductForm"];
        formList.forEach(item => {
          this.validateList1.push(validateHandle(item, this));
        });
        Promise.all(this.validateList1).then(res => {
          let params = {
            servicecode: "PLMSKGTS0079",
            lncfno: this.stopDeductBasicForm.lncfno,
            custno: this.stopDeductBasicForm.custno , //客户号
            custna:this.stopDeductBasicForm.custna, // 客户姓名
            cardno:this.stopDeductBasicForm.cardno , // 证件号码
            phoneno:this.stopDeductBasicForm.phoneno , // 手机号码
            idtype:this.stopDeductBasicForm.idtype,//证件类型
            prodcd:this.stopDeductBasicForm.prodcd , // 产品编号
            prodna:this.stopDeductBasicForm.prodna , // 产品名称
            clssst:this.stopDeductBasicForm.clssst , // 账户形态         
            acctst:this.stopDeductBasicForm.acctst , // 贷款账户状态
            lnhhxbl:this.stopDeductBasicForm.lnhhxbl , //现贷余额
            ovdays:this.stopDeductBasicForm.ovdays, //逾期天数
            jzdate:this.stopDeductBasicForm.jzdate, //结转日期
            stopBatchStart:this.stopDeductForm.stopBatchStart,  //停批起始时间
            stopBatchEnd:this.stopDeductForm.stopBatchEnd,   //停批截止时间
            fileList:this.stopDeductForm.fileList,  //附件列表
            remark:this.stopDeductForm.remark,  //备注
          }
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200") {
              this.clearData();
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
      })
      

    },

    reset(){
      this.$confirm("是否确认重置申请内容?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.clearData();
      })
        
    },

    clearData(){
      this.$refs["stopDeductBasicForm"].resetFields();
      this.$refs["stopDeductForm"].resetFields();
      Object.assign(this.$data,this.$options.data());
      this.$refs.uploadProp.clearFileList();
    },

    stopDeductBlur(){
      if(this.stopDeductBasicForm.lncfno==="" || this.compareCustomerInfo===this.stopDeductBasicForm.lncfno){
        return false;
      }
      this.compareCustomerInfo=this.stopDeductBasicForm.lncfno;
      this.getCustomerInfo();
    },
    changeUploadFile(val){
      this.stopDeductForm.fileList = val;  //附件列表
    },
  },




}
  
</script>

<style lang="less" scoped>
  .creditapp-basic,.creditapp-detail {
    padding: 16px 40px 0 12px;
  }
  .creditapp-detail {
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
