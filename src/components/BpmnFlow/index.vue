<template>
  <div class="flow-containers">
    <!-- 工具栏 -->
    <div class="tool-bar">
      <div class="left">{{ flowObj.flowId }} - {{ flowObj.flowName }}</div>
      <div class="right">
        <el-button
          icon="el-icon-zoom-in"
          size="mini"
          @click="zoomViewport(true)"
          >放大</el-button
        >
        <el-button
          icon="el-icon-zoom-out"
          size="mini"
          @click="zoomViewport(false)"
          >缩小</el-button
        >
        <el-button
          v-if="!onlyRead"
          type="primary"
          icon="el-icon-s-claim"
          size="mini"
          @click="saveXml"
          >保存</el-button
        >
        <el-button
          v-if="!onlyRead"
          type="warning"
          plain
          icon="el-icon-refresh-left"
          size="mini"
          @click="goBack"
          >返回</el-button
        >
      </div>
    </div>
    <!-- <palette
      v-if="flowObj.flowId"
      ref="palette"
      :bpmn-modeler="bpmnModeler"
      :flowObj="flowObj"
    /> -->
    <!-- 画布 流程图+图标栏-->
    <div class="canvas" ref="canvas"></div>
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
        ></i>
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
        >
        </scoreCardInfo>
        <ruleDecisionInfo
          v-else-if="currentEditAtrr.nodeType === 'ruleDecision'"
          ref="ruleDecision"
          :saveAttr="saveAttr"
          :onlyRead="onlyRead"
        ></ruleDecisionInfo>
        <decisionTreeInfo
          v-else-if="currentEditAtrr.nodeType === 'decisionTree'"
          ref="decisionTree"
          :cParentParams="cParentParams"
          :saveAttr="saveAttr"
          :onlyRead="onlyRead"
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
          v-else-if="
            currentEditAtrr.nodeType === 'case' ||
              currentEditAtrr.nodeType === 'when'
          "
          :saveAttr="saveAttr"
          :onlyRead="onlyRead"
        ></caseInfo>
        <!-- 流程信息 -->
        <to-json
          v-else
          style="width: calc(100% - 4px)"
          toUrl="/components/BpmnFlow/rule_flow_view.json"
          :params="cParentParams"
        ></to-json>
      </div>
    </div>
  </div>
</template>

<script>
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
import CustomModeler from "./custom";
import CustomRenderer from "./custom/renderer";
// import palette from "./custom/palette.vue";

export default {
  name: "",
  props: {
    cMeta: Object, //本页面模板json数据Layout对象
    cParentMeta: Object, //父页面模板json数据Layout对象
    cParentParams: Object, //父页面自定义参数与内置参数
    cParentScope: Object //父页面每块区域业务数据
  },
  components: {
    // palette,
    scoreCardInfo,
    decisionTreeInfo,
    ruleDecisionInfo,
    ruleGroupInfo,
    ruleScriptInfo,
    caseInfo
  },
  data() {
    return {
      //是否显示节点属性
      showAttrs: true,
      ServiceFlowManage: {},
      zoom: 1,
      bpmnModeler: null, // bpmn建模器
      container: null,
      canvas: null,
      defaultXmlStr: bpmnData1,
      xmlJsonResult: [], // 默认父容器（最外层）
      parentNode: "", // 现在修改节点的父容器
      parentNodeArr: {
        caseArr: [], // 记录存储case开始的节点的父节点
        forkArr: [] // 记录存储fork开始的节点的父节点
      },
      bpmnXml: "", // bpmn 的xml 有修改后才赋值
      currentEditNode: "", // 选中的节点
      flowObj: {
        flowId: "",
        flowCode: "",
        decription: "",
        flowType: "",
        flowStatus: "",
        flowName: "",
        description: ""
      },
      conditionsList: [], //联动条件选择选项字典
      onlyRead: false
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
    console.log("+++++", this.cParentParams);
    //弹框内点击查看
    if (this.cParentParams.cParentParams) {
      console.log("eee", this.cParentParams.cParentParams);
      this.cParentParams = this.cParentParams.cParentParams;
    }
    //主页面点击查看
    if (this.cParentParams.flowId) {
      this.flowObj.flowId = this.cParentParams.flowId;
      this.onlyRead = this.cParentParams.onlyRead;
      this.initFlowData();
    }
    this.getConditionsList();
  },
  methods: {
    ...mapMutations(["SET_EDIT_ATTR"]),
    initFlowData() {
      this.flowObj.flowName = this.cParentParams.flowName;
      this.flowObj.flowCode = this.cParentParams.flowCode;
      this.flowObj.decription = this.cParentParams.flowDescription;
      this.flowObj.code = this.cParentParams.code;
      this.flowObj.flowStatus = this.cParentParams.flowStatus;
      this.defaultXmlStr =
        this.cParentParams.flowUinfo &&
        this.cParentParams.flowUinfo.indexOf("<?xml") > -1
          ? this.cParentParams.flowUinfo
          : bpmnData1;
      this.bpmnXml = this.defaultXmlStr;
      this.$nextTick(() => {
        this.initBpmn();
      });
    },
    // 放大缩小
    zoomViewport(zoomIn = true) {
      this.zoom = this.bpmnModeler.get("canvas").zoom();
      this.zoom += zoomIn ? 0.1 : -0.1;
      this.bpmnModeler.get("canvas").zoom(this.zoom);
    },
    // 初始化bpmn
    initBpmn() {
      // 获取到属性ref为“canvas”的dom节点
      const canvas = this.$refs.canvas;
      // 避免缓存，每次清一下
      this.bpmnModeler && this.bpmnModeler.destroy();
      // onlyRead为true则是预览模式，否则为编辑模式
      if (this.onlyRead) {
        // 建模
        this.bpmnModeler = new BpmnViewer({
          container: canvas,
          additionalModules: [
            MoveCanvasModule,
            {
              __init__: ["customRenderer"],
              customRenderer: ["type", CustomRenderer]
            }
          ]
        });
      } else {
        this.bpmnModeler = new BpmnModeler({
          container: canvas,
          //例如你不想要左侧的工具栏Palette，则可以通过additionalModules选项来实现，
          //additionalModules允许你使用自定义模块来修改或替换现有功能
          additionalModules: [
            CustomModeler,
            gridModule,
            {
              labelEditingProvider: ["value", ""]
            }
          ]
        });
      }
      this.transformCanvas(this.defaultXmlStr);
    },
    // xml解析成图
    async transformCanvas(bpmnXmlStr) {
      try {
        await this.bpmnModeler.importXML(bpmnXmlStr); //回显xml流程图
        this.registerEvents();
      } catch (err) {
        console.log("---modeler error---", err);
      }
    },
    // 注册事件
    registerEvents() {
      this.addBpmnListener();
      this.addModelerListener();
      this.addEventBusListener();
    },
    // 添加绑定画布事件
    addBpmnListener() {
      // 给图绑定事件，当图有发生改变就会触发这个事件
      this.bpmnModeler.on(
        "commandStack.changed",
        _.debounce(this.getChangeXml, 0)
      );
      // 改变箭头指向
      this.bpmnModeler.on(
        "commandStack.connection.layout.postExecuted",
        _.debounce(this.reconnectVerify, 0)
      );
    },
    // modeler事件
    addModelerListener() {
      const bpmnjs = this.bpmnModeler;
      const events = ["shape.added", "shape.removed"];
      events.forEach(event => {
        this.bpmnModeler.on(event, e => {
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
                this.updateNodeProperties(shape, newAttr);
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
    addEventBusListener() {
      const eventBus = this.bpmnModeler.get("eventBus");
      // 注册节点事件，eventTypes中可以写多个事件
      const eventTypes = [
        "element.click", //节点点击
        "element.dblclick" //节点双击
      ];
      eventTypes.forEach(eventType => {
        eventBus.on(eventType, e => {
          if (!e || this.isLabel(e.element.type)) {
            return;
          }
          if (eventType === "element.click") {
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
            this.currentEditNode = element;
            if (
              this.isWhenNode(element) &&
              attr.sourceRef.incoming.length <= 1
            ) {
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
    // 获取改变后的xml
    getChangeXml() {
      // eslint-disable-next-line handle-callback-err
      this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
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
    // 保存
    saveXml() {
      let flag = true;
      const attrBars = [
        "simpleScoreCard",
        "complexScoreCard",
        "ruleDecision",
        "decisionTree",
        "ruleGroup",
        "ruleScript"
      ];
      attrBars.forEach(item => {
        if (this.$refs[item]) {
          flag = this.$refs[item].formValid();
        }
      });
      if (flag) {
        const elementRegistry = this.bpmnModeler.get("elementRegistry");
        //返回线的集合
        const sequenceFlowArr = elementRegistry.filter(item =>
          //是否是线
          this.isSequenceFlow(item.type)
        );
        //返回开始节点集合
        const startArr = elementRegistry.filter(item =>
          //是否是开始节点
          this.isStratEvent(item.type)
        );
        //开始节点不存在
        if (!startArr.length) {
          this.$message.warning("必须要有一个开始节点");
          return "";
        }
        //链接开始节点的线的集合
        const flowStart = _.find(sequenceFlowArr, item => {
          return item.source.id === startArr[0].id;
        });
        //如果没有链接开始节点的线
        if (!flowStart) {
          this.$message.warning("开始节点必须连线");
          return "";
        }
        let target = flowStart.target;
        this.setJsonByNode(target);
        let copyResult = _.cloneDeep(this.xmlJsonResult);
        const flowLayout = {
          tagName: "flowLayout",
          attr: {
            id: this.flowObj.flowId,
            flowCode: this.flowObj.flowCode,
            "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
            "xsi:noNamespaceSchemaLocation": "flow-model.xsd"
          },
          children: [
            {
              tagName: "flow",
              children: this.delAttrByKey(copyResult)
            }
          ]
        };
        console.log(flowLayout);
        if (flowLayout.children[0].children.length > 0) {
          const flowArr = this.treeToArr(flowLayout.children[0].children);
          let flag2 = true;
          for (let index = 0; index < flowArr.length; index++) {
            const element = flowArr[index];
            const requiredList = nodeRequiredAttr[element.tagName] || [];
            if (requiredList.length > 0) {
              flag2 = requiredList.every(it => {
                console.log(!!element.attr[it] + "dasdasdasdadasdasd" + it);
                return !!element.attr[it];
              });
            }
            if (!flag2) {
              this.$alert("校验不通过，请检查表单配置", "提示", {
                confirmButtonText: "确定",
                type: "warning"
              });
              this.clear();
              return "";
            }
          }
        }
        let xmlDoc = jsonToXmlDoc(flowLayout);
        xmlDoc = xmlDoc.replace(/&amp;quot;/g, "&quot;");
        const params = {
          flow_id: this.flowObj.flowId,
          flow_code: this.flowObj.flowCode,
          flow_name: this.flowObj.flowName,
          flow_status: this.flowObj.flowStatus,
          flow_ginfo: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>${xmlDoc}`,
          flow_uinfo: this.bpmnXml,
          flow_decription: this.flowObj.decription,
          nodeList: flowLayout.children[0].children,
          servicecode: "deci010705"
        };
        this.$http
          .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
          .then(obj => {
            this.$message.success("保存成功");
          })
          .catch(reg => {
            this.$message.warning("测试失败，请稍后尝试");
          });
        this.clear();
      } else {
        this.$alert("校验不通过，请检查表单配置", this.$t("common.tip"), {
          confirmButtonText: "确定",
          type: "warning"
        });
      }
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
    // 保存后的重置
    clear() {
      this.xmlJsonResult = [];
      this.parentNode = "";
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
    setJsonByNode(target, origin = "") {
      const that = this;
      let _node = "";
      if (!origin) {
        _node = that.setCurrentNode(
          that.xmlJsonResult,
          target,
          target.nodeType
        );
        that.updateNodeProperties(target, _node);
      } else {
        _node = that.setCurrentNode(origin, target, target.nodeType);
      }
      if (target.outgoing.length) {
        // 单进单出节点
        if (isSingleNode(target.nodeType)) {
          target = target.outgoing[0].target;
          that.setJsonByNode(target, that.parentNode);
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
                  that.updateNodeProperties(target, newAttr);
                  that.parentNodeArr.caseArr.push({
                    origin,
                    isFirst: target.businessObject.$attrs.isFirst
                  });
                }
                // 一个分支增加一个when节点作为父容器
                let whenNode = that.setCurrentNode(_node, item, "when");
                whenNode.attr.nodeType = "when";
                whenNode.attr.id = whenNode.originId;
                that.setJsonByNode(item.target, whenNode);
              });
              // case 结束节点
            } else if (target.outgoing.length === 1) {
              // 获取对应开始节点，就近原则
              const startCase = that.parentNodeArr.caseArr.pop();
              if (startCase && startCase.isFirst) {
                that.setJsonByNode(target.outgoing[0].target, startCase.origin);
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
    updateNodeProperties(shape, newAttr) {
      //console.log("this.bpmnModeler*************",this.bpmnModeler);
      if (!this.onlyRead) {
        const modeling = this.bpmnModeler.get("modeling");
        const attr = getBusinessObject(shape);
        modeling.updateProperties(
          shape,
          Object.assign({}, attr.$attrs, newAttr)
        );
      }
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
    reconnectVerify() {
      const that = this;
      const commandStack = that.bpmnModeler.get("commandStack");
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
    // 保存修改的属性
    saveAttr() {
      const editAtrr = _.cloneDeep(this.currentEditAtrr);
      let name = editAtrr.longname || editAtrr.name;
      let newAttr = _.assign({}, editAtrr, { name });
      newAttr = this.handleAttr(newAttr);
      console.log("bpmnModeler", this.bpmnModeler);
      this.updateNodeProperties(this.currentEditNode, newAttr);
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

  .tool-bar {
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
    width: 100%;
    height: 100%;

    .djs-palette {
      width: 144px;
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
    width: calc(100% - 144px);
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
    &.icon-custom-loop:before,
    &.icon-custom-simple-score-card:before,
    &.icon-custom-complex-score-card:before,
    &.icon-custom-rule-decision:before,
    &.icon-custom-decision-table:before,
    &.icon-custom-decision-tree:before,
    &.icon-custom-rule-group:before,
    &.icon-custom-rule-sub-flow:before,
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

    &.icon-custom-loop {
      &:before {
        background: url("./icons/loop.svg") no-repeat center/100%;
      }
      &:after {
        content: "循环";
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

    &.icon-custom-rule-sub-flow {
      &:before {
        background: url("./icons/subFlow.svg") no-repeat center/100%;
      }
      &:after {
        content: "决策流";
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
    width: 60px;
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
</style>

<style lang="less" scoped>
.el-dialog .el-dialog__body .flow-containers .no-shadow .el-form {
  padding: 16px 8px 0 8px;
}
</style>
