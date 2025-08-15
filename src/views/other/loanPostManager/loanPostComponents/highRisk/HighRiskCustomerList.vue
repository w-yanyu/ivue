<template>
    <div>
        <div class="container-content">
            <div class="container-content--search">
                <el-form :model="hriskForm" ref="hriskForm" label-width="150px" class="custom-common--form">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="借据号"  prop="lncfno" >
                                <el-input v-model="hriskForm.lncfno" class="input"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="客户姓名" prop="custna">
                                <el-input v-model="hriskForm.custna" class="input"></el-input>
                            </el-form-item>
                        </el-col>                     
                        <el-col :span="8">
                            <el-form-item label="证件号码" prop="cardno">
                                <el-input v-model="hriskForm.cardno" class="input"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="产品名称" prop="prodcd">
                                <el-select v-model="hriskForm.prodcd" placeholder="请选择产品名称">
                                    <el-option
                                    v-for="(item, index) in prodcdList"
                                    :key="index"
                                    :label="item.dictId+'-'+item.dictName"
                                    :value="item.dictId"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>                     
                        
                        <el-col :span="8">
                            <el-form-item label="逾期起始天数" prop="ovdaysdown">
                                <el-input v-model="hriskForm.ovdaysdown" class="input" type ="number"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="逾期截止天数" prop="ovdaysup">
                                <el-input v-model="hriskForm.ovdaysup" class="input" type ="number"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="区域中心" prop="brchno">
                                <el-select v-model="hriskForm.brchno" :disabled="isBrchEnabled" placeholder="请选择区域中心">
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
                            <el-form-item label="认定起始日" prop="founddsta">
                                <el-date-picker
                                    v-model="hriskForm.founddsta"
                                    type="date"
                                    placeholder="请选择认定起始日"
                                    value-format="yyyyMMdd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="认定截止日" prop="founddend">
                                <el-date-picker
                                    v-model="hriskForm.founddend"
                                    type="date"
                                    placeholder="请选择认定截止日"
                                    value-format="yyyyMMdd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        
                    </el-row>  
                    <el-row class="button-footer">
                        <el-col :span="24">
                            <el-button type="primary" @click="searchTeller">查询</el-button>
                            <el-button type="primary" @click="downloadFile">高危客户一览表下载</el-button>
                            <el-button @click="reset">{{$i18ns('重置')}}</el-button>
                        </el-col>
                    </el-row>                              
                </el-form>
            </div>
            <div class="container-centent--table">
                <el-table
                ref="multipleTable"
                :data="tableData"
                :border="true"
                style="width: 100%"
                stripe
                >
                    <el-table-column
                        label="机构名称"
                        width="120"
                        prop="brchna"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        label="借据号"
                        prop="lncfno"
                        width="240"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        label="客户姓名"
                        prop="custna"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="证件号码"
                        prop="cardno"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="产品名称"
                        prop="prodna"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="逾期天数（天）"
                        prop="ovdays"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="贷款形态"
                        prop="clssst"
                        align="center"
                        :formatter="formatClssstData"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        label="认定日期"
                        prop="foundd"
                        align="center"
                        show-overflow-tooltip>
                    </el-table-column>
                    
                </el-table>
            </div>
            <div class="container-content--pagination">
                <el-pagination v-show="isShowPage"
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
    name: "HighRiskCustomerList",
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
            isBrchEnabled : false, //区域中心是否可选
            hriskForm:{
                lncfno: "",
                certTp: "",
                custna: "",
                cardno: "",
                prodcd: "",
                brchno: "",
                ovdaysdown: "",
                ovdaysup: "",
                founddsta: "",
                founddend: "",
            },
            currentPage: 1,
            tableTotal: 10,
            temphriskForm: [],  //查询
            clssstList:[],  //账户形态字典
            prodcdList:[],  //产品列表字典
            secondBranchList:[], //区域中心列表
            tableSize: 10,
        }
    },
    created() {
        this.getSecondBranch() ;
        this.getDictList("E_CLSSST","clssstList");
        this.getDictList("E_PROD","prodcdList");
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
        * 获取区域中心列表数据
        */
        getSecondBranch() {
            let secReqMap = {
                servicecode: "PLMSKGTS0135",
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", secReqMap).then(res => {
                if (res && res.code === "200") {
                    this.secondBranchList = res.data;
                    if(this.secondBranchList.length === 1){
                        this.hriskForm.brchno = this.secondBranchList[0].branchNo;
                        this.isBrchEnabled = true;
                    }
                    
                }
            }).catch(err => {
                console.error(err);
            });
        },
        formatClssstData(row,column){
            let name = row[column.property];
            let data = row[column.property];
            this.clssstList.forEach(function(item,index){
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
            this.$refs.hriskForm.validate(valid => {
                if (valid) {
                    this.temphriskForm = _.cloneDeep(this.hriskForm);
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
        reset() {
            this.$refs.hriskForm.resetFields();
        },
        /**
        * 获取列表数据
        */
        getTableData() {
            let reqMap = {
                lncfno: this.hriskForm.lncfno,
                custna: this.hriskForm.custna,
                cardno: this.hriskForm.cardno,
                prodcd: this.hriskForm.prodcd,
                brchno: this.hriskForm.brchno,
                ovdaysdown: this.hriskForm.ovdaysdown,
                ovdaysup: this.hriskForm.ovdaysup,
                founddsta: this.hriskForm.founddsta,
                founddend: this.hriskForm.founddend,
                servicecode: "PLMSKGTS0070",
                start: this.currentPage,
                length: this.tableSize,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                if (res && res.code === "200") {
                    this.tableData = res.data;
                    this.isShowPage = true;
                    this.tableTotal = res.pageParam ? res.pageParam.total : 0;
                    
                }
            }).catch(err => {
                console.error(err);
            });
        },
        downloadFile() {
            let reqMap = {
                lncfno: this.hriskForm.lncfno,
                custna: this.hriskForm.custna,
                cardno: this.hriskForm.cardno,
                prodcd: this.hriskForm.prodcd,
                brchno: this.hriskForm.brchno,
                ovdaysdown: this.hriskForm.ovdaysdown,
                ovdaysup: this.hriskForm.ovdaysup,
                founddsta: this.hriskForm.founddsta,
                founddend: this.hriskForm.founddend,
                servicecode: "PLMSKGTS0069"
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
            let URL = this.dataUrlToBlob(res.data.downloadUrl);
            var reader = new FileReader();
            reader.readAsDataURL(URL);
            reader.onload = function (e) {
                const a = document.createElement('a');
                a.download = '高危客户一览表.xls';
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
            return new Blob([u8arr], { type: 'xls' });
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