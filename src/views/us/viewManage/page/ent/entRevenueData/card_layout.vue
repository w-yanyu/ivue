<template>

  <el-row :gutter="10">
    <el-col :span="8">
      <el-card class="box-card">
        <cardEcharts
          :cParentParams="card01">

        </cardEcharts>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="box-card">
        <cardEcharts
          :cParentParams="card02">

        </cardEcharts>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card class="box-card">
        <cardEcharts
          :cParentParams="card03">

        </cardEcharts>
      </el-card>
    </el-col>
  </el-row>

</template>

<script>
import cardEcharts from "@/views/us/viewManage/page/ent/entRevenueData/ent_revenue_data_echarts_view.vue";

export default {
  name: "cardLayout",
  components: {
    cardEcharts
  },
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      card01: {
        title: "按行业",
        revenue_data_type: this.cParentParams.revenue_data_type,
        revenue_analysis_dimension: 1, //行业维度
        cust_no: this.cParentParams.cust_no
      },
      card02: {
        title: "按产品",
        revenue_data_type: this.cParentParams.revenue_data_type,
        revenue_analysis_dimension: 2, //产品维度
        cust_no: this.cParentParams.cust_no
      },
      card03: {
        title: "按地区",
        revenue_data_type: this.cParentParams.revenue_data_type,
        revenue_analysis_dimension: 3, //区域维度
        cust_no: this.cParentParams.cust_no
      }
    };
  },
  created() {

  },
  methods: {},
};
</script>
<style lang="less" scoped>
.box-card {
  height: 400px;
  overflow: scroll;
  //overflow: visible;
}
</style>

