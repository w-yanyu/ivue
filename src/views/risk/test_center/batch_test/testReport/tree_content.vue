<template>
  <div class="box">
    <!-- 基本信息 -->
    <div>
      <to-json
        :toUrl="basicUrl"
        :params="basicForm"
        @jsonCallBack="basicCallback"
      ></to-json>
    </div>

    <!-- 执行日志 -->
    <div class="content-box">
      <to-json
        :toUrl="executionLogUrl"
        :params="executionLogForm"
        @jsonCallBack="executionLogCallback"
      ></to-json>
    </div>

    <!-- 数据源调用情况 -->
    <div class="content-box">
      <to-json
        :toUrl="dataSourceUrl"
        :params="dataSourceForm"
        @jsonCallBack="dataSourceCallback"
      ></to-json>
    </div>

    <!-- 变量调用情况 -->
    <div class="content-box">
      <to-json
        :toUrl="variableUrl"
        :params="variableForm"
        @jsonCallBack="variableCallback"
      ></to-json>
    </div>

    <!-- 测试结果明细 -->
    <div class="content-box" style="max-width: 80%;">
      <!-- <el-table :data="testTableData" style="width: 100%">
        <el-table-column prop="field_name" label="进件字段" width="150">
        </el-table-column>
        <el-table-column label="测试结果">
          <el-table-column
            v-for="(item, index) in testHeadData"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            width="120"
          >
          </el-table-column>
        </el-table-column>
      </el-table> -->

      <el-table
        v-loading="loading"
        :data="tableData"
        highlight-current-row
        size="small"
        style="width: 100%;"
      >
        <el-table-column
          :label="$t('table.id')"
          type="index"
          min-width="5%"
          align="center"
          v-if="false"
        />
        <el-table-column prop="field_name" label="进件字段" align="center" />

        <el-table-column
          v-for="item in columnFirstOptions"
          :label="item.value"
          :key="item.id"
          :property="item.id"
          align="center"
          width="65"
        >
          <el-table-column
            min-width="10%"
            v-for="ccitem in columnSecondOptions[item.id]"
            :label="ccitem.value"
            :key="ccitem.id"
            :property="ccitem.id"
            align="center"
          >
            <template slot-scope="scope">
              <span>{{
                scope.row["result"][item.id][scope.column.property]
              }}</span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>

    <!-- 结果分布统计 -->
    <div>
      <el-form ref="form" :model="form" label-width="120px">
        <!-- 进件字段 -->
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="进件字段"
              :rules="[{ required: true, message: '进件字段不能为空' }]"
              prop="field_name"
            >
              <el-select
                v-model="form.field_name"
                collapse-tags
                style="width:100%;"
                placeholder="请选择"
                @change="fieldChange"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="cnArry.length > 0" :span="12">
            <el-row v-for="(item, index) in cnArry" :key="index">
              <el-col :span="24">
                <el-form-item :label="item.field_name" prop="field_list">
                  <el-select
                    v-model="form.field_list[index]"
                    collapse-tags
                    style="width:100%;"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in item.dynamicOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 进件字段 -->

        <!-- 测试结果 -->
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="测试结果"
              :rules="[{ required: true, message: '测试结果不能为空' }]"
              prop="result_name"
            >
              <el-select
                v-model="form.result_name"
                multiple
                collapse-tags
                style="width:100%;"
                placeholder="请选择"
                @change="resultChange"
              >
                <el-option
                  v-for="item in resutOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="cnArry2.length > 0" :span="12">
            <el-row v-for="(item, index) in cnArry2" :key="index">
              <el-col :span="24">
                <el-form-item :label="item.result_name" prop="result_list">
                  <el-select
                    v-model="form.result_list[index]"
                    collapse-tags
                    style="width:100%;"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in item.dynamicOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 测试结果 -->

        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="handClose">{{
            $i18ns("取消")
          }}</el-button>
          <el-button type="primary" size="small" @click="submitConfig" plain
            >提交</el-button
          >
        </span>
      </el-form>
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
    roleCode: String,
    isReadOnly: {
      // 是否是view页面
      type: Boolean,
      default: true
    },
    isShowAuthority: {
      // 概览界面只显示已选权限数据
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    filterText: {
      // 过滤的字段
      type: String,
      default: ""
    },
    collapseList: {
      type: Array,
      default: () => []
    },
    isMultiRole: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        field_name: "",
        field_list: [],
        result_name: "",
        result_list: []
      }, // 多个结果表单
      fieldList: [], // 进件字段
      options: [
        {
          value: "0",
          label: "性别"
        },
        {
          value: "1",
          label: "年龄"
        }
      ], // 进件字段列表
      dynamicTags: [], //tag标签
      mulDynamicTags: [
        {
          label: "性别(女)-利率(0,0.1]-审核结果(通过)",
          value: "1"
        }
      ],
      dialogVisible: false,
      cnArry: [], // 进件字段多选
      cnArry2: [], // 测试结果多选
      resutOptions: [
        {
          value: "0",
          label: "利率"
        },
        {
          value: "1",
          label: "审核结果"
        }
      ], // 测试结果列表
      basicUrl: "/views/risk/test_center/batch_test/testReport/basic_form.json", // 基本信息
      basicForm: "",
      executionLogUrl:
        "/views/risk/test_center/batch_test/testReport/execution_log.json", // 执行日志
      executionLogForm: "",
      dataSourceUrl:
        "/views/risk/test_center/batch_test/testReport/data_source.json", // 数据源调用情况
      dataSourceForm: "",
      variableUrl:
        "/views/risk/test_center/batch_test/testReport/variable_log.json", // 变量调用情况
      variableForm: "",
      testResultUrl: "", // 测试结果明细
      testResultForm: "",
      loading: false,
      //动表列一级头
      columnFirstOptions: [
        { id: "test_result", value: "测试结果" }
      ],
      //动表列二级头
      columnSecondOptions: {
        "test_result": [
          { id: "callCnt1", value: "利率" },
          { id: "backResCnt1", value: "额度" },
          { id: "billCnt1", value: "审核结果" }
        ]
      },
      //表格数据
      tableData: [
        {
          field_name: "进件字段1",
          result: {
            "test_result": {
              callCnt1: 10,
              backResCnt1: 10,
              billCnt1: 10
            }
          }
        },
        {
          field_name: "进件字段2",
          result: {
            "test_result": {
              callCnt1: 10,
              backResCnt1: 10,
              billCnt1: 10
            }
          }
        }
      ]
    };
  },
  watch: {
    fieldList: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        this.dynamicTags = [];
        this.options.forEach(item => {
          newVal.forEach(ele => {
            if (ele == item.value) {
              this.dynamicTags.push(item);
            }
          });
        });
      }
    },
    testTableData: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        this.testHeadData = [];
        this.testBodyData = [];
        newVal.forEach(item => {
          item.result.forEach(ele => {
            this.testHeadData.push({
              label: ele.name,
              prop: ele.value
            });
          });
        });

        console.log("this.testHeadData=====", this.testHeadData);
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
        this.active = true;
        this.parentData = item;
        this.selectTitle = item.title;
        this.initRule(item);
      }
    },
    /**
     * 数据权限及规则列表查询
     */
    initRule(item, index, position) {
      // 获取rule数据
      this.collapseLoading = true;
      let params = {
        data_perm_id: "",
        data_perm_name: "",
        start: this.start,
        length: this.length,
        servicecode: "ct3306"
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          this.collapseLoading = false;
          // this.$set(this.cloneCollapseData[index], "content", res.data ? res.data: [])
          this.ruleLists = res.data ? res.data : [];
          this.ruleLists.forEach(ele => {
            this.selectedDataPermission.forEach(e => {
              if (e.data_perm_id === ele.data_perm_id) ele.checked = true;
            });
          });
        })
        .catch(err => {
          this.collapseLoading = false;
        });
    },
    handleClose(tag) {
      console.log("tag========", tag);

      this.fieldList.splice(this.fieldList.indexOf(tag.value), 1);

      console.log("this.fieldList========", this.fieldList);
    },
    submit() {},
    addItem() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    /**
     * 进件字段选择获取下拉列表
     */
    fieldChange(val) {
      // 根据下拉列表值查询
      // let params = {
      //   servicecode: ""
      // };
      // MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      //   .then(res => {
      //     if (res && res.code === "200") {
      //       this.cnArry = res.data;
      //     }
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   });
      // 根据实际接口返回参数组装字段
      if (val) {
        this.cnArry = [
          {
            field_name: "性别",
            dynamicOptions: [
              {
                label: "女",
                value: "0"
              },
              {
                label: "男",
                value: "1"
              }
            ]
          }
        ];
      }
    },
    /**
     * 测试结果选择获取下拉列表
     */
    resultChange(val) {
      // 根据下拉列表值查询
      // let params = {
      //   servicecode: ""
      // };
      // MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      //   .then(res => {
      //     if (res && res.code === "200") {
      //       this.cnArry = res.data;
      //     }
      //   })
      //   .catch(err => {
      //     console.error(err);
      //   });
      // 根据实际接口返回参数组装字段
      if (val) {
        this.cnArry2 = [
          {
            result_name: "利率",
            dynamicOptions: [
              {
                label: "[0, 0.1)",
                value: "[0, 0.1)"
              },
              {
                label: "(0.1, 0.5]",
                value: "(0.1, 0.5]"
              }
            ]
          },
          {
            result_name: "审核结果",
            dynamicOptions: [
              {
                label: "拒绝",
                value: "0"
              },
              {
                label: "通过",
                value: "1"
              }
            ]
          }
        ];
      }
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
.jinjian {
  padding: 16px;
}
.result {
  padding: 16px;
}
.tags-box {
  width: 30vw;
  height: 20vh;
  border: 1px solid #ededed;
  border-radius: 16px;
  padding: 16px;
  margin-top: 16px;
  box-shadow: 0px 0px 5px #e5e9f3;
}

.mulbox {
  padding: 16px;
}
</style>
