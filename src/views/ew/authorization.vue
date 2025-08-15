<template>
    <div  class="con"> 
      <h1>个人信用报告</h1>
      <h3>（授信机构版）</h3>
        <!-- 报告基本信息 -->
        <div class="border_space"></div>
        <AuthorizationTableItem 
          v-if="isReportHeaderShow"
          :leftFlex="3"
          :rightFlex="2"
          :leftText="'报告编号：' + reportHeaderNo"
          :rightText="'报告时间：' + reportHeaderDate"/>
        <el-table class="tableMargin" :data="ArbCReportheader" style="width:100%; margin-top:0px !important;" border>
            <el-table-column label="被查询者姓名" prop="name" align="center"></el-table-column>
            <el-table-column label="被查询者证件类型" prop="cert_type" :formatter="formatCertType" align="center"></el-table-column>
            <el-table-column label="被查询者证件号码" prop="cert_no" align="center"></el-table-column>
            <el-table-column label="查询机构" prop="query_org" align="center"></el-table-column>
            <el-table-column label="查询原因" prop="query_reason" :formatter="formatQueryReason" align="center"></el-table-column>
        </el-table>
        <FraudHeadItem style="margin-top: 20px;" v-if="isFraudHeaderShow" :leftFlex="3"
          :rightFlex="2"
          :leftText=  "'申请主体申请设置防欺诈要求。联系电话“' + anti_fraud_tel +'”。防欺诈要求添加于'+ anti_fraud_start_date+'，截止日期'+ anti_fraud_end_date+'。'"  />
        <el-table class="tableMargin" v-if="isFraudHeaderShow"
            :data="ArbCReportheader"
            border
            style="width: 100%">
            <el-table-column
                prop="anti_fraud_start_date"
                align="center"
                label="生效日期">
            </el-table-column>
            <el-table-column
                prop="anti_fraud_end_date"
                align="center"
                label="截止日期">
            </el-table-column>
        </el-table>
        <el-table :data="ArbCReportheader" style="width:100%; margin-top:25px !important;" border>
            <el-table-column label="异议信息提示" prop="dissent_count" align="center">
              <template slot-scope="scope">
                <span>信息主体对信用报告内容提出了{{scope.row.dissent_count}}笔异议且正在处理中，请浏览时注意阅读相关内容。</span>
              </template>
            </el-table-column>
        </el-table>

        <h3>一、基本个人信息</h3>
        <h4>（一）身份信息</h4>
        <el-table class="tableMargin" :data="ArbCSpouse" style="width:100%; margin-top:5px !important;" border>
            <el-table-column label="性别" prop="gender" :formatter="formatGender" align="center"></el-table-column>
            <el-table-column label="出生日期" prop="birthday" align="center"></el-table-column>
            <el-table-column label="婚姻状况" prop="marital_status" :formatter="formatMaritalStatus" align="center"></el-table-column>
            <el-table-column label="学历" prop="edu_level" :formatter="formatEduLevel" align="center"></el-table-column>
            <el-table-column label="学位" prop="edu_degree" :formatter="formatEduDegree" align="center"></el-table-column>
            <el-table-column label="就业状况" prop="employment_status" :formatter="formatEmploymentStatus" align="center"></el-table-column>
            <el-table-column label="国籍" prop="country_code" :formatter="formatCountryCodes" align="center"></el-table-column>
            <el-table-column label="电子邮箱" prop="email" align="center"></el-table-column>
        </el-table>
        
        <el-table class="tableMargin" :data="ArbCSpouse" style="width:100%; " border>
            <el-table-column label="通讯地址" prop="post_address" align="center"></el-table-column>
            <el-table-column label="户籍地址" prop="registered_address" align="center"></el-table-column>
        </el-table>

        <el-table class="tableMargin" :data="ArbCPhone" style="width:100%; " border>
            <el-table-column label="编号" type="index" prop="name" align="center"></el-table-column>
            <el-table-column label="手机号码" prop="mobile_no" align="center"></el-table-column>
            <el-table-column label="信息更新日期" prop="update_time" align="center"></el-table-column>
        </el-table>
        <!-- TODO -->
        <el-table class="tableMargin" :data="xxx" style="width:100%; " border>
            <el-table-column label="异议标注" prop="xxx" align="center"></el-table-column>
            <el-table-column label="添加日期" prop="xxx" align="center"></el-table-column>
        </el-table>

        <h4>（二）配偶信息</h4>
        
        <el-table class="tableMargin" :data="ArbCSpouse" style="width:100%; margin-top:5px !important;" border>
            <el-table-column label="姓名" prop="sps_name" align="center"></el-table-column>
            <el-table-column label="证件类型" prop="sps_cert_type" :formatter="formatSpsCertType" align="center"></el-table-column>
            <el-table-column label="证件号码" prop="sps_cert_no" align="center"></el-table-column>
            <el-table-column label="工作单位" prop="sps_employer" align="center"></el-table-column>
            <el-table-column label="联系电话" prop="sps_tel_no" align="center"></el-table-column>
        </el-table>

        <h4>（三）居住信息</h4>
        
        <el-table class="tableMargin" :data="ArbCLive" style="width:100%; margin-top:5px !important;" border>
            <el-table-column label="编号" type="index" width="50px"   align="center"></el-table-column>
            <el-table-column label="居住地址" prop="living_address" align="center"></el-table-column>
            <el-table-column label="住宅电话" prop="home_tel_no" align="center"></el-table-column>
            <el-table-column label="居住状况" prop="living_type" :formatter="formatLivingType" align="center"></el-table-column>
            <el-table-column label="信息更新日期" prop="update_date" align="center"></el-table-column>
        </el-table>

        <h4>（四）职业信息</h4>
        
        <el-table class="tableMargin" :data="ArbCProfessional" style="width:100%; margin-top:5px !important;" border>
            <el-table-column label="编号"  type="index" width="50px"  align="center"></el-table-column>
            <el-table-column label="工作单位" prop="job_corp" align="center"></el-table-column>
            <el-table-column label="单位性质" prop="corp_property" :formatter="formatCorpProperty" align="center"></el-table-column>
            <el-table-column label="单位地址" prop="work_addr" align="center"></el-table-column>
            <el-table-column label="单位电话" prop="office_tel" align="center"></el-table-column>
        </el-table>
        <el-table class="tableMargin" :data="ArbCProfessional" style="width:100%; " border>
            <el-table-column label="编号" type="index"  width="50px"   align="center"></el-table-column>
            <el-table-column label="职业" prop="work_tp" :formatter="formatWorkTp" align="center"></el-table-column>
            <el-table-column label="行业" prop="industry" :formatter="formatIndustry" align="center"></el-table-column>
            <el-table-column label="职务" prop="duty" :formatter="formatDuty" align="center"></el-table-column>
            <el-table-column label="职称" prop="job_title" :formatter="formatJobTitle" align="center"></el-table-column>
            <el-table-column label="进入本单位年份" prop="start_year" align="center"></el-table-column>
            <el-table-column label="信息更新日期" prop="update_date" align="center"></el-table-column>       <!--    没有匹配字段-->
        </el-table>

        <h3>二、信息概要</h3>
        <h4>（一）个人信用报告“数字解读”</h4>

        <el-table class="tableMargin" :data="ArbCScorecue" style="width:100%; margin-top:5px !important;" border>
            <el-table-column label="数字解读"  prop="score" align="center"></el-table-column>
            <el-table-column label="相对位置" prop="score_level" align="center">
              <template slot-scope="scope">
                <span>>{{scope.row.score_level}}%</span>
              </template>
            </el-table-column>
            <el-table-column label="说明" prop="score_desc" :formatter="formatScoreDesc" align="center"></el-table-column>
        </el-table>

        <h4>（二）信贷交易信息提示</h4>

        <AuthorizationTable1 style="box-sizing: content-box; width: 100%; margin: 5px 0px 0px 12px;"class="tableMargin" :tableData="ArbCSummaryCue"/>

        <h4>（三）信贷交易违约信息概要</h4>

        <el-table class="tableMargin" :show-summary="true" :data="ArbCFellbackSum" style="width:100%; margin-top:5px !important;" border>
           <el-table-column label="被追偿信息汇总" align="center">
            <el-table-column label="业务种类" prop="busi_type" :formatter="formatBusiType" align="center"></el-table-column>
            <el-table-column label="账户数" prop="count" align="center"></el-table-column>
            <el-table-column label="余额" prop="amount" align="center"></el-table-column>
           </el-table-column>
        </el-table>
       

        <el-table class="tableMargin" :data="ArbCBadLoanSum" style="width:100%; margin-top:25px !important;" border>
            <el-table-column label="呆账信息汇总"  align="center">
            <el-table-column label="账户数" prop="count" align="center"></el-table-column>
            <el-table-column label="余额" prop="amount" align="center"></el-table-column>
            </el-table-column>
        </el-table>
    
        <el-table class="tableMargin" :data="ArbCOverdueSum" style="width:100%; margin-top:25px !important;" border>
            <el-table-column label="逾期（透支）信息汇总"  align="center">
              <el-table-column label="账户类型" prop="acount_type" :formatter="formatAcountType" align="center"></el-table-column>
            <el-table-column label="账户数" prop="count" align="center"></el-table-column>
            <el-table-column label="月份数" prop="months" align="center"></el-table-column>
            <el-table-column label="单月最高逾期/透支总额" prop="highest_overdue_amount_permon" align="center"></el-table-column>
            <el-table-column label="最长逾期/透支月数" prop="max_duration" align="center"></el-table-column>
            </el-table-column>
        </el-table>
         
         <h4>（四）信贷交易授信及负债信息概要</h4>

        <el-table class="tableMargin" :data="ArbCShareAndDebtSum1" style="width:100%; margin-top:5px !important;" border>
           <el-table-column label="非循环贷账户信息汇总"  align="center">
            <el-table-column label="管理机构数" prop="finance_org_count" align="center"></el-table-column>
            <el-table-column label="账户数" prop="account_count" align="center"></el-table-column>
            <el-table-column label="授信总额" prop="credit_limit" align="center"></el-table-column>
            <el-table-column label="余额" prop="balance" align="center"></el-table-column>
            <el-table-column label="最近6个月平均应还款" prop="latest_6month_used_avg_amount" align="center"></el-table-column>
           </el-table-column>
        </el-table>
        

        <el-table class="tableMargin" :data="ArbCShareAndDebtSum2" style="width:100%; margin-top:25px !important;" border>
           <el-table-column label="循环额度下分账户信息汇总"  align="center">
            <el-table-column label="管理机构数" prop="finance_org_count" align="center"></el-table-column>
            <el-table-column label="账户数" prop="account_count" align="center"></el-table-column>
            <el-table-column label="授信总额" prop="credit_limit" align="center"></el-table-column>
            <el-table-column label="余额" prop="balance" align="center"></el-table-column>
            <el-table-column label="最近6个月平均应还款" prop="latest_6month_used_avg_amount" align="center"></el-table-column>
           </el-table-column>
        </el-table>
      

        <el-table class="tableMargin" :data="ArbCShareAndDebtSum3" style="width:100%; margin-top:25px !important;" border>
           <el-table-column label="循环贷账户信息汇总"  align="center">
            <el-table-column label="管理机构数" prop="finance_org_count" align="center"></el-table-column>
            <el-table-column label="账户数" prop="account_count" align="center"></el-table-column>
            <el-table-column label="授信总额" prop="credit_limit" align="center"></el-table-column>
            <el-table-column label="余额" prop="balance" align="center"></el-table-column>
            <el-table-column label="最近6个月平均应还款" prop="latest_6month_used_avg_amount" align="center"></el-table-column>
           </el-table-column>
        </el-table>
        
        <el-table class="tableMargin" :data="ArbCShareAndDebtSum4" style="width:100%; margin-top:25px !important;" border>
           <el-table-column label="贷记卡账户信息汇总" align="center">
            <el-table-column label="发卡机构数" prop="finance_org_count" align="center"></el-table-column>
            <el-table-column label="账户数" prop="account_count" align="center"></el-table-column>
            <el-table-column label="授信总额" prop="credit_limit" align="center"></el-table-column>
            <el-table-column label="单家机构最高授信额" prop="max_credit_limit_per_org" align="center"></el-table-column>
            <el-table-column label="单家机构最低授信额" prop="min_credit_limit_per_org" align="center"></el-table-column>
            <el-table-column label="已用额度" prop="used_credit_limit" align="center"></el-table-column>
            <el-table-column label="最近6个月平均使用额度" prop="latest_6month_used_avg_amount" align="center"></el-table-column>
           </el-table-column>
        </el-table>
        
        <el-table class="tableMargin" :data="ArbCShareAndDebtSum5" style="width:100%; margin-top:25px !important;" border>
           <el-table-column label="准贷记卡账户信息汇总"  align="center">
            <el-table-column label="发卡机构数" prop="finance_org_count" align="center"></el-table-column>
            <el-table-column label="账户数" prop="account_count" align="center"></el-table-column>
            <el-table-column label="授信总额" prop="credit_limit" align="center"></el-table-column>
            <el-table-column label="单家机构最高授信额" prop="max_credit_limit_per_org" align="center"></el-table-column>
            <el-table-column label="单家机构最低授信额" prop="min_credit_limit_per_org" align="center"></el-table-column>
            <el-table-column label="透支余额" prop="used_credit_limit" align="center"></el-table-column>
            <el-table-column label="最近6个月平均透支余额" prop="latest_6month_used_avg_amount" align="center"></el-table-column>
           </el-table-column>
        </el-table>
        
        <el-table class="tableMargin" :data="[basicForm]" style="width:100%; margin-top:25px !important;" border>
           <el-table-column label="相关还款责任信息汇总" heght="0px"  default-expand-all="false" align="center">

            <el-table-column label="为个人"  align="center">
            <el-table-column  label="担保责任"  align="center">    
            <el-table-column   label="账户数" prop="grdbcount" align="center"></el-table-column>
            <el-table-column label="担保金额" prop="grdbguarantee_amount" align="center"></el-table-column>
            <el-table-column label="余额" prop="grdbbalance" align="center"></el-table-column>
            </el-table-column>

            <el-table-column  label="其他相关还贷责任" align="center">
              <el-table-column label="账户数" prop="grotcount" align="center"></el-table-column>
            <el-table-column label="还款责任金额" prop="grotguarantee_amount" align="center"></el-table-column>
            <el-table-column label="余额" prop="grotbalance" align="center"></el-table-column>
            </el-table-column>
            </el-table-column>
            
           </el-table-column>
           </el-table>
        
        <el-table class="tableMargin" :data="[basicForm]" style="width:100%;  " border>
            <el-table-column label="为企业"  align="center">
              <el-table-column label="担保责任" align="center">
            <el-table-column label="账户数" prop="qydbcount" align="center"></el-table-column>
            <el-table-column label="担保金额" prop="qydbguarantee_amount" align="center"></el-table-column>
            <el-table-column label="余额" prop="qydbbalance" align="center"></el-table-column>
              </el-table-column>
            <el-table-column label="其他相关还贷责任"  align="center">
              <el-table-column label="账户数" prop="qyotcount" align="center"></el-table-column>
            <el-table-column label="还款责任金额" prop="qyotguarantee_amount" align="center"></el-table-column>
            <el-table-column label="余额" prop="qyotbalance" align="center"></el-table-column>
            </el-table-column>
            </el-table-column>
        </el-table>

        <h4>（五）非信贷交易信息概要</h4>

          <el-table class="tableMargin" :data="ArbCNoncreditInfo" style="width:100%; margin-top:5px !important;" border>
            <el-table-column label="后付费业务欠费信息总汇"  align="center">
              <el-table-column label="业务类型" prop="paid_busi_type" :formatter="formatPaidBusiType" align="center"></el-table-column>
              <el-table-column label="账户数" prop="owed_count" align="center"></el-table-column>
              <el-table-column label="欠费金额" prop="owed_amount" align="center"></el-table-column>
            </el-table-column>
          </el-table>

        <h4>（六）公共信息概要</h4>

        <el-table class="tableMargin" :data="ArbCPublicInfo" style="width:100%; margin-top:5px !important;" border>
          <el-table-column label="公共信息汇总"  align="center">
            <el-table-column label="信息类型" prop="comm_info_type" :formatter="formatCommInfoType" align="center"></el-table-column>
            <el-table-column label="记录数" prop="count" align="center"></el-table-column>
            <el-table-column label="涉及金额" prop="amount" align="center"></el-table-column>
          </el-table-column>
        </el-table>

        <h4>（七）查询记录概要</h4>

        <el-table class="tableMargin" :data="ArbCQuerySummary" style="width:100%; margin-top:5px !important;" border>
          <el-table-column label="上一次查询记录"  align="center">
            <el-table-column label="上一次查询日期" prop="last_query_date" align="center"></el-table-column>
            <el-table-column label="上一次查询机构" prop="last_query_org_type" :formatter="formatOrgType" align="center"></el-table-column>
            <el-table-column label="上一次查询原因" prop="query_reason" :formatter="formatSqueryReason" align="center"></el-table-column>
          </el-table-column>
        </el-table>

        <el-table class="tableMargin" :data="ArbCQuerySummary" style="width:100%; margin-top:25px !important;" border>
                    <el-table-column label="最近1个月内的查询机构数" prop="name" align="center">
                      <el-table-column label="贷款审批" prop="latest_month_query_org_sum_loan" align="center"></el-table-column>
                      <el-table-column label="信用卡审批" prop="latest_month_query_org_sum_card" align="center"></el-table-column>
                    </el-table-column>
                    <el-table-column label="最近1个月内的查询次数" prop="type" align="center">
                      <el-table-column label="贷款审批" prop="latest_month_query_record_sum_loan" align="center"></el-table-column>
                      <el-table-column label="信用卡审批" prop="latest_month_query_record_sum_card" align="center"></el-table-column>
                      <el-table-column label="本人查询" prop="latest_month_person_query_record_sum" align="center"></el-table-column>
                    </el-table-column>
                    <el-table-column label="最近2年内的查询次数" align="center">
                      <el-table-column label="贷后管理" prop="two_year_query_record_sum_collection" align="center"></el-table-column>
                      <el-table-column label="担保资格审查" prop="two_year_query_record_sum_gua" align="center"></el-table-column>
                      <el-table-column label="特约商户实名审查" prop="two_year_query_record_sum_merchant" align="center"></el-table-column>
                    </el-table-column>
                </el-table>
        <!-- TODO -->
        <el-table class="tableMargin" :data="xxx"  v-if="isYyInfoShow" style="width:100%; margin-top:25px !important;" border>
          <el-table-column label="异议及说明信息" prop="name" align="center">
              <el-table-column label="本人声明" prop="xxx" align="center"></el-table-column>
              <el-table-column label="添加日期" prop="xxx" align="center"></el-table-column>
          </el-table-column>
        </el-table>
        <el-table class="tableMargin" :data="xxx"  v-if="isYyInfoShow" style="width:100%;" border>
              <el-table-column label="异议标注" prop="xxx" align="center"></el-table-column>
              <el-table-column label="添加日期" prop="xxx" align="center"></el-table-column>
        </el-table>

        <h3>三、信贷交易信息明细</h3>
        <h4>（一）被追偿信息</h4>
        <CollAccountDeatils style="box-sizing: content-box; width: 100%; margin: 5px 0px 0px 0px; " :collAccountParam="{ 'apply_no': this.applyno, 'credit_reports_no': this.creditno, 'sys_flg': this.sysflg}"/>
        
        <h4>（二）非循环贷账户</h4>
        <AccountDetails style="box-sizing: content-box; width: 100%; margin: 5px 0px 0px 0px; " :accountParam="{ 'apply_no': this.applyno, 'credit_reports_no': this.creditno, 'account_type':'D1', 'sys_flg': this.sysflg}"/>
       
        <h4>（三）循环额度下分账户</h4>
        <AccountDetails style="box-sizing: content-box; width: 100%; margin: 5px 0px 0px 0px; " :accountParam="{ 'apply_no': this.applyno, 'credit_reports_no': this.creditno, 'account_type':'R4', 'sys_flg': this.sysflg}"/>

        <h4>（四）循环贷账户</h4>
        <AccountDetails style="box-sizing: content-box; width: 100%; margin: 5px 0px 0px 0px; " :accountParam="{ 'apply_no': this.applyno, 'credit_reports_no': this.creditno, 'account_type':'R1', 'sys_flg': this.sysflg}"/>

        <h4>（五）贷记卡账户</h4>
        <CardAccountDeatils style="box-sizing: content-box; width: 100%; margin: 5px 0px 0px 0px; " :cardAccountParam="{ 'apply_no': this.applyno, 'credit_reports_no': this.creditno, 'account_type':'R2', 'sys_flg': this.sysflg}"/>

        <h4>（六）准贷记卡账户</h4>
        <CardAccountDeatils style="box-sizing: content-box; width: 100%; margin: 5px 0px 0px 0px; " :cardAccountParam="{ 'apply_no': this.applyno, 'credit_reports_no': this.creditno, 'account_type':'R3', 'sys_flg': this.sysflg}"/>
 

        <h4>（七）相关还款责任信息</h4>
        <h4>有相关还款责任的个人借款</h4>
        <GuaranteeDetails style="box-sizing: content-box; width: 100%; margin: 5px 0px 0px 12px; " :guaranteeParam="{ 'apply_no': this.applyno, 'credit_reports_no': this.creditno, 'cert_type':'1', 'sys_flg': this.sysflg}"/>

        <h4>有相关还款责任的企业借款</h4>
        <GuaranteeDetailsQy style="box-sizing: content-box; width: 100%; margin: 5px 0px 0px 12px; " :guaranteeParam="{ 'apply_no': this.applyno, 'credit_reports_no': this.creditno, 'cert_type':'2', 'sys_flg': this.sysflg}"/>

        <h4>（八）授信协议信息</h4>
        <CreditDetails style="box-sizing: content-box; width: 100%; margin: 5px 0px 0px 12px; " :creditParam="{ 'apply_no': this.applyno, 'credit_reports_no': this.creditno, 'sys_flg': this.sysflg}"/>

        
        <h3>四、非信贷交易明细</h3>   
        <h4>后付费记录</h4> 
        <NontradeDetails style="box-sizing: content-box; width: 100%; margin: 5px 0px 0px 12px; " :nontradeParam="{ 'apply_no': this.applyno, 'credit_reports_no': this.creditno, 'sys_flg': this.sysflg}"/>


        <h3>五、公共信息明细</h3>  
        <h4>（一）欠税记录</h4>
        <el-table class="tableMargin" :data="ArbCTaxArrear" style="width:100%; margin-top:5px !important;" border>
            <el-table-column label="编号"  type="index"   align="center"></el-table-column>
            <el-table-column label="主管税务机关" prop="org_name" align="center"></el-table-column>
            <el-table-column label="欠税总额" prop="tax_arrear_amount" align="center"></el-table-column>
            <el-table-column label="欠税统计日期" prop="count_date" align="center"></el-table-column>
        </el-table>

        <h4>（二）民事判决记录</h4>
        <el-table class="tableMargin" :data="ArbCCivilJudgement" style="width:100%; margin-top:5px !important;" border>
            <el-table-column label="编号" type="index"  align="center"></el-table-column>
            <el-table-column label="立案法院" prop="court" align="center"></el-table-column>
            <el-table-column label="案由" prop="case_reason" align="center"></el-table-column>
            <el-table-column label="立案日期" prop="register_date" align="center"></el-table-column>
            <el-table-column label="结案方式" prop="closed_type" :formatter="formatClosedTypes" align="center"></el-table-column>
        </el-table>
        <el-table class="tableMargin" :data="ArbCCivilJudgement" style="width:100%;" border>
            <el-table-column label="编号" type="index" align="center"></el-table-column>
            <el-table-column label="判决/调解结果" prop="case_result" align="center"></el-table-column>
            <el-table-column label="判决/调解生效日期" prop="case_validate_date" align="center"></el-table-column>
            <el-table-column label="诉讼标的" prop="suit_object" align="center"></el-table-column>
            <el-table-column label="诉讼标的金额" prop="suit_object_money" align="center"></el-table-column>
        </el-table>

        <h4>（三）强制执行记录</h4>
        <el-table class="tableMargin" :data="ArbCForceExecution" style="width:100%; margin-top:5px !important;" border>
            <el-table-column label="编号" type="index" align="center"></el-table-column>
            <el-table-column label="执行法院" prop="court" align="center"></el-table-column>
            <el-table-column label="执行案由" prop="case_reason" align="center"></el-table-column>
            <el-table-column label="立案日期" prop="register_date" align="center"></el-table-column>
            <el-table-column label="结案方式" prop="closed_type" :formatter="formatClosedType" align="center"></el-table-column>
        </el-table>
        <el-table class="tableMargin" :data="ArbCForceExecution" style="width:100%;" border>
            <el-table-column label="编号" type="index" align="center"></el-table-column>
            <el-table-column label="案件状态" prop="case_state" align="center"></el-table-column>
            <el-table-column label="结案日期" prop="closed_date" align="center"></el-table-column>
            <el-table-column label="申请执行标的" prop="enforce_object" align="center"></el-table-column>
            <el-table-column label="申请执行标的价值" prop="enforce_object_money" align="center"></el-table-column>
            <el-table-column label="已执行标的" prop="already_enforce_object" align="center"></el-table-column>
            <el-table-column label="已执行标的金额" prop="already_enforce_object_money" align="center"></el-table-column>
        </el-table>

        <h4>（四）行政处罚记录</h4>
        <el-table class="tableMargin" :data="ArbCAdminPunishment" style="width:100%; margin-top:5px !important;" border>
            <el-table-column label="编号" type="index" align="center"></el-table-column>
            <el-table-column label="处罚机构" prop="organ_name" align="center"></el-table-column>
            <el-table-column label="处罚内容" prop="content" align="center"></el-table-column>
            <el-table-column label="处罚金额" prop="money" align="center"></el-table-column>
            <el-table-column label="生效日期" prop="start_date" align="center"></el-table-column>
            <el-table-column label="截止日期" prop="end_date" align="center"></el-table-column>
            <el-table-column label="行政复议结果" prop="result" align="center"></el-table-column>
            
        </el-table>

<h4>（五）住房公积金参缴记录</h4>
<FundDetails style="box-sizing: content-box; width: 100%; margin: 5px 0px 0px 12px; " :fundParam="{ 'apply_no': this.applyno, 'credit_reports_no': this.creditno, 'sys_flg': this.sysflg}"/>


<h4>（六）低保救助记录</h4>
<el-table class="tableMargin" :data="ArbCSalvation" style="width:100%; margin-top:5px !important;" border>
    <el-table-column label="编号" type="index" align="center"></el-table-column>
    <el-table-column label="人员类别" prop="personnel_type" :formatter="formatPersonnelType" align="center"></el-table-column>
    <el-table-column label="所在地" prop="area" align="center"></el-table-column>
    <el-table-column label="工作单位" prop="organ_name" align="center"></el-table-column>
    <el-table-column label="家庭月收入" prop="money" align="center"></el-table-column>
    <el-table-column label="申请日期" prop="register_date" align="center"></el-table-column>
    <el-table-column label="批准日期" prop="pass_date" align="center"></el-table-column>
    <el-table-column label="信息更新日期" prop="update_time" align="center"></el-table-column>  <!-- 没有匹配字段 -->
</el-table>
 
<h4>（七）执业资格记录</h4>
<el-table class="tableMargin" :data="ArbCCompetence" style="width:100%; margin-top:5px !important;" border>
    <el-table-column label="编号" type="index" align="center"></el-table-column>
    <el-table-column label="执业资格名称" prop="competency_name" align="center"></el-table-column>
    <el-table-column label="等级" prop="grade" :formatter="formatGrade" align="center"></el-table-column>
    <el-table-column label="获得日期" prop="award_date" align="center"></el-table-column>
    <el-table-column label="到期日期" prop="end_date" align="center"></el-table-column>
    <el-table-column label="吊销日期" prop="revoke_date" align="center"></el-table-column>
    <el-table-column label="颁发机构" prop="organ_name" align="center"></el-table-column>
    <el-table-column label="机构所在地" prop="area" align="center"></el-table-column>
</el-table>

<h4>（八）行政奖励记录</h4>
<el-table class="tableMargin" :data="ArbCAdminAward" style="width:100%; margin-top:5px !important;" border>
    <el-table-column label="编号" type="index" align="center"></el-table-column>
    <el-table-column label="奖励机构" prop="organ_name" align="center"></el-table-column>
    <el-table-column label="奖励内容" prop="content" align="center"></el-table-column>
    <el-table-column label="生效日期" prop="start_date" align="center"></el-table-column>
    <el-table-column label="截止日期" prop="end_date" align="center"></el-table-column>
</el-table>

<h3>六、机构说明</h3>
<el-table class="tableMargin" :data="xxx" style="width:100%; margin-top:5px !important;" border>
    <el-table-column label="编号" type="index" align="center"></el-table-column>
    <el-table-column label="说明内容" prop="xxx" align="center"></el-table-column>
    <el-table-column label="添加日期" prop="xxx" align="center"></el-table-column>
</el-table>

<h3>七、征信中心说明</h3>
<el-table class="tableMargin" :data="xxx" style="width:100%; margin-top:5px !important;" border>
    <el-table-column label="编号" type="index" align="center"></el-table-column>
    <el-table-column label="说明内容" prop="xxx" align="center"></el-table-column>
    <el-table-column label="添加日期" prop="xxx" align="center"></el-table-column>
</el-table>

<h3>八、异议标注</h3>
<el-table class="tableMargin" :data="xxx" style="width:100%; margin-top:5px !important;" border>
    <el-table-column label="编号" type="index" align="center"></el-table-column>
    <el-table-column label="标注内容" prop="xxx" align="center"></el-table-column>
    <el-table-column label="添加日期" prop="xxx" align="center"></el-table-column>
</el-table>

<h3>九、查询记录</h3>
<el-table class="tableMargin" :data="ArbCRecordDetail" style="width:100%; margin-top:5px !important;" border>
    <el-table-column label="编号" type="index" align="center"></el-table-column>
    <el-table-column label="查询日期" prop="query_date" align="center"></el-table-column>
    <el-table-column label="查询机构" prop="query_org" align="center"></el-table-column>
    <el-table-column label="查询原因" prop="query_reason" :formatter="formatQueryReasons" align="center"></el-table-column>
</el-table>
<h3>报告说明</h3>
<p>1. 本报告由中国人民银行征信中心出具，依据截至报告时点的个人征信系统记录的信息生成。除查询记录外，其他信息均由相关机构提供，征信中心不保证其真实性和准确性，但承诺在信息汇总、加工、整合的全过程中保持客观、中立的地位。</p>
<p>2. 本报告中的“数字解读”仅供使用本信用报告的银行等授信机构参考，授信机构应自行承担使用“数字解读”的相关法律责任。</p>
<p>3. “数字解读”将信用报告内容解读为一个数值，是对信用主体未来信贷违约可能性的预测，其取值范围为0到1000，分值越高，违约可能性越低；“相对位置”是信用主体的数字解读值在全部人群中的百分比排序位置，比如“>50%”代表该数字解读值高于50%的信用主体；“说明”中的“影响因素”是影响信用主体获得更高数字解读值的原因，根据当前信用报告的实际情况给出，最多有两条。“数字解读”显示为“--”的，仅代表无法根据当前信用报告内容给出数字解读值，并无其他含义。无法给出数字解读值的具体原因见“说明”。</p>
<p>4. 本报告的信贷交易信息提示中，“业务类型” 为“其他”的汇总信息不包含“资产处置”和“垫款”业务。</p>
<p>5. 本报告中如果没有“信贷交易违约信息概要”信息，说明信用主体最近5年内没有连续逾期。</p>
<p>6. 对于存在授信限额的协议信息，信息主体的可用额度需结合“授信协议信息”中的授信额度、授信限额信息和余额进行估算。</p>
<p>7. 本报告中的信贷交易授信及负债信息概要展示的信息是指未结清/未销户的授信及负债信息。</p>
<p>8. 本报告的借贷交易明细信息中，循环贷账户的到期日期是指账户授信额度的到期日期。</p>
<p>9. 本报告的借贷交易明细信息中，借贷账户展示最近5年的还款情况，包括当前还款状态和当前逾期总额。</p>
<p>10. 对于通过自助渠道办理的“小额、高频”业务，金融机构将合并报送相关账户，展示在本报告的借贷交易明细信息中；此时账户的还款方式为“不区分还款方式”，该账户的还款频率统一约定为“月”，“还款期数”按月计算，其还款信息按月进行观测和更新。</p>
<p>11. 本报告中的逾期准贷记卡账户是指该账60天以上的透支行为。</p>
<p>12. 本报告中的还款期数为“--”是指该账户是非分期还款。</p>
<p>13. 本报告不展示5年前已经结束的违约行为，以及5年前的欠税记录、强制执行记录、民事判决记录、行政处罚记录、电信欠费记录。</p>
<p>14. 机构说明是数据提供机构对具体业务添加的特别说明信息。</p>
<p>15. 本人声明是信息主体对信用报告中的信息所附注的简要说明，信用主体对本人声明的真实性负责。</p>
<p>16. 异议标注是征信中心添加的，用于说明信用主体对信用报告中的哪些信息有异议。</p>
<p>17. 本报告内容涉及个人隐私，查询者应依法使用、妥善保管。因使用不当造成个人信息泄露的，征信中心将不承担相关责任。</p>
<p>18. 除“有相关还款责任的企业借款”中的金额展示对应币种金额外，本报告中所有金额均为折合人民币金额。</p>
<p>19. 本报告整合了数据提供机构以信息主体不同证件报送的信息。</p>
</div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";
//import AuthorizationTableItem from "./components/AuthorizationTableItem.vue";
//import AuthorizationTable1 from "./components/AuthorizationTable1.vue";
//import AccountDetails from "./components/accountDetails/AccountDeatils.vue";
//import GuaranteeDetails from './components/guaranteeDetails/GuaranteeDeatils.vue';
//import GuaranteeDetailsQy from './components/guaranteeDetailsQy/GuaranteeDeatils.vue';
//import CreditDetails from './components/creditDetails/CreditDeatils.vue';
//import NontradeDetails from './components/nontradeDetails/NontradeDeatils.vue';
//import FundDetails from './components/fundDetails/FundDeatils.vue';
//import CollAccountDeatils from './components/collAccountDetails/CollAccountDeatils.vue';
//import CardAccountDeatils from './components/cardAccountDetails/CardAccountDeatils.vue';
//import FraudHeadItem from './components/FraudHeadItem.vue';
//import { formatDate } from "./components/accountDetails/utils";

export default {
    name: "rankIcmsList",
    props: {
      cMeta: Object, // 布局相关json数据
      cParentParams: Object, // 父页面传的参数
      cParentMeta: Object, // 父页面的相关json数据
      cParentScope: Object, // 父页面的scope数据对
    },
    components: {
      AuthorizationTableItem,
      AuthorizationTable1,
      AccountDetails,
      GuaranteeDetails,
      GuaranteeDetailsQy,
      CreditDetails,
      NontradeDetails,
      FundDetails,
      CollAccountDeatils,
      CardAccountDeatils,
      FraudHeadItem,
    },
    data() {
        return {
          ArbCAccountInfo1:[],
          ArbCAccountInfo2:[],
          ArbCAccountInfo3:[],
          ArbCAccountInfo5:[],
          ArbCAccountInfo6:[],
          ArbCPublicInfo:[
            {
              comm_info_type:"",
              count:"",
              amount:"",
            },
            {
              comm_info_type:"",
              count:"",
              amount:"",
            },
            {
              comm_info_type:"",
              count:"",
              amount:"",
            },
            {
              comm_info_type:"",
              count:"",
              amount:"",
            }
          ],
          ArbCNoncreditInfo:[
            {
              paid_busi_type:"",
              owed_count:"",
              owed_amount:"",
            },
            {
              paid_busi_type:"",
              owed_count:"",
              owed_amount:"",
            }
          ],
          ArbCShareAndDebtSum1:[],
          ArbCShareAndDebtSum2:[],
          ArbCShareAndDebtSum3:[],
          ArbCShareAndDebtSum4:[],
          ArbCShareAndDebtSum5:[],
          ArbCQuerySummary:[],
          ArbCAdminAward:[],
          ArbCCompetence:[],
          ArbCSalvation:[],
          ArbCAccFund:[],
          ArbCAdminPunishment:[],
          ArbCForceExecution:[],
          ArbCCivilJudgement:[],
          ArbCTaxArrear:[],
          ArbCOverdueSum:[],
          ArbCBadLoanSum:[],
          ArbCFellbackSum:[
            {
              busi_type:"",
              count:"",
              amount:"",
            },
            {
              busi_type:"",
              count:"",
              amount:"",
            }
          ],
          // ArbCSummaryCue:[],
          ArbCScorecue:[],
          ArbCProfessional:[],
          ArbCReportheader:[],
          ArbCLive:[],
          ArbCSpouse:[],
          applyno:"",
          creditno:"",
          sysflg:"",
          ArbCRecordDetail:[],
          ArbCPhone:[],
          ArbCSummaryCue:[
            {
              qwe:"贷款",
              ywlx:"个人住房贷款",
              count: 0,
              month:"",
            },
            {
              qwe:"贷款",
              ywlx:"个人商用房贷款（包括商住两用）",
              count: 0,
              month:"",
            }, {
              qwe:"贷款",
              ywlx:"其他类贷款",
              count: 0,
              month:"",
            }, {
              qwe:"信用卡",
              ywlx:"贷记卡",
              count: 0,
              month:"",
            }, {
              qwe:"信用卡",
              ywlx:"准贷记卡",
              count: 0,
              month:"",
            },
            {
              qwe:"其他",
              ywlx:"—",
              count: 0,
              month:"",
            }
          ],
          // mergeObj:{},
          // mergeArr:['qwe','ywlx'],

          
          // 是否显示报告基本信息
          isReportHeaderShow: false,
          // 报告基本信息-报告编号
          reportHeaderNo: '',
          // 报告基本信息-报告时间
          reportHeaderDate: '',

          isFraudHeaderShow: false,
          anti_fraud_flag: '',
          anti_fraud_tel: '',
          anti_fraud_start_date: '',
          anti_fraud_end_date: '',
          isYyInfoShow: false,

          basicForm:{
            grdbcount                     : "",   //个人担保账户数
            grdbguarantee_amount          : "",   //个人担保金额
            grdbbalance                   : "",   //个人担保余额
            grotcount                     : "",   //个人其他账户数
            grotguarantee_amount          : "",   //个人其他金额
            grotbalance                   : "",   //个人其他余额
            qydbcount                     : "",   //企业担保账户数
            qydbguarantee_amount          : "",   //企业担保金额
            qydbbalance                   : "",   //企业担保余额
            qyotcount                     : "",   //企业其他账户数
            qyotguarantee_amount          : "",   //企业其他金额
            qyotbalance                   : "",   //企业其他余额
        },
      }
    },
    created() {
        this.getDictList("E_QUERY_REASON", "queryReasonList");
        this.getDictList("E_C_CERTTYPE", "certTypeList");
        this.getDictList("AR_E_GENDAR", "genderList");
        this.getDictList("E_C_MARITALSTATE", "maritalStatusList");
        this.getDictList("E_C_EDULEVEL", "eduLevelList");
        this.getDictList("US_MAXDEG", "eduDegreeList");
        this.getDictList("US_E_WORK_STATUS", "employmentStatusList");
        // this.getDictList("E_COUNTRY", "countrysCodeList");
        
        this.getDictList("E_C_COUNTRYCODE", "countryCodesList");
        this.getDictList("E_C_CERTTYPE", "spsCertTypeList");
        this.getDictList("US_E_LIVIE_STATUS", "livingTypeList");

        this.getDictList("US_E_NUIT_NATURE", "corpPropertyList");
        this.getDictList("US_WORK_TP", "workTpList");
        this.getDictList("US_INDUSTRY_CLASSIFY", "industryList");
        this.getDictList("PT_E_POST", "dutyList");
        this.getDictList("US_E_JOB_TITLE", "jobTitleList");
        this.getDictList("E_C_SCOREELE", "scoreDescList");
        this.getDictList("E_C_TYPE", "busiTypeList");
        this.getDictList("E_C_ACCOUNTTYPE", "acountTypeList");
        this.getDictList("E_C_POSTPAYTYPE", "paidBusiTypeList");        
        this.getDictList("E_C_PUBLICTYPE", "commInfoTypeList");        
        
        this.getDictList("E_QUERY_REASON", "squeryReasonList");
        this.getDictList("E_C_FORCEEXECUTIONCLOSEDTYPE", "closedTypeList");
        this.getDictList("E_C_FORCEEXECUTIONCLOSEDTYPE", "closedTypesList");
        this.getDictList("E_C_ACCFUNDSTATE", "stateList");
        this.getDictList("E_C_PERSONNELTYPE", "personnelTypeList")           
        this.getDictList("E_C_GRADE", "gradeTypeList")           
        
        this.getDictList("E_QUERY_REASON", "queryReasonsList");
        this.getDictList("E_QUERY_ORG_TYPE", "orgTypeList");
        this.getAln();
        console.log("creat",this.applyno)
        
    },

    

    mounted(){
        console.log("mont",this.applyno);
        

        this.getSpanArr(this.ArbCSummaryCue);
    },

    methods: {
        getAln(){
        this.applyno = this.cParentParams.serialNo,
        this.creditno =this.cParentParams.reportId,
        this.sysflg =this.cParentParams.sysflg
              
        this.gettableMargin();
        this.getArbCLive();
        this.getArbCSpouse();
        this.getArbCProfessional();
        this.getArbCScorecue();
        this.getArbCFellbackSum();
        this.getArbCBadLoanSum();
        this.getArbCOverdueSum();
        this.getArbCTaxArrear();
        this.getArbCCivilJudgement();
        this.getArbCForceExecution();
        this.getArbCAdminPunishment();
        this.getArbCAccFund();
        this.getArbCSalvation();
        this.getArbCCompetence();
        this.getArbCAdminAward();
       this.getArbCQuerySummary();
       this.getArbCShareAndDebtSum();
       this.getArbCNoncreditInfo();
       this.getArbCPublicInfo();
      //  this.getArbCAccountInfo1();
      //  this.getArbCAccountInfo2();
      //  this.getArbCAccountInfo3();
      //  this.getArbCAccountInfo5();
      //  this.getArbCAccountInfo6();
       this.getArbCRepayDutySum();
       this.getArbCRepayDutySum2();
       this.getArbCRepayDutySum3();
       this.getArbCRepayDutySum4();
       this.getArbCRecordDetail();   
       this.getArbCPhone();
       this.getArbCSummaryCue();

        },

      gettableMargin() {
            let servicecode = "ar8001";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8001";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8001";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }

            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                console.log("ddddddddddddddddddddddddddddddddd",res.data)
              this.ArbCReportheader = res.data
              this.reportHeaderNo = this.creditno
              this.reportHeaderDate = res.data[0].credit_reports_date
              this.isReportHeaderShow = true
              if(res.data[0].anti_fraud_flag === "1"){
                this.isFraudHeaderShow = true;
              }
              this.anti_fraud_tel = res.data[0].anti_fraud_tel
              this.anti_fraud_start_date = formatDate(3, res.data[0].anti_fraud_start_date)
              this.anti_fraud_end_date = formatDate(3, res.data[0].anti_fraud_end_date)
              }
            }).catch(err => {
              console.error(err);
            })
        },

        getArbCSpouse() {
             let servicecode = "ar8002";
             console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8002";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8002";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }

            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                console.log("ddddddddddddddddddddddddddddddddd",res.data)
              this.ArbCSpouse = res.data
              }
            }).catch(err => {
              console.error(err);
            })
        },

        getArbCLive() {
            let servicecode = "ar8003";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8003";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8003";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }

            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                console.log("ddddddddddddddddddddddddddddddddd",res.data)
              this.ArbCLive = res.data
              }
            }).catch(err => {
              console.error(err);
            })
        },

        getArbCProfessional() {
            let servicecode = "ar8004";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8004";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8004";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }

            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                console.log("ddddddddddddddddddddddddddddddddd",res.data)
              this.ArbCProfessional = res.data
              }
            }).catch(err => {
              console.error(err);
            })
        },

        getArbCScorecue() {
            let servicecode = "ar8005";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8005";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8005";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }

            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                console.log("ddddddddddddddddddddddddddddddddd",res.data)
              this.ArbCScorecue = res.data
              }
            }).catch(err => {
              console.error(err);
            })
        },

        getArbCSummaryCue() {
             let servicecode = "ar8006";
             console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8006";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8006";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }

            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                 if(res.data[0].house_loan_count === 0 || res.data[0].house_loan_count === "" || res.data[0].house_loan_count === null){
                  this.ArbCSummaryCue[0].count = "--";
                 }else{
                  this.ArbCSummaryCue[0].count = res.data[0].house_loan_count;
                 }
                 if(res.data[0].house_loan_first_issue_month === 0 || res.data[0].house_loan_first_issue_month === "" || res.data[0].house_loan_first_issue_month === null){
                  this.ArbCSummaryCue[0].month = "--";
                 }else{
                  this.ArbCSummaryCue[0].month = res.data[0].house_loan_first_issue_month;
                 }
 
                 if(res.data[0].per_busi_house_loan_count === 0 || res.data[0].per_busi_house_loan_count === "" || res.data[0].per_busi_house_loan_count === null){
                  this.ArbCSummaryCue[1].count = "--";
                 }else{
                  this.ArbCSummaryCue[1].count = res.data[0].per_busi_house_loan_count;
                 }
                 if(res.data[0].per_busi_house_loan_first_issue_month === 0 || res.data[0].per_busi_house_loan_first_issue_month === "" || res.data[0].per_busi_house_loan_first_issue_month === null){
                  this.ArbCSummaryCue[1].month = "--";
                 }else{
                  this.ArbCSummaryCue[1].month = res.data[0].per_busi_house_loan_first_issue_month;
                 }

                 if(res.data[0].other_loan_count === 0 || res.data[0].other_loan_count === "" || res.data[0].other_loan_count === null){
                  this.ArbCSummaryCue[2].count = "--";
                 }else{
                  this.ArbCSummaryCue[2].count = res.data[0].other_loan_count;
                 }
                 if(res.data[0].other_loan_first_issue_month === 0 || res.data[0].other_loan_first_issue_month === "" || res.data[0].other_loan_first_issue_month === null){
                  this.ArbCSummaryCue[2].month = "--";
                 }else{
                  this.ArbCSummaryCue[2].month = res.data[0].other_loan_first_issue_month;
                 }

                 if(res.data[0].credit_card_count === 0 || res.data[0].credit_card_count === "" || res.data[0].credit_card_count === null){
                  this.ArbCSummaryCue[3].count = "--";
                 }else{
                  this.ArbCSummaryCue[3].count = res.data[0].credit_card_count;
                 }
                 if(res.data[0].first_credit_card_first_issue_month === 0 || res.data[0].first_credit_card_first_issue_month === "" || res.data[0].first_credit_card_first_issue_month === null){
                  this.ArbCSummaryCue[3].month = "--";
                 }else{
                  this.ArbCSummaryCue[3].month = res.data[0].first_credit_card_first_issue_month;
                 }

                 if(res.data[0].credit_card_count === 0 || res.data[0].credit_card_count === "" || res.data[0].credit_card_count === null){
                  this.ArbCSummaryCue[4].count = "--";
                 }else{
                  this.ArbCSummaryCue[4].count = res.data[0].semi_credit_card_count;
                 }
                 if(res.data[0].first_credit_card_first_issue_month === 0 || res.data[0].first_credit_card_first_issue_month === "" || res.data[0].first_credit_card_first_issue_month === null){
                  this.ArbCSummaryCue[4].month = "--";
                 }else{
                  this.ArbCSummaryCue[4].month = res.data[0].semi_credit_card_first_issue_month;
                 }

                 if(res.data[0].other_busi_count === 0 || res.data[0].other_busi_count === "" || res.data[0].other_busi_count === null){
                  this.ArbCSummaryCue[5].count = "--";
                 }else{
                  this.ArbCSummaryCue[5].count = res.data[0].other_busi_count;
                 }
                 if(res.data[0].other_busi_first_issue_month === 0 || res.data[0].other_busi_first_issue_month === "" || res.data[0].other_busi_first_issue_month === null){
                  this.ArbCSummaryCue[5].month = "--";
                 }else{
                  this.ArbCSummaryCue[5].month = res.data[0].other_busi_first_issue_month;
                 }   
              }
            }).catch(err => {
              console.error(err);
            })
        },

        getArbCFellbackSum() {
            let servicecode = "ar8007";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8007";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8007";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }

            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                console.log("ddddddddddddddddddddddddddddddddd",res.data)

                this.ArbCFellbackSum[0].busi_type = "1";
                this.ArbCFellbackSum[1].busi_type = "2";
                if(0 === res.data.length){
                  this.ArbCFellbackSum[0].count = "--";
                  this.ArbCFellbackSum[0].amount = "--";
                  this.ArbCFellbackSum[1].count = "--";
                  this.ArbCFellbackSum[1].amount = "--";
                } 

                if(1 === res.data.length){
                  if("1" === res.data[0].busi_type){
                    this.ArbCFellbackSum[0].count = res.data[0].count;
                    this.ArbCFellbackSum[0].amount = res.data[0].amount;
                    this.ArbCFellbackSum[1].count = "--";
                    this.ArbCFellbackSum[1].amount = "--";
                  }
                  if("2" === res.data[0].busi_type){
                    this.ArbCFellbackSum[0].count = "--";
                    this.ArbCFellbackSum[0].amount = "--";
                    this.ArbCFellbackSum[1].count = res.data[0].count;
                    this.ArbCFellbackSum[1].amount = res.data[0].amount;
                  }
                }

                if(2 === res.data.length){
                  if("1" === res.data[0].busi_type){
                    this.ArbCFellbackSum[0].count = res.data[0].count;
                    this.ArbCFellbackSum[0].amount = res.data[0].amount;
                    this.ArbCFellbackSum[1].count = res.data[1].count;
                    this.ArbCFellbackSum[1].amount = res.data[1].amount;
                  } 
                  if("1" === res.data[1].busi_type){
                    this.ArbCFellbackSum[0].count = res.data[1].count;
                    this.ArbCFellbackSum[0].amount = res.data[1].amount;
                    this.ArbCFellbackSum[1].count = res.data[0].count;
                    this.ArbCFellbackSum[1].amount = res.data[0].amount;
                  } 
                }
              }
            }).catch(err => {
              console.error(err);
            })
        },
        

        getArbCBadLoanSum() {
            let servicecode = "ar8008";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8008";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8008";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }

            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                console.log("ddddddddddddddddddddddddddddddddd",res.data)
              this.ArbCBadLoanSum = res.data
              }
            }).catch(err => {
              console.error(err);
            })
        },
        getArbCOverdueSum() {
            let servicecode = "ar8009";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8009";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8009";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }

            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                console.log("ddddddddddddddddddddddddddddddddd",res.data)
              this.ArbCOverdueSum = res.data
              }
            }).catch(err => {
              console.error(err);
            })
        },

        getArbCShareAndDebtSum() {

          for(let i = 1 ; i <= 5 ; i++ ){
            let servicecode = "ar8010";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8010";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8010";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }

            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            acoumt_sumaray_type: i.toString()

            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                console.log("ddddddddddddddddddddddddddddddddd",res.data)
              this[`ArbCShareAndDebtSum${i}`] = res.data
              console.log("信贷交易授信",this[`ArbCShareAndDebtSum${i}`])
              }
            }).catch(err => {
              console.error(err);
            })

          }
  
        },
        
        getArbCRepayDutySum() {
            let servicecode = "ar8011";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8011";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8011";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }
            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            borrower_type: '1',
            repay_duty_type:'1',
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                if(res.data && res.data.length > 0){
                  if(res.data[0].count === 0 || res.data[0].count === "" || res.data[0].count === null){
                    this.basicForm.grdbcount = "--";
                  }else{
                    this.basicForm.grdbcount = res.data[0].count;
                  }
                  if(res.data[0].guarantee_amount === 0 || res.data[0].guarantee_amount === "" || res.data[0].guarantee_amount === null){
                    this.basicForm.grdbguarantee_amount = "--";
                  }else{
                    this.basicForm.grdbguarantee_amount = res.data[0].guarantee_amount;
                  }
                  if(res.data[0].grdbbalance === 0 || res.data[0].grdbbalance === "" || res.data[0].grdbbalance === null){
                    this.basicForm.grdbbalance = "--";
                  }else{
                    this.basicForm.grdbbalance = res.data[0].balance;
                  }
                }else{
                this.basicForm.grdbcount = "--";
                this.basicForm.grdbguarantee_amount = "--";
                this.basicForm.grdbbalance = "--";
              }
              }
            }).catch(err => {
              console.error(err);
            })
        },
        getArbCRepayDutySum2() {
            let servicecode = "ar8011";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8011";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8011";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }
            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            borrower_type: '1',
            repay_duty_type:'9',
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                if(res.data && res.data.length > 0){
                  if(res.data[0].count === 0 || res.data[0].count === "" || res.data[0].count === null){
                    this.basicForm.grotcount = "--";
                  }else{
                    this.basicForm.grotcount = res.data[0].count;
                  }
                  if(res.data[0].guarantee_amount === 0 || res.data[0].guarantee_amount === "" || res.data[0].guarantee_amount === null){
                    this.basicForm.grotguarantee_amount = "--";
                  }else{
                    this.basicForm.grotguarantee_amount = res.data[0].guarantee_amount;
                  }
                  if(res.data[0].balance === 0 || res.data[0].balance === "" || res.data[0].balance === null){
                    this.basicForm.grotbalance = "--";
                  }else{
                    this.basicForm.grotbalance = res.data[0].balance;
                  }
                }else{
                this.basicForm.grotcount = "--";
                this.basicForm.grotguarantee_amount = "--";
                this.basicForm.grotbalance = "--";
              }
              }
            }).catch(err => {
              console.error(err);
            })
        },
        getArbCRepayDutySum3() {
            let servicecode = "ar8011";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8011";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8011";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }
            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            borrower_type: '2',
            repay_duty_type:'1',
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                if(res.data && res.data.length > 0){
                  if(res.data[0].count === 0 || res.data[0].count === "" || res.data[0].count === null){
                    this.basicForm.qydbcount = "--";
                  }else{
                    this.basicForm.qydbcount = res.data[0].count;
                  }
                  if(res.data[0].guarantee_amount === 0 || res.data[0].guarantee_amount === "" || res.data[0].guarantee_amount === null){
                    this.basicForm.qydbguarantee_amount = "--";
                  }else{
                    this.basicForm.qydbguarantee_amount = res.data[0].guarantee_amount;
                  }
                  if(res.data[0].balance === 0 || res.data[0].balance === "" || res.data[0].balance === null){
                    this.basicForm.qydbbalance = "--";
                  }else{
                    this.basicForm.qydbbalance = res.data[0].balance;
                  }
                }else{
                this.basicForm.qydbcount = "--";
                this.basicForm.qydbguarantee_amount = "--";
                this.basicForm.qydbbalance = "--";
              }
              }
            }).catch(err => {
              console.error(err);
            })
        },
        getArbCRepayDutySum4() {
            let servicecode = "ar8011";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8011";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8011";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }
            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            borrower_type: '2',
            repay_duty_type:'9',
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                if(res.data && res.data.length > 0){
                  if(res.data[0].count === 0 || res.data[0].count === "" || res.data[0].count === null){
                    this.basicForm.qyotcount = "--";
                  }else{
                    this.basicForm.qyotcount = res.data[0].count;
                  }
                  if(res.data[0].guarantee_amount === 0 || res.data[0].guarantee_amount === "" || res.data[0].guarantee_amount === null){
                    this.basicForm.qyotguarantee_amount = "--";
                  }else{
                    this.basicForm.qyotguarantee_amount = res.data[0].guarantee_amount;
                  }
                  if(res.data[0].balance === 0 || res.data[0].balance === "" || res.data[0].balance === null){
                    this.basicForm.qyotbalance = "--";
                  }else{
                    this.basicForm.qyotbalance = res.data[0].balance;
                  }
                }else{
                  this.basicForm.qyotcount = "--";
                  this.basicForm.qyotguarantee_amount = "--";
                  this.basicForm.qyotbalance = "--";
                }
              }
            }).catch(err => {
              console.error(err);
            })
        },

        getArbCNoncreditInfo() {
            let servicecode = "ar8012";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8012";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8012";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }

            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                console.log("ddddddddddddddddddddddddddddddddd",res.data)
                this.ArbCNoncreditInfo[0].paid_busi_type = "1";
                this.ArbCNoncreditInfo[1].paid_busi_type = "2";
                if(0 === res.data.length){
                  this.ArbCNoncreditInfo[0].owed_count = "--";
                  this.ArbCNoncreditInfo[0].owed_amount = "--";
                  this.ArbCNoncreditInfo[1].owed_count = "--";
                  this.ArbCNoncreditInfo[1].owed_amount = "--";
                } 

                if(1 === res.data.length){
                  if("1" === res.data[0].paid_busi_type){
                    this.ArbCNoncreditInfo[0].owed_count = res.data[0].owed_count;
                    this.ArbCNoncreditInfo[0].owed_amount = res.data[0].owed_amount;
                    this.ArbCNoncreditInfo[1].owed_count = "--";
                    this.ArbCNoncreditInfo[1].owed_amount = "--";
                  }
                  if("2" === res.data[0].paid_busi_type){
                    this.ArbCNoncreditInfo[0].owed_count = "--";
                    this.ArbCNoncreditInfo[0].owed_amount = "--";
                    this.ArbCNoncreditInfo[1].owed_count = res.data[0].owed_count;
                    this.ArbCNoncreditInfo[1].owed_amount = res.data[0].owed_amount;
                  }
                }

                if(2 === res.data.length){
                  if("1" === res.data[0].paid_busi_type){
                    this.ArbCNoncreditInfo[0].owed_count = res.data[0].owed_count;
                    this.ArbCNoncreditInfo[0].owed_amount = res.data[0].owed_amount;
                    this.ArbCNoncreditInfo[1].owed_count = res.data[1].owed_count;
                    this.ArbCNoncreditInfo[1].owed_amount = res.data[1].owed_amount;
                  } 
                  if("1" === res.data[1].paid_busi_type){
                    this.ArbCNoncreditInfo[0].owed_count = res.data[1].owed_count;
                    this.ArbCNoncreditInfo[0].owed_amount = res.data[1].owed_amount;
                    this.ArbCNoncreditInfo[1].owed_count = res.data[0].owed_count;
                    this.ArbCNoncreditInfo[1].owed_amount = res.data[0].owed_amount;
                  } 
                }
              }
            }).catch(err => {
              console.error(err);
            })
        },
        
        getArbCPublicInfo() {
            let servicecode = "ar8013";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8013";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8013";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }

            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                console.log("ddddddddddddddddddddddddddddddddd",res.data)
                this.ArbCPublicInfo[0].comm_info_type = "1";
                this.ArbCPublicInfo[1].comm_info_type = "2";
                this.ArbCPublicInfo[2].comm_info_type = "3";
                this.ArbCPublicInfo[3].comm_info_type = "4";
                if(0 === res.data.length){
                  this.ArbCPublicInfo[0].count = "--";
                  this.ArbCPublicInfo[0].amount = "--";
                  this.ArbCPublicInfo[1].count = "--";
                  this.ArbCPublicInfo[1].amount = "--";
                  this.ArbCPublicInfo[2].count = "--";
                  this.ArbCPublicInfo[2].amount = "--";
                  this.ArbCPublicInfo[3].count = "--";
                  this.ArbCPublicInfo[3].amount = "--";
                } 

                if(1 === res.data.length){
                  if("1" === res.data[0].comm_info_type){
                    this.ArbCPublicInfo[0].count = res.data[0].count;
                    this.ArbCPublicInfo[0].amount = res.data[0].amount;
                    this.ArbCPublicInfo[1].count = "--";
                    this.ArbCPublicInfo[1].amount = "--";
                    this.ArbCPublicInfo[2].count = "--";
                    this.ArbCPublicInfo[2].amount = "--";
                    this.ArbCPublicInfo[3].count = "--";
                    this.ArbCPublicInfo[3].amount = "--";
                  }
                  if("2" === res.data[0].comm_info_type){
                    this.ArbCPublicInfo[0].count = "--";
                    this.ArbCPublicInfo[0].amount = "--";
                    this.ArbCPublicInfo[1].count = res.data[0].count;
                    this.ArbCPublicInfo[1].amount = res.data[0].amount;
                    this.ArbCPublicInfo[2].count = "--";
                    this.ArbCPublicInfo[2].amount = "--";
                    this.ArbCPublicInfo[3].count = "--";
                    this.ArbCPublicInfo[3].amount = "--";
                  }
                  if("3" === res.data[0].comm_info_type){
                    this.ArbCPublicInfo[0].count = "--";
                    this.ArbCPublicInfo[0].amount = "--";
                    this.ArbCPublicInfo[1].count = "--";
                    this.ArbCPublicInfo[1].amount = "--";
                    this.ArbCPublicInfo[2].count = res.data[0].count;
                    this.ArbCPublicInfo[2].amount = res.data[0].amount;
                    this.ArbCPublicInfo[3].count = "--";
                    this.ArbCPublicInfo[3].amount = "--";
                  }
                  if("4" === res.data[0].comm_info_type){
                    this.ArbCPublicInfo[0].count = "--";
                    this.ArbCPublicInfo[0].amount = "--";
                    this.ArbCPublicInfo[1].count = "--";
                    this.ArbCPublicInfo[1].amount = "--";
                    this.ArbCPublicInfo[2].count = "--";
                    this.ArbCPublicInfo[2].amount = "--";
                    this.ArbCPublicInfo[3].count = res.data[0].count;
                    this.ArbCPublicInfo[3].amount = res.data[0].amount;
                  }
                }

                if(2 === res.data.length){
                  let param1 = "0";
                  if("1" === res.data[0].comm_info_type){
                    this.ArbCPublicInfo[0].count = res.data[0].count;
                    this.ArbCPublicInfo[0].amount = res.data[0].amount;
                    this.ArbCPublicInfo[1].count = "--";
                    this.ArbCPublicInfo[1].amount = "--";
                    this.ArbCPublicInfo[2].count = "--";
                    this.ArbCPublicInfo[2].amount = "--";
                    this.ArbCPublicInfo[3].count = "--";
                    this.ArbCPublicInfo[3].amount = "--";
                    param1 = "1";
                  } 
                  if("2" === res.data[0].comm_info_type){
                    this.ArbCPublicInfo[0].count = "--";
                    this.ArbCPublicInfo[0].amount = "--";
                    this.ArbCPublicInfo[1].count = res.data[0].count;
                    this.ArbCPublicInfo[1].amount =  res.data[0].amount;
                    this.ArbCPublicInfo[2].count = "--";
                    this.ArbCPublicInfo[2].amount = "--";
                    this.ArbCPublicInfo[3].count = "--";
                    this.ArbCPublicInfo[3].amount = "--";
                    param1 = "2";
                  } 
                  if("3" === res.data[0].comm_info_type){
                    this.ArbCPublicInfo[0].count = "--";
                    this.ArbCPublicInfo[0].amount = "--";
                    this.ArbCPublicInfo[1].count = "--";
                    this.ArbCPublicInfo[1].amount = "--";
                    this.ArbCPublicInfo[2].count = res.data[0].count;
                    this.ArbCPublicInfo[2].amount = res.data[0].amount;
                    this.ArbCPublicInfo[3].count = "--";
                    this.ArbCPublicInfo[3].amount = "--";
                    param1 = "3";
                  } 
                  if("4" === res.data[0].comm_info_type){
                    this.ArbCPublicInfo[0].count = "--";
                    this.ArbCPublicInfo[0].amount = "--";
                    this.ArbCPublicInfo[1].count = "--";
                    this.ArbCPublicInfo[1].amount = "--";
                    this.ArbCPublicInfo[2].count = "--";
                    this.ArbCPublicInfo[2].amount = "--";
                    this.ArbCPublicInfo[3].count = res.data[0].count;
                    this.ArbCPublicInfo[3].amount = res.data[0].amount;
                    param1 = "4";
                  } 
                  if("1" === res.data[1].comm_info_type){
                    this.ArbCPublicInfo[0].count = res.data[1].count;
                    this.ArbCPublicInfo[0].amount = res.data[1].amount;
                    this.ArbCPublicInfo[1].count = "--";
                    this.ArbCPublicInfo[1].amount = "--";
                    this.ArbCPublicInfo[2].count = "--";
                    this.ArbCPublicInfo[2].amount = "--";
                    this.ArbCPublicInfo[3].count = "--";
                    this.ArbCPublicInfo[3].amount = "--";
                  } 
                  if("2" === res.data[1].comm_info_type){
                    this.ArbCPublicInfo[0].count = "--";
                    this.ArbCPublicInfo[0].amount = "--";
                    this.ArbCPublicInfo[1].count = res.data[1].count;
                    this.ArbCPublicInfo[1].amount =  res.data[1].amount;
                    this.ArbCPublicInfo[2].count = "--";
                    this.ArbCPublicInfo[2].amount = "--";
                    this.ArbCPublicInfo[3].count = "--";
                    this.ArbCPublicInfo[3].amount = "--";
                  } 
                  if("3" === res.data[1].comm_info_type){
                    this.ArbCPublicInfo[0].count = "--";
                    this.ArbCPublicInfo[0].amount = "--";
                    this.ArbCPublicInfo[1].count = "--";
                    this.ArbCPublicInfo[1].amount = "--";
                    this.ArbCPublicInfo[2].count = res.data[1].count;
                    this.ArbCPublicInfo[2].amount = res.data[1].amount;
                    this.ArbCPublicInfo[3].count = "--";
                    this.ArbCPublicInfo[3].amount = "--";
                  } 
                  if("4" === res.data[1].comm_info_type){
                    this.ArbCPublicInfo[0].count = "--";
                    this.ArbCPublicInfo[0].amount = "--";
                    this.ArbCPublicInfo[1].count = "--";
                    this.ArbCPublicInfo[1].amount = "--";
                    this.ArbCPublicInfo[2].count = "--";
                    this.ArbCPublicInfo[2].amount = "--";
                    this.ArbCPublicInfo[3].count = res.data[1].count;
                    this.ArbCPublicInfo[3].amount = res.data[1].amount;
                  } 
                  if("1"=== param1){
                    this.ArbCPublicInfo[0].count = res.data[0].count;
                    this.ArbCPublicInfo[0].amount = res.data[0].amount;
                  }
                  if("2"=== param1){
                    this.ArbCPublicInfo[1].count = res.data[0].count;
                    this.ArbCPublicInfo[1].amount = res.data[0].amount;
                  }
                  if("3"=== param1){
                    this.ArbCPublicInfo[2].count = res.data[0].count;
                    this.ArbCPublicInfo[2].amount = res.data[0].amount;
                  }
                  if("4"=== param1){
                    this.ArbCPublicInfo[3].count = res.data[0].count;
                    this.ArbCPublicInfo[3].amount = res.data[0].amount;
                  }
                }

                if(3 === res.data.length){
                  let param2 = "0";
                  let param3 = "0";
                  if("1" === res.data[0].comm_info_type){
                    this.ArbCPublicInfo[0].count = res.data[0].count;
                    this.ArbCPublicInfo[0].amount = res.data[0].amount;
                    this.ArbCPublicInfo[1].count = "--";
                    this.ArbCPublicInfo[1].amount = "--";
                    this.ArbCPublicInfo[2].count = "--";
                    this.ArbCPublicInfo[2].amount = "--";
                    this.ArbCPublicInfo[3].count = "--";
                    this.ArbCPublicInfo[3].amount = "--";
                    param2 = "1";
                  } 
                  if("2" === res.data[0].comm_info_type){
                    this.ArbCPublicInfo[0].count = "--";
                    this.ArbCPublicInfo[0].amount = "--";
                    this.ArbCPublicInfo[1].count = res.data[0].count;
                    this.ArbCPublicInfo[1].amount =  res.data[0].amount;
                    this.ArbCPublicInfo[2].count = "--";
                    this.ArbCPublicInfo[2].amount = "--";
                    this.ArbCPublicInfo[3].count = "--";
                    this.ArbCPublicInfo[3].amount = "--";
                    param2 = "2";
                  } 
                  if("3" === res.data[0].comm_info_type){
                    this.ArbCPublicInfo[0].count = "--";
                    this.ArbCPublicInfo[0].amount = "--";
                    this.ArbCPublicInfo[1].count = "--";
                    this.ArbCPublicInfo[1].amount = "--";
                    this.ArbCPublicInfo[2].count = res.data[0].count;
                    this.ArbCPublicInfo[2].amount = res.data[0].amount;
                    this.ArbCPublicInfo[3].count = "--";
                    this.ArbCPublicInfo[3].amount = "--";
                    param2 = "3";
                  } 
                  if("4" === res.data[0].comm_info_type){
                    this.ArbCPublicInfo[0].count = "--";
                    this.ArbCPublicInfo[0].amount = "--";
                    this.ArbCPublicInfo[1].count = "--";
                    this.ArbCPublicInfo[1].amount = "--";
                    this.ArbCPublicInfo[2].count = "--";
                    this.ArbCPublicInfo[2].amount = "--";
                    this.ArbCPublicInfo[3].count = res.data[0].count;
                    this.ArbCPublicInfo[3].amount = res.data[0].amount;
                    param2 = "4";
                  } 
                  if("1" === res.data[1].comm_info_type){
                    this.ArbCPublicInfo[0].count = res.data[1].count;
                    this.ArbCPublicInfo[0].amount = res.data[1].amount;
                    this.ArbCPublicInfo[1].count = "--";
                    this.ArbCPublicInfo[1].amount = "--";
                    this.ArbCPublicInfo[2].count = "--";
                    this.ArbCPublicInfo[2].amount = "--";
                    this.ArbCPublicInfo[3].count = "--";
                    this.ArbCPublicInfo[3].amount = "--";
                    param3 = "1";
                  } 
                  if("2" === res.data[1].comm_info_type){
                    this.ArbCPublicInfo[0].count = "--";
                    this.ArbCPublicInfo[0].amount = "--";
                    this.ArbCPublicInfo[1].count = res.data[1].count;
                    this.ArbCPublicInfo[1].amount =  res.data[1].amount;
                    this.ArbCPublicInfo[2].count = "--";
                    this.ArbCPublicInfo[2].amount = "--";
                    this.ArbCPublicInfo[3].count = "--";
                    this.ArbCPublicInfo[3].amount = "--";
                    param3 = "2";
                  } 
                  if("3" === res.data[1].comm_info_type){
                    this.ArbCPublicInfo[0].count = "--";
                    this.ArbCPublicInfo[0].amount = "--";
                    this.ArbCPublicInfo[1].count = "--";
                    this.ArbCPublicInfo[1].amount = "--";
                    this.ArbCPublicInfo[2].count = res.data[1].count;
                    this.ArbCPublicInfo[2].amount = res.data[1].amount;
                    this.ArbCPublicInfo[3].count = "--";
                    this.ArbCPublicInfo[3].amount = "--";
                    param3 = "3";
                  } 
                  if("4" === res.data[1].comm_info_type){
                    this.ArbCPublicInfo[0].count = "--";
                    this.ArbCPublicInfo[0].amount = "--";
                    this.ArbCPublicInfo[1].count = "--";
                    this.ArbCPublicInfo[1].amount = "--";
                    this.ArbCPublicInfo[2].count = "--";
                    this.ArbCPublicInfo[2].amount = "--";
                    this.ArbCPublicInfo[3].count = res.data[1].count;
                    this.ArbCPublicInfo[3].amount = res.data[1].amount;
                    param3 = "4";
                  } 
                  if("1" === res.data[2].comm_info_type){
                    this.ArbCPublicInfo[0].count = res.data[2].count;
                    this.ArbCPublicInfo[0].amount = res.data[2].amount;
                    this.ArbCPublicInfo[1].count = "--";
                    this.ArbCPublicInfo[1].amount = "--";
                    this.ArbCPublicInfo[2].count = "--";
                    this.ArbCPublicInfo[2].amount = "--";
                    this.ArbCPublicInfo[3].count = "--";
                    this.ArbCPublicInfo[3].amount = "--";
                  } 
                  if("2" === res.data[2].comm_info_type){
                    this.ArbCPublicInfo[0].count = "--";
                    this.ArbCPublicInfo[0].amount = "--";
                    this.ArbCPublicInfo[1].count = res.data[2].count;
                    this.ArbCPublicInfo[1].amount =  res.data[2].amount;
                    this.ArbCPublicInfo[2].count = "--";
                    this.ArbCPublicInfo[2].amount = "--";
                    this.ArbCPublicInfo[3].count = "--";
                    this.ArbCPublicInfo[3].amount = "--";
                  } 
                  if("3" === res.data[2].comm_info_type){
                    this.ArbCPublicInfo[0].count = "--";
                    this.ArbCPublicInfo[0].amount = "--";
                    this.ArbCPublicInfo[1].count = "--";
                    this.ArbCPublicInfo[1].amount = "--";
                    this.ArbCPublicInfo[2].count = res.data[2].count;
                    this.ArbCPublicInfo[2].amount = res.data[2].amount;
                    this.ArbCPublicInfo[3].count = "--";
                    this.ArbCPublicInfo[3].amount = "--";
                  } 
                  if("4" === res.data[2].comm_info_type){
                    this.ArbCPublicInfo[0].count = "--";
                    this.ArbCPublicInfo[0].amount = "--";
                    this.ArbCPublicInfo[1].count = "--";
                    this.ArbCPublicInfo[1].amount = "--";
                    this.ArbCPublicInfo[2].count = "--";
                    this.ArbCPublicInfo[2].amount = "--";
                    this.ArbCPublicInfo[3].count = res.data[2].count;
                    this.ArbCPublicInfo[3].amount = res.data[2].amount;
                  } 
                  if("1"=== param2){
                    this.ArbCPublicInfo[0].count = res.data[0].count;
                    this.ArbCPublicInfo[0].amount = res.data[0].amount;
                  }
                  if("2"=== param2){
                    this.ArbCPublicInfo[1].count = res.data[0].count;
                    this.ArbCPublicInfo[1].amount = res.data[0].amount;
                  }
                  if("3"=== param2){
                    this.ArbCPublicInfo[2].count = res.data[0].count;
                    this.ArbCPublicInfo[2].amount = res.data[0].amount;
                  }
                  if("4"=== param2){
                    this.ArbCPublicInfo[3].count = res.data[0].count;
                    this.ArbCPublicInfo[3].amount = res.data[0].amount;
                  }
                  if("1"=== param3){
                    this.ArbCPublicInfo[0].count = res.data[1].count;
                    this.ArbCPublicInfo[0].amount = res.data[1].amount;
                  }
                  if("2"=== param3){
                    this.ArbCPublicInfo[1].count = res.data[1].count;
                    this.ArbCPublicInfo[1].amount = res.data[1].amount;
                  }
                  if("3"=== param3){
                    this.ArbCPublicInfo[2].count = res.data[1].count;
                    this.ArbCPublicInfo[2].amount = res.data[1].amount;
                  }
                  if("4"=== param3){
                    this.ArbCPublicInfo[3].count = res.data[1].count;
                    this.ArbCPublicInfo[3].amount = res.data[1].amount;
                  }
                }
                 
                if(4 === res.data.length){
                  this.ArbCPublicInfo[0].count =res.data[0].count;
                  this.ArbCPublicInfo[0].amount = res.data[0].count;
                  this.ArbCPublicInfo[1].count = res.data[1].count;
                  this.ArbCPublicInfo[1].amount = res.data[1].amount;
                  this.ArbCPublicInfo[2].count = res.data[2].count;
                  this.ArbCPublicInfo[2].amount = res.data[2].amount;
                  this.ArbCPublicInfo[3].count = res.data[3].count;
                  this.ArbCPublicInfo[3].amount = res.data[3].amount;
                }

              }
            }).catch(err => {
              console.error(err);
            })
        },
        
        getArbCTaxArrear() {
            let servicecode = "ar8015";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8015";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8015";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }

            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                console.log("ddddddddddddddddddddddddddddddddd",res.data)
              this.ArbCTaxArrear = res.data
              }
            }).catch(err => {
              console.error(err);
            })
        },
        
        getArbCCivilJudgement() {
            let servicecode = "ar8016";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8016";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8016";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }

            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                console.log("ddddddddddddddddddddddddddddddddd",res.data)
              this.ArbCCivilJudgement = res.data
              }
            }).catch(err => {
              console.error(err);
            })
        },
        
        getArbCForceExecution() {
            let servicecode = "ar8017";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8017";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8017";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }

            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                console.log("ddddddddddddddddddddddddddddddddd",res.data)
              this.ArbCForceExecution = res.data
              }
            }).catch(err => {
              console.error(err);
            })
        },

        
        getArbCAdminPunishment() {
            let servicecode = "ar8018";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8018";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8018";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }

            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                console.log("ddddddddddddddddddddddddddddddddd",res.data)
              this.ArbCAdminPunishment = res.data
              }
            }).catch(err => {
              console.error(err);
            })
        },
        
        getArbCAccFund() {
            let servicecode = "ar8019";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8019";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8019";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }

            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                console.log("ddddddddddddddddddddddddddddddddd",res.data)
              this.ArbCAccFund = res.data
              }
            }).catch(err => {
              console.error(err);
            })
        },
        
        getArbCSalvation() {
            let servicecode = "ar8020";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8020";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8020";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }

            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                console.log("ddddddddddddddddddddddddddddddddd",res.data)
              this.ArbCSalvation = res.data
              }
            }).catch(err => {
              console.error(err);
            })
        },
        
        getArbCCompetence() {
            let servicecode = "ar8021";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8021";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8021";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }

            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                console.log("ddddddddddddddddddddddddddddddddd",res.data)
              this.ArbCCompetence = res.data
              }
            }).catch(err => {
              console.error(err);
            })
        },
        
        getArbCAdminAward() {
            let servicecode = "ar8022";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8022";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8022";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }

            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                console.log("ddddddddddddddddddddddddddddddddd",res.data)
              this.ArbCAdminAward = res.data
              }
            }).catch(err => {
              console.error(err);
            })
        },
        
        getArbCQuerySummary() {
            let servicecode = "ar8014";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8014";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8014";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }

            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                console.log("ddddddddddddddddddddddddddddddddd",res.data)
              this.ArbCQuerySummary = res.data
              }
            }).catch(err => {
              console.error(err);
            })
        },
        getArbCRecordDetail() {
            let servicecode = "ar8029";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8029";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8029";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }

            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                console.log("ddddddddddddddddddddddddddddddddd",res.data)
              this.ArbCRecordDetail = res.data
              }
            }).catch(err => {
              console.error(err);
            })
        },
        getArbCPhone() {
            let servicecode = "ar8030";
            console.log("ddddddddddddddddddddddddddddddddd",servicecode)
            if("icms" === this.sysflg){
              servicecode = "ar8030";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
           }else if("plms" === this.sysflg){
              servicecode = "pl8030";
              console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",servicecode)
            }

            let params = {
            servicecode: servicecode,
            apply_no:this.applyno,
            credit_reports_no: this.creditno,
            }
            MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall","post",params).then( res => {
              if (res && res.code === "200" && res.data) {
                console.log("ddddddddddddddddddddddddddddddddd",res.data)
              this.ArbCPhone = res.data
              }
            }).catch(err => {
              console.error(err);
            })
        },

        









































    
      getSpanArr(data){
          this.mergeArr.forEach((key,index1)=>{
            let count = 0;
            this.mergeObj[key] = [];
            data.forEach((item,index)=>{
              if(index === 0){
                this.mergeObj[key].push(1)
              }else {
                if(item[key] === data[index - 1][key]){
                  this.mergeObj[key][count] += 1;
                  this.mergeObj[key].push(0)
                } else {
                  count = index ;
                  this.mergeObj[key].push(1)
                }
              }
            })
          })
      },

      objectSpanMethod({row,column,rowIndex,columnIndex}){
        if(this.mergeArr.indexOf(column.property) !== -1){
          if(this.mergeObj[column.property][rowIndex]){
            return [this.mergeObj[column.property][rowIndex],1]
          }else {
            return [0,0]
          }
        }
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
     * 转化枚举类型
     */
     formatQueryReason(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.queryReasonList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    formatQueryReasons(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.queryReasonsList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
   
    formatCertType(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.certTypeList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    formatGender(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.genderList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    formatMaritalStatus(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.maritalStatusList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    formatEduLevel(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.eduLevelList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    formatEduDegree(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.eduDegreeList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    formatEmploymentStatus(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.employmentStatusList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    formatCountryCodes(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.countryCodesList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },

    formatSpsCertType(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.spsCertTypeList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    formatLivingType(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.livingTypeList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
      
    formatCorpProperty(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.corpPropertyList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    formatWorkTp(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.workTpList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    formatIndustry(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.industryList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    formatDuty(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.dutyList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    formatJobTitle(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.jobTitleList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    formatScoreDesc(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.scoreDescList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    formatBusiType(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.busiTypeList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    formatAcountType(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.acountTypeList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    
    formatPaidBusiType(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.paidBusiTypeList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    formatCommInfoType(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.commInfoTypeList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    formatSqueryReason(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.squeryReasonList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    formatOrgType(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.orgTypeList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    formatClosedType(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.closedTypeList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    formatClosedTypes(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.closedTypesList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    
    formatState(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.stateList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    formatPersonnelType(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.personnelTypeList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    formatGrade(row,column){
         let name = row[column.property];
            let data = row[column.property];
            this.gradeTypeList.forEach(function(item,index){
                if(data == item.dictId){
                    name = item.dictName;
                }
            })
            return name;
    },
    
    
    }
}
</script>
<style lang="less" scoped>
.border_space {
  margin-top: 25px;
}
    .operatorView {
        text-align: right;
    }
    .con{
      width:100%
    }
    h1, h2, h3{
      margin: 0 auto;
      text-align:center;
      margin-top:25px;

    }
    h4{
      margin: 0 auto;
      text-align:center;
      margin-top:22px;

    }
    h5{
      padding:0 12px;
      margin:0px !important;
    }

    .date{
      background-color:#fff !important;
    }
    
  

</style>