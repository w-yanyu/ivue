<template>
  <div class="account_additional_info_type1_container">
    <div
      class="flex-column-center"
      style="
        width: 100%;
        height: 36px;
        border-top: 1px solid #ebeef5;
        border-left: 1px solid #ebeef5;
        border-right: 1px solid #ebeef5;
        margin: 0 12px;
      "
    >
      <span style="line-height: 23px; text-align: center; font-weight: normal">
        {{ tip }}
      </span>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="account_status" align="center" :formatter="formatAccountStatus" label="账户状态">
      </el-table-column>
      <el-table-column prop="class_5state" align="center" :formatter="formatClass5state" label="五级分类">
      </el-table-column>
      <el-table-column prop="balance" align="center" label="余额">
      </el-table-column>
      <el-table-column prop="remain_payment_cyc" align="center" label="剩余还款期数">
      </el-table-column>
      <el-table-column prop="scheduled_payment_amount" align="center" label="本月应还款">
      </el-table-column>
      <el-table-column prop="scheduled_payment_date" align="center" label="应还款日">
      </el-table-column>
      <el-table-column prop="actual_payment_amount" align="center" label="本月实还款">
      </el-table-column>
      <el-table-column
        prop="recent_pay_date"
        align="center"
        label="最近一次还款日期"
      >
      </el-table-column>
    </el-table>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="currover_due_cyc" align="center" label="当前逾期期数">
      </el-table-column>
      <el-table-column
        prop="currover_due_amount"
        align="center"
        label="当前逾期总额"
      >
      </el-table-column>
      <el-table-column
        prop="overdue_31to60_amount"
        align="center"
        label="逾期31—60天未还本金"
      >
      </el-table-column>
      <el-table-column
        prop="overdue_61to90_amount"
        align="center"
        label="途期61-90天未还本金"
      >
      </el-table-column>
      <el-table-column
        prop="overdue_91to180_amount"
        align="center"
        label="逾期91-180天未还本金"
      >
      </el-table-column>
      <el-table-column
        prop="overdue_over180_amount"
        align="center"
        label="逾期180天以上未还本金"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { formatDate } from "./utils";

/**
 * 单个账户表现信息
 * 只适用于账户状态为逾期、正常、司法追偿
 * TODO 上下两层UI存在中间纵轴对不齐问题，Table组件样式处理问题。后期调整。
 * TODO 部分字段缺失
 */
export default {
  name: "AccountAdditionalInfoType2",
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
    dictionaries: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      tip: "",
    };
  },
  components: {},
  created() {
    this.tip = "截至" + formatDate(3, this.tableData[0].report_date);
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
    formatClass5state(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.dictionaries['E_C_CLASS5STATE'].forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
  },
};
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
