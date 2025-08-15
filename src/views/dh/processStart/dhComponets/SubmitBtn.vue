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
  name: "SubmitBtn",
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
            servicecode: 'PLMSKGTS0013',
            lncatp: this.cParentScope.parentFormModel.lncatp,
            custna: this.cParentScope.parentFormModel.custna,
            idtftp: this.cParentScope.parentFormModel.idtftp,
            idtfno: this.cParentScope.parentFormModel.idtfno,
            custid: this.cParentScope.parentFormModel.custid,
            lncfno: this.cParentScope.parentFormModel.lncfno,
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
                data_custid : that.cParentScope.parentFormModel.custid,
                data_appl_id : res.data.wfinst.appl_id,
                data_custna : res.data.wfinst.custna,
                data_applst : res.data.wfinst.applst,
                data_appldt : res.data.wfinst.appldt,
                data_upfmcd : res.data.wfinst.upfmcd,
                data_brch_cd : res.data.wfinst.brch_cd,
                data_proc_inst_id : res.data.wfinst.proc_inst_id,
                data_task_inst_id : res.data.wfinst.task_inst_id,
                data_creator : res.data.wfinst.creator
              }
              that.cParentScope.parentFormModel.custid = '';
              that.cParentScope.parentFormModel.lncatp = '';
              that.cParentScope.parentFormModel.custna = '';
              that.cParentScope.parentFormModel.idtftp = '';
              that.cParentScope.parentFormModel.idtfno = '';
              that.cParentScope.parentFormModel.lncfno = '';
              this.$publicFn.openNavTab("@dhWaitToDoDeal", "待办事项办理", params2, this)
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
        let lncatp = 'grdinput'
        return lncatp
      }else if(this.cParentScope.parentFormModel.lncatp === 'RGJM') {
        let lncatp = 'rgjminput'
        return lncatp
      }else {
        let lncatp = 'hkinput'
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
