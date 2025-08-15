<template>
  <div class="item-box">
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
      <dv-border-box-10 id="html2canvas" ref="html2canvas">
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
import card1 from "../charts/card1/card";
import card2 from "../charts/card2/card";
import card3 from "../charts/card3/card";
import card4 from "../charts/card4/card";
import card5 from "../charts/card5/card";
import card6 from "../charts/card6/card";
import card7 from "../charts/card7/card";
import cardMap1 from "../charts/cardMap1/card";
import cardMap2 from "../charts/cardMap2/card";
import cardMap3 from "../charts/cardMap3/card";

import html2canvas from "html2canvas";


export default {
  name: "VueLayoutItem",

  props: {
    itemData: {
      type: Array,
      default: false
    },
    isDraggable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      index: 0,
      newX:0,
      newY:0,
      curBox:'',
      map: []
    }
  },
  mounted() {
    this.map = Object.assign(this.itemData)
    console.log("this.map======", this.map)
  },
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
  methods: {
    closeItem(item) {
      this.$emit("closeItemHandle", item);
    },
    //图片格式转换方法
    dataURLToBlob(dataurl) {
      let arr = dataurl.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
    //拿到截图的点击方法
    saveImage() {
      let canvasID = document.getElementById("html2canvas");
      let that = this;
      let a = document.createElement("a");
      html2canvas(canvasID).then(canvas => {
        let dom = document.body.appendChild(canvas);
        dom.style.display = "none";
        a.style.display = "none";
        document.body.removeChild(dom);
        let blob = that.dataURLToBlob(dom.toDataURL("image/png"));
        a.setAttribute("href", URL.createObjectURL(blob));
        //这块是保存图片操作  可以设置保存的图片的信息
        a.setAttribute(
          "download",
          `${this.itemData.i}_${new Date().getTime()}.png`
        );
        console.log(a.href); //图片临时url
        this.imageUrl = a.href;
         this.imageUrlToBase64();
      });
    },
    //异步执行 生成base64
    imageUrlToBase64() {
      //一定要设置为let，不然图片不显示
      let image = new Image();
      //解决跨域问题
      image.setAttribute("crossOrigin", "anonymous");
      let imageUrl = this.imageUrl;
      // let imageUrl = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi-1.lanrentuku.com%2F2020%2F11%2F5%2Fdef6ed04-6d34-402e-99c8-366266f627dd.png%3FimageView2%2F2%2Fw%2F500&refer=http%3A%2F%2Fi-1.lanrentuku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656562123&t=395930212d330393284611aef131c655";
      image.src = imageUrl;
      //image.onload为异步加载
      image.onload = () => {
        let canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        let context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        let quality = 0.8;
        //这里的dataurl就是base64类型
        let dataURL = canvas.toDataURL("image/jpeg", quality); //使用toDataUrl将图片转换成jpeg的格式,不要把图片压缩成png，因为压缩成png后base64的字符串可能比不转换前的长！
        console.log(dataURL);
        this.$bus.emit('getSaveImage',dataURL)
       
      };
    },
    moveEvent(i, x, y) {
      console.log("移动开始--move start", i, x, y);
    },
    movedEvent(i, x, y){
      console.log("移动结束--move end", i, x, y);
    },
    resizeEvent(i, h, w){
      console.log("调整大小时=======", i, h, w);
    },
    resizedEvent(i, h, w){
      console.log("调整大小结束=======", i, h, w);
    },
    containerResizedEvent(i, h, w) {
      console.log("开始时的卡片高和款=========", i, h, w);
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
