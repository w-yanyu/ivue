<template>
  <div class="rule-item">
    <!-- 删除节点按钮 -->
    <rule-remove @click.native="removeItem" v-if="!disabled"></rule-remove>

    <!-- 较值条件 -->
    <!--  <rule-compare v-if="isCompare" :rule-data.sync="ruleData" :fact-list="factList" :constant-list='constantList' :fun-detail-list='funDetailList'></rule-compare> -->

    <!-- 添加条件 -->
    <el-dropdown trigger="click" @command="handleFetchFact">
      <el-button type="primary" size="mini" :disabled="disabled">
        {{switchLogicName('rule-set')}}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <div style="max-height:200px; overflow:auto;white-space:nowrap;">
          <el-dropdown-item v-for="(item, i) in fetchFact.list" :key="i" :command="item">{{item.factName}}
          </el-dropdown-item>
        </div>
      </el-dropdown-menu>
    </el-dropdown>

    <div class="" v-if="ruleData.rule_logic==='rule-set'">
      <el-input style="width:400px; margin-left: 10px;margin-right: 10px;" placeholder="规则表达式" disabled
        v-model="policy_id"></el-input>
      <el-button type="primary" size="mini" @click.native="setDialog" v-if="!disabled">{{$i18ns('配置')}} </el-button>
    </div>
  </div>
</template>
<script>
  import RuleRemove from "@/views/risk/risk_decision_rule/reform_test/generalCom/_components/rule-remove";
  import _ from "lodash";

  const objDefault = {
    rule_uuid: null, // 条件编号
    rule_isRoot: false, //是否为分支第一项，不能删除
    rule_constraints: [], // 条件限制集合
    rule_logic: '', //用户选择与 或 设置规则
    rule_code: '', //规则代码
    rule_funcitonCode: '', //函数代码体
    rule_desc: '', //规则解释
    rule_Form: '' //规则表单数据
  };
  export default {
    name: "RuleItem",
    components: {
      RuleRemove,
    },
    props: {
      cMeta: Object, //本页面模板json数据Layout对象
      cParentMeta: Object, //父页面模板json数据Layout对象
      cParentParams: Object, //父页面自定义参数与内置参数
      cParentScope: Object, //父页面每块区域业务数据
      ruleDataObj: {
        type: Object
      },
      appId : Object,
      policy_rule_config: '',
      wf_task_no: Object,
      bpm_version: Object,
      route_id: Object,
      task_define_id: Object,
      wf_prod_no: Object,
      //是否可以编辑
      disabled: {
        type: Boolean,
        default: false
      },
      isCompare: {
        type: Boolean,
        default: true
      },
    },
    watch: {
      ruleDataObj: {
        handler() {
          this.ruleData = this.ruleDataObj;
        }
      },
      ruleData: {
        deep: true,
        handler() {
          // console.log('watch RuleData', this.ruleData);
          this.$bus.emit("updateData", this.ruleData);
        }
      },
    },
    data() {
      return {
        ruleData: this.ruleDataObj,
        appId: this.appId,
        policy_id: "",
        isInput: false,
        isRelation: false,
        attDropdown: false,
        isReturn: false,
        removeVarArr: [],
        fetchFact: {
          current: {
            text: "选择配置项"
          },
          list: [
            {
              type: "rule-set",
              factName: "<规则>"
            }
          ]
        },
        refEnumUuid: ""
      };
    },
    created() {
      this.handleFetchFactInit();
      this.policy_id = this.ruleData.policy_rule_config;
      this.ruleData.policy_id = this.ruleData.policy_rule_config;
    },
    methods: {
      switchLogicName(type) {
        switch (type) {
          case '':
            return '选择配置项'
            break;
          case 'and':
            return '<与>'
            break;
          case 'or':
            return '<或>'
            break;
          case 'rule-set':
            return '<规则>'
            break;
        }
      },
      // 默认条件下拉操作
      handleFetchFactInit() {
        this.fetchFact.current.text = '<规则>';
        this.ruleDataObj.rule_logic = "rule-set";
        this.ruleData.rule_constraints = [];
        this.isCompare = true;
      },
      // 条件下拉操作
      handleFetchFact(command) {
        this.fetchFact.current.text = command.factName
        this.ruleDataObj.rule_logic = command.type
        this.ruleData.rule_constraints = [];
        if (command.factName === "<规则>") {
          this.isCompare = true;
        } else {
          const obj = _.merge({}, objDefault);
          obj.rule_uuid = this.$moment().format('x');
          this.ruleData.rule_constraints.push(obj);
        }
      },
      // 属性值下拉操作
      handleAttribute(command) {},
      // 删除节点
      removeItem() {
        this.$bus.emit("removeRule", this.ruleData);
      },

      //配置对话框
      setDialog() {
        console.log("route_id : "+this.route_id);
        console.log("task_define_id : "+this.task_define_id);
        console.log("wf_prod_no : "+this.wf_prod_no);
        let that = this;
        that.$dataBus.bindCallBackMethod(that, that.dialogCallBack, {})
        this.$dialog.open({
          that: this,
          title: "设置规则",
          toRequest: {
            url: "/views/msap/bpm/processManagement/products/node/config/temp-strategy-rule-lookup.json", //跳到删除确认按钮页面框
            method: "get",
            params: {
              itemForm: this.ruleData.rule_Form,
              appId: this.appId,
              wf_task_no: this.wf_task_no,
              bpm_version: this.bpm_version,
              route_id: this.route_id,
              task_define_id: this.task_define_id,
              wf_prod_no: this.wf_prod_no,
            },
          },
          width: "70%",
        })
      },
      dialogCallBack(btnConfig, response) {
        this.ruleData.rule_code = response.itemCode;
        this.ruleData.rule_desc = response.itemDesc;
        this.ruleData.rule_Form = response.itemForm;
        this.policy_id = response.policy_id;
        this.ruleData.policy_id = response.policy_id;
      },
    }
  };
</script>
