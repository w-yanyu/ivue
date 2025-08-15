<template>
    <div>
        <div class="container-content">
            <div class="container-content--search">
                <el-button type="primary" @click="modifyStrategy()" plain>策略维护</el-button>
            </div>
            <div class="container-centent--table">
                <el-table ref="multipleTable" :data="tableData" :border="true" style="width: 100%" stripe >
                    <el-table-column label="业绩归属" prop="branch_name" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column label="账龄" prop="acctDurationName" width="500" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column label="委案期限" prop="deadlineTypeName"  align="center" show-overflow-tooltip></el-table-column>
                </el-table>
            </div>
        </div>

        <el-dialog title="策略维护" :visible.sync="strategyModelVisible" :show-close="true" :before-close="handleClose" width="1200px" :append-to-body="true">
            <div class="el-dialog-dev" >
                <div class="container-content">
                    <div class="container-content--search">
                        <el-button type="primary" @click="addLast()" plain>新增委案配置</el-button>
                    </div>
                    <div class="container-centent--table">
                        <el-table ref="modifyTable" :data="tableModifyData" :border="true" stripe >
                            <el-table-column label="业绩归属" prop="branchName" align="center" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.branch_id" v-if="scope.row.status"  placeholder="请选择业绩归属">
                                        <el-option  v-for="(item, index) in branchIdList" :key="index" :label="item.dictName" :value="item.dictId"></el-option>
                                    </el-select>
                                    <span v-else>{{scope.row.branch_name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="账龄" prop="acctDuration" width="360" align="center">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.acctDuration" multiple v-if="scope.row.status"  placeholder="请选择账龄">
                                        <el-option  v-for="(item, index) in acctDurationList" :key="index" :label="item.dictName" :value="item.dictId"></el-option>
                                    </el-select>
                                    <span v-else>{{scope.row.acctDurationName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="委案期限" prop="deadlineTypeModify"  align="center" show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.deadlineType" v-if="scope.row.status"  placeholder="请选择委案期限">
                                        <el-option  v-for="(item, index) in deadlineTypeList" :key="index" :label="item.dictName" :value="item.dictId"></el-option>
                                    </el-select>
                                    <span v-else>{{scope.row.deadlineTypeName}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" align="center" width="240">
                                <template slot-scope="scope">
                                    <el-button type="text" icon="el-icon-edit" @click="scope.row.status=true">修改</el-button>
                                    <el-button type="text" icon="el-icon-check" @click="saveRow(scope.$index,scope.row)">{{$i18ns('保存')}}</el-button>
                                    <el-button type="text" icon="el-icon-delete" @click="deleteRow(scope.$index,scope.row)">{{$i18ns('删除')}}</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="handleClose">{{$i18ns('取消')}}</el-button>
                <el-button type="primary" size="small" @click="submit" plain>提交</el-button>
            </span>
        </el-dialog>
    </div>
</template>


<script>
import MyAxios from "pte-ui/utils/MyAxios";
import _ from "lodash";

export default {
    name: "quarterManagement",
    props: {
        cMeta: Object, // 布局相关数据
        cParentMeta: Object, // 父页面模板json数据
        cParentScope: Object, // 父页面每块区域业务数据
        cParentParams: Object, // 父页面自定义参数与内置参数
    },
    data(){
        return{
            tableData:[], //总部委案所有列表数据
            tableModifyData:[], //策略修改后的数据
            strategyModelVisible:false, //修改界面
            branchIdList:[],//机构字典
            acctDurationList:[], //账龄字典
            deadlineTypeList:[] ,//委外期限字典
        }
    },
    created() {
        this.getDictList("E_STRATEGY_TYPE","branchIdList");  //机构字典
        this.getDictList("E_ACCT_DURATION","acctDurationList");  //账龄字典
        this.getDictList("E_DEADLINE_TYPE","deadlineTypeList");  //委外期限字典
        this.queryHeadStrategy();
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
        * 查询生效策略
        */
        queryHeadStrategy(){
            let params2 = {
                servicecode: "pl1151",
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params2).then(response => {
                if (response && response.code === "200" ) {
                    response.data.strategyAll.forEach(item=>{
                        let strategy={};
                        strategy.branch_id = item.branch_id;
                        strategy.branch_name =this.getDictName(item.branch_id,this.branchIdList) ;
                        strategy.deadlineTypeName =this.getDictName(item.deadlineType,this.deadlineTypeList) ;
                        strategy.acctDurationName = this.getAcctDurationName(item.acctDuration);
                        strategy.deadlineType = item.deadlineType;
                        strategy.acctDuration = item.acctDuration;
                        strategy.status = false;
                        this.tableData.push(strategy);
                    })
                }
            }).catch(err1 => {
                console.error(err1);
            })

        },
        /**
        * 修改策略
        */
        modifyStrategy(){
            this.tableModifyData = _.cloneDeep(this.tableData);
            this.strategyModelVisible = true;
        },
        /**
        * 取消修改策略
        */
        handleClose(){
            this.$confirm("是否确认关闭策略维护界面?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.tableModifyData = [];
                this.strategyModelVisible = false;
            })

        },
        submit(){
            let existModify = false;
            for(let i =0;i<this.tableModifyData.length;i++){
                let item = this.tableModifyData[i];
                if(item.status==true){
                    existModify = true;
                }
                if(!item.branch_id || item.branch_id.length===0){
                    this.$message({type: "warning", message: "请选择业绩归属！"});
                    return;
                }
                if(!item.acctDuration || item.acctDuration.length===0){
                    this.$message({type: "warning", message: "请选择账龄！"});
                    return;
                }
                if(!item.deadlineType || item.deadlineType.length===0){
                    this.$message({type: "warning", message: "请选择委案期限！"});
                    return;
                }
            };
            if(existModify){
                this.$confirm("存在未保存的策略修改，是否继续提交?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    this.requestRlms();
                })
            }else{
                this.requestRlms();
            }

        },
        requestRlms(){
            this.$confirm("是否确认提交策略维护申请?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                let params2 = {
                    servicecode: "pl1154",
                    strategy: this.tableModifyData,
                }
                MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params2).then(response => {
                    if (response && response.code === "200" ) {
                        this.tableModifyData = [];
                        this.strategyModelVisible = false;
                        this.$message({type: "success",message: response.message});
                    }
                }).catch(err1 => {
                    console.error(err1);
                })
            })

        },
        /**
        * 新增行数据
        */
        addLast(){
            let addData = {
                branch_id:"",
                branch_name:"",
                acctDuration:[],
                acctDurationName:"",
                deadlineType:"",
                deadlineTypeName:"",
                status:true,
            };
            this.tableModifyData.push(addData);
            this.$message({
                type: "success",
                message: "添加成功！"
            })
        },

        /**
        * 保存行数据
        */
        saveRow(index,row){
            if(!row.status){
                this.$message({type: "warning", message: "请先修改再保存！"});
                return;
            }
            if(!row.branch_id || row.branch_id.length===0){
                this.$message({type: "warning", message: "请选择业绩归属！"});
                return;
            }
            if(!row.acctDuration || row.acctDuration.length===0){
                this.$message({type: "warning", message: "请选择账龄！"});
                return;
            }
            if(!row.deadlineType || row.deadlineType.length===0){
                this.$message({type: "warning", message: "请选择委案期限！"});
                return;
            }
            row.branch_name =this.getDictName(row.branch_id,this.branchIdList) ;
            row.deadlineTypeName =this.getDictName(row.deadlineType,this.deadlineTypeList) ;
            row.acctDurationName = this.getAcctDurationName(row.acctDuration);
            this.tableModifyData[index] = row;
            this.tableModifyData[index].status = false;
            this.$message({
                type: "success",
                message: "保存成功！"
            })
        },
        /**
        * 删除行数据
        */
        deleteRow(index,row){
            this.tableModifyData.splice(index,1);
            this.$message({
                type: "success",
                message: "删除成功！"
            })

        },
        /**
        * 获取字典名称
        */
        getDictName(dictId,dictList){
            let dictType = {};
            dictType = dictList.find(item=>{return item.dictId===dictId;})
            return dictType.dictName;
        },
        getAcctDurationName(acctDuration){
            let that = this;
            let acctDurationName = [];
            acctDuration.forEach(item=>{
                let dictType = {};
                dictType = this.acctDurationList.find(item1=>{return item1.dictId===item});
                acctDurationName.push(dictType.dictName);
            })
            return acctDurationName.join();
        },
    }
}
</script>


<style lang="less" scoped>
.container-content {
    .container-content--search {
        padding: 16px 40px 0 12px;
        border-bottom: 0px solid #e3e8f5;
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
        bottom:60px;
    }
}
.el-dialog-dev{
    max-height:60vh;
    overflow:auto;
}

</style>
