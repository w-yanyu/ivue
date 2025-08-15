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
          :before-remove="handleBeforeRemove"
          :limit="2"
          :file-list="fileList"
          :auto-upload="false"
        >
          <el-button size="small" type="primary" v-show="fileList.length === 0">{{$i18ns('点击上传')}}</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "SingleUpload",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      ruleForm: {
        fileList: [] // 文件清单
      },
      fileList: [], // 文件清单
      formKey: "", // 需要赋值的外部表单key
      isInvert: false, // 是否需要反显
      fileSize: null, // 文件大小限制  默认10MB
      formLabel: "", // 需要赋值的外部表单Label
      isRequired: false, // 控制必输样式
    };
  },
  created() {
    this.formKey = this.cParentScope.item.toRequest.params.formKey;
    this.formName = this.cParentScope.item.toRequest.params.formName;
    this.isInvert = this.cParentScope.item.toRequest.params.isInvert ? true : false;
    this.fileSize = this.cParentScope.item.toRequest.params.fileSize ? this.cParentScope.item.toRequest.params.fileSize : 10;
    this.formLabel = this.cParentScope.item.toRequest.params.formLabel;
    this.isRequired = this.cParentScope.item.toRequest.params.required ? true : false;
    this.rules = {};
    if (this.cParentScope.parentFormModel[this.formKey] && this.isInvert) {
      this.fileList.push({name: this.cParentScope.parentFormModel[this.formKey], status: "success"})
    }
  },
  methods: {
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
            this.cParentScope.parentFormModel[this.formKey] = res.data.path;
            this.cParentScope.parentFormModel[this.formName] = file.name;
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
      this.fileList.forEach((item, index) => {
        if (item.uid === file.uid) {
          this.fileList.splice(index, 1);
        }
      });
      this.cParentScope.parentFormModel[this.formKey] = "";
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
