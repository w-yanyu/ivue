<template>
  <div>
    <div class="creditapp-basic">
      <el-form ref="stopDeductBasicForm" :rules="stopDeductBasicRules" :model="stopDeductBasicForm" label-width="200px" class="custom-common--form">
        <el-row>
            <el-col :span="12">
                <el-form-item label="借据号" prop="lncfno">
                <el-input v-model="stopDeductBasicForm.lncfno" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="证件号码" prop="cardno">
                <el-input v-model="stopDeductBasicForm.cardno" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="手机号码" prop="phoneno">
                <el-input v-model="stopDeductBasicForm.phoneno" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="客户姓名" prop="custna">
                <el-input v-model="stopDeductBasicForm.custna" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="产品名称" prop="prodcd">
                <el-input v-model="stopDeductBasicForm.prodna" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="贷款形态">
                    <el-select v-model="stopDeductBasicForm.clssst" :disabled="true" placeholder=" ">
                    <el-option
                        v-for="(item, index) in loanStatusList"
                        :key="index"
                        :label="item.dictName"
                        :value="item.dictId"
                    ></el-option>
                    </el-select>
                </el-form-item>
                </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="贷款账户状态">
                <el-select v-model="stopDeductBasicForm.acctst" :disabled="true" placeholder=" ">
                    <el-option
                        v-for="(item, index) in accountLoanStatusList"
                        :key="index"
                        :label="item.dictName"
                        :value="item.dictId"
                    ></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="现贷余额" prop="lnhhxbl">
                <el-input v-model="stopDeductBasicForm.lnhhxbl" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="还款日" prop="jzdate">
                  <el-input v-model="stopDeductBasicForm.jzdate" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="creditapp-detail">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
            <span><em></em>申请信息</span>
          </template>
          <el-form ref="stopDeductForm" :rules="stopDeductRules" :model="stopDeductForm" label-width="200px" class="custom-common--form">
            <el-row>
                <!--<el-col :span="12">
                    <el-form-item label="停批起始时间" prop="stopBatchStart">
                        <el-date-picker
                            v-model="stopDeductForm.stopBatchStart"
                            type="date"
                            placeholder="请选择停批起始时间"
                            value-format="yyyyMMdd"
                            format = "yyyyMMdd"
                            :disabled="true">
                        </el-date-picker>
                    </el-form-item>
                </el-col>-->
                <el-col :span="12">
                    <el-form-item label="停批截止时间" prop="stopBatchEnd">
                        <el-date-picker
                            v-model="stopDeductForm.stopBatchEnd"
                            type="date"
                            placeholder="请选择停批截止时间"
                            value-format="yyyyMMdd"
                            format = "yyyyMMdd"
                            :disabled="true">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item  label="附件上传" prop="fileList">
                        <upload-file-view v-if="showComponent" :uploadFileList="stopDeductForm.fileList" :uploadDisabled="true"></upload-file-view>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$i18ns('备注')" prop="remark">
                  <el-input type="textarea" :autosize="{minRows:2, maxRows: 5}" placeholder="请输入备注" v-model="stopDeductForm.remark" :disabled="true"></el-input>
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
import MyAxios from "pte-ui/utils/MyAxios";
import UploadFileView from "../UploadFileView";

export const stopDeductBasicRules = {
  lncfno: [{ required: true, message: "请输入借据号" }],
}
export const stopDeductRules = {
  //stopBatchStart:[{ required: true, message: "请输入停批起始时间" }],
  stopBatchEnd:[{ required: true, message: "请输入停批截止时间" }],
  remark:[{ required: true, message: "请输入备注" }],
}

export default {
    name: "StopDeductView",
    props: {
        cMeta: Object, // 布局相关数据
        cParentMeta: Object, // 父页面模板json数据
        cParentScope: Object, // 父页面每块区域业务数据
        cParentParams: Object, // 父页面自定义参数与内置参数
    },
    components: {
      UploadFileView,
    },
    data() {
      return {
        stopDeductBasicForm: { // 基础信息表单对象
          lncfno: "",      
          custno: "",
          custna: "",
          phoneno: "",
          cardno: "",
          idtype: "",
          acctbl: "",
          prodcd:"",
          prodna:"",
          ovdays:"",
          brchno:"",
          brchna:"",
          clssst:"",
          acctst:"",
          lnwhxbl:"",
          lnhhxbl:"",
          jzdate:"",
        },
        stopDeductForm:{
          stopBatchStart: "",
          stopBatchEnd:"",
          fileList:[],
          remark:"",
        },
        stopDeductBasicRules,
        stopDeductRules,
        showComponent:true,
        currentFileList:[],
        activeNames: ["1", "2"]
      }
    },
    created() {
      this.getDictList("E_ACCTST", "accountLoanStatusList"); // 初始化贷款账户状态数据字典
      this.getDictList("E_CLSSST", "loanStatusList"); // 化贷款形态数据字典

      this.getCreditApplyInfo();
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
    getCreditApplyInfo(){
        var vm = this;
        let params = {
            servicecode: "PLMSKGTS0077",
            applid: this.cParentParams.applid,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
            if (res && res.code === "200" && res.data) {
                vm.stopDeductBasicForm.lncfno = res.data.lncfno ;    
                vm.stopDeductBasicForm.custno=res.data.custno;
                vm.stopDeductBasicForm.custna=res.data.custna;
                vm.stopDeductBasicForm.phoneno=res.data.phoneno;
                vm.stopDeductBasicForm.cardno=res.data.cardno;
                vm.stopDeductBasicForm.idtype=res.data.idtype;
                vm.stopDeductBasicForm.prodcd=res.data.prodcd;
                vm.stopDeductBasicForm.prodna=res.data.prodna;
                vm.stopDeductBasicForm.clssst=res.data.clssst;
                vm.stopDeductBasicForm.acctst=res.data.acctst;
                vm.stopDeductBasicForm.lnhhxbl=res.data.lnhhxbl;
                vm.stopDeductBasicForm.ovdays=res.data.ovdays;
                vm.stopDeductBasicForm.jzdate=res.data.jzdate;
                vm.stopDeductForm.stopBatchStart=res.data.stopBatchStart;
                vm.stopDeductForm.stopBatchEnd=res.data.stopBatchEnd;
                vm.stopDeductForm.remark=res.data.remark;
                vm.stopDeductForm.fileList = res.data.fileList;
                this.showComponent=false;
                this.$nextTick(()=>{
                  this.showComponent=true;
                })
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
      vm.currentFileList.forEach((item, key) => {
        if (item.uid === file.uid) {
          index = key;
          return false;
        }
      });          
      var params = {};
      params.path = vm.stopDeductForm.fileList[index].filePath;
      if(params.path === "") {
        vm.$message({
          type: "warning",
          message: "该附件未上传"
        })
      }else {
        MyAxios.invokeAPI("/SUMP/icmcall/download", "post", params)
        .then(res => {
          var filename =  vm.stopDeductForm.fileList[index].fileName;
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
  .creditapp-basic,.creditapp-detail {
    padding: 16px 40px 0 12px;
  }
  .creditapp-detail {
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
