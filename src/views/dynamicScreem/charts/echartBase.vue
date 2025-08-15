<template>
  <div ref="echarts" class="echart"></div>
</template>

<script>
import * as echarts from "echarts";
// import object from "element-resize-detector/src/detection-strategy/object";

const elementResizeDetectorMaker = require("element-resize-detector");
let erd = elementResizeDetectorMaker();

export default {
  props: {
    option: Object,
    //地图点击事件
    mapClick: {
      type: Function,
      default: null
    },
    //是否在编辑状态
    isDraggable: {
      type: Boolean,
      default: false
    },
    //监听外框div，外框改变时刷新charts
    divObj:{
      type:Object,
      default:null,
    }
  },

  data() {
    return {
      myChart: null,
      myChartDom: null
    };
  },

  watch: {
    //监听charts数据改变进行刷新
    option: {
      handler(value) {
        console.log("设置option",value)
        if (!value) return;
        this.initEcharts();
      },
      immediate: true, // 立即处理 进入页面就触发
      deep: true //对象内部属性的监听，关键。
    }
  },
  mounted() {
    //接受屏幕尺寸改变的bus刷新chart大小
    this.$bus.on("chartResize", data => {
      this.chartResize();
    });
  },
  beforeDestroy() {
    if (!this.myChart) {
      return;
    }
    this.myChart.dispose();
    this.myChart = null;
  },
  methods: {
    //初始化charts
    initEcharts() {
      this.$nextTick(() => {
        if (this.myChart) this.myChart.dispose(); // 销毁
        this.myChartDom = this.$refs.echarts;
        // 初始化统计图
        this.myChart = echarts.init(this.myChartDom);
        this.myChart.setOption(this.option);
        //绑定地图点击事件
        if (this.mapClick) {
          this.myChart.on("click", this.mapClick);
        }
        //  使echarts尺寸重置
        this.myChart.resize();
          //绑定编辑状态下外框尺寸调整时刷新charts
          if(this.divObj)
        erd.listenTo(this.divObj, () => {
      
          this.$nextTick(function() {
            console.log("使echarts尺寸重置");
            //使echarts尺寸重置
            this.myChart.resize();
          });
        });
      });
    },
    //刷新chart
    chartResize() {
      if (this.myChart) this.myChart.resize();
    }
  }
};
</script>

<style lang="less" scoped>
.echart {
  width: 100%;
  height: 100%;
}
</style>
