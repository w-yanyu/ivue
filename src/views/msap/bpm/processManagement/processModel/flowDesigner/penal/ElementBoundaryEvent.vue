<template>
    <el-form label-width="18%" class="form-two-column" @submit.native.prevent>
        <el-form-item  :label="$i18ns('bpmmodel.cancel_node_instance')">
            <el-checkbox v-model="boundaryForm['cancelActivity']" @change="changeCancelActivity" />
        </el-form-item>
        <el-form-item  :label="$i18ns('bpmmodel.timing_method')">
            <el-select v-model="timeWay" @change="changeTimeWay" :placeholder="$i18ns('bpmmodel.please_select')">
                <el-option v-for="item in timeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script>
import { setMaxIdleHTTPParsers } from "http";
import { updateBoundray, initUtil } from "../utils";

export default {
    name: "ElementBoundaryEvent",
    props: {
        id: String,
        businessObject: Object,
    },
    data() {
        return {
            boundaryForm: { "cancelActivity": true },
            // eslint-disable-next-line no-template-curly-in-string          
            timeWay: "timeDuration",
            timeOptions: [{
                value: 'timeDuration',
                label: this.$i18ns('bpmmodel.time_interval')
            }, {
                value: 'timeDate',
                label:  this.$i18ns('bpmmodel.specify_time')
            }, {
                value: 'timeCycle',
                label: this.$i18ns('bpmmodel.loop')
            }]
        };
    },
    watch: {
        id: {
            immediate: true,
            handler(val) {
                val &&
                    val.length &&
                    this.$nextTick(() => this.resetListenersList());
            },
        },
        businessObject: {
            immediate: true,
            handler(val) {
                val &&
                    val.length &&
                    this.$nextTick(() => this.resetListenersList());
            },
        },
    },
    methods: {

        resetListenersList() {
            this.bpmnElement = window.bpmnInstances.bpmnElement;
            this.changeBoundaryForm();
        },
        changeTimeWay(data) {
            this.timeWay = data;
            this.changeBoundaryForm();
        },
        changeCancelActivity(data) {
            window.bpmnInstances.bpmnElement.businessObject.cancelActivity = data;
            this.boundaryForm["cancelActivity"] = data;
            this.changeBoundaryForm();
        },
        changeBoundaryForm() {

            updateBoundray(this.bpmnElement, this.timeWay);
            window.bpmnInstances.modeling.updateProperties(
                window.bpmnInstances.bpmnElement,
                { ...this.boundaryForm }
            );
        },
        getElementLoop() {//获取定时捕获事件原有值
            let businessObject = window.bpmnInstances.bpmnElement.businessObject;
            if (businessObject.hasOwnProperty('cancelActivity')) {
                this.boundaryForm["cancelActivity"] = businessObject.cancelActivity;
            } else {
                window.bpmnInstances.bpmnElement.businessObject.cancelActivity = true;
                this.boundaryForm["cancelActivity"] = true;
            }
            if (businessObject.hasOwnProperty('eventDefinitions') && businessObject.eventDefinitions.length > 0) {
                if (businessObject.eventDefinitions[0].$type == 'bpmn:TimerEventDefinition') {
                    if (businessObject.eventDefinitions[0].hasOwnProperty('timeDuration')) {
                        this.timeWay = "timeDuration"
                    }
                    else if (businessObject.eventDefinitions[0].hasOwnProperty('timeDate')) {
                        this.timeWay = "timeDate"
                    }
                    else if (businessObject.eventDefinitions[0].hasOwnProperty('timeCycle')) {
                        this.timeWay = "timeCycle"
                    }
                }
            }
        }

    },
    created() {
        initUtil(this);
        console.log("window.bpmnInstances.bpmnElement.businessObject=", window.bpmnInstances.bpmnElement.businessObject);
        let businessObject = window.bpmnInstances.bpmnElement.businessObject;

        if (businessObject.hasOwnProperty('attachedToRef') && (businessObject.attachedToRef.$type !== "bpmn:UserTask" && businessObject.attachedToRef.$type !== "bpmn:ReceiveTask")) {
            this.$message({
                message: "{{$i18ns('bpmmodel.timed_binding_can_only')}}",
                type: 'error'
            });
            this.bpmnElement = window.bpmnInstances.bpmnElement;
            window.bpmnInstances.modeling.removeElements([this.bpmnElement]);
            throw new Error("{{$i18ns('bpmmodel.timed_binding_can_only')}}");

        }
        this.getElementLoop();
        this.resetListenersList();

    }
};
</script>
