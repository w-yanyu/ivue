<template>
  <dv-border-box-8 class="finish-rate-content" dur="4">
    <div class="finish-rate-title">{{ compTitle }}</div>
    <div class="finish-rate-value">
      <p class="value-style">{{ compValue }} <span class="unit-style"> {{ compUnit }}</span></p>
    </div>

    <div class="finish-rate-pie">
      <div class="pie-div" ref="pie"></div>

    </div>
  </dv-border-box-8>
</template>
<script>
//完成率饼状图
import echarts from "echarts";
import { Integer } from '../../us/specialManage/template';
export default {
  props: {
    //饼状图显示数值 int类型
    pieShowValue:{
      type:Integer,
      require:true
    },
    //标题
    compTitle:{
      type:String,
      require:true
    },
    //显示数值
    compValue:{
      type:String,
      require:true
    },
    //显示的单位
    compUnit:{
      type:String,
      require:true
    }
  },
  components: {},
  data() {
    return {
      pieChart: null
    };
  },
  mounted() {
    this.drawPie();
  },
  methods: {
    drawPie() {
      this.pieChart = echarts.init(this.$refs.pie);
      let showValue =this.pieShowValue; //图上角度数据
      let option = {
        tooltip: {
          trigger: "axis",
          backgroundColor: "#00053D",
          extraCssText:
            "box-shadow: 0px 1px 31px 0px rgba(55, 174, 255, 0.55) inset",
          color: "#fff",
          borderColor: "rgba(55, 174, 255, 0.73)"
        },
        //   legend: {
        //       show:false,
        //     top: '0%',
        //     left: 'center'
        //   },
        color: [
          {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0.4,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#0063FF" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#00E3FF" // 100% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          },
          "#41557E"
        ],
        series: [
          {
            name: "当年贷款净增序时计划",
            type: "pie",
            radius: ["60%", "70%"],
            avoidLabelOverlap: false,
            label: {
              formatter: ["完成率\n \n{d}%"].join("\n"),
              textStyle: {
                // 牵引线上的文字的样式
                align: "right",
                baseline: "middle",
                fontFamily: "微软雅黑",
                fontSize: 14,
                fontWeight: "900",
                color: "#fff"
              },
              position: "center", //让文字居中
              color: "#fff",
              rich: {
                a: {
                  color: "red"
                }
              }
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "40",
                fontWeight: "bold"
              }
            },
            labelLine: {
              show: false
            },
            data: [ {
                    value: showValue,
                    name: "",
                    itemStyle: {
                        normal: {
                            //外环发光
                            borderWidth: 0.5,
                            shadowBlur: 20,
                            borderColor: '#4bf3f9',
                            shadowColor: '#9bfeff',
                            color: { // 圆环的颜色
                                colorStops: [{
                                    offset: 0,
                                    color: '#4bf3f9', // 0% 处的颜色
                                }, {
                                    offset: 1,
                                    color: '#4bf3f9', // 100% 处的颜色
                                }]
                            },
                        }
                    }
                },
                {
                    value: 100-showValue,
                    name: "",
                    label: {
                        normal: {
                            show: false
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: "#173164"
                        }
                    }
                }]
          }
        ]
      };
      this.pieChart.setOption(option);
    },
    //饼状图刷新
    resize() {
      if (this.pieChart) {
        this.pieChart.resize();
      }
    }
  }
};
</script>
<style lang="less" scoped>
.finish-rate-content {
  width: 9vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  z-index: 100;
  height: auto;
  background: rgba(0, 5, 61, 0.5);
  border: 1px solid #29c3ff;
  box-shadow: 0px 1px 22px 0px rgba(61, 201, 255, 0.82) inset;
}
.finish-rate-title {
  margin-top: 10%;
  text-align: center;
  font-size: 12px;
  height: 2vh;
}
.finish-rate-value {
  height: 5vh;
  line-height: 5vh;
  text-align: center;
}
.value-style {
  font-size: 24px;
  font-weight: 800;
}
.unit-style {
  font-size: 12px;
}
.finish-rate-pie {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.pie-div {
  margin-top: -10%;
  width: 10vw;
  height: 10vw;
}
</style>
