<template>
  <div class="page_content">
    <div class="horizontal_title">
      <div> 通用类现金流量表(新会计)  </div>
      <div> 日期 2014年12月31日  </div>
      <div> 单位：元 </div>
    </div>

    <table class="tabel_balance">
      <tr class="tr_title">
        <th class="th_big">项目 </th>
        <th class="th_small">行次</th>
        <th class="th_big">上期金额</th>
        <th class="th_big">本期金额</th>

      </tr>
      <tr class="tr_content" v-for="(itemData,index) in tableData" :class="{'link-item-active': itemData.id == activeLinkId,'link-item-hover':index==hoverIndex}"
        :key="index" @mouseover="hoverIndex = index" @mouseout="hoverIndex = -1">
        <td class="textAginleft">{{itemData.lName}}</td>
        <td>{{itemData.lIndex}}</td>
        <td>
          <el-input class="table_content_input" v-model="itemData.lLastTerm" :disabled="itemData.lLastTermDisable=='0'">
          </el-input>
        </td>
        <td>
          <el-input class="table_content_input" v-model="itemData.lThisTerm" :disabled="itemData.lThisTermDisable=='0'">
          </el-input>
        </td>
      </tr>

    </table>


 <el-button class="submit" type="primary" plain @click.native.prevent="saveData">{{$i18ns('返回')}}</el-button>

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
        form: {
          channelType: '', //控制类型
          status: '', //状态
          channelName: '', //渠道名
          dictId: '', //渠道编号值

        },
        tableData: [{
            id: '1',
            lName: '货币资金',
            lIndex: '1',
            lLastTerm: '',
            lLastTermDisable: '0',
            lThisTerm: '',
            lThisTermDisable: '1',
            rName: '货币资金',
            rIndex: '1',
            rLastTerm: '',
            rLastTermDisable: '0',
            rThisTerm: '',
            rThisTermDisable: '1'
          },
          {
            id: '2',
            lName: '交易性金融资产  ',
            lIndex: '2',
            lLastTerm: '',
            lLastTermDisable: '0',
            lThisTerm: '',
            lThisTermDisable: '1',
            rName: '交易性金融负债 ',
            rIndex: '2',
            rLastTerm: '',
            rLastTermDisable: '1',
            rThisTerm: '',
            rThisTermDisable: '0'
          },
          {
            id: '3',
            lName: '应收票据  ',
            lIndex: '3',
            lLastTerm: '',
            lLastTermDisable: '0',
            lThisTerm: '',
            lThisTermDisable: '1',
            rName: '应付票据  ',
            rIndex: '3',
            rLastTerm: '',
            rLastTermDisable: '1',
            rThisTerm: '',
            rThisTermDisable: '0'
          },
          {
            id: '4',
            lName: '应收帐款   ',
            lIndex: '4',
            lLastTerm: '',
            lLastTermDisable: '0',
            lThisTerm: '',
            lThisTermDisable: '1',
            rName: '应收帐款   ',
            rIndex: '4',
            rLastTerm: '',
            rLastTermDisable: '1',
            rThisTerm: '',
            rThisTermDisable: '1'
          }
        ],
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
      //加载状态类型选项
      initStatusOptions() {
        let request_map = {}
        let request_url = "/SUMP/rest/dict";
        request_map["dictType"] = "E_CHSTAT";
        request_map["dictKey"] = "E_CHSTAT";
        this.$http.invokeAPI(request_url, "post", request_map).then(response => {
          if (response.code === "200") {
            console.log(response.data);
            this.statusOptions = response.data;
          } else {
            MyMessage({
              message: response.message,
              type: 'error'
            });
          }
        });
      },
      initChannelNameOptions() {
        let request_map = {}
        let request_url = "/SUMP/rest/dict";
        request_map["dictType"] = "E_SERVTP";
        request_map["dictKey"] = "E_SERVTP";
        this.$http.invokeAPI(request_url, "post", request_map).then(response => {
          if (response.code === "200") {
            console.log(response.data);
            this.channelNameOptions = response.data;
          } else {
            MyMessage({
              message: response.message,
              type: 'error'
            });
          }
        });
      },
      changeNameValue(dictId) {
        this.form.dictId = dictId;
      },
      //合作方选择请求
      cooperationSelect() {
        this.dialogVisible = true;
        this.cooperationData = []; //合作方列表数据
        let request_map = {}
        let request_url = "/SUMP/icmcall/icmRPCCall";
        request_map["servicecode"] = "AS_ICMS_PD_QYOFLS";
        this.$http.invokeAPI(request_url, "post", request_map).then(response => {
          console.log("cooperationSelect", response);
          if (response.code === "200") {
            console.log(response.data);
            this.isBtnDisabel = false;
            this.cooperationData = response.data
          } else {
            this.isBtnDisabel = true;
            MyMessage({
              message: response.message,
              type: 'error'
            });
          }
        });
      },
      //合作方选择处理方法
      handleSelectionChange(val) {
        console.log(val);
        this.cooperationSelectionTemp = val;
      },
      //合作方选择对话框取消
      cooperationDialogCancle() {
        this.dialogVisible = false;
        this.cooperationSelectionTemp = null;
      },
      //合作方选择对话框显示
      cooperationDialogSubmit() {
        this.dialogVisible = false;
        let temp = this.cooperationSelectionTemp;
        for (let i in temp) {
          temp[i].remark = '';
          temp[i].port = '0';
        }
        // for(let i=0;i<10;i++)
        // temp.push(temp[0])

        this.cooperationSelection = temp;
        console.log(this.cooperationSelection);
      },

      openMask(request, response) {
        console.log("open build todo");
        if (this.dialogVisible === false) {
          this.dialogVisible = true;
        }

        let workflow_rsp = response.workflow_info;
        let request_rsp = request.data;

        let json_request = JSON.parse(request_rsp);
        let json_workflow = JSON.parse(workflow_rsp);


        this.workflow_info.page_id = json_request.page_id;
        this.workflow_info.output_page_id = json_request.output_page_id;
        this.request_data = request.data;
        this.route_id_list = json_workflow.LINE_LIST;
        this.workflow_info.ince_id = json_workflow.ince_id;
      },
      clickCancel() {
        this.dialogVisible = false;
      },
      clickConfirm() {
        this.workflow_info.update_page_info = this.request_data;
        this.workflow_info.original_page_info = this.request_data;
        this.dialogVisible = false;

        let request_url = "/SUMP/call/RPCCall";
        this.workflow_info["servicecode"] = "ct2016";

        this.$http.invokeAPI(request_url, "post", this.workflow_info).then(response => {
          if (response.code === "200") {
            MyMessage({
              message: response.message,
              type: 'success'
            });
          } else {
            MyMessage({
              message: response.message,
              type: 'error'
            });
          }
        });
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
    width: 95%;
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

  .tabel_peson {
    width: 95%;
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
    width: 95%;
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
    width: 30%;
    text-align: center;
  }

  .th_small {
    width: 10%;
    text-align: center;
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


  div >>>.el-input__inner {
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
  .submit{
    margin-top: 15px;
  }
</style>
