<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr>
          <th colspan="14" class="table_header">{{$i18ns('信贷历史')}}</th>
        </tr>
        <tr>
          <th>{{$i18ns('融资来源')}}</th>
          <th>{{$i18ns('币种')}}</th>
          <th>{{$i18ns('贷款金额')}}</th>
          <th>{{$i18ns('期限(月)')}}</th>
          <th>{{$i18ns('用途')}}</th>
          <th>{{$i18ns('还款方式')}}</th>
          <th>{{$i18ns('发放日期')}}</th>
          <th>{{$i18ns('余额')}}</th>
          <th>{{$i18ns('担保方式')}}</th>
          <th>{{$i18ns('逾期信息')}}</th>
        </tr>
        <tr v-if="!tableDataList ||tableDataList.length == 0">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <template v-for="(item,index) in tableDataList">
          <tr :key="index">
            <td>{{ item.fina_source }}</td>
            <td>{{ getDictLabel('ccyCodeList', item.ccy_code) }}</td>
            <td>{{ item.loan_amt | formatMoney }}</td>
            <td>{{ item.term }}</td>
            <td>{{ item.purpose }}</td>
            <td>{{ getDictLabel('repayWayList', item.repay_way) }}</td>
            <td>{{ item.issue_date }}</td>
            <td>{{ item.balance | formatMoney }}</td>
            <td>{{ getDictLabel('guarWayList', item.guar_way) }}</td>
            <td>{{ item.overdue_info }}</td>
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
  name: "ArbCreditHistoryReport",
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
      repayWayList: [], //还款方式列表
      guarWayList: [], //担保方式列表
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
    this.getDictList("MS_E_REPAY_WAY", "repayWayList");
    this.getDictList("MS_E_GUAR_TYPE", "guarWayList");
    this.getCustData();
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
    getCustData() {
      let that = this;
      if (!that.checkParams()) {
        return;
      }
      let params = {
        servicecode: "ar1828",
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
  background: #efefef;
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

//td {
//  width: auto;
//  text-align: center;
//}
td {
  width: 10%;
  text-align: center;
  height: 20px;
}
</style>
