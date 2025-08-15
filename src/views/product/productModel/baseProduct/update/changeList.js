// 贷款管理拦截器
const changeList = {

    loanParameterAddReq(response) {
        let newData = response.data;

        if (newData.prod_aplbl_tp != null) {
            var lstklnf_aplbl_scope_ctrl = [];
            var map = {};
            map.prod_aplbl_tp = newData.prod_aplbl_tp;
            map.org_aplbl_flg = newData.org_aplbl_flg;
            map.aplbl_scope = newData.aplbl_scope;
            lstklnf_aplbl_scope_ctrl.push(map);
            newData.lstklnf_aplbl_scope_ctrl = lstklnf_aplbl_scope_ctrl;
        }

        if (newData.prod_lv_tab_nm != null) {
            var lstklnf_dflt_ctrl = [];
            var map1 = {};
            map1.prod_lv_tab_nm = newData.prod_lv_tab_nm;
            map1.prod_lv_fld = newData.prod_lv_fld;
            map1.prod_lv_fld_dsc = newData.prod_lv_fld_dsc;
            map1.acct_lv_tab_nm = newData.acct_lv_tab_nm;
            map1.acct_lv_fld = newData.acct_lv_fld;
            map1.acct_lv_fld_dsc = newData.acct_lv_fld_dsc;
            map1.acct_mod_rule = newData.acct_mod_rule;
            map1.ccy_code_num = "999";
            lstklnf_dflt_ctrl.push(map1);
            newData.lstklnf_dflt_ctrl = lstklnf_dflt_ctrl;
        }
        
        response.data = newData;
    }
}
export default changeList;