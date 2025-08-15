<template>
    <div ref="chart" :style="`width: 100%; height: 500px`"></div>
</template>

<script>
import echarts from "echarts";

export default {
     props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
     },
    data() {
        return {
            chart: null,
            dateList: [],
            income_list: [],
            out_list: [],
            gap_list: [],           
            height: 0,
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", {
                    "servicecode": "pl0732",
                    "operation_date": this.cParentParams.operation_date
                })
                .then((response) => {
                    // 遍历返回数据  组装需要的数组形式
                    if (response.code === "200") {
                        response.data.forEach((item) => {
                            this.dateList.push(item.operation_date);
                            this.income_list.push(item.plan_income);
                            this.out_list.push(item.plan_out);
                            this.gap_list.push(item.gap_amt);                                                    
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
            this.chart = echarts.init(this.$refs.chart);
		    var option;

            option = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['计划入金', '计划出金', '缺口金额']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.dateList
                //data: [20220101,20220102,20220103,20220104]
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '计划入金',
                    type: 'line',
                    stack: 'Total',
                    data: this.income_list
                    //data: [1,2,2,3]
                },
                {
                    name: '计划出金',
                    type: 'line',
                    stack: 'Total',
                    data: this.out_list
                    //data: [1,2,2,3]
                },
                {
                    name: '缺口金额',
                    type: 'line',
                    stack: 'Total',
                    data: this.gap_list
                    //data: [1,2,2,3]
                }
                
            ]
            };

            option && this.chart.setOption(option);

        },
    },
};
</script>