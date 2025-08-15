<template>
    <el-col :span="8">
        <el-form-item class="upload-item" :label="field_desc" :prop="field_name">
        <el-input v-model="value" :disabled="false"></el-input>
        </el-form-item>
    </el-col>
</template>

<script>
    export default {
        props: ['item'],
        data() {
            return {
                field_name: this.item.field_name,
                field_desc : this.item.field_desc,
                value: this.item.val
            }
        },
        watch: {
            value(v, o) {
                console.log("============="+v);
                console.log("-----------------"+v);
                this.$emit('changeComponent', {
                    number: this.number,
                    key: this.$data.field_name,
                    value: this.$data.value
                })
            }
        }
    }
</script>
