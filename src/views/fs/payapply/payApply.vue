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
            <loan-info ref="loanProp" :formData="basicForm" :key="timer" :propDisabled="false" @changeBasic="changeBasic"></loan-info>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <span><em></em>申请信息</span>
          </template>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="250px" class="custom-common--form">
            <el-row>
              <el-col :span="8">
                <el-form-item class="require-asterisk" label="受理机构" prop="accept_org_name">
                  <el-select v-model="appForm.accept_org_name" :disabled="isDisabled">
                    <el-option v-for="item in orgList" :key="item.orgName" :label="item.orgName"
                               :value="item.orgName"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="require-asterisk" label="机构受理时间" prop="accept_time">
                  <el-date-picker
                    v-model="appForm.accept_time"
                    align="right"
                    type="date"
                    placeholder="请选择机构受理时间"
                    value-format="yyyyMMdd"
                    :disabled="isDisabled"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="require-asterisk" label="起诉金额" prop="prosecute_amount">
                  <el-input v-model="appForm.prosecute_amount" :disabled="isDisabled"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item class="require-asterisk" label="费用类型:" prop="fee_type">
                  <el-select v-model="appForm.fee_type">
                    <el-option v-for="item in feeTypeList" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="require-asterisk" label="付款金额" prop="pay_amount">
                  <el-input ref="amount" v-model="appForm.pay_amount"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="require-asterisk" label="金额确认无误" prop="confirm" v-show="isShowConfirm">
                  <el-checkbox v-model="appForm.confirm"></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="收款账户类型:" prop="rece_account_type">
                  <el-select v-model="appForm.rece_account_type">
                    <el-option v-for="item in accountTypeList" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"/>
                  </el-select>
                  <el-button size="small" @click="searchAccount" type="primary">收款账户选择</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="收款机构名称" prop="rece_org_name">
                  <el-input v-model="appForm.rece_org_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="收款账户名称:" prop="rece_acc_name">
                  <el-input v-model="appForm.rece_acc_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="收款账户账号" prop="rece_accno">
                  <el-input v-model="appForm.rece_accno"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="开户行:" prop="bank_name">
                  <el-input v-model="appForm.bank_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="开户行行号" prop="bank_no">
                  <el-input v-model="appForm.bank_no" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="打款附言:" prop="pay_remark">
                  <el-input type="textarea" v-model="appForm.pay_remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="缴费申请明细单" prop="jfsqmxd">
                  <upload-file ref="jfsqmxdProp" :uploadFileList="appForm.jfsqmxd" :uploadDisabled="false"
                               @changeFile="jfsqmxdChange"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="其他缴费凭证" prop="qtjfpz">
                  <upload-file ref="qtjfpzProp" :uploadFileList="appForm.qtjfpz" :uploadDisabled="false"
                               @changeFile="qtjfpzChange"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="垫付情况:" prop="adv_pay_status">
                  <el-radio-group v-model="appForm.adv_pay_status">
                    <el-radio v-for="(item,i) in advPayStatusList" :key="i" :label="item.dictId" @change="radioChange">
                      {{item.dictName}}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="支付凭证类型" prop="payment_bill_type" v-show="isShow">
                  <el-select v-model="appForm.payment_bill_type">
                    <el-option v-for="item in paymentBillTypeList" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="支付凭证上传" prop="zfpz" v-show="isShow">
                  <upload-file ref="zfpzProp" :uploadFileList="appForm.zfpz" :uploadDisabled="false"
                               @changeFile="zfpzChange"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="其他附件" prop="fileList">
                  <upload-file ref="fileListProp" :uploadFileList="appForm.fileList" :uploadDisabled="false"
                               @changeFile="fileListChange"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :class="{'require-sign': !isShow}" :label="$i18ns('备注:')" prop="remark">
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
      <el-button size="small" @click="reset">{{$i18ns('重置')}}</el-button>
    </div>

    <el-dialog title="账户查询" :visible.sync="dialogVisible" :show-close="true" width="1200px"
               :close-on-click-modal="false"
               :append-to-body="true">
      <div class="el-dialog-dev">
        <div class="container-content">
          <div class="container-content--search">
            <el-form :model="strategyForm" ref="strategyForm" label-width="150px" class="custom-common--form">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="机构名称" prop="orgName">
                    <el-input v-model="strategyForm.orgName"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="button-footer">
                <el-col :span="24">
                  <el-button type="primary" @click="searchAccount">查询</el-button>
                  <el-button type="primary" @click="resetSearch">{{$i18ns('重置')}}</el-button>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="container-centent--table">

            <el-table ref="multipleTable" :data="tableData" :border="true" style="width: 100%" stripe>
              <el-table-column label="区域中心" prop="branch_name" align="center"></el-table-column>
              <el-table-column label="账户类型" prop="accountType" :formatter="formatAccountTypeData"
                               align="center"></el-table-column>
              <el-table-column label="机构名称" prop="orgName" align="center"></el-table-column>
              <el-table-column label="收款账户名称" prop="receAccName" align="center"></el-table-column>
              <el-table-column label="收款账户账号" prop="receAccNo" align="center"></el-table-column>
              <el-table-column label="收款账户账号" prop="receAccNo" align="center"></el-table-column>
              <el-table-column label="开户行" prop="bank_name" align="center"></el-table-column>
              <el-table-column label="开户行行号" prop="bank_no" align="center"></el-table-column>
              <el-table-column label="开户行行号" prop="bank_no" align="center"></el-table-column>
              <el-table-column label="操作" align="center" width="240">
                <template slot-scope="scope">
                  <el-button type="text" @click="selectRow(scope.$index,scope.row)">{{$i18ns('选择')}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="container-content--pagination">
            <el-pagination v-show="isShowPage"
                           @size-change="sizeChange"
                           @current-change="currentChange"
                           :current-page="currentPage"
                           :page-sizes="[10,15,20]"
                           :page-size="tableSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="tableTotal">
            </el-pagination>
          </div>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import UploadFile from "@/views/fs/components/UploadFile.vue";
  import loanInfo from "./loanInfo";
  export default {
    name: "payApply",
    components: {
      UploadFile,
      loanInfo,
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
          accept_org_name: "", // 受理机构
          accept_time: "",//机构受理时间
          prosecute_amount: "",//起诉金额
          fee_type: "",//费用类型
          pay_amount: "",//付款金额
          confirm: "",//确认金额
          rece_account_type: "",//收款账户类型
          rece_org_name: "",//收款机构名称
          rece_acc_name: "",//收款账户名称
          rece_accno: "",//收款账户账号
          bank_name: "",//开户行
          bank_no: "",//开户行行号
          adv_pay_status: "",//垫付情况
          payment_bill_type: "",//支付凭证类型
          pay_remark: "",//打款附言
          jfsqmxd: [],//缴费申请明细单
          qtjfpz: [],//其他缴费凭证
          zfpz: [],//支付凭证
          fileList: [],//附件
          remark: "", // 备注
        },
        strategyForm: {
          branchNo: "",//区域中心
          accountType: "",//账户类型
          orgName: "",//机构名称
          receAccName: "",//收款账户名称
          receAccNo: "",//收款账户账号
        },
        currentPage: 1,
        tableSize: 10,
        tableTotal: 10,
        isShowPage: false,
        isShow: false,
        isShowConfirm: false,
        isDisabled: false,
        clssstList: [],   //贷款形态
        orgList: [],   //受理机构
        feeTypeList: [],//费用类型
        accountTypeList: [],//账户类型
        advPayStatusList: [],//垫付情况
        paymentBillTypeList: [],//支付凭证类型
        dialogVisible: false,
        activeNames: ["1", "2"],
      }
    },
    created() {
      this.getDictList("E_CLSSST", "clssstList"); // 初始化贷款形态数据字典
      this.getDictList("E_FEE_TYPE", "feeTypeList"); // 费用类型
      this.getDictList("E_ACCOUNT_TYPE", "accountTypeList"); // 账户类型
      this.getDictList("E_ADV_PAY_STATUS", "advPayStatusList"); // 垫付情况
      this.getDictList("E_PAYMENT_BILL_TYPE", "paymentBillTypeList"); // 支付凭证类型
      this.getOrgList();
      this.initRule();
    },

    methods: {
      initRule() {
        this.appRules = {
          accept_org_name: [{required: true, message: "请输入受理机构"}],
          accept_time: [{required: true, message: "请输入机构受理时间"}],
          prosecute_amount: [{validator: this.validateProseAmount, trigger: 'change'}],
          fee_type: [{required: true, message: "请输入费用类型"}],
          pay_amount: [{validator: this.validatePayAmount, trigger: 'change'}],
          confirm: [{validator: this.validateConfirm, trigger: 'change'}],
          rece_account_type: [{required: true, message: "请输入收款账户类型"}],
          rece_org_name: [{required: true, message: "请输入收款机构名称"}],
          rece_acc_name: [{required: true, message: "请输入收款账户名称"}],
          rece_accno: [{required: true, message: "请输入收款账户账号"}],
          bank_name: [{required: true, message: "请输入开户行"}],
          bank_no: [{required: true, message: "请输入开户行行号"}],
          adv_pay_status: [{required: true, message: "请输入垫付情况"}],
          payment_bill_type: [{required: this.isShow, message: "请输入支付凭证类型"}],
          zfpz: [{validator: this.zfpzValidate, trigger: 'change'}],
          jfsqmxd: [{validator: this.jfsqmxdValidate, trigger: 'change'}],
          qtjfpz: [{validator: this.qtjfpzValidate, trigger: 'change'}],
        }
      },
      getOrgList() {
        let params = {
          servicecode: "RLMSPLTS1402",
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200") {
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

      changeBasic(basicInfo, feeInfo) {
        this.basicForm = basicInfo;
        if (feeInfo != null && feeInfo.accept_org_name
          && feeInfo.accept_time) {
          this.appForm.accept_org_name = feeInfo.accept_org_name;//受理机构
          this.appForm.accept_time = feeInfo.accept_time;//机构受理时间
          this.appForm.prosecute_amount = feeInfo.prosecute_amount;//起诉金额
          this.isDisabled = true;
        } else {
          this.isDisabled = false;
        }
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

      searchAccount() {
        if (!this.appForm.rece_account_type) {
          this.$message({
            type: "warning",
            message: "请选择收款账户类型"
          });
          return;
        } else {
          this.dialogVisible = true;
          this.currentPage = 1;
          this.getTableData();
        }
      },
      resetSearch() {
        this.strategyForm = {
          branchNo: "",//区域中心
          accountType: this.appForm.rece_account_type,//账户类型
          orgName: "",//机构名称
          receAccName: "",//收款账户名称
          receAccNo: "",//收款账户账号
        };
      },

      getTableData() {

        let params = {
          servicecode: "RLMSPLTS1064",
          branch: this.strategyForm.branch,
          accountType: this.appForm.rece_account_type,
          orgName: this.strategyForm.orgName,
          receAccName: this.strategyForm.receAccName,
          receAccNo: this.strategyForm.receAccNo,
          start: this.currentPage,
          length: this.tableSize,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res && res.code === "200") {
            this.tableData = res.data;
            this.tableTotal = res.pageParam ? res.pageParam.total : 0;
            this.isShowPage = true;
          }
        }).catch(err => {
          console.error(err);
        });
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

      selectRow(index, row) {
        this.appForm.rece_org_name = row.orgName;
        this.appForm.rece_acc_name = row.receAccName;
        this.appForm.rece_accno = row.receAccNo;
        this.appForm.bank_name = row.bank_name;
        this.appForm.bank_no = row.bank_no;
        this.dialogVisible = false;
        this.resetSearch();
      },

      radioChange() {
        if (this.appForm.adv_pay_status == '1') {
          this.isShow = true;
        }
        if (this.appForm.adv_pay_status == '0') {
          this.isShow = false;
        }
        this.appRules.payment_bill_type = [{required: this.isShow, message: "请输入支付凭证类型"}];
      },

      getOutInfo() {
        let params = {
          servicecode: "RLMSPLTS1400",
          oaOrgId: this.cParentParams.oa_org_id,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              const response = res.data.orgInfo;
              this.basicForm.branch_name = response.branchname;
              this.basicForm.org_type = response.orgType;
              this.basicForm.oa_org_name = response.oa_org_name;
            }
          })
          .catch(err => {
            console.error(err);
          })
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
                servicecode: "RLMSPLTS1404",
                lncfno: this.basicForm.lncfno,//借据号
                cust_no: this.basicForm.custno,//客户号
                cust_nm: this.basicForm.acctna,//客户名称
                idtfno: this.basicForm.idtfno,//证件号码
                phonno: this.basicForm.phonno,//手机号码
                prodcd: this.basicForm.prodcd,//产品代码
                prod_name: this.basicForm.prodna,//产品名称
                area_no: this.basicForm.zubhno,//区域中心
                clssst: this.basicForm.clssst,//贷款形态
                ovdays: this.basicForm.ovdays,//逾期天数
                isUnionLoan: this.basicForm.isUnionLoan,//是否联合贷
                unionComp: this.basicForm.unionComp,//联合贷公司名称
                noworg: this.basicForm.noworg,//当前委案机构

                accept_org_name: this.appForm.accept_org_name, // 受理机构
                accept_time: this.appForm.accept_time,//机构受理时间
                prosecute_amount: this.appForm.prosecute_amount,//起诉金额
                fee_type: this.appForm.fee_type,//费用类型
                pay_amount: this.appForm.pay_amount,//付款金额
                rece_account_type: this.appForm.rece_account_type,//收款账户类型
                rece_org_name: this.appForm.rece_org_name,//收款机构名称
                rece_acc_name: this.appForm.rece_acc_name,//收款账户名称
                rece_accno: this.appForm.rece_accno,//收款账户账号
                bank_name: this.appForm.bank_name,//开户行
                bank_no: this.appForm.bank_no,//开户行行号
                adv_pay_status: this.appForm.adv_pay_status,//垫付情况
                payment_bill_type: this.appForm.payment_bill_type,//支付凭证类型
                pay_remark: this.appForm.pay_remark,//打款附言
                jfsqmxd: this.appForm.jfsqmxd,//缴费申请明细单
                qtjfpz: this.appForm.qtjfpz,//其他缴费凭证

                zfpz: this.appForm.zfpz,//支付凭证
                fileList: this.appForm.fileList,//附件
                remark: this.appForm.remark,  //备注
              }
              if (this.appForm.commision_status != "0") {
                params.payment_bill_type = this.appForm.payment_bill_type;//支付凭证类型
                params.zfpz = this.appForm.zfpz;//支付凭证
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
        this.$confirm("是否确认重置?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.clearData();
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
            accept_org_name: "", // 受理机构
            accept_time: "",//机构受理时间
            prosecute_amount: "",//起诉金额
            fee_type: "",//费用类型
            pay_amount: "",//付款金额
            confirm: "",//确认金额
            rece_account_type: "",//收款账户类型
            rece_org_name: "",//收款机构名称
            rece_acc_name: "",//收款账户名称
            rece_accno: "",//收款账户账号
            bank_name: "",//开户行
            bank_no: "",//开户行行号
            adv_pay_status: "",//垫付情况
            payment_bill_type: "",//支付凭证类型
            pay_remark: "",//打款附言
            jfsqmxd: [],//缴费申请明细单
            qtjfpz: [],//其他缴费凭证
            zfpz: [],//支付凭证
            fileList: [],//附件
            remark: "", // 备注
          },
          this.$refs.jfsqmxdProp.clearFileList();//缴费申请明细单
        this.$refs.qtjfpzProp.clearFileList();//其他缴费凭证
        this.$refs.fileListProp.clearFileList();//其他附件
        this.$refs.zfpzProp.clearFileList();//支付凭证
        this.$refs["appForm"].resetFields();
        this.$refs.loanProp.clearData();//基本信息
      },

      /**
       * 添加文件回调
       * @param file 当前添加文件对象
       * @param fileList 已添加文件
       */
      zfpzChange(val) {//支付凭证
        this.appForm.zfpz = val;
      },
      jfsqmxdChange(val) {//缴费申请明细单
        this.appForm.jfsqmxd = val;
      },
      qtjfpzChange(val) {//其他缴费凭证
        this.appForm.qtjfpz = val;
      },
      fileListChange(val) {//附件
        this.appForm.fileList = val;
      },

      validateProseAmount(value, rule, callback) {
        if (!this.appForm.prosecute_amount) {
          return callback(new Error("请输入起诉金额"));
        } else {
          let reg = /^(([1-9]\d*)|(([0]\.\d{1,2}|[1-9]\d*\.\d{1,2})))$/;
          if (!reg.test(this.appForm.prosecute_amount)) {
            return callback(new Error("请输入正确金额"));
          } else {
            return callback();
          }
        }
      },
      validatePayAmount(value, rule, callback) {
        if (!this.appForm.pay_amount) {
          return callback(new Error("请输入付款金额"));
        } else {
          this.isShowConfirm = false;
          let reg = /^(([1-9]\d*)|(([0]\.\d{1,2}|[1-9]\d*\.\d{1,2})))$/;
          if (!reg.test(this.appForm.pay_amount)) {
            return callback(new Error("请输入正确金额"));
          } else if (parseFloat(this.appForm.pay_amount) > 500000) {
            return callback(new Error("付款金额不可以大于50W"));
          } else if (parseFloat(this.appForm.pay_amount) > 100000 && parseFloat(this.appForm.pay_amount) <= 500000) {
            this.isShowConfirm = true;
            return callback();
          } else {
            return callback();
          }
        }
      },
      validateConfirm(value, rule, callback) {
        if (this.isShowConfirm && !this.appForm.confirm) {
          return callback(new Error("请确认金额"));
        } else {
          return callback();
        }
      },

      zfpzValidate(value, rule, callback) {
        if (this.appForm.jfsqmxd.length === 0 && this.isShow) {
          return callback(new Error("请上传支付凭证"));
        }
        return callback();
      },
      jfsqmxdValidate(value, rule, callback) {
        if (this.appForm.jfsqmxd.length === 0) {
          return callback(new Error("请上传缴费申请明细单"));
        }
        return callback();
      },
      qtjfpzValidate(value, rule, callback) {
        if (this.appForm.qtjfpz.length === 0) {
          return callback(new Error("请上传其他缴费凭证"));
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
