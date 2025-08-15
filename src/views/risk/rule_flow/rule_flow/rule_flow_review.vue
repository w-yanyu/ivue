<template>
  <div class="page_content">
    <el-form class="table_content" ref="ruleForm" label-width="120px" :model="ruleForm" :rules="rules">
      <el-row :span="24">
        <el-col :span="6">
          <el-form-item label="规则流代码" prop="flowCode">
            <el-input size="medium" disabled v-model="ruleForm.flowCode"/>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="申请人" prop="applyUser">
            <!--            <el-input size="medium" disabled v-model="ruleForm.applyUser"/>-->
            <el-select v-model="ruleForm.applyUser" placeholder="" disabled="true">
              <el-option
                v-for="(item, index) in userList"
                :key="index"
                :label="item.user_id+'-'+item.user_name"
                :value="item.user_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="审核人" prop="reviewUser">
                     <el-input size="medium" disabled v-model="ruleForm.reviewUser"/>
            <!-- <el-select v-model="ruleForm.reviewUser" placeholder="" disabled="true">
              <el-option
                v-for="(item, index) in userList"
                :key="index"
                :label="item.user_id+'-'+item.user_name"
                :value="item.user_id"
              ></el-option>
            </el-select> -->
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
        <!-- <el-tabs v-model="activeTabName" type="card" @tab-click="handleClick">
          <el-tab-pane :label="ruleForm.operationType === 'B' ? '切换前' : '旧版本'" name="first">
            <el-card>
              <ruleFlowBpmn
                :cParentParams="beforeTableData"
                v-if="isCardShow"
                style="height: 588px;">

              </ruleFlowBpmn>
            </el-card>
          </el-tab-pane>
          <el-tab-pane :label="ruleForm.operationType === 'B' ? '切换后' : '新版本'" name="second">
            <el-card>
              <ruleFlowBpmn1
                :cParentParams="afterTableData"
                v-if="isCardShow"
                style="height: 588px;">

              </ruleFlowBpmn1>
            </el-card>
          </el-tab-pane>
        </el-tabs> -->
        <ruleFlowBpmnIndexView
            :cParentParams_1="beforeTableData"
            :cParentParams_2="afterTableData"
            :cParentParams="cParentParams"
            style="height: 588px;">
        </ruleFlowBpmnIndexView>

      </el-row>
<!--            <el-row :gutter="24">-->
<!--              &lt;!&ndash; 旧版本表格 &ndash;&gt;-->
<!--              &lt;!&ndash;        <el-col&ndash;&gt;-->
<!--              &lt;!&ndash;          :span="12"&ndash;&gt;-->
<!--              &lt;!&ndash;          v-if="ruleForm.operationType==='U'|| ruleForm.operationType==='B'"&ndash;&gt;-->
<!--              &lt;!&ndash;        >&ndash;&gt;-->
<!--              <el-col-->
<!--                :span="12"-->
<!--              >-->
<!--                <span>{{ ruleForm.operationType === 'B' ? '切换前:' : '旧版本:' }}</span>-->
<!--                <el-card>-->
<!--                  <ruleFlowBpmn-->
<!--                    :cParentParams="beforeTableData"-->
<!--                    v-if="isCardShow"-->
<!--                    style="height: 588px;">-->

<!--                  </ruleFlowBpmn>-->
<!--                </el-card>-->
<!--              </el-col>-->

<!--              &lt;!&ndash; 新版本表格 &ndash;&gt;-->
<!--              &lt;!&ndash;        <el-col :span="ruleForm.operationType==='U'|| ruleForm.operationType==='B'?12:24">&ndash;&gt;-->
<!--              <el-col :span="12">-->
<!--                <span>{{ ruleForm.operationType === 'B' ? '切换后:' : '新版本:' }}</span>-->
<!--                <el-card>-->
<!--                  <ruleFlowBpmn-->
<!--                    :cParentParams="afterTableData"-->
<!--                    v-if="isCardShow"-->
<!--                    style="height: 588px;">-->

<!--                  </ruleFlowBpmn>-->
<!--                </el-card>-->
<!--              </el-col>-->
<!--            </el-row>-->

      <el-row :span="24">
        <el-card>
          <el-form-item label="审核意见" prop="reviewOpinion">
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 4}"
              maxlength="200"
              v-model="ruleForm.reviewOpinion"
              show-word-limit
              :disabled="!isReview"
            ></el-input>
          </el-form-item>
        </el-card>
      </el-row>
            <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="20%"
  :before-close="handleClose">
  <el-row >
  <el-col :span="24" ><div class="grid-content">
    <p class="aaa"> 是否确认审核通过</p>
    </div></el-col>
</el-row>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="clickAgree">确 定</el-button>
  </span>
</el-dialog>

<el-dialog
  title="提示"
  :visible.sync="dialogVisible1"
  width="20%"
  :before-close="handleClose">
  <el-row >
  <el-col :span="24" ><div class="grid-content">
    <p class="aaa"> 是否确认审核退回</p>
    </div></el-col>
</el-row>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible1 = false">取 消</el-button>
    <el-button type="primary" @click="clickReject">确 定</el-button>
  </span>
</el-dialog>
      <el-row class="menu-footer" v-if="isReview">
        <el-col :span="24">
          <el-button type="primary" size="small" @click="pass()">通过</el-button>
          <el-button type="warning" size="small" @click="send()">退回</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import operationTypeData from "@/views/risk/dictdata/operationType"; //操作类型
import reviewStatusData from "@/views/risk/dictdata/scoreCardReviewStatus"; //审核类型
import ruleFlowBpmn from "@/components/BpmnFlow/index2"
import ruleFlowBpmn1 from "@/components/BpmnFlow/index2";
import ruleFlowBpmnIndexView from "@/components/BpmnFlow/indexView";
import MyAxios from "pte-ui/utils/MyAxios"; // 流程图展示
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "RuleFlowReview",
  components: {
    ruleFlowBpmn,
    ruleFlowBpmn1,
    ruleFlowBpmnIndexView
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
        flowId: "", //规则流ID
        flowCode: "1", //规则流代码
        flowName: "", //规则流名称
        reviewStatus: "", //规则流状态 审核状态
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
      beforeTableData: {},
      afterTableData: {},
      operationTypeOption: [],
      dialogVisible: false,
      dialogVisible1: false,
      isCardShow: false,
      rules: {
        reviewOpinion: [
          {
            required: true,
            message: "请输入审核意见"
          }
        ]
      },
      isReview: true,
      userList: [] ,// 柜员字典
      firstTabName: "first",
      secondTabName: "second",
      activeTabName: "first",
      firstShowParam: true,
      secondShowParam: true
    };
  },
  created() {
    this.init();
  },
  mounted() {
  },
  methods: {
    ...mapMutations(["SET_EDIT_ATTR"]),
    async init() {
      //debugger
      let that = this;
      that.ruleForm.reviewId = this.cParentParams.reviewId;
      that.ruleForm.flowId = this.cParentParams.flowId;
      that.ruleForm.flowCode = this.cParentParams.flowCode;
      that.ruleForm.flowName = this.cParentParams.flowName;
      that.ruleForm.reviewStatus = this.cParentParams.reviewStatus;
      that.ruleForm.reviewTime = this.cParentParams.reviewTime;
      that.ruleForm.description = this.cParentParams.description;
      that.ruleForm.updateUser = this.cParentParams.updateUser;
      that.ruleForm.applyUser = this.cParentParams.applyUser;
      that.ruleForm.applyTime = this.cParentParams.applyTime;
      that.ruleForm.reviewUser = this.cParentParams.reviewUser;
      that.ruleForm.operationType = this.cParentParams.riskOperationType;
      that.ruleForm.status = this.cParentParams.status;
      that.ruleForm.reviewOpinion = this.cParentParams.reviewOpinion;

      that.operationTypeOption = operationTypeData.data;
      that.reviewStatusTypeOption = reviewStatusData.data;

      //获取当前页面是否审核页面
      that.isReview = that.cParentParams.isReview;

      that.initCardData();
      //初始化字典
     // this.getDictList("ismtmOnl", "userList");
    },
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictType
     * @param listKey 列表对象key名称
     */

    getDictList(dictType, listKey) {
      let params = {
        servicecode: "ct2502"
      }
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          this[listKey] = res.data;
        }
      }).catch(err => {
        console.error(err)
      })
    },
    initCardData() {
      //debugger 
      //1.初始化切换前数据
      let beforeData = {};
      beforeData.flowId = this.cParentParams.flowId;
      beforeData.flowCode = this.cParentParams.flowCode;
      beforeData.flowName = this.cParentParams.flowNameBefore;
      beforeData.updateUser = this.cParentParams.updateUser;
      beforeData.updateTime = this.cParentParams.updateTime;
      beforeData.flowDescription = this.cParentParams.descriptionBefore;
      beforeData.version = this.cParentParams.versionBefore;
      beforeData.onlyRead = true;
      if (this.isEmpty(this.cParentParams.flowGInfoBefore)) {
        beforeData.flowGInfo = "";
      } else {
        beforeData.flowGInfo = this.cParentParams.flowGInfoBefore;
      }
      if (this.isEmpty(this.cParentParams.flowUInfoBefore)) {
        beforeData.flowUInfo = "";
      } else {
        beforeData.flowUInfo = this.cParentParams.flowUInfoBefore;
      }



      this.beforeTableData = beforeData;
      //如果是0版本则不展示数据
      if (beforeData.version === 0) {
        this.beforeTableData = {
          onlyRead: true,
          flowUInfo: "",
          flowId: "    ",
          flowCode: "    ",
          flowName: "    "
        }
      }

      //1.初始化切换后数据
      let afterData = {};
      afterData.flowId = this.cParentParams.flowId;
      afterData.flowCode = this.cParentParams.flowCode;
      afterData.flowName = this.cParentParams.flowNameAfter;
      afterData.updateUser = this.cParentParams.updateUser;
      afterData.updateTime = this.cParentParams.updateTime;
      afterData.flowDescription = this.cParentParams.descriptionAfter;
      afterData.version = this.cParentParams.versionAfter;
      afterData.onlyRead = true;
      if (this.isEmpty(this.cParentParams.flowGInfoAfter)) {
        afterData.flowGInfo = "";
      } else {
        afterData.flowGInfo = this.cParentParams.flowGInfoAfter;
      }
      if (this.isEmpty(this.cParentParams.flowUInfoAfter)) {
        afterData.flowUInfo = "";
      } else {
        afterData.flowUInfo = this.cParentParams.flowUInfoAfter;
      }
      this.afterTableData = afterData;

      //如果是0版本则不展示数据
      if (afterData.version === 0) {
        this.afterTableData = {
          onlyRead: true,
          flowUInfo: "",
          flowId: "    ",
          flowCode: "    ",
          flowName: "    "
        }
      }

      this.isCardShow = true;
    },
        //审核通过
        clickAgree() {
            let that = this;
            let userInfo = JSON.parse(localStorage.getItem("user_info"));
            let params = {
                reviewId: that.ruleForm.reviewId,
                reviewStatus: "A",
                reviewOpinion: that.ruleForm.reviewOpinion,
                reviewUser: userInfo.userCode,
                servicecode:
                    "deci010717"
            };
            that.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                    this.$message({
                        message: "审核通过成功！",
                        type: "success",
                    });
                    this.$dataBus.doCallBack(this, params);
                })
                .catch((res) => {
                    console.log("错误信息：", res);
                    this.$message({
                        message: "审核失败,请稍后重试！",
                        type: "error",
                    });
                });
        },
                              /**
         *通过
         */
         pass(){
             this.$refs.ruleForm.validate(valid => {
               console.log("pass----valid",valid);
           if(this.ruleForm.reviewOpinion === false){
             this.$message({
              type: 'error',
              message:  "请输入审核意见!"
              });
              return ;
                  }
                 if(valid){
                  this.$confirm("是否通过审核?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              this.clickAgree()
            }).catch(err => {
                console.error(err);
              })
                 }
             })

         },
                 /**
         *退回
         */
         send(){
             this.$refs.ruleForm.validate(valid => {
                         if(this.ruleForm.reviewOpinion === false){
             this.$message({
              type: 'error',
              message:  "请输入审核意见!"
              });
              return ;
                  }
                 if(valid){
                     this.dialogVisible1 = true
                 }
             })

         },
        //审核拒绝
        clickReject() {
            let that = this;
            let userInfo = JSON.parse(localStorage.getItem("user_info"));
            let params = {
                reviewId: that.ruleForm.reviewId,
                reviewStatus: "R",
                reviewOpinion: that.ruleForm.reviewOpinion,
                reviewUser: userInfo.userCode,
                servicecode:
                    "deci010717"
            };
            that.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                    this.$message({
                        message: "审核退回成功！",
                        type: "success",
                    });
                    this.$dataBus.doCallBack(this, params);
                })
                .catch((res) => {});
        },
    isEmpty(element) {
      if (element === null || element === undefined || element === '') {
        return true;
      } else {
        return false;
      }
    },
    formCheck() {
      let flag = false;
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          flag = true;
        }
      });
      return flag;
    },
    handleClick(tab, event) {
      this.SET_EDIT_ATTR({});
      // if (tab.name === this.firstTabName){
      //   this.SET_EDIT_ATTR({});
      //   this.firstShowParam = true;
      //   this.secondShowParam = false;
      // }
      // if (tab.name === this.secondTabName){
      //   this.SET_EDIT_ATTR({});
      //   this.firstShowParam = false;
      //   this.secondShowParam = true;
      // }
    }
  }
}
</script>


<style lang="less" scoped>
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
/deep/.el-dialog{
 min-height:0px !important
} 

/deep/.el-dialog__footer{
  text-align: center  !important
}

.menu-footer {
  margin-top: 20px;
  text-align: center;
  padding-bottom: 20px;
}

.aaa {
  text-align: center;
  font-size: 20px;
}
</style>
