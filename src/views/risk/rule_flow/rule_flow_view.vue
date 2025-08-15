<template>
    <div class="page_content">
        <el-form ref="form" :model="form" label-width="100px">
            <el-tabs type="border-card">
                <el-tab-pane>
                    <span slot="label">
                        <i class="el-icon-date"></i> 基础信息
                    </span>
                    <to-json :toUrl="viewUrl" :params="cParentParams"></to-json>
                </el-tab-pane>
                <el-tab-pane class="test">
                    <span slot="label">
                        <i class="el-icon-date"></i> 流程信息
                    </span>
                    <flowEditor :cParentParams="cParentParams" :onlyRead="true"></flowEditor>
                </el-tab-pane>
            </el-tabs>
        </el-form>
    </div>
</template>

<script>
import flowEditor from "@/components/BpmnFlow/index";

export default {
    props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object, // 父页面的scope数据对象
    },
    components: {
        flowEditor
    },
    data() {
        return {
            viewUrl: "/views/risk/rule_flow/rule_flow_view.json",
            cParams: this.cParentParams,
        };
    },
};
</script>

<style lang="css" scoped>
.page_content {
    width: 100%;
    height: 100%;
    position: relative;
}
.el-dialog {
    height: 50vh !important;
}
.test {
    height: 50vh;
}
</style>
