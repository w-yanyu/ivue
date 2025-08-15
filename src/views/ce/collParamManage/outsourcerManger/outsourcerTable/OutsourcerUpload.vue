<template>
  <div>
    <el-upload
      ref="uploadProp"
      action="#"
      :on-preview = "handlePictureCardPreview"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      :limit="maxLength"
      :disabled="uploadDisabled"
      multiple
      >
    </el-upload>
    <image-preview v-if="imageVisible" :preview-url="dialogImageUrl"  @close="closePreview"/>
    <el-dialog :visible.sync="pdfVisible" width="1200px" :append-to-body="true">
      <div class="el-dialog-dev" >
        <iframe class="preview-frame" width="100%" style="height:70vh" :src="pdfUrl" frameborder="0"></iframe>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import ImagePreview from "COM/ImagePreview";

  export default {
    name: "UploadFile",
    props: {
      uploadFileList: [], //文件列表
      uploadDisabled:false, //是否可以编辑
      maxLength:20,
      uploadAttachType:"",
      typeList:[],
    },
    components: {
      ImagePreview
    },
    data() {
      return {
        dialogImageUrl: '',
        editDisabled: false,
        totalFileList:[],
        fileList:[],
        pdfVisible:false,
        imageVisible:false,
      }
    },
    created() {
      this.totalFileList = this.uploadFileList;
      this.initFileList();
    },
    methods: {
      initFileList(){
        let that = this;
        if(that.totalFileList.length>0){
          that.totalFileList.forEach(item=>{
            var file = new Object();
            file.name = this.getDictName(item.fileType)+item.fileName;
            file.bucket = item.bucket;
            file.buctetKey = item.buctetKey;
            that.fileList.push(file);
          })
        }
      },
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
        this.$emit('changeFile',  this.totalFileList);
      },
      handlePictureCardPreview(file) {
        if(file.isNew){//是否是新上传文件
          if(/.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(file.name)){
            this.dialogImageUrl = file.url;
            this.pdfVisible = false;
            this.imageVisible=true;
          }else if(/.(pdf)$/.test(file.name)){
            this.pdfUrl = file.url;
            this.imageVisible=false;
            this.pdfVisible = true;
          }else{
            this.handleNewFileDownload(file);
          }
        }else{
            this.handleDownload(file);
        }

      },
      handleNewFileDownload(file) {
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

      handleDownload(file) {
        let params = {
          servicecode: "RLMSPLTS1011",
          buctetKey: file.buctetKey,
          bucket: file.bucket,
        };
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if(/.(gif|jpg|png|gif|jpg|png)$/.test(file.name)){
              this.dialogImageUrl = "data:image/png;base64,"+res.data.filebase64Str;
              this.pdfVisible = false;
              this.imageVisible=true;
            }else if(/.(jpeg)$/.test(file.name)){
              this.dialogImageUrl = "data:image/jpeg;base64,"+res.data.filebase64Str;
              this.pdfVisible = false;
              this.imageVisible=true;
            }else if(/.(pdf)$/.test(file.name)){
              this.pdfUrl = "data:application/pdf;base64,"+res.data.filebase64Str;
              this.imageVisible=false;
              this.pdfVisible = true;
            }else{
              file.url = res.data.filebase64Str;
              var filename =  file.name;
              let URL = this.dataUrlToBlob(res.data.filebase64Str, res.data.prefix);
              var a = document.createElement("a");
              a.download = filename;
              a.style.display = "none";
              a.href = window.URL.createObjectURL(URL);
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }
          })
          .catch(err => {
            console.error(err);
          });

      },

      handleChange(file, fileList){
        this.fileList = fileList;
        console.log(file);
        const isLt8M = file.size / 1024 / 1024 < 20;
        if (!isLt8M) {
          this.fileList.splice(fileList.indexOf(file), 1);
          this.$message({
            type: "warning",
            message: "凭证文件大于20M"
          })
        } else {
          let formData = new FormData();
          formData.append("file", file.raw);
      formData.append("org_id", userInfo.org_id);
          formData.append("path", "PD");
          MyAxios.invokeAPI("/SUMP/icmcall/file", "post", formData)
            .then(res => {
              if (res && res.code === "200" && res.data && res.data.path) {
                file.status = "success";
                let param={
                  filePath:res.data.path,
                  fileName:file.name,
                  fileType:this.uploadAttachType,
                  isNew:true//是否新上传
                }
                let url =  window.URL.createObjectURL(file.raw);

                file.url  = url;
                file.name  = this.getDictName(this.uploadAttachType)+file.name;;
                file.isNew  = true;
                this.totalFileList[fileList.indexOf(file)] = param;
                this.$emit('changeFile',  this.totalFileList)
              } else {
                this.fileList.splice(fileList.indexOf(file), 1);
                this.$message({
                  type: 'error',
                  message: '上传失败！'
                })
              }
            })
            .catch(err => {
              console.error(err);
            });
        }
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
      clearFileList(){
        this.totalFileList=[];
        this.fileList=[];
      },
      /**
       * 关闭图片预览
       */
      closePreview() {
        this.imageVisible = false;
      },

      getDictName(dictId){
        let vm = this;
        let perfix = "";
        if(vm.typeList && vm.typeList.length>0 && dictId && dictId!=""){
          vm.typeList.forEach(item=>{
            if(item.dictId == dictId){
              perfix = item.dictName+"_";
            }
          })
        }

        return perfix;
      }
    },

  }
</script>
<style lang="less" scoped>
  .el-dialog-dev{
    max-height:70vh;
    overflow:auto;
  }
</style>
