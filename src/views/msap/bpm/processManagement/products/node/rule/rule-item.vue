<template>
  <div class="rule-item">
    <!-- 删除节点按钮 -->
    <rule-remove @click.native="removeItem" v-if="!disabled"></rule-remove>

    <!-- 较值条件 -->
    <!--  <rule-compare v-if="isCompare" :rule-data.sync="ruleData" :fact-list="factList" :constant-list='constantList' :fun-detail-list='funDetailList'></rule-compare> -->

    <!-- 添加条件 -->
    <el-dropdown trigger="click" @command="handleFetchFact">
      <el-button type="primary" size="mini" :disabled="disabled">
        {{switchLogicName(ruleData.rule_logic)}}
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
      <el-button type="primary" size="mini" @click.native="setDialog" v-if="!disabled">配置 </el-button>
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
    policy_id: '', //规则代码
    rule_funcitonCode: '', //函数代码体
    rule_desc: '', //规则解释
    rule_Form: '', //规则表单数据
    appId: '',
    wf_task_no: '',
    bpm_version: '',
    route_id: '',
    task_define_id: '',
    wf_prod_no: '',
  };
  export default {
    name: "RuleItem",
    components: {
      RuleRemove,
    },
    props: {
      ruleDataObj: {
        type: Object
      },
      //是否可以编辑
      disabled: {
        type: Boolean,
        default: false
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
      }
    },
    data() {
      return {
        ruleData: this.ruleDataObj,
        policy_id: "",
        rule_desc: '',
        isCompare: false,
        isInput: false,
        isRelation: false,
        attDropdown: false,
        isReturn: false,
        removeVarArr: [],
        fetchFact: {
          current: {
            text: "选择配置项"
          },
          list: [{
              type: "and",
              factName: "<与>"
            },
            {
              type: "or",
              factName: "<或>"
            },
            {
              type: "not",
              factName: "<非>"
            },
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
      //console.log('父类传过来的数据 ---rule-item', this.ruleData);
      //console.log('父类传过来的数据----this.ruleDataObj', this.ruleDataObj);
      this.policy_id = this.ruleData.policy_id;
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
          case 'not':
            return '<非>'
            break;
        }
      },
      // 条件下拉操作
      handleFetchFact(command) {
        //console.log('handleFetchFact---command', command);
        //console.log('handleFetchFact---this.ruleData', this.ruleData);
        this.fetchFact.current.text = command.factName
        this.ruleDataObj.rule_logic = command.type
        this.ruleData.rule_constraints = [];
        if (command.factName === "<规则>") {
          this.isCompare = true;
        } else {
          
          const obj = _.merge({}, objDefault);
          obj.rule_uuid = this.$moment().format('x');
          this.ruleData.rule_constraints.push(obj);
          //console.log('item---this.ruleData.rule_constraints', this.ruleData.rule_constraints);

        }
      },
      // 属性值下拉操作
      handleAttribute(command) {},
      // 删除节点
      removeItem() {
        //console.log('rule-item-removeItem+++++++++++++++++++++');
        this.$bus.emit("removeRule", this.ruleData);
      },

      //配置对话框
      setDialog_old() {
        let that = this;
        that.$dataBus.bindCallBackMethod(that, that.dialogCallBack, {})
        this.$dialog.open({
          that: this,
          title: "设置规则",
          toRequest: {
            url: "@decisionRuleAddDialog", //跳到删除确认按钮页面框
            method: "get",
            params: {
              itemForm: this.ruleData.rule_Form
            },
          },
          width: "90%",
        })
      },
      setDialog() {
        let that = this;
        that.$dataBus.bindCallBackMethod(that, that.dialogCallBack, {})
        this.$dialog.open({
          that: this,
          title: "设置规则",
          toRequest: {
            url: "/views/msap/bpm/processManagement/products/node/config/temp-strategy-rule-lookup.json", //
            method: "get",
            params: {
              itemForm: this.ruleData.rule_Form,
              appId: this.ruleData.appId,
              wf_task_no: this.ruleData.wf_task_no,
              bpm_version: this.ruleData.bpm_version,
              route_id: this.ruleData.route_id,
              task_define_id: this.ruleData.task_define_id,
              wf_prod_no: this.ruleData.wf_prod_no,
            },
          },
          width: "70%",
        })
      },
      dialogCallBack(btnConfig, response) {
        //console.log("对话框待会的回调", btnConfig)
        //console.log("对话框待会的回调", response)
        this.ruleData.rule_code = response.itemCode;
        this.ruleData.rule_desc = response.policy_name;
        this.ruleData.rule_Form = response.itemForm;
        //this.ruleData.rule_funcitonCode = response.itemForm.funcitonCode;
        this.policy_id = response.policy_id;
        this.ruleData.policy_id = response.policy_id;
        console.log('父类传过来的数据 ---rule-item', this.policy_id);
        console.log('父类传过来的数据 ---rule-item', this.ruleData);
      },
    }
  };
</script>
