/*
 * @Author: weisiyi weisiyi@sunline.cn
 * @Date: 2024-01-11 21:18:24
 * @LastEditors: weisiyi weisiyi@sunline.cn
 * @LastEditTime: 2024-01-12 14:02:01
 * @FilePath: /ivue/src/util/singleSign.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import SysConfig from "@/pte/sysconfig.json";
import Tools from "pte-ui/utils/Tools";
import _ from "lodash";
import routerUtil from "pte-ui/utils/routerUtil";
import Cookies from "js-cookie";
import axios from "axios";
import router from "pte-ui/router"; // 路由
import store from "../pte/ptestoreregister"; // vuex
import i18n from "pte-ui/i18ns"; // 国际化
import { Message } from "element-ui";

const cookies_token = Cookies.get("accessToken");

function getUserInfo() {
  const url = "/SUMP/rest/auth/ssoClientLogin?access_token=" + cookies_token;
  axios
    .post(url)
    .then(response => {
      // 处理响应
      store.commit("PTE_USER_SET_LOGIN_INFO", response.data);
      const userInfo = response.data.data.user_info;

      Tools.setUserConfig("userInfo", userInfo);
      Tools.setUserConfig("user_info", userInfo);

      routeDeal();
    })
    .catch(error => {
      console.log("error", error);
      // router.push({
      //   path: '/login'
      // });
      // 处理错误
      Message({
        type: "error",
        message: "token无效！"
      });
    });
}
if (cookies_token) {
  getUserInfo();
}

function routeDeal() {
  if (!SysConfig.isShell) {
    // 非壳子登录
    store
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
        console.log("treeData======", treeData, router);

        // 将后台数据转为树形结构
        // localStorage.setItem("ROUTES", JSON.stringify(routeData));
        routerUtil.set(routeData);
        router.addRoutes(treeData);
        store.commit(
          "PTE_TAGSVIEW_SET_HOME_NAME",
          treeData[0].children[0].name
        );
        // router.push({
        //   path: '/dashboard'
        // });
      })
      .catch(e => {});
    i18n.locale = localStorage.getItem("LANGUAGE_STYLE");
  }
}

router.beforeEach((to, from, next) => {
  console.log("to, from, next", to, from, next);
  if (to.path === '/login') return next();
  //如果不是访问登录页面，证明他访问的是有权限的页面，则需要获取token来进行判断
  if (!cookies_token) return next('/login')
  next();
});
