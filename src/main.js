/*
 * @Author: weisiyi weisiyi@sunline.cn
 * @Date: 2023-10-20 14:59:55
 * @LastEditors: weisiyi weisiyi@sunline.cn
 * @LastEditTime: 2024-01-15 11:04:13
 * @FilePath: /ivue/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "pte-ui/main"; // vue插件
import iSun, { App } from "pte-ui"; // 自定义vue组件
import router from "pte-ui/router"; // 路由
import i18n from "pte-ui/i18ns"; // 国际化
import Print from "./util/print";
import "./styles";
import "babel-polyfill";
import store from "./pte/ptestoreregister.js"; // vuex
import checkPermis from "./store/modules/Permis";
import contentmenu from "v-contextmenu";
import "v-contextmenu/dist/index.css";
import { create, all } from "mathjs";
import MyPD from "@/views/msap/bpm/processManagement/processModel/flowDesigner/index.js";
import SlideVerify from "vue-monoplasty-slide-verify";
import watermark from "@/util/watermark";
import moment from "moment";
import VueBus from "@/views/risk/utils/vue-bus";
import buttonauthcontrol from  "@/pte/buttonauthcontrol.js";
 
import dataV from '@jiaminghi/data-view';

import "./util/eft-icon.js"; // 集成eft的图标仓库资源，若后续使用eft的图标组件，则可以直接使用npm的方式引用依赖
import SvgIcon from "./components/svg-icon.vue";

// import './util/singleSign';
Vue.prototype.$math = create(all, {});


Vue.component("svg-icon", SvgIcon);
Vue.use(checkPermis);
Vue.use(iSun);
Vue.use(Print);
Vue.use(contentmenu);
Vue.use(MyPD);
Vue.use(SlideVerify);
Vue.use(VueBus);
Vue.use(dataV);
Vue.prototype.buttonauthcontrol = buttonauthcontrol
Vue.config.productionTip = false; // 生产环境关掉提示

router.afterEach((item) => {
  document.getElementById('sunloading').style.display = 'none'
   if (item.name !== "login" && localStorage.getItem("user_info")) {
    const pageWatermarkSwitch = JSON.parse(localStorage.getItem("user_info")).pageWatermarkSwitch;
    if (pageWatermarkSwitch){
      const userName = JSON.parse(localStorage.getItem("user_info")).userName;
      watermark.set(userName, moment().format("YYYY-MM-DD"));
    }
  }
});

/* eslint-disable no-new */
let vue = new Vue({
  el: "#app",
  router,
  i18n,
  store,
  render: (h) => h(App),
});

document.getElementById('_loading').style.display = 'none'

export default vue