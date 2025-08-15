// 自定义元素的类型
const customElements = {
  "bpmn:StartEvent": {
    "stroke-width": "0px",
    "fill-opacity": 0
  },
  "bpmn:EndEvent": {
    "stroke-width": "0px",
    "fill-opacity": 0
  },
  "bpmn:ExclusiveGateway": {
    "stroke-width": "0px",
    "fill-opacity": 0
  },
  "bpmn:IntermediateThrowEvent": {
    "stroke-width": "0px",
    "fill-opacity": 0
  }
};
// 左侧工具栏 节点相关配置
const customShapeAction = [
  {
    type: "create.start-event",
    action: [
      "bpmn:StartEvent", // 对应bpmn节点名称
      "event", // group
      "icon-custom icon-custom-start", // className
      "开始", // title
      {
        nodeType: "start", // attr
        longName: "开始"
      }
    ]
  },
  {
    type: "create.end-event",
    action: [
      "bpmn:EndEvent",
      "event",
      "icon-custom icon-custom-end",
      "结束",
      {
        nodeType: "end",
        longName: "结束"
      }
    ]
  },
  {
    type: "create.case-gateway",
    action: [
      "bpmn:ExclusiveGateway",
      "event",
      "icon-custom icon-custom-case",
      "分支",
      {
        nodeType: "case",
        longName: "分支"
      }
    ]
  },
  {
    type: "create.loop-gateway",
    action: [
      "bpmn:IntermediateThrowEvent",
      "event",
      "icon-custom icon-custom-loop",
      "循环",
      {
        nodeType: "loop",
        longName: "循环"
      }
    ]
  },
  {
    type: "create.simple-score-card",
    action: [
      "bpmn:IntermediateThrowEvent",
      "activity",
      "icon-custom icon-custom-simple-score-card",
      "简单评分卡",
      {
        nodeType: "simpleScoreCard",
        longName: "简单评分卡"
      }
    ]
  },
  {
    type: "create.complex-score-card",
    action: [
      "bpmn:IntermediateThrowEvent",
      "activity",
      "icon-custom icon-custom-complex-score-card",
      "复杂评分卡",
      {
        nodeType: "complexScoreCard",
        longName: "复杂评分卡"
      }
    ]
  },
  {
    type: "create.rule-decision",
    action: [
      "bpmn:IntermediateThrowEvent",
      "activity",
      "icon-custom icon-custom-rule-decision",
      "规则",
      {
        nodeType: "ruleDecision",
        longName: "规则"
      }
    ]
  },
  {
    type: "create.rule-group",
    action: [
      "bpmn:IntermediateThrowEvent",
      "activity",
      "icon-custom icon-custom-rule-group",
      "规则集",
      {
        nodeType: "ruleGroup",
        longName: "规则集"
      }
    ]
  },
  {
    type: "create.decision-tree",
    action: [
      "bpmn:IntermediateThrowEvent",
      "activity",
      "icon-custom icon-custom-decision-tree",
      "决策树",
      {
        nodeType: "decisionTree",
        longName: "决策树"
      }
    ]
  },
  {
    type: "create.decision-table",
    action: [
      "bpmn:IntermediateThrowEvent",
      "activity",
      "icon-custom icon-custom-decision-table",
      "决策表",
      {
        nodeType: "ruleTable",
        longName: "决策表"
      }
    ]
  },
  {
    type: "create.rule-sub-flow",
    action: [
      "bpmn:IntermediateThrowEvent",
      "activity",
      "icon-custom icon-custom-rule-sub-flow",
      "决策流",
      {
        nodeType: "ruleSubFlow",
        longName: "决策流"
      }
    ]
  },
  {
    type: "create.rule-variable",
    action: [
      "bpmn:IntermediateThrowEvent",
      "activity",
      "icon-custom icon-custom-rule-variable",
      "变量",
      {
        nodeType: "ruleVariable",
        longName: "变量"
      }
    ]
  },
  {
    type: "create.rule-data-resource",
    action: [
      "bpmn:IntermediateThrowEvent",
      "activity",
      "icon-custom icon-custom-data-resource",
      "数据源",
      {
        nodeType: "ruleDataResource",
        longName: "数据源"
      }
    ]
  }
  // {
  //   type: "create.rule-script",
  //   action: [
  //     "bpmn:IntermediateThrowEvent",
  //     "activity",
  //     "icon-custom icon-custom-rule-script iconfont-flow icon-jiaoben",
  //     "规则脚本",
  //     {
  //       nodeType: "ruleScript",
  //       longName: "规则脚本",
  //     },
  //   ],
  // },
];
// 箭头
const customFlowAction = [
  {
    type: "global-connect-tool",
    action: [
      "bpmn:SequenceFlow",
      "tools",
      "icon-custom icon-custom-flow entry bpmn-icon-connection-multi",
      "连线"
    ]
  }
];
// 连线只能单进单出的节点
const singleNode = [
  "start",
  "end",
  "when",
  "simpleScoreCard",
  "complexScoreCard",
  "ruleDecision",
  "ruleTable",
  "decisionTree",
  "ruleGroup",
  "ruleScript",
  "ruleVariable",
  "ruleDataResource"
];
// const multipleNode = ['case','fork']

// 节点属性
const nodeAttrJson = {
  case: {
    originId: "",
    longname: "",
    condition: "",
    desc: ""
  },
  when: {
    originId: "",
    longname: "",
    condition: "",
    desc: ""
  },
  simpleScoreCard: {
    originId: "",
    longname: "",
    scoreCardCode: "",
    scoreCardName: "",
    version: "",
    totalExecType: "",
    totalAssignedTo: "",
    totalAssignedToDesc: "",
    ruleInfo: ""
  },
  complexScoreCard: {
    originId: "",
    longname: "",
    scoreCardCode: "",
    scoreCardName: "",
    version: "",
    totalExecType: "",
    totalAssignedTo: "",
    totalAssignedToDesc: "",
    ruleInfo: ""
  },
  ruleDecision: {
    originId: "",
    longname: "",
    ruleCode: "",
    ruleName: "",
    version: "",
    executableExpression: "",
    ruleContentDesc: "",
    actionInfo: ""
  },
  decisionTree: {
    originId: "",
    longname: "",
    treeCode: "",
    treeName: "",
    version: "",
    treeData: ""
  },
  ruleTable: {
    originId: "",
    longname: "",
    desc: ""
  },
  ruleGroup: {
    originId: "",
    longname: "",
    groupCode: "",
    groupName: "",
    decisionRuleList: ""
  },
  ruleScript: {
    originId: "",
    longname: "",
    executableExpression: "",
    ruleContentDesc: ""
  },
  ruleVariable: {
    originId: "",
    longname: "",
    treeCode: "",
    treeName: "",
    version: "",
    treeData: ""
  },
  ruleDataResource: {
    originId: "",
    longname: "",
    treeCode: "",
    treeName: "",
    version: "",
    treeData: ""
  }
};

// 节点必填属性
const nodeRequiredAttr = {
  case: ["id"],
  when: ["id", "condition"],
  simpleScoreCard: [
    "id",
    "scoreCardCode",
    "scoreCardName",
    "currVersion",
    "totalAssignedTo",
    "conditionInfo"
  ],
  complexScoreCard: [
    "id",
    "scoreCardCode",
    "scoreCardName",
    "currVersion",
    "totalExecType",
    "totalAssignedTo",
    "ruleInfo"
  ],
  ruleDecision: [
    "id",
    "ruleCode",
    "ruleName",
    "version",
    "executableExpression",
    "actionInfo"
  ],
  decisionTree: ["id", "treeCode", "treeName", "currVersion", "treeData"],
  ruleGroup: ["id", "groupCode", "groupName", "decisionRuleList"],
  ruleScript: ["id", "executableExpression", "ruleContentDesc"],
  ruleVariable: ["id", "executableExpression", "ruleContentDesc"],
  ruleDataResource: ["id", "executableExpression", "ruleContentDesc"]
};

// 单节点，一进一出
export function isSingleNode(nodeType) {
  return singleNode.includes(nodeType);
}
// 分支开始节点，一进多出
export function isMultiStartNode(node) {
  if (node && node.incoming.length === 1 && node.outgoing.length > 1) {
    return true;
  }
  return false;
}
// 分支结束节点，多进一出
export function isMultiEndNode(node) {
  if (node && node.incoming.length > 1 && node.outgoing.length === 1) {
    return true;
  }
  return false;
}
//自定义规则  是否能连线
export function canConnect(source, target, isReconnect = false) {
  let max = 0;
  // 箭头重连需要在连接后校验
  if (isReconnect) {
    max = 1;
  }

  // 自己连自己
  if (source.id === target.id) {
    return false;
  }
  console.log("isMultiStartNode", isMultiStartNode(target));
  console.log("isSingleNode", isSingleNode(target.nodeType));
  console.log("incoming", target.incoming.length > max);
  // 单节点与分支开始节点不允许多进。 是否是开始节点
  if (
    isMultiStartNode(target) &&
    (isSingleNode(target.nodeType) && target.incoming.length > max)
  ) {
    return false;
  }
  //原代码 出现bug为开始节点后添加节点删除时会被撤销
  // if (
  //   isMultiStartNode(target) ||
  //   (isSingleNode(target.nodeType) && target.incoming.length > max)
  // ) {
  //   return false;
  // }

  // 单节点，分支结束节点不允许多出
  if (
    isMultiEndNode(source) ||
    (isSingleNode(source.nodeType) && source.outgoing.length > max)
  ) {
    return false;
  }

  if (isReconnect) {
    return true;
  }
}

/**
 * 循环创建出一系列的元素
 * @param {Array} actions 元素集合
 * @param {Object} fn 处理的函数 type, group, className, title, options
 */
export function batchCreateCustom(actions, fn) {
  // console.log('循环创建出一系列的元素-----', actions, fn);
  const customs = {};
  actions.forEach(item => {
    // console.log(item);
    if (item["action"]) {
      customs[item["type"]] = fn(...item["action"]);
    } else {
      customs[item["type"]] = item;
    }
  });
  console.log("循环创建出一系列的结束-----", customs);
  return customs;
}
export {
  customElements,
  customShapeAction,
  customFlowAction,
  nodeAttrJson,
  singleNode,
  nodeRequiredAttr
};
