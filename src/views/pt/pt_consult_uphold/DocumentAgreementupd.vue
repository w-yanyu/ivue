<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="custom-common--form">
      <el-row>
        <el-col :span="12">
          <el-form-item label="合作商名称" prop="partner_name" class="upload-item">
            <el-input v-model="ruleForm.partner_name" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="合作方协议编号" prop="part_protocol_no" class="upload-item">
            <el-input v-model="ruleForm.part_protocol_no" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="文件清单" prop="fileList" class="upload-item custom-item--required">
            <el-upload
             class="upload-demo"
             :on-change="handleChange"
             :on-remove="handleRemove"
             multiple
             :limit="5"
             :file-list="fileList"
             :auto-upload="false">
              <el-button size="small" type="primary" v-show="fileList.length < 5">{{$i18ns('点击上传')}}</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="custom-common--footer">
        <el-button type="primary" size="small" @click="submit"  plain>{{$i18ns('保存')}}</el-button>
        <!--<el-button size="small" @click="cancel">{{$i18ns('取消')}}</el-button>-->
      </div>
    </el-form>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import * as _ from "lodash";

export default {
  name: "DocumentAgreement",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模版json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  created() {
    this.ruleForm.partner_name = this.cParentParams.partner_name;
    this.ruleForm.part_no = this.cParentParams.part_no;
    this.ruleForm.part_protocol_no = this.cParentParams.part_protocol_no;
    this.fileInit();
  },
  data() {
    return {
      ruleForm: {
        partner_name: "", // 合作商名称
        part_no: "", // 合作商编号
        part_protocol_no: "", // 合作方协议编号
        fileList: [], // 文件清单
      },
      fileList: [], // 文件清单
      rules: {
        partner_name: [
          { required: true, message: "请输入合作商名称" }
        ],
        part_protocol_no: [
          { required: true, message: "请输入合作方协议编号" }
        ],
        fileList: [
          { validator: this.fileListValidate, trigger: 'change' }
        ],
      },
      fileList: [], // 文件对象
    }
  },
  methods: {
    /**
     * 文件清单初始化
     */
    fileInit() {
      let params = {
        part_protocol_no: this.cParentParams.part_protocol_no,
        servicecode: "pt0011",
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {

          res.data.forEach(item => {
            this.fileList.push({ name: item.original_file_name, status: "success" });
            this.ruleForm.fileList.push({ file_name: item.file_name, file_path: item.file_path, original_file_name: item.original_file_name });
          });

        }
      }).catch(err => {
        console.error(err);
      })
    },
    /**
     * 文件上传自定义校验事件
     */
    fileListValidate(rule, value, callback) {
      if (this.fileList.length === 0) {
        return callback(new Error("请上传文件清单"));
      }
      return callback();
    },
    /**
     * 文件清单change回调
     * @param file 当前文件对象
     * @param fileList 文件清单
     */
    handleChange(file, fileList) {
      let formData = new FormData();
      formData.append("file", file.raw);
      formData.append("org_id", userInfo.org_id);
      formData.append("path", "PD");
      MyAxios.invokeAPI("/SUMP/icmcall/file", "post", formData).then(res => {
        if (res && res.code === "200") {
          file.status = "success";
          this.fileList.push(file);
          this.ruleForm.fileList.push({ file_name: res.data.filename, file_path: res.data.path, original_file_name: file.name });
          this.$refs.ruleForm.validateField("fileList");
        }
      }).catch(err => {
        console.error(err)
      })
    },
    /**
     * 文件清单移除回调
     * @param file 当前文件对象
     * @param fileList 文件清单
     */
    handleRemove(file, fileList) {
      this.fileList.forEach((item, index) => {
        if (item.uid === file.uid) {
          this.ruleForm.fileList.splice(index, 1);
          this.fileList.splice(index, 1);
        }
      });
      this.$refs.ruleForm.validateField("fileList");
    },
    /**
     * 表单提交
     */
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            servicecode: "pt0013",
            part_no: this.ruleForm.part_no,
            partner_name: this.ruleForm.partner_name,
            part_protocol_no: this.ruleForm.part_protocol_no,
            list01: _.cloneDeep(this.ruleForm.fileList)

          }
          let that = this
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
            if (res && res.code === "200") {
              this.$message({
                type: "success",
                message: "操作成功",


              })
              this.$emit("update", {});
              that.$dataBus.doCallBack(that, res)
            }
          }).catch(err => {
            console.error(err)
          })
        } else {
          this.$message({
            type: "warning",
            message: "校验不通过"
          })
        }
      })
    },
    cancel() {
      function getDialogScope(self) {
        if (self.$parent.$el.className === "el-dialog__wrapper") {
          return self.$parent;
        } else {
          return getDialogScope(self.$parent);
        }
      }
      let self = getDialogScope(this);
      self.$parent.editDialogVisible = false;
    }

  }
}
</script>
<style lang="less" scoped>
/deep/.custom-common--form {
  .upload-item {
    .el-form-item__content {
      width: calc(100% - 120px);
    }
  }
}

</style>
