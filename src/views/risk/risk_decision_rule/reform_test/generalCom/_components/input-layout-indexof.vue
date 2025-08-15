<template>
  <div id="page_content">

    <!-- 下标为...的字符(indexof函数) -->
    <div class="indexof-operator">

      <el-input class="input_el" style="width: 200px;  padding-left: 10px; margin-right: 10px;" disabled
        v-model="itemData.conditionDesc" placeholder="请输入Int型常量">
      </el-input>

      <span class="tip" style="margin-right:10px">
        在
      </span>

      <!-- 左边输入选择 常量 变量 -->
      <el-dropdown trigger="click" @command="handleLeftInputType">
        <span class="el-dropdown-link variant-style">
          {{switchInputTypeName(indexofInput.leftInputType)}}
        </span>
        <i class="el-icon-arrow-down el-icon--right"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, i) in inputTypeList" :key="i" :command="item" :disabled='disabled'>{{item.label}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <!-- 左边输入选项 -->
      <div>
        <el-autocomplete v-if="indexofInput.leftInputType==='input'" class="input_el" v-model="indexofInput.leftValue"
          :fetch-suggestions="querySearch" :placeholder="placeholderText" @select="handleLeftSelect"
          @keyup.enter.native="handleLeftSelect" @input="leftValueInput($event)" clearable :disabled='disabled'
          style="width: 200px; margin-left: 10px;margin-right: 10px;">
        </el-autocomplete>

        <el-cascader v-else :options="conditionsListFilter" v-model="indexofInput.leftValueShow"
          :props="{ expandTrigger: 'hover'  }" @change="changeConditions" :disabled='disabled'
          style="width: 200px;margin-left: 10px;margin-right: 10px;" clearable>
        </el-cascader>

      </div>

      <span class="tip" style="margin-right:10px">
        的起始索引
      </span>

      <el-dropdown trigger="click" @command="handleOperatorInputType">
        <span class="el-dropdown-link variant-style">
          {{indexofInput.operatorSymbolValue==='=='?'<等于>':'<不等于>' }}
        </span>
        <i class="el-icon-arrow-down el-icon--right"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, i) in indexofTypeList" :key="i" :command="item" :disabled='disabled'>{{item.label}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-input class="input_el" v-model="indexofInput.intValue"
        style="width: 200px;  padding-left: 10px; margin-right: 10px;" placeholder="请输入Int型常量值"
        @input="intValueInput($event)" :disabled='disabled'>
      </el-input>



    </div>
    <!-- 提示 -->
    <div id="tipe">
      <div class="content">
        <span class="tips">使用说明：</span>
        <span class="explain">1、左表达式：条件选择的值</span>
        <span class="explain">2、操作符：判断 输入框1中的值 在左表达式中的起始索引值</span>
        <span class="explain">3、右表达式：等于/不等于 输入框2的中的值</span>
        <span class="explain"></span>
        <span class="tips">使用案例：</span>
        <span class="explain">案例1：企业类型中的字符 在 字符串 'ABCDEFG' 的起始下标为1</span>
        <div  class='explain-div-border'>

          <el-form ref="ruleForm" label-width="130px" class="custom-common--form">
            <el-row>
              <el-col :span="8">
                <el-form-item label="条件选择" prop="ruleName" label-width="100px">
                  <input class='explain-input-style-up' disabled value="企业类型" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="条件属性" prop="ruleCode" label-width="100px">
                  <input class='explain-input-style-up' disabled value="Edm_co.entType" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="数据类型" label-width="100px">
                  <input class='explain-input-style-up' disabled value="String--字符串" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6">
                <el-form-item label="操作符" label-width="100px">
                  <input class='explain-input-style-up' disabled value="函数型/下标为...的字符(indexOf函数)" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="5">
                <el-form-item label="" >
                  <input class='explain-input-style' disabled value="企业类型" />
                </el-form-item>
              </el-col>

              <el-col :span="1">
                <el-form-item label="<在>">
                </el-form-item>
              </el-col>


              <el-col :span="5">
                <el-form-item label="<常量>">
                  <input  class='explain-input-style' disabled value="ABCDEFG" />
                </el-form-item>
              </el-col>

              <el-col :span="1">
                <el-form-item label="<的起始索引>">
                </el-form-item>
              </el-col>

              <el-col :span="5">
                <el-form-item label="<等于>"  >
                  <input  class='explain-input-style' disabled value="1" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span class="explain">表达式：string.indexOf('ABCDEFG',Edm_co.entType) == 1</span>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    props: {
      cMeta: Object, //本页面模板json数据Layout对象
      cParentMeta: Object, //父页面模板json数据Layout对象
      cParentParams: Object, //父页面自定义参数与内置参数
      cParentScope: Object, //父页面每块区域业务数据
      conditionsListFilter: Object, //筛选后的条件选择项
      selectcConstant: Object, //常量填写选择项
      itemData: Object, //父类传过来的数据
      indexofInput: Object, //父类传过来的 indexof函数主要输入数据
      //选择的数据类型
      conditionDataType: {
        type: String,
        default: '',
      },
      //父组件的主动输入筛选方法
      querySearch: {
        type: Function,
        default: null
      },
      //父组件的关联选择转译方法
      getFormAmoutValidateInfo: {
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

    },
    data() {
      return {
        ruleForm: {

        },
        placeholderText: '',
        inputTypeList: [{
          label: "<常量>",
          value: "input"
        }, {
          label: "<变量>",
          value: "select"
        }, ],
        // startWith函数的选择项
        indexofTypeList: [{
          label: "<等于>",
          value: "=="
        }, {
          label: "<不等于>",
          value: "!="
        }, ],
      }
    },
    computed: {



    },
    mounted() {
      console.log('substrInput', this.substrInput);
      this.placeholderText = `请输入${this.itemData.conditionDataType}型常量`;
    },
    destroyed() {},
    computed: {},
    methods: {
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
      // 左边输入方式选择
      handleLeftInputType(command) {
        console.log('handleLeftInputType---command', command);
        this.indexofInput.leftInputType = command.value
      },
      //条件联合选择后激活
      changeConditions(val) {
        console.log('条件选择改变触发', val);
        let value = this.getFormAmoutValidateInfo(val) && this.getFormAmoutValidateInfo(val).value ? this
          .getFormAmoutValidateInfo(val).value : ''
        let desc = this.getFormAmoutValidateInfo(val) && this.getFormAmoutValidateInfo(val).label ? this
          .getFormAmoutValidateInfo(val).label : ''
        this.indexofInput.leftValue = value
        this.indexofInput.leftDesc = desc;
      },
      handleOperatorInputType(command) {
        console.log('handleOperatorInputType---command', command);
        this.indexofInput.operatorSymbolValue = command.value
      },


      //左边输入项输入事件
      leftValueInput(e) {
        let value = e;
        console.log('leftValueInput', e);
        if (this.itemData.conditionDataType === 'Int') {
          //一般情况下只能输入整数
          this.indexofInput.leftValue = value.replace(/\D/g, '')
        }
        if (this.itemData.conditionDataType === 'Decimal') {
          //只能输入数字不能输入小数点
          this.indexofInput.leftValue = value.replace(/[^\d.]/g, '').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        }
      },
      intValueInput(e) {
        let value = e;
        console.log('leftValueInput', e);
        this.indexofInput.intValue = value.replace(/\D/g, '');
      },

      handleLeftSelect(item) {
        console.log('handleLeftSelect主动输入被选择', item);
        this.indexofInput.leftInputValue = item.label;
      },
      leftInputType: 'input', //左边下拉选择 常量 变量
      leftValue: '',
      leftDesc: '',
      operatorSymbolValue: '==', //等于/不等于
      intValue: "", //数值型常量
      //重置输入选项
      resetIndexof() {
        this.indexofInput.leftInputType = 'input'
        this.indexofInput.leftValue = '';
         this.indexofInput.leftValueShow = '';
        this.indexofInput.leftDesc = '';
        this.indexofInput.operatorSymbolValue = '=='
        this.indexofInput.intValue = '';
      },
      //检查填写是否完成
      checkComplete() {
        if (this.indexofInput.leftValue === '' || this.indexofInput.intValue === '') {
          this.$message.error("有未填写项，请检查");
          return false;
        }
        return true
      },
      // 转译
      translationIndexof() {
        let leftValueTemp =  this.indexofInput.leftInputType ===
          'input' ? `'${this.indexofInput.leftValue}'` : this.indexofInput.leftValue;
        let leftDescTemp = this.indexofInput.leftInputType === 'input' ?  `'${this.indexofInput.leftValue}'` : this.indexofInput.leftDesc;
        this.itemData.itemCode =
          `string.indexOf(${leftValueTemp},${this.itemData.conditionValue}) ${this.indexofInput.operatorSymbolValue} ${this.indexofInput.intValue}`;
        this.itemData.itemDesc =
          `string.indexOf(${this.indexofInput.leftDesc !== '' ? this.indexofInput.leftDesc : leftDescTemp},${this.itemData.conditionDesc}) ${this.indexofInput.operatorSymbolValue === '==' ? '等于' : '不等于'} ${this.indexofInput.intValue}`;
      },


    },
  }
</script>

<style lang="css" scoped>
  #page_content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;

  }

  .indexof-operator {
    margin-top: 30px;
    margin-left: 100px;
    width: 90%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  /* .tip: {

    font-size: 18px;
    font-weight: bolder;
    padding-right: 10px;
    padding-left: 10px;
  } */

  .variant-style {
    color: #00aaff;
    font-weight: bold;
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
  .explain-input-style-up {
    width: 250px;
    color: #ff5500;
  }
  .explain-input-style {
    width: 110px;
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
