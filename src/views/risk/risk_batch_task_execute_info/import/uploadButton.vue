<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      class="custom-common--form"
      :class="{'require-sign': isRequired}"
    >
      <el-form-item class="upload-item">
        <el-upload
          :on-change="handleChange"
          :on-remove="handleRemove"
          :limit="5"
          :file-list="totalFileList"
          :auto-upload="false"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import ImagePreview from "COM/ImagePreview";

export default {
  name: "TemplateUploadButton",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  components: {
    ImagePreview
  },
  data() {
    return {
      totalFileList: [],
      fileList: [], // 文件清单
      formKey: "", // 需要赋值的外部表单key
      file_path: "",//父页面协议模板
      isInvert: false, // 是否需要反显
      fileSize: 10, // 文件大小限制  默认10MB
      isRequired: false, // 控制必输样式
      pdfVisible: false,
      imageVisible: false,
      tempFilePath: ""
    };
  },
  created() {
    // this.fileSize = this.cParentParams.fileSize !== null ? this.cParentParams.fileSize : 10;
    // this.rules = {};
  },
  methods: {
    /**
     * 文件清单change回调
     * @param file 当前文件对象
     * @param fileList 文件清单
     */
    async handleChange(file, fileList) {
      let that = this;
      let limit = file.size / 1024 / 1024;
      if (limit > this.fileSize) {
        this.fileList = [];
        this.$message({
          type: "warning",
          message: `上传文件大小不能超过${this.fileSize}MB！`
        });
        return false;
      }
      let formData = new FormData();
      formData.append("file", file.raw);
      console.log("ruleForm-------",this.ruleForm);
      formData.append("servicecode", "ct4115");
      MyAxios.invokeAPI("/SUMP/rest/file/importExcelData", "post", formData)
        .then(res => {
          if (res && res.code === "200") {
            file.status = "success";
            that.fileList = [];
            that.fileList.push(file);
            let fileMap = {
              path: res.data.data.path,
              name: file.name
            };
            console.log("fileMap",fileMap);
            //删除已上传文件
            if (that.totalFileList.length !== 0){
              that.totalFileList.forEach(item => {
                that.deleteFileFocus(item.url);
              })
            }
            //设置当前临时文件路径
            this.tempFilePath = fileMap.path;
            //只允许上传一个文件
            that.totalFileList.splice(0, 1, fileMap);
            //返回文件上传参数
            that.setFileUploadReturnData(fileMap);
          } else {
            that.fileList = [];
            that.$message({
              type: 'error',
              message: '上传失败！'
            })
          }
        })
        .catch(err => {
          console.error(err);
        });
    },

    /**
     * 文件删除
     */

    async deleteFileFocus(path) {
      let that = this;
      let formData = new FormData();
      formData.append("path", path);
      MyAxios.invokeAPI("/SUMP/rest/file/deleteFile", "post", formData)
        .then(res => {
          if (res && res.code !== "200") {
            this.$message({
              type: 'error',
              message: '文件删除失败！'
            })
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 文件删除
     */
    handleRemove(file) {
      let index = null;
      this.fileList.forEach((item, key) => {
        if (item.uid === file.uid) {
          index = key;
          return false;
        }
      });
      this.fileList.splice(index, 1);
      this.totalFileList.splice(index, 1);
      this.deleteFileFocus(this.tempFilePath);
      this.setFileUploadReturnData({name: "", path: ""});
    },
    /**
     * 更改父页面文件路径
     * @param filePath
     */
    setFileUploadReturnData(dataMap) {
      this.$emit('setFileUploadReturnData', dataMap);
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

.upload-item {
  width: auto;
  margin-left: 2px;
}
</style>
