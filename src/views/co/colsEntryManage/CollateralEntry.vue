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
        <el-form-item :label="客户名称" prop="cust_name" class="upload-item">
          <div
            class=""
            style="height: 32px;white-space: nowrap;"
          >
           <input
              type="text"
              v-model="formData.cust_name"
              autocomplete="off"
              placeholder=""
              name="cust_name"
              class="el-input__inner lookup-edit el-input"
               disabled
            />
            <button
            type="button"
            class="el-button el-button--primary el-button--mini"
            @click="openDialog"
            style="margin-left: 5px"
          >
            <!----><i class="el-icon-more"></i
            ><!---->
          </button>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="担保方式" prop="guar_type" class="upload-item">
          <el-select
            v-model="formData.guar_type"
            @change="getColtType"
            placeholder=""
          >
            <el-option
              v-for="(item, i) in secTypeList"
              :key="i"
              :label="item.dictName"
              :value="item.dictId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="资产类型" prop="colt_type" class="upload-item">
          <el-select
            v-model="formData.colt_type"
            @change="getColtProd"
            placeholder=""
          >
            <el-option
              v-for="(item, i) in coltTypeList"
              :key="i"
              :label="item.colt_name"
              :value="item.colt_type"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          :label="抵质押品产品"
          prop="colt_prod_cd"
          class="upload-item"
        >
          <el-select
            v-model="formData.colt_prod_cd"
            @change="getAssetType"
            placeholder=""
          >
            <el-option
              v-for="(item, i) in coltProdList"
              :key="i"
              :label="item.colt_prod_name"
              :value="item.colt_prod_cd"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="custom-common--footer">
      <el-button type="primary" size="small" @click="submitForm"
        >{{$i18ns('确认')}}</el-button
      >
      <el-button type="primary" size="small" @click="closeForm">{{$i18ns('取消')}}</el-button>
    </el-row>
  </el-form>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "CollateralEntry",
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
      客户名称:this.$i18ns("客户名称"),
      担保方式:this.$i18ns("担保方式"),
      资产类型:this.$i18ns("资产类型"),
      抵质押品产品:this.$i18ns("抵质押品产品"),

      formData: {
        cust_no: "", //客户编号
        cust_name: "", //客户姓名
        guar_type: "", //担保方式
        colt_type: "", //产品类型
        colt_prod_cd: "", //产品编号
        asset_type: "", //资产分类
        cert_no: "",//证件号码
        cert_type: "",//证件类型
        issuing_addr: "",//地址
        cust_type:"" //客户类型
      },
      dialogVisible: false,
      rules: {
        cust_name: [{ required: true, message: "请输入客户名称" }],
        guar_type: [{ required: true, message: "请选择担保方式" }],
        colt_type: [{ required: true, message: "请选择资产类型" }],
        colt_prod_cd: [{ required: true, message: "请选择抵质押品产品" }],
      },
      toRequestUrl: "",
      secTypeList: [], // 担保方式
      coltTypeList: [], // 抵质押品类型
      coltProdList: [], // 抵质押品产品
    };
  },
  mounted() {
    //初始化数据字典
    this.getDictList("MS_E_GUAR_TYPE", "secTypeList"); // 初始化额度产品状态数据字典
  },
  created() {},
  methods: {
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType],
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getColtType(val) {
      this.formData.colt_type = "";
      let params = {
        guar_type: val,
        servicecode: "co1012",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this.coltTypeList = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getColtProd(val) {
      this.formData.colt_prod_cd = "";
      this.toRequestUrl = "";
      let obj = this.coltTypeList.find(function (item) {
        return item.colt_type == val;
      }); // 查询相应的对象
      this.toRequestUrl = obj.url_input;
      let params = {
        colt_type: val,
        servicecode: "co1013",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this.coltProdList = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
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
    openDialog() {
      const option = {
        toRequest: {
          url: "/views/us/cust_lookup.json",
          method: "get",
          params: {},
        },
        width: "50%",
        title: "查询客户名称",
        that: this,
      };
      this.$dataBus.bindCallBackMethod(this, this.bringBack, option);
      this.$dialog.open(option);
    },
    bringBack(formItem, returnData) {
      let data = returnData;
      this.formData.cust_name = data["cust_name"];
      this.formData.cust_no = data["cust_no"];
      this.formData.cert_no =data["cert_no"];
      this.formData.cert_type =data["cert_type"];
      this.formData.issuing_addr =data["issuing_addr"];
      this.formData.cust_type =data["cust_type"]
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
            title: "押品录入",
            that: this,
          };

          //  this.$dialog.open(option);
          this.$publicFn.openNavTab(
            this.toRequestUrl,
            "押品录入",
            this.formData,
            this
          );
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
.footer-submit {
  text-align: center;
}
</style>
