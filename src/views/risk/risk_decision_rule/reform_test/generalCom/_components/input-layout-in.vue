<template>
  <div id="page_content">

    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="custom-common--form">

      <el-row>
        <div class="tip_head">
          <el-input class="input_el" style="width: 330px; margin-right: 10px;" disabled v-model="itemData.conditionDesc">
          </el-input>

          <el-dropdown trigger="click" @command="handIncludeTypeListInputType">
            <span class="el-dropdown-link variant-style">
              {{includeInput.includeOperatorSymbolValue==='IN'?"<在>":"<不在>"}}
            </span>
            <i class="el-icon-arrow-down el-icon--right"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item, i) in includeTypeList" :key="i" :command="item" :disabled='disabled'>
                {{item.label}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>


          <!--  {{itemData.operatorSymbolValue==='IN'?"在":"不在"}} -->
        </div>
      </el-row>
      <el-row v-for="(child, index) in includeInput.inputInArray" :key="index">
        <div class="in-operator">
          <rule-remove @click.native="removeItem(index)" v-if='!disabled'></rule-remove>
          <el-dropdown trigger="click" @command="handleftInputType">
            <!--   <el-button size="mini" type="info" plain>
                {{switchInputTypeName(leftInputType)}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button> -->
            <span class="el-dropdown-link variant-style">
              {{switchInputTypeName(child.leftInputType)}}
            </span>
            <i class="el-icon-arrow-down el-icon--right"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item, i) in inputTypeList" :key="i" :command="{child,item}"
                :disabled='disabled'>{{item.label}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <!-- 常量输入框 -->
          <!-- <el-input class="input_el" v-if="child.leftInputType==='input'" placeholder="请输入常量值"
            style="width: 300px; margin-left: 10px;margin-right: 10px;" @input="constantInputValueEven($event,child)"
            v-model="child.leftValue">
          </el-input> -->
          <el-autocomplete v-if="child.leftInputType==='input'" class="input_el" :fetch-suggestions="querySearch"
            :placeholder="placeholderText" @select="handleConstantSelect($event,child)"
            @keyup.enter.native="handleConstantSelect($event,child)"
            style="width: 330px; margin-left: 10px;margin-right: 10px;" @input="constantInputValueEven($event,child)"
            v-model="child.leftValue" clearable :disabled='disabled'>
          </el-autocomplete>
          <!-- 变量选择框 -->
          <el-cascader class='cascader' v-else :options="conditionsListFilter" v-model="child.leftValueShow"
            :props="{ expandTrigger: 'hover'  }" @change="changeConditions($event,child)" :disabled='disabled'
            style="width: 330px;margin-left: 10px;margin-right: 10px;" clearable>
          </el-cascader>

        </div>
      </el-row>

      <el-row>
        <div class="plus">
          <rule-plus @click.native="addRule" v-if='!disabled'></rule-plus>
        </div>
      </el-row>

      <el-row>
        <div class="tip">
          集合内
        </div>
      </el-row>
      <!-- 提示 -->
      <el-row>
        <el-col :span="24">
          <div id="tipe">
            <div class="content">
              <span class="tips">使用说明：</span>
              <span class="explain">1、左表达式：条件选择的值</span>
              <span class="explain">2、操作符：判断左表达式中的值是否存在于用户输入的集合数组内</span>
              <span class="explain">3、右表达式：即用户输入的数据集合</span>
              <span class="explain"></span>
              <span class="tips">使用案例：</span>
              <span class="explain">案例1：企业类型在集合['R1','R2','R3']范围之内</span>
              <div class='explain-div-border'>

                <el-form ref="ruleForm" label-width="130px" class="custom-common--form">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="条件选择" prop="ruleName" label-width="100px">
                        <input class='explain-input-style' disabled value="企业类型" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label="条件属性" prop="ruleCode" label-width="100px">
                        <input class='explain-input-style' disabled value="Edm_co.entType" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label="数据类型" prop="ruleType" label-width="100px">
                        <input class='explain-input-style' disabled value="String--字符串" />
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="操作符" prop="ruleType" label-width="100px">
                        <input class='explain-input-style' disabled value="函数型/在...集合内(include函数)" />
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">
                      <el-form-item label=""  label-width="100px">
                        <input class='explain-input-style' disabled value="企业类型" />
                      </el-form-item>
                    </el-col>

                    <el-col :span="1">
                      <el-form-item label="<在>" label-width="100px">
                      </el-form-item>
                    </el-col>
                  </el-row>
                  
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="常量"  label-width="100px">
                        <input class='explain-input-style' disabled value="R1" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="常量"  label-width="100px">
                        <input class='explain-input-style' disabled value="R2" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="常量"  label-width="100px">
                        <input class='explain-input-style' disabled value="R3" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  
                  <el-row>
                   <el-col :span="1">
                     <el-form-item label="<集合内>" label-width="100px">
                     </el-form-item>
                   </el-col>
                  </el-row>
                  
                </el-form>

              </div>
              <span class="explain">表达式：include(seq.set('R1','R2','R3'),Edm_co.entType)</span>
            </div>
          </div>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>

<script>
  import {
    cloneJSON
  } from '@jsmini/clone';
  import RuleRemove from "@/views/risk/risk_decision_rule/reform_test/generalCom/_components/rule-remove";
  import RulePlus from '@/views/risk/risk_decision_rule/reform_test/generalCom/_components/rule-plus';
  const objDefault = {
    leftInputType: 'input', //左边下拉选择 常量 变量
    leftValue: '', //输入值
    leftDesc: '', // 转译
    leftDataType: '', //数据类型
  };
  export default {
    props: {
      cMeta: Object, //本页面模板json数据Layout对象
      cParentMeta: Object, //父页面模板json数据Layout对象
      cParentParams: Object, //父页面自定义参数与内置参数
      cParentScope: Object, //父页面每块区域业务数据
      conditionsListFilter: Object, //筛选后的条件选择项
      selectcConstant: Object, //常量填写选择项
      itemData: Object, //父类传过来的数据
      includeInput: Object, //父类传过来的在。。。集合场景主要输入数据
      //选择的数据类型
      conditionDataType: {
        type: String,
        default: '',
      },
      //父组件的关联选择转译方法
      getFormAmoutValidateInfo: {
        type: Function,
        default: null
      },
      //父组件的主动输入筛选方法
      querySearch: {
        type: Function,
        default: null
      },
      //不可编辑状态
      disabled: {
        type: Boolean,
        default: false
      },
    },
    components: {
      RuleRemove,
      RulePlus
    },
    data() {
      return {
        ruleForm: {

        },
        placeholderText: '',
        inputData: [], //输入类
        includeTypeList: [{
          label: "在",
          value: "IN"
        }, {
          label: "不在",
          value: "NO_IN"
        }, ],
        inputTypeList: [{
          label: "<常量>",
          value: "input"
        }, {
          label: "<变量>",
          value: "select"
        }, ],

      }
    },
    computed: {},
    mounted() {
      console.log('includeInput', this.includeInput);
      this.placeholderText = `请输入${this.itemData.conditionDataType}型常量`;
      if (this.includeInput.inputInArray.length === 0) {
        this.includeInput.inputInArray.push(objDefault)
      }
    },
    destroyed() {},
    computed: {},
    methods: {
      addRule() {
        // this.includeInput.inputInArray.push(objDefault)
        this.includeInput.inputInArray.push({
          leftInputType: 'input', //左边下拉选择 常量 变量
          leftValue: '', //输入值
          leftDesc: '', // 转译
          leftDataType: '', //数据类型
        })
        console.log(this.includeInput.inputInArray);
      },
      removeItem(index) {
        if (this.includeInput.inputInArray.length <= 1) {

        } else {
          this.includeInput.inputInArray.splice(index, 1);
        }
      },
      switchInputTypeName(type) {
        switch (type) {
          case 'input':
            return '<常量>'
            break;
          case 'select':
            return '<变量>'
            break;
        }
      },
      handIncludeTypeListInputType(command) {
        console.log('handleLeftInputType---command', command);
        this.includeInput.includeOperatorSymbolValue = command.value
      },
      // 左边输入方式选择
      handleftInputType(item) {
        console.log('handleLeftInputType---command', item);
        item.child.leftInputType = item.item.value
      },
      //常量输入框
      constantInputValueEven(e, item) {
        let value = e;
        if (this.itemData.conditionDataType === 'Int') {
          //一般情况下只能输入整数
          item.leftValue = value.replace(/\D/g, '')
        }
        if (this.itemData.conditionDataType === 'Decimal') {
          //只能输入数字不能输入小数点
          item.leftValue = value.replace(/[^\d.]/g, '').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        }
      },
      handleConstantSelect(selectItem, childItem) {
        console.log('handleConstantSelect--主动输入被选择', selectItem);
        childItem.leftValue = selectItem.label;
      },
      //变量选择框
      changeConditions(val, item) {
        console.log('条件选择改变触发', val, item);
        let value = this.getFormAmoutValidateInfo(val) && this.getFormAmoutValidateInfo(val).value ? this
          .getFormAmoutValidateInfo(val).value : ''
        let desc = this.getFormAmoutValidateInfo(val) && this.getFormAmoutValidateInfo(val).label ? this
          .getFormAmoutValidateInfo(val).label : ''
        let dataType = this.getFormAmoutValidateInfo(val) && this.getFormAmoutValidateInfo(val).dataType ?
          this
          .getFormAmoutValidateInfo(val).dataType : '';
        item.leftValue = value; // 变量选择值
        item.leftDesc = desc; //变量转译
        item.leftDataType = dataType; //变量数据类型
        console.log('item', item);
      },
      //重置输入选项
      resetIn() {
        this.includeInput.inputInArray.length = 0
        this.includeInput.inputInArray.push(objDefault);
      },
      checkComplete() {
        for (const child of this.includeInput.inputInArray) {
          if (child.leftValue === '') {
            this.$message.error("有未填写完成项，请检查");
            return false
          }
        }
        return true;
      },
      //转译itemcode itemDesc
      translationIn() {
        let tempValue = '';
        let tempDesc = '';
        const cloneArray = cloneJSON(this.includeInput.inputInArray);
        this.includeInput.inputInArray.forEach((child, index) => {
          let leftValueTemp = this.itemData.conditionDataType === 'String' && child.leftInputType === 'input' ?
            `'${child.leftValue}'` : child.leftValue;
          let leftDescTemp = child.leftInputType === 'select' ? child.leftDesc : leftValueTemp;
          if (index === cloneArray.length - 1) {
            tempValue += `${leftValueTemp}`
            tempDesc += `${leftDescTemp}`
          } else {
            tempValue += `${leftValueTemp},`
            tempDesc += `${leftDescTemp},`
          }
        });
        // for (const child of cloneArray){
        //   let leftValueTemp = this.includeInput.conditionDataType === 'String' && child.leftInputType === 'input' ? `"${child.leftValue}"` : child.leftValue;
        //   let leftDescTemp = child.leftInputType === 'select' ? child.leftDesc : leftValueTemp;
        //   if (cloneArray.length === 1) {
        //     tempValue = `${leftValueTemp}`
        //     tempDesc = `${leftDescTemp}`
        //   } else {
        //     tempValue = `${tempValue}${leftValueTemp},`
        //     tempDesc = `${tempValue}${leftDescTemp},`
        //   }
        // }

        let tempOperator = this.includeInput.includeOperatorSymbolValue === 'IN' ? 'include' : '!include';
        let tempOperatorDesc = this.includeInput.includeOperatorSymbolValue === 'IN' ? '在' : '不在';
        this.itemData.itemCode = `${tempOperator}(seq.set(${tempValue}),${this.itemData.conditionValue})`;
        this.itemData.itemDesc = `${this.itemData.conditionDesc} ${tempOperatorDesc}(${tempDesc}) 集合内`
      },

    },
  }
</script>

<style lang="css" scoped>
  #page_content {
    width: 100%;
    height: 100%;
    position: relative;
    padding-bottom: 50px;
  }

  .in-operator {
    width: 90%;
    margin-left: 90px;
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .plus {
    width: 90%;
    margin-top: 20px;
    margin-left: 75px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .variant-style {
    margin-left: 5px;
    color: #00aaff;
    font-weight: bold;
  }

  .tip_head {
    margin-left: 90px;
    margin-top: 20px;
  }

  .tip {
    margin-left: 90px;
    margin-top: 20px;
  }

  #tipe {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    background-color: #fcfff3;
  }

  #tipe .content {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 95%;
    display: flex;
    flex-direction: column;
  }

  #tipe .tips {
    color: #ff8080;
    font-weight: bold;
    font-family: '宋体';
  }

  #tipe .explain {
    color: #e8aa4c;
  }

  #tipe span {
    font-size: 14px;
    padding: 1px;
    margin-right: 8px;
    color: #999999;
  }

  .explain-input-style {
    width: 200px;
    color: #ff5500;
  }

  .explain-div-border {
    border: 1px dashed;
    border-radius: 15px;
    padding: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .explain-title {
    display: -moz-inline-box;
    display: inline-block;
    width: 100px;
    color: #333;
    text-align: right;
  }
</style>
