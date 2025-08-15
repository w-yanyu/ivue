// 贷款参数管理拦截器
const changeSelectedDate = {
  // 贷款参数管理新增请求拦截器 ap0000请求参数为空时不能传入
  changgeListOneReq: function(config) {
    if (config && config.data) {
      try {
        if(config.data.selectedData) {
          config.data.lstSmilrCrCardBillDetl=config.data.selectedData
        }
      } catch (err) {
        console.error(err);
      }
    }
  },
  changeListTwoReq: function(config) {
    if (config && config.data) {
      try {
        if(config.data.selectedData) {
          config.data.cplInfo=config.data.selectedData
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
}
export default changeSelectedDate;
