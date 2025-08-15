<template>
  <div class="verifiy-container clearfix">
    <div class="verifiy-right">
      <div class="verifiy-right--title">影像资料信息</div>
      <div class="img">
        <div class="verifiy-right--block left-block">
          <span class="verifiy-right--desc">大头照</span>
          <el-image @contextmenu.prevent :src="imageForm.faceUrl" @click="openPreview(imageForm.faceUrl)" fit="scale-down">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </div>
        <div class="verifiy-right--block left-block">
          <span class="verifiy-right--desc">身份证正照片</span>
          <el-image @contextmenu.prevent :src="imageForm.backUrl" @click="openPreview(imageForm.backUrl)" fit="scale-down">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </div>
        <div class="verifiy-right--block left-block">
          <span class="verifiy-right--desc">身份证反面</span>
          <el-image @contextmenu.prevent :src="imageForm.frontUrl" @click="openPreview(imageForm.frontUrl)" fit="scale-down">
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </div>
      </div>
    </div>
    <image-preview :preview-url="previewUrl" @close="closePreview" v-if="showViewer" />
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import ImagePreview from "COM/ImagePreview";

export default {
  name: "InternetVerification",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  components: {
    ImagePreview
  },
  data() {
    return {
      interRules: {},
      imageForm: { // 影像信息
        faceUrl: "", // 大头照
        frontUrl: "", // 身份证正面
        backUrl: "", // 身份证反面
      },
      isShowReject: false,
      showViewer: false, // 控制预览
      previewUrl: "", // 预览图片路径
    }
  },
  created() {
    this.getIdCardInfo(); // 初始化申请人影像信息
  },
  methods: {
    // 打开图片预览
    openPreview(url) {
      this.showViewer = true;
      this.previewUrl = url;
    },
    closePreview() {
      this.showViewer = false;
    },
    /**
     * 获取申请人影像信息
     */
    getIdCardInfo() {
      let params = {
        applid: this.cParentParams.busino,
        servicecode: "AS_ICMS_CM_FILERC",
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          res.data.forEach(item => {
            switch (item.filetp) {
              case "1":
                this.imageForm.backUrl = `data:image/jpeg;base64,${item.furl}`;
                break;
              case "2":
                this.imageForm.frontUrl = `data:image/jpeg;base64,${item.furl}`;
                break;
              case "3":
                this.imageForm.faceUrl = `data:image/jpeg;base64,${item.furl}`;
                break;
              default:
                break;
            }
          });
        }
      })
    },

  }
};
</script>
<style lang="less" scoped>

  .verifiy-right--block {
    display: table;
    float: left;
    width: 33%;    //将3张图片并排 排列
    text-align: center;
    line-height: 27px;
    color: black;
  }
  .el-image {
    width: 290px;
    height: 290px;
    padding: 10px;
    box-sizing: border-box;
  }


</style>
