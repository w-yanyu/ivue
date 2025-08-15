<template>
  <div class="page_content">
    <el-form ref="form" :inline="true" :label-position="right" :model="form">

      <el-form-item label="渠道名称: ">
        <el-select v-model="form.channelName" placeholder="请选择渠道名称" @change="changeNameValue">
          <el-option v-for="item in channelNameOptions" :key="item.dictId" :label="item.dictName" :value="item.dictId">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="渠道编号：">
        <el-input v-model="form.dictId" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="控制类型: ">
        <el-select v-model="form.channelType" placeholder="请选择渠道控制类型" @change="changeChannelValue">
          <el-option v-for="item in channelOptions" :key="item.dictId" :label="item.dictName" :value="item.dictId">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="渠道状态: ">
        <el-select v-model="form.status" placeholder="请选择状态" @change="changeStatusValue">
          <el-option v-for="item in statusOptions" :key="item.dictId" :label="item.dictName" :value="item.dictId">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="备注: ">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-row>

        <el-button type="primary" @click="cooperationSelect">合作方选择 </el-button>
        <el-button type="primary" :disabled="cooperationSelection==null">接口授权</el-button>
        <el-button type="primary" :disabled="cooperationSelection==null">添加备注</el-button>
        <el-button type="success" :disabled="isBtnDisabel">{{$i18ns('保存')}}</el-button>
        <el-button type="warning" :disabled="cooperationSelection==null">{{$i18ns('删除')}}</el-button>
        <el-button plain>{{$i18ns('返回')}}</el-button>
      </el-row>
    </el-form>
    <el-dialog title="合作方选择" :visible.sync="dialogVisible" width="90%" :before-close="cooperationDialogCancle" :append-to-body="true">

      <el-table ref="multipleTable" :data="cooperationData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange"   height="250">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="合作方编号" width="120">
          <template slot-scope="scope">{{ scope.row.crdtcd }}</template>
        </el-table-column>
        <el-table-column prop="ofpana" label="合作方名称">
        </el-table-column>
        <el-table-column prop="dfpacd" label="可售产品编号">
        </el-table-column>
        <el-table-column prop="prodcd" label="授信产品编号">
        </el-table-column>
        <el-table-column prop="prodna" label="产品名称">
        </el-table-column>
        <el-table-column prop="verson" :label="$i18ns('版本号')">
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cooperationDialogCancle">取 消</el-button>
        <el-button type="primary" @click="cooperationDialogSubmit" :disabled="cooperationSelectionTemp==null">确 定</el-button>
      </span>
    </el-dialog>

    <div>
      <p class="title_tag">渠道产品参数配置</p>

      <el-table ref="multipleTable" :data="cooperationSelection" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="合作方编号" width="120">
          <template slot-scope="scope">{{ scope.row.crdtcd }}</template>
        </el-table-column>
        <el-table-column prop="ofpana" label="合作方名称">
        </el-table-column>
        <el-table-column prop="dfpacd" label="可售产品编号" width="120" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="prodcd" label="授信产品编号" width="120" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="prodna" label="产品名称" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="verson" :label="$i18ns('版本号')" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="remark" :label="$i18ns('备注')" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="port" label="已选接口" show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>






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
        channelOptions: [],
        statusOptions: [],
        channelNameOptions: [],
        isBtnDisabel: true,
        dialogVisible: false,
        cooperationData: [], //合作方列表数据
        cooperationSelectionTemp:null,//选择了的合作列表暂存
        cooperationSelection: null, //选择了的合作列表

      }
    },
    mounted() {
      this.initChannelOptions();
      this.initStatusOptions();
      this.initChannelNameOptions();

    },
    methods: {
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
        let temp=this.cooperationSelectionTemp;
        for (let i in temp) {
          temp[i].remark = '';
          temp[i].port = '0';
        }
        // for(let i=0;i<10;i++)
        // temp.push(temp[0])

        this.cooperationSelection=temp;
          console.log( this.cooperationSelection);
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
  }

  .title_tag {
    font-family: "PingFang SC";
    font-size: 18px;
    font-weight: bold;
    margin: 18px;
  }
</style>
