<template>
  <div class="page_content">
    <el-form class="table_content" ref="ruleForm" label-width="120px" :model="ruleForm" :rules="rules">
      <el-row :span="24">
        <el-col :span="6">
          <el-form-item label="简单评分卡代码" prop="scoreCardCode">
            <el-input size="medium" disabled v-model="ruleForm.scoreCardCode"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="申请人" prop="applyUser">
            <el-input size="medium" disabled v-model="ruleForm.applyUser"/>
          </el-form-item>
        </el-col>
                <el-col :span="6">
          <el-form-item label="审核人" prop="reviewUser">
            <el-input size="medium" disabled v-model="ruleForm.reviewUser"/>
          </el-form-item>
        </el-col>
          <el-col :span="6">
          <el-form-item label="操作类型" prop="operationType">
            <el-select
              v-model="ruleForm.operationType"
              @change="changeStatusValue"
              disabled
            >
              <el-option
                v-for="item in operationTypeOption"
                :key="item.dictId"
                :label="item.dictName"
                :value="item.dictId"
                disabled
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :span="24">


        <el-col :span="6">
          <el-form-item label="审核状态" prop="reviewStatus">
            <el-select v-model="ruleForm.reviewStatus" disabled>
              <el-option
                v-for="item in reviewStatusTypeOption"
                :key="item.dictId"
                :label="item.dictName"
                :value="item.dictId"
                disabled
              />
            </el-select>
          </el-form-item>
        </el-col>
              <el-col :span="6">
          <el-form-item label="申请时间" prop="applyTime">
            <el-input size="medium" disabled v-model="ruleForm.applyTime"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="审核时间" prop="reviewTime">
            <el-input size="medium" disabled v-model="ruleForm.reviewTime"/>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="24">
                <!-- 旧版本表格 -->
                <el-col
                    :span="12"
                    v-if="ruleForm.operationType==='U'|| ruleForm.operationType==='S'"
                >
                    <span>{{(ruleForm.operationType==='A'|| ruleForm.operationType==='C')?'切换前:':'旧版本:'}}</span>
          <el-card>
            <RiskScoreCardModelViewCompare
              :cParentParams="beforeTableData"
              v-if="isCardShow">

            </RiskScoreCardModelViewCompare>
          </el-card>
        </el-col>

        <!--新版本表格 -->
        <!--        <el-col :span="ruleForm.operationType==='U'|| ruleForm.operationType==='B'?12:24">-->
          <el-col :span="ruleForm.operationType==='U'|| ruleForm.operationType==='S'?12:24">
                    <span>{{ruleForm.operationType==='B'?'切换后:':'新版本:'}}</span>
          <el-card>
            <RiskScoreCardModelViewCompare
              :cParentParams="afterTableData"
              v-if="isCardShow">

            </RiskScoreCardModelViewCompare>
          </el-card>
        </el-col>
      </el-row>

      <el-row :span="24">
        <el-card>
          <el-form-item label="审核意见" prop="reviewOpinion">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 4}"
              maxlength="500"
              v-model="ruleForm.reviewOpinion"
              show-word-limit
              disabled="true"
            ></el-input>
          </el-form-item>
        </el-card>
      </el-row>

      <!-- <el-row class="menu-footer">
        <el-col :span="24">
          <el-button type="primary" size="small" @click="clickAgree">通1111过</el-button>
          <el-button type="warning" size="small" @click="clickReject">退回</el-button>
        </el-col>
      </el-row> -->
    </el-form>
  </div>
</template>


<script>
import operationTypeData from "@/views/risk/dictdata/operationType"; //操作类型
import reviewStatusData from "@/views/risk/dictdata/scoreCardReviewStatus"; //审核类型
import RiskScoreCardModelViewCompare
  from "@/views/risk/risk_score_card/score_card_review/risk_score_card_model_view_compare.vue"; // 模板导入

export default {
  name: "ScoreCardReviewViewSimple",
  components: {
    RiskScoreCardModelViewCompare
  },
  props: {
    cMeta: Object, //本页面模板json数据Layout对象
    cParentMeta: Object, //父页面模板json数据Layout对象
    cParentParams: Object, //父页面自定义参数与内置参数
    cParentScope: Object, //父页面每块区域业务数据
  },
  data() {
    return {
      ruleForm: {
        reviewId: "", //审核Id
        scoreCardId: "", //评分卡ID
        scoreCardCode: "1", //评分卡代码
        scoreCardName: "", //评分卡名称
        reviewStatus: "", //评分卡状态 审核状态
        reviewTime: "", //审核时间
        description: "", //备注
        updateUser: "", //更新操作的用户
        applyUser: "", //申请人
        applyTime: "", //申请时间
        reviewUser: "", //审核人
        operationType: "", //操作类型
        status: "",
        reviewOpinion: "", //审核意见
      },
      beforeTableData: [],
      afterTableData: [],
      operationTypeOption: [],
      isCardShow: false,
      rules: {
        reviewOpinion: [
          {
            required: true,
            message: "审核意见不可为空！"
          }
        ]
      }
    };
  },
  created() {
    this.init();
  },
  mounted() {
  },
  methods: {
    async init() {
      let that = this;
      that.ruleForm.reviewId = this.cParentParams.reviewId;
      that.ruleForm.scoreCardId = this.cParentParams.scoreCardId;
      that.ruleForm.scoreCardCode = this.cParentParams.scoreCardCode;
      that.ruleForm.scoreCardName = this.cParentParams.scoreCardName;
      that.ruleForm.reviewStatus = this.cParentParams.reviewStatus;
      that.ruleForm.reviewTime = this.cParentParams.reviewTime;
      that.ruleForm.totalExecType = this.cParentParams.totalExecType;
      that.ruleForm.description = this.cParentParams.description;
      that.ruleForm.updateUser = this.cParentParams.updateUser;
      that.ruleForm.applyUser = this.cParentParams.applyUser;
      that.ruleForm.applyTime = this.cParentParams.applyTime;
      that.ruleForm.reviewUser = this.cParentParams.reviewUser;
      that.ruleForm.operationType = this.cParentParams.operationType;
      that.ruleForm.status = this.cParentParams.status;
      that.ruleForm.scoreCardType = this.cParentParams.scoreCardType;
      that.ruleForm.reviewOpinion = this.cParentParams.reviewOpinion;
      that.operationTypeOption = operationTypeData.data;
      that.reviewStatusTypeOption = reviewStatusData.data;
      that.requestTableData();
    },
    //请求表格数据
    async requestTableData() {
      let that = this;
      let params = {
        reviewId: that.ruleForm.reviewId,
        scoreCardCode: that.ruleForm.scoreCardCode,
        servicecode:
          "deci020116",
        isList: true,
      };
      that.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then((res) => {
          if (res && res.code === "200") {
            // 初始化子组件参数
            that.initParamsTableDate(res.data);
            console.log("score_card_review_info", res);
            let chaosTableDataAfter = res.data.scoreCardRuleListAfter;
            let chaosTableDataBefore = res.data.scoreCardRuleListBefore;
            that.tidyTableData("after", chaosTableDataAfter);
            that.tidyTableData("before", chaosTableDataBefore);
          }
        })
        .catch((res) => {
        });
    },
    //审核通过
    clickAgree() {
      let that = this;
      let userInfo = JSON.parse(localStorage.getItem("user_info"));
      let params = {
        reviewId: that.ruleForm.reviewId,
        scoreCardCode: that.ruleForm.scoreCardCode,
        operationType: that.ruleForm.operationType,
        reviewOpinion: that.ruleForm.reviewOpinion,
        scoreCardType: that.ruleForm.scoreCardType,
        reviewUser: userInfo.userCode,
        servicecode:
          "risk-management-service/risk-score-card-review/check-agree",
        appId: "risk-management-service",
      };
      that.$http
        .invokeAPI("/SUMP/riskController/riskCall", "POST", params)
        .then((obj) => {
          this.$message({
            message: "审核通过成功！",
            type: "success",
          });
          this.$dataBus.doCallBack(this, params);
        })
        .catch((res) => {
        });
    },
    //审核拒绝
    clickReject() {
      let that = this;
      let userInfo = JSON.parse(localStorage.getItem("user_info"));
      let params = {
        reviewId: that.ruleForm.reviewId,
        scoreCardCode: that.ruleForm.scoreCardCode,
        operationType: that.ruleForm.operationType,
        reviewOpinion: that.ruleForm.reviewOpinion,
        reviewUser: userInfo.userCode,
        servicecode:
          "risk-management-service/risk-score-card-review/check-reject",
        appId: "risk-management-service",
      };
      that.$http
        .invokeAPI("/SUMP/riskController/riskCall", "POST", params)
        .then((obj) => {
          this.$message({
            message: "审核拒绝成功！",
            type: "success",
          });
          this.$dataBus.doCallBack(this, params);
        })
        .catch((res) => {
        });
    },
    /**
     * 初始化子组件参数
     */
    async initParamsTableDate(data) {
      let that = this;
      //设置模型表达式
      that.afterTableData.scoreRuleList = data[0].scoreRuleListAfter;
      that.beforeTableData.scoreRuleList = data[0].scoreRuleListBefore;
      //设置评分卡代码
      that.afterTableData.scoreCardId = data[0].scoreCardId;
      that.afterTableData.scoreCardCode = data[0].scoreCardCode;
      that.beforeTableData.scoreCardId = data[0].scoreCardId;
      that.beforeTableData.scoreCardCode = data[0].scoreCardCode;
      //设置评分卡名称
      that.afterTableData.scoreCardName = data[0].scoreCardNameAfter;
      that.beforeTableData.scoreCardName = data[0].scoreCardNameBefore;
      //设置备注
      that.afterTableData.description = data[0].descriptionAfter;
      that.beforeTableData.description = data[0].descriptionBefore;
      that.isCardShow = true;
    }
  }
}
</script>


<style lang="css" scoped>
.page_content {
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.table_content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 30px;
}

.menu-footer {
  margin-top: 20px;
  text-align: center;
  padding-bottom: 20px;
}
</style>
