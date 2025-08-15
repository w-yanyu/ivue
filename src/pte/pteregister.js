// 导入自定义模板页面的规范，按照下面注释添加import注册test模板的方式添加即可

import dashboard from "@/views/dashboard/index.vue";
import icmsRegister from "@/views/icms/icmsRegister.js";
import icmsPdRegister from "@/views/pd/icmsPdRegister.js";
import pdRegister from "@/views/product/pdRegister.js";
import coRegister from "@/views/co/coRegister.js";
import plRegister from "@/views/pl/plRegister.js";
import usRegister from "@/views/us/usRegister.js";
import mkRegister from "@/views/mk/mkRegister.js";
import ptRegister from "@/views/pt/ptRegister.js";
import riskRegister from "@/views/risk/riskRegister.js";
import csRegister from "@/views/cs/csRegister.js";
import lxykRegister from "@/views/lxyk/lxykRegister.js";
import personal from "@/views/modules/personal";
import checkAuth from "@/views/modules/personal";
import BuildTodoNext from "@/views/modules/BuildTodoNext";
import commonComponets from "COM/commonComponets"; // 公共模块组件
import user_charts from "@/views/modules/user_charts.vue";
import updatePassword from "@/views/ismt/ct/user/UpdatePassword.vue";
import updatePasswordNew from "@/views/ismt/ct/user/UpdatePasswordNew.vue";
import ResetPassword from "@/views/ismt/ct/user/ResetPassword.vue";
import ResetPasswordNew from "@/views/ismt/ct/user/ResetPasswordNew.vue";
import FirstPsdUpdate from "@/views/dashboard/FirstPsdUpdate.vue";
import autoLock from "@/views/autoLock/index.vue";
import SceneCharge from "@/views/modules/SceneCharge.vue";
import ChannelManagementAdd from "@/views/modules/ChannelManagementAdd";
import MenuManager from "@/views/ismt/ct/menu/menuManager/MenuManager"; // 菜单管理组件
import RloeMenuManager from "@/views/ismt/ct/roleManager/role-manager-menuManagerLeft"; // 角色资源配置菜单管理组件
import DocumentAgreement from "@/views/pt/pt_consult_uphold/DocumentAgreement"; // 文件上传组件
import DocumentAgreementupd from "@/views/pt/pt_consult_uphold/DocumentAgreementupd"; // 文件上传组件
import DocumentAgreementsee from "@/views/pt/pt_consult_uphold/DocumentAgreementsee"; // 查看上传组件
import ProcessImgView from "@/views/msap/bpm/processManagement/design/process-img-view"; // 流程图预览组件
import DHProcessImgView from "@/views/dhpo/process/design/process-img-view"; // 流程图预览组件
import CSProcessImgView from "@/views/cspo/process/design/process-img-view"; // 流程图预览组件
import CRProcessImgView from "@/views/cr/process/design/process-img-view.vue"; // 信用评级流程图预览组件
// import COLProcessImgView from "@/views/cols/process/design/process-img-view.vue"; // 押品流程图预览组件
import WaitToDoDeal from "@/views/workbench/wait_todo/WaitToDoDeal"; // 工作台首页 代办 办理头部
import CommWaitToDoDeal from "@/views/msap/bpm/workbench/wait_todo/WaitToDoDeal"; // 公共工作台首页 代办 办理头部
import CommAlreadyDoDetail from "@/views/msap/bpm/workbench/already_do/AlreadyDoDetail"; // 工作台首页 已办详情
import AlreadyDoDetail from "@/views/workbench/already_do/AlreadyDoDetail.vue"; // 工作台首页 已办详情
import CreditSubmitBtn from "@/views/us/usManager/creditInformation/CreditSubmitBtn"; // 授信流程提交
import GroupCreditSubmitBtn from "@/views/us/usManager/creditInformation/GroupCreditSubmitBtn"; // 集团授信流程提交
import Downlog from "@/views/workbench/downlog"; // 日志下载
import dhWaitToDoDeal from "@/views/workbench/dhWorkBench/dh_wait_todo/WaitToDoDeal"; // 贷后工作台首页 代办 办理头部
import TaskGetConfirm from "@/views/workbench/dhWorkBench/dh_wait_todo/TaskGetConfirm"; // 领取任务确认组件
import ContactInforComponent from "@/views/modules/ContactInforComponent"; //联系人渲染组件
import BranchTreeManager from "@/views/ismt/ct/branch/BranchTreeManager"; // 机构树组件
import BranchRoleManager from "@/views/ismt/ct/branch/branchRole/BranchRoleManager.vue"; // 机构树关联角色组件
import BranchMappingManager from "@/views/ismt/ct/branch/branchMapping/BranchMappingManager.vue"; // 机构树关联角色组件
import UserBranchTreeManager from "@/views/ismt/ct/user/user-information-update/user-info-branchManagerLeft"; // 用户信息维护机构树组件
import BranchInfoRevoke from "@/views/ismt/ct/branch/BranchInfoRevoke.vue"; // 机构撤并页面
import BranchBusiness from "@/views/ismt/ct/branch/BranchBusiness.vue"; // 机构业务移交页面
import QuotaManager from "@/views/bl/businesslimit/QuotaManager"; // 额度结构组价
import ManualSubmit from "@/views/ac/assetClassifyManager/ManualSubmit"; // 手动五级分类组件
import InternetVerification from "@/views/workbench/wait_todo/InternetVerification"; // 互联网核查基本信息组件
import dhInternetVerification from "@/views/workbench/dhWorkBench/dh_wait_todo/InternetVerification";
import InternetUserInfo from "../views/integrated/credit_application/InternetUserInfo";
import creditapplicationview from "../views/integrated/credit_application/creditapplicationview.vue";
import loadnPostComponents from "@/views/other/loanPostManager/loadnPostComponents";
import dhComponents from "@/views/dh/processStart/dhComponets/dhComponents"; //贷后工作台组件
import UserImageInfo from "@/views/ci/InformationManager/UserImageInfo"; //客户影像件组件
import ApprovalCharts from "@/views/other/ApprovalCharts"; // 审批图表组件
import loanPostComponents from "@/views/other/loanPostManager/loanPostComponents/loanPostComponent"; // 贷后模块组件
import ExceptHandleResult from "@/views/other/loanPostManager/HuiFangGuanli/ExceptHandleResult"; // 贷后模块组件
import PictProductMange from "@/views/other/loanPostManager/HuiFangGuanli/PictProductMange"; // 贷后模块组件
import AlredyToDoDetails from "@/views/workbench/dhWorkBench/dh_wait_todo/AlredyToDoDetails"; // 工作台首页 代办 办理头部
import ExceptEcho from "@/views/other/loanPostManager/HuiFangGuanli/ExceptEcho"; // 工作台首页 代办 办理头部
import PictProductEcho from "@/views/other/loanPostManager/HuiFangGuanli/PictProductEcho"; // 工作台首页 代办 办理头部
import plComponents from "../views/ce/components/plComponents"; // 催收模块组件
import waibaoinfo from "@/views/ce/collParamManage/outsourcerManger/outsourcerTable/outevaluation/waibaoinfo"; // 催收外包商评价
import OutEvalUpdate from "@/views/ce/collParamManage/outsourcerManger/outsourcerTable/outevaluation/OutEvalUpdate"; // 催收外包商评价经办
import OutEvalView from "@/views/ce/collParamManage/outsourcerManger/outsourcerTable/outevaluation/OutEvalView"; // 催收外包商评价查看
import outinformation from "@/views/ce/collParamManage/outsourcerManger/outsourcerTable/outinfwaibaoshang/outinformation";
import outinformationView from "@/views/ce/collParamManage/outsourcerManger/outsourcerTable/outinfwaibaoshang/outinformationView";
import outinformationUpdate from "@/views/ce/collParamManage/outsourcerManger/outsourcerTable/outinfwaibaoshang/outinformationUpdate";
import OutSoucInfoManagexxbg from "@/views/ce/collParamManage/outsourcerManger/outsourcerInfoManage/OutSoucInfoManagexxbg.vue"; //外包商信息变更
import OutSoucInfoManagexxbgUpdate from "@/views/ce/collParamManage/outsourcerManger/outsourcerInfoManage/OutSoucInfoManagexxbgUpdate.vue"; //外包商信息变更更新（经办岗位）
import OutSoucInfoManagexxbgUpdateSearch from "@/views/ce/collParamManage/outsourcerManger/outsourcerInfoManage/OutSoucInfoManagexxbgUpdateSearch.vue"; //外包商信息变更更新（复核、授权、二级授权）
import outsourcerConfirmxxxg from "@/views/ce/collParamManage/outsourcerManger/outsourcerInfoManage/outsourcerConfirmxxxg.vue"; //外包商工商信息修改
import outsourcerConfirmxxxgUpdate from "@/views/ce/collParamManage/outsourcerManger/outsourcerInfoManage/outsourcerConfirmxxxgUpdate.vue"; //外包商工商信息修改更新(经办岗)
import outsourcerConfirmxxxgUpdateSearch from "@/views/ce/collParamManage/outsourcerManger/outsourcerInfoManage/outsourcerConfirmxxxgUpdateSearch.vue"; //外包商工商信息修改更新(复核、授权、二级授权)
import outinfpsxzbb from "@/views/ce/collParamManage/outsourcerManger/outsourcerTable/outinfwaibaoshang/outinfpsxzbb";
import keepCase from "@/views/ce/collManage/oaManage/pendDivision/keepCase.vue";
import approvalRolePwd from "@/views/cspo/process/products/role/approvalRolePwd"; //催收审批角色管理组件
import OutsourcerMangerment from "@/views/ce/collParamManage/outsourcerManger/OutsourcerMangerment"; //采购评审结果录入
import OutsourcerUpld from "@/views/ce/collParamManage/outsourcerManger/OutsourcerUpld"; //采购评审结果上传
import DhapprovalRoleManager from "@/views/dhpo/process/products/role/DhapprovalRoleManager.vue"; //贷后审批角色管理组件
import ApplicationRetent from "@/views/ce/collManage/oaManage/pendDivision/ApplicationRetent.vue";
import ApplicationRetentView from "@/views/ce/collManage/oaManage/pendDivision/ApplicationRetentView.vue";
import OutsourcerView from "@/views/ce/collParamManage/outsourcerManger/outsourcerTable/OutsourcerView"; //外包商一览表查看详情
import ApplicationRetentUpdate from "@/views/ce/collManage/oaManage/pendDivision/ApplicationRetentUpdate.vue";
import workbenchComponents from "@/views/workbench/workbenchComponents/workbenchComponents"; // 工作台模块组件
import BpmTaskGetConfirm from "@/views/workbench/bpmWorkBench/bpm_into_pool/BpmTaskGetConfirm"; // 工作台模块组件
import BpmClaimWorkBench from "@/views/workbench/bpmWorkBench/bpm_into_pool/BpmClaimWorkBench"; // 待认领工作台
import BpmDealWorkBench from "@/views/workbench/bpmWorkBench/bpm_wait_todo/BpmDealWorkBench"; // 待处理工作台
import HandleCreditApproval from "@/views/workbench/bpmWorkBench/bpm_wait_todo/HandleCreditApproval"; // 审批工作台详情页-授信核准
import HandleProApproval from "@/views/workbench/bpmWorkBench/bpm_wait_todo/HandleProApproval"; // 审批工作台详情页-专家审批
import FaceMatching from "@/views/workbench/bpmWorkBench/bpm_wait_todo/FaceMatching"; // 审批工作台详情页-人脸对比页面
import QualityCheck from "@/views/integrated/offline_applicationInfo/QualityCheck"; // 线下产品质检查询详情页
import legalPersonFocusEvent from "@/views/modules/legalPersonFocusEvent"; // 风险级别
import legalPersonFocusEvent1 from "@/views/modules/legalPersonFocusEvent1"; // 法人关注事件
import PersonFocusEvent from "@/views/us/usManager/creditInformation/allApptDetail/PersonFocusEvent"; // 风险级别
import PersonFocusEvent1 from "@/views/us/usManager/creditInformation/allApptDetail/PersonFocusEvent1"; // 法人关注事件
import ScaleCalculate from "@/views/us/entManager/scaleCalculate.vue"; // 规模计算
import crResultInfoView from "@/views/cr/workbench/crResultInfo.vue"; // 信用评级结果
import crResultInfo from "@/views/cr/manage/result/crResultInfo.vue"; // 信用评级结果编辑
import CRSetTemplate from "@/views/cr/params/template/CRSetTemplate"; // 信用评级模板设置
import correlationManagement from "@/views/us/usManager/groupCustomers/correlationManagement/correlationManagement"; // 集团客户关联关系管理
import PersonalCreditRatNoFinancial from "@/views/modules/PersonalCreditRatNoFinancial"; // 个人信用评级--非财务因素
import financialFactors from "@/views/cr/manage/financialFactors.vue"; // 信用评级财务因素页面
import nonFinancialFactors from "@/views/cr/manage/nonFinancialFactors.vue"; // 信用评级财务因素页面
import nonFinancialFactorsForm from "@/views/cr/workbench/nonFinancialFactors.vue";
import adjustResult from "@/views/cr/manage/result/adjustResult.vue"; // 信用评级财务因素页面
import crWaitToDoDeal from "@/views/cr/workbench/cr_wait_todo/WaitToDoDeal.vue"; // 信用评级工作台首页 代办 办理头部
import CRWaitToDoDeal from "@/views/cr/manage/CRWaitToDoDeal.vue";
import DHWaitToWithDeal from "@/views/dh/atpy/query/DHWaitToWithDeal.vue"; // 贷后还款账户变更历史查询 代办 办理头部
import DHTransferHandover from "@/views/dh/atpy/query/DHTransferHandover.vue"; // 贷后资产移交变更历史查询 代办 办理头部
import DHAssetsaleHandover from "@/views/dh/atpy/query/DHAssetsaleHandover.vue"; // 贷后资产转让变更历史查询 代办 办理头部
import warningWorkbench from "@/views/wa/workbench/warningWorkbench.vue"; // 贷后中心风险预警工作
import warningWorkbenchSelect from "@/views/wa/workbench/warningWorkbenchSelect.vue"; // 贷后中心预警工单查询
import BalanceSheet from "@/views/us/financialManager/custReportDataManager/balanceSheet.vue"; // 资产负债表界面
import CashFlowStatement from "@/views/us/financialManager/custReportDataManager/cashFlowStatement.vue"; // 现金流量表界面
import FinancialStatements from "@/views/modules/FinancialStatements"; // 财务报表
import CustInfo from "@/views/us/CustInfo"; //调用客户详情中间页面
import FinancialStatementTemplateDefinition from "@/views/us/financialManager/financialStatementTemplateDefinition.vue"; // 财务报表模板定义
import FinancialStatementsCustomization from "@/views/modules/FinancialStatementsCustomization"; // 财务报表自定义
import corporateCustomerFinancialStatements from "@/views/us/entManager/custfinanceManager/corporateCustomerFinancialStatements.vue"; // 企业客户财务报表
import creditRecord from "@/views/us/usManager/creditApplicationInterface/creditRecord.vue"; //评级结果
import guarantyContractAdd from "@/views/us/usManager/creditApplicationInterface/guarantyContract_add"; // 保证合同申请新增
import guarantyContractExdit from "@/views/us/usManager/creditApplicationInterface/guarantyContract_exdit"; // 保证合同申请修改
import mortgageContractAdd from "@/views/us/usManager/mortpledContract/mortgageContract_add"; //抵质押合同录入
import mortgageContractEdit from "@/views/us/usManager/mortpledContract/mortgageContract_edit"; //抵质押合同修改
import contractApplyDetail from "@/views/icms/flowStart/lend/contractApplyDetail"; //贷款合同申请详情
// import ColsHouseSubmitBtn from "@/views/cols/colsHouseMsg/ColsHouseSubmitBtn.vue"; //楼盘管理流程启动--跳转按钮
import LetterGuarantee from "@/views/icms/flowStart/lend/creditBusinessStart/LetterGuarantee"; //担保函打印
// import ColsOrganizeEditSubmitBtn from "@/views/cols/colsOrganizationInfo/ColsOrganizeEditSubmitBtn";
// import ColsPersonEditSubmitBtn from "@/views/cols/colsPersonInfo/ColsPersonEditSubmitBtn"; //评估人员管理流程启动--跳转按钮
import creditSystemCols from "@/views/uccp/quotaManager/creditSystem/creditSystemCols.vue";
import companySearch from "@/views/riskManage/company/companySearch.vue";
import companyMonitor from "@/views/riskManage/monitor/companyMonitor.vue";
import newsMonitor from "@/views/riskManage/monitor/newsMonitor.vue";
import homepage from "@/views/riskManage/marketingDevelopCustom/homepage.vue";
import industrialChain from "@/views/riskManage/marketingDevelopCustom/industrialChain.vue";
import mapSearch from "@/views/riskManage/marketingDevelopCustom/mapSearch.vue";
import eventrelation from "@/views/riskManage/relation/eventrelation.vue";
import lawsuitrelation from "@/views/riskManage/relation/lawsuitrelation.vue";
import grouprelation from "@/views/riskManage/relation/grouprelation.vue";
import companyDetail from "@/views/riskManage/companyDetails/companyDetails.vue";
import companyAtlas from "@/views/riskManage/enterpriseMap/enterpriseMap.vue";
import marginContractAdd from "@/views/us/usManager/earnestMoney/marginContractAdd.vue";
import marginContractExdit from "@/views/us/usManager/earnestMoney/marginContractExdit.vue";
import ProofPrint from "@/views/dh/proof/lending/proofPrint.vue";
import metadataAdd from "@/views/msap/bpm/processManagement/policyManagement/metadataManagement/metadata_management_add.vue";
import action from "@/views/fs/plbfasujig/action.vue";
import StrategyruletabTemp from "@/views/msap/bpm/processManagement/products/node/strategy-rule-tab.vue";
import StrategyruletabNew from "@/views/msap/bpm/processManagement/products/node/rule/strategy_rule_tab_new.vue";
import UploadFile from "@/views/fs/components/UploadFile.vue";
import ApplicationRetentUpload from "@/views/fs/components/ApplicationRetentUpload.vue";
import exportOaFile from "@/views/fs/components/exportOaFile.vue";
import fsComponents from "@/views/fs/components/fsComponents.js"; //法诉组件
import appconfirmate from "@/views/fs/plbfasujig/appconfirmate.vue";
import Cognappl from "@/views/fs/cognappl/Cognappl.vue"; //收案申请组件
import companywriteoffapply from "@/views/dh/lawsuit/companywriteoffapply.vue"; //公司承担费用销账申请
import confirmationresult from "@/views/dh/lawsuit/confirmationresult.vue"; //公司承担费用销账申请
import exportApplication from "@/views/fs/plbfasujig/exportApplication.vue";
import ExportAssureList from "@/views/fs/payfeesAccManage/ExportAssureList.vue"; //保全信息导出
import actionAtLaw from "@/views/fs/actionAtLaw"; // 法诉组件customerBasicInfoLookUpTree.vue
import jsonLookUpTree from "@/views/modules/lookUpTreeForJson.vue"; //json使用的查找树
// import comparativeAnalysisCollateral from "@/views/cols/colsAnalysis/comparativeAnalysisCollateral.vue"; //客户基本信息修改查找树
import groupCustStructure from "@/views/us/groupManager/groupCustStructure.vue";
// import AppraisementOutEntry from "@/views/cols/colsAppraisement/AppraisementOutEntry.vue";
// import AppraisementInEntry from "@/views/cols/colsAppraisement/AppraisementInEntry.vue";
import GroupMainApply from "@/views/us/usManager/creditApply/GroupMainApply.vue"; // 集团客户授信额度分项
import SubMainApply from "@/views/us/usManager/creditApply/subCredit/SubMainApply.vue"; // 子客户授信额度分项
import CreditMasterInfo from "@/views/us/usManager/creditApply/creditMaster_info.vue"; // 授信主信息
import QrGroupMainApply from "@/views/us/usManager/creditApply/query/GroupMainApply.vue"; // 集团客户统一授信查看
import QrSubMainApply from "@/views/us/usManager/creditApply/query/subCredit/SubMainApply.vue"; // 集团子客户统一授信查看
// import evaluateResult from "@/views/cols/colsAppraisement/evaluateResult.vue";
import CreditApplicationInfo from "@/views/integrated/credit_tdapplication/credit_master_info.vue"; // 授信主信息
import specialAdjustAppl from "@/views/us/specialManage/application/special_adjust_appl.vue";
import specialAdjustApplModify from "@/views/us/specialManage/application/special_adjust_appl_modify.vue";
import specialAdjustAppr from "@/views/us/specialManage/approval/special_adjust_appr.vue";
import Repayment from "@/views/dh/advanceSpecial/ActiveRepayment/Repayment.vue"; // 主动还款
import specialAdjustQuery from "@/views/us/specialManage/approval/special_adjust_query.vue";
import reviewDialog from "@/views/msap/review/tran_review_dialog.vue"; //复核弹框
import BusinessAdd from "@/views/pt/bussiness_manage/business_add.vue";
import BusinessUpd from "@/views/pt/bussiness_manage/business_upd.vue";
import BusinessDetail from "@/views/pt/bussiness_manage/business_detail.vue";
import BusinesshsDetail from "@/views/pt/bussiness_manage/bussinesshs_detail.vue";
import decorateLendAppliyStart from "@/views/icms/flowStart/lend/decorateLendAppliyStart/decorateLendAppliyStart.vue"; //装修贷出账流程启动页面
import decorateCreditAppliyStart from "@/views/icms/flowStart/lend/decorateCreditAppliyStart/decorateCreditAppliyStart.vue"; //装修贷出账流程启动页面
import decorateloanSoftAppliyStart from "@/views/icms/flowStart/lend/decorateloanSoftAppliyStart/decorateloanSoftAppliyStart.vue"; //装修贷出账流程启动页面
import corProjectAddFirst from "@/views/pt/partnerProjrctManage/cor_project_add.vue"; //合作项目新增
import projectAddLayout from "@/views/pt/partnerProjrctManage/pro_add_layout.vue";
import projectAddLayoutView from "@/views/pt/partnerProjrctManage/pro_add_layout_view.vue";
import projectAddLayoutModify from "@/views/pt/partnerProjrctManage/pro_add_layout_modify.vue";
import projectAddSecond from "@/views/pt/partnerProjrctManage/projectAddSecond.vue";
import projectAddSecondDetail from "@/views/pt/partnerProjrctManage/projectAddSecondDetail.vue";
import projRela from "@/views/pt/partnerProjrctManage/projRela.vue";
import projRelaDetail from "@/views/pt/partnerProjrctManage/projRelaDetail.vue";
import agreePartMain from "@/views/pt/partnerProjrctManage/patrs/agreement/agree_part_main.vue";
import agreeBaseInfoAdd from "@/views/pt/partnerProjrctManage/patrs/agreement/baseinfo/agreement_baseinfo_add.vue";
import projfileUpload from "@/views/pt/partnerProjrctManage/patrs/uploadfile/file_upload.vue";
import projfileModify from "@/views/pt/partnerProjrctManage/patrs/uploadfile/file_md.vue";
import babillInfo from "../views/integrated/babillInfo/babill_relvc_info.vue";
import dutyAfirm from "../views/pl/assetPreserve/dutyAfirm/dutyAfirm.vue";
import dutyAfirmRew from "../views/pl/assetPreserve/dutyAfirm/dutyAfirmRew.vue";
import dutyAfirmSub from "../views/pl/assetPreserve/dutyAfirm/dutyAfirSubmit.vue";
import assetLoanInfoAdd from "../views/pl/assetPreserve/assetReceive/assetLoanInfoAdd.vue";
import flowDesigner from "@/views/msap/bpm/processManagement/processModel/flowDesigner/index.vue";
import processProdTemCheck from "@/views/msap/bpm/processManagement/products/process_prodTem_check.vue";
import layoutDesigner from "@/views/ismt/ct/layout/layoutDesigner.vue";
import layoutTempDesigner from "@/views/ismt/ct/layoutTemp/layoutTempDesigner.vue";
import layoutTempLook from "@/views/ismt/ct/layoutTemp/layoutTempLook.vue";
import echartsDemo from "@/views/ismt/ct/layout/echartsDemo.vue";
import clMonitorProcessConsum from "@/views/msap/bpm/bpmMonitorOptim/clMonitorProcessConsum.vue";
import clMonitorBusiStati from "@/views/msap/bpm/bpmMonitorOptim/clMonitorBusiStati.vue";
import clMonitorProcessStati from "@/views/msap/bpm/bpmMonitorOptim/clMonitorProcessStati.vue";
import acceMonitorProcessConsum from "@/views/msap/bpm/bpmMonitorOptim/acceMonitorProcessConsum.vue";
import acceMonitorProcessStati from "@/views/msap/bpm/bpmMonitorOptim/acceMonitorProcessStati.vue";
import acceMonitorBusiStati from "@/views/msap/bpm/bpmMonitorOptim/acceMonitorBusiStati.vue";
import coMonitorProcessConsum from "@/views/msap/bpm/bpmMonitorOptim/coMonitorProcessConsum.vue";
import coMonitorProcessStati from "@/views/msap/bpm/bpmMonitorOptim/coMonitorProcessStati.vue";
import coMonitorBusiStati from "@/views/msap/bpm/bpmMonitorOptim/coMonitorBusiStati.vue";
import crMonitorProcessConsum from "@/views/msap/bpm/bpmMonitorOptim/crMonitorProcessConsum.vue";
import crMonitorProcessStati from "@/views/msap/bpm/bpmMonitorOptim/crMonitorProcessStati.vue";
import crMonitorBusiStati from "@/views/msap/bpm/bpmMonitorOptim/crMonitorBusiStati.vue";
import dislnMonitorProcessConsum from "@/views/msap/bpm/bpmMonitorOptim/dislnMonitorProcessConsum.vue";
import dislnMonitorProcessStati from "@/views/msap/bpm/bpmMonitorOptim/dislnMonitorProcessStati.vue";
import dislnMonitorBusiStati from "@/views/msap/bpm/bpmMonitorOptim/dislnMonitorBusiStati.vue";
import intrMonitorProcessConsum from "@/views/msap/bpm/bpmMonitorOptim/intrMonitorProcessConsum.vue";
import intrMonitorProcessStati from "@/views/msap/bpm/bpmMonitorOptim/intrMonitorProcessStati.vue";
import intrMonitorBusiStati from "@/views/msap/bpm/bpmMonitorOptim/intrMonitorBusiStati.vue";
import letgMonitorProcessConsum from "@/views/msap/bpm/bpmMonitorOptim/letgMonitorProcessConsum.vue";
import letgMonitorProcessStati from "@/views/msap/bpm/bpmMonitorOptim/letgMonitorProcessStati.vue";
import letgMonitorBusiStati from "@/views/msap/bpm/bpmMonitorOptim/letgMonitorBusiStati.vue";
import loanMonitorProcessConsum from "@/views/msap/bpm/bpmMonitorOptim/loanMonitorProcessConsum.vue";
import loanMonitorProcessStati from "@/views/msap/bpm/bpmMonitorOptim/loanMonitorProcessStati.vue";
import loanMonitorBusiStati from "@/views/msap/bpm/bpmMonitorOptim/loanMonitorBusiStati.vue";
import ltbkMonitorProcessConsum from "@/views/msap/bpm/bpmMonitorOptim/ltbkMonitorProcessConsum.vue";
import ltbkMonitorProcessStati from "@/views/msap/bpm/bpmMonitorOptim/ltbkMonitorProcessStati.vue";
import ltbkMonitorBusiStati from "@/views/msap/bpm/bpmMonitorOptim/ltbkMonitorBusiStati.vue";
import ltteMonitorProcessConsum from "@/views/msap/bpm/bpmMonitorOptim/ltteMonitorProcessConsum.vue";
import ltteMonitorProcessStati from "@/views/msap/bpm/bpmMonitorOptim/ltteMonitorProcessStati.vue";
import ltteMonitorBusiStati from "@/views/msap/bpm/bpmMonitorOptim/ltteMonitorBusiStati.vue";
import lttwMonitorProcessConsum from "@/views/msap/bpm/bpmMonitorOptim/lttwMonitorProcessConsum.vue";
import lttwMonitorProcessStati from "@/views/msap/bpm/bpmMonitorOptim/lttwMonitorProcessStati.vue";
import lttwMonitorBusiStati from "@/views/msap/bpm/bpmMonitorOptim/lttwMonitorBusiStati.vue";
import plMonitorProcessConsum from "@/views/msap/bpm/bpmMonitorOptim/plMonitorProcessConsum.vue";
import plMonitorProcessStati from "@/views/msap/bpm/bpmMonitorOptim/plMonitorProcessStati.vue";
import plMonitorBusiStati from "@/views/msap/bpm/bpmMonitorOptim/plMonitorBusiStati.vue";
import certconf_timeline from "@/views/icms/certconf/certconf_timeline.vue";
import privateBaseUser from "@/views/us/viewManage/page/private/baseInfo/base_info.vue";
import privateUserSpouse from "@/views/us/viewManage/page/private/spouseInfo/spouse_info.vue";
import privateUserFamily from "@/views/us/viewManage/page/private/familyInfo/family_info.vue";
import privateUserBusi from "@/views/us/viewManage/page/private/busiInfo/busi_info.vue";
import privateUserCredit from "@/views/us/viewManage/page/private/creditInfo/credit_info.vue";
import privateUserRisk from "@/views/us/viewManage/page/comm/risKWarn/riskWarning_info.vue";
import cardNotice from "@/views/dashboard/cards/notice.vue";
import cardNoticeInfo from "@/views/dashboard/cards/notice_info.vue";
import cardBusApability from "@/views/dashboard/cards/bus_apability.vue";
import cardBusApability2 from "@/views/dashboard/cards/bus_apability2.vue";
import cardBusPortal from "@/views/dashboard/cards/bus_portal.vue";
import cardBusPortalConfig from "@/views/dashboard/cards/bus_portal_config.vue";
import cardLoanDiscounts from "@/views/dashboard/cards/loan_discounts.vue";
import cardClientView from "@/views/dashboard/cards/client_view.vue";
import cardClientViewConfig from "@/views/dashboard/cards/client_view_config.vue";
import timelineDemo from "@/views/dashboard/timelineDemo.vue";
import checkWfProduct from "@/views/msap/bpm/processManagement/products/check_wf_product.vue";
import WfProductSett from "@/views/msap/bpm/processManagement/products/process_busi_param_view.vue";
import packgeHistIncome from "@/views/pl/assetPackage/packageAsset/view/packageHistIncomeChart.vue";
import packageRiskChart from "@/views/pl/assetPackage/packageAsset/view/packageRiskChart.vue";
import packageIntendChart from "@/views/pl/assetPackage/packageAsset/view/packageIntendChart.vue";
import froecastChart from "@/views/pl/assetPackage/mobility/mobilityForecastChart.vue";
import deviationChart from "@/views/pl/assetPackage/mobility/deviationChart.vue";
import froecastChartPre from "@/views/pl/assetPackage/mobility/mobilityForecastChartPre.vue";
import printConfig from "@/views/components/printConfig.vue";
import riskCombineRule from "@/views/risk/risk_combine_rule/index";
import riskCombineRuleReview from "@/views/risk/risk_combine_rule_review/index";
import riskNewCombineRule from "@/views/risk/risk_rule_new/views/Home";
import riskNewCombineRuleView from "@/views/risk/risk_rule_new/views/risk_combine_rule_view";
import riskScoreCardModelEdit from "@/views/risk/risk_score_card/risk_score_card_model_edit";
import riskScoreCardModelEditNew from "@/views/risk/risk_score_card/risk_score_card_model_edit_new";
import riskScoreCardModelEditEdit from "@/views/risk/risk_score_card/risk_score_card_model_edit_edit";
import riskScoreCardModelEditEditNew from "@/views/risk/risk_score_card/risk_score_card_model_edit_edit_new";
import riskScoreCardModelEditEditDialog from "@/views/risk/risk_score_card/risk_score_card_model_edit_edit_dialog";
import riskScoreCardModelView from "@/views/risk/risk_score_card/risk_score_card_model_view";
import riskScoreCardModelVersionView from "@/views/risk/risk_score_card/risk_score_card_model_version_view";
import riskScoreCardTmpModelView from "@/views/risk/risk_score_card/risk_score_card_tmp_model_view";
import riskScoreCardModelViewNew from "@/views/risk/risk_score_card/risk_score_card_model_view_new";
import functionSetAll from "@/components/FunctionSet/functionSetAll";
import functionSetAllOtherLayout from "@/components/FunctionSet/functionSetAllOtherLayout";
import riskFactAdd from "@/views/risk/risk_fact/risk_fact_add";
import ruleTree from "@/views/risk/rule_tree/index";
import ruleTreeAdd from "@/views/risk/rule_tree/index_add";
import ruleTreeView from "@/views/risk/rule_tree/index_view";
import ruleTreeDel from "@/views/risk/rule_tree/index_del";
import rootRuleTreeView from "@/views/risk/rule_tree/root_rule_tree_view";
import rootRuleTreeTmpView from "@/views/risk/rule_tree/root_rule_tree_tmp_view";
import decisionTreeResult from "@/views/risk/rule_tree/decisionTreeResule.vue";
import decisionTreeResultTest from "@/views/risk/rule_tree/decisionTreeResuleTest.vue";
import rootRuleTreeEdit from "@/views/risk/rule_tree/root_rule_tree_edit";
import riskScoreCardTest from "@/views/risk/risk_score_card/risk_score_card_test";
import riskScoreCardResulrView from "@/views/risk/risk_score_card_result/risk_score_card_result_view";
import riskDecisonRule from "@/views/risk/risk_decision_rule/views/Home";
import riskDecisonRuleView from "@/views/risk/risk_decision_rule/views/risk_decision_view";
import rule_group_view from "@/views/risk/risk_decision_rule/views/rule_group_view";
import riskDecisonRuleTmpView from "@/views/risk/risk_decision_rule/views/risk_decision_tmp_view";
import riskScoreCardTestResult from "@/views/risk/risk_score_card/risk_score_card_test_result";
import riskDecisionRuleGroupEdit from "@/views/risk/risk_decision_rule/group/risk_decision_rule_group_edit.vue";
import riskRuleGroupTest from "@/views/risk/risk_decision_rule/group/risk_decision_rule_group_test";
import riskDecisionRuleTest from "@/views/risk/risk_decision_rule/risk_decision_rule_test";
import riskRuleTreeTest from "@/views/risk/rule_tree/risk_rule_tree_test.vue";
import riskRuleTreeTestResult from "@/views/risk/rule_tree/risk_rule_tree_test_result.vue";
import riskRuleTreeTestResultHit from "@/views/risk/rule_tree/risk_rule_tree_test_result_hit_list.vue";
import riskRuleTreeTestResultHitAction from "@/views/risk/rule_tree/risk_rule_tree_test_result_hit_list_action.vue";
import decisonRuleGroupVersionBack from "@/views/risk/risk_decision_rule/review/decision_rule_group_version_back.vue";
import riskScoreDetail from "@/views/risk/risk_score_card_result/risk_score_detail.vue";

import normalRuleGroupTestResult from "@/views/risk/risk_decision_rule/group/risk_decision_rule_group_test_result";
import normalRuleTestResult from "@/views/risk/risk_decision_rule/group/risk_decision_rule_test_result.vue";
import normalRuleTestResultSearch from "@/views/risk/risk_decision_rule/group/risk_decision_rule_test_result_search.vue";
import riskDecisionRuleGroupTestResultActionList from "@/views/risk/risk_decision_rule/group/risk_decision_rule_group_test_action_list";
import riskDecisionRuleGroupTestResultActionListSrearch from "@/views/risk/risk_decision_rule/group/risk_decision_rule_group_test_action_list_search";
import riskDecisionRuleGroupTestResultActionList1 from "@/views/risk/risk_decision_rule/group/risk_decision_rule_group_test_action_list1";
import riskDecisionRuleGroupAdd from "@/views/risk/risk_decision_rule/group/risk_decision_rule_group_add";
import testErroDialog from "@/components/TestErroDialog";
import riskFunctionAdd from "@/views/risk/risk_function/risk_function_add";
import ruleFlowBpmn from "@/components/BpmnFlow/index";
import riskRuleFlowTest from "@/views/risk/rule_flow/rule_flow_test";
import riskRuleFlowTestResult from "@/views/risk/rule_flow/test_result/rule_flow_test_result.vue";
import ruleFlowTestResultScoreCardDetail from "@/views/risk/rule_flow/test_result/rule_flow_test_result_score_card_detail_list.vue";
import ruleFlowTestResultNormalRuleAction from "@/views/risk/rule_flow/test_result/rule_flow_test_result_normal_rule_action_list.vue";
import decisionRuleEdit from "@/views/risk/risk_decision_rule/reform_test/risk_decision_rule_tab_new.vue";
import decisionRuleAddDialog from "@/views/risk/risk_decision_rule/reform_test/generalCom/_components/risk_decision_rule_add_dialog.vue";
import riskRuleConstantAdd from "@/views/risk/risk_rule_constant/risk_rule_constant_add.vue";
//import riskRuleConstantEdit from "@/views/risk/risk_rule_constant/risk_rule_constant_edit.vue";
import riskScoreCardTmpModelEdit from "@/views/risk/risk_score_card/risk_score_card_model_tmp_edit";
import riskTrafficTrend from "@/views/risk/risk_monitor_management/risk_traffic_info/riskTrafficTrend.vue";
import riskRealTimeTraffic from "@/views/risk/risk_monitor_management/risk_traffic_info/riskRealTimeTraffic.vue";
import riskRuleTableTest from "@/views/risk/rule_table/risk_rule_table_test.vue";

import riskFactsUpdate from "@/views/risk/risk_fact/risk_facts_update.vue";
import ruleFlowView from "@/views/risk/rule_flow/rule_flow_view.vue";
import riskDictAdd from "@/views/risk/risk_dict/risk_dict_add.vue";
import riskDictEdit from "@/views/risk/risk_dict/risk_dict_edit.vue";
import riskDictView from "@/views/risk/risk_dict/risk_dict_view.vue";
import scoreCardSimpleDialog from "@/views/risk/risk_score_card/simple_score_card_remould/simple_score_card_dialog.vue";
import simpleScoreCardTable from "@/views/risk/risk_score_card/simple_score_card_remould/simple_score_card_table.vue";
import simpleScoreCardTableView from "@/views/risk/risk_score_card/simple_score_card_remould/simple_score_card_table_view.vue";
import simpleScoreCardTmpTableView from "@/views/risk/risk_score_card/simple_score_card_remould/simple_score_card_tmp_table_view.vue";
import simpleScoreCardVersionBack from "@/views/risk/risk_score_card/simple_score_card_remould/score_card_version_back.vue";
import complexScoreCardVersionBack from "@/views/risk/risk_score_card/simple_score_card_remould/complex_score_card_version_back.vue";
import simpleScoreCardTmpVersionBack from "@/views/risk/risk_score_card/simple_score_card_remould/score_card_tmp_version_back.vue";
import simpleScoreCardVersionBackTableView from "@/views/risk/risk_score_card/simple_score_card_remould/score_card_version_back_table_view.vue";
import scoreCardRuleSetting from "@/views/risk/risk_score_card/simple_score_card_remould/_components/score_card_rule_setting.vue";
import scoreCardReview from "@/views/risk/risk_score_card/score_card_review/score_card_review.vue";
import scoreCardReviewView from "@/views/risk/risk_score_card/score_card_review/score_card_review_view.vue";
import decisionRuleReview from "@/views/risk/risk_decision_rule/review/decision_rule_review.vue";
import decisionRuleReviewView from "@/views/risk/risk_decision_rule/review/decision_rule_review_view.vue";
import decisionRuleDetails from "@/views/risk/risk_decision_rule/review/decision_rule_details.vue";
import decisonRuleVersionBack from "@/views/risk/risk_decision_rule/review/decision_rule_version_back.vue";
import decisonRuleVersionBackDetail from "@/views/risk/risk_decision_rule/review/decision_rule_version_back_detail.vue";
import ruleTreeReview from "@/views/risk/rule_tree/review/rule_tree_review.vue";
import ruleTreeReviewView from "@/views/risk/rule_tree/review/rule_tree_review_view.vue";
import ruleTreeVersionBack from "@/views/risk/rule_tree/review/rule_tree_version_back.vue";
import ruleTreeVersionBackDetail from "@/views/risk/rule_tree/review/rule_tree_version_back_detail.vue";
import flowResultInfoDetail from "@/views/risk/rule_flow/tran_result/flow_result_detail.vue";
import flowResultInfoDetailTest from "@/views/risk/rule_flow/tran_result/flow_result_detail_test.vue";
import CustView from "@/components/CustView.vue";
import TestFormGen from "@/views/ismt/ct/busiAuth/authp_rule/authp_rule_edit.vue";
import cardlist from "@/views/cs/collManage/tcManage/collWorkbench/cardlist.vue";
import quotaVeiw from "@/views/uccp/quotaManager/quotaVeiw/index.vue";//对私客户视图
import CustomerGroup from "@/views/uccp/uccpCust/CustomerGroup.vue";//客户组
import transactionInstallment from '@/views/lxyk/xyf/transactionInstallment.vue'
import largeScreen from "@/views/dpksh/index.vue";//电子大屏
import audioplay from "@/views/cs/qualityManage/qualityWorkLocation/component/audioplay.vue"
import chat from "@/views/cs/qualityManage/qualityWorkLocation/component/chat.vue"
import qualityCheck from "@/views/cs/qualityManage/qualityWorkLocation/qualityCheck.vue"
import qualityDivisionCase from "@/views/cs/qualityManage/qualityWorkLocation/quality_division_case.vue"
import sellProductListCompare from "@/views/pd/prod/detail/prodVersion/sell_product_list_compare.vue"
import opinionAdd from "@/views/msap/bpm//processManagement/opinion/process-opinion_add.vue";//审批意见新增
import opinionUpd from "@/views/msap/bpm//processManagement/opinion/process-opinion_upd.vue";//审批意见修改
import taskOpinion from "@/views/msap/bpm//processManagement/opinion/my-bpmrole-opinion-add.vue";//节点审批意见
import qualityReport from "@/views/cs/qualityManage/qualityReport/qualityReport.vue";//质检报告
import litigationFilePrinter from "@/views/cs/collManage/tcManage/litigationFile/litigation_file_printer.vue";//法律文书-打印
import testEngine from "@/views/cs/paramManage/strategy/testEngine/testEngine.vue";//测试引擎
import voiceAudio from "@/views/cs/assistManage/caseDetail/messageDetail/voice_info.vue";//语音录音
import manualDivision from "@/views/cs/collManage/tcManage/manualAssign/manual_division.vue";//手工调整
import financialEvents from "@/views/cs/generalManage/kpiManage/kpiConfirm/detail/financialEvents.vue"; //催收财务页面
import csIndexMnt from "@/views/cs/indexChart/index.vue"; //催收报表页面
import commissionScheme from "@/views/cs/compManage/contrManage/cmsnScheme/commissScheme.vue"; //催收佣金方案
import collrecDetail from "@/views/cs/collManage/tcManage/collWorkbench/mainMenu/basic_info/collrec_detail.vue"; //催收记录对话和列表页面
// import xeOption from "@/views/uccp/xeOption/index.vue";//限额配置
// import bigSign from "@/views/dpksh/index.vue"//北京银行大屏
import bigSign from "@/views/dynamicScreem/index.vue"//动态大屏
import privateTree from '@/views/uccp/quotaManager/creditSystem/private/privateTree.vue';
import limitDetail from '@/views/uccp/limit/limitSettBasic/limitDetail.vue';
import dyanmicScreemCardLookUp from "@/views/dynamicScreem/dynamicScreemManage/dynamic_screem_card_manage/dyanmicScreemCardLookUp.vue"//大屏管理中心 选择卡片
import dynamicScreemCardAdd from "@/views/dynamicScreem/dynamicScreemManage/dynamic_screem_card_manage/dynamicScreemCardAdd.vue"//大屏管理中心 新增卡片
import dynamicScreemCardEdit from "@/views/dynamicScreem/dynamicScreemManage/dynamic_screem_card_manage/dynamicScreemCardEdit.vue"//大屏管理中心 编辑卡片
import dynamicScreemModuleAdd from "@/views/dynamicScreem/dynamicScreemManage/dynamic_screem_module_manage/dynamicScreemModuleAdd.vue"//大屏管理中心 新增模版
import dynamicScreemModuleEdit from "@/views/dynamicScreem/dynamicScreemManage/dynamic_screem_module_manage/dynamicScreemModuleEdit.vue"//大屏管理中心 编辑模版
import limitTabsMain from "@/views/uccp/quotaManager/quotaVeiw/components/TabsMain/index.vue";
import limitSigOptionAdd from "@/views/uccp/limit/limitSettBasic/single/singleLimitAdd.vue";//单户限额配置
import limitSigOptionUpd from "@/views/uccp/limit/limitSettBasic/single/singleLimitUpd.vue";//单户限额配置修改
import limitComOptionAdd from "@/views/uccp/limit/limitSettBasic/compose/composeLimitAdd.vue";//组合限额配置
import limitComOptionUpd from "@/views/uccp/limit/limitSettBasic/compose/composeLimitUpd.vue";//组合限额配置
import lendManagePrinter from "@/views/icms/lend/contract/lend_manage_printer.vue";//贷款合同管理-打印
import personalCreditReport from "@/views/icms/privateCreditInvestigation/authorization.vue";//个人征信报告
import businessStatistics from "@/views/icms/integratedInquiry/comprehensiveBusiStatistics/business_statistics.vue";//业务统计

import login_0 from "@/views/login/index_0.vue";//登录页面模版
import login_A from "@/views/login/index_A.vue";//登录页面模版
import login_B from "@/views/login/index_B.vue";//登录页面模版
import login_C from "@/views/login/index_C.vue";//登录页面模版
import login_D from "@/views/login/index_D.vue";//登录页面模版
import login_E from "@/views/login/index_E.vue";//登录页面模版
import login_F from "@/views/login/index_F.vue";//登录页面模版
import login_G from "@/views/login/index_G.vue";//登录页面模版
import login_H from "@/views/login/index_H.vue";//登录页面模版
import login_I from "@/views/login/index_I.vue";//登录页面模版
import login_J from "@/views/login/index_J.vue";//登录页面模版
import loginModule from "@/views/login/loginModule.vue";//登录页面模版管理
import loginModuleAdd from "@/views/login/loginModuleAdd.vue";//登录页面模版管理
//import zxbg2 from "@/views/ew/authorization2.vue";
import UploadComm from "@/views/ew/UploadComm.vue";
import WarnRuleList from '@/views/ew/WarnRuleList.vue';
import Empower from "@/views/ew/Empower.vue";
import debtRebuildOa from '@/views/dh/debtRebuild/debtRebuildOa.vue';
import debtRebuildApply from "@/views/dh/debtRebuild/debtRebuildApply.vue";
import lgLitigation from "@/views/cs/paramManage/template/lawTemplate/lawTemplate_details.vue";
import litigationWork from "@/views/cs/collManage/tcManage/collWorkbench/functionMenu/litigation/litigation_work_record.vue"
import caseView from "@/views/workbench/wait_todo/caseView.vue"; //案件查询
import debtRebuildDetail from "@/views/dh/debtRebuild/debt_rebuild_detail.vue"; 
import warnAdd from "@/views/ew/warnRuleAdd.vue";
import warnUpd from "@/views/ew/warnRuleUpd.vue";
import earlyProcess from "/src/views/ew/earlyProcess.vue";
import deciAdd from "@/views/risk/risk_deci_manage/deciAbutmentAdd.vue";//决策对接配置
import deciUpd from "@/views/risk/risk_deci_manage/deciAbutmentUpd.vue";//决策对接修改配置
import deciOdbUpd from "@/views/risk/risk_deci_manage/deciAbutmentOdbUpd.vue";
// pcmc 模板注册
import ruleDictypeTable from "@/views/ismt/ct/pcmc/permissionRule/permission_dicttype_table.vue"
import ruleDictvalueTable from "@/views/ismt/ct/pcmc/permissionRule/permission_dictvalue_table.vue"
import ruleValueTree from "@/views/ismt/ct/pcmc/permissionRule/permission_rules_tree.vue"
import permissionConfig from "@/views/ismt/ct/pcmc/dataPermission/permission_name_config.vue"
import roleGrantAuth from "@/views/ismt/ct/role/roleManager/roleGrantAuth.vue"
import changeRole from "@/views/login/change_role.vue"
// 授用信一体贷款申请房屋抵押全自动
import houseLoanLetterOfGrantAuto from "@/views/icms/flowStart/lend/houseLoanLetterOfGrantStart/houseLoanLetterOfGrantAuto.vue"
import sellProductListing from "@/views/pd/prod/detail/sellProductListing.vue" // 可售产品查看--上、下架
import orgInitProcess from "@/views/ismt/ct/orgManage/org_init_process.vue" // 可售产品查看--上、下架
import houseMortgageFlowStart from "@/views/icms/flowStart/credit/house_mortgage_flow_start.vue"

// 单点登录
import SingleSignOnManager from "@/views/ismt/sso/singleSignOnManager.vue";

import commonLogin from "@/views/login/index_common.vue";

import cardTodo from "@/views/dashboard/cards/todo_task.vue"; // 首页待办事项卡片

export default {
  orgInitProcess,
  earlyProcess,
  warnUpd,
  warnAdd,
  litigationWork,
  lgLitigation,
  Downlog,
  dashboard,
  deciAdd,
  deciUpd,
  deciOdbUpd,
  ...icmsRegister,
  ...icmsPdRegister,
  ...pdRegister,
  ...plRegister,
  ...coRegister,
  ...usRegister,
  ...ptRegister,
  ...riskRegister,
  ...lxykRegister,
  ...csRegister,
  personal,
  checkAuth,
  BuildTodoNext,
  ...commonComponets,
  user_charts,
  updatePassword,
  updatePasswordNew,
  ResetPassword,
  ResetPasswordNew,
  FirstPsdUpdate,
  autoLock,
  SceneCharge,
  ChannelManagementAdd,
  MenuManager,
  RloeMenuManager,
  DocumentAgreement,
  DocumentAgreementsee,
  ProcessImgView,
  DHProcessImgView,
  CSProcessImgView,
  LetterGuarantee,
  WaitToDoDeal,
  AlreadyDoDetail,
  CRProcessImgView,
  GroupCreditSubmitBtn,
  CreditSubmitBtn,
  dhWaitToDoDeal,
  TaskGetConfirm,
  ContactInforComponent,
  BranchTreeManager,
  BranchRoleManager,
  BranchMappingManager,
  UserBranchTreeManager,
  BranchInfoRevoke,
  BranchBusiness,
  QuotaManager,
  ManualSubmit,
  InternetVerification,
  dhInternetVerification,
  InternetUserInfo,
  creditapplicationview,
  ...loadnPostComponents,
  ...dhComponents,
  UserImageInfo,
  ApprovalCharts,
  BpmTaskGetConfirm,
  BpmClaimWorkBench,
  BpmDealWorkBench,
  ...loanPostComponents,
  ExceptHandleResult,
  PictProductMange,
  AlredyToDoDetails,
  ExceptEcho,
  PictProductEcho,
  ...plComponents,
  outinformation,
  outinformationView,
  outinformationUpdate,
  OutSoucInfoManagexxbg,
  OutSoucInfoManagexxbgUpdate,
  OutSoucInfoManagexxbgUpdateSearch,
  outsourcerConfirmxxxg,
  outsourcerConfirmxxxgUpdate,
  outsourcerConfirmxxxgUpdateSearch,
  waibaoinfo,
  OutEvalUpdate,
  OutEvalView,
  outinfpsxzbb,
  OutsourcerView,
  OutsourcerMangerment,
  OutsourcerUpld,
  approvalRolePwd,
  DhapprovalRoleManager,
  ApplicationRetent,
  keepCase,
  ApplicationRetentView,
  ApplicationRetentUpdate,
  ...workbenchComponents,
  HandleCreditApproval,
  HandleProApproval,
  FaceMatching,
  QualityCheck,
  legalPersonFocusEvent,
  legalPersonFocusEvent1,
  PersonFocusEvent,
  PersonFocusEvent1,
  ScaleCalculate,
  CRSetTemplate,
  correlationManagement,
  PersonalCreditRatNoFinancial,
  financialFactors,
  nonFinancialFactors,
  adjustResult,
  crWaitToDoDeal,
  CRWaitToDoDeal,
  DHWaitToWithDeal,
  DHTransferHandover,
  DHAssetsaleHandover,
  warningWorkbench,
  warningWorkbenchSelect,
  BalanceSheet,
  CashFlowStatement,
  FinancialStatementTemplateDefinition,
  FinancialStatementsCustomization,
  FinancialStatements,
  nonFinancialFactorsForm,
  crResultInfoView,
  crResultInfo,
  creditRecord,
  corporateCustomerFinancialStatements,
  guarantyContractAdd,
  mortgageContractAdd,
  guarantyContractExdit,
  mortgageContractEdit,
  creditSystemCols,
  companySearch,
  companyMonitor,
  newsMonitor,
  homepage,
  industrialChain,
  eventrelation,
  lawsuitrelation,
  grouprelation,
  companyDetail,
  companyAtlas,
  mapSearch,
  marginContractAdd,
  marginContractExdit,
  ProofPrint,
  metadataAdd,
  action,
  StrategyruletabTemp,
  StrategyruletabNew,
  UploadFile,
  ApplicationRetentUpload,
  exportOaFile,
  appconfirmate,
  ...fsComponents,
  companywriteoffapply,
  confirmationresult,
  Cognappl,
  exportApplication,
  ExportAssureList,
  ...actionAtLaw,
  // AppraisementOutEntry,
  // AppraisementInEntry,
  jsonLookUpTree,
  groupCustStructure,
  GroupMainApply,
  SubMainApply,
  CreditMasterInfo,
  QrGroupMainApply,
  QrSubMainApply,
  // evaluateResult,
  CreditApplicationInfo,
  specialAdjustAppl,
  specialAdjustApplModify,
  specialAdjustAppr,
  specialAdjustQuery,
  Repayment,
  CommWaitToDoDeal,
  CommAlreadyDoDetail,
  CustInfo,
  DocumentAgreementupd,
  contractApplyDetail,
  reviewDialog,
  BusinessAdd,
  BusinessUpd,
  BusinessDetail,
  BusinesshsDetail,
  decorateLendAppliyStart,
  decorateCreditAppliyStart,
  decorateloanSoftAppliyStart,
  corProjectAddFirst,
  projectAddLayout,
  projectAddLayoutView,
  projectAddLayoutModify,
  projectAddSecond,
  projectAddSecondDetail,
  projRela,
  projRelaDetail,
  agreePartMain,
  agreeBaseInfoAdd,
  projfileUpload,
  projfileModify,
  babillInfo,
  dutyAfirm,
  dutyAfirmRew,
  dutyAfirmSub,
  assetLoanInfoAdd,
  mkRegister,
  flowDesigner,
  processProdTemCheck,
  layoutDesigner,
  layoutTempDesigner,
  layoutTempLook,
  echartsDemo,
  clMonitorProcessConsum,
  clMonitorProcessStati,
  clMonitorBusiStati,
  acceMonitorProcessConsum,
  acceMonitorProcessStati,
  acceMonitorBusiStati,
  coMonitorProcessConsum,
  coMonitorProcessStati,
  coMonitorBusiStati,
  crMonitorProcessConsum,
  crMonitorProcessStati,
  crMonitorBusiStati,
  dislnMonitorProcessConsum,
  dislnMonitorProcessStati,
  dislnMonitorBusiStati,
  intrMonitorProcessConsum,
  intrMonitorProcessStati,
  intrMonitorBusiStati,
  letgMonitorProcessConsum,
  letgMonitorProcessStati,
  letgMonitorBusiStati,
  loanMonitorProcessConsum,
  loanMonitorProcessStati,
  loanMonitorBusiStati,
  ltbkMonitorProcessConsum,
  ltbkMonitorProcessStati,
  ltbkMonitorBusiStati,
  ltteMonitorProcessConsum,
  ltteMonitorProcessStati,
  ltteMonitorBusiStati,
  lttwMonitorProcessConsum,
  lttwMonitorProcessStati,
  lttwMonitorBusiStati,
  plMonitorProcessConsum,
  plMonitorProcessStati,
  plMonitorBusiStati,
  certconf_timeline,
  privateBaseUser,
  privateUserSpouse,
  privateUserFamily,
  privateUserBusi,
  privateUserCredit,
  privateUserRisk,
  cardNotice,
  cardNoticeInfo,
  cardBusApability,
  cardBusApability2,
  cardBusPortal,
  cardBusPortalConfig,
  cardLoanDiscounts,
  cardClientView,
  cardClientViewConfig,
  timelineDemo,
  checkWfProduct,
  WfProductSett,
  packgeHistIncome,
  packageRiskChart,
  packageIntendChart,
  froecastChart,
  froecastChartPre,
  deviationChart,
  printConfig,
  riskCombineRule,
  riskCombineRuleReview,
  riskNewCombineRule,
  riskNewCombineRuleView,
  riskScoreCardModelEdit,
  riskScoreCardTmpModelEdit,
  riskTrafficTrend,
  riskRealTimeTraffic,
  riskScoreCardModelEditNew,
  riskScoreCardModelEditEdit,
  riskScoreCardModelEditEditNew,
  riskScoreCardModelEditEditDialog,
  riskScoreCardModelView,
  riskScoreCardModelVersionView,
  riskScoreCardTmpModelView,
  functionSetAll,
  functionSetAllOtherLayout,
  riskFactAdd,
  ruleTree,
  ruleTreeAdd,
  ruleTreeView,
  ruleTreeDel,
  rootRuleTreeEdit,
  riskScoreCardTest,
  riskScoreCardResulrView,
  riskDecisonRule,
  riskDecisonRuleView,
  rule_group_view,
  riskDecisonRuleTmpView,
  riskScoreCardTestResult,
  riskDecisionRuleGroupEdit,
  riskRuleGroupTest,
  riskDecisionRuleTest,
  riskRuleTableTest,
  riskRuleTreeTest,
  riskRuleTreeTestResult,
  riskRuleTreeTestResultHit,
  riskRuleTreeTestResultHitAction,
  normalRuleGroupTestResult,
  normalRuleTestResult,
  normalRuleTestResultSearch,
  riskDecisionRuleGroupTestResultActionList,
  riskDecisionRuleGroupTestResultActionListSrearch,
  riskDecisionRuleGroupTestResultActionList1,
  riskDecisionRuleGroupAdd,
  testErroDialog,
  rootRuleTreeTmpView,
  decisionTreeResult,
  decisionTreeResultTest,
  riskFunctionAdd,
  riskRuleFlowTest,
  riskRuleFlowTestResult,
  ruleFlowTestResultScoreCardDetail,
  ruleFlowTestResultNormalRuleAction,
  decisionRuleEdit,
  decisionRuleAddDialog,
  riskRuleConstantAdd,
  //riskRuleConstantEdit,
  rootRuleTreeView,
  riskFactsUpdate,
  ruleFlowView,
  riskScoreCardModelViewNew,
  riskDictAdd,
  riskDictEdit,
  riskDictView,
  scoreCardSimpleDialog,
  scoreCardRuleSetting,
  simpleScoreCardTable,
  simpleScoreCardTableView,
  simpleScoreCardTmpTableView,
  simpleScoreCardVersionBack,
  complexScoreCardVersionBack,
  simpleScoreCardTmpVersionBack,
  simpleScoreCardVersionBackTableView,
  scoreCardReview,
  scoreCardReviewView,
  ruleFlowBpmn,
  decisionRuleReview,
  decisionRuleReviewView,
  decisionRuleDetails,
  decisonRuleGroupVersionBack,
  decisonRuleVersionBack,
  decisonRuleVersionBackDetail,
  ruleTreeReview,
  ruleTreeReviewView,
  ruleTreeVersionBack,
  ruleTreeVersionBackDetail,
  flowResultInfoDetail,
  flowResultInfoDetailTest,
  CustView,
  TestFormGen,
  cardlist,
  quotaVeiw,
  CustomerGroup,
  transactionInstallment,
  largeScreen,
  bigSign,
  audioplay,
  chat,
  qualityCheck,
  qualityDivisionCase,
  sellProductListCompare,
  privateTree,
  riskScoreDetail,
  // xeOption,
  opinionAdd,
  opinionUpd,
  taskOpinion,
  qualityReport,
  litigationFilePrinter,
  testEngine,
  voiceAudio,
  manualDivision,
  financialEvents,
  limitDetail,
  limitTabsMain,
  limitSigOptionAdd,
  limitSigOptionUpd,
  limitComOptionAdd,
  limitComOptionUpd,
  dynamicScreemCardAdd,
  dynamicScreemCardEdit,
  dyanmicScreemCardLookUp,
  dynamicScreemModuleAdd,
  dynamicScreemModuleEdit,
  csIndexMnt,
  commissionScheme,
  collrecDetail,
  lendManagePrinter,
  personalCreditReport,
  businessStatistics,
  login_0,
  login_A,
  login_B,
  login_C,
  login_D,
  login_E,
  login_F,
  login_G,
  login_H,
  login_I,
  login_J,
  loginModule,
  loginModuleAdd,
  UploadComm,
  WarnRuleList,
  Empower,
  debtRebuildOa,
  debtRebuildApply,
  caseView,
  debtRebuildDetail,
  ruleDictypeTable,
  ruleDictvalueTable,
  ruleValueTree,
  permissionConfig,
  roleGrantAuth,
  changeRole,
  houseLoanLetterOfGrantAuto,
  sellProductListing,
  houseMortgageFlowStart,
  SingleSignOnManager,
  commonLogin,
  cardTodo,
};
