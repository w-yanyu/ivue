<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 规则基本信息</span>
          <to-json :params="cParams" :toUrl="insertStatus ? editUrl : addUrl" @jsonCallBack="jsonCallBack"></to-json>
        </el-tab-pane>
        <el-tab-pane label="规则配置">
          <biz-rule-all-any :normal="true" :disabled="true" :pipe="pipe" ref="BizRuleAllAny"></biz-rule-all-any>
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
        <el-tab-pane>
          <span slot="label">动作配置</span>
          <el-form-item prop="actionList">
            <el-button icon="el-icon-document-add" @click="addAction()">添加动作</el-button>
            <el-row v-for="(item, index) in form.actionList" :key="index">
              <el-col :span="20">
                <el-select v-model="form.actionList[index].actionType" style="width: 100px;" filterable
                           placeholder="请选择动作类型">
                  <el-option v-for="item in actionType" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <el-cascader v-if="form.actionList[index].actionType!==4" class="input_el" v-model="form.actionList[index].actionString"
                             :options="dataList"
                             :props="{ expandTrigger: 'hover'  }" @change="changeActionList(item,index)"></el-cascader>
                <el-input v-if="form.actionList[index].actionType!==4" v-model="form.actionList[index].actionValue" placeholder="请输入"
                          style="width: 120px; margin-right: 0px;"
                ></el-input>
                <el-select  v-if="form.actionList[index].actionType===4" v-model="form.actionList[index].actionValue" style="width: 200px;" filterable
                           placeholder="请选择接口">
                  <el-option v-for="item in actionInterface" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
                <el-button v-if="index!=0" style="margin-left: 5px" icon="el-icon-delete"
                           @click="delAction(index)"></el-button>
              </el-col>
            </el-row>
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
      actionInterface: [],
      actionType: [{
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
      this.form.actionList[index].actionString = this.getFormAmoutValidateInfo(selctList) && this.getFormAmoutValidateInfo(
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
    getActionInterface(){
      this.$http.invokeAPI("/API" +  Api.decision_interface_select, "GET").then(obj => {
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
  created() {
    console.log('cParams', this.cParams);
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
