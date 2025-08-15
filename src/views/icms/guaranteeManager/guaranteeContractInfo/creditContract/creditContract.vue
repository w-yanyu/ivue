<template>
  <div class="menu-form">
    <div class="menu-form--container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="custom-common--form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="担保合同号" prop="colt_contract_no" label-width="203px">
              <el-input class="input_el" v-model="ruleForm.credit_contract_no">
              </el-input>
            </el-form-item>
          </el-col>



          <el-col :span="12">
            <el-form-item label="被担保客户编号" prop="debt_cust_no" label-width="203px">
              <el-input class="input_el" v-model="ruleForm.debt_cust_no">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="合同起始日期: " prop="guar_start_date" label-width="203px">
              <!-- <el-date-picker v-model="ruleForm.guar_start_date" type="date" placeholder="选择日期" format="yyyyMMdd"
                style="width: 100%">
              </el-date-picker> -->
              <el-date-picker class="int" v-model="ruleForm.guar_start_date" :picker-options="startDatePicker"
                              type="date" placeholder="起始日期" format="yyyyMMdd" value-format="yyyyMMdd"
                              style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="合同到期日期: " prop="guar_end_date" label-width="203px">
              <!-- <el-date-picker v-model="ruleForm.guar_end_date" type="date" placeholder="选择日期" format="yyyyMMdd">
            </el-date-picker> -->
              <el-date-picker class="int" v-model="ruleForm.guar_end_date" :picker-options="endDatePicker"
                              type="date" placeholder="结束日期" format="yyyyMMdd" value-format="yyyyMMdd"
                              style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="menu-footer" :span="12" style="text-align: center">
          <el-button type="primary" @click="clickConfirm">查询</el-button>
          <el-button @click="restData">{{$i18ns('重置')}}</el-button>
        </el-row>

        <el-divider></el-divider>

        <el-row>
          <div class="divTitle">信用合同申请列表:</div>

          <el-table ref="multipleTable" :data="tableData" highlight-current-row tooltip-effect="dark"
                    style="width: 100%" max-height="328"
                    border="true" height="289" width="100%"
                    header-row-style="height:40px" row-style="height:40px"
                    v-loading="loading">
            <el-table-column prop="credit_contract_no" label="信用合同号 " width="160" align="center"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="debt_cust_name" label="被担保人" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="credit_amt" label="信用金额" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="exchange_rate" label="汇率" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="base_ccy" label="基准币种" align="center" :formatter="cyyFormat"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="guar_start_date" label="起始日期" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="guar_end_date" label="到期日期" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
              align="center"
              label="操作"
              :show-overflow-tooltip="true">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="openContactDialog(scope.$index, scope.row)" style="color: #1890FF;">{{$i18ns('详情')}}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row style="text-align: right">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.start"
            :page-sizes="[10, 20, 30, 40, 50, 100]"
            :page-size="page.length"
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.totalCount"
            style="margin: 0 10px">
          </el-pagination>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
//财务报表自定义
import MyMessage from "pte-ui/utils/MyMessage";

export default {
  name: "creditContract",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对象
  },
  components: {},
  data() {
    return {
      ruleForm: {
        credit_contract_no: "",//信用合同号
        apply_no: "", //业务申请号
        debt_cust_no: "", //被担保客户编号
        guar_start_date: "", //合同起始日期
        guar_end_date: "", //合同到期日期
      },
      contractStatusOptions: [], // 合同状态下拉框
      ccy_codeOptions: [],// 币种下拉框

      loading: false,//加载中
      page: {
        totalCount: 0,
        length: 10,
        start: 1
      },
      tableData: [],
    };
  },
  mounted() {
    let that = this;
    that.initContractStatusOptions();//加载合同状态
    that.initCcyCdOptions();//加载币种
  },
  methods: {
    //加载担保类型
    initContractStatusOptions() {
      let request_map = {};
      let request_url = "/SUMP/rest/dict";
      request_map["dictType"] = "AR_E_STATE";
      request_map["dictKey"] = "AR_E_STATE";
      this.$http
        .invokeAPI(request_url, "post", request_map)
        .then((response) => {
          if (response.code === "200") {
            this.contractStatusOptions = response.data;
          } else {
            MyMessage({
              message: response.message,
              type: "error",
            });
          }
        });
    },
    //加载币种
    initCcyCdOptions() {
      let request_map = {};
      let request_url = "/SUMP/rest/dict";
      request_map["dictType"] = "MS_CURRENCY";
      request_map["dictKey"] = "MS_CURRENCY";
      this.$http
        .invokeAPI(request_url, "post", request_map)
        .then((response) => {
          if (response.code === "200") {
            console.log(response.data);
            this.ccy_codeOptions = response.data;
          } else {
            MyMessage({
              message: response.message,
              type: "error",
            });
          }
        });
    },
    clickConfirm() {
      let that = this;
      // 显示加载图标
      that.loading = true;
      let request_map = {};
      let request_url = "/SUMP/icmcall/icmRPCCall";
      request_map["servicecode"] = "ar0383";
      request_map["start"] = that.page.start;
      request_map["length"] = that.page.length;
      request_map["apply_no"] = that.cParentParams.apply_no;
      request_map["credit_contract_no"] = that.ruleForm.credit_contract_no;
      request_map["debt_cust_no"] = that.ruleForm.debt_cust_no;
      request_map["guar_rule"] = that.ruleForm.guar_rule;
      request_map["guar_start_date"] = that.ruleForm.guar_start_date
        .toString()
        .replace(/[\-]/g, "");
      request_map["guar_end_date"] = that.ruleForm.guar_end_date
        .toString()
        .replace(/[\-]/g, "");
      that.$http
        .invokeAPI(request_url, "post", request_map)
        .then((response) => {
          if (response.code === "200") {
            console.log(response.data);
            //设置数据条数
            that.page.totalCount = response.pageParam.total;
            that.tableData = response.data;
            // 关闭加载图标
            that.loading = false;
          } else {
            MyMessage({
              message: response.message,
              type: "error",
            });
          }
          setTimeout(function () {
            // 关闭加载图标
            that.loading = false;
          }, 3000);
        });
    },
    restData() {
      let that = this;
      that.ruleForm.credit_contract_no = ""; //担保合同号
      that.ruleForm.apply_no = ""; //业务申请号
      that.ruleForm.debt_cust_no = ""; //被担保客户编号
      that.ruleForm.guar_start_date = ""; //合同起始日期
      that.ruleForm.guar_end_date = ""; //合同到期日期
    },
    cyyFormat(row, column) {
      let name = "";
      let data = row[column.property];
      this.ccy_codeOptions.forEach(function (item, index) {
        if (data == item.dictId) {
          name = item.dictName;
        }
      })
      return name;
    },
    guarContractFormat(row, column) {
      let name = "";
      let data = row[column.property];
      this.contractStatusOptions.forEach(function (item, index) {
        if (data == item.dictId) {
          name = item.dictName;
        }
      })
      return name;
    },
    openContactDialog(index, row) {
      let that = this;
      let pageParams = row;
      pageParams.guar_type = "6";
      const option = {
        toRequest: {
          url: "/views/icms/guaranteeManager/guaranteeContractManager/guarContractApply/guarantyContractlApplyDetail/guar_contract_apply_detail.json",
          method: "get",
          params: pageParams
        },
        width: "70%",
        title: "信用合同信息",
        that: this,
      };
      this.$dialog.open(option);
    },
    handleSizeChange(val) {
      let that = this;
      that.page.length = val;
      this.clickConfirm();
    },
    handleCurrentChange(val) {
      let that = this;
      that.page.start = val;
      this.clickConfirm();
    }
  },
};
</script>
<style lang="css" scoped>
.menu-form {
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.menu-form--title {
  width: 100%;
  height: 40px;
  padding-left: 10px;
  duty_type: relative;
  line-height: 40px;
}

.menu-form--title

&
::before {
  content: "";
  width: 3px;
  height: 22px;
  display: block;
  duty_type: absolute;
  left: 0;
  top: 8px;
  background: #727df8;
}

.menu-footer {
  margin-top: 20px;
  text-align: center;
}

.page_content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "PingFang SC";
}

.divTitle {
  width: 100%;
  text-align: left;
}

.required {
  color: red;
}

.tableDiv {
  width: 100%;
}

.input_el {
  width: 100%;
}

/deep/ .el-form {
  overflow: hidden;

.scene-table--item {
  width: 100%;

.el-form-item__content {
  text-align: left;
  width: 100%;
}

.el-form-item__label {
  text-align: left;
  display: none;
}

.el-form-item__content {
  width: 100%;
  margin-left: 0 !important;
}

}

.el-form-item__content {
  flex: 1;
  width: 100%;
  margin: 0 !important;

.el-input__inner {
  height: 32px;
}

}

.el-form-item__label {
  text-align: left;
  height: 34px;
  padding: 0 8px 0 0;
  font-size: 14px;
  line-height: 34px;
  color: #697b8c;
}

}

.scene-footer {
  margin-top: 10px;
}
</style>
