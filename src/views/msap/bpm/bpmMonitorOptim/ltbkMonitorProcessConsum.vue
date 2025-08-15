<template>
    <div ref="chart" :style="`width: 100%; height: ${height}px`"></div>
</template>

<script>
import echarts from "echarts";
import "./walden.js";

export default {
    data() {
        return {
           chart: null,
            dateList: [],
            to_do_countList: [],
            done_countList: [],
            height: 0,
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", {
                    "servicecode": "bpm1023",
                    "busi_type": "LTBK",
                    "date_from": "19770101",
                    "appId":"icmsOnl"
                })
            .then((response) => {
                    // 遍历返回数据  组装需要的数组形式
                    if (response.code === "200") {
                        response.data.forEach((item) => {
                            this.dateList.push(item.system_date);
                            this.to_do_countList.push(item.to_do_count);
                            this.done_countList.push(item.done_count);
                        });
                        this.initChart();
                    } else {
                        this.$message({
                            type: "error",
                            message: response.message,
                        });
                    }
                });
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
                    axisPointer: {
                        type: "cross",
                        crossStyle: {
                            color: "#999",
                        },
                    },
                },
                toolbox: {
                    feature: {
                        magicType: { show: false, type: ["line", "bar"] },
                        restore: { show: false },
                    },
                },
                legend: {
                    data: ['待处理数量', '已处理数量']
                },
                xAxis: [
                    {
                        type: "category",
                        data: this.dateList,
                        axisPointer: {
                            type: "shadow",
                        },
                    },
                ],
                yAxis: [
                    {
                        type: "value",
                        name: "笔数",
                        axisLabel: {
                            formatter: "{value} ",
                        },
                    },
                    {
                        type: "value",
                        name: "",
                        axisLabel: {
                            formatter: "",
                        },
                    },
                ],
                series: [
                    {
                        name: "待处理数量",
                        type: "bar",
                        tooltip: {
                            valueFormatter: function (value) {
                                return value;
                            },
                        },
                        data: this.to_do_countList,
                    },
                    {
                        name: "已处理数量",
                        type: "bar",
                        tooltip: {
                            valueFormatter: function (value) {
                                return value;
                            },
                        },
                        data: this.done_countList,
                    },
                ],
            });
        },
    },
};
</script>