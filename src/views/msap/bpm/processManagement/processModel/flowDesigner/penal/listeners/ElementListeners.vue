<template>
    <div class="panel-tab__content">
        <el-table :data="elementListenersList" border>
            <el-table-column :label="$i18ns('bpmmodel.event_type')" min-width="100px" prop="event" />
            <el-table-column  :label="$i18ns('bpmmodel.java_class')" min-width="100px" show-overflow-tooltip prop="class" />
            <el-table-column  :label="$i18ns('bpmmodel.operation')" width="120px" align="center">
                <template slot="header">
                    <el-button type="primary" @click="openListenerForm(null)">{{$i18ns('bpmmodel.add_listener')}}</el-button>
                </template>
                <template slot-scope="{ row, $index }">
                    <el-button type="text" @click="openListenerForm(row, $index)">{{$i18ns('bpmmodel.edit')}}</el-button>
                    <el-button type="text" @click="removeListener(row, $index)">{{$i18ns('bpmmodel.remove')}}</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog
            :visible.sync="listenerFormModelVisible"
            :title="$i18ns('bpmmodel.execution_listener')"
            :size="`${width}px`"
            :close-on-click-modal="false"
            append-to-body
            destroy-on-close
        >
            <el-form
                size="mini"
                :model="listenerForm"
                label-width="96px"
                ref="listenerFormRef"
                @submit.native.prevent
            >
                <el-form-item
                :label="$i18ns('bpmmodel.event_type')"
                    prop="event"
                    :rules="{ required: true, trigger: ['blur', 'change'] }"
                >
                    <el-select v-model="listenerForm.event">
                        <el-option label="start" value="start" />
                        <el-option label="end" value="end" />
                    </el-select>
                </el-form-item>
                <el-form-item
                :label="$i18ns('bpmmodel.java_class')"
                    prop="class"
                    key="listener-class"
                    :rules="{ required: true, trigger: ['blur', 'change'] }"
                >
                    <el-input v-model="listenerForm.class" clearable />
                </el-form-item>
            </el-form>
            <div class="element-drawer__button">
                <el-button size="mini" @click="listenerFormModelVisible = false">{{$i18ns('bpmmodel.cancel')}}</el-button>
                <el-button size="mini" type="primary" @click="saveListenerConfig">{{$i18ns('bpmmodel.preserve')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {
    createListenerObject,
    updateElementExtensions,
    initListenerForm,
} from "../../utils";

export default {
    name: "ElementListeners",
    props: {
        id: String,
        type: String,
    },
    inject: {
        prefix: "prefix",
        width: "width",
    },
    data() {
        return {
            elementListenersList: [], // 监听器列表
            listenerForm: {
                event: "",
                class: "",
            },
            listenerFormModelVisible: false, // 监听器 编辑 侧边栏显示状态
            editingListenerIndex: -1, // 监听器所在下标，-1 为新增
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
    },
    methods: {
        resetListenersList() {
            this.bpmnElement = window.bpmnInstances.bpmnElement;
            this.bpmnElementListeners =
                this.bpmnElement.businessObject &&
                this.bpmnElement.businessObject.extensionElements &&
                this.bpmnElement.businessObject.extensionElements.values
                    ? this.bpmnElement.businessObject.extensionElements.values.filter(
                          (ex) =>
                              ex.$type === `${this.prefix}:ExecutionListener`
                      )
                    : [];
            let listenerObject;
            if (this.type === "StartEvent") {
                listenerObject = createListenerObject(
                    {
                        event: "end",
                        class: "cn.sunline.bpm.serv.act.StartListener",
                    },
                    false,
                    this.prefix
                );
            } ;
            if (this.type === "IntermediateCatchEvent") {
                listenerObject = createListenerObject(
                    {
                        event: "end",
                        class: "cn.sunline.bpm.serv.act.TimeTaskListener",
                    },
                    false,
                    this.prefix);
            }  ;
             if (this.type === "BoundaryEvent") {
                listenerObject = createListenerObject(
                    {
                        event: "end",
                        class: "cn.sunline.bpm.serv.act.TimerBoundryListener",
                    },
                    false,
                    this.prefix);
            };
             if(this.type === "EndEvent") {
                listenerObject = createListenerObject(
                    {
                        event: "end",
                        class: "cn.sunline.bpm.serv.act.EndListener",
                    },
                    false,
                    this.prefix
                );
            }
            this.bpmnElementListeners = [listenerObject];
            updateElementExtensions(
                this.bpmnElement,
                this.bpmnElementListeners
            );
            this.elementListenersList = this.bpmnElementListeners;
        },
        openListenerForm(listener, index) {
            if (listener) {
                this.listenerForm = initListenerForm(listener);
                this.editingListenerIndex = index;
            } else {
                this.listenerForm = {};
                this.editingListenerIndex = -1; // 标记为新增
            }
            // 打开侧边栏并清除验证状态
            this.listenerFormModelVisible = true;
            this.$nextTick(() => {
                if (this.$refs["listenerFormRef"]) {
                    this.$refs["listenerFormRef"].clearValidate();
                }
            });
        },
        removeListener(listener, index) {
            this.$confirm("确认移除该监听器吗？", "提示", {
                confirmButtonText: "确 认",
                cancelButtonText: "取 消",
            })
                .then(() => {
                    this.bpmnElementListeners.splice(index, 1);
                    this.elementListenersList.splice(index, 1);
                    updateElementExtensions(
                        this.bpmnElement,
                        this.bpmnElementListeners
                    );
                })
                .catch(() => console.info("操作取消"));
        },
        async saveListenerConfig() {
            let validateStatus = await this.$refs["listenerFormRef"].validate();
            if (!validateStatus) return;
            const listenerObject = createListenerObject(
                this.listenerForm,
                false,
                this.prefix
            );
            if (this.editingListenerIndex === -1) {
                this.bpmnElementListeners.push(listenerObject);
            } else {
                this.bpmnElementListeners.splice(
                    this.editingListenerIndex,
                    1,
                    listenerObject
                );
            }
            updateElementExtensions(
                this.bpmnElement,
                this.bpmnElementListeners
            );
            this.listenerFormModelVisible = false;
            this.listenerForm = {};
        },
    },
};
</script>
