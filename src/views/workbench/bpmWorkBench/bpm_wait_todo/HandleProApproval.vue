<template>
  <div class="data-check--container">
    <div class="data-check--left">
      <el-row class="check-left--top">
        <el-col class="check-left--col dc-header--left">
          <el-menu class="dc-menu dc-left--menu" mode="horizontal" @select="relevantSelect">
            <el-submenu index="1">
              <template slot="title">相关资料查询</template>
              <el-menu-item :index="index" v-for="(item, index) in relevantList" :key="index">{{item}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
        <el-col class="check-left--col dc-header--center">您已耗时：{{this.countResult}}</el-col>
        <el-col class="dc-header--right">综合信用贷{{ruleForm.applid}}</el-col>
      </el-row>
      <el-collapse v-model="activeNames" class="data-check--collapse">
        <el-form ref="ruleForm" :model="ruleForm" label-width="160px" class="custom-common--form">
          <el-collapse-item name="1">
            <template slot="title">
              <span>
                <em></em>贷款基本信息
              </span>
            </template>
            <el-row>
              <el-col :span="12">
                <el-form-item label="产品名称">
                  <el-input v-model="ruleForm.loanInfo.prodCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="进件编号">
                  <el-input v-model="ruleForm.applid" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="区域中心(一级)">
                  <el-input v-model="ruleForm.loanInfo.firstLevelAreaCenterName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="区域中心(二级)">
                  <el-input v-model="ruleForm.loanInfo.secondLevelAreaCenterName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="区域中心(三级)">
                  <el-input v-model="ruleForm.loanInfo.thirdLevelAreaCenterName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="合作机构(一级)">
                  <el-input v-model="ruleForm.loanInfo.firstLevelCooperateOrgName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="合作机构(二级)">
                  <el-input v-model="ruleForm.loanInfo.secondLevelCooperateOrgName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="合作机构(三级)">
                  <el-input v-model="ruleForm.loanInfo.thirdLevelCooperateOrgName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客户经理编码">
                  <el-input v-model="ruleForm.loanInfo.accountManagerCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客户经理名称">
                  <el-input v-model="ruleForm.loanInfo.accountManagerName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客户经理联系方式">
                  <el-input v-model="ruleForm.loanInfo.accountManagerTel" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="进件方式">
                  <el-select v-model="ruleForm.loanInfo.applyType" :disabled="true">
                    <el-option
                      v-for="(item, i) in applyTypeList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="客群类别">
                  <el-select v-model="ruleForm.loanInfo.custGroupType" :disabled="true">
                    <el-option
                      v-for="(item, i) in custGroupTypeList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="风险级别">
                  <el-select v-model="ruleForm.loanInfo.riskLevel" :disabled="true">
                    <el-option
                      v-for="(item, i) in riskLevelList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="申请贷款金额">
                  <el-input v-model="ruleForm.loanInfo.applyAmt" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="贷款期数">
                  <el-input v-model="ruleForm.loanInfo.applyPeriod" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="贷款用途">
                  <el-select v-model="ruleForm.loanInfo.purpose" :disabled="true">
                    <el-option
                      v-for="(item, i) in purposeList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="利率方案">
                  <el-select v-model="ruleForm.loanInfo.intrestType" :disabled="true">
                    <el-option
                      v-for="(item, i) in intrestTypeList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="还款方式">
                  <el-select v-model="ruleForm.loanInfo.repayType" :disabled="true">
                    <el-option
                      v-for="(item, i) in repayTypeList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="支付方式">
                  <el-select v-model="ruleForm.loanInfo.payMode" :disabled="true">
                    <el-option
                      v-for="(item, i) in payModeList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-show="ruleForm.loanInfo.payMode === '2'">
                <el-form-item label="委托支付户名">
                  <el-input v-model="ruleForm.loanInfo.entrustedAcctName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-show="ruleForm.loanInfo.payMode === '2'">
                <el-form-item label="委托支付账号">
                  <el-input v-model="ruleForm.loanInfo.entrustedAcctNo" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-show="ruleForm.loanInfo.payMode === '2'">
                <el-form-item label="委托支付行号">
                  <el-input v-model="ruleForm.loanInfo.entrustedBankNo" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-show="ruleForm.loanInfo.payMode === '2'">
                <el-form-item label="委托支付开户行">
                  <el-input v-model="ruleForm.loanInfo.entrustedBankName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="自主支付卡类型">
                  <el-select v-model="ruleForm.loanInfo.typeOfIndepyPaymentCard" :disabled="true">
                    <el-option
                      v-for="(item, i) in typeOfIndepyPaymentCardList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否配偶进件">
                  <el-select v-model="ruleForm.loanInfo.isSpoLoan" :disabled="true">
                    <el-option
                      v-for="(item, i) in flagList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="配偶进件编号">
                  <el-input v-model="ruleForm.loanInfo.spoApplyNum" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="配偶姓名">
                  <el-input v-model="ruleForm.loanInfo.spoName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="配偶申请金额">
                  <el-input v-model="ruleForm.loanInfo.spoApplyAmt" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="收款卡号">
                  <el-input v-model="ruleForm.loanInfo.debitCardNo" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="还款卡号">
                  <el-input v-model="ruleForm.loanInfo.repayCardNo" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="2">
            <template slot="title">
              <span>
                <em></em>个人基本信息
              </span>
            </template>
            <el-row>
              <el-col :span="12">
                <el-form-item label="姓名">
                  <el-input v-model="ruleForm.baseInfo.name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item label="姓名拼音">
                  <el-input v-model="ruleForm.baseInfo.nameSpell" :disabled="true"></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="12">
                <el-form-item label="手机号码">
                  <el-input v-model="ruleForm.baseInfo.mobileNo" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证号">
                  <el-input v-model="ruleForm.baseInfo.certNo" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item label="身份证有效期">
                  <el-input v-model="ruleForm.baseInfo.cardsday" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="身份证起始日期">
                  <el-input v-model="ruleForm.baseInfo.certStartDate " :disabled="true"></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="12">
                <el-form-item label="性别">
                  <el-select v-model="ruleForm.baseInfo.gender" :disabled="true">
                    <el-option
                      v-for="(item, i) in genderList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="婚姻状况">
                  <el-select v-model="ruleForm.baseInfo.marryStatus" :disabled="true">
                    <el-option
                      v-for="(item, i) in marryStatusList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item label="人脸比对结果">
                  <el-select v-model="ruleForm.baseInfo.faceResult" :disabled="true">
                    <el-option
                      v-for="(item, i) in faceResultList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="人脸比对分数">
                  <el-input v-model="ruleForm.baseInfo.faceScore" :disabled="true"></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="12">
                <el-form-item label="电子邮箱">
                  <el-input v-model="ruleForm.baseInfo.email" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="教育程度">
                  <el-select v-model="ruleForm.baseInfo.education" :disabled="true">
                    <el-option
                      v-for="(item, i) in educationList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item label="贷款用途证明交易对手">
                  <el-input v-model="ruleForm.baseInfo.loanPurposeProve" :disabled="true"></el-input>
                </el-form-item>
              </el-col> -->
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template slot="title">
              <span>
                <em></em>住址信息
              </span>
            </template>
            <el-row>
              <el-col :span="12">
                <el-form-item label="住址地址（省份）">
                  <el-input v-model="ruleForm.addressInfo.liveAddProvinceCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="住址地址（城市）">
                  <el-input v-model="ruleForm.addressInfo.liveAddCityCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="住址地址（区县）">
                  <el-input v-model="ruleForm.addressInfo.liveAddAreaCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="住址地址（街道）">
                  <el-input v-model="ruleForm.addressInfo.liveAddStreetCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="住址详细地址">
                  <el-input v-model="ruleForm.addressInfo.liveAddress" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="住址电话(区号)">
                  <el-input v-model="ruleForm.addressInfo.houTelAreaCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="住址电话(电话号码)">
                  <el-input v-model="ruleForm.addressInfo.houTel" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="住址邮编">
                  <el-input v-model="ruleForm.addressInfo.houAddZipCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="住宅性质">
                  <el-select v-model="ruleForm.addressInfo.houType" :disabled="true">
                    <el-option
                      v-for="(item, i) in houTypeList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="居住时间">
                  <el-select v-model="ruleForm.addressInfo.liveDate" :disabled="true">
                    <el-option
                      v-for="(item, i) in flagList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="4">
            <template slot="title">
              <span>
                <em></em>单位信息
              </span>
            </template>
            <el-row>
              <el-col :span="12">
                <el-form-item label="受雇类型">
                  <el-select v-model="ruleForm.companyInfo.employType" :disabled="true">
                    <el-option
                      v-for="(item, i) in employTypeList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位名称">
                  <el-input v-model="ruleForm.companyInfo.empName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="部门">
                  <el-input v-model="ruleForm.companyInfo.department" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工作职级">
                  <el-select v-model="ruleForm.companyInfo.workRankCode" :disabled="true">
                    <el-option
                      v-for="(item, i) in workRankCodeList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位地址(省份)">
                  <el-input v-model="ruleForm.companyInfo.workAddProvinceCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位地址(城市)">
                  <el-input v-model="ruleForm.companyInfo.workAddCityCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位地址(区县)">
                  <el-input v-model="ruleForm.companyInfo.workAddAreaCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位地址(街道)">
                  <el-input v-model="ruleForm.companyInfo.workAddStreet" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位详细地址">
                  <el-input v-model="ruleForm.companyInfo.workAddDetail" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否有单位电话">
                  <el-select v-model="ruleForm.companyInfo.isAvailablCcompanyTel" :disabled="true">
                    <el-option
                      v-for="(item, i) in flagList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位电话(区号)">
                  <el-input v-model="ruleForm.companyInfo.companyTelAreaCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位电话(电话号码)">
                  <el-input v-model="ruleForm.companyInfo.companyTelNo" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位电话(分机号)">
                  <el-input v-model="ruleForm.companyInfo.companyTelExt" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位邮编">
                  <el-input v-model="ruleForm.companyInfo.companyAddressZipCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="现单位入职时间">
                  <el-input v-model="ruleForm.companyInfo.employedDate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="当前年收入（含非工资性收入）">
                  <el-input v-model="ruleForm.companyInfo.currentYearIncome" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否提供工商网信息">
                  <el-select v-model="ruleForm.companyInfo.isSupplyBusinessInfo" :disabled="true">
                    <el-option
                      v-for="(item, i) in flagList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="现单位成立时间">
                  <el-input v-model="ruleForm.companyInfo.companySetupDate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="工作信息备注">
                  <el-input v-model="ruleForm.companyInfo.workInfoRemarks" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="年营业收入">
                  <el-input v-model="ruleForm.companyInfo.yearBusinessIncome" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="行业性质">
                  <el-select v-model="ruleForm.companyInfo.indNature" :disabled="true">
                    <el-option
                      v-for="(item, i) in indNatureList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="单位性质">
                  <el-select v-model="ruleForm.companyInfo.enterpriseNatureCode" :disabled="true">
                    <el-option
                      v-for="(item, i) in enterpriseNatureCodeList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="5">
            <template slot="title">
              <span>
                <em></em>联系人信息
              </span>
            </template>
            <el-row>
              <el-col :span="12">
                <el-form-item label="配偶姓名">
                  <el-input v-model="spoInfo.spoName" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="配偶手机号">
                  <el-input v-model="spoInfo.spoMobile" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="配偶身份证号">
                  <el-input v-model="spoInfo.spoIdNo" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="配偶单位名称">
                  <el-input v-model="spoInfo.spoCompany" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-table
               :data="ruleForm.linkInfoList"
              >
                <el-table-column prop="contactName" label="联系人姓名"></el-table-column>
                <el-table-column prop="contactRelation" label="与本人关系">
                  <template slot-scope="scope">
                    <div>{{contactRelationTranslate(scope.row.contactRelation)}}</div>
                  </template>
                </el-table-column>
                <el-table-column
                 prop="contactMobile"
                 label="联系人手机">
                </el-table-column>
                <el-table-column
                 prop="contactTelAreaCode"
                 label="联系人电话（区号）">
                </el-table-column>
                <el-table-column
                 prop="contactTelNo"
                 width="180"
                 label="联系人电话（电话号码）">
                </el-table-column>
              </el-table>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="6">
            <template slot="title">
              <span>
                <em></em>增信信息-房产-基本信息
              </span>
            </template>
            <el-row>
              <el-col :span="12">
                <el-form-item label="是否有本地房产">
                  <el-select v-model="ruleForm.houseInfo.isBaseHou" :disabled="true">
                    <el-option
                      v-for="(item, i) in flagList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否本人房产">
                  <el-select v-model="ruleForm.houseInfo.isOwnHou" :disabled="true">
                    <el-option
                      v-for="(item, i) in flagList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否有房贷">
                  <el-select v-model="ruleForm.houseInfo.isHouLoan" :disabled="true">
                    <el-option
                      v-for="(item, i) in flagList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="房贷类型">
                  <el-select v-model="ruleForm.houseInfo.houLoanType" :disabled="true">
                    <el-option
                      v-for="(item, i) in houLoanTypeList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="房贷选中贷款编号">
                  <el-input v-model="ruleForm.houseInfo.houLoanNo" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否有未上人行公积金贷款">
                  <el-select v-model="ruleForm.houseInfo.isPbocProvidenFundLoan" :disabled="true">
                    <el-option
                      v-for="(item, i) in flagList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="公积金贷款金额">
                  <el-input v-model="ruleForm.houseInfo.loanAmountOfProvidentFund" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="公积金月还款额">
                  <el-input v-model="ruleForm.houseInfo.monRepayAmtOfProvidentFund" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="房贷记录">
                  <el-input v-model="ruleForm.houseInfo.houLoanRecord" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="房产单价">
                  <el-input v-model="ruleForm.houseInfo.houUnitPrice" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="7">
            <template slot="title">
              <span>
                <em></em>增信信息-房产-房产确权
              </span>
            </template>
            <el-row>
              <el-col :span="12">
                <el-form-item label="房产权利人数">
                  <el-input v-model="ruleForm.houseInfo.housePropRights" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="主贷人份额占比">
                  <el-input v-model="ruleForm.houseInfo.spoShareProportion" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="贷款发放银行">
                  <el-input v-model="ruleForm.houseInfo.loanBank" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否有限制、查封信息">
                  <el-select v-model="ruleForm.houseInfo.isLimitCloseInfo" :disabled="true">
                    <el-option
                      v-for="(item, i) in flagList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="确权编号">
                  <el-input v-model="ruleForm.houseInfo.confirmRightNo" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="房产类型">
                  <el-select v-model="ruleForm.houseInfo.houPropertyType" :disabled="true">
                    <el-option
                      v-for="(item, i) in houPropertyTypeList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否二次抵押">
                  <el-select v-model="ruleForm.houseInfo.isSecondMortgage" :disabled="true">
                    <el-option
                      v-for="(item, i) in flagList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="8">
            <template slot="title">
              <span>
                <em></em>增信信息-房产-房产评估
              </span>
            </template>
            <el-row>
              <el-col :span="12">
                <el-form-item label="竣工年份">
                  <el-input v-model="ruleForm.houseInfo.finishYear" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否为期房">
                  <el-select v-model="ruleForm.houseInfo.isForwardDeliveryHouse" :disabled="true">
                    <el-option
                      v-for="(item, i) in flagList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label='房产评估类型'>
                  <el-select v-model="ruleForm.houseInfo.houseEvaluateType" :disabled="true">
                    <el-option
                      v-for="(item, i) in houseEvaluateTypeList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="房产面积">
                  <el-input v-model="ruleForm.houseInfo.houArea" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="房屋总价(元)">
                  <el-input v-model="ruleForm.houseInfo.housePrice" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否有其他房产净值补充">
                  <el-select v-model="ruleForm.houseInfo.isOtherHouseNetValues" :disabled="true">
                    <el-option
                      v-for="(item, i) in flagList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="补充房产净值">
                  <el-input v-model="ruleForm.houseInfo.supplyHouseNetValues" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="房产地址(省份)">
                  <el-input v-model="ruleForm.houseInfo.houseAddrProvinceCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="房产地址(城市)">
                  <el-input v-model="ruleForm.houseInfo.houseAddrCityCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="房产地址(区县)">
                  <el-input v-model="ruleForm.houseInfo.houseAddrAreaCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="房产地址(详细地址)">
                  <el-input v-model="ruleForm.houseInfo.houseAddStreetCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="EVS房产坐落地址(省份)">
                  <el-input v-model="ruleForm.houseInfo.evsHouseAddrProvinceCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="EVS房产坐落地址(城市)">
                  <el-input v-model="ruleForm.houseInfo.evsHouseAddrCityCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="EVS房产坐落地址(区县)">
                  <el-input v-model="ruleForm.houseInfo.evsHouseAddrAreaCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="楼盘关键字">
                  <el-input v-model="ruleForm.houseInfo.houseKeyword" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="楼盘">
                  <el-input v-model="ruleForm.houseInfo.buildingSale" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="楼栋">
                  <el-input v-model="ruleForm.houseInfo.buildingNum" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="房号">
                  <el-input v-model="ruleForm.houseInfo.roomNum" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="9">
            <template slot="title">
              <span>
                <em></em>增信信息-保单
              </span>
            </template>
            <el-table
             :data="ruleForm.policyInfoList">
              <el-table-column prop="dateOfPolicy" label="保单生效日期"></el-table-column>
              <el-table-column prop="payAmtEveryYear" label="每年缴费金额"></el-table-column>
              <el-table-column prop="insuranceCompany" label="保险公司"></el-table-column>
              <el-table-column prop="isInvestmentLinkage" label="是否为投资连结型">
                <template slot-scope="scope">
                  <div>{{flagFiled[scope.row.isInvestmentLinkage]}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="insurancePolicyTime" label="保单投保时间"></el-table-column>
              <el-table-column prop="insuranceTheInsured" label="被保人即投保人">
                <template slot-scope="scope">
                  <div>{{flagFiled[scope.row.insuranceTheInsured]}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="insurancePayType" label="缴费方式">
                <template slot-scope="scope">
                  <div>{{insurancePayTypeFiled[scope.row.insurancePayType]}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="insuranceType" label="险种类型">
                <template slot-scope="scope">
                  <div>{{insuranceTypeFiled[scope.row.insuranceType]}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="policyReinstateTime" label="保单复效时间"></el-table-column>
              <el-table-column prop="currentState" label="当前状态是否有效">
                <template slot-scope="scope">
                  <div>{{flagFiled[scope.row.currentState]}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="isLoanInfoAvail" label="当前是否有贷款信息"></el-table-column>
              <el-table-column prop="isInsuredChanged" label="投保人近一年发生是否变更">
                <template slot-scope="scope">
                  <div>{{flagFiled[scope.row.isInsuredChanged]}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="insurancePayTerm" label="需缴费年限"></el-table-column>
              <el-table-column prop="isBreakInPayment" label="缴费期是否有中断投保">
                <template slot-scope="scope">
                  <div>{{flagFiled[scope.row.isBreakInPayment]}}</div>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item name="10">
            <template slot="title">
              <span>
                <em></em>增信信息-车贷
              </span>
            </template>
            <el-row>
              <el-col :span="12">
                <el-form-item label="车贷选中贷款编号">
                  <el-input v-model="ruleForm.carInfo.carLoanNum" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="车贷信息">
                  <el-input v-model="ruleForm.carInfo.isCarLoan" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="11">
            <template slot="title">
              <span>
                <em></em>增信信息-缴金
              </span>
            </template>
            <el-row>
              <el-col :span="12">
                <el-form-item label="缴金类型">
                  <el-select v-model="ruleForm.payInfo.payfeeType" :disabled="true">
                    <el-option
                      v-for="(item, i) in payfeeTypeList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="缴金基数">
                  <el-input v-model="ruleForm.payInfo.payfeeBasic" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="连续缴金起始日期">
                  <el-input v-model="ruleForm.payInfo.payfeeDate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="现单位缴金起始日期">
                  <el-input v-model="ruleForm.payInfo.currentPayfeeDate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="12">
            <template slot="title">
              <span>
                <em></em>合同信息
              </span>
            </template>
            <el-row>
              <el-col :span="12">
                <el-form-item label="合同签订地点(省份)">
                  <el-input v-model="ruleForm.contractInfo.contractSignProvinceCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="合同签订地点(城市)">
                  <el-input v-model="ruleForm.contractInfo.contractSignCityCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="合同签订地点(区县)">
                  <el-input v-model="ruleForm.contractInfo.contractSignAreaCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="合同签订地点(区县)">
                  <el-input v-model="ruleForm.contractInfo.contractSignStreet" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <!-- <el-col :span="12">
                <el-form-item label="合同签订地点详细地址">
                  <el-input v-model="ruleForm.contractInfo.contractSignDetailAddress" :disabled="true"></el-input>
                </el-form-item>
              </el-col> -->
              <el-col :span="12">
                <el-form-item label="合同送达地址（省份）">
                  <el-input v-model="ruleForm.contractInfo.contractServiceProvinceCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="合同送达地址（城市）">
                  <el-input v-model="ruleForm.contractInfo.contractServiceCityCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="合同送达地址（区县）">
                  <el-input v-model="ruleForm.contractInfo.contractServiceAreaCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="合同送达地址详细地址">
                  <el-input v-model="ruleForm.contractInfo.contractServiceDetailAddress" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="13">
            <template slot="title">
              <span>
                <em></em>重复性状态
              </span>
            </template>
            <el-row>
              <el-col :span="12">
                <el-form-item label="检查结果">
                  <el-select v-model="ruleForm.isRepeat" :disabled="true">
                    <el-option
                      v-for="(item, i) in flagList"
                      :key="i"
                      :label="item.dictName"
                      :value="item.dictId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="14">
            <template slot="title">
              <span>
                <em></em>系统审批结果及中间数据
              </span>
            </template>
            <el-row>
              <el-col :span="12">
                <el-form-item label="最终额度">
                  <el-input v-model="ruleForm.otherInfo.crdtAmt" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="利率">
                  <el-input v-model="ruleForm.intRate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最高可贷金额">
                  <el-input v-model="ruleForm.otherInfo.highestLoanQuota" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="15">
            <template slot="title">
              <span>
                <em></em>审批信息
              </span>
            </template>
            <el-row>
              <el-table
               :data="reviewHistoryList"
              >
                <el-table-column prop="auditUserName" label="执行人"></el-table-column>
                <el-table-column prop="receiveTime" label="收到时间">
                  <template slot-scope="scope">
                    <div>{{scope.row.receiveTime.slice(0, 8)}}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="claimTime" label="读取时间">
                  <template slot-scope="scope">
                    <div>{{scope.row.claimTime.slice(0, 8)}}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="auditTime" :label="$i18ns('审核时间')">
                  <template slot-scope="scope">
                    <div>{{scope.row.auditTime.slice(0, 8)}}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="auditType" label="审核结果">
                  <template slot-scope="scope">
                    <div>{{scope.row.auditStep}}{{auditTypeTranslate(scope.row.auditType)}}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="auditRemark" :label="$i18ns('备注')"></el-table-column>
              </el-table>
              <div class="approval-pagination">
                <el-pagination v-show="approvalPagination.isShowPage"
                 @size-change="appSizeChange"
                 @current-change="appCurrentChange"
                 :current-page="approvalPagination.currentPage"
                 :page-sizes="[10,15,20]"
                 :page-size="approvalPagination.tableSize"
                 layout="total, sizes, prev, pager, next, jumper"
                 :total="approvalPagination.tableTotal">
                </el-pagination>
              </div>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="16">
            <template slot="title">
              <span>
                <em></em>补件信息
              </span>
            </template>
            <el-table
             :data="patchHstList">
              <el-table-column prop="patchUserName" label="执行人"></el-table-column>
              <el-table-column prop="endPatchTime" label="补件时间"></el-table-column>
              <el-table-column prop="patchNames" label="补件附件名称"></el-table-column>
              <el-table-column prop="patchRemark" :label="$i18ns('备注')"></el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item name="17" disabled>
            <template slot="title">
              <span>
                <em></em>审批结果
              </span>
            </template>
            <el-row class="approval-result">
              <el-col :span="12">
                <el-form-item label="申请额度">
                  <el-input v-model="ruleForm.otherInfo.crdtAmt" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="申请人姓名">
                  <el-input v-model="ruleForm.baseInfo.name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-form ref="submitForm" :model="submitForm" :rules="submitrules" label-width="160px" class="custom-common--form">
                <el-col :span="12">
                  <el-form-item label="风险级别">
                    <el-select v-model="ruleForm.loanInfo.riskLevel" :disabled="true">
                      <el-option
                        v-for="(item, i) in riskLevelList"
                        :key="i"
                        :label="item.dictName"
                        :value="item.dictId">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="最高可贷额度">
                    <el-input v-model="ruleForm.otherInfo.highestLoanQuota" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label=" ">
                      <el-radio v-model="submitForm.commitType" @change="commitTypeChange" label="PASS">通过</el-radio>
                      <el-radio v-model="submitForm.commitType" @change="commitTypeChange" label="REJECT">拒绝</el-radio>
                      <el-radio v-model="submitForm.commitType" @change="commitTypeChange" label="SUPPLY">待补件</el-radio>
                      <el-radio v-model="submitForm.commitType" @change="commitTypeChange" label="REBACK">退回一审</el-radio>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24" v-if="submitForm.commitType === 'REJECT'">
                    <el-checkbox-group v-model="submitForm.rejectReasons">
                      <el-form-item prop="rejectReasons" label="拒绝原因：欺诈拒绝">
                        <el-checkbox v-for="(item, index) in rjReasonBilkList" :key="index" :label="item.dictId">{{item.dictName}}</el-checkbox>
                      </el-form-item>
                      <el-form-item prop="rejectReasons" label="         客户取消">
                        <el-checkbox v-for="(item, index) in rjReasonCustList" :key="index" :label="item.dictId">{{item.dictName}}</el-checkbox>
                      </el-form-item>
                    </el-checkbox-group>
                  </el-col>
                  <el-col :span="24" v-if="submitForm.commitType === 'SUPPLY'">
                    <el-form-item prop="attachTypeList" label="补件类型">
                      <el-checkbox-group v-model="submitForm.attachTypeList">
                        <el-checkbox v-for="(item, index) in imageFileList" :key="index" :label="item.fileCode">{{item.fileName}}</el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item label="审核备注">
                      <el-input type="textarea" resize="none" :rows="4" v-model="submitForm.comment"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
              <el-col :span="12">
                <el-form-item label="授信利率">
                  <el-input v-model="ruleForm.intRate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="最高核准额度(元)">
                  <el-input v-model="ruleForm.otherInfo.crdtAmt" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-form>
        <el-row class="dc-left--btns">
          <el-button type="primary" @click="leftSubmit">提交</el-button>
        </el-row>
      </el-collapse>
    </div>
    <div class="data-check--right">
      <div class="dc-right--header">
        <el-menu :default-active="0" class="dc-menu dc-right--menu" mode="horizontal" @select="fileSelect">
          <el-submenu index="1">
            <template slot="title">{{$i18ns('影像附件')}}</template>
            <el-menu-item :index="index" v-for="(item, index) in imageFileList" :key="index">{{item.fileName}}</el-menu-item>
          </el-submenu>
        </el-menu>
        <div class="dc-right--title">{{$i18ns('影像附件')}}{{imageInfo.fileName}}</div>
      </div>
      <!-- 图片查看区域 -->
      <el-row class="dc-right--option" v-show="imageInfo.fileTypeCode === '1'">
        <el-col class="dcr-option--btn" :span="2">
          <div @click="zoomIn">{{$i18ns('放大')}}</div>
        </el-col>
        <el-col class="dcr-option--btn" :span="2">
          <div @click="restore">{{$i18ns('还原')}}</div>
        </el-col>
        <el-col class="dcr-option--btn" :span="2">
          <div @click="zoomOut">{{$i18ns('缩小')}}</div>
        </el-col>
        <el-col class="dcr-option--btn" :span="3">
          <div @click="reverseRotate">左旋转</div>
        </el-col>
        <el-col class="dcr-option--btn" :span="3">
          <div @click="positiveRotate">右旋转</div>
        </el-col>
        <el-col class="dcr-option--btn" :span="2">
          <div @click="symmetry">对转</div>
        </el-col>
        <el-col class="dcr-option--btn dcr-option--time" :span="10">上传时间：2021-01-29 14:16:19</el-col>
      </el-row>
      <el-row class="dc-right--img" v-show="imageInfo.fileTypeCode === '1'">
        <img
         :src="imageInfo.url"
         :style="{ transform: activeTrans }"
         >
      </el-row>
      <!-- 视频查看区域 -->
      <el-row class="dc-right--video" v-show="imageInfo.fileTypeCode === '2'">
        <video controls :src="imageInfo.url"></video>
      </el-row>
      <!-- pdf查看区域 -->
      <el-row class="dc-right--pdf" v-show="imageInfo.fileTypeCode === '3'">
        <iframe :src="imageInfo.url" frameborder="0"></iframe>
      </el-row>
    </div>
    <el-dialog
     :title="relevantTitle"
     :visible.sync="relevantDialogShow"
     width="1200px"
     :before-close="handleRelevantClose"
     v-if="relevantDialogShow">
      <!-- 认领记录 -->
      <claimd-record :apply-no="cParentParams.applyNo" v-if="relevantIndex === 0"/>
      <!-- 学历学籍信息查询 -->
      <education-detail :apply-no="cParentParams.applyNo" v-if="relevantIndex === 1"/>
      <!-- 审批历程信息 -->
      <appr-history :apply-id="cParentParams.applid" :apply-no="cParentParams.applyNo" v-if="relevantIndex === 2"/>
      <!-- 人工审批信息 -->
      <to-json toUrl="/views/workbench/comprehensiveDebt/RenAppro.json" :params="{'custna': ruleForm.baseInfo.name,'applid': cParentParams.applid,'applyNo':cParentParams.applyNo}" v-if="relevantIndex === 3"></to-json>
      <!-- 历史申请/重复性检查 -->
      <to-json toUrl="/views/workbench/comprehensiveDebt/history_apply.json" :params="{'certNo': ruleForm.baseInfo.certNo}" v-if="relevantIndex === 4"></to-json>
      <!-- 系统判断结果 -->
      <sys-judg-result :apply-no="cParentParams.applyNo" v-if="relevantIndex === 5"/>
      <!-- 退补件历史 -->
      <return-patch :apply-no="cParentParams.applyNo" v-if="relevantIndex === 6"/>
      <!-- 身份证信息 -->
      <certno-info :apply-id="cParentParams.applid" :apply-no="cParentParams.applyNo" v-if="relevantIndex === 7"/>
      <!-- 人脸对比结果 -->
      <face-matching :apply-no="cParentParams.applyNo" v-if="relevantIndex === 8"/>
    </el-dialog>
  </div>
</template>
<script>
import ClaimdRecord from "@/views/workbench/comprehensiveDebt/ClaimdRecord"; // 认领记录组件
import EducationDetail from "@/views/workbench/comprehensiveDebt/EducationDetail"; // 学历学籍信息组件
import ApprHistory from "@/views/workbench/comprehensiveDebt/ApprHistory"; // 审批历程信息
import SysJudgResult from "@/views/workbench/comprehensiveDebt/SysJudgResult"; // 系统判断结果组件
import ReturnPatch from "@/views/workbench/comprehensiveDebt/ReturnPatch"; // 退补件历史组件
import CertnoInfo from "@/views/workbench/comprehensiveDebt/CertnoInfo"; //身份证信息
import FaceMatching from "@/views/workbench/bpmWorkBench/bpm_wait_todo/FaceMatching"; // 人脸对比结果组件

export default {
  name: "HandleFirstApproval",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object // 父页面自定义参数与内置参数
  },
  components: {
    ClaimdRecord,
    EducationDetail,
    ApprHistory,
    SysJudgResult,
    ReturnPatch,
    CertnoInfo,
    FaceMatching,
  },
  data() {
    return {
      activeNames: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17"],
      ruleForm: {
        // 贷款信息
        loanInfo: {
          prodCode: "",
          firstLevelAreaCenterName: "",
          secondLevelAreaCenterName: "",
          thirdLevelAreaCenterName: "", 
          firstLevelCooperateOrgName: "",
          secondLevelCooperateOrgName: "",
          thirdLevelCooperateOrgName: "",
          accountManagerCode: "",
          accountManagerName: "",
          accountManagerTel: "",
          applyType: "",
          custGroupType: "",
          riskLevel: "",
          applyAmt: "",
          applyPeriod: "",
          purpose: "",
          intrestType: "",
          repayType: "",
          payMode: "",
          entrustedAcctName: "",
          entrustedAcctNo: "",
          entrustedBankNo: "",
          entrustedBankName: "",
          typeOfIndepyPaymentCard: "",
          isSpoLoan: "",
          spoApplyNum: "",
          spoName: "",
          spoApplyAmt: "",
          debitCardNo: "",
          repayCardNo: "",
        },
        // 个人基本信息
        baseInfo: {
          name: "",
          mobileNo: "",
          certNo: "",
          gender: "",
          marryStatus: "",
          email: "",
          education: "",
        },
        // 地址信息
        addressInfo: {
          liveAddProvinceCode: "",
          liveAddCityCode: "",
          liveAddAreaCode: "",
          liveAddStreetCode: "",
          liveAddress: "",
          houTelAreaCode: "",
          houTel: "",
          houAddZipCode: "",
          houType: "",
          liveDate: "",
        },
        // 单位信息
        companyInfo: {
          employType: "",
          empName: "",
          department: "",
          workRankCode: "",
          workAddProvinceCode: "",
          workAddCityCode: "",
          workAddAreaCode: "",
          workAddStreet: "",
          workAddDetail: "",
          isAvailablCcompanyTel: "",
          companyTelAreaCode: "",
          companyTelNo: "",
          companyTelExt: "",
          companyAddressZipCode: "",
          employedDate: "",
          currentYearIncome: "",
          isSupplyBusinessInfo: "",
          companySetupDate: "",
          workInfoRemarks: "",
          yearBusinessIncome: "",
          indNature: "",
          enterpriseNatureCode: "",
        },
        // 联系人信息
        linkInfoList: [],
        // 增信信息——房产
        houseInfo: {
          isBaseHou: "",
          isOwnHou: "",
          isHouLoan: "",
          houLoanType: "",
          houLoanNo: "",
          isPbocProvidenFundLoan: "",
          loanAmountOfProvidentFund: "",
          monRepayAmtOfProvidentFund: "",
          houLoanAmt: "",
          housePropRights: "",
          monRepayAmt: "",
          houLoanRecord: "",
          houArea: "",
          houUnitPrice: "",
          spoShareProportion: "",
          loanBank: "",
          isLimitCloseInfo: "",
          confirmRightNo: "",
          houPropertyType: "",
          isSecondMortgage: "",
          finishYear: "",
          isForwardDeliveryHouse: "",
          houseEvaluateType: "",
          housePrice: "",
          isOtherHouseNetValues: "",
          supplyHouseNetValues: "",
          houseAddrProvinceCode: "",
          houseAddrCityCode: "",
          houseAddrAreaCode: "",
          houseAddStreetCode: "",
          evsHouseAddrProvinceCode: "",
          evsHouseAddrCityCode: "",
          evsHouseAddrAreaCode: "",
          houseKeyword: "",
          buildingSale: "",
          buildingNum: "",
          roomNum: "",
        },
        // 增信信息——保单
        policyInfoList: {
          dateOfPolicy: "",
          payAmtEveryYear: "",
          insuranceCompany: "",
          isInvestmentLinkage: "",
          insurancePolicyTime: "",
          insuranceTheInsured: "",
          insurancePayType: "",
          insuranceType: "",
          policyReinstateTime: "",
          currentState: "",
          isLoanInfoAvail: "",
          isInsuredChanged: "",
          insurancePayTerm: "",
          isBreakInPayment: "",
        },
        // 增信信息——车贷
        carInfo: {
          carLoanNum: "",
          isCarLoan: "",
        },
        // 增信信息-缴金
        payInfo: {
          payfeeType: "",
          payfeeBasic: "",
          payfeeDate: "",
          currentPayfeeDate: "",
        },
        // 合同信息
        contractInfo: {
          contractSignProvinceCode: "",
          contractSignCityCode: "",
          contractSignAreaCode: "",
          contractSignStreet: "",
          contractServiceProvinceCode: "",
          contractServiceCityCode: "",
          contractServiceAreaCode: "",
          contractServiceDetailAddress: "",
        },
        // 其他信息
        otherInfo: {
          idNameCheck: "",
          facePolicyScore: "",
          isFacePolicyException: "",
          ksFaceScore: "",
          ksThresholds2: "",
          isKsFaceScoreNomal: "",
          cloudWalkFaceScore: "",
          isCloudWalkFaceScoreNomal: "",
          applAmt: "",
          crdtAmt: "",
          highestLoanQuota: "",
        },
        //重复性状态
        isRepeat:"",
        //利率
        intRate: "",
      },
      spoInfo: {
        spoName: "",
        spoMobile: "",
        spoIdNo: "",
        spoCompany: "",
      },
      relevantList: ["认领记录","学历学籍信息查询","人行信息","审批历程信息","退补件历史","捞件历史","系统判断结果(初审决策+额度计算)","人脸对比信息","公安对比信息",,"历史申请信息","人工审批信息","身份证信息"], // 相关资料列表
      relevantDialogShow: false, // 控制认领记录弹窗显示隐藏
      relevantTitle: "",
      relevantIndex: null,
      applyTypeList: [],
      custGroupTypeList: [],
      riskLevelList: [],
      purposeList: [],
      intrestTypeList: [],
      repayTypeList: [],
      payModeList: [],
      typeOfIndepyPaymentCardList: [],
      flagList: [],
      genderList: [],
      marryStatusList: [],
      educationList: [],
      houTypeList: [],
      employTypeList: [],
      workRankCodeList: [],
      indNatureList: [],
      enterpriseNatureCodeList: [],
      contactRelationList: [],
      auditTypeList: [],
      // backReviewList: [],
      rjReasonBilkList: [], // 拒绝原因-欺诈拒绝
      rjReasonCustList: [], // 拒绝原因-客户取消
      houLoanTypeList: [],
      houPropertyTypeList: [],
      houseEvaluateTypeList: [],
      payfeeTypeList: [],
      insuranceTypeList: [],
      insurancePayTypeList: [],
      reviewHistoryList: [], // 审核历程信息
      approvalPagination: { // 审批历程分页配置
        isShowPage: false,
        currentPage: 1,
        tableSize: 10,
        tableTotal: null,
      },
      videosList: [], // 影像资料清单
      imageFileList: [], // 影像附件列表
      count: 0, // 倒计时时间
      countResult: "", // 倒计时文字
      countFlag: true, // 倒计时结束标志
      fileList: [], // 文件列表 
      submitForm: {
        commitType: "PASS",
        attachTypeList: [],
        // rebackReasons: [],
        attachVerifyList: [],
        comment: "通过",
        rejectReasons: [],
      },
      submitrules: {
        attachTypeList: [
          { required: true, message: "请选择补件类型" }
        ],
        // rebackReasons: [
        //   { required: true, message: "请选择退回原因" }
        // ],
        rejectReasons: [
          { required: true, message: "请选择拒绝原因" }
        ]
      },
      imageInfo: {
        fileName: "",
        fileTypeCode: "",
        bucket: "",
        buctetKey: "",
        url: "",
      },
      activeScale: 1, // 图片缩放倍数
      activeRotate: 0, // 图片旋转角度
      activeScaleX: 1, // 图片对称翻转角度
      //补件信息
      patchHstList: {
        patchUserName:"",
        endPatchTime:"",
        patchNames:"",
        patchRemark:"",
      },
    }
  },
  computed: {
    // 图片动态样式
    activeTrans() {
      return `scale(${this.activeScale}) rotate(${this.activeRotate}deg) scaleX(${this.activeScaleX})`;
    },
    // 是否枚举
    flagFiled() {
      const map = {};
      this.flagList.forEach(element => {
        map[element.dictId] = element.dictName;
      });
      return map;
    },
    // 保险 险种类型
    insuranceTypeFiled() {
      const map = {};
      this.insuranceTypeList.forEach(element => {
        map[element.dictId] = element.dictName; 
      });
      return map;
    },
    // 保险 缴费方式
    insurancePayTypeFiled() {
      const map = {};
      this.insurancePayTypeList.forEach(element => {
        map[element.dictId] = element.dictName; 
      });
      return map;
    }
  },
  deactivated() {
    sessionStorage.setItem("countTime", this.count); 
  },
  destroyed() {
    sessionStorage.setItem("countTime", 0);
  },
  created() {
    this.timeInit(); // 倒计时初始化
    this.timeout(); // 开始倒计时
    this.getData(); // 初始化资料核实信息
    this.getApprovalInfo(); // 初始化审批历史
    this.getImageInfo(); // 初始化影像信息
    this.getRepeatStatus(); // 初始化重复性状态
    this.getReturnPatchHst(); // 初始化补件信息
    this.getDictList("E_APPLYTP", "applyTypeList"); // 初始化进件方式数据字典
    this.getDictList("E_CUSTGT", "custGroupTypeList"); // 初始化客群类别数据字典
    this.getDictList("E_RISKLEVEL", "riskLevelList"); // 初始化风险级别数据字典
    this.getDictList("E_LOANYT", "purposeList"); // 初始化贷款用途数据字典
    this.getDictList("E_INTTYPE", "intrestTypeList"); // 初始化利率方案数据字典
    this.getDictList("E_SCHDTD", "repayTypeList"); // 初始化还款方式数据字典
    this.getDictList("E_PAYMODE", "payModeList"); // 初始化支付方式数据字典
    this.getDictList("E_APATMENTTP", "typeOfIndepyPaymentCardList"); // 初始化自主支付卡类型数据字典
    this.getDictList("E_YES", "flagList"); // 初始化是否数据字典
    this.getDictList("MS_E_GENDER", "genderList"); // 初始化性别数据字典
    this.getDictList("E_MARYSTS", "marryStatusList"); // 初始化婚姻状态数据字典
    this.getDictList("E_MAXEDU", "educationList"); // 初始化教育程度数据字典
    this.getDictList("E_HOUTYPE", "houTypeList"); // 初始化住宅性质数据字典
    this.getDictList("E_EMPLOYTYPE", "employTypeList"); // 初始化住宅性质数据字典
    this.getDictList("E_CONJOB", "workRankCodeList"); // 初始化工作职级数据字典
    this.getDictList("E_INDUSTRY", "indNatureList"); // 初始化行业性质数据字典
    this.getDictList("E_COMPPROP", "enterpriseNatureCodeList"); // 初始化单位性质数据字典
    this.getDictList("E_LINKREL", "contactRelationList"); // 初始化紧急联系人关系数据字典
    this.getDictList("E_AUDITTP", "auditTypeList"); // 初始化审核结果数据字典
    this.getDictList("E_RJRSBILK", "rjReasonBilkList"); // 初始化拒绝原因数据字典 - 欺诈拒绝
    this.getDictList("E_RJRSCUST", "rjReasonCustList"); // 初始化拒绝原因数据字典 - 客户取消
    // this.getDictList("E_BKREVIEW", "backReviewList"); // 初始化退回审核原因数据字典
    this.getDictList("E_HOULOANTYPE", "houLoanTypeList"); // 初始化房贷类型数据字典
    this.getDictList("E_HOUPROPTYPE", "houPropertyTypeList"); // 初始化房产类型数据字典
    this.getDictList("E_HOUEVATYPE", "houseEvaluateTypeList"); // 初始化房产类型数据字典
    this.getDictList("E_PAYFEETYPE", "payfeeTypeList"); // 初始化缴金类型数据字典
    this.getDictList("E_INSTYPE", "insuranceTypeList"); // 初始化险种类型数据字典
    this.getDictList("E_INSPAYTYPE", "insurancePayTypeList"); // 初始化险种类型数据字典
  },
  methods: {
    /**
     * 获取资料核实信息
     */
    getData() {
      this.ruleForm.applid = this.cParentParams.applid;
      this.ruleForm.roleCode = this.cParentParams.currAprovRole;
      let params = {
        servicecode: "applyInfoQuery",
        applid: this.cParentParams.applid,
      }
      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            this.ruleForm.loanInfo = res.data.loanInfo;
            this.ruleForm.baseInfo = res.data.baseInfo;
            this.ruleForm.addressInfo = res.data.addressInfo;
            this.ruleForm.companyInfo = res.data.companyInfo;
            this.ruleForm.linkInfoList = res.data.linkInfoList;
            for (let index = 0; index < this.ruleForm.linkInfoList.length; index++) {
              const element = this.ruleForm.linkInfoList[index];
              if (element.contactRelation === "SPOUSE") {
                this.spoInfo.spoName = element.spoName;
                this.spoInfo.spoMobile = element.spoMobile;
                this.spoInfo.spoIdNo = element.spoIdNo;
                this.spoInfo.spoCompany = element.spoCompany;
              }
            }
            this.ruleForm.linkInfoList = this.ruleForm.linkInfoList.filter(item => {
              if (item.contactRelation === "SPOUSE") {
                return false;
              }
              return true;
            });
            this.ruleForm.houseInfo = res.data.houseInfo;
            this.ruleForm.policyInfoList = res.data.policyInfoList;
            this.ruleForm.carInfo = res.data.carInfo;
            this.ruleForm.payInfo = res.data.payInfo;
            this.ruleForm.contractInfo = res.data.contractInfo;
            this.ruleForm.intRate = res.data.intRate;
          }
        })
        .catch(err => {
          console.error(err);
        })
    },
    /**
     * 获取重复性状态数据
     */
    getRepeatStatus() {
      let params = {
        servicecode: "queryRepeatState",
        applid: this.cParentParams.applid,
      }
      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            this.ruleForm.isRepeat = res.data.isRepeat;
          }
        })
        .catch(err => {
          console.error(err);
        })
    },
    /**
     * 获取补件信息
     */
    getReturnPatchHst() {
      let params = {
        servicecode: "returnPatchHstQuery",
        applid: this.cParentParams.applid,
      }
      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            this.patchHstList = res.data.patchHstList;
          }
        })
        .catch(err => {
          console.error(err);
        })
    },
    /**
     * 相关资料选中回调
     * @param key 当前选中key值
     */
    relevantSelect(key) {
      this.relevantTitle = this.relevantList[key];
      this.relevantDialogShow = true;
      this.relevantIndex = key;
    },
    /**
     * 认领记录弹窗关闭回调
     */
    handleRelevantClose() {
      this.relevantDialogShow = false;
    },
    /**
     * 获取审批历史
     */
    getApprovalInfo() {
      let params = {
        servicecode: "auditHstQuery",
        applid: this.cParentParams.applid,
      }
      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            this.approvalPagination.tableTotal = res.data.length;
            const start = this.approvalPagination.tableSize * (this.approvalPagination.currentPage - 1);
            this.approvalPagination.isShowPage = res.data.length < 10 ? false : true;
            this.reviewHistoryList = res.data.splice(start, start + this.approvalPagination.tableSize);
          }
        })
        .catch(err => {
          console.error(err);
        })
    },
    /**
    * 分页sizeChange 回调
    * @param val 当前分页大小
    */
    appSizeChange(val) {
      this.approvalPagination.tableSize = val;
      this.approvalPagination.currentPage = 1;
      this.getApprovalInfo();
    },
    /**
    * 分页currentChange回调
    * @param val 当前分页大小
    */
    appCurrentChange(val) {
      this.approvalPagination.currentPage = val;
      this.getApprovalInfo();
    },
    /**
     * 审核结果转译
     * @param type 翻译结果码值
     */
    auditTypeTranslate(type) {
      for (let index = 0; index < this.auditTypeList.length; index++) {
        const element = this.auditTypeList[index];
        if (element.dictId === type) {
          return element.dictName;
        }
      }
    },
    /**
     * 联系人信息与本人关系转译
     * @param type 翻译结果码值
     */
    contactRelationTranslate(type) {
      for (let index = 0; index < this.contactRelationList.length; index++) {
        const element = this.contactRelationList[index];
        if (element.dictId === type) {
          return element.dictName;
        }
      }
    },
    /**
     * 倒计时初始化
     */
    timeInit() {
      this.count = sessionStorage.getItem("countTime") ? sessionStorage.getItem("countTime") : 0;
    },
    /**
     * 倒计时递归
     */
    timeout() {
      setTimeout(() => {
        this.count++;
        this.timeFormat();
        if (this.countFlag) {
          this.timeout();
        } 
      }, 1000)
    },
    /**
     * 倒计时格式化
     */
    timeFormat() {
      let second = this.count % 60;
      let minute = Math.floor(this.count / 60) % 60;
      let hour = Math.floor(this.count / 3600);
      this.countResult = "";
      if (hour > 0) {
        this.countResult = `${hour}时${minute}分${second}秒`;
      } else {
        if (minute > 0) {
          this.countResult = `${minute}分${second}秒`;
        } else {
          this.countResult = `${second}秒`;
        }
      }
    },
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictList(dictType, listKey) {
      let that = this;
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
     * 获取影像信息
     */
    getImageInfo() {
      let params = {
        servicecode: "fileListQuery",
        applid: this.cParentParams.applid,
        roleCode: this.cParentParams.currAprovRole,
      }
      this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            const response = res.data;
            this.imageFileList = res.data;
            if (this.imageFileList.length > 0) {
              this.imageInfo.fileName = this.imageFileList[0].fileName;
              this.imageInfo.fileTypeCode = this.imageFileList[0].fileTypeCode;
              this.imageInfo.bucket = this.imageFileList[0].bucket;
              this.imageInfo.buctetKey = this.imageFileList[0].buctetKey;
              switch (this.imageInfo.fileTypeCode) {
                case "1":
                case "3":
                  this.getBase64Url(this.imageInfo.bucket, this.imageInfo.buctetKey);
                  break;
                case "2":
                  this.imageInfo.url = this.imageFileList[0].videoUrl;
                  break;
                default:
                  break;
              }
            }
            this.videosList = [];
            for (let index = 0; index < response.length; index++) {
              const element = response[index];
              const map = {
                fileName: element.fileName,
                fileCode: element.fileCode,
                isCompliant: "",
              }
              this.videosList.push(map);
            }
          }
        })
        .catch(err => {
          console.error(err);
        })
    },
    /**
     * 审批备注默认值赋值
     */
    commitTypeChange(val) {
      switch (val) {
        case "PASS":
          this.submitForm.comment = "通过";
          break;
        case "REJECT":
        case "SUPPLY":
        case "REBACK":
          this.submitForm.comment = "";
          break;
        default:this.submitForm.comment = "";
          break;
      }
    },
    /**
     * 审核提交
     */
    leftSubmit() {
      this.$refs.submitForm.validate(valid => {
        if (valid) {
          let params = {
            servicecode: "taskCommit",
            applid: this.cParentParams.applid,
            operator: JSON.parse(localStorage.getItem("user_info")).userCode,
            commitType: this.submitForm.commitType,
            comment: this.submitForm.comment,
            taskInstId: this.cParentParams.taskInstId,
            attachVerifyList: []
          }
          switch (params.commitType) {
            case "REJECT":
              params.rejectReasonList = [];
              let rjmap = {};
              for (let index = 0; index < this.rjReasonBilkList.length; index++) {
                const element = this.rjReasonBilkList[index];
                rjmap[element.dictId] = element.dictName;
              }
              for (let index = 0; index < this.rjReasonCustList.length; index++) {
                const element = this.rjReasonCustList[index];
                rjmap[element.dictId] = element.dictName;
              }
              for (let index = 0; index < this.submitForm.rejectReasons.length; index++) {
                const element = this.submitForm.rejectReasons[index];
                if (rjmap[element]) {
                  params.rejectReasonList.push({
                    code: element,
                    name: rjmap[element],
                  })
                }
              }
              break;
            case "SUPPLY":
              params.attachTypeList = [];
              let map = {};
              for (let index = 0; index < this.videosList.length; index++) {
                const element = this.videosList[index];
                map[element.fileCode] = element.fileName;
              }
              for (let index = 0; index < this.submitForm.attachTypeList.length; index++) {
                const element = this.submitForm.attachTypeList[index];
                if (map[element]) {
                  params.attachTypeList.push({
                    code: element,
                    name: map[element],
                  })
                }
              }
              break;
            default:
              break;
          }
          this.$http.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params)
            .then(res => {
              if (res && res.code === "200" && res.data) {
                this.$message({
                  type: res.data.status === "S" ? "success" : "error",
                  message: res.data.returnMsg,
                })
              }
            })
            .catch(err => {
              console.error(err);
            })
        } else {
          this.$message({
            type: "warning",
            message: "校验不通过",
          })
        }
      })
    },
    /**
     * 选中文件名回调
     * @param key 当前选中key值
     */
    fileSelect(key) {
      this.restore();
      const item = this.imageFileList[key];
      this.imageInfo.fileName = item.fileName;
      this.imageInfo.fileTypeCode = item.fileTypeCode;
      this.imageInfo.bucket = item.bucket;
      this.imageInfo.buctetKey = item.buctetKey;
      this.imageInfo.url = "";
      if (this.imageInfo.fileTypeCode === "2") {
        this.imageInfo.url = item.videoUrl;
      } else {
        this.getBase64Url(this.imageInfo.bucket, this.imageInfo.buctetKey);
      }
    },
    /**
     * 获取文件base64地址
     * @param bucket 桶名
     * @param buctetKey 对象存储地址
     */
    getBase64Url(bucket, buctetKey) {
      let params = {
        servicecode: "AS_ICMS_JK_GETBASE",
        fileKey: buctetKey,
        bucket: bucket,
      };
      this.$http.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200" && res.data) {
            const suffix = buctetKey.split(".").splice(-1, 1)[0];
            switch (suffix) {
              case "jpg":
              case "jpeg":
                this.imageInfo.url = "data:image/jpeg;base64," + res.data.filebase64Str;
                break;
              case "png":
                this.imageInfo.url = "data:image/png;base64," + res.data.filebase64Str;
                break;
              case "pdf":
                this.imageInfo.url = "data:application/pdf;base64," + res.data.filebase64Str;
                break;
              default:
                this.imageInfo.url = "";
                break;
            }
          }
        })
    },
    /**
     * 图片缩小
     */
    zoomOut() {
      if (this.activeScale > 0.4) {
        this.activeScale -= 0.2;
      }
    },
    /**
     * 图片放大
     */
    zoomIn() {
      if (this.activeScale < 3) {
        this.activeScale += 0.2;
      }
    },
    /**
     * 逆时钟旋转
     */
    reverseRotate() {
      this.activeRotate -= 90;
    },
    /**
     * 顺时钟旋转
     */
    positiveRotate() {
      this.activeRotate += 90;
    },
    /**
     * 对称翻转
     */
    symmetry() {
      this.activeScaleX = this.activeScaleX * -1;
    },
    /**
     * 图片还原
     */
    restore() {
      this.activeScale = 1;
      this.activeRotate = 0;
      this.activeScaleX = 1;
    }
  }
}
</script>
<style lang="less" scoped>
  .data-check--container {
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
    .data-check--collapse {
      border-bottom: none;
      .el-collapse-item__content {
        padding: 20px 20px 10px 20px;
      }
      .custom-common--form {
        padding: 0;
      }
      /deep/.el-collapse-item.is-disabled {
        .el-collapse-item__header {
          color: inherit;
          cursor: auto;
        }
      }
    }
    .data-check--left {
      width: 50%;
      height: 100%;
      padding-top: 2px;
      box-sizing: border-box;
      float: left;
      border-right: 1px solid #e4e7ed;
      overflow-x: auto;
      .check-left--top {
        text-align: center;
        line-height: 50px;
        .check-left--col {
          border-right: 1px solid #e4e7ed;
          border-radius: 0;
        }
        .dc-header--left {
          width: 144px;
        }
        .dc-header--center {
          width: 30%;
        }
        .dc-header--right {
          width: calc(70% - 144px);
        }
      }
    }
    .dc-left--btns {
      text-align: center;
    }
    .data-check--right {
      width: 50%;
      height: 100%;
      float: left;
    }
    .dc-right--header {
      height: 50px;
      position: relative;
      box-sizing: border-box;
      border-bottom: 1px solid #e4e7ed;
    }
    .dc-menu {
      height: 50px;
      box-sizing: border-box;
      border-top: 1px solid #e4e7ed;
      border-right: 1px solid #e4e7ed;
      /deep/.el-submenu .el-submenu__title {
        height: 50px;
        line-height: 50px;
      }
    }
    .dc-left--menu {
      border: none;
    }
    .dc-right--menu {
      width: 118px;
      float: left;
    }
    .approval-pagination {
      padding-right: 40px;
      text-align: right;
    }
    .videos-btns {
      padding-top: 16px;
      text-align: center;
    }
    .dc-right--title {
      width: calc(100% - 118px);
      float: left;
      line-height: 50px;
      text-indent: 10px;
    }
    .dc-right--option {
      .dcr-option--btn {
        box-sizing: border-box;
        background: #e0e0e0;
        border-radius: 0;
        border-right: 1px solid #c3c3c3;
        border-top: 1px solid #c3c3c3;
        border-bottom: 1px solid #c3c3c3;
        cursor: pointer;
        text-align: center;
        line-height: 36px;
        user-select: none;
      }
      .dcr-option--time {
        text-align: left;
        text-indent: 10px;
      }
    }
    .dc-right--img {
      height: calc(100% - 90px);
      padding-top: 20px;
      position: relative;
      overflow: hidden;
      img {
        width: 50%;
        height: 50%;
        max-height: 100%;
        max-width: 100%;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        background: #c3c3c3;
        transition: transform 0.3s ease 0s;
        object-fit: contain;
      }
    }
    .dc-right--video {
      padding: 10px;
      video {
        width: 100%;
      }
    }
    .dc-right--pdf {
      height: calc(100% - 60px);
      iframe {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>