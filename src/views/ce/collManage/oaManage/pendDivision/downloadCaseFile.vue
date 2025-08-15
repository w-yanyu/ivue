<template>
    <div>
        <div class="container-content">
            <div class="container-content--search">
                <el-form :model="downloadForm" ref="downloadForm" label-width="150px" class="custom-common--form">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="区域中心" prop="branch_id">
                                <el-select v-model="downloadForm.branch_id" placeholder="请选择区域中心" :disabled="secondBranchList.length==1">
                                    <el-option
                                    v-for="(item, index) in secondBranchList"
                                    :key="index"
                                    :label="item.branchNo+'-'+item.brachName"
                                    :value="item.branchNo"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="委案公司名称" prop="oa_org_name">
                                <el-input v-model="downloadForm.oa_org_name" class="input"></el-input>
                            </el-form-item>
                        </el-col>                     
                        <el-col :span="6">
                            <el-form-item label="数据生成日期" prop="trustMonth">
                                <el-date-picker
                                    v-model="downloadForm.trustMonth"
                                    type="month"
                                    format="yyyy-MM"
                                    value-format="yyyyMM">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="生成状态" prop="produce_status">
                                <el-select v-model="downloadForm.produce_status" placeholder="请选择生成状态" >
                                    <el-option
                                    v-for="(item, index) in produceDict"
                                    :key="index"
                                    :label="item.dictId+'-'+item.dictName"
                                    :value="item.dictId"
                                    ></el-option>
                                </el-select>
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
            <div class="container-centent--table">
                <el-table ref="multipleTable" :data="tableData" :border="true" style="width: 98%;">
                    <el-table-column label="委案编号"  prop="trust_applid"  align="center" show-overflow-tooltip> </el-table-column>
                    <el-table-column label="区域中心"  prop="branch_name"  align="center" show-overflow-tooltip> </el-table-column>
                    <el-table-column label="委案公司"  prop="oa_org_name" align="center" show-overflow-tooltip> </el-table-column>
                    <el-table-column label="数据生成日期" prop="generate_time"   align="center" show-overflow-tooltip> </el-table-column>
                    <el-table-column label="案件总数" prop="allocateAmount"  align="center" show-overflow-tooltip> </el-table-column>
                    <el-table-column label="生成状态" prop="produce_status" :formatter="formatProduceData"  align="center" show-overflow-tooltip> </el-table-column>
                    <el-table-column label="操作" prop="deadline_time"  align="center" show-overflow-tooltip> 
                        <template slot-scope="scope" >
                            <el-button type="text" icon="el-icon-edit" v-show="scope.row.produce_status=='1'" @click="downloadFile(scope.row)">{{$i18ns('下载')}}</el-button>
                            <el-button type="text" icon="el-icon-edit" v-show="scope.row.produce_status=='2'" @click="reGenerateFile(scope.row)">重新生成</el-button>
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

    </div>
</template>


<script>
import MyAxios from "pte-ui/utils/MyAxios";
import _ from "lodash";

export default {
    name: "downloadCaseFile",
    props: {
        cMeta: Object, // 布局相关数据
        cParentMeta: Object, // 父页面模板json数据
        cParentScope: Object, // 父页面每块区域业务数据
        cParentParams: Object, // 父页面自定义参数与内置参数
    },
    data(){
        return{
            tableData: [], //表格数据
            isShowPage:false,
            downloadForm:{
                branch_id:"",
                produce_status:"",
                applid: "",
                oa_org_name: "",
                trustMonth: "",
            },
            currentPage: 1,
            tableTotal: 10,
            produceDict:[],  //账户形态字典
            tableSize: 10,
            secondBranchList:[],
        }
    },
    created() {
        this.getDictList("E_FILE_STATUS","produceDict");
        this.getSecondBranch();
        //this.getTableData() ;
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
                        this.downloadForm.branch_id =  this.secondBranchList[0].branchNo;
                    }
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
            this.produceDict.forEach(function(item,index){
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
        reset() {
            this.$refs.downloadForm.resetFields();
            if(this.secondBranchList.length==1){
                this.downloadForm.branch_id =  this.secondBranchList[0].branchNo;
            }
        },
        search(){
            this.currentPage = 1;
            this.getTableData();

        },
        /**
        * 获取列表数据
        */
        getTableData() {
            let reqMap = {
                branch_id: this.downloadForm.branch_id,
                oa_org_name: this.downloadForm.oa_org_name,
                trustMonth: this.downloadForm.trustMonth,
                produce_status: this.downloadForm.produce_status,
                servicecode: "RLMSPLTS1062",
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
        },
        reGenerateFile(row){
            this.$confirm("是否确认重新生成?", "提示", {
                cancelButtonText: "取消",
                confirmButtonText: "确定",
                type: "warning"
            }).then(() => {
                let reqMap = {
                    servicecode: "RLMSPLTS1064", 
                    applid: row.trust_applid,
                    oa_org_id: row.oa_org_id,
                }
                MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                    if (res && res.code === "200") {
                        this.search() ;
                        this.$message({type: "success",message: res.message});
                    }
                }).catch(err => {
                    console.error(err);
                });
            })
        },
        downloadFile(row) {
            let reqMap = {
                applid: row.trust_applid,
                oa_org_id: row.oa_org_id,
                servicecode: "RLMSPLTS1063"
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
            let URL = this.dataUrlToBlob(res.data.downloadUrl);
            var reader = new FileReader();
            reader.readAsDataURL(URL);
            reader.onload = function (e) {
                const a = document.createElement('a');
                a.download = row.oa_org_name+'委案明细表.xlsx';
                a.href = e.target.result;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a)
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
</style>
