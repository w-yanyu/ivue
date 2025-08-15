<template>
  <div class="limit-content">
    <!--授信额度 敞口额度  -->
    <div class="pie-table">
      <transition name="Fade">
        <div class="charts-pie" id="credit-limit-pie" v-if="pieShow"></div>
      </transition>
      <transition name="Fade">
        <div class="charts-pie" id="open-limit-pie" v-if="pieShow"></div>
      </transition>
      <el-select
        class="pie-select"
        v-model="pieChangeValue"
        @change="pieChange($event)"
        style="display: block; width: 100px;margin-left: 10px;"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <!--授信额度 -->
    <div class="charts-line" id="credit-limit-line"></div>
    <!--用信额度 -->
    <div class="charts-line" id="use-limit-line"></div>
  </div>
</template>
<script>
import echarts from "echarts";

export default {
  name: "LimitOverview",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
    //客户编号
    customeNo: {
      type: String,
      require: true
    }
  },
  components: {},
  data() {
    return {
      credit_limit_title:this.$i18ns("授信额度"),
      credit_expourse_limit_title:this.$i18ns("敞口额度"),
      total_credit_limit:this.$i18ns("T302.Total_limit"),
      available_credit_limit:this.$i18ns("T302.Available_limit"),
      used_credit_limit:this.$i18ns("T302.Used_limit"),
      total_exposure_credit_limit:this.$i18ns("T302.Total_exposure_limit"),
      available_exposure_credit_limit:this.$i18ns("T302.Available_exposure_limit"),
      used_exposure_credit_limit:this.$i18ns("T302.Used_exposure_limit"),
      unitValue: this.$i18ns("T302.Ten-thousand"),
      unit: this.$i18ns("T302.Unit"),
      unitTitle: this.$i18ns("T302.Unit")+ ':'+ this.$i18ns("T302.Ten-thousand"),
      year: this.$i18ns("T302.Years"),
      month: this.$i18ns("T302.Month"),

      creditLimit: {
        total_limit: [],
        total_limit_used: [],
        available_use_limit: []
      },
      //授信敞口额度折线图
      useLimit: {
        total_exposure_limit: [],
        used_exposure_limit: [],
        available_use_exposure: [],
      },
      monthList: [],
      creditLimitChart: null,
      openLimitChart: null,
      useLimitLineChart: null,
      creditLimitLineChart: null,
      //饼状图选择器options
      options: [
        {
          value: "all",
          label: this.$i18ns('T302.Quota-Overview')
        },
        {
          value: "base",
          label: this.$i18ns('T302.Basic-Credit')
        }
      ],
      pieChangeValue: "all", //饼状图选择器值
      pieData: [], //饼状图数据
      pieShow: true,
      timer: null
    };
  },
  created() {
    console.log('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
  },
  mounted() {
    // this.drawPieCreditLimit();
    // this.drawPieOpenLimit();
    this.drawLineCreditLimit();
    this.drawLineUseLimit();
    this.getPieInfo();
    this.getLineInfo();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.eventListenerFUn());
  },
  methods: {
    //change方法
    pieChange(value) {
      this.pieChangeValue = value;
      this.pieShow = false;
      clearInterval(this.timer); //关闭
      this.timer = setTimeout(() => {this.ChangeShow();}, 500);
    },
    ChangeShow() {
      this.pieShow = !this.pieShow;
     this.$nextTick(()=>{
      if (this.pieChangeValue === "all") {
        //饼状图授信额度
        if (this.pieData[0]) {
          this.drawPieCreditLimit(this.pieData[0]);
        }
        //饼状图敞口额度
        if (this.pieData[1]) {
          this.drawPieOpenLimit(this.pieData[1]);
        }
      } else {
        //饼状图授信额度
        if (this.pieData[2]) {
          this.drawPieCreditLimit(this.pieData[2]);
        }
        //饼状图敞口额度
        if (this.pieData[3]) {
          this.drawPieOpenLimit(this.pieData[3]);
        }
      }
     })
    },
    //获取饼状图数据
    getPieInfo() {
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: "uccp3026",
        cust_no: this.customeNo
      };

      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
        if (response.code === "200") {
          console.log("getPageInfo", response.data);
          this.pieData = response.data.info;
          //饼状图授信额度
          if (this.pieData[0]) {
            this.drawPieCreditLimit(this.pieData[0]);
          }
          //饼状图敞口额度
          if (this.pieData[1]) {
            this.drawPieOpenLimit(this.pieData[1]);
          }
        } else {
          MyMessage({ message: response.message, type: "error" });
        }
      });
    },
    //饼状图授信额度
    drawPieCreditLimit(pieData) {
      let creditLimitDom = document.getElementById("credit-limit-pie");
      this.creditLimitChart = echarts.init(creditLimitDom);
      let unitValue = this.unitValue ;
      let option = {
        title: {
          text: pieData.title,
          left: "center"
        },
        legend: {
          top: "bottom"
        },
        tooltip: {
          trigger: "item",
          formatter: function(params) {
             
          var res = params.seriesName + '</br>'

          res += params.name + ' : ' + params.value + unitValue;

          return res;

} 
           
          
        },
        graphic: {
          type: "text",
          left: "center",
          top: "50%",
          style: {
            text: pieData.total + this.unitValue,
            textAlign: "center",
            fill: "#333",
            fontSize: 10
          }
        },

        series: [
          {
            name: pieData.title,
            type: "pie",
            radius: ["40%", "70%"],

            itemStyle: {
              borderColor: "#fff",
              borderWidth: 2
            },
            data: pieData.data
          }
        ],
        color: [
          "rgb(150,214,214)",
          "rgb(136,170,208)",
          "rgb(211,82,112)",
          "rgb(246,166,107)",
          "rgb(241,122,186)"
        ]
      };
      option && this.creditLimitChart.setOption(option);
    },
    //饼状图敞口额度
    drawPieOpenLimit(pieData) {
      let openLimitDom = document.getElementById("open-limit-pie");
      this.openLimitChart = echarts.init(openLimitDom);
      let unitValue = this.unitValue;
      let option = {
        title: {
          text: pieData.title,
          left: "center"
        },
        legend: {
          top: "bottom"
        },
        tooltip: {
          trigger: "item",
          formatter: function(params) {
          

          var res = params.seriesName + '</br>'

          res+=params.name + ' : ' + params.value + unitValue;

          return res;

} 
           
           
        },
        graphic: {
          type: "text",
          left: "center",
          top: "50%",
          style: {
            text: pieData.total + this.unitValue,
            textAlign: "center",
            fill: "#333",
            fontSize: 10
          }
        },

        series: [
          {
            name: pieData.title,
            type: "pie",
            radius: ["40%", "70%"],

            itemStyle: {
              borderColor: "#fff",
              borderWidth: 2
            },
            data: pieData.data
          }
        ],
        color: [
          "rgb(150,214,214)",
          "rgb(136,170,208)",
          "rgb(211,82,112)",
          "rgb(246,166,107)",
          "rgb(241,122,186)"
        ]
      };
      option && this.openLimitChart.setOption(option);
    },
    //获取折线图数据
    getLineInfo() {
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: "uccp4007",
        cust_no: this.customeNo
      };

      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
        if (response.code === "200") {
          console.log("getLineInfo获取折线图数据", response.data);
          let creditArray = response.data;
          this.creditLimit.total_limit = [];
          this.creditLimit.total_limit_used = [];
          this.creditLimit.available_use_limit = [];

          this.creditLimit.total_exposure_limit = [];
          this.creditLimit.used_exposure_limit = [];
          this.creditLimit.available_use_exposure = [];

          for (let i in creditArray) {
            this.creditLimit.total_limit.push(creditArray[i].total_limit);
            this.monthList.push(creditArray[i].years+ this.year +creditArray[i].month+ this.month);
            this.creditLimit.total_limit_used.push(
              creditArray[i].total_limit_used
            );
            this.creditLimit.available_use_limit.push(
              creditArray[i].available_use_limit
            );

            this.useLimit.total_exposure_limit.push(
              creditArray[i].total_exposure_limit
            );
            this.useLimit.used_exposure_limit.push(
              creditArray[i].used_exposure_limit
            );
            this.useLimit.available_use_exposure.push(
              creditArray[i].available_use_exposure
            );
          }

          this.drawLineCreditLimit();
          this.drawLineUseLimit();
        } else {
          MyMessage({ message: response.message, type: "error" });
        }
      });
    },
    //折线图授信额度
    drawLineCreditLimit() {
      let creditLimitDom = document.getElementById("credit-limit-line");
      this.creditLimitLineChart = echarts.init(creditLimitDom);

      let option = {
        title: {
          text: this.credit_limit_title,
          left: "center"
        },
        tooltip: {
          trigger: "axis",
          //   backgroundColor: "#FFFFFF", // 修改背景颜色
          //   borderColor: "#F3F3F3", // 修改边框颜色
          //   color:"#000000"
          formatter: "{b0}<br/> {a0}:{c0} <br/>{a1}:{c1} <br/>{a2}:{c2}"  
        },
        legend: {
          top: "bottom",
          data: [this.total_credit_limit, this.available_credit_limit, this.used_credit_limit]
        },
        grid: {},
        toolbox: {},
        xAxis: {
          type: "category",
          data: this.monthList,
          axisPointer: {
              type: "shadow",
          },
          axisPointer: {
            type: "shadow"
          }
        },
        yAxis: {
          type: "value",
          name: this.unitTitle,
        },
        series: [
          {
            name: this.total_credit_limit,
            type: "bar",
            barGap: "0%",
            tooltip: {
              valueFormatter: function(value) {
                return value;
              }
            },
            data: this.creditLimit.total_limit
          },
          {
            name: this.available_credit_limit,
            type: "bar",
            barGap: "0%",
            tooltip: {
              valueFormatter: function(value) {
                return value;
              }
            },
            data: this.creditLimit.available_use_limit
          },
          {
            name: this.used_credit_limit,
            type: "bar",
            barGap: "0%",
            tooltip: {
              valueFormatter: function(value) {
                return value;
              }
            },
            data: this.creditLimit.total_limit_used
          }
        ],
        color: [
          "rgb(150,214,214)",
          "rgb(136,170,208)",
          "rgb(211,82,112)",
          "rgb(246,166,107)",
          "rgb(241,122,186)"
        ]
      };
      option && this.creditLimitLineChart.setOption(option);
    },
    //折线图用信额度
    drawLineUseLimit() {
      let creditLimitDom = document.getElementById("use-limit-line");
      this.useLimitLineChart = echarts.init(creditLimitDom);

      let option = {
        title: {
          text: this.credit_expourse_limit_title,
          left: "center"
        },
        tooltip: {
          trigger: "axis",
          //   backgroundColor: "#FFFFFF", // 修改背景颜色
          //   borderColor: "#F3F3F3", // 修改边框颜色
          //   color:"#000000"
          formatter: "  {b0}<br/> {a0}:{c0} <br/>{a1}:{c1} <br/>{a2}:{c2}"  
        },
        legend: {
          top: "bottom",
          data: [this.total_exposure_credit_limit, this.available_exposure_credit_limit, this.used_exposure_credit_limit]
        },
        grid: {},
        toolbox: {},
        xAxis: {
          type: "category",
          data: this.monthList,
          axisPointer: {
              type: "shadow",
          },
          axisPointer: {
            type: "shadow"
          }
        },
        yAxis: {
          type: "value",
          name: this.unitTitle,
        },
        series: [
          {
            name: this.total_exposure_credit_limit,
            type: "bar",
            barGap: "0%",
            tooltip: {
              valueFormatter: function(value) {
                return value;
              }
            },
            data: this.useLimit.total_exposure_limit
          },
          {
            name: this.available_exposure_credit_limit,
            type: "bar",
            barGap: "0%",
            stack: "Total",
            tooltip: {
              valueFormatter: function(value) {
                return value;
              }
            },
            data: this.useLimit.available_use_exposure
          },
          {
            name: this.used_exposure_credit_limit,
            type: "bar",
            barGap: "0%",
            tooltip: {
              valueFormatter: function(value) {
                return value;
              }
            },
            data: this.useLimit.used_exposure_limit
          }
        ],
        color: [
          "rgb(150,214,214)",
          "rgb(136,170,208)",
          "rgb(211,82,112)",
          "rgb(246,166,107)",
          "rgb(241,122,186)"
        ]
      };
      option && this.useLimitLineChart.setOption(option);
    },
    beforeDestroy() {
      if (this.timer) {
        //如果定时器还在运行 或者直接关闭，不用判断
        clearInterval(this.timer); //关闭
      }
    }
  }
};
</script>
<style lang="less" scoped>
.limit-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  overflow: hidden;
  overflow-y: scroll;
}
.pie-table {
  margin-top: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  height: 350px;
}
.pie-select {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
}
.charts-pie {
  flex: 1;
  height: 350px;
}
.charts-line {
  margin-top: 30px;
  width: 100%;
  height: 300px;
}
.Fade-enter,
.Fade-leave-to {
  opacity: 0;
  transform: translateX(150%);
}
.Fade-enter-to,
.Fade-leave {
  opacity: 1;
  transform: translateX(0%);
}

.Fade-enter-active,
.Fade-leave-active {
  transition: all 0.5s;
}
</style>
