<template>
  <div class="layoutBox" >
    <!-- 主拖拽区 -->
    <!-- 
        拖拽区 ===> content
        拖拽画布考虑：【这个主要是设计拖拽的宽高、间距、特别！！！是item的宽高对后期的影响是很大的】
        1. 我们目前的 content ：width: 1500px; height:650px
        2. 我们将宽度分为 10列，每一列是多少px?  (width -【col + 1】* margin) / col
        3. 高度的计算方式： row * n + (n + 1) * margin <= height
       -->
    <grid-layout
      :layout="layout"
      :col-num="13"
      :row-height="90"
      :max-rows="13"
      :is-draggable="isDraggable"
      :is-resizable="isResizable"
      :is-mirrored="false"
      :vertical-compact="false"
      :preventCollision="false"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <!-- 背景框 -->
      <myGridItemPreview :itemData="backgroundData" v-if="isEditState" />

      <!-- 预览数据 -->
      <myGridItem
        :itemData="previewData"
        @closeItemHandle="closeItemHandle"
        :isDraggable="isDraggable"
      />

      <!-- 正式数据 layout 渲染区 -->
      <myGridItem
        :itemData="layout"
        @closeItemHandle="closeItemHandle"
        :isDraggable="isDraggable"
        ref="myGridItem"
      />
    </grid-layout>
  
    <!-- 图表超市 -->
    <drawer
      title="图表选择"
      :visible.sync="drawerCard"
      width="250px"
      close-on-click-modal
      :modal="false"
      footerBackground="#385fd3"
    >
      <div class="cardList">
        <div
          class="cardList-item"
          v-for="(item, index) in getCardConfigList"
          :key="index"
          @drag="$event => dragHandle($event, item)"
          @dragend="$event => dragendpHandle($event, item)"
        >
         <div class="cardList-item-info"><span>卡片名称：</span>{{ item.titleName }}</div>
          <img :src="item.imgUrl?item.imgUrl:card3" alt="" />
        </div>
      </div>
    </drawer>
  </div>
</template>

<script>
// 引入组件
import { GridLayout } from "vue-grid-layout";

// 引入自己的GridItem
import myGridItem from "./item.vue";
//设置时布局预览格子
import myGridItemPreview from "./itemPreview.vue";
// 引入 自定义配置项
// import { getCardConfigList } from "./getCard";


import drawer from "./drawer";

import { v4 as uuidv4 } from "uuid";

// 一定使用深度克隆！数组是引用对象，会导致数据混乱
//   import { cloneDeep } from "lodash-es";

import { cloneJSON } from "@jsmini/clone";


export default {
  name: "VueLayoutLayout",
  props: {
    isEditState: {
      type: Boolean,
      required: true
    }
  },

  components: { GridLayout, myGridItem, myGridItemPreview, drawer },

  data() {
    return {
      // 最终渲染的数据
      layout: [],
      // 背景框
      backgroundData: [],
      // 拖拽的预览数据，不能将拖拽未完成、拖拽出错的数据直接渲染
      previewData: [],
      // 预设数据【提供的固定模板】
      defaultData: [],

      // 用户自定义的拖拽数据【卡片超市拖拽】
      userData: [],
      isDraggable: false,
      isResizable: false,
      useable: false,

      // 标记拖拽阶段
      flag: "",
      // 预设抽屉
      drawerPreview: false,
      //  卡片超市
      drawerCard: false,

      // 获取卡片配置
      getCardConfigList: [],
      
      // drag 标记实时移动的【move的实时坐标】
      atPiont: [],
      // 最终位置 dragend
      endPiont: [],
      // 标记拖拽元素
      dragItem: null
    };
  },

  watch: {
    
    atPiont: {
      handler(val) {
        if (!val[0] && !val[1]) return;
        // 监听实时位置,并生成预览对象
        const item = this.dragItem;
        // console.log("实时位置", val, item);
        // 需要映射正式数据
        this.previewData = cloneJSON(this.layout);
        const x = Math.ceil(val[0] / 100) - 1;
        const y = Math.ceil(val[1] / 50) - 1;
        this.useable = this.piontUseable(item, this.previewData, x, y);
        this.previewData.push({
          // x y 要根据实时位置生成
          x,
          y,
          w: item.w,
          h: item.h,
          i: item.i,
          titleName: item.titleName, //栏位标题
          unitName: item.unitName //栏位单位
        });
      },
      deep: true
    },
    endPiont: {
      handler(val) {
        // 监听最后位置【转换为正式数据】
        // console.log("最后位置", this.previewData);
        this.layout = cloneJSON(this.previewData);
        this.previewData = []; // 清空预览数据
      },
      deep: true
    },
    isEditState: {
      handler(val) {
        // val
        //   ? ((this.isDraggable = true), (this.isResizable = true))
        //   : ((this.isDraggable = false), (this.isResizable = false));
        if(val){
          this.isDraggable = true;
          this.isResizable = true
        }else{
          this.isDraggable = false;
          this.isResizable = false;
          console.log("结束位置后对layout进行存储2222222222", this.layout);
          sessionStorage.setItem("dynamicScreemLayout", JSON.stringify(this.layout));
        }
      }
    }
  },
  mounted() {
  
    this.initPreviewData();
    //接收到titleBar的bus 产品改变
    this.$bus.on("operatorInteraction", operatorType => {
      // console.log("设置消息----", operatorType);
      switch (operatorType) {
        case "layout":
          this.drawerPreview = !this.drawerPreview;
          break;
        case "charts":
          this.drawerCard = !this.drawerCard;
          break;
        case "reset":
          // 最终渲染的数据
          this.layout = [];
          // 拖拽的预览数据，不能将拖拽未完成、拖拽出错的数据直接渲染
          this.previewData = [];
          // 预设数据【提供的固定模板】
          this.defaultData = [];
          break;
      }
    });
    // this.$nextTick(()=>{
    //   this.layout=sessionStorage.getItem("dynamicScreemLayout")?JSON.parse(sessionStorage.getItem("dynamicScreemLayout")):[];
    // console.log('------------- this.layout', this.layout)
    // })
    // this.layout = getCardConfigList();
    // this.layout = defaultPreviewData[this.defaultPreviewIndex];
  },

  methods: {
    initPreviewData() {
      this.backgroundData = [];
      for (let i = 0; i < 13; i++) {
        for (let j = 0; j < 13; j++) {
          this.backgroundData.push({
            x: i,
            y: j,
            w: 1,
            h: 1,
            i: uuidv4() // 防止 key 重复
          });
        }
      }
    },

    // 判断位置是否可用[做成通用函数，可判断任意数组的位置可用性]
    piontUseable(item, data, x, y) {
      let useable = true;
      // 思路就是判断当前数据中是否包含了该位置的元素【1：1】
      // 同时还需要检测大小是否能放下该元素 【大放小】
      // 位置[能放下指的是，在我的宽高尺寸范围内，都没有元素]
      data.forEach(i => {
        // 当前 数组内的元素的范围：
        // i.x 开始，i.w 结束，判断当前范围内，传入的 x 值 是否合理
        if ((i.x <= x && x <= i.w) || (i.y <= y && y <= i.h)) useable = false;

        // 判断范围【指的是 当前元素的大小 从 x y 开始 w h 范围内 没有元素】
        if (!(i.x >= x && i.x <= item.w) && !(i.y >= y && i.y <= item.h))
          useable = false;
      });
      return useable;
    },

    closeItemHandle(item) {
      // 预览与正式数据公用一个 item 因此，需两者都清除数据
      console.log("this.layout==========this.previewData", this.layout, item)
      this.layout.splice(this.layout.findIndex(i => i.i == item.i), 1);
      console.log("this.layout==========22222222222", this.layout, item)

      this.previewData.splice(
        this.previewData.findIndex(i => i.i == item.i),
        1
      );

      // 表单的layout是根据ruleForm发现的，要同步物理删除掉表单中的卡片
      this.$bus.emit("changeFormLayout", this.layout)
    },
    
    // 拖动开始
    dragHandle(e, item) {
      // console.log('选择的图标item',item)
      // 如果初始位置为0 不执行
      if (!e.x && !e.y) return;

      this.drawerCard = false;

      const Tx = e.clientX - 58;
      const Ty = e.clientY - 60;
      const _atPiont = this.atPiont;

      // 如果保持不动*（位置不变）
      if (Tx == _atPiont[0] && Ty == _atPiont[1]) return;
      this.atPiont = [Tx, Ty];

      // drag 事件一直在执行，只有初始化的时候，不同的 kpid 才执行该语句
      if (!this.dragItem || this.dragItem.kpid != item.kpid)
        this.dragItem = item;
    },

    // 拖动结束
    dragendpHandle(e, item) {
      const Tx = e.clientX - 58;
      const Ty = e.clientY - 60;
      // 清空实时位置
      this.atPiont = [null, null];
      this.endPiont = [];
    },
    //设置模块参数
    setLayout(layoutOption){
      this.layout=[]
      this.layout.push(...layoutOption.layoutArray);
      this.isDraggable=true
      this.isResizable=true
      console.log('setLayout----->',this.layout)
    },
    
  }
};
</script>

<style lang="less" scoped>
.layoutBox {
  width: 100%;
  height: 95vh;
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
  // position: relative;
}
.cardList {
  height: 95%;
  width: 100%;
  padding-right: 5px;
  overflow-x: hidden;
  &-item {
    margin: 10px;
    margin-left: 0;
    height: 200px;
    display: flex;
    flex-direction: column;
    width: 100%;
    img {
      width: 200px;
      height: 100%;
      cursor: move;
    }

    &-info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      font-size: 16px !important;
      span {
        font-weight: 900;
        color: #4d99fb;
      }
    }
  }
}

.preview {
  border: solid 1px rgba(248, 248, 248, 0.5);
  margin: 10px;
  height: 150px;
  cursor: pointer;
  .default {
    height: 100%;
    display: flex;

    img {
      width: 200px;
      height: 100%;
    }

    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 10px;
      font-size: 16px !important;
      span {
        font-weight: 900;
        color: #4d99fb;
      }
    }
  }
}
// .drawer-el-grid{
// height: 100%;
// // background: #4d99fb;
// background-color: #385fd3;
//   border-left: 2px solid rgba(45, 199, 255, 0.5);
//   padding-left: 20px;
//   font-size: 20px;
//   font-weight: 700;
//   padding-left: 0;
//   color: #3f96a5;

// }
// /deep/.el-drawer {
//   background-color: #385fd3;
//   border-left: 2px solid rgba(45, 199, 255, 0.5);
//   padding-left: 20px;
// }
// /deep/.el-drawer__header {

// }
</style>
