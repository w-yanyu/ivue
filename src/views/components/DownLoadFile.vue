<template>
  <div v-if="ifshow">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="240px"
      class="custom-common--form"
    >
      <el-form-item :label="formLabel" prop="fileList" class="upload-item">
        <div v-if="fileList.length!=0">
          <div v-for="(item,i) in fileList" :key="i">
            <div class="filestyle">
              <div class="one" :title="item.attname">{{item.attname}}</div>
              <div class="option">
                <el-button type="text" @click="previewFile(item.atturl)" style="font-size:14px;">预览</el-button>
                <el-button type="text" @click="downLoadFile(item.atturl)" style="font-size:14px;">{{$i18ns('下载')}}</el-button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="fileList.length===0" style="color:#9ea0a7;">未上传</div>
      </el-form-item>
      <image-preview :preview-url="previewUrl" @close="closeImg" v-if="showViewer" />
      <pdf-view-for-vue :pdfUrl="pdfUrl" @close="closePdf" v-if="showpdf" />
    </el-form>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import ImagePreview from "COM/ImagePreview";
import PdfViewForVue from "COM/PdfViewForVue";
export default {
  name: " ",
  components: {
    ImagePreview,
    PdfViewForVue
  },
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object // 父页面自定义参数与内置参数
  },
  data() {
    return {
      ruleForm: {
        fileList: [] // 文件清单
      },
      fileList: [], // 文件清单
      formKey: "", // 需要赋值的外部表单key
      formLabel: "", // 需要赋值的外部表单Label
      ifshow: true,
      filename: "",
      previewUrl: "",
      showViewer: false, // 控制图片预览显示隐藏
      showpdf: false,
      pdfUrl: ""
    };
  },

  created() {
    if (this.cParentScope) {
      this.formKey = this.cParentParams.formKey;
      this.formLabel = this.cParentParams.formLabel;
      this.fileList = this.cParentScope.parentFormModel[this.formKey];
    }
  },

  methods: {
    /**
     * 预览图片pdf
     * @param
     *
     */
    previewFile(url) {
      var params = {};
      params.path = url;
      MyAxios.invokeAPI("/SUMP/icmcall/download", "post", params)
        .then(res => {
          if (
            res.data.prefix === "png" ||
            res.data.prefix === "jpg" ||
            res.data.prefix === "jpeg"
          ) {
            this.showViewer = true;
            this.previewUrl =
              "data:image/" +
              res.data.prefix +
              ";base64," +
              res.data.fileString;
          } else if (res.data.prefix === "pdf") {
            this.showpdf = true;
            this.pdfUrl = "data:application/pdf;base64," + res.data.fileString;
          } else {
            this.$message({
              type: "warning",
              message: "暂不支持预览该格式文件"
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 关闭图片预览
     */
    closeImg() {
      this.showViewer = false;
    },
    /**
     * 关闭pdf预览
     */
    closePdf() {
      this.showpdf = false;
    },
    /**
     * 下载文件
     * @param
     *
     */
    downLoadFile(url) {
      var params = {};
      params.path = url;
      if (params.path === "") {
        this.$message({
          type: "warning",
          message: "该附件未上传"
        });
      } else {
        MyAxios.invokeAPI("/SUMP/icmcall/download", "post", params)
          .then(res => {
            var filename = this.formLabel + "." + res.data.prefix;
            let URL = this.dataUrlToBlob(res.data.fileString, res.data.prefix);
            console.log(URL);

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
    }
  }
};
</script>
<style lang="less" scoped>
.el-form.custom-common--form {
  padding: 0;
}
.el-form-item__label:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
.alink {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: top;
}
.preview-container {
  text-align: center;
  position: relative;
  .el-image {
    margin: 10px;
    width: 600px;
    height: 600px;
    cursor: pointer;
    box-shadow: 0 0 5px 3px rgba(204, 204, 204, 0.3);
  }
}
.preview-frame {
  height: 100%;
  width: 100%;
}
.filestyle {
  display: flex;
  align-items: center;
  .one {
    white-space: nowrap;
    overflow: hidden;
    z-index: 0;
  }
  .option {
    background: #ffffff;
    display: flex;
    justify-content: flex-end;
    z-index: 1000;
  }
}
</style>