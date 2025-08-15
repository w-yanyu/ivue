<template>
  <div id="page_content">
    <div class="funtion_content">

      <el-input class="input_el lambda" v-model="customFunctionInput.functionStartInput" disabled="true"></el-input>
      <div class="tip">
        ->
      </div>
      <el-input class="input_el function_code" v-model="customFunctionInput.functionCodeInput" type="textarea"
        placeholder="请输入自定义逻辑" resize="none" rows=" 12 "   :disabled='disabled'></el-input>
      <div class="tip">
      </div>
      <el-input class="input_el lambda" v-model="customFunctionInput.functionEndInput" disabled="true"></el-input>

    </div>
    <!-- 提示 -->
    <div id="tipe">
      <div class="content">
        <span class="tips">使用说明：</span>
        <span class="explain">1、左表达式：条件选择的值</span>
        <span class="explain">2、操作符：自定义函数 对左表达式进行操作</span>
        <span class="explain">3、右表达式：函数体中返回值只能为boolean类型</span>
        <span class="explain"></span>
        <span class="tips">使用案例：</span>
        <span class="explain">案例1：自定义函数 可用额度的平方大于1000000.00元</span>
        <div class='explain-div-border'>


          <el-form ref="ruleForm" label-width="130px" class="custom-common--form">
            <el-row>
              <el-col :span="8">
                <el-form-item label="条件选择" prop="ruleName" label-width="100px">
                  <input class='explain-input-style' disabled value="可用额度" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="条件属性" prop="ruleCode" label-width="100px">
                  <input class='explain-input-style' disabled value="acct.availLimit" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="数据类型" label-width="100px">
                  <input class='explain-input-style' disabled value="Decimal--数值" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6">
                <el-form-item label="操作符" label-width="100px">
                  <input class='explain-input-style' disabled value="函数型/自定义函数" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6">
                <el-form-item label="" >
                  <input class='explain-input-style' disabled value="lambda(acct.availLimit)" />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="">
                <textarea  class='explain-input-style'   rows="5" disabled>return acct.availLimit * acct.availLimit > 1000000.00;</textarea>
                </el-form-item>
              </el-col>


              <el-col :span="6">
                <el-form-item label=""  >
                  <input  class='explain-input-style' disabled value="end(acct.availLimit)" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

        </div>
        <span class="explain">表达式：lambda(entType) -> return acct.availLimit * acct.availLimit > 1000000.00; end(entType)</span>
      </div>
    </div>

  </div>
</template>

<script>
  import formulaSetValue from '@/components/FunctionSet/set_formula_variable_attribute';
  export default {
    props: {
      cMeta: Object, //本页面模板json数据Layout对象
      cParentMeta: Object, //父页面模板json数据Layout对象
      cParentParams: Object, //父页面自定义参数与内置参数
      cParentScope: Object, //父页面每块区域业务数据
      conditionsListTemp: Object, //条件选项的原始数组
      conditionsListFilter: Object, //筛选后的条件选择项
      selectcConstant: Object, //常量填写选择项
      itemData: Object, //父类传过来的数据
      customFunctionInput: Object, //自定义函数主要输入数据
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
      formulaSetValue,
    },
    data() {
      return {
        ruleForm: {

        },

      }
    },
    computed: {



    },
    mounted() {
      let that = this;
      console.log(that.customFunctionInput);
      that.customFunctionInput.functionStartInput = `lambda(${that.itemData.conditionValue})`
      that.customFunctionInput.functionEndInput = `end(${that.itemData.conditionValue})`
    },
    destroyed() {},
    computed: {},
    methods: {
      resetCustomFunction() {
        let that = this;
        that.customFunctionInput.functionCodeInput = '';
      },
      checkComplete() {
         let that = this;
        if (that.customFunctionInput.functionCodeInput.length === 0) {
          this.$message.error("请输入自定义函数代码");
          return false;
        }
        return true
      },
      translationCustomFunction() {
        let that = this;
        let conditionValueSecond = that.itemData.conditionValue.substr(that.itemData.conditionValue.indexOf('.') + 1, that.itemData.conditionValue.length);
        // console.log('conditionValueSecond', conditionValueSecond);
        this.itemData.itemCode = `lambda(${conditionValueSecond}) -> ${that.customFunctionInput.functionCodeInput} end(${conditionValueSecond})`;
        this.itemData.itemDesc =
          `lambda(${this.itemData.conditionDesc}) -> ${that.customFunctionInput.functionCodeInput} end(${this.itemData.conditionDesc})`
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

  .funtion_content {
    width: 90%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 100px;
  }

  .funtion_content .lambda {
    width: 300px;
    margin-right: 10px;
  }

  .funtion_content .tip {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 20xp;
    font-weight: bold;
    font-family: '宋体';
  }

  .funtion_content .function_code {
    width: 400px;
    max-width: 400pxpx;

  }




  /* >>>.el-input--mini .el-input__inner {
    height: 36px;
    line-height: 36px;
  } */
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

  .radio-group {
    margin-left: 58px;
    margin: 20px;
  }

  .component_item_div {
    display: flex;
    flex-direction: column;
    width: 90%;
    margin-top: 10px;
  }

  .component_item_content {
    display: flex;
    width: 100%;
    align-items: center;
    margin-left: 10px;
  }
  .explain-input-style {
    width: 200px;
    color: #ff5500;
    resize:none;
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
