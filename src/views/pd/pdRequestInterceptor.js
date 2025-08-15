// 产品中心拦截处理
const pdInterceptor = {

  pdRequestInterceptor: function (config) {
    // 页面查询交易类型（正式表或临时表）
    let pageTranType = config.data.pageTranType;
    let servicecode = config.data.servicecode;
    let tempList = [];
    if (pageTranType === 'format') {
      tempList = servicecode.split(',');
      for (const tempListKey of tempList) {
        if (tempListKey.substring(0,6) === 'format'){
          servicecode = tempListKey.split('=')[1];
        }
      }
    } else if (pageTranType === 'temp') {
      tempList = servicecode.split(',');
      for (const tempListKey of tempList) {
        if (tempListKey.substring(0,4) === 'temp'){
          servicecode = tempListKey.split('=')[1];
        }
      }
    }
    config.data.servicecode = servicecode;
    return config;
  },
}
export default pdInterceptor;
