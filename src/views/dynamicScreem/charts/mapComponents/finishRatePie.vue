<!--
 * @Author: weisiyi weisiyi@sunline.cn
 * @Date: 2023-08-08 19:07:58
 * @LastEditors: weisiyi weisiyi@sunline.cn
 * @LastEditTime: 2023-11-20 19:27:36
 * @FilePath: /ivue/src/views/dynamicScreem/charts/mapComponents/finishRatePie.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="finish-rate-content">
    <div class="finish-rate-title">{{ categoryTitle }}</div>
    <div class="finish-rate-value">
      <p class="value-style">
        <span>{{ displayNumber }} </span>
        <span class="unit-style"> {{ categoryUnit }}</span>
      </p>
    </div>

    <!-- <div class="finish-rate-pie">
      <comEchart
        :option="option"
        :divObj="divObj"
        style="width: 100%; height: 100%"
      />
    </div> -->
  </div>
</template>
<script>
import { Integer } from "../../../us/specialManage/template";
//完成率饼状图
import comEchart from "../echartBase";
export default {
  props: {
    //需要显示的数字
    displayNumber: {
      type: String,
      require: true
    },
    //标题栏位
    categoryTitle: {
      type: String,
      require: true
    },
    //数据单位
    categoryUnit: {
      type: String,
      require: true
    },
    divObj: {
      type: Object,
      default: null
    }
  },
  components: { comEchart },
  data() {
    return {
      option: {
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
            data: [
              {
                value: 20,
                name: "",
                itemStyle: {
                  normal: {
                    //外环发光
                    borderWidth: 0.5,
                    shadowBlur: 20,
                    borderColor: "#4bf3f9",
                    shadowColor: "#9bfeff",
                    color: {
                      // 圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: "#4bf3f9" // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#4bf3f9" // 100% 处的颜色
                        }
                      ]
                    }
                  }
                }
              },
              {
                value: 100 - 20,
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
              }
            ]
          }
        ]
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.finish-rate-content {
  width: 100%;
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
  height: 20%;
}
.finish-rate-value {
  height: 40%;
  line-height: 40%;
  text-align: center;
}
.value-style {
  font-size: 24px;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  line-height: 24px;
  margin: 10px 0;
}
.unit-style {
  font-size: 12px;
}
.finish-rate-pie {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
}
</style>
