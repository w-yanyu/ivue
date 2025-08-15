<template>
    <div>
        <div class="container-content">
            <div class="container-content--search">
                <el-form :model="acceptorgForm" ref="acceptorgForm" label-width="150px" class="custom-common--form">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="机构号" prop="area_center">
                                <el-select v-model="acceptorgForm.area_center" placeholder="请选择机构号" :disabled="secondBranchList.length==1">
                                    <el-option
                                    v-for="(item, index) in secondBranchList"
                                    :key="index"
                                    :label="item.branchNo+'-'+item.brachName"
                                    :value="item.branchNo"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="机构类型" prop="case_acceptance">
                                <el-select v-model="acceptorgForm.case_acceptance" placeholder="请选择机构类型" clearable>
                                    <el-option
                                    v-for="(item, index) in acceptOrgList"
                                    :key="index"
                                    :label="item.dictName"
                                    :value="item.dictId"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="机构名称" prop="acceptance_name">
                                <el-input v-model="acceptorgForm.acceptance_name" class="input"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="button-footer">
                        <el-col :span="24">
                            <el-button type="primary" @click="search()">查询</el-button>
                            <el-button @click="reset">{{$i18ns('重置')}}</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div class="container-content--toolbar">
                <el-button type="primary" @click="addOrg()" plain>新增</el-button>
            </div>
            <div class="container-centent--table">
                <el-table ref="multipleTable" :data="tableData" :border="true" style="width: 98%;">
                    <el-table-column label="机构号"  prop="area_center"  align="center" show-overflow-tooltip :formatter="formatTypeData">
                    </el-table-column>
                    <el-table-column label="机构类型"  prop="case_acceptance"  align="center" show-overflow-tooltip :formatter="formatTypeDatat">
                    </el-table-column>
                    <el-table-column v-if="false" label="机构编号(隐藏)"  prop="org_id">
                    </el-table-column>
                    <el-table-column label="机构名称" prop="acceptance_name" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span>{{scope.row.acceptance_name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="机构状态" prop="acceptance_type" align="center" show-overflow-tooltip :formatter="formatTypeDatas">
                    </el-table-column>
                    <el-table-column label="操作" prop="deal_type"  align="center" show-overflow-tooltip>
                        <template slot-scope="scope" >
                            <el-button type="text" icon="el-icon-document"  @click="viewRow(scope.row)">{{$i18ns('查看')}}</el-button>
                            <el-button v-if= "scope.row.acceptance_type == 1 && scope.row.status == true" type="text" icon="el-icon-edit"  @click="updateRow(scope.row)">修改</el-button>
                            <el-button v-if= "scope.row.acceptance_type == 1 && scope.row.status == true" type="text" icon="el-icon-delete"  @click="deleteRow(scope.row)">{{$i18ns('删除')}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="container-content--pagination">
                <el-pagination v-if="tableData.length>0"
                @size-change="sizeChange"
                @current-change="currentChange"
                :current-page="currentPage"
                :page-sizes="[10,15,20]"
                :page-size="tableSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableTotal">
                </el-pagination>
            </div>
        </div>
        <el-dialog :title="title" :visible.sync="collAccountModelVisible" :show-close="true" :before-close="handleClose" width="1200px" :append-to-body="true">
            <div class="el-dialog-dev">
                <div class="collAccount-basic">
                    <el-form ref="collAccountForm" :model="collAccountDetail" :rules="rules" label-width="150px" class="custom-common--form">
                        <el-row>
                            <el-col :span="8">
                                <el-form-item label="机构号"  prop="area_center" >
                                    <el-input v-model="collAccountDetail.area_center_name" :disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="机构类型"  prop="case_acceptance" >
                                    <el-select v-if="deal_type == 1 || deal_type == 2" v-model="collAccountDetail.case_acceptance" placeholder="请选择机构类型" clearable :disabled="enableEdit">
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
                        <el-row v-if= "deal_type !== 4">
                            <el-col :span="8">
                                <el-form-item label="申请类型"  prop="oper_type" >
                                    <el-input v-model="collAccountDetail.oper_type" disabled="true"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="16">
                                <el-form-item :label="$i18ns('备注')"  prop="memo" >
                                    <el-input type="textarea" v-model="collAccountDetail.memo" autosize="true" maxlength="200"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row v-if= "deal_type !== 4">
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
                        <el-table-column v-if="false" label="机构编号(隐藏)"  prop="org_id">
                        </el-table-column>
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
                                <el-input v-model="scope.row.acct_no" oninput="value=value.replace(/[^\d]/g,'')" @blur="valueChangeA(scope.row,$event)" maxlength='19' v-if="scope.row.astatus"></el-input>
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
                                <el-input v-model="scope.row.bank_no" oninput="value=value.replace(/[^\d]/g,'')" @blur="valueChangeB(scope.row,$event)" maxlength='19' v-if="scope.row.astatus"></el-input>
                                <span v-else>{{scope.row.bank_no}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" align="center" width="240" v-if= "deal_type !== 3 && deal_type !== 4">
                            <template slot-scope="scope">
                                <el-button type="text" icon="el-icon-edit" @click="scope.row.astatus=true" :disabled="collOpt" >修改</el-button>
                                <el-button type="text" icon="el-icon-check" @click="saveAccountRow(scope.$index,scope.row)" :disabled="collOpt">{{$i18ns('保存')}}</el-button>
                                <el-button type="text" icon="el-icon-delete" @click="deleteAccountRow(scope.$index,scope.row)" :disabled="collOpt">{{$i18ns('删除')}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="collAccount-footer" v-if= "deal_type !== 4">
                    <span slot="footer">
                        <el-button v-if= "deal_type !== 3 " size="small" @click="saveAllRow">全部保存</el-button>
                        <el-button v-if= "deal_type !== 3 " size="small" @click="deleteAllRow">全部删除</el-button>
                        <el-button size="small" @click="handleClose">{{$i18ns('取消')}}</el-button>
                        <el-button type="primary" size="small" @click="submit" plain>提交</el-button>
                    </span>
                </div>
            </div>
        </el-dialog>
    </div>
</template>


<script>
import MyAxios from "pte-ui/utils/MyAxios";
import _ from "lodash";
import UploadFile from "@/views/fs/components/UploadFile.vue";
import { validateHandle } from '../../../../other/loanPostManager/loanPostConstant/loanPostConstant';

export default {
    name: "AcceptOrgManage",
    components: {
      UploadFile,
    },
    props: {
        cMeta: Object, // 布局相关数据
        cParentMeta: Object, // 父页面模板json数据
        cParentScope: Object, // 父页面每块区域业务数据
        cParentParams: Object, // 父页面自定义参数与内置参数
    },
    watch:{
        collAccountModelVisible: function (val,oldVal){
            if (this.$refs.collAccountForm != undefined){
                this.$refs.collAccountForm.resetFields();
            }
        }
    },
    data(){
        return{
            tableData: [], //机构数据
            deal_type: 0,
            org_id:"", //机构编号
            title:"", //弹框标题
            enableEdit:false,
            collOpt:false,
            acceptorgForm:{
                area_center:"",  //区域中心
                case_acceptance:"", //机构类型
                acceptance_name:"", //机构名称
            },
            collAccountDetail:{
                area_center:"",  //区域中心
                area_center_name:"", //区域中心名称
                case_acceptance:"", //机构类型
                case_acceptance_name:"", //机构类型名称
                org_id:"", //机构编号
                acceptance_name: "", //机构名称
                oper_type: "", //操作类型
                memo: "", //备注
                fj:[],//附件
            },
            collAccountData: [], //收款账户信息数据
            currentPage: 1,
            tableTotal: 10,
            acceptOrgList:[],  //机构类型字典
            branchStatusList:[], //机构状态字典
            applyTypeList:[], //申请类型字典
            tableSize: 10,
            secondBranchList:[], //区域中心
            collAccountModelVisible:false,
            rules:{
                area_center: [{required:true, message:'请选择区域中心',trigger:'blur'}],
                case_acceptance: [{required:true, message:'请选择机构类型',trigger:'blur'}],
                acceptance_name: [{required:true, message:'请输入机构名称',trigger:'blur'}],
                memo: [{required:true, message:'请输入备注',trigger:'blur'}],
            },
        }
    },
    created() {
        this.getDictList("PL_E_ACCOUNT_TYPE","acceptOrgList");
        this.getDictList("E_ACC_TYPE","accountTypeList");
        this.getDictList("E_BRANCH_STATE","branchStatusList");
        this.getDictList("E_APPLYTYPE","applyTypeList");
        this.getSecondBranch();
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
                    if(this.secondBranchList.length==1){
                        this.acceptorgForm.area_center =  this.secondBranchList[0].branchNo;
                    }
                }
            }).catch(err => {
                console.error(err);
            });
        },

        /**
         * 卡号只允许输入数字处理
         */
        valueChangeA(row,e){
            row.acct_no = e.target.value;
        },
        valueChangeB(row,e){
            row.bank_no = e.target.value;
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
        * 分页sizeChange 回调
        */
        sizeChange(val) {
            this.tableSize = val;
            this.getTableData();
        },
        /**
        * 分页currentChange回调
        */
        currentChange(val) {
            this.currentPage = val;
            this.getTableData();
        },
        reset() {
            this.$refs.acceptorgForm.resetFields();
            if(this.secondBranchList.length==1){
                this.acceptorgForm.area_center =  this.secondBranchList[0].branchNo;
            }
        },
        /**
         * 机构信息查询
         */
        search(){
            this.currentPage = 1;
            this.getTableData();
        },
        /**
        * 获取列表数据
        */
        getTableData() {
            let reqMap = {
                area_center: this.acceptorgForm.area_center,
                case_acceptance: this.acceptorgForm.case_acceptance,
                acceptance_name: this.acceptorgForm.acceptance_name,
                servicecode: "RLMSPLTS1391",
                start: this.currentPage,
                length: this.tableSize,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                if (res && res.code === "200" && res.data !== null) {
                    let branchId = "";
                    if(JSON.parse(localStorage.getItem("user_info")).branchSeq.length == 8){
                        branchId = "001700";
                    }else{
                        branchId = JSON.parse(localStorage.getItem("user_info")).branchSeq.substr(8,6);
                    };
                    this.tableData = [];
                    res.data.forEach(item =>{
                        if(item.area_center == branchId){
                            item.status = true;
                        }else{
                            item.status = false;
                        };
                        this.tableData.push(item);
                    })
                    this.tableTotal = res.pageParam ? res.pageParam.total : 0;
                }
            }).catch(err => {
                console.error(err);
            });
        },

        /**
        * 获取收款账户列表数据
        */
        getCollAccountData() {
            let reqMap = {
                org_id: this.org_id,
                servicecode: "RLMSPLTS1392",
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                if (res && res.code === "200" && res.data !== null) {
                    this.collAccountData = [];
                    res.data.payfeesAccount.forEach(item =>{
                        item.astatus = false;
                        for (let i=0; i < this.accountTypeList.length; i++){
                            let accoutType = this.accountTypeList[i];
                            if (item.acct_type == accoutType.dictId){
                                item.acct_type_zn = accoutType.dictName;
                            }
                        }
                        this.collAccountData.push(item);
                    })
                }
            }).catch(err => {
                console.error(err);
            });
        },

        /**
        * 查询收款账户详情
        */
        viewRow(row){
            this.$data.collAccountDetail = this.$options.data().collAccountDetail;
            this.enableEdit = true;
            this.collAccountModelVisible = true;
            this.collAccountDetail.case_acceptance = row.case_acceptance;
            this.collAccountDetail.case_acceptance_name = this.formatTypeDatatInput(row.case_acceptance);
            this.collAccountDetail.acceptance_name = row.acceptance_name;
            this.collAccountDetail.area_center = row.area_center;
            this.collAccountDetail.area_center_name = this.formatTypeDataInput(row.area_center);
            this.title = "收款账户详情查看";
            this.deal_type = 4;
            this.org_id = row.org_id;
            this.getCollAccountData();
        },

        /**
        * 修改收款账户详情
        */
        updateRow(row){
            this.$data.collAccountDetail = this.$options.data().collAccountDetail;
            this.enableEdit = false;
            this.collAccountModelVisible = true;
            this.collAccountDetail.case_acceptance = row.case_acceptance;
            this.collAccountDetail.case_acceptance_name = this.formatTypeDatatInput(row.case_acceptance);
            this.collAccountDetail.acceptance_name = row.acceptance_name;
            this.collAccountDetail.area_center = row.area_center;
            this.collAccountDetail.area_center_name = this.formatTypeDataInput(row.area_center);
            this.collAccountDetail.org_id = row.org_id;
            this.title = "收款账户详情修改";
            this.deal_type = 2;
            this.collAccountDetail.oper_type = this.formatTypeDataaInput(this.deal_type);
            this.org_id = row.org_id;
            this.getCollAccountData();
        },

        /**
        * 删除收款账户详情
        */
        deleteRow(row){
            this.$data.collAccountDetail = this.$options.data().collAccountDetail;
            this.enableEdit = true;
            this.collOpt = true;
            this.collAccountModelVisible = true;
            this.collAccountDetail.case_acceptance = row.case_acceptance;
            this.collAccountDetail.case_acceptance_name = this.formatTypeDatatInput(row.case_acceptance);
            this.collAccountDetail.acceptance_name = row.acceptance_name;
            this.collAccountDetail.area_center = row.area_center;
            this.collAccountDetail.area_center_name = this.formatTypeDataInput(row.area_center);
            this.collAccountDetail.org_id = row.org_id;
            this.title = "收款账户详情删除";
            this.deal_type = 3;
            this.collAccountDetail.oper_type = this.formatTypeDataaInput(this.deal_type);
            this.org_id = row.org_id;
            this.getCollAccountData();
        },

        /**
        * 新增行数据(机构)
        */
        addOrg(){
            this.$data.collAccountDetail = this.$options.data().collAccountDetail;
            this.collAccountData = [];
            this.enableEdit = false;
            this.collAccountModelVisible = true;
            if(JSON.parse(localStorage.getItem("user_info")).branchSeq.length == 8){
                this.collAccountDetail.area_center = "001700";
            }else{
                this.collAccountDetail.area_center = JSON.parse(localStorage.getItem("user_info")).branchSeq.substr(8,6);
            };
            this.collAccountDetail.area_center_name = this.formatTypeDataInput(this.collAccountDetail.area_center);
            this.title = "机构及收款账户新增";
            this.deal_type = 1;
            this.collAccountDetail.oper_type = this.formatTypeDataaInput(this.deal_type);
        },

        /**
        * 关闭弹框
        */
        handleClose(){
            this.$confirm("是否确认关闭弹框?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                if(this.deal_type != '4'){
                    this.$refs.fjProp.clearFileList();
                };
                this.enableEdit = false;
                this.collAccountModelVisible = false;
            })
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
            servicecode: "RLMSPLTS1387",
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
              this.collAccountData = [];
              this.$refs.fjProp.clearFileList();
              this.$message({type: "success",message: response.message});
              this.collAccountModelVisible = false;
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
.container-content {
    .container-content--search {
        padding: 16px 40px 0 12px;
        border-bottom: 1px solid #e3e8f5;
    }
    .container-content--toolbar{
        padding: 10px;
    }
    .container-content--pagination{
        float: right;
        padding: 10px;
    }
    .container-centent--table {
        margin-top: 10px;
    }
}
.container-footer {
    width: 50px;
    margin: 0 auto;
    padding: 10px;
}
.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}
.el-dialog-dev{
    max-height:100vh;
    overflow:auto;
}
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
  direction:rtl;
}
</style>
