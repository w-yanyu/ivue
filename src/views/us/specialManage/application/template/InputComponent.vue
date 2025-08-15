<template>
    <div>
    <el-col :span="12">
        <el-form-item class="upload-item" :label="ofield_desc" :prop="ofield">
        <el-input v-model="oldval" :disabled="true"></el-input>
        </el-form-item>
    </el-col>
    
    <el-col :span="12">
        <el-form-item class="upload-item" :label="nfield_desc" :prop="nfield">
        <el-input v-model="newval" :disabled="false"></el-input>
        </el-form-item>
    </el-col>
    </div>
</template>

<script>
    export default {
        props: ['item'],
        data() {
            return {
                appl_no: this.item.appl_no,
                order_seq: this.item.order_seq,
                ofield: this.item.field_name,
                nfield: this.item.field_name,
                ofield_desc : this.item.field_desc+"原值",
                nfield_desc : this.item.field_desc+"新值",
                oldval: this.item.oldval,
                newval: this.item.newval
            }
        },
        watch: {
            newval(v, o) {
                this.$emit('changeComponent', {
                    number: this.number,
                    key: this.$data.ofield,
                    newval: this.$data.newval,
                    appl_no: this.appl_no,
                    order_seq: this.order_seq
                })
            }
        }
    }
</script>
