<template>
    <div class="account_basic_info_container">
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
                prop="guarantee_format"
                :formatter="formatGuaranteeFormat"
                align="center"
                label="业务种类">
            </el-table-column>
            <el-table-column
                prop="start_date"
                align="center"
                label="开立日期">
            </el-table-column>
            <el-table-column
                prop="end_date"
                align="center"
                label="到期日期">
            </el-table-column>
            <el-table-column
                prop="repay_duty_type"
                :formatter="formatRepayDutyType"
                align="center"
                label="责任人类型">
            </el-table-column>
            <el-table-column
                prop="repay_amount"
                align="center"
                label="还款责任金额">
            </el-table-column>
            <el-table-column
                prop="ccy_code"
                :formatter="formatCcyCode"
                align="center"
                label="币种">
            </el-table-column>
            <el-table-column
                prop="contract_no"
                align="center"
                label="保证合同编号">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
/**
 * 单个账户信息基础内容
 */
export default {
    name: "GuaranteeBasicInfo",
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
        this.accountTypeDesc = '账户' + this.index;
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
        formatGuaranteeFormat(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.dictionaries['E_C_LOANTYPE'].forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
        },
        formatRepayDutyType(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.dictionaries['E_C_REPAYDUTYPERSIONTYPE'].forEach(function(item,index){
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