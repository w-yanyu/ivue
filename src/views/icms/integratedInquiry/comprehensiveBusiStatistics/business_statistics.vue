<template>
  <div class="limit-content">

    <el-form :rules="rules" ref="prodNameRule" inline="true" class="sel" :model="form" label-width="140px">
      <el-form-item label="统计类型">
        <el-select v-model="by" @change="pieChange($event)" style="display: block; width: 150px;margin-left: 10px;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
<!-- 
      <el-form-item class="op" label="机构名称">
        <el-select v-model="branch" filterable :title="getTitle(branch)" :disabled="branchAble" remote reserve-keyword
          :remote-method="remoteMethod" :loading="loading" width>
          <el-option v-for="(item, index) in branchList" :key="item.branch_id" :label="item.branch_name"
            @click.native="qwe(item.branch_name)" :value="item.branch_id"></el-option>
        </el-select>
      </el-form-item> -->

      <el-form-item prop="prodName" v-if="by == 3 || by == 5 || by == 6" label="产品名称">
        <el-select clearable v-model="form.prodName">
          <el-option v-for="(item, i) in prodList" :key="i" :label="item.sale_prod_name" :value="item.sale_prod_cd">
          </el-option>
        </el-select>
      </el-form-item>

      </br>

      <el-form-item v-if="by == 4" style="margin-top: 25px;" label="开始日期">
        <el-date-picker v-model="starDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" type="date"
          placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item style="margin-top: 25px;" label="截止日期">
        <el-date-picker v-model="endDate" format="yyyy-MM-dd" @click.native="dateRe" value-format="yyyy-MM-dd" type="date"
          :disabled="dateShow"></el-date-picker>
      </el-form-item>
      <el-form-item class="subMit">
        <el-button style="margin-left: 65px;" type="primary" @click="getData()">查询</el-button>
        <el-button @click="rest()">重置</el-button>
      </el-form-item>
    </el-form>

    <div class="pie-table">

      <transition name="Fade">
        <div class="charts-pie" :class="{ 'qwe': isop }" id="Ylimit-line"
          v-if="pieChangeValue === 0 || pieChangeValue === 1 || pieChangeValue === 2 || pieChangeValue === 4"></div>
      </transition>

      <transition name="Fade">
        <div v-if="pieChangeValue === 6">
          <div class="charts-pie" id="Ylimit-line2"></div>
          <div class="charts-pie" id="Ylimit-line21"></div>
          <div class="charts-pie" id="Ylimit-line22"></div>
        </div>
      </transition>

      <transition name="Fade">
        <div class="lay" v-if="pieChangeValue === 3">
          <div class="charts-pie3" id="Ylimit-line7"></div>
          <div class="charts-pie3" id="Ylimit-line8"></div>
        </div>
      </transition>

      <transition name="Fade">
        <div class="lay" v-if="pieChangeValue === 5">
          <div class="charts-pie3" id="Ylimit-line3"></div>
          <div class="charts-pie3" id="Ylimit-line4"></div>
          <div class="charts-pie3" id="Ylimit-line5"></div>
          <div class="charts-pie3" id="Ylimit-line6"></div>
        </div>
      </transition>

    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import MyAxios from "pte-ui/utils/MyAxios";

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
      form: {
        prodName: "",
      },
      dateShow: true,
      lineName: "授信金额统计图",
      isop: false,
      openLimitChart: null,
      text: [
        ["33", "66", "99", "133",],
        ["55", "22", "66", "88",],
        ["44", "77", "22", "77",],
        ["33", "66", "99", "133",],
        ["34", "66", "89", "123"],
        ["44", "77", "22", "77",],
        ["33", "66", "99", "133",],

      ],
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
      lineData: [],
      monthList: [],
      yname: "",
      branch: "",
      branchId: "",
      userDate: "",
      prodList: [],
      opts: "",
      loading: false,
      branchAble: false,
      ftlist: [],
      saveDate: "",
      creditLimitChart: null,
      openLimitChart: null,
      useLimitLineChart: null,
      creditLimitLineChart: null,
      branchList: [],
      starDate: "",
      endDate: "",
      prod: "",
      dw: "户数（户））",
      //饼状图选择器options
      options: [
        {
          value: 0,
          label: "授信金额统计"
        },
        {
          value: 1,
          label: "授信户数统计"
        },
        {
          value: 2,
          label: "逾期情况统计"
        },
        {
          value: 3,
          label: "贷款质量统计"
        },
        {
          value: 4,
          label: "业务审批情况统计"
        },
        {
          value: 5,
          label: "担保情况统计"
        },
        {
          value: 6,
          label: "还款方式统计"
        }
      ],
      pieChangeValue: 0, //饼状图选择器值
      by: 0,
      pieData: [],//饼状图数据
      creditLimitLineChart: null,
      timer: null,
      rema: [],
      form: [],
      rules: {
        prodName: [{ required: true, message: "请选择产品", trigger: "change" },],

      }
    };
  },

  created() {

    let userInfo = JSON.parse(localStorage.getItem('user_info'));

    this.userDate = userInfo.format_date
    this.getBranch();
    this.getRole()

  },
  mounted() {
    // this.getDate()
    this.getProd()

  },
  beforeDestroy() {
    window.removeEventListener("resize", this.eventListenerFUn());
  },
  methods: {
    qwe(val) {
      this.opts = val
    },

    getTitle(val) {
      console.log("==", val)


      return this.opts
    },

    //change方法
    pieChange(value) {
      this.by = value;
      this.lineName = this.options[value].label
      if (this.by === 4) {
        this.dateShow = false
      } else {
        this.dateShow = true
        // this.endDate = this.saveDate
      }


    },
    dateRe() {
      if (this.by == 4) {
        this.endDate = ""
      } else return

    },
    // getDate() {
    //   let params = {
    //     servicecode: "pl0012",

    //   };
    //   MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
    //     .then((res) => {
    //       if (res && res.code === "200") {
    //         console.log("sj", res.data)
    //         this.saveDate = res.data.tran_time
    //         this.endDate = res.data.tran_time

    //       }
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // },
    
    getProd() {
      let params = {
        length:999,
        servicecode: "pd0214",

      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            console.log("pd0214:", res.data)
            this.prodList = res.data
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    // remoteMethod(val){
    //   this.getBranch();
    //   if(val !== ""){
    //     this.loading = true;
    //     setTimeout(() => {
    //       this.loading = false;
    //       this.branchList = this.branchList.filter((item) =>{
    //           return item.branch_name.indexOf(val) > -1;
    //       })
    //     }, 200);
    //   } else {
    //     this.branchList = []
    //   }
    // },



    // getBranch() {
    //   let reqMap = {
    //     servicecode: "ct2192",
    //   }
    //   MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap).then(res => {
    //     if (res && res.code === "200") {
    //       this.branchList = [];
    //       res.data.list01.forEach(item => {
    //         if (item) {
    //           console.log("222")
    //           this.branchList.push({
    //             branch_name: item.branch_name,
    //             branch_id: item.branch_id
    //           })
    //         }

    //       })

    //       if (res.data.info.branch_name) {

    //         this.branch = res.data.info.branch_name
    //         this.opts = res.data.info.branch_name
    //         this.branchId = res.data.info.branch_id

    //         this.branchAble = true
    //         console.log("333", this.branchList)
    //       }

    //     }
    //   }).catch(err => {
    //     console.error(err);
    //   });
    // },


    rest() {

      if (this.by == 3 || this.by == 5 || this.by == 6) {
        this.form.prodName = ""
      }


      if (this.branchAble == false) {
        this.branch = ""
      }

    },

    getData() {

      let bran = ""
      if (this.branchId) {
        bran = this.branchId
      } else {
        bran = this.branch
      }

      this.$refs.prodNameRule.validate(valid => {
        console.log("kanaknduicuo", valid)
        if (valid) {
          let params = {
            servicecode: "ar0863",    //  原来 ar6105
            yw_start_type: "0" + this.by.toString(),
            branch_id: bran,
            sale_prod_cd: this.form.prodName,
            start_time: this.starDate,
            end_time: this.endDate

          }
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
            if (res && res.code === "200" && res.data) {
              this.rema = res.data.remar4;
              this.yname = res.data.y_name;
              console.log("this.yname", this.yname)
              if (this.by == 0 || this.by == 1 || this.by == 2 || this.by == 4) {
                if (this.by == 4 || this.by == 2) { this.dw = "笔数（笔）" }
                if (this.by == 1) { this.dw = "户数（户）" }
                if (this.by == 0) { this.dw = "金额（万元）" }
                this.lineData = res.data[`list0${this.by + 1}`]
                console.log("ff", this.lineData)
                this.onSubmit()
              }
              else if (this.by == 3 || this.by == 5 || this.by == 6) {
                console.log("拿数据")
                this.pieData = res.data[`list0${this.by + 1}`]
                this.onSubmit()

              }
            }
          }).catch(err => {
            console.error(err);
          })

        }
      })

    },


    getRole() {
      let params = {
        servicecode: "ct2087",

      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            console.log("急急急急急急", res.data)

          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    onSubmit() {

      this.pieChangeValue = this.by

      //饼状图授信额度
      if (this.pieChangeValue === 0) {

        this.$nextTick(() => {
          this.drawLineCreditLimit()
        })

      }

      else if (this.pieChangeValue === 1 || this.pieChangeValue === 2 || this.pieChangeValue === 4) {
        this.$nextTick(() => {
          this.drawLineCreditLimitNum()
        })

        console.log("232323")
      }
      else if (this.pieChangeValue === 3) {
        this.$nextTick(() => {
          this.drawLineCreditLimit7()
          this.drawLineCreditLimit8()
        })

      }
      else if (this.pieChangeValue === 6) {
        this.$nextTick(() => {
          this.drawLineCreditLimit2()
          this.drawLineCreditLimit21()
          this.drawLineCreditLimit22()
        })

      } else if (this.pieChangeValue === 5) {
        this.$nextTick(() => {
          this.drawLineCreditLimit3()
          this.drawLineCreditLimit4()
          this.drawLineCreditLimit5()
          this.drawLineCreditLimit6()
        })


      }





    },

    //折线图授信额度
    drawLineCreditLimit(val) {
      let tongjiDom = document.getElementById("Ylimit-line");
      this.creditLimitLineChart = echarts.init(tongjiDom);

      let option = {
        title: {
          text: this.lineName,
          left: "center"
        },
        tooltip: {
          trigger: "axis",

          formatter: function (params) {
            var texts = "";
            console.log("sss", params[0])

            texts = params[0].name + "<br>";

            texts += params[0].seriesName + ":" + params[0].data.amt + "万元 " + "<br/>" + params[1].seriesName + ":" + params[0].data.bal + "万元 " + "<br/>" + params[2].seriesName + ":" + params[2].data.rate + "% "

            return texts
          }

        },
        legend: {
          top: "top",
          left: "15%"

        },
        dataset: {
          // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
          // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
          // 如果不指定 dimensions，也可以通过指定 series.encode
          // 完成映射，参见后文。
          dimensions: ["sale_prod_name", "amt", "bal", "rate"],
          source: this.lineData,
        },
        grid: {},
        toolbox: {},
        xAxis: {
          type: "category",

          axisPointer: {
            type: "shadow",
          },
          axisPointer: {
            type: "shadow"
          }
        },
        yAxis: [{
          type: "value",
          name: "金额（万元）",
        },
        {
          type: 'value',
          name: this.yname[1],

          // nameTextStyle: {
          //   color: "#A1BADF",
          //   fontWeight: 400,
          //   fontSize: 24,
          // },
        },

        ],
        series: [
          {
            name: this.rema[0],
            barWidth: 60, //柱图宽度
            type: "bar",
            color: "#b9e0dc",
            barGap: "0%",
            tooltip: {
              valueFormatter: function (value) {
                return value;
              }
            },

          },
          {
            name: this.rema[1],
            barWidth: 60, //柱图宽度
            color: "#edc9b7",
            type: "bar",
            barGap: "0%",
            tooltip: {
              valueFormatter: function (value) {
                return value;
              }
            },

          },
          {
            name: this.rema[2],
            type: "line",
            barGap: "0%",
            tooltip: {
              valueFormatter: function (value) {
                return value;
              }
            },

            yAxisIndex: 1,
          },

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


    drawLineCreditLimitNum(val) {
      let tongjiDom = document.getElementById("Ylimit-line");
      this.creditLimitLineChart = echarts.init(tongjiDom);
      let by = this.by

      let option = {
        title: {
          text: this.lineName,
          left: "center"
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            var texts = "";
            console.log("sss", params[0])
            let danwei = ""
            if (by == 1) {
              danwei = "户"
            } else if (by == 2) {
              danwei = "笔"
            } else if (by == 4) {
              danwei = "笔"
            }

            texts = params[0].name + "<br>";

            texts += params[0].seriesName + ":" + params[0].data.num1 + danwei + "<br/>" + params[1].seriesName + ":" + params[0].data.num2 + danwei + "<br/>" + params[2].seriesName + ":" + params[2].data.rate + "% "

            return texts
          }
        },
        legend: {
          top: "top",
          left: "15%"

        },
        dataset: {
          // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
          // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
          // 如果不指定 dimensions，也可以通过指定 series.encode
          // 完成映射，参见后文。
          dimensions: ["sale_prod_name", "num1", "num2", "rate"],
          source: this.lineData,
        },
        grid: {},
        toolbox: {},
        xAxis: {
          type: "category",

          axisPointer: {
            type: "shadow",
          },
          axisPointer: {
            type: "shadow"
          }
        },
        yAxis: [{
          type: "value",
          name: this.dw,
        },
        {
          type: 'value',
          name: this.yname[1],

          // nameTextStyle: {
          //   color: "#A1BADF",
          //   fontWeight: 400,
          //   fontSize: 24,
          // },
        },

        ],
        series: [
          {
            name: this.rema[0],
            barWidth: 60, //柱图宽度
            type: "bar",
            color: "#b9e0dc",
            barGap: "0%",
            tooltip: {
              valueFormatter: function (value) {
                return value;
              }
            },

          },
          {
            name: this.rema[1],
            barWidth: 60, //柱图宽度
            color: "#edc9b7",
            type: "bar",
            barGap: "0%",
            tooltip: {
              valueFormatter: function (value) {
                return value;
              }
            },

          },
          {
            name: this.rema[2],
            type: "line",
            barGap: "0%",
            tooltip: {
              valueFormatter: function (value) {
                return value;
              }
            },

            yAxisIndex: 1,
          },

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




    drawLineCreditLimit2() {
      console.log('666666')
      let tongjiDom = document.getElementById("Ylimit-line2");
      this.openLimitChart = echarts.init(tongjiDom);

      let option = {
        legend: {
          top: "0%", //水平位置，【left\center\right\数字】
          left: '12%',
          align: "left", //字在图例的左边或右边【left/right】
          orient: "vertical", //图例方向【horizontal/vertical】
          icon: "circle", //图例形状【circle\rect\roundRect\triangle\diamond\pin\arrow\none】
          textStyle: {
            color: "#8C8C8C",
          },

        },



        dataset: {
          // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
          // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
          // 如果不指定 dimensions，也可以通过指定 series.encode
          // 完成映射，参见后文。
          dimensions: ["retuKind", "appl_amt"],
          source: this.pieData,
        },
        color: ["#8792FF", "#2B64FF", "#6DA7FF"],
        title: {
          text: "授信金额（万元）",
          left: "center",

        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            console.log(params, "bingtu88888")
            var texts = "";
            //   console.log("sss",params[0])
            //   texts = params[0].name   +  "<br>";
            texts += params.name + ":" + params.data.appl_amt + "万元 "
            return texts
          }

        },


        series: [
          {

            radius: '70%',
            type: "pie",
            center: ['50%', '63%'],
            encode: {
              itemName: "retuKind",
              value: "appl_amt"

            },

            tooltip: {
              valueFormatter: function (value) {
                return value;
              }
            },

          },


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


    drawLineCreditLimit3() {
      console.log('666666')
      let tongjiDom = document.getElementById("Ylimit-line3");
      this.openLimitChart = echarts.init(tongjiDom);

      let option = {
        legend: {
          top: "0%", //水平位置，【left\center\right\数字】
          left: '12%',
          align: "left", //字在图例的左边或右边【left/right】
          orient: "vertical", //图例方向【horizontal/vertical】
          icon: "circle", //图例形状【circle\rect\roundRect\triangle\diamond\pin\arrow\none】
          textStyle: {
            color: "#8C8C8C",
          },

        },

        dataset: {
          // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
          // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
          // 如果不指定 dimensions，也可以通过指定 series.encode
          // 完成映射，参见后文。
          dimensions: ["guar_tp", "tol_appl_amt"],
          source: this.pieData,
        },
        color: ["#8792FF", "#2B64FF", "#6DA7FF"],
        title: {
          text: "授信金额（万元）",
          left: "center",

        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            console.log(params, "bingtu88888")
            var texts = "";
            //   console.log("sss",params[0])
            //   texts = params[0].name   +  "<br>";
            texts += params.name + ":" + params.data.tol_appl_amt + "万元 "
            return texts
          }
        },

        series: [
          {
            radius: '70%',
            center: ['50%', '63%'],
            type: "pie",
            encode: {
              itemName: "guar_tp",
              value: "tol_appl_amt"

            },
            normal: {
              borderWidth: 1,

              color: "rgba(163,50,233,0.5)",
              borderColor: "#a332e9",

            },
            tooltip: {
              valueFormatter: function (value) {
                return value;
              }
            },

          },


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


    drawLineCreditLimit21() {
      console.log('666666')
      let tongjiDom = document.getElementById("Ylimit-line21");
      this.openLimitChart = echarts.init(tongjiDom);

      let option = {
        legend: {
          top: "0%", //水平位置，【left\center\right\数字】
          left: '12%',
          align: "left", //字在图例的左边或右边【left/right】
          orient: "vertical", //图例方向【horizontal/vertical】
          icon: "circle", //图例形状【circle\rect\roundRect\triangle\diamond\pin\arrow\none】
          textStyle: {
            color: "#8C8C8C",
          },

        },

        dataset: {
          // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
          // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
          // 如果不指定 dimensions，也可以通过指定 series.encode
          // 完成映射，参见后文。
          dimensions: ["retuKind", "num"],
          source: this.pieData,
        },
        color: ["#8792FF", "#2B64FF", "#6DA7FF"],
        title: {
          text: " 授信客户数（户） ",
          left: "center",

        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            console.log(params, "bingtu88888")
            var texts = "";
            //   console.log("sss",params[0])
            //   texts = params[0].name   +  "<br>";
            texts += params.name + ":" + params.data.num + "户 "
            return texts
          }
        },

        series: [
          {
            radius: '70%',
            center: ['50%', '63%'],
            type: "pie",
            encode: {
              itemName: "retuKind",
              value: "num"

            },

            tooltip: {
              valueFormatter: function (value) {
                return value;
              }
            },

          },


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





    drawLineCreditLimit22() {
      console.log('666666')
      let tongjiDom = document.getElementById("Ylimit-line22");
      this.openLimitChart = echarts.init(tongjiDom);

      let option = {
        legend: {
          top: "0%", //水平位置，【left\center\right\数字】
          left: '12%',
          align: "left", //字在图例的左边或右边【left/right】
          orient: "vertical", //图例方向【horizontal/vertical】
          icon: "circle", //图例形状【circle\rect\roundRect\triangle\diamond\pin\arrow\none】
          textStyle: {
            color: "#8C8C8C",
          },

        },

        dataset: {
          // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
          // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
          // 如果不指定 dimensions，也可以通过指定 series.encode
          // 完成映射，参见后文。
          dimensions: ["retuKind", "amt1"],
          source: this.pieData,
        },
        color: ["#8792FF", "#2B64FF", "#6DA7FF"],
        title: {
          text: " 不良贷款余额（万元） ",
          left: "center",

        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            console.log(params, "bingtu88888")
            var texts = "";
            //   console.log("sss",params[0])
            //   texts = params[0].name   +  "<br>";
            texts += params.name + ":" + params.data.amt1 + "万元 "
            return texts
          }
        },

        series: [
          {
            center: ['50%', '63%'],

            radius: '70%',
            type: "pie",
            encode: {
              itemName: "retuKind",
              value: "amt1"

            },

            tooltip: {
              valueFormatter: function (value) {
                return value;
              }
            },

          },


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



    drawLineCreditLimit4() {
      console.log('666666')
      let tongjiDom = document.getElementById("Ylimit-line4");
      this.openLimitChart = echarts.init(tongjiDom);

      let option = {
        legend: {
          top: "0%", //水平位置，【left\center\right\数字】
          left: '12%',
          align: "left", //字在图例的左边或右边【left/right】
          orient: "vertical", //图例方向【horizontal/vertical】
          icon: "circle", //图例形状【circle\rect\roundRect\triangle\diamond\pin\arrow\none】
          textStyle: {
            color: "#8C8C8C",
          },

        },

        dataset: {
          // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
          // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
          // 如果不指定 dimensions，也可以通过指定 series.encode
          // 完成映射，参见后文。
          dimensions: ["guar_tp", "amt1"],
          source: this.pieData,
        },
        color: ["#8792FF", "#2B64FF", "#6DA7FF"],
        title: {
          text: " 贷款余额（万元）",
          left: "center",

        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            console.log(params, "bingtu88888")
            var texts = "";
            //   console.log("sss",params[0])
            //   texts = params[0].name   +  "<br>";
            texts += params.name + ":" + params.data.amt1 + "万元 "
            return texts
          }
        },

        series: [
          {
            radius: '70%',
            center: ['50%', '63%'],
            type: "pie",
            encode: {
              itemName: "guar_tp",
              value: "amt1"

            },
            normal: {
              borderWidth: 1,

              color: "rgba(163,50,233,0.5)",
              borderColor: "#a332e9",

            },
            tooltip: {
              valueFormatter: function (value) {
                return value;
              }
            },

          },


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










    drawLineCreditLimit5() {
      console.log('666666')
      let tongjiDom = document.getElementById("Ylimit-line5");
      this.openLimitChart = echarts.init(tongjiDom);

      let option = {
        legend: {
          top: "0%", //水平位置，【left\center\right\数字】
          left: '12%',
          align: "left", //字在图例的左边或右边【left/right】
          orient: "vertical", //图例方向【horizontal/vertical】
          icon: "circle", //图例形状【circle\rect\roundRect\triangle\diamond\pin\arrow\none】
          textStyle: {
            color: "#8C8C8C",
          },

        },

        dataset: {
          // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
          // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
          // 如果不指定 dimensions，也可以通过指定 series.encode
          // 完成映射，参见后文。
          dimensions: ["guar_tp", "num"],
          source: this.pieData,
        },
        color: ["#8792FF", "#2B64FF", "#6DA7FF"],
        title: {
          text: " 授信客户数（户） ",
          left: "center",

        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            console.log(params, "bingtu88888")
            var texts = "";
            //   console.log("sss",params[0])
            //   texts = params[0].name   +  "<br>";
            texts += params.name + ":" + params.data.num + "户 "
            return texts
          }
        },
        series: [
          {
            center: ['50%', '63%'],
            radius: '70%',
            type: "pie",
            encode: {
              itemName: "guar_tp",
              value: "num"

            },
            normal: {
              borderWidth: 1,

              color: "rgba(163,50,233,0.5)",
              borderColor: "#a332e9",

            },
            tooltip: {
              valueFormatter: function (value) {
                return value;
              }
            },

          },


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

    drawLineCreditLimit6() {
      console.log('666666')
      let tongjiDom = document.getElementById("Ylimit-line6");
      this.openLimitChart = echarts.init(tongjiDom);

      let option = {
        legend: {
          top: "0%", //水平位置，【left\center\right\数字】
          left: '12%',
          align: "left", //字在图例的左边或右边【left/right】
          orient: "vertical", //图例方向【horizontal/vertical】
          icon: "circle", //图例形状【circle\rect\roundRect\triangle\diamond\pin\arrow\none】
          textStyle: {
            color: "#8C8C8C",
          },

        },

        dataset: {
          // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
          // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
          // 如果不指定 dimensions，也可以通过指定 series.encode
          // 完成映射，参见后文。
          dimensions: ["guar_tp", "amt2"],
          source: this.pieData,
        },
        color: ["#8792FF", "#2B64FF", "#6DA7FF"],
        title: {
          text: "不良贷款余额（万元）",
          left: "center",

        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            console.log(params, "bingtu88888")
            var texts = "";
            //   console.log("sss",params[0])
            //   texts = params[0].name   +  "<br>";
            texts += params.name + ":" + params.data.amt2 + "万元 "
            return texts
          }
        },

        series: [
          {
            center: ['50%', '63%'],
            radius: '70%',
            type: "pie",
            encode: {
              itemName: "guar_tp",
              value: "amt2"

            },
            normal: {
              borderWidth: 1,

              color: "rgba(163,50,233,0.5)",
              borderColor: "#a332e9",

            },
            tooltip: {
              valueFormatter: function (value) {
                return value;
              }
            },

          },

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


    drawLineCreditLimit7() {
      console.log('666666')
      let tongjiDom = document.getElementById("Ylimit-line7");
      this.openLimitChart = echarts.init(tongjiDom);

      let option = {
        legend: {
          top: "0%", //水平位置，【left\center\right\数字】
          left: '12%',
          align: "left", //字在图例的左边或右边【left/right】
          orient: "vertical", //图例方向【horizontal/vertical】
          icon: "circle", //图例形状【circle\rect\roundRect\triangle\diamond\pin\arrow\none】
          textStyle: {
            color: "#8C8C8C",
          },

        },
        dataset: {
          // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
          // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
          // 如果不指定 dimensions，也可以通过指定 series.encode
          // 完成映射，参见后文。
          dimensions: ["riskflag1", "amt"],
          source: this.pieData,
        },
        color: ["#8792FF", "#2B64FF", "#6DA7FF"],
        title: {
          text: "贷款五级分类（金额）\n\n（万元）",
          left: "center",

        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            console.log(params, "bingtu88888")
            var texts = "";
            //   console.log("sss",params[0])
            //   texts = params[0].name   +  "<br>";
            texts += params.name + ":" + params.data.amt + "万元 "
            return texts
          }
        },

        series: [
          {
            center: ['50%', '63%'],
            radius: '70%',
            type: "pie",
            encode: {
              itemName: "riskflag1",
              value: "amt"

            },
            normal: {
              borderWidth: 1,

              color: "rgba(163,50,233,0.5)",
              borderColor: "#a332e9",

            },
            tooltip: {
              valueFormatter: function (value) {
                return value;
              }
            },

          },


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


    drawLineCreditLimit8() {
      console.log('666666')
      let tongjiDom = document.getElementById("Ylimit-line8");
      this.openLimitChart = echarts.init(tongjiDom);

      let option = {
        legend: {
          top: "0%", //水平位置，【left\center\right\数字】
          left: '12%',
          align: "left", //字在图例的左边或右边【left/right】
          orient: "vertical", //图例方向【horizontal/vertical】
          icon: "circle", //图例形状【circle\rect\roundRect\triangle\diamond\pin\arrow\none】
          textStyle: {
            color: "#8C8C8C",
          },

        },

        dataset: {
          // 用 dimensions 指定了维度的顺序。直角坐标系中，如果 X 轴 type 为 category，
          // 默认把第一个维度映射到 X 轴上，后面维度映射到 Y 轴上。
          // 如果不指定 dimensions，也可以通过指定 series.encode
          // 完成映射，参见后文。
          dimensions: ["riskflag1", "num"],
          source: this.pieData,
        },
        color: ["#8792FF", "#2B64FF", "#6DA7FF"],
        title: {
          text: "贷款五级分类（笔数）",
          left: "center",

        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            console.log(params, "bingtu88888")
            var texts = "";
            //   console.log("sss",params[0])
            //   texts = params[0].name   +  "<br>";
            texts += params.name + ":" + params.data.num + "笔 "
            return texts
          }
        },

        series: [
          {
            center: ['50%', '63%'],
            radius: '70%',
            type: "pie",
            encode: {
              itemName: "riskflag1",
              value: "num"

            },
            normal: {
              borderWidth: 1,

              color: "rgba(163,50,233,0.5)",
              borderColor: "#a332e9",

            },
            tooltip: {
              valueFormatter: function (value) {
                return value;
              }
            },

          },


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


  }
};
</script>
<style lang="less" scoped>
.limit-content {
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;


}

.pie-table {
  margin-top: 55px;
  width: 100%;

  position: relative;

}

.sel {
  position: relative;
  margin-top: 10px;
  width: 100%;
}

.pie-select {
  position: absolute;
  left: 0;
  top: 25px;
  z-index: 100;
}

.charts-pie {
  flex: 1;
  height: 355px;
  margin-top: 70px;
}

.charts-pie3 {
  flex: 1;
  width: 48%;
  height: 355px;
  margin-top: 70px;
  min-width: calc((100% - 10px) / 2);
}

.op .el-select .el-input {
  width: 266px
}

.charts-piefor {
  display: flex;
  height: 800px;
  margin-top: 50px;
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

.topsel {
  display: flex;
  margin-left: 5px;
}

.lay {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: flex-start;
}

.subMit {
  margin-top: 25px;
}
</style>
