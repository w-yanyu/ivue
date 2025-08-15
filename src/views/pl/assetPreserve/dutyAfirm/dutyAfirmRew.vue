<template>
  <div>
    <div>
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template slot="title">
          <span>
            <em></em>{{$i18ns('基本信息')}}
          </span>
          </template>
          <el-form
            ref="basicForm"
            :rules="rules"
            :model="basicForm"
            label-width="160px"
            class="custom-common--form"
          >
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$i18ns('借据号')" prop="loan_no">
                  <el-input
                    v-model="basicForm.loan_no"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('客户名称')" prop="cust_name">
                  <el-input v-model="basicForm.cust_name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('客户号')" prop="cust_no">
                  <el-input v-model="basicForm.cust_no" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('产品名称')" prop="prodna">
                  <el-input v-model="basicForm.prodna" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('产品代码')" prop="prodcd">
                  <el-input v-model="basicForm.prodcd" :disabled="true"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item :label="$i18ns('贷款状态')" prop="clssst">
                  <el-select v-model="basicForm.clssst" :disabled="true" placeholder>
                    <el-option
                      v-for="(item, i) in clssstList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
        </el-collapse-item>

        <el-collapse-item name="2">
          <template slot="title">
            <span><em></em>{{$i18ns('财务信息')}}</span>
          </template>
          <el-form
            ref="adjustForm"
            :rules="rules"
            :model="adjustForm"
            label-width="160px"
            class="custom-common--form"
          >
            <el-row>
              <el-col :span="6">
                <el-form-item :label="$i18ns('本金合计')">
                  <el-input v-model="adjustForm.prcpl_smtn"  :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('利息合计')">
                  <el-input v-model="adjustForm.int_smtn" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('正常本金')">
                  <el-input v-model="adjustForm.normal_princi"  :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('逾期本金')">
                  <el-input v-model="adjustForm.overdue_princi" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('呆滞本金')" >
                  <el-input v-model="adjustForm.stagnant_princi" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('呆账本金')" >
                  <el-input v-model="adjustForm.uncollect_acct_princi" :disabled="true"/>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('应收应计利息')">
                  <el-input v-model="adjustForm.recv_accrued_inst" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('催收应计利息')">
                  <el-input v-model="adjustForm.collt_accrued_inst"  :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('应收欠息')">
                  <el-input v-model="adjustForm.recv_debit_inst" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('催收欠息')">
                  <el-input v-model="adjustForm.collt_debit_inst"  :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('应收应计罚息')">
                  <el-input v-model="adjustForm.recv_accrued_penalt_inst" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('催收应计罚息')">
                  <el-input v-model="adjustForm.collt_acrued_penalt_inst" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('应收罚息')">
                  <el-input v-model="adjustForm.recv_penalt_inst" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('催收罚息')">
                  <el-input v-model="adjustForm.collt_penalt_inst" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('应计复息')">
                  <el-input v-model="adjustForm.accrued_comp_inst" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$i18ns('复息')">
                  <el-input v-model="adjustForm.compd_inst" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <span><em></em>{{$i18ns('责任认定列表')}}</span>
          </template>
          <el-table ref="modifyTable" :data="params.list01" :border="true"  @selection-change="handleSelection" stripe>
            <el-table-column type="selection" :selectable="selectable"></el-table-column>
            <el-table-column :label="$i18ns('责任人')" prop="duty_per_nm" align="center" show-overflow-tooltip>

            </el-table-column>
            <el-table-column :label="$i18ns('责任种类')" prop="duty_tp" align="center" :formatter="tpFormatter" show-overflow-tooltip>

            </el-table-column>
            <el-table-column :label="$i18ns('责任程度')" prop="duty_degree" align="center"  :formatter="deFormatter" >
            </el-table-column>
            <el-table-column :label="$i18ns('责任人处理方式')" prop="deal_way" align="center"  :formatter="wayFormatter" >

            </el-table-column>

            <el-table-column :label="$i18ns('责任原因')" prop="duty_cause" align="center"  >

            </el-table-column>
          </el-table>
          <div class="space"></div>
          <el-form
            ref="fileForm"
            :model="fileForm"
            label-width="160px"
            class="custom-common--form"
          >
            <el-form-item :label="$i18ns('责任认定通知书')" width="200px">
              <a @click="download()" v-if="params.file_path">{{$i18ns('下载')}}</a>
            </el-form-item>
            <el-form-item :label="$i18ns('备注')"  prop="remark" width="200px">
              <el-input
                type="textarea"
                resize="none"
                :rows="3"
                v-model="fileForm.remark"
                maxlength="200"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>

    <el-dialog title="责任认定信息输入" :visible.sync="dutyapplyVisible"
               width="70%"  v-if="dutyapplyVisible"
               :close-on-click-modal="false" @close ="closeDia"
               :destroy-on-close="true"
               :append-to-body="true">
      <div class="container-content">
        <div class="container-content--search">
          <el-form
            ref="dutyForm"
            :rules="rules"
            :model="dutyForm"
            label-width="160px"
            class="custom-common--form"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item label="责任人" prop="duty_per_nm"  label-width="200px">
                  <el-input v-model="dutyForm.duty_per_nm" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="责任种类" prop="duty_tp"  label-width="200px">
                  <el-select v-model="dutyForm.duty_tp"  style="width: 100%">
                    <el-option v-for="item in dutytpLst" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="责任程度" prop="duty_degree"  label-width="200px">
                  <el-select v-model="dutyForm.duty_degree"   style="width: 100%">
                    <el-option v-for="item in dutydeLst" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="责任人处理方式" prop="deal_way"  label-width="200px">
                  <el-select v-model="dutyForm.deal_way"  style="width: 100%">
                    <el-option v-for="item in dealwayLst" :key="item.dictId" :label="item.dictName"
                               :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="责任原因" prop="duty_tp"  label-width="200px">
                  <el-input
                    type="textarea"
                    resize="none"
                    :rows="3"
                    v-model="dutyForm.duty_cause">
                  </el-input>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
          <div style="padding:16px; text-align: center;">
            <el-button type="primary"  @click="submitDateMes">提交</el-button>
            <el-button type="primary" @click="closeDia">{{$i18ns('取消')}}</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";
// import UploadFile from "@/views/pl/components/UploadFile.vue";
//import PreviewToBeginApplResult from "@/views/fs/tobeginappl/tobeginapplresult/PreviewToBeginApplResult";
import moment from "moment";
import FlowSubmitBtn from "@/views/components/FlowSubmitBtn.vue";
import userUtil from "pte-ui/utils/userUtil";
export default {
  name: "dutyAfirmRew",
  components: {
    //    PayConfirmApplyInfo,
    //   UploadFile,
    //   PreviewToBeginApplResult,
    FlowSubmitBtn
  },
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
      activeNames:['1','2','3'],
      fileForm:{
        remark:"",
      },
      basicForm: {
        loan_no: "",
        cust_name: "",
        cust_no: "",
        prodna: "",
        prodcd: "",
        applid: "",
        phonno: "",
        accoutage: "",
        isunitln: "",
        unitname: "",
        debtpr: "",
        lncfno: "", //借据号
        acctNa: "", //客户名称
        custid: "", //客户编号
        idtfno: "", //证件号码
        phoneNo: "", //手机号码
        prodNa: "", //产品名称
        areacenter: "", //区域中心
        areaCenterName: "",//区域中心名称
        clssst: "", //贷款形态
        accountAge: "", //逾期天数
        unitedloan: "", //是否联合贷
        unitedloanCompany: "", //联合贷公司名称
        commissionOrg: "", //当前委案机构名称
        commissionStatus: "", //当前案件委案机构
        comlawsuitStatus: "", //当前案件诉讼状态
        loanbit: "", //欠款本金
        islgfe: "", //是否法诉
        nowvorg: "", //当前委案机构编号

      },
      adjustForm: {
        servicecode: "pl0501",
        suitReason: "",
        loan_no: "",
        cust_name: "",
        cust_no: "",
        prodna: "",
        prodcd: "",
        clssst: "",
        prcpl_smtn:"",//本金合计
        int_smtn:"",//利息合计
        normal_princi:"",//正常本金
        overdue_princi:"",//逾期本金
        stagnant_princi:"",//呆滞本金
        uncollect_acct_princi:"",//呆账本金
        recv_accrued_inst:"",//应收应计利息
        collt_accrued_inst:"",//催收应计利息
        recv_debit_inst:"",//应收欠息
        collt_debit_inst:"",//催收欠息
        recv_accrued_penalt_inst:"",//应收应计罚息
        collt_acrued_penalt_inst:"",//催收应计罚息
        recv_penalt_inst:"",//应收罚息
        collt_penalt_inst:"",//催收罚息
        accrued_comp_inst:"",//应计复息
        compd_inst:"",//复息
        dert_inst:"",//减免利息
        dert_amt:"",//减免本金
        apl_atchmt:"",//申请书附件
        cr_ivsgn_rept_atchmt:"",
        othr_evdc_atchmt:"",
        remark:"",//备注
        aply_adjust_reason:"",//申请原因
        chk_write_off_src_acct_num:"",//核销账号
        ccy_code:"",
        loan_form:""

      },
      params:{
        loan_no:"",
        list01:[],//责任认定详情
        file_path:"",
        appId: "plOnl",
        servicecode: "pl0285",
        start_oprtr: "",
        actvn_org:"",
        cust_no: "",
        cust_name:"",
        finalUrl: "views/pl/workbench/workbench_wait_todo_view.json",
        trans_type: "ADD"
      },
      dutyForm:{
        duty_per_nm:"",
        duty_tp:"",
        duty_degree:"",
        deal_way:"",
        duty_cause:""
      },
      addForm:{
        duty_per_nm:"",
        duty_tp:"",
        duty_degree:"",
        deal_way:"",
        duty_cause:""
      },
      dutyapplyVisible:false,
      dutytpLst:[],
      dutydeLst:[],
      dealwayLst:[]
    }
  },
  created() {
    this.getDictList("PL_E_DUTY_TP", "dutytpLst"); // 责任类型
    this.getDictList("PL_E_DUTY_DEGREE", "dutydeLst"); // 责任程度
    this.getDictList("PL_E_DUTY_DEAL_WAY", "dealwayLst"); // 责任人处理方式
    this.getDictList("PL_E_CLSSST","clssstList");//贷款状态
    this.getDutyInfo();
  },

  methods: {

    closeForm() {
      this.$dialog.close();
    },
    submitForm() {
      let params = this.params
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this.$message({
              type: "success",
              message: "操作成功",
            });
            this.$emit("update", {}),
              (params.appl_id = res.data.appl_id),
              (params.cust_name = res.data.cust_name),
              (params.appl_state = res.data.appl_state),
              (params.appl_date = res.data.appl_date),
              (params.appId='plOnl'),
              (params.wf_inst_id = res.data.wf_inst_id),
              (params.task_inst_id = res.data.cur_task_id),
              (params.proc_inst_id = res.data.cur_wfrl_id),
              (params.frame_cd = res.data.task_url1),
              // that.cParentScope.parentFormModel.custId = '';
              this.$openNavTab(
                "views/pl/workbench/workbench_wait_todo_view.json",
                "待办事项办理",
                params,
                this
              );

            // this.$publicFn.openNavTab(
            //   "@colWaitToDoDeal",
            //   "待办事项办理",
            //   params,
            //   this
            // );
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },



    /**
     * 文件上传
     */
    handleChange(file) {
      let formData = new FormData();
      formData.append("file", file.raw);
      formData.append("org_id", userInfo.org_id);
      MyAxios.invokeAPI("/SUMP/minioCall/upload", "post", formData).then(res => {
        if (res && res.code === "200") {
          this.params.file_path=res.data.path;
        }
      }).catch(err => {
        console.error(err)
      })
    },
    /**
     * 下载
     */
    download() {
      document.location.href = this.params.file_path;
    },
    getLoanInfo() {
      this.tableDataHis = [];
      this.tableData = [];
      let params = {
        servicecode: "ln3100",
        loan_due_bill_num: this.basicForm.loan_no,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            let data = res.data;
            this.basicForm.cust_name = data.cust_nm;
            this.basicForm.cust_no = data.cust_num; //客户号
            this.basicForm.prodna = data.prod_nm;
            this.basicForm.prodcd = data.prod_code; //产品代码
            this.basicForm.clssst = data.loan_form;

            this.basicForm.areaCenter = data.areaCenter;
            this.basicForm.areaCenterName = data.areaCenterName;
            this.basicForm.accoutage = data.accoutage;
            this.basicForm.isunitln = data.isunitln;
            this.basicForm.unitname = data.unitname;
            this.basicForm.islgfe = data.islgfe;
            this.basicForm.entrust_status = data.entrust_status;
            this.basicForm.suit_status = data.suit_status;
            this.basicForm.nowvorg = data.nowvorg;
            this.basicForm.jqstus = data.jqstus;
            this.basicForm.hxstus = data.hxstus;
            this.basicForm.ovdays = data.ovdays; //逾期天数
            this.basicForm.debtpr = data.debtpr; //欠款本金
            // //账户信息
            // this.otherInfoForm.rpacno = data.rpacno; //默认退还账号
            // this.otherInfoForm.derana = data.derana; //默认退还账户户名
            // this.otherInfoForm.rpacbr = data.rpacbr; //默认退还账户行号
            // this.otherInfoForm.atbkna = data.atbkna; //退还账户开户行名称
            // this.otherInfoForm.atbkpr = data.atbkpr; //退还账户开户行所在省
            // this.otherInfoForm.atbkci = data.atbkci; //退还账户开户行所在市

            // 余额信息填充
            this.adjustForm.ccy_code = data.ccy_code_num;
            this.adjustForm.normal_princi=data.nrl_prcpl;
            this.adjustForm.accrued_comp_inst=data.acd_cmpd_int;
            this.adjustForm.compd_inst=data.cmpd_int;
            this.adjustForm.collt_acrued_penalt_inst=data.urge_collt_acd_pnly_int;
            this.adjustForm.overdue_princi=data.ovdue_prcpl;
            this.adjustForm.recv_accrued_inst=data.rcvbl_acd_int;
            this.adjustForm.recv_accrued_penalt_inst=data.rcvbl_acd_pnly_int;
            this.adjustForm.recv_penalt_inst=data.rcvbl_pnly_int;
            this.adjustForm.recv_debit_inst=data.rcvbl_db_int;
            this.adjustForm.stagnant_princi=data.stgnt_prcpl;
            this.adjustForm.uncollect_acct_princi=data.ucoltb_prcpl;
            this.adjustForm.collt_accrued_inst=data.urge_collt_acd_int;
            this.adjustForm.collt_debit_inst=data.urge_collt_db_int;
            this.adjustForm.collt_penalt_inst=data.urge_collt_pnly_int;
            this.adjustForm.prcpl_smtn=data.prcpl_smtn;
            this.adjustForm.int_smtn=data.int_smtn;
            this.adjustForm.loan_form=data.loan_form;
          }
        })
        .catch(err => {
          this.compareCustomerInfo = "";
          console.error(err);
        })
    },
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictType
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType]
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },


    /**
     * 表格中枚举转换
     */
    xbFormatter(val, lst) {
      //性别
      let cyxbvalue = val;
      if (cyxbvalue == null || cyxbvalue == "" || cyxbvalue == undefined) {
        return cyxbvalue;
      } else {
        let dycyxb = this[lst].filter((item) => item.value === cyxbvalue);//filter过滤方法（看自己的情况、需求）
        return dycyxb[0].label;//rerun的内容即为要在表格中显示的内容
      }
    },
    /**
     *字典转换
     */
    tpFormatter(row){
      let cyxbvalue = row.duty_tp

      let dycyxb = this.dutytpLst.filter((item) => item.dictId === cyxbvalue);//filter过滤方法（看自己的情况、需求）
      return dycyxb[0].dictName;//rerun的内容即为要在表格中显示的内容
    },
    deFormatter(row){
      let cyxbvalue = row.duty_tp

      let dycyxb = this.dutydeLst.filter((item) => item.dictId === cyxbvalue);//filter过滤方法（看自己的情况、需求）
      return dycyxb[0].dictName;//rerun的内容即为要在表格中显示的内容
    },
    wayFormatter(row){
      let cyxbvalue = row.duty_tp

      let dycyxb = this.dealwayLst.filter((item) => item.dictId === cyxbvalue);//filter过滤方法（看自己的情况、需求）
      return dycyxb[0].dictName;//rerun的内容即为要在表格中显示的内容
    },

    jfqrChange(val) {//确认书
      this.params.file_path = val.path;
    },
    /*jfqrValidate(value, rule, callback) {
      if (this.appForm.jfqrFile.length === 0) {
        return callback(new Error("请上传附件"));
      }
      return callback();
    },*/

    selectable(row,index){
      return row.isLock !== '1'; // isLock 1-已锁定 0-未锁定
    },
    /**
     * 选择事件触发
     */
    handleSelection(val) {
      this.selectList = val;
    },
    /**
     * 新增
     */
    addPayApply(){
      this.dutyapplyVisible=true;
    },
    /**
     * 删除
     */
    handleDelete(index, row) {
// 设置类似于console类型的功能
      this.$confirm("永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
// 移除对应索引位置的数据，可以对row进行设置向后台请求删除数据
          this.params.list01.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    payApplySelection(val){
      for (let i = 0; i < val.length; i++) {
        let isHaveItem = false;
        for (let j = 0; j < this.payselectList.length; j++) {
          if(val[i].appl_id === this.payselectList[j].appl_id){
            isHaveItem = true;
          }
        }
        if(!isHaveItem){
          val[i].cust_amt = 0.00,
            val[i].court_back_amt = 0.00,
            val[i].compnay_amt = 0.00,
            this.payselectList.push(val[i]);
        }
      }
    },
    submitDateMes(){

      this.addForm.deal_way=this.dutyForm.deal_way
      this.addForm.duty_per_nm=this.dutyForm.duty_per_nm
      this.addForm.duty_tp=this.dutyForm.duty_tp
      this.addForm.duty_degree=this.dutyForm.duty_degree
      this.addForm.duty_cause=this.dutyForm.duty_cause
      this.params.list01.push(JSON.parse(JSON.stringify(this.addForm )))
      console.info("addform",this.addForm);
      console.info("list01",this.params.list01);

      this.closeDia();
    },
    closeDia(){
      this.dutyForm.duty_per_nm="";
      this.dutyForm.duty_cause="";
      this.dutyForm.duty_degree="";
      this.dutyForm.duty_tp="";
      this.dutyForm.deal_way="";
      this.dutyapplyVisible = false;

    },
    /**
     * 获取字典名称
     */
    getDictName(dictId,dictList){
      let dictType = {};
      dictType = dictList.find(item=>{return item.dictId===dictId;})
      return dictType.dictName;
    },
    /**
     * 数据初始化
     *
     */
    inintData(){
      if(this.cParentParams.apply_no!=""&&this.cParentParams.apply_no!=null){
        this.getDutyInfo();
      }
    },
    /**
     * 获取责任认定详情
     *
     */
    getDutyInfo(){
      let params = {
        servicecode: "pl0286",
        apply_no: this.cParentParams.apply_no,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            let data = res.data;
            this.basicForm.loan_no = data.loan_no;
            this.params.list01=data.list01;
            this.params.file_path=data.file_path;
            this.fileForm.remark=data.remark;
            this.getLoanInfo();
          }
        })
        .catch(err => {
          this.compareCustomerInfo = "";
          console.error(err);
        })
    }

  }
}

</script>

<style lang="less" scoped>
.custom-common--form {
  padding: 0;

  .el-row .el-col {
    padding-right: 16px;
  }
}

.line-change .el-form-item__label {
  text-align-last: center;
  line-height: 15px;
}

.container-content {
  .container-content--search {
    padding: 16px 40px 0 12px;
    border-bottom: 0px solid #e3e8f5;
  }

  .container-content--toolbar {
    padding: 10px;
  }

  .container-content--pagination {
    float: right;
    padding: 10px;
  }

  .button-footer {
    text-align: center;
    padding: 0 0 10px 0;
  }

  .container-centent--table {
    margin-top: 10px;
    bottom: 60px;
  }
}

.el-dialog-dev {
  max-height: 60vh;
  overflow: auto;
}
.space {
  margin-top: 20px;
}
</style>
