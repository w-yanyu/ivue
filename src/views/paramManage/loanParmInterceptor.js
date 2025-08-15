// 贷款参数管理拦截器
const loanParmInterceptor = {
  // 贷款参数管理新增请求拦截器 ap0000请求参数为空时不能传入
  loanParameterAddReq: function(config) {
    if (config && config.data) {
      try {
        var obj=config.data.data_pkg;
        for(var k in obj) {
          if(obj[k]==""||obj[k]==null||obj[k]==undefined){
           delete config.data.data_pkg.k;
            delete config.data.data_pkg[k];
          }
        }
      } catch (err) {
        console.error(err);
      }
     
    }
  },
  // 贷款参数管理返回拦截处理
  loanParameterAddRes: function (response) {
    try {
      console.log(JSON.parse(response.data.data.data_pkg).result);
      let newData =JSON.parse(response.data.data.data_pkg).result;
      response.data.data = newData;
    } catch (error) {
      console.error(err);
    }
  },
  //科目指令维护方法
  loanParameterSubject: function(config){
    console.log("拦截器开始------");
    console.log(config.data.plFlag);
    //批量处理时逻辑
    if(config.data.plFlag === '1'){
      console.log("科目维护数据处理------");
      var lstKemuwh = []; //科目维护数据
      
      var list = config.data.selectedData;
      list.forEach(subject => {
        var kemu = {};
        kemu.input_dt = subject.input_dt;
        kemu.txn_rung_num_32 = subject.txn_rung_num_32;
        lstKemuwh.push(kemu);
      });
      config.data.lstKemuwh = lstKemuwh;
    }
    
  }
}
export default loanParmInterceptor;
