// 工作台拦截器
const workbenchCommon = {
  // 贷后流程启动减免 贷后人工减免请求拦截器
  loanPostManualReduceReq: function(config) {
    if (config && config.data) {
      switch (config.data.urgentShowItem) {
        case "1":
          config.data.urgent = 0;
          break;
        case "2":
          config.data.urgent = 1;
        default:
          break;
      }
      delete config.data.urgentControl;
      delete config.data.initUrgent;
      delete config.data.urgentShowItem;
      delete config.data.requiredUrgent;
    }
  },
  loanPostManualReduceRes: function (response) {
    let newData = response.data;
    newData.data.urgentCheck = newData.data.urgent === "0" ? [] : ["1"];
    response.data = newData;
  },
  claimMsgHandle: function (response) {
    if(Number(response.data.code) == 200 ){
      if (response.data.data.count == 0 ) {
        response.data.message="暂无可认领案件！";
      } else{
        // JSON.parse(response.config.data).tkcount
        response.data.message="成功领取" + response.data.data.count + "笔！";
      }
    }
  },
  //催收自动分案提示更改
  autoAllocateCaseHandle: function (response) {
    if(Number(response.data.code) == 200 ){
      response.data.message="分案请求已提交，可能会花费一些时间，请耐心等待！";
    }
  }
}
export default workbenchCommon;