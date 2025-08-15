<template>
  <div>
    <el-form ref="ruleForm" :model="ruleForm" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="产品编号" prop="crdtcd" :rules="[{ required: true, message: '请选择产品编号'}]">
            <el-select v-model="ruleForm.crdtcd" placeholder="请选择产品编号" size="mini">
              <el-option v-for="item in prodList" :key="item.crdtcd" :label="item.prodna" :value="item.crdtcd"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="统计日期">
            <el-date-picker
              v-model="ruleForm.tjdate"
              type="date"
              placeholder="选择日期"
              value-format="yyyyMMdd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8" class="chart-btn--group">
          <el-button type="primary" @click="search">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div class="charts-container approval-chart--top" v-if="show"></div>
    <div class="charts-container approval-chart--bottom" v-if="show"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import MyAxios from "pte-ui/utils/MyAxios";
import * as _ from "lodash";

export default {
  name: "ApprovalCharts",
  data() {
    return {
      show: true,
      prodList: [], // 可售产品列表
      timeData: [], // 审批市场数据
      countData: [], // 审批笔数数据
      ruleForm: {
        crdtcd: "",
        tjdate: "",
      }
    };
  },
  mounted() {
    this.getProductList();
    this.chartInit("approval-chart--top");
    this.pieChartInit("approval-chart--bottom");
    window.addEventListener("resize", this.windowResize);
  },
  beforeDestroy() {
    window.addEventListener("resize", this.windowResize);
  },
  methods: {
    // 窗口变化重新加载图表
    windowResize: _.debounce(function() {
      if (document.querySelector(".approval-chart--top")) {
        this.show = false;
        this.$nextTick(() => {
          this.show = true;
          this.$nextTick(() => {
            this.chartInit("approval-chart--top", this.timeData);
            this.pieChartInit("approval-chart--bottom", this.countData);
          });
        });
      }
    }, 300),
    // 获取可售产品下拉
    getProductList() {
      let params = {
        servicecode: "AS_ICMS_PD_QRPDLS",
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200" && res.data) {
          this.prodList = res.data;
        }
      }).catch(err => {
        console.error(err);
      });
    },
    // 图表数据初始化
    chartDataInit() {
      let params = {
        servicecode: "ICMSJKSS0051",
        tjdate: this.ruleForm.tjdate, // 统计日期
        crdtcd: this.ruleForm.crdtcd, // 产品编号
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200" && res.data) {
          let data = res.data.statistics;
          this.timeData = [data.spjjlcpjsjfz, data.spjjlczdsjfz, data.spjjlczxssfz, data.sptglcpjsjfz, data.sptglczcsjfz, data.sptglczxsjfz];
          this.countData = [data.sptgzbs, data.jjzbs, data.spzbs];
          this.chartInit("approval-chart--top", this.timeData);
          this.pieChartInit("approval-chart--bottom", this.countData);
        }
      }).catch(err => {
        console.error(err);
      });
    },
    /**
     * 头部柱状图初始化
     * @param className 图表渲染容器class名
     * @param data 图表渲染数据
     */
    chartInit(className, chartData) {
      if (!chartData) {
        return false;
      }
      let data = chartData.map(item => {
        if (!item) {
          return "0";
        }
        return item;
      });
      let topContainer = document.querySelector(`.${className}`);
      let myChart = echarts.init(topContainer);
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "当日审批时间",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: [
            "审批拒绝流程平均时间",
            "审批拒绝流程最大时间",
            "审批拒绝流程最小时间",
            "审批通过流程平均时间",
            "审批通过流程最长时间",
            "审批通过流程最小时间",
          ],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          name: "分钟",
          type: "value",
          boundaryGap: [0, 0.01],
          axisLine: {
            symbol: ["none", "arrow"],
            symbolSize: [5, 8],
            symbolOffset: [0, 6],
          },
          axisTick: {
            inside: true,
          },
          axisLabel: {
            showMaxLabel: false,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "category",
          data: ["当日审批时间"],
          axisLine: {
            symbol: ["none", "arrow"],
            symbolSize: [5, 8],
          },
        },
        series: [
          {
            name: "审批拒绝流程平均时间(分钟)",
            type: "bar",
            data: [data[0]],
          },
          {
            name: "审批拒绝流程最大时间(分钟)",
            type: "bar",
            data: [data[1]],
          },
          {
            name: "审批拒绝流程最小时间(分钟)",
            type: "bar",
            data: [data[2]],
          },
          {
            name: "审批通过流程平均时间(分钟)",
            type: "bar",
            data: [data[3]],
          },
          {
            name: "审批通过流程最长时间(分钟)",
            type: "bar",
            data: [data[4]],
          },
          {
            name: "审批通过流程最小时间(分钟)",
            type: "bar",
            data: [data[5]],
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    pieChartInit(className, chartData) {
      if (!chartData) {
        return false;
      }
      let data = chartData.map(item => {
        if (!item) {
          return "0";
        }
        return item;
      });
      let bottomContainer = document.querySelector(`.${className}`);
      let myChart = echarts.init(bottomContainer);
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: "当日审批统计图",
          left: "left",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "center",
          data: ["审批通过总笔数", "拒绝总笔数", "审批中笔数"],
        },
        series: [
          {
            name: "审批统计",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: data[0], name: "审批通过总笔数" },
              { value: data[1], name: "拒绝总笔数" },
              { value: data[2], name: "审批中笔数" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    search() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.chartDataInit();
        } else {
          this.$message({
            type: "warning",
            message: "校验不通过",
          })
        }
      })
    },
  },
};
</script>
<style lang="less" scoped>
.charts-container {
  width: 100%;
  height: 400px;
  padding: 20px;
  box-sizing: border-box;
}
.chart-btn--group {
  line-height: 38px;
}
</style>