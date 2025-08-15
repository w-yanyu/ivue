<template>
    <div class="menu-form">
        <div class="menu-form--container">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px" class="custom-common--form">
                <el-row>
                    <el-col :span="11">
                        <el-form-item label="规则组代码" prop="groupCode" label-width="150px">
                            <el-input v-model="ruleForm.groupCode" @input="groupCodeInput($event)" type="text"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="11">
                        <el-form-item label="规则组名称" prop="groupName" label-width="150px">
                            <el-input v-model="ruleForm.groupName" type="text"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="22">
                        <el-form-item label="备注" prop="description" label-width="150px">
                            <!--    <el-input class="input_el"  maxlength='500' type="textarea" :rows="2" v-model="ruleForm.description" @input="descriptionInput($event)">
                                </el-input>-->
                            <div>
                                <el-input class="input_el" type="textarea" :rows="3" v-model="ruleForm.description"
                                    clearable maxlength="200" show-word-limit />
                            </div>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="menu-footer" style="text-align: center;">
                    <el-col :span="24">
                        <el-button type="primary" size="small" @click="submit">保存</el-button>
                        <el-button small @click="reset">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
const isEmpty = (str) => {
    if (str === "" || str === undefined || str === null) {
        return true;
    }
    return false;
};
export default {
    props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object, // 父页面的scope数据对象
    },
    data() {
        return {
            maxLength: 500,
            ruleForm: {
                groupId: "", //规则组id
                groupName: "", //规则组名称
                groupCode: "", //规则组代码
                description: "", //描述
            },
            rules: {
                groupName: [
                    {
                        required: true,
                        pattern: "^[a-z0-9A-Z\u4e00-\u9fa5]+$",
                        message: "仅可为字母、数字、文字及相关组合",
                        trigger: "blur",
                    },
                ],
                groupCode: [
                    {
                        required: true,
                        message: "请正确输入",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    computed: {
        // 计算当前文本框中内容的字数
        valueLength() {
            let that = this;
            if (isEmpty(that.ruleForm.description)) {
                return 0;
            }
            return that.ruleForm.description.length;
        },
    },
    watch: {
        // 监听value的变化
        value: {
            handler(val, oldVal) {
                let that = this;
                that.ruleForm.description = val;
            },
            immediate: true,
        },
    },
    mounted() {
        let that = this;
        console.log("cParentParams", that.cParentParams);
        //that.initGroupCode();
    },
    methods: {
        initGroupCode() {
            let params = {
                servicecode: "deci010610"
            }
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                    let that = this;
                    console.log("that.ruleForm.groupCode", obj.data.groupCode);
                    that.ruleForm.groupCode = obj.data.groupCode
                    // this.$dialog.close();
                    // this.fetch(true)
                    //this.$dataBus.doCallBack(this, params);
                })
                .catch((res) => {
                    this.$message.error("获取规则代码失败");
                });
        },
        groupCodeInput(event) {
            let that = this;
            console.log(event);
            let value = event;
            if (/^[^a-z]/i.test(value)) {
                //如果不是以a-z 开头,将value置空,并提示
                value = value.substr(0, 0);
                that.$message.error("规则组代码只能字母开头");
            }
            that.ruleForm.groupCode = value;
        },
        descriptionInput(event) {
            let that = this;
            console.log(event);
            let value = event;
            if (String(value).length > 500) {
                that.$message.error("字数超限，请重新输入");
            }
            that.ruleForm.description = that.ruleForm.description.substring(
                0,
                this.maxLength
            );
        },
        //提交
        submit() {
            let that = this;
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    // let userInfo = JSON.parse(
                    //     localStorage.getItem("userInfo")
                    //);
                    let request_map = {
                        groupCode: that.ruleForm.groupCode,
                        groupName: that.ruleForm.groupName,
                        description: that.ruleForm.description,
                        //    createUser: userInfo.userCode,
                        //    updateUser: userInfo.userCode,
                        servicecode:
                            "deci010612"
                    };
                    this.$http
                        .invokeAPI(
                            "/SUMP/icmcall/icmRPCCall",
                            "POST",
                            request_map
                        )
                        .then((response) => {
                            if (response.code === "200") {
                                //that.$dataBus.doCallBack(this, obj);
                                this.$message({
                                    message: "新增成功",
                                    type: "success",
                                });
                                that.$dataBus.doCallBack(that, response);
                            } else {
                                this.$message({
                                    message: response.message,
                                    type: "error",
                                });
                            }
                        });
                } else {
                    this.$message.warning("校验失败，请填写好表单");
                }
            });
        },
        //重置
        reset() {
            let that = this;
            // that.ruleForm.group_code = "";
            that.ruleForm.groupName = "";
            that.ruleForm.description = "";
        },
    },
};
</script>
