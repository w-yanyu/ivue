<template>
  <div class="box" ref="box">
    <comEchart
      :option="option"
      :isDraggable="isDraggable"
      :mapClick="mapClick"
      :divObj="divObj"
      style="width: 100%; height: 100%"
    />
    <finishRatePie
      ref="finishRatePie"
      class="finish-rate"
      :displayNumber="topLeftValue"
      :categoryTitle="item.area1"
      :categoryUnit="unitName"
      :divObj="divObj"
    ></finishRatePie>
    <verticalInfoComp
      class="vertical-info-top"
      imageUrl="./assets/qiandai.png"
      :displayNumber="topMiddleValue"
      :categoryTitle="item.area2"
      :categoryUnit="unitName"
    />
    <verticalInfoComp
      class="vertical-info-down"
      imageUrl="./assets/house.png"
      :displayNumber="topRightValue"
      :categoryTitle="item.area3"
      :categoryUnit="unitName"
    />

    <div class="dialog-pop" v-if="isShowDialog">
      <div class="dialog-mask" @click="showDialog"></div>
      <div class="dialog-content">
        <mapDialog
          ref="mapDialog"
          :dialogTitle="dialogTitle"
          :tableUnit="unitName"
          :topTableTitle="item.area1"
          :middleTableTitle="item.area2"
          :bottomTableTitle="item.area3"
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
import branchIdDict from "../../assets/bankNameDictionaries.js"; //机构字典
import categoryDigitComponent from "../mapComponents/categoryDigitComponent";
import finishRatePie from "../mapComponents/finishRatePie";
import verticalInfoComp from "../mapComponents/verticalInfoComp";
import mapDialog from "../mapComponents/mapDialog";
import * as echarts from "echarts";
import MyAxios from "pte-ui/utils/MyAxios";
import { stringToNumber, toDecimal2 } from "@/util/commondeal.js";

export default {
  name: "cardMap",
  components: {
    comEchart, //图表基础
    categoryDigitComponent, //翻转数字栏
    finishRatePie, //完成率饼状图
    verticalInfoComp, //竖型数据框
    mapDialog //地图弹出框
  },
  props: {
    //表格单位
    unitName: {
      type: String,
      default: ""
    },
    item: Object,
    //是否在编辑状态
    isDraggable: {
      type: Boolean,
      default: false
    },
    //城市名称
    cityName: {
      type: String,
      default: "china"
    }
  },
  data() {
    return {
      productCode: "", //接口查询产品编码
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

      mapData: [],
      mapJson: {}, // 地图json内容
      cityCode: "", // 城市编码
      leftColor: ["#84b0df", "#70a6e0", "#4f92da", "#2b80db", "#086dda"], // 左下角档位分区颜色，最多五个档位，颜色由浅到深
      option: {}
    };
  },

  mounted() {
    this.getMap("");
    // if (!this.isDraggable) this.getChartData();
    //接受地图刷新bus
    this.$bus.on("refreshMapData", data => {

      data.forEach(ele => {
        if (ele.card_i_name === "cardMap2" && (ele.card_id === this.item.card_id)) {
          this.cityCode = ele.area_code;
          this.getMap(ele);
          // this.getChartData();
        }
      });
    });
    //接受index的定时器刷新bus
    this.$bus.on("refreshCardData", data => {
      data.forEach(ele => {
        if (ele.card_i_name === "cardMap2" && (ele.card_id === this.item.card_id)) {
          this.servicecode = ele.servicecode;
          this.productCode = ele.busi_card_type;
          this.areaCode = ele.area_code;
          // this.getMap();
          this.getChartData();
        }
      });
    });
    //接收到titleBar的bus 产品改变
    this.$bus.on("productChange", productCode => {
      this.productCode = productCode;
      this.getChartData();
    });
    this.divObj = this.$refs.box;
  },
  watch: {
    item: {
      handler(val) {
        if (val.gear && val.gear_interval && this.option.visualMap) {
          this.option.visualMap.pieces = this.gearDeal(val);
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    /**
     * 处理栏位及栏位间隔
     */
    gearDeal(val) {
      //分级显示地图和示例
      let piecesItem = [];
      let newinterval = [0];
      for (let i = 1; i <= stringToNumber(val.gear); i++) {
        let interval = newinterval[i - 1] + toDecimal2(val.gear_interval);
        let intervals = toDecimal2(interval);

        newinterval.push(intervals);

        piecesItem.push({
          gte: newinterval[i - 1] || "", //区间小
          lte: newinterval[i] || "", //区间大
          label:
            newinterval[i - 1] + "-" + newinterval[i] + this.unitName || "", //示例文案
          color: this.leftColor[i - 1] || ""
        });
      }

      // 删除最后一项的最大值，表达无限大。显示标签XXX以上
      if(piecesItem.length > 0) {
        piecesItem[piecesItem.length - 1].label = piecesItem[piecesItem.length - 1].gte + this.unitName + "以上"
        delete piecesItem[piecesItem.length - 1].lte
      }

      return piecesItem;
    },
    // 请求地图文件，初始化默认北京市地图
    getMap(item) {
      // 如果编码为0，则为中国，加载中国100000.json文件
      let citycode = (this.cityCode === '0' || this.cityCode ===  '') ? '100000' : this.cityCode;
      let cityName = this.cityName || 'china';
      if (citycode) {
        MyAxios.invokeAPI(`/cityjson/${citycode}.json `, "GET")
          .then(res => {
            if (res) {
              this.mapJson = res;
              const that = this;
              this.$nextTick(() => {
                echarts.registerMap(cityName, that.mapJson);
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
                    pieces: this.gearDeal(item)
                  },
                  series: [
                    {
                      //地图
                      type: "map",
                      map: cityName,
                      mapType: "js",
                      animationDurationUpdate: 0,
                      roam: true, // 缩放
                      geoIndex: 2, //(bug fixed:解决在地图上缩放重影问题：https://www.dazhuanlan.com/2019/11/30/5de14b1b3aa97/)
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
                //由于海南地图包括南海及南海诸岛在内的大片区域，所以显示海南地图时，要将地图放大，并设置海南岛居中显示
                if (cityName === '460000') { 
                  this.option.series[0].center = [109.844902, 19.0392];//中心位置
                  this.option.series[0].layoutCenter = ['50%', '40%'];//地图相对容器偏移
                  this.option.series[0].layoutSize = "600%";//地图放大比例

                } else { //非显示海南时，将设置的参数恢复默认值
                  this.option.series[0].center = undefined;
                  this.option.series[0].layoutCenter = undefined;
                  this.option.series[0].layoutSize = undefined;

                  this.option.regions = [{
                    name: '南海诸岛', 
                    value: 0, 
                    itemStyle: 
                        {normal: 
                            {opacity: 0,
                            label: {
                                show: false
                            }
                        }
                    }
                  }]
                }
              });
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    mapClick(params) {
      const obj = this.option.series[0].data.find(
        item => item.child_area_name === params.name
      );
      if (obj) {
        this.dialogTitle = obj.child_area_name + this.$i18ns('digitalScreen.service_data');
        this.dialogTopValue = obj.child_attribute1.toString(); //顶部栏位数值
        this.dialogMiddleValue = obj.child_attribute2.toString(); //中部栏位数值
        this.dialogBottomValue = obj.child_attribute3.toString(); //底部栏位数值
        // this.dialogPieValue = params.data; //饼图部栏位数值
        // this.dialogPieChartValue = params.data; //饼图部栏位echart数值 int
        this.showDialog();
        return;
      }
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
        servicecode: this.servicecode,
        busi_type: this.productCode, //接口查询产品编码
        area_code: this.areaCode //接口查询区域编码
      };

      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
        if (response.code === "200") {
          this.mapData = [];
          let loanBal = 0;
          let day_increase = 0.0;
          let year_increase = 0.0;

          loanBal = loanBal + Number(response.data.mapInfo.attribute1);
          day_increase =
            day_increase + Number(response.data.mapInfo.attribute2);
          year_increase =
            year_increase + Number(response.data.mapInfo.attribute3);
          for (const child of response.data.mapInfo.childList) {
            this.mapData.push({
              child_attribute1: Number(child.child_attribute1),
              child_attribute2: Number(child.child_attribute2),
              child_attribute3: Number(child.child_attribute3),
              child_area1: child.child_area1,
              child_area2: child.child_area2,
              child_area3: child.child_area3,
              child_area_code: child.child_area_code,
              child_area_name: child.child_area_name,
              name: child.child_area_name,
              value: Number(child.child_attribute1)
            });
          }
          this.topLeftValue = loanBal.toFixed(2);
          this.topMiddleValue = day_increase.toFixed(2);
          this.topRightValue = year_increase.toFixed(2);

          let obj = {
            attribute1: response.data.mapInfo.attribute1,
            attribute2: response.data.mapInfo.attribute2,
            attribute3: response.data.mapInfo.attribute3
          };
          // 缓存区域一二三属性值，卡片新增或编辑时返显
          this.$store.commit("SET_MAPTOP_DATA", obj);

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
  left: 5%;
  top: 20%;
}
.vertical-info-top {
  position: absolute;
  width: 20%;
  right: 2%;
  top: 10%;
}
.vertical-info-down {
  position: absolute;
  width: 20%;
  right: 2%;
  top: 50%;
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
