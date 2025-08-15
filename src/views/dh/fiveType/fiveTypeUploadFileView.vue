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
          :on-preview = "handlePictureCardPreview"
          :on-change="handleChange"
          :on-remove="handleRemove"
          :limit="5"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button size="small" type="primary">{{$i18ns('点击上传')}}</el-button>
        </el-upload>
        <image-preview v-if="imageVisible" :preview-url="dialogImageUrl"  @close="closePreview"/>
        <el-dialog :visible.sync="pdfVisible" width="1200px" :append-to-body="true">
          <div class="el-dialog-dev" >
            <iframe class="preview-frame" width="100%" style="height:70vh" :src="pdfUrl" frameborder="0"></iframe>
          </div>
        </el-dialog>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import ImagePreview from "COM/ImagePreview";

  export default {
    name: "fiveTypeUploadFileView",
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
        totalFileList:[],
        fileList: [], // 文件清单
        formKey: "", // 需要赋值的外部表单key
        isInvert: false, // 是否需要反显
        fileSize: null, // 文件大小限制  默认10MB
        formLabel: "", // 需要赋值的外部表单Label
        isRequired: false, // 控制必输样式
        pdfVisible:false,
        imageVisible:false,
      };
    },
    created() {
      this.formKey = this.cParentScope.item.toRequest.params.formKey;
      this.isInvert = this.cParentScope.item.toRequest.params.isInvert ? true : false;
      this.fileSize = this.cParentScope.item.toRequest.params.fileSize ? this.cParentScope.item.toRequest.params.fileSize : 10;
      this.formLabel = this.cParentScope.item.toRequest.params.formLabel;
      this.isRequired = this.cParentScope.item.toRequest.params.required ? true : false;
      this.rules = {};
      // if (this.cParentScope.parentFormModel[this.formKey] && this.isInvert) {
      //   this.fileList.push({name: this.cParentScope.parentFormModel[this.formKey], status: "success"})
      // }
      this.initFileList();
    },
    methods: {
      initFileList(){
        let that = this;
        if(that.cParentScope.parentFormModel[that.formKey]){
          var arr = that.cParentScope.parentFormModel[that.formKey];
          arr.forEach(item=>{
            var file = new Object();
            file.name = item.fileName;
            file.fileName = item.fileName;
            file.filePath = item.filePath;
            if(/.(gif|jpg|png|gif|jpg|png)$/.test(file.name)){
              file.fileUrl = "data:image/png;base64,"+item.fileString;
            }else if(/.(jpeg)$/.test(file.name)){
              file.fileUrl = "data:image/jpeg;base64,"+item.fileString;
            }else if(/.(pdf)$/.test(file.name)){
              file.fileUrl = "data:application/pdf;base64,"+item.fileString;
            }else{
              file.fileUrl = item.fileString;
            }
            that.fileList.push(file);
            that.totalFileList.push(file);
            this.cParentScope.parentFormModel[this.formKey] = JSON.stringify(this.totalFileList);
          })
        }
      },
      /**
       * 文件清单change回调
       * @param file 当前文件对象
       * @param fileList 文件清单
       */
      handleChange(file, fileList) {
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
        formData.append("path", "PD");
        MyAxios.invokeAPI("/SUMP/icmcall/file", "post", formData)
          .then(res => {
            if (res && res.code === "200") {
              file.status = "success";
              this.fileList.push(file);
              let fileMap = {
                filePath: res.data.path,
                fileName: file.name,
              }
              let fileUrl =  window.URL.createObjectURL(file.raw);
              this.fileList[fileList.indexOf(file)].fileUrl  = fileUrl;
              this.totalFileList.push(fileMap);
              this.$emit('changeFile',  this.totalFileList)
              this.cParentScope.parentFormModel[this.formKey] = JSON.stringify(this.totalFileList);

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
      handlePictureCardPreview(file) {
        if(/.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(file.name)){
          this.dialogImageUrl = file.fileUrl;
          this.pdfVisible = false;
          this.imageVisible=true;
        }else if(/.(pdf)$/.test(file.name)){
          this.pdfUrl = file.fileUrl;
          this.imageVisible=false;
          this.pdfVisible = true;
        }else{
          this. handleDownload(file);
        }

      },
      /**
       * 关闭图片预览
       */
      closePreview() {
        this.imageVisible = false;
      },
      handleDownload(file) {
        var vm = this;
        let index = null;
        vm.fileList.forEach((item, key) => {
          if (item.uid === file.uid) {
            index = key;
            return false;
          }
        });

        var params = {};
        params.path = vm.totalFileList[index].filePath;
        if(params.path === "") {
          vm.$message({
            type: "warning",
            message: "该附件未上传"
          })
          return;
        }
        MyAxios.invokeAPI("/SUMP/icmcall/download", "post", params)
          .then(res => {
            var filename =  vm.totalFileList[index].fileName;
            let URL = vm.dataUrlToBlob(res.data.fileString, res.data.prefix);
            var a = document.createElement("a");
            a.download = filename;
            a.style.display = "none";
            a.href = window.URL.createObjectURL(URL);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          })
          .catch(err => {
            console.error(err);
          });

      },
      dataUrlToBlob(data, prefix) {
        var bstr = window.atob(data);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: prefix });
      },
      /**
       * 文件清单移除前回调
       * @param file 当前文件对象
       * @param fileList 文件清单
       */
      handleBeforeRemove(file, fileList) {
        this.$confirm("此操作将删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.handleRemove(file, fileList);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除!'
          });
          this.fileList = [];
          this.fileList.push(file);
        });
      },
      /**
       * 文件清单移除回调
       * @param file 当前文件对象
       * @param fileList 文件清单
       */
      handleRemove(file, fileList) {
        let index = null;
        this.fileList.forEach((item, key) => {
          if (item.uid === file.uid) {
            index = key;
            return false;
          }
        });
        this.fileList.splice(index, 1);
        this.totalFileList.splice(index, 1);
        this.$emit('changeFile',  this.totalFileList);
        this.cParentScope.parentFormModel[this.formKey] = JSON.stringify(this.totalFileList);
      }
    }
  };
</script>
<style lang="less" scoped>
  .el-form.custom-common--form {
    padding: 0;
  }
  .require-sign.custom-common--form {
    /deep/.el-form-item__label:before {
      content: "*";
      color: #f56c6c;
      margin-right: 4px;
    }
  }
</style>
