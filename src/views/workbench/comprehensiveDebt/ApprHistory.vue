<template>
  <div>
    <el-table
     :data="claimdList">
      <el-table-column prop="auditUserName" label="执行人"></el-table-column>
      <el-table-column prop="receiveTime" label="案件收到时间"></el-table-column>
      <el-table-column prop="claimTime" label="案件读取时间"></el-table-column>
      <el-table-column prop="auditTime" label="案件送出时间"></el-table-column>
      <el-table-column prop="auditStep" label="审核结果"></el-table-column>
      <el-table-column prop="auditRemark" :label="$i18ns('备注')"></el-table-column>
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
  name: "ApprHistory",
  props: {
    applyNo: String, // 
    applid:String,
  },
  data() {
    return {
      claimdList: [], // 审批历程列表
      claimdPagination: { // 审批信息分页配置
        isShowPage: false,
        currentPage: 1,
        tableSize: 10,
        tableTotal: null,
      },
    }
  },
  created() {
    this.getClaimdData(); // 初始化审批信息
  },
  methods: {
    /**
     * 获取审批信息
     */
    getClaimdData() {
      let params = {
        servicecode: "auditHstQuery",
        applyNo: this.applyNo,
        applid:this.applid,
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