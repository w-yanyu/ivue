<template>
    <div class="menu-form">
        <div class="menu-form--container">
            <el-form
                ref="ruleForm"
                :model="ruleForm"
                :rules="rules"
                label-width="130px"
                class="custom-common--form"
            >
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="常量代码" prop="const_code" label-width="100px" >
                            <el-input
                                class="input_el"
                                :value="ruleForm.const_code"
                                type="text"
                                :disabled="true"
                                style="width: 350px; margin-right: 0px;"
                            ></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="常量名称" prop="const_name" label-width="100px">
                            <el-input
                                class="input_el"
                                v-model="ruleForm.const_name"
                                type="text"
                                style="width: 350px; margin-right: 0px;"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="数据类型" prop="data_type" label-width="100px">
                            <el-select
                                v-model="ruleForm.data_type"
                                placeholder="数据类型"
                                @change="dataTypeChange"
                                style="width: 350px; margin-right: 0px;"
                            >
                                <el-option
                                    v-for="item in dataTypeOptions"
                                    :key="item.dictId"
                                    :label="item.dictId+'-'+item.dictName"
                                    :value="item.dictId"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="备注" prop="description" label-width="100px">
                            <el-input
                                class="input_el"
                                type="textarea"
                                :rows="4"
                                show-word-limit
                                maxlength="200"
                                v-model="ruleForm.description"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="值类型" prop="value_type" label-width="100px">
                            <el-radio-group
                                v-model="ruleForm.value_type"
                                :disabled="ruleForm.data_type =='Boolean'"
                                @change="valueTypeChange"
                            >
                                <el-radio label="S">单值</el-radio>
                                <el-radio label="M">多值</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12" v-if="ruleForm.value_type==='S'">
                        <el-form-item label="常量值" prop="const_value" label-width="100px">
                            <el-input
                                class="input_el"
                                v-model="ruleForm.const_value"
                                @input="constValueInput($event)"
                                type="text"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row v-if="ruleForm.value_type==='M'">
                    <el-col :span="24">
                        <el-form-item label="常量值" prop="constInfo" label-width="100px">
                            <to-json
                                :params="ruleForm"
                                :toUrl="constUrl "
                                @jsonCallBack="jsonCallBack"
                            ></to-json>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <div class="tip-left">
                <el-button type="primary" @click="confirm">确定</el-button>
                <el-button type="info" @click="reset">重置</el-button>
            </div>
        </span>
    </div>
</template>
<script>
import Api from "@/views/risk/utils/api"; //网络请求框架
import dictDataType from "@/views/risk/dictdata/dataType"; //导入操作符正常值选项
import { Loading } from "element-ui";

export default {
    props: {
        cMeta: Object, //本页面模板json数据Layout对象
        cParentMeta: Object, //父页面模板json数据Layout对象
        cParentParams: Object, //父页面自定义参数与内置参数
        cParentScope: Object, //父页面每块区域业务数据
    },
    data() {
        return {
            ruleForm: {
                const_code: "", //常量代码
                const_name: "", //常量名称
                data_type: "", //数据类型
                status: "1", //状态
                description: "", //描述
                value_type: "", //值类型
                const_value: "", //单值常量
                constInfo: [], //多值常量
            },
            rules: {
                const_code: [
                    {
                        required: true,
                        message: "请正确输入",
                        trigger: "blur",
                    },
                ],
                const_name: [
                    {
                        required: true,
                        pattern: "^[a-z0-9A-Z\u4e00-\u9fa5]+$",
                        message: "仅可为字母、数字、文字及相关组合",
                        trigger: "blur",
                    },
                ],
                data_type: [
                    {
                        required: true,
                        message: "该控件必填",
                        trigger: "blur",
                    },
                ],
                status: [
                    {
                        required: true,
                        message: "该控件必填",
                        trigger: "blur",
                    },
                ],
                value_type: [
                    {
                        required: true,
                        message: "该控件必填",
                        trigger: "blur",
                    },
                ],
                const_value: [
                    {
                        required: true,
                        message: "该控件必填",
                        trigger: "blur",
                    },
                ],
            },
            defineRules: {},
            dataTypeOptions: [],
            constUrl: "/views/risk/risk_rule_constant/constant_add.json",
            isEdit: false, //是否处于编辑状态
        };
    },
    mounted() {
        console.log(
            "父类传过来的数据risk_rule_constant_add",
            this.cParentParams
        );
        this.dataTypeOptions = dictDataType.data;
        if (this.cParentParams.isEdit) {
            this.isEdit = this.cParentParams.isEdit;
            this.queryEditData();
        }else{
             this.queryConstCode();
        }
    },
    watch:{
        "ruleForm.data_type"(newVal){
            if(newVal == 'Boolean'){
                this.ruleForm.value_type = 'M'
            }
        }
    },
    methods: {
        //数据类型选择
        dataTypeChange(event) {
            console.log("dataTypeChange", event);
            let that = this;
            that.ruleForm.value_type = ""; //值类型
            that.ruleForm.const_value = ""; //常量值
            that.ruleForm.constInfo = []; //多值常量
        },
        //单值多值变化
        valueTypeChange(event) {
            console.log("valueTypeChange", event);
            let that = this;
            // if (event === 's'){
            //   this.rules = this.defineRules;
            //   this.rules['const_value'] = [{
            //       required: true,
            //       message: "该控件必填",
            //       trigger: "blur",
            //     }, ]
            // } else {
            //    this.rules = this.defineRules;
            // }
            that.ruleForm.const_value = ""; //常量值
            that.ruleForm.constInfo = []; //多值常量
        },
        //单值常量输入
        constValueInput(event) {
            console.log("constValueInput", event);
            let value = event;
            if (this.ruleForm.data_type === "Int") {
                //一般情况下只能输入整数
                this.ruleForm.const_value = value.replace(/\D/g, "");
            }
            if (this.ruleForm.data_type === "Decimal") {
                //只能输入数字不能输入小数点
                this.ruleForm.const_value = value
                    .replace(/[^\d.]/g, "")
                    .replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
            }
        },
        confirm() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.sendData();
                }
            });
        },
        sendData() {
            let that = this;
            let jsonFormData = this.$dataBus.getCurrentFormData(this);
            if (
                that.ruleForm.value_type === "M" &&
                jsonFormData.constInfo.length === 0
            ) {
                return this.$message.error("常量未填写，请检查");
            }
            if (!this.checkConstInfo(jsonFormData.constInfo)) {
                return
            }
            // if (
            //     that.ruleForm.value_type === "M" &&
            //     jsonFormData.constInfo.length > 0 &&
            //     !this.checkConstInfo(jsonFormData.constInfo)
            // ) {
            //     return this.$message.error("常量值或备注不符合要求，请检查");
            // }
            console.log("jsonFormData.constInfo", jsonFormData.constInfo);
            let userInfo = JSON.parse(localStorage.getItem("user_info"));
            let param = {
                const_code: that.ruleForm.const_code, //常量代码
                const_name: that.ruleForm.const_name, //常量名称
                data_type: that.ruleForm.data_type, //数据类型
                status: that.ruleForm.status, //状态
                description: that.ruleForm.description, //描述
                value_type: that.ruleForm.value_type, //值类型
                const_value: that.ruleForm.const_value, //单值常量
                constInfo: jsonFormData.constInfo ? jsonFormData.constInfo : [], //多值常量
                data_create_user: userInfo.userCode,
                data_update_user: userInfo.userCode,
                //appId: "risk-management-service",
            };
            let loading = Loading.service();
            if (that.cParentParams.isEdit) {
                param.servicecode ="deci010204";
                    //"risk-management-service/risk_rule_constant/update";
            } else {
                param.servicecode ="deci010202";
                   // "risk-management-service/risk_rule_constant/add";
            }
            console.log("提交的参数", param);
            that.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", param)
                .then((obj) => {
                    that.$message({
                        type: "success",
                        message: "成功",
                    });
                    that.$dataBus.doCallBack(that, obj);
                })
                .catch((reg) => {
                    console.log("reg", reg);
                });
            loading.close();
        },
        //校验多值的时候，输入是否正确
        //constInfo[{const_value: "111",data_type: "String",description: "222"}]
        checkConstInfo(constInfo) {
            let that = this
            let regInt = /^\+?[1-9][0-9]*$/; //非负整数（正整数 + 0）
            let regDecimal =
                /^(0\.(?!0+$)\d{1,4}|^[1-9][0-9]{0,20}(\.\d{0,2})?)$/;
            let regBoolean = /^(true)$|^(false)$/;
            for (const i in constInfo) {
                console.log("regInt", regInt.test(constInfo[i].const_value));
                //console.log("child", child);
                console.log("Decimal", regDecimal.test(constInfo[i].const_value));
                console.log("Boolean", regBoolean.test(constInfo[i].const_value));
                if ( constInfo[i].const_value === "" ){
                    that.$message.error(`常量值列表 第${parseInt(i)+1}行 常量值不能为空`);
                    return false;
                }
                 if ( constInfo[i].description === "" ){
                      that.$message.error(`常量值列表 第${parseInt(i)+1}行 备注不能为空`);
                    return false;
                }
                if (
                    constInfo[i].data_type === "Int" &&
                    !regInt.test(constInfo[i].const_value)
                ) {
                     this.$message.error(`常量值列表 第${parseInt(i)+1}行 常量值不符合要求，请检查`);
                    return false;
                }
                if (
                    constInfo[i].data_type === "Decimal" &&
                    !regDecimal.test(constInfo[i].const_value)
                ) {
                    this.$message.error(`常量值列表 第${parseInt(i)+1}行 常量值不符合要求，请检查`);
                    return false;
                }
                if (
                    constInfo[i].data_type === "Boolean" &&
                    !regBoolean.test(constInfo[i].const_value)
                ) {
                    this.$message.error(`常量值列表 第${parseInt(i)+1}行 常量值不符合要求，请检查`);
                    return false;
                }
            }
            return true;
        },
        reset() {
            let that = this;
            //that.ruleForm.const_code = ""; //常量代码
            that.ruleForm.const_name = ""; //常量名称
            that.ruleForm.data_type = ""; //数据类型
            that.ruleForm.status = "1"; //状态
            that.ruleForm.description = ""; //描述
            that.ruleForm.value_type = ""; //值类型
            that.ruleForm.const_value = ""; //常量值
            that.ruleForm.constInfo = []; //多值常量
        },
        jsonCallBack(data) {
            console.log("json模板回调回来的数据", data);
        },
        queryEditData() {
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
                    ...this.cParentParams,
                    //appId: "risk-management-service",
                    servicecode:"deci010203",
                       // "risk-management-service/risk_rule_constant/query",
                })
                .then((obj) => {
                    this.ruleForm = obj.data[0];
                     console.log(obj.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
         queryConstCode() {
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
                    ...this.cParentParams,
                    //appId: "risk-management-service",
                    servicecode:"deci010207",
                       // "risk-management-service/risk_rule_constant/query",
                })
                .then((obj) => {
                    this.ruleForm.const_code = obj.data.const_code;
                     console.log(obj.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
};
</script>

<style lang="css" scoped>
#page_content {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
}
.dialog-footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    text-align: left;
}
.input-row {
    min-height: 100px;
}
</style>
