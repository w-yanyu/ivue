<template>
  <div class="info-content">
    <!-- 用户信息栏位 -->
    <div class="user-info">

      <div class="user-info-name-table" >
        <i class="el-icon-male" v-if="sexTp===2"></i>
        <i class="el-icon-female" v-else></i>
        <div class="user-info-name">{{ custName }}</div>
      </div>
      <div class="user-info-idnum">{{ certNo }}</div>
      <div class="user-info-cardnum">{{ customeNo }}</div>
      <div class="user-info-bankname">{{ openAcctBranch }}</div>

      <el-button v-if="false" type="primary" @click="open" style="margin-bottom: 15px;"  >管控</el-button>
      <!-- <div class="user-info-btn">管控</div> -->
    </div>

    <!--额度剩余栏位 -->
    <div class="limit-content" >
      <div class="limit-content-table">
        <div>{{ totalLimit }} {{$i18ns('T302.Ten-thousand')}}</div>
        <div>{{$i18ns('T302.Total-amount')}}</div>  <!--总额度  -->
      </div>

      <div class="limit-content-table">
        <div>{{residueLimit}} {{$i18ns('T302.Ten-thousand')}}</div>
        <div>{{$i18ns('T302.Remaining-amount')}}</div> <!--剩余额度  -->
      </div>
    </div>
    
    <!-- 用信产品规模排行 -->
    <div class="product-content-title">{{$i18ns('T302.Ranking-of-scale-of-credit-products')}}</div><!--用心产品排行  -->
    <div class="product-content">
    
      <div class="product-content-item" v-for="(item,index) in prodCreditUseCount"  :key="index">
        <div>{{ item.prod_name }}</div>
        <div class="product-content-item-limit">{{ item.prod_total_credit }}{{$i18ns('T302.Ten-thousand')}}</div>
      </div>
    </div>

    <!-- 渠道偏好 -->
    <div class="product-content-title">{{$i18ns('T302.Channel-preferences')}}</div><!--渠道偏好  -->
    <div class="product-content">
      
      <div class="product-content-item">
        <div class="product-content-item" v-for="(item,index) in prodCreditChanlCount"  :key="index">
          <div>{{ item.source_system_name }}</div>
          <div class="product-content-item-limit">{{ item.total_count }}</div>
      </div>
      </div>
    </div>
    <!-- 联系人 -->
    <div class="inkman-content-title">{{$i18ns('T302.contacts')}}</div><!--联系人  -->
    <div class="linkman-content">
      <div   :class="index===usbCustLinkManCom.length-1?'linkman-content-item marginBottom8 ':'linkman-content-item'" v-for="(item,index) in usbCustLinkManCom" :key="index">
        <div>{{ item.remark }}</div>
        <div :class="linkmanClass(item,index)">
          <div v-if="item.cust_no!==customeNo">{{ item.cust_name }}</div>
          <div >{{ item.mobile_no }}</div>
        </div>
      </div>
    </div>
    <!-- 家庭 -->
    <div class="family-content-title" >{{$i18ns('T302.family')}}</div>
    <div class="family-content" >
      <div  :class="index===usbCustHomeInfoCom.length-1?'family-content-item marginBottom8 ':'family-content-item'" v-for="(item,index) in usbCustHomeInfoCom"  :key="index">
        <div>{{ item.remark }}</div>
        <div :class="familyClass(item,index)" @click.native="jumpCostome(item)">{{ item.cust_name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "InfoAside",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
      //客户编号
      customeNo:{
            type:String,
            require:true
          }
  },
  components: {},
  data() {
    return {
      custName:"",//客户姓名
      sexTp:"",//客户性别
      certNo:"",//证件号码
      // custNo:'',//客户编号
      openAcctBranch:"",//开户行
      usbCustLinkManCom:[],//联系人信息
      usbCustHomeInfoCom:[],//家庭关系
      prodCreditUseCount:[],//用信产品规模
      prodCreditChanlCount:[],//用信渠道规模
      totalLimit:0,//客户总额度
      residueLimit:0,//客户剩余额度
    };
  },
  created() {},
  mounted() {
    
    this.getUserInfo();
    this.getLimitInfo();
    this.getProdCreditUse();
    this.getProdCreditChanl();
  },
  methods: {
   //点管控跳出的弹窗
    open() {
        this.$alert('此功能尚处开发阶段，敬请期待！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },

    //请求客户信息
    getUserInfo() {
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: "uccp1009",
        cust_no:this.customeNo,
        cust_info_type: "1,2,3,4"
      };
      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
        if (response.code === "200") {
          console.log('getUserInfo',response.data);
          let res=response.data.info
          //客户基本信息
          this.custName=res.usbCustInfoCom.cust_name;//客户姓名
          this.sexTp=res.usbCustInfoCom.sex_tp//客户性别
          this.certNo=res.usbCustInfoCom.cert_no//证件号码
          // this.custNo=res.usbCustInfoCom.cust_no//客户编号
          this.openAcctBranch=res.usbCustInfoCom.open_acct_branch//开户行
          //额度信息

          //联系人信息
          this.usbCustLinkManCom=res.usbCustLinkManCom
          //家庭信息
          this.usbCustHomeInfoCom=res.usbCustHomeInfoCom
          //用信产品排行

          //渠道偏好
     
        } else {
          MyMessage({ message: response.message, type: "error" });
        }
      });
    },

    //获取 用信产品排行 信息
    getProdCreditUse() {
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
          servicecode: "uccp4003",
          cust_no:this.customeNo
        };
      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
          if (response.code === "200") {
            console.log('getUserInfo',response.data);
            let res=response.data
            //用信产品排行
            console.info("res=="+res);
            this.prodCreditUseCount=res
          } else {
            MyMessage({ message: response.message, type: "error" });
          }
        });
    },
    //获取 渠道偏好 信息
    getProdCreditChanl() {
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
          servicecode: "uccp4004",
          cust_no:this.customeNo
        };
      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
          if (response.code === "200") {
            console.log('getUserInfo',response.data);
            let res=response.data
            console.info("res=="+res);
            this.prodCreditChanlCount=res
          } else {
            MyMessage({ message: response.message, type: "error" });
          }
        });
    },
    //获取额度信息
    getLimitInfo() {
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: "uccp3024",
        cust_no: this.customeNo,
        cust_info_type: "1,2,3,4"
      };

      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
        if (response.code === "200") {
          console.log('getLimitInfo',response.data);
           //额度信息
          this.totalLimit=response.data.uccpCreditSummaryInfoCom.total_limit
          this.residueLimit=response.data.uccpCreditSummaryInfoCom.total_remaining_limit
        } else {
          MyMessage({ message: response.message, type: "error" });
        }
      });
    },
    //家庭联系人样式方法
    familyClass(item,index){
     let css='' 
      if(item.cust_no&&item.cust_no!=='')
      css='family-content-item-link'
     return css
    },
    //联系人样式方法
    linkmanClass(item,index){
      let css='linkman-content-item-link' 
      if(item.cust_no&&item.cust_no!==''&&item.cust_no!==this.customeNo)
      css=css+' family-content-item-link'
     return css
    },

    //根据客户号进行跳转
    jumpCostome(item){
      if(item.cust_no==='')
      return;
      console.log("跳转到客户号页面")
    }
  }
};
</script>
<style lang="less" scoped>
// 用户信息栏位
.info-content {
  padding-top: 12px;
  width: 98%;
  display: flex;
  flex-direction: column;
  align-items: center;
   
}
.user-info {
  width: 100%;
  border-radius: 5px;
  background: #ffffff;
  margin-bottom: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: PingFangSC-Regular;
  font-size: 12px;
}
.user-info-name-table {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-info-name {
  font-family: PingFangSC-Semibold;
  font-weight: bold;
  font-size: 14px;
}
.user-info-idnum {
  margin-top: 4px;
}
.user-info-cardnum {
  margin-top: 10px;
  margin-bottom: 10px;
}
.user-info-bankname {
  margin-bottom: 10px;
}
.user-info-btn {
  width: 100px;
  height: 30px;
  background-color: rgba(22, 155, 213, 1);
  color: #ffffff;
  text-align: center;
  line-height: 30px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

//额度栏位
.limit-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}
.limit-content-table {
  width: 49%;
  height: 50px;
  border-radius: 5px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: PingFangSC-Regular;
  font-size: 12px;
}
// 联系人
.linkman-content {
  overflow: scroll;
  height: 160px;
  margin-top: 5px;
  width: 100%;
  border-radius: 5px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: PingFangSC-Regular;
  font-size: 12px;

}
.inkman-content-title {
  margin-top: 10px; 
  font-family: PingFangSC-Semibold;
  font-weight: bold;
  font-size: 14px;
  background-color: #f1f1f1;
  text-align: center;
  width: 100%;
}
.linkman-content-item {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.linkman-content-item-link {
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

// 家庭
.family-content {
  overflow: scroll;
  height: 160px;
  margin-top: 5px;
  width: 100%;
  border-radius: 5px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: PingFangSC-Regular;
  font-size: 12px;
}
.family-content-title {
  margin-top: 10px;
  font-family: PingFangSC-Semibold;
  font-weight: bold;
  font-size: 14px;
  background-color: #f2f2f2;
  width: 100%;
  text-align: center;
  //padding-top: 8px;
  //line-height: 22px;
}
.family-content-item {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.family-content-item-link {
  color: #169bd5;
  cursor: pointer;
}
.marginBottom8 {
  margin-bottom: 8px;
}

// 用信产品规模
.product-content {
  overflow: scroll;
  height: 160px;
  margin-top: 5px;
  width: 100%;
  border-radius: 5px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: PingFangSC-Regular;
  font-size: 12px;
}
.product-content-title {
  margin-top: 8px;
  font-family: PingFangSC-Semibold;
  font-weight: bold;
  font-size: 14px;
  background-color: #f3f3f3;
  text-align: center;
  width: 100%;
}
.product-content-item {
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
</style>
