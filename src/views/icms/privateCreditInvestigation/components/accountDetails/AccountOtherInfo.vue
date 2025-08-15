<template>
    <div class="account_other_info_container">
        <!-- <div
            style="width: 100%;
          line-height: 23px;
          text-align: left;
          padding: 10px;
          font-weight: normal;">
            {{ accountTypeDesc }}
        </div> -->
        <el-table class="tableMargin" :data="xxx"  v-if="isOtherInfoShow" style="width:100%;" border>
          <el-table-column prop="name" align="center">
              <el-table-column label="异议标注" prop="xxx" align="center"></el-table-column>
              <el-table-column label="添加日期" prop="xxx" align="center"></el-table-column>
          </el-table-column>
        </el-table>
        <el-table class="tableMargin" :data="xxx"   v-if="isOtherInfoShow" style="width:100%;" border>
              <el-table-column label="特殊标注" prop="xxx" align="center"></el-table-column>
              <el-table-column label="添加日期" prop="xxx" align="center"></el-table-column>
        </el-table>
    </div>
</template>
<script>
/**
 * 单个账户信息基础内容
 */
export default {
    name: "AccountOtherInfo",
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
            // accountTypeDesc: ''
        }
    },
    components: {},
    created() {
        // this.accountTypeDesc = '账户' + this.index;
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