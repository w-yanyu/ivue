<template>
  <div id="page_content">

    <!-- 长度为...(length函数) -->
    <div class="length-operator">

      <el-input class="input_el" style="width: 200px;  margin-left: 10px;margin-right: 10px;" disabled
        v-model="itemData.conditionDesc">
      </el-input>

      <span class="tip">
        的长度
      </span>

      <el-dropdown trigger="click" @command="handleOperatorInputType">
        <span class="el-dropdown-link variant-style">
          {{lengthInput.operatorSymbolValue==='=='?'<等于>':'<不等于>' }}
        </span>
        <i class="el-icon-arrow-down el-icon--right"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, i) in indexofTypeList" :key="i" :command="item" :disabled='disabled'>
            {{item.label}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-input class="input_el" v-model="lengthInput.lengthValue" placeholder="请输入Int型常量"
        style="width: 200px;  margin-left: 10px;margin-right: 10px;" @input="lengthValueInput($event)"
        :disabled='disabled'>
      </el-input>



    </div>
    <!-- 提示 -->
    <div id="tipe">
      <div class="content">
        <span class="tips">使用说明：</span>
        <span class="explain">1、左表达式：条件选择的值</span>
        <span class="explain">2、操作符：判断左表达式中值的字符长度个数</span>
        <span class="explain">3、右表达式：等于/不等于 输入框1中的值</span>
        <span class="explain"></span>
        <span class="tips">使用案例：</span>
        <span class="explain">案例1：企业类型的长度等于1(即企业类型的字符等于1)</span>
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
                <el-form-item label="数据类型" label-width="100px">
                  <input class='explain-input-style' disabled value="String--字符串" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="操作符" label-width="100px">
                  <input class='explain-input-style' disabled value="函数型/长度为...(length函数)" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="7">
                <el-form-item label="">
                  <input class='explain-input-style' disabled value="企业类型" />
                </el-form-item>
              </el-col>

              <el-col :span="2">
                <el-form-item label="<的长度>">
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="<等于>">
                  <input style="margin-left:2px;" class='explain-input-style' disabled value="1" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <span class="explain">表达式：string.length(Edm_co.entType) == 1</span>
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
      lengthInput: Object, //父类传过来的 lengthInput函数主要输入数据
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
    mounted() {},
    destroyed() {},
    computed: {},
    methods: {

      handleOperatorInputType(command) {
        console.log('handleOperatorInputType---command', command);
        this.lengthInput.operatorSymbolValue = command.value
      },


      lengthValueInput(e) {
        let value = e;
        console.log('leftValueInput', e);
        this.lengthInput.lengthValue = value.replace(/\D/g, '');
        if (parseInt(this.lengthInput.lengthValue) < 1){
            this.$message.error("请填写大于0的整数");
          this.lengthInput.lengthValue = 1
        }
      },
      //重置输入选项
      resetLength() {
        this.lengthInput.lengthValue = ''
        this.lengthInput.operatorSymbolValue = '=='
      },
      //检查填写是否完成
      checkComplete() {
        if (this.lengthInput.lengthValue === '') {
          this.$message.error("有未填写项，请检查");
          return false;
        }
        return true
      },
      // 转译
      translationLength() {
        this.itemData.itemCode =
          `string.length(${this.itemData.conditionValue}) ${this.lengthInput.operatorSymbolValue} ${this.lengthInput.lengthValue}`;
        this.itemData.itemDesc =
          `string.length(${this.itemData.conditionDesc})的长度 ${this.lengthInput.operatorSymbolValue === '==' ? '等于' : '不等于'} ${this.lengthInput.lengthValue}`;
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

  .length-operator {
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
