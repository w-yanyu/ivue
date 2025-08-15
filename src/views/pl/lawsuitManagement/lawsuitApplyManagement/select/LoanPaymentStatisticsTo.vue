<template>
    <div>
        <div class="container-content">
            <div class="container-content--search">
                <el-form :model="loanPayForm" ref="loanPayForm" label-width="150px" class="custom-common--form">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="区域中心" prop="area_center">
                                <el-select v-model="loanPayForm.area_center" placeholder="请选择区域中心" >
                                    <el-option
                                    v-for="(item, index) in branchList"
                                    :key="index"
                                    :label="item.branchNo+'-'+item.brachName"
                                    :value="item.branchNo"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="借据号" prop="lncfno">
                                <el-input v-model="loanPayForm.lncfno" class="input"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="客户名称" prop="customer_name">
                                <el-input v-model="loanPayForm.customer_name" class="input"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="证件号码" prop="credentials_num">
                                <el-input v-model="loanPayForm.credentials_num" class="input"></el-input>
                            </el-form-item>
                        </el-col>  
                        <el-col :span="8">
                            <el-form-item label="费用类型" prop="fee_type">
                                <el-select v-model="loanPayForm.fee_type" placeholder="请选择费用类型" clearable>
                                    <el-option
                                    v-for="(item, index) in feeTypeList"
                                    :key="index"
                                    :label="item.dictName"
                                    :value="item.dictId"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="缴费确认状态" prop="payment_status">
                                <el-select v-model="loanPayForm.payment_status" placeholder="请选择缴费确认状态" clearable>
                                    <el-option
                                    v-for="(item, index) in payConfirmStatusList"
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
                            <el-button @click="reset">{{$i18ns('重置')}}</el-button>
                            <el-button type="primary" @click="search()">查询</el-button>
                            <el-button type="primary" size="small" @click="downloadFile" plain class="export-button-style">
                                <i class="iconfont icon-daochu"></i>导出
                            </el-button>
                        </el-col>
                    </el-row>                              
                </el-form>
            </div>
            <div class="container-content--table">
                <el-table ref="multipleTable" :data="tableData" :border="true" style="width: 98%;">
                    <el-table-column label="区域中心"  prop="area_no" align="center" width="100px" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="借据号"  prop="lncfno"  align="center" width="160px" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="客户名称" prop="cust_nm" align="center" width="100px" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="证件号码" prop="idtfno" align="center" width="160px" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column label="缴费总金额" prop="pay_amount" align="center" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column label="已确认总金额" prop="confirm_pay_amount" align="center" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column label="客户承担金额" prop="cust_amt" align="center" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column label="法院退回金额" prop="court_back_amt" align="center" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column label="已处理法院退回金额" prop="court_back_balance_after" align="center" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column label="未处理法院退回金额" prop="court_back_balance" align="center" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column label="公司承担金额" prop="compnay_amt" align="center" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column label="已处理公司承担金额" prop="compnay_balance_after" align="center" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column label="未处理公司承担金额" prop="compnay_balance" align="center" show-overflow-tooltip >
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
    </div>
</template>


<script>
import MyAxios from "pte-ui/utils/MyAxios";
import _ from "lodash";

export default {
    name: "LoanPaymentStatistics",
    props: {
        cMeta: Object, // 布局相关数据
        cParentMeta: Object, // 父页面模板json数据
        cParentScope: Object, // 父页面每块区域业务数据
        cParentParams: Object, // 父页面自定义参数与内置参数
    },
    data(){
        return{
            tableData: [], //借款缴费统计
            branchList:[], //区域中心
            feeTypeList:[], //费用类型
            payConfirmStatusList:[], //缴费确认状态
            loanPayForm:{
                area_center:"",  //区域中心
                lncfno:"", //借据号
                customer_name:"", //客户名称
                credentials_num:"", //证件号码
                fee_type:"", //费用类型
                payment_status:"", //缴费确认状态
            },
            currentPage: 1,
            tableTotal: 10,
            tableSize: 10,
        }
    },
    created() {
        this.getDictList("E_FEE_TYPE","feeTypeList");
        this.getDictList("E_PAY_CONFIRM_STATUS","payConfirmStatusList");
        this.getBranch();
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
        /**
        * 获取区域中心
        */
        getBranch(){
            let reqMap = {
                servicecode: "RLMSPLTS1068", 
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                if (res && res.code === "200") {
                    this.branchList = res.data;
                    if(this.branchList.length==1){
                        this.loanPayForm.area_center =  this.branchList[0].branchNo;
                    }
                }
            }).catch(err => {
                console.error(err);
            });
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
            this.$refs.loanPayForm.resetFields();
            if(this.branchList.length==1){
                this.loanPayForm.area_center =  this.branchList[0].branchNo;
            }
        },
        /**
         * 借款缴费统计查询
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
                area_no: this.loanPayForm.area_center,
                lncfno: this.loanPayForm.lncfno,
                cust_nm: this.loanPayForm.customer_name,
                idtfno: this.loanPayForm.credentials_num,
                fee_type: this.loanPayForm.fee_type,
                pay_confirm_status: this.loanPayForm.payment_status,
                servicecode: "RLMSPLTS1348",
                start: this.currentPage,
                length: this.tableSize,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                if (res && res.code === "200" && res.data !== null) {
                    this.tableData = [];
                    res.data.forEach(item =>{
                        this.tableData.push(item);
                    });
                    this.tableTotal = res.pageParam ? res.pageParam.total : 0;
                }
            }).catch(err => {
                console.error(err);
            });
        },
        /**
         * 导出数据到表格
         */
        downloadFile() {
            let that = this;
            let reqMap = {
                area_no: this.loanPayForm.area_center,
                lncfno: this.loanPayForm.lncfno,
                cust_nm: this.loanPayForm.customer_name,
                idtfno: this.loanPayForm.credentials_num,
                fee_type: this.loanPayForm.fee_type,
                pay_confirm_status: this.loanPayForm.payment_status,
                servicecode: "RLMSPLTS1349",

            }
            
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                let URL = that.dataUrlToBlob(res.data.downloadUrl);
                var reader = new FileReader();
                reader.readAsDataURL(URL);
                reader.onload = function (e) {
                    const a = document.createElement('a');
                    if(reqMap.servicecode==="RLMSPLTS1349"){
                        a.download = '借款缴费统计一览表.xlsx';
                    }
                    
                    a.href = e.target.result;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a)
                }
                reader.onloadend=function(e){
                    that.$dialog.close();
                }
                
            });
        },
        dataUrlToBlob(data){
            var bstr = atob(data);
            var n = bstr.length;
            var u8arr = new Uint8Array(n);
            while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: 'xlsx' });
        }
    }
}
</script>


<style lang="less" scoped>
.container-content {
    .container-content--search {
        padding: 16px 40px 0 12px;
        border-bottom: 1px solid #e3e8f5;
    }
    .container-content--pagination{
        float: right;
        padding: 10px;
    }
    .container-content--table {
        margin-top: 10px;
    }
}
.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}
.export-button-style {
  background: #6ac044 !important;
  border-color: #6ac044 !important;
}
</style>