<template>
    <div  class="container-content">
        <div class="areaStrategy-basic">
            <el-form ref="areaStrategyForm" :model="areaStrategyDetail" :rules="areaCenterRules" label-width="150px" class="custom-common--form">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="策略名称:"  prop="strategy_name" >
                            <el-input v-model="areaStrategyDetail.strategy_name" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="策略有效期:" prop="strategy_effective_time">
                            <el-date-picker
                                v-model="areaStrategyDetail.strategy_effective_time"
                                type="month"
                                format="yyyy-MM"
                                value-format="yyyyMM"
                                :disabled="true">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="areaStrategy-detail">
            <el-collapse v-model="otherActiveNames">
                <el-collapse-item name="1">
                    <template slot="title">
                        <span><em></em>委案设置（非好客贷）</span>
                    </template>
                    <el-form ref="otherAreaStrategyDetail" :model.sync="areaStrategyDetail" :rules="areaCenterRules"  label-width="120px" class="custom-common--form">
                        <div v-for="(otherDetailItem,otherDetailIndex) in areaStrategyDetail.otherAllocateDetail" :key = "otherDetailIndex">
                            <el-row>
                                <el-col :span="9">
                                    <el-form-item label="账龄区间："  >
                                        <span>{{otherDetailItem.acctDurationName}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="分配方式：" :prop="'otherAllocateDetail.'+otherDetailIndex+'.allocate_type'"  :rules="areaCenterRules.allocate_type">
                                        <el-radio v-model="otherDetailItem.allocate_type" :key="1" :label="1" :disabled="true">按贷余比例分</el-radio>
                                        <el-radio v-model="otherDetailItem.allocate_type" :key="2" :label="2" :disabled="true">按笔数比例分</el-radio>

                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row v-for= "(otherItem,otherIndex) in otherDetailItem.companyAllocateDetail" :key = "otherIndex"  class="businessRow">
                                <el-col :span="8">
                                    <el-form-item label="催收公司："  >
                                        <span>{{otherItem.oa_org_name}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="分配比例(%)：" 
                                    :prop="'otherAllocateDetail.'+otherDetailIndex+'.companyAllocateDetail.'+otherIndex+'.allocate_percent'"
                                    :rules="areaCenterRules.allocate_percent">
                                        <el-input-number type="number" v-model.number="otherItem.allocate_percent" precision="2" :disabled="true"></el-input-number>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="到期日："
                                    :prop="'otherAllocateDetail.'+otherDetailIndex+'.companyAllocateDetail.'+otherIndex+'.deadline_time'"
                                    :rules="areaCenterRules.deadline_time" :required="otherItem.allocate_percent==0?false:true">
                                        <el-input v-model="otherItem.deadline_time" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
            <el-collapse v-model="hkdActiveNames">
                <el-collapse-item name="1">
                    <template slot="title">
                        <span><em></em>委案设置（好客贷）</span>
                    </template>
                    <el-form ref="hkdAreaStrategyDetail" :model.sync="areaStrategyDetail" :rules="areaCenterRules" label-width="120px" class="custom-common--form">
                        <div v-for="(hkdDetailItem,hkdDetailIndex) in areaStrategyDetail.hkdAllocateDetail" :key = "hkdDetailIndex">
                            <el-row>
                                <el-col :span="9">
                                    <el-form-item label="账龄区间："  >
                                        <span>{{hkdDetailItem.acctDurationName}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="分配方式：" :prop="'hkdAllocateDetail.'+hkdDetailIndex+'.allocate_type'"  :rules="areaCenterRules.allocate_type">
                                        <el-radio v-model="hkdDetailItem.allocate_type" :key="1" :label="1" :disabled="true">按贷余比例分</el-radio>
                                        <el-radio v-model="hkdDetailItem.allocate_type" :key="2" :label="2" :disabled="true">按笔数比例分</el-radio>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row v-for= "(hkdItem,hkdIndex) in hkdDetailItem.companyAllocateDetail" :key = "hkdIndex" class="businessRow">
                                <el-col :span="8">
                                    <el-form-item label="催收公司："  >
                                        <span>{{hkdItem.oa_org_name}}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="分配比例(%)："
                                    :prop="'hkdAllocateDetail.'+hkdDetailIndex+'.companyAllocateDetail.'+hkdIndex+'.allocate_percent'"
                                    :rules="areaCenterRules.allocate_percent">
                                        <el-input-number type="number" v-model.number="hkdItem.allocate_percent" precision="2" :disabled="true"></el-input-number>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="8">
                                    <el-form-item label="到期日：" 
                                    :prop="'hkdAllocateDetail.'+hkdDetailIndex+'.companyAllocateDetail.'+hkdIndex+'.deadline_time'"
                                    :rules="areaCenterRules.deadline_time" :required="hkdItem.allocate_percent==0?false:true">
                                        <el-input v-model="hkdItem.deadline_time" :disabled="true"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </el-form>
                </el-collapse-item>
            </el-collapse> 
        </div>
    </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
    name: "areaCenterManageView",
    props: {
        cMeta: Object, // 布局相关数据
        cParentMeta: Object, // 父页面模板json数据
        cParentScope: Object, // 父页面每块区域业务数据
        cParentParams: Object, // 父页面自定义参数与内置参数
    },
    data(){
        var validateDeadlineTime = (rule,value,callback)=>{
            var indexList = rule.field.split('.');
            let percent = 0;
            if(indexList[0]==="otherAllocateDetail"){
                percent = this.areaStrategyDetail.otherAllocateDetail[indexList[1]].companyAllocateDetail[indexList[3]].allocate_percent;
            }else{
                percent = this.areaStrategyDetail.hkdAllocateDetail[indexList[1]].companyAllocateDetail[indexList[3]].allocate_percent;
            }
            if(percent!=0&&!value){
                callback(new Error("请输入到期日"));
            }
            callback();
        }
        return{
            areaStrategyDetail:{
                applid:"",
                branch_id:"",
                branch_name:"",
                strategy_name:"",
                strategy_effective_time:"",
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
            otherActiveNames:["1","2"],
            hkdActiveNames:["1","2"],
            tableSize: 10,
            acctDurationDict:[], //账龄字典
            areaCenterRules:{
                strategy_name:[{required:true,message:"请输入策略名称",trigger:"blur"}],
                strategy_effective_time:[{required:true,message:"请输入策略有效期",trigger:"blur"}],
                allocate_type:[{required:true,message:"请输入分配方式",trigger:"blur"}],
                allocate_percent:[{required:true,message:"请输入分配比例",trigger:"blur"}],
                deadline_time:[{validator:validateDeadlineTime,trigger:"change"}],
            },
        }
    },
    created() {
        this.getDictList("E_ACCT_DURATION","acctDurationDict");  //账龄字典
        this.queryStrategy();
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
        * 查询已申请策略详情
        */
        queryStrategy(row){
            let reqMap = {
                servicecode: "pl1158", 
                applid: (this.cParentParams.applid ? this.cParentParams.applid : this.$dataBus.getCurrentcParams(this).data_applid),
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
                if (res && res.code === "200") {
                    this.areaStrategyDetail.applid= res.data.areaStrategyDetail.applid;
                    this.areaStrategyDetail.branch_id= res.data.areaStrategyDetail.branch_id;
                    this.areaStrategyDetail.branch_name= res.data.areaStrategyDetail.branch_name;
                    this.areaStrategyDetail.strategy_name= res.data.areaStrategyDetail.strategy_name;
                    this.areaStrategyDetail.strategy_effective_time= res.data.areaStrategyDetail.strategy_effective_time;
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
                    this.true = true;
                    this.areaStrategyModelVisible = true;
                }
            }).catch(err => {
                console.error(err);
            });
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
