<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr>
          <th colspan="10" class="table_header"><b>{{$i18ns('主体资格调查')}}</b>{{$i18ns('（借款人本人性别：')}}
            <input type="checkbox" disabled name="gender" v-model="page.gender" value="1">{{$i18ns('男')}}
            <input type="checkbox" disabled name="gender" v-model="page.gender" value="2">{{$i18ns('女')}}
            {{$i18ns('婚姻状况：')}}
            <input type="checkbox" disabled name="marital_status" v-model="page.marital_status" value="1">{{$i18ns('未婚')}}
            <input type="checkbox" disabled name="marital_status" v-model="page.marital_status" value="2">{{$i18ns('已婚')}}
            <input type="checkbox" disabled name="marital_status" v-model="page.marital_status" value="3">{{$i18ns('离异')}}
            <input type="checkbox" disabled name="marital_status" v-model="page.marital_status" value="4">{{$i18ns('丧偶')}}
            <input type="checkbox" disabled name="marital_status" v-model="page.marital_status" value="Z">{{$i18ns('其他')}}
            ）
          </th>
        </tr>
        <tr>
          <td>{{$i18ns('借款人姓名')}}</td>
          <td colspan="2">{{ page.borrower_name }}</td>
          <td>{{$i18ns('共同借款人（配偶）姓名')}}</td>
          <td colspan="2">{{ page.co_borrower_name }}</td>
          <td>{{$i18ns('其他共同借款人姓名')}}</td>
          <td colspan="3">{{ page.other_co_borrower_name }}</td>
        </tr>
        <tr>
          <th rowspan="2">{{$i18ns('现固定居所情况')}}</th>
          <td>{{$i18ns('详细住址')}}</td>
          <td colspan="5">{{ page.home_address }}</td>
          <td>{{$i18ns('建筑面积')}}</td>
          <td colspan="3">{{ page.built_area }}</td>
        </tr>
        <tr>
          <td>{{$i18ns('是否租赁居住')}}</td>
          <td colspan="2">
            <input type="checkbox" disabled name="is_rental_live" v-model="page.is_rental_live" value="1">{{$i18ns('是')}}
            <input type="checkbox" disabled name="is_rental_live" v-model="page.is_rental_live" value="0">{{$i18ns('否')}}
          </td>
          <td colspan="2">{{$i18ns('自有住房购买方式')}}</td>
          <td colspan="5">
            <input type="checkbox" disabled name="house_purchase_way" v-model="page.house_purchase_way" value="1">{{$i18ns('全款')}}
            <input type="checkbox" disabled name="house_purchase_way" v-model="page.house_purchase_way" value="2">{{$i18ns('按揭')}}
            <input type="checkbox" disabled name="house_purchase_way" v-model="page.house_purchase_way" value="3">{{$i18ns('分期付款')}}
          </td>
        </tr>
        <tr class="tr_header">
          <th>
            {{$i18ns('个人身份及信用情况调查【包括但不限于右侧列示的调查要点】')}}
          </th>
          <th colspan="9" class="th_desc">
            <el-row>1.{{$i18ns('其是否有曾用名或别名')}}
              <input type="checkbox" disabled name="is_another_name" v-model="page.is_another_name" value="1">{{$i18ns('是')}}
              <input type="checkbox" disabled name="is_another_name" v-model="page.is_another_name" value="0">{{$i18ns('否')}}
              {{$i18ns('曾用名或别名：')}} {{page.another_name}}
            </el-row>
            <el-row>2.{{$i18ns('是否已查询其所有姓名的信用报告')}}
              <input type="checkbox" disabled name="is_surv_all_name_report" v-model="page.is_surv_all_name_report" value="1">{{$i18ns('是')}}
              <input type="checkbox" disabled name="is_surv_all_name_report" v-model="page.is_surv_all_name_report" value="0">{{$i18ns('否')}}
            </el-row>
            <el-row>3.{{$i18ns('其是否联网查询公民身份信息系统、确认上述保证人身份属实且合法有效')}}
              <input type="checkbox" disabled name="is_query_system_confirm_identity" v-model="page.is_query_system_confirm_identity" value="1">{{$i18ns('是')}}
              <input type="checkbox" disabled name="is_query_system_confirm_identity" v-model="page.is_query_system_confirm_identity" value="0">{{$i18ns('否')}}
            </el-row>
            <el-row>
              4.{{$i18ns('我行零售内部评级系统对本借款人评定的客户评分风险等级是否在D级以上，或该笔贷款申请评分是否高于申请评分风险控制分值（470分）')}}
              <input type="checkbox" disabled name="is_scale_rank" v-model="page.is_scale_rank" value="1">{{$i18ns('是')}}
              <input type="checkbox" disabled name="is_scale_rank" v-model="page.is_scale_rank" value="0">{{$i18ns('否')}}
            </el-row>
            <el-row>
              5.{{$i18ns('逾期情况核实认定意见：')}}{{page.pasd_opinion}}
            </el-row>
          </th>
        </tr>
<!--        <tr class="tr_bottom">-->
<!--          <td class="td_bottom"></td>-->
<!--          <td class="td_bottom"></td>-->
<!--          <td class="td_bottom"></td>-->
<!--          <td class="td_bottom"></td>-->
<!--          <td class="td_bottom"></td>-->
<!--          <td class="td_bottom"></td>-->
<!--          <td class="td_bottom"></td>-->
<!--          <td class="td_bottom"></td>-->
<!--          <td class="td_bottom"></td>-->
<!--          <td class="td_bottom"></td>-->
<!--        </tr>-->
      </table>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "ArbSubjQualSurvReport",
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

      maxEducationList: [], //最高学历字典列表
      workTypeList: [], //单位类型字典列表

      page: {
        borrower_name: "", //借款人姓名
        gender: [], //性别
        marital_status: [], // 婚姻状态
        co_borrower_name: "", //共同(配偶)借款人姓名
        other_co_borrower_name: "", // 其他共同借款人姓名
        home_address: "", // 详细地址
        built_area: "", // 建筑面积
        is_rental_live: "", // 是否租凭居住
        house_purchase_way: "", // 自有住房购买方式
        is_another_name: "", // 其是否有曾用名或别名
        another_name: "", // 曾用名或别名
        is_surv_all_name_report: "", // 是否已查询其所有姓名的信用报告
        is_query_system_confirm_identity: "", // 其是否联网查询公民身份信息系统
        is_scale_rank: "", // 我行零售内部评级系统对本借款人评定的客户评分风险等级是否在D级以上
        pasd_opinion: "", // 逾期情况核实认定意见
      }
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
        servicecode: "ar1740",
        apply_no: that.apply_no,
        cust_no: that.cust_no,
        due_item_no: that.due_item_no
      }
      console.log("page+now1111", params);
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.page = res.data;
            console.log("page+now", that.page)
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
      this.page.gender = data.gender.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.marital_status = data.marital_status.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.house_purchase_way = data.house_purchase_way.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.is_rental_live = data.is_rental_live.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.is_another_name = data.is_another_name.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.is_surv_all_name_report = data.is_surv_all_name_report.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.is_query_system_confirm_identity = data.is_query_system_confirm_identity.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.is_scale_rank = data.is_scale_rank.replaceAll(" ", "").split(",").filter((item) => item !== '');
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
</style>
