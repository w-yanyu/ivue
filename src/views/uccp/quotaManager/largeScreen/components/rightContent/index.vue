<template>
  <div class="right-content">
    <div class="top-div">
      <!-- 全年授信完成度 -->
      <div class="top-div-item  credit-year-div">
        <div class="info-div">
          <i class="el-icon-info" style="color: #f3f3f3"></i>
        </div>
        <div class="credit-year-left">
          <div class="title">全年授信完成度</div>
          <div class="value">78%</div>
        </div>
        <div class="credit-year-charts">
          <CircleProgress
            :id="1"
            :width="80"
            :radius="15"
            :progress="70" 
            barColor="#5B8FF9"
            backgroundColor="#F3F3F3"
          ></CircleProgress>
        </div>
      </div>
      <!-- 用信笔数 -->
      <div class="top-div-item  used-div">
        <div class="info-div">
          <i class="el-icon-info" style="color: #f3f3f3"></i>
        </div>
        <div class="title">用信笔数</div>
        <div class="value">6,560</div>
        <div class="used-charts" id="used-charts"></div>
        <div class="line"></div>
        <div class="title">转换率 60%</div>
      </div>
    </div>
    <!-- 当日用信渠道 -->
    <div class="credit-channel-div">
      <div class="title">用信笔数</div>
      <div class="credit-channel-charts" id="credit-channel-charts"></div>
    </div>

    <!-- 月授信规模统计 -->
    <div class="credit-channel-div">
      <div class="credit-month-charts" id="credit-month-charts"></div>
    </div>
  </div>
</template>
<script>
import CircleProgress from "../circle-progress.vue";
import echarts from "echarts";
export default {
  name: "right-content",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
    pageData:Object,//数字大屏数据
  },
  components: {
    CircleProgress
  },
  data() {
    return {
      usedChart: "", //用信笔数
      creditChanneChart: "", //当日用信渠道
      creditMonthChart: "", //月授信规模统计
      isinit: false, // 是否已初始化过
      screenWidth: document.body.clientWidth,
      screenHeight: document.body.clientHeight,
      
    };
  },
  watch: {
    // 监听窗口宽度变化时触发
    screenWidth() {
      this.isinit = true;
      // resize()重新绘制
      this.usedChart.resize();
      this.creditChanneChart.resize();
      this.creditMonthChart.resize();
    },
    // 监听窗口高度变化时触发
    screenHeight() {
      this.isinit = true;
      this.usedChart.resize();
      this.creditChanneChart.resize();
      this.creditMonthChart.resize();
    }
  },
  created() {},
  mounted() {
    let that = this;
    window.addEventListener("resize", () => {
      window.screenWidth = document.body.clientWidth;
      that.screenWidth = window.screenWidth;
      window.screenHeight = document.body.clientHeight;
      that.screenHeight = window.screenHeight;
    });

    this.$nextTick(() => {
      this.drawUserCharts();
      this.drawCreditChannelCharts();
      this.drawCreditMonthCharts();
    });
  },
  beforeDestroy() {
    let that = this;
    window.removeEventListener("resize", () => {
      window.screenWidth = document.body.clientWidth;
      that.screenWidth = window.screenWidth;
      window.screenHeight = document.body.clientHeight;
      that.screenHeight = window.screenHeight;
    });
  },
  methods: {
    //用信笔数
    drawUserCharts() {
      // 数据
      let data = [
        "862.515",
        "567.498",
        "453.344",
        "389.042",
        "862.515",
        "567.498",
        "453.344",
        "389.042",
        "862.515",
        "389.042"
      ];
      // x轴数据
      let xdata = [];
      // 颜色
      let color = ["#5ef3ff", "#06a4f4"];
      let usedDom = document.getElementById("used-charts");
      this.usedChart = echarts.init(usedDom);
      let option = {
        tooltip: {
          show: false,
          transitionDuration: 0
        },
        xAxis: {
          data: xdata,
          boundaryGap: false,
          show: false
        },
        yAxis: {
          type: "value",
          show: false,
          splitLine: { show: false } //去除网格线
        },
        series: [
          {
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  type: "linear",
                  global: false,
                  colorStops: [
                    {
                      offset: 0,
                      color: color[0]
                    },
                    {
                      offset: 1,
                      color: color[1]
                    }
                  ]
                }
              }
            },
            data: data
          }
        ]
      };
      option && this.usedChart.setOption(option);
    },
    //当日用信渠道
    drawCreditChannelCharts() {
      // 数据
      const dataSource = [
        {
          value: "1000",
          name: "网贷系统"
        },
        {
          value: "900",
          name: "企贷系统"
        },
        {
          value: "800",
          name: "信贷系统"
        },
        {
          value: "700",
          name: "国结系统"
        },
        {
          value: "600",
          name: "信用卡系统"
        },
        {
          value: "500",
          name: "票据系统"
        },
        {
          value: "400",
          name: "个贷系统"
        }
      ];
      const bgData = [
        "1000",
        "1000",
        "1000",
        "1000",
        "1000",
        "1000",
        "1000",
        "1000"
      ];

      let creditChannelDom = document.getElementById("credit-channel-charts");
      this.creditChanneChart = echarts.init(creditChannelDom);
      let option = {
        // backgroundColor: '#05276B',
        grid: [
          {
            left: 70,
            top: 10,
            right: 20,
            bottom: 10
            // containLabel: true,
          }
        ],

        xAxis: [
          {
            gridIndex: 0,
            type: "value",
            axisLabel: { show: false },
            axisLine: { show: false },
            splitLine: { show: false },
            axisTick: { show: false }
          }
        ],
        yAxis: [
          {
            gridIndex: 0,
            type: "category",
            inverse: true,
            position: "left",
            data: dataSource,
            axisTick: { show: false },
            axisLine: { show: false },
            splitLine: { show: false },
            axisLabel: {
              width: 80,
              padding: [0, 0, 0, -50],
              align: "left",
              formatter: (name, index) => {
                if (dataSource[index].name) {
                  return `{value|${dataSource[index].name}}`;
                }
              },

              rich: {
                count: {
                  padding: [0, 0, 0, 0],
                  width: 35,
                  height: 15,
                  color: "#fff",
                  align: "center",
                  fontSize: 15,
                  fontFamily: "DIN",
                  fontWeight: 500
                },
                name: {
                  width: 80,
                  fontSize: 15,
                  align: "left",
                  color: "#fff",
                  fontFamily: "Source Han Sans CN",
                  fontWeight: 500
                }
              }
            }
          }
        ],
        series: [
          {
            type: "bar",
            xAxisIndex: 0,
            yAxisIndex: 0,
            barWidth: 20,
            data: dataSource.map(item => item.value),
            silent: true,
            itemStyle: {
              emphasis: {
                barBorderRadius: [0, 20, 20, 0]
              },
              normal: {
                label: {
                  show: true,
                  position: "inside",
                  color: "#FFF"
                },
                barBorderRadius: [0, 0, 0, 0],
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  [
                    {
                      offset: 0,
                      color: "rgba(27, 177, 255, 1)" // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(12, 81, 255, 1)" // 100% 处的颜色
                    }
                  ],
                  false
                )
              }
            }
          },
          {
            name: "背景",
            type: "bar",
            barWidth: 20,
            barGap: "-100%",
            data: bgData,
            itemStyle: {
              normal: {
                color: "rgba(131, 132, 132, 0.1)",
                barBorderRadius: [30, 30, 30, 30]
              }
            }
          }
        ]
      };
      option && this.creditChanneChart.setOption(option);
    },
    //交易笔数
    drawDealCharts() {
      // 数据
      
      console.log('交易笔数渲染',this.infoData)
      // x轴数据
      let xdata = [];
      // 颜色
      let color = ["#5ef3ff", "#06a4f4"];
      let dealDom = document.getElementById("deal-content");
      this.dealChart = echarts.init(dealDom);
      let option = {
        tooltip: {
          show: false,
          transitionDuration: 0
        },
        xAxis: {
          data: xdata,
          boundaryGap: false,
          show: false
        },
        yAxis: {
          type: "value",
          show: false,
          splitLine: { show: false } //去除网格线
        },
        series: [
          {
            type: "bar",
            barWidth: 10,
            itemStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  type: "linear",
                  global: false,
                  colorStops: [
                    {
                      offset: 0,
                      color: color[0]
                    },
                    {
                      offset: 1,
                      color: color[1]
                    }
                  ]
                }
              }
            },
            data: this.pageData.tranCountData
            // data:data
          }
        ]
      };
      option && this.dealChart.setOption(option);
    },
    //月授信规模统计
    drawCreditMonthCharts() {
      let creditMonthDom = document.getElementById("credit-month-charts");
      this.creditMonthChart = echarts.init(creditMonthDom);
      let option = {
        title: {
          text: "月授信规模统计",
          left: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          position: "bottom",
          bottom: 10
        },
        grid: {
          top: "10%",
          left: "5%",
          right: "5%",
          bottom: "15%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: ["1月", "2月", "3月", "4月", "5月", "6月"],
            axisPointer: {
              type: "shadow"
            },
            axisTick: false,
            axisLine: {
              lineStyle: {
                color: "#eee"
              }
            },
            axisLabel: {
              color: "#aaa"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "单位：亿元",
            nameTextStyle: {
              fontFamily: "PingFangSC-Regular, PingFang SC",
              fontSize: 12,
              color: "#999999"
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(52,78,130,0.2)",
                width: 1,
                type: "dashed"
              }
            }
          },
          {
            type: "value",
            name: "",
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "对公",
            type: "bar",
            barWidth: 14,
            data: [30000, 20000, 11600, 22200, 44400, 28000],
            itemStyle: {
              // barBorderRadius: [30, 30, 0, 0],
              color: "#00A7E7"
            }
          },
          {
            name: "个人",
            type: "bar",
            barWidth: 14,
            itemStyle: {
              // barBorderRadius: [0, 0, 0, 0],
              color: "#8EC21F"
            },
            data: [10000, 20000, 10000, 10000, 50000, 17000]
          }
        ]
      };
      option && this.creditMonthChart.setOption(option);
    }
  }
};
</script>
<style lang="less" scoped>
.right-content {
  width: 98%;
  height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
}
.top-div {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.top-div-item {
  width: 49%;
  padding: 5px;
  height: 100%;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(211, 205, 205);
  border-radius: 2px;
  position: relative;
}
.credit-year-div {
  display: flex;
  justify-content: center;
}
.info-div {
  position: absolute;
  right: 1%;
  top: 1%;
  font-size: 14px;
  font-size: calc(100vw * 14 / 1920);
}
.credit-year-left {
  flex: 1.2;
  display: flex;
  flex-direction: column;
}

.title {
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-style: normal;
  color: rgba(0, 0, 0, 0.427450980392157);
  text-align: left;
  font-size: 2vh;
  line-height: 22px;
}
.value {
  margin-top: 1vh;
  font-family: "微软雅黑", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 5vh;
  //   font-size:calc(100vw * 30 / 1920);
  color: rgba(0, 0, 0, 0.847058823529412);
  text-align: left;
  line-height: 38px;
}
.credit-year-charts {
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.used-div {
  display: flex;
  flex-direction: column;
}
.used-charts {
  width: 100%;
  height: 40%;
}
.line {
  width: 100%;
  height: 1px;
  margin: 5px 0px;
  background-color: rgba(233, 233, 233, 1);
}
.credit-channel-div {
  width: 100%;
  height: 39%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(211, 205, 205);
  border-radius: 2px;
  padding: 5px;
}
.credit-channel-charts {
  width: 100%;
  height: 90%;
}
.credit-month-charts {
  width: 100%;
  height: 100%;
}
</style>
