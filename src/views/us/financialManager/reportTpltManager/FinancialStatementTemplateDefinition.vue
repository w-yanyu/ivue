<template>
  <div class="page_content">
    <div class="horizontal_title">
      <div class="horizontal_title_blue"> 报表行业类型 </div>
      <div class="horizontal_title_while"> 公共事业单位类 </div>
      <div class="horizontal_title_blue"> 报表类型： </div>
      <div class="horizontal_title_while"> 资产负债表 </div>
      <div class="horizontal_title_blue"> 报表名称： </div>
      <div class="horizontal_title_while"> 公共事业单位资产负债表(新会计) </div>
    </div>

    <table class="tabel_balance">
      <tr class="tr_title">
        <th class="th_small">行号</th>
        <th class="th_small">排序号</th>
        <th class="th_big">栏目名称</th>
        <th class="th_big">栏目类型</th>
        <th class="th_big">公式</th>
        <th class="th_big">新模板转旧模板公式</th>
        <th class="th_small">操作</th>

      </tr>
      <tr class="tr_content" v-for="(itemData,index) in tableData" :class="{'link-item-active': itemData.id == activeLinkId,'link-item-hover':index==hoverIndex}"
        :key="index" @mouseover="hoverIndex = index" @mouseout="hoverIndex = -1">
        <td>
          <el-input class="table_content_input" v-model="itemData.lineNum">
          </el-input>
        </td>
        <td>
          <el-input class="table_content_input" v-model="itemData.sequence">
          </el-input>
        </td>
        <td>
          <el-input class="table_content_input_90" v-model="itemData.columnName">
          </el-input>
          <div class="table_content_columnNum">
            <el-input class="table_content_input" v-model="itemData.columnNum">
            </el-input>
            <div class="table_content_columnNum_btn" @click.native.prevent="choose">... </div>

          </div>

        </td>
        <td>
          <el-select v-model="itemData.columnType" placeholder="请选择..." class="table_select" @change="selectOne($event)">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </td>
        <td>
          <el-input class="table_content_input_formula" v-model="itemData.formula">
          </el-input>
        </td>
        <td>
          <el-input class="table_content_input_formula" v-model="itemData.newOldFormula">
          </el-input>
        </td>
        <td>
          <el-button class="del_btn" type="danger" plain @click.native.prevent="delItem(index)">{{$i18ns('删除')}}</el-button>
        </td>
      </tr>
    </table>
    <el-button class="submit" type="success" plain @click.native.prevent="addTableItem">新增报表栏目</el-button>
    <div class="evaluation_formula">
      <div class="left">
        <p>报表验评公式： </p>
        <p>eg:(a=b;c+d=e+f)</p>
      </div>
      <div class="right">
        <el-input class="evaluation_formula_textarea" type="textarea" min-height='100' :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="textarea2"     resize='none' >
        </el-input>
      </div>

    </div>


    <div>
      <el-button class="submit" type="primary" plain @click.native.prevent="saveData">{{$i18ns('保存')}}</el-button>
      <el-button class="submit" type="warning" plain @click.native.prevent="saveData">{{$i18ns('返回')}}</el-button>
    </div>


  </div>
</template>
<script>
  //财务报表模板定义
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
        form: {
          channelType: '', //控制类型
          status: '', //状态
          channelName: '', //渠道名
          dictId: '', //渠道编号值

        },
        tableData: [{
            id: '1',
            lineNum: '1',
            sequence: '1',
            columnName: '货币资金',
            columnNum: 'Z10101',
            columnType: '资产类型',
            formula: 'Z10700=Z10401-Z10402',
            newOldFormula: 'ZX0038=Z20201+Z20203',
          },
          {
            id: '1',
            lineNum: '1',
            sequence: '1',
            columnName: '货币资金',
            columnNum: 'Z10101',
            columnType: '资产类型',
            formula: 'Z10700=Z10401-Z10402',
            newOldFormula: 'ZX0038=Z20201+Z20203',
          },
          {
            id: '1',
            lineNum: '1',
            sequence: '1',
            columnName: '货币资金',
            columnNum: 'Z10101',
            columnType: '资产类型',
            formula: 'Z10700=Z10401-Z10402',
            newOldFormula: 'ZX0038=Z20201+Z20203',
          }
        ],
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

        hoverIndex: -1, // 菜单hover索引
        activeLinkId: 0, // 当前激活的菜单id

      }
    },
    mounted() {
      this.initChannelOptions();
      this.initStatusOptions();
      this.initChannelNameOptions();
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
      //新增报表行
      addTableItem() {
        let that = this;
        let idNo = that.tableData.length - 1;
        that.tableData.push({
          id: idNo,
          lineNum: '',
          sequence: '',
          columnName: '',
          columnNum: '',
          columnType: '',
          formula: '',
          newOldFormula: '',
        })
      },
      //删除行
      delItem(index) {
        let that = this;
        that.tableData.splice(index, 1)
        // this.$set(this.tempList[index], 0, item)
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
  }

  .horizontal_title {
    font-family: "PingFang SC";
    font-size: 12px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 6px;
  }


  .horizontal_title div {
    border: 1px solid #2feeff;
    height: 18px;
    text-align: center;
    flex: 1;
  }

  .horizontal_title_blue {
    background-color: #d3fcff;
  }

  .horizontal_title_while {
    background-color: white;
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
    font-family: "PingFang SC";
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    height: 40px;

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
  .evaluation_formula_textarea{
    width: 98%;
  }


  .submit {
    margin-top: 15px;
  }
</style>
