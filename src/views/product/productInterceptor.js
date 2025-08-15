// 产品中心拦截器
import * as _ from "lodash";
const productReq = {
  availReq: function(config) {
    if (_.isArray(config.data.schdtp) && _.isArray(config.data.loandr) && _.isArray(config.data.guartp)) {
      config.data.schdtp = config.data.schdtp.join();
      config.data.loandr = config.data.loandr.join();
      config.data.guartp = config.data.guartp.join();
    }
  },
  availRes: function(response) {
    let newData = response.data;
    try {
      newData.data.schdtp = newData.data.schdtp.split(",");
      newData.data.loandr = newData.data.loandr.split(",");
      newData.data.guartp = newData.data.guartp.split(",");
    } catch (err) {
      console.error(err)
    }
    response.data = newData;
  },
  /**
   * 授信产品信息新增 合作方配置拦截器
   */
  availManagePartnerRes(response) {
    let newData = response.data;
    try {
      if (_.isString(response.config.data)) {
        let req = JSON.parse(response.config.data);
        newData.data = {
          crdtcd: req.crdtcd,
          seqnum: req.seqnum,
        }
      }
    } catch (err) {
      console.error(err);
    }
    response.data = newData;
  }
}
export default productReq;