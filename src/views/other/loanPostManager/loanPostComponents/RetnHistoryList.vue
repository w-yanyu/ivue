<template>
  <div>
    <div class="container-content">
      <div class="container-content--search">
        <el-form
          :model="repayForm"
          :rules="repayFormRules"
          ref="repayForm"
          label-width="150px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="借据号" prop="lncfno">
                <el-input v-model="repayForm.lncfno" class="input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请编号" prop="applid">
                <el-input v-model="repayForm.applid" class="input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户姓名" prop="acctna">
                <el-input v-model="repayForm.acctna" class="input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="证件号码" prop="idtfno">
                <el-input v-model="repayForm.idtfno" class="input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请状态" prop="retnstus">
                <el-select v-model="repayForm.retnstus" placeholder="请选择申请状态">
                  <el-option
                    v-for="(item, index) in retnstusList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="退还状态" prop="deductstus">
                <el-select v-model="repayForm.deductstus" placeholder="请选择退还状态">
                  <el-option
                    v-for="(item, index) in deductstusList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请提交时间" prop="applytime">
                <el-date-picker
                  v-model="repayForm.applytime"
                  type="date"
                  placeholder="请选择申请提交时间"
                  value-format="yyyyMMdd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="退还到账时间" prop="deductime">
                <el-date-picker
                  v-model="repayForm.deductime"
                  type="date"
                  placeholder="请选择退还到账时间"
                  value-format="yyyyMMdd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="button-footer">
            <el-col :span="24">
              <el-button type="primary" @click="searchTeller">查询</el-button>
              <el-button @click="reset">{{$i18ns('重置')}}</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="container-centent--table">
        <el-table ref="multipleTable" :data="tableData" :border="true" style="width: 100%" stripe>
          <el-table-column label="借据号" prop="lncfno" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="申请编号" prop="applid" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="客户姓名" prop="acctna" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="证件号码" prop="idtfno" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="产品名称" prop="prodna" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="借记卡号" prop="debitcardno" align="center" show-overflow-tooltip ></el-table-column>
          <el-table-column label="申请提交时间" prop="applytime" align="center" show-overflow-tooltip ></el-table-column>
          <el-table-column
            label="申请状态"
            prop="retnstus"
            align="center"
            :formatter="formatretnAppData"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="退还金额" prop="retnamt" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column
            label="退还状态"
            prop="deductstus"
            align="center"
            :formatter="formatDeductData"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="实际退还金额" prop="realamt" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="退还到账时间" prop="deductime" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="响应信息" prop="err_msg" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" prop="info" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button type="text" @click="updateStus(scope.row)"  v-show="scope.row.deductstus!=null&&scope.row.deductstus!=''">更新状态</el-button>
              <el-button type="text" @click="searchDetailInfo(scope.row)">{{$i18ns('详情')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="container-content--pagination">
        <el-pagination
          v-if="tableData.length>0"
          @size-change="sizeChange"
          @current-change="currentChange"
          :current-page="currentPage"
          :page-sizes="[10,15,20]"
          :page-size="tableSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableTotal"
        ></el-pagination>
      </div>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :title="dialogTitle"
      :visible.sync="resultShow"
      :width="dialogWidth"
    >
      <div class="el-dialog-dev">
        <pte-resolver
          v-if="resultShow"
          :c-parent-meta="c_$meta"
          :c-parent-scope="c_$scope"
          :c-parent-params="c_$params"
          :to-request="toRequest"
        ></pte-resolver>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import MyAxios from "pte-ui/utils/MyAxios";
import { validateHandle } from "../loanPostConstant/loanPostConstant";
import _ from "lodash";
export const repayFormRules = {
  rptype: [{ required: true, message: "还款类型" }]
};
export default {
  name: "RetnHistoryList",
  data() {
    return {
      tableData: [], //表格数据
      repayForm: {
        applid: "",
        lncfno: "",
        acctna: "",
        idtfno: "",
        retnstus: "",
        deductstus: "",
        applytime: "",
        deductime: "",
        realamt: "",
        err_msg:""
      },
      currentPage: 1,
      tableTotal: 10,
      temprepayForm: [], //查询
      tableSize: 10,
      repayFormRules,
      resultShow: false, //是否展示详情
      dialogWidth: "80%", //弹框宽度
      dialogTitle: "详情",
      c_$meta: {},
      c_$scope: {},
      c_$params: {
        applid: ""
      },
      toRequest: {
        url: "/views/other/loanPostManager/retn_application_query.json",
        method: "POST"
      },
      //------------------字典---------//

      lockList: [], //是否锁定字典
      retnstusList: [], //申请状态字典
      deductstusList: [] //扣款状态字典
    };
  },
  created() {
    this.getDictList("E_YES___", "lockList"); //还款类型字典
    this.getDictList("E_APPSTUS", "retnstusList"); //申请状态字典
    this.getDictList("E_DEDUCTSTUS", "deductstusList"); //退还到账状态字典
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
    formatretnAppData(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.retnstusList.forEach(function(item, index) {
        if (data == item.dictId) {
          name = item.dictName;
        }
      });
      return name;
    },
    formatDeductData(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.deductstusList.forEach(function(item, index) {
        if (data == item.dictId) {
          name = item.dictName;
        }
      });
      return name;
    },
    formatLockData(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.lockList.forEach(function(item, index) {
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
      this.$refs.repayForm.validate(valid => {
        if (valid) {
          this.temprepayForm = _.cloneDeep(this.repayForm);
          this.currentPage = 1;
          this.getTableData();
        } else {
          this.$message({
            type: "warning",
            message: "校验不通过"
          });
        }
      });
    },
    /**
     *详情
     */
    searchDetailInfo(row) {
      if (row.sjplhk == "1") {
        this.$message({
          type: "warning",
          message: "该记录无还款申请详情！"
        });
      } else {
        this.c_$params.applid = row.applid;
        this.resultShow = true;
      }
    },
    reset() {
      this.$refs.repayForm.resetFields();
    },
    /**
     *更新状态
     *
     */
    updateStus(row) {
      let params = {
        servicecode: "PLMSKGTS0141",
        applid: row.applid
      };

      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            let data = res.data;
            row.deductstus = data.deductstus;
            row.deductime = data.deductstus==='1'?data.deductime:"";
            row.err_msg =data.err_msg;
            row.realamt = data.realamt===null?"0":data.realamt;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 获取列表数据
     */
    getTableData() {
      this.validateList1 = [];
      const formList = ["repayForm"];
      formList.forEach(item => {
        this.validateList1.push(validateHandle(item, this));
      });
      Promise.all(this.validateList1)
        .then(res => {
          let reqMap = {
            applid: this.repayForm.applid,
            lncfno: this.repayForm.lncfno,
            acctna: this.repayForm.acctna,
            idtfno: this.repayForm.idtfno,
            retnstus: this.repayForm.retnstus,
            deductstus: this.repayForm.deductstus,
            applytime: this.repayForm.applytime,
            deductime: this.repayForm.deductime,
            servicecode: "PLMSKGTS0142",
            start: this.currentPage,
            length: this.tableSize
          };
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap)
            .then(res => {
              if (res && res.code === "200") {
                this.tableData = res.data;
                this.tableTotal = res.pageParam.total;
              }
            })
            .catch(err => {
              console.error(err);
            });
        })
        .catch(err => {
          this.$message({
            type: "warning",
            message: "校验不通过"
          });
        });
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
  text-align: right;
  padding: 0 0 10px 0;
}
.el-dialog-dev {
  max-height: 70vh;
  overflow: auto;
}
</style>