<template>
    <div>
        <el-form label-width="18%" class="form-two-column" @submit.native.prevent>
            <template v-if="elementType === 'Process'">
                <el-form-item label="ID" v-if="flowInfo.model_id">
                    <el-input v-model="flowInfo.model_id" disabled />
                </el-form-item>
                <el-form-item  :label="$i18ns('bpmmodel.name')">
                    <el-input
                        v-model="flowInfo.model_name"
                        clearable
                        @change="updateFlowInfo('name')"
                    />
                </el-form-item>
                <el-form-item  :label="$i18ns('bpmmodel.keyword')">
                    <el-input v-model="elementId" clearable @change="updateFlowInfo('id')" />
                </el-form-item>
                <el-form-item  :label="$i18ns('bpmmodel.label_information')">
                    <el-input
                        v-model="flowInfo.model_meta_info"
                        clearable
                        @change="updateFlowInfo"
                    />
                </el-form-item>
            </template>
            <template v-else>
                <el-form-item label="ID">
                    <el-input
                        v-model="elementBusinessObject.id"
                        clearable
                        @change="updateBaseInfo('id')"
                    />
                </el-form-item>
                <el-form-item  :label="$i18ns('bpmmodel.name')">
                    <el-input
                        v-model="elementBusinessObject.name"
                        clearable
                        @change="updateBaseInfo('name')"
                    />
                </el-form-item>
            </template>
            <el-form-item v-if="conditionFormVisible"  :label="$i18ns('bpmmodel.expression')" class="full-row" label-width="9%">
                <el-input v-model="flowConditionForm.body" clearable @change="updateFlowCondition" />
            </el-form-item>
        </el-form>
        <element-task
            v-if="elementType.indexOf('Task') !== -1"
            :id="elementId"
            :type="elementType"
            :business-object="elementBusinessObject"
            @updateTaskMode="updateTaskMode"
        />
       
        <user-task-listeners
            v-if="elementType === 'UserTask'"
            :id="elementId"
            :taskMode="taskMode"
        />
        <element-intermediate
            v-if="elementType === 'IntermediateCatchEvent'"
            :id="elementId"
            :business-object="elementBusinessObject"
        />
        <ElementBoundaryEvent
            v-if="elementType === 'BoundaryEvent'"
            :id="elementId"
            
            :business-object="elementBusinessObject"
     
        />
        <element-listeners
            v-if="elementType === 'StartEvent' || elementType === 'EndEvent' ||elementType === 'IntermediateCatchEvent'||elementType === 'BoundaryEvent'" 
            :id="elementId"
            :type="elementType"
        />
    </div>
</template>

<script>
import ElementTask from "./ElementTask";
import ElementListeners from "./listeners/ElementListeners";
import UserTaskListeners from "./listeners/UserTaskListeners";
import ElementIntermediate from "./ElementIntermediate";
import ElementBoundaryEvent from "./ElementBoundaryEvent";

export default {
    name: "MyPropertiesPanel",
    components: {
        UserTaskListeners,
        ElementListeners,
        ElementTask,
        ElementIntermediate,
        ElementBoundaryEvent,
    },
    componentName: "MyPropertiesPanel",
    props: {
        bpmnModeler: Object,
        flowObj: Object,
        prefix: {
            type: String,
            default: "activiti",
        },
    },
    provide() {
        return {
            prefix: this.prefix,
        };
    },
    data() {
        return {
            elementId: "",
            elementType: "",
            elementBusinessObject: {}, // 元素 businessObject 镜像，提供给需要做判断的组件使用
            conditionFormVisible: false, // 流转条件设置
            flowInfo: {},
            flowConditionForm: {},
            taskMode: "1",
            timeWay:""
        };
    },
    watch: {
        flowObj: {
            handler(val) {
                this.flowInfo = val;
            },
            deep: true,
        },
    },
    created() {
        this.initModels();
    },
    methods: {
        initModels() {
            // 初始化 modeler 以及其他 moddle
            if (!this.bpmnModeler) {
                // 避免加载时 流程图 并未加载完成
                this.timer = setTimeout(() => this.initModels(), 10);
                return;
            }
            if (this.timer) clearTimeout(this.timer);
            window.bpmnInstances = {
                modeler: this.bpmnModeler,
                modeling: this.bpmnModeler.get("modeling"),
                moddle: this.bpmnModeler.get("moddle"),
                eventBus: this.bpmnModeler.get("eventBus"),
                bpmnFactory: this.bpmnModeler.get("bpmnFactory"),
                elementFactory: this.bpmnModeler.get("elementFactory"),
                elementRegistry: this.bpmnModeler.get("elementRegistry"),
                replace: this.bpmnModeler.get("replace"),
                selection: this.bpmnModeler.get("selection"),
            };
            this.flowInfo = this.flowObj;
            this.getActiveElement();
        },
        getActiveElement() {
            // 初始第一个选中元素 bpmn:Process
            this.initFormOnChanged(null);
            this.bpmnModeler.on("import.done", (e) => {
                this.initFormOnChanged(null);
            });
            // 监听选择事件，修改当前激活的元素以及表单
            this.bpmnModeler.on("selection.changed", ({ newSelection }) => {
                this.initFormOnChanged(newSelection[0] || null);
            });
            this.bpmnModeler.on("element.changed", ({ element }) => {
                if (element && element.id === this.elementId) {
                    this.initFormOnChanged(element);
                }
            });
        },
        // 初始化数据
        initFormOnChanged(element) {
            let activatedElement = element;
            if (!activatedElement) {
                activatedElement =
                    window.bpmnInstances.elementRegistry.find(
                        (el) => el.type === "bpmn:Process"
                    ) ||
                    window.bpmnInstances.elementRegistry.find(
                        (el) => el.type === "bpmn:Collaboration"
                    );
            }
            if (!activatedElement) return;
            if (activatedElement.type === "bpmn:Process") {
                this.$parent.nodeName = "流程信息";
            } else if (activatedElement.type === "bpmn:SequenceFlow") {
                this.$parent.nodeName = "连线信息";
            } else {
                this.$parent.nodeName = `${
                    activatedElement.name ||
                    activatedElement.businessObject.name ||
                    ""
                }节点信息`;
            }
            window.bpmnInstances.bpmnElement = this.bpmnElement =
                activatedElement;
            this.bpmnElement = activatedElement;
            this.elementId = activatedElement.id;
            this.elementType = activatedElement.type.split(":")[1] || "";
            this.elementBusinessObject = JSON.parse(
                JSON.stringify(activatedElement.businessObject)
            );
            if (activatedElement.businessObject.$attrs) {
                this.elementBusinessObject = {
                    ...this.elementBusinessObject,
                    ...activatedElement.businessObject.$attrs,
                };
            }
            this.conditionFormVisible = !!(
                this.elementType === "SequenceFlow" &&
                activatedElement.source &&
                activatedElement.source.type.indexOf("StartEvent") === -1
            );
            if (this.conditionFormVisible) {
                this.resetFlowCondition();
            }
        },
        updateBaseInfo(key) {
            if (key === "id") {
                window.bpmnInstances.modeling.updateProperties(
                    this.bpmnElement,
                    {
                        id: this.elementBusinessObject[key],
                        di: { id: `${this.elementBusinessObject[key]}_di` },
                    }
                );
                return;
            }
            const attrObj = Object.create(null);
            attrObj[key] = this.elementBusinessObject[key];
            window.bpmnInstances.modeling.updateProperties(
                this.bpmnElement,
                attrObj
            );
        },
        updateFlowInfo(key) {
            this.$emit("updateFlowInfo", {
                ...this.flowInfo,
                model_key: this.elementId,
            });
            if (key === "id") {
                window.bpmnInstances.modeling.updateProperties(
                    this.bpmnElement,
                    {
                        id: this.elementId,
                        di: { id: `${this.elementId}_di` },
                    }
                );
                return;
            }
            if (key === "name") {
                const attrObj = Object.create(null);
                attrObj.name = this.flowInfo.model_name;
                window.bpmnInstances.modeling.updateProperties(
                    this.bpmnElement,
                    attrObj
                );
            }
        },
        resetFlowCondition() {
            if (!this.bpmnElement.businessObject.conditionExpression) {
                this.flowConditionRef = window.bpmnInstances.moddle.create(
                    "bpmn:FormalExpression"
                );
                window.bpmnInstances.modeling.updateProperties(
                    this.bpmnElement,
                    { conditionExpression: this.flowConditionRef }
                );
                this.updateFlowCondition();
            } else {
                const conditionExpression =
                    this.bpmnElement.businessObject.conditionExpression;
                this.flowConditionForm = {
                    ...conditionExpression,
                    type: "condition",
                };
            }
        },
        updateFlowCondition() {
            // 如果是并行网关，连线信息表达式默认为空
            let condition = window.bpmnInstances.moddle.create(
                "bpmn:FormalExpression",
                this.flowConditionForm.body
                    ? this.flowConditionForm
                    : this.bpmnElement.businessObject.sourceRef.$type === 'bpmn:ParallelGateway'
                    ?
                    {
                          body: '',
                      }
                    : {
                          body:
                              '${flow=="' +
                              this.bpmnElement.businessObject.id +
                              '"}',
                      }
            );
            window.bpmnInstances.modeling.updateProperties(this.bpmnElement, {
                conditionExpression: condition,
            });
        },
        updateTaskMode(data) {
            this.taskMode = data;
        },
        updateTimeWay(data) {
            this.timeWay = data;
        },
    },
    beforeDestroy() {
        window.bpmnInstances = null;
        this.bpmnElement = null;
    },
};
</script>

<style lang="less" scoped>
/deep/ .form-two-column {
    display: flex;
    flex-wrap: wrap;
    padding-top: 0;
    .el-form-item {
        width: 50%;
    }
    .el-form-item.full-row {
        width: 100%;
    }
    .el-select {
        width: 100%;
    }
}
</style>