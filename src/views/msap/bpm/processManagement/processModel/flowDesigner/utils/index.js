// 自定义元素的类型
let strart_dec ='';
let end_desc='';
let manual_desc='';
let service_desc='';
let time_desc='';
let receive_desc='';
let time_bind_desc='';
let connection_desc='';


export function initUtil(vue){
 strart_dec =vue.$i18ns('bpmmodel.start');
 end_desc=vue.$i18ns('bpmmodel.end');
 manual_desc=vue.$i18ns('bpmmodel.manual');
 service_desc=vue.$i18ns('bpmmodel.service');
 time_desc=vue.$i18ns('bpmmodel.time');
 receive_desc=vue.$i18ns('bpmmodel.receive');
 time_bind_desc=vue.$i18ns('bpmmodel.time_bind');
 connection_desc=vue.$i18ns('bpmmodel.connection');
}


const customElements = {
  "bpmn:StartEvent": {
    href: require("../icon/start.png"),
  },
  "bpmn:EndEvent": {
    href: require("../icon/end.png"),
  },
  "bpmn:UserTask": {
    href: require("../icon/user.png"),
    width: 105,
    height: 55,
  },
  "bpmn:ServiceTask": {
    href: require("../icon/service.png"),
    width: 105,
    height: 55,
  },
  "bpmn:IntermediateCatchEvent": {
    href: require("../icon/intermediate.png"),
  },
  "bpmn:BoundaryEvent": {
    href: require("../icon/intermediate.png"),
    width: 30,
    height: 30,
  },
  "bpmn:ReceiveTask": {
    href: require("../icon/receive.png"),
    width: 105,
    height: 55,
  },

  "bpmn:ExclusiveGateway": {
    href: require("../icon/exclusive.png"),
  },
  "bpmn:ParallelGateway": {
    href: require("../icon/parallel.png"),
  },
};

 // 左侧工具栏 节点相关配置
const customShapeAction = [
  {
    type: "create.start-event",
    action: ["bpmn:StartEvent", "event", "icon icon-start", "开始"],
  },
  {
    type: "create.end-event",
    action: ["bpmn:EndEvent", "event", "icon icon-end", "结束"],
  },
  {
    type: "create.user-task",
    action: ["bpmn:UserTask", "event", "icon icon-user", "人工"],
  },
  {
    type: "create.service-task",
    action: ["bpmn:ServiceTask", "event", "icon icon-service", "服务"],
  },
  {
    type: "create.intermediate-catch-event",
    action: [
      "bpmn:IntermediateCatchEvent",
      "event",
      "icon  icon-intermediate",
      "定时"
    ],
  },
  {
    type: "create.boundary-event",
    action: [
      "bpmn:BoundaryEvent",
      "event",
      "icon  icon-intermediate",
      "定时绑定"
    ],
  },
  {
    type: "create.receive-task",
    action: ["bpmn:ReceiveTask", "event", "icon icon-receive", "等待",],
  },
  // {
  //   type: "create.exclusive-gateway",
  //   action: [
  //     "bpmn:ExclusiveGateway",
  //     "event",
  //     "icon icon-exclusive",
  //     "排他网关",
  //   ],
  // },
  {
    type: "create.parallel-gateway",
    action: [
      "bpmn:ParallelGateway",
      "event",
      "icon icon-parallel",
      "并行网关",
    ],
  },
];
// 箭头
const customFlowAction = [
  {
    type: "global-connect-tool",
    action: [
      "bpmn:SequenceFlow",
      "tools",
      "entry bpmn-icon-connection-multi",
      "连线"
    ],
  },
];
// 连线只能单进单出的节点
const singleNode = [
  "start",
  "end",
  "when",
  "scoreCard",
  "ruleDecision",
  "decisionTable",
  "decisionTree",
  "ruleGroup",
];
const multipleNode = ['case', 'fork']
// 节点属性
const nodeAttrJson = {
  case: {
    originId: "",
    longname: "",
    condition: "",
    desc: "",
  },
  when: {
    originId: "",
    longname: "",
    condition: "",
    desc: "",
  },
  scoreCard: {
    originId: "",
    longname: "",
    scoreCardCode: "",
    scoreCardName: "",
    version: "",
    totalExecType: "",
    totalAssignedTo: "",
    totalAssignedToDesc: "",
    ruleInfo: "",
  },
  ruleDecision: {
    originId: "",
    longname: "",
    ruleCode: "",
    ruleName: "",
    version: "",
    executableExpression: "",
    ruleContentDesc: "",
    actionInfo: "",
  },
  decisionTree: {
    originId: "",
    longname: "",
    treeCode: "",
    treeName: "",
    version: "",
    treeData: "",
  },
  decisionTable: {
    originId: "",
    longname: "",
    desc: "",
  },
  ruleGroup: {
    originId: "",
    longname: "",
    groupCode: "",
    groupName: "",
    decisionRuleList: "",
  },
};
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
  // 单节点与分支开始节点不允许多进。
  if (isMultiStartNode(target) || target.incoming.length > max) {
    return false;
  }
  // 单节点，分支结束节点不允许多出
  if (isMultiEndNode(source) || source.outgoing.length > max) {
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
  const customs = {};
  actions.forEach((item) => {
    if (item["action"]) {
      customs[item["type"]] = fn(...item["action"]);
    } else {
      customs[item["type"]] = item;
    }
  });
  return customs;
}

// 创建监听器实例
export function createListenerObject(options, isTask, prefix) {
  const listenerObj = Object.create(null);
  listenerObj.event = options.event;
  listenerObj.class = options.class;
  // 任务监听器的 定时器 设置
  if (isTask && options.event === "timeout" && !!options.eventDefinitionType) {
    const timeDefinition = window.bpmnInstances.moddle.create(
      "bpmn:FormalExpression",
      {
        body: options.eventTimeDefinitions,
      }
    );
    const TimerEventDefinition = window.bpmnInstances.moddle.create(
      "bpmn:TimerEventDefinition",
      {
        id: `TimerEventDefinition_${uuid(8)}`,
        [`time${options.eventDefinitionType.replace(/^\S/, (s) =>
          s.toUpperCase()
        )}`]: timeDefinition,
      }
    );
    listenerObj.eventDefinitions = [TimerEventDefinition];
  }
  return window.bpmnInstances.moddle.create(
    `${prefix}:${isTask ? "TaskListener" : "ExecutionListener"}`,
    listenerObj
  );
}

// 创建脚本实例
export function createScriptObject(options, prefix) {
  const { scriptType, scriptFormat, value, resource } = options;
  const scriptConfig =
    scriptType === "inlineScript"
      ? { scriptFormat, value }
      : { scriptFormat, resource };
  return window.bpmnInstances.moddle.create(`${prefix}:Script`, scriptConfig);
}

// 更新元素扩展属性
export function updateElementExtensions(element, extensionList) {
  const extensions = window.bpmnInstances.moddle.create(
    "bpmn:ExtensionElements",
    {
      values: extensionList,
    }
  );
  window.bpmnInstances.modeling.updateProperties(element, {
    extensionElements: extensions,
  });
}

// 创建定时实例
export function createIntermediateObject(options, isTask, prefix) {
  console.log("创建中间事件");
  const listenerObj = Object.create(null);
  listenerObj.event = options.event;
  isTask && (listenerObj.id = options.id); // 任务监听器特有的 id 字段
  // 任务监听器的 定时器 设置
  if (isTask && options.event === "timeout" && !!options.eventDefinitionType) {
    const timeDefinition = window.bpmnInstances.moddle.create(
      "bpmn:FormalExpression",
      {
        body: options.eventTimeDefinitions,
      }
    );
    const TimerEventDefinition = window.bpmnInstances.moddle.create(
      "bpmn:TimerEventDefinition",
      {
        id: `TimerEventDefinition_${uuid(8)}`,
        [`time${options.eventDefinitionType.replace(/^\S/, (s) =>
          s.toUpperCase()
        )}`]: timeDefinition,
      }
    );
    listenerObj.eventDefinitions = [TimerEventDefinition];
  }
  return window.bpmnInstances.moddle.create("bpmn:timeDuration", listenerObj);
}

//创建定时绑定
export function createBoundaryObject(options, isTask, prefix) {
  const listenerObj = Object.create(null);
  listenerObj.event = options.event;
  isTask && (listenerObj.id = options.id); // 任务监听器特有的 id 字段
  // 任务监听器的 定时器 设置
  if (isTask && options.event === "timeout" && !!options.eventDefinitionType) {
    const timeDefinition = window.bpmnInstances.moddle.create(
      "bpmn:FormalExpression",
      {
        body: options.eventTimeDefinitions,
      }
    );
    const TimerEventDefinition = window.bpmnInstances.moddle.create(
      "bpmn:TimerEventDefinition",
      {
        id: `TimerEventDefinition_${uuid(8)}`,
        [`time${options.eventDefinitionType.replace(/^\S/, (s) =>
          s.toUpperCase()
        )}`]: timeDefinition,
      }
    );
    listenerObj.eventDefinitions = [TimerEventDefinition];
  }
  return window.bpmnInstances.moddle.create("bpmn:timeDuration", listenerObj);
}

// 初始化表单数据
export function initListenerForm(listener) {
  let self = {
    ...listener,
  };
  if (listener.event === "timeout" && listener.eventDefinitions) {
    if (listener.eventDefinitions.length) {
      let k = "";
      for (let key in listener.eventDefinitions[0]) {
        if (key.indexOf("time") !== -1) {
          k = key;
          self.eventDefinitionType = key.replace("time", "").toLowerCase();
        }
      }
      self.eventTimeDefinitions = listener.eventDefinitions[0][k].body;
    }
  }
  return self;
}

// 更新定时扩展属性
export function updateIntermediate(element, timeWay) {
  let eventDefine = Object.create(null);
  window.bpmnInstances.bpmnElement.businessObject.eventDefinitionType = "bpmn:TimerEventDefinition";
  if (timeWay === "timeDuration") {
    var timeDuration = window.bpmnInstances.moddle.create("bpmn:FormalExpression", {
      body: "${timeDuration}"
    })
    var timerEventDefinition = window.bpmnInstances.moddle.create('bpmn:TimerEventDefinition', {
      timeDuration: timeDuration
      //设置时间间隔
    });
    eventDefine = [timerEventDefinition];

    window.bpmnInstances.bpmnElement.businessObject.eventDefinitions = eventDefine;
    window.bpmnInstances.modeling.updateModdleProperties(element, eventDefine);
  }
  if (timeWay === "timeDate") {
    var timeDate = window.bpmnInstances.moddle.create('bpmn:FormalExpression', {
      body: "${timeDate}"
    })
    var timerEventDefinition = window.bpmnInstances.moddle.create("bpmn:TimerEventDefinition", {
      timeDate: timeDate//设置时间间隔
    });
    eventDefine = [timerEventDefinition];

    window.bpmnInstances.bpmnElement.businessObject.eventDefinitions = eventDefine;
    window.bpmnInstances.modeling.updateModdleProperties(element, eventDefine);
  }
  if (timeWay === "timeCycle") {
    var timeCycle = window.bpmnInstances.moddle.create("bpmn:FormalExpression", {
      body: "${timeCycle}"
    })
    var timerEventDefinition = window.bpmnInstances.moddle.create('bpmn:TimerEventDefinition', {
      timeCycle: timeCycle,
    });
    eventDefine = [timerEventDefinition];

    window.bpmnInstances.bpmnElement.businessObject.eventDefinitions = eventDefine;
    window.bpmnInstances.modeling.updateModdleProperties(element, eventDefine);
  }

}
// 更新定时扩展属性
export function updateBoundray(element, timeWay) {

  let eventDefine = Object.create(null);
  window.bpmnInstances.bpmnElement.businessObject.eventDefinitionType = "bpmn:TimerEventDefinition";
  if (timeWay === "timeDuration") {
    var timeDuration = window.bpmnInstances.moddle.create("bpmn:FormalExpression", {
      body: "${taskTimeDuration}"
    })
    var timerEventDefinition = window.bpmnInstances.moddle.create('bpmn:TimerEventDefinition', {
      timeDuration: timeDuration
      //设置时间间隔
    });
    eventDefine = [timerEventDefinition];

    window.bpmnInstances.bpmnElement.businessObject.eventDefinitions = eventDefine;
    window.bpmnInstances.modeling.updateModdleProperties(element, eventDefine);
  }
  if (timeWay === "timeDate") {
    var timeDate = window.bpmnInstances.moddle.create('bpmn:FormalExpression', {
      body: "${taskTimeDate}"
    })
    var timerEventDefinition = window.bpmnInstances.moddle.create("bpmn:TimerEventDefinition", {
      timeDate: timeDate//设置时间间隔
    });
    eventDefine = [timerEventDefinition];

    window.bpmnInstances.bpmnElement.businessObject.eventDefinitions = eventDefine;
    window.bpmnInstances.modeling.updateModdleProperties(element, eventDefine);
  }
  if (timeWay === "timeCycle") {
    var timeCycle = window.bpmnInstances.moddle.create("bpmn:FormalExpression", {
      body: "${taskTimeCycle}"
    })
    var timerEventDefinition = window.bpmnInstances.moddle.create('bpmn:TimerEventDefinition', {
      timeCycle: timeCycle,
    });
    eventDefine = [timerEventDefinition];
    window.bpmnInstances.bpmnElement.businessObject.eventDefinitions = eventDefine;
    window.bpmnInstances.modeling.updateModdleProperties(element, eventDefine);
  }

}

// 创建一个id
export function uuid(length = 8, chars) {
  let result = "";
  let charsString =
    chars || "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let i = length; i > 0; --i) {
    result += charsString[Math.floor(Math.random() * charsString.length)];
  }
  return result;
}

export {
  customElements,
  customShapeAction,
  customFlowAction,
  nodeAttrJson,
  singleNode,
  multipleNode,
};
