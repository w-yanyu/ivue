<template>
    <section class="chart-container">
        <el-row>                     
            <el-col :span="12">
                <div id="chartPie" style="width:800px; height:400px;"></div>
            </el-col>          
        </el-row>
    </section>
</template>
<script>
    import echarts from 'echarts'
    import MyMessage from 'pte-ui/utils/MyMessage'
    export default {
        props: {
            cMeta: Object, // 布局相关json数据
            cParentParams: Object, // 父页面传的参数
            cParentMeta: Object, // 父页面的相关json数据
            cParentScope: Object, // 父页面的scope数据对
         }, 
        data() {
            return {
                list99: [],
                dateList: [],
                paramsList: []
            }
        },
        methods: {              
            drawPieChart(dateList, paramsList) {
                let init_url = "/SUMP/call/RPCCall";
                let init_req = {
                    servicecode: "542030",
                    user_no: this.cParentParams.user_no,
                    operater_ind: "M",
                    query_view_status: "Y",
                    challenge_err_ind: "Y"

                };

                this.$http.invokeAPI(init_url, "post", init_req).then(response => {
                    if (response.code === "200") {
                        console.log(response.data);
                        this.list100 = response.data.list100;

                        this.list100.forEach(item => {
                            //遍历赋值
                            this.dateList.push(item.stat_item_name);

                            let tmp  = {}
                            tmp["name"] = item.stat_item_name;
                            tmp["value"] = item.sum_acct_bal;
                            this.paramsList.push(tmp);
                    });
                    } else {
                        MyMessage({ message: response.message, type: 'error' });
                    }

                if (this.dateList.length <= 0){
                    this.chartPie = echarts.init(document.getElementById('chartPie'));
                    this.chartPie.setOption({
                        title: {
                            text: this.$i18ns('charts.chart_ind'),
                            subtext: this.$i18ns('charts.chart_info'),
                            x: 'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        color: ['#9BA5AD'],
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: ['Sinarmas Money']
                        },
                        series: [
                            {
                                name: this.$i18ns('charts.fund_name'),
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: [
                                    { name: 'Sinarmas Money', value: 0 } 
                                ],
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    });
                    } else {
                        this.chartPie = echarts.init(document.getElementById('chartPie'));
                    this.chartPie.setOption({
                        title: {
                            text: this.$i18ns('charts.chart_ind'),
                            subtext: this.$i18ns('charts.chart_info'),
                            x: 'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: this.dateList
                        },
                        series: [
                            {
                                name: this.$i18ns('charts.fund_name'),
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: this.paramsList,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ],
                        color: ['rgb(150,214,214)', 'rgb(136,170,208)', 'rgb(211,82,112)', 'rgb(246,166,107)', 'rgb(241,122,186)']
                    });
                    }
                });
            },
            drawCharts() {
                this.drawPieChart()
            },
        },
 
        mounted: function () {
            this.drawCharts()
        },
        // updated: function () {
        //     this.drawCharts()
        // }
    }
</script>
 
<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }
    .el-col {
        padding: 30px 20px;
    }
</style>