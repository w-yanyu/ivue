<template>
  <div class="manual-form">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="240px" class="custom-common--form">
      <el-row>
        <el-col :span="18">
          <el-form-item label="规则类型:" prop="testType">
            <el-select v-model="ruleForm.testType">
              <el-option
                v-for="item in testTypeList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="规则名称:" prop="ruleName">
            <el-input type="text" v-model="ruleForm.ruleName" disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="info" size="medium" @click="openDialog" class="choose-btn">选择</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="规则代码:" prop="ruleCode">
            <el-input type="text" v-model="ruleForm.ruleCode" disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="版本编号:" prop="ruleVersion">
            <el-input type="text" v-model="ruleForm.ruleVersion"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="文件路径:" prop="filePath">
            <el-input type="text" v-model="ruleForm.filePath" disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <TemplateUploadButton @setFileUploadReturnData="setFileUploadReturnData">

          </TemplateUploadButton>
        </el-col>
      </el-row>
      <el
      <el-row class="manual-footer">
        <el-col :span="24">
          <el-button type="primary" size="small" @click="submit" class="choose-btn">导入</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import Tools from "pte-ui/utils/Tools";
import TemplateUploadButton from "@/views/risk/risk_batch_task_execute_info/import/uploadButton.vue";
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "TemplateImport",
  components: {
    TemplateUploadButton
  },
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  watch: {
    "ruleForm.testType": {
      handler(newValue, oldValue) {
        this.setUrl(newValue);
        this.clear();
      }
    }
  },
  data() {
    return {
      ruleForm: {
        testType: "", // 测试类型
        ruleName: "", // 规则名称
        ruleCode: "", // 规则代码
        ruleVersion: "", // 规则版本
        filePath: "", //文件路径
        batchFileName: "" //批量文件名称
      },
      openUrl: "",
      testTypeList: [
        {
          label: "评分卡",
          value: "PF"
        },
        {
          label: "普通规则",
          value: "PT"
        },
        {
          label: "普通规则组",
          value: "PZ"
        },
        {
          label: "规则树",
          value: "GS"
        },
        {
          label: "规则流",
          value: "GL"
        }
      ],
      rules: {
        testType: [
          {
            required: true,
            message: "请选择测试类型"
          }
        ],
        ruleName: [
          {
            required: true,
            message: "请选择测试名称"
          }
        ],
        ruleCode: [
          {
            required: true,
            message: "请选择测试代码"
          }
        ],
        filePath: [
          {
            required: true,
            message: "请选择文件"
          }
        ]
      }
    }
  },
  created() {

  },
  methods: {
    /**
     * 表单提交
     */
    submit() {
      let that = this;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = this.ruleForm;
          params["servicecode"] = "risk-management-service/batch-task-execute/add-batch-task";
          params["appId"] = "risk-management-service";
          //导入批量任务信息
          MyAxios.invokeAPI("/SUMP/riskController/riskCall", "post", params)
            .then(res => {
              if (res && res.code === "200") {
                that.$message({
                  type: 'success',
                  message: '导入成功！'
                })
                that.cancel();
              } else {
                that.$message({
                  type: 'error',
                  message: '导入失败！'
                })
              }
            })
            .catch(err => {
              console.error(err);
            });

        } else {
          this.$message({
            type: "warning",
            message: "校验不通过",
          })
        }
      })
    },
    setUrl(testType) {
      switch (testType) {
        case "PF":
          this.openUrl = "/views/risk/risk_score_card/lookup.json";
          break;
        case "PT":
          this.openUrl = "/views/risk/risk_decision_rule/risk_decision_rule_lookup.json";
          break;
        case "PZ":
          this.openUrl = "/views/risk/risk_decision_rule/group/risk_decision_rule_group_lookup.json";
          break;
        case "GS":
          this.openUrl = "/views/risk/rule_tree/risk_rule_tree_lookup.json";
          break;
        case "GL":
          this.openUrl = "/views/risk/rule_flow/rule_flow_lookup.json";
          break;
      }
    },
    clear() {
      this.ruleForm.ruleCode = "";
      this.ruleForm.ruleName = "";
      this.ruleForm.ruleVersion = "";
    },
    /**
     * 更改页面文件路径
     * @param filePath
     */
    setFileUploadReturnData(dataMap){
      this.ruleForm.filePath = dataMap.path;
      this.ruleForm.batchFileName = dataMap.name;
    }
  }
}
</script>
<style lang="less" scoped>
.manual-footer {
  text-align: center;
}

.choose-btn {
  width: 70px;
  margin-top: 2px;
  margin-left: 2px;
}
</style>
