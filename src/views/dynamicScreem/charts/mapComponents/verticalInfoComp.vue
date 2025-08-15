<template>
  <div class="vertical-info-content">
    <div class="top-describe">
      {{ categoryTitle }}
    </div>
    <div class="top-value">
      <p class="value-style">
        <span>{{ displayNumber }} </span>
        <span class="unit-info"> {{ categoryUnit }}</span>
      </p>
    </div>
  </div>
</template>
<script>
//竖状暂时栏
export default {
  props: {
    //需要显示的数字
    displayNumber: {
      type: String,
      require: true
    },
    //标题栏位
    categoryTitle: {
      type: String,
      require: true
    },
    //数据单位
    categoryUnit: {
      type: String,
      require: true
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
.value-style {
  font-size: 24px;
  font-weight: 800;
  display: flex;
  flex-direction: column;
  line-height: 24px;
  margin: 10px 0;
}
.unit-info {
  font-size: 12px;
}
</style>
