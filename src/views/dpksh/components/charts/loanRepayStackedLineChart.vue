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
import Dotted from "../assets/dotted.png";
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
      option: {
        tooltip: {
          trigger: "axis",
          backgroundColor: "#00053D",
          textStyle: {
            align: "left"
          },
          extraCssText:
            "box-shadow: 0px 1px 31px 0px rgba(55, 174, 255, 0.55) inset",
          color: "#fff",
          borderColor: "rgba(55, 174, 255, 0.73)",
          formatter: function(data) {
            const string =
              data[1].marker +
              this.$i18ns('dpksh.loan') +
              data[1].value +
              "<br/>" +
              data[0].marker +
              this.$i18ns('dpksh.repayment') +
              data[0].value +
              "<br/>" +
              "--" +
              this.$i18ns('dpksh.net-increase') +
              (data[0].value - data[1].value);
            return string;
          },
          axisPointer: {
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },

        legend: {
          show: true,
          data: [
            { name: this.$i18ns('dpksh.loan'), icon: "rect" },
            { name: this.$i18ns('dpksh.repayment'), icon: "rect" }
          ],
          // top: "15.5%",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: 12, // 调节字体大小
            color: "#fff"
          }
        },

        grid: {
          left: "2%",
          right: "2%",
          bottom: "5%",
          top: "10%",
          width: "90%", // 宽度
          height: "75%", // 高度
          containLabel: true //包涵刻度
        },
        xAxis: 
          {
            type: "category",
            boundaryGap: false,
            axisTick: false, // 是否显示刻度
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            },
            data: [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23
            ]
          }
        ,
        yAxis: [
          {
            type: "value",
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
          }
        ],
        series: [
          {
            name: "放款",
            type: "line",
            stack: "Total",
            color: "#00E4E0",
            areaStyle: { color: "#00748E" },
            emphasis: {
              focus: "series"
            },
            symbol: "none",
            data: [
              340,
              350,
              360,
              400,
              410,
              420,
              430,
              440,
              450,
              460,
              470,
              480,
              550,
              560,
              570,
              580,
              590,
              600,
              610,
              620,
              630,
              640,
              650,
              660
            ],
            markPoint: {
              symbol: "circle",
              data: [{ type: "1", name: "高峰期" }],
              label: {
                textStyle: {
                  color: "#fff",
                  fontSize: 15
                }
              },
              itemStyle: {
                normal: {
                  color: "#00053D",
                  borderColor: "#00748E",
                  borderWidth: 3,
                  label: {
                    show: true,
                    position: "right",
                    textStyle: {
                      color: "#00748E"
                    }
                  },
                  textColor: "#00748E"
                },
                emphasis: {
                  label: {
                    show: true
                  }
                }
              },
              symbolSize: [10, 10] // 容器大
              // symbolOffset: [0, -20], //位置偏移
            }
          },
          {
            name: "还款",
            type: "line",
            stack: "Total",
            color: "#FFFFFF",
            areaStyle: { color: "#505379" },
            emphasis: {
              focus: "series"
            },
            symbol: "none",
            data: [
              220,
              230,
              240,
              260,
              290,
              330,
              340,
              350,
              360,
              370,
              380,
              390,
              430,
              440,
              450,
              460,
              470,
              480,
              490,
              500,
              510,
              530,
              570,
              575
            ],
            markPoint: {
              symbol: "circle",
              data: [{ type: "0" }],
              label: {
                textStyle: {
                  color: "#fff",
                  fontSize: 15
                }
              },
              itemStyle: {
                normal: {
                  color: "#00053D",
                  borderColor: "#fff",
                  borderWidth: 3,
                  label: {
                    show: true,
                    position: "right",
                    textStyle: {
                      color: "#fff"
                    }
                  }
                },
                emphasis: {
                  label: {
                    show: true
                  }
                }
              },
              symbolSize: [10, 10] // 容器大
              // symbolOffset: [0, -20], //位置偏移
            }
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
   this. getChartData()
    //接受index的定时器刷新bus
    this.$bus.on("refreshRateData", data => {
      // console.log("接受index的定时器刷新bus++++++++++++", data);
      this. getChartData()
    });
    //接收到titleBar的bus 产品改变
    this.$bus.on("productChange", productCode => {
      // console.log("接收到titleBar的bus产品改变bus---", productCode);
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
        this.option.grid.bottom = "8%";
        this.option.grid.top = "20%";
        this.option.legend.top = "15.5%";
      } else {
        //还原图表
        this.option.grid.left = "2%";
        this.option.grid.right = "2%";
        this.option.grid.bottom = "5%";
        this.option.grid.top = "10%";
        this.option.legend.top = "0%";
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
            "getChartData----loanRepayStackedLineChart",
            response.data
          );

          //TODO 解析接口数据后注入到option中
          // option.xAxis.data=[]//X坐标文案 Str类型数组
          // option.series[0].name="用户量"
          // option.series[0].data=[]//chart数据 int数组
          this.option.xAxis.data = [];
          this.option.series[0].data = [];//放款
          this.option.series[1].data = [];//还款
          let xAxis = [];
          let lend_amt = [];//放款
          let rpymt_amt=[];//还款
          for (const child of response.data) {
            xAxis.push(child.loan_time);
            lend_amt.push(child.lend_amt);
            rpymt_amt.push(child.rpymt_amt);

          }
          this.option.xAxis.data = xAxis;
          this.option.series[0].data = lend_amt;
          this.option.series[1].data = rpymt_amt;
          console.log('loanRepayStackedLineChart  option',this.option)
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
