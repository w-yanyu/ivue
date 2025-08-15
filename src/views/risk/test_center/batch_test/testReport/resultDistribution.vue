<template>
  <div class="box">
    <!-- 结果分布统计 -->
    <div>
      <el-form ref="form" :model="form" label-width="120px">
        <!-- 进件字段 -->
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="进件字段"
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

        <!-- <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="handClose">{{
            $i18ns("取消")
          }}</el-button>
          <el-button type="primary" size="small" @click="submitConfig" plain
            >提交</el-button
          >
        </span> -->
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
  name: "resultDistribution",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
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
      ],
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
    }
  },
  created() {},
  mounted() {},
  methods: {
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
