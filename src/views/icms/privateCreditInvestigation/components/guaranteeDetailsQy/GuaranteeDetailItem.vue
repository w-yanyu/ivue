<template>
  <div class="guarantee_detail_item_container">
    <!--    账户基础信息    -->
    <GuaranteeBasicInfo
      v-if="isGuaranteeBasicInfoShow"
      :dictionaries="dictionaries"
      :tableData="basicInfoTableData"
      :index="index + 1"
    />
    <GuaranteetAdditionalInfoType
      v-if="isGuaranteeAdditionalInfoType1Show"
      :dictionaries="dictionaries"
      :tableData="basicInfoTableData"
    />
  </div>
</template>
<script>
import GuaranteeBasicInfo from "./GuaranteeBasicInfo.vue";
import GuaranteetAdditionalInfoType from "./GuaranteeAdditionalInfoType.vue";
/**
 * 单个账户信息展示组件
 * 不同账户类型的账户状态显示不同表单组件，通过配置GuaranteeStatusFormMap来预设账户状态和显示表单组件的映射关系。
 * 注意每个组件需要传入字典集合dictionaries，用于组件内的枚举字段进行转换。
 */
export default {
  name: "GuaranteeDetailItem",
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
    GuaranteeBasicInfo,
    GuaranteetAdditionalInfoType,
  },
  data() {
    return {
      // 相关还款责任基础信息
      basicInfoTableData: [],
    };
  },
  computed: {
    isGuaranteeBasicInfoShow() {
      return (
        this.basicInfoTableData.length > 0
      );
    },
    isGuaranteeAdditionalInfoType1Show() {
      return (
        this.basicInfoTableData.length > 0
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
      this.basicInfoTableData = [data];
    },
  },
};
</script>
<style lang="css" scoped>
.Guarantee_detail_item_container {

}
</style>