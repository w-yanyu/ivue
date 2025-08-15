<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr class="tr_header">
          <th>
            申请人声明
          </th>
          <th colspan="9" class="th_desc"><div class="page-desc">{{ page.desc1 }}</div></th>
        </tr>
        <tr class="tr_bottom">
          <td class="td_bottom"></td>
          <td class="td_bottom"></td>
          <td class="td_bottom"></td>
          <td class="td_bottom"></td>
          <td class="td_bottom"></td>
          <td class="td_bottom"></td>
          <td class="td_bottom"></td>
          <td class="td_bottom"></td>
          <td class="td_bottom"></td>
          <td class="td_bottom"></td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "ArbClientDeclareReport",
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
      due_item_no: "custATA5", //调查项编号

      page: {
        desc1: "", //申请人声明
      }
    }
  },
  created() {
    this.apply_no = this.cParentParams.apply_no;
    this.cust_no = this.cParentParams.cust_no;
    this.due_item_no = this.cParentParams.due_item_no;
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
        servicecode: "ar1702",
        apply_no: that.apply_no,
        cust_no: that.cust_no,
        due_item_no: that.due_item_no
      }
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.page = res.data;
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
  width: calc(100% - 2px);
  height: auto;
}

th {
  width: 10% !important;
  min-height: 300px !important;
  height: auto;
  text-align: center;
}

td {
  width: 10%;
  min-height: 300px !important;
  height: auto;
  text-align: center;
  padding: 0;
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

.tr_header {
  height: 300px;
  border-top: 0 solid
}

.tr_bottom {
  height: 0px;
  border: 0 solid;
}
.th_desc{
  text-align: left;
}
.td_bottom{
  padding: 0 !important;
  height: 0px;
  border: 0 solid;
}
.page-desc {
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>
