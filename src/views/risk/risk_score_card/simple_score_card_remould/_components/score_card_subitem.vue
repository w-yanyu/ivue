<template>
  <div class="subrule-item">
    <slot></slot>
    <span class="top_cut"></span>
    <span class="bottom_cut"></span>
  </div>
</template>
<style lang="less" scoped>
.subrule-item {
  margin-left: 10px;
  position: relative;
  border-left: 1px solid;
  flex: 1 1 auto;
  span.top_cut,
  span.bottom_cut {
    left: 0;
    position: absolute;
    width: 8px;
    height: 1px;
    background: #000;
  }
  span.top_cut {
    top: 0;
  }
  span.bottom_cut {
    bottom: 0;
  }
}
</style>
