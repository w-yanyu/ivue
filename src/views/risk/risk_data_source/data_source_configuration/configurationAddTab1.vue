<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <span><em></em>基本信息</span>
        </template>
        <el-form
          ref="dataSourceManageCom"
          :rules="basicRules"
          :model="dataSourceManageCom"
          label-width="200px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="数据源代码: " prop="data_source_code">
                <el-input
                  v-model="dataSourceManageCom.data_source_code"
                  :disabled="isEditCode"
                  @input="changeValue"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="数据源名称: " prop="data_source_name">
                <el-input
                  v-model="dataSourceManageCom.data_source_name"
                  :disabled="isEditLook"
                  @input="changeValue"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提供方: " prop="provider_code">
                <el-select v-model="dataSourceManageCom.provider_code" :disabled="isEditLook" @focus="getProviderList">
                  <el-option
                    v-for="item in providerList"
                    :key="item.provider_code"
                    :label="item.provider_name"
                    :value="item.provider_code"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="数据源类型: " prop="data_source_type">
                <el-select v-model="dataSourceManageCom.data_source_type" :disabled="isEditLook">
                  <el-option
                    v-for="(item, index) in dataTypeList"
                    :key="index"
                    :label="item.dictId + '-' + item.dictName"
                    :value="item.dictId"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="默认数据有效期（天）"
                prop="default_validity_day"
              >
                <el-input
                  v-model="dataSourceManageCom.default_validity_day"
                  :disabled="isEditLook"
                  @input="changeValue"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <span><em></em>入参配置</span>
        </template>
        <el-form
          ref="parameterForm"
          :model="parameterForm"
          label-width="200px"
          class="custom-common--form"
        >
          <div>
            <to-json
              :toUrl="parameterUrl"
              :params="parameterForm"
              @jsonCallBack="parameterCallback"
            ></to-json>
          </div>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <span><em></em>防并发访问配置</span>
        </template>
        <el-form
          ref="dataSourceConcurrencyCom"
          :rules="antiConcurrentRules"
          :model="dataSourceConcurrencyCom"
          label-width="200px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="8">
              <el-form-item label="加锁维度: " prop="lock_dimension">
                <el-select
                  v-model="dataSourceConcurrencyCom.lock_dimension"
                  :disabled="isEditLook"
                  @focus="getLockTypeList"
                >
                  <el-option
                    v-for="item in lockTypeList"
                    :key="item.parm_code"
                    :label="item.parm_name"
                    :value="item.parm_code"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="锁过期时间（ms）: "
                prop="lock_expiration_time"
              >
                <el-input
                  v-model="dataSourceConcurrencyCom.lock_expiration_time"
                  :disabled="isEditLook"
                  @input="changeValue"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item
                label="锁重试休眠时间（ms）: "
                prop="lock_retry_dormancy_time"
              >
                <el-input
                  v-model="dataSourceConcurrencyCom.lock_retry_dormancy_time"
                  :disabled="isEditLook"
                  @input="changeValue"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="锁重试次数" prop="lock_retry_times">
                <el-input
                  v-model="dataSourceConcurrencyCom.lock_retry_times"
                  :disabled="isEditLook"
                  @input="changeValue"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "configurationAddTab1",
  components: {},
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
    pageParams: Object // 页面参数
  },
  data() {
    return {
      activeNames: ["1"],
      dataSourceManageCom: {
        data_source_code: "",
        data_source_name: "",
        provider_name: "",
        default_validity_day: ""
      }, // 基本信息
      basicRules: [],
      parameterForm: {}, // 入参配置信息
      parameterUrl:
        "/views/risk/risk_data_source/data_source_configuration/configuration_add_tab1_parameter.json",
      dataSourceConcurrencyCom: {
        lock_dimension: "",
        lock_expiration_time: "",
        lock_retry_dormancy_time: "",
        lock_retry_times: ""
      }, // 防并发访问配置信息
      antiConcurrentRules: [],
      isEditCode: this.$store.state.risk_store.data_source_tab1_submit || this.$store.state.risk_store.data_source_pageType === 'edit' || this.$store.state.risk_store.data_source_pageType === 'look',
      isEditLook: this.$store.state.risk_store.data_source_tab1_submit || this.$store.state.risk_store.data_source_pageType === 'look',
      lockTypeList: [],
      providerList: [],
      dataTypeList: [],
      pageShow: false
    };
  },
  created() {
    console.log(
      "this.dataSourceConcurrencyCom====",
      this.$store.state.risk_store
    );
    this.getDictList("DECI_E_DATA_SOURCE_TYPE", "dataTypeList");
    this.dataSourceManageCom = this.$store.state.risk_store.tab1_dataSourceManageCom;
    this.dataSourceConcurrencyCom = this.$store.state.risk_store.tab1_dataSourceConcurrencyCom;
    this.parameterForm.data_source_code = this.$store.state.risk_store.data_source_code;
    this.parameterForm.pageType = this.$store.state.risk_store.data_source_pageType;

    setTimeout(() => {
      this.pageShow = true;
    }, 500);
    // 如果是编辑或者查看，先初始化查询
    if (this.pageType != "add") {
      // this.init();
    }
  },
  watch: {
    dataSourceManageCom: {
      handler(newVal, oldVal) {
        this.$store.state.risk_store.tab1_dataSourceManageCom = newVal;
      },
      deep: true
    },
    dataSourceConcurrencyCom: {
      handler(newVal, oldVal) {
        this.$store.state.risk_store.tab1_dataSourceConcurrencyCom = newVal;
      },
      deep: true
    }
  },
  methods: {
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictType
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    changeValue(e) {
      this.$forceUpdate();
    },
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictType
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 入参配置回调
     */
    parameterCallback(data) {
      console.log("入参配置回调数据", data);
    },
    /**
     * 加锁维度下拉
     * 取值入参配置
     */
    getLockTypeList() {
      this.lockTypeList = this.$dataBus.getCurrentFormData(
        this
      ).dataSourceInputParamCom;
      console.log(
        ".dataSourceInputParamCom=========",
        this.$dataBus.getCurrentFormData(this).dataSourceInputParamCom,
        this.lockTypeList
      );
    },
    /**
     * 获取提供方列表
     */
    getProviderList() {
      
      let params = {
        servicecode: "deci050005"
      };
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            console.log("res.data===", res.data);
            this.providerList = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    
    },
    /**
     * 查询初始化信息
     */
    initData() {
      let params = {
        servicecode: "deci050013"
      };
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style lang="less" scoped></style>
