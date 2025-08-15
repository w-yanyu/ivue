<template>
  <div class="guarantee_additional_info_type1_container">
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
      <span style="line-height: 23px; text-align: center; font-weight: bold">
        {{ tip }}
      </span>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="balance" align="center" label="余额">
      </el-table-column>
      <el-table-column prop="class_5state" align="center" :formatter="formatClass5state" label="五级分类">
      </el-table-column>
      <el-table-column
        prop="repay_status"
        align="center"
        label="还款状态"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { formatDate } from "./utils";

/**
 * 单个账户表现信息
 * 只适用于账户状态为呆账
 */
export default {
  name: "GuaranteeAdditionalInfoType1",
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
