<template>
  <div>
    <div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="200px" :inline="true">
        <el-row>
          <el-col span="12">
            <el-form-item :label="$i18ns('合作项目模版')" prop="project_mould_name">
<!--              :placeholder="$i18ns('请选择模版')"-->
              <el-input

                suffix-icon="el-input__icon el-icon-search"
                v-model="ruleForm.project_mould_name"
                @click.native="openDialog"
                class="form-input"
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col span="12" v-show="false">
            <el-form-item :label="$i18ns('合作项目类型')" prop="part_project_type" span="12">
              <el-input
                placeholder=""
                v-model="ruleForm.part_project_type"
                disabled="true"
                class="form-input">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col span="12">
            <el-form-item :label="$i18ns('合作项目类型')" prop="part_proj_typename" span="12">
              <el-input
                placeholder=""
                v-model="ruleForm.part_proj_typename"
                disabled="true"
                class="form-input">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="$i18ns('合作项目模版id')" v-show="false" prop="project_template_no">
          <el-input
            :placeholder="$i18ns('请选择模版')"
            suffix-icon="el-input__icon el-icon-search"
            v-model="ruleForm.project_template_no"
          >
          </el-input>
        </el-form-item>
        <el-form-item :label="$i18ns('合作项目模版版本')" v-show="false" prop="project_template_version">
          <el-input
            :placeholder="$i18ns('合作项目模版版本')"
            v-model="ruleForm.project_template_version"
          >
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="ruleForm.part_project_type !=''">
      <el-divider></el-divider>
      <to-json
        toUrl="/views/pt/partnerProjrctManage/cor_project_baseinfo_add.json"
        :params="ruleForm">
      </to-json>
    </div>
    <div class="container-center">
      <el-button type="primary" @click="submitForm('ruleForm')" class="form-button">{{ $i18ns('启动流程') }}</el-button>
      <el-button @click="resetForm('ruleForm')" class="form-button">{{$i18ns('重置')}}</el-button>
    </div>
  </div>
</template>

<script>
import MyMessage from "pte-ui/utils/MyMessage";
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "corProjectAddFirst",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模版json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  watch: {
    "ruleForm.prod_type": function () {
      console.log(this.ruleForm.prod_type);
    }
  },
  data() {
    return {
      ruleForm: {
        project_mould_name: "",
        project_template_no: "",
        part_project_type: "",
        part_proj_typename: "",
        data_list_no: "",
        project_template_version: "",
        version: 1
      },
      tranType: "",
      projTypeDict: [],
      rules: {
        project_mould_name: [
          {required: true, message: this.$i18ns('请选择项目模版'), trigger: 'change'}
        ],
        project_template_no: [
          {required: true, message: this.$i18ns('合作项目模版编号为空'), trigger: 'change'}
        ],
        part_project_type: [
          {required: true, message: this.$i18ns('请选择合作项目类型'), trigger: 'change'}
        ]
      }
    }
  },
  created() {
    this.tranType = this.cParentParams.tranType;
    console.log("type", this.tranType);
    //初始化字典
    this.getDict("PT_E_PART_PROJECT_TYPE", "projTypeDict");
  },
  methods: {
    /**
     * 打开弹窗
     */
    openDialog() {
      const option = {
        toRequest: {
          url: "/views/pt/partnerProjrctManage/select_project_template.json",
          method: "get",
          params: {},
        },
        width: "50%",
        title: this.$i18ns('合作项目模版选择'),
        that: this,
      };
      this.$dataBus.bindCallBackMethod(this, this.bringBack, option);
      this.resetForm('ruleForm');
      this.$dialog.open(option);
    },
    bringBack(formItem, returnData) {
      // let data = returnData.selectedData || returnData;
      let data = returnData;

      this.ruleForm.project_mould_name = data["project_mould_name"];
      this.ruleForm.project_template_no = data["project_template_no"];
      this.ruleForm.part_project_type = data["part_project_type"];
      this.ruleForm.data_list_no = data["data_list_no"];
      this.ruleForm.project_template_version = data["version"];
      // this.$set(this.ruleForm, 'prod_type', data["prod_type"]);
      //字典渲染
      this.projTypeDict.forEach((item, index) => {
        if (item.dictId === data["part_project_type"]) {
          this.ruleForm.part_proj_typename = item.dictName;
          return false;
        }
      });
    },
    /**
     * 打开弹窗
     */
    openDialog1(data) {
      let params = {
        project_template_no: this.ruleForm.project_template_no,
        project_template_version: this.ruleForm.project_template_version,
        part_project_no: data.part_project_no,
        data_list_no: this.ruleForm.data_list_no,
        tranType: this.tranType,
        version: 1
      };
      console.log("d当前", params);
      this.$publicFn.openNavTab(
        //'@projectAddLayout',
        '/views/pt/pt_workbench/wait_todo/workbench_wait_todo_view.json',
        "合作项目签订",
        params,
        this
      );
    },
    /**
     * 获取下拉字典
     */
    /**
     * 获取字典
     */
    getDict(type, listkey) {
      let params = {
        dictType: type,
        dictKey: [type]
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listkey] = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 提交表单
     * @param formName
     */
    submitForm(formName) {
      let that = this;
      let formData = that.$dataBus.getCurrentFormData(that);
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.openDialog1();
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
      let params = formData;
      params.servicecode = 'pt0300';
      this.$dataBus.doAllValidator(that).then(res => {
        console.log("res", res);
        if (res === true) {
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
            if (res && res.code !== "200") {
              this.$message({
                type: "error",
                message: $i18ns('提交失败')
              });
            } else {
              //将生成产品返回数据传递
              this.openDialog1(formData);
            }
          }).catch(err => {
            console.error(err);
          });
        }
      }).catch(() => {
      });
    },
    /**
     * 重置表单
     * @param formName
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
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

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}

.container-toolbar {
  margin: 10px 0;
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

.container-center {
  margin: 20px 5px;
  padding: 20px 0;
  width: 100%;
  text-align: center;
  justify-content: center;
}

.form-input {
  width: 200px;
}

.form-button {
  width: 80px;
  margin: 0 10px;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}
</style>
