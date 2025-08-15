<template>
  <div class="page_content">
    <el-form ref="form" :model="form" label-width="80px">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 评分卡节点</span>
          <el-table :data="execScoreCardInfoParams" class='table'>
            <el-table-column prop="code" label="评分卡代码" align='center'>
            </el-table-column>
            <!-- <el-table-column prop="scoreModelName" label="分数模型名称" align='center' :formatter="formatNodeType">
            </el-table-column> -->
            <el-table-column prop="total" label="总分" align='center'>
            </el-table-column>
            <el-table-column fixed="right" label="详情" width="100" align='center'>
              <template slot-scope="scope">
                <el-button @click="handleScoreCardInfoClick(scope.row)" type="text" size="small"
                  v-if="scope.row.array && scope.row.array.length>0">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 普通规则节点</span>
          <el-table :data="execNormalRuleInfoParams" class='table'>
            <el-table-column prop="ruleId" label="规则ID" align='center'>
            </el-table-column>
            <el-table-column prop="ruleCode" label="规则代码" align='center' >
            </el-table-column>
            <el-table-column prop="ruleName" label="规则名称" align='center'>
            </el-table-column>
            <el-table-column prop="hitFlag" label="命中标识" align='center' :formatter="formatHitFlag">
            </el-table-column>
            <el-table-column fixed="right" label="动作查看" width="100" align='center'>
              <template slot-scope="scope">
                <el-button @click="handleNormalRuleInfoClick(scope.row)" type="text" size="small"
                  v-if="scope.row.riskDecisionActionList && scope.row.riskDecisionActionList.length>0">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane>
          <span slot="label"><i class="el-icon-date"></i> 规则树节点</span>
          <el-tabs type="border-card">
            <el-tab-pane>
              <span slot="label"><i class="el-icon-date"></i> 命中规则</span>
              <el-table :data="execTreeInfoParams.hit" class='tableHit'>
                <el-table-column prop="trxnSeq" label="交易流水号" align='center'>
                </el-table-column>
                <el-table-column prop="treeId" label="规则树ID" align='center'>
                </el-table-column>
                <el-table-column prop="ruleTreeNodeId" label="节点ID" align='center'>
                </el-table-column>
                <el-table-column prop="nodeIdFrom" label="父节点ID" align='center'>
                </el-table-column>
                <el-table-column prop="nodeType" label="节点类型" align='center' :formatter="formatNodeType">
                </el-table-column>
                <el-table-column prop="ruleDesc" label="规则描述" align='center'>
                </el-table-column>
                <el-table-column prop="hitFlag" label="命中标识" align='center' :formatter="formatHitFlag">
                </el-table-column>
                <el-table-column fixed="right" label="动作查看" width="100" align='center'>
                  <template slot-scope="scope">
                    <el-button @click="handleRuleTreeActionResultClick(scope.row)" type="text" size="small"
                      v-if="scope.row.ruleTreeActionResultList && scope.row.ruleTreeActionResultList.length>0">查看
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane>
              <span slot="label"><i class="el-icon-date"></i> 未命中规则</span>
              <el-table :data="execTreeInfoParams.notHit" class='tableHit'>
                <el-table-column prop="trxnSeq" label="交易流水号" align='center'>
                </el-table-column>
                <el-table-column prop="treeId" label="规则树ID" align='center'>
                </el-table-column>
                <el-table-column prop="ruleTreeNodeId" label="节点ID" align='center'>
                </el-table-column>
                <el-table-column prop="nodeIdFrom" label="父节点ID" align='center'>
                </el-table-column>
                <el-table-column prop="nodeType" label="节点类型" align='center' :formatter="formatNodeType">
                </el-table-column>
                <el-table-column prop="ruleDesc" label="规则描述" align='center'>
                </el-table-column>
                <el-table-column prop="hitFlag" label="命中标识" align='center' :formatter="formatHitFlag">
                </el-table-column>
                <!-- <el-table-column fixed="right" label="规则树查看" width="100" align='center'>
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small"
                      v-if="scope.row.ruleTreeActionResultList && scope.row.ruleTreeActionResultList.length>0">查看
                    </el-button>
                  </template>
                </el-table-column> -->
              </el-table>
            </el-tab-pane>

          </el-tabs>
        </el-tab-pane>

      </el-tabs>
    </el-form>
    <el-button class="copyBtn" type="primary" small @click="copy">复制到剪贴板</el-button>
    <el-input type="textarea" class="inpudiv" ref="demoInput" v-model="responseData"></el-input>
  </div>
</template>

<script>
  import nodeTypeJson from "../../dictdata/treeNodeType.json";
  export default {
    props: {
      cMeta: Object, //本页面模板json数据Layout对象
      cParentMeta: Object, //父页面模板json数据Layout对象
      cParentParams: Object, //父页面自定义参数与内置参数
      cParentScope: Object, //父页面每块区域业务数据

    },
    data() {
      return {
        tableData: [],
        responseData: "",
        total: ['合计', ''],
        execScoreCardInfoParams: [],
        execNormalRuleInfoParams: '',
        execTreeInfoParams: '',
        kvPair: {
          total: '',
          code: ''
        },

      };
    },
    mounted() {
      console.log("cParentParams--rule_flow_test_result", this.cParentParams);
      console.log("cMeta--rule_flow_test_result", this.cMeta);
      console.log("cParentScope--rule_flow_test_result", this.cParentScope);
      console.log("cParentScope--rule_flow_test_result", this.cParentScope);
      let that = this;
      //that.execScoreCardInfoParams = that.cParentParams.tableData.execScoreCardInfo;
      let scoreCardArr = that.cParentParams.tableData.execScoreCardInfo

      for (let i in scoreCardArr) {
        Object.keys(scoreCardArr[i]).forEach(key => {
          // console.log("key++++++++" + key, "value====" + scoreCardArr[i]["total"]);
          if (key !== 'total') {
            // console.log("====zmh===1   " + key);
            that.kvPair['code'] = key + "";
            that.kvPair['array'] = scoreCardArr[i][key];
          } else {
            that.kvPair['total'] = scoreCardArr[i][key] + "";
            // console.log("====zmh===2  " + scoreCardArr[i][key]);
          }
        })
        that.execScoreCardInfoParams.push(that.kvPair);
      }
      // console.log("====zmh:", that.execScoreCardInfoParams);
      that.execNormalRuleInfoParams = that.cParentParams.tableData.execNormalRuleInfo;
      //that.execTreeInfoParams = that.cParentParams.tableData.execTreeInfo[0];
      that.responseData = that.cParentParams.responseData;
      console.log('execScoreCardInfoParams', that.execScoreCardInfoParams);
      console.log('execNormalRuleInfoParams', that.execNormalRuleInfoParams);
      console.log('execTreeInfoParams', that.execTreeInfoParams);
      // that.total.push(that.cParentParams.total);
    },
    methods: {
      //点击复制按钮复制报文
      copy() {
        this.$refs.demoInput.select()
        document.execCommand('copy')
        this.$message.success("测试报文复制到剪贴板");
      },
      setTotal() {
        let that = this;
        return that.total
      },
      formatNodeType(row, column) {
        let item = nodeTypeJson.data.find((item) => item.value === row.nodeType + '')
        if (item) {
          return item.label
        } else {
          return row.nodeType
        }
      },
      formatHitFlag(row, column) {
        return row.hitFlag === 'hit' ? '命中规则' : '未命中规则'
      },
      //评分卡详情点击
      handleScoreCardInfoClick(row) {
        console.log("row", row);
        this.$dialog.open({
          that: this,
          title: "详情",
          toRequest: {
            url: "@ruleFlowTestResultScoreCardDetail",
            method: "get",
            params: {
              tableData: row.array,
            },
          },
          width: "60%",
        })
      },
      //普通规则动作查看
      handleNormalRuleInfoClick(row){
        console.log("handleNormalRuleInfoClick-row", row);
        this.$dialog.open({
          that: this,
          title: "动作",
          toRequest: {
            url: "@ruleFlowTestResultNormalRuleAction",
            method: "get",
            params: {
              tableData: row.riskDecisionActionList,
            },
          },
          width: "60%",
        })
      },
      
      handleRuleTreeActionResultClick(row){
        console.log("handleRuleTreeActionResultClick-row", row);
        this.$dialog.open({
          that: this,
          title: "动作",
          toRequest: {
            url: "@ruleFlowTestResultNormalRuleAction",
            method: "get",
            params: {
              tableData: row.ruleTreeActionResultList,
            },
          },
          width: "60%",
        })
      },

    },
  };
</script>

<style lang="css" scoped>
  .page_content {
    position: relative;
    height: 100%;
  }

  .footDiv {
    width: 100%;
    height: 100px;
  }

  .table {
    width: 100%;
    height: 180px;
  }
  .tableHit{
    width: 100%;
    height: 110px;
  }

  .inputItem {
    width: 100%;
  }

  .buttonGroup {
    position: absolute;
    bottom: -30px;
  }

  .copyBtn {
    position: absolute;
    bottom: 0px;
    right: 0px;
    z-index: 99;
  }

  .inpudiv {
    position: absolute;
    top: 0px;
    left: 0px;
    opacity: 0;
  }
</style>
