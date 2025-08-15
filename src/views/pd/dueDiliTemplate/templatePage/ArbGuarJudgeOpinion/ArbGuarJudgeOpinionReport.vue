<template>
  <div class="table_container">
    <div class="table_center">
      <div class="table_report table_header">
        {{ $i18ns('③保证人总体担保代偿能力分析判断意见') }}
      </div>
      <div class="table_report border_div">
        <ol>
          <li>
            {{ $i18ns('◆注：根据保证人职务、岗位、职称、年龄、资历、收入、经营范围、持续从业时间、资产、存量负债（包括或有负债）、信用记录等要素，结合上述情况，综合分析判断全部保证人总体担保代偿能力【包括但不限于以下内容：①工作职业、收入、存量负债、资产情况（包括对房屋资产的价值估算）；②经调查核实，其目前对外担保总余额为') }}
            <span class="underline">{{page.external_guar_total_balance | formatMoney}}</span>{{ $i18ns('万元、拖欠税款') }}<span class="underline">{{page.tax_arrears | formatMoney}}</span>{{ $i18ns('万元、拖欠职工工资') }}<span class="underline">{{page.wage_arrears | formatMoney}}</span>{{ $i18ns('万元、等等重要情况】：') }}
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
  name: "ArbGuarJudgeOpinionReport",
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

      ccyCodeDictList: [], //货币典列表

      page: {
        external_guar_total_balance: "", //对外担保总余额
        tax_arrears: "", //拖欠税款
        wage_arrears: ""//拖欠职工工资
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
        servicecode: "ar1718",
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
}
</style>
