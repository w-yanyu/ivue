<template>
  <div class="page_content">
    <el-form class="table_content" ref="ruleForm" :model="ruleForm" :rules="rules">
      <el-row>
        <el-col span="8">
          <el-form-item label="简单评分卡名称" prop="scoreCardName" label-width="100px">
            <el-input
              class="input_el"
              v-model="ruleForm.scoreCardName"
              disabled
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-form-item label="简单评分卡备注" prop="description" label-width="100px">
            <el-input
              class="input_el"
              v-model="ruleForm.description"
              disabled
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-table :data="parnentTableData" style="width: 100%" :row-key="getRowKey">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-table
              :data="props.row.child"
              border
              :row-key="getRowKey"
              style="width:90%;margin:auto"
            >
            <!-- <el-table-column prop="condition_operate" label="条件操作符">
        </el-table-column>
            <el-table-column prop="condition_value" label="条件值">
        </el-table-column>
            <el-table-column prop="score_points" label="得分">
        </el-table-column> -->
              <el-table-column prop="condition_operate" label="条件操作符">
                <template slot-scope="scope">
                  <el-select
                    size="mini"
                    style="width: 120px; margin-right: 0px;"
                    v-model="scope.row.conditionOperate"
                    v-if="scope.row.isSet || scope.row.isRulesSet"
                    :label-in-value="true"
                  >
                    <el-option
                      v-for="item in conditionType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <span
                    v-else
                  >{{ setConditionOperate(scope.row.condition_operate) }}</span>
                </template>
              </el-table-column>

              <el-table-column prop=" condition_value" label="条件值">
                <template slot-scope="scope">
                  <el-input
                    size="mini"
                    v-if="scope.row.isSet || scope.row.isRulesSet"
                    v-model="scope.row.conditionValue"
                  ></el-input>
                  <span v-else>{{ scope.row.condition_value }}</span>
                </template>
              </el-table-column>

              <el-table-column prop="score_points" label="得分">
                <template slot-scope="scope">
                  <el-input-number
                    size="mini"
                    v-if="scope.row.isSet || scope.row.isRulesSet"
                    v-model.number="scope.row.scorePoints"
                    :precision="2"
                  ></el-input-number>
                  <span v-else>{{ scope.row.score_points }}</span>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>

        <el-table-column prop="scoreModelCode" label="评分模型代码">
          <template slot-scope="scope">
            <el-input
              size="mini"
              v-if="scope.row.isSet"
              v-model="scope.row.scoreModelCode"
            ></el-input>
            <span v-else>{{ scope.row.scoreModelCode }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="scoreAttributeName" label="评分属性名称">
          <template slot-scope="scope">
            <el-cascader
              v-if="scope.row.isSet"
              size="mini"
              v-model="scope.row.scoreAttribute"
              :options="dataList"
              :props="{ expandTrigger: 'hover'  }"
              @change="changeLeft(scope)"
              style="width: max-content"
            ></el-cascader>
            <span v-else>{{ scope.row.scoreAttributeName }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="scorePercent" label="权重">
          <template slot-scope="scope">
            <el-input-number
              size="mini"
              v-if="scope.row.isSet"
              v-model.number="scope.row.scorePercent"
              :precision="2"
              @blur="scorePercentInput($event,scope.row)"
            ></el-input-number>
            <span v-else>{{ scope.row.scorePercent }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>


<script>
import editTableItem from "@/views/risk/risk_score_card/risk_score_card_model_edit_edit.vue";

export default {
  name: "RiskScoreCardModelViewCompare",
  props: {
    cMeta: Object, //本页面模板json数据Layout对象
    cParentMeta: Object, //父页面模板json数据Layout对象
    cParentParams: Object, //父页面自定义参数与内置参数
    cParentScope: Object, //父页面每块区域业务数据
  },
  components: {
    editTableItem,
  },
  data() {
    return {
      addCount: 0,
      ruleForm: {
        scoreCardId: "", //评分卡ID
        scoreCardCode: "1", //评分卡代码
        scoreCardName: "CNY", //评分卡名称
        description: "", //备注
        scoreRuleList: ""
      },
      isShowSaveBtn: false, //是否显示保存按钮
      editUrl: "/views/risk/risk_score_card/risk_score_card_edit.json",
      cParams: this.cParentParams,
      dataList: "",
      parnentTableData: [],
      tableData: [],
      // 合并的长度
      colSpanArr: [],
      // 合并开始的位置
      rowIndexArr: [],
      conditionType: [
        {
          value: "",
          label: "空",
        },
        {
          value: "==",
          label: "等于",
        },
        {
          value: "!=",
          label: "不等于",
        },
        {
          value: ">",
          label: "大于",
        },
        {
          value: ">=",
          label: "大于等于",
        },
        {
          value: "<",
          label: "小于",
        },
        {
          value: "<=",
          label: "小于等于",
        },
        {
          value: "IN",
          label: "在什么范围内",
        },
        {
          value: "NOT_IN",
          label: "不在什么范围内",
        },
        {
          value: "BETWEEN",
          label: "在什么与什么之间",
        },
        {
          value: "LIKE",
          label: "包含",
        },
        {
          value: "NOT_LIKE",
          label: "不包含",
        },
        {
          value: "STARTSWITH",
          label: "开头是",
        },
        {
          value: "NOT_STARTSWITH",
          label: "开头不是",
        },
        {
          value: "ENDSWITH",
          label: "结尾是",
        },
        {
          value: "NOT_ENDSWITH",
          label: "结尾不是",
        },
       {
          value: "POW",
          label: "大于..的..次方",
        },
      ],
      needMergeArr: ["scoreModelCode", "scoreAttribute", "scorePercent"], // 有合并项的列
      rowMergeArrs: {}, // 包含需要一个或多个合并项信息的对象
      modifyDialogVisible: false,
      addDialogVisible: false,
      modifyTableVisible: false,
      itemParams: {},
    };
  },
  created() {

  },
  mounted() {
    this.init();
    this.getFactList();
  },
  methods: {
    init() {
      //debuggrt
      this.ruleForm.scoreCardId = this.cParams.scoreCardId; //评分卡ID
      this.ruleForm.scoreCardCode = this.cParams.scoreCardCode; //评分卡代码
      this.ruleForm.scoreCardName = this.cParams.scoreCardName; //评分卡名称
      this.ruleForm.description = this.cParams.description; //备注
      // this.ruleForm.scoreRuleList = this.cParams.scoreRuleList; //规则列表
      let tempList = JSON.parse(this.cParams.scoreRuleList);
      console.log("###123###", tempList)
      this.parnentTableData = this.removeOther(tempList);
      console.log("###456###", this.parnentTableData)
    },

    removeOther(data) {
      let mapParent = {};
      data.forEach((row) => {
        mapParent[row.score_model_id] = row;
      });
      let map = {};
      data.forEach((row) => {
        map[row.score_model_code] = {
          scoreModelId: row.score_model_id,
          scoreModelCode: row.score_model_code,
          scorePercent: row.score_percent,
          scoreCardCode: row.score_card_code,
          scoreAttribute: row.score_attribute,
          scoreAttributeName: row.score_attribute_name,
        };
      //debuggrt
      });
      let array = [];
      console.log("map打印");
      console.log(map);
      for (let key in map) {
        let obj = map[key];
        obj.id = key;
        array.push(obj);
      }

      console.log("###789####")
      console.log(array);
      console.log("###abc####")
      console.log(mapParent);

      array = this.addChildTable(array, mapParent);
      return array;
    },

    addChildTable(array, map) {
      let children = [];
      array.forEach((item) => {
        for (let key in map) {
          let obj = map[key];
          if (obj.score_model_code === item.scoreModelCode) {
            obj.id = key;
            children.push(obj);
          }
        }
        item.child = children;
        children = [];
      });
      return array;
    },
    //请求评分属性选择数据
    getFactList() {
      this.dataLeft = [];
      this.dataRight = [];
      this.rightDataLeft = [];
      //请求评分属性选择项目
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
                   servicecode: "deci080101"
                })
        .then((obj) => {
          this.dataList = obj.data;
          this.dataLeft = obj.data;
        })
        .catch((reg) => {
        });
    },
    getRowKey(row) {
      return row.id;
    },
    handleDeleteAll(index, row) {
      //debuggrt
      let params = {
        scoreModelId: row.scoreModelId,
        scoreModelCode: row.scoreModelCode, //评分模型代码
        scoreCardCode: this.cParams.scoreCardCode,
        servicecode:
          "deci020116",
        appId: "risk-management-service",
      };
      this.$http
        .invokeAPI("/SUMP/riskController/riskCall", "POST", params)
        .then((obj) => {
          if (obj.code === "200") {
            this.$message.success("删除成功");
            //刷新表格
            this.getScoreModel();
          } else {
            this.$message.warning("删除失败，请稍后尝试");
          }
        })
        .catch((reg) => {
        });
    },
    handleDelete(index, row) {
      let params = {
        scoreModelId: row.scoreModelId,
        scoreModelCode: row.scoreModelCode, //评分模型代码
        scoreCardCode: this.cParams.scoreCardCode,
        servicecode:
          "risk-management-service/risk-score-card-model/del",
        appId: "risk-management-service",
      };
      this.$http
        .invokeAPI("/SUMP/riskController/riskCall", "POST", params)
        .then((obj) => {
          if (obj.code === "200") {
            this.$message.success("删除成功");
            this.tableData.splice(index, 1);
          } else {
            this.$message.warning("删除失败，请稍后尝试");
          }
        })
        .catch((reg) => {
        });
    },
    //读取表格数据
    readTable() {
      //根据实际情况，自己改下啊
      this.tableData.map((i) => {
        i.isSet = false; //给后台返回数据添加`isSet`标识
        return i;
      });
    },


    changeLeft(val) {
      val.row.scoreAttributeDataType =
        this.getFormAmoutValidateInfo(val.row.scoreAttribute) &&
        this.getFormAmoutValidateInfo(val.row.scoreAttribute).dataType
          ? this.getFormAmoutValidateInfo(val.row.scoreAttribute)
            .dataType
          : "";
      val.row.scoreAttribute =
        this.getFormAmoutValidateInfo(val.row.scoreAttribute) &&
        this.getFormAmoutValidateInfo(val.row.scoreAttribute).value
          ? this.getFormAmoutValidateInfo(val.row.scoreAttribute)
            .value
          : "";
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
                  label:
                    item[z].label +
                    "." +
                    item[z].children[x].label,
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

    /**
     * @description 根据数组将指定对象转化为相应的数组
     * @param arr:Array[String] 必填 必须是字符串形式的数组
     * @param data:Array 必填 需要转化的对象
     *
     * @return 返回一个对象
     * 例：rowMerge(['name','value'], [{value:'1', name:'小明'}, {value:'2', name:'小明'}, {value:'3', name:'小明'}, {value:'1', name:'小明'}, {value:'1', name:'小明'}])
     * 返回值: {
     *          name:{
     *            rowArr: [5, 0, 0, 0, 0]
     *            rowMergeNum: 0,
     *          },
     *          value: {
     *            rowArr: [1, 1, 1, 2, 0],
     *            rowMergeNum: 3
     *          }
     *        }
     */
    rowMergeHandle(arr, data) {
      if (!Array.isArray(arr) && !arr.length) return false;
      if (!Array.isArray(data) && !data.length) return false;
      let needMerge = {};
      arr.forEach((i) => {
        needMerge[i] = {
          rowArr: [],
          rowMergeNum: 0,
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
      return needMerge;
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
    setConditionOperate(event) {
      console.log("条件1操作"+event);
      console.log("条件2操作"+this.conditionType);
      for (let i in this.conditionType) {
        if (this.conditionType[i].value === event) {
          return this.conditionType[i].label;
        }
      }
    },
  },
};
</script>


<style lang="css" scoped>
.page_content {
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.table_content {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 30px;
}

.el-table-add-row {
  margin-top: 10px;
  width: 100%;
  height: 34px;
  border: 1px dashed #c1c1cd;
  border-radius: 3px;
  cursor: pointer;
  justify-content: center;
  display: flex;
  line-height: 34px;
  margin-bottom: 20px;
}
</style>
