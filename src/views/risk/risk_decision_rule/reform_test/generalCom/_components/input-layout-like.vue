<template>
  <div id="page_content">

    <!-- 包含，不包含，开头是，开头不是，结尾是、结尾不是 -->
    <div class="like-operator">

      <!-- 左边输入选择 常量 变量 -->
      <div>

        <el-input class="input_el" style="width: 330px; margin-right: 10px;" disabled v-model="itemData.conditionDesc">
        </el-input>

        <!-- contains函数 -->
        <el-dropdown trigger="click" @command="handleOperatorInputType"
          v-if="itemData.operatorSymbolValue==='contains'">
          <span class="el-dropdown-link variant-style">
            {{likeInput.likeOperatorSymbolValue==='contains'?'<包含>':'<不包含>' }}
          </span>
          <i class="el-icon-arrow-down el-icon--right"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, i) in containsTypeList" :key="i" :command="item" :disabled="disabled">
              {{item.label}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- startWith函数 -->
        <el-dropdown trigger="click" @command="handleOperatorInputType"
          v-if="itemData.operatorSymbolValue==='startWith'">
          <span class="el-dropdown-link variant-style">
            {{likeInput.likeOperatorSymbolValue==='startWith'?'<以>':'<不以>' }}
          </span>
          <i class="el-icon-arrow-down el-icon--right"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, i) in startWithTypeList" :key="i" :command="item" :disabled="disabled">
              {{item.label}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- endWith函数 -->
        <el-dropdown trigger="click" @command="handleOperatorInputType" v-if="itemData.operatorSymbolValue==='endWith'">
          <span class="el-dropdown-link variant-style">
            {{likeInput.likeOperatorSymbolValue==='endWith'?'<以>':'<不以>' }}
          </span>
          <i class="el-icon-arrow-down el-icon--right"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, i) in endWithTypeList" :key="i" :command="item" :disabled="disabled">
              {{item.label}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>



        <el-dropdown trigger="click" @command="handleLeftInputType">
          <span class="el-dropdown-link variant-style">
            {{switchInputTypeName(likeInput.leftInputType)}}
          </span>
          <i class="el-icon-arrow-down el-icon--right"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, i) in inputTypeList" :key="i" :command="item" :disabled="disabled">
              {{item.label}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <!-- 左边输入选项 -->

        <el-autocomplete v-if="likeInput.leftInputType==='input'" class="input_el" v-model="likeInput.leftValue"
          :fetch-suggestions="querySearch" :placeholder="placeholderText" @select="handleLeftSelect"
          @keyup.enter.native="handleLeftSelect" @input="leftValueInput($event)" clearable :disabled="disabled"
          style="width: 350px; margin-left: 10px;margin-right: 10px;">
        </el-autocomplete>

        <el-cascader v-else :options="conditionsListFilter" v-model="likeInput.leftValue"
          :props="{ expandTrigger: 'hover'  }" @change="changeConditions" :disabled="disabled"
          style="width: 350px;margin-left: 10px;margin-right: 10px;" clearable>
        </el-cascader>

        <span class="el-dropdown-link variant-black-style"
          v-if="itemData.operatorSymbolValue==='endWith' || itemData.operatorSymbolValue==='startWith'">
          {{itemData.operatorSymbolValue==='startWith'?'开始':'结尾' }}
        </span>

      </div>
    </div>
    <!-- 提示 -->
    <div id="tipe" v-if="itemData.operatorSymbolValue==='contains'">
      <div class="content">
        <span class="tips">使用说明：</span>
        <span class="explain">1、左表达式：条件选择的值</span>
        <span class="explain">2、操作符：判断左表达式的值中是否包含输入框1中的值</span>
        <span class="explain">3、右表达式：包含/不包含 输入框1 中的值</span>
        <span class="explain"></span>
        <span class="tips">使用案例：</span>
        <span class="explain">案例1：企业类型中包含字符R（忽略大小写，即可以匹配字符r）</span>
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
                <el-form-item label="" prop="ruleType" label-width="100px">
                  <input class='explain-input-style' disabled value="企业类型" />
                </el-form-item>
              </el-col>

              <el-col :span="2">
                <el-form-item label="<包含>" prop="ruleType" label-width="100px">
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="<表达式>" prop="ruleType" label-width="100px">
                  <input style="margin-left:2px;" class='explain-input-style' disabled value="R" />
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </div>
        <span class="explain">表达式：string.containsIgnoreCase(Edm_co.entType,'R')</span>
      </div>
    </div>

    <div id="tipe" v-if="itemData.operatorSymbolValue==='startWith'">
      <div class="content">
        <span class="tips">使用说明：</span>
        <span class="explain">1、左表达式：条件选择的值</span>
        <span class="explain">2、操作符：判断左表达式的值中是否以 输入框1中的值 开头</span>
        <span class="explain">3、右表达式：以/不以 输入框1 中的值开头</span>
        <span class="tips">使用案例：</span>
        <span class="explain">案例1：企业类型以字符R开头</span>
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
                  <input class='explain-input-style' disabled value="函数型/以...开头(startWith函数)" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="" prop="ruleType" label-width="100px">
                  <input class='explain-input-style' disabled value="企业类型" />
                </el-form-item>
              </el-col>

              <el-col :span="2">
                <el-form-item label="<以>" prop="ruleType" label-width="100px">
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="<常量>" prop="ruleType" label-width="100px">
                  <input style="margin-left:2px;" class='explain-input-style' disabled value="R" />
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item label="开始" prop="ruleType" label-width="100px">
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

        </div>
        <span class="explain">表达式：string.startsWith(Edm_co.entType,'R')</span>
      </div>
    </div>

    <div id="tipe" v-if="itemData.operatorSymbolValue==='endWith'">
      <div class="content">
        <span class="tips">使用说明：</span>
        <span class="explain">1、左表达式：条件选择的值</span>
        <span class="explain">2、操作符：判断左表达式的值中是否以 输入框1中的值 结尾</span>
        <span class="explain">3、右表达式：以/不以 输入框1 中的值 结尾</span>
        <span class="tips">使用案例：</span>
        <span class="explain">案例1：企业类型以字符T结尾</span>
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
                  <input class='explain-input-style' disabled value="函数型/以...结尾(endWith函数)" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="" prop="ruleType" label-width="100px">
                  <input class='explain-input-style' disabled value="企业类型" />
                </el-form-item>
              </el-col>

              <el-col :span="2">
                <el-form-item label="<以>" prop="ruleType" label-width="100px">
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="<常量>" prop="ruleType" label-width="100px">
                  <input style="margin-left:2px;" class='explain-input-style' disabled value="R" />
                </el-form-item>
              </el-col>
              <el-col :span="2">
                <el-form-item label="结尾" prop="ruleType" label-width="100px">
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span class="explain">表达式：string.endsWith(Edm_co.entType,'T')</span>
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
      itemData: Object, //父类传过来的数据
      likeInput: Object, //父类传过来的普通场景主要输入数据
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

    },
    data() {
      return {
        ruleForm: {

        },
        placeholderText: '',
        // contains函数的选择项
        containsTypeList: [{
          label: "<包含>",
          value: "contains"
        }, {
          label: "<不包含>",
          value: "uncontains"
        }, ],

        // startWith函数的选择项
        startWithTypeList: [{
          label: "<以>",
          value: "startWith"
        }, {
          label: "<不以>",
          value: "unstartWith"
        }, ],

        // endWith函数的选择项
        endWithTypeList: [{
          label: "<以>",
          value: "endWith"
        }, {
          label: "<不以>",
          value: "unendWith"
        }, ],

        //常量变量的选择项
        inputTypeList: [{
          label: "<常量>",
          value: "input"
        }, {
          label: "<变量>",
          value: "select"
        }, ],
      }
    },
    computed: {



    },
    mounted() {
      // let that = this;
      // if (this.likeInput.likeOperatorSymbolValue === '') {
      //   that.likeInput.likeOperatorSymbolValue = that.itemData.operatorSymbolValue;
      // }
      // console.log('like---item', this.likeInput);
      // console.log('like---big', this.itemData);

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
      handleOperatorInputType(command) {
        console.log('handleOperatorInputType---command', command);
        this.likeInput.likeOperatorSymbolValue = command.value
      },
      // 左边输入方式选择
      handleLeftInputType(command) {
        console.log('handleLeftInputType---command', command);
        this.likeInput.leftInputType = command.value
      },
      //条件联合选择后激活
      changeConditions(val) {
        let value = this.getFormAmoutValidateInfo(val) && this.getFormAmoutValidateInfo(val).value ? this
          .getFormAmoutValidateInfo(val).value : ''
        let desc = this.getFormAmoutValidateInfo(val) && this.getFormAmoutValidateInfo(val).label ? this
          .getFormAmoutValidateInfo(val).label : ''
        this.likeInput.leftValue = value;
        this.likeInput.leftDesc = desc;
      },

      //左边输入项输入事件
      //左边输入项输入事件
      leftValueInput(e) {
        let value = e;
        console.log('leftValueInput', e);
        if (this.itemData.conditionDataType === 'Int') {
          //一般情况下只能输入整数
          this.likeInput.leftValue = value.replace(/\D/g, '')
        }
        if (this.itemData.conditionDataType === 'Decimal') {
          //只能输入数字不能输入小数点
          this.likeInput.leftValue = value.replace(/[^\d.]/g, '').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        }
      },
      handleLeftSelect(item) {
        console.log('handleLeftSelect--主动输入被选择', item);
        this.likeInput.leftValue = item.label;
      },
      //重置输入选项
      resetLike() {
        this.likeInput.leftInputType = 'input'
        this.likeInput.leftValue = '';
        this.likeInput.leftValueShow = '';
        this.likeInput.leftDesc = '';
        this.likeInput.likeOperatorSymbolValue = "";
      },
      checkComplete() {
        if (this.likeInput.leftValue === '') {
          this.$message.error("请填写相关项");
          return false;
        }
        return true
      },
      translationLike() {
        let leftValueTemp = this.likeInput.leftInputType === 'input' ? `'${this.likeInput.leftValue}'` : this.likeInput
          .leftValue;
        let leftDescTemp = this.likeInput.leftInputType === 'input' ? this.likeInput.leftValue : this.likeInput
          .leftDesc;
        switch (this.likeInput.likeOperatorSymbolValue) {
          //包含
          case 'contains':
            this.itemData.itemCode =
              `string.containsIgnoreCase(${this.itemData.conditionValue},${leftValueTemp})`;
            this.itemData.itemDesc =
              `${this.itemData.conditionDesc} 包含 ${leftDescTemp}`
            break;
            //不包含
          case 'uncontains':
            this.itemData.itemCode =
              `!string.containsIgnoreCase(${this.itemData.conditionValue},${leftValueTemp})`;
            this.itemData.itemDesc =
              `${this.itemData.conditionDesc} 不包含 ${leftDescTemp}`
            break;
            //开头是
          case 'startWith':
            this.itemData.itemCode =
              `string.startsWith(${this.itemData.conditionValue},${leftValueTemp})`;
            this.itemData.itemDesc =
              `${this.itemData.conditionDesc} 开头是 ${leftDescTemp}`
            break;
            //开头不是
          case 'unstartWith':
            this.itemData.itemCode =
              `!string.startsWith(${this.itemData.conditionValue},${leftValueTemp})`;
            this.itemData.itemDesc =
              `${this.itemData.conditionDesc} 开头不是 ${leftDescTemp}`
            break;
            //结尾是
          case 'endWith':
            this.itemData.itemCode =
              `string.endsWith(${this.itemData.conditionValue},${leftValueTemp})`;
            this.itemData.itemDesc =
              `${this.itemData.conditionDesc} 结尾是 ${leftDescTemp}`
            break;
            //结尾不是
          case 'unendWith':
            this.itemData.itemCode =
              `!string.endsWith(${this.itemData.conditionValue},${leftValueTemp})`;
            this.itemData.itemDesc =
              `${this.itemData.conditionDesc} 结尾是 ${leftDescTemp}`
            break;
        }
      }
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

  .like-operator {
    margin-top: 20px;
    margin-left: 100px;
    width: 90%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  /* .tip: {
    flex: 1;
    font-size: 18px;
    font-weight: bolder;
  } */

  .variant-style {
    color: #00aaff;
    font-weight: bold;
    margin-left: 10px;
    margin-right: 10px;
  }

  .variant-black-style {
    margin-left: 10px;
    margin-right: 10px;
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
