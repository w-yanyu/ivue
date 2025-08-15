<template>
  <div class="table_container">
    <div class="table_center">
      <table border="1" class="table_report">
        <tr>
          <th colspan="10" class="table_header">{{$i18ns('贷款用途调查')}}</th>
        </tr>
        <tr>
          <td class="table-left">{{$i18ns('经办行核实确认的贷款用途')}}</td>
          <td class="table-right">
            <ol>
              <li>
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose"
                  v-model="page.handle_bank_check_loan_purpose"
                  value="1"
                />{{$i18ns('装修住房')}}
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose"
                  v-model="page.handle_bank_check_loan_purpose"
                  value="2"
                />{{$i18ns('装饰住房')}}
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose"
                  v-model="page.handle_bank_check_loan_purpose"
                  value="3"
                />{{$i18ns('购置住房装修材料')}}
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose"
                  v-model="page.handle_bank_check_loan_purpose"
                  value="4"
                />{{$i18ns('购置耐用消费品')}}
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose"
                  v-model="page.handle_bank_check_loan_purpose"
                  value="5"
                />{{$i18ns('购置其他大额消费品')}}
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose"
                  v-model="page.handle_bank_check_loan_purpose"
                  value="6"
                />{{$i18ns('旅游')}}
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose"
                  v-model="page.handle_bank_check_loan_purpose"
                  value="7"
                />{{$i18ns('婚庆')}}
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose"
                  v-model="page.handle_bank_check_loan_purpose"
                  value="8"
                />{{$i18ns('美容')}}
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose"
                  v-model="page.handle_bank_check_loan_purpose"
                  value="9"
                />{{$i18ns('健身')}}
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose"
                  v-model="page.handle_bank_check_loan_purpose"
                  value="10"
                />{{$i18ns('个人教育培训')}}
              </li>
              <li>{{$i18ns('贷款用途调查的具体情况见附表《贷款用途明细情况调查认定表》，该附表分别扫描归类到“其他调查审查资料”、“贷款用途证明、使用计划或声明” 两个栏目。')}}</li>
            </ol>
          </td>
        </tr>
        <tr>
          <td class="table-left">{{$i18ns('经办行已核实并收集的贷款用途佐证资料')}}</td>
          <td class="table-right">
            <ol>
              <li>
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose_evidence"
                  v-model="page.handle_bank_check_loan_purpose_evidence"
                  value="1"
                />{{$i18ns('住房装修合同')}}
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose_evidence"
                  v-model="page.handle_bank_check_loan_purpose_evidence"
                  value="2"
                />{{$i18ns('住房装饰合同')}}
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose_evidence"
                  v-model="page.handle_bank_check_loan_purpose_evidence"
                  value="3"
                />{{$i18ns('住房装修材料采购合同')}}
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose_evidence"
                  v-model="page.handle_bank_check_loan_purpose_evidence"
                  value="4"
                />{{$i18ns('商品购销合同')}}
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose_evidence"
                  v-model="page.handle_bank_check_loan_purpose_evidence"
                  value="5"
                />{{$i18ns('消费定金收据')}}
              </li>
              <li>
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose_evidence"
                  v-model="page.handle_bank_check_loan_purpose_evidence"
                  value="6"
                />{{$i18ns('培训教育')}}
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose_evidence"
                  v-model="page.handle_bank_check_loan_purpose_evidence"
                  value="7"
                />{{$i18ns('旅游')}}
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose_evidence"
                  v-model="page.handle_bank_check_loan_purpose_evidence"
                  value="8"
                />{{$i18ns('婚庆')}}
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose_evidence"
                  v-model="page.handle_bank_check_loan_purpose_evidence"
                  value="9"
                />{{$i18ns('美容')}}
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose_evidence"
                  v-model="page.handle_bank_check_loan_purpose_evidence"
                  value="10"
                />{{$i18ns('健身')}}
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose_evidence"
                  v-model="page.handle_bank_check_loan_purpose_evidence"
                  value="11"
                />{{$i18ns('俱乐部会员活动')}}
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose_evidence"
                  v-model="page.handle_bank_check_loan_purpose_evidence"
                  value="12"
                />{{$i18ns('其它合规合法用途涉及的')}}
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose_evidence"
                  v-model="page.handle_bank_check_loan_purpose_evidence"
                  value="13"
                />{{$i18ns('相关合同')}}
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose_evidence"
                  v-model="page.handle_bank_check_loan_purpose_evidence"
                  value="14"
                />{{$i18ns('协议')}}
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose_evidence"
                  v-model="page.handle_bank_check_loan_purpose_evidence"
                  value="15"
                />{{$i18ns('通知')}}
                <input
                  type="checkbox"
                  disabled
                  name="handle_bank_check_loan_purpose_evidence"
                  v-model="page.handle_bank_check_loan_purpose_evidence"
                  value="16"
                />{{$i18ns('定金收据')}}
              </li>
            </ol>
          </td>
        </tr>
        <tr>
          <td class="table-left">{{$i18ns('经办行对贷款用途的确认')}}</td>
          <td class="table-right">
            <ol>
              <li>
                {{$i18ns('贷款用途是否真实、合法、合规：')}}
                <input
                  type="checkbox"
                  disabled
                  name="is_loan_purpose"
                  v-model="page.is_loan_purpose"
                  value="0"
                />{{$i18ns('否')}}
                <input
                  type="checkbox"
                  disabled
                  name="is_loan_purpose"
                  v-model="page.is_loan_purpose"
                  value="1"
                />{{$i18ns('是')}}
              </li>
              <li>
                {{$i18ns('贷款金额是否与用途匹配：')}}
                <input
                  type="checkbox"
                  disabled
                  name="is_loan_amt_purpose"
                  v-model="page.is_loan_amt_purpose"
                  value="0"
                />{{$i18ns('否')}}
                <input
                  type="checkbox"
                  disabled
                  name="is_loan_amt_purpose"
                  v-model="page.is_loan_amt_purpose"
                  value="1"
                />{{$i18ns('是')}}
              </li>
              <li>
                {{$i18ns('借款人与商品或服务提供方是否存在关联关系：')}}
                <input
                  type="checkbox"
                  disabled
                  name="is_borrower_comm_supplier"
                  v-model="page.is_borrower_comm_supplier"
                  value="0"
                />{{$i18ns('否')}}
                <input
                  type="checkbox"
                  disabled
                  name="is_borrower_comm_supplier"
                  v-model="page.is_borrower_comm_supplier"
                  value="1"
                />{{$i18ns('是')}}
              </li>
            </ol>
          </td>
        </tr>
        <tr>
          <td class="table-left">{{$i18ns('贷款支付管理方式及其依据')}}</td>
          <td class="table-right">
            <div class="table_div">{{ page.loan_pay_supervisor_mode_basis }}</div>
          </td>
        </tr>
        <tr>
          <td class="table-left">{{$i18ns('特别提示')}}</td>
          <td class="table-right">
            <div class="table_div">
              {{$i18ns('1、单笔提款金额在30万元以上的，须经监督执行部门进行逐笔提款审核，确保贷款资金支付方式合规； 2、对用于支付住房装修工程款，或已签订商品购销合同、已支付消费定金的贷款，原则上须采取受托支付方式。')}}
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
import MyAxios from "pte-ui/utils/MyAxios";

export default {
  name: "ArbLoanPurposeSurvReport",
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

      page: {
        loan_pay_supervisor_mode_basis: "", //贷款支付管理方式及其依据
        handle_bank_check_loan_purpose: [], //经办行核实确认的贷款用途
        handle_bank_check_loan_purpose_evidence: [], //经办行已核实并收集的贷款用途佐证资料
        is_loan_purpose: [], //贷款用途是否真实、合法、合规
        is_loan_amt_purpose: [], //贷款金额是否与用途匹配
        is_borrower_comm_supplier: [], //借款人与商品或服务提供方是否存在关联关系
      },
    };
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
        servicecode: "ar1712",
        apply_no: that.apply_no,
        cust_no: that.cust_no,
        due_item_no: that.due_item_no,
      };
      MyAxios.invokeAPI("/SUMP/call/RPCCall", "post", params)
        .then((res) => {
          if (res && res.code === "200") {
            that.page = res.data;
            that.checkboxDataTransform(res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    /**
     * 转换复选框中的数据
     * @param data
     */
    checkboxDataTransform(data) {
      this.page.handle_bank_check_loan_purpose =
        data.handle_bank_check_loan_purpose
          .replaceAll(" ", "")
          .split(",")
          .filter((item) => item !== "");
      this.page.handle_bank_check_loan_purpose_evidence =
        data.handle_bank_check_loan_purpose_evidence
          .replaceAll(" ", "")
          .split(",")
          .filter((item) => item !== "");
      this.page.is_loan_purpose = data.is_loan_purpose
        .replaceAll(" ", "")
        .split(",")
        .filter((item) => item !== "");
      this.page.is_loan_amt_purpose = data.is_loan_amt_purpose
        .replaceAll(" ", "")
        .split(",")
        .filter((item) => item !== "");
      this.page.is_borrower_comm_supplier = data.is_borrower_comm_supplier
        .replaceAll(" ", "")
        .split(",")
        .filter((item) => item !== "");
    },
  },
};
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
//   border-collapse: collapse;
//   text-align: center;
//   width: 60%;
//   height: auto;
// }

.table_report {
  width: 100%;
  height: auto;
  border-collapse: collapse;
}

th {
  width: 10% !important;
  text-align: center;
}

td {
  width: 10%;
  text-align: center;
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

.tr_header {
  height: 300px;
  border-top: 0 solid;
}

.tr_bottom {
  height: 0px;
  border: 0 solid;
}

.th_desc {
  text-align: left;
}

.underline {
  text-decoration: underline;
  font-weight: bold;
}

.table-left {
  width: 20%;
  height: 100px;
  border-right: 0;
  border-radius: 0;
  border-collapse: collapse;
  vertical-align: middle;
}

.table-right {
  width: 80%;
  height: 100px;
  border-collapse: collapse;
  vertical-align: middle;
  text-align: left;

  ol,
  .table_div {
    margin: 0;
    padding: 20px;
  }
}

.border_div {
  height: 100px;
  margin: 0;
  padding: 0;
  border: 1px solid #5e6d82;
  border-right: 0;
  border-radius: 0;
  border-collapse: collapse;
  display: flex;
  justify-content: center; /*主轴上居中*/
  align-items: center; /*侧轴上居中*/
}
</style>
