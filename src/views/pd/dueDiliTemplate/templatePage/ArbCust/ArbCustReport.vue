<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr>
          <th rowspan="6">个人信息</th>
          <td>姓名</td>
          <td colspan="2">{{ page.cust_name }}</td>
          <td>身份证号</td>
          <td colspan="6">{{ page.id_card }}</td>
        </tr>
        <tr>
          <td>*长期居住地/家庭住址</td>
          <td colspan="9">{{ page.home_address }}</td>
          <!--          <td>当地居住年限</td>-->
          <!--          <td colspan="3"></td>-->
        </tr>
        <tr>
          <td>*婚姻状况</td>
          <td colspan="4">
            <input type="checkbox" disabled name="marr_state" v-model="page.marr_state" value="1">未婚
            <input type="checkbox" disabled name="marr_state" v-model="page.marr_state" value="2">已婚
            <input type="checkbox" disabled name="marr_state" v-model="page.marr_state" value="3">离异
            <input type="checkbox" disabled name="marr_state" v-model="page.marr_state" value="4">丧偶
            <input type="checkbox" disabled name="marr_state" v-model="page.marr_state" value="Z">其他
          </td>
          <td>性别</td>
          <td>
            <input type="checkbox" disabled name="sex_tp" v-model="page.sex_tp" value="1">男
            <input type="checkbox" disabled name="sex_tp" v-model="page.sex_tp" value="2">女
          </td>
          <td>手机号码</td>
          <td colspan="2">{{ page.mobile_no }}</td>
        </tr>
        <tr>
          <td>学历</td>
          <td colspan="9">{{ getDictLabel('maxEducationList', page.max_educat_backg) }}</td>
          <!--          <td>子女状况</td>-->
          <!--          <td colspan="4">-->

          <!--          </td>-->
        </tr>
        <tr>
          <td>居住情况</td>
          <td colspan="9">
            <input type="checkbox" disabled name="live_info" v-model="page.live_info" value="1">商业按揭房
            <input type="checkbox" disabled name="live_info" v-model="page.live_info" value="2">行无按揭购房
            <input type="checkbox" disabled name="live_info" v-model="page.live_info" value="3">公积金按揭购房
            <input type="checkbox" disabled name="live_info" v-model="page.live_info" value="4">自建房
            <input type="checkbox" disabled name="live_info" v-model="page.live_info" value="5">租用
            <input type="checkbox" disabled name="live_info" v-model="page.live_info" value="6">亲属住房
            <input type="checkbox" disabled name="live_info" v-model="page.live_info" value="7">宿舍
          </td>
        </tr>
        <tr>
          <td>资产情况</td>
          <td colspan="9">
            <input type="checkbox" disabled name="asset_status" v-model="page.asset_status" value="1">商品房
            <input type="checkbox" disabled name="asset_status" v-model="page.asset_status" value="2">行驶证
            <input type="checkbox" disabled name="asset_status" v-model="page.asset_status" value="3">定期存款
            <input type="checkbox" disabled name="asset_status" v-model="page.asset_status" value="4">其他
          </td>
        </tr>
        <tr>
          <th rowspan="3">工作信息</th>
          <td>单位名称</td>
          <td colspan="4">{{ page.job_corp }}</td>
          <td>单位地址</td>
          <td colspan="5">{{ page.work_addr }}</td>
        </tr>
        <tr>
          <td>单位职务</td>
          <td>{{ page.job }}</td>
          <td>工作年限</td>
          <td>{{ page.work_years }}</td>
          <td>年收入</td>
          <td>{{ page.year_income | formatMoney }}</td>
          <td>单位类型</td>
          <td colspan="3">
            {{ getDictLabel('workTypeList', page.work_type) }}
          </td>
        </tr>
        <tr>
          <td>*收入落实</td>
          <td colspan="9">
            <input type="checkbox" disabled name="income_impl" v-model="page.income_impl" value="1">银行流水
            <input type="checkbox" disabled name="income_impl" v-model="page.income_impl" value="2">公积金社保
            <input type="checkbox" disabled name="income_impl" v-model="page.income_impl" value="3">收入证明
            <input type="checkbox" disabled name="income_impl" v-model="page.income_impl" value="4">工作证
            <input type="checkbox" disabled name="income_impl" v-model="page.income_impl" value="5">其他
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
  name: "ArbCustReport",
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

      maxEducationList: [], //最高学历字典列表
      workTypeList: [], //单位类型字典列表

      page: {
        cust_name: "", //客户姓名
        mobile_no: "", //手机号码
        sex_tp: [], //性别
        id_card: "", // 身份证号码
        home_address: "", // 家庭住址
        marr_state: [], // 婚姻状态
        max_educat_backg: "", // 最高学历
        live_info: [], // 居住情况
        asset_status: [], // 资产情况
        job_corp: "", // 工作单位
        work_addr: "", // 工作单位地址
        job: "", // 职务
        work_years: "", // 工作年限
        ccy_code: "", // 币种
        year_income: "", // 年收入
        work_type: "", // 单位类型
        income_impl: [] // 收入落实
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
    this.due_item_no = this.cParentParams.due_item_no;
    ;
    this.getCustData();
    //初始化数据字典
    this.getDictList("AR_E_WORK_TYPE", "workTypeList");//获取数据字典AR_E_WORK_TYPE
    this.getDictList("MS_E_MAXEDU", "maxEducationList");//获取数据字典MS_E_MAXEDU
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
        servicecode: "ar1700",
        apply_no: that.apply_no,
        cust_no: that.cust_no,
        due_item_no: that.due_item_no
      }
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.page = res.data;
            console.log("page", that.page)
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
      this.page.sex_tp = data.sex_tp.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.marr_state = data.marr_state.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.live_info = data.live_info.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.asset_status = data.asset_status.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.income_impl = data.income_impl.replaceAll(" ", "").split(",").filter((item) => item !== '');
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
</style>
