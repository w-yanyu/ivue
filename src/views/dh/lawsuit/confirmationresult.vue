<template>
<div>
  <el-collapse v-model="activeNames">
    <el-collapse-item name="1">
      <template slot="title">
        <span><em></em>基本信息</span>
      </template>
        <el-form ref="basicForm" :rules="basicRules" :model="basicForm" label-width="200px" class="custom-common--form">
              <el-row>
                <el-col :span="8">
                  <el-form-item class="require-asterisk"  label="借据号" prop="lncf_no">
                    <el-input v-model="basicForm.lncf_no" @blur="lncfnoBlur"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="客户名称" prop="cust_nm">
                    <el-input v-model="basicForm.cust_nm" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="证件号码" prop="cert_id">
                    <el-input v-model="basicForm.cert_id" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="手机号码" prop="mobile_phone">
                    <el-input v-model="basicForm.mobile_phone" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="产品名称" prop="prod_name">
                    <el-input v-model="basicForm.prod_name" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="区域中心" prop="regional_center">
                    <el-input v-model="basicForm.regional_center" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="贷款形态" prop="loan_form">
                    <el-select v-model="basicForm.loan_form" :disabled="true" >
                    <el-option v-for="item in loanStatusList" :key="item.dictId" :label="item.dictName" :value="item.dictId"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="账龄" prop="function_cd">
                    <el-input v-model="basicForm.function_cd" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否联合贷" prop="isUL">
                    <el-input v-model="basicForm.isUL" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="联合贷公司名称" prop="ULNM">
                    <el-input v-model="basicForm.ULNM" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="当前委案机构" prop="oa_org_id">
                    <el-input v-model="basicForm.oa_org_id" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
    </el-collapse-item>
    <el-collapse-item name="2">
        <template slot="title">
        <span><em></em>申请信息</span>
      </template>
       <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="200px" class="custom-common--form">
           <el-row>
             <el-col :span="8">
                  <el-form-item class="require-asterisk" label="终结执行案号:" prop="final_execut_id">
                    <el-input v-model="appForm.final_execut_id"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item class="require-asterisk" label="终结执行裁定书落款日期:" prop="close_date">
                    <el-date-picker v-model="appForm.close_date" value-format="yyyyMMdd"></el-date-picker>
                  </el-form-item>
                </el-col>  
           </el-row>
           <el-row>
               <el-col :span="8">
                    <el-form-item class="require-asterisk" label="终结执行裁定书上传:" prop="fileList">
                        <upload-file-view ref="uploadProp" :uploadFileList="appForm.fileList" :uploadDisabled="false" @changeFile="changeUploadFile"></upload-file-view>
                    </el-form-item>
                </el-col>
           </el-row>
           <el-row>
               <el-col :span="8">
                <el-form-item :label="$i18ns('备注')">
                  <el-input type="textarea" :autosize="{minRows:2, maxRows: 5}" placeholder="请输入备注" v-model="appForm.remark"></el-input>
                </el-form-item>
              </el-col>
           </el-row>
       </el-form>
    </el-collapse-item>
  </el-collapse>
  <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>提交</el-button>
  </div>
  <div class="container-centent">
     <el-collapse v-model="activeNames">
         <el-collapse-item name="1">
      <template slot="title">
        <span><em></em>执行信息列表</span>
      </template>
      <div class="container-centent--table">
            <el-table ref="multipleTable" :data="tableData" :border="true" style="width: 100%" stripe>
                <el-table-column label="申请单号" prop="apply_id" show-overflow-tooltip></el-table-column>
                <el-table-column label="承办机构名称" prop="undertake_org_nm" show-overflow-tooltip></el-table-column>
                <el-table-column label="受理机构名称" prop="accept_org_nm" show-overflow-tooltip></el-table-column>
                <el-table-column label="执行案号" prop="final_execut_id"  show-overflow-tooltip></el-table-column>
                <el-table-column label="执行受理时间" prop="execut_accept_time"  show-overflow-tooltip></el-table-column>
                <el-table-column :label="$i18ns('申请人')" prop="apply_nm" show-overflow-tooltip></el-table-column>
                <el-table-column :label="$i18ns('申请时间')" prop="apply_time" show-overflow-tooltip></el-table-column>
                <el-table-column label="审批状态" prop="approval_status" show-overflow-tooltip></el-table-column>
            </el-table>
        </div>
         </el-collapse-item>
     </el-collapse> 
  </div>
</div>
</template>


<script>
import MyAxios from "pte-ui/utils/MyAxios";
import UploadFileView from "@/views/other/loanPostManager/loanPostComponents/UploadFileView.vue";

export default {
    name: "companywriteoffapply",
    components: {
      UploadFileView,
    },
    data() {
      return {
        basicForm: { // 基础信息表单对象
          lncf_no: "",//借据号
          cust_nm: "",//客户姓名
          cert_id: "",//证件号码
          mobile_phone: "",//手机号
          regional_center:"",//区域中心
          loan_form:"",//贷款形态
          function_cd:"",//账龄
          oa_org_id:""//当前委外机构
        },
        appForm: {
          fileList:[],//附件
          remark:""//备注
        },
        fileList:[],
        basicRules : {
          lncf_no: [{ required: true, message: "请输入借据号" }]
        },
        appRules : {
          fileList:[{ validator: this.fileListValidate, trigger: 'change' }],
        },
        loanStatusList:[]
      }
    },
    created() {
      this.getDictList("E_CLSSST", "loanStatusList"); // 初始化贷款形态数据字典
    },

    methods: {
        /**
     * 附件校验
     * @param value 表单当前值
     * @param rule 校验规则
     * @param callback 回调方法
     */
     fileListValidate(value, rule, callback) {
       if (this.appForm.fileList.length === 0) {
         return callback(new Error("请上传附件材料"));
       }
       return callback();
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

    getCustomerInfo(){
      let params = {
        servicecode: "pl2202",
        lncf_no: this.basicForm.lncf_no,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then(res => {
        if (res && res.code === "200" && res.data) {
          this.basicForm = res.data.caseInfo;
        }
      })
      .catch(err => {
        this.compareCustomerInfo="";
        console.error(err);
      })
    },

    submit() {
      this.$refs.basicForm.validate(valid => {
        if (valid) {
          this.$refs.appForm.validate(valid => {
            if (valid) {
              this.$confirm("是否确认提交申请?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }).then(() => {
                let params = {
                  servicecode: "pl2201",
                  lncf_no: this.basicForm.lncf_no,//借据号
                  cust_nm: this.basicForm.cust_nm , //客户姓名
                  regional_center:this.basicForm.regional_center, // 区域中心
                  cert_id:this.basicForm.cert_id , // 证件号码
                  final_execut_id:this.basicForm.final_execut_id , // 终结执行案号
                  close_date:this.appForm.close_date , // 落款日期                 
                  fileList:this.appForm.fileList,  //附件列表
                  remark:this.appForm.remark,  //备注
                  apply_time:this.getNowDate(),//申请时间
                  apply_nm:JSON.parse(localStorage.user_info).userName,//申请人
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
        }
      });
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
      this.$refs["basicForm"].resetFields();
      this.$refs["appForm"].resetFields();
      this.appForm.fileList= [];
      this.appForm.remark= "";
      this.fileList=[];
      this.compareCustomerInfo="";
      this.$refs.uploadProp.clearFileList();
    },

    lncfnoBlur(){
      if(this.basicForm.lncf_no==="" || this.compareCustomerInfo===this.basicForm.lncf_no){
        return false;
      }
      console.log(this.basicForm.lncf_no);
      this.compareCustomerInfo=this.basicForm.lncfno;
      this.getCustomerInfo();

    },
    /**
     * 添加文件回调
     * @param file 当前添加文件对象
     * @param fileList 已添加文件
     */
    changeUploadFile(val){
      this.appForm.fileList = val;  //附件列表
    },
      /**
       * 数字格式化成金额
       * @param  金额
       * @param 小数点后面有几位 (四舍五入到指定的位数)
       *
       */
      nubFormat(s, n) {
        n = n > 0 && n <= 20 ? n : 2;
        s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = s.split(".")[0].split("").reverse(),
          r = s.split(".")[1];
        var t = "";
        for (var i = 0; i < l.length; i++) {
          t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "" : ""); //加分隔符
        }
        return (t.split("").reverse().join("") +"." +r);
      },
      /**
       * 获取当前时间
       */
      getNowDate(){
          var now = new Date();
          var year = now.getFullYear();
          var month = now.getMonth()+1;
          var da = now.getDate();
          if(month >= 1 && month <= 9){
            month = "0"+(now.getMonth()+1).toString();
          }
          if(da>=1 && da <= 9){
            da = "0"+now.getDate();
          }
          var currentDate = year+month+da;
          return currentDate;
      }
    },
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