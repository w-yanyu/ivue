<template>
  <div class="account_repayment_history_container">
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
    <el-table
      :data="tableDataView"
      border
      :span-method="yearSpanMethod"
      style="width: 100%;"
    >
      <el-table-column prop="year" align="center" label=""> </el-table-column>
      <el-table-column prop="month_01" align="center" label="1">
      </el-table-column>
      <el-table-column prop="month_02" align="center" label="2">
      </el-table-column>
      <el-table-column prop="month_03" align="center" label="3">
      </el-table-column>
      <el-table-column prop="month_04" align="center" label="4">
      </el-table-column>
      <el-table-column prop="month_05" align="center" label="5">
      </el-table-column>
      <el-table-column prop="month_06" align="center" label="6">
      </el-table-column>
      <el-table-column prop="month_07" align="center" label="7">
      </el-table-column>
      <el-table-column prop="month_08" align="center" label="8">
      </el-table-column>
      <el-table-column prop="month_09" align="center" label="9">
      </el-table-column>
      <el-table-column prop="month_10" align="center" label="10">
      </el-table-column>
      <el-table-column prop="month_11" align="center" label="11">
      </el-table-column>
      <el-table-column prop="month_12" align="center" label="12">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
/**
 * 单个账户还款记录列表
 */
export default {
  name: "AccountRepaymentHistory",
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
      tableDataView: [],
    };
  },
  components: {},
  created() {
    this.initData(this.tableData);
  },
  methods: {
    yearSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
          return [2, 1];
        } else {
          return [0, 0];
        }
      } else {
        return [1, 1];
      }
    },
    /**
     * 处理数据源，默认data是个列表，而且其中的元素按年，月参数已经进行了排序。
     * @param data
     */
    initData(data) {
      let yearTemplate = [
        {
          year: "",
          month_01: "#",
          month_02: "#",
          month_03: "#",
          month_04: "#",
          month_05: "#",
          month_06: "#",
          month_07: "#",
          month_08: "#",
          month_09: "#",
          month_10: "#",
          month_11: "#",
          month_12: "#",
        },
        {
          year: "",
          month_01: "--",
          month_02: "--",
          month_03: "--",
          month_04: "--",
          month_05: "--",
          month_06: "--",
          month_07: "--",
          month_08: "--",
          month_09: "--",
          month_10: "--",
          month_11: "--",
          month_12: "--",
        },
      ];

      const yearSet = new Set([]);
      let tableDataView = [];
      let tempYearTemplate = [];
      const tipSource = [
        { year: "", month: "" },
        { year: "", month: "" },
      ];
      for (let i = 0; i < data.length; i++) {
        if (i == 0) {
          tipSource[0].year = data[i].repay_year;
          tipSource[0].month = data[i].repay_month;
        }

        if (!yearSet.has(data[i].repay_year)) {
          yearSet.add(data[i].repay_year);
          // 保存旧数据
          tableDataView = tableDataView.concat(tempYearTemplate);

          tempYearTemplate = JSON.parse(JSON.stringify(yearTemplate));
          tempYearTemplate[0].year = data[i].repay_year;
          tempYearTemplate[1].year = data[i].repay_year;

          tempYearTemplate[0][`month_${data[i].repay_month}`] =
            data[i].repay_state;
          tempYearTemplate[1][`month_${data[i].repay_month}`] =
            data[i].overdue_amount;
        } else {
          tempYearTemplate[0][`month_${data[i].repay_month}`] =
            data[i].repay_state;
          tempYearTemplate[1][`month_${data[i].repay_month}`] =
            data[i].overdue_amount;
        }

        if (i === data.length - 1) {
          tipSource[1].year = data[i].repay_year;
          tipSource[1].month = data[i].repay_month;

          // 保存旧数据
          tableDataView = tableDataView.concat(tempYearTemplate);
        }
      }
      this.tableDataView = tableDataView;
      // this.tip = `${tipSource[0].year}年${tipSource[0].month}月-${tipSource[1].year}年${tipSource[1].month}月的还款记录`;
      this.tip = `${tipSource[1].year}年${tipSource[1].month}月-${tipSource[0].year}年${tipSource[0].month}月的还款记录`;
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
