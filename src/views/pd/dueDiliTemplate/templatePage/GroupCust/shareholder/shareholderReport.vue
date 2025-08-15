<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr>
          <th colspan="10" class="table_header table_desc"><b>{{$i18ns('主要股东')}}</b></th>
        </tr>
        <tr>
          <th colspan="2" class="table_desc">{{$i18ns('股东名称')}}</th>
          <th colspan="1" class="table_desc">{{$i18ns('股权比例(%)')}}</th>
          <th colspan="2" class="table_desc">{{$i18ns('出资类别')}}</th>
          <th colspan="1" class="table_desc">{{$i18ns('币种')}}</th>
          <th colspan="2" class="table_desc">{{$i18ns('金额')}}</th>
          <th colspan="2" class="table_desc">{{$i18ns('股东性质')}}</th>
        </tr>
        <template v-if="!shareList || shareList.length == 0">
          <tr>
            <td colspan="2"></td>
            <td colspan="1"></td>
            <td colspan="2"></td>
            <td colspan="1"></td>
            <td colspan="2"></td>
            <td colspan="2"></td>
          </tr>
        </template>
        <template v-for="(item, index) in shareList">
          <tr :key="index">
            <td colspan="2">{{ item.cust_name }}</td>
            <td colspan="1">{{ item.ownership_ratio }}</td>
            <td colspan="2">{{ getDictLabel('contributiveTypeList', item.contributive_type) }}</td>
            <td colspan="1">{{ getDictLabel('ccyCodeList', item.ccy_code) }}</td>
            <td colspan="2">{{ item.contributive_amt | formatMoney }}</td>
            <td colspan="2">{{ getDictLabel('holderTypeList', item.holder_type) }}</td>
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
  name: "shareholderReport",
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

      ccyCodeList: [], //币种列表
      holderTypeList: [], //股东性质
      contributiveTypeList: [], //出资类别列表

      shareList: [], //股东列表
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
    // this.cust_no = "UR00000000012751";
    //初始化数据字典
    this.getDictList("MS_CURRENCY", "ccyCodeList");//获取数据字典MS_CURRENCY
    this.getDictList("US_E_HOLDER_TYPE", "holderTypeList");//获取数据字典MS_CURRENCY
    this.getDictList("US_E_INVEST_TYPE", "contributiveTypeList");//获取数据出资类别
    this.getShareData();
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
     * 获取客户股东信息
     */
    async getShareData() {
      let that = this;
      if (!that.checkParams()) {
        return;
      }
      let params = {
        servicecode: "us0290",
        cust_no: that.cust_no,
        shoret: "SH"
      }
      await MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.shareList = res.data;
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
  border-top: 0 !important;
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
  border-top: 0 !important;
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
