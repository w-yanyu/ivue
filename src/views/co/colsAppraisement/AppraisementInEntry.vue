<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="formData"
    label-width="240px"
    class="demo-ruleForm"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$i18ns('colt.colt_no')" prop="colt_no" class="upload-item">
          <el-input v-model="formData.colt_no" placeholder="" v-on:click.native="openColtDialog"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$i18ns('colt.person_no')" prop="person_no" class="upload-item">
          <el-input v-model="formData.person_no" placeholder="" v-on:click.native="openPersonDialog"></el-input>
        </el-form-item>
      </el-col>
       <el-col :span="12">
        <el-form-item :label="$i18ns('colt.colt_eval_meth_type')"  prop="colt_eval_meth_type" class="upload-item">
          <el-select v-model="formData.colt_eval_meth_type"  @change="getColtProd"  placeholder="">
            <el-option
              v-for="(item, i) in funcTypesList"
              :key="i"
              :label="item.eval_meth_type_name"
              :value="item.colt_eval_meth_type"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$i18ns('colt.last_eval_val')"  prop="last_eval_val" class="upload-item">
          <el-input v-model="formData.last_eval_val" placeholder="" disabled ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$i18ns('colt.last_eval_time')" prop="last_eval_time" class="upload-item">
          <el-input v-model="formData.last_eval_time" placeholder="" disabled ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$i18ns('colt.last_eval_person')" prop="last_eval_person" class="upload-item">
          <el-input v-model="formData.last_eval_person" placeholder="" disabled ></el-input>
        </el-form-item>
      </el-col><el-col :span="12">
      <el-form-item :label="$i18ns('colt.eval_conut')"  prop="eval_conut" class="upload-item">
        <el-input v-model="formData.eval_conut" placeholder="" disabled ></el-input>
      </el-form-item>
    </el-col>
    </el-row>
    <el-row class="custom-common--footer">
      <el-button type="primary" size="small" @click="submitForm"
        >{{ $i18ns('colt.comfirm') }}</el-button
      >
      <el-button type="primary" size="small" @click="closeForm">{{ $i18ns('colt.cancel') }}</el-button>
    </el-row>
  </el-form>
</template>

<script>
import i18n from "pte-ui/i18ns";
import MyAxios from "pte-ui/utils/MyAxios";
export default {
  name: "AppraisementEntry",
  props: {
    size: String, // 控件大小
    config: Object, // 控件的相关配置
    name: String,
    value: [Object, String, Array],
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      formData: {
        colt_eval_meth_type: "", //评估类型
        colt_no: "", //押品编号
        person_no:"",//内评人员编号
        cust_name:"",
        cust_no:""
      },
      rules: {
        colt_no: [{ required: true, message: this.$i18ns("请选择抵质押品") }],
        colt_eval_meth_type: [{ required: true, message: this.$i18ns("请选择评估方法") }],
        person_no: [{ required: true, message: this.$i18ns("请选择评估人员") }],
      },
      toRequestUrl: "",
      funcTypesList: [], // 评估方式

    };
  },
  mounted() {
    //初始化数据字典
   this.getfuncTypes();
  },
  created() {},
  methods: {
    getfuncTypes() {
      let params = {
        servicecode: "co4020"
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this.funcTypesList = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getColtProd(val) {
       console.log(val);
      this.$message({
        type: "warning",
        message: this.$i18ns("你已更改评估方法"),
      });
      this.toRequestUrl = "";
      let obj = this.funcTypesList.find(function (item) {
        return item.colt_eval_meth_type == val;
      }); // 查询相应的对象

      this.toRequestUrl = obj.url_input;

    },
    getAssetType(val) {
      let obj = this.coltProdList.find(function (item) {
        return item.colt_prod_cd == val;
      }); // 查询相应的对象
      this.formData.asset_type = obj.asset_type;
    },
    closeForm() {
      this.$dialog.close();
    },
    openColtDialog() {
      const option = {
        toRequest: {
          url: "/views/co/colsAppraisement/colt_lookup.json",
          method: "get",
          params: {},
        },
        width: "70%",
        title: this.$i18ns("抵质押品查询"),
        that: this,
      };
      this.$dataBus.bindCallBackMethod(this, this.bringBack, option);
      this.$dialog.open(option);
    },
    openPersonDialog() {
      const option = {
        toRequest: {
          url: "/views/co/colsAppraisement/person_lookup.json",
          method: "get",
          params: {},
        },
        width: "70%",
        title: this.$i18ns("评估人员查询"),
        that: this,
      };
      this.$dataBus.bindCallBackMethod(this, this.bringBack1, option);
      this.$dialog.open(option);
    },
    bringBack(formItem, returnData) {
      let data = returnData;
      this.formData.colt_no = data["colt_no"];
      console.log( data["colt_no"]);
      this.formData.last_eval_val = data["last_eval_val"];
      console.log( data["last_eval_val"]);
      this.formData.last_eval_person = data["last_eval_person"];
      console.log( data["last_eval_person"]);
      this.formData.last_eval_time = data["last_eval_time"];
      console.log( data["last_eval_time"]);
      this.formData.eval_conut = data["eval_conut"];
      console.log( data["eval_conut"]);
      this.formData.custna = data["obligee_name"];
        console.log( data["obligee_name"]);
      this.formData.custid = data["cust_no"];
         console.log( data["cust_no"]);
      this.$emit("input", this.value);
      this.setFuncType(data["colt_prod_cd"]);
      console.log( data["colt_prod_cd"]);
    },
    setFuncType(coltProdCd){
      console.log("....................");
      console.log(coltProdCd);
      let request_map = {}
      request_map["servicecode"] = "co1017";
      request_map["colt_prod_cd"] = coltProdCd;
      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", request_map)
      .then(response => {
        if (response && response.code === "200") {
          let data= response.data;
          this.formData.colt_eval_meth_type = data.colt_eval_meth_type;
          console.log(data.colt_eval_meth_type);
            this.toRequestUrl = "";
      let obj = this.funcTypesList.find(function (item) {
        return item.colt_eval_meth_type == data.colt_eval_meth_type;
      }); // 查询相应的对象

      this.toRequestUrl = obj.url_input;
        }
      })
    },
    bringBack1(formItem, returnData) {
      let data = returnData;
      this.formData.person_no = data["person_no"];
      this.$emit("input", this.value);
    },
    submitForm() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          if (this.toRequestUrl == "") {
            this.$message({
              type: "error",
              message: "跳转路径:" + this.toRequestUrl + "失败！",
            });
          }
          const option = {
            toRequest: {
              url: this.toRequestUrl,
              method: "get",
              params: this.formData,
            },
            width: "75%",
            title: this.$i18ns("押品估值信息录入"),
            that: this,
          };
          this.$dialog.open(option);
        } else {
          return false;
        }
      });
    },
  },
  watch: {
    "colt_eval_meth_type": function (value) {
      this.$Message.warning(this.$i18ns("您确定要改变评估类型吗？"));
    }
  }
};
</script>
<style scoped>
.footer-submit {
  text-align: center;
}
</style>
