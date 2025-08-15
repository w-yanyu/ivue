<template>
    <div style="overflow: hidden;">
        <el-card class="view-detail default-font-color">
            <template slot="header">
                <span>{{cParentParams.info_item_name}}</span>
            </template>
            <to-json
              :toUrl="cParentParams.info_thumbnail_item_page"
              :params="cParentParams">
            </to-json>
        </el-card>
    </div>
</template>

<script>
export default {
    props: {
        cMeta: Object, // 布局相关数据
        cParentMeta: Object, // 父页面模板json数据
        cParentScope: Object, // 父页面每块区域业务数据
        cParentParams: Object, // 父页面自定义参数与内置参数
    },
};
</script>

<style lang="less" scpoed>
.view-detail {
    width: 300px;
    height: 200px;
    margin: 20px auto 0;
    .el-card__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        i {
            margin-left: 8px;
            cursor: pointer;
        }
    }
    .el-card__body {
        height: calc(100% - 60px);
        overflow: scroll;
    }
}
</style>
