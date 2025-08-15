<template>
  <div class="middle-main">
    <div class="chinaMap" id="chinaMap" ref="chinaMap"></div>
    <!-- 三个圆形进度条 -->
   
    <!-- 额度已使用比率 -->
  
     
  </div>
</template>
<script>
import echarts from "echarts";
import chianJson from "./chinaNanHai.json";
import china from "echarts/map/json/china.json";

// import backgroudImage from "./image64.js";

export default {
  name: "middleMain",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
    pageData: Object //数字大屏数据
  },
  components: {},
  data() {
    return {
      mapChart: null, //地图
      usedRatioChart: null, //额度已使用比例
      isinit: false, // 是否已初始化过
      screenWidth: document.body.clientWidth,
      screenHeight: document.body.clientHeight,
      dataList: [
        {
          name: "南海诸岛",
          value: 100,
          eventTotal: 100,
          specialImportant: 10,
          import: 10,
          compare: 10,
          common: 40,
          specail: 20
        },
        { name: '北京', value: 2154 },
                { name: '天津', value: 1560 },
                { name: '上海', value: 2424 },
                { name: '重庆', value: 3102 },
                { name: '河北', value: 7556 },
                { name: '河南', value: 9605 },
                { name: '云南', value: 4830 },
                { name: '辽宁', value: 4359 },
                { name: '黑龙江', value: 3773 },
                { name: '湖南', value: 6899 },
                { name: '安徽', value: 6324 },
                { name: '山东', value: 10047 },
                { name: '新疆', value: 2487 },
                { name: '江苏', value: 8051 },
                { name: '浙江', value: 5737 },
                { name: '江西', value: 4648 },
                { name: '湖北', value: 5971 },
                { name: '广西', value: 4926 },
                { name: '甘肃', value: 2637 },
                { name: '山西', value: 3718 },
                { name: '内蒙古', value: 2491 },
                { name: '陕西', value: 3864 },
                { name: '吉林', value: 2704 },
                { name: '福建', value: 3941 },
                { name: '贵州', value: 3600 },
                { name: '广东', value: 11346 },
                { name: '青海', value: 603 },
                { name: '西藏', value: 335 },
                { name: '四川', value: 8341 },
                { name: '宁夏', value: 688 },
                { name: '海南', value: 934 },
                { name: '台湾', value: 2359 },
                { name: '香港', value: 745 },
                { name: '澳门', value: 63 }
      ],
      backgroudImage:"",
    };
  },
  watch: {
    // 监听窗口宽度变化时触发
    screenWidth() {
      this.isinit = true;
      // resize()重新绘制
      this.usedRatioChart.resize();
      this.mapChart.resize();
    },
    // 监听窗口高度变化时触发
    screenHeight() {
      this.isinit = true;
      this.usedRatioChart.resize();
      this.mapChart.resize();
    }
  },
  created() {},
  mounted() {
    console.log("chinaJson", chianJson);
    console.log("china", china);
    let that = this;
    window.addEventListener("resize", () => {
      window.screenWidth = document.body.clientWidth;
      that.screenWidth = window.screenWidth;
      window.screenHeight = document.body.clientHeight;
      that.screenHeight = window.screenHeight;
    });
    this.$nextTick(() => {
      this.initEchartMap();
      this.drawUsedRatioCharts();
    });
  },
  beforeDestroy() {
    let that = this;
    window.removeEventListener("resize", () => {
      window.screenWidth = document.body.clientWidth;
      that.screenWidth = window.screenWidth;
      window.screenHeight = document.body.clientHeight;
      that.screenHeight = window.screenHeight;
    });
  },
  methods: {
    // 初始化地图
    initEchartMap() {
      echarts.registerMap("china", china); //这个特别重要
      // debugger
      // console.log("111111",this.$refs.chinaMap)
      let mapDom = document.getElementById("chinaMap");
      // this.myChart = echarts.init(this.$refs.chinaMap, null, {
      //   renderer: "svg"
      // });
      this.mapChart = echarts.init(mapDom, null, {
        renderer: "svg"
      });
      this.mapChart.off("click");
      //echart 配制option
      var options = {

        select: { // 地图选中区域样式
              label:{ // 选中区域的label(文字)样式
                color: '#fff'
              },
              itemStyle: {// 选中区域的默认样式
                areaColor: ''
              },
            },
         
        //地图配置
        
        geo: {
          map: "china",
          //调整以下3个配置项与页面地图重合
          // aspectScale: 1,			//echarts地图的长宽比（就是胖瘦）
          center: [104.29, 35.8], //设置可见中心坐标，以此坐标来放大和缩小
          zoom: 1.2, //放大级别
          scaleLimit: {
            min: 1,
            max: 50
          },
          roam: false,
            label: {
                  normal: {
                      show: true,
                      textStyle: {
                          color: 'rgba(249, 249, 249,1)',
                          fontSize:'16'
                      }

                  },
                  emphasis: {
                      show: true,
                      textStyle: {
                          color: '333'
                          
                      }
                  },
              },
          itemStyle: {
            normal: {
              areaColor: "#539eff",
              borderColor: "#104E8B",
              borderType: "dotted",
              borderWidth: 0.5
              // areaColor: '#24CFF4',
              // borderColor: '#53D9FF',
              // shadowBlur: 15,
              // shadowColor: 'rgb(58,115,192)',
              // shadowOffsetX: 1,
              // shadowOffsetY: 1,
            },
            emphasis: {
              areaColor: "#b3d4ff",
              borderWidth: 2, //设置外层边框
              borderColor: "#66ccff",
              borderType: "solid",
              shadowBlur: 3
            }
          },

          regions: [
            {
              name: "南海诸岛",
              value: 0,
              itemStyle: {
                normal: {
                  opacity: 0,
                  label: {
                    show: false
                  }
                }
              }
            }
          ]
        },
        series: [ 
        // {
        //     name: '人口数量',
        //     type: 'map',
        //     mapType: 'china',
        //     roam: false,//是否开启鼠标缩放和平移漫游
        //     itemStyle: {//地图区域的多边形 图形样式
        //         normal: {//是图形在默认状态下的样式
        //             label: {
        //                 show: true,//是否显示标签
        //                 textStyle: {
        //                     color: "rgb(249, 249, 249)"
        //                 }
        //             }
        //         },
        //         emphasis: {//是图形在高亮状态下的样式,比如在鼠标悬浮或者图例联动高亮时
        //             label: { show: true }
        //         }
        //     },}
         ]
        
      };
      this.mapChart.clear();
      this.mapChart.setOption(options);
      this.mapChart.resize();
      //地图的点击事件 ，钻取到市我就不举例了，类似的方法，点击事件可以获取到当前点击的省份的数据；
      this.mapChart.on("click", function(params) {
        console.log(params);
      });
    },
    //额度已使用比例
    drawUsedRatioCharts() {
      let value = [69.1];
      let usedRatioDom = document.getElementById("used-ratio-charts");
      this.usedRatioChart = echarts.init(usedRatioDom);
      let option = {
        grid: {
          top: "center",
          left: "32",
          right: "32"
        },
        xAxis: {
          show: false,
          type: "value",
          boundaryGap: [0, 0],
          max: 100
        },
        yAxis: {
          type: "category",
          axisTick: "none",
          axisLine: "none",
          show: true,
          position: "right",
          axisLabel: {
            show: false
          },
          data: value
        },
        series: [
          {
            // 合格表尺线
            type: "scatter",
            data: [80], //设置合格值
            label: "none",
            symbolSize: 0,
            itemStyle: {
              color: "#5B8FF9"
            },
            markPoint: {
              symbol: "rect",
              symbolSize: [2, 20],
              symbolOffset: [0, 0],
              label: {
                show: true
              },
              data: [{ type: "max" }]
            }
          },
          {
            data: value,
            type: "bar",
            name: "占比条",
            barWidth: 10,
            showBackground: true,
            backgroundStyle: {
              color: "#F1F1F1"
            },
            itemStyle: {
              color: "#5B8FF9"
            }
          }
        ]
      };
      option && this.usedRatioChart.setOption(option);
    },
    //客户剩余额度
    draCustAvalCharts() {
      // x轴数据
      let xdata = [];
      // 颜色
      let color = ["#5ef3ff", "#06a4f4"];
      let dealDom = document.getElementById("custAvalTotal");
      this.dealChart = echarts.init(dealDom);
      let option = {
        series: [
          {
            type: "liquidFill",
            radius: "45%",
            //水波
            color: [
              "#def2fe",
              "#b6e3fc",
              new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#72D1FB"
                },
                {
                  offset: 0.8,
                  color: "#43ABF7"
                }
              ])
            ],
            data: [0.5, 0.5, 0.5],
            center: ["50%", "50%"],
            label: {
              normal: {
                formatter: "50%",
                fontSize: 30,
                fontWeight: 400,
                color: "#72D1FB"
              }
            },
            itemStyle: {
              //opacity: 0.7, // 波浪的透明度
              shadowBlur: 0 // 波浪的阴影范围
            },
            emphasis: {
              itemStyle: {
                opacity: 0.8 // 鼠标经过波浪颜色的透明度
              }
            },
            outline: {
              borderDistance: 0,
              itemStyle: {
                borderWidth: 4,
                borderColor: "#ecebea",
                shadowBlur: 20
              }
            },
            backgroundStyle: {
              color: "#fff"
            }
          },
          {
            type: "pie",
            center: ["50%", "50%"],
            radius: ["50%", "51%"],
            hoverAnimation: false,
            borderCap: "round",
            data: [
              {
                name: "",
                value: 100,
                labelLine: {
                  show: false
                },
                itemStyle: {
                  normal: {
                    borderColor: new echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1,
                      [
                        {
                          offset: 0,
                          color: "#43ABF7"
                        },
                        {
                          offset: 1,
                          color: "#72D1FB"
                        }
                      ]
                    ),
                    borderWidth: 5
                  },
                  emphasis: {
                    borderColor: new echarts.graphic.LinearGradient(
                      0,
                      0,
                      0,
                      1,
                      [
                        {
                          offset: 0,
                          color: "#43ABF7"
                        },
                        {
                          offset: 1,
                          color: "#72D1FB"
                        }
                      ]
                    ),
                    borderWidth: 5
                  }
                },
                label: {
                  normal: {
                    show: true,
                    position: "center"
                  }
                }
              },

              {
                //画中间的图标
                name: "",
                value: 0,
                label: {
                  position: "inside",
                  backgroundColor: {
                    image: backgroudImage
                  },
                  shadowColor: "rgba(18, 64, 123, 0.38)",
                  shadowBlur: 8,
                  padding: 20,
                  distance: 50
                }
              },
              {
                //画剩余的刻度圆环
                name: "",
                value: 0,
                itemStyle: {
                  normal: {
                    color: "#ecebea"
                  },
                  emphasis: {
                    color: "#ecebea"
                  }
                },
                label: {
                  normal: {
                    show: true,
                    position: "center"
                  }
                },
                labelLine: {
                  normal: {
                    show: false
                  }
                }
              },
              {
                // 解决叠加明显的问题
                name: "",
                value: 0.2,
                itemStyle: {
                  color: "rgba(0,0,0,0)"
                }
              }
            ]
          }
        ]
      };
    
      option && this.dealChart.setOption(option);
    }
  }
};
</script>
<style lang="less" scoped>
.middle-main {
  width: 100%;
  height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-around;
  position: relative;
}
.chinaMap {
  width: 100%;
  height: 100%;
}
.circle-div {
  width: 40%;
  height: 100px;
  position: absolute;
  left: 0px;
  top: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.circle-div-item {
  flex: 0.95;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.circle-body {
  position: relative;
}
.circle-value {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: ArialMT;
  font-weight: 400;
}
.circle-title {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: PingFangSC-Semibold;
  font-weight: 650;
  font-style: normal;
  font-size: 10px;
}
.used-ratio {
  width: 30%;
  position: absolute;
  right: 20%;
  bottom: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.used-ratio-div {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.used-ratio-charts {
  width: 100%;
  height: 50px;
}
</style>
