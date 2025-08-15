<template>
  <!-- 佣金方案 -->
  <div class="app-container">
    <el-form size="small" label-width="100px" class="margin15-pd">
      <el-row :gutter="24">
        <el-col :span="6" style="padding:10px">
          <el-button type="primary" size="mini" @click="addScheme()">
            新增
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table v-loading="loading" :data="tableList">
      <!-- <el-table-column align="center" prop="commission_no" label="编号" /> -->
      <el-table-column
        align="center"
        type="index"
        width="50"
        :label="'序号'"
      />
      <el-table-column align="center" prop="commission_name" :label="'佣金方案名称'" />
      <el-table-column
        align="center"
        prop="calculation_type"
        sortable
        :label="'佣金计算方案'"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.calculation_type === '100'">按佣金比率</span>
          <span v-else-if="scope.row.calculation_type === '200'">按人头费用</span>
          <span v-else-if="scope.row.calculation_type === '300'">案件单价</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="start_date"
        sortable
        :label="'生效开始时间'"
      />
      <el-table-column
        align="center"
        prop="end_date"
        sortable
        :label="'生效结束时间'"
      />
      <el-table-column
        align="center"
        sortable
        prop="relation_status"
        :label="'关联状态'"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.relation_status === '100'">未关联</span>
          <span v-else-if="scope.row.relation_status === '101'">已关联</span>
          <span v-else-if="scope.row.relation_status === ''"></span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="'操作'">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.relation_status === 101"
            type="text"
            size="mini"
            :disabled="disabled"
            @click="detailScheme(scope.row.commission_no)"
          >
            详情
          </el-button>
          <el-button
            v-if="scope.row.relation_status !== 101"
            type="text"
            size="mini"
            :disabled="disabled"
            @click="editScheme(scope.row.commission_no)"
          >
            修改
          </el-button>
          <el-button
            v-if="scope.row.relation_status !== 101"
            type="text"
            size="mini"
            :disabled="disabled"
            @click="del(scope.row.commission_no)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      :v-show="total > 0"
      :page.sync="searchForm.pageNum"
      :limit.sync="searchForm.pageSize"
      :total="total"
      @pagination="getList()"
    />

    <el-dialog :title="dialogTitle" append-to-body :visible.sync="addVisible" width="50%" :close-on-click-modal="false">
      <add-scheme
        v-if="addVisible"
        ref="schemeInit"
        :is-disabled="isDisabled"
        :contract-date="contractDate"
        :maincontract-no="maincontract_no"
        :fc-commission-data="fcCommission"
        :status-options="statusOptions"
        @closeDialog="submitDialog"
      />
    </el-dialog>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
// import { getList, getInfoById, deleteCommission } from '@/api/finance/commissionManage/commission';
import addScheme from './component/addScheme';
// import { getInfoDateById } from '@/api/finance/contractManage/contract';

export default {
  components: {
    addScheme
  },
  props: {
    getTreeData: {
      type: String,
      default() {
        return null;
      },
    },
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      maincontract_no: null,
      dialogTitle: "编辑佣金方案",
      isDisabled: false,
      addVisible: false,
      searchForm: {
        pageNum: 1,
        pageSize: 10,
        maincontract_no: null
      },
      tableList: [],
      loading: false,
      disabled: false,
      total: 1,
      fcCommission: null,
      statusOptions: [],
      contractDate: null
    };
  },
  created() {
    this.maincontract_no = this.cParentParams.id_;
    this.getInitDate();
  },
  mounted() {
    this.searchForm.maincontract_no = this.cParentParams.id_;

    // 查询逾期阶段
    // this.getDicts('overdue_status').then(response => {
    //   this.statusOptions = response.data;
    // });
    this.getOverdueStatusList();

    this.getList();
    console.log("======父页面自定义参数与内置参数cParentParams", this.cParentParams);
    console.log("======父页面佣金方案列表带过来的参数id_：", this.cParentParams.id_);


  },
  methods: {
    // getList() {
    //   this.loading = true;
    //   getList(this.searchForm).then(res => {
    //     this.tableList = res.rows;
    //     this.total = res.total;
    //     this.loading = false;
    //   });
    // },

// 查询逾期阶段
 getOverdueStatusList() {
let params = {
  servicecode: "cb0010",
  length: 999,
};
MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
  .then((res) => {
    if (res && res.code === "200" && res.data) {
      console.log("======逾期阶段列表：" + res.data);
      this.statusOptions = res.data;
    }
  })
  .catch((err) => {
    console.error(err);
  });
},

    getList() {

      let params = {
        length: 999,
        servicecode: "cb0310",
        maincontract_no: this.cParentParams.id_,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            console.log("======佣金列表查询：" + res.data);
            this.tableList = res.data;
            this.total = res.total;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    // getInitDate() {
    //   getInfoDateById(this.fcContractId).then(res => {
    //     this.contractDate = res.data;
    //   });

      getInitDate() {

        // this.contractDate.endDate   = "2099-01-01";
        // this.contractDate.startDate = "2023-01-01";

      let params = {
        length: 999,
        servicecode: "cb0310",
        maincontract_no: this.cParentParams.id_,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            console.log("======getInfoDateById：" +  res.data);
            this.contractDate = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

      addScheme() {
        this.dialogTitle = "新增佣金方案";
        this.addVisible = true;
        this.isDisabled = false;
        this.fcCommission = null;
      },
    editScheme(commission_no) {
      this.getDetail(commission_no);
      this.dialogTitle ="编辑佣金方案";
      this.addVisible = true;
      this.isDisabled = false;
    },
    detailScheme(commission_no) {
      this.getDetail(commission_no);
      this.dialogTitle = "查看佣金方案";
      this.addVisible = true;
      this.isDisabled = true;
    },
    // // 查看详情或者编辑
    // getDetail(id) {
    //   getInfoById(id).then(res => {
    //     this.fcCommission = res.data;
    //   });
    // },
    // 查看详情或者编辑
    getDetail(commission_no) {
      let params = {
        servicecode: "cb0312",
        commission_no: commission_no,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            console.log("cb0312-合同佣金方案_详情查看：", res.data);
            this.fcCommission = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    
    submitDialog() {
      this.addVisible = false;
      this.getList();
    },
    del(commission_no) {
      this.$confirm('此操作将永久作废该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取 消',
        type: 'warning',
        center: true
      })
        .then(() => {
          // deleteCommission(id).then(res => {
          //   this.$message({
          //     type: 'success',
          //     message: '操作成功'
          //   });
          //   this.getList();
          // });

              let params = {
            servicecode: "cb0356",
            commission_no: commission_no,
          };
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
            .then((res) => {
              if (res && res.code === "200" && res.data) {
                console.log("删除成功", res.data);
                this.getList();
              }
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取 消'
          });
        });
    }
  }
};
</script>
