<template>    
    <div id="check" sytle="">
        <div >
            <el-form ref="form" :model="workflow_info" label-width="100px" >
                <el-form-item :label="next_step">
                    <el-select v-model="workflow_info.route_id" :placeholder="Select" size="mini" @change="changeValue">
                        <el-option v-for="item in route_id_list" :key="item.route_id" :label="item.route_desc" :value="item.route_id">
                            <span style="float: left">{{item.route_id}}-{{item.route_desc}}</span>
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item :label="next_processer">
                    <el-select v-model="workflow_info.signer" :placeholder="Select" size="mini">
                        <el-option v-for="item in signer_list" :key="item.user_id" :label="item.user_name" :value="item.user_id">
                            <span style="float: left">{{item.user_id}}-{{item.user_name}}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="remark">
                    <el-input v-model="workflow_info.remark"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="clickConfirm">{{Confirm}}</el-button>
                    <el-button @click="clickCancel">{{Cancel}}</el-button>
                </el-form-item>

            </el-form>
        </div>  
    </div>
</template>
<script>

import MyMessage from 'pte-ui/utils/MyMessage'
import i18n from 'pte-ui/i18ns' // 国际化
export default {      
     props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object // 父页面的scope数据对象
    },
    data(){
        return {
            sendVal: true,
            title: i18n.t("workflow.dialog_title"),
            next_step: i18n.t("workflow.next_step"),
            next_processer: i18n.t("workflow.next_processer"),
            remark: i18n.t("workflow.remark"),
            Confirm: i18n.t("workflow.Confirm"),
            Cancel: i18n.t("workflow.Cancel"),
            Select: i18n.t("workflow.Select"),
            route_id_list: [],
            signer_list: [],
            signer_isDisabled: true,
			workflow_info: {
				route_id: '', //下一个线路ID
                signer: '', //下一个处理人
                remark: '',
                original_page_info: '', //原页面数据
                update_page_info: '', //现页面数据
                ince_id: '', //工作流实例ID
                page_display_scene: '', 
                schedule_id: '', //代办事项ID
                page_id: '', //原页面ID
                output_page_id: ''  //输出页面ID
            },
            rules: {
                route_id: [
                    { required: true, message: i18n.t("workflow.route_id_msg"), trigger: 'blur' }
                ]
            }
        }     
    },    
    created(){
        let init_url = "/SUMP/workflow/ct2019";
        let init_req = {
            route_id: this.cParentParams.route_id,
            schedule_id: this.cParentParams.schedule_id
        };

        this.$http.invokeAPI(init_url, "post", init_req).then(response => {
            if (response.code === "200") {
                console.log(response.data);
                this.route_id_list = response.data.lstWorkLine;
                this.workflow_info.original_page_info = response.data.original_page_info;
                this.workflow_info.update_page_info = response.data.update_page_info;

                let job_rcv_method = response.job_rcv_method;

                if (job_rcv_method === 'A') {
                    this.signer_isDisabled = false;
                } else {
                    this.signer_isDisabled = true;
                }
            } else {
                MyMessage({ message: response.message, type: 'error' });
            }
        });
    },
    methods: {
        changeValue(route_id){
            let request_map = {}
            let request_url = "/SUMP/call/RPCCall";
            request_map["servicecode"] = "ct2017";
            request_map["route_id"] = route_id;
            request_map["ince_id"] = this.cParentParams.ince_id;

            this.$http.invokeAPI(request_url, "post", request_map).then(response => {
                if (response.code === "200") {
                    console.log(response.data);
                    this.signer_list = response.data.dealerList;
                } else {
                    MyMessage({ message: response.message, type: 'error' });
                }
            });
        },
        clickCancel(){
            console.log('点击了取消');  
            this.$emit('update');
        },
        clickConfirm(){
            let request_url = "/SUMP/call/RPCCall";
            this.workflow_info["servicecode"] = "ct2016";

            this.workflow_info.schedule_id = this.cParentParams.schedule_id;
            this.workflow_info.ince_id = this.cParentParams.ince_id;
            // 接收从在第二层表单页面修改的数据，#仅退回可修改
            console.log(this.cParentParams, this.cParentScope)
            if (this.cParentParams && this.cParentParams.xxx) {
                this.workflow_info.update_page_info = JSON.stringify(this.cParentParams.xxx);
            }
            this.$http.invokeAPI(request_url, "post", this.workflow_info).then(response => {
                if (response.code === "200") {
                    MyMessage({ message: response.message, type: 'success' });
                    this.$emit('update', response);
                } else {
                    MyMessage({ message: response.message, type: 'error' });
                }
            });
        }
    }
}
</script>
<style lang="css" scoped>
/* .check_auth >>> .dialog-container {
	width: 680px;
	height: 480px;
	background: #ffffff;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 8px;
	position: relative;
}  */
</style>