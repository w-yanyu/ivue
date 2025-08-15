<template>
  <div class="page_content">
    <el-table :data="tableData" style="width: 100%" class='table'>
      <el-table-column prop="rule_tree_node_id" label="节点编号" align='center'>
      </el-table-column>
      <el-table-column prop="node_type" label="节点类型" align='center' :formatter="formatNodeType">
      </el-table-column>
      <el-table-column prop="node_id_from" label="父级节点" align='center'>
      </el-table-column>
      <el-table-column prop="rule_desc" label="规则描述" align='center'>
      </el-table-column>
      <el-table-column fixed="right" label="动作查看" width="100" align='center'>
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            v-if="scope.row.ruleTreeActionResultList && scope.row.ruleTreeActionResultList.length>0">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
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
      };
    },
    mounted() {
      console.log("cParentParams", this.cParentParams);
      console.log("cMeta", this.cMeta);
      console.log("cParentScope", this.cParentScope);
      console.log("cParentScope", this.cParentScope);
      let that = this;
      that.tableData = that.cParentParams.tableData;
    },
    methods: {
      formatNodeType(row) {
        switch (row.node_type) {
          case '1':
            return '分支节点'
          case '2':
            return '叶子节点'
          default:
            return '根节点'
        }
      },
      handleClick(row) {
        console.log("点击查看按钮----", row);
        this.$dialog.open({
          that: this,
          title: "动作配置",
          toRequest: {
            url: "@riskRuleTreeTestResultHitAction",
            method: "get",
            params: {
              tableData: row.ruleTreeActionResultList,
            },
          },
          width: "60%",
        })
      }

    },
  };
</script>

<style lang="css" scoped>
  .page_content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .table {
    margin-bottom: 40px;
  }

  .inputItem {
    width: 100%;
  }

  .footForm {
    position: relative;
  }

  .buttonGroup {
    position: absolute;
    bottom: -30px;
  }

  .copyBtn {
    position: absolute;
    bottom: 3px;
    right: -2px;
  }

  .inpudiv {
    position: absolute;
    top: 0px;
    left: 0px;
    opacity: 0;
  }
</style>
