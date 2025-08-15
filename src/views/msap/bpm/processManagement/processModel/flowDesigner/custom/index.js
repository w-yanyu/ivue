import CustomRenderer from "./render";
import CustomContextPad from "./contextPad";

export default {
  __init__: [
    "customRenderer",
    "contextPadProvider",
  ],
  customRenderer: ["type", CustomRenderer],
  contextPadProvider: ["type", CustomContextPad],
};
