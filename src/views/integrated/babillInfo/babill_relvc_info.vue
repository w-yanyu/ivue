<template>
  <div>
    <el-row>
      <div class="qrc_container">
        <el-form
          ref="basicForm">
          <el-form-item label="票据号" prop="this_tm_bill_rdrd_num">
            <el-col :span="8">
              <el-input v-model="basicForm.this_tm_bill_rdrd_num"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
      </div>
      <div class="custom-common--footer">
        <el-button type="primary" size="small" @click="submit" plain>查询</el-button>
      </div>
    </el-row>
    <el-row>
    <el-tabs v-model="activetb" tab-position="left">
        <el-tab-pane label="协议信息" name="agreeinfo" key="agreeinfo">
          <el-form
            ref="ruleForm">
            <el-col :span="12">
            <el-form-item label="银承协议编号" prop="bank_acpt_agrmt_num" label-width="200px">
                <el-input v-model="ruleForm.bank_acpt_agrmt_num" disabled="true"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="批次号" prop="this_tm_bill_rdrd_btch" label-width="200px">
                <el-input v-model="ruleForm.this_tm_bill_rdrd_btch" disabled="true"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="币种" prop="ccy_code_num" label-width="200px">
                <el-select v-model="ruleForm.ccy_code_num"  disabled="true" style="width: 100%">
                  <el-option v-for="item in currencylst" :key="item.dictId" :label="item.dictName"
                             :value="item.dictId">
                  </el-option>
                </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="协议总票面金额" prop="agrmt_totl_par_amt" label-width="200px">
                <el-input v-model="ruleForm.agrmt_totl_par_amt" disabled="true"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="本次出票总金额" prop="this_tm_bill_rdrd_totl_amt" label-width="200px">
                <el-input v-model="ruleForm.this_tm_bill_rdrd_totl_amt" disabled="true"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="可用金额" prop="aval_amt" label-width="200px">
                <el-input v-model="ruleForm.aval_amt" disabled="true" ></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="生效日期" prop="eff_dt" label-width="200px">
                <el-input v-model="ruleForm.eff_dt" disabled="true"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="失效日期" prop="invld_dt" label-width="200px">
                <el-input v-model="ruleForm.invld_dt" disabled="true"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="出票人客户号" prop="dawer_cust_num" label-width="200px">
                <el-input v-model="ruleForm.dawer_cust_num" disabled="true"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="出票人账号" prop="dawer_acct_num" label-width="200px">
                <el-input v-model="ruleForm.dawer_acct_num" disabled="true"></el-input>
            </el-form-item>
            </el-col>
<!--            <el-col :span="12">-->
<!--            <el-form-item label="出票人账号子序号" prop="dawer_sub_acct_serl_num" label-width="200px">-->
<!--                <el-input v-model="ruleForm.dawer_sub_acct_serl_num" disabled="true"></el-input>-->
<!--            </el-form-item>-->
<!--            </el-col>-->
            <el-col :span="12">
            <el-form-item label="出票人名称" prop="dawer_full_nm" label-width="200px">
                <el-input v-model="ruleForm.dawer_full_nm" disabled="true"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="备款是否允许挂账" prop="prep_mny_hang_up_flg" label-width="200px">
                <el-select v-model="ruleForm.prep_mny_hang_up_flg"  disabled="true" style="width: 100%">
                  <el-option v-for="item in whetlst" :key="item.dictId" :label="item.dictName"
                             :value="item.dictId">
                  </el-option>
                </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="保证金账号" prop="mrgn_acct_num" label-width="200px">
                <el-input v-model="ruleForm.mrgn_acct_num" disabled="true"></el-input>
            </el-form-item>
            </el-col>
<!--            <el-col :span="12">-->
<!--            <el-form-item label="保证金账号子序号" prop="mrgn_sub_acct_serl_num" label-width="200px">-->
<!--                <el-input v-model="ruleForm.mrgn_sub_acct_serl_num" disabled="true"></el-input>-->
<!--            </el-form-item>-->
<!--            </el-col>-->
            <el-col :span="12">
            <el-form-item label="保证金账号名称" prop="mrgn_acct_nm" label-width="200px">
                <el-input v-model="ruleForm.mrgn_acct_nm" disabled="true"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="是否全额保证金" prop="full_amt_mrgn_flg" label-width="200px">
                <el-select v-model="ruleForm.full_amt_mrgn_flg"  disabled="true" style="width: 100%">
                  <el-option v-for="item in whetlst" :key="item.dictId" :label="item.dictName"
                             :value="item.dictId">
                  </el-option>
                </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="保证金担保金额" prop="mrgn_gntd_amt" label-width="200px">
                <el-input v-model="ruleForm.mrgn_gntd_amt" disabled="true"></el-input>
            </el-form-item>
            </el-col>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="票据信息"  name="billinfo" key="billinfo">
          <el-form
            ref="ruleForm">
            <el-col :span="12">
            <el-form-item label="本次出票编号" prop="this_tm_bill_rdrd_num"  label-width="200px">
                <el-input v-model="ruleForm.this_tm_bill_rdrd_num" disabled="true"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="票面金额" prop="par_amt"  label-width="200px">
                <el-input v-model="ruleForm.par_amt" disabled="true"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="汇票金额" prop="draft_amt"  label-width="200px">
                <el-input v-model="ruleForm.draft_amt" disabled="true"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="备款金额" prop="prep_mny_amt"  label-width="200px">
                <el-input v-model="ruleForm.prep_mny_amt" disabled="true"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="签发日期" prop="issue_dt"  label-width="200px">
                <el-input v-model="ruleForm.issue_dt" disabled="true"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="到期日期" prop="matu_dt"  label-width="200px">
                <el-input v-model="ruleForm.matu_dt" disabled="true"></el-input>
            </el-form-item>
            </el-col>
<!--            <el-col :span="12">-->
<!--            <el-form-item label="收款人客户号" prop="paye_cust_num"  label-width="200px">-->
<!--                <el-input v-model="ruleForm.paye_cust_num" disabled="true"></el-input>-->
<!--            </el-form-item>-->
<!--            </el-col>-->
<!--            <el-col :span="12">-->
<!--            <el-form-item label="收款人账号子序号" prop="paye_sub_acct_serl_num"  label-width="200px">-->
<!--                <el-input v-model="ruleForm.paye_sub_acct_serl_num" disabled="true"></el-input>-->
<!--            </el-form-item>-->
<!--            </el-col>-->
            <el-col :span="12">
            <el-form-item label="收款人户名" prop="paye_acct_nm"  label-width="200px">
                <el-input v-model="ruleForm.paye_acct_nm" disabled="true"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="收款行行号" prop="rcev_mny_bank_num"  label-width="200px">
                <el-input v-model="ruleForm.rcev_mny_bank_num" disabled="true"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="收款行行名" prop="rcev_mny_bank_nm"  label-width="200px">
                <el-input v-model="ruleForm.rcev_mny_bank_nm" disabled="true"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="持票人账号" prop="brr_acct_num"  label-width="200px">
                <el-input v-model="ruleForm.brr_acct_num" disabled="true"></el-input>
            </el-form-item>
            </el-col>
<!--            <el-col :span="12">-->
<!--            <el-form-item label="持票人账号子序号" prop="brr_sub_acct_serl_num"  label-width="200px">-->
<!--                <el-input v-model="ruleForm.brr_sub_acct_serl_num" disabled="true"></el-input>-->
<!--            </el-form-item>-->
<!--            </el-col>-->
            <el-col :span="12">
            <el-form-item label="持票人名称" prop="brr_nm"  label-width="200px">
                <el-input v-model="ruleForm.brr_nm" disabled="true"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="持票人开户行行号" prop="brr_open_acct_bank_num"  label-width="200px">
                <el-input v-model="ruleForm.brr_open_acct_bank_num" disabled="true"></el-input>
            </el-form-item>
            </el-col>
             <el-col :span="12">
            <el-form-item label="持票人开户行行名" prop="brr_open_acct_bank_nm"  label-width="200px">
                <el-input v-model="ruleForm.brr_open_acct_bank_nm" disabled="true"></el-input>
            </el-form-item>
            </el-col>
              <el-col :span="12">
            <el-form-item label="垫款标志" prop="full_amt_mrgn_flg"  label-width="200px">
                <el-select v-model="ruleForm.adv_flg"  disabled="true" style="width: 100%">
                  <el-option v-for="item in whetlst" :key="item.dictId" :label="item.dictName"
                             :value="item.dictId">
                  </el-option>
                </el-select>
            </el-form-item>
              </el-col>
              <el-col :span="12">

              <el-form-item label="垫款借据编号" prop="adv_due_bill_num"  label-width="200px">
                <el-input v-model="ruleForm.adv_due_bill_num" disabled="true"></el-input>
            </el-form-item>
              </el-col>
              <el-col :span="12">

              <el-form-item label="转垫款金额" prop="trfr_adv_amt"  label-width="200px">
                <el-input v-model="ruleForm.trfr_adv_amt" disabled="true"></el-input>
            </el-form-item>
              </el-col>
              <el-col :span="12">
            <el-form-item label="票据状态" prop="bill_ste"  label-width="200px">
                <el-select v-model="ruleForm.bill_ste"  disabled="true" style="width: 100%">
                  <el-option v-for="item in billstelst" :key="item.dictId" :label="item.dictName"
                             :value="item.dictId">
                  </el-option>
                </el-select>
            </el-form-item>
              </el-col>
              <el-col :span="12">
            <el-form-item label="是否电子票" prop="bill_ste"  label-width="200px">
                <el-select v-model="ruleForm.elec_bill_flg"  disabled="true" style="width: 100%">
                  <el-option v-for="item in whetlst" :key="item.dictId" :label="item.dictName"
                             :value="item.dictId">
                  </el-option>
                </el-select>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="承兑日期" prop="acpt_dt"  label-width="200px">
                <el-input v-model="ruleForm.acpt_dt" disabled="true"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="挂失日期" prop="loss_dt"  label-width="200px">
                <el-input v-model="ruleForm.loss_dt" disabled="true"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="解挂日期" prop="cncl_loss_dt"  label-width="200px">
                <el-input v-model="ruleForm.cncl_loss_dt" disabled="true"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
            <el-form-item label="未用退回日期" prop="unused_ret_dt"  label-width="200px">
                <el-input v-model="ruleForm.unused_ret_dt" disabled="true"></el-input>
            </el-form-item>
            </el-col>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>

<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "babillInfo",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模版json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },

  data() {
    return {
      basicForm: {
        this_tm_bill_rdrd_num: ""
      },
      ruleForm: {
        acpt_draft_ste: "",
        acpt_dt: null,
        adv_due_bill_num: "",
        adv_flg: "",
        agrmt_totl_par_amt: "",
        aval_amt: "",
        bank_acpt_agrmt_num: "",
        bank_acpt_draft_issue_way:"",
        bill_num: "",
        bill_rndg_pfx_num: "",
        bill_ste: "",
        brr_acct_num: null,
        brr_nm: null,
        brr_open_acct_bank_nm: "",
        brr_open_acct_bank_num: "",
        brr_sub_acct_serl_num: "",
        ccy_code_num: "",
        cncl_loss_dt: null,
        cptl_src_acct_nm: null,
        cptl_src_acct_num: "",
        cptl_src_sub_acct_serl_num: "",
        dawer_acct_num: "",
        dawer_cust_num: "",
        dawer_full_nm: "",
        dawer_sub_acct_serl_num: "",
        dbl_chk_org: "",
        detl_serl_num: null,
        draft_amt: "",
        eff_dt: "",
        elec_bill_flg: "",
        five_lv_clasf_dt: "",
        five_lv_clasf_flg: "",
        full_amt_mrgn_flg: "",
        invld_dt: "",
        issue_bank_addr: "",
        issue_bank_nm: "",
        issue_bank_num: "",
        issue_dt: "",
        issue_org: "",
        loss_dt: null,
        lstkbab_loss: [],
        lstkbab_mrgn_acct: [],
        lstkbal_prep_mny: [],
        lstklnb_cltrl_rlvc: [],
        lstklnb_gnt_info: [],
        matu_dt: "",
        mgmt_org: "",
        mrgn_acct_nm: null,
        mrgn_acct_num: "",
        mrgn_gntd_amt: "",
        mrgn_sub_acct_serl_num: "",
        par_amt: "",
        paye_acct_nm: "",
        paye_acct_num: "",
        paye_cust_num: "",
        paye_sub_acct_serl_num: "",
        prep_mny_amt: "",
        prep_mny_dt: "",
        prep_mny_hang_up_flg: "",
        prep_mny_seq: null,
        pstg_org: "",
        rcev_mny_bank_nm: "",
        rcev_mny_bank_num: "",
        remks: "",
        stlmt_acct_ovdf_ddc_mny: null,
        susps_acct_amt: "",
        this_tm_bill_rdrd_btch: null,
        this_tm_bill_rdrd_num: "",
        this_tm_bill_rdrd_totl_amt: "",
        trfr_adv_amt: "",
        unused_ret_dt: null,
        use_cltrl_flg: null,
        vchr_catg: ""
      },
      activetb: "agreeinfo",
      currencylst:[],
      whetlst:[],
      billstelst:[]
    }
  },
  created() {
    this.getDictList("MS_CURRENCY","currencylst");
    this.getDictList("MS_E_YESORNO","whetlst");
    this.getDictList("LN_E_BANK_ACPT_BILL_STE","billstelst");
  },


  methods: {
    /**
     * 数据初始化
     */
    submit() {
      let params = {
        servicecode: "ba3425",
        this_tm_bill_rdrd_num: this.basicForm.this_tm_bill_rdrd_num
      }
      MyAxios.invokeAPI("/SUMP/icmcall/icmRPCCall", "post", params).then(res => {
        if (res && res.code === "200") {
          this.ruleForm = res.data;
          console.info(this.ruleForm);
        }
      }).catch(err => {
        console.error(err);
      });
    },
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
    fmoney(s) {

      if (s === 0) {

        return '0.00'

      } else if (

        s === '' ||

        s == null

      ) {

        return ''

      }

      var n = 2

      var b = parseFloat(s)

      n = n > 0 && n <= 20 ? n : 2

      if (b < 0) {

        s = (-1 * parseFloat((s + '').replace(/[^\d\.-]/g, ''))).toFixed(n) + ''

      } else {

        s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + ''

      }

      var l = s.split('.')[0].split('').reverse()

      var r = s.split('.')[1]

      var t = ''

      for (var i = 0; i < l.length; i++) {

        t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '')

      }

      if (b < 0) {

        return '-' + t.split('').reverse().join('') + '.' + r

      } else {

        return t.split('').reverse().join('') + '.' + r

      }

    }


  }
}
</script>


<style lang="less" scoped>
.container-content {
  .container-content--search {
    padding: 16px 40px 0 12px;
    border-bottom: 1px solid #e3e8f5;
  }

  .container-content--toolbar {
    padding: 10px;
  }

  .container-content--pagination {
    float: right;
    padding: 10px;
  }

  .container-centent--table {
    margin-top: 10px;
  }
}

.container-footer {
  width: 50px;
  margin: 0 auto;
  padding: 10px;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}

.container-toolbar {
  margin: 10px 0;
}

.dialog_content {
  width: 100%;
}

.title_tag {
  font-family: "PingFang SC";
  font-size: 18px;
  font-weight: bold;
  margin: 18px;
}

.container-center {
  margin: 20px 5px;
  padding: 20px 0;
  width: 100%;
  text-align: center;
  justify-content: center;
}

.form-input {
  width: 200px;
}

.form-button {
  width: 80px;
  margin: 0 10px;
}

.button-footer {
  text-align: center;
  padding: 0 0 10px 0;
}

.qrc_container {
  padding: 20px 0;

}
</style>
