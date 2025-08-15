<template>
  <div class="flow-containers">
    <div class="canvas_list">
      <div class="canvas_list_item" v-show="bpmnModelerShow_1">
        <!-- 工具栏 -->
        <div class="tool-bar">
          <div class="left">旧版本</div>
          <div class="right">
            <el-button
              icon="el-icon-zoom-in"
              size="mini"
              @click="zoomViewport('bpmnModeler_1', true)"
              >放大</el-button
            >
            <el-button
              icon="el-icon-zoom-out"
              size="mini"
              @click="zoomViewport('bpmnModeler_1', false)"
              >缩小</el-button
            >
          </div>
        </div>
        <!-- 画布 流程图 + 图标栏 -->
        <div class="canvas" ref="canvas_1"></div>
      </div>
      <div class="canvas_list_item" v-show="bpmnModelerShow_2">
        <!-- 工具栏 -->
        <div class="tool-bar">
          <div class="left">新版本</div>
          <div class="right">
            <el-button
              icon="el-icon-zoom-in"
              size="mini"
              @click="zoomViewport('bpmnModeler_2', true)"
              >放大</el-button
            >
            <el-button
              icon="el-icon-zoom-out"
              size="mini"
              @click="zoomViewport('bpmnModeler_2', false)"
              >缩小</el-button
            >
          </div>
        </div>
        <!-- 画布 流程图 + 图标栏 -->
        <div class="canvas" ref="canvas_2"></div>
      </div>
    </div>
    <!-- 属性栏 -->
    <div
      :class="`attr-bar${onlyRead ? ' no-shadow' : ''}`"
      :style="`height: calc(${handleToggle}px - 40px)`"
    >
      <div v-if="nodeName" class="node-name">
        {{ nodeName }}
        <i
          :class="`el-icon-arrow-${showAttrs ? 'down' : 'up'}`"
          @click="showAttrs = !showAttrs"
        >
        </i>
      </div>
      <div class="flow-attrs">
        <scoreCardInfo
          v-if="
            currentEditAtrr.nodeType === 'simpleScoreCard' ||
              currentEditAtrr.nodeType === 'complexScoreCard'
          "
          ref="scoreCard"
          :saveAttr="saveAttr"
          :onlyRead="onlyRead"
          :conditionsList="conditionsList"
        ></scoreCardInfo>
        <ruleDecisionInfo
          v-else-if="currentEditAtrr.nodeType === 'ruleDecision'"
          ref="ruleDecision"
          :saveAttr="saveAttr"
          :onlyRead="onlyRead"
        ></ruleDecisionInfo>
        <decisionTreeInfo
          v-else-if="currentEditAtrr.nodeType === 'decisionTree'"
          ref="decisionTree"
          :saveAttr="saveAttr"
          :onlyRead="onlyRead"
          :cParentParams="cParentParams"
        ></decisionTreeInfo>
        <ruleGroupInfo
          v-else-if="currentEditAtrr.nodeType === 'ruleGroup'"
          ref="ruleGroup"
          :saveAttr="saveAttr"
          :onlyRead="onlyRead"
        ></ruleGroupInfo>
        <ruleScriptInfo
          v-else-if="currentEditAtrr.nodeType === 'ruleScript'"
          ref="ruleScript"
          :saveAttr="saveAttr"
          :onlyRead="onlyRead"
        ></ruleScriptInfo>
        <caseInfo
          v-else-if="currentEditAtrr.nodeType === 'case'"
          ref="caseInfo"
          :saveAttr="saveAttr"
          :onlyRead="onlyRead"
        ></caseInfo>
        <caseInfo2
          v-else-if="currentEditAtrr.nodeType === 'when'"
          :saveAttr="saveAttr"
          :onlyRead="onlyRead"
        ></caseInfo2>
        <div v-else>
          <to-json
            v-show="ruleFlowViewIndex == 1"
            style="width: calc(100% - 4px)"
            toUrl="/components/BpmnFlow/rule_flow_view.json"
            :params="ruleFlowViewData_1"
          ></to-json>
          <to-json
            v-show="ruleFlowViewIndex == 2"
            style="width: calc(100% - 4px)"
            toUrl="/components/BpmnFlow/rule_flow_view.json"
            :params="ruleFlowViewData_2"
          ></to-json>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 组件说明
 * 支持两个规则流对比查看，不支持修改。
 */
import BpmnModeler from "bpmn-js/lib/Modeler"; //Modeler带有左侧节点栏和右侧属性栏，点击节点可进行相应操作
import BpmnViewer from "bpmn-js/lib/Viewer"; //Viewer是查看，不能更改节点，
import MoveCanvasModule from "diagram-js/lib/navigation/movecanvas";
import gridModule from "diagram-js/lib/features/grid-snapping/visuals";
import * as _ from "lodash";
import { getBusinessObject } from "bpmn-js/lib/util/ModelUtil";
import {
  isSingleNode,
  canConnect,
  nodeAttrJson,
  nodeRequiredAttr
} from "./utils/util";
import { jsonToXmlDoc } from "./utils/js2xml";
import { mapGetters, mapMutations } from "vuex";
import { bpmnData1 } from "./utils/data";
import scoreCardInfo from "./attrBar/scoreCardInfo";
import decisionTreeInfo from "./attrBar/decisionTreeInfo";
import ruleDecisionInfo from "./attrBar/ruleDecisionInfo";
import ruleGroupInfo from "./attrBar/ruleGroupInfo";
import ruleScriptInfo from "./attrBar/ruleScriptInfo";
import caseInfo from "./attrBar/caseInfo";
import caseInfo2 from "./attrBar/caseInfo";
import CustomModeler from "./custom";
import CustomRenderer from "./custom/renderer";

export default {
  name: "ruleFlowBpmnIndexView",
  props: {
    cParentParams: Object,

    cParentParams_1: {
      // left canvas
      type: Object,
      required: true
    },
    cParentParams_2: {
      // right canvas
      type: Object,
      required: false
    }
  },
  components: {
    scoreCardInfo,
    decisionTreeInfo,
    ruleDecisionInfo,
    ruleGroupInfo,
    ruleScriptInfo,
    caseInfo,
    caseInfo2
  },
  data() {
    return {
      /** 控制参数 **/
      showAttrs: true, // 是否显示当前所选择的节点属性
      onlyRead: true, // 是否只允许查看

      /** 数据源 **/
      conditionsList: [], //联动条件选择选项字典
      bpmnXml: "", // bpmn xml 数据源(当前显示的)
      defaultXmlStr: bpmnData1, // // bpmn xml 数据源(默认)

      /** 建模器相关数据 **/
      bpmnModeler_1: null, // bpmn建模器-1
      bpmnModeler_2: null, // bpmn建模器-2

      bpmnModelerShow_1: false, // bpmn建模器-1-是否显示
      bpmnModelerShow_2: false, // bpmn建模器-2-是否显示

      defaultXmlStr_1: "",
      defaultXmlStr_2: "",

      ruleFlowViewData_1: {}, // 数据源(bpmn建模器-1)
      ruleFlowViewData_2: {}, // 数据源(bpmn建模器-2)
      ruleFlowViewIndex: 0, // 当前显示的数据源 0=无、1=bpmn建模器-1、2=bpmn建模器-2

      /** 当前显示的节点信息 **/

      xmlJsonResult: [], // 默认父容器（最外层）
      parentNode: "", // 现在修改节点的父容器
      parentNodeArr: {
        caseArr: [], // 记录存储case开始的节点的父节点
        forkArr: [] // 记录存储fork开始的节点的父节点
      },
      currentEditNode: "" // 选中的节点
    };
  },
  computed: {
    ...mapGetters(["currentEditAtrr"]),
    nodeName() {
      let name = "流程信息";
      let nodeType = this.currentEditAtrr.nodeType || "";
      switch (nodeType) {
        case "case":
          name = "分支属性";
          break;
        case "when":
          name = "分支条件属性";
          break;
        case "simpleScoreCard":
          name = "简单评分卡信息";
          break;
        case "complexScoreCard":
          name = "复杂评分卡信息";
          break;
        case "ruleDecision":
          name = "规则信息";
          break;
        case "decisionTree":
          name = "决策树信息";
          break;
        case "ruleGroup":
          name = "规则集信息";
          break;
        case "ruleScript":
          name = "规则脚本信息";
          break;
        default:
          break;
      }
      return name;
    },
    handleToggle() {
      let bottomHeight = 320;
      if (this.showAttrs) {
        bottomHeight = 320;
      } else {
        bottomHeight = 80;
      }
      return bottomHeight;
    }
  },
  created() {
    this.initFlowData();
    this.getConditionsList();
  },
  watch: {
    nodeName(newData, oldData) {
      console.log("1111111", newData, oldData);
    }
  },
  methods: {
    ...mapMutations(["SET_EDIT_ATTR"]),
    initFlowData() {
      console.log(`cParentParams_1 ${JSON.stringify(this.cParentParams_1)}`);
      console.log(`cParentParams_2 ${JSON.stringify(this.cParentParams_2)}`);
      if (
        this.cParentParams_1.flowUInfo == undefined ||
        this.cParentParams_1.flowUInfo == null ||
        this.cParentParams_1.flowUInfo == ""
      ) {
        this.bpmnModelerShow_1 = false;
      } else {
        this.ruleFlowViewData_1 = this.cParentParams_1;
        this.defaultXmlStr_1 =
          this.cParentParams_1.flowUInfo &&
          this.cParentParams_1.flowUInfo.indexOf("<?xml") > -1
            ? this.cParentParams_1.flowUInfo
            : bpmnData1;

        // 默认数据取第一组数据
        this.bpmnXml = this.defaultXmlStr_1;
        this.defaultXmlStr = this.defaultXmlStr_1;

        this.bpmnModelerShow_1 = true;
        this.$nextTick(() => {
          this.initBpmn("bpmnModeler_1", "canvas_1", "defaultXmlStr_1");
        });
      }

      if (
        this.cParentParams_2.flowUInfo == undefined ||
        this.cParentParams_2.flowUInfo == null ||
        this.cParentParams_2.flowUInfo == ""
      ) {
        this.bpmnModelerShow_2 = false;
      } else {
        this.ruleFlowViewData_2 = this.cParentParams_2;
        this.defaultXmlStr_2 =
          this.cParentParams_2.flowUInfo &&
          this.cParentParams_2.flowUInfo.indexOf("<?xml") > -1
            ? this.cParentParams_2.flowUInfo
            : bpmnData1;

        this.bpmnModelerShow_2 = true;
        this.$nextTick(() => {
          this.initBpmn("bpmnModeler_2", "canvas_2", "defaultXmlStr_2");
        });
      }
    },
    // 放大缩小
    zoomViewport(ref, zoomIn = true) {
      let zoom = 1;
      zoom = this[ref].get("canvas").zoom();
      zoom += zoomIn ? 0.1 : -0.1;
      this[ref].get("canvas").zoom(zoom);
    },
    // 初始化bpmn
    initBpmn(bpmnModelerKey, canvasKey, bpmnXmlStrKey) {
      // 获取到属性ref为“canvas”的dom节点
      const canvas = this.$refs[canvasKey];
      // 避免缓存，每次清一下
      this[bpmnModelerKey] && this[bpmnModelerKey].destroy();
      // onlyRead为true则是预览模式，否则为编辑模式
      if (this.onlyRead) {
        // 建模
        this[bpmnModelerKey] = new BpmnViewer({
          container: canvas,
          additionalModules: [
            MoveCanvasModule,
            {
              __init__: ["customRenderer"],
              customRenderer: ["type", CustomRenderer]
            }
          ]
        });

        this.transformCanvas(bpmnModelerKey, bpmnXmlStrKey);
      } else {
        console.log(`no edit mode!`);
      }
    },
    // xml解析成图
    async transformCanvas(bpmnModelerKey, bpmnXmlStrKey) {
      try {
        //回显xml流程图
        await this[bpmnModelerKey].importXML(this[bpmnXmlStrKey], err => {
          if (err) {
            console.error(err);
          }
          // 视图居中
          this[bpmnModelerKey].get("canvas").zoom("fit-viewport", "auto");
        });
        this.registerEvents(bpmnModelerKey);
      } catch (err) {
        console.log(`transformCanvas error ${err}`);
      }
    },
    // 注册事件
    registerEvents(bpmnModelerKey) {
      this.addBpmnListener(bpmnModelerKey);
      this.addModelerListener(bpmnModelerKey);
      this.addEventBusListener(bpmnModelerKey);
    },
    // 添加绑定画布事件
    addBpmnListener(bpmnModelerKey, getChangeXmlKey, reconnectVerifyKey) {
      // TODO 不同建模器调用指定函数，临时处理
      if (bpmnModelerKey == "bpmnModeler_1") {
        getChangeXmlKey = "getChangeXml_1";
        reconnectVerifyKey = "reconnectVerify_1";
      } else if (bpmnModelerKey == "bpmnModeler_2") {
        getChangeXmlKey = "getChangeXml_2";
        reconnectVerifyKey = "reconnectVerify_2";
      }

      // 给图绑定事件，当图有发生改变就会触发这个事件
      this[bpmnModelerKey].on(
        "commandStack.changed",
        _.debounce(this[getChangeXmlKey], 0)
      );
      // 改变箭头指向
      this[bpmnModelerKey].on(
        "commandStack.connection.layout.postExecuted",
        _.debounce(this[reconnectVerifyKey], 0)
      );
    },
    // modeler事件
    addModelerListener(bpmnModelerKey) {
      const bpmnjs = this[bpmnModelerKey];
      const events = ["shape.added", "shape.removed"];
      events.forEach(event => {
        this[bpmnModelerKey].on(event, e => {
          let elementRegistry = bpmnjs.get("elementRegistry"); //获取流程图中所有节点信息
          //获取形状实例
          let shape = e.element ? elementRegistry.get(e.element.id) : e.shape;
          if (event === "shape.added") {
            if (shape && shape.type !== "label") {
              setTimeout(() => {
                let newAttr = {
                  id: `${shape.nodeType}_${new Date().getTime()}`,
                  nodeType: shape.nodeType,
                  nodeName: shape.nodeName
                };
                this.updateNodeProperties(bpmnModelerKey, shape, newAttr);
              }, 0);
            }
          } else if (event === "shape.removed") {
            // 删除节点时将当前节点信息置空
            this.SET_EDIT_ATTR({});
          }
        });
      });
    },
    // 添加element节点事件
    addEventBusListener(bpmnModelerKey) {
      console.log(`addEventBusListener bpmnModelerKey ${bpmnModelerKey}`);
      const eventBus = this[bpmnModelerKey].get("eventBus");
      // 注册节点事件，eventTypes中可以写多个事件
      const eventTypes = [
        "element.click", //节点点击
        "element.dblclick" //节点双击
      ];
      eventTypes.forEach(eventType => {
        eventBus.on(eventType, e => {
          console.log(`addEventBusListener eventBus e ${JSON.stringify(e)}`);
          this.checkRuleFlowViewIndex(bpmnModelerKey);

          if (!e || this.isLabel(e.element.type)) {
            return;
          }
          if (eventType === "element.dblclick") {
            const element = e.element;
            if (
              this.isStratEvent(element.type) || //是否是开始节点
              this.isEndEvent(element.type) || //是否是结束节点
              this.isProcess(element.type) || //是否是过程节点
              (this.isSequenceFlow(element.type) &&
                element.source.nodeType !== "case") ||
              (element.source &&
                element.source.nodeType === "case" &&
                element.source.incoming.length > 1)
            ) {
              return "";
            }
          } else if (eventType === "element.click") {
            // 节点点击后想要做的处理
            // 此时想要点击节点后，拿到节点实例，通过外部输入更新节点名称
            const attr = getBusinessObject(e.element);
            const nodeType = attr.$attrs.nodeType;
            const copyAttr = _.cloneDeep(attr.$attrs);
            const element = e.element;
            this.SET_EDIT_ATTR(
              _.assign(
                {},
                nodeAttrJson[nodeType],
                {
                  nodeType
                },
                copyAttr
              )
            );
            // 选中的节点类
            this.currentEditNode = element;
            if (this.isWhenNode(element)) {
              this.getNodeProperties(element, "when");
            } else {
              this.getNodeProperties(element);
            }
            //发送消息主动刷新接口数据
            if (
              element.source &&
              element.source.nodeType &&
              element.source.nodeType === "case"
            ) {
              this.$bus.emit("initCasePage", {});
            }
          }
        });
      });
    },
    /**
     * 控制当前的需要显示的默认流程信息
     * 通过对比数据是否存在判断数据源
     * // TODO 不同数据源需要做相应处理
     */
    checkRuleFlowViewIndex(bpmnModelerKey) {
      console.log(
        `checkRuleFlowViewIndex bpmnModelerKey11111 ${bpmnModelerKey}`
      );
      if (bpmnModelerKey == "bpmnModeler_1") {
        this.ruleFlowViewIndex = 1;
      } else if (bpmnModelerKey == "bpmnModeler_2") {
        this.ruleFlowViewIndex = 2;
      } else {
        this.ruleFlowViewIndex = 0;
      }
      console.log(
        `checkRuleFlowViewIndex ruleFlowViewIndex22222 ${
          this.ruleFlowViewIndex
        }`
      );
      console.log("wwwwwwwwwwww");
    },
    // 获取改变后的xml
    getChangeXml_1() {
      // eslint-disable-next-line handle-callback-err
      this.bpmnModeler_1.saveXML({ format: true }, (err, xml) => {
        this.bpmnXml = xml;
      });
    },
    // 获取改变后的xml
    getChangeXml_2() {
      // eslint-disable-next-line handle-callback-err
      this.bpmnModeler_2.saveXML({ format: true }, (err, xml) => {
        this.bpmnXml = xml;
      });
    },
    // 判断是否是线
    isSequenceFlow(type) {
      return type === "bpmn:SequenceFlow";
    },
    // 根节点
    isProcess(type) {
      return type === "bpmn:Process";
    },
    // label
    isLabel(type) {
      return type === "label";
    },
    // 开始节点
    isStratEvent(type) {
      return type === "bpmn:StartEvent";
    },
    // 结束节点
    isEndEvent(type) {
      return type === "bpmn:EndEvent";
    },
    // 是否为条件节点
    isWhenNode(shape) {
      if (this.isSequenceFlow(shape.type)) {
        if (shape.source && shape.source.nodeType === "case") {
          return true;
        } else {
          return false;
        }
      }
      return false;
    },
    treeToArr(item) {
      let result = [];
      for (item of item) {
        var res = JSON.parse(JSON.stringify(item));
        delete res["children"];
        result.push(res);
        if (item.children instanceof Array && item.children.length > 0) {
          result = result.concat(this.treeToArr(item.children));
        }
      }
      return result;
    },
    // 删除bpmn使用的属性
    delAttrByKey(arr) {
      const that = this;
      _.forEach(arr, item => {
        if (item.attr) {
          item.attr = this.delEmptyAttr(item.attr);
          if (item.attr.originId) {
            item.attr.id = item.attr.originId;
          }
          item.attr = _.omit(item.attr, [
            "name",
            // "nodeType",
            "originId",
            "isFirst"
          ]);
          if (item.attr.paramsName) {
            item.attr.name = item.attr.paramsName;
          }
          item.attr = _.omit(item.attr, ["paramsName"]);
          if (item.children.length) {
            that.delAttrByKey(item.children);
          }
        }
      });
      return arr;
    },
    // 过滤掉值为空的属性
    delEmptyAttr(attrObj) {
      const delKeys = [];
      _.forEach(attrObj, (value, key) => {
        if (value === "") {
          delKeys.push(key);
        }
      });
      return _.omit(attrObj, delKeys);
    },
    // target 要添加的对象，origin： 待修改的对象（父容器）
    setJsonByNode(bpmnModelerKey, target, origin = "") {
      const that = this;
      let _node = "";
      if (!origin) {
        _node = that.setCurrentNode(
          that.xmlJsonResult,
          target,
          target.nodeType
        );
        that.updateNodeProperties(bpmnModelerKey, target, _node);
      } else {
        _node = that.setCurrentNode(origin, target, target.nodeType);
      }
      if (target.outgoing.length) {
        // 单进单出节点
        if (isSingleNode(target.nodeType)) {
          target = target.outgoing[0].target;
          that.setJsonByNode(bpmnModelerKey, target, that.parentNode);
        } else {
          if (target.nodeType === "case") {
            // case 开始节点
            if (target.outgoing.length > 1) {
              // item 为case出去的箭头，代表when
              _.forEach(target.outgoing, (item, index) => {
                // 第一个when,标记一下当前case的父容器，作为结束case的父容器
                if (index === 0) {
                  let newAttr = {
                    isFirst: true
                  };
                  that.updateNodeProperties(bpmnModelerKey, target, newAttr);
                  that.parentNodeArr.caseArr.push({
                    origin,
                    isFirst: target.businessObject.$attrs.isFirst
                  });
                }
                // 一个分支增加一个when节点作为父容器
                let whenNode = that.setCurrentNode(_node, item, "when");
                whenNode.attr.nodeType = "when";
                whenNode.attr.id = whenNode.originId;
                that.setJsonByNode(bpmnModelerKey, item.target, whenNode);
              });
              // case 结束节点
            } else if (target.outgoing.length === 1) {
              // 获取对应开始节点，就近原则
              const startCase = that.parentNodeArr.caseArr.pop();
              if (startCase && startCase.isFirst) {
                that.setJsonByNode(
                  bpmnModelerKey,
                  target.outgoing[0].target,
                  startCase.origin
                );
              }
            }
          }
        }
      }
    },
    // 设置json。 origin：要修改的对象，target当前获取数据对象，nodeType：节点类型。return 当前设置对象
    setCurrentNode(origin, target, nodeType) {
      const that = this;
      // 多进一出代表分支结束（case, fork）
      if (
        (!isSingleNode(nodeType) && target.outgoing.length < 2) ||
        nodeType === "end"
      ) {
        return "";
      }
      const attrs = _.assign({}, target.businessObject.$attrs);
      let node = {
        tagName: nodeType,
        attr: attrs,
        children: []
      };
      node.originId = target.id;
      // node.nodeName =
      //     target.businessObject.$attrs.nodeName || target.nodeName;
      if (!origin.children) {
        origin.push(node);
      } else {
        origin.children.push(node);
      }
      that.parentNode = origin;
      return node;
    },
    // 更新节点属性
    updateNodeProperties(bpmnModelerKey, shape, newAttr) {
      const that = this;
      const modeling = that[bpmnModelerKey].get("modeling");
      const attr = getBusinessObject(shape);
      modeling.updateProperties(shape, Object.assign({}, attr.$attrs, newAttr));
    },
    // specialType: 特殊节点，when
    getNodeProperties(shape, specialType = "") {
      const that = this;
      const attr = getBusinessObject(shape);
      const nodeType = !specialType ? shape.nodeType : specialType;
      if (nodeAttrJson[nodeType] && !nodeAttrJson[nodeType].originId) {
        nodeAttrJson[nodeType].originId = attr.id;
      }
      that.currentEditAtrr = _.assign({}, nodeAttrJson[nodeType], attr.$attrs);
      if (nodeType && nodeType !== "start" && nodeType !== "end") {
        that.currentEditAtrr.nodeName = nodeAttrJson[nodeType].nodeName =
          shape.longName || shape.nodeName;
      }
      if (nodeAttrJson[nodeType]) {
        nodeAttrJson[nodeType].originId = shape.id;
      }
      const copyAttr = _.cloneDeep(attr.$attrs);
      if (copyAttr && copyAttr.useTemplate !== undefined) {
        if (copyAttr.useTemplate === "true" || copyAttr.useTemplate === true) {
          copyAttr.useTemplate = true;
        } else {
          copyAttr.useTemplate = false;
        }
      }
      this.SET_EDIT_ATTR(
        _.assign(
          {},
          nodeAttrJson[nodeType],
          {
            nodeType
          },
          copyAttr
        )
      );
    },
    // 箭头重连校验
    reconnectVerify_1() {
      const that = this;
      const commandStack = that.bpmnModeler_1.get("commandStack");
      const lastCommand = commandStack._stack[commandStack._stack.length - 1];
      if (lastCommand && lastCommand.id) {
        const lastOperations = commandStack._stack.filter(
          item => item.id === lastCommand.id
        );
        const reconnect = _.find(lastOperations, {
          command: "connection.reconnect"
        });
        if (!reconnect) {
          return false;
        }
        const newTarget = reconnect.context.newTarget;
        const newSource = reconnect.context.newSource;

        if (!canConnect(newSource, newTarget, true)) {
          commandStack.undo();
        }
      }
    },
    // 箭头重连校验
    reconnectVerify_2() {
      const that = this;
      const commandStack = that.bpmnModeler_2.get("commandStack");
      const lastCommand = commandStack._stack[commandStack._stack.length - 1];
      if (lastCommand && lastCommand.id) {
        const lastOperations = commandStack._stack.filter(
          item => item.id === lastCommand.id
        );
        const reconnect = _.find(lastOperations, {
          command: "connection.reconnect"
        });
        if (!reconnect) {
          return false;
        }
        const newTarget = reconnect.context.newTarget;
        const newSource = reconnect.context.newSource;

        if (!canConnect(newSource, newTarget, true)) {
          commandStack.undo();
        }
      }
    },
    // 保存修改的属性 TODO 待定
    saveAttr(bpmnModelerKey) {
      return false;

      const editAtrr = _.cloneDeep(this.currentEditAtrr);
      let name = editAtrr.longname || editAtrr.name;
      let newAttr = _.assign({}, editAtrr, { name });
      newAttr = this.handleAttr(newAttr);
      this.updateNodeProperties(bpmnModelerKey, this.currentEditNode, newAttr);
    },
    // 处理attr,不包括bpmn使用的属性
    handleAttr(attrObj) {
      if (attrObj.params && Array.isArray(attrObj.params)) {
        attrObj.params = attrObj.params.map(item => {
          return _.omit(item, ["index"]);
        });
        attrObj.params = JSON.stringify(attrObj.params);
      }
      return attrObj;
    },
    // 返回列表页
    goBack() {
      this.$dataBus.doCallBack(this, {});
      this.SET_EDIT_ATTR({});
    },
    //初始化条件选择选项字典
    getConditionsList() {
      this.conditionsList = [];
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
          servicecode: "deci080101",

          isList: true
        })
        .then(obj => {
          console.log("获取联动条件选择选项字典回调", obj.data);
          this.conditionsList = obj.data;
        })
        .catch(reg => {});
    }
  }
};
</script>

<style lang="less">
@import "~bpmn-js/dist/assets/diagram-js.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

.flow-containers {
  height: 100%;
  background: #fff;
  overflow: hidden;
  position: relative;
  .canvas_list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .canvas_list_item {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .tool-bar {
        width: 95%;

        box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.4);
        padding: 5px 16px;
        display: flex;
        justify-content: space-around;
        .left {
          flex: 1;
          line-height: 28px;
          font-size: 18px;
          font-weight: bold;
        }
      }
      .canvas {
        margin-top: 10px;
        width: 95%;
        height: 95%;
        border: 1px solid #dddddd;
        .djs-palette {
          width: 126px;
          height: calc(100% - 42px);
          padding-left: 5px;
          top: 5px;
          left: 0;
          border-width: 0 1px 0 0;
        }
        .bjs-powered-by {
          display: none;
        }
      }
      .attr-bar {
        width: calc(100% - 126px);
        position: absolute;
        right: 0;
        bottom: 0;
        background-color: #fff;
        box-shadow: 6px 5px 5px 5px rgba(0, 0, 0, 0.3);
        .node-name {
          border-bottom: 1px solid #e4e7ed;
          padding: 6px 16px;
          font-size: 16px;
          font-weight: bold;
          color: #444;
          height: 27px;
          line-height: 27px;

          i {
            float: right;
            line-height: 28px;
          }
        }
        .flow-attrs {
          height: calc(100% - 40px);
          overflow: scroll;
        }
      }
      .no-shadow {
        // box-shadow: none;
        width: 100%;
      }
      .subflow-context-menu {
        position: fixed;
        z-index: 999999;
        background: white;
        padding: 8px 12px;
        border: 1px solid #f0f0f0;
        cursor: pointer;
        font-size: 12px;
        border-radius: 3px;
        box-shadow: 0 0px 15px 0px #ccc;
        &:hover {
          color: #333;
        }
      }
      .djs-shape {
        .djs-visual {
          .custom-case-shape {
            & + path {
              stroke-width: 1px !important;
            }
          }
          .custom-no-line {
            stroke-width: 0px !important;
            & + circle {
              stroke-width: 0px !important;
            }
            & + path {
              stroke-width: 0px !important;
              fill-opacity: 0;
            }
          }
        }
      }
      path[style*="#sequenceflow-end-white"] {
        stroke: #1195db !important;
      }
      marker[id*="sequenceflow-end-white"] {
        path {
          fill: #1195db !important;
          stroke-width: 0px !important;
        }
      }
      .djs-popup,
      .djs-palette {
        background-color: #fff !important;
      }
      .djs-palette .entry:hover {
        &.iconfont:before,
        .icon-custom::after {
          color: #003686;
        }
      }
      .icon-custom {
        margin-bottom: 5px;

        &:before {
          display: inline-block;
          line-height: 1;
        }

        &:hover:before {
          color: #003686;
        }

        &:after {
          width: 100%;
          font-size: 12px;
          color: #333;
          line-height: 1;
          display: block;
        }

        &.icon-custom-flow {
          &:after {
            content: "连线";
          }
        }

        &.icon-custom-lasso {
          &:after {
            content: "框选";
          }
        }

        &.icon-custom-start:before,
        &.icon-custom-end:before,
        &.icon-custom-case:before,
        &.icon-custom-simple-score-card:before,
        &.icon-custom-complex-score-card:before,
        &.icon-custom-rule-decision:before,
        &.icon-custom-decision-table:before,
        &.icon-custom-decision-tree:before,
        &.icon-custom-rule-group:before,
        &.icon-custom-rule-variable:before,
        &.icon-custom-data-resource:before {
          content: "";
          width: 40%;
          height: 40%;
          margin: 10px auto;
          display: block;
        }

        &.icon-custom-start {
          &:before {
            background: url("./icons/kaishi.svg") no-repeat center/100%;
          }
          &:after {
            content: "开始";
          }
        }

        &.icon-custom-end {
          &:before {
            background: url("./icons/jieshu.svg") no-repeat center/100%;
          }
          &:after {
            content: "结束";
          }
        }

        &.icon-custom-case {
          &:before {
            background: url("./icons/case.svg") no-repeat center/100%;
          }
          &:after {
            content: "分支";
          }
        }

        &.icon-custom-simple-score-card {
          &:before {
            background: url("./icons/pingfenka.svg") no-repeat center/100%;
          }
          &:after {
            content: "简单评分卡";
          }
        }

        &.icon-custom-complex-score-card {
          &:before {
            background: url("./icons/pingfenka.svg") no-repeat center/100%;
          }
          &:after {
            content: "复杂评分卡";
          }
        }

        &.icon-custom-rule-decision {
          &:before {
            background: url("./icons/rule.svg") no-repeat center/100%;
          }
          &:after {
            content: "规则";
          }
        }

        &.icon-custom-decision-table {
          &:before {
            background: url("./icons/table.svg") no-repeat center/100%;
          }
          &:after {
            content: "决策表";
          }
        }

        &.icon-custom-decision-tree {
          &:before {
            background: url("./icons/tree.svg") no-repeat center/100%;
          }
          &:after {
            content: "决策树";
          }
        }

        &.icon-custom-rule-group {
          &:before {
            background: url("./icons/rules.svg") no-repeat center/100%;
          }
          &:after {
            content: "规则集";
          }
        }
        &.icon-custom-rule-variable {
          &:before {
            background: url("./icons/bianliang.svg") no-repeat center/100%;
          }
          &:after {
            content: "变量";
          }
        }
        &.icon-custom-data-resource {
          &:before {
            background: url("./icons/shujuyuan.svg") no-repeat center/100%;
          }
          &:after {
            content: "数据源";
          }
        }
      }
      .djs-palette .entry,
      .djs-palette .djs-palette-toggle {
        width: 48px;
        height: 60px;
        font-size: 26px;
        margin: 0 4px;
      }
      svg.new-parent {
        background: transparent !important;
      }
      .entry.custom-separator {
        width: calc(100% - 5px);
        height: auto;
        line-height: 26px;
        font-size: 16px;
        background-color: #f0f2f5;
        margin: 10px 0 0;
        padding-top: 6px;
        &:before {
          content: attr(title);
        }
        &:hover {
          color: #333;
        }
      }
    }
  }
}
</style>

<style lang="less" scoped>
.el-dialog .el-dialog__body .flow-containers .no-shadow .el-form {
  padding: 16px 8px 0 8px;
}
</style>
