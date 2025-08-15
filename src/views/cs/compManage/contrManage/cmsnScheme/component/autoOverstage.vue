<template>
  <!-- 自定义逾期状态 -->
  <div class="app-container">
    <el-table :data="autoFcOverdueStage" style="width: 100%">
      <el-table-column align="center" prop="overdue_status_start" :label="'逾期状态'">
        <template slot-scope="scope">
          <el-form>
            <el-form-item>
              <el-select v-model="scope.row.overdue_status_start" :disabled="scope.row.overdue_status_startShow" clearable @change="isOverdue(scope.row.overdue_status_start)" @clear="setDisabled(scope.row)">
                <el-option
                  v-for="(item, index) in overdueStageOption"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="scope.row.overdue_status_end" :disabled="scope.row.overdue_status_endShow" clearable @change="isOverdue(scope.row.overdue_status_end)" @clear="setDisabled(scope.row)">
                <el-option
                  v-for="(item, index) in overdueStageOption"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                />
              </el-select>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- 佣金比率，超额基线值，案件单价 -->
      <el-table-column
        align="center"
        prop="baseCollectRate"
        :label="columnLabelTwo"
      >
        <template slot-scope="scope">
          <el-input-number
            v-if="fcCommission.calculation_type === 200"
            v-model="scope.row.excess_baseline"
            :controls="false"
            :disabled="isDisabled"
            :precision="2"
            :step="0.1"
            :min="0"
          />
          <el-input-number
            v-if="fcCommission.calculation_type === 100"
            v-model="scope.row.commission_rate"
            :controls="false"
            :disabled="isDisabled"
            :precision="2"
            :step="0.1"
            :min="0"
          />
          <el-input-number
            v-if="fcCommission.calculation_type === 300"
            v-model="scope.row.case_price"
            :controls="false"
            :disabled="isDisabled"
            :precision="2"
            :step="0.1"
            :min="0"
          />
        </template>
      </el-table-column>
      <el-table-column
        v-if="
          switchSet && (fcCommission.calculation_type === 100 ||
            fcCommission.calculation_type === 200)
        "
        :label="columnLabelThree"
        align="center"
      >
        <template slot-scope="scope">
          <!-- 绩效考核评分 -->
          <div v-if="fcCommission.calculation_option === 1000">
            <el-input-number
              v-for="(item,index) in scope.row.fcServiceRate"
              :key="index"
              v-model="item.performance_appraisal"
              :controls="false"
              :disabled="isDisabled"
              :precision="2"
              :step="0.1"
              :min="0"
            />
          </div>
          <!-- 回款达成率 -->
          <div v-if="fcCommission.calculation_option === 2000">
            <el-input-number
              v-for="(item,index) in scope.row.fcServiceRate"
              :key="index"
              v-model="item.collection_rate"
              :controls="false"
              :disabled="isDisabled"
              :precision="2"
              :step="0.1"
              :min="0"
            />
          </div>
          <el-button
            v-show="!isDisabled"
            type="primary"
            icon="el-icon-plus"
            size="mini"
            @click="addTabColumn(scope.row)"
          />
          <el-button
            v-show="!isDisabled"
            v-if="scope.row.fcServiceRate.length > 1"
            type="primary"
            icon="el-icon-delete"
            size="mini"
            @click="delTabColumn(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column
        v-if="
          switchSet && (fcCommission.calculation_type === 100 ||
            fcCommission.calculation_type === 200)
        "
        :label="columnLabelFour"
        align="center"
      >
        <template slot-scope="scope">
          <!-- 提成比例 -->
          <div v-if="fcCommission.calculation_type === 200">
            <el-input-number
              v-for="(item,index) in scope.row.fcServiceRate"
              :key="index"
              v-model="item.deduct_rate"
              :controls="false"
              :disabled="isDisabled"
              :precision="2"
              :step="0.1"
              :min="0"
            />
          </div>
          <!-- 服务费比率 -->
          <div v-if="fcCommission.calculation_type === 100">
            <el-input-number
              v-for="(item,index) in scope.row.fcServiceRate"
              :key="index"
              v-model="item.service_rate"
              :controls="false"
              :disabled="isDisabled"
              :precision="2"
              :step="0.1"
              :min="0"
            />
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-button
      v-show="!isDisabled"
      type="primary"
      icon="el-icon-plus"
      size="mini"
      @click="addTabRow(autoFcOverdueStage)"
    />
    <el-button
      v-show="!isDisabled"
      v-if="autoFcOverdueStage.length > 1"
      type="primary"
      icon="el-icon-delete"
      size="mini"
      @click="delTabRow(autoFcOverdueStage)"
    />

    <span style="float: right; margin: 10px">
      <el-button
        v-if="!isDisabled"
        type="primary"
        @click="submitForm('fcCommission')"
      >保存</el-button>
    </span>
  </div>
</template>

<script>

export default {
  props: {
    autoFcOverdueStage: {
      type: Array,
      default: null
    },
    overdueStageOption: {
      type: Array,
      default: null
    },
    columnLabelTwo: {
      type: String,
      default: null
    },
    columnLabelThree: {
      type: String,
      default: null
    },
    columnLabelFour: {
      type: String,
      default: null
    },
    fcCommission: {
      type: Object,
      default: null
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    switchSet: {
      type: Boolean,
      default: false
    },
    isDetail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      name: null
    };
  },
  mounted() {
    if (this.isDetail) {
      this.setDisabled(-1);
    }
  },
  methods: {
    // 逾期阶段增加行
    addTabColumn(row) {
      row.fcServiceRate.push({
        ctb_overdue_stage_id: row.fcCommissionId,
        performance_appraisal: null,
        deduct_rate: null,
        collection_rate: null,
        service_rate: null
      });
    },
    addTabRow(row) {
      if (this.switchSet) {
        row.push({
          fcCommissionId: null,
          overdue_status_start: null,
          overdue_status_startShow: false,
          overdue_status_end: null,
          overdue_status_endShow: false,
          commission_rate: null,
          excess_baseline: null,
          case_price: null,
          fcServiceRate: [{
            ctb_overdue_stage_id: null, // 逾期阶段id
            performance_appraisal: null, // 绩效考核评分
            deduct_rate: null, // 提成比例
            collection_rate: null, // 回款达成率(回款达成率=实际收款金额/委托金额)
            service_rate: null // 服务费比率(服务费比例=激励佣金比率/佣金比率)
          }]
        });
      } else {
        row.push({
          fcCommissionId: null,
          overdue_status_start: null,
          overdue_status_startShow: false,
          overdue_status_end: null,
          overdue_status_endShow: false,
          commission_rate: null,
          excess_baseline: null,
          case_price: null,
          fcServiceRate: []
        });
      }
    },
    delTabRow(row) {
      row.splice(this.autoFcOverdueStage.length - 1, 1);
      this.setDisabled();
    },
    submitForm(formName) {
      this.$emit('submitForm', formName);
    },
    // 设置逾期阶段下拉框不可选择
    isOverdue(row) {
      this.clearOverdueOption();
      this.overdueStageOption.forEach(item => {
        if (item.value.slice(2) <= row.slice(2)) {
          item.disabled = true;
        }
      });
      this.isDisabledOption(row);
    },
    // 点击下拉框清空时，设置下拉框选中的最大值，对应字典不可选择
    setDisabled(init) {
      let max = -1;
      this.autoFcOverdueStage.forEach(item => {
        max = Number(item.overdue_status_start.slice(2)) > max ? Number(item.overdue_status_start.slice(2)) : max;
        max = Number(item.overdue_status_end.slice(2)) > max ? Number(item.overdue_status_end.slice(2)) : max;
      });
      this.isOverdue(max);
      this.initAutoOption(); // 初始化自定义阶段下拉框可选
      if (init !== -1) { // 等于-1，设置下拉框无法选择
        this.isDisabledOption(max);
      }
    },
    // 初始化自定义逾期下拉框为false
    initAutoOption() {
      this.autoFcOverdueStage.forEach(item => {
        item.overdue_status_startShow = this.isDisabled;
        item.overdue_status_endShow = this.isDisabled;
      });
    },
    // 设置逾期阶段下拉框无法选择
    isDisabledOption(mark) {
      for (let i = 0; i < this.autoFcOverdueStage.length; i++) {
        if (Number(this.autoFcOverdueStage[i].overdue_status_start.slice(2)) === mark) {
          break;
        } else {
          this.autoFcOverdueStage[i].overdue_status_startShow = true;
        }
        if (Number(this.autoFcOverdueStage[i].overdue_status_end).slice(2) === mark) {
          break;
        } else {
          this.autoFcOverdueStage[i].overdue_status_endShow = true;
        }
      }
    },
    // 重置下拉框字典可以选择
    clearOverdueOption() {
      this.overdueStageOption.forEach(item => {
        item.disabled = false;
      });
    }
  }
};
</script>
