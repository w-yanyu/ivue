<template>
  <div class="page_content">
    <el-table class="table_content" :data="tableData" style="width: 100%" >
      <el-table-column prop="rootTree.tree_id" label="规则树ID" align='center'>
      </el-table-column>
      <el-table-column prop="rootTree.tree_code" label="规则树代码" align='center'>
      </el-table-column>
      <el-table-column prop="rootTree.tree_name" label="规则树名称" align='center'>
      </el-table-column>
      <el-table-column prop="rootTree.tree_desc" label="规则树描述" align='center'>
      </el-table-column>
      <el-table-column fixed="right" label="命中节点" width="100" align='center'>
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            v-if="scope.row.hit.length>0">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button class="copyBtn" v-if="tableData.length>0" type="primary" small @click="copy">查看响应报文</el-button>
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

    },
    data() {
      return {
        tableData: [],
        responseData: "",
        total: ['合计', ''],
        visible: false,
      };
    },
    mounted() {
      console.log("cParentParams", this.cParentParams);
      console.log("cMeta", this.cMeta);
      console.log("cParentScope", this.cParentScope);
      console.log("cParentScope", this.cParentScope);
      let that = this;
      that.tableData = that.cParentParams.tableData;
      that.responseData = that.cParentParams.responseData;
      that.total.push(that.cParentParams.total);
    },
    methods: {
      //点击复制按钮复制报文
      copy() {
        this.$dialog.open({
          that: this,
          title: "测试成功，规则树响应报文如下：",
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
      setTotal() {
        let that = this;
        return that.total
      },
      formatNodeType(row) {
        switch (row.nodeType) {
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
          title: "命中节点",
          toRequest: {
            url: "@riskRuleTreeTestResultHit",
            method: "get",
            params: {
              tableData: row.hit,
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
  .table_content{
    padding-bottom: 40px;
  }
</style>
