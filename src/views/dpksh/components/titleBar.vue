<template>
  <div class="title-bar" @dblclick="clickFullscreen">
    <!-- <div class="title">{{ titleName }}</div> -->
    <div class="title">{{ produtTitleName }}</div>
    <div class="time">{{ time }}</div>
    <div class="selection-bar">
      <!-- 机构筛选 -->
      <!-- <div class="titletight">
        <span class="selection-title">机构筛选</span>
        <div class="cascader-div">
          <el-cascader
            :append-to-body="false"
            :props="defaultParams"
            :options="institutionOptions"
            v-model="institutionSelected"
            :show-all-levels="false"
            class="cascader "
          ></el-cascader>
        </div>
      </div> -->
      <!-- 产品筛选 -->
      <div class="titletight" >
        <span class="selection-title">{{$i18ns('dpksh.product-screening')}}</span>
        <div class="cascader-div">
          <el-cascader
            class="cascader "
            :append-to-body="false"
            :props="defaultParams"
            :options="productOptions"
            v-model="productSelected"
            :show-all-levels="false"
            @change="productChange" 
          ></el-cascader>
        </div>
      </div>
       <!-- 刷新频率 -->
       <div class="titletight" >
        <span class="selection-title">{{$i18ns('dpksh.refresh-rate')}}</span>
        <div class="cascader-div">
          <el-select v-model="refreshRateValue" :placeholder="$i18ns('dpksh.please-choose')"  class="cascader"  @change="refreshRateChange" :popper-append-to-body='false'>
            <el-option
              v-for="item in refreshRateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
           </el-option>
         </el-select>
        </div>
      </div>
      <!-- 轮播开关 -->
      <!-- <div class="titletight " style="margin-left:5px">
        <span class="selection-title">轮播</span>
        <div style="margin-left:5px;line-height:3">
          <el-switch
            @change="swiperChange"
            width="50"
            active-text="开"
            inactive-text="关"
            inline-prompt="true"
            active-value="1"
            inactive-value="0"
            v-model="number"
          />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "title-bar",
  props: {
    titleName: {
      type: String,
      required: true
    }
  },
  components: {},
  data() {
    return {
      produtTitleName:this.$i18ns('dpksh.Dealer-purchase-vehicle-loan')+this.$i18ns('dpksh.Implementation-of-the-situation'),
      time: "",
      institutionSelected: '', //机构选择器
      productSelected: '00000000001', //产品选择器
      refreshRateValue:'never',//频率选择器
      defaultParams: {
        label: "name",
        value: "id",
        children: "children"
        // expandTrigger: 'hover',
        // multiple :false
      },
      //机构选择器选项
      institutionOptions: [
        {
          id: "1",
          name: "全行"
        },
        {
          id: "2",
          name: "西安总行",
         
        },
        {id:"3",
        name:" 	西咸新区分行",
        children: [
            {
              id: "3-1",
              name: "曲江新区支行"
            },
            {
              id: "3-2",
              name: "经济技术开发区支行"
            },
            {
              id: "3-3",
              name: "高新科技支行"
            },
            {
              id: "3-4",
              name: "碑林区支行"
            },
            {
              id: "3-5",
              name: "莲湖区支行"
            },
            {
              id: "3-6",
              name: "灞桥区支行"
            },
          ]},
        {
          id: "4",
          name: "宝鸡分行"
        },
        {
          id: "5",
          name: "咸阳分行"
        },
        {
          id: "6",
          name: "渭南分行"
        },
        {
          id: "7",
          name: "榆林分行"
        },
        {
          id: "8",
          name: "延安分行",
         
        },
        {
          id: "9",
          name: "铜川分行"
        },
        {
          id: "10",
          name: "汉中分行"
        },
        {
          id: "11",
          name: "安康分行"
        },
        {
          id: "12",
          name: "商洛分行"
        },
       
      ],
      //产品选择器选项
      productOptions: [
        {
          id: "100000001",
          name: this.$i18ns('dpksh.Dealer-purchase-vehicle-loan'),
        },
      
        // {
        //   id: "00003203 ",
        //   name: this.$i18ns('dpksh.Personal-auto-consumption-loan'),
        // },
      ],
      //刷新频率
      refreshRateOptions:[{
          value: 'never',
          label: this.$i18ns('dpksh.never')
        }, {
          value: 'half',
          label: this.$i18ns('dpksh.half')
        }, {
          value: 'hour',
          label: this.$i18ns('dpksh.hour')
        }],
      swiper: "",
      swiperOn: ""
    };
  },
  watch: {},
  created() {},
  mounted() {
    this.produtTitleName=this.productOptions.find(item=>item.id===value[0]).name+this.$i18ns('dpksh.Implementation-of-the-situation')
    setInterval(() => {
      this.getTime();
    }, 1000);
  },
  beforeDestroy() {},
  methods: {
    getTime() {
      var date = new Date();
      date.getFullYear(); //获取完整的年份
      date.getMonth(); //获取当前月份
      date.getDate(); //获取当前日
      date.toLocaleTimeString(); //获取当前时间
      this.time =
        date.getFullYear() +
        this.$i18ns('dpksh.year') +
        (date.getMonth() * 1 + 1) +
        this.$i18ns('dpksh.month') +
        date.getDate() +
        this.$i18ns('dpksh.day') +
        " " +
        date.toLocaleTimeString("chinese", { hour12: false });
    },
    //双击显示全屏
    clickFullscreen() {
      console.log("双击显示全屏");
      this.$emit("clickFullscreen");
    },
    //刷新频率切换
    refreshRateChange(value ){
     this.$emit('refreshRateChange',value)
    },
    //产品选择切换
    productChange(value){
      console.log('1111111',value[0])
      this.$bus.emit('productChange',value[0])
      this.produtTitleName=this.productOptions.find(item=>item.id===value[0]).name+this.$i18ns('dpksh.Implementation-of-the-situation')
    },
    swiperChange() {}
  }
};
</script>

<style lang="less" scoped>
.title-bar {
  width: 100vw;
  height: 7vh;
  display: flex;
  position: relative;
}
.title {
  width: 80%;
  height: 50px;
  margin: 0 auto;
  color: #fff !important;
  font-size: 22px;
  font-weight: bold;
  line-height: 60px;
  text-align: center;
  letter-spacing: 0.5em;
  background: url("./assets/title-bg.png") no-repeat center / 100%;
}
.time {
  position: absolute;
  left: 1vw;
  top: 2vh;
  height: 30px;
  color: #fff !important;
  text-align: left;
  font-weight: 800;
  line-height: 2;
  width: 33.3%;
}
.selection-bar {
  position: absolute;
  right: 1vw;
  top: 2vh;
  height: 30px;
  width: 24vw;
  display: flex;
  justify-content: flex-end;
}
.titletight {
  height: 30px;
  color: #fff;
  text-align: right;
  font-weight: 800;
  line-height: 3;
  display: flex;
  align-items: center;
  margin-right: 0.4vw;
}
.selection-title {
  margin-right: 1px;
  font-size: 12px;
  line-height: 4.5;
  margin-right: 0.4vw;
}
.cascader-div {
  width: 100px;
  line-height: 3;
  position: relative;
}
.cascader {
  position: static;
}

/deep/ .el-cascader .el-input .el-input__inner,
/deep/   .el-select  .el-input .el-input__inner{
  height: 18px !important;
  font-size: 12px;
  background: rgba(0, 65, 114, 0.5) !important;
  border: 1px solid rgba(0, 65, 114, 0.5) !important;
  color: #fff;
}
/deep/ .el-cascader-menu__list,
/deep/ .el-select-dropdown,
/deep/ .el-select-dropdown__item{
  background: #004172 !important;
  background-color: #004172 ;
  font-size: 12px;
  color: #fff;
}

/deep/ .el-cascader-menu__list .el-cascader-node .el-cascader-node__label {
  text-align: left;
}
/deep/ .el-switch__action {
  width: 17px !important;
  height: 1.6vh !important;
  top: 0 !important;
}

/deep/ .el-switch__core {
  height: 1.8vh !important;
  background: #aaa;
}

/deep/ .el-switch__core::after {
 top: -3px;
}
/deep/ .el-cascader-node:not(.is-disabled):hover{
background: #ffffff20;
color: #409EFF !important;
}
</style>
