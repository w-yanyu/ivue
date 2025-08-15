<template>
  <div>
    <grid-item
      v-for="item in itemData"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :key="item.i"
      class="grid-item"
      @resize="resizeEvent"
      @move="moveEvent"
      @resized="resizedEvent"
      @container-resized="containerResizedEvent"
      @moved="movedEvent"
    >
      <dv-border-box-10 >
        <div
          class="grid-item-close el-icon-close"
          @click="closeItem(item)"
          v-if="isDraggable"
        ></div>
        <!-- {{ item.titleName }} -->
        <component
          :is="item.card_i_name"
          :item="item"
          :titleName="item.titleName"
          :unitName="item.unitName"
          :isDraggable="isDraggable"
          :servicecode="item.servicecode"
        ></component>
      </dv-border-box-10>
    </grid-item>
  </div>
</template>

<script>
import { GridItem } from "vue-grid-layout";
import card1 from "../../../charts/card1/card";
import card2 from "../../../charts/card2/card";
import card3 from "../../../charts/card3/card";
import card4 from "../../../charts/card4/card";
import card5 from "../../../charts/card5/card";
import card6 from "../../../charts/card6/card";
import card7 from "../../../charts/card7/card";
import cardMap1 from "../../../charts/cardMap1/card";
import cardMap2 from "../../../charts/cardMap2/card";
import cardMap3 from "../../../charts/cardMap3/card";



export default {
  name: "VueLayoutItem",

  props: ["itemData", "isDraggable"],

  components: {
    GridItem,
    card1,
    card2,
    card3,
    card4,
    card5,
    card6,
    card7,
    cardMap1,
    cardMap2,
    cardMap3
  },
  mounted() {},
  methods: {
    closeItem(item) {
      this.$emit("closeItemHandle", item);
    },
    moveEvent(i, x, y) {
      console.log("移动中--move", i, x, y);
      if(x>6 || y>7) this.isDraggable = false
    },
    movedEvent(i, x, y){
      console.log("移动结束--move end", i, x, y);

    },
    resizeEvent(i, h, w, height, width){
      console.log("调整大小时=======", i, h, w, height, width);
    },
    resizedEvent(i, h, w, height, width){
      console.log("调整大小结束=======", i, h, w, height, width);
    },
    containerResizedEvent(i, h, w, height, width) {
      console.log("开始时的卡片高和款=========", i, h, w, height, width);
    }
  }
};
</script>

<style lang="less" scoped>
.grid-item {
  position: relative;
  width: 100%;
  height: 100%;
  border-top: 2px solid rgba(1, 153, 209, 0.5);
  background-color: rgba(6, 30, 93, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;

  &-close {
    width: 10px;
    height: 10px;
    position: absolute;
    right: 3%;
    top: 1%;
    z-index: 100;
    font-size: 24px;
    cursor: pointer;
  }
}
</style>
