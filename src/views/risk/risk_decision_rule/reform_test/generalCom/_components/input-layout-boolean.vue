<template>
    <div id="page_content">
        <!-- 布尔值 -->
        <div class="simple-operator">
            <el-select
                style="width: 420px;"
                v-model="itemData.leftValue"
                :label-in-value="true"
                @change="changeOperatorSymbol"
                clearable
            >
                <el-option
                    v-for="item in operatorSymbolBoolean"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId"
                ></el-option>
            </el-select>
        </div>
        <!-- 提示 -->
        <div id="tipe">
            <div class="content">
                <span class="tips">使用说明:</span>
                <span class="explain">1、左表达式：条件变量为boolean类型</span>
                <span class="explain">2、中间操作：只能为 等于</span>
                <span class="explain">3、右表达式：只能选择真 或 假</span>
                <span class="explain"></span>
                <span class="tips">使用案例：</span>
                <span class="explain">案例1：客户是否是否授信</span>
                <div style="border:1px dashed;border-radius:15px; margin:10px">
                    <div style="display:fles">
                        <span>
                            条件选择：
                            <input style="width:100px;color:red" disabled value="是否授信" />
                        </span>
                        <span>
                            条件属性：
                            <input style="width:100px;color:red" disabled value="cust.isCredit" />
                        </span>
                        <span>
                            数据类型：
                            <input style="width:100px;color:red" disabled value="Boolean--布尔" />
                        </span>
                    </div>
                    <span>
                        &nbsp;&nbsp;&nbsp;&nbsp;操作符：
                        <input style="width:100px;color:red" disabled value="等于" />
                    </span>
                    <div style="display:flex;margin:5px">
                        <input style="margin-left:65px;width:100px;color:red" disabled value="真" />
                    </div>
                </div>
                <span class="explain">表达式：cust.isCredit==true</span>
            </div>
        </div>
    </div>
</template>

<script>
import operatorBoolean from "@/views/risk/dictdata/operatorSymbolBoolean"; //导入操作符布尔类型选项

export default {
    props: {
        cMeta: Object, //本页面模板json数据Layout对象
        cParentMeta: Object, //父页面模板json数据Layout对象
        cParentParams: Object, //父页面自定义参数与内置参数
        cParentScope: Object, //父页面每块区域业务数据
        conditionsListFilter: Object, //筛选后的条件选择项
        itemData: Object, //父类传过来的数据
        //选择的数据类型
        conditionDataType: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            ruleForm: {},
            operatorSymbolBoolean: [], //操作符选项 布尔值情况
        };
    },
    mounted() {
        this.operatorSymbolBoolean = operatorBoolean.data;
    },
    methods: {
        changeOperatorSymbol(value) {
            console.log(value);
            this.itemData.leftDesc = value.toString() === "true" ? "真" : "假";
            this.$forceUpdate();
        },
        //重置输入选项
        resetBoolean() {
            this.itemData.leftInputType = "input";
            this.itemData.leftValue = "";
            this.itemData.leftDesc = "";
        },
        checkComplete() {
            console.log("this.itemData.leftValue",this.itemData.leftValue);
            if (this.itemData.leftValue === "" || this.itemData.leftValue==undefined) {
                this.$message.error("请选择逻辑符");
                return false;
            }
            return true;
        },
        // 转译
        translationBoolean() {
            this.itemData.itemCode = `${this.itemData.conditionValue}${this.itemData.operatorSymbolValue}${this.itemData.leftValue}`;
            this.itemData.itemDesc = `${this.itemData.conditionDesc} ${this.itemData.operatorSymbolDesc} ${this.itemData.leftDesc}`;
        },
    },
};
</script>

<style lang="css" scoped>
#page_content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
}
.simple-operator {
    margin-top: 20px;
    margin-left: 100px;
    width: 90%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.variant-style {
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
</style>
