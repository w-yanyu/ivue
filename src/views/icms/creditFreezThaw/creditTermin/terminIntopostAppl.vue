<template>
    <div>
        <div class="container-content">
            <div class="container-content--search">
                <el-form :model="payListSelForm" ref="payListSelForm" :rules="payListSelRules" label-width="150px"
                    class="custom-common--form">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="客户名称" prop="cust_name">
                                <el-input v-model="payListSelForm.cust_name" class="input" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="业务类别" prop="busi_type">
                                <el-select v-model="payListSelForm.busi_type" clearable disabled>
                                    <el-option v-for="(item, index) in busi_typeList" :key="index" :label="item.dictName"
                                        :value="item.dictId"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="额度编号" prop="limit_no">
                                <el-input v-model="payListSelForm.limit_no" class="input" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="额度类别" prop="quota_type">
                                <el-select v-model="payListSelForm.quota_type" clearable disabled>
                                    <el-option v-for="(item, index) in quota_typeList" :key="index" :label="item.dictName"
                                        :value="item.dictId"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="可售产品编号" prop="sale_prod_cd">
                                <el-input v-model="payListSelForm.sale_prod_cd" disabled class="input"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="可售产品名称" prop="sale_prod_name">
                                <el-input v-model="payListSelForm.sale_prod_name" disabled class="input"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="额度金额" prop="cl_amt">
                                <el-input v-model="payListSelForm.cl_amt" class="input" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="可用余额" prop="avail_amt">
                                <el-input v-model="payListSelForm.avail_amt" class="input" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="生效日期" prop="effect_date">
                                <el-input v-model="payListSelForm.effect_date" class="input" disabled></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="失效日期" prop="expiry_date">
                                <el-input v-model="payListSelForm.expiry_date" class="input" disabled></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="8">
                            <el-form-item label="额度状态" prop="quota_status">
                                <el-select v-model="payListSelForm.quota_status" disabled clearable>
                                    <el-option v-for="(item, index) in quota_statusList" :key="index"
                                        :disabled="item.disabled" :label="item.dictName" :value="item.dictId"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
    </div>
</template>


<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
    name: "freezenAppl",
    props: {
        cMeta: Object, // 布局相关数据
        cParentMeta: Object, // 父页面模板json数据
        cParentScope: Object, // 父页面每块区域业务数据
        cParentParams: Object, // 父页面自定义参数与内置参数
    },
    data() {
        return {
            StatusList: [], //状态
            payListSelForm: {
                cust_no: "", //客户编号
                cust_name: "",  //客户名称
                limit_no: "", //额度编号
                cl_amt: "", //额度金额
                avail_amt: "", //可用余额
                quota_type: "", //额度类别
                cycle_flag: "", //循环标志
                effect_date: "", //生效日期
                expiry_date: "", //失效日期
                quota_status: "", //额度状态
                sale_prod_cd: "",
                sale_prod_name: ""

            },
            quota_statusList: [],
            quota_typeList: [],
            busi_typeList: [{
                dictId: "LTBK",
                dictName: "额度冻结"
            },
            {
                dictId: "LTTW",
                dictName: "额度解冻"
            },
            {
                dictId: "LTTE",
                dictName: "额度终止"
            }]
        }
    },
    created() {
        this.getDictList("UCCP_E_FREZE_QUOTA_TYPE", "quota_typeList");
        this.getDictList("UCCP_E_QUOTA_STATUS", "quota_statusList");
        this.getValue();
    },
    methods: {
        getValue() {
            let params = {
                servicecode: "ar1401",
                apply_no: this.cParentParams.appl_id,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
                if (res && res.code === "200") {
                    console.log(111111111111111, res.data);
                    this.payListSelForm = res.data;
                    this.payListSelForm.cust_no = res.data.cust_no; //客户编号
                    this.payListSelForm.cust_name = res.data.cust_name;  //客户名称
                    this.payListSelForm.limit_no = res.data.limit_no; //额度编号                  
                    this.payListSelForm.sale_prod_cd = res.data.sale_prod_cd; //产品号/账号/卡号/上级客户号/交易渠道
                    this.payListSelForm.sale_prod_name = res.data.sale_prod_name; //产品号/账号/卡号/上级客户号/交易渠道
                    this.payListSelForm.ccy_code = res.data.tran_ccy;//交易币种
                    this.payListSelForm.cl_amt = res.data.cl_amt; //额度金额
                    this.payListSelForm.cl_amt = this.payListSelForm.cl_amt.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,');
                    this.payListSelForm.avail_amt = res.data.avail_amt; //可用余额
                    this.payListSelForm.avail_amt =this.payListSelForm.avail_amt.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,'$1,');
                    this.payListSelForm.cl_level = res.data.cl_level; //额度级别
                    this.payListSelForm.cycle_flag = res.data.cycle_flag; //循环标志
                    this.payListSelForm.effect_date = res.data.effect_date; //生效日期
                    this.payListSelForm.expiry_date = res.data.expiry_date; //失效日期
                    this.payListSelForm.quota_status = res.data.quota_status; //有效状态
                    this.payListSelForm.quota_type = res.data.quota_type;
                }
            }).catch(err => {
                console.error(err);
            })
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
                    this.StatusList.map((item, index) => {
                        if (item.dictName == "无效") {
                            item.dictName = "提前终止"
                        }
                    })
                }
            }).catch(err => {
                console.error(err)
            })
        }
    }

}
</script>

<style lang="less" scoped>
.container-content {
    .container-content--search {
        padding: 16px 40px 0 12px;
    }

    .container-content--pagination {
        float: right;
        padding: 10px;
    }

    .container-content--table {
        margin-top: 10px;
    }

    .container-content--footer {
        margin-top: 10px;
        padding: 1px 10px;
    }
}

.button-footer {
    text-align: center;
}

.export-button-style {
    background: #6ac044 !important;
    border-color: #6ac044 !important;
}

.submit-item {
    padding: 18px 0px 0px 0px;
}

.submit-item--btn {
    display: block;
    margin: 0 auto;
    text-align: center;
}
</style>
