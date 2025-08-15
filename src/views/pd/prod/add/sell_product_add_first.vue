<template>
  <div>
    <div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" :inline="true">
        <el-row>
          <el-col span="12">
            <el-form-item label="产品模板" prop="template_name">
              <el-input
                placeholder="请选择模板"
                suffix-icon="el-input__icon el-icon-search"
                v-model="ruleForm.template_name"
                @click.native="openDialog"
                class="form-input"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="站位"  v-show="false" prop="prod_type_name" span="12">
              <el-input
                placeholder=""
                v-model="ruleForm.prod_type_name"
                disabled="true"
                class="form-input">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="模板版本" prop="template_version" span="12">
              <el-input
                placeholder=""
                v-model="ruleForm.template_version"
                disabled="true"
                class="form-input">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item label="产品类型" prop="prod_type_name" span="12">
              <el-input
                placeholder=""
                v-model="ruleForm.prod_type_name"
                disabled="true"
                class="form-input">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="产品模板id" v-show="false" prop="template_id">
          <el-input
            placeholder="请选择模板"
            suffix-icon="el-input__icon el-icon-search"
            v-model="ruleForm.template_id"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="产品类型" prop="prod_type" v-show="false">
          <el-input
            placeholder=""
            v-model="ruleForm.prod_type"
            disabled="true"
            class="form-input">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="ruleForm.prod_type !== 'CL' && ruleForm.prod_type !== '' && ruleForm.prod_type !== null" :key="prodKey">
      <el-divider></el-divider>
      <to-json
        toUrl="/views/pd/prod/prodBaseAttribute/prodBaseAttribute_add.json"
        :params="ruleForm">
      </to-json>
    </div>
    <div v-if="ruleForm.prod_type === 'CL'" :key="creditProdKey">
      <el-divider></el-divider>
      <to-json
        toUrl="/views/pd/prod/creditProdBaseAttr/creditProdBaseAttr_add.json"
        :params="ruleForm">
      </to-json>
    </div>
    <div class="container-center">
      <el-button type="primary" @click="submitForm('ruleForm')" class="form-button">提交</el-button>
      <el-button @click="resetForm('ruleForm')" class="form-button">{{$i18ns('重置')}}</el-button>
    </div>
  </div>
</template>

<script>
import MyMessage from "pte-ui/utils/MyMessage";
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "sellProductAddFirst",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  watch: {
    "ruleForm.prod_type": function () {
      console.log(this.ruleForm.prod_type);
    }
  },
  data() {
    return {
      ruleForm: {
        template_name: "",
        template_id: "",
        template_version: "",
        prod_type: "",
        prod_type_name: "",
        cust_class: ""
      },
      page_type: "",
      tranType: "",
      creditProdKey: "",
      prodKey: "",
      prodTypeDict: [],
      rules: {
        template_name: [
          {required: true, message: '请选择产品模板', trigger: 'change'}
        ],
        template_id: [
          {required: true, message: '模板编号为空', trigger: 'change'}
        ],
        prod_type: [
          {required: true, message: '请选择产品类型', trigger: 'change'}
        ]
      }
    }
  },
  created() {
    this.tranType = this.cParentParams.tranType;
    this.page_type = this.cParentParams.page_type;
    console.log("type", this.tranType);
    //初始化字典
    this.getDict();
  },
  methods: {
    /**
     * 打开弹窗
     */
    openDialog() {
      let that = this;
      let url = "";
      if (this.page_type === "CL"){
        url = "/views/pd/prod/creditProd/select_prod_template.json"
      }else {
        url = "/views/pd/prod/select_prod_template.json"
      }
      const option = {
        toRequest: {
          url: url,
          method: "get",
          params: {
            cust_class_list: that.cParentParams.cust_class_list
          },
        },
        width: "50%",
        title: "产品模板选择",
        that: this,
      };
      this.$dataBus.bindCallBackMethod(this, this.bringBack, option);
      this.resetForm('ruleForm');
      this.$dialog.open(option);
    },
    bringBack(formItem, returnData) {
      let data =returnData;
      this.ruleForm.template_name = data["template_name"];
      this.ruleForm.template_id = data["template_id"];
      this.ruleForm.template_version = data["prod_version"];
      this.ruleForm.prod_type = data["prod_type"];
      if (data["cust_class"] !== "99"){
        this.ruleForm.cust_class = data["cust_class"];
      }else{
        this.ruleForm.cust_class = "";
      }

      this.ruleForm.prod_type_name = data["prod_type_name"];
      //刷新下方产品详情页面
      this.prodKey = Math.random();
      this.creditProdKey = Math.random();
    },
    /**
     * 打开弹窗
     */
    openDialog1(data) {
      let params = {
        template_id: this.ruleForm.template_id,
        tranType: this.tranType,
        prod_type: this.ruleForm.prod_type,
        sale_prod_cd: data.sale_prod_cd,
        sale_prod_name: data.sale_prod_name,
        prod_version: data.prod_version,
        template_version: this.ruleForm.template_version,
        cust_class: data.cust_class,
        cust_class_list: data.cust_class + "|99",
        busi_seq: data.busi_seq
      };
      console.log("d当前",params);
      this.$publicFn.openNavTab(
        '@prodLayout',
        "产品配置",
        params,
        this
      );
    },
    /**
     * 获取下拉字典
     */
    getDict() {
      let request_map = {
        "servicecode": "ct2105",
        "grupno": "0006",
      }
      this.$http.invokeAPI("/SUMP/call/RPCCall", "post", request_map).then(response => {
        if (response.code === "200") {
          this.prodTypeDict = response.data;
          console.log("prodTypeDict", this.prodTypeDict);
        } else {
          MyMessage({
            message: response.message,
            type: 'error'
          });
        }
      });
      // request_map["dictType"] = "PD_E_FLOW_TYPE";
      // request_map["dictKey"] = "PD_E_FLOW_TYPE";
      // this.$http.invokeAPI("/SUMP/rest/dict", "post", request_map).then(response => {
      //   if (response.code === "200") {
      //     this.prodTypeDict = response.data;
      //     console.log("prodTypeDict", this.prodTypeDict);
      //   } else {
      //     MyMessage({
      //       message: response.message,
      //       type: 'error'
      //     });
      //   }
      // });
    },
    /**
     * 提交表单
     * @param formName
     */
    submitForm(formName) {
      let that = this;
      console.log("that", that);
      let formData = that.$dataBus.getCurrentFormData(that);
      console.log("formData", formData);
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.openDialog1();
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
      let params = formData;
      console.log("params", params);
      params.servicecode = 'pd0210';
      this.$dataBus.doAllValidator(that).then(res => {
        console.log("res", res);
        if (res === true) {
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
            if (res && res.code !== "200") {
              this.$message({
                type: "error",
                message: "提交失败"
              });
            } else {
              //将生成产品返回数据传递
              res.data.cust_class = params.cust_class;
              this.openDialog1(res.data);
            }
          }).catch(err => {
            console.error(err);
          });
        }
      }).catch(() => {
      });
    },
    /**
     * 重置表单
     * @param formName
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>


<style lang="less" scoped>
.container-content {
  .container-content--search {
    padding: 16px 40px 0 12px;
    border-bottom: 1px solid #e3e8f5;
  }

  .container-content--toolbar {
    padding: 10px;
  }

  .container-content--pagination {
    float: right;
    padding: 10px;
  }

  .container-centent--table {
    margin-top: 10px;
  }
}

.container-footer {
  width: 50px;
  margin: 0 auto;
  padding: 10px;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}

.container-toolbar {
  margin: 10px 0;
}

.dialog_content {
  width: 100%;
}

.title_tag {
  font-family: "PingFang SC";
  font-size: 18px;
  font-weight: bold;
  margin: 18px;
}

.container-center {
  margin: 20px 5px;
  padding: 20px 0;
  width: 100%;
  text-align: center;
  justify-content: center;
}

.form-input {
  width: 200px;
}

.form-button {
  width: 80px;
  margin: 0 10px;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}
</style>
