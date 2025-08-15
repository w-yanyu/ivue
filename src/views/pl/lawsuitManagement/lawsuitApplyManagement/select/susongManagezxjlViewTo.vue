<template>
    <div class="container-content">
        <div class="container-content--search">
            <el-form :model="selectForm" :rules="selectFormRules" ref="selectForm" label-width="150px" class="custom-common--form">
                <el-row>
                    <el-col :span="8">
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
                    <el-col :span="8">
                        <el-form-item label="借据号" prop="lncfno">
                            <el-input v-model="selectForm.lncfno" class="input"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="客户名称" prop="acctna">
                            <el-input v-model="selectForm.acctna" class="input"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="证件号码" prop="idtfno">
                            <el-input v-model="selectForm.idtfno" class="input"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item  label="执行文件类型" prop="zxfiletype">
                        <el-select v-model="selectForm.zxfiletype" placeholder="请选择执行文件类型" clearable>
                            <el-option v-for="item in zxFileTypeList"
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
                <el-table-column label="立案受理流水号" prop="slnumber" align="center" width="160px" show-overflow-tooltip></el-table-column>
                <el-table-column label="执行受理承办机构" prop="acce_under_agency" align="center" width="180px" show-overflow-tooltip></el-table-column>
                <el-table-column label="执行受理受理机构" prop="acce_shoul_agency" align="center" width="180px" show-overflow-tooltip></el-table-column>
                <el-table-column label="执行受理案号" prop="zxshoulid" align="center" width="100px" show-overflow-tooltip></el-table-column>
                <el-table-column label="执行受理时间" prop="zxshoultime" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column label="执行受理申请人" prop="appl_user" align="center" width="120px" show-overflow-tooltip></el-table-column>
                <el-table-column label="执行受理申请时间" prop="appl_date" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column label="执行受理结案时间" prop="acce_gmt_modified" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column label="执行结果确认状态" prop="voiceStatu" align="center" width="160px" show-overflow-tooltip></el-table-column>
                <el-table-column label="执行结果承办机构" prop="reco_under_agency" align="center" width="180px" show-overflow-tooltip></el-table-column>
                <el-table-column label="执行结果受理机构" prop="reco_shoul_agency" align="center" width="180px" show-overflow-tooltip></el-table-column>
                <el-table-column label="执行文件类型" prop="zxfiletype" align="center" :formatter="formatFileType" show-overflow-tooltip></el-table-column>
                <el-table-column label="执行结果案号" prop="zxjgid" align="center" width="100px" show-overflow-tooltip></el-table-column>
                <el-table-column label="执行文件落款时间" prop="zxwjtime" align="center"  show-overflow-tooltip></el-table-column>
                <el-table-column label="执行结果申请人" prop="reco_tranus" align="center" width="120px" show-overflow-tooltip></el-table-column>
                <el-table-column label="执行结果申请时间" prop="reco_gmt_create" align="center"  show-overflow-tooltip></el-table-column>
                <el-table-column label="执行结果结案时间" prop="reco_gmt_modified" align="center"  show-overflow-tooltip></el-table-column>
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
    name: "susongManagezxjlView",
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
                zxfiletype:"", //执行文件类型
            },
            tableData:[],
            orgList:[], //区域中心list
            zxFileTypeList:[], //执行文件类型list
            currentPage: 1,
            tableTotal: 10,
            tableSize: 10,
        }
    },
    created() {
        this.getDictList("ACCEPT_ORG_TYPE","orgList"); //区域中心列表
        this.getDictList("E_ZXFILETYPE", "zxFileTypeList"); //执行文件类型list
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
         * 执行受理结果查询
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
                zxfiletype: this.selectForm.zxfiletype,
                servicecode: "RLMSPLTS1337",
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
                areaCenter: this.selectForm.areaCenter,
                lncfno: this.selectForm.lncfno,
                acctna: this.selectForm.acctna,
                idtfno: this.selectForm.idtfno,
                zxfiletype: this.selectForm.zxfiletype,
                servicecode: "RLMSPLTS1336",
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                let URL = that.dataUrlToBlob(res.data.downloadUrl);
                var reader = new FileReader();
                reader.readAsDataURL(URL);
                reader.onload = function (e) {
                    const a = document.createElement('a');
                    if(reqMap.servicecode==="RLMSPLTS1336"){
                        a.download = '执行受理结果统计.xlsx';
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
         * 执行文件类型
         */
        formatFileType(row, column) {
        let name = row[column.property];
        let data = row[column.property];
        this.zxFileTypeList.forEach(function(item, index) {
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