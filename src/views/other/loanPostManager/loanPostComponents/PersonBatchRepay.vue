<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <span>
            <em></em>批量扣款
          </span>
        </template>
        <el-row>
          <el-col :span="4">
            <single-upload-vue
              class="repay-upload"
              :vueFormKey="'file'"
              :vueFormLabel="'还款批量文件上传'"
              :ifRequire="false"
              :warning="false"
              :fileType="'xls'"
              :fileSize="10"
              :fileName="'还款批量文件上传'"
              @fileStatu="getFileStatu"
            />
          </el-col>
          <el-col :span="4" class="model-down">
            <a @click="downExcelModel">点击下载Excel文件模板</a>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8" style="padding-left:50px;margin-top:30px;margin-bottom:30px;">
            <el-button type="primary" size="small" @click="batchRepay" plain>开始批量扣款</el-button>
            <el-button
              type="primary"
              size="small"
              @click="qryRepayResults('all')"
              icon="el-icon-search"
              style="margin-left:60px;"
              plain
            >查询扣款列表</el-button>
          </el-col>
        </el-row>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <span>
            <em></em>还款列表
          </span>
        </template>
        <el-form
          ref="queryForm"
          :rules="rules"
          :model="queryForm"
          label-width="120px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="5">
              <el-form-item label="批次号" prop="batchnum">
                <el-input v-model="queryForm.batchnum"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="借据号" prop="lncfno">
                <el-input v-model="queryForm.lncfno"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="客户姓名" prop="custna">
                <el-input v-model="queryForm.custna"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="证件号码" prop="cardno">
                <el-input v-model="queryForm.cardno"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4" style="padding-left:100px;">
              <el-button
                type="primary"
                size="small"
                @click="qryRepayResults('condition')"
                icon="el-icon-search"
                plain
              >查询</el-button>
            </el-col>
          </el-row>
          <el-row class="export-button-style">
            <el-button type="primary" size="small" @click="exportToExcel" plain>
              <i class="iconfont icon-daochu"></i>导出本页
            </el-button>
            <el-button type="primary" size="small" @click="exportAllToExcel" plain>
              <i class="iconfont icon-daochu"></i>导出全部结果
            </el-button>
          </el-row>
          <el-row style="margin-top:20px;">
            <el-table :data="tableData">
              <el-table-column label="批次号" align="center" prop="batchnum"></el-table-column>
              <el-table-column label="借据号" align="center" prop="lncfno"></el-table-column>
              <el-table-column label="客户姓名" align="center" prop="custna"></el-table-column>
              <el-table-column label="证件号码" align="center" prop="cardno"></el-table-column>
              <el-table-column label="产品名称" align="center" prop="prodna"></el-table-column>
              <el-table-column label="逾期天数" align="center" prop="ovdays"></el-table-column>
              <el-table-column label="贷款形态" align="center" prop="clssst"></el-table-column>
              <el-table-column label="核销状态" align="center" prop="hxstus"></el-table-column>
              <el-table-column label="扣款状态" align="center" prop="deduct_status"></el-table-column>
              <el-table-column label="还款状态" align="center" prop="repaystus"></el-table-column>
              <el-table-column label="还款金额" align="center" prop="rpamount"></el-table-column>
              <el-table-column label="实际还款金额" align="center" prop="rrpamt"></el-table-column>
              <el-table-column label="操作" align="center">
                <template
                  slot-scope="scope"
                  v-if="scope.row.sfreduce==='1'&&
                scope.row.repaystus==='处理中'&&scope.row.deduct_status==='扣款成功'"
                >
                  <el-button type="text" @click="derateApply(scope)">减免</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-form>
        <div class="pagination">
          <el-pagination
            v-show="isShowPage"
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page="currentPage"
            :page-sizes="[10,15,20]"
            :page-size="tableSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableTotal"
          ></el-pagination>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import SingleUploadVue from "COM/SingleUploadVue";
export default {
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object // 父页面自定义参数与内置参数
  },
  name: "PersonBatchRepay",
  components: {
    SingleUploadVue
  },
  data() {
    return {
      activeNames: ["1", "2"],
      queryForm: {
        batchnum: "", //批次号
        lncfno: "", //贷款借据号
        custna: "", //客户名称
        cardno: "" //证件号码
      },
      filePath: "",
      isShowPage: false,
      currentPage: 1, //默认当前页码
      tableSize: 10, //默认每页条数
      tableTotal: -1, //总条数，初始值为负数校验用
      tableData: [], //表格数据
      repayStatuList: [],
      paystatuList: [], //扣款状态数组
      clssstList: [], //贷款状态字典列表
      yesnoList: [] //核销状态字典
    };
  },
  created() {},
  mounted() {
    this.getDictList("E_REPAYSTUS", "repayStatuList"); //还款状态字典
    this.getDictList("E_PAYSTUS", "paystatuList"); //扣款状态字典
    this.getDictList("E_CLSSST", "clssstList"); //贷款状态字典
    this.getDictList("E_YES___", "yesnoList"); //是否字典
  },
  methods: {
    /**
     *开始批量扣款
     *
     */
    batchRepay() {
      var params = {
        servicecode: "PLMSKGTS0133",
        filePath: this.filePath //文件路径
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (this.filePath === "") {
            let msg = "请上传文件";
            this.$msg({
              message: msg,
              type: "success"
            });
          }
          if (res && res.code === "200" && this.filePath !== "") {
            let msg = "扣款中，点击查询按钮可查看扣款进度";
            this.$msg({
              message: msg,
              type: "success"
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    },

    /**
     *查询批量扣款结果列表
     *
     */
    qryRepayResults(scope) {
      //查询所有结果从第一页开始查询
      var params = {
        servicecode: "PLMSKGTS0132",
        length: this.tableSize
      };
      if (scope === "all") {
        this.currentPage = 1;
        params.start = this.currentPage;
        // 条件查询按照条件从第一页开始
      } else if (scope === "condition") {
        params.batchnum = this.queryForm.batchnum; //批次号
        params.lncfno = this.queryForm.lncfno; //贷款借据号
        params.custna = this.queryForm.custna; //客户名称
        params.cardno = this.queryForm.cardno; //证件号码
        this.currentPage = 1;
        params.start = this.currentPage;

        // 分页查询从当前也开始查询
      } else {
        params.batchnum = this.queryForm.batchnum; //批次号
        params.lncfno = this.queryForm.lncfno; //贷款借据号
        params.custna = this.queryForm.custna; //客户名称
        params.cardno = this.queryForm.cardno; //证件号码
        params.start = this.currentPage;
      }

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

            this.tableData = data;
            this.isShowPage = true;
            this.tableTotal = res.pageParam ? res.pageParam.total : 0;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    // 下载Excel文件模板
    downExcelModel() {
      let reqMap = {
        type: "GRZHPLHK",
        servicecode: "PLMSKGTS0081",
        start: 1,
        length: 10
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap)
        .then(res => {
          if (res && res.code === "200") {
            if (res.data.length == 0) {
              this.$message({
                type: "warning",
                message: "该模板未上传，请到模板管理上传模板"
              });
              return;
            }
            let data = res.data[0];
            var filename = data.fileName + "." + data.fileType;
            let URL = this.dataUrlToBlob(data.filebase64, data.fileType);
            var a = document.createElement("a");
            a.download = filename;
            a.style.display = "none";
            a.href = window.URL.createObjectURL(URL);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },

    dataUrlToBlob(data, fileType) {
      var bstr = window.atob(data);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: fileType });
    },
    /**
     * 分页sizeChange 回调
     */
    sizeChange(val) {
      this.tableSize = val;
      this.qryRepayResults();
    },
    /**
     * 分页currentChange回调
     */
    currentChange(val) {
      this.currentPage = val;
      this.qryRepayResults();
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
          message: "请先查询还款列表"
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
      let str = `批次号,借据号,客户姓名,证件号码,产品名称,逾期天数,贷款形态,核销状态,扣款状态,还款状态,还款金额,实际还款金额\n`;
      let header = [
        "batchnum",
        "lncfno",
        "custna",
        "cardno",
        "prodna",
        "ovdays",
        "clssst",
        "hxstus",
        "deduct_status",
        "repaystus",
        "rpamount",
        "rrpamt"
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
      link.download = "个人账户批量还款结果列表.xls";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log(this.tableData);
    },
    // 跳转到减免申请页面
    derateApply(item) {
      this.$router.push({
        path: "/15/1501/150102",
        query: { lncfno: item.row.lncfno }
      });
    },
    /**
     *
     * 列表值转换
     */
    transformValue(list, val) {
      for (let index = 0; index < list.length; index++) {
        const item = list[index];
        if (val === item.dictId) return item.dictName;
      }
    },
    /**
     * 获取数据字典列表
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
            this[listKey] = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     *获取上传附件状态路径信息
     *
     */
    getFileStatu(formKey, path, fileStatu) {
      this.filePath = path;
    }
  }
};
</script>
<style lang="less" scoped>
.repay-upload {
  /deep/.el-form.custom-common--form {
    padding: 16px 0 16px 50px;
    .el-form-item__label {
      display: flex;
      justify-content: flex-start;
      width: 180px !important;
    }
    .el-form-item__content {
      margin-left: 180px !important;
      width: 200px;
    }
    .el-form-item {
      margin-bottom: 0px;
    }
  }
}
.model-down {
  margin-left: 100px;
  width: 300px;
  line-height: 66px;
  text-align: center;
  color: #6acc38;
  font-size: 13px;
  font-family: "Roboto", Helvetica Neue, Helvetica, Arial, sans-serif;
}
.export-button-style {
  padding-left: 30px;
  .el-button {
    background: #6ac044 !important;
    border-color: #6ac044 !important;
  }
}
.pagination {
  float: right;
  padding-top: 20px;
  padding-right: 20px;
}
</style>
