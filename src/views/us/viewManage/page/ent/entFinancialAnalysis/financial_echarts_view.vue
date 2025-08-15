<template>
<!--  <div ref="chart" :style="`width: 100%; height: ${height}px`"></div>-->
    <div ref="chart" style="width: 100%; height: 400px;"></div>
</template>

<script>
import echarts from "echarts";
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "financialEchartsView",
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

      yname : this.$i18ns("金额"),
      cust_no: "", // 客户号
      title: "", // 标题
      dataList: [], //后台返回的数据项
      simpleFinancialType: "" //金额类型
    };
  },
  created() {
    this.simpleFinancialType = this.cParentParams.simpleFinancialType;
    this.title = this.$i18ns(this.cParentParams.title);
    this.cust_no = this.cParentParams.cust_no;

    this.queryCustInfo();
    // this.$nextTick(() => {
    //   this.queryCustInfo();
    //   console.log("父元素", this.$parent);
    //   const resizeOb = new ResizeObserver((entries) => {
    //     window.requestAnimationFrame(() => {
    //       if (!Array.isArray(entries) || !entries.length) {
    //         return;
    //       }
    //       for (const entry of entries) {
    //         this.height = this.$parent.$el.offsetHeight;
    //         echarts.getInstanceByDom(entry.target).resize();
    //       }
    //     });
    //   });
    //   resizeOb.observe(this.$refs.chart);
    // })
  },
  methods: {
    /**
     * 查询客户相应信息
     */
    queryCustInfo() {
      let that = this;
      let reqMap = {
        servicecode: "us0941",
        cust_no: that.cust_no
        // cust_no: "UR00000000010311"
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
          text: that.title
        },
        tooltip: {},
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        legend: {
          data: ['销量']
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: function () {
            let list = [];
            that.dataList.forEach(item => {
              if (item.simple_financial_type === that.simpleFinancialType) {
                list.push(item.years);
              }
            })
            list.sort();
            return list;
          }()
        },
        yAxis: {
          type: "value",
          name: this.yname,
          axisLabel: {
            formatter: "{value} ",
          },
        },
        series: [
          {
            name: '金额',
            type: 'line',
            stack: 'Total',
            label: {
              show: true,
              position: 'top'
            },
            color: "#409EFF",
            tooltip: {
              valueFormatter: function (value) {
                return value;
              },
            },
            data: function () {
              let list = [];
              that.dataList.forEach(item => {
                if (item.simple_financial_type === that.simpleFinancialType) {
                  list.push(item.acct_amt);
                }
              })
              list.sort();
              console.log("这里", list);
              return list;
            }()
          }
        ]
      };
      this.chart.setOption(option);
    },
  },
};
</script>
