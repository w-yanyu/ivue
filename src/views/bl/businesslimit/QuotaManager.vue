<template>
  <div class="quota-manager--container">
    <div class="quota-manager--left">
      <quota-manager-left ref="quotaLeft"/>
    </div>
    <div class="quota-manager--right">
      <quota-manager-right v-on:refresh="goRefresh"/>
    </div>
  </div>
</template>
<script>
import QuotaManagerLeft from './QuotaManagerLeft';
import QuotaManagerRight from './QuotaManagerRight';

export default {
  name: "QuotaManager",
  components: {
    "quota-manager-left": QuotaManagerLeft,
    "quota-manager-right": QuotaManagerRight
  },
  data() {
    return {}
  },
  methods: {
     //左树刷新数据
     goRefresh($event){
        this.$refs.quotaLeft.quotaInit(); 
     },
   }
}
</script>
<style lang="less" scoped>
.quota-manager--container {
  height: calc(100% - 2px);
  margin-top: 2px;
  box-sizing: border-box;
  overflow: hidden;
  background: #efefef;
  .quota-manager--left {
    width: 30%;
    height: 100%;
    margin-right: 20px;
    float: left;
    background: #fff;
    border-radius: 0 4px 4px 0;
  }
  .quota-manager--right {
    width: calc(70% - 20px);
    height: 100%;
    overflow-x: auto;
    float: left;
    background: #fff;
    border-radius: 4px 0 0 4px;
  }
}
</style>