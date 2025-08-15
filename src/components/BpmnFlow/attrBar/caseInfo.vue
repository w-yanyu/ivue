<template>
    <div>
        <el-form ref="form" :model="currentEditAtrr" label-width="110px" class="form-two-column">
            <el-form-item
                v-if="currentEditAtrr.originId !== undefined"
                label="ID"
                :rules="[{ required: true,message:'ID不能为空' }]"
                prop="originId"
            >
                <el-input v-model="currentEditAtrr.originId" disabled></el-input>
            </el-form-item>
            <el-form-item
                v-if="currentEditAtrr.nodeType === 'when' && currentEditAtrr.longname !== undefined"
                label="中文名称"
            >
                <el-input
                    v-model="currentEditAtrr.longname"
                    @blur="saveAttr()"
                    :disabled="onlyRead"
                ></el-input>
            </el-form-item>
            <el-form-item
                v-if="currentEditAtrr.condition !== undefined && currentEditAtrr.nodeType === 'when' && isShow" 
                label="执行条件"
                :rules="[{ required: true, message: '执行条件不能为空' }]"
                prop="condition"
                class="one-row"
            >
                <!-- <el-input
                    v-model="currentEditAtrr.condition"
                    @blur="saveAttr()"
                    :disabled="onlyRead"
                ></el-input>-->
                <el-cascader
                    v-model="currentEditAtrr.conditionValueShow"
                    filterable
                    :multiple="false"
                    :disabled="onlyRead"
                    :show-all-levels="false"
                    :options="conditionsList"
                    :props="{ expandTrigger: 'hover' }"
                    @change="changeConditions"
                ></el-cascader>
                <!-- <el-cascader
                    v-if="currentEditAtrr.conditionDataType !== 'Boolean'"
                    v-model="currentEditAtrr.operatorSymbolValueShow"
                    :options="operatorSymbolNormalFilter"
                    :disabled="onlyRead || currentEditAtrr.conditionValue===''"
                    :props="{ expandTrigger: 'hover', value:'dictId', label:'dictName' }"
                    @change="changeOperatorSymbol"
                ></el-cascader>-->
                <el-select
                    v-if="currentEditAtrr.conditionDataType !== 'Boolean'"
                    v-model="currentEditAtrr.operatorSymbolValue"
                    label-in-value
                    :disabled="onlyRead"
                    @change="changeOperatorSymbol"
                >
                    <el-option
                        v-for="item in operatorSymbolNormal"
                        :key="item.dictId"
                        :label="item.dictName"
                        :value="item.dictId"
                        :disabled="switchOperatorSymbolDisabled(item.dictId,currentEditAtrr.conditionDataType)"
                    ></el-option>
                </el-select>
                <el-select
                    v-else
                    v-model="currentEditAtrr.operatorSymbolValue"
                    label-in-value
                    :disabled="onlyRead"
                    @change="changeOperatorSymbol"
                >
                    <el-option
                        v-for="item in operatorSymbolBoolean"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="switchOperatorSymbolDisabled(item.value,currentEditAtrr.conditionDataType)"
                    ></el-option>
                </el-select>
                <el-input
                    v-model="currentEditAtrr.constantInputValue"
                    :disabled="onlyRead"
                    @blur="getCondition"
                ></el-input>
            </el-form-item>
            <el-form-item v-if="currentEditAtrr.desc !== undefined" label="描述" class="full-row">
                <el-input
                    v-model="currentEditAtrr.desc"
                    type="textarea"
                    :rows="4"
                    :disabled="onlyRead"
                    @blur="saveAttr()"
                ></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { deepClone } from "@/views/risk/utils/helper";
import operatorNormal from "@/views/risk/dictdata/operatorSymbolNormalFlow";

export default {
    props: {
        saveAttr: {
            type: Function,
            required: true,
        },
        onlyRead: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isShow:false,
            conditionsList: null, //条件选择选项
            conditionsListTemp: null, //条件选择选项缓存
            conditionsListFilter: null, //子项筛选后的选项
            operatorSymbolNormal: [], //操作符选项 正常情况
            operatorSymbolBoolean: [{
                "value": "==",
                "label": "等于"
            }]
            
        };
    },
    computed: {
        ...mapGetters(["currentEditAtrr"]),
        operatorSymbolNormalFilter() {
            if (this.operatorSymbolNormal.length === 0) {
                return;
            }
            let operatorClone = deepClone(this.operatorSymbolNormal);
            operatorClone.forEach((item, index, arrs) => {
                item.children.forEach((childrenItem, index, arrs) => {
                    if (
                        (childrenItem.dictId === "include" &&
                            this.currentEditAtrr.conditionDataType !==
                                "String") ||
                        (childrenItem.dictId === "contains" &&
                            this.currentEditAtrr.conditionDataType !==
                                "String") ||
                        (childrenItem.dictId === "startWith" &&
                            this.currentEditAtrr.conditionDataType !==
                                "String") ||
                        (childrenItem.dictId === "endWith" &&
                            this.currentEditAtrr.conditionDataType !==
                                "String") ||
                        (childrenItem.dictId === "substr" &&
                            this.currentEditAtrr.conditionDataType !==
                                "String") ||
                        (childrenItem.dictId === "indexOf" &&
                            this.currentEditAtrr.conditionDataType !==
                                "String") ||
                        (childrenItem.dictId === "length" &&
                            this.currentEditAtrr.conditionDataType !==
                                "String") ||
                        (childrenItem.dictId === "countstr" &&
                            this.currentEditAtrr.conditionDataType !== "String")
                    ) {
                        childrenItem.disabled = true;
                    }
                });
            });
            console.log("操作符筛选更新", operatorClone);
            return operatorClone;
        },
    },
    created() {
        
    },
    mounted() {
    console.log("caseInfo----->mounted");
    this. initPage();
    this.$bus.on("initCasePage", ()=>{
      this. initPage()
    });
  },
  beforeDestroy() {
    console.log("caseInfo----->beforeDestroy");
    this.$bus.off("initCasePage"); // 移除事件监听器
  },
  methods: {
    //初始化页面数据
    initPage() {
      console.log("caseInfo----->initPage");
      this.operatorSymbolNormal = operatorNormal.data[0].children;
      this.getConditionsList();
      if (this.currentEditAtrr.conditionValueShow) {
        this.currentEditAtrr.conditionValueShow = this.currentEditAtrr.conditionValueShow.toString().split(
          ","
        );
      }
      if (this.currentEditAtrr.operatorSymbolValueShow) {
        this.currentEditAtrr.operatorSymbolValueShow = this.currentEditAtrr.operatorSymbolValueShow.split(
          ","
        );
      }
      this.isShow=true;
    },
    getConditionsList() {
      this.conditionsList = [];
      this.conditionsListTemp = [];
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
          servicecode: "deci080101"
        })
        .then(obj => {
          console.log("获取联动条件选择选项字典回调444444444", obj.data);
          this.conditionsList = obj.data;
          this.conditionsListTemp = obj.data;
          this.conditionsListDataFilter(this.currentEditAtrr.conditionDataType);
        })
        .catch(reg => {});
    },
    changeConditions(val) {
      this.currentEditAtrr.condition =
        this.getFormAmoutValidateInfo(val) &&
        this.getFormAmoutValidateInfo(val).value
          ? this.getFormAmoutValidateInfo(val).value
          : "";
      this.currentEditAtrr.conditionDataType =
        this.getFormAmoutValidateInfo(val) &&
        this.getFormAmoutValidateInfo(val).dataType
          ? this.getFormAmoutValidateInfo(val).dataType
          : "";
      this.conditionsListDataFilter(this.currentEditAtrr.conditionDataType);
      this.saveAttr();
      this.resetCondition();
    },
    getFormAmoutValidateInfo(val) {
      for (let i in this.conditionsListTemp) {
        let item = this.conditionsListTemp[i].children;
        for (let z in item) {
          if (item[z].children) {
            for (let x in item[z].children) {
              if (item[z].children[x].value === val[val.length - 1]) {
                let obj = {
                  value: item[z].children[x].value,
                  label: item[z].label + "." + item[z].children[x].label,
                  dataType: item[z].children[x].dataType,
                  reference: item[z].children[x].reference
                };
                return obj;
              }
            }
          } else {
            if (val === undefined) {
              let obj = {
                value: item[z].value,
                label: item[z].label,
                dataType: item[z].dataType,
                reference: item[z].reference
              };
              return obj;
            }
            if (item[z].value === val[val.length - 1]) {
              let obj = {
                value: item[z].value,
                label: item[z].label,
                dataType: item[z].dataType,
                reference: item[z].reference
              };
              return obj;
            }
          }
        }
      }
    },
    chuangDataType(conditionDataType) {
      switch (conditionDataType) {
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
    conditionsListDataFilter(dataType) {
      let depDataRight = deepClone(this.conditionsListTemp);
      depDataRight.forEach((item, index, arrs) => {
        item.children.forEach((childrenItem, index, arrs) => {
          if (childrenItem.children) {
            childrenItem.children.forEach((grandchildrenItem, index, arrs) => {
              if (grandchildrenItem.dataType !== dataType) {
                grandchildrenItem.disabled = true;
              }
            });
          } else {
            if (childrenItem.dataType !== dataType) {
              childrenItem.disabled = true;
            }
          }
        });
      });
      console.log("筛选选项更新", depDataRight);
      this.conditionsListFilter = depDataRight;
    },
    resetCondition() {
      this.currentEditAtrr.operatorSymbolValue = "";
      this.currentEditAtrr.operatorSymbolValueShow = "";
    },
    changeOperatorSymbol(value) {
      let selectedOperatorSymbol = {};
      console.log("1step", this.currentEditAtrr.conditionDataType);
      if (this.currentEditAtrr.conditionDataType !== "Boolean") {
        let key = value[0];
        let findValue = value[1];
        console.log("2step", key);
        console.log("3step", findValue);

                // for (let i = 0; i < this.operatorSymbolNormal.length; i++) {
                //     if (this.operatorSymbolNormal[i].dictId === key) {
                //         selectedOperatorSymbol = this.operatorSymbolNormal[
                //             i
                //         ].children.find((item) => {
                //             //这里的chargingWorkNameList就是上面遍历的数据源
                //             return item.dictId === findValue;
                //             //筛选出匹配数据，是对应数据的整个对象
                //         });
                //     }
                // }
            } else {
                selectedOperatorSymbol = this.operatorSymbolBoolean.find(
                    (item) => {
                     console.log("4step",value);
                     console.log("5step",item.value);
                        //这里的chargingWorkNameList就是上面遍历的数据源
                        return item.value === value;
                        //筛选出匹配数据，是对应数据的整个对象
                    }
                );
            }
            console.log(selectedOperatorSymbol);
            this.currentEditAtrr.condition =
                this.currentEditAtrr.conditionValueShow[1] +
                    value +
                    this.currentEditAtrr.constantInputValue || "";
            this.saveAttr();
        },
        switchOperatorSymbolDisabled(value, leftType) {
            switch (value) {
                //大于..的..次方
                case "POW":
                    //成立的时候为选项内容不可选择
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
        getCondition() {
            this.currentEditAtrr.condition =
                this.currentEditAtrr.conditionValueShow[1] +
                this.currentEditAtrr.operatorSymbolValueShow[1] +
                this.currentEditAtrr.constantInputValue;
            this.saveAttr();
        },
    },
};
</script>

<style lang="less" scoped>
.form-two-column {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
        width: 50%;
    }
    .el-form-item.full-row {
        width: 100%;
    }
}
.one-row.el-form-item {
    width: 100%;
    .el-form-item__content > div {
        width: 33%;
    }
}
</style>
