<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 规则基本信息</span>
          <riskDecisionRuleAdd v-if="!insertStatus" :cParentParams='cParentParams' ref="riskDecisionRuleAdd"
            @openDialog='openDialog'></riskDecisionRuleAdd>
          <to-json :params="cParams" v-else :toUrl="editUrl " @jsonCallBack="jsonCallBack"></to-json>
        </el-tab-pane>

        <el-tab-pane label="规则配置">
          <biz-rule-all-any :normal="true" :disabled="true" :pipe="pipe" ref="BizRuleAllAny"></biz-rule-all-any>
          <div style="height: 20px;"></div>
          <el-form-item label="规则描述">
            <el-input type="textarea" :disabled="false" :value="crtZhRule" spellcheck="false"></el-input>
          </el-form-item>
          <el-form-item label="规则表达式">
            <el-input ref="input_expression" type="textarea" label="" :disabled="false" :value="crtOriginBizRule"
              spellcheck="false"></el-input>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane>
          <span slot="label">动作配置</span>
          <ActionConfiguration ref="ActionConfiguration" :cParentParams='cParentParams'></ActionConfiguration>
        </el-tab-pane>
      </el-tabs>
    </el-form>

    <div class="footDiv">
      <el-button type="primary" v-if="insertStatus" @click="saveConfirm('update')">保存</el-button>
      <el-button type="primary" v-if="!insertStatus" @click="saveConfirm('add')">保存</el-button>
      <!--  <el-button @click="close()">取消</el-button> -->
      <el-button @click="reset()">重置</el-button>
    </div>

  </div>
</template>

<script>
  import BizRuleAdapter from '@/components/BizRule/BizRuleAdapter.js';
  import ActionConfiguration from '@/components/ActionConfiguration.vue';
  import Api from "../../utils/api";
  import riskDecisionRuleAdd from '../risk_decision_rule_add.vue';

  export default {
    name: 'home',
    components: {
      BizRuleAllAny: () => import('@/components/BizRule/index.vue'),
      ActionConfiguration,
      riskDecisionRuleAdd,
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
        editUrl: "/views/risk/risk_decision_rule/risk_decision_rule_edit.json",
        addUrl: "/views/risk/risk_decision_rule/risk_decision_rule_add.json",
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
      //提交json格式化
      ruleValue() {
        console.log('提交前json格式化---------------', this.pipe);
        return JSON.stringify(BizRuleAdapter.cvtCustom2Origin(this.pipe));
      },
      // 规则描述
      crtZhRule() {
        console.log('规则描述---------------', this.pipe);
        // return JSON.stringify(BizRuleAdapter.cvtZhRule(this.pipe));
        return BizRuleAdapter.cvtZhRule(this.pipe);
      },
      //规则表达式
      crtOriginBizRule() {
        console.log('规则表达式---------------', this.pipe);
        return BizRuleAdapter.cvtRule(this.pipe);
      },
    },
    created() {
      console.log('cParams', this.cParams);
      let strings = Object.getOwnPropertyNames(this.cParams);
      this.insertStatus = strings.length > 2;
    },
    mounted() {
      console.log("父类带过来的数据", this.cParams);
      // this.getFactList();
      if (this.insertStatus) {
        let tempObj = JSON.stringify(this.cParams.natureExpression);
        let jsonParse = JSON.parse(tempObj);
        let jsonTwo = JSON.parse(jsonParse);
        console.log('created', jsonTwo);
        console.log('obj.leftType===', this.cParams.natureExpression);
        this.pipe = BizRuleAdapter.cvtOrigin2Custom(jsonTwo)
        // this. getActionList();
      }
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
        // let userInfo = JSON.stringify();
        console.log('保存按钮的输入完成判断', that.$refs);
        let BizRuleAllAny = that.$refs.BizRuleAllAny;
        let ActionConfiguration = that.$refs.ActionConfiguration;
        let riskDecisionRuleAdd = that.$refs.riskDecisionRuleAdd;
        if (!that.insertStatus) {
          if (!riskDecisionRuleAdd.isCompleted()) {
            return;
          }
        }

        if (!BizRuleAllAny.isCompleted()) {
          return;
        }
        if (!ActionConfiguration.isCompleted()) {
          return;
        }
        if (BizRuleAllAny.isRuleEmpty(that.pipe)) {
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
        let actionList = this.$refs.ActionConfiguration.submitActionList();
        let userInfo = JSON.parse(localStorage.getItem('user_info'));
        if (actionList) {
          for (const child of actionList) {
            child['createUser'] = userInfo.userCode;
            child['updateUser'] = userInfo.userCode;
          }
        }
        console.log("updateRule userCode", userInfo);
        console.log('要提交的actionList===', actionList);
        console.log('要提交的jsonFormData===', jsonFormData);
        var params = {
          ruleId: jsonFormData.ruleId,
          ruleName: jsonFormData.ruleName,
          ruleCode: jsonFormData.ruleCode,
          ruleType: jsonFormData.ruleType,
          ruleVersion: jsonFormData.ruleVersion,
          description: jsonFormData.description,
          groupIds: jsonFormData.groupIds,
          ruleGrade: jsonFormData.ruleGrade,
          createUser: userInfo.userCode,
          updateUser: userInfo.userCode,
          natureExpression: this.ruleValue,
          executableExpression: this.crtOriginBizRule,
          ruleContentDesc: this.crtZhRule,
          riskDecisionActionList: actionList
        };
        //决策规则更新
        this.$http.invokeAPI("/API" + `${Api.dgz_update_new}`, "POST", params).then(obj => {
          console.log('dgz_add_new', params);
          this.$message({
            message: '更新成功',
            type: 'success'
          });
          this.$dataBus.doCallBack(this, params);
        }).catch(res => {

        })
      },

      addRule() {
        // var jsonFormData = this.$dataBus.getCurrentFormData(this)
        let actionList = this.$refs.ActionConfiguration.submitActionList();
        let jsonFormData = this.$refs.riskDecisionRuleAdd.submitriskDecisionRuleAdd();
        let userInfo = JSON.parse(localStorage.getItem('user_info'));
        if (actionList) {
          for (const child of actionList) {
            child['createUser'] = userInfo.userCode;
            child['updateUser'] = userInfo.userCode;
          }
        }
        console.log("addRule userCode", userInfo);
        console.log('要提交的actionList===', actionList);
        console.log('要提交的jsonFormData===', jsonFormData);
        let params = {
          ruleId: jsonFormData.ruleId,
          ruleName: jsonFormData.ruleName,
          ruleCode: jsonFormData.ruleCode,
          ruleType: jsonFormData.ruleType,
          ruleGrade: jsonFormData.ruleGrade,
          description: jsonFormData.description,
          createUser: userInfo.userCode,
          updateUser: userInfo.userCode,
          groupIds: jsonFormData.groupIds,
          natureExpression: this.ruleValue,
          executableExpression: this.crtOriginBizRule,
          ruleContentDesc: this.crtZhRule,
          riskDecisionActionList: actionList
        };
        this.$http.invokeAPI("/API" + `${Api.dgz_add_new}`, "POST", params).then(obj => {
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
      // jsonCallBack(data) {
      //   let that = this;
      //   console.log("json模板回调回来的数据", data);
      //   let riskDecisionRuleAdd = that.$refs.riskDecisionRuleAdd;
      //   riskDecisionRuleAdd.setRuleGroupSelect(data);
      // },
      // openDialog() {
      //   let that = this;
      //   that.dialogVisible = true;
      // },
      //关闭对话框
      close() {
        console.log('调用关闭对话框');
        this.$dialog.close();
      },
      //重置输入
      reset() {
        let that = this;
        //规则基本信息
        that.$refs.riskDecisionRuleAdd.resetInput();
        that.$refs.ActionConfiguration.resetInput();
        that.pipe = {
          type: 'all_any',
          condition: 'all',
          children: [],
        }
      },
      closeDialog(item) {
        let that = this;
        that.dialogVisible = false;
        console.log('closeDialogitem', item);
      },


      changeLeft(val) {
        console.log('changeLeft(val)', val);
        this.form.ruleLeftDataType = this.getFormAmoutValidateInfo(val) && this
          .getFormAmoutValidateInfo(val).dataType ? this.getFormAmoutValidateInfo(val).dataType : ''
        this.form.ruleLeft = this.getFormAmoutValidateInfo(val) && this.getFormAmoutValidateInfo(
          val).value ? this.getFormAmoutValidateInfo(val).value : ''
        this.form.ruleLeftName = this.getFormAmoutValidateInfo(val) && this
          .getFormAmoutValidateInfo(val).label ? this.getFormAmoutValidateInfo(val).label : ''
      },
      getFormAmoutValidateInfo(val) {
        for (let i in this.dataLeft) {
          let item = this.dataLeft[i].children
          for (let z in item) {
            if (item[z].children) {
              for (let x in item[z].children) {
                if (item[z].children[x].value === val[val.length - 1]) {
                  return {
                    value: item[z].children[x].value,
                    label: item[z].label + '.' + item[z].children[x].label,
                    dataType: item[z].children[x].dataType,
                    reference: item[z].children[x].reference
                  }
                }
              }
            } else {
              if (val === undefined) {
                return {
                  value: item[z].value,
                  label: item[z].label,
                  dataType: item[z].dataType,
                  reference: item[z].reference
                }
              }
              if (item[z].value === val[val.length - 1]) {
                return {
                  value: item[z].value,
                  label: item[z].label,
                  dataType: item[z].dataType,
                  reference: item[z].reference
                }
              }
            }
          }
        }
      },
      getActionList() {
        let that = this;
        console.log('getActionList', this.cParentParams);
        var jsonFormData = this.cParentParams
        let params = {
          ruleId: jsonFormData.ruleId
        }
        if (jsonFormData.ruleId) {
          that.$http.invokeAPI("/API" + Api.dra_select_rule_id, "POST", params).then(obj => {
            that.$refs.actionConfiguration.setActionList(obj.data);
            console.log('回调拿到 getActionList', obj.data);
          }).catch(reg => {

          })
        }
      },

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
