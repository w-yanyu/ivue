<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 规则基本信息</span>
          <to-json :params="cParams" :toUrl="insertStatus ? editUrl : addUrl" @jsonCallBack="jsonCallBack"></to-json>
        </el-tab-pane>
        <el-tab-pane label="规则配置">
          <biz-rule-all-any :disabled="true" :pipe="pipe" ref="BizRuleAllAny"></biz-rule-all-any>
          <div style="height: 20px;"></div>
          <el-form-item label="规则描述">
            <el-input type="textarea" :disabled="false" :value="crtZhRule" spellcheck="false">
            </el-input>
          </el-form-item>
          <el-form-item label="规则表达式">
            <el-input ref="input_expression" type="textarea" label="" :disabled="false" :value="crtOriginBizRule"
              spellcheck="false"></el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div class="footDiv">
      <el-button type="primary" @click="close()">取消</el-button>
      <el-button type="primary" v-if="insertStatus" @click="saveConfirm('update')">保存</el-button>
      <el-button type="primary" v-if="!insertStatus" @click="saveConfirm('add')">保存</el-button>
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
      cParentScope: Object //父页面每块区域业务数据
    },
    data() {
      return {
        insertStatus: '',
        params: {},
        editUrl: "/views/risk/risk_rule_new/risk_combine_rule_edit.json",
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
      // fetch() {
      //   location.reload();
      // },
      //提交json格式化
      ruleValue() {
        console.log('提交前json格式化---------------', this.pipe);
        return JSON.stringify(BizRuleAdapter.cvtCustom2Origin(this.pipe));
      },
      // 规则描述
      crtZhRule() {
        console.log('规则描述---------------', this.pipe);
        return JSON.stringify(BizRuleAdapter.cvtZhRule(this.pipe));
      },
      //规则表达式
      crtOriginBizRule() {
        console.log('规则表达式---------------', this.pipe);
        return BizRuleAdapter.cvtRule(this.pipe);
      },
    },
    methods: {
      showAddModal() {
        this.status = '0'
        this.dialogVisible = true
        if (this.$refs.formValidate) {
          this.$refs.formValidate.resetFields();
        }
        this.options = [{
          children: []
        }]
        this.editModel = true
      },
      saveConfirm(type) {
        let that = this
        console.log('保存按钮的输入完成判断', that.$refs);
        let BizRuleAllAny = that.$refs.BizRuleAllAny
        if (BizRuleAllAny.isRuleEmpty()) {
          return
        }
        if (!BizRuleAllAny.isCompleted()) {
          return
        }

        if (type) {
          if (type === 'update') {
            this.updateRule()
          } else if (type === 'add') {
            this.addRule()
          } else if (type === 'version') {
            this.newVersion()
          }
        }
      },
      updateRule() {
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
        this.$http.invokeAPI("/API" + `${Api.zhgz_update_new}`, "POST", params).then(obj => {
          console.log('zhgz_update_new', params);
          this.$message({
            message: '更新成功',
            type: 'success'
          });
          // this.$dialog.close();
          // this.fetch(true)
          this.$dataBus.doCallBack(this, params);
        }).catch(res => {

        })
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
          // this.$dialog.close();
          // this.fetch(true)
          this.$dataBus.doCallBack(this, params);
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
      console.log('cParams', this.cParams);
      let strings = Object.getOwnPropertyNames(this.cParams);
      this.insertStatus = strings.length > 2;
    },
    mounted() {
      if (this.insertStatus) {
        let tempObj = JSON.stringify(this.cParams.natureExpression);
        let jsonParse = JSON.parse(tempObj);
        let jsonTwo = JSON.parse(jsonParse);
        console.log('created', jsonTwo);
        console.log('obj.leftType===', this.cParams.natureExpression);
        this.pipe = BizRuleAdapter.cvtOrigin2Custom(jsonTwo)
      }
    },
  };
</script>
<style lang="css" scoped>
  .footDiv {
    position: absolute;
    right: 30px;
    bottom: 14px;
  }
</style>
