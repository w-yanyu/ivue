<template>
    <div class="page_content">
        <el-form :model="form" :rules="rules" ref="form" span="24" label-position="right">
            <el-row>
                <el-col span="12">
                    <el-form-item label="规则表代码" prop="tableCodes" required="true">
                        <el-input
                            class="input_el_70"
                            placeholder="请点击按钮选择"
                            disabled
                            v-model="form.tableCodes"
                            type="text"
                        ></el-input>
                        <el-button type="primary" @click="openDialog">选择</el-button>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="规则表名称" prop="tableName"  required="true">
                        <el-input class="input_el_70" disabled v-model="form.tableName" type="text"></el-input>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="机构名称" prop="branch_id"  required="true" >
                        <el-select v-model="form.branch_id" placeholder="请选择" :disabled="true" class="input_el_70">
                            <el-option v-for="item in this.statusList" :key="item.dictId" :label="item.dictName"
                                :value="item.dictId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="版本号" prop="version">
                        <el-input class="input_el_70" disabled v-model="version" type="text"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row span="24">
                <el-col
                    span="7"
                    style="margin-left:20px"
                    v-for="(ruleAttributeMessageMap,index) in ruleAttributeMessageList"
                    :key="index"
                >
                    <el-form-item
                        :label="ruleAttributeMessageMap.get('ruleAttributeName')"
                        :key="ruleAttributeMessageMap.get('ruleAttributeFirstLevel') +'.' +ruleAttributeMessageMap.get('ruleAttributeSecondLevel')"
                        :prop="ruleAttributeMessageMap.get('ruleAttributeSecondLevel')"
                    >
                        <el-input
                            v-if="ruleAttributeMessageMap.get('defaultValueType') == 'number'"
                            v-model.number="form[ruleAttributeMessageMap.get('ruleAttributeFirstLevel')][ruleAttributeMessageMap.get('ruleAttributeSecondLevel')]"
                            :type="ruleAttributeMessageMap.get('defaultValueType')"
                            @input="change()"
                            clearable
                            :placeholder="ruleAttributeMessageMap.get('ruleAttributeFirstLevel') +'.' +ruleAttributeMessageMap.get('ruleAttributeSecondLevel')"
                        />
                        <el-input
                            v-if="ruleAttributeMessageMap.get('defaultValueType') == 'string'"
                            v-model="form[ruleAttributeMessageMap.get('ruleAttributeFirstLevel')][ruleAttributeMessageMap.get('ruleAttributeSecondLevel')]"
                            :type="ruleAttributeMessageMap.get('defaultValueType')"
                            @input="change()"
                            clearable
                            :placeholder="ruleAttributeMessageMap.get('ruleAttributeFirstLevel') +'.' +ruleAttributeMessageMap.get('ruleAttributeSecondLevel')"
                        />
                        <el-select
                            v-if="ruleAttributeMessageMap.get('defaultValueType') == 'boolean'"
                            v-model="form[ruleAttributeMessageMap.get('ruleAttributeFirstLevel')][ruleAttributeMessageMap.get('ruleAttributeSecondLevel')]"
                            @change="change"
                            style="width:100%"
                            clearable
                            :placeholder="ruleAttributeMessageMap.get('ruleAttributeFirstLevel') +'.' +ruleAttributeMessageMap.get('ruleAttributeSecondLevel')"
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
        <div v-if="modifyDialogVisible">
            <el-dialog
                title="测试成功，响应数据如下："
                :append-to-body="true"
                :visible="modifyDialogVisible"
                width="50%"
                top="30vh"
                @close="closeDialog"
            >
                <pre><code>{{ responseMessage }}</code></pre>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { cloneJSON } from "@jsmini/clone";
import MyAxios from "pte-ui/utils/MyAxios";
export default {
    data() {
        return {
            form: {
                tableCodes: "", // 规则树代码
                tableName: "", // 规则树名称
                branch_id: "", // 机构名称
            },
            show: true, // 页面
            version: "", //版本号
            statusList: [], //机构列表
            ruleSelectOptions: [], // 规则组代码下拉框选项
            ruleAttributeMessageList: [], // 评分属性报文列表
            modifyDialogVisible: false,
            responseMessage: "", // 测试成功，响应数据报文
            rules: {},
            treedate: {}
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
                this.form[obj.get("ruleAttributeFirstLevel")][
                    obj.get("ruleAttributeSecondLevel")
                ]
            );
            if (
                this.form[obj.get("ruleAttributeFirstLevel")][
                    obj.get("ruleAttributeSecondLevel")
                ] === ""
            ) {
                this.form[obj.get("ruleAttributeFirstLevel")][
                    obj.get("ruleAttributeSecondLevel")
                ] = "0";
                this.$forceUpdate();
            }
        },
        //选择树
        openDialog() {
            let that = this;
            console.log("this.$dataBus.getCurrentFormData(this)");
            console.log("this.$dataBus", that.$dataBus);
            that.$dataBus.bindCallBackMethod(that, that.jsonCallBack, {});
            that.$dialog.open({
                that: that,
                title: "规则表代码选择",
                toRequest: {
                    url: "/views/risk/rule_table/risk_rule_table_lookup.json",
                    method: "get",
                },
                width: "70%",
            });
        },
        jsonCallBack(btnConfig, response) {
            console.log("json模板回调回来的数据1", btnConfig);
            console.log("json模板回调回来的数据2", response);
            this.ruleSelectOptions = response;
            this.version = `${response.busiVersion}`;
            this.form.tableCodes = `${response.tableCodes}`;
            this.form.tableName = `${response.tableName}`;
            this.form.branch_id = `${response.branchId}`;
            //选择回带触发查询属性方法
            this.selectTreeAttributes(response.treeCode, response.busiVersion);
        },
        //清除版本号
        cleanVersion() {
            this.version = ``;
            this.selectTreeAttributes(this.form.tree_codes, this.busi_version);
        },
        //查询该树所需的属性
        selectTreeAttributes(treeCodes, version) {
            let params = {
                treeCodes: treeCodes,
                version: version
            };
             params = { field_map: params }
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
                    model_id: treeCodes,
                    model_version: version,
                    model_type: "GS", 
                    servicecode: "deci030006"
                })
                .then((obj) => {
                    if (obj.code === "200") {
                        console.log("下拉框发生改变, 触发请求回调", obj);
                        // 清空ruleAttributeMessageList
                        this.ruleAttributeMessageList = [];
                        let ruleAttributeMessageObject = obj.data.field_map;
                        for (let firstLevelKey in ruleAttributeMessageObject) {
                            let firstLevelValue =
                                ruleAttributeMessageObject[firstLevelKey];
                            // 处理有两级结构的数据
                            if (firstLevelValue instanceof Object) {
                                for (let secondLevelKey in firstLevelValue) {
                                    let map = new Map();
                                    // 根据 '-' 拆分 key 中的 scoreAttribute 和 ruleAttributeName
                                    let ruleAttributeFirstLevel = firstLevelKey;
                                    let ruleAttributeSecondLevel =
                                        secondLevelKey.split("-")[0];
                                    let ruleAttributeName =
                                        secondLevelKey.split("-")[1];
                                    let defaultValue =
                                        firstLevelValue[secondLevelKey];
                                    map.set(
                                        "ruleAttributeFirstLevel",
                                        ruleAttributeFirstLevel
                                    );
                                    map.set(
                                        "ruleAttributeSecondLevel",
                                        ruleAttributeSecondLevel
                                    );
                                    map.set("defaultValue", defaultValue);
                                    map.set(
                                        "ruleAttributeName",
                                        ruleAttributeName
                                    );
                                    map.set(
                                        "defaultValueType",
                                        typeof defaultValue
                                    );
                                    this.ruleAttributeMessageList.push(map);
                                    if (
                                        this.form[
                                            ruleAttributeFirstLevel
                                        ] instanceof Object
                                    ) {
                                        this.form[ruleAttributeFirstLevel][
                                            ruleAttributeSecondLevel
                                        ] = null;
                                    } else {
                                        this.form[ruleAttributeFirstLevel] = {
                                            [ruleAttributeSecondLevel]: null,
                                        };
                                    }
                                }
                            } else {
                                // 处理只有一级结构的数据
                                let map = new Map();
                                let ruleAttributeFirstLevel =
                                    firstLevelKey.split("-")[0];
                                let ruleAttributeName =
                                    firstLevelKey.split("-")[1];
                                let defaultValue = firstLevelValue;
                                map.set(
                                    "ruleAttributeFirstLevel",
                                    ruleAttributeFirstLevel
                                );
                                map.set("defaultValue", defaultValue);
                                map.set("ruleAttributeName", ruleAttributeName);
                                this.ruleAttributeMessageList.push(map);
                                this.form[ruleAttributeFirstLevel] = null;
                            }
                        }
                    }
                })
                .catch((reg) => {
                    this.$message.warning("查询失败，请稍后尝试");
                });
        },
        //点击测试按钮
        test() {
            let that = this;
            for (let i in that.form) {
                if (
                    that.form[i] === "" ||
                    that.form[i] === undefined ||
                    that.form[i] === null
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
                // let params1 = { tree_code: this.form.treeCodes }
                //     //this.form.version = this.version.length > 0 ? this.version : undefined
                //     this.$http
                //         .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
                //             ...params1,
                //             servicecode:
                //                 "deci060108"
                //         })
                //         .then((obj) => {
                //             if (obj.code === "200") {
                //                 console.log("测试接口请求回调", obj);
                //                   this.treedate = obj.data[0];     
                //                      console.log("数111据" + treedate);                     
                //             } else {
                //                 this.$message.error(obj.retMsg);
                //             }
                //         })
                //         .catch((reg) => {
                            
                //         });



                    console.log(" this.form", this.form);
                     let params = { field_map: cloneJSON(this.form) }
                    params.field_map["version"] =
                        this.version.length > 0 ? this.version : undefined;
                    //this.form.version = this.version.length > 0 ? this.version : undefined
                    this.$http
                        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
                            ...params,
                            servicecode:
                                "deci030004"
                        })
                        .then((obj) => {
                            if (obj.code === "200") {
                                console.log("测试接口请求回调", obj);
                                 let treeout = obj.data.field_map[0].TREE_OUT;
                                let tableData = obj.data.field_map[0].execTreeInfo;
                                let responseData = obj.data.field_map[0].execTreeInfo;
                                console.log("要展示的表格数据", tableData);
                                console.log("节点", treeout);
                                console.log(
                                    "要可以复制的字符串数据",
                                    responseData
                                );
                                if (
                                    tableData &&
                                    tableData[0].hit.length === 0
                                ) {
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
                                                textContent:
                                                    "未命中任何节点规则",
                                            },
                                        },
                                        width: "35%",
                                        height: "32%",
                                    });
                                } else {
                                    that.$dialog.open({
                                        that: that,
                                        title: "查看",
                                        toRequest: {
                                            url: "@decisionTreeResultTest",
                                            method: "get",
                                            params: {
                                                responseData: JSON.stringify(
                                                    obj,
                                                    null,
                                                    "\t"
                                                ),
                                                treeout,
   
                                            },
                                        },
                                        width: "70%",
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
        //重置
        reset() {
            for (let ruleAttributeMessageMap of this.ruleAttributeMessageList) {
                this.form[
                    ruleAttributeMessageMap.get("ruleAttributeFirstLevel")
                ][ruleAttributeMessageMap.get("ruleAttributeSecondLevel")] =
                    null;
            }
            this.$forceUpdate();
        },
    },
};
</script>

<style lang="css" scoped>
.page_content {
    width: 100%;
    position: relative;
}
.inputItem {
    width: 100%;
}
.footForm {
    position: relative;
}
.buttonGroup {
    position: absolute;
    bottom: -30px;
}
.input_el_70 {
    width: 70%;
}
.input_el_30 {
    width: 40%;
}
.el-col-12 {
    width: 45%;
}
.downLoad {
    right: 10px;
    top: 10px;
    position: absolute;
    opacity: 0;
}
</style>
