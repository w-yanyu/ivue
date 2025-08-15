<template>
  <div class="menu-form">
    <div class="menu-form--container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="custom-common--form">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$i18ns('担保规则')" prop="guar_rule" label-width="203px">
              <el-select v-model="ruleForm.guar_rule" :placeholder="$i18ns('请选择担保规则')" @change="changeNameValue" disabled>
                <el-option v-for="item in sec_ruleOptions" :key="item.dictId" :label="item.dictName" :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item :label="$i18ns('质押人')" prop="cust_name" label-width="203px">
              <el-input class="input_el" v-model.number="ruleForm.cust_name" @blur="guarBaseAmtInput($event)" disabled>
              </el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item :label="$i18ns('币种')" prop="ccy_code " label-width="203px">
              <el-select v-model="ruleForm.ccy_code" :placeholder="$i18ns('请选择币种')" >
                <el-option v-for="item in ccy_codeOptions" :key="item.dictId" :label="item.dictName" :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item :label="$i18ns('保证合同金额')" prop="contract_amt" label-width="203px">
              <el-input class="input_el" disabled="true" v-model.number="ruleForm.contract_amt"
                @blur="guarAmtInput($event)" type="number">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item :label="$i18ns('合同金额(折算基准币种)')" prop="contract_base_amt" label-width="203px">
              <el-input class="input_el" disabled="true" v-model.number="ruleForm.contract_base_amt"
                @blur="guarBaseAmtInput($event)" type="number">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item :label="$i18ns('本次使用金额')" prop="this_use_amt" label-width="203px">
              <el-input class="input_el" v-model.number="ruleForm.this_use_amt" :placeholder="$i18ns('请输入本次使用金额')"
                @blur="secOccupyAmtInput($event)" type="number" disabled></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item :label="$i18ns('本次使用金额(折算基准币种)')" prop="base_this_use_amt" label-width="203px">
              <el-input class="input_el" v-model.number="ruleForm.base_this_use_amt" disabled="true"
                @blur="baseAmtInput($event)" type="number">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item :label="$i18ns('合同签订日期')" prop="sign_date" label-width="203px">
              <el-date-picker v-model="ruleForm.sign_date" type="date" :placeholder="$i18ns('选择日期')" format="yyyyMMdd"
                value-format="yyyyMMdd" :disabled=fieldSwitch>
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item :label="$i18ns('合同起始日期')" prop="guar_start_date" label-width="203px">
              <!-- <el-date-picker v-model="ruleForm.guar_start_date" type="date" placeholder="选择日期" format="yyyyMMdd"
                style="width: 100%">
              </el-date-picker> -->
              <el-date-picker class="int" v-model="ruleForm.guar_start_date" :picker-options="startDatePicker" type="date"
              :placeholder="$i18ns('起始日期')" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 100%" :disabled=fieldSwitch>
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item :label="$i18ns('合同到期日期')" prop="guar_end_date" label-width="203px">
              <!-- <el-date-picker v-model="ruleForm.guar_end_date" type="date" placeholder="选择日期" format="yyyyMMdd">
            </el-date-picker> -->
              <el-date-picker class="int" v-model="ruleForm.guar_end_date" :picker-options="endDatePicker" type="date"
               :placeholder="$i18ns('结束日期')" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 100%" :disabled=fieldSwitch>
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <div class="divTitle"><span class="required">*</span>{{$i18ns('关联保证金')}}</div>

          <el-table ref="multipleTable" :data="tableData" highlight-current-row tooltip-effect="dark" style="width: 100%"
            max-height="150" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" :selectable=selectInit> </el-table-column>
            <!--  <el-table-column label="申请号 " width="120" align="center" hidden>
              <template slot-scope="scope">{{ scope.row.apply_no }}</template>
            </el-table-column> -->
            <el-table-column prop="margin_no" :label="$i18ns('保证金编号') " align="center">
            </el-table-column>
            <el-table-column prop="margin_acct" :label="$i18ns('保证金账号') " align="center">
            </el-table-column>
            <el-table-column prop="margin_amt" :label="$i18ns('保证金金额') " align="center">
            </el-table-column>
            <el-table-column prop="ccy_code" :label="$i18ns('保证金币种') " align="center" :formatter="ccyCdFormat">
            </el-table-column>
            <el-table-column prop="account_name" :label="$i18ns('账户名称') " align="center">
            </el-table-column>
          </el-table>

        </el-row>

        <el-row class="menu-footer">
          <el-col :span="24">
            <el-button type="primary" @click="clickConfirm">{{$i18ns('修改')}}</el-button>

          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
//财务报表自定义
import MyMessage from "pte-ui/utils/MyMessage";

export default {
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对象
  },
  components: {},
  watch: {
    'parentGuarRule': {
      handler() {
        let that = this;
        if (that.parentGuarRule === 'O') {
          that.fieldSwitch = false;
        } else {
          that.fieldSwitch = true;
        }
      },
      // immediate: true
    }
  },
  created() {
    this.parentGuarRule = this.cParentParams.guar_rule;
  },
  data() {
    return {
      ruleForm: {
        guar_rule: "", //担保规则
        cust_name: "", //质押人
        ccy_code: "", //币种
        contract_amt: "", //保证合同金额
        contract_base_amt: "", //合同金额（折算基准币种）
        this_use_amt: "", //本次使用金额
        base_this_use_amt: "", //本次使用金额(折算基准币种)
        sign_date: "", //合同签订日期
        guar_start_date: "", //合同起始日期
        guar_end_date: "", //合同到期日期
      },
      sec_ruleOptions: [],
      ccy_codeOptions: [],
      isSingle: false, //是否是单人

      hoverIndex: -1, // 菜单hover索引
      activeLinkId: 0, // 当前激活的菜单id
      pageNum: "",
      lablePosition: "left",

      fieldSwitch: false, // 字段置灰控制
      parentGuarRule: "",
      startDatePicker: this.beginDate(),
      endDatePicker: this.processDate(),
      rules: {
        guar_rule: [{
          required: false,
          message: "请选择担保规则",
          trigger: "blur",
        },],
        cust_name: [{
          required: false,
          message: "请输入质押人",
          trigger: "blur",
        },],
        contract_amt: [{
          required: false,
          message: "请输入保证金金额",
          trigger: 'blur',
        }],
        this_use_amt: [{
          required: false,
          message: "请输入本次使用金额",
          trigger: 'blur',
        }
        ],
        sign_date: [{
          required: true,
          message: '请输入签订日期',
          trigger: 'blur'
        }],
        guar_start_date: [{
          required: true,
          message: '请输入起始日期',
          trigger: 'blur'
        }],
        guar_end_date: [{
          required: true,
          message: '请输入结束日期',
          trigger: 'blur'
        }],
      },
      tableData: [],
      multipleSelection: [],
    };
  },
  mounted() {
    let that = this;
    that.initSecRuleOptions();//加载担保规则
    that.initCcyCdOptions();//加载币种
    that.initData();
    that.initDefineData();
    console.log("cParentParams", that.cParentParams);
  },
  methods: {
    initDefineData() {
      let that = this;
      // let guar_end_date = that.cParentParams.guar_end_date.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3"); //合同到期日期
      // console.log('guar_end_date', guar_end_date);
      that.ruleForm.guar_rule = that.cParentParams.guar_rule; //担保规则
      that.ruleForm.cust_name = that.cParentParams.cust_name; //质押人
      that.ruleForm.ccy_code =  that.cParentParams.ccy_code; //币种
      that.ruleForm.sign_date = that.cParentParams.sign_date//合同签订日期
      that.ruleForm.guar_start_date = that.cParentParams.guar_start_date; //合同起始日期
      that.ruleForm.guar_end_date = that.cParentParams.guar_end_date; //合同到期日期
      that.ruleForm.contract_amt = that.cParentParams.contract_amt; //保证合同金额
      that.ruleForm.contract_base_amt = that.cParentParams.contract_base_amt; //合同金额（折算基准币种）
      that.ruleForm.this_use_amt = that.cParentParams.this_use_amt; //本次使用金额
      that.ruleForm.base_this_use_amt = that.cParentParams.base_this_use_amt; //本次使用金额(折算基准币种)
    },
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
    //格式转换
    ccyCdFormat(data) {
      let that = this;
      for (let i in that.ccy_codeOptions) {
        if (data.ccy_code === that.ccy_codeOptions[i].dictId) {
          return that.ccy_codeOptions[i].dictName;
        }
      }
    },
    //关联保证金
    initData() {
      let that = this;
      let request_map = {};
      let request_url = "/SUMP/call/RPCCall";
      request_map["servicecode"] = "ar0404";
      request_map["apply_no"] = that.cParentParams.apply_no;
      request_map["margin_contract_no"] = that.cParentParams.margin_contract_no;
      request_map["query_type"] = "1";

      this.$http
        .invokeAPI(request_url, "post", request_map)
        .then((response) => {
          console.log("cooperationSelect", response);
          if (response.code === "200") {
            console.log(response.data);
            that.tableData = response.data;
            for (let i in that.tableData) {
              if (
                that.tableData[i].guar_contract_no !== "" &&
                that.tableData[i].guar_contract_no !== null
              ) {
                console.log(
                  "guar_contract_no",
                  that.tableData[i].guar_contract_no
                );
                that.$nextTick(() => {
                  that.$refs.multipleTable.toggleRowSelection(
                    that.tableData[i]
                  );
                });
              }
            }
          } else {
            MyMessage({
              message: response.message,
              type: "error",
            });
          }
        });
    },
    //规整币种数据
    guarCcyFormat(data) {
      let that = this;
      for (let i in that.ccy_codeOptions) {
        if (data.ccy_code === that.ccy_codeOptions[i].dictId) {
          return that.ccy_codeOptions[i].dictName;
        }
      }
    },
    //保证类型事件
    changeGuarTypeValue(even) {
      let that = this;
      console.log("changeGuarTypeValue", even);
      if (even === "1") {
        that.isSingle = true;
        that.$refs.multipleTable.clearSelection();
        that.ruleForm.contract_amt = "0.00"; //保证合同金额
        that.ruleForm.contract_base_amt = "0.00"; //合同金额（折算基准币种）
      } else {
        that.isSingle = false;
      }
      // that.$forceUpdate();

      console.log(that.isSingle);
    },
    handleSelectionChange(selection) {
      // this.multipleSelection = val;

      if (!this.isSingle) {
        this.multipleSelection = selection;
      } else {
        this.multipleSelection = [];
        this.multipleSelection.push(selection[0]);
        if (selection.length > 1) {
          this.$refs.multipleTable.clearSelection();
          this.$refs.multipleTable.toggleRowSelection(selection.pop());
        }
      }
      console.log("handleSelectionChange", this.multipleSelection);
      console.log("selection", selection);
      this.sumTotal();
    },

    clickCancel() {
      this.delData();
      this.$dialog.close();
    },
    clickConfirm() {
      let that = this;
      let request_map = {};
      let request_url = "/SUMP/icmcall/icmRPCCall";
      request_map["servicecode"] = "ar0422";
      request_map["margin_contract_no"] = that.cParentParams.margin_contract_no;
      request_map["apply_no"] = that.cParentParams.apply_no;
      request_map["guar_rule"] = that.ruleForm.guar_rule;
      request_map["ccy_code"] = that.ruleForm.ccy_code;
      request_map["sign_date"] = that.ruleForm.sign_date.toString()
        .replace(/[\-]/g, "");
      request_map["guar_start_date"] = that.ruleForm.guar_start_date
        .toString()
        .replace(/[\-]/g, "");
      request_map["guar_end_date"] = that.ruleForm.guar_end_date
        .toString()
        .replace(/[\-]/g, "");
      request_map["contract_amt"] = that.ruleForm.contract_amt;
      request_map["contract_base_amt"] = that.ruleForm.contract_base_amt;
      request_map["this_use_amt"] = that.ruleForm.this_use_amt;
      request_map["base_this_use_amt"] = that.ruleForm.base_this_use_amt;
      request_map["marginInfo"] = that.multipleSelection;
      that.$http
        .invokeAPI(request_url, "post", request_map)
        .then((response) => {
          if (response.code === "200") {
            console.log(response.data);
            that.$dataBus.doCallBack(that, response);
            MyMessage({
              message: "修改成功",
              type: "success",
            });
          } else {
            MyMessage({
              message: response.message,
              type: "error",
            });
          }
        });
    },
    delData() {
      let that = this;
      that.ruleForm.guar_rule = ""; //担保规则
      that.ruleForm.cust_name = ""; //质押人
      that.ruleForm.ccy_code = ""; //币种
      that.ruleForm.sign_date = ""; //合同签订日期
      that.ruleForm.guar_start_date = ""; //合同起始日期
      that.ruleForm.contract_amt = ""; //保证合同金额
      that.ruleForm.contract_base_amt = ""; //合同金额（折算基准币种）
      that.ruleForm.this_use_amt = ""; //本次使用金额
      that.ruleForm.base_this_use_amt = ""; //本次使用金额(折算基准币种)
    },

    sumTotal() {
      let that = this;
      let total = 0;
      if (that.multipleSelection.length === 0) {
        that.ruleForm.contract_amt = total; //保证合同金额
        that.ruleForm.contract_base_amt = total; //合同金额（折算基准币种）
        that.ruleForm.this_use_amt = total; //本次使用金额
        that.ruleForm.base_this_use_amt = total; //本次使用金额（折算基准币种）
        return;
      }
      for (let i in that.multipleSelection) {
        total = parseFloat(that.multipleSelection[i].margin_amt) + total;
      }
      total = that.fmtMoney(total.toString());
      that.ruleForm.contract_amt = total; //保证合同金额
      that.ruleForm.contract_base_amt = total; //合同金额（折算基准币种）
      that.ruleForm.this_use_amt = total; //本次使用金额
      that.ruleForm.base_this_use_amt = total; //本次使用金额（折算基准币种）
    },
    /*处理金额的千分位等*/
    fmtMoney(field) {
      let fmtValue = field;
      let len = 2;
      if (!isNaN(fmtValue)) {
        //是数字才处理
        if (fmtValue.length > 0 && fmtValue !== 0 && this.check_money(field)) {
          if (fmtValue.indexOf(".") > 0) {
            let valueArray = fmtValue.split(".");
            let intV = valueArray[0];
            let fltV = valueArray[1];
            for (let i = fltV.length; i < len; i++) {
              fltV = fltV + "0";
            }
            if (fltV.length > len) {
              fltV = fltV.substring(0, len);
            }
            field = intV + "." + fltV;
            //field.value =addComma(field.value);
          } else {
            field = fmtValue + ".00";
            //field.value =addComma(field.value);
          }
        }
      } else {
        field = 0;
      }
      return field;
    },
    check_money(s) {
      s = s.replace(/,/g, "");
      var re = /^(\+|-)?\d+(.\d+)?$/i;
      return re.test(s);
    },
    //规整币种数据
    guarCcyFormat(data) {
      let that = this;
      for (let i in that.ccy_codeOptions) {
        if (data.guar_ccy === that.ccy_codeOptions[i].dictId) {
          return that.ccy_codeOptions[i].dictName;
        }
      }
    },
    //保证合同金额
    guarAmtInput(event) {
      let that = this;
      let value = that.fmtMoney(event.target.value);
      that.ruleForm.contract_amt = value; //保证合同金额
      that.ruleForm.contract_base_amt = value; //合同金额（折算基准币种）
    },
    //合同金额（折算基准币种）
    guarBaseAmtInput(event) {
      let that = this;
      let value = that.fmtMoney(event.target.value);
      that.ruleForm.contract_amt = value; //保证合同金额
      that.ruleForm.contract_base_amt = value; //合同金额（折算基准币种）
    },
    //本次使用金额
    secOccupyAmtInput(event) {
      let that = this;
      console.log(event);
      let value = that.fmtMoney(event.target.value);
      that.ruleForm.this_use_amt = value; //本次使用金额
      that.ruleForm.base_this_use_amt = value; //本次使用金额(折算基准币种)
    },
    //本次使用金额(折算基准币种)：
    baseAmtInput(event) {
      let that = this;
      console.log(event);
      let value = that.fmtMoney(event.target.value);
      that.ruleForm.this_use_amt = value; //本次使用金额
      that.ruleForm.base_this_use_amt = value; //本次使用金额(折算基准币种)
    },
    // 日期选择约束
    beginDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.ruleForm.guar_end_date) {
            //如果结束时间不为空，则小于结束时间
            return new Date(self.ruleForm.guar_end_date).getTime() < time.getTime();
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        },
      };
    },
    processDate() {
      const self = this;
      return {
        disabledDate(time) {
          if (self.ruleForm.guar_start_date) {
            //如果开始时间不为空，则结束时间大于开始时间
            return new Date(self.ruleForm.guar_start_date).getTime() > time.getTime();
          } else {
            // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        },
      };
    },
    selectInit(row, index) {
      if (this.parentGuarRule === 'O') {
        return true  //可勾选
      } else {
        return false  //不可勾选
      }
    }
  }
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

.menu-form--title &::before {
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
