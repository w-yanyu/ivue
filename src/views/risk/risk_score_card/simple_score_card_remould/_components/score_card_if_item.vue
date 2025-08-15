<template>
  <div class="rule-box flex-box">
    <el-button class="title-btn" type="primary" size="mini">
      if
    </el-button>

    <rule-subitem>
      <div class="settingItem">
        <el-input class='settingItemInput' placeholder="规则表达式" v-model="ruleData.executeExpress" disabled></el-input>
        <el-button type="primary" size="mini" @click.native="setRuleDialog" v-if="!disabled"
          :disabled='ruleDataParent.conditionValueShow.length===0'>规则配置 </el-button>
      </div>

      <div class="settingItem">
        <el-input class='settingItemInput' placeholder="得分表达式" v-model="ruleData.actionValue" disabled></el-input>
        <el-button type="primary" size="mini" @click.native="setScoreDialog" v-if="!disabled"
          :disabled='ruleDataParent.conditionValueShow.length===0'>得分配置 </el-button>
      </div>

    </rule-subitem>
  </div>
</template>
<script>
  import RuleSubitem from '@/views/risk/risk_score_card/simple_score_card_remould/_components/score_card_subitem';

  export default {
    components: {
      RuleSubitem,
    },
    props: {
      ruleDataParent: Object, //规则设置的主要数据
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
      };
    },
    created() {
      console.log('父类传过来的数据 ---if item', this.ruleData);
    },
    methods: {


      //配置规则对话框
      setRuleDialog() {
        let that = this;
        console.log('配置规则对话框', that.ruleData);
        that.$dataBus.bindCallBackMethod(that, that.setRuleDialogCallBack, {})
        that.$dialog.open({
          that: that,
          title: "设置规则",
          toRequest: {
            url: "@scoreCardRuleSetting", //设置规则
            method: "get",
            params: {
              executeExpressNature: that.ruleData.executeExpressNature,
              conditionValueShow: that.ruleDataParent.conditionValueShow, //回显条件选择值
              conditionValue: that.ruleDataParent.conditionValue, //条件选择值
              conditionDesc: that.ruleDataParent.conditionDesc, //条件选择后的转译解释
              conditionDataType: that.ruleDataParent.conditionDataType,
            },
          },
          width: "80%",
        })
      },
      //配置规则回调
      setRuleDialogCallBack(btnConfig, response) {
        console.log("配置规则对话框的回调", btnConfig)
        console.log("配置规则对话框的回调", response)
        this.ruleData.executeFunctionCode = response.executeFunctionCode; //可执行表达式函数体
        this.ruleData.executeExpress = response.executeExpress; //可执行表达式
        this.ruleData.executeExpressDesc = response.executeExpressDesc; //可执行表达式中文描述
        this.ruleData.executeExpressNature = response.executeExpressNature; //规则条件的json字段
      },
      //配置得分对话框
      setScoreDialog() {
        let that = this;
        that.$dataBus.bindCallBackMethod(that, that.setScoreDialogCallBack, {})
        this.$dialog.open({
          that: this,
          title: "设置得分",
          toRequest: {
            // url: "@functionSetAll", //设置规则
            url: "@functionSetAllOtherLayout", //设置规则
            method: "get",
            params: {
              title: '得分',
              row: {
                valueNatureExpress: this.ruleData.valueNatureExpress,
              },
              dataType: 'Decimal',
            },
          },
          width: "80%",
        })
      },
      //配置得分回调
      setScoreDialogCallBack(btnConfig, response) {
        console.log("配置得分对话框的回调", btnConfig)
        console.log("配置得分对话框的回调", response)
        let that = this;
        this.ruleData.valueFunctionCode = response.functionCode;
        that.ruleData.actionValue = response.scorePoints;
        that.ruleData.valueExpression = response.valueExpression
        that.ruleData.valueNatureExpress = response.valueNatureExpress
        that.ruleData.valueType = response.valueType
        that.ruleData.attributeDesc = response.attributeDesc
        that.ruleData.buttonText = response.scoreMoldText
      },
    }
  };
</script>

<style lang="css" scoped>
  .title-btn {
    margin-left: 10px;
    cursor: default;
    width: 60px;
  }

  .settingItem {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .settingItemInput {
    width: 400px;
    margin-left: 10px;
    margin-right: 10px;
  }
</style>
