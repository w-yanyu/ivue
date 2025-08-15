<template>
  <div>
      <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
       <template slot="title">
            <span><em></em>销账列表</span>
          </template>
          <div style="padding:16px;">           
            <el-button type="primary" @click="showApply = true" size="small">新增</el-button>
          <el-button type="primary" @click="del()">{{$i18ns('删除')}}</el-button>
          </div>
          <div class="container-centent--table">
            <el-table ref="multipleTable" :data="tableData" @selection-change="handleSelection">
                <el-table-column type="selection" :selectable="selectable"></el-table-column>
                <el-table-column label="缴费申请单号" prop="appl_id" show-overflow-tooltip></el-table-column>
                <el-table-column label="借据号" prop="lncfno" show-overflow-tooltip></el-table-column>
                <el-table-column label="客户名称" prop="cust_nm" show-overflow-tooltip></el-table-column>
                <el-table-column label="证件号码" prop="idtfno"  show-overflow-tooltip></el-table-column>
                <el-table-column label="诉讼案件号" prop="caseno"  show-overflow-tooltip></el-table-column>
                <el-table-column label="执行案件号" prop="execaseno" show-overflow-tooltip></el-table-column>
                <el-table-column label="费用类型" prop="fee_type" :formatter="formatFeeType" show-overflow-tooltip></el-table-column>
                <el-table-column label="付款金额" prop="pay_amount" show-overflow-tooltip></el-table-column>
                <el-table-column label="公司承担费用" prop="compnay_balance" show-overflow-tooltip></el-table-column>
                <el-table-column label="未处理金额" prop="compnay_balance" show-overflow-tooltip></el-table-column>
                <el-table-column label="本次处理金额" prop="compnay_balance" show-overflow-tooltip></el-table-column>
            </el-table>
          <Apply-info 
        @applySelect="applySelect" 
        @close="applyClose"
        v-if="showApply"/>
        </div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template slot="title">
            <span><em></em>报销凭证</span>
          </template>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="200px" class="custom-common--form">
            <el-row>
                <el-col :span="12">
                    <el-form-item class="require-asterisk" label="附件上传" prop="fileList">
                        <upload-file-view ref="uploadProp" :uploadFileList="appForm.fileList" :uploadDisabled="false" @changeFile="changeUploadFile"></upload-file-view>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
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
      <el-button size="small" @click="reset">{{$i18ns('重置')}}</el-button>
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import UploadFileView from "@/views/other/loanPostManager/loanPostComponents/UploadFileView.vue";
import ApplyInfo from "./applyInfo";
import _ from "lodash";

export default {
    name: "companywriteoffapply",
    components: {
      UploadFileView,
      ApplyInfo
    },
    data() {
      return {
        appForm: {
          fileList:[],//附件
          remark:""//备注
        },
        showApply: false,
        fileList:[],
        basicRules : {
          lncfno: [{ required: true, message: "请输入借据号" }]
        },
        appRules : {
          fileList:[{ validator: this.fileListValidate, trigger: 'change' }],
        },
        tableData: [],//选择带回的诉讼费用信息
        selectList:[],
        activeNames: ["1", "2"]
      }
    },
    /**
     * 初始化数据
     */
    created() {
      this.getDictList("E_FEE_TYPE", "feeTypeList");//费用类型枚举
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
    /**
     * 选择事件触发
     */
     handleSelection(val) {
      this.selectList = val;
    },
    /**
     * 删除
     */
    del(){
     if(this.selectList.length == 0){
      this.$message({
          type: "warning",
          message: "请选择至少一条需要删除的缴费申请!"
      })
     }
     this.selectList.forEach(item=>{
       var index = this.tableData.findIndex(function(items){
        return items.appl_id == item.appl_id;
       });
      this.tableData.splice(index,1);
     })
    },
    /**
     * 提交
     */
    submit() {
      //判断是否选择需要缴费的申请信息
       if(this.selectList.length == 0){
      this.$message({
          type: "warning",
          message: "请选择至少一条需要申请的缴费申请!"
      })
     };
          this.$refs.appForm.validate(valid => {
            if (valid) {
              this.$confirm("是否确认提交申请?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }).then(() => {
                let params = {
                  servicecode: "pl2204",
                  legalFeeList:this.selectList,
                  fileList:this.appForm.fileList,  //附件列表
                  remark:this.appForm.remark,  //备注
                }
                MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
                  if (res && res.code === "200") {
                    this.$message({
                      type: "success",
                      message: res.message
                    })
                    this.del();
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
      this.$confirm("是否确认重置申请内容?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.clearData();
      })
    },
    /**
     * 转化枚举类型
     */
    formatFeeType(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.feeTypeList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    /**
     * 关闭申请页面
     */
    applyClose() {
      this.showApply = false;
    },

    /**
     * 公账选择带回回调
     */
    applySelect(tableList) {
      tableList.forEach(item => {
          this.tableData.push(item);
      });
      this.applyClose();
    },

    clearData(){
      this.appForm.fileList= [];
      this.appForm.remark= "";
      this.fileList=[];
      this.tableData=[];
      this.$refs.uploadProp.clearFileList();
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
