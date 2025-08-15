import MyMessage from "pte-ui/utils/MyMessage";
// 拦截器
const totalisator = {
  tongjiAddReq: function(config) {
    if (config && config.data) {
      try {
        if(config.data.addList.length  === 0) {
          if (!config.data.this_bill_istlmt_amt || config.data.this_bill_istlmt_amt.length === 0){
              MyMessage({message: "消费商品信息不能为空", type: "error"});
              return false;
          } else {
            return true;
          }
        } else {
          var order_amount = 0; 
          config.data.addList.forEach(item => {
            order_amount += item.total_money;
          });
          config.data.this_bill_istlmt_amt = order_amount; //调用ln3996 
          config.data.order_amount = order_amount;//调用ar0056
          return true;
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
}
export default totalisator;
