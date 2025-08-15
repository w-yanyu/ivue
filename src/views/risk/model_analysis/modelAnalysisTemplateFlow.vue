<template>
    <div 
        style="box-sizing: 
        border-box">
        <!--  规则流  -->
        <el-tabs
            v-model="activeName"
            type="card"
            @tab-click="handleClick"
            style="margin: 0px 0px !important;">
            <el-tab-pane label="简单评分卡" name="1">
                <el-row type="flex" justify="space-between">
                    <el-col :span="4">
                        <!--  规则流Tab具体模型列表 -->
                        <el-table
                            :data="templateLeftData.PF"
                            style="margin: 0px 0px !important;"
                            :border="true"
                            :show-header="false"
                            highlight-current-row
                            @row-click="rowClick">
                            <el-table-column
                                prop="score_model_code"
                                label="代码"
                                align="center"
                                min-width="20px">
                            </el-table-column>
                            <el-table-column
                                prop="model_name"
                                label="名称"
                                align="center"
                                min-width="20px">
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span="20">
                        
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="复杂评分卡" name="2">
                <el-row type="flex" justify="space-between">
                    <el-col :span="4">
                        <!--  规则流Tab具体模型列表 -->
                        <el-table
                            :data="templateLeftData.PC"
                            style="margin: 0px 0px !important;"
                            :border="true"
                            :show-header="false"
                            highlight-current-row
                            @row-click="rowClick">
                            <el-table-column
                                prop="score_model_code"
                                label="代码"
                                align="center"
                                min-width="20px">
                            </el-table-column>
                            <el-table-column
                                prop="model_name"
                                label="名称"
                                align="center"
                                min-width="20px">
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span="20">
                        
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="规则" name="3">
                <el-row type="flex" justify="space-between">
                    <el-col :span="4">
                    <!--  规则流Tab具体模型列表 -->
                    <el-table
                        :data="templateLeftData.PT"
                        style="margin: 0px 0px !important;"
                        :border="true"
                        :show-header="false"
                        highlight-current-row
                        @row-click="rowClick">
                        <el-table-column
                            prop="score_model_code"
                            label="代码"
                            align="center"
                            min-width="20px">
                        </el-table-column>
                        <el-table-column
                            prop="model_name"
                            label="名称"
                            align="center"
                            min-width="20px">
                        </el-table-column>
                    </el-table>
                    </el-col>
                    <el-col :span="20">
                        
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="规则组" name="4">
                <el-row type="flex" justify="space-between">
                    <el-col :span="4">
                    <!--  规则流Tab具体模型列表 -->
                    <el-table
                        :data="templateLeftData.PZ"
                        style="margin: 0px 0px !important;"
                        :border="true"
                        :show-header="false"
                        highlight-current-row
                        @row-click="rowClick">
                        <el-table-column
                            prop="score_model_code"
                            label="代码"
                            align="center"
                            min-width="20px">
                        </el-table-column>
                        <el-table-column
                            prop="model_name"
                            label="名称"
                            align="center"
                            min-width="20px">
                        </el-table-column>
                    </el-table>
                    </el-col>
                    <el-col :span="20">
                        
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="规则树" name="5">
                <el-row type="flex" justify="space-between">
                    <el-col :span="4">
                    <!--  规则流Tab具体模型列表 -->
                    <el-table
                        :data="templateLeftData.GS"
                        style="margin: 0px 0px !important;"
                        :border="true"
                        :show-header="false"
                        highlight-current-row
                        @row-click="rowClick">
                        <el-table-column
                            prop="score_model_code"
                            label="代码"
                            align="center"
                            min-width="20px">
                        </el-table-column>
                        <el-table-column
                            prop="model_name"
                            label="名称"
                            align="center"
                            min-width="20px">
                        </el-table-column>
                    </el-table>
                    </el-col>
                    <el-col :span="20">
                        
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
/**
 * 模型分析模板，主要用于负责显示规则流数据
 */
import MyAxios from "pte-ui/utils/MyAxios";
export default {
    name: "modelAnalysisTemplateFlow",
    props: {
        cMeta: Object, //本页面模板json数据Layout对象
        cParentMeta: Object, //父页面模板json数据Layout对象
        cParentParams: Object, //父页面自定义参数与内置参数
        cParentScope: Object, //父页面每块区域业务数据
    },
    components: {
        
    },
    data() {
        return {
            // 当前的规则流-选项卡显示tab, 1=简单评分卡,2=复杂评分卡,2=普通规则,3=普通规则组,4=规则树
            activeName: "1", 
            // 上一次表单内容
            lastRuleForm: "",
            // TAB Model Type List
            activeTabModelType: [
                "PF",
                "PC",
                "PT",
                "PZ",
                "GS"
            ],
            // 侧边栏数据(默认)
            defaultTemplateLeftData: {
                "PF": [],
                "PC": [],
                "PT": [],
                "PZ": [],
                "GS": []
            },
            // 侧边栏数据
            templateLeftData: {
                "PF": [],
                "PC": [],
                "PT": [],
                "PZ": [],
                "GS": []
            },
            // 模型详情
            isModelAnalysisDetailsShow: false
        }
    },
    created() {
        this.init('GL', this.cParentParams);
    },
    methods: {
        /**
         * 初始化查询
         */
        async init(modelType, param) {
            console.log('init modelType', modelType);
            console.log('init param', param);
            this.lastRuleForm = param;
            this.resetData();
            this.templateLeftData = await this.queryData();
            console.log('init templateLeftData', this.templateLeftData);
        },
        /**
         * 重置数据
         */
        resetData() {
            this.templateLeftData = this.defaultTemplateLeftData;
            // 恢复TAB
            this.activeName = '1';
        },
        /**
         * 侧边栏数据提交查询
         */
        search(param) {
            console.log('search param', param);

            this.$dataBus.bindCallBackMethod(this, {});
            this.$dialog.open({
                that: this,
                title: "详情",
                toRequest: {
                    url: "@ModelAnalysisDetail",
                    method: "get",
                    params: param,
                },
                width: "77%",
            });
        },
        rowClick(row, column, cell, event) {
            console.log('row', row);
            console.log('column', column);
            console.log('cell', cell);
            console.log('event', event);
            
            let rowModeType = row.model_type; 
            let rowData = JSON.parse(JSON.stringify(row));
            let ruleForm = JSON.parse(JSON.stringify(this.lastRuleForm));
            ruleForm.model_code = rowData.score_model_code;
            ruleForm.parentModelType = ruleForm.model_type;
            ruleForm.model_type = rowModeType;
            console.log('ruleForm', ruleForm);
            console.log('Object.assign', Object.assign(rowData, ruleForm));
            this.search(Object.assign(rowData, ruleForm));
        },
        /**
         * 查询侧边栏数据
         */
        queryData() {
            // TODO MOCK
             if(this.lastRuleForm.call_count>10000){
                   this.$confirm("数据大于10000条", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "",
                        type: "warning"
                    }).then(() => {
                        this.$dialog.close();
                    }).catch(()=>{
                        this.$dialog.close();
                    })
                    return;
                }else{
                return new Promise((resolve, reject) => {
                    let params = {
                    branch_id: this.lastRuleForm.branch_id,
                    system_number_identification:
                        this.lastRuleForm.system_number_identification,
                    score_model_code: this.lastRuleForm.score_model_code,
                    rule_name: this.lastRuleForm.model_name,
                    model_type: this.lastRuleForm.model_type,
                    transaction_start_time: this.cParentParams.transaction_start_time,
                    transaction_end_time: this.cParentParams.transaction_end_time,
                    start: this.lastRuleForm.currentPage,
                    length: this.lastRuleForm.pageSizes,
                    servicecode: "deci060129",
                };
                this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then(async (obj) => {
                    let data = obj.data.field_map;
                    resolve(data);
                })
                .catch((res) => {
                    console.error('获取模型数据错误！', res);
                   // this.$message.error("获取GL模型数据错误！");
                    resolve([]);
                });
            });
        }
        }
    }
};
</script>
<style lang="less" scoped>
.flex-row-center {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
</style>