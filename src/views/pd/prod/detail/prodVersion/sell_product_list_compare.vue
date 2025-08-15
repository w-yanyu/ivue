<template>
  <div class="table-content">
    <el-table :cell-style="cellStyle" :data="tableData" border style="width: 100%"   stripe >
      <el-table-column
        prop="contrast_name"
        label="对比项"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="small_version_contrast" :label="oldVersion">
      </el-table-column>
      <el-table-column prop="major_version_contrast" :label="newVersion">
      </el-table-column>
    </el-table>
</div>
</template>
<script>
export default {
  name: "InternetVerification",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对
  },
  components: {},
  data() {
    return {
      tableData: null, //对比表格数据
      oldVersion: "产品版本 V",
      newVersion: "产品版本 V"
    };
  },
  created() {
    console.log("布局相关json数据-----", this.cMeta);
    console.log("父页面传的参数-----", this.cParentParams);
    console.log("父页面的相关json数据-----", this.cParentMeta);
    console.log("父页面的scope数据对-----", this.cParentScope);
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    //获取比对数据
    getTableData() {
      let init_url = "/SUMP/call/RPCCall";
      let init_req = {
        servicecode: "pd1510",
        list: this.cParentParams.selectedData
      };

      this.$http.invokeAPI(init_url, "post", init_req).then(response => {
        if (response.code === "200") {
          console.log("获取比对数据", response.data);
          this.tableData= response.data;
          this.oldVersion = `产品版本 V${this.tableData[0].small_version}`;
          this.newVersion = `产品版本 V${this.tableData[0].major_version}`;
        } else {
          MyMessage({ message: response.message, type: "error" });
        }
      });
    },
    //控制表格单元格变色
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (row.small_version_contrast!==row.major_version_contrast && columnIndex===2 ) {
       return "background:#d0f4fa !important;"
      }
    },
  }
};
</script>
<style lang="less" scoped>
.table-content{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // color: #d0f4fa;
}



/deep/ .el-table .cell{   
white-space:pre-wrap; // pre-wrap 识别空格和换行符，pre-line合并空格并识别换行符
}
 
 

</style>
