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
          <el-input
            v-model="formData.colt_no"
            placeholder=""
            v-on:click.native="openColtDialog"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$i18ns('colt.branch_id')" prop="branch_id" class="upload-item">
          <el-input
            v-model="formData.branch_id"
            placeholder=""
            v-on:click.native="openOrganizationDialog"
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$i18ns('colt.last_eval_val')" prop="last_eval_val" class="upload-item">
          <el-input v-model="formData.last_eval_val" placeholder="" disabled ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$i18ns('colt.last_eval_time')"  prop="last_eval_time" class="upload-item">
          <el-input v-model="formData.last_eval_time" placeholder="" disabled ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$i18ns('colt.last_eval_branch')" prop="last_eval_branch" class="upload-item">
          <el-input v-model="formData.last_eval_branch" placeholder="" disabled ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$i18ns('colt.last_eval_person')" prop="last_eval_person" class="upload-item">
          <el-input v-model="formData.last_eval_person" placeholder="" disabled ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$i18ns('colt.eval_conut')" prop="eval_conut" class="upload-item">
          <el-input v-model="formData.eval_conut" placeholder="" disabled ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="" prop="atta_url" lable-width="200px" class="upload-item">
          <single-upload-vue
            class="repay-upload"
            :vueFormKey="'file'"
            :vueFormLabel="$i18ns('colt.eevr')"
            :ifRequire="false"
            :warning="false"
            :fileSize="10"
            :fileName="$i18ns('colt.eevr')"
            @fileStatu="getFileStatu"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$i18ns('colt.oev')" prop="eval_val" class="upload-item">
          <el-input v-model="formData.eval_val" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$i18ns('colt.oec')" prop="eval_cyy" class="upload-item">
          <el-select v-model="formData.eval_cyy" placeholder="">
            <el-option
              v-for="(item, i) in options"
              :key="index"
              :label="item.dictName"
              :value="item.dictId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item  :label="$i18ns('colt.inquiry_basic')" prop="inquiry_basic" class="upload-item">
          <el-input type="textarea" :rows="4" v-model="formData.inquiry_basic" placeholder=""></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$i18ns('colt.eval_time')" prop="eval_time" class="upload-item">
          <el-date-picker
            v-model="formData.eval_time"
            type="date"
            placeholder=""
            value-format="yyyyMMdd"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$i18ns('colt.eval_start_date')" prop="eval_start_date" class="upload-item">
          <el-date-picker
            v-model="formData.eval_start_date"
            type="date"
            placeholder=""
            value-format="yyyyMMdd"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$i18ns('colt.eval_end_date')" prop="eval_end_date" class="upload-item">
          <el-date-picker
            v-model="formData.eval_end_date"
            type="date"
            placeholder=""
            value-format="yyyyMMdd"
          >
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="custom-common--footer">
      <el-button type="primary" size="small" @click="submitForm"
        >{{$i18ns('colt.start_process')}}</el-button
      >
      <el-button type="primary" size="small" @click="closeForm">{{$i18ns('colt.cancel')}}</el-button>
    </el-row>
  </el-form>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import SingleUploadVue from "COM/SingleUploadVue";
import userUtil from "pte-ui/utils/userUtil";
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
  components: {
    SingleUploadVue,
  },
  data() {
    return {
      formData: {
        colt_no: "", //押品编号
        branch_id: "", //外部评估机构
        eval_val: "", //外部评估价值
        eval_cyy: "", //外部评估币种
        inquiry_basic: "", //评估依据
        eval_time: "", //评估时间
        eval_start_date: "", //评估开始时间，
        eval_end_date: "", //评估结束时间，
        atta_url: "", //附件URL，
        cust_name:"",
        cust_no:""
      },
      rules: {
        colt_no: [{ required: true, message: this.$i18ns("请选择抵质押品") }],
        branch_id: [{ required: true, message: this.$i18ns("请选择外部评估机构") }],
        eval_val: [{ required: true, message: this.$i18ns("请输入外部评估价值") }],
        eval_cyy: [{ required: true, message: this.$i18ns("请选择币种") }],
        // atta_url: [{ required: true, message: "请上传外部评估附件报告" }],
         // atta_url: "", //附件URL，
      },
      toRequestUrl: "",
      funcTypesList: [], // 担保方式，
      options: [],//币种
    };
  },
  mounted() {
    //初始化数据字典
    this.getfuncTypes();
    this.getDictList("MS_CURRENCY", "options"); // 初始化额度产品状态数据字典

  },
  created() {},
  methods: {
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
    getfuncTypes() {
      let params = {
        servicecode: "co4020",
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
      this.toRequestUrl = "";
      let obj = this.funcTypesList.find(function (item) {
        return item.func_type == val;
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
        width: "50%",
        title: "抵质押品查询",
        that: this,
      };
      this.$dataBus.bindCallBackMethod(this, this.bringBack, option);
      this.$dialog.open(option);
    },
    getFileStatu(formKey, path, fileStatu) {
      this.formData.atta_url = path;

    },
    openOrganizationDialog() {
      const option = {
        toRequest: {
          url: "/views/co/colsAppraisement/organization_lookup.json",
          method: "get",
          params: {},
        },
        width: "50%",
        title: this.$i18ns("外部评估机构查询"),
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
      this.formData.last_eval_branch = data["last_eval_branch"];
      console.log( data["last_eval_branch"]);
      this.formData.last_eval_person = data["last_eval_person"];
      console.log( data["last_eval_person"]);
      this.formData.last_eval_time = data["last_eval_time"];
      console.log( data["last_eval_time"]);
      this.formData.eval_conut = data["eval_conut"];
      console.log( data["eval_conut"]);
      this.formData.custna = data["obligee_name"];
      console.log( data["obligee_name"]);
      this.formData.cust_no = data["cust_id"];
      console.log( data["cust_id"]);
      this.$emit("input", this.value);
    },
    bringBack1(formItem, returnData) {
      let data = returnData;
      this.formData.branch_id = data["branch_id"];
      this.$emit("input", this.value);
    },
    submitForm() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          let params = {};
          params.servicecode = "co4003";
          params.colt_no = this.formData.colt_no;
          params.branch_id = this.formData.branch_id;
          params.atta_url = this.formData.atta_url;
          params.trans_type = "ADD";
          params.is_start = "1";
          const userInfo = userUtil.get();
          params.cust_name=this.formData.custna;
          params.cust_no=userInfo.custid;
          params.eval_val = this.formData.eval_val;
          params.eval_cyy = this.formData.eval_cyy;
          params.inquiry_basic = this.formData.inquiry_basic;
          params.eval_time = this.formData.eval_time;
          params.eval_start_date = this.formData.eval_start_date;
          params.eval_end_date = this.formData.eval_end_date;

          let that = this;
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then((res) => {
              if (res && res.code === "200") {
                this.$message({
                  type: "success",
                  message: "操作成功",
                });
                this.$emit("update", {}),
                  (params.appl_id = res.data.appl_id),
                  (params.cust_name = res.data.cust_name),
                  (params.appl_state = res.data.appl_state),
                  (params.appl_date = res.data.appl_date),
                  (params.appId='coOnl'),
                  (params.wf_inst_id = res.data.wf_inst_id),
                  (params.task_inst_id = res.data.cur_task_id),
                  (params.proc_inst_id = res.data.cur_wfrl_id),
                  (params.frame_cd = res.data.task_url1),
                  // that.cParentScope.parentFormModel.custId = '';
                  this.$openNavTab(
                    "@CommWaitToDoDeal",
                    "待办事项办理",
                    params,
                    this
                  );

                // this.$publicFn.openNavTab(
                //   "@colWaitToDoDeal",
                //   "待办事项办理",
                //   params,
                //   this
                // );
              }
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          this.$message({
            type: "warning",
            message: this.$i18ns("校验不通过"),
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
.repay-upload {
  /deep/.el-form.custom-common--form {
    padding: 16px 0 16px 50px;
    .el-form-item__label {
      display: flex;
      justify-content: flex-start;
      width: 180px !important;
    }
    .el-form-item__content {
      margin-left: 180px !important;
      width: 200px;
    }
    .el-form-item {
      margin-bottom: 0px;
    }
  }
}
.model-down {
  margin-left: 100px;
  width: 300px;
  line-height: 66px;
  text-align: center;
  color: #6acc38;
  font-size: 13px;
  font-family: "Roboto", Helvetica Neue, Helvetica, Arial, sans-serif;
}
.export-button-style {
  padding-left: 30px;
  .el-button {
    background: #6ac044 !important;
    border-color: #6ac044 !important;
  }
}
.pagination {
  float: right;
  padding-top: 20px;
  padding-right: 20px;
}
.language-EN{
  .repay-upload {
  /deep/.el-form.custom-common--form {
    padding: 16px 0 16px 50px;
    .el-form-item__label {
      display: flex;
      justify-content: flex-start;
      width: 250px !important;
    }
    .el-form-item__content {
      margin-left: 180px !important;
      width: 200px;
    }
    .el-form-item {
      margin-bottom: 0px;
    }
  }
}
}
</style>
