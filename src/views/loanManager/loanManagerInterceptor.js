// 贷款管理拦截器
import * as _ from "lodash";
const productReq = {
 
  /**
   * 罚金计算方式为百分比自动给罚金金额添加百分号
   */
  fineLayered(response) {
    let newData = response.data;
    for(var i =0;i<newData.data.length;i++){
      if(newData.data[i].ficame==2){
        newData.data[i].danwei='%';
        //newData.data[i].ficart=newData.data[i].ficart.concat("%");
      }
    }
    
    response.data = newData;
  }
}
export default productReq;