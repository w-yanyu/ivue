<template>
  <div class="manual-form">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="240px" class="custom-common--form">
      <el-row>
        <el-col :span="18">
          <el-form-item label="模型类型:" prop="testType">
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
          <el-form-item label="模型名称:" prop="ruleName">
            <el-input type="text" v-model="ruleForm.ruleName" disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button type="info" size="medium" @click="openDialog" class="choose-btn">选择</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="模型代码:" prop="ruleCode">
            <el-input type="text" v-model="ruleForm.ruleCode" disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="版本号:" prop="ruleVersion">
            <el-input type="text" v-model="ruleForm.ruleVersion" disabled="true"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="manual-footer">
        <el-col :span="24">
          <el-button type="primary" size="small" @click="submit" class="choose-btn">下载</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import Tools from "pte-ui/utils/Tools";

export default {
  name: "TemplateExport",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  watch: {
    "ruleForm.testType": {
      handler (newValue, oldValue) {
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
        ruleVersion: "" // 规则版本
      },
      openUrl: "",
      testTypeList: [
        {
          label: "评分卡",
          value: "PF"
        },
        {
          label: "规则",
          value: "PT"
        },
        {
          label: "规则组",
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
            message: "请选择模型类型"
          }
        ],
        ruleName: [
          {
            required: true,
            message: "请选择模型名称"
          }
        ],
        ruleCode: [
          {
            required: true,
            message: "请选择模型代码"
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
          let params = that.setSubmitParams();
          params["modelcode"] = this.ruleForm.ruleCode;
          params["servicecode"] = "deci030006";
          //params["appId"] = "risk-management-service";
          params["testType"] = this.ruleForm.testType;
          params["exportname"] = this.ruleForm.ruleName;
          //文件下载
          Tools.downLoadFile(
            "/SUMP/rest/file/riskCallDerive",
            "post",
            params,
            null,
            (err) => {
              this.$msg({
                type: "error",
                message: err,
              });
            },
            this.cancel()
          );
        } else {
          this.$message({
            type: "warning",
            message: "校验不通过",
          })
        }
      })
    },
    /**
     * 关闭弹窗
     */
    cancel() {
      this.$dialog.close()
    },
    /**
     * 打开弹窗
     */
    openDialog() {
      let openUrl = this.openUrl;
      console.log("-------------",openUrl);
      if (openUrl === "" || openUrl === null){
        this.$message({
          type: "warning",
          message: "请先选择模型类型！",
        })
        return;
      }
      const option = {
        toRequest: {
          url: openUrl,
          method: "get",
          params: {},
        },
        width: "80%",
        title: "规则查询",
        that: this,
      };
      this.$dataBus.bindCallBackMethod(this, this.bringBack, option);
      this.$dialog.open(option);
    },
    bringBack(formItem, returnData) {
      let data = returnData;
      let testType = this.ruleForm.testType;
      switch (testType) {
        case "PF":
          this.ruleForm.ruleCode = data["scoreCardCode"];
          this.ruleForm.ruleName = data["scoreCardName"];
          this.ruleForm.ruleVersion = data["version"];
          break;
        case "PT":
          this.ruleForm.ruleCode = data["ruleCode"];
          this.ruleForm.ruleName = data["ruleName"];
          this.ruleForm.ruleVersion = data["version"];
          break;
        case "PZ":
          this.ruleForm.ruleCode = data["group_code"];
          this.ruleForm.ruleName = data["group_name"];
          this.ruleForm.ruleVersion = data["busi_version"];
          break;
        case "GS":
          this.ruleForm.ruleCode = data["treeCode"];
          this.ruleForm.ruleName = data["treeName"];
          this.ruleForm.ruleVersion = data["busiVersion"];
          break;
        case "GL":
          this.ruleForm.ruleCode = data["flow_code"];
          this.ruleForm.ruleName = data["flow_name"];
          this.ruleForm.ruleVersion = data["curr_version"];
          break;
      }
      //this.ruleForm.ruleVersion = data["version"];
    },
    setUrl(testType){
      switch (testType) {
        case "PF": this.openUrl = "/views/risk/risk_score_card/lookup.json"; break;
        case "PT": this.openUrl = "/views/risk/risk_decision_rule/risk_decision_rule_lookup.json"; break;
        case "PZ": this.openUrl = "/views/risk/risk_decision_rule/group/risk_decision_rule_group_lookup.json"; break;
        case "GS": this.openUrl = "/views/risk/rule_tree/risk_rule_tree_lookup.json"; break;
        case "GL": this.openUrl = "/views/risk/rule_flow/rule_flow_lookup.json"; break;
      }
    },
    setSubmitParams(){
      let params = {};
      let testType = this.ruleForm.testType;
      switch (testType) {
        case "PF":
          params["scoreCodes"] = this.ruleForm.ruleCode;
          // params["scoreCardName"] =  this.ruleForm.ruleName;
          break;
        case "PT":
          params["ruleCodes"] = this.ruleForm.ruleCode;
          // params["ruleName"] =  this.ruleForm.ruleName;
          break;
        case "PZ":
          params["groupCode"] = this.ruleForm.ruleCode;
          break;
        case "GS":
          params["treeCodes"] = this.ruleForm.ruleCode;
          break;
        case "GL":
          params["flowCode"] = this.ruleForm.ruleCode;
          break;
      }
      params["ruleName"] = this.ruleForm.ruleName;
      params["version"] = this.ruleForm.ruleVersion;
      return params;
    },
    clear(){
      this.ruleForm.ruleCode = "";
      this.ruleForm.ruleName = "";
      this.ruleForm.ruleVersion = "";
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
