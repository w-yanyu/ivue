<template>
  <div class="chart-customer-group" id="chart-customer-group"></div>
</template>
<script>
import echarts from "echarts";
import MyAxios from "pte-ui/utils/MyAxios";
export default {
  name: "CustomerGroup",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对
  },
  components: {},
  data() {
    return {
      graphData: [
        {
          name: "0",
          draggable: true
        },
        {
          name: "1",
          category: 1,
          draggable: true
        },
        {
          name: "2",
          category: 1,
          draggable: true
        },
        {
          name: "3",
          category: 1,
          draggable: true
        },
        {
          name: "4",
          category: 1,
          draggable: true
        },
        {
          name: "5",
          category: 1,
          draggable: true
        },
        {
          name: "6",
          category: 1,
          draggable: true
        },
        {
          name: "7",
          category: 1,
          draggable: true
        },
        {
          name: "8",
          category: 1,
          draggable: true
        },
        {
          name: "9",
          category: 1,
          draggable: true
        },
        {
          name: "10",
          category: 1,
          draggable: true
        },
        {
          name: "11",
          category: 1,
          draggable: true
        },
        {
          name: "12",
          category: 1,
          draggable: true
        }
      ],
      linksData: [
        {
          source: 0,
          target: 1,
          category: 0,
          value: "夫妻1"
        },
        {
          source: 0,
          target: 2,
          value: "子女2"
        },
        {
          source: 0,
          target: 3,
          value: "夫妻3"
        },
        {
          source: 0,
          target: 4,
          value: "父母4"
        },
        {
          source: 0,
          target: 5,
          value: "表亲5"
        },
        {
          source: 0,
          target: 6,
          value: "朋友6"
        },
        {
          source: 0,
          target: 7,
          value: "朋友7"
        },
        {
          source: 0,
          target: 8,
          value: "叔叔8"
        },
        {
          source: 0,
          target: 9,
          value: "朋友9"
        },
        {
          source: 0,
          target: 10,
          value: "爱人10"
        },
        {
          source: 0,
          target: 11,
          value: "朋友11"
        },
        {
          source: 0,
          target: 12,
          value: "朋友12"
        },
        {
          source: 0,
          target: 13,
          value: "朋友13"
        },
        {
          source: 0,
          target: 14,
          value: "朋友14"
        },
        {
          source: 0,
          target: 15,
          value: "同学15"
        }
      ],
      groupTypeList: [], //客户关系枚举
      tempData: {} //临时数据
    };
  },
  created() {},
  mounted() {
    console.log("布局相关json数据-----", this.cMeta);
    console.log("父页面传的参数-----", this.cParentParams);
    console.log("父页面的相关json数据-----", this.cParentMeta);
    console.log("父页面的scope数据对-----", this.cParentScope);

    this.getCustGroup();
  },
  methods: {
    //请求客户组信息
    getCustGroup() {
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: "uccp1011",
        cust_group_seq: this.cParentParams.cust_group_seq
      };

      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
        if (response.code === "200") {
          console.log("getCustGroup", response.data);
          this.tempData = response.data;
          //获取数据字典
          this.getDictList("UCCP_E_CUST_GROUP_TYPE", "groupTypeList");
        } else {
          MyMessage({ message: response.message, type: "error" });
        }
      });
    },

    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictType
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
            console.log("字典回调", this.groupTypeList);
            //规整数据
            this.formatterGraphData();
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    //数据规整
    formatterGraphData() {
      this.graphData = [];
      this.linksData = [];
      //根节点为圆心主关系节点 父类带过来
      this.graphData.push({
        name: this.cParentParams.cust_group_name,
        draggable: true,
        ...this.cParentParams
      });
      this.linksData.push();
      //遍历接口数据规整
      for (let key in this.tempData) {
        //根据字典判断节点类型
        let categoryIndex;
        if (this.tempData[key].cust_group_type) {
          categoryIndex = this.groupTypeList.findIndex(
            x => x.dictId === item.cust_group_type
          );
        } else {
          categoryIndex = this.groupTypeList.findIndex(
            x => x.dictId === this.cParentParams.cust_group_type
          );
        }
        //遍历节点数据
        this.graphData.push({
          name: this.tempData[key].cust_name,
          category: categoryIndex,
          draggable: true,
          ...this.tempData[key]
        });
        //遍历连线数据
        this.linksData.push({
          source: 0,
          target: this.graphData.length - 1,
          value: this.groupTypeList[categoryIndex].dictName
        });
      }
      this.drawLimitTree();
    },
    //绘制关系拓扑图
    drawLimitTree() {
      let that=this
      let treeLimitDom = document.getElementById("chart-customer-group");
      let treeLimitChart = echarts.init(treeLimitDom);
      treeLimitChart.on("click", function(param) {
        if (param.dataType === "node" && param.data.cust_no) {
          console.log('点击了关系节点',param,param.cust_name)
          that.$publicFn.openNavTab("@quotaVeiw", '额度视图查看',param.data,that);
        } else {
          // 点击边
          console.log("点击了边或者根节点", param);
        }
      });

      let option = {
        title: {
          text: ""
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        label: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 12
            }
          }
        },
        legend: {
          x: "center",
          show: false,
          data: ["家庭客户", "集团客户", "其他虚拟关系"]
        },
        series: [
          {
            type: "graph",
            // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            roam: false,
            // 图的布局。[ default: 'none' ]
            // 'none' 不采用任何布局，使用节点中提供的 x， y 作为节点的位置。
            // 'circular' 采用环形布局;'force' 采用力引导布局.
            layout: "force",
            symbolSize: 45,
            // 是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点。[ default: false ]
            focusNodeAdjacency: false,
            // 标记的图形
            symbol: "circle",
            categories: [
              {
                name: "家庭客户",
                itemStyle: {
                  normal: {
                    color: "#009800"
                  }
                }
              },
              {
                name: "集团客户",
                itemStyle: {
                  normal: {
                    color: "#4592FF"
                  }
                }
              },
              {
                name: "其他虚拟关系",
                itemStyle: {
                  normal: {
                    color: "#3592F"
                  }
                }
              }
            ],
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 12
                }
              }
            },

            // 力引导布局相关的配置项，力引导布局是模拟弹簧电荷模型在每两个节点之间添加一个斥力，每条边的两个节点之间添加一个引力，每次迭代节点会在各个斥力和引力的作用下移动位置，多次迭代后节点会静止在一个受力平衡的位置，达到整个模型的能量最小化。
            force: {
              // 力引导布局的结果有良好的对称性和局部聚合性，也比较美观。
              // [ default: 50 ]节点之间的斥力因子(关系对象之间的距离)。支持设置成数组表达斥力的范围，此时不同大小的值会线性映射到不同的斥力。值越大则斥力越大
              repulsion: 200,
              // [ default: 30 ]边的两个节点之间的距离(关系对象连接线两端对象的距离,会根据关系对象值得大小来判断距离的大小)，
              edgeLength: [120, 100]
              // 这个距离也会受 repulsion。支持设置成数组表达边长的范围，此时不同大小的值会线性映射到不同的长度。值越小则长度越长。如下示例:
              // 值最大的边长度会趋向于 10，值最小的边长度会趋向于 50      edgeLength: [10, 50]
            },

            edgeSymbolSize: [4, 50],
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 10
                },
                formatter: "{c}"
              }
            },
            data: this.graphData,
            links: this.linksData,
            lineStyle: {
              normal: {
                opacity: 0.9,
                width: 1,
                curveness: 0
              }
            }
          }
        ]
      };
      option && treeLimitChart.setOption(option);
    }
  }
};
</script>
<style lang="less" scoped>
#chart-customer-group {
  width: 75vw;
  height: 100vh;
}
</style>
