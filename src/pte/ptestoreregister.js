/*
 * @Author: weisiyi weisiyi@sunline.cn
 * @Date: 2023-08-08 19:07:58
 * @LastEditors: weisiyi weisiyi@sunline.cn
 * @LastEditTime: 2024-02-29 16:59:22
 * @FilePath: /ivue/src/pte/ptestoreregister.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import _extends from "babel-runtime/helpers/extends";
import Vue from "vue";
import Vuex from "vuex";
import pte_app from "pte-ui/store/modules/app";
import pte_user from "pte-ui/store/modules/user";
import getters from "pte-ui/store/getters";
import pte_tagsNav from "pte-ui/store/modules/tagsView";
import pte_routersMap from "pte-ui/store/modules/routersMap";
import pte_logs from "pte-ui/store/modules/logs";
import cap_flow from "@/store/modules/flow";
import dynamicScreen from "@/store/modules/dynamicScreen";
import riskStore from "@/store/modules/risk";

import pte_template from "pte-ui/store/modules/template";
// import ptestoreregister from '@/pte/ptestoreregister'
// import pteGetters from './getters'
// import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);
// Object.assign(getters, pteGetters)
// const logger = createLogger({
//   collapsed: false, // 自动展开记录的 mutation
//   filter (mutation, stateBefore, stateAfter) {
//     // 若 mutation 需要被记录，就让它返回 true 即可
//     // 顺便，`mutation` 是个 { type, payload } 对象
//     return mutation.type !== 'aBlacklistedMutation'
//   },
//   mutationTransformer (mutation) {
//     // mutation 按照 { type, payload } 格式记录
//     // 我们可以按任意方式格式化
//     return mutation.type
//   }
// })
import sys from "@/pte/sysconfig";
var ptestoreregister = {};
if (sys.extendFile && sys.extendFile.store) {
  ptestoreregister = require("@/pte/" + sys.extendFile.store).default;
}

var pteGetters = {};
if (sys.extendFile && sys.extendFile.getters) {
  pteGetters = require("@/pte/" + sys.extendFile.getters).default;
}

_extends(getters, pteGetters);

var store = new Vuex.Store({
  modules: _extends(
    {
      pte_app: pte_app,
      pte_routersMap: pte_routersMap,
      pte_user: pte_user,
      pte_tagsNav: pte_tagsNav,
      pte_template: pte_template,
      pte_logs: pte_logs,
      cap_flow: cap_flow,
      dynamic_screen: dynamicScreen,
      risk_store: riskStore
    },
    ptestoreregister
  ),
  getters: getters,
  // plugins: [logger]
});
export default store;
