<template>
  <!-- 数据权限名称配置 -->
  <div>
    <div class="container-toolbar">
      <el-button icon="el-icon-plus" type="primary" @click="addRow">{{
        $i18ns("新增")
      }}</el-button>
    </div>
    <div class="editTable" v-if="showTable">
      <el-table
        ref="editTable"
        :data="tableData"
        stripe
        border
        style="width: 100%"
        @row-dblclick="editTableRow"
      >
        <el-table-column :label="$i18ns('where关联')">
          <template slot-scope="scope">
            <!-- <el-input v-model="dictData[scope.row.whereExpression]" v-if="scope.row.status"></el-input> -->
            <el-select
              v-model="scope.row.where_expression"
              v-if="scope.row.status"
            >
              <el-option
                v-for="item in dictOptions"
                :key="item.dictId"
                :label="item.dictName"
                :value="item.dictId"
              ></el-option>
            </el-select>
            <span
              v-if="!scope.row.status"
              v-text="dictData[scope.row.where_expression]"
            ></span>
            <el-tooltip
              class="item"
              effect="dark"
              :content="$i18ns(scope.row.expressionMsg)"
              v-if="scope.row.expressionMsg"
              placement="top-end"
            >
              <i
                class="el-icon-warning"
                style="color: red;margin-top: 7px; margin-left: 5px"
              ></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column :label="$i18ns('规则名称')">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.rule_id"
              v-if="scope.row.status"
              filterable
              clearable
            >
              <el-option
                v-for="item in ruleOptions"
                :key="item.rule_id"
                :label="item.rule_name"
                :value="item.rule_id"
              ></el-option>
            </el-select>
            <span
              v-if="!scope.row.status"
              v-text="ruleOptionsData[scope.row.rule_id]"
            ></span>
            <el-tooltip
              class="item"
              effect="dark"
              :content="$i18ns(scope.row.ruleMsg)"
              v-if="scope.row.ruleMsg"
              placement="top-end"
            >
              <i
                class="el-icon-warning"
                style="color: red;margin-top: 7px; margin-left: 5px"
              ></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column :label="$i18ns('操作')" width="120">
          <template slot-scope="scope">
            <el-row>
              <el-button
                type="text"
                @click="deleteRow(scope.$index, tableData)"
                icon="el-icon-delete"
                >{{ $i18ns("删除") }}</el-button
              >
            </el-row>
          </template>
        </el-table-column>
        <!-- 缺省图配置 -->
        <template slot="empty">
          <emptyData></emptyData>
        </template>
      </el-table>
    </div>
    <div class="container-toolbar footer">
      <el-button icon="el-icon-edit" type="primary" @click="saveTableData">{{
        $i18ns("保存")
      }}</el-button>
    </div>
  </div>
</template>

<script>
import Tools from "pte-ui/utils/Tools";
import Schema from "async-validator";
import i18n from "pte-ui/i18ns"; // 国际化
import MyAxios from "pte-ui/utils/MyAxios";
import * as _ from "lodash";

export default {
  data() {
    return {
      cParentParams: this.$dataBus.getCurrentcParams(this) || {}, // 父页面的参数对象
      showTable: true,
      tableData: [],
      dictOptions: [],
      dictData: {}, // andOr数据字典返回的key-value
      ruleOptions: [], //
      ruleOptionsData: {} // 下拉项对象集合
    };
  },
  watch: {
    tableData: {
      handler(newValue, oldValue) {
        let addRowStatus = newValue[newValue.length - 1].addRowStatus;
        if (!addRowStatus) {
          this.validate();
        }
      },
      deep: true
    }
  },
  created() {
    this.getDictList(); //获取数据字典where关联
    this.initRuleOptions();
  },
  mounted() {
    this.initTableData();
  },
  methods: {
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictList() {
      let params = {
        dictType: "CT_WHERE_EXPRESSION",
        dictKey: ["dictOptions"]
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this["dictOptions"] = res.data;
            if (res.data.length !== 0) {
              let obj = {};
              res.data.forEach(element => {
                let { dictId, dictName } = element;
                obj[dictId] = dictName;
              });
              this.dictData = obj;
            }
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    initTableData() {
      this.tableData = [];
      let params = {
        data_perm_id: this.cParentParams.data_perm_id,
        servicecode: "ct3314"
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(response => {
          let data = response.data;
          data.forEach(element => {
            element.status = 0;
            element.expressionMsg = "";
            element.ruleMsg = "";
          });
          data[0].where_expression = "";
          this.tableData = data;
          this.disabledFirstCell();
        })
        .catch(() => {
          //不处理
        });
    },
    disabledFirstCell() {
      // 第一行数据的第一个格子禁用
      if (this.tableData.length !== 0) {
        this.$nextTick(() => {
          let firstCell = document.querySelector(
            ".editTable .el-table__row > td > .cell"
          );
          firstCell.style.display = "none";
          this.tableData[0].where_expression = "and";
        });
      }
    },
    initRuleOptions() {
      let params = {
        rule_type: "",
        rule_name: "",
        servicecode: "ct3310"
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(response => {
          this.ruleOptions = response.data;
          if (response.data.length !== 0) {
            let obj = {};
            response.data.forEach(element => {
              let { rule_id, rule_name } = element;
              obj[rule_id] = rule_name;
            });
            this.ruleOptionsData = obj;
          }
        })
        .catch(() => {
          //不处理
        });
    },
    addRow() {
      if (!this.validate())
        return this.$msg({
          type: "warning",
          message: i18n.t("PTE_validateErrorMessage")
        });
      this.clearEdit();
      let obj = {
        where_expression: "",
        rule_id: "",
        rule_name: "",
        status: 1,
        expressionMsg: "",
        ruleMsg: "",
        addRowStatus: true
      };
      this.tableData.push(obj);
      this.disabledFirstCell();
    },
    editTableRow(row) {
      if (!this.validate())
        return this.$msg({
          type: "warning",
          message: i18n.t("PTE_validateErrorMessage")
        });
      this.clearEdit();
      row.status = 1;
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    clearEdit() {
      //清除所有行的编辑状态
      this.tableData.map(item => {
        if (item.status) {
          item.status = 0;
        }
        return item;
      });
    },
    refreshTable() {
      this.showTable = false;
      this.$nextTick(() => {
        this.showTable = true;
      });
    },
    saveTableData() {
      if (!this.validate())
        return this.$msg({
          type: "warning",
          message: i18n.t("PTE_validateErrorMessage")
        });
      let params = {
        detail: {
          data_perm_id: this.cParentParams.data_perm_id,
          allData: this.tableData
        },
        servicecode: "ct3313"
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(response => {
          this.clearEdit();
          this.initTableData();
          this.refreshTable();
          this.$msg({
            type: "success",
            message: response.message
          });
        })
        .catch(() => {
          //不处理
        });
    },
    validate() {
      let descriptor = {
        where_expression: [
          {
            required: true,
            message: "permission_label_validate_correlation"
          }
        ],
        rule_id: [
          {
            required: true,
            message: "permission_label_validate_rule"
          }
        ]
      };
      let validator = new Schema(descriptor);
      let flag = true;
      this.tableData.forEach((element, index) => {
        element.addRowStatus = false;
        validator.validate(element, (errors, fields) => {
          if (errors) {
            flag = false;
            if (errors.length == 1) {
              if (errors[0].filed === "where_expression") {
                element.expressionMsg = errors[0].message;
                element.ruleMsg = "";
              } else {
                element.expressionMsg = "";
                element.ruleMsg = errors[0].message;
              }
            } else {
              element.expressionMsg = errors[0].message;
              element.ruleMsg = errors[1].message;
            }
          } else {
            element.expressionMsg = "";
            element.ruleMsg = "";
          }
        });
      });
      return flag;
    },
    modifyCallback() {
      this.clearEdit();
      this.initRuleOptions();
      this.refreshTable();
    }
  }
};
</script>

<style lang="less" scoped>
.container-toolbar {
  padding: 0 !important;
  ::v-deep .el-button {
    i {
      margin-right: 5px !important;
    }
  }
}
.editTable {
  margin: 10px 0;
  ::v-deep .cell {
    display: flex;
  }
}
.footer {
  text-align: right;
}
</style>
