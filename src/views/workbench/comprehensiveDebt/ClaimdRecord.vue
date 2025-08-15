<template>
  <div>
    <el-table
     :data="claimdList">
      <el-table-column prop="operatorCode" label="操作人编码"></el-table-column>
      <el-table-column prop="operatorName" label="操作人姓名"></el-table-column>
      <el-table-column prop="operationType" :label="$i18ns('操作类型')">
        <template slot-scope="scope">
          <div>{{scope.row.operationType === '1' ? "认领" : "取消认领"}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="operationTypeName" label="操作类型名称"></el-table-column>
      <el-table-column prop="remark" :label="$i18ns('备注')"></el-table-column>
      <el-table-column prop="operationTime" label="创建时间">
        <template slot-scope="scope">
          <div>{{scope.row.operationTime.slice(0, 8)}}</div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="claimd-pagination" v-show="claimdPagination.isShowPage"
     @size-change="claimdSizeChange"
     @current-change="claimdCurrentChange"
     :current-page="claimdPagination.currentPage"
     :page-sizes="[10,15,20]"
     :page-size="claimdPagination.tableSize"
     layout="total, sizes, prev, pager, next, jumper"
     :total="claimdPagination.tableTotal">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "ClaimdRecord",
  props: {
    applyNo: String, // 业务订单号
  },
  data() {
    return {
      claimdList: [], // 认领记录列表
      claimdPagination: { // 认领信息分页配置
        isShowPage: false,
        currentPage: 1,
        tableSize: 10,
        tableTotal: null,
      },
    }
  },
  created() {
    this.getClaimdData(); // 初始化认领信息
  },
  methods: {
    /**
     * 获取认领信息
     */
    getClaimdData() {
      let params = {
        servicecode: "claimHisQuery",
        applyNo: this.applyNo,
      }
      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            this.claimdPagination.tableTotal = res.data.length;
            const start = this.claimdPagination.tableSize * (this.claimdPagination.currentPage - 1);
            this.claimdPagination.isShowPage = res.data.length < 10 ? false : true;
            this.claimdList = res.data.splice(start, start + this.claimdPagination.tableSize);
          }
        })
        .catch(err => {
          console.error(err);
        })
    },
    /**
    * 分页sizeChange 回调
    * @param val 当前分页大小
    */
    claimdSizeChange(val) {
      this.claimdPagination.tableSize = val;
      this.claimdPagination.currentPage = 1;
      this.getClaimdData();
    },
    /**
    * 分页currentChange回调
    * @param val 当前分页大小
    */
    claimdCurrentChange(val) {
      this.claimdPagination.currentPage = val;
      this.getClaimdData();
    },
  }
}
</script>
<style lang="less" scoped>
  .claimd-pagination {
    padding-top: 10px;
    text-align: right;
  }
</style>