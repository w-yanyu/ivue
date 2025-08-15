// 进件请求拦截器
import ar1001RequestHandler from "./icmsRequestInterceptHandlers/ar1001";
import ar1300RequestHandler from "./icmsRequestInterceptHandlers/ar1300";
// 注册ar模块交易拦截处理器
const arReqInterceptHandlersFactory = new Map()
  .set("ar1001", ar1001RequestHandler)
  .set("ar1300", ar1300RequestHandler);

const icmsInterceptor = {

  icmsRequestInterceptor: function (config) {
    let servicecode = config.data.servicecode;
    let handler = arReqInterceptHandlersFactory.get(servicecode);
    //若该服务有拦截处理，则调用该服务处理函数
    if(handler){
      return handler.dealWith(config);
    }
    return config;
  },
}
export default icmsInterceptor;
