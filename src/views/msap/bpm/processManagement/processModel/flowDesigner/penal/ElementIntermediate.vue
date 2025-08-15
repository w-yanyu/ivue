<template>
    <el-form label-width="18%" class="form-two-column" @submit.native.prevent>
   
 
        <el-form-item  :label="$i18ns('bpmmodel.timing_method')">
            <el-select v-model="timeWay" @change="changeTimeWay" :placeholder="$i18ns('bpmmodel.please_select')">
                <el-option v-for="item in timeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
    </el-form>
</template>

<script>
import { updateIntermediate,  initUtil } from "../utils";

export default {
    name: "ElementIntermediate",
    props: {
        id: String,
        businessObject: Object,
    },
    data() {
        return {

            intermediateForm: {},
            // eslint-disable-next-line no-template-curly-in-string
            timeWay: "timeDuration",
            timeOptions: [{
                value: 'timeDuration',
                label: this.$i18ns('bpmmodel.time_interval')
            }, {
                value: 'timeDate',
                label:  this.$i18ns('bpmmodel.specify_time')
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
            updateIntermediate(this.bpmnElement, this.timeWay);                
        },
        changeTimeWay(data){
            this.timeWay=data;
            updateIntermediate(this.bpmnElement, this.timeWay);
        },
    
   getElementLoop() {//获取定时捕获事件原有值
      let businessObject=window.bpmnInstances.bpmnElement.businessObject;      
     
      if(businessObject.hasOwnProperty('eventDefinitions') && businessObject.eventDefinitions.length>0){
        if(businessObject.eventDefinitions[0].$type == 'bpmn:TimerEventDefinition') {
          if(businessObject.eventDefinitions[0].hasOwnProperty('timeDuration')) {
            this.timeWay = "timeDuration"
          }
          else if(businessObject.eventDefinitions[0].hasOwnProperty('timeDate')) {
            this.timeWay = "timeDate"
          }
          else if(businessObject.eventDefinitions[0].hasOwnProperty('timeCycle')) {
            this.timeWay = "timeCycle"        
          }
        }
      }
    },
},
created() {
        initUtil(this);
        this.getElementLoop();
        this.resetListenersList();
        
    }
}

</script>
