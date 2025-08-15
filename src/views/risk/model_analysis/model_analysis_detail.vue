<template>
  <div class="page_content">
    <el-form
      class="table_content"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="130px"
      disabled>
      <el-row>
        <el-col :span="4" v-if="scoreFlag">
          <el-form-item label="最大值 " prop="max_value" label-width="100px">
            <el-input class="input_el" v-model="ruleForm.max_value"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" v-if="scoreFlag">
          <el-form-item label="最小值 " prop="min_value" label-width="100px">
            <el-input class="input_el" v-model="ruleForm.min_value"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" v-if="scoreFlag">
          <el-form-item label="平均值" prop="avg_value" label-width="100px">
            <el-input class="input_el" v-model="ruleForm.avg_value"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
            <el-row>
        <el-col :span="4" v-if="ruleFlag">
          <el-form-item label="命中次数 " prop="hit_count" label-width="100px">
            <el-input class="input_el" v-model="ruleForm.hit_count"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4"  v-if="ruleFlag">
          <el-form-item label="未命中次数 " prop="nothit_count" label-width="100px">
            <el-input class="input_el" v-model="ruleForm.nothit_count"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4"  v-if="ruleFlag">
          <el-form-item label="命中率(%)" prop="hit_rate" label-width="100px">
            <el-input class="input_el" v-model="ruleForm.hit_rate"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="mode1">
      <div class="flex-row-center" v-if="scoreFlag">
        <div id="echarts_main_1" style="width: 50%; height: 300px"></div>
      </div>
      <div class="flex-row-center" v-if="groupFlag">
        <div id="echarts_main_2" style="width: 50%; height: 300px"></div>
      </div>
      <div class="flex-row-center" v-if="treeFlag">
        <div id="echarts_main_3" style="width: 50%; height: 300px"></div>
      </div>
      <div class="flex-row-center" v-if="ruleFlag">
        <div id="echarts_main_4" style="width: 50%; height: 300px"></div>
      </div>
    </div>
  </div>
</template>
<script>
import totalExecTypeDictdata from "@/views/risk/dictdata/totalExecType"; //总分计算方式字典
import * as echarts from "echarts";
import MyAxios from "pte-ui/utils/MyAxios";
export default {
  props: {
    cMeta: Object, //本页面模板json数据Layout对象
    cParentMeta: Object, //父页面模板json数据Layout对象
    cParentParams: Object, //父页面自定义参数与内置参数
    cParentScope: Object, //父页面每块区域业务数据
  },
  data() {
    return {
      tableData: [], //表格的数据
      tableData1: [], //表格的数据
      list: {},
      scoreFlag: false,
      ruleFlag: false,
      groupFlag: false,
      treeFlag: false,
      flowFlag: false,
      transaction_start_time:"",
      transaction_end_time:"",
      total: ["合计", "", ""],
      cParams: this.cParentParams, //父页面的数据
      totalExecTypeList: [],
      modelTypeList: [],
      ruleForm: {
        max_value: "", //最大值
        min_value: "", //最小值
        avg_value: "", //平均值
        hit_count: "",
        nothit_count: "",
        hit_rate: "",
      },
      tableParams: [],
      model_type: "",//类型
      obj3: {},
      obj4: {},
      response_text: "", //计数
    };
  },

  created() {
    console.log('model analysis detail');
    console.log('cParentParams', this.cParentParams);
    this.getDictList("DECI_E_MODE_TYPE", "modelTypeList");
  },
  mounted() {
    this.totalExecTypeList = totalExecTypeDictdata.data;
    console.log("-1-1-11-1-",this.cParams);
    if(this.cParams.call_count>10000){
        this.$confirm("数据大于10000条", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "",
                        type: "warning"
                    }).then(() => {
                        this.$dialog.close();
                    }).catch(()=>{
                        this.$dialog.close();
                    })
                    return;
    }else{
      this.usechange(this.cParams.parentModelType, this.cParams.model_type);
    }
  },
  methods: {
    //加载状态
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType],
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getDate(name, datalist, obj3) {
      console.log("step", this.obj3)
      var chartDom = document.getElementById(name);
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: '各分段区间数',
          subtext: 'Living Expenses in Shenzhen'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: datalist,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '个数',
            type: 'bar',
            barWidth: '60%',
            data: [obj3[0], obj3[1], obj3[2], obj3[3], obj3[4], obj3[5], obj3[6], obj3[7], obj3[8], obj3[9]]
          }
        ]
      };

      option && myChart.setOption(option);
    },
    /*
    规则组模型分析
    */
    getDate1(name, list = []) {
      var chartDom = document.getElementById(name);
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "命中次数",
          //  subtext: "Fake Data",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "命中次数",
            type: "pie",
            radius: "50%",
            data: list,
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

      option && myChart.setOption(option);
    },
    /*
    规则树模型分析
    */
    getDate2(name, list = []) {
      var chartDom = document.getElementById(name);
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "叶子节点命中次数",
          //  subtext: "Fake Data",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "命中次数",
            type: "pie",
            radius: "50%",
            data: list,
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

      option && myChart.setOption(option);
    },
    //普通规则查询
    getDate4(name, xData, seriesData) {
      var chartDom = document.getElementById(name);
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: '规则'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {},
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xData
        },
        yAxis: {
          max:100,
          name:'%',
          type: 'value'
        },
        series: [
          {
            type: 'line',
            data: seriesData
          }
        ]
      };

      option && myChart.setOption(option);
    },
    /**
     * 获取模型数据
     * @parentModelType 父级模型类型，如果为空的情况默认处理为当前模型类型
     * @modelType 当前模型类型
     */
    usechange(parentModelType, modelType) {
      if (parentModelType == undefined 
        || parentModelType == null 
        || parentModelType == '') {
        parentModelType = modelType;
      }

      console.log('usechange parentModelType', parentModelType);
      console.log('usechange modelType', modelType);
      if (modelType === "PF" || modelType === "PC") {
        this.scoreFlag = true;
        this.initSocreCode(parentModelType, modelType);
      } else if (modelType === "PZ") {
        this.groupFlag = true;
        this.initGroupCode(parentModelType, modelType);
      } else if (modelType === "GS") {
        this.treeFlag = true;
        this.initTreeCode(parentModelType, modelType);
      } else if (modelType === "PT") {
        this.ruleFlag = true;
        this.initRuleCode(parentModelType, modelType);
      } else {
        console.error(`不存在模型${modelType}！`);
        this.$message.error(`不存在模型${modelType}！`);
      }
    },
    // 获取评分卡信息
    initSocreCode(parentModelType, modelType) {
      let params1 = this.formatRequestFormAdpter(parentModelType, this.cParams);
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params1)
        .then((obj) => {
          let responseData = this.formatResponseFormAdpter(parentModelType, obj)
          let that = this;
            var value ;
         this.obj3 = JSON.parse(responseData.response_text);
         this.ruleForm.max_value = responseData.max_value;
         this.ruleForm.min_value = responseData.min_value;
         this.ruleForm.avg_value = responseData.avg_value;
         let s = 1;
          // this.$dialog.close();
          // this.fetch(true)
          //this.$dataBus.doCallBack(this, params);
                  value = Number(this.ruleForm.max_value )- Number(this.ruleForm.min_value);

          if(Number(this.ruleForm.max_value )==Number(this.ruleForm.min_value)){
              //debugger
          let datalist2 = [];
          let i 
          for (i = 0; i<1; i++){
          let s =  this.ruleForm.min_value;
          let s1 = this.ruleForm.min_value;
          let obj2 =  s + "~" + s1;
          datalist2.push(obj2);
          }
          this.getDate("echarts_main_1", datalist2, this.obj3);
          }else {
            //debugger
          let datalist2 = [];
          let i 
          for (i = 0; i<10; i++){
          let s = (value * i) / 10 + Number(this.ruleForm.min_value)
          let s1 = (value * (i+1)) / 10 + Number(this.ruleForm.min_value)
          let obj2 =  s + "~" + s1;
          datalist2.push(obj2);
          }
          this.getDate("echarts_main_1", datalist2, this.obj3);
          }
        })
        .catch((res) => {
          console.error('获取模型数据错误！', res);
          this.$message.error("获取模型数据错误！");
        });
    },
    // 获取普通规则信息
    initRuleCode(parentModelType, modelType) {
      let params = this.formatRequestFormAdpter(parentModelType, this.cParams);
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then((obj) => {
          let responseData = this.formatResponseFormAdpter(parentModelType, obj)
          let that = this;
           this.obj3 = JSON.parse(responseData.response_text);
           this.ruleForm.hit_count = responseData.hit_count
           this.ruleForm.nothit_count =responseData.nothit_count
           this.ruleForm.hit_rate =responseData.hit_rate
           console.log("step"+this.obj3)

          let echartData = JSON.parse(responseData.response_text); 
          let xData = [];
          let seriesData = []; 
          Object.keys(echartData).forEach(key => {
            xData.push(key);
            seriesData.push(echartData[key]);
          })
          console.log('xData', xData);
          console.log('seriesData', seriesData);
          // let datalist = [];
          let datalist = [];
          this.getDate4("echarts_main_4", xData, seriesData);
          // this.$dialog.close();
          // this.fetch(true)
          //this.$dataBus.doCallBack(this, params);
        })
        .catch((res) => {
          console.error('获取模型数据错误！', res);
          this.$message.error("获取模型数据错误！");
        });
    },
    // 规则组模型分析
    initGroupCode(parentModelType, modelType) {
      let params = this.formatRequestFormAdpter(parentModelType, this.cParams);
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then((obj) => {
          let responseData = this.formatResponseFormAdpter(parentModelType, obj)
          let that = this;
          var obj1 = JSON.parse(responseData.response_text);
          let datalist = [];
          obj1.forEach((res) => {
            var input_value = res.input_value;
            var system_name = res.system_name;
            let obj2 = { value: Number(input_value), name: system_name };
            datalist.push(obj2);
          });

          that.tableData = obj1;

          this.getDate1("echarts_main_2", datalist);
        })
        .catch((res) => {
          console.error('获取模型数据错误！', res);
          this.$message.error("获取模型数据错误！");
        });
    },
    // 规则树模型分析
    initTreeCode(parentModelType, modelType) {
      let params = this.formatRequestFormAdpter(parentModelType, this.cParams);
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then((obj) => {
          let responseData = this.formatResponseFormAdpter(parentModelType, obj)
          let that = this;
          var obj1 = JSON.parse(responseData.response_text);
          let datalist = [];
          obj1.forEach((res) => {
            var input_value = res.input_value;
            var system_name = res.system_name;
            let obj2 = { value: Number(input_value), name: system_name };
            datalist.push(obj2);
          });

          that.tableData = obj1;

          this.getDate2("echarts_main_3", datalist);
        })
        .catch((res) => {
          console.error('获取模型数据错误！', res);
          this.$message.error("获取模型数据错误！");
        });
    },
    /**
     * 请求参数适配器
     */
    formatRequestFormAdpter(modelType, requestParam) {
      let param = {};
      if (modelType === "PF" || modelType === "PC") {
        param = {
          branch_id: requestParam.branch_id,
          system_number_identification: requestParam.system_number_identification,
          score_model_code: requestParam.score_model_code,
          model_name: requestParam.model_name,
          model_type: requestParam.model_type,
          transaction_start_time: requestParam.transaction_start_time,
          transaction_end_time: requestParam.transaction_end_time,
          servicecode: "deci060121",
        }
      } else if (modelType === "PZ") {
        param = {
          branch_id: requestParam.branch_id,
          system_number_identification: requestParam.system_number_identification,
          group_code: requestParam.score_model_code,
          hit_flag: "hit",
          transaction_start_time: requestParam.transaction_start_time,
          transaction_end_time: requestParam.transaction_end_time,
          servicecode: "deci060122",
        };
      } else if (modelType === "GS") {
        param = {
          branch_id: requestParam.branch_id,
          system_number_identification: requestParam.system_number_identification,
          tree_id: requestParam.score_model_code,
          hit_flag: "hit",
          node_type: "2",
          transaction_start_time: requestParam.transaction_start_time,
          transaction_end_time: requestParam.transaction_end_time,
          servicecode: "deci060123",
        };
      } else if (modelType === "PT") {
        param = {
          branch_id: requestParam.branch_id,
          system_number_identification: requestParam.system_number_identification,
          rule_code: requestParam.score_model_code,
          update_time: requestParam.update_time,
          transaction_start_time: requestParam.transaction_start_time,
          transaction_end_time: requestParam.transaction_end_time,
          servicecode: "deci060124",
        };
      } else if (modelType === "GL") {
        requestParam.servicecode = "deci060131";
        param = requestParam;
      } else {
        throw new Error(`不存在模型${modelType}！`);
        this.$message.error(`不存在模型${modelType}！`);
      }
      return param;
    },
    /**
     * 响应参数适配器
     */
    formatResponseFormAdpter(modelType, responseParam) {
      let data = {};
      if (modelType === "PF" || modelType === "PC") {
        data = responseParam.data.info;
      } else if (modelType === "PZ") {
        data = responseParam.data;
      } else if (modelType === "GS") {
        data = responseParam.data;
      } else if (modelType === "PT") {
        data = responseParam.data.info;
      } else if (modelType === "GL") {
        data = responseParam.data.field_map;
      } else {
        throw new Error(`不存在模型${modelType}！`);
        this.$message.error(`不存在模型${modelType}！`);
      }
      console.log('formatResponseFormAdpter modelType', modelType);
      console.log('formatResponseFormAdpter data', data);
      return data;
    }
  },
};
</script>

<style lang="css" scoped>
.tableContent {
  width: 100%;
  text-align: center;
}

.flex-row-center {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
