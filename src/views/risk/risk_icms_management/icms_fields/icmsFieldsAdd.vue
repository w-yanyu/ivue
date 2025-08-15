<template>
  <div>
    <el-form
      ref="basicForm"
      :rules="basicRules"
      :model="basicForm"
      label-width="200px"
      class="custom-common--form"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="进件场景: " prop="fact_scene">
            <el-select v-model="basicForm.fact_scene" :disabled="true">
              <el-option
                v-for="item in factSceneList"
                :key="item.dictId"
                :label="item.dictName"
                :value="item.dictId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="字段分组代码: " prop="field_group_code">
            <el-select v-model="basicForm.field_group_code" :required="true">
              <el-option
                v-for="item in fieldGroupList"
                :key="item.dictId"
                :label="item.dictName"
                :value="item.dictId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="字段名: " prop="field_code">
            <el-input
              v-model="basicForm.field_code"
              :required="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="字段中文名: " prop="field_name">
            <el-input
              v-model="basicForm.field_name"
              :disabled="isEdit"
              :required="true"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="字段描述: " prop="description">
            <el-input
              v-model="basicForm.description"
              :disabled="isEdit"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="字段类型: " prop="data_type">
            <el-select
              v-model="basicForm.data_type"
              :disabled="isEdit"
              :required="true"
            >
              <el-option
                v-for="item in dataTypeList"
                :key="item.dictId"
                :label="item.dictName"
                :value="item.dictId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="精度: " prop="value_precision">
            <el-input
              v-model="basicForm.value_precision"
              :disabled="isEdit"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否存在枚举: " prop="is_enumeration">
            <el-select
              v-model="basicForm.is_enumeration"
              :disabled="isEdit"
              @change="enumerationChange"
            >
              <el-option
                v-for="item in isEnumerationList"
                :key="item.dictId"
                :label="item.dictName"
                :value="item.dictId"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="constShow">
          <el-form-item label="常量代码: " prop="const_code">
            <div class="lookupDiv">
              <el-input v-model="basicForm.const_code"></el-input>
              <el-button @click="constCodeLookup" type="success" plain
                >...</el-button
              >
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="footer" v-if="pageType !== 'look'">
      <el-row>
        <el-col :span="6" :offset="18">
          <el-button type="primary" @click="saveConfig" v-loading="loading"
            >保存</el-button
          >
          <el-button @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </div>

    <el-dialog
      title="选择常量代码"
      :visible.sync="constCodeVisible"
      v-if="constCodeVisible"
      width="70%"
      :before-close="handleClose"
      top="30vh"
      :append-to-body="true"
    >
      <!-- <to-json
        :params="constParam"
        :toUrl="'/views/risk/risk_rule_constant/risk_rule_constant_lookup.json'"
        @jsonCallBack="constCodeCallBack"
      ></to-json> -->
      <div
        class="dialog-content"
        style="overflow-y: auto; max-height: 100%; height: 100%;"
      >
        <Lookup
          ref="Lookup"
          @closeDialog="closeDialog"
          :cParentParams="cParentParams"
        ></Lookup>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import Lookup from "./risk_rule_constant_lookup.vue";

export default {
  name: "icmsFieldsAdd",
  components: {
    Lookup
  },
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对
  },
  data() {
    return {
      basicForm: {},
      basicRules: {
        field_group_code: [
          {
            required: true,
            message: "请选择字段分组代码",
            trigger: "blur"
          }
        ],
        field_code: [
          {
            required: true,
            message: "请输入字段名",
            trigger: "blur"
          }
        ],
        field_name: [
          {
            required: true,
            message: "请输入字段中文名",
            trigger: "blur"
          }
        ],
        data_type: [
          {
            required: true,
            message: "请选择字段类型",
            trigger: "blur"
          }
        ]
      },
      loading: false,
      factSceneList: [],
      fieldGroupList: [],
      dataTypeList: [],
      isEnumerationList: [],
      constShow: false,
      constCodeVisible: false, //显示查找对话框
      constParam: {
        org_id: ""
      }
    };
  },
  created() {
    this.getDictList("DECI_E_SCENE_TYPE", "factSceneList");
    this.getDictList("DECI_E_FIELD_GROUP", "fieldGroupList");
    this.getDictList("DECI_E_DATA_TYPE", "dataTypeList");
    this.getDictList("MS_E_YESORNO", "isEnumerationList");
  },
  watch: {
    cParentParams: {
      immediate: true,
      deep: true,
      handler(newVal, oldVal) {
        if (newVal) {
          this.cParentParams = newVal;
          this.constParam.org_id = this.cParentParams.org_id;

          this.basicForm.fact_scene = this.cParentParams.fact_scene;
          this.basicForm.field_group_code = this.cParentParams.field_group_code;
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
    /**
     * 保存
     */
    saveConfig() {
      this.$refs.basicForm.validate(valid => {
        if (valid) {
          this.sendData();
        }
      });
    },
    sendData() {
      this.loading = true;
      let that = this;
      let userInfo = JSON.parse(localStorage.getItem("user_info"));

      // 对字段分组代码处理
      this.fieldGroupList.forEach(item => {
        if (item.dictId === this.basicForm.field_group_code)
          this.basicForm.field_group_name = item.dictName;
      });

      let param = {
        ...this.basicForm,
        servicecode: "deci050101"
      };
      that.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", param)
        .then(obj => {
          this.loading = false;
          that.$message({
            type: "success",
            message: "成功"
          });
          that.$dataBus.doCallBack(that, obj);
        })
        .catch(reg => {
          console.log("reg", reg);
        });
    },
    reset() {
      this.basicForm = {};
    },
    enumerationChange(val) {
      if (val === "1") {
        this.constShow = true;
      } else {
        this.constShow = false;
      }
    },
    //2、关闭lookup对话框
    closeDialog(item) {
      this.constCodeVisible = false;
      this.basicForm.const_code = item;
    },
    constCodeLookup() {
      let that = this;
      that.constCodeVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
.lookupDiv {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /deep/ .el-button--medium {
    padding: 7px 12px !important;
  }
}
</style>
