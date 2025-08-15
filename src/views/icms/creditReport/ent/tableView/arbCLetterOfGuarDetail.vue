<template>
  <div>
    <h2>(八)银行保函及其他业务的信贷明细</h2>
    <h3>1.未结清业务</h3>
    <table border="1">
      <tr>
        <th rowspan="2">账户编号</th>
        <th>授信机构</th>
        <th>业务种类</th>
        <th>五级分类</th>
        <th>开立日期</th>
        <th>到期日期</th>
        <th>币种</th>
      </tr>
      <tr>
        <th>金额</th>
        <th>反担保方式</th>
        <th>保证金比例</th>
        <th>余额</th>
        <th>风险敞口</th>
        <th>信息报告日期</th>
      </tr>
      <template v-for="item in arbCLetterOfGuarDetailComNoOverList">
        <tr>
          <td rowspan="2">{{ item.account_no }}</td>
          <td>{{ item.credit_branch }}</td>
          <td>{{ item.busi_class }}</td>
          <td>{{ item.five_level_class }}</td>
          <td>{{ item.start_date }}</td>
          <td>{{ item.end_date }}</td>
          <td>{{ item.ccy_code }}</td>
        </tr>
        <tr>
          <td>{{ item.amount }}</td>
          <td>{{ item.counter_guarantee_method }}</td>
          <td>{{ item.margin_level }}</td>
          <td>{{ item.balance }}</td>
          <td>{{ item.risk_exposure }}</td>
          <td>{{ item.info_report_date }}</td>
        </tr>
      </template>
      <template v-if="arbCLetterOfGuarDetailComNoOverList.length === 0">
        <tr>
          <td rowspan="2"></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </template>
    </table>
    <h3>2.已结清业务</h3>
    <table border="1">
      <tr>
        <th>账户编号</th>
        <th>授信机构</th>
        <th>业务种类</th>
        <th>五级分类</th>
        <th>开立日期</th>
        <th>到期日期</th>
        <th>币种</th>
        <th>金额</th>
        <th>关闭日期</th>
        <th>垫款标志</th>
      </tr>
      <template v-for="item in arbCLetterOfGuarDetailComOverList">
        <tr>
          <td rowspan="2">{{ item.account_no }}</td>
          <td>{{ item.credit_branch }}</td>
          <td>{{ item.busi_class }}</td>
          <td>{{ item.five_level_class }}</td>
          <td>{{ item.start_date }}</td>
          <td>{{ item.end_date }}</td>
          <td>{{ item.ccy_code }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.close_date }}</td>
          <td>{{ item.advance_sign }}</td>
        </tr>
      </template>
      <template v-if="arbCLetterOfGuarDetailComOverList.length === 0">
        <tr>
          <td rowspan="2"></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </template>
    </table>
  </div>
</template>

<script>

export default {
  name: "arbCLetterOfGuarDetail",
  props: {
    cMeta: Object, // 布局相关数据
    cParentMeta: Object, // 父页面模板json数据
    cParentScope: Object, // 父页面每块区域业务数据
    cParentParams: Object, // 父页面自定义参数与内置参数
  },
  data() {
    return {
      arbCLetterOfGuarDetailCom: [],
      arbCLetterOfGuarDetailComOverList: [],
      arbCLetterOfGuarDetailComNoOverList: []
    }
  },
  computed: {},
  created() {
    this.init();
    this.caculateParams();
  },
  methods: {
    init() {
      if (this.cParentParams) {
        this.arbCLetterOfGuarDetailCom = this.cParentParams;
      }
    },
    /**
     * 获取当前已结清和未结清的列表
     */
    caculateParams() {
      for (let i = 0; i < this.arbCLetterOfGuarDetailCom.length; i++) {
        let temp = arbCLetterOfGuarDetailCom[i];
        if (temp.settle_flag === "1") {
          this.arbCLetterOfGuarDetailComOverList.push(item);
        } else {
          this.arbCLetterOfGuarDetailComNoOverList.push(item);
        }
      }
    }
  }
}
</script>


<style lang="less" scoped>
table {
  width: calc(100% - 10px);
  height: auto;
  margin: 0 10px 0 10px;
  table-layout: fixed;

  th {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: black;
    height: 40px;
  }

  td {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    height: 40px;
  }

  td, th {
    white-space: nowrap; //强制在一行显示
    overflow: hidden; //溢出的内容切割隐藏
    text-overflow: ellipsis; //当内联溢出块容器时，将溢出部分替换为…
    word-break: keep-all; //允许在单词内换行

  }
}

h1, h2, h3 {
  color: black;
  font-weight: bold;
}
</style>
