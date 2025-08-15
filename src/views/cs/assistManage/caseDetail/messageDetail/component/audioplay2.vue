<template>
  <!-- 录音播放区域 -->
  <div>
    <el-card v-loading="loading" class="card">
      <div
        class="progress"
        ref="progress"
        @click="clickProgress"
        @mouseup="handleMouseup"
      >
        <div class="currentProgress" ref="currentProgress">
          <span class="circle" ref="circle" @mousedown="handleMousedown"></span>
        </div>
      </div>
      <div class="time">
        <span class="startTime">{{ currentDuration }}</span>
        <span class="endTime">{{ duration }}</span>
      </div>
      <div class="option">
        <span class="pre" @click="handleBack">
        <el-button type="primary" icon="el-icon-arrow-left">后退{{ backSecond }}s</el-button>
        </span>
        <span class="play" @click="handlePauseOrPlay">
            <el-button type="primary" icon="el-icon-video-pause" v-show="!paused" circle></el-button>
            <el-button type="primary" icon="el-icon-video-play"  v-show="paused" circle></el-button>
        </span>
        <span class="next" @click="handleForward">
          <el-button type="primary" icon="el-icon-arrow-right">前进{{ backSecond }}s</el-button>
        </span>
      </div>
    </el-card>
    <audio
      @canplay="getDuration"
      controls
      @timeupdate="updateTime"
      v-show="true"
      class="audio-table"
      ref="audio"
      :src="audioSrc"
    />
  </div>
</template>
<script>
export default {
  name: "index",
  props: {
    audioSrc: {
      type: String,
      default:
        null,
    },
    backSecond: {
      type: Number,
      default: 3,
    },
    forwardSecond: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      loading: true,
      duration: "00:00",
      currentDuration: "00:00",
      audio: this.$refs.audio,
      paused: true,
      isMoveIn: false, //是否在移动中
    };
  },
  watch: {
    audioSrc(newValue) {
      if (newValue !== null){
        this.loading = false
      }
      // if (newValue.length > 0){
      //   this.isShow = true;
      //    this.myAuto = new Audio(this.recordFile);
      // }
    },
  },
  methods: {
    //后退
    handleBack() {
      if (this.audio.currentTime > this.backSecond) {
        this.audio.currentTime = this.audio.currentTime - this.backSecond;
      }
    },
    //前进
    handleForward() {
      if (this.audio.duration - this.audio.currentTime > this.forwardSecond) {
        this.audio.currentTime = this.audio.currentTime + this.backSecond;
      }
    },
    //暂停或播放
    handlePauseOrPlay() {
        console.log('11111', this.$refs.audio)
      this.paused ? this.audio.play() : this.audio.pause();
      this.paused = !this.paused;
    },
    //视频在可以播放时触发
    getDuration() {
      this.duration = this.timeFormat(this.$refs.audio.duration);
      this.audio = this.$refs.audio;
    },
    //将单位为秒的的时间转换成mm:ss的形式
    timeFormat(number) {
      let minute = parseInt(number / 60);
      let second = parseInt(number % 60);
      minute = minute >= 10 ? minute : "0" + minute;
      second = second >= 10 ? second : "0" + second;
      return minute + ":" + second;
    },
    //进度条发生变化时触发
    updateTime() {
      if (!this.$refs.progress) return;
      this.currentDuration = this.timeFormat(this.audio.currentTime);
      //如果不是正在移动 和 没有暂停播放就执行
      if (!this.isMoveIn || !this.audio.paused) {
        // 设置当前时间
        let MoveX =
          this.$refs.progress.clientWidth *
          (this.audio.currentTime / this.audio.duration);
        //播放时更新距离
        this.$refs.currentProgress.style.width = MoveX + "px";
        this.$refs.circle.style.left =
          MoveX - this.$refs.circle.clientWidth / 2 + "px";
      }
    },
    //点击进度条更新进度
    clickProgress(e) {
      //如果不是正在移动 和 没有暂停播放就执行
      if (!this.isMoveIn || !this.audio.paused) {
        this.updateProgress(e.offsetX);
      }
    },
    //更新进度
    updateProgress(MoveX) {
      //当前移动的位置 = 当前移动的位置 / 当前进度条的可视长度    //this.$refs.progress.clientWidth 注意一定要拿总长度 否则会拿进度条已经走过的长度
      let clickProgress = MoveX / this.$refs.progress.clientWidth;
      //设置播放的时间 = 总时长 * 当前点击的长度
      this.audio.currentTime = this.audio.duration * clickProgress;
      //设置移动的位置
      this.$refs.currentProgress.style.width = MoveX + "px";
      this.$refs.circle.style.left =
        MoveX - this.$refs.circle.clientWidth / 2 + "px";
    },
    //鼠标弹起
    handleMouseup() {
      setTimeout(() => {
        this.audio.play();
        this.paused = false;
        this.isMoveIn = false;
      }, 200);
    },
    //小圆圈按下
    handleMousedown() {
      this.audio.pause();
      this.paused = true;
      this.isMoveIn = true;
      let progress = this.$refs.progress;
      //进度条 左 边距离页面左边的距离 移动最小值
      let moveMin = progress.offsetParent.offsetLeft + progress.offsetLeft;
      //进度条 右 边距离页面左边的距离 移动最大值
      let moveMax =
        progress.offsetParent.offsetLeft +
        progress.offsetLeft +
        progress.clientWidth;
      //小圆圈的宽度
      let circleWidth = this.$refs.circle.clientWidth / 2;
      let move = (move) => {
        if (move.pageX >= moveMax) {
          return;
        } else if (move.pageX <= moveMin) {
          return;
        }
        this.$refs.circle.style.left =
          move.pageX - moveMin - circleWidth + "px";
        this.updateProgress(move.pageX - moveMin);
      };
      //获取当前鼠标的位置 X
      document.addEventListener("mousemove", move);
      //鼠标弹起来
      document.addEventListener("mouseup", () => {
        document.removeEventListener("mousemove", move);
      });
    },
  },
};
</script>
<style scoped lang="less">
.card {
  width: 90%;
  text-align: center;
  padding: 30px;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.03);
  border-radius: 10px;
 
  .progress {
    height: 7px;
    border-radius: 3px;
    margin-bottom: 5px;
    width: 100%;
    background-color: #dadfea;
    cursor: pointer;
 
    .currentProgress {
      position: relative;
      height: 100%;
      width: 0;
      background: linear-gradient(to right, #38deff, #ee8fff, #ffcf14);
      border-radius: 3px;
 
      .circle {
        position: absolute;
        right: -6px;
        top: -2px;
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 1px solid #3853fe;
        background-color: #fff;
 
        &:hover {
          width: 12px;
          height: 12px;
          top: -3px;
          border-radius: 50%;
        }
      }
    }
  }
 
  .time {
    display: flex;
    justify-content: space-between;
    color: #777a85;
    font-size: 12px;
    
  }
 
  .option {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px 0 30px;
 
    .play,
    .pre,
    .next {
      display: flex;
      padding: 0 2px;
      align-items: center;
      cursor: pointer;
    }
  }
 
}
.audio-table{
    opacity: 0 !important;
    position: absolute;
  }
  
</style>