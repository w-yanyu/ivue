<template>
    <div>
    <el-form label-width="18%" class="form-two-column">
        <el-form-item label="流程产品编号">
            <el-input v-model="nodeInfo.wf_prod_no" disabled />
        </el-form-item>
        <el-form-item label="流程产品名称">
            <el-input v-model="nodeInfo.wf_prod_name" disabled />
        </el-form-item>
        <el-form-item label="节点id">
            <el-input v-model="nodeInfo.task_define_id" disabled />
        </el-form-item>
        <el-form-item label="节点名称">
            <el-input v-model="nodeInfo.task_define_name" disabled />
        </el-form-item>
        <el-form-item :label="$i18ns('节点类型')">
            <el-input v-model="nodeInfo.task_type" disabled />
        </el-form-item>
        <el-form-item label="定时规则">
            <el-input v-model="nodeInfo.task_time_rule" disabled />
        </el-form-item>
        <el-form-item label="定时间隔">
            <el-input v-model="nodeInfo.task_time_interval" disabled />
        </el-form-item>
        <el-form-item label="编辑框架">
            <el-input v-model="nodeInfo.task_url1" disabled />
        </el-form-item>
        <el-form-item label="查看框架">
            <el-input v-model="nodeInfo.task_url2" disabled />
        </el-form-item>
        <el-form-item :label="$i18ns('版本号')">
            <el-input v-model="nodeInfo.bpm_version" disabled />
        </el-form-item>
        <el-form-item label="流程描述">
            <el-input v-model="nodeInfo.remark" disabled />
        </el-form-item>
    </el-form>
    <div style="text-align: center;">
        <el-button type="primary" v-show="isEdit" @click="edit">{{$i18ns('编辑')}}</el-button>
    </div>
    </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios"
export default {
    props: {
        cParentParams: {
            type: Object,
            required: true,
        },
        currentEditNode: {
            type: Object,
            required: true,
        },
        currentList: {
            type: Object,
        },
        
    },
    data() {
        return {
            nodeInfo: {},
            ruleList: [], 
            tasktypeList: [], 
            isEdit: false,
        };
    },
    watch: {
        currentList: {
            handler(val) {
               this.init();
            },
            immediate: true,
        },
        currentEditNode: {
            handler(val) {
                this.getNodeInfo();
            },
            deep: true,
            immediate: false,
        },
        
    },
    mounted() {
      this.isEdit = this.cParentParams.isEdit;
    },
    created() {
        console.log("created方法");
      this.init();
      this.getNodeInfo();
    },
    methods: {
        init() {
            console.log("初始化码值");
            this.getDictList("BPM_E_TASK_TIME_RULE", "ruleList");
             this.getDictList("BPM_E_TASK_TYPE", "tasktypeList");
        },
        /**
        * 获取字典
        */
        getDictList(dictType, listKey) {
            let params = {
                dictType: dictType,
                dictKey: [dictType]
            }
            MyAxios.invokeAPI("/SUMP/rest/dict", "post", params).then(res => {
                if (res && res.code === "200") {
                this[listKey] = res.data;
                }
            }).catch(err => {
                console.error(err)
            })
        },
        /**
        * 获取字典对应的label
        * @param list
        * @param value
        * @returns {*}
        */
        getDictLabel(list, value) {
            let tempValue = value;
            for (const item of list) {
                if (tempValue === item.dictId) {
                tempValue = item.dictName;
                break;
                }
            }
            return tempValue;
        },
         //延迟的方法
        sleep(numberMillis){   
            console.log("kaishi sleep"); 
            var now = new Date();    
            var exitTime = now.getTime() + numberMillis;   
            while (true) { 
            now = new Date();       
            if (now.getTime() > exitTime) return;
            }   
            console.log("jieshu sleep");   
        },
        edit() {
            this.$dialog.open({
                that: this,
                title: "编辑",
                width: "60%",
                toRequest: {
                    url: "/views/msap/bpm/processManagement/products/node/node-temp-modify.json",
                    method: "get",
                    params: { ...this.cParentParams },
                },
            });
        },
        getNodeInfo() {
            let serviceCd = "bpm4004";
            console.log("this.cParentParams.isFormal666 =" + this.cParentParams.isFormal);
            if(this.cParentParams.isFormal == '1'){
                serviceCd = "bpm5005";
            }
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", {
                    servicecode: serviceCd,
                    appId: this.cParentParams.appId,
                    wf_prod_no: this.cParentParams.wf_prod_no,
                    task_define_id: this.cParentParams.task_define_id,
                    bpm_version: this.cParentParams.bpm_version,
                })
                .then((response) => {
                    this.nodeInfo = response.data;
                    this.nodeInfo.task_time_rule = this.getDictLabel(this.ruleList, this.nodeInfo.task_time_rule);
                    this.nodeInfo.task_type = this.getDictLabel(this.tasktypeList, this.nodeInfo.task_type);
                    this.$emit("getData", response.data);
                });
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