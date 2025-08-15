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
              <el-form-item :label="$i18ns('借据号')" prop="loan_no" :rules="[{ required: true, message: $i18ns('请输入借据号') }]">
                <el-input
                  v-model="basicForm.loan_no"
                     suffix-icon="el-input__icon el-icon-search"
                  @click.native="openDialog"
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
            <span><em></em>{{$i18ns('申请信息')}}</span>
          </template>
          <el-form
            ref="appForm"
            :rules="appRules"
            :model="appForm"
            label-width="200px"
            class="custom-common--form"
          >
            <el-row>
              <el-col :span="12">

                <el-form-item
                  :label="$i18ns('承办机构')"
                  prop="org_no"
                  :rules="[{ required: true, message: $i18ns('请选择承办机构') }]"
                >
                  <el-select v-model="appForm.org_no" placeholder=" " >
                    <el-option
                      v-for="item in under_agencyList"
                      :key="item.entrorg"
                      :label="item.branch_name"
                      :value="item.branch_id"
                      @click.native="getOrgName(item)"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  :label="$i18ns('受理机构')"
                  prop="ma_org_no"
                  :rules="[{ required: true, message: $i18ns('请选择受理机构') }]"
                >
                  <el-select v-model="appForm.ma_org_no" placeholder=" ">
                    <el-option
                      v-for="item in shoul_agencyList"
                      :key="item.ma_org_no"
                      :label="item.branch_name"
                      :value="item.ma_org_no"
                      @click.native="getMaOrgNo(item)"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item
                  :label="$i18ns('执行受理案号')"
                  prop="execute_acp_no"
                  :rules="[{ required: true, message: $i18ns('请输入执行受理案号') }]"
                >
                  <el-input v-model="appForm.execute_acp_no" @change="implementNoChange"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item
                  :label="$i18ns('执行受理时间')"
                  prop="exe_accep_time"
                  :rules="[{ required: true, message: $i18ns('请选择执行受理时间') }]"
                >
                  <el-date-picker
                    v-model="appForm.exe_accep_time"
                    type="date"
                    :placeholder="$i18ns('选择日期')"
                    format="yyyyMMdd"
                    value-format="yyyyMMdd"
                    :picker-options="khjmsqsjOptions"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
               <!-- class="require-asterisk" -->
              <el-col :span="12" v-show="false">
                <el-form-item
                :label="$i18ns('附件')"
                  prop="fjinfo">
                  <upload-file
                    ref="fjinfoProp"
                    :uploadFileList="appForm.fjinfo"
                    :uploadDisabled="false"
                    @changeFile="fjinfoChange"
                  ></upload-file>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <!-- :class="{'require-asterisk' : appForm.ifpass === '该受理流水号已经有审批通过的执行受理记录'}" -->
              <el-col :span="12">
                <el-form-item
                  :label="$i18ns('备注:')"
                  prop="remark"
                  :rules="[{ required: appForm.ifpass === '该受理流水号已经有审批通过的执行受理记录', message: $i18ns('请输入备注') }]"
                >
                  <el-input
                    type="textarea"
                    v-model="appForm.remark"
                    maxlength="200"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>

        <div class="custom-common--footer">
          <el-button type="primary" size="small" @click="submit" plain
            >{{$i18ns('提交')}}</el-button
          >
          <el-button size="small" @click="reset">{{$i18ns('取消')}}</el-button>
        </div>

        <el-collapse-item name="4" v-show="false">
          <template slot="title">
            <span><em></em>{{$i18ns('执行受理申请历史')}}</span>
          </template>
          <div class="container-centent--table">
            <el-table
              ref="multipleTable"
              :data="payTableData"
              :border="true"
              style="width: 100%"
              stripe
            >
              <el-table-column
                :label="$i18ns('申请单号')"
                prop="applid"
                align="center"
              ></el-table-column>
              <el-table-column
                :label="$i18ns('申请人')"
                prop="appl_user"
                align="center"
              ></el-table-column>
              <el-table-column
                :label="$i18ns('申请时间')"
                prop="appl_date"
                align="center"
              ></el-table-column>
              <el-table-column
                :label="$i18ns('执行案号')"
                prop="zxshoulid"
                align="center"
              ></el-table-column>
              <el-table-column
                :label="$i18ns('执行受理时间')"
                prop="zxshoultime"
                align="center"
              ></el-table-column>
              <el-table-column
                :label="$i18ns('备注信息')"
                prop="remark"
                align="center"
              ></el-table-column>
               <el-table-column
                :label="$i18ns('执行结果确认状态')"
                prop="zxresultstatu"
                align="center"
              ></el-table-column>
              <el-table-column :label="$i18ns('操作')"  align="center" width="240">
                <template slot-scope="scope">
                  <el-button type="text" @click="selectMesg(scope.$index,scope.row)"  plain>{{$i18ns('查看')}}详情</el-button>
                </template></el-table-column>
            </el-table>
          </div>
          <div class="container-content--pagination">
            <el-pagination
              v-show="isShowPage"
              @size-change="sizeChange"
              @current-change="currentChange"
              :current-page="currentPage"
              :page-sizes="[10, 15, 20]"
              :page-size="tableSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableTotal"
            >
            </el-pagination>
          </div>
                  <el-dialog
                  :title="$i18ns('执行受理申请历史详情')"
                  :visible.sync="ApplyInfoVisible"
                  :destroy-on-close="true"
                  v-if="ApplyInfoVisible"
                  width = "75%"
                  :close-on-click-modal="false"
                  :append-to-body="true">
                  <div class="container-content">
                    <div class="container-content--search">
                      <susong-managezxsljl-view-test
                        :applid ="this.applid"
                        :confirmFlag = "true"
                      />
                    </div>
                  </div>
                </el-dialog>
        </el-collapse-item>

        <div></div>
      </el-collapse>
    </div>
  </div>
</template>

<script>
//import UploadFile from "@/views/pl/components/UploadFile.vue";
import MyAxios from "pte-ui/utils/MyAxios";
//import changeHisList from "@/views/fs/susongManage/changeHisList.vue";
//import susongManagezxsljlViewTest from '@/views/fs/susongManage/susongManagezxsljlViewTest.vue';



export default {
  name: "susongManagezxsljl",
  components: {
   // changeHisList,
   // UploadFile,
    //susongManagezxsljlViewTest,
  },
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  data() {
    return {
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
      appForm: {
        under_agency: "",
        ma_org_no:"",
        ma_org_name:"",
        org_name:"",
        shoul_agency: "",
        zxshoulid: "",
        zxshoultime: "",
        remark: "",
        fjinfo: [], //变更后营业执照
        slnumber: "",
        ifpass: "",
      },
            adjustForm: {
        servicecode: "pl0501",
        suitReason: "",
        remark: "",
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
        aply_adjust_reason:"",//申请原因
        chk_write_off_src_acct_num:"",//核销账号
        ccy_code:"",
        loan_form:""

      },
      payTableData: [],
      currentPage: 1,
      tableSize: 10,
      tableTotal: 10,
      isShowPage: false,
      isShow: false,
      remarkShow: false,
      remarkShowot: false,
      remarkShowft: false,
      isShowConfirm: false,
      checkAmount: false,
      isDisabled: false,
      compareCustomerInfo: "",
      branchList: [],
      orgTypeList: [],
      yesOrNoList: [],
      activeNames: ["1", "2", "3"],
      applyType: "ZXSLJLSQ",
      khjmsqsjOptions: {}, //时间有效期控件配置
      areacenterList: [], //区域中心列表
      isunitlnList: [], //是否为联合贷产品列表
      entrust_statusList: [], //当前案件委案状态
      suit_statusList: [], //当前案件诉讼状态
      shoul_agencyList: [], //受理机构名称列表
      under_agencyList: [], //承办机构列表
      jqstusList: [], //结清状态名称列表
      hxstusList: [], //核销状态名称列表
      islgfeList: [], //是否法诉列表
      voiceStatusList: [], //审批状态列表
      ApplyInfoVisible: false,
      showApplyInfo:false,
    };
  },
  created() {
    this.getDictList("E_ORG_TYPE", "orgTypeList"); // 机构类型
        this.getDictList("MS_E_LEVEL5_TYPE", "clssstList"); // 贷款形态列表
    this.getDictList("E_YES___", "yesOrNoList"); // 是否
    this.getDictList("E_YES___", "isunitlnList"); // 是否联合贷列表
    this.getDictList("E_ENTRUSTSTUS", "entrust_statusList"); // 当前案件委案状态列表
    this.getDictList("E_SUITSTUS", "suit_statusList"); // 当前案件诉讼状态列表
    this.getDictList("E_YES___", "jqstusList"); // 结清状态（是否结清）
    this.getDictList("E_YES___", "hxstusList"); // 结清状态（是否核销）
    this.getDictList("E_YES___", "islgfeList"); // 是否法诉列表
    this.getDictList("E_VOICESTAT", "voiceStatusList"); //审批状态列表
    this.khjmsqsjOptions.disabledDate = (time) => {
      let maxDate = Date.now();
      return time.getTime() > maxDate;
    };
  },

  methods: {
    /**
     * 全角转半角
     */
    implementNoChange(str) {
        let tem = "";
         for (var i = 0; i < str.length; i++) {
             if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
                 tem += String.fromCharCode(str.charCodeAt(i) - 65248);
             }
             else {
                 tem += String.fromCharCode(str.charCodeAt(i));
             }
         }
        let a = tem;
        if (a.indexOf(" ") !== -1 || a.indexOf("　") !== -1) {
          tem = "";
        }
        this.appForm.zxshoulid = tem;
         return this.appForm.zxshoulid;
     },

    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictType
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let params = {
        dictType: dictType,
        dictKey: [dictType],
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getOrgName(item){
      this.appForm.org_name=item.branch_name
    },
    getMaOrgNo(item){
      this.appForm.ma_org_name=item.branch_name
    },
     openDialog() {
      const option = {
        toRequest: {
          url: "/views/pl/assetPreserve/query/select_hover_loan.json",
          method: "get",
          params: {
          "disposal_plan": "1",

          },
        },
        width: "50%",
        title: "法诉借据选择",
        that: this,
      };
      this.$dataBus.bindCallBackMethod(this, this.bringBack, option);
      //this.resetForm('loan_no');
      this.$dialog.open(option);

    },
    bringBack(formItem, returnData) {
      // let data = returnData.selectedData || returnData;
      let data = returnData;

      this.basicForm.loan_no = data["loan_no"];
      // this.$set(this.ruleForm, 'prod_type', data["prod_type"]);
      //字典渲染
             this.lncfnoBlur();

    },


    // 借据号失焦回调
    lncfnoBlur() {
      if (this.comparelncfno === this.basicForm.lncfno) {
        return false;
      }
      this.comparelncfno = this.basicForm.lncfno; // 记录借据号
      this.getBasciInfo(); // 基础信息带回
      this.getpayTableData(); //申请历史信息带回
      this.getslnumber(); //用借据号查询最新的受理流水号
    },

    // 获取基础信息
    getBasciInfo() {
      let params = {
        servicecode: "ln3100",
        loan_due_bill_num: this.basicForm.loan_no,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
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
            this.getChengBanOrg();
            this.getCaseAcceptOrg();
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    //利用借据号查询最新的受理流水号
    getslnumber() {
      let params = {
        servicecode: "RLMSPLZH0026",
        lncfno: this.basicForm.lncfno,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(
        (res) => {
          if (res && res.code === "200" && res.data) {
            const response = res.data;
            if (response.acptsr != null) {
              this.appForm.slnumber = response.acptsr;
            } else {
              this.appForm.slnumber = "";
            }
            this.appForm.ifpass = response.ifpass;
            if (
              this.appForm.ifpass == "该受理流水号已经有审批通过的执行受理记录"
            ){
              this.$message({
                type: "warning",
                message:
                  "已有结案的执行受理记录，请再次核实，如需申请请注明原因",
              });

            }
          }
        }
      );
    },

    //利用借据号查询出申请历史
    getpayTableData() {
      let params = {
        servicecode: "RLMSPLZH0004",
        lncfno: this.basicForm.lncfno,
        start: this.currentPage,
        length: this.tableSize,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(
        (res) => {
          if (res && res.code === "200" && res.data) {
            const response = res.data;
            this.payTableData = response;
            this.isShowPage = false;
            this.tableTotal = response.pageParam ? response.pageParam.total : 0;
          }
        }
      );
    },

      transformData() {
      let params = Object.assign(
        {},
        this.basicForm,
        this.debtInfoForm,
        this.applyForm,
        this.appForm,
        this.otherInfoForm,
        this.debtForm

      );
      params.spouseInfo = this.tableDataOne;
      return params;
    },
    //执行受理信息提交
    submit() {


      let params = this.transformData();
      params.servicecode = "pl0530";
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            let msg =  "提交成功";
            this.$msg({
              message: msg,
              type: "success"
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
            this.basicForm.lncfno = "";
            this.clearHistory(); //清空信息
          }
        })
        .catch(err => {
          console.error(err);
        });



    },
    reset() {
      this.$confirm("是否确认取消?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.clearData();
        this.$dialog.close();
      });
    },

    clearData() {
      (this.basicForm = {
        idtfno: "",
        phonno: "",
        acctna: "",
        prodna: "",
        jqstus: "",
        hxstus: "",
        areaCenter: "",
        ovdays: "",
        isunitln: "",
        unitname: "",
        nowvtime: "",
        nowvorg: "",
        entrust_status: "",
        suit_status: "",
        islgfe: "",
        // slnumber:"",
      }),
        (this.appForm = {
          slnumber: "",
        });
      this.$refs.appForm.resetFields();
      this.$refs.fjinfoProp.clearFileList();
      this.payTableData = [];
    },

    /**
     * 添加文件回调
     * @param file 当前添加文件对象
     * @param fileList 已添加文件
     */
    fjinfoChange(val) {
      this.appForm.fjinfo = val;
    },

      selectMesg(index, row){
        this.applid = row.applid;
        this.showApplyInfo = true;
        this.ApplyInfoVisible = true;
      },

    /**
     * 承办机构名称列表获取
     */
    getChengBanOrg() {
      let params = {
        servicecode: "pl0565",
        area_center: this.basicForm.areacenter,
        lncfno: this.basicForm.lncfno,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            console.log("res.data", res.data);
            this.under_agencyList = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     * 案件受理机构名称列表获取
     */
    getCaseAcceptOrg() {
      let params = {
        servicecode: "pl0566",
        area_center: this.basicForm.areacenter,
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            console.log("res.data", res.data);
            this.shoul_agencyList = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    /**
     * 区域中心列表获取
     */
    getSecondBranch() {
      let reqMap = {
        servicecode: "RLMSPLTS1068",
      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", reqMap)
        .then((res) => {
          if (res && res.code === "200") {
            this.areacenterList = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

    //审批状态列表获取
    voicestatuslistinfo(row, column) {
      let name = row[column.property];
      let data = row[column.property];
      this.voiceStatusList.forEach(function (item, index) {
        if (data == item.dictId) {
          // name = item.dictId + '-' + item.dictName;
          name = item.dictName;
        }
      });
      return name;
    },
  },
};
</script>

<style lang="less" scoped>
.custom-common--form {
  padding: 0;
  .el-row .el-col {
    padding-right: 16px;
  }

  .container-centent--table {
    margin-top: 10px;
    bottom: 60px;
  }
}
</style>
