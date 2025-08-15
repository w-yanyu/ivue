<template>
  <div>
    <iframe class="container-iframe" width="100%" style="height:70vh"
            :src="ruleForm.protocol_path"
            v-if="iframeShowFlag"
            frameborder="0">
    </iframe>
    <el-alert
      :title="warnMsg"
      type="warning"
      v-if="warnMsgShowFlag"
      effect="dark">
    </el-alert>
    <el-alert
      :title="errorMsg"
      type="error"
      v-if="errorMsgShowFlag"
      effect="dark">
    </el-alert>
  </div>
</template>
<script>
export default {
  name: "lookAgreementBtn",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  components: {},
  data() {
    return {
      iframeShowFlag: false,
      errorMsgShowFlag: false,
      warnMsgShowFlag: false,
      errorMsg: "文件缺失！",
      warnMsg: "暂不支持该文件类型预览！",
      ruleForm: {
        protocol_path: "" // 文件清单
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.ruleForm.protocol_path = this.cParentParams.protocol_path;
      if (!this.ruleForm.protocol_path || this.ruleForm.protocol_path === "") {
        this.iframeShowFlag = false;
        this.warnMsgShowFlag = false;
        this.errorMsgShowFlag = true;
        return;
      }
      if (this.isPreView(this.ruleForm.protocol_path)) {
        this.warnMsgShowFlag = false;
        this.errorMsgShowFlag = false;
        this.iframeShowFlag = true;
      } else {
        this.errorMsgShowFlag = false;
        this.iframeShowFlag = false;
        this.warnMsgShowFlag = true;
      }
    },
    isPreView(filePath) {
      let flag = true;
      var str = filePath.substring(filePath.lastIndexOf("."), filePath.length);
      switch (str) {
        case ".png":
          break;
        case ".jpg":
          break;
        case ".jpeg":
          break;
        case ".webp":
          break;
        case ".gif":
          break;
        case ".bmp":
          break;
        case ".svg":
          break;
        case ".tiff":
          break;
        case ".tif":
          break;
        case ".ico":
          break;
        case ".pdf":
          break;
        case ".html":
          break;
        default:
          flag = false
          break;
      }
      return flag
    }
  }
};
</script>
<style lang="less" scoped>
.el-form.custom-common--form {
  padding: 0;
}

.require-sign.custom-common--form {
  /deep/ .el-form-item__label:before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
}
.container-iframe{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
