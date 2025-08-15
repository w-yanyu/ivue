<template>
  <div class="right-aside">
    <!-- 对私客户 -->
    <div class="client-content ">
      <div class="inside-table">
        <div class="info-div">
          <i class="el-icon-info" style="color: #f3f3f3"></i>
        </div>
        <div class="top-div">
          <div class="icon-div">
            <i class="el-icon-user" style="color: white"></i>
          </div>
          <div class="tite-div">
            <div class="title">对公客户</div>
            <div class="value">1,234</div>
          </div>
        </div>
        <div class="line"></div>
        <div class="bottom-div">
          <div class="bottom-div-item">
            <div>周同比</div>
            <div><i class="el-icon-caret-bottom" style="color: green" /></div>
            <div>12%</div>
          </div>
          <div class="bottom-div-item">
            <div class="arginl-left10">日环比</div>
            <div><i class="el-icon-caret-top" style="color:red " /></div>
            <div>12%</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 对公客户 -->
    <!-- <div class="company-client"></div> -->
    <!-- 授信总额 -->
    <div class="client-content ">
      <div class="inside-table">
        <div class="info-div">
          <i class="el-icon-info" style="color: #f3f3f3"></i>
        </div>
       
          <div class="title">授信总额</div>
          <div class="value">
            <span class="value-unit">¥</span
            >{{
              (
                pageData.credit_total_amt.substring(
                  0,
                  pageData.credit_total_amt.length - 3
                ) || 0
              )
                .toString()
                .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")
            }}
          </div>
       

        <div class="bottom-div">
          <div class="bottom-div-item">
            <div>周同比</div>
            <div><i class="el-icon-caret-bottom" style="color: green" /></div>
            <div>{{ pageData.credit_total_amt_week_rate || 0 }}%</div>
          </div>
          <div class="bottom-div-item">
            <div class="arginl-left10">日环比</div>
            <div><i class="el-icon-caret-top" style="color:red " /></div>
            <div>{{ pageData.credit_total_amt_day_rate || 0 }}%</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 信用总额 -->
    <div class="client-content ">
      <div class="inside-table">
        <div class="info-div">
          <i class="el-icon-info" style="color: #f3f3f3"></i>
        </div>
        
          <div class="title">用信总额</div>
          <div class="value">
            <span class="value-unit">¥</span
            >{{
              (
                pageData.used_total_amt.substring(
                  0,
                  pageData.used_total_amt.length - 3
                ) || 0
              )
                .toString()
                .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")
            }}
          </div>
      

        <div class="bottom-div">
          <div class="bottom-div-item">
            <div>周同比</div>
            <div><i class="el-icon-caret-bottom" style="color: green" /></div>
            <div>{{ pageData.used_total_amt_week_rate || 0 }}%</div>
          </div>
          <div class="bottom-div-item">
            <div class="arginl-left10">日环比</div>
            <div><i class="el-icon-caret-top" style="color:red " /></div>
            <div>{{ pageData.used_total_amt_day_rate || 0 }}%</div>
          </div>
        </div>
        <div class="line"></div>
        <div class="foot-div">
          日均用信 <span class="foot-value"> ¥ 121,423</span>
        </div>
      </div>
    </div>
    <!-- 交易笔数 -->
    <div class="client-content ">
      <div class="inside-table">
        <div class="info-div">
          <i class="el-icon-info" style="color: #f3f3f3"></i>
        </div>
       
          <div class="title">交易笔数</div>
          <div class="value">
            {{
              (pageData.tranCountTotal || 0)
                .toString()
                .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")
            }}
          </div>
      
        <div class="deal-content" id="deal-content"></div>
      </div>
    </div>

    <!-- 访问量 -->
    <div class="client-content-visit " ref="visitTable">
      <div class="inside-table">
        <div class="info-div">
          <i class="el-icon-info" style="color: #f3f3f3"></i>
        </div>
       
          <div class="title">访问量</div>
          <div class="value">
            {{
              (pageData.visitCountTotal || 0)
                .toString()
                .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")
            }}
          </div>
      
        <div class="visit-content" id="visit-content"></div>
        <div class="line"></div>
        <div class="foot-div">
          日访问量
          <span class="foot-value">{{
            (pageData.visitCountDay || 0)
              .toString()
              .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")
          }}</span>
        </div>
      </div>

      <!-- 用信通过率 -->
      <div class="client-content special-content " ref="usedTable">
        <div class="inside-table">
          <div class="info-div">
            <i class="el-icon-info" style="color: #f3f3f3"></i>
          </div>
         
            <div class="title">用信通过率</div>
            <div class="value">
              {{ pageData.used_total_amt_day_rate || 0 }}%
            </div>
          
          <div class="used-content" id="used-content"></div>
          <div class="line"></div>
          <div class="bottom-div">
            <div class="bottom-div-item">
              <div>周同比</div>
              <div><i class="el-icon-caret-bottom" style="color: green" /></div>
              <div>{{ pageData.use_appv_rate_week_rate || 0 }}%</div>
            </div>
            <div class="bottom-div-item">
              <div class="arginl-left10">日环比</div>
              <div><i class="el-icon-caret-top" style="color:red " /></div>
              <div>{{ pageData.use_appv_rate_day_rate || 0 }}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  name: "rightAside",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
    pageData: Object //数字大屏数据
  },
  components: {},
  data() {
    return {
      dealChart: null, //交易笔数
      visitChart: null, //访问量
      usedChart: null, //用信通过率
      infoData:this.pageData,
      creditTotalAmt: this.pageData.credit_total_amt //授信总额
    };
  },
  watch: {
    //解决父类传输数据后表格渲染不出来问题
    pageData(newnew, oldold) {
      console.log("监听pageData数据变化", newnew, oldold);
      this. drawCharts();
    },
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
     
    });
      },
  beforeDestroy() {},
  methods: {
    //绘制echarts
    drawCharts() {
      this.drawDealCharts();
      this.drawVisitCharts();
      this.drawUsedCharts();
    },
    //刷新echarts的大小
    chartsResize() {
      this.dealChart.resize();
      this.visitChart.resize();
      this.usedChart.resize();
    },
    //交易笔数
    drawDealCharts() {
      // 数据
      let data = [
        "8654",
        "8654",
        "7778",
        "8546",
      ];
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
    //访问量
    drawVisitCharts() {
      // 颜色
      let colors = ["#00FFFF", "#02FF67", "#675bba"];
      let visitDom = document.getElementById("visit-content");
      this.visitChart = echarts.init(visitDom);
      let option = {
        //    backgroundColor: '#081736',
        tooltip: {
          show: false,
          transitionDuration: 0
        },
        grid: {},

        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            show: false,
            axisLabel: {},
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            //x轴数据
            data:this.pageData.visitCountXAxis
          }
        ],
        dataZoom: [
          {
            show: false,
            realtime: true,
            start: 0,
            end: 100
          },
          {
            type: "inside",
            realtime: true,
            start: 0,
            end: 100
          }
        ],
        yAxis: [
          {
            type: "value",
            show: false,
            splitLine: { show: false } //去除网格线
          }
        ],
        series: [
          {
            name: "",
            type: "line",
            smooth: true, //是否平滑
            showAllSymbol: true,
            // symbol: 'image://./static/images/guang-circle.png',
            symbol: "circle",
            symbolSize: 0,
            lineStyle: {
              normal: {
                color: "#7F4CEF"
              }
            },
            label: {
              show: false,
              position: "top",
              textStyle: {
                color: "#7F4CEF"
              }
            },
            itemStyle: {
              color: "#fff",
              borderColor: "#7F4CEF",
              borderWidth: 3
            },
            areaStyle: {
              normal: {
                color: "RGBA(127, 76, 239, 1)",
                shadowColor: "RGBA(80, 38, 72, 0.2)",
                shadowBlur: 20
              }
            },
            //实际数据
            data: this.pageData.visitCountData
          }
        ]
      };
      option && this.visitChart.setOption(option);
    },
    //用信通过率
    drawUsedCharts() {
      // 颜色
      let value = [this.pageData.used_total_amt_day_rate];//渲染数据
      let usedDom = document.getElementById("used-content");
      this.usedChart = echarts.init(usedDom);
      let option = {
        xAxis: {
          show: false,
          type: "value",
          boundaryGap: [0, 0],
          max: 100
        },
        yAxis: {
          type: "category",
          axisTick: "none",
          axisLine: "none",
          show: false,
          position: "right",
          axisLabel: {
            padding: [-5, -30, 0, 0],
            align: "right",
            verticalAlign: "top",
            textStyle: {
              color: "#397EF0",
              fontSize: "14",
              fontFamily: "Source Han Sans CN-Regular"
            },
            formatter: "{value}%"
          },
          data: value
        },
        series: [
          {
            data: value,
            type: "bar",
            barWidth: 14,
            showBackground: true,
            backgroundStyle: {
              // borderRadius: 50,
              color: "#E7EAF0"
            },
            itemStyle: {
              color: {
                x: 1,
                y: 0,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "#2AB0FF" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#494CF3" // 100% 处的颜色
                  }
                ]
              }
            }
          },
          {
            // name: '圆',
            type: "scatter",
            data: [80],//合格准线
            label: "none",
            symbolSize: 0,
            markPoint: {
              symbol: "rect",
              symbolSize: [2, 30],
              symbolOffset: [0, 0],
              itemStyle: {
                color: "#73DEB4"
              },
              label: {
                show: false
              },
              data: [{ type: "max" }]
            }
          }
        ]
      };
      option && this.usedChart.setOption(option);
    }
  }
};
</script>
<style lang="less" scoped>
.right-aside {
  width: 90%;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: space-around;
}
.client-content {
  width: 100%;
  flex: 0.85;
  padding: 0.0625rem;
  box-sizing: border-box;
  border-width: 0.0125rem;
  border-style: solid;
  border-color: rgba(233, 233, 233, 1);
  border-radius: 0.025rem;
  margin-top: 0.0625rem;
  display: flex;
  justify-content: center;
}
.client-content-visit {
  width: 100%;
  flex: 1.1;
  padding: 0.0625rem;
  box-sizing: border-box;
  border-width: 0.0125rem;
  border-style: solid;
  border-color: rgba(233, 233, 233, 1);
  border-radius: 0.025rem;
  margin-top: 0.0625rem;
  display: flex;
  justify-content: center;
  position: relative;
}
.inside-table {
  width: 90%;
  height: 100%;
  margin-bottom: 0.0625rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  position: relative;
}
.info-div {
  position: absolute;
  right: 0rem;
  top: 0rem;
  font-size: 0.175rem;
}
.top-div {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.0625rem;
}
.top-div-column {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.top-div .icon-div {
  width: 0.625rem;
  height: .625rem;
  background-color: #5b8ff9;
  border-radius: 50%;
  text-align: center;
  line-height: 0.575rem;
  font-size: 0.3rem;
}

.top-div .tite-div {
  width: 60%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.175rem;
  line-height: 0.275rem;
  margin-left: 0.125rem;
}
.top-div .tite-div .title,
.title {
  width: 100%;
  font-family: PingFangSC-Regular;
  color: rgba(77, 74, 74, 0.427);
  font-size: .25rem;
  line-height: 0.25rem;
  text-align: left;
}
.top-div .tite-div .value,
.value {
  width: 100%;
  text-align: left;
  font-family: Helvetica;
  color: rgba(0, 0, 0, 0.847058823529412);
  font-size: 0.3rem;
  line-height: 0.375rem;
}
.value-unit {
  font-size: 0.225rem;
}
.inside-table .line {
  width: 100%;
  height: 0.0125rem;
  margin: 0.0625rem 0rem;
  background-color: rgba(233, 233, 233, 1);
}
.inside-table .bottom-div {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.inside-table .bottom-div .bottom-div-item {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.foot-div {
  width: 100%;
}
.foot-value {
  margin-left: 0.125rem;
}

.deal-content {
  height: 1rem;
  width: 110%;
}
.visit-content {
  height: 1.125rem;
  width: 110%;
}
.used-content {
  height: 50px;
  width: 110%;
}
.special-content {
  height: 100%;
  position: absolute;
  right: -105%;
  top: -0.0625rem;
}
</style>
