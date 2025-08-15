<template>
  <div class="rule-box flex-box">
    <div class="title-btn">
      <el-cascader class="input_el cascader" v-model="ruleData.conditionValueShow" :options="conditionsList"
        :disabled="disabled ||isEdit" :props="{ expandTrigger: 'hover' }" @change="changeLeft(scope)" clearable
        placeholder="请选择事实属性" :filterable="true">
      </el-cascader>

      <el-input-number v-model.number="ruleData.scoreAttributePercent" :precision="2" min="0" max="100" size="small"
        @blur="scorePercentInput($event)" :disabled="disabled"></el-input-number>
    </div>

    <rule-subitem>
      <Ifitem :ruleDataObj='ruleData.ifItem' :ruleDataParent='ruleData' :disabled="disabled"></Ifitem>
      <ElseIfitem v-for="(item, i) in ruleData.elseIfArray" :key="i" :data='item' :disabled="disabled"
        :ruleDataObj='item' :ruleDataParent='ruleData'></ElseIfitem>
      <rule-plus @click.native="addRule" v-if="!disabled"></rule-plus>
      <Elseitem :ruleDataObj='ruleData.elseItem' :disabled="disabled" :ruleDataParent='ruleData'></Elseitem>
    </rule-subitem>
  </div>
</template>

<script>
  import RulePlus from '@/views/risk/risk_score_card/simple_score_card_remould/_components/score_card_plus';
  import RuleSubitem from '@/views/risk/risk_score_card/simple_score_card_remould/_components/score_card_subitem';
  import Ifitem from '@/views/risk/risk_score_card/simple_score_card_remould/_components/score_card_if_item';
  import ElseIfitem from '@/views/risk/risk_score_card/simple_score_card_remould/_components/score_card_elseif_item';
  import Elseitem from '@/views/risk/risk_score_card/simple_score_card_remould/_components/score_card_else_item';
  import _ from 'lodash';

  const objDefault = {
    itemId: '', //id
    itemExecuteExpress: '', //规则转译表达式上传后台表达式
    itemExecuteExpressDesc: '', //中文描述（暂时没写）
    executeFunctionCode: '', //可执行的方法
    executeExpress: '', //可执行表达式函数体+表达式
    executeExpressDesc: '', //可执行表达式中文描述
    executeExpressNature: '', //规则条件的json字段
    actionValue: '', //分值 表达式
    valueFunctionCode: '', //得分函数方法
    valueExpression: '', // //得分表达式后台用  方法+表达式
    valueNatureExpress: '', //上传json
    valueType: '', //数据类型
    attributeDesc: '', //关联选择解释
    buttonText: '', //按钮文本
  };
  export default {
    name: 'RuleSelect',
    components: {
      RulePlus,
      RuleSubitem,
      Ifitem,
      ElseIfitem,
      Elseitem,
    },
    props: {
      ruleData: Object, //规则设置的主要数据
      conditionsList: Object, //事实联合选择字典
      //是否可以编辑
      disabled: {
        type: Boolean,
        default: false
      },
      setCrtOriginBizRule: {
        type: Function,
        default: null
      },
      isEdit: {
        type: Boolean,
        default: false
      }

    },
    data() {
      return {
        isCheck: false,
        isReturn: false,
        dataList: [], //联动条件选择选项字典
      };
    },
    mounted() {
      this.$bus.on('removeRule', e => {
        this.removeRule(e);
      });
      //注册相关监听事件
      this.$bus.on('updateData', e => {
        this.updateData(e);
      });
      console.log('this.$bus``````````````````', this.$bus);
      console.log('score_card_select------disabled====', this.disabled);
    },
    beforeDestroy() {
      console.log('注销监听事件');
      //释放相关监听事件
      // this.$bus.off('removeRule', this.removeRule);
      // this.$bus.off('updateData', this.updateData);
      this.$bus.off('removeRule');
      this.$bus.off('updateData');
    },
    methods: {
      addRule() {
        const obj = _.merge({}, objDefault);
        obj.itemId = this.$moment().format('x');
        this.ruleData.elseIfArray.push(obj);
      },
      updateData(obj, arr) {
        console.log('updateData-obj', obj);
        console.log('updateData-arr', arr);
        console.log('规则设置有更新 ', this.ruleData);
        this.ruleData.executeExpressShow = this.translationItemRuleShow(this.ruleData); //转译成规则代码回显用
        this.ruleData.executeExpress = this.translationItemRuleValue(this.ruleData); //规则转译表达式上传后台表达式
        this.ruleData.executeExpressDesc = this.translationItemRuleZH(this.ruleData); //中文描述（暂时没写）
        this.translationItemRule(this.ruleData); //自转译
        console.log('转译表达式回显', this.ruleData.executeExpressShow);
        console.log('转译表达式传后台', this.ruleData.executeExpress);
        console.log('转译表达式中文', this.ruleData.executeExpressDesc);
      },
      // checkVariant(obj, arr) {},

      removeRule(obj, arr) {
        console.log('removeRule-ruleData--------------------', this.ruleData);
        console.log('removeRule-obj', obj);
        console.log('removeRule-arr', arr);
        const index = this.ruleData.elseIfArray.findIndex(item => item.itemId === obj.itemId);
        this.ruleData.elseIfArray.splice(index, 1);
        this.ruleData.executeExpressShow = this.translationItemRuleShow(this.ruleData); //转译成规则代码回显用
        this.ruleData.executeExpress = this.translationItemRuleValue(this.ruleData); //规则转译表达式上传后台表达式
        this.ruleData.executeExpressDesc = this.translationItemRuleZH(this.ruleData); //中文描述（暂时没写）
        this.translationItemRule(this.ruleData); //自转译
      },


      //表达式转译  回显用 有换行
      translationItemRuleShow(ruleItemData) {
        let executecode = ''; //转译执行表达式
        let functionCodeAll = ''; //执行方法代码
        //赋值if中的表达式值
        executecode = `if(${ruleItemData.ifItem.executeExpress}){${ruleItemData.ifItem.actionValue}}`;
        if (ruleItemData.ifItem.executeFunctionCode.length > 0) {
          functionCodeAll = `${ruleItemData.ifItem.executeFunctionCode}`;
        }
        if (ruleItemData.ifItem.valueFunctionCode.length > 0) {
          functionCodeAll = `${functionCodeAll} \n ${ruleItemData.ifItem.valueFunctionCode}`;
        }


        //else if  的赋值
        for (const child of ruleItemData.elseIfArray) {
          executecode = `${executecode} \n elsif(${child.executeExpress}){${child.actionValue}}`;
          if (child.executeFunctionCode.length > 0) {
            functionCodeAll = `${functionCodeAll} \n ${child.executeFunctionCode}`;
          }
          if (child.valueFunctionCode.length > 0) {
            functionCodeAll = `${functionCodeAll} \n  ${child.valueFunctionCode}`;
          }
        }
        //else 的赋值
        executecode = `${executecode} \n else{${ruleItemData.elseItem.actionValue}}`;
        if (ruleItemData.elseItem.valueFunctionCode.length > 0) {
          functionCodeAll = `${functionCodeAll} \n ${ruleItemData.elseItem.valueFunctionCode}`;
        }
        console.log('functionCodeAll', functionCodeAll, functionCodeAll.length);
        return functionCodeAll === '' ? `${executecode}` : `${functionCodeAll} \n ${executecode}`
      },
      //表达式转译 传给后台用
      translationItemRuleValue(ruleItemData) {
        let executecode = ''; //转译执行表达式
        let functionCodeAll = ''; //执行方法代码
        //赋值if中的表达式值
        executecode = `if(${ruleItemData.ifItem.executeExpress}){${ruleItemData.ifItem.actionValue}}`;
        if (ruleItemData.ifItem.executeFunctionCode.length > 0) {
          functionCodeAll = `${ruleItemData.ifItem.executeFunctionCode}`;
        }
        if (ruleItemData.ifItem.valueFunctionCode.length > 0) {
          functionCodeAll = `${functionCodeAll}${ruleItemData.ifItem.valueFunctionCode}`;
        }


        //else if  的赋值
        for (const child of ruleItemData.elseIfArray) {
          executecode = `${executecode}elsif(${child.executeExpress}){${child.actionValue}}`;
          if (child.executeFunctionCode.length > 0) {
            functionCodeAll = `${functionCodeAll}${child.executeFunctionCode}`;
          }
          if (child.valueFunctionCode.length > 0) {
            functionCodeAll = `${functionCodeAll}${child.valueFunctionCode}`;
          }
        }
        //else 的赋值
        executecode = `${executecode}else{${ruleItemData.elseItem.actionValue}}`;
        if (ruleItemData.elseItem.valueFunctionCode.length > 0) {
          functionCodeAll = `${functionCodeAll}${ruleItemData.elseItem.valueFunctionCode}`;
        }
        console.log('functionCodeAll', functionCodeAll, functionCodeAll.length);
        return functionCodeAll === '' ? `${executecode}` : `${functionCodeAll} \n ${executecode}`
      },
      //整体转译中文
      translationItemRuleZH(ruleItemData) {
        let executecode = ''; //转译执行表达式
        let functionCodeAll = ''; //执行方法代码
        //赋值if中的表达式值
        executecode = ruleItemData.ifItem.attributeDesc.length > 0
          ? `如果(${ruleItemData.ifItem.executeExpressDesc}){返回${ruleItemData.ifItem.attributeDesc}}`
          : `如果(${ruleItemData.ifItem.executeExpressDesc}){返回${ruleItemData.ifItem.actionValue}}`;
        //else if  的赋值
        for (const child of ruleItemData.elseIfArray) {
          executecode = child.executeExpressDesc.length > 0
            ? `${executecode}否则如果(${child.executeExpressDesc}){返回${child.conditionDesc}}`
            : `${executecode}否则如果(${child.executeExpressDesc}){返回${child.actionValue}}`;
        }
        //else 的赋值
        executecode = ruleItemData.elseItem.attributeDesc.length > 0
          ? `${executecode}否则{返回${ruleItemData.elseItem.attributeDesc}}`
          : `${executecode}否则{返回${ruleItemData.elseItem.actionValue}}`;
        return executecode
      },
      //自转译
      translationItemRule(ruleItemData) {
        //赋值if中的表达式值 全部转译
        // this.ruleData.ifItem.itemExecuteExpress =
        //   `if(${ruleItemData.ifItem.executeExpress}){${ruleItemData.ifItem.actionValue}}`;
        // this.ruleData.ifItem.itemExecuteExpressDesc = ruleItemData.ifItem.attributeDesc.length > 0 ?
        //   `如果(${ruleItemData.ifItem.executeExpressDesc}){返回${ruleItemData.ifItem.attributeDesc}}` :
        //   `如果(${ruleItemData.ifItem.executeExpressDesc}){返回${ruleItemData.ifItem.actionValue}}`;

        //赋值if中的表达式值 自转译规则段
        this.ruleData.ifItem.itemExecuteExpress =
          `if(${ruleItemData.ifItem.executeExpress})`;
        this.ruleData.ifItem.itemExecuteExpressDesc = `如果(${ruleItemData.ifItem.executeExpressDesc})`


        //else if  的赋值 全部转译
        // for (let i = 0; i < ruleItemData.elseIfArray.length; i++) {
        //   this.ruleData.elseIfArray[i].itemExecuteExpress =
        //     `elsif(${ruleItemData.elseIfArray[i].executeExpress}){${ruleItemData.elseIfArray[i].actionValue}}`;
        //   this.ruleData.elseIfArray[i].itemExecuteExpressDesc = ruleItemData.elseIfArray[i].attributeDesc.length >
        //     0 ?
        //     `否则如果(${ruleItemData.elseIfArray[i].executeExpressDesc}){返回${ruleItemData.elseIfArray[i].attributeDesc}}` :
        //     `否则如果(${ruleItemData.elseIfArray[i].executeExpressDesc}){返回${ruleItemData.elseIfArray[i].actionValue}}`;
        // }

        //else if  的赋值 自转译规则段
        for (let i = 0; i < ruleItemData.elseIfArray.length; i++) {
          this.ruleData.elseIfArray[i].itemExecuteExpress =
            `elsif(${ruleItemData.elseIfArray[i].executeExpress})`;
          this.ruleData.elseIfArray[i].itemExecuteExpressDesc =
            `否则如果(${ruleItemData.elseIfArray[i].executeExpressDesc})`
        }


        //else 的赋值 全部转译
        // this.ruleData.elseItem.itemExecuteExpress = `else{${ruleItemData.elseItem.actionValue}}`;
        // this.ruleData.elseItem.itemExecuteExpressDesc = ruleItemData.elseItem.attributeDesc.length > 0 ?
        //   `否则{返回${ruleItemData.elseItem.attributeDesc}}` :
        //   `否则{返回${ruleItemData.elseItem.actionValue}}`;

        //else 的赋值 全部转译
        this.ruleData.elseItem.itemExecuteExpress = `else`;
        this.ruleData.elseItem.itemExecuteExpressDesc = `否则`
        console.log('自转译规则跑完后------------------', this.ruleData);
      },

      //权重输入
      scorePercentInput(event, row) {
        let value = event.target.value;
        if (parseInt(value) > 100) value = "100";
        if (parseInt(value) < 0) value = "0";
        this.ruleData.scorePercent = value;
      },
      //重置输入
      reset() {
        let that = this;
        that.ruleData.ifItem.executeFunctionCode = '';
        that.ruleData.ifItem.executeExpress = '';
        that.ruleData.ifItem.executeExpressDesc = '';
        that.ruleData.ifItem.executeExpressNature = '';
        that.ruleData.ifItem.actionValue = '';
        that.ruleData.ifItem.valueFunctionCode = '';
        that.ruleData.ifItem.valueExpression = '';
        that.ruleData.ifItem.valueNatureExpress = '';
        that.ruleData.ifItem.valueType = '';
        that.ruleData.ifItem.attributeDesc = '';
        that.ruleData.ifItem.buttonText = '';

        that.ruleData.elseIfArray = [];


        that.ruleData.elseItem.actionValue = '';
        that.ruleData.elseItem.valueFunctionCode = '';
        that.ruleData.elseItem.valueExpression = '';
        that.ruleData.elseItem.valueNatureExpress = '';
        that.ruleData.elseItem.valueType = '';
        that.ruleData.elseItem.attributeDesc = '';
        that.ruleData.elseItem.buttonText = '';
      },

      changeLeft(val) {
        console.log('changeLeft', val);
        this.ruleData.conditionDataType =
          this.getFormAmoutValidateInfo(this.ruleData.conditionValueShow) &&
          this.getFormAmoutValidateInfo(this.ruleData.conditionValueShow).dataType
          ? this.getFormAmoutValidateInfo(this.ruleData.conditionValueShow).dataType
          : "";
        this.ruleData.conditionDesc =
          this.getFormAmoutValidateInfo(this.ruleData.conditionValueShow) &&
          this.getFormAmoutValidateInfo(this.ruleData.conditionValueShow).label
          ? this.getFormAmoutValidateInfo(this.ruleData.conditionValueShow).label
          : "";

        this.ruleData.conditionValue = this.ruleData.conditionValue =
          this.getFormAmoutValidateInfo(this.ruleData.conditionValueShow) &&
          this.getFormAmoutValidateInfo(this.ruleData.conditionValueShow).value
          ? this.getFormAmoutValidateInfo(this.ruleData.conditionValueShow).value
          : "";
        this.reset();
        console.log("changeLeft", this.ruleData);
      },

      getFormAmoutValidateInfo(val) {
        for (let i in this.conditionsList) {
          let item = this.conditionsList[i].children;
          for (let z in item) {
            if (item[z].children) {
              for (let x in item[z].children) {
                if (item[z].children[x].value === val[val.length - 1]) {
                  return {
                    value: item[z].children[x].value,
                    label: item[z].label + "." + item[z].children[x].label,
                    dataType: item[z].children[x].dataType,
                    reference: item[z].children[x].reference
                  };
                }
              }
            } else {
              if (val === undefined) {
                return {
                  value: item[z].value,
                  label: item[z].label,
                  dataType: item[z].dataType,
                  reference: item[z].reference
                };
              }
              if (item[z].value === val[val.length - 1]) {
                return {
                  value: item[z].value,
                  label: item[z].label,
                  dataType: item[z].dataType,
                  reference: item[z].reference
                };
              }
            }
          }
        }
      },

    }
  };
</script>

<style lang="less">
  .rule-box {
    font-size: 13px;
    color: #666;
    display: flex;
    margin-bottom: 5px;

    .el-button--mini {
      padding: 7px 10px;
    }

    .el-icon-caret-bottom {
      cursor: pointer;
    }

    .rule-item {
      margin: 0 0 5px 15px;
      align-items: center;
      display: flex;
      flex: 0 1 auto;

      span.rule-variant {
        cursor: pointer;
        display: inline-block;
        margin-left: 10px;
      }

      .rule-compare,
      .rule-relation,
      .rule-action {
        display: flex;
        align-items: center;
        flex: 1 0 auto;
      }

      .el-tag {
        margin-left: 5px;
        cursor: pointer;
      }

      .el-dropdown-link {
        margin: 0 5px;
        cursor: pointer;
        color: #409eff;
      }

      .variant-style {
        color: #f60;
      }

      .rule-input.el-input {
        margin-left: 5px;
        width: 60px;

        >input.el-input__inner {
          padding: 0 5px;
        }
      }

      .rule-action-input.el-input {
        margin-left: 5px;

        >input.el-input__inner {
          padding: 0 5px;
        }
      }

      .rule-input-date.el-date-editor {
        margin-left: 5px;
        width: 135px;

        >input.el-input__inner {
          padding: 0 5px;
        }
      }
    }
  }

  .flex-box {
    display: flex;
    align-items: center;
  }

  .input_el {
    width: 200px;
  }
</style>
