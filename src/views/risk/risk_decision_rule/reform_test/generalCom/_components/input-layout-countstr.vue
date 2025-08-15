<template>
  <div id="page_content">

    <!-- 统计字符个数(countstr函数) -->
    <div class="countstr-operator">

      <el-input class="input_el" style="width: 200px; margin-left: 10px; margin-right: 10px;" disabled
        v-model="itemData.conditionDesc">
      </el-input>

      <span class="tip">
        中
      </span>

      <el-input class="input_el" v-model="countstrInput.strValue" placeholder="请输入字符串常量值"
        style="width: 200px;margin-left: 10px; margin-right: 10px;"  :disabled='disabled'>
      </el-input>

      <span class="tip">
        的个数
      </span>

      <el-dropdown trigger="click" @command="handleOperatorInputType">
        <span class="el-dropdown-link variant-style">
          {{countstrInput.operatorSymbolValue==='=='?'<等于>':'<不等于>' }}
        </span>
        <i class="el-icon-arrow-down el-icon--right"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item, i) in indexofTypeList" :key="i" :command="item"  :disabled='disabled'>{{item.label}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <el-input class="input_el" v-model="countstrInput.intValue" placeholder="请输入Int型常量"
        style="width: 200px;margin-left: 10px; margin-right: 10px;" @input="intValueInput($event)"  :disabled='disabled'>
      </el-input>


    </div>
    <!-- 提示 -->
    <div id="tipe">
      <div class="content">
        <span class="tips">使用说明：</span>
        <span class="explain">1、左表达式：条件选择框中的值</span>
        <span class="explain">2、操作符：统计左表达式值中 输入框1 的字符个数</span>
        <span class="explain">3、右表达式：等于/不等于 输入框2 中的值</span>
        <span class="explain"></span>
        <span class="tips">使用案例：</span>
        <span class="explain">案例1：企业类型中字符R的个数等于1</span>
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
                <el-form-item label="数据类型"   label-width="100px">
                  <input class='explain-input-style' disabled value="String--字符串" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="操作符"   label-width="100px">
                <input class='explain-input-style' disabled  value="函数型/统计字符个数(countstr函数)" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="6">
                <el-form-item label=""   >
                  <input class='explain-input-style' disabled value="企业类型" />
                </el-form-item>
              </el-col>



              <el-col :span="7">
                <el-form-item label="<中>"   >
                  <input style="margin-left:2px;" class='explain-input-style' disabled value="R" />
                </el-form-item>
              </el-col>

              <el-col :span="2">
                <el-form-item label="<的个数>"   >
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="<等于>"   >
                  <input style="margin-left:2px;" class='explain-input-style' disabled value="1" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

        </div>
        <span class="explain">表达式：countstr(Edm_co.entType,'R') == 1</span>
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
      countstrInput: Object, //父类传过来的 countstrInput函数主要输入数据
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
        this.countstrInput.operatorSymbolValue = command.value
      },


      //左边输入项输入事件
      intValueInput(e) {
        let value = e;
        console.log('leftValueInput', e);
        this.countstrInput.intValue = value.replace(/\D/g, '');
      },

      //重置输入选项
      resetCountstr() {
        this.countstrInput.strValue = '';
        this.countstrInput.intValue = '';
        this.countstrInput.operatorSymbolValue = '==';
      },
      //检查填写是否完成
      checkComplete() {
        if (this.countstrInput.strValue === '' ||  this.countstrInput.intValue === '') {
          this.$message.error("有未填写项，请检查");
          return false;
        }
        return true
      },
      // 转译
      translationCountstr() {
        this.itemData.itemCode =
        `countstr(${this.itemData.conditionValue},'${this.countstrInput.strValue}') ${this.countstrInput.operatorSymbolValue} ${this.countstrInput.intValue}`;

        this.itemData.itemDesc =
         `countstr(${this.itemData.conditionDesc})中 字符串'${this.countstrInput.strValue}' 的个数 ${this.countstrInput.operatorSymbolValue === '==' ? '等于' : '不等于'} ${this.countstrInput.intValue}`;
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

  .countstr-operator {
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
