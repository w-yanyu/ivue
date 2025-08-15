var getters = {
  sidebar: function sidebar(state) {
    return state.pte_app.sidebar;
  },
  language: function language(state) {
    return state.pte_app.language;
  },
  name: function name(state) {
    return state.pte_user.name;
  },
  iconUrl: function iconUrl(state) {
    return state.pte_user.iconUrl;
  },
  theme: function theme(state) {
    return state.pte_app.theme;
  },
  themes: function themes(state) {
    return state.pte_app.themes;
  },
  routersMap: function routersMap(state) {
    return state.pte_routersMap.routers;
  },
  visitedViews: function visitedViews(state) {
    return state.pte_tagsNav.visitedViews;
  },
  homeName: function homeName(state) {
    return state.pte_tagsNav.homeName;
  },
  showSwitchRoleMenu: function showSwitchRoleMenu(state) {
    return state.pte_user.showSwitchRoleMenu;
  },
  hideMenuCount: function hideMenuCount(state) {
    return state.pte_app.hideMenuCount;
  },
  screenWidth: function screenWidth(state) {
    return state.pte_app.screenWidth;
  },
  isFolderMenu: function isFolderMenu(state) {
    return state.pte_app.isFolderMenu;
  },
  subMenuActive: function subMenuActive(state) {
    return state.pte_app.subMenuActive;
  },
  dropMenuId: function dropMenuId(state) {
    return state.pte_app.dropMenuId;
  },
  activeIframe: function activeIframe(state) {
    return state.pte_routersMap.activeIframe;
  },
  showIframe: function showIframe(state) {
    return state.pte_routersMap.showIframe;
  },
  logsNum: function logsNum(state) {
    return state.pte_logs.logsNum;
  },
  dialogVisible: function dialogVisible(state) {
    return state.pte_app.dialogVisible;
  },
  currentEditAtrr: function currentEditAtrr(state) {
    return state.cap_flow.currentEditAtrr;
  },
};
export default getters;
