<template>
  <div class="menu-form">
    <div class="menu-form--container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="custom-common--form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="担保合同号" prop="colt_contract_no" label-width="203px">
              <el-input class="input_el" v-model="ruleForm.margin_contract_no">
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
            <el-form-item label="担保规则" prop="guar_rule" label-width="203px">
              <el-select v-model="ruleForm.guar_rule" placeholder="请选择担保规则" @change="changeNameValue">
                <el-option v-for="item in sec_ruleOptions" :key="item.dictId" :label="item.dictName"
                           :value="item.dictId">
                </el-option>
              </el-select>
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
          <div class="divTitle">保证金合同申请列表:</div>

          <el-table ref="multipleTable" :data="tableData" highlight-current-row tooltip-effect="dark"
                    style="width: 100%" max-height="328"
                    border="true" height="289" width="100%"
                    header-row-style="height:40px" row-style="height:40px"
                    v-loading="loading">
            <el-table-column prop="margin_contract_no" label="保证金合同号 " width="160" align="center"
                             :show-overflow-tooltip="true">
              <!-- <template slot-scope="scope">{{ scope.row.appt_no }}</template> -->
            </el-table-column>
            <el-table-column prop="max_contract_no" label="最高额担保合同号" width="160" align="center" v-if="maxGuarIsShow"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="debt_cust_name" label="被担保人" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="guar_rule" label="担保规则" align="center" :formatter="guarRuleFormat"
                             :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="contract_amt" label="合同金额" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column prop="base_this_use_amt" label="使用金额" align="center" :show-overflow-tooltip="true">
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
  name: "marginContract",
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
        margin_contract_no: "",//担保合同号
        apply_no: "", //业务申请号
        debt_cust_no: "", //被担保客户编号
        guar_rule: "O", //担保规则(默认选中普通担保)
        guar_start_date: "", //合同起始日期
        guar_end_date: "", //合同到期日期
      },
      sec_ruleOptions: [],// 担保规则下拉框
      contractStatusOptions: [], // 合同状态下拉框
      ccy_codeOptions: [],// 币种下拉框

      maxGuarIsShow: false,//最高担保表头是否展示
      loading: false,//加载中
      pageNum: "",
      // startDatePicker: this.beginDate(),
      // endDatePicker: this.processDate(),
      rules: {
        guar_rule: [{
          required: true,
          message: "请选择担保规则",
          trigger: "blur",
        },]
      },
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
    that.initSecRuleOptions();//加载担保规则
    that.initContractStatusOptions();//加载合同状态
    that.initCcyCdOptions();//加载币种
  },
  methods: {
    //加载担保规则
    initSecRuleOptions() {
      let that = this;
      let request_map = {};
      let request_url = "/SUMP/rest/dict";
      request_map["dictType"] = "AR_E_GUAR_RULE";
      request_map["dictKey"] = "AR_E_GUAR_RULE";
      this.$http
        .invokeAPI(request_url, "post", request_map)
        .then((response) => {
          if (response.code === "200") {
            console.log(response.data);
            that.sec_ruleOptions = response.data;
          } else {
            MyMessage({
              message: response.message,
              type: "error",
            });
          }
        });
    },
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
      request_map["servicecode"] = "ar0425";
      request_map["start"] = that.page.start;
      request_map["length"] = that.page.length;
      request_map["apply_no"] = that.cParentParams.apply_no;
      request_map["margin_contract_no"] = that.ruleForm.margin_contract_no;
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
            // that.$dataBus.doCallBack(that, response);
            //设置数据条数
            that.page.totalCount = response.pageParam.total;
            that.tableData = response.data;
            // 关闭加载图标
            that.loading = false;
            //  判断担保规则
            if (that.ruleForm.guar_rule === "O") {
              that.maxGuarIsShow = false;
            } else {
              that.maxGuarIsShow = true;
            }
          } else {
            MyMessage({
              message: response.message,
              type: "error",
            });
          }
          setTimeout(function () {
            //  判断担保规则
            if (that.ruleForm.guar_rule === "O") {
              that.maxGuarIsShow = false;
            } else {
              that.maxGuarIsShow = true;
            }
          }, 500);
          setTimeout(function () {
            // 关闭加载图标
            that.loading = false;
          }, 3000);
        });
      //  判断担保规则
      if (that.ruleForm.guar_rule === "O") {
        that.maxGuarIsShow = false;
      } else {
        that.maxGuarIsShow = true;
      }
    },
    restData() {
      let that = this;
      that.ruleForm.colt_contract_no = ""; //担保合同号
      that.ruleForm.apply_no = ""; //业务申请号
      that.ruleForm.debt_cust_no = ""; //被担保客户编号
      that.ruleForm.guar_rule = "O"; //担保规则
      that.ruleForm.guar_start_date = ""; //合同起始日期
      that.ruleForm.guar_end_date = ""; //合同到期日期
    },
    guarRuleFormat(row, column) {
      let name = "";
      let data = row[column.property];
      this.sec_ruleOptions.forEach(function (item, index) {
        if (data == item.dictId) {
          name = item.dictName;
        }
      })
      return name;
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
      pageParams.guar_contract_type = "3";
      pageParams.guar_type = "5";
      const option = {
        toRequest: {
          url: "@linkMaxContract",
          method: "get",
          params: pageParams
        },
        width: "70%",
        title: "合同信息",
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
