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
                        :on-preview = "downLoadFile"
                        :limit="1"
                        :file-list="fileList"
                        :auto-upload="false"
                        :disabled="true">
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="申请原因描述">
                  <el-input type="textarea" :autosize="{minRows:2, maxRows: 5}" placeholder="请输入备注" v-model="batchCreditForm.reason" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>

  </div>
</template>

<script>
import {
  validateHandle,
} from "../../loanPostConstant/loanPostConstant";
import MyAxios from "pte-ui/utils/MyAxios";

export const batchCreditRules = {
  reason: [{ required: true, message: "申请原因描述" }],
};

export default {
    name: "BatchCreditApplyView",
    props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object, // 父页面的scope数据对
    },
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
      this.getCreditApplyInfo();
    },
    
    methods: {


    /**
     * 获取申请信息
     */
    getCreditApplyInfo(){
      var vm = this;
      let params = {
        servicecode: "PLMSKGTS0046",
        applid: this.cParentParams.applid,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then(res => {
        if (res && res.code === "200" && res.data) {
          vm.batchCreditForm.reason=res.data.reason;
          vm.batchCreditForm.fileList = res.data.fileList;
          if(res.data.fileList.length>0){
            res.data.fileList.forEach(function(item,index){
              var file = new Object();
              file.name = item.fileName;
              file.url = item.filePath;
              vm.fileList.push(file);
            })
          }
        }
      })
      .catch(err => {
        console.error(err);
      })
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
    },




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
