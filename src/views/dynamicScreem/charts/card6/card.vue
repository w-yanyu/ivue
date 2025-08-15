<template>
  <div>
    <div class="box" ref="box">
      <div class="box-title">
        <div class="box-title-text">
          {{ titleName }}
          <span class="box-title-unit">{{ unitName }}</span>
        </div>
        <div class="box-blow-up" v-if="!isDraggable">
          <img src="../../assets/blowUp.png" alt="" style="" @click="popover" />
        </div>
      </div>
      <div class="msg-box" v-show="msgArr && msgArr.length > 0">
        <div :class="{ marquee_top: animate }" class="msg-box-content">
          <div class="msg-box-item" v-for="(item, index) in msgArr" :key="index">
            <div class="width100" v-show="msgArr && msgArr.length">
              <div class="item" v-for="(item, index) in msgArr" :key="index">
                <!-- <div class="top-text" >
                        <span>恭喜&ensp;</span>
                        <span class="special-front" >{{ item.name }}</span >
                      </div> -->
                <div class="top-text">
                  <span>{{ item.push_time }}</span>
                </div>
                <!-- <div class="down-text" >
                        <span>当日&ensp;</span>
                        <span class="special-front" >{{ item.porject }}&ensp;</span
                        >
                        <span>净新增&ensp;</span>
                        <span class="special-front" >{{ item.xinzeng }}&ensp;</span
                        >
                        <span>万元 ,</span >
                        <span>当日累计投放&ensp;</span >
                        <span class="special-front">{{ item.leiji }}&ensp;</span
                        >
                        <span>万元</span> 
                      </div> -->
                <div class="down-text">
                  <span class="special-front">{{ item.msg_text }}&ensp;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <PopBlowUpMsgPush
      v-if="isShowPop"
      :titleName="titleName"
      @hiddlePop="popover"
      :option="msgArrs"
      ref="popBlowUp"
    ></PopBlowUpMsgPush>
  </div>
</template>

<script>
import PopBlowUpMsgPush from "../PopBlowUpMsgPush.vue";
import { cloneJSON } from "@jsmini/clone";
export default {
  name: "card6",
  props: {
    //表格标题
    titleName: {
      type: String,
      default: ""
    },
    //表格单位
    unitName: {
      type: String,
      default: ""
    },
    //是否在编辑状态
    isDraggable: {
      type: Boolean,
      default: false
    },
    item: Object
  },
  components: {
    PopBlowUpMsgPush
  },
  data() {
    return {
      isShowPop: false,
      animate: false,
      servicecode: "", // 接口交易码
      productCode: "", //接口查询产品编码
      setInTime: "", // 定时器
      divObj: null,
      msgArr: [
        {
          push_time: "推送时间",
          msg_text: "推送信息内容"
        },
      ],
      msgArrs: []
    };
  },
  mounted() {
    // if (!this.isDraggable) this.getChartData();
    //接受index的定时器刷新bus
    this.$bus.on("refreshCardData", data => {
      data.forEach(ele => {
        if (ele.card_i_name === "card6" && (ele.card_id === this.item.card_id)) {
          this.servicecode = ele.servicecode;
          this.productCode = ele.busi_card_type;
          this.areaCode = ele.branch_id;
          this.getChartData();
        }
      });
    });
    //接收到titleBar的bus 产品改变
    this.$bus.on("productChange", productData => {
      this.productCode = productData.productCode;
      this.getChartData();
    });
    //接收到titleBar的bus 机构改变
    this.$bus.on("branchChange", branchData => {
      this.areaCode = branchData.branchId;
      this.getChartData();
    });

    this.divObj = this.$refs.box;
  },
  // beforeDestroy() {// 移除事件监听器
  //   this.$bus.off("refreshCardData")
  //   this.$bus.off("productChange")
  //   this.$bus.off("branchChange")
  // },
  methods: {
    // 滚动栏滚动
    showMarquee() {
      this.animate = true;
      setTimeout(() => {
        this.msgArr.push(this.msgArr[0]);
        this.msgArr.shift();
        this.animate = false;
      }, 1700);
    },

    //请求额度树数据
    getChartData() {
      let that = this;
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: this.servicecode,
        busi_type: this.productCode, //接口查询产品编码
        branch_id: this.areaCode //接口查询区域编码
      };
      if (this.servicecode) {
        that.$http.invokeAPI(init_url, "post", init_req).then(response => {
          if (response.code === "200") {
            this.timerDestroy();
            this.msgArr = [];
            for (const child of response.data) {
              let time =
                child.push_time.slice(0, 4) +
                "年" +
                child.push_time.slice(4, 6) +
                "月" +
                child.push_time.slice(6, 8) +
                "日" +
                child.push_time.slice(8);
              this.msgArr.push({
                push_time: time,
                msg_text: child.msg_text
              });
            }
            this.msgArrs = cloneJSON(this.msgArr);
            this.setInTime = setInterval(this.showMarquee, 3000);
          } else {
            MyMessage({ message: response.message, type: "error" });
          }
        });
      }
    },
    // 销毁定时器
    timerDestroy() {
      if (this.setInTime) clearInterval(this.setInTime);
    },
    //扩大显示当前图表
    popover() {
      this.isShowPop = !this.isShowPop;
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.box-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
  font-size: 20px;
  font-weight: 900;
  width: 97%;
  margin-top: 1vh;
}

.box-title-text {
  padding-left: 1vw;
}
.box-title-unit {
  font-size: 12px;
  color: #37aeff;
  margin-left: 14px;
}
.msg-box {
  width: 100%;
  margin-top: 1vh;
}
.msg-box-content {
  width: 100%;
  overflow: hidden;
}
.msg-box-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin: 0 auto;
}
.width100 {
  width: 100%;
  display: flex;
  justify-content: center;
}
.item {
  border: none;
  display: flex;
  flex-direction: column;
  width: 88% !important;
  padding: 10px 10px;
  margin-left: 4%;
  background: rgba(0, 103, 229, 0.7);
  border-radius: 6px;
  margin-bottom: 10px;
  justify-content: center;
}
.top-text {
  display: flex;
  flex: 1;
  align-items: baseline;
  font-size: 14px !important;
  color: rgba(255, 255, 255, 0.45);
}
.down-text {
  flex: 1;
  display: flex;
  font-size: 14px !important;
  color: rgba(255, 255, 255, 0.45);
  align-items: center;
}
.special-front {
  font-size: 18px !important;
  font-weight: 800;
  color: #fff;
}

.box-blow-up {
  cursor: pointer;
}
</style>
