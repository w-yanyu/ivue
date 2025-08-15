/* eslint-disable no-unused-vars */
import inherits from "inherits";
import BaseRenderer from "diagram-js/lib/draw/BaseRenderer";
import {
  append as svgAppend,
  create as svgCreate,
  clear as svgClear,
  attr as svgAttr,
  classes as svgClasses,
} from "tiny-svg";
import { customElements } from "../utils/util";
import * as _ from "lodash";

/**
 * 自定义节点渲染
 */
export default function CustomRenderer(eventBus, styles, bpmnRenderer) {
  BaseRenderer.call(this, eventBus, 1500);
  var computeStyle = styles.computeStyle;
  this.drawElements = function (parentNode, element) {
    const type = element.type; // 获取到类型
    if (type !== "label") {
      if (Object.keys(customElements).includes(type)) {
        return drawCustomElements(parentNode, element, bpmnRenderer);
      }
      const shape = bpmnRenderer.drawShape(parentNode, element);
      return shape;
    }
  };
}

inherits(CustomRenderer, BaseRenderer);

CustomRenderer.$inject = ["eventBus", "styles", "bpmnRenderer"];

CustomRenderer.prototype.canRender = function (element) {
  return true;
};

CustomRenderer.prototype.drawShape = function (parentNode, element) {
  const shape = this.drawElements(parentNode, element);
  setShapeProperties(shape, element);
  return shape;
};

CustomRenderer.prototype.getShapePath = function (shape) {};

function drawCustomElements(parentNode, element, bpmnRenderer) {
  const { type } = element;
  const $attrs = element.businessObject.$attrs;
  let nodeType = element.nodeType || $attrs.nodeType;
  if (!nodeType) {
    return bpmnRenderer.drawShape(parentNode, element);
  }
  $attrs.nodeType = nodeType;
  element.businessObject.$attrs.name =
    element.longName || $attrs.longname || $attrs.nodeName || nodeType;

  // 直接渲染xml时没有nodeType
  if (!element.nodeType) {
    element.nodeType = nodeType;
  }
  if (element.nodeType === "case") {
    element.businessObject.$attrs.id = element.id;
    element.businessObject.$attrs.name =
      element.businessObject.name || element.longName;
  }
  if (
    type === "bpmn:IntermediateThrowEvent" ||
    type === "bpmn:ExclusiveGateway" ||
    type === "bpmn:ParallelGateway" ||
    type === "bpmn:StartEvent" ||
    type === "bpmn:EndEvent"
  ) {
    element["width"] =
      (pathConfig[nodeType] && pathConfig[nodeType].width) || 44;
    element["height"] =
      (pathConfig[nodeType] && pathConfig[nodeType].height) || 44;
    drawIcon(parentNode, pathConfig[nodeType]);

    let shape = bpmnRenderer.drawShape(parentNode, element);
    svgClasses(shape).add(`custom-no-line`);
    return shape;
  }
  let shape = bpmnRenderer.drawShape(parentNode, element);
  svgClasses(shape).add(`custom-${nodeType}-shape`);
  console.log("drawCustomElements-----", shape);
  return shape;
}

function setShapeProperties(shape, element) {
  const type = element.type;
  if (customElements[type]) {
    const properties = customElements[type];
    Object.keys(properties).forEach((prop) => {
      shape.style.setProperty(prop, properties[prop]);
    });
  }
}

/**
 *
 * @param {SVGElement} parentNode svg父节点
 * @param {string} pathConfig path类名
 */
function drawIcon(parentNode, pathConfig) {
  const svg = svgCreate("svg", {
    class: "icon",
    "aria-hidden": "true",
  });
  const use = svgCreate("use", {
    href: `#${pathConfig.href}`,
    width: pathConfig.width || 44,
    height: pathConfig.height || 44
  });
  svgAttr(svg, {
    color: pathConfig.fill || "#012a67",
  });
  svgAppend(parentNode, svg);
  svgAppend(svg, use);
}
const pathConfig = {
  start: {
    href: "efp-icon-kaishi"
  },
  end: {
    href: "efp-icon-jieshu"
  },
  case: {
    href: "oneFill-case"
  },
  loop: {
    href: "oneFill-loop"
  },
  simpleScoreCard: {
    href: "oneFill-pingfenka"
  },
  complexScoreCard: {
    href: "oneFill-pingfenka"
  },
  ruleDecision: {
    href: "oneFill-rule"
  },
  ruleTable: {
    href: "oneFill-table"
  },
  decisionTree: {
    href: "oneFill-tree"
  },
  ruleGroup: {
    href: "oneFill-rules"
  },
  ruleScript: {
    href: "oneFill-script"
  },
  ruleSubFlow: {
    href: "oneFill-subFlow"
  },
  ruleVariable: {
    href: "oneFill-bianliang"
  },
  ruleDataResource: {
    href: "oneFill-shujuyuan"
  }
};
