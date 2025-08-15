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
            mCreditAmount: 1,
            mCreditAmount1: 1,
            mAccountCount: 2,
            mAccountCount1: 2,
            mPbackRate: 3,
            mPbackRate1: 3,
            mLoanAmount: 4,
            mLoanAmount1: 4,
            mDefecRate: 5,
            mDefecRate1: 5,
        };
    },
    mounted() {
        this.$nextTick(async () => {
            await this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", {
                    servicecode: "cl0040",
                })
                .then((response) => {
                    this.mCreditAmount = response.data.count;
                });
            await this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", {
                    servicecode: "cl0040",
                    is_last: "1",
                })
                .then((response) => {
                    this.mCreditAmount1 = response.data.count;
                });
            await this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", {
                    servicecode: "us0514",
                })
                .then((response) => {
                    this.mAccountCount = response.data.count;
                });
            await this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", {
                    servicecode: "us0514",
                    is_last: "1",
                })
                .then((response) => {
                    this.mAccountCount1 = response.data.count;
                });
            await this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", {
                    servicecode: "syln0007",
                })
                .then((response) => {
                    this.mPbackRate = response.data.retEntity.repy_rate;
                    this.mLoanAmount = response.data.retEntity.loan_amt;
                    this.mDefecRate = response.data.retEntity.defec_rate;
                });
            await this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", {
                    servicecode: "syln0007",
                    is_last: "1",
                })
                .then((response) => {
                    this.mPbackRate1 = response.data.retEntity.repy_rate;
                    this.mLoanAmount1 = response.data.retEntity.loan_amt;
                    this.mDefecRate1 = response.data.retEntity.defec_rate;
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
            const indicator = [
                {
                    name: "授信业务推广能力",
                    desc: "【新增授信额-万元】",
                    unit: "万元",
                    max: 5000,
                },
                {
                    name: "客户拓新能力",
                    desc: "【新开户人数-人】",
                    unit: "人",
                    max: 500,
                },
                {
                    name: "还贷资金收回能力",
                    desc: "【实际收回占比-%】",
                    unit: "%",
                    max: 100,
                },
                {
                    name: "融资业务推广能力",
                    desc: "【新增贷款额-万元】",
                    unit: "万元",
                    max: 3000,
                },
                {
                    name: "风险管控能力",
                    desc: "【不良率-%】",
                    unit: "%",
                    max: 5,
                },
            ];
            this.chart.setOption({
                tooltip: {
                    trigger: "item",
                    confine: true,
                    formatter: (params) => {
                        let relVal = params.name;
                        for (let i = 0; i < params.data.value.length; i++) {
                            relVal += `<br/>${indicator[i].name} : ${params.data.value[i]} ${indicator[i].unit}`;
                        }
                        return relVal;
                    },
                },
                legend: {
                    data: ["当月能力水平", "上月平均水平"],
                },
                radar: {
                    indicator: indicator,
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
                        type: "radar",
                        data: [
                            {
                                value: [
                                    this.mCreditAmount,
                                    this.mAccountCount,
                                    this.mPbackRate,
                                    this.mLoanAmount,
                                    this.mDefecRate,
                                ],
                                name: "当月能力水平",
                            },
                            {
                                value: [this.mCreditAmount1, this.mAccountCount1, this.mPbackRate1, this.mLoanAmount1, this.mDefecRate1],
                                name: "上月平均水平",
                            },
                        ],
                    },
                ],
            });
        },
    },
};
</script>