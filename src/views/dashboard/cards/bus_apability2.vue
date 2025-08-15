<template>
    <div ref="chart" :style="`width: 100%; height: ${height}px`"></div>
</template>

<script>
import echarts from "echarts";
import "./walden.js";

export default {
    data() {
        return {
            height: 0,
            chart: null,
            chartData: {},
        };
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
            resizeOb.observe(this.$refs.chart);
        });
    },
    methods: {
        initChart() {
            this.chart = echarts.init(this.$refs.chart, "walden");
            this.chart.setOption({
                tooltip: {
                    trigger: "axis",
                },
                legend: {
                    data: ["当月能力水平", "上年度平均水平"],
                },
                radar: {
                    indicator: [
                        {
                            name: "授信业务推广能力",
                            desc: "【新增授信额-万元】",
                            max: 5000,
                        },
                        {
                            name: "客户拓新能力",
                            desc: "【新开户人数-人】",
                            max: 500,
                        },
                        {
                            name: "还贷资金收回能力",
                            desc: "【实际收回占比-%】",
                            max: 100,
                        },
                        {
                            name: "融资业务推广能力",
                            desc: "【新增贷款额-万元】",
                            max: 1000,
                        },
                        {
                            name: "风险管控能力",
                            desc: "【不良率-%】",
                            max: 5,
                        },
                    ],
                    radius: "66%",
                    center: ["50%", "54%"],
                    nameGap: 4,
                    name: {
                        formatter: (params, ticket) => {
                            return `{a|${params}}\n{b|${ticket.desc}}`;
                        },
                        rich: {
                            a: {
                                color: "#333",
                                align: "center",
                                lineHeight: 20,
                            },
                            b: {
                                fontSize: 10,
                                align: "center",
                            },
                        },
                    },
                },
                series: [
                    {
                        name: "Budget vs spending",
                        type: "radar",
                        data: [
                            {
                                value: [3800, 280, 90, 500, 1.6],
                                name: "当月能力水平",
                            },
                            {
                                value: [3500, 300, 95, 600, 1.8],
                                name: "上年度平均水平",
                            },
                        ],
                    },
                ],
            });
        },
    },
};
</script>
