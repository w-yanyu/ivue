<template>
  <div>
    <div class="creditapp-basic">
      <el-form ref="stopDeductBasicForm" :rules="stopDeductBasicRules" :model="stopDeductBasicForm" label-width="200px" class="custom-common--form">
        <el-row>
            <el-col :span="12">
                <el-form-item class="require-asterisk" label="借据号" prop="loan_no">
                    <el-input v-model="stopDeductBasicForm.loan_no" @blur="stopDeductBlur"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="客户姓名" prop="cust_name">
                <el-input v-model="stopDeductBasicForm.cust_name" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="产品名称" prop="prod_name">
                <el-input v-model="stopDeductBasicForm.prod_name" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="贷款形态">
                    <el-select v-model="stopDeductBasicForm.loan_form" :disabled="true" placeholder=" ">
                    <el-option
                        v-for="(item, index) in loanStatusList"
                        :key="index"
                        :label="item.dictName"
                        :value="item.dictId"
                    ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="贷款账户状态">
                <el-select v-model="stopDeductBasicForm.loan_acct_type" :disabled="true" placeholder=" ">
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
                <el-form-item label="还款日" prop="jzdate">
                  <el-input v-model="stopDeductBasicForm.jzdate" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="币种">
              <!-- <el-input v-model="basicForm.loan_form" :disabled="true"></el-input> -->
                    <el-select v-model="stopDeductBasicForm.ccy_code" prop="ccy_code" :disabled="true">
                      <el-option
                        v-for="item in ccyList"
                        :key="item.dictId"
                        :label="item.dictName"
                        :value="item.dictId"
                      ></el-option>
                    </el-select>
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
// import {
//   validateHandle,
// } from "../../loanPostConstant/loanPostConstant";
import MyAxios from "pte-ui/utils/MyAxios";
import UploadFileView from "@/views/pl/LevelFiveClasf/UploadFileView.vue";
export const stopDeductBasicRules = {
  loan_no: [{ required: true, message: "请输入借据号" }],
}
export const stopDeductRules = {
  //stopBatchStart:[{ required: true, message: "请输入停批起始时间" }],
  stopBatchEnd:[{ required: true, message: "请输入停批截止时间" }],
  remark:[{ required: true, message: "请输入备注" }],
}

export default {
    name: "StopDeductBatchApply",
    components: {
      UploadFileView,
    },
    props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
    },
    data() {
      return {
        stopDeductBasicForm: { // 基础信息表单对象
          loan_no: "",      
          cust_no: "",
          cust_name: "",
          phoneno: "",
          cert_no: "",
          cert_type: "",
          acctbl: "",
          prod_no:"",
          prod_name:"",
          ovdays:"",
          brchno:"",
          brchna:"",
          loan_form:"",
          loan_acct_type:"",
          lnwhxbl:"",
          lnhhxbl:"",
          ccy_code:"",
          jzdate:"",
        },
        stopDeductForm:{
          stopBatchStart: "",
          stopBatchEnd:"",
          fileList:[],
          remark:"",
        },
        ccyList:[],   //币种

        compareCustomerInfo:"",
        stopDeductBasicRules,
        stopDeductRules,
        activeNames: ["1", "2"]
      }
    },
    created() {


      this.stopDeductBasicForm.loan_no = this.cParentParams.reserve1;

      if(this.stopDeductBasicForm.loan_no!="" && this.stopDeductBasicForm.loan_no!=undefined){
        this.stopDeductBlur();
      }

      this.stopDeductRules.remark.push({validator:this.isNullValidate, trigger: 'blur'});
      this.getDictList("PL_E_ACCTST", "accountLoanStatusList"); // 初始化贷款账户状态数据字典
      this.getDictList("PL_E_CLSSST", "loanStatusList"); // 化贷款形态数据字典
      this.getDictList("MS_CURRENCY", "ccyList"); // 币种 


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
          this.stopDeductBasicForm.cust_no = ""; //客户号
          this.stopDeductBasicForm.cust_name = ""; // 客户姓名
          this.stopDeductBasicForm.cert_no = ""; // 证件号码
          this.stopDeductBasicForm.mobile_no = ""; // 手机号码
          this.stopDeductBasicForm.prod_no = ""; // 产品编号
          this.stopDeductBasicForm.prod_name = ""; // 产品名称
          this.stopDeductBasicForm.loan_form = ""; // 贷款形态
          this.stopDeductBasicForm.loan_acct_type = ""; // 贷款账户状态
          this.stopDeductBasicForm.cert_type = ""; //证件类型
          this.stopDeductBasicForm.overdue_days = ""; //逾期天数
          this.stopDeductBasicForm.cur_loan_bal = ""; //现贷余额
          this.stopDeductBasicForm.jzdate = ""; // 还款日

      }
      let params = {
        servicecode: "ln3101",
        loan_due_bill_num: this.stopDeductBasicForm.loan_no,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then(res => {
        if (res && res.code === "200" ) {


          this.stopDeductBasicForm.cust_name=res.data.cust_nm;

          this.stopDeductBasicForm.cust_no=res.data.cust_num;
          this.stopDeductBasicForm.prod_name=res.data.prod_nm;
          this.stopDeductBasicForm.ccy_code =res.data.ccy_code_num;

          this.stopDeductBasicForm.prod_no=res.data.prod_code;
       //   this.stopDeductBasicForm.loan_acct_no=res.data.loan_acct_num;
          //this.basicForm.lnream=res.data.loan_due_bill_num;
          this.stopDeductBasicForm.loan_form=res.data.loan_form;
          //this.stopDeductBasicForm.loan_bal=res.data.dstrbl_amt;
          this.stopDeductBasicForm.overdue_days=res.data.loan_due_bill_num;


          this.stopDeductBasicForm.loan_acct_type = res.data.loan_acct_ste; // 贷款账户状态
         // this.stopDeductBasicForm.cur_loan_bal = ""; //现贷余额
          this.stopDeductBasicForm.jzdate = res.data.next_rpymt_dt; // 还款日


          

             //stopBatchStart:this.stopDeductForm.stopBatchStart,  //停批起始时间
            
             //fileList:this.stopDeductForm.fileList,  //附件列表

          //this.stopDeductBasicForm.normal_princi=res.data.nrl_prcpl;
        //  this.stopDeductBasicForm.overdue_princi=res.data.ovdue_prcpl;
          //this.stopDeductBasicForm.stagnant_princi=res.data.stgnt_prcpl;
         // this.stopDeductBasicForm.write_off_princi=res.data.chk_write_off_prcpl;
        //  this.stopDeductBasicForm.accrued_inst=res.data.stgnt_prcpl;
        //  this.stopDeductBasicForm.recv_debit_inst=res.data.rcvbl_db_int;
        //  this.stopDeductBasicForm.ovdue_acd_int=res.data.stgnt_prcpl;
       //   this.stopDeductBasicForm.accrued_penalt_inst=res.data.rcvbl_acd_pnly_int;
       //   this.stopDeductBasicForm.write_off_inst=res.data.chk_write_off_int;
       //   this.stopDeductBasicForm.recv_fee=res.data.recv_fee;
        //  this.stopDeductBasicForm.recv_penalt_inst=res.data.rcvbl_pnly_int;
         // this.stopDeductBasicForm.dflt_rpymt_acct_no=res.data.rpymt_acct_num;
        //  this.stopDeductBasicForm.is_allow_adv_settle =res.data.adv_rpymt_adjust_flg;
         



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
         // this.validateList1.push(validateHandle(item, this));
        });
        Promise.all(this.validateList1).then(res => {
          let params = {
        
            servicecode: "pl0120",
            loan_no: this.stopDeductBasicForm.loan_no,
            cust_no: this.stopDeductBasicForm.cust_no , //客户号
            cust_name:this.stopDeductBasicForm.cust_name, // 客户姓名
           //  cert_no:this.stopDeductBasicForm.cert_no , // 证件号码
            // mobile_no:this.stopDeductBasicForm.mobile_no , // 手机号码
             //idtype:this.stopDeductBasicForm.idtype,//证件类型
             prod_no:this.stopDeductBasicForm.prod_no , // 产品编号
             prod_name:this.stopDeductBasicForm.prod_name , // 产品名称
             //clssst:this.stopDeductBasicForm.clssst , // 账户形态         
             loan_acct_type:this.stopDeductBasicForm.loan_acct_type , // 贷款账户状态
            // cur_loan_bal:this.stopDeductBasicForm.cur_loan_bal , //现贷余额
            // overdue_days:this.stopDeductBasicForm.overdue_days, //逾期天数
             carry_over_dt:this.stopDeductBasicForm.carry_over_dt, //结转日期
             //stopBatchStart:this.stopDeductForm.stopBatchStart,  //停批起始时间
             stop_btch_exp_tm:this.stopDeductForm.stopBatchEnd,   //停批截止时间
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
      // if(this.stopDeductBasicForm.lncfno==="" || this.compareCustomerInfo===this.stopDeductBasicForm.lncfno){
      //   return false;
      // }
      //this.compareCustomerInfo=this.stopDeductBasicForm.lncfno;
      this.getCustomerInfo();
    },
    changeUploadFile(val){
      console.log("val============", val);
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
