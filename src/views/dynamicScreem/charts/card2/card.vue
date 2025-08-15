<template>
  <div class="box" ref="box">
    <div class="box-title">
      <div class="box-title-text">
        {{ titleName }}
        <span class="box-title-unit">{{ unitName }}</span>
      </div>
      <div class="box-blow-up" v-if="!isDraggable">
        <img src="../../assets/blowUp.png" alt="" style="" @click="popover" />
      </div>
    </div>

    <comEchart
      :option="option"
      :isDraggable="isDraggable"
      :divObj="divObj"
      style="width: 100%; height: 100%"
    />

    <!-- 全屏 -->
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
import screenfull from "screenfull";
import PopBlowUp from "../PopBlowUp.vue";
import echarts from "echarts";
import comEchart from "../echartBase";
import branchIdDict from "../../assets/bankNameDictionaries.js"; //机构字典
export default {
  name: "card1",
  components: { comEchart, PopBlowUp },
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
    //是否在编辑状态
    isDraggable: {
      type: Boolean,
      default: false
    },
    item: Object
  },
  data() {
    return {
      servicecode: "", // 接口交易码
      productCode: "", //接口查询产品编码
      areaCode: "", //接口查询区域编码
      divObj: null,
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
            name: "",
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
      },
      isShowPop: false // 全屏
    };
  },
  created() {},
  mounted() {
    // if (!this.isDraggable) this.getChartData();
    //接受index的定时器刷新bus
    this.$bus.on("refreshCardData", data => {
      data.forEach(ele => {
        if (ele.card_i_name === "card2" && (ele.card_id === this.item.card_id)) {
          this.servicecode = ele.servicecode;
          this.productCode = ele.busi_card_type;
          this.areaCode = ele.branch_id;
          this.getChartData();
        }
      });
    });
    //接收到titleBar的bus 产品改变
    this.$bus.on("productChange", productCode => {
      this.productCode = productCode;
      this.getChartData();
    });
    //接收到titleBar的bus 机构改变
    this.$bus.on("branchChange", branchId => {
      this.areaCode = branchId;
      this.getChartData();
    });

    this.divObj = this.$refs.box;
  },
  // beforeDestroy() {// 移除事件监听器
  //   this.$bus.off("refreshCardData")
  //   this.$bus.off("productChange")
  //   this.$bus.off("branchChange")
  // },
  methods: {
    //请求额度树数据
    getChartData() {
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: this.servicecode,
        busi_type: this.productCode, //接口查询产品编码
        branch_id: this.areaCode //接口查询区域编码
      };
      if (this.servicecode) {
        this.$http.invokeAPI(init_url, "post", init_req).then(response => {
          if (response.code === "200") {
            //TODO 解析接口数据后注入到option中
            // option.xAxis.data=[]//X坐标文案 Str类型数组
            // option.series[0].name="用户量"
            // option.series[0].data=[]//chart数据 int数组
            this.option.xAxis.data = [];
            this.option.series[0].data = [];
            let xAxis = [];
            let chartData = [];
            for (const child of response.data.list01) {
              xAxis.push(child.name);
              chartData.push(child.value);
            }
            this.option.xAxis.data = xAxis;
            this.option.series[0].data = chartData;
            this.option.series[0].name = response.data.tip_name;
          } else {
            MyMessage({ message: response.message, type: "error" });
          }
        });
      }
    },
    //点击放大窗口
    popover() {
      // if (screenfull.enabled) {
      //   screenfull.toggle(this.$refs.box);
      // }
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
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}
.box-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
  font-size: 18px;
  width: 97%;
  margin-top: 1vh;
}

.box-title-text {
  padding-left: 1vw;
}
.box-title-unit {
  font-size: 12px;
  color: #37aeff;
  margin-left: 14px;
}

.box-blow-up {
  cursor: pointer;
}

.stacked-line {
  width: 100%;
  height: 30vh;
}
</style>
