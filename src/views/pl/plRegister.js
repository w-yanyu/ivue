import ZDHAssetsaleHandover from "@/views/pl/assetAssignment/query/DHAssetsaleHandover.vue" // 贷后资产转让变更历史查询 代办 办理头部
import assetSaleQuery from "@/views/pl/assetAssignment/query/assetSaleQuery.vue"//
import ZManualDerateApply from "@/views/pl/derate/ZManualDerateApply.vue" // 人工减免申请
import advRepayment from "@/views/pl/repayment/advRepayment.vue"; // 贷后提前还款特殊申请办理页面
import advRepaymentapply from "@/views/pl/repayment/advRepaymentapply.vue"; // 贷后提前还款特殊申请办理页面
import repaymentApply from "@/views/pl/repayment/repaymentApply.vue"; // 贷后还款申请申请办理页面
import repaymentApplyapply from "@/views/pl/repayment/repaymentApplyapply.vue"; // 贷后还款申请申请办理页面
import personAcctBatchRepay from "@/views/pl/repayment/personAcctBatchRepay.vue"; // 贷后个人账户批量扣款
import ZfiveTypeApply from "@/views/pl/LevelFiveClasf/ZfiveTypeApply.vue"; // 贷后个人账户批量扣款
import ZfiveTypeApplyapply from "@/views/pl/LevelFiveClasf/ZfiveTypeApplyapply.vue"; // 贷后个人账户批量扣款
import ZProcessImgView from "@/views/pl/flowManagement/design/process-img-view"; // 流程图预览组件
import ZDHWaitToWithDeal from "@/views/pl/repayAcctChange/query/DHWaitToWithDeal.vue"; // 贷后还款账户变更历史查询 代办 办理头部
import ZDHTransferHandover from "@/views/pl/assetHndov/handover/DHTransferHandover.vue"; // 贷后资产移交变更历史查询 代办 办理头部
import ZLoanPurposeControl from "@/views/pl/useManagement/ZLoanPurposeControl.vue"; // 贷后用途管控
import ZLoanPurposeControlapply from "@/views/pl/useManagement/ZLoanPurposeControlapply.vue"; // 贷后用途管控
import ZHandleLoanPurposeControl from "@/views/pl/useManagement/ZHandleLoanPurposeControl.vue";
import ZHandleLoanPurposeControlSearch from "@/views/pl/useManagement/ZHandleLoanPurposeControlSearch.vue";
import StopDeductBatchApply from "@/views/pl/stopBatch/StopDeductBatchApply.vue"; // 贷后停止批扣
import StopDeductBatchApplyapply from "@/views/pl/stopBatch/StopDeductBatchApplyapply.vue"; // 贷后停止批扣
import ZManualDerateApplyDetail from "@/views/pl/derate/ZManualDerateApplyDetail.vue";// 人工减免申请复核岗办理页面
import ZManualCheck from "@/views/pl/checkAfterLoan/checkAfterLoanPerson/usinfo/ZManualCheck.vue";// 个人贷后检查办理页面
import ZManualCheckCom from "@/views/pl/checkAfterLoan/checkAfterLoanPerson/usinfo/ZManualCheckCom.vue";// 对公贷后检查办理页面
import plcorporateCustomerFinancialStatements from "@/views/pl/checkAfterLoan/custfinancialmanage/plcorporateCustomerFinancialStatements.vue";//对公客户财务状况
import PlWriteOffApply from "@/views/pl/writeoff/PlWriteOffApply.vue"; // 贷款核销申请
import loanInfoEdit from "@/views/pl/repayWayChange/loanInfoEdit.vue";//贷款信息维护
import PlWriteOffApplyDetail from "@/views/pl/writeoff/PlWriteOffApplyDetail.vue"; // 贷款核销申请处置页面
import SuitStartApplyTo from "@/views/pl/lawsuitManagement/lawsuitApplyManagement/SuitStartApplyTo.vue"; // 诉讼管理之诉讼发起申请
import SuitStartApplyToApply from "@/views/pl/lawsuitManagement/lawsuitApplyManagement/SuitStartApplyToApply.vue"; // 诉讼管理之诉讼发起申请已办页面
import SuitEntrustApply from "@/views/pl/lawsuitManagement/lawsuitApplyManagement/SuitEntrustApply.vue"; // 诉讼管理之诉讼委案申请
import SuitEntrustApplyToApply from "@/views/pl/lawsuitManagement/lawsuitApplyManagement/SuitEntrustApplyToApply.vue"; // 诉讼管理之诉讼委案申请已办页面
import SuitBackApply from "@/views/pl/lawsuitManagement/lawsuitApplyManagement/SuitBackApply.vue"; // 诉讼管理之诉讼收案申请
import SuitBackApplyTo from "@/views/pl/lawsuitManagement/lawsuitApplyManagement/SuitBackApplyTo.vue"; // 诉讼管理之诉讼收案申请已办页面
import SuitCloseApply from "@/views/pl/lawsuitManagement/lawsuitApplyManagement/SuitCloseApply.vue"; // 诉讼管理之诉讼关闭申请
import SuitCloseApplyTo from "@/views/pl/lawsuitManagement/lawsuitApplyManagement/SuitCloseApplyTo.vue"; // 诉讼管理之诉讼关闭申请已办页面
import SuitFinishApply from "@/views/pl/lawsuitManagement/lawsuitApplyManagement/SuitFinishApply.vue"; // 诉讼管理之诉讼结案申请
import SuitFinishApplyTo from "@/views/pl/lawsuitManagement/lawsuitApplyManagement/SuitFinishApplyTo.vue"; // 诉讼管理之诉讼结案申请
import wajjqd from "@/views/pl/lawsuitManagement/lawsuitApplyManagement/wajjqd.vue"; // 交接清单
import Weianqindan from "@/views/pl/lawsuitManagement/lawsuitApplyManagement/Weianqindan.vue"; // 当前委案信息
import Weianqindanhistory from "@/views/pl/lawsuitManagement/lawsuitApplyManagement/Weianqindanhistory.vue"; // 历史委案信息
import AllSuitCaseViewTo from "@/views/pl/lawsuitManagement/lawsuitApplyManagement/select/AllSuitCaseViewTo.vue"; // 法诉案件一览表
import SuitCaseInfoViewTo from "@/views/pl/lawsuitManagement/lawsuitApplyManagement/select/SuitCaseInfoViewTo.vue"; // 在诉案件明细查询
import susongManagezxjlViewTo from "@/views/pl/lawsuitManagement/lawsuitApplyManagement/select/susongManagezxjlViewTo.vue"; // 执行受理/结果查询
import ToBeginApplViewTo from "@/views/pl/lawsuitManagement/lawsuitApplyManagement/select/ToBeginApplViewTo.vue"; // 执行受理/结果查询
import LoanPaymentViewTo from "@/views/pl/lawsuitManagement/lawsuitApplyManagement/select/LoanPaymentViewTo.vue"; // 借款缴费明细查询
import LoanPaymentStatisticsTo from "@/views/pl/lawsuitManagement/lawsuitApplyManagement/select/LoanPaymentStatisticsTo.vue"; // 借款缴费统计查询
import ExpensePaymentViewTo from "@/views/pl/lawsuitManagement/lawsuitApplyManagement/select/ExpensePaymentViewTo.vue"; // 费用支付明细统计查询
import CaseStateInquiryTo from "@/views/pl/lawsuitManagement/lawsuitApplyManagement/select/CaseStateInquiryTo.vue"; // 诉讼案件委案统计查询
import SuitCaseInfo from "@/views/pl/lawsuitManagement/lawsuitApplyManagement/select/SuitCaseInfo.vue"; // 诉讼案件委案统计查询
import ToBeginAppl from "@/views/pl/lawsuitManagement/fasone/ToBeginAppl.vue"; //   立案受理信息记录
import ToBeginApplResult from "@/views/pl/lawsuitManagement/fasone/ToBeginApplResult.vue"; //   立案受理信息记录
import susongManagezxjgjl from "@/views/pl/lawsuitManagement/fasone/susongManagezxjgjl.vue"; //   执行受理记录
import susongManagezxsljl from "@/views/pl/lawsuitManagement/fasone/susongManagezxsljl.vue"; //   执行结果记录
import ToBeginApplTo from "@/views/pl/lawsuitManagement/fasone/ToBeginApplTo.vue"; //   立案受理信息记录
import ToBeginApplResultTo from "@/views/pl/lawsuitManagement/fasone/ToBeginApplResultTo.vue"; //   立案受理信息记录
import loanInformationChange from "@/views/pl/repayAcctChange/change/loanInformationChange.vue"; //   立案受理信息记录
import susongManagezxjgjlTo from "@/views/pl/lawsuitManagement/fasone/susongManagezxjgjlTo.vue"; //   执行受理记录已办
import susongManagezxsljlTo from "@/views/pl/lawsuitManagement/fasone/susongManagezxsljlTo.vue"; //   执行结果记录已办
import loanPayApply from "@/views/pl/lawsuitManagement/leactionfee/loanPayApply.vue"; //   借款缴费申请
import newaction from "@/views/pl/lawsuitManagement/litigationinstitution/newaction.vue";   //合作机构导入
import exportfsFile from "@/views/pl/lawsuitManagement/litigationinstitution/exportfsFile.vue";  //法诉机构一览表文件导出
import legalOrgConfirm from "@/views/pl/lawsuitManagement/litigationinstitution/legalOrgConfirm/legalOrgConfirm.vue" //法诉机构一览表签订协议
import HandleLegalOrgConfirm from "@/views/pl/lawsuitManagement/litigationinstitution/legalOrgConfirm/HandleLegalOrgConfirm.vue"//法诉机构协议签订经办
import PreviewLegalOrgConfirm from "@/views/pl/lawsuitManagement/litigationinstitution/legalOrgConfirm/PreviewLegalOrgConfirm.vue" //法诉机构协议签订复核
import fasuOrgQuit from "@/views/pl/lawsuitManagement/litigationinstitution/fasuOrgQuit/fasuOrgQuit.vue" //机构退出
import HandleFasuOrgQuit from "@/views/pl/lawsuitManagement/litigationinstitution/fasuOrgQuit/HandleFasuOrgQuit.vue"  //机构退出经办
import PreviewFasuOrgQuit from "@/views/pl/lawsuitManagement/litigationinstitution/fasuOrgQuit/PreviewFasuOrgQuit.vue" //机构退出复核
import annualEvaluation from "@/views/pl/lawsuitManagement/litigationinstitution/annualEvaluation/annualEvaluation.vue" //机构年度评价
import HandleAnnualEvaluation from "@/views/pl/lawsuitManagement/litigationinstitution/annualEvaluation/HandleAnnualEvaluation.vue" //机构年度评价经办
import PreviewAnnualEvaluation from "@/views/pl/lawsuitManagement/litigationinstitution/annualEvaluation/PreviewAnnualEvaluation.vue" //机构年度评价复核
import reConfirm from "@/views/pl/lawsuitManagement/litigationinstitution/reConfirm/reConfirm.vue" //机构续签
import HandleReConfirm from "@/views/pl/lawsuitManagement/litigationinstitution/reConfirm/HandleReConfirm.vue" //机构续签经办
import PreviewReConfirm from "@/views/pl/lawsuitManagement/litigationinstitution/reConfirm/PreviewReConfirm.vue" //机构续签复核
import orgRename from "@/views/pl/lawsuitManagement/litigationinstitution/orgRename/orgRename.vue" //机构更名
import HandleOrgRename from "@/views/pl/lawsuitManagement/litigationinstitution/orgRename/HandleOrgRename.vue" //机构更名经办
import PreviewOrgRename from "@/views/pl/lawsuitManagement/litigationinstitution/orgRename/PreviewOrgRename.vue" //机构更名复核
import orgInfoView from "@/views/pl/lawsuitManagement/litigationinstitution/orgInfoView.vue" //机构续签复核
import PaymentAppl from "@/views/pl/lawsuitManagement/leactionfee/PaymentAppl.vue"; //   费用支付申请
import loanPayApplyTo from "@/views/pl/lawsuitManagement/leactionfee/loanPayApplyTo.vue"; //   借款缴费申请已办
import PaymentApplTo from "@/views/pl/lawsuitManagement/leactionfee/PaymentApplTo.vue"; //   费用支付申请已办
import AttnManageAppl from "@/views/pl/lawsuitManagement/fasone/AttnManageAppl.vue"; //  诉讼资料用印申请
import AttnManageApplTo from "@/views/pl/lawsuitManagement/fasone/AttnManageApplTo.vue"; //  诉讼资料用印申请
import payConfirmApplycom from "@/views/pl/lawsuitManagement/leactionfee/payConfirmApplycom.vue"; //  诉讼资料用印申请
import payConfirmApplycomTo from "@/views/pl/lawsuitManagement/leactionfee/payConfirmApplycomTo.vue"; //  诉讼资料用印申请已办
import PayListManage from "@/views/pl/lawsuitManagement/leactionfee/PayListManage.vue"; //  诉讼资料用印申请已办
import actionTo from "@/views/pl/lawsuitManagement/litigationinstitution/actionTo.vue"; //  合作机构导入
import uploadButtonPl from "@/views/pl/lawsuitManagement/litigationinstitution/uploadButtonPl.vue"; //  合作机构导入
import SuitCaseInfoView from "@/views/pl/lawsuitManagement/ActionQuery/SuitCaseInfoView.vue"   //在诉案件明细查询
import Change_main from "@/views/pl/repayWayChange/change_main.vue"   //还款方式调整
import Change_noinsert from "@/views/pl/repayWayChange/change_noinsert.vue"  //还款方式调整流程页面
import BusinessCoApply from "@/views/pl/lawsuitManagement/litigationinstitution/businesscoapply/BusinessCoApply.vue" //业务合作申请
import PreviewBusinessCoApply from "@/views/pl/lawsuitManagement/litigationinstitution/businesscoapply/PreviewBusinessCoApply.vue"  //业务合作申请流程
import dutyAfirmInfo from "@/views/pl/assetPreservationLedger/dutyAfirm/dutyAfirmInfo.vue"  //业务合作申请流程
import debtRebuildDetail from "@/views/dh/debtRebuild/debt_rebuild_detail.vue"  //业务合作申请流程



export default {
  loanInfoEdit,
  ZDHAssetsaleHandover,
  assetSaleQuery,
  ZManualDerateApply,
  advRepayment,
  advRepaymentapply,
  repaymentApply,
  repaymentApplyapply,
  personAcctBatchRepay,
  ZfiveTypeApply,
  ZfiveTypeApplyapply,
  ZProcessImgView,
  ZDHWaitToWithDeal,
  ZDHTransferHandover,
  ZLoanPurposeControl,
  ZLoanPurposeControlapply,
  ZHandleLoanPurposeControl,
  ZHandleLoanPurposeControlSearch,
  StopDeductBatchApply,
  StopDeductBatchApplyapply,
  ZManualDerateApplyDetail,
  ZManualCheck,
  ZManualCheckCom,
  plcorporateCustomerFinancialStatements,
  PlWriteOffApply,
  PlWriteOffApplyDetail,
  SuitStartApplyTo,
  SuitStartApplyToApply,
  SuitEntrustApply,
  SuitEntrustApplyToApply,
  SuitBackApply,
  SuitBackApplyTo,
  SuitCloseApply,
  SuitCloseApplyTo,
  SuitFinishApply,
  SuitFinishApplyTo,
  wajjqd,
  Weianqindan,
  Weianqindanhistory,
  AllSuitCaseViewTo,
  SuitCaseInfoViewTo,
  susongManagezxjlViewTo,
  ToBeginApplViewTo,
  LoanPaymentViewTo,
  LoanPaymentStatisticsTo,
  ExpensePaymentViewTo,
  CaseStateInquiryTo,
  SuitCaseInfo,
  ToBeginAppl,
  ToBeginApplResult,
  susongManagezxjgjl,
  susongManagezxsljl,
  ToBeginApplTo,
  ToBeginApplResultTo,
  loanInformationChange,
  susongManagezxjgjlTo,
  susongManagezxsljlTo,
  loanPayApply,
  newaction,
  exportfsFile,
  legalOrgConfirm,
  HandleLegalOrgConfirm,
  PreviewLegalOrgConfirm,
  fasuOrgQuit,
  HandleFasuOrgQuit,
  PreviewFasuOrgQuit,
  annualEvaluation,
  HandleAnnualEvaluation,
  PreviewAnnualEvaluation,
  reConfirm,
  HandleReConfirm,
  PreviewReConfirm,
  orgRename,
  HandleOrgRename,
  PreviewOrgRename,
  orgInfoView,
  PaymentAppl,
  loanPayApplyTo,
  PaymentApplTo,
  AttnManageAppl,
  AttnManageApplTo,
  payConfirmApplycom,
  payConfirmApplycomTo,
  PayListManage,
  actionTo,
  uploadButtonPl,
  SuitCaseInfoView,
  Change_main,
  Change_noinsert,
  BusinessCoApply,
  PreviewBusinessCoApply,
  dutyAfirmInfo,
  debtRebuildDetail
}
