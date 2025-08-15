<template>
    <!--<el-dialog title="委案比例确认" :visible.sync="waitTrustModelVisible" :show-close="true" :before-close="handleClose" width="1200px">-->
    <div >
        <div>
            <el-table ref="multipleTable" :data="waitTrustApplyInfo.waitAllocateCountInfo" :border="true" style="width: 99%;margin: 0 !important;">
                <el-table-column label="区域中心" prop="branch_name"   align="center" show-overflow-tooltip>
                    <template slot-scope="scope">            
                        <span :class="tableRowClassName(scope.row)">{{scope.row.branch_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="产品类型"  prop="prod_type" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">            
                        <span :class="tableRowClassName(scope.row)">{{formatprodTypeData(scope.row.prod_type)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="账龄" prop="acctDuration"   align="center" show-overflow-tooltip> 
                    <template slot-scope="scope">            
                        <span :class="tableRowClassName(scope.row)">{{scope.row.acctDuration}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="催收公司" prop="oa_org_name"  align="center" show-overflow-tooltip>
                    <template slot-scope="scope">            
                        <span :class="tableRowClassName(scope.row)">{{scope.row.oa_org_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="分配模式" prop="allocate_type"  align="center" show-overflow-tooltip>
                    <template slot-scope="scope">            
                        <span :class="tableRowClassName(scope.row)">{{formatAllocatTypeData(scope.row.allocate_type)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="到期日" prop="deadline_time"  show-overflow-tooltip  align="center">
                    <template slot-scope="scope">            
                        <span :class="tableRowClassName(scope.row)">{{scope.row.deadline_time}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="计划比例(%)" prop="allocate_percent_plan"  show-overflow-tooltip  align="center">
                    <template slot-scope="scope">            
                        <span :class="tableRowClassName(scope.row)">{{scope.row.allocate_percent_plan}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="实际比例(%)" prop="allocate_percent_real"  show-overflow-tooltip align="center">
                    <template slot-scope="scope">            
                        <span :class="tableRowClassName(scope.row)">{{scope.row.allocate_percent_real}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="委案笔数" prop="allocateAmount"  align="center" show-overflow-tooltip>
                    <template slot-scope="scope">            
                        <span :class="tableRowClassName(scope.row)">{{scope.row.allocateAmount}}</span>
                    </template></el-table-column>
                <el-table-column label="是否超额" prop="is_over_set" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">            
                        <span :class="tableRowClassName(scope.row)">{{formatYesData(scope.row.is_over_set)}}</span>
                    </template></el-table-column>
                </el-table-column>
            </el-table>
            <el-form ref="waitTrustForm" :model="waitTrustForm" :rules="waitTrustrRules" label-width="100px" class="custom-common--form" v-if="waitTrustApplyInfo.is_over_set==='1'">
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="说明:"  prop="desc" >
                            <span><font color="red">部分账龄实际分案比例与计划分案比例之间的差额超过10%，请备注原因！</font></span>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item :label="$i18ns('备注:')"  prop="remark" >
                            <el-input type="textarea" :autosize="{minRows:2, maxRows: 5}" v-model="waitTrustForm.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer" style="float: right;margin-top:30px">
            <el-button size="small" @click="handleClose">{{$i18ns('取消')}}</el-button>
            <el-button type="primary" size="small" @click="submit" plain>提交</el-button>
        </span>
    <!--</el-dialog> -->
    </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
    name: "trustCaseConfirm",
    props: {
        cMeta: Object, // 布局相关数据
        cParentMeta: Object, // 父页面模板json数据
        cParentScope: Object, // 父页面每块区域业务数据
        cParentParams: Object, // 父页面自定义参数与内置参数
    },
    data(){
        return{
            waitTrustApplyInfo:{
                strategyApplid:"",
                branch_name:"",
                remark:"",
                is_over_set:"",
                waitAllocateCountInfo:[]
            },
            waitTrustForm:{
                remark:"",
            },
            prodTypeDict:[],  //申请状态字典
            allocatTypeDict:[], //账龄字典
            yesDict:[],
            waitTrustModelVisible:false,
            waitTrustrRules:{
                remark:[{required:true,message:"请输入备注",trigger:"blur"}],
            }
        }
    },
    created() {
        this.getDictList("E_PROD_TYPE","prodTypeDict");  //账龄字典
        this.getDictList("E_ALLOCATE_TYPE","allocatTypeDict");  //账龄字典
        this.getDictList("E_YES___","yesDict");  //账龄字典
        this.searchTeller();
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
        * 表格字典值转换
        */
        formatprodTypeData(value){
            let name = value;
            let data = value;
            this.prodTypeDict.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
        },
        formatAllocatTypeData(value){
            let name =value;
            let data = value;
            this.allocatTypeDict.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
        },
        formatYesData(value){
            let name =value;
            let data =value;
            this.yesDict.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
        },

        /**
        * 查询列表
        */
        searchTeller() {
            let reqMap = {
                servicecode: "RLMSPLTS1060", 
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                if (res && res.code === "200") {
                    this.waitTrustApplyInfo = res.data.waitTrustApplyInfo;
                    this.waitTrustForm.remark = this.waitTrustApplyInfo.remark;
                    this.waitTrustApplyInfo.waitAllocateCountInfo.forEach(item=>{
                        item.branch_name = this.waitTrustApplyInfo.branch_name;
                    })
                }
            }).catch(err => {
                console.error(err);
            });
        },
        tableRowClassName(row){
            if(row.is_over_set==="1"){
                return 'row-highLine';
            }
            return '';
        },
        /**
        * 关闭弹框
        */
        handleClose(){
            this.$confirm("是否确认关闭弹框?", "提示", {
                cancelButtonText: "取消",
                confirmButtonText: "确定",
                type: "warning"
            }).then(() => {
                this.$dialog.close();
            })
        },
        /**
        * 新申请策略提交
        */
        submit(){
            this.$refs.waitTrustForm.validate(valid => {
                if(!valid){
                    this.$message({type: "warning", message: "校验不通过"})
                    throw new Error("end");
                }
            })
            this.$confirm("是否提交确认委案申请?", "提示", {
                cancelButtonText: "取消",
                confirmButtonText: "确定",
                type: "warning"
            }).then(() => {
                this.waitTrustApplyInfo.remark = this.waitTrustForm.remark;
                let reqMap = {
                    servicecode: "RLMSPLTS1061", 
                    waitTrustApplyInfo:this.waitTrustApplyInfo,
                }
                MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                    if (res && res.code === "200") {
                        this.$message({type: "success",message: res.message});
                        this.$dialog.close();
                    }
                }).catch(err => {
                    console.error(err);
                });
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
         padding: 16px 40px 0 12px;
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
    max-height:60vh;
    overflow:auto;
}

.areaStrategy-basic,.areaStrategy-detail {
    padding: 16px 20px 0 0px;
}
.areaStrategy-detail {
    .el-form {
    padding: 0;
    }
    /deep/.el-collapse {
    .el-collapse-item__content {
        padding: 20px 80px 20px 20px;
    }
    }
}
.attachmentTab {
    min-height: 68.667px;
}

.businessRow{
    padding: 0px 0px 0 30px;
}

.row-highLine{
    color:red;
}
</style>
