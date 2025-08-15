/*
 * @Author: weisiyi weisiyi@sunline.cn
 * @Date: 2024-02-29 16:58:16
 * @LastEditors: weisiyi weisiyi@sunline.cn
 * @LastEditTime: 2024-03-03 16:38:51
 * @FilePath: /ivue/src/store/modules/risk.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
let riskStore = {
  state: {
    data_source_code: "", // 数据源管理-数据源代码
    data_source_pageType: "", // 数据源管理-操作按钮类型
    data_source_tab1_submit: false, // 数据源管理-第一步提交标识，用作数据源代码是否可编辑
    tab1_dataSourceManageCom: {}, // 数据源管理-数据源配置-基本信息
    tab1_dataSourceConcurrencyCom: {}, // 数据源管理-数据源配置-防并发访问信息
  },
  getters: {
    GET_DATA_SOURCE_CODE(state) {
      return state;
    },
    GET_DATA_SOURCE_PAGETYPE(state) {
      return state;
    },
    GET_DATA_SOURCE_SUBMIT(state) {
      return state;
    },
    GET_DATA_SOURCE_MANAGE(state) {
      return state;
    },
    GET_DATA_SOURCE_CONCURRENCY(state) {
      return state;
    },
  },
  mutations: {
    SET_DATA_SOURCE_CODE(state, data) {
      state.data_source_code = data;
    },
    SET_DATA_SOURCE_PAGETYPE(state, data) {
      state.data_source_pageType = data;
    },
    SET_DATA_SOURCE_SUBMIT(state, data) {
      state.data_source_tab1_submit = data;
    },
    SET_DATA_SOURCE_MANAGE(state, data) {
      state.tab1_dataSourceManageCom = data;
    },
    SET_DATA_SOURCE_CONCURRENCY(state, data) {
      state.tab1_dataSourceConcurrencyCom = data;
    },
  },
  actions: {},
};
export default riskStore;
