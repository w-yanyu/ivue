<template>
  <div class="limit-content">
    <!--授信额度 -->
    <div class="charts-line" id="traffic_trend"></div>
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
    this.drawLineTrafficTrend();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.eventListenerFUn());
  },
  methods: {
    //折线图授信额度
    drawLineTrafficTrend() {
      let TrafficTrendDom = document.getElementById("traffic_trend");
      this.TrafficTrendChart = echarts.init(TrafficTrendDom);

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
          data: ['累计流量（笔）', '处理速度（笔/小时）']
        },
        grid: {},
        toolbox: {},
        xAxis: {
          type: "category",
          name: "小时",
          data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24'],
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
            name: '累计流量（笔）',
            type: 'line',
            stack: 'Total',
            data: ['31', '56', '56', '56', '56', '67', '99','169','267','372','475','527','578','761','928','1091','1112','1129','1159','1180','1207','1218','1225','1228']
            },
            {
            name: '处理速度（笔/小时）',
            type: 'line',
            stack: 'Total',
            data: ['31', '25', '0', '0', '0', '11', '32','70','98','105','103','52','51','183','167','163','21','17','30','21','27','11','7','3']
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
      option && this.TrafficTrendChart.setOption(option);
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
