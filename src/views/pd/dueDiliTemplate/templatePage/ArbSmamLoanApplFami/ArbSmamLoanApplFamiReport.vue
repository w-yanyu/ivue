<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr>
          <th colspan="10" class="table_header">申请人及其家庭信息</th>
        </tr>
        <tr>
          <td>申请人姓名</td>
          <td>{{ page.applicant_name }}</td>
          <td>性别</td>
          <td colspan="2">
            <input type="checkbox" disabled name="sex_tp" v-model="page.sex_tp" value="1">男
            <input type="checkbox" disabled name="sex_tp" v-model="page.sex_tp" value="0">女
          </td>
          <td>身份证号</td>
          <td colspan="4">{{ page.id_card }}</td>
        </tr>
        <tr>
          <td>年龄</td>
          <td colspan="6" class="text_left">
            <input type="checkbox" disabled name="age" v-model="page.age" value="1">22岁以下
            <input type="checkbox" disabled name="age" v-model="page.age" value="2">22~29
            <input type="checkbox" disabled name="age" v-model="page.age" value="3">30~44
            <input type="checkbox" disabled name="age" v-model="page.age" value="4">45~54
            <input type="checkbox" disabled name="age" v-model="page.age" value="5">55~60
          </td>
          <td>具体年龄</td>
          <td colspan="2">{{ page.spec_age }}</td>
        </tr>
        <tr>
          <td>婚姻状况</td>
          <td colspan="6" class="text_left">
            <input type="checkbox" disabled name="mari_status" v-model="page.mari_status" value="1">已婚
            <input type="checkbox" disabled name="mari_status" v-model="page.mari_status" value="2">再婚
            <input type="checkbox" disabled name="mari_status" v-model="page.mari_status" value="3">离异
            <input type="checkbox" disabled name="mari_status" v-model="page.mari_status" value="4">丧偶
            <input type="checkbox" disabled name="mari_status" v-model="page.mari_status" value="Z">未婚
          </td>
          <td>家庭人数</td>
          <td colspan="2">{{ page.family_number }}</td>
        </tr>
        <tr>
          <td>配偶职业</td>
          <td colspan="6" class="text_left">
            <input type="checkbox" disabled name="spouse_job" v-model="page.spouse_job" value="1">参与经营
            <input type="checkbox" disabled name="spouse_job" v-model="page.spouse_job" value="2">公职人
            <input type="checkbox" disabled name="spouse_job" v-model="page.spouse_job" value="3">其他工作
            <input type="checkbox" disabled name="spouse_job" v-model="page.spouse_job" value="4">照顾家庭
            <input type="checkbox" disabled name="spouse_job" v-model="page.spouse_job" value="5">其他生意
          </td>
          <td>具体信息</td>
          <td colspan="2">{{ page.spouse_job_detail }}</td>
        </tr>
        <tr>
          <td>子女职业</td>
          <td colspan="6" class="text_left">
            <input type="checkbox" disabled name="children_job" v-model="page.children_job" value="1">上学/年幼
            <input type="checkbox" disabled name="children_job" v-model="page.children_job" value="2">参与经营
            <input type="checkbox" disabled name="children_job" v-model="page.children_job" value="3">工作
            <input type="checkbox" disabled name="children_job" v-model="page.children_job" value="4">无业
            <input type="checkbox" disabled name="children_job" v-model="page.children_job" value="5">无子女
          </td>
          <td>具体信息</td>
          <td colspan="2">{{ page.children_job_detail }}</td>
        </tr>
        <tr>
          <td>户籍所在地</td>
          <td colspan="2" class="text_left">
            <input type="checkbox" disabled name="hous_regi_place" v-model="page.hous_regi_place" value="1">本地
            <input type="checkbox" disabled name="hous_regi_place" v-model="page.hous_regi_place" value="2">外地
          </td>
          <td>居住地址</td>
          <td colspan="6">{{ page.resi_address }}</td>
        </tr>
        <tr>
          <td>居住年限</td>
          <td colspan="6" class="text_left">
            <input type="checkbox" disabled name="live_year" v-model="page.live_year" value="1">10年以上
            <input type="checkbox" disabled name="live_year" v-model="page.live_year" value="2">5-10年
            <input type="checkbox" disabled name="live_year" v-model="page.live_year" value="3">3-5年
            <input type="checkbox" disabled name="live_year" v-model="page.live_year" value="4">1-3年
            <input type="checkbox" disabled name="live_year" v-model="page.live_year" value="5">1年以下
          </td>
          <td>具体年限</td>
          <td colspan="2">{{ page.spec_year }}</td>
        </tr>
        <tr>
          <td>住房状况</td>
          <td colspan="9" class="text_left">
            <input type="checkbox" disabled name="room_status" v-model="page.room_status" value="1">自有
            <input type="checkbox" disabled name="room_status" v-model="page.room_status" value="2">按揭
            <input type="checkbox" disabled name="room_status" v-model="page.room_status" value="3">家人拥有
            <input type="checkbox" disabled name="room_status" v-model="page.room_status" value="4">住经营场所
            <input type="checkbox" disabled name="room_status" v-model="page.room_status" value="5">租赁
            <input type="checkbox" disabled name="room_status" v-model="page.room_status" value="6">其他
          </td>
        </tr>
        <tr>
          <td>其他财产</td>
          <td colspan="6" class="text_left">
            <input type="checkbox" disabled name="other_property" v-model="page.other_property" value="1">房产
            <input type="checkbox" disabled name="other_property" v-model="page.other_property" value="2">土地使用权
            <input type="checkbox" disabled name="other_property" v-model="page.other_property" value="3">经营权
            <input type="checkbox" disabled name="other_property" v-model="page.other_property" value="4">车辆
            <input type="checkbox" disabled name="other_property" v-model="page.other_property" value="5">其他
          </td>
          <td>财产所有人</td>
          <td colspan="2">{{ page.property_owner }}</td>
        </tr>
        <tr>
          <td>家庭固定电话</td>
          <td colspan="5" class="text_left">
            <input type="checkbox" disabled name="home_fix_phone" v-model="page.home_fix_phone" value="1">有
            <input type="checkbox" disabled name="home_fix_phone" v-model="page.home_fix_phone" value="2">无
          </td>
          <td>电话号码</td>
          <td>{{ page.telephone_number }}</td>
          <td>手机</td>
          <td>{{ page.mobile_no }}</td>
        </tr>
        <tr>
          <td>客户类型</td>
          <td colspan="5" class="text_left">
            <input type="checkbox" disabled name="customer_type" v-model="page.customer_type" value="1">老客户
            <input type="checkbox" disabled name="customer_type" v-model="page.customer_type" value="2">新客户
          </td>
          <td>具体情况</td>
          <td>{{ page.customer_type_detail }}</td>
          <td>累计余额</td>
          <td>{{ page.cumu_amt | formatMoney }}</td>
        </tr>
        <tr>
          <td>信贷记录</td>
          <td colspan="9" class="text_left">
            <input type="checkbox" disabled name="credit_record" v-model="page.credit_record" value="1">良好记录
            <input type="checkbox" disabled name="credit_record" v-model="page.credit_record" value="2">无记录
            <input type="checkbox" disabled name="credit_record" v-model="page.credit_record" value="3">非主观不良
            <input type="checkbox" disabled name="credit_record" v-model="page.credit_record" value="4">不良记录
            <input type="checkbox" disabled name="credit_record" v-model="page.credit_record" value="5">特殊说明
          </td>
        </tr>
        <tr>
          <td>特殊说明内容</td>
          <td colspan="9">
           {{page.special_note}}
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
  name: "ArbSmamLoanApplFamiReport",
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
        applicant_name: "", //申请人姓名
        sex_tp: [], //性别
        id_card: "", // 身份证号码
        age: [], // 年龄
        spec_age: "", // 具体年龄
        mari_status: [], // 具体年龄
        family_number: "", // 家庭人数
        spouse_job: [], // 配偶职业
        spouse_job_detail: "", // 配偶职业具体信息
        children_job: [], // 子女职业
        children_job_detail: "", // 子女职业具体信息
        hous_regi_place: [], // 户籍所在地
        resi_address: "", // 居住地址
        work_years: "", // 工作年限
        live_year: [], // 居住年限
        spec_year: "", // 具体年限
        room_status: [], // 住房状况
        other_property: [], // 其他财产
        property_owner: "", // 财产所有人
        home_fix_phone: [], // 家庭固定电话
        telephone_number: "", // 电话号码
        mobile_no: "", // 手机号码
        customer_type: [], // 客户类型
        customer_type_detail: "", // 客户类型具体情况
        cumu_amt: "" ,// 累计余额
        credit_record: [] ,// 信贷记录
        special_note: "" // 特殊说明内容
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
     * 获取当前客户数据
     */
    getCustData() {
      let that = this;
      if(!that.checkParams()){
        return;
      }
      let params = {
        servicecode: "ar1734",
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
      this.page.sex_tp = (data.sex_tp !== "" && data.sex_tp !== null )?data.sex_tp.replaceAll(" ", "").split(",").filter((item) => item !== ''): [];
      this.page.age = (data.age !== "" && data.age !== null )?data.age.replaceAll(" ", "").split(",").filter((item) => item !== ''): [];
      this.page.mari_status = (data.mari_status !== "" && data.mari_status !== null )?data.mari_status.replaceAll(" ", "").split(",").filter((item) => item !== ''): [];
      this.page.spouse_job = (data.spouse_job !== "" && data.spouse_job !== null )?data.spouse_job.replaceAll(" ", "").split(",").filter((item) => item !== ''): [];
      this.page.children_job = (data.children_job !== "" && data.children_job !== null )?data.children_job.replaceAll(" ", "").split(",").filter((item) => item !== ''): [];
      this.page.hous_regi_place = (data.hous_regi_place !== "" && data.hous_regi_place !== null )?data.hous_regi_place.replaceAll(" ", "").split(",").filter((item) => item !== ''): [];
      this.page.live_year = (data.live_year !== "" && data.live_year !== null )?data.live_year.replaceAll(" ", "").split(",").filter((item) => item !== ''): [];
      this.page.room_status = (data.room_status !== "" && data.room_status !== null )?data.room_status.replaceAll(" ", "").split(",").filter((item) => item !== ''): [];
      this.page.other_property = (data.other_property !== "" && data.other_property !== null )?data.other_property.replaceAll(" ", "").split(",").filter((item) => item !== ''): [];
      this.page.home_fix_phone = (data.home_fix_phone !== "" && data.home_fix_phone !== null )?data.home_fix_phone.replaceAll(" ", "").split(",").filter((item) => item !== ''): [];
      this.page.customer_type = (data.customer_type !== "" && data.customer_type !== null )?data.customer_type.replaceAll(" ", "").split(",").filter((item) => item !== ''): [];
      this.page.credit_record = (data.credit_record !== "" && data.credit_record !== null )?data.credit_record.replaceAll(" ", "").split(",").filter((item) => item !== ''): [];
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
.text_left{
  text-align: left;
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
