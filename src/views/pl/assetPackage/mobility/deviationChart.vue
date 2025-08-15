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
            income_repay_list: [],
            income_loan_list: [],
            out_repay_list: [],
            out_loan_list: [],
            gap_list: [],   
            deviation_list: [],                  
            height: 0,
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", {
                    "servicecode": "pl0727",
                    "start_date": this.cParentParams.start_date,
                    "end_date":this.cParentParams.end_date,
                     "page_flage":"0"
                })
                .then((response) => {
                    // 遍历返回数据  组装需要的数组形式
                    if (response.code === "200") {
                        response.data.forEach((item) => {          
                            this.dateList.push(item.operation_date);
                            this.income_repay_list.push(item.income_repay);
                            this.income_loan_list.push(item.income_loan);
                            this.out_repay_list.push(item.out_repay);   
                             this.out_loan_list.push(item.out_loan);
                            this.gap_list.push(item.forecast_gap);
                            this.deviation_list.push(item.deviation_analysis);                                                   
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
                data: ['入金-还款', '入金-借入', '出金-放款','出金-返还', '预测缺口', '偏差分析']
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
                    name: '入金-还款',
                    type: 'line',
                    stack: 'Total',
                    data: this.income_repay_list
                    //data: [1,2,2,3]
                },
                {
                    name: '入金-借入',
                    type: 'line',
                    stack: 'Total',
                    data: this.income_loan_list
                    //data: [1,2,2,3]
                },
                {
                    name: '出金-放款',
                    type: 'line',
                    stack: 'Total',
                    data: this.out_loan_list
                    //data: [1,2,2,3]
                },                                    
                 {
                    name: '出金-返还',
                    type: 'line',
                    stack: 'Total',
                    data: this.out_repay_list
                    //data: [1,2,2,3]
                },
                {
                    name: '预测缺口',
                    type: 'line',
                    stack: 'Total',
                    data: this.gap_list
                    //data: [1,2,2,3]
                },
                {
                    name: '偏差分析',
                    type: 'line',
                    stack: 'Total',
                    data: this.deviation_list
                    //data: [1,2,2,3]
                }
            ]
            };

            option && this.chart.setOption(option);

        },
    },
};
</script>