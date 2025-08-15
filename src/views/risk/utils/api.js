'use strict'
var
  risk_service_management;
  risk_service_management = "/risk-management-service";

var Api = {
  risk_req_url: "/SUMP/riskController/riskCall",
  risk_req_urlRPC: "/SUMP/icmcall/icmRPCCall",
  risk_management_appid: "risk-management-service",
  // 批量导入指标变量管理
  plzb_curl: risk_service_management + '/risk-indicator/',
  plzb_delete: risk_service_management + '/risk-indicator/delete',
  plzb_query: risk_service_management + '/risk-indicator/query',
  // 批量导入指标变量批量删除
  plzbsc_query: risk_service_management + '/risk-list-batch/page-select',
  plzbsc_delete: risk_service_management + '/risk-list-batch/delete',
  plzbsc_insert: risk_service_management + '/risk-list-batch/insert',
  plzbsc_fileType: risk_service_management + '/common-select/file-type',
  plzbsc_fileCheck: risk_service_management + '/risk-list-batch/check',
  // 集合管理
  jhgl_query: risk_service_management + '/risk-collection/query',
  jhgl_pageSelect: risk_service_management + '/risk-collection/page-select',
  jhgl_add: risk_service_management + '/risk-collection/add',
  jhgl_delete: risk_service_management + '/risk-collection/delete',
  jhgl_update: risk_service_management + '/risk-collection/update',
  // 事实管理
  ssgl_query: risk_service_management + '/risk-fact/page-select',
  ssgl_add: risk_service_management + '/risk-fact/add',
  ssgl_delete: risk_service_management + '/risk-fact/delete',
  ssgl_update: risk_service_management + '/risk-fact/update',
  // 新
  ssgl_queryInfo: risk_service_management + '/risk-fact/query',
  ssgl_ssselect: risk_service_management + '/combobox-select/fact-without-field',
  ssgl_jhselect: risk_service_management + '/combobox-select/collection-with-datatype',
  // 聚合指标管理
  jhbl_pageSelect: risk_service_management + '/risk-aggregate-indicator/page-select',
  jhbl_query: risk_service_management + '/risk-aggregate-indicator/query',
  jhbl_delete: risk_service_management + '/risk-aggregate-indicator/delete',
  jhbl_add: risk_service_management + '/risk-aggregate-indicator/add',
  jhbl_update: risk_service_management + '/risk-aggregate-indicator/update',
  jhbl_custSelect: risk_service_management + '/risk-indicator/auth/card-cust-select',
  jhbl_24hourSelect: risk_service_management + '/risk-fact/24hour-select',
  jhbl_customer: risk_service_management + "/combobox-select/auth-indicator/customer",
  jhbl_other: risk_service_management + "/combobox-select/auth-indicator/other",
  jhbl_trxnInfo: risk_service_management + "/combobox-select/fact/trxn-info",
  // 实时加工指标变量管理
  ssjg_query: risk_service_management + '/risk-indicator/auth/page-select',
  ssjg_add: risk_service_management + '/risk-indicator/auth/add',
  ssjg_delete: risk_service_management + '/risk-indicator/delete',
  ssjg_update: risk_service_management + '/risk-indicator/auth/update',
  //  外部加工指标变量管理
  wbjg_query: risk_service_management + '/risk-indicator/fraud/query',
  wbjg_pageSelect: risk_service_management + '/risk-indicator/fraud/page-select',
  wbjg_add: risk_service_management + '/risk-indicator/fraud/add',
  wbjg_delete: risk_service_management + '/risk-indicator/delete',
  wbjg_update: risk_service_management + '/risk-indicator/fraud/update',
  // 组合规则管理:
  zhgz_query: risk_service_management + '/risk-combine-rule/query',
  zhgz_add: risk_service_management + '/risk-combine-rule/add',
  zhgz_add_new: risk_service_management + '/risk-combine-rule/addNew',
  zhgz_update_new: risk_service_management + '/risk-combine-rule/updateNew',

  zhgz_update: risk_service_management + '/risk-combine-rule/update',
  zhgz_delete: risk_service_management + '/risk-combine-rule/delete',
  zhgz_pageSelect: risk_service_management + '/risk-combine-rule/page-select',
  zhgz_newVersion: risk_service_management + '/risk-combine-rule/new-version',
  zhgzr_pageSelect: risk_service_management + '/risk-combine-rule-review/page-select',
  zhgzr_query: risk_service_management + '/risk-combine-rule-review/query',
  zhgzr_review: risk_service_management + '/risk-combine-rule-review/review',

  score_card_add: risk_service_management + '/risk-score-card/add',
  score_model_selet: risk_service_management + '/risk-score-card-model/page-select',
  score_model_add: risk_service_management + '/risk-score-card-model/add',
  score_model_update: risk_service_management + '/risk-score-card-model/update ',
  score_model_del: risk_service_management + '/risk-score-card-model/del',
  score_model_dels: risk_service_management + '/risk-score-card-model/del-score-model-code',
  score_rule_dels: risk_service_management + '/risk-score-card-rule/del-code-attribute',
  score_model_selet_list: risk_service_management + '/risk-score-card-model/select',
  score_rule_selet_list: risk_service_management + '/risk-score-card-rule/select',
  score_model_add_list: risk_service_management + '/risk-score-card-model/addList',
  score_rule_add_list: risk_service_management + '/risk-score-card-rule/addList',

  zhgz_selectFact: risk_service_management + '/combobox-select/facts',
  zhgz_selectAggregate: risk_service_management + '/combobox-select/aggregate-indicator',
  zhgz_selectCollection: risk_service_management + '/combobox-select/collection-indicator',
  zhgz_selectCollectionCode: risk_service_management + '/combobox-select/collection-code-group',
  zhgz_selectcCollection: risk_service_management + '/combobox-select/collection',
  zhgz_selectConstant: risk_service_management + '/combobox-select/constant',
  // 风控名单管理
  fkmd_query: risk_service_management + '/risk-list/query',
  fkmd_add: risk_service_management + '/risk-list/add',
  fkmd_update: risk_service_management + '/risk-list/update',
  fkmd_delete: risk_service_management + '/risk-list/delete',
  fkmd_pageSelect: risk_service_management + '/risk-list/page-select',
  fkmd_newVersion: risk_service_management + '/risk-list/new-version',
  fkmd_batchIndicator: risk_service_management + '/combobox-select/batch-indicator',
  // 可执行规则管理
  fzxg_query: risk_service_management + '/risk-executable-rule/query',
  fzxg_add: risk_service_management + '/risk-executable-rule/add',
  fzxg_update: risk_service_management + '/risk-executable-rule/update',
  fzxg_delete: risk_service_management + '/risk-executable-rule/delete',
  fzxg_pageSelect: risk_service_management + '/risk-executable-rule/page-select',
  fzxg_ruleHandler: risk_service_management + '/combobox-select/rule-handler',
  // 处置措施
  czcs_query: risk_service_management + '/risk-rule-handler/query',
  czcs_add: risk_service_management + '/risk-rule-handler/add',
  czcs_update: risk_service_management + '/risk-rule-handler/update',
  czcs_delete: risk_service_management + '/risk-rule-handler/delete',
  czcs_pageSelect: risk_service_management + '/risk-rule-handler/page-select',
  czcs_innerIndicator: risk_service_management + '/combobox-select/inner-indicator',
  // czcs_listIndicator: risk_service_management + '/combobox-select/inner-indicator',
  czcs_listIndicator: risk_service_management + '/combobox-select/list-indicator',
  // 规则组管理
  gzzh_pageSelect: risk_service_management + '/risk-rule-group/page-select',
  gzzh_query: risk_service_management + '/risk-rule-group/query',
  gzzh_add: risk_service_management + '/risk-rule-group/add',
  gzzh_update: risk_service_management + '/risk-rule-group/update',
  gzzh_delete: risk_service_management + '/risk-rule-group/delete',
  // 集合指标管理_页面设计
  jhzb_pageSelect: risk_service_management + '/risk-collection-indicator/page-select',
  jhzb_query: risk_service_management + '/risk-collection-indicator/query',
  jhzb_add: risk_service_management + '/risk-collection-indicator/add',
  jhzb_update: risk_service_management + '/risk-collection-indicator/update',
  jhzb_delete: risk_service_management + '/risk-collection-indicator/delete',
  jhzb_sssx: risk_service_management + '/combobox-select/fact',
  jhzb_collectionCode: risk_service_management + '/combobox-select/collection-code',
  // 交易分流配置_页面设计
  jyfl_pageSelect: risk_service_management + '/risk-transaction-diversion/page-select',
  jyfl_query: risk_service_management + '/risk-transaction-diversion/query',
  jyfl_add: risk_service_management + '/risk-transaction-diversion/add',
  jyfl_update: risk_service_management + '/risk-transaction-diversion/update',
  jyfl_delete: risk_service_management + '/risk-transaction-diversion/delete',
  jyfl_ruleGroup: risk_service_management + '/combobox-select/rule-group',
  //  风控业务参数维护
  fkyw_pageSelect: risk_service_management + '/risk-param/page-select',
  fkyw_query: risk_service_management + '/risk-param/query',
  fkyw_update: risk_service_management + '/risk-param/update',
  // 客户相关指标统计量查询
  khxg_pageSelect: risk_service_management + '/risk-cust-statistic/page-select',
  khxg_query: risk_service_management + '/risk-cust-statistic/query',
  // 客户无关关指标统计量查询
  khwg_pageSelect: risk_service_management + '/risk-noncust-statistic/page-select',
  khWg_query: risk_service_management + '/risk-noncust-statistic/query',

  //决策规则
  dgz_add_new: risk_service_management + '/risk-decision-rule/add',
  dgz_update_new: risk_service_management + '/risk-decision-rule/update',
  dra_select_rule_id: risk_service_management + '/risk-decision-action/select-rule-id',
  decision_interface_select: risk_service_management + '/combobox-select/decision-combobox-select',

  rt_select: risk_service_management + '/root-rule-tree/select',
  rtn_add: risk_service_management + '/rule-tree-node/add',
  rtn_del: risk_service_management + '/rule-tree-node/del',
  rtn_upadate: risk_service_management + '/rule-tree-node/update',

  risk_function_page_select: risk_service_management + '/risk-function/page-select',
  risk_function_params_select: risk_service_management + '/risk-function-params/select',

  //评分卡节点的属性的label调用后台接口
  rule_flow_risk_score_card_query: risk_service_management + '/risk-score-card/query',
  //普通规则节点的属性的label调用后台接口
  rule_flow_risk_decision_rule_query: risk_service_management + '/risk-decision-rule/query',
  //规则树节点的属性的label调用后台接口
  rule_flow_root_rule_tree_query: risk_service_management + '/root-rule-tree/query',
  //点击保存按钮调用后台接口
  rule_flow_node_add: risk_service_management + '/rule-flow-node/add',
  //读取上传节点数据
  rule_flow_node_select: risk_service_management + '/rule-flow-node/select',

  //常量管理添加
  risk_rule_constant_add: risk_service_management + '/risk_rule_constant/add',
  //常量管理编辑
  risk_rule_constant_update: risk_service_management + '/risk_rule_constant/update',
  //常量管理查询
  risk_rule_constant_query: risk_service_management + '/risk_rule_constant/query',
  //事实管理修改
  risk_facts_update: risk_service_management + '/risk-facts/update',
  //规则参数查询
  risk_params_query: risk_service_management + '/all-rule/query-params',
  //字典管理新增
  risk_dict_add_list: risk_service_management + '/risk-dict/add-list',
  //字典管理修改
  risk_dict_update_list: risk_service_management + '/risk-dict/update-list',
  //评分卡审核
  score_card_review_info: risk_service_management + '/risk-score-card-review/query-check-info',
  score_card_review_agree: risk_service_management + '/risk-score-card-review/check-agree',
  score_card_review_reject: risk_service_management + '/risk-score-card-review/check-reject',
  score_card_back_off:risk_service_management+ '/risk-score-card/back',
  //普通规则审核
  decision_rule_review_info: risk_service_management + '/risk-decision-rule-review/query-check-info',
  decision_rule_review_agree: risk_service_management + '/risk-decision-rule-review/check-agree',
  decision_rule_review_reject: risk_service_management + '/risk-decision-rule-review/check-reject',
  decision_rule_back_off : risk_service_management + '/risk-decision-rule/back',
  //规则树审核相关
  rule_tree_review_info: risk_service_management + '/risk-rule-tree-review/query-check-info',
  rule_tree_review_agree: risk_service_management +'/risk-rule-tree-review/check-agree',
  rule_tree_review_reject: risk_service_management +'/risk-rule-tree-review/check-reject',
  rule_tree_back_off: risk_service_management + '/root-rule-tree/back',
}
export default Api
// module.exports = Api
