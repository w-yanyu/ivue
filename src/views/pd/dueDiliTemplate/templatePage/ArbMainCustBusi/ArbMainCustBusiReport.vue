<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr>
          <th :rowspan="2+tableDataList.length" style="background: #fff" class="table_header">{{$i18ns('主要供应商')}}/<br>{{$i18ns('客户及生意结构描述')}}</th>
          <th>{{$i18ns('企业名称')}}</th>
          <th>{{$i18ns('主要供应商')}}</th>
          <th>{{$i18ns('主要供应商采购占比')}}</th>
          <th>{{$i18ns('主要供应商付款条件')}}</th>
          <th>{{$i18ns('主要客户')}}</th>
          <th>{{$i18ns('主要客户销售占比')}}</th>
          <th>{{$i18ns('主要客户付款条件')}}</th>
        </tr>
        <tr v-if="!tableDataList || tableDataList.length === 0">
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr v-for="(item,index) in tableDataList"
            :key="index">
          <td>{{ item.busi_name }}</td>
          <td>{{ item.major_supp }}</td>
          <td>{{ item.major_supp_purp }}</td>
          <td>{{ item.major_supp_payc }}</td>
          <td>{{ item.major_cust }}</td>
          <td>{{ item.major_cust_salc }}</td>
          <td>{{ item.major_cust_payc }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "ArbMainCustBusiReport",
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

    }
  },
  created() {
    this.due_item_no = this.cParentParams.due_item_no;
    this.apply_no = this.cParentParams.apply_no;
    this.cust_no = this.cParentParams.cust_no;
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
        servicecode: "ar1836",
         apply_no: that.apply_no,
        cust_no: that.cust_no,
        due_item_no: that.due_item_no
      }
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.tableDataList = res.data;
            console.log("表格数据",that.tableDataList);
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
  width: 10%;
  height: 20px;
  text-align: center;
}
</style>
