<template>
  <div class="table_container">
    <div class="table_center">
      <div class="table_report table_header">
        {{ $i18ns('审核人（经办行分管行长或经分管行长授权的进行审核的人员）意见') }}
      </div>
      <div class="table_report border_div">
        <ol>
          <li>
            {{ $i18ns('1、经审阅调查岗报送的贷款资料（包括佐证资料）与调查意见及其附表所反映的信息') }}
            <input type="checkbox" disabled name="loan_data_inve_opin" v-model="page.loan_data_inve_opin" value="1">{{ $i18ns('匹配一致') }}
            <input type="checkbox" disabled name="loan_data_inve_opin" v-model="page.loan_data_inve_opin" value="2">{{ $i18ns('匹配不一致') }}
            {{ $i18ns('，并已将佐证资料归入纸质档案，') }}
            <input type="checkbox" disabled name="loav_opinion" v-model="page.loav_opinion" value="1">{{ $i18ns('同意') }}
            <input type="checkbox" disabled name="loav_opinion" v-model="page.loav_opinion" value="2">{{ $i18ns('不同意') }}
            {{ $i18ns('贷款调查人意见。') }}<br>
            {{ $i18ns('2、认定借款人及共同借款人征信报告违约记录属于:') }}
            <input type="checkbox" disabled name="basc_type" v-model="page.basc_type" value="1">{{ $i18ns('恶意') }}
            <input type="checkbox" disabled name="basc_type" v-model="page.basc_type" value="2">{{ $i18ns('非恶意') }}
            {{ $i18ns('违约,') }}
            <input type="checkbox" disabled name="report_busi" v-model="page.report_busi" value="1">{{ $i18ns('同意') }}
            <input type="checkbox" disabled name="report_busi" v-model="page.report_busi" value="2">{{ $i18ns('不同意') }}
            {{ $i18ns('上报本业务。') }}<br>
            {{ $i18ns('3、经支行有权人认定，确认抵押物价值为:') }}<span class="underline">{{page.pled_price | formatMoney}}</span>{{ $i18ns('(元)，') }}
            {{ $i18ns('抵押率为') }}<span class="underline">{{page.mortgage_rate | formatMoney}}</span>％
            <el-row>
              <el-col :span="8">
                &nbsp;&nbsp;
              </el-col>
              <el-col :span="8">
                {{ $i18ns('审核人（签字）：') }}<span class="underline">{{page.revi_sign}}</span>
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
  name: "ArbReviewerOpinionReport",
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
        pled_price: "",//抵押价
        mortgage_rate: "",//抵押率
        revi_sign: "",//审核人签字
        sign_date: "",//签字日期
        loan_data_inve_opin: [],//调查岗报送的贷款资料（包括佐证资料）与调查意见及其附表所反映的信息
        loav_opinion: [],//贷款调查人意见
        basc_type: [],//违约类型
        report_busi: []//上报本业务
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
        servicecode: "ar1722",
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
      this.page.loan_data_inve_opin = data.loan_data_inve_opin.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.loav_opinion = data.loav_opinion.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.basc_type = data.basc_type.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.report_busi = data.report_busi.replaceAll(" ", "").split(",").filter((item) => item !== '');
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
