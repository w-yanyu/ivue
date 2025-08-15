import ProdTemplate from "@/views/pd/prodTemplate/ProdTemplate.vue"; // 模板配置
import ProdTemplateView from "@/views/pd/prodTemplate/ProdTemplateView.vue"; // 模板配置
import sellProductAddSecond from "@/views/pd/prod/add/sellProductAddSecond.vue"; // 产品配置页面
import sellProductAddFirst from "@/views/pd/prod/add/sell_product_add_first.vue"; // 模板配置页面
import sellProductRela from "@/views/pd/prod/add/sellProductRela.vue"; // 步骤条
import lookAgreementBtn from "@/views/pd/protocolManage/lookAgreement.vue"; // 协议查看页面
import sellProductAddSecondDetail from "@/views/pd/prod/detail/sellProductAddSecondDetail.vue"; // 动态tab页详情
import sellProductRelaDetail from "@/views/pd/prod/detail/sellProductRelaDetail.vue"; // 动态步骤条详情
import minioUploadButton from "@/views/pd/protocolManage/uploadButton.vue"; //minio文件上传按钮
import springboard from "@/views/pd/prodContents/springboard.vue"; //产品目录跳转
import prodContentsTree from "@/views/pd/prodContents/prodContentsTree.vue"; //产品目录跳转
import htmlRender from "@/views/pd/prod/templatePage/prodMailSet/prodMailSetInfo.vue"; //html页面渲染
import prodLayout from "@/views/pd/prod/add/layout.vue"; //产品页面跳转
import prodParamsAdd from "@/views/pd/prod/templatePage/otherParams/otherParams.vue"; //产品额外参数添加页面
import otherParamsInfo from "@/views/pd/prod/templatePage/otherParams/otherParamsInfo.vue"; //产品额外参数详情页面
import templatePageSort from "@/views/pd/prodTemplate/prod_template_sort.vue"; //产品模板页面排序页面
import ArbOpehAndCapaManage from "@/views/pd/dueDiliTemplate/templatePage/ArbOpehAndCapa/ArbOpehAndCapaManage.vue"; //经营信息时间轴页面
import ArbOpehAndCapaManageInfo from "@/views/pd/dueDiliTemplate/templatePage/ArbOpehAndCapa/ArbOpehAndCapaManageInfo.vue"; //经营信息时间轴页面
import DueTemplateReport from "@/views/pd/dueDiliTemplate/templatePage/DueTemplateReport.vue"; //尽职调查报告打印页面
import DueTemplateReportCust from "@/views/pd/dueDiliTemplate/templatePage/DueTemplateReportCust.vue"; //尽职调查报告打印页面
import DueTemplateReportView from "@/views/pd/dueDiliTemplate/templatePage/DueTemplateReportView.vue"; //尽职调查报告打印详情页面
import ArbCustReport from "@/views/pd/dueDiliTemplate/templatePage/ArbCust/ArbCustReport.vue"; //尽职调查报告-->客户信息表
import ArbContReport from "@/views/pd/dueDiliTemplate/templatePage/ArbCont/ArbContReport.vue"; //尽职调查报告-->客户联系人表
import ArbGuarReport from "@/views/pd/dueDiliTemplate/templatePage/ArbGuar/ArbGuarReport.vue"; //尽职调查报告-->担保信息表
import ArbNatuPersonGuarUndeReport from "@/views/pd/dueDiliTemplate/templatePage/ArbNatuPersonGuarUnde/ArbNatuPersonGuarUndeReport.vue"; //尽职调查报告-->担保信息表
import ArbGuarCreditSituSurvReport from "@/views/pd/dueDiliTemplate/templatePage/ArbGuarCreditSituSurv/ArbGuarCreditSituSurvReport.vue"; //尽职调查报告-->担保信息表
import ArbGuarJudgeOpinionReport from "@/views/pd/dueDiliTemplate/templatePage/ArbGuarJudgeOpinion/ArbGuarJudgeOpinionReport.vue"; //尽职调查报告-->担保信息表
import ArbGuaranteeSurvrReport from "@/views/pd/dueDiliTemplate/templatePage/ArbGuaranteeSurv/ArbGuaranteeSurvrReport.vue"; //尽职调查报告-->担保信息表
import ArbFristInvestigatorOpinionReport from "@/views/pd/dueDiliTemplate/templatePage/ArbInvestigatorOpinion/ArbFristInvestigatorOpinionReport.vue"; //尽职调查报告-->担保信息表
import ArbSecondInvestigatorOpinionReport from "@/views/pd/dueDiliTemplate/templatePage/ArbInvestigatorOpinion/ArbSecondInvestigatorOpinionReport.vue"; //尽职调查报告-->担保信息表
import CreditInfoReport from "@/views/pd/dueDiliTemplate/templatePage/InterIndustryCust/creditInfo/CreditInfoReport.vue"; //尽职调查报告-->同业客户授信信息
import ApplyerBaseInfoReport from "@/views/pd/dueDiliTemplate/templatePage/InterIndustryCust/applyerBaseInfo/ApplyerBaseInfoReport.vue"; //尽职调查报告-->同业客户申请人基本信息
import GroupCustHistoryReport from "@/views/pd/dueDiliTemplate/templatePage/GroupCust/history/GroupCustHistoryReport.vue"; //尽职调查报告-->集团客户历史沿革
import ManagerModelReport from "@/views/pd/dueDiliTemplate/templatePage/GroupCust/managerModel/ManagerModelReport.vue"; //尽职调查报告-->集团客户管理者模式
import MainBusiReport from "@/views/pd/dueDiliTemplate/templatePage/GroupCust/mainBusi/MainBusiReport.vue"; //尽职调查报告-->集团客户主营业务
import AssetsAnalysisReport from "@/views/pd/dueDiliTemplate/templatePage/GroupCust/assetsAnalysis/AssetsAnalysisReport.vue"; //尽职调查报告-->集团客户资产情况分析
import debtAnalysisReport from "@/views/pd/dueDiliTemplate/templatePage/GroupCust/debtAnalysis/debtAnalysisReport.vue"; //尽职调查报告-->集团客户负债情况
import situationAnalysisReport from "@/views/pd/dueDiliTemplate/templatePage/GroupCust/situationAnalysis/situationAnalysisReport.vue"; //尽职调查报告-->集团客户所有者权益项目重点分析
import profitAndLossAnalysisReport from "@/views/pd/dueDiliTemplate/templatePage/GroupCust/profitAndLossAnalysis/profitAndLossAnalysisReport.vue"; //尽职调查报告-->集团客户所有者权益项目重点分析
import busiPlanReport from "@/views/pd/dueDiliTemplate/templatePage/GroupCust/busiPlan/busiPlanReport.vue"; //尽职调查报告-->集团客户所有者权益项目重点分析
import punishmentReport from "@/views/pd/dueDiliTemplate/templatePage/GroupCust/punishment/punishmentReport.vue"; //尽职调查报告-->集团客户所有者权益项目重点分析
import diligenceConclusionReport from "@/views/pd/dueDiliTemplate/templatePage/GroupCust/diligenceConclusion/diligenceConclusionReport.vue"; //尽职调查报告-->集团客户所有者权益项目重点分析
import baseInfoReport from "@/views/pd/dueDiliTemplate/templatePage/GroupCust/baseInfo/baseInfoReport.vue"; //尽职调查报告-->集团客户所有者权益项目重点分析
import shareholderReport from "@/views/pd/dueDiliTemplate/templatePage/GroupCust/shareholder/shareholderReport.vue"; //尽职调查报告-->集团客户所有者权益项目重点分析
import executivesReport from "@/views/pd/dueDiliTemplate/templatePage/GroupCust/executives/executivesReport.vue"; //尽职调查报告-->集团客户所有者权益项目重点分析
import ArbClientLetterReport from "@/views/pd/dueDiliTemplate/templatePage/ArbClientLetter/ArbClientLetterReport.vue";
import ArbClientDeclareReport from "@/views/pd/dueDiliTemplate/templatePage/ArbClientDeclare/ArbClientDeclareReport.vue";
import ArbConfSignReport from "@/views/pd/dueDiliTemplate/templatePage/ArbConfSign/ArbConfSignReport.vue";
import ArbCredPropReport from "@/views/pd/dueDiliTemplate/templatePage/ArbCredProp/ArbCredPropReport.vue";
import ArbNoCredPropReport from "@/views/pd/dueDiliTemplate/templatePage/ArbCredProp/ArbNoCredPropReport.vue";
import ArbInveSignReport from "@/views/pd/dueDiliTemplate/templatePage/ArbInveSign/ArbInveSignReport.vue";
import ArbSubjQualSurvReport from "@/views/pd/dueDiliTemplate/templatePage/ArbSubjQualSurv/ArbSubjQualSurvReport.vue";
import BorrowerMontIncomeReport from "@/views/pd/dueDiliTemplate/templatePage/ArbPayAbilitySurv/BorrowerMontIncomeReport.vue";
import BorrowerMontIncomeStruReport from "@/views/pd/dueDiliTemplate/templatePage/ArbPayAbilitySurv/BorrowerMontIncomeStruReport.vue";
import ArbLoanPurposeSurvReport from "@/views/pd/dueDiliTemplate/templatePage/ArbLoanPurposeSurv/ArbLoanPurposeSurvReport.vue";
import ArbBasicAndGuarReport from "@/views/pd/dueDiliTemplate/templatePage/ArbBasicAndGuar/ArbBasicAndGuarReport.vue";
import ArbReviewerOpinionReport from "@/views/pd/dueDiliTemplate/templatePage/ArbReviewerOpinion/ArbReviewerOpinionReport.vue";
import ArbBorrowerReport from "@/views/pd/dueDiliTemplate/templatePage/ArbBorrower/ArbBorrowerReport.vue";
import ArbBorrowerSpouseReport from "@/views/pd/dueDiliTemplate/templatePage/ArbBorrowerSpouse/ArbBorrowerSpouseReport.vue";
import ArbRealEstateReport from "@/views/pd/dueDiliTemplate/templatePage/ArbRealEstate/ArbRealEstateReport.vue";
import ArbExternalEquityReport from "@/views/pd/dueDiliTemplate/templatePage/ArbExternalEquity/ArbExternalEquityReport.vue";
import ArbBankAssetsReport from "@/views/pd/dueDiliTemplate/templatePage/ArbBankAssets/ArbBankAssetsReport.vue";
import ArbFundReport from "@/views/pd/dueDiliTemplate/templatePage/ArbFund/ArbFundReport.vue";
import ArbFammBankDebtReport from "@/views/pd/dueDiliTemplate/templatePage/ArbFammBankDebt/ArbFammBankDebtReport.vue";
import ArbOtherLiabilitiesReport from "@/views/pd/dueDiliTemplate/templatePage/ArbOtherLiabilities/ArbOtherLiabilitiesReport.vue";
import ArbBorrowerInveProeReport from "@/views/pd/dueDiliTemplate/templatePage/ArbBorrowerInveProe/ArbBorrowerInveProeReport.vue";
import ArbBorrowerInveBuseReport from "@/views/pd/dueDiliTemplate/templatePage/ArbBorrowerInveBuse/ArbBorrowerInveBuseReport.vue";
import ArbBorrowerSeriReport from "@/views/pd/dueDiliTemplate/templatePage/ArbBorrowerSeri/ArbBorrowerSeriReport.vue";
import ArbBuscLiabReport from "@/views/pd/dueDiliTemplate/templatePage/ArbBuscLiab/ArbBuscLiabReport.vue";
import ArbEnteOperationReport from "@/views/pd/dueDiliTemplate/templatePage/ArbEnteOperation/ArbEnteOperationReport.vue";
import ArbLoanReasonPurpReport from "@/views/pd/dueDiliTemplate/templatePage/ArbLoanReasonPurp/ArbLoanReasonPurpReport.vue";
import ArbLoanRationalityAnalReport from "@/views/pd/dueDiliTemplate/templatePage/ArbLoanRationalityAnal/ArbLoanRationalityAnalReport.vue";
import ArbRepaySourceAnalReport from "@/views/pd/dueDiliTemplate/templatePage/ArbRepaySourceAnal/ArbRepaySourceAnalReport.vue";
import ArbLoanCollateralReport from "@/views/pd/dueDiliTemplate/templatePage/ArbLoanCollateral/ArbLoanCollateralReport.vue";
import ArbCollateralAsseAnalReport from "@/views/pd/dueDiliTemplate/templatePage/ArbCollateralAsseAnal/ArbCollateralAsseAnalReport.vue";
import ArbGuarantorSituReport from "@/views/pd/dueDiliTemplate/templatePage/ArbGuarantorSitu/ArbGuarantorSituReport.vue";
import ArbBorrAndBankCoopReport from "@/views/pd/dueDiliTemplate/templatePage/ArbBorrAndBankCoop/ArbBorrAndBankCoopReport.vue";
import ArbFeasRiskAnalReport from "@/views/pd/dueDiliTemplate/templatePage/ArbFeasRiskAnal/ArbFeasRiskAnalReport.vue";
import ArbFeasRiskAnalReport2 from "@/views/pd/dueDiliTemplate/templatePage/ArbFeasRiskAnal/ArbFeasRiskAnalReport2.vue";
import ArbConcObseReport from "@/views/pd/dueDiliTemplate/templatePage/ArbConcObse/ArbConcObseReport.vue";
import ArbConcObseReport2 from "@/views/pd/dueDiliTemplate/templatePage/ArbConcObse/ArbConcObseReport2.vue";
import ArbSmamLoanApplFamiReport from "@/views/pd/dueDiliTemplate/templatePage/ArbSmamLoanApplFami/ArbSmamLoanApplFamiReport.vue";
import ArbCreditHistoryReport from "@/views/pd/dueDiliTemplate/templatePage/ArbCreditHistory/ArbCreditHistoryReport.vue";
import ArbProjectFundPlanReport from "@/views/pd/dueDiliTemplate/templatePage/ArbProjectFundPlan/ArbProjectFundPlanReport.vue";
import ArbMainBusiReport from "@/views/pd/dueDiliTemplate/templatePage/ArbMainBusi/ArbMainBusiReport.vue";
import ArbBusiAssoReport from "@/views/pd/dueDiliTemplate/templatePage/ArbBusiAsso/ArbBusiAssoReport.vue";
import ArbOpehAndCapaManageReport from "@/views/pd/dueDiliTemplate/templatePage/ArbOpehAndCapa/ArbOpehAndCapaManageReport.vue";
import ArbMainCustBusiReport from "@/views/pd/dueDiliTemplate/templatePage/ArbMainCustBusi/ArbMainCustBusiReport.vue";
import ArbCoBorrGuarReport from "@/views/pd/dueDiliTemplate/templatePage/ArbCoBorrGuar/ArbCoBorrGuarReport.vue";
import ArbConcSuggReport from "@/views/pd/dueDiliTemplate/templatePage/ArbConcSugg/ArbConcSuggReport.vue";
import OperatingIndicatorsReport from "@/views/pd/dueDiliTemplate/templatePage/InterIndustryCust/operatingIndicators/OperatingIndicatorsReport.vue";
import RatingInformationReport from "@/views/pd/dueDiliTemplate/templatePage/InterIndustryCust/ratingInformation/RatingInformationReport.vue";
import CreditAssessmentReport from "@/views/pd/dueDiliTemplate/templatePage/InterIndustryCust/creditAssessment/CreditAssessmentReport.vue";
import relationshipGraphReport from "@/views/pd/dueDiliTemplate/templatePage/GroupCust/relationshipGraph/relationshipGraphReport.vue";
import entBaseInfoReport from "@/views/pd/dueDiliTemplate/templatePage/EntCust/baseInfo/entBaseInfoReport.vue";

// -------额度冻结解冻申请---------//
import creditFreezIntoPost from "@/views/icms/creditFreezThaw/creditFreezIntoPost.vue";
import terminIntopostAppl from "@/views/icms/creditFreezThaw/creditTermin/terminIntopostAppl.vue";
import dueSpringboard from "@/views/pd/dueDiliTemplate/springboard.vue";
import infoDueSpringboard from "@/views/pd/dueDiliTemplate/infomationCollect/infoSpringboard.vue";
//额度提前终止申请//--------------------------------//

import lookInterviewImageBtn from "@/views/cs/assistManage/interview/work/lookInterviewImageBtn.vue"; // 外访影像查看
import batchView from "@/views/pd/prod/joinLendProd/batchView.vue"; // 批量交易组视图

export default {
  ProdTemplate,
  ProdTemplateView,
  sellProductAddSecond,
  sellProductAddFirst,
  sellProductRela,
  lookAgreementBtn,
  sellProductAddSecondDetail,
  sellProductRelaDetail,
  minioUploadButton,
  springboard,
  prodContentsTree,
  htmlRender,
  prodLayout,
  prodParamsAdd,
  otherParamsInfo,
  creditFreezIntoPost,
  terminIntopostAppl,
  templatePageSort,
  dueSpringboard,
  infoDueSpringboard,
  ArbOpehAndCapaManage,
  ArbOpehAndCapaManageInfo,
  DueTemplateReport,
  DueTemplateReportCust,
  DueTemplateReportView,
  ArbCustReport,
  ArbContReport,
  ArbGuarReport,
  ArbClientLetterReport,
  ArbClientDeclareReport,
  ArbConfSignReport,
  ArbCredPropReport,
  ArbNoCredPropReport,
  ArbInveSignReport,
  ArbSubjQualSurvReport,
  BorrowerMontIncomeReport,
  BorrowerMontIncomeStruReport,
  ArbLoanPurposeSurvReport,
  ArbBasicAndGuarReport,
  ArbNatuPersonGuarUndeReport,
  ArbGuarCreditSituSurvReport,
  ArbGuarJudgeOpinionReport,
  ArbGuaranteeSurvrReport,
  ArbFristInvestigatorOpinionReport,
  ArbSecondInvestigatorOpinionReport,
  ArbReviewerOpinionReport,
  ArbBorrowerReport,
  ArbBorrowerSpouseReport,
  ArbRealEstateReport,
  ArbExternalEquityReport,
  ArbBankAssetsReport,
  ArbFundReport,
  ArbFammBankDebtReport,
  ArbOtherLiabilitiesReport,
  ArbBorrowerInveProeReport,
  ArbBorrowerInveBuseReport,
  ArbBorrowerSeriReport,
  ArbBuscLiabReport,
  ArbEnteOperationReport,
  ArbLoanReasonPurpReport,
  ArbLoanRationalityAnalReport,
  ArbRepaySourceAnalReport,
  ArbLoanCollateralReport,
  ArbCollateralAsseAnalReport,
  ArbGuarantorSituReport,
  ArbBorrAndBankCoopReport,
  ArbFeasRiskAnalReport,
  ArbFeasRiskAnalReport2,
  ArbConcObseReport,
  ArbConcObseReport2,
  ArbSmamLoanApplFamiReport,
  ArbCreditHistoryReport,
  ArbProjectFundPlanReport,
  ArbMainBusiReport,
  ArbBusiAssoReport,
  ArbOpehAndCapaManageReport,
  ArbMainCustBusiReport,
  ArbCoBorrGuarReport,
  ArbConcSuggReport,
  lookInterviewImageBtn,
  CreditInfoReport,
  ApplyerBaseInfoReport,
  OperatingIndicatorsReport,
  RatingInformationReport,
  CreditAssessmentReport,
  GroupCustHistoryReport,
  ManagerModelReport,
  MainBusiReport,
  AssetsAnalysisReport,
  debtAnalysisReport,
  situationAnalysisReport,
  profitAndLossAnalysisReport,
  busiPlanReport,
  punishmentReport,
  diligenceConclusionReport,
  baseInfoReport,
  shareholderReport,
  executivesReport,
  relationshipGraphReport,
  entBaseInfoReport,
  batchView
}
