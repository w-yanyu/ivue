<template>
  <div>
    <el-collapse v-model="activeNasmes" class="custom-common--collapse">
      <el-collapse-item name="first">
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

       <el-collapse-item name="second">
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
              <el-form-item :label="$i18ns('呆账本金')">
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
      <el-collapse-item name="third">
        <template slot="title">
          <span><em></em>{{$i18ns('文书文件')}}</span>
        </template>
        <div class="container-centent--table">
          <!-- <div class="delete-button">
            <template slot-scope="scope">
              <el-button type="primary" @click="deleteClick(scope.row)">{{$i18ns('删除')}}</el-button>
            </template>
          </div> -->
          <div class="delete-button">
            <el-button type="primary" @click="deleteClick(multipleSelection)"
              >{{$i18ns('删除')}}</el-button
            >
          </div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            border
            style="width: 100%"
            @selection-change="handleselectionChange"
          >
            <el-table-column
              type="selection"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              :label="$i18ns('文书文件')"
              prop="file_name"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              :label="$i18ns('文件类型')"
              prop="file_type"
              align="center"

            >
              <template slot-scope="scope">
                <el-select
                  v-model="scope.row.file_type"
                  :placeholder="$i18ns('请选择文件类型')"
                  width="170"
                  align="center"
                  v-if="scope.row.status"
                >
                  <el-option
                    v-for="(item, i) in creditFileTypeList"
                    :key="i"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
                <span v-else>{{ scope.row.file_type }}</span>
              </template>
            </el-table-column>
            <el-table-column
              :label="$i18ns('打印份数')"
              prop="numbercopies"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.numbercopies"
                  :step="1"
                  :min="0"
                  placeholder=" "
                  step-strictly
                  style="width: 43%"
                ></el-input-number>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="container-centent--search">
          <el-form
            ref="applyForm"
            :rules="appRules"
            :model="applyForm"
            label-width="200px"
            class="custom-common--form"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item
                  :label="$i18ns('附件')"
                  prop="ticketAccessory"
                >
                  <el-upload
                    :on-preview="accessoryPreview"
                    :on-change="accessoryChange"
                    :on-remove="accessoryRemove"
                    :limit="maxLength"
                    :file-list="ticketAccessoryList"
                    :auto-upload="false"
                    multiple
                  >
                    <el-button type="primary" size="small">{{$i18ns('选择')}}文件</el-button>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  class="require-asterisk"
                  :label="$i18ns('收件人名称')"
                  prop="attn_name"
                >
                  <el-input
                    v-model="applyForm.attn_name"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-button type="primary" @click="insertStrategy()"
                  >{{$i18ns('选择')}}</el-button
                >
              </el-col>
              <el-col :span="8">
                <el-form-item
                  class="require-asterisk"
                  :label="$i18ns('收件人电话')"
                  prop="attn_phone"
                >
                  <el-input
                    v-model="applyForm.attn_phone"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item
                  class="require-asterisk"
                  :label="$i18ns('收件人地址')"
                  prop="attn_address"
                >
                  <el-input
                    v-model="applyForm.attn_address"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
              </el-col>
          <el-col :span="8">
              <el-form-item :label="$i18ns('用印原因')"  class="require-asterisk"  prop="affix_reason">
                <el-select v-model="applyForm.affix_reason" placeholder>
                  <el-option
                    v-for="(item, i) in reasonlist"
                    :key="i"
                    @change="radioChange"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            </el-row>
            <el-dialog
              title="收件人信息列表"
              :visible.sync="strategyModels"
              :before-close="handleClosess"
              width="1200px"
              :append-to-body="true"
            >
              <div class="el-dialog-dev">
                <div class="container-content">
                  <div class="container-content--search">
                    <div class="container-content--search">
                      <el-form
                        :model="strategyForm"
                        ref="strategyForm"
                        :rules="appRules"
                        label-width="150px"
                        class="custom-common--form"
                      >
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="收件人姓名" prop="attn_name">
                              <el-input
                                v-model="strategyForm.attn_name"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <div class="button-footer">
                              <el-button type="primary" @click="searchTeller"
                                >查询</el-button
                              >
                              <el-button type="primary" @click="reset"
                                >{{$i18ns('重置')}}</el-button
                              >
                            </div>
                          </el-col>
                        </el-row>
                      </el-form>
                    </div>
                  </div>
                  <div class="container-centent--table">
                    <el-table
                      ref="modifyTable"
                      :data="tableModifyDatas"
                      :border="true"
                      stripe
                    >

                      <el-table-column
                        label="网点id"
                        prop="city_no"
                        align="center"
                        show-overflow-tooltip
                      ></el-table-column>
                      <el-table-column
                        label="网点名称"
                        prop="city_name"
                        align="center"
                        show-overflow-tooltip
                      ></el-table-column>
                      <el-table-column
                        label="收件人名称"
                        prop="attn_name"
                        align="center"
                        show-overflow-tooltip
                      ></el-table-column>
                      <el-table-column
                        label="收件人电话"
                        prop="attn_phone"
                        align="center"
                        show-overflow-tooltip
                      ></el-table-column>
                      <el-table-column
                        label="收件人地址"
                        prop="attn_address"
                        align="center"
                        show-overflow-tooltip
                      ></el-table-column>
                      <el-table-column
                        label="操作"
                        align="center"
                        show-overflow-tooltip
                      >
                        <template slot-scope="scope">
                          <el-button type="text" @click="selectClick(scope.row)"
                            >{{$i18ns('选择')}}</el-button
                          >
                        </template>
                      </el-table-column>
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
                </div>
              </div>
            <!--  <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="handleClosess">{{$i18ns('取消')}}</el-button>
              </span>-->
            </el-dialog>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="$i18ns('备注')">
                  <el-input
                   maxlength="200"
                    type="textarea"
                    resize="none"
                    :rows="3"
                    v-model="applyForm.remark"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain
        >{{$i18ns('文书文件')}}</el-button
      >
      <el-button size="small">{{$i18ns('取消')}}</el-button>
    </div>
    <div class="container-centent--table" v-show="false">
            <el-table ref="multipleTable" :data="tableDatas" :border="true" style="width: 100%" stripe>
                <el-table-column label="申请单编号" prop="applid" align="center" show-overflow-tooltip></el-table-column>
                <el-table-column :label="$i18ns('申请人')" prop="tranus" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column :label="$i18ns('申请时间')" prop="gmt_create" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column label="结案时间" prop="gmt_modified" show-overflow-tooltip align="center"></el-table-column>
                <el-table-column label="状态" prop="suitstus" show-overflow-tooltip align="center" :formatter="formatTypeData"></el-table-column>
               <el-table-column label="操作" align="center" width="240">
                 <template slot-scope="scope">
                 <el-button type="text" @click="selectMesg(scope.$index,scope.row)"  plain>{{$i18ns('查看')}}详情</el-button>
              </template>
               </el-table-column>
            </el-table>
        </div>
          <div class="container-content--pagination" v-show="false">
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
 <el-dialog
      title="用印资料申请详情"
      :visible.sync="ApplyInfoVisible"
      v-if="ApplyInfoVisible"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      size="1600px"
      width="75%"
      :append-to-body="true">
         <preview-attn-manage :appl_id="this.appl_id"  :confirmFlag ="true"/>
    </el-dialog>

    <image-preview v-if="imageVisible" :preview-url="dialogImageUrl"  @close="closePreview"/>
    <el-dialog :visible.sync="pdfVisible" width="1200px" :append-to-body="true">
      <div class="el-dialog-dev" >
        <iframe class="preview-frame" width="100%" style="height:70vh" :src="pdfUrl" frameborder="0" key="timer"></iframe>
      </div>
    </el-dialog>

  </div>
</template>
<script>
//import { validateHandle } from "../../other/loanPostManager/loanPostConstant/loanPostConstant";
//import UploadFile from "@/views/pl/components/UploadFile.vue";
//import ImagePreview from "COM/ImagePreview";
//import PreviewAttnManage from "../attnManage/PreviewAttnManage.vue";
import MyAxios from "pte-ui/utils/MyAxios";
import {
  validateHandle
} from "@/views/other/loanPostManager/loanPostConstant/loanPostConstant.js";

import _ from "lodash";
export default {
  name: "AttnManageAppl",
   components: {
     //PreviewAttnManage,
     // UploadFile,
     // ImagePreview,
    },
  data() {
    return {
      appRules:{
                recipientname:[{ required: true, message: '请输入收件人名称' }],
                recipientno:[{ required: true, message: '请输入收件人名称' }],
                recipientaddr:[{ required: true, message: '请输入收件人名称' }],
                lncfno:[{ required: true, message: '请输入借据号' }],
                // remark:[{ required: true, message: '请输入借据号' }],
            },
      activeNasmes: ["first", "second", "third"],
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
      strategyForm: {
        attn_name: "",
      },
      tableData: [
        {
          file_type: this.$i18ns('法定代表人身份证明'),
          file_name: this.$i18ns('法定代表人身份证明'),
          numbercopies: "0",
          status: false,
        },
        {
          file_type: this.$i18ns('营业执照'),
          file_name: this.$i18ns('营业执照'),
          numbercopies: "0",
          status: false,
        },
        {
          file_type: this.$i18ns('金融许可证'),
          file_name: this.$i18ns('金融许可证'),
          numbercopies: "0",
          status: false,
        },
        {
          file_type: this.$i18ns('法定代表人身份证'),
          file_name: this.$i18ns('法定代表人身份证'),
          numbercopies: "0",
          status: false,
        },
      ],
      maxLength: 20,

      compareLncfno: "", // 借据号对比字段
      clssstList: [], // 贷款状态下拉
      applyForm: {
        ticketList: [],
         reason:"",
        remark: "",
        affix_reason:"",
        ticketAccessory: [],
        attn_name: "",
        attn_phone: "",
        attn_address: "",
      },
      timer:"",
      pdfVisible:false,
      imageVisible:false,
      pdfUrl:"",
      dialogImageUrl:"",
      ticketAccessoryList: [],
      isfirstoffList: [], // 是否首封
      fileList: [], // 身份证附件文件列表
      urgentRule: [], // 是否获得管理层审批表单校验
      khjmsqsjOptions: {}, // 客户申请减免时间有效期控件配置
      pickerOptions: {}, // 预约减免有效期控件配置
      isLookShow: false, // 弹出框显示/隐藏控制 减免历史
      showCreditInfo: false, // 弹出框显示/隐藏控制人行征信
      lncfnoObj: {
        lncfno: "",
      },
      currentPage: 1,
      tableSize: 10,
      tableTotal: 0,

      currentPages: 1,
      isShowPage:false,
      isShow:true,
      applist:"",
      appl_id:"",
      tableDatas:[],
      strategyModels: false,
      ApplyInfoVisible: false,
      showApplyInfo:false,
      tableModifyDatas: [],
      statuslist:[],
      orgListss: [], //收件人姓名
      validateList: [], //校验
      orgList: [], //受理机构字典列表
      creditFileTypeList: [], //承办机构字典列表
      multipleSelection: [],
    };
  },

  activated() {
    // 路由传参进入页面刷新页面
    if (this.$route.query.lncfno) {
      this.basicForm.lncfno = this.$route.query.lncfno;
      this.lncfnoBlur();
    }
  },
  computed: {
    procpreTypeListFilter() {
      let procpreTypeList = _.cloneDeep(this.procpreTypeList);
      for (let i = 0; i < this.applyForm.ticketList.length; i++) {
        for (let j = 0; j < procpreTypeList.length; j++) {
          if (
            this.applyForm.ticketList[i].procpreType ===
            procpreTypeList[j].dictId
          ) {
            procpreTypeList[j].disabled = true;
          }
        }
      }
      return procpreTypeList;
    },
  },
  created() {
    this.getDictList("E_PROOCPRE_TYPE", "procpreTypeList"); //
    this.getDictList("E_YES___", "isfirstoffList"); // 是否首封下拉
    this.getDictList("PL_E_DOCUMNTYPE", "creditFileTypeList"); //承办机构字典类型
    this.getDictList("E_YES___", "yesnoList"); //是否字典
    this.getDictList("E_SUITSTUS", "yesnoListss"); //
    this.getDictList("E_ENTRUSTSTUS", "entrust_statusList");
    this.getDictList("MS_E_LEVEL5_TYPE", "clssstList"); //贷款状态字典
    this.getDictList("E_ADJRS", "isunitlnList");//是否联合贷
    this.getDictList("E_RPAPLSTUS", "statuslist");//是否联合贷
    this.getDictList("PL_E_REASONS", "reasonlist"); //
    //this.getTableData();


   // 个人批量扣款路由传参进入页面则直接调接口初始化页面
    if (this.$route.query.lncfno) {
      this.basicForm.lncfno = this.$route.query.lncfno;
      this.lncfnoBlur();
    }
    this.pickerOptions.disabledDate = (time) => {
      let maxDate = Date.now();
      return time.getTime() > maxDate;
    };
  },
  methods: {

      selectMesg(index, row){
        this.appl_id = row.applid;
        this.showApplyInfo = true;
        this.ApplyInfoVisible = true;
      },

    // radioChange(){
    //     if(this.tableDatasa.applist=='1'){
    //       this.isShow=true;
    //     }
    //     if(this.tableDatasa.applist=='2'){
    //       this.isShow=false;
    //     }
    //   },


      formatTypeData(row,column){
          let name = row[column.property];
          let data = row[column.property];
          this.statuslist.forEach(function(item,index){
            if(data == item.dictId){
              name = item.dictName;
            }
          })
          return name;
        },
    clearData(){
        this.tableData= [];
        this.applyForm ={
           ticketAccessory:[],//新增人员证明文件
           attn_name:"",
           recipientname:"",
           recipientno:"",
           recipientaddr:"",
           remark: "",
           reason:"",
        }
        this.$refs.qdpzProp.clearFileList();
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
      this.getTableDatas();
       this.getOrgListss();
    },
    /**
     * 分页sizeChange 回调
     */
    // sizeChanges(val) {
    //   this.tableSize = val;
    //   this.searchTeller();
    // },
    //  currentChanges(val) {
    //   this.currentPages = val;

    // },

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


    /**
     * 查询
     */
    searchTeller() {
      this.getOrgListss();

    },

    insertStrategy() {
      this.tableModifyDatas = [];
      this.strategyModels = true;
      // this.multipleSelection = [];
      // this.getOrgListss();
    },

    /**
     * 借据号失焦回调
     */
    lncfnoBlur() {
      // if (this.compareLncfno === this.basicForm.lncfno) {
      //   return false;
      // }
      this.compareLncfno = this.basicForm.loan_no;
      if (!this.basicForm.loan_no) {
        return false;
      }
      let params = {
        servicecode: "ln3100",
        loan_due_bill_num: this.basicForm.loan_no,
      };
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then((response) => {
          if (response && response.code === "200" && response.data) {
            let cus = response.data;
            let data = response.data;

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

            // this.getTableDatas(response.data);
            // this.getTableDatasss(response.data);
            // this.basicForm.acctna = cus.acctna;
            // this.basicForm.islgfe = cus.islgfe;
            // this.basicForm.idtfno = cus.idtfno;
            //  this.basicForm.debtpr = cus.debtpr;
            // this.basicForm.phonno = cus.phonno;
            // this.basicForm.prodna = cus.prodna;
            // this.basicForm.nowvorgnm = cus.nowvorgnm;
            // this.basicForm.areacenter = cus.areaCenter;
            // this.basicForm.areaCenterName = cus.areaCenterName;
            // this.basicForm.clssst = cus.clssst;
            // this.basicForm.accoutage = cus.accoutage;
            // this.basicForm.isunitln = cus.isunitln;
            // this.basicForm.unitname = cus.unitname;
            // this.basicForm.ovdays = cus.ovdays;
            // this.basicForm.entrust_status = cus.entrust_status;
            // this.basicForm.nowvorg = cus.nowvorg;
            // this.basicForm.suit_status = cus.suit_status;
            // this.basicForm.cardbl = cus.cardbl;
            // //   this.getRecipInfo(); //获取收件人名称信息
            // let a = parseFloat(this.basicForm.debtpr);
            // if (a === 0.0) {
            //   this.$message({
            //     type: "warning",
            //     message: "当前客户欠款本金为0，请注意！",
            //   });
            // } else if (a < 30000) {
            //   this.$message({
            //     type: "warning",
            //     message: "当前客户欠款本金小于3万，请注意！",
            //   });
            // }
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },

       //查询当前借据是否发起过诉讼申请
 getTableDatasss(basicForm) {
     let params2 = {
                servicecode: "RLMSPLTS1123",
                 lncfno :basicForm.lncfno,

            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params2).then(response => {
                if (response && response.code === "200" && response.data ) {
                   this.tableDatasa=response.data;
                    let a = this.tableDatasa.applist;
            if (a == 1) {
              this.$message({
                type: "warning",
                message: "当前暂无发起的诉讼申请单，如需申请请勾选用印原因！",
                });
                 this.isShow=false
            }

                }
            }).catch(err1 => {
                console.error(err1);
            })

        },
    //查询当前借据历史申请信息
 getTableDatas(basicForm) {
     let params2 = {
                servicecode: "RLMSPLTS1122",
                 lncfno :basicForm?basicForm.lncfno:this.basicForm.lncfno,
                 lncatp:"1",
                 start: this.currentPage,
                 length: this.tableSize,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params2).then(response => {
                if (response && response.code === "200" && response.data ) {
                   this.tableDatas=response.data;
                   this.isShowPage = true;
                   console.log(response.data,"response.data")
                   this.tableTotal = response.pageParam ? response.pageParam.total : 0;

                }
            }).catch(err1 => {
                console.error(err1);
            })

        },

    /**
     * 取消修改策略
     */
    handleClosess() {
      this.$confirm("是否取消新增人员信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.tableModifyDatas = [];
        this.strategyModels = false;
      });
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

    submit() {
      this.validateList = [];
      const formList = ["basicForm", "debtForm"];
      // formList.forEach((item) => {
      //   this.validateList.push(validateHandle(item, this));
      // });
      Promise.all(this.validateList)
        .then((res) => {
       let params = this.transformData();
      params.servicecode = "pl0558";
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
    }) .catch((err) => {
  this.$message({
    type: "warning",
    message: "校验不通过",
  });
});



    },
 reset(){
        console.log(this.strategyForm,"this.selectForm")
      Object.keys(this.strategyForm).forEach(key => {
            this.strategyForm[key]='';
        })

  console.log(this.ticketAccessory,"this.selectForm")
      Object.keys(this.ticketAccessory).forEach(key => {
            this.ticketAccessory[key]='';
        })
      },
    /**
     * 文件清单change回调
     * @param file 当前文件对象
     * @param ticketAccessoryList 文件清单
     *
     */
    accessoryChange(file, ticketAccessoryList) {
      console.log(this.tableData);
      console.log(file, ticketAccessoryList, "accessoryChange");
      this.ticketAccessoryList = ticketAccessoryList;
      const isLt8M = file.size / 1024 / 1024 < 20;
      if (!isLt8M) {
        this.ticketAccessoryList.splice(ticketAccessoryList.indexOf(file), 1);
        this.$message({
          type: "warning",
          message: file.name + "附件大于20M",
        });
      } else {
        let formData = new FormData();
        formData.append("file", file.raw);
      formData.append("org_id", userInfo.org_id);
        formData.append("path", "PD");
        MyAxios.invokeAPI("/SUMP/icmcall/file", "post", formData)
          .then((res) => {
            if (res && res.code === "200" && res.data && res.data.path) {
              file.status = "success";
              let param = {
                filePath: res.data.path, //文件路径
                file_type: "", //文件类型
                numbercopies: "", //打印份数
                file_name: file.name, //文件名
                status: true, //控制表格内容显示
              };
              let url =  window.URL.createObjectURL(file.raw);
              this.ticketAccessoryList[ticketAccessoryList.indexOf(file)].url  = url;
              // this.tableData[tableData.indexOf(file)].file_name  = file.name;
              this.applyForm.ticketAccessory[
                ticketAccessoryList.indexOf(file)
              ] = param;
              this.tableData.push(param);
              console.log("aaaaaaaaaaaaa", this.tableData);
            } else {
              this.applyForm.ticketAccessoryList.splice(
                ticketAccessoryList.indexOf(file),
                1
              );
              this.$message({
                type: "error",
                message: "上传失败！",
              });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },

    selectClick(row) {
      let that = this;
      this.$confirm("是否选择该收件人信息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          (this.applyForm.attn_name = row.attn_name),
            (this.applyForm.attn_phone = row.attn_phone),
            (this.applyForm.attn_address = row.attn_address),
            (this.strategyModels = false);
          that.$message({
            type: "success",
            message: "新增成功",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消新增",
          });
        });
    },
    /**
       * 关闭图片预览
       */
      closePreview() {
        this.imageVisible = false;
      },
    /**
     * 文件清单移除回调
     * @param file 当前文件对象
     * @param ticketAccessoryList 文件清单
     *
     */
    accessoryRemove(file, ticketAccessoryList) {
      this.ticketAccessoryList.forEach((item, key) => {
        if (item.uid === file.uid) {
          this.applyForm.ticketAccessory.splice(key, 1);
          this.ticketAccessoryList.splice(key, 1);
        }
      });
      this.tableData.forEach((j, k) => {
        if (j.file_name === file.name) {
          this.tableData.splice(k, 1);
        }
      });
      if (ticketAccessoryList.length === 0) {
        this.$refs.applyForm.validateField(`ticketAccessory`);
      }
    },
    accessoryPreview(file) {
          if(/.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(file.name)){
            this.dialogImageUrl = file.url;
            this.pdfVisible = false;
            this.imageVisible=true;
            this.timer = new Date().getTime(); //更新timer，重新加载子组件
          }else if(/.(pdf)$/.test(file.name)){
            this.pdfUrl = file.url;
            this.imageVisible=false;
            this.pdfVisible = true;
          }else{
            this.handleNewFileDownload(file);
          }

    },
    handleNewFileDownload(file) {
      let index = null;
      this.ticketAccessoryList.forEach((item, key) => {
        if (item.uid === file.uid) {
          index = key;
          return false;
        }
      });

      var params = {};
      params.path = this.applyForm.ticketAccessory[index].filePath;
      if(!params.path) {
        this.$message({
          type: "warning",
          message: "该附件未上传"
        })
        return;
      }
      MyAxios.invokeAPI("/SUMP/icmcall/download", "post", params)
        .then(res => {
          var filename =  this.applyForm.ticketAccessory[index].file_name;
          let URL = this.dataUrlToBlob(res.data.fileString, res.data.prefix);
          var a = document.createElement("a");
          a.download = filename;
          a.style.display = "none";
          a.href = window.URL.createObjectURL(URL);
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        })
        .catch(err => {
          console.error(err);
        });

    },
    dataUrlToBlob(data, prefix) {
        var bstr = window.atob(data);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: prefix });
      },
    /**
     * 删除信息
     * @param rows 选中的数据
     */
    deleteClick(rows) {
      console.log("rows", rows);
      // this.multipleSelection.splice(rows[0],rows[1]);
      rows.forEach((item) => {
        this.tableData.forEach((j, k) => {
          if (item.file_name === j.file_name) {
            this.tableData.splice(k, 1);
          }
        });
        console.log("6666666666", this.ticketAccessoryList);
        this.ticketAccessoryList.forEach((a, b) => {
          if (item.file_name === a.name) {
            this.ticketAccessoryList.splice(b, 1);
          }
        });
      });
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
      this.$http
        .invokeAPI("/SUMP/rest/dict", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            this[listKey] = res.data;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    handleselectionChange(val) {
      this.multipleSelection = val;
    },
    /**
     *获取收件人名称信息
     */
    getRecipInfo() {
      let params = {
        area_no: this.basicForm.areacenter,
        servicecode: "RLMSPLTS1410",
      };
      this.$http
        .invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            this.applyForm = res.data;
          }
        });
    },
    getOrgListss() {
      let params = {
        servicecode: "pl0534",
        attn_name: this.strategyForm.attn_name,
        start: this.currentPage,
        length: this.tableSize,

      };
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            this.tableModifyDatas = res.data;
            this.tableTotal = res.pageParam ? res.pageParam.total : 0;
            this.isShowPage = true;
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>
<style lang="less" scoped>
.purpose-basic,
.purpose-detail {
  padding: 16px 40px 0 12px;
}
.purpose-detail {
  .el-form {
    padding: 0;
  }
  /deep/.el-collapse {
    .el-collapse-item__content {
      padding: 20px 80px 20px 20px;
    }
  }
}
.ticket-detail {
  margin-bottom: 16px;
  padding: 16px 0 10px 0;
  position: relative;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  .ticket-option {
    width: 50px;
    height: 32px;
    position: absolute;
    top: calc(50% - 16px);
    right: -60px;
    i {
      width: 20px;
      display: inline-block;
      line-height: 32px;
      text-align: center;
      font-size: 18px;
      cursor: pointer;
      &:hover {
        color: #1890ff;
      }
    }
  }
}
.ticket-tips {
  padding-left: 20px;
  line-height: 34px;
  color: #0066ff;
}
.credential-upload {
  margin-bottom: 20px;
}
.delete-button {
  padding: 0px 0px 5px 11px;
}
.container-centent--table {
  margin: 11px 60px 18px 60px;
  border: 1px solid #e5e9f3;
  padding: 10px 20px 10px 10px;
}
.button-footer {
  text-align: right;
  padding: 0px 45px;
}
.container-content--pagination {
  text-align: right;
}
</style>
