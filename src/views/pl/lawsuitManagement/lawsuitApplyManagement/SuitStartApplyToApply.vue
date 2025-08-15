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
            <el-col :span="6">
              <el-form-item label="人行征信" >
                <el-button type="primary" size="small" @click="showReport">人行征信</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="border-Line" v-show="fasle">
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
      <el-collapse-item name="3">
        <template slot="title">
          <span>
            <em></em>申请信息
          </span>
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
              <el-form-item label="诉讼主因" prop="suitReason">
                <el-select v-model="applyForm.suitReason" placeholder  :disabled="true">
                  <el-option
                    v-for="(item, i) in suitReasonList"
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
      <el-button type="primary" size="small" @click="checkAll('submit')" :disabled="sfPressbut">提交</el-button>
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
  name: "SuitStartApplyToApply",
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
        idtfno: "",
        prodna: "",
        prodcd: "",
        applid: "",
        phonno: "",
        clssst: "",
        areaCenter: "",
        areaCenterName: "",
        accoutage: "",
        isunitln: "",
        unitname: "",
        islgfe: "",
        debtpr: ""
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
        usefee: "", //动用费
        leglfee: "", //法诉费
        wolgfe: "", //核销法诉费
        yslgfe: "" //未核销法诉费
      },
      applyForm: {
        suitReason: "",
        remark: ""
      },
      otherInfoForm: {
        rpacno: "", //默认退还账号
        derana: "", //默认退还账户户名
        rpacbr: "", //默认退还账户行号
        atbkna: "", //退还账户开户行名称
        atbkpr: "", //退还账户开户行所在省
        atbkci: "", //退还账户开户行所在市
        handcityid: "", //受理城市编号
        handcitynm: "" //受理城市名称
      },
      rules: {
        lncfno: [{ required: true, message: "请输入借据号" }],
        suitReason: [
          {
            required: true,
            message: "请选择诉讼主因"
          }
        ],
        remark: [
          {
            required: false,
            validator: (rule, value, callback) => {
              const reg = /^\s*$/;
              if (reg.test(value) && this.rules.remark[0].required == true) {
                callback(new Error("请填写备注,不超过200字"));
              }
              return callback();
            },
            trigger: "change"
          }
        ]
      },

      /* ---------字典数组----------------------*/
      clssstList: [], //贷款状态字典列表
      yesnoList: [], //是否列表
      suitReasonList: [], //诉讼主因列表
      entruststusList: [],
      suit_statusList: [],
      /* ---------表单列表数组----------------------*/
      tableDataOne: [],
      tableDataTwo: [],
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
      maxbenj: "", //本金
      pickerOptions: {}, //可选日期控件配置
      personPayshow: false //个人账户退还方式显示控制
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
    this.getDictList("PL_E_SUITREASON", "suitReasonList"); //清算模式
    this.getDictList("E_ENTRUSTSTUS", "entruststusList"); //委案状态字典
    this.getDictList("E_SUITSTUS", "suit_statusList"); //案件诉讼状态字典
  },

  methods: {
    /*=========================================页面调用方法start====================================== */
    /**
     *借据号失焦初始化查询
     *
     */
    InitialWhenBlur() {
     
      this.lncfnoLocal = this.basicForm.loan_no; // 记录借据号
      // 清空上次查询信息
      this.clearHistory();
      
      // 获取初始化的基础信息和欠款信息
      this.getInitialInfo();
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
      getrpymtAmt() {
      var _this = this; //很重要！！
      let params = {
        servicecode: "pl0502",
        apply_no: this.cParentParams.appl_id,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this.applyForm.suitReason = res.data.suitReason;
            this.applyForm.remark = res.data.remark;
            //_this.appForm.manu_five_clasf = res.data.artificial_five_clasf_tp;
           // _this.appForm.remark = res.data.remark;


          }
        })
        .catch((err) => {
          console.error(err);
        });
      },
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
       //     this.basicForm.isunitln = data.isunitln;
            this.basicForm.unitname = data.unitname;
            this.basicForm.entrust_status = data.entrust_status;
            this.basicForm.suit_status = data.suit_status;
            this.basicForm.nowvorg = data.nowvorg;
            this.basicForm.islgfe = data.islgfe;
            this.basicForm.debtpr = data.debtpr;

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






            // 2.财务信息
            this.debtInfoForm.acctno = data.loan_acct_num; //贷款账号
            //this.debtInfoForm.lnream = data.lnream; //逾期金额
            //this.debtInfoForm.lnrebl = data.lnrebl; //贷款余额
            this.debtInfoForm.clssst = data.loan_form; //贷款状态
            //this.debtInfoForm.ovdays = data.ovdays; //逾期天数
            this.debtInfoForm.lnnpbl = data.nrl_prcpl; //正常本金
            this.debtInfoForm.lnopbl = data.ovdue_prcpl; //逾期本金
            this.debtInfoForm.lndpbl = data.stgnt_prcpl; //呆滞本金
            this.debtInfoForm.hxxxpr = data.chk_write_off_prcpl; //核销本金
            this.debtInfoForm.retuin =data.rcvbl_acd_int; //正常利息
            this.debtInfoForm.overfee = data.overfee; //逾期利息
            this.debtInfoForm.penalfee = data.penalfee; //罚息
            this.debtInfoForm.issett = data.issett; //是否允许提前结清
            this.debtInfoForm.ispart = data.ispart; //是否允许提前部分还款
            this.debtInfoForm.rpacno = data.rpacno; //银行卡号
            this.debtInfoForm.atbkna = data.atbkna; //退还账户开户行名称
            this.debtInfoForm.usefee = data.usefee
              ? this.nubFormat(data.usefee, 2)
              : "0.00"; //动用费,默认0
            this.debtInfoForm.yslgfe = data.yslgfe; //未核销法诉费
            this.debtInfoForm.wolgfe = data.wolgfe; //核销法诉费
            this.debtInfoForm.leglfee = this.nubFormat(
              parseFloat(data.wolgfe) + parseFloat(data.yslgfe),
              2
            ); //法诉费
            //账户信息
            this.otherInfoForm.rpacno = data.rpacno; //默认退还账号
            this.otherInfoForm.derana = data.derana; //默认退还账户户名
            this.otherInfoForm.rpacbr = data.rpacbr; //默认退还账户行号
            this.otherInfoForm.atbkna = data.atbkna; //退还账户开户行名称
            this.otherInfoForm.atbkpr = data.atbkpr; //退还账户开户行所在省
            this.otherInfoForm.atbkci = data.atbkci; //退还账户开户行所在市
            this.otherInfoForm.handcitynm = data.handcitynm; //受理城市名称
            this.otherInfoForm.handcityid = data.handcityid; //受理城市编号

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
      //   servicecode: "RLMSPLTS1239",
      //   lncfno: this.lncfnoLocal
      // };
      // MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(
      //   res => {
      //     if (res && res.code === "200" && res.data) {
      //       let data = res.data.applyInfo;
      //       // 3.申请信息
      //       this.basicForm.applid = data.applid;
      //       this.applyForm.suitReason = data.suitReason ? data.suitReason : "";
      //       this.applyForm.remark = data.remark;
      //       this.tableDataTwo = data.collRecordInfo;
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
      //       //6.备注是否为必输
      //       if (this.tableDataTwo.length === 0) {
      //         this.rules.remark[0].required = true;
      //       }
      //     }
      //   }
      // );
    },
    /**
     *获取配偶信息
     *
     */
    getSpouseInfo(val) {



      //  let params = {
      //   servicecode: "RLMSPLTS1239",
      //   lncfno: this.lncfnoLocal
      // };
      // MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(
      //   res => {
      //     if (res && res.code === "200" && res.data) {
      //       let data = res.data;
      //       let params = {
      //         cust_name: data.cust_name,
      //         cust_no: data.cust_no,
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
      this.basicForm.cust_name = "";
      this.basicForm.cust_no = "";
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
      this.basicForm.entrust_status = "";
      this.basicForm.suit_status = "";
      this.basicForm.nowvorg = "";
      this.basicForm.islgfe = "";
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
      this.debtInfoForm.leglfee = "";
      this.debtInfoForm.wolgfe = "";
      this.debtInfoForm.yslgfe = "";
      this.otherInfoForm.rpacno = "";
      this.otherInfoForm.derana = "";
      this.otherInfoForm.rpacbr = "";
      this.otherInfoForm.atbkna = "";
      this.otherInfoForm.atbkpr = "";
      this.otherInfoForm.atbkci = "";
      this.otherInfoForm.handcitynm = "";
      this.otherInfoForm.handcityid = "";
      this.clearRepayHis();
    },
    /**
     *清除申请信息缓存
     *
     */
    clearRepayHis() {
      this.applyForm.suitReason = "";
      this.applyForm.remark = "";
      this.tableDataOne = [];
      this.tableDataTwo = [];
      this.rules.remark[0].required = false;
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
         let _this=this;
      _this.adjustForm.cust_no=_this.basicForm.cust_no;
      _this.adjustForm.cust_name=_this.basicForm.cust_name;
      _this.adjustForm.loan_no=_this.basicForm.loan_no;
      _this.adjustForm.prod_name=_this.basicForm.prodna;
      _this.adjustForm.prod_no=_this.basicForm.prodcd;
      _this.adjustForm.loan_form=_this.basicForm.clssst;
      _this.adjustForm.suitReason=_this.applyForm.suitReason;
      _this.adjustForm.remark=_this.applyForm.remark;

      let params = _this.adjustForm;
  
      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then(res => {
          if (res && res.code === "200") {
            this.$message({
              type: "success",
              message: res.message
            });
            this.pageRestore();
          }
        })
        .catch(err => {
          console.error(err);
        })
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
    /*=========================================服务实现end====================================== */
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
    // 欠款本金及动用费用校验提示
    checkUsefee() {
      if (
        parseFloat(this.basicForm.debtpr) -
          parseFloat(this.debtInfoForm.usefee) <=
        0
      ) {
        this.$message({
          type: "warning",
          message: "当前客户欠款本金减去动用费小于等于0，无法申请！"
        });
        return false;
      }
      return true;
    },
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
</style>