<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr>
          <th colspan="10" class="table_header table_desc">一、授信额度情况</th>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">授信通知书编号</td>
          <td colspan="2">{{ page.contract_no }}</td>
          <td colspan="2" class="table_desc">基准币种</td>
          <td colspan="4">{{ getDictLabel('ccyCodeList', page.base_ccy) }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">授信金额(元)</td>
          <td colspan="2">{{ page.apply_amt | formatMoney }}</td>
          <td colspan="2" class="table_desc">主授信币种</td>
          <td colspan="4">{{ getDictLabel('ccyCodeList', page.ccy_code) }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">授信汇率</td>
          <td colspan="2">{{ page.exchange_rate }}</td>
          <td colspan="2" class="table_desc">授信金额(折基准币种)</td>
          <td colspan="4">{{ page.base_busi_amt | formatMoney }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">生效日期</td>
          <td colspan="2">{{ page.effective_date }}</td>
          <td colspan="2" class="table_desc">期限(月)</td>
          <td colspan="4">{{ page.appr_term }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">授信资金用途</td>
          <td colspan="8">{{ page.loan_purpose_desc }}</td>
        </tr>
        <tr>
          <td  colspan="10" class="table_desc"><b>分配信息</b></td>
        </tr>
        <tr>
          <th colspan="2" class="table_desc">业务产品</th>
          <th colspan="2" class="table_desc">授信币种</th>
          <th colspan="2" class="table_desc">业务期限(月)</th>
          <th colspan="2" class="table_desc">业务分配金额(元)</th>
          <th colspan="2" class="table_desc">分配方式</th>
        </tr>
        <template v-if="!saleProdList || saleProdList.length == 0">
          <tr>
            <td colspan="2"></td>
            <td colspan="2"></td>
            <td colspan="2"></td>
            <td colspan="2"></td>
            <td colspan="2"></td>
          </tr>
        </template>
        <template v-for="(item, index) in saleProdList">
          <tr :key="index">
            <td colspan="2">{{item.prod_name}}</td>
            <td colspan="2">{{getDictLabel('ccyCodeList', item.ccy_code)}}</td>
            <td colspan="2">{{item.credit_term}}</td>
            <td colspan="2">{{item.busi_assign_amt | formatMoney}}</td>
            <td colspan="2">{{getDictLabel('clallocationList', item.cl_allocation_mode)}}</td>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";
import accounting from "pte-ui/utils/accounting";

export default {
  name: "CreditInfoReport",
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

      ccyCodeList: [], //还款方式列表
      clallocationList: [], //分配方式列表
      saleProdList: [], //可售产品分配限额列表

      page: {
        contract_no: "", //授信通知书编号
        base_ccy: "", //基准币种
        apply_amt: "", //授信金额
        ccy_code: "", // 主授信币种
        exchange_rate: "", // 汇率
        base_busi_amt: "", // 授信金额(折基准币种)
        effective_date: "", // 生效日期
        appr_term: "", // 期限(月)
        loan_purpose_desc: "", // 授信资金用途
      }
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
    // this.due_item_no = "custDTA1";
    // this.apply_no = "20230717000000000052801";
    // this.cust_no = "UR00000000013665";
    //初始化数据字典
    this.getDictList("MS_CURRENCY", "ccyCodeList");//获取数据字典MS_CURRENCY
    this.getDictList("PD_E_CLALLOCATION_MODE", "clallocationList");//获取数据字典MS_CURRENCY
    this.getCreditData();
    this.getSaleProdData();
  },
  methods: {
    /**
     * 检查当前页面请求必输参数是否存在
     */
    checkParams() {
      if (this.apply_no === null || this.apply_no === "") {
        return false;
      }
      if (this.cust_no === null || this.cust_no === "") {
        return false;
      }
      if (this.due_item_no === null || this.due_item_no === "") {
        return false;
      }
      return true;
    },
    /**
     * 获取当前客户数据
     */
    async getCreditData() {
      let that = this;
      if (!that.checkParams()) {
        return;
      }
      let params = {
        servicecode: "ar0741",
        apply_no: that.apply_no
      }
      await MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.page = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 获取授信分配限额信息
     */
    async getSaleProdData() {
      let that = this;
      if (!that.checkParams()) {
        return;
      }
      let params = {
        servicecode: "ar0782",
        apply_no: that.apply_no
      }
      await MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.saleProdList = res.data;
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
    async getDictList(dictType, listKey) {
      let that = this;
      let params = {
        dictType: dictType,
        dictKey: [dictType],
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
    }
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

.table_desc {
  text-align: left;
  padding-left: 10px;
  background: #f3f4f5;
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

.table_report {
  width: 100%;
  height: auto;
  border-collapse: collapse;
  table-layout: fixed;
}

th {
  width: 10% !important;
  text-align: center;
}

td {
  width: 10%;
  text-align: center;
  height: 20px;
}

.page-desc {
  height: auto;
  min-height: 100px;
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>
