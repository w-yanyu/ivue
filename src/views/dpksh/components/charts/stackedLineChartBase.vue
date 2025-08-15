<template>
    <div class="stacked-line-content-big">
      <div  class="stacked-line-content">
        <div class="stacked-line-content-title">
          <div>
           {{ titleName }}
            <span class="stacked-line-content-unit">{{ unitName }}</span
            >
          </div>
        </div>
        <div class="stacked-line-blow-up">
            <img
              src="../assets/blowUp.png" 
              alt=""
              style=""
              @click="popover"
            />
          </div>
        <div ref="stackedLine" class="stacked-line" ></div>
      </div>
      <PopBlowUp :option="option" v-if="isShowPop" :titleName="titleName" :unitName="unitName" @hiddlePop="popover"
       ref="popBlowUp" ></PopBlowUp
      >
    </div>
  </template>
  <script>
  import PopBlowUp from "./PopBlowUp.vue";
  import Dotted from "../assets/dotted.png"
  import echarts from "echarts";
  export default {
    props: {
        //表格标题
  titleName:{
    type:String,
    default:'',
  },
  //表格单位
  unitName:{
    type:String,
    default:'',
  },
  //表格数据
  chartData:Object
},
    components: {
        PopBlowUp, 
    },
    data() {
      return {
        isShowPop: false,
        stackedLineChart:null,
        productCode:'',//接口查询产品编码
      areaCode:'',//接口查询区域编码
        option: {
          grid: {
            x: "13%", //x 偏移量
            y: "28%", // y 偏移量
            width: "80%", // 宽度
            height: "60%", // 高度
          },
          legend: {
            // show:false,
            data: [
              { name: "申请", icon: "rect" },
              { name: "授信", icon: "rect" },
              { name: "启用", icon: "rect" },
              { name: "审批通过率", icon: `image://${Dotted}` },
            ],
            top: "15%",
            left: "30%",
  
            symbol: "circle",
  
            itemHeight: 2,
            itemWidth: 10,
            textStyle: {
              fontSize: 12, // 调节字体大小
              color: "#fff",
            },
          },
          tooltip: {
            trigger: "axis",
            textStyle: {
              align: "left",
            },
            backgroundColor: "#00053D",
            extraCssText:
              "box-shadow: 0px 1px 31px 0px rgba(55, 174, 255, 0.55) inset",
            color: "#fff",
            borderColor: "rgba(55, 174, 255, 0.73)",
          },
          title: {
            text: "",
            subtext: "",
            left: 10,
            textVerticalAlign: "auto",
            subtextStyle: {
              fontSize: 12,
              color: "#37AEFF",
              fontWeight: "800",
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
              fontWeight: "800",
            },
          },
  
          xAxis: {
            type: "category",
            boundaryGap: false,
            axisTick: false,
            data: [
              0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
              19, 20, 21, 22, 23,
            ],
            axisLine: {
                lineStyle: {
                    color: "#fff",
                }
            }
          },
          yAxis: [
            { axisLine: {
                lineStyle: {
                    color: "#fff",
                }
            },
              splitLine: {
                //网格线
                lineStyle: {
                  type: "solid", //设置网格线类型 dotted：虚线   solid:实线
                  width: 1,
                  color: "rgba(255,255,255,0.2)",
                },
                show: true, //隐藏或显示
              },
            },
            {
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
                  color: "rgba(255,255,255,0.2)",
                },
                show: true, //隐藏或显示
              },
            },
          ],
  
          series: [
    
            {
              name: "审批通过率",
              type: "line",
              yAxisIndex: 1,
              data: [
               
              ],
               markPoint: {
                                  symbol:'circle',
                                  data: [
                                      {
                                        value:'',
                                        yAxis:'',
                                        xAxis:'',
                                        // x:'94%',
                                        // value:'530',
                                      },
                                    
                                  ],
                                  label: {
                                      textStyle: {
                                        color: "#fff",
                                        fontSize: 15,
                                      },
                                    },
                                  itemStyle: {
                                          normal: {
                                            color: "#00053D",
                                            borderColor: '#FFB000',
                                             borderWidth: 3,
                                              label: {
                                                  show: true,
                                                  position: 'right',
                                                  textStyle: {
                                                      color: '#FFB000'
                                                  }
                                              },
                                              textColor : '#00748E'
                                          },
                                          emphasis: {
                                              label: {
                                                  show: true
                                              }
                                          }
                                      },
                                  symbolSize: [10, 10], // 容器大
                                  // symbolOffset: [0, -20], //位置偏移
                  },
              lineStyle: {
                color: "#FFB000",
                width: 2,
                type: "dashed",
              },
              showSymbol: false,
            },
            {
              name: "申请",
              type: "line",
              yAxisIndex: 0,
              data: [
                
              ],
              showSymbol: false,
  
              color: "#0060FF", //线条颜色
              markPoint: {
                                  symbol:'circle',
                                  data: [
                                      {
                                        value:'',
                                        yAxis:'',
                                        xAxis:'',
                                        // x:'94%',
                                        // value:'530',
                                      },
                                    
                                  ],
                                  label: {
                                      textStyle: {
                                        color: "#fff",
                                        fontSize: 15,
                                      },
                                    },
                                  itemStyle: {
                                          normal: {
                                            color: "#00053D",
                                            borderColor: '#0060FF',
                                             borderWidth: 3,
                                              label: {
                                                  show: true,
                                                  position: 'right',
                                                  textStyle: {
                                                      color: '#0060FF'
                                                  }
                                              },
                                              textColor : '#00748E'
                                          },
                                          emphasis: {
                                              label: {
                                                  show: true
                                              }
                                          }
                                      },
                                  symbolSize: [10, 10], // 容器大
                                  // symbolOffset: [0, -20], //位置偏移
                  }
            },
            {
              name: "授信",
              type: "line",
              yAxisIndex: 0,
              daa:[],
              showSymbol: false,
  
              color: "#3BF4AD", //线条颜色
               markPoint: {
                                  symbol:'circle',
                                  data: [
                                      {
                                        value:'',
                                        yAxis:'',
                                        xAxis:'',
                                        // x:'94%',
                                        // value:'530',
                                      },
                                    
                                  ],
                                  label: {
                                      textStyle: {
                                        color: "#fff",
                                        fontSize: 15,
                                      },
                                    },
                                  itemStyle: {
                                          normal: {
                                            color: "#00053D",
                                            borderColor: '#3BF4AD',
                                             borderWidth: 3,
                                              label: {
                                                  show: true,
                                                  position: 'right',
                                                  textStyle: {
                                                      color: '#3BF4AD'
                                                  }
                                              },
                                              textColor : '#00748E'
                                          },
                                          emphasis: {
                                              label: {
                                                  show: true
                                              }
                                          }
                                      },
                                  symbolSize: [10, 10], // 容器大
                                  // symbolOffset: [0, -20], //位置偏移
                  }
            },
            {
              name: "启用",
              yAxisIndex: 0,
              type: "line",
              data: [],
              showSymbol: false,
  
              color: "#8044FF", //线条颜色
               markPoint: {
                                  symbol:'circle',
                                  data: [
                                      {
                                        value:'',
                                        yAxis:'',
                                        xAxis:'',
                                        // x:'94%',
                                        // value:'530',
                                      },
                                    
                                  ],
                                  label: {
                                      textStyle: {
                                        color: "#fff",
                                        fontSize: 15,
                                      },
                                    },
                                  itemStyle: {
                                          normal: {
                                            color: "#00053D",
                                            borderColor: '#8044FF',
                                             borderWidth: 3,
                                              label: {
                                                  show: true,
                                                  position: 'right',
                                                  textStyle: {
                                                      color: '#8044FF'
                                                  }
                                              },
                                              textColor : '#00748E'
                                          },
                                          emphasis: {
                                              label: {
                                                  show: true
                                              }
                                          }
                                      },
                                  symbolSize: [10, 10], // 容器大
                                  // symbolOffset: [0, -20], //位置偏移
                  }
            },
          ],
        },
      };
    },
    mounted() {
      this.getPoint()
      //TODO 等接口使用数据时干掉
      this.$nextTick(() => {
       this.drawChart()
    });
    // this. getChartData()
    //接受index的定时器刷新bus
    this.$bus.on("refreshRateData", data => {
      console.log("接受index的定时器刷新bus++++++++++++", data);
      // this. getChartData()
    });
     //接收到titleBar的bus 产品改变
     this.$bus.on("productChange", productCode => {
      console.log("接收到titleBar的bus产品改变bus----------------------", productCode);
      // this. getChartData()
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
     //注入模拟数据
      getPoint(){
               var that = this
                that.option.series[0].data = [70, 60, 80, 75, 80, 70, 60, 80, 75, 80, 80, 70, 60, 80, 75, 80]
                that.option.series[1].data = [200, 300, 400, 410, 410, 410, 400, 420, 430, 440, 420, 410, 500,520, 560,]
                that.option.series[2].data =  [150, 240, 280, 290, 310, 320, 330, 340, 310, 320, 310, 400, 390,400, 410,]  
                that.option.series[3].data = [100, 200, 210, 220, 230, 240, 250, 300, 280, 300, 260, 320, 330,310, 320,]
              
        },
    //点击放大窗口
      popover() {
        //图表放大时，位置调整
        this.option.grid = {
          x: "8%", //x 偏移量
          y: "18%", // y 偏移量
          width: "87%", // 宽度
          height: "76%", // 高度
        };
        //图例位置调整
        this.option.legend.top = "12%";
        this.option.legend.left = "40%";
        this.isShowPop = !this.isShowPop;
      },
      //请求额度树数据
     getChartData() {
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: "uccp3025",
        cust_no: this.customeNo,
        cust_info_type: "1,2,3,4",
        //TODO 暂定此参数
      productCode:this.productCode,//接口查询产品编码
      areaCode:this.areaCode,//接口查询区域编码
      };

      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
        if (response.code === "200") {
          console.log("getChartData----incomingTrendStackedLine", response.data);
          //TODO 解析接口数据后注入到option中
          // option.xAxis.data=[]//X坐标文案 Str类型数组
          // option.series[0].name="用户量"
          // option.series[0].data=[]//chart数据 int数组
         
        } else {
          MyMessage({ message: response.message, type: "error"});
        }
      });
    },
    },
  };
  </script>
  <style scoped>
  .stacked-line-content-big{
    width: 100%;
    height: 100%;
  }
  .stacked-line-content {
    position: relative;
    width: 99%;
  }
  .stacked-line-content-title {
    position: absolute;
    display: flex;
    justify-content: space-between;
    padding-left: 5vw;
    padding-right: 5vw;
    color: #ffffff;
    font-size: 18px;
    top: 1vh;
    width: 90%;
    z-index: 100;
  }
  .stacked-line-content-unit{
    font-size: 12px;
    color:#37AEFF;
    margin-left: 14px;
  }
  .stacked-line{
    width: 100%; 
    height: 30vh;
  }
  .stacked-line-blow-up{
    position: absolute;
    z-index:700;
     top: 1vh;
     right: 0.2vw;
     cursor: pointer;
  }
  </style>