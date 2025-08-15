<template>
  <dv-border-box-11
    class="map-dialog-content"
    :title="dialogTitle"
    backgroundColor="rgba(0, 5, 61, 0.5)"
  >
    <div class="dialog-outside">
      <div class="dialog-content">
        <div class="info-title">
          {{ topTableTitle }} <span class="info-unit">{{ topTableUnit }}</span>
        </div>
        <div class="mapMiddleNumber">
          <p
            v-for="(item, index) in topTableValue"
            :key="index"
            :class="item !== '.' ? 'number-style' : 'dot-style'"
          >
            {{ item }}
          </p>
        </div>

        <div class="info-title">
          {{ middleTableTitle }} <span class="info-unit">{{ middleTableUnit }}</span>
        </div>
        <div class="mapMiddleNumber">
          <p
            v-for="(item, index) in middleTableValue"
            :key="index"
            :class="item !== '.' ? 'number-style' : 'dot-style'"
          >
            {{ item }}
          </p>
        </div>

        <div class="info-title">
           {{ bottomTableTitle }}<span class="info-unit">{{ bottomTableUnit }}</span>
        </div>
        <div class="mapMiddleNumber">
          <p
            v-for="(item, index) in bottomTableValue"
            :key="index"
            :class="item !== '.' ? 'number-style' : 'dot-style'"
          >
            {{ item }}
          </p>
        </div>

        <!-- <div class="info-title">
          {{ pieTableTitle }}
        </div>
        <p class="pie-value">{{ pieTableValue }} <span class="pie-unit">{{ pieTableUnit }}</span></p>
        <div class="finish-rate-pie">
          <div class="pie-div" ref="pie"></div>
        </div> -->
      </div>
    </div>
  </dv-border-box-11>
</template>
<script>
//地图弹出框
import echarts from "echarts";
import { Integer } from '../../us/specialManage/template';
export default {
  props: {
    //对话框标题
    dialogTitle:{
      type:String,
      require:true
    },
    //顶部栏位标题
    topTableTitle:{
      type:String,
      default () {
        return this.$i18ns('dpksh.dialog-title1')
      }
    },
    //顶部栏位单位
    topTableUnit:{
      type:String,
      default () {
        return this.$i18ns('dpksh.unit4')
      }
    },
    //顶部栏位值
    topTableValue:{
      type:String,
      default:"0.00"
    },
     //中部栏位标题
     middleTableTitle:{
      type:String,
      default () {
        return this.$i18ns('dpksh.dialog-title2')
      }
    },
    //中部栏位单位
    middleTableUnit:{
      type:String,
      default () {
        return this.$i18ns('dpksh.unit4')
      }
    },
    //中部栏位值
    middleTableValue:{
      type:String,
      default:"0.00"
    },
    //底部栏位标题
    bottomTableTitle:{
      type:String,
      default () {
        return this.$i18ns('dpksh.dialog-title3')
      }
    },
    //底部栏位单位
    bottomTableUnit:{
      type:String,
      default () {
        return this.$i18ns('dpksh.unit4')
      }
    },
    //底部栏位值
    bottomTableValue:{
      type:String,
      default:"0.00"
    },
    
    //饼图栏位标题
    pieTableTitle:{
      type:String,
      default:"当年贷款净增序时计划"
    },
    //饼图栏位单位
    pieTableUnit:{
      type:String,
      default:"亿元"
    },
     //饼图栏位值
    pieTableValue:{
      type:Integer,
      default:"0.0"
    },
    //饼图栏位饼状图的值 int值
    pieTablePieValue:{
      type:Integer,
      default:0
    },
  },
  components: {},
  data() {
    return {
      dialogTopValue: "12345.11",
      dialogMiddleValue: "2223.11",
      dialogBottomValue: "3331.00",
      pieChart: null
    };
  },
  mounted() {
    // this.drawPie() 
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
          borderColor: "rgba(55, 174, 255, 0.73)",
        
        },
//   legend: {
//       show:false,
//     top: '0%',
//     left: 'center'
//   },
  color: [{
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0.4,
                y2: 1,
                colorStops: [{
                    offset: 0,
                    color: '#0063FF' // 0% 处的颜色
                }, {
                    offset: 1,
                    color: '#00E3FF' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
            }, '#41557E'],
  series: [
    {
      name: '当年贷款净增序时计划',
      type: 'pie',
      radius: ['60%', '70%'],
      avoidLabelOverlap: false,
      label: {
        formatter: ['完成率\n \n{d}%'].join('\n'),
        textStyle: {
                  // 牵引线上的文字的样式
                  align: "right",
                  baseline: "middle",
                  fontFamily: "微软雅黑",
                  fontSize: 14,
                  fontWeight: "900",
                  color: "#fff",
                },
        position: 'center',   //让文字居中
        color:'#fff',
        rich:{
          a:{
            color:'red'
          }
        }
      },
      emphasis: {
        label: {
          show: false,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
      {
                    value: this.pieTablePieValue,
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
                    value: 100-this.pieTablePieValue,
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
.map-dialog-content {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  // box-shadow: 0px 1px 1px 0px rgba(61, 201, 255, 0.82) inset;
  color: #fff;
}
.dialog-outside {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.dialog-content {
  width: 90%;
  height: 85%;
  margin-top: 17%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.info-title {
  font-size: 18px;
  font-weight: 800;
}
.info-unit {
  font-size: 14px;
  line-height: 2vh;
  margin-left: 1vh;
}
.mapMiddleNumber {
  display: flex;
  width: 80%;
  align-items: center;
  justify-content: center;
}
.number-style {
  font-size: 36px;
  width: 2vw;
  background: linear-gradient(0deg, #9ed5ff, #025da3);
  border-radius: 4px;
  margin-left: 0.5vw;
  text-shadow: 0.5vw 0.5vw 0.5vw #147ac8;
  text-align: center;
}

.dot-style {
  font-size: 36px;
  text-align: center;
}
.pie-value {
  font-size: 24px;
  font-weight: 400;
}
.pie-unit {
  font-size: 12px;
  font-weight: 400;
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
