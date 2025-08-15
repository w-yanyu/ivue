<template>
  <div style="overflow: auto;">
    <el-row v-for="(item, index) in colorList"
      :key="index" style="margin: 2px">
      <el-col style="width: 30%">
        <b>{{item.color_name}}:</b>
      </el-col>
      <el-col style="width: calc(70% - 2px)">
        <div :style="{background: item.color_value}"
             class="color_div"
             @click="getColor(item.color_name)"
        >&nbsp;</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MyMessage from "pte-ui/utils/MyMessage";

export default {
  name: "ColorSelector",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  created() {
    this.color = this.cParentParams.colorTemp;
    this.colorChange();
  },
  data() {
    return {
      params: {},
      colorList:[],
      color: ""
    };
  },
  methods: {
    colorChange(){
      let that =this;
      let temp = that.color.split("|");
      temp.forEach(item => {
        let obj = {
          color_name:"",
          color_value:""
        }
        obj.color_name = item.split(",")[0];
        obj.color_value = item.split(",")[1];
        that.colorList.push(obj);
      })
    },
    getColor(item){
      this.$emit("colorCallback", item);
    }
  }
};
</script>
<style>
.color_div{
  margin: 2px;
  border: 1px solid black;
  width: 100%;
  height: 30px;
}
</style>
