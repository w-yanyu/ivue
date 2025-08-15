<template>
  <div class="table_container">
    <div class="table_center">
      <div class="table_report table_header">
        {{ $i18ns('调查人2意见') }}
      </div>
      <div class="table_report border_div">
        <ol>
          <li>
            {{ $i18ns('根据借款人申请资料，经与其当面核验、面谈，并同第一调查人对借款人拟提供的贷款担保及其他重要问题进行了双人上门核实，本人') }}
            <input type="checkbox" disabled name="for_frist_inve_opinion" v-model="page.for_frist_inve_opinion" value="1">{{ $i18ns('同意') }}
            <input type="checkbox" disabled name="for_frist_inve_opinion" v-model="page.for_frist_inve_opinion" value="2">{{ $i18ns('不同意') }}
            {{ $i18ns('第一调查人意见，本人意见如下：') }}<br>
            {{ $i18ns('建议贷款金额') }}<span class="underline">{{page.loan_amt | formatMoney}}</span>{{ $i18ns('(元)，') }}
            {{ $i18ns('贷款成数:') }}<span class="underline">{{page.loan_percentage}}</span>{{ $i18ns('(成)，') }}
            {{ $i18ns('贷款期限:') }}<span class="underline">{{page.loan_term}}</span>{{ $i18ns('(月)，') }}
            {{ $i18ns('执行利率为') }}<span class="underline">{{page.execution_inst_rate | formatMoney}}</span>％
            {{ $i18ns('（即按基准利率') }}<span class="underline">{{page.base_intr | formatMoney}}</span>％
            <input type="checkbox" disabled name="base_intr_float_way" v-model="page.base_intr_float_way" value="1">{{ $i18ns('上浮') }}
            <input type="checkbox" disabled name="base_intr_float_way" v-model="page.base_intr_float_way" value="2">{{ $i18ns('下浮') }}

            <span class="underline">{{page.base_intr_percentage}}</span>％{{ $i18ns('），还款方式为：') }}<span class="underline">{{getDictLabel('repayTypeList', page.repay_type)}}</span>{{ $i18ns('。') }}<br>
            <el-row>
              <el-col :span="8">
                {{ $i18ns('联系电话（手机）：') }}<span class="underline">{{page.mobile_no}}</span>
              </el-col>
              <el-col :span="8">
                {{ $i18ns('调查人2（签字）：') }}<span class="underline">{{page.inve_sign}}</span>
              </el-col>
              <el-col :span="8">
                {{ $i18ns('签字时间：') }}<span class="underline">{{page.sign_date}}</span>
              </el-col>
            </el-row>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";
import accounting from "pte-ui/utils/accounting";

export default {
  name: "ArbSecondInvestigatorOpinionReport",
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

      repayTypeList: [],//还款方式数据字典

      page: {
        loan_amt: "",//贷款金额
        loan_percentage: "",//贷款成数
        loan_term: "",//贷款期限(月)
        base_intr: "",//基准利率(%)
        base_intr_percentage: "",//基准利率浮动百分比(%)
        execution_inst_rate: "",//执行利率/费率(%)
        mobile_no: "",//联系电话(手机)
        inve_sign: "",//第一调查人签字
        sign_date: "",//签字日期
        for_frist_inve_opinion: [],//对于第一调查人的看法
        base_intr_float_way: [],//基准利率浮动方式
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
    this.getDictList("MS_E_REPAY_WAY", "repayTypeList");
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
        servicecode: "ar1720",
         apply_no: that.apply_no,
        cust_no: that.cust_no,
        due_item_no: that.due_item_no,
      }
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.page = res.data;
            //复选框转换
            that.checkboxDataTransform(that.page);
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
      console.log("listName",that[listName]);
      console.log("value",value);
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
    },
    /**
     * 转换复选框中的数据
     * @param data
     */
    checkboxDataTransform(data) {
      this.page.for_frist_inve_opinion = data.for_frist_inve_opinion.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.base_intr_float_way = data.base_intr_float_way.replaceAll(" ", "").split(",").filter((item) => item !== '');
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

th {
  width: 10% !important;
  text-align: center;
}

td {
  width: 10%;
  height: 46.06px;
  text-align: center;
}

.border_div {
  margin: 0;
  padding: 0;
  border: 1px solid #5e6d82;
  border-radius: 0;
  border-collapse: collapse;
  text-align: left;
  min-height: 300px;
}

.underline {
  text-decoration: underline;
  font-weight: bold;
  min-width: 20px;
  min-height: 20px;
}
</style>
