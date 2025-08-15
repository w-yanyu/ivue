<template>
  <div>
    <div class="todo-top">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="240px"
        class="custom-common--form"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item :rules="[{ required: false, message: '此项为必填项' }]" class="upload-item" :label="$i18ns('借据号')"
                          prop="loan_no">
              <el-input v-model="ruleForm.loan_no" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$i18ns('还款间隔')" prop="repay_interval" class="upload-item">
              <el-select
                v-model="ruleForm.repay_interval"
                :placeholder="$i18ns('请选择')"
                :disabled="true"
              >
                <el-option
                  v-for="item in this.rpymFreqList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$i18ns('利率调整模式')" prop="inst_rate_adjust_mode" class="upload-item">
              <el-select
                v-model="ruleForm.inst_rate_adjust_mode"
                :placeholder="$i18ns('请选择')"
                :disabled="true"
              >
                <el-option
                  v-for="item in this.rateAdjModeList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$i18ns('分期期数')"
              prop="installment_num"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <el-input v-model="ruleForm.installment_num" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$i18ns('起息日')"
              prop="start_inst_date"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <el-date-picker
                v-model="ruleForm.start_inst_date"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyyMMdd"
                :disabled="true"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$i18ns('到期日')"
              prop="matu_date"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <el-date-picker
                :disabled="true"
                v-model="ruleForm.matu_date"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyyMMdd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$i18ns('期限(月)')"
              prop="periods"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <el-input v-model="ruleForm.periods" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$i18ns('放款金额')"
              prop="lend_amt"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <scene-currency v-model="ruleForm.lend_amt" clearable :disabled="true"></scene-currency>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  :label="$i18ns('放款币种')" prop="ccy_code" class="upload-item">
              <el-select
                v-model="ruleForm.ccy_code"
                :placeholder="$i18ns('请选择')"
                :disabled="true"
              >
                <el-option
                  v-for="item in this.ccyCdList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$i18ns('汇率')"
              prop="exchange_rate"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <el-input value="1" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  :label="$i18ns('基准金额')" prop="base_amt" class="upload-item">
              <scene-currency v-model="ruleForm.base_amt" :disabled="true"></scene-currency>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$i18ns('基准币种')" prop="base_ccy" class="upload-item">
              <el-select
                v-model="ruleForm.base_ccy"
                :placeholder="$i18ns('请选择')"
                :disabled="true"
              >
                <el-option
                  v-for="item in this.baseCcyCdList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$i18ns('执行利率(%)')"
              prop="loan_inst_rate"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <el-input v-model="ruleForm.loan_inst_rate" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$i18ns('逾期/复息利率(%)')"
              prop="overdue_inst_rate"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <el-input v-model="ruleForm.overdue_inst_rate" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$i18ns('放款网点')"
              prop="acct_branch"
              class="upload-item"
            >
              <el-input v-model="ruleForm.acct_branch" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$i18ns('贷款科目号')"
              prop="subj_no"
              class="upload-item"
            >
              <el-input v-model="ruleForm.subj_no" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$i18ns('是否涉农')"
              prop="farm_flag"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <el-select
                v-model="ruleForm.farm_flag"
                :placeholder="$i18ns('请选择')"
                @change="changeFarmFlag"
                :disabled="true"
              >
                <el-option
                  v-for="item in this.isYESORNOList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$i18ns('是否微利')"
              prop="is_small_profit"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <el-select
                v-model="ruleForm.is_small_profit"
                :placeholder="$i18ns('请选择')"
                :disabled="true"
              >
                <el-option
                  v-for="item in this.isYESORNOList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$i18ns('贷款经营类型')"
              prop="loan_oprt_type_cd"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <el-select
                v-model="ruleForm.loan_oprt_type_cd"
                :placeholder="$i18ns('请选择')"
                :disabled="true"
              >
                <el-option
                  v-for="item in this.lnOperationTypeCdList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  :label="$i18ns('是否受托支付')" prop="trust_pay_limit_flag" class="upload-item">
              <el-select
                v-model="ruleForm.trust_pay_limit_flag"
                :placeholder="$i18ns('请选择')"
                :disabled="true"
              >
                <el-option
                  v-for="item in this.isYESORNOList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  :label="$i18ns('受托支付限额(折基准币种)')" prop="trust_pay_amt" class="upload-item">
              <scene-currency v-model="ruleForm.trust_pay_amt" :disabled="true"></scene-currency>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$i18ns('是否融资平台放款(人行)')"
              prop="is_pbc"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <el-select
                v-model="ruleForm.is_pbc"
                :placeholder="$i18ns('请选择')"
                @change="changeRzrhFlag"
                :disabled="true"
              >
                <el-option
                  v-for="item in this.isYESORNOList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$i18ns('是否融资平台贷款(银监)')"
              prop="is_cbrc"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <el-select
                v-model="ruleForm.is_cbrc"
                :placeholder="$i18ns('请选择')"
                :disabled="true"
              >
                <el-option
                  v-for="item in this.isYESORNOList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  :label="$i18ns('住房面积选项')" prop="house_area" class="upload-item">
              <el-select
                v-model="ruleForm.house_area"
                :placeholder="$i18ns('请选择')"
                :disabled="true"
              >
                <el-option
                  v-for="item in this.houseAreaList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$i18ns('银团贷款标识')"
              prop="club_loan_flag"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <el-select
                v-model="ruleForm.club_loan_flag"
                :placeholder="$i18ns('请选择')"
                @change="changeClubNewFlagStatus"
                :disabled="true"
              >
                <el-option
                  v-for="item in this.clubNewFlagList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="this.isClubNewFlagStatus">
            <el-form-item  :label="$i18ns('银团贷款明细')" prop="club_loan_type" class="upload-item">
              <el-select
                v-model="ruleForm.club_loan_type"
                :placeholder="$i18ns('请选择')"
                :disabled="true"
              >
                <el-option
                  v-for="item in this.clubNewTypeList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$i18ns('是否工业转型升级')"
              prop="industry_transfor_flag"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <el-select
                v-model="ruleForm.industry_transfor_flag"
                :placeholder="$i18ns('请选择')"
                :disabled="true"
              >
                <el-option
                  v-for="item in this.isYESORNOList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$i18ns('是否新兴产业')"
              prop="new_industry_flag"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <el-select
                v-model="ruleForm.new_industry_flag"
                :placeholder="$i18ns('请选择')"
                @change="changeNewzlFlagStatus"
                :disabled="true"
              >
                <el-option
                  v-for="item in this.isYESORNOList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="this.isNewzlFlagStatus">
            <el-form-item
              :label="$i18ns('新兴产业类型')"
              prop="new_industry_type"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <el-select
                v-model="ruleForm.new_industry_type"
                :placeholder="$i18ns('请选择')"
                :disabled="true"
              >
                <el-option
                  v-for="item in this.newzlFlagList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$i18ns('是否项目贷款')"
              prop="proj_loan_flag"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <el-select
                v-model="ruleForm.proj_loan_flag"
                :placeholder="$i18ns('请选择')"
                :disabled="true"
              >
                <el-option
                  v-for="item in this.isYESORNOList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$i18ns('贷款种类')"
              prop="loan_kind"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <el-select
                v-model="ruleForm.loan_kind"
                :placeholder="$i18ns('请选择')"
                :disabled="true"
              >
                <el-option
                  v-for="item in this.lnKindList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$i18ns('是否涉及财政扶持')"
              prop="is_support_flag"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <el-select
                v-model="ruleForm.is_support_flag"
                :placeholder="$i18ns('请选择')"
                @change="changeLnSupportFlagStatus"
                :disabled="true"
              >
                <el-option
                  v-for="item in this.isYESORNOList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="isLnSupportFlagStatus">
            <el-form-item
              :label="$i18ns('贷款财政扶持方式')"
              prop="loan_support_type"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <el-input
                v-model="this.ln_support_type_name"
                @focus="clickLookupTree('loan_support_type')"
                clearable
                @clear="clear('loan_support_type')"
                :disabled="true"></el-input>
              <el-input v-model="ruleForm.loan_support_type" v-show="false" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              :label="$i18ns('是否涉房地产')"
              prop="realty_flag"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <el-select
                v-model="ruleForm.realty_flag"
                :placeholder="$i18ns('请选择')"
                @change="changeHouseFlag"
                :disabled="true"
              >
                <el-option
                  v-for="item in this.isYESORNOList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="this.isHouseFlagStatus">
            <el-form-item
              :label="$i18ns('是否房地产开发借款')"
              prop="is_realty_deve_loan"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <el-select
                v-model="ruleForm.is_realty_deve_loan"
                :placeholder="$i18ns('请选择')"
                @change="changeIsHouseLn"
                :rules="[{ required: false, message: '此项为必填项' }]"
                :disabled="true"
              >
                <el-option
                  v-for="item in this.isYESORNOList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8" v-if="isHouseLnStatus">
            <el-form-item
              :label="$i18ns('房地产开发类型')"
              prop="realty_deve_type"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <el-select
                v-model="ruleForm.realty_deve_type"
                :placeholder="$i18ns('请选择')"
                @change="changeSafeLiveFlagList"
                :rules="[{ required: false, message: '此项为必填项' }]"
                :disabled="true"
              >
                <el-option
                  v-for="item in this.safeLiveFlagList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" v-if="isSafeLiveFlagStatus">
            <el-form-item
              :label="$i18ns('保障性安居工程类型')"
              prop="safe_live_code"
              class="upload-item"
              :rules="[{ required: false, message: '此项为必填项' }]"
            >
              <el-input
                v-model="this.safe_live_name"
                @focus="clickLookupTree('safe_live_code')"
                clearable
                @clear="clear('safe_live_code')"
                :disabled="true"></el-input>
              <el-input v-model="ruleForm.safe_live_code" v-show="false" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              :label="$i18ns('贷款投向(新标准)')"
              prop="loan_invest"
              class="upload-item"
            >
              <el-input
                v-model="this.ln_invest_new_name"
                :disabled="true"></el-input>
              <el-input v-model="ruleForm.loan_invest" v-show="false" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item
              :label="$i18ns('限制或鼓励行业(新标准)')"
              prop="restrict_encourage_new"
              class="upload-item"
            >
              <el-input
                v-model="this.ln_ltwy_new_desc_name"
                @focus="clickLookupTree('restrict_encourage_new')"
                clearable
                @clear="clear('restrict_encourage_new')"
                :disabled="true"></el-input>
              <el-input v-model="ruleForm.restrict_encourage_new" v-show="false" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-dialog
        title="选择"
        v-if="dialogVisible"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose"
        top="30vh"
        :append-to-body="true"
      >
        <LookupTree ref="LookupTree" @closeDialog="closeDialog" :treeTitle="this.treeTitle"
                    :treeType="this.treeType"></LookupTree>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
import MyMessage from "pte-ui/utils/MyMessage";
import LookupTree from "../../../../modules/lookUpTree.vue";
import SceneCurrency from "../../../../components/SceneCurrency";

export default {
  name: "IOUDetails",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  components: {
    SceneCurrency,
    LookupTree
  },
  data() {
    return {
      ruleForm: {},
      rpymFreqList: [],//还款间隔
      rateAdjModeList: [],//利率调整模式
      ccyCdList: [], //放款币种
      baseCcyCdList: [], //基准币种
      brchCdList: [], //放款网点下拉框
      glAcctNoList: [], //贷款科目号下拉框
      isYESORNOList: [], //是否涉农
      isHouseFlagStatus: false, //是否涉房地产状态
      isHouseLnStatus: false, //是否房地产开发借款状态
      safeLiveFlagList: [], //房地产开发类型下拉框
      isSafeLiveFlagStatus: false, //房地产开发类型选中状态
      safeLiveCdList: [], //房地产开发类型下拉框
      safeLiveNameList: [], //保障性安居工程类型下拉框
      clubNewFlagList: [], //银团贷款标识下拉框
      isClubNewFlagStatus: false, //银团贷款标识选中状态
      clubNewTypeList: [], //银团贷款明细下拉框
      lnSupportFlagList: [], //是否涉及财政扶持下拉框
      isLnSupportFlagStatus: false, //是否涉及财政扶持选中状态
      lnSupportTypeList: [], //贷款财政扶持方式下拉框
      gyzxFlagList: [], //是否工业转型升级下拉框
      zlzxFlagList: [], //是否新兴产业下拉框
      newzlFlagList: [], //新兴产业类型下拉框
      isNewzlFlagStatus: false, //是否新兴产业选中状态
      projFlagList: [], //是否项目贷款下拉框
      lnKindList: [], //贷款种类下拉框

      c_$meta: {},
      c_$scope: {},
      c_$params: {
        lend_no: "", //放款序号
        appl_id: "", // 申请书编号
      },
      safe_live_name: "", //保障性安居工程类型
      ln_invest_new_name: "",//贷款投向新标准名
      ln_invest_name: "",//贷款投向旧标准名
      ln_ltwy_new_desc_name: "",//限制或鼓励行业(新标准)名
      ln_support_type_name: "",//贷款财政扶持方式名
      dialogVisible: false,
      pageType: "",
      submitLoading: false, // 防止多次提交
      treeType: "",
      nodeCd: "",
      nodeName: "",
      nodeList: [],
      treeTitle: "",
      is_YES: "1",
      is_NO: "0",
    };
  },
  created() {
    this.getDictList("MS_E_YESORNO","isYESORNOList");//获取数据字典MS_E_YESORNO
    this.getDictList("MS_CURRENCY","ccyCdList");//ccyCdList获取数据字典MS_CURRENCY
    this.getDictList("MS_CURRENCY","baseCcyCdList");//baseCcyCdList获取数据字典MS_CURRENCY
    this.getDictList("AR_E_SAFE_LIVE_TYPE","safeLiveFlagList");//safeLiveFlagList获取数据字典AR_E_SAFE_LIVE_TYPE
    this.getDictList("AR_E_LOAN_BUSI_TYPE","lnOperationTypeCdList");//获取数据字典AR_E_LOAN_BUSI_TYPE
    this.getDictList("AR_E_HOUSE_AREA","houseAreaList");//获取数据字典AR_E_HOUSE_AREA
    this.getDictList("AR_E_CLUB_LOAN_FLAG","clubNewFlagList");//获取数据字典AR_E_CLUB_LOAN_FLAG
    this.getDictList("AR_E_CLUB_LOAN_DETAIL","clubNewTypeList");//获取数据字典AR_E_CLUB_LOAN_DETAIL
    this.getDictList("AR_E_NEW_INDUSTRY_TYPE","newzlFlagList");//获取数据字典AR_E_NEW_INDUSTRY_TYPE
    this.getDictList("AR_E_LOAN_TYPE","lnKindList");//获取数据字典AR_E_LOAN_TYPE
    this.getDictList("AR_APPLY_REPAY_FREQ","rpymFreqList",);//获取数据字典AR_APPLY_REPAY_FREQ
    this.getDictList("AR_E_RATE_ADJUST_MODE","rateAdjModeList");//获取数据字典AR_E_RATE_ADJUST_MODE
    // this.getBrchCdDict(this.cParentParams.appl_id);//获取数据字典放款网点
    // this.getGlAcctNoDict(this.cParentParams.appl_id);//获取数据字典科目号
    this.getBrchCdDict();//获取数据字典放款网点
    this.getGlAcctNoDict();//获取数据字典科目号
    this.getLoanDetails(this.cParentParams);//根据申请书编号查询放款明细
    this.pageType = this.cParentParams.pageType //页面类型
    this.c_$params.apply_no = this.cParentParams.apply_no; // appid参数传递
  },
  watch: {
    //监听涉农
    'ruleForm.farm_flag': {
      handler() {
        let data = {
          name: "farm_flag",
          value: false
        }
        if (this.ruleForm.farm_flag === this.is_NO || this.ruleForm.farm_flag === null || this.ruleForm.farm_flag === "") {
          data.value = false;
        }
        if (typeof(this.ruleForm.farm_flag) != "undefined"){
          this.$emit("update", data);
        }
      },
      immediate: true
    },
    //监听设融资平台
    'ruleForm.is_pbc': {
      handler() {
        let data = {
          name: "is_pbc",
          value: true
        }
        if (this.ruleForm.is_pbc === this.is_NO || this.ruleForm.is_pbc === null || this.ruleForm.is_pbc === "") {
          data.value = false;
        }
        if (typeof(this.ruleForm.is_pbc) != "undefined"){
          this.$emit("update", data);
        }
      },
      immediate: true
    },
    //监听涉房地产开发
    'ruleForm.realty_flag': {
      handler() {
        let data = {
          name: "realty_flag",
          value: true
        }
        if (this.ruleForm.realty_flag === this.is_NO || this.ruleForm.realty_flag === null || this.ruleForm.realty_flag === "") {
          data.value = false;
          this.isHouseFlagStatus = false;
        } else {
          this.isHouseFlagStatus = true;
        }
        if (typeof(this.ruleForm.realty_flag) != "undefined"){
          this.$emit("update", data);
        }
      },
      immediate: true
    },
    //监听涉项目贷款开发
    'ruleForm.proj_loan_flag': {
      handler() {
        let data = {
          name: "proj_loan_flag",
          value: true
        }
        if (this.ruleForm.proj_loan_flag === this.is_NO || this.ruleForm.proj_loan_flag === null || this.ruleForm.proj_loan_flag === "") {
          data.value = false;
        }
        if (typeof(this.ruleForm.proj_loan_flag) != "undefined"){
          this.$emit("update", data);
        }
      },
      immediate: true
    },
    //监听涉房地产状态
    'isHouseFlagStatus': {
      handler() {
        if (this.isHouseFlagStatus === false) {
          this.ruleForm.is_house_ln = "";
        }
      },
      immediate: true
    },
    //监听是否房地产开发借款
    'ruleForm.is_house_ln': {
      handler() {
        if (this.ruleForm.is_house_ln === this.is_YES) {
          this.isHouseLnStatus = true;
        } else {
          this.isHouseLnStatus = false;
          this.isSafeLiveFlagStatus = false;
          this.ruleForm.safe_live_flag = "";
        }
      },
      immediate: true
    },
    //监听房地产开发类型
    'ruleForm.safe_live_flag': {
      handler() {
        if (this.ruleForm.safe_live_flag === "10201" || this.ruleForm.safe_live_flag === "10202") {
          this.isSafeLiveFlagStatus = true;
        } else {
          this.isSafeLiveFlagStatus = false;
          this.ruleForm.safe_live_cd = "";
        }
      },
      immediate: true
    },
    //监听银行财团标识
    'ruleForm.club_new_flag': {
      handler() {
        if (this.ruleForm.club_new_flag === "3") {
          this.isClubNewFlagStatus = false;
          this.ruleForm.club_new_type = "";
        } else {
          this.isClubNewFlagStatus = true;
        }
      },
      immediate: true
    },
    //监听是否财政支持
    'ruleForm.ln_support_flag': {
      handler() {
        if (this.ruleForm.ln_support_flag === this.is_YES) {
          this.isLnSupportFlagStatus = true;
        } else {
          this.isLnSupportFlagStatus = false;
          this.ruleForm.ln_support_type = "";
        }
      },
      immediate: true
    },
    //监听是否新兴产业
    'ruleForm.zlzx_flag': {
      handler() {
        if (this.ruleForm.zlzx_flag === this.is_YES) {
          this.isNewzlFlagStatus = true;
        } else {
          this.isNewzlFlagStatus = false;
          this.ruleForm.newzl_flag = "";
        }
      },
      immediate: true
    },
    'ruleForm.loan_invest': {
      handler() {
        let that = this;
        let loan_invest = that.ruleForm.loan_invest;
        if (typeof (loan_invest) != "undefined" && loan_invest !== "" && loan_invest !== null) {
          let tree_type = "1";
          that.getTreeIDAndName(loan_invest, tree_type, (data) => {
            that.ln_invest_new_name = data;
          });
        } else {
          that.ln_invest_new_name = "";
        }
      },
      immediate: true
    },
    'ruleForm.restrict_encourage_new': {
      handler() {
        let that = this;
        let restrict_encourage_new = that.ruleForm.restrict_encourage_new;
        if (typeof (restrict_encourage_new) != "undefined" && restrict_encourage_new !== "" && restrict_encourage_new !== null) {
          let tree_type = "3";
          that.getTreeIDAndName(restrict_encourage_new, tree_type, (data) => {
            that.ln_ltwy_new_desc_name = data;
          });
        } else {
          that.ln_ltwy_new_desc_name = "";
        }
      },
      immediate: true
    }
  },
  methods: {
    /**
     * 获取放款明细信息
     */
    getLoanDetails(params) {
      let condition = {
        apply_no: params.apply_no,
        lend_no: params.lend_no,
        servicecode: "ar0542",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", condition)
        .then((res) => {
          if (res && res.code === "200") {
            this.ruleForm = res.data;
            if(this.ruleForm.repay_interval.indexOf("1M") != -1){
              this.rpymFreqList.unshift({
                dictId: this.ruleForm.repay_interval,
                dictName: this.$i18ns('一个月'),
              })
            }else if(this.ruleForm.repay_interval.indexOf("3M") != -1){
              this.rpymFreqList.unshift({
                dictId: this.ruleForm.repay_interval,
                dictName: this.$i18ns('三个月'),
              })
            }
            // this.topInpt(res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
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
     * 查询科目号数据字典
     */
    getGlAcctNoDict() {
      let request_map = {};
      let request_url = "/SUMP/icmcall/icmRPCCall";
      request_map["servicecode"] = "ICMSLNTS1021";
      request_map["appl_id"] = "appl_id";
      this.$http
        .invokeAPI(request_url, "post", request_map)
        .then((response) => {
          if (response.code === "200") {
            this.glAcctNoList = response.data;
            console.log("===========++++++++++=========", this.glAcctNoList);
          } else {
            MyMessage({
              message: response.message,
              type: "error",
            });
          }
        });
    },
    /**
     * 查询放款网点数据字典
     */
    getBrchCdDict() {
      let request_map = {};
      let request_url = "/SUMP/icmcall/icmRPCCall";
      request_map["servicecode"] = "ICMSLNTS1020";
      request_map["appl_id"] = "appl_id";
      this.$http
        .invokeAPI(request_url, "post", request_map)
        .then((response) => {
          if (response.code === "200") {
            this.brchCdList = response.data;
          } else {
            MyMessage({
              message: response.message,
              type: "error",
            });
          }
        });
    },
    /**
     * 查询父节点的name
     */
    getTreeIDAndName(nodeCd,treeType,callback) {
      let request_map = {};
      let request_url = "/SUMP/icmcall/icmRPCCall";
      request_map["servicecode"] = "ct2202";
      request_map["node_cd"] = nodeCd;
      request_map["tree_type"] = treeType;
      let nodeName = "";
      this.$http.invokeAPI(request_url, "post", request_map)
        .then((response) => {
          if (response.code === "200") {
            nodeName = response.data.remark;
            callback(nodeName)
          } else {
            MyMessage({
              message: response.message,
              type: "error",
            });
          }
        });
    },
    /**
     * 头部提交
     */
    topSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let params = this.ruleForm;
          params.servicecode = "ar0541";
          this.submitLoading = true;
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then((res) => {
              if (res && res.code === "200") {
                // this.$dataBus.doCallBack(this, res);
                this.submitLoading = false;
                this.$message({
                  type: "success",
                  message: res.message,
                });
              }
            })
            .catch((err) => {
              this.submitLoading = false;
              console.error(err);
            });
        } else {
          this.$message({
            type: "warning",
            message: "校验不通过",
          });
        }
      });
    }
  },
};
</script>
<style lang="less" scoped>
.todo-top {
  border-bottom: 1px solid #e3e8f5;
}

.todo-bottom--left {
  width: 50%;
  float: left;
  box-sizing: border-box;
  border-right: 1px solid #e3e8f5;

  .custom-common--form .el-form-item {
    margin-bottom: 0;
  }
}

.internet-info--title {
  font-size: 14px;
  font-weight: 600;
  color: #666;
}

.custom-common--footer {
  padding-top: 10px;
}
</style>
