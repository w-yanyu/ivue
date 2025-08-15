<template>
  <div>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>基本信息</span>
          </template>
          <el-form ref="basicForm" :rules="basicRules" :model="basicForm" label-width="200px"
                   class="custom-common--form">
            <el-row>
              <el-col :span="8">
                <el-form-item class="require-asterisk" label="借据号" prop="lncfno">
                  <el-input v-model="basicForm.lncfno" @blur="lncfnoBlur"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="客户名称" prop="acctna">
                  <el-input v-model="basicForm.acctna" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="证件号码" prop="idtfno">
                  <el-input v-model="basicForm.idtfno" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="手机号码" prop="phonno">
                  <el-input v-model="basicForm.phonno" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="产品名称" prop="prodna">
                  <el-input v-model="basicForm.prodna" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="区域中心" prop="zubhno">
                  <el-input v-model="basicForm.zubhno" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="贷款形态" prop="clssst">
                  <el-select v-model="basicForm.clssst" prop="clssst" :disabled="true">
                    <el-option
                      v-for="(item,i) in clssstList"
                      :key="item.dictId"
                      :label="item.dictName"
                      :value="item.dictId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="账龄" prop="ovdays">
                  <el-input v-model="basicForm.ovdays" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否联合贷" prop="isUnionLoan">
                  <el-input v-model="basicForm.isUnionLoan" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="联合贷公司名称" prop="unionComp">
                  <el-input v-model="basicForm.unionComp" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="当前委案机构" prop="noworg">
                  <el-input v-model="basicForm.noworg" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <span><em></em>申请信息</span>
          </template>
          <el-form
            ref="appForm"
            :rules="appRules"
            :model="appForm"
            label-width="200px"
            class="custom-common--form"
          >
            <el-row>
              <!-- <el-col :span="12">
                <el-form-item label="承办机构名称" class="require-asterisk">
                  <el-select
                    v-model="appForm.underta_name"
                    placeholder=" "
                  >
                    <el-option
                      v-for="(item, index) in creditFileTypeList"
                      :key="index"
                      :label="item.dictName"
                      :value="item.dictId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
              <!-- <el-col :span="12">
                <el-form-item class="require-asterisk" label="承办机构名称" prop="acce_institut">
                  <el-select v-model="appForm.acce_institut" :disabled="isDisabled">
                    <el-option
                      v-for="(item, index) in creditFileTypeList"
                      :key="index"
                      :label="item.dictName"
                      :value="item.dictId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col> -->
             <el-col :span="12">
                <el-form-item class="require-asterisk" label="受理机构" prop="handleorg">
                  <el-select v-model="appForm.handleorg" :disabled="isDisabled">
                    <el-option v-for="item in orgListss" :key="item.handleorg" :label="item.handleorg"
                               :value="item.handleorg">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="受理机构" prop="accept_org_name">
                  <el-select v-model="appForm.accept_org_name" :disabled="isDisabled">
                    <el-option v-for="item in orgList" :key="item.orgName" :label="item.orgName"
                               :value="item.orgName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item  class="require-asterisk" label="执行案号" prop="case_no">
                  <el-input v-model="appForm.case_no"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
              <el-form-item label="执行受理时间" prop="case_times" class="require-asterisk">
                <el-date-picker
                  v-model="appForm.effectiveTime"
                  type="date"
                  start-placeholder="执行受理时间"
                  format="yyyy-MM-dd"
                  value-format="yyyyMMdd"
                >
                </el-date-picker>
              </el-form-item>
              </el-col> -->
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="机构受理时间" prop="case_times">
                  <el-date-picker
                    v-model="appForm.case_times"
                    align="right"
                    type="date"
                    placeholder="请选择机构受理时间"
                    value-format="yyyyMMdd"
                    :disabled="isDisabled"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="附件上传" prop="fileList" class="require-asterisk">
                  <upload-file
                    ref="uploadProp"
                    :uploadFileList="appForm.fileList"
                    :uploadDisabled="false"
                    @changeFile="changeUploadFile"
                  ></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$i18ns('备注')" prop="remark">
                  <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 5 }"
                    placeholder="请输入备注"
                    v-model="appForm.remark"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>提交</el-button>
      <el-button size="small" @click="reset">{{$i18ns('重置')}}</el-button>
    </div>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import UploadFile from "@/views/fs/components/UploadFile.vue";

  export default {
    name: "payApply",
    components: {
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
          lncfno: "",//借据号
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
        handleorg: "",//承办机构名称
        accept_org_name: "",//受理机构名称
        case_no: "",//执行案号
        case_times: "",//执行受理时间
        fileList: [],//附件
        remark: "",//备注
        },
        currentPage: 1,
        tableSize: 10,
        tableTotal: 10,
        isShowPage: false,
        isShow: false,
        isShowConfirm: false,
        isDisabled: false,
        compareCustomerInfo: "",
        clssstList: [],   //贷款形态
        creditFileTypeList:[],
        credappTypeList:[],
        orgList: [],   //受理机构
        orgListss:[],//承办机构
        dialogVisible: false,
        activeNames: ["1", "2"],
        appRules : {
          case_no: [{required: true, message: "执行案号"}],
          fileList: [{required:true, message: "请上传附件"}],
          handleorg: [{required: true, message: "承办机构名称"}],
          accept_org_name: [{required: true, message: "受理机构名称"}],
           case_times: [{required: true, message: "执行受理时间"}],
        }
      }
    },
    created() {
      this.getDictList("E_CLSSST", "clssstList"); // 初始化贷款形态数据字典
      this.getDictList("E_FEE_TYPE", "feeTypeList"); // 费用类型
      this.getDictList("E_ACCOUNT_TYPE", "accountTypeList"); // 账户类型
      this.getDictList("E_ISORNO_LEND", "creditFileTypeList"); // 初始化高危认定附件上传类型
      this.getDictList("E_FUNCTION", "credappTypeList"); // 初始化高危认定附件上传类型
      this.getOrgList();
    //  this.getOrgListss();
      // this.initRule();
    },

    methods: {
      initRule() {
        this.appRules = {
          case_no: [{required: true, message: "执行案号"}],
          fileList: [{required:true, message: "请上传附件"}],
          handleorg: [{required: true, message: "承办机构名称"}],
          accept_org_name: [{required: true, message: "受理机构名称"}],
           case_times: [{required: true, message: "执行受理时间"}],
        }
      },
       getOrgList() {
        let params = {
          servicecode: "RLMSPLTS1402",
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              this.orgList = res.data.infos;
            }
          })
          .catch(err => {
            console.error(err);
          });
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

      lncfnoBlur() {
        if (this.basicForm.lncfno === "" || this.compareCustomerInfo === this.basicForm.lncfno) {
          return false;
        }
        this.compareCustomerInfo = this.basicForm.lncfno;
        this.getlnCustomerInfo();
         this.getOrgListss();
      },

      getlnCustomerInfo() {
        if (this.compareCustomerInfo) {
          this.basicForm.custno = "";//客户号
          this.basicForm.acctna = "";//客户姓名
          this.basicForm.idtfno = "";//证件号码
          this.basicForm.prodcd = "";//产品代码
          this.basicForm.prodna = "";//产品名称
        }
        let params = {
          servicecode: "RLMSPLTS1081",
          lncfno: this.compareCustomerInfo,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              lncfno: "",//借据号
                this.basicForm.custno = res.data.lnCustomerInfo.custno;//客户号
              this.basicForm.acctna = res.data.lnCustomerInfo.acctna;//客户名称
              this.basicForm.idtfno = res.data.lnCustomerInfo.idtfno;//证件号码
              this.basicForm.phonno = res.data.lnCustomerInfo.phonno;//手机号码
              this.basicForm.prodcd = res.data.lnCustomerInfo.prodcd;//产品代码
              this.basicForm.prodna = res.data.lnCustomerInfo.prodna;//产品名称
              this.basicForm.zubhno = res.data.lnCustomerInfo.zubhno;//区域中心
              this.basicForm.clssst = res.data.lnCustomerInfo.clssst;//贷款形态
              this.basicForm.ovdays = res.data.lnCustomerInfo.ovdays;//逾期天数
              this.basicForm.isUnionLoan = res.data.lnCustomerInfo.isUnionLoan;//是否联合贷
              this.basicForm.unionComp = res.data.lnCustomerInfo.unionComp;//联合贷公司名称
              if (res.data.suitInfo != null) {
                this.basicForm.noworg = res.data.suitInfo.noworg;//当前委案机构
              }
              // if (res.data.feeInfo != null && res.data.feeInfo.accept_org_name
              //   && res.data.feeInfo.accept_time) {
              //   this.appForm.accept_org_name = res.data.feeInfo.accept_org_name;//受理机构
              //   this.appForm.accept_time = res.data.feeInfo.accept_time;//机构受理时间
              // } else {
              //   this.isDisabled = false;
              // }

            }
          })
          .catch(err => {
            this.compareCustomerInfo = "";
            console.error(err);
          })
      },
       getOrgListss() {
        let params = {
          servicecode: "RLMSPLTS1085",
           lncfno: this.compareCustomerInfo,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              this.orgListss = res.data.suitIns;
            }
          })
          .catch(err => {
            console.error(err);
          });
      },


      /**
       * 分页sizeChange 回调
       */
      sizeChange(val) {
        this.tableSize = val;
        this.searchTeller();
      },
      /**
       * 分页currentChange回调
       */
      currentChange(val) {
        this.currentPage = val;
        this.getTableData();
      },

      formatAccountTypeData(row, column) {
        let name = row[column.property];
        let data = row[column.property];
        this.accountTypeList.forEach(function (item, index) {
          if (data == item.dictId) {
            name = item.dictId + '-' + item.dictName;
          }
        })
        return name;
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
                servicecode: "RLMSPLTS1082",
                lncfno: this.basicForm.lncfno,//借据号
                cust_no: this.basicForm.custno,//客户号
                cust_nm: this.basicForm.acctna,//客户名称
                cert_id: this.basicForm.idtfno,//证件号码
                mobile_phone: this.basicForm.phonno,//手机号码
                prodcd: this.basicForm.prodcd,//产品代码
                prod_name: this.basicForm.prodna,//产品名称
                branch: this.basicForm.zubhno,//区域中心
                clssst:this.basicForm.clssst, //贷款形态this.basicForm.clssst,
                function_cd: this.basicForm.ovdays,//逾期天数
                isorno_lend: this.basicForm.isUnionLoan,//是否联合贷
                loan_name: this.basicForm.unionComp,//联合贷公司名称
                current_org: this.basicForm.noworg,//当前委案机构
                acce_institut: this.appForm.accept_org_name, //受理机构名称
                underta_name: this.appForm.handleorg, //承办机构名称
                case_no: this.appForm.case_no, //执行案号、
                case_times: this.appForm.case_times, //执行受理时间
                uploadLeac: this.appForm.fileList, //附件列表
                remarks: this.appForm.remark, //备注
              }
              MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
                if (res && res.code === "200") {
                  this.$message({
                    type: "success",
                    message: res.message
                  })
                  this.clearData();
                  // this.$dialog.close();
                }
              }).catch(err => {
                console.error(err);
              })
            });
          }
        });
      },
      reset() {
        this.$confirm("是否确认重置?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.clearData();
          //this.$dialog.close();
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
        };
          this.appForm = {
          accept_org_name: "",
        handleorg: "",
        case_no: "",
        case_times: "",
        uploadLeac: [],
        remark: "",
          };
          this.$refs.uploadProp.clearFileList();//支付凭证
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
      zfpzValidate(value, rule, callback) {
        if (this.appForm.fileList.length === 0 && this.isShow) {
          return callback(new Error("请上传支付凭证"));
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
