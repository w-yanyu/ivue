<template>
 
    <el-row>
     <el-col :span="7">
        <div class="itm"><!-- 左边的数据框 上中下一共三个 里面准备塞echars组件 -->
        <dv-border-box-11 :titleWidth='170'   title="当日申请"  ></dv-border-box-11>
     </div> 
     <div class="itm">
        <dv-border-box-11 :titleWidth='170'   title="当月申请"  ></dv-border-box-11>
    </div> 
    <div class="itm">
        <dv-border-box-11 :titleWidth='170'   title="当年申请"  ></dv-border-box-11>
    </div> 
   </el-col>
   
     <el-col :span="10"><div class="grid-content bg-purple-light"></div></el-col>
   
     <el-col :span="7">
        <div class="itm">
            <dv-border-box-11 :titleWidth='170'   title="当日申请"  ></dv-border-box-11>
        </div> 
        <div class="itm">
            <dv-border-box-11 :titleWidth='170'   title="当日申请"  ></dv-border-box-11>
        </div> 
        <div class="itm">
            <dv-border-box-11 :titleWidth='170'   title="当日申请"  ></dv-border-box-11>
        </div> 
   </el-col>
   </el-row>
   
   </template>
    
    <script>
    export default{
    name:"bigS2",
    
}
    
    </script>
    
    <style scoped >
   
  
    .el-col {
      border-radius: 4px;
    }
   
   

    .bg-purple-light {
    opacity: 0;
  }
   
    .grid-content {
       
      min-height: 36px;
    }
    .itm{
      height: 200px;
      width: 100%;
      
      margin: 2px 0 2px 0;
    }
   
  
  </style>