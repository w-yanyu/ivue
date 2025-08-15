<template>
  <div class="rule-box">
    <rule-item :rule-data-obj="data" :disabled="disabled"></rule-item>
    <rule-subitem v-if="rule_constraints && rule_constraints.length > 0">
      <rule-tree v-for="(item, i) in rule_constraints" :key="i" :data="item" :disabled="disabled" :ruleData="ruleData"></rule-tree>
      <rule-plus @click.native="addRule" v-if="!disabled"></rule-plus>
    </rule-subitem>
  </div>
</template>

<script>
  import RuleItem from '@/views/msap/bpm/processManagement/products/node/rule/rule-item.vue';
  import RuleSubitem from '@/views/risk/risk_decision_rule/reform_test/generalCom/_components/rule-subitem';
  import RulePlus from '@/views/risk/risk_decision_rule/reform_test/generalCom/_components/rule-plus';
  export default {
    name: 'RuleTree',
    props: {
      data: {
        type: Object,
        default () {
          return {};
        }
      },
      ruleData: Object, //规则设置的主要数据
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
      RulePlus
    },
    created() {
      //.log('父类传过来的数据 ---rule-tree', this.data);
      //console.log('父类传过来的数据 ---rule-tree', this.ruleData);
      if(this.ruleData){
        //console.log('执行赋值********', this.ruleData);
        this.data.appId=this.ruleData.appId;
        this.data.wf_task_no=this.ruleData.wf_task_no;
        this.data.bpm_version=this.ruleData.bpm_version;
        this.data.route_id=this.ruleData.route_id;
        this.data.task_define_id=this.ruleData.task_define_id;
        this.data.wf_prod_no=this.ruleData.wf_prod_no;
      }
      
    },
    methods: {
      getData(obj, arr) {
        //console.log("getData-obj", obj);
        //console.log("getData-arr", arr);
        //console.log("规则设置有更新 ", this.ruleData);
        this.data.appId=obj.appId;
        this.data.wf_task_no=obj.wf_task_no;
        this.data.bpm_version=obj.bpm_version;
        this.data.route_id=obj.route_id;
        this.data.task_define_id=obj.task_define_id;
        this.data.wf_prod_no=obj.wf_prod_no;
      },
      addRule() {
        //console.log('addRule1111111111111111');
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
        //console.log('tree--- this.rule_constraints', this.rule_constraints);
      }
    }
  };
</script>
