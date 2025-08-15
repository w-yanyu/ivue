<template>
  <div>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>批量停催申请</span>
          </template>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="解除清单" prop="fileList">
                  <upload-file ref="fileListProp" :uploadFileList="appForm.fileList" :uploadDisabled="false" @changeFile="fileListChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$i18ns('备注:')" class="require-asterisk" prop="remark">
                  <el-input type="textarea" v-model="appForm.remark"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <span><em></em>批量文件数据校验结果</span>
          </template>
          <div>
            <batch-data-check-list :applId="appForm.applid" :applyType="appForm.applytype" :hiddenFlag="true" :key="timer"></batch-data-check-list>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>{{$i18ns('保存')}}</el-button>
      <el-button size="small"  @click="reset">清空</el-button>
    </div>
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import UploadFile from "@/views/ce/components/UploadFile.vue";
  import BatchDataCheckList from "../batchDataCheckList";
  export default {
    name: "batchRelieveStopUpdate",
    components: {
      UploadFile,
      BatchDataCheckList,
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
          fileList:[],//解除清单
          remark: "", // 备注
        },
        activeNames: ["1","2"],
        timer:"",
      }
    },
    created() {
      this.initRule();
      this.getAppInfo();
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

      getAppInfo(){
        let params = {
          servicecode: "RLMSPLTS1036",
          applid: this.cParentParams.applid,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
          .then(res => {
            if (res && res.code === "200" && res.data) {
              const response = res.data.applyInfo;
              this.appForm = response;
              this.appForm.fileList=res.data.fileList;
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
                servicecode: "RLMSPLTS1038",
                applid: this.cParentParams.applid,
                fileList:this.appForm.fileList,//解除清单
                remark:this.appForm.remark,  //备注
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
