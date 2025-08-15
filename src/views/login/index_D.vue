<template>
  <div class="login-container" v-if="loginShow">
    <img :src="loginBackground" class="login-background" fit="contain" />
    <img :src="loginLogo" class="login-logoen" />

    <div class="center-div">
      <el-form
        autocomplete="on"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="left"
        label-width="0px"
        class="login-box"
        @submit.native.prevent
      >
        <h3 class="title">{{ title }}</h3>
        <el-form-item prop="corpno" class="input-hover">
          <div class="form-icon">
            <!-- <i class="el-icon-s-check" style="color: rgb(108, 160, 255)"/> -->
            <img :src="iconCorpno" />
          </div>
          <el-input
            name="corpno"
            type="text"
            v-model="loginForm.corpno"
            autocomplete="on"
            :placeholder="$i18ns('法人代码')"
          />
        </el-form-item>
        <el-form-item prop="userid" class="input-hover">
          <span class="form-icon">
            <!-- <i class="el-icon-s-custom" style="color: rgb(108, 160, 255)"/> -->
            <img :src="iconUserid" />
          </span>
          <el-input
            name="userid"
            type="text"
            v-model="loginForm.userid"
            autocomplete="on"
            :placeholder="login_username"
          />
        </el-form-item>
        <!-- <el-form-item prop="brchno" class="input-hover">
                    <span class="svg-container svg-container_login">
                        <i class="icon-loginUser"></i>
                    </span>
                    <el-input
                        name="brchno"
                        type="text"
                        v-model="loginForm.brchno"
                        autocomplete="on"
                        placeholder="机构编号"
                    />
                    <div style="width:100%">
                        <el-select
                            v-model="loginForm.brchno"
                            placeholder="机构编号"
                            @change="changeValue"
                            class="brchno_select"
                        >
                            <el-option
                                v-for="item in branch_list"
                                :key="item.brchno"
                                :label="item.brchno"
                                :value="item"
                            >
                                <span style="float: left">{{item.corpno}}-{{item.brchno}}</span>
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>-->
        <el-form-item prop="passwd" class="input-hover">
          <span class="form-icon">
            <!-- <i class="el-icon-lock" style="color: rgb(108, 160, 255)"/> -->
            <img :src="iconPasswd" />
          </span>
          <pte-password
            v-model="loginForm.passwd"
            name="password"
            :type="pwdType"
            encryptionType="SHA"
            :min="1"
            :placeholder="login_password"
            autocomplete="on"
          ></pte-password>
          <span class="show-pwd" @click="showPwd">
            <span class="iconfont icon-yanjing1" v-show="isShowPwd"></span>
            <span class="iconfont icon-see" v-show="iseye"></span>
          </span>
        </el-form-item>
        <el-form-item
          v-if="is_open"
          prop="verify_code"
          class="input-hover position-yam"
        >
          <span class="svg-container">
            <i class="el-icon-mobile-phone" style="color: rgb(108, 160, 255)" />
          </span>
          <el-input
            type="text"
            v-model="loginForm.verify_code"
            autocomplete="off"
            placeholder="验证码"
          />
          <el-popover placement="bottom" trigger="click" v-model="visible">
            <slide-verify
              :l="42"
              :r="10"
              :w="310"
              :h="155"
              :imgs="picArray"
              ref="slideverify"
              slider-text="向右滑动完成验证"
              @success="sendSms"
            />
            <el-button slot="reference" type="text" @click="getSms">{{
              codeShow ? "获取验证码" : `${count}秒后重试`
            }}</el-button>
          </el-popover>
        </el-form-item>
        <el-form-item class="no_bg" prop="ui_language">
          <el-row class="lanBlock">
            <el-col>
              <!-- <el-dropdown trigger="click" @command="handleCommand">
                                <span class="el-dropdown-link">
                                    {{langName}}
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="zh">中文</el-dropdown-item>
                                    <el-dropdown-item command="en">English</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown> -->
              <el-radio
                v-model="radioValue"
                label="zh"
                @input="handleChange"
                class="radio-el"
                >{{ $i18ns("home.chinese") }}</el-radio
              >
              <el-radio
                v-model="radioValue"
                label="en"
                @input="handleChange"
                class="radio-el"
                >{{ $i18ns("home.english") }}</el-radio
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            :loading="loading"
            @click.native.prevent="handleLogin"
            >{{ $i18ns("logIn") }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <div class="login-foot">{{ $i18ns(footLabel || "home.footLabel") }}</div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
// import { isvalidUsername } from 'pte-ui/utils/validate'
import { i18ns } from "pte-ui/utils/i18n";
import SysConfig from "@/pte/sysconfig.json";
import Tools from "pte-ui/utils/Tools";
import loginBackground from "../../../public/login/login_D_background.png";
import loginLogo from "../../../public/logo/Sunline_LOGO_en-white.png";
import loginImg from "../../../public/login/login_C_img.png";
import _ from "lodash";
import userUtil from "pte-ui/utils/userUtil";
import routerUtil from "pte-ui/utils/routerUtil";
import Cookies from "js-cookie";
import axios from "axios";

export default {
  name: "login",
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
      //branch_list : [],
      login_username: this.i18ns("username"),
      login_password: this.i18ns("password"),
      loading: false,
      pwdType: "password",
      langName: this.checkInitLanguage(),
      isShowPwd: true,
      iseye: false,
      loginBackground: loginBackground, // 背景图标
      loginLogo: loginLogo, // logo图标
      loginImg,
      title: "", // 标题
      footLabel: "", // 末尾文字
      position: "", // 展示位置
      visible: false,
      is_open: false, // 是否开启双重验证
      timer: null,
      codeShow: true,
      count: "",
      time_interval: "",
      radioValue: localStorage.getItem("PTE_LANGUAGE_STYLE"),
      picArray: [
        require("@/assets/verify-img/1.jpg"),
        require("@/assets/verify-img/2.jpg"),
        require("@/assets/verify-img/3.jpg"),
        require("@/assets/verify-img/4.jpg"),
        require("@/assets/verify-img/5.jpg")
      ],
      iconCorpno: require("@/assets/icon/icon-corpno.png"),
      iconUserid: require("@/assets/icon/icon-userid.png"),
      iconPasswd: require("@/assets/icon/icon-passwd.png"),
      loginShow: false,
    };
  },
  created() {
    //获取接收到的数据
    let cookies_token = Cookies.get("accessToken");
    if (cookies_token) {
      this.singleLogin(cookies_token);
    } else {
      this.loginShow = true;
      document.getElementById('sunloading').style.display = 'none'
      this.getSysName();
      this.login_username = this.i18ns("username");
      this.login_password = this.i18ns("password");
      this.loginForm.userid = "";
      this.getVerifySwitchStatus();
    }
  },
  mounted() {
    document.onkeyup = e => {
      let event = e || window.event;
      let key = event.which || window.charcode || event.keyCode;
      if (key === 13) {
        this.handleLogin();
      }
    };
    this.judgeCode();
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
    getSysName() {
      // 初始化根据系统当前语言默认系统名称
      const defaultLang = localStorage.getItem("PTE_LANGUAGE_STYLE");

      if (defaultLang === "zh") {
        this.title =
          JSON.parse(localStorage.getItem("title_Zhname")) ||
          this.i18ns("title");
        document.title =
          JSON.parse(localStorage.getItem("title_Zhname")) ||
          this.i18ns("title");
      } else {
        this.title =
          JSON.parse(localStorage.getItem("title_Enname")) ||
          this.i18ns("title");
        document.title =
          JSON.parse(localStorage.getItem("title_Enname")) ||
          this.i18ns("title");
      }
    },
    getVerifySwitchStatus() {
      this.$http.core(
        res => {
          this.is_open = res.data.is_open;
          this.time_interval = res.data.time_interval;
        },
        err => {
          console.log(err);
        },
        "/SUMP/rest/auth/getVerifySwitchStatus",
        "get"
      );
    },
    getSms() {
      if (!this.codeShow) {
        this.visible = true;
      } else {
        this.$refs.loginForm.validateField(["userid", "corpno"], valid => {
          if (valid) {
            this.visible = true;
          }
        });
      }
    },
    sendSms(times) {
      // console.log(times);
      this.$http.core(
        res => {
          if (res.code === "200") {
            if (!this.timer) {
              this.count = this.time_interval;
              this.codeShow = false;
              this.timer = setInterval(() => {
                if (this.count > 0 && this.count <= this.time_interval) {
                  this.setStorage(this.count);
                  this.count--;
                } else {
                  this.codeShow = true;
                  clearInterval(this.timer);
                  this.timer = null;
                }
              }, 1000);
            }
            this.visible = false;
            this.$refs.slideverify.reset();
            this.$message.success("短信验证码发送成功，3分钟内有效");
          } else {
            this.visible = false;
            this.$refs.slideverify.reset();
          }
        },
        err => {
          console.log(err);
          this.visible = false;
          this.$refs.slideverify.reset();
        },
        "/SUMP/rest/auth/sendVerificationCode",
        "post",
        {
          userid: this.loginForm.userid,
          ui_language: "zh",
          corpno: this.loginForm.corpno
        }
      );
    },
    setStorage(parm) {
      localStorage.setItem("sms_dalay", parm);
      localStorage.setItem("sms_time", new Date().getTime());
    },
    judgeCode() {
      const sms_dalay = localStorage.getItem("sms_dalay");
      const sms_time = localStorage.getItem("sms_time");
      const secTime = parseInt((new Date().getTime() - sms_time) / 1000);
      if (secTime > sms_dalay) {
        this.codeShow = true;
      } else {
        const TIME_COUNT = sms_dalay - secTime;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.codeShow = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.setStorage(this.count);
              this.count--;
            } else {
              this.codeShow = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000);
        }
      }
    },
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
        this.isShowPwd = false;
        this.iseye = true;
      } else {
        this.pwdType = "password";
        this.isShowPwd = true;
        this.iseye = false;
      }
    },
    changeValue(item) {
      this.loginForm.org_id = item.org_id;
      this.loginForm.brchno = item.brchno;
    },
    /**
     * 点击登录
     */
    handleLogin() {
      this.loginForm.ui_language = this.$store.state.pte_app.language;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
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
        } else {
          this.loading = false;
          return false;
        }
      });
    },
   /**
     * 单点登录
     */
    singleLogin(data) {
      const url = "/SUMP/rest/auth/ssoClientLogin?access_token=" + data;
      axios
        .post(url)
        .then(response => {
          // 处理响应
          this.$store.commit('PTE_USER_SET_LOGIN_INFO', response.data)
          const userInfo = response.data.data.user_info;

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
            this.getRoutes('/dashboard');
            this.$i18n.locale = localStorage.getItem("LANGUAGE_STYLE");
          } else {
            document.getElementById('sunloading').style.display = 'none'
            this.$router.push({
              path: '/dashboard'
            });
          }
        })
        .catch(error => {
          this.loginShow = true;
          document.getElementById('sunloading').style.display = 'none'
          // 处理错误
          this.$message({
            type: "error",
            message: "token无效！"
          });
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
          document.getElementById('sunloading').style.display = 'none'
          // location.href = url
          this.$router.push({
            path: url
          });
        })
        .catch(e => {});
    },
    handleCommand(command) {
      this.lang = command;
      this.PTE_APP_SET_LANGUAGE(command);
      this.$i18n.locale = command;
      if (command === "en") {
        this.langName = this.i18ns("home.english");
      } else {
        this.langName = this.i18ns("home.chinese");
      }
      //
      this.login_username = this.i18ns("username");
      this.login_password = this.i18ns("password");
    },
    checkInitLanguage() {
      const lang = this.$store.state.pte_app.language;
      // const lang = "zh"; //设置默认语言环境为英语
      this.PTE_APP_SET_LANGUAGE(lang);
      this.$i18n.locale = lang;
      if (lang === "en") {
        return this.i18ns("home.english");
      } else {
        return this.i18ns("home.chinese");
      }
    },
    handleChange() {
      this.lang = this.radioValue;
      this.PTE_APP_SET_LANGUAGE(this.radioValue);
      this.$i18n.locale = this.radioValue;
      if (this.radioValue === "en") {
        this.langName = this.i18ns("home.english");
      } else {
        this.langName = this.i18ns("home.chinese");
      }
      this.getSysName();
      this.login_username = this.i18ns("username");
      this.login_password = this.i18ns("password");
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
.el-radio {
  color: #fff !important;
  font-size: 18px;
}
.login-logoen {
  position: absolute;
  left: 3vw;
  top: 3vh;
  height: 5vh;
}
.center-div {
  position: absolute;
  width: 30%;
  height: 60%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: 1px solid #bcbcbc;
  margin: auto;
  background-color: #ffffff;
  // box-shadow: 7px 0px 24px 0px #173743;
  border-radius: 40px;
}
.withd-flex1 {
  flex: 1.2;
  height: 100%;
  position: relative;
  .left_content {
    position: absolute;
    left: 0;
    bottom: 0;
    margin: 1em;
  }
}
.withd-flex2 {
  flex: 1;
  height: 100%;
  position: relative;
  .left_content {
    position: absolute;
    left: 0;
    bottom: 0;
    margin: 1em;
  }
}
.small-background {
  width: 100%;
  height: 100%;
}
.login-box {
  position: relative;
  width: 80%;
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
.title {
  height: 56px;
  font-size: 24px;
  color: #1d2129 !important;
  font-weight: bold;
  font-family: HarmonyOS Sans SC;
  margin-bottom: 35px;
  text-shadow: none !important;
}
.input-hover {
  width: 70%;
  height: 45px;
  background: #ffffff;
  border: 1px solid #e9e9e9;
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
/deep/ .input-hover .el-form-item__content {
  width: 100%;
  background-color: #fff !important;
  border-radius: 4px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #e9e9e9;
  margin-bottom: 20px;
  // box-shadow: 0px 3px 5px #11528a inset;
}
/deep/ .el-form-item {
  border: none !important;
  box-shadow: none !important;
  margin-bottom: 24px !important;
}
.password {
  margin-bottom: 0px !important;
}
/deep/ .login-container .svg-container {
  margin-top: 0px !important;
  color: #b4caf7 !important;
}
.form-icon {
  font-size: 20px;
  padding: 0 0 0 12px;
}

/deep/ .show-pwd {
  color: #c0c4cc !important;
}
/deep/ .el-input .el-input__inner {
  height: 48px !important;
  line-height: 48px !important;
  color: #000 !important;
  // -webkit-text-fill-color: #000 !important;
  padding: 0 8px 0 16px !important;
  &::placeholder {
    font-family: PingFang SC;
    font-size: 14px;
    color: #c0c5cd !important;
  }
}
/deep/ .el-input__inner:-webkit-autofill {
  -webkit-text-fill-color: #000 !important;
}
.el-icon-lock:before {
  color: #bdc7f6;
}
.login-btn {
  width: 17vw;
  font-family: HarmonyOS Sans SC;
  color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 4px;
  background: #4c8eda;
  height: 6vh;
}
</style>
