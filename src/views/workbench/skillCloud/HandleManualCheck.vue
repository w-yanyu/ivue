<template>
  <div class="manual-check--container">
    <div class="manual-check--left">
      <el-form ref="ruleForm" :model="ruleForm.questResult" :rules="rules" label-width="160px" class="custom-common--form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请编号:">
              <el-input v-model="ruleForm.applid" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="外部申请号:">
              <el-input v-model="ruleForm.applyno" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户号:">
              <el-input v-model="ruleForm.custid" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户姓名:">
              <el-input v-model="ruleForm.custna" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品编号:">
              <el-input v-model="ruleForm.prodcd" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品名称:">
              <el-input v-model="ruleForm.prodna" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="商户代码:">
              <el-input v-model="ruleForm.mechant_id" :disabled="true"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item label="电核类型:">
              <el-select v-model="ruleForm.check_type" :disabled="true">
                <el-option
                  v-for="(item, i) in checkTypeList"
                  :key="i"
                  :label="item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="电核联系人联系电话:">
              <el-input v-model="ruleForm.phone_no" :disabled="true"></el-input>
            </el-form-item>
          </el-col> -->
          <!-- <el-col :span="8">
            <el-form-item label=" ">
              <el-button type="primary" size="small">外呼</el-button>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row class="question-group">
          <el-table
           :data="ruleForm.questGroups"
           border
          >
            <el-table-column prop="group_name" label="问题组">
              <template slot-scope="scope">
                <span class="question-group--name" @click="checkQuestionGroup(scope.row)">{{scope.row.group_name}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="gmt_modified" label="处理时间">
              <template slot-scope="scope">
                {{timeFormat(scope.row.gmt_modified)}}
              </template>
            </el-table-column>
            <el-table-column prop="group_status" label="处理状态">
              <template slot-scope="scope">
                {{statusTranslate(scope.row.group_status)}}
              </template>
            </el-table-column>
            <el-table-column prop="group_result" label="结果">
              <template slot-scope="scope">
                {{resultTranslate(scope.row.group_result)}}
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="abnormal-title">电核电话异常记录</el-row>
        <el-row class="abnormal-header">
          <el-col :span="24" class="abnormal-btn">
            <el-button type="primary" size="small" @click="addRecord">新增电话异常记录</el-button>
          </el-col>
        </el-row>
        <el-row class="abnormal-table">
          <el-table
           :data="abnormalList"
           border
          >
            <el-table-column type="index" width="50"></el-table-column>
            <el-table-column prop="deal_reslt" label="处理结果类型">
              <template slot-scope="scope">
                {{dealTranslate(scope.row.deal_reslt)}}
              </template>
            </el-table-column>
            <el-table-column prop="remark" :label="$i18ns('备注')"></el-table-column>
            <el-table-column prop="updusr" label="创建人"></el-table-column>
            <el-table-column prop="gmt_create" label="创建时间">
              <template slot-scope="scope">
                {{scope.row.gmt_create.slice(0, 8)}}
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="abnormal-title">电核结果提交</el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="电核中未出现疑似风险的客户：" prop="is_risk" label-width="230px">
              <el-radio v-model="ruleForm.questResult.is_risk" label="1">是</el-radio>
              <el-radio v-model="ruleForm.questResult.is_risk" label="0">否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="审核结果：" prop="check_result" label-width="230px">
              <el-row>
                <el-radio v-model="ruleForm.questResult.check_result" label="1">通过</el-radio>
                <el-radio v-model="ruleForm.questResult.check_result" label="0">拒绝</el-radio>
                <!-- <el-radio v-model="ruleForm.questResult.check_result" label="2">退回重审</el-radio> -->
              </el-row>
            </el-form-item>
          </el-col>
          <el-col v-if="ruleForm.questResult.check_result === '0'" :span="24">
            <el-form-item label="拒绝原因：" prop="reject_code" label-width="230px">
              <el-checkbox-group v-model="ruleForm.questResult.reject_code">
                <el-checkbox label="1">个人异常（多次无人接听、关机、空号、停机、拒接等）</el-checkbox>
                <el-checkbox label="2">无法联系到申请人</el-checkbox>
                <el-checkbox label="3">客户不配合调查</el-checkbox>
                <el-checkbox label="4">单电异常（空号、停机、传真机、无法拨通）</el-checkbox>
                <el-checkbox label="5">规则判断拒绝</el-checkbox>
                <el-checkbox label="6">非本人申请</el-checkbox>
                <el-checkbox label="7">疑似欺诈</el-checkbox>
                <el-checkbox label="8">客户取消申请</el-checkbox>
                <el-checkbox label="9">其他</el-checkbox>
                <el-checkbox label="10">超过审批有效日期，系统自动拒绝</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="电核备注：" label-width="230px">
              <el-input type="textarea" :rows="4" resize="none" v-model="ruleForm.questResult.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row class="custom-common--footer">
        <el-button type="primary" size="small" @click="submit">{{$i18ns('保存')}}</el-button>
      </el-row>
    </div>
    <div class="manual-check--right">
      <el-form ref="questionForm" :model="questionForm" label-width="160px" class="custom-common--form" v-show="isShowGroupDetail">
        <el-row class="manual-right--name">问题组名称：<span>{{groupQuestionName}}</span></el-row>
        <el-row class="manual-right--title" >问题列表</el-row>
        <el-row>
          <el-table
           :data="questionForm.quesList"
           border> 
            <el-table-column prop="ques_id" label="问题编号">
              <template slot-scope="scope">
                <span class="question-group--name" @click="checkQuestion(scope.row)">{{scope.row.ques_id}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ques_contex" label="问题描述"></el-table-column>
            <el-table-column prop="ques_result" label="问题反馈">
              <template slot-scope="scope">
                <el-radio v-model="scope.row.ques_result" label="1">通过</el-radio>
                <el-radio v-model="scope.row.ques_result" label="0">拒绝</el-radio>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <el-row class="manual-right--submit">
          <el-button type="primary" @click="groupQuestionSubmit">{{$i18ns('保存')}}</el-button>
        </el-row>
        <el-row class="manual-right--title" v-show="isShowQuestionDetail">问题答案</el-row>
        <el-row class="manual-right--detail" v-show="isShowQuestionDetail">
          {{questionDetail}}
        </el-row>
      </el-form>
    </div>
    <el-dialog
     title="电话异常记录新增"
     :visible.sync="dialogShow"
     width="800px"
     :before-close="handleClose"
     v-if="dialogShow">
      <el-form ref="addForm" :model="addForm" :rules="addRule" label-width="160px" class="custom-common--form">
        <el-row>
          <el-col :span="24">
            <el-form-item prop="deal_reslt" label="电话异常类型:">
              <el-select v-model="addForm.deal_reslt">
                <el-option
                  v-for="(item, i) in dealResltList"
                  :key="i"
                  :label="item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="电话异常备注:">
              <el-input type="textarea" :rows="6" resize="none" v-model="addForm.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="custom-common--footer">
        <el-button type="primary" @click="addSubmit">{{$i18ns('保存')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "HandleManualCheck",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      ruleForm: {
        applid: "",
        applyno: "",
        custid: "",
        custna: "",
        prodcd: "",
        prodna: "",
        check_type: "",
        groupList: [
          {
            group_id: "",
            group_name: "",
            group_desc: "",
            quesList: [
              {
                ques_id: "",
                ques_contex: "",
                ques_summary: "",
                ques_output: "",
                ques_answer: "",
                ques_result: "",
              }
            ]
          }
        ],
        questResult: {
          check_result: "1",
          is_risk: "1",
          reject_code: [],
          remark: "",
        },
        result: "0",
        reason: [],
        manualRemark: "",
      },
      rules: {
        is_risk: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        check_result: [
          { required: true, message: "请选择审核结果", trigger: "change" },
        ],
        reject_code: [
          { required: true, message: "请选择拒绝原因", trigger: "change" },
        ],
      },
      isShowGroupDetail: false, // 是否显示问题组详情
      groupQuestionName: "", // 问题组名称
      questionForm: {
        mechant_id: "",
        group_id: "",
        quesList: [],
      },
      isShowQuestionDetail: false, // 是否显示问题详情
      questionDetail: "", // 问题详情
      abnormalList: [], // 电核电话异常列表
      checkTypeList: [], // 电核类型数据字典
      dealResltList: [], // 电话异常类型数据字典
      addForm: {
        deal_reslt: "",
        remark: "",
      },
      addRule: {
        deal_reslt: [
          { required: true, message: "请选择电话异常类型", trigger: "blur" },
        ]
      },
      dialogShow: false, // 控制电话异常记录新增弹窗显示/隐藏
    }
  },
  created() {
    this.getData();
    this.getDictList("E_CHECKTP", "checkTypeList");
    this.getDictList("E_DEALRESLT", "dealResltList");
  },
  methods: {
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let that = this;
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      };
      this.$http.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    getData() {
      let params = {
        servicecode: "ICMSLNTS0147",
        applid: this.cParentParams.applid,
        // applid: "BO2022032000488210",
      }
      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            const response = res.data;
            this.ruleForm.applid = response.applid;
            this.ruleForm.applyno = response.applyno;
            this.ruleForm.custid = response.custid;
            this.ruleForm.custna = response.custna;
            this.ruleForm.prodcd = response.prodcd;
            this.ruleForm.prodna = response.prodna;
            this.ruleForm.mechant_id = response.mechant_id;
            this.ruleForm.investId = response.investId;
            this.ruleForm.check_type = response.check_type;
            this.ruleForm.phone_no = response.phone_no;
            this.ruleForm.groupList = response.groupList;
            this.ruleForm.questResult.check_result = response.questResult.check_result;
            this.ruleForm.questResult.is_risk = response.questResult.is_risk;
            // this.ruleForm.questResult.reject_code = response.questResult.reject_code;
            this.ruleForm.questResult.remark = response.questResult.remark;
            this.ruleForm.questGroups = response.questGroups;
            this.abnormalList = response.questExceps;
          }
        })
        .catch(err => {
          console.error(err);
        })
    },
    formValidate() {
      for (let i = 0; i < this.ruleForm.groupList.length; i++) {
        for (let j = 0; j < this.ruleForm.groupList[i].quesList.length; j++) {
          if (!this.ruleForm.groupList[i].quesList[j].ques_answer || !this.ruleForm.groupList[i].quesList[j].ques_result) {
            return false;
          }
        }
      }
      return true;
    },
    /**
     * 问题组信息提交校验
     */
    questionValidate() {
      for (let index = 0; index < this.questionForm.quesList.length; index++) {
        const element = this.questionForm.quesList[index];
        if (element.ques_result !== "0" && element.ques_result !== "1") {
          return false;
        }
      }
      return true;
    },
    /**
     * 时间转换
     * @param time 20210406191720 年月日 时分秒字符串
     */
    timeFormat(time) {
      let result = "";
      for (let index = 0; index < time.length; index++) {
        const element = time.charAt(index);
        switch (index) {
          case 4:
          case 6:
            result =  result + "/" + element;
            break;
          case 8:
            result = result + " " + element;
            break;
          case 10:
          case 12:
            result = result + ":" + element;
            break;
          default:
            result += element;
            break;
        }
      }
      return result;
    },
    /**
     * 显示问题组详情
     * @param row 当前问题组信息
     */
    checkQuestionGroup(row) {
      this.isShowGroupDetail = true;
      this.groupQuestionName = row.group_name;
      if (this.questionForm.group_id !== row.group_id) {
        this.isShowQuestionDetail = false;
      }
      this.questionForm.group_id = row.group_id;
      this.questionForm.quesList = row.questList;
    },
    /**
     * 显示问题详情
     * @param row 当前问题信息
     */
    checkQuestion(row) {
      this.isShowQuestionDetail = true;
      this.questionDetail = row.ques_answer;
    },
    /**
     * 问题组信息提交
     */
    groupQuestionSubmit() {
      let params = {
        servicecode: "ICMSLNTS0150",
        applyno: this.ruleForm.applyno,
        applid: this.ruleForm.applid,
        check_type: this.ruleForm.check_type,
        prodcd: this.ruleForm.prodcd,
        mechant_id: this.ruleForm.mechant_id,
        investId: this.ruleForm.investId,
        group_id: this.questionForm.group_id,
        resultList: [],
      }
      for (let index = 0; index < this.questionForm.quesList.length; index++) {
        const element = this.questionForm.quesList[index];
        let map = {
          ques_result: element.ques_result,
          ques_id: element.ques_id,
          ques_answer: element.ques_answer,
        }
        params.resultList.push(map);
      }
      if (this.questionValidate()) {
        this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
          .then(res => {
            if (res && res.code === "200") {
              this.getData();
              this.$message({
                type: "success",
                message: res.message,
              })
            }
          })
          .catch(err => {
            console.error(err);
          })
      } else {
        this.$message({
          type: "warning",
          message: "请选择完整问题反馈",
        })
      }
    },
    /**
     * 处理结果类型转译
     */
    dealTranslate(type) {
      for (let index = 0; index < this.dealResltList.length; index++) {
        const element = this.dealResltList[index];
        if (element.dictId === type) {
          return element.dictName;
        }
      }
    },
    /**
     * 问题组列表处理状态转译
     * @param status 处理状态码值
     */
    statusTranslate(status) {
      switch (status) {
        case "0":
          return "未处理";
          break;
        case "1":
          return "已处理";
          break;
        default:
          return "";
          break;
      }
    },
    /**
     * 问题组列表结果转译
     * @param result 结果码值
     */
    resultTranslate(result) {
      switch (result) {
        case "1":
          return "通过";
          break;
        case "0":
          return "拒绝";
          break;
        default:
          return "";
          break;
      }
    },
    /**
     * 电话异常记录新增弹窗关闭回调
     */
    handleClose() {
      this.dialogShow = false;
    },
    /**
     * 新增窗口点击回调
     */
    addRecord() {
      this.dialogShow = true;
    },
    /**
     * 电话异常记录新增保存
     */
    addSubmit() {
      this.$refs["addForm"].validate(valid => {
        if (valid) {
          let params = {
            servicecode: "ICMSLNTS0151",
            applid: this.ruleForm.applid,
            check_type: this.ruleForm.check_type,
            remark: this.addForm.remark,
            deal_reslt: this.addForm.deal_reslt,
          }
          this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
            .then(res => {
              if (res && res.code === "200") {
                this.dialogShow = false;
                this.getData();
                this.$message({
                  type: "success",
                  message: res.message,
                })
              }
            })
            .catch(err => {
              console.error(err);
            })
        } else {
          this.$message({
            type: 'warning',
            message: '校验不通过'
          });
        }
      })
      
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            servicecode: "ICMSLNTS0148",
            applid: this.ruleForm.applid,
            check_type: this.ruleForm.check_type,
            questResult: {
              is_risk: this.ruleForm.questResult.is_risk,
              check_result: this.ruleForm.questResult.check_result,
              remark: this.ruleForm.questResult.remark,
            }
            
          }
          if (this.ruleForm.questResult.check_result === '0') {
            params.questResult.reject_code = this.ruleForm.questResult.reject_code.join(",");
          }
          this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
            .then(res => {
              if (res.code === "200") {
                this.$message({
                  type: "success",
                  message: res.message,
                })
              }
            })
            .catch(err => {
              console.error(err);
            })
        } else {
          this.$message({
          type: "warning",
          message: "校验不通过",
        })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .custom-common--form.el-form {
    padding-top: 40px;
    padding-right: 40px;
  }
  .manual-check--container {
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    .manual-check--left {
      width: 50%;
      height: 100%;
      padding-top: 2px;
      box-sizing: border-box;
      float: left;
      border-right: 1px solid #e4e7ed;
      overflow-x: auto;
      .abnormal-table {
        margin-bottom: 20px;
      }
    }
    .manual-check--right {
      width: 50%;
      height: 100%;
      float: left;
    }
  }
  .question-group {
    margin-bottom: 20px;
    padding: 16px;
    border: 1px solid #00152914;
    /deep/ .el-table {
      width: calc(100% - 32px);
      .el-input__inner {
        height: 30px;
      }
    }
    .question-tip {
      color: #f56c6c;
      font-size: 12px;
      text-align: left;
    }
  }
  .abnormal-title {
    margin-bottom: 10px;
    border-bottom: 1px solid #3333333b;
    font-size: 20px;
    font-weight: bold;
    color: #33333394;
  }
  .abnormal-header {
    .abnormal-btn {
      margin-bottom: 10px;
      text-align: right;
    }
  }
  .question-group--name {
    color: #1890ff;
    cursor: pointer;
  }
  .manual-right--submit {
    padding: 10px;
    text-align: center;
  }
  .manual-right--title {
    margin-bottom: 10px;
    border-bottom: 1px solid #3333333b;
    font-size: 20px;
    font-weight: bold;
    color: #33333394;
  }
  .manual-right--name {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
    color: #33333394;
    span {
      font-weight: normal;
      color: #66666694;
    }
  }
</style>