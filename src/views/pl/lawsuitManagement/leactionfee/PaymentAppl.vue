<template>
  <div>
    <el-collapse v-model="activeNasmes" class="custom-common--collapse">
      <el-collapse-item name="1">
        <template slot="title">
          <span>
            <em></em>{{$i18ns('基本信息')}}
          </span>
        </template>
        <el-form
          ref="basicForm"
          :rules="rules"
          :model="basicForm"
          label-width="160px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$i18ns('借据号')" prop="loan_no" :rules="[{ required: true, message: $i18ns('请输入借据号') }]">
                <el-input
                  v-model="basicForm.loan_no"
                     suffix-icon="el-input__icon el-icon-search"
                  @click.native="openDialog"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('客户名称')" prop="cust_name">
                <el-input v-model="basicForm.cust_name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('客户号')" prop="cust_no">
                <el-input v-model="basicForm.cust_no" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('产品名称')" prop="prodna">
                <el-input v-model="basicForm.prodna" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('产品代码')" prop="prodcd">
                <el-input v-model="basicForm.prodcd" :disabled="true"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item :label="$i18ns('贷款状态')" prop="clssst">
                <el-select v-model="basicForm.clssst" :disabled="true" placeholder>
                  <el-option
                    v-for="(item, i) in clssstList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>
      </el-collapse-item>

       <el-collapse-item name="2">
        <template slot="title">
          <span><em></em>{{$i18ns('财务信息')}}</span>
        </template>
        <el-form
          ref="adjustForm"
          :rules="rules"
          :model="adjustForm"
          label-width="160px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$i18ns('本金合计')">
                <el-input v-model="adjustForm.prcpl_smtn"  :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('利息合计')">
                <el-input v-model="adjustForm.int_smtn" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('正常本金')">
                <el-input v-model="adjustForm.normal_princi"  :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('逾期本金')">
                <el-input v-model="adjustForm.overdue_princi" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('呆滞本金')" >
                <el-input v-model="adjustForm.stagnant_princi" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('呆账本金')" >
                <el-input v-model="adjustForm.uncollect_acct_princi" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('应收应计利息')">
                <el-input v-model="adjustForm.recv_accrued_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('催收应计利息')">
                <el-input v-model="adjustForm.collt_accrued_inst"  :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('应收欠息')">
                <el-input v-model="adjustForm.recv_debit_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('催收欠息')">
                <el-input v-model="adjustForm.collt_debit_inst"  :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('应收应计罚息')">
                <el-input v-model="adjustForm.recv_accrued_penalt_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('催收应计罚息')">
                <el-input v-model="adjustForm.collt_acrued_penalt_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('应收罚息')">
                <el-input v-model="adjustForm.recv_penalt_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('催收罚息')">
                <el-input v-model="adjustForm.collt_penalt_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('应计复息')">
                <el-input v-model="adjustForm.accrued_comp_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('复息')">
                <el-input v-model="adjustForm.compd_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <span><em></em>{{$i18ns('费用支付申请信息')}}</span>
        </template>
        <el-form
          ref="debtForm"
          :model="debtForm"
          label-width="160px"
          :rules="debtRules"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item
                prop="expense_type"
                :label="$i18ns('费用类型')"
                :rules="[{ required: true, message: '请选择费用类型' }]"
              >
                <el-select v-model="debtForm.expense_type" placeholder=" " @change="expenseChange">
                  <el-option
                    v-for="item in entryFeeTypeList"
                    :key="item.dictId"
                    :value="item.dictId"
                    :label="item.dictName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="debtForm.expense_type === '1'">
              <el-form-item
                :label="$i18ns('费用结算区间')"
                class="require-asterisk"
              >
                <el-row>
                  <el-col :span="11">
                    <el-form-item  prop="feeSettlementInter_Start" :rules="[{ required: true, message: '请选择费用结算开始时间' }]">
                      <el-date-picker
                        v-model="debtForm.feeSettlementInter_Start"
                        type="date"
                        value-format="yyyyMMdd"
                        :picker-options="pickerOptions"
                        placeholder="开始日期"
                        @change="startDateChange"
                        >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-form-item  prop="feeSettlementInter_end" :rules="[{ required: true, message: '请选择费用结算结束时间' }]">
                      <el-date-picker
                        v-model="debtForm.feeSettlementInter_end"
                        type="date"
                        value-format="yyyyMMdd"
                        :picker-options="pickerOptionsEnd"
                        placeholder="结束日期"
                        @change="endDateChange"
                        >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-if="debtForm.expense_type === '1'">
              <el-form-item :label="$i18ns('客户回款合计')" prop="custAmountTotal">
                <el-input v-model="debtForm.custAmountTotal" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8" v-if="debtForm.expense_type === '1'">
              <el-form-item
                :label="$i18ns('结算金额合计')"
                prop="settlement_amount_total"
                class="require-asterisk"
              >
                <el-input v-model="debtForm.settlement_amount_total"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                :label="$i18ns('付款金额')"
                prop="pay_amount"
                class="require-asterisk"
              >
                <el-input ref="amount" v-model="debtForm.pay_amount" v-bind:class="{ redActive: isRedActive,}" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                :label="$i18ns('账户类型')"
                prop="acctno_type"
                :rules="[{ required: true, message: '请选择账户类型' }]"
              >
                <el-select v-model="debtForm.acctno_type" placeholder=" " @change="payfeeTypeChange">
                  <el-option
                    v-for="item in payfeeTypeList"
                    :key="item.dictId"
                    :value="item.dictId"
                    :label="item.dictName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
            <el-row>
              <el-col :span="8" class="sel-button">
                <el-button type="primary" size="small" @click="selAccount">{{$i18ns('选择收款账户')}}</el-button>
              </el-col>
              <el-col :span="8">
                <el-form-item class="require-asterisk" :label="$i18ns('金额确认无误')" prop="confirm" v-show="isShowConfirm">
                  <el-checkbox v-model="debtForm.confirm" ></el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
          <div class="input-account-form">
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$i18ns('收款账户账号')" prop="rece_accno" :rules="[{ required: true, message: '请输入收款账户账号' }]">
                  <el-input v-model="debtForm.rece_accno" @change="getRemark" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$i18ns('收款账户名称')" prop="acct_name" :rules="[{ required: true, message: '请输入收款账户名称' }]">
                  <el-input v-model="debtForm.acct_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$i18ns('开户行')" prop="bank_no" :rules="[{ required: true, message: '请输入开户行' }]">
                  <el-input v-model="debtForm.bank_no" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="$i18ns('开户行名称')" prop="bank_name" :rules="[{ required: true, message: '请输入开户行名称' }]">
                  <el-input v-model="debtForm.bank_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                :label="$i18ns('费用模式')"
                prop="clen_mode"
              >
                <el-select v-model="debtForm.clen_mode" placeholder=" " >
                  <el-option
                    v-for="item in costModelsList"
                    :key="item.dictId"
                    :value="item.dictId"
                    :label="item.dictName"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item
                :label="$i18ns('打款附言')"
                prop="pay_remark"
              >
                <el-input
                  v-model="debtForm.pay_remark"
                  type="textarea"
                  :rows="3"
                  maxlength="200">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          </div>
        </el-form>
        <el-form
          :model="applyForm"
          :rules="applyRules"
          ref="applyForm"
          class="custom-common--form"
          label-width="160px"
        >
          <el-row>
            <el-col :span="12" v-show="false">
              <el-form-item
                class="require-asterisk"
                label="缴费申请明细单"
                prop="paymentApplDetail"

              >
                <upload-file
                  ref="uploadProp"
                  :uploadFileList="applyForm.paymentApplDetail"
                  :uploadDisabled="false"
                  @changeFile="changeUploadFile"
                  :key="timer"
                ></upload-file>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-show="false">
              <el-form-item
                class="require-asterisk"
                label="其他缴费凭证"
                prop="paymentDocuments"
                :rules="[
                  {
                    validator: this.paymentDocumentsValidate,
                    trigger: 'change',
                  },
                ]"
              >
                <upload-file
                  ref="changePaymentProp"
                  :uploadFileList="applyForm.paymentDocuments"
                  :uploadDisabled="false"
                  @changeFile="changePaymentFile"
                  :key="timer"
                ></upload-file>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$i18ns('备注')" prop="remark" >
                <el-input
                  type="textarea"
                  resize="none"
                  :rows="3"
                  v-model="applyForm.remark"
                  maxlength="200"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain :disabled="disabledSubmit"
        >{{$i18ns('提交')}}</el-button
      >
    </div>
    <el-collapse v-model="activeNames" class="custom-common--collapse">
      <el-collapse-item name='3' v-if="historyShow">
        <template slot="title">
          <span><em></em>费用支付申请历史</span>
        </template>
        <to-json
          toUrl="/views/fs/Payment/paymentApplHistory.json"
          :params="{ lncfno: basicForm.lncfno, isApply: isApply }"
          :key="jsontimer"
        ></to-json>
      </el-collapse-item>
    </el-collapse>
    <el-dialog title="账户查询" :visible.sync="accountDialogVisible" :show-close="true" width="1200px"
               :close-on-click-modal="false"
               :append-to-body="true">
      <div class="el-dialog-dev">
        <div class="container-content">
          <div class="container-content--search">
            <el-form :model="strategyForm" ref="strategyForm" label-width="150px" class="custom-common--form">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="收款账户名称"  prop="acct_name" >
                    <el-input v-model="strategyForm.acct_name"  class="input"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="收款账户账号"  prop="rece_accno">
                    <el-input v-model="strategyForm.rece_accno"  class="input"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item class="button">
                <div class="button" style="width:150px;float:right;">
                  <el-button type="primary" @click="searchAccount">查询</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
          <div class="container-centent--table">
            <el-table ref="multipleTable" :data="payTableData" :border="true" style="width: 100%" stripe>
              <el-table-column label="账户类型" prop="case_acceptance" :formatter="formatAccountTypeData" align="center"></el-table-column>
              <el-table-column label="受理机构编号" prop="ma_org_no" align="center"></el-table-column>
              <el-table-column label="收款账户名称" prop="acct_name" align="center"></el-table-column>
              <el-table-column label="收款账户账号" prop="acct_no" align="center"></el-table-column>
              <el-table-column label="开户行" prop="bank_name" align="center"></el-table-column>
              <el-table-column label="开户行行号" prop="bank_no" align="center"></el-table-column>
              <el-table-column label="操作" align="center" width="240">
                <template slot-scope="scope">
                  <el-button type="text" @click="selectRow(scope.$index,scope.row)">{{$i18ns('选择')}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="container-content--pagination">
            <el-pagination v-show="payTableData.length !== 0"
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
//import UploadFile from "@/views/pl/components/UploadFile.vue";
//import {validateHandle } from "../../other/loanPostManager/loanPostConstant/loanPostConstant";
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "PaymentAppl",
  components: {
 //   UploadFile,
  },
  data() {
    return {
       basicForm: {
        loan_no: "",
        cust_name: "",
        cust_no: "",
        idtfno: "",
        prodna: "",
        prodcd: "",
        applid: "",
        phonno: "",
        accoutage: "",
        isunitln: "",
        unitname: "",
        islgfe: "",
        debtpr: "",
        lncfno: "", //借据号
        acctNa: "", //客户名称
        custid: "", //客户编号
        phoneNo: "", //手机号码
        prodNa: "", //产品名称
        areacenter: "", //区域中心
        areaCenterName: "",//区域中心名称
        clssst: "", //贷款形态
        accountAge: "", //逾期天数
        unitedloan: "", //是否联合贷
        unitedloanCompany: "", //联合贷公司名称
        commissionOrg: "", //当前委案机构名称
        commissionStatus: "", //当前案件委案机构
        comlawsuitStatus: "", //当前案件诉讼状态
        loanbit: "", //欠款本金
        nowvorg: "", //当前委案机构编号
      },
      debtForm: {
        expense_type: "", //录入费用类型
        custAmountTotal: null, //客户回款合计
        settlement_amount_total: "", //结算金额合计
        payment: null, //付款金额
        payfeeType: "", //账户类型
        payfeeAmount: "", //选择收款账户
        playPostsrcipt: "", //打款附言
        costModels: "", //费用模式
        feeSettlementInter_Start: "",//费用结算开始区间
        feeSettlementInter_end: "",//费用结算结束区间
        receAccountName: "", //收款账户名称
        receAccountNo: "", //收款账户账号
        openBankNo: "", //开户行
        openBankName: "", //开户行名称
        confirm: "",
        acctno_type:"",
      },
      applyForm: {
        paymentApplDetail: [], //缴费申请明细单
        paymentDocuments: [], //其他缴费凭证
        remark: "", //备注
      },
            adjustForm: {
        servicecode: "pl0501",
        suitReason: "",
        remark: "",
        loan_no: "",
        cust_name: "",
        cust_no: "",
        prodna: "",
        prodcd: "",
        clssst: "",
        prcpl_smtn:"",//本金合计
        int_smtn:"",//利息合计
        normal_princi:"",//正常本金
        overdue_princi:"",//逾期本金
        stagnant_princi:"",//呆滞本金
        uncollect_acct_princi:"",//呆账本金
        recv_accrued_inst:"",//应收应计利息
        collt_accrued_inst:"",//催收应计利息
        recv_debit_inst:"",//应收欠息
        collt_debit_inst:"",//催收欠息
        recv_accrued_penalt_inst:"",//应收应计罚息
        collt_acrued_penalt_inst:"",//催收应计罚息
        recv_penalt_inst:"",//应收罚息
        collt_penalt_inst:"",//催收罚息
        accrued_comp_inst:"",//应计复息
        compd_inst:"",//复息
        dert_inst:"",//减免利息
        dert_amt:"",//减免本金
        apl_atchmt:"",//申请书附件
        cr_ivsgn_rept_atchmt:"",
        othr_evdc_atchmt:"",
        aply_adjust_reason:"",//申请原因
        chk_write_off_src_acct_num:"",//核销账号
        ccy_code:"",
        loan_form:""

      },
      strategyForm: {
        acct_name: "", //收款账户名称
        rece_accno: "", //收款账户账号
      },
      activeNasmes: ["1","2"],
      activeNames: ["3"],
      temLncfno: "", //暂存的借据号
      historyShow: false, //非宕账缴费历史显示与隐藏
      tableData: [], //非宕账缴费历史列表
      payTableData: [], //账户查询列表
      /**基本信息字典转译列表声明 */
      clssstList: [], //贷款形态列表
      isunitlnList: [], //是否联合贷列表
      entrust_statusList: [], //当前案件委案状态
      suit_statusList: [], //当前案件诉讼状态
      islgfeList: [], //是否法诉列表
      /**申请信息字典转译列表声明 */
      entryFeeTypeList: [], //费用类型列表
      payfeeTypeList: [], //账户类型列表

      disabledSubmit: false, //提交按钮置灰与否
    //   dialogVisible:false, //非宕账缴费历史详情弹窗显示与隐藏
      pickerOptions: {}, // 开始日期控件配置
      pickerOptionsEnd: {}, // 结束日期控件配置
      temdate: "", //临时结束时间
      temStartDate: "", //临时开始时间
      accountDialogVisible: false, //账户弹窗的显示与隐藏
      isShowPage: false, //账户弹窗的列表分页
      currentPage: 1, //当前页
      tableSize: 10, //每页条数
      tableTotal: null, //总条数
      jsontimer: "",
      isApply: "1", //判断是否为申请界面
      remarkInput: false,
      costModelsList: [],
      isRedActive:false,//付款金额字体颜色
      isShowConfirm: false,
      crdlnoa: "", //额度编号
    }
  },
  created() {



      this.getDictList("MS_E_LEVEL5_TYPE", "clssstList"); //贷款状态字典列表
      this.getDictList("E_YES___", "isunitlnList"); // 是否联合贷列表
      this.getDictList("E_YES___", "islgfeList"); // 是否法诉列表
      this.getDictList("E_ENTRUSTSTUS", "entrust_statusList"); // 当前案件委案状态列表
      this.getDictList("E_SUITSTUS", "suit_statusList"); // 当前案件诉讼状态列表
      this.getDictList("PL_E_EXPENSE_TYPE", "entryFeeTypeList"); // 费用类型列表
      this.getDictList("PL_E_ACCOUNT_TYPE", "payfeeTypeList"); //账户类型列表
      this.getDictList("PL_E_CLENMODE", "costModelsList"); //费用模式列表
      this.dateCheckOut();
      this.initRule();
  },
  methods: {
    initRule() {
      this.debtRules = {
        payment: [{validator: this.validatePayAmount, trigger: 'change'}],
        confirm: [{validator: this.validateConfirm, trigger: 'change'}],
        settlement_amount_total: [{validator: this.validateSettlementAmountTotal, trigger: 'change'}]
      }
    },
    /**
     * 费用区间校验
     */
    dateCheckOut() {
      if (this.basicForm.nowvorgnm !== "") {
        //结算开始时间必须大于当前委案时间
          let nowvTime = this.basicForm.nowvtime;
          let nowvdate = nowvTime.substring(0,10);
          this.pickerOptions.disabledDate = time => {
          let nowv = new Date(nowvdate).getTime();
          return (time.getTime() <= nowv || time.getTime() > Date.now());
        };
        this.pickerOptionsEnd.disabledDate = time => {
          let maxDate = Date.now();
          return time.getTime() > maxDate;
        };
      }else {
        if (this.temdate === "") {
          this.pickerOptions.disabledDate = time => {
            let maxDate = Date.now();
            return time.getTime() > maxDate;
          };
          console.log("this.temdate", this.temdate)
          this.pickerOptionsEnd.disabledDate = time => {
            let maxDate = Date.now();
            return time.getTime() > maxDate;
          };
        }else {
          console.log("this.temdate",this.temdate);
          this.pickerOptions.disabledDate = time => {
            let enddate = this.temdate.substring(0,4) + ',' + this.temdate.substring(4,6) + ',' + this.temdate.substring(6,8);
            let ms = new Date(enddate).getTime();
            return time.getTime() > ms;
          };
          this.pickerOptionsEnd.disabledDate = time => {
            let maxDate = Date.now();
            return time.getTime() > maxDate;
          };
        }
      }
      if (this.debtForm.feeSettlementInter_Start === "") {
        this.pickerOptionsEnd.disabledDate = time => {
          let maxDate = Date.now();
          return time.getTime() > maxDate;
        };
      }else{
          this.pickerOptionsEnd.disabledDate = time => {
            let startdate = this.temStartDate.substring(0,4) + ',' + this.temStartDate.substring(4,6) + ',' + this.temStartDate.substring(6,8);
            let maxDate = Date.now();
            return (time.getTime() > maxDate || time.getTime() < new Date(startdate).getTime());
          };
      }
    },
    endDateChange(val) {
      this.temdate = val;
      this.pickerOptions = {};
      // if (this.basicForm.nowvorgnm === "") {
      //   if (this.debtForm.feeSettlementInter_Start !== "" && parseFloat(this.debtForm.feeSettlementInter_Start) > parseFloat(val)) {
      //     this.$message({
      //       type: "warning",
      //       message: "结束时间不能小于开始时间"
      //     })
      //     this.debtForm.feeSettlementInter_Start = "";
      //   }
      //   this.pickerOptions = {};
      // }
      // else {
      //   if (this.debtForm.feeSettlementInter_Start !== "" && parseFloat(this.debtForm.feeSettlementInter_Start) > parseFloat(val)) {
      //     this.$message({
      //       type: "warning",
      //       message: "结束时间不能小于开始时间"
      //     })
      //     this.debtForm.feeSettlementInter_Start = "";
      //     this.debtForm.feeSettlementInter_end = "";
      //   }
      //   this.pickerOptions = {};
      // }
      this.dateCheckOut();
      this.getCustAmountTotal();
    },
    startDateChange(val) {
      this.pickerOptionsEnd = {};
      this.temStartDate = val;
      console.log(111111111111, parseFloat(this.debtForm.feeSettlementInter_end));
      if (parseFloat(this.debtForm.feeSettlementInter_end) < parseFloat(val)) {
        this.debtForm.feeSettlementInter_end = "";
      }
      this.dateCheckOut();
      this.getCustAmountTotal();
    },
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictType
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType],
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     *缴费申请明细单上传
     *@param val 当前上传的文件
     */
     changeUploadFile(val) {
       this.applyForm.paymentApplDetail = val;
     },
    /**
     *其他缴费凭证上传
     *@param val 当前上传文件
     */
    changePaymentFile(val) {
      this.applyForm.paymentDocuments = val;
    },
    /**
     * 区域中心列表获取
     */
    getSecondBranch(){
        let reqMap = {
            servicecode: "RLMSPLTS1068",
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
            if (res && res.code === "200") {
              this.areacenterList = res.data;
            }
        }).catch(err => {
            console.error(err);
        });
    },
    /**
     * 借据号失焦回调
     */
    lncfnoBlur() {
      if (this.basicForm.loan_no === "" || this.basicForm.loan_no === null) {
        return false;
      }
      this.temLncfno = this.basicForm.loan_no;
      if (!this.basicForm.loan_no) {
        return false;
      }
      // if (this.basicForm.loan_no) {
      //   this.cleartableinfo();
      // }
      this.getbaseInfo(); //获取基础信息
      this.getCostModels(); //获取费用模式
      this.getCrdlnoInfo(); //获取额度编号
    },

   openDialog() {
      const option = {
        toRequest: {
          url: "/views/pl/assetPreserve/query/select_hover_loan.json",
          method: "get",
          params: {
          "disposal_plan": "1",

          },
        },
        width: "50%",
        title: "法诉借据选择",
        that: this,
      };
      this.$dataBus.bindCallBackMethod(this, this.bringBack, option);
      //this.resetForm('loan_no');
      this.$dialog.open(option);

    },
    bringBack(formItem, returnData) {
      // let data = returnData.selectedData || returnData;
      let data = returnData;

      this.basicForm.loan_no = data["loan_no"];
      // this.$set(this.ruleForm, 'prod_type', data["prod_type"]);
      //字典渲染
             this.lncfnoBlur();

    },

    /**
     * 获取额度编号
     */
    getCrdlnoInfo() {
      let params = {
        servicecode: "RLMSPLTS1325",
        lncfno: this.temLncfno,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200" && res.data) {
          this.crdlnoa = res.data.loanInfo.crdlno;
        }
      }).catch(err=> {
        console.error(err);
      })
    },
    /**
     * 获取基础信息
     */
    getbaseInfo() {


      let params = {
        servicecode: "ln3100",
        loan_due_bill_num: this.basicForm.loan_no,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
             let data = res.data;
            this.basicForm.cust_name = data.cust_nm;
            this.basicForm.cust_no = data.cust_num; //客户号
            this.basicForm.prodna = data.prod_nm;
            this.basicForm.prodcd = data.prod_code; //产品代码
            this.basicForm.clssst = data.loan_form;

            this.basicForm.areaCenter = data.areaCenter;
            this.basicForm.areaCenterName = data.areaCenterName;
            this.basicForm.accoutage = data.accoutage;
            this.basicForm.isunitln = data.isunitln;
            this.basicForm.unitname = data.unitname;
            this.basicForm.islgfe = data.islgfe;
            this.basicForm.entrust_status = data.entrust_status;
            this.basicForm.suit_status = data.suit_status;
            this.basicForm.nowvorg = data.nowvorg;
            this.basicForm.jqstus = data.jqstus;
            this.basicForm.hxstus = data.hxstus;
            this.basicForm.ovdays = data.ovdays; //逾期天数
            this.basicForm.debtpr = data.debtpr; //欠款本金

             // 余额信息填充
            this.adjustForm.ccy_code = data.ccy_code_num;
            this.adjustForm.normal_princi=data.nrl_prcpl;
            this.adjustForm.accrued_comp_inst=data.acd_cmpd_int;
            this.adjustForm.compd_inst=data.cmpd_int;
            this.adjustForm.collt_acrued_penalt_inst=data.urge_collt_acd_pnly_int;
            this.adjustForm.overdue_princi=data.ovdue_prcpl;
            this.adjustForm.recv_accrued_inst=data.rcvbl_acd_int;
            this.adjustForm.recv_accrued_penalt_inst=data.rcvbl_acd_pnly_int;
            this.adjustForm.recv_penalt_inst=data.rcvbl_pnly_int;
            this.adjustForm.recv_debit_inst=data.rcvbl_db_int;
            this.adjustForm.stagnant_princi=data.stgnt_prcpl;
            this.adjustForm.uncollect_acct_princi=data.ucoltb_prcpl;
            this.adjustForm.collt_accrued_inst=data.urge_collt_acd_int;
            this.adjustForm.collt_debit_inst=data.urge_collt_db_int;
            this.adjustForm.collt_penalt_inst=data.urge_collt_pnly_int;
            this.adjustForm.prcpl_smtn=data.prcpl_smtn;
            this.adjustForm.int_smtn=data.int_smtn;
            this.adjustForm.loan_form=data.loan_form;


          }
        })
        .catch((err) => {
          console.error(err);
        });

    },
    /**
     * 委案申请带出费用模式
     */
    getCostModels() {
      let params = {
        servicecode: "RLMSPLTS1233",
        lncfno: this.temLncfno,
        filetypes: "1"
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200" && res.data) {
          console.log("321", res.data)
          this.debtForm.costModels = res.data[0].clenmode; //费用模式
        }
      }).catch(err =>{
        console.error(err);
      })
    },

          transformData() {
      let params = Object.assign(
        {},
        this.basicForm,
        this.debtInfoForm,
        this.applyForm,
        this.appForm,
        this.otherInfoForm,
        this.debtForm

      );
      params.spouseInfo = this.tableDataOne;
      return params;
    },

    submit() {
      this.validateList = [];
      const formList = ["basicForm", "debtForm"];
      // formList.forEach((item) => {
      //   this.validateList.push(validateHandle(item, this));
      // });
      Promise.all(this.validateList)
        .then((res) => {
       let params = this.transformData();
      params.servicecode = "pl0552";
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            let msg =  "提交成功";
            this.$msg({
              message: msg,
              type: "success"
            });
             this.$emit("update", {}),
                  (params.appl_id = res.data.appl_id),
                  (params.cust_name = res.data.cust_name),
                  (params.appl_state = res.data.appl_state),
                  (params.appl_date = res.data.appl_date),
                  (params.appId='plOnl'),
                  (params.wf_inst_id = res.data.wf_inst_id),
                  (params.task_inst_id = res.data.cur_task_id),
                  (params.proc_inst_id = res.data.cur_wfrl_id),
                  (params.frame_cd = res.data.task_url1),
                  // that.cParentScope.parentFormModel.custId = '';
                  this.$openNavTab(
                    "views/pl/workbench/workbench_wait_todo_view.json",
                    "待办事项办理",
                    params,
                    this
                  );
            this.basicForm.loan_no = "";
            this.clearHistory(); //清空信息
          }
        })
        .catch(err => {
          console.error(err);
        });
        }) .catch((err) => {
        this.$message({
          type: "warning",
          message: "校验不通过",
        });
      });


    },
    cleartableinfo() {
      this.crdlnoa ="";
      this.basicForm = {
        acctna: "", //客户名称
        custid: "", //客户编号
        idtfno: "", //证件号码
        phonno: "", //手机号码
        prodna: "", //产品名称
        areaCenter: "", //区域中心
        areaCenterName: "",//区域中心名称
        clssst: "", //贷款形态
        ovdays: "", //逾期天数
        isunitln: "", //是否联合贷
        unitname: "", //联合贷公司名称
        nowvorg: "", //当前委案机构编号
        nowvorgnm: "", //当前委案机构名称
        entrust_status: "", //当前案件委案机构
        suit_status: "", //当前案件诉讼状态
        debtpr: "", //欠款本金
        islgfe: "", //是否法诉
        nowvtime: "", //当前委案时间
        crdlno: "", //额度编号
      },
      this.debtForm = {
        expense_type: "", //录入费用类型
        custAmountTotal: null, //客户回款合计
        settlement_amount_total: "", //结算金额合计
        payment: null, //付款金额
        payfeeType: "", //账户类型
        payfeeAmount: "", //选择收款账户
        playPostsrcipt: "", //打款附言
        feeSettlementInter_Start: "",//费用结算开始区间
        feeSettlementInter_end: "",//费用结算结束区间
        receAccountName: "", //收款账户名称
        receAccountNo: "", //收款账户账号
        openBankNo: "", //开户行
        openBankName: "", //开户行名称
        confirm: "",
      },
      this.applyForm = {
        remark: "", //备注
      }
      this.strategyForm = {
        acct_name: "", //收款账户名称
        rece_accno: "", //收款账户账号
      }
      this.$refs["debtForm"].resetFields();
      this.$refs["basicForm"].resetFields();
      this.$refs["applyForm"].resetFields();
      this.$refs.uploadProp.clearFileList();
      this.$refs.changePaymentProp.clearFileList();
    },
    /**
     * 付款金额触发校验
     * @param val 当前付款金额
     */
      validatePayAmount(value, rule, callback) {
        if (!this.debtForm.payment) {
          return callback(new Error("请输入付款金额"));
        } else {
          this.isShowConfirm = false;
          if(parseFloat(this.debtForm.payment) <= 0){
            return callback(new Error("付款金额必须大于0"));
          }
          let reg = /^(([1-9]\d*)|(([0]\.\d{1,2}|[1-9]\d*\.\d{1,2})))$/;
          if (!reg.test(this.debtForm.payment)) {
            return callback(new Error("请输入正确金额"));
          } else if (parseFloat(this.debtForm.payment) > 500000) {
            this.isRedActive = false;
            return callback(new Error("付款金额不可以大于50W"));
          } else if(parseFloat(this.debtForm.payment) >= 10000 && parseFloat(this.debtForm.payment) < 100000){
            this.isRedActive = true;
            this.$message({
              type: "warning",
              message: "提示:当前付款金额大于等于1万,请注意!"
            });
            return callback();
          }else if (parseFloat(this.debtForm.payment) >= 100000 && parseFloat(this.debtForm.payment) <= 500000) {
            this.isRedActive = false;
            this.isShowConfirm = true;
            return callback();
          } else {
            this.isRedActive = false;
            return callback();
          }
        }
      },
      validateConfirm(value, rule, callback) {
        if (this.isShowConfirm && !this.debtForm.confirm) {
          return callback(new Error("请确认金额"));
        } else {
          return callback();
        }
      },
    validateSettlementAmountTotal(value, rule, callback) {
        if (!this.debtForm.settlement_amount_total) {
          return callback(new Error("请输入结算金额合计"));
        } else {
          if(parseFloat(this.debtForm.settlement_amount_total) <= 0){
            return callback(new Error("结算金额合计必须大于0"));
          }
          let reg = /^(([1-9]\d*)|(([0]\.\d{1,2}|[1-9]\d*\.\d{1,2})))$/;
          if (!reg.test(this.debtForm.settlement_amount_total)) {
            return callback(new Error("请输入正确结算金额合计"));
          } else {
            return callback();
          }
        }
    },
    // paymentAmountChange(val) {
    //   this.disabledSubmit = false;
    //   if (parseFloat(val) < 0 || parseFloat(val) === 0) {
    //     this.$message({
    //       type: "warning",
    //       message: "付款金额必须大于0！"
    //     })
    //     this.debtForm.payment = null;
    //   }else if(parseFloat(val) > 500000) {
    //     this.$message({
    //       type: "warning",
    //       message: "付款金额不可以大于500000",
    //     })
    //     this.debtForm.payment = this.nubFormat(parseFloat(this.debtForm.payment),2);
    //     this.disabledSubmit = true;
    //   }else if( parseFloat(val) <= 500000 && parseFloat(val) > 100000) {
    //     this.$confirm("金额确认无误?","提示",{
    //       type: "warning",
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //     }).then(()=> {
    //       this.$message({
    //         type: "success",
    //         message: "已确认",
    //       })
    //       return this.debtForm.payment = this.nubFormat(parseFloat(this.debtForm.payment),2);
    //     })
    //     .catch(()=> {
    //       this.$message({
    //         type: "error",
    //         message: "取消确认，请重新输入付款金额！"
    //       })
    //       return this.debtForm.payment = null;
    //     })
    //   }else if( parseFloat(val) >= 10000 && parseFloat(val) < 100000) {
    //     this.$message({
    //       type: "warning",
    //       message: "当前付款金额大于等于1万，请注意！",
    //     })
    //     this.debtForm.payment = this.nubFormat(parseFloat(this.debtForm.payment),2);
    //   }else if (this.debtForm.payment === "") {
    //     this.debtForm.payment = null;
    //   }else if (parseFloat(this.nubFormat(parseFloat(val),2)) === 0) {
    //     this.debtForm.payment = null;
    //   }
    //   else {
    //     this.debtForm.payment = this.nubFormat(parseFloat(this.debtForm.payment),2);
    //   }
    // },
    // viewClick() {
    //   this.dialogVisible = true;
    // },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    /**
     * 数字格式化成金额
     * @param  金额
     * @param 小数点后面有几位
     *
     */
    nubFormat(s, n) {
      n = n > 0 && n <= 20 ? n : 2;
      if (this.isInteger(s)) {
        return parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
      }else {
        let a = (s + "").replace(/[^\d\.-]/g, "");
        console.log("a", a)
        s = parseFloat(a.substring(0,a.indexOf(".")+(n+1))) + "";
      }
      var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
        if (!r) {
          r = '00';
        }
      var t = "";
      for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "" : ""); //加分隔符
      }
      return (t.split("").reverse().join("") +"." +r);
    },
    /**
     * 判断数字是整数
     */
    isInteger(obj) {
      return typeof obj === 'number' && obj%1 === 0; //是整数返回true，否则false
    },
    /**
     * 账户弹窗选择带回
     */
    selectRow(index, row) {
      this.debtForm.acct_name = row.acct_name;
      this.debtForm.rece_accno = row.acct_no;
      this.debtForm.bank_name = row.bank_name;
      this.debtForm.bank_no = row.bank_no;
      this.accountDialogVisible = false;
      this.getRemark();
    },
    getRemark() {
      if (this.basicForm.nowvorgnm !== this.debtForm.receAccountName) {
        // this.$message({
        //   type: "warning",
        //   message: "收款账户与当前委案机构不一致，请再次核实确认,如需申请请注明原因",
        // })
          this.remarkInput = true;
      }
    },
    /**
     * 打开账户查询弹窗
     */
    selAccount() {
      if (this.debtForm.acctno_type === "" || this.debtForm.acctno_type === null) {
        this.$message( {
          type: "warning",
          message: "请选择账户类型"
        })
      }else {
        this.accountDialogVisible = true;
        this.getAccTableData();
      }
    },
    /**
     * 获取账户查询弹窗列表
     */
    getAccTableData() {
      let params = {
        servicecode: "pl0550",
        case_acceptance: this.debtForm.acctno_type, //账户类型
        acct_name: this.strategyForm.acct_name,//收款账户名称
        rece_accno: this.strategyForm.rece_accno,//收款账户账号

      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          this.payTableData = res.data;
          this.tableTotal = res.pageParam ? res.pageParam.total : 0;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    /**
     * 分页sizeChange 回调
     */
    sizeChange(val) {
      this.tableSize = val;
      this.getAccTableData();
    },
    /**
     * 分页currentChange回调
     */
    currentChange(val) {
      this.currentPage = val;
      this.getAccTableData();
    },
    /**
     * 账户类型数据字典转译
     */
    formatAccountTypeData(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.payfeeTypeList.forEach(function (item, index) {
        if (data == item.dictId) {
          name = item.dictName;
        }
      })
      return name;
    },
    paymentDocumentsValidate(value, rule, callback) {
       if (this.applyForm.paymentDocuments.length === 0) {
          return callback(new Error("请上传附件"));
        }return callback();
    },
    paymentApplDetailValidate(value, rule, callback) {
       if (this.applyForm.paymentApplDetail.length === 0) {
          return callback(new Error("请上传附件"));
        }return callback();
    },
    getCustAmountTotal() {
      this.debtForm.custAmountTotal = [];
        let params = {
            servicecode: "CORELNTS9285",
            lncfno: this.basicForm.lncfno,
            acmode: "PASV",
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
            if (res && res.code === "200" && res.data) {
                console.log("111111111111", res.data);
                let custTotal = res.data;
                let a = 0;
                if (this.debtForm.feeSettlementInter_Start !== "" && this.debtForm.feeSettlementInter_end !== "") {
                    custTotal.forEach(item => {
                        if (parseFloat(item.trandt) >= parseFloat(this.debtForm.feeSettlementInter_Start) && parseFloat(item.trandt) <= parseFloat(this.debtForm.feeSettlementInter_end)) {
                            a = this.sumCalc(a,parseFloat(item.totamo));
                            this.debtForm.custAmountTotal = a;
                        }
                    })
                }
            }
        }).catch(err => {
            console.error(err);
        })
    },
    /**
     * 多值求和
     */
    sumCalc() {
      let list = [...arguments];
      list = list.map(item => Number(item));
      var s = 0;
      list.forEach(item => (s += item));
      return Number(s).toFixed(2);
    },
    /**
     * 结算金额合计检验
     */
    setTotalChange(val) {
      if (parseFloat(this.debtForm.settlement_amount_total) < 0 || parseFloat(this.debtForm.settlement_amount_total) === 0) {
        this.$message({
          type: "warning",
          message: "结算金额合计必须大于0！",
        });
        this.debtForm.settlement_amount_total = null;
      }
      else if (this.debtForm.settlement_amount_total === "") {
        this.debtForm.settlement_amount_total = null;
      }else if (parseFloat(this.nubFormat(parseFloat(val),2)) === 0) {
        this.debtForm.settlement_amount_total = null;
      }else {
        this.debtForm.settlement_amount_total = this.nubFormat(parseFloat(this.debtForm.settlement_amount_total),2);
      }
    },
    /**
     * 数字格式化成金额
     * @param  金额
     * @param 小数点后面有几位
     *
     */
    nubFormat(s, n) {
      n = n > 0 && n <= 20 ? n : 2;
      if (this.isInteger(s)) {
        return parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
      }else {
        let a = (s + "").replace(/[^\d\.-]/g, "");
        console.log("a", a)
        s = parseFloat(a.substring(0,a.indexOf(".")+(n+1))) + "";
      }
      var l = s.split(".")[0].split("").reverse(),
        r = s.split(".")[1];
        if (!r) {
          r = '00';
        }
      var t = "";
      for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "" : ""); //加分隔符
      }
      return (t.split("").reverse().join("") +"." +r);
    },
    /**
     * 判断数字是整数
     */
    isInteger(obj) {
      return typeof obj === 'number' && obj%1 === 0; //是整数返回true，否则false
    },
    /**
     * 费用类型触发
     */
    expenseChange() {
      if (this.debtForm.expense_type === "") {
        return false;
      }
      if (!this.debtForm.expense_type) {
        return false;
      }
      if (this.debtForm.expense_type !== "") {
        this.debtForm.feeSettlementInter_Start = "";
        this.debtForm.feeSettlementInter_end = "";
        this.debtForm.custAmountTotal = "";
        this.debtForm.settlement_amount_total = "";
      }
    },
    payfeeTypeChange() {
      this.debtForm.receAccountNo = "";
      this.debtForm.receAccountName = "";
      this.debtForm.openBankNo = "";
      this.debtForm.openBankName = "";
    },
        /**
         * 查询按钮回调
         */
        searchAccount() {
          this.$refs.strategyForm.validate((valid) => {
            if (valid) {
              this.payTableData = _.cloneDeep(this.strategyForm);
              this.start = 1;
              this.getAccTableData();
            } else {
              this.$message.error({
                type: "warning",
                message: "校验不通过"
              })
            }
          })
        },
  }
}
</script>
<style lang="less" scoped>
  .input-account-form {
    border: 1px solid #f0f2f5;
    padding: 20px 16px 20px 0px;
    margin: 12px 568px 20px 5px;
  }
  .sel-button {
    padding-left: 169px;
    padding-top: 10px;
  }
  .line {
    padding-left: 13px;
  }
  /deep/.payment-input-inner {
    .el-input__inner {
      color: red;
    }
  }
  .container-content--pagination{
      float: right;
      padding: 10px;
  }
  .redActive {
  -webkit-text-fill-color: red;
  }
</style>
