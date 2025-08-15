<template>
  <div>
    <div>
      <el-collapse v-model="activeNames">
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
        <el-collapse-item name="3">
          <template slot="title">
            <span><em></em>{{$i18ns('申请信息')}}</span>
          </template>
          <div class="custom-common--footer" >
          <!--  <span style="color:red" >提示:(1)请优先缴纳诉讼费，如确有必要请注明原因<br/>
            (2)如果存在相同费用类型的缴费已在流程中，需要核实确认，如需申请请注明原因<br/>
            (3)如果收款账户与当前委案机构不一致，需要核实确认，如需申请请注明原因<br/>
              </span>-->
          </div>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="250px" class="custom-common--form">
            <el-row style="text-align:left;color:red">
              <el-col :span="24">
              <el-form-item  label="">
                <span slot="label" style="text-align:left;color:red">{{$i18ns('提示：')}}</span>
                <span>{{$i18ns('①请优先缴纳诉讼费，如确有必要请注明原因')}}<br/></span>
                <span>{{$i18ns('②如果存在相同费用类型的缴费已在流程中，需要核实确认，如需申请请注明原因')}}<br/></span>
                <span>{{$i18ns('③如果收款账户与当前委案机构不一致，需要核实确认，如需申请请注明原因')}}<br/></span>
              </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item  :label="$i18ns('案号')" prop="case_no" v-show="false">
                  <el-input v-model="appForm.case_no" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="require-asterisk" :label="$i18ns('费用类型')" prop="fee_type" >
                  <el-select v-model="appForm.fee_type" @change="feeTypeChange">
                    <el-option v-for="item in feeTypeList" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"/>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="require-asterisk" :label="$i18ns('付款金额')" prop="pay_amount" >
                  <el-input ref="amount" v-model="appForm.pay_amount" v-bind:class="{ redActive: isRedActive,}"  ></el-input>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
             <!-- <el-col :span="8">
                <el-form-item class="require-asterisk" label="收款方类型:" prop="rece_account_type">
                  <el-select v-model="appForm.rece_account_type"  placeholder=" " @change="payfeeTypeChange">
                    <el-option v-for="item in account_TypeList" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"/>
                  </el-select>
                </el-form-item>
              </el-col>-->
              <el-col :span="9">
                <el-form-item class="require-asterisk" :label="$i18ns('收款账户账号')" prop="rece_accno" >
                  <el-input v-model="appForm.rece_accno">
                    <el-button slot="append" icon="el-icon-search" type="primary" @click="searchAccount"  plain>{{$i18ns('选择')}}</el-button>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="require-asterisk" :label="$i18ns('金额确认无误')" prop="confirm" v-show="isShowConfirm">
                  <el-checkbox v-model="appForm.confirm" ></el-checkbox>
                </el-form-item>
              </el-col>
            <!--</el-row>
            <el-row>-->
              <el-col :span="8">
                <el-form-item class="require-asterisk" :label="$i18ns('收款机构名称')" prop="rece_org_name">
                  <el-input v-model="appForm.rece_org_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              </el-row>
              <el-row>
              <el-col :span="8">
                <el-form-item class="require-asterisk" :label="$i18ns('收款账户名称')" prop="acct_name">
                  <el-input v-model="appForm.acct_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item class="require-asterisk" :label="$i18ns('开户行')" prop="other_acct_bank_name">
                  <el-input v-model="appForm.other_acct_bank_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item class="require-asterisk" :label="$i18ns('开户行行号')" prop="bank_no">
                  <el-input v-model="appForm.bank_no" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="require-asterisk" :label="$i18ns('垫付情况')" prop="adv_pay_status">
                  <el-radio-group v-model="appForm.adv_pay_status">
                    <el-radio v-for="(item,i) in advPayStatusList" :key="i" :label="item.dictId" @change="radioChange">
                      {{item.dictName}}
                    </el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item class="require-asterisk" :label="$i18ns('支付凭证类型')" prop="payment_bill_type" v-show="isShow">
                  <el-select v-model="appForm.payment_bill_type">
                    <el-option v-for="item in paymentBillTypeList" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" v-show="false">
                <el-form-item class="require-asterisk" :label="$i18ns('缴费申请明细单')" prop="jfsqmxd">
                  <upload-file ref="jfsqmxdProp" :uploadFileList="appForm.jfsqmxd" :uploadDisabled="false" @changeFile="jfsqmxdChange"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-show="false">
                <el-form-item class="require-asterisk" :label="$i18ns('其他缴费凭证')" prop="qtjfpz">
                  <upload-file ref="qtjfpzProp" :uploadFileList="appForm.qtjfpz" :uploadDisabled="false" @changeFile="qtjfpzChange"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$i18ns('其他附件')" prop="fileList" v-show="false">
                  <upload-file ref="fileListProp" :uploadFileList="appForm.fileList" :uploadDisabled="false"  @changeFile="fileListChange"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item class="require-asterisk" :label="$i18ns('支付凭证')" prop="zfpz" v-show="false">
                  <upload-file ref="zfpzProp" :uploadFileList="appForm.zfpz" :uploadDisabled="false"  @changeFile="zfpzChange"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item :label="$i18ns('打款附言')" prop="pay_remark">
                  <el-input type="textarea" maxlength="200" v-model="appForm.pay_remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16" v-show="!remarkShow&&!remarkShowot&&!remarkShowft">
                <el-form-item  :label="$i18ns('备注:')" prop="remark">
                  <el-input type="textarea" maxlength="200" v-model="appForm.remark"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16" v-show="remarkShow||remarkShowot||remarkShowft">
                <el-form-item  :label="$i18ns('备注:')" class="require-asterisk" prop="remarkot">
                  <el-input type="textarea" maxlength="200" v-model="appForm.remarkot"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="custom-common--footer">
            <el-button type="primary" size="small" @click="submit" plain>{{$i18ns('提交')}}</el-button>
            <el-button size="small" @click="reset">{{$i18ns('重置')}}</el-button>
          </div>
        </el-collapse-item>
        <el-collapse-item name="3" v-show="false">
          <template slot="title">
            <span><em></em>缴费申请历史</span>
          </template>
          <div class="container-centent--table">
            <el-table ref="multipleTable" :data="payTableData" :border="true" style="width: 100%" stripe>
              <el-table-column label="申请单编号" prop="appl_id" align="center"></el-table-column>
              <el-table-column label="费用类型" prop="fee_type" :formatter="formatFeeTypeData" align="center"></el-table-column>
              <el-table-column label="费用金额" prop="pay_amount" align="center"></el-table-column>
              <el-table-column :label="$i18ns('申请人')" prop="tranus" align="center"></el-table-column>
              <el-table-column :label="$i18ns('申请时间')" prop="gmt_create" align="center"></el-table-column>
              <el-table-column label="结案时间" prop="gmt_modified"  :formatter="formatDate"  align="center"></el-table-column>
              <el-table-column label="实际支付状态" prop="pay_status" :formatter="formatPayTypeData" align="center"></el-table-column>
              <el-table-column label="状态"  prop="appl_status"  align="center" width="240"  :formatter="statusFormat" > </el-table-column>
              <el-table-column label="操作"  align="center" width="240">
                <template slot-scope="scope">
                  <el-button type="text" @click="selectMesg(scope.$index,scope.row)"  plain>{{$i18ns('查看')}}详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
      </el-collapse>
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
                  <el-form-item label="收款账户名称"  prop="acct_name" >
                    <el-input v-model="strategyForm.receAccName"  class="input"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="收款账户账号"  prop="acct_no">
                    <el-input v-model="strategyForm.receAccNo"  class="input"></el-input>
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
            <el-table ref="multipleTable" :data="tableData" :border="true" style="width: 100%" stripe>
              <el-table-column label="账户类型" prop="acct_type" :formatter="formatAccountTypeData" align="center"></el-table-column>
              <el-table-column label="机构名称" prop="ma_org_no" align="center"></el-table-column>
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
    <el-dialog
      title="缴费申请详情"
      :visible.sync="ApplyInfoVisible"
      v-if="ApplyInfoVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      width = "75%"
      size="100%"
      :append-to-body="true">
          <pay-apply-info :applid="this.appl_id" />
    </el-dialog>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import {
    validateHandle,
  } from "@/views/other/loanPostManager/loanPostConstant/loanPostConstant.js";
  //import UploadFile from "@/views/pl/components/UploadFile.vue";
  //import payApplyInfo from "../payapply/payApplyInfo";
  export default {
    name: "payApply",
    components: {
     // UploadFile,
     // payApplyInfo,
    },
    formData : { // 基础信息表单对象
      lncfno: "",//借据号
      custno: "",//客户号
      acctna: "",//客户名称
      idtfno: "",//证件号码
      phonno: "",//手机号码
      prodcd: "",//产品代码
      prodna: "",//产品名称
      zubhna: "",
      zubhno: "",//区域中心
      clssst: "",//贷款形态
      ovdays: "",//逾期天数
      isUnionLoan: "",//是否联合贷
      unionComp: "",//联合贷公司名称
      noworg: "",//当前委案机构
      nowcasetime:"",//当前委案时间
    },
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对
      formData : { // 基础信息表单对象
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
        nowcasetime:"",//当前委案时间
      },
      propDisabled : false,
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
        islgfe: "", //是否法诉
        nowvorg: "", //当前委案机构编号
      },
                  adjustForm: {
        servicecode: "pl0501",
        suitReason: "",
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
        remark:"",//备注
        aply_adjust_reason:"",//申请原因
        chk_write_off_src_acct_num:"",//核销账号
        ccy_code:"",
        loan_form:""

      },
        appForm: {
          ma_org_no:"",
          // accept_org_name: "", // 受理机构
          case_times: "",//机构受理时间
          opinion_arrears: "",//起诉金额
          fee_type: "",//费用类型
          pay_amount: "",//付款金额
          confirm: "",//确认金额
          // rece_account_type: "",//收款账户类型
          rece_org_name: "",//收款机构名称
          acct_name: "",//收款账户名称
          rece_accno: "",//收款账户账号
          bank_name: "",//开户行
          bank_no: "",//开户行行号
          adv_pay_status: "",//垫付情况
          payment_bill_type: "",//支付凭证类型
          pay_remark: "",//打款附言
          // jfsqmxd: [],//缴费申请明细单
          // qtjfpz: [],//其他缴费凭证
          // zfpz: [],//支付凭证
          // fileList: [],//附件
          remark: "", // 备注
          // remarkot:"",
          // case_no:"",
        },
        strategyForm: {
          org_no :"",
          branchNo: "",//区域中心
          accountType: "",//账户类型
          org_name: "",//机构名称
          receAccName: "",//收款账户名称
          receAccNo: "",//收款账户账号
        },
        payTableData:[],
        currentPage: 1,
        tableSize: 10,
        tableTotal: 10,
        isShowPage: false,
        isShow: false,
        remarkShow:false,
        remarkShowot:false,
        remarkShowft:false,
        isShowConfirm: false,
        checkAmount:false,
        isDisabled: false,
        clssstList: [],   //贷款形态
        orgList: [],   //受理机构
        feeTypeList: [],//费用类型
        feeTypeLists: [],
        accountTypeList: [],//账户类型
        account_TypeList:[],//收款方类型
        advPayStatusList: [],//垫付情况
        paymentBillTypeList: [],//支付凭证类型
        dialogVisible: false,
        activeNames: ["1", "2", "3"],
        compareCustomerInfo: "",
        isRedActive:false,//付款金额字体颜色
        entrust_statusList:[],//当前案件委案状态列表
        suit_statusList:[],//当前案件诉讼状态列表
        isunitlnList:[],
        ApplyInfoVisible: false,
        showApplyInfo:false,
        appl_id:"",
        payStatusList:[],
      }
    },
    created() {
      this.isDisabled = this.propDisabled;
      this.getDictList("PL_E_PAY_STATUS","payStatusList");
      this.getDictList("MS_E_LEVEL5_TYPE", "clssstList"); // 初始化贷款形态数据字典
      this.getDictList("PL_E_FEE_TYPE", "feeTypeList"); // 费用类型
      this.getDictList("PL_E_ACCOUNTYPE", "accountTypeList"); // 账户类型
      this.getDictList("PL_E_ADV_PAY_STATUS", "advPayStatusList"); // 垫付情况
      this.getDictList("PL_E_PAYMENT_BILL_TYPE", "paymentBillTypeList"); // 支付凭证类型
      this.getDictList("PL_E_ENTRUSTSTUS", "entrust_statusList"); // 当前案件委案状态列表
      this.getDictList("PL_E_SUITSTUS", "suit_statusList"); // 当前案件诉讼状态列表
      this.getDictList("E_YES___", "isunitlnList"); // 是否联合贷列表
      this.getDictList("E_YES___", "isunitlnList"); // 是否联合贷列表
      //this.getOrgList();
      this.getDictList("PL_E_ACCOUNT_TYPE", "account_TypeList"); // 账户类型
      this.initRule();
    },

    methods: {
      initRule() {
        this.appRules = {
          org_no: [{required: true, message: "请输入受理机构"}],
          accept_time: [{required: true, message: "请输入机构受理时间"}],
          fee_type: [{required: true, message: "请输入费用类型"}],
          pay_amount: [{validator: this.validatePayAmount, trigger: 'change'}],
          confirm: [{validator: this.validateConfirm, trigger: 'change'}],
          //rece_account_type: [{required: true, message: "请输入收款账户类型"}],
          rece_org_name: [{required: true, message: "请输入收款机构名称"}],
          rece_acc_name: [{required: true, message: "请输入收款账户名称"}],
          rece_accno: [{required: true, message: "请输入收款账户账号"}],
          bank_name: [{required: true, message: "请输入开户行"}],
          bank_no: [{required: true, message: "请输入开户行行号"}],
          adv_pay_status: [{required: true, message: "请输入垫付情况"}],
          payment_bill_type: [{required: this.isShow, message: "请输入支付凭证类型"}],
          // zfpz: [{validator: this.zfpzValidate, trigger: 'change'}],
          // jfsqmxd: [{validator: this.jfsqmxdValidate, trigger: 'change'}],
          // qtjfpz: [{validator: this.qtjfpzValidate, trigger: 'change'}],
        }
      },
      lncfnoBlur() {
        // if (this.basicForm.lncfno === "" || this.compareCustomerInfo === this.basicForm.lncfno) {
        //   return false;
        // }
        this.compareCustomerInfo = this.basicForm.loan_no;
        this.getLoanInfo();
        //this.feeTypeChange();
        //this.getCheckOutfeeType();
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


      getLoanInfo() {
        let params = {
          servicecode: "ln3100",
        loan_due_bill_num: this.basicForm.loan_no,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
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
            // //账户信息
            // this.otherInfoForm.rpacno = data.rpacno; //默认退还账号
            // this.otherInfoForm.derana = data.derana; //默认退还账户户名
            // this.otherInfoForm.rpacbr = data.rpacbr; //默认退还账户行号
            // this.otherInfoForm.atbkna = data.atbkna; //退还账户开户行名称
            // this.otherInfoForm.atbkpr = data.atbkpr; //退还账户开户行所在省
            // this.otherInfoForm.atbkci = data.atbkci; //退还账户开户行所在市

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

            }else{
              this.clearData();
            }
          })
          .catch(err => {
            this.compareCustomerInfo = "";
            this.clearData();
            console.error(err);
          })
      },


      clearData(){
        this.compareCustomerInfo = "";
        this.basicForm={ // 基础信息表单对象
          lncfno: "",//借据号
          custno: "",//客户号
          acctna: "",//客户名称
          idtfno: "",//证件号码
          phonno: "",//手机号码
          prodcd: "",//产品代码
          prodna: "",//产品名称
          zubhno: "",//区域中心
          zubhna: "",//区域中心
          clssst: "",//贷款形态
          ovdays: "",//逾期天数
          isUnionLoan: "",//是否联合贷
          unionComp: "",//联合贷公司名称
          noworg: "",//当前委案机构
        };
        this.appForm = {
          org_no:"",
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
          remarkot:"",
          case_no:"",
        };
        this.$refs.jfsqmxdProp.clearFileList();
        this.$refs.qtjfpzProp.clearFileList();
        this.$refs.zfpzProp.clearFileList();
        this.$refs.fileListProp.clearFileList();
        this.payTableData = [];
      },
      selectMesg(index, row){
        this.appl_id = row.appl_id;
        this.showApplyInfo = true;
        this.ApplyInfoVisible = true;
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
        // if (!this.appForm.rece_account_type) {
        //   this.$message({
        //     type: "warning",
        //     message: "请选择收款方类型"
        //   });
        //   return;
        // } else {
          this.dialogVisible = true;
          this.currentPage = 1;
          this.getTableData();
        //}
      },
      resetSearch() {
        this.strategyForm = {
          branchNo: "",//区域中心
          rece_account_type: this.appForm.rece_account_type,//账户类型
          orgName: "",//机构名称
          acct_name: "",//收款账户名称
          rece_accno: "",//收款账户账号
        };
      },

      getTableData() {

        let params = {
          servicecode: "pl0550",
          /*branch: this.strategyForm.branch,
          accountType: this.appForm.rece_account_type,
          orgName: this.strategyForm.orgName,
          receAccName: this.strategyForm.receAccName,
          receAccNo: this.strategyForm.receAccNo,
          start: this.currentPage,
          length: this.tableSize,*/
          org_no:this.appForm.org_no,
          acct_type: this.appForm.rece_account_type,
          acct_name: this.strategyForm.acct_name,//收款账户名称
          acct_no: this.strategyForm.rece_accno,//收款账户账号

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
            name =  item.dictName;
          }
        })
        return name;
      },
      formatDate(row, column){
        let status = row["appl_status"];
        if(status != "1" && status != "2" && status != "4"){
          return "";
        }else{
          return  row[column.property];
        }
      },
      statusFormat(row, column) {
        let status = row[column.property];
        let stutusStr = "";
        if(status === "0"){
          stutusStr = "处理中";
        }
        else if(status === "1"){
          stutusStr = "通过";
        }
        else if(status === "2"){
          stutusStr = "拒绝";
        }
        else if(status === "3"){
          stutusStr = "已保存";
        }
        else{
          stutusStr = "已取消";
        }
        return stutusStr;
      },


      formatFeeTypeData(row, column) {
        let name = row[column.property];
        let data = row[column.property];
        this.feeTypeList.forEach(function (item, index) {
          if (data == item.dictId) {
            name = item.dictId + '-' + item.dictName;
          }
        })
        return name;
      },

      formatPayTypeData(row, column) {
        let applStsatus = row["appl_status"];
        if(applStsatus === "2" || applStsatus ==="4"){
          return ""
        }else{
        let name = row[column.property];
        let data = row[column.property];
        this.payStatusList.forEach(function (item, index) {
          if (data == item.dictId) {
            name = item.dictId + '-' + item.dictName;
          }
        })
        return name;
        }
      },


      selectRow(index, row) {
        this.appForm.rece_org_name = row.ma_org_no;
        this.appForm.acct_name = row.acct_name;
        this.appForm.rece_accno = row.acct_no;
        this.appForm.other_acct_bank_name = row.bank_name;
        this.appForm.bank_no = row.bank_no;
        this.dialogVisible = false;
        this.resetSearch();
        this.checkAccNo();
      },
       checkAccNo(){
        if((this.appForm.rece_acc_name != this.basicForm.noworg) && this.appForm.fee_type === '04' && this.appForm.rece_acc_name.length != 0 && this.basicForm.lncfno.length != 0){
          this.remarkShowot = true;
          this.$message({
            type: "warning",
            message: "提示：收款账户与当前委案机构不一致，请再次核实确认，如需申请请注明原因!"
          });
        }else{
          this.remarkShowot = false;
        }

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
      formatNowDate(str){
        if(str.length > 0){
          return str.slice(0, 10);
        }else{
          return str;
        }
      },
      feeTypeChange(){
        this.checkAccNo();
        if(this.appForm.fee_type === '02' && this.basicForm.prodcd === '01010008'){
          this.remarkShowft = true;
          this.$message({
            type: "warning",
            message: "当前为抵押类产品，请注明借款申请原因!"
          });
        }else{
          this.remarkShowft = false;
        }
        if(this.appForm.fee_type != '' && this.basicForm.lncfno != '') {
          let params = {
            servicecode: "RLMSPLTS1602_qrybyfeetp",
            feeType: this.appForm.fee_type,
            lncfno: this.basicForm.lncfno,
            applStatus: "0",
          }
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then(res => {
              if (res && res.code === "200" && res.data) {
                if (res.data.payFeeApply.length != 0) {
                  this.remarkShow = true;
                  this.$message({
                    type: "warning",
                    message: "当前存在相同费用类型的缴费已在流程中，请再次核实确认，如需申请请注明原因!"
                  });
                }else{
                  this.remarkShow = false;
                }
              }
            })
            .catch(err => {
              console.error(err);
            })
        }
      },

      getOutInfo() {
        let params = {
          servicecode: "RLMSPLTS1400",
          oaOrgId: this.cParentParams.oa_org_id,m
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
      const formList = ["basicForm", "appForm"];
      formList.forEach((item) => {
        this.validateList.push(validateHandle(item, this));
      });
      Promise.all(this.validateList)
        .then((res) => {
       let params = this.transformData();
      params.servicecode = "pl0551";
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
        }).catch((err) => {
        this.$message({
          type: "warning",
          message: "校验不通过",
        });
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
          this.checkAmount = false;
          if(parseFloat(this.appForm.pay_amount) <= 0){
            return callback(new Error("付款金额不能为0"));
          }
          let reg = /^(([1-9]\d*)|(([0]\.\d{1,2}|[1-9]\d*\.\d{1,2})))$/;
          if (!reg.test(this.appForm.pay_amount)) {
            return callback(new Error("请输入正确金额"));
          } else if (parseFloat(this.appForm.pay_amount) > 500000) {
            this.isRedActive = false;
            return callback(new Error("付款金额不可以大于50W"));
          } else if(parseFloat(this.appForm.pay_amount) >= 10000 && parseFloat(this.appForm.pay_amount) < 100000){
            this.isRedActive = true;
            this.$message({
              type: "warning",
              message: "提示:当前付款金额大于等于1万,请注意!"
            });
            return callback();
          }else if (parseFloat(this.appForm.pay_amount) >= 100000 && parseFloat(this.appForm.pay_amount) <= 500000) {
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
        if (this.isShowConfirm && !this.appForm.confirm) {
          return callback(new Error("请确认金额"));
        } else {
          return callback();
        }
      },

      zfpzValidate(value, rule, callback) {
        if (this.appForm.zfpz.length === 0 && this.isShow == true) {
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
      remarkotValidate(value, rule, callback) {
        if ((this.remarkShow==true || this.remarkShowot==true || this.remarkShowft==true) &&this.appForm.remarkot.length === 0) {
          return callback(new Error("请输入备注"));
        }
        return callback();
      },
      getCheckOutfeeType() {
        console.log("feeTypeList",this.feeTypeList)
        for (let i = 0; i < this.feeTypeList.length; i++) {
          if (this.feeTypeList[i].dictId === "12" ) {
             this.feeTypeList.splice(i, 1);
          }
          if (this.feeTypeList[i].dictId === "13") {
             this.feeTypeList.splice(i, 1);
          }
        }
          this.feeTypeLists = this.feeTypeList;
          console.log("feeTypeListaaaaaaaaaaaaaa",this.feeTypeList)
      },

       payfeeTypeChange() {
      this.appForm.rece_org_name = "";
      this.appForm.rece_acc_name = "";
      this.appForm.bank_name = "";
      this.appForm.bank_no = "";
    }
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
  .redActive {
  -webkit-text-fill-color: red;
  }
</style>
