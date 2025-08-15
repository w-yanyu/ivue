<template>
  <div class="page_content">
    <el-tabs class="tabs_table" v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>



      <div class="tabel_seach_title">科目定义查询</div>
      <table class="tabel_seach">
        <tr class="tr_content">
          <td class="th_small">科目编号：</td>
          <td class="th_small">
            <el-input class="table_content_input" v-model="subjectNum">
            </el-input>
          </td>
          <td class="th_small">科目名称：</td>
          <td class="th_small">
            <el-input class="table_content_input" v-model="subjectName">
            </el-input>
          </td>
          <td class="th_small"> 科目类型：</td>
          <td class="th_small">
            <el-select v-model="columnType" placeholder="请选择..." class="table_select" @change="selectOne($event)">
              <el-option v-for="item in subjectData" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </td>
        </tr>
      </table>
      <div class="tabel_seach_bottom">
        <div> 每页显示</div>
        <el-input class="page_input" v-model="pageNum">
        </el-input>
        <div class="table_seach_page" @click.native.prevent="choose">查询 </div>
      </div>

      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="科目编号 " width="120" align="center">
          <template slot-scope="scope">{{ scope.row.subjectNum }}</template>
        </el-table-column>
        <el-table-column prop="subjectName" label="科目名称 " align="center">
        </el-table-column>
        <el-table-column prop="subjectType" label="科目类型 " align="center">
        </el-table-column>
        <el-table-column prop="upSubjectNum" label="上级科目编号 " align="center">
        </el-table-column>
        <el-table-column prop="showLabel" label="显示标志 " align="center">
        </el-table-column>
      </el-table>

      <div class="bottom_table">
        <div class="btn_group">
          <el-button type="primary">增加</el-button>
          <el-button type="success">修改</el-button>
          <el-button type="warning">{{$i18ns('删除')}}</el-button>
        </div>

        <div class="page_group">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
          </el-pagination>
        </div>


      </div>

    </el-tabs>
  </div>
</template>
<script>
  //财务报表选项卡
  import MyMessage from 'pte-ui/utils/MyMessage'
  import i18n from 'pte-ui/i18ns' // 国际化
  export default {
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object // 父页面的scope数据对象
    },
    data() {
      return {
        options: [{
          value: 'A',
          label: '负债和所有者权益类'
        }, {
          value: 'B',
          label: '资产类'
        }, {
          value: 'C3',
          label: '财务类'
        }],
        value: [],
        channelOptions: [],
        statusOptions: [],
        channelNameOptions: [],
        isBtnDisabel: true,
        dialogVisible: false,
        cooperationData: [], //合作方列表数据
        cooperationSelectionTemp: null, //选择了的合作列表暂存
        cooperationSelection: null, //选择了的合作列表
        activeName: 'second',

        hoverIndex: -1, // 菜单hover索引
        activeLinkId: 0, // 当前激活的菜单id
        pageNum: '',
        //科目编号
        subjectNum: '',
        //科目名称
        subjectName: '',
        //科目类型
        subjectType: '',
        subjectData: [{
            value: 'A',
            label: '其他'
          }, {
            value: 'B',
            label: '现金流量'
          }, {
            value: 'C',
            label: '损益'
          },
          {
            value: 'D',
            label: '资产负债'
          },
          {
            value: 'E',
            label: '收入支出'
          }
        ],
        tableData: [{
            id: '1',
            subjectNum: 'Z1T500',
            subjectName: '递延税项',
            subjectType: '资产负债',
            upSubjectNum: '',
            showLabel: '1',
          },
          {
            id: '2',
            subjectNum: 'Z20100 ',
            subjectName: '流动负债 ',
            subjectType: '资产负债',
            upSubjectNum: '',
            showLabel: '1',
          },
          {
            id: '3',
            subjectNum: 'Z20101 ',
            subjectName: '短期借款 ',
            subjectType: '资产负债',
            upSubjectNum: '',
            showLabel: '1',
          },
        ],
        multipleSelection: [],

      }
    },
    mounted() {

    },
    methods: {
      selectOne(event, index) { //change 触发事件
        console.log('event', event);
        console.log('index', index);
        this.tableData[index].value = event

        //直接就拿到当前的这个对象了
      },
      //加载渠道控制类型选项
      initChannelOptions() {
        let request_map = {}
        let request_url = "/SUMP/rest/dict";
        request_map["dictType"] = "E_CHATTP";
        request_map["dictKey"] = "E_CHATTP";
        this.$http.invokeAPI(request_url, "post", request_map).then(response => {
          if (response.code === "200") {
            console.log(response.data);
            this.channelOptions = response.data;
          } else {
            MyMessage({
              message: response.message,
              type: 'error'
            });
          }
        });
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleClick(tab, event) {
        console.log(tab, event);
      }

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
.tabs_table{
  width: 100%;
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
