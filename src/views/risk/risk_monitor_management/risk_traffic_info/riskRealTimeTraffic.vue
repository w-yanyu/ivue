<template>
  <div class="limit-content">
    <!--授信额度 -->
    <div class="charts-line" id="real_time_traffic"></div>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "RealTimeTraffic",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  components: {},
  data() {
    return {};
  },
  created() {
    // console.log('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
  },
  mounted() {
    this.drawLineRealTimeTraffic();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.eventListenerFUn());
  },
  methods: {
    //折线图授信额度
    drawLineRealTimeTraffic() {
      let RealTimeTrafficDom = document.getElementById("real_time_traffic");
      this.RealTimeTrafficChart = echarts.init(RealTimeTrafficDom);

      let option = {
        title: {
          text: "",
          left: "center"
        },
        tooltip: {
          trigger: "axis",
          //   backgroundColor: "#FFFFFF", // 修改背景颜色
          //   borderColor: "#F3F3F3", // 修改边框颜色
          //   color:"#000000"
          // formatter: "{b0}<br/> {a0}:{c0} <br/>{a1}:{c1} <br/>{a2}:{c2}"  
        },
        legend: {
          top: "bottom",
          data: ['未处理笔数', '处理速度（笔/分钟）']
        },
        grid: {},
        toolbox: {},
        xAxis: {
          type: "category",
          name: "分钟",
          data: ['0', '5', '15', '20', '25', '30', '35','40','45','50','55','60'],
          axisPointer: {
              type: "shadow",
          }
        },
        yAxis: {
          type: "value",
          name: "笔数",
        },
        series: [
          {
            name: '未处理笔数',
            type: 'line',
            stack: 'Total',
            data: ['21', '33', '20', '5', '5', '13', '56','53','76','89','73','50']
            },
            {
            name: '处理速度（笔/分钟）',
            type: 'line',
            stack: 'Total',
            data: ['10', '18', '12', '11', '18', '20', '5','17','18','13','13','19']
            }
        ],
        color: [
          "rgb(150,214,214)",
          "rgb(136,170,208)",
          "rgb(211,82,112)",
          "rgb(246,166,107)",
          "rgb(241,122,186)"
        ]
      };
      option && this.RealTimeTrafficChart.setOption(option);
    },
    beforeDestroy() {
      if (this.timer) {
        //如果定时器还在运行 或者直接关闭，不用判断
        clearInterval(this.timer); //关闭
      }
    }
  }
};
</script>
<style lang="less" scoped>
.limit-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  overflow: hidden;
  overflow-y: scroll;
}
.pie-table {
  margin-top: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  height: 350px;
}
.pie-select {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
}
.charts-pie {
  flex: 1;
  height: 350px;
}
.charts-line {
  margin-top: 30px;
  width: 100%;
  height: 300px;
}
.Fade-enter,
.Fade-leave-to {
  opacity: 0;
  transform: translateX(150%);
}
.Fade-enter-to,
.Fade-leave {
  opacity: 1;
  transform: translateX(0%);
}

.Fade-enter-active,
.Fade-leave-active {
  transition: all 0.5s;
}
</style>
