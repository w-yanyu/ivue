<template>
  <div>
    <el-collapse v-model="activeNasmes" class="custom-common--collapse">
      <el-collapse-item name="first">
        <template slot="title">
          <span><em></em>{{$i18ns('概要信息')}}</span>
        </template>
        <el-form  ref="basicForm" :model="basicForm" label-width="120px" class="custom-common--form">
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$i18ns('借据号')"  prop="loan_no"   :rules="[{ required: true, message: $i18ns('请输入借据号')}]">
                <el-input v-model="basicForm.loan_no" @blur="lncfnoBlur"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('客户名称')">
                <el-input v-model="basicForm.cust_name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('客户号')">
                <el-input v-model="basicForm.cust_no" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('产品名称')">
                <el-input v-model="basicForm.prod_name" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('产品代码')">
                <el-input v-model="basicForm.prod_no" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('货币代号')" prop="ccy_code"  >
                <el-select v-model="basicForm.ccy_code" placeholder=" " :disabled="true">
                  <el-option
                    v-for="(item, index) in ccyCodeList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" v-show="false">
              <el-form-item :label="$i18ns('减免历史')">
                <el-button    @click="queryReduHis" type="primary">减免历史</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="second">
        <template slot="title">
          <span><em></em>{{$i18ns('余额信息')}}</span>
        </template>
        <el-form ref="adjustForm" :model="adjustForm" label-width="120px" class="custom-common--form">
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
              <el-form-item :label="$i18ns('呆滞本金')">
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
          <span><em></em>{{$i18ns('调整信息')}}</span>
        </template>
        <el-form ref="adjustForm" :model="adjustForm" label-width="150px" class="custom-common--form">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$i18ns('减免本金')" :rules="[{ required: true, message: $i18ns('请输入减免本金')}]">
                <el-input v-model="adjustForm.dert_amt"   oninput="value=value.replace(/[^0-9.]/g,'')"  ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$i18ns('减免利息')" :rules="[{ required: true, message: $i18ns('请输入减免利息')}]">
                <el-input v-model="adjustForm.dert_inst"   oninput="value=value.replace(/[^0-9.]/g,'')"   ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$i18ns('资金来源账号')" :rules="[{ required: true, message: $i18ns('请输入来源账号')}]">
                <el-input v-model="adjustForm.chk_write_off_src_acct_num"   oninput="value=value.replace(/[^0-9.]/g,'')"  ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$i18ns('调整申请原因')" prop="aply_adjust_reason" :rules="[{ required: true, message: $i18ns('请选择调整申请原因')}]">
                <el-select v-model="adjustForm.aply_adjust_reason" placeholder=" ">
                  <el-option
                    v-for="(item, index) in adjrsnList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$i18ns('备注')" prop="remark" :rules="[{ required: true, message: $i18ns('请输入备注')}]">
                <el-input v-model="adjustForm.remark" type="textarea" resize="none" :rows="4"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit">{{$i18ns('提交')}}</el-button>
      <el-dialog
        v-if = "isLookShow"
        title="减免历史"
        :visible.sync="isLookShow"
        width="1200px"
        :show-close="isLookShow"
        :append-to-body="true">
      <to-json to-url="/views/pl/derate/redu_history_list.json" :params="lncfnoObj"></to-json>
      </el-dialog>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";
//import { validateHandle } from "../loanPostConstant/loanPostConstant";
import { validateHandle } from  "../derate/loanPostConstant";
import accounting from "pte-ui/utils/accounting";
//import CreditReportInfo from "../loanPostComponents/CreditReportInfo";
import UploadFileView from "@/views/pl/LevelFiveClasf/UploadFileView.vue";
import ToJson from "pte-ui/toJson";

export default {
  name: "ZManualDerateApply",
  components: {
      UploadFileView
  },
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      activeNasmes: ["first", "second", "third"],
      basicForm: {
        loan_no: "",
        cust_name: "",
        cust_no: "",
        cert_no: "",
        prod_name: "",
        prod_no: "",
        loan_acct_no:"",
        ccy_code:""
      },
      debtForm: {

      },
      compareLncfno: "", // 借据号对比字段
      clssstList: [], // 贷款状态下拉
      adjustForm: {
        servicecode: "pl0073",
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
      loanStatusList:[],
      ccyCodeList:[],
      remthdList: [], // 减免方式下拉
      remttpList: [], // 减免类型下拉
      adjrsnList: [], // 调整申请原因下拉
      uploadFileList: [], // 身份证附件文件列表
      apanneFileList: [], // 申请书附件文件列表
      cdtaneFileList: [], // 征信报告附件列表
      otbaneFileList: [], // 其他证据附件列表
      isLookShow: false, // 弹出框显示/隐藏控制 减免历史
      lncfnoObj:{
        loan_no:"",
      }
    }
  },
  computed: {

  },
  activated(){
    // 路由传参进入页面刷新页面
    if(this.$route.query.loan_no){
       this.basicForm.loan_no=this.$route.query.loan_no;
       this.lncfnoBlur();
     }
  },
  created() {

    this.basicForm.loan_no = this.cParentParams.reserve1;

    if(this.basicForm.loan_no!="" && this.basicForm.loan_no!=undefined){
        this.lncfnoBlur();
    }

    // // 客户申请减免时间有效期控件配置 返回值为 true 则禁用该日期
    // this.khjmsqsjOptions.disabledDate = time => {
    //   return (time.getTime() > new Date().getTime());
    // }
    // // 预约减免有效期控件配置 返回值为 true 则禁用该日期
    // this.pickerOptions.disabledDate = time => {
    //   let maxDate = this.adjustForm.yyjmyxqDisableDate ? this.$moment(this.adjustForm.yyjmyxqDisableDate)._d.getTime() : Date.now();
    //   return (time.getTime() > maxDate || time.getTime() <= new Date().getTime() - 86400000);
    // }
    // this.getDictList("PL_E_CLSSST", "clssstList"); // 获取贷款状态下拉
     this.getDictList("PL_E_ADJRST", "adjrsnList"); // 调整申请原因下拉
     this.getDictList("PL_E_CLSSST", "loanStatusList"); // 贷款形态数据字典
    this.getDictList("MS_CURRENCY", "ccyCodeList"); // 货币数据字典
    //   // 个人批量扣款路由传参进入页面则直接调接口初始化页面
    // if(this.$route.query.loan_no){
    //    this.basicForm.loan_no=this.$route.query.loan_no;
    //    this.lncfnoBlur();
    // }
  },
  methods: {
    /**
     * 页面还原
     */
    pageRestore() {
      this.basicForm.loan_no = "";
      this.basicForm.cust_no = "";
      this.basicForm.cust_name = "";
      this.basicForm.prod_name = "";
      this.basicForm.cert_no = "";
      this.basicForm.prod_no = "";
      this.basicForm.phonno = "";
      this.basicForm.loan_acct_no = "";
      this.adjustForm.normal_princi = "";
      this.adjustForm.overdue_princi = "";
      this.adjustForm.stagnant_princi = "";
      this.adjustForm.uncollect_acct_princi="";
      this.adjustForm.recv_accrued_inst="";
      this.adjustForm.collt_accrued_inst="";
      this.adjustForm.recv_debit_inst="";
      this.adjustForm.collt_debit_inst="";
      this.adjustForm.recv_accrued_penalt_inst="";
      this.adjustForm.collt_acrued_penalt_inst="";
      this.adjustForm.recv_penalt_inst="";
      this.adjustForm.collt_penalt_inst="";
      this.adjustForm.accrued_comp_inst="";
      this.adjustForm.compd_inst="";
      this.adjustForm.prcpl_smtn="";
      this.adjustForm.int_smtn="";
    //  this.debtForm.overdue_days = "";
    //  this.debtForm.recv_fee = "";
      this.adjustForm.dert_amt = "";
      this.adjustForm.dert_inst = "";
      this.adjustForm.aply_adjust_reason = "";
      this.adjustForm.chk_write_off_src_acct_num="";
      this.adjustForm.remark = "";
      this.adjustForm.upload = [];
      this.adjustForm.apanne = [];
      this.adjustForm.cdtane = [];
      this.adjustForm.otbane = [];
      this.uploadFileList = [];
      this.apanneFileList = [];
      this.cdtaneFileList = [];
      this.otbaneFileList = [];
      this.$refs.basicForm.resetFields();
      this.$refs.debtForm.resetFields();
      this.$refs.adjustForm.resetFields();
    },
    /**
     * 借据号失焦回调
     */
    lncfnoBlur() {

     // this.compareLncfno = this.basicForm.loan_no;
      if (!this.basicForm.loan_no) {
        return false;
      }

      this.lncfnoObj.loan_no = this.basicForm.loan_no;
      let params = {
        servicecode: "ln3101",
        loan_due_bill_num: this.basicForm.loan_no,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
        .then(response => {
          if (response && response.code === "200") {
            let customerLoan = response.data;
            let redupara = response.data.redupara;
            // 基础信息填充
            //this.basicForm.loan_no   = cus.loan_due_bill_num;
            this.basicForm.cust_name = customerLoan.cust_nm;
            this.basicForm.cust_no   = customerLoan.cust_num  ;
            this.basicForm.cert_no   = customerLoan.cert_no  ;
            this.basicForm.prod_name = customerLoan.prod_nm;
            this.basicForm.prod_no   = customerLoan.prod_code;
            this.basicForm.ccy_code  =customerLoan.ccy_code_num;
            this.adjustForm.ccy_code = customerLoan.ccy_code_num;
            // 余额信息填充
            this.adjustForm.ccy_code = customerLoan.ccy_code_num;
            this.adjustForm.normal_princi=customerLoan.nrl_prcpl;
            this.adjustForm.accrued_comp_inst=customerLoan.acd_cmpd_int;
            this.adjustForm.compd_inst=customerLoan.cmpd_int;
            this.adjustForm.collt_acrued_penalt_inst=customerLoan.urge_collt_acd_pnly_int;
            this.adjustForm.overdue_princi=customerLoan.ovdue_prcpl;
            this.adjustForm.recv_accrued_inst=customerLoan.rcvbl_acd_int;
            this.adjustForm.recv_accrued_penalt_inst=customerLoan.rcvbl_acd_pnly_int;
            this.adjustForm.recv_penalt_inst=customerLoan.rcvbl_pnly_int;
            this.adjustForm.recv_debit_inst=customerLoan.rcvbl_db_int;
            this.adjustForm.stagnant_princi=customerLoan.stgnt_prcpl;
            this.adjustForm.uncollect_acct_princi=customerLoan.ucoltb_prcpl;
            this.adjustForm.collt_accrued_inst=customerLoan.urge_collt_acd_int;
            this.adjustForm.collt_debit_inst=customerLoan.urge_collt_db_int;
            this.adjustForm.collt_penalt_inst=customerLoan.urge_collt_pnly_int;
            this.adjustForm.prcpl_smtn=customerLoan.prcpl_smtn;
            this.adjustForm.int_smtn=customerLoan.int_smtn;
            this.adjustForm.loan_form=customerLoan.loan_form;
          }
        })
        .catch(err => {
          console.error(err);
        })
    },
    /**
     * 求和
     */
    sumCalc() {
      let list = [...arguments];
      list = list.map(item => Number(item));
      return Number(this.print(this.$math.sum(this.$math.bignumber(list)))).toFixed(2);
    },
    /**
     * 格式化
     * @param value 传入值
     */
    print(value) {
      const precision = 14;
      return this.$math.format(value, precision);
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
      this.$http.invokeAPI("/SUMP/rest/dict", "post", params)
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
     * 输入触发input回调
     */
    derateBlur(key) {
      this.adjustForm[key] = Number(accounting.unformat(this.adjustForm[key])).toFixed(2);
      this.adjustForm.dert_amt = this.sumCalc(this.adjustForm.dert_inst, this.adjustForm.dert_penalt_inst, this.adjustForm.derate_overdue_fine);
    },
    /**
     * 减免方式focus回调
     */
    remthdFocus() {
      if (Number(this.debtForm.overdue_princi) > 0) {
        this.$set(this.remthdList[0], "disabled", true);
      } else {
        this.$set(this.remthdList[0], "disabled", false);
      }
    },
    /**
     * 减免方式change回调
     * @param val 调整申请原因选中值
     */
    remthdChange(val) {
      if (val === "1") {
        this.adjustForm.dert_inst = this.reduceParam.dert_inst;
        this.adjustForm.dert_penalt_inst = this.reduceParam.dert_penalt_inst;
        this.adjustForm.derate_overdue_fine = this.reduceParam.derate_overdue_fine;
      }
    },
    /**
     * 文件清单change回调
     * @param file 当前文件对象
     * @param fileList 文件清单
     */
    uploadChange(file, fileList) {
      this.uploadFileList = fileList;
      const isLt8M = file.size / 1024 / 1024 < 20;
      if (!isLt8M) {
        this.uploadFileList.splice(fileList.indexOf(file), 1);
        this.$message({
          type: "warning",
          message: "身份证附件大于20M"
        })
      } else {
        let formData = new FormData();
        formData.append("file", file.raw);
      formData.append("org_id", userInfo.org_id);
        formData.append("path", "PD");
        this.$http.invokeAPI("/SUMP/icmcall/file", "post", formData)
          .then(res => {
            if (res && res.code === "200" && res.data && res.data.path) {
              file.status = "success";
              let map = {
                name: file.name,
                path: res.data.path,
              }
              this.adjustForm.upload.push(map);
            } else {
              this.uploadFileList.splice(fileList.indexOf(file), 1);
              this.$message({
                type: 'error',
                message: '上传失败！'
              })
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    },
    apanneChange(file, fileList) {
      this.apanneFileList = fileList;
      const isLt8M = file.size / 1024 / 1024 < 20;
      if (!isLt8M) {
        this.apanneFileList.splice(fileList.indexOf(file), 1);
        this.$message({
          type: "warning",
          message: "身份证附件大于20M"
        })
      } else {
        let formData = new FormData();
        formData.append("file", file.raw);
      formData.append("org_id", userInfo.org_id);
        formData.append("path", "PD");
        this.$http.invokeAPI("/SUMP/icmcall/file", "post", formData)
        .then(res => {
          if (res && res.code === "200" && res.data && res.data.path) {
            file.status = "success";
            let map = {
              name: file.name,
              path: res.data.path,
            }
            this.adjustForm.apanne.push(map);
          } else {
            this.apanneFileList.splice(fileList.indexOf(file), 1);
            this.$message({
              type: 'error',
              message: '上传失败！'
            })
          }
        })
        .catch(err => {
          console.error(err);
        });
      }
    },
    cdtaneChange(file, fileList) {
      this.cdtaneFileList = fileList;
      const isLt8M = file.size / 1024 / 1024 < 20;
      if (!isLt8M) {
        this.cdtaneFileList.splice(fileList.indexOf(file), 1);
        this.$message({
          type: "warning",
          message: "身份证附件大于20M"
        })
      } else {
        let formData = new FormData();
        formData.append("file", file.raw);
      formData.append("org_id", userInfo.org_id);
        formData.append("path", "PD");
        this.$http.invokeAPI("/SUMP/icmcall/file", "post", formData)
        .then(res => {
          if (res && res.code === "200" && res.data && res.data.path) {
            file.status = "success";
            let map = {
              name: file.name,
              path: res.data.path,
            }
            this.adjustForm.cdtane.push(map);
          } else {
            this.cdtaneFileList.splice(fileList.indexOf(file), 1);
            this.$message({
              type: 'error',
              message: '上传失败！'
            })
          }
        })
        .catch(err => {
          console.error(err);
        });
      }
    },
    otbaneChange(file, fileList) {
      this.otbaneFileList = fileList;
      const isLt8M = file.size / 1024 / 1024 < 20;
      if (!isLt8M) {
        this.otbaneFileList.splice(fileList.indexOf(file), 1);
        this.$message({
          type: "warning",
          message: "身份证附件大于20M"
        })
      } else {
        let formData = new FormData();
        formData.append("file", file.raw);
      formData.append("org_id", userInfo.org_id);
        formData.append("path", "PD");
        this.$http.invokeAPI("/SUMP/icmcall/file", "post", formData)
        .then(res => {
          if (res && res.code === "200" && res.data && res.data.path) {
            file.status = "success";
            let map = {
              name: file.name,
              path: res.data.path,
            }
            this.adjustForm.otbane.push(map);
          } else {
            this.otbaneFileList.splice(fileList.indexOf(file), 1);
            this.$message({
              type: 'error',
              message: '上传失败！'
            })
          }
        })
        .catch(err => {
          console.error(err);
        });
      }
    },
    /**
     * 文件清单移除回调
     * @param file 当前文件对象
     * @param fileList 文件清单
     */
    uploadRemove(file, fileList) {
      let index = null;
      this.uploadFileList.forEach((item, key) => {
        if (item.uid === file.uid) {
          index = key;
          return false;
        }
      });
      this.adjustForm.upload.splice(index, 1);
      this.uploadFileList.splice(index, 1);
    },
    apanneRemove(file, fileList) {
      let index = null;
      this.apanneFileList.forEach((item, key) => {
        if (item.uid === file.uid) {
          index = key;
          return false;
        }
      });
      this.adjustForm.apanne.splice(index, 1);
      this.apanneFileList.splice(index, 1);
    },
    cdtaneRemove(file, fileList) {
      let index = null;
      this.cdtaneFileList.forEach((item, key) => {
        if (item.uid === file.uid) {
          index = key;
          return false;
        }
      });
      this.adjustForm.cdtane.splice(index, 1);
      this.cdtaneFileList.splice(index, 1);
    },
    otbaneRemove(file, fileList) {
      let index = null;
      this.otbaneFileList.forEach((item, key) => {
        if (item.uid === file.uid) {
          index = key;
          return false;
        }
      });
      this.adjustForm.otbane.splice(index, 1);
      this.otbaneFileList.splice(index, 1);
    },
    /**
     * 金额校验
     *
     * */
    checkamt(){
      var _this = this
      var int=_this.sumCalc(_this.debtForm.accrued_inst,_this.debtForm.recv_debit_inst,_this.debtForm.dert_rcvbl_urge_collt_acd_int,_this.debtForm.accrued_penalt_inst,
        _this.debtForm.recv_penalt_inst,_this.debtForm.write_off_inst)
      console.info(int);
      if(int<=0){
        _this.$message({
          type: 'error',
          message: '利息总额为0不允许核减！'
        })
        return false;
      }
      return  true;
    },
    /**
     * 表单提交
     */
    submit() {
      let _this=this;
      let validateList = [];

      _this.adjustForm.cust_no=_this.basicForm.cust_no;
      _this.adjustForm.cust_name=_this.basicForm.cust_name;
      _this.adjustForm.loan_no=_this.basicForm.loan_no;

          let params = _this.adjustForm;

          this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "POST", params)
            .then(res => {
              if (res && res.code === "200") {
                this.$message({
                  type: "success",
                  message: res.message
                });
                this.pageRestore();
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
              }
            })
            .catch(err => {
              console.error(err);
            })
    },
    queryReduHis(){
      this.isLookShow = true
      this.lncfnoObj.loan_no = this.basicForm.loan_no
    },
    showReport(){
      if (this.basicForm.cert_no==="") {
        this.$message({
          type: "warning",
          message: "请先输入身份证号信息"
        });
        return;
      }
      this.showCreditInfo = true;
    },
    showClose() {
      this.showCreditInfo = false;
    },
    /**
     *
     * 金额输入校验
     * @param value
     */
    handleInput(value) {
      if (value != '') {
        if (value.indexOf('.') > -1) {
          this.form.ProjectBudget = value.slice(0, value.indexOf('.') + 3)
        } else {
          this.form.ProjectBudget = value
        }
      }
    },
  }
}
</script>
