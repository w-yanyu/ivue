<template>
  <div class="branch-manager--container">
    <div class="branch-manager--left">
      <branch-manager-left  ref="branchLeft"/>
    </div>
    <div class="branch-manager--right">
      <branch-manager-right v-on:refresh="goRefresh" ref="branchRight"/>
    </div>
  </div>
</template>
<script>
import BranchManagerLeft from './BranchManagerLeft';
import BranchManagerRight from './BranchManagerRight';

export default {
  name: "BranchManager",
  components: {
    "branch-manager-left": BranchManagerLeft,
    "branch-manager-right": BranchManagerRight
  },
  data() {
    return {}
  },
   methods: {
     //左树刷新数据
     goRefresh($event){
        this.$refs.branchLeft.branchInit(); 
     },
   }
}
</script>
<style lang="less" scoped>
.branch-manager--container {
  height: calc(100% - 2px);
  margin-top: 2px;
  box-sizing: border-box;
  overflow: hidden;
  background: #efefef;
  .branch-manager--left {
    width: 30%;
    height: 100%;
    margin-right: 20px;
    float: left;
    background: #fff;
    border-radius: 0 4px 4px 0;
  }
  .branch-manager--right {
    width: calc(70% - 20px);
    height: 100%;
    overflow-x: auto;
    float: left;
    background: #fff;
    border-radius: 4px 0 0 4px;
  }
}
</style>