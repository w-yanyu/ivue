<!--
 * @Author: weisiyi weisiyi@sunline.cn
 * @Date: 2024-03-06 17:21:19
 * @LastEditors: weisiyi weisiyi@sunline.cn
 * @LastEditTime: 2024-03-07 11:31:32
 * @FilePath: /ivue/src/views/risk/test_center/batch_test/testReport/tables/basicTemplate.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="table_container">
    <div class="table_center">
      <div class="table-title">{{ $i18ns("基本信息") }}</div>
      <table border="1" class="table_report">
        <tr>
          <td>{{ $i18ns("任务代码") }}</td>
          <td colspan="3">111</td>
          <td>{{ $i18ns("任务名称") }}</td>
          <td colspan="2">111</td>
        </tr>
        <tr>
          <td>
            {{ $i18ns("任务描述") }}
          </td>
          <td colspan="9">111</td>
        </tr>
        <tr>
          <td>{{ $i18ns("报告模板") }}</td>
          <td colspan="3">111</td>
          <td>{{ $i18ns("版本") }}</td>
          <td colspan="2">111</td>
        </tr>
        <tr>
          <td>{{ $i18ns("决策名称") }}</td>
          <td colspan="3">111</td>
          <td>{{ $i18ns("沙箱名称") }}</td>
          <td colspan="2">111</td>
        </tr>
        <tr>
          <td>{{ $i18ns("验证进度") }}</td>
          <td colspan="3">111</td>
          <td>{{ $i18ns("创建人") }}</td>
          <td colspan="2">111</td>
        </tr>
        <tr>
          <td>{{ $i18ns("创建时间") }}</td>
          <td colspan="3">111</td>
          <td>{{ $i18ns("最近更新人") }}</td>
          <td colspan="2">111</td>
        </tr>
        <tr>
          <td>{{ $i18ns("最近更新时间") }}</td>
          <td colspan="3">111</td>
          <td></td>
          <td colspan="2"></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import accounting from "pte-ui/utils/accounting";

export default {
  name: "BasicTemplate",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object // 父页面自定义参数与内置参数
  },
  data(){
    return {

    }
  },
  filters: {
    formatMoney(value) {
      return accounting.formatMoney(value, "");
    }
  },
  created() {
    console.log("11111111111111")
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
}

// .table_center {
//   position: relative;
//   left: 0;
//   top: 10%;
//   bottom: auto;
//   right: 0;
//   margin: auto;
//   text-align: center;
//   width: 60%;
//   height: auto;
// }
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
</style>
