<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr>
          <th colspan="10" class="table_header">{{$i18ns('项目资金计划')}}</th>
        </tr>
        <tr>
          <td>{{$i18ns('申请金额')}}</td>
          <td colspan="2">{{ page.apply_amt | formatMoney }}</td>
          <td>{{$i18ns('期限')}}</td>
          <td colspan="2">
            {{ page.term }}
          </td>
          <td>{{$i18ns('分期还款额')}}</td>
          <td colspan="3">{{ page.installment_repayment | formatMoney }}</td>
        </tr>
      </table>
      <table border="1" class="table_report" style="border-top: 0;">
        <tr>
          <th colspan="3">{{$i18ns('项目资金使用计划')}}</th>
          <th colspan="2">{{$i18ns('项目资金使用计划金额')}}</th>
          <th colspan="3">{{$i18ns('资金来源计划')}}</th>
          <th colspan="2">{{$i18ns('资金来源计划金额')}}</th>
        </tr>
        <tr v-if="!tableDataList || tableDataList.length === 0">
          <td colspan="3"></td>
          <td colspan="2"></td>
          <td colspan="3"></td>
          <td colspan="2"></td>
        </tr>
        <tr v-for="(item,index) in tableDataList"
            :key="index">
          <td colspan="3">{{item.project_fund_plan}}</td>
          <td colspan="2">{{item.project_fund_plan_amt | formatMoney}}</td>
          <td colspan="3">{{item.fund_source_plan}}</td>
          <td colspan="2">{{item.fund_source_plan_amt | formatMoney}}</td>
        </tr>
        <tr>
          <td class="td_desc">{{$i18ns('投资项目步骤')}}</td>
          <td colspan="9" class="td_desc" style="text-align: left">
            <ol>
              <li>
                {{page.inve_proj_step}}
              </li>
            </ol>
          </td>
        </tr>
        <tr>
          <td class="td_desc">{{$i18ns('特殊说明内容')}}</td>
          <td colspan="9" class="td_desc" style="text-align: left">
            <ol>
              <li>
                {{page.other_need_explain_situ}}
              </li>
            </ol>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";
import accounting from "pte-ui/utils/accounting";

export default {
  name: "ArbProjectFundPlanReport",
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

      tableDataList:[],

      page: {
        apply_amt: "", //申请金额
        term: "", //期限(月)
        installment_repayment: "", // 分期还款额
        inve_proj_step: "", // 投资项目步骤
        other_need_explain_situ: "", // 其他需要说明的情况
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
    this.getCustData();
    this.getTableData();
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
        servicecode: "ar1744",
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
    },
    /**
     * 获取当前客户数据
     */
    getTableData() {
      let that = this;
      if(!that.checkParams()){
        return;
      }
      let params = {
        servicecode: "ar1840",
         apply_no: that.apply_no,
        cust_no: that.cust_no,
        due_item_no: that.due_item_no
      }
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.tableDataList = res.data;
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
  width: 10% !important;
  text-align: center;
  background: #efefef;
}

td {
  width: 10%;
  height: auto ;
  height: 20px;
  min-height: 20px !important;
  text-align: center;
}

.text_left{
  text-align: left;
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
.td_desc{
  height: 150px;
}
</style>
