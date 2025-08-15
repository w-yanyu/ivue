<template>
  <div>
    <div class="container-content">
      <div class="container-content--search">
        <el-form
          :model="claimForm"
          :rules="claimFormRules"
          ref="claimForm"
          label-width="150px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="申请编号" prop="applid">
                <el-input v-model="claimForm.applid" class="input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户姓名" prop="name">
                <el-input v-model="claimForm.name" class="input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="产品" prop="prodCode">
                <el-select
                  v-model="claimForm.prodCode"
                  placeholder="请选择产品"
                >
                  <el-option
                    v-for="(item, index) in prodList"
                    :key="index"
                    :label="item.prodna"
                    :value="item.crdtcd"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="步骤状态" prop="stepStatus">
                <el-select
                  v-model="claimForm.stepStatus"
                  placeholder="请选择步骤状态"
                >
                  <el-option
                    v-for="(item, index) in procStatusList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item label="进件起始日期" prop="startApplyTime">
                <el-date-picker
                  v-model="claimForm.startApplyTime"
                  type="date"
                  placeholder="请选择进件起始日期"
                  value-format="yyyyMMdd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="进件截止日期" prop="endApplyTime">
                <el-date-picker
                  v-model="claimForm.endApplyTime"
                  type="date"
                  placeholder="请选择进件截止日期"
                  value-format="yyyyMMdd"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="审批角色" prop="wfrlid">
                <el-select
                  v-model="claimForm.wfrlid"
                  placeholder="请选择审批角色"
                >
                  <el-option
                    v-for="(item, index) in wfrlList"
                    :key="index"
                    :label="item.wfrlnm"
                    :value="item.wfrlid"
                  ></el-option>
                </el-select>
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
        <el-table
          ref="multipleTable"
          :data="tableData"
          :border="true"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column
            label="申请编号"
            prop="applid"
            align="center"
          ></el-table-column>
          <el-table-column
            label="进件编号"
            prop="applyNo"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="客户姓名"
            prop="name"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="配偶信息"
            prop="spoName"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="手机号码"
            prop="mobileNo"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="产品"
            prop="prodName"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="区域中心"
            prop="merchName"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="进件时间"
            prop="applyTime"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="收到时间"
            prop="receiveTime"
            align="center"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="状态"
            prop="stepStatus"
            align="center"
            :formatter="formatProcStatusData"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            label="操作"
            prop="info"
            align="center"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-button type="text" @click="dealCase(scope.row)"
                >办理</el-button
              >
              <el-button type="text" @click="viewProcess(scope.row)"
                >{{$i18ns('查看')}}流程</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="container-content--pagination">
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
    <!-- 弹窗 <el-dialog
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
        </el-dialog> -->
  </div>
</template>


<script>
// import MyAxios from "pte-ui/utils/MyAxios";
import { validateHandle } from "../bpm_constant/bpmConstant";
import _ from "lodash";
export const claimFormRules = {
  // wfrlid: [{ required: true, message: "审批角色不能为空" }]
};
export default {
  name: "BpmDealWorkBench",
  data() {
    return {
      tableData: [], //表格数据
      claimForm: {
        applid: "",
        name: "",
        prodCode: "",
        stepStatus:"",
        startApplyTime: "",
        endApplyTime: "",
        wfrlid: "",
      },
      currentPage: 1,
      tableTotal: 10,
      tempclaimForm: [], //查询
      prodList: [], //产品字典(接口查询)
      wfrlList: [], //审批角色字典(接口查询)
      procStatusList: [], //流程状态字典
      tableSize: 10,
      claimFormRules,
      /* 弹窗相关参数
            resultShow:false, //是否展示详情
            dialogWidth:"80%", //弹框宽度
            dialogTitle:"详情",
            c_$meta: {},
            c_$scope: {},
            c_$params: {
                applid: ""
            },
            toRequest: {
                url: "@BpmTaskGetConfirm",
                method: "GET",
                params: {
                  applid:"${{currect.applid}}",
                  taskInstId:"${{currect.taskInstId}}"
                }
             }*/
    };
  },
  created() {
    this.getDictList("E_STEPST", "procStatusList"); //步骤状态字典
    this.getProdList(); // 产品字典(接口查询)
    this.getWfrlList(); // 审批角色下拉列表
  },
  methods: {
    validateHandle(formName, that) {
      const promise = new Promise((resolve, reject) => {
        that.$refs[formName].validate((valid) => {
          !!valid ? resolve() : reject();
        });
      });
      return promise;
    },
    /**
     * 获取字典
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType],
      };
      this.$http
        .invokeAPI("/SUMP/rest/dict", "post", params)
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
     * 获取产品字典
     */
    getProdList() {
      let params = {
        servicecode: "AS_ICMS_PD_QRPDLS",
      };
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this.prodList = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     * 获取审批角色下拉列表
     */
    getWfrlList() {
      let params = {
        servicecode: "ICMSJKTS0168",
        usercd: JSON.parse(localStorage.getItem("user_info")).userCode,
      };
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this.wfrlList = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    formatProcStatusData(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.procStatusList.forEach(function (item, index) {
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
      this.$refs.claimForm.validate(valid => {
        if (valid) {
          this.tempclaimForm = _.cloneDeep(this.claimForm);
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
    /**
     *详情
     */
    searchDetailInfo(row) {
      if (row.sjplhk == "1") {
        this.$message({
          type: "warning",
          message: "该记录无还款申请详情！",
        });
      } else {
        this.c_$params.applid = row.applid;
        this.resultShow = true;
      }
    },
    /**
     * 办理
     */
    dealCase(row) {
      let that = this.$parent.$parent.$parent;
      if(row.currAprovRole.indexOf('DATA_VERY')!==-1){ //资料核实
        this.$publicFn.openNavTab(
          "@HandleDataCheck",
          "待办事项办理",
          row,
          that
        ); 
      }else if(row.currAprovRole==='CRED_APPV'){ // 授信核准
        this.$publicFn.openNavTab(
          "@HandleCreditApproval",
          "待办事项办理",
          row,
          that
        ); 
      }else if(row.currAprovRole==='F_MANUAL'){ // 审批一审
        this.$publicFn.openNavTab(
          "@HandleFirstApproval",
          "待办事项办理",
          row,
          that
        ); 
      }else if(row.currAprovRole==='E_MANUAL'){ // 专家审批
        this.$publicFn.openNavTab(
          "@HandleProApproval",
          "待办事项办理",
          row,
          that
        ); 
      }else{
        this.$message({
          type: "warning",
          message: "该案件不在“资料核实、授信核准、审批一审、专家审批”等阶段！",
        });
      }
    },
    reset() {
      this.$refs.claimForm.resetFields();
    },
    /**
     * 获取列表数据
     */
    getTableData() {
      this.validateList1 = [];
      const formList = ["claimForm"];
      formList.forEach((item) => {
        this.validateList1.push(validateHandle(item, this));
      });
      Promise.all(this.validateList1)
        .then((res) => {
          let reqMap = {
            applid: this.claimForm.applid,
            name: this.claimForm.name,
            prodCode: this.claimForm.prodCode,
            stepStatus: this.claimForm.stepStatus,
            startApplyTime: this.claimForm.startApplyTime,
            endApplyTime: this.claimForm.endApplyTime,
            wfrlid: this.claimForm.wfrlid,
            servicecode: "ICMSJKTS0167",
            pageNumber: this.currentPage,
            pageSize: this.tableSize,
            usercd:JSON.parse(localStorage.getItem("user_info")).userCode
          };
          this.$http
            .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap)
            .then((res) => {
              if (res && res.code === "200") {
                this.tableData = res.data.waitDealList;
                this.tableTotal = parseInt(res.data.recordSize);
              }
            })
            .catch((err) => {
              console.error(err);
            });
        })
        .catch((err) => {
          console.error(err);
          this.$message({
            type: "warning",
            message: "请求异常",
          });
        });
    },
    tableRowClassName({row, rowIndex}) {
      if (row.isSupply === 'Y') {
        return 'supply-row';
      } else if (row.isSpoLoan === 'Y') {
        if(!row.currAprovRole.indexOf('DATA_VERY')!==-1){
          return 'spoloan-row'; // 资料核实配偶件未要求
        }
      } else if (row.isOvertime === 'Y') {
        // if(row.currAprovRole ==='F_MANUAL' || row.currAprovRole ==='E_MANUAL' ){
        //   // return 'overtime-red-row';// 人工审批超时-红
        //   return '';// 取消人工审批的超时颜色
        // }else if(row.currAprovRole ==='CRED_APPR'){
        //   return ''; // 授信核准超时未要求
        // }else 
        if(row.currAprovRole.indexOf('DATA_VERY')!==-1) {
          return 'overtime-green-row'; //资料核实超时-绿
        }
      }
      return '';
    }
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
    margin-top: 10px;
  }
}
.container-footer {
  width: 50px;
  margin: 0 auto;
  padding: 10px;
}
.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}
.el-dialog-dev {
  max-height: 70vh;
  overflow: auto;
}

</style>
<style>
.el-table tr td{
  background:transparent !important;
}
.el-table .supply-row {
  background: #b3c3f7;
}
.el-table .spoloan-row {
  background: #fbd7ec;
}
.el-table .overtime-green-row {
  background: #c2f5c4;
}
.el-table .overtime-red-row {
  background: #ff9999;
}
</style>