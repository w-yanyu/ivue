<template>
    <div id="page_content">
        <el-form
            ref="ruleForm"
            :model="itemData"
            :rules="rules"
            label-width="100px"
            class="custom-common--form"
        >
            <el-row>
                <el-col>
                    <el-form-item label-width="35px">
                        <el-radio-group
                            v-model="normalInput.inputRadio"
                            @change="raidoChange"
                            class="radio-group"
                            :disabled="disabled"
                        >
                            <el-radio :label="1">常量输入</el-radio>
                            <el-radio :label="2">变量选择</el-radio>
                            <el-radio :label="3" v-if="itemData.conditionDataType != 'String'">简单计算</el-radio>
                            <el-radio :label="4">函数选择</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>

            <!-- 常量输入 -->
            <el-row v-if="normalInput.inputRadio===1">
                <el-col>
                    <el-form-item label>
                        <el-autocomplete
                            :disabled="normalInput.inputRadio!==1 || disabled"
                            class="input_el"
                            v-model="normalInput.constantInputValue"
                            :fetch-suggestions="querySearch"
                            :placeholder="placeholderText"
                            @select="handleConstantSelect"
                            @keyup.enter.native="handleConstantSelect"
                            @input="constantInputValueEven($event)"
                            clearable
                            :popper-append-to-body='true'
                            style="width: 420px; margin-right: 0px;margin-left: -9px; z-index: 10000;"
                        ></el-autocomplete>
                    </el-form-item>
                </el-col>
            </el-row>

            <!-- 变量选择 -->
            <el-row v-if="normalInput.inputRadio===2">
                <el-col :span="8">
                    <el-form-item label>
                        <el-cascader
                            :disabled="normalInput.inputRadio!==2 || disabled"
                            v-model="normalInput.variableInputValueShow"
                            :options="conditionsListFilter"
                            :filterable="true"
                            :props="{ expandTrigger: 'hover'  }"
                            @change="changeConditions($event,'variable')"
                            style="width: 420px ;margin-left: -9px;"
                            clearable
                        ></el-cascader>
                    </el-form-item>
                </el-col>
            </el-row>

            <!-- 简单计算 -->
            <el-row v-if="normalInput.inputRadio===3">
                <div class="simple-operator">
                    <!-- 左边输入选择 常量 变量 -->
                    <el-dropdown
                        trigger="click"
                        @command="handleLeftInputType"
                        :disabled="normalInput.inputRadio!==3 || disabled"
                    >
                        <!-- <el-button  size="mini" type="info" plain>
                  {{switchInputTypeName(leftInputType)}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>-->
                        <span
                            class="el-dropdown-link variant-style"
                        >{{switchInputTypeName(normalInput.simpleLeftInputType)}}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                                v-for="(item, i) in inputTypeList"
                                :key="i"
                                :command="item"
                                :disabled="normalInput.inputRadio!==3 || disabled"
                            >{{item.label}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                    <!-- 左边输入选项 -->
                    <div>
                        <el-autocomplete
                            v-if="normalInput.simpleLeftInputType==='input'"
                            :disabled="normalInput.inputRadio!==3 || disabled"
                            class="input_el"
                            v-model="normalInput.simpleLeftInputValue"
                            :fetch-suggestions="querySearch"
                            :placeholder="placeholderText"
                            @select="handleSimpleLeftSelect"
                            @keyup.enter.native="handleSimpleLeftSelect"
                            @input="leftValueInput($event)"
                            clearable
                            style="width: 350px; margin-left: 10px;margin-right: 10px;"
                        ></el-autocomplete>

                        <el-cascader
                            v-else
                            :disabled="normalInput.inputRadio!==3 || disabled"
                            v-model="normalInput.simpleLeftInputValueShow"
                            :options="conditionsListFilter"
                            :props="{ expandTrigger: 'hover'  }"
                            @change="changeConditions($event,'left')"
                            style="width: 350px;margin-left: 10px;margin-right: 10px;"
                            clearable
                        ></el-cascader>
                    </div>

                    <!-- 操作符 加减乘除 -->
                    <el-dropdown
                        trigger="click"
                        @command="handleOperatorType"
                        style="margin-left: 10px;margin-right: 10px;"
                    >
                        <el-button type="primary" size="mini">
                            {{switchOperatorName(normalInput.simpleOperatorSymbolValue)}}
                            <i
                                class="el-icon-arrow-down el-icon--right"
                            ></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                                v-for="(item, i) in operatorSymbolBase"
                                :key="i"
                                :command="item"
                                :disabled="normalInput.inputRadio!==3 || disabled"
                            >{{item.dictName}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                    <!-- 右边输入选项 常量 变量 -->
                    <el-dropdown trigger="click" @command="handleRightInputType">
                        <!-- <el-button  size="mini" type="info" plain>
                  {{switchInputTypeName(rightInputType)}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>-->
                        <span
                            class="el-dropdown-link variant-style"
                        >{{switchInputTypeName(normalInput.simpleRightInputType)}}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item
                                v-for="(item, i) in inputTypeList"
                                :key="i"
                                :command="item"
                                :disabled="normalInput.inputRadio!==3 || disabled"
                            >{{item.label}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>

                    <!-- 右边输入项 -->
                    <div>
                        <!-- <el-input class="input_el" v-if="itemData.rightInputType==='input'" :disabled="normalInput.inputRadio!==3"
                placeholder="请输入常量值" style="width: max-content;margin-left: 10px; margin-right: 10px;"
                @input="rightValueInput($event)" v-model="simpleRightInputValue">
                        </el-input>-->
                        <el-autocomplete
                            v-if="normalInput.simpleRightInputType==='input'"
                            :disabled="normalInput.inputRadio!==3|| disabled"
                            class="input_el"
                            v-model="normalInput.simpleRightInputValue"
                            :fetch-suggestions="querySearch"
                            :placeholder="placeholderText"
                            @select="handleSimpleRightSelect"
                            @keyup.enter.native="handleSimpleRightSelect"
                            @input="rightValueInput($event)"
                            clearable
                            style="width: 350px;margin-left: 10px;margin-right: 10px; "
                        ></el-autocomplete>

                        <el-cascader
                            v-else
                            :disabled="normalInput.inputRadio!==3 || disabled"
                            v-model="normalInput.simpleRightInputValueShow"
                            :options="conditionsListFilter"
                            :props="{ expandTrigger: 'hover'  }"
                            @change="changeConditions($event,'right')"
                            style="width: 350px;margin-left: 10px;margin-right: 10px;"
                            clearable
                        ></el-cascader>
                    </div>
                </div>
            </el-row>

            <!-- 函数选择 -->
            <el-row v-if="normalInput.inputRadio===4">
                <el-col :span="24">
                    <el-form-item label>
                        <div class="function-operator">
                            <el-select
                                style="width: 420px; margin-right: 0px;"
                                v-model="normalInput.functionFormula"
                                :label-in-value="true"
                                :filterable="true"
                                @change="changeFormula"
                                clearable
                                placeholder="请函数设置"
                                :disabled="disabled"
                            >
                                <el-option
                                    v-for="item in formulaType"
                                    :key="item.functionCode"
                                    :label="item.functionName"
                                    :value="item.functionCode"
                                ></el-option>
                            </el-select>

                            <div class="component_item_div">
                                <el-input
                                    class="input_el function_code"
                                    v-if="itemData.funcitonCode.length>0"
                                    v-model="itemData.funcitonCode"
                                    type="textarea"
                                    resize="none"
                                    autosize
                                    :disabled="disabled"
                                ></el-input>

                                <div class="component_item_div2">
                                    <div
                                        class="component_item_content"
                                        v-for="(item,index) in normalInput.inputDataItem"
                                        :key="index"
                                    >
                                        <formulaSetValue
                                            :cParentParams="item"
                                            :disabled="disabled"
                                            :dataList="conditionsListTemp"
                                        ></formulaSetValue>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>

            <!-- 提示 -->
            <el-row>
                <el-col :span="24">
                    <div id="tipe">
                        <div class="content">
                            <span class="tips">使用说明：</span>
                            <span class="explain">1、左表达式：条件选择的值</span>
                            <span class="explain">2、操作符：比较型下的所有条件符，如：等于、大于、小于等</span>
                            <span class="explain">3、右表达式：可选择常量 、变量、简单计算 和 函数选择 四种操作之一</span>
                            <span class="explain"></span>
                            <div
                                v-if="normalInput.inputRadio===1"
                                style="display: flex;flex-direction: column"
                            >
                                <span class="tips">使用案例：</span>
                                <span class="explain">案例1：企业类型等于常量R</span>
                                <div style="border:1px dashed;border-radius:15px; margin:10px">
                                    <div style="display:fles">
                                        <el-form
                                            ref="ruleForm"
                                            label-width="130px"
                                            class="custom-common--form"
                                        >
                                            <el-row>
                                                <el-col :span="8">
                                                    <el-form-item
                                                        label="条件选择"
                                                        prop="ruleName"
                                                        label-width="100px"
                                                    >
                                                        <input
                                                            class="explain-input-style"
                                                            disabled
                                                            value="企业类型"
                                                        />
                                                    </el-form-item>
                                                </el-col>

                                                <el-col :span="8">
                                                    <el-form-item
                                                        label="条件属性"
                                                        prop="ruleCode"
                                                        label-width="100px"
                                                    >
                                                        <input
                                                            class="explain-input-style"
                                                            disabled
                                                            value="Edm_co.entType"
                                                        />
                                                    </el-form-item>
                                                </el-col>

                                                <el-col :span="8">
                                                    <el-form-item
                                                        label="数据类型"
                                                        prop="ruleType"
                                                        label-width="100px"
                                                    >
                                                        <input
                                                            class="explain-input-style"
                                                            disabled
                                                            value="String--字符串"
                                                        />
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>

                                            <el-row>
                                                <el-col :span="8">
                                                    <el-form-item
                                                        label="操作符"
                                                        prop="ruleType"
                                                        label-width="100px"
                                                    >
                                                        <input
                                                            class="explain-input-style"
                                                            disabled
                                                            value="比较型/等于"
                                                        />
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>

                                            <el-row>
                                                <el-col :span="8">
                                                    <input
                                                        type="radio"
                                                        checked
                                                        style="margin-left:40px"
                                                    />
                                                    <span>常量输入</span>
                                                </el-col>
                                                <el-col :span="8">
                                                    <el-form-item
                                                        label
                                                        prop="ruleType"
                                                        label-width="100px"
                                                    ></el-form-item>
                                                </el-col>
                                            </el-row>

                                            <el-row>
                                                <el-col :span="8">
                                                    <el-form-item
                                                        label
                                                        prop="ruleType"
                                                        label-width="100px"
                                                    >
                                                        <input
                                                            class="explain-input-style"
                                                            disabled
                                                            value="R"
                                                        />
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                        </el-form>
                                    </div>
                                </div>
                                <span class="explain">表达式：Edm_co.entType == 'R'</span>
                            </div>

                            <div
                                v-if="normalInput.inputRadio===2"
                                style="display: flex;flex-direction: column"
                            >
                                <span class="tips">使用案例：</span>
                                <span class="explain">案例1：企业类型等于变量客户类型</span>
                                <div style="border:1px dashed;border-radius:15px; margin:10px">
                                    <div style="display:fles">
                                        <el-form
                                            ref="ruleForm"
                                            label-width="130px"
                                            class="custom-common--form"
                                        >
                                            <el-row>
                                                <el-col :span="8">
                                                    <el-form-item
                                                        label="条件选择"
                                                        prop="ruleName"
                                                        label-width="100px"
                                                    >
                                                        <input
                                                            class="explain-input-style"
                                                            disabled
                                                            value="企业类型"
                                                        />
                                                    </el-form-item>
                                                </el-col>

                                                <el-col :span="8">
                                                    <el-form-item
                                                        label="条件属性"
                                                        prop="ruleCode"
                                                        label-width="100px"
                                                    >
                                                        <input
                                                            class="explain-input-style"
                                                            disabled
                                                            value="Edm_co.entType"
                                                        />
                                                    </el-form-item>
                                                </el-col>

                                                <el-col :span="8">
                                                    <el-form-item
                                                        label="数据类型"
                                                        prop="ruleType"
                                                        label-width="100px"
                                                    >
                                                        <input
                                                            class="explain-input-style"
                                                            disabled
                                                            value="String--字符串"
                                                        />
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>

                                            <el-row>
                                                <el-col :span="8">
                                                    <el-form-item
                                                        label="操作符"
                                                        prop="ruleType"
                                                        label-width="100px"
                                                    >
                                                        <input
                                                            class="explain-input-style"
                                                            disabled
                                                            value="比较型/等于"
                                                        />
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>

                                            <el-row>
                                                <el-col :span="8">
                                                    <input
                                                        type="radio"
                                                        checked
                                                        style="margin-left:40px"
                                                    />
                                                    <span>变量选择</span>
                                                </el-col>
                                                <el-col :span="8">
                                                    <el-form-item
                                                        label
                                                        prop="ruleType"
                                                        label-width="100px"
                                                    ></el-form-item>
                                                </el-col>
                                            </el-row>

                                            <el-row>
                                                <el-col :span="8">
                                                    <el-form-item
                                                        label
                                                        prop="ruleType"
                                                        label-width="100px"
                                                    >
                                                        <input
                                                            class="explain-input-style"
                                                            disabled
                                                            value="客户类型"
                                                        />
                                                    </el-form-item>
                                                </el-col>
                                            </el-row>
                                        </el-form>
                                    </div>
                                </div>
                                <span class="explain">表达式：Edm_co.entType == cust.customerType</span>
                            </div>

                            <div
                                v-if="normalInput.inputRadio===3"
                                style="display: flex;flex-direction: column"
                            >
                                <span class="tips">使用案例：</span>
                                <span class="explain">案例1：企业类型等于常量R 加 变量客户类型</span>
                                <div style="border:1px dashed;border-radius:15px; margin:10px">
                                    <el-form
                                        ref="ruleForm"
                                        label-width="130px"
                                        class="custom-common--form"
                                    >
                                        <el-row>
                                            <el-col :span="8">
                                                <el-form-item
                                                    label="条件选择"
                                                    prop="ruleName"
                                                    label-width="100px"
                                                >
                                                    <input
                                                        class="explain-input-style"
                                                        disabled
                                                        value="企业类型"
                                                    />
                                                </el-form-item>
                                            </el-col>

                                            <el-col :span="8">
                                                <el-form-item
                                                    label="条件属性"
                                                    prop="ruleCode"
                                                    label-width="100px"
                                                >
                                                    <input
                                                        class="explain-input-style"
                                                        disabled
                                                        value="Edm_co.entType"
                                                    />
                                                </el-form-item>
                                            </el-col>

                                            <el-col :span="8">
                                                <el-form-item
                                                    label="数据类型"
                                                    prop="ruleType"
                                                    label-width="100px"
                                                >
                                                    <input
                                                        class="explain-input-style"
                                                        disabled
                                                        value="String--字符串"
                                                    />
                                                </el-form-item>
                                            </el-col>
                                        </el-row>

                                        <el-row>
                                            <el-col :span="8">
                                                <el-form-item
                                                    label="操作符"
                                                    prop="ruleType"
                                                    label-width="100px"
                                                >
                                                    <input
                                                        class="explain-input-style"
                                                        disabled
                                                        value="比较型/等于"
                                                    />
                                                </el-form-item>
                                            </el-col>
                                        </el-row>

                                        <el-row>
                                            <el-col :span="8">
                                                <input
                                                    type="radio"
                                                    checked
                                                    style="margin-left:40px"
                                                />
                                                <span>>简单计算</span>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item
                                                    label
                                                    prop="ruleType"
                                                    label-width="100px"
                                                ></el-form-item>
                                            </el-col>
                                        </el-row>

                                        <el-row>
                                            <el-col :span="8">
                                                <el-form-item
                                                    label="常量"
                                                    prop="ruleType"
                                                    label-width="100px"
                                                >
                                                    <input
                                                        class="explain-input-style"
                                                        disabled
                                                        value="R"
                                                    />
                                                </el-form-item>
                                            </el-col>

                                            <el-col :span="2">
                                                <el-form-item
                                                    label="<加>"
                                                    prop="ruleType"
                                                    label-width="100px"
                                                ></el-form-item>
                                            </el-col>

                                            <el-col :span="8">
                                                <el-form-item
                                                    label="变量"
                                                    prop="ruleType"
                                                    label-width="100px"
                                                >
                                                    <input
                                                        class="explain-input-style"
                                                        disabled
                                                        value="客户类型"
                                                    />
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                </div>

                                <span class="explain">表达式：Edm_co.entType =='R' + cust.customerType</span>
                            </div>

                            <div
                                v-if="normalInput.inputRadio===4"
                                style="display: flex;flex-direction: column"
                            >
                                <span class="tips">使用案例：</span>
                                <span class="explain">案例1：企业类型等于函数计算的返回值</span>
                                <div style="border:1px dashed;border-radius:15px; margin:10px">
                                    <el-form
                                        ref="ruleForm"
                                        label-width="130px"
                                        class="custom-common--form"
                                    >
                                        <el-row>
                                            <el-col :span="8">
                                                <el-form-item
                                                    label="条件选择"
                                                    prop="ruleName"
                                                    label-width="100px"
                                                >
                                                    <input
                                                        class="explain-input-style"
                                                        disabled
                                                        value="企业类型"
                                                    />
                                                </el-form-item>
                                            </el-col>

                                            <el-col :span="8">
                                                <el-form-item
                                                    label="条件属性"
                                                    prop="ruleCode"
                                                    label-width="100px"
                                                >
                                                    <input
                                                        class="explain-input-style"
                                                        disabled
                                                        value="Edm_co.entType"
                                                    />
                                                </el-form-item>
                                            </el-col>

                                            <el-col :span="8">
                                                <el-form-item
                                                    label="数据类型"
                                                    prop="ruleType"
                                                    label-width="100px"
                                                >
                                                    <input
                                                        class="explain-input-style"
                                                        disabled
                                                        value="String--字符串"
                                                    />
                                                </el-form-item>
                                            </el-col>
                                        </el-row>

                                        <el-row>
                                            <el-col :span="8">
                                                <el-form-item
                                                    label="操作符"
                                                    prop="ruleType"
                                                    label-width="100px"
                                                >
                                                    <input
                                                        class="explain-input-style"
                                                        disabled
                                                        value="比较型/等于"
                                                    />
                                                </el-form-item>
                                            </el-col>
                                        </el-row>

                                        <el-row>
                                            <el-col :span="8">
                                                <input
                                                    type="radio"
                                                    checked
                                                    style="margin-left:40px"
                                                />
                                                <span>函数选择</span>
                                            </el-col>
                                            <el-col :span="8">
                                                <el-form-item
                                                    label
                                                    prop="ruleType"
                                                    label-width="100px"
                                                ></el-form-item>
                                            </el-col>
                                        </el-row>

                                        <el-row>
                                            <el-col :span="8">
                                                <el-form-item
                                                    label
                                                    prop="ruleType"
                                                    label-width="100px"
                                                >
                                                    <input
                                                        class="explain-input-style"
                                                        disabled
                                                        value="返回string类型的函数"
                                                    />
                                                </el-form-item>
                                            </el-col>

                                            <el-col :span="8">
                                                <el-form-item
                                                    label
                                                    prop="ruleType"
                                                    label-width="100px"
                                                >
                                                    <textarea
                                                        class="explain-input-style"
                                                        rows="5"
                                                        disabled
                                                    >函数体回显</textarea>
                                                </el-form-item>
                                            </el-col>

                                            <el-col :span="8">
                                                <el-form-item
                                                    label
                                                    prop="ruleType"
                                                    label-width="100px"
                                                >
                                                    <div
                                                        style="display:block;margin-left:10px;width:100px"
                                                    >
                                                        <span>
                                                            <input
                                                                type="input"
                                                                disabled
                                                                class="explain-input-style"
                                                                value="函数参数1"
                                                            />
                                                        </span>
                                                        <span>
                                                            <input
                                                                type="input"
                                                                disabled
                                                                class="explain-input-style"
                                                                value="函数参数2"
                                                            />
                                                        </span>
                                                        <span>...</span>
                                                    </div>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </el-form>
                                </div>
                                <span class="explain">表达式：Edm_co.entType == ceshi1( 'R', 1)</span>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
import operatorBase from "@/views/risk/dictdata/operatorSymbolBase"; //导入操作符基本项 加减乘除
import formulaSetValue from "@/components/FunctionSet/set_formula_variable_attribute";

export default {
    props: {
        cMeta: Object, //本页面模板json数据Layout对象
        cParentMeta: Object, //父页面模板json数据Layout对象
        cParentParams: Object, //父页面自定义参数与内置参数
        cParentScope: Object, //父页面每块区域业务数据
        conditionsListTemp: Object, //条件选项的原始数组
        conditionsListFilter: Object, //筛选后的条件选择项
        selectcConstant: Object, //常量填写选择项
        itemData: Object, //父类传过来的数据
        normalInput: Object, //父类传过来的普通场景主要输入数据
        //选择的数据类型
        conditionDataType: {
            type: String,
            default: "",
        },
        //父组件的关联选择转译方法
        getFormAmoutValidateInfo: {
            type: Function,
            default: null,
        },
        //父组件的主动输入筛选方法
        querySearch: {
            type: Function,
            default: null,
        },
        //不可编辑状态
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        formulaSetValue,
    },
    data() {
        return {
            ruleForm: {},
            placeholderText: "",
            functionDef: "",
            url: "./public/normal_demo.png",
            srcList: ["./public/normal_demo.png"],
            operatorSymbolBase: [], //操作符选项 基本加减乘除
            formulaType: [], //函数选择数组
            inputTypeList: [
                {
                    label: "<常量>",
                    value: "input",
                },
                {
                    label: "<变量>",
                    value: "select",
                },
            ],
        };
    },
    mounted() {
        this.operatorSymbolBase = operatorBase.data;
        // if (this.normalInput.inputRadio !== 0 && this.itemData.leftValue) {
        //   if (this.normalInput.inputRadio === 1) {
        //     this.normalInput.constantInputValue = this.itemData.leftValue
        //   }

        //   if (this.normalInput.inputRadio === 2) {
        //     this.normalInput.variableInputValue = this.itemData.leftValue
        //   }

        //   if (this.normalInput.inputRadio === 3) {
        //     this.simpleLeftInputValue = this.itemData.leftValue
        //     this.simpleRightInputValue = this.itemData.rightValue
        //   }
        // }
        this.getFunctionList();

        // if (this.selectcConstant) {
        //   this.selectcConstant = this.selectcConstant.map((terminal) => {
        //     return {
        //       value: terminal.value,
        //       name: terminal.value,
        //     };
        //   });
        //   console.log('selectcConstant----', this.selectcConstant);
        // }
        this.placeholderText = `请输入${this.itemData.conditionDataType}型常量`;
    },
    methods: {
        switchInputTypeName(type) {
            switch (type) {
                case "input":
                    return "<常量>";
                case "select":
                    return "<变量>";
            }
        },
        switchOperatorName(type) {
            switch (type) {
                case "+":
                    return "加";
                case "-":
                    return "减";
                case "*":
                    return "乘";
                case "/":
                    return "除";
            }
        },
        // 左边输入方式选择
        handleLeftInputType(command) {
            console.log("handleLeftInputType---command", command);
            this.normalInput.simpleLeftInputType = command.value;
        },
        // 右边输入方式选择
        handleRightInputType(command) {
            console.log("handleRightInputType---command", command);
            this.normalInput.simpleRightInputType = command.value;
        },
        //简单运算符下拉选项
        handleOperatorType(command) {
            console.log("handleOperatorType---command", command);
            this.normalInput.simpleOperatorSymbolValue = command.dictId;
        },
        //条件联合选择后激活
        changeConditions(val, type) {
            console.log("条件选择改变触发", val, type);
            let value =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).value
                    ? this.getFormAmoutValidateInfo(val).value
                    : "";
            let desc =
                this.getFormAmoutValidateInfo(val) &&
                this.getFormAmoutValidateInfo(val).label
                    ? this.getFormAmoutValidateInfo(val).label
                    : "";

            if (type === "left") {
                //简单计算，左边
                this.normalInput.simpleLeftInputValue = value;
                this.normalInput.simpleLeftInputDesc = desc;
            } else if (type === "right") {
                //简单计算右边
                this.normalInput.simpleRightInputValue = value;
                this.normalInput.simpleRightInputDesc = desc;
            } else {
                //变量选择
                this.normalInput.variableInputValue = value;
                this.normalInput.variableInputDesc = desc;
            }
        },
        //获取方法名选项
        getFunctionList() {
            let that = this;
            let resultType = this.conditionDataType;
            let params = {
                functionId: "",
                length: 100,
                start: 1,
                resultType,
                servicecode:
                    "deci080102"
               
            };
            that.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                .then((obj) => {
                    console.log("请求函数方法名列表回调", obj.data);
                    if (obj.data.length > 0) {
                        that.formulaType = obj.data;
                    }
                })
                .catch((reg) => {});
        },
        constantInputValueEven(e) {
            let value = e;
            if (this.itemData.conditionDataType === "Int") {
                //一般情况下只能输入整数
                this.normalInput.constantInputValue = value.replace(/\D/g, "");
            }
            if (this.itemData.conditionDataType === "Decimal") {
                //只能输入数字不能输入小数点
                this.normalInput.constantInputValue = value;//暂时不做控制 后续看需不需要控制 2024.3.18
                //   .replace(/[^\d.]/g, "")
                //    .replace(/^(\d+)\.(\d\d).*$/, "$1$2.$3");
            }
            // this.itemData.leftValue = this.normalInput.constantInputValue;
        },
        handleConstantSelect(item) {
            console.log(item);
            this.normalInput.constantInputValue = item.label;
        },
        //左边输入项输入事件
        leftValueInput(e) {
            let value = e;
            console.log("leftValueInput", e);
            if (this.itemData.conditionDataType === "Int") {
                //一般情况下只能输入整数
                this.normalInput.simpleLeftInputValue = value.replace(
                    /\D/g,
                    ""
                );
            }
            if (this.itemData.conditionDataType === "Decimal") {
                //只能输入数字不能输入小数点
                this.normalInput.simpleLeftInputValue = value; //暂时不做控制 后续看需不需要控制 2024.3.18
                    //.replace(/[^\d.]/g, "")
                    //.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
            }
            // this.itemData.leftValue = this.simpleLeftInputValue;
        },
        handleSimpleLeftSelect(item) {
            console.log("handleSimpleLeftSelect--主动输入被选择", item);
            this.normalInput.simpleLeftInputValue = item.label;
        },
        //右边输入项输入事件
        rightValueInput(e) {
            console.log("rightValueInput", e);
            let value = e;
            if (this.itemData.conditionDataType === "Int") {
                //一般情况下只能输入整数
                this.normalInput.simpleRightInputValue = value.replace(
                    /\D/g,
                    ""
                );
            }
            if (this.itemData.conditionDataType === "Decimal") {
                //只能输入数字不能输入小数点
                this.normalInput.simpleRightInputValue = value;//暂时不做控制 后续看需不需要控制 2024.3.18
                    //.replace(/[^\d.]/g, "")
                    //.replace(/^(\-)*(\d+)\.(\d\d).*$/, "$1$2.$3");
            }
        },
        handleSimpleRightSelect(item) {
            console.log("handleSimpleRightSelect--主动输入被选择", item);
            this.normalInput.simpleRightInputValue = item.label;
        },
        //单选按钮激活
        raidoChange(e) {
            this.resetNormal();
        },
        //复位数据

        simpleRightInputDesc: "", //简单计算左边输入描述
        simpleRightInputType: "", //右边输入值类型
        inputDataItem: [], //自定义函数选择
        resetNormal() {
            this.normalInput.constantInputValue = ""; //常量输入框值

            this.normalInput.variableInputValueShow = ""; //变量输入框值
            this.normalInput.variableInputValue = ""; //变量输入框值
            this.normalInput.variableInputDesc = ""; //变量输入描述

            this.normalInput.simpleLeftInputValue = ""; //简单计算左边输入值
            this.normalInput.simpleLeftInputValueShow = ""; //简单计算左边输入值
            this.normalInput.simpleLeftInputDesc = ""; //简单计算左边输入描述
            this.normalInput.simpleLeftInputType = "input"; //左边输入值类型
            this.normalInput.simpleRightInputValue = ""; //简单计算左边输入值
            this.normalInput.simpleRightInputValueShow = ""; //简单计算左边输入值
            this.normalInput.simpleRightInputDesc = ""; //简单计算左边输入描述
            this.normalInput.simpleRightInputType = "input"; //右边输入值类型

            this.normalInput.inputDataItem = []; //自定义函数选择
            this.normalInput.simpleOperatorSymbolValue = "+";
            this.itemData.funcitonCode = ""; //函数代码体
        },
        resetNormalAll() {
            this.normalInput.inputRadio = 0;
            this.resetNormal();
        },
        checkComplete() {
            if (this.normalInput.inputRadio === 0) {
                this.$message.error("请选择输入选项");
                return false;
            }
            //常量输入
            if (
                this.normalInput.inputRadio === 1 &&
                this.normalInput.constantInputValue === ""
            ) {
                this.$message.error("请填写常量值");
                return false;
            }
            //变量选择
            if (
                this.normalInput.inputRadio === 2 &&
                this.normalInput.variableInputValue === "" &&
                this.normalInput.variableInputDesc === ""
            ) {
                this.$message.error("请选择变量值");
                return false;
            }
            //简单计算
            if (
                (this.normalInput.inputRadio === 3 &&
                    this.normalInput.simpleLeftInputValue === "") ||
                (this.normalInput.inputRadio === 3 &&
                    this.normalInput.simpleRightInputValue === "")
            ) {
                this.$message.error("请选择输入选项");
                return false;
            }
            //函数选择
            if (
                this.normalInput.inputRadio === 4 &&
                this.normalInput.functionFormula === ""
            ) {
                this.$message.error("请选择输入选项");
                return false;
            }
            if (
                (this.normalInput.inputRadio === 4 &&
                    this.normalInput.functionFormula !== "") ||
                (this.normalInput.inputRadio === 4 &&
                    this.normalInput.inputDataItem.length > 0)
            ) {
                //遍历函数选择选项
                for (const child of this.normalInput.inputDataItem) {
                    if (child.attribute === "") {
                        this.$message.error("函数项目未填写完成");
                        return false;
                    }
                }
            }

            return true;
        },
        translationNormal() {
            switch (this.normalInput.inputRadio) {
                //常量输入
                case 1:
                    let leftTemp =
                        this.itemData.conditionDataType === "String"
                            ? `'${this.normalInput.constantInputValue}'`
                            : this.normalInput.constantInputValue;
                    this.itemData.itemCode = `${this.itemData.conditionValue} ${this.itemData.operatorSymbolValue} ${leftTemp} `;
                    this.itemData.itemDesc = `${this.itemData.conditionDesc} ${this.itemData.operatorSymbolDesc} ${this.normalInput.constantInputValue}`;
                    break;
                //变量选择
                case 2:
                    this.itemData.itemCode = `${this.itemData.conditionValue} ${this.itemData.operatorSymbolValue} ${this.normalInput.variableInputValue} `;
                    this.itemData.itemDesc = `${this.itemData.conditionDesc} ${this.itemData.operatorSymbolDesc} ${this.normalInput.variableInputDesc}`;

                    break;
                //简单计算
                case 3:
                    let leftValueTemp =
                        this.itemData.conditionDataType === "String" &&
                        this.normalInput.simpleLeftInputType === "input"
                            ? `'${this.normalInput.simpleLeftInputValue}'`
                            : this.normalInput.simpleLeftInputValue;
                    let rightValueTemp =
                        this.itemData.conditionDataType === "String" &&
                        this.normalInput.simpleRightInputType === "input"
                            ? `'${this.normalInput.simpleRightInputValue}'`
                            : this.normalInput.simpleRightInputValue;
                    let leftDescTemp =
                        this.normalInput.simpleLeftInputType === "input"
                            ? this.normalInput.simpleLeftInputValue
                            : this.normalInput.simpleLeftInputDesc;
                    let rightDescTemp =
                        this.normalInput.simpleRightInputType === "input"
                            ? this.normalInput.simpleRightInputValue
                            : this.normalInput.simpleRightInputDesc;
                    let simpleOperatorSymbolValueTemp = this.switchOperatorName(
                        this.normalInput.simpleOperatorSymbolValue
                    );

                    this.itemData.itemCode = `${this.itemData.conditionValue} ${this.itemData.operatorSymbolValue}${leftValueTemp} ${this.normalInput.simpleOperatorSymbolValue} ${rightValueTemp}`;
                    this.itemData.itemDesc = `${this.itemData.conditionDesc} ${this.itemData.operatorSymbolDesc}${leftDescTemp} ${simpleOperatorSymbolValueTemp} ${rightDescTemp} `;
                    break;
                case 4:
                    let code = `${this.itemData.conditionValue} ${this.itemData.operatorSymbolValue} ${this.normalInput.functionFormula}(`;
                    let desc = `${this.itemData.conditionDesc} ${this.itemData.operatorSymbolDesc} ${this.normalInput.functionFormulaDesc}(`;
                    //遍历选项输入
                    for (const child of this.normalInput.inputDataItem) {
                        if (child.inputType === "input") {
                            code =
                                child.paramsDataType === "String"
                                    ? `${code} '${child.attribute}',`
                                    : `${code} ${child.attribute},`;
                            desc =
                                child.paramsDataType === "String"
                                    ? `${desc} '${child.attribute}',`
                                    : `$:{desc} ${child.attribute},`;
                        } else {
                            code = `${code} ${child.attribute},`;
                            desc = `${desc} ${child.attributeDesc},`;
                        }
                    }
                    //把最末尾的,号变成)号
                    code = code.substring(0, code.length - 1) + ")";
                    desc = desc.substring(0, desc.length - 1) + ")";
                    this.itemData.itemCode = code;
                    this.itemData.itemDesc = desc;
                    break;
            }
        },
        //选择了函数设置
        changeFormula(functionCode) {
            console.log("changeFormula", functionCode);
            let that = this;
            if (!functionCode) {
                this.itemData.funcitonCode = "";
            }
            let temp = [];
            let item = that.formulaType.find(
                (item) => item.functionCode === functionCode
            );
            console.log("找到的item", item);
            // let loading = Loading.service();
            if (item !== undefined) {
                that.normalInput.functionFormulaDesc = item.functionName;
                let params = {
                    functionBody: item.functionBody,
                    functionCode: item.functionCode,
                    functionName: item.functionName,
                    servicecode: "deci010303"
                };
                that.itemData.funcitonCode = item.functionDef;
                that.$http
                    .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                    .then((obj) => {
                        console.log("选择了函数名称的回调", obj);
                        if (obj.data.length > 0) {
                            for (let i = 0; i < obj.data.length; i++) {
                                temp.push({
                                    // numericalType: '', //常量 变量
                                    attribute: "", //联合查询转译的公式  常量数值输入
                                    inputType: "select", //手输入还是选择输入
                                    paramsDataType: obj.data[i].paramsDataType,
                                    paramsCode: obj.data[i].paramsCode,
                                    paramsDesc: obj.data[i].paramsDesc,
                                });
                            }
                        }
                    })
                    .catch((reg) => {});
            }
            console.log("temp", temp);
            that.normalInput.inputDataItem = temp;
            // loading.close();
        },
    },
};
</script>

<style lang="less" scoped>
#page_content {
    width: 100%;
    height: 100%;
    position: relative;
    padding-bottom: 50px;

    /deep/ .el-autocomplete-suggestion {
        z-index: 10000 !important;
    }
    /deep/ .el-popper {
        z-index: 10000 !important;
    }
}

    /deep/ .el-autocomplete-suggestion {
        z-index: 10000 !important;
    }
    /deep/ .el-popper {
        z-index: 10000 !important;
    }
.simple-operator {
    width: 90%;
    display: flex;
    align-items: center;
    margin-left: 90px;
    margin-top: 0px;
}
.function-operator {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-left: -13px;
}
.variant-style {
    flex: 1;
    color: #00aaff;
    font-weight: bold;
}
#tipe {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    background-color: #fcfff3;
}
#tipe .content {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 95%;
    display: flex;
    flex-direction: column;
}
#tipe .tips {
    color: #ff8080;
    font-weight: bold;
    font-family: "宋体";
}
#tipe .explain {
    color: #e8aa4c;
}
#tipe span {
    font-size: 14px;
    padding: 1px;
    margin-right: 8px;
    color: #999999;
}
.radio-group {
    margin-left: 65px;
}
.component_item_div {
    display: flex;
    /* flex-direction: column; */
    width: 100%;
    margin-top: 10px;
}
.component_item_div2 {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    flex: 1;
}
.function_code {
    width: 420px;
    max-width: 420px;
    margin-bottom: 20px;
}
.component_item_content {
    width: 100%;
    align-items: center;
    margin-left: 10px;
}
.explain-input-style {
    width: 200px;
    color: #ff5500;
    resize: none;
}
.explain-div-border {
    border: 1px dashed;
    border-radius: 15px;
    padding: 20px;
    margin-top: 10px;
    margin-bottom: 10px;
}
.explain-title {
    display: -moz-inline-box;
    display: inline-block;
    width: 100px;
    color: #333;
    text-align: right;
}
</style>
