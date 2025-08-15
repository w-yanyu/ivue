<template>
    <div>
        <el-Card>
            <h4 slot="title">组合规则管理</h4>
            <el-form
                :model="condition"
                ref="condition"
                :rules="conditionRule"
                :inline="true"
                label-width="80px"
            >
                <el-row>
                    <el-form-item label="规则ID" prop="rcrCruleId">
                        <el-input placeholder v-model.trim="condition.rcrCruleId" clearable />
                    </el-form-item>
                    <el-form-item label="规则名称" prop="rcrCruleName">
                        <el-input placeholder v-model.trim="condition.rcrCruleName" clearable />
                    </el-form-item>

                    <el-form-item label="规则代码" prop="rcrCruleCode">
                        <el-input placeholder v-model.trim="condition.rcrCruleCode" clearable />
                    </el-form-item>
                    <el-form-item label="规则类型" prop="rcrCruleType">
                        <el-select v-model="condition.rcrCruleType" placeholder clearable>
                            <el-option label="TR-实时决策规则" value="TR">
                                <span>TR-实时决策规则</span>
                            </el-option>
                            <el-option label="RR-实时指标加工规则" value="RR">
                                <span>RR-实时指标加工规则</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="margin-left: 80%;">
                        <el-button type="primary" @click="fetch(true)">查询</el-button>
                        <el-button @click="$refs.condition.resetFields()">重置</el-button>
                    </el-form-item>
                </el-row>

                <el-row>
                    <hr color="#EDEDED" size="1" />
                    <el-button type="primary" @click="showAddModal" plain="true">新增</el-button>
                    <!-- 表格 -->
                    <my-pageable
                        :tableHeader="columns"
                        :tableData="data"
                        sort-events="handleSort"
                        filter-events="filterHandler"
                        click-events="handleClick"
                        :max_height="425"
                        :height="425"
                        :pager="page"
                        :currentPage="page.pageNum"
                        :pageSize="page.pageSize"
                        :total="page.total"
                        @handleSizeChange="handleSizeChange"
                        @handleCurrentChange="changePagination"
                        :paginaion="true"
                    />
                </el-row>
            </el-form>
            <!-- 新增修改对话框 -->
            <el-dialog
                v-model="editModel"
                :visible.sync="dialogVisible"
                :close-on-click-modal="false"
                :modal="false"
                :title="status === '0' ? '新增' : (status === '3' ? '查看':'编辑') "
                v-dialogDrag="{dialogDrag: true}"
            >
                <el-form
                    :model="formValidate"
                    ref="formValidate"
                    :inline="true"
                    label-width="120px"
                    :hide-required-asterisk="status === '3'"
                    :rules="ruleValidate"
                >
                    <el-form-item
                        label-width="120px"
                        v-if="status !== '0'"
                        label="规则id"
                        prop="rcrCruleId"
                    >
                        <el-col :span="24">
                            <el-input :disabled="true" v-model="formValidate.rcrCruleId" />
                        </el-col>
                    </el-form-item>
                    <el-form-item label-width="120px" label="规则名称" prop="rcrCruleName">
                        <el-col :span="24">
                            <el-input
                                :disabled="status === '3'"
                                v-model="formValidate.rcrCruleName"
                                clearable
                            />
                        </el-col>
                    </el-form-item>
                    <el-form-item label-width="120px" label="规则代码" prop="rcrCruleCode">
                        <el-col :span="22">
                            <el-input
                                :disabled="status === '1' || status === '3'"
                                v-model="formValidate.rcrCruleCode"
                                clearable
                            />
                        </el-col>
                    </el-form-item>
                    <el-form-item label-width="100px" label="规则类型" prop="rcrCruleType">
                        <el-col :span="24">
                            <el-select
                                :disabled="status === '1' || status === '3'"
                                v-model="formValidate.rcrCruleType"
                                placeholder
                                clearable
                            >
                                <el-option label="TR-实时决策规则" value="TR">
                                    <span>TR-实时决策规则</span>
                                </el-option>
                                <el-option label="RR-实时指标加工规则" value="RR">
                                    <span>RR-实时指标加工规则</span>
                                </el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item v-if="status !== '0'" label="规则版本" prop="rcrCruleVersion">
                        <el-input :disabled="true" v-model="formValidate.rcrCruleVersion" />
                    </el-form-item>
                    <el-form-item v-if="status === '3'" label="创建人" prop="rcrCreateUser">
                        <el-col :span="24">
                            <el-input :disabled="true" v-model="formValidate.rcrCreateUser" />
                        </el-col>
                    </el-form-item>
                    <el-form-item v-if="status === '3'" label="创建时间" prop="rcrCreateTime">
                        <el-date-picker
                            style="width:180px"
                            type="datetime"
                            :disabled="true"
                            v-model="formValidate.rcrCreateTime"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item v-if="status === '3'" label="最后修改人" prop="rcrUpdateUser">
                        <el-input :disabled="true" v-model="formValidate.rcrUpdateUser" />
                    </el-form-item>
                    <el-form-item v-if="status === '3'" label="最后修改时间" prop="rcrUpdateTime">
                        <el-date-picker
                            style="width:180px"
                            type="datetime"
                            :disabled="true"
                            v-model="formValidate.rcrUpdateTime"
                        ></el-date-picker>
                    </el-form-item>

                    <el-row>
                        <el-col>
                            <el-form-item label="备注" prop="rcrDescription">
                                <el-input
                                    style="width:500px"
                                    :disabled="status === '3'"
                                    type="textarea"
                                    :autosize="{ minRows: 6, maxRows: 8}"
                                    maxlength="500"
                                    v-model="formValidate.rcrDescription"
                                    show-word-limit
                                    clearable
                                />
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <span
                        display="block"
                        style="text-align: center;display:block;"
                        v-if="status !== '3'"
                    >说明：基础条件内关系为且，或者条件内关系为且，基础条件和或者条件关系为且，或者条件与或者条件关系为或</span>
                    <el-row>
                        <el-col v-if="status !== '3'" span="24">
                            <el-form-item label=" ">
                                <el-button
                                    :disabled="status === '3'"
                                    type="primary"
                                    @click="showAddAtomModal('add','0')"
                                >添加基础条件</el-button>
                            </el-form-item>
                        </el-col>
                        <el-col v-if="status !== '3'" span="24">
                            <el-form-item label=" ">
                                <el-button
                                    :disabled="status === '3'"
                                    type="primary"
                                    @click="addOptionTable"
                                >添加或者条件</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div
                    v-for="(item,index) in options"
                    :key="index"
                    v-if="reset"
                    style="padding: 0 35px;"
                >
                    <el-form v-if="index != 0" style="margin-top:12px;" class="optionTableLabel">
                        <el-row>
                            <el-col span="12">
                                <el-form-item :label="`或者条件${index}`" :label-width="84">
                                    <el-button
                                        type="primary"
                                        :disabled="status==='3'"
                                        @click="showAddAtomModal('add',index)"
                                    >添加</el-button>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <el-button
                                        type="primary"
                                        :disabled="status==='3'"
                                        @click="delOptionAtom(index)"
                                    >删除或者条件</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <my-pageable
                        :tableHeader="columnsBase"
                        :index="index"
                        :tableData="item.children"
                        sort-events="handleSort"
                        filter-events="filterHandler"
                        click-events="handleClick"
                    />
                    <!--          <t-pageable :columns="columnsBase" :index="index" :data="item.children" :loading="loading" :addable="false" :deleteable="false" :paginaion="false"></t-pageable>-->
                </div>
                <!-- 弹窗底部操作 -->
                <div slot="footer">
                    <el-button
                        type="primary"
                        v-if="status == '0'||status == '1' "
                        @click="dialogVisible = false"
                    >取消</el-button>
                    <el-button type="primary" v-if="status == '1'" @click="authConfirm('edit')">保存</el-button>
                    <el-button
                        type="primary"
                        v-else-if="status == '0'"
                        @click="authConfirm('add')"
                    >保存</el-button>
                    <!--
          <el-button type="primary" v-else-if="status == '2'" @click="authConfirm('version')">发布新版本</el-button>
                    -->
                </div>
            </el-dialog>
            <!-- 原子规则配置 -->
            <el-dialog
                class="my-dialog"
                v-model="showSetAtomModal"
                :close-on-click-modal="false"
                :modal="false"
                :visible.sync="dialogVisibleAtmo"
                title="原子规则配置"
                v-dialogDrag="{dialogDrag: true}"
                :modal-append-to-body="false"
            >
                <el-form
                    :model="formAmoutValidate"
                    :form="formAmoutValidate"
                    ref="formAmoutValidate"
                    :rules="ruleAmoutValidate"
                >
                    <!-- <el-form-item label="左表达式来源" prop="left">
            <Select v-model="formAmoutValidate.Source" :disabled="status==='3'">
              <Option value="">空</Option>
              <Option value="事实" @click.native="onchangeSource('事实')">事实</Option>
              <Option value="聚合指标" @click.native="onchangeSource('聚合指标')">聚合指标</Option>
              <Option value="集合指标" @click.native="onchangeSource('集合指标')">集合指标</Option>
            </Select>@change="(value,selectedData) => changeLeft(value,selectedData)"
                    </el-form-item>-->

                    <el-form-item :label-width="formLabelWidth" label="左表达式" prop="leftList">
                        <el-cascader
                            :options="dataLeft"
                            :key="cascaderKey"
                            v-model="formAmoutValidate.leftList"
                            show-all-levels="false"
                            :props="{ expandTrigger: 'hover' }"
                            @change="changeLeft"
                            filterable
                            :label-width="formLabelWidth"
                        ></el-cascader>
                    </el-form-item>

                    <el-form-item :label-width="formLabelWidth" label="操作符" prop="operator">
                        <el-select
                            :label-width="formLabelWidth"
                            v-model="formAmoutValidate.operator"
                            @change="handleOperator"
                            :label-in-value="true"
                            :disabled="status==='3'||formAmoutValidate.dataType == 'Boolean'? true : false"
                        >
                            <el-option value label="空">空</el-option>
                            <el-option value="==" label="等于">等于</el-option>
                            <el-option value="!=" label="不等于">不等于</el-option>
                            <el-option value=">" label="大于">大于</el-option>
                            <el-option value=">=" label="大于等于">大于等于</el-option>
                            <el-option value="<" label="小于">小于</el-option>
                            <el-option value="<=" label="小于等于">小于等于</el-option>
                            <el-option value="IN" label="在...范围内">在...范围内</el-option>
                            <el-option value="NOT_IN" label="不在...范围内">不在...范围内</el-option>
                            <el-option value="BETWEEN" label="在...与...之间">在...与...之间</el-option>
                            <el-option
                                value="LIKE"
                                :disabled="formAmoutValidate.dataType == 'Int'||formAmoutValidate.dataType == 'Decimal' ? true : false"
                                label="包含"
                            >包含</el-option>
                            <el-option
                                value="NOT_LIKE"
                                :disabled="formAmoutValidate.dataType == 'Int'||formAmoutValidate.dataType == 'Decimal' ? true : false"
                                label="不包含"
                            >不包含</el-option>
                            <el-option
                                value="STARTSWITH"
                                :disabled="formAmoutValidate.dataType == 'Int'||formAmoutValidate.dataType == 'Decimal' ? true : false"
                                label="开头是"
                            >开头是</el-option>
                            <el-option
                                value="NOT_STARTSWITH"
                                :disabled="formAmoutValidate.dataType == 'Int'||formAmoutValidate.dataType == 'Decimal' ? true : false"
                                label="开头不是"
                            >开头不是</el-option>
                            <el-option
                                value="ENDSWITH"
                                :disabled="formAmoutValidate.dataType == 'Int'||formAmoutValidate.dataType == 'Decimal' ? true : false"
                                label="结尾是"
                            >结尾是</el-option>
                            <el-option
                                value="NOT_ENDSWITH"
                                :disabled="formAmoutValidate.dataType == 'Int'||formAmoutValidate.dataType == 'Decimal' ? true : false"
                                label="结尾不是"
                            >结尾不是</el-option>
                            <el-option
                                value="EXISTS"
                                :disabled="formAmoutValidate.dataType == 'String'? false : true"
                                label="存在"
                            >存在</el-option>
                            <el-option
                                value="NOT_EXISTS"
                                :disabled="formAmoutValidate.dataType == 'String' ? false : true"
                                label="不存在"
                            >不存在</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label-width="formLabelWidth" label="右表达式类型" prop="rightType">
                        <el-select
                            :label-width="formLabelWidth"
                            v-model="formAmoutValidate.rightType"
                            :label-in-value="true"
                            :disabled="status==='3'||formAmoutValidate.dataType == 'Boolean'? true : false"
                        >
                            <el-option
                                :label-width="formLabelWidth"
                                label="常量"
                                value="Constant"
                                :disabled="formAmoutValidate.operator == 'EXISTS'||formAmoutValidate.operator == 'NOT_EXISTS'"
                            >常量</el-option>
                            <el-option :label-width="formLabelWidth" label="变量" value="Variable">变量</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label-width="formLabelWidth" label="右表达式" prop="righDesc">
                        <div v-if="formAmoutValidate.rightType == 'Constant'">
                            <el-autocomplete
                                v-if="(formAmoutValidate.operator == '=='||formAmoutValidate.operator == '!=')&&this.reference&&this.reference !=''"
                                :disabled="status==='3'|| formAmoutValidate.dataType === 'Boolean'? true : false"
                                class="inline-input"
                                v-model="formAmoutValidate.right"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入内容"
                                @select="handleSelect"
                                clearable
                            ></el-autocomplete>

                            <el-autocomplete
                                v-if="(formAmoutValidate.operator == '=='||formAmoutValidate.operator == '!=')&&(!this.reference||this.reference == '')"
                                :disabled="status==='3'|| formAmoutValidate.dataType === 'Boolean'? true : false"
                                class="inline-input"
                                v-model="formAmoutValidate.right"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入内容"
                                @select="handleSelect"
                                clearable
                            ></el-autocomplete>

                            <!-- 第一种 -->
                            <el-autocomplete
                                v-if="formAmoutValidate.operator == '>'||formAmoutValidate.operator == '>='||formAmoutValidate.operator == '<'||formAmoutValidate.operator == '<='"
                                :disabled="status==='3'|| formAmoutValidate.dataType === 'Boolean'? true : false"
                                class="inline-input"
                                v-model="formAmoutValidate.right"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入内容"
                                @select="handleSelect"
                                clearable
                            ></el-autocomplete>

                            <!-- 第三种 -->
                            <el-autocomplete
                                v-if="formAmoutValidate.operator == 'LIKE'||formAmoutValidate.operator == 'NOT_LIKE'||formAmoutValidate.operator == 'STARTSWITH'||formAmoutValidate.operator == 'NOT_STARTSWITH'||formAmoutValidate.operator == 'ENDSWITH'||formAmoutValidate.operator == 'NOT_ENDSWITH'"
                                :disabled="status==='3'|| formAmoutValidate.dataType === 'Boolean'? true : false"
                                class="inline-input"
                                v-model="formAmoutValidate.right"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入内容"
                                @select="handleSelect"
                                clearable
                            ></el-autocomplete>
                        </div>
                        <div
                            v-if="(formAmoutValidate.operator == '=='||formAmoutValidate.operator == '!=')&&formAmoutValidate.rightType == 'Variable'&&formAmoutValidate.dataType == 'String'"
                        >
                            <el-cascader
                                :options="dataFilterRight"
                                :key="cascaderKey"
                                v-model="formAmoutValidate.rightList"
                                @change="changeRight1"
                                filterable
                                :props="{ expandTrigger: 'hover' }"
                                :disabled="status==='3'|| formAmoutValidate.dataType === 'Boolean'? true : false"
                            ></el-cascader>
                        </div>
                        <div
                            style="display: flex"
                            v-if="(formAmoutValidate.operator == '=='||formAmoutValidate.operator == '!=')&&formAmoutValidate.rightType == 'Variable'&&(formAmoutValidate.dataType == 'Int'||formAmoutValidate.dataType == 'Decimal')"
                        >
                            <el-cascader
                                :options="dataFilterRight"
                                :key="cascaderKey"
                                v-model="formAmoutValidate.rightList"
                                @change="changeRight1"
                                :props="{ expandTrigger: 'hover' }"
                                filterable
                                :disabled="status==='3'|| formAmoutValidate.dataType === 'Boolean'? true : false"
                            ></el-cascader>
                            <el-select
                                style="flex:1"
                                v-model="formAmoutValidate.rightSelect"
                                :disabled="status==='3'||formAmoutValidate.dataType == 'Boolean'? true : false"
                            >
                                <el-Option value="+">+</el-Option>
                                <el-Option value="-">-</el-Option>
                                <el-Option value="*">*</el-Option>
                                <el-Option value="/">/</el-Option>
                            </el-select>

                            <el-autocomplete
                                style="flex:1"
                                :disabled="status==='3'|| formAmoutValidate.dataType === 'Boolean'? true : false"
                                v-model="formAmoutValidate.right3"
                                clearable
                                class="inline-input"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入内容"
                                @select="handleSelect3"
                            ></el-autocomplete>
                        </div>
                        <!-- 第四种 -->
                        <div
                            v-if="formAmoutValidate.rightType == 'Variable'&&(formAmoutValidate.operator == 'LIKE'||formAmoutValidate.operator == 'NOT_LIKE'||formAmoutValidate.operator == 'STARTSWITH'||formAmoutValidate.operator == 'NOT_STARTSWITH'||formAmoutValidate.operator == 'ENDSWITH'||formAmoutValidate.operator == 'NOT_ENDSWITH')"
                        >
                            <el-cascader
                                :options="dataFilterRight"
                                :key="cascaderKey"
                                v-model="formAmoutValidate.rightList"
                                @change="changeRight1"
                                :props="{ expandTrigger: 'hover' }"
                                filterable
                                :disabled="status==='3'|| formAmoutValidate.dataType === 'Boolean'? true : false"
                            ></el-cascader>
                        </div>
                        <!-- 第五种 -->
                        <div
                            v-if="formAmoutValidate.rightType == 'Constant'&&formAmoutValidate.operator == 'BETWEEN'"
                            style="display:flex"
                        >
                            <el-input
                                style="flex:1;margin-right:8px"
                                :disabled="status==='3'|| formAmoutValidate.dataType === 'Boolean'? true : false"
                                v-model="formAmoutValidate.right"
                                clearable
                            />
                            <el-autocomplete
                                style="flex:1"
                                :disabled="status==='3'|| formAmoutValidate.dataType === 'Boolean'? true : false"
                                v-model="formAmoutValidate.right1"
                                class="inline-input"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入内容"
                                @select="handleSelect1"
                                clearable
                            ></el-autocomplete>
                        </div>
                        <!-- 第六种 -->
                        <div
                            v-if="formAmoutValidate.rightType == 'Variable'&&formAmoutValidate.operator == 'BETWEEN'"
                            style="display:flex"
                        >
                            <el-cascader
                                style="flex:1;margin-right:8px"
                                :options="dataFilterRight"
                                :key="cascaderKey"
                                :props="{ expandTrigger: 'hover' }"
                                v-model="formAmoutValidate.rightList1"
                                @change="changeRight1"
                                filterable
                                :disabled="status==='3'|| formAmoutValidate.dataType === 'Boolean'? true : false"
                            ></el-cascader>
                            <el-cascader
                                style="flex:1;"
                                :options="dataFilterRight"
                                :key="cascaderKey"
                                :props="{ expandTrigger: 'hover' }"
                                v-model="formAmoutValidate.rightList"
                                @change="changeRight"
                                filterable
                                :disabled="status==='3'|| formAmoutValidate.dataType === 'Boolean'? true : false"
                            ></el-cascader>
                        </div>
                        <!-- 第二种 -->
                        <div
                            style="display:flex;"
                            v-if="formAmoutValidate.rightType == 'Variable' && (formAmoutValidate.dataType == 'Int' || formAmoutValidate.dataType == 'Decimal') && (formAmoutValidate.operator == '>'||formAmoutValidate.operator == '>='||formAmoutValidate.operator == '<'||formAmoutValidate.operator == '<=')"
                        >
                            <el-cascader
                                style="flex:1;margin-right:8px"
                                :options="dataFilterRight"
                                :key="cascaderKey"
                                :props="{ expandTrigger: 'hover' }"
                                v-model="formAmoutValidate.rightList"
                                @change="changeRight"
                                filterable
                                :disabled="status==='3'|| formAmoutValidate.dataType === 'Boolean'? true : false"
                            ></el-cascader>
                            <el-select
                                style="flex:1"
                                v-model="formAmoutValidate.rightSelect"
                                :disabled="status==='3'||formAmoutValidate.dataType == 'Boolean'? true : false"
                            >
                                <el-Option value="+">+</el-Option>
                                <el-Option value="-">-</el-Option>
                                <el-Option value="*">*</el-Option>
                                <el-Option value="/">/</el-Option>
                            </el-select>
                            <el-autocomplete
                                style="flex:1;"
                                clearable
                                v-model="formAmoutValidate.right"
                                class="inline-input"
                                :fetch-suggestions="querySearch"
                                placeholder="请输入内容"
                                @select="handleSelect"
                            ></el-autocomplete>
                        </div>
                        <div
                            style="display:flex;"
                            v-if="formAmoutValidate.rightType == 'Variable' && formAmoutValidate.dataType == 'String' && (formAmoutValidate.operator == '>'||formAmoutValidate.operator == '>='||formAmoutValidate.operator == '<'||formAmoutValidate.operator == '<=')"
                        >
                            <el-cascader
                                style="flex:1;margin-right:8px"
                                :options="dataFilterRight"
                                :props="{ expandTrigger: 'hover' }"
                                :key="cascaderKey"
                                v-model="formAmoutValidate.rightList1"
                                :render-format="format"
                                @change="changeRight1"
                                filterable
                                :disabled="status==='3'|| formAmoutValidate.dataType === 'Boolean'? true : false"
                            ></el-cascader>
                            <!-- <el-input style="flex:1;"    v-model="formAmoutValidate.right"/> -->
                        </div>
                        <!-- 第七种 -->
                        <div
                            v-if="formAmoutValidate.rightType == 'Constant'&&(formAmoutValidate.operator == 'IN'||
              formAmoutValidate.operator == 'NOT_IN')"
                        >
                            <div
                                v-for="(item,index) in rightInputList"
                                :key="index"
                                style="display:flex;margin-top: 4px"
                            >
                                <el-autocomplete
                                    v-model="rightInputList[index]"
                                    style="flex:1;margin-right:8px"
                                    :disabled="status==='3'|| formAmoutValidate.dataType === 'Boolean'? true : false"
                                    class="inline-input"
                                    :fetch-suggestions="querySearch"
                                    placeholder="请输入内容"
                                    @select="changeCurVal($event,index)"
                                    clearable
                                ></el-autocomplete>

                                <el-button
                                    :disabled="index==0"
                                    style="width: 62px;margin-right:4px"
                                    type="error"
                                    @click="rightInputList.splice(index,1)"
                                >删除</el-button>
                                <el-button
                                    style="width: 62px;"
                                    type="primary"
                                    v-if="index == rightInputList.length-1"
                                    @click="rightInputList.push('')"
                                >添加</el-button>
                            </div>
                        </div>
                        <!-- 第八种 -->
                        <div
                            v-if="formAmoutValidate.rightType == 'Variable'&&(formAmoutValidate.operator == 'IN'||formAmoutValidate.operator == 'NOT_IN')"
                        >
                            <div
                                v-for="(item,index) in rightSelectList"
                                :key="index"
                                style="display:flex;margin-top: 4px"
                            >
                                <el-cascader
                                    style="flex:1;margin-right:8px"
                                    :options="dataFilterRight"
                                    :key="cascaderKey"
                                    :props="{ expandTrigger: 'hover' }"
                                    :value="item.values"
                                    :render-format="format"
                                    @change="(val,selectedData) => changeRight2(val,selectedData,index)"
                                    filterable
                                    :disabled="status==='3'|| formAmoutValidate.dataType === 'Boolean'? true : false"
                                ></el-cascader>
                                <el-button
                                    :disabled="index==0"
                                    style="width: 62px;margin-right:4px"
                                    type="error"
                                    @click="rightSelectList.splice(index,1)"
                                >删除</el-button>
                                <el-button
                                    style="width: 62px;"
                                    type="primary"
                                    v-if="index == rightSelectList.length-1"
                                    @click="rightSelectList.push({value: '',label:'',values:[]})"
                                >添加</el-button>
                            </div>
                        </div>
                        <div
                            v-if="(formAmoutValidate.operator == 'EXISTS'||formAmoutValidate.operator == 'NOT_EXISTS')"
                        >
                            <el-cascader
                                style="flex:1;margin-right:8px"
                                :options="selectCollectionCode"
                                :key="cascaderKey"
                                :props="{ expandTrigger: 'hover' }"
                                v-model="formAmoutValidate.rightList1"
                                :render-format="format"
                                @change="(val,selectedData) => changeRight3(val,selectedData,index)"
                                filterable
                                :disabled="status==='3'|| formAmoutValidate.dataType === 'Boolean'? true : false"
                            ></el-cascader>
                        </div>
                        <!-- <Select   v-if="(formAmoutValidate.operator == 'EXISTS'||formAmoutValidate.operator == 'NOT_EXISTS')"  :disabled="status==='3'|| formAmoutValidate.dataType === 'Boolean'? true : false"  v-model="formAmoutValidate.right">
              <Option v-for="(item,index) in this.selectCollectionCode" :key="index" :value="item.value" @click.native="changeSelect(item)">{{item.label}}</Option>
                        </Select>-->
                    </el-form-item>
                </el-form>
                <div slot="footer">
                    <el-button @click="dialogVisibleAtmo = false">取消</el-button>
                    <el-button v-if="status != '3'" type="primary" @click="addAmout()">确定</el-button>
                </div>
            </el-dialog>
            <!-- 选择做左表达实 -->
            <el-dialog
                :close-on-click-modal="false"
                v-model="showSsModal"
                title="选择左表达式-事实"
                width="900"
            >
                <el-form :model="formSsValidate" ref="formSsValidate" :rules="ruleSsValidate">
                    <Row>
                        <MyCol>
                            <el-form-item label="事实名称" prop="rfFactName">
                                <el-input
                                    :maxlength="100"
                                    placeholder="请输入事实名称"
                                    v-model.trim="formSsValidate.rfFactName"
                                />
                            </el-form-item>
                        </MyCol>
                        <MyCol>
                            <el-form-item label="事实代码" prop="rfFactCode">
                                <el-input
                                    :maxlength="40"
                                    placeholder="请输入事实代码"
                                    v-model.trim="formSsValidate.rfFactCode"
                                />
                            </el-form-item>
                        </MyCol>
                    </Row>
                    <Row>
                        <MyCol>
                            <el-form-item label="事实属性名称" prop="rfFieldName">
                                <el-input
                                    :maxlength="40"
                                    placeholder="请输入事实属性名称"
                                    v-model.trim="formSsValidate.rfFieldName"
                                />
                            </el-form-item>
                        </MyCol>
                        <MyCol>
                            <el-form-item label="事实属性代码	" prop="rfFieldCode">
                                <el-input
                                    :maxlength="40"
                                    placeholder="请输入事实属性代码"
                                    v-model.trim="formSsValidate.rfFieldCode"
                                />
                            </el-form-item>
                        </MyCol>
                        <MyCol>
                            <el-form-item label>
                                <el-button type="primary" @click="fetchSs(true)">查询</el-button>
                            </el-form-item>
                        </MyCol>
                    </Row>
                </el-form>
                <t-pageable
                    :columns="columns1"
                    :pageSizeOpts="[5,10,40,80,100]"
                    :data="data1"
                    :loading="loading1"
                    :addable="false"
                    :deleteable="false"
                    :paginaion="true"
                    v-on:paginationchange="changePagination1"
                    :_pagenum="page1.pageNum"
                    :_pagesize="page1.pageSize"
                    :_total="page1.total"
                ></t-pageable>
                <div solt="footer"></div>
            </el-dialog>

            <!-- 选择做左表达聚合-->
            <el-dialog v-model="showJhModal" title="选择左表达式-聚合指标" width="900">
                <el-form :model="formJhValidate" ref="formSsValidate" :rules="ruleJhValidate">
                    <Row>
                        <MyCol>
                            <el-form-item label="聚合指标名称" prop="raiAggregateIndicatorName">
                                <el-input
                                    placeholder="请输入聚合指标名称"
                                    v-model.trim="formJhValidate.raiAggregateIndicatorName"
                                />
                            </el-form-item>
                        </MyCol>
                        <MyCol>
                            <el-form-item label="聚合指标代码" prop="raiAggregateIndicatorCode">
                                <el-input
                                    placeholder="请输入聚合指标代码"
                                    v-model.trim="formJhValidate.raiAggregateIndicatorCode"
                                />
                            </el-form-item>
                        </MyCol>
                    </Row>
                    <Row>
                        <MyCol>
                            <el-form-item label="组合规则ID" prop="raiCruleId">
                                <el-input
                                    placeholder="请输入组合规则ID"
                                    v-model.trim="formJhValidate.raiCruleId"
                                />
                            </el-form-item>
                        </MyCol>
                        <MyCol>
                            <el-form-item label="组合规则名称" prop="raiCruleName">
                                <el-input
                                    placeholder="请输入组合规则名称"
                                    v-model.trim="formJhValidate.raiCruleName"
                                />
                            </el-form-item>
                        </MyCol>
                        <MyCol>
                            <el-form-item label>
                                <el-button type="primary" @click="fetchJh(true)">查询</el-button>
                            </el-form-item>
                        </MyCol>
                    </Row>
                </el-form>
                <t-pageable
                    :columns="columns2"
                    :pageSizeOpts="[5,10,40,80,100]"
                    :data="data2"
                    :loading="loading2"
                    :addable="false"
                    :deleteable="false"
                    :paginaion="true"
                    v-on:paginationchange="changePagination2"
                    :_pagenum="page2.pageNum"
                    :_pagesize="page2.pageSize"
                    :_total="page2.total"
                ></t-pageable>
            </el-dialog>

            <el-dialog v-model="showJhzModal" title="选择左表达式-集合指标" width="900">
                <el-form :model="condition3" ref="condition3" :rules="ruleValidate3">
                    <Row>
                        <MyCol size="lg">
                            <el-form-item label="集合指标代码" prop="rciCollectionIndicatorCode">
                                <el-input
                                    :maxlength="40"
                                    placeholder="请输入集合指标代码"
                                    v-model.trim="condition3.rciCollectionIndicatorCode"
                                />
                            </el-form-item>
                        </MyCol>
                        <MyCol size="lg">
                            <el-form-item label="集合指标名称" prop="rciCollectionIndicatorName">
                                <el-input
                                    :maxlength="100"
                                    placeholder="请输入集合指标名称"
                                    v-model.trim="condition3.rciCollectionIndicatorName"
                                />
                            </el-form-item>
                        </MyCol>
                    </Row>
                    <Row>
                        <MyCol size="lg">
                            <el-form-item label="数据来源" prop="rciCollectionSource">
                                <Select
                                    v-model="condition.rciCollectionSource"
                                    placeholder="请输入数据来源"
                                >
                                    <Option value>空</Option>
                                    <Option value="Collection">集合</Option>
                                    <Option value="List">名单</Option>
                                </Select>
                            </el-form-item>
                        </MyCol>
                        <MyCol size="lg">
                            <el-form-item label="集合字段代码" prop="rciCollectionCode">
                                <el-input
                                    placeholder="请输入集合字段代码"
                                    v-model.trim="condition3.rciCollectionCode"
                                />
                            </el-form-item>
                        </MyCol>
                    </Row>
                    <Row>
                        <MyCol size="xlg">
                            <el-form-item label="集合字段名称" prop="rciCollectionName">
                                <el-input
                                    placeholder="请输入集合字段名称"
                                    v-model.trim="condition3.rciCollectionName"
                                />
                            </el-form-item>
                        </MyCol>
                        <MyCol size="xlg">
                            <el-form-item label>
                                <el-button type="primary" @click="fetch3(true)">查询</el-button>
                            </el-form-item>
                        </MyCol>
                    </Row>
                </el-form>
                <!-- 表格 -->
                <t-pageable
                    :columns="columns3"
                    :pageSizeOpts="[5,10,40,80,100]"
                    :data="data3"
                    :loading="loading"
                    :addable="false"
                    :deleteable="false"
                    :paginaion="true"
                    v-on:paginationchange="changePagination3"
                    :_pagenum="page3.pageNum"
                    :_pagesize="page3.pageSize"
                    :_total="page3.total"
                ></t-pageable>
            </el-dialog>
        </el-Card>
    </div>
</template>

<script type="text/javascript">
import tPageable from "../components/table/t-pageable";
import myPageable from "../components/table/my-pageable";
import myCol from "../components/myCol/myCol";
import Api from "../utils/api";
// import $ from "jQuery";
import "../utils/directives";

import { deepClone } from "../utils/helper";

function raiAggregateFunction(data) {
    const functionList = [
        { value: "Avg", name: "Avg-平均" },
        { value: "Sum", name: "Sum-求和" },
        { value: "Max", name: "Max-最大值" },
        { value: "Mix", name: "Mix-最小值" },
        { value: "Exists", name: "Exists-存在" },
        { value: "NotExists", name: "NotExists-不存在" },
        { value: "Count", name: "Count-计数" },
        { value: "AvgToday", name: "AvgToday-今日平均" },
        { value: "SumToday", name: "SumToday-今日求和" },
        { value: "MaxToday", name: "MaxToday-今日最大值" },
        { value: "MinToday", name: "MinToday-今日最小值" },
        { value: "ExistsToday", name: "ExistsToday-今日存在" },
        { value: "CountToday", name: "CountToday-今日计数" },
    ];
    let ary = functionList.filter((reg) => {
        if (reg.value === data) {
            return true;
        }
    });
    if (ary.length > 0) {
        return ary[0].name;
    } else {
        return "";
    }
}

const validateCode = (rule, value, callback) => {
    var reg = /^[a-zA-Z0-9]+$/;
    if (value === "") {
        callback();
    } else {
        let validateInfo = reg.test(value);
        if (validateInfo) {
            callback();
        } else {
            callback(new Error("输入格式错误"));
        }
    }
};

const validateCycle = (rule, value, callback) => {
    if (value == "0") {
        callback(new Error("输入格式错误"));
    }
    var reg = /^[0-9]+$/;
    if (!value) {
        callback();
    } else {
        let validateInfo = reg.test(value);
        if (validateInfo) {
            callback();
        } else {
            callback(new Error("输入格式错误"));
        }
    }
};

const getRciType = function (data) {
    if (data === "White") {
        return "白名单";
    } else if (data === "Block") {
        return "黑名单";
    } else if (data === "Gray") {
        return "灰名单";
    } else if (data === "Checked") {
        return "已核验白名单";
    } else if (data === "Prior") {
        return "高权白名单";
    }
};

const getOperator = function (data) {
    if (data === "") {
        return "";
    } else if (data === "==") {
        return "等于";
    } else if (data === "!=") {
        return "不等于";
    } else if (data === ">") {
        return "大于";
    } else if (data === ">=") {
        return "大于等于";
    } else if (data === "<") {
        return "小于";
    } else if (data === "<=") {
        return "小于等于";
    } else if (data === "IN") {
        return "在...范围内";
    } else if (data === "NOT_IN") {
        return "不在...范围内";
    } else if (data === "LIKE") {
        return "包含";
    } else if (data === "NOT_LIKE") {
        return "不包含";
    } else if (data === "STARTSWITH") {
        return "开头是";
    } else if (data === "NOT_STARTSWITH") {
        return "开头不是";
    } else if (data === "ENDSWITH") {
        return "结尾是";
    } else if (data === "NOT_ENDSWITH") {
        return "结尾不是";
    } else if (data === "BETWEEN") {
        return "在...与...之间";
    } else if (data === "EXISTS") {
        return "存在";
    } else if (data === "NOT_EXISTS") {
        return "不存在";
    }
};

const validateIndicatorCodeBank = (rule, value, callback) => {
    const regExp = /^\S*$/;
    if (regExp.test(value)) {
        callback();
    } else {
        callback(new Error("请正确输入"));
    }
};

const validateIndicatorCode = (rule, value, callback) => {
    var reg = /^[a-zA-Z]/;
    if (reg.test(value)) {
        callback();
    } else {
        callback(new Error("请正确输入"));
    }
};

export default {
    components: {
        tPageable,
        myPageable,
        myCol,
    },
    computed: {
        comSelectcCollection: function () {
            for (let i in this.selectcCollection) {
                if (this.selectcCollection[i].value === this.reference) {
                    return this.selectcCollection[i].children;
                }
            }
        },
        dataFilterRight: function () {
            let depDataRight = deepClone(this.dataRight);
            for (let i in this.dataRight) {
                let item = this.dataRight[i].children;
                for (let x in item) {
                    if (item[x].children) {
                        for (let z in item[x].children) {
                            if (
                                item[x].children[z].dataType !==
                                this.formAmoutValidate.dataType
                            ) {
                                depDataRight[i].children[x].children[
                                    z
                                ].disabled = true;
                            }
                        }
                    } else {
                        if (
                            item[x].dataType !== this.formAmoutValidate.dataType
                        ) {
                            depDataRight[i].children[x].disabled = true;
                        }
                    }
                }
            }
            return depDataRight;
        },
    },
    data() {
        return {
            selectcConstant: [],
            formLabelWidth: "120px",
            dialogVisible: false,
            dialogVisibleAtmo: false,
            options: [{ children: [] }],
            optionList: {
                logic: "AND",
                children: [],
                atomicRule: null,
            },
            columnsBase: [
                {
                    title: "关系",
                    key: "logic",
                    render: (h, params) => {
                        return h("div", params.index !== "0" ? "AND" : "");
                    },
                },
                { title: "左表达式", key: "leftDesc" },
                {
                    title: "操作符",
                    key: "operator",
                    render: (h, params) => {
                        return h("div", getOperator(params.row.operator));
                    },
                },
                { title: "右表达式", key: "rightDesc" },
                {
                    title: "选择",
                    width: "130",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "el-Button",
                                {
                                    style: {
                                        margin: "0 5px",
                                        display:
                                            this.status === "3"
                                                ? "none"
                                                : "inline-block",
                                    },
                                    props: {
                                        type: "primary",
                                        size: "small",
                                        placement: "top",
                                    },
                                    on: {
                                        click: (event) => {
                                            // this.index = $(event.currentTarget).parents('[index]:eq(0)').attr('index')
                                            this.dialogVisible = true;
                                            this.type = "edit";
                                            this.childIndex = params.index;
                                            this.showSetAtomModal = true;
                                            this.dialogVisibleAtmo = true;
                                            this.formAmoutValidate = deepClone(
                                                params.row
                                            );
                                            // 编辑框
                                            let {
                                                left,
                                                leftDesc,
                                                right,
                                                rightDesc,
                                                rightType,
                                                operator,
                                                dataType,
                                            } = this.formAmoutValidate;
                                            let aryF = ["+", "-", "*", "/"];
                                            this.formAmoutValidate.leftList =
                                                this.getList([], left);
                                            this.reference =
                                                this.getReference(left);
                                            // if(rightType == 'Constant' && (operator == '=='|operator == '!='||operator == '<>'||operator == '>'||operator == '>='||operator == '<'||operator == '<=')) {
                                            //   rightDesc = right
                                            // }
                                            // if(rightType == 'Variable' && (operator == '=='||operator == '!=') && this.reference && this.reference !='') {
                                            //   this.formAmoutValidate.rightDesc = rightDesc
                                            //   this.formAmoutValidate.right = right
                                            // }
                                            // if(rightType == 'Variable' && (operator == '=='||operator == '!=') && (!this.reference || this.reference == '')) {
                                            //   this.formAmoutValidate.rightDesc = rightDesc
                                            //   this.formAmoutValidate.right = right
                                            // }

                                            if (
                                                rightType === "Variable" &&
                                                (operator === "LIKE" ||
                                                    operator === "NOT_LIKE" ||
                                                    operator === "STARTSWITH" ||
                                                    operator ===
                                                        "NOT_STARTSWITH" ||
                                                    operator === "ENDSWITH" ||
                                                    operator === "NOT_ENDSWITH")
                                            ) {
                                                this.formAmoutValidate.right =
                                                    right.split(",")[0];
                                                this.formAmoutValidate.rightList =
                                                    this.getList(
                                                        [],
                                                        this.formAmoutValidate
                                                            .right
                                                    );
                                            }

                                            if (
                                                rightType === "Variable" &&
                                                (dataType === "Int" ||
                                                    dataType === "Decimal") &&
                                                (operator === "==" ||
                                                    operator === "!=")
                                            ) {
                                                let str1 = "";
                                                for (let x in aryF) {
                                                    if (
                                                        right.indexOf(
                                                            aryF[x]
                                                        ) >= 0
                                                    ) {
                                                        str1 = aryF[x];
                                                        break;
                                                    }
                                                }
                                                this.formAmoutValidate.right =
                                                    right.split(str1)[0];
                                                this.formAmoutValidate.rightList =
                                                    this.getList(
                                                        [],
                                                        this.formAmoutValidate
                                                            .right
                                                    );
                                                this.formAmoutValidate.right3 =
                                                    right.split(str1)[1];
                                                this.formAmoutValidate.rightSelect =
                                                    str1;
                                                this.formAmoutValidate.rightDesc1 =
                                                    rightDesc.split(str1)[0];
                                                this.formAmoutValidate.rightDesc =
                                                    rightDesc.split(str1)[1];
                                                this.formAmoutValidate.rightSelect =
                                                    str1;
                                            }
                                            if (
                                                rightType === "Variable" &&
                                                (dataType === "Int" ||
                                                    dataType === "Decimal") &&
                                                (operator === "<>" ||
                                                    operator === ">" ||
                                                    operator === ">=" ||
                                                    operator === "<" ||
                                                    operator === "<=")
                                            ) {
                                                let str2 = "";
                                                for (let index in aryF) {
                                                    if (
                                                        right.indexOf(
                                                            aryF[index]
                                                        ) >= 0
                                                    ) {
                                                        str2 = aryF[index];
                                                        break;
                                                    }
                                                }

                                                this.formAmoutValidate.right1 =
                                                    right.split(str2)[0];
                                                this.formAmoutValidate.rightList =
                                                    this.getList(
                                                        [],
                                                        this.formAmoutValidate
                                                            .right1
                                                    );
                                                this.formAmoutValidate.right =
                                                    right.split(str2)[1];
                                                this.formAmoutValidate.rightSelect =
                                                    str2;
                                                this.formAmoutValidate.rightDesc1 =
                                                    rightDesc.split(str2)[0];
                                                this.formAmoutValidate.rightDesc =
                                                    rightDesc.split(str2)[1];
                                                this.formAmoutValidate.rightSelect =
                                                    str2;
                                            }

                                            if (
                                                rightType === "Variable" &&
                                                operator === "BETWEEN"
                                            ) {
                                                this.formAmoutValidate.right1 =
                                                    right.split(",")[0];
                                                this.formAmoutValidate.rightDesc1 =
                                                    rightDesc.split(",")[0];
                                                this.formAmoutValidate.rightList1 =
                                                    this.getList(
                                                        [],
                                                        this.formAmoutValidate
                                                            .right1
                                                    );
                                                this.formAmoutValidate.right =
                                                    right.split(",")[1];
                                                this.formAmoutValidate.rightDesc =
                                                    rightDesc.split(",")[1];
                                                this.formAmoutValidate.rightList =
                                                    this.getList(
                                                        [],
                                                        this.formAmoutValidate
                                                            .right
                                                    );
                                            }
                                            if (
                                                operator === "EXISTS" ||
                                                operator === "NOT_EXISTS"
                                            ) {
                                                this.formAmoutValidate.rightList1 =
                                                    this.getRightExsts(
                                                        [],
                                                        right.split(".")[1]
                                                    );
                                            }

                                            if (
                                                rightType === "Constant" &&
                                                (operator === "NOT_IN" ||
                                                    operator === "IN")
                                            ) {
                                                this.rightInputList = [];
                                                this.rightInputList =
                                                    right.split(",");
                                            }
                                            if (
                                                rightType === "Constant" &&
                                                operator === "BETWEEN"
                                            ) {
                                                this.formAmoutValidate.right =
                                                    right && right.split(",")
                                                        ? right
                                                              .split(",")[0]
                                                              .indexOf(".") >= 0
                                                            ? right
                                                                  .split(",")[0]
                                                                  .split(".")[1]
                                                            : right.split(
                                                                  ","
                                                              )[0]
                                                        : "";
                                                this.formAmoutValidate.right1 =
                                                    right && right.split(",")
                                                        ? right
                                                              .split(",")[1]
                                                              .indexOf(".") >= 0
                                                            ? right
                                                                  .split(",")[1]
                                                                  .split(".")[1]
                                                            : right.split(
                                                                  ","
                                                              )[1]
                                                        : "";
                                            }
                                            if (
                                                rightType === "Variable" &&
                                                (operator === "NOT_IN" ||
                                                    operator === "IN")
                                            ) {
                                                this.rightSelectList = [];
                                                var ary = right.split(",");
                                                var aryDesc =
                                                    rightDesc.split(",");
                                                for (let i in ary) {
                                                    this.rightSelectList.push({
                                                        values: this.getList(
                                                            [],
                                                            ary[i]
                                                        ),
                                                        value: ary[i],
                                                        label: aryDesc[i],
                                                    });
                                                }
                                            }
                                        },
                                    },
                                },
                                "编辑"
                            ),
                            h(
                                "el-button",
                                {
                                    style: {
                                        margin: "0 5px",
                                        display:
                                            this.status === "3"
                                                ? "none"
                                                : "inline-block",
                                    },
                                    props: {
                                        type: "error",
                                        size: "small",
                                        placement: "top",
                                    },
                                    on: {
                                        click: (index, row) => {
                                            // this.index = $(index.currentTarget).parents('[index]:eq(0)').attr('index')
                                            this.type = "delete";
                                            this.childIndex = params.index;
                                            this.options[
                                                this.index
                                            ].children.splice(params.index, 1);
                                        },
                                    },
                                },
                                "删除"
                            ),
                        ]);
                    },
                },
            ],
            selectCollectionCode: [],
            baseData: [],
            optionData: [],
            data3: [],
            condition3: {},
            columns3: [
                { title: "集合指标代码", key: "rciCollectionIndicatorCode" },
                { title: "集合指标名称", key: "rciCollectionIndicatorName" },
                {
                    title: "数据来源",
                    key: "rciCollectionSource",
                    render: (h, params) => {
                        return h(
                            "div",
                            params.row.rciCollectionSource === "Collection"
                                ? "集合"
                                : params.row.rciCollectionSource === "List"
                                ? "名单"
                                : ""
                        );
                    },
                },
                { title: "集合字段代码", key: "rciCollectionCode" },
                { title: "集合字段名称", key: "rciCollectionName" },
                { title: "事实代码", key: "rciFactCode" },
                { title: "事实属性代码", key: "rciFieldCode" },
                {
                    title: "关系",
                    key: "rciRelation",
                    render: (h, params) => {
                        return h(
                            "div",
                            params.row.rciRelation === "Exists"
                                ? "存在"
                                : params.row.rciRelation === "NotExists"
                                ? "不存在"
                                : ""
                        );
                    },
                },
                {
                    title: "类型",
                    key: "rciType",
                    render: (h, params) => {
                        return h("div", getRciType(params.row.rciType));
                    },
                },
                {
                    title: "操作",
                    width: 90,
                    fixed: "right",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    style: {
                                        margin: "0 5px",
                                    },
                                    props: {
                                        type: "primary",
                                        size: "small",
                                        placement: "top",
                                    },
                                    on: {
                                        click: () => {
                                            this.formAmoutValidate.left =
                                                params.row.rciCollectionIndicatorCode;
                                            this.formAmoutValidate.dataType =
                                                params.row.rciType;
                                            if (
                                                this.formAmoutValidate
                                                    .dataType === "Boolean"
                                            ) {
                                                this.formAmoutValidate.right =
                                                    null;
                                                this.formAmoutValidate.operator =
                                                    null;
                                            }
                                            this.showJhzModal = false;
                                        },
                                    },
                                },
                                "选择"
                            ),
                        ]);
                    },
                },
            ],
            page3: {
                pageSize: 5,
                pageNum: 0,
                total: 0,
            },
            showJhzModal: false,
            amotItem: {},
            showDelAmot: true,
            showEdit: true,
            showAdd: false,
            showDel: true,
            showNode: true,
            showDelChild: true,
            andOr: "",
            showJhModal: false,
            ruleJhValidate: {},
            formJhValidate: {},
            page2: {
                pageSize: 5,
                pageNum: 0,
                total: 0,
            },
            loading2: false,
            columns2: [
                { title: "聚合指标名称", key: "raiAggregateIndicatorName" },
                { title: "聚合指标代码", key: "raiAggregateIndicatorCode" },
                {
                    title: "聚合指标数据来源",
                    key: "raiAggregateSource",
                    render: (h, params) => {
                        return h(
                            "div",
                            params.row.raiAggregateSource ===
                                "CustomerIndicator"
                                ? "指标变量"
                                : params.row.raiAggregateSource ===
                                  "OtherIndicator"
                                ? "其他指标"
                                : params.row.raiAggregateSource === "24HourTrxn"
                                ? "24小时交易流水"
                                : ""
                        );
                    },
                },
                {
                    title: "聚合函数",
                    key: "raiAggregateFunction",
                    render: (h, params) => {
                        return h(
                            "div",
                            raiAggregateFunction(
                                params.row.raiAggregateFunction
                            )
                        );
                    },
                },
                { title: "聚合字段代码", key: "raiAggregateFieldCode" },
                { title: "聚合字段名称", key: "raiAggregateFieldName" },
                {
                    title: "指标维度",
                    key: "raiIndicatorDimension",
                    render: (h, params) => {
                        return h(
                            "div",
                            params.row.raiIndicatorDimension === "Cust"
                                ? "Cust-客户"
                                : params.row.raiIndicatorDimension === "Card"
                                ? "Card-卡"
                                : params.row.raiIndicatorDimension === "Mer"
                                ? "Mer-商户"
                                : params.row.raiIndicatorDimension === "Term"
                                ? "CounMcc-商户终端"
                                : "CounMcc-国家Mcc"
                        );
                    },
                },
                { title: "指标数据类型", key: "raiDataType" },
                { title: "组合规则ID", key: "raiCruleId" },
                { title: "组合规则名称", key: "raiCruleName" },
                {
                    title: "操作",
                    fixed: "right",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    style: {
                                        margin: "0 5px",
                                    },
                                    props: {
                                        size: "small",
                                    },
                                    on: {
                                        click: () => {
                                            this.formAmoutValidate.left =
                                                params.row.raiAggregateIndicatorCode;
                                            this.formAmoutValidate.dataType =
                                                params.row.raiDataType;

                                            if (
                                                this.formAmoutValidate
                                                    .dataType === "Boolean"
                                            ) {
                                                this.formAmoutValidate.right =
                                                    null;
                                                this.formAmoutValidate.operator =
                                                    null;
                                            }
                                            this.showJhModal = false;
                                        },
                                    },
                                },
                                "选择"
                            ),
                        ]);
                    },
                },
            ],
            data2: [],
            ruleSsValidate: {},
            formSsValidate: {},
            page1: {
                pageSize: 5,
                pageNum: 0,
                total: 0,
            },
            loading1: false,
            columns1: [
                { title: "事实名称", key: "rfFactName" },
                { title: "事实代码", key: "rfFactCode" },
                { title: "事实属性名称", key: "rfFieldName" },
                { title: "事实属性代码", key: "rfFieldCode" },
                { title: "事实属性类型", key: "rfFieldType" },
                {
                    title: "操作",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    style: {
                                        margin: "0 5px",
                                    },
                                    props: {
                                        size: "small",
                                    },
                                    on: {
                                        click: () => {
                                            this.formAmoutValidate.left =
                                                params.row.rfFactCode +
                                                "." +
                                                params.row.rfFieldCode;
                                            this.formAmoutValidate.dataType =
                                                params.row.rfFieldType;
                                            if (
                                                this.formAmoutValidate
                                                    .dataType === "Boolean"
                                            ) {
                                                this.formAmoutValidate.right =
                                                    null;
                                                this.formAmoutValidate.operator =
                                                    null;
                                            }
                                            this.showSsModal = false;
                                        },
                                    },
                                },
                                "选择"
                            ),
                        ]);
                    },
                },
            ],
            data1: [],
            showSsModal: false,
            formAmoutValidate: {
                left: ["tiantan"],
                right: "",
                operator: "",
                Source: "",
                rightType: "Constant",
            },

            ruleAmoutValidate: {
                leftList: [
                    {
                        required: true,
                        type: "array",
                        message: "请选择左表达式",
                        trigger: "blur",
                    },
                    {
                        validator: this.leftList,
                        message: "请选择左表达式",
                        trigger: "change",
                    },
                ],
                operator: [
                    {
                        validator: this.validateOperator,
                        message: "请正确输入",
                        trigger: "change",
                    },
                ],
                right: [
                    {
                        validator: this.validateRight,
                        message: "请正确输入",
                        trigger: "change",
                    },
                ],
            },
            showSetAtomModal: false,
            editModel: false,
            formValidate: {
                rcrCruleId: "",
                rcrCruleName: "",
                rcrCruleCode: "",
                rcrCruleType: "TR",
                rcrCruleVersion: "",
                rcrDescription: "",
                rcrNatureExpression: "",
                desc: "注意：基础条件内关系为且，或者条件内关系为且，基础条件和或者条件关系为或者",
            },
            ruleValidate3: {
                rciCollectionIndicatorCode: [
                    {
                        required: false,
                        message: "请输入聚合指标名称",
                        trigger: "blur",
                    },
                    { validator: validateCode, trigger: "change" },
                ],
                rciCollectionIndicatorName: [
                    {
                        required: false,
                        message: "请输入聚合指标代码",
                        trigger: "blur",
                    },
                ],
                rciCollectionSource: [
                    {
                        required: false,
                        message: "请输入数据来源",
                        trigger: "blur",
                    },
                ],
                rciCollectionCode: [
                    {
                        required: false,
                        message: "请输入集合字段代码",
                        trigger: "blur",
                    },
                ],
                rciCollectionName: [
                    {
                        required: false,
                        message: "请输入集合字段名称",
                        trigger: "blur",
                    },
                ],
            },
            ruleValidate: {
                rcrCruleName: [
                    { required: true, message: "该控件必填", trigger: "blur" },
                    { type: "string", max: 100, message: "请正确输入" },
                ],
                rcrCruleType: [
                    { required: true, message: "该控件必填", trigger: "blur" },
                ],
                rcrCruleCode: [
                    { required: true, message: "该控件必填", trigger: "blur" },
                    { type: "string", max: 8, message: "请正确输入" },
                    {
                        validator: validateIndicatorCode,
                        message: "首位必须是英文字符",
                        trigger: "change",
                    },
                    {
                        validator: validateIndicatorCodeBank,
                        message: "不能有空格",
                        trigger: "change",
                    },
                ],
                rcrDescription: [
                    { required: false, message: "请正确输入", trigger: "blur" },
                    { type: "string", max: 500, message: "字段长度超限" },
                ],
            },
            condition: {
                rcrCruleId: "",
                rcrCruleName: "",
                rcrCruleCode: "",
                rcrCruleVersion: "",
                rcrCruleType: "",
            },
            conditionRule: {
                rcrCruleId: [
                    {
                        required: false,
                        message: "请输入规则ID",
                        trigger: "blur",
                    },
                    { type: "string", max: 8, message: "请正确输入" },
                ],
                rcrCruleName: [
                    {
                        required: false,
                        message: "请输入规则名称",
                        trigger: "blur",
                    },
                    { type: "string", max: 100, message: "请正确输入" },
                ],
                rcrCruleCode: [
                    {
                        required: false,
                        message: "请输入规则代码",
                        trigger: "blur",
                    },
                    { type: "string", max: 40, message: "请正确输入" },
                    {
                        validator: validateCode,
                        message: "请输入规则代码",
                        trigger: "change",
                    },
                ],
                rcrCruleVersion: [
                    {
                        required: false,
                        message: "请输入规则版本",
                        trigger: "blur",
                    },
                    { type: "string", max: 40, message: "请正确输入" },
                    {
                        validator: validateCycle,
                        message: "格式错误",
                        trigger: "change",
                    },
                ],
            },
            columns: [
                { title: "规则id", key: "cruleId" },
                { title: "规则名称", key: "cruleName" },
                { title: "规则代码", key: "cruleCode" },
                {
                    title: "规则类型",
                    key: "cruleType",
                    render: (h, params) => {
                        return h(
                            "span",
                            params.row.cruleType
                                ? params.row.cruleType === "TR"
                                    ? "实时决策规则"
                                    : "实时指标加工规则"
                                : ""
                        );
                    },
                },
                { title: "备注", key: "description", width: 280 },
                { title: "最后修改人", key: "updateUser" },
                {
                    title: "最后修改时间",
                    key: "updateTime",
                    width: 140,
                    render: (h, params) => {
                        return h(
                            "span",
                            params.row.updateTime
                                ? new Date(
                                      parseFloat(params.row.updateTime)
                                  ).toLocaleString()
                                : ""
                        );
                    },
                },
                {
                    title: "操作",
                    width: 260,
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "el-button",
                                {
                                    style: {
                                        margin: "0 5px",
                                    },
                                    props: {
                                        type: "text",
                                        size: "small",
                                        placement: "top",
                                    },
                                    on: {
                                        click: () => {
                                            // 新增0 修改1
                                            this.status = "1";
                                            this.options = [{ children: [] }];
                                            if (this.$refs.formValidate) {
                                                this.$refs.formValidate.resetFields();
                                            }
                                            this.getCheckout();
                                            this.queryInfo(params.row);
                                            this.editModel = true;
                                            this.dialogVisible = true;
                                        },
                                    },
                                },
                                "编辑"
                            ),
                            h(
                                "el-button",
                                {
                                    style: {
                                        margin: "0 5px",
                                    },
                                    props: {
                                        type: "text",
                                        size: "small",
                                        placement: "top",
                                    },
                                    on: {
                                        click: () => {
                                            this.status = "3";
                                            this.options = [];
                                            // this.$refs.formValidate.resetFields();
                                            this.queryInfo(params.row);
                                            this.editModel = true;
                                            this.dialogVisible = true;
                                        },
                                    },
                                },
                                "查看"
                            ),
                            h(
                                "el-button",
                                {
                                    style: {
                                        margin: "0 5px",
                                    },
                                    props: {
                                        type: "text",
                                        size: "small",
                                        placement: "top",
                                    },
                                    on: {
                                        click: () => {
                                            this.$confirm(
                                                `请确认是否执行删除操作？`,
                                                "提示",
                                                {
                                                    confirmButtonText: "确定",
                                                    cancelButtonText: "取消",
                                                    type: "warning",
                                                }
                                            )
                                                .then(() => {
                                                    this.delInfo(params.row);
                                                })
                                                .catch(() => {
                                                    this.$message({
                                                        type: "info",
                                                        message: "已取消删除",
                                                    });
                                                });
                                        },
                                    },
                                },
                                "删除"
                            ),
                        ]);
                    },
                },
            ],
            page: {
                pageNum: 1,
                pageSize: 10,
                total: 0,
            },
            cascaderKey: 1,
            data: [],
            loading: false,
            status: "0",
            type: "add",
            index: 0,
            childIndex: 0,
            reset: true,
            dataLeft: [],
            dataRight: [],
            rightInputList: [""],
            rightSelectList: [{ value: "", label: "", values: [] }],
        };
    },
    methods: {
        handleOperator($event) {
            if ($event.value === "NOT_EXISTS" || $event.value === "EXISTS") {
                this.formAmoutValidate.operator = $event.value;
                this.formAmoutValidate.rightType = "Variable";
                this.formAmoutValidate.rightType = "Variable";
                this.formAmoutValidate.rightType = "Variable";
            }
        },
        changeSelect(data) {
            this.formAmoutValidate.right = data.value;
            this.formAmoutValidate.rightDesc = data.label;
        },
        leftList(rule, value, callback) {
            if (value.length > 0) {
                callback();
            } else {
                callback(new Error("格式错误"));
            }
        },
        changeCurVal($event, index) {
            this.rightInputList[index] = $event.label;
        },
        getReference(data) {
            for (let i in this.dataLeft) {
                for (let z in this.dataLeft[i].children) {
                    if (
                        !this.dataLeft[i].children[z].children &&
                        this.dataLeft[i].children[z].value === data
                    ) {
                        return this.dataLeft[i].children[z].reference;
                    } else {
                        for (let x in this.dataLeft[i].children[z].children) {
                            if (
                                this.dataLeft[i].children[z].children[x]
                                    .value === data
                            ) {
                                return this.dataLeft[i].children[z].children[x]
                                    .reference;
                            }
                        }
                    }
                }
            }
        },
        getRightExsts(source = [], data) {
            for (let i in this.selectCollectionCode) {
                for (let z in this.selectCollectionCode[i].children) {
                    if (
                        !this.selectCollectionCode[i].children[z].children &&
                        this.selectCollectionCode[i].children[z].value === data
                    ) {
                        source.push(this.selectCollectionCode[i].value);
                        source.push(
                            this.selectCollectionCode[i].children[z].value
                        );
                    } else {
                        for (let x in this.selectCollectionCode[i].children[z]
                            .children) {
                            if (
                                this.selectCollectionCode[i].children[z]
                                    .children[x].value === data
                            ) {
                                source.push(this.selectCollectionCode[i].value);
                                source.push(
                                    this.selectCollectionCode[i].children[z]
                                        .value
                                );
                                source.push(
                                    this.selectCollectionCode[i].children[z]
                                        .children[x].value
                                );
                            }
                        }
                    }
                }
            }
            return source;
        },
        getList(source = [], data) {
            for (let i in this.dataLeft) {
                for (let z in this.dataLeft[i].children) {
                    if (
                        !this.dataLeft[i].children[z].children &&
                        this.dataLeft[i].children[z].value === data
                    ) {
                        source.push(this.dataLeft[i].value);
                        source.push(this.dataLeft[i].children[z].value);
                    } else {
                        for (let x in this.dataLeft[i].children[z].children) {
                            if (
                                this.dataLeft[i].children[z].children[x]
                                    .value === data
                            ) {
                                source.push(this.dataLeft[i].value);
                                source.push(this.dataLeft[i].children[z].value);
                                source.push(
                                    this.dataLeft[i].children[z].children[x]
                                        .value
                                );
                            }
                        }
                    }
                }
            }
            return source;
        },
        format(labels, selectedData) {
            const index = labels.length - 1;
            const data = selectedData[index] || false;
            if (data && data.code) {
                return labels[index];
            }
            return labels[index];
        },
        changeRight3(val, selectedData, index) {
            ++this.cascaderKey;
            this.formAmoutValidate.right = val.join(".");
            this.formAmoutValidate.rightDesc =
                this.getFormAmoutValidateInfoExsts(val[0]).label +
                "." +
                this.getFormAmoutValidateInfoExsts(val[1]).label;
        },
        changeRight2(val, selectedData, index) {
            ++this.cascaderKey;
            this.rightSelectList[index].values = val;
            this.rightSelectList[index].value = val[val.length - 1];
            this.rightSelectList[index].label =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).label
                    ? this.getFormAmoutValidateInfo(val).label
                    : "";
        },
        changeRight1(val, selectedData) {
            ++this.cascaderKey;
            this.formAmoutValidate.right =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).value
                    ? this.getFormAmoutValidateInfo(val).value
                    : "";
            this.formAmoutValidate.rightDesc =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).label
                    ? this.getFormAmoutValidateInfo(val).label
                    : "";
        },
        changeRight(val, selectedData) {
            ++this.cascaderKey;
            this.formAmoutValidate.right1 =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).value
                    ? this.getFormAmoutValidateInfo(val).value
                    : "";
            this.formAmoutValidate.rightDesc1 =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).label
                    ? this.getFormAmoutValidateInfo(val).label
                    : "";
        },
        changeLeft(val, selectedData) {
            ++this.cascaderKey;
            this.formAmoutValidate.left =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).value
                    ? this.getFormAmoutValidateInfo(val).value
                    : "";
            this.formAmoutValidate.leftDesc =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).label
                    ? this.getFormAmoutValidateInfo(val).label
                    : "";
            this.formAmoutValidate.dataType =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).dataType
                    ? this.getFormAmoutValidateInfo(val).dataType
                    : "";
            this.reference =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).reference
                    ? this.getFormAmoutValidateInfo(val).reference
                    : "";
            this.formAmoutValidate.operator = null;
            if (this.formAmoutValidate.dataType === "Boolean") {
                this.formAmoutValidate.right = null;
                this.formAmoutValidate.rightDesc = null;
                this.formAmoutValidate.rightDesc1 = null;
                this.formAmoutValidate.right1 = null;
                this.formAmoutValidate.rightType = null;
            }
        },
        getFormAmoutValidateInfoExsts(val) {
            for (let i in this.selectCollectionCode) {
                let item = this.selectCollectionCode[i];
                if (item.value === val) {
                    return {
                        value: item.value,
                        label: item.label,
                    };
                } else {
                    for (let x in item.children) {
                        if (item.children[x].value === val) {
                            return {
                                value: item.children[x].value,
                                label: item.children[x].label,
                            };
                        }
                    }
                }
            }
        },
        getFormAmoutValidateInfo(val) {
            for (let i in this.dataLeft) {
                let item = this.dataLeft[i].children;
                for (let z in item) {
                    if (item[z].children) {
                        for (let x in item[z].children) {
                            if (
                                item[z].children[x].value ===
                                val[val.length - 1]
                            ) {
                                return {
                                    value: item[z].children[x].value,
                                    label: item[z].children[x].label,
                                    dataType: item[z].children[x].dataType,
                                    reference: item[z].children[x].reference,
                                };
                            }
                        }
                    } else {
                        if (val === undefined) {
                            return {
                                value: item[z].value,
                                label: item[z].label,
                                dataType: item[z].dataType,
                                reference: item[z].reference,
                            };
                        }
                        if (item[z].value === val[val.length - 1]) {
                            return {
                                value: item[z].value,
                                label: item[z].label,
                                dataType: item[z].dataType,
                                reference: item[z].reference,
                            };
                        }
                    }
                }
            }
        },
        delOptionAtom(index) {
            this.options.splice(index, 1);
        },
        showAddAtomModal(type, index) {
            this.getCheckout();
            if (index) this.index = index;
            this.type = "add";
            this.dialogVisibleAtmo = true;
            this.formAmoutValidate = {
                left: "",
                leftDesc: "",
                right: "",
                rightDesc: "",
                right1: "",
                rightDesc1: "",
                operator: "",
                Source: "",
                rightType: "",
                rightList: [],
                rightList1: [],
                leftList: [],
            };
            if (this.$refs.formAmoutValidate) {
                this.$refs.formAmoutValidate.resetFields();
            }
            this.rightSelectList = [{ value: "", label: "", values: [] }];
            this.rightInputList = [[""]];
            this.showSetAtomModal = true;
        },
        addOptionTable() {
            this.options.push({ children: [] });
        },
        addAmout() {
            this.$refs.formAmoutValidate.validate((valid) => {
                if (valid) {
                    let {
                        left,
                        leftDesc,
                        right,
                        rightDesc,
                        rightType,
                        operator,
                        dataType,
                        rightSelect,
                        right3,
                    } = this.formAmoutValidate;
                    if (left === "" || rightType === "" || operator === "") {
                        return this.$message.error("请正确输入");
                    }
                    if (
                        rightType === "Constant" &&
                        (operator === "==") | (operator === "!=") &&
                        (!this.reference || this.reference === "")
                    ) {
                        rightDesc = right;
                    }
                    if (
                        rightType === "Variable" &&
                        (operator === "==") | (operator === "!=") &&
                        (dataType === "Int" || dataType === "Decimal")
                    ) {
                        right = right + rightSelect + right3;
                        rightDesc = rightDesc + rightSelect + right3;
                    }

                    if (
                        rightType === "Constant" &&
                        (operator === "<>" ||
                            operator === ">" ||
                            operator === ">=" ||
                            operator === "<" ||
                            operator === "<=")
                    ) {
                        rightDesc = right;
                    }
                    if (
                        rightType === "Variable" &&
                        (operator === "<>" ||
                            operator === ">" ||
                            operator === ">=" ||
                            operator === "<" ||
                            operator === "<=") &&
                        (dataType === "Int" || dataType === "Decimal")
                    ) {
                        if (
                            !this.formAmoutValidate.right1 ||
                            this.formAmoutValidate.right1.length <= 0
                        ) {
                            return this.$message.error("请选择右表达式");
                        }
                        rightDesc = right
                            ? this.formAmoutValidate.rightDesc1 +
                              rightSelect +
                              right
                            : this.formAmoutValidate.rightDesc1;
                        right = right
                            ? this.formAmoutValidate.right1 +
                              rightSelect +
                              right
                            : this.formAmoutValidate.right1;
                    }
                    if (
                        rightType === "Variable" &&
                        (operator === "<>" ||
                            operator === ">" ||
                            operator === ">=" ||
                            operator === "<" ||
                            operator === "<=") &&
                        dataType === "String"
                    ) {
                        if (!this.formAmoutValidate.right) {
                            return this.$message.error("请选择右表达式");
                        }
                    }

                    if (
                        rightType === "Constant" &&
                        (operator === "LIKE" ||
                            operator === "NOT_LIKE" ||
                            operator === "STARTSWITH" ||
                            operator === "NOT_STARTSWITH" ||
                            operator === "ENDSWITH" ||
                            operator === "NOT_ENDSWITH")
                    ) {
                        rightDesc = right;
                    }

                    if (
                        rightType === "Constant" &&
                        (operator === "LIKE" ||
                            operator === "NOT_LIKE" ||
                            operator === "STARTSWITH" ||
                            operator === "NOT_STARTSWITH" ||
                            operator === "ENDSWITH" ||
                            operator === "NOT_ENDSWITH")
                    ) {
                        rightDesc = right;
                    }
                    if (rightType === "Constant" && operator === "BETWEEN") {
                        right = right + "," + this.formAmoutValidate.right1;
                        rightDesc = right;
                    }
                    if (rightType === "Variable" && operator === "BETWEEN") {
                        if (
                            !this.formAmoutValidate.right1 ||
                            this.formAmoutValidate.right1.length <= 0
                        ) {
                            return this.$message.error("请选择右表达式");
                        }
                        right = right + "," + this.formAmoutValidate.right1;
                        rightDesc =
                            rightDesc + "," + this.formAmoutValidate.rightDesc1;
                    }
                    if (
                        rightType === "Constant" &&
                        (operator === "NOT_IN" || operator === "IN")
                    ) {
                        rightDesc = "";
                        right = "";
                        for (let i in this.rightInputList) {
                            rightDesc =
                                rightDesc && rightDesc !== ""
                                    ? rightDesc + "," + this.rightInputList[i]
                                    : this.rightInputList[i];
                            right =
                                right && right !== ""
                                    ? right + "," + this.rightInputList[i]
                                    : this.rightInputList[i];
                        }
                    }
                    if (
                        rightType === "Variable" &&
                        (operator === "IN" || operator === "NOT_IN")
                    ) {
                        right = "";
                        rightDesc = "";
                        for (let n in this.rightSelectList) {
                            right =
                                right === ""
                                    ? this.rightSelectList[n].value
                                    : right +
                                      "," +
                                      this.rightSelectList[n].value;
                            rightDesc =
                                rightDesc === ""
                                    ? this.rightSelectList[n].label
                                    : rightDesc +
                                      "," +
                                      this.rightSelectList[n].label;
                        }
                        right =
                            right.substr(0, 1) === ","
                                ? right.substr(1, right.length)
                                : right;
                        rightDesc =
                            rightDesc.substr(0, 1) === ","
                                ? rightDesc.substr(1, rightDesc.length)
                                : rightDesc;
                        if (!right || right === "") {
                            return this.$message.error("请选择右表达式");
                        }
                    }
                    let item = {
                        left: left,
                        leftDesc: leftDesc,
                        operator: operator,
                        right: right,
                        rightDesc: rightDesc,
                        rightType: rightType,
                        dataType: dataType,
                    };
                    if (this.type === "add") {
                        if (
                            this.options[this.index] &&
                            Array.isArray(this.options[this.index].children)
                        ) {
                            this.options[this.index].children.push(item);
                        } else {
                            this.options[this.index].children = [];
                            this.options[this.index].children.push(item);
                        }
                    } else {
                        this.$set(
                            this.options[this.index].children[this.childIndex],
                            "left",
                            item.left
                        );
                        this.$set(
                            this.options[this.index].children[this.childIndex],
                            "leftDesc",
                            item.leftDesc
                        );
                        this.$set(
                            this.options[this.index].children[this.childIndex],
                            "operator",
                            item.operator
                        );
                        this.$set(
                            this.options[this.index].children[this.childIndex],
                            "right",
                            item.right
                        );
                        this.$set(
                            this.options[this.index].children[this.childIndex],
                            "rightDesc",
                            item.rightDesc
                        );
                        this.$set(
                            this.options[this.index].children[this.childIndex],
                            "rightType",
                            item.rightType
                        );
                        this.$set(
                            this.options[this.index].children[this.childIndex],
                            "dataType",
                            item.dataType
                        );
                        this.reset = false;
                        this.$nextTick(() => {
                            this.reset = true;
                        });
                    }
                    this.dialogVisibleAtmo = false;
                    this.formAmoutValidate = {};
                    this.$refs.formAmoutValidate.resetFields();
                }
            });
            this.$refs.formAmoutValidate.resetFields();
        },
        getRciType(data) {
            if (!data) return "";
            let ary = this.rciType.filter((reg) => {
                if (reg.value === data) {
                    return true;
                }
            });
            if (ary.length === 1) {
                return ary[0].text;
            } else {
                return "";
            }
        },
        changePagination3({ pagesize, pagenum }) {
            this.page.pageNum = pagenum;
            this.page.pageSize = pagesize;
            this.fetch();
        },
        fetch3(isRest) {
            this.$refs.condition3.validate((valid) => {
                if (valid) {
                    if (isRest) {
                        this.page3.pageNum = 1;
                        this.page3.pageSize = 5;
                        this.page3.total = 0;
                    }
                    const params = {
                        collectionIndicatorName:
                            this.condition3.rciCollectionIndicatorName,
                        collectionIndicatorCode:
                            this.condition3.rciCollectionIndicatorCode,
                        collectionSource: this.condition3.rciCollectionSource,
                        collectionCode: this.condition3.rciCollectionCode,
                        collectionName: this.condition3.rciCollectionName,
                        start: this.page3.pageNum * this.page3.pageSize + "",
                        length: this.page3.pageSize + "",
                    };
                    this.$http
                        .invokeAPI(
                            "/API" + `${Api.jhzb_pageSelect}`,
                            "POST",
                            params
                        )
                        .then((obj) => {
                            this.data3 = obj.data;
                            this.page3.total = obj.data.total;
                        })
                        .catch((reg) => {});
                }
            });
        },
        validateRight(rule, value, callback) {
            if (
                this.formAmoutValidate.dataType === "Boolean" &&
                (!value || value === "")
            ) {
                callback();
            } else if (
                this.formAmoutValidate.dataType !== "Boolean" &&
                value &&
                value !== ""
            ) {
                callback();
            } else {
                callback(new Error("请输入正确个格式的数据"));
            }
        },
        validateOperator(rule, value, callback) {
            if (
                this.formAmoutValidate.dataType === "Boolean" &&
                (!value || value === "")
            ) {
                callback();
            } else if (
                this.formAmoutValidate.dataType !== "Boolean" &&
                value &&
                value !== ""
            ) {
                callback();
            } else {
                callback(new Error("请选择操作符或选择表达式"));
            }
        },
        onchangeSource(data) {
            if (data === "事实") {
                this.showSsModal = true;
            } else if (data === "聚合指标") {
                this.showJhModal = true;
            } else {
                this.showJhzModal = true;
            }
        },
        changePagination2({ pagesize, pagenum }) {
            this.page2.pageNum = pagenum;
            this.page2.pageSize = pagesize;
            this.fetchJh();
        },
        fetchJh(isRest) {
            this.$refs.formSsValidate.validate((valid) => {
                if (valid) {
                    if (isRest) {
                        this.page2.pageNum = 1;
                        this.page2.pageSize = 5;
                        this.page2.total = 0;
                    }
                    const params = {
                        aggregateIndicatorCode:
                            this.formJhValidate.raiAggregateIndicatorCode,
                        aggregateIndicatorName:
                            this.formJhValidate.raiAggregateIndicatorName,
                        cruleId: this.formJhValidate.raiCruleId,
                        cruleName: this.formJhValidate.raiCruleName,
                        start: this.page2.pageNum * this.page2.pageSize + "",
                        length: this.page2.pageSize + "",
                    };
                    this.$http
                        .invokeAPI(
                            "/API" + `${Api.jhbl_pageSelect}`,
                            "POST",
                            params
                        )
                        .then((obj) => {
                            this.data2 = obj.data;
                            this.page2.total = obj.data.total;
                        })
                        .catch((reg) => {});
                }
            });
        },
        changePagination1({ pagesize, pagenum }) {
            this.page1.pageNum = pagenum;
            this.page1.pageSize = pagesize;
            this.fetchSs();
        },
        fetchSs(isRest) {
            this.$refs.formSsValidate.validate((valid) => {
                if (valid) {
                    if (isRest) {
                        this.page1.pageNum = 1;
                        this.page1.pageSize = 5;
                        this.page1.total = 0;
                    }
                    const params = {
                        factName: this.formSsValidate.rfFactName,
                        factCode: this.formSsValidate.rfFactCode,
                        fieldName: this.formSsValidate.rfFieldName,
                        fieldCode: this.formSsValidate.rfFieldCode,
                        start: this.page1.pageNum * this.page1.pageSize,
                        length: this.page1.pageSize,
                    };
                    this.$http
                        .invokeAPI("/API" + `${Api.ssgl_query}`, "POST", params)
                        .then((obj) => {
                            this.data1 = obj.data;
                            this.page1.total = obj.data.total;
                        })
                        .catch((reg) => {});
                }
            });
        },
        handleSizeChange(val) {
            this.page.pageSize = val;
            this.fetch();
        },
        changePagination(val) {
            this.page.pageNum = val;
            this.fetch();
        },

        fetch(isRest) {
            this.$refs.condition.validate((valid) => {
                if (valid) {
                    if (isRest) {
                        this.page.pageNum = 1;
                        this.page.pageSize = 10;
                        this.page.total = 0;
                    }
                    const params = {
                        cruleId: this.condition.rcrCruleId,
                        cruleName: this.condition.rcrCruleName,
                        cruleCode: this.condition.rcrCruleCode,
                        cruleVersion: this.condition.rcrCruleVersion,
                        cruleType: this.condition.rcrCruleType,
                        start: this.page.pageNum.toString(),
                        length: this.page.pageSize.toString(),
                    };
                    this.$http
                        .invokeAPI(
                            "/API" + `${Api.zhgz_pageSelect}`,
                            "POST",
                            params
                        )
                        .then((obj) => {
                            this.data = obj.data;
                            this.page.total = obj.pageParam.total;
                        })
                        .catch((reg) => {
                            this.$message.error(
                                "获取组合规则失败，请联系管理员"
                            );
                        });
                }
            });
        },
        showAddModal() {
            this.status = "0";
            this.dialogVisible = true;
            if (this.$refs.formValidate) {
                this.$refs.formValidate.resetFields();
            }
            this.options = [{ children: [] }];
            this.editModel = true;
        },
        calc(state, treeMap) {
            return this.makeTree(treeMap, "1", {}, state);
        },
        makeTree(treeMap, startNode, base, state) {
            let currState = state.find((item) => item.id === startNode);
            base.atomicRule = currState.atomicRule;
            base.logic = currState.logic;
            let nodes = treeMap.filter((item) => startNode === item.start);
            if (nodes.length > 0) {
                base.children = [];
                nodes.forEach((item, index) => {
                    base.children[index] = {};
                    this.makeTree(
                        treeMap,
                        item.end,
                        base.children[index],
                        state
                    );
                });
            }
            return base;
        },
        authConfirm(type) {
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    if (type === "edit") {
                        this.updateInfo();
                    } else if (type === "add") {
                        this.addInfo();
                    } else if (type === "version") {
                        this.newVersion();
                    }
                }
            });
        },
        addInfo() {
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    for (let i in this.options) {
                        if (i === "0" && this.options[i].children.length <= 0) {
                            return this.$message.error("基础规则必填");
                        } else if (this.options[i].children.length <= 0) {
                            return this.$message.error("规则未填写完整");
                        }
                    }
                    var obj = {
                        logic: "AND",
                        children: [
                            {
                                logic: "AND",
                                children: [],
                                atomicRule: null,
                            },
                        ],
                        atomicRule: null,
                    };
                    // 基础信息
                    if (this.options[0].children.length > 0) {
                        for (let i in this.options[0].children) {
                            let item = this.options[0].children[i];
                            let objBase = {
                                logic: null,
                                children: null,
                                atomicRule: item,
                            };
                            obj.children[0].children.push(objBase);
                        }
                    }
                    // 可选信息
                    let ary = deepClone(this.options);
                    ary.splice(0, 1);
                    if (ary.length > 0) {
                        let objChildRen = {
                            logic: "OR",
                            children: [],
                            atomicRule: null,
                        };
                        for (let i in ary) {
                            let item = ary[i].children;
                            let children = {
                                logic: "AND",
                                atomicRule: null,
                                children: [],
                            };
                            for (let z in item) {
                                let obj1 = {
                                    logic: null,
                                    children: null,
                                    atomicRule: item[z],
                                };
                                children.children.push(obj1);
                            }
                            objChildRen.children.push(children);
                        }
                        obj.children.push(objChildRen);
                    }
                    const params = {
                        cruleId: this.formValidate.rcrCruleId,
                        cruleName: this.formValidate.rcrCruleName,
                        cruleCode: this.formValidate.rcrCruleCode,
                        cruleType: this.formValidate.rcrCruleType,
                        description: this.formValidate.rcrDescription,
                        createUser: "admin",
                        natureExpression: obj,
                    };
                    this.$http
                        .invokeAPI("/API" + `${Api.zhgz_add}`, "POST", params)
                        .then((obj) => {
                            this.editModel = false;
                            this.$message({
                                message: "新增成功",
                                type: "success",
                            });
                            this.dialogVisible = false;
                            this.fetch(true);
                        })
                        .catch((res) => {
                            this.$message.error("新增失败");
                        });
                }
            });
        },
        newVersion() {
            for (let i in this.options) {
                if (i === "0" && this.options[i].children.length <= 0) {
                    return this.$message.error("基础规则必填");
                } else if (this.options[i].children.length <= 0) {
                    return this.$message.error("规则未填写完整");
                }
            }
            var obj = {
                logic: "AND",
                children: [
                    {
                        logic: "AND",
                        children: [],
                        atomicRule: null,
                    },
                ],
                atomicRule: null,
            };
            // 基础信息
            if (this.options[0].children.length > 0) {
                for (let i in this.options[0].children) {
                    let item = this.options[0].children[i];
                    let objBase = {
                        logic: null,
                        children: null,
                        atomicRule: item,
                    };
                    obj.children[0].children.push(objBase);
                }
            }
            // 可选信息
            let ary = deepClone(this.options);
            ary.splice(0, 1);
            if (ary.length > 0) {
                let objChildRen = {
                    logic: "OR",
                    children: [],
                    atomicRule: null,
                };
                for (let i in ary) {
                    let item = ary[i].children;
                    let children = {
                        logic: "AND",
                        atomicRule: null,
                        children: [],
                    };
                    for (let z in item) {
                        let obj1 = {
                            logic: null,
                            children: null,
                            atomicRule: item[z],
                        };
                        children.children.push(obj1);
                    }
                    objChildRen.children.push(children);
                }
                obj.children.push(objChildRen);
            }
            const params = {
                cruleId: this.formValidate.rcrCruleId,
                cruleName: this.formValidate.rcrCruleName,
                cruleCode: this.formValidate.rcrCruleCode,
                cruleType: this.formValidate.rcrCruleType,
                description: this.formValidate.rcrDescription,
                createUser: this.$store.getters.getUserProfile.userId,
                natureExpression: obj,
            };
            this.$http
                .invokeAPI("/API" + `${Api.zhgz_newVersion}`, "POST", params)
                .then((obj) => {
                    this.editModel = false;
                    this.fetch(true);
                    this.$message({
                        type: "success",
                        message: "发布成功!",
                    });
                });
        },
        updateInfo() {
            this.$refs.formValidate.validate((valid) => {
                if (valid) {
                    for (let i in this.options) {
                        if (i === "0" && this.options[i].children.length <= 0) {
                            return this.$message.error("基础规则必填");
                        } else if (this.options[i].children.length <= 0) {
                            return this.$message.error("规则未填写完整");
                        }
                    }
                    var obj = {
                        logic: "AND",
                        children: [
                            {
                                logic: "AND",
                                children: [],
                                atomicRule: null,
                            },
                        ],
                        atomicRule: null,
                    };
                    // 基础信息
                    if (this.options[0].children.length > 0) {
                        for (let i in this.options[0].children) {
                            let item = this.options[0].children[i];
                            let objBase = {
                                logic: null,
                                children: null,
                                atomicRule: item,
                            };
                            obj.children[0].children.push(objBase);
                        }
                    }
                    // 可选信息
                    let ary = deepClone(this.options);
                    ary.splice(0, 1);
                    if (ary.length > 0) {
                        let objChildRen = {
                            logic: "OR",
                            children: [],
                            atomicRule: null,
                        };
                        for (let i in ary) {
                            let item = ary[i].children;
                            let children = {
                                logic: "AND",
                                atomicRule: null,
                                children: [],
                            };
                            for (let z in item) {
                                let obj1 = {
                                    logic: null,
                                    children: null,
                                    atomicRule: item[z],
                                };
                                children.children.push(obj1);
                            }
                            objChildRen.children.push(children);
                        }
                        obj.children.push(objChildRen);
                    }
                    const params = {
                        cruleId: this.formValidate.rcrCruleId,
                        cruleName: this.formValidate.rcrCruleName,
                        cruleCode: this.formValidate.rcrCruleCode,
                        cruleType: this.formValidate.rcrCruleType,
                        description: this.formValidate.rcrDescription,
                        updateUser: "admin",
                        natureExpression: obj,
                    };
                    this.$http
                        .invokeAPI(
                            "/API" + `${Api.zhgz_update}`,
                            "POST",
                            params
                        )
                        .then((obj) => {
                            this.dialogVisible = false;
                            this.fetch(true);
                            this.$message({
                                type: "success",
                                message: "修改成功!",
                            });
                        });
                }
            });
        },
        queryInfo(data) {
            const params = {
                cruleId: data.cruleId,
            };
            this.$http
                .invokeAPI("/API" + `${Api.zhgz_query}`, "POST", params)
                .then((obj) => {
                    this.formValidate.rcrCruleId = obj.data.cruleId;
                    this.formValidate.rcrCruleName = obj.data.cruleName;
                    this.formValidate.rcrCruleCode = obj.data.cruleCode;
                    this.formValidate.rcrCruleType = obj.data.cruleType;
                    this.formValidate.rcrCruleVersion = obj.data.cruleVersion;
                    this.formValidate.rcrDescription = obj.data.description;
                    this.formValidate.rcrUpdateUser = obj.data.updateUser;
                    this.formValidate.rcrUpdateTime = obj.data.updateTime;
                    this.formValidate.rcrCreateUser = obj.data.createUser;
                    this.formValidate.rcrCreateTime = obj.data.createTime;
                    let rcrNatureExpression = JSON.parse(
                        obj.data.natureExpression
                    );
                    if (
                        rcrNatureExpression.children &&
                        rcrNatureExpression.children.length > 0
                    ) {
                        this.options = this.pushChildRen(
                            rcrNatureExpression.children
                        );
                    } else {
                        this.options = [{ children: [] }];
                    }
                })
                .catch((reg) => {});
        },
        pushChildRen(data, ary = []) {
            let childAry = [];
            for (let i in data[0].children) {
                childAry.push(data[0].children[i].atomicRule);
            }
            ary.push({ children: childAry });
            if (data.length > 1) {
                let otherAry = deepClone(data).splice(1, data.length);
                for (let x in otherAry) {
                    let ary1 = [];
                    for (let z in otherAry[x].children) {
                        for (let c in otherAry[x].children[z].children) {
                            ary1.push(
                                otherAry[x].children[z].children[c].atomicRule
                            );
                        }
                        ary.push({ children: ary1 });
                        ary1 = [];
                    }
                }
            }
            return ary;
        },
        delInfo(data) {
            const params = {
                cruleId: data.cruleId,
            };
            this.$http
                .invokeAPI("/API" + Api.zhgz_delete, "POST", params)
                .then((obj) => {
                    this.$message({
                        type: "success",
                        message: "删除成功!",
                    });
                    this.fetch(true);
                })
                .catch((res) => {
                    this.$message({
                        type: "warn",
                        message: "删除失败!",
                    });
                    this.fetch(true);
                });
        },
        getCheckout() {
            this.dataLeft = [];
            this.dataRight = [];
            this.rightDataLeft = [];
            // 集合
            let params = {};
            this.$http
                .invokeAPI("/API" + Api.zhgz_selectCollection, "POST", params)
                .then((obj) => {
                    this.dataLeft.push({
                        value: "jihezhibiao",
                        label: "集合指标",
                        children: obj.data,
                    });
                })
                .catch((reg) => {
                    this.dataLeft.push({
                        value: "jihezhibiao",
                        label: "集合指标",
                        children: [],
                    });
                });
            // 聚合
            this.$http
                .invokeAPI("/API" + Api.zhgz_selectAggregate, "POST", params)
                .then((obj) => {
                    this.dataLeft.push({
                        value: "juhezhibiao",
                        label: "聚合指标",
                        children: obj.data,
                    });
                    this.dataRight.push({
                        value: "juhezhibiao",
                        label: "聚合指标",
                        children: obj.data,
                    });
                })
                .catch((reg) => {
                    this.dataLeft.push({
                        value: "juhezhibiao",
                        label: "聚合指标",
                        children: [],
                    });
                    this.dataRight.push({
                        value: "juhezhibiao",
                        label: "聚合指标",
                        children: [],
                    });
                });
            // 事实
            this.$http
                .invokeAPI("/API" + Api.zhgz_selectFact, "POST", params)
                .then((obj) => {
                    this.dataLeft.push({
                        value: "shishi",
                        label: "事实",
                        children: obj.data,
                    });
                    this.dataRight.push({
                        value: "shishi",
                        label: "事实",
                        children: obj.data,
                    });
                })
                .catch((reg) => {
                    this.dataLeft.push({
                        value: "shishi",
                        label: "事实",
                        children: [],
                    });
                    this.dataRight.push({
                        value: "shishi",
                        label: "事实",
                        children: [],
                    });
                });

            // 集合
            this.$http
                .invokeAPI("/API" + Api.zhgz_selectcCollection, "POST", params)
                .then((obj) => {
                    this.selectcCollection = obj.data;
                });
            this.$http
                .invokeAPI(
                    "/API" + Api.zhgz_selectCollectionCode,
                    "POST",
                    params
                )
                .then((obj) => {
                    this.selectCollectionCode = obj.data;
                });

            this.$http
                .invokeAPI("/API" + Api.zhgz_selectConstant, "POST", params)
                .then((obj) => {
                    this.selectcConstant = obj.data;
                });
        },
        querySearch(queryString, cb) {
            var selectcConstantCust = this.selectcConstant;
            selectcConstantCust = selectcConstantCust.filter(
                this.filterConstant(this.formAmoutValidate.dataType)
            );
            var results;
            if (queryString !== "") {
                results = selectcConstantCust.filter(
                    this.createFilter(queryString)
                );
            } else {
                results = selectcConstantCust;
            }
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        filterConstant(dataType) {
            return (selectcConstantCust) => {
                return (
                    selectcConstantCust.dataType
                        .toLowerCase()
                        .indexOf(dataType.toLowerCase()) === 0
                );
            };
        },
        createFilter(queryString) {
            return (selectcConstantCust) => {
                return (
                    selectcConstantCust.value
                        .toLowerCase()
                        .indexOf(queryString.toLowerCase()) === 0
                );
            };
        },
        handleSelect(item) {
            this.formAmoutValidate.right = item.label;
            console.log("handleSelect" + item);
        },
        handleSelect3(item) {
            this.formAmoutValidate.right3 = item.label;
            console.log("handleSelect3" + item);
        },
        handleSelect1(item) {
            this.formAmoutValidate.right1 = item.label;
            console.log("handleSelect1" + item);
        },
    },
    create() {},
    mounted() {
        this.fetch(true);
    },
};
</script>

<style type="text/css">
.el-cascader-panel {
    height: 300px;
}
</style>
<style type="text/css" href="domo.css"></style>
<style type="text/css">
.optionTableLabel.ivu-form.ivu-form-label-right .ivu-form-item-label {
    width: 70px !important;
}
.optionTableLabel.ivu-form.ivu-form-label-right .ivu-form-item-content {
    margin-left: 70px !important;
}
.zghzClearHeight .ivu-select-dropdown {
    max-height: 500px;
}
.zghzClearHeight .ivu-cascader-menu {
    height: 500px !important;
}
</style>

<style scoped>
.my-dialog {
    z-index: 1000 !important;
}
.el-dialog__wrapper {
    z-index: 2006 !important;
}
</style>

