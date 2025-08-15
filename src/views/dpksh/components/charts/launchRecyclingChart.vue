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
import branchIdDict from "../assets/bankNameDictionaries.js"//机构字典
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
      productCode:'00000000001',//接口查询产品编码
      areaCode:'',//接口查询区域编码
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          // show:false,
          data: [ this.$i18ns('dpksh.loan'), this.$i18ns('dpksh.repayment')],
          itemHeight: 10,
          itemWidth: 10,
          // top: "6%",
          textStyle: {
            fontSize: 12, // 调节字体大小
            color: "#fff"
          }
        },

        grid: {
          left: "2%",
          right: "3%",
          bottom: "5%",
          top: "10%",
          width: "90%", // 宽度
          height: "75%", // 高度
          containLabel: true
        },
        xAxis: {
            type: "category",
            axisLine: {
                lineStyle: {
                    color: "#fff",
                }
            },
            data: [
              "西咸分行",
              "宝鸡分行",
              "咸阳分行",
              "渭南分行",
              "榆林分行",
              "延安分行",
              "铜川分行",
              "汉中分行",
              "安康分行",
              "商洛分行"
            ],
            axisTick: false,
            axisLabel: {
              interval: 0,
              rotate: 40
            }
          },
        yAxis: [
          {
            type: "value",
            axisLine: {
                lineStyle: {
                    color: "#fff",
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
            name: this.$i18ns('dpksh.loan'),
            type: "bar",
            stack: "Ad",
            barWidth: 15,
            itemStyle: {
              normal: {
                color: "#35E4E0",
                borderColor: "#ccc",
                borderWidth: 2
              }
            },
            data: [120, 132, 101, 120, 132, 101, 134, 90, 230, 210,99],
            markPoint: {
              symbol: "path://",
              data: [{ type: "max" }],
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
                    position: "top",
                    textStyle: {
                      color: "#fff",
                      fontWeight: 1000,
                      fontSize: 14
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
          },
          {
            name: this.$i18ns('dpksh.repayment'),
            type: "bar",
            stack: "Ad",
            barWidth: 15,
            itemStyle: {
              normal: {
                color: "#FAAC15",
                borderColor: "#ccc",
                borderWidth: 2
              }
            },
            data: [220, 570, 191, 120, 182, 191, 234, 290, 330, 30,88],
            markPoint: {
              symbol: "path://",
              data: [{ type: "max" }],
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
                    position: "top",
                    textStyle: {
                      color: "#fff",
                      fontWeight: 1000,
                      fontSize: 14
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
    //    this.drawChart()
    // });
    this. getChartData()
    //接受index的定时器刷新bus
    this.$bus.on("refreshRateData", data => {
      // console.log("接受index的定时器刷新bus++++++++++++", data);
      this. getChartData()
    });
     //接收到titleBar的bus 产品改变
     this.$bus.on("productChange", productCode => {
      // console.log("接收到titleBar的bus产品改变bus----------------------", productCode);
      this.productCode=productCode
      this. getChartData()
    });
  },
  beforeDestroy() {
    if (!this.stackedLineChart) {
      return
    }
    this.stackedLineChart.dispose()
    this.stackedLineChart = null
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

      immediate: false,// 立即处理 进入页面就触发
      deep: true //对象内部属性的监听，关键。
    }
  },
  methods: {
    //绘制图表
    drawChart(option=null){
      let options=option?option:this.option
      if(!this.stackedLineChart)
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
        this.option.grid.bottom = "10%";
        this.option.grid.top = "20%";
        this.option.legend.top = "15.5%";
      } else {
        //还原图表
        this.option.grid.left = "2%";
        this.option.grid.right = "3%";
        this.option.grid.bottom = "5%";
        this.option.grid.top = "10%";
        this.option.legend.top = "0%";
      }
    },
    //请求额度树数据
    getChartData() {
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: "ar0054",
        slbl_prod_code:this.productCode,//接口查询产品编码
        // branch_id:this.areaCode,//接口查询区域编码
      };

      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
        if (response.code === "200") {
          console.log("getChartData----launchRecyclingChart右中间数据", response.data);
          //TODO 解析接口数据后注入到option中
          this.option.xAxis.data=[]//chart数据 int数组 
          this.option.series[0].data=[]//chart数据 int数组
          this.option.series[1].data=[]//chart数据 int数组
          let xAxis=[]
          let lend_amt=[]
          let rpymt_amt=[]
          for (const child of response.data) {
            xAxis.push(child.name)
            lend_amt.push(parseInt(child.value))
            rpymt_amt.push(parseInt(parseInt(child.value)-Math.round(Math.random()*50)))
          }
          this.option.xAxis.data=xAxis//chart数据 int数组
          this.option.series[0].data=lend_amt//chart数据 int数组
          this.option.series[1].data=rpymt_amt//chart数据 int数组
        } else {
          MyMessage({ message: response.message, type: "error"});
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
