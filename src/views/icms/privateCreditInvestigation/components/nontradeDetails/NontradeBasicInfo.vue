<template>
    <div class="nontrade_basic_info_container">
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
                prop="org_name"
                align="center"
                label="机构名称">
            </el-table-column>
            <el-table-column
                prop="busi_type"
                :formatter="formatBusiType"
                align="center"
                label="业务类型">
            </el-table-column>
            <el-table-column
                prop="start_date"
                align="center"
                label="业务开通日期">
            </el-table-column>
            <el-table-column
                prop="pay_state"
                align="center"
                :formatter="formatPayState"
                label="当前缴费状态">
            </el-table-column>
            <el-table-column
                prop="arrear_amount"
                align="center"
                label="当前欠费金额">
            </el-table-column>
            <el-table-column
                prop="bill_date"
                align="center"
                label="记账年月">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
/**
 * 单个账户信息基础内容
 */
export default {
    name: "NontradeBasicInfo",
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
        this.accountTypeDesc = '账户';
    },
    methods: {
        formatBusiType(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.dictionaries['E_C_POSTPAYBUSINESSTYPE'].forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
        },
        formatPayState(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.dictionaries['E_C_PAYSTATE'].forEach(function(item,index){
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