<template>
  <div class="page_content">
    财务报表列表
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column label="客户序号  " width="120" align="center">
        <template slot-scope="scope">{{ scope.row.cust_no }}</template>
      </el-table-column>
      <el-table-column prop="indu_type" label="财务报表行业" align="center" :formatter="induTypeFormat" />>
      </el-table-column>
      <el-table-column prop="rpt_type" label="报表模板" align="center" :formatter="rptTypeFormat">
      </el-table-column>
      <el-table-column prop="rpt_perd_tp" label="报表期限类型" align="center" :formatter="rptPerdTpFormat">
      </el-table-column>
      <el-table-column prop="rpt_date" label="报表日期" align="center">
      </el-table-column>
      <el-table-column prop="unit_way" label="报表合并口径 " align="center" width="100" :formatter="unitWayFormat">
      </el-table-column>
      <el-table-column prop="check_flag" label="是否审计" align="center" width="50" :formatter="checkFlagFormat">
      </el-table-column>
      <el-table-column prop="crt_date" label="报表录入日期 " align="center">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="editItem(scope.row)" type="text" size="small">调整</el-button>
          <el-button @click="detailItem(scope.row)" type="text" size="small">{{$i18ns('查看')}}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="bottom_table">
      <div class="btn_group">
        <el-button type="primary" @click.native.prevent="addItem">增加</el-button>
        <el-button type="warning" @click.native.prevent="delItem">{{$i18ns('删除')}}</el-button>
      </div>

      <div class="page_group">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100"
          layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>


    </div>

    <el-dialog title="资产负债表" :visible.sync="balanceSheetDialogVisible" width="80%" :before-close="handleClose"
      top='30vh' :append-to-body="true">
      <BalanceSheet ref="balanceSheet" @closeBalanceSheetDialog='closeBalanceSheetDialog'></BalanceSheet>
    </el-dialog>

    <el-dialog title="新增" :visible.sync="addStatementsDialogVisible" width="80%" :before-close="handleClose" top='30vh' :append-to-body="true">
      <AddStatements ref="addStatements" :cParentParams="cParentParams" @closeAddDialog='closeAddDialog'>
      </AddStatements>
    </el-dialog>

    <el-dialog title="现金流量表" :visible.sync="cashFlowStatementDialogVisible" width="80%" :before-close="handleClose"
      top='30vh' :append-to-body="true">
      <CashFlowStatement ref="cashFlowStatement"   @closeCashFlowStatementDialog='closeCashFlowStatementDialog'></CashFlowStatement>
    </el-dialog>

  </div>
</template>
<script>
  //财务报表选项卡
  import MyMessage from 'pte-ui/utils/MyMessage'
  import i18n from 'pte-ui/i18ns' // 国际化
  import BalanceSheet from './balanceSheet' //资产负债表
  import AddStatements from './addStatements' //资产负债表
  import CashFlowStatement from './cashFlowStatement' //资产负债表

  export default {
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对象
      //报表类型 01--资产负债表  02--损益表 03--现金流量表 04--收入支出表

    },
    components: {
      BalanceSheet,
      AddStatements,
      CashFlowStatement
    },
    data() {
      return {
        statementType: "balanceSheet",
        balanceSheetDialogVisible: false,
        addStatementsDialogVisible: false,
        cashFlowStatementDialogVisible: false,
        hoverIndex: -1, // 菜单hover索引
        activeLinkId: 0, // 当前激活的菜单id
        pageNum: '',
        tableData: [],
        multipleSelection: [],
        type: '',

      }
    },
    mounted() {
      console.log('financialStatementsList_cMeta', this.cMeta);
      console.log('financialStatementsList_cParentParams', this.cParentParams);
      console.log('financialStatementsList_cParentMeta', this.cParentMeta);
      console.log('financialStatementsList_cParentScope', this.cParentScope);
    },
    methods: {
      initTableData(type) {
        let that = this;
        that.type = type || that.type;
        let request_map = {}
        let request_url = "/SUMP/call/RPCCall";
        request_map["servicecode"] = "ISMTCTST2168";
        request_map["rpt_type"] = that.type;
        this.$http.invokeAPI(request_url, "post", request_map).then(response => {
          console.log("cooperationSelect", response);
          if (response.code === "200") {
            that.tableData = response.data;
          } else {
            MyMessage({
              message: response.message,
              type: 'error'
            });
          }
        });
      },
      // 报表行业类型
      induTypeFormat(data) {
        switch (data.indu_type) {
          case '00':
            return '标准财务报表'
          case '01':
            return '公共事业单位类'
          case '07':
            return '融惠通财务报表'
        }
      },
      //报表类型
      rptTypeFormat(data) {
        switch (data.rpt_type) {
          case '01':
            return '资产负债表'
          case '02':
            return '损益表'
          case '03':
            return '现金流量表'
          case '04':
            return '收入支出表'
          case '09':
            return '他财务报表'
        }
      },
      //报表期限类型
      rptPerdTpFormat(data) {
        switch (data.rpt_perd_tp) {
          case 'D':
            return '日报'
          case 'M':
            return '月报'
          case 'Q':
            return '季报'
          case 'S':
            return '半年报'
          case 'Y':
            return '年报'
        }
      },
      //
      unitWayFormat(data) {
        return data.unit_way === '1' ? '汇总' : data.unit_way === '2' ? '单一' : '合并';
      },
      //是否审计
      checkFlagFormat(data) {
        return data.check_flag === '0' ? '否' : '是';
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log('handleSelectionChange', this.multipleSelection);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      editItem(tab, event) {
        let that = this;
        console.log('statementType===' + that.statementType);
        if (that.statementType === 'balanceSheet') {
          that.balanceSheetDialogVisible = true
          that.$nextTick(() => {
            that.$refs.balanceSheet.initData(tab, 'modify')
          })
        } else {
          that.cashFlowStatementDialogVisible = true
          that.$nextTick(() => {
            that.$refs.cashFlowStatement.initData(tab, 'modify')
          })
        }
      },
      detailItem(tab, event) {
        let that = this;
        if (that.statementType === 'balanceSheet') {
          that.balanceSheetDialogVisible = true
          that.$refs.balanceSheet.initData(tab, 'detail')
        } else {
          that.cashFlowStatementDialogVisible = true
          that.$refs.cashFlowStatement.initData(tab, 'detail')
        }
      },
      //删除按钮
      delItem() {
        let that = this;
        if (that.multipleSelection.length > 0) {
          for (let i in that.multipleSelection) {
            that.postDelItem(that.multipleSelection[i])
          }
          that.initTableData()
        }
      },
      postDelItem(item) {
        let request_map = {}
        let request_url = "/SUMP/call/RPCCall";
        request_map["servicecode"] = "ISMTCTST2165";
        request_map["data_id"] = item.data_id;
        request_map["oper_tp"] = 'D';
        request_map["tplt_id"] = item.tplt_id;
        request_map["cust_no"] = item.cust_no;
        request_map["indu_type"] = item.indu_type;
        request_map["rpt_type"] = item.rpt_type;
        request_map["rpt_perd_tp"] = item.rpt_perd_tp;
        request_map["rpt_date"] = item.rpt_date;
        request_map["unit_flag"] = item.oper_tp;
        request_map["check_flag"] = item.check_flag;
        request_map["unit_way"] = item.unit_way;
        this.$http.invokeAPI(request_url, "post", request_map).then(response => {
          console.log("cooperationSelect", response);
          if (response.code === "200") {
            console.log(response.data);
            // that.tableData = response.data;
            MyMessage({
              message: '删除成功',
              type: 'sucess'
            });
          } else {
            MyMessage({
              message: response.message,
              type: 'error'
            });
          }
        });
      },
      addItem() {
        let that = this;
        that.addStatementsDialogVisible = true
      },
      setStatementType(type) {
        let that = this;
        that.statementType = type;
        console.log('statementType===' + that.statementType);
      },
      //关闭新增界面对话框
      closeAddDialog() {
        let that = this;
        that.initTableData()
        that.addStatementsDialogVisible = false
      },
      //关闭调整界面对话框
      closeBalanceSheetDialog() {
        let that = this;
        that.balanceSheetDialogVisible = false
      },
      closeCashFlowStatementDialog() {
        let that = this;
        that.cashFlowStatementDialogVisible = false
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

  .tabs_table {
    width: 99%;
  }

  .tabel_seach_title {
    width: 99%;
    text-align: left;
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
