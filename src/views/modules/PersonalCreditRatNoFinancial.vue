<template>
  <div class="page_content">
    <div class="tabel_peson">
      <div class="tbale_title">
        <div class="tbale_title1">
          <p>分类名称</p>
        </div>
        <div class="tbale_title2">
          <p>指标名称 </p>
        </div>
        <div class="tbale_title3">
          <p>指标值 </p>
        </div>
        <div class="tbale_title4">
          <p>指标得分</p>
        </div>
      </div>
      <div class="table_content" v-for="(itemData,index) in tableData">
        <div class="table_content1">
          <p>{{itemData.title}}</p>
        </div>
        <div class="table_content2">
          <p>{{itemData.name}}</p>
        </div>
        <div class="table_content3">
          <el-select v-model="itemData.value" :placeholder="$i18ns('请选择')" class="table_select" @change="selectOne($event,index)">
            <el-option v-for="item in itemData.options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="table_content4">
          <p>{{itemData.score}}</p>
        </div>




      </div>
    </div>




    <!-- <el-table
         :data="tableData"
         style="width: 100%">
         <el-table-column
           prop="date"
           label="分类名称"
           width="20%">
         </el-table-column>
         <el-table-column
           prop="name"
           label="指标名称 "
           width="20%">
         </el-table-column>
         <el-table-column
           prop="address"
           label="指标值 "
            width="50%">
         </el-table-column>
         <el-table-column
           prop="address"
           label="指标得分 "
           width="10%">
         </el-table-column>
       </el-table> -->
  </div>
</template>
<script>
  //个人信用评级--非财务因素
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
          title: '个人素质',
          name: '年龄 ',
          value: '',
          options: [{
            label: "年龄<25",
            value: '1'
          }, {
            label: "25<=年龄<30",
            value: '2'
          }, {
            label: "35<=年龄<50 0",
            value: '3'
          }, {
            label: "30<=年龄<35 50<=年龄<退休年龄 ",
            value: '4'
          }],
          score: '3'
        }, {
          title: '个人素质',
          name: '年龄 ',
          value: '',
          options: [{
            label: "年龄<25",
            value: '1'
          }, {
            label: "25<=年龄<30",
            value: '2'
          }, {
            label: "35<=年龄<50 0",
            value: '3'
          }, {
            label: "30<=年龄<35 50<=年龄<退休年龄 ",
            value: '4'
          }],
          score: '3'
        }, {
          title: '个人素质',
          name: '年龄 ',
          value: '',
          options: [{
            label: "年龄<25",
            value: '1'
          }, {
            label: "25<=年龄<30",
            value: '2'
          }, {
            label: "35<=年龄<50 0",
            value: '3'
          }, {
            label: "30<=年龄<35 50<=年龄<退休年龄 ",
            value: '4'
          }],
          score: '3'
        }, {
          title: '个人素质',
          name: '年龄 ',
          value: '',
          options: [{
            label: "年龄<25",
            value: '1'
          }, {
            label: "25<=年龄<30",
            value: '2'
          }, {
            label: "35<=年龄<50 0",
            value: '3'
          }, {
            label: "30<=年龄<35 50<=年龄<退休年龄 ",
            value: '4'
          }],
          score: '3'
        }, {
          title: '个人素质',
          name: '年龄 ',
          value: '',
          options: [{
            label: "年龄<25",
            value: '1'
          }, {
            label: "25<=年龄<30",
            value: '2'
          }, {
            label: "35<=年龄<50 0",
            value: '3'
          }, {
            label: "30<=年龄<35 50<=年龄<退休年龄 ",
            value: '4'
          }],
          score: '3'
        }, ],
        value: [],
        channelOptions: [],
        statusOptions: [],
        channelNameOptions: [],
        isBtnDisabel: true,
        dialogVisible: false,
        cooperationData: [], //合作方列表数据
        cooperationSelectionTemp: null, //选择了的合作列表暂存
        cooperationSelection: null, //选择了的合作列表

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
    justify-content: center;
    align-items: center;
  }

  .tabel_peson {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #7ce7ff;
    margin-top: 6px;

  }

  .tbale_title {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "PingFang SC";
    font-size: 14px;
    font-weight: bold;
    border: 1px solid #7ce7ff;
    text-align: center;
  }

  .tbale_title .tbale_title1,
  .tbale_title2 {
    width: 20%;
    border-left: 1px solid #7ce7ff;
  }

  .tbale_title .tbale_title3 {
    width: 50%;
    border-left: 1px solid #7ce7ff;
  }

  .tbale_title .tbale_title4 {
    width: 10%;
    border-left: 1px solid #7ce7ff;
  }

  .table_content {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "PingFang SC";
    font-size: 14px;
    border: 1px solid #7ce7ff;
    text-align: center;
    height: 44px;
  }

  .table_content .table_content1,
  .table_content2 {
    width: 20%;
    border-left: 1px solid #7ce7ff;
  }

  .table_content .table_content3 {
    width: 50%;
    border-left: 1px solid #7ce7ff;
  }

  .table_content .table_content3 .table_select {
    width: 80%;
  }

  .table_content .table_content4 {
    width: 10%;
    border-left: 1px solid #7ce7ff;
  }
</style>
