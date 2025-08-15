<template>
 
    <el-row>
     <el-col :span="8" :align="center" >
        <div class="itm"><!-- 左边的数据框 上中下一共三个 里面准备塞echars组件 -->
            <dv-border-box-10>dv-border-box-10</dv-border-box-10>
     </div> 
     <div class="itm">
        <dv-border-box-10>dv-border-box-10</dv-border-box-10>
    </div> 
    <div class="itm">
        <dv-border-box-10>dv-border-box-10</dv-border-box-10>
    </div> 
   </el-col>
   
     <el-col :span="8">
        
            <div class="itm"><!-- 左边的数据框 上中下一共三个 里面准备塞echars组件 -->
            <dv-border-box-10>dv-border-box-10</dv-border-box-10>
     </div> 
     <div class="itm">
        <dv-border-box-10>dv-border-box-10</dv-border-box-10>
    </div> 
    <div class="itm">
        <dv-border-box-10>dv-border-box-10</dv-border-box-10>
    </div> 

        
    </el-col>
   
     <el-col :span="8">
        <div class="itm"><!-- 左边的数据框 上中下一共三个 里面准备塞echars组件 -->
            <dv-border-box-10>dv-border-box-10</dv-border-box-10>
     </div> 
     <div class="itm">
        <dv-border-box-10>dv-border-box-10</dv-border-box-10>
    </div> 
    <div class="itm">
        <dv-border-box-10>dv-border-box-10</dv-border-box-10>
    </div> 
   </el-col>
   </el-row>
   
   </template>
    
    <script>
    export default{
    name:"bigS3",
    
}
    
    </script>
    
    <style scoped >
   
  
    .el-col {
      border-radius: 4px;
    }
   
    .bg-purple {
      background: blue;
      
    }
    
    .grid-content {
       
      min-height: 36px;
    }
    .itm{
      height: 195px;
      width: 95%;
      
      margin: 8px auto;
    }
   
  
  </style>