// 贷款参数管理拦截器
const partsReOrgInterceptor = {
  // 贷款参数管理新增请求拦截器 ap0000请求参数为空时不能传入
  partsReOrgInterceptorReq: function(config) {
    if (config && config.data) {
      try {
        var fstring ="";
        var sstring ="";
        var fobj=config.data.depc_cmpt_id;//依赖部件
        var sobj=config.data.excl_cmpt_id;//排斥部件
        for(let i=0; i<fobj.length;i++) {
          if(i==0){
            fstring=fobj[i]
          }else{
            fstring=fstring+","+fobj[i];
          }
        }
        for(let i=0; i<sobj.length;i++) {
          if(i==0){
            sstring=sobj[i]
          }else{
            sstring=sstring+","+sobj[i];
          }
        }
        config.data.depc_cmpt_id=fstring;
        config.data.excl_cmpt_id=sstring;
      } catch (err) {
        console.error(err);
      }
    }
  },
  partsReOrgInterceptorRes: function(response) {
    console.log(response.data);
    if(response.data.data.length>0){
      response.data.data.forEach(function (item){
        console.log("1111111");
        if(item.depc_cmpt_id!=null&&item.depc_cmpt_id!=""){
          item.depc_cmpt_id=item.depc_cmpt_id.split(",");
          console.log(item.depc_cmpt_id);

        }
        if(item.excl_cmpt_id!=null&&item.excl_cmpt_id!=""){
          item.excl_cmpt_id=item.excl_cmpt_id.split(",");
          console.log(item.excl_cmpt_id);
        }
      })
    }
  }
}
export default partsReOrgInterceptor;
