<template>
  <!-- 新增佣金方案 -->
  <div class="app-container">
    <el-form ref="fcCommission" label-width="150px" :model="fcCommission" :rules="rules" :disabled="isDisabled">
      <el-row :gutter="24">
        <el-col :span="18">
          <el-form-item :label="'佣金方案名称'" prop="commission_name">
            <el-input
              v-model="fcCommission.commission_name"
              type="text"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="18">
          <el-form-item :label="'生效时间'" prop="initDate">
            <el-date-picker
              v-model="fcCommission.initDate"
              style="width: 100%"
              type="daterange"
              value-format="yyyyMMdd"
              :range-separator="'至'"
              :start-placeholder="'开始日期'"
              :end-placeholder="'结束日期'"
              :picker-options="pickerOptions"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="24">
        <el-col :span="18">
          <el-form-item :label="'佣金计算方案'">
            <el-select
              v-model="fcCommission.calculation_type"
              clearable
              style="width: 100%"
              @change="clickCalcScheme(fcCommission.calculation_type)"
            >
              <el-option
                v-for="(item, index) in calculationTypeOption"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="fcCommission.calculation_type === 200" :gutter="24">
        <el-col :span="18">
          <el-form-item :label="'提成设置'">
            <el-switch v-model="switchSet" @change="drawSeting()" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="fcCommission.calculation_type === 100" :gutter="24">
        <el-col :span="18">
          <el-form-item :label="'服务费设置'">
            <el-switch v-model="switchSet" @change="drawSeting()" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="fcCommission.calculation_type === 100" :gutter="24">
        <el-col :span="18">
          <el-form-item :label="'批次号'">
            <el-select
              v-model="fcCommission.batchNo"
              clearable
              style="width: 100%"
            >
              <el-option
                v-for="(item) in batchIdOptions"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row
        v-if="switchSet && fcCommission.calculation_type !== 300"
        :gutter="24"
      >
        <el-col :span="18">
          <el-form-item :label="changeLabel">
            <el-select
              v-model="fcCommission.calculation_option"
              clearable
              style="width: 100%"
              @change="clickDrawScheme()"
            >
              <el-option
                v-for="(item, index) in drawSetOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="stageShow" :gutter="24">
        <el-col span="18">
          <el-form-item :label="indicateLabel">
            <el-select
              v-model="fcCommission.indicateResult"
              clearable
              style="width: 100%"
              @change="indicatorChange"
            >
              <el-option
                v-for="(item, index) in indicatorOption"
                :key="index"
                :label="item.indicator_alias"
                :value="item.id_"
              />
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row
        v-if="switchSet || fcCommission.calculation_type !== 200"
        :gutter="24"
      >
        <el-col :span="10" :offset="6" style="margin-bottom: 15px">
          <el-radio-group v-model="fcCommission.overdue_stage">
            <el-radio :label="1">默认逾期阶段</el-radio>
            <el-radio :label="0">自定义逾期阶段</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row v-if="fcCommission.calculation_type === 200" :gutter="24">
        <el-col :span="12">
          <el-form-item :label="'人头单价(元/人/月)'" prop="head_price">
            <el-input
              v-model="fcCommission.head_price"
              type="text"
              style="width: 100%"
              oninput="value=value.replace(/[^\d]/g,'')"
              clearable
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'人头数量(个)'" prop="head_count">
            <el-input
              v-model="fcCommission.head_count"
              type="text"
              oninput="value=value.replace(/[^\d]/g,'')"
              clearable
            />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 默认逾期阶段 -->
      <el-row :gutter="10">
        <!--  -->
        <default-overstage
          v-if="isShowDefaultOverstage && fcCommission.overdue_stage === 1"
          :default-fc-overdue-stage="defaultFcOverdueStage"
          :column-label-two="columnLabelTwo"
          :column-label-three="columnLabelThree"
          :column-label-four="columnLabelFour"
          :fc-commission="fcCommission"
          :is-disabled="isDisabled"
          :switch-set="switchSet"
          @submitForm="submitForm"
        />
      </el-row>
      <!-- 自定义逾期阶段 -->
      <el-row :gutter="10">
        <auto-overstage
          v-if="isShowDefaultOverstage && fcCommission.overdue_stage === 0"
          :auto-fc-overdue-stage="autoFcOverdueStage"
          :overdue-stage-option="overdueStageOption"
          :column-label-two="columnLabelTwo"
          :column-label-three="columnLabelThree"
          :column-label-four="columnLabelFour"
          :fc-commission="fcCommission"
          :is-disabled="isDisabled"
          :is-detail="isDetail"
          :switch-set="switchSet"
          @submitForm="submitForm"
        />
      </el-row>
    </el-form>
    <span v-if="fcCommission.calculation_type === 200 && !switchSet" style="float: right; margin: 10px">
      <el-button
        v-if="!isDisabled"
        type="primary"
        @click="submitForm('fcCommission')"
      >保存</el-button>
    </span>
    <span style="float: right; margin: 10px">
      <el-button
        v-if="isDisabled"
        type="primary"
        @click="sure()"
      >确 定</el-button>
    </span>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
// import { list } from '@/api/finance/performance_appraisal/indicator';
// import { addCommission, editCommission } from '@/api/finance/commissionManage/commission';
// import { getBatchIds } from '@/api/finance/contract/commission';
import defaultOverstage from './defaultOverstage.vue';
import autoOverstage from './autoOverstage.vue';
export default {
  components: { defaultOverstage, autoOverstage },
  props: {
    maincontractNo: {
      type: String,
      default: null
    },
    contractDate: {
      type: Object,
      default: null
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    fcCommissionData: {
      type: Object,
      default: null
    },
    visibleScheme: {
      type: Boolean,
      default: false
    },
    statusOptions: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      maincontract_no: null,
      indicateLabel: "指标结果",
      changeLabel: "案件单价(元)",
      switchSet: false, // 开关设置
      rules: {
        commission_name: [
          { required: true, message: "佣金方案名称不能为空", trigger: 'blur' }
        ],
        initDate: [
          { required: true, message: "请选择生效时间", trigger: 'blur' }
        ],
        head_price: [
          { required: true, message: "人头单价不能为空", trigger: 'blur' }
        ],
        head_count: [
          { required: true, message: "人头数量不能为空", trigger: 'blur' }
        ]
      },
      stageShow: false,
      indicatorOption: [],
      fcCommission: {
        id: null,
        maincontract_no: null,
        commission_no: null, // 佣金方案编号
        commission_name: null, // 佣金方案名称
        calculation_type: 200, // 计算方案(100.按佣金比率,200.按人头费用,300.案件单价)
        initDate: [], // 生效时间
        start_date: null,
        end_date: null,
        batchNo: null,
        commission_switch: 0, // 提成设置(1.开启、0.关闭)
        service_switch: 0, // 服务设置(1.开启、0.关闭)
        indicateResult: null, // 指标结果
        calculation_option: null, // 设置计算方案(1000.按绩效考核评分计算，2000.按回款达成率计算)
        overdue_stage: null, // 1.默认逾期阶段，0.自定义逾期阶段
        head_price: 0.00, // 人头单价
        head_count: 0,
        fcOverdueStage: []
      },
      // 默认逾期阶段
      defaultFcOverdueStage: [],
      autoFcOverdueStage: [],
      batchIdOptions: [],
      drawSetOptions: [
        {
          label: "按绩效考核评分计算",
          value: 1000
        },
        {
          label: "按指标结果",
          value: 2000
        }
      ],
      calculationTypeOption: [
        {
          label: "按人头费用",
          value: 200
        },
        {
          label: "按佣金比率",
          value: 100
        },
        {
          label: "案件单价(元)",
          value: 300
        }
      ],
      overdueStageOption: [], // 逾期状态字典
      columnLabelTwo: "超额基线值",
      columnLabelThree: "绩效考核评分",
      columnLabelFour: "提成比例(%)",
      isDetail: false,
      isShowDefaultOverstage: true, // 是否显示默认逾期阶段
      pickerOptions: this.disableDate()
    };
  },
  watch: {
    fcCommissionData(newVal, oldVal) {
      console.log("======监听内容newVal？？？", newVal);      
      if (newVal !== null) {
        this.fcCommission = this.fcCommissionData;
        this.getDetail();
      }
    }
  },
  created() {

    console.log("======父页面佣金方案列表带过来的参数1：", this.maincontractNo);

    // 保存合同id
    this.fcCommission.maincontract_no = this.maincontractNo;
    this.getInitOverdueStage();
    this.getindicatorList();
    // 查询批次号
    // getBatchIds().then(response => {
    //   this.batchIdOptions = response.data;
    // });
    // 查询批次号

    let params = {
            length: 999,
            servicecode: "cb0310",
            maincontract_no: "000000000000901",
          };
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            console.log("======查询批次号", res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        }); 
  },
  methods: {

    // 根据合同有效期获取可选日期
    disableDate() {
      const self = this;
      return {
        disabledDate(time) {
          return time.getTime() >= new Date(self.contractDate.end_date).getTime() || time.getTime() <= new Date(self.contractDate.start_date).getTime();
        }
      };
    },
    getInitOverdueStage() {
      // 初始化默认逾期阶段
      this.statusOptions.forEach(item => {
        const defaultFcOverdue = {
          fcCommissionId: null, // 佣金方案id
          // overdue_status_end: item.dictValue, // 逾期状态开始(1.m1案件,2.m2案件)
          // overdue_status_endLabel: item.dictLabel,
          overdue_status_start: item.stage_code, // 逾期状态开始(1.m1案件,2.m2案件)
          overdue_status_endLabel: item.stage_name,
          overdue_status_end: null, // 逾期状态结束(1.m1案件,2.m2案件)
          commission_rate: null, // 佣金比率
          excess_baseline: null, // 超额基线值
          case_price: null, // 案件单价
          fcServiceRate: [ // 自定义逾期阶段
          ]
        };
        this.defaultFcOverdueStage.push(defaultFcOverdue);

        // 设置逾期状态下拉框
        const overdueOption = {
          // label: item.dictLabel,
          label: item.stage_name,
          // value: Number(item.dictValue),
          value: item.stage_code,
          disabled: false
        };
        this.overdueStageOption.push(overdueOption);
      });
    },
    getDetail() {
      this.clickCalcScheme111(this.fcCommission.calculationType);
      // this.fcCommission = this.fcCommissionData;
      // 获取生效日期
      this.fcCommission.initDate = [this.fcCommission.start_date, this.fcCommission.end_date];

      // 判断提成设置或者服务设置是否开启
      if (this.fcCommission.commission_switch === 1 || this.fcCommission.service_switch === 1) {
        this.initAutoOverdue();
        this.switchSet = true;
      } else {
        this.switchSet = false;
      }

      // 设置显示默认逾期阶段，如果switchSet=false并且是人头计费,则不显示那个默认逾期阶段
      if (this.fcCommission.calculation_type === 200 && !this.switchSet) {
        this.isShowDefaultOverstage = false;
      } else {
        this.isShowDefaultOverstage = true;
      }
      // 如果=== 1，说明是默认逾期阶段，并且有数据，否则等于=0是自定义逾期阶段。。
      if (this.fcCommission.overdue_stage === 1) {
        this.defaultFcOverdueStage = this.fcCommission.ctbOverdueStage;
      } else if (this.fcCommission.overdue_stage === 0) {
        this.autoFcOverdueStage = this.fcCommission.ctbOverdueStage;
        this.isDetail = true;
      }
    },
    submitForm(formName) {
      console.log("======1进来了:" + formName);

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.fcCommission.start_date = this.fcCommission.initDate === null ? null : this.fcCommission.initDate[0];
          this.fcCommission.end_date = this.fcCommission.initDate === null ? null : this.fcCommission.initDate[1];
          if (this.fcCommission.overdue_stage === 1) {
            this.fcCommission.fcOverdueStage = this.defaultFcOverdueStage;
          } else if (this.fcCommission.overdue_stage === 0) {
            const result = this.validateAutoOverdue();
            if (!result) {
              this.$message({
                type: 'error',
                message: '逾期状态不能为空'
              });
              return false;
            }
            this.fcCommission.fcOverdueStage = this.autoFcOverdueStage;
          } else {
            this.fcCommission.fcOverdueStage = [];
          }
          console.log("======2进来了:" + this.fcCommissionData);

          if (this.fcCommissionData !== null) {
            // editCommission(this.fcCommission).then(res => {
            //   this.$message({
            //     type: 'success',
            //     message: this.$i18n.t('common.operateSuccess')
            //   });
            //   this.$emit('closeDialog');
            // });
            let params = {
                servicecode: "cb0355",
                id: this.fcCommission.id,
                maincontract_no: this.fcCommission.maincontract_no,// 佣金方案编号
                commission_no: this.fcCommission.commission_no,
                commission_name: this.fcCommission.commission_name,// 佣金方案名称
                calculation_type: this.fcCommission.calculation_type,// 计算方案(100.按佣金比率,200.按人头费用,300.案件单价)
                initDate: this.fcCommission.initDate, // 生效时间
                start_date: this.fcCommission.start_date,
                end_date: this.fcCommission.end_date,
                batchNo: this.fcCommission.batchNo,
                commission_switch: this.fcCommission.commission_switch,// 提成设置(1.开启、0.关闭)
                service_switch: this.fcCommission.service_switch, // 服务设置(1.开启、0.关闭)
                indicateResult: this.fcCommission.indicateResult, // 指标结果
                calculation_option: this.fcCommission.calculation_option,// 设置计算方案(1000.按绩效考核评分计算，2000.按回款达成率计算)
                overdue_stage: this.fcCommission.overdue_stage,// 1.默认逾期阶段，0.自定义逾期阶段
                head_price: this.fcCommission.head_price, // 人头单价
                head_count: this.fcCommission.head_count,
                ctbOverdueStage: this.fcCommission.fcOverdueStage,

              };
                MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
            .then((res) => {
              if (res && res.code === "200" && res.data) {
                console.log("======编辑addCommission", res.data);
                this.$emit('closeDialog');
              }
            })
            .catch((err) => {
              console.error(err);
            });            
          } else {
            // addCommission(this.fcCommission).then(res => {
            //   this.$message({
            //     type: 'success',
            //     message: this.$i18n.t('common.operateSuccess')
            //   });
            //   this.$emit('closeDialog');
            // });
                let params = {
                servicecode: "cb0311",
                id: this.fcCommission.id,
                maincontract_no: this.fcCommission.maincontract_no,// 佣金方案编号
                commission_no: this.fcCommission.commission_no,
                commission_name: this.fcCommission.commission_name,// 佣金方案名称
                calculation_type: this.fcCommission.calculation_type,// 计算方案(100.按佣金比率,200.按人头费用,300.案件单价)
                initDate: this.fcCommission.initDate, // 生效时间
                start_date: this.fcCommission.start_date,
                end_date: this.fcCommission.end_date,
                batchNo: this.fcCommission.batchNo,
                commission_switch: this.fcCommission.commission_switch,// 提成设置(1.开启、0.关闭)
                service_switch: this.fcCommission.service_switch, // 服务设置(1.开启、0.关闭)
                indicateResult: this.fcCommission.indicateResult, // 指标结果
                calculation_option: this.fcCommission.calculation_option,// 设置计算方案(1000.按绩效考核评分计算，2000.按回款达成率计算)
                overdue_stage: this.fcCommission.overdue_stage,// 1.默认逾期阶段，0.自定义逾期阶段
                head_price: this.fcCommission.head_price, // 人头单价
                head_count: this.fcCommission.head_count,
                ctbOverdueStage: this.fcCommission.fcOverdueStage,

              };
                MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
            .then((res) => {
              if (res && res.code === "200" && res.data) {
                console.log("======新增佣金方案-cb0311", res.data);
                this.$emit('closeDialog');
              }
            })
            .catch((err) => {
              console.error(err);
            });
          }
        } else {
          return false;
        }
      });
    },
    // 校验自定义逾期阶段下拉框是否为空
    validateAutoOverdue() {
      let result = true;
      this.autoFcOverdueStage.forEach(item => {
        if (item.overdue_status_start === null || item.overdue_status_start === '' || item.overdue_status_end === null || item.overdue_status_end === '') {
          result = false;
        }
      });
      return result;
    },
    // 查看详情，确认按钮
    sure() {
      this.$emit('closeDialog');
    },
    // 佣金计算方案
    clickCalcScheme(val) {
      // 如果是按案件单价计算，则直接显示默认逾期阶段
      if (val === 300) {
        this.fcCommission.overdue_stage = 1; // 默认逾期阶段
        this.columnLabelTwo = "案件单价(元)";
        this.switchSet = false;
        this.isShowDefaultOverstage = true;
      } else if (val === 200) {
        // 人头计算
        this.changeLabel = "提成计算方案";
        this.columnLabelTwo = "超额基线值";
        this.columnLabelThree = "绩效考核评分";
        this.columnLabelFour = "提成比例(%)";
        this.fcCommission.overdue_stage = null;
        this.switchSet = false;
        this.isShowDefaultOverstage = false;
      } else {
        // 按佣金比率
        this.changeLabel = "服务费计算方案";
        this.columnLabelTwo = "佣金比率(%)";
        this.columnLabelThree = "绩效考核评分";
        this.columnLabelFour = "服务费比例(%)";
        this.fcCommission.overdue_stage = 1;
        this.switchSet = false;
        this.isShowDefaultOverstage = true;
      }
      this.fcCommission.head_price = 0.00; // 人头单价
      this.fcCommission.head_count = 0; // 人头数量
      this.fcCommission.commission_switch = 0;
      this.fcCommission.service_switch = 0;
      // 初始化逾期阶段
      this.clearAutoOverdue();
    },

    // 佣金计算方案
     clickCalcScheme111(val) {
      console.log('======调用方法clickCalcScheme111：' + val);
      // 如果是按案件单价计算，则直接显示默认逾期阶段
      if (val === 300) {
        this.columnLabelTwo = "案件单价(元)";
      } else if (val === 200) {
        // 人头计算
        this.changeLabel ="提成计算方案";
        this.columnLabelTwo = "超额基线值";
        this.columnLabelThree =  "绩效考核评分";
        this.columnLabelFour = "提成比例(%)";
      } else {
        // 按佣金比率
        this.changeLabel = "服务费计算方案";
        this.columnLabelTwo = "佣金比率(%)";
        this.columnLabelThree = "绩效考核评分";
        this.columnLabelFour = "服务费比例(%)";
      }
    },

    // 提成设置-服务费设置
    drawSeting() {
      this.fcCommission.calculation_option = 1000; // 提成计算方案
      if (this.switchSet && this.fcCommission.calculation_type === 200) {
        this.fcCommission.commission_switch = 1;
        this.changeLabel = "提成计算方案";
        this.fcCommission.overdue_stage = 1; // 1.默认逾期阶段，0.自定义逾期阶段
        this.isShowDefaultOverstage = true; // 显示默认逾期
        this.initAutoOverdue();
      } else if (this.switchSet && this.fcCommission.calculation_type === 100) {
        this.fcCommission.service_switch = 1;
        this.changeLabel = "服务费计算方案";
        this.fcCommission.overdue_stage = 1; // 1.默认逾期阶段，0.自定义逾期阶段
        this.isShowDefaultOverstage = true; // 显示默认逾期
        this.initAutoOverdue();
      } else {
        this.fcCommission.commission_switch = 0;
        this.fcCommission.service_switch = 0;
        this.fcCommission.calculation_option = null;
        if (this.fcCommission.calculation_type === 200) {
          this.isShowDefaultOverstage = false; // 隐藏默认逾期
          this.fcCommission.overdue_stage = null; // 1.默认逾期阶段，0.自定义逾期阶段
        } else if (this.fcCommission.calculation_type === 100) {
          this.fcCommission.overdue_stage = 1; // 1.默认逾期阶段，0.自定义逾期阶段
          this.isShowDefaultOverstage = true; // 显示默认逾期
        }
        // 清楚自定义逾期阶段下的服务费率
        this.clearAutoOverdue();
      }
    },
    // 指标结果
    // getindicatorList() {
    //   const queryParams = { pageNum: 1, pageSize: 1000 };
    //   list(queryParams).then(response => {
    //     this.indicatorOption = response.rows;
    //   }
    //   );
    // },

    // 指标结果
    getindicatorList() {
      let params = {
        length: 999,
        servicecode: "cb0313",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            console.log("cb0313-考核指标：", res.data);
            this.indicatorOption = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    indicatorChange(val) {
      this.indicatorOption.forEach(item => {
        if (item.id_ === val) {
          this.columnLabelThree = item.indicator_alias;
        }
      });
    },
    // 提成计算方案-服务费计算方案下拉框选择事件
    clickDrawScheme() {
      if (this.fcCommission.calculation_option === 1000) {
        this.stageShow = false;
        this.columnLabelThree = "绩效考核评分";
        // 将自定义回款达成率清空为0
        this.autoFcOverdueStage.forEach(item => {
          item.fcServiceRate.forEach(rate => {
            rate.collection_rate = null;
          });
        });
        // 将默认回款达成率清空为null
        this.defaultFcOverdueStage.forEach(item => {
          item.fcServiceRate.forEach(rate => {
            rate.collection_rate = null;
          });
        });
      } else {
        this.stageShow = true;
        this.columnLabelThree = "按指标结果";
        // 将自定义绩效考核评分清空为0
        this.autoFcOverdueStage.forEach(item => {
          item.fcServiceRate.forEach(rate => {
            rate.performance_appraisal = null;
          });
        });
        // 将默认绩效考核评分清空为null
        this.defaultFcOverdueStage.forEach(item => {
          item.fcServiceRate.forEach(rate => {
            rate.performance_appraisal = null;
          });
        });
      }
    },
    // 初始化清空自定义逾期阶段和默认逾期阶段
    clearAutoOverdue() {
      // 默认逾期阶段
      this.defaultFcOverdueStage.forEach(item => {
        item.commission_rate = null; // 佣金比率
        item.excess_baseline = null; // 超额基线值
        item.case_price = null; // 案件单价
        item.fcServiceRate = [];
      });
      // 自定义逾期阶段
      this.autoFcOverdueStage = [];
      this.autoFcOverdueStage.push({
        fcCommissionId: null, // 佣金方案id
        overdue_status_start: null, // 逾期状态开始(1.m1案件,2.m2案件)
        overdue_status_endShow: false,
        overdue_status_end: null, // 逾期状态结束(1.m1案件,2.m2案件)
        overdue_status_endShow: false,
        commission_rate: null, // 佣金比率
        excess_baseline: null, // 超额基线值
        case_price: null, // 案件单价
        fcServiceRate: []
      });
    },
    // 初始化清空自定义逾期阶段和默认逾期阶段
    initAutoOverdue() {
      // 默认逾期阶段
      this.defaultFcOverdueStage.forEach(item => {
        item.commission_rate = null; // 佣金比率
        item.excess_baseline = null; // 超额基线值
        item.case_price = null; // 案件单价
        item.fcServiceRate = [ //
          {
            ctb_overdue_stage_id: null, // 逾期阶段id
            performance_appraisal: null, // 绩效考核评分
            deduct_rate: null, // 提成比例
            collection_rate: null, // 回款达成率(回款达成率=实际收款金额/委托金额)
            service_rate: null // 服务费比率(服务费比例=激励佣金比率/佣金比率)
          }
        ];
      });
      // 自定义逾期阶段
      this.autoFcOverdueStage = [];
      this.autoFcOverdueStage.push({
        fcCommissionId: null, // 佣金方案id
        overdue_status_end: null, // 逾期状态开始(1.m1案件,2.m2案件)
        overdue_status_endShow: false,
        overdue_status_end: null, // 逾期状态结束(1.m1案件,2.m2案件)
        overdue_status_endShow: false,
        commission_rate: null, // 佣金比率
        excess_baseline: null, // 超额基线值
        case_price: null, // 案件单价
        fcServiceRate: [ // 自定义逾期阶段
          {
            ctb_overdue_stage_id: null, // 逾期阶段id
            performance_appraisal: null, // 绩效考核评分
            deduct_rate: null, // 提成比例
            collection_rate: null, // 回款达成率(回款达成率=实际收款金额/委托金额)
            service_rate: null // 服务费比率(服务费比例=激励佣金比率/佣金比率)
          }
        ]
      });
    }
  }
};
</script>
