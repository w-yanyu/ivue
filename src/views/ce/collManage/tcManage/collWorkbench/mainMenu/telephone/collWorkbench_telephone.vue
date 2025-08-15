<template>
      <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
        <el-form-item
          label="电话"
          prop="tel"
          :rules="[
      { required: true, message: '电话号码不能为空'}
    ]"
        >
          <el-input type="tel"  v-model.number="numberValidateForm.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain icon="el-icon-service"  @click="submitForm('numberValidateForm')">拨打</el-button>
          <el-button type="primary" plain icon="el-icon-phone" @click="submitForm('numberValidateForm')">挂断</el-button>
          <el-button type="primary" plain icon="el-icon-phone-outline" @click="submitForm('numberValidateForm')">保持</el-button>
          <el-button type="primary" plain icon="el-icon-sort-down" @click="submitForm('numberValidateForm')">签入</el-button>
          <el-button type="primary" plain icon="el-icon-sort-up" @click="submitForm('numberValidateForm')">签出</el-button>
          <el-button type="primary" plain icon="el-icon-check" @click="submitForm('numberValidateForm')">恢复</el-button>
          <el-button type="primary" plain icon="el-icon-loading" @click="submitForm('numberValidateForm')">离席</el-button>
          <el-button type="primary" plain icon="el-icon-time" @click="submitForm('numberValidateForm')">示闲</el-button>
          <el-button type="primary" plain icon="el-icon-circle-check" @click="submitForm('numberValidateForm')">完成</el-button>
          <el-button @click="resetForm('numberValidateForm')">{{$i18ns('重置')}}</el-button>
        </el-form-item>
      </el-form>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";

  export default {
    name: "Test2",
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对
    },
    data() {
      return {
        numberValidateForm: {
          tel: ''
        },
        currentRow: null
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            MyAxios.invokeAPI("/SUMP/xxx/xxx", "post", this.numberValidateForm)
              .then(res => {
                if (res && res.code === "200") {

                } else {
                  this.$message({
                    type: 'error',
                    message: '拨打失败！'
                  })
                }
              })
              .catch(err => {
                console.error(err);
                this.$message({
                  type: 'error',
                  message: '拨打失败！'
                })
              });
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleCurrentChange(val) {
        this.numberValidateForm.tel = val.tel_no;
      }
    }
  }
</script>
<style scoped>
.el-form {
  padding: 16px 12px 0 12px;
  margin-top: -18px;
}
</style>
