// 贷款参数管理拦截器
const compParmInterceptor = {
  // 贷款参数管理新增请求拦截器 ln3281把表单数据合成list传到后端
  loanParameterAddReq: function(config) {
    if (config && config.data) {
      console.log("------------");
      //维护部件的ID，指定更新
      var alert_cmpt_id = config.data.alert_cmpt_id;
      config.data.spare_fld_01_32=alert_cmpt_id;
      config.data.ccy_code_num='999';

      if(config.data.comp_list === "chrg"){//费用列表处理
        var lstklnf_chrg_evt_defn = [];
        var klnf_chrg_evt_defn = {};
        klnf_chrg_evt_defn.prod_code=config.data.prod_code;
        klnf_chrg_evt_defn.ccy_code_num=config.data.ccy_code_num;
        klnf_chrg_evt_defn.chrg_evt=config.data.chrg_evt;
        klnf_chrg_evt_defn.chrg_evt_nm=config.data.chrg_evt_nm;
        klnf_chrg_evt_defn.chrg_catg=config.data.chrg_catg;
        klnf_chrg_evt_defn.chrg_code=config.data.chrg_code;
        klnf_chrg_evt_defn.chrg_code_nm=config.data.chrg_code_nm;
        klnf_chrg_evt_defn.chrg_amt=config.data.chrg_amt;
        lstklnf_chrg_evt_defn.push(klnf_chrg_evt_defn);
        
        config.data.lstklnf_chrg_evt_defn=lstklnf_chrg_evt_defn;
      }else if(config.data.comp_list === "acctg"){//核算列表处理
        var lstklnf_acctg_class = [];
        var klnf_acctg_class = {};
        klnf_acctg_class.prod_code=config.data.prod_code;
        klnf_acctg_class.ccy_code_num=config.data.ccy_code_num;
        klnf_acctg_class.serl_num_long=config.data.serl_num_long;
        klnf_acctg_class.busi_attr_01=config.data.busi_attr_01;
        klnf_acctg_class.busi_attr_dsc_01=config.data.busi_attr_dsc_01;
        klnf_acctg_class.busi_attr_02=config.data.busi_attr_02;
        klnf_acctg_class.busi_attr_dsc_02=config.data.busi_attr_dsc_02;
        klnf_acctg_class.busi_attr_03=config.data.busi_attr_03;
        klnf_acctg_class.busi_attr_dsc_03=config.data.busi_attr_dsc_03;
        klnf_acctg_class.busi_attr_04=config.data.busi_attr_04;
        klnf_acctg_class.busi_attr_dsc_04=config.data.busi_attr_dsc_04;
        klnf_acctg_class.busi_attr_05=config.data.busi_attr_05;
        klnf_acctg_class.busi_attr_dsc_05=config.data.busi_attr_dsc_05;
        klnf_acctg_class.busi_attr_06=config.data.busi_attr_06;
        klnf_acctg_class.busi_attr_dsc_06=config.data.busi_attr_dsc_06;
        klnf_acctg_class.busi_attr_07=config.data.busi_attr_07;
        klnf_acctg_class.busi_attr_dsc_07=config.data.busi_attr_dsc_07;
        klnf_acctg_class.busi_attr_08=config.data.busi_attr_08;
        klnf_acctg_class.busi_attr_dsc_08=config.data.busi_attr_dsc_08;
        klnf_acctg_class.busi_attr_09=config.data.busi_attr_09;
        klnf_acctg_class.busi_attr_dsc_09=config.data.busi_attr_dsc_09;
        klnf_acctg_class.busi_attr_10=config.data.busi_attr_10;
        klnf_acctg_class.busi_attr_dsc_10=config.data.busi_attr_dsc_10;
        lstklnf_acctg_class.push(klnf_acctg_class);

        config.data.lstklnf_acctg_class=lstklnf_acctg_class;
      }
    }
    console.log(config.data);
  }
}
export default compParmInterceptor;
