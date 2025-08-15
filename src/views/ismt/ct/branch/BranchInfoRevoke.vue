<template>
  <el-form
    :model="formData"
    :rules="rules"
    ref="formData"
    label-width="240px"
    class="demo-ruleForm"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item 
          :label="机构号" 
          prop="branch_id" 
          class="upload-item"
          >
            <el-input
                v-model="formData.branch_id"
                :disabled="onlyRead"
            />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item 
          :label="机构名称" 
          prop="branch_name" 
          class="upload-item"
          >
            <el-input
                v-model="formData.branch_name"
                :disabled="onlyRead"
            />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item 
          :label="机构关系代码" 
          prop="brch_relation_code" 
          class="upload-item"
          >
            <el-select
              v-model="formData.brch_relation_code"
              placeholder=""
            >
              <el-option
                v-for="(item, i) in relationCodeList"
                :key="i"
                :label="item.dictName"
                :value="item.dictId"
              ></el-option>
            </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item
          :label="机构是否保留"
          prop="branch_reserve_flag"
          class="upload-item"
        >
          <el-select
              v-model="formData.branch_reserve_flag"
              placeholder=""
            >
              <el-option
                v-for="(item, i) in reserveFlagList"
                :key="i"
                :label="item.dictName"
                :value="item.dictId"
              ></el-option>
            </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row class="custom-common--footer">
      <el-button type="primary" size="small" @click="submitForm"
        >{{$i18ns('确认')}}</el-button
      >
      <el-button type="primary" size="small" @click="closeForm">{{$i18ns('取消')}}</el-button>
    </el-row>
  </el-form>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "CollateralEntry",
  props: {
    size: String, // 控件大小
    config: Object, // 控件的相关配置
    name: String,
    value: [Object, String, Array],
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      机构是否保留:this.$i18ns("机构是否保留"),
      机构关系代码:this.$i18ns("机构关系代码"),
      机构名称:this.$i18ns("机构名称"),
      机构号:this.$i18ns("机构号"),

      formData: {
        branch_id: "", //机构号
        branch_name: "", //机构名称
        brch_relation_code: "", //机构关系代码
        branch_reserve_flag: "", //机构是否保留
      },
      dialogVisible: false,
      rules: {
        brch_relation_code: [{ required: true, message: "请选择机构关系代码" }],
        branch_reserve_flag: [{ required: true, message: "请选择机构是否保留" }],
      },
      reserveFlagList:[], // 机构是否保留标识
      relationCodeList:[], // 机构关系代码标识
      toRequestUrl: "/views/ismt/ct/branch/branch-user-manager.json",
    };
  },
  mounted() {
    //初始化数据字典
    this.getDictList("MS_E_YESORNO", "reserveFlagList"); // 初始化机构是否保留数据字典
    this.getDictList("CT_E_BRANCH_RELATION", "relationCodeList"); // 初始化机构关系代码数据字典
    this.formData = this.cParentParams;
  },
  created() {},
  methods: {
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType],
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    closeForm() {
      this.$dialog.close();
    },
    submitForm() {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          if (this.toRequestUrl == "") {
            this.$message({
              type: "error",
              message: "跳转路径:" + this.toRequestUrl + "失败！",
            });
          }
          const option = {
            toRequest: {
              url: this.toRequestUrl,
              method: "get",
              params: this.formData,
            },
            width: "75%",
            title: "组织机构调整",
            that: this,
          };

          this.$publicFn.openNavTab(
            this.toRequestUrl,
            "织机构调整",
            this.formData,
            this
          );
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
.footer-submit {
  text-align: center;
}
</style>
