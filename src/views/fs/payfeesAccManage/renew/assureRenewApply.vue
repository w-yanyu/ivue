<template>
  <div>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>基本信息</span>
          </template>
          <el-form ref="basicForm" :model="basicForm" label-width="200px"
                   class="custom-common--form">
            <assure-loan-info ref="loanProp" :param="basicForm.lncfno" :key="timer" @changeBasic="changeBasic"></assure-loan-info>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <span><em></em>申请信息</span>
          </template>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="250px" class="custom-common--form">
            <el-row>
              <el-col :span="8">
                <el-form-item class="require-asterisk" label="承办机构" prop="caseorg_name">
                  <el-input v-model="appForm.caseorg_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="require-asterisk" label="受理法院" prop="accept_court_name">
                  <el-input v-model="appForm.accept_court_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item class="require-asterisk" label="保全阶段:" prop="savestage">
                  <el-select v-model="appForm.savestage" :disabled="true">
                    <el-option v-for="item in savestageList" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="require-asterisk" label="保全类型:" prop="savetype">
                  <el-select v-model="appForm.savetype" :disabled="true">
                    <el-option v-for="item in savetypeList" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item class="require-asterisk" label="是否首封:" prop="isfirstSeal">
                  <el-select v-model="appForm.isfirstSeal" :disabled="true">
                    <el-option v-for="item in isfirstSealList" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="require-asterisk" label="房产地址" prop="proaddress">
                  <el-input v-model="appForm.proaddress" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item class="require-asterisk" label="当前保全期限" prop="currPeriod">
                  <el-date-picker
                    v-model="appForm.currPeriod"
                    :disabled="true"
                    type="daterange"
                    start-placeholder="开始日期"
                    range-separator="-"
                    end-placeholder="结束日期"
                    unlink-panels
                    value-format="yyyyMMdd">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item class="require-asterisk" label="续保期限" prop="renewPeriod">
                  <el-date-picker
                    v-model="appForm.renewPeriod"
                    type="daterange"
                    start-placeholder="开始日期"
                    range-separator="-"
                    end-placeholder="结束日期"
                    unlink-panels
                    value-format="yyyyMMdd">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="附件" prop="fileList">
                  <upload-file ref="fileListProp" :uploadFileList="appForm.fileList" :uploadDisabled="false"
                               @changeFile="fileListChange"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$i18ns('备注:')" prop="remark">
                  <el-input type="textarea" v-model="appForm.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>提交</el-button>
      <el-button size="small" @click="reset">{{$i18ns('取消')}}</el-button>
    </div>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import UploadFile from "@/views/fs/components/UploadFile.vue";
  import assureLoanInfo from "../assureLoanInfo";

  export default {
    name: "assureRenewApply",
    components: {
      assureLoanInfo,
      UploadFile,
    },
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对
    },
    data() {
      return {
        basicForm: { // 基础信息表单对象
          lncfno: this.cParentParams.lncfno,//借据号
          custno: "",//客户号
          acctna: "",//客户名称
          idtfno: "",//证件号码
          phonno: "",//手机号码
          prodcd: "",//产品代码
          prodna: "",//产品名称
          zubhno: "",//区域中心
          clssst: "",//贷款形态
          ovdays: "",//逾期天数
          isUnionLoan: "",//是否联合贷
          unionComp: "",//联合贷公司名称
          noworg: "",//当前委案机构
        },
        appForm: {
          assure_no: "",//保全案号
          execaseno: "",//执行案件号
          caseorg: "", // 承办机构
          caseorg_name: "", // 承办机构名称
          accept_court: "",//受理法院
          accept_court_name: "",//受理法院
          savestage: "",//保全阶段
          savetype: "",//保全类型
          isfirstSeal: "",//是否首封
          proaddress: "",//房产地址
          currPeriod:[],//当前保全期限
          renewPeriod:"",//续保期限
          fileList: [],//附件
          remark: "", // 备注
        },
        clssstList: [],   //贷款形态
        savestageList: [],//保全阶段
        savetypeList: [],//保全类型
        isfirstSealList: [],//是否首封
        activeNames: ["1", "2"],
      }
    },
    created() {
      this.getDictList("E_CLSSST", "clssstList"); // 贷款形态数据字典
      this.getDictList("E_SAVE_STAGE", "savestageList"); // 保全阶段
      this.getDictList("E_SAVE_TYPE", "savetypeList"); // 保全类型
      this.getDictList("E_YES___", "isfirstSealList"); // 是否首封
      this.initRule();
      this.initAssureInfo();
    },

    methods: {
      initRule() {
        this.appRules = {
          renewPeriod: [{validator: this.renewPeriodValidate, trigger: 'change'}],
          fileList: [{validator: this.fileListValidate, trigger: 'change'}],
        }
      },
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

      changeBasic(basicInfo, feeInfo) {
        this.basicForm = basicInfo;
      },

      initAssureInfo() {
        this.appForm.assure_no= this.cParentParams.assure_no;//保全案号
        this.appForm.execaseno= this.cParentParams.execaseno;//执行案件号
        this.appForm.caseorg= this.cParentParams.case_org; // 承办机构
        this.appForm.caseorg_name= this.cParentParams.case_org_name; // 承办机构名称
        this.appForm.accept_court= this.cParentParams.accept_court;//受理法院
        this.appForm.accept_court_name= this.cParentParams.accept_court_name;//受理法院
        this.appForm.savestage= this.cParentParams.savestage;//保全阶段
        this.appForm.savetype= this.cParentParams.savetype;//保全类型
        this.appForm.isfirstSeal= this.cParentParams.isfirstSeal;//是否首封
        if(this.cParentParams.saveperiod){
          this.appForm.currPeriod = this.cParentParams.saveperiod.split("-");
        }
        this.appForm.proaddress= this.cParentParams.proaddress;//是否首封
      },

      submit() {
        this.$refs.appForm.validate(valid => {
          if (valid) {
            this.$confirm("是否确认提交申请?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              let params = {
                servicecode: "RLMSPLTS1408",
                assure_check_id: this.cParentParams.id,//保全物编号
                lncfno: this.basicForm.lncfno,//借据号
                cust_no: this.basicForm.custno,//客户号
                cust_nm: this.basicForm.acctna,//客户名称
                idtfno: this.basicForm.idtfno,//证件号码
                phonno: this.basicForm.phonno,//手机号码
                prodcd: this.basicForm.prodcd,//产品代码
                prod_name: this.basicForm.prodna,//产品名称
                area_no: this.basicForm.zubhno,//区域中心
                area_name: this.basicForm.area_name,//区域中心名称
                assure_no:this.appForm.assure_no,//保全案号
                execaseno:this.appForm.execaseno,//执行案件号
                renewStartDate:this.appForm.renewPeriod[0],//续保期限开始日期
                renewEndDate:this.appForm.renewPeriod[1],//续保期限结束日期
                fileList: this.appForm.fileList,//附件
                remark: this.appForm.remark,  //备注
              }

              MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
                if (res && res.code === "200") {
                  this.$message({
                    type: "success",
                    message: res.message
                  })
                  this.clearData();
                  this.$dialog.close();
                }
              }).catch(err => {
                console.error(err);
              })
            });
          }
        });
      },
      reset() {
        this.$confirm("是否确认取消?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.clearData();
          this.$dialog.close();
        })
      },

      clearData() {
        this.basicForm = { // 基础信息表单对象
          lncfno: "",//借据号
          acctna: "",//客户名称
          idtfno: "",//证件号码
          phonno: "",//手机号码
          prodna: "",//产品名称
          zubhno: "",//区域中心
          clssst: "",//贷款形态
          ovdays: "",//逾期天数
          isUnionLoan: "",//是否联合贷
          unionComp: "",//联合贷公司名称
          noworg: "",//当前委案机构
        },
          this.appForm = {
            assure_no: "",//保全案号
            execaseno: "",//执行案件号
            caseorg: "", // 承办机构
            caseorg_name: "", // 承办机构名称
            accept_court: "",//受理法院
            accept_court_name: "",//受理法院
            savestage: "",//保全阶段
            savetype: "",//保全类型
            isfirstSeal: "",//是否首封
            proaddress: "",//房产地址
            currPeriod:[],//当前保全期限
            renewPeriod:"",//续保期限
            fileList: [],//附件
            remark: "", // 备注
          },
        this.$refs.loanProp.clearData();//基本信息
        this.$refs.fileListProp.clearFileList();//其他附件
        this.$refs["appForm"].resetFields();
      },

      /**
       * 添加文件回调
       * @param file 当前添加文件对象
       * @param fileList 已添加文件
       */
      fileListChange(val) {//附件
        this.appForm.fileList = val;
      },
      renewPeriodValidate(value, rule, callback) {
        if (this.appForm.renewPeriod.length === 0) {
          return callback(new Error("请输入续保期限"));
        }
        return callback();
      },
      fileListValidate(value, rule, callback) {
        if (this.appForm.fileList.length === 0) {
          return callback(new Error("请上传附件"));
        }
        return callback();
      },
    }
  }

</script>

<style lang="less" scoped>
  .custom-common--form {
    padding: 0;

    .el-row .el-col {
      padding-right: 16px;
    }
  }

  .line-change .el-form-item__label {
    text-align-last: center;
    line-height: 15px;
  }

  .container-content {
    .container-content--search {
      padding: 16px 40px 0 12px;
      border-bottom: 0px solid #e3e8f5;
    }

    .container-content--toolbar {
      padding: 10px;
    }

    .container-content--pagination {
      float: right;
      padding: 10px;
    }

    .button-footer {
      text-align: center;
      padding: 0 0 10px 0;
    }

    .container-centent--table {
      margin-top: 10px;
      bottom: 60px;
    }
  }

  .el-dialog-dev {
    max-height: 60vh;
    overflow: auto;
  }

</style>
