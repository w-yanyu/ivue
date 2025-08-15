<template>
  <div class="menu-manager--container">
    <div class="menu-manager--left">
      <menu-manager-left  ref="menuLeft"/>
    </div>
    <div class="menu-manager--right" >
      <menu-manager-right v-on:refresh="goRefresh"/>
    </div>
  </div>
</template>
<script>
import MenuManagerLeft from "./MenuManagerLeft" // 菜单管理左侧组件
import MenuManagerRight from "./MenuManagerRight" // 菜单管理左侧组件

export default {
  name: "MenuManager",
  components: {
    "menu-manager-left": MenuManagerLeft,
    "menu-manager-right": MenuManagerRight
  },
  data() {
    return {
      
    }
  },
  methods: {
    //左树刷新数据
    goRefresh($event){
      this.$refs.menuLeft.menuInit(); 
    },
  }
}
</script>
<style lang="less" scoped>
.menu-manager--container {
  height: calc(100% - 2px);
  margin-top: 2px;
  box-sizing: border-box;
  overflow: hidden;
  background: #efefef;
  .menu-manager--left {
    width: 30%;
    height: 100%;
    margin-right: 20px;
    float: left;
    background: #fff;
    border-radius: 0 4px 4px 0;
  }
   .menu-manager--right {
    width: calc(70% - 20px);
    height: 100%;
    float: left;
    background: #fff;
    border-radius: 4px 0 0 4px;
  }
}
</style>