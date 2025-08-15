<template>
    <div class="container-content">
        <div class="container-centent--table">
            <el-table ref="multipleTable" :data="tabledata" :border="true" style="width: 100%" stripe >
                <el-table-column label="业绩归属" prop="branch_name" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column label="账龄" prop="acctDurationName" width="500" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column label="委案期限" prop="deadlineTypeName"  align="center" show-overflow-tooltip></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
import _ from "lodash";

export default {
    name: "quarterManageView",
    props: {
        cMeta: Object, // 布局相关数据
        cParentMeta: Object, // 父页面模板json数据
        cParentScope: Object, // 父页面每块区域业务数据
        cParentParams: Object, // 父页面自定义参数与内置参数
    },
    data(){
        return{
            currentPage: 1,
            tableTotal: 10,
            tableSize: 10,
            tabledata:[], //总部委案列表数据
            branchIdList:[],//机构字典
            acctDurationList:[], //账龄字典
            deadlineTypeList:[] ,//委外期限字典
        }
    },
    created() {
        this.getDictList("E_STRATEGY_TYPE","branchIdList");  //机构字典
        this.getDictList("E_ACCT_DURATION","acctDurationList");  //账龄字典
        this.getDictList("E_DEADLINE_TYPE","deadlineTypeList");  //委外期限字典
        this.queryApplyHeadStrategy();
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
        * 查询申请中策略
        */
        queryApplyHeadStrategy(){
            let params2 = {
                servicecode: "pl1152",
                applid:this.cParentParams.applid,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params2).then(response => {
                if (response && response.code === "200" ) {
                    response.data.strategyAll.forEach(item=>{
                        let strategy = {};
                        strategy.branch_id = item.branch_id;
                        strategy.branch_name =this.getDictName(item.branch_id,this.branchIdList) ;
                        strategy.deadlineTypeName =this.getDictName(item.deadlineType,this.deadlineTypeList) ;
                        strategy.acctDurationName = this.getAcctDurationName(item.acctDuration);
                        strategy.deadlineType = item.deadlineType;
                        strategy.acctDuration = item.acctDuration;
                        this.tabledata.push(strategy);
                    })
                }
            }).catch(err1 => {
                console.error(err1);
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
    }
}
.container-footer {
    width: 50px;
    margin: 0 auto;
    padding: 10px;
}
.button-footer {
  text-align: center;
  padding: 20px;
}
</style>
