<template>
  <div class="box" ref="box">
    <div class="box-title">
      <div class="box-title-text">
        {{ titleName }}
        <span class="box-title-unit">{{ unitName }}</span>
      </div>
      <div class="box-blow-up" v-if="!isDraggable">
        <img src="../../assets/blowUp.png" alt="" style="" @click="popover" />
      </div>
    </div>
    <comEchart
      :option="option"
      :isDraggable="isDraggable"
      :divObj="divObj"
      style="width: 100%; height: 100%"
    />
    <!-- 全屏 -->
    <PopBlowUp
      :option="option"
      v-if="isShowPop"
      :titleName="titleName"
      :unitName="unitName"
      @hiddlePop="popover"
      ref="popBlowUp"
    ></PopBlowUp>
  </div>
</template>

<script>
import PopBlowUp from "../PopBlowUp.vue";
import comEchart from "../echartBase";
import branchIdDict from "../../assets/bankNameDictionaries.js"; //机构字典
export default {
  name: "card1",
  components: { comEchart, PopBlowUp },
  props: {
    //表格标题
    titleName: {
      type: String,
      default: ""
    },
    //表格单位
    unitName: {
      type: String,
      default: ""
    },
    //是否在编辑状态
    isDraggable: {
      type: Boolean,
      default: false
    },
    item: Object
  },
  data() {
    return {
      servicecode: "", // 接口交易码
      productCode: "", //接口查询产品编码
      areaCode: "", //接口查询区域编码
      divObj: null,
      option: {
        tooltip: {
          trigger: "axis",
          backgroundColor: "#00053D",
          textStyle: {
            align: "left"
          },
          extraCssText:
            "box-shadow: 0px 1px 31px 0px rgba(55, 174, 255, 0.55) inset",
          color: "#fff",
          borderColor: "rgba(55, 174, 255, 0.73)",
          formatter: function(data) {
            const string =
              data[1].marker +
              "放款1:" +
              data[1].value +
              "<br/>" +
              data[0].marker +
              "还款2:" +
              data[0].value +
              "<br/>" +
              "--" +
              "净增:" +
              (data[0].value - data[1].value);
            return string;
          },
          axisPointer: {
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },

        legend: {
          show: true,
          data: [
            { name: "", icon: "rect" },
            { name: "", icon: "rect" }
          ],
          // top: "15.5%",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            fontSize: 12, // 调节字体大小
            color: "#fff"
          }
        },

        // grid: {
        //   left: "2%",
        //   right: "2%",
        //   bottom: "5%",
        //   top: "10%",
        //   width: "90%", // 宽度
        //   height: "75%", // 高度
        //   containLabel: true //包涵刻度
        // },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisTick: false, // 是否显示刻度
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          data: [
            "0",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12",
            "13",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "21",
            "22",
            "23"
          ]
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#fff"
              }
            },
            splitLine: {
              //网格线
              lineStyle: {
                type: "solid", //设置网格线类型 dotted：虚线   solid:实线
                width: 1,
                color: "rgba(255,255,255,0.2)"
              },
              show: true //隐藏或显示
            }
          }
        ],
        series: [
          {
            name: "",
            type: "line",
            stack: "Total",
            color: "#00E4E0",
            areaStyle: { color: "#00748E" },
            emphasis: {
              focus: "series"
            },
            symbol: "none",
            data: [
              340,
              350,
              360,
              400,
              410,
              420,
              430,
              440,
              450,
              460,
              470,
              480,
              550,
              560,
              570,
              580,
              590,
              600,
              610,
              620,
              630,
              640,
              650,
              660
            ],
            markPoint: {
              symbol: "circle",
              data: [{ type: "1", name: "高峰期" }],
              label: {
                textStyle: {
                  color: "#fff",
                  fontSize: 15
                }
              },
              itemStyle: {
                normal: {
                  color: "#00053D",
                  borderColor: "#00748E",
                  borderWidth: 3,
                  label: {
                    show: true,
                    position: "right",
                    textStyle: {
                      color: "#00748E"
                    }
                  },
                  textColor: "#00748E"
                },
                emphasis: {
                  label: {
                    show: true
                  }
                }
              },
              symbolSize: [10, 10] // 容器大
              // symbolOffset: [0, -20], //位置偏移
            }
          },
          {
            name: "",
            type: "line",
            stack: "Total",
            color: "#FFFFFF",
            areaStyle: { color: "#505379" },
            emphasis: {
              focus: "series"
            },
            symbol: "none",
            data: [
              220,
              230,
              240,
              260,
              290,
              330,
              340,
              350,
              360,
              370,
              380,
              390,
              430,
              440,
              450,
              460,
              470,
              480,
              490,
              500,
              510,
              530,
              570,
              575
            ],
            markPoint: {
              symbol: "circle",
              data: [{ type: "0" }],
              label: {
                textStyle: {
                  color: "#fff",
                  fontSize: 15
                }
              },
              itemStyle: {
                normal: {
                  color: "#00053D",
                  borderColor: "#fff",
                  borderWidth: 3,
                  label: {
                    show: true,
                    position: "right",
                    textStyle: {
                      color: "#fff"
                    }
                  }
                },
                emphasis: {
                  label: {
                    show: true
                  }
                }
              },
              symbolSize: [10, 10] // 容器大
              // symbolOffset: [0, -20], //位置偏移
            }
          }
        ]
      },
      isShowPop: false // 全屏
    };
  },

  mounted() {
    // if (!this.isDraggable) this.getChartData();
    //接受index的定时器刷新bus
    this.$bus.on("refreshCardData", data => {
      data.forEach(ele => {
        if (ele.card_i_name === "card4" && (ele.card_id === this.item.card_id)) {
          this.servicecode = ele.servicecode;
          this.productCode = ele.busi_card_type;
          this.areaCode = ele.branch_id;
          this.getChartData();
        }
      });
    });
    //接收到titleBar的bus 产品改变
    this.$bus.on("productChange", productCode => {
      this.productCode = productCode;
      this.getChartData();
    });
    //接收到titleBar的bus 机构改变
    this.$bus.on("branchChange", branchId => {
      this.areaCode = branchId;
      this.getChartData();
    });

    this.divObj = this.$refs.box;
  },
  // beforeDestroy() {// 移除事件监听器
  //   this.$bus.off("refreshCardData")
  //   this.$bus.off("productChange")
  //   this.$bus.off("branchChange")
  // },
  methods: {
    //请求额度树数据
    getChartData() {
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: this.servicecode,
        busi_type: this.productCode, //接口查询产品编码
        branch_id: this.areaCode //接口查询区域编码
      };
      if (this.servicecode) {
        this.$http.invokeAPI(init_url, "post", init_req).then(response => {
          if (response.code === "200") {
            //TODO 解析接口数据后注入到option中
            // option.xAxis.data=[]//X坐标文案 Str类型数组
            // option.series[0].name="用户量"
            // option.series[0].data=[]//chart数据 int数组
            this.option.xAxis.data = [];
            this.option.series[0].data = []; //放款
            this.option.series[1].data = []; //还款
            let xAxis = [];
            let sub_value = []; //放款
            let min_value = []; //还款
            for (const child of response.data.list01) {
              xAxis.push(child.name);
              sub_value.push(child.sub_value);
              min_value.push(child.min_value);
            }
            this.option.xAxis.data = xAxis;
            this.option.series[0].data = sub_value;
            this.option.series[0].name = response.data.sub_name;
            this.option.legend.data[0].name = response.data.sub_name;
            this.option.series[1].data = min_value;
            this.option.series[1].name = response.data.min_name;
            this.option.legend.data[1].name = response.data.min_name;
          } else {
            MyMessage({ message: response.message, type: "error" });
          }
        });
      }
    },
    //扩大显示当前图表
    popover() {
      this.isShowPop = !this.isShowPop;
      if (this.isShowPop) {
        //图表放大时，位置调整
        this.option.grid.left = "5%";
        this.option.grid.right = "5%";
        this.option.grid.bottom = "8%";
        this.option.grid.top = "20%";
        this.option.legend.top = "15.5%";
      } else {
        //还原图表
        this.option.grid.left = "2%";
        this.option.grid.right = "2%";
        this.option.grid.bottom = "5%";
        this.option.grid.top = "10%";
        this.option.legend.top = "0%";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.box-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
  font-size: 18px;
  width: 97%;
  margin-top: 1vh;
}

.box-title-text {
  padding-left: 1vw;
}
.box-title-unit {
  font-size: 12px;
  color: #37aeff;
  margin-left: 14px;
}

.box-blow-up {
  cursor: pointer;
}
</style>
