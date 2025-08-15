<!--
 * @Author: weisiyi weisiyi@sunline.cn
 * @Date: 2024-03-06 17:21:19
 * @LastEditors: weisiyi weisiyi@sunline.cn
 * @LastEditTime: 2024-03-08 12:50:39
 * @FilePath: /ivue/src/views/risk/test_center/batch_test/testReport/tables/basicTemplate.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="table_container">
    <div class="table_center">
      <div class="table-title">结果分布统计</div>
      <table border="1" class="table_report">
        <tr>
          <td colspan="5">{{ $i18ns("额度") }}</td>
          <td colspan="5">{{ $i18ns("分布比率") }}</td>
        </tr>
        <tr>
          <td colspan="5">10000</td>
          <td colspan="5">30%</td>
        </tr>
        <tr>
          <td colspan="5">5000</td>
          <td colspan="5">70%</td>
        </tr>
      </table>
       <table border="1" class="table_report">
        <tr>
          <td colspan="5">{{ $i18ns("审核结果") }}</td>
          <td colspan="5">{{ $i18ns("分布比率") }}</td>
        </tr>
        <tr>
          <td colspan="5">通过</td>
          <td colspan="5">90%</td>
        </tr>
        <tr>
          <td colspan="5">拒绝</td>
          <td colspan="5">10%</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import accounting from "pte-ui/utils/accounting";

export default {
  name: "resultDistributionTemplate",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object // 父页面自定义参数与内置参数
  },
  data() {
    return {
      loading: false,
      //动表列一级头
      columnFirstOptions: [{ id: "test_result", value: "测试结果" }],
      //动表列二级头
      columnSecondOptions: {
        test_result: [
          { id: "callCnt1", value: "利率" },
          { id: "backResCnt1", value: "额度" },
          { id: "billCnt1", value: "审核结果" }
        ]
      },
      //表格数据
      tableData: [
        {
          field_name: "进件字段1",
          result: {
            test_result: {
              callCnt1: 10,
              backResCnt1: 10,
              billCnt1: 10
            }
          }
        },
        {
          field_name: "进件字段2",
          result: {
            test_result: {
              callCnt1: 10,
              backResCnt1: 10,
              billCnt1: 10
            }
          }
        }
      ]
    };
  },
  filters: {
    formatMoney(value) {
      return accounting.formatMoney(value, "");
    }
  },
  created() {
    console.log("11111111111111");
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.table_container {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  .table_center {
    .print-table {
      box-sizing: border-box;
      /deep/ .el-table {
        margin-left: 0 !important;
        margin-right: 0 !important;
      }
    }
  }
}

.table-title {
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  margin-bottom: 8px;
}

.table_header {
  background: #ecf5ff;
  border-radius: 0;
  border-left: 1px solid #5e6d82;
  border-right: 1px solid #5e6d82;
  font-size: 15px;
  font-family: "Arial Black";
  font-weight: bold;
  text-align: center;
}
.table_report {
  width: 100%;
  height: auto;
  border-collapse: collapse;
}

th {
  width: 10% !important;
  text-align: center;
}

td {
  width: 10%;
  text-align: center;
}
.page-desc {
  height: auto;
  min-height: 100px;
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre-wrap;
}

@media print {
  .el-table {
    .el-table__header {
      width: 100% !important;
    }
    .el-table__body {
      width: 100% !important;
    }
    th {
      display: table-cell !important;
    }
    .cell {
      width: 100% !important;
    }
  }
}
</style>
