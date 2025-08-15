<template>
    <div ref="chart" :style="`width: 100%; height: ${height}px`"></div>
</template>

<script>
import echarts from "echarts";
import "./walden.js";

export default {
    data() {
        return {
            lang : this.$store.state.pte_app.language,
            yname: this.$i18ns("T302.Yname"),
            addbusi: this.$i18ns("T302.Add_busi"),
            passbusi: this.$i18ns("T302.Pass_busi"),
            rejtbusi: this.$i18ns("T302.Rejt_busi"),
            appvbusi: this.$i18ns("T302.Appv_busi"),
            cancelbusi: this.$i18ns("T302.Cancel_busi"),

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
                    busi_type: "LOAN",
                    date_from: "19770101",
                    appId: "icmsOnl",
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
                    data: [this.addbusi, this.passbusi, this.rejtbusi, this.appvbusi, this.cancelbusi],
                    textStyle: {
                            //图例字体大小
                            fontSize:this.lang==="en"?8:10
                            },
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
                        name: this.yname,
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
                        name: this.addbusi,
                        type: "bar",
                        tooltip: {
                            valueFormatter: function (value) {
                                return value ;
                            },
                        },
                        data: this.add_countList,
                    },
                    {
                        name: this.appvbusi,
                        type: "bar",
                        tooltip: {
                            valueFormatter: function (value) {
                                return value ;
                            },
                        },
                        data: this.appv_countList,
                    },
                    {
                        name: this.rejtbusi,
                        type: "bar",
                        tooltip: {
                            valueFormatter: function (value) {
                                return value ;
                            },
                        },
                        data: this.rejt_countList,
                    },
                    {
                        name: this.cancelbusi,
                        type: "bar",
                        tooltip: {
                            valueFormatter: function (value) {
                                return value;
                            },
                        },
                        data: this.cancel_countList,
                    },
                    {
                        name: this.appvbusi,
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