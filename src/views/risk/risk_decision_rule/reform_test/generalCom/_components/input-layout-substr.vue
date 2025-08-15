<template>
  <div id="page_content">

    <!-- 从...切割到...(substr函数) -->
    <div class="substr-operator">
      <el-input class="input_el" style="width: 200px; margin-right: 10px;" disabled v-model="itemData.conditionDesc">
      </el-input>

      <span class="tip">
        从开始下标为
      </span>

      <el-input class="input_el  " v-model="substrInput.startIndex" placeholder="输入Int常量值"
        style=" width: 100px;margin-left: 10px;margin-right: 10px;" @input="startIndexValueInput($event)"></el-input>

      <span class="tip">
        切割到结束下标为
      </span>

      <el-input class="input_el " v-model="substrInput.slicNum" placeholder="输入Int常量值"
        style=" width: 100px;margin-left: 10px;margin-right: 10px;" @input="slicNumValueInput($event)">
      </el-input>

      <span class="tip">
        之前&nbsp;
      </span>

      <el-dropdown trigger="click" @command="handleOperatorInputType">
        <span class="el-dropdown-link variant-style">
          {{substrInput.substrOperatorSymbolValue==='=='?'<结果等于>':'<结果不等于>' }}
        </span>
        <i class="el-icon-arrow-down el-icon--right"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, i) in substrTypeList" :key="i" :command="item">{{item.label}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-input class="input_el" v-model="substrInput.inputStr"
        style="width: 200px;   margin-left: 10px;margin-right: 10px;" placeholder="输入要匹配的字符串">
      </el-input>



    </div>
    <!-- 提示 -->
    <div id="tipe">
      <div class="content">
        <span class="tips">使用说明：</span>
        <span class="explain">1、左表达式：条件选择的值</span>
        <span class="explain">2、操作符：对左表达式的值从 输入框1 开始切割 n(输入框2中填写)位，判断最终结果是否等于 输入框3 中的值</span>
        <span class="explain">3、右表达式：等于/不等于 输入框3中的值</span>
        <span class="tips">使用案例：</span>
        <span class="explain">1)、案例1：从企业类型的下标为0开始切割到下标为2之前(即不包含下标为2)的字符，得到的结果等于字符RT</span>
        <div class='explain-div-border'>
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
                  <input class='explain-input-style-up' disabled value="函数型/从...切割到...(substr函数)" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="5">
                <el-form-item label="">
                  <input class='explain-input-style' disabled value="企业类型" />
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="<从开始下标为>">
                  <input  class='explain-input-style' disabled value="0" />
                </el-form-item>
              </el-col>

              <el-col :span="5">
                <el-form-item label="<切割到结束下标为>"  label-width="150px">
                  <input  class='explain-input-style' disabled value="2" />
                </el-form-item>
              </el-col>

              <el-col :span="5">
                <el-form-item label="<结果等于>">
                  <input  class='explain-input-style' disabled value="RT" />
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>

        </div>
        <span class="explain">表达式：string.substring(Edm_co.entType,0,2) == 'RT'</span>
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
      substrInput: Object, //父类传过来的substr函数主要输入数据
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

    },
    components: {

    },
    data() {
      return {
        ruleForm: {

        },
        placeholderText: '',
        // startWith函数的选择项
        substrTypeList: [{
          label: "<结果等于>",
          value: "=="
        }, {
          label: "<结果不等于>",
          value: "!="
        }, ],
      }
    },
    computed: {



    },
    mounted() {
      console.log('substrInput', this.substrInput);
      this.placeholderText = `请输入${this.itemData.conditionDataType}类型常量`;
    },
    destroyed() {},
    computed: {},
    methods: {

      handleOperatorInputType(command) {
        console.log('handleOperatorInputType---command', command);
        this.substrInput.substrOperatorSymbolValue = command.value
      },


      startIndexValueInput(e) {
        let value = e;
        console.log('startIndexValueInput', e);
        //一般情况下只能输入整数
        this.substrInput.startIndex = value.replace(/\D/g, '')
      },

      slicNumValueInput(e) {
        let value = e;
        console.log('slicNumValueInput', e);
        //一般情况下只能输入整数
        this.substrInput.slicNum = value.replace(/\D/g, '')
      },



      //重置输入选项
      resetSubstr() {
        this.substrInput.startIndex = '';
        this.substrInput.slicNum = '';
        this.substrInput.substrOperatorSymbolValue = '==';
        this.substrInput.inputStr = '';
      },
      //检查填写是否完成
      checkComplete() {
        if (this.substrInput.startIndex === '' || this.substrInput.slicNum === '' || this.substrInput.inputStr === '') {
          this.$message.error("有未填写项，请检查");
          return false;
        }
        return true
      },
      // 转译
      translationSubstr() {
        this.itemData.itemCode =
          `string.substring(${this.itemData.conditionValue},${this.substrInput.startIndex},${this.substrInput.slicNum}) ${this.substrInput.substrOperatorSymbolValue} '${this.substrInput.inputStr}'`;
        this.itemData.itemDesc =
          `string.substring(${this.itemData.conditionDesc},${this.substrInput.startIndex},${this.substrInput.slicNum}) ${this.substrInput.substrOperatorSymbolValue === '==' ? '结果等于' : '结果不等于'} '${this.substrInput.inputStr}'`;
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

  .substr-operator {
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
    margin-right: 10px;
    margin-left: 10px;
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
    width: 200px;
    color: #ff5500;
  }
  .explain-input-style {
    width: 100px;
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
