<template>
  <div class="box">
    <div>
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="模板编号" prop="template_id">
              <el-input v-model="form.template_id" :disabled="isEdit">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="模板名称" prop="template_name">
              <el-input v-model="form.template_name" :disabled="isEdit">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="模板组件" prop="template_list">
              <el-checkbox-group
                v-model="form.template_list"
                @change="handleChecked"
                :disabled="isEdit"
              >
                <el-checkbox
                  v-for="item in options"
                  :label="item.label"
                  :key="item.value"
                  >{{ item.label }}</el-checkbox
                >
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="template_status">
              <el-select
                v-model="form.template_status"
                @change="statusChange"
                style="width:100%;"
                :disabled="isEdit"
              >
                <el-option
                  v-for="item in statusList"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 结果分布统计 -->

        <!-- 进件字段 -->
        <el-row v-if="resultShow">
          <el-col :span="24">
            <el-form-item label="结果分布">
              <el-row>
                <el-col :span="11">
                  <el-form-item label="进件字段" prop="field_name">
                    <el-select
                      v-model="form.field_name"
                      collapse-tags
                      style="width:100%;"
                      placeholder="请选择"
                      @change="fieldChange"
                      :disabled="isEdit"
                    >
                      <el-option
                        v-for="item in fieldOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col v-if="cnArry.length > 0" :span="11">
                  <el-row v-for="(item, index) in cnArry" :key="index">
                    <el-col :span="24">
                      <el-form-item :label="item.field_name" prop="field_list">
                        <el-select
                          v-model="form.field_list[index]"
                          collapse-tags
                          style="width:100%;"
                          placeholder="请选择"
                          :disabled="isEdit"
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
              <el-row class="margin-t-8">
                <el-col :span="11">
                  <el-form-item label="测试结果" prop="result_name">
                    <el-select
                      v-model="form.result_name"
                      multiple
                      collapse-tags
                      style="width:100%;"
                      placeholder="请选择"
                      @change="resultChange"
                      :disabled="isEdit"
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
                <el-col v-if="cnArry2.length > 0" :span="11">
                  <el-row v-for="(item, index) in cnArry2" :key="index">
                    <el-col :span="24">
                      <el-form-item
                        :label="item.result_name"
                        prop="result_list"
                      >
                        <el-select
                          v-model="form.result_list[index]"
                          collapse-tags
                          style="width:100%;"
                          placeholder="请选择"
                          :disabled="isEdit"
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
            </el-form-item>
          </el-col>
        </el-row>

        <el-row class="footer">
          <el-col :span="6" :offset="18">
            <el-button size="small" @click="handClose">{{
              $i18ns("取消")
            }}</el-button>
            <el-button type="primary" size="small" @click="submitConfig" plain
              >提交</el-button
            >
          </el-col>
        </el-row>
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
  name: "TemplateEdit",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      isEdit: false,
      form: {
        template_id: "",
        template_name: "",
        template_list: [],
        template_ststus: "",
        field_name: "",
        field_list: [],
        result_name: "",
        result_list: []
      },
      options: [
        {
          label: "基本信息",
          value: "1"
        },
        {
          label: "执行日志",
          value: "2"
        },
        {
          label: "数据源调用情况",
          value: "3"
        },
        {
          label: "变量调用情况",
          value: "4"
        },
        {
          label: "测试结果明细",
          value: "5"
        },
        {
          label: "结果分布统计",
          value: "6"
        }
      ],
      statusList: [],
      cnArry: [], // 进件字段多选
      cnArry2: [], // 测试结果多选
      fieldOptions: [
        {
          value: "0",
          label: "性别"
        },
        {
          value: "1",
          label: "年龄"
        }
      ],
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
      resultShow: false, // 结果分布显示隐藏
      checkedItem1: [],
      checkedItem2: []
    };
  },
  created() {
    this.getDictList("MS_YES_OR_NO", "statusList");
  },
  watch: {
    checkedItem2: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal.includes("6")) {
          this.resultShow = true;
        } else {
          this.resultShow = false;
        }
      }
    },
    cParentParams: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if(newVal) {
          // this.form = newVal;
          this.isEdit = newVal.isEdit;
        }
      }
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
    handleChecked(val) {
      console.log("复选框val===========", val);
      if (val) {
        //如果全选为true，要把所有的name放到数组1中
        this.checkedItem1 = [];
        this.checkedItem2 = [];
        this.options.forEach(item => {
          val.forEach(ele => {
            if (item.label === ele) {
              this.checkedItem1.push(item.label);
              this.checkedItem2.push(item.value);
            }
          });
        });
      } else {
        //如果全选为false，要把数组1和数组2都置空
        this.checkedItem1 = [];
        this.checkedItem2 = [];
      }
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
