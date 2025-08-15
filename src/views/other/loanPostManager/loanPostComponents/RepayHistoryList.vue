<template>
    <div>
        <div class="container-content">
            <div class="container-content--search">
                <el-form :model="repayForm" :rules="repayFormRules" ref="repayForm" label-width="150px" class="custom-common--form">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="借据号"  prop="lncfno" >
                                <el-input v-model="repayForm.lncfno" class="input"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="客户姓名" prop="acctna">
                                <el-input v-model="repayForm.acctna" class="input"></el-input>
                            </el-form-item>
                        </el-col>                     
                        <el-col :span="8">
                            <el-form-item label="证件号码" prop="idtfno">
                                <el-input v-model="repayForm.idtfno" class="input"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="还款类型" prop="rptype">
                                <el-select v-model="repayForm.rptype"  placeholder="请选择还款类型">
                                    <el-option
                                    v-for="(item, index) in rptypeList"
                                    :key="index" 
                                    :label="item.dictName"
                                    :value="item.dictId"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>                     
                        
                        <el-col :span="8">
                            <el-form-item label="扣款起始日期" prop="applyStartTime">
                                <el-date-picker v-model="repayForm.applyStartTime" type="date" placeholder="请选择扣款起始日期" value-format="yyyyMMdd"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="扣款截止日期" prop="applyEndTime">
                                <el-date-picker v-model="repayForm.applyEndTime" type="date" placeholder="请选择扣款截止日期" value-format="yyyyMMdd"></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="扣款状态" prop="deduct_status">
                                <el-select v-model="repayForm.deduct_status"  placeholder="请选择扣款状态">
                                    <el-option
                                    v-for="(item, index) in deductStatusList"
                                    :key="index" 
                                    :label="item.dictName"
                                    :value="item.dictId"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>          
                    </el-row>  
                    <el-row class="button-footer">
                        <el-col :span="24">
                            <el-button type="primary" @click="searchTeller">查询</el-button>
                            <el-button @click="reset">{{$i18ns('重置')}}</el-button>
                        </el-col>
                    </el-row>                              
                </el-form>
            </div>
            <div class="container-centent--table">
                <el-table ref="multipleTable" :data="tableData" :border="true" style="width: 100%" stripe>
                    <el-table-column label="借据号" prop="lncfno" align="center"></el-table-column>
                    <el-table-column label="客户姓名" prop="acctna" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column label="证件号码" prop="idtfno" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column label="还款流水" prop="pbrpno" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column v-if="repayForm.rptype=='1'" label="公账序号" prop="caSeq" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column v-if="repayForm.rptype=='0'" label="卡号" prop="caSeq" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column v-if="repayForm.rptype=='1'" label="公账日期" prop="caDate" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column v-if="repayForm.rptype=='0'" label="银行名称" prop="bankName" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column v-if="repayForm.rptype=='1'" label="公账金额" prop="caAmt" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column v-if="repayForm.rptype=='0'" label="扣款金额" prop="caAmt" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column v-if="repayForm.rptype=='1'" label="公账剩余金额" prop="caRestAmt" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column v-if="repayForm.rptype=='0'" label="实际扣款金额" prop="caRestAmt" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column v-if="repayForm.rptype=='1'" label="存款人" prop="caDepositor" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column v-if="repayForm.rptype=='0'" label="扣款状态" prop="deduct_status" align="center" :formatter="formatDeductData" show-overflow-tooltip></el-table-column>
                    <el-table-column label="还款人" prop="caPayer" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column v-if="repayForm.rptype=='1'" label="处理人" prop="caOperator" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column v-if="repayForm.rptype=='0'" label="处理人" prop="gmt_create" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column v-if="repayForm.rptype=='1'" label="是否已锁定" prop="isLock" align="center" :formatter="formatLockData" show-overflow-tooltip></el-table-column>
                    <el-table-column label="最后操作时间" prop="gmt_modified" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column label="扣款时间" prop="caRepayOrDebtDate" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作" prop="info" align="center" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button type="text" @click="searchDetailInfo(scope.row)">{{$i18ns('详情')}}</el-button>
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
        <el-dialog
            :close-on-click-modal="false"
            :title="dialogTitle"
            :visible.sync="resultShow"
            :width="dialogWidth"
        >
        <div class="el-dialog-dev">
            <pte-resolver
                v-if="resultShow"
                :c-parent-meta="c_$meta"
                :c-parent-scope="c_$scope"
                :c-parent-params="c_$params"
                :to-request="toRequest"
            ></pte-resolver>
        </div>
        </el-dialog>
    </div>
</template>


<script>
import MyAxios from "pte-ui/utils/MyAxios";
import {
  validateHandle,
} from "../loanPostConstant/loanPostConstant";
import _ from "lodash";

export const repayFormRules = {
  rptype: [{ required: true, message: "还款类型" }],
};

export default {
    name: "RepayHistoryList",
    data(){
        return{
            tableData: [], //表格数据
            repayForm:{
                lncfno: "",
                acctna: "",
                idtfno: "",
                rptype: "",
                rpaplstus: "",
                applyStartTime: "",
                applyEndTime: "",
            },
            currentPage: 1,
            tableTotal: 10,
            temprepayForm: [],  //查询
            rptypeList:[],  //还款类型字典
            lockList:[],  //是否锁定字典
            deductStatusList:[],  //扣款状态字典
            tableSize: 10,
            repayFormRules,
            resultShow:false, //是否展示详情
            dialogWidth:"80%", //弹框宽度
            dialogTitle:"详情",
            c_$meta: {},
            c_$scope: {},
            c_$params: {
                applid: ""
            },
            toRequest:{
                url: "/views/other/loanPostManager/repayment_application_query.json",
				method: "POST"
            }
        }
    },
    created() {
        this.getDictList("E_RPTYPE","rptypeList");  //还款类型字典
        this.getDictList("E_YES___","lockList");  //还款类型字典
        this.getDictList("E_DEDUCT_STATUS","deductStatusList");  //扣款状态字典
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
        formatDeductData(row,column){
            let name = row[column.property];
            let data = row[column.property];
            this.deductStatusList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
        },
        formatLockData(row,column){
            let name = row[column.property];
            let data = row[column.property];
            this.lockList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
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
        /**
        * 查询
        */
        searchTeller() {
            this.$refs.repayForm.validate(valid => {
                if (valid) {
                    this.temprepayForm = _.cloneDeep(this.repayForm);
                    this.currentPage = 1;
                    this.getTableData();
                } else {
                    this.$message({
                        type: "warning",
                        message: "校验不通过"
                    })
                }
            })
        },
        /**
        *详情
        */
        searchDetailInfo(row){
            if(row.sjplhk=='1'){
                 this.$message({
                    type: "warning",
                    message: "该记录无还款申请详情！"
                })
            }else{
                this.c_$params.applid = row.applid;
                this.resultShow = true;
            }
        },
        reset() {
            this.$refs.repayForm.resetFields();
        },
        /**
        * 获取列表数据
        */
        getTableData() {
            this.validateList1 = [];
            const formList = ["repayForm"];
            formList.forEach(item => {
                this.validateList1.push(validateHandle(item, this));
            });
            Promise.all(this.validateList1).then(res => {
                let reqMap = {
                    lncfno: this.repayForm.lncfno,
                    acctna: this.repayForm.acctna,
                    idtfno: this.repayForm.idtfno,
                    rptype: this.repayForm.rptype,
                    rpaplstus: this.repayForm.rpaplstus,
                    applyStartTime: this.repayForm.applyStartTime,
                    applyEndTime: this.repayForm.applyEndTime,
                    servicecode: "PLMSKGTS0030",
                    start: this.currentPage,
                    length: this.tableSize,
                }
                MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                    if (res && res.code === "200") {
                        this.tableData = res.data;
                        this.tableTotal = res.pageParam ? res.pageParam.total : 0;
                    }
                }).catch(err => {
                    console.error(err);
                });
            }).catch(err => {
            this.$message({
                type: "warning",
                message: "校验不通过"
            })
            })
            
        },


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
    max-height:70vh;
    overflow:auto;
}
</style>