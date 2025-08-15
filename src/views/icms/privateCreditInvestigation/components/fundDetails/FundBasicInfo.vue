<template>
    <div class="fund_basic_info_container">
        <!-- <div
            style="width: 100%;
          line-height: 23px;
          text-align: left;
          padding: 10px;
          font-weight: normal;">
            {{ accountTypeDesc }}
        </div> -->
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="area"
                align="center"
                label="参缴地">
            </el-table-column>
            <el-table-column
                prop="register_date"
                align="center"
                label="参缴日期">
            </el-table-column>
            <el-table-column
                prop="first_month"
                align="center"
                label="初缴月份">
            </el-table-column>
            <el-table-column
                prop="to_month"
                align="center"
                label="缴至月份">
            </el-table-column>
            <el-table-column
                prop="state"
                :formatter="formatState"
                align="center"
                label="缴费状态">
            </el-table-column>
            <el-table-column
                prop="pay"
                align="center"
                label="月缴存额">
            </el-table-column>
            <el-table-column
                prop="own_percent"
                align="center"
                label="个人缴存比例">
            </el-table-column>
            <el-table-column
                prop="com_percent"
                align="center"
                label="单位缴存比例">
            </el-table-column>
        </el-table>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="organ_name"
                align="center"
                label="缴费单位">
            </el-table-column>
            <el-table-column
                prop="update_date"
                align="center"
                label="信息更新日期">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
/**
 * 单个账户信息基础内容
 */
export default {
    name: "FundBasicInfo",
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
        // this.accountTypeDesc = '授信协议' + this.index;
    },
    methods: {
        formatState(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.dictionaries['E_C_ACCFUNDSTATE'].forEach(function(item,index){
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