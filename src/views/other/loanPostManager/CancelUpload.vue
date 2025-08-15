<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="240px"
      class="custom-common--form"
      :class="{'require-sign': isRequired}"
    >
      <el-form-item :label="formLabel" class="upload-item--uploadCheckout" v-show="!uploadShow">
        <el-button size="small" type="primary" v-if="fileList.length === 0" @click="uploadCheckout" class="item-uploadCheckout--input">授权校验</el-button>
      </el-form-item>
      <el-form-item :label="formLabel"  prop="fileList" class="upload-item--upload" v-show="uploadShow">
        <el-upload
          class="upload-demo"
          :on-change="handleChange"
          :before-remove="handleBeforeRemove"
          :limit="2"
          :file-list="fileList"
          :auto-upload="false"
          v-model="ruleForm.fileList"
        >
          <el-button size="small" type="primary" v-show="fileList.length === 0" ref="upload">{{$i18ns('点击上传')}}</el-button>
        </el-upload>
      </el-form-item>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogShow"
        width="70%"
        :before-close="handleClose"
        v-show="dialogShow"
        >
            <el-form :rules="rulesDialog" ref="form" :model="auth_info" label-width="160px" class="dialog-form--checkout">
                <el-form-item class="permis-form--item" :label="auth_name" prop="auth_name">
                    <el-input :placeholder="auth_name_place" v-model="auth_info.auth_name" class="permis-form--nameitem"></el-input>
                </el-form-item>
                <el-form-item class="permis-form--item" :label="auth_pass" prop="auth_pass">
                    <pte-password v-model="auth_info.auth_pass"
                        :type="pwdType"
                        :encryptionType="SHA"
                        :placeholder="auth_pass_place"
                        :min="5"
                        autocomplete="on"
                        ref="ptePassClear"
                        ></pte-password>
                </el-form-item>
            </el-form>
            <el-table :data="auth_reason" height="200" border>
              <el-table-column prop="auth_reason_type" :label="auth_reason_type" width="100" />
              <el-table-column prop="auth_reason_id" :label="auth_reason_id" width="80" />
              <el-table-column prop="auth_reason_desc" :label="auth_reason_desc"/>
              <el-table-column prop="trxn_amt" :label="trxn_amt"/>
              <el-table-column prop="auth_role_list" :label="auth_role_list"/>
            </el-table>
            <div class="permis-footer">
                <el-button type="primary" @click="checkoutSubmit">提交授权</el-button>
                <el-button @click="clickCancel">{{$i18ns('取消')}}</el-button>
            </div>
      </el-dialog>
    </el-form>

  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import i18n from 'pte-ui/i18ns' // 国际化

export default {
  name: "CancelUpload",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
    vueFormLabel: { type: String }, //vue父文件传递标签
    vueFormKey: { type: String }, //vue父文件传递key
    ifRequire: { type: Boolean }, //vue父文件定义是否必须
  },
  data() {
    return {
      ruleForm: {
        fileList: [] // 文件清单
      },
      fileList: [], // 文件清单
      rules: {
        fileList: [
          {
            validator: this.fileListValidate,
            trigger: "change",
            required: false
          }
        ]

      },
      rulesDialog: {
        auth_name: [
          { required: true, message: i18n.t("permission.auth_name_msg"), trigger: 'blur' },
          { max: 32, message: '至多输入32个字符', trigger: 'blur' }
        ],
        auth_pass: [
          { required: true, message: i18n.t("permission.auth_pass_msg"), trigger: 'blur' },
          { validator: this.authPassValidate, trigger: 'blur' }
        ]
      }, //弹框校验必输
      formKey: "", // 需要赋值的外部表单key
      isInvert: false, // 是否需要反显
      formLabel: "", // 需要赋值的外部表单Label
      isRequired: false, // 控制必输样式
      dialogShow: false, //点击文件上传弹窗显示
      uploadShow: false, //文件上传按钮显示
      auth_name: i18n.t("permission.auth_name"), //弹框页面字段
      auth_pass: i18n.t("permission.auth_pass"),
      dialogTitle: i18n.t("permission.dialog_title"),
      auth_reason_type: i18n.t("permission.auth_reason_type"),
      auth_reason_id: i18n.t("permission.auth_reason_id"),
      auth_reason_desc: i18n.t("permission.auth_reason_desc"),
      ccy_code: i18n.t("permission.ccy_code"),
      trxn_amt: i18n.t("permission.trxn_amt"),
      auth_role_list: i18n.t("permission.auth_role_list"),
      auth_name_place: i18n.t("permission.auth_name_place"),
      auth_pass_place: i18n.t("permission.auth_pass_msg"),
			auth_reason: [],
			auth_info: {
				auth_name: '',
				auth_pass: ''
      },
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
    }
  },
  created() {
    this.listData()
    if (this.cParentScope) {
      this.formKey = this.cParentScope.item.toRequest.params.formKey;
      this.isInvert = this.cParentScope.item.toRequest.params.isInvert ? true : false;
      this.formLabel = this.cParentScope.item.toRequest.params.formLabel;
      this.isRequired = this.cParentScope.item.toRequest.params.required ? true : false;
      this.rules = {};
      if (this.cParentScope.parentFormModel[this.formKey] && this.isInvert) {
        this.fileList.push({name: this.cParentScope.parentFormModel[this.formKey], status: "success"})
      }
    } else {
      this.formKey = this.vueFormKey;
      this.formLabel = this.vueFormLabel;
      this.rules.fileList[0].required = this.ifRequire;
    }
  },

  methods: {
    /*
    * 校验页面
    */
    uploadCheckout() {
      this.dialogShow = true;
    },
    /**
     * 密码长度校验
     * @param rule 校验规则
     * @param value 表单当前值
     * @param callback 提示信息回调
     */
    authPassValidate(rule, value, callback) {
      if (this.$refs.ptePassClear.password.length > 32) {
        return callback(new Error("至多输入32个字符"));
      }
      return callback();
    },
    /*
    * 校验提交
    */
    checkoutSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          let params = {
            auth_name : this.auth_info.auth_name,
            auth_pass : this.auth_info.auth_pass,
            auth_role_list : this.auth_reason[0].auth_role_list
          }
          let that = this;
          this.$http.invokeAPI("/SUMP/rest/auth/checkAuth", "post", params).then(response => {
            if (response.code === "200") {
              this.$message({
                type: 'success',
                message: '校验成功!'
              });
              this.$nextTick(() => {
                this.dialogShow = false;
                this.uploadShow = true;
                that.resetForm("form");
              })
            } else {
              this.$message({
                type: 'error',
                message: '校验失败!'
              });
              that.resetForm("form");
              this.dialogShow = false;
              this.uploadShow = false;
            }
          });
        }
      });
    },
    /*
    * 校验取消
    */
    clickCancel() {
       this.dialogShow = false;
       this.resetForm("form");
    },
    /*
    * 请求表格数据
    */
    listData() {
      let params = {
        recon_code : "PLMSKGSS0012",
        servicecode : "ct2106"
      }
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.auth_reason = res.data.auth_info
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    fileListValidate(rule, value, callback) {
      if (this.cParentScope) {
        if (this.fileList.length === 0) {
          return callback(new Error("请上传文件"));
        }
        return callback();
      } else {
        if (this.fileList.length === 0 &&this.rules.fileList[0].required == true) {
          return callback(new Error("请上传文件"));
        }
        return callback();
      }
    },
    /*
    * 清除表单
    */
    resetForm(formName) {
      this.$refs["form"].resetFields();
      this.$refs.ptePassClear.password = '';
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
      MyAxios.invokeAPI("/SUMP/icmcall/file", "post", formData)
        .then(res => {
          if (res && res.code === "200") {
            file.status = "success";
            this.fileList.push(file);
            this.$refs.ruleForm.validateField("fileList");
            //json文件调用和vue文件调用返回不同的值
            if (this.cParentScope) {
              this.cParentScope.parentFormModel[this.formKey] = res.data.path;
            } else {
              this.$emit("fileStatu", this.formKey, res.data.path, true);
            }
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
      this.$refs.ruleForm.validateField("fileList");
      if (this.cParentScope) {
        this.cParentScope.parentFormModel[this.formKey] = "";
      } else {
        this.$emit("fileStatu", this.formKey, "", false);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.el-form.custom-common--form {
  padding: 0;
  .upload-item--uploadCheckout {
    position: relative;
    z-index: 100;
    .item-uploadCheckout--input {
      width: 142px;
      height: 32px;
    }
  }
  .upload-item--upload {
    position: absolute;
    top: 0;
    left: 112px;
  }
}
.require-sign.custom-common--form {
  /deep/.el-form-item__label:before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
}
.dialog-form--checkout {
  height: 120px;
}
/deep/ .el-dialog {
  .el-dialog__header {
    .el-dialog__title {
      float: left;
    }
  }
}
/deep/ .permis-form--item {
    height: 34px;
    margin-bottom: 16px;
    .el-form-item__label {
        padding: 0 8px 0 0;
        font-size: 14px;
        line-height: 32px;
        color: #697b8c;
    }
    .permis-form--nameitem {
      width: 240px;
      line-height: 12px;
      input {
        float: left;
      }
    }
    .el-form-item__content {
        width: 300px;
        .el-input__inner {
            width: 300px;
            height: 32px;
        }
    }
}
.permis-footer {
    width: 100%;
    padding: 12px 0 0 0;
    display: inline-block;
    text-align: center;
}
</style>
