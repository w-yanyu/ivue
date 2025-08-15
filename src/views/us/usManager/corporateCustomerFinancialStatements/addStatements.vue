<template>
  <div class="page_content">
    <table class="tabel_add">
      <tr class="tr_content">
        <td><span>*</span>报表行业类型 </td>
        <td>
          <el-select v-model="indu_type" placeholder="请选择..." class="table_select">
            <el-option v-for="item in induType" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </td>
        <td class="th_small"><span>*</span>报表模板 </td>
        <td class="th_small">
          <el-select v-model="rpt_type" placeholder="请选择..." class="table_select">
            <el-option v-for="item in rptType" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr class="tr_content">
        <td class="td"><span>*</span>报表期限类型 </td>
        <td class="td">
          <el-select v-model="rpt_perd_tp" placeholder="请选择..." class="table_select">
            <el-option v-for="item in rptPerdTpType" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </td>
        <td class="th_small"><span>*</span>报表日期 </td>
        <td class="th_small">
          <div class="datePicker">
            <el-date-picker v-model="rpt_date" type="month" placeholder="选择月">
            </el-date-picker>
          </div>
        </td>
      </tr>
      <tr class="tr_content">
        <td class="td"><span>*</span>报表合并口径 </td>
        <td class="td">
          <el-select v-model="unit_way" placeholder="请选择..." class="table_select">
            <el-option v-for="item in unitWayType" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </td>
        <td class="th_small"><span>*</span>是否审计 </td>
        <td class="th_small">
          <el-select v-model="check_flag" placeholder="请选择..." class="table_select">
            <el-option v-for="item in checkFlagType" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr class="tr_content">
        <td class="td">{{$i18ns('选择')}}参考期 </td>
        <td class="td">
          <el-date-picker class="table_select" v-model="crt_date" type="date" placeholder="选择日期">
          </el-date-picker>
        </td>

      </tr>
    </table>


    <div class="btn_group">
      <el-button type="primary" plain @click.native.prevent="addItem">新增</el-button>
      <el-button type="warning" plain @click.native.prevent="closeAddDialog">关闭</el-button>
    </div>

  </div>
</template>
<script>
  //资产负债表
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
        indu_type: '', //财务报表行业
        induType: [{
          value: '00',
          label: '标准财务报表'
        }, {
          value: '01',
          label: '公共事业单位类'
        }, {
          value: '07',
          label: '融惠通财务报表'
        }],
        rpt_type: '', //报表模板
        rptType: [{
            value: '01',
            label: '资产负债表'
          }, {
            value: '02',
            label: '损益表'
          }, {
            value: '03',
            label: '现金流量表'
          },
          {
            value: '04',
            label: '收入支出表'
          },
          {
            value: '09',
            label: '他财务报表'
          }
        ],
        rpt_perd_tp: '', //报表期限类型
        rptPerdTpType: [{
            value: 'D',
            label: '日报'
          }, {
            value: 'M',
            label: '月报'
          }, {
            value: 'Q',
            label: '季报'
          },
          {
            value: 'S',
            label: '半年报'
          },
          {
            value: 'Y',
            label: '年报'
          }
        ],
        rpt_date: '', //报表日期
        unit_way: '', //报表合并口径
        unitWayType: [{
          value: '1',
          label: '汇总'
        }, {
          value: '2',
          label: '单一'
        }, {
          value: '3',
          label: '合并'
        }],
        check_flag: '', //是否审计
        checkFlagType: [{
          value: '0',
          label: '否'
        }, {
          value: '1',
          label: '是'
        }],



        crt_date: '', //报表录入日期
      }
    },
    mounted() {
      console.log('addStatements_cMeta', this.cMeta);
      console.log('addStatements_cParentParams', this.cParentParams);
      console.log('addStatements_cParentMeta', this.cParentMeta);
      console.log('addStatements_cParentScope', this.cParentScope);
    },
    methods: {
      addItem() {
        let that = this;
        let request_map = {}
        let request_url = "/SUMP/call/RPCCall";
        request_map["servicecode"] = "ISMTCTST2165";
        // request_map["data_id"] = that.params.data_id?that.params.data_id:'';
        request_map["oper_tp"] = 'A';
        // request_map["tplt_id"] = that.params.tplt_id?that.params.tplt_id:'';
        // request_map["cust_no"] = that.params.cust_no?that.params.cust_no:'';
        request_map["indu_type"] = that.indu_type;
        request_map["rpt_type"] = that.rpt_type;
        request_map["rpt_perd_tp"] = that.rpt_perd_tp;
        request_map["rpt_date"] = that.rpt_date;
        // request_map["unit_flag"] = params.oper_tp;
        request_map["check_flag"] = that.check_flag;
        request_map["unit_way"] = that.unit_way;
        // request_map["is_new_to_old"] = params.unit_way;
        this.$http.invokeAPI(request_url, "post", request_map).then(response => {
          console.log("cooperationSelect", response);
          if (response.code === "200") {
            console.log(response.data);
            that.delInputData();
            that.$emit('closeAddDialog');
            // that.tableData = response.data;
          } else {
            MyMessage({
              message: response.message,
              type: 'error'
            });
          }
        });
      },
      //关闭新增窗口对话框
      closeAddDialog() {
        let that = this;
        that.delInputData();
        that.$emit('closeAddDialog');
      },
      //删除已输入项目
      delInputData() {
        let that = this;
        that.indu_type = '';
        that.rpt_type = '';
        that.rpt_perd_tp = '';
        that.rpt_date = '';
        that.check_flag = '';
        that.unit_way = '';
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

  table,
  th,
  td {
    border: 1px solid #2feeff;
  }

  .tabel_add {
    margin-top: 6px;
    width: 95%;
  }

  .tr_content {
    height: 50px;
    align-items: center;
    font-family: "PingFang SC";
    font-size: 12px;
    text-align: center;
  }

  .textAginleft {
    text-align: left;
    padding-left: 6px;
  }

  span {
    color: red;
  }

  .btn_group {
    margin-top: 30px;
  }

  .datePicker {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
</style>
