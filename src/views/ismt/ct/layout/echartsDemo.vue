<template>
    <div ref="child" :style="`width: 100%; height: ${height}px`"></div>
</template>

<script>
import echarts from "echarts";

export default {
    data() {
        return {
            height: 0,
            chart: null,
            chartData: {},
        };
    },
    created() {
        // 在这里发请求，把响应数据赋值给chartData
        // this.$http
        //     .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", {
        //         servicecode: "ct3006",
        //     })
        //     .then((response) => {
        //         this.chartData = response.data;
        //     });
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart();
            const resizeOb = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    this.height = this.$parent.$el.offsetHeight;
                    if(echarts.getInstanceByDom(entry.target))
                    echarts.getInstanceByDom(entry.target).resize();
                }
            });
            resizeOb.observe(this.$refs.child);
        });
    },
    methods: {
        initChart() {
            this.chart = echarts.init(this.$refs.child);
            this.chart.setOption({
                tooltip: {
                    trigger: "axis",
                },
                legend: {
                    data: ["邮件通知", "短信通知", "公告通知"],
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                    },
                },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: [
                        "周一",
                        "周二",
                        "周三",
                        "周四",
                        "周五",
                        "周六",
                        "周日",
                    ],
                    // 取this.chartData里的值
                    // data: this.chartData.date
                },
                yAxis: {
                    type: "value",
                },
                series: [
                    {
                        name: "邮件通知",
                        type: "line",
                        stack: "Total",
                        data: [120, 132, 101, 134, 90, 230, 210],
                        // data: this.chartData.aaa,
                    },
                    {
                        name: "短信通知",
                        type: "line",
                        stack: "Total",
                        data: [220, 182, 191, 234, 290, 330, 310],
                        // data: this.chartData.bbb,
                    },
                    {
                        name: "公告通知",
                        type: "line",
                        stack: "Total",
                        data: [150, 232, 201, 154, 190, 330, 410],
                        // data: this.chartData.ccc,
                    },
                ],
            });
        },
    },
};
</script>