<template>
  <div class="page_content">
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100% " max-height="150"
      @selection-change="handleSelectionChange">
      <el-table-column :label="$i18ns('抵质押品编号') " width="120" align="center">
        <template slot-scope="scope">{{ scope.row.colt_no }}</template>
      </el-table-column>
      <el-table-column prop="colt_type" :label="$i18ns('押品类型') " align="center">
      </el-table-column>
      <el-table-column prop="colt_type_name" :label="$i18ns('押品类型名称')" align="center">
      </el-table-column>
      <el-table-column prop="colt_prod_cd" :label="$i18ns('押品产品')" align="center">
      </el-table-column>
       <el-table-column prop="colt_prod_name" :label="$i18ns('押品产品名称')" align="center">
      </el-table-column>
      <el-table-column prop="cust_no" :label="$i18ns('抵质押人')" align="center">
      </el-table-column>
      <el-table-column fixed="right" :label="$i18ns('操作')" width="100" align="center">
        <template slot-scope="scope">
          <el-button @click="editItem(scope.row.cust_no)" type="text" size="small">{{$i18ns('选择')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import MyMessage from 'pte-ui/utils/MyMessage'
  import i18n from 'pte-ui/i18ns' // 国际化

  export default {
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对象
      type:Object,
    },
    components: {

    },
    data() {
      return {
        tableData: [],
        multipleSelection: [],


      }
    },
    mounted() {
      let that = this;
      that.initData();
      console.log('cParentParams--lookup', this.cParentParams);
    },
    methods: {
      initData() {
        let that = this;
        let request_map = {}
        console.info("父页面参数"+that.cParentParams)
        let request_url = "/SUMP/call/RPCCall";
        request_map["servicecode"] = "ar0343";
        request_map["apply_no"] = that.cParentParams.apply_no; 
        request_map["guar_type"] = that.cParentParams.guar_type;
        request_map["colt_contract_no"] = that.cParentParams.colt_contract_no;
        request_map["type"] = that.type;
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
      seach() {
        this.initData()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //编辑项目
      editItem(item) {
        let that = this;
       this.$emit('closeDialog', item)
      },
      //格式转换
      itemTpFormat(data) {
        switch (data.item_tp) {
          case 'Q':
            return '其他'
          case 'R':
            return '收入支出'
          case 'S':
            return '损益'
          case 'X':
            return '现金流量'
          case 'Z':
            return '资产负债'
        }
      },
      showFlagFormat(data) {
        switch (data.show_flag) {
          case '0':
            return '不显示'
          case '1':
            return '资产负债表'
          case '2':
            return '损益表'
          case '3':
            return '现金流量表'
          case '4':
            return '收入支出表'
        }
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

  .tabel_seach_title {
    width: 99%;
    text-align: center;
    border: 1px solid #2feeff;
  }

  .tabel_seach {
    width: 99%;
  }

  .tabel_seach_bottom {
    width: 99%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border: 1px solid #2feeff;
  }

  .page_input {
    width: 5%;
    margin: 5px 10px 10px 5px;
  }

  .table_seach_page {
    width: 40px;
    height: 20px;
    color: #55a9ff;
    background-color: #ECF5FF;
    border: 1px solid #B3D8FF;
  }



  .tabel_peson {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 6px;

  }


  .table_title {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 12px;
    font-weight: bold;
    text-align: center;
    height: 40px;

  }

  .th_title {
    width: 100%;
  }

  .table_title_big {
    flex: 4;
    border: 1px solid #2feeff;
    margin: 0 0 -1px -1px;
  }

  .table_title_small {
    flex: 1;
    border: 1px solid #2feeff;
    margin: 0 0 -1px -1px;
  }



  .table_content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "PingFang SC";
    font-size: 12px;
    text-align: center;
  }



  .table_content_big {
    flex: 4;
    border: 1px solid #2feeff;
    margin: 0 0 -1px -1px;
  }

  .table_content_small {
    flex: 1;
    border: 1px solid #2feeff;
    margin: 0 0 -1px -1px;
  }



  table,
  th,
  td {
    border: 1px solid #2feeff;
  }

  .tabel_balance {
    margin-top: 6px;
    width: 100%;
  }

  .tr_title {
    height: 26px;
    align-items: center;
    font-family: "PingFang SC";
    font-size: 14px;
    font-weight: bold;
    text-align: center;
  }

  .th_big {
    width: 8%;
    text-align: center;
  }

  .th_small {
    width: 1%;
    text-align: center;
  }

  .del_btn {
    width: 80%;
  }

  .tr_content {
    height: 24px;
    align-items: center;
    font-family: "PingFang SC";
    font-size: 12px;
    text-align: center;
  }

  .textAginleft {
    text-align: left;
    padding-left: 6px;

  }

  .table_content_input {
    width: 80%;

  }

  .table_content_input_90 {
    width: 90%;

  }

  .table_content_columnNum {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24px;
  }

  .table_content_columnNum_btn {
    height: 18px;
    width: 20px;
    line-height: 10px;
    text-align: center;
    margin-left: 4px;
    color: #00ffff;
    border: 1px solid #2feeff;
    border-radius: 4px;
  }

  .table_content_input_formula {
    width: 95%;
  }

  .table_select {
    width: 95%;
    height: 20px;
  }

  div>>>.el-input--medium .el-input__icon {
    line-height: 20px;
  }

  div>>>.el-input__inner {
    height: 20px;
    line-height: 20px;
  }

  .link-item-hover {
    background-color: #fac172;
  }

  /* 链接菜单激活样式 */
  .link-item-active {
    color: #fff;
    background-color: #b3cae4;
  }

  .evaluation_formula {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 15px;
  }

  .evaluation_formula .left {
    flex: 2;
    border: 1px solid #2feeff;
    height: 80px;
    text-align: center;
  }

  .evaluation_formula .right {
    flex: 8;
    border: 1px solid #2feeff;
    height: 80px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .evaluation_formula_textarea {
    width: 98%;
  }

  div>>>.el-textarea__inner {}

  .bottom_table {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .submit {
    margin-top: 15px;
  }
</style>
