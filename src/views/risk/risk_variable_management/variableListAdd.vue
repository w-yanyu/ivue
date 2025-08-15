<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <span><em></em>基本信息</span>
        </template>
        <el-form
          ref="basicForm"
          :rules="basicRules"
          :model="basicForm"
          label-width="200px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="变量代码: " prop="variable_code">
                <el-input
                  v-model="basicForm.variable_code"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="变量名称: " prop="variable_name">
                <el-input
                  v-model="basicForm.variable_name"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="变量分类" prop="variable_class_code">
                <el-input
                  v-model="basicForm.variable_class_code"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="变量描述" prop="description">
                <el-input
                  v-model="basicForm.description"
                  :disabled="isEdit"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开发类型: " prop="develop_type">
                <el-select v-model="basicForm.develop_type" :disabled="isEdit">
                  <el-option
                    v-for="item in developTypeList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="变量脚本" prop="variable_script">
                <el-input
                  type="textarea"
                  rows="15"
                  v-model="basicForm.variable_script"
                  :disabled="isEdit"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <span><em></em>入参配置</span>
        </template>
        <el-form
          v-if="parameterUrl"
          ref="parameterForm"
          :model="parameterForm"
          label-width="200px"
          class="custom-common--form"
        >
          <to-json
            :toUrl="parameterUrl"
            :params="cParentParams"
            @jsonCallBack="parameterCallback"
          ></to-json>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="3" v-if="cParentParams.pageType !== 'add'">
        <template slot="title">
          <span><em></em>血缘关系配置</span>
        </template>
        <el-form
          ref="bloodRelationForm"
          :rules="bloodRelationRules"
          :model="bloodRelationForm"
          label-width="200px"
          class="custom-common--form"
        >
          <to-json
            :toUrl="bloodRelationUrl"
            :params="cParentParams"
            @jsonCallBack="bloodRelationCallback"
          ></to-json>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <div class="footer" v-if="pageType !== 'look'">
      <el-row>
        <el-col :span="6" :offset="18">
          <el-button type="primary" @click="saveConfig" v-loading="loading">保存</el-button>
          <el-button @click="configDialog = false">重置</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "variableListAdd",
  components: {},
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对
  },
  data() {
    return {
      variable_class_code: "",
      activeNames: ["1"],
      basicForm: {
        variable_code: "", // 变量代码
        variable_name: "", // 变量名称
        variable_class_code: this.variable_class_code, // 变量分类代码
        description: "", // 描述
        develop_type: "", // 开发类型
        variable_script: "", // 变量脚本
        paramsList: []
      }, // 基本信息
      basicRules: [],
      parameterForm: {}, // 入参配置信息
      parameterUrl: "",
      bloodRelationForm: {}, // 防并发访问配置信息
      bloodRelationRules: [],
      isEdit: false,
      lockTypeList: [],
      bloodRelationUrl:
        "/views/risk/risk_variable_management/variable_list_add_blood.json",
      configDialog: false, // 弹框
      pageType: "",
      loading: false,
      developTypeList: [],
      callObjectCodeList: [],
      callObjectNameList: [],
    };
  },
  created() {
    this.getDictList("DECI_E_DEVELOP_TYPE", "developTypeList")
    this.getCallObjectList();
    this.variable_class_code = this.cParentParams.variable_class_code;
    this.basicForm.variable_class_code = this.cParentParams.variable_class_code;
  },
  mounted() {
    this.pageType = this.cParentParams.pageType;
    if (this.pageType === "look") {
      this.isEdit = true;
    }
  },
  watch: {
    cParentParams: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal) {
          this.cParentParams = newVal;
          if(newVal.pageType === "add") {
            this.parameterUrl = "/views/risk/risk_variable_management/variable_list_add_paramter.json";
          }else {
            this.basicForm.variable_code = this.cParentParams.variable_code;
            this.basicForm.variable_name = this.cParentParams.variable_name;
            this.basicForm.variable_class_code = this.cParentParams.variable_class_code;
            this.basicForm.description = this.cParentParams.description;
            this.basicForm.develop_type = this.cParentParams.develop_type;
            this.basicForm.devevariable_scriptlop_type = this.cParentParams.variable_script;
            this.parameterUrl = "/views/risk/risk_variable_management/variable_list_add_paramteredit.json";
          }
        }
      }
    }
  },
  methods: {
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictType
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
    getCallObjectList(dictType, listKey) {
      let params = {
        data_source_code: "",
        data_source_name: "",
        data_source_status: "",
        data_source_type: "",
        length: 10,
        regist_status: "",
        servicecode: "deci050013",
        start: 1,
        start_status: "",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.callObjectCodeList = [];
            this.callObjectNameList = [];

            let arr = res.data;

            arr.forEach(item => {
              this.callObjectCodeList.push({
                label: item.data_source_code,
                value: item.data_source_code,
              })
              this.callObjectNameList.push({
                label: item.data_source_name,
                value: item.data_source_name,
              })
            })
            this.cParentParams.callObjectCodeList = this.callObjectCodeList;
            this.cParentParams.callObjectNameList = this.callObjectNameList;
            console.log("this.cParentParams.callObjectCodeList=======", this.cParentParams);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 入参配置回调
     */
    parameterCallback(data) {
      console.log("入参配置回调数据", data);
      this.lockTypeList = data;
    },
    /**
     * 血缘关系置回调
     */
    bloodRelationCallback(data) {
      console.log("入参配置回调数据", data);
    },
    /**
     * 保存
     */
    saveConfig() {
      this.$refs.basicForm.validate(valid => {
        if (valid) {
          this.sendData();
        }
      });
    },
    sendData() {
      this.loading = true;
      let that = this;
      let userInfo = JSON.parse(localStorage.getItem("user_info"));
      let paramsList = this.$dataBus.getCurrentFormData(this).paramsList;
      let kinshipList = this.$dataBus.getCurrentFormData(this).kinshipList;

      let param = {
        variable_code: that.basicForm.variable_code, //变量代码
        variable_name: that.basicForm.variable_name, //变量名称
        description: that.basicForm.description, //变量描述
        develop_type: that.basicForm.develop_type, //开发类型
        variable_script: that.basicForm.variable_script, //变量脚本
        variable_class_code: this.variable_class_code, //变量分类代码
        paramsList
      };

      if(this.cParentParams.pageType === "edit") {
        // 维护
        param.kinshipList = kinshipList;
        param.servicecode = "deci050055";
      }else {
        // 新增
        param.servicecode = "deci050054";
      }
      
      console.log("提交的参数", param);
      that.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", param)
        .then(obj => {
          this.loading = false;
          that.$message({
            type: "success",
            message: "成功"
          });
          that.$dataBus.doCallBack(that, obj);
        })
        .catch(reg => {
          console.log("reg", reg);
        });
    }
  }
};
</script>

<style lang="less" scoped></style>
