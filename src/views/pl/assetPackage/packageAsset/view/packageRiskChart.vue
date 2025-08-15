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
            el_list: [],
            pd_list: [],
            ead_list: [],
            lgd_list: [],
            height: 0,
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", {
                    "servicecode": "pl0723",
                    "package_no": this.cParentParams.package_no,
                     "page_flage":"0"
                })
                .then((response) => {
                    // 遍历返回数据  组装需要的数组形式
                    if (response.code === "200") {
                        response.data.forEach((item) => {
                            this.dateList.push(item.operation_date);
                            this.el_list.push(item.el_rate);
                            this.pd_list.push(item.pd_rate);
                            this.ead_list.push(item.ead_rate);
                            this.lgd_list.push(item.lgd_rate);
                          
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
                data: ['PD指数', 'LGD指数', 'EAD指数', 'EL指数']
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
                    name: 'PD指数',
                    type: 'line',
                    stack: 'Total',
                    data: this.pd_list
                    //data: [1,2,2,3]
                },
                {
                    name: 'LGD指数',
                    type: 'line',
                    stack: 'Total',
                    data: this.lgd_list
                    //data: [1,2,2,3]
                },
                {
                    name: 'EAD指数',
                    type: 'line',
                    stack: 'Total',
                    data: this.ead_list
                    //data: [1,2,2,3]
                },
                  {
                    name: 'EL指数',
                    type: 'line',
                    stack: 'Total',
                    data: this.el_list
                    //data: [1,2,2,3]
                }
                
            ]
            };

            option && this.chart.setOption(option);

        },
    },
};
</script>