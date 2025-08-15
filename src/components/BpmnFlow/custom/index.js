import CustomPalette from "./palette"; //左侧工具栏 调色板提供程序
import CustomRenderer from "./renderer";
import CustomContextPad from "./contextPad"; //内容面板 上下文面板
import CustomRules from "./rules"; //自定义规则
// 除了引进的模块的名字可以修改，其他的不建议修改，会报错
export default {
  __init__: [
    "paletteProvider",
    "customRenderer",
    "customRules",
    "contextPadProvider"
  ],
  paletteProvider: ["type", CustomPalette],
  customRenderer: ["type", CustomRenderer],
  customRules: ["type", CustomRules],
  contextPadProvider: ["type", CustomContextPad]
};
