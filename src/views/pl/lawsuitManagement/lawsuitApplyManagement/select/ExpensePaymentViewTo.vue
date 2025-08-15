<template>
    <div>
        <div class="container-content">
            <div class="container-content--search">
                <el-form :model="exPayForm" ref="exPayForm" label-width="150px" class="custom-common--form">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="区域中心" prop="area_center">
                                <el-select v-model="exPayForm.area_center" placeholder="请选择区域中心" >
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
                                <el-input v-model="exPayForm.lncfno" class="input"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="客户名称" prop="acctna">
                                <el-input v-model="exPayForm.acctna" class="input"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="证件号码" prop="idtfno">
                                <el-input v-model="exPayForm.idtfno" class="input"></el-input>
                            </el-form-item>
                        </el-col>  
                        <el-col :span="8">
                            <el-form-item label="费用类型" prop="expense_type">
                                <el-select v-model="exPayForm.expense_type" placeholder="请选择费用类型" clearable>
                                    <el-option
                                    v-for="(item, index) in expenseTypeList"
                                    :key="index"
                                    :label="item.dictName"
                                    :value="item.dictId"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="收款账户名称" prop="acct_name">
                                <el-input v-model="exPayForm.acct_name" class="input"></el-input>
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
                    <el-table-column label="缴费申请单号"  prop="applid" align="center" width="160px">
                    </el-table-column>
                    <el-table-column label="区域中心"  prop="areaCenter" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="借据号"  prop="lncfno"  align="center" width="160px">
                    </el-table-column>
                    <el-table-column label="客户名称" prop="acctna" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column label="证件号码" prop="idtfno" align="center" width="160px" >
                    </el-table-column>
                    <el-table-column label="费用类型" prop="expense_type" align="center" show-overflow-tooltip :formatter="formatFeeTypeData">
                    </el-table-column>
                    <el-table-column label="费用金额" prop="payment" align="center" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column label="收款账户类型" prop="acct_type" align="center" show-overflow-tooltip :formatter="formatFeeTypeDataa">
                    </el-table-column>
                    <el-table-column label="收款账户" prop="acct_no" align="center" width="160px" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column label="收款账户名称" prop="acct_name" align="center"  show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column label="缴费发起人" prop="tranus" align="center" show-overflow-tooltip >
                    </el-table-column>
                    <el-table-column label="发起时间" prop="gmt_create" align="center" width="150px" :formatter="dateFormat">
                    </el-table-column>
                    <el-table-column label="结案时间" prop="gmt_modified" align="center" width="150px" :formatter="dateFormat">
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
    name: "ExpensePaymentView",
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
            expenseTypeList:[], //费用类型
            acceptOrgList:[],  //机构类型
            exPayForm:{
                area_center:"",  //区域中心
                lncfno:"", //借据号
                acctna:"", //客户名称
                idtfno:"", //证件号码
                expense_type:"", //费用类型
                acct_name:"", //收款账户名称
            },
            currentPage: 1,
            tableTotal: 10,
            tableSize: 10,
        }
    },
    created() {
        this.getDictList("ACCEPT_ORG_TYPE","acceptOrgList");
        this.getDictList("E_EXPENSE_TYPE","expenseTypeList");
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
                        this.exPayForm.area_center =  this.branchList[0].branchNo;
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
            this.$refs.exPayForm.resetFields();
            if(this.branchList.length==1){
                this.exPayForm.area_center =  this.branchList[0].branchNo;
            }
        },
        /**
         * 费用支付明细统计查询
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
                areaCenter: this.exPayForm.area_center,
                lncfno: this.exPayForm.lncfno,
                acctna: this.exPayForm.acctna,
                idtfno: this.exPayForm.idtfno,
                expense_type: this.exPayForm.expense_type,
                acct_name: this.exPayForm.acct_name,
                servicecode: "RLMSPLTS1350",
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
         * 日期格式化
         */
        dateFormat(row,column){
            var date = row[column.property];
            if(date == ""){
                return ""
            }else{
                var year = date.substring(0,4);
                var month = date.substring(4,6);
                var day = date.substring(6,8);
                var hour = date.substring(8,10);
                var minutes = date.substring(10,12);
                var seconds = date.substring(12,14);
                return (year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds);
            }
        },
        /**
         * 费用类型
         */
        formatFeeTypeData(row,column){
          let name = row[column.property];
          let data = row[column.property];
          this.expenseTypeList.forEach(function(item,index){
            if(data == item.dictId){
              name = item.dictName;
            }
          })
          return name;
        },
        /**
         * 费用类型
         */
        formatFeeTypeDataa(row,column){
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
         * 导出数据到表格
         */
        downloadFile() {
            let that = this;
            let reqMap = {
                areaCenter: this.exPayForm.area_center,
                lncfno: this.exPayForm.lncfno,
                acctna: this.exPayForm.acctna,
                idtfno: this.exPayForm.idtfno,
                expense_type: this.exPayForm.expense_type,
                acct_name: this.exPayForm.acct_name,
                servicecode: "RLMSPLTS1351",
            }
            
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                let URL = that.dataUrlToBlob(res.data.downloadUrl);
                var reader = new FileReader();
                reader.readAsDataURL(URL);
                reader.onload = function (e) {
                    const a = document.createElement('a');
                    if(reqMap.servicecode==="RLMSPLTS1351"){
                        a.download = '费用支付明细统计一览表.xlsx';
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