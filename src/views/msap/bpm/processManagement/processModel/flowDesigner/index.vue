<template>
    <div :class="`flow-containers${onlyRead ? ' dialog-height': ''}`">
        <div v-if="!onlyRead" class="tool-bar">
            <div class="left">
                {{flowObj.model_name}}
                <span v-if="flowObj.model_id">（{{flowObj.model_id}}）</span>
            </div>
            <div class="right">
                <el-button icon="el-icon-zoom-in" size="mini" @click="zoomViewport(true)">{{ $i18ns('bpmmodel.zoom') }}</el-button>
                <el-button icon="el-icon-zoom-out" size="mini" @click="zoomViewport(false)">{{ $i18ns('bpmmodel.lower') }}</el-button>
                <el-button icon="el-icon-c-scale-to-original" size="mini" @click="processReZoom">{{ $i18ns('bpmmodel.center') }}</el-button>
                <el-button type="primary" icon="el-icon-s-claim" size="mini" @click="saveXml">{{ $i18ns('bpmmodel.preserve') }}</el-button>
                <el-button
                    type="warning"
                    plain
                    icon="el-icon-refresh-left"
                    size="mini"
                    @click="goBack"
                >{{ $i18ns('bpmmodel.return') }}</el-button>
            </div>
        </div>
        <my-process-palette
            ref="palette"
            v-if="flowObj.appId && !onlyRead"
            :bpmn-modeler="bpmnModeler"
            :flowObj="flowObj"
        />
        <div :class="['canvas-bpmn', !showAttrs ? 'showAttrs' : '']" ref="canvas"></div>
        <div class="attr-bar-bpmn" :style="`width: calc(100% - ${onlyRead ? 0 : 136}px)`">
            <div class="node-name">
                {{nodeName}}
                <i
                    :class="`el-icon-arrow-${showAttrs ? 'down' : 'up'}`"
                    @click="showAttrs = !showAttrs"
                ></i>
            </div>
            <transition name="flowAttrs">
                <my-properties-panel
                    v-if="!onlyRead"
                    v-show="showAttrs"
                    class="flow-attrs"
                    :bpmn-modeler="bpmnModeler"
                    :flowObj="flowObj"
                    @updateFlowInfo="updateFlowInfo"
                />
                <productPanel
                    v-else
                    v-show="showAttrs"
                    :flowObj="flowObj"
                    :currentEditNode="currentEditNode"
                    class="flow-attr"
                />
            </transition>
        </div>
    </div>
</template>

<script>
import BpmnModeler from "bpmn-js/lib/Modeler";
import BpmnViewer from "bpmn-js/lib/Viewer";
import MoveModule from "diagram-js/lib/features/move";
import ModelingModule from 'bpmn-js/lib/features/modeling';
import MoveCanvasModule from "diagram-js/lib/navigation/movecanvas";
import gridModule from "diagram-js/lib/features/grid-snapping/visuals";
import * as _ from "lodash";
import { getBusinessObject } from "bpmn-js/lib/util/ModelUtil";
import { canConnect } from "./utils";
import { bpmnData } from "./utils/data";
import CustomModeler from "./custom";
import CustomRenderer from "./custom/render";
import activitiModdleDescriptor from "activiti-bpmn-moddle/resources/activiti";
import productPanel from "./penal/productPanel";

export default {
    name: "",
    props: {
        cParentParams: {
            type: Object,
            required: true,
        },
    },
    components: {
        productPanel,
    },
    data() {
        return {
            showAttrs: true, //是否显示节点属性
            zoom: 1,
            bpmnModeler: null, // bpmn建模器
            container: null,
            canvas: null,
            defaultXmlStr: bpmnData,
            bpmnXml: "", // bpmn 的xml 有修改后才赋值
            currentEditNode: "", // 选中的节点
            flowObj: {},
            conditionsList: [], //联动条件选择选项字典
            nodeName: "流程信息",
            onlyRead: false,
        };
    },
    created() {
        console.log("父类传入的参数", this.cParentParams);
        this.flowObj.isEdit = this.cParentParams.isEdit;
        this.flowObj.isFormal = this.cParentParams.isFormal;
        if (this.cParentParams.type === "add") {
            this.$nextTick(() => {
                this.flowObj.appId = this.cParentParams.appId;
                this.initBpmn();
            });
        } else {
            if (this.cParentParams.model_id) {
                this.flowObj = this.cParentParams;
                this.$http
                    .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", {
                        servicecode: "bpm2004",
                        model_id: this.cParentParams.model_id,
                        appId: this.cParentParams.appId,
                    })
                    .then((response) => {
                        this.flowObj = {
                            appId: this.cParentParams.appId,
                            ...response.data,
                        };
                        this.defaultXmlStr =
                            response.data.model_content &&
                            response.data.model_content.indexOf("<?xml") > -1
                                ? response.data.model_content
                                : bpmnData;
                        this.bpmnXml = this.defaultXmlStr;
                        this.$nextTick(() => {
                            this.initBpmn();
                        });
                    });
            } else if (this.cParentParams.onlyRead) {
				this.onlyRead = this.cParentParams.onlyRead;
                let servicecode = "bpm4002";
                if (this.cParentParams.isFormal === '1'){
                    servicecode = "bpm5004";
                }
                this.$http
                    .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", {
                        servicecode: servicecode,
                        appId: this.cParentParams.appId,
                        wf_prod_no: this.cParentParams.wf_prod_no,
                        bpm_version: this.cParentParams.bpm_version,
                    })
                    .then((response) => {
                        this.flowObj = {
                            appId: this.cParentParams.appId,
                            ...response.data,
                            isEdit: this.cParentParams.isEdit,
                            isFormal: this.cParentParams.isFormal,
                        };
                        this.defaultXmlStr =
                            response.data.model_content &&
                            response.data.model_content.indexOf("<?xml") > -1
                                ? response.data.model_content
                                : bpmnData;
                        this.bpmnXml = this.defaultXmlStr;
                        this.$nextTick(() => {
                            this.initBpmn();
                        });
                    });
            }
        }
    },
    mounted() {
        if (this.onlyRead) {
            this.$refs.canvas.onmousewheel = event => {
                this.zoomViewport(event.deltaY < 0);
                return false;
            };
        }
    },
    methods: {
        // 放大缩小
        zoomViewport(zoomIn = true) {
              this.zoom = this.bpmnModeler.get("canvas").zoom();
              if (this.zoom > 0) {
                  this.zoom += zoomIn ? 0.1 : -0.1;
              } else {
                  this.zoom = 0.1
              }
              this.bpmnModeler.get("canvas").zoom(this.zoom);
        },
        processReZoom() {
            this.zoom = 1;
            this.bpmnModeler.get("canvas").zoom("fit-viewport", "auto");
        },
        initBpmn() {
            const canvas = this.$refs.canvas;
            // 避免缓存，每次清一下
            this.bpmnModeler && this.bpmnModeler.destroy();
            if (this.onlyRead) {
                this.bpmnModeler = new BpmnViewer({
                    container: canvas,
                    additionalModules: [
                        MoveModule,
                        ModelingModule,
                        MoveCanvasModule,
                        {
                            __init__: ["customRenderer"],
                            customRenderer: ["type", CustomRenderer],
                        },
                    ],
                });
            } else {
                this.bpmnModeler = new BpmnModeler({
                    container: canvas,
                    //additionalModules允许你使用自定义模块来修改或替换现有功能
                    additionalModules: [
                        CustomModeler,
                        gridModule,
                        { labelEditingProvider: ["value", ""] },
                    ],
                    moddleExtensions: {
                        activiti: activitiModdleDescriptor,
                    },
                });
            }
            this.transformCanvas(this.defaultXmlStr);
        },
        // xml解析成图
        async transformCanvas(bpmnXmlStr) {
            try {
                await this.bpmnModeler.importXML(bpmnXmlStr);
                this.processReZoom();
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
            // 图发生改变就会触发这个事件
            this.bpmnModeler.on("commandStack.changed", this.getChangeXml);
            // 改变箭头指向
            this.bpmnModeler.on(
                "commandStack.connection.layout.postExecuted",
                _.debounce(this.reconnectVerify, 0)
            );
        },
        addModelerListener() {
            this.bpmnModeler.on("shape.removed", (e) => {
                let elementRegistry = this.bpmnModeler.get("elementRegistry");
                let shape = e.element
                    ? elementRegistry.get(e.element.id)
                    : e.shape;
                if (shape && shape.type !== "label") {
                    this.$refs.palette.removeShape(shape);
                }
            });
        },
        // 注册节点事件，eventTypes中可以写多个事件
        addEventBusListener() {
            const eventBus = this.bpmnModeler.get("eventBus");
            const eventTypes = [
                "element.click", //节点点击
                "element.changed", //节点改变
                "element.dblclick", //节点双击
                "element.hover", //节点悬停
            ];
            eventTypes.forEach((eventType) => {
                eventBus.on(eventType, (e) => {
                    if (!e || this.isLabel(e.element.type)) {
                        return;
                    }
                    if (eventType === "element.click") {
                        // 节点点击后想要做的处理，拿到节点实例，通过外部输入更新节点名称
                        const element = e.element;
                        this.currentEditNode = element;
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
        // label
        isLabel(type) {
            return type === "label";
        },
        // 开始节点
        isStratEvent(type) {
            return type === "bpmn:StartEvent";
        },
        // 保存
        saveXml() {
            
            const elementRegistry = this.bpmnModeler.get("elementRegistry");
            //返回线的集合
            const sequenceFlowArr = elementRegistry.filter((item) =>
                //是否是线
                this.isSequenceFlow(item.type)
            );
            //返回开始节点集合
            const startArr = elementRegistry.filter((item) =>
                //是否是开始节点
                this.isStratEvent(item.type)
            );
            //开始节点不存在
            if (!startArr.length) {
                this.$message.warning("必须要有一个开始节点");
                return "";
            }
            //链接开始节点的线的集合
            const flowStart = _.find(sequenceFlowArr, (item) => {
                return item.source.id === startArr[0].id;
            });
            //如果没有链接开始节点的线
            if (!flowStart) {
                this.$message.warning("开始节点必须连线");
                return "";
            }
            this.bpmnXml = this.bpmnXml.replace(
                /<incoming>[^<]*?<\/incoming\>/g,
                ""
            );
            this.bpmnXml = this.bpmnXml.replace(
                /<outgoing>[^<]*?<\/outgoing\>/g,
                ""
            );
            console.log(this.bpmnXml);
            const process = elementRegistry.find(
                (el) => el.type === "bpmn:Process"
            );
            const params = {
                servicecode: "bpm2002",
                ...this.flowObj,
                model_content: this.bpmnXml,
                model_key: process.id,
            };
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
                .then((response) => {
                    this.flowObj = {
                        ...this.flowObj,
                        model_id: response.data.model_id,
                    };
                    this.$message.success("保存成功");
                });
        },
        // 更新节点属性
        updateNodeProperties(shape, newAttr) {
            const modeling = this.bpmnModeler.get("modeling");
            const attr = getBusinessObject(shape);
            modeling.updateProperties(
                shape,
                Object.assign({}, attr.$attrs, newAttr)
            );
        },
        // 箭头重连校验
        reconnectVerify() {
            const that = this;
            const commandStack = that.bpmnModeler.get("commandStack");
            const lastCommand =
                commandStack._stack[commandStack._stack.length - 1];
            if (lastCommand && lastCommand.id) {
                const lastOperations = commandStack._stack.filter(
                    (item) => item.id === lastCommand.id
                );
                const reconnect = _.find(lastOperations, {
                    command: "connection.reconnect",
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
        updateFlowInfo(data) {
            this.flowObj = { ...this.flowObj, ...data };
        },
        goBack() {
            this.$dataBus.doCallBack(this, {});
        },
    },
};
</script>

<style lang="less">
@import "~bpmn-js/dist/assets/diagram-js.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
@import "~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

.flow-containers {
    height: calc(100vh - 118px);
    background: #fff;
    overflow: hidden;
    margin-top: 2px;
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
    .canvas-bpmn {
        width: calc(100% - 136px);
        height: calc(100% - 290px);
        position: absolute;
        right: 0;
        .djs-palette,
        .bjs-powered-by {
            display: none;
        }
    }
    .showAttrs {
        height: calc(100% - 80px);
        transition: all 0.8s ease;
    }
    .attr-bar-bpmn {
        position: absolute;
        right: 0;
        bottom: 0;
        background-color: #fff;
        box-shadow: 8px 5px 5px 5px rgba(0, 0, 0, 0.3);
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
            width: 100%;
            height: 180px;
            padding: 20px 0 10px;
            overflow: scroll;
        }
        .flow-attr {
            width: 100%;
            height: 210px;
            overflow: scroll;
        }
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
    .djs-popup {
        background-color: #fff !important;
    }
    svg.new-parent {
        background: transparent !important;
    }
    &.dialog-height {
        height: calc(100vh - 312px);
        .canvas-bpmn {
            width: 100%;
            height: calc(100% - 250px);
        }
    }
}
</style>

<style lang="less" scoped>
.flowAttrs-leave-active,
.flowAttrs-enter-active {
    transition: all 0.8s ease;
}
.flowAttrs-leave-active,
.flowAttrs-enter {
    height: 0px !important;
}
</style>
