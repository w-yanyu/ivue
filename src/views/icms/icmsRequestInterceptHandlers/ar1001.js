// 进件请求拦截器
export default  {
  dealWith: function (config) {
    if (config && config.data) {
      try {
        let flowCommon = {
          apply_no: config.data.apply_no,
          cust_no: config.data.cust_no,
          cust_name: config.data.cust_name,
          cust_type: config.data.cust_type,
          cert_no: config.data.cert_no,
          cert_type: config.data.cert_type,
          sale_prod_cd: config.data.sale_prod_cd,
          sale_prod_name: config.data.sale_prod_name,
          busi_type: config.data.busi_type,
          prod_type_name: config.data.prod_type_name,
          apply_type: config.data.apply_type,
          appl_type_name: config.data.appl_type_name,
          mobile_no: config.data.mobile_no,
          limit_no: config.data.limit_no,
          is_credit: config.data.is_credit
        }
        let lendApplyContractInfo = {
          apply_amt: config.data.apply_amt,
          apply_term: config.data.apply_term,
          apply_repay_way: config.data.apply_repay_way,
          apply_repay_freq: config.data.apply_repay_freq,
          loan_contract_start_date: config.data.loan_contract_start_date
        }
        let lendDetailInfo = {
          trust_pay_amt: config.data.trust_pay_amt,
          trust_pay_limit_flag: config.data.trust_pay_limit_flag,
        }
        let lendIssueInfo = {
          loan_way: config.data.loan_way,
          lend_amt: config.data.lend_amt,
          lend_acct_no: config.data.lend_acct_no,
          loan_acct_name: config.data.loan_acct_name,
          acct_type: config.data.acct_type,
          branch_org: config.data.branch_org,
          money_exchange_flag: config.data.money_exchange_flag,
          is_xfer: config.data.is_xfer,
        }
        let transferAcctInfo = {
          is_acct_other_bank: config.data.is_acct_other_bank,
          open_acct_bank: config.data.open_acct_bank,
          branch_org: config.data.tr_branch_org,
          lend_acct_no: config.data.tr_lend_acct_no,
          loan_acct_name: config.data.tr_loan_acct_name,
          acct_type: config.data.tr_acct_type,
          money_exchange_flag: config.data.tr_money_exchange_flag,
          transfer_acct_amt: config.data.transfer_acct_amt,
        }
        let result = {
          servicecode: config.data.servicecode,
          flowCommon: flowCommon,
          lendApplyContractInfo: lendApplyContractInfo,
          lendDetailInfo: lendDetailInfo,
          lendIssueInfo: lendIssueInfo,
          transferAcctInfo: transferAcctInfo,
        }
        config.data = result;
        return config;
      } catch (err) {
        console.error(err);
      }
    }
  }
}
