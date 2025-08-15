<template>
    <div>
        <Timeline :timelineList="timelineList" containerWidth="80%">
            <template v-slot:default="slotProps">
                <div class="card-slot">{{slotProps.item.content}}</div>
            </template>
            <template v-slot:time="slotProps">{{slotProps.item.time}}</template>
        </Timeline>
    </div>
</template>

<script>
import Timeline from "@/views/icms/certconf/Timeline";

export default {
    props: {
        cMeta: Object, // 布局相关json数据
        cParentParams: Object, // 父页面传的参数
        cParentMeta: Object, // 父页面的相关json数据
        cParentScope: Object, // 父页面的scope数据对
    },
    data() {
        return {
            timelineList: [],
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
    mounted() {
        this.$nextTick(() => {
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", {
                    "servicecode": "ar4004",
                    "appId":"icmsOnl",
                    "certconf_id":this.cParentParams.certconf_id
                })
                .then((response) => {
                    // 遍历返回数据  组装需要的数组形式
                    if (response.code === "200") {
                        this.timelineList = response.data ;
                    } else {
                        this.$message({
                            type: "error",
                            message: response.message,
                        });
                    }
                });
        });
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