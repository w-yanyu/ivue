<template>
  <el-button
    v-bind="config.buttonThemeStyle"
    plain
    :size="size"
    type="primary"
    @click.stop="handleClick()"
    :icon="iconClass"
    :loading="loading"
    :disabled="disabled"
  >
    {{ $i18ns(label) }}
  </el-button>
</template>

<script>
import buttonPropsMixin from "pte-ui/mixins/buttonProps";
import pageJump from "pte-ui/mixins/pageJump";
import MyAxios from "pte-ui/utils/MyAxios";
import Config from "pte-ui/utils/config";
import {Loading} from 'element-ui';

export default {
  name: "lxykCreateAccountStartBtn",
  components: {},
  mixins: [buttonPropsMixin, pageJump],
  props: {
    cMeta: Object, // 布局相关json数据
    cParentParams: Object, // 父页面传的参数
    cParentMeta: Object, // 父页面的相关json数据
    cParentScope: Object // 父页面的scope数据对象
  },
  data() {
    return {
      checkDocInfo: [],//资料检查列表
      flowComType: {//流程通用复合类型
        cust_no: "",
        cust_name: "",
        sale_prod_cd: "LXYK0006",
        busi_type: "LXYKDK",
        prod_type_name: "授信",
        apply_type: "KF",
        apply_type_name: "授信新申请",
        cert_no: "",
        cert_type: "",
        mobile_no: "",
        sale_prod_name: "信用付",
        is_credit: "1",
        contract_no: "",
        limit_no: "",
        apply_no: "",
        cust_type: "",
        loan_amt: "",
        loan_term: "",
        repay_type: null,
        cycling_flag: "",
        loan_use: null,
        loan_inst_rate: null,
        bind_card_no: null,
        repay_cycle: null,
        open_acct_bank: null,
        branch_org: "",
        trxn_teller: "",
        teller_name: "",
        avail_amt: null,
        effect_date: null,
        expiry_date: null,
        parent_apply_id: null
      },
      flowApplyerInfo: {
        cust_name: "",
        cert_no: "",
        cert_type: "",
        mobile_no: "",
        cert_day: "",
        card_end_day: "",
        issuing_addr: "",
        marr_state: "",
        spouse_name: null,
        spouse_cert_type: null,
        spouse_cert_no: null,
        spouse_work_unit_name: null,
        spouse_work_phone: null,
        is_work: "",
        unit_nature: "",
        year_income: 0,
        busi_unit_income_ccy: "",
        country_code: "",
        nation: ""
      },//流程申请人信息
      similarCreditCardCreateApplyVoCom: {
        prod_version: "",
        sale_prod_cd: "",
        loan_acctg_no: "",
        repay_acct: ""
      },//类信用卡申请信息
      options: {
        target: this.parent,
        text: "开户中...",
        background: 'rgba(0, 0, 0, 0.7)',
        spinner: 'el-icon-loading',
        lock: true
      }
    }
  },
  methods: {
    initParams() {
      //1.资料检查列表 TODO
      //2.流程通用复合类型
      this.flowComType.cust_no = this.currentData.cust_no;
      this.flowComType.cust_name = this.currentData.cust_name;
      this.flowComType.sale_prod_cd = this.currentData.sale_prod_cd;
      // this.flowComType.busi_type = this.currentData.busi_type;
      // this.flowComType.prod_type_name = this.currentData.prod_type_name;
      // this.flowComType.apply_type = this.currentData.apply_type;
      // this.flowComType.apply_type_name = this.currentData.apply_type_name;
      this.flowComType.cert_no = this.currentData.cert_no;
      this.flowComType.cert_type = this.currentData.cert_type;
      this.flowComType.mobile_no = this.currentData.mobile_no;
      this.flowComType.sale_prod_name = this.currentData.sale_prod_name;
      this.flowComType.is_credit = this.currentData.is_credit;
      this.flowComType.cust_type = this.currentData.cust_type;
      this.flowComType.loan_amt = this.currentData.loan_amt;
      this.flowComType.loan_term = this.currentData.loan_term;
      this.flowComType.cycling_flag = this.currentData.cycling_flag;
      this.flowComType.branch_org = this.currentData.branch_org;
      this.flowComType.trxn_teller = this.currentData.trxn_teller;
      this.flowComType.teller_name = this.currentData.teller_name;
      //2.申请人信息
      this.flowApplyerInfo.cust_name = this.currentData.cust_name;
      this.flowApplyerInfo.cert_no = this.currentData.cert_no;
      this.flowApplyerInfo.cert_type = this.currentData.cert_type;
      this.flowApplyerInfo.mobile_no = this.currentData.mobile_no;
      this.flowApplyerInfo.cert_day = this.currentData.cert_day;
      this.flowApplyerInfo.card_end_day = this.currentData.card_end_day;
      this.flowApplyerInfo.issuing_addr = this.currentData.issuing_addr;
      this.flowApplyerInfo.marr_state = this.currentData.marr_state;
      this.flowApplyerInfo.spouse_name = this.currentData.spouse_name;
      this.flowApplyerInfo.spouse_cert_type = this.currentData.spouse_cert_type;
      this.flowApplyerInfo.spouse_cert_no = this.currentData.spouse_cert_no;
      this.flowApplyerInfo.spouse_work_unit_name = this.currentData.spouse_work_unit_name;
      this.flowApplyerInfo.spouse_work_phone = this.currentData.spouse_work_phone;
      this.flowApplyerInfo.is_work = this.currentData.is_work;
      this.flowApplyerInfo.unit_nature = this.currentData.unit_nature;
      this.flowApplyerInfo.year_income = this.currentData.year_income;
      this.flowApplyerInfo.busi_unit_income_ccy = this.currentData.busi_unit_income_ccy;
      this.flowApplyerInfo.country_code = this.currentData.country_code;
      this.flowApplyerInfo.nation = this.currentData.nation;
      //4、类信用卡申请信息
      this.similarCreditCardCreateApplyVoCom.sale_prod_cd = this.currentData.sale_prod_cd;
      this.similarCreditCardCreateApplyVoCom.loan_acctg_no = this.currentData.loan_acctg_no;
      this.similarCreditCardCreateApplyVoCom.repay_acct = this.currentData.repay_acct;
      console.log(this);
    },
    handleClick() {
      this.$dataBus.doAllValidator(this).then(valid => {
        if (valid) {
          let loadingInstance = Loading.service(this.options);
          this.initParams();
          let params = {
            condition: {
              checkDocInfo: this.checkDocInfo,
              flowComType: this.flowComType,
              flowApplyerInfo: this.flowApplyerInfo,
              similarCreditCardCreateApplyVoCom: this.similarCreditCardCreateApplyVoCom
            },
            servicecode: "ar0035"
          }
          MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
            loadingInstance.close();
            if (res && res.code === "200") {
              this.$dataBus.doCallBack(this, res);
              this.$dialog.close();
            } else {
              this.$message({
                type: "error",
                message: "申请失败！"
              });
            }
          }).catch(err => {
			loadingInstance.close();
            console.error(err);
          });
        }
      })

    }
  }
}
</script>

<style scoped>

</style>
