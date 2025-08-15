<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr>
          <th colspan="14" class="table_header">明确本次贷款的具体抵押物</th>
        </tr>
        <tr>
          <th>抵押产<br>权类型</th>
          <th>产权人</th>
          <th>房产产<br>权证号</th>
          <th>土地产<br>权证号</th>
          <th>共有人</th>
          <th>共有证<br>号</th>
          <th>位置</th>
          <th>面积(㎡)</th>
          <th>建筑年<br>份</th>
        </tr>
        <tr v-for="(item,index) in tableDataList"
            :key="index">
          <td>{{ item.morp_type }}</td>
          <td>{{ item.prop_owner }}</td>
          <td>{{ item.houp_credit_number }}</td>
          <td>{{ item.land_credit_number }}</td>
          <td>{{ item.co_owner }}</td>
          <td>{{ item.co_credit_number }}</td>
          <td>{{ item.position }}</td>
          <td>{{ item.area }}</td>
          <td>{{ item.built_year }}</td>
        </tr>
      </table>
      <el-row>
        &nbsp;
      </el-row>
      <table border="1" class="table_report">
        <tr>
          <th>币种</th>
          <th>评估单<br>价</th>
          <th>评估总<br>价(分层)</th>
          <th>状态</th>
          <th>租金</th>
          <th>土地性<br>质</th>
          <th>其他</th>
        </tr>
        <tr v-for="(item,index) in tableDataList"
            :key="index">
          <td>{{ getDictLabel('ccyCodeList', item.ccy_code) }}</td>
          <td>{{ item.eval_unit_price | formatMoney }}</td>
          <td>{{ item.eval_amt | formatMoney }}</td>
          <td>{{ item.state }}</td>
          <td>{{ item.rent_amt | formatMoney }}</td>
          <td>{{ item.land_property }}</td>
          <td>{{ item.other }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";
import accounting from "pte-ui/utils/accounting";

export default {
  name: "ArbLoanCollateralReport",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      apply_no: "", //申请号
      cust_no: "",//客户编号
      due_item_no: "", //调查项编号

      tableDataList: [],// 表格数据

      ccyCodeList: [], //币种列表
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
        servicecode: "ar1824",
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

td {
  width: auto;
  text-align: center;
}
</style>
