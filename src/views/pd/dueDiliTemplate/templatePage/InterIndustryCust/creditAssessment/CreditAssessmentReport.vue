<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr>
          <th colspan="10" class="table_header table_desc">五、信用评估信息</th>
        </tr>
        <tr>
          <th colspan="10" class="table_desc">1、银行背景和业务概况
            成立时间、主要股东及变迁、历年重大并购、控股股东及影响力、高管层的资历、资本规模、资产规模、国内排名、网点和员工数量、当地市场份额、主营业务、经营特色、外资入股或股权重组情况、当地市场的活跃度、市场份额与地位、在当地市场的声誉、有无不良记录等。
          </th>
        </tr>
        <tr>
          <td colspan="10" class="page-desc">{{ page.desc1 }}</td>
        </tr>
        <tr>
          <th colspan="10" class="table_desc">2、 银行资本实力和流动性分析
            股东权益的变化及构成项分析、资本充足率情况、总资产变化、总负债变化、流动性比例等财务指标的变动。
          </th>
        </tr>
        <tr>
          <td colspan="10" class="page-desc">{{ page.desc2 }}</td>
        </tr>
        <tr>
          <th colspan="10" class="table_desc">3、银行资产质量和风险控制措施分析
            贷款规模、贷款行业分布、不良贷款余额、不良贷款率、不良贷款率变动的主要原因、贷款拨备余额、贷款拨备覆盖率、贷款集中度、关联贷款情况、贷款风险控制措施.
          </th>
        </tr>
        <tr>
          <td colspan="10" class="page-desc">{{ page.desc3 }}</td>
        </tr>
        <tr>
          <th colspan="10" class="table_desc">4、 银行盈利性分析
            营业利润增减及结构分析、中间业务收入、净利润、资本回报率、每股盈利、成本收入比、利润变化的主要原因。
          </th>
        </tr>
        <tr>
          <td colspan="10" class="page-desc">{{ page.desc4 }}</td>
        </tr>
        <tr>
          <th colspan="10" class="table_desc">5、银行经营战略
            经营重点的调整、目标市场的调整、组织架构的改革、资本市场融资计划、引入境内外战略投资者计划、兼并与重组计划等。
          </th>
        </tr>
        <tr>
          <td colspan="10" class="page-desc">{{ page.desc5 }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";
import accounting from "pte-ui/utils/accounting";

export default {
  name: "CreditAssessmentReport",
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

      page: {
        desc1: "", //描述1
        desc2: "", //描述2
        desc3: "", //描述3
        desc4: "", // 描述4
        desc5: "", // 描述5
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
    // this.due_item_no = "custDTA5";
    // this.apply_no = "20220720000000000032412";
    // this.cust_no = "UR00000000014301";
    this.getCreditAssessmentData();
  },
  methods: {
    /**
     * 检查当前页面请求必输参数是否存在
     */
    checkParams() {
      if (this.apply_no === null || this.apply_no === "") {
        return false;
      }
      if (this.cust_no === null || this.cust_no === "") {
        return false;
      }
      if (this.due_item_no === null || this.due_item_no === "") {
        return false;
      }
      return true;
    },
    /**
     * 获取信用评估信息
     */
    async getCreditAssessmentData() {
      let that = this;
      if (!that.checkParams()) {
        return;
      }
      let params = {
        servicecode: "ar1702",
        apply_no: that.apply_no,
        cust_no: that.cust_no,
        due_item_no: that.due_item_no,
      }
      await MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
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

.table_desc {
  text-align: left;
  padding-left: 10px;
  background: #f3f4f5;
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
  height: 20px;
}

.page-desc {
  min-height: 150px !important;
  height: auto !important;
  height: 150px !important;
  text-align: left;
  padding-left: 10px;
  //word-break: break-all;
  //word-wrap: break-word;
  //white-space: pre-wrap;
}
</style>
