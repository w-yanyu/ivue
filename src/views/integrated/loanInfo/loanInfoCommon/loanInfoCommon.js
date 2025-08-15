// 借据查询拦截器
const loanInfoCommon = {
  // 借据查询请求拦截器  'pasvqrkjfl','pasvqrdtln','pasvqrtsin','pasvqrjymx','CORELNTS9268'
  loanHandleReq: function(config) {
    if (config && config.data) {
      switch (config.data.servicecode) {
        case "qrdtln":
          if("PRTV" == config.data.acmode){
            config.data.servicecode = "qrdtln";
          }
          if("PASV" == config.data.acmode){
            config.data.servicecode = "pasvqrdtln";
          }
          break;
        case "qrjymx":
          if("PRTV" == config.data.acmode){
            config.data.servicecode = "qrjymx";
          }
          if("PASV" == config.data.acmode){
            config.data.servicecode = "pasvqrjymx";
          }
          break;
        case "qrkjfl":
          if("PRTV" == config.data.acmode){
            config.data.servicecode = "qrkjfl";
          }
          if("PASV" == config.data.acmode){
            config.data.servicecode = "pasvqrkjfl";
          }
          break;
        case "qrtsin":
          if("PRTV" == config.data.acmode){
            config.data.servicecode = "qrtsin";
          }
          if("PASV" == config.data.acmode){
            config.data.servicecode = "pasvqrtsin";
          }
          break;
        case "CORELNTS2001":
          if("PRTV" == config.data.acmode){
            config.data.servicecode = "CORELNTS2001";
          }
          if("PASV" == config.data.acmode){
            config.data.servicecode = "CORELNTS9268";
          }
          break;
        default:
          break;
      }
    }
  }
}
export default loanInfoCommon;
