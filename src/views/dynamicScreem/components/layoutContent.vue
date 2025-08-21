<template>
  <div class="layoutBox" id="layoutBox">
    <!-- 主拖拽区 -->
    <!-- 
        拖拽区 ===> content
        拖拽画布考虑：【这个主要是设计拖拽的宽高、间距、特别！！！是item的宽高对后期的影响是很大的】
        1. 我们目前的 content ：width: canvasWidth; height:canvasHeight
        2. 我们将宽度分为 10列，每一列是多少px?  (width -【col + 1】* margin) / col
        3. 高度的计算方式： row * n + (row + 1) * margin - titleBar高度 <= height
        (canvasHeight-160)/10
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
        data-html2canvas-ignore="true"
      />

      <!-- 正式数据 layout 渲染区 -->
      <!-- 
        元素的尺寸计算方法
          宽度 width = ( box / colNum ) * w + ( w - 1 ) * margin + border
          高度 height= rowHeight * h +( h - 1 ) * margin + border
       -->
      <myGridItem
        :itemData="layout"
        @closeItemHandle="closeItemHandle"
        :isDraggable="isDraggable"
        ref="myGridItem"
        v-if="layout.length > 0"
      />
    </grid-layout>
    <!-- 机构筛选抽屉 暂时不用 -->
    <drawer
      title="机构选择"
      :visible.sync="drawerBranch"
      width="600px"
      close-on-click-modal
      :modal="false"
      footer-background="#385fd3"
    >
      <div>
        <to-json :toUrl="branchQryUrl" @jsonCallBack="branchCallback"></to-json>
      </div>
    </drawer>
    <!-- 模板布局抽屉 -->
    <drawer
      :title="$i18ns('digitalScreen.template_selection')"
      :visible.sync="drawerPreview"
      width="400px"
      close-on-click-modal
      :modal="false"
      footer-background="#385fd3"
    >
      <div
        class="preview"
        @click="choosePreview(item)"
        v-for="(item, index) in defaultPreviewData"
        :key="index"
      >
        <div class="default" :title="$i18ns('digitalScreen.select_the_template')">
          <img :src="item.card_img" alt="" />
        </div>
        <div class="preview-item-info">{{ item.template_name }}</div>
      </div>
    </drawer>
    <!-- 图表超市 -->
    <drawer
      :title="$i18ns('digitalScreen.chart_select')"
      :visible.sync="drawerCard"
      width="400px"
      close-on-click-modal
      :modal="false"
      footerBackground="#385fd3"
    >
      <div class="cardList">
        <div
          class="cardList-item"
          v-for="(item, index) in cardConfigList"
          :key="index"
          @drag="$event => dragHandle($event, item)"
          @dragend="$event => dragendpHandle($event, item)"
        >
          <img :src="item.card_img ? item.card_img : card3" alt="" />
          <div class="cardList-item-info">{{ item.card_name }}</div>
        </div>
      </div>
    </drawer>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
// 引入组件
import { GridLayout } from "vue-grid-layout";

// 引入自己的GridItem
import myGridItem from "./item.vue";
//设置时布局预览格子
import myGridItemPreview from "./itemPreview.vue";
// 引入 自定义配置项
// import { getCardConfigList } from "./getCard";

import drawer from "./drawer";

import uuid from "uuid";


// 一定使用深度克隆！数组是引用对象，会导致数据混乱
//   import { cloneDeep } from "lodash-es";
const img1 = require("../assets/default1.png");
const img2 = require("../assets/default2.png");
const img3 = require("../assets/default3.png");
const img4 = require("../assets/default4.png");
const card3 = require("../assets/card3.png");
// 获取默认卡片配置
import { getCardConfigList } from "../utils/index";
import { cloneJSON } from "@jsmini/clone";

export default {
  name: "VueLayoutLayout",
  props: {
    // 默认预设布局数据
    defaultPreviewData: {
      type: Array,
      required: true
    },
    // 编辑
    isEditState: {
      type: Boolean,
      required: true
    },
    canvasWidth: {
      // 画布宽度
      type: Number,
      required: true
    },
    canvasHeight: {
      // 画布高度
      type: Number,
      required: true
    }
  },

  components: { GridLayout, myGridItem, myGridItemPreview, drawer },

  data() {
    return {
      branchQryUrl: "/views/dynamicScreem/components/branch_lookup.json",
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
      // 产品筛选抽屉
      drawerBranch: false,
      // 卡片列表
      cardConfigList: [],
      // 获取卡片配置
      getCardConfigList: getCardConfigList(),
      // 预设图片
      img: [img1, img2, img3, img4],
      // 卡片缩略图
      card3,
      // drag 标记实时移动的【move的实时坐标】
      atPiont: [],
      // 最终位置 dragend
      endPiont: [],
      // 标记拖拽元素
      dragItem: null
    };
  },

  watch: {
    // "$store.state.defaultPreviewIndex": {
    //   handler(val) {
    //     this.layout = defaultPreviewData[val];
    //   },
    //   deep: true,
    // },
    // "$store.state.openCard"(val) {
    //   val
    //     ? (this.initPreviewData(),
    //       (this.isDraggable = true),
    //       (this.isResizable = true))
    //     : ((this.showPreview = false),
    //       (this.isDraggable = false),
    //       (this.isResizable = false));
    // },
    atPiont: {
      handler(val) {
        if (!val[0] && !val[1]) return;
        // 监听实时位置,并生成预览对象
        const item = this.dragItem;

        // 需要映射正式数据
        this.previewData = cloneJSON(this.layout);

        const x = Number(item.card_x);
        const y = Number(item.card_y);
        const that = this;
        this.useable = this.piontUseable(item, that.previewData, x, y);
        this.previewData.push({
          card_id: item.card_id,
          titleName: item.card_name,
          unitName: item.card_title,
          card_i_name: item.card_i_name,
          // x y 要根据实时位置生成
          x,
          y,
          w: Number(item.card_w),
          h: Number(item.card_h),
          i: item.card_id,
          moved: item.moved,
          servicecode: item.card_service_code,
          busi_card_type: item.busi_card_type,
          branch_id: item.branch_id,
          gear: item.gear, // 档位
          gear_interval: item.gear_interval, // 间隔
          area1: item.area1, // 区域一
          area2: item.area2, // 区域二
          area3: item.area3, // 区域三
          attribute1: item.attribute1, // 属性一
          attribute2: item.attribute2, // 属性二
          attribute3: item.attribute3, // 属性三
          area_code: item.area_code, // 地图编码
        });
        
      },
      deep: true
    },
    endPiont: {
      handler(val) {
        // 监听最后位置【转换为正式数据】
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
        if (val) {
          this.isDraggable = true;
          this.isResizable = true;
        } else {
          this.isDraggable = false;
          this.isResizable = false;
        }
      }
    },
    layout: {
      handler(newVal, oldVal) {
        if (newVal) {
          sessionStorage.setItem(
            "dynamicScreemLayout",
            JSON.stringify(this.layout)
          );
        }
      }
    }
  },
  created() {
    this.getCardList();
  },
  mounted() {
    this.initPreviewData();
    this.layout = sessionStorage.getItem("dynamicScreemLayout")
      ? JSON.parse(sessionStorage.getItem("dynamicScreemLayout"))
      : [];

    //接收到titleBar的bus 产品改变
    this.$bus.on("operatorInteraction", operatorType => {
      switch (operatorType) {
        case "layout":
          this.drawerPreview = !this.drawerPreview;
          break;
        case "charts":
          this.drawerCard = !this.drawerCard;
          break;
        case "branch":
          this.drawerBranch = !this.drawerBranch;
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
  },

  methods: {
    // 机构带回
    branchCallback(data) {
      this.$bus.emit("branchChange", data);
      this.drawerBranch = !this.drawerBranch;
    },
    initPreviewData() {
      this.backgroundData = [];
      for (let i = 0; i < 13; i++) {
        for (let j = 0; j < 13; j++) {
          this.backgroundData.push({
            x: i,
            y: j,
            w: 1,
            h: 1,
            i: uuid // 防止 key 重复
          });
        }
      }
    },

    /**
     * 获取卡片
     */
    getCardList() {
      let params = {
        servicecode: "ct2602",
        card_id: "", //卡片编号
        card_name: "", //卡片名称
        role_id: "" //角色id
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            this.cardConfigList = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
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
      this.layout.splice(
        this.layout.findIndex(i => i.i == item.i),
        1
      );
      this.previewData.splice(
        this.previewData.findIndex(i => i.i == item.i),
        1
      );
    },
    //默认布局选择
    choosePreview(item) {
      // 处理数据
      let str = item.card_group.replace(/(=)(?=,|})/g, "$1 ");
      let str2 = str.replace(/(\w+)=([^,\]}]+)/g, '"$1":"$2"');
      let newStr = JSON.parse(str2);

      newStr.forEach(item => {
        item.w = Number(item.w);
        item.h = Number(item.h);
        item.x = Number(item.x);
        item.y = Number(item.y);
        item.moved = Boolean(item.moved);
      });

      // 赋值给vuex
      this.layout = newStr;
      // 刷新卡片数据
      this.$nextTick(() => {
        this.$bus.emit("refreshMapData", this.layout);
        this.$bus.emit("refreshCardData", this.layout);
      });
      this.$message({message:(this.$i18ns('digitalScreen.default_layout') + ' : ' + item.template_name), type: "success"});
      this.drawerPreview = false;

      // 判断当前用户是否对可以当前模板进行编辑
      let isEditStateShow = item.is_edit === "1" ? true : false;
      this.$store.commit("SET_EDIT_SHOW", isEditStateShow);

      // 对选择模板进行存储
      sessionStorage.setItem("dynamicScreemModleform", JSON.stringify(item));
      sessionStorage.setItem(
        "dynamicScreemLayout",
        JSON.stringify(this.layout)
      );
    },
    // 拖动开始
    dragHandle(e, item) {
      //遍历判断是否有已添加过的图表
      const copyLayout = Object.assign(this.layout)
      let index = this.layout.findIndex(
        cardItem => cardItem.card_id === item.card_id
      );
      if (index > -1) {
        this.$message.closeAll();
        this.$message({ message: this.$i18ns('digitalScreen.card_repetition'), type: "warning" });
        // 防止数据覆盖清空数据
        this.layout = copyLayout;
        this.previewData = copyLayout;
        return;
      }

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
      if (!this.dragItem || this.dragItem.card_id != item.card_id)
        this.dragItem = item;
    },

    // 拖动结束
    dragendpHandle(e, item) {
      const Tx = e.clientX - 58;
      const Ty = e.clientY - 60;
      // 清空实时位置
      this.atPiont = [null, null];
      this.endPiont = [];
      // 刷新卡片数据
        this.$nextTick(() => {
          this.$bus.emit("refreshMapData", this.layout);
          this.$bus.emit("refreshCardData", this.layout);
        });
    },
    //设置模块参数
    setLayout(layoutOption) {
      
      this.layout = [];
      this.layout.push(layoutOption);
      this.isDraggable = true;
      this.isResizable = true;
    },
    //保存图表预览图片
    getSaveImage() {
      this.$refs.myGridItem.saveImage();
    }
  }
};
</script>

<style lang="less" scoped>
.layoutBox {
  width: 100%;
  height: 95vh;
  overflow: auto;
  // display: flex;
  // align-items: center;
  // justify-content: space-between;
  // position: relative;
  /deep/ .vue-grid-layout {
    margin-bottom: 150px;
  }
}
.cardList {
  height: 95%;
  width: 100%;
  padding-right: 5px;
  overflow-x: hidden;
  &-item {
    margin: 10px;
    margin-left: 0;
    display: flex;
    flex-direction: column;
    width: 100%;
    img {
      width: 100%;
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
  display: flex;
  flex-direction: column;
  border: solid 1px rgba(248, 248, 248, 0.5);
  // height: 200px;
  margin-bottom: 12px;
  cursor: pointer;
  .default {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
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
  .preview-item-info {
    font-size: 16px;
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
