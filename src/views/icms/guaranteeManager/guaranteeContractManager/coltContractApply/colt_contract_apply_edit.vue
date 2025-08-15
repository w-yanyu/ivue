<template>
  <div class="menu-form">
    <div class="menu-form--title">{{$i18ns('添加抵押合同')}}</div>
    <div class="menu-form--container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="custom-common--form">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$i18ns('担保规则')" prop="guar_rule" label-width="195px">
              <el-select v-model="ruleForm.guar_rule" :placeholder="$i18ns('请选择担保规则')" @change="changeNameValue" :disabled=fieldSwitch>
                <el-option v-for="item in guar_ruleOptions" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$i18ns('抵/质押人')" prop="guar_cust_no" label-width="195px">
              <div class="lookupDiv" >
                <el-input v-model="ruleForm.guar_cust_no" disabled="true"></el-input>
                <el-button @click="clickLookup" type="success" plain :disabled=fieldSwitch>...</el-button>
              </div>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$i18ns('纠纷解决方式')" prop="dispute_way" label-width="195px">
              <el-select v-model="ruleForm.dispute_way" :placeholder="$i18ns('请选择纠纷解决方式')" :disabled=fieldSwitch>
                <el-option v-for="item in dispute_wayOptions" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$i18ns('基准币种')" prop="base_ccy" label-width="195px">
              <el-select v-model="ruleForm.base_ccy" disabled="true">
                <el-option v-for="item in base_ccyOptions" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$i18ns('币种')" prop="ccy_code" label-width="195px">
              <el-select v-model="ruleForm.ccy_code" :placeholder="$i18ns('请选择币种')" :disabled=fieldSwitch>
                <el-option v-for="item in base_ccyOptions" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$i18ns('折算汇率')" prop="exchange_rate" label-width="195px">
              <el-input v-model="ruleForm.exchange_rate" disabled="true" type="number"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$i18ns('合同金额')" label-width="195px" prop="contract_amt">
              <scene-currency v-model="ruleForm.contract_amt" disabled="true" :placeholder="$i18ns('请输入合同金额')" type="number"></scene-currency>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$i18ns('合同金额(折算基准币种)')" prop="contract_base_amt" label-width="195px">
              <scene-currency v-model="ruleForm.contract_amt" :placeholder="$i18ns('请输入合同金额')" disabled="true" type="number"></scene-currency>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$i18ns('是否允许押品部分出库')" prop="is_part_out" label-width="195px">
              <el-select v-model="ruleForm.is_part_out" :placeholder="$i18ns('请选择是否允许押品部分出库')" :disabled=fieldSwitch>
                <el-option v-for="item in is_part_outOptions" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$i18ns('本次使用金额')" prop="this_use_amt" label-width="195px">
              <scene-currency v-model="ruleForm.this_use_amt" :placeholder="$i18ns('请输入本次使用金额')" @input="secOccupyAmtInput($event)" type="number"></scene-currency>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$i18ns('本次使用金额(折算基准币种)')" prop="base_this_use_amt" label-width="195px">
              <scene-currency v-model="ruleForm.this_use_amt" disabled="true" type="number"></scene-currency>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$i18ns('抵押担保类型')" prop="pledged_type" label-width="195px">
              <el-select v-model="ruleForm.pledged_type" :placeholder="$i18ns('请选择抵押担保类型')" :disabled=fieldSwitch>
                <el-option v-for="item in pledged_typeOptions" :key="item.dictId" :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$i18ns('合同签订日期')" prop="sign_date" label-width="195px">
              <el-date-picker v-model="ruleForm.sign_date" type="date" :placeholder="$i18ns('选择日期')" format="yyyyMMdd"
                value-format="yyyyMMdd" :disabled=false>

              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$i18ns('合同起始日期')" prop="guar_start_date" label-width="195px">
              <el-date-picker class="int" v-model="ruleForm.guar_start_date" :picker-options="startDatePicker"
                type="date" :placeholder="$i18ns('起始日期')" :disabled=false format="yyyyMMdd" value-format="yyyyMMdd" style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item :label="$i18ns('合同到期日期')" prop="guar_end_date" label-width="195px">
              <el-date-picker  class="int" v-model="ruleForm.guar_end_date" :picker-options="endDatePicker"
                type="date" :placeholder="$i18ns('结束日期')" :disabled=false format="yyyyMMdd" value-format="yyyyMMdd" style="width: 100%">
              </el-date-picker>

            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <div class="menu-form--title">
            <span class="required">*</span>{{$i18ns('关联抵质押品')}}
          </div>
          <el-table ref="multipleTable" :data="tableData" highlight-current-row tooltip-effect="dark"
            style="width: 100%" max-height="150" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"  :selectable=selectInit> </el-table-column>
            <el-table-column :label="$i18ns('抵押品编号') " align="center">
              <template slot-scope="scope">{{
                scope.row.colt_no
              }}</template>
            </el-table-column>
            <el-table-column prop="colt_type" :label="$i18ns('抵质押品种类')" align="center">
            </el-table-column>
             <el-table-column prop="colt_type_name" :label="$i18ns('抵质押品种类名称')" align="center">
            </el-table-column>
            <el-table-column prop="colt_prod_cd" :label="$i18ns('抵质押品产品')  " align="center">
            </el-table-column>
            <el-table-column prop="colt_prod_name" :label="$i18ns('抵质押品产品名称')" align="center">
            </el-table-column>

            <el-table-column prop="colt_amount" :label="$i18ns('抵质押金额')" align="center">
            </el-table-column>

          </el-table>
        </el-row>

        <el-row class="menu-footer">
          <el-col :span="24">
            <el-button type="primary" size="small" @click="clickConfirm">{{$i18ns('提交')}}</el-button>

          </el-col>
        </el-row>
      </el-form>
      <el-dialog :title="$i18ns('抵/质押人')" :visible.sync="dialogVisible" width="70%" :before-close="handleClose" top="30vh" :append-to-body="true">
        <Lookup ref="Lookup" @closeDialog="closeDialog" :cParentParams="cParentParams" :type="ruleForm.type"></Lookup>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import MyMessage from "pte-ui/utils/MyMessage";
  import MyAxios from "pte-ui/utils/MyAxios";
  import Lookup from "./colt_contract_apply_lookup.vue";
  import SceneCurrency from "../../../../components/SceneCurrency"; //金额格式化
  export default {
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对象
    },
    components: {
      Lookup,
      SceneCurrency
    },
    watch:{
      'parentGuarRule': {
        handler() {
          let that = this;
          if (that.parentGuarRule === 'O'){
            that.fieldSwitch = false;
          }else{
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
          dispute_way: "", //纠纷解决方式
          guar_cust_no: "", //抵质押人
          contract_amt: "", //合同金额
          contract_base_amt: "", //合同金额（折算基准币种）
          is_part_out: "", //是否允许押品部分出库
          this_use_amt: "", //本次使用金额(元)
          base_this_use_amt: "", //本次使用金额（折算基准币种）
          pledged_type: "", //抵押担保类型
          sign_date: "", //合同签订日期
          guar_start_date: "", //合同起始日期
          guar_end_date: "", //合同到期日期
          ccy_code: "", //币种
          base_ccy: "", //基准币种
          exchange_rate: 1, //折算汇率,
          type: "2", //lookup的查询类型：1：查询未被合同关联的产品，2：查询关联和未被关联的，3：查关联的
        },
        fieldSwitch: false, // 字段置灰控制
        parentGuarRule: "",
        startDatePicker: this.beginDate(),
        endDatePicker: this.processDate(),
        showForm: true,
        title: "",
        type: "",
        rules: {
          guar_rule: [{
            required: true,
            message: "请选择担保规则",
            trigger: "blur",
          }, ],
          guar_cust_no: [{
            required: true,
            message: "请选择抵质/押人",
            trigger: "blur",
          }, ],
          dispute_way: [{
            required: true,
            message: "请选择纠纷解决方式",
            trigger: "blur",
          }, ],
          ccy_code: [{
            required: true,
            message: "请选择币种",
            trigger: "blur",
          }, ],
          contract_amt: [{
            required: true,
            message: "请输入合同金额",
            trigger: "blur",
          }, ],
          is_part_out: [{
            required: true,
            message: "请选择是否允许押品部分出库",
            trigger: "blur",
          }, ],
          this_use_amt: [{
            required: true,
            message: "请输入本次使用金额",
            trigger: "blur",
          }, ],
          pledged_type: [{
            required: true,
            message: "请选择抵押担保类型",
            trigger: "blur",
          }, ],
          sign_date: [{
            required: true,
            message: "请选择合同签订日期",
            trigger: "blur",
          }, ],
          guar_start_date: [{
            required: true,
            message: "请选择合同起始日期",
            trigger: "blur",
          }, ],
          guar_end_date: [{
            required: true,
            message: "请选择合同终止日期",
            trigger: "blur",
          }, ],
        },
        guar_ruleOptions: [], //担保规则字典选项
        dispute_wayOptions: [], //纠纷解决方式字典
        ccy_codeOptions: [],
        base_ccyOptions: [],
        is_part_outOptions: [], //是否允许押品部分出库字典
        pledged_typeOptions: [],

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
      that.initsecRuleOptions("AR_E_GUAR_RULE", "AR_E_GUAR_RULE"); //初始化担保规则字典
      that.initdisputeRsltOptions("AR_E_DISPUTE_WAY", "AR_E_DISPUTE_WAY"); //加载纠纷解决方式字典
      that.getDictList("MS_CURRENCY","ccy_codeOptions");
      that.getDictList("MS_CURRENCY","base_ccyOptions");
      that.initpartOutFlagOptions("MS_E_YESORNO", "MS_E_YESORNO"); //加载是否允许押品部分出库字典
      that.initmortTypeOptions("AR_E_PLEDGED_TYPE", "AR_E_PLEDGED_TYPE"); //抵押担保类型
      //that.initOptions("E_CRCYTP","E_CRCYTP","base_ccyOptions"); //初始化币种字典
      that.initMortPledData(); //初始化抵质押品列表
      that.initDefineData(); //初始化表单数据
      console.log("cParentParams", that.cParentParams);
    },
    methods: {
      //初始化表单数据
      initDefineData() {
        let that = this;
        that.ruleForm.guar_rule = that.cParentParams.guar_rule; //担保规则
        that.ruleForm.guar_cust_no = that.cParentParams.guar_cust_no; //抵质押人
        that.ruleForm.dispute_way = that.cParentParams.dispute_way; //纠纷解决方式
        that.ruleForm.ccy_code = that.cParentParams.ccy_code; //币种
        that.ruleForm.base_ccy = that.cParentParams.base_ccy; //基准币种
        that.ruleForm.exchange_rate = that.cParentParams.exchange_rate; //折算汇率
        that.ruleForm.contract_amt = that.cParentParams.contract_amt; //合同金额
        that.ruleForm.contract_base_amt = that.cParentParams.contract_amt; //合同金额(折算基准币种)
        console.log("contract_amt", that.cParentParams.contract_amt);
        console.log("contract_amt", that.ruleForm.contract_amt);
        console.log("contract_base_amt", that.ruleForm.contract_base_amt);
        that.ruleForm.is_part_out = that.cParentParams.is_part_out; //是否允许押品部分出库
        that.ruleForm.this_use_amt = that.cParentParams.this_use_amt; //本次使用金额
        that.ruleForm.base_this_use_amt = that.cParentParams.this_use_amt; //本次使用金额(折算基准币种)
        that.ruleForm.pledged_type = that.cParentParams.pledged_type; //抵押担保类型
        that.ruleForm.sign_date = that.cParentParams.sign_date; //合同签订日期
        that.ruleForm.guar_start_date = that.cParentParams.guar_start_date; //合同起始日期
        that.ruleForm.guar_end_date = that.cParentParams.guar_end_date; //合同到期日期
        // that.ruleForm.sign_date = that.cParentParams.sign_date.replace(
        //   /^(\d{4})(\d{2})(\d{2})$/,
        //   "$1-$2-$3"
        // ); //合同签订日期
        // that.ruleForm.guar_start_date = that.cParentParams.guar_start_date.replace(
        //   /^(\d{4})(\d{2})(\d{2})$/,
        //   "$1-$2-$3"
        // ); //合同起始日期
        // that.ruleForm.guar_end_date = that.cParentParams.guar_end_date.replace(
        //   /^(\d{4})(\d{2})(\d{2})$/,
        //   "$1-$2-$3"
        // ); //合同到期日期
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
              this.guar_ruleOptions = response.data;
            } else {
              MyMessage({
                message: response.message,
                type: "error",
              });
            }
          });
      },
   /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
     getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType],
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
            console.log("下拉列表"+JSON.stringify(this[listKey]));
          }
        })
        .catch(err => {
          console.error(err);
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
              this.dispute_wayOptions = response.data;
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
              this.is_part_outOptions = response.data;
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
              this.pledged_typeOptions = response.data;
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
        request_map["servicecode"] = "ar0343";
        request_map["apply_no"] = that.cParentParams.apply_no;
        request_map["guar_type"] = that.cParentParams.guar_type;
        request_map["colt_contract_no"] = that.cParentParams.colt_contract_no;
        request_map["type"] = that.ruleForm.type;
        this.$http
          .invokeAPI(request_url, "post", request_map)
          .then((response) => {
            console.log("cooperationSelect", response);
            if (response.code === "200") {
              console.log(response.data);
              that.tableData = response.data;
              for (let i in that.tableData) {
                if (
                  that.tableData[i].colt_contract_no !== "" &&
                  that.tableData[i].colt_contract_no !== null
                ) {
                  console.log(
                    "colt_contract_no",
                    that.tableData[i].colt_contract_no
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
          total = parseFloat(that.multipleSelection[i].colt_amount) + total;
        }
        total = that.fmtMoney(total.toString());
        that.ruleForm.contract_amt = total; //合同金额
        //that.ruleForm.contract_base_amt=total;//合同金额(折算基准币种)
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
        that.ruleForm.guar_cust_no = item;
      },

      //3、保存抵质押合同
      clickConfirm() {
        let that = this;
        let request_map = {};
        let request_url = "/SUMP/icmcall/icmRPCCall";
        request_map["servicecode"] = "ar0362";
        request_map["apply_no"] = that.cParentParams.apply_no;
        request_map["colt_contract_no"] = that.cParentParams.colt_contract_no;
        request_map["guar_type"] = that.cParentParams.guar_type;
        request_map["guar_rule"] = that.ruleForm.guar_rule;
        request_map["guar_cust_no"] = that.ruleForm.guar_cust_no;
        request_map["colt_contract_no"] = that.cParentParams.colt_contract_no;
        request_map["dispute_way"] = that.ruleForm.dispute_way;
        request_map["ccy_code"] = that.ruleForm.ccy_code;
        request_map["base_ccy"] = that.ruleForm.base_ccy;
        request_map["exchange_rate"] = that.ruleForm.exchange_rate;
        request_map["contract_amt"] = that.ruleForm.contract_amt;
        request_map["contract_base_amt"] = that.ruleForm.contract_base_amt;
        request_map["is_part_out"] = that.ruleForm.is_part_out;
        request_map["this_use_amt"] = that.ruleForm.this_use_amt;
        request_map["base_this_use_amt"] = that.ruleForm.base_this_use_amt;
        request_map["pledged_type"] = that.ruleForm.pledged_type;
        request_map["sign_date"] = that.ruleForm.sign_date;
        // request_map["guar_start_date"] = that.ruleForm.guar_start_date;
        // request_map["guar_end_date"] = that.ruleForm.guar_end_date;
        request_map["guar_start_date"] = that.ruleForm.guar_start_date.toString().replace(/[\-]/g, "");
        request_map["guar_end_date"] = that.ruleForm.guar_end_date.toString().replace(/[\-]/g, "");
        request_map["coltRealInfo"] = that.multipleSelection;
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
      //本次使用金额
      secOccupyAmtInput(value) {
        console.log(event);
        let that = this;
        that.ruleForm.base_this_use_amt = value * that.ruleForm.exchange_rate; //本次使用金额(折算基准币种)
      },
      // 日期选择约束
      beginDate() {
        const self = this;
        return {
          disabledDate(time) {
            if (self.ruleForm.guar_end_date) {
              //如果结束时间不为空，则小于结束时间
              return (
                new Date(self.ruleForm.guar_end_date).getTime() < time.getTime()
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
            if (self.ruleForm.guar_start_date) {
              //如果开始时间不为空，则结束时间大于开始时间
              return (
                new Date(self.ruleForm.guar_start_date).getTime() > time.getTime()
              );
            } else {
              // return time.getTime() > Date.now()//开始时间不选时，结束时间最大值小于等于当天
            }
          }
        };
      },
      selectInit(row,index){
        if(this.parentGuarRule === 'O'){
          return true  //可勾选
        }else{
          return false  //不可勾选
        }
      }
    }
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
      position: relative;
      line-height: 40px;

      &::before {
        content: "";
        width: 3px;
        height: 22px;
        display: block;
        position: absolute;
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
