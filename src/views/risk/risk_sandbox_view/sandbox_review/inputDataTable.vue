<template>
  <div>
    <div class="container-content">
      <div class="container-content--search">
        <el-form
          :model="form"
          ref="form"
          label-width="150px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="字段分组名称" prop="field_group_name">
                <el-input
                  v-model="form.field_group_name"
                  class="input"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="数据源" prop="source_name">
                <el-select v-model="form.source_name">
                  <el-option
                    v-for="(item, index) in dataSourceTypeList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="button-footer">
            <el-col :span="24">
              <el-button type="primary" @click="search()">查询</el-button>
              <el-button @click="reset">{{ $i18ns("重置") }}</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="container-content--toolbar">
        <el-button type="primary" @click="addItem()" plain>新增</el-button>
        <el-button type="primary" @click="addItemByTable()" plain
          >根据决策血缘关系自动生成</el-button
        >
      </div>
      <div class="container-centent--table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          :border="true"
          style="width: 98%;"
        >
          <el-table-column label="业务场景" prop="business_scene" :formatter="formatBusinessData"  align="center" show-overflow-tooltip> </el-table-column>

          <el-table-column
            label="字段分组代码"
            prop="field_group_code"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            label="字段分组名称"
            prop="field_group_name"
            align="center"
            show-overflow-tooltip
          >
          </el-table-column>
          <!-- <el-table-column label="数据源名称" prop="produce_status" :formatter="formatBusinessData"  align="center" show-overflow-tooltip> </el-table-column> -->
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="editItem(scope.row)">{{
                $i18ns("维护")
              }}</el-button>
              <el-button type="text" @click="lookItem(scope.row)">{{
                $i18ns("查看")
              }}</el-button>
              <el-button type="text" @click="deleteItem(scope.row)">{{
                $i18ns("删除")
              }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="container-content--pagination">
        <el-pagination
          v-if="tableData.length > 0"
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="currentPage"
          :page-sizes="[10, 15, 20]"
          :page-size="tableSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableTotal"
        >
        </el-pagination>
      </div>
    </div>

    <el-dialog
      :title="'新增'"
      :visible.sync="addVisible"
      width="70%"
      :before-close="handleClose"
      top="20vh"
      :append-to-body="true"
    >
      <to-json
        :toUrl="
          '/views/risk/risk_sandbox_view/sandbox_review/input_data_table_add.json'
        "
        :params="cParentParams"
        @jsonCallBack="addCallBack"
      ></to-json>
    </el-dialog>
    <!-- 维护 -->
    <el-dialog
      :title="'维护'"
      :visible.sync="editVisible"
      width="70%"
      :before-close="handleClose"
      top="20vh"
      :append-to-body="true"
    >
      <to-json
        :toUrl="
          '/views/risk/risk_sandbox_view/sandbox_review/input_data_table_edit_table.json'
        "
        :params="cParentParams"
        @jsonCallBack="editCallBack"
      ></to-json>
    </el-dialog>

    <!-- 查看 -->
    <el-dialog
      :title="'查看'"
      :visible.sync="viewVisible"
      width="70%"
      :before-close="handleClose"
      top="20vh"
      :append-to-body="true"
    >
      <to-json
        :toUrl="
          '/views/risk/risk_sandbox_view/sandbox_review/input_data_table_edit_table.json'
        "
        :params="cParentParams"
        @jsonCallBack="lookCallBack"
      ></to-json>
    </el-dialog>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import _ from "lodash";

export default {
  name: "inputDataTable",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object // 父页面自定义参数与内置参数
  },
  data() {
    return {
      tableData: [], //表格数据
      isShowPage: false,
      form: {
        source_name: "",
        field_group_name: ""
      },
      currentPage: 1,
      tableTotal: 10,
      tableSize: 10,
      dataSourceTypeList: [],
      addVisible: false,
      editVisible: false,
      viewVisible: false,
      businessDict:[]
    };
  },
  created() {
    this.getDictList("DECI_E_DATA_SOURCE_NAME", "dataSourceTypeList"); // 数据源下拉列表
    this.getDictList("DECI_E_BUSINESS_SCENE", "businessDict"); // 业务场景下拉列表
    this.getTableData() ;
  },
  watch: {
    cParentParams: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if(newVal) {
          this.cParentParams = newVal;
          console.log("this.cParentParams========", this.cParentParams);
        }
      }
    }
  },
  methods: {
    /**
     * 获取字典
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    getSecondBranch() {
      let reqMap = {
        servicecode: "deci050092",
        sandbox_id:this.cParentParams.sandbox_id
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap)
        .then(res => {
          if (res && res.code === "200") {
            debugger;
            this.dataSourceTypeList = res.data;
            if (this.dataSourceTypeList.length == 1) {
              this.form.field_group_name = this.dataSourceTypeList[0].field_group_name;
              this.form.source_name = this.dataSourceTypeList[0].source_name;
              this.form.result_list_code = this.dataSourceTypeList[0].field_group_code;
            }
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 表格字典值转换
     */
    formatBusinessData(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.businessDict.forEach(function(item, index) {
        if (data == item.dictId) {
          name = item.dictName;
        }
      });
      return name;
    },

    /**
     * 分页sizeChange 回调
     */
    sizeChange(val) {
      this.tableSize = val;
      this.getTableData();
    },
    /**
     * 分页currentChange回调
     */
    currentChange(val) {
      this.currentPage = val;
      this.getTableData();
    },
    reset() {
      this.$refs.form.resetFields();
    },
    search() {
      this.currentPage = 1;
      this.getTableData();
    },
    /**
     * 获取列表数据
     */
    getTableData() {
      let reqMap = {
        servicecode: "deci050092",
        sandbox_id:this.cParentParams.sandbox_id,
        field_group_code: this.form.field_group_code,
        field_group_name: this.form.field_group_name,
        source_name: this.form.source_name,
        start: this.currentPage,
        length: this.tableSize
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap)
        .then(res => {
          if (res && res.code === "200") {
            this.tableData = res.data;
            this.tableTotal = res.pageParam ? res.pageParam.total : 0;
          }
          console.log("this.tableData========", this.tableData);

        })
        .catch(err => {
          console.error(err);
        });
    },
    reGenerateFile(row) {
      this.$confirm("是否确认删除当前数据?", "提示", {
        cancelButtonText: "取消",
        confirmButtonText: "确定",
        type: "warning"
      }).then(() => {
        let reqMap = {
          servicecode: ""
        };
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap)
          .then(res => {
            if (res && res.code === "200") {
              this.search();
              this.$message({ type: "success", message: res.message });
            }
          })
          .catch(err => {
            console.error(err);
          });
      });
    },
    downloadFile(row) {
      let reqMap = {
        applid: row.trust_applid,
        oa_org_id: row.oa_org_id,
        servicecode: "RLMSPLTS1063"
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(
        res => {
          let URL = this.dataUrlToBlob(res.data.downloadUrl);
          var reader = new FileReader();
          reader.readAsDataURL(URL);
          reader.onload = function(e) {
            const a = document.createElement("a");
            a.download = row.oa_org_name + "委案明细表.xlsx";
            a.href = e.target.result;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          };
        }
      );
    },
    dataUrlToBlob(data) {
      var bstr = atob(data);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: "xlsx" });
    },

    /**
     * 新增
     */
    addItem() {
      this.addVisible = true;
      this.cParentParams.pageType = "add";
    },
    /**
     * 维护
     */
    editItem(row) {
      // this.editVisible = true;
      // this.cParentParams.pageType = "edit";
      // this.cParentParams.pageType = "edit";
      this.editRow = row;
      this.editRow.pageType = "edit";
      console.log("this.editRow=======", this.editRow);
      this.editVisible = true;
    },
    /**
     * 查看
     */
    lookItem(row) {
      this.viewVisible = true;
      this.cParentParams.pageType = "look";
    },
    addCallBack(data) {
      let that = this;
      console.log(data, "新增页面传来的数据");
      that.addVisible = false;
    },
    editCallBack(data) {
      let that = this;
      console.log(data, "维护页面传来的数据");
      that.editVisible = false;
    },
    lookCallBack(data) {
      let that = this;
      console.log(data, "查看页面传来的数据");
      that.viewVisible = false;
    },
    /**
     * 删除
     */
    deleteItem() {

    }
  }
};
</script>

<style lang="less" scoped>
.container-content {
  .container-content--search {
    padding: 16px 40px 0 12px;
    border-bottom: 1px solid #e3e8f5;
  }
  .container-content--toolbar {
    padding: 10px;
  }
  .container-content--pagination {
    float: right;
    padding: 10px;
  }
  .container-centent--table {
    margin-top: 10px;
  }
}
.container-footer {
  width: 50px;
  margin: 0 auto;
  padding: 10px;
}
.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}
</style>
