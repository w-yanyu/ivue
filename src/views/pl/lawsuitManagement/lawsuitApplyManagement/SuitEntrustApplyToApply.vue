<template>
  <div>
    <el-collapse v-model="activeNames" class="custom-common--collapse">
      <el-collapse-item name="1">
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
                  @blur="InitialWhenBlur"
                  @keyup.enter.native="InitialWhenBlur"
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
          <div class="border-Line" v-show="false">
            <div class="table-title">配偶信息</div>
            <el-row class="caSeq-table">
              <el-table :data="tableDataOne">
                <el-table-column label="姓名" align="center" prop="acctna"></el-table-column>
                <el-table-column label="借据号" align="center" prop="lncfno"></el-table-column>
                <el-table-column
                  label="贷款状态"
                  align="center"
                  prop="clssst"
                  :formatter="transferData"
                ></el-table-column>
                <el-table-column
                  label="是否诉讼"
                  align="center"
                  prop="islgfe"
                  :formatter="transferData"
                ></el-table-column>
                <el-table-column label="当前委案机构" align="center" prop="nowvorgnm"></el-table-column>
                <el-table-column
                  label="当前案件委案状态"
                  align="center"
                  prop="entrust_status"
                  :formatter="transferData"
                ></el-table-column>
                <el-table-column
                  label="当前案件诉讼状态"
                  align="center"
                  prop="suit_status"
                  :formatter="transferData"
                ></el-table-column>
              </el-table>
            </el-row>
          </div>
        </el-form>
      </el-collapse-item>
              <el-collapse-item name="2">
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

      <el-collapse-item name="2">
        <template slot="title">
          <span>
            <em></em>申请信息
          </span>
          <div class="warn-class">提示：诉讼委案后，贷款将强制到期，且不可逆！</div>
        </template>
        <el-form
          ref="applyForm"
          :rules="rules"
          :model="applyForm"
          label-width="160px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="诉讼地" prop="forum_willmigerl">
                <el-select v-model="applyForm.forum_willmigerl" placeholder :disabled="true">
                  <el-option
                    v-for="(item, i) in suitsiteList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId"
                    
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="7">
              <el-form-item label="机构类型" prop="entrorg_type">
                <el-select v-model="applyForm.entrorg_type" placeholder :disabled="true">
                  <el-option
                    v-for="(item, i) in entrorgtypeList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId"
                    
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="委案机构" prop="entrorg_name">
                <el-select @click.native="selEntrorg" v-model="applyForm.entrorg_name" placeholder :disabled="true">
                  <el-option
                    v-for="(item, i) in entrorgList"
                    :key="i"
                    :label="item.branch_name"
                    :value="item.branch_id"
                    
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="费用结算模式" prop="clen_mode">
                <el-select v-model="applyForm.clen_mode" placeholder clearable :disabled="true">
                  <el-option
                    v-for="(item, i) in clenmodeList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId"
                    
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="14">
              <el-form-item :label="$i18ns('备注')" prop="remark">
                <el-input
                  type="textarea"
                  v-model="applyForm.remark"
                  :rows="4"
                  maxlength="200"
                  placeholder="请填写备注，不超过200字"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <choose-account-lookup
            :show-dialog="showLookup"
            @select="lookSelect"
            @close="lookClose"
            v-if="showLookup"
          />
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <div class="custom-common--footer" v-show="false">
      <!-- <el-button type="primary" size="small" @click="checkAll('save')" :disabled="sfPressbut">{{$i18ns('保存')}}</el-button> -->
      <el-button type="primary" size="small" @click="checkAll('submit')" :disabled="sfPressbut" >提交</el-button>
      <el-button @click="reset" size="small">{{$i18ns('重置')}}</el-button>
      <!-- <el-button size="small" @click="cancelApply">{{$i18ns('取消')}}</el-button> -->
    </div>
    <!-- 人行征信 -->
    <credit-report-info
      :show-dialog="showCreditInfo"
      :cardno="basicForm.idtfno"
      @creditClose="showClose"
      v-if="showCreditInfo"
    />
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import MultipleUploadVue from "COM/MultipleUploadVue";
import CreditReportInfo from "@/views/other/loanPostManager/loanPostComponents/CreditReportInfo";
import _ from "lodash";
export default {
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object // 父页面自定义参数与内置参数
  },
  name: "SuitEntrustApplyToApply",
  components: {
    MultipleUploadVue,
    CreditReportInfo
  },
  data() {
    return {
      activeNames: ["1", "2", "3"],
      basicForm: {
        loan_no: "",
        cust_name: "",
        cust_no: "",
        lncfno: "",
        acctna: "",
        custno: "",
        idtfno: "",
        prodna: "",
        prodcd: "",
        applid: "",
        phonno: "",
        clssst: "",
        jqstus: "",
        hxstus: "",
        ovdays: "",
        debtpr: "",
        areaCenter: "",
        areaCenterName: "",
        accoutage: "",
        isunitln: "",
        unitname: "",
        islgfe: "",
        entrust_status: "",
        suit_status: "",
        nowvorg: ""
      },
      debtInfoForm: {
        acctno: "", //贷款账号
        lnream: "", //逾期金额
        lnrebl: "", //贷款余额
        clssst: "", //贷款状态
        ovdays: "", //逾期天数
        lnnpbl: "", //正常本金
        lnopbl: "", //逾期本金
        lndpbl: "", //呆滞本金
        hxxxpr: "", //核销本金
        retuin: "", //正常利息，
        overfee: "", //逾期利息
        penalfee: "", //罚息
        issett: "", //允许提前结清
        ispart: "", //允许提前部分还款
        rpacno: "", //银行卡号
        atbkna: "", //退还账户开户行名称
        usefee: "" //动用费
      },
      applyForm: {
        forum_willmigerl: "",
        entrorg_type: "",
        entrorg: "",
        clen_mode: "",
        remark: ""
      },
      otherInfoForm: {
        rpacno: "", //默认退还账号
        derana: "", //默认退还账户户名
        rpacbr: "", //默认退还账户行号
        atbkna: "", //退还账户开户行名称
        atbkpr: "", //退还账户开户行所在省
        atbkci: "", //退还账户开户行所在市
        retnstus: "" //申请状态
      },
      rules: {
        lncfno: [{ required: true, message: "请输入借据号" }],
        suitsite: [
          {
            required: true,
            message: "请选择诉讼地",
            trigger: "change"
          }
        ],
        entrorgtype: [
          {
            required: true,
            message: "请选择机构类型",
            trigger: "change"
          }
        ],
        entrorg: [
          {
            required: true,
            message: "请选择委案机构",
            trigger: "change"
          }
        ],
        remark: [{ required: false, message: "请填写备注,不超过200字" }]
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
      /* ---------字典数组----------------------*/
      clssstList: [], //贷款状态字典列表
      yesnoList: [], //是否列表
      clenmodeList: [], //费用结算模式
      entrorgtypeList: [], //机构类型列表
      suitsiteList: [], //诉讼地列表
      entrorgList: [], //委案机构类型
      entruststusList: [],
      suit_statusList: [],
      jqstusList: [],
      hxstusList: [],
      /* ---------表单列表数组----------------------*/
      tableDataOne: [],
      /* ---------附件上传控制------------------------*/
      formKeyList: [""], //附件key
      fileStatuList: [false], //附件上传状态
      formLabelList: [""], //附件中文名称
      ifRequire: [true], //附件是否必传
      warning: [false], //附件未上传是否警告
      pubretnacc: [], //上传公账退还证明材料信息
      errorTimes: [0, 0], //校验附件是否上传报警次数
      fileNameList: [[]], //返显上传文件的名字
      ifshowAttach: false, //是否显示身份证等四个附件
      /* ---------页面初始化控制字段------------------------*/
      isFirstIn: true, //判断是否是第一次进入页面
      unWatch: [],
      /* ---------人行征信控制字段------------------------*/
      showCreditInfo: false, // 人行征信弹出框显示/隐藏控制
      /* ---------其他------------------------*/
      sfPressbut: false, //保存提交按钮是否禁用
      maxbenj: "" //本金
    };
  },
  created() {

      this.basicForm.loan_no = this.cParentParams.reserve1;

      if(this.basicForm.loan_no!="" && this.basicForm.loan_no!=undefined){
        this.InitialWhenBlur();
      }
      this.getrpymtAmt();

  },
  mounted() {
    this.getDictList("MS_E_LEVEL5_TYPE", "clssstList"); //贷款状态字典
    this.getDictList("E_YES___", "yesnoList"); //是否字典
    this.getDictList("PL_E_CLENMODE", "clenmodeList"); //清算模式
    this.getDictList("PL_E_ORGTYPES", "entrorgtypeList"); //机构类型
    this.getDictList("PL_E_SUITSITE", "suitsiteList"); //诉讼地
    this.getDictList("E_ENTRUSTSTUS", "entruststusList"); //委案状态字典
    this.getDictList("E_SUITSTUS", "suit_statusList"); //案件诉讼状态字典
    this.getDictList("E_JQSTUS", "jqstusList"); //结清状态字典
    this.getDictList("E_HXSTUS", "hxstusList"); //核销状态字典
    this.getEntrorgList(
      JSON.parse(localStorage.getItem("user_info")).branchSeq.split(".")[2]
    ); //获取委案机构列表
  },

  methods: {
    /*=========================================页面调用方法start====================================== */
    /**
     *借据号失焦初始化查询
     *
     */
    InitialWhenBlur() {
      // if (!this.basicForm.lncfno) {
      //   return false;
      // }
      this.lncfnoLocal = this.basicForm.loan_no; // 记录借据号
      // 清空上次查询信息
      this.clearHistory();
      // 获取初始化的基础信息和欠款信息
      this.getInitialInfo();
    },


    getrpymtAmt() {
    var _this = this; //很重要！！
    let params = {
      servicecode: "pl0504",
      apply_no: this.cParentParams.appl_id,
    };
    MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then((res) => {
        if (res && res.code === "200") {
          this.applyForm.forum_willmigerl = res.data.forum_willmigerl;
          this.applyForm.entrorg_type = res.data.entrorg_type;
          this.applyForm.entrorg = res.data.entrorg;
          this.applyForm.entrorg_name = res.data.entrorg_name;
          this.applyForm.clen_mode = res.data.clen_mode;
          this.applyForm.entr_time = res.data.entr_time;
          this.applyForm.entr_amt = res.data.entr_amt;
          this.applyForm.remark = res.data.remark;

          //_this.appForm.manu_five_clasf = res.data.artificial_five_clasf_tp;
          // _this.appForm.remark = res.data.remark;


        }
      })
      .catch((err) => {
        console.error(err);
      });
    },
    /**
     * 人行征信查询
     */
    showReport() {
      if (this.basicForm.idtfno === "") {
        this.$message({
          type: "warning",
          message: "请先输入身份证号信息"
        });
        return;
      }
      this.showCreditInfo = true;
    },
    showClose() {
      this.showCreditInfo = false;
    },
    /*=========================================页面调用方法end====================================== */
    /*=========================================服务实现类start====================================== */
    /**
     *获取初始化借据和申请信息
     *
     */
    getInitialInfo() {
      let params = {
        servicecode: "ln3100",
        loan_due_bill_num: this.basicForm.loan_no,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(
        res => {
          if (res && res.code === "200" && res.data) {
            let data = res.data;
            //1.基本信息

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
            // 2.财务信息
            this.debtInfoForm.acctno = data.lncfno; //贷款账号
            this.debtInfoForm.lnream = data.lnream; //逾期金额
            this.debtInfoForm.lnrebl = data.lnrebl; //贷款余额
            this.debtInfoForm.clssst = data.clssst; //贷款状态
            this.debtInfoForm.ovdays = data.ovdays; //逾期天数
            this.debtInfoForm.lnnpbl = data.lnnpbl; //正常本金
            this.debtInfoForm.lnopbl = data.lnopbl; //逾期本金
            this.debtInfoForm.lndpbl = data.lndpbl; //呆滞本金
            this.debtInfoForm.hxxxpr = data.hxxxpr; //核销本金
            this.debtInfoForm.retuin = this.nubFormat(data.retuin, 2); //正常利息
            this.debtInfoForm.overfee = data.overfee; //逾期利息
            this.debtInfoForm.penalfee = data.penalfee; //罚息
            this.debtInfoForm.issett = data.issett; //是否允许提前结清
            this.debtInfoForm.ispart = data.ispart; //是否允许提前部分还款
            this.debtInfoForm.rpacno = data.rpacno; //银行卡号
            this.debtInfoForm.atbkna = data.atbkna; //退还账户开户行名称
            this.debtInfoForm.usefee = data.usefee ? data.usefee : "0.00"; //动用费,默认0
            this.getEntrorgList(this.basicForm.areaCenter);

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


            //账户信息
            this.otherInfoForm.rpacno = data.rpacno; //默认退还账号
            this.otherInfoForm.derana = data.derana; //默认退还账户户名
            this.otherInfoForm.rpacbr = data.rpacbr; //默认退还账户行号
            this.otherInfoForm.atbkna = data.atbkna; //退还账户开户行名称
            this.otherInfoForm.atbkpr = data.atbkpr; //退还账户开户行所在省
            this.otherInfoForm.atbkci = data.atbkci; //退还账户开户行所在市
            //获取欠款本金
            this.maxbenj = Math.max.apply(null, [
              parseFloat(data.lnnpbl),
              parseFloat(data.lnopbl),
              parseFloat(data.lndpbl),
              parseFloat(data.hxxxpr)
            ]);
            this.getApplyInfo();
          }
        }
      );
    },
    /**
     *获取初始化借据和申请信息
     *
     */
    getApplyInfo() {
      // let params = {
      //   servicecode: "RLMSPLTS1242",
      //   lncfno: this.lncfnoLocal
      // };
      // MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(
      //   res => {
      //     if (res && res.code === "200" && res.data) {
      //       let data = res.data.applyInfo;
      //       // 3.申请信息
      //       this.basicForm.applid = data.applid;
      //       this.applyForm.suitsite = data.suitsite ? data.suitsite : "";
      //       this.applyForm.entrorgtype = data.entrorgtype
      //         ? data.entrorgtype
      //         : "";
      //       this.applyForm.entrorg = data.entrorg;
      //       this.applyForm.entrorgnm = data.entrorgnm;
      //       this.applyForm.clenmode = data.clenmode;
      //       this.applyForm.remark = data.remark;
      //       if (
      //         null != data.spouseInfo[0].lncfno &&
      //         "" != data.spouseInfo[0].lncfno
      //       ) {
      //         this.getSpouseInfo(data.spouseInfo[0].lncfno);
      //       }
      //       // 4.保存提交按钮是否禁用,提交后不可选用
      //       this.sfPressbut = data.apply_status
      //         ? data.apply_status === "3"
      //           ? false
      //           : true
      //         : false;
      //       //5.动用费及欠款本金校验，提交后不再校验
      //       if (!this.sfPressbut) {
      //         this.checkUsefee();
      //         this.checkMaxbenj();
      //       }
      //       //6.添加监听
      //       this.addWatch();
      //       //7.获取区域中心下机构列表
      //       this.getEntrorgList(this.basicForm.areaCenter);
      //       //获取区域中心机构类型下委案机构列表
      //     }
      //   }
      // );
    },
    /**
     *获取配偶信息
     *
     */
    getSpouseInfo(val) {
      // let params = {
      //   servicecode: "RLMSPLTS1234",
      //   lncfno: val
      // };
      // MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(
      //   res => {
      //     if (res && res.code === "200" && res.data) {
      //       let data = res.data;
      //       let params = {
      //         acctna: data.acctna,
      //         lncfno: data.lncfno,
      //         clssst: data.clssst,
      //         islgfe: data.islgfe,
      //         nowvorgnm: data.nowvorgnm,
      //         entrust_status: data.entrust_status,
      //         suit_status: data.suit_status
      //       };
      //       this.tableDataOne = [params];
      //     }
      //   }
      // );
    },
    /**
     *清除历史缓存数据
     *
     */
    clearHistory() {
      this.basicForm.acctna = "";
      this.basicForm.custno = "";
      this.basicForm.idtfno = "";
      this.basicForm.prodna = "";
      this.basicForm.prodcd = "";
      this.basicForm.applid = "";
      this.basicForm.phonno = "";
      this.basicForm.clssst = "";
      this.basicForm.areaCenter = "";
      this.basicForm.areaCenterName = "";
      this.basicForm.accoutage = "";
      this.basicForm.isunitln = "";
      this.basicForm.unitname = "";
      this.basicForm.islgfe = "";
      this.basicForm.entrust_status = "";
      this.basicForm.suit_status = "";
      this.basicForm.nowvorg = "";
      this.basicForm.jqstus = "";
      this.basicForm.hxstus = "";
      this.basicForm.ovdays = "";
      this.basicForm.debtpr = "";
      this.debtInfoForm.acctno = "";
      this.debtInfoForm.lnream = "";
      this.debtInfoForm.lnrebl = "";
      this.debtInfoForm.clssst = "";
      this.debtInfoForm.ovdays = "";
      this.debtInfoForm.lnnpbl = "";
      this.debtInfoForm.lnopbl = "";
      this.debtInfoForm.lndpbl = "";
      this.debtInfoForm.hxxxpr = "";
      this.debtInfoForm.retuin = "";
      this.debtInfoForm.overfee = "";
      this.debtInfoForm.penalfee = "";
      this.debtInfoForm.issett = "";
      this.debtInfoForm.ispart = "";
      this.debtInfoForm.rpacno = "";
      this.debtInfoForm.atbkna = "";
      this.debtInfoForm.usefee = "";
      this.otherInfoForm.rpacno = "";
      this.otherInfoForm.derana = "";
      this.otherInfoForm.rpacbr = "";
      this.otherInfoForm.atbkna = "";
      this.otherInfoForm.atbkpr = "";
      this.otherInfoForm.atbkci = "";
      this.applyForm.suitsite = "";
      this.applyForm.entrorgtype = "";
      this.applyForm.entrorg = "";
      this.applyForm.entrorgnm = "";
      this.applyForm.clenmode = "";
      this.applyForm.remark = "";
      this.tableDataOne = [];
      this.$nextTick(() => {
        this.$refs.applyForm.clearValidate();
        this.$refs.basicForm.clearValidate();
      });
    },

    /**
     *数据转换
     *
     */
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
    /**
     *提交表单数据
     *
     */
    submitData(operation) {
      console.log(operation);
      let params = this.transformData();
      params.servicecode = operation == "submit" ? "pl0503" : "";
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            let msg = operation == "submit" ? "提交成功" : "";
            this.$msg({
              message: msg,
              type: "success"
            });
            this.basicForm.lncfno = "";
            this.clearHistory(); //清空信息
          }
        })
        .catch(err => {
          console.error(err);
        });
    },

    /**
     *获取上传附件状态路径信息
     *
     */
    getFileInfo(singleFile, operation) {
      for (var i = 0; i < this.formKeyList.length; i++) {
        if (this.formKeyList[i] === singleFile.attkey) {
          if (operation === "add") {
            switch (i) {
              case 0:
                this.pubretnacc.push(singleFile);
                break;
            }
            this.$set(this.fileStatuList, i, true);
          } else {
            switch (i) {
              case 0:
                this.deleteFile(i, this.pubretnacc, singleFile.atturl);
                break;
            }
          }
        }
      }
    },
    deleteFile(i, arr, atturl) {
      arr.forEach(item => {
        if (item.atturl === atturl) {
          var index = arr.indexOf(item);
          arr.splice(index, 1);
        }
      });
      if (arr.length === 0) {
        this.$set(this.fileStatuList, i, false);
      }
    },
    /*
     *添加监听
     *
     */
    addWatch() {
      this.unWatch.push(
        this.$watch(
          "applyForm.entrorgtype",
          function() {
            this.entrorgtype();
          },
          { deep: true }
        )
      );
      this.unWatch.push(
        this.$watch(
          "applyForm.entrorg",
          function() {
            this.entrorg();
          },
          { deep: true }
        )
      );
    },
    /*=========================================服务实现end====================================== */
    /*=========================================监听实现start====================================== */
    entrorgtype() {
      this.applyForm.entrorg = "";
      this.applyForm.entrorgnm = "";
    },
    entrorg() {
      this.entrorgList.forEach(item => {
        if (item.entrorg == this.applyForm.entrorg)
          this.applyForm.entrorgnm = item.entrorgnm;
      });
    },
    selEntrorg() {
      let areaCenter = this.basicForm.areaCenter
        ? this.basicForm.areaCenter
        : JSON.parse(localStorage.getItem("user_info")).branchSeq.split(".")[2];
      this.getEntrorgList(areaCenter, this.applyForm.entrorgtype);
    },
    /*=========================================监听实现end====================================== */
    /*=========================================校验类方法start====================================== */
    /**
     *保存表单数据校验
     *
     */
    checkAll(val) {
      //校验顺序：借据号------表单其他字段
      //1.校验借据号是否填写
      this.$refs.basicForm.validate(valid => {
        console.log(valid);
        if (!valid) {
          this.$message({
            type: "warning",
            message: "校验不通过（请输入借据号）"
          });
          return;
        }
        //2.校验表单必须输入项是否填写
        this.$refs.applyForm.validate(valid => {
          if (valid) {
            if (this.checkUsefee()) {
              this.$confirm("是否确认提交申请?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }).then(() => {
                this.submitData(val);
              });
            }
          } else {
            this.$message({
              type: "warning",
              message: "校验不通过"
            });
            return;
          }
        });
      });
    },
    // 委案金额动用费用校验提示
    checkUsefee() {
      if (
        parseFloat(this.debtInfoForm.lnrebl) -
          parseFloat(this.debtInfoForm.usefee) <=
        0
      ) {
        this.$message({
          type: "warning",
          message: "当前客户委案金额(现贷余额-动用费)小于等于0，无法申请！"
        });
        return false;
      }
      return true;
    },
    //欠款本金校验
    checkMaxbenj() {
      if (
        parseFloat(this.basicForm.debtpr) > 0 &&
        parseFloat(this.basicForm.debtpr) < 30000
      ) {
        this.$message({
          type: "warning",
          message: "当前客户欠款本金小于3万，请注意！"
        });
      }
    },

    /*=========================================校验类方法end====================================== */

    /*=========================================工具方法start====================================== */
    /**
     *获取委案机构字典列表
     *
     */
    getEntrorgList(areaCenter, entrorgtype) {
      var params = {
        servicecode: "pl0565",
        areaCenter: areaCenter,
        entrorgtype: entrorgtype,
        mech_status: "YCX" //存续状态
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.entrorgList = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 表格字段值转换
     */
    transferData(row, column) {
      let dist;
      switch (column.property) {
        case "clssst":
          dist = this.clssstList;
          break;
        case "islgfe":
          dist = this.yesnoList;
          break;
        case "entrust_status":
          dist = this.entruststusList;
          break;
        case "suit_status":
          dist = this.suit_statusList;
          break;
      }
      for (let index = 0; index < dist.length; index++) {
        const item = dist[index];
        if (row[column.property] === item.dictId) return item.dictName;
      }
    },

    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let that = this;
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
            return this[listKey];
          }
        })
        .catch(err => {
          console.error(err);
        });
    },

    /**
     * 是否锁定转换
     */
    dattypTranslate(val) {
      for (let index = 0; index < this.dattypList.length; index++) {
        const item = this.dattypList[index];
        if (val === item.dictId) return item.dictName;
      }
    },
    /**
     * 扣款状态转换
     */
    statusTranslate(val) {
      for (let index = 0; index < this.paystatuList.length; index++) {
        const item = this.paystatuList[index];
        if (val === item.dictId) return item.dictName;
      }
    },
    /**
     *重置填写的信息
     *
     */
    reset() {
      this.$refs.applyForm.resetFields();
    },
    /**
     * 多值求和
     */
    sumCalc() {
      let list = [...arguments];
      list = list.map(item => Number(item));
      var s = 0;
      list.forEach(item => (s += item));
      return Number(s).toFixed(2);
    },
    /**
     * 数字格式化成金额
     * @param  金额
     * @param 小数点后面有几位 (四舍五入到指定的位数)
     *
     */
    nubFormat(s, n) {
      n = n > 0 && n <= 20 ? n : 2;
      s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
      var l = s
          .split(".")[0]
          .split("")
          .reverse(),
        r = s.split(".")[1];
      var t = "";
      for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "" : ""); //加分隔符
      }
      return (
        t
          .split("")
          .reverse()
          .join("") +
        "." +
        r
      );
    }
    /*======================================================工具方法end====================================== */
  }
};
</script>
<style lang="less" scoped>
.border-Line {
  // padding: 30px 10px;
  margin: 30px 0px 30px 50px;
  border-top: 1px solid #ced2d6;
  // border-radius: 10px;
  .table-title {
    width: 160px;
    line-height: 20px;
    text-align: center;
    font-size: 13px;
    color: #697b8c;
    margin-top: -10px;
    z-index: 1000;
    margin-left: auto;
    margin-right: auto;
    background: #fff;
  }
  .caSeq-table {
    margin-top: 10px;
  }
}
.warn-class {
  margin-left: 100px;
  // text-align: center;
  font-size: 16px;
  color: #cc1136;
  font-family: "Roboto", Helvetica Neue, Helvetica, Arial, sans-serif;
}
</style>