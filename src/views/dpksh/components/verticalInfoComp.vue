<template>
  <dv-border-box-8 class="vertical-info-content" :dur="dur">
    <div class="vertical-info-title">
      <img class="image-icon" src="./assets/qiandai.png" />
      <div class="unit-info">{{ unitInfo }}</div>
    </div>
    <div  class="top-describe">
      {{ topDescribe }}
    </div>
    <div class="top-value">
      {{ topValue }}
    </div>
      
    <div  class="down-describe" v-if="middleDescribe.length>0">
      {{ middleDescribe }}
    </div>
    <div class="down-value" v-if="middleValue.length>0">
      {{ middleValue }}
    </div>

    <div  class="down-describe" v-if="downDescribe.length>0">
      {{ downDescribe }}
    </div>
    <div class="down-value" v-if="downValue.length>0">
      {{ downValue }}
    </div>
  </dv-border-box-8>
</template>
<script>
//竖状暂时栏
export default {
  props: {
    //dataV边框延迟
    dur:{
        type: String,
     default:"3"
    },
    //左上角图标路径
    imageUrl: {
      type: String,
      require: true
    },
    //单位
    unitInfo: {
      type: String,
      require: true
    },
    //上部描述
    topDescribe: {
      type: String,
      require: true
    },
    //上部值
    topValue: {
      type: String,
      require: true
    },
     //中部描述
     middleDescribe: {
      type: String,
      default:''
    },
    //中部部值
    middleValue: {
      type: String,
      default:''
    },
    //下部描述
    downDescribe: {
      type: String,
      default:''
    },
    //下部值
    downValue: {
      type: String,
      default:''
    }
  },
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.vertical-info-content {
  width: 6vw;
  height: auto;
  background: rgba(0, 5, 61, 0.5);
  border: 1px solid #29c3ff;
  box-shadow: 0px 1px 22px 0px rgba(61, 201, 255, 0.82) inset;
}
.vertical-info-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1vh 1vh;
}
.image-icon {
  width: 2vh;
  height: 1.8vh;
}
.unit-info {
  color: #ddd;
  font-size: 12px;
  line-height: 2;
}
.top-describe {
  line-height: 3;
  color: #ddd;
  text-align: center;
  font-size: 14px;
  font-weight: 900;
}
.top-value {
  color: #ddd;
  text-align: center;
  font-size: 24px;
  font-weight: 800;
  color: #fff;
}
.down-describe {
  color: #ddd;
  text-align: center;
  font-size: 14px;
  font-weight: 900;
  line-height: 3
}
.down-value {
  color: #ddd;
  text-align: center;
  font-size: 24px;
  font-weight: 800;
  color: #fff;
}
</style>
