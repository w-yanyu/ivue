<template>
  <div>
    <el-collapse v-model="activeNasmes" class="custom-common--collapse">
      <el-collapse-item name="first">
        <template slot="title">
          <span>
            <em></em>{{$i18ns('基本信息')}}
          </span>
        </template>
        <el-form
          ref="basicForm"
          :rules="rules"
          :model="basicForm"
          label-width="160px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$i18ns('借据号')" prop="loan_no" :rules="[{ required: true, message: $i18ns('请输入借据号') }]">
                <el-input
                  v-model="basicForm.loan_no"
                  suffix-icon="el-input__icon el-icon-search"
                  @click.native="openDialog"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('客户名称')" prop="cust_name">
                <el-input v-model="basicForm.cust_name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('客户号')" prop="cust_no">
                <el-input v-model="basicForm.cust_no" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('产品名称')" prop="prodna">
                <el-input v-model="basicForm.prodna" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('产品代码')" prop="prodcd">
                <el-input v-model="basicForm.prodcd" :disabled="true"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item :label="$i18ns('贷款状态')" prop="clssst">
                <el-select v-model="basicForm.clssst" :disabled="true" placeholder>
                  <el-option
                    v-for="(item, i) in clssstList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>
      </el-collapse-item>

       <el-collapse-item name="second">
        <template slot="title">
          <span><em></em>{{$i18ns('财务信息')}}</span>
        </template>
        <el-form
          ref="adjustForm"
          :rules="rules"
          :model="adjustForm"
          label-width="160px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$i18ns('本金合计')">
                <el-input v-model="adjustForm.prcpl_smtn"  :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('利息合计')">
                <el-input v-model="adjustForm.int_smtn" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('正常本金')">
                <el-input v-model="adjustForm.normal_princi"  :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('逾期本金')">
                <el-input v-model="adjustForm.overdue_princi" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('呆滞本金')" >
                <el-input v-model="adjustForm.stagnant_princi" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('呆账本金')">
                <el-input v-model="adjustForm.uncollect_acct_princi" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('应收应计利息')">
                <el-input v-model="adjustForm.recv_accrued_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('催收应计利息')">
                <el-input v-model="adjustForm.collt_accrued_inst"  :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('应收欠息')">
                <el-input v-model="adjustForm.recv_debit_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('催收欠息')">
                <el-input v-model="adjustForm.collt_debit_inst"  :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('应收应计罚息')">
                <el-input v-model="adjustForm.recv_accrued_penalt_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('催收应计罚息')">
                <el-input v-model="adjustForm.collt_acrued_penalt_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('应收罚息')">
                <el-input v-model="adjustForm.recv_penalt_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('催收罚息')">
                <el-input v-model="adjustForm.collt_penalt_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('应计复息')">
                <el-input v-model="adjustForm.accrued_comp_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('复息')">
                <el-input v-model="adjustForm.compd_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>

            <el-collapse-item name="third">
        <template slot="title">
          <span><em></em>{{$i18ns('立案受理信息')}}</span>
        </template>
        <el-form
          ref="debtForm"
          :model="debtForm"
          label-width="160px"
          class="custom-common--form"
        >
        <div class="input-form">
          <el-row>
            <el-col :span="8">
              <el-form-item
                prop="acceptance_type"
                :label="$i18ns('受理类型')"
                :rules="[{ required: true, message: $i18ns('请选择受理类型') }]"
              >
                <el-select v-model="debtForm.acceptance_type" placeholder=" ">
                  <el-option
                    v-for="item in acceptTypeList"
                    :key="item.dictId"
                    :value="item.dictId"
                    :label="item.dictName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                prop="case_acceptance"
                :label="$i18ns('案件受理机构类型')"
                :rules="[{ required: true, message: $i18ns('请选择案件受理机构类型') }]"
              >
                <el-select v-model="debtForm.case_acceptance" placeholder=" " @change="getCaseAcceptOrg">
                  <el-option
                    v-for="item in acceptOrgTypeList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

           <el-col :span="8">
              <el-form-item
                :label="$i18ns('案件受理机构')"
                prop="now_acc_org"
                :rules="[{ required: true, message: $i18ns('请选择案件受理机构') }]"
              >
                <el-select v-model="debtForm.now_acc_org" placeholder=" ">
                  <el-option
                    v-for="item in caseAcceptOrgList"
                    :key="item.org_id"
                    :label="item.branch_name"
                    :value="item.branch_name"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="案号" prop="case_no">
                <el-input v-model="debtForm.case_no" @change="implementNoChange"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                :label="$i18ns('主张金额')"
                prop="opinion_arrear"
                :rules="[{ required: true, message: $i18ns('请输入主张金额') }]"
              >
                <el-input v-model="debtForm.opinion_arrear" @change="claimAmountChange" onKeypress="return (/[\d.]/.test(String.fromCharCode(event.keyCode)))"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                :label="$i18ns('受理日期')"
                prop="case_times"
                :rules="[{ required: true, message: $i18ns('请选择受理时间') }]"
              >
                <el-date-picker
                  v-model="debtForm.case_times"
                  type="date"
                  value-format="yyyyMMdd"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        </el-form>
        <el-form
          :model="applyForm"
          :rules="applyRules"
          ref="applyForm"
          class="custom-common--form"
          label-width="160px"
        >
          <el-row>
            <el-col :span="12" v-show="false">
              <el-form-item
                class="require-asterisk"
                :label="$i18ns('附件')"
                prop="ticketAccessory"

              >
                <to-begin-result-upload
                  ref="uploadProp"
                  :uploadFileList="applyForm.ticketAccessoryList"
                  :uploadDisabled="false"
                  @changeFile="changeUploadFile"
                  :key="timer"
                ></to-begin-result-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$i18ns('备注')">
                <el-input
                  type="textarea"
                  resize="none"
                  :rows="3"
                  v-model="applyForm.remark"
                  maxlength="200"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain
        >{{$i18ns('提交')}}</el-button
      >
    </div>
  </div>
</template>
<script>
import {
  applyRules,
  validateHandle,
} from "@/views/other/loanPostManager/loanPostConstant/loanPostConstant.js";
import MyAxios from "pte-ui/utils/MyAxios";
//import ToBeginResultUpload from "@/views/fs/tobeginappl/tobeginapplresult/ToBeginResultUpload.vue";

export default {
  name: "ToBeginAppl",
  components: {
   // ToBeginResultUpload,
  },
  data() {
    return {
      activeNasmes: ["first", "second", "third"],
      basicForm: {
        loan_no: "",
        cust_name: "",
        cust_no: "",
        prodna: "",
        prodcd: "",
        applid: "",
        phonno: "",
        accoutage: "",
        isunitln: "",
        unitname: "",
        debtpr: "",
        lncfno: "", //借据号
        acctNa: "", //客户名称
        custid: "", //客户编号
        idtfno: "", //证件号码
        phoneNo: "", //手机号码
        prodNa: "", //产品名称
        areacenter: "", //区域中心
        areaCenterName: "",//区域中心名称
        clssst: "", //贷款形态
        accountAge: "", //逾期天数
        unitedloan: "", //是否联合贷
        unitedloanCompany: "", //联合贷公司名称
        commissionOrg: "", //当前委案机构名称
        commissionStatus: "", //当前案件委案机构
        comlawsuitStatus: "", //当前案件诉讼状态
        loanbit: "", //欠款本金
        islgfe: "", //是否法诉
        nowvorg: "", //当前委案机构编号
      },
      applyRules,
      debtForm: {
        acceptance_type: "", //受理类型
        case_acceptance: "", //案件受理机构类型
        now_acc_org: "", //案件受理机构
        case_no: "", //案号
        opinion_arrear: null, //主张金额
        case_times: "", //受理时间
      },
      compareLncfno: "", // 借据号对比字段
      applyForm: {
        ticketList: [],
        applyRemark: "", //备注
        ticketAccessoryList: [], //文件列表
        ticketAccessory: [], //附件
      },
      adjustForm: {
        servicecode: "pl0501",
        suitReason: "",
        loan_no: "",
        cust_name: "",
        cust_no: "",
        prodna: "",
        prodcd: "",
        clssst: "",
        prcpl_smtn:"",//本金合计
        int_smtn:"",//利息合计
        normal_princi:"",//正常本金
        overdue_princi:"",//逾期本金
        stagnant_princi:"",//呆滞本金
        uncollect_acct_princi:"",//呆账本金
        recv_accrued_inst:"",//应收应计利息
        collt_accrued_inst:"",//催收应计利息
        recv_debit_inst:"",//应收欠息
        collt_debit_inst:"",//催收欠息
        recv_accrued_penalt_inst:"",//应收应计罚息
        collt_acrued_penalt_inst:"",//催收应计罚息
        recv_penalt_inst:"",//应收罚息
        collt_penalt_inst:"",//催收罚息
        accrued_comp_inst:"",//应计复息
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
      pickerOptions: {}, // 有效期控件配置
      validateList: [], //校验
      acceptTypeList: [], //受理类型字典列表
      acceptOrgTypeList: [], //案件受理机构类型字典列表
      caseAcceptOrgList: [], //案件受理机构名称列表
      areacenterList: [], //区域中心列表
      clssstList: [], //贷款形态列表
      commissionStatusList: [], //当前案件委案状态列表
      comlawsuitStatusList: [], //当前案件诉讼状态列表
      unitedloanList: [], //是否联合贷列表
      islgfeList: [], //是否法诉列表
    };
  },

  activated() {
    // 路由传参进入页面刷新页面
    if (this.$route.query.lncfno) {
      this.basicForm.lncfno = this.$route.query.lncfno;
      this.lncfnoBlur();
    }
  },
  computed: {},
  created() {
    this.getDictList("PL_E_ACCEPTANCE", "acceptTypeList"); //受理类型字典列表
    this.getDictList("PL_E_CASEACCE", "acceptOrgTypeList"); // 案件受理机构类型字典列表
    this.getDictList("PL_E_ISORNO_LEND", "creditFileTypeList"); //承办机构字典类型
    this.getDictList("MS_E_LEVEL5_TYPE", "clssstList"); // 贷款形态列表
    this.getDictList("PL_E_ENTRUSTSTUS", "commissionStatusList"); // 当前案件委案状态列表
    this.getDictList("PL_E_SUITSTUS", "comlawsuitStatusList"); // 当前案件诉讼状态列表
    this.getDictList("E_YES___", "unitedloanList"); // 是否联合贷列表
    this.getDictList("E_YES___", "islgfeList"); // 是否法诉列表
    // 个人批量扣款路由传参进入页面则直接调接口初始化页面
    if (this.$route.query.lncfno) {
      this.basicForm.lncfno = this.$route.query.lncfno;
      this.lncfnoBlur();
    }
    this.pickerOptions.disabledDate = (time) => {
      let maxDate = Date.now();
      return time.getTime() > maxDate;
    };
  },
  methods: {
    /**
     * 借据号失焦回调
     */
     openDialog() {
      const option = {
        toRequest: {
          url: "/views/pl/assetPreserve/query/select_hover_loan.json",
          method: "get",
          params: {
          "disposal_plan": "1",

          },
        },
        width: "50%",
        title: "法诉借据选择",
        that: this,
      };
      this.$dataBus.bindCallBackMethod(this, this.bringBack, option);
      //this.resetForm('loan_no');
      this.$dialog.open(option);

    },
    bringBack(formItem, returnData) {
      // let data = returnData.selectedData || returnData;
      let data = returnData;

      this.basicForm.loan_no = data["loan_no"];
      // this.$set(this.ruleForm, 'prod_type', data["prod_type"]);
      //字典渲染
             this.lncfnoBlur();

    },
    lncfnoBlur() {
      // if (this.basicForm.lncfno === "") {
      //   return false;
      // }
      // this.compareLncfno = this.basicForm.lncfno;
      // if (!this.basicForm.lncfno) {
      //   return false;
      // }
      let params = {
        servicecode: "ln3100",
        loan_due_bill_num: this.basicForm.loan_no,
      };
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then((response) => {
          if (
            response &&
            response.code === "200" &&
            response.data
          ) {
            let cus = response.data;
            let data = response.data;
            this.basicForm.cust_name = data.cust_nm;
            this.basicForm.cust_no = data.cust_num; //客户号
            this.basicForm.prodna = data.prod_nm;
            this.basicForm.prodcd = data.prod_code; //产品代码
            this.basicForm.clssst = data.loan_form;

            this.basicForm.areaCenter = data.areaCenter;
            this.basicForm.areaCenterName = data.areaCenterName;
            this.basicForm.accoutage = data.accoutage;
            this.basicForm.isunitln = data.isunitln;
            this.basicForm.unitname = data.unitname;
            this.basicForm.islgfe = data.islgfe;
            this.basicForm.entrust_status = data.entrust_status;
            this.basicForm.suit_status = data.suit_status;
            this.basicForm.nowvorg = data.nowvorg;
            this.basicForm.jqstus = data.jqstus;
            this.basicForm.hxstus = data.hxstus;
            this.basicForm.ovdays = data.ovdays; //逾期天数
            this.basicForm.debtpr = data.debtpr; //欠款本金

            // 余额信息填充
            this.adjustForm.ccy_code = data.ccy_code_num;
            this.adjustForm.normal_princi=data.nrl_prcpl;
            this.adjustForm.accrued_comp_inst=data.acd_cmpd_int;
            this.adjustForm.compd_inst=data.cmpd_int;
            this.adjustForm.collt_acrued_penalt_inst=data.urge_collt_acd_pnly_int;
            this.adjustForm.overdue_princi=data.ovdue_prcpl;
            this.adjustForm.recv_accrued_inst=data.rcvbl_acd_int;
            this.adjustForm.recv_accrued_penalt_inst=data.rcvbl_acd_pnly_int;
            this.adjustForm.recv_penalt_inst=data.rcvbl_pnly_int;
            this.adjustForm.recv_debit_inst=data.rcvbl_db_int;
            this.adjustForm.stagnant_princi=data.stgnt_prcpl;
            this.adjustForm.uncollect_acct_princi=data.ucoltb_prcpl;
            this.adjustForm.collt_accrued_inst=data.urge_collt_acd_int;
            this.adjustForm.collt_debit_inst=data.urge_collt_db_int;
            this.adjustForm.collt_penalt_inst=data.urge_collt_pnly_int;
            this.adjustForm.prcpl_smtn=data.prcpl_smtn;
            this.adjustForm.int_smtn=data.int_smtn;
            this.adjustForm.loan_form=data.loan_form;

            // this.basicForm.acctNa = cus.acctna; //客户名称
            // this.basicForm.custid = cus.custno; //客户id
            // this.basicForm.islgfe = cus.islgfe; //是否法诉
            // this.basicForm.idtfno = cus.idtfno; //证件号码
            // this.basicForm.phoneNo = cus.phonno; //手机号码
            // this.basicForm.prodNa = cus.prodna; //产品名称
            // this.basicForm.areacenter = cus.areaCenter; //区域中心
            // this.basicForm.areaCenterName = cus.areaCenterName; //区域中心名称
            // this.basicForm.clssst = cus.clssst; //贷款形态
            // this.basicForm.accountAge = cus.ovdays; //逾期天数
            // this.basicForm.unitedloan = cus.isunitln; //是否联合贷
            // this.basicForm.unitedloanCompany = cus.unitname; //联合贷公司名称
            // this.basicForm.nowvorg = cus.nowvorgnm; //当前委案机构名称
            // this.basicForm.commissionOrg = cus.nowvorgnm; //当前委案机构名称
            // this.basicForm.commissionStatus = cus.entrust_status; //当前案件委案状态
            // this.basicForm.comlawsuitStatus = cus.suit_status; //当前案件诉讼状态
            this.basicForm.loanbit = (parseFloat(cus.lnnpbl) + parseFloat(cus.lnopbl) + parseFloat(cus.lndpbl) + parseFloat(cus.lnbpbl) + parseFloat(cus.hxxxpr)).toFixed(2); //欠款本金（本金之和贷款余额）
            const a = parseFloat(this.basicForm.loanbit);
            if (a  === 0) {
              this.$message({
                type: "warning",
                message: "当前客户欠款本金为0，请注意！",
              })
            }else if(a  > 0 && a  < 30000) {
              this.$message({
                type: "warning",
                message: "当前客户欠款本金小于3万，请注意！",
              })
            }
         }
        })
        .catch((err) => {
          console.error(err);
        });
    },

     transformData() {
      let params = Object.assign(
        {},
        this.basicForm,
        this.debtInfoForm,
        this.applyForm,
        this.otherInfoForm,
                this.debtForm

      );
      params.spouseInfo = this.tableDataOne;
      return params;
    },

     submit() {
       //console.log(operation);
       this.validateList = [];
       const formList = ["basicForm", "debtForm"];
       formList.forEach((item) => {
         this.validateList.push(validateHandle(item, this));
       });
       Promise.all(this.validateList)
         .then((res) => {
           let params = this.transformData();
           params.servicecode = "pl0526";
           MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
             .then(res => {
               if (res && res.code === "200") {
                 let msg = "提交成功";
                 this.$msg({
                   message: msg,
                   type: "success"
                 });
                 this.$emit("update", {}),
                   (params.appl_id = res.data.appl_id),
                   (params.cust_name = res.data.cust_name),
                   (params.appl_state = res.data.appl_state),
                   (params.appl_date = res.data.appl_date),
                   (params.appId = 'plOnl'),
                   (params.wf_inst_id = res.data.wf_inst_id),
                   (params.task_inst_id = res.data.cur_task_id),
                   (params.proc_inst_id = res.data.cur_wfrl_id),
                   (params.frame_cd = res.data.task_url1),
                   // that.cParentScope.parentFormModel.custId = '';
                   this.$openNavTab(
                     "views/pl/workbench/workbench_wait_todo_view.json",
                     "待办事项办理",
                     params,
                     this
                   );
                 this.basicForm.lncfno = "";
                 this.clearHistory(); //清空信息
               }
             })
             .catch(err => {
               console.error(err);
             })
         }) .catch((err) => {
         this.$message({
           type: "warning",
           message: "校验不通过",
         });
       });
    },
    cleartableinfo() {
      this.basicForm.acctNa = ""; //客户名称
      this.basicForm.idtfno = ""; //证件号码
      this.basicForm.custid = "", //客户编号
      this.basicForm.islgfe = "", //是否法诉
      this.basicForm.phoneNo = ""; //手机号码
      this.basicForm.prodNa = ""; //产品名称
      this.basicForm.areacenter = ""; //区域中心
      this.basicForm.areaCenterName = ""; //区域中心名称
      this.basicForm.clssst = ""; //贷款形态
      this.basicForm.accountAge = ""; //逾期天数
      this.basicForm.unitedloan = ""; //是否联合贷
      this.basicForm.unitedloanCompany = ""; //联合贷公司名称
      this.basicForm.commissionOrg = ""; //当前委案机构
      this.basicForm.commissionStatus = ""; //当前案件委案状态
      this.basicForm.comlawsuitStatus = ""; //当前案件诉讼状态
      this.basicForm.loanbit = ""; //欠款本金（本金之和贷款余额）
      this.applyForm.applyRemark = ""; //备注
      this.$refs["debtForm"].resetFields();
      this.$refs["basicForm"].resetFields();
      this.$refs["applyForm"].resetFields();
      this.debtForm.preservationStage = ""; //保全阶段字典类型
      this.applyForm.ticketAccessoryList = []; //文件列表
      this.fileList = [];
      this.$refs.uploadProp.clearFileList();
    },
    /**
     * 文件清单change回调
     * @param file 当前文件对象
     * @param fileList 文件清单
     * @param index 当前附件下标
     */
    accessoryChange(file, fileList, index) {
      console.log(file, fileList, "accessoryChange");
      this.applyForm.ticketAccessoryList = fileList;
      const isLt8M = file.size / 1024 / 1024 < 20;
      if (!isLt8M) {
        this.applyForm.ticketAccessoryList.splice(index, 1);
        this.$message({
          type: "warning",
          message: "凭证文件大于20M",
        });
      } else {
        let formData = new FormData();
        formData.append("file", file.raw);
      formData.append("org_id", userInfo.org_id);
        formData.append("path", "PD");
        MyAxios.invokeAPI("/SUMP/icmcall/file", "post", formData)
          .then((res) => {
            if (res && res.code === "200" && res.data && res.data.path) {
              file.status = "success";
              this.applyForm.ticketAccessory.push({
                filePath: res.data.path,
                fileName: file.name,
              });
            } else {
              this.applyForm.ticketAccessoryList.splice(
                fileList.indexOf(file),
                1
              );
              this.$message({
                type: "error",
                message: "上传失败！",
              });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },

    /**
     * 文件清单移除回调
     * @param file 当前文件对象
     * @param fileList 文件清单
     * @param index 当前附件下标
     */
    accessoryRemove(file, fileList, index) {
      this.applyForm.ticketList[index].ticketAccessoryList.forEach(
        (item, key) => {
          if (item.uid === file.uid) {
            this.applyForm.ticketList[index].ticketAccessory.splice(key, 1);
            this.applyForm.ticketList[index].ticketAccessoryList.splice(key, 1);
          }
        }
      );
      if (fileList.length === 0) {
        this.$refs.applyForm.validateField(
          `ticketList[${index}].ticketAccessory`
        );
      }
    },

    /**
     * 添加保全信息组件
     */
    addTicketDetail() {
      const item = {
        saveType: "", // 保全类型
        procpreresult: "", // 保全结果
        isfirstoff: "", // 是否首封
        homeAddr: "", //房屋地址
        procpreqx: "", //保全期限
        ticketAccessory: [], // 附件 路径集合
        ticketAccessoryList: [], //附件文件集合
      };
      this.applyForm.ticketList.push(item);
      // this.ticketValidHandle();
    },

    /**
     * 删除保全信息
     * @param index 保全信息下标
     */
    delTicketDetail(index) {
      this.applyForm.ticketList.splice(index, 1);
      //this.ticketValidHandle();
    },
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictType
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType],
      };
      this.$http
        .invokeAPI("/SUMP/rest/dict", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     * 添加文件回调
     * @param file 当前添加文件对象
     * @param fileList 已添加文件
     */
    changeUploadFile(val) {
      this.applyForm.ticketAccessory = val; //附件列表
      // this.applyForm.ticketAccessoryList = val;  //附件列表
    },
    ticketAccessoryValidate(value, rule, callback) {
      if (this.applyForm.ticketAccessory.length === 0) {
        return callback(new Error("请上传附件"));
      }
      return callback();
    },
    /**
     * 主张金额检验
     */
    claimAmountChange(val) {
      if (parseFloat(this.debtForm.claimAmount) < 0 || parseFloat(this.debtForm.claimAmount) === 0) {
        this.$message({
          type: "warning",
          message: "主张金额必须大于0！",
        });
        this.debtForm.claimAmount = null;
      }
      else if (this.debtForm.claimAmount === "") {
        this.debtForm.claimAmount = null;
      }else if (parseFloat(this.nubFormat(parseFloat(val),2)) === 0) {
        this.debtForm.claimAmount = null;
      }else {
        this.debtForm.claimAmount = this.nubFormat(parseFloat(this.debtForm.claimAmount),2);
      }
    },
    /**
     * 数字格式化成金额
     * @param  金额
     * @param 小数点后面有几位
     *
     */
    nubFormat(s, n) {
      n = n > 0 && n <= 20 ? n : 2;
      if (this.isInteger(s)) {
        return parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
      }else {
        let a = (s + "").replace(/[^\d\.-]/g, "");
        console.log("a", a)
        s = parseFloat(a.substring(0,a.indexOf(".")+(n+1))) + "";
      }
      var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
        if (!r) {
          r = '00';
        }
      var t = "";
      for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "" : ""); //加分隔符
      }
      return (t.split("").reverse().join("") +"." +r);
    },
    /**
     * 判断数字是整数
     */
    isInteger(obj) {
      return typeof obj === 'number' && obj%1 === 0; //是整数返回true，否则false
    },
    /**
     * 案件受理机构名称列表获取
     */
    getCaseAcceptOrg() {
      if (this.debtForm.acceptOrgType === "") {
        return false;
      }
        // let areaid = JSON.parse(localStorage.getItem("user_info")).branch_id;
        // console.log("areaid",areaid)
      let params = {
        servicecode: "pl0566",
        // area_center: areaid,
        case_acceptance: this.debtForm.case_acceptance

      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post", params).then(res =>{
        if (res && res.code === "200" && res.data) {
          console.log("res.data", res.data)
          this.caseAcceptOrgList = res.data;
        }
      }).catch(err => {
        console.error(err)
      })
    },
    // /**
    //  * 区域中心列表获取
    //  */
    // getSecondBranch(){
    //     let reqMap = {
    //         // branchNo: this.basicForm.areacenter,
    //         servicecode: "RLMSPLTS1068",
    //     }
    //     MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
    //         if (res && res.code === "200") {
    //           this.areacenterList = res.data;
    //         }
    //     }).catch(err => {
    //         console.error(err);
    //     });
    // },
    /**
     * 全角转半角
     */
    implementNoChange(str) {
        let tem = "";
         for (var i = 0; i < str.length; i++) {
             if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
                 tem += String.fromCharCode(str.charCodeAt(i) - 65248);
             }
             else {
                 tem += String.fromCharCode(str.charCodeAt(i));
             }
         }
        let a = tem;
        if (a.indexOf(" ") !== -1 || a.indexOf("　") !== -1) {
          tem = "";
        }
         this.debtForm.implementNo = tem;
         return this.debtForm.implementNo;
     },
    },
};
</script>
<style lang="less" scoped>
.purpose-basic,
.purpose-detail {
  padding: 16px 40px 0 12px;
}
.purpose-detail {
  .el-form {
    padding: 0;
  }
  /deep/.el-collapse {
    .el-collapse-item__content {
      padding: 20px 80px 20px 20px;
    }
  }
}
.ticket-detail {
  margin-bottom: 16px;
  padding: 16px 0 10px 0;
  position: relative;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  .ticket-option {
    width: 50px;
    height: 32px;
    position: absolute;
    top: calc(50% - 16px);
    right: -60px;
    i {
      width: 20px;
      display: inline-block;
      line-height: 32px;
      text-align: center;
      font-size: 18px;
      cursor: pointer;
      &:hover {
        color: #1890ff;
      }
    }
  }
}
.ticket-tips {
  padding-left: 20px;
  line-height: 34px;
  color: #0066ff;
}
.credential-upload {
  margin-bottom: 20px;
}
.custom-common--form{
  .input-form {
   border: 1px solid #e4e7ed;
   padding: 20px 18px 0px 0px;
  }
}
</style>
