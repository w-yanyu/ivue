<template>
  <div>
    <div class="container-content">
      <div class="container-content--search">
        <el-form
          :model="selectForm"
          :rules="selectFormRules"
          ref="selectForm"
          label-width="150px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item label="区域中心" prop="areaCenter">
                <el-select v-model="selectForm.areaCenter" placeholder="请选择区域中心">
                  <el-option
                    v-for="(item, index) in areaCenterList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="借据号" prop="lncfno">
                <el-input v-model="selectForm.lncfno" class="input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请编号" prop="applid">
                <el-input v-model="selectForm.applid" class="input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户姓名" prop="acctna">
                <el-input v-model="selectForm.acctna" class="input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="证件号码" prop="idtfno">
                <el-input v-model="selectForm.idtfno" class="input"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="诉讼类型" prop="suitype">
                <el-select v-model="selectForm.suitype" placeholder="请选择诉讼类型">
                  <el-option
                    v-for="(item, index) in suitypeList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="诉讼结果" prop="caseResult">
                <el-select v-model="selectForm.caseResult" placeholder="请选择诉讼结果">
                  <el-option
                    v-for="(item, index) in caseResultList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="诉讼程序" prop="suitprogrm">
                <el-select v-model="selectForm.suitprogrm" placeholder="请选择诉讼程序">
                  <el-option
                    v-for="(item, index) in suitprogrmList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="button-footer">
            <el-col :span="24">
              <el-button type="primary" @click="searchTeller" icon="el-icon-search">查询</el-button>
              <el-button @click="reset">{{$i18ns('重置')}}</el-button>
              <el-button
                type="primary"
                size="small"
                @click="exportToExcel"
                plain
                class="export-button-style"
              >
                <i class="iconfont icon-daochu"></i>导出
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="container-centent--table">
        <el-table ref="multipleTable" :data="tableData" :border="true" style="width: 100%" stripe>
          <el-table-column label="区域中心" prop="areaCenter" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="借据号" prop="lncfno" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="申请编号" prop="applid" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="客户名称" prop="acctna" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="证件号码" prop="idtfno" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="诉讼类型" prop="suitype" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="诉讼承办机构" prop="handleorg" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="诉讼受理机构" prop="acceptorg" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="诉讼案件号" prop="caseno" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="诉讼结果" prop="caseResult" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="文书类型" prop="documntype" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="诉讼文书落款日期" prop="signDate" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column :label="$i18ns('申请人')" prop="execaseno" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column :label="$i18ns('申请时间')" prop="exeacceptime" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="结案时间" prop="exestus" align="center" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" prop="info" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
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
export const selectFormRules = {};
export default {
  name: "AllSuitCaseView",
  data() {
    return {
      tableData: [], //表格数据
      selectForm: {
        areaCenter: "",
        applid: "",
        lncfno: "",
        acctna: "",
        idtfno: "",
        handleorg: "",
        suitype: "",
        caseResult: "",
        suitprogrm: ""
      },
      currentPage: 1,
      tableTotal: 10,
      tempselectForm: [], //查询
      tableSize: 10,
      selectFormRules,
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

      suitypeList: [], //诉讼类型字典
      suitprogrmList: [], //诉讼程序字典
      caseResultList: [] //诉讼结果字典
    };
  },
  created() {
    this.getDictList("E_YES___", "yesnoList"); //是否字典
    this.getDictList("E_SUITYPE", "suitypeList"); //诉讼类型字典
    this.getDictList("E_SUITRESULT", "caseResultList"); //诉讼结果字典
    this.getDictList("E_APPELLANT", "appellantList"); //上诉方字典
    this.getDictList("E_SUITPROGRM", "suitprogrmList"); //诉讼程序字典
    this.getDictList("E_DOCUMNTYPE", "documntypeList"); //诉讼文书类型字典
    this.getDictList("E_ACCOUNT_TYPE", "acceptorgtypeList"); //诉讼受理机构类型字典
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
      this.$refs.selectForm.validate(valid => {
        if (valid) {
          this.tempselectForm = _.cloneDeep(this.selectForm);
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
      this.$refs.selectForm.resetFields();
    },
    /**
     * 获取列表数据
     */
    getTableData() {
      this.validateList1 = [];
      const formList = ["selectForm"];
      formList.forEach(item => {
        this.validateList1.push(validateHandle(item, this));
      });
      Promise.all(this.validateList1)
        .then(res => {
          let reqMap = {
            areaCenter: this.selectForm.areaCenter,
            applid: this.selectForm.applid,
            lncfno: this.selectForm.lncfno,
            acctna: this.selectForm.acctna,
            idtfno: this.selectForm.idtfno,
            handleorg: this.selectForm.handleorg,
            suitype: this.selectForm.suitype,
            caseResult: this.selectForm.caseResult,
            suitprogrm: this.selectForm.suitprogrm,
            servicecode: "RLMSPLTS1237",
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
    },
    /**
     * 导出本页数据到表格
     */
    exportToExcel() {
      this.outToExcel(this.tableData);
    },

    /**
     * 导出全部数据到表格
     */
    exportAllToExcel() {
      if (this.tableTotal < 0) {
        this.$message({
          type: "warning",
          message: "无查询操作"
        });
        return;
      }
      var params = {
        servicecode: "PLMSKGTS0132",
        start: 0,
        length: this.tableTotal
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            let data = res.data;
            data.forEach(item => {
              item.clssst = this.transformValue(this.clssstList, item.clssst);
              item.hxstus = this.transformValue(this.yesnoList, item.hxstus);
              item.deduct_status = this.transformValue(
                this.paystatuList,
                item.deduct_status
              );
              item.repaystus = this.transformValue(
                this.repayStatuList,
                item.repaystus
              );
            });
            this.outToExcel(data);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 导出数据到表格
     */
    outToExcel(data) {
      var jsonData = data;
      let str = `区域中心,借据号,申请编号,客户名称,证件号码,诉讼类型,诉讼承办机构,诉讼受理机构,诉讼程序,诉讼案件号,诉讼结果,文书类型,诉讼文书落款日期,申请人,申请时间,结案时间\n`;
      let header = [
        "areaCenter",
        "applid",
        "lncfno",
        "acctna",
        "idtfno",
        "suitype",
        "handleorg",
        "acceptorg",
        "suitprogrm",
        "caseno",
        "caseResult",
        "documntype",
        "signDate"
      ];
      jsonData.forEach(item => {
        header.forEach(element => {
          item[element] = item[element] ? item[element] : "";
          str += `${item[element] + "\t"},`; //\t横向跳格
        });
        str += "\n";
      });
      let url = "data:text/xlsx;charset=utf-8,\ufeff" + encodeURIComponent(str); //encodeURIComponent解决中文乱码
      var link = document.createElement("a"); //通过创建a标签实现
      link.href = url;
      link.download = "诉讼结果录入统计表.xls";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log(this.tableData);
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
.export-button-style {
  background: #6ac044 !important;
  border-color: #6ac044 !important;
}
</style>