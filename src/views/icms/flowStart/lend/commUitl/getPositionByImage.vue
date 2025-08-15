<template>
  <el-upload
    class="upload-demo"
    action="/SUMP/minioCall/uploadAndCheck"
    :data = "uploadParams"
    :headers="headers"
    :on-success="uploadComplete"
    :on-error="uploadError"
    :show-file-list="false"
  >
    <el-button size="small" type="primary">{{$i18ns('上传图片锁定')}}</el-button>
<!--    <div slot="tip" class="el-upload__tip">只能上传jpg原图文件</div>-->
  </el-upload>
</template>
<script>
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
          "checkGPSFlag": "1",
          "checkPSFlag": "0",
          "filetype": "image"
        },
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
      uploadComplete(response){
        console.log("@@@上传成功response",response);
        let file = response.data;
        console.log("@@@获取图片信息成功",file);
        this.$emit("callBack",file);
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

<style scoped>
.upload-demo {
  display: inline-block;
}
</style>
