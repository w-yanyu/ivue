<template>
  <div class="system-container">
    <el-table
     :data="resultList">
      <el-table-column type="index" width="50" label="序号"></el-table-column>
      <el-table-column prop="riskType" label="请求类型"></el-table-column>
      <el-table-column prop="finalDealTypeName" label="返回结果"></el-table-column>
      <el-table-column prop="approveAmount" label="审批额度"></el-table-column>
      <el-table-column prop="highestLoanQuota" label="可贷最高金额"></el-table-column>
      <el-table-column prop="qequestTime" label="创建时间"></el-table-column>
      <el-table-column label="详情">
        <template slot-scope="scope">
          <span class="detail-btn" @click="checkDetail(scope.row.rejectReasons)">{{$i18ns('详情')}}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="system-pagination" v-show="systemPagination.isShowPage"
     @size-change="systemSizeChange"
     @current-change="systemCurrentChange"
     :current-page="systemPagination.currentPage"
     :page-sizes="[10,15,20]"
     :page-size="systemPagination.tableSize"
     layout="total, sizes, prev, pager, next, jumper"
     :total="systemPagination.tableTotal">
    </el-pagination>
    <el-dialog
     title="系统判断结果详情"
     :visible.sync="detailDialogShow"
     width="1200px"
     :before-close="handleDetailClose"
     v-if="detailDialogShow">
      <el-table
       :data="detailTempList">
        <el-table-column prop="serialNumber" label="序号"></el-table-column>
        <el-table-column prop="ruleCode" label="规则编号"></el-table-column>
        <el-table-column prop="ruleName" :label="$i18ns('规则名称')"></el-table-column>
        <el-table-column prop="ruleDealType" label="执行结果"></el-table-column>
      </el-table>
      <el-pagination class="system-pagination" v-show="systemPagination.isShowPage"
       @size-change="systemSizeChange"
       @current-change="systemCurrentChange"
       :current-page="systemPagination.currentPage"
       :page-sizes="[10,15,20]"
       :page-size="systemPagination.tableSize"
       layout="total, sizes, prev, pager, next, jumper"
       :total="systemPagination.tableTotal"></el-pagination>
    </el-dialog>
  </div>
</template>
<script>
import _ from "lodash";

export default {
  name: "SysJudgResult",
  props: {
    applyNo: String, // 业务订单号
  },
  data() {
    return {
      resultList: [],
      detailDialogShow: false,
      detailList: [], // 分页展示list
      detailTempList: [], // 所有详情list
      systemPagination: {
        isShowPage: false,
        currentPage: 1,
        tableSize: 10,
        tableTotal: null,
      },
    }
  },
  created() {
    this.getData(); // 初始化系统判断结果列表
  },
  methods: {
    /**
     * 获取系统判断结果列表
     */
    getData() {
      const params = {
        servicecode: "tdResultHstQuery",
        applyNo: this.applyNo,
      }
      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            this.systemPagination.tableTotal = res.data.length;
            const start = this.systemPagination.tableSize * (this.systemPagination.currentPage - 1);
            this.systemPagination.isShowPage = res.data.length < 10 ? false : true;
            this.resultList = res.data.splice(start, start + this.systemPagination.tableSize);
          }
        })
        .catch(err => {
          console.error(err);
        })
    },
    /**
     * 查看系统判断结果详情
     * @param list 系统判断结果详情列表
     */
    checkDetail(list) {
      this.detailDialogShow = true;
      this.detailTempList = list;
      this.detailTableInit();
    },
    /**
     * 系统判断结果详情弹窗关闭回调
     */
    handleDetailClose() {
      this.detailDialogShow = false;
    },
    /**
     * 详情列表初始化
     */
    detailTableInit() {
      this.systemPagination = {
        isShowPage: false,
        tableTotal: null,
      }
      let list = _.cloneDeep(this.detailTempList);
      this.systemPagination.tableTotal = list.length;
      const start = this.systemPagination.tableSize * (this.systemPagination.currentPage - 1);
      this.systemPagination.isShowPage = list.length < 10 ? false : true;
      this.detailList = list.splice(start, start + this.systemPagination.tableSize);
    },
    /**
    * 分页sizeChange 回调
    * @param val 当前分页大小
    */
    systemSizeChange(val) {
      this.systemPagination.tableSize = val;
      this.systemPagination.currentPage = 1;
      if (!this.detailDialogShow) {
        this.getData();
      } else {
        this.detailTableInit();
      }
    },
    /**
    * 分页currentChange回调
    * @param val 当前分页大小
    */
    systemCurrentChange(val) {
      this.systemPagination.currentPage = val;
      if (!this.detailDialogShow) {
        this.getData();
      } else {
        this.detailTableInit();
      }
    },
  }
}
</script>
<style lang="less" scoped>
  .system-container {
    /deep/.el-table tr td {
      text-align: center;
      .detail-btn {
        cursor: pointer;
        color: #1890ff;
      }
    }
  }
  .system-pagination {
    padding-top: 10px;
    text-align: right;
  }
</style>