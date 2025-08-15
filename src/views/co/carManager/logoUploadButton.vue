<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      label-width="240px"
      class="custom-common--form"
      :class="{'require-sign': isRequired}"
    >
      <el-form-item :label="formLabel" class="upload-item">
        <el-upload
          class="upload-demo"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :limit="5"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button size="small" type="primary">{{$i18ns('点击上传')}}</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import ImagePreview from "COM/ImagePreview";

export default {
  name: "logoUploadButton",
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
      ruleForm: {
        fileList: [] // 文件清单
      },
      totalFileList: [],
      fileList: [], // 文件清单
      formKey: "", // 需要赋值的外部表单key
      file_path: "",//父页面协议模板
      isInvert: false, // 是否需要反显
      fileSize: null, // 文件大小限制  默认10MB
      isRequired: false, // 控制必输样式
      pdfVisible: false,
      imageVisible: false,
      path: ""
    };
  },
  created() {
    this.file_path = this.cParentScope.item.toRequest.params.file_path;
    this.fileSize = this.cParentScope.item.toRequest.params.fileSize ? this.cParentScope.item.toRequest.params.fileSize : 10;
    this.rules = {};
  },
  methods: {
    /**
     * 文件清单change回调
     * @param file 当前文件对象
     * @param fileList 文件清单
     */
    handleChange(file, fileList) {
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
      formData.append("org_id", userInfo.org_id);
      MyAxios.invokeAPI("/SUMP/minioCall/upload", "post", formData)
        .then(res => {
          if (res && res.code === "200") {
            file.status = "success";
            this.fileList = [];
            this.fileList.push(file);
            console.log("文件对象",file)
            let fileMap = {
              filePath: res.data.path,
              fileName: file.name,
            }
            // let fileUrl =  window.URL.createObjectURL(file.raw);
            // this.fileList[fileList.indexOf(file)].fileUrl  = fileUrl;
            // this.totalFileList.push(fileMap);
            // this.$emit('changeFile',  this.totalFileList)
            //删除已上传文件
            //如果
            if (this.totalFileList.length !== 0) {
              this.deleteFileFocus(this.totalFileList[0].filePath)
            }
            that.path = res.data.path;
            //只允许上传一个文件
            this.totalFileList = [];
            this.totalFileList.push(fileMap);
            for (const temp in this.cParentScope.item.toRequest.params) {
              console.log(temp.toString())
            }
            this.cParentScope.parentFormModel[this.formKey] = JSON.stringify(this.totalFileList);
            this.cParentScope.parentFormModel[this.file_path] = res.data.path;
            this.cParentScope.parentFormModel["img"] = res.data.path;
          } else {
            this.fileList = [];
            this.$message({
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
    deleteFileFocus(path) {
      let formData = new FormData();
      formData.append("path", path);
      MyAxios.invokeAPI("/SUMP/minioCall/deleteFile", "post", formData)
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
      this.deleteFileFocus(this.path);
      console.log("删除文件路径",this.path);
      this.cParentScope.parentFormModel[this.file_path] = "";
      this.cParentScope.parentFormModel["img"] = "";
      this.$emit('changeFile',  this.totalFileList);
    },
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
</style>
