<template>
  <div>
    <el-collapse v-model="activeNames" class="custom-common--collapse">
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
            <el-col :span="8">
              <el-form-item l :label="$i18ns('借据号')" prop="loan_no">
                <el-input
                  v-model="basicForm.loan_no"
                  @blur="InitialWhenBlur"
                  @keyup.enter.native="InitialWhenBlur"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$i18ns('客户名称')" prop="cust_name">
                <el-input v-model="basicForm.cust_name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$i18ns('客户号')" prop="cust_no">
                <el-input v-model="basicForm.cust_no" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$i18ns('产品名称')" prop="prod_name">
                <el-input v-model="basicForm.prod_name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$i18ns('产品代码')" prop="prod_no">
                <el-input v-model="basicForm.prod_no" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$i18ns('货币代号')" prop="ccy_code"  >
                <el-select v-model="basicForm.ccy_code" placeholder=" " :disabled="true">
                  <el-option
                    v-for="(item, index) in ccyCodeList"
                    :key="index"
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
          <span>
            <em></em>{{$i18ns('欠款信息')}}
          </span>
        </template>
        <el-form
          ref="debtInfoForm"
          :rules="rules"
          :model="debtInfoForm"
          label-width="160px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$i18ns('贷款账号')">
                <el-input v-model="debtInfoForm.loan_acct_no" :disabled="true"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item :label="$i18ns('贷款状态')">
                <el-select v-model="debtInfoForm.loan_forms" :disabled="true" placeholder>
                  <el-option
                    v-for="(item, i) in clssstList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('本金合计')" prop="prcpl_smtn">
                <el-input v-model="debtInfoForm.prcpl_smtn" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('利息合计')" prop="int_smtn">
                <el-input v-model="debtInfoForm.int_smtn" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('正常本金')">
                <el-input v-model="debtInfoForm.normal_princi" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('逾期本金')">
                <el-input v-model="debtInfoForm.overdue_princi" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('呆滞本金')">
                <el-input v-model="debtInfoForm.stagnant_princi" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('核销本金')">
                <el-input v-model="debtInfoForm.write_off_princi" :disabled="true"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item :label="$i18ns('逾期违约金')">
                <el-input v-model="debtInfoForm.recv_fee" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('允许提前结清')">
                <el-select v-model="debtInfoForm.is_allow_adv_settle" :disabled="true" placeholder>
                  <el-option
                    v-for="(item, i) in yesnoList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('银行卡号')">
                <el-input v-model="debtInfoForm.dflt_rpymt_acct_no" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item :label="$i18ns('还款金额')">
                  <el-input v-model="prpymt_amt" :disabled="true" ></el-input>
                </el-form-item>
             </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('罚金金额')" prop="adv_rpymt_fine_amt">
                <el-input v-model="debtInfoForm.adv_rpymt_fine_amt" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="3"  v-show="false">
        <template slot="title">
          <span>
            <em></em>还款信息
          </span>
        </template>
        <el-form
          ref="repayForm"
          :rules="rules"
          :model="repayForm"
          label-width="160px"
          class="custom-common--form"
        >
          <el-row>
            <el-form-item label="还款类型" prop="rfndd_tp">
              <el-radio-group v-model="repayForm.rfndd_tp">
                <el-radio
                  v-for="(item,i) in rptypeList"
                  :key="i"
                  :label="item.dictId"
                >{{item.dictName}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-row>
          <!-- -----------公账还款start------------ -->
          <div class="border-Line" v-show="repayForm.rfndd_tp==='1'">
            <el-row style="padding-left:30px;">
              <el-col :span="6">
                <el-form-item label="选择公账账号">
                  <el-button type="primary" @click="showLookup = true" size="small">{{$i18ns('选择')}}</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="还款金额" prop="repay_amt">
                  <el-input v-model="repayForm.repay_amt" @input="rpamountCheck" id="rpamountId"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <!-- <el-form-item prop="wthr_pnt_distinct" class="checkbx-label-style">
                  <el-checkbox-group v-model="repayForm.wthr_pnt_distinct">
                    <el-checkbox label="指向清晰" name="wthr_pnt_distinct"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item> -->
                 <el-form-item label="指向清晰" prop="wthr_pnt_distinct">
                  <el-radio-group v-model="repayForm.wthr_pnt_distinct">
                    <el-radio
                      v-for="(item,i) in yesnoList"
                      :key="i"
                      :label="item.dictId"
                    >{{item.dictName}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <!-- <el-form-item prop="is_settle_fee" class="checkbx-label-style"> -->
                <!-- <el-checkbox-group v-model="repayForm.is_settle_fee">
                    <el-checkbox label="是否结费" name="is_settle_fee"></el-checkbox>
                </el-checkbox-group>-->
                <el-form-item label="是否结费" prop="is_settle_fee">
                  <el-radio-group v-model="repayForm.is_settle_fee">
                    <el-radio
                      v-for="(item,i) in yesnoList"
                      :key="i"
                      :label="item.dictId"
                    >{{item.dictName}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="caSeq-table">
              <el-table :data="tableData">
                <el-table-column label="是否锁定" align="center">
                  <template slot-scope="scope">{{dattypTranslate(scope.row.isLock)}}</template>
                </el-table-column>
                <el-table-column label="公账序号" align="center" prop="corporate_account_serl_num"></el-table-column>
                <el-table-column label="还款/宕帐日期" align="center" prop="hang_acct_dt"></el-table-column>
                <el-table-column label="付款人" align="center" prop="payer"></el-table-column>
                <el-table-column label="金额" align="center" prop="corporate_account_amt"></el-table-column>
                <el-table-column label="摘要" align="center" prop="abst"></el-table-column>
                <el-table-column label="剩余金额" align="center" prop="rsdl_amt"></el-table-column>
                <el-table-column :label="$i18ns('备注')" align="center" prop="remark"></el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button type="text" @click="deleteItem(scope)">{{$i18ns('删除')}}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </div>
          <!-- -----------公账还款end------------ -->
          <!-- -----------个人还款start------------ -->
          <div class="border-Line" v-show="repayForm.rfndd_tp==='0'">
            <el-row>
              <el-col :span="6">
                <el-form-item label="还款金额" prop="rpymt_amt">
                  <el-input
                    v-model="repayForm.rpymt_amt"
                    id="rpamountId"
                    @input="rpamountCheck"
                    :disabled="ifrpamount"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6" style="padding-left:50px;line-height:38px;">
                <el-button type="primary" size="small" @click="beginCutMoney">发起扣款</el-button>
                <el-button
                  type="primary"
                  size="small"
                  @click="queryResults"
                  style="margin-left:50px;"
                >查询结果</el-button>
              </el-col>
            </el-row>
            <el-row class="caSeq-table">
              <el-table :data="tableDataTwo">
                <el-table-column label="订单号" align="center" prop="refund_indent_num"></el-table-column>
                <el-table-column label="流程申请号" align="center" prop="flow_aply_mun"></el-table-column>
                <el-table-column label="扣款金额" align="center" prop="corporate_account_amt"></el-table-column>
                <el-table-column label="实际扣款金额" align="center" prop="factAmt"></el-table-column>
                <el-table-column label="交易状态" align="center">
                  <template slot-scope="scope">{{statusTranslate(scope.row.status)}}</template>
                </el-table-column>
                <el-table-column label="响应码" align="center" prop="retCode"></el-table-column>
                <el-table-column label="响应信息" align="center" prop="retText"></el-table-column>
                <el-table-column label="操作" align="center"></el-table-column>
              </el-table>
            </el-row>
          </div>

          <!-- -----------个人还款end------------ -->
          <el-row>
            <el-col :span="6">
              <el-form-item label="公账处理方式" prop="co_acctg_deal_way_pub" v-if="repayForm.rfndd_tp==='1'">
                <el-select v-model="repayForm.co_acctg_deal_way_pub" placeholder="请选择公账处理方式" id="pboprtpId">
                  <el-option
                    v-for="(item, i) in pboprtpList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="还款方式" prop="co_acctg_deal_way_per" v-if="personPayshow">
                <el-select v-model="repayForm.pboprtp_per" placeholder="请选择还款方式" id="pboprtpId">
                  <el-option
                    v-for="(item, i) in pboprtpList_per"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="4" class="checkbx-label-style">
              <el-form-item prop="ifshowjm">
                <el-checkbox-group v-model="repayForm.ifshowjm">
                  <el-checkbox label="发起减免" name="ifshowjm" :disabled="sfwrite[0]"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="ifShowSfjmtqhk">
              <el-form-item>
                <div class="earPay-style">
                  <div style="font-size:14px;color:#697b8c;">提前还款试算结果：</div>
                  <div>提前结清最大金额:</div>
                  <div title="单击复制" @click="copyContent('0')">{{earPayAmount}}</div>
                  <div
                    title="单击复制"
                    v-if="repayForm.wthr_dert_adv_rfndd_bkrg"
                    @click="copyContent('1')"
                  >&emsp;当前减免提前还款手续费:{{jmtqhkje}}</div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <div>
            <el-row v-if="repayForm.ifshowjm">
              <el-col :span="6">
                <el-form-item label="申请减免时间" prop="cust_appl_dt">
                  <el-date-picker
                    v-model="repayForm.cust_appl_dt"
                    type="date"
                    placeholder="请选择日期"
                    format="yyyy-MM-dd"
                    value-format="yyyyMMdd"
                    :picker-options="pickerOptions"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="申请调整类型" prop="aply_adjust_tp">
                  <el-select v-model="repayForm.aply_adjust_tp" placeholder="请选择申请调整类型">
                    <el-option
                      v-for="(item, i) in adjtyList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="申请调整原因" prop="aply_adjust_reason">
                  <el-select v-model="repayForm.aply_adjust_reason" placeholder="请选择申请调整原因">
                    <el-option
                      v-for="(item, i) in adjrsList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <div v-if="repayForm.ifshowjm">
                <el-col :span="6">
                  <el-form-item label="减免逾期违约金" prop="derate_overdue_fine">
                    <el-input v-model="repayForm.derate_overdue_fine" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="减免罚息" prop="dert_penalt_inst">
                    <el-input v-model="repayForm.dert_penalt_inst" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="6">
                  <el-form-item label="减免利息" prop="dert_inst">
                    <el-input v-model="repayForm.dert_inst" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </div>
              <el-col :span="4" v-if="ifShowSfjmtqhk">
                <el-form-item prop="wthr_dert_adv_rfndd_bkrg" class="checkbx-label-style">
                  <el-checkbox-group v-model="repayForm.wthr_dert_adv_rfndd_bkrg">
                    <el-checkbox label="减免提前还款手续费" name="wthr_dert_adv_rfndd_bkrg"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="repayForm.ifshowjm">
              <el-col :span="6">
                <el-form-item label="减免金额总和" prop="totalReduce">
                  <el-input v-model="repayForm.totalReduce" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item prop="management_approval_has_been_obtained" class="checkbx-label-style">
                  <el-checkbox-group v-model="repayForm.management_approval_has_been_obtained">
                    <el-checkbox label="已获得管理层审批" name="management_approval_has_been_obtained" :disabled="ifwrite"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="ifshowAttach">
              <el-col :span="6">
                <multiple-upload-vue
                  class="repay-upload"
                  :vueFormKey="formKeyList[0]"
                  :vueFormLabel="formLabelList[0]"
                  :ifRequire="ifRequire[0]"
                  :warning="warning[0]"
                  :fileSize="10"
                  :fileName="fileNameList[0]"
                  @fileInfo="getFileInfo"
                />
              </el-col>
              <el-col :span="6">
                <multiple-upload-vue
                  class="repay-upload"
                  :vueFormKey="formKeyList[1]"
                  :vueFormLabel="formLabelList[1]"
                  :ifRequire="ifRequire[1]"
                  :warning="warning[1]"
                  :fileSize="10"
                  :fileName="fileNameList[1]"
                  @fileInfo="getFileInfo"
                />
              </el-col>
              <el-col :span="6">
                <multiple-upload-vue
                  class="repay-upload"
                  :vueFormKey="formKeyList[2]"
                  :vueFormLabel="formLabelList[2]"
                  :ifRequire="ifRequire[2]"
                  :warning="warning[2]"
                  :fileSize="10"
                  :fileName="fileNameList[2]"
                  @fileInfo="getFileInfo"
                />
              </el-col>
              <el-col :span="6">
                <multiple-upload-vue
                  class="repay-upload"
                  :vueFormKey="formKeyList[3]"
                  :vueFormLabel="formLabelList[3]"
                  :ifRequire="ifRequire[3]"
                  :warning="warning[3]"
                  :fileSize="10"
                  :fileName="fileNameList[3]"
                  @fileInfo="getFileInfo"
                />
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" v-if="repayForm.rfndd_tp==='1'">
                <multiple-upload-vue
                  class="repay-upload"
                  :vueFormKey="formKeyList[4]"
                  :vueFormLabel="formLabelList[4]"
                  :ifRequire="ifRequire[4]"
                  :warning="warning[4]"
                  :fileSize="10"
                  :fileName="fileNameList[4]"
                  @fileInfo="getFileInfo"
                />
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="14">
              <el-form-item :label="$i18ns('备注')" prop="remark">
                <el-input type="textarea" v-model="repayForm.remark" :rows="4"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <choose-account-lookup
            :show-dialog="showLookup"
            @select="lookSelect"
            @close="lookClose"
            v-if="showLookup"
          />
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template slot="title">
          <span>
            <em></em>还款种类
          </span>
        </template>
        <el-form
          ref="typeForm"
          :rules="rules"
          :model="typeForm"
          label-width="160px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="还款方式" prop="rpymt_catg">
                <el-select v-model="typeForm.rpymt_catg" placeholder :disabled="true">
                    <el-option
                      v-for="(item, i) in catgList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId"
                    ></el-option>
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提前还款方式" prop="adv_rpymt_catg">
                <el-select v-model="typeForm.adv_rpymt_catg" placeholder :disabled="true">
                    <el-option
                      v-for="(item, i) in advrPymtCatgList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId"
                    ></el-option>
                  </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="提前还款调整计划方式" prop="adv_rpymt_adjust_plan_way">
                <el-select v-model="typeForm.adv_rpymt_adjust_plan_way" placeholder :disabled="true">
                    <el-option
                      v-for="(item, i) in adjustPlanCatgList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId"
                    ></el-option>
                  </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提前还款还息方式" prop="adv_rpymt_int_rpymt_way">
                <el-select v-model="typeForm.adv_rpymt_int_rpymt_way" placeholder :disabled="true">
                    <el-option
                      v-for="(item, i) in intRpymtCatgList"
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
    </el-collapse>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
//import ChooseAccountLookup from "./ChooseAccountLookup";
//import MultipleUploadVue from "COM/MultipleUploadVue";
//import _ from "lodash";
export default {
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object // 父页面自定义参数与内置参数
  },
  name: "RepayApply",
  components: {
    //ChooseAccountLookup,
    //MultipleUploadVue
  },
  data() {
    return {
      activeNames: ["1", "2", "3","4"],
      prpymt_amt:"",
      basicForm: {
        loan_no: "",
        cust_name: "",
        cust_no: "",
        prod_name: "",
        prod_no: "",
        apply_no: "",
        rpymt_amt: ""
      },
      debtInfoForm: {
        prcpl_smtn:"",
        int_smtn:"",
        loan_acct_no: "", //贷款账号
        ovdue_amt: "", //逾期金额
        loan_forms: "", //贷款状态
        normal_princi: "", //正常本金
        overdue_princi: "", //逾期本金
        stagnant_princi: "", //呆滞本金
        write_off_princi: "", //核销本金
        collt_penalt_inst: "", //催收罚息,不展示
        collt_acrued_penalt_inst: "", //催收应计罚息,不展示
        recv_accrued_penalt_inst: "", //应收应计罚息,不展示
        recv_debit_inst: "", //应收欠息,不展示
        collt_debit_inst: "", //催收欠息,不展示
        ovdue_acd_int: "", //逾期应计利息,不展示
        ysfx: "", //罚息，页面展示的计算字段----非接口字段
        hxlx: "", //核销利息，页面展示的计算字段----非接口字段
        recv_penalt_inst: "", //应收罚息
        recv_fee: "", //逾期违约金
        is_allow_adv_settle: "", //允许提前结清
       // is_allow_part_repay: "", //允许提前部分还款
        dflt_rpymt_acct_no: "" ,//银行卡号
        rpymt_amt: "", //还款金额
        adv_rpymt_fine_amt:""//罚金金额
      },
      repayForm: {
        corporate_account_serl_num: "",
        rfndd_tp: "1",
        pbacctsq: [], //公账列表
        rpymt_amt: "",
        rpymt_amt_pub: "", //公账还款金额
        rpymt_amt_per: "", //个人账户还款金额
        co_acctg_deal_way: "",
        co_acctg_deal_way_per: "",
        co_acctg_deal_way_pub: "0", //公账处理方式，默认宕于公账
        cust_appl_dt: "", //客户还款申请日期
        derate_overdue_fine: this.nubFormat(0, 2),
        dert_penalt_inst: this.nubFormat(0, 2),
        dert_inst: this.nubFormat(0, 2),
        totalReduce: this.nubFormat(0, 2), //减免总和
        wthr_pnt_distinct: "", //初始化值--重置值
        is_settle_fee: "",
        wthr_dert_ovdue_fine: false,
        wthr_dert_pnly_int: false,
        wthr_dert_int: false,
        wthr_dert_adv_rfndd_bkrg: false, //是否减免提前还款手续
        management_approval_has_been_obtained: false,
        ifshowjm: false, //发起减免，显示减免项
        aply_adjust_tp: "",
        aply_adjust_reason: "",
        remark: ""
      },
      otherInfoForm: {
        dflt_rpymt_acct_no: "", //默认还款账号
        dflt_repay_acct_nm: "", //默认还款账户户名
        rpymt_acct_open_acct_bank_nm: "", //还款账户开户行名称
        rpymt_acct_open_acct_bank_prov: "", //还款账户开户行所在省
        rpymt_acct_open_acct_bank_city: "", //还款账户开户行所在市
        prmtd_adv_rpymt: "", //允许提前还款
        rpymt_aply_ste: "" //申请状态
      },
      typeForm: {
        // 还款种类
        rpymt_catg: "", // 还款方式
        adv_rpymt_catg: "", // 提前还款方式
        adv_rpymt_adjust_plan_way: "", // 提前还款调整计划方式
        adv_rpymt_int_rpymt_way: "", // 提前还款还息方式
      },
      rules: {
        corporate_account_serl_num: [{ required: true, message: "请选择公账账号" }],
        aply_adjust_tp: [{ required: false, message: "请选择申请调整类型" }],
        aply_adjust_reason: [{ required: false, message: "请选择申请调整原因" }],
        remark: [{ required: false, message: "请填写备注" }],
        cust_appl_dt: [{ required: false, message: "请选择减免申请时间" }],
        derate_overdue_fine: [{ validator: this.redcznfCheck, trigger: "change" }],
        dert_penalt_inst: [{ validator: this.redcpiCheck, trigger: "change" }],
        dert_inst: [{ validator: this.redcniCheck, trigger: "change" }]
      },

      /*  ------公账/个人列表字段---------------*/
      tableData: [], // 选择带回公账还款列表数据
      tableDataTwo: [], //带回的个人还款扣款信息
      showLookup: false,
      rpamountA: this.nubFormat(0, 2), //校验用中间字段

      /* ---------字典数组----------------------*/
      dattypList: [], // 是否锁定数据字典
      pboprtpList_per: [], // 个人账户数据字典
      adjtyList: [], //字典列表
      adjrsList: [], //字典列表
      pboprtpList: [], //字典列表
      clssstList: [], //贷款状态字典列表
      rptypeList: [], //还款类型字典列表
      ccyCodeList:[],//货币字典
      catgList: [], // 还款方式
      advrPymtCatgList: [], // 提前还款方式
      adjustPlanCatgList: [], // 提前还款调整计划方式
      intRpymtCatgList: [], // 提前还款还息方式
      /* ---------发起减免是否可选控制------------------------*/
      paystustus: false, //扣款是否成功
      factAmt: this.nubFormat(0, 2), //实扣金额

      /* ---------减免项显示/可选控制------------------------*/
      sfwrite: [true, true, true, true], //减免项是否可选
      ifShowSfjmtqhk: false, //控制是否显示减免提前还款手续费
      lncfnoLocal: "", //初始化用本地借据号
      jmtqhkje: "", //减免提前还款手续费，接口获取
      earPayAmount: "", //当前提前还款总金额，页面显示
      maxjmtqhkje: "", //最大减免提前还款手续费
      maxpay: "", //不减免还款手续费的提前结清金额

      /* ---------减免上限字段------------------------*/
      maxredcznf: this.nubFormat(0, 2), //最大减免滞纳费
      maxredcpi: this.nubFormat(0, 2), //最大减免罚息
      maxredcni: this.nubFormat(0, 2), //最大减免利息

      /* ---------附件上传控制------------------------*/
      formKeyList: ["idatt", "applyatt", "crdtatt", "othatt", "pubatt"], //附件key
      fileStatuList: [false, false, false, false, false], //附件上传状态
      formLabelList: [
        "身份证附件",
        "申请书附件",
        "征信报告附件",
        "其他证据附件",
        "公账证明材料"
      ], //附件中文名称
      ifRequire: [false, false, false, false, true], //附件是否必传
      warning: [false, false, false, false, false], //附件未上传是否警告
      idatt: [], //上传身份证附件信息
      applyatt: [], //上传申请书附件信息
      crdtatt: [], //上传征信报告附件信息
      othatt: [], //上传其他证据附件信息
      pubatt: [], //上传公账证明材料信息
      errorTimes: [0, 0], //校验附件是否上传报警次数
      fileNameList: [[], [], [], [], []], //返显上传文件的名字
      ifshowAttach: false, //是否显示身份证等四个附件
      // ifShowPubAtt: true, //控制是否显示公账证明材料

      /* ---------页面初始化控制字段------------------------*/
      isFirstIn: true, //判断是否是第一次进入页面
      unWatch: [],

      /* ---------其他------------------------*/
      sfPressbut: false, //保存提交按钮是否禁用
      maxbenj: "", //本金
      pickerOptions: {}, //可选日期控件配置
      personPayshow: false //个人账户还款方式显示控制
    };
  },
  activated() {
    // 路由传参进入页面刷新页面
    if (this.$route.query.loan_no) {
      this.basicForm.loan_no = this.$route.query.loan_no;
      this.InitialWhenBlur();

    }
  },
  created() {
    this.pickerOptions.disabledDate = time => {
      let maxDate = Date.now();
      return time.getTime() > maxDate;
    };
    this.basicForm.loan_no = this.cParentParams.reserve1;
    this.basicForm.apply_no = this.cParentParams.appl_id;

    // // 个人批量扣款路由传参进入页面则直接调接口初始化页面
    // if (this.$route.query.loan_no) {
    //   this.basicForm.loan_no = this.$route.query.loan_no;
    //   this.InitialWhenBlur();
    // }
    if(this.basicForm.loan_no!="" && this.basicForm.loan_no!=undefined){
      this.InitialWhenBlur();
       this.getrpymtAmt();
    }
  },
  mounted() {
    this.getDictList("PL_E_APPL_CHNG_TYPE", "adjtyList");
    this.getDictList("PL_E_ADJRS", "adjrsList");
    this.getDictList("PL_E_RPTYPE", "rptypeList"); //还款类型字典
    this.getDictList("PL_E_CLSSST", "clssstList"); //贷款状态字典
    this.getDictList("MS_E_YESORNO", "yesnoList"); //是否字典
    this.getDictList("PL_E_DEDUCT_STATUS", "paystatuList"); //扣款状态字典
    this.getDictList("PL_E_PBOPRTP", "pboprtpList"); //公账方式字典
    this.getDictList("PL_E_PBOPRT_PER_TYPE", "pboprtpList_per"); //个人账户方式字典
    this.getDictList("MS_CURRENCY", "ccyCodeList"); // 货币数据字典
    this.getDictList("LN_E_RPYMT_CATG", "catgList"); // 还款方式
    this.getDictList("LN_E_LOAN_ADV_RPYMT_CATG", "advrPymtCatgList"); // 提前还款方式
    this.getDictList("LN_E_MODE_REPAYMENT", "adjustPlanCatgList"); // 提前还款调整计划方式
    this.getDictList("LN_E_ADV_RPYMT_INT_RPYMT_WAY", "intRpymtCatgList"); // 提前还款还息方式
  },

  computed: {
    ifwrite() {
      if (
        this.sumCalc(
          this.repayForm.derate_overdue_fine,
          this.repayForm.dert_penalt_inst,
          this.repayForm.dert_inst
        ) > 50000.0 ||
        this.repayForm.aply_adjust_tp === "2"
      ) {
        return false;
      } else {
        this.repayForm.management_approval_has_been_obtained = false;
        return true;
      }
    },
    ifrpamount() {
      // 当申请状态变为通过时，才可以再次发起扣款（还款金额可变），申请状态：保存-- 提交----通过/拒绝/取消
      if (this.tableDataTwo[0]) {
        var table = this.tableDataTwo[0];
        if (table.status === "1") {
          return true;
        } else {
          return false;
        }
      }
      return false;
    }
  },
  methods: {
    /*=========================================监听类方法start====================================== */

    getrpymtAmt() {
      var _this = this; //很重要！！
      let params = {
        servicecode: "pl0059",
        apply_no: this.basicForm.apply_no,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            _this.prpymt_amt = res.data.rpyInfo.rpymt_amt;
            _this.debtInfoForm.adv_rpymt_fine_amt = res.data.rpyInfo.recv_fine;
            _this.typeForm.rpymt_catg = res.data.rpyInfo.rpymt_catg;
            _this.typeForm.adv_rpymt_catg = res.data.rpyInfo.adv_rpymt_catg;
            _this.typeForm.adv_rpymt_adjust_plan_way = res.data.rpyInfo.adv_rpymt_adjust_plan_way;
            _this.typeForm.adv_rpymt_int_rpymt_way = res.data.rpyInfo.adv_rpymt_int_rpymt_way;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    //还款类型
    rfndd_tp() {
      // 清除缓存数据
      this.clearRepayHis();
      //还款金额切换
      var a =
        this.repayForm.rpymt_amt_per != ""
          ? this.repayForm.rpymt_amt_per
          : this.debtInfoForm.ovdue_amt;
      // var b = this.repayForm.rpymt_amt_pub;
      if (this.repayForm.rfndd_tp === "1") {
        this.repayForm.rpymt_amt_pub = "";
      } else {
        this.repayForm.rpymt_amt_per = a;
      }
    },

    rpymt_amt(val) {
      // a.特殊处理
      //1. 个人账户显示提前还款选项 --还款金额大于解除逾期金额
      if (this.repayForm.rfndd_tp === "0") {
        if (parseFloat(val) > parseFloat(this.debtInfoForm.ovdue_amt)) {
          if (
            this.debtInfoForm.is_allow_adv_settle === "1" ||
            this.debtInfoForm.is_allow_part_repay === "1"
          ) {
            this.personPayshow = true; //个人账户还款方式显示是
          }
        } else {
          this.personPayshow = false; //个人账户还款方式显示否
          this.repayForm.pboprtp_per = "";
        }
      }
      //2.公账还款还款金额介于逾期金额和本金(逾期本金lnopbl、呆滞本金lndpbl、核销本金hxxxpr)之间，打开发起减免勾选按钮
      if (this.repayForm.rfndd_tp === "1") {
        if (
          parseFloat(val) >= this.maxbenj &&
          parseFloat(val) < parseFloat(this.debtInfoForm.ovdue_amt)
        ) {
          this.$set(this.sfwrite, 0, false);
          //当替换还款金额时，如果已经发起减免，实时刷新减免数据
          if (this.repayForm.ifshowjm) {
            this.updateReduce(val);
          }
        } else {
          this.$set(this.sfwrite, 0, true);
          this.repayForm.ifshowjm = false; //关闭发起减免并且不可勾选
        }
      }
      //b.公共处理部分
      //1.还款金额大于逾期金额，提前还款时重置勾选减免提前还款手续费
      if (parseFloat(val) > parseFloat(this.debtInfoForm.ovdue_amt)) {
        this.repayForm.wthr_dert_adv_rfndd_bkrg = false;
      }
    },
    // 点击发起减免，开始减免计算
    ifshowjm() {
      if (this.repayForm.ifshowjm) {
        var val =
          this.repayForm.rfndd_tp === "1"
            ? this.repayForm.rpymt_amt_pub
            : this.factAmt; //个人账户使用实扣金额减免
        this.updateReduce(val); //更新减免金额
        this.ifshowAttach = true; //显示四个附件
        // 下列项变为必选项
        this.rules.aply_adjust_tp[0].required = true;
        this.rules.aply_adjust_reason[0].required = true;
        this.rules.remark[0].required = true;
        this.rules.cust_appl_dt[0].required = true;
        // 身份证附件/申请书附件必传
        for (var i = 0; i < this.ifRequire.length - 3; i++) {
          this.$set(this.ifRequire, i, true);
        }
      } else {
        this.ifshowAttach = false; //不显示附件
        // 下列项变为选填项
        this.rules.aply_adjust_tp[0].required = false;
        this.rules.aply_adjust_reason[0].required = false;
        this.rules.remark[0].required = false;
        this.rules.cust_appl_dt[0].required = false;
        this.$refs.repayForm.validate(); //校验警告消除
        for (var i = 0; i < this.ifRequire.length - 3; i++) {
          this.$set(this.ifRequire, i, false);
        }
        // 清空减免选填项
        this.repayForm.aply_adjust_tp = "";
        this.repayForm.aply_adjust_reason = "";
        this.repayForm.cust_appl_dt = "";
        this.repayForm.derate_overdue_fine = this.nubFormat(0, 2);
        this.repayForm.dert_penalt_inst = this.nubFormat(0, 2);
        this.repayForm.dert_inst = this.nubFormat(0, 2);
        this.repayForm.management_approval_has_been_obtained = false;
        // 清除上传四个附件信息
        this.idatt = [];
        this.applyatt = [];
        this.crdtatt = [];
        this.othatt = [];
      }
    },
    // 公账处理方式
    pboprtp(val) {
      // a.校验部分
      //1.公账：当选择提前还款的时候，要判断还款金额是否大于逾期金额，否则给出提示
      if (val === "2") {
        var pubAmount = this.repayForm.rpymt_amt_pub;
        if (parseFloat(pubAmount) < parseFloat(this.debtInfoForm.ovdue_amt)) {
          this.$message({
            type: "warning",
            message: "还款金额不大于逾期金额，选择提前还款方式"
          });
          return;
        }
      }
      //b.业务处理
      //选择提前还款，显示提前还款减免项
      if (val === "2") {
        this.repayForm.ifshowjm = false; //提前还款不能发起减免，如果选择提前还款先关闭发起减免
        this.ifShowSfjmtqhk = true;
        this.getEarPayAmount("0"); //不减免提前还款手续费的最大结清金额
      } else {
        this.ifShowSfjmtqhk = false;
        //重置提前还款手续费勾选
        this.repayForm.wthr_dert_adv_rfndd_bkrg = false;
        this.earPayAmount = ""; //重置还款试算结果
      }
    },
    //勾选提前还款手续费
    wthr_dert_adv_rfndd_bkrg() {
      if (this.repayForm.wthr_dert_adv_rfndd_bkrg) {
        var val =
          this.repayForm.rfndd_tp === "1"
            ? this.repayForm.rpymt_amt_pub
            : this.repayForm.rpymt_amt_per;
        this.getEarPayAmount(val); //提前部分还款的减免手续费
        this.ifshowAttach = true; //显示四个附加
        // 附件是否必传
        this.ifRequire[0] = true;
        this.ifRequire[1] = true;
      } else {
        this.ifshowAttach = false; // 四个附件是否显示
        // 附件是否必传
        this.ifRequire[0] = false;
        this.ifRequire[1] = false;
        this.earPayAmount = this.maxpay; //不减免最大结清金额
        // 清除上传的四个附件信息
        this.idatt = [];
        this.applyatt = [];
        this.crdtatt = [];
        this.othatt = [];
      }
    },
    // 申请调整原因为还款能力弱的时候，调用获取减免上限
    aply_adjust_reason() {
      if (this.repayForm.aply_adjust_reason === "0") {
        this.getLimit();
      }
    },
    /*=========================================监听类方法end====================================== */
    /*======监听类中工具方法start============ */
    // 获取当前还款金额
    // getCurrentAmount(){

    // }
    // 发起减免是否激活
    activesfjm(val) {
      if (this.paystustus) {
        if (
          parseFloat(val) >= this.maxbenj &&
          parseFloat(val) < parseFloat(this.debtInfoForm.ovdue_amt)
        ) {
          this.sfwrite[0] = false;
        } else {
          this.sfwrite[0] = true;
        }
      }
    },

    /*======监听类中工具方法end============ */
    /*=========================================页面调用方法start====================================== */
    /**
     *借据号失焦初始化查询
     *
     */
    InitialWhenBlur() {
      if (
        !this.basicForm.loan_no ||
        this.lncfnoLocal === this.basicForm.loan_no
      ) {
        return false;
      }
      this.lncfnoLocal = this.basicForm.loan_no; // 记录借据号
      // 清空上次查询信息
      //this.clearHistory();
      // 获取初始化的基础信息和欠款信息
      this.getInitialInfo();
    },
    /*=========================================页面调用方法end====================================== */
    /*=========================================服务实现类start====================================== */
    /**
     *获取初始化的基础信息和欠款信息
     *
     */
    getInitialInfo() {
     let params = {
        servicecode: "ln3101",
        loan_due_bill_num: this.basicForm.loan_no,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(
        res => {
          if (res && res.code === "200" && res.data) {

            let data = res.data;
            //this.basicForm.loan_no = data.loan_no;

            this.basicForm.cust_name = data.cust_nm;
            this.basicForm.cust_no = data.cust_num; //客户号
            this.basicForm.prod_name = data.prod_nm;
            this.basicForm.prod_no = data.prod_code; //产品代码
            this.basicForm.apply_no = data.apply_no;
            this.basicForm.ccy_code  =data.ccy_code_num;
            this.debtInfoForm.loan_acct_no = data.loan_acct_num; //贷款账号
            this.debtInfoForm.loan_forms = data.loan_form; //贷款状态
            this.debtInfoForm.prcpl_smtn = data.prcpl_smtn;
            this.debtInfoForm.int_smtn = data.int_smtn;
            this.debtInfoForm.normal_princi = data.nrl_prcpl; //正常本金
            this.debtInfoForm.overdue_princi = data.ovdue_prcpl; //逾期本金
            this.debtInfoForm.stagnant_princi = data.stgnt_prcpl; //呆滞本金
            this.debtInfoForm.write_off_princi = data.chk_write_off_prcpl; //核销本金
            this.debtInfoForm.ovdue_acd_int = data.ovdue_acd_int; //逾期应计利息
            this.debtInfoForm.recv_penalt_inst = data.rcvbl_pnly_int; //应收罚息
            this.debtInfoForm.recv_fee = data.rcvbl_fee; //逾期违约金
            this.debtInfoForm.collt_penalt_inst = data.urge_collt_pnly_int; //催收罚息
            this.debtInfoForm.collt_acrued_penalt_inst = data.urge_collt_acd_pnly_int;
            this.debtInfoForm.recv_accrued_penalt_inst = data.rcvbl_acd_pnly_int;
            this.debtInfoForm.recv_debit_inst = data.rcvbl_db_int;
            this.debtInfoForm.collt_debit_inst = data.urge_collt_db_int;
            // this.debtInfoForm.is_allow_adv_settle = data.adv_rpymt_adjust_flg; //是否允许提前结清
            this.debtInfoForm.is_allow_adv_settle = "1"; //是否允许提前结清
            //this.debtInfoForm.is_allow_part_repay = data.alw_partl_rpymt_flg; //是否允许提前部分还款
            this.debtInfoForm.dflt_rpymt_acct_no=data.rpymt_acct_num; //银行卡号

            //this.otherInfoForm.dflt_rpymt_acct_no = data.rpacno; //默认还款账号
           // this.otherInfoForm.dflt_repay_acct_nm = data.derana; //默认还款账户户名
           // this.otherInfoForm.dflt_rpymt_acct_no = data.rpacbr; //默认还款账户行号
            this.otherInfoForm.rpymt_acct_open_acct_bank_nm = data.rpymt_acct_open_acct_bank_nm; //还款账户开户行名称
            this.otherInfoForm.rpymt_acct_open_acct_bank_prov = data.rpymt_acct_open_acct_bank_prov; //还款账户开户行所在省
            this.otherInfoForm.rpymt_acct_open_acct_bank_city = data.rpymt_acct_open_acct_bank_city; //还款账户开户行所在市
            this.otherInfoForm.prmtd_adv_rpymt = data.isepym; //允许提前还款


            //计算值
            this.debtInfoForm.ovdue_amt = this.nubFormat(
              parseFloat(data.ovdue_amt) + parseFloat(data.ovdue_acd_int),
              2
            ); //逾期金额
            this.debtInfoForm.hxlx = this.sumCalc(
              data.write_off_inst,
              data.hxxxoi,
              data.hxprin
            ); //核销利息
            this.debtInfoForm.retuin = data.retuin; //正常利息
            this.debtInfoForm.debtin = this.sumCalc(
              data.debtin,
              this.debtInfoForm.hxlx
            ); //逾期利息
            this.debtInfoForm.ysfx = this.sumCalc(
              data.recv_accrued_penalt_inst,
              data.collt_acrued_penalt_inst,
              data.recv_penalt_inst,
              data.csxxpi
            ); //罚息
            //获取最大本金
            this.maxbenj = Math.max.apply(null, [
              parseFloat(data.overdue_princi),
              parseFloat(data.stagnant_princi),
              parseFloat(data.write_off_princi)
            ]);
            //获取已经保存的还款信息
           // this.getSubmitData();
          }
        }
      );
    },
    /**
     *获取已经的表单信息(返显查看)----初始化时调用
     *
     */
    getSubmitData() {
      var params = {
        servicecode: "ln3101",
        applid: this.basicForm.applid
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            let data = res.data;
            this.otherInfoForm.rpaplstus = data.rpaplstus; //申请状态
            //表单选项赋值
            // this.repayForm.wthr_pnt_distinct = data.wthr_pnt_distinct == "1" ? true : false;
            // this.repayForm.is_settle_fee = data.is_settle_fee == "1" ? true : false;
            this.repayForm.wthr_dert_ovdue_fine = data.wthr_dert_ovdue_fine;
            this.repayForm.wthr_dert_pnly_int = data.wthr_dert_pnly_int;
            this.repayForm.wthr_dert_int = data.wthr_dert_int;
            this.repayForm.wthr_dert_adv_rfndd_bkrg = data.wthr_dert_adv_rfndd_bkrg == "1" ? true : false;
            this.repayForm.management_approval_has_been_obtained = data.management_approval_has_been_obtained == "1" ? true : false;
            this.repayForm.rfndd_tp = data.rfndd_tp ? data.rfndd_tp : "1"; //还款类型 默认公账还款
            this.repayForm.cust_appl_dt = data.cust_appl_dt; //还款申请时间
            this.repayForm.derate_overdue_fine = data.derate_overdue_fine;
            this.repayForm.dert_penalt_inst = data.dert_penalt_inst;
            this.repayForm.dert_inst = data.dert_inst;
            this.repayForm.totalReduce = this.sumCalc(
              data.derate_overdue_fine,
              data.dert_penalt_inst,
              data.dert_inst
            ); //减免金额总和
            this.repayForm.aply_adjust_tp = data.aply_adjust_tp;
            this.repayForm.aply_adjust_reason = data.aply_adjust_reason;
            this.repayForm.remark = data.remark;

            //1.公账/扣款列表信息带回显示,还款金额初始化
            if (data.rfndd_tp === "1") {
              this.repayForm.rpymt_amt_pub =
                data.rpymt_amt != "0.00" ? data.rpymt_amt : ""; //还款金额
              this.repayForm.pboprtp_pub = data.pboprtp ? data.pboprtp : "0"; //公账处理方式 默认宕于公账
              this.tableData = data.pbacctsq;
              this.lookSelectAgain(this.tableData); //计算公账金额总和
              //初始化时如果还款金额介于逾期金额和逾期本金之间，打开减免勾选
              if (
                parseFloat(this.repayForm.rpymt_amt_pub) >= this.maxbenj &&
                parseFloat(this.repayForm.rpymt_amt_pub) <
                  parseFloat(this.debtInfoForm.ovdue_amt)
              ) {
                this.sfwrite[0] = false;
              }
            } else if (data.rfndd_tp === "0") {
              this.repayForm.rpymt_amt_per =
                data.rpymt_amt != "0.00"
                  ? data.rpymt_amt
                  : this.debtInfoForm.ovdue_amt; //还款金额
              this.repayForm.pboprtp_per = data.pboprtp; //个人账户处理方式
              this.personPayshow = data.pboprtp === "2" ? true : false; //显示还款方式
              data.pbacctsq.forEach(item => {
                item.factAmt = item.caRestAmt; //扣款成功金额,实际扣款金额
                item.retCode = item.caRemark; //响应码
                item.retText = item.caAbstract; //响应信息
                item.status = item.deduct_status; //扣款状态
                if (item.deduct_status == "1") {
                  this.paystustus = true;
                  this.factAmt = item.caRestAmt;
                }
                this.tableDataTwo.push(item);
              });
              // 扣款成功后，是否可以减免要根据实扣金额和逾期金额判断。
              this.activesfjm(this.factAmt); //判断是否激活发起减免按钮
            }
            //2 减免项保存信息的回显
            // 保存的信息填了减免就展示减免各项
            if (
              data.wthr_dert_ovdue_fine === "1" ||
              data.wthr_dert_pnly_int === "1" ||
              data.wthr_dert_int === "1"
            ) {
              this.repayForm.ifshowjm = true;
              this.rules.aply_adjust_tp[0].required = true;
              this.rules.aply_adjust_reason[0].required = true;
              this.rules.remark[0].required = true;
              this.ifshowAttach = true; //显示四个附加
              // 附件是否必传
              this.ifRequire[0] = true;
              this.ifRequire[1] = true;
            }
            //提前还款关联项赋值----两种还款类型公共处理部分
            if (data.pboprtp === "2") {
              this.ifShowSfjmtqhk = true; //提前还款试算，显示提前还款手续费
              this.getEarPayAmount("0"); //不减免还款手续费
              if (data.wthr_dert_adv_rfndd_bkrg === "1") {
                this.ifshowAttach = true; //显示身份证等四个附件
                // 附件是否必传
                this.ifRequire[0] = true;
                this.ifRequire[1] = true;
                this.repayForm.wthr_dert_adv_rfndd_bkrg = true;
                this.getEarPayAmount(data.rpymt_amt); //提前部分还款的减免手续费
              }
            }
            //3.附件列表名称带回
            for (var i = 0; i < this.formKeyList.length; i++) {
              this.$set(this.fileNameList, i, data[this.formKeyList[i]]);
            }

            // 4.申请调整原因处理
            if (this.repayForm.aply_adjust_reason === "0") {
              this.getLimit();
            }
            // 5.保存提交按钮是否禁用
            this.sfPressbut = data.rpaplstus
              ? data.rpaplstus === "3"
                ? false
                : true
              : false;
            // 添加变量的监听
            this.addWatch();
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     *清除历史缓存数据
     *
     */
    clearHistory() {
      this.basicForm.cust_name = "";
      this.basicForm.cust_no = "";
      this.basicForm.prod_name = "";
      this.basicForm.prod_no = "";
      this.basicForm.apply_no = "";
      this.debtInfoForm.loan_acct_no = "";
      this.debtInfoForm.ovdue_amt = "";
      this.debtInfoForm.loan_bal = "";
      this.debtInfoForm.loan_forms = "";
      this.debtInfoForm.normal_princi = "";
      this.debtInfoForm.overdue_princi = "";
      this.debtInfoForm.stagnant_princi = "";
      this.debtInfoForm.write_off_princi = "";
      this.debtInfoForm.collt_penalt_inst = "";
      this.debtInfoForm.collt_acrued_penalt_inst = ""; //催收应计罚息,不展示
      this.debtInfoForm.recv_accrued_penalt_inst = ""; //应收应计罚息,不展示
      this.debtInfoForm.recv_debit_inst = ""; //应收欠息,不展示
      this.debtInfoForm.collt_debit_inst = ""; //催收欠息,不展示
      this.debtInfoForm.ovdue_acd_int = ""; //逾期应计利息,不展示
      this.debtInfoForm.current_inst = ""; //正常利息，页面展示的计算字段----非接口字段

      this.debtInfoForm.ysfx = ""; //罚息，页面展示的计算字段----非接口字段
      this.debtInfoForm.hxlx = ""; //核销利息，页面展示的计算字段----非接口字段
      this.debtInfoForm.recv_penalt_inst = "";
      this.debtInfoForm.recv_fee = "";
      this.debtInfoForm.is_allow_adv_settle = "";
      this.debtInfoForm.is_allow_part_repay = "";
      this.debtInfoForm.dflt_rpymt_acct_no = "";
      this.repayForm.rfndd_tp= ""; //还款类型，置空
      this.tableData = []; //公账列表清空
      this.tableDataTwo = []; //个人扣款记录清空
      this.repayForm.pbacctsq = []; //公账列表
      this.repayForm.rpymt_amt = "";
      this.repayForm.rpymt_amt_pub = "";
      this.repayForm.rpymt_amt_per = "";
      this.clearRepayHis();
      // 清除监听
      if (!this.isFirstIn) {
        this.unWatch.forEach(item => {
          item();
        });
      }
      this.isFirstIn = false;
    },
    /**
     *清除还款信息缓存
     *
     */
    clearRepayHis() {
      this.repayForm.pboprtp = ""; //公账处理方式
      this.repayForm.pboprtp_pub = "0";
      this.repayForm.pboprtp_per = "";
      this.repayForm.cust_appl_dt = ""; //客户还款申请日期
      this.repayForm.ifshowjm = false; //发起减免，显示减免项
      this.repayForm.aply_adjust_tp = "";
      this.repayForm.aply_adjust_reason = "";
      this.repayForm.remark = "";
      this.repayForm.wthr_dert_ovdue_fine = "0";
      this.repayForm.wthr_dert_pnly_int = "0";
      this.repayForm.wthr_dert_int = "0";
      this.repayForm.derate_overdue_fine = this.nubFormat(0, 2);
      this.repayForm.dert_penalt_inst = this.nubFormat(0, 2);
      this.repayForm.dert_inst = this.nubFormat(0, 2);
      this.repayForm.totalReduce = this.nubFormat(0, 2); //减免总和
      this.repayForm.wthr_pnt_distinct = ""; //初始化值--重置值
      this.repayForm.is_settle_fee = "";
      this.personPayshow = false; //个人账户提前还款
      this.ifwrite = true;
      this.ifrpamount = false;
      this.ifshowAttach = false; //四个附件
      this.repayForm.wthr_dert_adv_rfndd_bkrg = false; //是否减免提前还款手续
      this.repayForm.management_approval_has_been_obtained = false;
      this.repayForm.ifshowjm = false; //发起减免，显示减免项
      this.ifShowSfjmtqhk = false;
      this.$set(this.sfwrite, 0, true);
      this.$set(this.sfwrite, 1, true);
      this.$set(this.sfwrite, 2, true);
      this.$set(this.sfwrite, 3, true);
      this.$set(this.ifRequire, 0, false);
      this.$set(this.ifRequire, 1, false);
      this.$set(this.ifRequire, 2, false);
      this.$set(this.ifRequire, 3, false);
      this.rules.aply_adjust_tp[0].required = false;
      this.rules.aply_adjust_reason[0].required = false;
      this.rules.remark[0].required = false;
      this.earPayAmount = "";
      this.jmtqhkje = "";
      this.idatt = [];
      this.applyatt = [];
      this.crdtatt = [];
      this.othatt = [];
      this.pubatt = [];
      this.fileNameList = [[], [], [], [], []];
    },
    /*
     *添加监听
     *
     */
    addWatch() {
      this.unWatch.push(
        this.$watch(
          "repayForm.rfndd_tp",
          function() {
            this.rfndd_tp();
          },
          { deep: true }
        )
      );
      this.unWatch.push(
        this.$watch(
          "repayForm.rpymt_amt_pub",
          function() {
            this.rpymt_amt(this.repayForm.rpymt_amt_pub);
          },
          { deep: true }
        )
      );
      this.unWatch.push(
        this.$watch(
          "repayForm.rpymt_amt_per",
          function() {
            this.rpymt_amt(this.repayForm.rpymt_amt_per);
          },
          { deep: true }
        )
      );
      this.unWatch.push(
        this.$watch(
          "repayForm.pboprtp_pub",
          function() {
            this.pboprtp(this.repayForm.pboprtp_pub);
          },
          { deep: true }
        )
      );
      this.unWatch.push(
        this.$watch(
          "repayForm.pboprtp_per",
          function() {
            this.pboprtp(this.repayForm.pboprtp_per);
          },
          { deep: true }
        )
      );
      this.unWatch.push(
        this.$watch(
          "repayForm.wthr_dert_adv_rfndd_bkrg",
          function() {
            this.wthr_dert_adv_rfndd_bkrg();
          },
          { deep: true }
        )
      );
      this.unWatch.push(
        this.$watch(
          "repayForm.ifshowjm",
          function() {
            this.ifshowjm();
          },
          { deep: true }
        )
      );
      this.unWatch.push(
        this.$watch(
          "repayForm.aply_adjust_reason",
          function() {
            this.aply_adjust_reason();
          },
          { deep: true }
        )
      );
    },
    //计算减免金额
    updateReduce(val) {
      let a = (parseFloat(this.debtInfoForm.ovdue_amt) - parseFloat(val)).toFixed(
        2
      ); //减免总额
      //  let a = parseFloat(this.debtInfoForm.ovdue_amt)-parseFloat(val);
      let b = parseFloat(this.debtInfoForm.recv_fee); //逾期违约金
      let c = parseFloat(this.debtInfoForm.ysfx); //罚息
      let d = parseFloat(this.debtInfoForm.ovdue_debit_inst); //利息

      this.repayForm.derate_overdue_fine = parseFloat(a < b ? a : b).toFixed(2); //计算减免违约金
      this.repayForm.dert_penalt_inst = parseFloat(
        a > b ? (a - b < c ? a - b : c) : 0
      ).toFixed(2); //计算减免罚息
      this.repayForm.dert_inst = parseFloat(
        a - b > c ? (a - b - c < d ? a - b - c : d) : 0
      ).toFixed(2); //计算减免利息
      //计算减免总额
      this.repayForm.totalReduce = this.sumCalc(
        this.repayForm.derate_overdue_fine,
        this.repayForm.dert_penalt_inst,
        this.repayForm.dert_inst
      );
    },

    /**
     *开始发起扣款
     *
     */
    beginCutMoney() {
      this.checkAll("debt");
    },
    /**
     *查询扣款结果
     *
     */
    queryResults() {
      var params = {
        servicecode: "pl0054",
        applid: this.basicForm.applid //申请编号
      };
      //查询扣款结果
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.tableDataTwo = [];
            var pbdata = res.data.pbacctsq;
            pbdata.forEach(item => {
              item.factAmt = item.caRestAmt; //扣款成功金额,实际扣款金额
              item.retCode = item.caRemark; //响应码
              item.retText = item.caAbstract; //响应信息
              item.status = item.deduct_status; //扣款状态
              this.tableDataTwo.push(item);
              if (item.deduct_status == "1") {
                this.paystustus = true;
                this.factAmt = item.caRestAmt;
              }
            });
            this.activesfjm(this.factAmt); //激活发起减免按钮
            let msg = "查询成功，扣款结果已更新";
            this.$msg({
              message: msg,
              type: "success"
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     *保存表单数据校验
     *
     */
    checkAll(val) {
      //校验顺序：还款金额--减免勾选等--附件上传----表单其他字段
      var amount =
        this.repayForm.rfndd_tp === "1"
          ? this.repayForm.rpymt_amt_pub
          : this.repayForm.rpymt_amt_per;
      var payway =
        this.repayForm.rfndd_tp === "1"
          ? this.repayForm.pboprtp_pub
          : this.repayForm.pboprtp_per;
      //1.校验还款金额格式，是否可以提前还款，提前还款金额范围
      // if (!this.rpymt_amtCheck(amount)) {
      //   return;
      // }
      //2.校验公账处理方式
      if (
        payway != "2" &&
        parseFloat(amount) > parseFloat(this.debtInfoForm.ovdue_amt)
      ) {
        // this.$message({
        //   type: "warning",
        //   message: "还款金额大于逾期金额，请选择提前还款方式"
        // });
        // document.getElementById("pboprtpId").focus();
        // return;
      }
      if (
        payway === "2" &&
        parseFloat(amount) <= parseFloat(this.debtInfoForm.ovdue_amt)
      ) {
        // this.$message({
        //   type: "warning",
        //   message: "还款金额小于或等于逾期金额，不可选择提前还款方式"
        // });
        // document.getElementById("pboprtpId").focus();
        // return;
      }

      //3.发起减免要进行的校验
      //减免金额大于5万，已获得管理层审批未勾选校验
      if (this.ifwrite == false && this.repayForm.management_approval_has_been_obtained == false) {
        this.$message({
          type: "warning",
          message: "已获得管理层审批未勾选"
        });
        return;
      }
      //校验附件是否上传
       var warnTimes = 0;
      // var length =
      //   this.repayForm.rfndd_tp === "1"
      //     ? this.ifRequire.length
      //     : this.ifRequire.length - 1;
      // for (var i = 0; i < length; i++) {
      //   if (this.ifRequire[i] === true && this.fileStatuList[i] === false) {
      //     this.$set(this.warning, i, true);
      //     warnTimes++;
      //   }
      // }
      // if (warnTimes != 0) {
      //   this.$message({
      //     type: "warning",
      //     message: "校验不通过"
      //   });
      // }
      //校验表单必须输入项是否填写
      this.$refs.repayForm.validate(valid => {
        if (val == "submit") {
             this.submitData();
           } else {
            this.saveInfo(val);
           }
        // if (warnTimes == 0 && valid) {
        //   if (val == "submit") {
        //     this.submitData();
        //   } else {
        //     this.saveInfo(val);
        //   }
        // } else {
        //   if (warnTimes == 0) {
        //     this.$message({
        //       type: "warning",
        //       message: "校验不通过"
        //     });
        //   }
        // }
      });
    },
    /**
     *数据转换
     *
     */
    transformData() {
      let params = Object.assign(
        {},
        this.basicForm,
        this.debtInfoForm,
        this.repayForm,
        this.otherInfoForm
      );
      // params.wthr_pnt_distinct = params.wthr_pnt_distinct ? "1" : "0";
      params.wthr_dert_ovdue_fine = params.ifshowjm ? "1" : "0";
      params.wthr_dert_pnly_int = params.ifshowjm ? "1" : "0";
      params.wthr_dert_int = params.ifshowjm ? "1" : "0";
      params.wthr_dert_adv_rfndd_bkrg = params.wthr_dert_adv_rfndd_bkrg ? "1" : "0";
      params.management_approval_has_been_obtained = params.management_approval_has_been_obtained ? "1" : "0";
      // params.is_settle_fee = params.is_settle_fee ? "1" : "0";
      params.rpymt_amt =
        params.rfndd_tp === "1" ? params.rpymt_amt_pub : params.rpymt_amt_per;
      params.pboprtp =
        params.rfndd_tp === "1" ? params.pboprtp_pub : params.pboprtp_per;
      // 上传的附件信息
      params.idatt = this.idatt;
      params.applyatt = this.applyatt;
      params.crdtatt = this.crdtatt;
      params.othatt = this.othatt;
      params.pubatt = this.pubatt;
      // 提前还款减免手续费
      params.jmtqhkje = this.jmtqhkje; //减免提前还款手续费，接口获取
      params.earPayAmount = this.earPayAmount; //当前提前还款总金额，页面显示
      return params;
    },
    /**
     *保存表单数据
     *
     */
    saveInfo(operation) {
      this.dataIntoPb(operation); //公账列表/个人还款列表生成
      let params = this.transformData();
      params.servicecode = "pl0053";
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.tableDataTwo = [];
            var pbdata = res.data.pbacctsq;
            pbdata.forEach(item => {
              item.factAmt = item.caRestAmt; //扣款成功金额,实际扣款金额
              item.retCode = item.caRemark; //响应码
              item.retText = item.caAbstract; //响应信息
              item.status = item.deduct_status; //扣款状态
              this.tableDataTwo.push(item);
              if (item.deduct_status == "1") {
                this.paystustus = true;
                this.factAmt = item.caRestAmt;
              }
            });
            //个人账户校验
            if (this.repayForm.rfndd_tp=== "0") {
              this.activesfjm(this.factAmt); //判断是否激活发起减免按钮
            }

            let msg =
              operation == "save"
                ? "保存成功"
                : "已发起扣款，点击查询结果按钮查看扣款进度";
            this.$msg({
              message: msg,
              type: "success"
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     *提交表单数据
     *
     */
    submitData() {
      this.dataIntoPb("save"); //个人还款公账列表生成
      let params = this.transformData();
      params.servicecode = "pl0053";
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            console.log(res);
            let msg = "提交成功";
            this.$msg({
              message: msg,
              type: "success"
            });
            this.sfPressbut = true; //禁用提交和保存按钮
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 个人还款将列表公账信息带回pbacctsq数组中
     */
    dataIntoPb(operation) {
      this.repayForm.pbacctsq = [];
      // 个人账户还款
      if (this.repayForm.rfndd_tp === "0") {
        // 点击发起扣款按钮
        if (operation == "debt") {
          this.tableDataTwo.forEach(item => {
            item.rfndd_tp = this.repayForm.rfndd_tp;
            this.repayForm.pbacctsq.push(item);
          });
          var item = {
            rfndd_tp: this.repayForm.rfndd_tp,
            applid: this.basicForm.applid,
            lncfno: this.basicForm.lncfno,
            bankName: this.otherInfoForm.rpymt_acct_open_acct_bank_nm,
            provinceName: this.otherInfoForm.rpymt_acct_open_acct_bank_prov,
            cityName: this.otherInfoForm.rpymt_acct_open_acct_bank_city,
            caBankId: this.otherInfoForm.rpacbr,
            caPayer: this.otherInfoForm.derana, //默认还款账号
            caAmt: this.repayForm.rpymt_amt_per, //本次扣款金额
            corporate_account_serl_num: this.otherInfoForm.dflt_rpymt_acct_no //默认还款账户户名
          };
          this.repayForm.pbacctsq.push(item);
          // 点击保存按钮
        } else if (operation == "save") {
          this.tableDataTwo.forEach(item => {
            item.rfndd_tp = this.repayForm.rfndd_tp;
            this.repayForm.pbacctsq.push(item);
          });
        }
      } else {
        // 公账还款
        this.tableData.forEach(item => {
          item.rfndd_tp = this.repayForm.rfndd_tp;
          this.repayForm.pbacctsq.push(item);
        });
      }
    },
    /**
     *获取提前还款手续费
     *
     */
    getEarPayAmount(val) {
      if (val === "") {
        this.$message({
          type: "warning",
          message: "请输入还款金额"
        });
        document.getElementById("rpamountId").focus();
        return;
      }
      var params = {
        servicecode: "PLMSKGTS0031",
        lncfno: this.basicForm.lncfno, //贷款借据号
        tranam: val, //交易金额
        repytp: "4", //还款种类 ：1-结清贷款 2- 归还欠款  4-部分还款
        adrptp: "2", //提前还款类型：1-结清贷款 2-指定总额   3-全部结清
        feflag: "1", //收取手续费标志：
        remark: "" //备注信息
      };
      // 获取提前结清金额，核销状态影响传参
      if (val === "0") {
        params.repytp = this.debtInfoForm.loan_forms === "4" ? "2" : "1"; //还款种类 ：1-结清贷款 2- 归还欠款  4-部分还款
        params.adrptp = this.debtInfoForm.loan_forms === "4" ? "2" : "3"; //提前还款类型：1-结清贷款 2-指定总额   3-全部结清
      }

      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            let data = res.data;

            if (val === "0") {
              this.maxjmtqhkje = data.ysxxpe
                ? parseFloat(data.ysxxpe).toFixed(2)
                : "0.00"; //最大减免提前还款手续费
              this.maxpay = data.totamo ? data.totamo : "0.00"; //不减免还款手续费的提前结清金额
              this.earPayAmount = parseFloat(this.maxpay).toFixed(2); //不减免还款手续费的提前结清金额
            } else {
              this.jmtqhkje = data.ysxxpe
                ? parseFloat(data.ysxxpe).toFixed(2)
                : "0.00"; //当前减免提前还款手续费金额
              this.earPayAmount = parseFloat(
                parseFloat(this.maxpay) - parseFloat(this.maxjmtqhkje)
              ).toFixed(2); //减免还款手续费的提前结清金额
            }
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     *获取上传附件状态路径信息
     *
     */
    getFileInfo(singleFile, operation) {
      for (var i = 0; i < this.formKeyList.length; i++) {
        if (this.formKeyList[i] === singleFile.attkey) {
          if (operation === "add") {
            switch (i) {
              case 0:
                this.idatt.push(singleFile);
                break;
              case 1:
                this.applyatt.push(singleFile);
                break;
              case 2:
                this.crdtatt.push(singleFile);
                break;
              case 3:
                this.othatt.push(singleFile);
                break;
              case 4:
                this.pubatt.push(singleFile);
                break;
            }
            this.$set(this.fileStatuList, i, true);
          } else {
            switch (i) {
              case 0:
                this.deleteFile(i, this.idatt, singleFile.atturl);
                break;
              case 1:
                this.deleteFile(i, this.applyatt, singleFile.atturl);
                break;
              case 2:
                this.deleteFile(i, this.crdtatt, singleFile.atturl);
                break;
              case 3:
                this.deleteFile(i, this.othatt, singleFile.atturl);
                break;
              case 4:
                this.deleteFile(i, this.pubatt, singleFile.atturl);
                break;
            }
          }
        }
      }
    },
    deleteFile(i, arr, atturl) {
      arr.forEach(item => {
        if (item.atturl === atturl) {
          var index = arr.indexOf(item);
          arr.splice(index, 1);
        }
      });
      if (arr.length === 0) {
        this.$set(this.fileStatuList, i, false);
      }
    },
    /**
     * 获取减免上限
     */
    getLimit() {
      let params = {
        servicecode: "pl0066",
        lncfno: this.basicForm.lncfno
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            let data = res.data;
            this.maxredcznf = this.nubFormat(
              parseFloat(this.debtInfoForm.ysxxfe) *
                parseFloat(data.redu_cost_max / 100),
              2
            );
            //减免费用上限
            this.maxredcni = this.nubFormat(
              parseFloat(this.debtInfoForm.debtin) *
                parseFloat(data.redu_Inte_max / 100),
              2
            ); //减免利息上限
            this.maxredcpi = this.nubFormat(
              parseFloat(this.debtInfoForm.ysfx) *
                parseFloat(data.redu_pena_Inte_max / 100),
              2
            ); //减免罚息上限
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /*=========================================服务实现end====================================== */
    /*=========================================校验类方法start====================================== */
    /**
     *及时校验还款金额
     *1.公共校验：格式，是否允许提前还款
     *2.分层校验：公账校验，个人账户校验
     */
    rpamountCheck(val) {
      console.log(val);
      var payway =
        this.repayForm.rfndd_tp === "1"
          ? this.repayForm.pboprtp_pub
          : this.repayForm.pboprtp_per; //获取账户处理方式值
      var reg1 = /^[1-9]\d*(?=\.{0,1}\d+$|$)/;
      var reg2 = /^0(?=\.{1}\d+$|$)/;
      if ((reg1.test(val) || reg2.test(val)) && parseFloat(val) != 0) {
        //  判断是否可以提前还款
        if (parseFloat(val) > parseFloat(this.debtInfoForm.lnream)) {
          if (
            this.debtInfoForm.is_allow_adv_settle === "0" &&
            this.debtInfoForm.is_allow_part_repay === "0"
          ) {
            this.$message({
              type: "warning",
              message: "该笔借据不允许提前还款，还款金额应小于等于逾期金额"
            });
            document.getElementById("rpamountId").focus();
            return false;
          } else if (
            this.debtInfoForm.is_allow_adv_settle === "1" &&
            this.debtInfoForm.is_allow_part_repay === "0"
          ) {
            // 提前还款试算后不再提示
            if (this.earPayAmount === "") {
              this.$message({
                type: "warning",
                message:
                  "该笔借据不允许提前部分还款，请选择'提前还款'获取提前还款试算结果"
              });
              document.getElementById("rpamountId").focus();
              return false;
            }
          } else {
            // if (this.earPayAmount === "") {
            //   this.$message({
            //     type: "warning",
            //     message:
            //       "还款金额大于解除逾期金额，请选择'提前还款'获取提前还款试算结果"
            //   });
            //   document.getElementById("rpamountId").focus();
            //   return false;
            // }
          }
        }
        // 选择提前还款后，还款金额值范围校验
        if (payway == "2") {
          if (this.earPayAmount != undefined) {
            if (parseFloat(val) > parseFloat(this.earPayAmount)) {
              this.$message({
                type: "warning",
                message: "还款金额不能大于提前结清最大金额" + this.earPayAmount
              });
              document.getElementById("rpamountId").focus();
              return false;
            }
          } else {
            this.$message({
              type: "warning",
              message:
                "提前结清最大金额获取失败，请重新勾选是否减免提前还款手续费"
            });
            return false;
          }
        }
        // 公账校验
        if (this.repayForm.rfndd_tp == "1") {
          if (parseFloat(val) > parseFloat(this.rpamountA)) {
            if (this.errorTimes[0] == 0) {
              this.$message({
                type: "warning",
                message: "还款金额不能大于公账金额总和"
              });
              this.errorTimes[0] += 1;
              setTimeout(() => {
                this.errorTimes[0] = 0;
              }, 3000);
              return false;
            }
          }
        }
        return true;
      } else {
        if (this.errorTimes[1] == 0) {
          this.$message({
            type: "warning",
            message: "还款金额不符合规则(不能为空、为零、负数、字母等)"
          });
          this.errorTimes[1] += 1;
          setTimeout(() => {
            this.errorTimes[1] = 0;
          }, 3000);
          return false;
        }
      }
    },

    /**
     *减免上限校验
     *
     */
    derate_overdue_fineCheck(rule, value, callback) {
      if (this.repayForm.aply_adjust_reason === "0") {
        if (parseFloat(this.repayForm.derate_overdue_fine) > parseFloat(this.maxredcznf)) {
          return callback(
            new Error(`减免逾期违约金不能超过${this.maxredcznf}`)
          );
        }
      }
      return callback();
    },
    redcniCheck(rule, value, callback) {
      if (this.repayForm.aply_adjust_reason === "0") {
        if (parseFloat(this.repayForm.dert_inst) > parseFloat(this.maxredcni)) {
          return callback(new Error(`减免利息不能超过${this.maxredcni}`));
        }
      }
      return callback();
    },
    dert_penalt_instCheck(rule, value, callback) {
      if (this.repayForm.aply_adjust_reason === "0") {
        if (parseFloat(this.repayForm.dert_penalt_inst) > parseFloat(this.maxredcpi)) {
          return callback(new Error(`减免罚息不能超过${this.maxredcpi}`));
        }
      }
      return callback();
    },

    /*=========================================校验类方法end====================================== */

    lookClose() {
      this.showLookup = false;
    },

    /*=========================================工具方法start====================================== */
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
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
            return this[listKey];
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 个人账户处理方式
     */
    getpboprtpList_per() {
      this.pboprtpList_per = this.pboprtpList;
      this.pboprtpList_per.forEach(item => {
        if (item.dictId === "2") {
          item.disabled = true;
        }
      });
    },

    /**
     * 是否锁定转换
     */
    dattypTranslate(val) {
      for (let index = 0; index < this.dattypList.length; index++) {
        const item = this.dattypList[index];
        if (val === item.dictId) return item.dictName;
      }
    },
    /**
     * 扣款状态转换
     */
    statusTranslate(val) {
      for (let index = 0; index < this.paystatuList.length; index++) {
        const item = this.paystatuList[index];
        if (val === item.dictId) return item.dictName;
      }
    },
    /**
     * 回显计算公账金额总和
     */
    lookSelectAgain(tableList) {
      let rpamountChild = 0;
      let map = {};
      this.tableData.forEach(item => {
        map[item.corporate_account_serl_num] = true;
      });
      //将tablelist数据放入tabledata,如果序号相同，则不放入
      tableList.forEach(item => {
        if (!map[item.corporate_account_serl_num]) {
          this.tableData.push(item);
        }
      });
      this.tableData.forEach(item => {
        item.rfndd_tp = this.repayForm.rfndd_tp;
        rpamountChild += parseFloat(item.caRestAmt);
      });
      this.rpamountA = this.nubFormat(rpamountChild, 2);
    },
    /**
     * 公账选择带回回调
     */
    lookSelect(tableList, dattypList) {
      let rpamountChild = 0;
      this.dattypList = dattypList;
      let map = {};
      this.tableData.forEach(item => {
        map[item.corporate_account_serl_num] = true;
      });
      tableList.forEach(item => {
        if (!map[item.corporate_account_serl_num]) {
          this.tableData.push(item);
        }
      });
      this.tableData.forEach(item => {
        item.rfndd_tp = this.repayForm.rfndd_tp;
        rpamountChild += parseFloat(item.caRestAmt);
      });
      this.rpamountA = this.nubFormat(rpamountChild, 2);
      this.repayForm.rpamount_pub = this.rpamountA;
      this.lookClose();
      console.log(this.repayForm.pbacctsq);
    },
    /**
     * 删除列表数据
     */
    deleteItem(item) {
      console.log(item);
      let rpamountChild = 0;
      let index = 0;
      this.tableData.forEach((ele, i) => {
        if (ele === item.row) index = i;
      });
      this.tableData.splice(index, 1);
      this.repayForm.pbacctsq = [];
      this.tableData.forEach(item => {
        this.repayForm.pbacctsq.push(item);
        rpamountChild += parseFloat(item.caRestAmt);
      });
      this.rpamountA = this.nubFormat(rpamountChild, 2);
      this.repayForm.rpamount_pub = this.rpamountA;
    },
    /**
     *重置填写的信息
     *
     */
    reset() {
      this.$refs.repayForm.resetFields();
      this.ifshowjm = false;
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
     * 数字格式化成金额
     * @param  金额
     * @param 小数点后面有几位 (四舍五入到指定的位数)
     *
     */
    nubFormat(s, n) {
      n = n > 0 && n <= 20 ? n : 2;
      s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
      var l = s
          .split(".")[0]
          .split("")
          .reverse(),
        r = s.split(".")[1];
      var t = "";
      for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "" : ""); //加分隔符
      }
      return (
        t
          .split("")
          .reverse()
          .join("") +
        "." +
        r
      );
    },
    /**
     * 复制文字数字
     *
     */
    copyContent(val) {
      var input = document.createElement("input"); // 直接构建input
      input.value = val === "0" ? this.earPayAmount : this.jmtqhkje;
      // 设置内容 需要复制的内容
      document.body.appendChild(input); // 添加临时实例
      input.select();
      document.execCommand("Copy");
      document.body.removeChild(input); // 删除临时实例
    }
    /*======================================================工具方法end====================================== */
  }
};
</script>
<style lang="less" scoped>
.checkbx-label-style {
  padding: 0;
  .el-row .el-col {
    padding-right: 16px;
  }
  .el-form-item {
    margin-bottom: 16px;
  }
  .el-checkbox {
    line-height: 36.8px;
    /deep/.el-checkbox__label {
      font-size: 14px !important;
    }
  }
  .child {
    /deep/.el-form-item__content {
      margin-left: 13px !important;
    }
  }
  /deep/.el-form-item__label {
    width: 134px !important;
  }
  /deep/.el-form-item__content {
    margin-left: 134px !important;
    .el-select {
      width: 100% !important;
    }
  }
}
.caSeq-table {
  padding: 10px 30px;
}
.border-Line {
  padding: 10px 20px;
  margin: 10px 30px 30px 30px;
  border: 1px solid #ced2d6;
  border-radius: 10px;
}

.earPay-style {
  display: flex;
  // justify-content: center;
  line-height: 36px;
  font-size: 13px;
  color: #d04141;
  font-family: "Roboto", Helvetica Neue, Helvetica, Arial, sans-serif;
  -webkit-user-select: text;
}
.repay-upload {
  /deep/.el-form.custom-common--form {
    padding: 6px 0 6px 0;
  }
}
</style>
