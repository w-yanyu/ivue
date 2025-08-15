<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr>
          <th colspan="10" class="table_header">担保方式等信息</th>
        </tr>
        <tr>
          <th rowspan="3">担保人情况</th>
          <td>担保人姓名</td>
          <td>{{ page.guarantor_name }}</td>
          <td>身份证号码</td>
          <td colspan="3">{{ page.id_card }}</td>
          <td>手机号码</td>
          <td colspan="3">{{ page.mobile_no }}</td>
        </tr>
        <tr>
          <td>工作单位</td>
          <td colspan="2">{{ page.job_corp }}</td>
          <td>职务</td>
          <td>{{page.job}}</td>
          <td>工作年限</td>
          <td>{{page.work_years}}</td>
          <td>年收入</td>
          <td>{{page.year_income | formatMoney}}</td>
        </tr>
        <tr>
          <td>家庭住址</td>
          <td colspan="5">{{ page.home_address }}</td>
          <td>主要资产</td>
          <td colspan="3">{{ page.major_asset }}</td>
        </tr>
        <tr>
          <th rowspan="2">抵押物情况</th>
          <td>抵押物名称</td>
          <td colspan="3">{{ page.collateral_name }}</td>
          <td>位置/面积</td>
          <td colspan="2">{{ page.area }}</td>
          <td>所有权人</td>
          <td colspan="2">{{ page.owner }}</td>
        </tr>
        <tr>
          <td>评估值</td>
          <td colspan="3">{{ page.eval_price | formatMoney }}</td>
          <td>抵押值</td>
          <td colspan="2">{{ page.pled_price | formatMoney }}</td>
          <td>抵押率</td>
          <td colspan="2">{{ page.mortgage_rate | formatMoney }}</td>
        </tr>
        <tr>
          <th rowspan="2">侧面了解</th>
          <td>渠道名称</td>
          <td colspan="4">{{ page.channel_name }}</td>
          <td>固定电话</td>
          <td colspan="4">{{ page.phone_no }}</td>
        </tr>
        <tr>
          <td>侧面了解情况</td>
          <td colspan="9">{{ page.size_condition }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";
import accounting from "pte-ui/utils/accounting";

export default {
  name: "ArbGuarReport",
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
      due_item_no: "custATA3", //调查项编号

      maxEducationList: [], //最高学历字典列表
      workTypeList: [], //单位类型字典列表

      page: {
        guarantor_name: "", //担保人姓名
        id_card: "", //身份证号码
        mobile_no: "", //手机号码
        job_corp: "", // 工作单位
        job: "", // 职务
        work_years: "", // 工作年限
        year_income: "", // 年收入
        major_asset: "", // 主要资产
        collateral_name: "", // 抵押物名称
        area: "", // 面积
        owner: "", // 所有权人
        eval_price: "", // 评估价
        pled_price: "", // 抵押价
        mortgage_rate: "", // 抵押率
        channel_name: "", // 渠道名称
        phone_no: "", // 固定电话
        size_condition: "" // 侧面了解情况
      }
    }
  },
  filters: {
    formatMoney(value) {
      return accounting.formatMoney(value, "");
    }
  },
  created() {
    this.apply_no = this.cParentParams.apply_no;
    this.cust_no = this.cParentParams.cust_no;
    this.due_item_no = this.cParentParams.due_item_no; ;
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
        servicecode: "ar1704",
        apply_no: that.apply_no,
        cust_no: that.cust_no,
        due_item_no: that.due_item_no,
        due_item_no: "custATA3"
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
</style>
