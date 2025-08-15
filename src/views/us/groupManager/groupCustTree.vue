<template>
  <!-- <div ref="echarts" class="echart" :style="{height:chartHeight,width:chartWidth}"></div> -->
  <div ref="echarts" class="echart"></div>
</template>

<script>
import * as echarts from "echarts";
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对
  },

  data() {
    return {
      myChart: null,
      myChartDom: null,
      chartHeight:'0px',
      chartWidth:'0px',
      option: {
        series: [
          {
            roam: true,
            symbolKeepAspect: true,
            edgeShape: "polyline", //链接线是折现还是曲线
            orient: "TB",
            width: 1200,
            height: 300,
            // top: "30%",
            // left: "15%",
            symbolSize: 1,
            symbol: "rectangle",
            color: ["#E8EBED"],
            type: "tree",
            edgeForkPosition: "63%",
            initialTreeDepth: 5,
            label: {
              normal: {
                verticalAlign: "middle",
                align: "middle",
                backgroundColor: "#0084ff",
                color: "#fff",
                fontSize: 12,
                padding: [15, 40],
                borderWidth: 2,
                borderColor: "#0070d9",
                fontWeight: "bold",
                formatter: function(param) {
                  let groupTotalLimit = param.data.groupTotalLimit;
                  let groupCustName = param.data.groupCustName;
                  let reAry = [];
                  // for (let i = 0; i < groupCustName.length; i += 14) {
                  //   reAry.push(`{name|${groupCustName.slice(i, i + 14)}}\n`);
                  // }
                  reAry.push(`{name|${groupCustName}}\n`);
                  reAry.push(`{value|${groupTotalLimit}}`);
                  return reAry.join("\n");
                },
                rich: {
                  box: {
                    height: 30,
                    color: "#fff",
                    padding: [0, 5],
                    align: "center",
                    fontWeight: "bold",
                    fontSize: 16
                  },
                  name: {
                    height: 20,
                    align: "center",
                    fontWeight: "bolder",
                    fontSize: 18
                  },
                  value: {
                    height: 18,
                    align: "center",
                    fontSize: 18,
                    fontWeight: "bold",
                    borderWidth: 2,
                    fontWeight: "normal"
                  }
                }
              }
            },
            leaves: {
              label: {
                normal: {
                  position: [-90, 10],
                  verticalAlign: "middle",
                  align: "left",
                  backgroundColor: "#cae0ff",
                  padding: [15, 40],
                  fontSize: 12,
                  fontWeight: "normal",
                  width: 100,
                  borderColor: "#cae0ff",
                  borderWidth: 1,
                  formatter: function(param) {
                    let groupTotalLimit = param.data.groupTotalLimit;
                    let groupCustName = param.data.groupCustName;
                    let reAry = [];
                    for (let i = 0; i < groupCustName.length; i += 10) {
                      reAry.push(`{name|${groupCustName.slice(i, i + 10)}}\n`);
                    }
                    reAry.push(`{value|${groupTotalLimit}}`);
                    return reAry.join("\n");
                  },
                  rich: {
                    name: {
                      height: 20,
                      color: "#2d63f7",
                      align: "center",
                      fontWeight: "bolder",
                      fontSize: 18
                    },
                    value: {
                      height: 18,
                      color: "#000",
                      align: "center",
                      fontSize: 18,
                      fontWeight: "bold",
                      borderWidth: 2,
                      fontWeight: "normal"
                    }
                  }
                }
              }
            },
            lineStyle: {
              normal: {
                color: "#909090"
              }
            },
            itemStyle: {
              color: null,
              normal: {
                color: "#E8EBED",
                borderWidth: 0
              }
            },

            data: []
          }
        ]
      }
    };
  },

  watch: {
    //监听charts数据改变进行刷新
    option: {
      handler(value) {
        console.log("设置option", value);
        if (!value) return;
        this.initEcharts();
      },
      immediate: true, // 立即处理 进入页面就触发
      deep: true //对象内部属性的监听，关键。
    }
  },
  mounted() {
    console.log("布局相关json数据-----", this.cMeta);
    console.log("父页面传的参数-----", this.cParentParams);
    console.log("父页面的相关json数据-----", this.cParentMeta);
    console.log("父页面的scope数据对-----", this.cParentScope);
    this.getTreeData();
  },
  beforeDestroy() {
    if (!this.myChart) {
      return;
    }
    this.myChart.dispose();
    this.myChart = null;
  },
  methods: {
    getTreeData() {
      let that = this;
      let params = {
        servicecode: "uccp4012",
        group_cust_no: this.cParentParams.cust_no
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            console.log("uccp4012=============>", res.data);
            let resObj = res.data;
            let temp = [
              {
                groupCustName: "",
                groupTotalLimit: "",
                children: []
              }
            ];

            temp[0].groupCustName = resObj.groupList[0].group_cust_name;
            temp[0].groupTotalLimit =
              resObj.groupList[0].group_total_limit.replace(
                /(\d{1,3})(?=(\d{3})+(?:$|\.))/g,
                "$1,"
              ) + "万元";
            //规整第二层数据
            resObj.groupSubsList.forEach(item => {
              let itemTemp = {
                groupCustName: item.cust_name,
                groupTotalLimit:
                  item.group_subs_credit_limit.replace(
                    /(\d{1,3})(?=(\d{3})+(?:$|\.))/g,
                    "$1,"
                  ) + "万元",
                cust_no: item.cust_no,
                children: []
              };
              temp[0].children.push(itemTemp);
            });
            //规整第三层数据
            resObj.srcMainList.forEach(leve3 => {
              let index = temp[0].children.findIndex(
                x => x.cust_no === leve3.cust_no
              );

              if (index !== -1) {
                temp[0].children[index].children.push({
                  groupCustName: leve3.cl_prod_name,
                  groupTotalLimit:
                    leve3.source_total_credit.replace(
                      /(\d{1,3})(?=(\d{3})+(?:$|\.))/g,
                      "$1,"
                    ) + "万元",
                  cust_no: leve3.cust_no,
                  children: []
                });
              }
            });
            console.log(temp);
            this.option.series[0].data = temp;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    //初始化charts
    initEcharts() {
      this.$nextTick(() => {
        if (this.myChart) this.myChart.dispose(); // 销毁
        this.myChartDom = this.$refs.echarts;
        // 初始化统计图
        this.myChart = echarts.init(this.myChartDom);
        this.myChart.setOption(this.option);
        //  使echarts尺寸重置
        this.myChart.resize();
      });
    },
    //刷新chart
    chartResize() {
      if (this.myChart) this.myChart.resize();
    },
    resize() {
      let elesArr = Array.from(
        new Set(this.myChart._chartsViews[0]._data._graphicEls)
      );
      let dep = this.myChart._chartsViews[0]._data.tree.root.height; //获取树高
      let layer_height = 100; //层级之间的高度
      let currentHeight = layer_height * (dep + 1) || layer_height;
      let newHeight = Math.max(currentHeight, layer_height);
      this.chartHeight = newHeight + "px";
      let layer_width = 100; // 兄弟节点之间的距离
      let currentWidth = layer_width * (elesArr.length - 1) || layer_width;
      let newWidth = Math.max(currentWidth, layer_width);
      this.chartWidth = newWidth + "px";
      console.log(`chartHeight=${this.chartHeight}  chartWidth=${this.chartWidth}`)
      this.$nextTick(()=>{
        this.myChart.resize();
      })
   
    }
  }
};
</script>

<style lang="less" scoped>
.echart {
  width: 80vw;
  height: 800px;
}
</style>
