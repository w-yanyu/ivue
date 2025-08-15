import UrgentControl from "./UrgentControl";
import CancelUpload from "./CancelUpload"; //核销文件上传
import RepaymentApplication from "./RepaymentApplication"; // 还款申请
import ChooseAccountDynamic from "./ChooseAccountDynamic"; // 预约还款申请
import AccountInfoDisplay from "./AccountInfoDisplay"; // 公账信息展示
import LoanPurposeControl from "./LoanPurposeControl"; // 贷后用途管控


import DebtRestructure from "./DebtRestructure"; // 债务重组申请
import DebtRestructureAccount from "./DebtRestructureAccount"; // 债务重组重新申请
import templateList from "@/views/dhTemplate/templateList"; // 贷后模板
import tqhktsApply from "@/views/dh/advanceSpecial/tqhktsApply.vue"; // 贷后提前还款特殊申请
import tqhktsUpdate from "@/views/dh/advanceSpecial/tqhktsUpdate.vue"; // 贷后提前还款特殊申请
import tqhktsView from "@/views/dh/advanceSpecial/tqhktsView.vue"; // 贷后提前还款特殊申请
import fiveTypeFile from "@/views/components/fiveTypeFile"; // 贷后用途管控
import HighRiskApply from "./highRisk/HighRiskApply"; // 高危认定申请
import HighRiskUpdate from "./highRisk/HighRiskUpdate"; // 高危认定查询更新
import HighRiskView from "./highRisk/HighRiskView"; // 高危认定查询查看页面
import HighRiskCustomerList from "./highRisk/HighRiskCustomerList"; // 高危认定一览表
import CreditReferenceApply from "./creditApply/CreditReferenceApply"; // 单笔人行征信申请
import CreditReferenceView from "./creditApply/CreditReferenceView"; // 单笔人行征信申请信息
import CreditReferenceUpdate from "./creditApply/CreditReferenceUpdate"; // 单笔人行征信申请更新
import CreditReportView from "./creditApply/CreditReportView"; // 人行征信查看
import BatchCreditApply from "./creditApply/BatchCreditApply"; //批量人行征信
import BatchCreditApplyUpdate from "./creditApply/BatchCreditApplyUpdate"; //批量人行征信更新
import BatchCreditApplyView from "./creditApply/BatchCreditApplyView"; //批量人行征信查看
import StopDeductApply from "./batchDeductManage/StopDeductApply.vue"; //停止批扣申请
import StopDeductUpdate from "./batchDeductManage/StopDeductUpdate"; //停止批扣修改
import StopDeductView from "./batchDeductManage/StopDeductView"; //停止批扣查看
import FivetypeBatchAgency from "./FivetypeBatchAgency"; // 贷后五级分类复核页面
import RepayApply from "./RepayApply.vue"; // 还款申请包含公账还款和个人账户还款
import HandleRepayApply from "./HandleRepayApply"; // 还款申请经办岗办理页面
import PersonBatchRepay from "./PersonBatchRepay.vue"; // 个人账户批量还款
import ManualDerateApply from "./ManualDerateApply"; // 人工减免申请
import HandleManualDerateApply from "./HandleManualDerateApply"; // 人工减免申请经办岗办理页面
import ManualDerateApplyDetail from "./ManualDerateApplyDetail"; // 人工减免申请复核岗办理页面
import HandleLoanPurposeControl from "./loanPurpose/HandleLoanPurposeControl"; // 贷后用途管控退回到经办岗办理页面    APPHandleLoanPurposeControl
import HandleLoanPurposeControlSearch from "./loanPurpose/HandleLoanPurposeControlSearch"; // 贷后用途管控退回到经办岗办理页面(复核岗界面展示)   APPHandleLoanPurposeControlSearch
import APPHandleLoanPurposeControl from "./loanPurpose/APPHandleLoanPurposeControl"; // APP贷后用途管控退回到经办岗办理页面
import APPHandleLoanPurposeControlSearch from "./loanPurpose/APPHandleLoanPurposeControlSearch"; // APP贷后用途管控退回到经办岗办理页面(复核岗界面展示)
import RecheckLoanPurposeControl from "./RecheckLoanPurposeControl"; // 贷后用途管控走到复核岗查看详情页面
import fiveTypeApply from "@/views/dh/fiveType/fiveTypeApply.vue"; // 贷后五级分类调整
import fiveTypeUpdate from "@/views/dh/fiveType/fiveTypeUpdate.vue"; // 贷后五级分类调整
import fiveTypeView from "@/views/dh/fiveType/fiveTypeView.vue"; // 贷后五级分类调整
import RepayHistoryList from "./RepayHistoryList.vue"; //还款记录查询
import fiveTypeUploadFileView from "@/views/dh/fiveType/fiveTypeUploadFileView.vue"; //还款记录查询
import PubAccountReturn from "./PubAccountReturn"; // 公账退还申请
import HandlePubAccRetn from "./HandlePubAccRetn"; // 公账退还申请经办岗
import RetnHistoryList from "./RetnHistoryList"; // 公账退还记录查询
import EntrustApply from "./EntrustApply.vue"; //诉讼委案申请
import AllSuitCaseView from "./AllSuitCaseView.vue"; //诉讼案件一览表
import SuitResultInto from "./SuitResultInto.vue"; //诉讼结果信息录入
import AllSuitResultView from "./AllSuitResultView.vue"; //诉讼结果统计查询

export default {
  UrgentControl,
  CancelUpload,
  RepaymentApplication,
  ChooseAccountDynamic,
  AccountInfoDisplay,
  LoanPurposeControl,
  DebtRestructure,
  DebtRestructureAccount,
  templateList,
  tqhktsApply,
  tqhktsUpdate,
  tqhktsView,
  fiveTypeFile,
  HighRiskApply,
  HighRiskUpdate,
  HighRiskView,
  HighRiskCustomerList,
  CreditReferenceApply,
  CreditReferenceView,
  CreditReferenceUpdate,
  CreditReportView,
  BatchCreditApply,
  BatchCreditApplyUpdate,
  BatchCreditApplyView,
  StopDeductApply,
  StopDeductUpdate,
  StopDeductView,
  FivetypeBatchAgency,
  RepayApply,
  HandleRepayApply,
  PersonBatchRepay,
  ManualDerateApply,
  HandleManualDerateApply,
  ManualDerateApplyDetail,
  HandleLoanPurposeControl,
  HandleLoanPurposeControlSearch,
  RecheckLoanPurposeControl,
  fiveTypeApply,
  fiveTypeUpdate,
  fiveTypeView,
  RepayHistoryList,
  fiveTypeUploadFileView,
  APPHandleLoanPurposeControl,
  APPHandleLoanPurposeControlSearch,
  PubAccountReturn,
  HandlePubAccRetn,
  RetnHistoryList,
  EntrustApply,
  AllSuitCaseView,
  SuitResultInto,
  AllSuitResultView
}
