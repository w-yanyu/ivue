<template>
    <div class="page_content">
        <el-form :model="form" :rules="rules" ref="form" span="24" label-position="right">
            <el-row>
                <el-col span="12">
                    <el-form-item label="规则组代码" prop="groupCode" required="true">
                        <el-input
                            class="input_el_70"
                            placeholder="请点击按钮选择"
                            disabled
                            v-model="form.groupCode"
                            type="text"
                        ></el-input>
                        <el-button type="primary" @click="openDialog">选择</el-button>
                    </el-form-item>
                </el-col>
                <el-col span="12">
                    <el-form-item label="规则组名称" prop="groupName" required="true">
                        <el-input
                            class="input_el_70"
                            disabled
                            v-model="form.groupName"
                            type="text"
                        ></el-input>
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
                    <el-form-item label="版本号" prop="version" >
                        <el-input
                            class="input_el_70"
                            disabled
                            v-model="form.version"
                            type="text"
                        ></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row span="24">
                <el-col
                    span="7"
                    style="margin-left:20px"
                    v-for="(ruleGroupAttributeMessageMap,index) in ruleGroupAttributeMessageList"
                    :key="index"
                >
                    <el-form-item
                        :label="ruleGroupAttributeMessageMap.get('ruleGroupAttributeName')"
                        :key="ruleGroupAttributeMessageMap.get('ruleGroupAttributeFirstLevel') +'.' +ruleGroupAttributeMessageMap.get('ruleGroupAttributeSecondLevel')"
                        :prop="ruleGroupAttributeMessageMap.get('ruleGroupAttributeSecondLevel')"
                    >
                        <el-input
                            v-if="ruleGroupAttributeMessageMap.get('defaultValueType') == 'number'"
                            v-model.number="form[ruleGroupAttributeMessageMap.get('ruleGroupAttributeFirstLevel')][ruleGroupAttributeMessageMap.get('ruleGroupAttributeSecondLevel')]"
                            :type="ruleGroupAttributeMessageMap.get('defaultValueType')"
                            @input="change()"
                            clearable
                            :placeholder="ruleGroupAttributeMessageMap.get('ruleGroupAttributeFirstLevel') +'.' +ruleGroupAttributeMessageMap.get('ruleGroupAttributeSecondLevel')"
                        />
                        <el-input
                            v-if="ruleGroupAttributeMessageMap.get('defaultValueType') == 'string'"
                            v-model="form[ruleGroupAttributeMessageMap.get('ruleGroupAttributeFirstLevel')][ruleGroupAttributeMessageMap.get('ruleGroupAttributeSecondLevel')]"
                            :type="ruleGroupAttributeMessageMap.get('defaultValueType')"
                            @input="change()"
                            clearable
                            :placeholder="ruleGroupAttributeMessageMap.get('ruleGroupAttributeFirstLevel') +'.' +ruleGroupAttributeMessageMap.get('ruleGroupAttributeSecondLevel')"
                        />
                        <el-select
                            v-if="ruleGroupAttributeMessageMap.get('defaultValueType') == 'boolean'"
                            v-model="form[ruleGroupAttributeMessageMap.get('ruleGroupAttributeFirstLevel')][ruleGroupAttributeMessageMap.get('ruleGroupAttributeSecondLevel')]"
                            @change="change"
                            style="width:100%"
                            clearable
                            :placeholder="ruleGroupAttributeMessageMap.get('ruleGroupAttributeFirstLevel') +'.' +ruleGroupAttributeMessageMap.get('ruleGroupAttributeSecondLevel')"
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
        <el-button class="downLoad" type="primary" @click="openDialog">SDK下载</el-button>
    </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
export default {
    data() {
        return {
            form: {
                groupCode: "", // 规则组代码
                groupName: "", // 规则组代码
                version: "", // 规则组代码
                branch_id: "", // 规则组代码
                //groupId:"",//规则组Id
            },
            show: true, // 页面
            ruleGroupSelectOptions: [], // 规则组代码下拉框选项
            ruleGroupAttributeMessageList: [], // 规则组属性报文列表
            modifyDialogVisible: false,
            statusList: [], //机构列表
            responseMessage: "", // 测试成功，响应数据报文
            rules: {
                // groupCode: [{
                //   required: true,
                //   message: "该控件必填",
                //   trigger: "blur",
                // }, ],
            },
            options: [
                {
                    value: "true",
                    label: "是",
                },
                {
                    value: "false",
                    label: "否",
                },
            ],
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
                this.form[obj.get("ruleGroupAttributeFirstLevel")][
                    obj.get("ruleGroupAttributeSecondLevel")
                ]
            );
            if (
                this.form[obj.get("ruleGroupAttributeFirstLevel")][
                    obj.get("ruleGroupAttributeSecondLevel")
                ] === ""
            ) {
                this.form[obj.get("ruleGroupAttributeFirstLevel")][
                    obj.get("ruleGroupAttributeSecondLevel")
                ] = 0;
                this.$forceUpdate();
            }
        },
        //选择规则组
        openDialog() {
            let that = this;
            // this.$emit('openDialog');
            console.log("this.$dataBus.getCurrentFormData(this)");
            console.log("this.$dataBus", that.$dataBus);
            that.$dataBus.bindCallBackMethod(that, that.jsonCallBack, {});
            that.$dialog.open({
                that: that,
                title: "规则组代码选择",
                toRequest: {
                    url: "/views/risk/risk_decision_rule/group/risk_decision_rule_group_lookup.json",
                    method: "get",
                },
                width: "60%",
            });
        },
        jsonCallBack(btnConfig, response) {
            //debugger
            console.log("json模板回调回来的数据1", btnConfig);
            console.log("json模板回调回来的数据2", response);
            this.ruleGroupSelectOptions = response;
            this.form.groupCode = response.group_code;
            this.form.groupName = response.group_name;
            this.form.version = response.busi_version;
            this.form.branch_id = response.branch_id;
            //选择回带触发查询属性方法
            this.selectGroupCode(response.group_code, response.busi_version);
        },
        //查询规则组对应的规则属性
        selectGroupCode(groupCode,version) {
            let params = {
                groupCode: groupCode,
                version: version

            };
             params = { field_map: params }
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST",{
                    model_id: groupCode,
                    model_version: version,
                    model_type: "PZ", 
                    servicecode: "deci030006"
                })
                .then((obj) => {
                    if (obj.code === "200") {
                        console.log("下拉框发生改变, 触发请求回调", obj);
                        // 清空ruleGroupAttributeMessageList
                        this.ruleGroupAttributeMessageList = [];
                        let ruleGroupAttributeMessageObject = obj.data.field_map;
                        for (let firstLevelKey in ruleGroupAttributeMessageObject) {
                            let firstLevelValue =
                                ruleGroupAttributeMessageObject[firstLevelKey];
                            // 处理有两级结构的数据
                            if (firstLevelValue instanceof Object) {
                                for (let secondLevelKey in firstLevelValue) {
                                    let map = new Map();
                                    // 根据 '-' 拆分 key 中的 scoreAttribute 和 ruleGroupAttributeName
                                    let ruleGroupAttributeFirstLevel =
                                        firstLevelKey;
                                    let ruleGroupAttributeSecondLevel =
                                        secondLevelKey.split("-")[0];
                                    let ruleGroupAttributeName =
                                        secondLevelKey.split("-")[1];
                                    let defaultValue =
                                        firstLevelValue[secondLevelKey];
                                    map.set(
                                        "ruleGroupAttributeFirstLevel",
                                        ruleGroupAttributeFirstLevel
                                    );
                                    map.set(
                                        "ruleGroupAttributeSecondLevel",
                                        ruleGroupAttributeSecondLevel
                                    );
                                    map.set("defaultValue", defaultValue);
                                    map.set(
                                        "ruleGroupAttributeName",
                                        ruleGroupAttributeName
                                    );
                                    map.set(
                                        "defaultValueType",
                                        typeof defaultValue
                                    );
                                    //console.log(typeof defaultValue+"===========zmh=========")
                                    this.ruleGroupAttributeMessageList.push(
                                        map
                                    );
                                    if (
                                        this.form[
                                            ruleGroupAttributeFirstLevel
                                        ] instanceof Object
                                    ) {
                                        this.form[ruleGroupAttributeFirstLevel][
                                            ruleGroupAttributeSecondLevel
                                        ] = null;
                                    } else {
                                        this.form[
                                            ruleGroupAttributeFirstLevel
                                        ] = {
                                            [ruleGroupAttributeSecondLevel]:
                                                null,
                                        };
                                    }
                                }
                            } else {
                                // 处理只有一级结构的数据
                                let map = new Map();
                                let ruleGroupAttributeFirstLevel =
                                    firstLevelKey.split("-")[0];
                                let ruleGroupAttributeName =
                                    firstLevelKey.split("-")[1];
                                let defaultValue = firstLevelValue;
                                map.set(
                                    "ruleGroupAttributeFirstLevel",
                                    ruleGroupAttributeFirstLevel
                                );
                                map.set("defaultValue", defaultValue);
                                map.set(
                                    "ruleGroupAttributeName",
                                    ruleGroupAttributeName
                                );
                                this.ruleGroupAttributeMessageList.push(map);
                                this.form[ruleGroupAttributeFirstLevel] = null;
                                //console.log(typeof defaultValue+"===========zmh2=========")
                            }
                        }
                        console.log(
                            "规整好的项目显示类",
                            this.ruleGroupAttributeMessageList
                        );
                    }
                })
                .catch((reg) => {
                    this.$message.warning("查询失败，请稍后尝试");
                });
        },
        //点击测试
        test() {
            console.log("--------",this);
            let that = this;
            //表单非空校验
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
                    console.log(" this.form", this.form);
                     let params = { field_map: this.form }
                    this.$http
                        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
                            ...params,
                            servicecode: "deci030003"
                        })
                        .then((obj) => {
                            if (obj.code === "200") {
                                // this.responseMessage = JSON.stringify(obj.data, null, '\t');
                                // this.modifyDialogVisible = true;
                                console.log("测试接口请求回调", obj);
                                let tableData = obj.data.field_map[0].execNormalNotRuleInfo;
                                let groupCode = this.form.groupCode
                                let groupName = this.form.groupName
                                console.log("execNormalNotRuleInfo", tableData);
                                console.log(
                                    "that.form.scoreData",
                                    that.form.scoreData
                                );
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
                                } else {
                                    that.$dialog.open({
                                        that: that,
                                        title: "测试成功，响应数据如下：",
                                        toRequest: {
                                            url: "@normalRuleGroupTestResult",
                                            method: "get",
                                            params: {
                                                tableData,
                                                responseData: JSON.stringify(
                                                    obj,
                                                    groupCode,
                                                    null,
                                                    "\t"
                                                ),
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
            for (let ruleGroupAttributeMessageMap of this
                .ruleGroupAttributeMessageList) {
                this.form[
                    ruleGroupAttributeMessageMap.get(
                        "ruleGroupAttributeFirstLevel"
                    )
                ][
                    ruleGroupAttributeMessageMap.get(
                        "ruleGroupAttributeSecondLevel"
                    )
                ] = null;
            }
            this.$forceUpdate();
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
.downLoad {
    right: 10px;
    top: 10px;
    position: absolute;
    opacity: 0;
}
</style>
