<template>
    <div class="flex-row-align-start container">
        <el-table 
          :show-summary="true" 
          :summary-method="getSummaries"
          :span-method="arraySpanMethodContainer"
          :data="tableData"  
          :row-style="{ height: '60px'}"
          style="margin: 0px 0px !important;" 
          border>
            <el-table-column label="业务类型" align="center" class-name="height_style">
                <template slot-scope="{row}">
                    <el-row type="flex" justify="start">
                    <el-col :span="24">
                        <el-table
                            style="margin: 0px 0px !important;"
                            :data="leftData"
                            :show-header="false"
                            :row-style="{ height: '60px'}"
                            :span-method="arraySpanMethodLeftData">
                            <el-table-column label="" prop="column_1" align="center"></el-table-column>
                            <el-table-column label="" prop="column_2" align="center"></el-table-column>
                        </el-table>
                    </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column label="账户数" prop="count" align="center"></el-table-column>
            <el-table-column label="首笔业务发放月份" prop="month" align="center"></el-table-column>
        </el-table>
    </div>
</template>
<script>
/**
 * 征信合同表单-1
 * 信贷交易信息提示表格
 * TODO column高度固定，否则出现左右表格线条错位问题。
 */
export default {
    name: "AuthorizationTable1",
    props: {
        tableData: {
           type: Array,
           default: []
        }
    },
    data() {
        return{
            leftData: [
                { column_1: '贷款', column_2: '个人住房贷款' },
                { column_1: '贷款', column_2: '个人商用房贷款（包括商住两用）' },
                { column_1: '贷款', column_2: '其他类贷款' },
                { column_1: '信用卡', column_2: '贷记卡' },
                { column_1: '信用卡', column_2: '准贷记卡' },
                { column_1: '其他', column_2: '--' },
            ]
        }
    },
    components: {

    },
    created(){
    },
    methods:{
        /**
         * el-table 组件合计方法
         */
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index == 0) {
                  sums[index] = '合计';
                  return;
                }
                
                if(index == 2){
                    sums[index] = '--';
                     return;
                }
                const values = data.map(item => Number(item[column.property]));
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                        const value = Number(curr);
                        if (!isNaN(value)) {
                            return prev +　curr;
                        } else {
                            return prev;
                        }
                    }, 0)
                        sums[index] += '';
                    } else {
                        sums[index] = '--';
                    }
                });
            return sums;
        },
        arraySpanMethodContainer({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                if (rowIndex == 0) {
                    return [6, 1]
                } else {
                    return [0, 0]
                }
            } else {
                return [1, 1]
            }
        },
        arraySpanMethodLeftData({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                if (rowIndex === 0) {
                    return [3, 1]
                } else if (rowIndex === 3) {
                    return [2, 1]
                } else if (rowIndex === 5) {
                    return [1, 1]
                } else {
                    return [0, 0]
                }
            } else {
                return [1, 1]
            }
        },
    }
}
</script>
<style lang="less" scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
.container {
    
}
.flex-row-align-start {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
}
.flex-column-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
/deep/ .el-table .cell {
  padding: 0 !important;
}
</style>