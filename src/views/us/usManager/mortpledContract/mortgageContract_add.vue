<template>
  <div class="menu-form">
    <div class="menu-form--title">添加抵押合同</div>
    <div class="menu-form--container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="custom-common--form">
        <el-row>
          <el-col :span="8">
            <el-form-item label="担保规则" prop="sec_rule" label-width="195px">
              <el-select v-model="ruleForm.sec_rule" placeholder="请选择担保规则" @change="changeNameValue">
                <el-option v-for="item in sec_ruleOptions" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="抵/质押人:" prop="sec_cust_no" label-width="195px">
              <div class="lookupDiv">
                <el-input v-model="ruleForm.sec_cust_no" disabled="true"></el-input>
                <el-button @click="clickLookup" type="success" plain>...</el-button>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="纠纷解决方式" prop="dispute_rslt" label-width="195px">
              <el-select v-model="ruleForm.dispute_rslt" placeholder="请选择纠纷解决方式">
                <el-option v-for="item in dispute_rsltOptions" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="币种:" prop="value_ccy" label-width="195px">
              <el-select v-model="ruleForm.value_ccy" placeholder="请选择币种">
                <el-option v-for="item in base_ccy_cdOptions" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="基准币种" prop="base_ccy_cd" label-width="195px">
              <el-select v-model="ruleForm.base_ccy_cd">
                <el-option v-for="item in base_ccy_cdOptions" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="折算汇率" prop="exc_rate" label-width="195px">
              <el-input v-model="ruleForm.exc_rate" disabled="true"  type="number"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="合同金额(元): " prop="value_price" label-width="195px">
              <el-input v-model="ruleForm.value_price" placeholder="请输入合同金额"  type="number"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="合同金额(折算基准币种):" prop="value_base_amt" label-width="195px">
              <el-input v-model="ruleForm.value_price" placeholder="请输入合同金额" disabled="true"  type="number"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="是否允许押品部分出库" prop="part_out_flag" label-width="195px">
              <el-select v-model="ruleForm.part_out_flag" placeholder="请选择是否允许押品部分出库">
                <el-option v-for="item in part_out_flagOptions" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="本次使用金额(元)：" prop="sec_occupy_amt" label-width="195px">
              <el-input v-model="ruleForm.sec_occupy_amt" placeholder="请输入本次使用金额"  type="number"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="本次使用金额(折算基准币种):" prop="base_amt" label-width="195px">
              <el-input v-model="ruleForm.sec_occupy_amt" disabled="true"  type="number"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="抵押担保类型" prop="mort_type" label-width="195px">
              <el-select v-model="ruleForm.mort_type" placeholder="请选择抵押担保类型">
                <el-option v-for="item in mort_typeOptions" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="合同签订日期" prop="sign_dt" label-width="195px">
              <el-date-picker v-model="ruleForm.sign_dt" type="date" placeholder="选择日期" format="yyyyMMdd"
                value-format="yyyyMMdd">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="合同起始日期: " prop="start_date" label-width="203px">
              <el-date-picker :disabled="edit" class="int" v-model="ruleForm.start_date" :picker-options="startDatePicker"
                type="date" placeholder="起始日期" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="合同到期日期: " prop="end_date" label-width="203px">
              <el-date-picker :disabled="edit" class="int" v-model="ruleForm.end_date" :picker-options="endDatePicker"
                type="date" placeholder="结束日期" format="yyyyMMdd" value-format="yyyyMMdd" style="width: 100%">
              </el-date-picker>

            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <div class="menu-form--title">
            <span class="required">*</span>关联抵质押品
          </div>
          <el-table ref="multipleTable" :data="tableData" highlight-current-row tooltip-effect="dark"
            style="width: 100%" max-height="150" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="抵押品编号 " align="center">
              <template slot-scope="scope">{{
                scope.row.colt_ppsl_id
              }}</template>
            </el-table-column>
            <el-table-column prop="colt_type" label="抵质押品种类" align="center">
            </el-table-column>
             <el-table-column prop="colt_type_name" label="抵质押品种类名称" align="center">
            </el-table-column>
            <el-table-column prop="colt_prod_cd" label="抵质押品产品  " align="center">
            </el-table-column>
            <el-table-column prop="colt_prod_name" label="抵质押品产品名称" align="center">
            </el-table-column>
            <el-table-column prop="sec_value" label="抵质押金额" align="center">
            </el-table-column>
          </el-table>
        </el-row>

        <el-row class="menu-footer">
          <el-col :span="24">
            <el-button type="primary" size="small" @click="clickConfirm">提交</el-button>

          </el-col>
        </el-row>
      </el-form>
      <el-dialog title="抵/质押人" :visible.sync="dialogVisible" width="70%" :before-close="handleClose" top="30vh" :append-to-body="true">
        <Lookup ref="Lookup" @closeDialog="closeDialog" :cParentParams="cParentParams" :type="ruleForm.type"></Lookup>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import MyMessage from "pte-ui/utils/MyMessage";
  import Lookup from "./mortgageContract_lookup.vue";

  export default {
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对象
    },
    components: {
      Lookup,
    },
    data() {
      return {
        ruleForm: {
          sec_rule: "", //担保规则
          dispute_rslt: "", //纠纷解决方式
          sec_cust_no: "", //抵质押人
          value_price: "", //合同金额
          value_base_amt: "", //合同金额（折算基准币种）
          part_out_flag: "", //是否允许押品部分出库
          sec_occupy_amt: "", //本次使用金额(元)
          base_amt: "", //本次使用金额（折算基准币种）
          mort_type: "", //抵押担保类型
          sign_dt: "", //合同签订日期
          start_date: "", //合同起始日期
          end_date: "", //合同到期日期
          value_ccy: "CNY", //币种
          base_ccy_cd: "CNY", //基准币种
          exc_rate: 1, //折算汇率
          type: "1", //lookup的查询类型：1：查询未被合同关联的产品，2：查询关联和未被关联的，3：查关联的
        },
        startDatePicker: this.beginDate(),
        endDatePicker: this.processDate(),
        showForm: true,
        title: "",
        type: "",
        rules: {
          sec_rule: [{
            required: true,
            message: "请选择担保规则",
            trigger: "blur",
          }, ],
          sec_cust_no: [{
            required: true,
            message: "请选择抵质/押人",
            trigger: "blur",
          }, ],
          dispute_rslt: [{
            required: true,
            message: "请选择纠纷解决方式",
            trigger: "blur",
          }, ],
          value_ccy: [{
            required: true,
            message: "请选择币种",
            trigger: "blur",
          }, ],
          value_price: [{
            required: true,
            message: "请输入合同金额",
            trigger: "blur",
          }, ],
          part_out_flag: [{
            required: true,
            message: "请选择是否允许押品部分出库",
            trigger: "blur",
          }, ],
          sec_occupy_amt: [{
            required: true,
            message: "请输入本次使用金额",
            trigger: "blur",
          }, ],
          mort_type: [{
            required: true,
            message: "请选择抵押担保类型",
            trigger: "blur",
          }, ],
          sign_dt: [{
            required: true,
            message: "请选择合同签订日期",
            trigger: "blur",
          }, ],
          start_date: [{
            required: true,
            message: "请选择合同起始日期",
            trigger: "blur",
          }, ],
          end_date: [{
            required: true,
            message: "请选择合同终止日期",
            trigger: "blur",
          }, ],
        },
        sec_ruleOptions: [], //担保规则字典选项
        dispute_rsltOptions: [], //纠纷解决方式字典
        value_ccyOptions: [],
        base_ccy_cdOptions: [{
          dictId: "CNY",
          dictName: "人民币",
          dictKey: 1
        }],
        part_out_flagOptions: [], //是否允许押品部分出库字典
        mort_typeOptions: [],

        hoverIndex: -1, // 菜单hover索引
        activeLinkId: 0, // 当前激活的菜单id
        pageNum: "",

        tableData: [], //表格数据集合
        multipleSelection: [], //选择抵质押品集合
        options: [], //字典集合
        dialogVisible: false, //显示查找对话框
      };
    },
    mounted() {
      let that = this;
      that.initsecRuleOptions("E_SECRULE2", "E_SECRULE2"); //初始化担保规则字典
      that.initdisputeRsltOptions("E_DISPUTERSLT", "E_DISPUTERSLT"); //加载纠纷解决方式字典
      that.initpartOutFlagOptions("E_PARTOUTFLAG", "E_PARTOUTFLAG"); //加载是否允许押品部分出库字典
      that.initmortTypeOptions("E_MORTTYPE", "E_MORTTYPE"); //抵押担保类型
      //that.initOptions("E_CRCYTP","E_CRCYTP","base_ccy_cdOptions"); //初始化币种字典
      that.initMortPledData(); //初始化抵质押品列表
      //that.initDefineData(); //初始化表单数据
      console.log("cParentParams", that.cParentParams);
    },
    methods: {
      //初始化表单数据
      initDefineData() {
        //let that = this;
        //that.sec_rule = that.cParentParams.sec_rule; //担保规则
        //that.sec_cust_no = that.cParentParams.sec_cust_no; //抵质押人
        //that.dispute_rslt = that.cParentParams.dispute_rslt; //纠纷解决方式
        //that.value_ccy = that.cParentParams.value_ccy; //币种
        //that.base_ccy_cd = that.cParentParams.base_ccy_cd; //基准币种
        //that.exc_rate = that.cParentParams.exc_rate; //折算汇率
        //that.value_price = that.cParentParams.value_price; //合同金额
        //that.value_base_amt = that.cParentParams.value_base_amt; //合同金额(折算基准币种)
        //that.part_out_flag = that.cParentParams.part_out_flag; //是否允许押品部分出库
        //that.sec_occupy_amt = that.cParentParams.sec_occupy_amt; //本次使用金额
        //that.base_amt = that.cParentParams.base_amt; //本次使用金额(折算基准币种)
        //that.mort_type = that.cParentParams.mort_type; //抵押担保类型
        //that.sign_dt = that.cParentParams.sign_dt; //合同签订日期
        //that.start_date = that.cParentParams.start_date; //合同起始日期
        //that.end_date = that.cParentParams.end_date; //合同到期日期
      },

      //加载字典
      initsecRuleOptions(dictType, dictKey) {
        let request_map = {};
        let request_url = "/SUMP/rest/dict";
        request_map["dictType"] = dictType;
        request_map["dictKey"] = dictKey;
        this.$http
          .invokeAPI(request_url, "post", request_map)
          .then((response) => {
            if (response.code === "200") {
              this.sec_ruleOptions = response.data;
            } else {
              MyMessage({
                message: response.message,
                type: "error",
              });
            }
          });
      },

      initdisputeRsltOptions(dictType, dictKey) {
        let request_map = {};
        let request_url = "/SUMP/rest/dict";
        request_map["dictType"] = dictType;
        request_map["dictKey"] = dictKey;
        this.$http
          .invokeAPI(request_url, "post", request_map)
          .then((response) => {
            if (response.code === "200") {
              this.dispute_rsltOptions = response.data;
            } else {
              MyMessage({
                message: response.message,
                type: "error",
              });
            }
          });
      },
      initpartOutFlagOptions(dictType, dictKey) {
        let request_map = {};
        let request_url = "/SUMP/rest/dict";
        request_map["dictType"] = dictType;
        request_map["dictKey"] = dictKey;
        this.$http
          .invokeAPI(request_url, "post", request_map)
          .then((response) => {
            if (response.code === "200") {
              this.part_out_flagOptions = response.data;
            } else {
              MyMessage({
                message: response.message,
                type: "error",
              });
            }
          });
      },
      initmortTypeOptions(dictType, dictKey) {
        let request_map = {};
        let request_url = "/SUMP/rest/dict";
        request_map["dictType"] = dictType;
        request_map["dictKey"] = dictKey;
        this.$http
          .invokeAPI(request_url, "post", request_map)
          .then((response) => {
            if (response.code === "200") {
              this.mort_typeOptions = response.data;
            } else {
              MyMessage({
                message: response.message,
                type: "error",
              });
            }
          });
      },

      //1.1初始化关联抵质押品
      initMortPledData() {
        let that = this;
        let request_map = {};
        let request_url = "/SUMP/call/RPCCall";
        request_map["servicecode"] = "ICMSLNTS6009";
        request_map["appl_id"] = that.cParentParams.appl_id;
        //request_map["colt_ctr_ppsl_id"] = that.cParentParams.colt_ctr_ppsl_id;
        request_map["sec_type"] = that.cParentParams.sec_type;
        request_map["type"] = that.ruleForm.type;
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
      //1.2选择要关联的抵质押品
      handleSelectionChange(selection) {
        this.multipleSelection = selection;
        this.sumTotal();
      },
      //1.3计算金额，回显到表单合同金额输入框中
      sumTotal() {
        let that = this;
        if (that.multipleSelection.length === 0) {
          return;
        }
        let total = 0;
        for (let i in that.multipleSelection) {
          total = parseFloat(that.multipleSelection[i].sec_value) + total;
        }
        total = that.fmtMoney(total);
        that.ruleForm.value_price = total; //合同金额
        //that.ruleForm.value_base_amt=total;//合同金额(折算基准币种)
      },
      //1.4处理金额的千分位等
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
      //1.5校验金额
      check_money(s) {
        s = s.replace(/,/g, "");
        var re = /^(\+|-)?\d+(.\d+)?$/i;
        return re.test(s);
      },
      clickLookup() {
        let that = this;
        that.dialogVisible = true;
      },
      //2、关闭lookup对话框
      closeDialog(item) {
        let that = this;
        that.dialogVisible = false;
        console.log("lookup 传过来的item", item);
        that.ruleForm.sec_cust_no = item;
      },

      //3、保存抵质押合同
      clickConfirm() {
        let that = this;
        let request_map = {};
        let request_url = "/SUMP/icmcall/icmRPCCall";
        request_map["servicecode"] = "ICMSLNTS5000";
        request_map["appl_id"] = that.cParentParams.appl_id;
        request_map["sec_type"] = that.cParentParams.sec_type;
        request_map["sec_rule"] = that.ruleForm.sec_rule;
        request_map["sec_cust_no"] = that.ruleForm.sec_cust_no;
        request_map["dispute_rslt"] = that.ruleForm.dispute_rslt;
        request_map["value_ccy"] = that.ruleForm.value_ccy;
        request_map["base_ccy_cd"] = that.ruleForm.base_ccy_cd;
        request_map["exc_rate"] = that.ruleForm.exc_rate;
        request_map["value_price"] = that.ruleForm.value_price;
        request_map["value_base_amt"] = that.ruleForm.value_price;
        request_map["part_out_flag"] = that.ruleForm.part_out_flag;
        request_map["sec_occupy_amt"] = that.ruleForm.sec_occupy_amt;
        request_map["base_amt"] = that.ruleForm.sec_occupy_amt;
        request_map["mort_type"] = that.ruleForm.mort_type;
        request_map["sign_dt"] = that.ruleForm.sign_dt;
        // request_map["start_date"] = that.ruleForm.start_date;
        // request_map["end_date"] = that.ruleForm.end_date;
        request_map["start_date"] = that.ruleForm.start_date.toString().replace(/[\-]/g, "");
        request_map["end_date"] = that.ruleForm.end_date.toString().replace(/[\-]/g, "");
        request_map["mortpledInfo"] = that.multipleSelection;
        this.$http
          .invokeAPI(request_url, "post", request_map)
          .then((response) => {
            console.log("cooperationSelect", response);
            if (response.code === "200") {
              console.log(response.data);
              that.$dataBus.doCallBack(this, response);
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
<style lang="less" scoped>
  .menu-form {
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;

    .menu-form--title {
      width: 100%;
      height: 40px;
      padding-left: 10px;
      duty_type: relative;
      line-height: 40px;

      &::before {
        content: "";
        width: 3px;
        height: 22px;
        display: block;
        duty_type: absolute;
        left: 0;
        top: 8px;
        background: #727df8;
      }
    }
  }

  .menu-footer {
    margin-top: 10px;
    text-align: center;
  }

  .lookupDiv {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .lookupDiv el-button {
    padding-left: 5px;
  }

  .required {
    color: red;
  }
</style>
