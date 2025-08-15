<template>
  <div class="branch-manager--container">
    <div class="branch-manager--left">
      <branch-manager-left  ref="branch-manager-left"/>
    </div>
    <div class="branch-manager--right">
      <branch-manager-right v-on:refresh="goRefresh" ref="branchRight" :branch_id="branch_id"/>
    </div>
  </div>
</template>
<script>
import BranchRoleManagerLeft from './BranchRoleManagerLeft';
import {EventBus} from "../Bus";
import BranchRoleManagerRight from "./BranchRoleManagerRight";


export default {
  name: "BranchRoleManager",
  components: {
    "branch-manager-left": BranchRoleManagerLeft,
    "branch-manager-right": BranchRoleManagerRight

  },
  data() {
    return {
      branch_id:''

    }
  },
  mounted() {

    EventBus.$on("modifyBranch", (branchInfo) => {

      this.branch_id = branchInfo.branch_id;
      this.title = "机构信息展示";

    });
  },
   methods: {
     //左树刷新数据
     goRefresh($event) {
       this.$refs.branchLeft.branchInit();
     },
   },
  watch: {
    branch_id:{
      handler(val) {
        this.branch_id = val;


      }
    }
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
