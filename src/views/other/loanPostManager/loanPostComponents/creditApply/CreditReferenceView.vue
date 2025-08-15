<template>
  <div>
    <div class="creditapp-basic">
      <el-form ref="creditBasicForm" :rules="creditBasicRules" :model="creditBasicForm" label-width="200px" class="custom-common--form">
        <el-row>
            <el-col :span="12">
                <el-form-item label="借据号" prop="lncfno">
                <el-input v-model="creditBasicForm.lncfno" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="证件号码" prop="cardno">
                <el-input v-model="creditBasicForm.cardno" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="手机号码" prop="phoneno">
                <el-input v-model="creditBasicForm.phoneno" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="客户姓名" prop="custna">
                <el-input v-model="creditBasicForm.custna" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="产品名称" prop="prodcd">
                <el-input v-model="creditBasicForm.prodna" :disabled="true"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="贷款形态">
                    <el-select v-model="creditBasicForm.clssst" :disabled="true" placeholder=" ">
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
                <el-form-item label="现贷余额" prop="prodcd">
                <el-input v-model="creditBasicForm.lnhhxbl" :disabled="true"></el-input>
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
          <el-form ref="creditApplyForm" :rules="creditApplyRules" :model="creditApplyForm" label-width="200px" class="custom-common--form">
            <el-row>
              <el-col :span="24">
                <el-form-item label="申请人行征信原因" prop="reason">
                  <el-input type="textarea" :autosize="{minRows:2, maxRows: 5}" placeholder="请输入原因" v-model="creditApplyForm.reason" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="21">
                <el-form-item label="附件上传类型" prop="atttype">
                  <el-select
                    v-model="creditApplyForm.atttype"
                    placeholder="请选择"
                    :disabled="true">
                    <el-option
                      v-for="item in creditFileTypeList"
                      :key="item.value"
                      :label="item.dictName"
                      :value="item.dictId"
                      :disabled="item.disabled">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item  label="附件上传" prop="fileList">
                        <upload-file-view v-if="showComponent" :uploadFileList="creditApplyForm.fileList" :uploadDisabled="true"></upload-file-view>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$i18ns('备注')" prop="remark">
                  <el-input type="textarea" :autosize="{minRows:2, maxRows: 5}" placeholder="请输入备注" v-model="creditApplyForm.remark" :disabled="true"></el-input>
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

export const creditBasicRules = {
  lncfno: [{ required: true, message: "请输入借据号" }],
}

export const creditApplyRules = {
  reason:[{ required: true, message: "请输入申请原因" }],
}

export default {
    name: "CreditReferenceView",
    components: {
      UploadFileView,
    },
    props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object, // 父页面的scope数据对
    },
    data() {
      return {
        creditBasicForm: { // 基础信息表单对象
          lncfno: "",      
          custno: "",
          custna: "",
          phoneno: "",
          cardno: "",
          idtype: "",
          acctbl: "",
          prodcd:"",
          prodna:"",
          clssst:"",
          acctst:"",
          lnhhxbl:"",
        },
        creditApplyForm:{
          reason: "",
          atttype:"",
          fileList:[],
          remark:"",
        },
        creditBasicRules,
        creditApplyRules,
        creditFileTypeList:[],
        activeNames: ["1", "2"],
        showComponent:true,
      }
    },
    created() {
      this.getDictList("E_ACCTST", "accountLoanStatusList"); // 初始化贷款账户状态数据字典
      this.getDictList("E_CLSSST", "loanStatusList"); // 化贷款形态数据字典
      this.getDictList("E_CREDITAPPTYPE", "creditFileTypeList"); // 初始化人行征信申请附件上传类型
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
        servicecode: "PLMSKGTS0042",
        applid: (vm.cParentParams.applid ? vm.cParentParams.applid : vm.$dataBus.getCurrentcParams(vm).data_applid),
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then(res => {
        if (res && res.code === "200" && res.data) {
          vm.creditBasicForm.lncfno = res.data.lncfno ;    
          vm.creditBasicForm.custno=res.data.custno;
          vm.creditBasicForm.custna=res.data.custna;
          vm.creditBasicForm.phoneno=res.data.phoneno;
          vm.creditBasicForm.cardno=res.data.cardno;
          vm.creditBasicForm.idtype=res.data.idtype;
          vm.creditBasicForm.prodcd=res.data.prodcd;
          vm.creditBasicForm.prodna=res.data.prodna;
          vm.creditBasicForm.clssst=res.data.clssst;
          vm.creditBasicForm.acctst=res.data.acctst;
          vm.creditBasicForm.lnhhxbl=res.data.lnhhxbl;
          vm.creditApplyForm.atttype=res.data.atttype;
          vm.creditApplyForm.reason=res.data.reason;
          vm.creditApplyForm.remark=res.data.remark;
          vm.creditApplyForm.fileList = res.data.fileList;
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
