<template>
  <div class="menu-form">
    <div class="menu-form--container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="custom-common--form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="担保规则: " prop="sec_rule" label-width="203px">
              <el-select v-model="ruleForm.sec_rule" placeholder="请选择担保规则" @change="changeNameValue">
                <el-option v-for="item in sec_ruleOptions" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="担保类型: " prop="guar_type" label-width="203px">
              <el-select v-model="ruleForm.guar_type" placeholder="请选择担保类型" @change="changeGuarTypeValue">
                <el-option v-for="item in guar_typeOptions" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="币种: " prop="ccy_cd " label-width="203px">
              <el-select v-model="ruleForm.ccy_cd" placeholder="请选择币种" @change="changeStatusValue">
                <el-option v-for="item in ccy_cdOptions" :key="item.dictId" :label="item.dictName" :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="保证合同金额(元)" prop="guar_amt" label-width="203px">
              <el-input class="input_el" v-model.number="ruleForm.guar_amt" @blur="guarAmtInput($event)" type="number">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="合同金额（折算基准币种）" prop="guar_base_amt" label-width="203px">
              <el-input class="input_el" v-model.number="ruleForm.guar_base_amt" @blur="guarBaseAmtInput($event)"
                type="number">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="本次使用金额(元)：" prop="sec_occupy_amt" label-width="203px">
              <el-input class="input_el" v-model.number="ruleForm.sec_occupy_amt" placeholder="请输入本次使用金额"
                @blur="secOccupyAmtInput($event)" type="number"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="本次使用金额(折算基准币种)：" prop="base_amt" label-width="203px">
              <el-input class="input_el" v-model.number="ruleForm.base_amt" :disabled="true"
                @blur="baseAmtInput($event)" type="number">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="合同签订日期: " prop="sign_dt" label-width="203px">
              <el-date-picker v-model="ruleForm.sign_dt" type="date" placeholder="选择日期" format="yyyyMMdd"
                value-format="yyyyMMdd">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="合同起始日期: " prop="start_date" label-width="203px">
              <el-date-picker :disabled="edit" class="int" v-model="ruleForm.start_date" :picker-options="startDatePicker"
                type="date" placeholder="起始日期" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="合同到期日期: " prop="end_date" label-width="203px">
              <el-date-picker :disabled="edit" class="int" v-model="ruleForm.end_date" :picker-options="endDatePicker"
                type="date" placeholder="结束日期" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <div class="divTitle"><span class="required">*</span>关联保证人:</div>

          <el-table ref="multipleTable" :data="tableData" highlight-current-row tooltip-effect="dark"
            style="width: 100%" max-height="150" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="保证人编号 " align="center">
              <template slot-scope="scope">{{ scope.row.appt_id }}</template>
            </el-table-column>
            <el-table-column prop="cust_name" label="保证人名称 " align="center">
            </el-table-column>
            <el-table-column prop="guar_amt" label="保证金额 " align="center">
            </el-table-column>
            <el-table-column prop="guar_ccy" label="币种 " align="center" :formatter="guarCcyFormat">
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
    data() {
      return {
        ruleForm: {
          sec_rule: "", //担保规则
          guar_type: "1", //担保类型
          ccy_cd: "CNY", //币种
          guar_amt: "", //保证合同金额
          guar_base_amt: "", //合同金额（折算基准币种）
          sec_occupy_amt: "", //本次使用金额
          base_amt: "", //本次使用金额(折算基准币种)
          sign_dt: "", //合同签订日期
          start_date: "", //合同起始日期
          end_date: "", //合同到期日期
        },
        sec_ruleOptions: [],
        guar_typeOptions: [],
        ccy_cdOptions: [],
        isSingle: false, //是否是单人
        hoverIndex: -1, // 菜单hover索引
        activeLinkId: 0, // 当前激活的菜单id

        lablePosition: "left",
        startDatePicker: this.beginDate(),
        endDatePicker: this.processDate(),
        pageNum: "",
        rules: {
          sec_rule: [{
            required: true,
            message: "请选择担保规则",
            trigger: "blur",
          }, ],
          guar_type: [{
            required: true,
            message: "请选择担保类型",
            trigger: "blur",
          }, ],
          guar_amt: [{
            required: true,
            message: "请输入保证金金额",
            trigger: 'blur',
          }],
          sec_occupy_amt: [{
              required: true,
              message: "请输入本次使用金额",
              trigger: 'blur',
            }

          ],
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
      that.initSecRuleOptions();
      that.initGuarTypeOptions();
      that.initCcyCdOptions();
      that.initData();
      that.initDefineData();
      console.log("cParentParams", that.cParentParams);
    },
    methods: {
      initDefineData() {
        let that = this;
        that.ruleForm.sec_rule = that.cParentParams.sec_rule; //担保规则
        that.ruleForm.guar_type = that.cParentParams.guar_type; //担保类型
        // that.ruleForm.ccy_cd = that.cParentParams.ccy_cd; //币种
        that.ruleForm.sign_dt = that.cParentParams.sign_dt; //合同签订日期
        that.ruleForm.start_date = that.cParentParams.start_date; //合同起始日期
        that.ruleForm.end_date = that.cParentParams.end_date; //合同到期日期
        that.ruleForm.guar_amt = that.cParentParams.guar_amt; //保证合同金额
        that.ruleForm.guar_base_amt = that.cParentParams.guar_base_amt; //合同金额（折算基准币种）
        that.ruleForm.sec_occupy_amt = that.cParentParams.sec_occupy_amt; //本次使用金额
        that.ruleForm.base_amt = that.cParentParams.base_amt; //本次使用金额(折算基准币种)
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
      //加载担保类型
      initGuarTypeOptions() {
        let request_map = {};
        let request_url = "/SUMP/rest/dict";
        request_map["dictType"] = "E_GUARTYPE";
        request_map["dictKey"] = "E_GUARTYPE";
        this.$http
          .invokeAPI(request_url, "post", request_map)
          .then((response) => {
            if (response.code === "200") {
              this.guar_typeOptions = response.data;
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
        request_map["dictType"] = "E_CCYCD";
        request_map["dictKey"] = "E_CCYCD";
        this.$http
          .invokeAPI(request_url, "post", request_map)
          .then((response) => {
            if (response.code === "200") {
              console.log(response.data);
              // this.ccy_cdOptions = response.data;
              this.ccy_cdOptions = [{
                dictId: "CNY",
                dictName: "人民币",
                dictKey: 1,
              }, ];
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
        request_map["servicecode"] = "ICMSLNTS5706";
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
        if (this.multipleSelection.length > 0) {
          this.sumTotal();
        }
      },

      clickCancel() {
        this.delData();
        this.$dialog.close();
      },
      //提交接口
      clickConfirm() {
        let that = this;
        let request_map = {};
        let request_url = "/SUMP/icmcall/icmRPCCall";
        request_map["servicecode"] = "ICMSLNTS5700";
        request_map["appl_id"] = that.cParentParams.appl_id;
        request_map["sec_rule"] = that.ruleForm.sec_rule;
        request_map["guar_type"] = that.ruleForm.guar_type;
        request_map["ccy_cd"] = that.ruleForm.ccy_cd;
        request_map["sign_dt"] = that.ruleForm.sign_dt;
        request_map["start_date"] = that.ruleForm.start_date.toString().replace(/[\-]/g, "");
        request_map["end_date"] = that.ruleForm.end_date.toString().replace(/[\-]/g, "");
        request_map["guar_amt"] = that.ruleForm.guar_amt;
        request_map["guar_base_amt"] = that.ruleForm.guar_base_amt;
        request_map["sec_occupy_amt"] = that.ruleForm.sec_occupy_amt;
        request_map["base_amt"] = that.ruleForm.base_amt;
        request_map["guarMargInfo"] = that.multipleSelection;
        request_map["guar_ctr_ppsl_id"] = that.cParentParams.guar_ctr_ppsl_id;
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

      sumTotal() {
        let that = this;
        let total = 0;
        if (that.multipleSelection.length !== 0) {
          for (let i in that.multipleSelection) {
            total = parseFloat(that.multipleSelection[i].guar_amt) + total;
          }
        }
        total = that.fmtMoney(total.toString());
        that.ruleForm.guar_amt = total; //保证合同金额
        that.ruleForm.guar_base_amt = total; //合同金额（折算基准币种）
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
        for (let i in that.ccy_cdOptions) {
          if (data.guar_ccy === that.ccy_cdOptions[i].dictId) {
            return that.ccy_cdOptions[i].dictName;
          }
        }
      },
      //保证合同金额A
      guarAmtInput(event) {
        let that = this;
        console.log(event);
        let value = that.fmtMoney(event.target.value);
        that.ruleForm.guar_amt = value; //保证合同金额
        that.ruleForm.guar_base_amt = value; //合同金额（折算基准币种）
      },
      //合同金额（折算基准币种）C
      guarBaseAmtInput(event) {
        let that = this;
        console.log(event);
        let value = that.fmtMoney(event.target.value);
        that.ruleForm.guar_amt = value; //保证合同金额
        that.ruleForm.guar_base_amt = value; //合同金额（折算基准币种）
      },
      //本次使用金额B
      secOccupyAmtInput(event) {
        let that = this;
        console.log(event);
        let value = that.fmtMoney(event.target.value);
        that.ruleForm.sec_occupy_amt = value; //本次使用金额
        that.ruleForm.base_amt = value; //本次使用金额(折算基准币种)
      },
      //本次使用金额(折算基准币种)：D
      baseAmtInput(event) {
        let that = this;
        console.log(event);
        let value = that.fmtMoney(event.target.value);
        that.ruleForm.sec_occupy_amt = value; //本次使用金额
        that.ruleForm.base_amt = value; //本次使用金额(折算基准币种)
      },
      // 日期选择约束
      beginDate() {
        const self = this;
        return {
          disabledDate(time) {
            if (self.ruleForm.end_date) {
              //如果结束时间不为空，则小于结束时间
              return new Date(self.ruleForm.end_date).getTime() < time.getTime();
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
            if (self.ruleForm.start_date) {
              //如果开始时间不为空，则结束时间大于开始时间
              return new Date(self.ruleForm.start_date).getTime() > time.getTime();
            } else {
              // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
            }
          },
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
