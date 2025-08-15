<template>
  <div
    class="box"
    :style="{'background':bgColor,'justify-content':data.length>5?'flex-start':'center'}"
  >
    <div class="step-box" v-for="(item,index) in trajectory" :key="item.name">
      <div
        class="my-button"
        :style="{'background':item&&item.type==1?'#507eef':bgColor}"
      >{{item.name}}</div>
      <span v-if="index!=data.length-1">
        <b>-----></b>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    cMeta: Object, //本页面模板json数据Layout对象
    cParentMeta: Object, //父页面模板json数据Layout对象
    cParentParams: Object, //父页面自定义参数与内置参数
    cParentScope: Object //父页面每块区域业务数据
  },
  data() {
    return {
      cParams: this.cParentParams, //使用父页面参数
      bgColor: (this.cParentParams && this.cParentParams.bgColor) || "#e8eaed",
      trajectory: (this.cParentParams && this.cParentParams.trajectory) || [
        {
          name: "游客",
          type: 1
        },
        {
          name: "用户",
          type: 1
        },
        {
          name: "普通用户",
          type: 1
        },
        {
          name: "核心用户",
          type: 2
        }

      ]
    };
  }

};
</script>
<style lang="less" scoped>
.box {
  display: flex;
  align-items: center;
  padding: 10px;
  width: auto;
  cursor: default;
  flex-wrap: wrap;
  height: auto;
  .step-box {
    .my-button {
      display: inline-block;
      cursor: default;
      line-height: 1;
      white-space: nowrap;
      background: #fff;
      border: 1px solid #606266;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: none;
      margin: 0;
      transition: 0.1s;
      font-weight: 500;
      border-radius: 20px;
      padding: 12px 23px;
      margin: 10px;
    }
  }
}
</style>


