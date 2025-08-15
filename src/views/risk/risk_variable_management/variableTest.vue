<!--
 * @Author: weisiyi weisiyi@sunline.cn
 * @Date: 2024-02-28 11:50:07
 * @LastEditors: weisiyi weisiyi@sunline.cn
 * @LastEditTime: 2024-03-12 16:36:19
 * @FilePath: /ivue/src/views/risk/risk_data_source/data_source_configuration/testListEdit.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <!-- <el-row>
        <el-col :span="24">
          <el-form-item label="请求参数" label-width="100px">
            <el-row v-for="(item, index) in cnArry" :key="index">
              <el-col :span="12">
                <el-form-item label="参数名称" prop="parm_name">
                  <el-input v-model="basicForm.parm_name[index]"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="item.parm_name" prop="parm_code">
                  <el-input v-model="basicForm.parm_code[index]"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row> -->

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
            <el-col :span="12">
              <el-form-item label="变量代码: " prop="variable_code">
                <el-input
                  v-model="basicForm.variable_code"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="变量名称: " prop="variable_name">
                <el-input
                  v-model="basicForm.variable_name"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="变量分类" prop="variable_class_code">
                <el-input
                  v-model="basicForm.variable_class_code"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="变量描述" prop="description">
                <el-input
                  v-model="basicForm.description"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="开发类型: " prop="develop_type">
                <el-select v-model="basicForm.develop_type" :disabled="true">
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
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <span><em></em>参数配置</span>
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
      <el-collapse-item name="3" v-if="tab3Show">
        <template slot="title">
          <span><em></em>返回结果</span>
        </template>
        <el-form
          v-if="parameterUrl"
          ref="resultForm"
          :model="resultForm"
          label-width="200px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="返回结果" prop="run_result">
                <el-input
                  type="textarea"
                  rows="15"
                  v-model="resultForm.run_result"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <span slot="footer" class="dialog-footer">
      <div class="tip-left">
        <el-button type="primary" @click="confirm">保存</el-button>
        <!-- <el-button type="info" @click="reset">重置</el-button> -->
      </div>
    </span>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "VariableTest",
  components: {},
  props: {
    cMeta: Object, //本页面模板json数据Layout对象
    cParentMeta: Object, //父页面模板json数据Layout对象
    cParentParams: Object, //父页面自定义参数与内置参数
    cParentScope: Object //父页面每块区域业务数据
  },
  data() {
    return {
      basicForm: {
        variable_code: "", // 变量代码
        variable_name: "", // 变量名称
        variable_class_code: "", // 变量分类代码
        description: "", // 描述
        develop_type: "", // 开发类型
        variable_script: "", // 变量脚本
        paramsList: []
      }, // 基本信息
      basicRules: [],
      cnArry: [],
      enArry: [],
      activeNames: ["1"],
      parameterForm: {}, // 入参配置信息
      parameterUrl:
        "/views/risk/risk_variable_management/variable_test_param.json",
      tab3Show: false,
      resultForm: {
        run_result: ""
      }
    };
  },
  created() {
    setTimeout(() => {
      this.getTableData();
    }, 300);
  },
  watch: {
    cParentParams: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        this.cParentParams = newVal;
        this.basicForm.variable_code = this.cParentParams.variable_code;
        this.basicForm.variable_name = this.cParentParams.variable_name;
        this.basicForm.variable_class_code = this.cParentParams.variable_class_code;
        this.basicForm.description = this.cParentParams.description;
        this.basicForm.develop_type = this.cParentParams.develop_type;
        this.basicForm.devevariable_scriptlop_type = this.cParentParams.variable_script;
      }
    }
  },
  methods: {
    tableChange(val) {
      console.log("val=======", val);
    },
    confirm() {
      let paramsList = this.$dataBus.getCurrentFormData(this).paramsList;
      let params = {
        servicecode: "deci050059",
        variable_code: this.cParentParams.variable_code,
        paramsList
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.$message({
              type: "success",
              message: "成功"
            });
            this.tab3Show = true;
            this.resultForm.run_result = res.data.run_result;
            // this.$dataBus.doCallBack(that, obj);
          }
        })
        .catch(err => {
          this.tab3Show = false;
          console.error(err);
        });
    },
    reset() {},
    getTableData() {
      let params = {
        servicecode: "deci050058",
        variable_code: this.cParentParams.variable_code
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.cnArry = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.dialog-footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  text-align: left;
}
</style>
