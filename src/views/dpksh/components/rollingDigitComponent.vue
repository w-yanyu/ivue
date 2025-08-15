<template>
  <div class="digit-content">
    <div class="toAD" v-for="(item, index) in integerValue" :key="index">
      <div class="qwNumBox" 
        v-for="(ite, inde) in item" :key="inde">
        <div class="trasBox" :class="['rolling_' + ite]">
          <div class="qwnum">0</div>
          <div class="qwnum">1</div>
          <div class="qwnum">2</div>
          <div class="qwnum">3</div>
          <div class="qwnum">4</div>
          <div class="qwnum">5</div>
          <div class="qwnum">6</div>
          <div class="qwnum">7</div>
          <div class="qwnum">8</div>
          <div class="qwnum">9</div>
        </div>
      </div>
    </div>
    <span class="dot" style="">.</span>
    <div class="toAD" v-for="(item, index) in decimalValue" :key="index">
      <div
        class="qwNumBox" 
        v-for="(ite, inde) in item"
        :key="inde"
      >
        <div class="trasBox" :class="['rolling_' + ite]">
          <div class="qwnum">0</div>
          <div class="qwnum">1</div>
          <div class="qwnum">2</div>
          <div class="qwnum">3</div>
          <div class="qwnum">4</div>
          <div class="qwnum">5</div>
          <div class="qwnum">6</div>
          <div class="qwnum">7</div>
          <div class="qwnum">8</div>
          <div class="qwnum">9</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//数字翻牌组件
export default {
  props: {
    //需要显示的数字
    displayNumber: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      integerValue: ["0"], //整数位数值
      decimalValue: ["0", "0"] //小数位数值
    };
  },
  watch: {
    displayNumber(newVal, oldvalue) {
        this.formDisplayNumber(newVal)
    }
  },
  mounted() {
    this. formDisplayNumber(this.displayNumber)
  },
  methods: {
    //规整显示数据主要方法
    formDisplayNumber(displayNumber){
        if (displayNumber && displayNumber.toString().indexOf(".")!==-1) {
        this.integerValue=this.integerValueArry(displayNumber)
        this.decimalValue=this.decimalValueArry(displayNumber)
      }else{
        this.integerValue=displayNumber.toString.split("");
        this.decimalValue=['0','0']
      }
    },
    /**
     * 整数字符串数组处理
     * 处理要显示的数字 数字需转换成小数点切割的两个字符串，此方法为整数的处理
     * @param {*} displayNumber 
     */
     integerValueArry(displayNumber) {
      //切割数组 取小数点前的
      let integerNum = displayNumber.toString();
      let index = integerNum.indexOf(".");
      let afterNum = integerNum.slice(0, index);
      return afterNum.split("");
    },
    /**
     * 小数位字符串数组处理
     * 处理要显示的数字 数字需转换成小数点切割的两个字符串，此方法为小数的处理
     * @param {*} displayNumber 
     */
    decimalValueArry(displayNumber) {
      //切割数组 取小数点前的
      let  decimalNum = displayNumber.toString();
      let index = decimalNum.indexOf(".");
      let afterNum = decimalNum.slice(index + 1, decimalNum.length);
      return afterNum.split("");
    },


  }
};
</script>
<style lang="less" scoped>
.toAD {
  // margin-left: 12px;
}
.digit-content{
  display: flex;
}
.qwNumBox {
  position: relative;
  display: inline-block;
  overflow: hidden;
  border: 1px solid rgba(72, 152, 241, 0.3);
  border-radius: 6px;
  width: 1.5vw;
  height: 48px;
  margin-right:3px;
}
.trasBox {
  position: absolute;
  left: 0;
  top: 0;
  height: auto;
  width: 100%;
  transform-origin: 0 0;
  transition: top 0.8s;
}
.dot {
  color:#D8D8D8;
  font-size:20px;
  position: relative;
  bottom:-20px;
}
.qwnum {
 
  height: 48px;
  line-height: 48px;
  background: linear-gradient(#3c70c5 50%, #012cad 50%);
  font-size: 32px;
  font-family: MicrosoftYaHei-Bold;
  font-weight: bold;
  color: #fff;
  text-align: center;
}

.rolling_0 {
  animation: rolling_0 2.1s ease;
  transform: translate3d(0, -0px, 0);
}
@-webkit-keyframes rolling_0 {
  from {
    transform: translate3d(0, -720px, 0);
  }
  to {
    transform: translate3d(0, -0px, 0);
  }
}
.rolling_1 {
  animation: rolling_1 3s ease;
  transform: translate3d(0, -48px, 0);
}
@-webkit-keyframes rolling_1 {
  from {
    transform: translate3d(0, -0px, 0);
  }
  to {
    transform: translate3d(0, -48px, 0);
  }
}
.rolling_2 {
  animation: rolling_2 2.1s ease;
  transform: translate3d(0, -96px, 0);
}
@-webkit-keyframes rolling_2 {
  from {
    transform: translate3d(0, -0px, 0);
  }
  to {
    transform: translate3d(0, -96px, 0);
  }
}
.rolling_3 {
  animation: rolling_3 3s ease;
  transform: translate3d(0, -144px, 0);
}
@-webkit-keyframes rolling_3 {
  from {
    transform: translate3d(0, -0px, 0);
  }
  to {
    transform: translate3d(0, -144px, 0);
  }
}
.rolling_4 {
  animation: rolling_4 2.1s ease;
  transform: translate3d(0, -192px, 0);
}
@-webkit-keyframes rolling_4 {
  from {
    transform: translate3d(0, -0px, 0);
  }
  to {
    transform: translate3d(0, -192px, 0);
  }
}
.rolling_5 {
  animation: rolling_5 3s ease;
  transform: translate3d(0, -240px, 0);
}
@-webkit-keyframes rolling_5 {
  from {
    transform: translate3d(0, -0px, 0);
  }
  to {
    transform: translate3d(0, -240px, 0);
  }
}
.rolling_6 {
  animation: rolling_6 2.1s ease;
  transform: translate3d(0, -288px, 0);
}
@-webkit-keyframes rolling_6 {
  from {
    transform: translate3d(0, -0px, 0);
  }
  to {
    transform: translate3d(0, -288px, 0);
  }
}
.rolling_7 {
  animation: rolling_7 3.1s ease;
  transform: translate3d(0, -336px, 0);
}
@-webkit-keyframes rolling_7 {
  from {
    transform: translate3d(0, -0px, 0);
  }
  to {
    transform: translate3d(0, -336px, 0);
  }
}
.rolling_8 {
  animation: rolling_8 2.1s ease;
  transform: translate3d(0, -384px, 0);
}
@-webkit-keyframes rolling_8 {
  from {
    transform: translate3d(0, -0px, 0);
  }
  to {
    transform: translate3d(0, -384px, 0);
  }
}
.rolling_9 {
  animation: rolling_9 4.1s ease;
  transform: translate3d(0, -432px, 0);
}
@-webkit-keyframes rolling_9 {
  from {
    transform: translate3d(0, -0px, 0);
  }
  to {
    transform: translate3d(0, -432px, 0);
  }
}
</style>
