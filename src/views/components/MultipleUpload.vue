<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="240px" class="custom-common--form">
      <el-form-item :label="formLabel" prop="fileList" class="upload-item">
        <el-upload
         class="upload-demo"
         :on-change="handleChange"
         :on-remove="handleRemove"
         multiple
         :limit="limit ? limit : limit='5'"
         :file-list="fileList"
         :auto-upload="false">
          <el-button size="small" type="primary">{{$i18ns('点击上传')}}</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "MultipleUpload",
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
      formKey: [], // 需要赋值的外部表单key
      limit: '', // 需要赋值的外部表单limit
      formLabel: '', // 需要赋值的外部表单formLabel
      path: [],
    }
  },
  created() {
    this.formKey = this.cParentScope.item.toRequest.params.formKey;
    this.formLabel = this.cParentScope.item.toRequest.params.formLabel;
    this.limit = this.cParentScope.item.toRequest.params.limit;
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
      let that = this;
      let formData = new FormData();
      formData.append("file", file.raw);
      formData.append("org_id", userInfo.org_id);
      formData.append("path", "PD");
      MyAxios.invokeAPI("/SUMP/icmcall/file", "post", formData).then(res => {
        if (res && res.code === "200") {
          file.status = "success";
          this.fileList.push(file);
          this.$refs.ruleForm.validateField("fileList");
          that.path.push(res.data.path)
          this.cParentScope.parentFormModel[this.formKey] = that.path;
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
      this.path.pop()
      this.cParentScope.parentFormModel[this.formKey] = this.path;
    },
  }
}
</script>
