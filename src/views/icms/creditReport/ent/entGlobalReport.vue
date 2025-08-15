<template>
  <div style="width: 100%; text-align: center" id="print">
    <div class="report-container" v-if="isGotData">
      <div>
        <el-image
          class="icon-image"
          :src="require('@/views/icms/creditReport/征信报告图片.png')"
          fit="contain">
        </el-image>
        <h1>企业征信报告 <br/>（银行版）</h1>
      </div>
      <!--  对公征信身份标识页面-->
      <arbCEffectIdenty :c-parent-params="info.arbCEffectIdentyCom"></arbCEffectIdenty>
      <!--  对公征信信息概要页面-->
      <arbCInfoSum :c-parent-params="info.arbCInfoSumCom"></arbCInfoSum>
      <!--  对公征信未结清信贷及授信信息概要页面-->
      <arbCSumOfLoanAndCreditOut
        :c-parent-params="unionParams('arbCSumOfLoanAndCreditOutCom','arbCDetOfLoanAndCreditOutCom',info.arbCSumOfLoanAndCreditOutCom, info.arbCDetOfLoanAndCreditOutCom)"></arbCSumOfLoanAndCreditOut>
      <!--  对公征信相关还款责任信息概要页面-->
      <arbCRepayLiability :c-parent-params="info.arbCRepayLiabilityCom"></arbCRepayLiability>
      <!--  对公征信已结清信贷信息概要页面-->
      <arbCSumOfLoanSettled
        :c-parent-params="unionParams('arbCSumOfLoanSettledCom','arbCDetOfLoanSettledCom',info.arbCSumOfLoanSettledCom, info.arbCDetOfLoanSettledCom)"></arbCSumOfLoanSettled>
      <!--  对公征信基本概况信息页面-->
      <arbCBaseInfo :c-parent-params="info.arbCBaseInfoCom"></arbCBaseInfo>
      <!--  对公征信注册资本及主要出资人信息页面-->
      <arbCCapitalAndInvestor :c-parent-params="info.arbCCapitalAndInvestorCom"></arbCCapitalAndInvestor>
      <!--  对公征信主要组成人员信息页面-->
      <arbCMainComponent :c-parent-params="info.arbCMainComponentCom"></arbCMainComponent>
      <!--  对公征信上级机构页面-->
      <arbCParentBranch :c-parent-params="info.arbCParentBranchCom"></arbCParentBranch>
      <!--  对公征信实际控制人页面-->
      <arbCActualController :c-parent-params="info.arbCActualControllerCom"></arbCActualController>
      <!--  对公征信被追偿业务页面-->
      <arbCRecoveredBusi :c-parent-params="info.arbCRecoveredBusiCom"></arbCRecoveredBusi>
      <!--  对公征信未结清信贷--欠息页面-->
      <arbCOutInterestOwed :c-parent-params="info.arbCOutInterestOwedCom"></arbCOutInterestOwed>
      <!--  对公征信未结清信贷--中长期借款页面-->
      <arbCOutMAndLTermLoan :c-parent-params="info.arbCOutMAndLTermLoanCom"></arbCOutMAndLTermLoan>
      <!--  对公征信未结清信贷--短期借款页面-->
      <arbCOutShortTermLoan :c-parent-params="info.arbCOutShortTermLoanCom"></arbCOutShortTermLoan>
      <!--  对公征信未结清信贷--循环贷款页面-->
      <arbCOutRevoOverdraft :c-parent-params="info.arbCOutRevoOverdraftCom"></arbCOutRevoOverdraft>
      <!--  对公征信未结清信贷--贴现页面-->
      <arbCOutDiscount :c-parent-params="info.arbCOutDiscountCom"></arbCOutDiscount>
      <!--  对公征信未结清信贷--银行承兑汇票和信用证页面-->
      <arbCOutAcceptAndLetter :c-parent-params="info.arbCOutAcceptAndLetterCom"></arbCOutAcceptAndLetter>
      <!--  对公征信未结清信贷--银行保函及其他业务页面-->
      <arbCOutLetterOfGuar :c-parent-params="info.arbCOutLetterOfGuarCom"></arbCOutLetterOfGuar>
      <!--  对公征信已结清信贷--中长期借款页面-->
      <arbCMAndLTermLoan :c-parent-params="info.arbCMAndLTermLoanCom"></arbCMAndLTermLoan>
      <!--  对公征信已结清信贷--短期借款页面-->
      <arbCShortTermLoan :c-parent-params="info.arbCShortTermLoanCom"></arbCShortTermLoan>
      <!--  对公征信已结清信贷--循环透支页面-->
      <arbCRevoOverdraft :c-parent-params="info.arbCRevoOverdraftCom"></arbCRevoOverdraft>
      <!--  对公征信已结清信贷--贴现页面-->
      <arbCDiscount :c-parent-params="info.arbCDiscountCom"></arbCDiscount>
      <!--  对公征信已结清信贷--银行承兑汇票和信用证页面-->
      <arbCAcceptAndLetter :c-parent-params="info.arbCAcceptAndLetterCom"></arbCAcceptAndLetter>
      <!--  对公征信已结清信贷--银行保函及其他业务页面-->
      <arbCLetterOfGuar :c-parent-params="info.arbCLetterOfGuarCom"></arbCLetterOfGuar>
      <!--  对公征信已结清信贷--相关还款责任--为其他借款人承担的相关还款责任（贴现外其他业务）页面-->
      <arbCRepayDutyOfOther :c-parent-params="info.arbCRepayDutyOfOtherCom"></arbCRepayDutyOfOther>
      <!--  对公征信已结清信贷--相关还款责任--为其他借款人承担的相关还款责任（贴现）页面-->
      <arbCRepayDutyOfDiscount :c-parent-params="info.arbCRepayDutyOfDiscountCom"></arbCRepayDutyOfDiscount>
      <!--  对公征信已结清信贷--相关还款责任--为其他借款人承担的相关还款责任（担保业务）页面-->
      <arbCRepayDutyOfGuar :c-parent-params="info.arbCRepayDutyOfGuarCom"></arbCRepayDutyOfGuar>
      <!--  对公征信公用事业缴费信息页面-->
      <arbCUtilitiesInfo :c-parent-params="info.arbCUtilitiesInfoCom"></arbCUtilitiesInfo>
      <!--  对公征信欠税记录页面-->
      <arbCTaxArrearsRecord :c-parent-params="info.arbCTaxArrearsRecordCom"></arbCTaxArrearsRecord>
      <!--  对公征信民事判决记录页面-->
      <arbCCivilJudgeRecord :c-parent-params="info.arbCCivilJudgeRecordCom"></arbCCivilJudgeRecord>
      <!--  对公征信强制执行记录页面-->
      <arbCEnforcementRecord :c-parent-params="info.arbCEnforcementRecordCom"></arbCEnforcementRecord>
      <!--  对公征信行政处罚记录页面-->
      <arbCPenaltyRecord :c-parent-params="info.arbCPenaltyRecordCom"></arbCPenaltyRecord>
      <!--  对公征信住房公积金缴费记录页面-->
      <arbCHouseProvidRecord :c-parent-params="info.arbCHouseProvidRecordCom"></arbCHouseProvidRecord>
      <!--  对公征信获得许可记录页面-->
      <arbCPermissionRecord :c-parent-params="info.arbCPermissionRecordCom"></arbCPermissionRecord>
      <!--  对公征信获得认证记录页面-->
      <arbCCertificationRecord :c-parent-params="info.arbCCertificationRecordCom"></arbCCertificationRecord>
      <!--  对公征信获得资质记录页面-->
      <arbCQualificationRecord :c-parent-params="info.arbCQualificationRecordCom"></arbCQualificationRecord>
      <!--  对公征信获得奖励记录页面-->
      <arbCRewardRecord :c-parent-params="info.arbCRewardRecordCom"></arbCRewardRecord>
      <!--  对公征信出入境检验检疫绿色通道信息页面-->
      <arbCGreenChannel :c-parent-params="info.arbCGreenChannelCom"></arbCGreenChannel>
      <!--  对公征信进出口商品免验信息页面-->
      <arbCProductExemption :c-parent-params="info.arbCProductExemptionCom"></arbCProductExemption>
      <!--  对公征信进出口商品检验分类监管信息页面-->
      <arbCClassSupervision :c-parent-params="info.arbCClassSupervisionCom"></arbCClassSupervision>
      <!--  对公征信拥有专利情况页面-->
      <arbCPatentInfo :c-parent-params="info.arbCPatentInfoCom"></arbCPatentInfo>
      <!--  对公征信融资规模控制信息页面-->
      <arbCFinancingController :c-parent-params="info.arbCFinancingControllerCom"></arbCFinancingController>
      <!--  对公征信被追偿业务历史表现账户明细页面-->
      <arbCDetOfRecBusiHis :c-parent-params="info.arbCDetOfRecBusiHisCom"></arbCDetOfRecBusiHis>
      <!--  对公征信中长期借款业务历史表现账户明细页面-->
      <arbCDetAcountOfMLongTermHis :c-parent-params="info.arbCDetAcountOfMLongTermHisCom"></arbCDetAcountOfMLongTermHis>
      <!--  对公征信短期借款业务历史表现账户明细页面-->
      <arbCDetAcountOfShortTermHis :c-parent-params="info.arbCDetAcountOfShortTermHisCom"></arbCDetAcountOfShortTermHis>
      <!--  对公征信循环透支的历史表现页面-->
      <arbCDetAcountOfROHis :c-parent-params="info.arbCDetAcountOfROHisCom"></arbCDetAcountOfROHis>
      <!--  对公征信贴现业务账户信贷明细页面-->
      <arbCDetAcountOfDisCredit :c-parent-params="info.arbCDetAcountOfDisCreditCom"></arbCDetAcountOfDisCredit>
      <!--  对公征信贴现的历史表现页面-->
      <arbCDetAcountOfDisHis :c-parent-params="info.arbCDetAcountOfDisHisCom"></arbCDetAcountOfDisHis>
      <!--  对公征信银行承兑汇票和信用证的信贷明细页面-->
      <arbCAcceptAndLetterDetail :c-parent-params="info.arbCAcceptAndLetterDetailCom"></arbCAcceptAndLetterDetail>
      <!--  对公征信银行保函及其他业务的信贷明细页面-->
      <arbCLetterOfGuarDetail :c-parent-params="info.arbCLetterOfGuarDetailCom"></arbCLetterOfGuarDetail>
      <!--  对公征信非信贷记录--公用事业历史缴费记录明细页面-->
      <arbCNonCredit :c-parent-params="info.arbCNonCreditCom"></arbCNonCredit>
      <!--  对公征信公共记录--住房公积金历史缴费记录明细页面-->
      <arbCPublicRecord :c-parent-params="info.arbCPublicRecordCom"></arbCPublicRecord>
    </div>
    <div class="noPrint">
      <el-button size="mini" type="primary" @click="handlePrintConfig()">{{$i18ns('下载')}}</el-button>
    </div>
  </div>
</template>

<script>

import arbCEffectIdenty from "@/views/icms/creditReport/ent/tableView/arbCEffectIdenty.vue"//对公征信身份标识页面
import arbCInfoSum from "@/views/icms/creditReport/ent/tableView/arbCInfoSum.vue"//对公征信身份标识页面
import arbCSumOfLoanAndCreditOut from "@/views/icms/creditReport/ent/tableView/arbCSumOfLoanAndCreditOut.vue"//对公征信未结清信贷及授信信息概要页面
import arbCSumOfLoanSettled from "@/views/icms/creditReport/ent/tableView/arbCSumOfLoanSettled.vue"//对公征信已结清信贷信息概要页面
import arbCRepayLiability from "@/views/icms/creditReport/ent/tableView/arbCRepayLiability.vue"//对公征信已结清信贷信息概要页面
import arbCBaseInfo from "@/views/icms/creditReport/ent/tableView/arbCBaseInfo.vue"//对公征信基本概况信息页面
import arbCCapitalAndInvestor from "@/views/icms/creditReport/ent/tableView/arbCCapitalAndInvestor.vue"//对公征信注册资本及主要出资人信息页面
import arbCMainComponent from "@/views/icms/creditReport/ent/tableView/arbCMainComponent.vue"//对公征信主要组成人员信息页面
import arbCParentBranch from "@/views/icms/creditReport/ent/tableView/arbCParentBranch.vue"//对公征信上级机构页面
import arbCActualController from "@/views/icms/creditReport/ent/tableView/arbCActualController.vue"//对公征信实际控制人页面
import arbCRecoveredBusi from "@/views/icms/creditReport/ent/tableView/arbCRecoveredBusi.vue"//对公征信被追偿业务页面
import arbCOutInterestOwed from "@/views/icms/creditReport/ent/tableView/arbCOutInterestOwed.vue"//对公征信被追偿业务页面
import arbCOutMAndLTermLoan from "@/views/icms/creditReport/ent/tableView/arbCOutMAndLTermLoan.vue"//对公征信未结清信贷--中长期借款页面
import arbCOutShortTermLoan from "@/views/icms/creditReport/ent/tableView/arbCOutShortTermLoan.vue"//对公征信未结清信贷--短期借款页面
import arbCOutRevoOverdraft from "@/views/icms/creditReport/ent/tableView/arbCOutRevoOverdraft.vue"//对公征信未结清信贷--循环贷款页面
import arbCOutDiscount from "@/views/icms/creditReport/ent/tableView/arbCOutDiscount.vue"//对公征信未结清信贷--贴现页面
import arbCOutAcceptAndLetter from "@/views/icms/creditReport/ent/tableView/arbCOutAcceptAndLetter.vue"//对公征信未结清信贷--银行承兑汇票和信用证页面
import arbCOutLetterOfGuar from "@/views/icms/creditReport/ent/tableView/arbCOutLetterOfGuar.vue"//对公征信未结清信贷--银行保函及其他业务页面
import arbCMAndLTermLoan from "@/views/icms/creditReport/ent/tableView/arbCMAndLTermLoan.vue"//对公征信已结清信贷--中长期借款页面
import arbCShortTermLoan from "@/views/icms/creditReport/ent/tableView/arbCShortTermLoan.vue"//对公征信已结清信贷--短期借款页面
import arbCRevoOverdraft from "@/views/icms/creditReport/ent/tableView/arbCRevoOverdraft.vue"//对公征信已结清信贷--循环透支页面
import arbCDiscount from "@/views/icms/creditReport/ent/tableView/arbCDiscount.vue"//对公征信已结清信贷--贴现页面
import arbCAcceptAndLetter from "@/views/icms/creditReport/ent/tableView/arbCAcceptAndLetter.vue"//对公征信已结清信贷--贴现页面
import arbCLetterOfGuar from "@/views/icms/creditReport/ent/tableView/arbCLetterOfGuar.vue"//对公征信已结清信贷--贴现页面
import arbCRepayDutyOfOther from "@/views/icms/creditReport/ent/tableView/arbCRepayDutyOfOther.vue"//对公征信已结清信贷--相关还款责任--为其他借款人承担的相关还款责任（贴现外其他业务）页面
import arbCRepayDutyOfDiscount from "@/views/icms/creditReport/ent/tableView/arbCRepayDutyOfDiscount.vue"//对公征信已结清信贷--相关还款责任--为其他借款人承担的相关还款责任（贴现业务）页面
import arbCRepayDutyOfGuar from "@/views/icms/creditReport/ent/tableView/arbCRepayDutyOfGuar.vue"//对公征信已结清信贷--相关还款责任--为其他借款人承担的相关还款责任（担保业务）页面
import arbCUtilitiesInfo from "@/views/icms/creditReport/ent/tableView/arbCUtilitiesInfo.vue"//对公征信对公征信公用事业缴费信息页面页面
import arbCTaxArrearsRecord from "@/views/icms/creditReport/ent/tableView/arbCTaxArrearsRecord.vue"//对公征信对公征信公用事业缴费信息页面页面
import arbCCivilJudgeRecord from "@/views/icms/creditReport/ent/tableView/arbCCivilJudgeRecord.vue"//对公征信民事判决记录页面
import arbCEnforcementRecord from "@/views/icms/creditReport/ent/tableView/arbCEnforcementRecord.vue"//对公征信强制执行记录页面
import arbCPenaltyRecord from "@/views/icms/creditReport/ent/tableView/arbCPenaltyRecord.vue"//对公征信行政处罚记录页面
import arbCHouseProvidRecord from "@/views/icms/creditReport/ent/tableView/arbCHouseProvidRecord.vue"//对公征信住房公积金缴费记录页面
import arbCPermissionRecord from "@/views/icms/creditReport/ent/tableView/arbCPermissionRecord.vue"//对公征信获得许可记录页面
import arbCCertificationRecord from "@/views/icms/creditReport/ent/tableView/arbCCertificationRecord.vue"//对公征信获得认证记录页面
import arbCQualificationRecord from "@/views/icms/creditReport/ent/tableView/arbCQualificationRecord.vue"//对公征信获得资质记录页面
import arbCRewardRecord from "@/views/icms/creditReport/ent/tableView/arbCRewardRecord.vue"//对公征信获得奖励记录页面
import arbCGreenChannel from "@/views/icms/creditReport/ent/tableView/arbCGreenChannel.vue"//对公征信出入境检验检疫绿色通道信息页面
import arbCProductExemption from "@/views/icms/creditReport/ent/tableView/arbCProductExemption.vue"//对公征信进出口商品免验信息页面
import arbCClassSupervision from "@/views/icms/creditReport/ent/tableView/arbCClassSupervision.vue"//对公征信进出口商品检验分类监管信息页面
import arbCPatentInfo from "@/views/icms/creditReport/ent/tableView/arbCPatentInfo.vue"//对公征信拥有专利情况页面
import arbCFinancingController from "@/views/icms/creditReport/ent/tableView/arbCFinancingController.vue"//对公征信融资规模控制信息页面
import arbCDetOfRecBusiHis from "@/views/icms/creditReport/ent/tableView/arbCDetOfRecBusiHis.vue"//对公征信融资规模控制信息页面
import arbCDetAcountOfMLongTermHis from "@/views/icms/creditReport/ent/tableView/arbCDetAcountOfMLongTermHis.vue"//对公征信中长期借款业务历史表现账户明细页面
import arbCDetAcountOfShortTermHis from "@/views/icms/creditReport/ent/tableView/arbCDetAcountOfShortTermHis.vue"//对公征信短期借款业务历史表现账户明细页面
import arbCDetAcountOfROHis from "@/views/icms/creditReport/ent/tableView/arbCDetAcountOfROHis.vue"//对公征信循环透支的历史表现页面
import arbCDetAcountOfDisCredit from "@/views/icms/creditReport/ent/tableView/arbCDetAcountOfDisCredit.vue"//对公征信循环透支的历史表现页面
import arbCDetAcountOfDisHis from "@/views/icms/creditReport/ent/tableView/arbCDetAcountOfDisHis.vue"//对公征信贴现的历史表现页面
import arbCAcceptAndLetterDetail from "@/views/icms/creditReport/ent/tableView/arbCAcceptAndLetterDetail.vue"//对公征信银行承兑汇票和信用证的信贷明细页面
import arbCLetterOfGuarDetail from "@/views/icms/creditReport/ent/tableView/arbCLetterOfGuarDetail.vue"//对公征信银行保函及其他业务的信贷明细页面
import arbCNonCredit from "@/views/icms/creditReport/ent/tableView/arbCNonCredit.vue"//公用事业历史缴费记录明细页面
import arbCPublicRecord from "@/views/icms/creditReport/ent/tableView/arbCPublicRecord.vue"//住房公积金历史缴费记录明细页面
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "entGlobalReport",
  components: {
    arbCEffectIdenty,
    arbCInfoSum,
    arbCSumOfLoanAndCreditOut,
    arbCSumOfLoanSettled,
    arbCRepayLiability,
    arbCBaseInfo,
    arbCCapitalAndInvestor,
    arbCMainComponent,
    arbCParentBranch,
    arbCActualController,
    arbCRecoveredBusi,
    arbCOutInterestOwed,
    arbCOutMAndLTermLoan,
    arbCOutShortTermLoan,
    arbCOutRevoOverdraft,
    arbCOutDiscount,
    arbCOutAcceptAndLetter,
    arbCOutLetterOfGuar,
    arbCMAndLTermLoan,
    arbCShortTermLoan,
    arbCRevoOverdraft,
    arbCDiscount,
    arbCAcceptAndLetter,
    arbCLetterOfGuar,
    arbCRepayDutyOfOther,
    arbCRepayDutyOfDiscount,
    arbCRepayDutyOfGuar,
    arbCUtilitiesInfo,
    arbCTaxArrearsRecord,
    arbCCivilJudgeRecord,
    arbCEnforcementRecord,
    arbCPenaltyRecord,
    arbCHouseProvidRecord,
    arbCPermissionRecord,
    arbCQualificationRecord,
    arbCRewardRecord,
    arbCGreenChannel,
    arbCProductExemption,
    arbCClassSupervision,
    arbCPatentInfo,
    arbCFinancingController,
    arbCDetOfRecBusiHis,
    arbCDetAcountOfMLongTermHis,
    arbCDetAcountOfShortTermHis,
    arbCDetAcountOfROHis,
    arbCDetAcountOfDisCredit,
    arbCDetAcountOfDisHis,
    arbCAcceptAndLetterDetail,
    arbCLetterOfGuarDetail,
    arbCNonCredit,
    arbCPublicRecord,
    arbCCertificationRecord
  },
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      info: {
        arbCNonCreditCom: [],
        arbCActualControllerCom: [],
        arbCRepayDutyOfDiscountCom: [],
        arbCAcceptAndLetterCom: [],
        arbCCivilJudgeRecordCom: [],
        arbCPenaltyRecordCom: [],
        arbCFinancingControllerCom: [],
        arbCProductExemptionCom: [],
        arbCClassSupervisionCom: [],
        arbCMainComponentCom: [],
        arbCLetterOfGuarCom: [],
        arbCRevoOverdraftCom: [],
        arbCEnforcementRecordCom: [],
        arbCRecoveredBusiCom: [],
        arbCPatentInfoCom: [],
        arbCOutInterestOwedCom: [],
        arbCMAndLTermLoanCom: [],
        arbCOutCreidtInfoCom: [],
        arbCUtilitiesInfoCom: {
          arrears_amt: "",
          org_id: "",
          apply_no: "",
          credit_reports_no: "",
          payment_status: "",
          name: "",
          statistics_year_month: "",
          busi_type_name: ""
        },
        arbCPublicRecordCom: [],
        arbCTaxArrearsRecordCom: [],
        arbCDetOfLoanSettledCom: [],
        arbCDetOfLoanAndCreditOutCom: [],
        arbCOutAcceptAndLetterCom: [],
        arbCQualificationRecordCom: [],
        arbCRepayDutyOfOtherCom: [],
        arbCSumOfLoanAndCreditOutCom: {
          revolve_used_quota: "",
          apply_no: "",
          credit_reports_no: "",
          advance_payment_disposal_date: "",
          non_revolve_used_quota: "",
          overdue_interest_and_other: "",
          overdue_total: "",
          non_revolve_total_quota: "",
          revolve_total_quota: "",
          non_revolve_available_quota: "",
          advance_payment_account_num: "",
          org_id: "",
          ddbamc_account_num: "",
          ddbamc_last_disposal_date: "",
          advance_payment_balance: "",
          ddbamc_balance: "",
          overdue_principal: "",
          revolve_available_quota: ""
        },
        arbCParentBranchCom: [],
        arbCGreenChannelCom: [],
        arbCOutShortTermLoanCom: [],
        arbCCapitalAndInvestorCom: [],
        arbCSumOfLoanSettledCom: {
          advance_payment_account_num: "",
          org_id: "",
          apply_no: "",
          credit_reports_no: "",
          ddbamc_account_num: "",
          ddbamc_last_disposal_date: "",
          advance_payment_balance: "",
          advance_payment_disposal_date: "",
          ddbamc_balance: ""
        },
        arbCDetAcountOfROHisCom: [],
        arbCLetterOfGuarDetailCom: [],
        arbCRepayLiabilityCom: {
          guar_trans_busi_account_num: "",
          guar_trans_balance: "",
          apply_no: "",
          credit_reports_no: "",
          duty_type_name: "",
          guar_trans_busi_repay_amt: "",
          other_trans_busi_account_num: "",
          recovered_busi_repay_amt: "",
          other_trans_busi_bad_balance: "",
          guar_trans_bad_balance: "",
          guar_trans_concern_balance: "",
          org_id: "",
          other_trans_busi_repay_amt: "",
          other_trans_busi_balance: "",
          recovered_busi_account_num: "",
          recovered_busi_balance: "",
          other_trans_busi_concern_balance: ""
        },
        arbCInfoSumCom: {
          lending_trans_recovered_balance: "",
          first_credit_trans_year: "",
          enforcement_record_num: "",
          administrative_penalty_record_num: "",
          outstanding_credit_trans_num: "",
          lending_trans_bad_balance: "",
          guar_trans_balance: "",
          apply_no: "",
          credit_reports_no: "",
          credit_trans_branch_num: "",
          lending_trans_concern_balance: "",
          guar_trans_bad_balance: "",
          lending_trans_balance: "",
          first_has_repayment_liability_year: "",
          non_credit_transaction_account_num: "",
          civil_judgment_record_num: "",
          guar_trans_concern_balance: "",
          objection_prompt: "",
          org_id: "",
          tax_arrears_record_num: ""
        },
        arbCShortTermLoanCom: [],
        arbCOutLetterOfGuarCom: [],
        arbCDetAcountOfDisCreditCom: [],
        arbCRewardRecordCom: [],
        arbCDetAcountOfDisHisCom: [],
        arbCPermissionRecordCom: [],
        arbCRepayDutyOfGuarCom: [],
        arbCDetAcountOfShortTermHisCom: [],
        arbCEffectIdentyCom: {
          medain_code: "",
          branch_id: "",
          org_id: "",
          apply_no: "",
          credit_reports_no: "",
          company_name: "",
          unified_social_credit_code: ""
        },
        arbCBaseInfoCom: {
          branch_type_info_branch: "",
          apply_no: "",
          credit_reports_no: "",
          established_year: "",
          enterprise_size: "",
          registration_addr_info_branch: "",
          busi_addr_info_branch: "",
          industry: "",
          deadline_info_branch: "",
          registration_addr: "",
          branch_type: "",
          org_id: "",
          established_year_info_branch: "",
          survival_state_info_branch: "",
          busi_addr: "",
          industry_info_branch: "",
          registration_deadline_date: "",
          economic_type_name: "",
          survival_state: "",
          economic_type_info_branch: "",
          enterprise_size_info_branch: ""
        },
        arbCOutMAndLTermLoanCom: [],
        arbCCertificationRecordCom: [],
        arbCOutRevoOverdraftCom: [],
        arbCDetAcountOfMLongTermHisCom: [],
        arbCDiscountCom: [],
        arbCOutDiscountCom: [],
        arbCDetOfRecBusiHisCom: [],
        arbCAcceptAndLetterDetailCom: [],
        arbCHouseProvidRecordCom: []
      },
      isGotData: false,
      cert_type: "",
      cert_no: ""
    }
  },
  computed: {},
  created() {
    this.cert_type = this.cParentParams.cert_type;
    this.cert_no = this.cParentParams.cert_no;
    this.init();
  },
  methods: {
    async init() {
      let that = this;
      let params = {
        servicecode: "ar2255",
        // apply_no: "ap100000001",
        // credit_reports_no: "rp100000001",
        cert_type: this.cert_type,
        cert_no: this.cert_no
      }
      //请求获取征信报文数据
      await MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.info = res.data.info;
            //异步请求获得数据后渲染子组件（解决异步请求数据延迟问题）
            that.isGotData = true;
          } else {
            this.$message({
              type: 'error',
              message: '请求征信数据失败！'
            })
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    unionParams(...params) {
      // debugger
      let info = {};
      let length = params.length;
      if (length % 2 !== 0) {
        this.$message({
          type: 'error',
          message: 'unionParams方法参数不正确！'
        })
      }
      //步长
      let size = length / 2;
      for (let i = 0; i < size; i++) {
        info[params[i]] = params[i + size];
      }
      return info;
    },
    handlePrintConfig() {
      this.$dialog.open({
        that: this,
        title: "水印设置",
        width: "36%",
        toRequest: {
          url: "@printConfig",
          method: "get",
        },
      });
    }
  }
}
</script>


<style lang="less" scoped>
.report-container {
  width: 98%;
  display: inline-block;
  border: 1px solid;
  padding-right: 10px;
}
h1{
  margin-bottom: 0;
  padding-bottom: 10%;
  color: black;
  font-weight: bold;
}
.icon-image{
  width: 100%; height: 20%
}
</style>
