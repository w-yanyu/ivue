<!--
 * @Author: weisiyi weisiyi@sunline.cn
 * @Date: 2024-03-03 21:54:44
 * @LastEditors: weisiyi weisiyi@sunline.cn
 * @LastEditTime: 2024-03-05 18:32:49
 * @FilePath: /ivue/src/views/risk/risk_decision_tables/edit_table.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-button v-if="showButton" type="primary" size="small" @click="addRow">新增</el-button>
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
          <el-button v-if="showButton"
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
    pageParams: Object // 页面参数
  },
  data() {
    return {
      // 表格数据 模拟数据
      tableData: [],
      columns: [],
      showButton: this.cParentParams.showButton,
      lookView: this.cParentParams.lookView
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
        console.log(
          "this.$dataBus.updataCurrentFormData",
          this.cParentScope.parentFormModel
        );
        this.cParentScope.parentFormModel.allData = newVal;
        // this.$dataBus.updataCurrentFormData(this, {allData: newVal})
      }
    }
  },
  methods: {
    /**
     * 获取动态表头
     */
    getThead() {
      console.log(
          "this.cParentParams+——+——+——+——+——+",
          this.cParentParams
        );
        var scode;
        if(this.lookView=="tmp"){
          scode = "deci020406";
        }else if(this.lookView=="main"){
          scode = "deci020452";
        }else if(this.lookView=="his"){
          scode = "deci020413";
        }
      let params = {
        servicecode:scode,
        // deci_tables_code: "tables_code_test"
        deci_tables_code: this.cParentParams.deci_tables_code,
        busi_version:this.cParentParams.busi_version
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.columns = res.data.theadData;
            this.tableData = res.data.allData;
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
