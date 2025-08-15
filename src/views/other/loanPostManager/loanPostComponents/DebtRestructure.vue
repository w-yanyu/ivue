<template>
  <div>
    <el-collapse v-model="activeNames" class="debt-container">
      <el-collapse-item name="1">
        <template slot="title">
          <span>
            <em></em>贷款基本信息
          </span>
        </template>
        <el-form
          ref="basicForm"
          :rules="basicRules"
          :model="basicForm"
          label-width="200px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="借据号" prop="customerAccount">
                <el-input v-model="basicForm.customerAccount" @blur="customerAccountBlur"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户身份证号" prop="customerId">
                <el-input v-model="basicForm.customerId" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号码" ppprop="mobileNo">
                <el-input v-model="basicForm.mobileNo" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户姓名" prop="customerName">
                <el-input v-model="basicForm.customerName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="产品名称" prop="productChineseName">
                <el-input v-model="basicForm.productChineseName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="贷款账户状态">
                <el-select v-model="basicForm.accountLoanStatus" :disabled="true" placeholder=" ">
                  <el-option
                    v-for="(item, index) in accountLoanStatusList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="贷款用途">
                <el-input v-model="basicForm.loanUse" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="贷款额度">
                <el-input v-model="basicForm.loanLimit" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="签订合同附件">
                <el-input v-model="basicForm.signContractAT" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="借记卡号">
                <el-input v-model="basicForm.debitCardNo" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <span>
            <em></em>欠款信息
          </span>
        </template>
        <el-form
          ref="debtInfoForm"
          :rules="debtInfoRules"
          :model="debtInfoForm"
          label-width="200px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="逾期金额">
                <el-input v-model="debtInfoForm.overdueAmount" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="贷款余额">
                <el-input v-model="debtInfoForm.loanBalance" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="贷款形态">
                <el-select v-model="debtInfoForm.loanStatus" :disabled="true" placeholder=" ">
                  <el-option
                    v-for="(item, index) in loanStatusList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="逾期天数">
                <el-input v-model="debtInfoForm.overdueDays" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="分期期数">
                <el-input v-model="debtInfoForm.instalmentNum" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="利率">
                <el-input v-model="debtInfoForm.rate" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="正常本金">
                <el-input v-model="debtInfoForm.normalPrincipal" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="逾期本金">
                <el-input v-model="debtInfoForm.overduePrincipal" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="呆滞本金">
                <el-input v-model="debtInfoForm.dullPrincipal" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="核销本金">
                <el-input v-model="debtInfoForm.appliedPrincipal" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="正常应计利息">
                <el-input v-model="debtInfoForm.accrint" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="逾期利息">
                <el-input v-model="debtInfoForm.overdueRecint" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="减免逾期利息" prop="derateOverdueRecint">
                <el-input v-model="debtInfoForm.derateOverdueRecint" @input="val => derateChange(val, 'derateOverdueRecint')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="罚息">
                <el-input v-model="debtInfoForm.accpen" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="减免罚息" prop="derateAccpen">
                <el-input v-model="debtInfoForm.derateAccpen" @input="val => derateChange(val, 'derateAccpen')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="逾期违约金">
                <el-input v-model="debtInfoForm.overduePenalty" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="减免逾期违约金" prop="derateOverduePenalty">
                <el-input v-model="debtInfoForm.derateOverduePenalty" @input="val => derateChange(val, 'derateOverduePenalty')"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所欠合计">
                <el-input v-model="debtInfoForm.totalOwed" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="减免合计">
                <el-input v-model="debtInfoForm.totalDerate" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="3">
        <template slot="title">
          <span>
            <em></em>申请信息
          </span>
        </template>
        <el-form
          ref="applyForm"
          :rules="debtApplyRules"
          :model="applyForm"
          label-width="200px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="债务重组方式" prop="debtRestructure">
                <el-select v-model="applyForm.debtRestructure">
                <el-option
                  v-for="(item, index) in debtRestructureList"
                  :key="index"
                  :label="item.dictName"
                  :value="item.dictId">
                </el-option>
              </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="分期期数" prop="instalment">
                <el-input v-model="applyForm.instalment"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="申请调整原因" prop="applyReason">
                <el-select v-model="applyForm.applyReason">
                  <el-option
                    v-for="(item, index) in applyReasonList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item class="require-asterisk" label="附件信息" prop="attachmentList">
                <el-upload
                  :on-change="attachmentChange"
                  :on-remove="attachmentRemove"
                  :limit="5"
                  :file-list="attachmentFileList"
                  :auto-upload="false"
                >
                  <el-button size="small" type="primary" v-show="attachmentFileList.length < 5">{{$i18ns('选择')}}文件</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$i18ns('备注')">
                <el-input type="textarea" resize="none" :rows="4" v-model="applyForm.remark"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <div class="custom-common--footer">
      <el-button type="primary" size="small" @click="submit" plain>提交</el-button>
      <el-button size="small">{{$i18ns('取消')}}</el-button>
    </div>
  </div>
</template>

<script>
import {
  basicRules,
  debtInfoRules,
  debtInfoValidates,
  debtApplyRules,
  debtApplyValidates,
  validateHandle,
} from "../loanPostConstant/loanPostConstant";
import MyAxios from "pte-ui/utils/MyAxios";
import accounting from "pte-ui/utils/accounting";

export default {
  name: "DebtRestructure",
  data() {
    return {
      activeNames: ["1", "2", "3"],
      basicForm: { // 基础信息表单对象
        customerAccount: "",
        customerId: "",
        mobileNo: "",
        customerName: "",
        productChineseName: "",
        accountLoanStatus: "",
        loanUse: "",
        loanLimit: "",
        signContractAT: "",
        debitCardNo: "",
      },
      basicRules, // 基础信息表单校验
      debtInfoForm: {  // 欠款信息表单校验
        overdueAmount: "",
        custid: "",
        loanBalance: "",
        loanStatus: "",
        overdueDays: "",
        instalmentNum: "",
        rate: "",
        normalPrincipal: "",
        overduePrincipal: "",
        dullPrincipal: "",
        appliedPrincipal: "",
        accrint: "", // 测试用的默认值
        overdueRecint: "", // 测试用的默认值
        derateOverdueRecint: "", // 减免逾期利息
        accpen: "", // 测试用的默认值
        derateAccpen: "", // 减免罚息
        overduePenalty: "", // 测试用的默认值
        derateOverduePenalty: "", // 减免逾期违约金
        totalOwed: "",
        totalDerate: "", // 减免合计 = 减免逾期利息 + 减免罚息 + 减免逾期违约金
      },
      debtInfoRules,
      applyForm: {
        debtRestructure: "",
        attachmentList: [], // 附件信息文件路径数组
        instalment: "",
        remark: "",
      },
      debtApplyRules,
      attachmentFileList: [], // 附件信息文件数组
      compareCustomerAccount: null, // 借据号对比字段
      accountLoanStatusList: [], // 贷款账户状态数据字典集合
      loanStatusList: [], // 贷款形态数据字典集合
      debtRestructureList: [], // 债务重组方式数据字典集合
      applyReasonList: [], // 申请调整原因数据字典集合
    };
  },
  created() {
    this.validateInit(); // 表单校验初始化
    this.getDictList("E_ACCTST", "accountLoanStatusList"); // 初始化贷款账户状态数据字典
    this.getDictList("E_CLSSST", "loanStatusList"); // 初始化贷款形态数据字典
    this.getDictList("E_DEBTTYPE", "debtRestructureList"); // 初始化贷款账户状态数据字典
    this.getDictList("E_ADJRS", "applyReasonList"); // 初始化申请调整原因数据字典集合
  },
  methods: {
    // 表单校验处理
    validateInit() {
      debtInfoValidates.forEach(item => {
        this.debtInfoRules[item.prop].push({ validator: this[item.validator], trigger: 'blur' });
      });
      debtApplyValidates.forEach(item => {
        this.debtApplyRules[item.prop].push({ validator: this[item.validator], trigger: 'blur' });
      });
    },
    /**
     * 附件信息上传表单校验
     * @param value 表单当前值
     * @param rule 校验规则
     * @param callback 回调方法
     */
    derateOverdueRecintValidate(rule, value, callback) {
      if (Number(this.debtInfoForm.overdueRecint) < Number(value)) {
        return callback(new Error("减免逾期应计利息不能大于逾期应计利息"));
      }
      return callback();
    },
    derateAccpenValidate(rule, value, callback) {
      if (Number(this.debtInfoForm.accpen) < Number(value)) {
        return callback(new Error("减免罚息不能大于罚息"));
      }
      return callback();
    },
    derateOverduePenaltyValidate(rule, value, callback) {
      if (Number(this.debtInfoForm.overduePenalty) < Number(value)) {
        return callback(new Error("减免逾期违约金不能大于逾期违约金"));
      }
      return callback();
    },
    attachmentValidate(rule, value, callback) {
      if (this.applyForm.attachmentList.length === 0) {
        return callback(new Error("请上传附件信息"));
      }
      return callback();
    },
    /**
     * 公共求和方法
     * @param numList Array[String]
     */
    calculateSum(numList) {
      numList = numList.map(item => {
        if (!isNaN(Number(item))) {
          return Number(item);
        }
        return 0;
      })
      return String(this.$math.sum(this.$math.bignumber(numList)));
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
    // 借据号失焦回调
    customerAccountBlur() {
      if (!this.basicForm.customerAccount || this.compareCustomerAccount === this.basicForm.customerAccount) {
        return false;
      }
      this.compareCustomerAccount = this.basicForm.customerAccount; // 记录借据号
      this.getBasciInfo(); // 基础信息带回
      this.getDebtInfo(); // 贷款信息带回
    },
    // 获取基础信息
    getBasciInfo() {
      // 清空历史数据
      if (this.compareCustomerAccount) {
        this.basicForm.customerId = "";
        this.basicForm.mobileNo = "";
        this.basicForm.customerName = "";
        this.basicForm.productChineseName = "";
        this.basicForm.accountLoanStatus = "";
        this.basicForm.loanUse = "";
        this.basicForm.loanLimit = "";
        this.basicForm.signContractAT = "";
        this.basicForm.debitCardNo = "";
      }
      let params = {
        servicecode: "PLMSKGSS0090",
        lncfno: this.basicForm.customerAccount,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then(res => {
        if (res && res.code === "200" && res.data) {
          const response = res.data;
          this.basicForm.customerId = response.idtfno; // 客户身份证号
          this.basicForm.mobileNo = response.phoneno; // 手机号码
          this.basicForm.customerName = response.acctna; // 客户姓名
          this.basicForm.productChineseName = response.prodna; // 产品名称
          this.basicForm.accountLoanStatus = response.acctst; // 贷款账户状态
          this.basicForm.loanUse = response.loanpurpose; // 贷款用途
          this.basicForm.loanLimit = response.crdtam; // 贷款额度
          this.basicForm.signContractAT = response.signcontractat; // 签订合同附件
          this.basicForm.debitCardNo = response.cardno; // 借记卡号
        }
      })
      .catch(err => {
        console.error(err);
      })
    },
    // 获取欠款信息
    getDebtInfo() {
      // 清除历史数据
      if (this.compareCustomerAccount) {
        this.debtInfoForm.custid = "";
        this.debtInfoForm.loanBalance = "";
        this.debtInfoForm.loanStatus = "";
        this.debtInfoForm.overdueDays = "";
        this.debtInfoForm.instalmentNum = "";
        this.debtInfoForm.rate = "";
        this.debtInfoForm.normalPrincipal = "";
        this.debtInfoForm.overduePrincipal = "";
        this.debtInfoForm.dullPrincipal = "";
        this.debtInfoForm.appliedPrincipal = "";
        this.debtInfoForm.accrint = "";
        this.debtInfoForm.overdueRecint = "";
        this.debtInfoForm.accpen = "";
        this.debtInfoForm.overdueAmount = "";
        this.debtInfoForm.overduePenalty = "";
        this.debtInfoForm.totalOwed = "";
      }
      let params = {
        servicecode: "qrdtln",
        lncfno: this.basicForm.customerAccount,
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
      .then(res => {
        if (res && res.code === "200" && res.data) {
          const response = res.data;
          this.debtInfoForm.custid = response.custno;
          let loanBalanceSum = [response.lnnpbl, response.lnopbl, response.lndpbl, response.hxxxpr];
          this.debtInfoForm.loanBalance = this.calculateSum(loanBalanceSum); // 贷款余额 = 正常本金+逾期本金+呆滞本金+核销本金
          this.debtInfoForm.loanStatus = response.clssst; // 贷款形态
          this.debtInfoForm.overdueDays = response.overdate; // 逾期天数
          this.debtInfoForm.instalmentNum = response.tophno; // 分期期数
          this.debtInfoForm.rate = response.lnrtir; // 利率
          this.debtInfoForm.normalPrincipal = response.lnnpbl; // 正常本金
          this.debtInfoForm.overduePrincipal = response.lnopbl; // 逾期本金
          this.debtInfoForm.dullPrincipal = response.lndpbl; // 呆滞本金
          this.debtInfoForm.appliedPrincipal = response.hxxxpr; // 核销本金
          let accrintSum = [response.ysyjni, response.csyjni];
          this.debtInfoForm.accrint = this.calculateSum(accrintSum); // 正常应计利息 = 应收应计利息 + 催收应计利息
          let overdueRecintSum = [response.ysxxoi, response.csxxoi];
          this.debtInfoForm.overdueRecint = this.calculateSum(overdueRecintSum); // 逾期利息 = 应收欠息 + 催收欠息 + 逾期应计利息
          let accpenSum = [response.ysyjpi, response.ysxxpi, response.csyjpi, response.csxxpi];
          this.debtInfoForm.accpen = this.calculateSum(accpenSum); // 罚息 = 应收应计罚息 + 应收罚息 + 催收应计罚息 + 催收罚息
          let overdueAmountSum = [
            response.lnopbl,
            response.lndpbl,
            response.hxxxpr,
            this.debtInfoForm.overdueRecint,
            this.debtInfoForm.accpen,
            response.ysxxfe,
          ];
          this.debtInfoForm.overdueAmount = this.calculateSum(overdueAmountSum); // 逾期金额 = 逾期本金+呆滞本金+核销本金+逾期利息+罚息+逾期违约金
          this.debtInfoForm.overduePenalty = response.ysxxfe; // 逾期违约金
          let totalOwedSum = [
            response.lnnpbl,
            response.lnopbl,
            response.lndpbl,
            response.hxxxpr,
            this.debtInfoForm.accrint,
            this.debtInfoForm.overdueRecint,
            this.debtInfoForm.accpen,
            response.ysxxfe,
          ]
          this.debtInfoForm.totalOwed = this.calculateSum(totalOwedSum); // 所欠合计 = 正常本金 + 逾期本金 + 呆滞本金 + 核销本金 + 正常应计利息 + 逾期利息 + 罚息 + 逾期违约金
        }
      }).catch(err => {
        console.error(err);
      })
    },
    // 减免输入changge回调
    derateChange() {
      this.debtInfoForm[arguments[1]] = accounting.unformat(arguments[0]);
      let totalDerateSum = [
        this.debtInfoForm.derateOverdueRecint,
        this.debtInfoForm.derateAccpen,
        this.debtInfoForm.derateOverduePenalty,
      ];
      this.debtInfoForm.totalDerate = this.calculateSum(totalDerateSum);
    },
    /**
     * 文件清单change回调
     * @param file 当前文件对象
     * @param fileList 文件清单
     */
    attachmentChange(file, fileList) {
      this.attachmentFileList = fileList;
      const isLt8M = file.size / 1024 / 1024 < 20;
      let userInfo = JSON.parse(localStorage.getItem("user_info"));
      if (!isLt8M) {
        this.attachmentFileList.splice(fileList.indexOf(file), 1);
        this.$message({
          type: "warning",
          message: "凭证文件大于20M"
        })
      } else {
        let formData = new FormData();
        formData.append("file", file.raw);
      formData.append("org_id", userInfo.org_id);
        formData.append("path", "PD");
        MyAxios.invokeAPI("/SUMP/icmcall/file", "post", formData)
        .then(res => {
          if (res && res.code === "200" && res.data && res.data.path) {
            file.status = "success";
            this.applyForm.attachmentList.push(res.data.path);
            if (fileList.length === 1) {
              this.$refs.applyForm.validateField("attachmentList");
            }
          } else {
            this.attachmentFileList.splice(fileList.indexOf(file), 1);
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
    attachmentRemove(file, fileList) {
      let index = null;
      this.attachmentFileList.forEach((item, key) => {
        if (item.uid === file.uid) {
          index = key;
          return false;
        }
      });
      this.applyForm.attachmentList.splice(index, 1);
      this.attachmentFileList.splice(index, 1);
      if (fileList.length === 0) {
        this.$refs.applyForm.validateField("attachmentList");
      }
    },
    // 表单提交
    submit() {
      let validateList = [];
      const formList = ["basicForm", "debtInfoForm", "applyForm"];
      formList.forEach(item => {
        validateList.push(validateHandle(item, this));
      });
      Promise.all(validateList).then(res => {
        let params = {
          servicecode: "PLMSKGTS0060",
          lncfno: this.basicForm.customerAccount,
          idtfno: this.basicForm.customerId,
          mobileNo: this.basicForm.mobileNo,
          custna: this.basicForm.customerName,
          productChineseName: this.basicForm.productChineseName,
          accountLoanStatus: this.basicForm.accountLoanStatus,
          loanUse: this.basicForm.loanUse,
          loanLimit: this.basicForm.loanLimit,
          signContractAT: this.basicForm.signContractAT,
          debitCardNo: this.basicForm.debitCardNo,
          overdueAmount: this.debtInfoForm.overdueAmount,
          loanBalance: this.debtInfoForm.loanBalance,
          loanStatus: this.debtInfoForm.loanStatus,
          overdueDays: this.debtInfoForm.overdueDays,
          instalmentNum: this.debtInfoForm.instalmentNum,
          rate: this.debtInfoForm.rate,
          normalPrincipal: this.debtInfoForm.normalPrincipal,
          overduePrincipal: this.debtInfoForm.overduePrincipal,
          dullPrincipal: this.debtInfoForm.dullPrincipal,
          appliedPrincipal: this.debtInfoForm.appliedPrincipal,
          accrint: this.debtInfoForm.accrint,
          overdueRecint: this.debtInfoForm.overdueRecint,
          derateOverdueRecint: this.debtInfoForm.derateOverdueRecint,
          accpen: this.debtInfoForm.accpen,
          derateAccpen: this.debtInfoForm.derateAccpen,
          overduePenalty: this.debtInfoForm.overduePenalty,
          derateOverduePenalty: this.debtInfoForm.derateOverduePenalty,
          totalOwed: this.debtInfoForm.totalOwed,
          totalDerate: this.debtInfoForm.totalDerate,
          debtRestructure: this.applyForm.debtRestructure,
          instalment: this.applyForm.instalment,
          attachmentList: this.applyForm.attachmentList.join(),
          remark: this.applyForm.remark,
          custid: this.debtInfoForm.custid,
          applyReason: thisapplyForm.applyReason,
          idtftp: "101",
          lncatp: "ZWCZSQ",
        }
        MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            this.$message({
              type: "success",
              message: res.message
            })
          }
        })
        .catch(err => {
          console.error(err);
        })
      }).catch(err => {
        this.$message({
          type: "warning",
          message: "校验不通过"
        })
      })
    }
  },
};
</script>
<style lang="less" scoped>
.debt-container {
  padding: 20px;
}
</style>
