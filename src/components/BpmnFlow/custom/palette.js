import {
  customShapeAction, //左侧工具栏 节点相关配置
  customFlowAction, //箭头
  batchCreateCustom, //循环创建出一系列的元素
} from "../utils/util";
import Vue from "../../../main";
export default function PaletteProvider(
  palette,
  create,
  elementFactory,
  globalConnect,
  lassoTool
) {
  this.create = create;
  this.elementFactory = elementFactory;
  this.globalConnect = globalConnect;
  this.lassoTool = lassoTool;
  palette.registerProvider(this);
}
//它通过另一个标准服务工具   注册下面事件
PaletteProvider.$inject = [
  "palette",
  "create",
  "elementFactory",
  "globalConnect",
  "lassoTool",
];

// 这个是绘制palette的核心，函数名不要变
PaletteProvider.prototype.getPaletteEntries = function (element) {
  var actions = {};
  const { create, elementFactory, globalConnect, lassoTool } = this;

  function createConnect(type, group, className, title, options) {
    return {
      group,
      className,
      title: title,
      action: {
        click: function (event) {
          globalConnect.toggle(event);
        },
      },
    };
  }
  //通用组件方法
  function createAction(type, group, className, title, options) {
    function createListener(event) {
      let shape = elementFactory.createShape(Object.assign({ type }, options));
      create.start(event, shape);
    }
    return {
      group,
      className,
      title: title,
      action: {
        dragstart: createListener,
        click: createListener,
      },
    };
  }
  Object.assign(actions, {
    "lasso-tool": {
      group: "tools",
      className: "icon-custom icon-custom-lasso entry bpmn-icon-lasso-tool",
      title: Vue.$i18ns("框选"),
      action: {
        click: function (event) {
          lassoTool.activateSelection(event);
        },
      },
    },
    ...batchCreateCustom(customFlowAction, createConnect),
    "tool-separator": {
      group: "event",
      className: "custom-separator",
      title: Vue.$i18ns("通用组件"),
    },
    "node-separator": {
      group: "activity",
      className: "custom-separator",
      title: Vue.$i18ns("基础组件"),
    },
    ...batchCreateCustom(customShapeAction, createAction),
  });
  return actions;
};
