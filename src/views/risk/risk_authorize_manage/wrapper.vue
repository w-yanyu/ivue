<template>
  <div>
    <AuthorizeBaseInfoAdd
      ref="parentForm"
      :scope.sync="c_$scope"
      :cParentParams="cParentParams"
      :cParentMeta="cParentMeta"
      :cParentScope="cParentScope"
    >

    </AuthorizeBaseInfoAdd>
    <!--    <div class="custom-common&#45;&#45;footer">-->
    <!--      <el-button type="primary" size="small" @click="submit" plain>提交</el-button>-->
    <!--      <el-button size="small" @click="reset">取消</el-button>-->
    <!--    </div>-->
  </div>
</template>

<script>
import AuthorizeBaseInfoAdd from "@/views/risk/risk_authorize_manage/baseInfo/risk_authorize_manage_base_add.vue";

export default {
  name: "Wrapper",
  components:{
    AuthorizeBaseInfoAdd
  },
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      c_$scope: {}
    }
  },
  created() {

  },

  methods: {

  }

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
</style>
