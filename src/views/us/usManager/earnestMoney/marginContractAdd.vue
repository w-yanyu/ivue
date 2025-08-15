<template>
  <div class="menu-form">
    <div class="menu-form--container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="custom-common--form">
        <el-row>

          <el-col :span="12">
            <el-form-item label="申请号" prop="appl_id" label-width="120px">
              <el-input class="input_el" v-model.number="ruleForm.appl_id" @blur="guarBaseAmtInput($event)" disabled>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="担保规则: " prop="sec_rule" label-width="120px">
              <el-select v-model="ruleForm.sec_rule" placeholder="请选择担保规则" @change="changeNameValue" disabled>
                <el-option v-for="item in sec_ruleOptions" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="质押人" prop="cust_name" label-width="120px">
              <el-input class="input_el" v-model.number="ruleForm.cust_name" @blur="guarBaseAmtInput($event)" disabled>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="币种: " prop="value_ccy " label-width="120px">
              <el-select v-model="ruleForm.value_ccy" placeholder="请选择币种" @change="changeStatusValue">
                <el-option v-for="item in value_ccyOptions" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="基础币种: " prop="base_ccy_cd" label-width="120px">
              <el-select v-model="ruleForm.base_ccy_cd" placeholder="请选择基础币种" @change="changeGuarTypeValue" disabled>
                <el-option v-for="item in base_ccy_cdOptions" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <!--   <el-col :span="12">
            <el-form-item label="关联保证金: " prop="credit" label-width="120px">
              <el-input placeholder="请添加关联" id="lookup" v-model.number="ruleForm.credit" disabled>
              </el-input>
            </el-form-item>
          </el-col> -->

          <el-col :span="12">
            <el-form-item label="合同金额" prop="value_price" label-width="120px">
              <el-input class="input_el" v-model.number="ruleForm.value_price" @blur="guarBaseAmtInput($event)"
                 type="number">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="折算汇率" prop="exc_rate" label-width="120px">
              <el-input class="input_el" v-model.number="ruleForm.exc_rate" disabled>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="折算基准币种" prop="base_amt" label-width="120px">
              <el-input class="input_el" v-model.number="ruleForm.base_amt" @blur="guarBaseAmtInput($event)"
                type="number">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="合同签订日期: " prop="sign_dt" label-width="120px">
              <el-date-picker v-model="ruleForm.sign_dt" type="date" placeholder="选择日期" format="yyyyMMdd"
                value-format="yyyyMMdd">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="合同起始日期: " prop="start_date" label-width="120px">
              <!-- <el-date-picker v-model="ruleForm.start_date" type="date" placeholder="选择日期" format="yyyyMMdd"
                style="width: 100%">
              </el-date-picker> -->
              <el-date-picker :disabled="edit" class="int" v-model="ruleForm.start_date" :picker-options="startDatePicker"
                type="date" placeholder="起始日期" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 100%">
              </el-date-picker>

            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="合同到期日期: " prop="end_date" label-width="120px">
              <!-- <el-date-picker v-model="ruleForm.end_date" type="date" placeholder="选择日期" format="yyyyMMdd">
            </el-date-picker> -->
              <el-date-picker :disabled="edit" class="int" v-model="ruleForm.end_date" :picker-options="endDatePicker"
                type="date" placeholder="结束日期" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12" hidden>
            <el-form-item label="债务人号" prop="cust_no" label-width="120px">
              <el-input class="input_el" v-model.number="ruleForm.cust_no" @blur="guarBaseAmtInput($event)" disabled>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12" hidden>
            <el-form-item label="保证金编号" prop="lnst_cd" label-width="120px">
              <el-input class="input_el" v-model.number="ruleForm.lnst_cd" @blur="guarBaseAmtInput($event)">
              </el-input>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row>
          <div class="divTitle"><span class="required">*</span>关联保证金:</div>

          <el-table ref="multipleTable" :data="tableData" highlight-current-row tooltip-effect="dark"
            style="width: 100%" max-height="150" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"> </el-table-column>
            <!--  <el-table-column label="申请号 " width="120" align="center" hidden>
              <template slot-scope="scope">{{ scope.row.appl_id }}</template>
            </el-table-column> -->
            <el-table-column prop="marg_no" label="保证金编号 " align="center">
            </el-table-column>
            <el-table-column prop="marg_acct_no" label="保证金账号 " align="center">
            </el-table-column>
            <el-table-column prop="marg_amt" label="保证金金额 " align="center">
            </el-table-column>
            <el-table-column prop="ccy_cd" label="保证金币种 " align="center" :formatter="ccyCdFormat">
            </el-table-column>
            <el-table-column prop="marg_acct_name" label="账户名称 " align="center">
            </el-table-column>
            <el-table-column prop="upbrchno" label="账户开户机构 " align="center">
            </el-table-column>
          </el-table>

        </el-row>



        <el-row class="menu-footer">
          <el-col :span="24">
            <el-button type="primary" size="small" @click="clickConfirm">提交</el-button>

          </el-col>

        </el-row>
      </el-form>
    </div>
  </div>

</template>
<script>
  import MyMessage from "pte-ui/utils/MyMessage";
  export default {
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
          appl_id: "", //申请号
          sec_rule: "O", //担保规则
          cust_name: "", //质押人
          value_ccy: "CNY", //币种
          base_ccy_cd: "CNY", //基础币种
          credit: "", //关联保证金
          value_price: "", //合同金额
          exc_rate: "1.00", //折算汇率
          base_amt: "", //折算基准币种
          sign_dt: "", //合同签订日期
          start_date: "", //合同起始日期
          end_date: "", //合同到期日期
          cust_no: "", //债务人号
          lnst_cd: "", //保证金编号
        },
        sec_ruleOptions: [],
        base_ccy_cdOptions: [],
        value_ccyOptions: [],
        isSingle: false, //是否是单人
        hoverIndex: -1, // 菜单hover索引
        activeLinkId: 0, // 当前激活的菜单id
        dialogVisible: false,
        lablePosition: "left",
        startDatePicker: this.beginDate(),
        endDatePicker: this.processDate(),
        pageNum: "",
        rules: {
          sec_rule: [{
            required: true,
            message: '请选择担保规则',
            trigger: 'blur'
          }],
          cust_name: [{
            required: true,
            message: '请输入质押人',
            trigger: 'blur'
          }],
          value_ccy: [{
            required: true,
            message: '请选择币种',
            trigger: 'blur'
          }],
          base_ccy_cd: [{
            required: true,
            message: '基础币种',
            trigger: 'blur'
          }],
          value_price: [{
            required: true,
            message: '请输入合同金额',
            trigger: 'blur'
          }],
           sign_dt: [{
            required: true,
            message: '请输入签订日期',
            trigger: 'blur'
          }],
           start_date: [{
            required: true,
            message: '请输入起始日期',
            trigger: 'blur'
          }],
           end_date: [{
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
      console.log('cParentParams', that.cParentParams);
      that.initSecRuleOptions();
      that.initGuarTypeOptions();
      that.initCcyCdOptions();
      that.initDefineData();
      that.initData();
    },
    methods: {
      initDefineData() {
        let that = this;
        that.ruleForm.appl_id = that.cParentParams.appl_id; //申请号
        // that.ruleForm.sec_rule = that.cParentParams.sec_rule; //担保规则
        that.ruleForm.sec_rule = "O"; //担保规则
        that.ruleForm.cust_name = that.cParentParams.cust_name; //质押人
        // that.ruleForm.value_ccy = that.cParentParams.value_ccy; //币种
        that.ruleForm.value_ccy = "CNY"; //币种
        // that.ruleForm.base_ccy_cd = that.cParentParams.base_ccy_cd; //基础币种
        that.ruleForm.base_ccy_cd = "CNY"; //基础币种
        that.ruleForm.credit = that.cParentParams.credit; //关联保证金
        that.ruleForm.value_price = that.cParentParams.value_price; //合同金额
        // that.ruleForm.exc_rate = that.cParentParams.exc_rate; //折算汇率
        that.ruleForm.base_amt = that.cParentParams.base_amt; //折算基准币种
        that.ruleForm.sign_dt = that.cParentParams.sign_dt; //合同签订日期
        that.ruleForm.start_date = that.cParentParams.start_date; //合同起始日期
        that.ruleForm.end_date = that.cParentParams.end_date; //合同到期日期
        that.ruleForm.cust_no = that.cParentParams.cust_no; //债务人号
      },
      //加载担保规则
      initSecRuleOptions() {
        let that = this;
        let request_map = {};
        let request_url = "/SUMP/rest/dict";
        request_map["dictType"] = "E_SECRULE2";
        request_map["dictKey"] = "E_SECRULE2";
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
      //加载基础币种
      initGuarTypeOptions() {
        let request_map = {};
        let request_url = "/SUMP/rest/dict";
        request_map["dictType"] = "MS_CURRENCY";
        request_map["dictKey"] = "MS_CURRENCY";
        this.$http
          .invokeAPI(request_url, "post", request_map)
          .then((response) => {
            if (response.code === "200") {
              // this.base_ccy_cdOptions = response.data;
              this.base_ccy_cdOptions = [{
                dictId: "CNY",
                dictName: "人民币",
                dictKey: 1
              }];
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
              // this.value_ccyOptions = response.data;
              this.value_ccyOptions = [{
                dictId: "CNY",
                dictName: "人民币",
                dictKey: 1
              }];
            } else {
              MyMessage({
                message: response.message,
                type: "error",
              });
            }
          });
      },

      //关联保人
      initData() {
        let that = this;
        let request_map = {};
        let request_url = "/SUMP/call/RPCCall";
        request_map["servicecode"] = "ICMSLNTS5720";
        request_map["appl_id"] = that.cParentParams.appl_id;
        this.$http
          .invokeAPI(request_url, "post", request_map)
          .then((response) => {
            console.log("cooperationSelect", response);
            if (response.code === "200") {
              console.log(response.data);
              that.tableData = response.data;
            } else {
              MyMessage({
                message: response.message,
                type: "error",
              });
            }
          });
      },
      changeGuarTypeValue(even) {
        let that = this;
        console.log("changeGuarTypeValue", even);
        if (even === "1") {
          that.isSingle = true;
          that.$refs.multipleTable.clearSelection();
          this.multipleSelection = [];
          that.ruleForm.guar_amt = "0.00"; //保证合同金额
          that.ruleForm.guar_base_amt = "0.00"; //合同金额（折算基准币种）
        } else {
          that.isSingle = false;
        }
        // that.$forceUpdate();

        console.log(that.isSingle);
      },
      handleSelectionChange(selection) {
        let that = this;
        that.multipleSelection = [];
        that.multipleSelection.push(selection[0]);
        if (selection.length > 1) {
          that.$refs.multipleTable.clearSelection();
          that.$refs.multipleTable.toggleRowSelection(selection.pop());
        }
        console.log("handleSelectionChange", this.multipleSelection);
        // console.log("selection", selection);
        console.log("marg_amt", that.multipleSelection[0].marg_amt);
        let total = that.fmtMoney(that.multipleSelection[0].marg_amt.toString());
        that.ruleForm.value_price = total;
        that.ruleForm.base_amt = total;
      },
      //格式转换
      ccyCdFormat(data) {
        switch (data.ccy_cd) {
          case '156':
            return '人民币'
        }
      },

      //提交接口
      clickConfirm() {
        let that = this;
        let request_map = {};
        let request_url = "/SUMP/icmcall/icmRPCCall";
        request_map["servicecode"] = "ICMSLNTS5709";
        request_map["cust_no"] = that.cParentParams.cust_no;
        request_map["appl_id"] = that.cParentParams.appl_id;
        request_map["sec_rule"] = that.ruleForm.sec_rule;
        request_map["cust_name"] = that.ruleForm.cust_name;
        request_map["value_ccy"] = that.ruleForm.value_ccy;
        request_map["base_ccy_cd"] = that.ruleForm.base_ccy_cd;
        request_map["value_price"] = that.ruleForm.value_price;
        request_map["exc_rate"] = that.ruleForm.exc_rate;
        request_map["base_amt"] = that.ruleForm.base_amt;
        request_map["sign_dt"] = that.ruleForm.sign_dt;
        request_map["start_date"] = that.ruleForm.start_date.toString().replace(/[\-]/g, '');
        request_map["end_date"] = that.ruleForm.end_date.toString().replace(/[\-]/g, '');
        request_map["guarMargInfo"] = that.multipleSelection
        that.$http
          .invokeAPI(request_url, "post", request_map)
          .then((response) => {
            console.log("cooperationSelect", response);
            if (response.code === "200") {
              console.log(response.data);
              that.$dataBus.doCallBack(that, response);
              MyMessage({
                message: "新增成功",
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
      clickCancel() {
        this.delData();
        this.$dialog.close();
      },
      delData() {
        let that = this;
        that.ruleForm.sec_rule = ""; //担保规则
        that.ruleForm.guar_type = ""; //担保类型
        that.ruleForm.ccy_cd = ""; //币种
        that.ruleForm.sign_dt = ""; //合同签订日期
        that.ruleForm.start_date = ""; //合同起始日期
        that.ruleForm.guar_amt = ""; //保证合同金额
        that.ruleForm.guar_base_amt = ""; //合同金额（折算基准币种）
        that.ruleForm.sec_occupy_amt = ""; //本次使用金额
        that.ruleForm.base_amt = ""; //本次使用金额(折算基准币种)
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

      //合同金额（折算基准币种）C
      guarBaseAmtInput(event) {
        let that = this;
        console.log(event);
        let value = that.fmtMoney(event.target.value);
        that.ruleForm.value_price = value;
        that.ruleForm.base_amt = value;
      },

      // 日期选择约束
      beginDate() {
        const self = this;
        return {
          disabledDate(time) {
            if (self.ruleForm.end_date) {
              //如果结束时间不为空，则小于结束时间
              return (
                new Date(self.ruleForm.end_date).getTime() < time.getTime()
              );
            } else {
              // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
            }
          }
        };
      },
      processDate() {
        const self = this;
        return {
          disabledDate(time) {
            if (self.ruleForm.start_date) {
              //如果开始时间不为空，则结束时间大于开始时间
              return (
                new Date(self.ruleForm.start_date).getTime() > time.getTime()
              );
            } else {
              // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
            }
          }
        };
      },

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


  }

  .el-form-item__content {
    text-align: left;
    width: 100%;
  }


  .scene-footer {
    margin-top: 10px;
  }

  .el-form-item__label {
    text-align: left;
    display: none;
  }

  .el-form-item__content {
    width: 100%;
    margin-left: 0 !important;
  }

  .scene-table--item {
    width: 100%;
  }

  .el-form-item__content {
    flex: 1;
    width: 100%;
    margin: 0 !important;
  }

  .el-input__inner {
    height: 32px;
  }

  .el-form-item__label {
    text-align: left;
    height: 34px;
    padding: 0 8px 0 0;
    font-size: 14px;
    line-height: 34px;
    color: #697b8c;
  }

  #lookup {
    width: 84%;
  }
</style>
