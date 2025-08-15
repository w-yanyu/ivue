<template>
  <div class="fund_detail_item_container">
    <!--    账户基础信息    -->
    <FundBasicInfo
      v-if="isFundBasicInfoShow"
      :dictionaries="dictionaries"
      :tableData="basicInfoTableData"
      :index="index + 1"
    />
  </div>
</template>
<script>
import FundBasicInfo from "./FundBasicInfo.vue";
/**
 * 单个账户信息展示组件
 * 不同账户类型的账户状态显示不同表单组件，通过配置CreditStatusFormMap来预设账户状态和显示表单组件的映射关系。
 * 注意每个组件需要传入字典集合dictionaries，用于组件内的枚举字段进行转换。
 */
export default {
  name: "CreditDetailItem",
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
    FundBasicInfo,
  },
  data() {
    return {
      // 相关还款责任基础信息
      basicInfoTableData: [],
    };
  },
  computed: {
    isFundBasicInfoShow() {
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
.fund_detail_item_container {

}
</style>
