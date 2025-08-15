<template>
  <div>
    <updatePassword />
    <alert-info :data="alertData" />
  </div>
</template>

<script>
import AlertInfo from "pte-ui/alertInfo";
import UpdatePassword from "../ismt/ct/user/UpdatePassword";
import sha1 from "sha1";
import MyMessage from "pte-ui/utils/MyMessage";


export default {
  name: "FirstPsdUpdate",
  components: {
    AlertInfo,
    UpdatePassword
  },
  created() {
    UpdatePassword.methods.modify = function(formName) {
      let that=this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitForm.user_password = sha1(this.form.user_password);
          this.submitForm.confirm_user_password = sha1(this.form.confirm_user_password);
          this.$http.invokeAPI("/SUMP/rest/auth/chgpwd", "post", this.submitForm)
          .then(response => {
            if (response && response.code === "200") {
              
              // this.$store.dispatch("LogOut", "/SUMP/rest/auth/logout").then(() => {
              //   location.href = location.origin + "/#/login";
              //   location.reload();
              // })
              // location.href = location.origin + "/#/login";
               //#url:"/pte/json/layout/logout.json",
                that.$store
            .dispatch("PTE_USER_LOGOUT", {url:"/SUMP/rest/auth/logout"})
            .then(() => {
              that.$msg({
                type: "success",
                message:this.$i18ns('PTE_logOutSuccess')
              });
              this.timeout = setTimeout(() => {
               location.href = location.origin + "/#/login";
             location.reload(); // 为了重新实例化vue-router对象 避免bug
              }, 1000)
            });
            } else {
              MyMessage({ message: response.message, type: 'error' });
            }
          })
        }
      })
    }
  },
  data() {
    return {
      alertData: {
        description: [
          `<p style='color:red'>${this.$i18ns("PTE_opera_modify_tips")}</p>`
        ],
        listStyle: "disc",
        title: "提示"
      }
    };
  }
}
</script>
 
