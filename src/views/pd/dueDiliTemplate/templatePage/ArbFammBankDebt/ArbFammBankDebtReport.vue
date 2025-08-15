<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr>
          <th colspan="14" class="table_header">银行借款</th>
        </tr>
        <tr>
          <!--          <th>房产<br>类别</th>-->
          <th>借款人<br>姓名</th>
          <th>贷款<br>品种</th>
          <th>币种</th>
          <th>贷款<br>金额</th>
          <th>贷款<br>起始日</th>
          <th>还款<br>方式</th>
          <th>当前<br>金额</th>
          <th>贷款行</th>
          <th>累计<br>逾期<br>期数</th>
          <th>最高<br>逾期<br>期数</th>
          <th>抵押物</th>
          <th>备注</th>
        </tr>
        <tr v-for="(item,index) in tableDataList"
            :key="index">
          <!--          <td>{{ item.room_anal_no }}</td>-->
          <td>{{ item.borrower_name }}</td>
          <td>{{ item.loan_vari }}</td>
          <td>{{ getDictLabel('ccyCodeList', item.ccy_code) }}</td>
          <td>{{ item.loan_amt | formatMoney }}</td>
          <td>{{ item.loan_stad }}</td>
          <td>{{ getDictLabel('repayTypeList', item.repay_type) }}</td>
          <td>{{ item.curr_amt | formatMoney }}</td>
          <td>{{ item.loan_bank }}</td>
          <td>{{ item.cumu_ovep }}</td>
          <td>{{ item.highest_ovep }}</td>
          <td>{{ item.collateral_name }}</td>
          <td>{{ item.remark }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";
import accounting from "pte-ui/utils/accounting";

export default {
  name: "ArbFammBankDebtReport",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      apply_no: "", //申请号
      cust_no: "", //客户编号
      due_item_no: "", //调查项编号

      tableDataList: [], // 表格数据

      ccyCodeList: [], //币种列表
      repayTypeList: [], //还款方式列表
    }
  },
  filters: {
    formatMoney(value) {
      return accounting.formatMoney(value, "");
    }
  },
  created() {
    this.due_item_no = this.cParentParams.due_item_no;
    this.apply_no = this.cParentParams.apply_no;
    this.cust_no = this.cParentParams.cust_no;
    this.getDictList("MS_CURRENCY", "ccyCodeList");
    this.getDictList("MS_E_REPAY_WAY", "repayTypeList");
    this.getCustData();
  },
  methods: {
    /**
     * 检查当前页面请求必输参数是否存在
     */
    checkParams(){
      if (this.apply_no === null || this.apply_no === ""){
        return false;
      }
      if (this.cust_no === null || this.cust_no === ""){
        return false;
      }
      if (this.due_item_no === null || this.due_item_no === ""){
        return false;
      }
      return true;
    },
    /**
     * 获取当前客户数据
     */
    getCustData() {
      let that = this;
      if(!that.checkParams()){
        return;
      }
      let params = {
        servicecode: "ar1816",
        apply_no: that.apply_no,
        cust_no: that.cust_no,
        due_item_no: that.due_item_no
      }
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.tableDataList = res.data;
            console.log("表格数据", that.tableDataList);
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
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
  }
}
</script>


<style lang="less" scoped>
.table_container {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
}

// .table_center {
//   position: relative;
//   left: 0;
//   top: 10%;
//   bottom: auto;
//   right: 0;
//   margin: auto;
//   text-align: center;
//   width: 60%;
//   height: auto;
// }

.table_report {
  width: 100%;
  height: auto;
  border-collapse: collapse;
}

th {
  width: auto !important;
  text-align: center;
}

.table_header {
  background: #ecf5ff;
  border-radius: 0;
  border-left: 1px solid #5e6d82;
  border-right: 1px solid #5e6d82;
  font-size: 15px;
  font-family: "Arial Black";
  font-weight: bold;
  text-align: center;
}

td {
  width: auto;
  text-align: center;
}
</style>
