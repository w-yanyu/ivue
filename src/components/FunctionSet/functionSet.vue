<template>
    <div class="component_content">
        <!-- 选择函数后的选项 -->
        <el-select
            style="min-width: 250px;width:140px;"
            v-model="cParentParams.formula"
            :label-in-value="true"
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
                v-if="cParentParams.functionDef"
                v-model="cParentParams.functionDef"
                type="textarea"
                resize="none"
                autosize
                :disabled="disabled"
            ></el-input>
            <div class="component_item_div2">
                <div
                    class="component_item_content"
                    v-for="(item,index) in cParentParams.inputDataItem"
                    :key="index"
                >
                    <formulaSetValue
                        :cParentParams="item"
                        :disabled="disabled"
                        :dataList="dataList"
                    ></formulaSetValue>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import formulaSetValue from "./set_formula_variable_attribute.vue";

export default {
    props: {
        cMeta: Object, //本页面模板json数据Layout对象
        cParentMeta: Object, //父页面模板json数据Layout对象
        cParentParams: Object, //父页面自定义参数与内置参数
        cParentScope: Object, //父页面每块区域业务数据
        formulaType: Array, //父类传过来的数组
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
            disabled: false,
            dataList: [],
        };
    },
    mounted() {
        console.log("父类传过来的数据--functionSet", this.cParentParams);
        this.getFactList();
        // this.getFunctionList();
    },
    methods: {
        //选择了函数设置
        changeFormula(functionCode) {
            console.log("changeFormula", functionCode);
            let that = this;
            let temp = [];
            let item = that.formulaType.find(
                (item) => item.functionCode === functionCode
            );
            console.log("找到的item", item);
            // let loading = Loading.service();
            if (item !== undefined) {
                this.cParentParams.functionDef = item.functionDef;
                let params = {
                    functionBody: item.functionBody,
                    functionCode: item.functionCode,
                    functionName: item.functionName,
                    servicecode:  "deci010303"
                };
                that.$http
                    .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
                    .then((obj) => {
                        console.log("选择了函数名称的回调", obj);
                        if (obj.data.length > 0) {
                            for (let i = 0; i < obj.data.length; i++) {
                                temp.push({
                                    // numericalType: '', //常量 变量
                                    variable: "", //联合查询的值
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
            that.cParentParams.inputDataItem = temp;
            // loading.close();
        },
        //初始化事实下拉列表
        getFactList() {
            console.log("获取联动选择的默认选项字典");
            this.dataLeft = [];
            this.dataRight = [];
            this.rightDataLeft = [];
            this.$http
                .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", {
                    servicecode:"deci080101"
                })
                .then((obj) => {
                    this.dataList = obj.data;
                    this.dataRight = obj.data;
                    this.dataLeft = obj.data;
                    this.dataListDecimal = this.dataFilter("Decimal");
                })
                .catch((reg) => {});
        },
    },
};
</script>

<style lang="css" scoped>
.component_content {
    display: flex;
    flex-direction: column;
    width: 100%;
}
.div_content {
    display: flex;
    width: 90%;
    align-items: center;
    margin-top: 30px;
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
    display: flex;
    width: 100%;
    align-items: center;
    margin-left: 10px;
}
.dialog-footer {
    width: 100%;
    display: flex;
    justify-content: center;
    text-align: center;
    padding-bottom: 50px;
    margin-top: 50px;
}
</style>
