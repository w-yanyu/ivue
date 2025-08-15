import { isAny } from "bpmn-js/lib/features/modeling/util/ModelingUtil";
import { customShapeAction } from "../utils";

// 获取所有节点类型，排除结束节点与箭头
function getNodeType() {
  const arr = [];
  customShapeAction.forEach((item) => {
    if (item.action) {
      if (!arr.includes(item.action[0]) && item.action[0] !== "bpmn:EndEvent") {
        arr.push(item.action[0]);
      }
    }
  });
  return arr;
}

export default function ContextPadProvider(
  contextPad,
  config,
  injector,
  translate,
  bpmnFactory,
  elementFactory,
  create,
  modeling,
  connect
) {
  this.create = create;
  this.elementFactory = elementFactory;
  this.translate = translate;
  this.bpmnFactory = bpmnFactory;
  this.modeling = modeling;
  this.connect = connect;
  config = config || {};
  if (config.autoPlace !== false) {
    this.autoPlace = injector.get("autoPlace", false);
  }
  contextPad.registerProvider(this);
}

ContextPadProvider.$inject = [
  "contextPad",
  "config",
  "injector",
  "translate",
  "bpmnFactory",
  "elementFactory",
  "create",
  "modeling",
  "connect",
];

ContextPadProvider.prototype.getContextPadEntries = function (element) {
  const { translate, modeling, connect } = this;
  const bpmnType = element && element.type;

  var actions = {};
  var businessObject = element.businessObject;

  // 删除功能
  function removeElement(e) {
    // 解决组件为定时绑定时，删除总是有多余节点
    if (element.type === 'bpmn:BoundaryEvent') {
      window.bpmnInstances.modeling.updateProperties(element, {
        extensionElements: undefined,
      });
    }
    modeling.removeElements([element]);
  }
  function deleteElement() {
    return {
      className: "entry bpmn-icon-trash",
      title: translate("删除"),
      action: {
        click: removeElement,
      },
    };
  }

  if (bpmnType !== "label") {
    // 所有元素添加删除
    actions["delete"] = deleteElement();
  }

  // 连线
  function startConnect(event, element) {
    connect.start(event, element);
  }
  function createConnect() {
    return {
      className: "entry bpmn-icon-connection-multi",
      title: translate("连线"),
      action: {
        click: startConnect,
        dragstart: startConnect,
      },
    };
  }

  // 需要连线的节点,不包括结束节点
  if (isAny(businessObject, getNodeType()) && bpmnType !== "label") {
    Object.assign(actions, { connect: createConnect() });
  }

  return actions;
};
