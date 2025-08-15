<template>
  <div class="page_content">
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100% " max-height="150"
      @selection-change="handleSelectionChange">
     <!-- <el-table-column type="selection" width="55">
      </el-table-column> -->
      <el-table-column label="科目编号 " width="120" align="center">
        <template slot-scope="scope">{{ scope.row.item_cd }}</template>
      </el-table-column>
      <el-table-column prop="item_na" label="科目名称 " align="center">
      </el-table-column>
      <el-table-column prop="item_tp" label="科目类型 " align="center" :formatter="itemTpFormat">
      </el-table-column>
      <el-table-column prop="p_item_cd" label="上级科目编号 " align="center">
      </el-table-column>
      <el-table-column prop="show_flag" label="显示标志 " align="center" :formatter="showFlagFormat">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button @click="editItem(scope.row)" type="text" size="small">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  //财务报表自定义
  import MyMessage from 'pte-ui/utils/MyMessage'
  import i18n from 'pte-ui/i18ns' // 国际化

  export default {
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object // 父页面的scope数据对象
    },
    components: {

    },
    data() {
      return {

      }
    },
    mounted() {
      let that = this;
      console.log('cParentParams', that.cParentParams);
      that.initData();
    },
    methods: {
      initData() {
        let that = this;
        let request_map = {}
        let request_url = "/API/risk-management-service/risk-decision-rule/page-select";
        // request_map["servicecode"] = "ISMTCTST2161";
        // request_map["item_cd"] = that.subjectNum; //科目编号
        // request_map["item_na"] = that.subjectName; //科目名称
        // request_map["item_tp"] = that.subjectType; //科目类型
        // request_map["item_tp"] = that.cParentParams.rpt_type; //科目类型
        this.$http.invokeAPI(request_url, "post", request_map).then(response => {
          console.log("cooperationSelect", response);
          if (response.code === "200") {
            console.log(response.data);
            that.tableData = response.data;
          } else {
            MyMessage({
              message: response.message,
              type: 'error'
            });
          }
        });
      },
   

    }
  }
</script>
<style lang="css" scoped>
  .page_content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: "PingFang SC";
  }

  

  .submit {
    margin-top: 15px;
  }
</style>
