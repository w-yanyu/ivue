<template>
<el-upload
  class="upload-demo"
  action="/SUMP/minioCall/uploadAndCheck"
  :data = "uploadParams"
  :headers="headers"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :on-success="uploadComplete"
  :on-error="uploadError"
  :file-list="fileList"
  list-type="picture">
  <el-button size="small" type="primary">{{$i18ns('点击上传')}}</el-button>
</el-upload>
</template>
<script>
import SysConfig from "@/pte/sysconfig.json";
  export default {
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对
    },
    data() {
      return {
        headers: {
          token: window.sessionStorage.getItem('access_token') // 请求头带token，获取token可以参考main.js中
        },
        uploadParams: {
          "checkGPSFlag": this.cParentParams.is_access_info,
          "checkPSFlag": this.cParentParams.is_check_ps,
          "filetype": this.cParentParams.filetype
        },
        fileList: []
      }
    },
    mounted() {
      let that = this;
      console.log("cParentParams", that.cParentParams);
      that.fileList = that.cParentParams.fileList;
      console.log("@@headers", that.headers);
      console.log("this", that);
    },
    methods: {
      handleRemove(file) {
        console.log("移除图片file", file);
        let fileList = this.cParentParams.fileList;
        for(let i=0; i<=fileList.length; i++){
          if(fileList[i].uid == file.uid){
            fileList.splice(i,1)
          }
        }
        console.log("移除元素后", this.cParentParams);
        this.$emit("callBack",this.cParentParams);
      },
      handlePreview(file) {
        console.log("@@@点击图片",file);
        if(file.longitude != undefined){
          let str = '<strong>'+'图片经度：'+file.longitude+'<br>'
            +'图片纬度：'+file.latitude+'<br>'+'</strong>'
          this.$alert(
            str, "图片经纬度信息查看",{
              dangerouslyUseHTMLString: true
            });
        }
      },
      uploadComplete(response, file, fileList){
        if (
          response.code &&
          "" + response.code !== "" + SysConfig.http.successCode
        ) {
          this.$msg({
            message: this.$i18ns(response.message),
            type: "error"
          });

          this.fileList = fileList.slice(0, fileList.length - 1);
        }else{
          console.log("@@@上传成功response",response);
          let file = response.data;
          file.url = file.path;
          file.file_path = file.path;
          file.name = file.oldName;
          file.file_name = file.oldName;
          file.file_size = file.size;
          file.doc_no = this.cParentParams.doc_no;
          this.cParentParams.fileList.push(file);
          console.log("@@@上传成功file",file);
          console.log("@@@上传成功data",this.cParentParams);
          this.$emit("callBack",this.cParentParams);
        }
      },
      uploadError(error, uploadFile, uploadFiles){
        error = JSON.parse(error.message);
        this.$msg(
          {
            message: error.message,
            type: "error"
          }
        )
      }
    }
  }
</script>
