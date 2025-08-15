<template>
  <div>
    <el-form :model="form" :rules="rules" ref="ruleForm" class="update-password">
      <el-form-item :label="translate('YfaGCB')" label-width="240px" prop="user_password">
        <el-input
          class="update-password--input"
          v-model="form.user_password"
          type="password"
          placeholder=" "
          :min="6"
          autocomplete="on"
          @change="submitForm.user_password = rsaEncryp(form.user_password)">
        </el-input>
      </el-form-item>
      <el-form-item :label="translate('pawaGCB')" label-width="240px" prop="new_user_password">
        <el-input
          class="update-password--input"
          v-model="form.new_user_password"
          type="password"
          @change="submitForm.new_user_password = rsaEncryp(form.new_user_password)">
        </el-input>
      </el-form-item>
      <el-form-item :label="translate('GuKkaGCB')" label-width="240px" prop="confirm_user_password">
        <el-input
          class="update-password--input"
          v-model="form.confirm_user_password"
          type="password"
          @change="submitForm.confirm_user_password = rsaEncryp(form.confirm_user_password)">
        </el-input>
      </el-form-item>
      <el-form-item class="update-password--footer">
        <el-button class="update-password--confirm" type="primary" plain @click="modify('ruleForm')">{{translate('LupS')}}</el-button>
        <el-button class="update-password--cancel" plain @click="resetForm('ruleForm')">{{translate('riFm')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import JsEncrypt from 'jsencrypt'
import MyMessage from 'pte-ui/utils/MyMessage'
import sha1 from 'sha1'
import i18n from 'pte-ui/i18ns'

export default {
  name: "updatePassword",
  data() {
    let checkNew = (rule, value, callback) => {
      if (value.length < 8 || value.length > 16) {
        return callback(new Error(i18n.t("errorPsdLength")));
      }
      if (this.form.new_user_password !== "" && value === this.form.user_password) {
        return callback(new Error(i18n.t("samePsd")));
      }
      callback();
    }
    let checkConfirm = (rule, value, callback) => {
      if (value.length < 8 || value.length > 16) {
        return callback(new Error(i18n.t("errorPsdLength")));
      }
      if (this.form.confirm_user_password !== "" && value !== this.form.new_user_password) {
        return callback(new Error(i18n.t("differentPsd")));
      }
      this.$refs["ruleForm"].validateField('new_user_password');
      callback();
    }
    return {
      publicKey: "",
      submitForm: {
        servicecode: "ct2009",
        user_password: "",
        new_user_password: "",
        confirm_user_password: ""
      },
      form: {
        new_user_password: "",
        confirm_user_password: "",
        user_password: ""
      },
      rules: {
        user_password: [
          { required: true, message: i18n.t('KLTYWlYfaGCB'), trigger: 'blur' }
        ],
        new_user_password: [
          { required: true, message: i18n.t('KLTYWlpawaGCB'), trigger: 'blur' },
          { validator: checkNew, trigger: 'blur' }
        ],
        confirm_user_password: [
          { required: true, message: i18n.t('KGuKkaGCB'), trigger: 'blur' },
          { validator: checkConfirm, trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getPublicKey();
  },
  methods: {
    /**
     * 获取rsa加密的公钥
     */
    getPublicKey() {
      this.$http.invokeAPI("SUMP/rest/auth/getKey", "post")
      .then(response => {
        if (response && response.code === "200") {
          this.publicKey = response.data.key;
        } else {
          MyMessage({ message: response.message, type: 'error' });
        }
      })
    },
    /**
     * rsa加密
     * @param password 加密前密码
     */
    rsaEncryp(password) {
      if (password === "") {
        return password;
      }
      let jse = new JsEncrypt();
      jse.setPublicKey("-----BEGIN PUBLIC KEY-----" + this.publicKey + "-----END PUBLIC KEY-----");
      return jse.encrypt(password);
    },
    /**
     * 密码重置提交
     * @param formName 表单名称
     */
    modify(formName) {
      let t = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.submitForm.user_password = sha1(this.form.user_password);
          // this.submitForm.confirm_user_password = sha1(this.form.confirm_user_password);
          this.$http.invokeAPI("/SUMP/rest/auth/chgpwd", "post", this.submitForm)
          .then(response => {
            if (response && response.code === "200") {
              MyMessage({ message: response.message, type: 'success' });
              t.resetForm(formName);
            } else {
              MyMessage({ message: response.message, type: 'error' });
            }
          })
        }
      })
    },
    /**
     * 重置表单输入
     * @param formName 表单名称
     */
    resetForm(formName) {
      let inputPsd = document.querySelectorAll(".update-password--input input");
      this.$refs[formName].resetFields();
      inputPsd[0].value = ""
    },
    /**
     * 国际化
     * @param key 国际化json文件对应的key
     */
    translate(key) {
      return i18n.t(key);
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .update-password {
  padding-top: 36px;
  .el-form-item {
    height: 34px;
    margin-bottom: 16px;
  }
  .update-password--input {
    width: 372px;
    .el-input__inner {
      height: 32px;
    }
  }
  .el-form-item__label {
    padding: 0 8px 0 0;
    font-size: 14px;
    line-height: 32px;
    word-break: break-word;
    color: #697b8c;
  }
}
.update-password--footer {
  text-align: center;
}
</style>
