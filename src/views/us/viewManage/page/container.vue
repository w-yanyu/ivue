<template>
  <div>
    <!--    <pte-resolver-->
    <!--      :c-parent-meta="c_$meta"-->
    <!--      :c-parent-scope="c_$scope"-->
    <!--      :c-parent-params="c_$params"-->
    <!--      :to-request="url"-->
    <!--    ></pte-resolver>-->
    <emtBase>

    </emtBase>
    <to-json
      :toUrl="url"
      :params="cParentParams"
    ></to-json>
  </div>
</template>

<script>
import emtBase from "@/views/us/viewManage/page/ent/entRevenueData/ent_revenue_data_thumbnail.vue";

export default {
  name: "container",
  components: {
    emtBase
  },
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      c_$meta: {},
      c_$scope: {},
      c_$params: {},
      url: "/views/us/viewManage/page/ent/entRevenueData/ent_revenue_data_tab.json"
    }
  },
  created() {
    this.cParentParams.cust_no = "UR00000000010311";
    this.cParentParams.cert_type = "204";
    this.cParentParams.cert_no = "23454323456234";
    this.cParentParams.show_flash = "1  ";
  },

  methods: {}

}
</script>

<style lang="less" scoped>
.custom-common--form {
  padding: 0;

  .el-row .el-col {
    padding-right: 16px;
  }
}

.row-cell {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tableList {
  border: 0px !important;
}

.tree-right-main {
  height: 100%;
  overflow: auto;
  padding: 15px !important;
}

.tree-left-main {
  border-radius: 0px;
  border-right: 1px solid #C0C4CC;
  height: 100%;
  overflow: auto;
  padding: 15px !important;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}

.changeBackground {
  background: #eaecf0;
}
</style>
