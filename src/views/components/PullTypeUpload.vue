<template>
  <div class="upload">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules"  class="custom-common--form">
      <el-form-item :label="formLabel" prop="fileList" >
        <el-upload class="upload-demo" drag multiple
                   :on-change="handleChange"
                   :on-remove="handleRemove"
                   :limit="1"
                   :file-list="fileList"
                   :auto-upload="false">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>{{$i18ns('点击上传')}}</em></div>
          <div class="el-upload__tip" slot="tip">提示:只能上传excel文件，且不超过500kb</div>
        </el-upload>
        <div>还没有Excel模版?<a @click="downloadTemplate" style="color:red">请点击下载标准模版</a></div>
      </el-form-item>
    </el-form>
  </div>
</template>
<style>
.upload{
  margin-left: calc(50%/2*3 - 180px);
  white-space: nowrap;
}

</style>
<script>
  import MyAxios from "pte-ui/utils/MyAxios";

  export default {
    name: "PullTypeUpload",
    props: {
      cMeta: Object, // 布局相关数据
      cParentMeta: Object, // 父页面模板json数据
      cParentScope: Object, // 父页面每块区域业务数据
      cParentParams: Object, // 父页面自定义参数与内置参数
    },
    data() {
      return {
        ruleForm: {
          fileList: [], // 文件清单
        },
        fileList: [], // 文件清单
        rules: {
          fileList: [
            { validator: this.fileListValidate, trigger: 'change' }
          ],
        },
        formKey: "", // 需要赋值的外部表单key
        path:"",
      }
    },
    created() {
      this.formKey = this.cParentScope.item.toRequest.params.formKey;
      this.path=  this.cParentScope.item.toRequest.params.path;
    },
    methods: {
      fileListValidate(rule, value, callback) {
        if (this.fileList.length === 0) {
          return callback(new Error("请上传文件"));
        }
        return callback();
      },
      /**
       * 文件清单change回调
       * @param file 当前文件对象
       * @param fileList 文件清单
       */
      handleChange(file, fileList) {
        let formData = new FormData();
        formData.append("file", file.raw);
      formData.append("org_id", userInfo.org_id);
        formData.append("path", this.path);
        MyAxios.invokeAPI("/SUMP/icmcall/file", "post", formData).then(res => {
          if (res && res.code === "200") {
            file.status = "success";
            this.fileList.push(file);
            this.$refs.ruleForm.validateField("fileList");
            this.cParentScope.parentFormModel[this.formKey] = res.data.path;

            this.$msg({
              message: "附件上传成功",
              type: "success",
              center:true
            });
            setTimeout(()=>{
              this.$confirm(
                '确认覆盖现有配置？',
                '消息提示:',
                {
                  type: "warning"
                }
              ).then(() => {

                let reqMap={};
                reqMap["servicecode"]="ICMSPDTS0086";
                reqMap["filePath"]=res.data.path;

                MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res2=>{
                  console.log(res2);
                  this.$msg({
                    message: "配置成功",
                    type: "success",
                    center: true
                  });
                });

              });

            },1000);
          }
        }).catch(err => {
          console.error(err)
        })
      },
      /**
       * 文件清单移除回调
       * @param file 当前文件对象
       * @param fileList 文件清单
       */
      handleRemove(file, fileList) {
        this.fileList.forEach((item, index) => {
          if (item.uid === file.uid) {
            this.fileList.splice(index, 1);
          }
        });
        this.$refs.ruleForm.validateField("fileList");
        this.cParentScope.parentFormModel[this.formKey] = "";
      },

      downloadTemplate(){
        let reqMap={};
        reqMap["servicecode"] = "ICMSPDTS0085";

        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
          let URL = this.dataUrlToBlob(res.data.downloadUrl);
          var reader = new FileReader();
          reader.readAsDataURL(URL);
          reader.onload = function (e) {
            const a = document.createElement('a');
            a.download = '产品兼容性配置清单.xls';
            a.href = e.target.result;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a)
          }
        });
      },

      dataUrlToBlob(data){
        var bstr = atob(data);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: 'xls' });
      }
    }
  }
</script>

