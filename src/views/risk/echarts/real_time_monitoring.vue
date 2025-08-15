<template>
  <div class="page_content">
    <el-form
      class="table_content"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
    >
      <el-row>
            <el-col :span="6">
          <el-form-item label="服务机构" prop="branch_id">
            <el-select v-model="ruleForm.branch_id" filterable>
              <el-option
                v-for="(item, i) in branchList"
                :key="i"
                :label="item.branch_name"
                :value="item.branch_id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

            <el-col :span="6">
          <el-form-item label="服务系统" prop="system_number_identification">
            <el-select v-model="ruleForm.system_number_identification" filterable>
              <el-option
                v-for="(item, i) in systemList"
                :key="i"
                :label="item.systemName"
                :value="item.systemId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="模型代码"
            prop="score_model_code"
        
          >
            <el-input
              class="input_el"
              v-model="ruleForm.score_model_code"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="模型名称 "
            prop="model_name"
          
          >
          <el-input
              class="input_el"
              v-model="ruleForm.model_name"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            label="模型类型 "
            prop="model_type"
           
          >
            <el-select
              v-model="ruleForm.model_type"
              placeholder="请选择规则类型"
            >
              <el-option
                v-for="item in modelTypeList"
                :key="item.dictId"
                :label="item.dictName"
                :value="item.dictId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
         
                <el-button class="btn" type="primary" @click="search">查询</el-button>
                <el-button class="btn" @click="reset">重置</el-button>
    
        </el-col>

      </el-row>
    </el-form>
   
    <div class="mode1">
      <div class="flex-row-center">
        <div id="echarts_main_1" style="width: 50%; height: 300px"></div>
        <div id="echarts_main_2" style="width: 50%; height: 300px"></div>
      </div>
      <div class="flex-row-center">
        <div id="echarts_main_3" style="width: 50%; height: 300px"></div>
        <div style="width: 50%; height: 300px">
          <button type="primary" @click="normal(1)">正常</button>
          <button @click="normal(2)">异常</button>
          <div id="echarts_main_4" style="width: 100%; height: 300px"></div>
        </div>
      </div>
    </div>

    <div class="container-centent--table">
                <el-table ref="multipleTable" :data="tableData1" :border="true" style="width: 98%;">
                    <el-table-column label="所属机构"  prop="branch_id" :formatter="branchChange"  align="center" show-overflow-tooltip> </el-table-column>
                    <el-table-column label="所属系统"  prop="system_number_identification"  align="center" :formatter="systemFormat" show-overflow-tooltip> </el-table-column>
                    <el-table-column label="模型类型" prop="model_type" :formatter="formatProduceData"  align="center" show-overflow-tooltip> </el-table-column>
                    <el-table-column label="模型代码"  prop="score_model_code" align="center" show-overflow-tooltip> </el-table-column>
                    <el-table-column label="模型名称" prop="model_name"   align="center" show-overflow-tooltip> </el-table-column>
                    <el-table-column label="申请时间" prop="data_create_time"   align="center" show-overflow-tooltip> </el-table-column>
                </el-table>
            </div>
            <div class="container-content--pagination">
     <el-pagination v-if="tableData.length>0"
    @size-change="sizeChange"
    @current-change="currentChange"
    :current-page="currentPage"
    :page-sizes="[10]"
    :page-size="tableSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="tableTotal">
    </el-pagination>
            </div>

    <!-- <el-table
      ref="tableData"
      highlight-current-row
      :data="tableData1"
      border
      style="width: 100%"
      show-summary
      :summary-method="getSummaries"
    >
      <el-table-column prop="scoreModelAttribute" label="评分属性">
      </el-table-column>
      <el-table-column prop="scoreModelName" label="属性名称">
      </el-table-column>
      <el-table-column prop="scoreAttributePercent" label="权重">
      </el-table-column>
      <el-table-column prop="scorePoints" label="评分分值"> </el-table-column>
    </el-table> -->
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
      total: ["合计", "", ""],
      cParams: this.cParentParams, //父页面的数据
      totalExecTypeList: [],
      modelTypeList: [],
      branchList: [],
      systemList: [],
      ruleForm: {
        branch_id: "", 
        system_number_identification: "", 
        score_model_code: "", 
        model_name: "", 
        model_type: "", 
      },
      tableParams: [],
      obj3: {},
      obj4: {},
      response_text: "", //计数
      intervalid:null,//定时器
    };
  },

  created() {
    // this.init();
    this.getDictList("RISK_BATCH_TEST_TYPE","modelTypeList");
    //this.getDictList("DECI_E_BRANCH_MARK","statusList");
    this.getBranchList();
    this.getSystemList();
  },
  mounted() {
    this.totalExecTypeList = totalExecTypeDictdata.data;
    // this.initSocreCode();
    // this.initSocreCode1();
    // this.initSocreCode2();
    // this.initSocreCode3();
     this.search();
    this.dataRefrsh();
  },
  deactivated(){
    console.log("销1毁","des")
    this.clear()
  },
  unmounted(){
       console.log("销2毁")
    this.clear();
  },
  updated() {
    this.$nextTick(() => {
      this.$refs["tableData"].doLayout();
    });
  },
  methods: {

       systemFormat(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.systemList.forEach(function(item,index){
                if(data == item.systemId){
                    name = item.systemName;
                }
            })
            return name;
    },
        /**
     * 获取机构列表
     */
    getBranchList() {
      let params = {
        servicecode: "ct2155",
        branch_id: JSON.parse(localStorage.user_info).branch_id,
        start:1,
        length:10000
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this.branchList = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
            /**
     * 获取系统列表
     */
    getSystemList() {
      let params = {
        servicecode: "deci090101",
        start:1,
        length:1000
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this.systemList = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
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
        /**
     * 转化枚举类型
     */
    formatProduceData(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.modelTypeList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
            /**
     * 转化枚举类型
     */
    branchChange(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.branchList.forEach(function(item,index){
                if(data == item.branch_id){
                    name = item.branch_name;
                }
            })
            return name;
    },
    getDate(name) {
      var chartDom = document.getElementById(name);
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "模型分类统计",
          //  subtext: "Fake Data",
          left: "center",
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            type: "pie",
            radius: "50%",
            data: [
              { value: this.tableData.PF, name: "简单评分卡" },
              { value: this.tableData.PC, name: "复杂评分卡" },
              { value: this.tableData.PT, name: "规则" },
              { value: this.tableData.PZ, name: "规则组" },
              { value: this.tableData.GS, name: "规则树" },
              { value: this.tableData.GL, name: "规则流" },
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

      option && myChart.setOption(option);
    },
    getDate1(name, list = []) {
      var chartDom = document.getElementById(name);
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "服务系统统计",
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
            name: "服务系统统计",
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
    //调用此时查询
    getDate3(name, datalist, datalist1) {
      var chartDom = document.getElementById(name);
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        title: {
          text: "调用次数排名",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: "category",
          data: datalist1,
        },
        series: [
          {
            type: "bar",
            data: datalist,
          },
        ],
      };

      option && myChart.setOption(option);
    },
    //调用此时查询
    getDate4(name, obj3) {
      var chartDom = document.getElementById(name);
      var myChart = echarts.init(chartDom);
      var option;

      option = {
        legend: {
          data: ["异常"],
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        toolbox: {
          show: true,
          feature: {
            //saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            obj3[6].date,
            obj3[5].date,
            obj3[4].date,
            obj3[3].date,
            obj3[2].date,
            obj3[1].date,
            obj3[0].date,
          ],
        },
        yAxis: {
          type: "value",
        },
        series: [
          // {
          //   name: '正常',
          //   data: [obj1[6].input_value, obj1[5].input_value, obj1[4].input_value, obj1[3].input_value, obj1[2].input_value, obj1[1].input_value, obj1[0].input_value],
          //   type: 'line',
          //   stack: 'Total',
          //   areaStyle: {}
          // },
          {
            name: "数量",
            data: [
              obj3[6].input_value,
              obj3[5].input_value,
              obj3[4].input_value,
              obj3[3].input_value,
              obj3[2].input_value,
              obj3[1].input_value,
              obj3[0].input_value,
            ],
            type: "line",
            stack: "Total",
            areaStyle: {},
          },
        ],
      };

      option && myChart.setOption(option);
    },

    // init() {
    //   let that = this;
    //   console.log("获取父页面传过来的数据", this.cParams);
    //   this.ruleForm.trxnSeq = this.cParams.trxn_seq; //评分卡ID
    //   this.ruleForm.scoreCardCode = this.cParams.score_card_code; //评分卡代码
    //   this.ruleForm.scoreCardName = this.cParams.score_card_name; //评分卡名称
    //   this.ruleForm.scoreResult = this.cParams.score_result; //结果
    //   this.ruleForm.totalExecType = this.cParams.total_exec_type; //总分计算方式
    //   //将结果的string转对象，
    //   let result = JSON.parse(this.ruleForm.scoreResult);

    //   that.total.push(result.total);
    //   console.log("json转成类的结果", result);

    //   let responseData = result.detail;
    //   console.log("responseData", responseData);
    //   let tableData = [];
    //   //遍历后台返回的结果对象

    //   // for (let key in responseData) {
    //   //   if (responseData.hasOwnProperty(key)) {
    //   //     if (key === "total") {
    //   //       that.total = responseData[key];
    //   //     } else {
    //   //       tableData.push(responseData[key]);
    //   //     }
    //   //   }
    //   // }

    //   console.log("table显示数据", tableData); // foo
    //   this.tableData = responseData;
    // },
    search() {
      let params = {
        branch_id: this.ruleForm.branch_id,
        system_number_identification: this.ruleForm.system_number_identification,
        score_model_code: this.ruleForm.score_model_code,
        model_name: this.ruleForm.model_name,
        model_type: this.ruleForm.model_type,
        servicecode: "deci060118",
        start: this.currentPage,
        length: this.tableSize,
      };
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then((obj) => {
          this.tableData1 = obj.data;
        this.tableTotal = obj.pageParam ? obj.pageParam.total : 0;
    this.initSocreCode();
    this.initSocreCode1();
    this.initSocreCode2();
    this.initSocreCode3();
          // this.$dialog.close();
          // this.fetch(true)
          //this.$dataBus.doCallBack(this, params);
        })
        .catch((res) => {
        });
    },
    //数据刷新
    dataRefrsh(){
       if(this.intervalid!=null){
          return;
       }
       this.intervalid = setInterval(() => {
         console.log("刷新"+new Date());
         this.dataRefrsh();
         this.search();
       },1000*60);
    },
    //清除定时器
    clear(){
      clearInterval(this.intervalid);
      this.intervalid = null
    },
    //获取模型分析（通过系统名称）
    /*
    重置按钮
    */ 
    reset(){
      this.ruleForm.branch_id = "";
      this.ruleForm.system_number_identification = "";
      this.ruleForm.score_model_code = "";
      this.ruleForm.model_name = "";
      this.ruleForm.model_type = "";
    },

    initSocreCode1() {
      let params = {
        branch_id: this.ruleForm.branch_id,
        system_number_identification: this.ruleForm.system_number_identification,
        score_model_code: this.ruleForm.score_model_code,
        model_name: this.ruleForm.model_name,
        model_type: this.ruleForm.model_type,
        servicecode: "deci060115",
      };
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then((obj) => {
          let that = this;
          var obj1 = JSON.parse(obj.data.response_text);
          let datalist = [];
          obj1.forEach((res) => {
            var input_value = res.input_value;
            var system_name = res.system_name;
            let obj2 = { value: Number(input_value), name: system_name };
            datalist.push(obj2);
          });

          that.tableData = obj1;

          this.getDate1("echarts_main_2", datalist);

          // this.$dialog.close();
          // this.fetch(true)
          //this.$dataBus.doCallBack(this, params);
        })
        .catch((res) => {

        });
    },
    //获取模型分析（调用次数统计）
    initSocreCode2() {
      let params = {
        branch_id: this.ruleForm.branch_id,
        system_number_identification: this.ruleForm.system_number_identification,
        score_model_code: this.ruleForm.score_model_code,
        model_name: this.ruleForm.model_name,
        model_type: this.ruleForm.model_type,
        servicecode: "deci060116",
      };
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then((obj) => {
          let that = this;
          var obj1 = JSON.parse(obj.data.response_text);
        console.log("obj1数据"+obj1)
          let datalist = [];
          let datalist1 = [];
          obj1.forEach((res) => {
            var input_value = res.input_value;
            var name1 = res.system_name + res.name;

            // let ob1 = { value: Number(input_value), name: system_name };

            // let ob2 = { value: Number(input_value), name: system_name };
            datalist.push(input_value);
            datalist1.push(name1);
          });


          that.tableData = obj1;
          console.log("+++++++++++++" + obj1);
           this.getDate3("echarts_main_3", datalist, datalist1);
          // this.$dialog.close();
          // this.fetch(true)
          //this.$dataBus.doCallBack(this, params);
        })
        .catch((res) => {
        });
    },
    normal(type) {
      if (type === 1) {
        this.getDate4("echarts_main_4", this.obj4);
      } else {
        this.getDate4("echarts_main_4", this.obj3);
      }
    },
    //获取模型分析（调用次数统计异常或是正常）
    initSocreCode3() {
      let params1 = {
        branch_id: this.ruleForm.branch_id,
        system_number_identification: this.ruleForm.system_number_identification,
        score_model_code: this.ruleForm.score_model_code,
        model_name: this.ruleForm.model_name,
        model_type: this.ruleForm.model_type,
        status: "0",
        servicecode: "deci060117",
      };
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params1)
        .then((obj) => {
          let that = this;
          that.obj3 = JSON.parse(obj.data.response_text);
          // this.$dialog.close();
          // this.fetch(true)
          //this.$dataBus.doCallBack(this, params);
        })
        .catch((res) => {
        });
      let params = {
        branch_id: this.ruleForm.branch_id,
        system_number_identification: this.ruleForm.system_number_identification,
        score_model_code: this.ruleForm.score_model_code,
        model_name: this.ruleForm.model_name,
        model_type: this.ruleForm.model_type,
        status: "1",
        servicecode: "deci060117",
      };
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then((obj) => {
          let that = this;
          this.obj4 = JSON.parse(obj.data.response_text);
          console.log("1234568" + this.obj3);
          this.getDate4("echarts_main_4", this.obj4);
          // this.$dialog.close();
          // this.fetch(true)
          //this.$dataBus.doCallBack(this, params);
        })
        .catch((res) => {
        });
    },

    //获取评分卡信息
    initSocreCode() {
      console.log("123456"+ echarts.version)
      let params = {
        branch_id: this.ruleForm.branch_id,
        system_number_identification: this.ruleForm.system_number_identification,
        score_model_code: this.ruleForm.score_model_code,
        model_name: this.ruleForm.model_name,
        model_type: this.ruleForm.model_type,
        servicecode: "deci060114",
      };
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then((obj) => {
          let that = this;
          var obj1 = JSON.parse(obj.data.response_text);
          that.tableData = obj1;
          console.log("第一个"+that.tableData)
          this.getDate("echarts_main_1");
          // this.$dialog.close();
          // this.fetch(true)
          //this.$dataBus.doCallBack(this, params);
        })
        .catch((res) => {
        });
    },
        /**
        * 分页sizeChange 回调
        */
        sizeChange(val) {
            this.tableSize = val;
            this.search();
        },
        /**
        * 分页currentChange回调
        */
        currentChange(val) {
            this.currentPage = val;
            this.search();
        },
    getSummaries() {
      let that = this;
      console.log("total===", that.total);
      return that.total;
    },
  },
};
</script>

<style lang="css" scoped>
.tableContent {
  width: 100%;
  text-align: center;
}
.btn{
  margin-top:4px;
  margin-left:38px
}
.flex-row-center {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
