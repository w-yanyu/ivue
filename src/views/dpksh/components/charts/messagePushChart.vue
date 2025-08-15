<template>
  <div class="stacked-line-content-big">
    <div class="stacked-line-content">
      <div class="stacked-line-content-title">
        <div class="stacked-line-content-title-text">
          {{ titleName }}
          <span class="stacked-line-content-unit">{{ unitName }}</span>
        </div>
        <div class="stacked-line-blow-up">
          <img src="../assets/blowUp.png" alt="" style="" @click="popover" />
        </div>
      </div>

      <div class="roll" v-show="msgArr && msgArr.length > 0">
        <div class="roll_cont" style="overflow: hidden">
          <div :class="{ marquee_top: animate }" class="roll_con">
            <div class="roll_box k20" v-for="(item, index) in msgArr" :key="index">
              <div class="roll_main k20">
                <div class="k20" v-show="msgArr && msgArr.length">
                  <div  class="box"  v-for="(item, index) in msgArr" :key="index"  >
                    <!-- <div class="top-text" >
                      <span>恭喜&ensp;</span>
                      <span class="special-front" >{{ item.name }}</span >
                    </div> -->
                    <div class="top-text" >
                      <span >{{ item.push_time }}</span >
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
                    <div class="down-text" >
                      <span class="special-front" >{{ item.msg_text }}&ensp;</span
                      >
                    </div>
                  </div>
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
import PopBlowUpMsgPush from "./PopBlowUpMsgPush.vue";
import {
  cloneJSON
} from '@jsmini/clone';

export default {
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
    //表格数据
    chartData: Object
  },
  components: {
    PopBlowUpMsgPush
  },
  data() {
    return {
      isShowPop: false,
      animate: false,
      productCode:'00000000001',//接口查询产品编码
      setInTime: "", // 定时器
      msgArr: [
        {
          name: "南京分行",
          porject: "零售",
          xinzeng: "1504",
          leiji: "504",
        },
        {
          name: "南昌分行",
          porject: "零售",
          xinzeng: "2804",
          leiji: "2904",
        },
        {
          name: "杭州分行",
          porject: "零售",
          xinzeng: "604",
          leiji: "701",
        },
        {
          name: "北京分行",
          porject: "零售",
          xinzeng: "105",
          leiji: "154",
        },
        {
          name: "济南分行",
          porject: "零售",
          xinzeng: "304",
          leiji: "420",
        },
        {
          name: "长沙分行",
          porject: "零售",
          xinzeng: "604",
          leiji: "712",
        },
      ],
      msgArrs:[]
    
    };
  },
  mounted() {
    //接受index的定时器刷新bus
    this.$bus.on("refreshRateData", data => {
      // console.log("接受index的定时器刷新bus++++++++++++", data);
      this. getChartData()
    });
     //接收到titleBar的bus 产品改变
     this.$bus.on("productChange", productCode => {
      // console.log("接收到titleBar的bus产品改变bus----------------------", productCode);
      this.productCode=productCode
      this. getChartData()
    });
    this.getChartData()
    
  },
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

    //点击放大窗口
    popover() {
      this.isShowPop = !this.isShowPop;
    },
       //请求额度树数据
       getChartData() {
      let that=this
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: "ar0014",
        slbl_prod_code:this.productCode,//接口查询产品编码
        // branch_id:this.areaCode,//接口查询区域编码
      };

      that.$http.invokeAPI(init_url, "post", init_req).then(response => {
        if (response.code === "200") {
          this.timerDestroy()
          this.msgArr=[]
          console.log("getChartData----messagePushChart右下角数据", response.data);
          for (const child of response.data) {
           let time=child.push_time.slice(0,4)+'年'+child.push_time.slice(4,6)+'月'+child.push_time.slice(6,8)+'日'+child.push_time.slice(8)
           this.msgArr.push({
            push_time:time,
            msg_text:child.msg_text
           })
          }
          this.msgArrs = cloneJSON(this.msgArr )
          this.setInTime = setInterval(this.showMarquee, 3000);


        
        } else {
          MyMessage({ message: response.message, type: "error"});
        }
      });
    },
     // 销毁定时器
     timerDestroy() {
      if(this.setInTime)
      clearInterval(this.setInTime);
    }
  }
};
</script>
<style scoped>
.stacked-line-content-big {
  width: 100%;
  height: 100%;
}
.stacked-line-content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 99%;
}
.stacked-line-content-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
  font-size: 18px;
  width: 97%;
  margin-top: 1vh;
}
.stacked-line-content-title-text {
  padding-left: 1vw;
}
.stacked-line-content-unit {
  font-size: 12px !important;;
  color: #37aeff;
  margin-left: 14px;
}
.stacked-line {
  width: 100%;
  height: 30vh;
}
.stacked-line-blow-up {
  position: absolute;
  z-index: 700;
  top: 1vh;
  right: 0.2vw;
  cursor: pointer;
}
.roll{
  width: 100%;
  margin-top: 1vh;
}
      
.roll_cont{
  width: 100%;
}
.box {
  border: none;
  display: flex;
  flex-direction: column;
  width: 88% !important;
  padding: 10px 10px;
  margin-left: 4%;
  background: rgba(0, 103, 229, 0.7);
  border-radius: 6px;
  height:8vh;
  margin-bottom: 10px;
  justify-content: center;
}
.special-front{
  
  font-size: 18px !important;
  font-weight: 800; 
  color: #fff;
}
.txtWrap {
  display: flex;
  display: inline;
  padding-top: 2px;
  align-items: baseline;
}
.top-text{
  display: flex;
  flex: 1;
  align-items: baseline;
  font-size: 14px !important;; 
  color: rgba(255,255,255,0.45);
}
.down-text {
  flex: 1;
  display: flex;
  font-size: 14px !important;; 
  color: rgba(255,255,255,0.45);
  align-items: center;
}
.roll_con {
  width: 100%;
  margin: 0 auto;
}
.k20 {
  width: 100%;
}
.marquee_top {
  width: 100%;
  transition: all 2s;
  /* 容器高度 */
  margin-top: -10.5vh;
  overflow-y: hidden;
}
.roll_box {
  width:100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  margin: 0 auto;
}

.shdow {
  width: 100%;
  height: 30%;
  top:0;

}

.shdow2 {
  width: 100%;
  height: 30%;

}
.zhexiantutop {
  position: absolute;
  display: flex;
  justify-content: space-between;
  padding-left: 24px;
  padding-right: 24px;
  color: #ffffff;
  font-size: 18px !important;;
  top: 15px;
  width: 90%;
  
}
</style>
