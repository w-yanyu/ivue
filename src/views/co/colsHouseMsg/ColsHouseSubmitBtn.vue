<template>
  <div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="300px"
      class="custom-common--submit"
      :span="24"
    >
      <el-form-item class="submit-item">
        <el-button
          size="small"
          type="primary"
          class="submit-item--btn"
          @click="submit"
          >启动流程</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "ColsHouseSubmitBtn",
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
    };
  },
  created() {},
  methods: {
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let params = this.cParentScope.parentFormModel;
          params.servicecode = "co4015";
          params.custna = this.cParentScope.parentFormModel.house_name;
          let that = this;
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then((res) => {
              if (res && res.code === "200") {
                this.$message({
                  type: "success",
                  message: "操作成功",
                });
                this.$emit("update", {});

                  (params.custid = that.cParentScope.parentFormModel.cust_no),
                  (params.appl_id = res.data.list01.appl_id),
                  (params.custna = res.data.list01.cust_name),
                  (params.applst = res.data.list01.applst),
                  (params.appldt = res.data.list01.appl_date),
                  (params.upfmcd = res.data.list01.upfmcd),
                  (params.crdlno = res.data.list01.crdlno),
                  (params.brch_cd = res.data.list01.brch_cd),
                  (params.ln_prod_cd = this.cParentScope.parentFormModel.prodcd),
                  (params.proc_inst_id = res.data.list01.proc_inst_id),
                  (params.task_inst_id = res.data.list01.task_inst_id),
                  (params.creator = res.data.list01.creator);

                // that.cParentScope.parentFormModel.custId = '';

                this.$publicFn.openNavTab(
                  "@colWaitToDoDeal",
                  "待办事项办理",
                  params,
                  this
                );
              }
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          this.$message({
            type: "warning",
            message: "校验不通过",
          });
        }
      });
    } /*,
    getFramecd() {
      if( this.cParentScope.parentFormModel.lncatp === 'GRD'){
        let lncatp = 'manChk'
        return lncatp
      }else if(this.cParentScope.parentFormModel.lncatp === 'RGJM') {
        let lncatp = 'manChk'
        return lncatp
      }else {
        let lncatp = 'manChk'
        return lncatp
      }
    }*/,
  },
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
