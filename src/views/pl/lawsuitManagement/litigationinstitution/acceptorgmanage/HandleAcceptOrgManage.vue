<template>
    <div>
        <div class="collAccount-basic">
            <el-form ref="collAccountForm" :model="collAccountDetail" :rules="rules" label-width="150px" class="custom-common--form">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="区域中心"  prop="area_center" >
                            <el-input v-model="collAccountDetail.area_center_name" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="机构类型"  prop="case_acceptance" >
                            <el-select v-if="deal_type == 1 || deal_type == 2" v-model="collAccountDetail.case_acceptance" placeholder="请选择机构类型" clearable>
                                <el-option
                                v-for="(item, index) in acceptOrgList"
                                :key="index"
                                :label="item.dictName"
                                :value="item.dictId"
                                ></el-option>
                            </el-select>
                            <el-input v-else v-model="collAccountDetail.case_acceptance_name" :disabled="enableEdit"></el-input>
                        </el-form-item>
                        <el-form-item v-show="false" label="机构编号"  prop="org_id" >
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="机构名称"  prop="acceptance_name" >
                            <el-input v-model="collAccountDetail.acceptance_name" :disabled="enableEdit"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="申请类型"  prop="oper_type" >
                            <el-input v-model="collAccountDetail.oper_type" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item :label="$i18ns('备注')"  prop="memo" >
                            <el-input type="textarea" v-if="deal_type == 1 || deal_type == 2" v-model="collAccountDetail.memo" autosize="true" maxlength="200"></el-input>
                            <el-input v-else v-model="collAccountDetail.memo" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="附件" prop="fj">
                            <upload-file ref="fjProp" :uploadFileList="collAccountDetail.fj" :uploadDisabled="false" @changeFile="fjChange" :key="timer"></upload-file>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="collAccount-toolbar" v-if= "deal_type == 1 || deal_type == 2" >
            <el-button type="primary" @click="addAccLast()" plain>新增</el-button>
        </div>
        <div class="collAccount-detail">
            <el-table ref="collAccountTable" :data="collAccountData" :border="true" stripe >
                <el-table-column label="收款账户类型" prop="acct_type" align="center" show-overflow-tooltip width="150%">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.acct_type" v-if="scope.row.astatus"  placeholder="请选择账户类型">
                            <el-option  v-for="(item, index) in accountTypeList" :key="index" :label="item.dictName" :value="item.dictId"></el-option>
                        </el-select>
                        <span v-else>{{scope.row.acct_type_zn}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="收款账户名称" prop="acct_name" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.acct_name" v-if="scope.row.astatus"></el-input>
                        <span v-else>{{scope.row.acct_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="收款账户账号" prop="acct_no" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.acct_no" onkeyup="this.value=this.value.replace(/[^\d]/g,'')" maxlength='19' v-if="scope.row.astatus"></el-input>
                        <span v-else>{{scope.row.acct_no}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="开户行" prop="bank_name" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.bank_name" v-if="scope.row.astatus"></el-input>
                        <span v-else>{{scope.row.bank_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="开户行行号" prop="bank_no" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.bank_no" onkeyup="this.value=this.value.replace(/[^\d]/g,'')" maxlength='19' v-if="scope.row.astatus"></el-input>
                        <span v-else>{{scope.row.bank_no}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="240" v-if= "deal_type != 3">
                    <template slot-scope="scope">
                        <el-button type="text" icon="el-icon-edit" @click="scope.row.astatus=true" :disabled="collOpt" >修改</el-button>
                        <el-button type="text" icon="el-icon-check" @click="saveAccountRow(scope.$index,scope.row)" :disabled="collOpt">{{$i18ns('保存')}}</el-button>
                        <el-button type="text" icon="el-icon-delete" @click="deleteAccountRow(scope.$index,scope.row)" :disabled="collOpt">{{$i18ns('删除')}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="collAccount-footer"  v-if= "deal_type != 3">
            <span slot="footer">
                <el-button size="small" @click="saveAllRow">全部保存</el-button>
                <el-button size="small" @click="deleteAllRow">全部删除</el-button>
            </span>
        </div>
        <div class="button-footer"  v-if= "deal_type != 3">
            <span slot="footer">
                <el-button type="primary" size="small" @click="submit" plain>{{$i18ns('保存')}}</el-button>
            </span>
        </div>
    </div>
</template>


<script>
import MyAxios from "pte-ui/utils/MyAxios";
import SuitUtils from "@/views/pl/lawsuitManagement/fscommonComponets/SuitUtils";
import _ from "lodash";
import UploadFile from "@/views/fs/components/UploadFile.vue";
import { validateHandle } from '../../../../other/loanPostManager/loanPostConstant/loanPostConstant';

export default {
    name: "HandleAcceptOrgManage",
    components: {
      UploadFile,
    },
    props: {
        cMeta: Object, // 布局相关数据
        cParentMeta: Object, // 父页面模板json数据
        cParentScope: Object, // 父页面每块区域业务数据
        cParentParams: Object, // 父页面自定义参数与内置参数
    },
    data(){
        return{
            isHandleChange:false, //经办岗页面是否有改动
            unWatch:[], //监听对象
            tableData: [], //机构数据
            deal_type: 0,
            title:"", //弹框标题
            enableEdit:false,
            collOpt:false,
            acceptorgForm:{
                area_center:"",  //区域中心
                case_acceptance:"", //机构类型
                acceptance_name:"", //机构名称
            },
            collAccountDetail:{
                applid:"", //申请编号
                area_center:"",  //区域中心
                area_center_name:"", //区域中心名称
                case_acceptance:"", //机构类型
                case_acceptance_name:"", //机构类型名称
                acceptance_type:"", //机构状态
                org_id:"", //机构编号
                acceptance_name: "", //机构名称
                oper_type: "", //操作类型
                memo: "", //备注
                fj:[],//附件
            },
            collAccountData: [], //收款账户信息数据
            acceptOrgList:[],  //机构类型字典
            branchStatusList:[], //机构状态字典
            applyTypeList:[], //申请类型字典
            secondBranchList:[], //区域中心
            rules:{ 
                area_center: [{required:true, message:'请选择区域中心',trigger:'blur'}],
                case_acceptance: [{required:true, message:'请选择机构类型',trigger:'blur'}],
                acceptance_name: [{required:true, message:'请输入机构名称',trigger:'blur'}],
                memo: [{required:true, message:'请输入备注',trigger:'blur'}],
            },
        }
    },
    created() {
      // 清除上次遗留监听事件
        this.unWatch.forEach(item => {
          item();
        });
        SuitUtils.$off("resave");
        let self = this;
      // 经办岗接受工作台提交时的传参，并向工作台传入页面改动与否的参数
        SuitUtils.$on("resave", msg => {
          if(msg == self.$options.name){
            if(self.isHandleChange){
              SuitUtils.$emit("toWorkbench","change");
            }else{
              SuitUtils.$emit("toWorkbench","nochange");
            }
          }
        });
        this.getDictList("ACCEPT_ORG_TYPE","acceptOrgList");
        this.getDictList("E_ACC_TYPE","accountTypeList");
        this.getDictList("E_BRANCH_STATE","branchStatusList");
        this.getDictList("E_APPLYTYPE","applyTypeList");
        this.getSecondBranch();
    },
    methods: {
        /**
         * 申请监听
         */
        addWatch(){
          this.unWatch.push(this.$watch("collAccountDetail",function(){this.isHandleChange = true;},{deep:true}));
          this.unWatch.push(this.$watch("collAccountData",function(){this.isHandleChange = true;},{deep:true}));
        },
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
            this.acceptOrgList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
        },

        /**
        * 新增行数据(收款账户详情)
        */
        addAccLast(){
            let addAccLastData = {
            acct_type:"",
            acct_type_zn:"",
            acct_name:"",
            acct_no:"",
            bank_name:"",
            bank_no:"",
            astatus:true,
            };
            this.collAccountData.push(addAccLastData);
            this.$message({
            type: "success",
            message: "添加成功！"
            })
        },

      /**
       * 保存行数据(收款账户信息)
       */
      saveAccountRow(index,row){
        if(!row.acct_type || row.acct_type.length===0){
          this.$message({type: "warning", message: "请选择收款账户类型！"});
          return;
        }
        if(!row.acct_name || row.acct_name.length===0){
          this.$message({type: "warning", message: "请输收款账户名称！"});
          return;
        }
        if(!row.acct_no || row.acct_no.length===0){
          this.$message({type: "warning", message: "请输收款账户账号！"});
          return;
        }
        if(!row.bank_name || row.bank_name.length===0){
          this.$message({type: "warning", message: "请输开户行！"});
          return;
        }
        if(!row.bank_no || row.bank_no.length===0){
          this.$message({type: "warning", message: "请输开户行行号！"});
          return;
        }
        for (let i=0; i < this.accountTypeList.length; i++){
            let accoutType = this.accountTypeList[i];
            if (row.acct_type == accoutType.dictId){
                row.acct_type_zn = accoutType.dictName;
            }
        }
        this.collAccountData[index] = row;
        this.collAccountData[index].astatus = false;
        this.$message({
          type: "success",
          message: "保存成功！"
        })
      },

      /**
       * 保存所有数据
       */
      saveAllRow(){
        if(this.collAccountData.length == 0){
            this.$message({type: "warning", message: "收款账户信息未录入!"});
            return false;
        }
        let saveStatus = true;
        for (let i = 0;i < this.collAccountData.length;i++) {
          let item = this.collAccountData[i];
          if(!item.acct_type || item.acct_type.length===0){
            this,saveStatus = false;
            break;
          }
          if(!item.acct_name || item.acct_name.length===0){
            this,saveStatus = false;
            break;
          }
          if(!item.acct_no || item.acct_no.length===0){
            this,saveStatus = false;
            break;
          }
          if(!item.bank_name || item.bank_name.length===0){
            this,saveStatus = false;
            break;
          }
          if(!item.bank_no || item.bank_no.length===0){
            this,saveStatus = false;
            break;
          }
        }
        if(saveStatus){
          this.collAccountData.forEach((row, index) =>  {
            for (let i=0; i < this.accountTypeList.length; i++){
                let accoutType = this.accountTypeList[i];
                if (row.acct_type == accoutType.dictId){
                    row.acct_type_zn = accoutType.dictName;
                }
            }
            this.collAccountData[index] = row;
            this.collAccountData[index].astatus = false;
          })
          this.$message({
            type: "success",
            message: "保存成功！"
          })
        }else{
          this.$message({type: "error", message: "信息未录入完整,保存失败!"});
        }
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
       * 删除行数据(收款账户信息)
       */
        deleteAccountRow(index,row){
            this.collAccountData.splice(index,1);
            this.$message({
            type: "success",
            message: "删除成功！"
            })
        },

      /**
       * 删除全部数据行
       */
        deleteAllRow(){
            this.$confirm("是否删除所有数据?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
            }).then(() => {
            this.collAccountData = [];
            this.$message({
                type: "success",
                message: "删除成功！"
            })
            })
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
                        item.astatus = false;
                        for (let i=0; i < this.accountTypeList.length; i++){
                            let accoutType = this.accountTypeList[i];
                            if (item.acct_type == accoutType.dictId){
                                item.acct_type_zn = accoutType.dictName;
                            }
                        }
                        this.collAccountData.push(item);
                    });
                    this.deal_type = res.data.payfeesOrgTemp.apply_type;
                    if(this.deal_type ==3){
                      this.enableEdit = true;
                    }else{
                      this.enableEdit = false;
                    }
                    this.collAccountDetail.applid = reqMap.applid;
                    this.collAccountDetail.area_center = res.data.payfeesOrgTemp.area_center;
                    this.collAccountDetail.area_center_name = this.formatTypeDataInput(res.data.payfeesOrgTemp.area_center);
                    this.collAccountDetail.case_acceptance = res.data.payfeesOrgTemp.case_acceptance;
                    this.collAccountDetail.org_id = res.data.payfeesOrgTemp.org_id;
                    this.collAccountDetail.case_acceptance_name = this.getDictName(res.data.payfeesOrgTemp.case_acceptance,this.acceptOrgList);
                    this.collAccountDetail.acceptance_name = res.data.payfeesOrgTemp.acceptance_name;
                    this.collAccountDetail.acceptance_type = res.data.payfeesOrgTemp.acceptance_type;
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
                    this.addWatch();
                }
            }).catch(err => {
                console.error(err);
            });
        },

        /**
         * 提交
         */
        submit(){
          this.$refs.collAccountForm.validate(valid => {
              if(valid){
                let existModify = false;
                if(this.collAccountData.length != 0){
                    this.collAccountData.forEach(item=>{
                        if(item.astatus==true){
                        existModify = true;
                        }
                    })
                }
                if(existModify){
                    this.$message({type: "warning", message: "存在未保存的规则修改，请保存后提交!"});
                    return;
                }else{
                    this.requestRlms();
                }
              }else{
                  return false;
              }
          })
        },
        requestRlms(){
          let acceptance_status = this.deal_type == "3" ? "0" : "1";
          let params2 = {
            servicecode: "RLMSPLTS1389",
            applid: this.collAccountDetail.applid,
            apply_type: this.deal_type,
            org_id: this.collAccountDetail.org_id,
            area_center: this.collAccountDetail.area_center,
            acceptance_name: this.collAccountDetail.acceptance_name,
            case_acceptance: this.collAccountDetail.case_acceptance,
            acceptance_type: acceptance_status,
            remark:this.collAccountDetail.memo,
            fileList:this.collAccountDetail.fj,
            payfeesAccountTemp: this.collAccountData,
          }
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params2).then(response => {
            if (response && response.code === "200" ) {
              this.isHandleChange = false; //提交后，变回初始值
              this.$message({type: "success",message: response.message});
            }
          }).catch(err1 => {
            console.error(err1);
          })
        },

        /**
         * 机构类型
         */
        formatTypeDatat(row,column){
          let name = row[column.property];
          let data = row[column.property];
          this.acceptOrgList.forEach(function(item,index){
            if(data == item.dictId){
              name = item.dictName;
            }
          })
          return name;
        },
        /**
         * 机构类型
         */
        formatTypeDatatInput(data){
          let name = "";
          this.acceptOrgList.forEach(function(item,index){
            if(data == item.dictId){
              name = item.dictName;
            }
          })
          return name;
        },
        /**
         * 机构状态
         */
        formatTypeDatas(row,column){
          let name = row[column.property];
          let data = row[column.property];
          this.branchStatusList.forEach(function(item,index){
            if(data == item.dictId){
              name = item.dictName;
            }
          })
          return name;
        },

        /**
         * 区域中心
         */
        formatTypeData(row,column){
          let name = row[column.property];
          let data = row[column.property];
          this.secondBranchList.forEach(function(item,index){
            if(data == item.branchNo){
              name = item.brachName;
            }
          })
          return name;
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
         * 申请类型
         */
        formatTypeDataaInput(data){
          let name = "";
          this.applyTypeList.forEach(function(item,index){
            if(data == item.dictId){
              name = item.dictName;
            }
          })
          return name;
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
.collAccount-toolbar{
      padding: 16px 40px 0 12px;
      border-bottom: 0px solid #e3e8f5;
}

.collAccount-detail{
      margin-top: 10px;
      bottom:60px;
      padding-bottom: 10px;
}
.collAccount-footer{
  padding-top:5px;
  padding-right:10px;
  padding-bottom:10px;
  direction:rtl;
}
.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}
</style>
