<template>
    <div class="title-digit-content"  >
      <div class="title-table">
        <div class="title-table-title" >{{ categoryTitle }}</div>
        <div class="title-table-unit" style="">
          单位:{{categoryUnit }}
        </div>
      </div>
      <div class="digit-table">
        <!-- 数字滚动 -->
        <rollingDigitComponent :displayNumber="displayNumber"/>
      </div>
    </div>
</template>
<script>
import rollingDigitComponent from "./rollingDigitComponent.vue";
//该组件为结合数字翻牌组件，带标题带单位的数字翻牌组件
export default {
    props:{
        //需要显示的数字
        displayNumber:{
            type:String,
            require:true
        },
        //标题栏位
        categoryTitle:{
            type:String,
            require:true
        },
        //数据单位
        categoryUnit:{
            type:String,
            require:true
        },
    },
  components: {
    rollingDigitComponent
  }
};
</script>
<style lang="less" scoped>
.title-digit-content {
    width: 100%;
    color:#fff;
    font-weight:800;
    text-align:left;
    margin-left:0vh;
    display: flex;
    flex-direction: column;
}
.title-table {
  display: flex;
  align-items: baseline;
}
.digit-table{
  display: flex;
}
.title-table-title{
    font-size:18px;
    font-weight:800;
}
.title-table-unit{
    font-size:14px;
    color:#37aeff;
    line-height:2;
    margin-left:1vh;
}

.between {
  display: flex;
  justify-content: space-between;
}
</style>
