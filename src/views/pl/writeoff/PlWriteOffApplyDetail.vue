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
              <el-form-item :label="$i18ns('借据号')">
                <el-input v-model="basicForm.loan_no" :disabled="true"></el-input>
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
              <el-form-item :label="$i18ns('合同编号')">
                <el-input v-model="basicForm.contract_no" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$i18ns('货币代号')" prop="ccy_code" >
                <el-select v-model="basicForm.ccy_code" placeholder=" "  :disabled="true">
                  <el-option
                    v-for="(item, index) in ccyCodeList"
                    :key="index"
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
              <el-form-item :label="$i18ns('核销本金')" :rules="[{ required: true, message: '请输入核销本金'}]" >
                <el-input v-model="adjustForm.write_off_princi"  oninput="value=value.replace(/[^0-9.]/g,'')" :disabled="true" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$i18ns('核销利息')" :rules="[{ required: true, message: '请输入核销利息'}]" >
                <el-input v-model="adjustForm.write_off_inst" oninput="value=value.replace(/[^0-9.]/g,'')" :disabled="true" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$i18ns('核销来源账号')" :rules="[{ required: false}]"  >
                <el-input v-model="adjustForm.write_off_src_acct_no"   oninput="value=value.replace(/[^0-9.]/g,'')" :disabled="true" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$i18ns('核销来源账号子序号')" :rules="[{ required: false}]" >
                <el-input v-model="adjustForm.write_off_src_acct_no_seq"   oninput="value=value.replace(/[^0-9.]/g,'')" :disabled="true" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$i18ns('备注')" prop="remark" :rules="[{ required: true, message: '请输入备注'}]" >
                <el-input v-model="adjustForm.remark" type="textarea" resize="none" :rows="4" :disabled="true" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>

  </div>
</template>
<script>

import accounting from "pte-ui/utils/accounting";
//import CreditReportInfo from "../loanPostComponents/CreditReportInfo";

export default {
  name: "ZManualDerateApplyDetail",
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object, // 父页面的scope数据对
  },
  components: {

  },
  data() {
    return {
      activeNasmes: ["first", "second", "third"],
      basicForm: {
        loan_no: "",
        cust_name: "",
        cust_no: "",
        cert_no: "",
        contract_no: "",
        ccy_code:""
      },

      compareLncfno: "", // 借据号对比字段
      clssstList: [], // 贷款状态下拉
      adjustForm: {
        servicecode: "pl0300",
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
        write_off_inst:"",//核销利息
        write_off_princi:"",//核销本金
        write_off_src_acct_no:"",//核销来源账号
        write_off_src_acct_no_seq:"",//核销来源账号子序号
        remark:"",//备注
        aply_adjust_reason:"",//申请原因
        ccy_code:"",
        loan_status:""
      },
      loanStatusList:[],
      ccyCodeList:[],//货币
      uploadFileList: [], // 身份证附件文件列表
      apanneFileList: [], // 申请书附件文件列表
      cdtaneFileList: [], // 征信报告附件列表
      otbaneFileList: [], // 其他证据附件列表
      urgentRule: [], // 是否获得管理层审批表单校验
      khjmsqsjOptions: {}, // 客户申请减免时间有效期控件配置
      pickerOptions: {}, // 预约减免有效期控件配置
      isLookShow: false, // 弹出框显示/隐藏控制 减免历史
      showCreditInfo: false, // 弹出框显示/隐藏控制人行征信
      lncfnoObj:{
        loan_no:"",
      }
    }
  },
  computed: {
    debtTotal() {
      let total = this.sumCalc(this.adjustForm.write_off_inst, this.adjustForm.dert_penalt_inst, this.adjustForm.derate_overdue_fine);
      return total;
    }
  },
  created() {
    // 客户申请减免时间有效期控件配置 返回值为 true 则禁用该日期
    this.khjmsqsjOptions.disabledDate = time => {
      return (time.getTime() > new Date().getTime());
    }
    // 预约减免有效期控件配置 返回值为 true 则禁用该日期
    this.pickerOptions.disabledDate = time => {
      let maxDate = this.adjustForm.yyjmyxqDisableDate ? this.$moment(this.adjustForm.yyjmyxqDisableDate)._d.getTime() : Date.now();
      return (time.getTime() > maxDate || time.getTime() <= new Date().getTime() - 86400000);
    }
    this.getDictList("PL_E_CLSSST", "clssstList"); // 获取贷款状态下拉
    this.getDictList("PL_E_ADJRS", "adjrsnList"); // 调整申请原因下拉
    this.getDictList("MS_CURRENCY", "ccyCodeList"); // 货币代号下拉
    this.getDictList("PL_E_CLSSST", "loanStatusList"); // 贷款形态数据字典
    // 减免信息初始化
    this.getWriteOffInfo();
  },
  methods: {
    /**
     * 获取减免信息
     */
    getWriteOffInfo() {
      let params = {
        servicecode: "pl0312",
        apply_no: this.cParentParams.apply_no,
      }
      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            console.log(customerLoan);
            const customerLoan = res.data;

            // 基础信息填充
            this.basicForm.loan_no = customerLoan.loan_no;
            this.basicForm.cust_name = customerLoan.cust_name;
            this.basicForm.cust_no = customerLoan.cust_no;
            this.basicForm.contract_no = customerLoan.contract_no;
            this.basicForm.ccy_code = customerLoan.ccy_code;
            // 余额信息填充
            // this.debtForm.overdue_princi= this.sumCalc(customerLoan.ovdue_amt, customerLoan.dert_rcvbl_urge_collt_acd_int);
            //  this.debtForm.overdue_days= customerLoan.overdue_days;
            this.adjustForm.prcpl_smtn = customerLoan.prcpl_smtn;
            this.adjustForm.int_smtn = customerLoan.int_smtn;
            this.adjustForm.normal_princi = customerLoan.normal_princi;
            this.adjustForm.overdue_princi = customerLoan.overdue_princi;
            this.adjustForm.stagnant_princi = customerLoan.stagnant_princi;
            this.adjustForm.uncollect_acct_princi = customerLoan.uncollect_acct_princi;
            this.adjustForm.recv_accrued_inst = customerLoan.recv_accrued_inst;
            this.adjustForm.collt_accrued_inst = customerLoan.collt_accrued_inst;
            this.adjustForm.recv_debit_inst = customerLoan.recv_debit_inst;
            this.adjustForm.collt_debit_inst = customerLoan.collt_debit_inst;
            this.adjustForm.recv_accrued_penalt_inst = customerLoan.recv_accrued_penalt_inst;
            this.adjustForm.collt_acrued_penalt_inst = customerLoan.collt_acrued_penalt_inst;
            this.adjustForm.recv_penalt_inst = customerLoan.recv_penalt_inst;
            this.adjustForm.collt_penalt_inst = customerLoan.collt_penalt_inst;
            this.adjustForm.accrued_comp_inst = customerLoan.accrued_comp_inst;
            this.adjustForm.compd_inst = customerLoan.compd_inst;
            this.adjustForm.write_off_inst = customerLoan.write_off_inst;
            this.adjustForm.write_off_src_acct_no = customerLoan.write_off_src_acct_no;
            this.adjustForm.write_off_src_acct_no_seq = customerLoan.write_off_src_acct_no_seq;
            this.adjustForm.write_off_princi = customerLoan.write_off_princi;
            this.adjustForm.remark = customerLoan.remark;
          }
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
     * 下载文件
     * @param file 文件对象
     */
    downloadFile(file) {
      this.getBase64Url(file.buctetKey, file.bucket, file.name);
    },
    /**
     * 获取base64文件流
     * @param fileUrl 对象存储路径
     * @param bucket 捅名
     */
    getBase64Url(fileUrl, bucket, fileName) {
      let params = {
        servicecode: "AS_ICMS_JK_GETBASE",
        fileKey: fileUrl,
        bucket: bucket,
      };
      this.$http
        .invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200" && res.data) {
            this.downloadBase64(res.data.filebase64Str, fileName);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     * 将base64文件下载到本地
     * @param base64Url base64文件流
     * @param fileName 文件名称
     */
    downloadBase64(base64Url, fileName) {
      let byteCharacters = atob(base64Url);
      let byteNumbers = new Array(byteCharacters.length);
      for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      let byteArray = new Uint8Array(byteNumbers);
      let blob = new Blob([byteArray], { type: "application/octet-stream" });
      if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, fileName);
      } else {
        let link = document.createElement("a");
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(link.href);
      }
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
  }
}
</script>
<style lang="less" scoped>
  .file-container {
    overflow: hidden;
    margin-bottom: 4px;
    .file-name {
      width: calc(100% - 60px);
      margin: 0;
      float: left;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      color: #368ee0;
    }
    .file-btn {
      width: 60px;
      float: left;
    }
  }
</style>
