<template>
  <div class="page_content">
    <div class="container-content--search">
      <el-form
        :model="form"
        ref="form"
        label-width="150px"
        class="custom-common--form"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="常量代码" prop="const_code">
              <el-input v-model="form.const_code" class="input"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="常量名称" prop="const_name">
              <el-input v-model="form.const_name" class="input"></el-input>
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
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100% "
      max-height="150"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        prop="const_code"
        :label="$i18ns('常量代码')"
        width="120"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="const_name"
        :label="$i18ns('常量名称')"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="data_type"
        :label="$i18ns('数据类型')"
        align="center"
      >
      <template slot-scope="scope">{{ formatDictData(scope.row.data_type, dataTypeList) }}</template>
      </el-table-column>
      <el-table-column
        prop="value_type"
        :label="$i18ns('值类型')"
        align="center"
      >
        <template slot-scope="scope">{{ formatDictData(scope.row.value_type, valueTypeList) }}</template>
      </el-table-column>
      <el-table-column
        prop="const_value"
        :label="$i18ns('常量值')"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="data_update_time"
        :label="$i18ns('最新维护时间')"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="description"
        :label="$i18ns('备注')"
        align="center"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        :label="$i18ns('操作')"
        width="100"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            @click="editItem(scope.row.const_code)"
            type="text"
            size="small"
            >{{ $i18ns("选择") }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import MyMessage from "pte-ui/utils/MyMessage";
import i18n from "pte-ui/i18ns"; // 国际化
import { formatDictData } from "@/util/commondeal.js";
import dataType from "@/views/risk/dictdata/dataType.json";
import valueType from "@/views/risk/dictdata/valueType.json";

export default {
  dataType,
  valueType,
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对象
    type: Object
  },
  components: {},
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      dataTypeList: [],
      valueTypeList: [],
      form: {
        const_code: "",
        const_name: ""
      },
    };
  },
  created() {
    this.dataTypeList = dataType.data;
    this.valueTypeList = valueType.data;
  },
  mounted() {
    let that = this;
    that.initData();
  },
  methods: {
    formatDictData,
    initData() {
      let that = this;
      let request_map = {};
      console.info("父页面参数" + that.cParentParams);
      let request_url = "/SUMP/call/RPCCall";
      request_map["servicecode"] = "deci010201";
      // request_map["const_code"] = that.form.const_code;
      // request_map["const_name"] = that.form.const_name;
      this.$http.invokeAPI(request_url, "post", request_map).then(response => {
        if (response.code === "200") {
          that.tableData = response.data;
        } else {
          MyMessage({
            message: response.message,
            type: "error"
          });
        }
      });
    },
    search() {
      this.initData();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //编辑项目
    editItem(item) {
      let that = this;
      this.$emit("closeDialog", item);
    }
  }
};
</script>
<style lang="css" scoped>

</style>
