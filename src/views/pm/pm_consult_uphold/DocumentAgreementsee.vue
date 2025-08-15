<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="custom-common--form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="合作商合同编号" prop="cortno" class="upload-item">
            <el-input v-model="ruleForm.cortno" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合作方名称" prop="ofpacd" class="upload-item">
            <el-input v-model="ruleForm.ofpacd" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="文件清单" prop="fileList" class="upload-item custom-item--required">
            <el-upload
             class="upload-demo"
             :on-change="handleChange"
             :on-remove="handleRemove"
             multiple
             :limit="5"
             :file-list="fileList"
             :auto-upload="false">
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<div class="custom-common&#45;&#45;footer">-->
        <!--<el-button type="primary" size="small" @click="submit"  plain>{{$i18ns('保存')}}</el-button>-->
        <!--<el-button size="small" @click="cancel">{{$i18ns('取消')}}</el-button>-->
      <!--</div>-->
    </el-form>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import * as _ from "lodash";

export default {
  name: "DocumentAgreementsee",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  created() {
    this.ruleForm.cortno = this.cParentParams.cortno;
    this.ruleForm.ofpacd = this.cParentParams.ofpacd;
    this.fileInit();
  },
  data() {
    return {
      ruleForm: {
        cortno: "", // 合作商合同编号
        ofpacd: "", // 合作方名称
        fileList: [], // 文件清单
      },
      fileList: [], // 文件清单
      rules: {
        cortno: [
          { required: true, message: "请输入合作商合同编号" }
        ],
        ofpacd: [
          { required: true, message: "请输入合作方名称" }
        ],
        fileList: [
          { validator: this.fileListValidate, trigger: 'change' }
        ],
      },
      fileList: [], // 文件对象
    }
  },
  methods: {
    /**
     * 文件清单初始化
     */
    fileInit() {
      let params = {
        cortno: this.cParentParams.cortno,
        servicecode: "qrfile",
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          res.data.forEach(item => {
            this.fileList.push({ name: item.initna, status: "success" });
            this.ruleForm.fileList.push({ fileName: item.filena, filePath: item.filepa, initName: item.initna });
          });
        }
      }).catch(err => {
        console.error(err);
      })
    },
    /**
     * 文件上传自定义校验事件
     */
    fileListValidate(rule, value, callback) {
      if (this.fileList.length === 0) {
        return callback(new Error("请上传文件清单"));
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
      formData.append("path", "PD");
      MyAxios.invokeAPI("/SUMP/icmcall/file", "post", formData).then(res => {
        if (res && res.code === "200") {
          file.status = "success";
          this.fileList.push(file);
          this.ruleForm.fileList.push({ fileName: res.data.filename, filePath: res.data.path, initName: file.name });
          this.$refs.ruleForm.validateField("fileList");
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
          this.ruleForm.fileList.splice(index, 1);
          this.fileList.splice(index, 1);
        }
      });
      this.$refs.ruleForm.validateField("fileList");
    },
    /**
     * 表单提交
     */
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            servicecode: "AS_IPMS_PT_PUFILE",
            cortno: this.ruleForm.cortno,
            ofpacd: this.ruleForm.ofpacd,
            fileList: _.cloneDeep(this.ruleForm.fileList),
          }
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
            if (res && res.code === "200") {
              this.$message({
                type: "success",
                message: "操作成功"
              })
              this.$emit("update", {});
            }
          }).catch(err => {
            console.error(err)
          })
        } else {
          this.$message({
            type: "warning",
            message: "校验不通过"
          })
        }
      })
    },
    cancel() {
      function getDialogScope(self) {
        if (self.$parent.$el.className === "el-dialog__wrapper") {
          return self.$parent;
        } else {
          return getDialogScope(self.$parent);
        }
      }
      let self = getDialogScope(this);
      self.$parent.editDialogVisible = false;
    }

  }
}
</script>
<style lang="less" scoped>
/deep/.custom-common--form {
  .upload-item {
    .el-form-item__content {
      width: calc(100% - 120px);
    }
  }
}

</style>
