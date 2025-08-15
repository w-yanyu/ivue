<template>
    <div>
        <to-json
            v-if="quota_type === '01'"
            toUrl="/views/uccp/prodManager/uccpProdGroup/uccp_prod_group_manager.json"
        ></to-json>
        <to-json
            v-if="quota_type === '02'"
            toUrl="/views/uccp/prodManager/uccpProdGroup/uccp_prod_relation_manager.json"
            :params="params"
        ></to-json>
        <to-json
            v-if="quota_type === '09'"
            toUrl="/views/uccp/quotaManager/smallAmount/amount_exceed_limit_manager.json"
        ></to-json>
    </div>
</template>

<script>

export default {
    props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object, // 父页面的scope数据对象
    },
    components: {
        
    },
    data() {
        return {
            quota_type: "0",
            params: {
                prod_group_code:"",
            },
        };
    },
    watch: {

    },
    mounted() {
        console.log("父类传入的参数cParentParams", this.cParentParams);
        this.quota_type = this.cParentParams.quota_type;
        this.params.prod_group_code = this.cParentParams.node_cd;
    },
    methods: {
    },
};
</script>

<style lang="less" scoped>

</style>