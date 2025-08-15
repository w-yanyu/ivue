<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr>
          <th colspan="10" class="table_header table_desc"><b>{{$i18ns('基本信息')}}</b></th>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">{{$i18ns('客户编号')}}</td>
          <td colspan="3">{{ page.cust_no }}</td>
          <td colspan="2" class="table_desc">{{$i18ns('客户名称')}}</td>
          <td colspan="3">{{ page.cust_name }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">{{$i18ns('证件类型')}}</td>
          <td colspan="3">{{ getDictLabel('certTypeDictList', page.cert_type) }}</td>
          <td colspan="2" class="table_desc">{{$i18ns('证件号码')}}</td>
          <td colspan="3">{{ page.cert_no }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">{{$i18ns('注册登记日期')}}</td>
          <td colspan="3">{{ page.registration_date }}</td>
          <td colspan="2" class="table_desc">{{$i18ns('成立年份')}}</td>
          <td colspan="3">{{ page.year_established }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">{{$i18ns('联系电话')}}</td>
          <td colspan="8">{{ page.phone_no }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">{{$i18ns('注册资本')}}</td>
          <td colspan="3">{{ page.register_princi | formatMoney}}</td>
          <td colspan="2" class="table_desc">{{$i18ns('注册资本币种')}}</td>
          <td colspan="3">{{ getDictLabel('ccyCodeList', page.register_ccy) }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">{{$i18ns('实收资本')}}</td>
          <td colspan="3">{{ page.paid_in_capital | formatMoney}}</td>
          <td colspan="2" class="table_desc">{{$i18ns('实收资本币种')}}</td>
          <td colspan="3">{{ getDictLabel('ccyCodeList', page.paid_in_capital_ccy) }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">{{$i18ns('经营状态')}}</td>
          <td colspan="3">{{ getDictLabel('operateStatusList', page.operate_status) }}</td>
          <td colspan="2" class="table_desc">{{$i18ns('法定代表人')}}</td>
          <td colspan="3">{{ page.legal_representative }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">{{$i18ns('法定代表人证件类型')}}</td>
          <td colspan="3">{{ getDictLabel('certTypeDictList', page.legal_representative_type) }}</td>
          <td colspan="2" class="table_desc">{{$i18ns('法定代表人证件号码')}}</td>
          <td colspan="3">{{ page.legal_representative_no }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">{{$i18ns('注册地址(征)')}}</td>
          <td colspan="8">{{ page.registered_addr }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">{{$i18ns('经营范围及主要产品(征)')}}</td>
          <td colspan="8">{{ page.area_main_product }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">{{$i18ns('行业分类')}}</td>
          <td colspan="3">{{ page.industry_type_name }}</td>
          <td colspan="2" class="table_desc">{{$i18ns('限制或鼓励行业(新标准)')}}</td>
          <td colspan="3">{{ page.restri_encour_name }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">{{$i18ns('控股类型')}}</td>
          <td colspan="3">{{ getDictLabel('holdingTypeList', page.holding_type) }}</td>
          <td colspan="2" class="table_desc">{{$i18ns('从业人数(征)')}}</td>
          <td colspan="3">{{ page.employees_count }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";
import accounting from "pte-ui/utils/accounting";

export default {
  name: "entBaseInfoReport",
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
        cust_no: "", //客户编号
        cust_name: "", //客户名称
        cert_type: "", // 证件类型
        cert_no: "", // 证件编号
        cert_day: "", // 证件签发日期
        card_end_day: "",// 证件到期日期

        registration_date: "",// 注册登记日期
        register_princi: "",// 注册资本(万元)
        register_ccy: "",// 注册资本币种
        paid_in_capital: "",// 实收资本(万元)
        paid_in_capital_ccy: "",// 实收资本币种
        year_established: "",// 成立年份
        operate_status: "",// 经营状态
        legal_representative: "",// 法定代表人
        legal_representative_type: "",// 法定代表人证件类型
        legal_representative_no: "",// 法定代表人证件号码
        registered_addr: "",// 注册地址(征)
        area_main_product: "",// 经营范围及主要产品(征)
        phone_no: "",// 联系电话
        industry_type_name: "",// 行业分类
        restri_encour_name: "",// 限制或鼓励行业(新标准)
        holding_type: "",// 控股类型
        employees_count: "" // 从业人数(征)
      },
      certTypeDictList: [], //证件类型字典列表
      ccyCodeList: [], //币种字典列表
      operateStatusList: [], //经营状态字典列表
      holdingTypeList: [], //控股类型字典列表
    }
  },
  filters: {
    formatMoney(value) {
      return accounting.formatMoney(value, "");
    }
  },
  created() {


  },
  mounted() {
    this.due_item_no = this.cParentParams.due_item_no;
    this.apply_no = this.cParentParams.apply_no;
    this.cust_no = this.cParentParams.cust_no;
    // this.due_item_no = "custCTA101";
    // this.apply_no = "20230717000000000052801";
    // this.cust_no = "UR00000000015402";
    //初始化数据字典
    this.getDictList("MS_E_CRET_TYPE", "certTypeDictList");
    this.getDictList("MS_CURRENCY", "ccyCodeList");
    this.getDictList("US_E_OPERATE_STATUS", "operateStatusList");
    this.getDictList("US_E_STOCKCTRLTYPE", "holdingTypeList");
    this.getEntCustOpenData();
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
     * 获取对公客户数据
     */
    getEntCustOpenData() {
      let that = this;
      if (!that.checkParams()) {
        return;
      }
      let params = {
        servicecode: "us0215",
        cust_no: that.cust_no
      }
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            // that.page.cust_no = res.data.cust_no;
            that.page.cust_no = that.cust_no;
            that.page.cust_name = res.data.cust_name;
            that.page.cert_type = res.data.cert_type;
            that.page.cert_no = res.data.cert_no;
            that.page.cert_day = res.data.cert_day;
            that.page.card_end_day = res.data.card_end_day;
            this.getEntCustData();
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 获取对公客户数据
     */
    getEntCustData() {
      let that = this;
      if (!that.checkParams()) {
        return;
      }
      let params = {
        servicecode: "us0210",
        cust_no: that.cust_no
      }
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.page.registration_date = res.data.registration_date;
            that.page.register_princi = res.data.register_princi;
            that.page.register_ccy = res.data.register_ccy;
            that.page.paid_in_capital = res.data.paid_in_capital;
            that.page.paid_in_capital_ccy = res.data.paid_in_capital_ccy;
            that.page.year_established = res.data.year_established;
            that.page.operate_status = res.data.operate_status;
            that.page.legal_representative = res.data.legal_representative;
            that.page.legal_representative_type = res.data.legal_representative_type;
            that.page.legal_representative_no = res.data.legal_representative_no;
            that.page.registered_addr = res.data.registered_addr;
            that.page.area_main_product = res.data.area_main_product;
            that.page.phone_no = res.data.phone_no;
            that.page.industry_type_name = res.data.industry_type_name;
            that.page.restri_encour_name = res.data.restri_encour_name;
            that.page.holding_type = res.data.holding_type;
            that.page.employees_count = res.data.employees_count;
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
    },
    transIsVirtual(param) {
      if (param === "0") {
        this.is_virtual1 = false;
        this.is_virtual2 = true;
      } else if (param === "1") {
        this.is_virtual1 = true;
        this.is_virtual2 = false;
      } else {
        this.is_virtual1 = false;
        this.is_virtual2 = false;
      }
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
