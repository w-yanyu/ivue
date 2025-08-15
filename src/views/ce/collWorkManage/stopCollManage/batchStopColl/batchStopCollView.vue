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
                <el-form-item class="require-asterisk" label="停催清单" prop="fileList">
                  <upload-file ref="fileListProp" :uploadFileList="appForm.fileList" :uploadDisabled="true" @changeFile="fileListChange" :key="timer"></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item class="require-asterisk" label="停催来源 " prop="source">
                  <el-select v-model="appForm.source" :disabled="true">
                    <el-option v-for="item in sourceList" :key="item.dictId" :label="item.dictName" :value="item.dictId"/>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$i18ns('备注:')" prop="remark">
                  <el-input type="textarea" v-model="appForm.remark" :disabled="true"></el-input>
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
  </div>
</template>

<script>
  import MyAxios from "pte-ui/utils/MyAxios";
  import UploadFile from "@/views/ce/components/UploadFile.vue";
  import BatchDataCheckList from "../batchDataCheckList";
  export default {
    name: "batchStopCollView",
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
          source:"",//停催来源
          fileList:[],//停催清单
          remark: "", // 备注
        },
        sourceList:[],
        activeNames: ["1","2"],
        timer:"",
      }
    },
    created() {
      this.getDictList("E_STOP_SOURCETYPE", "sourceList"); // 停催来源
      this.initRule();
      this.getAppInfo();
    },

    methods: {
      initRule(){
        this.appRules = {
          source: [{required: true,  message: "请输入停催来源"}],
          fileList:[{ validator: this.fileListValidate, trigger: 'change' }],
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
