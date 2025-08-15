<template>
  <div class="box" ref="box">
    <div class="box-title">
      <div class="box-title-text">
        {{ titleName }}
        <span class="box-title-unit">{{ unitName }}</span>
      </div>
      <div class="box-blow-up" v-if="!isDraggable">
        <img src="../../assets/blowUp.png" alt="" @click="popover" />
      </div>
    </div>
    <comEchart
      :option="option"
      :isDraggable="isDraggable"
      :divObj="divObj"
      style="width: 100%; height: 100%"
    />
  </div>
</template>

<script>
import comEchart from "../echartBase";
import branchIdDict from "../../assets/bankNameDictionaries.js"; //机构字典
export default {
  name: "card1",
  components: { comEchart },
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
    //接口服务码
    servicecode: {
      type: String,
      default: ""
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
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: ["20%", "60%"],
            center: ["50%", "50%"],
            roseType: "area",
            label: {
              color: "rgba(255,255,255,0.6)"
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: "rgba(255,255,255,0.3)"
                }
              }
            },
            // itemStyle: {
            //   borderRadius: 8
            // },
            data: [
              { value: 40, name: "西咸新区分行" },
              { value: 38, name: "宝鸡分行" },
              { value: 32, name: "咸阳分行" },
              { value: 30, name: "渭南分行 " },
              { value: 28, name: "榆林分行 " },
              { value: 26, name: "延安分行 " },
              { value: 22, name: "铜川分行 " },
              { value: 18, name: "汉中分行 " },
              { value: 16, name: "安康分行 " },
              { value: 14, name: "商洛分行 " }
            ],
            color: [
              "rgba(255,0,81,0.6)",
              "rgba(255,79,15,0.6)",
              "rgba(255,155,0,0.6)",
              "rgba(255,204,0,0.6)",
              "rgba(188,214,0,0.6)",
              "rgba(0,220,10,0.6)",
              "rgba(0,219,202,0.6)",
              "rgba(74,162,255,0.6)"
            ]
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
        if (ele.card_i_name === "card7" && (ele.card_id === this.item.card_id)) {
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
  // beforeDestroy() { // 移除事件监听器
  //   this.$bus.off("refreshCardData")
  //   this.$bus.off("productChange")
  //   this.$bus.off("branchChange")
  // },
  methods: {
    //请求图表
    getChartData() {
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: servicecode ? servicecode : this.servicecode,
        busi_type: this.productCode, //接口查询产品编码
        branch_id: this.areaCode //接口查询区域编码
      };

      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
        if (response.code === "200") {
          //TODO 解析接口数据后注入到option中

          this.option.series[0].data = []; //chart数据 int数组
          let chartData = [];
          for (const child of response.data) {
            chartData.push({
              name: branchIdDict.find(item => item.code === child.branch_id)
                .name,
              value: child.credit_amt
            });
          }
          this.option.series[0].data = chartData;
        } else {
          MyMessage({ message: response.message, type: "error" });
        }
      });
    },
    //扩大显示当前图表
    popover() {}
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
