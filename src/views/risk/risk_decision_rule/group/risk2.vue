<template>
  <div class="page_content">
    <el-table :data="tableData" style="width: 100%" class='table'>
      <el-table-column prop="actionType" label="动作类型" align='center' :formatter="formatActionType">
      </el-table-column>
      <el-table-column prop="actionString" label="属性字段" align='center'>
      </el-table-column>
      <el-table-column prop="actionName" label="属性名称" align='center'>
      </el-table-column>
      <el-table-column prop="actionDataType" label="数据类型" align='center' :formatter="formatDataType">
      </el-table-column>
      <!-- <el-table-column prop="action_value" label="动作值" align='center'>
      </el-table-column> -->
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
      formatActionType(row, column) {
        switch (row.actionType) {
          case "1":
          case 1:
            return "插入";
            break;
          case "2":
          case 2:
            return "更新";
            break;
          case "3":
          case 3:
            return "删除";
            break;
        }
      },
      formatDataType(row, column) {
        console.log('formatDataType', row, column);
        switch (row.actionDataType) {
          case 'String':
            return "String-字符串";
            break;
          case 'Int':
            return "Int-整数";
            break;
          case 'Decimal':
            return "Decimal-数值";
            break;
          case 'Boolean':
            return "Boolean-布尔";
            break;
        }
      },

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
