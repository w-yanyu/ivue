<template>
  <div class="dialog-box">
    <div v-for="(classItem,indexClass) in cardList" :key="indexClass" class="class-content">
        <div class="class-title">
            {{ classItem.itemName }}
        </div>
        <hr class="hr-class"/>
        <div class="item-content">
            <div v-for="(item,index) in classItem.itemList" :key="index"  class="item">
                {{ item.label }}
            <el-image
             :src="item.imgUrl"
             fit="fit"
             class="item-img"
             @click="selectCard(item)"
             ></el-image>
             
            </div>



        </div>
           
       
        


    </div>
  </div>
</template>

<script>
export default {
  name: "dyanmicScreemCardLookUp",
  components: {},
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对
  },
  data() {
    return {
      cardList: [
        {
          itemName: "饼状图",
          itemList: [
            {
              value: "card1",
              label: "南丁格尔玫瑰图",
              imgUrl: require(`../../assets/card1.png`)
            }
          ]
        },
        {
          itemName: "柱状图",
          itemList: [
            {
              value: "card3",
              label: "柱状图",
              imgUrl: require(`../../assets/card3.png`)
            },
            {
              value: "card5",
              label: "条形图",
              imgUrl: require(`../../assets/card5.png`)
            },
           
          ]
        },
        {
          itemName: "折线图",
          itemList: [
            {
              value: "card2",
              label: "单折线图",
              imgUrl: require(`../../assets/card2.png`)
            },
            {
              value: "card4",
              label: "双折线图",
              imgUrl: require(`../../assets/card4.png`)
            }
          ]
        },
        {
          itemName: "地图",
          itemList: [
            {
              value: "cardMap3",
              label: "地图1",
              imgUrl: require(`../../assets/map3.png`)
            },
            {
              value: "cardMap2",
              label: "地图2",
              imgUrl: require(`../../assets/map2.png`)
            },
          ]
        },
        {
          itemName: "其它",
          itemList: [
            {
              value: "card6",
              label: "推送",
              imgUrl: require(`../../assets/card6.png`)
            },
          ]
        }
      ]
    };
  },

  mounted() {
    console.log("父类传过来的cMeta", this.cMeta);
    console.log("父类传过来的cParentParams", this.cParentParams);
    console.log("父类传过来的cParentMeta", this.cParentMeta);
    console.log("父类传过来的cParentScope", this.cParentScope);
  },
  watch: {},
  methods: {
    selectCard(item) {
      let that = this;
      // this.cParentParams.flowCallBack(param, that.isEdit);
      //将lookup结果带回前页面
      that.$dataBus.doCallBack(that, item);
      //关闭当前对话框
      this.$dialog.close();
    }
  }
};
</script>

<style lang="less" scoped>
.dialog-box {
  width: 100%;
  height: 100%;
}
.class-content{
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
}
.class-title{
    font-size: 32px;
    color: #404cfa;
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
}
.hr-class{
    width: 98%;
    height: 2px;
    color: #404cfa;
    
}
.item-content{
    display: flex;
    align-items: center;
    flex-wrap:  wrap ;
}
.item{ 
    display: flex;
    flex-direction: column;
    margin: 10px;
}
.item-img{
    width: 383px;
    height: 250px;
    cursor: pointer;
    transition: all 0.5s;
}
.item-img:hover{ //鼠标悬停时激活
  transition: 0.5s; //动画过渡的更加顺滑
  transform: scale(1.1); //放大倍数
}

</style>
