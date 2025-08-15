<template>
  <div class="rule-item">
    <el-button class="title-btn" type="primary" size="mini">
      else
    </el-button>

    <div class="settingItem">
      <el-input class='settingItemInput' placeholder="得分表达式" v-model="ruleData.actionValue" disabled></el-input>
      <el-button type="primary" size="mini" @click.native="setScoreDialog" v-if="!disabled"
        :disabled='ruleDataParent.conditionValueShow.length===0'>得分配置 </el-button>
    </div>

  </div>
</template>
<script>
  import RuleRemove from "@/views/risk/risk_score_card/simple_score_card_remould/_components/score_card_remove";

  export default {
    name: "RuleItem",
    components: {
      RuleRemove,
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
      console.log('父类传过来的数据 ---rule-item', this.ruleData);
    },
    methods: {
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
        this.ruleData.actionValue = response.scorePoints;
        this.ruleData.valueExpression = response.valueExpression
        this.ruleData.valueNatureExpress = response.valueNatureExpress
        this.ruleData.valueType = response.valueType
        that.ruleData.attributeDesc = response.attributeDesc
        this.ruleData.buttonText = response.scoreMoldText
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
