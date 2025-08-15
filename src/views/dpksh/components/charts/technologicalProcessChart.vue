<template>
    <div class="stacked-line-content-big">
      <div  class="stacked-line-content">
        <div class="stacked-line-content-title">
        <div class="stacked-line-content-title-text">
          {{ titleName }}
          <span class="stacked-line-content-unit">{{ unitName }}</span>
        </div>
        <div class="stacked-line-blow-up">
          <img src="../assets/blowUp.png" alt="" style="" @click="popover" />
        </div>
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
  import branchIdDict from "../assets/bankNameDictionaries.js"//机构字典
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
        productCode:'00000000001',//接口查询产品编码
      areaCode:'',//接口查询区域编码
        option: {
       tooltip: {
          trigger: "axis",
          backgroundColor: "#00053D",
          extraCssText:
            "box-shadow: 0px 1px 31px 0px rgba(55, 174, 255, 0.55) inset",
          color: "#fff",
          borderColor: "rgba(55, 174, 255, 0.73)",
        },

        grid: {
          left: "2%",
          right: "2%",
          bottom: "5%",
          top: "10%",
         width: "90%", // 宽度
         height: "75%",// 高度
          containLabel: true,//包涵刻度
        },
        xAxis: {
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
              color: "rgba(255,255,255,0.2)",
            },
            show: true, //隐藏或显示
          },
        },
        yAxis: {
          type: "category",
          axisLine: {
                lineStyle: {
                    color: "#fff",
                }
            },
          data: ["Brazil", "Indonesia", "USA", "India", "China", "World"],
          axisTick: false,
        },
        series: [
          // {
          //   name: "Placeholder",
          //   type: "bar",
          //   stack: "Total",
          //   itemStyle: {
          //     borderColor: "transparent",
          //     color: "transparent",
          //   },
          //   emphasis: {
          //     itemStyle: {
          //       borderColor: "transparent",
          //       color: "transparent",
          //     },
          //   },
          //   data: [2600, 1400, 1100, 900, 0, 0],
          // },
          {
            name: "进件笔数",
            type: "bar",
            stack: "Total",
            label: {
              show: true,
              position: "inside",
            },
            data: [300, 1200, 300, 200, 900, 2900],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  [
                    { offset: 0, color: "#59BBFF" }, //柱图渐变色

                    { offset: 1, color: "#0060FF" }, //柱图渐变色
                  ]
                ),
              },
            },
          },
        ],
      },
      };
    },
    mounted() {
   //TODO 等接口使用数据时干掉
  //  this.$nextTick(() => {
  //     //  this.drawChart()
  //   });
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
        console.log("刷新表格数据----",newVal,oldVal)
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
        this.option.grid.bottom = "6%";
        this.option.grid.top = "20%";
        this.option.grid.height = "75%";
      } else {
        //图表还原
        this.option.grid.left = "2%";
        this.option.grid.right = "2%";
        this.option.grid.bottom = "5%";
        this.option.grid.top = "10%";
        this.option.grid.height = "75%";
      }
      },
       //请求额度树数据
     getChartData() {
      let that=this
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: "ar0052",
        slbl_prod_code:this.productCode,//接口查询产品编码
        // branch_id:this.areaCode,//接口查询区域编码
      };

      that.$http.invokeAPI(init_url, "post", init_req).then(response => {
        if (response.code === "200") {
          console.log("getChartData----technologicalProcessChart", response.data);
          // this.option.series[0].data=[]//chart数据 int数组
          // this.option.yAxis=[];//机构名称
            //在方法内判断，然后销毁实例，然后再初始化
      // if (that.stackedLineChart != null && that.stackedLineChart != "" && that.stackedLineChart != undefined) {
      //   that.stackedLineChart.dispose();//销毁
      // }
          let bankName=[];
          let chartData=[];
          let totle=0
          for (const child of response.data) {
            bankName.push(branchIdDict.find(item=>item.code===child.branch_id).name)
            chartData.push(child.total_count)
            totle=totle+child.total_count
          }
          bankName.push('长安银行总行')
          chartData.push(totle)
          
          that.option.yAxis.data=bankName;//机构名称
          that.option.series[0].data=chartData//chart数据 int数组
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
     cursor: pointer;
  }
  </style>