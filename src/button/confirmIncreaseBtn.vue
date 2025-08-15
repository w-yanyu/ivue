<template>
  <el-button
    v-bind="config.buttonThemeStyle"
    plain
    :type="type"
    :size="size"
    @click="handleClick()"
    :icon="iconClass"
    :loading="loading"
    :disabled="disabled"
  >
    {{ $i18ns(label) }}
  </el-button>
</template>

<script>
import buttonPropsMixin from "pte-ui/mixins/buttonProps";
import buttonMixin from "pte-ui/mixins/buttonMixin";
import pageJump from "pte-ui/mixins/pageJump";

export default {
  name: "confirmIncreaseBtn",
  components: {},
  mixins: [buttonPropsMixin, pageJump, buttonMixin],
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对象
  },
  data() {
    return {};
  },
  methods: {
    handleClick() {
      this.handleConfirmMsg();
    },
    handleConfirmMsg() {
      let msg = this.config.confirm.msg;
      let rowData = this.$options.propsData.currentData;

      let paramsMap = this.handleRowParamsParser(msg, rowData);
      paramsMap.forEach(function (value, key) {
        msg = msg.replace(key, value);
      })

      this.config.confirm.msg = msg;

      this.$dataBus.doCallBack(this, {});
    },
    /**
     * 处理行数据参数化解析
     * @param msg 行数据（包含多个表达式）
     * @param obj 对应数据对象
     * @returns {*}
     */
    handleRowParamsParser(msg, obj) {
      let message = msg;
      let regex = /\${{current\.\w+}}/g;
      let paramsList = message.match(regex);

      let paramsMap = new Map();
      Object.values(paramsList).forEach(function (item) {
        let tempKey = item.replace("${{current.", "").replace("}}", "");
        paramsMap.set(item, obj[tempKey]);
      })
      return paramsMap;
    }
  },
};
</script>

<style scoped>
</style>
