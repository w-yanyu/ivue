<template>
    <div class="page_content">
        <json-viewer :value="flowResultInfo" :expand-depth="9" copyable>
            <template v-slot:copy="{copied}">
                <span v-if="copied">已复制</span>
                <span v-else>复制</span>
            </template>
        </json-viewer>
    </div>
</template>

<script>
import JsonViewer from "vue-json-viewer";

export default {
    props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object, // 父页面的scope数据对象
        itemParams: Object,
    },
    components: {
        JsonViewer,
    },
    data() {
        return {
            flowResultInfo: null,
        };
    },
    created() {
        if (this.cParentParams.flow_result_info) {
            this.flowResultInfo = JSON.parse(this.cParentParams.flow_result_info);
        }
    },
};
</script>
