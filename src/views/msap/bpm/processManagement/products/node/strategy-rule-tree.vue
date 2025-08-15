<template>
  <div class="rule-box">
    <strategy-rule-item :rule-data-obj="data" :appId="appId" :wf_task_no="wf_task_no" :bpm_version="bpm_version" :route_id="route_id" :task_define_id="task_define_id" :wf_prod_no="wf_prod_no" :policy_rule_config="policy_rule_config" :disabled="disabled"></strategy-rule-item>
    <strategy-rule-item v-if="rule_constraints && rule_constraints.length > 0" >
      <strategy-rule-tree v-for="(item, i) in rule_constraints" :key="i" :data="item" :appId="appId" :disabled="disabled" ></strategy-rule-tree>
      <rule-plus @click.native="addRule" v-if="!disabled"></rule-plus>
    </strategy-rule-item>
  </div>
</template>

<script>
  import RuleItem from '@/views/risk/risk_decision_rule/reform_test/generalCom/_components/rule-item';
  import RuleSubitem from '@/views/risk/risk_decision_rule/reform_test/generalCom/_components/rule-subitem';
  import RulePlus from '@/views/risk/risk_decision_rule/reform_test/generalCom/_components/rule-plus';
  
  import StrategyRuleItem from '@/views/msap/bpm/processManagement/products/node/strategy-rule-item';
  export default {
    name: 'StrategyRuleTree',
    props: {
      data: {
        type: Object,
        default () {
          return {};
        }
      },
      appId: Object,
      wf_task_no: Object,
      bpm_version: Object,
      route_id: Object,
      task_define_id: Object,
      wf_prod_no: Object,
      policy_rule_config: Object,
      //是否可以编辑
      disabled: {
        type: Boolean,
        default: false
      },

    },
    data() {
      return {};
    },
    computed: {
      rule_constraints() {
        return this.data['rule_constraints'];
      }
    },
    components: {
      RuleItem,
      RuleSubitem,
      RulePlus,
      StrategyRuleItem
    },
    created() {
    },
    methods: {
      addRule() {
        const obj = {
          rule_uuid: null, // 条件编号
          rule_isRoot: false, //是否是第一层的数据
          rule_constraints: [], // 条件限制集合
          rule_logic: '', //用户选择与 或 设置规则
          rule_code: '', //规则代码
          rule_desc: '', //规则解释
          rule_Form: ''//规则表单数据
        };
        // 如果当前不是条件子菜单，则添加属性
        obj.rule_constraints = [];
        obj.rule_uuid = this.$moment().format('x');
        this.rule_constraints.push(obj);
      }
    }
  };
</script>
