<template>
  <el-button
    v-bind="config.buttonThemeStyle"
    plain
    :size="size"
    :type="type"
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
export default {
  name: "CustomOwnerButton",
  components: {},
  mixins: [buttonPropsMixin],
  props: {},
  data() {
    return {};
  },
  methods: {
    handleClick() {
      console.log("通用");
    },
  },
};
</script>

<style scoped>
</style>