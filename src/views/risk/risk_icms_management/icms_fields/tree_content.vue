<!--
 * @Author: weisiyi weisiyi@sunline.cn
 * @Date: 2024-03-12 17:34:08
 * @LastEditors: weisiyi weisiyi@sunline.cn
 * @LastEditTime: 2024-03-13 09:44:33
 * @FilePath: /ivue/src/views/risk/risk_icms_management/icms_fields/tree_content.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="box">
    <div v-if="cParentParams && cParentParams.tree_type === 'fieldCode'">
      <to-json
        :toUrl="
          '/views/risk/risk_icms_management/icms_fields/icmsFields_update.json'
        "
        :params="cParentParams"
        @jsonCallBack="jsonCallBack"
        :key="cParentParams.tree_id"
      ></to-json>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import debounce from "lodash/debounce";
import i18n from "pte-ui/i18ns"; // 国际化
import MyAxios from "pte-ui/utils/MyAxios";
import Tools from "pte-ui/utils/Tools";

export default {
  name: "reportConfig",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对象
  },
  data() {
    return {
      
    };
  },
  watch: {
    cParentParams: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal) {
          this.cParentParams = newVal;
        }
      }
    }
  },
  created() {},
  mounted() {
    // 接受左侧点击事件,先清除之前的监听事件
    this.$bus.off("rightModify");
    this.$bus.on("rightModify", this.rightModify);
  },
  methods: {
    /**
     * 左侧点击事件处理
     * 查询已选列表及规则列表
     */
    rightModify(item) {
      if (item) {
        this.cParentParams = item;
        console.log("item=========", item);
      }
    },
    submit() {},
    handleClose() {
      this.dialogVisible = false;
    },
    jsonCallBack(data) {
      console.log("data======", data);
      
      this.$bus.emit("refresh");
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  position: relative;
  .content-box {
    box-sizing: border-box;
    max-width: 99%;
  }
  .submit {
    position: absolute;
    right: 10%;
  }
}
</style>
