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
import echarts from "echarts";
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
          extraCssText:
            "box-shadow: 0px 1px 31px 0px rgba(55, 174, 255, 0.55) inset",
          color: "#fff",
          borderColor: "rgba(55, 174, 255, 0.73)"
        },

        grid: {
          left: "2%",
          right: "2%",
          bottom: "5%",
          top: "10%",
          width: "90%", // 宽度
          height: "75%", // 高度
          containLabel: true //包涵刻度
        },
        xAxis: {
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
        },
        yAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#fff"
            }
          },
          data: ["Brazil", "Indonesia", "USA", "India", "China", "World"],
          axisTick: false
        },
        series: [
          // {
          //   name: "Placeholder",
          //   type: "bar",
          //   stack: "Total",
          //   itemStyle: {
          //     borderColor: "transparent",
          //     color: "transparent",
          //   },
          //   emphasis: {
          //     itemStyle: {
          //       borderColor: "transparent",
          //       color: "transparent",
          //     },
          //   },
          //   data: [2600, 1400, 1100, 900, 0, 0],
          // },
          {
            name: "",
            type: "bar",
            stack: "Total",
            label: {
              show: true,
              position: "inside"
            },
            data: [300, 1200, 300, 200, 900, 2900],
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  { offset: 0, color: "#59BBFF" }, //柱图渐变色

                  { offset: 1, color: "#0060FF" } //柱图渐变色
                ])
              }
            }
          }
        ]
      }
    };
  },

  mounted() {
    // if (!this.isDraggable) this.getChartData();
    //接受index的定时器刷新bus
    this.$bus.on("refreshCardData", data => {
      data.forEach(ele => {
        if (ele.card_i_name === "card5" && (ele.card_id === this.item.card_id)) {
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
      let that = this;
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: this.servicecode,
        busi_type: this.productCode, //接口查询产品编码
        branch_id: this.areaCode //接口查询区域编码
      };
      if (this.servicecode) {
        this.$http.invokeAPI(init_url, "post", init_req).then(response => {
          if (response.code === "200") {
            let name = [];
            let value = [];
            let totle = 0;
            for (const child of response.data.list01) {
              // bankName.push(branchIdDict.find(item=>item.code===child.branch_id).name)
              value.push(child.value);
              name.push(child.name);
              // totle=totle+child.total_count
            }

            that.option.yAxis.data = name; //机构名称
            that.option.series[0].data = value; //chart数据 int数组
            that.option.series[0].name = response.data.tip_name;
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
        this.option.grid.bottom = "6%";
        this.option.grid.top = "20%";
        this.option.grid.height = "75%";
      } else {
        //图表还原
        this.option.grid.left = "2%";
        this.option.grid.right = "2%";
        this.option.grid.bottom = "5%";
        this.option.grid.top = "10%";
        this.option.grid.height = "75%";
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
