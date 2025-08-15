<template>
  <div class="nontrade_detail_item_container">
    <!--    账户基础信息    -->
    <NontradeBasicInfo
      v-if="isNontradeBasicInfoShow"
      :dictionaries="dictionaries"
      :tableData="basicInfoTableData"
      :index="index + 1"
    />
    <!-- <NontradetAdditionalInfoType
      v-if="isNontradeAdditionalInfoType1Show"
      :dictionaries="dictionaries"
      :tableData="basicInfoTableData"
    /> -->
  </div>
</template>
<script>
import NontradeBasicInfo from "./NontradeBasicInfo.vue";
// import NontradetAdditionalInfoType from "./NontradeAdditionalInfoType.vue";
/**
 * 单个账户信息展示组件
 * 不同账户类型的账户状态显示不同表单组件，通过配置NontradeStatusFormMap来预设账户状态和显示表单组件的映射关系。
 * 注意每个组件需要传入字典集合dictionaries，用于组件内的枚举字段进行转换。
 */
export default {
  name: "NontradeDetailItem",
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
    NontradeBasicInfo,
    // NontradetAdditionalInfoType,
  },
  data() {
    return {
      // 相关还款责任基础信息
      basicInfoTableData: [],
    };
  },
  computed: {
    isNontradeBasicInfoShow() {
      return (
        this.basicInfoTableData.length > 0
      );
    },
    // isNontradeAdditionalInfoType1Show() {
    //   return (
    //     this.basicInfoTableData.status24 != null && this.basicInfoTableData.status24 != ""
    //   );
    // },
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
.nontrade_detail_item_container {

}
</style>
