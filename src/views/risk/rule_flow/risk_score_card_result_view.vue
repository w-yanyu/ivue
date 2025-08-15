<template>
  <div class="page_content">
    <el-form class="table_content" ref="ruleForm" :model="ruleForm" :rules="rules" label-width="130px">
      <el-row>
        <el-col :span="6">
          <el-form-item label="流水号 " prop="trxnSeq" label-width="100px">
            <el-input class="input_el" v-model="ruleForm.trxnSeq" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="评分卡代码 " prop="scoreCardCode" label-width="100px">
            <el-input class="input_el" v-model="ruleForm.scoreCardCode" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="评分卡名称 " prop="scoreCardName" label-width="100px">
            <el-input class="input_el" v-model="ruleForm.scoreCardName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="总分计算方式 " prop="totalExecType" label-width="100px">
            <el-select v-model="ruleForm.totalExecType" placeholder="请选择规则类型" disabled>
              <el-option v-for="item in totalExecTypeList" :key="item.dictId" :label="item.dictName" :value="item.dictId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>


    <el-table ref="tableData" highlight-current-row :data="tableData" border style="width: 100%" show-summary
      :summary-method="getSummaries">
      <el-table-column prop="scoreModelAttribute" label="评分属性">
      </el-table-column>
      <el-table-column prop="scoreModelName" label="属性名称">
      </el-table-column>
      <el-table-column prop="scoreAttributePercent" label="权重">
      </el-table-column>
      <el-table-column prop="scorePoints" label="评分分值">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import totalExecTypeDictdata from "@/views/risk/dictdata/totalExecType"; //总分计算方式字典
  export default {
    props: {
      cMeta: Object, //本页面模板json数据Layout对象
      cParentMeta: Object, //父页面模板json数据Layout对象
      cParentParams: Object, //父页面自定义参数与内置参数
      cParentScope: Object //父页面每块区域业务数据
    },
    data() {
      return {
        tableData: [], //表格的数据
        total: ['合计', '', ''],
        cParams: this.cParentParams, //父页面的数据
        totalExecTypeList:[],
        ruleForm: {
          trxnSeq: "", //流水号
          scoreCardCode: "", //评分卡代码
          scoreCardName: "", //评分卡名称
          scoreResult: "", //结果
          totalExecType:'',//总分计算方式
        },
      };
    },
    created() {
      this.init();
    },
    mounted() {
      this.totalExecTypeList = totalExecTypeDictdata.data;
    },
    updated() {
      this.$nextTick(() => {
        this.$refs['tableData'].doLayout();
      })
    },
    methods: {
      init() {
        let that = this;
        console.log("获取父页面传过来的数据", this.cParams);
        this.ruleForm.trxnSeq = this.cParams.trxn_seq; //评分卡ID
        this.ruleForm.scoreCardCode = this.cParams.score_card_code; //评分卡代码
        this.ruleForm.scoreCardName = this.cParams.score_card_name; //评分卡名称
        this.ruleForm.scoreResult = this.cParams.score_result; //结果
        this.ruleForm.totalExecType = this.cParams.total_exec_type;//总分计算方式
        //将结果的string转对象，
        let result = JSON.parse(this.ruleForm.scoreResult);

        that.total.push(result.total);
        console.log("json转成类的结果", result);

        let responseData = result.detail;
        console.log('responseData', responseData);
        let tableData = [];
        //遍历后台返回的结果对象

        // for (let key in responseData) {
        //   if (responseData.hasOwnProperty(key)) {
        //     if (key === "total") {
        //       that.total = responseData[key];
        //     } else {
        //       tableData.push(responseData[key]);
        //     }
        //   }
        // }


        console.log("table显示数据", tableData) // foo
        this.tableData = responseData;
      },
      getSummaries() {
        let that = this;
        console.log('total===', that.total);
        return that.total
      },
    }
  };
</script>

<style lang="css" scoped>
  .tableContent {
    width: 100%;
    text-align: center;
  }
</style>
