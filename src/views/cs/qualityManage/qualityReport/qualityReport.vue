<template>
  <div class="layout">
    <el-form
      ref="searchForm"
      :model="divisionReq"
      size="small"
      label-width="100"
      :rules="rules"
    >
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item
            label="报告频度"
            prop="quality_report_cycletype"
            :rules="[
              { required: true, message: '请选择报告频度', trigger: 'blur' }
            ]"
          >
            <el-select
              v-model="quality_report_cycletype"
              placeholder="请选择"
              :rules="rules1.quality_report_cycletype"
            >
              <el-option
                v-for="item in cycletype"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="任务起始时间"
            prop="quality_report_start_time"
            :rules="[
              { required: true, message: '请选择任务起始时间', trigger: 'blur' }
            ]"
          >
            <el-date-picker
              v-model="quality_report_start_time"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="任务结束时间"
            prop="quality_report_end_time"
            :rules="[
              { required: true, message: '请选择任务结束时间', trigger: 'blur' }
            ]"
          >
            <el-date-picker
              v-model="quality_report_end_time"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button
        type="primary"
        icon="el-icon-search"
        @click="selQualityReport()"
        >查询</el-button
      >
      <el-button type="primary" @click="reset()">{{$i18ns('重置')}}</el-button>
      <el-button type="primary" @click="exportPDF()">导出成PDF</el-button>
      <el-button type="primary" @click="exportEXT()">导出成excel</el-button>
    </el-form>
    <div ref="content">
      <el-row
        align="middle"
        type="flex"
        style="flex-wrap: wrap"
        id="charts-content"
      >
        <el-col
          :lg="{ span: 12 }"
          v-for="(item, index) in itemData"
          :key="index"
          :offset="0"
          class="gauge"
          :id="'myChart' + index"
        >
          <!--<div v-for="(item, index) in itemData" :key="index" class="gauge" :id="'myChart' + index"></div> -->
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
//引入Echart
import echarts from "echarts";
//在组件挂载完成的时候初始化图表容器
// import html2canvas from 'html2canvas';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default {
  data() {
    return {
      rules1: {
        quality_report_cycletype: [
          { required: true, message: "请选择时间", trigger: "change" }
        ]
      },
      required: true,
      cycletype: [
        {
          value: "Y",
          label: "年"
        },
        {
          value: "M",
          label: "月"
        },
        {
          value: "D",
          label: "日"
        }
      ],
      options: [],
      qualityRuleTypeDict: [],
      quality_task_name: null,
      branch_id: null,
      currentTime: "",
      twoYearsAgo: "",
      quality_report_start_time: "",
      quality_report_end_time: "",
      quality_report_cycletype: "Y",
      itemData: [
        [
          [100],
          {
            total: 300,
            name: "表一"
          }
        ],
        [
          [200],
          {
            total: 100,
            name: "表二"
          }
        ],
        [
          [300],
          {
            total: 100,
            name: "表三"
          }
        ],
        [
          [400],
          {
            total: 100,
            name: "表5"
          }
        ],
        [
          [400],
          {
            total: 100,
            name: "表6"
          }
        ],
        [
          [400],
          {
            total: 100,
            name: "表7"
          }
        ],
        [
          [400],
          {
            total: 100,
            name: "表8"
          }
        ],
        [
          [400],
          {
            total: 100,
            name: "表9"
          }
        ],
        [
          [400],
          {
            total: 100,
            name: "表10"
          }
        ],
        [
          [400],
          {
            total: 100,
            name: "表11"
          }
        ]
      ]
    };
  },
  created(){
    this.getDictList("CS_QUALITY_PLAN_RULE_TYPE", "qualityRuleTypeDict"); //质检内容规则类型
  },
  mounted() {
   
    let twoYearsAgo = new Date();
    this.quality_report_end_time =
      twoYearsAgo.toLocaleDateString().replace(/\//g, "-") +
      " " +
      twoYearsAgo.toTimeString().substr(0, 8);
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
    this.quality_report_start_time =
      twoYearsAgo.toLocaleDateString().replace(/\//g, "-") +
      " " +
      twoYearsAgo.toTimeString().substr(0, 8);
    // this.$nextTick(() => {
    //   this.itemData.map((v, index) => {
    //     let myChart = echarts.init(
    //       document.getElementById("myChart" + index),
    //       "macarons"
    //     ); /* 动态绑定容器元素 */

    //     let options = this.setData( index);
    //     if (options) myChart.setOption(options);
    //   });
    // });
   
  },
  methods: {
    exportPDF() {
      const content = this.$refs.content;
      html2canvas(content).then(canvas => {
        const pdf = new jsPDF("p", "mm", "a4");
        const imgData = canvas.toDataURL("image/png");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("exported-pdf.pdf");
      });
    },
    exportEXT() {
      let params = {
        servicecode: "qc0023",
        exportname: "质检报告"
      };
      MyAxios.invokeAPI("/SUMP/rest/file/commExport", "post", params)
        .then(res => {
          if (res && res.code === "200") {
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 重置
     */
    reset() {
      this.quality_task_name = null;
      this.branch_id = null;
      this.quality_report_cycletype = "Y";
      this.quality_report_start_time = null;
      this.quality_report_end_time = null;
    },
    //数据Data对象
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
            console.log(listKey , res.data);
          }
          this.selQualityReport()
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 表格字典值转换
     */
    formatProduceData(dictId, dicts) {
      let name;
      dicts.forEach(function(item, index) {
        if (dictId === item.dictId) {
          name = item.dictName;
        }
      });
      return name;
    },
    selQualityReport() {
      let qualityRuleType = [];
      if (!this.qualityRuleTypeDict) retrun;
      // console.log(
      //   "p",
      //   this.qualityRuleTypeDict,
      //   this.qualityRuleTypeDict[1].dictId
      // );

      for (let i = 0; i < this.qualityRuleTypeDict.length; i++) {
        qualityRuleType.push(this.qualityRuleTypeDict[i].dictId);
      }
      let params = {
        servicecode: "qc0022",
        quality_rule_type: qualityRuleType,
        quality_report_end_time: this.quality_report_end_time,
        quality_report_start_time: this.quality_report_start_time,
        quality_report_cycletype: this.quality_report_cycletype,
        branch_id: this.branch_id
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            this.reportData = res.data;
            console.log('qc0022=====>',res.data)
            res.data.map((item, index) => {
              let myChart = echarts.init(
                document.getElementById("myChart" + index),
                "macarons"
              ); /* 动态绑定容器元素 */
              let options = this.setData(item, index);
               myChart.setOption(options);
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    setData(item, index) {
      let x = [];
      let reportData = [];
      console.log('初始化echarts',item)
      if (item.qualityReports)
      item.qualityReports.forEach(child => {
        x.push(child.quality_report_x_date);
        reportData.push(child.quality_report_y_count);
      });

      // for (let i = 0; i < item.qualityReports.length; i++) {
      //   x.push(item.qualityReports[i].quality_report_x_date);
      //   reportData.push(item.qualityReports[i].quality_report_y_count);
      // }
      return {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        title: [
          {
            text: this.formatProduceData(
              item.quality_rule_type,
              this.qualityRuleTypeDict
            ),
            textStyle: {
              color: "#666666",
              fontSize: 20
            },
            itemGap: 20,
            left: "center",
            top: "3%" //偏移量
          }
        ],
        //echarts的配置项可以以数组的方式接受多个配置数据的哦！
        //tooltip 鼠标悬浮提提示
        xAxis: {
          type: "category",
          data: x
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: reportData,
            color: "#33ffff",
            type: "bar"
          }
        ]
      };
    }
  }
};
</script>

<style>
.gauge {
  width: 350px;
  height: 350px;
}
</style>
