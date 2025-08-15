<template>
    <el-collapse v-model="activeName" accordion>
        <el-collapse-item name="1">
            <template slot="title">
                <i class="header-icon el-icon-info"></i>
                <div class="blueLine"></div>事实信息
            </template>
            <el-form :model="fact" ref="form" :rules="rules" label-width="130px">
                <el-row>
                    <el-col span="8" label-width="150px">
                        <el-form-item label="事实代码" prop="fact_code">
                            <el-input
                                v-model="fact.fact_code"
                                class="inputItem"
                                placeholder="请输入事实名称"
                                clearable
                                disabled
                            ></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col span="8" label-width="150px">
                        <el-form-item label="事实场景" prop="fact_scene" allow-create="true">
                         <el-select
                                v-model="fact.fact_scene"
                                placeholder="请输入事实场景"
                                 @change="dataTypeChange"
                                style="width: 200px; margin-right: 0px;"
                            >
                                <el-option
                                    v-for="item in dataTypeOptions"
                                    :key="item.dictId"
                                    :label="item.dictName"
                                    :value="item.dictId"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                    <el-col span="8" label-width="150px">
                        <el-form-item label="事实名称" prop="fact_name" allow-create="true">
                            <el-input
                                v-model="fact.fact_name"
                                class="inputItem"
                                placeholder="请输入事实名称"
                                clearable
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col span="24">
                        <el-form-item label="备注" prop="description" clearable>
                            <el-input
                                v-model="fact.description"
                                type="textarea"
                                rows="5"
                                show-word-limit
                                maxlength="200"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item class="footForm">
                            <div class="buttonGroup">
                                <el-button type="primary" small @click="saveUpData">保存</el-button>
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-collapse-item>

        <el-collapse-item name="2">
            <template slot="title">
                <i class="header-icon el-icon-info"></i>
                <div class="blueLine"></div>属性信息
            </template>
            <to-json :params="cParentParams" :toUrl="attributeInfo "></to-json>
        </el-collapse-item>
    </el-collapse>
</template>

<script>
import Api from "../utils/api";
import MyAxios from "pte-ui/utils/MyAxios";
import factScenario from "@/views/risk/dictdata/factScenario"; 
export default {
    components: {},
    props: {
        cMeta: Object, //本页面模板json数据Layout对象
        cParentMeta: Object, //父页面模板json数据Layout对象
        cParentParams: Object, //父页面自定义参数与内置参数
        cParentScope: Object, //父页面每块区域业务数据
    },
    data() {
        return {
            //事实信息
            factInfo: "/views/risk/risk_fact/risk_facts_info.json",
            //属性信息
            attributeInfo:
                "/views/risk/risk_fact/attribute/risk_attribute_list.json",
            activeName: ["1", "2"],

            fact: {
                fact_code: "", //事实代码
                fact_name: "", //事实名称
                fact_scene: "", //事实场景
                description: "", //备注
            },
            rules: {
                fact_code: [
                    {
                        required: true,
                        message: "请输入事实代码",
                        trigger: "blur",
                    },
                ],
                fact_name: [
                    {
                        required: true,
                        pattern: "^[a-z0-9A-Z\u4e00-\u9fa5]+$",
                        message: "仅可为字母、数字、文字及相关组合",
                        trigger: "blur",
                    },
                ],
                field_code: [
                    {
                        required: true,
                        message: "请输入属性代码",
                        trigger: "blur",
                        pattern: "^[A-Za-z][A-Za-z\\d_]{0,59}$",
                    },
                ],
                fact_scene: [
                    {
                        required: true,
                        message: "请输入事实场景",
                        trigger: "blur",
                        max: 100,
                    },
                ],
                description: [
                    {
                        max: 500,
                        message: "最大长度为500",
                    },
                ],
            },
            dataTypeOptions: [],
        };
    },
    mounted() {
        this.getDictList("RISK_E_FACTUAL_SCENARIO", "dataTypeOptions");
        console.log(
            "父类传过来的数据risk_rule_constant_add",
            this.cParentParams
        );
        //this.dataTypeOptions = factScenario.data;
        if (this.cParentParams.isEdit) {
            this.isEdit = this.cParentParams.isEdit;
            this.queryEditData();
        }
    },
    created() {
        console.log("父类传过来的数据risk_facts_update", this.cParentParams);
        this.cParentParams.flag = 1;
        this.fact.fact_code = this.cParentParams.fact_code;
        this.fact.fact_name = this.cParentParams.fact_name;
        this.fact.fact_scene = this.cParentParams.fact_scene;
        this.fact.description = this.cParentParams.description;
    },
    methods: {
        factInfoJsonCallBack(data) {
            console.log("factInfoJsonCallBack模板回调回来的数据", data);
            this.confirm();
        },
        confirm() {
            this.$dataBus.doCallBack(this, {});
        }, /**
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
        //保存
        saveUpData() {
            //发送请求前，再次进行表单校验
            //先获取表单对象，然后执行校验方法
            //获取用户信息
            this.$refs.form.validate((valid) => {
                //valid校验结果 true校验通过
                console.log(valid);
                if (valid) {
                    //获取用户信息
                    // console.log(this.$store.getters.name.toString());
                    let params = {
                        updateUser: this.$store.getters.name.toString(),
                        fact_code: this.fact.fact_code,
                        fact_name: this.fact.fact_name,
                        fact_scene: this.fact.fact_scene,
                        description: this.fact.description,
                        servicecode:
                            "deci010104",
                    };
                    //请求表格数据
                    this.$http
                        .invokeAPI(Api.risk_req_urlRPC, "POST", params)
                        .then((obj) => {
                            if (obj.code === "200") {
                                this.$message.success("保存成功");
                            }
                            this.$dataBus.doCallBack(this, this.fact);
                        })
                        .catch((reg) => {
                            //this.$message.warning("保存失败，请稍后尝试");
                        });
                } else {
                    this.$message.warning("校验失败，请填写好表单");
                }
            });
        },
        //重置
        reset() {
            this.fact = {};
        },
    },
};
</script>

<style lang="css" scoped>
.blueLine {
    width: 2px;
    height: 15px;
    margin-right: 8px;
    background-color: #00aaff;
}
.inputItem {
    width: 100%;
}
.footForm {
    position: relative;
}
.buttonGroup {
    position: absolute;
    right: 0px;
    bottom: -25px;
}
</style>
