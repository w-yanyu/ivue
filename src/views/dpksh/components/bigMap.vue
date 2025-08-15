<template>
  <div class="ditu">
    <div class="top-digit-content">
      <div class="top-digit-content-flex">
        <categoryDigitComponent
          :displayNumber='topLeftValue'
          :categoryTitle="$i18ns('dpksh.map-title1')"
          :categoryUnit="$i18ns('dpksh.unit3')"
        />
      </div>
      <div class="top-digit-content-flex">
        <categoryDigitComponent
          :displayNumber='topMiddleValue'
          :categoryTitle="$i18ns('dpksh.map-title2')"
          :categoryUnit="$i18ns('dpksh.unit3')"
        />
      </div>
      <div class="top-digit-content-flex">
        <categoryDigitComponent
          :displayNumber='topRightValue'
          :categoryTitle="$i18ns('dpksh.map-title3')"
          :categoryUnit="$i18ns('dpksh.unit3')"
        />
      </div>
    </div>
    <div class="map-content">
      <div class="mapChart" ref="mapChart"></div>
      <!-- <finishRatePie
        ref="finishRatePie"
        class="finish-rate"
        pieShowValue="80"
        compTitle="授信目标"
        compValue="1.2"
        compUnit="亿元"
      ></finishRatePie> -->
      <!-- <verticalInfoComp
        class="vertical-info-top"
        imageUrl="./assets/qiandai.png"
        unitInfo="万元"
        topDescribe=" 当日授信"
        topValue="97"
      /> -->
      <!-- <verticalInfoComp
        class="vertical-info-down"
        imageUrl="./assets/house.png"
        unitInfo="万元"
        topDescribe=" 当日申请"
        topValue="53"
        middleDescribe="当日通过"
        middleValue="16"
        downDescribe="当日使用"
        downValue="16"
        dur="7"
      /> -->
    </div>
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
import china from "./assets/china.json"; //中国地图
import shanXiMap from "./assets/shanxi.json"; //山西地图
import branchIdDict from "./assets/bankNameDictionaries.js"//机构字典
// import china from "echarts/map/json/china.json";
import categoryDigitComponent from "./categoryDigitComponent";
import finishRatePie from "./finishRatePie";
import verticalInfoComp from "./verticalInfoComp";
import mapDialog from "./mapDialog";
import echarts from "echarts";
export default {
  props: ["option", "tankuang", "title"],
  components: {
    categoryDigitComponent, //翻转数字栏
    finishRatePie, //完成率饼状图
    verticalInfoComp, //竖型数据框
    mapDialog //地图弹出框
  },
  data() {
    return {
      isShowDialog: false,
      areaName: "",
      mapName:'shanxi',
      mapCharts: null,
      topLeftValue:"0.00",
      topMiddleValue:"0.00",
      topRightValue:"0.00",
      productCode:'00000000001',//接口查询产品编码
      dialogTitle: "", //地图区域对话框标题
      dialogTopValue: "1.23", //顶部栏位数值
      dialogMiddleValue: "2.34", //中部栏位数值
      dialogBottomValue: "3.45", //底部栏位数值
      dialogPieValue: "45.6", //饼图部栏位数值
      dialogPieChartValue: 70, //饼图部栏位echart数值 int
      mapData: [
        {
          name: "西安市",
          value: 88,
          loanBalance: "11122.00",
          todayIncrease: "874.11",
          toyearIncrease: "5500.00",
          toyearPlan: "21.1",
          percentageComplete: 66
        },
        {
          name: "安康市",
          value: 66,
          loanBalance: "11122.00",
          todayIncrease: "874.11",
          toyearIncrease: "5500.00",
          toyearPlan: "31.1",
          percentageComplete: 76
        },
        {
          name: "榆林市",
          value: 32,
          loanBalance: "11122.00",
          todayIncrease: "874.11",
          toyearIncrease: "5500.00",
          toyearPlan: "41.1",
          percentageComplete: 86
        },
        {
          name: "延安市",
          value: 16,
          loanBalance: "11122.00",
          todayIncrease: "874.11",
          toyearIncrease: "5500.00",
          toyearPlan: "51.1",
          percentageComplete: 56
        },
        {
          name: "铜川市",
          value: 81,
          loanBalance: "11122.00",
          todayIncrease: "874.11",
          toyearIncrease: "5500.00",
          toyearPlan: "71.1",
          percentageComplete: 96
        },
        {
          name: "渭南市",
          value: 61,
          loanBalance: "11122.00",
          todayIncrease: "874.11",
          toyearIncrease: "5500.00",
          toyearPlan: "81.1",
          percentageComplete: 36
        },
        {
          name: "咸阳市",
          value: 41,
          loanBalance: "11122.00",
          todayIncrease: "874.11",
          toyearIncrease: "5500.00",
          toyearPlan: "91.1",
          percentageComplete: 26
        },
        {
          name: "宝鸡市",
          value: 21,
          loanBalance: "11122.00",
          todayIncrease: "874.11",
          toyearIncrease: "5500.00",
          toyearPlan: "11.1",
          percentageComplete: 16
        },
        {
          name: "商洛市",
          value: 11,
          loanBalance: "11122.00",
          todayIncrease: "874.11",
          toyearIncrease: "5500.00",
          toyearPlan: "1.1",
          percentageComplete: 6
        },
        {
          name: "汉中市",
          value: 70,
          loanBalance: "11122.00",
          todayIncrease: "874.11",
          toyearIncrease: "5500.00",
          toyearPlan: "1.1",
          percentageComplete: 6
        }
      ],
      options: {
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
              label: "2.0-2.5"+this.$i18ns('dpksh.unit4'), //示例文案
              color: "#086dda"
            },
            {
              gte: 1.5,
              lt: 2.0,
              label: "1.5-2.0"+this.$i18ns('dpksh.unit4'),
              color: "#2b80db"
            },
            {
              gt: 1.0,
              lt: 1.5,
              label: "1.0-1.5"+this.$i18ns('dpksh.unit4'),
              color: "#4f92da"
            },
            {
              gt: 0.5,
              lt: 1.0,
              label: "0.5-1.0"+this.$i18ns('dpksh.unit4'),
              color: "#70a6e0"
            },
            {
              gte: 0,
              lte: 0.5,
              label: "0-0.5"+this.$i18ns('dpksh.unit4'),
              color: "#84b0df"
            }
          ]
        },
        geo: {
          map: "china",
          roam: false, //是否允许缩放
          label: {
            emphasis: {
              show: true
            }
          },
          center: [105, 30], // 当前视角的缩放比例/中心  用于隐藏底部的南沙群岛地区
          zoom: 1.2 //默认显示级别
          // aspectScale: 1
        },

        series: [
          {
            //地图

            type: "map",
            map: 'shanxi',
            mapType: "js",

            geoIndex: -1,
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
            data: [],

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
      },
    };
  },
  mounted() {
    //TODO 等接口使用数据时干掉
    this.$nextTick(() => {
      this.initMap();
    });
    this. getChartData()
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
    if (!this.mapCharts) {
      return;
    }
    this.mapCharts.dispose();
    this.mapCharts = null;
  },
  watch: {
    //观察option的变化
    options: {
      handler(newVal, oldVal) {
        // console.log("地图被设置数据了")
        if (newVal) {
          this.drawMap(newVal);
        } else {
          this.drawMap(oldVal);
        }
      },

      immediate: false, // 立即处理 进入页面就触发
      deep: true //对象内部属性的监听，关键。
    }
  },
  methods: {
    //刷新charts
    resize() {
      // console.log("刷新地图chart");
      if (this.mapCharts) this.mapCharts.resize();
      if (this.$refs.finishRatePie) this.$refs.finishRatePie.resize();
      // if (this.$refs.mapDialog) this.$refs.mapDialog.resize();
    },
    //初始化地图
    initMap() {
      echarts.registerMap("shanxi", shanXiMap);
      this.mapCharts = echarts.init(this.$refs.mapChart);
      // console.log('option---------',this.options)
      //设置地图数据
      this.options.series[0].data = this.mapData;
      //设置地图点击事件
      this.mapCharts.setOption(this.options, true)
        this.mapCharts.on("click", params => {
          console.log("地图点击事件-----", params);  
          this.dialogTitle = `${branchIdDict.find(item=>item.code===params.data.branch_id).name}业务数据`;
          this.dialogTopValue = params.data.loanBalance; //顶部栏位数值
          this.dialogMiddleValue = params.data.todayIncrease; //中部栏位数值
          this.dialogBottomValue = params.data.toyearIncrease; //底部栏位数值
          this.dialogPieValue = params.data.toyearPlan; //饼图部栏位数值
          this.dialogPieChartValue = params.data.percentageComplete; //饼图部栏位echart数值 int
          this.showDialog();
          return;
        });
    },
    //点击地图显示对话框
    showDialog() {
      this.isShowDialog = !this.isShowDialog;
      if (this.isShowDialog) {
        document.querySelector(".ditu").style.zIndex = 600;
      } else {
        document.querySelector(".ditu").style.zIndex = 10;
      }
    },
    drawMap() {
      // 绘制图表
      this.mapCharts.setOption(this.options);
    },
    //请求地图数据
    getChartData() {
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: "ar0015",
        slbl_prod_code:this.productCode,//接口查询产品编码
        // branch_id:this.areaCode,//接口查询区域编码
      };

      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
        if (response.code === "200") { 
          console.log( "getChartData----bigMap", response.data);
          this.mapData=[]
          let loanBal=0
          let day_increase=0.00
          let year_increase=0.0
          for (const child of response.data) {
            loanBal=loanBal+  parseFloat(child.loan_bal)
            day_increase=day_increase+ parseFloat(child.day_increase)
            year_increase=year_increase+ parseFloat(child.year_increase)
          this.mapData.push({
          name: child.branch_name,
          branch_id:child.branch_id,
          value: parseFloat(child.day_increase),
          loanBalance: child.loan_bal,
          todayIncrease: child.day_increase,
          toyearIncrease: child.year_increase,
          toyearPlan: "0",
          percentageComplete: 0
        },)
          }
          
          this.topLeftValue=loanBal.toFixed(2).toString()
          this.topMiddleValue=day_increase.toFixed(2).toString()
          this.topRightValue=year_increase.toFixed(2).toString()
          console.log('求和计算-----', this.topLeftValue,this.topMiddleValue,this.topRightValue)
          //设置地图数据
           this.options.series[0].data = this.mapData;
        } else {
          MyMessage({ message: response.message, type: "error" });
        }
      });
    },
   
  }
};
</script>
<style scoped>
.ditu {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
}
.finish-rate {
  position: absolute;
  left: 0.5vw;
  top: 1vh;
}
.vertical-info-top {
  position: absolute;
  right: 0.5vw;
  top: 1vh;
}
.vertical-info-down {
  position: absolute;
  right: 0.5vw;
  top: 15vh;
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
