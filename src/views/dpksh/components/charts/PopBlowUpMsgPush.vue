
<template>
  <div class="pop-blow-up">
    <!-- 遮罩层 -->
    <div class="pop-blow-up-mask" @click="hiddlePop"></div>
    <dv-border-box-13  class="pop-blow-up-background">
      <div class="pop-content">
        <div class="pop-blow-up-title">
        <div>
          {{ titleName }}
          <span
            style="font-size: 12px; color: #37aeff; margin-left: 14px"
            >{{ unitName }}</span
          >
         
        </div>
        <div @click="hiddlePop" class="close-btn" ><i class="el-icon-circle-close"></i></div>
      </div>
      <div class="messageBoxContent">
        <!-- <div  v-for="(item, index) in option" :key="index">
          <p>恭喜 <span>{{ item.name }}</span></p>
          <p style=" margin-top: -1%;">
            当日 <span>{{ item.porject }}</span> 净新增 <span>{{ item.xinzeng }}</span> 万元，当日累计投放
            <span>{{ item.leiji }}</span> 万元
          </p>
        </div> -->
        <div  v-for="(item, index) in option" :key="index">
          <p> <span>{{ item.push_time }}</span></p>
          <p style=" margin-top: -1%;">
           <span>{{ item.msg_text }}</span> 
          </p>
        </div>
        
      </div>
      </div>
     
    </dv-border-box-13>
  </div>
</template>
<script>

export default {
  props: {
  titleName:{
    type:String,
    default:'',
  },
  unitName:{
    type:String,
    default:'',
  },
  option:Object
},
  components: {},
  data() {
    return {
    };
  },
  mounted() {
},
  methods: {
   
    //关闭放大窗口
    hiddlePop(){
      this.$emit('hiddlePop')
    }
   
  },
 
};
</script>
<style scoped>
.pop-blow-up {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
}
.pop-blow-up-mask {
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 900;
  width: 100vw;
  height: 100vh;
  opacity: 0.77;
  background: #0d2964;
}
.pop-blow-up-background {
  position: relative;
  z-index: 900;
  opacity: 1 !important;
  margin-left: 15%;
  margin-top: 5%;
  height: 71%;
  width: 70%;
}
.pop-content{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.pop-blow-up-title{
  margin-top: 3vh;
  width: 95%;
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  font-size: 18px;
}
.close-btn{
  cursor: pointer;
}


.messageBoxContent {
    width: 95%;
    height: 80%;
    margin-top: 5%;
    overflow-y: scroll;
    font-size: 24px;
    color: #fff;
}
.messageBoxContent::-webkit-scrollbar{
width:15px;
height: 100px !important;
background: #002A79;
border-radius: 20px;

}

.messageBoxContent::-webkit-scrollbar-thumb{
width:15px;
background: #0096FF;
border-radius: 20px;

}
.messageBoxContent div {
  width: 96%;
  margin-top: 1.2%;
  margin-left: -1%;
  background: #003894;
  text-align: left;
  border-radius: 10px;
}
.messageBoxContent p {
  margin-left: 2%;
}
.messageBoxContent span{
    font-family: MicrosoftYaHei, MicrosoftYaHei-Bold;
    font-weight: 700;
}
.messageBoxShdow{
    width: 98%;
    height: 19%;
    background: -webkit-linear-gradient( rgba(57, 144, 255, 0) 0%, rgba(0, 5, 61, 1) 100% );
    position: absolute;
    top: 79%;
    left: 1%;
    z-index: 700;
    border-radius: 10px ;
}
</style>
