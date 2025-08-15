/*
 * @Author: weisiyi weisiyi@sunline.cn
 * @Date: 2024-02-18 14:13:44
 * @LastEditors: weisiyi weisiyi@sunline.cn
 * @LastEditTime: 2024-03-13 11:29:30
 * @FilePath: /ivue/src/views/risk/riskRegister.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import TemplateExport from "@/views/risk/risk_batch_task_execute_info/export/template_export.vue"; // 模板下载
import TemplateImport from "@/views/risk/risk_batch_task_execute_info/import/template_import.vue"; // 模板导入
import TemplateUploadButton from "@/views/risk/risk_batch_task_execute_info/import/uploadButton.vue"; // 模板导入
import ScoreCardReviewSimple from "@/views/risk/risk_score_card/score_card_review/score_card_review_simple.vue"; // 模板导入
import ScoreCardReviewViewSimple from "@/views/risk/risk_score_card/score_card_review/score_card_review_view_simple.vue"; // 模板导入
import RiskScoreCardModelViewCompare from "@/views/risk/risk_score_card/score_card_review/risk_score_card_model_view_compare.vue"; // 模板导入
import AuthorizeBaseInfoAdd from "@/views/risk/risk_authorize_manage/baseInfo/risk_authorize_manage_base_add.vue"; // 服务授权基本信息新增页面
import Wrapper from "@/views/risk/risk_authorize_manage/wrapper.vue"; // 表单模板包装页面
import AuthorizeRelation from "@/views/risk/risk_authorize_manage/relation/authorizeRelation.vue"; // 服务模型关联页面
import RiskDecisionRuleGroupReview from "@/views/risk/risk_decision_rule/group/risk_decision_rule_group_review.vue";
import RuleFlowReview from "@/views/risk/rule_flow/rule_flow_review.vue";  
import RuleFlowReview1 from "@/views/risk/rule_flow/rule_flow/rule_flow_review.vue";
import RiskDecisionRuleDetail from "@/views/risk/risk_decision_rule/risk_decision_rule_detail.vue"; 
import RiskDecisionRuleGroupReview1 from "@/views/risk/risk_decision_rule/group/risk_decision_rule_group_review1.vue"; 
import RealtimeMonitoring from "@/views/risk/echarts/real_time_monitoring.vue"; 
import ModelAnalysisDetail from "@/views/risk/model_analysis/model_analysis_detail.vue";//模型分析（评分卡）
import modelAnalysisTemplateFlow from "@/views/risk/model_analysis/modelAnalysisTemplateFlow.vue";//模型分析（规则流）
import PFBG from "@/views/risk/risk_score_card/score_card_review/pfbg.vue";//模型分析（评分卡）测试结果
import FlowCodeTest from "@/views/risk/rule_flow/flow_code_test.vue";//规则流结果页面
import FlowCodeTestSearch from "@/views/risk/rule_flow/flow_code_test_search.vue";//规则流结果页面
import reportStatistics from "@/views/risk/report_forms/reportStatistics.vue";//规则流结果页面
import providerAdd from "@/views/risk/risk_data_source/provider_management/provider_add.vue";//提供方管理新增-维护页面
import configurationAddTab1 from "@/views/risk/risk_data_source/data_source_configuration/configurationAddTab1.vue";  // 数据配置
import configurationAddTab2 from "@/views/risk/risk_data_source/data_source_configuration/configurationAddTab2.vue";
import interfaceListAddOrEdit from "@/views/risk/risk_data_source/data_source_configuration/interface_list_addOrEdit_add.vue";
import consanguinityList from "@/views/risk/risk_data_source/data_source_consanguinity/consanguinityList.vue"; // 数据源血缘关系
import VariableConsanguinityList from "@/views/risk/risk_variable_management/consanguinityList.vue";
import variableListAdd from "@/views/risk/risk_variable_management/variableListAdd.vue";
import riskDecisionTablesView from "@/views/risk/risk_decision_tables/risk_decision_tables_view.vue";
import decisionTablesReviewView  from "@/views/risk/risk_decision_tables/review/risk_decision_tables_review_view.vue";
import decisionTablesReview from "@/views/risk/risk_decision_tables/review/risk_decision_tables_review.vue";
import testIndex from "@/views/risk/risk_data_source/data_source_configuration/testIndex.vue";
import testListEdit from "@/views/risk/risk_data_source/data_source_configuration/testListEdit.vue";
import decisionConfigTemplate from "@/views/risk/risk_decision_config/decision_config_template.vue";
import configurationSteps from "@/views/risk/risk_data_source/data_source_configuration/configurationSteps.vue";
import configurationTabs from "@/views/risk/risk_data_source/data_source_configuration/configurationTabs.vue";
import dynamicEditTable from "@/views/risk/risk_decision_tables/dynamic_edit_table.vue";
import variableTest from "@/views/risk/risk_variable_management/variableTest.vue";
import resultDistribution from "@/views/risk/test_center/batch_test/testReport/resultDistribution.vue";
import deciTablesVersionBack from "@/views/risk/risk_decision_tables/deci_tables_version_back.vue";
import TemplateListIndex from "@/views/risk/test_center/batch_test/testReport/tables/templateListIndex.vue";
import TemplateEdit from "@/views/risk/test_center/batch_test/testReport/templateEdit.vue";
import basicTemplate from "@/views/risk/test_center/batch_test/testReport/tables/basicTemplate.vue";
import executionLogTemplate from "@/views/risk/test_center/batch_test/testReport/tables/executionLogTemplate.vue";
import dataSourceTemplate from "@/views/risk/test_center/batch_test/testReport/tables/dataSourceTemplate.vue";
import variableTemplate from "@/views/risk/test_center/batch_test/testReport/tables/variableTemplate.vue";
import testResultTemplate from "@/views/risk/test_center/batch_test/testReport/tables/testResultTemplate.vue";
import resultDistributionTemplate from "@/views/risk/test_center/batch_test/testReport/tables/resultDistributionTemplate.vue";
import sandboxDataSourceTable from "@/views/risk/risk_sandbox_view/sandbox_review/dataSourceTable.vue";
import sandboxInputDataTable from "@/views/risk/risk_sandbox_view/sandbox_review/inputDataTable.vue";
import icmsTreeIndex from "@/views/risk/risk_icms_management/icms_fields/treeIndex.vue";
import icmsFieldsAdd from "@/views/risk/risk_icms_management/icms_fields/icmsFieldsAdd.vue";

export default {
  reportStatistics,
  FlowCodeTest,
  PFBG,
  ModelAnalysisDetail,
  modelAnalysisTemplateFlow,
  RealtimeMonitoring,
  RuleFlowReview1,
  RiskDecisionRuleGroupReview1,
  RiskDecisionRuleDetail,
  RuleFlowReview,
  RiskDecisionRuleGroupReview,
  TemplateExport,
  TemplateImport,
  TemplateUploadButton,
  ScoreCardReviewSimple,
  ScoreCardReviewViewSimple,
  RiskScoreCardModelViewCompare,
  AuthorizeBaseInfoAdd,
  Wrapper,
  AuthorizeRelation,
  FlowCodeTestSearch,
  providerAdd,
  configurationAddTab1,
  configurationAddTab2,
  interfaceListAddOrEdit,
  consanguinityList,
  VariableConsanguinityList,
  variableListAdd,
  riskDecisionTablesView,
  decisionTablesReview,
  decisionTablesReviewView,
  testIndex,
  testListEdit,
  decisionConfigTemplate,
  configurationSteps,
  configurationTabs,
  dynamicEditTable,
  variableTest,
  resultDistribution,
  deciTablesVersionBack,
  TemplateListIndex,
  TemplateEdit,
  basicTemplate,
  executionLogTemplate,
  dataSourceTemplate,
  variableTemplate,
  testResultTemplate,
  sandboxDataSourceTable,
  sandboxInputDataTable,
  resultDistributionTemplate,
  icmsTreeIndex,
  icmsFieldsAdd,
}
