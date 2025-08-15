<template>
  <div class="menu-manager--container">
    <div class="menu-manager--left" >
      <menu-manager-left ref="menuLeft"   :cParentParams='cParentParams'/>
    </div>
    <div class="menu-manager--right">
      <menu-manager-right v-on:refresh="goRefresh" />
    </div>
  </div>
</template>
<script>
  import correlationManagementLeft from "./correlationManagementLeft" // 菜单管理左侧组件
  import correlationManagementRight from "./correlationManagementRight" // 菜单管理左侧组件

  export default {
    name: "MenuManager",
    components: {
      "menu-manager-left": correlationManagementLeft,
      "menu-manager-right": correlationManagementRight
    },
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object // 父页面的scope数据对象
    },
    data() {
      return {

      }
    },
    mounted() {
      console.log('cParentParams', this.cParentParams);
      console.log('cParentMeta', this.cParentMeta);
      console.log('cParentScope', this.cParentScope);
      // this.initData();
    },
    methods: {
      //左树刷新数据
      goRefresh($event) {
        this.$refs.menuLeft.menuInit();
      },
    }
  }
</script>
<style lang="less" scoped>
  .menu-manager--container {
    width: 100%;
    height: 100%;
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
