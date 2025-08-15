// 贷款管理拦截器
const jointRpymtPrd = {

    loanParameterAddReq(response) {
        let newData = response.data;
        if (newData.rpymt_prd_r === "D") {
            newData.rpymt_prd_r = newData.rpymt_prd_d;
        }
        if (newData.rpymt_prd_r === "R") {
            newData.rpymt_prd_r = newData.rpymt_prd_n;
        }
        if(!this.isEmpty(newData.rpymt_prd)){
            return;
        }
        var rpymt_prd;
        if (newData.rpymt_prd_s === "D") {
            rpymt_prd = newData.rpymt_prd_t + newData.rpymt_prd_s + newData.rpymt_prd_z;
        } else if (newData.rpymt_prd_s === "W" || newData.rpymt_prd_s === "X" || newData.rpymt_prd_s === "M") {
            rpymt_prd = newData.rpymt_prd_t + newData.rpymt_prd_s + newData.rpymt_prd_z + newData.rpymt_prd_r;
        } else if (newData.rpymt_prd_s === "Q") {
            rpymt_prd = newData.rpymt_prd_t + newData.rpymt_prd_s + newData.rpymt_prd_z + newData.rpymt_prd_r + newData.rpymt_prd_g;
        } else if (newData.rpymt_prd_s === "Y") {
            rpymt_prd = newData.rpymt_prd_t + newData.rpymt_prd_s + newData.rpymt_prd_z + newData.rpymt_prd_r + newData.rpymt_prd_n;
        };
        newData.rpymt_prd =  rpymt_prd;
    },
    isEmpty(element){
        if(element === null || element === undefined || element === ''){
            return true;
        }else{
            return false;
        }
    }
}
export default jointRpymtPrd;
