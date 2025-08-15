<template>
  <div class="allany-container">
    <div class="control-item">
      <div :class="{ 'arrowTransform ': !isActive, 'arrowTransformReturn ': isActive}" v-if='pipe.children.length!=0'
        @click="isActive=!isActive"></div>
      <div :class="{ 'control-bar ': pipe.children.length!=0, 'control-bar-no ': pipe.children.length==0}">
        <el-select :disabled="!disabled" size="mini" v-model="pipe.condition" style="width: 200px; margin-right: 16px;"
          @change='conditionChange'>
          <el-option label="满足以下所有条件" value="all"></el-option>
          <el-option label="满足以下任一条件" value="any"></el-option>
        </el-select>
        <el-button size="mini" v-if="disabled" @click="addCondition('condition')" type="primary">添加条件</el-button>
        <el-button size="mini" v-if="disabled" @click="addCondition('all_any')" type="success">添加子条件</el-button>
        <el-button size="mini" v-if="!pipe.isRoot && disabled " @click="delSelf" type="danger" icon="el-icon-delete" circle></el-button>
      </div>
    </div>
    <!--折叠动画 -->
    <collapse-transition>
      <div class="conditions-wrapper" v-show="isActive">
        <div class="conditions-wrapper--gap"></div>
        <div class="conditions-wrapper--conditions">
          <!-- 初始化时pipe是从父页面传过来的 -->
          <div class="conditions-wrapper--condition" v-for="(child, idx) in pipe.children" :key="idx">
            <biz-rule-all-any v-if="child.type === 'all_any' " :normal="normal" :disabled="disabled" :pipe="child" />
            <biz-rule-condition :normal="normal" v-else-if="child.type === 'condition'" :disabled="disabled" :pipe="child" ref="bizRuleCondition" />
          </div>
        </div>
      </div>
    </collapse-transition>
  </div>
</template>

<script>
  import BizRuleCondition from './BizRuleCondition.vue';
  import collapseTransition from "./collapse";

  export default {
    name: 'biz-rule-all-any',
    components: {
      BizRuleCondition,
      collapseTransition
    },
    //接收父页面传过来的参数
    props: ['isRoot', 'pipe', 'disabled', 'normal'],
    data() {
      return {
        normal: false,
        isActive: true,
      }
    },
    computed: {
      isShowArrow(children) {
        return children.length > 1;
      }
    },
    mounted() {
      console.log('父类传给index----', this.pipe);
    },
    methods: {
      // 添加规则/子规则
      addCondition(type) {
        //debugger;
        let that = this
        //如果规则未填写完，不允许再添加规则或者子规则
        if (!that.isCompleted(type)) {
          return
        }
        if (type === 'all_any') {
          this.pipe.children.push({
            type: 'all_any',
            condition: 'all',
            children: [],
          });
        } else if (type === 'condition') {
          let index = that.seachArray(this.pipe.children);
          let addObj = {
            type: 'condition',
            name: '',
            operator: '', //左边条件的操作符选择控件值
            value: '',
            centerBtnType: 'constant', //左边条件 常量/变量 选择按钮
            rightBtnType: 'select', //右边值 选择/输入 选择按钮 select 选择 input输入
            rightType: '',
            rightValue: '', //字段值1输入框（当左边条件为between活pow时会出现，当 常量/变量 选择框 选择常量的时候出现）
            rightValueBtnType: 'input', //加减乘除后面的 选择/输入 选择按钮 select 选择 input输入,
            rightValueDesc: '',
            left: '', //最左边的条件选择控件值
            leftDesc: '',
            rightSelect: '', //右边值 加减乘除 选择框
            right: '', //右边值的第一个输入控件值（当 常量/变量 选择框 选择变量的时候）
            rightDesc: '',
            rightValueList: "", //加减乘除后面的选择框
            rightValueDesc: "",
            rightValueBetween: '' //字段值2输入框的值（当左边条件为between活pow时才有）
          }
          console.log('返回的index===', index);
          if (index === -1) {
            this.pipe.children.push(addObj);
          } else {
            this.pipe.children.splice(index, 0, addObj);
          }
        }
        console.log('add pipe', this.pipe.children);
      },
      //搜索数组里面添加条件的位置
      seachArray(array) {
        for (let i = 0; i < array.length; i++) {
          if (array[i].type === 'all_any') {
            return i === 0 ? 0 : i
          }
        }
        return -1;
      },
      // 删除操作
      delSelf() {
        // eslint-disable-next-line no-array-constructor
        const idx = Array().indexOf.call(this.$parent.pipe.children, this.pipe);
        this.$parent.pipe.children.splice(idx, 1);
      },
      //判断各场景下 是否填写完成
      isCompleted(type) {
        let that = this
        let isCompleted = true;
        console.log(that.$refs);
        console.log("addCondition11111", that.pipe.children)
        console.log("addCondition22222", that.pipe.children.length);

        let bizRuleCondition = that.$refs.bizRuleCondition
        if (bizRuleCondition && bizRuleCondition.length > 0) {
          bizRuleCondition.forEach((child, index) => {
            let inputObj = child.getIntputStaut();
            // console.log('添加按钮条件判断---', inputObj);

            console.log('完成条件判断 operator', inputObj.operator);
            console.log('完成条件判断 left', inputObj.left);
            console.log('完成条件判断 leftType', inputObj.leftType);
            console.log('完成条件判断 centerBtnType', inputObj.centerBtnType);
            console.log('完成条件判断 rightValue', inputObj.rightValue);
            console.log('完成条件判断 rightValueBetween', inputObj.rightValueBetween);
            if (inputObj.left === '' || inputObj.operator === '' || inputObj.rightValue === '') {
              console.log('是否填写完判断---全空', inputObj);
              this.$message.error("规则配置未填写完项目");
              isCompleted = false
              //左边第二个框选择了在。。之间和大于..的..次方 特殊场景
            } else if (inputObj.operator === 'BETWEEN' || inputObj.operator === 'POW') {
              if (inputObj.left === '' || inputObj.leftDesc === '' || inputObj.leftType === '' || inputObj
                .rightValue === '' || inputObj.rightValueBetween === '') {
                // console.log('是否填写完判断---BETWEEN', inputObj);
                this.$message.error("有未填写完项目");
                isCompleted = false
              }
              //左边第二个选择 不在。。范围内  和 在范围内
            } else if (inputObj.operator === 'NOT_IN' || inputObj.operator === 'IN') {
              if (inputObj.left === '' || inputObj.leftDesc === '' || inputObj.leftType === '' || inputObj
                .rightValue === '') {
                // console.log('是否填写完判断---NOT_IN', inputObj);
                this.$message.error("有未填写完项目");
                isCompleted = false
              }
              //左边选择了boolean类型的时候 只需要判断左边选项 逻辑号  右边数值
            } else if (inputObj.centerBtnType === 'constant' && inputObj.leftType !== 'Boolean') {
              if (inputObj.left === '' || inputObj.leftDesc === '' || inputObj.leftType === '' || inputObj
                .rightValue === '') {
                this.$message.error("有未填写完项目");
                isCompleted = false
              }
            } else if (inputObj.centerBtnType === 'variable' && inputObj.leftType !== 'Boolean') {
              if (inputObj.left === '' || inputObj.leftDesc === '' || inputObj.leftType === '' || inputObj
                .rightValue === '' ||
                inputObj.rightDesc === '' || inputObj.rightType === '') {
                this.$message.error("有未填写完项目");
                isCompleted = false
              }
            } else if (inputObj.leftType === 'Boolean' && inputObj.rightValue === '' && inputObj.operator === '') {
              this.$message.error("有未填写完项目");
              isCompleted = false
            }
          });
        }
        return isCompleted;
      },
      isRuleEmpty(pipe) {
        let that = this
        let isRuleEmpty = false;
        //如果是有子条件
        if (pipe.type === 'all_any') {
          if (pipe.children.length === 0) {
            isRuleEmpty = true;
          } else {
            pipe.children.forEach((child, index) => {
              if (child.type === 'all_any') {
                isRuleEmpty = this.isRuleEmpty(child)
              }
            });
          }
        }
        // console.log("addCondition11111", pipe.children)
        // console.log("addCondition22222", pipe.children.length);
        // // if (that.pipe.children.length === 0 && type === "all_any"){
        // if (pipe.children.length === 0) {
        //   isRuleEmpty = true;
        //   this.$message.error("请先添加规则配置条件");
        // }
        if (isRuleEmpty)
          this.$message.error("请先添加规则配置条件");
        return isRuleEmpty;
      },
      toggle(el) {
        console.log(el);
        this.isActive = !this.isActive;
      },
      conditionChange(event) {
        console.log('conditionChange', this.pipe);
      }

    },
  };
</script>

<style lang="css" scoped>

  .control-item {
    display: flex;
    align-items: center;
    position: relative;
  }

  .arrowTransform {
    content: "";
    margin-left: 7px;
    margin-right: 8px;
    top: 20px;
    right: 26px;
    width: 7px;
    height: 7px;
    border-top: 2px solid rgb(144, 147, 153);
    border-right: 2px solid rgb(144, 147, 153);
    transition: 0.2s;
    transform-origin: center;
    transform: rotateZ(45deg);
  }

  .arrowTransformReturn {
    content: "";
    margin-left: 7px;
    margin-right: 8px;
    top: 20px;
    right: 26px;
    width: 7px;
    height: 7px;
    border-top: 2px solid rgb(144, 147, 153);
    border-right: 2px solid rgb(144, 147, 153);
    transition: 0.2s;
    transform-origin: center;
    transform: rotateZ(135deg);
  }

  .control-bar {
    display: flex;
    flex-direction: row;
  }

  .control-bar-no {
    margin-left: 24px;
    display: flex;
    flex-direction: row;
  }

  .conditions-wrapper {
    display: flex;
    flex-direction: row;
  }

  .conditions-wrapper--gap {
    width: 4px;
    margin: 5px 10px;
    margin-bottom: 0;
    border-radius:0.5;
    background-color : rgb(245, 245, 245);
    transition : background-color 400ms;
  }

  .conditions-wrapper--gap :hover {
    background-color: rgb(144, 147, 153);
  }

  .conditions-wrapper--conditions {
    display: flex;
    flex-direction: column;
  }

  .conditions-wrapper--condition {
    padding-top: 15px;
  }
</style>
