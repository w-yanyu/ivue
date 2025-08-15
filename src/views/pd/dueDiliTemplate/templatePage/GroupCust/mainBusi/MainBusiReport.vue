<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr>
          <th colspan="10" class="table_header table_desc"><b>主营业务调查</b></th>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">核心企业的行业分类</td>
          <td colspan="2">{{ page.ent_industry_class }}</td>
          <td colspan="2" class="table_desc">主营产品</td>
          <td colspan="4">{{ page.oper_main_prod }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">经营规模</td>
          <td colspan="2">{{ page.oper_scale }}</td>
          <td colspan="2" class="table_desc">市场占有率(%)</td>
          <td colspan="4">{{ page.market_share_rate }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">在集团内的资产占比(%)</td>
          <td colspan="2">{{ page.assets_prop }}</td>
          <td colspan="2" class="table_desc">在集团内的利润占比(%)</td>
          <td colspan="4">{{ page.profit_prop }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">行业地位</td>
          <td colspan="8">{{ page.locm_indp }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">盈利水平</td>
          <td colspan="8">{{ page.profitability }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";
import accounting from "pte-ui/utils/accounting";

export default {
  name: "MainBusiReport",
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

      ccyCodeList: [], //还款方式列表
      clallocationList: [], //分配方式列表
      saleProdList: [], //可售产品分配限额列表

      page: {
        ent_industry_class: "", //核心企业的行业分类
        oper_main_prod: "", //经营主要产品
        oper_scale: "", //经营规模
        market_share_rate: "", // 市场占有率
        locm_indp: "", // 当地市场行业地位
        profitability: "", // 盈利水平
        assets_prop: "", // 在集团内的资产占比
        profit_prop: "", // 在集团内的利润占比
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
    // this.due_item_no = "custETA4";
    // this.apply_no = "123123123123";
    // this.cust_no = "UR00000000014904";
    this.getMainBusiData();
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
     * 获取授信分配限额信息
     */
    async getMainBusiData() {
      let that = this;
      if (!that.checkParams()) {
        return;
      }
      let params = {
        servicecode: "ar1736",
        apply_no: that.apply_no,
        due_item_no: that.due_item_no,
        cust_no: that.cust_no,
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
  table-layout: fixed;
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
  height: auto;
  min-height: 100px;
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>
