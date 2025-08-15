<template>
    <div class="account_basic_info_container">
        <div style="width: 100%;
          line-height: 23px;
          text-align: left;
          padding: 10px;
          font-weight: normal;">
            {{ accountTypeDesc }}
        </div>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="finance_org_code" align="center" label="发卡机构">
            </el-table-column>
            <el-table-column prop="account_label" align="center" label="账户标识">
            </el-table-column>
            <el-table-column prop="open_date" align="center" label="开立日期">
            </el-table-column>
            <el-table-column prop="credit_amount" align="center" label="账户授信额度">
            </el-table-column>
            <el-table-column prop="shared_amount" align="center" label="共享授信额度">
            </el-table-column>
            <el-table-column prop="ccy_code" align="center" :formatter="formatCcyCode" label="币种">
            </el-table-column>
            <el-table-column prop="type" align="center" :formatter="formatType" label="业务种类">
            </el-table-column>
            <el-table-column prop="guarantee_type" align="center" :formatter="formatGuaranteeType" label="担保方式">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
/**
 * 单个账户信息基础内容-模版2
 */
export default {
    name: "AccountBasicInfo2",
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
    }
}
</script>
<style lang="css" scoped>
* {
    box-sizing: border-box;
}
</style>
