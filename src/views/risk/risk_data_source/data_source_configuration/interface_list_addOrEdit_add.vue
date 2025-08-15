<template>
  <div class="menu-form">
    <div class="menu-form--container">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="140px"
        class="custom-common--form"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="结果清单代码"
              prop="results_list_code"
            >
              <el-input
                class="input_el"
                v-model="ruleForm.results_list_code"
                type="text"
                :disabled="isEdit"
                style="width: 350px; margin-right: 0px;"
              ></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="结果清单代码名称"
              prop="results_list_name"
            >
              <el-input
                class="input_el"
                v-model="ruleForm.results_list_name"
                :disabled="isEdit"
                type="text"
                style="width: 350px; margin-right: 0px;"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="描述" prop="description">
              <el-input
                class="input_el"
                type="textarea"
                :rows="4"
                show-word-limit
                maxlength="200"
                :disabled="isEdit"
                v-model="ruleForm.description"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item
              label="结果清单"
              prop="resultList"
            >
              <to-json
                :params="ruleForm"
                :toUrl="resultListUrl"
                @jsonCallBack="jsonCallBack"
              ></to-json>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer" v-if="cParentParams.pageType !== 'look'">
      <div class="tip-left">
        <el-button type="primary" @click="confirm">确定</el-button>
        <el-button type="info" @click="reset">重置</el-button>
      </div>
    </span>
  </div>
</template>
<script>
import { validateEmail, validateTelephone } from "@/util/validate";
import MyAxios from "pte-ui/utils/MyAxios";
import Api from "@/views/risk/utils/api"; //网络请求框架
import { Loading } from "element-ui";

export default {
  name: "interfaceListAddOrEdit",
  props: {
    cMeta: Object, //本页面模板json数据Layout对象
    cParentMeta: Object, //父页面模板json数据Layout对象
    cParentParams: Object, //父页面自定义参数与内置参数
    cParentScope: Object //父页面每块区域业务数据
  },
  data() {
    return {
      ruleForm: {
        results_list_code: "", //结果清单代码
        results_list_name: "", //结果清单名称
        service_type: "", //服务类型
        description: "", //描述
        resultList: [], //提供方联系人列表
        pageType: this.cParentParams.pageType,
      },
      rules: {
        results_list_code: [
          {
            required: true,
            message: "该控件必填",
            trigger: "blur"
          }
        ],
        results_list_name: [
          {
            required: true,
            pattern: "^[a-z0-9A-Z\u4e00-\u9fa5]+$",
            message: "仅可为字母、数字、文字及相关组合",
            trigger: "blur"
          }
        ],
        service_type: [
          {
            required: true,
            message: "该控件必填",
            trigger: "blur"
          }
        ]
      },
      data_source_code: this.cParentParams.data_source_code,
      defineRules: {},
      serviceTypeOptions: [],
      resultListUrl:
        "/views/risk/risk_data_source/data_source_configuration/interface_list_addOrEdit_add_list.json",
      isEdit: false, //是否可编辑状态
    };
  },
  mounted() {
    //初始化数据字典
    this.getDictList("DECI_E_SERVICE_TYPE", "serviceTypeOptions"); //获取数据字典MS_E_YESORNO
    if (this.cParentParams.pageType === "edit" || this.cParentParams.pageType === "look") {
      this.isEdit = this.cParentParams.pageType
      this.queryEditData();
    }
  },
  methods: {
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    //数据类型选择
    dataTypeChange(event) {
      console.log("dataTypeChange", event);
    },
    confirm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.sendData();
        }
      });
    },
    sendData() {
      let that = this;
      let jsonFormData = this.$dataBus.getCurrentFormData(this);
      if (jsonFormData.resultList.length === 0) {
        return this.$message.error("数据未填写，请检查");
      }
      if (!this.checkConstInfo(jsonFormData.resultList)) {
        return;
      }
      console.log("that===",that);
      let param = {
        results_list_code: that.ruleForm.results_list_code, //
        results_list_name: that.ruleForm.results_list_name, //
        data_source_code: that.data_source_code, //
        data_source_name: 11111, //
        description: that.ruleForm.description, //描述
        resultSub: jsonFormData.resultList ? jsonFormData.resultList : [] //
      };
      let loading = Loading.service();
      if (that.cParentParams.isEdit) {
        param.servicecode = "deci050016";
      } else {
        param.servicecode = "deci050016";
      }
      that.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", param)
        .then(obj => {
          that.$message({
            type: "success",
            message: "成功"
          });
          that.$dataBus.doCallBack(that, obj);
        })
        .catch(reg => {
          console.log("reg", reg);
        });
      loading.close();
    },
    //校验添加联系人的时候，输入是否正确
    checkConstInfo(resultList) {
      let that = this;
      let regInt = /^\+?[1-9][0-9]*$/; //非负整数（正整数 + 0）
      let regDecimal = /^(0\.(?!0+$)\d{1,4}|^[1-9][0-9]{0,20}(\.\d{0,2})?)$/;
      let regBoolean = /^(true)$|^(false)$/;
      let regWechat = /^[A-Za-z0-9]+$/;

      for (const i in resultList) {
        if (resultList[i].contact_person_name === "") {
          that.$message.error(`联系人列表 第${parseInt(i) + 1}行 姓名不能为空`);
          return false;
        }
        if (
          resultList[i].contact_info === "" &&
          !validateTelephone(resultList[i].contact_info)
        ) {
          that.$message.error(
            `联系人列表 第${parseInt(i) + 1}行 联系方式不符合要求，请检查`
          );
          return false;
        }
        if (resultList[i].email && !validateEmail(resultList[i].email)) {
          that.$message.error(
            `联系人列表 第${parseInt(i) + 1}行 邮箱不符合要求，请检查`
          );
          return false;
        }
        if (
          resultList[i].wechat_id &&
          !regWechat.test(resultList[i].wechat_id)
        ) {
          that.$message.error(
            `联系人列表 第${parseInt(i) + 1}行 微信不符合要求，请检查`
          );
          return false;
        }
      }
      return true;
    },
    reset() {
      let that = this;
      that.ruleForm.provider_code = ""; //提供方代码
      that.ruleForm.provider_name = ""; //提供方名称
      that.ruleForm.service_type = ""; //服务类型
      that.ruleForm.description = ""; //描述
      that.ruleForm.resultList = []; //提供方联系人列表
    },
    jsonCallBack(data) {
      console.log("json模板回调回来的数据", data);
    },
    queryEditData() {
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
          data_source_code: this.cParentParams.data_source_code,
          results_list_code: this.cParentParams.results_list_code,
          servicecode: "deci050022"
        })
        .then(obj => {
          this.ruleForm.resultList = this.cParentParams.resultList;

          this.ruleForm.results_list_code = this.cParentParams.results_list_code;
          this.ruleForm.results_list_name = this.cParentParams.results_list_name;
          this.ruleForm.service_type = this.cParentParams.service_type;
          this.ruleForm.description = this.cParentParams.description;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="css" scoped>
#page_content {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
}
.dialog-footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  text-align: left;
}
.input-row {
  min-height: 100px;
}
</style>
