<template>
  <el-button v-bind="config.buttonThemeStyle" plain :size="size" :type="type" @click.stop="handleClick()"
    :icon="iconClass" :loading="loading" :disabled="disabled">
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
    name: "loanTrialUnBtn",
    components: {},
    mixins: [buttonPropsMixin, pageJump],
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object // 父页面的scope数据对象
    },
    data() {
      return {}
    },
    methods: {
      handleClick() {

        // let request = Tools.createDoRequestParams(
        //   this.doRequest,
        //   this.currentData,
        //   this.$dataBus.getCurrentcParams(this),
        //   this.$dataBus.getParentcMeta(this),
        //   this.$dataBus.getParentScope(this),
        //   this.$dataBus.getCurrentcMeta(this),
        //   this.$dataBus.getCurrentScope(this)
        // );
        console.log('currentData', this.currentData);
        console.log('doRequest', this.doRequest);

        console.log('$dataBus', this.$dataBus);
        console.log("refs", this.$refs);
        console.log("$parent.$parent.$refs", this.$parent.$parent.$refs);
        console.log("this", this);

        console.log('getCurrentcParams', this.$dataBus.getCurrentcParams(this));
        console.log('getParentcMeta', this.$dataBus.getParentcMeta(this));
        console.log("getParentScope", this.$dataBus.getParentScope(this));
        console.log("getCurrentcMeta", this.$dataBus.getCurrentcMeta(this));
        console.log("getCurrentScope", this.$dataBus.getCurrentScope(this));
        // console.log("request", request);
        // // request.doRequest.params.pspyls=tableArry;
        // this.$http.doApi(request).then(response => {
        //   let successCode = SysConfig.http.successCode || 200
        //   if ("" + response.code === "" + successCode) {
        //     console.log('this.currentData', this.currentData);
        //     console.log('this.config', this.config);
        //     console.log('this.response', response);
        //     console.log('this.response', response.data);
        //     return response.data
        //     // this.openNewPage(this.config, this.currentData);
        //   }
        // }).catch(() => {
        //   // 不处理
        // });


        let that = this;
        let request_map = {}
        let request_url = "/SUMP/icmcall/icmRPCCall";
        let tableArry = new Array();
        let formData = this.$dataBus.getCurrentScope(this).formData;
        if (this.$dataBus.getCurrentScope(this).datagrid.length > 0) {
          let temp = this.$dataBus.getCurrentScope(this).datagrid;
          console.log('temp', temp);
          for (let i in temp) {
            let obj = {
              schdtp: temp[i].schdtp,
              repyfm: temp[i].repyfm,
              bgindt: temp[i].bgindt,
              matudt: temp[i].matudt,
              crrpam: temp[i].crrpam,
              adcgam: temp[i].adcgam,
              adcgcd: temp[i].adcgcd,
              adcgbs: temp[i].adcgbs,
              row_id: temp[i].row_id,
              editorState: temp[i].editorState,
              edit_type: temp[i].edit_type,
              editTable_index: temp[i].editTable_index,
            }
            tableArry.push(obj)
          }
          request_map["lstpri"] = tableArry;
        }

        console.log('formData', formData);
        request_map["servicecode"] = "clschd";
        request_map["lncfam"] = formData.lncfam;
        request_map["prodcd"] = formData.prodcd;
        request_map["crcycd"] = formData.crcycd;
        request_map["relntm"] = formData.relntm+"M";
        request_map["instdt"] = formData.instdt;
        request_map["schdtp"] = formData.schdtp;
        request_map["merchn"] = formData.merchn;
        request_map["actvcd"] = formData.actvcd;
        request_map["begnum"] = formData.begnum;
        request_map["selnum"] = formData.selnum;
        request_map["prisub"] = formData.prisub;
     
        

        that.$http.invokeAPI(request_url, "post", request_map).then(response => {
          console.log("请求回调", response);
          if (response.code === "200") {
            this.openNewPage(this.config, response.data);
          } else {
            MyMessage({
              message: response.message,
              type: 'error'
            });
          }
        });

      },
      parseToRequest(config, extraParams) {
        let result = {};
        let toRequest = config.toRequest || {};
        let isMerge = _.get(config, 'props.transmitAllParams');
        if (extraParams instanceof Array) {
          let key = this.resetParamsKey(config)
          extraParams = {
            [key]: extraParams
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
