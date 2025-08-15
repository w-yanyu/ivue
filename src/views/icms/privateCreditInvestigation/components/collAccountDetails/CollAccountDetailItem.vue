<template>
  <div class="collAccount_detail_item_container">
    <!--    账户基础信息    -->
    <CollAccountBasicInfo
      v-if="isCollAccountBasicInfoShow"
      :dictionaries="dictionaries"
      :tableData="basicInfoTableData"
      :index="index + 1"
    />
    <CollAccounttAdditionalInfoType
      v-if="isCollAccountAdditionalInfoType1Show"
      :dictionaries="dictionaries"
      :tableData="additionalInfoTypeTableData"
    />
    <CollAccounttAdditionalInfoType2
      v-if="isCollAccountAdditionalInfoType2Show"
      :dictionaries="dictionaries"
      :tableData="additionalInfoTypeTableData"
    />
    <CollAccountSpecial
      v-if="isCollAccountSpecialShow"
      :dictionaries="dictionaries"
      :tableData="specialRepaymentHistoryTableData"
    />
  </div>
</template>
<script>
import CollAccountBasicInfo from "./CollAccountBasicInfo.vue";
import CollAccounttAdditionalInfoType from "./CollAccountAdditionalInfoType.vue";
import CollAccountSpecial from './CollAccountSpecial.vue';
import CollAccounttAdditionalInfoType2 from './CollAccountAdditionalInfoType2.vue';
import { accountTypeAndStatusFormMap} from './utils'

/**
 * 单个账户信息展示组件
 * 不同账户类型的账户状态显示不同表单组件，通过配置CollAccountStatusFormMap来预设账户状态和显示表单组件的映射关系。
 * 注意每个组件需要传入字典集合dictionaries，用于组件内的枚举字段进行转换。
 */
export default {
  name: "CollAccountDetailItem",
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
    CollAccountBasicInfo,
    CollAccounttAdditionalInfoType,
    CollAccountSpecial,
    CollAccounttAdditionalInfoType2,
  },
  data() {
    return {
      basicInfoTableData: [],
      additionalInfoTypeTableData: [],
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

    isCollAccountBasicInfoShow() {
      return (
        this.basicInfoTableData.length > 0
      );
    },
    isCollAccountAdditionalInfoType1Show() {
      console.log("CollAccountAdditionalInfoType has:",this.accountStatusFormSet.has("CollAccountAdditionalInfoType") );
      return (
        this.accountStatusFormSet.has("CollAccountAdditionalInfoType") 
      );
    },
    isCollAccountAdditionalInfoType2Show() {
      console.log("CollAccountAdditionalInfoType2 has:", this.accountStatusFormSet.has("CollAccountAdditionalInfoType2") );
      return (
        this.accountStatusFormSet.has("CollAccountAdditionalInfoType2") 
      );
    },
    isCollAccountSpecialShow() {
      return (
        this.specialRepaymentHistoryTableData.length > 0
      );
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
      this.additionalInfoTypeTableData = [data.accPerformance];
      this.specialRepaymentHistoryTableData = data.accSpecialTradeList;
      this.accountType = data.accBase.account_type;
      this.accountStatus = Number(data.accPerformance.account_status);
      console.log(`CollAccountDetailItem initData accountType`,this.accountType);
      console.log(
        `CollAccountDetailItem initData accountStatus`,
        this.accountStatus
      );
    },
  },
};
</script>
<style lang="css" scoped>
.collAccount_detail_item_container {

}
</style>
