<template>
  <div class="table_container">
    <div class="table_center">
      <el-row class="table_header">{{$i18ns('主营业务信息')}}</el-row>
      <el-row class="table_report">
        <el-col :span="4" class="border_div table_has_top">{{$i18ns('生意/企业名称')}}：</el-col>
        <el-col :span="11" class="border_div table_has_top">{{page.busi_name}}</el-col>
        <el-col :span="5" class="border_div table_has_top">{{$i18ns('注册经营人/法人代表')}}：</el-col>
        <el-col :span="4" class="border_div table_has_top">{{page.legal_repr}}</el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="4" class="border_div">{{$i18ns('经营地址')}}：</el-col>
        <el-col :span="12" class="border_div">{{page.business_address}}</el-col>
        <el-col :span="4" class="border_div">{{$i18ns('实际经营人')}}：</el-col>
        <el-col :span="4" class="border_div">{{page.actu_operator}}</el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="4" class="border_div">{{$i18ns('经营场地所有权')}}：</el-col>
        <el-col :span="20" class="border_div">
          <input type="checkbox" disabled name="site_ownership" v-model="page.site_ownership" value="1">{{$i18ns('自有')}}&nbsp;
          <input type="checkbox" disabled name="site_ownership" v-model="page.site_ownership" value="2">{{$i18ns('按揭')}}&nbsp;
          <input type="checkbox" disabled name="site_ownership" v-model="page.site_ownership" value="3">{{$i18ns('土地使用权')}}&nbsp;
          <input type="checkbox" disabled name="site_ownership" v-model="page.site_ownership" value="4">{{$i18ns('长期租')}}&nbsp;
          <input type="checkbox" disabled name="site_ownership" v-model="page.site_ownership" value="5">{{$i18ns('短期租')}}&nbsp;
          <input type="checkbox" disabled name="site_ownership" v-model="page.site_ownership" value="6">{{$i18ns('其他')}}&nbsp;
        </el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="4" class="border_div">{{$i18ns('从业经验')}}：</el-col>
        <el-col :span="12" class="border_div">
          <input type="checkbox" disabled name="work_expe" v-model="page.work_expe" value="1">10{{$i18ns('年以上')}}
          <input type="checkbox" disabled name="work_expe" v-model="page.work_expe" value="2">5-10{{$i18ns('年')}}
          <input type="checkbox" disabled name="work_expe" v-model="page.work_expe" value="3">3-5{{$i18ns('年')}}
          <input type="checkbox" disabled name="work_expe" v-model="page.work_expe" value="4">1-3{{$i18ns('年')}}
          <input type="checkbox" disabled name="work_expe" v-model="page.work_expe" value="5">1{{$i18ns('年以下')}}
        </el-col>
        <el-col :span="4" class="border_div">{{$i18ns('具体年限')}}：</el-col>
        <el-col :span="4" class="border_div">{{page.work_experience_spec_year}}</el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="4" class="border_div">{{$i18ns('经营年限')}}：</el-col>
        <el-col :span="12" class="border_div">
          <input type="checkbox" disabled name="oper_year" v-model="page.oper_year" value="1">10{{$i18ns('年以上')}}
          <input type="checkbox" disabled name="oper_year" v-model="page.oper_year" value="2">5-10{{$i18ns('年')}}
          <input type="checkbox" disabled name="oper_year" v-model="page.oper_year" value="3">3-5{{$i18ns('年')}}
          <input type="checkbox" disabled name="oper_year" v-model="page.oper_year" value="4">1-3{{$i18ns('年')}}
          <input type="checkbox" disabled name="oper_year" v-model="page.oper_year" value="5">1{{$i18ns('年以下')}}
        </el-col>
        <el-col :span="4" class="border_div">{{$i18ns('具体年限')}}：</el-col>
        <el-col :span="4" class="border_div">{{page.oper_spec_year}}</el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="4" class="border_div">{{$i18ns('现场所经营年限')}}：</el-col>
        <el-col :span="12" class="border_div">
          <input type="checkbox" disabled name="scene_oper_year" v-model="page.scene_oper_year" value="1">10{{$i18ns('年以上')}}
          <input type="checkbox" disabled name="scene_oper_year" v-model="page.scene_oper_year" value="2">5-10{{$i18ns('年')}}
          <input type="checkbox" disabled name="scene_oper_year" v-model="page.scene_oper_year" value="3">3-5{{$i18ns('年')}}
          <input type="checkbox" disabled name="scene_oper_year" v-model="page.scene_oper_year" value="4">1-3{{$i18ns('年')}}
          <input type="checkbox" disabled name="scene_oper_year" v-model="page.scene_oper_year" value="5">1{{$i18ns('年以下')}}
        </el-col>
        <el-col :span="4" class="border_div">{{$i18ns('具体年限')}}：</el-col>
        <el-col :span="4" class="border_div">{{page.scene_oper_spec_year}}</el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="4" class="border_div">{{$i18ns('主营业务')}}：</el-col>
        <el-col :span="6" class="border_div">{{page.main_oper_busi}}</el-col>
        <el-col :span="4" class="border_div">{{$i18ns('雇员人数')}}：</el-col>
        <el-col :span="2" class="border_div">{{page.busi_empl_number}}</el-col>
        <el-col :span="4" class="border_div">{{$i18ns('经营场地面积')}}：</el-col>
        <el-col :span="4" class="border_div">{{page.oper_place_area}}</el-col>
      </el-row>
      <el-row class="table_report">
        <el-col :span="4" class="border_div info_confirm">{{$i18ns('信息收集与核实')}}：</el-col>
        <el-col :span="20" class="border_div info_confirm text_left">
          <ol>
            <li>
              {{page.info_coll_verf}}
            </li>
          </ol>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "ArbMainBusiReport",
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
        busi_name: "", //企业名称
        legal_repr: "", //法人代表
        business_address: "", //经营地址
        actu_operator: "", //实际经营人
        site_ownership: [], //经营场地所有权
        work_expe: [], //从业经验
        work_experience_spec_year: "", //从业经验具体年限
        oper_year: [], //经营年限
        oper_spec_year: "", //经营具体年限
        scene_oper_year: [], //现场所经营年限
        scene_oper_spec_year: "", //现场所经营具体年限
        main_oper_busi: "", //主营业务
        busi_empl_number: "", //企业雇工人员数
        oper_place_area: "", //经营场所面积(㎡)
        info_coll_verf: "", //信息收集与核实
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
        servicecode: "ar1736",
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
      this.page.site_ownership = (data.site_ownership !== "" && data.site_ownership !== null )?data.site_ownership.replaceAll(" ", "").split(",").filter((item) => item !== ''): [];
      this.page.work_expe = (data.work_expe !== "" && data.work_expe !== null )?data.work_expe.replaceAll(" ", "").split(",").filter((item) => item !== ''): [];
      this.page.oper_year = (data.oper_year !== "" && data.oper_year !== null )?data.oper_year.replaceAll(" ", "").split(",").filter((item) => item !== ''): [];
      this.page.scene_oper_year = (data.scene_oper_year !== "" && data.scene_oper_year !== null )?data.scene_oper_year.replaceAll(" ", "").split(",").filter((item) => item !== ''): [];
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
//   border-collapse: collapse;
//   text-align: center;
//   width: 60%;
//   height: auto;
// }

.table_report {
  width: 100%;
  height: auto;
  border-collapse: collapse;

  div:nth-child(1){
    border-left: 1px solid #5e6d82;
  }
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

.underline {
  text-decoration: underline;
  font-weight: bold;
}

.table_left {
  height: 100px;
  margin: 0;
  padding: 0;
  border: 1px solid #5e6d82;
  border-right: 0;
  border-radius: 0;
  border-collapse: collapse;

  display: flex;
  justify-content: center; /*主轴上居中*/
  align-items: center; /*侧轴上居中*/
}

.table_has_top{
  border-top: 1px solid #5e6d82 !important;
}

.table_right {
  height: 100px;
  margin: 0;
  padding: 0;
  border-radius: 0;
  border: 1px solid #5e6d82;
  border-collapse: collapse;
  text-align: left;

  display: flex;
  justify-content: left; /*主轴上居中*/
  align-items: center; /*侧轴上居中*/
}

.table_div {
  height: 400px !important;
}

.border_div {
  height: 24.53px;
  margin: 0;
  padding: 0;
  border: 1px solid #5e6d82;
  border-left: 0;
  border-top:0;
  border-radius: 0;
  border-collapse: collapse;
  min-height:60px;
  max-height:500px;

  display: flex;
  justify-content: center; /*主轴上居中*/
  align-items: center; /*侧轴上居中*/

  word-wrap:break-word
}

li {
  text-align: left;
}
.table_has_top{
  border-top: 1px solid #5e6d82 !important;
}
.info_confirm{
  height: auto;
  min-height: 100px;
}
.text_left{
  justify-content: left !important; /*主轴上居中*/
}
</style>
