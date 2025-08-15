<template>
  <div class="preview-wrapper">
    <div class="preview-close">
      <i class="el-icon-circle-close" @click="closePrev"></i>
    </div>
    <iframe class="preview-frame" :src="pdfUrl" frameborder="0"></iframe>
  </div>
</template>
<script>
export default {
  name: "PdfViewForVue",
  props: {
    pdfUrl: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },

  methods: {
    closePrev() {
      this.$emit("close");
    }
  }
};
</script>
<style lang="less" scoped>
.preview-frame {
  height: 100%;
  width: 100%;
}
.preview-wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
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
    opacity: 0.8;
    cursor: pointer;
    box-sizing: border-box;
    user-select: none;
    color: #fff;
  }
}
</style>