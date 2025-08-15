<template>
    <div>
        <div class="collAccount-basic">
            <el-form ref="collAccountForm" :model="collAccountDetail" label-width="150px" class="custom-common--form">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="区域中心"  prop="area_center_name" >
                            <el-input v-model="collAccountDetail.area_center_name" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="机构类型"  prop="case_acceptance" >
                            <el-input v-model="collAccountDetail.case_acceptance_name" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="机构名称"  prop="acceptance_name" >
                            <el-input v-model="collAccountDetail.acceptance_name" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="申请类型"  prop="oper_type" >
                            <el-input v-model="collAccountDetail.oper_type" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item :label="$i18ns('备注')"  prop="memo" >
                            <el-input type="textarea" resize="none" v-model="collAccountDetail.memo" autosize="true" :readonly="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="附件" prop="fj">
                            <upload-file ref="fjProp" :uploadFileList="collAccountDetail.fj" :uploadDisabled="true" @changeFile="fjChange" :key="timer"></upload-file>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="collAccount-detail">
            <el-table ref="collAccountTable" :data="collAccountData" :border="true" stripe >
                <el-table-column label="收款账户类型" prop="acct_type" align="center" :formatter="formatProduceData" show-overflow-tooltip width="150%">
                </el-table-column>
                <el-table-column label="收款账户名称" prop="acct_name" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="收款账户账号" prop="acct_no" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="开户行" prop="bank_name" align="center" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="开户行行号" prop="bank_no" align="center" show-overflow-tooltip>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import _ from "lodash";
import UploadFile from "@/views/fs/components/UploadFile.vue";
import { validateHandle } from '../../../../other/loanPostManager/loanPostConstant/loanPostConstant';

export default {
    name: "PreviewAcceptOrgManage",
    props: {
        cMeta: Object, // 布局相关数据
        cParentMeta: Object, // 父页面模板json数据
        cParentScope: Object, // 父页面每块区域业务数据
        cParentParams: Object, // 父页面自定义参数与内置参数
    },
    components: {
      UploadFile,
    },
    data(){
        return{
            collAccountDetail:{
                area_center:"",  //区域中心
                area_center_name:"", //区域中心名称
                case_acceptance:"", //机构类型
                case_acceptance_name:"", //机构类型名称
                org_id:"", //机构编号
                acceptance_name: "", //机构名称
                oper_type: "", //操作类型
                memo: "", //备注
                fj:[], //附件
            },
            collAccountData: [], //收款账户信息数据
            acceptOrgList:[],  //机构类型字典
            applyTypeList:[], //申请类型字典
            secondBranchList:[], //区域中心
        }
    },
    created() {
        this.getDictList("ACCEPT_ORG_TYPE","acceptOrgList"); //机构类型
        this.getDictList("E_ACC_TYPE","accountTypeList"); //收款账户类型
        this.getDictList("E_APPLYTYPE","applyTypeList"); //申请类型
        this.getSecondBranch(); //区域中心
        
    },
    methods: {
        /**
        * 获取字典
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
        getSecondBranch(){
            let reqMap = {
                servicecode: "RLMSPLTS1068", 
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                if (res && res.code === "200") {
                    this.secondBranchList = res.data;
                    this.getCollAccountData();
                }
            }).catch(err => {
                console.error(err);
            });
        },

        /**
        * 表格字典值转换
        */
        formatProduceData(row,column){
            let name = row[column.property];
            let data = row[column.property];
            this.accountTypeList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
        },

       /**
       * 获取字典名称
       */
        getDictName(dictId,dictList){
            let dictType = {};
            dictType = dictList.find(item=>{return item.dictId===dictId;})
            return dictType.dictName;
        },

        /**
         * 区域中心
         */
        formatTypeDataInput(data){
          let name = "";
          this.secondBranchList.forEach(function(item,index){
              if(data == item.branchNo){
              name = item.brachName;
              }
          })
          return name;
        },
        
        /**
        * 获取收款账户列表数据
        */
        getCollAccountData() {
            let reqMap = {
                applid: this.cParentParams.applid,
                servicecode: "RLMSPLTS1388",
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                if (res && res.code === "200" && res.data !== null) {
                    this.collAccountData = [];
                    res.data.payfeesAccountTemp.forEach(item =>{
                        this.collAccountData.push(item);
                    });
                    this.collAccountDetail.area_center_name = this.formatTypeDataInput(res.data.payfeesOrgTemp.area_center);
                    this.collAccountDetail.case_acceptance_name = this.getDictName(res.data.payfeesOrgTemp.case_acceptance,this.acceptOrgList);
                    this.collAccountDetail.acceptance_name = res.data.payfeesOrgTemp.acceptance_name;
                    this.collAccountDetail.oper_type = this.getDictName(res.data.payfeesOrgTemp.apply_type,this.applyTypeList);
                    this.collAccountDetail.memo = res.data.payfeesOrgTemp.remark;
                    res.data.fileList.forEach((element) => {
                    this.collAccountDetail.fj.push({
                        fileName: element.fileName,
                        filePath: element.filePath,
                        buctetKey: element.buctetKey,
                        bucket: element.bucket,
                        status: "success",
                    });
                    });
                    this.timer = new Date().getTime(); //更新timer，重新加载子组件
                }
            }).catch(err => {
                console.error(err);
            });
        },
               /**
       * 添加文件回调
       * @param file 当前添加文件对象
       * @param fileList 已添加文件
       */
        fjChange(val){this.collAccountDetail.fj= val;},
    }
}
</script>

<style lang="less" scoped>
.collAccount-basic {
    padding: 16px 20px 0 0px;
    border-bottom: 1px solid #e3e8f5;
}
.collAccount-detail{
      margin-top: 10px;
      bottom:60px;
      padding-bottom: 10px;
}
</style>
