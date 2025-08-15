<template>
  <div class="page_content">
    <el-col :gutter="24">
      <el-row :span="24">
        <el-form
          ref="formParams"
          :model="formParams"
          label-width="100px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="规则组名称:" prop="groupName">
                <el-input type="text" v-model="formParams.groupName" disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="规则组备注:" prop="description">
                <el-input type="textarea" v-model="formParams.description" disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <el-row :span="24">
        <el-table ref="tableParams" :data="tableParams" :border="true" style="width: 99%;margin: 0 !important;">
          <el-table-column label="规则编码" prop="rule_code" align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column label="规则名称" prop="rule_name" align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="id" label="数据操作" align="center">
              <template slot-scope="scope">
                  <span
                      class="el-tag el-tag--primary el-tag--mini"
                      style="cursor: pointer;"
                      @click="changeTable(scope.row, scope.$index, true)"
                  >详情</span>
              </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-col>
  </div>
</template>


<script>

export default {
  name: "DecisionRuleGroupReviewCard",
  props: {
    cMeta: Object, //本页面模板json数据Layout对象
    cParentMeta: Object, //父页面模板json数据Layout对象
    cParentParams: Object, //父页面自定义参数与内置参数
    cParentScope: Object, //父页面每块区域业务数据
  },
  data() {
    return {
      formUrl: "/views/risk/risk_decision_rule/group/risk_decision_rule_group_view.json", //规则组表单路径
      tableUrl: "", //规则组表格路径
      formParams: {//规则组表单参数
        groupId: "",
        groupCode: "",
        groupName: "",
        updateUser: "",
        updateTime: "",
        description: ""
      },
      tableParams: [] //规则组表格蚕食
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      //判断当前规则组版本，若未0则不初始化数据
      //debugger

        //1、初始化表单参数
        this.formParams.groupId = this.cParentParams.groupId;
        this.formParams.groupCode = this.cParentParams.groupCode;
        this.formParams.groupName = this.cParentParams.groupName;
        this.formParams.updateUser = this.cParentParams.updateUser;
        this.formParams.updateTime = this.cParentParams.updateTime;
        this.formParams.description = this.cParentParams.description;
        //2、初始化表格参数
        this.tableParams = this.cParentParams.tableParams;
    },
            //修改的弹出窗口
            changeTable(row, index, cg) {
            console.log("修改按钮输出", row, index, cg);
            let that = this;
            that.$dataBus.bindCallBackMethod(that, that.editDialogCallBack, {});
            that.$dialog.open({
                that: that,
                title: "详情",
                toRequest: {
                    // url: "@riskScoreCardModelEditEdit",
                    url: "@rule_group_view",
                    method: "get",
                    params: {
                        cParentParams: row,
                    },
                },
                width: "85%",
            });
        },
  }
}
</script>


<style lang="css" scoped>
.page_content {
  margin-bottom: 20px;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
