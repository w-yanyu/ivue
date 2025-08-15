<template>
  <div>
    <to-json
      toUrl="/views/co/colsAppraisement/cobDirectAskFunc/cobDirectAskFuncInfo.json"
      :params="this.param"
      v-if="colt_eval_meth === '8'"
    ></to-json>
    <to-json
      toUrl="/views/co/colsAppraisement/cobInprogProjFunc/cobInprogProjFuncInfo.json"
      :params="this.param"
      v-if="colt_eval_meth === '4'&& eval_type==='1'"
    ></to-json>
    <to-json
      toUrl="/views/co/colsAppraisement/cobBookValueFunc/cobBookValueFuncInfo.json"
      :params="this.param"
      v-if="colt_eval_meth === '7' && eval_type==='1'"
    ></to-json>
    <to-json
      toUrl="/views/co/colsAppraisement/cobIndexFunc/cobIndexFuncInfo.json"
      :params="this.param"
      v-if="colt_eval_meth === '1' && eval_type==='1'"
    ></to-json>

      <to-json
      toUrl="/views/co/colsAppraisement/cobResetCostFunc/cobResetCostFuncInfo.json"
      :params="this.param"
      v-if="colt_eval_meth === '10' && eval_type==='1'"
    ></to-json>
      <to-json
      toUrl="/views/co/colsAppraisement/cobNetAssetAdjustFunc/CobNetAssetAdjuestFuncInfo.json"
      :params="this.param"
      v-if="colt_eval_meth === '5' && eval_type==='1'"
    ></to-json>
      <to-json
      toUrl="/views/co/colsAppraisement/cobMarketPriceFunc/cobMarketPriceFuncInfo.json"
      :params="this.param"
      v-if="colt_eval_meth === '6'"
    ></to-json>
     <to-json
      toUrl="/views/co/colsAppraisement/appraisementOutEntryInfo.json"
      :params="this.param"
      v-if="eval_type ==='2' "
    ></to-json>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
export default {
  name: "evaluateResult",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      ruleForm: {},
      rules: {},
      url: "",
      query: {},
      colt_eval_meth: null,
      eval_type: null,
      param:{}
    };
  },
  created() {
    this.param =this.cParentParams;
    this.param.apply_no =this.cParentParams.applid;
  },
  mounted() {
    let params = {};
    params.servicecode = "co4005";

    params.apply_no = this.cParentParams.applid;
    MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then((res) => {

        if (res && res.code === "200") {
          let result = res.data[0];
          this.eval_type=result.eval_type;
          if (result.colt_eval_meth == "8") {
            this.colt_eval_meth = "8";
          }
          if (result.colt_eval_meth == "4") {
            this.colt_eval_meth = "4";
          }
          if (result.colt_eval_meth == "7") {
            this.colt_eval_meth = "7";

          }
          if (result.colt_eval_meth == "1") {
            this.colt_eval_meth = "1";

          }
          if (result.colt_eval_meth == "9") {
            this.colt_eval_meth = "9";

          }
          if (result.colt_eval_meth == "10") {
            this.colt_eval_meth = "10";

          }
          if (result.colt_eval_meth == "5") {
            this.colt_eval_meth = "5";
          }
           if (result.colt_eval_meth == "6") {
            this.colt_eval_meth = "6";
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.el-form .custom-common--submit {
  padding: 0;
  .submit-item--btn {
    display: block;
    margin: 0 auto;
  }
}
</style>
