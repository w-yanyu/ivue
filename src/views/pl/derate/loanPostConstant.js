export const basicRules = {
  customerAccount: [
    { required: true, message: "请输入借据号" }
  ],
  customerId: [
    { required: false, message: "请输入客户身份证号" }
  ],
  mobileNo: [
    { required: false, message: "请输入手机号码" }
  ],
  customerName: [
    { required: false, message: "请输入客户姓名" }
  ],
  productChineseName: [
    { required: false, message: "请输入产品名称" }
  ],
  htfjUploadList: [],
}

export const applyRules = {
  applyUse: [
    { required: true, message: "请输入款项用途" }
  ],
  ticketList: [],
  ticketSum: [
    { required: true, message: "" }
  ],
  credentialList: [],
}

export const voucherRules = {
  voucherAnalogue: [
    { required: true, message: "请输入贷款用途凭证交易对手方" }
  ],
  aaumUploadList: [],
  zuozhengUploadList: [],
}

/**
 * 多个表单校验处理
 * @param formName 表单名称
 * @param that this
 */
export function validateHandle(formName, that) {
  const promise = new Promise((resolve, reject) => {
    that.$refs[formName].validate(valid => {
      console.log("-------"+valid);
      valid ? resolve(true) : reject(false);
    });
  });
  return promise;
}

export const cities = [
  { label: "全部城市", value: 1 },
  { label: "上海市", value: 2 },
  { label: "深圳市", value: 3 },
  { label: "武汉市", value: 4 },
];

export const cityRules = {
  city: [],
}

export const cityValidates = [
  { prop: "city", validator: "cityValidate" },
]

export const subCollDataRules = {
  bizPermitList: [],
  corpIdList: [],
  aaumConfirmList: [],
  lawsuitsList: [],
  subRiskList: [],
  ssProofList: [],
  attendantInfoList: [],
  officePicList: [],
  organAgList: [],
  cashDepList: [],
  honestProList: [],
  collectionProList: [],
}

export const subCollValidates = [
  { prop: "bizPermitList", validator: "bizPermitValidate" },
  { prop: "corpIdList", validator: "corpIdValidate" },
  { prop: "aaumConfirmList", validator: "aaumConfirmValidate" },
  { prop: "lawsuitsList", validator: "lawsuitsValidate" },
  { prop: "subRiskList", validator: "subRiskValidate" },
  { prop: "ssProofList", validator: "ssProofValidate" },
  { prop: "attendantInfoList", validator: "attendantInfoValidate" },
  { prop: "officePicList", validator: "officePicValidate" },
  { prop: "organAgList", validator: "organAgValidate" },
  { prop: "cashDepList", validator: "cashDepValidate" },
  { prop: "honestProList", validator: "honestProValidate" },
  { prop: "collectionProList", validator: "collectionProValidate" },
]

export const accountInfoRules = {
  accountNum: [{ required: true, message: "请输入收款账户账号" }],
  account: [{ required: true, message: "请输入开户行" }],
  accountName: [{ required: true, message: "请输入收款账户名称" }],
  accountNo: [{ required: true, message: "请输入开户行行号" }],
}

// 债务重组申请
export const debtInfoRules = {
  derateOverdueRecint: [{ required: true, message: "请输入减免逾期应计利息" }],
  derateAccpen: [{ required: true, message: "请输入减免罚息" }],
  derateOverduePenalty: [{ required: true, message: "请输入减免逾期违约金" }],
}

export const debtInfoValidates = [
  { prop: "derateOverdueRecint", validator: "derateOverdueRecintValidate" },
  { prop: "derateAccpen", validator: "derateAccpenValidate" },
  { prop: "derateOverduePenalty", validator: "derateOverduePenaltyValidate" }
]

export const debtApplyRules = {
  debtRestructure: [{ required: true, message: "请选择债务重组方式" }],
  applyReason: [{ required: true, message: "请选择申请调整原因" }],
  attachmentList: [],
  instalment: [{ required: true, message: "请输入分期期数" }],
}

export const debtApplyValidates = [
  { prop: "attachmentList", validator: "attachmentValidate" },
]

export const debtAccountRules = {
  reapplyNo: [{ required: true, message: "请选择债务重组申请单号" }]
}

// 债务重组开户 重组信息模块表单rules
export const debtResRules = {
  rate: [{ required: true, message: "请输入重组后利率" }],
  attachmentType: [{ required: true, message: "请选择附件上传类型" }],
  attachmentMap: {},
  sealList: [],
}

// 债务重组开户 重组信息 重组信息模块表单校验配置 
export const debtResValidates = [
  { prop: "sealList", validator: "sealListValidate" },
]
