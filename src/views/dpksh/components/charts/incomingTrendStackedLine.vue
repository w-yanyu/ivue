<template>
  <div class="stacked-line-content-big">
    <div class="stacked-line-content">
      <div class="stacked-line-content-title">
        <div class="stacked-line-content-title-text">
          {{ titleName }}
          <span class="stacked-line-content-unit">{{ unitName }}</span>
        </div>
        <div class="stacked-line-blow-up">
          <img src="../assets/blowUp.png" alt="" style="" @click="popover" />
        </div>
      </div>

      <div ref="stackedLine" class="stacked-line"></div>
    </div>
    <PopBlowUp
      :option="option"
      v-if="isShowPop"
      :titleName="titleName"
      :unitName="unitName"
      @hiddlePop="popover"
      ref="popBlowUp"
    ></PopBlowUp>
  </div>
</template>
<script>
import PopBlowUp from "./PopBlowUp.vue";
import echarts from "echarts";

export default {
  props: {
    //表格标题
    titleName: {
      type: String,
      default: ""
    },
    //表格单位
    unitName: {
      type: String,
      default: ""
    },
    //表格数据
    chartData: Object
  },
  components: {
    PopBlowUp
  },
  data() {
    return {
      isShowPop: false,
      stackedLineChart: null,
      productCode: "00000000001", //接口查询产品编码
      areaCode: "", //接口查询区域编码

      //chart配置
      option: {
        grid: {
          left: "2%",
          right: "2%",
          bottom: "5%",
          top: "5%",
          width: "90%", // 宽度
          height: "80%", // 高度
          containLabel: true //包涵刻度
        },
        title: {
          text: "",
          subtext: "",
          left: 10,
          textVerticalAlign: "auto",
          subtextStyle: {
            fontSize: 12,
            color: "#37AEFF",
            fontWeight: "800"
          },

          smooth: false,
          itemStyle: {
            // normal:{
            //     lineStyle:{
            //         width:2,
            //         type:'dotted'  //'dotted'虚线 'solid'实线
            //     }
            // }
          },
          textStyle: {
            fontSize: 16, // 调节字体大小
            color: "#fff",
            fontWeight: "800"
          }
        },
        tooltip: {
          trigger: "axis",
          backgroundColor: "#00053D",
          extraCssText:
            "box-shadow: 0px 1px 31px 0px rgba(55, 174, 255, 0.55) inset",
          color: "#fff",
          borderColor: "rgba(55, 174, 255, 0.73)"
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          boundaryGap: false,
          axisTick: false,
          data: [
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "21",
            "26",
            "27",
            "28",
            "29"
          ]
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          splitLine: {
            //网格线
            lineStyle: {
              type: "solid", //设置网格线类型 dotted：虚线   solid:实线
              width: 1,
              color: "rgba(255,255,255,0.2)"
            },
            show: true //隐藏或显示
          }
        },
        series: [
          {
            name: "进件数",
            type: "line",
            data: [100, 200, 300, 310, 310, 320, 330, 340],
            symbol: "none",
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(255,204,0,0.8)" // 100% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(255,204,0,0)" //   0% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            color: "#FFCC00" //线条颜色
          }
        ]
      }
    };
  },
  mounted() {
    //TODO 等接口使用数据时干掉
    // this.$nextTick(() => {
    //   this.drawChart();
    // });
    this.getChartData();
    //接受index的定时器刷新bus
    this.$bus.on("refreshRateData", data => {
      // console.log("接受index的定时器刷新bus++++++++++++", data);
      this. getChartData()
    });
    //接收到titleBar的bus 产品改变
    this.$bus.on("productChange", productCode => {
      // console.log( "接收到titleBar的bus产品改变bus----------------------",productCode);
      this.productCode=productCode
      this. getChartData()
    });
  },
  beforeDestroy() {
    if (!this.stackedLineChart) {
      return;
    }
    this.stackedLineChart.dispose();
    this.stackedLineChart = null;
  },
  watch: {
    //观察option的变化
    option: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.drawChart(newVal);
        } else {
          this.drawChart(oldVal);
        }
      },

      immediate: false, // 立即处理 进入页面就触发
      deep: true //对象内部属性的监听，关键。
    }
  },
  methods: {
    //绘制图表
    drawChart(option = null) {
      let options = option ? option : this.option;
      if (!this.stackedLineChart)
        //获取charts
        this.stackedLineChart = echarts.init(this.$refs.stackedLine);
      // 绘制图表
      this.stackedLineChart.setOption(options);
    },
    //chart刷新
    resize() {
      if (this.stackedLineChart) this.stackedLineChart.resize();
      if (this.popBlowUp) this.popBlowUp.resize();
    },
    //点击放大窗口
    popover() {
      this.isShowPop = !this.isShowPop;
      if (this.isShowPop) {
        //图表放大时，位置调整
        this.option.grid.left = "5%";
        this.option.grid.right = "5%";
        this.option.grid.bottom = "6%";
        this.option.grid.top = "20%";
        this.option.grid.height = "75%";
      } else {
        //还原图表
        this.option.grid.left = "2%";
        this.option.grid.right = "2%";
        this.option.grid.bottom = "5%";
        this.option.grid.top = "5%";
        this.option.grid.height = "80%";
      }
    },
    //请求额度树数据
    getChartData() {
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: "ar0053",
        slbl_prod_code: this.productCode //接口查询产品编码
        // branch_id:this.areaCode,//接口查询区域编码
      };

      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
        if (response.code === "200") {
          console.log(
            "getChartData----incomingTrendStackedLine",
            response.data
          );

          //TODO 解析接口数据后注入到option中
          // option.xAxis.data=[]//X坐标文案 Str类型数组
          // option.series[0].name="用户量"
          // option.series[0].data=[]//chart数据 int数组
          this.option.xAxis.data = [];
          this.option.series[0].data = [];
          let xAxis = [];
          let chartData = [];
          for (const child of response.data) {
            xAxis.push(child.loan_time);
            chartData.push(child.total_count);
          }
          this.option.xAxis.data = xAxis;
          this.option.series[0].data = chartData;
        } else {
          MyMessage({ message: response.message, type: "error" });
        }
      });
    },
  }
};
</script>
<style scoped>
.stacked-line-content-big {
  width: 100%;
  height: 100%;
}
.stacked-line-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 99%;
}
.stacked-line-content-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
  font-size: 18px;
  width: 97%;
  margin-top: 1vh;
}
.stacked-line-content-title-text {
  padding-left: 1vw;
}
.stacked-line-content-unit {
  font-size: 12px;
  color: #37aeff;
  margin-left: 14px;
}
.stacked-line {
  width: 100%;
  height: 30vh;
}
.stacked-line-blow-up {
  cursor: pointer;
}
</style>
