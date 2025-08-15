<template>
    <div>
        <div class="container-content">
            <div class="container-content--search">
                <el-form :model="selectForm" ref="selectForm" label-width="150px" class="custom-common--form">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="委托批次" prop="batch_no">
                                <el-input v-model="selectForm.batch_no" class="input" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="客户姓名" prop="cust_name">
                                <el-input v-model="selectForm.cust_name" class="input" clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="证件号码" prop="cert_no">
                                <el-input v-model="selectForm.cert_no" class="input" clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="button-footer">
                        <el-col :span="24" align="center">
                          <el-button type="primary" @click="searchTeller" icon="el-icon-search">查询</el-button>
                            <el-button @click="reset">重置</el-button>
                            <el-button type="primary" size="small" @click="exportAllToExcel" plain class="export-button-style">
                                  <i class="iconfont icon-daochu"></i>导出
                            </el-button>
                            </el-col>
                        </el-row>
                </el-form>
            </div>
            <div class="container-centent--table">
                <el-table ref="multipleTable" :data="tableData" :border="true" style="width: 100%" stripe>
                    <el-table-column label="委托批次" prop="batch_no" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column label="案件编号" prop="case_id" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column label="客户名称" prop="cust_name" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column label="证件号码" prop="cert_no" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column label="逾期金额" prop="overdue_amount" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column label="逾期天数" prop="overdue_days" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column label="委托日期" prop="depute_start_date" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column label="委托天数" prop="depute_days" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column label="案件主编号" prop="case_no" align="center" v-if="false" show-overflow-tooltip></el-table-column>
                    <el-table-column label="客户号" prop="cust_id" align="center" v-if="false" show-overflow-tooltip></el-table-column>
                    <el-table-column label="法人代码" prop="org_id" align="center" v-if="false" show-overflow-tooltip></el-table-column>
                    <el-table-column label="委外公司代码" prop="oa_org_id" align="center" v-if="false" show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作" prop="info" align="center" show-overflow-tooltip width="150px">
                        <template slot-scope="scope">
                            <el-button type="text" @click="searchDetailInfo(scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="container-content--pagination">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="page.start"
                    :page-sizes="[10, 20, 30, 40, 50, 100]"
                    :page-size="page.length"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.totalCount"
                    style="margin: 0 10px">
                </el-pagination>
            </div>
        </div>
        <el-dialog :close-on-click-modal="false" :title="dialogTitle" :visible.sync="resultShow" @close="closeDialog" :width="dialogWidth">
            <div class="el-dialog-dev">
                <pte-resolver v-if="resultShow" :c-parent-meta="c_$meta" :c-parent-scope="c_$scope" :c-parent-params="c_$params" :to-request="toRequest"></pte-resolver>
            </div>
        </el-dialog>
    </div>
</template>


<script>
import MyAxios from "pte-ui/utils/MyAxios";
import _ from "lodash";
import _JSON$stringify from 'babel-runtime/core-js/json/stringify';
import Fetch from 'isomorphic-fetch';
export default {
    name: "caseView",
    props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
    },
    data() {
        return {
            tableData: [], //表格数据
            selectForm: {
                batch_no: "",
                cust_name: "",
                cert_no: "",
            },
            page: {
                totalCount: 0,
                length: 10,
                start: 1
            },
            resultShow: false, //是否展示详情
            dialogWidth: "80%", //弹框宽度
            c_$meta: {},
            c_$scope: {},
            c_$params: {
                lncfno: "",
                applid: "",
                basicInfo: {}
            },
            toRequest: {
                url: "",
                method: "POST",
            },
            isdefault: "",
        };
    },
    // created() {
        
    // },
    methods: {
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
        handleSizeChange(val) {
            let that = this;
            that.page.length = val;
            this.getTableData();
        },
        handleCurrentChange(val) {
            let that = this;
            that.page.start = val;
            this.getTableData();
        },
        /**
         * 查询
         */
        searchTeller() {
            this.currentPage = 1;
            this.getTableData();
        },
        /**
         *查看详情
         */
        searchDetailInfo(row) {
            this.c_$params.case_id = row.case_id;
            this.c_$params.oa_org_id = row.oa_org_id;
            this.c_$params.case_no = row.case_no;
            this.c_$params.cust_id = row.cust_id;
            this.c_$params.org_id = row.org_id;
            this.toRequest.url = "/views/cs/assistManage/caseDetail/caseDetail_2/case_detail_main.json";
            this.resultShow = true;
        },
        /**
         * 对话框关闭时回调函数
         */
        closeDialog(){
            this.getTableData();
        },

        reset() {
            this.$refs.selectForm.resetFields();
        },

        /**
         * 获取列表数据
         */
        getTableData() {
            let reqMap = {
                batch_no: this.selectForm.batch_no,
                cust_name: this.selectForm.cust_name,
                cert_no: this.selectForm.cert_no,
                servicecode: "cb0176",
                start: this.page.start,
                length: this.page.length,
            };
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap)
                .then((res) => {
                    if (res && res.code === "200") {
                        this.tableData = res.data;
                        this.page.totalCount = res.pageParam
                            ? res.pageParam.total
                            : 0;
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        },
       /**
            * 导出下载
            */
            exportAllToExcel(){
            let reqMap = {
                batch_no: this.selectForm.batch_no,
                cust_name: this.selectForm.cust_name,
                cert_no: this.selectForm.cert_no,
                servicecode: "cb0177",
            }
                MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                    if (res && res.code === "200") {
                        let downloadPara = {
                            filePath:res.data.downloadUrl,
                            
                        }
                        this.downLoadFilee("/SUMP/cscall/down/filepath","post",downloadPara);
                    }
                }).catch(err => {
                    console.error(err);
                });
            },
            downLoadFilee(url, method,params) {
                let _this = this;
                var req = {
                    method: method,
                    headers: {
                        'If-Modified-Since': 0,
                        'Content-type': 'application/json',
                        token: sessionStorage.getItem('access_token'),
                    }
                };
                req.body = _JSON$stringify(params);
                this.$message({
                    type: 'success',
                    message: '文件下载中，请稍后...'
                })
                Fetch(url, req).then(function (response) {
                    var disposition = response.headers.get('content-disposition');
                    if (disposition && disposition.match(/attachment/)) {
                        response.blob().then(function (blob) {
                           let url = window.URL.createObjectURL(blob);
                           _this.downloadOtherFile(url,"案件列表.xlsx");
                        });
                    }else{
                    }
                }).catch(function (res) {
                    console.error(res);
                });
            },
            downloadOtherFile(url,name){
                var a = document.createElement("a");
                a.download = name;
                a.style.display = "none";
                a.href = url;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
    },
    
};
</script>


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
.el-dialog-dev {
    max-height: 70vh;
    overflow: auto;
}
.export-button-style {
    background: #6ac044 !important;
    border-color: #6ac044 !important;
}
</style>