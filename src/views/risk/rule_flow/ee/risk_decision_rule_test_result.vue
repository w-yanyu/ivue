<template>
    <div class="page_content">
        <el-table :data="ptrule.detail" style="width: 100%" class="table">
            <!-- <el-table-column prop="rule_id" label="规则Id" align="center"></el-table-column> -->
            <el-table-column prop="ruleCode" label="规则代码" align="center"></el-table-column>
            <el-table-column prop="ruleName" label="规则名称" align="center"></el-table-column>
           
            <el-table-column prop="hitFlag" label="是否命中" align="center"  :formatter="formatHitFlag"></el-table-column>
           <el-table-column prop="inputValues" label="输入值" align="center"></el-table-column> 
            <!-- <el-table-column prop="attr_name" label="规则属性" align="center"></el-table-column> -->
            <el-table-column fixed="right"  align="center" label="动作列表" width="100">
                <template slot-scope="scope">
                    <el-button
                        @click="handleClick(scope.row)"
                        type="text"
                        size="small"
                         
                    >查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button
            class="copyBtn"
            v-if="tableData"
            type="primary"
            small
            @click="copy"
        >查看响应报文</el-button>
        <el-input type="textarea" class="inpudiv" ref="demoInput" v-model="responseData"></el-input>
        <el-dialog title="查看响应报文" :visible.sync="visible" :show-close="true" width="1200px" :close-on-click-modal="false">
            <div class="el-dialog-dev">
                <p>{{ responseData.toString() }}</p>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        cMeta: Object, //本页面模板json数据Layout对象
        cParentMeta: Object, //父页面模板json数据Layout对象
        cParentParams: Object, //父页面自定义参数与内置参数
        cParentScope: Object, //父页面每块区域业务数据
        ptrule:{type:Object},
    },
    data() {
        return {
            tableData: [],
          
            responseData: "",
            total: ["合计", ""],
            visible: false,
        };
    },
    mounted() {
       
      console.log("diergexuanbxiang",this.ptrule)
       
       
      //   this.form.groupName = response.group_name;
         
    },
    methods: {
    formatHitFlag(row, column) {
        switch (row.hitFlag) {
          case "hit":
            return "是";
            break;
          case "notHit":
            return "否";
            break;
        }
      },
        copy() {
        this.$dialog.open({
          that: this,
          title: "测试成功，规则响应报文如下：",
          toRequest: {
            url: "@RiskDecisionRuleDetail",
            method: "get",
            params: {
                rule_result: this.responseData
            },
          },
          width: "60%",
        });
        },
        handleClick(row) {
            console.log("cMeta", row);
            this.$dialog.open({
                that: this,
                title: "动作规则列表",
                toRequest: {
                    url: "@risk2",
                    method: "get",
                    params: {
                        tableData: row.riskDecisionAction,
                    },
                },
                width: "60%",
            });
        },
    },
};
</script>

<style lang="less" scoped>
.page_content {
    width: 100%;
    margin:0 0  0  -12px !important;
    .copyBtn {
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
    .inpudiv {
        opacity: 0;
    }
}
</style>
