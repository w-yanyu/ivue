<template>
  <div class="big-screen">
    <titleBar titleName= '住房贷款实施战况' @clickFullscreen="clickFullscreen" @refreshRateChange="refreshRateChange" ></titleBar>
    
 <!--左中右布局 用的element的layout布局 -->
 <el-row class="table-content">
  <el-col :span="7"><!-- 左边 -->
   
     <div class="itm"><!-- 左边的数据框 上中下一共三个 里面准备塞echars组件 -->
      <dv-border-box-10>
        <incomingTrendStackedLine ref="loanApplyStackedLine" :titleName="$i18ns('dpksh.title1')" :unitName="$i18ns('dpksh.unit1')" :chartData="incomingTrendLineData"/>
      </dv-border-box-10>
     </div> 
     <div class="itm">
      <dv-border-box-10>
        <loanRepayStackedLineChart ref="loanRepayStackedLineChart" :titleName="$i18ns('dpksh.title2')" :unitName="$i18ns('dpksh.unit2')" :chartData="loanRepayStackedLineData"/>
      </dv-border-box-10>
    </div> 
    <div class="itm">
      <dv-border-box-10>  
        <technologicalProcessChart ref="technologicalProcessChart" :titleName="$i18ns('dpksh.title3')" :unitName="$i18ns('dpksh.unit1')" :chartData="technologicalProcessChartData"/>
      </dv-border-box-10>
    </div> 

     
</el-col>

  <el-col :span="10">

<worldMap ref="worldMap"></worldMap>
  </el-col><!-- 中间 -->

  <el-col :span="7"><!-- 右边 -->
     
        <div class="itm">
          <dv-border-box-10>
            <incomingPartsChart ref="IncomingPartsChart" :titleName="$i18ns('dpksh.title4')" :unitName="$i18ns('dpksh.unit2')" :chartData="incomingPartsChartData"/>
          </dv-border-box-10>
        </div> 
        <div class="itm">
          <dv-border-box-10>
            <launchRecyclingChart ref="launchRecyclingChart" :titleName="$i18ns('dpksh.title5')" :unitName="$i18ns('dpksh.unit2')" :chartData="launchRecyclingChartData"/>
          </dv-border-box-10>
        </div> 
        <div class="itm">
          <dv-border-box-10>
            <messagePushChart ref="messagePushChart" :titleName="$i18ns('dpksh.title6')"  :chartData="messagePushChart"/>
          </dv-border-box-10>
        </div> 
     
</el-col>
</el-row>
</div>
</template>

<script>
import titleBar from "./components/titleBar.vue";
import worldMap from './components/bigMap.vue';
//当日贷款进件趋势
import incomingTrendStackedLine from './components/charts/incomingTrendStackedLine.vue';
//当日发放及还款趋势
import loanRepayStackedLineChart from './components/charts/loanRepayStackedLineChart.vue';
//当日流程中业务情况
import technologicalProcessChart from './components/charts/technologicalProcessChart.vue';
//当日各分行进件情况
import incomingPartsChart from './components/charts/incomingPartsChart.vue';
//当日各分行放款还款情况
import launchRecyclingChart from './components/charts/launchRecyclingChart.vue';
//智能点评推送
import messagePushChart from './components/charts/messagePushChart.vue';




export default {
  name: "bigS1",
  components: {
    titleBar,
    worldMap,
    incomingTrendStackedLine,
    loanRepayStackedLineChart,
    technologicalProcessChart,
    incomingPartsChart,
    launchRecyclingChart,
    messagePushChart,
  },
  data() {
      return {
        incomingTrendLineData:null,//当日贷款进件趋势chart图数据
        loanRepayStackedLineData:null,//当日放款及还款趋势chart图数据
        technologicalProcessChartData:null,//当日放款及还款趋势chart图数据
        incomingPartsChartData:null,//当日各分行进件情况chart图数据
        launchRecyclingChartData:null,//当日各分行放款还款情况chart图数据
        messagePushChart:null,//只能点评推送数据
      };   
    },
    mounted() {
   
    

    },
    methods: {
      //chart刷新
      chartsResize(){
        //地图刷新
        if(this.$refs.worldMap)
        this.$refs.worldMap.resize();
        //当日贷款进件趋势
        if(this.$refs.loanApplyStackedLine)
        this.$refs.loanApplyStackedLine.resize();
        //当日放款及还款趋势
        if(this.$refs.loanRepayStackedLineChart)
        this.$refs.loanRepayStackedLineChart.resize();
      //当日各分行放款还款情况
        if(this.$refs.launchRecyclingChart)
        this.$refs.launchRecyclingChart.resize();

      },
      clickFullscreen(){
      console.log("11111--双击显示全屏")
      this.$emit("clickFullscreen")
    },
    //刷新数据频率改变
    refreshRateChange(refreshRateValue){
      this.$emit('refreshRateChange',refreshRateValue)
    },
  }
}


</script>

<style css="less" scoped >
   
   .big-screen{
    display: flex;
    flex-direction: column;
    align-items: center;
   }
  .el-col {
    border-radius: 4px;
  }
 
  .bg-purple {
    background: blue;
    
  }
 
  .itm{
    height: 30vh;
    width: 100%;
    margin: 1vh 0  ;
   
  }
  .table-content{
    width: 99%;
    background:url('./components/assets/bg.png') 0 0 no-repeat; 
    background-size: 100% 100%;
  }
 

</style>