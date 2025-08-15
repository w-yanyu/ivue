<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <rule-select style="overflow:auto;min-width: 900px;" :componentName="componentName" :action="actions"
        :ruleData="ruleData" :setCrtOriginBizRule='setCrtOriginBizRule' :setCrtZhRule='setCrtZhRule'
        :setRuleValue='setRuleValue' :fun-detail-list='funDetailList' :disabled="true">
      </rule-select>
      <div style="height: 20px;"></div>
      <el-form-item label="规则描述" label-width="120px">
        <el-input type="textarea" :disabled="true" :value="crtZhRule" spellcheck="false">
        </el-input>
      </el-form-item>
      <el-form-item label="可执行表达式" label-width="120px">
        <el-input ref="input_expression" type="textarea" label="" :disabled="true" :value="crtOriginBizRule"
          spellcheck="false"></el-input>
      </el-form-item>

    </el-form>
    <div class="footDiv" v-if="false">
      <el-button type="primary" @click="close()">取消</el-button>

    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import Api from "../../utils/api";
  import ActionConfiguration from '@/components/ActionConfiguration.vue';
  import RuleSelect from "@/views/risk/risk_decision_rule/reform_test/generalCom/_components/rule-select";

  export default {
    name: 'home',
    components: {
      BizRuleAllAny: () => import('@/components/BizRule/index.vue'),
      ActionConfiguration,
      RuleSelect
    },
    props: {
      cMeta: Object, //本页面模板json数据Layout对象
      cParentMeta: Object, //父页面模板json数据Layout对象
      cParentParams: Object, //父页面自定义参数与内置参数
      cParentScope: Object //父页面每块区域业务数据
    },
    data() {
      return {
        dataList: '',
        form: {
          actionList: [{
            actionType: "",
            actionCode: "",
            actionString: "",
            actionName: "",
            actionValue: "",
            actionDataType: ""
          }]
        },
        actionType: [{
            value: 0,
            label: "不设置"
          }, {
            value: 1,
            label: "插入"
          },
          {
            value: 2,
            label: "更新"
          },
          {
            value: 3,
            label: "删除"
          },
          {
            value: 4,
            label: "接口调用"
          },
        ],
        actionInterface: [],
        insertStatus: '',
        params: {},
        viewUrl: "/views/risk/risk_decision_rule/risk_decision_rule_view.json",
        cParams: this.cParentParams,
        cMeta: this.cMeta,
        dialogVisible: false,
        ruleData: {
          rule_constraints: [],
          rule_logic: 'and',
          rule_isRoot: true, //是否是第一层的数据
          functionCodeAll: '', //所有函数体代码字符串
        },
        // pipe: {
        //   type: 'all_any',
        //   condition: 'all',
        //   children: [],
        //   isRoot: true,
        //   leftList: ''
        // },
      };
    },
    //监听计算生命周期函数
    computed: {},
    created() {
      console.log('decision_rule_review_rule_view-------cParams', this.cParams);
      let strings = Object.getOwnPropertyNames(this.cParams);
      this.insertStatus = strings.length > 2;
    },
    mounted() {
      this.getFactList();
      this.getActionList();
      this.getActionInterface();
      if (this.insertStatus) {
        let tempObj = JSON.stringify(this.cParams.natureExpression);
        let jsonParse = JSON.parse(tempObj);
        let jsonTwo = JSON.parse(jsonParse);
        this.ruleData = jsonTwo;
        console.log('created----this.ruleData', this.ruleData);
        console.log('obj.leftType===', this.cParams.natureExpression);
        // this.pipe = BizRuleAdapter.cvtOrigin2Custom(jsonTwo)
        // this. getActionList();
        this.crtZhRule = this.cParams.ruleContentDesc;
        this.crtOriginBizRule = this.cParams.displayExpression;
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
      addAction() {
        this.form.actionList.push({});
      },
      saveConfirm(type) {
        let that = this
        console.log('保存按钮的输入完成判断', that.$refs);
        let BizRuleAllAny = that.$refs.BizRuleAllAny
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
          ruleId: jsonFormData.ruleId,
          ruleName: jsonFormData.ruleName,
          ruleCode: jsonFormData.ruleCode,
          ruleType: jsonFormData.ruleType,
          description: jsonFormData.description,
          createUser: "admin",
          natureExpression: this.ruleValue,
          executableExpression: this.crtOriginBizRule,
          ruleContentDesc: this.crtZhRule,
          riskDecisionActionList: this.form.actionList
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
      delAction(index) {
        this.form.actionList.splice(index, 1);
      },
      addRule() {
        var jsonFormData = this.$dataBus.getCurrentFormData(this)
        let userInfo = JSON.parse(localStorage.getItem('user_info'));
        var params = {
          ruleId: jsonFormData.ruleId,
          ruleName: jsonFormData.ruleName,
          ruleCode: jsonFormData.ruleCode,
          ruleType: jsonFormData.ruleType,
          description: jsonFormData.description,
          createUser: userInfo.userCode,
          updateUser: userInfo.userCode,
          natureExpression: this.ruleValue,
          executableExpression: this.crtOriginBizRule,
          ruleContentDesc: this.crtZhRule,
          riskDecisionActionList: this.form.actionList
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
      jsonCallBack(data) {
        console.log(data + "json模板回调回来的数据")
      },
      getFactList() {
        console.log("事实")
        this.dataLeft = []
        this.dataRight = []
        this.rightDataLeft = []
        // 集合
        let params = {}
        //请求评分属性选择项目
        this.$http.invokeAPI("/API" + Api.zhgz_selectFact, "POST", params).then(obj => {
          console.log('请求评分属性选择项目回调', obj);
          this.dataList = obj.data
          this.dataLeft = obj.data
        }).catch(reg => {

        })
      },
      //动作列表
      changeActionList(val, index) {
        console.log('changeActionList(val)', val, index);
        var selctList = val.actionString;
        this.form.actionList[index].actionDataType = this.getFormAmoutValidateInfo(selctList) && this
          .getFormAmoutValidateInfo(selctList).dataType ? this.getFormAmoutValidateInfo(selctList).dataType : ''
        this.form.actionList[index].actionString = this.getFormAmoutValidateInfo(selctList) && this
          .getFormAmoutValidateInfo(
            selctList).value ? this.getFormAmoutValidateInfo(selctList).value : ''
        this.form.actionList[index].actionName = this.getFormAmoutValidateInfo(selctList) && this
          .getFormAmoutValidateInfo(selctList).label ? this.getFormAmoutValidateInfo(selctList).label : ''
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
      getActionInterface() {
        this.$http.invokeAPI("/API" + Api.decision_interface_select, "GET").then(obj => {
          this.actionInterface = obj.data
        }).catch(reg => {

        })
      },
      getActionList() {
        console.log('getActionList', this.cParams);
        var jsonFormData = this.cParams
        let params = {
          ruleId: jsonFormData.ruleId
        }
        if (jsonFormData.ruleId) {
          this.$http.invokeAPI("/API" + Api.dra_select_rule_id, "POST", params).then(obj => {
            this.form.actionList = obj.data
          }).catch(reg => {

          })
        }
      },

      //关闭对话框
      close() {
        this.$dialog.close();
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
