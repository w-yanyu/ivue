<template>
  <div>
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <span><em></em>接口账号配置</span>
        </template>
        <el-form
          ref="basicForm"
          :rules="interfaceAccountRules"
          :model="interfaceAccountForm"
          label-width="200px"
          class="custom-common--form"
        >
          <to-json
            :toUrl="interfaceAccountUrl"
            :params="interfaceAccountForm"
            @jsonCallBack="interfaceAccountCallback"
            :key="1"
          ></to-json>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <span><em></em>鉴权token配置</span>
        </template>
        <el-form
          ref="tokenForm"
          :model="tokenForm"
          label-width="200px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="默认连接超时时间（ms）"
                prop="connection_timeout"
                label-width="200px"
              >
                <el-input
                  class="input_el"
                  v-model="tokenForm.authToken.connection_timeout"
                  type="text"
                  :disabled="isEdit"
                  style="width: 350px; margin-right: 0px;"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="默认读取超时时间（ms）"
                prop="read_timeout"
                label-width="200px"
              >
                <el-input
                  class="input_el"
                  v-model="tokenForm.authToken.read_timeout"
                  type="text"
                  style="width: 350px; margin-right: 0px;"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="失败重试次数"
                prop="redo_counts"
                label-width="200px"
              >
                <el-input
                  class="input_el"
                  v-model="tokenForm.authToken.redo_counts"
                  type="text"
                  :disabled="isEdit"
                  style="width: 350px; margin-right: 0px;"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="鉴权有效期（分钟、小时）"
                prop="auth_validity_period"
                label-width="200px"
              >
                <el-input
                  class="input_el"
                  v-model="tokenForm.authToken.auth_validity_period"
                  type="text"
                  style="width: 350px; margin-right: 0px;"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="请求类型"
                prop="url_type"
                label-width="200px"
              >
                <el-select
                  v-model="tokenForm.authToken.url_type"
                  placeholder="请求类型"
                  @change="dataTypeChange"
                  style="width: 350px; margin-right: 0px;"
                >
                  <el-option
                    v-for="item in urlTypeList"
                    :key="item.dictId"
                    :label="item.dictId + '-' + item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="请求URL地址"
                prop="url_path"
                label-width="200px"
              >
                <el-input
                  class="input_el"
                  v-model="tokenForm.authToken.url_path"
                  type="text"
                  style="width: 350px; margin-right: 0px;"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- token header url配置 start -->
          <el-tabs v-model="tokenTab" type="border-card">
            <el-tab-pane label="Header配置">
              <to-json
                :params="tokenForm"
                :toUrl="tokenHeaderUrl"
                @jsonCallBack="tokenHeaderCallback"
                :key="2"
              ></to-json>
            </el-tab-pane>
            <el-tab-pane label="URL参数配置">
              <to-json
                :params="tokenForm"
                :toUrl="tokenURLUrl"
                @jsonCallBack="tokenURLCallback"
                :key="3"
              ></to-json>
            </el-tab-pane>
          </el-tabs>
          <!-- token header url配置 end -->

          <!-- token 返回结果字段配置 start -->
          <el-row>
            <el-col :span="24">
              <el-form-item
                label="鉴权Token返回结果字段:"
                prop="contactList"
                label-width="200px"
              >
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item
                label="鉴权Token响应代码取值路径（errcode）"
                prop="res_token_code_value_path"
                label-width="200px"
              >
                <el-input
                  class="input_el"
                  v-model="tokenForm.authToken.res_token_code_value_path"
                  type="text"
                  style="width: 350px; margin-right: 0px;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="响应代码函数"
                prop="res_code_function"
                label-width="200px"
              >
                <el-input
                  class="input_el"
                  v-model="tokenForm.authToken.res_code_function"
                  type="text"
                  style="width: 350px; margin-right: 0px;"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="鉴权Token响应消息取值路径(errmsg)"
                prop="res_token_msg_value_path"
                label-width="200px"
              >
                <el-input
                  class="input_el"
                  v-model="tokenForm.authToken.res_token_msg_value_path"
                  type="text"
                  style="width: 350px; margin-right: 0px;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="响应消息函数"
                prop="res_msg_function"
                label-width="200px"
              >
                <el-input
                  class="input_el"
                  v-model="tokenForm.authToken.res_msg_function"
                  type="text"
                  style="width: 350px; margin-right: 0px;"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="Token值取值路径"
                prop="token_value_path"
                label-width="200px"
              >
                <el-input
                  class="input_el"
                  v-model="tokenForm.authToken.token_value_path"
                  type="text"
                  style="width: 350px; margin-right: 0px;"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- token 返回结果字段配置 end -->
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <span><em></em>接口访问配置</span>
        </template>
        <el-form
          ref="interfaceAccessForm"
          :model="interfaceAccessForm"
          label-width="200px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="默认连接超时时间（ms）"
                prop="connection_timeout"
                label-width="200px"
              >
                <el-input
                  class="input_el"
                  v-model="
                    interfaceAccessForm.interfaceAccess.connection_timeout
                  "
                  type="text"
                  :disabled="isEdit"
                  style="width: 350px; margin-right: 0px;"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item
                label="默认读取超时时间（ms）"
                prop="read_timeout"
                label-width="200px"
              >
                <el-input
                  class="input_el"
                  v-model="interfaceAccessForm.interfaceAccess.read_timeout"
                  type="text"
                  style="width: 350px; margin-right: 0px;"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="URL类型" prop="url_type" label-width="200px">
                <el-select
                  v-model="interfaceAccessForm.interfaceAccess.url_type"
                  placeholder="请求类型"
                  @change="dataTypeChange"
                  style="width: 350px; margin-right: 0px;"
                >
                  <el-option
                    v-for="item in urlTypeList"
                    :key="item.dictId"
                    :label="item.dictId + '-' + item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- 接口访问配置 start -->
          <el-tabs v-model="interfaceAccessTab" type="border-card">
            <el-tab-pane label="Header配置">
              <to-json
                :params="interfaceAccessForm"
                :toUrl="accessHeadUrl"
                @jsonCallBack="interfaceHeaderCallback"
              ></to-json>
            </el-tab-pane>
            <el-tab-pane label="URL参数配置">
              <to-json
                :params="interfaceAccessForm"
                :toUrl="accessURLUrl"
                @jsonCallBack="interfaceURLCallback"
              ></to-json>
            </el-tab-pane>
            <el-tab-pane label="Body配置">
              <to-json
                :params="interfaceAccessForm"
                :toUrl="accessBodyUrl"
                @jsonCallBack="interfaceBodyCallback"
              ></to-json>
            </el-tab-pane>
          </el-tabs>
          <!-- 接口访问配置 end -->

          <!-- token 返回结果字段配置 start -->
          <!-- <el-row>
            <el-col :span="24">
              <el-form-item
                label="鉴权Token返回结果字段"
                prop="contactList"
                label-width="200px"
              >
                <to-json
                  :params="tokenForm"
                  :toUrl="tokenResultUrl"
                  @jsonCallBack="jsonCallBack"
                ></to-json>
              </el-form-item>
            </el-col>
          </el-row>
          <to-json
            :toUrl="parameterUrl"
            :params="''"
            @jsonCallBack="parameterCallback"
          ></to-json> -->
          <!-- token 返回结果字段配置 end -->
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template slot="title">
          <span><em></em>接口返回结果清单结构配置</span>
        </template>
        <el-form
          ref="resultInfo"
          :rules="interfaceResultListRules"
          :model="resultInfo"
          label-width="200px"
          class="custom-common--form"
        >
          <to-json
            :toUrl="interfaceResultListUrl"
            :params="resultInfo"
            @jsonCallBack="interfaceResultListCallback"
          ></to-json>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="5">
        <template slot="title">
          <span><em></em>接口返回结果字段配置</span>
        </template>
        <el-form
          ref="resultSubInfo"
          :rules="interfaceResultFieldRules"
          :model="resultSubInfo"
          label-width="200px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="接口响应代码取值路径（errcode）"
                prop="res_code_value_path"
                label-width="200px"
              >
                <el-input
                  class="input_el"
                  v-model="resultSubInfo.res_code_value_path"
                  type="text"
                  style="width: 350px; margin-right: 0px;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="响应代码函数"
                prop="res_code_function"
                label-width="200px"
              >
                <el-input
                  class="input_el"
                  v-model="resultSubInfo.res_code_function"
                  type="text"
                  style="width: 350px; margin-right: 0px;"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="接口响应消息取值路径(errmsg)"
                prop="res_msg_value_path"
                label-width="200px"
              >
                <el-input
                  class="input_el"
                  v-model="resultSubInfo.res_msg_value_path"
                  type="text"
                  style="width: 350px; margin-right: 0px;"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label="响应消息函数"
                prop="res_msg_function"
                label-width="200px"
              >
                <el-input
                  class="input_el"
                  v-model="resultSubInfo.res_msg_function"
                  type="text"
                  style="width: 350px; margin-right: 0px;"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item
                label="返回流水号"
                prop="res_seq"
                label-width="200px"
              >
                <el-input
                  class="input_el"
                  v-model="resultSubInfo.res_seq"
                  type="text"
                  style="width: 350px; margin-right: 0px;"
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
  name: "configurationAddTab2",
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
      urlTypeList: [],
      pageShow: false,
      activeNames: ["1"],
      tokenTab: "first",
      interfaceAccessTab: "first",
      interfaceAccountForm: {
        pageType: "add",
        interfaceAcct: []
      }, // 接口账号配置信息
      interfaceAccountRules: [],
      interfaceAccountUrl:
        "/views/risk/risk_data_source/data_source_configuration/configuration_add_tab2_interfaceAccount.json", // 接口账号配置JSON地址
      tokenForm: {
        pageType: "add",
        authToken: {
          data_source_code: "", // 数据源代码
          data_source_name: "", // 数据源名称
          data_source_status: "", // 数据源状态
          data_source_type: "", // 数据源类型
          provider_code: "", // 提供方代码
          provider_name: "", // 提供方名称
          start_status: "", // 启停状态
          regist_status: "", // 注册状态
          default_validity_day: "", // 默认数据有效期（天）
          connection_timeout: "", // 默认连接超时时间（ms）
          read_timeout: "", // 默认读取超时时间（ms）
          url_type: "", // URL类型
          url_path: "", // 请求地址
          value_expression: "", // 取值表达式
          example_results: "", // 示例结果
          trxn_version: "", // 交易版本号
          auth_validity_period: "", // 鉴权有效期
          redo_counts: "", //重试次数
          res_token_code_value_path: "", // 鉴权Token响应代码取值路径（errcode）
          res_code_function: "", // 响应代码函数
          res_token_msg_value_path: "", // 鉴权Token响应消息取值路径(errmsg)
          res_msg_function: "", // 响应消息函数
          token_value_path: "" // Token值取值路径
        },
        headData: [],
        urlData: []
      }, // Token配置信息
      tokenHeaderUrl:
        "/views/risk/risk_data_source/data_source_configuration/configuration_add_tab2_token_header.json",
      tokenURLUrl:
        "/views/risk/risk_data_source/data_source_configuration/configuration_add_tab2_token_url.json",
      tokenResultUrl:
        "/views/risk/risk_data_source/data_source_configuration/token_result_add.json",
      antiConcurrentForm: {}, // Token返回结果字段配置信息
      antiConcurrentRules: [],
      interfaceAccessForm: {
        pageType: "add",
        interfaceAccess: {
          data_source_code: "", // 数据源代码
          data_source_name: "", // 数据源名称
          data_source_status: "", // 数据源状态
          data_source_type: "", // 数据源类型
          provider_code: "", // 提供方代码
          provider_name: "", // 提供方名称
          start_status: "", // 启停状态
          regist_status: "", // 注册状态
          default_validity_day: "", // 默认数据有效期（天）
          connection_timeout: "", // 默认连接超时时间（ms）
          read_timeout: "", // 默认读取超时时间（ms）
          url_type: "", // URL类型
          url_path: "", // 请求地址
          value_expression: "", // 取值表达式
          example_results: "", // 示例结果
          trxn_version: "" // 交易版本号
        },

        headData: [],
        urlData: [],
        bodyData: []
      }, // 接口访问配置信息
      accessHeadUrl:
        "/views/risk/risk_data_source/data_source_configuration/configuration_add_tab2_access_head.json",
      accessURLUrl:
        "/views/risk/risk_data_source/data_source_configuration/configuration_add_tab2_access_url.json",
      accessBodyUrl:
        "/views/risk/risk_data_source/data_source_configuration/configuration_add_tab2_access_body.json",

      interfaceAccessBodyUrl:
        "/views/risk/risk_data_source/data_source_configuration/configuration_add_tab2_interface_body.json", // 接口访问body url地址
      resultInfo: {}, // 结果清单结构列表
      interfaceResultListUrl:
        "/views/risk/risk_data_source/data_source_configuration/tab2_interface_result_list.json", // 接口返回结果清单结构配置
      resultSubInfo: {
        res_code_value_path: "", // 接口响应代码取值路径（errcode）
        res_code_function: "", // 响应代码函数
        res_msg_value_path: "", // 接口响应消息取值路径(errmsg)
        res_msg_function: "", // 响应消息函数
        res_seq: "", // 返回流水号
      }, // 结果清单字段配置
      interfaceResultFieldUrl:
        "/views/risk/risk_data_source/data_source_configuration/interface_result_field_add.json" // 接口返回结果字段配置信息
    };
  },
  created() {
    console.log(
      "this.$store.state.risk_store.data_source_pageType",
      this.$store.state.risk_store.data_source_pageType
    );
    this.getDictList("DECI_E_URL_TYPE", "urlTypeList");
    // if(this.$store.state.risk_store.data_source_pageType === 'edit' || this.$store.state.risk_store.data_source_pageType === "look" ) {
    //   this.initData();
    // }

    this.initData();

    this.interfaceAccountForm.pageType = this.$store.state.risk_store.data_source_pageType;
    this.interfaceAccountForm.data_source_code = this.$store.state.risk_store.data_source_code;

    this.tokenForm.pageType = this.$store.state.risk_store.data_source_pageType;
    this.tokenForm.data_source_code = this.$store.state.risk_store.data_source_code;

    this.interfaceAccessForm.pageType = this.$store.state.risk_store.data_source_pageType;
    this.interfaceAccessForm.data_source_code = this.$store.state.risk_store.data_source_code;

    this.resultInfo.data_source_code = this.$store.state.risk_store.data_source_code;
    this.resultInfo.pageType = this.$store.state.risk_store.data_source_pageType;

    this.resultSubInfo.data_source_code = this.$store.state.risk_store.data_source_code;
    this.resultSubInfo.pageType = this.$store.state.risk_store.data_source_pageType;

    setTimeout(() => {
      this.pageShow = true;
    }, 1000);
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
    /**
     * 查询
     */
    initData() {
      let params = {
        servicecode: "deci050041",
        data_source_code: this.$store.state.risk_store.data_source_code
      };
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            let data = res.data;
            this.interfaceAccountForm.interfaceAcct = data.interfaceAcct;

            this.tokenForm.authToken = data.authToken;
            this.tokenForm.headData = data.authToken.headData;
            this.tokenForm.urlData = data.authToken.urlData;

            this.interfaceAccessForm.interfaceAccess = data.interfaceAccess;

            this.initData2();
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    initData2() {
      let params = {
        servicecode: "deci050048",
        data_source_code: this.$store.state.risk_store.data_source_code
      };
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            let data = res.data;

            this.tokenForm.authToken.res_token_code_value_path =
              data.resultFieldInfo.res_token_code_value_path;
            this.tokenForm.authToken.res_code_function =
              data.resultFieldInfo.res_code_function;
            this.tokenForm.authToken.res_token_msg_value_path =
              data.resultFieldInfo.res_token_msg_value_path;
            this.tokenForm.authToken.res_msg_function =
              data.resultFieldInfo.res_msg_function;
            this.tokenForm.authToken.token_value_path =
              data.resultFieldInfo.token_value_path;

              this.initData3();
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    initData3() {
      let params = {
        servicecode: "deci050049",
        data_source_code: this.$store.state.risk_store.data_source_code
      };
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            let data = res.data;

            this.resultSubInfo.res_code_value_path =
              data.resultFieldInfo.res_token_code_value_path;
            this.resultSubInfo.res_code_function =
              data.resultFieldInfo.res_code_function;
            this.resultSubInfo.res_msg_value_path =
              data.resultFieldInfo.res_msg_value_path;
            this.resultSubInfo.res_msg_function =
              data.resultFieldInfo.res_msg_function;
            this.resultSubInfo.res_seq =
              data.resultFieldInfo.res_seq;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 接口账号配置回调
     */
    interfaceAccountCallback(data) {
      console.log("入参配置回调数据", data);
    },
    /**
     * Token配置-Header配置回调
     */
    tokenHeaderCallback(data) {
      console.log("入参配置回调数据", data);
    },
    /**
     * Token配置-URL配置回调
     */
    tokenURLCallback(data) {
      console.log("入参配置回调数据", data);
    },
    /**
     * 接口访问配置-Header配置回调
     */
    interfaceHeaderCallback(data) {
      console.log("入参配置回调数据", data);
    },
    /**
     * 接口访问配置-URL配置回调
     */
    interfaceURLCallback(data) {
      console.log("入参配置回调数据", data);
    },
    /**
     * 接口访问配置-Body配置回调
     */
    interfaceBodyCallback(data) {
      console.log("入参配置回调数据", data);
    },
    /**
     * 入参配置回调
     */
    parameterCallback(data) {
      console.log("入参配置回调数据", data);
    }
  }
};
</script>

<style lang="less" scoped></style>
