<template>
  <div>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="5">
          <template slot="title">
            <span><em></em>留案申请</span>
          </template>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="200px" class="custom-common--form">
            <el-row>
               <el-col :span="7">
                            <el-form-item label="留案类型" prop="caseType">
                                <el-select v-model="appForm.caseType" placeholder="请选择分案类型">
                                    <el-option
                                    v-for="(item, index) in applyStatusList"
                                    :key="index"
                                    :label="item.dictId+'-'+item.dictName"
                                    :value="item.dictId"
                                    :disabled="false"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item class="require-asterisk" label="留案清单" prop="laqd">
                  <application-retent-upload ref="laqdProp" :uploadFileList="appForm.laqd" :uploadDisabled="false"  @changeFile="laqdChange" :key="timer"></application-retent-upload>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-button size="small" type="primary" @click="download" :uploadDisabled="false">模板导出</el-button>
              </el-col>
              <el-col :span="10">
                <el-form-item label="其他材料" prop="qtcl">
                  <upload-file ref="qtclProp" :uploadFileList="appForm.qtcl" :uploadDisabled="false" @changeFile="qtclChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
          <el-col :span="12">
            <el-form-item  class="require-asterisk" :label="$i18ns('备注:')" prop="remark">
              <el-input type="textarea" v-model="appForm.remark" :disabled="false"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>提交</el-button>
      <el-button size="small"  @click="reset">{{$i18ns('取消')}}</el-button>
    </div>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import ApplicationRetentUpload from "./ApplicationRetentUpload";
  import UploadFile from "@/views/ce/components/UploadFile.vue";
  export default {
    name: "ApplicationRetentView",
    components: {
      UploadFile,
      ApplicationRetentUpload
    },
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对
    },
    data() {
      return {
        appForm:{
          caseType:"0",//留案类型
          laqd:[],//留案材料
          qtcl:[],//其他材料
          remark: "", // 备注
        },
        activeNames: ["5"],
        applyStatusList:[], //申请状态字典
      }
      
    },
    created() {
      this.getDictList("E_KEEP_CASE","applyStatusList");
      this.initRule();
      this.getAppInfo();
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
            }
            MyAxios.invokeAPI("/SUMP/rest/dict", "post", params).then(res => {
                if (res && res.code === "200") {
                this[listKey] = res.data;
                }
            }).catch(err => {
                console.error(err)
            })
        },
        download(){
        let reqMap = {
          type: "LASQ",
          servicecode: "PLMSKGTS0081",
          start: 1,
          length: 10,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
          if (res && res.code === "200") {
            let fileString = res.data[0].filebase64;
            let URL = this.dataUrlToBlob(fileString, 'xls');
            var a = document.createElement("a");
            a.download = '留案申请模板.xls';
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
      clearData(){
        this.appForm ={
          caseType:"0",//留案类型
          laqd:[],//留案清单
          qtcl:[],//附件
          remark: "", // 备注
        }
        this.$refs.laqdProp.clearFileList();
        this.$refs.qtclProp.clearFileList();
        this.$refs["appForm"].resetFields();
      },
      initRule(){
        this.appRules = {
            caseType: [{required: true,  message: "请选择类型"}],
            laqd:[{ validator: this.laqdValidate, trigger: 'change' }],
             remark: [{required: true,  message: "请输入备注"}],
        }
        },
    getAppInfo(){
        let params = {
          servicecode: "RLMSPLTS1065",
          appl_id: this.cParentParams.applid,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
                this.appForm.laqd=res.data.laqd,
                this.appForm.qtcl = res.data.qtcl,//附件
                this.appForm.remark = res.data.keepcases.remakes,  //备注
                this.appForm.caseType=res.data.keepcases.caseType,//留案类型
              this.timer = new Date().getTime();//更新timer，重新加载子组件
            }
          })
          .catch(err => {
            console.error(err);
          })
      },
      submit() {
        this.$refs.appForm.validate(valid => {
          if (valid) {
            this.$confirm("是否确认提交申请?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            }).then(() => {
              let params = {
                servicecode: "RLMSCPTS0038",
                applid: this.cParentParams.applid,
                laqd:this.appForm.laqd,//续约材料
                qtcl:this.appForm.qtcl,//附件
                remark:this.appForm.remark,  //备注
              }
              MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
                if (res && res.code === "200") {
                  this.$message({
                    type: "success",
                    message: res.message
                  })
                  this.$dialog.close();
                }
              }).catch(err => {
                console.error(err);
              })
            });
          }
        });
      },
      reset(){
        this.$confirm("是否确认取消?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.clearData();
          this.$dialog.close();
        })
      },
      /**
       * 添加文件回调
       * @param file 当前添加文件对象
       * @param fileList 已添加文件
       */
      laqdChange(val){this.appForm.laqd= val;},
      qtclChange(val){this.appForm.qtcl= val;},
      laqdValidate(value, rule, callback) {if (this.appForm.laqd.length === 0) {  return callback(new Error("请上传留案清单"));   }return callback();   },
      qtclValidate(value, rule, callback) {if (this.appForm.qtcl.length === 0) {  return callback(new Error("请上传其他材料"));   }return callback();   },
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
