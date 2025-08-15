<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="240px" class="custom-common--submit">
        <el-form-item class="submit-item">
            <el-button size="small" type="primary" class="submit-item--btn" @click="submit">提交</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>

import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "GroupCreditSubmitBtn",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      ruleForm: {

      },
      rules: {

      },
    }
  },
  created() {
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate( valid => {
        if(valid) {
          let params = {
            servicecode: 'ICMSLNTS6013',
            ln_cat: this.cParentScope.parentFormModel.lncatp,
            cust_name: this.cParentScope.parentFormModel.cust_name,
            cert_type: this.cParentScope.parentFormModel.idtftp,
            cert_no: this.cParentScope.parentFormModel.idtfno,
            cust_no: this.cParentScope.parentFormModel.cust_no,
            ptclcd: this.cParentScope.parentFormModel.ptclcd,
          };
          let that = this;
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
            if(res && res.code === "200"){
              this.$message({
                type: "success",
                message: "操作成功"
              })
              this.$emit("update",{})
              let params2 ={
                cust_no : that.cParentScope.parentFormModel.cust_no,
                appl_id : res.data.wfinst.appl_id,
                cust_name : res.data.wfinst.cust_name,
                applst : res.data.wfinst.applst,
                appldt : res.data.wfinst.appldt,
                upfmcd : res.data.wfinst.upfmcd,
                brch_cd : res.data.wfinst.brch_cd,
                ln_prod_cd : that.cParentScope.parentFormModel.ptclcd,
                proc_inst_id : res.data.wfinst.proc_inst_id,
                task_inst_id : res.data.wfinst.task_inst_id,
                creator : res.data.wfinst.creator
              }
              that.cParentScope.parentFormModel.cust_no = '';
              that.cParentScope.parentFormModel.lncatp = '';
              that.cParentScope.parentFormModel.cust_name = '';
              that.cParentScope.parentFormModel.idtftp = '';
              that.cParentScope.parentFormModel.idtfno = '';
              that.cParentScope.parentFormModel.lncfno = '';
              this.$publicFn.openNavTab("@WaitToDoDeal", "待办事项办理", params2, this)
            }
          }).catch(err => {
            console.error(err);
          })
        }else {
          this.$message({
              type: "warning",
              message: "校验不通过",
            })
        }
      })
    },
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
    }
  }
}

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
