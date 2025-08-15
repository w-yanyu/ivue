<template>
  <div class="big-screen-container" id="big-screen-container">
    <div v-if="show_big">
      <dv-full-screen-container style="background-color: rgb(11, 8, 53);">
        <!-- 主屏四块儿走马灯轮播 -->
        <el-carousel
          :interval="false"
          arrow="never"
          indicator-position="none"
          height="100vh"
          width="100vw"
          ref="largeScreen"
        >
          <!-- 第一块 -->
          <el-carousel-item>
            <bigS1
              ref="bigS1"
              @clickFullscreen="clickFullscreen"
              @refreshRateChange="refreshRateChange"
            ></bigS1>
          </el-carousel-item>

          <!-- 第二块 -->
          <!-- <el-carousel-item>
            <bigS2></bigS2>
          </el-carousel-item> -->

          <!-- 第三块 -->
          <!-- <el-carousel-item>
            <bigS3></bigS3>
          </el-carousel-item> -->

        </el-carousel>
      </dv-full-screen-container>
    </div>
    <div v-else>
      <!-- 主屏四块儿走马灯轮播 -->
      <el-carousel
        :interval="false"
        arrow="never"
        indicator-position="none"
        height="100vh"
      >
        <!-- 第一块 -->
        <el-carousel-item>
          <bigS1
            ref="bigS1"
            @clickFullscreen="clickFullscreen"
            @refreshRateChange="refreshRateChange"
          ></bigS1>
        </el-carousel-item>

        <!-- 第二块 -->
        <!-- <el-carousel-item>
          <bigS2></bigS2>
        </el-carousel-item> -->

        <!-- 第三块 -->
        <!-- <el-carousel-item>
          <bigS3></bigS3>
        </el-carousel-item> -->

      </el-carousel>
    </div>
  </div>
</template>

<script>
import fullscreen from "screenfull";
import bigS1 from "./bigS1.vue";
import bigS2 from "./bigS2.vue";
import bigS3 from "./bigS3.vue";

export default {
  name: "largeScreen",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对
  },
  components: {
    bigS1,
    bigS2,
    bigS3
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
      show_big: false, //控制显示全屏的布局还是小屏的布局
      fullscreenTag: false,
      scaleTime: null, // 定时任务
      baseWidth: 1920, // 设计稿尺寸
      baseHeight: 1080, // 设计稿尺寸
      baseProportion: 0 // 比例
    };
  },
  watch: {
    // 监听窗口宽度变化时触发
    screenWidth() {
      this.isinit = true;
      // resize()重新绘制
      this.$refs.bigS1.chartsResize();
      console.log(
        `页面的宽==${this.screenWidth}  页面的高度==${this.screenHeight}`
      );
    },
    // 监听窗口高度变化时触发
    screenHeight() {
      this.isinit = true;
      // resize()重新绘制
      this.$refs.bigS1.chartsResize();
      console.log(
        `页面的宽==${this.screenWidth}  页面的高度==${this.screenHeight}`
      );
    },
    fullscreenTag(newvalue, oldvalue) {
      if (newvalue != oldvalue) {
        // 进行退出全屏的后的事件
        console.log("退出全屏");
      }
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
    //添加F11全屏案件监听
    window.addEventListener("keydown", that.KeyDown, true);
    window.addEventListener("resize", () => {
      window.screenWidth = document.body.clientWidth;
      that.screenWidth = window.screenWidth;
      window.screenHeight = document.body.clientHeight;
      that.screenHeight = window.screenHeight;
      that.checkFull();
    });
    this.$message({
      type: "info",
      message: this.$i18ns('dpksh.full-screen')
    });
  },
  beforeDestroy() {
    let that = this;
    window.removeEventListener("resize", this.resize);
    //销毁定时任务
    this.timerDestroy()
  },
  methods: {
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
    },
    //F10切换全屏
    KeyDown(event) {
      //F10
      if (event.keyCode === 121) {
        event.returnValue = false;
        this.clickFullscreen(); // 触发全屏的按钮
      } else if (event.keyCode === 27) {
        event.returnValue = false;
        this.clickFullscreen(); // 触发全屏的按钮
      }
    },
    //全屏状态切换
    clickFullscreen() {
      if (fullscreen.enabled) {
        let element = document.getElementById("big-screen-container"); //指定全屏区域元素
        fullscreen.toggle(element); //全屏显示
        this.fullscreenTag = !this.fullscreenTag;
        this.show_big = !this.show_big;
        this.$forceUpdate();
        console.log(
          `fullscreenTag===${this.fullscreenTag}    show_big===${this.show_big}`
        );
      } else {
        this.$message({
          type: "warning",
          message: "您的浏览器不支持全屏"
        });
      }
    },
    //检查全屏状态
    checkFull() {
      const fullscreen = window.fullScreen || document.webkitIsFullScreen;
      this.fullscreenTag = fullscreen;
      return fullscreen;
    },
    //刷新数据频率改变
    refreshRateChange(refreshRateValue) {
      console.log('刷新数据频率改变',refreshRateValue)
      let time=0
      switch (refreshRateValue) {
        //不刷新
        case 'never':
        this.timerDestroy()
          break;
          //半小时
        case 'half':
          time=30*60*1000
          this.timerStart(time)
          break;
          //1小时
        case 'hour':
        time=60*60*1000
          this.timerStart(time)
          break;
      }
    },
    //定时任务启动
    timerStart(time) {
      this. timerDestroy()
      //全局发送bus通知各个chart刷新数据
      this.timer = setInterval(this.$bus.emit('refreshRateData'), time); 
    },
    // 销毁定时器
    timerDestroy() {
      if(this.timer)
      clearInterval(this.timer);
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
.big-screen-container {
  height: 100%;
  background-color: rgb(11, 8, 53);
  box-shadow: 0px 2px 5px rgba(18, 32, 231, 0.788);
}
.el-carousel__item h3 {
  color: #002b63;
  font-size: 18px;
  opacity: 0.75;
  height: 100%;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #002b63;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #002b63;
}
.el-carousel__container {
  position: relative;
  height: 100%;
}
</style>
