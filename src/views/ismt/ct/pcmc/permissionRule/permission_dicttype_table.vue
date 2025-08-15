<template>
  <div class="container">
    <!-- 查询表格 -->
    <div class="left-content">
      <el-form ref="searchTable" :model="searchTable" size="small" :inline="true">
        <el-form-item :label="$i18ns('字典类型')">
          <el-input v-model="searchTable.dict_type" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$i18ns('字典名称')">
          <el-input v-model="searchTable.dict_name" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" size="small">{{$i18ns('查询')}}</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="ruleTableData" height="320" border style="width: 100%">
        <el-table-column prop="dict_type" :label="$i18ns('字典类型')"></el-table-column>
        <el-table-column prop="dict_name" :label="$i18ns('字典名称')"></el-table-column>
        <el-table-column prop="ms_appid" :label="$i18ns('业务模块')"></el-table-column>
        <el-table-column prop="value_type" :label="$i18ns('值类型')" :formatter="formatTypeData"></el-table-column>
        <el-table-column prop="interest_rate_desc" :label="$i18ns('说明')"></el-table-column>
        <el-table-column :label="$i18ns('操作')" width="100">
          <template slot-scope="scope">
            <el-button
              @click="bringback(scope.row)"
              type="text"
              size="small"
            >{{$i18ns('选择')}}</el-button>
          </template>
        </el-table-column>
        <!-- 缺省图配置 -->
        <template slot="empty">
          <emptyData></emptyData>
        </template>
      </el-table>
      <div class="pagenation">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :hide-on-single-page="singlePage"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import * as _ from "lodash";
import Tools from "pte-ui/utils/Tools";

export default {
  data() {
    return {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对象
      searchTable: {
        dict_type: "",
        dict_name: ""
      },
      ruleTableData: [],
      singlePage: false, //是否只有一页
      currentPage: 1, //分几页
      total: 5,
      pageSize: 10, //每页条数
      tags: [], // 已选数据列表
      valueTypeList: [], // 值类型数据字典
    };
  },
  created() {
    this.getDictList("CT_E_VALUE_TYPE", "valueTypeList"); //获取值类型数据字典
  },
  mounted() {
    this.initRulesData();
  },
  methods: {
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType],
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
    /**
     * 查询值集列表
     */
    initRulesData(currentPage, pageSize) {
      this.showTable = false;
      if (!currentPage) {
        currentPage = this.currentPage;
      }
      if (!pageSize) {
        pageSize = this.pageSize;
      }
      let params = {
        dict_type: this.searchTable.dict_type,
        dict_name: this.searchTable.dict_name,
        servicecode: "ct3319",
        pageSize: pageSize,
        currentPage: currentPage
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res.data) {
            this.ruleTableData = res.data;
          }
          this.total = parseInt(res.pageParam.total);
          this.currentPage = parseInt(res.pageParam.pageNumber);
          this.pageSize = parseInt(res.pageParam.pageSize);
          if (
            parseInt(res.pageParam.pageSize) > parseInt(res.pageParam.total)
          ) {
            this.singlePage = true;
          } else {
            this.singlePage = false;
          }
          this.showTable = true;
        })
        .catch(error => {
          this.showTable = true;
          //alert(error);
        });
    },
    /**
    * 表格字典值转换
    */
    formatTypeData(row,column){
        let name = row[column.property];
        let data = row[column.property];
        this.valueTypeList.forEach(function(item,index){
            if(data == item.dictId){
              name = item.dictName;
            }
        })
        return name;
    },
    onSubmit() {
      // 查询
      this.initRulesData();
    },
    handleSizeChange(pageSize) {
      this.initRulesData(1, pageSize);
    },
    handleCurrentChange(pages) {
      //切换页码
      this.initRulesData(pages, this.pageSize);
    },
    // 带回
    bringback(val) {
      this.$dataBus.doCallBack(this, val);
    }
  }
};
</script>

<style lang="less" scoped>
</style>