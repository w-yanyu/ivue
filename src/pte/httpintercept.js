'use strict'

/*
利用axios发送http请求， 请在此处自定义拦截器
如未定义 默认使用框架自带拦截器
*/

import Permis from "../store/modules/PermisBox.js";
import BuildBox from "../store/modules/BuildTodoBox.js";
// import store from '@/store';
import store from "pte-ui/store"; // vuex
import jsencrypt from "../util/decrypt.js";
import MyMessage from "pte-ui/utils/MyMessage";
import i18n from "pte-ui/i18ns";
import Tools from "pte-ui/utils/Tools";
import {MessageBox} from "element-ui";
import productInterceptor from "@/views/product/productInterceptor"; // 产品中心拦截器
import loanManagerInterceptor from "@/views/loanManager/loanManagerInterceptor"; // 贷款管理拦截器
import integrated from "@/views/integrated/integrated"; // 综合查询拦截器
import workbenchCommon from "@/views/workbench/workbenchCommon/workbenchCommon"; // 工作台拦截器
import loanInfoCommon from "@/views/integrated/loanInfo/loanInfoCommon/loanInfoCommon"; // 借据查询拦截器
import dhInterceptor from "@/views/dh/dhCommon/dhInterceptor"; // 贷后工作台拦截器
import changeData from "./ptefilter.js"; //催收参数过滤
import loanParmInterceptor from "@/views/paramManage/loanParmInterceptor"; // 贷款参数管理拦截器
import compParmInterceptor from "@/views/product/productModel/baseProduct/compEdit/tabs/compParmInterceptor";//部件信息维护列表拦截器
import changeList from "@/views/product/productModel/baseProduct/update/changeList.js"; //将标签页数据组装拦截器
import jointRpymtPrd from "@/views/loanManager/lendingTrial/jointRpymtPrd.js";
import partsReOrgInterceptor from "../views/product/productModel/productPartManage/partsReOrg";
import icmsInterceptor from "@/views/icms/icmsRequestInterceptor.js";
import pdInterceptor from "@/views/pd/pdRequestInterceptor.js";
import errorMasking from "@/pte/errorMasking.json";
import changeSelectedDate from "@/views/lxyk/changeSelectedDate.js";
import totalisator from "@/views/lxyk/xyf/totalisator.js"; //拦截计算消费总金额
import Cookies from "js-cookie";
//将期供试算中的还款周期组装拼接拦截器

let user_info;


const HttpIntercept = {
  /**
   * 是否启用自定义拦截器。true启用，false不启用
   */
  setup: true,

  /**
   * 请求拦截： 可以改写请求报文、修改header属性等
   * 逻辑处理完后，需要返回config
   * config参数参看axios官方文档
   * @param {*} config 为axios中传入的参数
   */
  request: function (config) {
    // console.log('请求拦截',config);
    config = changeData.allService(config);
    // 拦截器代码
    if (config && config.data) {
      if (Object.prototype.toString.call(config.data).slice(-7, -1) === "Object" && Object.prototype.toString.call(config.data.servicecode).slice(-7, -1) === "String") {
        switch (config.data.servicecode) {
          // case "##AS_ICMS_PD_PROADD":
          //   productInterceptor.availReq(config);
          //   break;
          case "PLMSKGSS0009":
            workbenchCommon.loanPostManualReduceReq(config);
            break;
          case "PLMSKGTS0087":
            dhInterceptor.derateParameterListReq(config);
            break;
          case "PLMSKGTS0088":
          case "PLMSKGTS0090":
            dhInterceptor.derateParameterAddReq(config);
            break;
          case "qrdtln":
          case "qrjymx":
          case "qrkjfl":
          case "qrtsin":
          case "CORELNTS2001":
            loanInfoCommon.loanHandleReq(config);
          case "ap0000":
            loanParmInterceptor.loanParameterAddReq(config);
            break;
          case "fa7057":
          case "fa7058":
            loanParmInterceptor.loanParameterSubject(config);
            break;
          case "ln3281":
            compParmInterceptor.loanParameterAddReq(config)
            break;
          case "syln3273":
            changeList.loanParameterAddReq(config);
            break;
          case "syln3281":
            compParmInterceptor.loanParameterAddReq(config);
            break;
          case "ln3252":
          case "ln3253":
            partsReOrgInterceptor.partsReOrgInterceptorReq(config);
            break;
          case "ln3972":
            changeSelectedDate.changgeListOneReq(config);
            break;
          case "ln3976":
            changeSelectedDate.changeListTwoReq(config);
            break;
          case "ar0056":
          case "ln3996":
            if (!totalisator.tongjiAddReq(config)) {
              return;
            }
            break;
          default:
            break;
        }
        //进件请求拦截处理
        if (config.data.servicecode.substring(0, 2) === "ar") {
          return icmsInterceptor.icmsRequestInterceptor(config);
        }
        //产品页面关联请求拦截处理
        if (config.data.servicecode.substring(0, 6) === "detail") {
          pdInterceptor.pdRequestInterceptor(config);
        }
      }
    }
    switch (config.url) {
      case "/SUMP/rest/auth/login": // 拦截登录请求获取用户id
        switch (true) {
          case JSON.parse(localStorage.getItem("user_info")):
            user_info = JSON.parse(localStorage.getItem("user_info"));
            break;
          default:
            break;
        }
        break;
      case "/SUMP/rest/auth/logout": // 拦截退出登录请求清楚cookie缓存的token
        Cookies.remove("accessToken")
        break;
      default:
        break;
    }
    this.request_data = config;
    return config;
  },
  /**
   * HTTP响应后拦截返回的报文： 可以改写后台报文格式，重新组装和统一弹出（成功/错误）提示信息
   * 返回的code码为正确返回，则“return true”，错误则返回“return false”
   * 例如：后台返回的code码是200 则返回true，不为200的情况，处理完异常逻辑后返回“false”
   * @param {*} response
   */
  response: function (response) {
    // response.data.datacode="9000"
    // console.log(process.env.VUE_APP_BABEL_ENV) 
    // console.log('响应报文拦截',response);
    let resURL = (response.request.responseURL || response.config.url).split("/SUMP")[1];
    // 拦截获取菜单响应校验用户id及菜单码
    if (resURL === "/rest/auth/menu") {
      // login请求的用户id
      let userCode;
      if (Number(response.data.code) !== 200) {
        MessageBox.alert(response.data.message, i18n.t("errorTitle"), {
          confirmButtonText: i18n.t("errorSubmit"),
          type: "error"
        }).catch(() => {
        });
        return false;
      }
      user_info = JSON.parse(localStorage.getItem("user_info"));
      if (user_info) {
        userCode = user_info.userCode + "-" + response.data.data.length;
      }
      // menu响应的用户id
      let res_userCode = jsencrypt.decrypt(response.data.verify);
      // menu响应的加密菜单码
      let res_menuverify = jsencrypt.decrypt(response.data.menuverify);
      // 验证登录信息
      if (!response.data.verifys) {
        MyMessage({message: i18n.t("login.menuVerify"), type: "error"});
        if (user_info) {
          localStorage.setItem("user_info", JSON.stringify(user_info));
        }
        return false;
      }
      let res_verifys = [];
      response.data.verifys.split(".").forEach(item => {
        res_verifys.push(jsencrypt.decrypt(item));
      });
      if (response.data.data.length !== Number(res_verifys[1]) || sessionStorage.access_token.split(".")[1] !== res_verifys[2] || sessionStorage.access_token.split(".")[2] !== res_verifys[3]) {
        MyMessage({message: i18n.t("login.menuVerify"), type: "error"});
        if (user_info) {
          localStorage.setItem("user_info", JSON.stringify(user_info));
        }
        return false;
      }
      // 验证登录账户userCode 和 后台返回的userCode是否匹配
      let clientCode = JSON.parse(localStorage.getItem("user_info")).userCode;
      if (clientCode !== res_userCode.split("-")[0] && clientCode !== res_verifys[0]) {
        MyMessage({message: i18n.t("login.menuVerify"), type: "error"});
        if (user_info) {
          localStorage.setItem("user_info", JSON.stringify(user_info));
        }
        return false;
      }
      let menuArr = [];
      for (let i = 0; i < response.data.data.length; i++) {
        if (i % 5 === 0) {
          menuArr.push(response.data.data[i].pageCode.slice(0, 1));
        }
      }
      // menu响应的菜单码首字母
      let menuPageCode = menuArr.join("");
      if (userCode) {
        if (res_userCode !== userCode || res_menuverify !== menuPageCode) {
          MyMessage({message: i18n.t("login.menuVerify"), type: "error"});
          if (user_info) {
            localStorage.setItem("user_info", JSON.stringify(user_info));
          }
          return false;
        }
      }
    }

    // 拦截登录模板请求，获取title_nanme
    if (resURL === "/screen/mobileCall") {
      if (response.data) {
        localStorage.setItem("title_Zhname", JSON.stringify(response.data.title_Zhname));
        localStorage.setItem("title_Enname", JSON.stringify(response.data.title_Enname));
      }
    }

    //请求错误屏蔽
    if (this.isMasking(response)) {
      return true;
    }
    // 拦截所有请求，错误码为9000则重定向至登录页
    if (response.data.datacode && response.data.datacode === "9000") {
      MessageBox.alert(i18n.t("errorMsg"), i18n.t("errorTitle"), {
        confirmButtonText: i18n.t("confirm"),
        showClose: false,
        callback: action => {
          Tools.backupLogin();
        }
      });
      // debugger
      // MessageBox.alert('', '您长时间未活动请重新输入密码', {
      //   inputType: 'password',
      //   inputValidator: validator,
      //   inputErrorMessage: '请输入正确密码！',
      //   confirmButtonText: '确定',
      //   showClose: false,
      //   closeOnPressEscape: false,
      //   closeOnClickModal: false,
      //   center: true
      // }).then(({ value }) => {
      //   let form={
      //     userid: "",
      //     brchno: "",
      //     corpno: "",
      //     passwd: value,
      //     verify_code: "",
      //     ui_language: "",
      //   }
      //   let toRequestObj = Tools.resolveToRequest({
      //     url: "/SUMP/rest/auth/login",
      // });
      // let req = _.assign(
      //     { url: toRequestObj.url },
      //     toRequestObj.params,
      //     this.loginForm
      // );
      //   console.log('登錄彈窗密碼',form)
      // }).catch(() => {   // 点击取消按钮后的操作
      //   MessageBox.close()
      //   Tools.backupLogin();
      // })

    }
    if (typeof (response.data.comm_rsp) !== "undefined") {
      //sys域中，erorcd = 6004表示需要授权
      if (response.data.comm_rsp.sys_erorcd === "6004") {
        Permis({
          "request": this.request_data,
          "response": response.data.comm_rsp
        });
      }
      ;
      //sys域中，erorcd = 6005表示需要使用工作流
      if (response.data.comm_rsp.sys_erorcd === "6005") {
        // console.log(response.config.meta.$templateMode, 999, this.request_data)
        // 从mete data中获取需要审批页面的page_id
        if (this.request_data.data && typeof this.request_data.data === "string" && response.config && response.config.meta) {
          let json = JSON.parse(this.request_data.data);
          json.page_id = response.config.meta.$templateMode;
          this.request_data.data = JSON.stringify(json);
        }
        //当成功拦截后，就不再加载json中配置的回显页面
        if (response.config.condition) {
          response.config.condition = null;
        }
        BuildBox({
          "request": this.request_data,
          "response": response.data.comm_rsp
        });
      }
      ;
      //sys域中，erorcd = 6012 表示用户已被强制签退需要重新登录
      if (response.data.comm_rsp.sys_erorcd === "6012") {
        MessageBox.alert(i18n.t("errorMsg"), i18n.t("errorTitle"), {
          confirmButtonText: i18n.t("confirm"),
          showClose: false,
          callback: action => {
            Tools.backupLogin();
          }
        });
      }
      ;
      //sys域中，erorcd = 6021表示需要场景收费
      if (response.data.comm_rsp.sys_erorcd === "6021") {
        store.dispatch('setToRequest',
          {
            url: "@SceneCharge",
            params: {
              request: this.request_data,
              response: response.data
            },
            props: {width: "900px", height: "100px", title: i18n.t('scene.dialog_title')}
          }
        );
        store.dispatch('setDialogVisible', true);
      }
      ;
    }
    // // 自动锁屏
    // if (SysConfig.autoLock) {
    //   if (window.lockTimeout) {
    //     clearTimeout(window.lockTimeout);
    //   }
    //   window.lockTimeout = setTimeout(() => {
    //     console.log("lock!");
    //     user.mutations.SET_SCREEN_LOCK_STATUS(user.state, true);
    //   }, SysConfig.autoLock.timeOut * 60 * 1000);
    // }

    // response拦截器代码
    if (response.data && response.config) {
      if (response.config.data && Object.prototype.toString.call(response.config.data).slice(-7, -1) === "String") {
        let data = {};
        data = JSON.parse(response.config.data);
        switch (data.servicecode) {
          case "AS_ICMS_PD_PDCPCF":
            switch (data.type) {
              case "add":
                productInterceptor.availManagePartnerRes(response);
                break;
              default:
                break;
            }
            break;
          case "edlaye":
            switch (data.caozuolx) {
              case "3":
                loanManagerInterceptor.fineLayered(response);
                break;
              default:
                break;
            }
            break;
          case "CORELNTS2001":
            integrated.loanInfo(response);
            break;
          case "PLMSKGSS0011":
            workbenchCommon.loanPostManualReduceRes(response);
            break;
          case "cltsks":
            workbenchCommon.claimMsgHandle(response);
            break;
          case "PLMSKGTS0087":
            dhInterceptor.derateParameterListRes(response);
            break;
          case "autoDivision":
            workbenchCommon.autoAllocateCaseHandle(response);
          // eslint-disable-next-line no-fallthrough
          case "ap0000":
            loanParmInterceptor.loanParameterAddRes(response);
          case "ln3250":
            partsReOrgInterceptor.partsReOrgInterceptorRes(response)
            break;
          case "ar0581":
            if (Object.keys(response.data.data).length != 0 && response.data.data.message != "success") {
              MyMessage({message: i18n.t(response.data.data.message), type: "warning"});
            }
          case "ct2554":
            if (Object.keys(response.data.data).length != 0 && response.data.data.api_enable == "0") {
              MyMessage({message: "测试失败，错误信息：" + i18n.t(response.data.data.message), type: "error"});
            } else if (Object.keys(response.data.data).length != 0 && response.data.data.api_enable == "1") {
              MyMessage({message: "测试成功！" + i18n.t(response.data.data.message), type: "success"});
            }

            break;
          default:
            break;
        }
      }
    }


    return '';
  },
  /**
   * 请求错误，可以是HTTP状态非200，或者是业务错误
   * 最后返回“return Promise.reject(error)”
   * @param {*} error axios原生error对象
   */
  error: function (error) {
    return Promise.reject(error)
  },
  /**
   * 由于展示需要一些交易接口的报错信息不予展示，通过请求交易进行筛选
   * 屏蔽报错交易名单src/pte/errorMasking.json
   * @param data
   * @returns {boolean}
   */
  isMasking: function (response) {
    //判断请求是否统一inmp请求
    if (response.config.url.includes("/SUMP/icmcall")){
      if (response.config.url === "/SUMP/icmcall/file") return
      let paramsStr = response.config.data;
      if (paramsStr === null || paramsStr === undefined || paramsStr === "" || paramsStr === {}){
        return false;
      }
      let params = JSON.parse(paramsStr);
      let serviceCode = params.servicecode;
      if (!serviceCode) {
        return false;
      }
      let list = errorMasking.serviceCodeList;
      for (let i = 0; i < list.length; i++) {
        if (serviceCode === list[i]) {
          return true;
        }
      }
      return false;
    }
    return false;
  }
}

export default HttpIntercept
