<template>
  <el-button
    v-bind="config.buttonThemeStyle"
    plain
    :size="size"
    :type="type"
    @click.stop="handleClick()"
    :icon="iconClass"
    :loading="loading"
    :disabled="disabled"
  >
    {{$i18ns(label)}}
  </el-button>
</template>

<script>
import buttonPropsMixin from "pte-ui/mixins/buttonProps";
import pageJump from "pte-ui/mixins/pageJump";
import Tools from "pte-ui/utils/Tools";
import * as _ from "lodash";
import SysConfig from '@/pte/sysconfig.json'
export default {
  name: "openVerifyButton",
  components: {},
  mixins: [buttonPropsMixin,pageJump],
  props: {
  },
  data() {
    return {}
  },
  methods: {
    handleClick() {
      let request = Tools.createDoRequestParams(
        this.doRequest,
        this.currentData,
        this.$dataBus.getCurrentcParams(this),
        this.$dataBus.getParentcMeta(this),
        this.$dataBus.getParentScope(this),
        this.$dataBus.getCurrentcMeta(this),
        this.$dataBus.getCurrentScope(this)
      );
      this.$http.doApi(request).then(response => {
        let successCode = SysConfig.http.successCode || 200
        if ("" + response.code === "" + successCode) {
          this.openNewPage(this.config,this.currentData);
        }
      }).catch(() => {
        // 不处理
      });
    },
    parseToRequest(config, extraParams) {
      let result = {};
      let toRequest = config.toRequest || {};
      let isMerge = _.get(config, 'props.transmitAllParams');
      if (extraParams instanceof Array) {
        let key = this.resetParamsKey(config)
        extraParams = { [key]: extraParams };
      }
      if (toRequest.url) {
        result = Tools.resolveToRequest(
          toRequest,
          this.$dataBus.getCurrentcParams(this),
          this.$dataBus.getParentcMeta(this),
          this.$dataBus.getParentScope(this),
          this.$dataBus.getCurrentcMeta(this),
          this.$dataBus.getCurrentScope(this),
          extraParams || {},
          isMerge
        );
      }
      return result;
    },
    resetParamsKey(btnData, data) {
      let paramsKey = "selectedData";
      if (!data || (data && !_.isArray(data))) {
        paramsKey = ""
      }
      if (btnData && btnData.requestField) {
        paramsKey = btnData.requestField
      }
      return paramsKey;
    },
  }
}
</script>

<style scoped>

</style>
