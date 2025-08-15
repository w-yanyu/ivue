<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      label-width="200px"
      class="custom-common--form"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="五级分类批量调整文件">
            <div class="file-container">{{ fileName }}</div>
            <el-button type="primary" size="small" @click="downloadBatchFile"
            >{{$i18ns('下载')}}</el-button
            >
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="附件上传" prop="fileList">
            <upload-file-view  v-if="showComponent" ref="uploadProp" :uploadFileList="ruleForm.fileList" :uploadDisabled="true"></upload-file-view>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import UploadFileView from "@/views/other/loanPostManager/loanPostComponents/UploadFileView.vue";
  export default {
    name: "FivetypeBatchAgency",
    components: {
      UploadFileView,
    },
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对
    },
    data() {
      return {
        fileName: "",
        fileUrl: "",
        bucket: "",
        ruleForm: {
          fileList:[],//附件
        },
        showComponent:true
      };
    },
    created() {
      this.getFileInfo();
    },
    methods: {
      getFileInfo() {
        var vm = this;
        let params = {
          servicecode: "PLMSKGTS0072",
          applid: this.cParentParams.applid,
        };
        this.$http
          .invokeAPI("/SUMP/call/RPCCall", "post", params)
          .then((res) => {
            if (res && res.code === "200" && res.data) {
              this.fileName = res.data.loanFileInfo.fileName;
              this.fileUrl = res.data.loanFileInfo.buctetKey;
              this.bucket = res.data.loanFileInfo.bucket;

              vm.ruleForm.fileList = res.data.fileList;
              this.showComponent=false;
              this.$nextTick(()=>{
                this.showComponent=true;
              })
            }
          })
          .catch((err) => {
            console.error(err);
          });
      },
      downloadBatchFile() {
        let params = {
          servicecode: "AS_ICMS_JK_GETBASE",
          fileKey: this.fileUrl,
          bucket: this.bucket,
        };
        this.$http
          .invokeAPI("/SUMP/call/RPCCall", "post", params)
          .then((res) => {
            if (res && res.code === "200" && res.data) {
              this.downloadBase64(res.data.filebase64Str, this.fileName);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      },
      downloadBase64(base64Url, fileName) {
        let byteCharacters = atob(base64Url);
        let byteNumbers = new Array(byteCharacters.length);
        for (var i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        let byteArray = new Uint8Array(byteNumbers);
        let blob = new Blob([byteArray], { type: "application/octet-stream" });
        if (navigator.msSaveOrOpenBlob) {
          navigator.msSaveBlob(blob, fileName);
        } else {
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(link.href);
        }
      },
    },
  };
</script>
<style lang="less" scoped>
  .custom-common--form {
    /deep/.el-form-item__content {
      line-height: 34px;
    }
  }
  .file-container {
    display: inline-block;
    margin-right: 10px;
  }
</style>
