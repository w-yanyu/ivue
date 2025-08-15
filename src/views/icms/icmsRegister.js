import QrGroupMainApply from "@/views/us/usManager/creditApply/query/GroupMainApply.vue"; // 集团客户统一授信查看
import guarContractApplyAdd from "@/views/icms/guaranteeManager/guaranteeContractManager/guarContractApply/guar_contract_apply_add.vue"; // 保证合同申请新增
import guarContractApplyEdit from "@/views/icms/guaranteeManager/guaranteeContractManager/guarContractApply/guar_contract_apply_edit.vue"; // 保证合同申请修改
import ColtContractApplyAdd from "@/views/icms/guaranteeManager/guaranteeContractManager/coltContractApply/colt_contract_apply_add.vue"; //抵质押合同录入
import ColtContractApplyEdit from "@/views/icms/guaranteeManager/guaranteeContractManager/coltContractApply/colt_contract_apply_edit.vue"; //抵质押合同修改
import marginContractApplyAdd from "@/views/icms/guaranteeManager/guaranteeContractManager/marginContractApply/margin_contract_apply_add.vue"; //保证金合同申请新增
import marginContractApplyEdit from "@/views/icms/guaranteeManager/guaranteeContractManager/marginContractApply/margin_contract_apply_edit.vue"; //保证金合同申请修改
import linkMaxContract from "@/views/icms/guaranteeManager/guaranteeContractInfo/linkMaxContract.vue"; //担保合同连接

import ar_witToDoDeal from "@/views/icms/ar_workbench/wait_todo/WaitToDoDeal.vue"; // 待办详情
import ar_alreadyDoDetail from "@/views/icms/ar_workbench/already_do/AlreadyDoDetail.vue"; // 已办详情

import ExtLendIOUTab from "@/views/icms/lend/lendIOU/ext_lendIOUTab.vue"; //贷款展期--贷款借据选项卡
import ExtLendIOUDetails from "@/views/icms/lend/lendIOU/IOUDetails/ext_IOUDetails.vue"; //贷款展期--借据信息
import ExtLendIOUDetails_info from "@/views/icms/lend/lendIOU/IOUDetails/ext_IOUDetails_info.vue"; //贷款展期--借据信息详情

import LendIOUTab from "@/views/icms/lend/lendIOU/lendIOUTab.vue"; //授信普通出账--贷款借据选项卡
import InterLendIOU from "@/views/icms/lend/lendIOU/InterLendIOU.vue"; //国际业务授信普通出账--贷款借据选项卡
import LendIOUDetails from "@/views/icms/lend/lendIOU/IOUDetails/IOUDetails.vue"; //授信普通出账--借据信息
import LendIOUDetails_info from "@/views/icms/lend/lendIOU/IOUDetails/IOUDetails_info.vue"; //授信普通出账--借据信息
import InterLendIOUDetails from "@/views/icms/lend/lendIOU/IOUDetails/InterIOUDetails.vue"; //授信普通出账--借据信息
import InterLendIOUDetails_info from "@/views/icms/lend/lendIOU/IOUDetails/InterIOUDetails_info.vue"; //授信普通出账--借据信息
import mortgageContract from "@/views/icms/guaranteeManager/guaranteeContractInfo/mortgageContract/mortgageContract.vue"; //抵押品合同查询
import pledgeContract from "@/views/icms/guaranteeManager/guaranteeContractInfo/pledgeContract/pledgeContract.vue"; //质押品合同查询
import guaranteeContract from "@/views/icms/guaranteeManager/guaranteeContractInfo/guaranteeContract/guaranteeContract.vue"; //保证合同查询
import marginContract from "@/views/icms/guaranteeManager/guaranteeContractInfo/marginContract/marginContract.vue"; //质押品合同查询
import creditContract from "@/views/icms/guaranteeManager/guaranteeContractInfo/creditContract/creditContract.vue"; //质押品合同查询
import prodParams from "@/views/icms/lend/lendIOU/prodParams/prodParams.vue"; //拓展参数渲染
import creditMainSaleProdRela from "@/views/icms/guaranteeManager/creditApplicationInfoManager/mutipleCredit/creditMainSaleProdRela.vue"; //动态表格
import creditMainSaleProdRelaInfo from "@/views/icms/guaranteeManager/creditApplicationInfoManager/mutipleCredit/creditMainSaleProdRelaInfo.vue"; //动态表格详情页面
import LendFormatContract from "@/views/icms/lend/contract/LendFormatContract"//同贷书打印
import LendContractPrint from "@/views/icms/lend/contract/LendContractPrint"//贷款合同打印
import LendNewContractPrint from "@/views/icms/lend/contract/LendNewContractPrint"//贷款合同打印
import loanInfo from "@/views/integrated/loanInfo/loanInfo.vue"//结清证明打印
import creditLimitPrint from "@/views/cl/CreditLimitInquiry/creditLimitPrint.vue"//授信通知书打印
import PublicDealerCarFlowStart from "@/views/icms/flowStart/jhBusi/car/PublicDealerCarFlowStart.vue"//交行poc经销商购车业务启动
import OrderDetailList from "@/views/icms/flowStart/jhBusi/car/OrderDetailList.vue"//交行poc经销商购车订单明细列表
import OrderDetailAdd from "@/views/icms/flowStart/jhBusi/car/OrderDetailAdd.vue"//交行poc经销商购车订单明细新增
import OrderDetailModify from "@/views/icms/flowStart/jhBusi/car/OrderDetailModify.vue"//交行poc经销商购车订单明细维护
import CarModelDetail from "@/views/icms/flowStart/jhBusi/car/CarModelDetail.vue"//交行poc经销商购车车型信息
import ColorSelector from "@/views/icms/flowStart/jhBusi/car/ColorSelector.vue"//交行poc经销商购车车型颜色选择器
import directives from "@/views/icms/flowStart/jhBusi/car/directives.js"//交行poc经销商购车车型颜色选择器
import CarModelChooser from "@/views/us/entManager/dealerManager/CarModelChooser.vue"//交行poc经销商购车车型选择器
import entGlobalReport from "@/views/icms/creditReport/ent/entGlobalReport.vue"//对公征信报告展示页面
import arbCEffectIdenty from "@/views/icms/creditReport/ent/tableView/arbCEffectIdenty.vue"//对公征信身份标识页面
import houseLoanLetterOfGrantStart from "@/views/icms/flowStart/lend/houseLoanLetterOfGrantStart/houseLoanLetterOfGrantStart.vue"//对公征信身份标识页面
import messageDialog from "@/views/icms/preCreditBusi/messageDialog.vue"//消息展示弹框
import QualityEvaluation from "@/views/icms/docManager/quality_evaluation_table_edit.vue"//消息展示弹框
import QualityEvaluationView from "@/views/icms/docManager/quality_evaluation_table_view.vue"//消息展示弹框
import groupCreditMainApply from "@/views/icms/guaranteeManager/creditApplicationInfoManager/groupCredit/groupCreditMainApply.vue"//消息展示弹框
import groupCreditMainApplyView from "@/views/icms/guaranteeManager/creditApplicationInfoManager/groupCredit/groupCreditMainApplyView.vue"//消息展示弹框
import riskReport from "@/views/icms/lend/lendIOU/riskReport/riskReport.vue"//风险报告


export default {
  LendNewContractPrint,
  QrGroupMainApply,
  ar_witToDoDeal,
  ar_alreadyDoDetail,
  ExtLendIOUTab,
  ExtLendIOUDetails,
  ExtLendIOUDetails_info,
  LendIOUTab,
  InterLendIOU,
  LendIOUDetails,
  LendIOUDetails_info,
  InterLendIOUDetails_info,
  InterLendIOUDetails,
  ColtContractApplyAdd,
  ColtContractApplyEdit,
  guarContractApplyAdd,
  guarContractApplyEdit,
  marginContractApplyAdd,
  marginContractApplyEdit,
  mortgageContract,
  pledgeContract,
  guaranteeContract,
  marginContract,
  creditContract,
  linkMaxContract,
  prodParams,
  creditMainSaleProdRela,
  creditMainSaleProdRelaInfo,
  LendFormatContract,
  loanInfo,
  creditLimitPrint,
  PublicDealerCarFlowStart,
  OrderDetailList,
  OrderDetailAdd,
  OrderDetailModify,
  CarModelDetail,
  ColorSelector,
  directives,
  CarModelChooser,
  entGlobalReport,
  arbCEffectIdenty,
  LendContractPrint,
  houseLoanLetterOfGrantStart,
  messageDialog,
  QualityEvaluation,
  QualityEvaluationView,
  groupCreditMainApply,
  groupCreditMainApplyView,
  riskReport
}
