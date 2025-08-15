import inherits from "inherits";
import BaseRenderer from "diagram-js/lib/draw/BaseRenderer";
import { append as svgAppend, create as svgCreate } from "tiny-svg";
import { customElements } from "../utils";

export default function CustomRenderer(eventBus, styles, textRenderer) {
  BaseRenderer.call(this, eventBus, 1500);
  //计算文字宽度
  // eslint-disable-next-line no-extend-native
  String.prototype.pxWidth = function (font) {
    var canvas =
        String.prototype.pxWidth.canvas ||
        (String.prototype.pxWidth.canvas = document.createElement("canvas")),
      context = canvas.getContext("2d");
    font && (context.font = font);
    var metrics = context.measureText(this);
    return metrics.width;
  };
  //绘制自定义元素
  this.drawCustomElements = function (parentNode, element) {
    const { type } = element; // 获取到类型
    if (type !== "label") {
      if (Object.keys(customElements).includes(type)) {
        element.businessObject.name =
          element.businessObject.name || element.name;
        const elementSvgAttr = customElements[type];
        const customIcon = svgCreate("image", {
          href: elementSvgAttr.href,
          width: elementSvgAttr.width || 44,
          height: elementSvgAttr.height || 44,
        });
        element["width"] = elementSvgAttr.width || 44;
        element["height"] = elementSvgAttr.height || 44;
        svgAppend(parentNode, customIcon);
        if (
          (type === "bpmn:UserTask" ||
            type === "bpmn:ServiceTask" ||
            type === "bpmn:ReceiveTask") &&
          element.businessObject.name
        ) {
          const textWidth = element.businessObject.name.pxWidth("normal 11px");
          const text = svgCreate("text", {
            x: (elementSvgAttr.width || 44) / 2 - textWidth / 1.6,
            y: 63,
            fontSize: "11px",
            fill: "#000",
          });
          text.innerHTML = element.businessObject.name;
          svgAppend(parentNode, text);
        }
        return customIcon;
      }
      const shape = this.bpmnRenderer.drawShape(parentNode, element);
      return shape;
    }
  };
}

inherits(CustomRenderer, BaseRenderer);

CustomRenderer.$inject = ["eventBus", "styles", "textRenderer"];

CustomRenderer.prototype.canRender = function (element) {
  return true;
};

CustomRenderer.prototype.drawShape = function (parentNode, element) {
  const { type } = element;
  if (Object.keys(customElements).includes(type)) {
    return this.drawCustomElements(parentNode, element);
  }
};
