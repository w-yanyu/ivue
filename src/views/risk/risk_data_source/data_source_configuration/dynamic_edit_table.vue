<!--
 * @Author: weisiyi weisiyi@sunline.cn
 * @Date: 2024-03-03 21:54:44
 * @LastEditors: weisiyi weisiyi@sunline.cn
 * @LastEditTime: 2024-03-04 16:46:01
 * @FilePath: /ivue/src/views/risk/risk_decision_tables/edit_table.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-button type="primary" size="small" @click="addRow" v-if="btnShow">新增</el-button>
    <el-table
      v-loading="loading"
      stripe
      :data="tableData"
      :header-cell-style="getCellWidth"
      highlight-current-row
      border
      @row-click="handleCurrentChange"
      @selection-change="handleSelectionChange"
      style="margin-left: 0 !important; margin-top:20px !important;"
    >
      <el-table-column
        v-for="column in columns"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :align="column.align"
        :fixed="column.fixed"
      >
        <template slot-scope="scope">
          <el-input
            v-if="column.type == 'string'"
            size="small"
            v-model="scope.row[column.prop]"
            :disabled="true"
          ></el-input>
          <el-select
            v-model="scope.row[column.prop]"
            placeholder="请选择"
            v-else-if="column.type == 'select'"
            @focus="testChange(column.options)"
          >
            <el-option
              v-for="(item, index) in column.options"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input
            v-else
            size="small"
            v-model="scope.row[column.prop]"
            @blur="
              inputChange({
                index: scope.$index,
                clomn: column,
                row: scope.row
              })
            "
            @keyup.enter.native="
              inputChange({
                index: scope.$index,
                clomn: column,
                row: scope.row
              })
            "
          ></el-input>
        </template>
      </el-table-column>
      <!-- 按钮 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="deletes(scope.row, scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import __ from "lodash";
import OptButtons from "pte-ui/editTable/OptButtons";

export default {
  name: "dynamicEditTable",
  components: {
    OptButtons
  },
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
    pageParams: Object, // 页面参数
    btnShow: {
      type: Boolean,
      default: true
    }, // 新增按钮显示隐藏
  },
  data() {
    return {
      // 表格数据 模拟数据
      tableData: [
        { id: 1, name: "Alice", age: 25, sex: "0", area: "1" },
        { id: 2, name: "Bob", age: 30, sex: "1", area: "2" },
        { id: 3, name: "Charlie", age: 22, sex: "0", area: "4" }
      ],
      columns: []
    };
  },
  created() {
    this.getThead();
  },
  watch: {
    tableData: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        this.$emit('tableChange',newVal);
        // this.$bus.emit("tableChange", newVal);
        // this.$dataBus.updataCurrentFormData(this, {allData: newVal})
      }
    }
  },
  methods: {
    /**
     * 获取动态表头
     */
    getThead() {
      let params = {
        servicecode: "deci020402",
        field_map: {}
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.columns = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    inputChange(index, clomn, row) {
      console.log(index, clomn, row, "input change...");
    },
    /**
     * 新增行
     */
    addRow() {
      const circle = this.tableData[0]; //取出数组中第一个对象
      if (circle) {
        const newObj = {};
        for (let key in circle) {
          //把第一个对象的属性都赋值给新对象newObj  然后每个属性的值都设置为空；
          newObj[key] = "";
        }
        this.tableData.splice(this.tableData.length, 0, newObj);
      }
    },
    /**
     * 物理删除行
     */
    deletes(row, index) {
      // console.log(index)
      this.tableData.splice(index, 1);
    },
    testChange(val) {
      console.log("val=========", val);
    }
  }
};
</script>
