<template>
    <div>
        <el-form
            ref="form"
            :model="currentEditAtrr"
            label-width="110px"
            class="form-two-column"
            :rules="rules"
        >
            <el-form-item v-if="currentEditAtrr.originId !== undefined" label="ID" prop="originId">
                <el-input v-model="currentEditAtrr.originId" disabled />
            </el-form-item>
            <el-form-item label="名称" prop="ruleName">
                <el-input
                    v-model="currentEditAtrr.ruleName"
                    @blur="saveAttr()"
                    :disabled="onlyRead"
                />
            </el-form-item>
            <el-form-item label="规则表达式" class="full-row" prop="executableExpression">
                <el-input v-model="currentEditAtrr.executableExpression" type="textarea" :rows="4"></el-input>
            </el-form-item>
            <el-form-item label="规则描述" class="full-row" prop="ruleContentDesc">
                <el-input v-model="currentEditAtrr.ruleContentDesc" type="textarea" :rows="4"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    props: {
        saveAttr: {
            type: Function,
            required: true,
        },
        onlyRead: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            rules: {
                originId: [
                    { required: true, message: "ID不能为空", trigger: "blur" },
                ],
                ruleName: [
                    {
                        required: true,
                        message: "名称不能为空",
                        trigger: "blur",
                    },
                ],
                executableExpression: [
                    {
                        required: true,
                        message: "规则表达式不能为空",
                        trigger: "blur",
                    },
                ],
                ruleContentDesc: [
                    {
                        required: true,
                        message: "规则描述不能为空",
                        trigger: "blur",
                    },
                ],
            },
        };
    },
    computed: {
        ...mapGetters(["currentEditAtrr"]),
    },
    methods: {
        formValid() {
            let flag = true;
            this.$refs.form.validate((valid) => {
                flag = valid;
            });
            return flag;
        },
    },
};
</script>

<style lang="less" scoped>
.form-two-column {
    padding: 0;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding: 20px 20px 0 0;
    .el-form-item {
        width: 50%;
        margin-bottom: 18px;
    }
    /deep/ .el-form-item.full-row {
        width: 100%;
    }
}
</style>
