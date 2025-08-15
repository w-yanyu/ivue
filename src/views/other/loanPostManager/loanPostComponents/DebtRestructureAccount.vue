<template>
  <div>
    <el-collapse v-model="activeNames" class="debt-reapply">
      <el-collapse-item name="1">
        <template slot="title">
          <span>
            <em></em>贷款基本信息
          </span>
        </template>
        <el-form
          ref="debtAccountForm"
          :rules="debtAccountRules"
          :model="debtAccountForm"
          label-width="200px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="债务重组申请单号" prop="reapplyNo">
                <el-input ref="reapplyNo" v-model="debtAccountForm.reapplyNo" @focus="reapplyFocus"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="借据号">
                <el-input v-model="debtAccountForm.customerAccount" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户身份证号">
                <el-input v-model="debtAccountForm.customerId" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号码">
                <el-input v-model="debtAccountForm.mobileNo" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="客户姓名">
                <el-input v-model="debtAccountForm.customerName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="产品名称">
                <el-select v-model="debtAccountForm.productChineseName" :disabled="true" placeholder=" ">
                  <el-option
                    v-for="item in prodCnNameList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="贷款账户状态">
                <el-select v-model="debtAccountForm.accountLoanStatus" :disabled="true" placeholder=" ">
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
                <el-input v-model="debtAccountForm.loanUse" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="贷款额度">
                <el-input v-model="debtAccountForm.loanLimit" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="签订合同附件">
                <el-input v-model="debtAccountForm.signContractAT" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="借记卡号">
                <el-input v-model="debtAccountForm.debitCardNo" :disabled="true"></el-input>
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
              <el-form-item label="贷款状态">
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
              <el-form-item label="减免逾期利息">
                <el-input v-model="debtInfoForm.derateOverdueRecint" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="罚息">
                <el-input v-model="debtInfoForm.accpen" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="减免罚息">
                <el-input v-model="debtInfoForm.derateAccpen" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="逾期违约金">
                <el-input v-model="debtInfoForm.overduePenalty" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="减免逾期违约金">
                <el-input v-model="debtInfoForm.derateOverduePenalty" :disabled="true"></el-input>
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
            <em></em>重组信息
          </span>
        </template>
        <el-form
          ref="debtResForm"
          :rules="debtResRules"
          :model="debtResForm"
          label-width="200px"
          class="custom-common--form"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="债务重组方式">
                <el-select v-model="debtResForm.debtResWay" :disabled="true" placeholder=" ">
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
              <el-form-item label="减免调整类型">
                <el-select v-model="debtResForm.derateType" :disabled="true" placeholder=" ">
                  <el-option
                    v-for="(item, index) in derateTypeList"
                    :key="index"
                    :label="item.dictName"
                    :value="item.dictId">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="重组后本金">
                <el-input v-model="debtResForm.resPrincipal" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="分期期数">
                <el-input v-model="debtResForm.installment" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="重组后利率" prop="rate">
                <el-input v-model="debtResForm.rate" @change="rateChange"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请调整原因">
                <el-select v-model="debtResForm.applyReason" :disabled="true" placeholder=" ">
                  <el-option
                    v-for="item in applyReasonList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item class="require-asterisk" label="附件类型" prop="attachmentType">
                <el-select v-model="debtResForm.attachmentType" multiple @change="addAttachment" placeholder=" ">
                  <el-option
                    v-for="item in attachTypeList"
                    :key="item.dictId"
                    :label="item.dictName"
                    :value="item.dictId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-for="(item, index) in attchmentSelectList" :key="index">
            <el-col :span="12">
              <el-form-item class="require-asterisk" :label="item[0].dictName" :prop="`attachmentMap[${item[0].dictId}]`">
                <el-upload
                  :on-change="attachmentChange.bind(this, item[0].dictId)"
                  :on-remove="attachmentRemove.bind(this, item[0].dictId)"
                  :limit="5"
                  :file-list="attachmentFileMap[item[0].dictId]"
                  :auto-upload="false"
                >
                  <el-button size="small" type="primary">{{$i18ns('选择')}}文件</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="item[1]">
              <el-form-item class="require-asterisk" :label="item[1].dictName" :prop="`attachmentMap[${item[1].dictId}]`">
                <el-upload
                  :on-change="attachmentChange.bind(this, item[1].dictId)"
                  :on-remove="attachmentRemove.bind(this, item[1].dictId)"
                  :limit="5"
                  :file-list="attachmentFileMap[item[1].dictId]"
                  :auto-upload="false"
                >
                  <el-button size="small" type="primary">{{$i18ns('选择')}}文件</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item class="require-asterisk" label="印章申请" prop="sealList">
                <el-upload
                  :on-change="sealChange"
                  :on-remove="sealRemove"
                  :limit="5"
                  :file-list="sealFileList"
                  :auto-upload="false"
                >
                  <el-button size="small" type="primary">{{$i18ns('选择')}}文件</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$i18ns('备注')">
                <el-input type="textarea" resize="none" :rows="4" v-model="debtResForm.remark"></el-input>
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
    <el-dialog
     v-if="isLookupShow"
     title="债务重组申请单号查询"
     :visible.sync="isLookupShow"
     :show-close="true"
     :before-close="handleClose"
     width="1210px">
      <to-json toUrl="/views/other/loanPostManager/debt_restructur_account_lookup.json" :params="{}" @jsonCallBack="reapplyNoSelect"></to-json>
    </el-dialog>
  </div>
</template>
<script>
import {
  debtAccountRules,
  validateHandle,
  debtResRules,
  debtResValidates,
} from "../loanPostConstant/loanPostConstant";
import MyAxios from "pte-ui/utils/MyAxios";
import accounting from "pte-ui/utils/accounting";
import * as _ from "lodash";

export default {
  name: "DebtRestructureAccount",
  data() {
    return {
      activeNames: ["1", "2", "3"],
      debtAccountForm: {
        reapplyNo: "",
        customerAccount: "",
        customerId: "",
        mobileNo: "",
        productChineseName: "",
        accountLoanStatus: "",
        loanUse: "",
        loanLimit: "",
        signContractAT: "",
        debitCardNo: "",
        custid: "",
      },
      debtAccountRules,
      debtInfoForm: {
        overdueAmount: "",
        loanBalance: "",
        loanStatus: "",
        overdueDays: "",
        instalmentNum: "",
        rate: "",
        normalPrincipal: "",
        overduePrincipal: "",
        dullPrincipal: "",
        appliedPrincipal: "",
        accrint: "",
        overdueRecint: "",
        derateOverdueRecint: "",
        accpen: "",
        derateAccpen: "",
        overduePenalty: "",
        derateOverduePenalty: "",
        totalOwed: "",
        totalDerate: "",
      },
      debtResForm: { // 重组信息form
        debtResWay: "",
        derateType: "",
        resPrincipal: "",
        installment: "",
        rate: "",
        applyReason: "",
        reson: "",
        attachmentType: [], // 附件类型
        attachmentMap: {},// 附件上传文件路径对象
        sealList: [], // 印章申请文件对象
        remark: "",
      },
      attachmentFileMap: {}, // 附件上传文件对象
      sealFileList: [], // 印章申请文件对象
      debtResRules,
      isLookupShow: false,
      accountLoanStatusList: [], // 贷款账户状态数据字典集合
      loanStatusList: [], // 贷款形态数据字典集合
      debtRestructureList: [], // 债务重组方式数据字典集合
      derateTypeList: [], // 减免调整类型数据字典集合
      applyReasonList: [], // 申请调整原因数据字典集合
      attachTypeList: [], // 附件上传类型数据字典集合
      attchmentSelectList: [], // 选中附件类型集合
    }
  },
  created() {
    this.validateInit(); // 表单校验初始化
    this.getDictList("E_ACCTST", "accountLoanStatusList"); // 初始化贷款账户状态数据字典
    this.getDictList("E_CLSSST", "loanStatusList"); // 初始化贷款形态数据字典
    this.getDictList("E_DEBTTYPE", "debtRestructureList"); // 初始化贷款账户状态数据字典
    this.getDictList("E_DERATETP", "derateTypeList"); // 初始化减免调整类型数据字典集合
    this.getDictList("E_ADJRS", "applyReasonList"); // 初始化申请调整原因数据字典集合
    this.getDictList("E_ATTACHTP", "attachTypeList"); // 初始化附件上传类型数据字典集合
  },
  methods: {
    /**
     * 印章申请上传表单校验
     * @param rule 校验规则
     * @param value 表单当前值
     * @param callback 回调方法
     */
    sealListValidate(rule, value, callback) {
      if (this.sealFileList.length === 0) {
        return callback(new Error("请上传印章申请文件"));
      }
      return callback();
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
          if (dictType === "E_ATTACHTP") {
            this.attachTypeList.forEach(item => {
              this.attachmentFileMap[item.dictId] = [];
              this.debtResForm.attachmentMap[item.dictId] = [];
              this.debtResRules.attachmentMap[item.dictId] = [
                { validator: this.attchFileValidate.bind(this, item.dictId), trigger: 'blur' }
              ]
            })
          }
        }
      })
      .catch(err => {
        console.error(err);
      });
    },
    // 表单校验处理
    validateInit() {
      debtResValidates.forEach(item => {
        this.debtResRules[item.prop].push({ validator: this[item.validator], trigger: 'blur' });
      });
    },
    // 打开选择带回弹窗
    reapplyFocus() {
      this.isLookupShow = true;
    },
    // 弹窗关闭回调
    handleClose() {
      this.$refs.reapplyNo.$el.blur();
      this.isLookupShow = false;
    },
    /**
     * 选择带回回调
     * @param item 带回数据
     */
    reapplyNoSelect(item) {
      this.isLookupShow = false;
      // 贷款基本信息填充
      this.debtAccountForm.reapplyNo = item.applid;
      this.debtAccountForm.customerAccount = item.idtfno;
      this.debtAccountForm.customerId = item.idtfno;
      this.debtAccountForm.mobileNo = item.mobileNo;
      this.debtAccountForm.customerName = item.custna;
      this.debtAccountForm.productChineseName = item.productChineseName;
      this.debtAccountForm.accountLoanStatus = item.accountLoanStatus;
      this.debtAccountForm.loanUse = item.loanUse;
      this.debtAccountForm.loanLimit = item.loanLimit;
      this.debtAccountForm.signContractAT = item.signContractAT;
      this.debtAccountForm.debitCardNo = item.debitCardNo;
      this.debtAccountForm.custid = item.custid;
      // 欠款信息填充
      this.debtInfoForm.overdueAmount = item.overdueAmount;
      this.debtInfoForm.loanBalance = item.loanBalance;
      this.debtInfoForm.loanStatus = item.loanStatus;
      this.debtInfoForm.overdueDays = item.overdueDays;
      this.debtInfoForm.instalmentNum = item.instalmentNum;
      this.debtInfoForm.rate = item.rate;
      this.debtInfoForm.normalPrincipal = item.normalPrincipal;
      this.debtInfoForm.overduePrincipal = item.overduePrincipal;
      this.debtInfoForm.dullPrincipal = item.dullPrincipal;
      this.debtInfoForm.appliedPrincipal = item.appliedPrincipal;
      this.debtInfoForm.accrint = item.accrint;
      this.debtInfoForm.overdueRecint = item.overdueRecint;
      this.debtInfoForm.derateOverdueRecint = item.derateOverdueRecint;
      this.debtInfoForm.accpen = item.accpen;
      this.debtInfoForm.derateAccpen = item.derateAccpen;
      this.debtInfoForm.overduePenalty = item.overduePenalty;
      this.debtInfoForm.derateOverduePenalty = item.derateOverduePenalty;
      this.debtInfoForm.totalOwed = item.totalOwed;
      this.debtInfoForm.totalDerate = item.totalDerate;
      // 重组方式信息填充
      this.debtResForm.debtResWay = item.debtRestructure;
      this.debtResForm.derateType = Number(item.totalDerate) === 0 ? "3" : "1";
      this.debtResForm.resPrincipal = String((item.totalOwed * 100 - item.totalDerate * 100) / 100);
      this.debtResForm.installment = item.instalment;
      this.debtResForm.rate = item.rate;
      this.debtResForm.applyReason = item.applyReason;
    },
    rateChange(val) {
      this.debtResForm.rate = accounting.unformat(val);
      this.debtResForm.rate = Number(this.debtResForm.rate).toFixed(6);
    },
    /**
     * 附件添加文件回调
     * @param prop 附件类型
     * @param file 当前添加文件对象
     * @param fileList 已添加文件
     */
    attachmentChange(prop, file, fileList) {
      this.attachmentFileMap[prop] = fileList;
      const isLt8M = file.size / 1024 / 1024 < 20;
      if (!isLt8M) {
        this.attachmentFileMap[prop].splice(fileList.indexOf(file), 1);
        this.$message({
          type: "warning",
          message: "印章文件大小大于20MB"
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
            this.debtResForm.attachmentMap[prop].push(res.data.path);
            if (fileList.length === 1) {
              this.$refs.debtResForm.validateField(`attachmentMap[${prop}]`);
            }
          } else {
            this.attachmentFileMap[prop].splice(fileList.indexOf(file), 1);
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
     * 附件移除文件回调
     * @param prop 附件类型
     * @param file 当前添加文件对象
     * @param fileList 已添加文件
     */
    attachmentRemove(prop, file, fileList) {
      let index = null;
      this.attachmentFileMap[prop].forEach((item, key) => {
        if (item.uid === file.uid) {
          index = key;
          return false;
        }
      });
      this.debtResForm.attachmentMap[prop].splice(index, 1);
      this.attachmentFileMap[prop].splice(index, 1);
      if (fileList.length === 0) {
        this.$refs.debtResForm.validateField(`attachmentMap[${prop}]`);
      }
    },
    // 添加附件上传类型
    addAttachment() {
      let list = [];
      this.attachTypeList.forEach(item => {
        this.debtResForm.attachmentType.indexOf(item.dictId) > -1 && list.push(item);
      });
      this.attchmentSelectList = [];
      let max = Math.ceil(list.length / 2);
      for (let i = 0; i < max;i++) {
        if (i === max - 1 && list.length % 2 === 1) {
          this.attchmentSelectList.push([list[2 * i]]);
        } else {
          this.attchmentSelectList.push([list[2 * i], list[2 * i + 1]]);
        }
      }
    },
    /**
     * 附件文件表单校验
     * @param arguments[0] 附件类型
     * @param arguments[1] value 表单当前值
     * @param arguments[2] rule 校验规则
     * @param arguments[3] callback 回调方法
     */
    attchFileValidate(rule, value, callback) {
      if (this.attachmentFileMap[arguments[0]].length === 0) {
        return arguments[3](new Error("请上传附件"));
      }
      return arguments[3]();
    },
    /**
     * 印章申请添加文件回调
     * @param file 当前添加文件对象
     * @param fileList 已添加文件
     */
    sealChange(file, fileList) {
      this.sealFileList = fileList;
      const isLt8M = file.size / 1024 / 1024 < 20;
      if (!isLt8M) {
        this.sealFileList.splice(fileList.indexOf(file), 1);
        this.$message({
          type: "warning",
          message: "印章文件大小大于20MB"
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
            this.debtResForm.sealList.push(res.data.path);
            if (fileList.length === 1) {
              this.$refs.debtResForm.validateField("sealList");
            }
          } else {
            this.sealFileList.splice(fileList.indexOf(file), 1);
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
     * 印章申请移除文件回调
     * @param file 当前移除文件对象
     * @param fileList 已添加文件
     */
    sealRemove(file, fileList) {
      let index = null;
      this.sealFileList.forEach((item, key) => {
        if (item.uid === file.uid) {
          index = key;
          return false;
        }
      });
      this.debtResForm.sealList.splice(index, 1);
      this.sealFileList.splice(index, 1);
      if (fileList.length === 0) {
        this.$refs.debtResForm.validateField("sealList");
      }
    },
    submit() {
      let validateList = [];
      const formList = ["debtAccountForm", "debtResForm"];
      formList.forEach(item => {
        validateList.push(validateHandle(item, this));
      });
      Promise.all(validateList).then(res => {
        let params = {
          servicecode: "PLMSKGTS0062",
          reapplyNo: this.debtAccountForm.reapplyNo,
          customerAccount: this.debtAccountForm.lncfno,
          customerId: this.debtAccountForm.idtfno,
          mobileNo: this.debtAccountForm.mobileNo,
          custna: this.debtAccountForm.customerName,
          productChineseName: this.debtAccountForm.productChineseName,
          accountLoanStatus: this.debtAccountForm.accountLoanStatus,
          loanUse: this.debtAccountForm.loanUse,
          loanLimit: this.debtAccountForm.loanLimit,
          signContractAT: this.debtAccountForm.signContractAT,
          debitCardNo: this.debtAccountForm.debitCardNo,
          custid: this.debtAccountForm.custid,
          overdueAmount: this.debtInfoForm.overdueAmount,
          loanBalance: this.debtInfoForm.loanBalance,
          loanStatus: this.debtInfoForm.loanStatus,
          overdueDays: this.debtInfoForm.overdueDays,
          instalmentNum: this.debtInfoForm.instalmentNum,
          rate: this.debtInfoForm.rate,
          normalPrincipal: this.debtInfoForm.normalPrincipal,
          overduePrincipal: this.debtInfoForm.overduePrincipal,
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
          debtRestructure: this.debtResForm.debtResWay,
          derateType: this.debtResForm.derateType,
          resPrincipal: this.debtResForm.resPrincipal,
          instalment: this.debtResForm.installment,
          debtRate: this.debtResForm.rate,
          applyReason: this.debtResForm.applyReason,
          attachment: _.cloneDeep(this.debtResForm.attachmentMap),
          sealList: this.debtResForm.sealList.join(),
          remark: this.debtResForm.remark,
          idtftp: "101",
          lncatp: "ZWCZKH",
        }
        for (let i in params.attachment) {
          params.attachment[i] = params.attachment[i].join();
        }
        params.attachment = JSON.stringify(params.attachment);
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
  }
}
</script>
<style lang="less" scoped>
  .debt-reapply {
    padding: 20px;
  }
  .attachment-upload {
    min-height: 200px;
  }
</style>
