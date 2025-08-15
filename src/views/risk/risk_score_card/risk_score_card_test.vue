<template>
    <div class="page_content">
        <el-form :model="form" :rules="rules" ref="form" span="24" label-position="right">
            <el-row>
                <el-col span="12">
                    <el-form-item label="评分卡代码" prop="scoreCodes" required="true">
                        <el-input
                            class="input_el_70"
                            placeholder="请点击按钮选择"
                            disabled
                            v-model="form.scoreCodes"
                            type="text"
                        ></el-input>
                        <el-button type="primary" @click="openDialog">选择</el-button>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item  label="评分卡名称" prop="scoreCodeName" required="true">
                        <el-input class="input_el_70" disabled v-model="form.scoreCodeName" type="text"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="机构名称" prop="branch_id" required="true">
                        <el-select v-model="form.branch_id" placeholder="请选择" :disabled="true" class="input_el_70">
                            <el-option v-for="item in this.statusList" :key="item.dictId" :label="item.dictName"
                                :value="item.dictId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <!-- <el-col span="12">

                    <el-form-item label="机构名称:" prop="branch_id">

            <el-select
                v-model="form.branch_id"     
                placeholder="请选择"
                :disabled="true"
              >
                <el-option
                  v-for="item in this.statusList"
                  :class="input_el_70-item"
                  :key="item.dictId"
                  :label="item.dictName"
                  :value="item.dictId"
                >
                </el-option>
              </el-select>
                    </el-form-item>
                </el-col> -->
                <el-col span="12">
                    <el-form-item label="版本号" prop="version">
                        <el-input class="input_el_70" disabled v-model="version" type="text"></el-input>
                        <!-- <el-button type="primary" @click="cleanVersion">清除版本号</el-button> -->
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row span="24">
                <el-col
                    span="7"
                    style="margin-left:20px"
                    v-for="(scoreAttributeMessageMap,index) in scoreAttributeMessageList"
                    :key="index"
                >
                    <el-form-item
                        :label="scoreAttributeMessageMap.get('scoreAttributeName')"
                        :key="scoreAttributeMessageMap.get('scoreAttributeFirstLevel') +'.' +scoreAttributeMessageMap.get('scoreAttributeSecondLevel')"
                        :prop="scoreAttributeMessageMap.get('scoreAttributeSecondLevel')"
                    >
                        <el-input
                            v-if="scoreAttributeMessageMap.get('defaultValueType') == 'number'"
                            v-model.number="form[scoreAttributeMessageMap.get('scoreAttributeFirstLevel')][scoreAttributeMessageMap.get('scoreAttributeSecondLevel')]"
                            :type="scoreAttributeMessageMap.get('defaultValueType')"
                            @input="change()"
                            clearable
                            :placeholder="scoreAttributeMessageMap.get('scoreAttributeFirstLevel') +'.' +scoreAttributeMessageMap.get('scoreAttributeSecondLevel')"
                        />
                        <el-input
                            v-if="scoreAttributeMessageMap.get('defaultValueType') == 'string'"
                            v-model="form[scoreAttributeMessageMap.get('scoreAttributeFirstLevel')][scoreAttributeMessageMap.get('scoreAttributeSecondLevel')]"
                            :type="scoreAttributeMessageMap.get('defaultValueType')"
                            @input="change()"
                            clearable
                            :placeholder="scoreAttributeMessageMap.get('scoreAttributeFirstLevel') +'.' +scoreAttributeMessageMap.get('scoreAttributeSecondLevel')"
                        />
                        <el-select
                            v-if="scoreAttributeMessageMap.get('defaultValueType') == 'boolean'"
                            v-model="form[scoreAttributeMessageMap.get('scoreAttributeFirstLevel')][scoreAttributeMessageMap.get('scoreAttributeSecondLevel')]"
                            @change="change"
                            style="width:100%"
                            clearable
                            :placeholder="scoreAttributeMessageMap.get('scoreAttributeFirstLevel') +'.' +scoreAttributeMessageMap.get('scoreAttributeSecondLevel')"
                        >
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item class="footForm">
                        <div class="buttonGroup">
                            <el-button type="primary" small @click="test">测试</el-button>
                            <el-button small @click="reset">重置</el-button>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <!-- <div v-if="modifyDialogVisible">
      <el-dialog title="测试成功，响应数据如下：" :append-to-body="true" :visible="modifyDialogVisible" width="30%" top="30vh"
        @close="closeDialog">
        <pre><code>{{ responseMessage }}</code></pre>
      </el-dialog>
        </div>-->
        <el-button class="downLoad" type="primary" @click="openDialog">SDK下载</el-button>
    </div>
</template>

<script>
import { cloneJSON } from "@jsmini/clone";
import MyAxios from "pte-ui/utils/MyAxios";
export default {
    data() {
        return {
            form: {
                scoreCodes: "", // 评分卡代码
                scoreCodeName: "", // 评分卡名称
                branch_id: "" //机构名称
                //total: "", //评分卡总分
            },
            scoreCardType: "", //评分卡类型
            version: "", //版本号
            scoreData: [], //评分表格数据
            show: true, // 页面
            statusList: [], //机构列表
            scoreCardCodeSelectOptions: [], // 评分卡代码下拉框选项
            scoreAttributeMessageList: [], // 评分属性报文列表
            modifyDialogVisible: false,
            responseMessage: "", // 测试成功，响应数据报文
            rules: {},
        };
    },
        mounted() {
        this.getDictList("DECI_E_BRANCH_MARK","statusList");
    },
    methods: {
        /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
        getDictList(dictType, listKey) {
            let params = {
                dictType: dictType,
                dictKey: [dictType],
            };
            MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
                .then((res) => {
                    if (res && res.code === "200") {
                        this[listKey] = res.data;
                    }
                })
                .catch((err) => {
                    console.error(err);
                });
        },
        //关闭窗口对话框
        closeDialog(item) {
            this.modifyDialogVisible = false;
        },
        change(e) {
            this.$forceUpdate();
        },
        //输入框为数值型的时候，不输入是默认0
        blurNumber(e, obj) {
            console.log("e", e);
            console.log("obj", obj);
            console.log(
                "obcccj",
                this.form[obj.get("scoreAttributeFirstLevel")][
                    obj.get("scoreAttributeSecondLevel")
                ]
            );
            if (
                this.form[obj.get("scoreAttributeFirstLevel")][
                    obj.get("scoreAttributeSecondLevel")
                ] === ""
            ) {
                this.form[obj.get("scoreAttributeFirstLevel")][
                    obj.get("scoreAttributeSecondLevel")
                ] = "0";
                this.$forceUpdate();
            }
        },
        // 初始化 ScoreCardCode 下拉列表
        initScoreCardCodeSelect() {
            this.$http
                .invokeAPI("/SUMP/riskController/riskCall", "GET", {
                    servicecode:
                        "risk-management-service/combobox-select/score-card-without-field",
                    appId: "risk-management-service",
                    isList: true,
                })
                .then((obj) => {
                    if (obj.code === "200") {
                        this.scoreCardCodeSelectOptions = obj.data;
                    }
                })
                .catch((reg) => {
                    this.$message.warning("查询失败，请稍后尝试");
                });
        },
        // 当 scoreCardCode 下拉框发生改变, 触发该方法
        selectScoreCardCode(scoreCodes, version, type) {
            let params;
                params = {
                    scoreCodes: scoreCodes,
                    version: version,
                };
            let model_type;
            if (type === "0"){
                model_type = "PF";
            }else if (type === "1"){
                model_type = "PC";
            }

            params = { field_map: params }
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
                    model_id: scoreCodes,
                    model_version: version,
                    model_type:model_type,
                    servicecode:"deci030006"
                })
                .then((obj) => {
                    if (obj.code === "200") {
                        console.log("下拉框发生改变, 触发请求回调", obj);
                        // 清空scoreAttributeMessageList
                        this.scoreAttributeMessageList = [];
                        let scoreAttributeMessageObject = obj.data.field_map;
                        for (let firstLevelKey in scoreAttributeMessageObject) {
                            let firstLevelValue =
                                scoreAttributeMessageObject[firstLevelKey];
                            // 处理有两级结构的数据
                            if (firstLevelValue instanceof Object) {
                                for (let secondLevelKey in firstLevelValue) {
                                    let map = new Map();
                                    // 根据 '-' 拆分 key 中的 scoreAttribute 和 scoreAttributeName
                                    let scoreAttributeFirstLevel =
                                        firstLevelKey;
                                    let scoreAttributeSecondLevel =
                                        secondLevelKey.split("-")[0];
                                    let scoreAttributeName =
                                        secondLevelKey.split("-")[1];
                                    let defaultValue =
                                        firstLevelValue[secondLevelKey];
                                    map.set(
                                        "scoreAttributeFirstLevel",
                                        scoreAttributeFirstLevel
                                    );
                                    map.set(
                                        "scoreAttributeSecondLevel",
                                        scoreAttributeSecondLevel
                                    );
                                    map.set("defaultValue", defaultValue);
                                    map.set(
                                        "scoreAttributeName",
                                        scoreAttributeName
                                    );
                                    map.set(
                                        "defaultValueType",
                                        typeof defaultValue
                                    );
                                    //console.log(map.get("scoreAttributeName")+"的类型为："+map.get("defaultValueType"))
                                    this.scoreAttributeMessageList.push(map);
                                    if (
                                        this.form[
                                            scoreAttributeFirstLevel
                                        ] instanceof Object
                                    ) {
                                        this.form[scoreAttributeFirstLevel][
                                            scoreAttributeSecondLevel
                                        ] = null;
                                    } else {
                                        this.form[scoreAttributeFirstLevel] = {
                                            [scoreAttributeSecondLevel]: null,
                                        };
                                    }
                                }
                            } else {
                                // 处理只有一级结构的数据
                                let map = new Map();
                                let scoreAttributeFirstLevel =
                                    firstLevelKey.split("-")[0];
                                let scoreAttributeName =
                                    firstLevelKey.split("-")[1];
                                let defaultValue = firstLevelValue;
                                map.set(
                                    "scoreAttributeFirstLevel",
                                    scoreAttributeFirstLevel
                                );
                                map.set("defaultValue", defaultValue);
                                map.set(
                                    "scoreAttributeName",
                                    scoreAttributeName
                                );
                                this.scoreAttributeMessageList.push(map);
                                this.form[scoreAttributeFirstLevel] = null;
                            }
                        }
                    }
                })
                .catch((reg) => {
                    this.$message.warning("查询失败，请稍后尝试");
                });
        },
        test() {
            let that = this;
            console.log("111111111111111111111111111111", that.form);
            //表单非空校验
            for (let i in that.form) {
                if (
                    that.form[i] === "" ||
                    that.form[i] === undefined ||
                    that.form[i] == null
                ) {
                    this.$message.warning("校验失败，请填写好表单");
                    return;
                }
                for (let j in that.form[i]) {
                    if (
                        that.form[i][j] === "" ||
                        that.form[i][j] === undefined ||
                        that.form[i][j] === null
                    ) {
                        this.$message.warning("校验失败，请填写好表单");
                        return;
                    }
                }
            }
            this.$refs.form.validate((valid) => {
                if (valid) {
                  
                    let params = { field_map: cloneJSON(this.form) }
                  
                        params.field_map["version"] =
                            this.version.length > 0 ? this.version : undefined;
                    
                    console.log("请求参数:", params);
                    
                    this.$http
                        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
                            ...params,
                            servicecode:"deci030001"
                        })
                        .then((obj) => {
                            if (obj.code === "200") {
                                //debugger
                                console.log("测试接口请求回调", obj);
                                let responseData = obj.data.field_map[0];
                                console.log("responseData", responseData);
                                console.log("scoreCodes", that.form.scoreCodes);
                                let tableData = responseData.detail;
                                // let tableData1 = responseData.nothit;
                                // if (tableData1!==undefined) {
                                //     tableData1.forEach((item,index) => {
                                //         tableData.push(item); 
                                // });    
                                // }
                                console.log("nohit",this.tableData1)
                                console.log("tableData1",this.tableData)
                                let scoreCardCode = responseData.scoreCardCode;
                                let scoreCodeName = responseData.scoreCodeName;
                                let totalExecType = responseData.totalExecType;
                                let total = responseData.total;
                                console.log("tableData", tableData);
                                if (tableData && tableData.length === 0) {
                                    that.$dialog.open({
                                        that: that,
                                        title: "提示",
                                        toRequest: {
                                            url: "@testErroDialog",
                                            method: "get",
                                            params: {
                                                responseData: JSON.stringify(
                                                    obj,
                                                    null,
                                                    "\t"
                                                ),
                                                textContent: "未命中任何规则",
                                            },
                                        },
                                        width: "22%",
                                        height: "25%",
                                    });
                                } else if (tableData && tableData.length > 0) {
                                    that.$dialog.open({
                                        that: that,
                                        title: "测试成功，评分卡响应数据如下：",
                                        toRequest: {
                                            url: "@riskScoreCardTestResult",
                                            method: "get",
                                            params: {
                                                tableData,
                                                responseData: JSON.stringify(
                                                    obj,
                                                    null,
                                                    "\t"
                                                ),
                                                total,
                                                scoreCardCode,
                                                scoreCodeName,
                                                totalExecType,
                                            },
                                        },
                                        width: "60%",
                                    });
                                }
                            } else {
                                this.$message.error(obj.retMsg);
                            }
                        })
                        .catch((reg) => {
                            this.$message.warning("测试失败，请稍后尝试");
                        });
                } else {
                    this.$message.warning("校验失败，请填写好表单");
                }
            });
        },
        reset() {
            for (let scoreAttributeMessageMap of this
                .scoreAttributeMessageList) {
                this.form[
                    scoreAttributeMessageMap.get("scoreAttributeFirstLevel")
                ][scoreAttributeMessageMap.get("scoreAttributeSecondLevel")] =
                    null;
            }
            this.$forceUpdate();
        },
        openDialog() {
            let that = this;
            // this.$emit('openDialog');
            console.log("this.$dataBus.getCurrentFormData(this)");
            console.log("this.$dataBus", that.$dataBus);
            that.$dataBus.bindCallBackMethod(that, that.jsonCallBack, {});
            that.$dialog.open({
                that: that,
                title: "评分卡代码选择",
                toRequest: {
                    url: "/views/risk/risk_score_card/lookup.json",
                    method: "get",
                },
                width: "80%",
            });
        },
        jsonCallBack(btnConfig, response) {
            this.form = {
                scoreCodes: "", // 评分卡代码
            };
            console.log("json模板回调回来的数据1", btnConfig);
            console.log("json模板回调回来的数据2", response);
            this.scoreCardCodeSelectOptions = response;
            this.form.scoreCodes = `${response.scoreCardCode}`;
            this.form.scoreCodeName = `${response.scoreCardName}`;
            this.form.branch_id = `${response.branch_id}`;
            this.scoreCardType = `${response.scoreCardType}`;
            this.version = `${response.version}`;
            this.selectScoreCardCode(
                response.scoreCardCode,
                this.version,
                this.scoreCardType
            );
        },
        cleanVersion() {
            this.version = ``;
            this.selectScoreCardCode(
                this.form.scoreCodes,
                this.form.scoreCodeName,
                this.form.branch_id,
                this.version,
                this.scoreCardType
            );
        },
    },
};
</script>

<style lang="less" scoped>
.page_content {
    width: 100%;
    position: relative;
}
/deep/.el-dialog{
height:180px !important
} 
.el-dialog{
    height:180px !important  
}
.inputItem {
    width: 100%;
}
.footForm {
    position: relative;
    margin-right: 100px;
}
.buttonGroup {
    position: absolute;
    bottom: -30px;
}
.el-col-12 {
    width: 45%;
}
.input_el_70 {
    width: 70%;
}
.input_el_30 {
    width: 40%;
}
.downLoad {
    right: 10px;
    top: 10px;
    position: absolute;
    opacity: 0;
}
</style>
