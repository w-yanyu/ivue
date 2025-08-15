<template>
  <div class="box" ref="box">
    <div class="top-digit-content">
      <div class="top-digit-content-flex">
        <categoryDigitComponent
          :displayNumber="topLeftValue"
          categoryTitle="授信金额"
          categoryUnit="亿元"
        />
      </div>
      <div class="top-digit-content-flex">
        <categoryDigitComponent
          :displayNumber="topMiddleValue"
          categoryTitle="当日净增"
          categoryUnit="亿元"
        />
      </div>
      <div class="top-digit-content-flex">
        <categoryDigitComponent
          :displayNumber="topRightValue"
          categoryTitle="当年净增"
          categoryUnit="亿元"
        />
      </div>
    </div>

    <comEchart
      :option="option"
      :isDraggable="isDraggable"
      :mapClick="mapClick"
      :divObj="divObj"
      style="width: 100%; height: 100%"
    />
  

    <div class="dialog-pop" v-if="isShowDialog">
      <div class="dialog-mask" @click="showDialog"></div>
      <div class="dialog-content">
        <mapDialog
          ref="mapDialog"
          :dialogTitle="dialogTitle"
          :topTableValue="dialogTopValue"
          :middleTableValue="dialogMiddleValue"
          :bottomTableValue="dialogBottomValue"
          :pieTableValue="dialogPieValue"
          :pieTablePieValue="dialogPieChartValue"
        />
      </div>
    </div>
  </div>
</template>

<script>
import comEchart from "../echartBase";
import china from "../mapComponents/assets/china.json"; //中国地图
import branchIdDict from "../../assets/bankNameDictionaries.js"; //机构字典
import categoryDigitComponent from "../mapComponents/categoryDigitComponent";
import finishRatePie from "../mapComponents/finishRatePie";
import verticalInfoComp from "../mapComponents/verticalInfoComp";
import mapDialog from "../mapComponents/mapDialog";
import * as echarts from "echarts";
export default {
  name: "cardMap",
  components: {
    comEchart, //图表基础
    categoryDigitComponent, //翻转数字栏
    finishRatePie, //完成率饼状图
    verticalInfoComp, //竖型数据框
    mapDialog //地图弹出框
  },
  props: {},
  data() {
    return {
      productCode: "00000000001", //接口查询产品编码
      areaCode: "", //接口查询区域编码
      divObj: null,
      isShowDialog: false,
      areaName: "",
      mapName: "china",
      mapCharts: null,
      topLeftValue: "0.00",
      topMiddleValue: "0.00",
      topRightValue: "0.00",
      dialogTitle: "", //地图区域对话框标题
      dialogTopValue: "1.23", //顶部栏位数值
      dialogMiddleValue: "2.34", //中部栏位数值
      dialogBottomValue: "3.45", //底部栏位数值
      dialogPieValue: "45.6", //饼图部栏位数值
      dialogPieChartValue: 70, //饼图部栏位echart数值 int

      option: {},
      mapData: [  ]
    };
  },

  mounted() {
    if (!this.isDraggable) this.getChartData();
    //接受index的定时器刷新bus
    this.$bus.on("refreshRateData", data => {
      this.getChartData();
    });
    //接收到titleBar的bus 产品改变
    this.$bus.on("productChange", productCode => {
      this.productCode = productCode;
      this.getChartData();
    });
    this.divObj = this.$refs.box;
    this.$nextTick(() => {
      echarts.registerMap("china", china);
      this.option = {
        select: {
          // 地图选中区域样式
          label: {
            // 选中区域的label(文字)样式
            color: "#fff"
          },
          itemStyle: {
            // 选中区域的默认样式
            areaColor: "#a8d2ff"
          }
        },
        visualMap: {
          showLabel: true,
          textStyle: {
            //图例文字的样式
            color: "#fff",
            fontSize: 14
          },
          // realtime: false,
          // calculable: true,//显示颜色选择器
          left: 20,
          bottom: 20,
          min: 0, //数值最小值
          max: 100, //数值最大值
          //分级显示地图和示例
          pieces: [
            {
              gte: 2.0, //区间小
              lte: 2.5, //区间大
              label: "2.0-2.5亿元", //示例文案
              color: "#086dda"
            },
            {
              gte: 1.5,
              lt: 2.0,
              label: "1.5-2.0亿元",
              color: "#2b80db"
            },
            {
              gt: 1.0,
              lt: 1.5,
              label: "1.0-1.5亿元",
              color: "#4f92da"
            },
            {
              gt: 0.5,
              lt: 1.0,
              label: "0.5-1.0亿元",
              color: "#70a6e0"
            },
            {
              gte: 0,
              lte: 0.5,
              label: "0-0.5亿元",
              color: "#84b0df"
            }
          ]
        },
        // geo: {
        //   map: "china",
        //   roam: false, //是否允许缩放
        //   label: {
        //     emphasis: {
        //       show: true
        //     }
        //   },
        //   center: [105, 30], // 当前视角的缩放比例/中心  用于隐藏底部的南沙群岛地区
        //   zoom: 0.9 //默认显示级别
        //   // aspectScale: 1
        // },

        series: [
          {
            //地图

            type: "map",
            map: "china",
            mapType: "js",

            geoIndex: 0,//(bug fixed:解决在地图上缩放重影问题：https://www.dazhuanlan.com/2019/11/30/5de14b1b3aa97/)
            zlevel: 1,
            zoom: 1, //默认显示级别
            label: {
              show: true,
              color: "#ffffff",
              emphasis: {
                color: "white",
                show: false
              }
            },
            data: this.mapData,

            itemStyle: {
              normal: {
                borderColor: "#141177",
                borderWidth: 1,
                areaColor: "#3e91eb"
              },

              emphasis: {
                areaColor: "#0ad3ee", //鼠标选择区域颜色（默认高亮颜色）
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                color: "#fff",
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
    });
  },
  methods: {
    mapClick(params) {
      this.dialogTitle = `${
        branchIdDict.find(item => item.code === params.data.branch_id).name
      }业务数据`;
      this.dialogTopValue = params.data.loanBalance; //顶部栏位数值
      this.dialogMiddleValue = params.data.todayIncrease; //中部栏位数值
      this.dialogBottomValue = params.data.toyearIncrease; //底部栏位数值
      this.dialogPieValue = params.data.toyearPlan; //饼图部栏位数值
      this.dialogPieChartValue = params.data.percentageComplete; //饼图部栏位echart数值 int
      this.showDialog();
      return;
    },
    //点击地图显示对话框
    showDialog() {
      this.isShowDialog = !this.isShowDialog;
      if (this.isShowDialog) {
        document.querySelector(".box").style.zIndex = 600;
      } else {
        document.querySelector(".box").style.zIndex = 10;
      }
    },
    //请求地图数据
    getChartData() {
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: "ar0015",
        busi_type: this.productCode //接口查询产品编码
        // branch_id:this.areaCode,//接口查询区域编码
      };

      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
        if (response.code === "200") {
          this.mapData = [];
          let loanBal = 0;
          let day_increase = 0.0;
          let year_increase = 0.0;
          for (const child of response.data) {
            loanBal = loanBal + parseFloat(child.loan_bal);
            day_increase = day_increase + parseFloat(child.day_increase);
            year_increase = year_increase + parseFloat(child.year_increase);
            this.mapData.push({
              name: child.branch_name,
              branch_id: child.branch_id,
              value: parseFloat(child.day_increase),
              loanBalance: child.loan_bal,
              todayIncrease: child.day_increase,
              toyearIncrease: child.year_increase,
              toyearPlan: "0",
              percentageComplete: 0
            });
          }

          this.topLeftValue = loanBal.toFixed(2).toString();
          this.topMiddleValue = day_increase.toFixed(2).toString();
          this.topRightValue = year_increase.toFixed(2).toString();
          //设置地图数据
          this.option.series[0].data = this.mapData;
        } else {
          MyMessage({ message: response.message, type: "error" });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
}
.top-digit-content {
  width: 98%;
  margin-top: 1vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}
.top-digit-content-flex {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.mapChart {
  width: 40vw;
  height: 80vh;
}
.map-content {
  position: relative;
  width: 100%;
  height: 100%;
}
.finish-rate {
  position: absolute;
  width: 20%;
  left: 1%;
  top: 13%;
}
.vertical-info-top {
  position: absolute;
  width: 20%;
  right: 1%;
  top: 13%;
}
.vertical-info-down {
  position: absolute;
  width: 20%;
  right: 1%;
  top: 31%;
}
.dialog-pop {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 500;
  width: 100vw;
  height: 100vh;
}
.dialog-mask {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0);
}
.dialog-content {
  position: fixed;
  z-index: 800;
  width: auto;
  height: auto;
}

.dialog-content {
  position: fixed;
  left: 37%;
  top: 20%;
  width: 26vw;
  height: 75vh;
}
</style>
