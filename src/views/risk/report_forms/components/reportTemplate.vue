<template>
    <div 
        style="box-sizing: 
        border-box">
        <!--  标题栏  -->
        <div  
            v-if="templateTitleShow && templateType != -1"
            style="width: 100%;
                height: 36px;
                box-sizing: border-box;">
            <div
                style="background-color: #eaecf0; 
                color: #51627a; 
                height: 100%"
                class="flex-row-center">
                <label>
                    {{ templateInfo.prefixName }}{{ templateInfo.modelName }}
                </label>
            </div>
        </div> 

        <!--  简单评分卡、复杂评分卡  -->
        <el-table
            v-if="templateType == 1"
            style="margin: 0px 0px !important;"
            :data="templateData"
            :border="true"
            :show-header="true">
            <el-table-column
                type="index"
                :index="indexMethed"
                label="序号"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column
                prop="application_id"
                label="流水号"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column
                prop="branch_id"
                label="服务机构"
                align="center"
                min-width="20px"
                :formatter="branchChange">
            </el-table-column>
            <el-table-column
                prop="system_number_identification"
                label="服务系统"
                :formatter="systemFormat"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column 
                prop="score_card_type" 
                label="模型类型" 
                align="center" 
                min-width="20px"
                :formatter="scoreCardChange">
            </el-table-column>
            <el-table-column
                prop="score_card_code"
                label="模型代码"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column
                prop="score_card_name"
                label="模型名称"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column
                prop="transaction_end_time"
                label="申请时间"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column 
                label="评分卡得分" 
                align="center">
                <template slot-scope="{ row }">
                    <el-row type="flex" justify="start">
                    <el-col :span="24">
                        <el-table
                            style="margin: 0px 0px !important;"
                            :data="row.score_result_bak.detail_bak_2"
                            :show-header="true"
                            :span-method="arraySpanMethod">
                            <el-table-column
                                v-for="column in row.score_result_bak.detail_bak_1"
                                :key="column.prop"
                                :label="column.label"
                                :prop="column.prop"
                                align="left"
                                max-height="36"
                                min-width="20">
                            </el-table-column>
                        </el-table>
                    </el-col>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>

        <!--  规则  -->
        <el-table
            v-if="templateType == 2"
            style="margin: 0px 0px !important;"
            :data="templateData"
            :border="true"
            :show-header="true">
            <el-table-column
                type="index"
                label="序号"
                :index="indexMethed"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column
                prop="application_id"
                label="流水号"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column
                prop="branch_id"
                label="服务机构"
                :formatter="branchChange"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column
                prop="system_number_identification"
                label="服务系统"
                :formatter="systemFormat"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column
                prop="rule_code"
                label="模型代码"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column
                prop="rule_name"
                label="模型名称"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column
                prop="transaction_end_time"
                label="申请时间"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column label="指标" align="center">
                <template slot-scope="{ row }">
                    <el-table 
                        style="margin: 0px 0px !important;"
                        :data="row.rule_result_1" 
                        :show-header="false">
                        <el-table-column
                            prop="rule_name"
                            label=""
                            align="center"
                            min-width="20px">
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
                <template slot-scope="{ row }">
                    <el-table 
                        style="margin: 0px 0px !important;"
                        :data="row.rule_result_2" 
                        :show-header="false">
                        <el-table-column
                            prop="hit_flag_desc"
                            label=""
                            align="center"
                            min-width="20px">
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
        </el-table>

        <!-- 规则组  -->
        <el-table
            v-if="templateType == 5"
            style="margin: 0px 0px !important;"
            :data="templateData"
            :border="true"
            :show-header="true">
            <el-table-column
                type="index"
                label="序号"
                :index="indexMethed"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column
                prop="application_id"
                label="流水号"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column
                prop="branch_id"
                label="服务机构"
                :formatter="branchChange"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column
                prop="system_number_identification"
                label="服务系统"
                :formatter="systemFormat"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column
                prop="group_code"
                label="模型代码"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column
                prop="group_name"
                label="模型名称"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column
                prop="transaction_end_time"
                label="申请时间"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column 
                label="指标" 
                align="center">
                <template slot-scope="{ row }">
                    <el-table 
                        style="margin: 0px 0px !important;"
                        :data="row.rule_result_1" 
                        :show-header="false">
                        <el-table-column
                            prop="rule_name"
                            label=""
                            align="center"
                            min-width="20px">
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column 
                label="状态" 
                align="center">
                <template slot-scope="{ row }">
                    <el-table 
                        style="margin: 0px 0px !important;"
                        :data="row.rule_result_2" 
                        :show-header="false">
                        <el-table-column
                            prop="hit_flag_desc"
                            label=""
                            align="center"
                            min-width="20px">
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
        </el-table>

        <!--  规则树  -->
        <el-table
            v-if="templateType == 3"
            style="margin: 0px 0px !important;"
            :data="templateData"
            :border="true"
            :show-header="true">
            <el-table-column
                type="index"
                label="序号"
                align="center"
                :index="indexMethed"
                min-width="20px">
            </el-table-column>
            <el-table-column
                prop="application_id"
                label="流水号"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column
                prop="branch_id"
                label="服务机构"
                :formatter="branchChange"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column
                prop="system_number_identification"
                label="服务系统"
                :formatter="systemFormat"
                align="center"
                min-width="20px">
            </el-table-column>
            <!-- <el-table-column prop="trxnSeq" label="模型类型" align="center" min-width="20px"></el-table-column> -->
            <el-table-column
                prop="tree_code"
                label="模型代码"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column
                prop="tree_name"
                label="模型名称"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column
                prop="transaction_start_time"
                label="申请时间"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column
                prop="tree_id"
                label="叶子节点编号"
                align="center"
                min-width="20px">
            </el-table-column>
            <el-table-column label="动作执行信息" align="center">
                <template slot-scope="{ row }">
                    <el-table
                        style="margin: 0px 0px !important;" 
                        :data="row.children_bak" 
                        :show-header="false">
                        <el-table-column
                            prop="nodeValue"
                            label=""
                            align="center"
                            min-width="20px">
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
            v-if="templateType != -1"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="elPagination.currentPage"
            :page-sizes="[10, 15, 20]"
            :page-size="elPagination.pageSizes"
            layout="total, sizes, prev, pager, next, jumper"
            :total="elPagination.pageSize">
        </el-pagination>
    </div>
</template>

<script>
/**
 * 统计报表模板(通用)
 * TODO 数据处理修改时统计报表模板(专用于规则流显示)(reportTemplateFlowItem)最好与通用的统计报表(reportTemplate)保持一致。
 */
import MyAxios from "pte-ui/utils/MyAxios";
export default {
    name: "reportTemplate",
    props: {
        cMeta: Object, //本页面模板json数据Layout对象
        cParentMeta: Object, //父页面模板json数据Layout对象
        cParentParams: Object, //父页面自定义参数与内置参数
        cParentScope: Object, //父页面每块区域业务数据

        // 模型标题是否显示
        templateTitleShow: {
            type: Boolean,
            default: true
        },
        // 评分卡类型字典
        scoreCardType: {
            type: Array,
            default: []
        },
        // 规则类型Map
        modelTypeListMap: {
            type: Map,
            default() {
                return new Map([]);
            }
        }
    },
    data() {
        return {
            // 规则类型与模版类型的映射Map
            modelTypeTemplateMap: new Map([
                ["PF", { templateType: 1 }], // 简单评分卡
                ["PC", { templateType: 1 }], // 复杂评分卡
                ["PT", { templateType: 2 }], // 普通规则
                ["PZ", { templateType: 5 }], // 普通规则组
                ["GS", { templateType: 3 }], // 规则树
                ["GL", { templateType: 4 }], // 规则流
            ]),
            // 评分卡-补充信息
            scorecardScoreTables: [
                { label: "录入值" },
                { label: "权重" },
                { label: "分值" },
                { label: "总分" },
            ],
            // 模板数据
            templateData: [],
            // 模板类型 1=简单评分卡/复杂评分卡,2=普通规则,5=普通规则组,3=规则树
            templateType: -1, 
            // GS模型递归临时数据
            gsTempList: [],
            // 分页数据源
            elPagination: {
                currentPage: 1, // 当前显示页码
                pageSize: 0, // 总数
                pageSizes: 10, // 每页最大数量
            },
            // 默认分页数据源
            defaultElPagination: {
                currentPage: 1, // 当前显示页码
                pageSize: 0, // 总数
                pageSizes: 10, // 每页最大数量
            },
            // 模板附加信息
            templateInfo: {
                modelType: '',
                modelName: '',
                prefixName: ''
            },
            // 上一次表单数据
            lastRuleForm: {}
        }
    },
    created() {
         this.getDictList("DECI_E_BRANCH_MARK", "statusList");
        this.getBranchList();
    },
    methods: {
        /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey, dictMap = undefined) {
      let params = {
        dictType: dictType,
        dictKey: [dictType],
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this[listKey] = res.data;

            // 保存映射map
            if (dictMap != undefined) {
              const map = new Map([]);
              for (let i = 0; i < res.data.length; i++) {
                map.set(res.data[i].dictId, {
                  dictId: res.data[i].dictId,
                  dictName: res.data[i].dictName,
                });
              }
              this[dictMap] = map;
              console.log(map);
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
                     /**
     * 转化枚举类型
     */
    branchChange(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.statusList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    systemFormat(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.systemList.forEach(function(item,index){
                if(data == item.systemId){
                    name = item.systemName;
                }
            })
            return name;
    },
                 /**
     * 获取系统列表
     */
    getBranchList() {
      let params = {
        servicecode: "deci090101",
        start:1,
        length:10000
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this.systemList = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
        /**
         * 初始化查询
         */
        init(modelType, param, elPagination = undefined) {
            this.resetDate();
            this.search(modelType, param, elPagination);
        },
        /**
         * 重置数据
         */
        resetDate() {
            this.templateData = [];
            this.elPagination = this.defaultElPagination;
        },
        /**
         * 提交搜索
         */
        async search(modelType, param, elPagination = undefined, parentModelType = undefined) {
            console.log('search param', param);

            if (elPagination == {} || elPagination == undefined || elPagination == null) {
                param.currentPage = this.defaultElPagination.currentPage;
                param.pageSizes = this.defaultElPagination.pageSizes;
            } else {
                param.currentPage = elPagination.currentPage;
                param.pageSizes = elPagination.pageSizes;
            }
            this.lastRuleForm = param;
            this.templateData = await this.queryModelData(modelType, param, parentModelType);
            this.templateType = this.modelTypeTemplateMap.get(modelType).templateType;
            if (this.modelTypeListMap.has(modelType)) {
                this.setTemplateInfo(
                    modelType,
                    this.modelTypeListMap.get(modelType).dictName,
                    "" // TODO 标题名 默认空白
                );
            } else {
                this.setTemplateInfo("", "", "");
            }

            // 获取数据后设置页数
            this.elPagination.currentPage = param.currentPage;
            this.elPagination.pageSizes = param.pageSizes;

            console.log('templateData', this.templateData);
        },
        /**
         * 处理当前模板附加的信息
         * @param modelType
         * @param modelName
         * @param prefixName
         */
        setTemplateInfo(modelType, modelName, prefixName) {
            this.templateInfo.modelType = modelType;
            this.templateInfo.modelName = modelName;
            this.templateInfo.prefixName = prefixName;
        },
        /**
         * 评分卡-合并tab
         */
        arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 3) {
                // 第四行除开第一列合并最后一栏
                if (columnIndex === 1) {
                    return [1, 15]; // TODO 最大15，允许增加
                } else if (columnIndex === 0) {
                    return [1, 1];
                } else {
                    return [0, 0];
                }
            }
        },
        scoreCardChange(row, column){
            let name = row[column.property];
            let data = row[column.property];
            this.scoreCardType.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
        },
        /**
         * table page start number index
         */
        indexMethed(index) {
            console.log("页数 " + this.elPagination.currentPage)
            console.log("条数 " + this.elPagination.pageSizes)
            console.log("索引 " + index)
            if (this.elPagination.pageSizes > this.elPagination.pageSize) {
                return index + 1;
            } else {
                return Number(this.elPagination.currentPage) * Number(this.elPagination.pageSizes)  + index - 9 ;
            }
        },
        /**
         * 单页数据变化监听
         * @param val
         */
        handleSizeChange(val) {
            const elPagination = JSON.parse(JSON.stringify(this.elPagination));
            elPagination.pageSizes = val;
            console.log(`sizeChange ${val} 条`);
            this.search(this.templateInfo.modelType, this.lastRuleForm, elPagination);
        },
        /**
         * 当前页变化监听
         * @param val
         */
        handleCurrentChange(val) {
            const elPagination = JSON.parse(JSON.stringify(this.elPagination));
            elPagination.currentPage = val;
            console.log(`currentPage: ${val}`);
            this.search(this.templateInfo.modelType, this.lastRuleForm, elPagination);
        },
        /**
         * 查询模型数据，并返回可用的格式数据
         * 根据组件标识进行额外的处理，包括接口区分和返回数据处理区分。
         * @param modelType
         * @param param
         * @param parentModelType 父组件标识。GL=规则流
         * @returns {Promise<*>}
         */
        async queryModelData(modelType, param, parentModelType = undefined) {
            if (modelType == "PF") {
                const list = await this.getDataPF(param, parentModelType);
                return list;
            } else if (modelType == "PC") {
                const list = await this.getDataPC(param, parentModelType);
                return list;
            } else if (modelType == "PT") {
                const list = await this.getDataPT(param, parentModelType);
                return list;
            } else if (modelType == "PZ") {
                const list = await this.getDataPZ(param, parentModelType);
                return list;
            } else if (modelType == "GS") {
                const list = await this.getDataGS(param, parentModelType);
                return list;
            } else {
                return [];
            }
        },
        /**
         * 预处理模型数据
         * 分别获取x轴和y轴显示数据
         */
        formatScoreInfo(list, total) {
            const newListY = [{}, {}, {}, {}]; // 录入值、权重、分值、总分
            const newListX = [{label: '条件', prop: 'column_label'}]; // label
            for (let i = 0; i < list.length; i++) {
                newListX.push({
                label: list[i].scoreModelName,
                prop: `column_${i}`,
                });
            }

            newListY[0]['column_label'] = '录入值'; // 录入值
            newListY[1]['column_label'] = '权重'; // 权重
            newListY[2]['column_label'] = '分值'; // 分值
            newListY[3]['column_label'] = '总分'; // 总分

            for (let i = 1; i < newListX.length; i++) {
                newListY[0][newListX[i].prop] = list[i - 1].inputValue; // 录入值
                newListY[1][newListX[i].prop] = list[i - 1].scoreAttributePercent; // 权重
                newListY[2][newListX[i].prop] = list[i - 1].scorePoints; // 分值
                newListY[3][newListX[i].prop] = total; // 总分
            }

            return { newListY, newListX };
        },
        /**
         * 预处理模型数据
         */
        formatPZRules(list) {
            const list_1 = [];
            const list_2 = [];
            for (let i = 0; i < list.length; i++) {
                list_1.push({ rule_name: list[i].rule_name });
                list_2.push({
                hit_flag_desc: list[i].hit_flag == "notHit" ? "未命中" : "命中",
                });
            }
            return { list_1, list_2 };
        },
        /**
         * 预处理模型数据
         */
        formatPTRules(data) {
            const list_1 = [];
            const list_2 = [];
            list_1.push({ rule_name: data.rule_name });
            list_2.push({ hit_flag_desc: data.hit_flag == "是" ? "命中" : "未命中" });
            return { list_1, list_2 };
        },
        /**
         * 预处理模型数据
         */
        async formatGSRules(data) {
            this.getGSNodeValue(data);
            return Promise.resolve();
        },
        /**
         * 预处理模型数据
         */
        getGSNodeValue(data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].children.length > 0) {
                this.getGSNodeValue(data[i].children);
                } else {
                if ( data[i].nodeType == 2) {
                    const list = data[i].ruleDesc.split('和');
                    for (let index = 0; index < list.length; index++) {
                    this.gsTempList.push({ nodeValue: list[index]});
                    }
                }
                }
            }
        },
        /**
         * 获取并处理PF模型
         * @param list
         * @returns {Promise<unknown>}
         */
        getDataPF(ruleForm, parentModelType = undefined) {
            return new Promise((resolve, reject) => {
                let params = {};
                if (parentModelType == 'GL') {
                    params = Object.assign(ruleForm, {
                        servicecode: "deci060130",
                    })
                } else {
                    params = {
                        branch_id: ruleForm.branch_id,
                        system_number_identification:
                            ruleForm.system_number_identification,
                        score_model_code: ruleForm.score_model_code,
                        model_name: ruleForm.model_name,
                        model_type: ruleForm.model_type,
                        transaction_start_time: ruleForm.startDate,
                        transaction_end_time: ruleForm.endDate,
                        start: ruleForm.currentPage,
                        length: ruleForm.pageSizes,
                        servicecode: "deci060125",
                    }
                }
                this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then(async (obj) => {
                    let list = [];
                    if (parentModelType == 'GL') {
                        list = obj.data.field_map;
                    } else {
                        list = obj.data;
                    }
                    this.elPagination.pageSize = 
                        obj.pageParam == undefined 
                            ? 0 
                            : (obj.pageParam.total == undefined ? 0 : obj.pageParam.total);
                    console.log("elPagination" + this.elPagination);
                    
                    if (list.length == 0) {
                        resolve([]);
                    }

                     if (parentModelType == 'GL') {
                        for (let i = 0; i < list.length; i++) {
                        list[i].score_result_bak =list[i]; 
                        const { newListY, newListX } = this.formatScoreInfo(
                            list[i].score_result_bak.detail,
                            list[i].score_result_bak.total
                        );
                        list[i].score_result_bak.detail_bak_1 = newListX;
                        list[i].score_result_bak.detail_bak_2 = newListY;
                    } 
                    } else {
                        for (let i = 0; i < list.length; i++) {
                        list[i].score_result_bak = JSON.parse(list[i].score_result); // 将模型中字符串 Item转换为object Item
                        const { newListY, newListX } = this.formatScoreInfo(
                            list[i].score_result_bak.detail,
                            list[i].score_result_bak.total
                        );
                        list[i].score_result_bak.detail_bak_1 = newListX;
                        list[i].score_result_bak.detail_bak_2 = newListY;
                    } 
                    }
                 
                    resolve(list);
                })
                .catch((res) => {
                    console.error('获取模型数据错误！', res);
                   // this.$message.error("获取PF模型数据错误！");
                    resolve([]);
                });
            });
        },
        /**
         * 获取并处理PC模型
         * @param list
         * @returns {Promise<unknown>}
         */
        getDataPC(ruleForm, parentModelType = undefined) {
            return new Promise((resolve, reject) => {
                let params = {};
                if (parentModelType == 'GL') {
                    params = Object.assign(ruleForm, {
                        servicecode: "deci060130",
                    })
                } else {
                    params = {
                        branch_id: ruleForm.branch_id,
                        system_number_identification:
                            ruleForm.system_number_identification,
                        score_model_code: ruleForm.score_model_code,
                        model_name: ruleForm.model_name,
                        model_type:ruleForm.model_type,
                        transaction_start_time: ruleForm.startDate,
                        transaction_end_time: ruleForm.endDate,
                                start: ruleForm.currentPage,
                        length: ruleForm.pageSizes,
                        servicecode: "deci060125",
                    };
                }
                this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then(async (obj) => {
                    let list = [];
                    if (parentModelType == 'GL') {
                        list = obj.data.field_map;
                    } else {
                        list = obj.data;
                    }
                    this.elPagination.pageSize = 
                        obj.pageParam == undefined 
                            ? 0 
                            : (obj.pageParam.total == undefined ? 0 : obj.pageParam.total);
                    console.log("elPagination" + this.elPagination);

                    if (list.length == 0) {
                        resolve([]);
                    }

                    for (let i = 0; i < list.length; i++) {
                        list[i].score_result_bak = JSON.parse(list[i].score_result); // 将模型中字符串 Item转换为object Item
                        const { newListY, newListX } = this.formatScoreInfo(
                            list[i].score_result_bak.detail,
                            list[i].score_result_bak.total
                        );
                        list[i].score_result_bak.detail_bak_1 = newListX;
                        list[i].score_result_bak.detail_bak_2 = newListY;
                    }
                    resolve(list);
                })
                .catch((res) => {
                    console.error('获取模型数据错误！', res);
                    //this.$message.error("获取PC模型数据错误！");
                    resolve([]);
                });
            });
        },
        /**
         * 获取并处理PT模型
         * @param list
         * @returns {Promise<unknown>}
         */
        getDataPT(ruleForm, parentModelType = undefined) {
            return new Promise((resolve, reject) => {
                let params = {};
                if (parentModelType == 'GL') {
                    params = Object.assign(ruleForm, {
                        servicecode: "deci060130",
                    })
                } else {
                    params = {
                        branch_id: ruleForm.branch_id,
                        system_number_identification:
                            ruleForm.system_number_identification,
                        score_model_code: ruleForm.score_model_code,
                        rule_name: ruleForm.model_name,
                        model_type: ruleForm.model_type,
                        transaction_start_time: ruleForm.startDate,
                        transaction_end_time: ruleForm.endDate,
                        start: ruleForm.currentPage,
                        length: ruleForm.pageSizes,
                        servicecode: "deci060126",
                    };
                }
                this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then(async (obj) => {
                    let list = [];
                    if (parentModelType == 'GL') {
                        list = obj.data.field_map;
                    } else {
                        list = obj.data;
                    }
                    this.elPagination.pageSize = 
                        obj.pageParam == undefined 
                            ? 0 
                            : (obj.pageParam.total == undefined ? 0 : obj.pageParam.total);
                    console.log("elPagination" + this.elPagination);

                    if (list.length == 0) {
                        resolve([]);
                    }

                    for (let i = 0; i < list.length; i++) {
                        list[i].rule_result_bak = JSON.parse(list[i].rule_result); // 将模型中字符串 Item转换为object Item
                        const { list_1, list_2 } = this.formatPTRules(
                            list[i].rule_result_bak
                        );
                        list[i].rule_result_1 = list_1;
                        list[i].rule_result_2 = list_2;
                    }
                    resolve(list);
                })
                .catch((res) => {
                    console.error('获取模型数据错误！', res);
                    //this.$message.error("获取PT模型数据错误！");
                    resolve([]);
                });
            });
        },
        /**
         * 获取并处理PZ模型
         * @param list
         * @returns {Promise<unknown>}
         */
        getDataPZ(ruleForm, parentModelType = undefined) {
            return new Promise((resolve,reject) => {
                let params = {};
                if (parentModelType == 'GL') {
                    params = Object.assign(ruleForm, {
                        servicecode: "deci060130",
                    })
                } else {
                    params = {
                        branch_id: ruleForm.branch_id,
                        system_number_identification:
                            ruleForm.system_number_identification,
                        score_model_code:  ruleForm.score_model_code,
                          model_name: ruleForm.model_name,
                        model_type: ruleForm.model_type,
                        transaction_start_time: ruleForm.startDate,
                        transaction_end_time: ruleForm.endDate,
                        start: ruleForm.currentPage,
                        length: ruleForm.pageSizes,
                        servicecode: "deci060127",
                    };
                }
                this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then(async (obj) => {
                    let list = [];
                    if (parentModelType == 'GL') {
                        list = obj.data.field_map;
                    } else {
                        list = obj.data;
                    }
                    this.elPagination.pageSize = 
                        obj.pageParam == undefined 
                            ? 0 
                            : (obj.pageParam.total == undefined ? 0 : obj.pageParam.total);
                    console.log("elPagination" + this.elPagination);

                    if (list.length == 0) {
                        resolve([]);
                    }


                    for (let i = 0; i < list.length; i++) {
                        list[i].rule_result_bak = JSON.parse(list[i].rule_result); // 将模型中字符串 Item转换为object Item
                        const { list_1, list_2 } = this.formatPZRules(
                            list[i].rule_result_bak
                        );
                        list[i].rule_result_1 = list_1;
                        list[i].rule_result_2 = list_2;
                    }
                    resolve(list);
                })
                .catch((res) => {
                    console.error('获取模型数据错误！', res);
                    //this.$message.error("获取PZ模型数据错误！");
                    resolve([]);
                });
            });
        },
        /**
         * 获取并处理GS模型
         * @param list
         * @returns {Promise<unknown>}
         */
        getDataGS(ruleForm, parentModelType = undefined) {
            return new Promise((resolve,reject) => {
                let params = {};
                if (parentModelType == 'GL') {
                    params = Object.assign(ruleForm, {
                        servicecode: "deci060130",
                    })
                } else {
                    params = {
                        branch_id: ruleForm.branch_id,
                        system_number_identification:
                            ruleForm.system_number_identification,
                        score_model_code: ruleForm.score_model_code,
                        model_name: ruleForm.model_name,
                        model_type: ruleForm.model_type,
                        transaction_start_time: ruleForm.startDate,
                        transaction_end_time: ruleForm.endDate,
                        start: ruleForm.currentPage,
                        length: ruleForm.pageSizes,
                        servicecode: "deci060128",
                    };
                }
                this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then(async (obj) => {
                     let list = [];
                    if (parentModelType == 'GL') {
                        list = obj.data.field_map;
                    } else {
                        list = obj.data;
                    }
                    this.elPagination.pageSize = 
                        obj.pageParam == undefined 
                            ? 0 
                            : (obj.pageParam.total == undefined ? 0 : obj.pageParam.total);
                    console.log("elPagination" + this.elPagination);

                    if (list.length == 0) {
                        resolve([]);
                    }

                    for (let i = 0; i < list.length; i++) {
                        await this.formatGSRules(list[i].children);
                        list[i].children_bak = this.gsTempList;
                        this.gsTempList = [];
                    }
                    resolve(list);
                })
                .catch((res) => {
                    console.error('获取模型数据错误！', res);
                    //this.$message.error("获取GS模型数据错误！");
                    resolve([]);
                });
            });
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