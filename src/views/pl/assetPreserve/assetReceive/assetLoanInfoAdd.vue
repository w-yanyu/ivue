<template>
  <div>
        <el-form  ref="basicForm" :model="basicForm" label-width="120px" class="custom-common--form">
          <el-row>
            <el-col :span="6">
              <el-form-item label="借据号"  prop="loan_no"   :rules="[{ required: true, message: '请输入借据号'}]">
                <el-input
                  v-model="basicForm.loan_no"
                  suffix-icon="el-input__icon el-icon-search"
                  @click.native="openDialog"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户名称">
                <el-input v-model="basicForm.cust_nm" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户号">
                <el-input v-model="basicForm.cust_no" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="产品名称">
                <el-input v-model="basicForm.prod_name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="产品代码">
                <el-input v-model="basicForm.prod_no" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="货币代号" prop="ccy_code"  >
                <el-select v-model="basicForm.ccy_code" placeholder=" " :disabled="true">
                  <el-option
                    v-for="(item, index) in ccyCodeList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="正常本金">
                <el-input v-model="basicForm.normal_princi" :disabled="basicForm.normal_princi<=0" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="逾期本金">
                <el-input v-model="basicForm.overdue_princi" :disabled="basicForm.overdue_princi<=0" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="呆滞本金">
                <el-input v-model="basicForm.stagnant_princi" :disabled="basicForm.stagnant_princi<=0" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="呆账本金">
                <el-input v-model="basicForm.uncollect_acct_princi" :disabled="basicForm.uncollect_acct_princi<=0" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="核销本金">
                <el-input v-model="basicForm.chk_write_off_prcpl" :disabled="basicForm.chk_write_off_prcpl<=0" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="核销利息">
                <el-input v-model="basicForm.chk_write_off_int" :disabled="basicForm.chk_write_off_int<=0" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="应收应计利息">
                <el-input v-model="basicForm.recv_accrued_inst" :disabled="basicForm.recv_accrued_inst<=0" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="应收欠息">
                <el-input v-model="basicForm.recv_debit_inst" :disabled="basicForm.recv_debit_inst<=0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="应收应计罚息">
                <el-input v-model="basicForm.recv_accrued_penalt_inst" :disabled="basicForm.recv_accrued_penalt_inst<=0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="应收罚息">
                <el-input v-model="basicForm.recv_penalt_inst" :disabled="basicForm.recv_penalt_inst<=0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="催收应计利息">
                <el-input v-model="basicForm.collt_accrued_inst" :disabled="basicForm.collt_accrued_inst<=0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="催收欠息">
                <el-input v-model="basicForm.collt_debit_inst" :disabled="basicForm.collt_debit_inst<=0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="催收应计罚息">
                <el-input v-model="basicForm.collt_acrued_penalt_inst" :disabled="basicForm.collt_acrued_penalt_inst<=0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="催收罚息">
                <el-input v-model="basicForm.collt_penalt_inst" :disabled="basicForm.collt_penalt_inst<=0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="应计复息">
                <el-input v-model="basicForm.accrued_comp_inst" :disabled="basicForm.accrued_comp_inst<=0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="复息">
                <el-input v-model="basicForm.compd_inst" :disabled="basicForm.compd_inst<=0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="应收罚金">
                <el-input v-model="basicForm.rcvbl_fine" :disabled="basicForm.rcvbl_fine<=0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="应收费用">
                <el-input v-model="basicForm.rcvbl_fee" :disabled="basicForm.rcvbl_fee<=0"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="已核销本金利息">
                <el-input v-model="basicForm.alrdy_chk_write_off_prcpl_int" :disabled="basicForm.alrdy_chk_write_off_prcpl_int<=0"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit">提交</el-button>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "assetLoanInfoAdd",
  components: {
  },
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      activeNasmes: ["first", "second", "third"],
      basicForm: {
        apply_no:"",
        loan_no: "",
        cust_nm: "",
        cust_no: "",
        cert_no: "",
        prod_name: "",
        prod_no: "",
        loan_acct_no:"",
        servicecode: "pl0265",
        prcpl_smtn:"",//本金合计
        int_smtn:"",//利息合计
        normal_princi:"",//正常本金
        overdue_princi:"",//逾期本金
        stagnant_princi:"",//呆滞本金
        uncollect_acct_princi:"",//呆账本金
        recv_accrued_inst:"",//应收应计利息
        collt_accrued_inst:"",//催收应计利息
        chk_write_off_prcpl:"",//核销本金
        chk_write_off_int:"",//核销利息
        recv_debit_inst:"",//应收欠息
        collt_debit_inst:"",//催收欠息
        recv_accrued_penalt_inst:"",//应收应计罚息
        collt_acrued_penalt_inst:"",//催收应计罚息
        alrdy_chk_write_off_prcpl_int:"",//已核销本金利息
        recv_penalt_inst:"",//应收罚息
        collt_penalt_inst:"",//催收罚息
        accrued_comp_inst:"",//应计复息
        rcvbl_fine:"",//应收罚金
        rcvbl_fee:"",//应收费用
        compd_inst:"",//复息
        dert_inst:"",//减免利息
        dert_amt:"",//减免本金
        apl_atchmt:"",//申请书附件
        cr_ivsgn_rept_atchmt:"",
        othr_evdc_atchmt:"",
        remark:"",//备注
        aply_adjust_reason:"",//申请原因
        chk_write_off_src_acct_num:"",//核销账号
        ccy_code:"",
        loan_form:""
      },

    }
  },
  computed: {

  },
  activated(){
    // 路由传参进入页面刷新页面
    if(this.$route.query.loan_no){
      this.basicForm.loan_no=this.$route.query.loan_no;
      this.lncfnoBlur();
    }
  },
  created() {
    this.basicForm.apply_no = this.cParentParams.apply_no;
    this.basicForm.loan_no = this.cParentParams.reserve1;

    if(this.basicForm.loan_no!="" && this.basicForm.loan_no!=undefined){
      this.lncfnoBlur();
    }

    // // 客户申请减免时间有效期控件配置 返回值为 true 则禁用该日期
    // this.khjmsqsjOptions.disabledDate = time => {
    //   return (time.getTime() > new Date().getTime());
    // }
    // // 预约减免有效期控件配置 返回值为 true 则禁用该日期
    // this.pickerOptions.disabledDate = time => {
    //   let maxDate = this.basicForm.yyjmyxqDisableDate ? this.$moment(this.basicForm.yyjmyxqDisableDate)._d.getTime() : Date.now();
    //   return (time.getTime() > maxDate || time.getTime() <= new Date().getTime() - 86400000);
    // }
    // this.getDictList("PL_E_CLSSST", "clssstList"); // 获取贷款状态下拉
    this.getDictList("PL_E_ADJRST", "adjrsnList"); // 调整申请原因下拉
    this.getDictList("PL_E_CLSSST", "loanStatusList"); // 贷款形态数据字典
    this.getDictList("MS_CURRENCY", "ccyCodeList"); // 货币数据字典
    //   // 个人批量扣款路由传参进入页面则直接调接口初始化页面
    // if(this.$route.query.loan_no){
    //    this.basicForm.loan_no=this.$route.query.loan_no;
    //    this.lncfnoBlur();
    // }
  },
  methods: {
    /**
     * 页面还原
     */
    pageRestore() {
      this.basicForm.loan_no = "";
      this.basicForm.cust_no = "";
      this.basicForm.cust_nm = "";
      this.basicForm.prod_name = "";
      this.basicForm.cert_no = "";
      this.basicForm.prod_no = "";
      this.basicForm.phonno = "";
      this.basicForm.loan_acct_no = "";
      this.basicForm.normal_princi = "";
      this.basicForm.overdue_princi = "";
      this.basicForm.stagnant_princi = "";
      this.basicForm.uncollect_acct_princi="";
      this.basicForm.recv_accrued_inst="";
      this.basicForm.collt_accrued_inst="";
      this.basicForm.recv_debit_inst="";
      this.basicForm.collt_debit_inst="";
      this.basicForm.recv_accrued_penalt_inst="";
      this.basicForm.collt_acrued_penalt_inst="";
      this.basicForm.recv_penalt_inst="";
      this.basicForm.collt_penalt_inst="";
      this.basicForm.accrued_comp_inst="";
      this.basicForm.compd_inst="";
      this.basicForm.prcpl_smtn="";
      this.basicForm.int_smtn="";
      //  this.debtForm.overdue_days = "";
      //  this.debtForm.recv_fee = "";
      this.basicForm.dert_amt = "";
      this.basicForm.dert_inst = "";
      this.basicForm.aply_adjust_reason = "";
      this.basicForm.chk_write_off_src_acct_num="";
      this.basicForm.remark = "";
      this.basicForm.upload = [];
      this.basicForm.apanne = [];
      this.basicForm.cdtane = [];
      this.basicForm.otbane = [];
      this.uploadFileList = [];
      this.apanneFileList = [];
      this.cdtaneFileList = [];
      this.otbaneFileList = [];
      this.$refs.basicForm.resetFields();
    },
    /**
     * 打开弹窗
     */
    openDialog() {
      const option = {
        toRequest: {
          url: "/views/pl/assetPreserve/query/select_hover_loan.json",
          method: "get",
          params: {
            "cust_no":this.cParentParams.cust_id,
            "apply_no":this.cParentParams.apply_no,
            "disposal_plan":"2"
          },
        },
        width: "50%",
        title: "借据选择",
        that: this,
      };
      this.$dataBus.bindCallBackMethod(this, this.bringBack, option);
      this.$dialog.open(option);
    },
    bringBack(formItem, returnData) {
      // let data = returnData.selectedData || returnData;
      let data = returnData;

      this.basicForm.loan_no = data["loan_no"];
      this.lncfnoBlur();

    },
    /**
     * 借据号失焦回调
     */
    lncfnoBlur() {

      // this.compareLncfno = this.basicForm.loan_no;
      if (!this.basicForm.loan_no) {
        return false;
      }

      let params = {
        servicecode: "ln3101",
        loan_due_bill_num: this.basicForm.loan_no,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then(response => {
          if (response && response.code === "200") {
            let customerLoan = response.data;
            // 基础信息填充
            //this.basicForm.loan_no   = cus.loan_due_bill_num;
            this.basicForm.cust_nm = customerLoan.cust_nm;
            this.basicForm.cust_no   = customerLoan.cust_num  ;
            this.basicForm.cert_no   = customerLoan.cert_no  ;
            this.basicForm.prod_name = customerLoan.prod_nm;
            this.basicForm.prod_no   = customerLoan.prod_code;
            this.basicForm.ccy_code  =customerLoan.ccy_code_num;
            this.basicForm.ccy_code = customerLoan.ccy_code_num;
            // 余额信息填充
            this.basicForm.normal_princi=customerLoan.nrl_prcpl;
            this.basicForm.accrued_comp_inst=customerLoan.acd_cmpd_int;
            this.basicForm.compd_inst=customerLoan.cmpd_int;
            this.basicForm.collt_acrued_penalt_inst=customerLoan.urge_collt_acd_pnly_int;
            this.basicForm.overdue_princi=customerLoan.ovdue_prcpl;
            this.basicForm.recv_accrued_inst=customerLoan.rcvbl_acd_int;
            this.basicForm.recv_accrued_penalt_inst=customerLoan.rcvbl_acd_pnly_int;
            this.basicForm.recv_penalt_inst=customerLoan.rcvbl_pnly_int;
            this.basicForm.recv_debit_inst=customerLoan.rcvbl_db_int;
            this.basicForm.stagnant_princi=customerLoan.stgnt_prcpl;
            this.basicForm.uncollect_acct_princi=customerLoan.ucoltb_prcpl;
            this.basicForm.collt_accrued_inst=customerLoan.urge_collt_acd_int;
            this.basicForm.collt_debit_inst=customerLoan.urge_collt_db_int;
            this.basicForm.collt_penalt_inst=customerLoan.urge_collt_pnly_int;
            this.basicForm.prcpl_smtn=customerLoan.prcpl_smtn;
            this.basicForm.int_smtn=customerLoan.int_smtn;
            this.basicForm.loan_form=customerLoan.loan_form;
            this.basicForm.chk_write_off_prcpl=customerLoan.chk_write_off_prcpl;
            this.basicForm.chk_write_off_int=customerLoan.chk_write_off_int;
            this.basicForm.rcvbl_fine=customerLoan.rcvbl_fine;
            this.basicForm.rcvbl_fee=customerLoan.rcvbl_fee;
            this.basicForm.alrdy_chk_write_off_prcpl_int=customerLoan.alrdy_chk_write_off_prcpl_int;

          }
        })
        .catch(err => {
          console.error(err);
        })
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
      this.$http.invokeAPI("/SUMP/rest/dict", "post", params)
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
     * 表单提交
     */
    submit() {
      let _this=this;
      let params = _this.basicForm;
      params.recv_fine  = _this.basicForm.rcvbl_fine;
      params.recv_fee  = _this.basicForm.rcvbl_fee;
      params.write_off_inst  = _this.basicForm.chk_write_off_int;
      params.write_off_princi  = _this.basicForm.chk_write_off_prcpl;

      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then(res => {
          if (res && res.code === "200") {
            this.$message({
              type: "success",
              message: res.message
            });
            this.pageRestore();
            //关闭弹窗
            this.$dataBus.doCallBack(this, res)
            this.$dialog.close();


          }
        })
        .catch(err => {
          console.error(err);
        })
    },
    /**
     *
     * 金额输入校验
     * @param value
     */
    handleInput(value) {
      if (value != '') {
        if (value.indexOf('.') > -1) {
          this.form.ProjectBudget = value.slice(0, value.indexOf('.') + 3)
        } else {
          this.form.ProjectBudget = value
        }
      }
    }
  }
}
</script>
