<template>
  <div class="preview-wrapper">
    <div class="preview-mask"></div>
    <div class="preview-close">
      <i class="el-icon-circle-close" @click="closePrev"></i>
    </div>
    <div class="preview-actions">
      <div class="preview-actions--inner">
        <i class="el-icon-zoom-out" @click="zoomOut"></i>
        <i class="el-icon-zoom-in" @click="zoomIn"></i>
        <i class="el-image-viewer__actions__divider"></i>
        <i class="el-image-viewer__actions__divider"></i>
        <i class="el-image-viewer__actions__divider"></i>
        <i class="el-icon-refresh-left" @click="reverseRotate"></i>
        <i class="el-icon-refresh-right" @click="positiveRotate"></i>
      </div>
    </div>
    <div class="preview-container">
      <img
        :src="previewUrl"
        :style="{ transform: activeTrans }"
        class="preview-container--img"
        alt=""
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "ImagePreview",
  props: {
    // 预览图片路径
    previewUrl: {
      trpe: String,
      required: true,
      default: "",
    }
  },
  data() {
    return {
      activeScale: 1, // 缩放倍数
      activeRotate: 0, // 旋转角度
    }
  },
  computed: {
    // 动态样式
    activeTrans() {
      return `scale(${this.activeScale}) rotate(${this.activeRotate}deg)`;
    }
  },
  created() {
    document.body.addEventListener("keydown", this.escKeydown);
  },
  beforeDestroy() {
    document.body.removeEventListener("keydown", this.escKeydown);
  },
  methods: {
    // 关闭图片预览
    closePrev() {
      this.$emit("close");
    },
    escKeydown(event) {
      let e = event || window.event || arguments.callee.caller.arguments[0];
      if (e.keyCode === 27) {
        this.closePrev();
      }
    },
    // 图片缩小
    zoomOut() {
      if (this.activeScale > 0.4) {
        this.activeScale -= 0.2;
      }
    },
    // 图片放大
    zoomIn() {
      if (this.activeScale < 3) {
        this.activeScale += 0.2;
      }
    },
    // 逆时钟旋转
    reverseRotate() {
      this.activeRotate -= 90;
    },
    // 顺时钟旋转
    positiveRotate() {
      this.activeRotate += 90;
    },
  }
}
</script>
<style lang="less" scoped>
.preview-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  .preview-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: .5;
    background: #000;
  }
  .preview-close {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 40px;
    right: 40px;
    font-size: 40px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    opacity: .8;
    cursor: pointer;
    box-sizing: border-box;
    user-select: none;
    color: #fff;
  }
  .preview-actions {
    width: 282px;
    height: 44px;
    padding: 0 23px;
    position: absolute;
    left: 50%;
    bottom: 30px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 22px;
    opacity: .8;
    cursor: pointer;
    box-sizing: border-box;
    user-select: none;
    transform: translateX(-50%);
    background-color: #606266;
    border-color: #fff;
    .preview-actions--inner {
      width: 100%;
      height: 100%;
      text-align: justify;
      cursor: default;
      font-size: 23px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-around;
      i {
        cursor: pointer;
      }
    }
  }
  .preview-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .preview-container--img {
      margin-top: -60px;
      max-height: 100%;
      max-width: 100%;
      transition: transform 0.3s ease 0s;
    }
  }
}
</style>