<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr>
          <th colspan="10" class="table_header">{{$i18ns('二、借款人及共同借款人月收入汇总结构')}}</th>
        </tr>
        <tr>
          <th colspan="2">{{$i18ns('月收入汇总结构')}}</th>
          <th>
            {{$i18ns('收入金额')}}
          </th>
          <th colspan="7">
            {{$i18ns('已收集的认定依据（注：个人金融资产应折算为月均数）')}}
          </th>
        </tr>
        <tr>
          <td colspan="2">{{$i18ns('个人薪金收入合计')}}</td>
          <td>{{page.personal_salary_total_income | formatMoney}}</td>
          <td colspan="7">
            <input type="checkbox" disabled name="personal_salary_total_income_basis" v-model="page.personal_salary_total_income_basis" value="1">{{$i18ns('个人纳税证明')}}
            <input type="checkbox" disabled name="personal_salary_total_income_basis" v-model="page.personal_salary_total_income_basis" value="2">{{$i18ns('个人薪金收入证明')}}
            <input type="checkbox" disabled name="personal_salary_total_income_basis" v-model="page.personal_salary_total_income_basis" value="3">{{$i18ns('其他')}}
          </td>
        </tr>
        <tr>
          <td colspan="2">{{$i18ns('财产出租收入合计')}}</td>
          <td>{{page.property_rental_total_income | formatMoney}}</td>
          <td colspan="7">
            <input type="checkbox" disabled name="property_rental_total_income_basis" v-model="page.property_rental_total_income_basis" value="1">{{$i18ns('财产权属凭证')}}
            <input type="checkbox" disabled name="property_rental_total_income_basis" v-model="page.property_rental_total_income_basis" value="2">{{$i18ns('有效期内的租赁合同')}}
            <input type="checkbox" disabled name="property_rental_total_income_basis" v-model="page.property_rental_total_income_basis" value="3">{{$i18ns('其他')}}
          </td>
        </tr>
        <tr>
          <td colspan="2">{{$i18ns('个人金融资产合计')}}</td>
          <td>{{page.personal_fina_assets_total | formatMoney}}</td>
          <td colspan="7">
            <input type="checkbox" disabled name="personal_fina_assets_total_basis" v-model="page.personal_fina_assets_total_basis" value="1">{{$i18ns('我行或他行出具的个人金融资产证明')}}
            <input type="checkbox" disabled name="personal_fina_assets_total_basis" v-model="page.personal_fina_assets_total_basis" value="2">{{$i18ns('个人金融资产凭证')}}
            <input type="checkbox" disabled name="personal_fina_assets_total_basis" v-model="page.personal_fina_assets_total_basis" value="3">{{$i18ns('其它')}}
            <br></br>
            {{$i18ns('◆注其中：存款(')}}<span class="underline">{{page.deposit | formatMoney}}</span>{{$i18ns(')元、国债')}}(<span class="underline">{{page.national_debt | formatMoney}}</span>{{$i18ns(')元、基金(')}}<span class="underline">{{page.fund}}</span>{{$i18ns(')元。')}}
          </td>
        </tr>
        <tr>
          <td colspan="2">{{$i18ns('个人投资收益合计')}}</td>
          <td>{{page.personal_inve_income_total | formatMoney}}</td>
          <td colspan="7">
            <input type="checkbox" disabled name="personal_inve_income_total_basis" v-model="page.personal_inve_income_total_basis" value="1">{{$i18ns('投资于企业')}}
            <input type="checkbox" disabled name="personal_inve_income_total_basis" v-model="page.personal_inve_income_total_basis" value="2">{{$i18ns('合法有效的投资凭证')}}
            <input type="checkbox" disabled name="personal_inve_income_total_basis" v-model="page.personal_inve_income_total_basis" value="3">{{$i18ns('合法、合规、有效的投资收益入账凭证。')}}
          </td>
        </tr>
        <tr>
          <td colspan="2">{{$i18ns('个人经营收入合计')}}</td>
          <td>{{page.personal_operate_income_total | formatMoney}}</td>
          <td colspan="7">
            <input type="checkbox" disabled name="personal_operate_income_total_basis" v-model="page.personal_operate_income_total_basis" value="1">{{$i18ns('经营实体纳税凭证')}}
            <input type="checkbox" disabled name="personal_operate_income_total_basis" v-model="page.personal_operate_income_total_basis" value="2">{{$i18ns('能够反映经营实体经营收入的手工明细账')}}
            <input type="checkbox" disabled name="personal_operate_income_total_basis" v-model="page.personal_operate_income_total_basis" value="3">{{$i18ns('能够反映经营实体经营收入的银行账户流水')}}
            <input type="checkbox" disabled name="personal_operate_income_total_basis" v-model="page.personal_operate_income_total_basis" value="4">{{$i18ns('其他')}}
          </td>
        </tr>
        <tr>
          <td colspan="2">{{$i18ns('月收入总计')}}</td>
          <td>{{page.monthly_income_total | formatMoney}}</td>
          <td>{{$i18ns('月负债情况')}}</td>
          <td colspan="6">
            {{page.monthly_debt}}
          </td>
        </tr>
        <tr>
         <th colspan="10" height="200px">
           {{$i18ns('除自有住房外其它个人资产概况（包括借款人夫妻共有的房产、汽车、股票等动产和不动产）：')}}<span class="underline">{{page.other_personal_assets_surv}}</span>
         </th>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";
import accounting from "pte-ui/utils/accounting";

export default {
  name: "BorrowerMontIncomeStruReport",
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

      page: {
        personal_salary_total_income: "", //个人薪金收入合计
        personal_salary_total_income_basis: [], //个人薪资收入合计已认定的收入依据
        property_rental_total_income: "", // 财产出租收入合计
        property_rental_total_income_basis: [] ,//财产出租收入合计已认定的收入依据
        personal_fina_assets_total: "" ,//个人金融资产合计
        personal_fina_assets_total_basis: [] ,//个人金融资产合计已认定的收入依据
        deposit: "" ,//存款
        national_debt: "" ,//国债
        fund: "" ,//基金
        personal_inve_income_total: "" ,//个人投资收益合计
        personal_inve_income_total_basis: [] ,//个人投资收益合计已认定的收入依据
        personal_operate_income_total: "" ,//个人经营收益合计
        personal_operate_income_total_basis: [] ,//个人经营收益合计已认定的收入依据
        monthly_income_total: "" ,//月收入总计
        monthly_debt: "" ,//月负债情况
        other_personal_assets_surv: "" //除自有住房外其它个人资产概况(包括借款人夫妻共有的房产、汽车、股票等动产和不动产)
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
        servicecode: "ar1710",
        apply_no: that.apply_no,
        cust_no: that.cust_no,
        due_item_no: that.due_item_no
      }
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.page = res.data;
            that.checkboxDataTransform(res.data);
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
      this.page.personal_salary_total_income_basis = data.personal_salary_total_income_basis.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.property_rental_total_income_basis = data.property_rental_total_income_basis.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.personal_fina_assets_total_basis = data.personal_fina_assets_total_basis.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.personal_inve_income_total_basis = data.personal_inve_income_total_basis.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.personal_operate_income_total_basis = data.personal_operate_income_total_basis.replaceAll(" ", "").split(",").filter((item) => item !== '');
      console.log("最新",this.page)
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
}

td {
  width: 10%;
  text-align: center;
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

.th_desc {
  text-align: left;
}

.underline{
  text-decoration: underline;
  font-weight: bold;
}
</style>
