//自定义规则 为 Bpmn 加上新的规则约束。
import inherits from "inherits";
import RuleProvider from "diagram-js/lib/features/rules/RuleProvider";
import { canConnect } from "../utils/util";
const HIGH_PRIORITY = 2000; //优先级别
export default function BpmnRules(eventBus) {
  RuleProvider.call(this, eventBus);
}
inherits(BpmnRules, RuleProvider);

BpmnRules.$inject = ["eventBus"];

BpmnRules.prototype.init = function() {
  // 不return 代表继承内置的规则
  this.addRule("shape.create", HIGH_PRIORITY, function(context) {
    const shape = context.shape;
    const target = context.target;
    if (shape && shape.nodeType && shape.nodeType === "when") {
      if (!target.nodeType || target.nodeType !== "case") {
        return false;
      }
    }
  });
  // 创建连线箭头
  this.addRule("connection.create", HIGH_PRIORITY, function(context) {
    const source = context.source;
    const target = context.target;
    return canConnect(source, target);
  });
};
