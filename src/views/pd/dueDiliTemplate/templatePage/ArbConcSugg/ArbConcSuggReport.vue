<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr>
          <th colspan="10" class="table_header">{{$i18ns('结论及建议')}}</th>
        </tr>
        <tr>
          <td>{{$i18ns('建议的贷款金额')}}</td>
          <td colspan="3">{{ page.loan_amt | formatMoney }}</td>
          <td>{{$i18ns('建议的贷款期限')}}</td>
          <td colspan="2">{{ page.loan_term }}</td>
          <td>{{$i18ns('年利率')}}</td>
          <td colspan="2">{{ page.year_rate | formatMoney }}</td>
        </tr>
        <tr>
          <td>{{$i18ns('建议的月分期还款额')}}</td>
          <td colspan="3">{{ page.mont_installment | formatMoney }}</td>
          <td>{{$i18ns('月还款额占月可支比例')}}</td>
          <td colspan="2">{{ page.mont_installment_scale }}</td>
          <td>{{$i18ns('建议的还款方式')}}</td>
          <td colspan="2" class="page-desc">{{ getDictLabel('repayTypeList', page.repay_way) }}</td>
        </tr>
        <tr>
          <td>{{$i18ns('特殊情况/附加条件（如贷款支付方式/抵押担保等）')}}</td>
          <td colspan="9">{{ page.exce_case }}</td>
        </tr>
        <tr>
          <td colspan="10"><div>{{$i18ns('本报告系本人遵照 银行信贷管理制度及相关尽职要求，在对客户进行全面调查与核实后所作出的客观陈述，本人对上述报告中记载的各项内容的真实性及本人同意授信的意见负责，对因在上述报告中作出虚假陈述或说明导致决策人决策失误的情形承担全部责任。')}}</div></td>
        </tr>
        <tr>
          <td colspan="10">
            <el-row>
              <el-col :span="12">{{$i18ns('客户经理签字')}}：{{page.acco_mana_sign}}</el-col>
              <el-col :span="12">{{$i18ns('签字日期')}}：{{page.sign_date}}</el-col>
            </el-row>
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
  name: "ArbConcSuggReport",
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

      repayTypeList: [], //还款方式列表

      page: {
        ccy_code: "", //币种
        loan_amt: "", //贷款金额
        loan_term: "", //贷款期限(月)
        year_rate: "", // 年利率
        mont_installment: "", // 月分期还款额
        mont_installment_scale: "", // 月还款额占月可支比例
        repay_way: "", // 还款方式
        acco_mana_sign: "", // 客户经理签字
        sign_date: "", // 签字日期
        exce_case: "" // 特殊情况
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
    //初始化数据字典
    this.getDictList("MS_E_REPAY_WAY", "repayTypeList");//获取数据字典MS_E_REPAY_WAY
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
        servicecode: "ar1738",
         apply_no: that.apply_no,
        cust_no: that.cust_no,
        due_item_no: that.due_item_no,
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
}

th {
  width: 10% !important;
  text-align: center;
}

td {
  width: 10%;
  text-align: center;
}
.page-desc {
  height: auto;
  min-height: 100px;
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>
