<template>
  <div class="box">
    <!-- 测试结果明细 -->
    <div class="content-box" style="max-width: 80%;">
      <!-- <el-table :data="testTableData" style="width: 100%">
        <el-table-column prop="field_name" label="进件字段" width="150">
        </el-table-column>
        <el-table-column label="测试结果">
          <el-table-column
            v-for="(item, index) in testHeadData"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            width="120"
          >
          </el-table-column>
        </el-table-column>
      </el-table> -->

      <el-table
        v-loading="loading"
        :data="tableData"
        highlight-current-row
        size="small"
        style="width: 100%;"
      >
        <el-table-column
          :label="$t('table.id')"
          type="index"
          min-width="5%"
          align="center"
          v-if="false"
        />
        <el-table-column prop="field_name" label="进件字段" align="center" />

        <el-table-column
          v-for="item in columnFirstOptions"
          :label="item.value"
          :key="item.id"
          :property="item.id"
          align="center"
          width="65"
        >
          <el-table-column
            min-width="10%"
            v-for="ccitem in columnSecondOptions[item.id]"
            :label="ccitem.value"
            :key="ccitem.id"
            :property="ccitem.id"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{
                scope.row["result"][item.id][scope.column.property]
              }}</span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import debounce from "lodash/debounce";
import i18n from "pte-ui/i18ns"; // 国际化
import MyAxios from "pte-ui/utils/MyAxios";
import Tools from "pte-ui/utils/Tools";

export default {
  name: "reportConfig",
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
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  position: relative;
  .content-box {
    box-sizing: border-box;
    max-width: 99%;
  }
}
</style>
