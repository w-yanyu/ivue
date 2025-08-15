<template>
  <div class="credit_detail_item_container">
    <!--    账户基础信息    -->
    <CreditBasicInfo
      v-if="isCreditBasicInfoShow"
      :dictionaries="dictionaries"
      :tableData="basicInfoTableData"
      :index="index + 1"
    />
  </div>
</template>
<script>
import CreditBasicInfo from "./CreditBasicInfo.vue";
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
    CreditBasicInfo,
  },
  data() {
    return {
      // 相关还款责任基础信息
      basicInfoTableData: [],
    };
  },
  computed: {
    isCreditBasicInfoShow() {
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
.credit_detail_item_container {

}
</style>
