<!--
 * @Author: weisiyi weisiyi@sunline.cn
 * @Date: 2024-02-28 11:50:07
 * @LastEditors: weisiyi weisiyi@sunline.cn
 * @LastEditTime: 2024-03-05 14:14:08
 * @FilePath: /ivue/src/views/risk/risk_data_source/data_source_configuration/testListEdit.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-form
      ref="basicForm"
      :rules="basicRules"
      :model="basicForm"
      label-width="100px"
      class="custom-common--form"
    >
      <el-row>
        <el-col :span="8">
          <el-form-item label="用例名称: " prop="case_name">
            <el-input
              v-model="basicForm.case_name"
              :disabled="cParentParams.pageType"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row>
        <el-col :span="24">
          <el-form-item label="公共参数" prop="contactList" label-width="100px">
            <to-json
              :params="cParentParams"
              :toUrl="commonUrl"
              @jsonCallBack="jsonCallBack"
            ></to-json>
          </el-form-item>
        </el-col>
      </el-row> -->
      <!-- <el-row>
        <el-col :span="24">
          <el-form-item label="请求参数" prop="contactList" label-width="100px">
            <to-json
              :params="cParentParams"
              :toUrl="requestUrl"
              @jsonCallBack="jsonCallBack"
            ></to-json>
          </el-form-item>
        </el-col>
      </el-row> -->

      <el-row v-if="cnArry.length > 0">
        <el-col :span="24">
          <el-form-item label="请求参数" label-width="100px">
            <el-row v-for="(item, index) in cnArry" :key="index">
              <el-col :span="8">
                <el-form-item :label="item.parm_name" prop="parm_code">
                  <el-input v-model="basicForm.parm_code[index]"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer" v-if="cParentParams.pageType">
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
  name: "testListEdit",
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
        case_name: "",
        parm_name: [],
        parm_code: []
      },
      basicRules: [],
      commonUrl:
        "/views/risk/risk_data_source/data_source_configuration/test_list_add_common.json",
      requestUrl:
        "/views/risk/risk_data_source/data_source_configuration/test_list_add_request.json",
      cnArry: [],
      enArry: []
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
        this.basicForm.case_name = this.cParentParams.case_name;
      }
    }
  },
  methods: {
    tableChange(val) {
      console.log("val=======", val);
    },
    confirm() {
      let params = {};
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.columns = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    reset() {},
    getTableData() {
      let params = {
        servicecode: "deci050042",
        data_source_code: this.cParentParams.data_source_code,
        param_value_no:"0000000000023456"
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
