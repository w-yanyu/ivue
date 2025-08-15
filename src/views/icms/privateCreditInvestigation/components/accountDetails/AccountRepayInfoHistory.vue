<template>
  <div class="account_current_repayment_history_container">
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
      <el-table-column prop="install_ment_credit_amount" align="center" label="大额专项分期额度">
      </el-table-column>
      <el-table-column prop="effective_date" align="center" label="分期额度生效日期">
      </el-table-column>
      <el-table-column
        prop="due_date"
        align="center"
        label="分期额度到期日期"
      >
      </el-table-column>
      <el-table-column
        prop="used_install_ment_amount"
        align="center"
        label="已用分期金额"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { formatDate } from "./utils";

/**
 * 单个账户大额专项分期信息
 * TODO 部分字段缺失
 */
export default {
  name: "AccountRepayInfoHistory",
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
    this.tip =
    "大额专项分期信息";
  },
  methods: {},
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
