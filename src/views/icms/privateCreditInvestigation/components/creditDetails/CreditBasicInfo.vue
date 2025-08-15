<template>
    <div class="credit_basic_info_container">
        <div
            style="width: 100%;
          line-height: 23px;
          text-align: left;
          padding: 10px;
          font-weight: normal;">
            {{ accountTypeDesc }}
        </div>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="finance_org"
                align="center"
                label="管理机构">
            </el-table-column>
            <el-table-column
                prop="credit_protocol_mark"
                align="center"
                label="授信协议标识">
            </el-table-column>
            <el-table-column
                prop="effective_date"
                align="center"
                label="生效日期">
            </el-table-column>
            <el-table-column
                prop="due_date"
                align="center"
                label="到期日期">
            </el-table-column>
            <el-table-column
                prop="credit_purpose"
                :formatter="formatCreditPurpose"
                align="center"
                label="授信额度用途">
            </el-table-column>
        </el-table>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="credit_limit_amount"
                align="center"
                label="授信额度">
            </el-table-column>
            <el-table-column
                prop="credit_limit"
                align="center"
                label="授信限额">
            </el-table-column>
            <el-table-column
                prop="credit_limit_num"
                align="center"
                label="授信限额编号">
            </el-table-column>
            <el-table-column
                prop="used_installment_amount"
                align="center"
                label="已用额度">
            </el-table-column>
            <el-table-column
                prop="ccy_code"
                :formatter="formatCcyCode"
                align="center"
                label="币种">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
/**
 * 单个账户信息基础内容
 */
export default {
    name: "CreditBasicInfo",
    props: {
        tableData: {
            type: Array,
            default() {
                return []
            }
        },
        index: {
            Type: Number,
            default: 1
        },
        dictionaries: {
            type: Object,
            default() {
                return {};
            }
        },
    },
    data() {
        return {
            accountTypeDesc: ''
        }
    },
    components: {},
    created() {
        this.accountTypeDesc = '授信协议' + this.index;
    },
    methods: {
        formatCcyCode(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.dictionaries['E_CURRENCY'].forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
        },
        formatCreditPurpose(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.dictionaries['E_CREDIT_PURPOSE'].forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
        },
        formatOrgType(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.dictionaries['E_QUERY_ORG_TYPE'].forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
        },
    }
}
</script>
<style lang="css" scoped>
* {
    box-sizing: border-box;
}
</style>