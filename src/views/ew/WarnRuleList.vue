<template>
  <div class="page_content">
    <div class="container-theme">
      <el-container style="height: 100%; padding: 9px">
        <el-aside width="35%">
          <!-- 表头(额外) -->
          <div class="table_name">
            <div class="table_name_left flex_row_center">
              <span>是否启用</span>
            </div>
            <div class="table_name_right flex_row_center">
              <span>规则名称</span>
            </div>
          </div>
          <!-- 表格数据(隐藏自身表头) -->
          <el-table
            ref="multipleTable"
            :show-header="false"
            :data="tableViewData"
            width="100%"
            style="height: 100%"
            border
            highlight-current-row
            @current-change="handleCurrentChange"
            @select="handleSelect"
          >
            <el-table-column type="selection" width="120" align="center">
            </el-table-column>
            <el-table-column prop="ruleName" label="规则名称" align="center">
            </el-table-column>
          </el-table>
        </el-aside>
        <el-aside width="1%"></el-aside>
        <!-- 模板3 -->
        <el-aside
          width="60%"
          style="border: 1px solid #eee; background-color: grb(238 241 246)"
          v-if="currentTemplateId == 1"
        >
          <el-form
            ref="ruleForm_3"
            :model="tableSelectRow"
            :rules="rules"
            label-width="180px"
          >
            <el-row>
              <el-col span="22">
                <el-form-item label="规则编号" prop="rule_id">
                  <el-input
                    v-model="tableSelectRow.rule_id"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="规则名称" prop="rule_name">
                  <el-input
                    v-model="tableSelectRow.rule_name"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="规则条件" prop="rule_condition">
                  <el-input
                    v-model="tableSelectRow.rule_condition"
                    type="textarea"
                    :rows="4"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="14">
                <el-form-item
                  label="月"
                  prop="month_num"
                  :rules="[
                    {
                      required: true,
                      message: '月份不能为空'
                    }
                  ]"
                >
                  <el-input
                    v-model="tableSelectRow.month_num"
                    onKeypress="return(/^[0-9]*$/.test(String.fromCharCode(event.keyCode)))"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col span="14">
                <el-form-item
                  label="预警频率"
                  prop="early_warning_frequency"
                  :rules="[{ required: true, message: '预警频率不能为空' }]"
                >
                  <el-select
                    v-model="tableSelectRow.early_warning_frequency"
                    placeholder=" "
                    :disabled="
                      disablesRuleIdOfEarlyWarningFrequency.has(
                        tableSelectRow.rule_id
                      )
                    "
                  >
                    <el-option
                      v-for="item in warningFrequencySelectOriginList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="14">
                <el-form-item
                  label="预警级别"
                  prop="early_warning_level"
                  :rules="[{ required: true, message: '预警级别不能为空' }]"
                >
                  <el-select
                    v-model="tableSelectRow.early_warning_level"
                    placeholder=" "
                  >
                    <el-option
                      v-for="item in warningLevelList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="备注" prop="remark">
                  <el-input
                    type="textarea"
                    :rows="5"
                    v-model="tableSelectRow.remark"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <div class="associat-button">
              <el-button
                type="primary"
                size="small"
                @click="selectTable('ruleForm_3', tableSelectRow.rule_name)"
                >确定</el-button
              >
              <el-button type="primary" size="small" @click="cancle"
                >取消</el-button
              >
            </div>
          </el-form>
        </el-aside>

        <!-- 模板4 --->
        <el-aside
          width="60%"
          style="border: 1px solid #eee; background-color: grb(238 241 246)"
          v-if="currentTemplateId == 2"
        >
          <el-form
            ref="ruleForm_4"
            :model="tableSelectRow"
            :rules="rules"
            label-width="180px"
          >
            <el-row>
              <el-col span="22">
                <el-form-item label="规则编号" prop="rule_id">
                  <el-input
                    v-model="tableSelectRow.rule_id"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="规则名称" prop="rule_name">
                  <el-input
                    v-model="tableSelectRow.rule_name"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="规则条件" prop="rule_condition">
                  <el-input
                    v-model="tableSelectRow.rule_condition"
                    type="textarea"
                    :rows="4"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="14">
                <el-form-item
                  label="担保次数大于等于(次)"
                  prop="guarantees_number"
                  :rules="[
                    {
                      required: true,
                      message: '担保次数大于等于(次)不能为空'
                    }
                  ]"
                >
                  <el-input
                    v-model="tableSelectRow.guarantees_number"
                    onKeypress="return(/^[0-9]*$/.test(String.fromCharCode(event.keyCode)))"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col span="14">
                <el-form-item
                  label="预警频率"
                  prop="early_warning_frequency"
                  :rules="[{ required: true, message: '预警频率不能为空' }]"
                >
                  <el-select
                    v-model="tableSelectRow.early_warning_frequency"
                    placeholder=" "
                    :disabled="
                      disablesRuleIdOfEarlyWarningFrequency.has(
                        tableSelectRow.rule_id
                      )
                    "
                  >
                    <el-option
                      v-for="item in warningFrequencySelectOriginList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="14">
                <el-form-item
                  label="预警级别"
                  prop="early_warning_level"
                  :rules="[{ required: true, message: '预警级别不能为空' }]"
                >
                  <el-select
                    v-model="tableSelectRow.early_warning_level"
                    placeholder=" "
                  >
                    <el-option
                      v-for="item in warningLevelList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="备注" prop="remark">
                  <el-input
                    type="textarea"
                    :rows="5"
                    v-model="tableSelectRow.remark"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <div class="associat-button">
              <el-button
                type="primary"
                size="small"
                @click="selectTable('ruleForm_4', tableSelectRow.rule_name)"
                >确定</el-button
              >
              <el-button type="primary" size="small" @click="cancle"
                >取消</el-button
              >
            </div>
          </el-form>
        </el-aside>

        <!-- 模板5 -->
        <el-aside
          width="60%"
          style="border: 1px solid #eee; background-color: grb(238 241 246)"
          v-if="currentTemplateId == 3"
        >
          <el-form
            ref="ruleForm_5"
            :model="tableSelectRow"
            :rules="rules"
            label-width="180px"
          >
            <el-row>
              <el-col span="22">
                <el-form-item label="规则编号" prop="rule_id">
                  <el-input
                    v-model="tableSelectRow.rule_id"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="规则名称" prop="rule_name">
                  <el-input
                    v-model="tableSelectRow.rule_name"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="规则条件" prop="rule_condition">
                  <el-input
                    v-model="tableSelectRow.rule_condition"
                    type="textarea"
                    :rows="4"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="14">
                <el-form-item
                  label="担保金额大于等于（万元）"
                  prop="guarantees_sum"
                  :rules="[
                    {
                      required: true,
                      message: '担保金额大于等于（万元）不能为空'
                    }
                  ]"
                >
                  <el-input
                    v-model="tableSelectRow.guarantees_sum"
                    onKeypress="return(/^[0-9]*$/.test(String.fromCharCode(event.keyCode)))"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col span="14">
                <el-form-item
                  label="预警频率"
                  prop="early_warning_frequency"
                  :rules="[{ required: true, message: '预警频率不能为空' }]"
                >
                  <el-select
                    v-model="tableSelectRow.early_warning_frequency"
                    placeholder=" "
                    :disabled="
                      disablesRuleIdOfEarlyWarningFrequency.has(
                        tableSelectRow.rule_id
                      )
                    "
                  >
                    <el-option
                      v-for="item in warningFrequencySelectOriginList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="14">
                <el-form-item
                  label="预警级别"
                  prop="early_warning_level"
                  :rules="[{ required: true, message: '预警级别不能为空' }]"
                >
                  <el-select
                    v-model="tableSelectRow.early_warning_level"
                    placeholder=" "
                  >
                    <el-option
                      v-for="item in warningLevelList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="备注" prop="remark">
                  <el-input
                    type="textarea"
                    :rows="5"
                    v-model="tableSelectRow.remark"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <div class="associat-button">
              <el-button
                type="primary"
                size="small"
                @click="selectTable('ruleForm_5', tableSelectRow.rule_name)"
                >确定</el-button
              >
              <el-button type="primary" size="small" @click="cancle"
                >取消</el-button
              >
            </div>
          </el-form>
        </el-aside>

        <!-- 模板6 -->
        <el-aside
          width="60%"
          style="border: 1px solid #eee; background-color: grb(238 241 246)"
          v-if="currentTemplateId == 4"
        >
          <el-form
            ref="ruleForm_6"
            :model="tableSelectRow"
            :rules="rules"
            label-width="180px"
          >
            <el-row>
              <el-col span="22">
                <el-form-item label="规则编号" prop="rule_id">
                  <el-input
                    v-model="tableSelectRow.rule_id"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="规则名称" prop="rule_name">
                  <el-input
                    v-model="tableSelectRow.rule_name"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="规则条件" prop="rule_condition">
                  <el-input
                    v-model="tableSelectRow.rule_condition"
                    type="textarea"
                    :rows="4"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="14">
                <el-form-item
                  label="关键字"
                  prop="tips2"
                  :rules="[
                    {
                      required: true,
                      message: '关键字不能为空'
                    }
                  ]"
                >
                  <el-input
                    v-model="tableSelectRow.tips2"
                    type="text"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col span="10">
                <el-form-item label="多个关键字以/分割" label-width="138px">
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="14">
                <el-form-item
                  label="排除关键字"
                  prop="tips1"
                  :rules="[{ required: true, message: '排除关键字不能为空' }]"
                >
                  <el-input
                    v-model="tableSelectRow.tips1"
                    type="text"
                  ></el-input>
                </el-form-item>
              </el-col>

              <el-col span="10">
                <el-form-item label="多个排除关键字以/分割" label-width="165px">
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col span="14">
                <el-form-item
                  label="预警频率"
                  prop="early_warning_frequency"
                  :rules="[{ required: true, message: '预警频率不能为空' }]"
                >
                  <el-select
                    v-model="tableSelectRow.early_warning_frequency"
                    placeholder=" "
                    :disabled="
                      disablesRuleIdOfEarlyWarningFrequency.has(
                        tableSelectRow.rule_id
                      )
                    "
                  >
                    <el-option
                      v-for="item in warningFrequencySelectOriginList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="14">
                <el-form-item
                  label="预警级别"
                  prop="early_warning_level"
                  :rules="[{ required: true, message: '预警级别不能为空' }]"
                >
                  <el-select
                    v-model="tableSelectRow.early_warning_level"
                    placeholder=" "
                  >
                    <el-option
                      v-for="item in warningLevelList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="备注" prop="remark">
                  <el-input
                    type="textarea"
                    :rows="5"
                    v-model="tableSelectRow.remark"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <div class="associat-button">
              <el-button
                type="primary"
                size="small"
                @click="selectTable('ruleForm_6', tableSelectRow.rule_name)"
                >确定</el-button
              >
              <el-button type="primary" size="small" @click="cancle"
                >取消</el-button
              >
            </div>
          </el-form>
        </el-aside>

        <!-- 模板7 -->
        <el-aside
          width="60%"
          style="border: 1px solid #eee; background-color: grb(238 241 246)"
          v-if="currentTemplateId == 5"
        >
          <el-form
            ref="ruleForm_7"
            :model="tableSelectRow"
            :rules="rules"
            label-width="180px"
          >
            <el-row>
              <el-col span="22">
                <el-form-item label="规则编号" prop="rule_id">
                  <el-input
                    v-model="tableSelectRow.rule_id"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="规则名称" prop="rule_name">
                  <el-input
                    v-model="tableSelectRow.rule_name"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="规则条件" prop="rule_condition">
                  <el-input
                    v-model="tableSelectRow.rule_condition"
                    type="textarea"
                    :rows="4"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col span="14">
                <el-form-item label="时间范围（月）" prop="month_num" :rules="[
                  {
                    required: true,
                    message: '时间范围（月）不能为空',
                  },
                ]">
                  <el-input v-model="tableSelectRow.month_num" type="number"
                            onKeypress="return(/^[0-9]*$/.test(String.fromCharCode(event.keyCode)))"></el-input>
                </el-form-item>
              </el-col>
            </el-row> -->
            <el-row>
              <el-col span="14">
                <el-form-item
                  label="查询次数大于等于（次）"
                  prop="guarantees_number"
                  :rules="[
                    {
                      required: true,
                      message: '查询次数大于等于（次）不能为空'
                    }
                  ]"
                >
                  <el-input
                    v-model="tableSelectRow.guarantees_number"
                    onKeypress="return(/^[0-9]*$/.test(String.fromCharCode(event.keyCode)))"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col span="14">
                <el-form-item
                  label="预警频率"
                  prop="early_warning_frequency"
                  :rules="[{ required: true, message: '预警频率不能为空' }]"
                >
                  <el-select
                    v-model="tableSelectRow.early_warning_frequency"
                    placeholder=" "
                    :disabled="
                      disablesRuleIdOfEarlyWarningFrequency.has(
                        tableSelectRow.rule_id
                      )
                    "
                  >
                    <el-option
                      v-for="item in warningFrequencySelectOriginList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="14">
                <el-form-item
                  label="预警级别"
                  prop="early_warning_level"
                  :rules="[{ required: true, message: '预警级别不能为空' }]"
                >
                  <el-select
                    v-model="tableSelectRow.early_warning_level"
                    placeholder=" "
                  >
                    <el-option
                      v-for="item in warningLevelList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="备注" prop="remark">
                  <el-input
                    type="textarea"
                    :rows="5"
                    v-model="tableSelectRow.remark"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <div class="associat-button">
              <el-button
                type="primary"
                size="small"
                @click="selectTable('ruleForm_7', tableSelectRow.rule_name)"
                >确定</el-button
              >
              <el-button type="primary" size="small" @click="cancle"
                >取消</el-button
              >
            </div>
          </el-form>
        </el-aside>

        <!-- 模板8 -->
        <el-aside
          width="60%"
          style="border: 1px solid #eee; background-color: grb(238 241 246)"
          v-if="currentTemplateId == 6"
        >
          <el-form
            ref="ruleForm_8"
            :model="tableSelectRow"
            :rules="rules"
            label-width="180px"
          >
            <el-row>
              <el-col span="22">
                <el-form-item label="规则编号" prop="rule_id">
                  <el-input
                    v-model="tableSelectRow.rule_id"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="规则名称" prop="rule_name">
                  <el-input
                    v-model="tableSelectRow.rule_name"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="规则条件" prop="rule_condition">
                  <el-input
                    v-model="tableSelectRow.rule_condition"
                    type="textarea"
                    :rows="4"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="14">
                <el-form-item
                  label="贷款余额大于等于（万元）"
                  prop="guarantees_sum"
                  :rules="[
                    {
                      required: true,
                      message: '贷款余额大于等于（万元）不能为空'
                    }
                  ]"
                >
                  <el-input
                    v-model="tableSelectRow.guarantees_sum"
                    onKeypress="return(/^[0-9]*$/.test(String.fromCharCode(event.keyCode)))"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="14">
                <el-form-item
                  label="预警频率"
                  prop="early_warning_frequency"
                  :rules="[{ required: true, message: '预警频率不能为空' }]"
                >
                  <el-select
                    v-model="tableSelectRow.early_warning_frequency"
                    placeholder=" "
                    :disabled="
                      disablesRuleIdOfEarlyWarningFrequency.has(
                        tableSelectRow.rule_id
                      )
                    "
                  >
                    <el-option
                      v-for="item in warningFrequencySelectOriginList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="14">
                <el-form-item
                  label="预警级别"
                  prop="early_warning_level"
                  :rules="[{ required: true, message: '预警级别不能为空' }]"
                >
                  <el-select
                    v-model="tableSelectRow.early_warning_level"
                    placeholder=" "
                  >
                    <el-option
                      v-for="item in warningLevelList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="备注" prop="remark">
                  <el-input
                    type="textarea"
                    :rows="5"
                    v-model="tableSelectRow.remark"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <div class="associat-button">
              <el-button
                type="primary"
                size="small"
                @click="selectTable('ruleForm_8', tableSelectRow.rule_name)"
                >确定</el-button
              >
              <el-button type="primary" size="small" @click="cancle"
                >取消</el-button
              >
            </div>
          </el-form>
        </el-aside>

        <!-- 模板9 -->
        <el-aside
          width="60%"
          style="border: 1px solid #eee; background-color: grb(238 241 246)"
          v-if="currentTemplateId == 7"
        >
          <el-form
            ref="ruleForm_9"
            :model="tableSelectRow"
            :rules="rules"
            label-width="180px"
          >
            <el-row>
              <el-col span="22">
                <el-form-item label="规则编号" prop="rule_id">
                  <el-input
                    v-model="tableSelectRow.rule_id"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="规则名称" prop="rule_name">
                  <el-input
                    v-model="tableSelectRow.rule_name"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="规则条件" prop="rule_condition">
                  <el-input
                    v-model="tableSelectRow.rule_condition"
                    type="textarea"
                    :rows="4"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="14">
                <el-form-item
                  label="预警频率"
                  prop="early_warning_frequency"
                  :rules="[{ required: true, message: '预警频率不能为空' }]"
                >
                  <el-select
                    v-model="tableSelectRow.early_warning_frequency"
                    placeholder=" "
                    :disabled="
                      disablesRuleIdOfEarlyWarningFrequency.has(
                        tableSelectRow.rule_id
                      )
                    "
                  >
                    <el-option
                      v-for="item in warningFrequencySelectOriginList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="14">
                <el-form-item
                  label="预警级别"
                  prop="early_warning_level"
                  :rules="[{ required: true, message: '预警级别不能为空' }]"
                >
                  <el-select
                    v-model="tableSelectRow.early_warning_level"
                    placeholder=" "
                  >
                    <el-option
                      v-for="item in warningLevelList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="备注" prop="remark">
                  <el-input
                    type="textarea"
                    :rows="5"
                    v-model="tableSelectRow.remark"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <div class="associat-button">
              <el-button
                type="primary"
                size="small"
                @click="selectTable('ruleForm_9', tableSelectRow.rule_name)"
                >确定</el-button
              >
              <el-button type="primary" size="small" @click="cancle"
                >取消</el-button
              >
            </div>
          </el-form>
        </el-aside>

        <!-- 模板10 -->
        <el-aside
          width="60%"
          style="border: 1px solid #eee; background-color: grb(238 241 246)"
          v-if="currentTemplateId == 8"
        >
          <el-form
            ref="ruleForm_10"
            :model="tableSelectRow"
            :rules="rules"
            label-width="180px"
          >
            <el-row>
              <el-col span="22">
                <el-form-item label="规则编号" prop="rule_id">
                  <el-input
                    v-model="tableSelectRow.rule_id"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="规则名称" prop="rule_name">
                  <el-input
                    v-model="tableSelectRow.rule_name"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="规则条件" prop="rule_condition">
                  <el-input
                    v-model="tableSelectRow.rule_condition"
                    type="textarea"
                    :rows="4"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="14">
                <el-form-item
                  label="预警频率"
                  prop="early_warning_frequency"
                  :rules="[{ required: true, message: '预警频率不能为空' }]"
                >
                  <el-select
                    v-model="tableSelectRow.early_warning_frequency"
                    placeholder=" "
                    :disabled="
                      disablesRuleIdOfEarlyWarningFrequency.has(
                        tableSelectRow.rule_id
                      )
                    "
                  >
                    <el-option
                      v-for="item in warningFrequencySelectOriginList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="14">
                <el-form-item
                  label="预警级别"
                  prop="early_warning_level"
                  :rules="[{ required: true, message: '预警级别不能为空' }]"
                >
                  <el-select
                    v-model="tableSelectRow.early_warning_level"
                    placeholder=" "
                  >
                    <el-option
                      v-for="item in warningLevelList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="备注" prop="remark">
                  <el-input
                    type="textarea"
                    :rows="5"
                    v-model="tableSelectRow.remark"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <div class="associat-button">
              <el-button
                type="primary"
                size="small"
                @click="selectTable('ruleForm_10', tableSelectRow.rule_name)"
                >确定</el-button
              >
              <el-button type="primary" size="small" @click="cancle"
                >取消</el-button
              >
            </div>
          </el-form>
        </el-aside>

        <!-- 模板11 -->
        <el-aside
          width="60%"
          style="border: 1px solid #eee; background-color: grb(238 241 246)"
          v-if="currentTemplateId == 9"
        >
          <el-form
            ref="ruleForm_11"
            :model="tableSelectRow"
            :rules="rules"
            label-width="180px"
          >
            <el-row>
              <el-col span="22">
                <el-form-item label="规则编号" prop="rule_id">
                  <el-input
                    v-model="tableSelectRow.rule_id"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="规则名称" prop="rule_name">
                  <el-input
                    v-model="tableSelectRow.rule_name"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="规则条件" prop="rule_condition">
                  <el-input
                    v-model="tableSelectRow.rule_condition"
                    type="textarea"
                    :rows="4"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="14">
                <el-form-item
                  label="预警频率"
                  prop="early_warning_frequency"
                  :rules="[{ required: true, message: '预警频率不能为空' }]"
                >
                  <el-select
                    v-model="tableSelectRow.early_warning_frequency"
                    placeholder=" "
                    :disabled="
                      disablesRuleIdOfEarlyWarningFrequency.has(
                        tableSelectRow.rule_id
                      )
                    "
                  >
                    <el-option
                      v-for="item in warningFrequencySelectOriginList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="14">
                <el-form-item
                  label="预警级别"
                  prop="early_warning_level"
                  :rules="[{ required: true, message: '预警级别不能为空' }]"
                >
                  <el-select
                    v-model="tableSelectRow.early_warning_level"
                    placeholder=" "
                  >
                    <el-option
                      v-for="item in warningLevelList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col span="22">
                <el-form-item label="备注" prop="remark">
                  <el-input
                    type="textarea"
                    :rows="5"
                    v-model="tableSelectRow.remark"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <div class="associat-button">
              <el-button
                type="primary"
                size="small"
                @click="selectTable('ruleForm_11', tableSelectRow.rule_name)"
                >确定</el-button
              >
              <el-button type="primary" size="small" @click="cancle"
                >取消</el-button
              >
            </div>
          </el-form>
        </el-aside>
      </el-container>
    </div>
    <div class="associat-button">
      <el-button type="primary" @click="confirmClick">提交</el-button>
    </div>
  </div>
</template>

<script>
/**
 * 说明:
 * 新增规则时，需要在tabAndTemplateMap增加规则与模版的映射关系。
 * 新增规则时，需要在tabAndOtherInfoMap增加规则与附加信息的映射关系。
 * 新增模板时，需要在templateAndRefMap增加模板与表单的ref名称映射关系。
 */
import MyAxios from "pte-ui/utils/MyAxios";
import _ from "lodash";

export default {
  props: {
    cMeta: Object, //本页面模板json数据Layout对象
    cParentMeta: Object, //父页面模板json数据Layout对象
    cParentParams: Object, //父页面自定义参数与内置参数
    cParentScope: Object //父页面每块区域业务数据
  },
  data() {
    return {
      // ruleForm: { // TODO 未使用
      //   rule_id: "", //规则编号
      //   rule_name: "", //规则名称
      //   rule_condition: "", //规则条件
      //   guarantees_number: "", //担保增加次数大于等于(次)
      //   early_warning_frequency: "", //预警频率
      //   early_warning_level: "", //预警级别
      //   remark: "", //备注
      //   tips2:"",//关键字
      //   tips1:"",//排除关键字
      //   time_scp:"",//时间范围
      //   rule_value:"",//指标取值
      //   rule_tips:"",//预警提示语
      //   rule_sys:"",//来源系统
      //   rule_sco:"",//取值范围
      //   rule_div:"",//预警分类
      //   guarantees_sum:"",//担保增加金额
      //   month_num:"",//N月
      //   effective_status:"",//是否启用
      // },

      warningFrequencyList: [
        { key: "1", value: "1日" },
        { key: "2", value: "10日" },
        // { key: "3", value: "15日" },
        { key: "4", value: "1月" },
        { key: "5", value: "3月" },
        { key: "6", value: "6月" },
        { key: "7", value: "12月" }
      ], //预警频率列表
      warningFrequencyList_hn: [
        { key: "1", value: "1日" },
        { key: "2", value: "10日" },
        { key: "4", value: "1月" }
      ], //预警频率列表(行内)
      warningLevelList: [
        { key: "0", value: "一级预警" },
        { key: "1", value: "二级预警" }
      ], //预警级别列表

      tabAndTemplateMap: new Map([
        // 规则ID和模版ID的映射集合
        ["1000000000001", 1],
        ["1000000000002", 2],
        ["1000000000003", 3],
        ["1000000000004", 4],
        ["1000000000005", 5],
        ["1000000000006", 6],
        ["1000000000007", 7],

        ["YJGZ00022", 1],
        ["YJGZ00024", 1],
        ["YJGZ00068", 1],
        ["YJGZ00069", 1],
        ["YJGZ00011", 2],
        ["YJGZ00055", 2],
        ["YJGZ00012", 3],
        ["YJGZ00056", 3],
        ["YJGZ00017", 4],
        ["YJGZ00013", 5],
        ["YJGZ00057", 5],
        ["YJGZ00014", 6],
        ["YJGZ00058", 6],
        ["YJGZ00018", 8],
        ["YJGZ00019", 8],
        ["YJGZ00042", 8],
        ["YJGZ00061", 8],
        ["YJGZ00065", 8],

        ["YJGZ00073", 9],
        ["YJGZ00074", 9],
        ["YJGZ00075", 9],
        ["YJGZ00076", 9],
        ["YJGZ00077", 9]
      ]),
      tabAndOtherInfoMap: new Map([
        // 规则ID和附加信息的映射集合
        [
          "1000000000001",
          { warningFrequencySelectOrigin: "warningFrequencyList" }
        ],
        [
          "1000000000002",
          { warningFrequencySelectOrigin: "warningFrequencyList" }
        ],
        [
          "1000000000003",
          { warningFrequencySelectOrigin: "warningFrequencyList" }
        ],
        [
          "1000000000004",
          { warningFrequencySelectOrigin: "warningFrequencyList" }
        ],
        [
          "1000000000005",
          { warningFrequencySelectOrigin: "warningFrequencyList" }
        ],
        [
          "1000000000006",
          { warningFrequencySelectOrigin: "warningFrequencyList" }
        ],
        [
          "1000000000007",
          { warningFrequencySelectOrigin: "warningFrequencyList" }
        ],

        ["YJGZ00068", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00069", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00070", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00071", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00072", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00002", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00004", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00005", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00007", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00009", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00010", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00011", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00012", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00013", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00014", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00018", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00019", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00021", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00022", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00023", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00024", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00025", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00026", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00029", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00031", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00032", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00034", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00036", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00039", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00040", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00041", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00042", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00044", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00046", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00048", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00049", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00051", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00053", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00054", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00055", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00056", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00057", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00058", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00061", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00062", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00063", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00064", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00067", { warningFrequencySelectOrigin: "warningFrequencyList" }],
        ["YJGZ00065", { warningFrequencySelectOrigin: "warningFrequencyList" }],

        // test
        [
          "YJGZ00001",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00003",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00006",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00008",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00015",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00016",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00017",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00020",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00027",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00028",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00030",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00033",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00035",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00037",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00038",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00043",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00045",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00047",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00050",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00052",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00059",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00060",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00066",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00073",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00074",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00075",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00076",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ],
        [
          "YJGZ00077",
          { warningFrequencySelectOrigin: "warningFrequencyList_hn" }
        ]
      ]),
      templateAndRefMap: new Map([
        // 模版ID和表单ref的映射集合
        [1, "ruleForm_3"],
        [2, "ruleForm_4"],
        [3, "ruleForm_5"],
        [4, "ruleForm_6"],
        [5, "ruleForm_7"],
        [6, "ruleForm_8"],
        [7, "ruleForm_9"],
        [8, "ruleForm_10"],
        [9, "ruleForm_11"]
      ]),
      originTableData: [], // 预警指标配置列表(初始源数据)
      tableDataTemp: [], // 预警指标配置列表(临时源数据-已确认)
      tableData: [], // 预警指标配置列表(临时源数据-未确认)
      tableViewData: [], // 预警指标配置列表(源数据-表单显示，TODO 单条数据字段不能太多，否则会容易导致组件出现下述bug: 在checkbox切换时出现切换了非当前选择项的checkbox状态)
      currentSelectTab: "", // 当前选择的规则ID
      tableSelectRow: {}, // 当前选择的规则表单数据
      asideIndexMap: new Map([]), // 预警指标配置列表(tableData)的模版信息关系映射集合
      /**
       * 预警指标配置列表(tableData)与模版信息映射关系集合
       * key: rule_id // 如果唯一属性变动，则需要进行改造
       * value: {
       *  tableDataIndex: // 预警指标配置列表(tableData)的位置索引
       *  initEffectiveStatus: // 该规则初始数据的check选中状态
       *  effectiveStatus: // 该规则当前的check选中状态，1=选择、0=未选择
       *  isFormConfirm: // 是否已确认过表单。0=表单未修改过后的情况下未确认(默认)、1=表单修改过后的情况下或者表单未修改过后的情况下已确认、2=表单修改过后的情况下未确认
       * }
       */
      disablesRuleIdOfEarlyWarningFrequency: new Set([
        "YJGZ00068",
        "YJGZ00069",
        "YJGZ00070",
        "YJGZ00071",
        "YJGZ00072",
        "YJGZ00002",
        "YJGZ00004",
        "YJGZ00005",
        "YJGZ00007",
        "YJGZ00009",
        "YJGZ00010",
        "YJGZ00011",
        "YJGZ00012",
        "YJGZ00013",
        "YJGZ00014",
        "YJGZ00018",
        "YJGZ00019",
        "YJGZ00021",
        "YJGZ00022",
        "YJGZ00023",
        "YJGZ00024",
        "YJGZ00025",
        "YJGZ00026",
        "YJGZ00029",
        "YJGZ00031",
        "YJGZ00032",
        "YJGZ00034",
        "YJGZ00036",
        "YJGZ00039",
        "YJGZ00040",
        "YJGZ00041",
        "YJGZ00042",
        "YJGZ00044",
        "YJGZ00046",
        "YJGZ00048",
        "YJGZ00049",
        "YJGZ00051",
        "YJGZ00053",
        "YJGZ00054",
        "YJGZ00055",
        "YJGZ00056",
        "YJGZ00057",
        "YJGZ00058",
        "YJGZ00061",
        "YJGZ00062",
        "YJGZ00063",
        "YJGZ00064",
        "YJGZ00067",
        "YJGZ00065"
      ])
    };
  },
  computed: {
    currentTemplateId() {
      // 当前显示的模版类型
      var TemplateId = this.tabAndTemplateMap.get(this.currentSelectTab);
      if (TemplateId == null || TemplateId == undefined || TemplateId == "") {
        TemplateId = 7;
      }
      return TemplateId;
    },
    // 预警频率数据源
    warningFrequencySelectOriginList() {
      if (this.tabAndOtherInfoMap.has(this.tableSelectRow.rule_id)) {
        return this[
          this.tabAndOtherInfoMap.get(this.tableSelectRow.rule_id)
            .warningFrequencySelectOrigin
        ];
      } else {
        return this.warningFrequencyList;
      }
    }
  },
  created() {
    this.getTableData();
  },
  methods: {
    /**
     * 点击选择触发弹窗，验证输入
     */
    selectTable(ruleFormName, key) {
      this.$refs[ruleFormName].validate(valid => {
        if (valid) {
          this.checkFormHasChange(1, this.tableSelectRow);
          this.$alert("确认成功");
        } else {
          this.$alert("请确认输入是否正确！", "提示", {
            confirmButtonText: "确定",
            type: "warning"
          });
          return false;
        }
      });
    },
    /**
     * 授信方案详情列表
     */
    getTableData() {
      let reqMap = {
        servicecode: "ew3165",
        start: this.currentPage,
        length: this.tableSize
      };
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", reqMap)
        .then(res => {
          if (res && res.code === "200") {
            this.tableData = res.data;
            // console.log(`getTableData tableData ${JSON.stringify(res.data)}`);
            this.originTableData = JSON.parse(JSON.stringify(this.tableData));
            this.tableDataTemp = JSON.parse(JSON.stringify(this.tableData));
            res.data.forEach((item, index) => {
              this.asideIndexMap.set(item.rule_id, {
                tableDataIndex: index,
                initEffectiveStatus: Number(item.effective_status),
                // 初始化toggleRowSelection实现回显时，会导致触发选择多选触发handleSelect导致值被修改，所以提前修改一次。这样再次自动触发时就能恢复为初始值。
                // effectiveStatus: Number(item.effective_status) == 1 ? 0 : Number(item.effective_status),
                effectiveStatus: Number(item.effective_status),
                isFormConfirm: 0
              });

              this.tableViewData.push({
                id: item.rule_id,
                ruleName: item.rule_name,
                index: index
              });
            });
            // console.log(`getTableData tableViewData ${JSON.stringify(this.tableViewData)}`);
            // console.log(`getTableData asideIndexMap ${JSON.stringify(this.asideIndexMap)}`);

            let that = this;
            this.$nextTick(() => {
              that.tableData.forEach((item, index) => {
                // 回显已选择数据
                if (item.effective_status == 1) {
                  // console.log(`getTableData item ${item.rule_id}`);
                  that.$refs.multipleTable.toggleRowSelection(
                    this.tableViewData[index],
                    true
                  );
                }
              });
            });
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 提交表单
     * 规则-check按钮选择变化-提交check状态
     * 规则-表单输入变化-未确认-提示确认弹窗，否则不提交表单变化内容，即使之前确认过也不会进行提交已修改内容。
     * 规则-表单输入变化-已确认-提交修改内容
     * 规则-表单输入无变化-不提交内容
     */
    confirmClick() {
      this.checkFormHasChange(2, this.tableSelectRow); // 检查当前显示的表单

      // console.log(`confirmClick tableData: ${JSON.stringify(this.tableData)}`);
      // console.log(`confirmClick asideIndexMap: ${JSON.stringify(this.asideIndexMap)}`)

      let notConfirmForms = [];
      const saveFormList = [];
      let iterator = this.asideIndexMap.entries();
      for (const item of iterator) {
        let form = {};
        if (item[1].isFormConfirm == 2) {
          notConfirmForms.push(
            this.originTableData[item[1].tableDataIndex].rule_name
          ); // 保存未确认表单名称

          form = JSON.parse(
            JSON.stringify(this.originTableData[item[1].tableDataIndex])
          );
          if (item[1].initEffectiveStatus != item[1].effectiveStatus) {
            Object.assign(form, {
              effective_status: item[1].effectiveStatus + ""
            });
            saveFormList.push(form);
          }
        } else if (item[1].isFormConfirm == 1) {
          form = JSON.parse(
            JSON.stringify(this.tableDataTemp[item[1].tableDataIndex])
          );
          if (item[1].initEffectiveStatus != item[1].effectiveStatus) {
            Object.assign(form, {
              effective_status: item[1].effectiveStatus + ""
            });
            saveFormList.push(form);
          } else {
            saveFormList.push(form);
          }
        } else if (item[1].isFormConfirm == 0) {
          form = JSON.parse(
            JSON.stringify(this.originTableData[item[1].tableDataIndex])
          );
          if (item[1].initEffectiveStatus != item[1].effectiveStatus) {
            Object.assign(form, {
              effective_status: item[1].effectiveStatus + ""
            });
            saveFormList.push(form);
          }
        }
      }
      if (notConfirmForms.length > 0) {
        this.$confirm(
          `部分规则表单${JSON.stringify(
            notConfirmForms
          )}有修改，但是未进行确认！请确认是否丢弃这些表单的修改？`,
          "提示信息",
          {
            type: "warning"
          }
        )
          .then(() => {
            if (saveFormList.length == 0) {
              this.$alert(
                "请先至少修改一个规则的启用状态或者表单内容后再进行提交！",
                "提示",
                { confirmButtonText: "确定", type: "warning" }
              );
            } else {
              this.$dataBus.bindCallBackMethod(
                this,
                this.postSaveForms,
                saveFormList
              );
              this.$dialog.open({
                that: this,
                title: "总行领导授权",
                toRequest: {
                  url: "@Empower",
                  method: "get",
                  params: {}
                },
                width: "50%"
              });
            }
          })
          .catch(() => {
            console.log(`cancel submit!`);
          });
        return;
      } else if (saveFormList.length == 0) {
        this.$alert(
          "请先至少修改一个规则的启用状态或者表单内容后再进行提交！",
          "提示",
          { confirmButtonText: "确定", type: "warning" }
        );
      } else {
        this.$dataBus.bindCallBackMethod(
          this,
          this.postSaveForms,
          saveFormList
        );
        this.$dialog.open({
          that: this,
          title: "总行领导授权",
          toRequest: {
            url: "@Empower",
            method: "get",
            params: {}
          },
          width: "50%"
        });
      }
    },
    /**
     * 调用保存表单API
     */
    postSaveForms(list) {
      var succ_tips = " ";
      let that = this;
      var succ = 1;
      for (let index = 0; index < list.length; index++) {
        const element = list[index];
        const id = element.rule_id;
        const effective_status = element.effective_status;
        let sendMap = {
          servicecode: "ew3167",
          rule_id: element.rule_id,
          rule_name: element.rule_name,
          rule_condition: element.rule_condition,
          guarantees_number: element.guarantees_number,
          early_warning_frequency: element.early_warning_frequency,
          early_warning_level: element.early_warning_level,
          remark: element.remark,
          effective_status: element.effective_status,

          tips2: element.tips2,
          tips1: element.tips1,
          time_scp: element.time_scp,
          rule_value: element.rule_value,
          rule_tips: element.rule_tips,
          rule_sys: element.rule_sys,
          rule_sco: element.rule_sco,
          rule_div: element.rule_div,
          guarantees_sum: element.guarantees_sum,
          month_num: element.month_num
        };
        MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", sendMap)
          .then(res => {
            console.log("res.code:", res.code);

            if (res && res.code === "200") {
              // 保存已修改数据
              let param = this.asideIndexMap.get(id);
              this.asideIndexMap.set(
                id,
                Object.assign(param, {
                  initEffectiveStatus: Number(effective_status),
                  isFormConfirm: 0
                })
              );
              this.originTableData[param.tableDataIndex] = JSON.parse(
                JSON.stringify(element)
              );
              this.tableDataTemp[param.tableDataIndex] = JSON.parse(
                JSON.stringify(element)
              );
              this.tableData[param.tableDataIndex] = JSON.parse(
                JSON.stringify(element)
              );
              // console.log(`postSaveForms asideIndexMap ${JSON.stringify(this.asideIndexMap)}`);

              succ_tips = succ_tips
                .concat(" ")
                .concat(succ)
                .concat("、")
                .concat(element.rule_name)
                .concat("\n");
              succ++;

              //console.log("succ_tips:"+succ_tips);
              //that.$alert(`${element.rule_name}表单提交成功！`);

              //循环完毕抛出提示
              if (index == list.length - 1) {
                that.$alert(`${succ_tips}表单提交成功！`);
              }
            }
          })
          .catch(err => {
            console.error(err);

            //循环完毕抛出提示
            if (index == list.length - 1) {
              that.$alert(`${succ_tips}表单提交成功！`);
            }
          });
      }
    },
    /**
     * 关闭授信方案弹窗
     */
    cancle() {
      this.$dialog.close();
    },
    /**
     * 选择规则
     */
    async handleCurrentChange(currentRow, oldCurrentRow) {
      if (oldCurrentRow == null || oldCurrentRow == undefined) {
        console.log(`handleCurrentChange oldCurrentRow is null`);
      } else {
        this.checkFormHasChange(2, this.tableData[oldCurrentRow.index]); // 检查切换前表单
      }
      this.tableSelectRow = this.tableData[currentRow.index];
      this.currentSelectTab = currentRow.id;
      console.log("currentRow.id", currentRow.id);

      // 增加表单校验
      let tabId = this.tabAndTemplateMap.get(currentRow.id);
      this.$nextTick(() => {
        if (this.templateAndRefMap.has(tabId)) {
          console.log("form ref", this.templateAndRefMap.get(tabId));
          this.$refs[this.templateAndRefMap.get(tabId)].clearValidate();
          this.$refs[this.templateAndRefMap.get(tabId)].validate();
        } else {
          // 默认情况
          console.log("default form ref 7");
          this.$refs[this.templateAndRefMap.get(7)].clearValidate();
          this.$refs[this.templateAndRefMap.get(7)].validate();
        }
      });
    },
    /**
     * 检查表单内容是否修改而且已确认，并登记提交数据。
     * 确认场景指表单确认按钮点击的处理场景，非确认场景需要检查对比上一次已经确认过的数据。
     * @param type 处理场景，1=确认场景、2=非确认场景
     * @param param 表单数据
     */
    async checkFormHasChange(type, param) {
      // console.log(`checkFormHasChange: ${JSON.stringify(param)}`);
      if (param == null || param == undefined) {
        console.log(`checkFormHasChange param is null`);
        return;
      }

      let id = param.rule_id;
      if (!this.asideIndexMap.has(id)) {
        console.log(`checkFormHasChange: asideIndexMap has't this key: ${id}`);
        return;
      }

      let value = this.asideIndexMap.get(id);
      const tableIndex = value.tableDataIndex;
      const originDataItem = this.originTableData[tableIndex];
      const dataItem = this.tableData[tableIndex];
      const dataTempItem = this.tableDataTemp[tableIndex];
      if (type == 1) {
        this.tableDataTemp[tableIndex] = JSON.parse(
          JSON.stringify(this.tableData[tableIndex])
        );
        this.asideIndexMap.set(id, Object.assign(value, { isFormConfirm: 1 }));
      } else if (type == 2) {
        if (JSON.stringify(originDataItem) != JSON.stringify(dataItem)) {
          if (JSON.stringify(dataTempItem) == JSON.stringify(dataItem)) {
            // 当前的表单与已确认表单相同，认为已经确认过
            if (
              JSON.stringify(dataTempItem) == JSON.stringify(originDataItem)
            ) {
              // 已经提交过
              this.asideIndexMap.set(
                id,
                Object.assign(value, { isFormConfirm: 0 })
              );
            } else {
              // 还未提交过
              this.asideIndexMap.set(
                id,
                Object.assign(value, { isFormConfirm: 1 })
              );
            }
          } else {
            this.asideIndexMap.set(
              id,
              Object.assign(value, { isFormConfirm: 2 })
            );
          }
        } else {
          // continue
        }
      }
    },
    /**
     * 当用户手动勾选数据行的 Checkbox 时触发的事件
     * @param {*} selection
     * @param {*} row
     */
    handleSelect(selection, row) {
      // console.log(`handleSelect table ${JSON.stringify(this.tableData)}`)
      // console.log(`handleSelect row ${JSON.stringify(row)}`);

      const id = row.id;
      if (this.asideIndexMap.has(id)) {
        let item = this.asideIndexMap.get(id);
        const effectiveStatusValue = item.effectiveStatus == 1 ? 0 : 1;
        const newItem = Object.assign(item, {
          effectiveStatus: effectiveStatusValue
        });
        this.asideIndexMap.set(id, newItem);
        // console.log(`handleSelect asideIndexMap ${JSON.stringify(this.asideIndexMap)}`);

        // this.tableData[row.index].effective_status = `${effectiveStatusValue}`;
        // console.log(`tableData ${JSON.stringify(this.tableData)}`)
      } else {
        console.log(`handleSelect: asideIndexMap has't this key: ${id}`);
      }
    }
  }
};
</script>
<style lang="css" scoped>
.page_content {
  padding-bottom: 20px;
  box-sizing: border-box;
  height: calc(100% - 40px);
}

.el-select,
.el-input_inner {
  width: 100%;
}

.el-col-4 {
  padding: 11px;
  width: 15.66667%;
}

.associat-transfer {
  padding: 33px !important;
  text-align: center;
}

.associat-button {
  padding: 10px;
  text-align: center;
}

.container-theme {
  padding: 30px 0px 5px 30px;
  height: 100%;
  box-sizing: border-box;
}

.el-header {
  background-color: grb(238 241 246);
}

.left {
  margin: 150px 0px 5px 15px;
}

.right {
  margin: 0px 0px 5px 15px;
}

.footer {
  text-align: center;
  padding: 54px 0px 0px 0px;
}

.el-table .select-row {
  background: #ecf5ff;
}

.flex_row_center {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.table_name {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0px 12px;
  box-sizing: border-box;
}
.table_name_left {
  height: 36px;
  width: 120px;
  border-top: 1px solid #dcdfe6;
  border-left: 1px solid #dcdfe6;
  border-right: 1px solid #dcdfe6;
}
.table_name_right {
  height: 36px;
  flex-grow: 1;
  border-top: 1px solid #dcdfe6;
  border-right: 1px solid #dcdfe6;
}
</style>
