<template>
    <div>
        <el-divider>横向居中时间轴，卡片内容样式支持使用card-slot自定义</el-divider>
        <Timeline :timelineList="timelineList" containerWidth="60%">
            <template v-slot:default="slotProps">
                <div class="card-slot">{{slotProps.item.content}}</div>
            </template>
            <template v-slot:time="slotProps">{{slotProps.item.time}}</template>
        </Timeline>
        <el-divider>横向滚动时间轴，卡片内容样式支持使用card-slot自定义</el-divider>
        <Timeline :timelineList="timelineList2">
            <template v-slot:default="slotProps">
                <div class="card-slot">{{slotProps.item.content}}</div>
            </template>
            <template v-slot:time="slotProps">{{slotProps.item.time}}</template>
        </Timeline>
    </div>
</template>

<script>
import Timeline from "@/views/components/Timeline";

export default {
    data() {
        return {
            timelineList: [
                {
                    id: 1,
                    content: "前期规划",
                    time: "2022年01月",
                },
                {
                    id: 2,
                    content: "市场调研",
                    time: "2022年02月",
                },
                {
                    id: 3,
                    content: "人员安排",
                    time: "2022年03月",
                },
                {
                    id: 4,
                    content: "需求识别",
                    time: "2022年04月",
                },
                {
                    id: 5,
                    content: "任务拆分",
                    time: "2022年05月",
                },
                {
                    id: 6,
                    content: "界面设计",
                    time: "2022年06月",
                },
                {
                    id: 7,
                    content: "代码开发",
                    time: "2022年07月",
                },
            ],
            timelineList2: [
                {
                    id: 1,
                    content: "前期规划",
                    time: "2022年01月",
                },
                {
                    id: 2,
                    content: "市场调研",
                    time: "2022年02月",
                },
                {
                    id: 3,
                    content: "人员安排",
                    time: "2022年03月",
                },
                {
                    id: 4,
                    content: "需求识别",
                    time: "2022年04月",
                },
                {
                    id: 5,
                    content: "任务拆分",
                    time: "2022年05月",
                },
                {
                    id: 6,
                    content: "界面设计",
                    time: "2022年06月",
                },
                {
                    id: 7,
                    content: "代码开发",
                    time: "2022年07月",
                },
                {
                    id: 8,
                    content: "前期规划",
                    time: "2022年01月",
                },
                {
                    id: 9,
                    content: "市场调研",
                    time: "2022年02月",
                },
                {
                    id: 10,
                    content: "人员安排",
                    time: "2022年03月",
                },
                {
                    id: 11,
                    content: "需求识别",
                    time: "2022年04月",
                },
                {
                    id: 12,
                    content: "任务拆分",
                    time: "2022年05月",
                },
                {
                    id: 13,
                    content: "界面设计",
                    time: "2022年06月",
                },
                {
                    id: 14,
                    content: "代码开发",
                    time: "2022年07月",
                },
            ],
        };
    },
    components: {
        Timeline,
    },
};
</script>

<style lang="less" scoped>
.card-slot {
    min-width: 80px;
    text-align: center;
    padding: 16px 22px;
    word-wrap: break-word;
    border-radius: 8px;
}
</style>