<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="tableDataList"
      border
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"
        :selectable="checkSelectable">
      </el-table-column>
      <el-table-column
        prop="sale_prod_name"
        label="可售产品名称"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          {{ scope.row.sale_prod_name }}
        </template>
      </el-table-column>
      <el-table-column
        prop="sale_prod_cd"
        label="可售产品编号"
        show-overflow-tooltip
        width="220px"
      >
        <template slot-scope="scope">
          {{ scope.row.sale_prod_cd }}
        </template>
      </el-table-column>
      <el-table-column
        prop="busi_assign_amt"
        show-overflow-tooltip
        label="业务限额分配金额"
        width
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.busi_assign_amt" :disabled="true"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="base_busi_assign_amt"
        show-overflow-tooltip
        label="折基业务限额分配金额"
        width
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.base_busi_assign_amt" :disabled="true"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="ccy_code"
        label="币种"
        show-overflow-tooltip
        width="120px"
      >
        <template slot-scope="scope">
          <el-select
            v-model="ccy_code"
            :placeholder="请选择"
            :disabled="true"
          >
            <el-option
              v-for="item in ccyList"
              :key="item.dictId"
              :label="item.dictName"
              :value="item.dictId"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
    </el-table>
    <!--    <el-pagination-->
    <!--      layout="total"-->
    <!--      :total="pageParams.total"-->
    <!--    >-->
    <!--    </el-pagination>-->
    <Page :pageParams="pageParams" :submit="submit"></Page>
  </div>
</template>
<script>
import Page from "@/views/components/Page.vue";
import MyAxios from "pte-ui/utils/MyAxios";
import MyMessage from "pte-ui/utils/MyMessage";

export default {
  components: {
    Page,
  },
  name: "creditMainSaleProdRelaInfo",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      tableDataList: [],
      selectedDataList: [],
      ccyList: [],
      ccy_code: "",
      pageParams: {
        pageNumber: 1,
        pageSize: 10,
        total: 0,
        pageLayout: "total"
      }
    }
  },
  updated() {
    //给表格默认选中
    this.selectionChange(this.tableDataList);
  },
  created() {
    this.ccy_code = this.cParentParams.ccy_code;
    //获取货币代码下拉字典
    this.getDictList("MS_CURRENCY", "ccyList");
    this.initTable();
  },
  methods: {
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictType
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let that = this;
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that[listKey] = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 初始化表格
     */
    initTable() {
      let that = this;
      let params = {
        credit_prod_cd: that.cParentParams.credit_prod_cd,
        cust_no: that.cParentParams.cust_no,
        cust_id: that.cParentParams.cust_id,
        apply_no: that.cParentParams.apply_no,
        start: that.pageParams.start,
        length: that.pageParams.length,
        servicecode: 'ar0814'
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          that.tableDataList = res.data;
          //分页插件记录总数
          that.pageParams.total = res.pageParam.total
        }
      }).catch(err => {
        console.error(err);
      });
    },
    /**
     * 处理表格多选事件
     */
    handleSelectionChange(val) {
      this.selectedDataList = val;
    },
    /**
     * 获取表格数据后对关联数据做默认选中
     * @constructor
     */
    selectionChange(rows) {
      let that = this;
      rows.forEach(row => {
        if (row.is_choose === "1")
          console.log("进来", row.is_choose);
        that.$refs.multipleTable.toggleRowSelection(row, true);
      });
    },
    changeAmt(row) {
      row.base_busi_assign_amt = row.busi_assign_amt;
    },
    checkSelectable(row) {
      this.tableDataList.forEach((item) => {
        return false
      })
    }
  }
}
</script>
<style>
.tableSubmit {
  padding: 7px 10px 8px 10px;
  margin: 7px 10px 8px 22px;
}
</style>
