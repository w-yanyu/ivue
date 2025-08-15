<template>
  <div>
    <div class="batchapp-detail">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>申请信息</span>
          </template>
          <el-form ref="batchCreditForm" :rules="batchCreditRules" :model="batchCreditForm" label-width="200px" class="custom-common--form">
            <el-row>
                <el-col :span="12">
                    <el-form-item  label="附件上传" prop="fileList">
                      <el-upload
                       :on-change="batchCreditFileChange"
                       :on-remove="batchCreditFileRemove"
                       :on-preview = "downLoadFile"
                       :limit="1"
                       :file-list="fileList"
                       :auto-upload="false"
                      >
                        <el-button size="small" type="primary">{{$i18ns('选择')}}文件</el-button>
                      </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-button size="small" type="primary" @click="downloadTemplate">模板下载</el-button>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="申请原因描述" prop="reason">
                  <el-input type="textarea" :autosize="{minRows:2, maxRows: 5}" placeholder="请输入申请原因" v-model="batchCreditForm.reason"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>提交</el-button>
      <el-button size="small">{{$i18ns('取消')}}</el-button>
    </div>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";

const batchCreditRules = {
  reason:[{ required: true, message: "请输入申请原因" }],
  fileList:[],
};
export default {
  name: "BatchCreditApply",
  data() {
    return {
      batchCreditForm: {
        reason: "",
        fileList:[],
      },
      fileList:[],
      batchCreditRules,
      activeNames: ["1", "2"]
    }
  },
  created() {
    this.batchCreditRules.fileList.push({ validator: this.batchCreditFileValidate, trigger: 'blur' });
  },
  methods: {
    /**
     * 证明材料表单校验
     * @param value 表单当前值
     * @param rule 校验规则
     * @param callback 回调方法
     */
    batchCreditFileValidate(value, rule, callback) {
      if (this.batchCreditForm.fileList.length === 0) {
        return callback(new Error("请上传附件材料"));
      }
      return callback();
    },
    submit() {
      this.$refs.batchCreditForm.validate(valid => {
        if (valid) {
          this.$confirm("是否确认提交申请?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            let params = {
              servicecode: "PLMSKGTS0045",
              reason:this.batchCreditForm.reason,   //申请原因
              fileList:this.batchCreditForm.fileList,  //附件列表
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then(res => {
              if (res && res.code === "200") {
                this.$message({
                  type: "success",
                  message: res.message
                })
                this.clearData();
              }
            })
            .catch(err => {
              console.error(err);
            })
          })
        } else {
          this.$message({
            type: "warning",
            message: "校验不通过"
          })
        }
      })
    },
    reset(){
      this.$confirm("是否确认重置申请内容?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.clearData();
      })
    },
    clearData(){
      this.$refs["batchCreditForm"].resetFields();
      this.batchCreditForm.reason = "";   //认定原因
      this.batchCreditForm.fileList = [];  //附件列表
      this.fileList=[];
    },
    /**
     * 添加文件回调
     * @param file 当前添加文件对象
     * @param fileList 已添加文件
     */
    batchCreditFileChange(file, fileList) {
      this.fileList = fileList;
      const isLt8M = file.size / 1024 / 1024 < 20;
      if (!isLt8M) {
        this.fileList.splice(fileList.indexOf(file), 1);
        this.$message({
          type: "warning",
          message: "凭证文件大于20M"
        })
      } else {
        let formData = new FormData();
        formData.append("file", file.raw);
      formData.append("org_id", userInfo.org_id);
        formData.append("path", "PD");
        MyAxios.invokeAPI("/SUMP/icmcall/file", "post", formData)
        .then(res => {
          if (res && res.code === "200" && res.data && res.data.path ) {
            file.status = "success";
            let param={
              filePath:res.data.path,
              fileName:file.name,
            }
            this.batchCreditForm.fileList.push(param);
            this.$refs['batchCreditForm'].validateField('fileList');
          } else {
            this.fileList.splice(fileList.indexOf(file), 1);
            this.$message({
              type: 'error',
              message: '上传失败！'
            })
          }
        })
        .catch(err => {
          console.error(err);
        });
      }
    },
    /**
     * 移除文件回调
     * @param file 当前移除文件对象
     * @param fileList 已添加文件
     */
    batchCreditFileRemove(file, fileList) {
      let index = null;
      this.fileList.forEach((item, key) => {
        if (item.uid === file.uid) {
          index = key;
          return false;
        }
      });
      this.batchCreditForm.fileList.splice(index, 1);
      this.fileList.splice(index, 1);
      if (this.fileList.length === 0) {
        this.$refs.batchCreditForm.validateField("fileList");
      }
    },
    downloadTemplate(){
      let reqMap = {
        type: "PLRHZX",
        servicecode: "PLMSKGTS0081",
        start: 1,
        length: 10,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
        if (res && res.code === "200") {
          let fileString = res.data[0].filebase64;
          let URL = this.dataUrlToBlob(fileString, 'xls');
          var a = document.createElement("a");
          a.download = '批量人行征信申请模板.xls';
          a.style.display = "none";
          a.href = window.URL.createObjectURL(URL);
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      }).catch(err => {
        console.error(err);
      });
    },
    /**
     * 下载上传附件
     */
    downLoadFile(file,fileList) {
      var vm = this;
      let index = null;
      vm.fileList.forEach((item, key) => {
        if (item.uid === file.uid) {
          index = key;
          return false;
        }
      });
      var params = {};
      params.path = vm.batchCreditForm.fileList[index].filePath;
      if(params.path === "") {
        vm.$message({
          type: "warning",
          message: "该附件未上传"
        })
      }else {
        MyAxios.invokeAPI("/SUMP/icmcall/download", "post", params)
        .then(res => {
          var filename =  vm.batchCreditForm.fileList[index].fileName;
          let URL = vm.dataUrlToBlob(res.data.fileString, res.data.prefix);
          var a = document.createElement("a");
          a.download = filename;
          a.style.display = "none";
          a.href = window.URL.createObjectURL(URL);
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
        .catch(err => {
          console.error(err);
        });
      }
    },
    dataUrlToBlob(data, prefix) {
      var bstr = window.atob(data);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: prefix });
    }
  }
}
</script>
<style lang="less" scoped>
  .hriskapp-basic,.batchapp-detail {
    padding: 16px 40px 0 12px;
  }
  .batchapp-detail {
    .el-form {
      padding: 0;
    }
    /deep/.el-collapse {
      .el-collapse-item__content {
        padding: 20px 80px 20px 20px;
      }
    }
  }
  .attachmentTab {
    min-height: 68.667px;
  }
</style>
