<template>
  <div class="large-screen" ref="largeScreen" id="largeScreen">
    <div class="title">
      统一额度管控平台数字大屏
      <div class="screen-btn">
        <i class="el-icon-rank" @click="screen"></i>
      </div>
    </div>
    <div class="big-content">
      <div class="left-content">
        <leftAside :pageData="pageData" ref="leftAside"></leftAside>
      </div>
      <div class="middle-content">
        <middleMain :pageData="pageData"></middleMain>
      </div>
      <div class="right-content">
        <rightContent :pageData="pageData"></rightContent>
      </div>
    </div>
  </div>
</template>
<script>
import fullscreen from "screenfull";
import leftAside from "./components/leftAside";
import middleMain from "./components/middleMain";
import rightContent from "./components/rightContent";
// import ScaleBox from "vue2-scale-box";

export default {
  name: "largeScreen",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对
  },
  components: {
    leftAside,
    // ScaleBox,
    middleMain,
    rightContent
  },
  data() {
    return {
      screenWidth:
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth,
      screenHeight:
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight,
      isinit: false, // 是否已初始化过
      scale: {
        width: "1",
        height: "1"
      },
      scaleTime: null, // 定时任务
      baseWidth: 1920, // 设计稿尺寸
      baseHeight: 1080, // 设计稿尺寸
      baseProportion: 0, // 比例
      //页面数据
      pageData: {
        credit_total_amt: "0", //授信总额
        used_total_amt: "0", //用信总额
        tranCountTotal: "0"
      }
    };
  },
  watch: {
    // 监听窗口宽度变化时触发
    screenWidth() {
      this.isinit = true;
      // resize()重新绘制
      this.$refs.leftAside.chartsResize();
      console.log(
        `页面的宽==${this.screenWidth}  页面的高度==${this.screenHeight}`
      );
    },
    // 监听窗口高度变化时触发
    screenHeight() {
      this.isinit = true;
      // resize()重新绘制
      this.$refs.leftAside.chartsResize();
      console.log(
        `页面的宽==${this.screenWidth}  页面的高度==${this.screenHeight}`
      );
    }
  },
  created() {
    // window.onresize = () => {
    //   //调用判断全屏的方法，用来监听
    //   this.checkFull();
    // };
    this.baseProportion = parseFloat(
      (this.baseWidth / this.baseHeight).toFixed(2)
    );
  },
  mounted() {
    let that = this;
    window.addEventListener("resize", () => {
      window.screenWidth = document.body.clientWidth;
      that.screenWidth = window.screenWidth;
      window.screenHeight = document.body.clientHeight;
      that.screenHeight = window.screenHeight;
    });
    this.calcRate();
    this.fun();
    this.getPageData();
  },
  beforeDestroy() {
    let that = this;
    window.removeEventListener("resize", this.resize);
  },
  methods: {
    fun() {
      let that = this;
      let htmlobj = document.getElementsByTagName("html")[0];
      // htmlobj.style.fontSize = (that.screenWidth / 1920) * 20 + "px";
      console.log("拿到的基础字体", htmlobj.style.fontSize);
      console.log(
        `页面的宽==${this.screenWidth}  页面的高度==${this.screenHeight}`
      );
    },
    // 屏幕大小改变更新倍数
    resize() {
      window.screenWidth = document.body.clientWidth;
      that.screenWidth = window.screenWidth;
      window.screenHeight = document.body.clientHeight;
      that.screenHeight = window.screenHeight;
      clearTimeout(this.scaleTime);
      this.scaleTime = setTimeout(() => {
        this.calcRate();
      }, 0);
    },
    // 计算放大倍数
    calcRate() {
      const contentRef = this.$refs.largeScreen;
      if (!contentRef) return;
      // 当前宽高比
      const currentRate = parseFloat(
        (window.innerWidth / window.innerHeight).toFixed(2)
      );
      if (currentRate > this.baseProportion) {
        // 表示更宽
        this.scale.width = (
          (window.innerHeight * this.baseProportion) /
          this.baseWidth
        ).toFixed(2);
        this.scale.height = (window.innerHeight / this.baseHeight).toFixed(2);
        contentRef.style.transform = `scale(${this.scale.width}, ${
          this.scale.height
        }) translate(-50%, -50%)`;
      } else {
        // 表示更高
        this.scale.height = (
          window.innerWidth /
          this.baseProportion /
          this.baseHeight
        ).toFixed(2);
        this.scale.width = (window.innerWidth / this.baseWidth).toFixed(2);
        contentRef.style.transform = `scale(${this.scale.width}, ${
          this.scale.height
        }) translate(-50%, -50%)`;
      }
    },
    //全屏显示方法
    screen() {
      let element = document.getElementById("largeScreen"); //指定全屏区域元素
      fullscreen.toggle(element); //全屏显示
    },
    //获取页面数据
    getPageData() {
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: "uccp4002",
        start_date: "",
        end_date: ""
      };

      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
        if (response.code === "200") {
          console.log("获取数字大屏数据", response.data);
          this.pageData = response.data;
          //交易笔数统计
          let tranCountTotal = 0; //交易笔数总数计算
          let tranCountData = []; //echarts图表数据
          if (this.pageData.tranCountList.length > 0) {
            for (const item of this.pageData.tranCountList) {
              tranCountTotal = tranCountTotal + item.tran_count;
              tranCountData.push((item.tran_count * 0.1).toString());
            }
          }
          this.pageData["tranCountTotal"] = tranCountTotal;
          this.pageData["tranCountData"] = tranCountData;

          //访问量统计
          let visitCountTotal = 0;
          let visitCountXAxis = []; //echartsX轴数据
          let visitCountData = []; //echarts渲染数据
          if (this.pageData.visitCountList.length > 0) {
            for (const item of this.pageData.visitCountList) {
              visitCountTotal = visitCountTotal + item.visit_count;
              visitCountXAxis.push(item.data_dt);
              visitCountData.push(item.visit_count);
            }
            this.pageData[
              "visitCountDay"
            ] = this.pageData.visitCountList[0].visit_count;
          }
          this.pageData["visitCountTotal"] = visitCountTotal;
          this.pageData["visitCountXAxis"] = visitCountXAxis;
          this.pageData["visitCountData"] = visitCountData;

          //格式化百分号数据
          this.pageData.credit_total_amt_day_rate = this.FormPercentData(
            this.pageData.credit_total_amt_day_rate
          );
          this.pageData.credit_total_amt_week_rate = this.FormPercentData(
            this.pageData.credit_total_amt_week_rate
          );
          this.pageData.use_appv_rate = this.FormPercentData(
            this.pageData.use_appv_rate
          );
          this.pageData.use_appv_rate_day_rate = this.FormPercentData(
            this.pageData.use_appv_rate_day_rate
          );
          this.pageData.use_appv_rate_week_rate = this.FormPercentData(
            this.pageData.use_appv_rate_week_rate
          );
          this.pageData.used_total_amt_day_rate = this.FormPercentData(
            this.pageData.used_total_amt_day_rate
          );
          this.pageData.used_total_amt_rate = this.FormPercentData(
            this.pageData.used_total_amt_rate
          );
          this.pageData.used_total_amt_week_rate = this.FormPercentData(
            this.pageData.used_total_amt_week_rate
          );
          this.pageData.year_complete_rate = this.FormPercentData(
            this.pageData.year_complete_rate
          );

          console.log("获取数字大屏数据---------", this.pageData);
          // this.$refs.leftAside.drawCharts();
        } else {
          MyMessage({ message: response.message, type: "error" });
        }
      });
    },
    //格式化百分号数据
    FormPercentData(str) {
      let result = 0;
      if (str) {
        let num = Number(str); //将字符串转换为Number类型
        result = num.toFixed(2); //将Number类型转换为保留两位数的字符串数据
      }
      return result.toString();
    }
  }
};
</script>
<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}
body {
  overflow: hidden;
}
.screen-box {
  background: #fff !important;
}
.screen-wrapper {
  margin: 0 !important;
}
.large-screen {
  // width: 100vw;
  // height: 100vh;
  background-color: #fff;
  position: relative;
  width: 1920px;
  height: 900px;
  // position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: left top;
}
.title {
  width: 100%;
  text-align: center;
  font-family: "PingFangSC-Semibold";
  font-size: 0.3rem;
  font-weight: bolder;
  font-style: normal;
  margin: 0.0625rem 0;
  position: relative;
}
.screen-btn {
  position: absolute;
  right: 30vw;
  top: 0vh;
  font-size: 0.25rem;
  color: #368ee0;
  cursor: pointer;
}
.big-content {
  width: 100%;
  height: calc(100vh - 0px);
  display: flex;
  align-items: center;
}
.left-content {
  flex: 1.5;
  height: 100%;
  // background-color: rgb(150, 214, 214);
  display: flex;
  justify-content: center;
}
.middle-content {
  flex: 5;
  height: 100%;
  // background-color: rgb(136, 170, 208);
}
.right-content {
  flex: 3;
  height: 100%;
  // background-color: rgb(211, 82, 112);
}
</style>
