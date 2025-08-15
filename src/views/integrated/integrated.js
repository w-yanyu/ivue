// 综合查询拦截器
import * as _ from "lodash";
const productReq = {
 
  /**
   * 整理日期格式
   */
  loanInfo(response) {
    let newData = response.data;
    for(var i =0;i<newData.data.length;i++){
      var str1 = newData.data[i].endxdt;
      var str2 = newData.data[i].stardt;
      var str3 = newData.data[i].pmdudt;
      if(str1.length > 8) {
        newData.data[i].endxdt = str1.substring(0,str1.length-(str1.length - 8));
      }
      if(str2.length > 8) {
        newData.data[i].stardt = str2.substring(0,str2.length-(str2.length - 8));
      }
      if(str3.length > 8) {
        newData.data[i].pmdudt = str3.substring(0,str3.length-(str3.length - 8));
      }
    }
    response.data = newData;
  }
}
export default productReq;