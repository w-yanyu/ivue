<template>
  <to-json
    :toUrl="carModelQryUrl"
    @jsonCallBack="carModelCallback"
  ></to-json>
</template>

<script>
import MyMessage from "pte-ui/utils/MyMessage";

export default {
  name: "CarModelChooser",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      pageParams:{
        car_model_no:"",
        car_model_name:""
      },
      carModelQryUrl: "/views/icms/flowStart/jhBusi/car/car_tree_manage.json",
    };
  },
  created() {
  },
  provide() {
    return {
      carModelCallback: this.carModelCallback,
    };
  },
  methods: {
    carModelCallback(data) {
      this.pageParams.car_model_no = data.car_model_no;//车型编号
      this.pageParams.car_model_name = data.car_model_name;//车型名称
      this.returnData();
    },
    returnData(){
      this.$dataBus.doCallBack(this.$parent, this.pageParams);
      this.$dialog.close();
    }
  }
};
</script>
