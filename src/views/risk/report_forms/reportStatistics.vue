<template>
  <div class="page_content">
    <el-form
      class="table_content"
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="130px">
      <el-row type="flex" justify="space-around">
        <el-col :span="5">
          <el-form-item label="服务机构" prop="branch_id">
            <el-select v-model="ruleForm.branch_id" filterable @change="changeStatusValue">
              <el-option
                v-for="item in branchList"
                :key="item.dictId"
                :label="item.branch_name"
                :value="item.branch_id"
              />
            </el-select>
          </el-form-item>
        </el-col>
            <el-col :span="5">
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
        <el-col :span="5">
          <el-form-item
            label="模型代码"
            prop="score_model_code"
          >
            <el-input class="input_el" v-model="ruleForm.score_model_code">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="模型名称 " prop="model_name">
            <el-input class="input_el" v-model="ruleForm.model_name">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :span="5">
          <el-form-item label="模型类型" prop="model_type">
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
        <el-col :span="5">
          <el-form-item label="开始日期"  prop="startDate">
            <el-col :span="24">
              <el-form-item prop="date1">
                <el-date-picker
                @click.native="rest1"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyyMMdd"
                  placeholder="选择日期"
                  v-model="ruleForm.startDate"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="结束日期" prop="endDate">
            <el-col :span="24">
              <el-form-item prop="date1">
                <el-date-picker
                  @click.native="rest2"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyyMMdd"
                  placeholder="选择日期"
                  v-model="ruleForm.endDate"
                  style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <div
            style="
              width: 100%;
              display: flex;
              flex-direction: row;
              justify-content: flex-end;
              align-items: center;
            "
          >
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          
             <!-- <to-json v-else  toUrl="/components/BpmnFlow/rule_flow_view.json"
                    :params="cParentParams"></to-json> -->
                  
            <el-button  v-if="currentTemplateId == 1" @click="exportPfOrPcFile">导出</el-button>
            <el-button  v-if="currentTemplateId == 2" @click="exportPtFile">导出</el-button>
            <el-button  v-if="currentTemplateId == 3" @click="exportGsFile">导出</el-button>
            <el-button  v-if="currentTemplateId == 4" @click="exportGlFile">导出</el-button>
            <el-button  v-if="currentTemplateId == 5" @click="exportPzFile">导出</el-button>
             <el-button  v-if="currentTemplateId != 1 &&currentTemplateId != 2 &&currentTemplateId != 3 &&currentTemplateId != 4 &&currentTemplateId != 5 " @click="exportPzFile">导出</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>

    <div style="box-sizing: border-box; padding: 0 12px 0 12px;"> 
      <reportTemplate 
        ref="reportTemplateRef"
        v-show="currentModelType != '' && currentModelType != 'GL'" 
        :scoreCardType="scoreCardType"
        :modelTypeListMap="modelTypeListMap"/>
      <reportTemplateFlow 
        ref="reportTemplateFlowRef"
        v-show="currentModelType != '' && currentModelType == 'GL'" 
        :scoreCardType="scoreCardType"
        :modelTypeListMap="modelTypeListMap"/>
    </div>
  </div>
</template>
<script>
import Tools from "pte-ui/utils/Tools";
import MyAxios from "pte-ui/utils/MyAxios";
import reportTemplate from "./components/reportTemplate.vue"
import reportTemplateFlow from "./components/reportTemplateFlow.vue"
export default {
  props: {
    cMeta: Object, //本页面模板json数据Layout对象
    cParentMeta: Object, //父页面模板json数据Layout对象
    cParentParams: Object, //父页面自定义参数与内置参数
    cParentScope: Object, //父页面每块区域业务数据
  },
  computed: {
    currentTemplateId() {
      // 当前显示模版ID
      if (this.modelTypeTemplateMap.has(this.currentModelType)) {
        return this.modelTypeTemplateMap.get(this.currentModelType)
          .templateId;
      } else {
        return 1;
      }
    }
  },
  components: {
    reportTemplate,
    reportTemplateFlow
  },
  data() {
    return {
      // 公共数据源
      modelTypeList: [], // 规则类型列表
      branchList: [], //机构信息
      modelTypeListMap: new Map([]), // 规则类型Map
      modelTypeTemplateMap: new Map([
        // 规则类型与显示模版的映射map
        ["PF", { templateId: 1 }], // 简单评分卡
        ["PC", { templateId: 1 }], // 复杂评分卡
        ["PT", { templateId: 2 }], // 普通规则
        ["PZ", { templateId: 5 }], // 普通规则组
        ["GS", { templateId: 3 }], // 规则树
        ["GL", { templateId: 4 }], // 规则流
      ]),
      statusList: [], // 状态类型列表
      scoreCardType:[],//评分卡类型
      rules: {
        branch_id: [
          {
            required: true,
            message: "请输入服务机构",
            trigger: "blur",
          },
        ],
        model_type: [
          {
            required: true,
            message: "请输入模型类型",
            trigger: "blur",
          },
        ],
            startDate: [
          {
            required: true,
            message: "请输入开始日期",
            trigger: "blur",
          },
        ],
            endDate: [
          {
            required: true,
            message: "请输入结束日期",
            trigger: "blur",
          },
        ],
         score_model_code: [
          {
            required: true,
            message: "请输入模型代码",
            trigger: "blur",
          },
        ],
         model_name: [
          {
            required: true,
            message: "请输入模型名称",
            trigger: "blur",
          },
        ],
          system_number_identification: [
          {
            required: true,
            message: "请输入服务系统",
            trigger: "blur",
          },
        ],
      },

      // 表单
      ruleForm: {
        branch_id: "", // 服务机构ID
        system_number_identification: "", // 服务系统
        score_model_code: "", // 模型代码
        model_name: "", // 模型名称
        model_type: "", // 模型类型ID
        startDate: "", // 开始时间
        endData: "", // 结束时间
      },
       systemList: [],
      timeDefault:"",//开始日期
      
      currentModelType: '' // 上一次表单的查询模型

    };
  },
  created() {
    this.getDictList("RISK_BATCH_TEST_TYPE", "modelTypeList", "modelTypeListMap");
    this.getDictList("DECI_E_BRANCH_MARK", "statusList");
     this.getDictList("DECI_E_SCORE_CARD_TYPE", "scoreCardType");
    //this.getbranch();
    this.getBranchList();
    this.getSystemList();
    this.date();
  },
  mounted(){
    this.timeDefault = new date();
    
  },
  methods: {
    /*
    *服务系统转换
    */ 
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
        /*
     * 获取机构信息
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
        length:10000
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
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey, dictMap = undefined) {
      let params = {
        dictType: dictType,
        dictKey: [dictType],
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this[listKey] = res.data;

            // 保存映射map
            if (dictMap != undefined) {
              const map = new Map([]);
              for (let i = 0; i < res.data.length; i++) {
                map.set(res.data[i].dictId, {
                  dictId: res.data[i].dictId,
                  dictName: res.data[i].dictName,
                });
              }
              this[dictMap] = map;
              console.log(map);
            }
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
                /**
     * 转化枚举类型
     */
    branchChange(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.statusList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    /**
     * 转化枚举类型
     */
    formatProduceData(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.modelTypeList.forEach(function (item, index) {
        if (data == item.dictId) {
          name = item.dictName;
        }
      });
      return name;
    },
    /**
     * 重置表单
     * @param formName
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    date(){
      //debugger
      var time = new Date();
      var day = ("0"+ time.getDate()).slice(-2);
      var month =  ("0"+(time.getMonth()+1)).slice(-2);
      var year =  time.getFullYear();
      //var today = year+"-"+month + "-" +day;
        var today = year+month + day;
      // this.ruleForm.endDate = today
      
      this.$set(this.ruleForm,'endDate',today)

      var beforedate = new Date(time);
       beforedate.setDate(time.getDate() - 30)
      var day1 = ("0"+ beforedate.getDate()).slice(-2);
      var month1 =  ("0"+(beforedate.getMonth()+1)).slice(-2);
      var year1 =  beforedate.getFullYear();
       var today1 = year1+month1 + day1;
      // var today1 = year1+"-"+month1 + "-" +day1;
      // this.ruleForm.startDate = today1
       this.$set(this.ruleForm,'startDate',today1)
      
    },
    rest1(){
    
      this.ruleForm.startDate = ""
    },

    rest2(){
        this.$set(this.ruleForm,'endDate',"")
    },
    /**
     * 查询
     */
    async search(ruleForm) {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          console.log(`search ${JSON.stringify(this.ruleForm)}`);
          const modelType = this.ruleForm.model_type;
          this.currentModelType = this.ruleForm.model_type;

          if (this.currentModelType == "GL") {
            this.$refs.reportTemplateFlowRef.init(modelType, this.ruleForm);
          } else {
            this.$refs.reportTemplateRef.init(modelType, this.ruleForm);
          }
        } else {
          console.log(error);
        }
      });
    },
    /**
     * 导出简单\复杂评分卡
     */
    exportPfOrPcFile() {
        this.$refs.ruleForm.validate(async (valid) => {
           if (valid) {
            let typeName;
      if(this.ruleForm.model_type == "PF"){
        typeName="简单评分卡";
      }else if(this.ruleForm.model_type == "PC"){
        typeName="复杂评分卡";
      }else{
        typeName=this.ruleForm.model_type;
      }
      let timeDiff = this.timeDifference(this.ruleForm.startDate,this.ruleForm.endDate);
      console.log("timeDiff",timeDiff);
        let params = {
          branch_id: this.ruleForm.branch_id,
          system_number_identification:
            this.ruleForm.system_number_identification,
          score_model_code: this.ruleForm.score_model_code,
          model_name: this.ruleForm.model_name,
          model_type: this.ruleForm.model_type,
          transaction_start_time: this.ruleForm.startDate,
          transaction_end_time: this.ruleForm.endDate,
          // 模型代码+模型名称+模型类型+开始时间-结束时间+报表
          exportname: this.ruleForm.score_model_code+this.ruleForm.model_name+typeName+this.ruleForm.startDate+"-"+this.ruleForm.endDate+"报表",
        start: 1,
        length: 10000,
          servicecode: "deci060125",
        };

        Tools.downLoadFile(
                "/SUMP/rest/file/exportStatistics",
                "post",
                params,
                null,
                (err) => {
                    this.$msg({
                        type: "error",
                        message: err,
                    });
                }
            );
           }

        });
      
    }, 
    //
     exportFile() {

    },
    //普通规则
     exportPtFile() {
         this.$refs.ruleForm.validate(async (valid) => {
           if (valid) {
               let timeDiff = this.timeDifference(this.ruleForm.startDate,this.ruleForm.endDate);
               let typeName;
                if(this.ruleForm.model_type == "PT"){
                    typeName="规则";
                }
          let params = {
                    branch_id: this.ruleForm.branch_id,
                    system_number_identification:
                      this.ruleForm.system_number_identification,
                    score_model_code: this.ruleForm.score_model_code,
                    rule_name: this.ruleForm.model_name,
                    model_type: this.ruleForm.model_type,
                    transaction_start_time: this.ruleForm.startDate,
                    transaction_end_time: this.ruleForm.endDate,
                    start: 1,
                   exportname: this.ruleForm.score_model_code+this.ruleForm.model_name+typeName+this.ruleForm.startDate+"-"+this.ruleForm.endDate+"报表",
                  length: 10000,
                    servicecode: "deci060126",
                  };
                 
        Tools.downLoadFile(
                "/SUMP/rest/file/exportPtStatistics",
                "post",
                params,
                null,
                (err) => {
                    this.$msg({
                        type: "error",
                        message: err,
                    });
                }
            ); 
           }
         });
 
    },
    //普通规则组
     exportPzFile() {
      this.$refs.ruleForm.validate(async (valid) => {
                if (valid) {
                    let timeDiff = this.timeDifference(this.ruleForm.startDate,this.ruleForm.endDate);
                    let typeName;
                      if(this.ruleForm.model_type == "PZ"){
                          typeName="规则组";
                      }
              let params = {
                branch_id: this.ruleForm.branch_id,
                system_number_identification:
                  this.ruleForm.system_number_identification,
                score_model_code: this.ruleForm.score_model_code,
                model_name: this.ruleForm.model_name,
                model_type: this.ruleForm.model_type,
                transaction_start_time: this.ruleForm.startDate,
                transaction_end_time: this.ruleForm.endDate,
                start: 1,
              length: 10000,
                exportname: this.ruleForm.score_model_code+this.ruleForm.model_name+typeName+this.ruleForm.startDate+"-"+this.ruleForm.endDate+"报表",
                servicecode: "deci060127",
              };
                      
              Tools.downLoadFile(
                      "/SUMP/rest/file/exportPzStatistics",
                      "post",
                      params,
                      null,
                      (err) => {
                          this.$msg({
                              type: "error",
                              message: err,
                          });
                      }
                  ); 
                }
         });
    },
    //规则树
     exportGsFile() {
this.$refs.ruleForm.validate(async (valid) => {
           if (valid) {
               let timeDiff = this.timeDifference(this.ruleForm.startDate,this.ruleForm.endDate);
               let typeName;
                if(this.ruleForm.model_type == "GS"){
                    typeName="规则树";
                }
         let params = {
          branch_id: this.ruleForm.branch_id,
          system_number_identification:
            this.ruleForm.system_number_identification,
          score_model_code: this.ruleForm.score_model_code,
          model_name: this.ruleForm.model_name,
          model_type: this.ruleForm.model_type,
          transaction_start_time: this.ruleForm.startDate,
          transaction_end_time: this.ruleForm.endDate,
        start:1,
        length: 10000,
          exportname: this.ruleForm.score_model_code+this.ruleForm.model_name+typeName+this.ruleForm.startDate+"-"+this.ruleForm.endDate+"报表",
          servicecode: "deci060128",
        };
                 
        Tools.downLoadFile(
                "/SUMP/rest/file/exportGsStatistics",
                "post",
                params,
                null,
                (err) => {
                    this.$msg({
                        type: "error",
                        message: err,
                    });
                }
            ); 
           }
         });
    },
    //规则流
     exportGlFile() {
       
this.$refs.ruleForm.validate(async (valid) => {
           if (valid) {
               let timeDiff = this.timeDifference(this.ruleForm.startDate,this.ruleForm.endDate);
               let typeName;
                if(this.ruleForm.model_type == "GL"){
                    typeName="规则流";
                }
         let params = {
          branch_id: this.ruleForm.branch_id,
          system_number_identification:
            this.ruleForm.system_number_identification,
          score_model_code: this.ruleForm.score_model_code,
          model_name: this.ruleForm.model_name,
          model_type: this.ruleForm.model_type,
          transaction_start_time: this.ruleForm.startDate,
          transaction_end_time: this.ruleForm.endDate,
        start:1,
        length: 10000,
          exportname: this.ruleForm.score_model_code+this.ruleForm.model_name+typeName+this.ruleForm.startDate+"-"+this.ruleForm.endDate+"报表",
          servicecode: "deci060132",
        };
                 
        Tools.downLoadFile(
                "/SUMP/rest/file/exportGlStatistics",
                "post",
                params,
                null,
                (err) => {
                    this.$msg({
                        type: "error",
                        message: err,
                    });
                }
            ); 
           }
         });
      
    },
        //时间差-秒
        timeDifference(start,end){
          let dateSpan,startD,endD;
          startD = start.substr(0,4)+"-"+start.substr(4,2)+"-"+start.substr(6,2) ;
          endD = end.substr(0,4)+"-"+end.substr(4,2)+"-"+end.substr(6,2);
          let startDate = Date.parse(startD);
          let  endData = Date.parse(endD);
            dateSpan = Math.abs(endData-startDate);
          return Math.floor(dateSpan/(24*3600*1000));
        }
      },
    };
</script>
<style lang="less" scoped>
.flex-row-center {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

/deep/ .el-table {
  margin: 0 !important;
}
/deep/ .el-table .cell {
  padding: 0 !important;
}
/deep/ .el-table .el-table__cell {
  padding: 0 !important;
}
</style>
