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
                prop="finance_org_code"
                align="center"
                label="管理机构">
            </el-table-column>
            <el-table-column
                prop="account_label"
                align="center"
                label="账户标识">
            </el-table-column>
            <el-table-column
                prop="open_date"
                align="center"
                label="开立日期">
            </el-table-column>
            <el-table-column
                prop="end_date"
                align="center"
                label="到期日期">
            </el-table-column>
            <el-table-column
                prop="credit_amount"
                align="center"
                label="账户授信额度">
            </el-table-column>
            <el-table-column
                prop="ccy_code"
                :formatter="formatCcyCode"
                align="center"
                label="账户币种">
            </el-table-column>
        </el-table>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="type"
                :formatter="formatType"
                align="center"
                label="业务种类">
            </el-table-column>
            <el-table-column
                prop="guarantee_type"
                :formatter="formatGuaranteeType"
                align="center"
                label="担保方式">
            </el-table-column>
            <el-table-column
                prop="repay_period"
                align="center"
                label="还款期数">
            </el-table-column>
            <el-table-column
                prop="repay_freq"
                :formatter="formatRepayFreq"
                align="center"
                label="还款频率">
            </el-table-column>
            <el-table-column
                prop="repay_type"
                :formatter="formatRepayType"
                align="center"
                label="还款方式">
            </el-table-column>
            <el-table-column
                prop="shared_borrowing_mark"
                :formatter="formatSharedBorrowingMark"
                align="center"
                label="共同借款标志">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
/**
 * 单个账户信息基础内容
 */
export default {
    name: "AccountBasicInfo",
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
        this.accountTypeDesc = '账户' + this.index + ' (授信协议标识：'+this.tableData[0].credit_protocol_no+') '+ this.tableData[0].account_no;
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
        formatType(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.dictionaries['E_C_LOANTYPE'].forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
        },
        formatGuaranteeType(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.dictionaries['E_C_GUARANTEETYPE'].forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
        },
        formatRepayFreq(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.dictionaries['E_C_REPAYFREQ'].forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
        },
        formatRepayType(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.dictionaries['E_C_REPAYTYPE'].forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
        },
        formatSharedBorrowingMark(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.dictionaries['E_C_SHAREDBORROWINGMARK'].forEach(function(item,index){
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
    },
}
</script>
<style lang="css" scoped>
* {
    box-sizing: border-box;
}
</style>