<template>
    <div id="check" sytle="">
        <el-dialog custom-class="template_dialog_content" :close-on-click-modal="false"
                   :title="dialogTitle" :visible.sync="dialogVisible" :width="dialogWidth"
                   :append-to-body="true">
            <el-form :rules="rules" ref="form" :model="auth_info" label-width="160px">
                <el-form-item class="permis-form--item" :label="auth_name" prop="auth_name">
                    <el-input :placeholder="auth_name_place" v-model="auth_info.auth_name"></el-input>
                </el-form-item>
                <el-form-item class="permis-form--item" :label="auth_pass" prop="auth_pass">
                    <pte-password v-model="auth_info.auth_pass"
                        :type="pwdType"
                        :encryptionType="SHA"
                        :placeholder="auth_pass_place"
                        :min="5"
                        autocomplete="on"
                        ></pte-password>
                </el-form-item>
            </el-form>
            <el-table v-bind:data="auth_reason" height="200" border>
                <tr>
                    <el-table-column prop="auth_reason_type" :label="auth_reason_type" width="100" />
                    <el-table-column prop="auth_reason_id" :label="auth_reason_id" width="80" />
                    <el-table-column prop="auth_reason_desc" :label="auth_reason_desc"/>
                    <el-table-column prop="ccy_code" :label="ccy_code"/>
                    <el-table-column prop="trxn_amt" :label="trxn_amt"/>
                    <el-table-column prop="auth_role_list" :label="auth_role_list"/>
                </tr>
            </el-table>
            <div class="permis-footer">
                <el-button type="primary" @click="clickConfirm">{{Confirm}}</el-button>
                <el-button @click="clickCancel">{{Cancel}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
// import Vue from 'pte-ui/main' // vue插件
import MyMessage from 'pte-ui/utils/MyMessage'
import i18n from 'pte-ui/i18ns' // 国际化
// import Vue from 'pte-ui/main' // vue插件
// import _ from 'lodash'
export default {

     props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object // 父页面的scope数据对象
    },
    created(){

    },
    data(){
        return {
            dialogVisible: false,
            Confirm: i18n.t("permission.Confirm"),
            Cancel: i18n.t("permission.Cancel"),
            auth_name: i18n.t("permission.auth_name"),
            auth_pass: i18n.t("permission.auth_pass"),
            dialogTitle: i18n.t("permission.dialog_title"),
            auth_reason_type: i18n.t("permission.auth_reason_type"),
            auth_reason_id: i18n.t("permission.auth_reason_id"),
            auth_reason_desc: i18n.t("permission.auth_reason_desc"),
            ccy_code: i18n.t("permission.ccy_code"),
            trxn_amt: i18n.t("permission.trxn_amt"),
            auth_role_list: i18n.t("permission.auth_role_list"),
            auth_name_place: i18n.t("permission.auth_name_place"),
            auth_pass_place: i18n.t("permission.auth_pass_msg"),
			auth_reason: [],
			auth_info: {
				auth_name: '',
				auth_pass: ''
            },
            rules: {
                auth_name: [
                    { required: true, message: i18n.t("permission.auth_name_msg"), trigger: 'blur' }
                ],
                auth_pass: [
                    { required: true, message: i18n.t("permission.auth_pass_msg"), trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        openMask(request, response){
            if (this.dialogVisible === false) {
                this.dialogVisible = true;
            }
            this.auth_reason = response.auth_reason;
            this.request_data = request.data;
            this.request_url = request.url;
            this.method = request.method;
        },
        clickCancel(){
           this.dialogVisible = false;
        },
        clickConfirm(){
            this.$refs["form"].validate(valid => {
                if (valid) {
                    let new_request = JSON.parse(this.request_data);
                    new_request["auth_info"] = this.auth_info;
                    new_request["auth_ind"] = "Y";

                    this.dialogVisible = false;

                    this.$http.invokeAPI(this.request_url, this.method, new_request).then(response => {
                        if (response.code === "200") {
                            MyMessage({ message: response.message, type: 'success' });
                        } else {
                            MyMessage({ message: response.message, type: 'error' });
                        }
                    });
                }
            });
        }
    }
}
</script>
<style lang="less" scoped>
/deep/ .permis-form--item {
    height: 34px;
    margin-bottom: 16px;
    .el-form-item__label {
        padding: 0 8px 0 0;
        font-size: 14px;
        line-height: 32px;
        color: #697b8c;
    }
    .el-form-item__content {
        width: 300px;
        .el-input__inner {
            width: 300px;
            height: 32px;
        }
    }
}
.permis-footer {
    width: 100%;
    padding: 12px 0 0 0;
    display: inline-block;
    text-align: center;
}
</style>
