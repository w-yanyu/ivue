<template>
  <div class="menu-form">
    <div class="menu-form--container">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="custom-common--form">
        <el-row>
        <el-col :span="8">
            <el-form-item label="规则代码" prop="ruleCode" label-width="100px">
              <!--el-input class="input_el" v-model="ruleForm.ruleCode" @input="ruleCodeInput($event)" type="text" disabled></el-input-->
              <el-input class="input_el" v-model="ruleForm.ruleCode" type="text" ></el-input>

            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="规则名称" prop="ruleName" label-width="100px">
              <el-input class="input_el" v-model="ruleForm.ruleName" type="text"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8" hidden>
            <el-form-item label="规则类型" prop="ruleType" label-width="100px">
              <el-select v-model="ruleForm.ruleType" placeholder="请选择规则类型" @change="changeStatusValue" disabled>
                <el-option v-for="item in ruleTypeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="description" label-width="100px">
              <el-input class="input_el" type="textarea" :rows="5" show-word-limit maxlength="200" v-model="ruleForm.description">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对象
    },
    components: {},
    data() {
      return {
        ruleForm: {
          ruleId: '', //规则id
          ruleName: "", //规则名称
          ruleCode: "", //规则代码
          ruleType: "DR", //规则类型
          ruleGrade: "", //规则强度
          group_id: "", //规则组选择文本
          groupIds: "", //规则组选择
          description: "", //备注
        },
        rules: {
          ruleName: [{
            required: true,
            message: "请正确输入",
            trigger: "blur",
          }, ],
          ruleCode: [{
            required: true,
            message: "请正确输入",
            trigger: "blur",
          }, ],
          ruleType: [{
            required: true,
            message: "该控件必填",
            trigger: "blur",
          }, ],
          // ruleGrade: [{
          //   required: true,
          //   message: "该控件必填",
          //   trigger: "blur",
          // }, ],
        },
        ruleTypeOptions: [{
          label: "DR-普通规则",
          value: "DR"
        }],
        ruleGradeOptions: [{
            label: "L-低",
            value: "L"
          },
          {
            label: "M-中",
            value: "M"
          },
          {
            label: "H-高",
            value: "H"
          }
        ],
      }
    },
    mounted() {
      let that = this;
      console.log("cParentParams", that.cParentParams);
      //this.initRuleCode();
    },
    methods: {
      initRuleCode(){
           let params = {
            servicecode: "deci010603"
           }
         this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                   let that = this;
                   console.log("that.ruleForm.ruleCode", obj.data.ruleCode);
                   that.ruleForm.ruleCode=obj.data.ruleCode
                    // this.$dialog.close();
                    // this.fetch(true)
                    //this.$dataBus.doCallBack(this, params);
                })
                .catch((res) => {
                    this.$message.error("获取规则代码失败");
                });
      },
      ruleCodeInput(event) {
        let that = this;
        console.log(event);
        let value = event;
        if (/^[^a-z]/i.test(value)) { //如果不是以a-z开头,将value置空,并提示
          value = value.substr(0, 0)
          that.$message.error("规则代码只能字母开头");
        }
        that.ruleForm.ruleCode = value
      },
      isCompleted() {
        let that = this
        let isCompleted = true;
          this.$refs.ruleForm.validate(valid => {
          if (valid) {
            isCompleted = true;
          } else {
             this.$message({
                    type: "warning",
                    message: "校验不通过",
                })
            isCompleted = false;
          }
        })
        // let that = this
        // let isCompleted = true;
        // if (that.ruleForm.ruleName === '' || that.ruleForm.ruleCode === '' || that.ruleForm.ruleType === '' || that
        //   .ruleForm.ruleGrade === '') {
        //     if (that.ruleForm.ruleName === '' || that.ruleForm.ruleCode === '' ) {
        //   isCompleted = false
        //   that.$message.error("规则基本信息有未填写完项目");
        // }
        return isCompleted;
      },
      submitriskDecisionRuleAdd() {
        return this.ruleForm;
      },
      openDialog() {
        let that = this;
        // this.$emit('openDialog');
        console.log("this.$dataBus.getCurrentFormData(this)");
        console.log('this.$dataBus', that.$dataBus);
        that.$dataBus.bindCallBackMethod(that, that.jsonCallBack, {})
        that.$dialog.open({
          that: that,
          title: "规则组选择",
          toRequest: {
            url: "/views/risk/risk_decision_rule/lookup_group.json",
            method: "get",
            params: {
              cParentParams: that.cParentParams
            },
          },
          width: "90%",
          height: "90%",
        })
      },
      jsonCallBack(btnConfig, response) {
        console.log("json模板回调回来的数据1", btnConfig)
        console.log("json模板回调回来的数据2", response)
        let groupdata = response;
        this.ruleForm.groupIds = [];
        this.ruleForm.group_id = '';
        if (groupdata.selectedData && groupdata.selectedData.length > 0) {
          for (const child of groupdata.selectedData) {
            this.ruleForm.groupIds.push(child.groupId);
            this.ruleForm.group_id = this.ruleForm.group_id + child.groupId + ','
          }
          this.ruleForm.group_id = this.ruleForm.group_id.substr(0, this.ruleForm.group_id.length - 1);
        } else if (groupdata.groupId){
          this.ruleForm.groupIds.push(groupdata.groupId)
          this.ruleForm.group_id = this.ruleForm.group_id + groupdata.groupId
        }
        console.log("groupIds",   this.ruleForm.groupIds);
      },
      setRuleGroupSelect(selectGroup) {
        console.log('父类传来的选择数据', selectGroup);
      },
      //复位输入的东西
      resetInput(){
        this.ruleForm.ruleName = '';
        this.ruleForm.ruleCode = '';
        this.ruleForm.description = '';
      },
      /**
       * 表单校验
       */
      validatesForm() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            return true;
          } else {
            return false;
          }
        })
      }
    },


  }
</script>
