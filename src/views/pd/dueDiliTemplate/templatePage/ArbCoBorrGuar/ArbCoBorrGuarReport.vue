<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr>
          <th colspan="14" class="table_header">{{$i18ns('担保信息')}}</th>
        </tr>
        <tr>
<!--          <th :rowspan="2+tableDataList.length" style="background: #fff">担保信息</th>-->
          <th>{{$i18ns('人员类别')}}</th>
          <th>{{$i18ns('担保人姓名')}}</th>
          <th>{{$i18ns('与申请人关系')}}</th>
          <th>{{$i18ns('身份证号码')}}</th>
          <th>{{$i18ns('电话号码')}}</th>
          <th>{{$i18ns('居住地址')}}</th>
          <th>{{$i18ns('工作单位')}}</th>
          <th>{{$i18ns('工作单位地址')}}x</th>
          <th>{{$i18ns('工作单位地址')}}</th>
          <th>{{$i18ns('币种')}}</th>
          <th>{{$i18ns('月收入')}}</th>
          <th>{{$i18ns('主要资产')}}</th>
          <th>{{$i18ns('备注')}}</th>
        </tr>
        <tr v-if="!tableDataList || tableDataList.length === 0">
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
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr v-for="(item,index) in tableDataList"
            :key="index">
          <td>{{ getDictLabel('personTypeList', item.person_type)}}</td>
          <td>{{ item.guarantor_name }}</td>
          <td>{{ item.applicant_rela }}</td>
          <td>{{ item.id_card }}</td>
          <td>{{ item.telephone_number }}</td>
          <td>{{ item.resi_address }}</td>
          <td>{{ item.job_corp }}</td>
          <td>{{ item.job }}</td>
          <td>{{ item.work_addr }}</td>
          <td>{{ getDictLabel('ccyCodeList', item.ccy_code) }}</td>
          <td>{{ item.mont_income | formatMoney }}</td>
          <td>{{ item.major_asset }}</td>
          <td>{{ item.remark }}</td>
        </tr>
      </table>
      <table border="1" class="table_report">
        <tr>
          <th colspan="14" class="table_header">{{$i18ns('抵押信息')}}</th>
        </tr>
        <tr>
<!--          <th :rowspan="2+tableDataList1.length" style="background: #fff">抵押物信息</th>-->
          <th>{{$i18ns('抵质押物名称')}}</th>
          <th>{{$i18ns('抵押物地址')}}</th>
          <th>{{$i18ns('财产所有人')}}</th>
          <th>{{$i18ns('建筑面积(㎡)/车辆品牌')}}</th>
          <th>{{$i18ns('产权证号')}}</th>
          <th>{{$i18ns('购入日期')}}</th>
          <th>{{$i18ns('币种')}}</th>
          <th>{{$i18ns('购入时价值')}}</th>
          <th>{{$i18ns('当前估值')}}</th>
          <th>{{$i18ns('抵押率')}}</th>
        </tr>
        <tr v-if="tableDataList1.length === 0">
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
        <tr v-for="(item,index) in tableDataList1"
            :key="index">
          <td>{{ item.collateral_name }}</td>
          <td>{{ item.pledge_address }}</td>
          <td>{{ item.property_owner }}</td>
          <td>{{ item.area_or_beand }}</td>
          <td>{{ item.prop_rigc_no }}</td>
          <td>{{ item.buy_date }}</td>
          <td>{{ getDictLabel('ccyCodeList', item.ccy_code) }}</td>
          <td>{{ item.purc_price | formatMoney }}</td>
          <td>{{ item.curr_valu | formatMoney }}</td>
          <td>{{ item.mortgage_rate }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";
import accounting from "pte-ui/utils/accounting";

export default {
  name: "ArbCoBorrGuarReport",
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
      tableDataList1: [], // 表格数据

      ccyCodeList: [],
      personTypeList: []

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
    this.getDictList("AR_E_PEOPLE_TYPE", "personTypeList");
    this.getCustData();
    this.getCustData1();
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
      if(!that.checkParams()){
        return;
      }
      let params = {
        servicecode: "ar1844",
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
     * 获取当前客户数据
     */
    getCustData1() {
      let that = this;
      if(!that.checkParams()){
        return;
      }
      let params = {
        servicecode: "ar1804",
         apply_no: that.apply_no,
        cust_no: that.cust_no,
        due_item_no: that.due_item_no
      }
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.tableDataList1 = res.data;
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

td {
  width: auto;
  text-align: center;
  height: auto ;
  height: 20px;
  min-height: 20px !important;
}
</style>
