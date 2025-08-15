<template>
<div>
  <i  v-if="recordFile.length>0" slot="reference" :style="isPlay==false?'':'color: red;'" :class="isPlay==false?'el-icon-video-play':'el-icon-video-pause'" style="cursor: pointer;margin-right: 10px;margin-top: 3px;font-size: 25px" @click="autoPlay" />
</div>
</template>


<script>
export default {
  name: 'Audioplay',
  props: {
    recordFile: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      
      isPlay: false,
      myAuto: null,
      isShow: false,
      maxTime: 0,

      sliderTime: 0,
        audio: {
            // 该字段是音频是否处于播放状态的属性
            playing: false,
            // 音频当前播放时长
            currentTime: 0,
            // 音频最大播放时长
            maxTime: 0,
          minTime: 0,
          step: 0.1
         }


    };
  },
    watch: {
    recordFile(newValue){
      debugger
      console.log('3333333333333', newValue)
      // if (newValue.length > 0){
      //   this.isShow = true;
      //    this.myAuto = new Audio(this.recordFile);
      // }
    },
  },


  methods: {
    autoPlay() {
      if (!this.myAuto){
        this.myAuto = new Audio(this.recordFile)
      }

      console.log("11111111111222222" + this.recordFile);
      this.isPlay = !this.isPlay;
      if (this.isPlay) {
        this.myAuto.play();
        this.palyEnd();
      } else {
        this.myAuto.pause();
        this.palyEnd();
      }
    },
    palyEnd() {
      this.myAuto.addEventListener('ended', () => {
        this.isPlay = false;
      });
    }
  }
};
</script>

<style scoped>

</style>