import {
  customShapeAction, //左侧工具栏 节点相关配置
  customFlowAction, //箭头
  batchCreateCustom, //循环创建出一系列的元素
} from "../utils";
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

  //连线自定义图标方法
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
      let shape = elementFactory.createShape(
        Object.assign({ type }, { name: title })
      );
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
      className: "entry bpmn-icon-lasso-tool",
      title: "框选",
      action: {
        click: function (event) {
          lassoTool.activateSelection(event);
        },
      },
    },
    ...batchCreateCustom(customFlowAction, createConnect), // 连线
    "tool-separator": {
      group: "event",
      className: "custom-separator",
    }, // 分割线
    ...batchCreateCustom(customShapeAction, createAction),
  });
  return actions;
};
