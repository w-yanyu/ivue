<!--
 * @Author: weisiyi weisiyi@sunline.cn
 * @Date: 2023-12-19 13:49:24
 * @LastEditors: weisiyi weisiyi@sunline.cn
 * @LastEditTime: 2024-01-25 10:14:54
 * @FilePath: /ivue/src/views/pd/prod/detail/prodVersion/sellProductListing.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="80px"
      v-loading="formLoading"
    >
      <div v-if="isListing">
        <el-form-item :label="$i18ns('复核员')" prop="review_user_id">
          <el-input v-model="form.review_user_id"></el-input>
        </el-form-item>
        <el-form-item :label="$i18ns('密码')" prop="review_user_passwd">
          <!-- <el-input v-model="form.review_user_passwd"></el-input> -->
          <pte-password
            v-model="form.review_user_passwd"
            name="passwd"
            :type="pwdType"
            encryptionType="SHA"
            :min="1"
            autocomplete="on"
          ></pte-password>
          <span class="show-pwd" @click="showPwd">
            <span class="iconfont icon-yanjing1" v-show="isShowPwd"></span>
            <span class="iconfont icon-see" v-show="iseye"></span>
          </span>
        </el-form-item>
        <!-- <el-form-item :label="$i18ns('复核标志')" prop="review_flag">
          <el-radio-group v-model="form.review_flag">
            <el-radio label="0">否</el-radio>
            <el-radio label="1">是</el-radio>
          </el-radio-group>
        </el-form-item> -->
      </div>
      <div v-if="typeShow">
        <el-form-item :label="$i18ns('上架类型')" prop="prod_status">
          <el-radio-group v-model="form.prod_status">
            <el-radio label="00">实时上架</el-radio>
            <el-radio label="04">延迟上架</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          :label="$i18ns('上架日期')"
          v-if="form.prod_status == '04'"
          prop="arrive_date"
        >
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.arrive_date"
            format="yyyy-MM-dd"
            value-format="yyyyMMdd"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </div>
      <div v-if="Show">
        <el-form-item :label="$i18ns('下架类型')" prop="prod_status">
          <el-radio-group v-model="form.prod_status">
            <el-radio label="01">实时下架</el-radio>
            <el-radio label="05">延迟下架</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          :label="$i18ns('下架日期')"
          v-if="form.prod_status == '05'"
          prop="arrive_date"
        >
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.arrive_date"
            format="yyyy-MM-dd"
            value-format="yyyyMMdd"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </div>
      <el-form-item class="footer">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="cancelSubmit">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "sellProductListing",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object // 父页面自定义参数与内置参数
  },
  data() {
    return {
      isListing: false,
      review_flag: "",
      form: {
        review_user_id: "",
        review_user_passwd: "",
        prod_status: "",
        arrive_date: ""
      },
      pwdType: "password",
      isShowPwd: true,
      iseye: false,
      rules: {
        review_user_id: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        review_user_passwd: [
          { required: true, message: "请输入", trigger: "blur" }
        ],
        prod_status: [{ required: true, message: "请选择", trigger: "blur" }],
        arrive_date: [{ required: true, message: "请选择", trigger: "blur" }]
      },
      typeShow: true,
      formLoading: false
    };
  },
  created() {
    this.typeShow = this.cParentParams.prod_status == "00" ? false : true;
    this.Show = this.cParentParams.prod_status != "00" ? false : true;
    this.initSearch();
  },
  methods: {
    /**
     * 初始化查询当前产品是否需要复核
     */
    initSearch() {
      this.formLoading = true;
      let params = {
        appId: this.cParentParams.appId || "icmsOnl",
        length: 10,
        review_flag: "",
        role_id: "",
        servicecode: "ms0062",
        start: 1,
        sub_system_id: "",
        system_id: "",
        trxn_code: this.cParentParams.servicecode || "pd0217",
        trxn_desc: "",
        登记报文标志: ""
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.formLoading = false;
            // 是否需要复核
            this.isListing = res.data[0].review_flag === "1";
            this.review_flag = res.data[0].review_flag;
          }
        })
        .catch(err => {
          this.formLoading = false;
          console.error(err);
        });
    },
    /**
     * 密码加密显示隐藏
     */
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
        this.isShowPwd = false;
        this.iseye = true;
      } else {
        this.pwdType = "password";
        this.isShowPwd = true;
        this.iseye = false;
      }
    },
    onSubmit() {
      const that = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          let params = {
            servicecode: this.cParentParams.servicecode || "pd0217",
            review_flag: that.review_flag,
            prod_version: that.cParentParams.prod_version,
            sale_prod_cd: that.cParentParams.sale_prod_cd,
            template_version: that.cParentParams.template_version,
            ...that.form
          };
         // if (this.cParentParams.prod_status == "00") params.prod_status = "01";
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then(res => {
              if (res && res.code === "200") {
                this.$message({
                  type: "success",
                  message: res.message
                });
                that.$dataBus.doCallBack(that, {});
                that.$dialog.close();
                this.resetForm();
              }
            })
            .catch(err => {
              console.error(err);
            });
        } else {
          this.$message({
            type: "warning",
            message: this.$i18ns("validateErrorMessage")
          });
        }
      });
    },
    cancelSubmit() {
      this.$dialog.close();
      this.resetForm();
    },
    resetForm() {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.footer {
  margin-left: 25%;
}
/deep/ .el-form-item__content {
  .pte-password-input {
    width: 100%;
  }
  .show-pwd {
    position: absolute;
    top: 4px;
    right: 8px;
  }
}

</style>
