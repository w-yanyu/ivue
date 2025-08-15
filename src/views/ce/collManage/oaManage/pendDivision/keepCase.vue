<template>
    <div>
        <div class="container-content">
            <div class="container-content--search">
                <el-form :model="strategyForm" ref="strategyForm"  label-width="150px" class="custom-common--form">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="策略名称"  prop="strategy_name" >
                                <el-input v-model="strategyForm.strategy_name" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="策略状态" prop="apply_status">
                                <el-select v-model="strategyForm.apply_status" placeholder="请选择策略状态">
                                    <el-option
                                    v-for="(item, index) in applyStatusList"
                                    :key="index"
                                    :label="item.dictId+'-'+item.dictName"
                                    :value="item.dictId"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>  
                        <el-col :span="7">
                            <el-form-item label="策略有效期" prop="effectiveTime">
                                <el-date-picker
                                    v-model="strategyForm.effectiveTime"
                                    type="daterange"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    format="yyyy-MM-dd"
                                    value-format="yyyyMMdd">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>  
                    <el-row class="button-footer">
                        <el-col :span="24">
                            <el-button type="primary" @click="searchTeller">查询</el-button>
                            <el-button type="primary" @click="searchTeller">{{$i18ns('重置')}}</el-button>
                        </el-col>
                    </el-row>                              
                </el-form>
            </div>
            <div class="container-centent--table">
                <el-table ref="multipleTable" :data="areaStrategyApplyList" :border="true" style="width: 100%">
                    <el-table-column label="区域中心"  prop="branch_name"  align="center" show-overflow-tooltip> </el-table-column>
                    <el-table-column label="策略名称"  prop="strategy_name"  align="center" show-overflow-tooltip> </el-table-column>
                    <el-table-column label="策略状态" prop="apply_status" :formatter="formatStatusData"  align="center" show-overflow-tooltip> </el-table-column>
                    <el-table-column :label="$i18ns('申请人')" prop="apply_user_name"  align="center" show-overflow-tooltip> </el-table-column>
                    <el-table-column :label="$i18ns('申请时间')" prop="apply_time"  align="center" show-overflow-tooltip> </el-table-column>
                    <el-table-column label="策略有效期" prop="effective_time"  align="center" show-overflow-tooltip> </el-table-column>
                    <el-table-column label="操作"  align="center" show-overflow-tooltip> 
                        <template slot-scope="scope">
                            <el-button type="text" @click="queryStrategy(scope.row)">{{$i18ns('查看')}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="container-content--pagination">
                <el-pagination v-if="areaStrategyApplyList.length>0"
                @size-change="sizeChange"
                @current-change="currentChange"
                :current-page="currentPage"
                :page-sizes="[10,15,20,30]"
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

export default {
    name: "keepCase",
    props: {
        cMeta: Object, // 布局相关数据
        cParentMeta: Object, // 父页面模板json数据
        cParentScope: Object, // 父页面每块区域业务数据
        cParentParams: Object, // 父页面自定义参数与内置参数
    },
    data(){
        return{
            strategyForm:{
                strategy_name:"",
                apply_status:"",
                effectiveTime:"",
            },
            areaStrategyApplyList:[],
            areaStrategyDetail:{
                applid:"",
                branch_id:"",
                branch_name:"",
                strategy_name:"",
                strategy_start_time:"",
                strategy_end_time:"",
                new_ratio_max:"",
                new_ratio_min:"",
                otherAllocateDetail:[{
                    acctDuration:"",
                    acctDurationName:"",
                    allocate_type:"",
                    deadlineType:"",
                    deadline_time_list:[],
                    companyAllocateDetail:[{
                        oa_org_id:"",
                        oa_org_name:"",
                        allocate_percent:"",
                        deadline_time:"",
                    }]
                }],
                hkdAllocateDetail:[{
                    acctDuration:"",
                    acctDurationName:"",
                    allocate_type:"",
                    deadlineType:"",
                    deadline_time_list:[],
                    companyAllocateDetail:[{
                        oa_org_id:"",
                        oa_org_name:"",
                        allocate_percent:"",
                        deadline_time:"",
                    }]
                }],
            },
            enableEdit:false,
            otherActiveNames:["1","2"],
            hkdActiveNames:["1","2"],
            areaStrategyModelVisible:false,
            currentPage: 1,
            tableTotal: 10,
            startPickerOption:{
                disabledDate(time){
                    return time.getTime>Date.now()-8.64e6
                }
            },
            applyStatusList:[],  //申请状态字典
            tableSize: 10,
            acctDurationDict:[], //账龄字典
            areaCenterRules:{
                strategy_name:[{required:true,message:"请输入策略名称",trigger:"blur"}],
                strategy_start_time:[{required:true,message:"请输入策略起始有效期",trigger:"blur"}],
                strategy_end_time:[{required:true,message:"请输入策略截止有效期",trigger:"blur"}],
                allocate_type:[{required:true,message:"请输入分配方式",trigger:"blur"}],
                allocate_percent:[{required:true,message:"请输入分配比例",trigger:"blur"}],
                deadline_time:[{required:true,message:"请选择到期日",trigger:"blur"}],
            },
        }
    },
    created() {
        this.getDictList("E_APPLYSTATUS","applyStatusList");
        this.getDictList("E_ACCT_DURATION","acctDurationDict");  //账龄字典
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
        formatStatusData(row,column){
            let name = row[column.property];
            let data = row[column.property];
            this.applyStatusList.forEach(function(item,index){
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
            this.searchTeller();
        },
        /**
        * 分页currentChange回调
        */
        currentChange(val) {
            this.currentPage = val;
            this.searchTeller();
        },
        /**
        * 查询列表
        */
        searchTeller() {
            let reqMap = {
                strategy_name: this.strategyForm.strategy_name,
                apply_status: this.strategyForm.apply_status,
                strategy_start_time: this.strategyForm.effectiveTime[0],
                strategy_end_time:this.strategyForm.effectiveTime[1],
                servicecode: "pl1157", 
                start: this.currentPage,
                length: this.tableSize,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                if (res && res.code === "200") {
                    this.areaStrategyApplyList = res.data.areaStrategyApplyList;
                    this.tableTotal = res.pageParam ? res.pageParam.total : 0;
                    
                }
            }).catch(err => {
                console.error(err);
            });
        },
        /**
        * 查询已申请策略详情
        */
        queryStrategy(row){
            let reqMap = {
                servicecode: "pl1158", 
                applid:row.applid,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                if (res && res.code === "200") {
                    this.areaStrategyDetail.applid= res.data.areaStrategyDetail.applid;
                    this.areaStrategyDetail.branch_id= res.data.areaStrategyDetail.branch_id;
                    this.areaStrategyDetail.branch_name= res.data.areaStrategyDetail.branch_name;
                    this.areaStrategyDetail.strategy_name= res.data.areaStrategyDetail.strategy_name;
                    this.areaStrategyDetail.strategy_start_time= res.data.areaStrategyDetail.strategy_start_time;
                    this.areaStrategyDetail.strategy_end_time= res.data.areaStrategyDetail.strategy_end_time;
                    this.areaStrategyDetail.new_ratio_max= res.data.areaStrategyDetail.new_ratio_max;
                    this.areaStrategyDetail.new_ratio_min= res.data.areaStrategyDetail.new_ratio_min;
                    this.areaStrategyDetail.otherAllocateDetail= res.data.areaStrategyDetail.otherAllocateDetail;
                    this.areaStrategyDetail.otherAllocateDetail.forEach(item=>{
                        item.allocate_type=Number(item.allocate_type);
                        item.acctDurationName = this.getAcctDurationName(item.acctDuration);
                    });
                    this.areaStrategyDetail.hkdAllocateDetail= res.data.areaStrategyDetail.hkdAllocateDetail;
                    this.areaStrategyDetail.hkdAllocateDetail.forEach(item=>{
                        item.allocate_type=Number(item.allocate_type);
                        item.acctDurationName = this.getAcctDurationName(item.acctDuration);
                    })
                    this.enableEdit = true;
                    this.areaStrategyModelVisible = true;
                }
            }).catch(err => {
                console.error(err);
            });
        },
        /**
        * 关闭弹框
        */
        handleClose(){
            this.$confirm("是否确认关闭弹框?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {
                this.enableEdit = false;
                this.areaStrategyModelVisible = false;
            })
        },
        /**
        * 新申请委案策略查询动态数据
        */
        addStrategy(){
            let reqMap = {
                servicecode: "pl1155", 
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                if (res && res.code === "200") {
                    this.areaStrategyDetail.applid= res.data.areaStrategyDetail.applid;
                    this.areaStrategyDetail.branch_id= res.data.areaStrategyDetail.branch_id;
                    this.areaStrategyDetail.branch_name= res.data.areaStrategyDetail.branch_name;
                    this.areaStrategyDetail.strategy_name= res.data.areaStrategyDetail.strategy_name;
                    this.areaStrategyDetail.strategy_start_time= res.data.areaStrategyDetail.strategy_start_time;
                    this.areaStrategyDetail.strategy_end_time= res.data.areaStrategyDetail.strategy_end_time;
                    this.areaStrategyDetail.new_ratio_max= res.data.areaStrategyDetail.new_ratio_max;
                    this.areaStrategyDetail.new_ratio_min= res.data.areaStrategyDetail.new_ratio_min;
                    this.areaStrategyDetail.otherAllocateDetail= res.data.areaStrategyDetail.otherAllocateDetail;
                    this.areaStrategyDetail.hkdAllocateDetail= res.data.areaStrategyDetail.hkdAllocateDetail;
                    this.areaStrategyDetail.otherAllocateDetail.forEach(item=>{
                        item.acctDurationName = this.getAcctDurationName(item.acctDuration);
                    });
                    this.areaStrategyDetail.hkdAllocateDetail.forEach(item=>{
                        item.acctDurationName = this.getAcctDurationName(item.acctDuration);
                    });
                    this.areaStrategyModelVisible = true;
                }
            }).catch(err => {
                console.error(err);
            });
        },
        /**
        * 新申请策略提交
        */
        submit(){
            try{
                this.$refs.areaStrategyForm.validate(valid => {
                    if(!valid){
                        this.$message({type: "warning", message: "校验不通过"})
                        throw new Error("end");
                    }
                })
                this.$refs.otherAreaStrategyDetail.validate(valid => {
                    if(!valid){
                        this.$message({type: "warning", message: "校验不通过"})
                        throw new Error("end");
                    }
                })
                this.$refs.hkdAreaStrategyDetail.validate(valid => {
                    if(!valid){
                        this.$message({type: "warning", message: "校验不通过"})
                        throw new Error("end");
                    }
                })
                this.areaStrategyDetail.otherAllocateDetail.forEach(item=>{
                    let percentCount=0;
                    let notZeroOrg = 0;
                    item.companyAllocateDetail.forEach(company=>{
                        if(Number(company.allocate_percent)!=0){ notZeroOrg=notZeroOrg+1; }
                        percentCount=(Number(percentCount)*100+Number(company.allocate_percent)*100)/100;
                    })
                    if(notZeroOrg!=0){
                        let avgRatio = parseFloat(100/notZeroOrg).toFixed(2);
                        let maxRatio =  Number(avgRatio * Number(this.areaStrategyDetail.new_ratio_max)/100).toFixed(2); 
                        let minRatio =  Number(avgRatio * Number(this.areaStrategyDetail.new_ratio_min)/100).toFixed(2); 
                        item.companyAllocateDetail.forEach(company=>{
                            if(Number(company.allocate_percent)!=0&&(Number(company.allocate_percent)>maxRatio 
                            || Number(company.allocate_percent)< Number(minRatio))){
                                this.$message({type: "warning", message: "非好客贷账龄："+item.acctDuration+"中"+company.oa_org_name+"分配比例超过委案比例限制！"});
                                throw new Error("end");
                            }
                        });
                    }
                    if(percentCount>100){
                        this.$message({type: "warning", message: "非好客贷账龄："+item.acctDuration+"总分配比例超过100%！"});
                        throw new Error("end");
                    }
                })
                
                this.areaStrategyDetail.hkdAllocateDetail.forEach(item=>{
                    let percentCount=0;
                    let notZeroOrg = 0;
                    item.companyAllocateDetail.forEach(company=>{
                        if(Number(company.allocate_percent)!=0){ notZeroOrg=notZeroOrg+1; }
                        percentCount=(Number(percentCount)*100+Number(company.allocate_percent)*100)/100;
                    })
                    if(notZeroOrg!=0){
                        let avgRatio = parseFloat(100/notZeroOrg).toFixed(2);
                        let maxRatio =  Number(avgRatio * Number(this.areaStrategyDetail.new_ratio_max)/100).toFixed(2); 
                        let minRatio =  Number(avgRatio * Number(this.areaStrategyDetail.new_ratio_min)/100).toFixed(2); 
                        item.companyAllocateDetail.forEach(company=>{
                            if(Number(company.allocate_percent)!=0&&(Number(company.allocate_percent)> maxRatio
                            || Number(company.allocate_percent)<minRatio)){
                                this.$message({type: "warning", message: "好客贷账龄："+item.acctDuration+"中"+company.oa_org_name+"分配比例超过委案比例限制！"});
                                throw new Error("end");
                            }
                        });
                    }
                    if(percentCount>100){
                        this.$message({type: "warning", message: "好客贷账龄："+item.acctDuration+"总分配比例超过100%！"});
                        throw new Error("end");
                    }

                   
                })
                this.$confirm("是否确认提交?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(() => {
                    let reqMap = {
                        servicecode: "pl1156", 
                        areaStrategyDetail:this.areaStrategyDetail,
                        apply_user:JSON.parse(localStorage.user_info).userCode, 
                        apply_user_name:JSON.parse(localStorage.user_info).userName,
                    }
                    MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                        if (res && res.code === "200") {
                            this.enableEdit = false;
                            this.areaStrategyModelVisible = false;
                        }
                    }).catch(err => {
                        console.error(err);
                    });
                })
                
            }catch(e){
                if(e.message!="end"){
                    console.error(e);
                }
            }

        },
        /**
        * 策略有效期截止日期动态取值
        */
        deadlineChange(value){
            if(this.areaStrategyDetail.strategy_end_time===""||value>this.areaStrategyDetail.strategy_end_time){
                this.areaStrategyDetail.strategy_end_time = value;
            }
            this.$refs.areaStrategyForm.validate(valid => {});
        },
        deadlineClick(value){
            if(value.length===0){
                this.$message({type: "warning", message: "请先输入策略起始有效期！"});
            }
        },
        /**
        * 到期日根据有效期起始日动态改变
        */
        changeStartTime(){
            let year = this.areaStrategyDetail.strategy_start_time.substring(0,4);
            let month = this.areaStrategyDetail.strategy_start_time.substring(5,7);
            let maxMonth = this.getQuarterLastMonth();
            this.areaStrategyDetail.otherAllocateDetail.forEach((item,index)=>{
                if(item.deadlineType==="Q"){
                    let tmpMonth = Number(month);
                    while(maxMonth>=tmpMonth){
                        let date = this.format("yyyy-MM-dd",new Date(year,tmpMonth,0))
                        item.deadline_time_list.push(date);
                        tmpMonth = tmpMonth+1;
                    }
                }else{
                    let date = this.format("yyyy-MM-dd",new Date(year,month,0))
                    //item.deadline_time = date;
                    //this.$set(this.areaStrategyDetail.otherAllocateDetail[index],'deadline_time',date);
                    item.deadline_time_list.push(date);
                }
            });
            this.areaStrategyDetail.hkdAllocateDetail.forEach((item,index)=>{
                if(item.deadlineType==="Q"){
                    let tmpMonth = Number(month);
                    while(maxMonth>=tmpMonth){
                        let date = this.format("yyyy-MM-dd",new Date(year,tmpMonth,5))
                        item.deadline_time_list.push(date);
                        tmpMonth = tmpMonth+1;
                    }
                }else{
                    let date = this.format("yyyy-MM-dd",new Date(year,month,5))
                    //this.$set(this.areaStrategyDetail.hkdAllocateDetail[index],'deadline_time',date)
                    //item.deadline_time = date;
                    item.deadline_time_list.push(date);
                }
            });
            //this.$forceUpdate();
            //console.log(this.areaStrategyDetail);
        },
        /**
        * 日期格式化
        */
        format(fmt,date) {
            //author: meizz
            var o = {
                'M+': date.getMonth() + 1, //月份
                'd+': date.getDate(), //日
                'H+': date.getHours(), //小时
                'h+': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
                'm+': date.getMinutes(), //分
                's+': date.getSeconds(), //秒
                'q+': Math.floor((date.getMonth() + 3) / 3), //季度
                S: date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp('(' + k + ')').test(fmt))
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
            return fmt;
        },
        getAcctDurationName(acctDuration){
            let acctDurationName = [];
            let acctDurationList=acctDuration.split(",");
            acctDurationList.forEach(item=>{
                let dictType = {};
                dictType = this.acctDurationDict.find(item1=>{return item1.dictId===item});
                acctDurationName.push(dictType.dictName);
            })
            return acctDurationName.join();
        },
        getQuarterLastMonth(){
            let date= new Date();
            let quarter = date.getMonth()%3===0?date.getMonth()/3:parseInt(date.getMonth()/3+1);
            return 3*quarter;
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

</style>
