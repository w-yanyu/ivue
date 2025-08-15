// 进件请求拦截器
export default {
  dealWith: function (config) {
    if (config && config.data) {
      try {
        let condition = config.data.detail;
        let result = {
          servicecode: config.data.servicecode,
          condition: condition
        }
        config.data = result;
        return config;
      } catch (err) {
        console.error(err);
      }
    }
  }
}
