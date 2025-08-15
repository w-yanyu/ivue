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
            slbl_prod_nmList: [],
            dis_loan_countList: [],
            dis_loan_totalList: [],
            dis_per_houseList: [],
        };
    },
    mounted() {
        this.$nextTick(async () => {
            await this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", {
                    servicecode: "syln0006",
                })
                .then((response) => {
                    response.data.list01.forEach((item) => {
                        this.slbl_prod_nmList.push(item.slbl_prod_nm);
                        this.dis_loan_countList.push(item.dis_loan_count);
                        this.dis_loan_totalList.push(item.dis_loan_total);
                        this.dis_per_houseList.push(item.dis_per_house);
                    });
                });
            this.initChart();
            const resizeOb = new ResizeObserver((entries) => {
                window.requestAnimationFrame(() => {
                    if (!Array.isArray(entries) || !entries.length) {
                        return;
                    }
                    for (const entry of entries) {
                        this.height = this.$parent.$el.offsetHeight;
                        if(echarts.getInstanceByDom(entry.target))
                        echarts.getInstanceByDom(entry.target).resize();
                    }
                });
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
                    axisPointer: {
                        type: "cross",
                        crossStyle: {
                            color: "#999",
                        },
                    },
                },
                toolbox: {
                    feature: {
                        magicType: { show: true, type: ["line", "bar"] },
                        restore: { show: true },
                    },
                },
                legend: {
                    data: [
                        "贴息贷款笔数",
                        "贴息总金额(万元)",
                        "户均贴息额(元)",
                    ],
                },
                xAxis: [
                    {
                        type: "category",
                        data: this.slbl_prod_nmList,
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        name: "金额",
                        axisLabel: {
                            formatter: "{value} ",
                        },
                    },
                    {
                        type: "value",
                        name: "笔数",
                        axisLabel: {
                            formatter: "{value} 笔",
                        },
                    },
                ],
                series: [
                    {
                        name: "贴息总金额(万元)",
                        type: "bar",
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + " 万元";
                            },
                        },
                        data: this.dis_loan_totalList,
                    },
                    {
                        name: "户均贴息额(元)",
                        type: "bar",
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + " 元";
                            },
                        },
                        data: this.dis_per_houseList,
                    },
                    {
                        name: "贴息贷款笔数",
                        type: "line",
                        yAxisIndex: 1,
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + " 笔";
                            },
                        },
                        data: this.dis_loan_countList,
                    },
                ],
            });
        },
    },
};
</script>