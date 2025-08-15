<template>
  <div></div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "UrgentControl",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object // 父页面自定义参数与内置参数
  },
  data() {
    return {
      ruleForm: {
        urgent: ""
      },
      urgentList: []
    }
  },
  watch: {
    'cParentScope.parentFormModel.jmlixi'(newVal, oldVal) {
      this.sumCalc(newVal, this.cParentScope.parentFormModel.jmfaxi, this.cParentScope.parentFormModel.jmznf);
    },
    'cParentScope.parentFormModel.jmfaxi'(newVal, oldVal) {
      this.sumCalc(this.cParentScope.parentFormModel.jmlixi, newVal, this.cParentScope.parentFormModel.jmznf);
    },
    'cParentScope.parentFormModel.jmznf'(newVal, oldVal) {
      this.sumCalc(this.cParentScope.parentFormModel.jmlixi, this.cParentScope.parentFormModel.jmfaxi, newVal);
    }
  },
  created() {
    this.sumCalc(this.cParentScope.parentFormModel.jmlixi, this.cParentScope.parentFormModel.jmfaxi, this.cParentScope.parentFormModel.jmznf);
    switch (this.cParentScope.parentFormModel.initUrgent) {
      case "0":
        this.$set(this.cParentScope.parentFormModel, "urgent", []);
        break;
      case "1":
        this.$set(this.cParentScope.parentFormModel, "requiredUrgent", ["1"]);
        break;
      default:
        this.$set(this.cParentScope.parentFormModel, "urgent", []);
        break;
    }
  },
  methods: {
    sumCalc(jmlixi, jmfaxi, jmznf) {
      jmlixi = parseInt(jmlixi * 100);
      jmfaxi = parseInt(jmfaxi * 100);
      jmznf = parseInt(jmznf * 100);
      let sum = (jmlixi + jmfaxi + jmznf) / 100;
      if (sum > 50000) {
        this.$set(this.cParentScope.parentFormModel, "requiredUrgent", []);
        this.$set(this.cParentScope.parentFormModel, "urgentShowItem", "2");
        this.$parent.$parent.eventsOther("urgentShowItem", "2");
      } else {
        this.$set(this.cParentScope.parentFormModel, "urgent", []);
        this.$set(this.cParentScope.parentFormModel, "urgentShowItem", "1");
        this.$parent.$parent.eventsOther("urgentShowItem", "1");
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .el-form.custom-common--form {
    padding: 0;
  }
</style>