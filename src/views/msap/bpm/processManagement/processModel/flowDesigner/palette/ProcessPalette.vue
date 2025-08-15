<template>
    <div class="process-palette">
        <div class="tools-div">
            <div
                class="tools"
                @click="startTool($event, 'lassoTool')"
                @mousedown="startTool($event, 'lassoTool')"
            >
                <i class="bpmn-icon-lasso-tool"></i>
                <span>{{$i18ns('bpmmodel.box_selection')}}</span>
            </div>
            <div
                class="tools"
                @click="startTool($event, 'connectTool')"
                @mousedown="startTool($event, 'connectTool')"
            >
                <i class="bpmn-icon-connection-multi"></i>
                <span>{{$i18ns('bpmmodel.connection')}}</span>
            </div>
        </div>
        <el-collapse v-model="activeNames">
            <el-collapse-item name="common">
                <div slot="title">
                    <i class="el-icon-menu"></i>
                    <span>{{$i18ns('bpmmodel.general_tools')}}</span>
                </div>
                <div
                    v-for="(item, index) in shapeAction"
                    :key="index"
                    class="tools"
                    @click="createElement($event, item.action[0],item.action[3])"
                    @mousedown="createElement($event, item.action[0],item.action[3])"
                >
                    <i :class="item.action[2]"></i>
                    <span>{{item.action[3]}}</span>
                </div>
            </el-collapse-item>
            <el-collapse-item v-for="(item, index) in tempList" :key="index" :name="item.taskType">
                <div slot="title">
                    <i :class="`icon icon-${item.taskType}`"></i>
                    <span>{{item.taskName}}</span>
                </div>
                <div
                    v-for="(it, ind) in item.list"
                    :key="ind"
                    :class="it.disabled ? 'tools disabled' : 'tools'"
                    @click="createTemplate($event, it.shape,it)"
                >
                    <i :class="`icon icon-${item.taskType}`"></i>
                    <span>{{it.name}}</span>
                </div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
import { assign } from "min-dash";
import { customShapeAction } from "../utils";
import X2JS from "../utils/x2js";

export default {
    name: "MyProcessPalette",
    props: {
        bpmnModeler: Object,
        flowObj: Object,
    },
    data() {
        return {
            activeNames: ["common"],
            shapeAction: customShapeAction,
            tempList: [],
            tempIdList: [],
        };
    },
    created() {
        const params = {
            servicecode: "bpm2010",
            appId: this.flowObj.appId,
        };
        this.$http
            .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then((response) => {
                this.tempList = JSON.parse(response.data.model_content);
            });
    },
    methods: {
        createElement(event, type, name, options = {}) {
            const ElementFactory = window.bpmnInstances.elementFactory;
            const create = window.bpmnInstances.modeler.get("create");
            const shape = ElementFactory.createShape(
                assign({ type: type, name: name })
            );
            if (options) {
                // shape.businessObject.di.isExpanded = options.isExpanded;
            }
            create.start(event, shape);
        },
        createTemplate(event, type, options = {}) {
            if (options.disabled) {
                return false;
            }
            console.log(options);
            const ElementFactory = window.bpmnInstances.elementFactory;
            const create = window.bpmnInstances.modeler.get("create");
            const shape = ElementFactory.createShape(
                assign({ type: type }, options)
            );
            if (options.id) {
                shape.businessObject.id = options.id;
            }
            if (options.taskMode) {
                shape.businessObject.$attrs.taskMode = options.taskMode;
            }
            const x2js = new X2JS({
                stripWhitespaces: false,
                attributePrefix: "_",
            });
            let currentNodeList = [];
            let arr = [...this.tempList];
            this.tempIdList = [options.id];
            // eslint-disable-next-line handle-callback-err
            this.bpmnModeler.saveXML({ format: true }, (err, xml) => {
                const process = x2js.xml_str2json(xml).definitions.process;
                for (const key in process) {
                    if (
                        Object.prototype.toString.call(process[key]) ===
                        "[object Array]"
                    ) {
                        currentNodeList.push(...process[key]);
                    } else if (
                        Object.prototype.toString.call(process[key]) ===
                        "[object Object]"
                    ) {
                        currentNodeList.push(process[key]);
                    }
                }
                currentNodeList.forEach((item) => {
                    this.tempIdList.push(item._id);
                });
                arr.forEach((item) => {
                    item.list.forEach((it) => {
                        it.disabled = this.tempIdList.includes(it.id);
                    });
                });
                this.tempList = [...arr];
            });
            // shape.businessObject.di.isExpanded = options.isExpanded;
            create.start(event, shape);
        },
        removeShape(shape) {
            this.tempIdList = this.tempIdList.filter((item) => {
                return item !== shape.id;
            });
            let arr = [...this.tempList];
            arr.forEach((item) => {
                item.list.forEach((it) => {
                    it.disabled = this.tempIdList.includes(it.id);
                });
            });
            this.tempList = [...arr];
        },
        startTool(event, type) {
            if (type === "lassoTool") {
                window.bpmnInstances.modeler
                    .get("lassoTool")
                    .activateSelection(event);
            }
            if (type === "connectTool") {
                window.bpmnInstances.modeler.get("globalConnect").toggle(event);
            }
        },
    },
};
</script>

<style lang="less" scoped>
.process-palette {
    width: 136px;
    height: calc(100% - 38px);
    box-sizing: border-box;
    padding: 5px 0;
    border-right: 1px solid #ccc;
    position: absolute;
    overflow: scroll;
    /deep/ .el-collapse {
        border-bottom: 0;
        .el-collapse-item {
            margin: 8px 0;
            .el-collapse-item__header,
            .el-collapse-item__wrap {
                border-width: 1px 0;
            }
            .el-collapse-item__wrap {
                border-bottom: 0;
            }
            .el-collapse-item__content {
                padding: 0;
                display: flex;
                flex-wrap: wrap;
            }
        }
    }
    .tools-div {
        overflow: hidden;
    }
    .tools {
        width: 50%;
        box-sizing: border-box;
        font-size: 12px;
        text-align: center;
        float: left;
        cursor: pointer;
        &:hover {
            color: #003686;
        }
        i {
            font-size: 26px;
            line-height: 40px;
            display: block;
        }
        span {
            width: 80%;
            display: inline-block;
        }
    }
    /deep/ .el-collapse-item__header {
        background-color: #ecf5ff;
        border: 0;
        box-shadow: none;
        margin-left: 5px;
        i {
            margin-right: 2px;
        }
    }
    .temps {
        padding: 2px 8px;
        border: 1px solid #ccc;
        border-radius: 6px;
        margin: 4px;
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
            color: #003686;
            border-color: #003686;
        }
        i {
            margin-right: 2px;
        }
    }
    .temps.disabled {
        background-color: #eee;
        color: #ccc;
        pointer-events: auto !important;
        cursor: not-allowed !important;
        &:hover {
            color: #ccc;
            border-color: #ccc;
        }
    }
}
</style>
