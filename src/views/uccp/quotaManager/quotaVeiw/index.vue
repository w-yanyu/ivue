<template>
  <el-container  class="ddd">
    <!-- 左侧数据栏 -->
  
    
    <el-aside :width="sideWidth+'px'"
              :collapse-transition="false"
              :collapse="isCollapse"
              :class="isCollapse?'el-aside':'el-aside2'"

              style="transition-property:width ; transition-duration: 0.7s;"
    
    
    >
    
      <InfoAside class="info-aside"  :customeNo="customeNo"></InfoAside>
    </el-aside >
   
<!-- 折叠按钮 -->
    <div style="position: relative;  height: 20px; font-size: 20px" >
   <span :class="collapseBtnClass"  style="position: absolute ; top :0 ; right: 0; cursor: pointer" @click="collapse"> </span>
 </div>

    <!-- 主屏tabs -->
       <el-container class="fff" >
    <el-main >
      <TabsMain class="tabs-main"  :customeNo="customeNo" :customeName="customeName"></TabsMain>
    </el-main>
      </el-container>
  </el-container>
</template>
<script>

import InfoAside from "./components/InfoAside";
import TabsMain from "./components/TabsMain";


export default {
  name: "InternetVerification",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对
  },
  components: {
    InfoAside,
    TabsMain
  },
  data() {
    return {
      //默认图标为"el-icon-s-fold"
      collapseBtnClass: "el-icon-s-fold",
      //菜单默认不折叠
      isCollapse: false,
      //默认宽度200
      sideWidth: 200,
      gdt:'scroll',
      logoTextShow: true,
 
      customeNo: "", //客户编号
      customeName: "", //客户名称
      //左侧用户信息数据
      userInfo: {
        custName: "", //客户姓名
        sexTp: "", //客户性别
        certNo: "", //证件号码
        custNo: "", //客户编号
        openAcctBranch: "", //开户行
        usbCustLinkManCom: [], //联系人信息
        usbCustHomeInfoCom: [], //家庭关系
      }
    };
  },
  created() {
    console.log("布局相关json数据-----", this.cMeta);
    console.log("父页面传的参数-----", this.cParentParams);
    console.log("父页面的相关json数据-----", this.cParentMeta);
    console.log("父页面的scope数据对-----", this.cParentScope);
    console.log("父页面的客户号-----", this.cParentParams.cust_no);
    this.customeNo= this.cParentParams.cust_no, 
    this.customeName= this.cParentParams.cust_name
  },
  mounted() {
  

  },
  methods: {
    collapse(){
      //collapse为false时展开，为true时折叠。
      this.isCollapse = !this.isCollapse
      this.gdt = 'scroll'
      //折叠时
      if(this.isCollapse){
      	//折叠时宽度为64
        this.sideWidth =  12
        this.gdt = "hidden"
        //变换图标样式
        this.collapseBtnClass = 'el-icon-s-unfold'
        //折叠时不展示名称“ML后台管理系统”
        this.logoTextShow = false
      //展开时
      }else{
      	//展开时宽度为200
        this.sideWidth = 200
        //变换图标样式
        this.collapseBtnClass = 'el-icon-s-fold'
        //展开时展示名称“ML后台管理系统”
        this.logoTextShow = true
      }
    }
 

  }
};
</script>
<style lang="less" scoped>
.ddd{
  padding: 0;
  width: 100%;
  background-color: #f3f3f3;
  
}

.el-aside {
 
  color: #333;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 17vh);
  overflow: hidden;
   
   
   
}
.el-aside2{
  color: #333;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 17vh);
  overflow: hidden;
  overflow-y: scroll;
}

.el-main {
  
  color: #333;
  text-align: center;
  margin-left: 3px;
  height: calc(100vh - 17vh);
  overflow: hidden;
  overflow-y: scroll;
   
}

// body > .el-container {
//   margin-bottom: 40px;
// }
.info-aside {
  width: 200px;
  
}
.tabs-main {
  width: 100%;
  
  margin-top: 4px;
}
.zhedei{
  width: 30%;
}
</style>
