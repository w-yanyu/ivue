<template>
    <div ref="chart" :style="`width: 100%; height: ${height}px`"></div>
</template>

<script>
import echarts from "echarts";

export default {
    data() {
        return {
            chart: null,
            dateList: [],
            min_costList: [],
            max_costList: [],
            average_costList: [],
            total_costList: [],
            height: 0,
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", {
                    "servicecode": "bpm1023",
                    "busi_type": "LTTE",
                    "date_from":"19770101",
                    "date_end":"",
                    "appId":"icmsOnl"
                })
                .then((response) => {
                    // 遍历返回数据  组装需要的数组形式
                    if (response.code === "200") {
                        response.data.forEach((item) => {
                            this.dateList.push(item.system_date);
                            this.min_costList.push(item.min_cost);
                            this.max_costList.push(item.max_cost);
                            this.average_costList.push(item.average_cost);
                            this.total_costList.push(item.total_cost);
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
                data: ['最小处理时长', '最大处理时长', '平均处理时长', '耗时']
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
                    name: '最小处理时长',
                    type: 'line',
                    stack: 'Total',
                    data: this.min_costList
                    //data: [1,2,2,3]
                },
                {
                    name: '最大处理时长',
                    type: 'line',
                    stack: 'Total',
                    data: this.max_costList
                    //data: [1,2,2,3]
                },
                {
                    name: '平均处理时长',
                    type: 'line',
                    stack: 'Total',
                    data: this.average_costList
                    //data: [1,2,2,3]
                },
                {
                    name: '耗时',
                    type: 'line',
                    stack: 'Total',
                    data: this.total_costList
                    //data: [1,2,2,3]
                }
            ]
            };

            option && this.chart.setOption(option);

        },
    },
};
</script>