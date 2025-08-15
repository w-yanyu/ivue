<template>
    <div class="container-content">
        <div class="container-content--search">
            <el-form :model="selectForm" :rules="selectFormRules" ref="selectForm" label-width="150px" class="custom-common--form">
                <el-row>
                    <el-col :span="6">
                        <el-form-item  label="区域中心" prop="areaCenter">
                        <el-select v-model="selectForm.areaCenter" placeholder="请选择区域中心" clearable>
                            <el-option v-for="(item, index) in orgList"
                            :key="index" 
                            :label="item.brachName"
                            :value="item.branchNo">
                            </el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="借据号" prop="lncfno">
                            <el-input v-model="selectForm.lncfno" class="input"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="客户名称" prop="acctna">
                            <el-input v-model="selectForm.acctna" class="input"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="证件号码" prop="idtfno">
                            <el-input v-model="selectForm.idtfno" class="input"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item  label="诉讼类型" prop="hdltri">
                        <el-select v-model="selectForm.hdltri" placeholder="请选择诉讼类型" clearable>
                            <el-option v-for="item in acceptTypeList"
                            :key="item.dictId" 
                            :label="item.dictName"
                            :value="item.dictId">
                            </el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item  label="案件结果" prop="carest">
                        <el-select v-model="selectForm.carest" placeholder="请选择案件结果" clearable>
                            <el-option v-for="item in litigOutcomeList"
                            :key="item.dictId" 
                            :label="item.dictName"
                            :value="item.dictId">
                            </el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item  label="上诉方" prop="apelat">
                        <el-select v-model="selectForm.apelat" placeholder="请选择上诉方" clearable>
                            <el-option v-for="item in prosecutionList"
                            :key="item.dictId" 
                            :label="item.dictName"
                            :value="item.dictId">
                            </el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="button-footer">
                    <el-col :span="24">
                        <el-button type="primary" @click="search" icon="el-icon-search">查询</el-button>
                        <el-button @click="reset">{{$i18ns('重置')}}</el-button>
                        <el-button type="primary" size="small" @click="downloadFile" plain class="export-button-style">
                            <i class="iconfont icon-daochu"></i>导出
                        </el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="container-centent--table">
            <el-table ref="multipleTable" :data="tableData" :border="true" style="width: 98%" stripe>
                <el-table-column label="借据号" prop="lncfno" align="center" width="160px" show-overflow-tooltip></el-table-column>
                <el-table-column label="区域中心" prop="areaCenter" align="center" :formatter="formatBranchNo" width="100px" show-overflow-tooltip></el-table-column>
                <el-table-column label="客户名称" prop="acctna" align="center" width="100px" show-overflow-tooltip></el-table-column>
                <el-table-column label="证件号码" prop="idtfno" align="center" width="180px" show-overflow-tooltip></el-table-column>
                <el-table-column label="受理流水号" prop="acptsr" align="center" width="160px" show-overflow-tooltip></el-table-column>
                <el-table-column label="受理时间" prop="case_times" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column label="受理类型" prop="acceptance_type" align="center" :formatter="formatAccType" width="100px" show-overflow-tooltip></el-table-column>
                <el-table-column label="案件受理机构类型" prop="case_acceptance" align="center" :formatter="formatCaseAcc" width="100px" show-overflow-tooltip></el-table-column>
                <el-table-column label="受理信息案件受理机构" prop="undertake_org" align="center" width="160px" show-overflow-tooltip></el-table-column>
                <el-table-column label="受理结果案件受理机构" prop="udtaog" align="center" width="160px" show-overflow-tooltip></el-table-column>
                <el-table-column label="起诉/仲裁/公证主张金额" prop="opinion_arrears" align="center" width="120px" show-overflow-tooltip></el-table-column>
                <el-table-column label="诉讼类型" prop="hdltri" align="center" :formatter="formatSuitType" show-overflow-tooltip></el-table-column>
                <el-table-column label="承办机构" prop="udtmna" align="center" width="160px" show-overflow-tooltip></el-table-column>
                <el-table-column label="案件程序" prop="caspro" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column label="审判案号" prop="intrno" align="center" width="160px" show-overflow-tooltip></el-table-column>
                <el-table-column label="案件结果" prop="carest" align="center" :formatter="formatSuitResult" show-overflow-tooltip></el-table-column>
                <el-table-column label="胜诉金额" prop="wncaam" align="center" width="100px" show-overflow-tooltip></el-table-column>
                <el-table-column label="文书类型" prop="dcmety" align="center" :formatter="formatDocType" width="100px" show-overflow-tooltip></el-table-column>
                <el-table-column label="文书落款日期" prop="signtm" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column label="上诉方" prop="apelat" align="center" :formatter="formatAppellant" show-overflow-tooltip></el-table-column>
            </el-table>
        </div>
        <div class="container-content--pagination">
            <el-pagination
            v-if="tableData.length>0"
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page="currentPage"
            :page-sizes="[10,15,20]"
            :page-size="tableSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableTotal"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
export default {
    name: "ToBeginApplView",
    props: {
        cMeta: Object, // 布局相关数据
        cParentMeta: Object, // 父页面模板json数据
        cParentScope: Object, // 父页面每块区域业务数据
        cParentParams: Object, // 父页面自定义参数与内置参数
    },
    data(){
        return{
            selectForm:{
                areaCenter:"", //区域中心
                lncfno:"", //借据号
                acctna:"", //客户名称
                idtfno:"", //证件号码
                hdltri:"", //诉讼类型
                carest:"", //案件结果
                apelat:"", //上诉方
            },
            tableData:[],
            orgList:[], //区域中心list
            acceptTypeList:[], //诉讼类型list
            litigOutcomeList:[], //案件结果list
            prosecutionList:[], //上诉方list
            acceptanceList:[], //受理类型list
            caseAcceList:[], //案件受理机构类型list
            docTypeList:[], //文书类型list
            currentPage: 1,
            tableTotal: 10,
            tableSize: 10,
        }
    },
    created() {
        this.getDictList("ACCEPT_ORG_TYPE","orgList"); //区域中心列表
        this.getDictList("E_SUITYPE", "acceptTypeList"); //诉讼类型字典列表
        this.getDictList("E_SUITRESULT", "litigOutcomeList"); //案件结果字典类型列表
        this.getDictList("E_APPELLANT", "prosecutionList"); //上诉方字典类型列表
        this.getDictList("E_ACCEPTANCE", "acceptanceList"); //受理类型list
        this.getDictList("E_CASEACCE", "caseAcceList"); //案件受理机构类型list
        this.getDictList("E_DOCUMNTYPE", "docTypeList"); //文书类型list
        this.getOrg();
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
        getOrg(){
            let reqMap = {
                servicecode: "RLMSPLTS1068", 
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                if (res && res.code === "200") {
                    this.orgList = res.data;
                    if(this.orgList.length==1){
                        this.selectForm.areaCenter =  this.orgList[0].branchNo;
                    }
                }
            }).catch(err => {
                console.error(err);
            });
        },
        /**
         * 重置查询条件
         */
        reset() {
            this.$refs.selectForm.resetFields();
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
         * 立案受理信息结果查询
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
                areaCenter: this.selectForm.areaCenter,
                lncfno: this.selectForm.lncfno,
                acctna: this.selectForm.acctna,
                idtfno: this.selectForm.idtfno,
                hdltri: this.selectForm.hdltri,
                carest: this.selectForm.carest,
                apelat: this.selectForm.apelat,
                servicecode: "RLMSPLTS1335",
                start: this.currentPage,
                length: this.tableSize,
            }
            console.log(reqMap);
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                if (res && res.code === "200" && res.data !== null) {
                    this.tableData = [];
                    console.log(res.data);
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
                areaCenter: this.selectForm.areaCenter,
               lncfno: this.selectForm.lncfno,
                acctna: this.selectForm.acctna,
                idtfno: this.selectForm.idtfno,
                hdltri: this.selectForm.hdltri,
                carest: this.selectForm.carest,
                apelat: this.selectForm.apelat,
                servicecode: "RLMSPLTS1334",
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                let URL = that.dataUrlToBlob(res.data.downloadUrl);
                var reader = new FileReader();
                reader.readAsDataURL(URL);
                reader.onload = function (e) {
                    const a = document.createElement('a');
                    if(reqMap.servicecode==="RLMSPLTS1334"){
                        a.download = '立案受理信息/结果统计.xlsx';
                    }
                    
                    a.href = e.target.result;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a)
                }
                reader.onloadend=function(e){
                    that.$dialog.close();
                }
                this.getTableData();
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
        },
        /**
         * 诉讼类型
         */
        formatSuitType(row, column) {
        let name = row[column.property];
        let data = row[column.property];
        this.acceptTypeList.forEach(function(item, index) {
            if (data == item.dictId) {
            name = item.dictName;
            }
        });
        return name;
        },
        /**
         * 案件结果
         */
        formatSuitResult(row, column) {
        let name = row[column.property];
        let data = row[column.property];
        this.litigOutcomeList.forEach(function(item, index) {
            if (data == item.dictId) {
            name = item.dictName;
            }
        });
        return name;
        },
        /**
         * 上诉方
         */
        formatAppellant(row, column) {
        let name = row[column.property];
        let data = row[column.property];
        this.prosecutionList.forEach(function(item, index) {
            if (data == item.dictId) {
            name = item.dictName;
            }
        });
        return name;
        },
        /**
         * 受理类型
         */
        formatAccType(row, column) {
        let name = row[column.property];
        let data = row[column.property];
        this.acceptanceList.forEach(function(item, index) {
            if (data == item.dictId) {
            name = item.dictName;
            }
        });
        return name;
        },
        /**
         * 案件受理机构类型
         */
        formatCaseAcc(row, column) {
        let name = row[column.property];
        let data = row[column.property];
        this.caseAcceList.forEach(function(item, index) {
            if (data == item.dictId) {
            name = item.dictName;
            }
        });
        return name;
        },
        /**
         * 文书类型
         */
        formatDocType(row, column) {
        let name = row[column.property];
        let data = row[column.property];
        this.docTypeList.forEach(function(item, index) {
            if (data == item.dictId) {
            name = item.dictName;
            }
        });
        return name;
        },
        /**
         * 区域中心
         */
        formatBranchNo(row,column){
          let name = row[column.property];
          let data = row[column.property];
          this.orgList.forEach(function(item,index){
            if(data == item.branchNo){
              name = item.brachName;
            }
          })
          return name;
        },
    }
}
</script>>

<style lang="less" scoped>
.container-content {
  .container-content--search {
    padding: 16px 40px 0 12px;
    border-bottom: 1px solid #e3e8f5;
  }
  .container-content--toolbar {
    padding: 10px;
  }
  .container-content--pagination {
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
  text-align: right;
  padding: 0 0 10px 0;
}
.export-button-style {
  background: #6ac044 !important;
  border-color: #6ac044 !important;
}
</style>