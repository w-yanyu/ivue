<template>
  <div>
    <div class="preview-container">
      <el-image
        v-for="(item, index) in imageUrls"
        :key="index"
        :src="item"
        fit="contain"
        @click="prevClick(item)"
      >
      </el-image>
    </div>
    <image-preview :preview-url="previewUrl" @close="closePreview" v-if="showViewer" />
  </div>
</template>
<script>
import ImagePreview from "COM/ImagePreview";

export default {
  name: "ImgPreview",
  components: {
    ImagePreview
  },
  props: {
    cMeta: Object, //本页面模板json数据Layout对象
    cParentMeta: Object, //父页面模板json数据Layout对象
    cParentParams: Object, //父页面自定义参数与内置参数
    cParentScope: Object, //父页面每块区域业务数据
  },
  data() {
    return {
      imageUrls: [], // 图片路径列表
      previewUrl: "", // 预览图片路径
      showViewer: false, // 控制图片预览显示隐藏
    };
  },
  created() {
    this.getImageList(); // 初始化获取图片路径
  },
  methods: {
    getImageList() {
      let urls = this.cParentParams.path.split(";");
      urls.forEach((item, index) => {
        this.getImageUrl(item, index);
      });
    },
    // 获取图片路径
    getImageUrl(url, index) {
      let prefix = "";
      switch (url.split(".")[url.split(".").length - 1]) {
        case "png":
          prefix = "data:image/png;base64,"
          break;
        case "jpg":
        case "jpeg":
          prefix = "data:image/jpeg;base64,"
          break;
        default:
          break;
      }
      let params = {
        servicecode: "AS_ICMS_JK_GETBASE",
        fileKey: url,
        bucket: this.cParentParams.bucket,
      };
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200" && res.data && res.data.filebase64Str) {
            this.$set(this.imageUrls, index, prefix + res.data.filebase64Str);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     * 图片预览点击事件
     * @param url 预览图片路径
     */
    prevClick(url) {
      this.previewUrl = url;
      this.showViewer = true;
    },
    /**
     * 关闭图片预览
     */
    closePreview() {
      this.showViewer = false;
    },
  },
};
</script>
<style lang="less" scoped>
.preview-container {
  text-align: center;
  .el-image {
    margin: 10px;
    width: 260px;
    height: 260px;
    cursor: pointer;
    box-shadow: 0 0 5px 3px rgba(204, 204, 204, 0.3);
  }
}
</style>