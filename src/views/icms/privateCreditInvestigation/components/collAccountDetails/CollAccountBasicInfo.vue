<template>
    <div class="collAccount_basic_info_container">
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
                prop="type"
                :formatter="formatType"
                align="center"
                label="业务种类">
            </el-table-column>
            <el-table-column
                prop="open_date"
                align="center"
                label="债权接收日期">
            </el-table-column>
            <el-table-column
                prop="credit_limit_amount"
                align="center"
                label="债权金额">
            </el-table-column>
            <el-table-column
                prop="transfer_repay_status"
                align="center"
                label="债权转移时的还款状态">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
/**
 * 单个账户信息基础内容
 */
export default {
    name: "CollAccountBasicInfo",
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