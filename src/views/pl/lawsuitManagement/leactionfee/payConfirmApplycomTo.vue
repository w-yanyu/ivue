<template>
  <div>
    <div>
      <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <span>
            <em></em>基本信息
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
              <el-form-item label="借据号" prop="loan_no">
                <el-input
                  v-model="basicForm.loan_no"
                  @blur="lncfnoBlur"
                  @keyup.enter.native="lncfnoBlur"
                  :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户名称" prop="cust_name">
                <el-input v-model="basicForm.cust_name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="客户号" prop="cust_no">
                <el-input v-model="basicForm.cust_no" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="产品名称" prop="prodna">
                <el-input v-model="basicForm.prodna" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="产品代码" prop="prodcd">
                <el-input v-model="basicForm.prodcd" :disabled="true"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="贷款状态" prop="clssst">
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
          <span><em></em>财务信息</span>
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
              <el-form-item label="本金合计">
                <el-input v-model="adjustForm.prcpl_smtn"  :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="利息合计">
                <el-input v-model="adjustForm.int_smtn" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="正常本金">
                <el-input v-model="adjustForm.normal_princi"  :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="逾期本金">
                <el-input v-model="adjustForm.overdue_princi" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="呆滞本金" >
                <el-input v-model="adjustForm.stagnant_princi" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="呆账本金" >
                <el-input v-model="adjustForm.uncollect_acct_princi" :disabled="true"/>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="应收应计利息">
                <el-input v-model="adjustForm.recv_accrued_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="催收应计利息">
                <el-input v-model="adjustForm.collt_accrued_inst"  :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="应收欠息">
                <el-input v-model="adjustForm.recv_debit_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="催收欠息">
                <el-input v-model="adjustForm.collt_debit_inst"  :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="应收应计罚息">
                <el-input v-model="adjustForm.recv_accrued_penalt_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="催收应计罚息">
                <el-input v-model="adjustForm.collt_acrued_penalt_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="应收罚息">
                <el-input v-model="adjustForm.recv_penalt_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="催收罚息">
                <el-input v-model="adjustForm.collt_penalt_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="应计复息">
                <el-input v-model="adjustForm.accrued_comp_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="复息">
                <el-input v-model="adjustForm.compd_inst" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
        <el-collapse-item name="3">
          <template slot="title">
            <span><em></em>缴费确认</span>
          </template>
          <div style="padding:16px;" v-show="false">
            <el-button type="primary"  @click="addPayApply()">新增</el-button>
            <el-button type="primary" @click="del()">{{$i18ns('删除')}}</el-button>
          </div>
          <el-table ref="modifyTable" :data="tableModifyData" :border="true" @selection-change="handleSelection" stripe>
            <el-table-column type="selection" :selectable="selectable"></el-table-column>
            <el-table-column label="缴费申请单号" prop="apply_no" align="center" show-overflow-tooltip>
              <template slot-scope="scope">
                <span>{{scope.row.apply_no}}</span>
              </template>
            </el-table-column>
            <el-table-column label="费用类型" prop="fee_type" align="center" :formatter="formatFeeTypeData" show-overflow-tooltip>
              <!-- <template slot-scope="scope">
                <span>{{scope.row.fee_type}}</span>
              </template> -->
            </el-table-column>
            <el-table-column label="付款金额" prop="pay_amount" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.pay_amount}}</span>
              </template>
            </el-table-column>
            <el-table-column label="客户承担" prop="cust_amt" align="center">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.cust_amt" :min="0" :precision="2" v-if="scope.row.status" :disabled="true"></el-input-number>
                <span v-else>{{scope.row.cust_amt}}</span>
              </template>
            </el-table-column>
            <el-table-column label="法院退回" prop="court_back_amt" align="center">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.court_back_amt" :min="0" :precision="2" v-if="scope.row.status" :disabled="true"></el-input-number>
                <span v-else>{{scope.row.court_back_amt}}</span>
              </template>
            </el-table-column>
            <el-table-column label="公司承担" prop="compnay_amt" align="center">
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.compnay_amt" :min="0" :precision="2" v-if="scope.row.status" :disabled="true"></el-input-number>
                <span v-else>{{scope.row.compnay_amt}}</span>
              </template>
            </el-table-column>
            <!--<el-table-column label="操作" align="center" v-show="false">
              <template slot-scope="scope">
                <el-button type="text" icon="el-icon-edit" @click="scope.row.status=true">修改</el-button>
                <el-button type="text" icon="el-icon-check" @click="saveRow(scope.$index,scope.row)">确认</el-button>
              </template>
            </el-table-column>-->
          </el-table>
          <div class="space"></div>
          <el-form ref="appForm" :rules="appRules" :model="appForm" label-width="250px" class="custom-common--form">
            <el-row>
              <el-col :span="6">
                <el-form-item  label="附件" prop="jfqrFile" v-show="false">
                  <upload-file ref="zfpzProp" :uploadFileList="appForm.jfqrFile" :uploadDisabled="false"
                               @changeFile="jfqrChange"></upload-file>
                </el-form-item>
              </el-col>
              <el-col :span="18" >
                <el-form-item  :label="$i18ns('备注:')" prop="remark">
                  <el-input type="textarea" maxlength="200" v-model="appForm.remark" :disabled="true" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
        <el-collapse-item name="4" v-show="false" >
          <template slot="title">
            <span><em></em>缴费确认历史</span>
          </template>
          <div class="container-centent--table">
            <el-table ref="multipleTable" :data="tableData" :border="true" style="width: 100%" stripe>
              <el-table-column label="确认申请单编号" prop="appl_id" align="center"></el-table-column>
              <el-table-column label="费用类型" prop="fee_type" :formatter="formatFeeTypeData" align="center"></el-table-column>
              <el-table-column label="费用金额" prop="pay_amount" align="center"></el-table-column>
              <el-table-column label="客户承担" prop="cust_amt" align="center"></el-table-column>
              <el-table-column label="法院退回" prop="court_back_amt" align="center"></el-table-column>
              <el-table-column label="公司承担" prop="compnay_amt" align="center"></el-table-column>
              <el-table-column :label="$i18ns('申请人')" prop="tranus" align="center"></el-table-column>
              <el-table-column :label="$i18ns('申请时间')" prop="gmt_create" align="center"></el-table-column>
              <el-table-column label="结案时间" prop="gmt_modified" align="center"></el-table-column>
              <el-table-column label="状态" prop="status" align="center" width="240"></el-table-column>
              <el-table-column label="操作"  align="center" width="240">
                <template slot-scope="scope">
                  <el-button type="text" @click="selectApplyHis(scope.$index,scope.row)"  plain>{{$i18ns('查看')}}详情</el-button>
                </template></el-table-column>
            </el-table>
          </div>
          <div class="container-content--pagination">
            <el-pagination v-show="isShowPage"
                           @size-change="sizeChange"
                           @current-change="currentChange"
                           :current-page="currentPage"
                           :page-sizes="[10,15,20]"
                           :page-size="tableSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="tableTotal">
            </el-pagination>
          </div>
        </el-collapse-item>
        <el-collapse-item name="5" v-show="false" >
          <template slot="title">
            <span><em></em>立案受理结果历史</span>
          </template>
          <div class="container-centent--table">
            <el-table ref="multipleTable" :data="tableDataHis" :border="true" style="width: 100%" stripe>
              <el-table-column label="申请单编号" prop="applid" align="center"></el-table-column>
              <el-table-column label="审判类型" prop="hdltri" :formatter="formatCaseProTypeDate"  align="center"></el-table-column>
              <el-table-column label="承办机构名称" prop="udtmna"  align="center"></el-table-column>
              <el-table-column label="受理机构名称" prop="udtaog"  align="center"></el-table-column>
              <el-table-column label="录入审判案号" prop="intrno" align="center"></el-table-column>
              <el-table-column label="文书类型" prop="dcmety" :formatter="formatWritTypeData" align="center"></el-table-column>
              <el-table-column label="案件结果" prop="carest" :formatter="formatLitigOutcomeData" align="center"></el-table-column>
              <el-table-column :label="$i18ns('申请人')" prop="tranus" align="center"></el-table-column>
              <el-table-column :label="$i18ns('申请时间')" :formatter="dateFormat" prop="gmt_create" align="center"></el-table-column>
              <el-table-column label="结案时间" :formatter="dateFormat"  prop="gmt_modified" align="center"> </el-table-column>
              <el-table-column label="状态"  prop="status"  align="center" width="240"  > </el-table-column>
              <el-table-column label="操作"  align="center" width="240">
                <template slot-scope="scope">
                  <el-button type="text" @click="selectMesgHis(scope.$index,scope.row)"  plain>{{$i18ns('查看')}}详情</el-button>
                </template></el-table-column>
            </el-table>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
    <div class="custom-common--footer" v-show="false">
      <el-button type="primary" size="small" @click="submit" plain>提交</el-button>
      <el-button size="small" @click="reset">{{$i18ns('重置')}}</el-button>
    </div>
    <el-dialog title="已通过缴费申请列表" :visible.sync="dateApplyVisible" width="70%"  v-if="dateApplyVisible" :close-on-click-modal="false" @close ="closeDia" :destroy-on-close="true" :append-to-body="true">
      <div class="container-content">
        <div class="container-content--search">
          <el-table ref="multipleTable" :data="payTableData" @selection-change="payApplySelection" :border="true" style="width: 100%" stripe>
            <el-table-column type="selection" :selectable="selectableadd"></el-table-column>
            <el-table-column label="申请单编号" prop="apply_no" align="center"></el-table-column>
            <el-table-column label="借据号" prop="loan_no" align="center"></el-table-column>
            <el-table-column label="客户名称" prop="cust_name" align="center"></el-table-column>
            <el-table-column label="费用类型" prop="fee_type" :formatter="formatFeeTypeData" align="center"></el-table-column>
            <el-table-column label="费用金额" prop="pay_amount" align="center"></el-table-column>

          </el-table>
          <div style="padding:16px;">
            <el-button type="primary"  @click="selectDateMes">{{$i18ns('选择')}}</el-button>
            <el-button type="primary" @click="closeDia">{{$i18ns('取消')}}</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="缴费确认详情"
               :visible.sync="dialogshowApplyVisible"
               width = "75%"
               v-if="dialogshowApplyVisible"
               :close-on-click-modal="false"
               :destroy-on-close="true"
               :append-to-body="true"
    >
      <div class="container-content">
        <div class="container-content--search">
              <pay-confirm-apply-info
                :applid ="this.applid"
              />
        </div>
      </div>
    </el-dialog>
    <el-dialog
      title="诉讼详情"
      :visible.sync="ApplyInfoVisible"
      :destroy-on-close="true"
      v-if="ApplyInfoVisible"
      width = "75%"
      :close-on-click-modal="false"
      :append-to-body="true">
      <div class="container-content">
        <div class="container-content--search">
          <preview-to-begin-appl-result
            :appl_id ="this.applid"
            :confirmFlag = "true"
          />
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
//  import PayConfirmApplyInfo from "./payConfirmApplyInfo";
  export default {
    name: "payConfirmApplycom",
    components: {
  //    PayConfirmApplyInfo,
   //   UploadFile,
   //   PreviewToBeginApplResult,
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
        idtfno: "",
        prodna: "",
        prodcd: "",
        applid: "",
        phonno: "",
        accoutage: "",
        isunitln: "",
        unitname: "",
        islgfe: "",
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
        remark:"",//备注
        aply_adjust_reason:"",//申请原因
        chk_write_off_src_acct_num:"",//核销账号
        ccy_code:"",
        loan_form:""

      },
        appForm: {
          jfqrFile: [],//附件+
          remake: "", // 备注
        },
        currentPage: 1,
        tableSize: 10,
        tableTotal: 10,
        tableModifyData: [],
        tableData: [],
        isShowPage: false,
        clssstList: [],   //贷款形态
        feeTypeList: [],//费用类型
        activeNames: ["1", "2", "3",'4'],
        tableDataHis:[],//诉讼历史
        caseProTypeList:[],// 案件程序类型字典类型列表
        litigOutcomeList:[],//案件结果字典类型列表
        writTypeList:[],//文书类型字典类型列表
        applid:"",
        ApplyInfoVisible: false,
        showApplyInfo:false,
        dialogshowApplyVisible:false,
        dialogshowApplyInfo:false,
        compareCustomerInfo: "",
        entrust_statusList:[],//当前案件委案状态列表
        suit_statusList:[],//当前案件诉讼状态列表
        isunitlnList:[],
        dateApplyVisible:false,
        payTableData:[],
        payselectList:[],
        selectList:[],
        suiTypeList:[],
        remark:"",//备注
      }
    },
    created() {

      this.basicForm.loan_no = this.cParentParams.reserve1;

      this.getrpymtAmt();
      if(this.basicForm.loan_no!="" && this.basicForm.loan_no!=undefined){
        this.lncfnoBlur();
      }
      this.getrpymtAmtTo();

      this.getDictList("MS_E_LEVEL5_TYPE", "clssstList"); // 初始化贷款形态数据字典
      this.getDictList("PL_E_FEE_TYPE", "feeTypeList"); // 费用类型
      this.getDictList("E_CASEACCE", "caseProTypeList"); // 案件程序类型字典类型列表
      this.getDictList("E_SUITRESULT", "litigOutcomeList"); //案件结果字典类型列表
      this.getDictList("E_DOCUMNTYPE", "writTypeList"); //文书类型字典类型列表
      this.getDictList("E_ENTRUSTSTUS", "entrust_statusList"); // 当前案件委案状态列表
      this.getDictList("E_SUITSTUS", "suit_statusList"); // 当前案件诉讼状态列表
      this.getDictList("E_YES___", "isunitlnList"); // 是否联合贷列表
      this.getDictList("E_SUITYPE", "suiTypeList"); // 审判类型
      this.initRule();
    },

    methods: {
      initRule() {
        this.appRules = {

        }
      },

    getrpymtAmt() {
    var _this = this; //很重要！！
    let params = {
      servicecode: "pl0562",
      apply_no: this.cParentParams.appl_id,
    };
    MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then((res) => {
        if (res && res.code === "200") {


          this.appForm.remark = res.data.remark;


          //_this.appForm.manu_five_clasf = res.data.artificial_five_clasf_tp;
          // _this.appForm.remark = res.data.remark;


        }
      })
      .catch((err) => {
        console.error(err);
      });
    },


    getrpymtAmtTo() {
    var _this = this; //很重要！！
    let params = {
      servicecode: "pl0563",
      apply_no: this.cParentParams.appl_id,
    };
    MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then((res) => {
        if (res && res.code === "200") {
          this.tableModifyData = res.data;

      console.log("feeTypeList",this.feeTypeList);
          // for(let i = 0; i< res.data.length; i++){
          //       let item = res.data[i];
          //       let fee = {};
          //       fee.apply_no = item.pay_applid;
          //       fee.fee_type = item.fee_type;
          //       fee.fee_type_name = this.getDictName(item.fee_type,this.feeTypeList);
          //       fee.pay_amount = item.pay_amount;
          //       fee.cust_amt = item.cust_amt;
          //       fee.court_back_amt = item.court_back_amt;
          //       fee.compnay_amt = item.compnay_amt;
          //       fee.status=false;
          //       fee.coreStatus = corestr;
          //       fee.lockStatus = lockstr;
          //       this.tableModifyData.push(fee);
          // }



          //_this.appForm.manu_five_clasf = res.data.artificial_five_clasf_tp;
          // _this.appForm.remark = res.data.remark;


        }
      })
      .catch((err) => {
        console.error(err);
      });
    },

      lncfnoBlur() {
        if (this.basicForm.loan_no === "" || this.compareCustomerInfo === this.basicForm.loan_no) {
          return false;
        }
        this.compareCustomerInfo = this.basicForm.loan_no;
        this.getLoanInfo();
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

      changeBasic(basicInfo, feeInfo) {
        this.basicForm = basicInfo;
        this.getConfirmFees();
        this.getConfirmedFees();
      },
      formatFeeTypeData(row, column) {
        let name = row[column.property];
        let data = row[column.property];
        this.feeTypeList.forEach(function (item, index) {
          if (data == item.dictId) {
            name = item.dictName;
          }
        })
        return name;
      },
      statusFormat(status) {
        let stutusStr = "";
        if(status === "0"){
          stutusStr = "处理中";
        }
        else if(status === "1"){
          stutusStr = "通过";
        }
        else if(status === "2" || status === "4"){
          stutusStr = "拒绝";
        }
        else if(status === "3"){
          stutusStr = "已保存";
        }
        return stutusStr;
      },

      tempStatusFormat(status) {
        let stutusStr = "";
        if(status === "DSH"){
          stutusStr = "处理中";
        }
        else if(status === "YSH"){
          stutusStr = "通过";
        }
        else{
          stutusStr = "拒绝";
        }
        return stutusStr;
      },
      /**
       * 分页sizeChange 回调
       */
      sizeChange(val) {
        this.tableSize = val;
        this.searchTeller();
      },
      /**
       * 分页currentChange回调
       */
      currentChange(val) {
        this.currentPage = val;
        this.getTableData();
      },

      getConfirmedFees() {
        this.currentPage = 1;
        this.getTableData();
      },
      selectApplyHis(index, row){
        this.applid = row.appl_id;
        this.dialogshowApplyVisible = true;
        this.dialogVisible = true;
      },
      selectMesgHis(index, row){
        this.applid = row.applid;
        this.showApplyInfo = true;
        this.ApplyInfoVisible = true;
      },
      dateFormat(row, column) {
        let dateinitStr = row[column.property];
        // if(dateinitStr.length >= 14){
        //   let YYYY = dateinitStr.slice(0, 4);
        //   let MM = dateinitStr.slice(4, 6);
        //   let DD = dateinitStr.slice(6, 8);
        //   let HH = dateinitStr.slice(8, 10);
        //   let mm = dateinitStr.slice(10, 12);
        //   let ss = dateinitStr.slice(12, 14);
        //   let dateStr = YYYY+ "-" + MM +"-"+ DD + " "+HH+":"+mm+":"+ss;
        //   let date  =   new Date(dateStr);
        //   return moment(date).format("YYYY-MM-DD HH:mm:ss")
        // }else{
        //   return dateinitStr;
        // }
      },

      dateCreateFormat(row, column){
        let dateinitStr = row["appl_id"];
        let YYYY = "20"+dateinitStr.slice(2, 4);
        let MM = dateinitStr.slice(4, 6);
        let DD = dateinitStr.slice(6, 8);
        let HH = dateinitStr.slice(8, 10);
        let mm = dateinitStr.slice(10, 12);
        let ss = dateinitStr.slice(12, 14);
        let dateStr = YYYY+ "-" + MM +"-"+ DD + " "+HH+":"+mm+":"+ss;
        let date  =   new Date(dateStr);
        return moment(date).format("YYYY-MM-DD HH:mm:ss")
      },

      getTableData() {
        this.tableData=[];
        let params = {
          servicecode: "RLMSPLTS1403",
          lncfno: this.basicForm.lncfno,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res && res.code === "200") {


          }
        }).catch(err => {
          console.error(err);
        });
      },

      getConfirmFees() {
        this.tableModifyData =[];
        let params = {
          servicecode: "pl0560",
          loan_no: this.basicForm.loan_no,
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
          if (res && res.code === "200") {
            for(let i = 0; i< res.data.length; i++){

              let item = res.data[i];
              let fee = {};
              fee.apply_no = item.apply_no;
              fee.loan_no = item.loan_no;
              fee.cust_name = item.cust_name;
              fee.fee_type = item.fee_type;
              fee.fee_type_name = this.getDictName(item.fee_type,this.feeTypeList);
              fee.pay_amount = item.pay_amount;
              //fee.gmt_create = item.gmt_create;
              //fee.gmt_modified = item.gmt_modified;
              fee.status=false;
              this.payTableData.push(fee);
              console.info(this.payTableData);
            }
          }
        }).catch(err => {
          console.error(err);
        });
      },

      formatCaseProTypeDate(row, column){
        let name = row[column.property];
        let data = row[column.property];
        this.suiTypeList.forEach(function (item, index) {
          if (data == item.dictId) {
            name = item.dictId + '-' + item.dictName;
          }
        })
        return name;
      },
      formatLitigOutcomeData(row, column) {
        let name = row[column.property];
        let data = row[column.property];
        this.litigOutcomeList.forEach(function (item, index) {
          if (data == item.dictId) {
            name = item.dictId + '-' + item.dictName;
          }
        })
        return name;
      },

      formatWritTypeData(row, column) {
        let name = row[column.property];
        let data = row[column.property];
        this.writTypeList.forEach(function (item, index) {
          if (data == item.dictId) {
            name = item.dictId + '-' + item.dictName;
          }
        })
        return name;
      },

      formatAccountTypeData(row, column) {
        let name = row[column.property];
        let data = row[column.property];
        this.accountTypeList.forEach(function (item, index) {
          if (data == item.dictId) {
            name = item.dictId + '-' + item.dictName;
          }
        })
        return name;
      },
      jfqrChange(val) {//支付凭证
        this.appForm.jfqrFile = val;
      },
      /*jfqrValidate(value, rule, callback) {
        if (this.appForm.jfqrFile.length === 0) {
          return callback(new Error("请上传附件"));
        }
        return callback();
      },*/
      saveRow(index, row) {
        if(!row.status){
          this.$message({type: "warning", message: "请先修改再保存！"});
          return;
        }
        if(row.cust_amt == null){
          this.$message({type: "warning", message: "请输入客户承担！"});
          return;
        }
        if(row.court_back_amt == null){
          this.$message({type: "warning", message: "请输入法院退回！"});
          return;
        }
        if(row.compnay_amt == null){
          this.$message({type: "warning", message: "请输入公司承担！"});
          return;
        }
        if(this.basicForm.clssst === '5' && row.cust_amt != 0){
          this.$message({type: "warning", message: "贷款状态为结清，不可分配客户承担部分！"});
          row.cust_amt = 0;
          return;
        }
        if(parseFloat(row.cust_amt) + parseFloat(row.court_back_amt) + parseFloat(row.compnay_amt) != parseFloat(row.pay_amount)){
          this.$message({type: "warning", message: "客户承担+法院退回+公司承担不等于付款金额！"});
          return;
        }
        this.tableModifyData[index] = row;
        this.tableModifyData[index].status = false;
        this.$message({
          type: "success",
          message: "保存成功！"
        })

      },

      transformData() {
      // let params = Object.assign(
      //   {},
      //   this.basicForm,
      //   this.debtInfoForm,
      //   this.applyForm,
      //   this.appForm,
      //   this.otherInfoForm,
      //   this.debtForm

      // );
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


      submit() {


      let params = this.transformData();
      params.feeList = this.tableModifyData;//费用确认
      params.servicecode = "pl0561";
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            let msg =  "提交成功";
            this.$msg({
              message: msg,
              type: "success"
            });
            this.basicForm.loan_no = "";
            this.clearHistory(); //清空信息
          }
        })
        .catch(err => {
          console.error(err);
        });




      },
      reset() {
        this.$confirm("是否确认重置?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.clearData();
        })
      },

      clearData() {
        this.basicForm = { // 基础信息表单对象
          lncfno: "",//借据号
          custno: "",//客户号
          acctna: "",//客户名称
          idtfno: "",//证件号码
          phonno: "",//手机号码
          prodcd: "",//产品代码
          prodna: "",//产品名称
          zubhno: "",//区域中心
          clssst: "",//贷款形态
          ovdays: "",//逾期天数
          isUnionLoan: "",//是否联合贷
          unionComp: "",//联合贷公司名称
          noworg: "",//当前委案机构
        };
        this.appForm = {
          jfqrFile:[],
          remake:'',
        };
        this.$refs.zfpzProp.clearFileList();
        this.tableModifyData=[];
        this.tableData = [];
        this.tableDataHis = [];
        //this.$refs.loanProp.clearData();//基本信息
      },
      addPayApply(){
        this.dateApplyVisible = true;
        this.payTableData = [];
        this.getConfirmFees();
      },
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
       * 删除
       */
      del(){
        if(this.selectList.length == 0){
          this.$message({
            type: "warning",
            message: "请选择至少一条需要删除的缴费申请!"
          })
        }
        this.selectList.forEach(item=>{
          var index = this.tableModifyData.findIndex(function(items){
            return items.appl_id == item.appl_id;
          });
          this.tableModifyData.splice(index,1);
        })
      },
      selectableadd(row,index){
        return row.isLock !== '1'; // isLock 1-已锁定 0-未锁定
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
      selectDateMes(){
        let tableDate = this.tableModifyData;
        let selectList = this.payselectList;
        for (let i = 0; i < selectList.length; i++) {
          let isHavedate = false;
          for (let j = 0; j < tableDate.length; j++) {
            if(tableDate[j].apply_no === selectList[i].apply_no){
              isHavedate = true;
            }
          }
          if(!isHavedate){
            this.tableModifyData.push(selectList[i]);
          }
        }
        this.closeDia();
      },
      closeDia(){
        this.dateApplyVisible = false;
        this.payselectList =[];
      },
      /**
       * 获取字典名称
       */
      getDictName(dictId,dictList){
        let dictType = {};
        dictType = dictList.find(item=>{return item.dictId===dictId;})
        return dictType.dictName;
      },
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
