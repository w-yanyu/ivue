/*
 * @Author: weisiyi weisiyi@sunline.cn
 * @Date: 2023-10-24 14:35:38
 * @LastEditors: weisiyi weisiyi@sunline.cn
 * @LastEditTime: 2023-11-15 17:39:02
 * @FilePath: /ivue/src/store/modules/dynamicScreen.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
let dynamicScreen = {
  state: {
    isEditStateShow: false, // 数字大屏首页编辑操作权限
    mapTopdata: {}, // 数字大屏--地图数据展示缓存
  },
  getters: {
    GET_EDIT_SHOW(state) {
      return state;
    },
    GET_MAPTOP_DATA(state) {
      return state;
    },
  },
  mutations: {
    SET_EDIT_SHOW(state, data) {
      state.isEditStateShow = data;
    },
    SET_MAPTOP_DATA(state, data) {
      state.mapTopdata = data;
    },
  },
  actions: {},
};
export default dynamicScreen;
