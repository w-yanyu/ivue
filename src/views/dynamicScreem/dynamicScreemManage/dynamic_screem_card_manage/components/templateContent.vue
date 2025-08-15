<template>
  <div class="big-screen-container" id="big-screen-container" ref="bigScreen">
    
    <div>
      <titleBar
        titleName="住房贷款实施战况"
        @clickFullscreen="clickFullscreen"
        @refreshRateChange="refreshRateChange"
        @changeEditState="changeEditState"
        :isEditState="isEditState"
      ></titleBar>
      <layoutContent :isEditState="isEditState" ref="layoutContent"></layoutContent>
    </div>
  </div>
</template>

<script>
import fullscreen from "screenfull";
import titleBar from "./titleBar.vue";
import layoutContent from "./cardContent.vue";

export default {
  name: "largeScreen",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对
  },
  components: {
    titleBar,
    layoutContent
  },
  data() {
    return {
      isEditState: false, //是否属于编辑状态
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
      scaleTime: null // 定时任务
    };
  },
  watch: {
    // 监听窗口宽度变化时触发
    screenWidth() {
      this.isinit = true;
      // resize()重新绘制
      // this.$refs.bigS1.chartsResize();
      // this.$refs.bigS2.chartsResize();
      console.log(
        `页面的宽==${this.screenWidth}  页面的高度==${this.screenHeight}`
      );
    },
    // 监听窗口高度变化时触发
    screenHeight() {
      this.isinit = true;
      // resize()重新绘制
      // this.$refs.bigS1.chartsResize();
      // this.$refs.bigS2.chartsResize();
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
  created() {},
  mounted() {
    let that = this;
    //添加F11全屏案件监听
    window.addEventListener("keydown", that.KeyDown, true);
    window.addEventListener("resize", this.resize);
    this.$message({
      type: "info",
      message: "请双击标题或按键F10进行全屏切换"
    });
  },
  beforeDestroy() {
    let that = this;
    window.removeEventListener("resize", this.resize);
    window.removeEventListener("keydown", that.KeyDown);
    //销毁定时任务
    this.timerDestroy();
  },
  methods: {
    // 屏幕大小改变更新倍数
    resize() {
      let that = this;
      window.screenWidth = document.body.clientWidth;
      that.screenWidth = window.screenWidth;
      window.screenHeight = document.body.clientHeight;
      that.screenHeight = window.screenHeight;
      that.checkFull();
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
        this.isEditState =false;//退出编辑状态
        // this.$forceUpdate();
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
  
    //刷新数据频率改变
    refreshRateChange(refreshRateValue) {
      console.log("刷新数据频率改变", refreshRateValue);
      let time = 0;
      switch (refreshRateValue) {
        //不刷新
        case "never":
          this.timerDestroy();
          break;
        //半小时
        case "half":
          time = 30 * 60 * 1000;
          this.timerStart(time);
          break;
        //1小时
        case "hour":
          time = 60 * 60 * 1000;
          this.timerStart(time);
          break;
      }
    },
    //定时任务启动
    timerStart(time) {
      this.timerDestroy();
      //全局发送bus通知各个chart刷新数据
      this.timer = setInterval(this.$bus.emit("refreshRateData"), time);
    },
    // 销毁定时器
    timerDestroy() {
      if (this.timer) clearInterval(this.timer);
    },
    changeEditState() {
      this.isEditState = !this.isEditState;
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
  width: 100%;
  height: 100%;
  background-color: rgb(11, 8, 53);
  box-shadow: 0px 2px 5px rgba(18, 32, 231, 0.788);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
