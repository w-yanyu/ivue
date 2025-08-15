<template>
  <div class="page_content">
    <el-form
      class="table_content"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
    >
      <el-row span="24">
        <el-col span="8">
          <el-form-item
            label="评分卡代码"
            prop="scoreCodes"
            label-width="100px"
          >
            <el-input
              class="input_el_70"
              v-model="ruleForm.scoreCardCode"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item
            label="评分卡名称"
            prop="scoreCodeName"
            label-width="100px"
          >
            <el-input
              class="input_el_70"
              v-model="ruleForm.scoreCodeName"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item
            label="总分计算方式"
            prop="totalExecType"
            label-width="100px"
          >
            <el-select
              v-model="ruleForm.totalExecType"
              placeholder="请选择规则类型"
              disabled
            >
              <el-option
                v-for="item in totalExecTypeList"
                :key="item.dictId"
                :label="item.dictName"
                :value="item.dictId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row span="24">
        <el-col>
          <el-table
            class
            :data="tableData"
            style="width: 100%"
            show-summary
            :summary-method="setTotal"
          >
            <el-table-column
              prop="scoreModelAttribute"
              label="评分属性"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="scoreModelName"
              label="属性名称"
              align="center"
            ></el-table-column>
              <el-table-column
              prop="inputValue"
              label="输入值"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="scoreAttributePercent"
              label="权重"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="scorePoints"
              label="评分分值"
              align="center"
            ></el-table-column>
          </el-table>
          <el-input
            type="textarea"
            class="inpudiv"
            ref="demoInput"
            v-model="responseData"
          ></el-input>
        </el-col>
      </el-row>
                  <el-button
              class="copyBtn"
              v-if="tableData.length > 0"
              type="primary"
              small
              @click="copy"
              >查看响应报文</el-button
            >
    </el-form>


    <el-dialog
      title="查看响应报文"
      :visible.sync="visible"
      :show-close="true"
      width="1200px"
      :close-on-click-modal="false"
    >
      <div class="el-dialog-dev">
        <p>{{ responseData.toString() }}</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import totalExecTypeDictdata from "@/views/risk/dictdata/totalExecType"; //导入操作符正常值选项

export default {
  props: {
    cMeta: Object, //本页面模板json数据Layout对象
    cParentMeta: Object, //父页面模板json数据Layout对象
    cParentParams: Object, //父页面自定义参数与内置参数
    cParentScope: Object, //父页面每块区域业务数据
  },
  data() {
    return {
      tableData: [],
      responseData: "",
      scoreCardCode: "",
      scoreCodeName: "",
      totalExecType: "",
      total: ["合计", "", "", ""],
      totalExecTypeList: [],
      ruleForm: {
        scoreCardCode: "",
        totalExecType: "",
        scoreCodeName: "",
      },
      visible: false,
    };
  },
  mounted() {
    console.log("cParentParams", this.cParentParams);
    console.log("cMeta", this.cMeta);
    console.log("cParentScope", this.cParentScope);
    console.log("cParentScope", this.cParentScope);
    //debugger
    let that = this;
    console.log("数据"+that.cParentParams.tableData)
    that.tableData = that.cParentParams.tableData;
    this.totalExecTypeList = totalExecTypeDictdata.data;
    that.ruleForm.scoreCardCode = that.cParentParams.scoreCardCode;
    that.responseData = that.cParentParams.responseData;
    that.total.push(that.cParentParams.total);
    that.ruleForm.scoreCodes = that.cParentParams.scoreCodes;
    that.ruleForm.scoreCodeName = that.cParentParams.scoreCodeName;
    that.ruleForm.totalExecType = that.cParentParams.totalExecType;
  },
  methods: {
    //点击复制按钮复制报文
    copy() {
    //   this.visible = true;
    //   this.$refs.demoInput.select();
    //   var mess = document.getElementById("mess");
    //   console.log("***************");
    //   console.log(mess);
    //   mess.innerText = this.responseData.toString();
    //   this.$message.success("测试报文复制到剪贴板");
        this.$dialog.open({
          that: this,
          title: "测试成功，评分卡响应数据如下：",
          toRequest: {
            url: "@riskScoreDetail",
            method: "get",
            params: {
                score_result: this.responseData
            },
          },
          width: "60%",
        });
    },
    setTotal() {
      let that = this;
      return that.total;
    },
    seach(label) {
      let filter = totalExecTypeDictdata.data.filter(
        (obj) => obj.label === label
      );
      return filter[0].value;
    },
  },
};
</script>

<style lang="css" scoped>
.page_content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.inputItem {
  width: 100%;
}
.footForm {
  position: relative;
}
.buttonGroup {
  position: absolute;
  bottom: -30px;
}
.copyBtn {
  position: absolute;
  bottom: 0px;
  right: -2px;
}
.inpudiv {
  position: absolute;
  top: 0px;
  left: 0px;
  opacity: 0;
}
.table_content {
  width: 100%;
  margin-bottom: 50px;
}
.input_el_70 {
  width: 150px;
}
</style>
