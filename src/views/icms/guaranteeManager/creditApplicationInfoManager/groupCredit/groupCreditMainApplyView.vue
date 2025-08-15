<template>
  <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>授信主信息</span>
          </template>
          <to-json
            toUrl="/views/icms/guaranteeManager/creditApplicationInfoManager/credit_Main_Allocation_view.json"
            :params="pageParams"
          ></to-json>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <span><em></em>授信金额分配</span>
          </template>
          <to-json
            toUrl="/views/icms/guaranteeManager/creditApplicationInfoManager/groupCredit/group_credit_tree_view.json"
            :params="pageParams"
          ></to-json>
        </el-collapse-item>
      </el-collapse>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
export default {
  name: "groupCreditMainApplyView",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      activeNames:["1","2"],
      pageParams:{
        apply_no: "",
        cust_no: "",
        credit_prod_cd: "",
        is_group_credit: "1",
        pageType: "detail"
      }
    }
  },
  created() {
    this.initParams();
    // this.getCreditProdAttr();
  },

  methods: {
    initParams(){
      this.pageParams.apply_no = this.cParentParams.apply_no;
      this.pageParams.cust_no = this.cParentParams.cust_id;
      this.pageParams.credit_prod_cd = this.cParentParams.prod_cd;
      // this.pageParams.apply_no = "20230720000000000055909";
      // this.pageParams.cust_no =  "UR00000000014339";
      // this.pageParams.credit_prod_cd = "0000000001";
    },
    /**
     * 初始化表单参数
     */
    getCreditProdAttr() {
      let that = this;
      let params = {
        credit_prod_cd: that.pageParams.credit_prod_cd,
        servicecode: 'pd0316'
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          this.pageParams.parent_cl_allocation_mode = res.data.cl_allocation_mode;
        }
      }).catch(err => {
        console.error(err);
      });
    },
  }
}

</script>

<style lang="less" scoped>
.todo-top {
  border-bottom: 1px solid #e3e8f5;
}

.todo-bottom--left {
  width: 50%;
  float: left;
  box-sizing: border-box;
  border-right: 1px solid #e3e8f5;

  .custom-common--form .el-form-item {
    margin-bottom: 0;
  }
}

.internet-info--title {
  font-size: 14px;
  font-weight: 600;
  color: #666;
}

.custom-common--footer {
  padding-top: 10px;
}
</style>
