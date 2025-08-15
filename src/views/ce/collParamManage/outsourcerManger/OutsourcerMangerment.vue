<template>
  <div>
      <el-form :model="uploadForm" :rules="uploadRules" ref="uploadForm" label-width="200px" class="custom-common--form">
        <el-row>
            <el-col :span="8">
                <el-form-item class="require-asterisk" label="外包商采购评审结果:" prop="upload_jg">
                  <outsourcer-upld ref="upload_jgProp" :uploadFileList="uploadForm.upload_jg" :uploadDisabled="false" @changeFile="upload_jgChange" class="jgStyle"></outsourcer-upld>
                </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-button size="small" type="success" @click="download">模板导出</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item class="require-asterisk" label="采购结果评审通知书:" prop="upload_tzs">
                    <outsourcer-upld ref="upload_tzsProp" :uploadFileList="uploadForm.upload_tzs" :uploadDisabled="false" @changeFile="upload_tzsChange" class="jgStyle"></outsourcer-upld>
                </el-form-item>    
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item class="require-asterisk" label="关联关系排查证明:" prop="upload_zm">
                    <outsourcer-upld ref="upload_zmProp" :uploadFileList="uploadForm.upload_zm" :uploadDisabled="false" @changeFile="upload_zmChange" class="jgStyle"></outsourcer-upld>
                </el-form-item>          
            </el-col>
        </el-row>
      </el-form>
      <div class="custom-common--footer">
        <el-button type="primary" size="small" @click="submit" plain>提交</el-button>
      </div>
  </div>
</template>
<script>
import OutsourcerUpld from "./OutsourcerUpld";
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "OutsourcerMangerment",
  components: {
    OutsourcerUpld,
  },
  data() {
    return {
      uploadForm: {
          upload_jg: "", //外包商采购结果评审
          upload_tzs: "",//采购结果评审通知书
          upload_zm: "",//关联关系排查证明
      },
    }
  },
  created() {
    this.initRule();
  },
  methods: {
    initRule(){
      this.uploadRules= {
          upload_jg:[{ validator: this.upload_jgValidate, trigger: 'change' }],
          upload_tzs:[{ validator: this.upload_tzsValidate, trigger: 'change' }],
          upload_zm:[{ validator: this.upload_zmValidate, trigger: 'change' }],
      }
    },
    submit() {
      this.$refs.uploadForm.validate(valid => {
        if (valid) {
          this.$confirm("是否确认提交申请?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            let params = {
              servicecode: "RLMSPLTS1002",
              upload_jg: this.uploadForm.upload_jg,
              upload_tzs: this.uploadForm.upload_tzs,
              upload_zm: this.uploadForm.upload_zm
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
              if (res && res.code === "200") {
                this.$message({
                  type: "success",
                  message: res.message
                })
              }
            }).catch(err => {
              console.error(err);
            })
          });
        }
      })
    },
    download(){
      let reqMap = {
        type: "WBSCGPSJG",
        servicecode: "PLMSKGTS0081",
        start: 1,
        length: 10,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
        if (res && res.code === "200") {
          let fileString = res.data[0].filebase64;
          let URL = this.dataUrlToBlob(fileString, 'xls');
          var a = document.createElement("a");
          a.download = '外包商采购评审结果模板.xls';
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
    dataUrlToBlob(data, prefix) {
      var bstr = window.atob(data);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: prefix });
    },
      /**
       * 添加文件回调
       * @param file 当前添加文件对象
       * @param fileList 已添加文件
       */
      upload_jgChange(val){
        this.uploadForm.upload_jg= val;
      },
      upload_tzsChange(val){this.uploadForm.upload_tzs= val;},
      upload_zmChange(val){this.uploadForm.upload_zm= val;},
      upload_jgValidate(value, rule, callback) {if (this.uploadForm.upload_jg.length === 0) {  return callback(new Error("上传外包商采购结果评审"));   }return callback();   },
      upload_tzsValidate(value, rule, callback) {if (this.uploadForm.upload_tzs.length === 0) {  return callback(new Error("上传采购结果评审通知书"));   }return callback();   },
      upload_zmValidate(value, rule, callback) {if (this.uploadForm.upload_zm.length === 0) {  return callback(new Error("上传关联关系排查证明"));   }return callback();   },
  }
}
</script>

<style lang="less" scoped>
    .custom-common--form {
    padding: 113px;
    .el-row .el-col {
      padding-right: 16px;
      .jgStyle {
        line-height:4px;
      }
    }
}
</style>