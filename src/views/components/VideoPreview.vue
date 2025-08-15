<template>
  <div class="video-preview">
    <video controls :src="videoUrl"></video>
  </div>
</template>
<script>
export default {
  name: "VideoPreview",
  props: {
    cMeta: Object, //本页面模板json数据Layout对象
    cParentMeta: Object, //父页面模板json数据Layout对象
    cParentParams: Object, //父页面自定义参数与内置参数
    cParentScope: Object, //父页面每块区域业务数据
  },
  data() {
    return {
      videoUrl: "",
    };
  },
  created() {
    this.videoUrl = this.cParentParams.videoUrl;
  }
};
</script>
<style lang="less" scoped>
div[c-module="VideoPreview"] {
  height: 100%;
}
.video-preview {
  height: 100%;
  width: 100%;
  video {
    width: 100%;
  }
}
</style>