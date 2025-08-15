<template>
    <div class="account_additional_info_type3_container">
        <div
            class="flex-column-center"
            style="width: 100%;
          height: 36px;
          border-top: 1px solid #EBEEF5;
          border-left: 1px solid #EBEEF5;
          border-right: 1px solid #EBEEF5;
          margin: 0 12px;
          ">
        <span
            style="line-height: 23px;
            text-align: center;
            font-weight: normal;">
          {{ tip }}
        </span>
        </div>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="account_status"
                :formatter="formatAccountStatus"
                align="center"
                label="账户状态">
            </el-table-column>
            <el-table-column
                prop="state_end_date"
                align="center"
                label="账户关闭日期">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import {formatDate} from "./utils";

/**
 * 单个账户表现信息
 * 只适用于账户状态为结清
 */
export default {
    name: "AccountAdditionalInfoType3",
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
        return {
            tip: ''
        }
    },
    components: {},
    created() {
        this.tip = '截至' + formatDate(3, this.tableData[0].report_date);
    },
    methods: {
        formatAccountStatus(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.dictionaries['E_C_ACCOUNT_STATUS_D1R1R4'].forEach(function(item,index){
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