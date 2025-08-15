<template>
  <div>
    <div class="fivetypeapp-basic">
      <el-form ref="basicForm" :rules="basicRules" :model="basicForm" label-width="200px" class="custom-common--form">
        <el-row>
          <el-col :span="12">
            <el-form-item class="require-asterisk" :label="$i18ns('借据号')" prop="loan_no">
              <el-input v-model="basicForm.loan_no" @blur="fivetypeCustomerBlur" ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$i18ns('客户姓名')" prop="cust_name">
              <el-input v-model="basicForm.cust_name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$i18ns('产品名称')" prop="prod_name">
              <el-input v-model="basicForm.prod_name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$i18ns('贷款形态')">
              <el-select v-model="basicForm.loan_form" :disabled="true" placeholder=" ">
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
            <el-form-item :label="$i18ns('贷款账户状态')">
              <el-select v-model="basicForm.loan_acct_type" :disabled="true" placeholder=" ">
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
            <el-form-item :label="$i18ns('放款金额')" prop="cur_loan_bal">
              <el-input v-model="basicForm.cur_loan_bal" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$i18ns('人工资产分类')">
              <el-select v-model="basicForm.manu_five_clasf_imp_cr_ivsgn" :disabled="true" placeholder=" ">
                <el-option
                  v-for="(item, index) in rgzxgradcdList"
                  :key="index"
                  :label="item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$i18ns('币种')">
              <!-- <el-input v-model="basicForm.loan_form" :disabled="true"></el-input> -->
                    <el-select v-model="basicForm.ccy_code" prop="ccy_code" :disabled="true">
                      <el-option
                        v-for="(item,i) in ccyList"
                        :key="i"
                        :label="item.dictName"
                        :value="item.dictId"
                      ></el-option>
                    </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="fivetypeapp-detail">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>{{$i18ns('申请信息')}}</span>
          </template>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" :label="$i18ns('资产分类调整类型')" prop="manu_five_clasf_type">
                  <el-select v-model="appForm.manu_five_clasf_type" :placeholder="$i18ns('请选择')">
                    <el-option
                      v-for="item in fltypeList"
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
                <el-form-item class="require-asterisk" :label="$i18ns('人工资产分类')" prop="manu_five_clasf">
                  <el-select v-model="appForm.manu_five_clasf" :placeholder="$i18ns('请选择')">
                    <el-option v-for="item in sec_ruleOptions" :key="item.dictId" :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$i18ns('调整原因')" prop="reasion">
                  <el-input type="textarea" v-model="appForm.reasion"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$i18ns('附件上传')" prop="atchmt">
                  <upload-file-view ref="uploadProp" :uploadFileList="appForm.atchmt" :uploadDisabled="false" @changeFile="changeUploadFile"></upload-file-view>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$i18ns('备注')" prop="remark">
                  <el-input type="textarea" v-model="appForm.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>{{$i18ns('提交')}}</el-button>
      <el-button size="small"  @click="reset">{{$i18ns('取消')}}</el-button>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      :append-to-body="true"
    >
    <DuebillNoLookup></DuebillNoLookup>
    </el-dialog>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import UploadFileView from "@/views/pl/LevelFiveClasf/UploadFileView.vue";
  import DuebillNoLookup from "@/views/pl/repayAcctChange/change/duebill_no_lookup.json";
  export default {
    name: "fiveTypeApply",
    components: {
      UploadFileView,
      DuebillNoLookup
    },
    data() {
      return {
        basicForm: { // 基础信息表单对象
          loan_no: "",
          cust_no: "",
          cust_name: "",
          mobile_no: "",
          cert_no: "",
          cert_type: "",
          acctbl: "",
          prod_no:"",
          prod_name:"",
          loan_form:"",
          loan_acct_type:"",
          cur_loan_bal:"",
          ccy_code:"",
          manu_five_clasf_not_imp_cr_ivsgn:"",
          manu_five_clasf_imp_cr_ivsgn:"",
          ctrct_num:"",
          due_bill_amt:"",
        },
        appForm:{
          manu_five_clasf_type: "", // 五级分类调整类型
          manu_five_clasf: "", // 人工五级分类
          manu_five_clasf_to: "", // 人工五级分类

          reasion: "", // 调整原因
          atchmt:[],//附件
          remark: "", // 备注
        },
         ccyList:[],   //币种
        sec_ruleOptions: [], //资产分类字典选项
        atchmt:[],//附件
        compareCustomerInfo:"",
        basicRules : {
          loan_no: [{ required: true, message: "请输入借据号" }],
        },
        appRules : {
          manu_five_clasf_type: [{required: true, message: "请选择五级分类调整类型"}],
          manu_five_clasf: [{required: true,  message: "请选择人工五级分类"}],
          reasion:[{ required: true, message: "请输入申请原因" }],
        },
        accountLoanStatusList:[],
        loanStatusList:[],
        fltypeList:[
          {
            dictName: "不影响征信",
            dictId: "BX"
          },
          {
            dictName: "影响征信",
            dictId: "YX"
          }],
        rgzxgradcdList:[],
        activeNames: ["1"],
        dialogVisible: false,
      }
    },
    created() {

      this.getDictList("MS_CURRENCY", "ccyList"); // 币种
      this.getDictList("PL_E_ACCTST", "accountLoanStatusList"); // 初始化贷款账户状态数据字典,贷款账户状态
      this.getDictList("LN_E_LOAN_FORM", "loanStatusList"); // 化贷款形态数据字典，贷款形态
      this.getDictList("LN_E_CLEVEL", "rgzxgradcdList"); // 人工五级分类
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

      getCustomerInfo(){
        // 清空历史数据
        if (this.compareCustomerInfo) {
          this.basicForm.cust_no = ""; //客户号
          this.basicForm.cust_name = ""; // 客户姓名
          this.basicForm.cert_no = ""; // 证件号码
          this.basicForm.mobile_no = ""; // 手机号码
          this.basicForm.prod_no = ""; // 产品编号
          this.basicForm.prod_name = ""; // 产品名称
          this.basicForm.loan_form = ""; // 账户形态
          this.basicForm.loan_acct_type = ""; // 贷款账户状态
          this.basicForm.cert_type = ""; //证件类型
          this.basicForm.cur_loan_bal = ""; //贷款余额
          this.basicForm.manu_five_clasf_imp_cr_ivsgn = ""; //人工五级分类（影响征信）
          this.basicForm.manu_five_clasf_not_imp_cr_ivsgn = ""; //人工五级分类（不影响征信）
        }
        let params = {
          servicecode: "ln3100",
          loan_due_bill_num: this.basicForm.loan_no,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              this.basicForm.cust_no = res.data.cust_num; //客户号
               this.basicForm.cust_name = res.data.cust_nm; //客户号
              this.basicForm.prod_name = res.data.prod_nm;
              this.basicForm.ccy_code =res.data.ccy_code_num;

             // this.basicForm.cert_no = res.data.cert_no; // 证件号码
          //    this.basicForm.mobile_no = res.data.mobile_no; // 手机号码
              this.basicForm.prod_no = res.data.prod_code; // 产品编号
              this.basicForm.loan_form = res.data.loan_form; // 账户形态
              this.basicForm.loan_acct_type = res.data.loan_acct_ste; // 贷款账户状态
              this.basicForm.cur_loan_bal = res.data.nrl_prcpl; //贷款余额
              this.basicForm.manu_five_clasf_imp_cr_ivsgn = res.data.five_lv_clasf_flg; //人工五级分类（影响征信）
        //      this.basicForm.manu_five_clasf_not_imp_cr_ivsgn =res.data.five_lv_clasf_flg ; //人工五级分类（不影响征信）
              //const response = res.data.lnCustomerInfo;
             //this.basicForm = response;
             res.data
            }
          })
          .catch(err => {
            console.error(err);
          })
      },

      submit() {
        this.$refs.basicForm.validate(valid => {
          if (valid) {
            this.$refs.appForm.validate(valid => {
              if (valid) {
                this.$confirm("是否确认提交申请?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                }).then(() => {
                  let params = {
                    servicecode: "pl0106",
                    loan_no: this.basicForm.loan_no,
                    manu_five_clasf_type:this.appForm.manu_five_clasf_type,  //五级分类调整类型
                    loan_form:this.basicForm.loan_form,  //贷款形态
                    cust_name:this.basicForm.cust_name,
                    manu_five_clasf_to:this.appForm.manu_five_clasf,  //人工五级分类
                    reasion:this.appForm.reasion,   //原因
                    atchmt:this.appForm.atchmt,  //附件列表
                    remark:this.appForm.remark,  //备注

                  }
                  MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
                    if (res && res.code === "200") {
                      this.$message({
                        type: "success",
                        message: res.message
                      })
                      this.clearData();
                    }
                  }).catch(err => {
                    console.error(err);
                  })
                });
              }
            });
          }
        });


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
        this.$refs["basicForm"].resetFields();
        this.$refs["appForm"].resetFields();
        this.basicForm.loan_no = ""; //客户号
        this.basicForm.cust_no = ""; //客户号
        this.basicForm.cust_name = ""; // 客户姓名
        this.basicForm.cert_no = ""; // 证件号码
        this.basicForm.mobile_no = ""; // 手机号码
        this.basicForm.prod_no = ""; // 产品编号
        this.basicForm.prod_name = ""; // 产品名称
        this.basicForm.loan_form = ""; // 账户形态
        this.basicForm.loan_acct_type = ""; // 贷款账户状态
        this.basicForm.cert_type = ""; //证件类型
        this.basicForm.cur_loan_bal = ""; //贷款余额
        this.basicForm.manu_five_clasf_imp_cr_ivsgn = "";  //人工五级分类（影响征信）
        this.basicForm.manu_five_clasf_not_imp_cr_ivsgn = "";  //人工五级分类（不影响征信）
        this.appForm.reasion = "";   //认定原因
        this.appForm.atchmt = [];  //附件列表
        this.appForm.remark = "";  //备注
        this.compareCustomerInfo="";
        this.$refs.uploadProp.clearFileList();
      },

      fivetypeCustomerBlur(){
        if(this.basicForm.loan_no==="" || this.compareCustomerInfo===this.basicForm.loan_no){
          return false;
        }
        this.initsecRuleOptions();

        this.compareCustomerInfo=this.basicForm.loan_no;
        this.getCustomerInfo();
      },
       fivetypeCustomerBlurTO(){
        this.dialogVisible = true;
      },
       //加载字典
      initsecRuleOptions() {
        let request_map = {};
        let request_url = "/SUMP/icmcall/icmRPCCall";
        let params = {
          servicecode: "pl0212",
          loan_no: this.basicForm.loan_no
        }

        this.$http
          .invokeAPI(request_url, "post", params)
          .then((response) => {
            if (response.code === "200") {
              console.log("==sec_ruleOptions before",this.sec_ruleOptions)
               this.sec_ruleOptions=[]
               console.log("==sec_ruleOptions after",this.sec_ruleOptions)
                if(response.data !== null && response.data.length>0 ){
                 console.log("response",response.data)
                 response.data.forEach((item,index)=> {
                 let options={}
                 console.log("itme",item)
                 options["dictId"]=item["prim_key"]
                 options["dictName"]=item["classify_name"]
                 console.log("options",options)
                 this.sec_ruleOptions.push(options);

                });
                }else{
                  console.log("rgzxgradcdList",this.rgzxgradcdList)
                  this.sec_ruleOptions=this.rgzxgradcdList;
                }

            } else {
              MyMessage({
                message: response.message,
                type: "error",
              });
            }
          });
        },
      /**
       * 添加文件回调
       * @param file 当前添加文件对象
       * @param fileList 已添加文件
       */
      changeUploadFile(val){
        this.appForm.atchmt = val;  //附件列表
      },
    }
  }

</script>

<style lang="less" scoped>
  .fivetypeapp-basic,.fivetypeapp-detail {
    padding: 16px 40px 0 12px;
  }
  .fivetypeapp-detail {
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
