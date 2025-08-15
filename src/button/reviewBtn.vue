<template>
  <el-button
    v-bind="config.buttonThemeStyle"
    plain
    :size="size"
    type="primary"
    @click.stop="handleClick()"
    :icon="iconClass"
    :loading="loading"
    :disabled="disabled"
  >
    {{ $i18ns(label) }}
  </el-button>
</template>

<script>
import buttonPropsMixin from "pte-ui/mixins/buttonProps";
import pageJump from "pte-ui/mixins/pageJump";
import Tools from "pte-ui/utils/Tools";
import * as _ from "lodash";
export default {
  name: "reviewBtn",
  components: {},
  mixins: [buttonPropsMixin, pageJump],
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

      console.log("currentData", this.currentData);
      console.log("doRequest", this.doRequest);

      console.log("$dataBus", this.$dataBus);
      console.log("refs", this.$refs);
      console.log("$parent.$parent.$refs", this.$parent.$parent.$refs);
      console.log("this", this);

      console.log("getCurrentcParams", this.$dataBus.getCurrentcParams(this));
      console.log("getParentcMeta", this.$dataBus.getParentcMeta(this));
      console.log("getParentScope", this.$dataBus.getParentScope(this));
      console.log("getCurrentcMeta", this.$dataBus.getCurrentcMeta(this));
      console.log("getCurrentScope", this.$dataBus.getCurrentScope(this));

      // console.log("formData", formData);
      console.log("appId", this.$dataBus.getCurrentcParams(this).appId);

      let that = this;
      let request_url = "/SUMP/icmcall/icmRPCCall";

      let reqData = this.$dataBus.getCurrentScope(this).form;
      reqData.servicecode = this.doRequest.params.servicecode;
      reqData.appId = this.$dataBus.getCurrentcParams(this).appId;

      console.log("reqData", reqData);


      that.$http.invokeAPI(request_url, "post", reqData).then((response) => {
        console.log("请求回调xx", response);
        if (response.code === "200" && response.message === "NEED_REVIEW") {
          that.$dataBus.bindCallBackMethod(that, that.jsonCallBack, {});
          that.$dialog.open({
            that: that,
            title: "交易复核",
            toRequest: {
              url: "@reviewDialog",
              method: "get",
              params:{reqData}
            },
            width: "50%",
            height: "30%",
          });
        } else if(response.code === "200" && response.message === "SUCCESS"){
            // this.$dialog.close();
            this.$dataBus.doCallBack(this, "");
        } else {
          MyMessage({
            message: response.message,
            type: "error",
          });
        }
      });
    },
    jsonCallBack() {
      console.log("ssssss");
      console.log("$dataBus", this.$dataBus);
      this.$dialog.close();//先关闭弹框，否则会栈溢出
      this.$dataBus.doCallBack(this, "");
    },
    parseToRequest(config, extraParams) {
      let result = {};
      let toRequest = config.toRequest || {};
      let isMerge = _.get(config, "props.transmitAllParams");
      if (extraParams instanceof Array) {
        let key = this.resetParamsKey(config);
        extraParams = {
          [key]: extraParams,
        };
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
        paramsKey = "";
      }
      if (btnData && btnData.requestField) {
        paramsKey = btnData.requestField;
      }
      return paramsKey;
    },
  },
};
</script>

<style scoped>
</style>
