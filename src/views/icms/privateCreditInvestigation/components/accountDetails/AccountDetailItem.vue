<template>
  <div class="account_detail_item_container">
    <!--    账户基础信息    -->
    <AccountBasicInfo
      v-if="isAccountBasicInfoShow"
      :dictionaries="dictionaries"
      :tableData="basicInfoTableData"
      :index="index + 1"
    />
    <AccountBasicInfo2
      v-if="isAccountBasicInfo2Show"
      :dictionaries="dictionaries"
      :tableData="basicInfoTableData"
      :index="index + 1"
    />
    
    <AccountBasicInfo3
      v-if="isAccountBasicInfo3Show"
      :dictionaries="dictionaries"
      :tableData="basicInfoTableData"
      :index="index + 1"
    />
    <AccountBasicInfo4
      v-if="isAccountBasicInfo4Show"
      :dictionaries="dictionaries"
      :tableData="basicInfoTableData"
      :index="index + 1"
    />
    <!--    账户表现信息-   -->
    <AccountAdditionalInfoType1
      v-if="isAccountAdditionalInfoType1Show"
      :dictionaries="dictionaries"
      :tableData="additionalInfoTypeTableData"
    />
    <AccountAdditionalInfoType2
      v-if="isAccountAdditionalInfoType2Show"
      :dictionaries="dictionaries"
      :tableData="currentRepaymentHistoryData"
    />
    <AccountAdditionalInfoType3
      v-if="isAccountAdditionalInfoType3Show"
      :dictionaries="dictionaries"
      :tableData="additionalInfoTypeTableData"
    />
    <AccountAdditionalInfoType4
      v-if="isAccountAdditionalInfoType4Show"
      :dictionaries="dictionaries"
      :tableData="additionalInfoTypeTableData"
    />
    <AccountAdditionalInfoType5
      v-if="isAccountAdditionalInfoType5Show"
      :dictionaries="dictionaries"
      :tableData="currentRepaymentHistoryData"
    />
    <!--    大额专项分期信息    -->
    <AccountRepayInfoHistory
      v-if="isAccountRepayInfoHistoryShow"
      :dictionaries="dictionaries"
      :tableData="repayInfoHistoryData"
    />

    <!--    账户最近还款记录    -->
    <AccountCurrentRepaymentHistory
      v-if="isAccountCurrentRepaymentHistoryShow"
      :dictionaries="dictionaries"
      :tableData="additionalInfoTypeTableData"
    />
    <!--    账户还款记录    -->
    <AccountRepaymentHistory
      v-if="isAccountRepaymentHistoryShow"
      :dictionaries="dictionaries"
      :tableData="repaymentHistoryTableData"
    />
    <!--    账户特殊交易记录    -->
    <AccountSpecialRepaymentHistory
      v-if="isAccountSpecialRepaymentHistoryShow"
      :dictionaries="dictionaries"
      :tableData="specialRepaymentHistoryTableData"
    />
    <!--    异议+特殊标注    -->
    <AccountOtherInfo
      :dictionaries="dictionaries"
      :tableData="xxx"
    />
  </div>
</template>
<script>
import { accountTypeAndStatusFormMap } from "./utils";
import AccountBasicInfo from "./AccountBasicInfo.vue";
import AccountBasicInfo2 from "./AccountBasicInfo2.vue";
import AccountBasicInfo3 from "./AccountBasicInfo3.vue";
import AccountBasicInfo4 from "./AccountBasicInfo4.vue";
import AccountAdditionalInfoType1 from "./AccountAdditionalInfoType1.vue";
import AccountAdditionalInfoType2 from "./AccountAdditionalInfoType2.vue";
import AccountAdditionalInfoType3 from "./AccountAdditionalInfoType3.vue";
import AccountAdditionalInfoType4 from "./AccountAdditionalInfoType4.vue";
import AccountAdditionalInfoType5 from "./AccountAdditionalInfoType5.vue";
import AccountCurrentRepaymentHistory from "./AccountCurrentRepaymentHistory.vue";
import AccountRepaymentHistory from "./AccountRepaymentHistory.vue";
import AccountSpecialRepaymentHistory from "./AccountSpecialRepaymentHistory.vue";
import AccountRepayInfoHistory from "./AccountRepayInfoHistory.vue";
import AccountOtherInfo from './AccountOtherInfo.vue'
/**
 * 单个账户信息展示组件
 * 不同账户类型的账户状态显示不同表单组件，通过配置accountStatusFormMap来预设账户状态和显示表单组件的映射关系。
 * 注意每个组件需要传入字典集合dictionaries，用于组件内的枚举字段进行转换。
 */
export default {
  name: "AccountDetailItem",
  props: {
    tableData: {
      type: Object,
      default() {
        return {};
      },
    },
    // 字典集合
    dictionaries: {
      type: Object,
      default() {
        return {};
      },
    },
    index: {
      Type: Number,
      default: 0,
    },
  },
  components: {
    AccountSpecialRepaymentHistory,
    AccountRepaymentHistory,
    AccountCurrentRepaymentHistory,
    AccountRepayInfoHistory,
    AccountAdditionalInfoType5,
    AccountAdditionalInfoType4,
    AccountAdditionalInfoType3,
    AccountAdditionalInfoType2,
    AccountAdditionalInfoType1,
    AccountBasicInfo,
    AccountBasicInfo2,
    AccountBasicInfo3,
    AccountBasicInfo4,
    AccountOtherInfo,
  },
  data() {
    return {
      // 账户基础信息
      basicInfoTableData: [],
      // 账户表现信息
      additionalInfoTypeTableData: [],
      // 账户最近还款记录
      currentRepaymentHistoryData: [],
      // 账户还款记录
      repaymentHistoryTableData: [],
      // 账户特殊交易记录
      specialRepaymentHistoryTableData: [],
      //大额专项分期信息
      repayInfoHistoryData:[],
      // 账户类型
      acccountType: "",
      // 账户状态
      accountStatus: -1,
    };
  },
  computed: {
    accountTypeFormSet() {
      return accountTypeAndStatusFormMap.has(this.accountType)
        ? accountTypeAndStatusFormMap.get(this.accountType)
        : new Set([]);
    },
    accountStatusFormSet() {
      return this.accountTypeFormSet.has(this.accountStatus)
        ? this.accountTypeFormSet.get(this.accountStatus)
        : new Set([]);
    },
    isAccountBasicInfoShow() {
      return this.accountStatusFormSet.has("AccountBasicInfo");
    },
    isAccountBasicInfo2Show() {
      return this.accountStatusFormSet.has("AccountBasicInfo2");
    },
    isAccountBasicInfo3Show() {
      return this.accountStatusFormSet.has("AccountBasicInfo3");
    },
    isAccountBasicInfo4Show() {
      return this.accountStatusFormSet.has("AccountBasicInfo4");
    },
    isAccountAdditionalInfoType1Show() {
      return this.accountStatusFormSet.has("AccountAdditionalInfoType1");
    },
    isAccountAdditionalInfoType2Show() {
      return this.accountStatusFormSet.has("AccountAdditionalInfoType2");
    },
    isAccountAdditionalInfoType3Show() {
      return this.accountStatusFormSet.has("AccountAdditionalInfoType3");
    },
    isAccountAdditionalInfoType4Show() {
      return this.accountStatusFormSet.has("AccountAdditionalInfoType4");
    },
    isAccountAdditionalInfoType5Show() {
      return this.accountStatusFormSet.has("AccountAdditionalInfoType5");
    },
    isAccountCurrentRepaymentHistoryShow() {
      return (
        this.accountStatusFormSet.has("AccountCurrentRepaymentHistory") &&
        this.currentRepaymentHistoryData.length > 0
      );
    },
    isAccountRepaymentHistoryShow() {
      return (
        this.accountStatusFormSet.has("AccountRepaymentHistory") &&
        this.repaymentHistoryTableData.length > 0
      );
    },
    isAccountSpecialRepaymentHistoryShow() {
      return (
        this.accountStatusFormSet.has("AccountSpecialRepaymentHistory") &&
        this.specialRepaymentHistoryTableData.length > 0
      );
    },
    isAccountRepayInfoHistoryShow() {
      return (
        this.accountStatusFormSet.has("AccountRepayInfoHistory") &&
        this.repayInfoHistoryData.length > 0
      );
    },
    isAccountOtherInfoShow() {
      return (
        true
      );
    },
  },
  created() {
    this.initData(this.tableData);
  },
  methods: {
    /**
     * 账户数据初始化
     * TODO 这里处理单个账户内所有表单用于显示的数据源。
     * @param data
     */
    initData(data) {
      this.basicInfoTableData = [data.accBase];
      this.additionalInfoTypeTableData = [data.accPerformance];
      this.currentRepaymentHistoryData = [data.accCurrPerformance];
      // this.repaymentHistoryTableData = data.repayRecordList;
      this.repaymentHistoryTableData = data.arbCOverduein5yDetail;
      this.specialRepaymentHistoryTableData = data.accSpecialTradeList;
      this.repayInfoHistoryData = data.repayInfo;

      this.accountType = data.accBase.account_type;
      let status = data.accPerformance.account_status;
      if(data.accPerformance.account_status == "" || data.accPerformance.account_status == null){
        status = data.accCurrPerformance.account_status;
      }
      this.accountStatus = Number(status);
      
      console.log(`AccountDetailItem initData accountType`,this.accountType);
      console.log(
        `AccountDetailItem initData accountStatus`,
        this.accountStatus
      );
    },
  },
};
</script>
<style lang="css" scoped>
.account_detail_item_container {

}
</style>
