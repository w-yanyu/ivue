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
            dateList: [],
            add_countList: [],
            appv_countList: [],
            rejt_countList: [],
            deal_countList: [],
            cancel_countList: [],
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", {
                    servicecode: "bpm1022",
                    busi_type: "PL",
                    date_from: "19770101",
                    appId: "plOnl",
                })
            .then((response) => {
                    // 遍历返回数据  组装需要的数组形式
                    if (response.code === "200") {
                        response.data.forEach((item) => {
                            this.dateList.push(item.system_date);
                            this.add_countList.push(item.add_count);
                            this.appv_countList.push(item.appv_count);
                            this.rejt_countList.push(item.rejt_count);
                            this.deal_countList.push(item.deal_count);
                            this.cancel_countList.push(item.cancel_count);
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
                    data: ['新增业务数量', '审批通过数量', '拒绝数据量', '审批中数据量','取消数量']
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
                        name: "新增业务数量",
                        type: "bar",
                        tooltip: {
                            valueFormatter: function (value) {
                                return value ;
                            },
                        },
                        data: this.add_countList,
                    },
                    {
                        name: "审批通过数量",
                        type: "bar",
                        tooltip: {
                            valueFormatter: function (value) {
                                return value ;
                            },
                        },
                        data: this.appv_countList,
                    },
                    {
                        name: "拒绝数据量",
                        type: "bar",
                        tooltip: {
                            valueFormatter: function (value) {
                                return value ;
                            },
                        },
                        data: this.rejt_countList,
                    },
                    {
                        name: "取消数量",
                        type: "bar",
                        tooltip: {
                            valueFormatter: function (value) {
                                return value;
                            },
                        },
                        data: this.cancel_countList,
                    },
                    {
                        name: "审批中数据量",
                        type: "bar",
                        yAxisIndex: 1,
                        tooltip: {
                            valueFormatter: function (value) {
                                return value;
                            },
                        },
                        data: this.deal_countList,
                    },
                ],
            });
        },
    },
};
</script>