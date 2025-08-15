import MyAxios from "pte-ui/utils/MyAxios";
async function getAuthority(pageId) {
     let params = {
       pageId:pageId
      };
      var authMenuList=[];
      await MyAxios.invokeAPI("/SUMP/rest/auth/authority", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            authMenuList = res.data;
           console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
        return authMenuList;
       
   }
   //控制按钮是否显示
   function isShow(val,authMenuList) {
    for (let i = 0, len = authMenuList.length; i < len; i++) {
       if (authMenuList[i].resource_value===val){
           if (authMenuList[i].control_auth_type===true || authMenuList[i].control_auth_type === "disabled"){
                 return true;
               }else{
                 return false;
             }
       }else{
        continue;
       }
     }
     return true;     
   }
   //控制按钮是否能置灰
   function  isDisabled(val,authMenuList) {
     for (let i = 0, len = authMenuList.length; i < len; i++) {
             if (authMenuList[i].resource_value===val){
                 if (authMenuList[i].control_auth_type === "disabled"){
                       return true;
                     }else{
                       return false;
                   }
             }else{
               continue;
             }
           }
   return false;  
   }
 // 时间戳转化
 export default{
    getAuthority,
    isShow,
    isDisabled
  }
  