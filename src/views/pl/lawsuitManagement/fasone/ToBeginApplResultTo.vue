<template>
  <div class="container-theme">
    <el-collapse v-model="activeNasmes" class="custom-common--collapse">
      <el-collapse-item name="first">
        <template slot="title">
          <span>
            <em></em>基本信息
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
              <el-form-item label="借据号" prop="loan_no">
                <el-input
                  v-model="basicForm.loan_no"
                  @blur="lncfnoBlur"
                  @keyup.enter.native="lncfnoBlur"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户名称" prop="cust_name">
                <el-input v-model="basicForm.cust_name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户号" prop="cust_no">
                <el-input v-model="basicForm.cust_no" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="产品名称" prop="prodna">
                <el-input v-model="basicForm.prodna" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="产品代码" prop="prodcd">
                <el-input v-model="basicForm.prodcd" :disabled="true"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="贷款状态" prop="clssst">
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
          <span><em></em>财务信息</span>
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
              <el-form-item label="本金合计">
                <el-input v-model="adjustForm.prcpl_smtn"  :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="利息合计">
                <el-input v-model="adjustForm.int_smtn" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="正常本金">
                <el-input v-model="adjustForm.normal_princi"  :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="逾期本金">
                <el-input v-model="adjustForm.overdue_princi" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="呆滞本金" >
                <el-input v-model="adjustForm.stagnant_princi" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="呆账本金" >
                <el-input v-model="adjustForm.uncollect_acct_princi" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="应收应计利息">
                <el-input v-model="adjustForm.recv_accrued_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="催收应计利息">
                <el-input v-model="adjustForm.collt_accrued_inst"  :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="应收欠息">
                <el-input v-model="adjustForm.recv_debit_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="催收欠息">
                <el-input v-model="adjustForm.collt_debit_inst"  :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="应收应计罚息">
                <el-input v-model="adjustForm.recv_accrued_penalt_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="催收应计罚息">
                <el-input v-model="adjustForm.collt_acrued_penalt_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="应收罚息">
                <el-input v-model="adjustForm.recv_penalt_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="催收罚息">
                <el-input v-model="adjustForm.collt_penalt_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="应计复息">
                <el-input v-model="adjustForm.accrued_comp_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="复息">
                <el-input v-model="adjustForm.compd_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="third">
        <template slot="title">
          <span><em></em>立案受理结果</span>
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
                  prop="sel_type"
                  label="审判类型"
                  :rules="[{ required: true, message: '请选择审判类型' }]"
                >
                  <el-select v-model="debtForm.sel_type" placeholder=" " :disabled="true">
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
                  label="承办机构名称"
                  prop="org_nm"
                  :rules="[{ required: true, message: '请输入承办机构名称' }]"
                >
                  <el-input
                    v-model="debtForm.org_nm"
                    @change="implementNoChange"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  prop="case_acceptance"
                  label="受理机构类型"
                  :rules="[
                    { required: true, message: '请选择案件受理机构类型' },
                  ]"
                >
                  <el-select
                    v-model="debtForm.case_acceptance"
                    placeholder=" "
                   :disabled="true"
                  >
                    <el-option
                      v-for="item in acceptOrgTypeList"
                      :key="item.dictId"
                      :label="item.dictName"
                      :value="item.dictId"
                      :disabled="true"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="案件受理机构"
                  prop="now_acc_org"
                  :rules="[{ required: true, message: '请输入案件受理机构' }]"
                >
                  <el-input
                    v-model="debtForm.now_acc_org"
                    placeholder=" "
                   :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="案件程序类型"
                  prop="cap_type"
                  :rules="[{ required: true, message: '请选择案件程序类型' }]"
                >
                  <el-select
                    v-model="debtForm.cap_type"
                    placeholder=" "
                    @change="caseProTypeChange"
                    :disabled="true"

                  >
                    <el-option
                      v-for="item in caseProTypeList"
                      :key="item.dictId"
                      :value="item.dictId"
                      :label="item.dictName"
                      
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              
            <!--  <el-col :span="8">
                <el-form-item
                  label="案件程序"
                  prop="cap_soft"

                >
                  <el-input
                    v-model="debtForm.org_no"
                    @change="implementNoChange"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>-->
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="录入开庭时间" prop="in_cu_tm">
                  <el-date-picker
                    v-model="debtForm.in_cu_tm"
                    type="date"
                    value-format="yyyyMMdd"
                    :picker-options="pickerOptions"
                    :disabled="true"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="录入审判案号"
                  prop="intr_no"
                  :rules="[{ required: true, message: '请选择录入审判案号' }]"
                >
                  <el-input
                    v-model="debtForm.intr_no"
                    @change="implementNoChange"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="文书类型"
                  prop="dcm_type" 
                  :rules="[{ required: true, message: '请选择文书类型' }]"
                  
                >
                  <el-select v-model="debtForm.dcm_type" placeholder=" " :disabled="true">
                    <el-option
                      v-for="item in writTypeList"
                      :key="item.dictId"
                      :value="item.dictId"
                      :label="item.dictName"
                      
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="文书落款日期"
                  prop="sign_Date"
                  :rules="[{ required: true, message: '请选择文书落款日期' }]"
                  :disabled="true"
                >
                  <el-date-picker
                    v-model="debtForm.sign_Date"
                    type="date"
                    value-format="yyyyMMdd"
                    :picker-options="pickerOptions"
                    :disabled="true"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="案件结果"
                  prop="case_result" 
                  :rules="[{ required: true, message: '请选择案件结果' }]"
                  >
                  <el-select v-model="debtForm.case_result" placeholder=" " :disabled="true">
                    <el-option
                      v-for="item in litigOutcomeList"
                      :key="item.dictId"
                      :value="item.dictId"
                      :label="item.dictName"
                      
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="胜诉金额"
                  prop="win_am"
                  :rules="[{ required: true, message: '请输入胜诉金额' }]"
                  v-if="this.debtForm.litigOutcome === '1'"
                >
                  <el-input
                    v-model="debtForm.win_am"
                    @change="inTheAmountChange"
                    onKeypress="return (/[\d.]/.test(String.fromCharCode(event.keyCode)))"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  label="上诉方"
                  prop="apelat_form"
                  :rules="[{ required: true, message: '请选择上诉方' }]"
                  v-if="this.debtForm.acceptType === '2'"
                >
                  <el-select v-model="debtForm.apelat_form" placeholder=" ">
                    <el-option
                      v-for="item in prosecutionList"
                      :key="item.dictId"
                      :value="item.dictId"
                      :label="item.dictName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-show="false">
                <el-form-item label="受理流水号" prop="acpt_no">
                  <el-input v-model="debtForm.acpt_no" :disabled="true"></el-input>
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
            <el-col :span="12"  v-show="false">
              <el-form-item
                class="require-asterisk"
                label="文书上传"
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
                  v-model="applyForm.applyRemark"
                  maxlength="200"
                  :disabled="true"

                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
     <!-- <div class="custom-common--footer">
        <el-button type="primary" size="small" @click="submit" plain
          >提交</el-button
        >
      </div>-->
      <el-collapse-item name="four" v-if="fourShow">
        <template slot="title">
          <span><em></em>立案受理结果历史</span>
        </template>
        <to-json
          toUrl="/views/fs/tobeginappl/tobeginapplresult/toBeginApplResultHistory.json"
          :params="{ lncfno: basicForm.lncfno, isApply: isApply }"
          :key="jsontimer"
        ></to-json>
      </el-collapse-item>
    </el-collapse>
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
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object // 父页面自定义参数与内置参数
  },
  name: "ToBeginApplResult",
  components: {
  //  ToBeginResultUpload,
  },
  data() {
    return {
      activeNasmes: ["first", "second", "third", "four"],
      basicForm: {
        loan_no: "",
        cust_name: "",
        cust_no: "",
        idtfno: "",
        prodna: "",
        prodcd: "",
        clssst: "", //贷款形态
        accountAge: "", //逾期天数
        unitedloan: "", //是否联合贷
        unitedloanCompany: "", //联合贷公司名称
        commissionOrg: "", //当前委案机构名称
        nowvorg: "", //当前委案机构编号
        commissionStatus: "", //当前案件委案机构
        comlawsuitStatus: "", //当前案件诉讼状态
        custid: "", //客户编号
        islgfe: "", //是否法诉
      },
      isLookShow: true,
      applyRules,
      debtForm: {
        cap_type: "",
        acpt_no: "", //受理流水号
        sel_type: "", //审判类型
        org_nm: "", //承办机构名称
        org_no: "", //承办机构编号
        case_acceptance: "", //案件受理机构类型
        now_acc_org: "", //案件受理机构
        cap_soft: "", //案件程序
        in_cu_tm: "", //录入开庭时间
        intr_no: "", //录入审判案号
        dcm_type: "", //文书类型
        sign_Date: "", //文书落款日期
        caseProType: "", //案件程序类型
        case_result: "", //案件结果
        inTheAmount: null, //胜诉金额
        prosecution: "", //上诉方
      },
      applyForm: {
        ticketList: [],
        remark: "", //备注
        ticketAccessoryList: [], //文件列表
        ticketAccessory: [], //附件
      },
      adjustForm: {
        servicecode: "pl0501",
        suitReason: "",
        remark: "",
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
      compareLncfno: "", // 借据号对比字段
      clssstList: [], // 贷款状态下拉
      pickerOptions: {}, // 控件配置
      validateList: [], //校验
      acceptTypeList: [], //审判类型字典列表
      acceptOrgTypeList: [], //案件受理机构类型字典列表
      caseProTypeList: [], //案件程序类型字典类型列表
      litigOutcomeList: [], //案件结果字典类型列表
      writTypeList: [], //文书类型字典类型列表
      prosecutionList: [], //上诉方字典类型列表
      judproList: [], //案件程序总列表
      lawDictList: [], //法院字典类型列表
      accountDictList: [], //公账字典类型列表
      arbitDictList: [], //仲裁字典类型列表
      fourShow: false, //历史显示与隐藏
      organizerNameList: [], //承办机构名称列表
      areacenterList: [], //区域中心列表
      unitedloanList: [], //是否联合贷列表
      commissionStatusList: [], //当前案件委案状态列表
      comlawsuitStatusList: [], //当前案件诉讼状态列表
      islgfeList: [], //是否法诉列表
      jsontimer: "",
      isApply: "1", //判断是否为申请界面
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

    this.basicForm.loan_no = this.cParentParams.reserve1;

      if(this.basicForm.loan_no!="" && this.basicForm.loan_no!=undefined){
        this.lncfnoBlur();
      }
      this.getrpymtAmt();

    this.getDictList("MS_E_LEVEL5_TYPE", "clssstList"); //贷款状态字典列表
    this.getDictList("PL_E_SUITYPE", "acceptTypeList"); //审判类型字典列表
    this.getDictList("PL_E_CASEACCE", "acceptOrgTypeList"); // 案件受理机构类型字典列表
    this.getDictList("PL_E_CASEACCE", "caseProTypeList"); // 案件程序类型字典类型列表
    this.getDictList("PL_E_SUITRESULT", "litigOutcomeList"); //案件结果字典类型列表
    this.getDictList("PL_E_DOCUMNTYPE", "writTypeList"); //文书类型字典类型列表
    this.getDictList("PL_E_APPELLANT", "prosecutionList"); //上诉方字典类型列表
    this.getDictList("PL_E_CASE_FAYUAN", "lawDictList"); //法院字典类型列表
    this.getDictList("PL_E_CASE_GONGZHENG", "accountDictList"); //公账字典类型列表
    this.getDictList("PL_E_CASE_ZHONGCAI", "arbitDictList"); //仲裁字典类型列表
    this.getDictList("E_YES___", "unitedloanList"); // 是否联合贷列表
    this.getDictList("PL_E_ENTRUSTSTUS", "commissionStatusList"); // 当前案件委案状态列表
    this.getDictList("PL_E_SUITSTUS", "comlawsuitStatusList"); // 当前案件诉讼状态列表
    this.getDictList("E_YES___", "islgfeList"); // 是否法诉列表
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

     getrpymtAmt() {
    var _this = this; //很重要！！
    let params = {
      servicecode: "pl0529",
      apply_no: this.cParentParams.appl_id,
    };
    MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then((res) => {
        if (res && res.code === "200") {
          
          this.debtForm.cap_type = res.data.cap_type;

          this.debtForm.acpt_no = res.data.acpt_no;
          this.debtForm.sel_type = res.data.sel_type;
          this.debtForm.org_nm = res.data.org_nm;
          this.debtForm.org_no = res.data.org_no;
          this.debtForm.case_acceptance = res.data.case_acceptance;
          this.debtForm.now_acc_org = res.data.now_acc_org;
          this.debtForm.cap_soft = res.data.cap_soft;
          this.debtForm.in_cu_tm = res.data.in_cu_tm;
          this.debtForm.intr_no = res.data.intr_no;
          this.debtForm.dcm_type = res.data.dcm_type;
          this.debtForm.sign_Date = res.data.sign_Date;
          this.debtForm.caseProType = res.data.caseProType;
          this.debtForm.case_result = res.data.case_result;
          this.applyForm.remark = res.data.remark;

          //_this.appForm.manu_five_clasf = res.data.artificial_five_clasf_tp;
          // _this.appForm.remark = res.data.remark;


        }
      })
      .catch((err) => {
        console.error(err);
      });
    },

    lncfnoBlur() {
      // if (this.basicForm.lncfno === "") {
      //   return false;
      // }
      // this.compareLncfno = this.basicForm.lncfno;
      // if (!this.basicForm.lncfno) {
      //   return false;
      // }
      this.getinfoList();
      this.getapplList();
    },
    getapplList() {
        let param = {
          servicecode: "RLMSPLTS1385",
          lncfno: this.compareLncfno,
        };
        MyAxios
          .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", param)
          .then((response) => {
            if (
              response &&
              response.code === "200" &&
              response.data
            ) {
              let cus = response.data;
              this.debtForm.acceptOrgType = cus.caacce;
              this.debtForm.acceptOrgName = cus.udtaog;
              this.debtForm.seq = cus.acptsr; //流水号
           }
          })
          .catch((err) => {
            console.error(err);
          });
    },
    getinfoList() {
        let param = {
          servicecode: "ln3100",
        loan_due_bill_num: this.basicForm.loan_no,
        };
        MyAxios
          .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", param)
          .then((response) => {
            if (
              response &&
              response.code === "200" &&
              response.data
            ) {
            let baseinfo = response.data;
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

            // this.basicForm.acctNa = baseinfo.acctna; //客户名称
            // this.basicForm.custid = baseinfo.custno; //客户id
            // this.basicForm.islgfe = baseinfo.islgfe; //是否法诉
            // this.basicForm.idtfno = baseinfo.idtfno; //证件号码
            // this.basicForm.phoneNo = baseinfo.phonno; //手机号码
            // this.basicForm.prodNa = baseinfo.prodna; //产品名称
            // this.basicForm.areacenter = baseinfo.areaCenter; //区域中心

            // this.basicForm.clssst = baseinfo.clssst; //贷款形态
            // this.basicForm.accountAge = baseinfo.ovdays; //逾期天数
            // this.basicForm.unitedloan = baseinfo.isunitln; //是否联合贷
            // this.basicForm.unitedloanCompany = baseinfo.unitname; //联合贷公司名称
            // this.basicForm.commissionOrg = baseinfo.nowvorgnm; //当前委案机构
            // this.basicForm.commissionStatus = baseinfo.entrust_status; //当前案件委案状态
            // this.basicForm.comlawsuitStatus = baseinfo.suit_status; //当前案件诉讼状态
            // this.basicForm.loanbit = parseFloat(baseinfo.lnnpbl) + parseFloat(baseinfo.lnopbl) + parseFloat(baseinfo.lndpbl) + parseFloat(baseinfo.lnbpbl) + parseFloat(baseinfo.hxxxpr); //欠款本金（本金之和贷款余额）
            // let cuse = response.data;
            // this.basicForm.areaCenterName = cuse.areaCenterName; //区域中心名称
            // this.fourShow = true;
            // this.getOrganizerListChange(); //案件承办机构名称列表获取
            // this.jsontimer = new Date().getTime(); //更新jsontimer，重新加载子组件
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
        this.otherInfoForm
      );
      params.spouseInfo = this.tableDataOne;
      return params;
    },

     submit() {

        let params = this.transformData();
      params.servicecode = "pl0528";
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            let msg =  "提交成功";
            this.$msg({
              message: msg,
              type: "success"
            });
             this.$emit("update", {}),
                  (params.appl_id = res.data.appl_id),
                  (params.cust_name = res.data.cust_name),
                  (params.appl_state = res.data.appl_state),
                  (params.appl_date = res.data.appl_date),
                  (params.appId='plOnl'),
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
        });

    //   console.log("basicForm", this.basicForm);
    //   console.log("applyForm", this.applyForm);
    //   console.log("debtForm", this.debtForm);
      
    //   console.log("12321321321",this.applyForm.ticketAccessory)
    //   this.organizerNameList.forEach(item => {
    //     if (this.debtForm.organizerNo === item.entrorg) {
    //       this.debtForm.organizerName = item.entrorgnm;
    //     }
    //   })
    //   this.validateList = [];
    //   const formList = ["applyForm", "basicForm", "debtForm"];
    //   formList.forEach((item) => {
    //     this.validateList.push(validateHandle(item, this));
    //   });
    //   console.log("this.validateList", this.validateList)
    //   Promise.all(this.validateList)
    //     .then((res) => {
    //       let params = {
    //         servicecode: "RLMSPLTS1381",
    //         // 基础信息
    //         lncfno: this.basicForm.lncfno, //借据号
    //         acctNa: this.basicForm.acctNa, //客户名称
    //         idtfno: this.basicForm.idtfno, //证件号码
    //         phoneNo: this.basicForm.phoneNo, //手机号码
    //         prodNa: this.basicForm.prodNa, //产品名称
    //         areacenter: this.basicForm.areacenter, //区域中心
    //         clssst: this.basicForm.clssst, //贷款形态
    //         ovdays: this.basicForm.accountAge, //逾期天数
    //         unitedloan: this.basicForm.unitedloan, //是否联合贷
    //         unitedloanCompany: this.basicForm.unitedloanCompany, //联合贷公司名称
    //         nowvorgnm: this.basicForm.commissionOrg, //当前委案机构
    //         commissionOrg: this.basicForm.nowvorg, //当前委案机构编号
    //         entrustStatus: this.basicForm.commissionStatus, //当前案件委案状态
    //         suitStatus: this.basicForm.comlawsuitStatus, //当前案件诉讼状态
    //         // principalArrears: this.basicForm.loanbit, //欠款本金
    //         custid: this.basicForm.custid, //客户id
    //         islgfe: this.basicForm.islgfe, //是否法诉
            
    //         // 申请信息
    //         hdltri: this.debtForm.acceptType, //审判类型
    //         // udtmcn: this.debtForm.organizerNo, //承办机构
    //         udtmna: this.debtForm.organizerName, //承办机构名称
    //         caacce: this.debtForm.acceptOrgType, //案件受理机构类型
    //         udtaog: this.debtForm.acceptOrgName, //案件受理机构
    //         caprty: this.debtForm.caseProType, //案件程序类型
    //         caspro: this.debtForm.judpro, //案件程序
    //         incutm: this.debtForm.courdDate, //录入开庭时间
    //         intrno: this.debtForm.implementNo, //录入审判案号
    //         carest: this.debtForm.litigOutcome, //案件结果
    //         wncaam: this.debtForm.inTheAmount, //胜诉金额
    //         dcmety: this.debtForm.writType, //文书类型
    //         signtm: this.debtForm.documentsDate, //文书落款日期
    //         apelat: this.debtForm.prosecution, //上诉方
    //         acptsr: this.debtForm.seq, //流水号

    //         remark: this.applyForm.applyRemark, //备注
    //         ticketList: this.applyForm.ticketAccessory, //文件信息
    //       };
    //       MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
    //         .then((res) => {
    //           if (res && res.code === "200") {
    //             this.$message({
    //               type: "success",
    //               message: res.message,
    //             });
    //             this.fourShow = false;
    //             this.cleartableinfo();
    //           }
    //         })
    //         .catch((err) => {
    //           console.error(err);
    //         });
    //     })
    //     .catch((err) => {
    //       this.$message({
    //         type: "warning",
    //         message: "校验不通过",
    //       });
    //     });
    },
    cleartableinfo() {
      this.basicForm.acctNa = ""; //客户名称
      this.basicForm.idtfno = ""; //证件号码
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
      this.basicForm.islgfe = "";
      
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
    },
    ticketAccessoryValidate(value, rule, callback) {
      if (this.applyForm.ticketAccessory.length === 0) {
        return callback(new Error("请上传附件"));
      }
      return callback();
    },
    /**
     * 胜诉金额触发校验
     * @param val 当前胜诉金额
     */
    inTheAmountChange(val) {
      if (parseFloat(val) < 0 || parseFloat(val) === 0) {
        this.$message({
          type: "warning",
          message: "胜诉金额必须大于0！"
        })
        this.debtForm.inTheAmount = null;
      }else if (this.debtForm.inTheAmount === "") {
        this.debtForm.inTheAmount = null;
      }else if (parseFloat(this.nubFormat(parseFloat(val),2)) === 0) {
        this.debtForm.inTheAmount = null;
      }
      else {
        this.debtForm.inTheAmount = this.nubFormat(parseFloat(this.debtForm.inTheAmount),2);
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
     * 案件程序类型点击触发
     */
    caseProTypeChange(val) {
      this.judproList = [];
      this.debtForm.judpro = "1";
      console.log("qqqqqqq")
      if(val === "2"){
        this.judproList = this.lawDictList;
      }else if(val === "4") {
        this.judproList = this.accountDictList;
      }else {
        this.judproList = this.arbitDictList;
      }
    },
    /**
     * 案件程序触发
     */
    judproChange() {
      if (this.debtForm.caseProType === "") {
        this.$message({
          type: "warning",
          message: "请先选择案件程序类型",
        })
        this.debtForm.judpro = "";
      }else {
        if(this.debtForm.caseProType === "2"){
          this.judproList = this.lawDictList;
        }else if(this.debtForm.caseProType === "4") {
          this.judproList = this.accountDictList;
        }else if(this.debtForm.caseProType === "3") {
          this.judproList = this.arbitDictList;
        }
      }
    },
    /**
     * 获取案件承办机构名称列表
     */
    getOrganizerListChange() {
        let params = {
          servicecode: 'RLMSPLTS1237',
          lncfno: this.basicForm.lncfno, //借据号
          areaCenter: this.basicForm.areacenter, //区域中心
          // entrorgtype: "", 
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then( res=> {
          if (res && res.code === '200' && res.data) {
            this.organizerNameList = res.data;
          }
        }).catch(err => {
          console.error(err)
        })
     },
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
     }
  }
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
.custom-common--form {
  .input-form {
    border: 1px solid #e4e7ed;
    padding: 20px 18px 0px 0px;
  }
}
.container-theme {
  white-space: nowrap;
}
</style>
