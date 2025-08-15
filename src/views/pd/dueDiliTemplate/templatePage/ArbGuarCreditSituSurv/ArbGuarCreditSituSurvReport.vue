<template>
  <div class="table_container">
    <div class="table_center">
      <div class="table_report table_header">
        {{ $i18ns('②保证人身份及信用情况调查【包括但不限于以下列示的调查要点】') }}
      </div>
      <div class="table_report border_div">
        <ol>
          <li>{{ $i18ns('经调查核实，对提供连带责任保证的自然人有以下判断——') }}</li>
          <li>{{ $i18ns('⑴其是否有曾用名或别名：') }}
            <input type="checkbox" disabled name="is_another_name" v-model="page.is_another_name"
                   value="1">{{ $i18ns('是') }}
            <input type="checkbox" disabled name="is_another_name" v-model="page.is_another_name"
                   value="0">{{ $i18ns('否') }}
            {{ $i18ns('。曾用名或别名为 ；') }} <span class="underline">{{ page.another_name }}</span>
            {{ $i18ns('；是否已查询其所有姓名的信用报告：') }}
            <input type="checkbox" disabled name="is_surv_all_name_report" v-model="page.is_surv_all_name_report"
                   value="1">{{ $i18ns('是') }}
            <input type="checkbox" disabled name="is_surv_all_name_report" v-model="page.is_surv_all_name_report"
                   value="0">{{ $i18ns('否') }}
          </li>
          <li>
            {{ $i18ns('⑵其是否联网查询公民身份信息系统、确认上述保证人身份属实且合法有效：') }}
            <input type="checkbox" disabled name="is_query_system_confirm_identity"
                   v-model="page.is_query_system_confirm_identity"
                   value="1">{{ $i18ns('是') }}
            <input type="checkbox" disabled name="is_query_system_confirm_identity"
                   v-model="page.is_query_system_confirm_identity"
                   value="0">{{ $i18ns('否') }}
          </li>
          <li>
            {{ $i18ns('⑶其是') }}
            <input type="checkbox" disabled name="is_own_chinese_nationality" v-model="page.is_own_chinese_nationality"
                   value="1">{{ $i18ns('是') }}
            <input type="checkbox" disabled name="is_own_chinese_nationality" v-model="page.is_own_chinese_nationality"
                   value="0">{{ $i18ns('否') }}
            {{ $i18ns('拥有中华人民共和国国籍；') }}
            <input type="checkbox" disabled name="is_own_residence" v-model="page.is_own_residence"
                   value="1">{{ $i18ns('是') }}
            <input type="checkbox" disabled name="is_own_residence" v-model="page.is_own_residence"
                   value="0">{{ $i18ns('否') }}
            {{ $i18ns('在我行辖内有固定住所；') }}
            <input type="checkbox" disabled name="is_own_full_civil_capacity" v-model="page.is_own_full_civil_capacity"
                   value="1">{{ $i18ns('是') }}
            <input type="checkbox" disabled name="is_own_full_civil_capacity" v-model="page.is_own_full_civil_capacity"
                   value="0">{{ $i18ns('否') }}
            {{ $i18ns('具有完全民事行为能力。') }}
          </li>
          <li>
            {{ $i18ns('⑷在其担任单位或组织的法定代表人、董事或高级管理人员期间，该单位或组织') }}
            <input type="checkbox" disabled name="is_own_bankrupt_action" v-model="page.is_own_bankrupt_action"
                   value="1">{{ $i18ns('是') }}
            <input type="checkbox" disabled name="is_own_bankrupt_action" v-model="page.is_own_bankrupt_action"
                   value="0">{{ $i18ns('否') }}
            {{ $i18ns('有破产、逃废银行债务等行为。') }}
          </li>
          <li>
            {{ $i18ns('⑸其') }}
            <input type="checkbox" disabled name="is_own_illegal_crime_action"
                   v-model="page.is_own_illegal_crime_action"
                   value="1">{{ $i18ns('是') }}
            <input type="checkbox" disabled name="is_own_illegal_crime_action"
                   v-model="page.is_own_illegal_crime_action"
                   value="0">{{ $i18ns('否') }}
            {{ $i18ns('有赌博、吸毒等不良行为或犯罪记录的【过失行为除外】。') }}
          </li>
          <li>
            {{ $i18ns('⑹其') }}
            <input type="checkbox" disabled name="is_own_bad_credit_record" v-model="page.is_own_bad_credit_record"
                   value="1">{{ $i18ns('是') }}
            <input type="checkbox" disabled name="is_own_bad_credit_record" v-model="page.is_own_bad_credit_record"
                   value="0">{{ $i18ns('否') }}
            {{ $i18ns('有贷款逾期、欠息、信用卡恶意透支等不良信用记录，') }}
            <input type="checkbox" disabled name="is_own_good_credit_record" v-model="page.is_own_good_credit_record"
                   value="1">{{ $i18ns('是') }}
            <input type="checkbox" disabled name="is_own_good_credit_record" v-model="page.is_own_good_credit_record"
                   value="0">{{ $i18ns('否') }}
            {{ $i18ns('有良好的信用记录和还款意愿。') }}
          </li>
          <li>
            {{ $i18ns('⑺其年龄') }}
            <input type="checkbox" disabled name="is_age_adult" v-model="page.is_age_adult"
                   value="1">{{ $i18ns('是') }}
            <input type="checkbox" disabled name="is_age_adult" v-model="page.is_age_adult"
                   value="0">{{ $i18ns('否') }}
            {{ $i18ns('在18（含）到60（含）周岁之间。') }}
          </li>
          <li>
            {{ $i18ns('⑻其年在我行零售内部评级的客户风险等级') }}
            <input type="checkbox" disabled name="is_exceed_b_grade" v-model="page.is_exceed_b_grade"
                   value="1">{{ $i18ns('是') }}
            <input type="checkbox" disabled name="is_exceed_b_grade" v-model="page.is_exceed_b_grade"
                   value="0">{{ $i18ns('否') }}
            {{ $i18ns('在B级（含）以上。') }}
          </li>
          <li>
            {{ $i18ns('⑼保证人为我行存量贷款客户的，其客户贡献星级') }}
            <input type="checkbox" disabled name="is_exceed_four_stars" v-model="page.is_exceed_four_stars"
                   value="1">{{ $i18ns('是') }}
            <input type="checkbox" disabled name="is_exceed_four_stars" v-model="page.is_exceed_four_stars"
                   value="0">{{ $i18ns('否') }}
            {{ $i18ns('在4星级（含）以上。') }}
          </li>
          <li>
            {{ $i18ns('⑽其') }}
            <input type="checkbox" disabled name="is_open_account" v-model="page.is_open_account"
                   value="1">{{ $i18ns('是') }}
            <input type="checkbox" disabled name="is_open_account" v-model="page.is_open_account"
                   value="0">{{ $i18ns('否') }}
            {{ $i18ns('在我行开立个人结算账户。') }}
          </li>
          <li>
            {{ $i18ns('⑾保证人的配偶') }}
            <input type="checkbox" disabled name="is_guarantor_spouse_sign" v-model="page.is_guarantor_spouse_sign"
                   value="1">{{ $i18ns('是') }}
            <input type="checkbox" disabled name="is_guarantor_spouse_sign" v-model="page.is_guarantor_spouse_sign"
                   value="0">{{ $i18ns('否') }}
            {{ $i18ns('签署同意提供担保的书面文件。') }}
          </li>
          <li>
            {{ $i18ns('⑿保证人满足的特定准入条件为：') }}<span
            class="underline">{{ page.is_guarantor_satisfy_condition }}</span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script>

import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "ArbGuarCreditSituSurvReport",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      apply_no: "", //申请号
      cust_no: "", //客户编号
      due_item_no: "", //调查项编号

      ccyCodeDictList: [], //货币典列表

      page: {
        is_another_name: "", //其是否有曾用名或别名
        another_name: "", //曾用名或别名
        is_surv_all_name_report: "", //是否部分担保
        part_guar_spec_way: "", //是否已查询其所有姓名的信用报告
        is_query_system_confirm_identity: "", //其是否联网查询公民身份信息系统、确认上述保证人身份属实且合法有效
        is_own_chinese_nationality: "", //是否在我行辖内有固定住所
        is_own_full_civil_capacity: "", //是否具有完全民事行为能力
        is_own_bankrupt_action: "", //在其担任单位或组织的法定代表人、董事或高级管理人员期间，该单位或组织是否有破产、逃废银行债务等行为
        is_own_illegal_crime_action: "", //其是否有赌博、吸毒等不良行为或犯罪记录的【过失行为除外】
        is_own_bad_credit_record: "", //其是否有贷款逾期、欠息、信用卡恶意透支等不良信用记录
        is_own_good_credit_record: "", //是否有良好的信用记录和还款意愿
        is_age_adult: "", //其年龄是否在124（含）到60（含）周岁之间
        is_exceed_b_grade: "", //其年在我行零售内部评级的客户风险等级是否在B级（含）以上
        is_exceed_four_stars: "", //保证人为我行存量贷款客户的，其客户贡献星级是否在4星级（含）以上
        is_open_account: "", //其是否在我行开立个人结算账户
        is_guarantor_spouse_sign: "", //保证人的配偶是否签署同意提供担保的书面文件
        is_guarantor_satisfy_condition: "", //保证人满足的特定准入条件
      }
    }
  },
  created() {
    this.due_item_no = this.cParentParams.due_item_no;
    this.apply_no = this.cParentParams.apply_no;
    this.cust_no = this.cParentParams.cust_no;
    this.getCustData();
  },
  methods: {
    /**
     * 检查当前页面请求必输参数是否存在
     */
    checkParams() {
      if (this.apply_no === null || this.apply_no === "") {
        return false;
      }
      if (this.cust_no === null || this.cust_no === "") {
        return false;
      }
      if (this.due_item_no === null || this.due_item_no === "") {
        return false;
      }
      return true;
    },
    /**
     * 获取当前客户数据
     */
    getCustData() {
      let that = this;
      if (!that.checkParams()) {
        return;
      }
      let params = {
        servicecode: "ar1716",
        apply_no: that.apply_no,
        cust_no: that.cust_no,
        due_item_no: that.due_item_no,
      }
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that.page = res.data;
            that.checkboxDataTransform(that.page);
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    /**
     * 转换复选框中的数据
     * @param data
     */
    checkboxDataTransform(data) {
      console.log("转换前", data)
      this.page.is_another_name = data.is_another_name.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.is_surv_all_name_report = data.is_surv_all_name_report.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.is_query_system_confirm_identity = data.is_query_system_confirm_identity.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.is_own_chinese_nationality = data.is_own_chinese_nationality.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.is_own_residence = data.is_own_residence.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.is_own_full_civil_capacity = data.is_own_full_civil_capacity.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.is_own_bankrupt_action = data.is_own_bankrupt_action.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.is_own_illegal_crime_action = data.is_own_illegal_crime_action.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.is_own_bad_credit_record = data.is_own_bad_credit_record.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.is_own_good_credit_record = data.is_own_good_credit_record.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.is_age_adult = data.is_age_adult.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.is_exceed_b_grade = data.is_exceed_b_grade.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.is_exceed_four_stars = data.is_exceed_four_stars.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.is_open_account = data.is_open_account.replaceAll(" ", "").split(",").filter((item) => item !== '');
      this.page.is_guarantor_spouse_sign = data.is_guarantor_spouse_sign.replaceAll(" ", "").split(",").filter((item) => item !== '');
      console.log("最新", this.page)
    },
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    getDictLabel(listName, value) {
      let that = this;
      let tempValue = value;
      for (const item of that[listName]) {
        if (tempValue === item.dictId) {
          tempValue = item.dictName;
          break;
        }
      }
      return tempValue;
    },
    /**
     * 获取数据字典列表
     * @param dictType  数据字典 dictTyp
     * @param listKey 列表对象key名称
     */
    async getDictList(dictType, listKey) {
      let that = this;
      let params = {
        dictType: dictType,
        dictKey: [dictType],
      };
      MyAxios.invokeAPI("/SUMP/rest/dict", "post", params)
        .then(res => {
          if (res && res.code === "200") {
            that[listKey] = res.data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
}
</script>


<style lang="less" scoped>
.table_container {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
}

// .table_center {
//   position: relative;
//   left: 0;
//   top: 10%;
//   bottom: auto;
//   right: 0;
//   margin: auto;
//   text-align: center;
//   width: 60%;
//   height: auto;
// }

.table_report {
  width: calc(100% - 2px);
  height: auto;
}

.table_header {
  background: #ecf5ff;
  border-radius: 0;
  border-left: 1px solid #5e6d82;
  border-right: 1px solid #5e6d82;
  font-size: 15px;
  font-family: "Arial Black";
  font-weight: bold;
  text-align: center;
}

th {
  width: 10% !important;
  text-align: center;
}

td {
  width: 10%;
  height: 46.06px;
  text-align: center;
}

.border_div {
  margin: 0;
  padding: 0;
  border: 1px solid #5e6d82;
  border-radius: 0;
  border-collapse: collapse;
  text-align: left;
}

.underline {
  text-decoration: underline;
  font-weight: bold;
}
</style>
