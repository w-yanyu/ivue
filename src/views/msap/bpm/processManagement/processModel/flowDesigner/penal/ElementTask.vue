<template>
    <el-form label-width="18%" class="form-two-column" @submit.native.prevent>
        <template v-if="type === 'ServiceTask'">
            <el-form-item  :label="$i18ns('bpmmodel.asynchronous_or_not')">
                <el-checkbox v-model="taskConfigForm['activiti:async']" @change="changeTaskAsync" />
            </el-form-item>
            <el-form-item  :label="$i18ns('bpmmodel.java_class')">
                <el-input
                    v-model="taskConfigForm['activiti:class']"
                    clearable
                    @change="changeTaskAsync"
                />
            </el-form-item>
        </template>
        <template v-else-if="type === 'UserTask'">
            <el-form-item  :label="$i18ns('bpmmodel.task_mode')">
                <el-select v-model="userTaskForm.taskMode" @change="updateElementTask('taskMode')">
                    <el-option  :label="$i18ns('bpmmodel.single_mode')" value="1" />
                    <el-option  :label="$i18ns('bpmmodel.claim_mode')" value="2" />
                    <el-option  :label="$i18ns('bpmmodel.countersign_mode')" value="3" />
                </el-select>
            </el-form-item>
            <el-form-item v-if="userTaskForm.taskMode !== '2'"  :label="$i18ns('bpmmodel.approved_user')">
                <el-input v-model="userTaskForm.assignee" clearable @change="updateElementTask" />
            </el-form-item>
            <el-form-item v-if="userTaskForm.taskMode === '2'"  :label="$i18ns('bpmmodel.approval_group')">
                <el-input
                    v-model="userTaskForm.candidateGroups"
                    clearable
                    @change="updateElementTask"
                />
            </el-form-item>
            <template v-if="userTaskForm.taskMode === '3'">
                <el-form-item  :label="$i18ns('bpmmodel.serialize_or_not')">
                    <el-select v-model="loopInstanceForm.isSequential" @change="updateLoopBase">
                        <el-option  :label="$i18ns('bpmmodel.yes')" :value="true" />
                        <el-option  :label="$i18ns('bpmmodel.no')" :value="false" />
                    </el-select>
                </el-form-item>
                <el-form-item  :label="$i18ns('bpmmodel.approver_collection')" key="collection">
                    <el-input
                        v-model="loopInstanceForm.collection"
                        clearable
                        @change="updateLoopBase"
                    />
                </el-form-item>
                <el-form-item  :label="$i18ns('bpmmodel.approver_variable')" key="elementVariable">
                    <el-input
                        v-model="loopInstanceForm.elementVariable"
                        clearable
                        @change="updateLoopBase"
                    />
                </el-form-item>
                <el-form-item  :label="$i18ns('bpmmodel.complete_condition')" key="completionCondition">
                    <el-input
                        v-model="loopInstanceForm.completionCondition"
                        clearable
                        @change="updateLoopCondition"
                    />
                </el-form-item>
            </template>
        </template>
    </el-form>
</template>

<script>
export default {
    name: "ElementTaskConfig",
    props: {
        id: String,
        type: String,
        businessObject: Object,
    },
    data() {
        return {
            taskConfigForm: {},
            defaultServeFrom: {
                'activiti:class': "cn.sunline.bpm.serv.act.ServerTask",
                'activiti:async': true
            },
            defaultTaskForm: {
                taskMode: "1",
                // eslint-disable-next-line no-template-curly-in-string
                assignee: "",
                candidateGroups: "",
            },
            userTaskForm: {},
            loopCharacteristics: "",
            defaultLoopInstanceForm: {
                // eslint-disable-next-line no-template-curly-in-string
                collection: "${assigneeList}",
                elementVariable: "assignee",
                isSequential: false,
                completionCondition: "",
                extensionElements: [],
            },
            loopInstanceForm: {},
        };
    },
    watch: {
        id: {
            immediate: true,
            handler() {
                this.$nextTick(() => this.resetTaskForm());
            },
        },
        // type: {
        //     immediate: true,
        //     handler() {
        //         if (this.type === "ServiceTask") {
        //             console.log("this.taskConfigForm['activiti:async']============", this.taskConfigForm["activiti:async"], this.businessObject.async);
                    
        //             this.taskConfigForm["activiti:class"] =
        //                 "cn.sunline.bpm.serv.act.ServerTask";
        //             this.$set(
        //                 this.taskConfigForm,
        //                 "activiti:async",
        //                 this.taskConfigForm["activiti:async"] ||
        //                     this.businessObject.async
        //             );
        //             this.changeTaskAsync();
        //         }
        //     },
        // },
        businessObject: {
            immediate: true,
            handler(val) {
                this.bpmnElement = window.bpmnInstances.bpmnElement;
                this.getElementLoop(val);
            },
        },
    },
    methods: {
        changeTaskAsync() {
            window.bpmnInstances.modeling.updateProperties(
                window.bpmnInstances.bpmnElement,
                { ...this.taskConfigForm }
            );
        },
        resetTaskForm() {
            if (this.type === "UserTask") {
                this.userTaskForm = { ...this.defaultTaskForm };
                this.userTaskForm.taskMode =
                    this.businessObject.taskMode || "1";
                this.updateElementTask("taskMode");
            }
            if (this.type === "ServiceTask") {
                this.taskConfigForm = { ...this.defaultServeFrom }
                this.taskConfigForm["activiti:async"] = this.businessObject.async || false
                this.changeTaskAsync();
            }
        },
        updateElementTask(key) {
            if (key === "taskMode") {
                switch (this.userTaskForm.taskMode) {
                    case "1":
                        this.userTaskForm.assignee = "${assignee}";
                        this.userTaskForm.candidateGroups = null;
                        window.bpmnInstances.modeling.updateProperties(
                            this.bpmnElement,
                            { loopCharacteristics: null }
                        );
                        break;
                    case "2":
                        this.userTaskForm.assignee = null;
                        this.userTaskForm.candidateGroups = "${group}";
                        window.bpmnInstances.modeling.updateProperties(
                            this.bpmnElement,
                            { loopCharacteristics: null }
                        );
                        break;
                    case "3":
                        this.userTaskForm.assignee = "${assignee}";
                        this.userTaskForm.candidateGroups = null;
                        this.multiLoopInstance =
                            window.bpmnInstances.moddle.create(
                                "bpmn:MultiInstanceLoopCharacteristics"
                            );
                        window.bpmnInstances.modeling.updateProperties(
                            this.bpmnElement,
                            {
                                loopCharacteristics: this.multiLoopInstance,
                            }
                        );
                        this.updateLoopBase();
                        this.updateLoopCondition("${pass==true}");
                        break;
                    default:
                        break;
                }
                this.$emit("updateTaskMode", this.userTaskForm.taskMode);
            }
            window.bpmnInstances.modeling.updateProperties(
                window.bpmnInstances.bpmnElement,
                { ...this.userTaskForm }
            );
        },
        getElementLoop(businessObject) {
            if (!businessObject.loopCharacteristics) {
                this.loopCharacteristics = "";
                this.loopInstanceForm = {};
                return;
            }
            // 合并配置
            this.loopInstanceForm = {
                ...this.defaultLoopInstanceForm,
                ...businessObject.loopCharacteristics,
                completionCondition:
                    (businessObject.loopCharacteristics &&
                        businessObject.loopCharacteristics
                            .completionCondition &&
                        businessObject.loopCharacteristics.completionCondition
                            .body) ||
                    "",
            };
            // 保留当前元素 businessObject 上的 loopCharacteristics 实例
            this.multiLoopInstance =
                window.bpmnInstances.bpmnElement.businessObject.loopCharacteristics;
            // 更新表单
            if (
                businessObject.loopCharacteristics.extensionElements &&
                businessObject.loopCharacteristics.extensionElements.values &&
                businessObject.loopCharacteristics.extensionElements.values
                    .length
            ) {
                this.$set(
                    this.loopInstanceForm,                  
                    businessObject.loopCharacteristics.extensionElements
                        .values[0].body
                );
            }
        },
        // 完成条件
        updateLoopCondition(condition) {
            let completionCondition = null;
            if (condition && condition.length) {
                completionCondition = window.bpmnInstances.moddle.create(
                    "bpmn:FormalExpression",
                    { body: condition }
                );
            }
            window.bpmnInstances.modeling.updateModdleProperties(
                this.bpmnElement,
                this.multiLoopInstance,
                {
                    completionCondition,
                }
            );
        },
        // 直接更新的基础信息
        updateLoopBase() {
            window.bpmnInstances.modeling.updateModdleProperties(
                this.bpmnElement,
                this.multiLoopInstance,
                {
                    collection:
                        this.loopInstanceForm.collection || "${assigneeList}",
                    elementVariable:
                        this.loopInstanceForm.elementVariable || "assignee",
                    isSequential: this.loopInstanceForm.isSequential || false,
                }
            );
        },
    },
    beforeDestroy() {
        this.multiLoopInstance = null;
        this.bpmnElement = null;
    },
};
</script>
