<template>
  <div class="login-container">
    <div class="common-box">
      <img :src="loginBackground_C" class="login-background" fit="contain" />
      <div class="content">
        <el-form
          autocomplete="on"
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
          label-position="top"
          label-width="0px"
          class="login-box2"
          @submit.native.prevent
        >
          <el-form-item
            prop="corpno"
            class="input-hover"
            :label="$i18ns('法人代码')"
          >
            <el-input
              name="corpno"
              type="text"
              v-model="loginForm.corpno"
              autocomplete="on"
            />
          </el-form-item>
          <el-form-item
            prop="userid"
            class="input-hover"
            :label="$i18ns('用户')"
          >
            <el-input
              name="userid"
              type="text"
              v-model="loginForm.userid"
              autocomplete="on"
            />
          </el-form-item>
          <el-form-item
            prop="passwd"
            class="input-hover"
            :label="$i18ns('密码')"
          >
            <el-input
              type="password"
              v-model="loginForm.passwd"
              autocomplete="on"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="verify_code"
            class="input-hover position-yam"
            label="验证码"
          >
            <el-input
              v-model="loginForm.verify_code"
              auto-complete="off"
              placeholder="验证码"
              style="width: 63%"
              @keyup.enter.native="handleLogin"
            >
              <svg-icon
                slot="prefix"
                icon-class="validCode"
                class="el-input__icon input-icon"
              />
            </el-input>
            <div class="login-code">
              <img :src="codeUrl" @click="getRiskCode" />
            </div>
          </el-form-item>
          <el-form-item class="loginbutton">
            <el-button
              :loading="loading"
              size="medium"
              type="primary"
              style="width:100%;font-size:16px;"
              @click.native.prevent="riskLogin()"
            >
              <span v-if="!loading">登 录</span>
              <span v-else>登 录 中...</span>
            </el-button>
          </el-form-item>

          <!-- 已有账户选择 -->
          <div class="divider_self" v-if="riskList.length > 0">
            <div class="txt">or</div>
          </div>
          <div class="loginbutton">
            <div
              class="login-btn margin-t-8"
              :loading="loading"
              v-for="(item, i) in riskList"
              :key="i"
              @click="riskLogin(item)"
            >
              <span>{{ item.corpno }}</span>
              <span class="margin-l-12">{{ item.username }} </span>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
// import { isvalidUsername } from 'pte-ui/utils/validate'
import { i18ns } from "pte-ui/utils/i18n";
import SysConfig from "@/pte/sysconfig.json";
import Tools from "pte-ui/utils/Tools";
import loginBackground from "../../../public/login/login_J_background.png";
import loginBackground_C from "../../../public/login/login_C_background.png";
import loginLogo from "../../../public/logo/Sunline_LOGO_en-white.png";
import _ from "lodash";
import userUtil from "pte-ui/utils/userUtil";
import routerUtil from "pte-ui/utils/routerUtil";
import Cookies from "js-cookie";
import axios from "axios";
import JsEncrypt from "jsencrypt";
import sha1 from "sha1";

export default {
  name: "login_J",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对象
  },
  data() {
    const validateCorpno = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.i18ns("请输入法人代码")));
      } else {
        callback();
      }
    };
    const validateUsername = (rule, value, callback) => {
      let reg = /^[a-zA-Z0-9]{1,}$/;
      if (!reg.test(value)) {
        callback(new Error(this.i18ns("login.errorUsername")));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error(this.i18ns("login.errorPassword")));
      } else {
        callback();
      }
    };
    return {
      riskList: [],
      codeUrl: "",
      loginForm: {
        userid: "",
        brchno: "",
        corpno: "",
        passwd: "",
        verify_code: "",
        ui_language: ""
      },
      loginRules: {
        corpno: [
          {
            required: true,
            trigger: "blur",
            validator: validateCorpno
          }
        ],
        userid: [
          {
            required: true,
            trigger: "blur",
            validator: validateUsername
          }
        ],
        passwd: [
          {
            required: true,
            trigger: "blur",
            validator: validatePass
          }
        ],
        verify_code: [
          {
            required: true,
            trigger: "blur",
            message: "验证码不能为空"
          }
        ]
      },
      loading: false,
      loginBackground: loginBackground, // 背景图标
      loginBackground_C: loginBackground_C,
      loginLogo: loginLogo, // logo图标
      title: "", // 标题
      timer: null,
      count: "",
      time_interval: "",
      radioValue: localStorage.getItem("PTE_LANGUAGE_STYLE")
    };
  },
  created() {
    const riskName = Cookies.get("username");
    console.log("riskName===================", riskName);
    console.log("Cookies.get===================", Cookies.get());

    // poc数据，缓存数据登录用户为admin，登录跳转首页
    if (riskName === "admin") {
      this.riskList = [
        {
          corpno: "919",
          username: "admin"
        }
      ];
    }
    this.getRiskCode();
  },
  mounted() {
    document.onkeyup = e => {
      let event = e || window.event;
      let key = event.which || window.charcode || event.keyCode;
      if (key === 13) {
        this.handleLogin();
      }
    };
    this.getRiskCode();
  },
  destroyed() {
    document.onkeyup = null;
  },
  computed: {
    ...mapGetters(["themes"])
  },
  methods: {
    ...mapMutations([
      "PTE_APP_SET_THEME",
      "PTE_APP_SET_LANGUAGE",
      "PTE_SET_HOME_NAME",
      "PTE_TAGSVIEW_SET_HOME_NAME"
    ]),
    i18ns,
    /**
     * 点击登录
     */
    handleLogin() {
      this.loginForm.ui_language = this.$store.state.pte_app.language;
      this.loading = true;
      // 获取动态数据
      let toRequestObj = Tools.resolveToRequest({
        url: "/SUMP/rest/auth/login"
      });
      let req = _.assign(
        { url: toRequestObj.url },
        toRequestObj.params,
        this.loginForm
      );
      this.$store
        .dispatch("PTE_USER_LOGIN", req)
        .then(url => {
          //const cacheUserInfo = localStorage.getItem('user_info')
          //const userInfo = JSON.parse(cacheUserInfo)
          const userInfo = userUtil.get();
          Tools.setUserConfig("userInfo", userInfo);
          Tools.setUserConfig("user_info", userInfo);
          this.name = userInfo.userName;
          let passwdStatus = userInfo.getPassword_status;
          if (passwdStatus === "O") {
            this.$alert("您的密码已过期，请先修改密码");
          }
          let theme = _.find(
            this.themes,
            item => item.value === userInfo.theme
          );
          if (!theme) {
            theme = this.themes[0];
          }
          this.PTE_APP_SET_THEME(theme.theme);
          if (!SysConfig.isShell) {
            // 非壳子登录
            this.getRoutes(url);
            this.$i18n.locale = localStorage.getItem("LANGUAGE_STYLE");
          } else {
            this.$router.push({
              path: url
            });
          }
          this.loading = false;
        })
        .catch(res => {
          this.loading = false;
        });
    },
    getRoutes(url) {
      this.$store
        .dispatch("PET_ROUTERMAP_GETROUTELIST")
        .then(routesMap => {
          const routeData = _.get(routesMap, "data");
          let treeData = Tools.forRoutesData(routeData);
          const root = {
            path: "/",
            redirect: treeData[0].path + "/" + treeData[0].children[0].path,
            hidden: true
          };
          treeData.push(root);
          // 将后台数据转为树形结构
          // localStorage.setItem("ROUTES", JSON.stringify(routeData));
          routerUtil.set(routeData);
          this.$router.addRoutes(treeData);
          this.PTE_TAGSVIEW_SET_HOME_NAME(treeData[0].children[0].name);
          document.getElementById("sunloading").style.display = "none";
          // location.href = url
          this.$router.push({
            path: url
          });
        })
        .catch(e => {});
    },

    /**
     * 请求风控验证码
     * http://10.22.82.38:15080/idm-api/captchaImage
     */
    getRiskCode() {
      const url = "http://10.22.82.38:15080/idm-api/captchaImage";
      axios
        .get(url)
        .then(res => {
          console.log("请求风控登录验证码: ", res);
          this.codeUrl = "data:image/gif;base64," + res.data.img;
          this.loginForm.uuid = res.data.uuid;
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    /**
     * 登录风控系统
     */
    riskLogin(item) {
      console.log("this.loginForm==================", this.loginForm);
      if(item.username) {
        document.getElementById("sunloading").style.display = "block";
        this.loginForm = {
          userid: item.username,
          brchno: "",
          corpno: "985", // 开发写死985，测试写死919
          passwd: sha1("Sunline@300348#"),
          verify_code: "",
          ui_language: ""
        };
        this.handleLogin();
      }else {
        let params = {
          code: this.loginForm.verify_code,
          password: this.loginForm.passwd,
          username: this.loginForm.userid,
          uuid: this.loginForm.uuid
        };
        let url = "http://10.22.82.38:15080/idm-api/login";
        const that = this;
        axios
          .post(url, params)
          .then(res => {
            console.log("请求风控登录: ", res);
            // 风控登陆成功，手动调起我们自己的登录，进入首页
            if (res.data.code === 200) {
              document.getElementById("sunloading").style.display = "block";
              that.loginForm = {
                userid: that.loginForm.userid,
                brchno: "",
                corpno: that.loginForm.corpno,
                passwd: sha1("Sunline@300348#"),
                verify_code: "",
                ui_language: ""
              };
              that.handleLogin();
            }
          })
          .catch(err => {
            console.log("err", err);
          });
      }
      
    }
  }
};
</script>
<style lang="less" scoped>
// .brchno_select {
//     width: 90%;
// }
// .brchno_select >>> .el-input--medium {
//     width: 100%;
// }
/deep/ .position-yam .el-form-item__content {
  display: flex;
  .el-button {
    color: rgba(255, 255, 255, 0.8);
    margin-right: 10px;
    line-height: 42px;
    &:hover {
      color: rgba(255, 255, 255, 0.8) !important;
    }
  }
}
.login-container {
  .login-logoen {
    position: absolute;
    left: 1vw;
    top: 1vh;
    height: 5vh;
    z-index: 1;
  }
  .svg-container {
    margin-top: 0px !important;
    color: #b4caf7 !important;
  }

  /deep/ .el-form-item {
    border: none !important;
    box-shadow: none !important;
    margin-bottom: 24px !important;
    background: none;
  }
  /deep/ .el-input {
    height: 42px;
    line-height: 42px;
    .el-input__inner {
      color: #000 !important;
      // -webkit-text-fill-color: #000 !important;
      padding: 0 8px 0 16px !important;
      height: 42px;
      line-height: 42px;
      &::placeholder {
        font-size: 14px;
        color: #93969e !important;
      }
    }
  }
  .input-hover {
    width: 70%;
    // height: 65px;
    background: none;
    border: 1px solid #e9e9e9;
    /deep/ .el-form-item__label {
      font-size: 16px;
      line-height: 16px;
      color: #1a1a1a;
    }
    /deep/ .el-form-item__content {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #999999;
      margin-bottom: 10px;
    }
  }
}
.el-radio {
  color: #fff !important;
  font-size: 18px;
}

.center-div {
  position: absolute;
  width: 40%;
  height: 80%;
  right: 10%;
  margin: auto;
  top: 10%;
  background: none;
  // box-shadow: 3px 3px 5px gray, -3px -3px 5px gray;
  // border-radius: 20px 0 0 20px;
}

.withd-flex {
  background: none;
  border-radius: 0 10px 10px 0;
  height: 100%;
  position: relative;
  .title {
    height: 56px;
    font-size: 32px;
    color: #1d2129 !important;
    font-weight: bold;
    font-family: HarmonyOS Sans SC;
    margin-bottom: 35px;
    text-shadow: none !important;
  }
  .left_content {
    position: absolute;
    left: 0;
    bottom: 0;
    margin: 1em;
  }
}
.no_bg_bottom {
  background: none;
}
.small-background {
  width: 100%;
  height: 100%;
}
.login-box {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title-text {
  font-size: 28px;
  color: #2d2a98;
  font-weight: bold;
}
.title-text-small {
  font-size: 20px;
  color: #737373;
  margin-bottom: 30px;
}

/deep/ .el-radio__inner {
  border: 1px solid #4286f0;
}
/deep/ .el-form .el-radio {
  margin: 0px 0px 0px 4px !important;
}
/deep/ .el-radio__label {
  padding-left: 6px;
  color: #1890ff;
}
.password {
  margin-bottom: 0px !important;
}
.form-icon {
  font-size: 20px;
  padding: 0 0 0 12px;
}
/deep/ .show-pwd {
  color: #c0c4cc !important;
}
/deep/ .el-input__inner:-webkit-autofill {
  -webkit-text-fill-color: #000 !important;
}
.el-icon-lock:before {
  color: #bdc7f6;
}
.login-btn {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 16px;
  width: 26vw;
  font-family: HarmonyOS Sans SC;
  color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  background: #4c8eda;
  height: 6vh;
}

.common-box {
  .login-box2 {
    background: #ffffff;
    width: 40%;
    border-radius: 4px;
    height: 70%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 36px 20px;
  }
}
.divider_self {
  margin: 36px auto 35px;
  width: 90%;
  background-color: #c3c8d0;
  height: 0.7px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  .txt {
    width: 144px;
    height: 24px;
    font-size: 24px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8c8ea5;
    line-height: 24px;
    background-color: #ffffff;
    text-align: center;
  }
}
.user-box {
  width: 60%;
  background: #ffffff;
  border: 1px solid #efefef;
  padding: 8px 16px;
  border-radius: 4px;
}
</style>
