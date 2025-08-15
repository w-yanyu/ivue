<template>
  <div>
    <el-form
      ref="form"
      :model="currentEditAtrr"
      label-width="110px"
      class="form-two-column"
      :rules="rules"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="base" class="isForm">
          <el-form-item v-if="false" label="ID" prop="originId">
            <el-input v-model="currentEditAtrr.originId" disabled />
          </el-form-item>
          <el-form-item label="评分卡代码" prop="scoreCardCode">
            <el-input
              v-model="currentEditAtrr.scoreCardCode"
              @blur="saveAttr()"
              :disabled="true"
            >
              <el-button slot="append" type="primary" :disabled="onlyRead" @click="openDialog">选择</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="评分卡名称" prop="scoreCardName">
            <el-input
              v-model="currentEditAtrr.scoreCardName"
              @blur="saveAttr()"
              :disabled="true"
            />
          </el-form-item>
          <el-form-item label="版本号" prop="version">
            <el-input v-model="currentEditAtrr.version" disabled />
          </el-form-item>
          <el-form-item
            v-if="currentEditAtrr.nodeType === 'complexScoreCard'"
            label="总分计算方式"
            prop="totalExecType"
          >
            <el-select
              v-model="currentEditAtrr.totalExecType"
              @change="saveAttr()"
              :disabled="true"
            >
              <el-option
                v-for="item in totalExecTypeList"
                :key="item.dictId"
                :label="item.dictName"
                :value="item.dictId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="将总分赋值给" prop="totalAssignedTo">
            <el-cascader
              ref="totalAssignedTo"
              v-model="currentEditAtrr.totalAssignedTo"
              :options="conditionsList"
              :disabled="onlyRead"
              :props="{ expandTrigger: 'hover', emitPath: false }"
              clearable
              placeholder="请选择事实属性"
              @change="changeTotalAssignedTo"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane
          v-if="currentEditAtrr.nodeType === 'complexScoreCard'"
          label="规则信息"
          name="rule"
        >
          <el-table
            :data="parnentTableData"
            style="width: 100%"
            border
            :row-key="getRowKey"
            :key="tableKey1"
            :span-method="objectSpanMethod"
          >
            <el-table-column type="expand" v-if="currentEditAtrr.nodeType !== 'complexScoreCard'" :key="11"></el-table-column>
            <el-table-column prop="scoreAttribute" label="属性" align="center" :key="10">
              <template slot-scope="scope" class="attributeTable">
                <span>
                  {{ scope.row.scoreAttributeName }}({{
                  scope.row.scoreAttribute
                  }})
                </span>
                <div class="btnDiv">
                  <span
                    class="el-tag el-tag--primary el-tag--mini"
                    style="cursor: pointer"
                    @click="handleEdit(scope.$index, scope.row)"
                    v-if="false"
                  >编辑</span>
                  <span
                    class="el-tag el-tag--info el-tag--mini"
                    style="cursor: pointer"
                    @click="handleView(scope.$index, scope.row)"
                  >查看</span>
                  <span
                    class="el-tag el-tag--danger el-tag--mini"
                    style="cursor: pointer"
                    @click="handleDelete(scope.$index, scope.row)"
                    v-if="false"
                  >删除</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="scoreAttributePercent" label="权重" align="center" width="70%">
              <template slot-scope="scope">
                <span>{{ scope.row.scoreAttributePercent }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="itemExecuteExpress" label="条件表达式" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.itemExecuteExpress }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="itemExecuteExpressDesc" label="条件描述" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.itemExecuteExpressDesc }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="itemScoreAttribute" label="分值" align="center">
              <template slot-scope="scope">
                <span>
                  {{
                  DataTypeorFormat(scope.row.itemScoreAttributeDataType)
                  }}
                  : {{ scope.row.itemScoreAttribute }}
                </span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane
          v-if="currentEditAtrr.nodeType === 'simpleScoreCard'"
          label="条件信息"
          name="condition"
        >
          <el-table :data="parnentTableData2" style="width: 100%" :row-key="getRowKey" border :key="tableKey2">
            <el-table-column type="expand" key="">
              <template slot-scope="props">
                <el-table
                  :data="props.row.child"
                  border
                  :row-key="getRowKey"
                  style="width: 90%; margin: auto"
                >
                  <el-table-column prop="conditionOperate" label="条件操作符">
                    <template slot-scope="scope">
                      <el-select
                        size="mini"
                        style="width: 120px; margin-right: 0px"
                        v-model="scope.row.conditionOperate"
                        v-if="scope.row.isSet || scope.row.isRulesSet"
                        :label-in-value="true"
                        @change="
                          relation(
                            scope.row.conditionOperate,
                            scope.row.scoreAttributeDataType
                          )
                        "
                      >
                        <el-option
                          v-for="item in conditionType"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          :disabled="
                            switchScoreDisabled(
                              item.value,
                              scope.row.scoreAttributeDataType
                            )
                          "
                        ></el-option>
                      </el-select>
                      <span v-else>
                        {{
                        setConditionOperate(scope.row.conditionOperate)
                        }}
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop=" conditionValue" label="条件值">
                    <template slot-scope="scope">
                      <el-input
                        size="mini"
                        v-if="scope.row.isSet || scope.row.isRulesSet"
                        v-model="scope.row.conditionValue"
                      ></el-input>
                      <span v-else>{{ scope.row.conditionValue }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="scorePoints" label="得分" align="center">
                    <template slot-scope="scope">
                      <div v-if="scope.row.isSet || scope.row.isRulesSet">
                        <span
                          class="el-tag el-tag--info el-tag--mini"
                          style="cursor: pointer"
                          @click="setFormula(scope.row, scope.$index, true)"
                        >
                          {{
                          scope.row.scoreMoldText
                          ? scope.row.scoreMoldText
                          : "得分"
                          }}
                        </span>
                        <span v-if="scope.row.scorePoints !== ''">={{ scope.row.scorePoints }}</span>
                      </div>
                      <span v-else>{{ scope.row.scorePoints }}</span>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column prop="id" label="规则操作" align="center" v-if="!onlyRead">
                    <template slot-scope="scope" v-if="!scope.row.isSet">
                                            <span
                                              class="el-tag el-tag--danger el-tag--mini"
                                              style="cursor: pointer"
                                              @click="handleDelete2(scope.$index, scope.row)"
                                            >删除</span>
                    </template>
                  </el-table-column>-->
                </el-table>
              </template>
            </el-table-column>
            <el-table-column prop="scoreAttribute" label="评分属性字段">
              <template slot-scope="scope">
                <el-input size="mini" v-if="scope.row.isSet" v-model="scope.row.scoreAttribute"></el-input>
                <span v-else>{{ scope.row.scoreAttribute }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="scoreAttributeName" label="评分属性名称">
              <template slot-scope="scope">
                <el-cascader
                  v-if="scope.row.isSet"
                  size="mini"
                  v-model="scope.row.scoreAttribute"
                  :options="dataList"
                  :props="{ expandTrigger: 'hover' }"
                  @change="changeLeft(scope)"
                  style="width: max-content"
                ></el-cascader>
                <span v-else>{{ scope.row.scoreAttributeName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="scoreModelCode" label="属性数据类型">
              <template slot-scope="scope">
                <el-input
                  size="mini"
                  v-if="scope.row.isSet"
                  v-model="scope.row.scoreAttributeDataType"
                ></el-input>
                <span v-else>
                  {{
                  chuangvalue(scope.row.scoreAttributeDataType)
                  }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="scorePercent" label="权重">
              <template slot-scope="scope">
                <el-input-number
                  size="mini"
                  v-if="scope.row.isSet"
                  v-model.number="scope.row.scorePercent"
                  :precision="2"
                  @blur="scorePercentInput($event, scope.row)"
                ></el-input-number>
                <span v-else>{{ scope.row.scorePercent }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="数据操作" align="center" v-if="false">
              <template slot-scope="scope">
                <span
                  class="el-tag el-tag--info el-tag--mini"
                  style="cursor: pointer"
                  @click="changeTable(scope.row, scope.$index, true)"
                >{{ scope.row.isSet ? "保存" : "修改" }}</span>
                <span
                  v-if="!scope.row.isSet"
                  class="el-tag el-tag--danger el-tag--mini"
                  style="cursor: pointer"
                  @click="handleDeleteAll(scope.$index, scope.row)"
                >删除</span>
                <span
                  v-else
                  class="el-tag el-tag--mini"
                  style="cursor: pointer"
                  @click="CancelTable(scope.row, scope.$index, false)"
                >取消</span>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <el-button
        v-if="activeName === 'rule' && currentEditAtrr.scoreCardCode"
        type="primary"
        class="addBtn"
        :disabled="true"
        @click="openEditeDialog('add')"
      >添加条件</el-button>
      <el-button
        v-if="activeName === 'condition' && currentEditAtrr.scoreCardCode"
        type="primary"
        class="addBtn"
        :disabled="true"
        @click="addTable"
      >添加条件</el-button>
    </el-form>
    <el-dialog
      width="70%"
      title="条件"
      :close-on-click-modal="false"
      :visible.sync="actionDialog"
      append-to-body
    >
      <el-form ref="form" :model="form" label-width="100px">
        <rule-select
          style="overflow: auto; min-width: 900px"
          :ruleData="ruleData"
          :conditionsList="conditionsList"
          :disabled="disabled"
          :isEdit="isEdit"
        ></rule-select>
        <div style="height: 20px"></div>
        <el-form-item label="可执行表达式">
          <el-input
            ref="input_expression"
            type="textarea"
            label
            :disabled="disabled"
            :value="ruleData.executeExpressShow"
            spellcheck="false"
            placeholder
            resize="none"
            rows="6"
            class="input_expression"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" v-if="!isEdit && !disabled" @click="saveConfirm('add')">保存</el-button>
        <el-button type="primary" v-if="isEdit && !disabled" @click="saveConfirm('update')">保存</el-button>
        <el-button v-if="!disabled" @click="reset">重置</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import totalExecTypeDictdata from "@/views/risk/dictdata/totalExecType"; //导入操作符正常值选项
import RuleSelect from "@/views/risk/risk_score_card/simple_score_card_remould/_components/score_card_select";

export default {
  props: {
    conditionsList: Object, //事实联合选择字典
    saveAttr: {
      type: Function,
      required: true
    },
    onlyRead: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeName: "base",
      totalExecTypeList: [],
      parnentTableData: [],
      tableKey1:"1",
      parnentTableData2: [],
      tableKey2:"2",
      tableData: [],
      addCount: 1,
      itemParams: {},
      needMergeArr: ["scoreModelCode", "scoreAttribute", "scorePercent"], // 有合并项的列
      rowMergeArrs: {}, // 包含需要一个或多个合并项信息的对象
      spanArr: [], //用于存放每一行记录的合并数
      rules: {
        originId: [{ required: true, message: "ID不能为空", trigger: "blur" }],
        scoreCardCode: [
          {
            required: true,
            message: "评分卡代码不能为空",
            trigger: "blur"
          }
        ],
        scoreCardName: [
          {
            required: true,
            message: "评分卡名称不能为空",
            trigger: "blur"
          }
        ],
        version: [
          {
            required: true,
            message: "版本号不能为空",
            trigger: "blur"
          }
        ],
        totalExecType: [
          {
            required: true,
            message: "总分计算方式不能为空",
            trigger: "blur"
          }
        ],
        totalAssignedTo: [
          {
            required: true,
            message: "总分赋值不能为空",
            trigger: "blur"
          }
        ]
      },
      actionDialog: false,
      params: {},
      currentRule: {},
      crtZhRule: "",
      crtOriginBizRule: "", //回显的表达式
      ruleValue: "",
      ruleData: {
        executeExpressShow: " if(){} \n else{}", //回显表达式
        executeExpress: "", //规则转译表达式上传后台表达式
        executeExpressDesc: "", //中文描述（暂时没写）
        conditionValueShow: "", //回显条件选择值
        conditionValue: "", //条件选择值
        conditionDesc: "", //条件选择后的转译解释
        conditionDataType: "", //属性数据类型
        scoreAttributePercent: "1", //权重
        functionCodeAll: "", //所有函数体代码字符串
        ifItem: {
          itemExecuteExpress: "", //规则转译表达式上传后台表达式
          itemExecuteExpressDesc: "", //中文描述（暂时没写）
          executeFunctionCode: "", //可执行的方法
          executeExpress: "", //可执行表达式
          executeExpressDesc: "", //可执行表达式中文描述
          executeExpressNature: "", //规则条件的json字段
          actionValue: "", //分值 表达式
          valueFunctionCode: "", //得分函数方法
          valueExpression: "", // //得分表达式后台用  方法+表达式
          valueNatureExpress: "", //上传json
          valueType: "", //数据类型
          attributeDesc: "", //关联选择解释
          buttonText: "" //按钮文本
        },
        elseIfArray: [],
        elseItem: {
          itemExecuteExpress: "", //规则转译表达式上传后台表达式
          itemExecuteExpressDesc: "", //中文描述（暂时没写）
          valueFunctionCode: "", //得分函数方法
          actionValue: "", //分值 表达式
          valueExpression: "", //得分表达式后台用  方法+表达式
          valueNatureExpress: "", //上传json
          valueType: "", //数据类型
          attributeDesc: "", //关联选择解释
          buttonText: "" //按钮文本
        }
      },
      conditionsList: [], //联动条件选择选项字典
      disabled: false, //是否禁止编辑
      isEdit: false, //编辑模式下关联选择不可修改
      conditionType: [
        {
          value: "==",
          label: "等于"
        },
        {
          value: "!=",
          label: "不等于"
        },
        {
          value: ">",
          label: "大于"
        },
        {
          value: ">=",
          label: "大于等于"
        },
        {
          value: "<",
          label: "小于"
        },
        {
          value: "<=",
          label: "小于等于"
        },
        {
          value: "IN",
          label: "在什么范围内"
        },
        {
          value: "NOT_IN",
          label: "不在什么范围内"
        },
        {
          value: "BETWEEN",
          label: "在什么与什么之间"
        },
        {
          value: "POW",
          label: "大于..的..次方"
        },
        {
          value: "LIKE",
          label: "包含"
        },
        {
          value: "NOT_LIKE",
          label: "不包含"
        },
        {
          value: "STARTSWITH",
          label: "开头是"
        },
        {
          value: "NOT_STARTSWITH",
          label: "开头不是"
        },
        {
          value: "ENDSWITH",
          label: "结尾是"
        },
        {
          value: "NOT_ENDSWITH",
          label: "结尾不是"
        }
      ]
    };
  },
  components: {
    RuleSelect
  },
  computed: {
    ...mapGetters(["currentEditAtrr"])
  },
  created() {
    this.totalExecTypeList = totalExecTypeDictdata.data;
    this.getConditionsList();
    if (this.onlyRead) {
      this.getScoreModel();
    }
    console.log("scoreCardInfo----->created");
  },
  mounted() {
    console.log("scoreCardInfo----->mounted");
  },
  beforeDestroy() {
    console.log("scoreCardInfo----->beforeDestroy");
  },
  methods: {
    ...mapMutations(["SET_EDIT_ATTR"]),
    getRowKey(row) {
      return row.id;
    },
    relation(conditionOperate, scoreAttributeDataType) {
      if (scoreAttributeDataType === "Boolean") {
        this.$message({
          message: "条件值请输入true或false",
          type: "warning"
        });
      }
      if (
        scoreAttributeDataType === "Int" ||
        scoreAttributeDataType === "Decimal"
      ) {
        if (
          conditionOperate === "==" ||
          conditionOperate === "!=" ||
          conditionOperate === ">" ||
          conditionOperate === ">=" ||
          conditionOperate === "<" ||
          conditionOperate === "<="
        ) {
          this.$message({
            message: "条件值请输入最多2位小数的数值",
            type: "warning"
          });
        }
      }
      if (conditionOperate === "BETWEEN") {
        this.$message({
          message:
            "请注意条件值输入格式为：配置()开区间,[]闭区间,例如(0,1)、[0,1]、(0,1]、[1,0)  右区间的值大于等于左区间",
          type: "warning"
        });
      }
      if (conditionOperate === "IN" || conditionOperate === "NOT_IN") {
        if (scoreAttributeDataType === "Int") {
          this.$message({
            message: "请注意条件值输入格式为：1|2|3多个之间竖线隔开的整数",
            type: "warning"
          });
        } else if (scoreAttributeDataType === "Decimal") {
          this.$message({
            message:
              "请注意条件值输入格式为：1.00|2.00|3.00多个之间竖线隔开的带两位小数的数值",
            type: "warning"
          });
        } else {
          this.$message({
            message: "请注意条件值输入格式为：a|a|c多个之间竖线隔开的字符",
            type: "warning"
          });
        }
      }
      if (conditionOperate === "POW") {
        this.$message({
          message:
            "请注意条件值输入格式为：1,2 只能输入两个整数，中间用逗号隔开",
          type: "warning"
        });
      }
      if (conditionOperate === "LIKE") {
        this.$message({
          message:
            "请注意条件值输入格式为：配置一字符串，用来判断某个字符是否存在某个事实属性",
          type: "warning"
        });
      }
      if (conditionOperate === "NOT_LIKE") {
        this.$message({
          message:
            "请注意条件值输入格式为：配置一字符串，用来判断某个字符是否不存在某个事实属性",
          type: "warning"
        });
      }
      if (conditionOperate === "STARTSWITH") {
        this.$message({
          message:
            "请注意条件值输入格式为：配置一字符串，用来判断事实属性是否以该字符串开头",
          type: "warning"
        });
      }
      if (conditionOperate === "NOT_STARTSWITH") {
        this.$message({
          message:
            "请注意条件值输入格式为：配置一字符串，用来判断事实属性否以该字符串开头不是",
          type: "warning"
        });
      }
      if (conditionOperate === "ENDSWITH") {
        this.$message({
          message:
            "请注意条件值输入格式为：配置一字符串，用来判断事实属性是否以该字符串结尾",
          type: "warning"
        });
      }
      if (conditionOperate === "NOT_ENDSWITH") {
        this.$message({
          message:
            "请注意条件值输入格式为：配置一字符串，用来判断事实属性否以该字符串结尾不是",
          type: "warning"
        });
      }
    },
    //选择项是否可选的判断
    switchScoreDisabled(value, leftType) {
      switch (value) {
        //大于..的..次方
        case "POW":
          return leftType === "String" || leftType === "Boolen";
        //包含
        case "LIKE":
          return leftType === "Int" || leftType === "Decimal";
        //不包含
        case "NOT_LIKE":
          return leftType === "Int" || leftType === "Decimal";
        //开头是
        case "STARTSWITH":
          return leftType === "Int" || leftType === "Decimal";
        //开头不是
        case "NOT_STARTSWITH":
          return leftType === "Int" || leftType === "Decimal";
        //结尾是
        case "ENDSWITH":
          return leftType === "Int" || leftType === "Decimal";
        //结尾不是
        case "NOT_ENDSWITH":
          return leftType === "Int" || leftType === "Decimal";
      }
    },
    setConditionOperate(value) {
      for (let i in this.conditionType) {
        if (this.conditionType[i].value === value) {
          return this.conditionType[i].label;
        }
      }
    },
    //设置得分公式
    setFormula(row, index, cg) {
      let that = this;
      that.$dataBus.bindCallBackMethod(that, that.dialogCallBack, {});
      that.$dialog.open({
        that: that,
        title: "设置得分公式",
        toRequest: {
          url: "@functionSetAll",
          method: "get",
          params: {
            title: "分数",
            row,
            index,
            cg,
            dataType: "Decimal"
          }
        },
        width: "70%"
      });
    },
    handleDelete2(index, row) {
      this.$confirm("此操作将删除该行内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let conditionInfo = JSON.parse(this.currentEditAtrr.conditionInfo);
          const ind = conditionInfo.findIndex(item => item.id === row.id);
          conditionInfo.splice(ind, 1);
          this.SET_EDIT_ATTR({
            ...this.currentEditAtrr,
            conditionInfo: JSON.stringify(conditionInfo)
          });
          this.saveAttr();
          this.getScoreModel();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    changeLeft(val) {
      val.row.scoreAttributeDataType =
        this.getFormAmoutValidateInfo(val.row.scoreAttribute) &&
        this.getFormAmoutValidateInfo(val.row.scoreAttribute).dataType
          ? this.getFormAmoutValidateInfo(val.row.scoreAttribute).dataType
          : "";
      val.row.scoreAttribute =
        this.getFormAmoutValidateInfo(val.row.scoreAttribute) &&
        this.getFormAmoutValidateInfo(val.row.scoreAttribute).value
          ? this.getFormAmoutValidateInfo(val.row.scoreAttribute).value
          : "";
    },
    chuangvalue(value) {
      switch (value) {
        case "String":
          return "String--字符串";
          break;
        case "Int":
          return "Int--整数";
          break;
        case "Decimal":
          return "Decimal--数值";
          break;
        case "Boolean":
          return "Boolean--布尔";
          break;
      }
    },
    //权重输入
    scorePercentInput(event, row) {
      let value = event.target.value;
      if (parseInt(value) > 1) {
        row.scorePercent = "1.0";
      } else {
        row.scorePercent = event.target.value;
      }
    },
    changeTable(row, index, cg) {
      //点击修改 判断是否已经保存所有操作
      for (let i of this.tableData) {
        if (i.isSet && i.id !== row.id) {
          this.$message.warning("请先保存当前编辑项");
          return false;
        }
      }
      if (
        row.scoreModelCode === "" ||
        row.scoreAttribute === "" ||
        row.scorePercent === "" ||
        row.child.conditionOperate === "" ||
        row.child.conditionValue === ""
      ) {
        this.$message.warning("表格内容不能为空");
        return false;
      }
      //点击的是修改按钮，弹出修改对话框
      if (!row.isSet) {
        this.itemParams = row;
        this.showEditDialog("修改");
      }
    },
    handleDeleteAll(index, row) {
      this.$confirm("此操作将删除该行内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let conditionInfo = JSON.parse(this.currentEditAtrr.conditionInfo);
          for (let i = 0; i < conditionInfo.length; i++) {
            const ind = conditionInfo.findIndex(
              item => item.scoreModelCode === row.scoreModelCode
            );
            conditionInfo.splice(ind, 1);
          }
          this.SET_EDIT_ATTR({
            ...this.currentEditAtrr,
            conditionInfo: JSON.stringify(conditionInfo)
          });
          this.saveAttr();
          this.getScoreModel();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    CancelTable(row, index, cg) {
      if (!row.scoreModelId) {
        this.tableData.pop(); //删除最后一行
        this.rowMergeArrs = this.rowMergeHandle(
          this.needMergeArr,
          this.tableData
        ); // 处理数据
        return;
      }
      //点击修改 判断是否已经保存所有操作
      for (let i of this.tableData) {
        if (i.isSet && i.id !== row.id) {
          this.$message.warning("请先保存当前编辑项");
          return false;
        }
      }
      if (
        row.scoreModelCode === "" ||
        row.scoreAttribute === "" ||
        row.scorePercent === "" ||
        row.conditionOperate === "" ||
        row.conditionValue === ""
      ) {
        this.$message.warning("表格内容不能为空");
        return false;
      }
      //是否是取消操作
      if (!cg) {
        return (row.isSet = !row.isSet);
      }
    },
    addTable() {
      if (this.parnentTableData2.length !== 0) {
        let numberArr = [];
        if (
          this.parnentTableData2[0].scoreModelCode !== undefined &&
          this.parnentTableData2[0].scoreModelCode !== ""
        ) {
          this.parnentTableData2.forEach(item => {
            let split = item.scoreModelCode.split("_");
            numberArr.push(parseInt(split[split.length - 1]));
          });
        }
        this.addCount = Math.max(...numberArr) + 1;
      }
      let rowNew = {
        scoreModelCode:
          this.currentEditAtrr.scoreCardCode + "_" + this.addCount, //评分模型代码
        scoreCardCode: this.currentEditAtrr.scoreCardCode,
        scoreAttributeDataType: "",
        scoreAttribute: "", // 评分属性
        scorePercent: "0", //权重
        status: 1,
        isSet: true
      };
      this.itemParams = rowNew;
      this.showEditDialog("新增条件");
    },
    showEditDialog(titleName) {
      this.$dataBus.bindCallBackMethod(this, this.editDialogCallBack, {});
      this.$dialog.open({
        that: this,
        title: titleName,
        toRequest: {
          url: "@riskScoreCardModelEditEdit",
          method: "get",
          params: {
            cParentParams: this.currentEditAtrr,
            itemParams: this.itemParams,
            disabledFlag: titleName === "修改",
            isFlow: true
          }
        },
        width: "85%"
      });
    },
    editDialogCallBack(btnConfig, response, isEdit) {
      let conditionInfo = JSON.parse(this.currentEditAtrr.conditionInfo);
      let newConditionInfo = [];
      if (isEdit) {
        response.forEach((item, index) => {
          conditionInfo.forEach((info, indexinfo) => {
            if (item.oldScoreCardMode === info.scoreModelCode) {
              newConditionInfo.push(indexinfo);
            }
          });
        });
        newConditionInfo = [...new Set(newConditionInfo)];
        for (let i = newConditionInfo.length - 1; i >= 0; i--) {
          conditionInfo.splice(newConditionInfo[i], 1);
        }
        conditionInfo.push(...response);
      } else {
        conditionInfo.push(...response);
      }
      delete this.currentEditAtrr.conditionInfo;
      this.SET_EDIT_ATTR({
        ...this.currentEditAtrr,
        conditionInfo: JSON.stringify(conditionInfo)
      });
      this.saveAttr();
      this.getScoreModel();
    },
    changeTotalAssignedTo() {
      this.currentEditAtrr.totalAssignedToDesc = this.$refs.totalAssignedTo.getCheckedNodes()[0].label;
      this.saveAttr();
    },
    handleClick(tab, event) {
      if (tab.name === "rule" && this.currentEditAtrr.scoreCardCode) {
        delete this.currentEditAtrr.ruleInfo;
        this.getScoreRule();
      } else if (
        tab.name === "condition" &&
        this.currentEditAtrr.scoreCardCode
      ) {
        delete this.currentEditAtrr.conditionInfo;
        this.getScoreModel();
      }
    },
    getScoreRule(type = undefined) {
      let params = {
        scoreCardCode: this.currentEditAtrr.scoreCardCode,
        version: this.currentEditAtrr.version
      };
      if (this.currentEditAtrr.ruleInfo) {
        if (type == 1) {
          console.log('function getScoreRule type == 1');
          this.$http
          .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
            ...params,
            servicecode: "deci020124",

            isList: true
          })
          .then(obj => {
            this.SET_EDIT_ATTR({
              ...this.currentEditAtrr,
              ruleInfo: JSON.stringify(obj.data)
            });
            this.saveAttr();
            this.tidyTableData(obj.data);
          });
        } else {
          this.tidyTableData(JSON.parse(this.currentEditAtrr.ruleInfo));
        }
        
      } else {
        this.$http
          .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
            ...params,
            servicecode: "deci020124",

            isList: true
          })
          .then(obj => {
            this.SET_EDIT_ATTR({
              ...this.currentEditAtrr,
              ruleInfo: JSON.stringify(obj.data)
            });
            this.saveAttr();
            this.tidyTableData(obj.data);
          });
      }
    },
    //整理表格数据
    tidyTableData(chaosTableData) {
      let tableData = chaosTableData;
      let newArr = [];
      for (let i = 0; i < tableData.length; i++) {
        let jsonRule = JSON.parse(tableData[i].executeExpressNature);
        newArr.push({
          ...tableData[i],
          itemExecuteExpress: jsonRule.ifItem.itemExecuteExpress, //if的单项表达式
          itemExecuteExpressDesc: jsonRule.ifItem.itemExecuteExpressDesc, //if的单项中文表达式
          itemScoreAttribute: jsonRule.ifItem.actionValue, //if的单项得分
          itemScoreAttributeDataType: jsonRule.ifItem.valueType, //if的单项得分
          numAll: i
        });
        for (let j = 0; j < jsonRule.elseIfArray.length; j++) {
          newArr.push({
            ...tableData[i],
            itemExecuteExpress: jsonRule.elseIfArray[j].itemExecuteExpress, //elseif的单项表达式
            itemExecuteExpressDesc:
              jsonRule.elseIfArray[j].itemExecuteExpressDesc, //elseif的单项中文表达式
            itemScoreAttribute: jsonRule.elseIfArray[j].actionValue, //elseif的单项得分
            itemScoreAttributeDataType: jsonRule.elseIfArray[j].valueType, //elseif的单项得分
            numAll: i
          });
        }
        newArr.push({
          ...tableData[i],
          itemExecuteExpress: jsonRule.elseItem.itemExecuteExpress, //else的单项表达式
          itemExecuteExpressDesc: jsonRule.elseItem.itemExecuteExpressDesc, //else的单项中文表达式
          itemScoreAttribute: jsonRule.elseItem.actionValue, //else的单项得分
          itemScoreAttributeDataType: jsonRule.elseItem.valueType, //else的单项得分
          numAll: i
        });
      }
      this.parnentTableData = newArr;
      this.parnentTableData = Object.assign([], this.parnentTableData); //主动刷新表格数据
      this.getSpanArr(this.parnentTableData);
      this.tableKey1 = Math.random()//动态刷新表格
    },
    getSpanArr(data) {
      this.spanArr = [];
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].numAll === data[i - 1].numAll) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }
    },
    //选择项是否可选的判断
    DataTypeorFormat(itemScoreAttributeDataType) {
      let str;
      switch (itemScoreAttributeDataType) {
        //大于..的..次方
        case 1:
          str = "常量";
          break;
        //包含
        case 2:
          str = "变量";
          break;
        //不包含
        case 3:
          str = "函数";
          break;
      }
      return str;
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        const _row = this.spanArr[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          // [0,0] 表示这一行不显示， [2,1]表示行的合并数
          rowspan: _row,
          colspan: _col
        };
      }
    },
    handleView(index, row) {
      this.openEditeDialog("view", index, row);
    },
    handleEdit(index, row) {
      this.openEditeDialog("edit", index, row);
    },
    handleDelete(index, row) {
      this.$confirm("此操作将删除该行内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let ruleInfo = JSON.parse(this.currentEditAtrr.ruleInfo);
          const ind = ruleInfo.findIndex(
            item => item.scoreRuleId === row.scoreRuleId
          );
          ruleInfo.splice(ind, 1);
          this.SET_EDIT_ATTR({
            ...this.currentEditAtrr,
            ruleInfo: JSON.stringify(ruleInfo)
          });
          this.saveAttr();
          this.getScoreRule();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    openEditeDialog(type, index, row) {
      this.actionDialog = true;
      this.currentRule = row;
      try {
        this.ruleData = JSON.parse(row.executeExpressNature);
      } catch (error) {
        this.reset();
      }
      switch (type) {
        case "add":
          this.isEdit = false;
          this.disabled = false;
          break;
        case "edit":
          this.isEdit = true;
          this.disabled = false;
          break;
        case "view":
          this.isEdit = false;
          this.disabled = true;
          break;
      }
    },
    openDialog() {
      this.$dataBus.bindCallBackMethod(this, this.jsonCallBack, {});
      this.$dialog.open({
        that: this,
        title: "评分卡代码选择",
        toRequest: {
          url: "/views/risk/risk_score_card/lookup2.json",
          method: "get",
          params: {
            scoreCardType:
              this.currentEditAtrr.nodeType === "simpleScoreCard" ? "0" : "1"
          }
        },
        width: "80%"
      });
    },
    jsonCallBack(btnConfig, response) {
      if (this.currentEditAtrr.nodeType === "simpleScoreCard") {
        this.SET_EDIT_ATTR({
          ...this.currentEditAtrr,
          ...response,
          ruleInfo: ""
        });
        this.getScoreModel(1);
      } else {
        this.SET_EDIT_ATTR({
          ...this.currentEditAtrr,
          ...response,
          conditionInfo: ""
        });
        this.getScoreRule(1);
      }

      // this.saveAttr();
    },
    /**
     * 初始化簡單評分卡ID正常，但是更新簡單評分卡ID失敗。增加額外處理。
     * @param type 操作標識 default=undefined、1=更換簡單評分卡ID
     */
    getScoreModel(type = undefined) {
      let params = {
        scoreCardCode: this.currentEditAtrr.scoreCardCode,
        servicecode: "deci020108",
        //servicecode: "risk-management-service/risk-score-card-model/page-select",
        //appId: "risk-management-service",
        isList: true,
        start: 1,
        length: 100
      };
      if (this.currentEditAtrr.conditionInfo) {
        // 臨時增加處理 type=1的時候進行接口查詢。只針對於簡單评分卡
        if (type == 1) {
           this.$http
          .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
          .then(obj => {
            obj.data.forEach(i => {
              i.isSet = false;
              i.isRulesSet = false;
              if (i.valueNatureExpress) {
                let jsonObj = JSON.parse(i.valueNatureExpress);
                if (jsonObj && jsonObj.scoreMoldText) {
                  i.scoreMoldText = jsonObj.scoreMoldText;
                }
              }
              return i;
            });

            this.parnentTableData2 = this.removeOther(obj.data);
            this.tableKey2 = Math.random()//动态刷新表格
            console.log("请求后的数据 type == 1：", this.parnentTableData2);
            this.SET_EDIT_ATTR({
              ...this.currentEditAtrr,
              conditionInfo: JSON.stringify(obj.data)
            });
            
            this.saveAttr();
            // this.rowMergeArrs = this.rowMergeHandle(
            //   this.needMergeArr,
            //   this.tableData
            // );
          })
          .catch(reg => {});
        } else {
          this.parnentTableData2 = this.removeOther(
            JSON.parse(this.currentEditAtrr.conditionInfo)
          );
          this.tableKey2 = Math.random()//动态刷新表格
          console.log("请求后的数据1：", this.parnentTableData2);
        }
      } else {
        this.$http
          .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
          .then(obj => {
            obj.data.forEach(i => {
              i.isSet = false;
              i.isRulesSet = false;
              if (i.valueNatureExpress) {
                let jsonObj = JSON.parse(i.valueNatureExpress);
                if (jsonObj && jsonObj.scoreMoldText) {
                  i.scoreMoldText = jsonObj.scoreMoldText;
                }
              }
              return i;
            });

            this.parnentTableData2 = this.removeOther(obj.data);
            this.tableKey2 = Math.random()//动态刷新表格
            console.log("请求后的数据2：", this.parnentTableData2);
            this.SET_EDIT_ATTR({
              ...this.currentEditAtrr,
              conditionInfo: JSON.stringify(obj.data)
            });
            this.saveAttr();
            this.rowMergeArrs = this.rowMergeHandle(
              this.needMergeArr,
              this.tableData
            );
          })
          .catch(reg => {});
      }
    },
    removeOther(data) {
      console.log("data", data);
      let mapParent = {};
      data.forEach(row => {
        if (!row.scoreModelId) {
          row.scoreModelId = "SCI" + Math.random();
        }
        mapParent[row.scoreModelId] = row;
      });
      let map = {};
      data.forEach(row => {
        map[row.scoreModelCode] = {
          scoreModelId: row.scoreModelId,
          scoreModelCode: row.scoreModelCode,
          scorePercent: row.scorePercent,
          scoreCardCode: row.scoreCardCode,
          scoreAttribute: row.scoreAttribute,
          scoreAttributeName: row.scoreAttributeName,
          scoreAttributeDataType: row.scoreAttributeDataType
        };
      });
      let array = [];
      for (let key in map) {
        let obj = map[key];
        obj.id = key;
        array.push(obj);
      }
      array = this.addChildTable(array, mapParent);
      console.log("removeOther", array);
      return array;
    },
    addChildTable(array, map) {
      let children = [];
      array.forEach(item => {
        for (let key in map) {
          let obj = map[key];
          if (obj.scoreModelCode === item.scoreModelCode) {
            obj.id = key;
            children.push(obj);
          }
        }
        item.child = children;
        children = [];
      });
      return array;
    },
    rowMergeHandle(arr, data) {
      if (!Array.isArray(arr) && !arr.length) return false;
      if (!Array.isArray(data) && !data.length) return false;
      let needMerge = {};
      arr.forEach(i => {
        needMerge[i] = {
          rowArr: [],
          rowMergeNum: 0
        };
        data.forEach((item, index) => {
          if (index === 0) {
            needMerge[i].rowArr.push(1);
            needMerge[i].rowMergeNum = 0;
          } else {
            if (item[i] === data[index - 1][i]) {
              needMerge[i].rowArr[needMerge[i].rowMergeNum] += 1;
              needMerge[i].rowArr.push(0);
            } else {
              needMerge[i].rowArr.push(1);
              needMerge[i].rowMergeNum = index;
            }
          }
        });
      });
      console.log("needMerge", needMerge);
      return needMerge;
    },
    saveConfirm(type) {
      if (!this.isCompleted()) {
        return;
      }
      const userInfo = JSON.parse(localStorage.getItem("user_info"));
      let ruleInfo = JSON.parse(this.currentEditAtrr.ruleInfo);
      if (type === "update") {
        const params = {
          ...this.currentRule,
          scoreAttribute: this.ruleData.conditionValue, //属性
          scoreAttributeName: this.ruleData.conditionDesc, //属性中文名称
          scoreAttributeDataType: this.ruleData.conditionDataType, //属性类型
          scoreAttributePercent: this.ruleData.scoreAttributePercent, //权重
          executeExpress: this.ruleData.executeExpress, //规则转译表达式
          executeExpressDesc: this.ruleData.executeExpressDesc, //中文描述
          executeExpressNature: JSON.stringify(this.ruleData), //json数据，用于回显
          updateUser: userInfo.userCode //最后修改人
        };
        const index = ruleInfo.findIndex(
          item => item.scoreRuleId === this.currentRule.scoreRuleId
        );
        ruleInfo[index] = Object.assign({}, ruleInfo[index], params);
      } else if (type === "add") {
        const params = {
          scoreRuleId: `SCR${this.$moment().format(
            "YYYYMMDDHHmmss"
          )}${Math.random()
            .toFixed(6)
            .slice(-6)}`, //评分卡规则Id
          scoreCardCode: this.currentEditAtrr.scoreCardCode, //评分卡的代码（上一个页面带过来的）
          scoreAttribute: this.ruleData.conditionValue, //属性
          scoreAttributeName: this.ruleData.conditionDesc, //属性中文名称
          scoreAttributeDataType: this.ruleData.conditionDataType, //属性类型
          scoreAttributePercent: this.ruleData.scoreAttributePercent, //权重
          executeExpress: this.ruleData.executeExpress, //规则转译表达式
          executeExpressDesc: this.ruleData.executeExpressDesc, //中文描述（暂时没写）
          executeExpressNature: JSON.stringify(this.ruleData), //你的json数据，用于回显使用
          totalExecType: this.currentEditAtrr.totalExecType, //总分计算类型
          createUser: userInfo.userCode, //创建人
          updateUser: userInfo.userCode //最后修改人
        };
        ruleInfo.push(params);
      }
      this.SET_EDIT_ATTR({
        ...this.currentEditAtrr,
        ruleInfo: JSON.stringify(ruleInfo)
      });
      this.saveAttr();
      this.getScoreRule();
      this.actionDialog = false;
    },
    isCompleted() {
      let isCompleted = true;
      if (this.ruleData.conditionValue === "") {
        this.$message.error("请选择事实属性");
        isCompleted = false;
      } else if (
        this.ruleData.ifItem.executeExpress === "" ||
        this.ruleData.ifItem.actionValue === ""
      ) {
        this.$message.error("请设置if选项的内容");
        isCompleted = false;
      } else if (this.ruleData.elseIfArray.length > 0) {
        for (const child of this.ruleData.elseIfArray) {
          if (child.executeExpress === "" || child.actionValue === "") {
            this.$message.error("请设置else if选项的内容");
            isCompleted = false;
            break;
          }
        }
      } else if (this.ruleData.elseItem.actionValue === "") {
        this.$message.error("请设置else选项的内容");
        isCompleted = false;
      }
      return isCompleted;
    },
    reset() {
      this.ruleData = {
        conditionValueShow: "", //回显条件选择值
        conditionValue: "", //条件选择值
        conditionDesc: "", //条件选择后的转译解释
        conditionDataType: "", //属性数据类型
        scoreAttributePercent: "1", //权重
        functionCodeAll: "", //所有函数体代码字符串
        ifItem: {
          executeFunctionCode: "", //可执行的方法
          executeExpress: "", //可执行表达式
          executeExpressDesc: "", //可执行表达式中文描述
          executeExpressNature: "", //规则条件的json字段
          actionValue: "", //分值 表达式
          valueFunctionCode: "", //得分函数方法
          valueExpression: "", // //得分表达式后台用  方法+表达式
          valueNatureExpress: "", //上传json
          valueType: "", //数据类型
          attributeDesc: "", //关联选择解释
          buttonText: "" //按钮文本
        },
        elseIfArray: [],
        elseItem: {
          valueFunctionCode: "", //得分函数方法
          actionValue: "", //分值 表达式
          valueExpression: "", //得分表达式后台用  方法+表达式
          valueNatureExpress: "", //上传json
          valueType: "", //数据类型
          attributeDesc: "", //关联选择解释
          buttonText: "" //按钮文本
        }
      };
    },
    //初始化条件选择选项字典
    getConditionsList() {
      this.conditionsList = [];
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
          servicecode: "deci080101"
        })
        .then(obj => {
          this.conditionsList = obj.data;
        })
        .catch(reg => {});
    },
    //设置规则转译内容
    setCrtOriginBizRule(newValue) {
      this.crtOriginBizRule = newValue;
    },
    formValid() {
      let flag = true;
      this.$refs.form.validate(valid => {
        flag = valid;
      });
      return flag;
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .el-tabs .el-tabs__content {
  border: 0;

  .el-tab-pane {
    margin-top: -1px;
  }
}

.form-two-column {
  padding: 0;
  position: relative;

  /deep/ .el-tabs__header {
    padding-left: 16px;
  }

  .el-tab-pane.isForm {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  .el-form-item {
    width: 50%;
    margin-bottom: 18px;

    .el-select,
    .el-cascader {
      width: 100%;
    }
  }

  /deep/ .el-form-item.full-row {
    width: 100%;
  }

  .el-input-group__append .el-button {
    margin: 0px -20px;
    padding: 10px 20px;
    border-radius: 0 4px 4px 0;
  }
}

.addBtn {
  position: absolute;
  top: 5px;
  right: 0;
}
</style>
