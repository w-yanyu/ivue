
<template>
  <div class="pop-blow-up" id="bigEcharts" ref="bigEcharts">
    <!-- 遮罩层 -->
    <div class="pop-blow-up-mask" @click="hiddlePop"></div>
    <dv-border-box-13  class="pop-blow-up-background">

      <div class="pop-blow-up-title">
        <div>
          {{ titleName }}
          <span
            style="font-size: 12px; color: #37aeff; margin-left: 14px"
            >{{ unitName }}</span
          >
         
        </div>
        <div @click="hiddlePop" class="close-btn" ><i class="el-icon-circle-close"></i></div>
      </div>
      <div
       ref="blowUpChart"
       class="blow-up-chart"
        v-if="option"
      ></div>
    </dv-border-box-13>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  props: {
    titleName:{
      type:String,
      default:'',
    },
    unitName:{
      type:String,
      default:'',
    },
    option:Object
  },
  components: {},
  data() {
    return {
      blowUpChart:null,
    };
  },
  mounted() {
    // 解决transform影响fix定位问题，将元素提到body层
    // document.getElementById("layoutBox").appendChild(document.getElementById('bigEcharts'))
    document.body.appendChild(this.$refs['bigEcharts'])
    this.darwChart()
},
  methods: {
    //绘画charts
    darwChart(){
      this.blowUpChart = echarts.init(this.$refs.blowUpChart);
       // 绘制图表
       this.blowUpChart .setOption(this.option);

    },
    //刷新chart
    resize() {
      if (this.blowUpChart) this.blowUpChart.resize();
    },
    //关闭放大窗口
    hiddlePop(){
      this.$emit('hiddlePop')
    }
   
  },
 
};
</script>
<style scoped>
.pop-blow-up {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
}
.pop-blow-up-mask {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 900;
  width: 100vw;
  height: 100vh;
  /* opacity: 0.77;
  background: #0d2964; */
  background: rgba(13, 41, 100, 0.6);
}
.pop-blow-up-background {
  background: rgba(13, 41, 100, 0.8);
  position: relative;
  z-index: 900;
  opacity: 1 !important;
  margin-left: 15%;
  margin-top: 5%;
  height: 71%;
  background-size: 100% auto;
  width: 70%
}
.title {
  position: relative;
}
.pop-blow-up-title{
  position: absolute;
  display: flex;
  justify-content: space-between;
  padding-left: 3%;
  padding-top: 2%;
  color: #ffffff;
  font-size: 18px;
  top: 15px;
  width: 94%;
  z-index: 1000;
}
.close-btn{
  cursor: pointer;
}
.blow-up-chart{
  width: 100%;
  height: 100%
}
</style>
