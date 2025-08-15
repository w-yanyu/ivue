<template>
  <div class="menu-form">
    <div class="menu-form--container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="custom-common--form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="授信通知书编号" prop="cl_no" label-width="150px">
              <el-input class="input_el" v-model="ruleForm.cl_no" disabled>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="基准币种: " prop="base_ccy" label-width="150px">
              <el-select v-model="ruleForm.base_ccy" placeholder="请选择基准币种" @change="changeGuarTypeValue" disabled>
                <el-option v-for="item in base_ccyOptions" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="授信金额(人民币)" prop="appv_busi_amt" label-width="150px">
              <el-input class="input_el" v-model="ruleForm.appv_busi_amt" @blur="appvBusiAmtInput($event)"
                type="number">
              </el-input>
              <!-- <el-input-number class="input_el" v-model.number="ruleForm.appv_busi_amt" @blur="appvBusiAmtInput($event)"
                :precision="2"></el-input-number> -->
            </el-form-item>
          </el-col>

          <!--          <el-col :span="12">-->
          <!--            <el-form-item label="(其中)低风险金额" prop="low_risk_amt" label-width="150px">-->
          <!--              <el-input class="input_el" v-model.number="ruleForm.low_risk_amt" type="number" disabled>-->
          <!--              </el-input>-->
          <!--            </el-form-item>-->
          <!--          </el-col>-->

          <el-col :span="12">
            <el-form-item label="主授信币种: " prop="ccy_cd" label-width="150px">
              <el-select v-model="ruleForm.ccy_cd" placeholder="请选主授信币种" @change="changeGuarTypeValue" disabled>
                <el-option v-for="item in ccy_cdOptions" :key="item.dictId" :label="item.dictName" :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="授信汇率" prop="exc_rate" label-width="150px">
              <el-input class="input_el" v-model.number="ruleForm.exc_rate" disabled type="number"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="授信金额(折基准币种)" prop="base_busi_amt" label-width="150px">
              <el-input class="input_el" v-model="ruleForm.base_busi_amt" disabled>
              </el-input>
            </el-form-item>
          </el-col>

       <!--   <el-col :span="12">
            <el-form-item label="申请起始日期: " prop="eff_dt" label-width="150px">
              <el-date-picker :disabled="edit" class="int" v-model="ruleForm.eff_dt" :picker-options="startDatePicker"
                type="date" placeholder="起始日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%">
              </el-date-picker>
              <el-date-picker v-model="ruleForm.eff_dt" clearable format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                style="width: 100%" :picker-options="startDatePicker" :disabled="dialogStatus=='view'" type="date"
                @blur="datePickerBlur($event)">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="申请终止日期: " prop="exp_dt" label-width="150px">
              <el-date-picker :disabled="edit" class="int" v-model="ruleForm.exp_dt" :picker-options="endDatePicker"
                type="date" placeholder="结束日期"  format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%">
              </el-date-picker>
              <el-date-picker v-model="ruleForm.exp_dt" clearable format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                style="width: 100%" :picker-options="endDatePicker" :disabled="dialogStatus=='view'" type="date"
                @blur="datePickerBlur($event)">
              </el-date-picker>
            </el-form-item>
          </el-col> -->

          <el-col :span="12">
            <el-form-item label="申请起始日期: " prop="eff_dt" label-width="150px">
             <el-date-picker v-model="ruleForm.eff_dt" clearable format="yyyy-MM-dd" value-format="yyyy-MM-dd"
               style="width: 100%"  type="date">
             </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="授信额度有效期(月)" prop="appv_tnr" label-width="150px">
             <!-- <el-input class="input_el" v-model.number="ruleForm.appv_tnr" disabled type="number">
              </el-input> -->
             <el-input-number  v-model.number="ruleForm.appv_tnr" controls-duty_type="right" ></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="授信资金用途" prop="ln_purpose_desc" label-width="150px">
              <el-input class="input_el" v-model="ruleForm.ln_purpose_desc">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="menu-footer">
          <el-col :span="24">
            <el-button type="primary" size="small" @click="clickConfirm">{{$i18ns('保存')}}</el-button>
            <!-- <el-button size="small" @click="clickCancel">{{$i18ns('返回')}}</el-button> -->
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
          cl_no: '', //授信通知书编号
          base_ccy: "1", //、
          appv_busi_amt: '', //授信金额(人民币)
          low_risk_amt: '', //(其中)低风险金额
          ccy_cd: '', //主授信币种
          exc_rate: '', //授信汇率
          base_busi_amt: '', //授信金额(折基准币种)
          eff_dt: '', //申请起始日期
          exp_dt: '', //申请终止日期
          appv_tnr: '', //授信额度有效期(月)
          ln_purpose_desc: '', //授信资金用途
        },
        base_ccyOptions: [], //基准币种
        ccy_cdOptions: [], //主授信币种
        lablePosition: "left",
        startDatePicker: this.beginDate(),
        endDatePicker: this.processDate(),
        rules: {
          appv_busi_amt: [{
            required: true,
            message: "请输入授信金额(人民币)",
            trigger: "blur",
          }, ],
          eff_dt: [{
            required: true,
            message: "申请起始日期不能为空",
            trigger: "blur",
          }, ],
          exp_dt: [{
            required: true,
            message: "申请终止日期不能为空",
            trigger: 'blur',
          }],
          appv_tnr: [{
            required: true,
            message: "授信额度有效期不能为空",
            trigger: 'blur',
          }],
          ln_purpose_desc: [{
              required: true,
              message: "授信资金用途不能为空",
              trigger: 'blur',
            },
            {
              max: 2000,
              message: "长度不能超过2000个字符",
              trigger: 'blur',
            }
          ],
        },
        tableData: [],
        multipleSelection: [],
      };
    },

    mounted() {
      let that = this;
      that.initDefineData();
      that.initSecRuleOptions();
      console.log("cParentParams", that.cParentParams);
      console.log("ruleForm", this.ruleForm);
    },
    methods: {
      initDefineData() {
        let that = this;
        let request_map = {};
        let appl_id = that.cParentParams.appl_id; //担保规则
        let request_url = "/SUMP/icmcall/icmRPCCall";
        request_map["servicecode"] = "qrcrin";
        request_map["appl_id"] = appl_id;
        this.$http
          .invokeAPI(request_url, "post", request_map)
          .then((response) => {
            if (response.code === "200") {
              console.log("initDefineData", response.data);
              that.ruleForm.cl_no = response.data.cl_no; //授信通知书编号
              that.ruleForm.base_ccy = response.data.base_ccy; //基准币种
              that.ruleForm.appv_busi_amt = response.data.appv_busi_amt; //授信金额(人民币)
              that.ruleForm.low_risk_amt = response.data.low_risk_amt; //(其中)低风险金额
              that.ruleForm.ccy_cd = response.data.ccy_cd; //主授信币种
              that.ruleForm.exc_rate = response.data.exc_rate; //授信汇率
              that.ruleForm.base_busi_amt = response.data.base_busi_amt.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g,
                '$1,'); //授信金额(折基准币种)
              that.ruleForm.eff_dt = response.data.eff_dt.replace(
                /^(\d{4})(\d{2})(\d{2})$/,
                "$1-$2-$3"); //申请起始日期
              that.ruleForm.exp_dt = response.data.exp_dt.replace(
                /^(\d{4})(\d{2})(\d{2})$/,
                "$1-$2-$3"); //申请终止日期
              that.ruleForm.appv_tnr = response.data.appv_tnr; //授信额度有效期(月)
              that.ruleForm.ln_purpose_desc = response.data.ln_purpose_desc; //授信资金用途
            } else {
              MyMessage({
                message: response.message,
                type: "error",
              });
            }
          });
      },
      //加载担保规则
      initSecRuleOptions() {
        let that = this;
        let request_map = {};
        let request_url = "/SUMP/rest/dict";
        request_map["dictType"] = "MS_CURRENCY";
        request_map["dictKey"] = "MS_CURRENCY";
        this.$http
          .invokeAPI(request_url, "post", request_map)
          .then((response) => {
            if (response.code === "200") {
              console.log(response.data);
              //  = response.data;
              // that.ccy_cdOptions = response.data;
              that.ccy_cdOptions = [{
                dictId: "CNY",
                dictName: "人民币",
                dictKey: 1,
              }, ];
              that.base_ccyOptions = that.ccy_cdOptions
            } else {
              MyMessage({
                message: response.message,
                type: "error",
              });
            }
          });
      },
      appvBusiAmtInput(event) {
        let that = this;
        let value = that.fmtMoney(event.target.value);
        console.log('11111', value.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,'));
        that.ruleForm.appv_busi_amt = value;
        that.ruleForm.base_busi_amt = value.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
      },


      //提交接口
      clickConfirm() {
        let that = this;
        let request_map = {};
        let request_url = "/SUMP/icmcall/icmRPCCall";
        request_map["servicecode"] = "upcrin";
        request_map["appl_id"] = that.cParentParams.appl_id;
        request_map["cl_no"] = that.ruleForm.cl_no;
        request_map["base_ccy"] = that.ruleForm.base_ccy;
        request_map["appv_busi_amt"] = that.ruleForm.appv_busi_amt;
        request_map["low_risk_amt"] = that.ruleForm.low_risk_amt;
        request_map["ccy_cd"] = that.ruleForm.ccy_cd;
        request_map["exc_rate"] = that.ruleForm.exc_rate;
        request_map["eff_dt"] = that.ruleForm.eff_dt.toString().replace(/[\-]/g, "");
        request_map["exp_dt"] = that.ruleForm.exp_dt.toString().replace(/[\-]/g, "");
        request_map["appv_tnr"] = that.ruleForm.appv_tnr;
        request_map["ln_purpose_desc"] = that.ruleForm.ln_purpose_desc;
        that.$http
          .invokeAPI(request_url, "post", request_map)
          .then((response) => {
            console.log("cooperationSelect", response);
            if (response.code === "200") {
              console.log(response.data);
              MyMessage({
                message: "保存成功",
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

      // 日期选择约束
      beginDate() {
        const self = this;
        return {
          disabledDate(time) {
            // console.log('exp_dt', self.ruleForm.exp_dt);
            if (self.ruleForm.exp_dt) {
              //如果结束时间不为空，则小于结束时间
              return new Date(self.ruleForm.exp_dt).getTime() < time.getTime();
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
            // console.log('eff_dt', self.ruleForm.eff_dt);
            if (self.ruleForm.eff_dt) {
              //如果开始时间不为空，则结束时间大于开始时间
              return new Date(self.ruleForm.eff_dt).getTime() > time.getTime();
            } else {
              // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
            }
          },
        };
      },
      datePickerBlur(event) {
        console.log('datePickerBlur', event);
        this.MonthsBetw(this.ruleForm.eff_dt, this.ruleForm.exp_dt);
      },
      monDiff(startTime, endTime) {
        startTime = new Date(startTime);
        endTime = new Date(endTime);
        var date2Mon;
        var startDate = startTime.getDate() + startTime.getHours() / 24 + startTime.getMinutes() / 24 / 60;
        var endDate = endTime.getDate() + endTime.getHours() / 24 + endTime.getMinutes() / 24 / 60;
        if (endDate >= startDate) {
          date2Mon = 0;
        } else {
          date2Mon = -1;
        }

        this.ruleForm.appv_tnr = (endTime.getYear - startTime.getYear()) * 12 + endTime.getMonth - startTime
          .getMonth() + date2Mon;
        console.log('appv_tnr', this.ruleForm.appv_tnr);
        // return (endTime.getYear - startTime.getYear()) * 12 + endTime.getMonth - startTime.getMonth() + date2Mon;
      },
      //返回两个日期相差的月数
      MonthsBetw(date1, date2) {
        //用-分成数组
        // date1 = date1.split("-");
        // date2 = date2.split("-");
        // //获取年,月数
        // var year1 = parseInt(date1[0]),
        //   month1 = parseInt(date1[1]),
        //   year2 = parseInt(date2[0]),
        //   month2 = parseInt(date2[1]),
        //   //通过年,月差计算月份差
        //   months = (year2 - year1) * 12 + (month2 - month1) + 1;
        this.ruleForm.appv_tnr = this.getOverYearDateMonth(date1, date2)
        // return months;
      },
      //根据两个日期计算月份 不满一月算一月 2020-01-01
      getOverYearDateMonth(d1, d2) {
        let totalyue = 0;
        let ri = parseInt(d2.split("-")[2].replace(/^0+/, "")) - parseInt(d1.split("-")[2].replace(/^0+/, ""));
        if (ri >= 0) {
          totalyue += 1;
        }
        let yue = parseInt(d2.split("-")[1].replace(/^0+/, "")) - parseInt(d1.split("-")[1].replace(/^0+/, ""));
        totalyue += yue;

        let nianyue = (parseInt(d2.split("-")[0].replace(/^0+/, "")) - parseInt(d1.split("-")[0].replace(/^0+/, ""))) *
          12;

       return  totalyue + nianyue;
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
  /deep/ .el-input-number .el-input__inner  {
    text-align: left;
  }
</style>
