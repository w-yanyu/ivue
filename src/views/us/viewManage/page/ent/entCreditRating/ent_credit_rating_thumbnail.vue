<template>
  <div>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('行内信评日期')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ dataForm.bankOfCreditRatingDate }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('行内信评等级')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ dataForm.bankOfCreditRatingLevel }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('税务评价年度')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ dataForm.taxCreditRatingDate }}</span>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="12" class="grid-content display-cell">
        {{$i18ns('纳税信用等级')}}：
      </el-col>
      <el-col :span="12" class="grid-content display-cell">
        <span>{{ dataForm.taxCreditRatingLevel }}</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "entCreditRatingThumbnail",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      cust_no: "",//客户编号
      cust_type: "",// 客户类型
      dataForm: {
        bankOfCreditRatingDate: "", //行内信评日期
        bankOfCreditRatingLevel: "", //行内信评等级
        taxCreditRatingDate: "", //税务评价年度
        taxCreditRatingLevel: "" // 纳税信用等级
      },
      bankOfCreditRatingDataList: [], //本行信用评级信息
      taxCreditRatingDataList: [], // 纳税信用评级列表
    }
  },
  created() {
    this.init();
  },

  methods: {
    async init() {
      this.cust_no = this.cParentParams.cust_no? this.cParentParams.cust_no : this.cParentParams.cust_id;
      await this.queryCreditRatingInfo();
      await this.queryTaxCreditRatingInfo();
      this.calculateRatingData();
    },
    /**
     * 查询本行信评信息列表
     */
    async queryCreditRatingInfo() {
      let that = this;
      let reqMap = {
        servicecode: "cr1023",
        cust_no: that.cust_no
        // cust_no: "UR00000000010304"
      }
      await MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
        if (res && res.code === "200") {
          that.bankOfCreditRatingDataList = res.data;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    /**
     * 查询税务信评信息列表
     */
    async queryTaxCreditRatingInfo() {
      let that = this;
      let reqMap = {
        servicecode: "us1124",
        cust_no: that.cust_no
        // cust_no: "UR00000000010311"
      }
      await MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
        if (res && res.code === "200") {
          that.taxCreditRatingDataList = res.data;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    calculateRatingData(){
      //本行信评列表
      if (this.bankOfCreditRatingDataList.length !== 0){
        this.bankOfCreditRatingDataList.sort(function(a, b){return a.eval_dt > b.eval_dt });
        this.dataForm.bankOfCreditRatingDate = this.bankOfCreditRatingDataList[0].eval_dt;
        this.dataForm.bankOfCreditRatingLevel = this.bankOfCreditRatingDataList[0].fl_rank;
      }
      //税务信评列表
      if (this.taxCreditRatingDataList.length !== 0){
        this.dataForm.taxCreditRatingDate = this.taxCreditRatingDataList[0].years;
        this.dataForm.taxCreditRatingLevel = this.taxCreditRatingDataList[0].credit_rating_level;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.display-cell {
  display: flex;
  align-items: center;
  border-radius: 0;
  //background: #efefef;
  //border: 1px solid #e3e8f5;
  //border-top: 0px;
  //border-right: 0px;
}
</style>
