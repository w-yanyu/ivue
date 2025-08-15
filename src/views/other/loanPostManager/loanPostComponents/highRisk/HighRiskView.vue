<template>
  <div>
    <div class="hriskapp-basic">
      <el-form ref="lnApplyInfo" :rules="hriskBasicRules" :model="lnApplyInfo" label-width="200px" class="custom-common--form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="借据号" prop="lncfno">
              <el-input v-model="lnApplyInfo.lncfno" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="证件号码" prop="cardno">
              <el-input v-model="lnApplyInfo.cardno" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phoneno">
              <el-input v-model="lnApplyInfo.phoneno" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户姓名" prop="custna">
              <el-input v-model="lnApplyInfo.custna" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品名称" prop="prodcd">
              <el-input v-model="lnApplyInfo.prodna" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="贷款形态">
                <el-select v-model="lnApplyInfo.clssst" :disabled="true" placeholder=" ">
                  <el-option
                    v-for="(item, index) in loanStatusList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            </el-form-item>
          </el-col>
 
        </el-row>
      </el-form>
    </div>
    <div class="hriskapp-detail">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>申请信息</span>
          </template>
          <el-form ref="lnApplyInfo" :rules="hriskAppRules" :model="lnApplyInfo" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="21">
                <el-form-item label="附件上传类型" prop="atttype">
                  <el-select
                    v-model="lnApplyInfo.atttype"
                    placeholder="请选择"
                    :disabled="true">
                    <el-option
                      v-for="item in hriskFileTypeList"
                      :key="item.value"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            
            <el-row>
                <el-col :span="12">
                    <el-form-item  label="附件上传" prop="fileList">
                        <upload-file-view  v-if="showComponent" ref="uploadProp" :uploadAttachType="lnApplyInfo.atttype" :typeList="hriskFileTypeList" :uploadFileList="lnApplyInfo.fileList" :uploadDisabled="true"></upload-file-view>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item  label="征信库查看" >
                        <el-button type="primary" size="small" @click="showReport()" plain>{{$i18ns('查看')}}</el-button>
                    </el-form-item>
                </el-col>
                <!--<el-col :span="12">
                  <el-form-item label="是否发送短信" prop="isSendSMS">
                    <el-radio v-model="lnApplyInfo.isSendSMS" :key="1" :label="1" :disabled="true">是</el-radio>
                    <el-radio v-model="lnApplyInfo.isSendSMS" :key="0" :label="0" :disabled="true">否</el-radio>
                  </el-form-item>
                </el-col>-->
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="认定原因描述" prop="reason">
                  <el-input type="textarea" :autosize="{minRows:2, maxRows: 5}" placeholder="请输入备注" v-model="lnApplyInfo.reason" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <credit-report-info
                :show-dialog="showCreditInfo"
                :cardno="lnApplyInfo.cardno"
                @creditClose="showClose"
                v-if="showCreditInfo"
            />
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>

  </div>
</template>

<script>
import {
  validateHandle,
} from "../../loanPostConstant/loanPostConstant";
import MyAxios from "pte-ui/utils/MyAxios";
import UploadFileView from "../UploadFileView";
import CreditReportInfo from "../CreditReportInfo";

export const hriskBasicRules = {
  lncfno: [{ required: true, message: "请输入借据号" }],
};
export const hriskAppRules = {
  isSendSMS : [{required: true, message: '请选择是否发送短信'}],
  atttype : [{required: true, message: '请选择附件上传类型'}],
  reason : [{required: true, message: '请输入认定原因描述'}],
};

export default {
    name: "HighRiskView",
    props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object, // 父页面的scope数据对
    },
    components: {
      CreditReportInfo,
      UploadFileView,
    },
    data() {
      return {
        lnApplyInfo: { // 基础信息表单对象
          lncfno: "",
          custno: "",
          custna: "",
          phoneno: "",
          cardno: "",
          idtype: "",
          acctbl: "",
          prodcd:"",
          prodna:"",
          ovdays:"",
          brchno:"",
          brchna:"",
          clssst:"",
          acctst:"",
          reason: "",
          isSendSMS:0,
          atttype:"",
          fileList:[],
        },
        fileList:[],
        accountLoanStatusList:[],
        loanStatusList:[],
        showCreditInfo:false,
        hriskFileTypeList:[],
        showComponent:true,
        activeNames: ["1", "2"]
      }
    },
    created() {
      this.getDictList("E_CLSSST", "loanStatusList"); // 化贷款形态数据字典
      this.getDictList("E_HRISKTYPE", "hriskFileTypeList"); // 初始化高危认定附件上传类型
      this.getHighRiskApplyInfo();
    },
    
    methods: {
        /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictType
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
        let params = {
            dictType: dictType,
            dictKey: [dictType]
        };
        MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
            if (res && res.code === "200") {
            this[listKey] = res.data;
            }
        })
        .catch(err => {
            console.error(err);
        });
    },
    showReport(){
      this.showCreditInfo = true;
    },
    showClose() {
      this.showCreditInfo = false;
    },
    getHighRiskApplyInfo(){
      var vm = this;
      let params = {
        servicecode: "PLMSKGTS0068",
        applid: this.cParentParams.applid,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then(res => {
        if (res && res.code === "200" && res.data) {
          vm.lnApplyInfo = res.data.lnApplyInfo;
          vm.lnApplyInfo.isSendSMS = parseInt(vm.lnApplyInfo.isSendSMS); //原因
          vm.lnApplyInfo.fileList = res.data.fileList;
          this.showComponent=false;
          this.$nextTick(()=>{
            this.showComponent=true;
          })
        }
      })
      .catch(err => {
        console.error(err);
      })
    },

  },

}

</script>

<style lang="less" scoped>
  .hriskapp-basic,.hriskapp-detail {
    padding: 16px 40px 0 12px;
  }
  .hriskapp-detail {
    .el-form {
      padding: 0;
    }
    /deep/.el-collapse {
      .el-collapse-item__content {
        padding: 20px 80px 20px 20px;
      }
    }
  }
  .attachmentTab {
    min-height: 68.667px;
  }
</style>
