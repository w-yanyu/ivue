<template>
  <div class="page_content">
    <el-table :data="tableData" style="width: 100%" class='table'>
      <el-table-column prop="scoreModelCode" label="分数模型代码" align='center' :formatter="formatActionType">
      </el-table-column>
      <el-table-column prop="scoreModelName" label="分数模型名称" align='center'>
      </el-table-column>
      <el-table-column prop="scorePoints" label="分值" align='center'>
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
