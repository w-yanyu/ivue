<template>    
    <div class="scene-charge" sytle="">
        <el-form ref="secneInfo" :rules="rules" :model="secneInfo" label-width="200px">
            <el-form-item class="scene-table--item">
                <el-table :data="secneInfo.charge_details">
                    <el-table-column
                     prop="chrg_code"
                     :label="translate('LSSoyWY')"
                     width="80">
                    </el-table-column>
                    <el-table-column
                     prop="chrg_code_name"
                     :label="translate('LSSoyWYZCNew')"
                     width="140">
                    </el-table-column>
                    <el-table-column
                     prop="base_chrg_amt"
                     :label="translate('ZGALSaKd')"
                     width="130">
                    </el-table-column>
                    <el-table-column
                     prop="float_amt"
                     :label="translate('rWuYqoYeRaKd')"
                     width="120">
                    </el-table-column>
                    <el-table-column
                     prop="promo_amt"
                     :label="translate('LyYoOgYeRaKd')"
                     width="120">
                    </el-table-column>
                    <el-table-column
                     prop="calc_chrg_ccy"
                     :label="translate('KhLSbiBeN')"
                     width="170">
                    </el-table-column>
                    <el-table-column
                     prop="calc_chrg_amt"
                     :label="translate('KhLSYeRaKd')"
                     width="160">
                    </el-table-column>
                    <el-table-column
                     prop="actual_chrg_amt"
                     :label="translate('aeZmFpSLSYeRaKd')"
                     width="134">
                        <template slot-scope="scope">
                            <scene-currency :index="$index" :value="scope.row.actual_chrg_amt" @change="currencyChange"/>
                        </template>
                    </el-table-column>
                    <el-table-column
                     prop="chrg_pkg_code"
                     :label="translate('aWXaSQyWY')"
                     width="130">
                    </el-table-column>
                    <el-table-column
                     prop="pkg_promo_amt"
                     :label="translate('aWXaSQLyYoOgYeRaKd')"
                     width="180">
                    </el-table-column>
                    <el-table-column
                     prop="pkg_super_promo_amt"
                     :label="translate('LaFaWXaSQLyYoOgYeRaKd')"
                     width="220">
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item :label="translate('wLsqCHbX')" prop="cash_trxn_ind">
                <el-select v-model="secneInfo.cash_trxn_ind">
                    <el-option
                     v-for="item in ctiOptions"
                     :key="item.dictId"
                     :label="item.dictId+ '-' +item.dictName"
                     :value="item.dictId">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="translate('omjLSLSmY')" prop="deduct_chrg_acct">
                <el-input v-model="secneInfo.deduct_chrg_acct"></el-input>
            </el-form-item>
            <el-form-item  :label="translate('omjLSbiBeN')" prop="deduct_chrg_ccy">
                <el-select :disabled="true" v-model="secneInfo.deduct_chrg_ccy">
                    <el-option
                     v-for="item in dccOptions"
                     :key="item['drop_list_value']"
                     :label="item['drop_list_value'] + '-' + item['drop_list_desc']"
                     :value="item['drop_list_value']">
                    </el-option>
                </el-select>                
            </el-form-item>
            <el-form-item :label="translate('omjLSaQLSmoibqPY')" prop="deduct_sub_acct_seq">
                <el-input :disabled="true" v-model="secneInfo.deduct_sub_acct_seq"></el-input>
            </el-form-item>
            <el-form-item :label="translate('pGYKaBLujCB')" prop="summary_code">
                <el-select :disabled="true" v-model="secneInfo.summary_code">
                    <el-option
                     v-for="item in scOptions"
                     :key="item['drop_list_value']"
                     :label="item['drop_list_value'] + '-' + item['drop_list_desc']"
                     :value="item['drop_list_value']">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div class="scene-footer">
            <el-button type="primary" @click="clickConfirm">{{Confirm}}</el-button>
            <el-button @click="clickCancel">{{Cancel}}</el-button>
        </div>
    </div>
</template>
<script>
import MyMessage from 'pte-ui/utils/MyMessage' 
import i18n from 'pte-ui/i18ns' // 国际化
import _ from 'lodash'
import SceneCurrency from '../components/SceneCurrency'
// import store from '@/store'
import store from "pte-ui/store"; // vuex


export default {
    name: "sceneChage",
    components: {
        SceneCurrency
    },
    props: {
        cParentParams: [Object]
    },
    data(){
        return {
            dialogTitle: "",
            Confirm: "",
            Cancel: "",
            request_data: {},
            request_url: "",
            method: "",
            secneInfo: {},
            rules: {
                deduct_chrg_acct: [
                    { required: true, message: i18n.t("KLTYWlomjLSLSmY"), trigger: 'blur' }
                ]
            },
            ctiOptions: [],
            dccOptions: [],
            scOptions: [],
            resultVisible: false
        }     
    },
    created(){
        this.dialogTitle = i18n.t("scene.dialog_title");
        this.Confirm = i18n.t("scene.Confirm");
        this.Cancel = i18n.t("scene.Cancel");
        this.toRequest = {
            url: "/views/ln/trial/ln_repayment_trial_base.json",
            method: "get",
            props: {
                "loan_no": "123456"
            }   
        }
        this.request_data = JSON.parse(this.cParentParams.request.data);
        this.request_url = this.cParentParams.request.url;
        this.method = this.cParentParams.request.method;
        this.secneInfo = this.cParentParams.response.data;
        this.showData = {};
        this.getCtiOptions();
        this.getDccOptions();
        this.getScOptions();
    },
    methods: {
        translate(label) {
          return i18n.t(label);
        },
        clickCancel(){
           store.dispatch('setDialogVisible', false);
        },
        clickConfirm(){
            this.$refs["secneInfo"].validate((valid) => {
                if (valid) {
                    let new_request = _.cloneDeep(this.request_data);
                    new_request.auto_chrg_info = _.cloneDeep(this.secneInfo);
                    new_request["chrg_confirm_ind"] = "Y";
                    store.dispatch('setDialogVisible', false);
                    this.$http.invokeAPI(this.request_url, this.method, new_request).then(response => {
                        if (response.code === "200") {
                            MyMessage({ message: response.message, type: 'success' });
                            store.dispatch('setToRequest', 
                                {  
                                    url: "/views/ln/trial/ln_repayment_trial_base.json",
                                    params: response.data,
                                    props: { width: "900", height: "100px", title: "试算结果" }
                                }
                            );
                            if (this.request_data.servicecode === "326143") {
                                 store.dispatch('setDialogVisible', true);
                                this.showData = response.data;
                            }
                        } else {
                            MyMessage({ message: response.message, type: 'error' });
                        }
                    });
                }
            });
        },
         getCtiOptions: function(){
            let data = {};
            let url = '/SUMP/rest/dict';
            let method = 'POST';
            let params = { dictType: 'E_CASHTRXN2' };
            this.$http.invokeAPI(url, method, params, data).then(res => {
                if (res.code === "200"){
                    this.ctiOptions = res.data;
                } else {
                    MyMessage({ message: res.message, type: 'error' });
                }
            })
        },
        getDccOptions: function(){
            let data = {};
            let url = '/SUMP/call/RPCCall/';
            let method = 'POST';
            let params = {
                servicecode: "ms1053",
                dynamic_drop_list_type: "AP0011"
            } 
            this.$http.invokeAPI(url, method, params, data).then(res => {
                if (res.code === "200"){
                    this.dccOptions = res.data;
                } else {
                    MyMessage({ message: res.message, type: 'error' });
                }
            })
        },
        getScOptions: function(){
            let data = {};
            let url = '/SUMP/call/RPCCall/';
            let method = 'POST';
            let params = {
                servicecode: "ms1053",
                dynamic_drop_list_type: "AP0023"
            } 
            this.$http.invokeAPI(url, method, params, data).then(res => {
                if (res.code === "200"){
                    this.scOptions = res.data;
                } else {
                    MyMessage({ message: res.message, type: 'error' });
                }
            })
        },
        currencyChange(value, index) {
            this.secneInfo.charge_details[index].actual_chrg_amt = value;
        }
    }
}
</script>
<style lang="less" scoped>
/deep/ .scene-charge {
    .el-dialog {
        .el-dialog__body {
            padding: 0;
        }
        .el-table {
            margin: 0;
        }
    }
}
/deep/ .el-table {
    .el-input__inner {
        height: 28px;
    }
}
.scene-footer {
    text-align: center;
}
/deep/ .el-form-item {
    width: 50%;
    float: left;
    display: flex;
}
/deep/ .el-form {
    overflow: hidden;
    .scene-table--item {
        width: 100%;
        .el-form-item__content {
            width: 100%;
        }
        .el-form-item__label {
            display: none;
        }
        .el-form-item__content {
            margin-left: 0 !important;
        }
    }
    .el-form-item__content {
        flex: 1;
        margin: 0 !important;
        .el-input__inner {
            height: 32px;
        }
    }
    .el-form-item__label {
        height: 34px;
        padding: 0 8px 0 0;
        font-size: 14px;
        line-height: 34px;
        color: #697b8c;
    }
}
</style>