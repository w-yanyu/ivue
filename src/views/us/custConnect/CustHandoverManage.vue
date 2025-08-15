<template>
    <div class="container-content">
      <div class="container-content--search">
        <el-form
          :model="selectForm"
          :rules="selectFormRules"
          ref="selectForm"
          label-width="150px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户编号" prop="cust_no">
                <el-input v-model="selectForm.cust_no" class="input" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户名称" prop="cust_name">
                <el-input
                  v-model="selectForm.cust_name"
                  class="input"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件类型" prop="cert_type">
                <el-select v-model="selectForm.cert_type" class="input" clearable>
                  <el-option
                    v-for="(item, index) in cert_typeList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证件号码" prop="cert_no">
                <el-input v-model="selectForm.cert_no" class="input" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否有效" prop="valid_state">
                <el-select v-model="selectForm.valid_state" class="input" clearable>
                  <el-option
                    v-for="(item, index) in valid_stateList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="button-footer">
              <el-button
                type="primary"
                @click="searchTeller"
                icon="el-icon-search"
                >查询</el-button
              >
              <el-button @click="reset">{{$i18ns('重置')}}</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="el-button--small">
        <el-button type="primary" @click="selectClick">{{$i18ns('选择')}}</el-button>
      </div>
      <div class="container-centent--table">
        <el-table
          ref="multipleTable"
          :data="tableData"
          :border="true"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column
            type="index"
            label="序号"
            align="center"
          ></el-table-column>
          <el-table-column
            label="客户编号"
            prop="cust_no"
            align="center"
          ></el-table-column>
          <el-table-column
            label="客户名称"
            prop="cust_name"
            align="center"
          ></el-table-column>
          <el-table-column
            label="证件类型"
            prop="cert_type"
            align="center"
            :formatter="formatCertTypeDatas"
          ></el-table-column>
          <el-table-column
            label="证件号码"
            prop="cert_no"
            align="center"
          ></el-table-column>
          <el-table-column
            label="是否有效"
            prop="valid_state"
            align="center"
            :formatter="formatValidStateDatas"
          ></el-table-column>
        </el-table>
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
</template>


<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "CustHandoverManage",
  data() {
    return {
      tableData: [], //表格数据
      selectForm: {
        cust_no: "", //客户编号
        cust_name: "", //客户名称
        cert_type: "", //证件类型
        cert_no: "", //证件号码
        valid_state: "", //是否有效
      },
      currentPage: 1,
      tableTotal: null,
      tableSize: 10,
      cert_typeList: [], //证件类型列表
      valid_stateList: [], //是否有效列表
      tempselectForm: [], //查询
      selectionList: [], //选择信息
    };
  },
  created() {
    this.getDictList("MS_E_CRET_TYPE", "cert_typeList"); //证件类型列表
    this.getDictList("MS_E_YESORNO", "valid_stateList"); //是否有效列表
    this.getTableData();
  },
  methods: {
    /**
     * 获取字典
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType],
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     *证件类型数据字典转换
     */
    formatCertTypeDatas(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.cert_typeList.forEach(function (item, index) {
        if (data == item.dictId) {
          name = item.dictName;
        }
      });
      return name;
    },
    /**
     * 是否有效数据字典转换
     */
    formatValidStateDatas(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.valid_stateList.forEach(function (item, index) {
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
    /**
     * 查询
     */
    searchTeller() {
      this.$refs.selectForm.validate((valid) => {
        if (valid) {
          this.tempselectForm = _.cloneDeep(this.selectForm);
          this.currentPage = 1;
          this.getTableData();
        } else {
          this.$message({
            type: "warning",
            message: "校验不通过",
          });
        }
      });
    },
    reset() {
      this.$refs.selectForm.resetFields();
      this.selectForm.work_begin_time = [];
      this.selectForm.work_end_time = [];
      this.starts_date = "";
      this.ends_date = "";
      this.start_date = "";
      this.end_date = "";
      this.getTableData();
    },
    /**
     * 获取列表数据
     */
    getTableData() {
      let reqMap = {
        cust_no: this.selectForm.cust_no, //客户编号
        cust_name: this.selectForm.cust_name, //客户名称
        cert_type: this.selectForm.cert_type, //证件类型
        cert_no: this.selectForm.cert_no, //证件号码
        valid_state: this.selectForm.valid_state, //是否有效
        servicecode: "us0203",
        start: this.currentPage,
        length: this.tableSize,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap)
        .then((res) => {
          if (res && res.code === "200") {
            this.tableData = res.data;
            this.tableTotal = res.pageParam ? res.pageParam.total : 0;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleSelectionChange(val) {
      this.selectionList = val;
    },
    /**
     * 选择数据
     */
    selectClick() {

       this.$emit("cancle-visable",false,this.selectionList);
    },
  },
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
    margin-top: 0px;
  }
}
.container-footer {
  width: 50px;
  margin: 0 auto;
  padding: 10px;
}
.button-footer {
  text-align: right !important;
  padding: 0 0 10px 0;
}
.el-button.is-disabled {
  color: #c0c4cc !important;
}
</style>



