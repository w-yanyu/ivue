<template>
  <div class="pageBlock">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageParams.pageNumber"
      :page-sizes="[10, 20, 30, 50, 70]"
      :page-size="pageParams.pageSize"
      :layout="pageParams.pageLayout"
      :total="pageParams.total"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    //这里是父组件传过来的值 pageParams:{total,pageNumber,pageSize}//使用时这三个值需要在父组件中赋值
    pageParams: {
      Type: Object,
      required: true,
    },
    noForm: {
      default: false,
    },
  },
  data() {
    return {};
  },
  created() {
    if (this.pageParams.pageLayout === "" || typeof (this.pageParams.pageLayout) === "undefined"){
      this.pageParams.pageLayout  = "total, sizes, prev, pager, next, jumper";
    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageParams.pageNumber = 1;
      this.pageParams.pageSize = val;
      this.goto(this.pageParams.pageNumber, val);
    },
    handleCurrentChange(val) {
      this.goto(val, this.pageParams.pageSize);
    },
    goto: function (current, size) {
      let data = {
        pageNumber: current,
        pageSize: size,
      };
      //请求父组件form表单,form表单中要定义 @submit.prevent="submit"

      if (this.noForm) {
        this.$emit("pageCallback", data);
      } else {
        this.$parent.submit(data);
      }
    },
  },
};
</script>
<style>
.el-pagination {
  float: right;
  margin-top: 5px;
  margin-right: 10px;
}
.pageBlock {
  display: block;
  height: 40px;
}
.pageBlock .el-select {
  min-width: auto !important;
}
</style>
