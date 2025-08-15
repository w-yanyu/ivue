<template>
  <el-button v-bind="config.buttonThemeStyle"  :size="size" type="primary" @click.stop="handleClick()"
    :icon="iconClass" :loading="loading" :disabled="disabled">
    {{$i18ns(label)}}
  </el-button>
</template>

<script>
  import buttonPropsMixin from "pte-ui/mixins/buttonProps";
  import pageJump from "pte-ui/mixins/pageJump";
  import * as _ from "lodash";
  export default {
    name: "risk_function_btn",
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
    mounted() {
      console.log('risk_function_btn----cParentParams', this.cParentParams);
    },
    beforeDestroy() {},
    methods: {
      handleClick() {
        // console.log('risk_function_btn----currentData', this.currentData);
        console.log('risk_function_btn----doRequest', this.doRequest);

        // console.log('risk_function_btn----$dataBus', this.$dataBus);
        // console.log("risk_function_btn----refs", this.$refs);
        console.log("risk_function_btn----$parent.$parent.$refs", this.$parent.$parent.$refs);
        console.log("risk_function_btn----this", this);

        console.log('risk_function_btn----getCurrentcParams', this.$dataBus.getCurrentcParams(this));
        console.log('risk_function_btn----getParentcMeta', this.$dataBus.getParentcMeta(this));
        console.log("risk_function_btn----getParentScope", this.$dataBus.getParentScope(this));
        console.log("risk_function_btn----getCurrentcMeta", this.$dataBus.getCurrentcMeta(this));
        console.log("risk_function_btn----getCurrentScope", this.$dataBus.getCurrentScope(this));

        let that = this;
        let request_map = {}
        let request_url = this.doRequest.params.request_url;
        let tableArry = [];
        let userInfo = JSON.parse(localStorage.getItem('user_info'));
        let formData = this.$dataBus.getCurrentScope(this).form;
        if (!this.isCompleted(formData)) {
          return
        }

        if (this.$dataBus.getCurrentScope(this).datagrid.length > 0) {
          let temp = this.$dataBus.getCurrentScope(this).datagrid;
          console.log('temp', temp);
          if (!this.isArrayCompleted(temp)) {
            return
          }
          for (const child of temp) {
            let obj = {
              paramsDataType: child.paramsDataType,
              paramsCode: child.paramsCode,
              paramsDesc: child.paramsDesc,
              sort: child.row_id
            }
            tableArry.push(obj)
          }
          request_map["paramsList"] = tableArry;
        }

        console.log('formData', formData);
        request_map["functionCode"] = formData.functionCode;
        request_map["functionName"] = formData.functionName;
        request_map["functionBody"] = formData.functionBody;
        request_map["resultType"] = formData.resultType;
        request_map["createUser"] = userInfo.userCode;
        request_map["updateUser"] = userInfo.userCode;
        request_map["updateUser"] = userInfo.userCode;
        request_map["servicecode"] = this.doRequest.params.servicecode;
        request_map["appId"] =  this.doRequest.params.appId;
        
        console.log("准备请求的上传参数", request_map);
        that.$http.invokeAPI(request_url, "post", request_map).then(response => {
          console.log("请求回调", response);
          if (response.code === "200") {
            //this.openNewPage(this.config, response.data);
            this.$message({
              type: "success",
              message: "成功"
            });
            that.$dataBus.doCallBack(that, response);
          } else {
            this.$message({
              message: response.message,
              type: 'error'
            });
          }
        });
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
      isCompleted(formData) {
        let that = this
        let isCompleted = true;
        //函数代码没有输入的时候
        if (formData.functionCode === '') {
          that.$message.error("请输入函数代码");
          isCompleted = false;
          //返回类型未选择的时候
        } else if (/^[^a-z]/i.test(formData.functionCode)) {
          that.$message.error("函数代码需要以大或小写字母开头");
          isCompleted = false;
        } else if (formData.resultType === '') {
          that.$message.error("请选择返回类型");
          isCompleted = false;
          //函数体没有输入的时候
        } else if (formData.functionBody === '') {
          that.$message.error("请输入函数体");
          isCompleted = false;
        }
        return isCompleted;
      },

      isArrayCompleted(arrayData) {
        let that = this
        let isCompleted = true;
        for (let i in arrayData) {
          //函数代码没有输入的时候
          if (arrayData[i].paramsDataType === '') {
            that.$message.error(`新增参数表格 第${i + 1}行 参数类型未选择`);
            isCompleted = false;
            break;
          } else if (arrayData[i].paramsCode === '') {
            that.$message.error(`新增参数表格 第${i + 1}行 参数字段未填写`);
            isCompleted = false;
            break;
          } else if (arrayData[i].paramsDesc === '') {
            that.$message.error(`新增参数表格 第${i + 1}行 参数描述未填写`);
            isCompleted = false;
            break;
          }
        }
        return isCompleted;
      },
    }
  }
</script>

<style scoped>

</style>
