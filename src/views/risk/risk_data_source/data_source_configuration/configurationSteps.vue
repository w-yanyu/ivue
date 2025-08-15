<template>
  <div class="dialog_content">
    <el-steps
      :space="200"
      :active="showNum"
      finish-status="success"
      align-center
      class="container-steps"
    >
      <el-step title="数据源配置"> </el-step>
      <el-step title="接入接口配置"> </el-step>
      <el-step title="结算配置"> </el-step>
      <el-step title="数据源有效期配置"> </el-step>
      <el-step title="数据源超时配置"> </el-step>
      <el-step title="数据源返回结果示例"> </el-step>
    </el-steps>

    <div v-if="showNum == 0">
      <configurationAddTab1 :pageParams="cParentParams" />
    </div>
    <div v-if="showNum == 1">
      <configurationAddTab2 :pageParams="cParentParams" />
    </div>
    <div v-if="showNum == 2">
      <to-json
        :params="cParentParams"
        :toUrl="url3"
        @jsonCallBack="jsonCallBack"
        :key="showNum"
      ></to-json>
    </div>
    <div v-if="showNum == 3">
      <to-json
        :params="cParentParams"
        :toUrl="url4"
        @jsonCallBack="jsonCallBack"
        :key="showNum"
      ></to-json>
    </div>
     <div v-if="showNum == 4">
      <to-json
        :params="cParentParams"
        :toUrl="url5"
        @jsonCallBack="jsonCallBack"
        :key="showNum"
      ></to-json>
    </div>
    <div v-if="showNum == 5">
      <to-json
        :params="cParentParams"
        :toUrl="url6"
        @jsonCallBack="jsonCallBack"
        :key="showNum"
      ></to-json>
    </div>

    <div>
      <div class="container-center">
        <el-button type="info" v-if="showNum != 0" @click="backStep">{{
          $i18ns("上一步")
        }}</el-button>
        <el-button type="primary" v-if="showNum != 5" @click="nextStep">{{
          $i18ns("下一步")
        }}</el-button>
        <el-button type="primary" @click="submit">{{
          $i18ns("提交")
        }}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import configurationAddTab1 from "./configurationAddTab1";
import configurationAddTab2 from "./configurationAddTab2";

export default {
  name: "configurationTabs",
  components: {
    configurationAddTab1,
    configurationAddTab2
  },
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
    frame_cd: {
      type: String,
      default: false
    },
    apply_no: {
      type: String,
      default: false
    }
  },
  data() {
    return {
      showNum: '',
      url3: '/views/risk/risk_data_source/data_source_configuration/configuration_tab3_settlement_allocation.json',
      url4: '/views/risk/risk_data_source/data_source_configuration/configuration_tab4_data_source_validity.json',
      url5: '/views/risk/risk_data_source/data_source_configuration/configuration_tab5_data_source_timeout.json',
      url6: '/views/risk/risk_data_source/data_source_configuration/configuration_tab6.json',
    };
  },
  created() {
    this.$store.state.risk_store.data_source_tab1_submit = false;
  },
  destroyed() {
    this.$store.state.risk_store.data_source_tab1_submit = false;
    this.$store.state.risk_store.data_source_code = "";
    this.$store.state.risk_store.data_source_pageType = "";
    this.$store.state.risk_store.tab1_dataSourceManageCom = {};
    this.$store.state.risk_store.tab1_dataSourceConcurrencyCom = {};
  },
  watch: {
    cParentParams: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal){
        this.cParentParams = newVal;
        this.showNum = 0;

        console.log("this.cParentParams=======this.cParentParams", this.cParentParams);

        this.$store.state.risk_store.data_source_code = newVal.data_source_code || "";
        this.$store.state.risk_store.data_source_pageType = newVal.pageType || "add";

        this.$store.state.risk_store.tab1_dataSourceManageCom.data_source_code = newVal.data_source_code;
        this.$store.state.risk_store.tab1_dataSourceManageCom.data_source_name = newVal.data_source_name;
        this.$store.state.risk_store.tab1_dataSourceManageCom.provider_name = newVal.provider_name;
        this.$store.state.risk_store.tab1_dataSourceManageCom.default_validity_day = newVal.default_validity_day;

        this.$store.state.risk_store.tab1_dataSourceConcurrencyCom.lock_dimension = newVal.lock_dimension;
        this.$store.state.risk_store.tab1_dataSourceConcurrencyCom.lock_expiration_time = newVal.lock_expiration_time;
        this.$store.state.risk_store.tab1_dataSourceConcurrencyCom.lock_retry_dormancy_time = newVal.lock_retry_dormancy_time;
        this.$store.state.risk_store.tab1_dataSourceConcurrencyCom.lock_retry_times = newVal.lock_retry_times;

        console.log("this.dataSourceConcurrencyCom====111111111", this.$store.state.risk_store);

      }
    }
  },

  methods: {
    /**
     * 表单提交
     */
    submit() {
      let formData = this.$dataBus.getCurrentFormData(this);
      console.log("当前pte拿到的数据===============", formData, this.showNum);
      let params;
      // tab1提交
      if(this.showNum == 0) {
        let dataSourceManageCom = this.$store.state.risk_store.tab1_dataSourceManageCom;
        let dataSourceInputParamCom = formData.dataSourceInputParamCom;
        let dataSourceConcurrencyCom = this.$store.state.risk_store.tab1_dataSourceConcurrencyCom;
        params = {
          servicecode: "deci050010",
          dataSourceManageCom,
          dataSourceInputParamCom,
          dataSourceConcurrencyCom
        }
        console.log("=============", params);

        this.$store.state.risk_store.data_source_code = this.$store.state.risk_store.tab1_dataSourceManageCom.data_source_code;
        this.cParentParams.data_source_code = this.$store.state.risk_store.tab1_dataSourceManageCom.data_source_code;
        this.$store.state.risk_store.data_source_tab1_submit = true;
        this.showNum++;
      }

      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.$message({
              type: "success",
              message: "操作成功"
            });
            return true;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 返回上一步
     */
    backStep() {
      if (this.showNum >= 1) {
        this.showNum--;
      }
    },
    /**
     * 下一步
     */
    nextStep() {
      if (this.showNum < 5) {
        // if(!this.$store.state.risk_store.data_source_code) {
        //   this.$message.error("数据源代码不能为空！");
        //   return false;
        // } else {
        //   this.showNum++;
        //   console.log("this.showNum======", this.showNum);
        // }
        this.showNum++;
          console.log("this.showNum======", this.showNum);
      }
    },
    jsonCallBack() {}
  }
};
</script>

<style lang="less" scoped>
.container-content {
  .container-content--search {
    padding: 16px 40px 0 12px;
    border-bottom: 1px solid #e3e8f5;
  }

  .container-content--toolbar {
    padding: 10px;
  }

  .container-content--pagination {
    float: right;
    padding: 10px;
  }

  .container-centent--table {
    margin-top: 10px;
  }
}

.container-footer {
  width: 50px;
  margin: 0 auto;
  padding: 10px;
}

.container-steps {
  padding: 10px;
  margin: 0 auto;
  justify-content: center;
}

.container-div-right {
  width: 80%;
  height: 100%;
  display: inline;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}

.container-toolbar {
  margin: 10px 0;
}

.container-center {
  margin: 10px 0;
  width: 100%;
  text-align: center;
}

.dialog_content {
  width: 100%;
}

.title_tag {
  font-family: "PingFang SC";
  font-size: 18px;
  font-weight: bold;
  margin: 18px;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}
</style>
