<template>
  <div>
    <el-form :inline="true" :model="form" :rules="rules">
      <el-form-item label="分期类型">
        <el-select
          v-model="form.istlmt_tp"
          :placeholder="请选择"
          :disabled="true"
        >
          <el-option
            v-for="item in istlmtTpList"
            :key="item.dictId"
            :label="item.dictName"
            :value="item.dictId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分期金额" prop="txn_amt">
        <el-input-number
          :controls="false"
          v-model="form.txn_amt"
          :min="0"
          :disabled="this.selectedTableData.length !== 0"
        ></el-input-number>
      </el-form-item>
        <el-form-item label="最高可分期金额">
        <el-input-number
          :controls="false"
          v-model="form.max_amt"
          :min="0"
          :disabled="true"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="分期期数">
        <el-select
          clearable
          v-model="form.istlmt_prds"
          placeholder="请选择分期期数"
          @change="changeExtensionNum"
          @clear="clearExtensionSelected"
          :disabled="form.txn_amt === 0||form.txn_amt === null"
        >
          <el-option
            v-for="item in options"
            :key="item"
            :label="`${item}期`"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
<!--分期测算-->


    <el-collapse v-model="activeNames">
      <el-collapse-item title="账期信息" name="2" v-if="isExtensionShow">
        <to-json
          toUrl="/views/lxyk/class_credit_card_supply_list_info.json"
          :params="this.form"
          :key="extensionKey"
        ></to-json>
      </el-collapse-item>

      <el-collapse-item title="可分期订单信息" name="1">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="订单编号" align="center" prop="order_form_num"></el-table-column>
          <el-table-column label="所属账期" align="center" prop="payment_dt"></el-table-column>
          <el-table-column label="贷款账号" align="center" prop="smilr_cr_card_loan_acct_num"></el-table-column>
          <el-table-column label="贷款编号" align="center" prop="loan_no"></el-table-column>
          <el-table-column label="客户编号" align="center" prop="cust_no"></el-table-column>
          <el-table-column label="客户名称" align="center" prop="cust_name"></el-table-column>
          <el-table-column label="订单金额" align="center" prop="order_amount"></el-table-column>
          <el-table-column label="订单交易类型" align="center" prop="transaction_type" :formatter="transactionTypeFormat"></el-table-column>
          <el-table-column label="分期期数" align="center" prop="istlmt_prds" :formatter="lmtPrdsFormat"></el-table-column>
          <el-table-column label="消费日期" align="center" prop="pay_date"></el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
    <div class="button-footer">
      <el-button type="primary" size="small" @click="submit" plain>确认分期</el-button>
    </div>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
export default {
  name:"transactionInstallment",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    var checkAmt = (rule, value, callback) => {
        if (value > this.form.max_amt) {
          callback(new Error('当前分期金额不可超过最高可分期金额'));
        } else {
          callback();
        }
      };
    return {
      istlmtTpList: [],//分期类型字典列表
      istlmtPrdsList: [],//分期类型字典列表
      transactionTypeList: [],//订单交易类型字典列表
      showScheduledSupply: false,
      isExtensionShow: false,
      extensionKey: 1,
      activeNames: ["1"],
      form: {
        smilr_cr_card_loan_acct_num: "",//类信用卡贷款账号
        cur_bill_prds: null,//账期
        smilr_cr_card_acct_ste: "",//类信用卡贷款账号状态
        cust_no: "",//客户号
        istlmt_tp: "",//分期类型
        apply_type: "",//申请类型
        sale_prod_cd: "",//可售产品号
        txn_amt: 0,//账单可分期金额
        max_amt: "",//最高可分期金额
        istlmt_prds: "",//分期期数
        this_bill_istlmt_amt: ""
      },
      options: [3, 6, 12],
      tableData: [],
      selectedTableData: [],

      rules:{
        txn_amt: [
          {required: true, message: '请输入分期金额!', trigger: 'blur'},
          { validator: checkAmt, trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.intParams();
    //获取货币代码下拉字典
    this.getDictList("E_ISTLMT_TP", "istlmtTpList");
    this.getDictList("E_ISTLMT_PRDS", "istlmtPrdsList");
    this.getDictList("E_TRANSACTION_TYPE", "transactionTypeList");
    this.initTable();
    this.initTable2();
  },
  methods: {
    intParams(){
      this.form.cust_no = this.cParentParams.cust_no;
      this.form.sale_prod_cd = this.cParentParams.sale_prod_cd;
      this.form.smilr_cr_card_loan_acct_num = this.cParentParams.smilr_cr_card_loan_acct_num;
      this.form.apply_type = this.cParentParams.apply_type;
      this.form.istlmt_prds = this.cParentParams.istlmt_prds;
      this.form.istlmt_tp = this.cParentParams.istlmt_tp;
      this.form.txn_amt = this.cParentParams.txn_amt;
      this.form.order_form_num = this.cParentParams.order_form_num;
      this.form.cur_bill_prds = this.cParentParams.cur_bill_prds;
    },
    initTable() {
      let that = this;
      let params = {
        smilr_cr_card_loan_acct_num: that.form.smilr_cr_card_loan_acct_num,
        transaction_type: "1",
        bill_type: "1",
        cust_no: that.form.cust_no,
        servicecode: 'ar0059'
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          that.tableData = res.data;
          //分页插件记录总数
          // that.pageParam.total = res.pageParam.total
        }
      }).catch(err => {
        console.error(err);
      });
    },
     initTable2() {
      let that = this;
      let params = {
        smilr_cr_card_loan_acct_num: that.form.smilr_cr_card_loan_acct_num,     
        servicecode: 'ar0069'
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          that.form.max_amt = res.data.outstanding_account_total_amt;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    /**
     * 获取字典公用方法
     * @param dictType
     * @param listKey
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
            that[listKey] = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictLabel(listName, value) {
      let that = this;
      let tempValue = value;
      for (const item of that[listName]) {
        if (tempValue === item.dictId) {
          tempValue = item.dictName;
          break;
        }
      }
      return tempValue;
    },
    /**
     * 表格复选触发事件
     * @param selection
     */
    handleSelectionChange(selection) {
      this.selectedTableData = selection;
      const orderAmountArr = selection.map((item) => item.order_amount);
      const orderAmount = orderAmountArr.reduce((prev, cur) => {
        return Number(prev) + Number(cur);
      });
      if(this.form.max_amt < orderAmount){
        this.form.txn_amt = this.form.max_amt;
        return;
      }
      this.form.txn_amt = orderAmount;
    },
    changeExtensionNum(val) {
      if (val === 0 || val === "" || val === null) {
        this.isExtensionShow = false;
      } else {
        this.form.prcpl_smtn = this.form.txn_amt;
        this.isExtensionShow = true;
        this.extensionKey++;
        if (!this.activeNames.includes("2")){
          this.activeNames.push("2");
        }
      }
    },
    clearExtensionSelected(){
      this.isExtensionShow = false;
      // this.activeNames
    },
    submit(){
      let that = this;
      let params = {
        smilr_cr_card_loan_acct_num: that.form.smilr_cr_card_loan_acct_num,//类信用卡贷款账号
        cur_bill_prds: that.form.cur_bill_prds,//账期
        smilr_cr_card_acct_ste: that.form.smilr_cr_card_acct_ste,//类信用卡贷款账号状态
        cust_no: that.form.cust_no,//客户号
        istlmt_tp: that.form.istlmt_tp,//分期类型
        apply_type: that.form.apply_type,//申请类型
        sale_prod_cd: that.form.sale_prod_cd,//可售产品号
        txn_amt: that.form.txn_amt,//账单可分期金额
        istlmt_prds: that.form.istlmt_prds,//分期期数
        orderList: that.selectedTableData,
        servicecode: "ar0066"
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          this.$message({
            type: "success",
            message: "success"
          });
          this.$dialog.close();
        }
      }).catch(err => {
        console.error(err);
      });
    },
    transactionTypeFormat(row,column){
        let name = row[column.property];
        let data = row[column.property];
        this.transactionTypeList.forEach(function(item,index){
          if(data == item.dictId){
            name = item.dictName;
          }
        })
        return name;
      },
      lmtPrdsFormat(row,column){
        let name = row[column.property];
        let data = row[column.property];
        this.istlmtPrdsList.forEach(function(item,index){
          if(data == item.dictId){
            name = item.dictName;
          }
        })
        return name;
      },
  },
};
</script>

<style>
.button-footer {
  text-align: center;
  padding: 20px;
}
</style>
