<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="160px"
      class="custom-common--form"
      :class="{'require-sign': isRequired}"
    >
      <el-form-item :label="formLabel" prop="fileList" class="upload-item">
        <el-upload
          class="upload-demo"
          :on-change="handleChange"
          :before-remove="handleBeforeRemove"
          :limit="5"
          :file-list="fileList"
          :auto-upload="false"
          v-model="ruleForm.fileList"
        >
          <el-button size="small" type="primary" v-show="fileList.length<6">{{$i18ns('点击上传')}}</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "MultipleUploadVue",
  props: {
    vueFormLabel: { type: String }, //vue父文件传递标签
    vueFormKey: { type: String }, //vue父文件传递key
    ifRequire: { type: Boolean }, //vue父文件定义是否必须
    warning: { type: Boolean },
    fileSize: { type: Number }, // 文件大小限制  默认10MB
    fileName: { type: Array }, // 文件名返显
    fileType: { type: String } //限制上传文件格式
  },
  data() {
    return {
      ruleForm: {
        fileList: [] // 文件清单
      },
      fileList: [], // 文件清单
      allFile: [], //文件列表
      filePath: "",
      rules: {
        fileList: [
          {
            validator: this.fileListValidate,
            trigger: "change",
            required: false
          }
        ]
      },
      formKey: "", // 需要赋值的外部表单key
      // isInvert: false, // 是否需要反显
      // fileSize: null, // 文件大小限制  默认10MB
      formLabel: "" // 需要赋值的外部表单Label
      // isRequired: false // 控制必输样式
    };
  },
  watch: {
    ifRequire() {
      if (this.ifRequire) {
        this.rules.fileList[0].required = true;
      } else {
        this.rules.fileList[0].required = false;
        this.$refs.ruleForm.validateField("fileList");
      }
    },
    warning() {
      this.$refs.ruleForm.validateField("fileList");
    },
    fileName() {
      if (this.fileName) {
         this.fileList=[];
         this.fileName.forEach(item => {this.fileList.push({ name: item.attname,status: "success",atturl: item.atturl});
         item.attkey = this.vueFormKey;
         this.$emit("fileInfo", item, "add");
      });
      this.$emit("addAttWatch", this.vueFormKey);
    }
    }
  },
  created() {
    this.formKey = this.vueFormKey;
    this.formLabel = this.vueFormLabel;
    this.rules.fileList[0].required = this.ifRequire;
    this.fileSize = this.fileSize ? this.fileSize : 10;
    console.log(this.fileName);
    if (this.fileName) {
        this.fileName.forEach(item => {this.fileList.push({ name: item.attname,status: "success",atturl: item.atturl});
        item.attkey = this.vueFormKey;
        this.$emit("fileInfo", item, "add");
       });
       this.$emit("addAttWatch", this.vueFormKey);
    }
  },

  methods: {
    fileListValidate(rule, value, callback) {
      if (
        this.fileList.length === 0 &&
        this.rules.fileList[0].required == true
      ) {
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
      if (this.fileType) {
        let name = file.name.split(".");
        if (this.fileType != name[name.length - 1]) {
          this.fileList = [];
          this.$message({
            type: "warning",
            message: `只能上传${this.fileType}格式的文件`
          });
          return false;
        }
      }
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
            this.filePath = res.data.path;
            file.status = "success";
            this.fileList.push(file);
            this.$refs.ruleForm.validateField("fileList");
            file.atturl = this.filePath;
            var singleFile = {
              attkey: this.formKey,
              attname: file.name,
              atturl: this.filePath
            };
            this.$emit("fileInfo", singleFile, "add");
          } else {
            this.fileList = [];
            this.$message({
              type: "error",
              message: "上传失败！"
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
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
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.handleRemove(file, fileList);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除!"
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
      this.fileList.forEach((item, index) => {
        if (item.uid === file.uid) {
          this.fileList.splice(index, 1);
        }
      });
      this.$refs.ruleForm.validateField("fileList");
      var singleFile = {
        attkey: this.formKey,
        attname: file.name,
        atturl: file.atturl
      };
      this.$emit("fileInfo", singleFile, "delete");
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
