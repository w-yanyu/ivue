<template>
  <div id="page_content">
    <!-- 在。。。于。。。之间  -->
    <div class="between-operator">
      <el-dropdown trigger="click" @command="handleOperatorType" style="margin-left: 10px;margin-right: 10px;">
        <el-button type="primary" size="mini"   :disabled="disabled" >
          {{switchOperatorName(betweenInput.betweenOperatorSymbolValue)}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, i) in operatorSymbolBetween" :key="i" :command="item">{{item.label}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <div class="tip padding_20">
        在
      </div>

      <!-- 左边输入选择 常量 变量 -->
      <div>
        <el-dropdown trigger="click" @command="handleLeftInputType" :disabled="disabled">

          <span class="el-dropdown-link variant-style">
            {{switchInputTypeName(betweenInput.leftInputType)}}
          </span>
          <i class="el-icon-arrow-down el-icon--right"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, i) in inputTypeList" :key="i" :command="item" :disabled="disabled">{{item.label}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 左边输入选项 -->

        <el-autocomplete v-if="betweenInput.leftInputType==='input'" class="input_el" v-model="betweenInput.leftValue"
          :fetch-suggestions="querySearch" :placeholder="placeholderText" @select="handleLeftSelect"
          @keyup.enter.native="handleLeftSelect" @input="leftValueInput($event)" clearable :disabled="disabled"
          style="width: 250px; margin-left: 10px;margin-right: 10px;">
        </el-autocomplete>


        <el-cascader v-else  :options="conditionsListFilter" v-model="betweenInput.leftValueShow" :disabled="disabled"
          :props="{ expandTrigger: 'hover'  }" @change="changeConditions($event,'left')"
          style="width: 250px;margin-left: 10px;margin-right: 10px;" clearable>
        </el-cascader>

      </div>

      <div class="tip padding_20"  >
        与
      </div>

      <!-- 右边输入选项 常量 变量 -->
      <div>
        <el-dropdown trigger="click" @command="handleRightInputType" >
          <!-- <el-button size="mini" type="info" plain>
                    {{switchInputTypeName(rightInputType)}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button> -->
          <span class="el-dropdown-link variant-style">
            {{switchInputTypeName(betweenInput.rightInputType)}}
          </span>
          <i class="el-icon-arrow-down el-icon--right"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, i) in inputTypeList" :key="i" :command="item" :disabled="disabled">{{item.label}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 右边输入项 -->
        <!-- <el-input class="input_el" v-if="betweenInput.rightInputType==='input'" placeholder="请输入常量值"
            style="width: max-content;margin-left: 10px; margin-right: 10px;" @input="rightValueInput($event)"
            v-model="betweenInput.rightValue">
          </el-input> -->
        <el-autocomplete v-if="betweenInput.rightInputType==='input'" class="input_el" v-model="betweenInput.rightValue"
          :fetch-suggestions="querySearch" :placeholder="placeholderText" @select="handleRightSelect"
          @keyup.enter.native="handleRightSelect" @input="rightValueInput($event)" clearable :disabled="disabled"
          style="width: 250px;margin-left: 10px; margin-right: 10px;"></el-autocomplete>

        <el-cascader v-else  :options="conditionsListFilter" v-model="betweenInput.rightValueShow"
          :props="{ expandTrigger: 'hover'  }" @change="changeConditions($event,'right')" :disabled="disabled"
          style="width: 250px;margin-left: 10px;margin-right: 10px;" clearable>
        </el-cascader>

      </div>

      <div class="tip padding_20">
        之间
      </div>
    </div>

    <!-- 提示 -->
    <div id="tipe">
      <div class="content">
        <span class="tips">使用说明：</span>
        <span class="explain">1、左表达式:条件选择的值</span>
        <span class="explain">2、中间操作:在...区间内</span>
        <span class="explain">3、右表达式:两个输入框中的值</span>
        <span class="explain"></span>
        <span class="tips">使用案例：</span>
        <span class="explain">案例1：年龄在18到60岁之间(包含18,不包含60)</span>
        <div class='explain-div-border'>

          <el-form ref="ruleForm" label-width="130px" class="custom-common--form">
            <el-row>
              <el-col :span="8">
                <el-form-item label="条件选择" prop="ruleName" label-width="100px">
                  <input class='explain-input-style' disabled value="年龄" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="条件属性" prop="ruleCode" label-width="100px">
                  <input class='explain-input-style' disabled value="cust.age" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="数据类型" prop="ruleType" label-width="100px">
                  <input class='explain-input-style' disabled value="Int--整数" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="操作符" prop="ruleType" label-width="100px">
                <input class='explain-input-style' disabled  value="比较型/在...区间" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6">
                <el-form-item label="" prop="ruleType" >
                  <input class='explain-input-style' disabled value="左开右闭型:[a,b)" />
                </el-form-item>
              </el-col>

              <el-col :span="1">
                <el-form-item label="<在>" prop="ruleType" >
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="<常量>" prop="ruleType" >
                  <input style="margin-left:2px;" class='explain-input-style' disabled value="18" />
                </el-form-item>
              </el-col>

              <el-col :span="1">
                <el-form-item label="<与>" prop="ruleType" >
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="<常量>" prop="ruleType" >
                  <input style="margin-left:2px;" class='explain-input-style' disabled value="60" />
                </el-form-item>
              </el-col>



              <el-col :span="1">
                <el-form-item label="<之间>" prop="ruleType" >
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

        </div>
        <span class="explain">表达式：18<= cust.age<60</span>
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
      betweenInput: Object, //父类传过来的在。。。区间场景主要输入数据
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
      disabled: {
        type: Boolean,
        default: false,
      },

    },
    components: {

    },
    data() {
      return {
        ruleForm: {

        },
        placeholderText: "",
        //区间操作符
        operatorSymbolBetween: [{
          label: " 左开右开型:(a,b)",
          value: "()"
        }, {
          label: "左开右闭型:(a,b]",
          value: "(]"
        }, {
          label: "左闭右开型:[a,b)",
          value: "[)"
        }, {
          label: "左闭右闭型:[a,b]",
          value: "[]"
        }, ],
        inputTypeList: [{
          label: "<常量>",
          value: "input"
        }, {
          label: "<变量>",
          value: "select"
        }, ]
      }
    },
    computed: {



    },
    mounted() {
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
      switchOperatorName(type) {
        switch (type) {
          case '()':
            return '左开右开型:(a,b)'
            break;
          case '(]':
            return '左开右闭型:(a,b]'
            break;
          case '[)':
            return ' 左闭右开型:[a,b)'
            break;
          case '[]':
            return '左闭右闭型:[a,b]'
            break;
        }
      },
      //区间操作符
      handleOperatorType(command) {
        console.log('handleOperatorType---command', command);
        this.betweenInput.betweenOperatorSymbolValue = command.value
      },
      // 左边输入方式选择
      handleLeftInputType(command) {
        console.log('handleLeftInputType---command', command);
        this.betweenInput.leftInputType = command.value
        if (command.value === 'select') {
          this.betweenInput.leftValue = '';
        }
      },
      // 右边输入方式选择
      handleRightInputType(command) {
        console.log('handleRightInputType---command', command);
        this.betweenInput.rightInputType = command.value
        if (command.value === 'select') {
          this.betweenInput.rightValue = '';
        }
      },
      //条件联合选择后激活
      changeConditions(val, type) {
        console.log('条件选择改变触发', val, type);
        let value = this.getFormAmoutValidateInfo(val) && this.getFormAmoutValidateInfo(val).value ? this
          .getFormAmoutValidateInfo(val).value : ''
        let desc = this.getFormAmoutValidateInfo(val) && this.getFormAmoutValidateInfo(val).label ? this
          .getFormAmoutValidateInfo(val).label : ''
        let dataType = this.getFormAmoutValidateInfo(val) && this.getFormAmoutValidateInfo(val).dataType
          ? this
          .getFormAmoutValidateInfo(val).dataType : ''
        if (type === 'left') { //左边选择赋值
          this.betweenInput.leftValue = value;
          this.betweenInput.leftDesc = desc;
          this.betweenInput.leftDataType = dataType;
        } else { //右边选择赋值
          this.betweenInput.rightValue = value;
          this.betweenInput.rightDesc = desc;
          this.betweenInput.rightDataType = dataType;
        }
        console.log(' this.betweenInput', this.betweenInput);
      },

      //左边输入项输入事件
      leftValueInput(e) {
        let value = e;
        console.log('leftValueInput', e);
        if (this.itemData.conditionDataType === 'Int') {
          //一般情况下只能输入整数
          this.betweenInput.leftValue = value.replace(/\D/g, '')
        }
        if (this.itemData.conditionDataType === 'Decimal') {
          //只能输入数字不能输入小数点 
          //暂时注释
          // this.betweenInput.leftValue = value.replace(/[^\d.]/g, '').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        }
      },
      handleLeftSelect(item) {
        console.log('handleLeftSelect--主动输入被选择', item);
        this.betweenInput.leftValue = item.label;
      },
      //右边输入项输入事件
      rightValueInput(e) {
        console.log('rightValueInput', e);
        let value = e;
        if (this.itemData.conditionDataType === 'Int') {
          //一般情况下只能输入整数
          this.betweenInput.rightValue = value.replace(/\D/g, '')
        }
        if (this.itemData.conditionDataType === 'Decimal') {
          //只能输入数字不能输入小数点
          //暂时注释
          // this.betweenInput.rightValue = value.replace(/[^\d.]/g, '').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        }
      },
      handleRightSelect(item) {
        console.log('handleRightSelect--主动输入被选择', item);
        this.betweenInput.rightValue = item.label;
      },
      //重置输入选项
      resetBetween() {
        this.betweenInput.leftInputType = 'input'
        this.betweenInput.leftValue = '';
        this.betweenInput.leftValueShow = '';
        this.betweenInput.leftDesc = '';
        this.betweenInput.rightInputType = 'input'
        this.betweenInput.rightValue = '';
         this.betweenInput.rightValueShow = '';
        this.betweenInput.rightDesc = '';
        this.betweenInput.betweenOperatorSymbolValue = '()' //区间操作符
      },
      //检查填写是否完成
      checkComplete() {
        if (this.betweenInput.leftValue === '' || this.betweenInput.rightValue === '') {
          this.$message.error("有未填写项，请检查");
          return false;
        }
        if (this.itemData.conditionDataType === 'Int' && this.betweenInput.leftInputType === 'input' && this.betweenInput.rightInputType === 'input' && parseInt(this.betweenInput.leftValue) >= parseInt(this.betweenInput.rightValue)){
          this.$message.error("左输入框值不能设置大于或等于右输入框值");
          return false;
        }
        if (this.itemData.conditionDataType === 'Decimal' && this.betweenInput.leftInputType === 'input' && this.betweenInput.rightInputType === 'input' && parseFloat(this.betweenInput.leftValue) >= parseFloat(this.betweenInput.rightValue)){
          this.$message.error("左输入框值不能设置大于或等于右输入框值");
          return false;
        }
        return true
      },
      // 转译
      translationBetween() {
        let leftValueTemp = this.itemData.conditionDataType === 'String' && this.betweenInput.leftInputType ===
          'input' ? `'${this.betweenInput.leftValue}'` : this.betweenInput.leftValue;
        let leftDescTemp = this.betweenInput.leftInputType === 'select' ? this.betweenInput.leftDesc : leftValueTemp;

        let rightValueTemp = this.itemData.conditionDataType === 'String' && this.betweenInput.rightInputType ===
          'input' ? `'${this.betweenInput.rightValue}'` : this.betweenInput.rightValue;
        let rightDescTemp = this.betweenInput.rightInputType === 'select' ? this.betweenInput.rightDesc : rightValueTemp;
        let interval = this.analysisInterval();
        this.itemData.itemCode =
          `${this.itemData.conditionValue}${interval.left}${leftValueTemp}&&${this.itemData.conditionValue}${interval.right}${rightValueTemp}`

        this.itemData.itemDesc =
          `${this.itemData.conditionDesc}${interval.leftDesc}${leftDescTemp} 并且 ${this.itemData.conditionDesc}${interval.rightDesc}${rightDescTemp}`;
      },
      //解析区间符号
      analysisInterval() {
        switch (this.betweenInput.betweenOperatorSymbolValue) {
          case '()':
            return {
              left: '>',
                leftDesc: '大于',
                right: '<',
                rightDesc: '小于'
            }
            case '[)':
              return {
                left: '>=',
                  leftDesc: '大于等于',
                  right: '<',
                  rightDesc: '小于'
              }
              case '(]':
                return {
                  left: '>',
                    leftDesc: '大于',
                    right: '<=',
                    rightDesc: '小于等于'
                }

                case '[]':
                  return {
                    left: '>=',
                      leftDesc: '大于等于',
                      right: '<=',
                      rightDesc: '小于等于'
                  }
        }
      },

    },
  }
</script>

<style lang="css" scoped>
  #page_content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

  }

  .between-operator {
    padding-left: 90px;
    margin-top: 15px;
    width: 90%;
    display: flex;
  }

  .padding_20 {
    margin-left: 10px;
    margin-right: 20px;
    margin-top: 8px ;
  }

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
    flex-direction: column
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
