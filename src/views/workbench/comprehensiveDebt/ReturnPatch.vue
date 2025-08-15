<template>
  <el-collapse v-model="activeNames" class="return-patch--collapse">
    <el-collapse-item name="1">
      <template slot="title">
        <span>
          <em></em>补件历史记录
        </span>
      </template>
      <el-table
       :data="patchList">
        <el-table-column prop="createTime" label="提醒待补件日期"></el-table-column>
        <el-table-column prop="isCommit" label="是否已经上传">
          <template slot-scope="scope">
            <div>{{scope.row.isCommit === 'Y' ? '是' : '否'}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="currentStep" label="当前流程"></el-table-column>
        <el-table-column prop="endPatchTime" label="完成补件日期"></el-table-column>
        <el-table-column prop="patchNames" label="待补附件名称"></el-table-column>
        <el-table-column prop="patchRemark" label="备注说明"></el-table-column>
      </el-table>
      <el-pagination class="patch-pagination" v-show="patchPagination.isShowPage"
       @size-change="patchSizeChange"
       @current-change="patchCurrentChange"
       :current-page="patchPagination.currentPage"
       :page-sizes="[5,10,15]"
       :page-size="patchPagination.tableSize"
       layout="total, sizes, prev, pager, next, jumper"
       :total="patchPagination.tableTotal">
      </el-pagination>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template slot="title">
        <span>
          <em></em>退件历史记录
        </span>
      </template>
      <el-table
       :data="returnList">
        <el-table-column prop="returnNodeName" label="退回步骤"></el-table-column>
        <el-table-column prop="returnRemark" label="退回备注"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="returnType" label="退件类型"></el-table-column>
      </el-table>
      <el-pagination class="patch-pagination" v-show="returnPagination.isShowPage"
       @size-change="returnSizeChange"
       @current-change="returnCurrentChange"
       :current-page="returnPagination.currentPage"
       :page-sizes="[5,10,15]"
       :page-size="returnPagination.tableSize"
       layout="total, sizes, prev, pager, next, jumper"
       :total="returnPagination.tableTotal">
      </el-pagination>
    </el-collapse-item>
  </el-collapse>
</template>
<script>
export default {
  name: "ReturnPatch",
  props: {
    applyNo: String, // 业务订单号
  },
  data() {
    return {
      activeNames: ["1", "2"],
      patchTempList: [], // 所有补件历史记录list
      patchList: [], // 补件历史记录分页展示list
      patchPagination: {
        isShowPage: false,
        currentPage: 1,
        tableSize: 5,
        tableTotal: null,
      },
      returnTempList: [], // 所有退件历史记录list
      returnList: [], // 退件历史记录分页展示list
      returnPagination: {
        isShowPage: false,
        currentPage: 1,
        tableSize: 5,
        tableTotal: null,
      }
    }
  },
  created() {
    this.getData(); // 初始化退补件历史列表
  },
  methods: {
    /**
     * 获取退补件历史列表
     */
    getData() {
      const params = {
        servicecode: "returnPatchHstQuery",
        applyNo: this.applyNo,
      }
      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            this.patchTempList = res.data.patchHstList;
            this.patchPagination.tableTotal = this.patchTempList.length;
            this.patchPagination.isShowPage = this.patchTempList.length < 5 ? false : true;
            this.patchTableInit();
            this.returnTempList = res.data.returnHstList;
            this.returnPagination.tableTotal = this.returnTempList.length;
            this.returnPagination.isShowPage = this.returnTempList.length < 5 ? false : true;
            this.returnTableInit();
          }
        })
        .catch(err => {
          console.error(err);
        })
    },
    /**
     * 退补件历史列表数据处理
     */
    returnTableInit() {
      let list = _.cloneDeep(this.returnTempList);
      const start = this.returnPagination.tableSize * (this.returnPagination.currentPage - 1);
      this.returnList = list.splice(start, start + this.returnPagination.tableSize);
    },
    /**
     * 退件分页sizeChange 回调
     * @param val 当前分页大小
     */
    returnSizeChange(val) {
      this.returnPagination.tableSize = val;
      this.returnPagination.currentPage = 1;
      this.returnTableInit();
    },
    /**
     * 退件分页currentChange回调
     * @param val 当前分页大小
     */
    returnCurrentChange(val) {
      this.returnPagination.currentPage = val;
      this.returnTableInit();
    },
    /**
     * 补件历史列表数据处理
     */
    patchTableInit() {
      let list = _.cloneDeep(this.patchTempList);
      const start = this.patchPagination.tableSize * (this.patchPagination.currentPage - 1);
      this.patchList = list.splice(start, start + this.patchPagination.tableSize);
    },
    /**
     * 退件分页sizeChange 回调
     * @param val 当前分页大小
     */
    patchSizeChange(val) {
      this.patchPagination.tableSize = val;
      this.patchPagination.currentPage = 1;
      this.patchTableInit();
    },
    /**
     * 退件分页currentChange回调
     * @param val 当前分页大小
     */
    patchCurrentChange(val) {
      this.patchPagination.currentPage = val;
      this.patchTableInit();
    }
  }
}
</script>
<style lang="less" scoped>
  .return-patch--collapse {
    border-bottom: none !important;
    .el-collapse-item__content {
      padding: 20px 20px 10px 20px;
    }
    /deep/.el-table tr td {
      text-align: center;
      .detail-btn {
        cursor: pointer;
        color: #1890ff;
      }
    }
    .patch-pagination {
      padding-top: 10px;
      text-align: right;
    }
  }
</style>