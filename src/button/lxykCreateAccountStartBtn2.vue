<template>
  <el-button
    v-bind="config.buttonThemeStyle"
    plain
    :size="size"
    :type="type"
    @click.stop="handleClick()"
    :icon="iconClass"
    :loading="loading"
    :disabled="disabled"
  >
    {{ $i18ns(label) }}
  </el-button>
</template>

<script>
import buttonPropsMixin from "pte-ui/mixins/buttonProps";
import pageJump from "pte-ui/mixins/pageJump";
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "lxykCreateAccountStartBtn",
  components: {},
  mixins: [buttonPropsMixin, pageJump],
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对象
  },
  data() {
    return {
      checkDocInfo: [],//资料检查列表
      flowComType: {//流程通用复合类型
        "prod_version": "4",
        "sale_prod_cd": "LXYK0001",
        "loan_acctg_no": "2312312312323",
        "repay_acct": "2312312312323"
      },
      flowApplyerInfo: {},//流程申请人信息
      similarCreditCardCreateApplyVoCom: {},//类信用卡申请信息
    }
  },
  created() {
    this.initParams();
  },
  methods: {
    initParams(){
      //1.资料检查列表 TODO
      //2.流程通用复合类型
      this.flowComType.cust_no = this.currentData.cust_no;
      this.flowComType.cust_no = this.currentData.cust_no;
      this.flowComType.cust_no = this.currentData.cust_no;
      this.flowComType.cust_no = this.currentData.cust_no;
      this.flowComType.cust_no = this.currentData.cust_no;
      this.flowComType.cust_no = this.currentData.cust_no;
      this.flowComType.cust_no = this.currentData.cust_no;
      this.flowComType.cust_no = this.currentData.cust_no;
      this.flowComType.cust_no = this.currentData.cust_no;
    },
    handleClick() {
      let params = {

      }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res && res.code !== "200") {
            this.$message({
              type: "error",
              message: "申请失败！"
            });
          } else {

          }
        }).catch(err => {
          console.error(err);
        });
    }
  }
}
</script>

<style scoped>

</style>
