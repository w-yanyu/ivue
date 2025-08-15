<template>
  <!--  <div ref="chart" :style="`width: 100%; height: ${height}px`"></div>-->
  <div ref="chart" style="width: 100%; height: 400px;"></div>
</template>

<script>
import echarts from "echarts";
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "entRevenueDataEchartsView",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      height: 0,
      chart: null,
      chartData: {},

      cust_no: "", // 客户号
      title: "", // 标题
      revenue_data_type: "", // 营业数据类型
      revenue_analysis_dimension: "", // 营业数据分析角度
      dataList: [], //后台返回的数据项
    };
  },
  created() {
    this.title = this.$i18ns(this.cParentParams.title);
    this.revenue_data_type = this.cParentParams.revenue_data_type;
    this.revenue_analysis_dimension = this.cParentParams.revenue_analysis_dimension;
    this.cust_no = this.cParentParams.cust_no;

    this.queryCustInfo();
  },
  methods: {
    /**
     * 查询客户相应信息
     */
    queryCustInfo() {
      let that = this;
      let reqMap = {
        servicecode: "us1164",
        revenue_data_type: that.revenue_data_type,
        revenue_analysis_dimension: that.revenue_analysis_dimension,
        cust_no: that.cust_no
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
        if (res && res.code === "200") {
          that.dataList = res.data;
          this.$nextTick(() => {
            that.initChart();
          })
        }
      }).catch(err => {
        console.error(err);
      });
    },
    /**
     * 初始化图表数据
     */
    initChart() {
      let that = this;
      this.chart = echarts.init(this.$refs.chart);

      let option = {
        title: {
          text: that.title,
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          // top: 'bottom',
          left: 'left',
          // padding: [,0,0,0]
          y: '70%'
        },
        series: [
          {
            name: 'Data',
            type: 'pie',
            radius: '50%',
            center: ['50%', '35%'],//设置饼图位置
            data: that.dataList,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      this.chart.setOption(option);
    },
  },
};
</script>
<style lang="less" scoped>
.box-card {
  width: 100%;
  height: 400px;
}
</style>

