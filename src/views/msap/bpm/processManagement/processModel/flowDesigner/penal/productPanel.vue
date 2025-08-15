<template>
    <div>
        <el-form
            v-if="!currentEditNode || currentEditNode.type === 'bpmn:Process'"
            label-width="18%"
            :rules="rules"
            class="form-two-column"
        >
            <el-form-item  :label="$i18ns('bpmmodel.process_number')" prop="wf_define_id">
                <el-input v-model="flowInfo.wf_define_id" disabled />
            </el-form-item>
            <el-form-item  :label="$i18ns('bpmmodel.process_name')" prop="wf_define_name">
                <el-input v-model="flowInfo.wf_define_name" disabled />
            </el-form-item>
        </el-form>
        <el-tabs v-else v-model="activeName" type="card">
            <el-tab-pane v-if="currentEditNode.type !== 'bpmn:SequenceFlow'"  :label="$i18ns('bpmmodel.node_information')" name="1">
                <to-json
                    v-if="activeName === '1' && isFormal === '0'"
                    toUrl="/views/msap/bpm/processManagement/products/node/node-temp-view.json"
                    :key="currentEditNode.id"
                    :params="flowInfo"
                ></to-json>
                <to-json
                    v-if="activeName === '1' && isFormal === '1'"
                    toUrl="/views/msap/bpm/processManagement/products/node/node-temp-view-new.json"
                    :key="currentEditNode.id"
                    :params="flowInfo"
                ></to-json>
                <!-- <nodeTempView :cParentParams="flowInfo" :currentEditNode="currentEditNode" @getData="getData" />-->
            </el-tab-pane>
            <el-tab-pane
                v-if="currentEditNode.type !== 'bpmn:SequenceFlow' && currentEditNode.type === 'bpmn:UserTask'"
                :label="$i18ns('bpmmodel.participant_management')"
                name="2"
            >
                <to-json
                    v-if="activeName === '2' && isFormal === '0'"
                    toUrl="/views/msap/bpm/processManagement/products/participant/temp-view-detail.json"
                    :params="flowInfo"
                ></to-json>
                <to-json
                    v-if="activeName === '2' && isFormal === '1'"
                    toUrl="/views/msap/bpm/processManagement/products/participant/view-detail-new.json"
                    :params="flowInfo"
                ></to-json>
            </el-tab-pane>
            <el-tab-pane 
                v-if="currentEditNode.type === 'bpmn:UserTask'"
                :label="$i18ns('bpmmodel.node_recall_business_management')"
                name="8"
            >
                <to-json
                    v-if="activeName === '8' && isFormal === '0' && isEdit === true"
                    toUrl="/views/msap/bpm/processManagement/products/node/node-recall-busiser-main.json"
                    :params="flowInfo"
                    :key="currentEditNode.id"
                ></to-json>
                <to-json
                    v-if="activeName === '8' && isFormal === '0' && isEdit === false"
                    toUrl="/views/msap/bpm/processManagement/products/node/node-recall-busiser-view.json"
                    :params="flowInfo"
                    :key="currentEditNode.id"
                ></to-json>
                <to-json
                    v-if="activeName === '8' && isFormal === '1'" 
                    toUrl="/views/msap/bpm/processManagement/products/node/node-recall-busiser-manager-new.json"
                    :params="flowInfo"
                ></to-json>
            </el-tab-pane>
            <!--<el-tab-pane
                v-if="['bpmn:ServiceTask', 'bpmn:ReceiveTask', 'bpmn:IntermediateCatchEvent'].indexOf(currentEditNode.type) !== -1"
                label="策略配置"
                name="3"
            >
                <to-json
                    v-if="activeName === '3' && isFormal === '0'"
                    toUrl="/views/msap/bpm/processManagement/products/node/config/temp-strategy-veiw.json"
                    :params="flowInfo"
                    :key="currentEditNode.id"
                ></to-json>
                <to-json
                    v-if="activeName === '3' && isFormal === '1'"
                    toUrl="/views/msap/bpm/processManagement/products/node/config/strategy-veiw-new.json"
                    :params="flowInfo"
                    :key="currentEditNode.id"
                ></to-json>
            </el-tab-pane>
            <el-tab-pane
                v-if="['bpmn:ServiceTask', 'bpmn:ReceiveTask', 'bpmn:IntermediateCatchEvent'].indexOf(currentEditNode.type) !== -1"
                label="策略规则配置"
                name="4"
            >
                <to-json
                    v-if="activeName === '4' && isFormal === '0'"
                    toUrl="/views/msap/bpm/processManagement/products/node/config/temp-strategy-rule-view.json"
                    :params="flowInfo"
                ></to-json>
                <to-json
                    v-if="activeName === '4' && isFormal === '1'"
                    toUrl="/views/msap/bpm/processManagement/products/node/config/strategy-rule-view.json"
                    :params="flowInfo"
                ></to-json>
            </el-tab-pane> -->
            <el-tab-pane
                v-if="['bpmn:ServiceTask', 'bpmn:ReceiveTask', 'bpmn:IntermediateCatchEvent'].indexOf(currentEditNode.type) !== -1"
                :label="$i18ns('bpmmodel.policy_management')"
                name="3"
            >
                <to-json
                    v-if="isFormal === '0'"
                    toUrl="/views/msap/bpm/processManagement/products/node/config/conf_manager_tag.json"
                    :key="currentEditNode.id"
                    :params="flowInfo"
                ></to-json>
                <to-json
                    v-if="isFormal === '1'"
                    toUrl="/views/msap/bpm/processManagement/products/node/config/conf_manager_tag_new.json"
                    :key="currentEditNode.id"
                    :params="flowInfo"
                ></to-json>
            </el-tab-pane>
            <el-tab-pane v-if="currentEditNode.type === 'bpmn:SequenceFlow'"  :label="$i18ns('bpmmodel.route_information')" name="5">
                <to-json
                    v-if="activeName === '5' && isFormal === '0'"
                    toUrl="/views/msap/bpm/processManagement/products/route/temp-route-manage.json"
                    :key="flowInfo.route_cd"
                    :params="flowInfo"
                ></to-json>
                <to-json
                    v-if="activeName === '5' && isFormal === '1'"
                    toUrl="/views/msap/bpm/processManagement/products/route/route-manage-new.json"
                    :key="flowInfo.route_cd"
                    :params="flowInfo"
                ></to-json>
            </el-tab-pane>
            <el-tab-pane
                v-if="currentEditNode.type === 'bpmn:SequenceFlow'"
                :label="$i18ns('bpmmodel.business_configuration')"
                name="6"
            >
                <to-json
                    v-if="activeName === '6' && isFormal === '0' && isEdit === true"
                    toUrl="/views/msap/bpm/processManagement/products/route/process-busiser-main.json"
                    :params="flowInfo"
                    :key="flowInfo.route_cd"
                ></to-json>
                <to-json
                    v-if="activeName === '6' && isFormal === '0' && isEdit === false"
                    toUrl="/views/msap/bpm/processManagement/products/route/process-busiser-view.json"
                    :params="flowInfo"
                    :key="flowInfo.route_cd"
                ></to-json>
                <to-json
                    v-if="activeName === '6' && isFormal === '1'" 
                    toUrl="/views/msap/bpm/processManagement/products/route/process-busiser-manager-new.json"
                    :params="flowInfo"
                ></to-json>
            </el-tab-pane>
            <el-tab-pane
                v-if="currentEditNode.type === 'bpmn:BoundaryEvent'"
                :label="$i18ns('bpmmodel.business_configuration')"
                name="7"
            >
                <to-json
                    v-if="activeName === '7' && isFormal === '0' && isEdit === true"
                    toUrl="/views/msap/bpm/processManagement/products/node/process-busiser-main.json"
                    :params="flowInfo"
                    :key="currentEditNode.id"
                ></to-json>
                <to-json
                    v-if="activeName === '7' && isFormal === '0' && isEdit === false"
                    toUrl="/views/msap/bpm/processManagement/products/node/process-busiser-view.json"
                    :params="flowInfo"
                    :key="currentEditNode.id"
                ></to-json>
                <to-json
                    v-if="activeName === '7' && isFormal === '1'" 
                    toUrl="/views/msap/bpm/processManagement/products/node/process-busiser-manager-new.json"
                    :params="flowInfo"
                ></to-json>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import nodeTempView from "@/views/msap/bpm/processManagement/products/node/node-temp-view";

export default {
    props: {
        flowObj: {
            type: Object,
        },
        currentEditNode: {
            type: Object,
            required: true,
        },
    },
    components: {
        nodeTempView,
    },
    data() {
        return {
            elementId: "",
            elementType: "",
            elementBusinessObject: {}, // 元素 businessObject 镜像，提供给需要做判断的组件使用
            conditionFormVisible: false, // 流转条件设置
            flowInfo: {
                wf_define_id:'',
                wf_define_name:'',
                remark:''
            },
            activeName: "1",
            isFormal: "0",
            isEdit: false,
            rules: {
                wf_define_id: [
                    { required: true, message: this.$i18ns('bpmmodel.please_enter_the_process_number'), trigger: 'blur' }
                ],
                wf_define_name: [
                    { required: true, message: this.$i18ns('bpmmodel.please_enter_a_process_name'), trigger: 'blur' }
                ]
            },
         flow_info_i18n:this.$i18ns('bpmmodel.flow_info_i18n'),
         task_info_i18n:this.$i18ns('bpmmodel.task_info_i18n'),
         route_info_i18n:this.$i18ns('bpmmodel.route_info_i18n'),
        };
    },
    watch: {
        flowObj: {
            handler(val) {
                this.flowInfo = val;
            },
            deep: true,
        },
        currentEditNode: {
            handler(val) {
                if (val.type === "bpmn:Process") {
                    this.$parent.nodeName = this.flow_info_i18n;
                } else if (val.type === "bpmn:SequenceFlow") {
                    this.$parent.nodeName = this.route_info_i18n;
                    this.flowInfo.route_cd = val.id;
                    this.activeName = "5";
                } else {
                    this.$parent.nodeName = this.task_info_i18n;
                    this.flowInfo.task_define_id = val.id;
                    this.activeName = "1";
                }
            },
            deep: true,
        },
    },
    mounted() {
        console.log("父类传入的参数flowObj", this.flowObj);
        this.isFormal = this.flowObj.isFormal;
        this.isEdit = this.flowObj.isEdit;
        console.log("isEdit ： ", this.isEdit);
    },
    methods: {
        getData(data) {
            this.flowInfo.wf_task_no = data.wf_task_no;
        },
    },
};
</script>

<style lang="less" scoped>
/deep/ .form-two-column {
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
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