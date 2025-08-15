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
        // grid: {
        //   left: "2%",
        //   right: "2%",
        //   bottom: "5%",
        //   top: "1%",
        //   width: "50%", // 宽度
        //   height: "50%",// 高度
        //   containLabel: true,//包涵刻度
        // },

        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: ["20%", "60%"],
            center: ["50%", "50%"],
            roseType: "area",
            label: {
              color: "rgba(255,255,255,0.6)"
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: "rgba(255,255,255,0.3)"
                }
              }
            },
            // itemStyle: {
            //   borderRadius: 8
            // },
            data: [
              { value: 40, name: "西咸新区分行" },
              { value: 38, name: "宝鸡分行" },
              { value: 32, name: "咸阳分行" },
              { value: 30, name: "渭南分行 " },
              { value: 28, name: "榆林分行 " },
              { value: 26, name: "延安分行 " },
              { value: 22, name: "铜川分行 " },
              { value: 18, name: "汉中分行 " },
              { value: 16, name: "安康分行 " },
              { value: 14, name: "商洛分行 " }
            ],
            color: [
              "rgba(255,0,81,0.6)",
              "rgba(255,79,15,0.6)",
              "rgba(255,155,0,0.6)",
              "rgba(255,204,0,0.6)",
              "rgba(188,214,0,0.6)",
              "rgba(0,220,10,0.6)",
              "rgba(0,219,202,0.6)",
              "rgba(74,162,255,0.6)"
            ]
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
      console.log("接受index的定时器刷新bus++++++++++++", data);
      this. getChartData()
    });
     //接收到titleBar的bus 产品改变
     this.$bus.on("productChange", productCode => {
      console.log("接收到titleBar的bus产品改变bus----------------------", productCode);
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
  
      } else {
        //还原图表

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
          console.log("getChartData----incomingPartsChart右上角", response.data);
          //TODO 解析接口数据后注入到option中
        
          this.option.series[0].data=[]//chart数据 int数组
        
          this.option.series[0].data=response.data
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
.stacked-line-content-title-text{
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
