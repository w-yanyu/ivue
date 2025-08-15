<template>
  <div>
    <div class="todo-top" v-if="show">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="240px" class="custom-common--form">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$i18ns('客户名称')" prop="cust_name" class="upload-item">
              <el-input v-model="Applys.cust_name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$i18ns('评级模板')" prop="temp_name" class="upload-item">
              <el-input   v-model="Applys.temp_name" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$i18ns('行业类型')" prop="ind_credit" class="upload-item" v-if="Applys.temp_name !== '个人信用评级'">
              <el-input v-model="Applys.ind_credit" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$i18ns('企业规模')" prop="corp_size" class="upload-item" v-if="Applys.temp_name !== '个人信用评级'">
              <el-input v-model="Applys.corp_size" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$i18ns('评级日期')" prop="eval_dt" class="upload-item">
              <el-input v-model="Applys.eval_dt" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$i18ns('财务报表日期')" prop="rept_dt" class="upload-item" v-if="Applys.temp_name !== '个人信用评级'">
              <el-input v-model="Applys.rept_dt" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.title" :name="item.idField">
          <pte-resolver
            v-if="activeName === item.idField"
            :c-parent-meta="c_$meta" :c-parent-params="c_$params" :c-parent-scope="c_$scope" :to-request="item.toRequest"
          ></pte-resolver>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import i18n from 'pte-ui/i18ns' // 国际化
export default {
  name: "CRWaitToDoDeal",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      show: false,
      Applys: {
        cust_name: "",
        corp_size: "",
        eval_dt: "",
        rept_dt: "",
        temp_id: "",
        ind_credit: "",
        cust_type: ""
      },
      c_$meta: {},
      c_$scope: {},
      c_$params: {
        appl_id: "",
        procinst_id: "",
        cust_id: "",
        cust_name: "",
        temp_id: "",
        cust_type: "",
      },
      params: "",
      dialogVisible: false,
      dialogWidth: "60%",
      activeName: "first",
      tabList: [
        {
          idField: "first",
          title: this.$i18ns("申请人信息"),
          toRequest: {
            url: "/views/cr/manage/customer/customer_info.json",
            method: "get",
            params: {
            },
          },
        },
        {
          idField: "tag2",
          title: this.$i18ns("财务因素"),
          toRequest: {
            url: "@financialFactors",
            method: "get",
          },
        },
        {
          idField: "tag3",
          title: this.$i18ns("非财务因素"),
          toRequest: {
            url: "@nonFinancialFactors",
            method: "get",
          },
        },
        {
          idField: "tag4",
          title: this.$i18ns("评级结果"),
          toRequest: {
            url: "@crResultInfoView",
            method: "get",
          },
        }
      ], // tab切换列表
      routidSelect: false,
      submitLoading: false, // 防止多次提交
    };
  },
  created() {
    this.Applys.cust_type = this.cParentParams.cust_type;
    this.adjustTempType();
    this.Applys.cust_name = this.cParentParams.cust_name;
    this.Applys.ind_credit = this.cParentParams.ind_credit;
    this.Applys.corp_size = this.cParentParams.corp_size;
    this.Applys.eval_dt = this.cParentParams.eval_dt;
    this.Applys.rept_dt = this.cParentParams.rept_dt;
    this.Applys.procinst_id = this.cParentParams.procinst_id;
    console.log("流程实例ID",this.Applys.procinst_id);
    this.Applys.tpltrg_id = this.cParentParams.tpltrg_id;
    this.Applys.temp_name = this.cParentParams.temp_name;
    console.log(this.cParentParams.eval_dt);
    console.log(this.cParentParams.rept_dt);

    this.c_$params.appl_id = this.cParentParams.appl_id; // appid参数传递
    this.c_$params.cust_id = this.cParentParams.cust_no; // appid参数传递
    this.c_$params.wf_inst_id = this.cParentParams.procinst_id; // appid参数传递     res.data.applys.procinst_id
    this.c_$params.cust_name = this.cParentParams.cust_name;

    this.show = true;
  },
  methods: {
    // 判断模板类型是否为个人评级，个人评级不需要显示财务因素
    adjustTempType(){
      if(this.Applys.cust_type ==="1"){
        this.tabList.splice(1,1)
      }
    },
    routeEqual(route1, route2) {
      return route1.name === route2.name || route2.name === "1101";
    }
  },
};
</script>
<style lang="less" scoped>
.todo-top {
  border-bottom: 1px solid #e3e8f5;
}
.todo-bottom--left {
  width: 50%;
  float: left;
  box-sizing: border-box;
  border-right: 1px solid #e3e8f5;
  .custom-common--form .el-form-item {
    margin-bottom: 0;
  }
}
.internet-info--title {
  font-size: 14px;
  font-weight: 600;
  color: #666;
}
.custom-common--footer {
  padding-top: 10px;
  text-align: center;
  margin-bottom: 20px;
}
</style>
