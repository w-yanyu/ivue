<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr>
          <th colspan="10" class="table_header table_desc">二、申请人基本信息</th>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">客户名称</td>
          <td colspan="8">{{ page.cust_name }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">证件类型</td>
          <td colspan="2">{{ getDictLabel('certTypeList', page.cert_type) }}</td>
          <td colspan="2" class="table_desc">证件号码</td>
          <td colspan="4">{{ page.cert_no }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">注册地址</td>
          <td colspan="8">{{ page.issuing_addr }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">注册登记日期</td>
          <td colspan="2">{{ page.registration_date }}</td>
          <td colspan="2" class="table_desc">公司网站</td>
          <td colspan="4">{{ page.corp_websites }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">联系电话（征）</td>
          <td colspan="2">{{ page.phone_no }}</td>
          <td colspan="2" class="table_desc">同业客户类型</td>
          <td colspan="4">{{ getDictLabel('peerClassList', page.peer_class) }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">SWIFT码</td>
          <td colspan="2">{{ page.swift_code }}</td>
          <td colspan="2" class="table_desc">区域类型</td>
          <td colspan="4">{{ getDictLabel('homeAndAbroadList', page.home_and_abroad) }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">是否上市公司</td>
          <td colspan="2">{{ getDictLabel('isOrNoList', page.is_listed_company) }}</td>
          <td colspan="2" class="table_desc">上市公司类型</td>
          <td colspan="4">{{ getDictLabel('listedCompanyTypeList', page.listed_company_type) }}</td>
        </tr>
        <tr>
          <td colspan="2" class="table_desc">从业人数（征）</td>
          <td colspan="2">{{ page.employees_count }}</td>
        </tr>
        <tr>
          <td colspan="10" class="table_desc"><b>主要股东</b></td>
        </tr>
        <tr>
          <th colspan="2" class="table_desc">股东名称</th>
          <th colspan="1" class="table_desc">股权比例（％）</th>
          <th colspan="2" class="table_desc">出资类别</th>
          <th colspan="1" class="table_desc">币种</th>
          <th colspan="2" class="table_desc">金额(元)</th>
          <th colspan="2" class="table_desc">股东性质</th>
        </tr>
        <template v-if="!shareList || shareList.length == 0">
          <tr>
            <td colspan="2"></td>
            <td colspan="1"></td>
            <td colspan="2"></td>
            <td colspan="1"></td>
            <td colspan="2"></td>
            <td colspan="2"></td>
          </tr>
        </template>
        <template v-for="(item, index) in shareList">
          <tr :key="index">
            <td colspan="2">{{ item.cust_name }}</td>
            <td colspan="1">{{ item.ownership_ratio }}</td>
            <td colspan="2">{{ getDictLabel('contributiveTypeList', item.contributive_type) }}</td>
            <td colspan="1">{{ getDictLabel('ccyCodeList', item.ccy_code) }}</td>
            <td colspan="2">{{ item.contributive_amt | formatMoney }}</td>
            <td colspan="2">{{ getDictLabel('holderTypeList', item.holder_type) }}</td>
          </tr>
        </template>
        <tr>
          <td colspan="10" class="table_desc"><b>主要子公司</b></td>
        </tr>
        <tr>
          <th colspan="2" class="table_desc">客户名称</th>
          <th colspan="2" class="table_desc">出资方式</th>
          <th colspan="2" class="table_desc">出资币种</th>
          <th colspan="4" class="table_desc">出资金额(万元)</th>
        </tr>
        <template v-if="!subsidiaryList || subsidiaryList.length == 0">
          <tr>
            <td colspan="2"></td>
            <td colspan="2"></td>
            <td colspan="2"></td>
            <td colspan="4"></td>
          </tr>
        </template>
        <template v-for="(item, index) in subsidiaryList">
          <tr :key="index">
            <td colspan="2">{{ item.cust_name }}</td>
            <td colspan="2">{{ getDictLabel('contributiveTypeList', item.contributive_type) }}</td>
            <td colspan="2">{{ getDictLabel('ccyCodeList', item.ccy_code) }}</td>
            <td colspan="4">{{ item.contributive_amt | formatMoney }}</td>
          </tr>
        </template>
      </table>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";
import accounting from "pte-ui/utils/accounting";

export default {
  name: "ApplyerBaseInfoReport",
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

      ccyCodeList: [], //币种列表
      certTypeList: [], //分配方式列表
      peerClassList: [], //同业客户类型列表
      homeAndAbroadList: [], //区域类型列表
      isOrNoList: [], //是否列表
      listedCompanyTypeList: [], //上市公司类型列表
      holderTypeList: [], //股东性质
      contributiveTypeList: [], //出资类别列表

      shareList: [], //股东列表
      subsidiaryList: [], //子公司列表

      page: {
        cust_name: "", //客户名称
        cert_type: "", //证件类型
        cert_no: "", //证件号码
        issuing_addr: "", // 注册地址
        registration_date: "", // 注册登记日期
        corp_websites: "", // 公司网站
        phone_no: "", // 联系电话（征）
        peer_class: "", // 同业客户类型
        swift_code: "", // SWIFT码
        home_and_abroad: "", // 区域类型
        is_listed_company: "", // 是否上市公司
        listed_company_type: "", // 上市公司类型
        employees_count: "", // 从业人数（征）
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
    // this.due_item_no = "custDTA1";
    // this.apply_no = "20230717000000000052801";
    // this.cust_no = "UR00000000012751";
    //初始化数据字典
    this.getDictList("MS_CURRENCY", "ccyCodeList");//获取数据字典MS_CURRENCY
    this.getDictList("MS_E_CRET_TYPE", "certTypeList");//获取证件类型
    this.getDictList("US_E_PEER_CUST_CLASS", "peerClassList");//获取同业客户类型
    this.getDictList("US_E_HOME_AND_ABROAD", "homeAndAbroadList");//获取区域类型
    this.getDictList("MS_E_YESORNO", "isOrNoList");//获取数据字典MS_CURRENCY
    this.getDictList("US_E_MARKETYPE", "listedCompanyTypeList");//获取数上市公司类型
    this.getDictList("US_E_HOLDER_TYPE", "holderTypeList");//获取数据字典MS_CURRENCY
    this.getDictList("US_E_INVEST_TYPE", "contributiveTypeList");//获取数据出资类别
    this.getShareData();
    this.getSubsidiaryData();
    this.getOpenAccountData();
    this.getBaseInfoData();
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
     * 获取客户开户信息
     */
    async getOpenAccountData() {
      let that = this;
      if (!that.checkParams()) {
        return;
      }
      let params = {
        servicecode: "us0215",
        cust_no: that.cust_no
      }
      await MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.page.cust_name = res.data.cust_name;
            that.page.cert_type = res.data.cert_type;
            that.page.cert_no = res.data.cert_no;
            that.page.issuing_addr = res.data.issuing_addr;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 获取客户开户信息
     */
    async getBaseInfoData() {
      let that = this;
      if (!that.checkParams()) {
        return;
      }
      let params = {
        servicecode: "us0951",
        cust_no: that.cust_no
      }
      await MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.page.registration_date = res.data.registration_date;
            that.page.corp_websites = res.data.corp_websites;
            that.page.phone_no = res.data.phone_no;
            that.page.peer_class = res.data.peer_class;
            that.page.swift_code = res.data.swift_code;
            that.page.home_and_abroad = res.data.home_and_abroad;
            that.page.is_listed_company = res.data.is_listed_company;
            that.page.listed_company_type = res.data.listed_company_type;
            that.page.employees_count = res.data.employees_count;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 获取客户股东信息
     */
    async getShareData() {
      let that = this;
      if (!that.checkParams()) {
        return;
      }
      let params = {
        servicecode: "us0290",
        cust_no: that.cust_no,
        shoret: "SH"
      }
      await MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.shareList = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 获取子公司列表
     */
    async getSubsidiaryData() {
      let that = this;
      if (!that.checkParams()) {
        return;
      }
      let params = {
        servicecode: "us0290",
        cust_no: that.cust_no,
        shoret: "ET"
      }
      await MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.subsidiaryList = res.data;
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
  border-top: 0 !important;
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
  height: auto;
  min-height: 100px;
  word-break: break-all;
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>
