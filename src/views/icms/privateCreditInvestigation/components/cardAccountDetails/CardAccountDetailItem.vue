<template>
  <div class="cardAccount_detail_item_container">
    <!--   1 账户基础信息    -->
    <CardAccountBasicInfo
      v-if="isCardAccountBasicInfoShow"
      :dictionaries="dictionaries"
      :tableData="basicInfoTableData"
      :index="index + 1"
    />
    <CardAccountBasicInfo2
      v-if="isCardAccountBasicInfo2Show"
      :dictionaries="dictionaries"
      :tableData="basicInfoTableData"
      :index="index + 1"
    />
     <CardAccountBasicInfo3
      v-if="isCardAccountBasicInfo3Show"
      :dictionaries="dictionaries"
      :tableData="basicInfoTableData"
      :index="index + 1"
    />
    <!-- 2 -->
    <CardAccountAdditionalInfoType
      v-if="isCardAccountAdditionalInfoTypeShow"
      :dictionaries="dictionaries"
      :tableData="additionalInfoTypeTableData"
    />
    <CardAccountAdditionalInfoType1
      v-if="isCardAccountAdditionalInfoType1Show"
      :dictionaries="dictionaries"
      :tableData="AccountCurrentRepaymentHistoryData"
    />
      <CardAccountAdditionalInfoType4
      v-if="isCardAccountAdditionalInfoType4Show"
      :dictionaries="dictionaries"
      :tableData="AccountCurrentRepaymentHistoryData"
    />
    <CardAccountAdditionalInfoType5
      v-if="isCardAccountAdditionalInfoType5Show"
      :dictionaries="dictionaries"
      :tableData="additionalInfoTypeTableData"
    />
    <!-- 3 -->
    <CardAccountRepayInfoHistory
      v-if="isCardAccountRepayInfoHistoryShow"
      :dictionaries="dictionaries"
      :tableData="AccountRepayInfoHistoryData"
    />
    <!-- 4 -->
    <CardAccountCurrentRepaymentHistory
      v-if="isCardAccountCurrentRepaymentHistoryShow"
      :dictionaries="dictionaries"
      :tableData="AccountCurrentRepaymentHistoryData"
    />
    <!-- 5 -->
    <CardAccountRepaymentHistory
      v-if="isCardAccountRepaymentHistoryShow"
      :dictionaries="dictionaries"
      :tableData="AccountRepaymentHistoryData"
    />
    <!-- 6 -->
    <CardAccountSpecial
      v-if="isCardAccountSpecialShow"
      :dictionaries="dictionaries"
      :tableData="specialRepaymentHistoryTableData"
    />
  </div>
</template>
<script>
import { accountTypeAndStatusFormMap } from "./utils";
import CardAccountBasicInfo from "./CardAccountBasicInfo.vue";
import CardAccountBasicInfo2 from "./CardAccountBasicInfo2.vue";
import CardAccountBasicInfo3 from "./CardAccountBasicInfo3.vue";
import CardAccountAdditionalInfoType from "./CardAccountAdditionalInfoType.vue";
import CardAccountAdditionalInfoType1 from "./CardAccountAdditionalInfoType1.vue";
import CardAccountAdditionalInfoType4 from "./CardAccountAdditionalInfoType4.vue";
import CardAccountAdditionalInfoType5 from "./CardAccountAdditionalInfoType5.vue";
import CardAccountRepayInfoHistory from "./CardAccountRepayInfoHistory.vue";
import CardAccountCurrentRepaymentHistory from "./CardAccountCurrentRepaymentHistory.vue";
import CardAccountRepaymentHistory from "./CardAccountRepaymentHistory.vue";
import CardAccountSpecial from "./CardAccountSpecial.vue"
/**
 * 单个账户信息展示组件
 * 不同账户类型的账户状态显示不同表单组件，通过配置CardAccountStatusFormMap来预设账户状态和显示表单组件的映射关系。
 * 注意每个组件需要传入字典集合dictionaries，用于组件内的枚举字段进行转换。
 */
export default {
  name: "CardAccountDetailItem",
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
    CardAccountBasicInfo,
    CardAccountBasicInfo2,
    CardAccountBasicInfo3,
    CardAccountAdditionalInfoType,
    CardAccountAdditionalInfoType1,
    CardAccountAdditionalInfoType4,
    CardAccountAdditionalInfoType5,
    CardAccountRepayInfoHistory,
    CardAccountCurrentRepaymentHistory,
    CardAccountRepaymentHistory,
    CardAccountSpecial,
  },
  data() {
    return {
      basicInfoTableData: [],
      additionalInfoTypeTableData: [],
      AccountRepayInfoHistoryData:[],
      AccountCurrentRepaymentHistoryData:[],
      AccountRepaymentHistoryData:[],
      specialRepaymentHistoryTableData: [],
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

    isCardAccountBasicInfoShow() {
      return this.accountStatusFormSet.has("CardAccountBasicInfo");
    },
    isCardAccountBasicInfo2Show() {
      return this.accountStatusFormSet.has("CardAccountBasicInfo2");
    },
    isCardAccountBasicInfo3Show() {
      return this.accountStatusFormSet.has("CardAccountBasicInfo3");
    },
    isCardAccountAdditionalInfoTypeShow() {
      return this.accountStatusFormSet.has("CardAccountAdditionalInfoType");
    },
    isCardAccountAdditionalInfoType1Show() {
      return this.accountStatusFormSet.has("CardAccountAdditionalInfoType1");
    },
    isCardAccountAdditionalInfoType4Show() {
      return this.accountStatusFormSet.has("CardAccountAdditionalInfoType4");
    },
    isCardAccountAdditionalInfoType5Show() {
      return this.accountStatusFormSet.has("CardAccountAdditionalInfoType5");
    },
    isCardAccountRepayInfoHistoryShow() {
      return this.accountStatusFormSet.has("CardAccountRepayInfoHistory") 
      && this.AccountRepayInfoHistoryData.length > 0;
    },
    isCardAccountCurrentRepaymentHistoryShow() {
      return this.accountStatusFormSet.has("CardAccountCurrentRepaymentHistory") 
      && this.AccountCurrentRepaymentHistoryData.length > 0;
    },
    isCardAccountRepaymentHistoryShow() {
      return this.accountStatusFormSet.has("CardAccountRepaymentHistory")
      && this.AccountRepaymentHistoryData.length > 0;
    },
    isCardAccountSpecialShow() {
      return this.accountStatusFormSet.has("CardAccountSpecial")
      && this.specialRepaymentHistoryTableData.length > 0;;
    },
  },
  created() {
    this.initData(this.tableData);
  },
  methods: {
    /**
     * 数据初始化
     * @param data
     */
    initData(data) {
      this.basicInfoTableData = [data.accBase];
      this.additionalInfoTypeTableData = [data.accCurrPerformance];
      this.AccountRepayInfoHistoryData = data.repayInfo;
      this.AccountCurrentRepaymentHistoryData = [data.accPerformance];
      // this.AccountRepaymentHistoryData = data.repayRecordList;
      this.AccountRepaymentHistoryData = data.arbCOverduein5yDetail;
      this.specialRepaymentHistoryTableData = data.accSpecialTradeList;
      this.accountType = data.accBase.account_type;

      let status = data.accPerformance.account_status;
      if(data.accPerformance.account_status == "" || data.accPerformance.account_status == null){
        status = data.accCurrPerformance.account_status;
      }

      this.accountStatus = Number(status);
      console.log(`AccountDetailItem initData accountType`,this.accountType);
      console.log(`AccountDetailItem initData accountStatus`,this.accountStatus);
    },
  },
};
</script>
<style lang="css" scoped>
.cardAccount_detail_item_container {

}
</style>
