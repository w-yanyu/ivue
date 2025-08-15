<template>
  <div id="page_content">

    <!-- 大于。。。的。。。次方 -->
    <div class="pow-operator">

      <span class="tip">
        大于
      </span>

      <!-- 左边输入选择 常量 变量 -->
      <div>
        <!-- 左边输入选项 -->
        <!--  <el-input class="input_el" placeholder="请输入常量值"
          style="width: max-content; margin-left: 10px;margin-right: 10px;" @input="leftValueInput($event)"
          v-model="itemData.leftValue">
        </el-input> -->

        <el-autocomplete class="input_el" v-model="itemData.leftValue" :fetch-suggestions="querySearch"
          placeholder="请输入常量值" @select="handleLeftSelect" @keyup.enter.native="handleLeftSelect"
          style="width: max-content; margin-left: 10px;margin-right: 10px;" @input="leftValueInput($event)">
        </el-autocomplete>
      </div>




      <span class="tip">
        的
      </span>

      <!-- 右边输入选项 常量 变量 -->
      <div>


        <!-- 右边输入项 -->
        <el-input class="input_el" placeholder="请输入常量值"
          style="width: max-content;margin-left: 10px; margin-right: 10px;" @input="rightValueInput($event)"
          v-model="itemData.rightValue">
        </el-input>

      </div>

      <span class="tip">
        次方
      </span>

    </div>
    <!-- 提示 -->
    <div id="tipe">
      <div class="content">
        <span class="tips">使用说明：</span>
        <span class="explain">1、DAISDISADJSAOIOIJOIJJDOJSADSADJJSADDSASJDAD</span>
        <span class="explain">2、SAOIJDOIASDOISJSAOJDSAASJOADSOIJDSAJDSAOISAJDIDSA</span>
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

        inputTypeList: [{
          label: "<常量>",
          value: "input"
        }]
      }
    },
    computed: {



    },
    mounted() {},
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
        this.itemData.leftInputType = command.value
      },
      // 右边输入方式选择
      handleRightInputType(command) {
        console.log('handleRightInputType---command', command);
        this.itemData.rightInputType = command.value
      },
      //条件联合选择后激活
      changeConditions(val, type) {
        console.log('条件选择改变触发', val, type);
        let value = this.getFormAmoutValidateInfo(val) && this.getFormAmoutValidateInfo(val).value ? this
          .getFormAmoutValidateInfo(val).value : ''
        let desc = this.getFormAmoutValidateInfo(val) && this.getFormAmoutValidateInfo(val).label ? this
          .getFormAmoutValidateInfo(val).label : ''
        if (type === 'left') { //左边选择赋值
          this.itemData.leftValue = value;
          this.itemData.leftDesc = desc;
        } else { //右边选择赋值
          this.itemData.rightValue = value;
          this.itemData.rightDesc = desc;
        }
        console.log(' this.itemData', this.itemData);
      },

      //左边输入项输入事件
      leftValueInput(e) {
        let value = e;
        console.log('leftValueInput', e);
        if (this.itemData.conditionDataType === 'Int') {
          //一般情况下只能输入整数
          this.itemData.leftValue = value.replace(/\D/g, '')
        }
        if (this.itemData.conditionDataType === 'Decimal') {
          //只能输入数字不能输入小数点
          this.itemData.leftValue = value.replace(/[^\d.]/g, '').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3');
        }
      },
      handleLeftSelect(item) {
        console.log('handleLeftSelect--主动输入被选择', item);
        this.itemData.leftValue = item.label;
      },
      //右边输入项输入事件
      rightValueInput(e) {
        console.log('rightValueInput', e);
        let value = e;

        value = value.replace(/\D/g, '');
        if (value === 0) {
          value = 1
        }
        if (value > 5) {
          this.$message.error("次方数最大只能为5");
          value = 5
        }
        this.itemData.rightValue = value
      },
      //重置输入选项
      resetPow() {
        this.itemData.leftInputType = 'input'
        this.itemData.leftValue = '';
        this.itemData.leftDesc = '';
        this.itemData.rightInputType = 'input'
        this.itemData.rightValue = '';
        this.itemData.rightDesc = '';
      },
      //检查填写是否完成
      checkComplete() {
        if (this.itemData.leftValue === '' || this.itemData.rightValue === '') {
          this.$message.error("有未填写项，请检查");
          return false;
        }
        return true
      },
      // 转译
      translationPow() {
        this.itemData.itemCode =
          `${this.itemData.conditionValue} > math.pow(${this.itemData.leftValue},${this.itemData.rightValue})`
        this.itemData.itemDesc =
          `${this.itemData.conditionDesc} 大于${this.itemData.leftValue}的${this.itemData.rightValue}次方`
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

  .pow-operator {
    margin-top: 30px;
    margin-left: 62px;
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
    width: 80%;
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
</style>
