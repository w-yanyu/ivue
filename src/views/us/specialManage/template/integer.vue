<template>
    <div v-if="item"  class="default integer">
        <template>
            <input
                :placeholder="item.field_msg" 
                v-model="value"
                @change_tag="value"/>
        </template>
    </div>
</template>

<script>
    export default {
        props: ['item'],
        data() {
            return {
                value: this.item.val
            }
        },
        watch: {
            value(v, o) {
                console.log("============="+v);
                console.log("-----------------"+v);
                this.$emit('changeComponent', {
                    number: this.number,
                    value: this.$data.value
                })
            }
        }
    }
</script>
