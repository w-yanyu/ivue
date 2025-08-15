<template>
    <div class="collAccount_special_repayment_history_container">
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="special_deal_type"
                :formatter="formatSpecialDealType"
                align="center"
                label="特殊交易类型">
            </el-table-column>
            <el-table-column
                prop="trans_time"
                align="center"
                label="发生日期">
            </el-table-column>
            <el-table-column
                prop="change_months"
                align="center"
                label="变更月数">
            </el-table-column>
            <el-table-column
                prop="change_amount"
                align="center"
                label="发生金额">
            </el-table-column>
            <el-table-column
                prop="content"
                align="center"
                label="明细记录">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
/**
 * 单个账户特殊交易记录列表
 */
export default {
    name: "CollAccountSpecialRepaymentHistory",
    props: {
        tableData: {
            type: Array,
            default() {
                return []
            }
        },
        dictionaries: {
            type: Object,
            default() {
                return {};
            }
        },
    },
    data() {
        return {}
    },
    components: {},
    created() {

    },
    methods: {
        formatSpecialDealType(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.dictionaries['E_C_SPECIALTRADETYPE'].forEach(function(item,index){
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

.flex-column-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
</style>