// 贷后管理拦截器
const dhInterceptor = {
  // 减免参数控制新增请求拦截器
  derateParameterAddReq: function(config) {
    if (config && config.data) {
      try {
        config.data.accountDuration = config.data.accountDuration.join(",");
        config.data.productType = config.data.productType.join(",");
      } catch (err) {
        console.error(err);
      }
    }
  },
  derateParameterListReq: function(config) {
    if (config && config.data) {
      try {
        config.data.accountDuration = config.data.accountDuration.join(",");
        config.data.productType = config.data.productType.join(",");
      } catch (err) {
        console.error(err);
      }
    }
  },
  // 减免参数控制列表返回拦截器
  derateParameterListRes: function (response) {
    try {
      let newData = response.data;
      newData.data.forEach(item => {
        item.accountDuration = item.account_duration.split(",");
        item.productType = item.product_type.split(",");
      });
      response.data = newData;
    } catch (error) {
      console.error(err);
    }
  }
}
export default dhInterceptor;