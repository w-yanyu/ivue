<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 规则基本信息</span>
          <to-json :params="cParams" :toUrl="viewUrl" @jsonCallBack="jsonCallBack"></to-json>
        </el-tab-pane>
        <el-tab-pane label="规则配置">
          <biz-rule-all-any :disabled="false" :pipe="pipe"></biz-rule-all-any>
          <div style="height: 20px;"></div>
          <el-form-item label="规则描述">
            <el-input  type="textarea" :disabled="true" :value="crtZhRule"
                       spellcheck="false">
            </el-input>
          </el-form-item>
          <el-form-item label="规则表达式">
            <el-input  ref="input_expression" type="textarea" label="" :disabled="true"
                       :value="crtOriginBizRule"
                       spellcheck="false"></el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div style="position:absolute;right:5px;bottom:5px;">
      <el-button type="primary" @click="close()">取消</el-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BizRuleAdapter from '@/components/BizRule/BizRuleAdapter.js';
import Api from "../../utils/api";

export default {
  name: 'home',
  components: {
    BizRuleAllAny: () => import('@/components/BizRule/index.vue'),
  },
  props: {
    cMeta: Object, //本页面模板json数据Layout对象
    cParentMeta: Object, //父页面模板json数据Layout对象
    cParentParams: Object, //父页面自定义参数与内置参数
    cParentScope: Object   //父页面每块区域业务数据
  },
  data() {
    return {
      insertStatus: '',
      params: {},
      viewUrl: "/views/risk/risk_rule_new/risk_combine_rule_view.json",
      addUrl: "/views/risk/risk_rule_new/risk_combine_rule_add.json",
      cParams: this.cParentParams,
      cMeta: this.cMeta,
      dialogVisible: false,
      pipe: {
        type: 'all_any',
        condition: 'all',
        children: [],
        isRoot: true,
        leftList: ''
      },
    };
  },
  computed: {
    fetch() {
      console.log("sas")
    },
    ruleValue() {
      return JSON.stringify(BizRuleAdapter.cvtCustom2Origin(this.pipe));
    },
    crtOriginBizRule() {
      return BizRuleAdapter.cvtRule(this.pipe);
    },
    crtZhRule() {
      return JSON.stringify(BizRuleAdapter.cvtZhRule(this.pipe));
    }
  },
  methods: {
    showAddModal() {
      this.status = '0'
      this.dialogVisible = true
      if (this.$refs.formValidate) {
        this.$refs.formValidate.resetFields();
      }
      this.options = [{children: []}]
      this.editModel = true
    },
    saveConfirm(type) {
      if (type) {
        if (type == 'edit') {
          this.updateRule()
        } else if (type == 'add') {
          this.addRule()
        } else if (type == 'version') {
          this.newVersion()
        }
      }
    },
    updateRule() {

    },
    addRule() {
      var jsonFormData = this.$dataBus.getCurrentFormData(this)
      var params = {
        cruleId: jsonFormData.cruleId,
        cruleName: jsonFormData.cruleName,
        cruleCode: jsonFormData.cruleCode,
        cruleType: jsonFormData.cruleType,
        description: jsonFormData.description,
        createUser: "admin",
        natureExpression: this.ruleValue,
        executableExpression: this.crtOriginBizRule,
        cruleContentDesc: this.crtZhRule
      };
      this.$http.invokeAPI("/API" + `${Api.zhgz_add_new}`, "POST", params).then(obj => {
        this.$message({
          message: '新增成功',
          type: 'success'
        });
        this.dialogVisible = false
        this.fetch(true)
      }).catch(res => {
        this.$message.error("新增失败");
      })
    },
    jsonCallBack(data) {
      console.log(data + "json模板回调回来的数据")
    },
    //关闭对话框
    close() {
      this.$dialog.close();
    }
  },
  created() {
    var strings = Object.getOwnPropertyNames(this.cParams);
    this.insertStatus = strings.length > 2;
    if (this.insertStatus)
      this.pipe = BizRuleAdapter.cvtOrigin2Custom(JSON.parse(this.cParams.natureExpression))
  }
};
</script>
