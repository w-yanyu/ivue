<template>
  <div>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>批量解除停催申请</span>
          </template>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="解除清单" prop="fileList">
                  <upload-file ref="fileListProp" :uploadFileList="appForm.fileList" :uploadDisabled="false" @changeFile="fileListChange" :maxLength="1"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-button size="small" type="success" @click="download">模板导出</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" :label="$i18ns('备注:')" prop="remark">
                  <el-input type="textarea" v-model="appForm.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>提交</el-button>
      <el-button size="small"  @click="reset">清空</el-button>
    </div>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import UploadFile from "@/views/ce/components/UploadFile.vue";
  export default {
    name: "batchRelieveStopApply",
    components: {
      UploadFile,
    },
    data() {
      return {
        appForm:{
          fileList:[],//解除清单
          remark: "", // 备注
        },
        activeNames: ["1"]
      }
    },
    created() {
      this.initRule();
    },

    methods: {
      initRule(){
        this.appRules = {
          fileList:[{ validator: this.fileListValidate, trigger: 'change' }],
          remark: [{required: true,  message: "请输入备注"}],
        }
      },
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

      download(){
        let reqMap = {
          type: "PLJCTC",
          servicecode: "PLMSKGTS0081",
          start: 1,
          length: 10,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
          if (res && res.code === "200") {
            let fileString = res.data[0].filebase64;
            let URL = this.dataUrlToBlob(fileString, 'xls');
            var a = document.createElement("a");
            a.download = '批量解除停催模板.xls';
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


      submit() {
        this.$refs.appForm.validate(valid => {
          if (valid) {

            if(!this.appForm.fileList[0].fileName.endsWith(".xls")){
              this.$message({
                type: "error",
                message: "文件格式不正确"
              });
              return;
            }

            this.$confirm("是否确认提交申请?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              let params = {
                servicecode: "RLMSPLTS1037",
                fileList:this.appForm.fileList,//解除清单
                remark:this.appForm.remark,  //备注
              }
              MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
                if (res && res.code === "200") {
                  this.$message({
                    type: "success",
                    message: res.message
                  })
                  this.clearData();
                }
              }).catch(err => {
                console.error(err);
              })
            });
          }
        });
      },
      reset(){
        this.$confirm("是否确认清空?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.clearData();
        })
      },

      clearData(){
        this.appForm ={
          fileList:[],//解除清单
          remark: "", // 备注
        };
        this.$refs["appForm"].resetFields();
        this.$refs.fileListProp.clearFileList();
      },

      /**
       * 添加文件回调
       * @param file 当前添加文件对象
       * @param fileList 已添加文件
       */
      fileListChange(val){this.appForm.fileList= val;},

      fileListValidate(value, rule, callback) {if (this.appForm.fileList.length === 0) {  return callback(new Error("请上传解除清单"));   }return callback();   }
    }
  }

</script>

<style lang="less" scoped>
  .custom-common--form {
    padding: 0;
    .el-row .el-col {
      padding-right: 16px;
    }
  }
</style>
