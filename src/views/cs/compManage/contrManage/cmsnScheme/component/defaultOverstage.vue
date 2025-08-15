<template>
  <!-- 默认逾期状态 -->
  <div class="app-container">
    <el-table :data="defaultFcOverdueStage" style="width: 100%">
      <el-table-column align="center" prop="overdue_status_endLabel" :label="'逾期状态'">
        <template slot-scope="scope">
          <span>{{ scope.row.overdue_status_endLabel }}</span>
        </template>
      </el-table-column>
      <!-- 佣金比率，超额基线值，案件单价 -->
      <el-table-column
        align="center"
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
          <!-- <section> -->
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
          <!-- </section> -->
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
    defaultFcOverdueStage: {
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
    }
  },
  data() {
    return {
      name: null
    };
  },
  mounted() {
  },
  methods: {
    // 默认逾期阶段增加行
    addTabColumn(row) {
      row.fcServiceRate.push({
        ctb_overdue_stage_id: row.fcCommissionId,
        performance_appraisal: null,
        deduct_rate: null,
        collection_rate: null,
        service_rate: null
      });
    },
    delTabColumn(row) {
      row.fcServiceRate.splice(row.fcServiceRate.length - 1, 1);
    },
    submitForm(formName) {
      this.$emit('submitForm', formName);
    }
  }
};
</script>
